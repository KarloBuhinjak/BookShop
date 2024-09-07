const bookService = require("../services/bookService");

const createBook = async (req, res, next) => {
  try {
    const {
      title,
      author,
      price,
      description,
      publishDate,
      category,
      language,
      stock,
      coverImage,
      rating,
    } = req.body;

    if (
      !title ||
      !author ||
      !price ||
      !publishDate ||
      !category ||
      !language ||
      !stock
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newBook = {
      title,
      author,
      price,
      description,
      publishDate,
      category,
      language,
      stock,
      coverImage,
      rating,
    };

    const savedBook = await bookService.createBook(newBook);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (err) {
    next(err);
  }
};

const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const updatedData = req.body;

    const updatedBook = await bookService.updateBook(bookId, updatedData);

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (err) {
    next(err);
  }
};

const updateBookStock = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const { stock } = req.body;

    if (typeof stock !== "number" || stock < 0) {
      return res.status(400).json({ message: "Invalid stock value" });
    }

    const updatedBook = await bookService.updateBookStock(bookId, stock);

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: updatedBook,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await bookService.deleteBook(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  updateBookStock,
  deleteBook,
};
