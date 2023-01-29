const User = require("../models/user");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const createUser = async (req, res) => {
  const { name, email, password, address, phoneNumber } = req.body;
  try {
    const userFind = await User.findOne({ email });
    if (userFind)
      return res
        .status(400)
        .send("Error user register already with that email.");

    const user = new User({ name, email, password, address, phoneNumber });
    await user.save();

    let config = {
      service: "gmail",
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASSWORD },
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
        intro: `You ${name} have been register succesfully to Novelty Books`,
        table: {
          data: [
            {
              name: `${name}`,
              email: `${email}`,
            },
          ],
        },
      },
    };
    let mail = MailGenerator.generate(response);
    let message = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Registration in novelty books",
      html: mail,
    };
    transporter
      .sendMail(message)
      .then(() => {
        return res.status(201).json({ msg: "you should recieve an email " });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  } catch (e) {
    res.status(400).send(e.message);
  }

  //return res.status(200).json(user);
};
//  let testAccount = await nodemailer.createTestAccount();
//  const transporter = nodemailer.createTransport({
//    host: "smtp.ethereal.email",
//    port: 587,
//    auth: {
//      user: "alda37@ethereal.email",
//      pass: "JESMzm8VRvg5pgyqn3",
//    },
//  });
//  let message = {
//    from: '"Fred Foo 👻" <foo@example.com>', // sender address
//    to: "bar@example.com, baz@example.com", // list of receivers
//    subject: "Hello ✔", // Subject line
//    text: "Hello world?", // plain text body
//    html: "<b>Hello world?</b>", // html body
//  };
//  transporter
//    .sendMail(message)
//    .then(() => {
//      return res.status(201).json({ msg: "you should recieve a message " });
//    })
//    .catch((error) => {
//      res.status(500).json({ error });
//    });
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const getUsers = (req, res) => {
  User.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const update = {};

    if (req.body.rol) update["rol"] = req.body.rol;
    if (req.body.name) update["name"] = req.body.name;
    if (req.body.email) update["email"] = req.body.email;
    if (req.body.password) update["password"] = req.body.password;
    if (req.body.address) update["address"] = req.body.address;
    if (req.body.phoneNumber) update["phoneNumber"] = req.body.phoneNumber;

    const data = await User.updateOne({ _id: id }, { $set: update });
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
