const User = require("../models/user");
const Order = require("../models/order");
const Book = require("../models/book");

async function handleStock(title, stock) {
  const findBook = await Book.findOne({ title });
  console.log(findBook);
  const update = {};
  const updateStock = findBook.stock - stock;
  if (stock) update["stock"] = updateStock;
  const addSells = findBook.sells + stock;
  update["sells"] = addSells;
  await Book.updateOne({ title }, { $set: update });
}
const createOrder = async (req, res) => {
  try {
    const { userId, booksBought, total } = req.body;

    booksBought.map((bookb) => {
      handleStock(bookb.title, bookb.stock);
    });
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .send("Error only a registered user can have orders");
    }
    console.log(booksBought);
    const order = new Order({ userId, booksBought: [...booksBought], total });
    console.log(order);
    await order.save();
    return res.status(203).send("The order has been created");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getAllOrders = async (req, res) => {
  Order.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};
const getOrderById = (req, res) => {
  const { id } = req.params;
  Order.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
};
