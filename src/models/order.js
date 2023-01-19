const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("order", userSchema);
