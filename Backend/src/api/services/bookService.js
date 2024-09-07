const Book = require("../models/bookModel");

const createBook = async (bookData) => {
  const newBook = new Book(bookData);
  return await newBook.save();
};

const getAllBooks = async () => {
  return await Book.find();
};

const getBookById = async (id) => {
  return await Book.findById(id);
};

const updateBook = async (id, updatedData) => {
  return await Book.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
};

const updateBookStock = async (id, stock) => {
  return await Book.findByIdAndUpdate(
    id,
    { stock },
    { new: true, runValidators: true }
  );
};

const deleteBook = async (id) => {
  return await Book.findByIdAndDelete(id);
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  updateBookStock,
  deleteBook,
};
