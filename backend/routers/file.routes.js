const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileuploadcontroller");

router.post("/upload", fileController.uploadFile);
router.get("/file/:filename", fileController.getFile);

module.exports = router;
