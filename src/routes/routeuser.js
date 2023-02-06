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

module.exports = router;
