const Book = require("../models/book");
const Cart = require("../models/cart");
const addBookCart = async (req, res) => {
  const { title, price } = req.body;

  /* Nos fijamos si tenemos el producto */
  const estaEnProducts = await Book.findOne({ title });

  /* Nos fijamos si todos los campos vienen con info */
  const noEstaVacio = title !== "" && price !== "";

  /* Nos fijamos si el producto ya esta en el carrito */
  const estaEnElCarrito = await Cart.findOne({ title });

  /* Si no tenemos el producto */
  if (!estaEnProducts) {
    res.status(400).json({
      mensaje: "Este producto no se encuentra en nuestra base de datos",
    });

    /* Si nos envian algo y no esta en el carrito lo agregamos */
  } else if (noEstaVacio && !estaEnElCarrito) {
    const newProductInCart = new Cart({ title, price, quantity: 1 });

    /* Y actualizamos la prop inCart: true en nuestros productos */
    await Product.findByIdAndUpdate(
      estaEnProducts?._id,
      { inCart: true, title, price },
      { new: true }
    )
      .then((product) => {
        newProductInCart.save();
        res.json({
          mensaje: `El producto fue agregado al carrito`,
          product,
        });
      })
      .catch((error) => console.error(error));

    /* Y si esta en el carrito avisamos */
  } else if (estaEnElCarrito) {
    res.status(400).json({
      mensaje: "El producto ya esta en el carrito",
    });
  }
};
module.exports = addBookCart;
