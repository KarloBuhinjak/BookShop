const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  publishDate: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock can't be less than 0"],
  },
  coverImage: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 0,
  },
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
