const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBook,
  searchBookByTitle,
  searchBookByAuthor,
  addRating,
} = require("../controllers/bookControllers");

router.post(
  "/",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createBook
);
router.get("/", getBooks);
router.get("/search", searchBook);
router.get("/search/title", searchBookByTitle);
router.get("/search/author", searchBookByAuthor);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.post("/rating/:id", addRating);
router.put(
  "/:id",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  updateBook
);

router.delete("/:id", deleteBook);

module.exports = router;
