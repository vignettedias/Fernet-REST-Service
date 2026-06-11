const fs = require("fs");
const path = require("path");

const encryptionService =
require("./encryptionService");

const ENCRYPTED_DIR =
path.join(__dirname, "..", "encrypted");

const DECRYPTED_DIR =
path.join(__dirname, "..", "decrypted");

function ensureDirectories() {
  if (!fs.existsSync(ENCRYPTED_DIR)) {
    fs.mkdirSync(
      ENCRYPTED_DIR,
      { recursive: true }
    );
  }

  if (!fs.existsSync(DECRYPTED_DIR)) {
    fs.mkdirSync(
      DECRYPTED_DIR,
      { recursive: true }
    );
  }
}

function encryptFile(
  filePath
) {
  ensureDirectories();

  const buffer =
    fs.readFileSync(filePath);

  const base64Data =
    buffer.toString("base64");

  const encryptedToken =
    encryptionService.encrypt(
      base64Data
    );

  const outputFileName =
    `${Date.now()}.fernet`;

  const outputPath =
    path.join(
      ENCRYPTED_DIR,
      outputFileName
    );

  fs.writeFileSync(
    outputPath,
    encryptedToken,
    "utf8"
  );

  return {
    encryptedFile:
      outputFileName,
    encryptedPath:
      outputPath
  };
}

function decryptFile(
  encryptedFileName,
  originalFileName
) {
  ensureDirectories();

  const encryptedPath =
    path.join(
      ENCRYPTED_DIR,
      encryptedFileName
    );

  const encryptedToken =
    fs.readFileSync(
      encryptedPath,
      "utf8"
    );

  const decryptedBase64 =
    encryptionService.decrypt(
      encryptedToken
    );

  const restoredBuffer =
    Buffer.from(
      decryptedBase64,
      "base64"
    );

  const outputPath =
    path.join(
      DECRYPTED_DIR,
      originalFileName
    );

  fs.writeFileSync(
    outputPath,
    restoredBuffer
  );

  return {
    decryptedPath:
      outputPath
  };
}

module.exports = {
  encryptFile,
  decryptFile
};