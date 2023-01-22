const express = require("express");
const router = express.Router();
const bookRoutes = require("./routeBook");
const userRoutes = require("./routeUser");

router.use("/books", bookRoutes);
router.use("/users", userRoutes);

module.exports = router;
