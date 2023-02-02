const express = require("express");
const router = express.Router();
const bookRoutes = require("./routeBook");
const userRoutes = require("./routeuser");
const orderRoutes = require("./routeOrder");
router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
module.exports = router;
