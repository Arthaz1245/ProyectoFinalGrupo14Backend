const bookSchema = require("../models/book");

const createBook = (req, res) => {
  const book = bookSchema(req.body);
  book
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const getBooks = (req, res) => {
  bookSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const getBookById = (req, res) => {
  const { id } = req.params;
  bookSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const updateBook = (req, res) => {
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
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  bookSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const searchBook = (req, res) => {
  const { q } = req.query;
  bookSchema
    .find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
      ],
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const searchBookByTitle = (req, res) => {
  const { q } = req.query;
  bookSchema
    .find({
      title: { $regex: q, $options: "i" },
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const searchBookByAuthor = (req, res) => {
    const { q } = req.query;
    bookSchema
      .find({
        author: { $regex: q, $options: "i" },
      })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBook,
  searchBookByTitle,
  searchBookByAuthor
};
