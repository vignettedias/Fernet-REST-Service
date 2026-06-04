const encryptionService =
require("../services/encryptionService");

exports.generateKey = (req, res, next) => {
  try {
    const key = encryptionService.generateKey();

    res.status(200).json({
      success: true,
      key
    });
  } catch (err) {
    next(err);
  }
};

exports.encrypt = (req, res, next) => {
  try {
    const { plaintext } = req.body;

    if (!plaintext) {
      return res.status(400).json({
        success: false,
        message: "plaintext is required"
      });
    }

    const ciphertext =
      encryptionService.encrypt(plaintext);

    res.status(200).json({
      success: true,
      ciphertext
    });

  } catch (err) {
    next(err);
  }
};

exports.decrypt = (req, res, next) => {
  try {
    const { ciphertext } = req.body;

    if (!ciphertext) {
      return res.status(400).json({
        success: false,
        message: "ciphertext is required"
      });
    }

    const plaintext =
      encryptionService.decrypt(ciphertext);

    res.status(200).json({
      success: true,
      plaintext
    });

  } catch (err) {
    next(err);
  }
};

exports.metadata = (req, res, next) => {
  try {
    res.status(200).json(
      encryptionService.getSecurityMetadata()
    );
  } catch (err) {
    next(err);
  }
};