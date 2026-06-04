const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "Fernet REST Service",
    version: "1.0.0"
  });
});

module.exports = router;