const Cart = require("../models/cart");
const getAllBookCart = async (req, res) => {
  const booksCart = await Cart.find();

  if (booksCart) {
    res.json({ booksCart });
  } else {
    res.json({ mensaje: "There are not products in the Cart" });
  }
};
module.exports = getAllBookCart;
