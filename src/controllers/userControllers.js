const User = require("../models/user");

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

    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Error creating account" });
  }
};

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

    if (req.body.rol) update['rol'] = req.body.rol;
    if (req.body.name) update['name'] = req.body.name;
    if (req.body.email) update['email'] = req.body.email;
    if (req.body.password) update['password'] = req.body.password;
    if (req.body.address) update['address'] = req.body.address;
    if (req.body.phoneNumber) update['phoneNumber'] = req.body.phoneNumber;

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
