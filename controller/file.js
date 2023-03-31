const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Upload & Multer

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploadedVideos");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports.upload = multer({ storage: storage }).single("video");

module.exports.fileUpload = (req, res) => {
  const file = req.file;
  if (!file) {
    return res.json({ status: false, message: "Please upload an video file" });
  }
  res.json({ status: true, message: "File uploaded successfully" });
};

// Streaming
module.exports.fileStream = (req, res) => {
  const filename = req.params.filename;
  const path = `uploads/${filename}`;
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    file.pipe(res);
  } else {
    const headers = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, headers);
    fs.createReadStream(path).pipe(res);
  }
};

// Download
module.exports.fileDownload = (req, res) => {
  const filename = req.params.filename;
  const path = `uploadedVideos/${filename}`;
  console.log(filename + " downloaded Sucessfully");
  res.download(path);
};
