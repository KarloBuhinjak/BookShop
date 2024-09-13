const orderService = require("../services/orderService");

const createOrder = async (req, res, next) => {
  try {
    const { books } = req.body;

    if (!books || books.length === 0) {
      return res.status(400).json({ message: "No books provided" });
    }

    const savedOrder = await orderService.createOrder(req.user._id, books);

    res
      .status(201)
      .json({ message: "Order created successfully", data: savedOrder });
  } catch (err) {
    next(err);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const orders = await orderService.getUserOrders(userId);

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["pending", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedOrder = await orderService.updateOrderStatus(
      req.params.id,
      status
    );

    res
      .status(200)
      .json({ message: "Order status updated", data: updatedOrder });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await orderService.deleteOrder(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
};
