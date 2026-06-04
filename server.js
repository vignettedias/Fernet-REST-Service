const app = require("./app");
const { PORT } = require("./config/env");

app.listen(PORT, () => {
  console.log(
    `Fernet REST Service running on port ${PORT}`
  );
});