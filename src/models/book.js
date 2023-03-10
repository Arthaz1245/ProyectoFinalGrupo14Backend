const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    publishDate: {
      type: String,
      required: true,
      default: new Date().toISOString().split("T")[0],
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      public_id: String,
      secure_url: String,
    },
    rating: {
      type: Array,
    },
    ratingPorcentage: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      require: true,
    },
    sells: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("Book", bookSchema);
