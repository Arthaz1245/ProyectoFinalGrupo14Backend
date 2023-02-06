const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

router.post(
  "/signup",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createUser
);
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
