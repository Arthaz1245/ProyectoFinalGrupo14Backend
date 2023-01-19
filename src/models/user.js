const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    rol: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: false }
);
module.exports = mongoose.model("User", userSchema);
