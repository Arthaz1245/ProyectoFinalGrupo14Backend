const User = require("../models/user");
const Order = require("../models/order");
const Book = require("../models/book");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

async function handleStock(title, quantity) {
  const findBook = await Book.findOne({ title });
  const update = {};
  const updateStock = findBook.stock - quantity;
  if (quantity) update["stock"] = updateStock;
  const addSells = findBook.sells + quantity;
  update["sells"] = addSells;
  await Book.updateOne({ title }, { $set: update });
}

const createOrder = async (req, res) => {
  try {
    const { userId, booksBought, total } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(400)
        .send("Error only a registered user can have orders");
    }
    booksBought.map((bookBought) => {
      handleStock(bookBought.title, bookBought.quantity);
    });
    const email = user.email;
    const order = new Order({ userId, booksBought: [...booksBought], total });

    await order.save();

    let config = {
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    };
    let transporter = nodemailer.createTransport(config);
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js",
      },
    });
    let response = {
      body: {
        intro: `You ${email} have bought succesfully and order # ${order._id} of books in Novelty Books`,
        table: {
          data: [
            {
              email: `${email}`,

              total: `${total}`,
            },
          ],
        },
      },
    };
    let mail = MailGenerator.generate(response);
    let message = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Order in book stock",
      html: mail,
    };
    transporter
      .sendMail(message)
      .then(() => {
        return res.status(201).json({
          msg: " The order has been created you should recieve an email ",
        });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });

    //return res.status(203).send("The order has been created");
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
