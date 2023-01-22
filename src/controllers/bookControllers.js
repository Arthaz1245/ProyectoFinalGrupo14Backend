const Book = require("../models/book");

const searchBook = (req, res) => {
  const { q } = req.query;
  Book
    .find({
      $or: [
        { title: { $regex: q, $options: "i" } }, //para buscar por palabra exacta: `^${q}$`
        { author: { $regex: q, $options: "i" } },
      ],
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const searchBookByTitle = (req, res) => {
  const { q } = req.query;
  Book
    .find({
      title: { $regex: q, $options: "i" },
    })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const searchBookByAuthor = (req, res) => {
    const { q } = req.query;
    Book
      .find({
        author: { $regex: q, $options: "i" },
      })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };

const createBook = (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const getBooks = (req, res) => {
  Book.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const getBookById = (req, res) => {
  const { id } = req.params;
  Book.findById(id)
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
  Book.updateOne(
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
  Book.deleteOne({ _id: id })
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
