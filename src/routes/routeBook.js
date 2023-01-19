const express = require("express");
const router = express.Router();
const bookSchema = require("../models/book");

router.post("/books", (req, res) => {
  const book = bookSchema(req.body);
  book
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
router.get("/books", (req, res) => {
  bookSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.get("/books/:id", (req, res) => {
  const { id } = req.params;
  bookSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
router.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const {
    publishDate,
    title,
    author,
    genre,
    description,
    pageCount,
    price,
    image,
  } = req.body;
  bookSchema
    .updateOne(
      { _id: id },
      {
        $set: {
          publishDate,
          title,
          author,
          genre,
          description,
          pageCount,
          price,
          image,
        },
      }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

router.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  bookSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
module.exports = router;
