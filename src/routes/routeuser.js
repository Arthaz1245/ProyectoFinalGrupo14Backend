const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");

router.post("/users/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = userSchema.create({ name, email, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json("Error to create the acccount", error);
  }
});
router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    res.status(200), json(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { rol, name, email, password, address, phoneNumber } = req.body;
  userSchema
    .updateOne(
      { _id: id },
      { $set: { rol, name, email, password, address, phoneNumber } }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
module.exports = router;
