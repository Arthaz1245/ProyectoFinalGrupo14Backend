const User = require("../models/user");

const createUser = async (req, res) => {
  const { name, email, password, address, phoneNumber } = req.body;

  try {
    const user = User.create({ name, email, password, address, phoneNumber });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error creating account' });
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
  User
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const getUserById = (req, res) => {
  const { id } = req.params;
  User
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { rol, name, email, password, address, phoneNumber } = req.body;
  User
    .updateOne(
      { _id: id },
      { $set: { rol, name, email, password, address, phoneNumber } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  User
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}