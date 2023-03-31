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
  const filePath = `uploadedVideos/${filename}`;
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;

  const range = req.headers.range;
  if (range) {
    const chunkSize = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, fileSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
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
    fs.createReadStream(filePath).pipe(res);
  }
};

// Download
module.exports.fileDownload = (req, res) => {
  const filename = req.params.filename;
  const path = `uploadedVideos/${filename}`;
  console.log(filename + " downloaded sucessfully");
  res.download(path);
};
