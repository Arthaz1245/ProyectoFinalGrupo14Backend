const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
deleteOrder
} = require("../controllers/orderController");

router.get("/", getAllOrders);
router.post("/", createOrder);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrder);

module.exports = router;
