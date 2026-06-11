const multer = require("multer");
const path = require("path");
const fs = require("fs");

const UPLOAD_DIR =
path.join(
  __dirname,
  "..",
  "uploads"
);

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(
    UPLOAD_DIR,
    { recursive: true }
  );
}

const storage =
multer.diskStorage({
  destination: (
    req,
    file,
    cb
  ) => {
    cb(
      null,
      UPLOAD_DIR
    );
  },

  filename: (
    req,
    file,
    cb
  ) => {
    const uniqueName =
      `${Date.now()}-${file.originalname}`;

    cb(
      null,
      uniqueName
    );
  }
});

module.exports =
multer({
  storage
});