const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimiter =
require("./middleware/rateLimiter");
const errorHandler =
require("./middleware/errorHandler");
const requestLogger =
require("./middleware/requestLogger");
const healthRoute =
require("./routes/healthRoute");
const cryptoRoutes =
require("./routes/cryptoRoutes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(requestLogger);

app.use(
  "/api/v1/health",
  healthRoute
);
app.use(
  "/api/v1",
  cryptoRoutes
);
app.use(errorHandler);

module.exports = app;