const express = require("express");
const book = require("./routes/routeBook.js");
const user = require("./routes/routeuser.js");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use("/", user);
app.use("/", book);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

module.exports = {
  app,
  port,
};
