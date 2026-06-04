require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  FERNET_SECRET: process.env.FERNET_SECRET,
  API_KEY: process.env.API_KEY,
  NODE_ENV: process.env.NODE_ENV || "development"
};