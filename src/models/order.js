const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const orderSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    booksBought: {
      type: Array,
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    total: {
      type: Number,
    },
  },
  { versionKey: false }
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
