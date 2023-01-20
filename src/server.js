const express = require("express");
const routes = require("./routes/index");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

module.exports = {
    app,
    port
}
