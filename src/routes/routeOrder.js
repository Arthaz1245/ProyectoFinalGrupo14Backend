const express = require("express");
const router = express.Router();
const {
  createOrder,
  updateOrderBookIn,
  getAllOrders,
} = require("../controllers/orderController");
router.get("/", getAllOrders);
router.post("/", createOrder);
router.put("/:id", updateOrderBookIn);

module.exports = router;
