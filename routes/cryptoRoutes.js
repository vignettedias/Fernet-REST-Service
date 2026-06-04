const express = require("express");

const authMiddleware =
require("../middleware/authMiddleware");

const cryptoController =
require("../controllers/cryptoController");

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/generate-key",
  cryptoController.generateKey
);

router.post(
  "/encrypt",
  cryptoController.encrypt
);

router.post(
  "/decrypt",
  cryptoController.decrypt
);

router.get(
  "/metadata",
  cryptoController.metadata
);

module.exports = router;