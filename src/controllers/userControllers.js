const User = require("../models/user");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const bcrypt = require("bcrypt");
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    !user && res.status(404).json({ msg: "Invalid email it doesnt exist" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword &&
      res.status(400).json({ msg: "Invalid email it doesnt exist" });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).send(e.message);
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
  const {
    body: { userId },
    params: { id },
  } = req;
  if (userId === id || req.user.rolAdmin) {
    try {
      const update = {};

      if (req.body.rol) update["rol"] = req.body.rol;
      if (req.body.name) update["name"] = req.body.name;
      if (req.body.email) update["email"] = req.body.email;
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (error) {
          return res.status(500).json({ message: error });
        }
      }
      if (req.body.address) update["address"] = req.body.address;
      if (req.body.phoneNumber) update["phoneNumber"] = req.body.phoneNumber;

      const data = await User.updateOne({ _id: id }, { $set: update });
      res.json(data);
    } catch (error) {
      res.json({ message: error });
    }
  } else {
    return res.status(400).json({ msg: "You can only update your account" });
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
