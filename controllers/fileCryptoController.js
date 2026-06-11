const path = require("path");

const fileEncryptionService =
require("../services/fileEncryptionService");

exports.encryptFile =
(req, res, next) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "No file uploaded"
      });
    }

    const result =
      fileEncryptionService.encryptFile(
        req.file.path
      );

    res.status(200).json({
      success: true,
      originalFile:
        req.file.filename,
      encryptedFile:
        result.encryptedFile,
      encryptedPath:
        result.encryptedPath
    });

  } catch (err) {
    next(err);
  }
};

exports.decryptFile =
(req, res, next) => {
  try {

    const {
      encryptedFileName,
      originalFileName
    } = req.body;

    if (
      !encryptedFileName ||
      !originalFileName
    ) {
      return res.status(400).json({
        success: false,
        message:
          "encryptedFileName and originalFileName are required"
      });
    }

    const result =
      fileEncryptionService.decryptFile(
        encryptedFileName,
        originalFileName
      );

    res.status(200).json({
      success: true,
      decryptedPath:
        result.decryptedPath
    });

  } catch (err) {
    next(err);
  }
};