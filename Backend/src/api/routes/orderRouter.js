const express = require("express");
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const verifyAdmin = require("../middlewares/verifyAdmin");

router.post("/", createOrder);
router.get("/:id", getUserOrders);
router.patch("/:id/status", verifyAdmin, updateOrderStatus);
router.delete("/:id", verifyAdmin, deleteOrder);

module.exports = router;
