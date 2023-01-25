const express = require("express");
const routes = require("./routes/index");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

module.exports = {
    app,
    port
}
