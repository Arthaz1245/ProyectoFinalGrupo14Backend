// //update book in the cart
const updateBookCart = async (req, res) => {
  const { bookId } = req.params;
  const { query } = req.query;
  const body = req.body;

  const searchBook = await Cart.findById(bookId);

  if (!query) {
    res.status(404).json({ mensaje: "You should send a query" });
  } else if (searchBook && query === "add") {
    body.quantity = body.quantity + 1;

    await Cart.findByIdAndUpdate(bookId, body, {
      new: true,
    }).then((book) => {
      res.json({
        mensaje: `the book: ${book.title} was updated`,
        book,
      });
    });
  } else if (searchBook && query === "del") {
    body.quantity = body.quantity - 1;

    await Cart.findByIdAndUpdate(bookId, body, {
      new: true,
    }).then((book) =>
      res.json({
        mensaje: `the book: ${book.title} was updated`,
        product,
      })
    );
  } else {
    res.status(400).json({ mensaje: "there was an error", error });
  }
};
module.exports = updateBookCart;
