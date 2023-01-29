require("dotenv").config();
const { app, port } = require("./src/server");
const mongoose = require("./src/database");

app.listen(port, () => {
  console.log("Port connected", port);
});
