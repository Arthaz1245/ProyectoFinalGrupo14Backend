require("dotenv").config();
const { app, port } = require("./src/server");

app.listen(port, () => {
  console.log("Port connected", port);
});
