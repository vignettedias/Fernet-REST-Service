const app = require("./app");
const { PORT } = require("./config/env");

const server = app.listen(PORT, () => {
  console.log(
    `Fernet REST Service running on port ${PORT}`
  );
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received");

  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received");

  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});