// //delete book in the cart
const Book = require("../models/book");
const Cart = require("../models/cart");
const deleteBookCart = async (req, res) => {
  const { bookId } = req.params;

  const bookInCart = await Cart.findById(bookId);

  const { title, price, _id } = await Book.findOne({
    title: bookInCart.title,
  });

  await Cart.findByIdAndDelete(bookId);

  await Book.findByIdAndUpdate(
    _id,
    { inCart: false, title, price },
    { new: true }
  )
    .then((book) => {
      res.json({
        mensaje: `the book ${book.title} was deleted from the cart`,
      });
    })
    .catch((error) => res.json({ mensaje: "there was an error", error }));
};
module.exports = deleteBookCart;
