const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userType: {
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
});
module.exports = mongoose.model("user", userSchema);
