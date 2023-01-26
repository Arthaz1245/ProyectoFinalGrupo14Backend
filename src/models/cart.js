const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("Cart", cartSchema);
