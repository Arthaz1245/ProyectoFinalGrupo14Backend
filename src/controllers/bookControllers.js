const Book = require("../models/book");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs-extra");

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

const createBook = async (req, res) => {
  try {
    const {
      publishDate,
      title,
      author,
      genre,
      description,
      pageCount,
      price,
      stock,
    } = req.body;

    const book = new Book({
      publishDate,
      title,
      author,
      genre,
      description,
      pageCount,
      price,
      stock,
    });

    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      book.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    await book.save();

    res.json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
    if (req.body.rating) update["rating"] = req.body.rating;

    if (req.body.price) update["price"] = req.body.price;
    if (req.body.stock) update["stock"] = req.body.stock;
    if (req.files && req.files.image) {
      const user = await User.findById(id);
      if (user.image?.public_id) {
        await deleteImage(user.image.public_id);
      }
      const result = await uploadImage(req.files.image.tempFilePath);
      update["image"] = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(req.files.image.tempFilePath);
    }

    const data = await Book.updateOne({ _id: id }, { $set: update });
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book)
      return res.status(404).json({
        message: "Book does not exist",
      });

    if (book.image?.public_id) {
      await deleteImage(book.image.public_id);
    }

    return res.json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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
