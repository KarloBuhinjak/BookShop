const express = require("express");
const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  updateBookStock,
  deleteBook,
} = require("../controllers/bookController");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post("/", verifyAdmin, createBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.put("/:id", verifyAdmin, updateBook);
router.patch("/:id/stock", verifyAdmin, updateBookStock);
router.delete("/:id", verifyAdmin, deleteBook);

module.exports = router;
