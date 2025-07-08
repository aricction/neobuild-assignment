const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  }
});

const FileType = mongoose.model('FileType', fileSchema);
module.exports = FileType;
