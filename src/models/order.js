const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "processing",
    },
    items: {
      type: Number,
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
  },
  { minimize: false }
);
module.exports = mongoose.model("Order", orderSchema);
