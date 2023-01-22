const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");

router.post("users/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await userSchema.create({ name, email, password });
    res.json(user);
    console.log(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.post("users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.findByCredentials(email, password);
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// router.get("/", async (req, res) => {
//   try {
//     const users = await userSchema.find({ isAdmin: false }).populate("orders");
//     res.json(users);
//   } catch (e) {
//     res.status(400).send(e.message);
//   }
// });
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   userSchema
//     .findById(id)
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { rol, name, email, password, address, phoneNumber } = req.body;
//   userSchema
//     .updateOne(
//       { _id: id },
//       { $set: { rol, name, email, password, address, phoneNumber } }
//     )
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   userSchema
//     .deleteOne({ _id: id })
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// });
module.exports = router;
