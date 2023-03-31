const express = require("express");
const router = express.Router();
const fs = require("fs");

// import controller
const File = require("../controller/file");

router.post("/upload", File.upload, File.fileUpload);
router.get("/stream/:filename", File.fileStream);
router.get("/download/:filename", File.fileDownload);

module.exports = router;
