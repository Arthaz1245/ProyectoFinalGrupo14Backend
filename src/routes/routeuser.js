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
  logicDelete,
  unbannedUser,
  senForgotPasswordEmail,
  // forgotPassword,
  // resetPassword,
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
router.put(
  "/:id",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  updateUser
);
router.delete("/:id", deleteUser);
router.delete("/:id/logicDelete", logicDelete);
router.put("/:id/undo-delete", unbannedUser);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:resetToken", resetPassword);
router.post("/forgotPassword/:id", senForgotPasswordEmail);

module.exports = router;
