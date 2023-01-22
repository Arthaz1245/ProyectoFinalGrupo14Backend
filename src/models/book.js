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
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("Book", bookSchema);
