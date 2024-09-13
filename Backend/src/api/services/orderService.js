const Order = require("../models/orderModel");
const Book = require("../models/bookModel");

const createOrder = async (userId, books) => {
  let totalPrice = 0;

  const bookDetails = await Promise.all(
    books.map(async (bookOrder) => {
      const book = await Book.findById(bookOrder.book);
      if (!book) {
        throw new Error(`Book with ID ${bookOrder.book} not found`);
      }

      totalPrice += book.price * bookOrder.quantity;
      return { book: book._id, quantity: bookOrder.quantity };
    })
  );

  const newOrder = new Order({
    user: userId,
    books: bookDetails,
    totalPrice,
  });

  return await newOrder.save();
};

const getUserOrders = async (userId) => {
  return await Order.find({ user: userId }).populate("books.book");
};

const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  order.status = status;
  return await order.save();
};

const deleteOrder = async (orderId) => {
  return await Order.findByIdAndDelete(orderId);
};

module.exports = {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
};
