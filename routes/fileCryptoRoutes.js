const express =
require("express");

const authMiddleware =
require("../middleware/authMiddleware");

const upload =
require("../middleware/uploadMiddleware");

const fileCryptoController =
require("../controllers/fileCryptoController");

const router =
express.Router();

router.use(
  authMiddleware
);

router.post(
  "/encrypt-file",
  upload.single("file"),
  fileCryptoController.encryptFile
);

router.post(
  "/decrypt-file",
  fileCryptoController.decryptFile
);

module.exports = router;