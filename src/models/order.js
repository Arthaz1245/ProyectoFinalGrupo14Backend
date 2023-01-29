const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    books: {
      type: Array,
    },
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

    totalValue: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("Order", userSchema);
