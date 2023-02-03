const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
} = require("../controllers/orderController");
router.get("/", getAllOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);
module.exports = router;
