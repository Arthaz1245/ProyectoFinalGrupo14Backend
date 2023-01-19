const express = require("express");
const router = express.Router();
const bookRoutes = require("./routeBook");
const userRoutes = require("./routeUser");

router.use("/", bookRoutes);
router.use("/", userRoutes);

module.exports = router;
