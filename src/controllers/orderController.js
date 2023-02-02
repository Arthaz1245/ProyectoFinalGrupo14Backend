const User = require("../models/user");
const Order = require("../models/order");
const Book = require("../models/book");

const createOrder = async (req, res) => {
  try {
    const { userId, total } = req.body;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .send("Error only a registered user can have orders");
    }

    const order = new Order({ userId, total });
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
const updateOrderBookIn = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    const { title } = req.body;
    const book = Book.findOne(title);
    if (!book)
      return res.status(400).send("Error THIS BOOK IS NOT IN OUR INVENTORY");

    if (title) {
      if (!order.booksBought.includes(title)) {
        await order.updateOne({ $push: { booksBought: title } });
        res.status(200).json("The book for the order has been added");
      } else {
        res
          .status(404)
          .json("The book cannot be added it's already in the order");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createOrder,
  updateOrderBookIn,
  getAllOrders,
};
