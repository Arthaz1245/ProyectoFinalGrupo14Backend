const User = require("../models/user");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const bcrypt = require("bcrypt");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs-extra");

const createUser = async (req, res) => {
  try {
    const { name, email, password, address, phoneNumber } = req.body;
    const userFind = await User.findOne({ email });
    if (userFind)
      return res
        .status(400)
        .send("Error user register already with that email.");

    const user = new User({ name, email, password, address, phoneNumber });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      user.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }
    console.log(user);
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
    if (!user) {
      return res.status(404).json({ msg: "Invalid email it doesnt exist" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    if (user.isDeleted === true) {
      return res.status(404).json({ msg: "Error this user has been banned" });
    }

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
      // if (req.files.image) {
      //   if (user.image?.public_id) {
      //     await deleteImage(user.image.public_id);
      //   }
      //   const result = await uploadImage(req.files.image.tempFilePath);
      //   update["image"] = {
      //     public_id: result.public_id,
      //     secure_url: result.secure_url,
      //   };
      //   await fs.unlink(req.files.image.tempFilePath);
      // }
      const data = await User.updateOne({ _id: id }, { $set: update });
      res.json(data);
    } catch (error) {
      res.json({ message: error });
    }
  } else {
    return res.status(400).json({ msg: "You can only update your account" });
  }
};
const logicDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isDeleted = true;
    await user.save();
    res.json({ message: "User banned" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const unbannedUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (!user.isDeleted) {
      return res.status(400).json({ message: "User has been unbanned" });
    }
    user.isDeleted = false;
    await user.save();
    res.json({ message: "The unbanned has been succesful" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user)
      return res.status(404).json({
        message: "User does not exist",
      });

    if (user.image?.public_id) {
      await deleteImage(user.image.public_id);
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  logicDelete,
  unbannedUser,
};
