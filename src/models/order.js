const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
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
      require: true,
    },
    items: {
      type: Array,
      require: true,
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
  { timestamps: false }
);
module.exports = mongoose.model("Order", userSchema);
