const { API_KEY } = require("../config/env");

function authMiddleware(req, res, next) {
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: "API key required"
    });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({
      success: false,
      message: "Invalid API key"
    });
  }

  next();
}

module.exports = authMiddleware;