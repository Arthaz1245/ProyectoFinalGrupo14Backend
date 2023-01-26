const Book = require("../models/book");

const searchBook = (req, res) => {
  const { q } = req.query;
  Book.find({
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
  Book.find({
    title: { $regex: q, $options: "i" },
  })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

const searchBookByAuthor = (req, res) => {
  const { q } = req.query;
  Book.find({
    author: { $regex: q, $options: "i" },
  })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

// const createBook = (req, res) => {

//   const book = new Book(req.body);

//   book
//     .save()
//     .then((data) => res.json(data))
//     .catch((error) => res.json({ message: error }));
// };
const createBook = async (req, res) => {
  const {
    publishDate,
    title,
    author,
    genre,
    description,
    pageCount,
    price,
    image,
    quantityInStock,
  } = req.body;

  try {
    const titleFind = await Book.findOne({ title });
    if (titleFind)
      return res.status(400).send("Error a book with that name already exist.");
    const book = new Book({
      publishDate,
      title,
      author,
      genre,
      description,
      pageCount,
      price,
      image,
      quantityInStock,
    });
    await book.save();

    return res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: "Error adding a new book" });
  }
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

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const update = {};

    if (req.body.publishDate) update["publishDate"] = req.body.publishDate;
    if (req.body.title) update["title"] = req.body.title;
    if (req.body.author) update["author"] = req.body.author;
    if (req.body.genre) update["genre"] = req.body.genre;
    if (req.body.description) update["description"] = req.body.description;
    if (req.body.pageCount) update["pageCount"] = req.body.pageCount;
    if (req.body.price) update["price"] = req.body.price;
    if (req.body.image) update["image"] = req.body.image;
    if (req.body.quantityInStock) update["image"] = req.body.quantityInStock;
    const data = await Book.updateOne({ _id: id }, { $set: update });
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  Book.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
};

//ruta para carrito

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBook,
  searchBookByTitle,
  searchBookByAuthor,
};
