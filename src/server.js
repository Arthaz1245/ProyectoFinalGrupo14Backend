const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

module.exports = {
  app,
  port,
};
