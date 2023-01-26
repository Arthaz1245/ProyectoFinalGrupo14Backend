const express = require("express");
const router = express.Router();
const bookRoutes = require("./routeBook");
const userRoutes = require("./routeUser");
const cartRoutes = require("./routeCart");

router.use("/books", bookRoutes);
router.use("/users", userRoutes);
router.use("/cart", cartRoutes);

module.exports = router;
