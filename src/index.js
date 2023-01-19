const express = require("express");
const userRoutes = require("./routes/routeuser");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use("/", userRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));
app.listen(port, () => {
  console.log("Port connected", port);
});
