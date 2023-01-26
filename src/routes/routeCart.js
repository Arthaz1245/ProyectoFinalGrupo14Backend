const express = require("express");
const router = express.Router();
const {
  getAllBookCart,
  addBookCart,
  updateBookCart,
  deleteBookCar,
} = require("../controllers/cartController");

router.post("/", addBookCart);
router.get("/", getAllBookCart);
router.put("/:bookId", updateBookCart);
router.delete("/:bookId", deleteBookCar);

//carrito

module.exports = router;
