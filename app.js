const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const healthRoute =
require("./routes/healthRoute");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  "/api/v1/health",
  healthRoute
);

module.exports = app;