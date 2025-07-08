const { MongoClient, GridFSBucket } = require("mongodb");
const busboy = require("busboy");
require("dotenv").config();

let db, bucket;

// Connect to MongoDB only once
MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db();
    bucket = new GridFSBucket(db, { bucketName: "uploads" });
    console.log("✅ GridFS ready");
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Upload Controller
exports.uploadFile = (req, res) => {
  console.log("🔍 Incoming request for file upload");

  const bb = busboy({ headers: req.headers });
  let uploaded = false;
  let responded = false;

  bb.on("file", (fieldname, file, { filename, mimeType }) => {
    console.log("📥 File received:", filename, mimeType);
    file.on("data", (data) => console.log("📦 Chunk received:", data.length));

    const uniqueFilename = `${Date.now()}-${filename}`;
    const uploadStream = bucket.openUploadStream(uniqueFilename, {
      contentType: mimeType,
    });

    uploaded = true; // ✅ Tell Busboy that a file has started uploading

    file
      .pipe(uploadStream)
      .on("error", (err) => {
        console.error("❌ Upload error:", err);
        if (!responded) {
          responded = true;
          res.status(500).json({ error: "Upload error" });
        }
      })
      .on("finish", () => {
        console.log("✅ Uploaded to GridFS as:", uploadStream.filename);
        if (!responded) {
          responded = true;
          res.status(200).json({
            success: true,
            filename: uploadStream.filename,
            id: uploadStream.id,
          });
        }
      });

    file.on("end", () => {
      console.log("✅ File stream ended");
    });
  });

  bb.on("finish", () => {
    console.log("📦 Busboy finished parsing");
    if (!uploaded && !responded) {
      responded = true;
      res.status(400).json({ error: "No file uploaded" });
    }
  });

  req.pipe(bb);
};


// Download Controller

exports.getFile = async (req, res) => {
  try {
    const fileCursor = bucket.find({ filename: req.params.filename });
    const file = await fileCursor.next();

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.set("Content-Type", file.contentType);
    bucket.openDownloadStreamByName(req.params.filename).pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error retrieving file" });
  }
};
