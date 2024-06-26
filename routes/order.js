const express = require("express");
const { auth } = require("../middleware/verify");
const {
  createOrder,
  getOrder,
  getAllOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.post("/createOrder", auth, createOrder);
router.get("/getOrder/:id", auth, getOrder);
router.get("/getAllOrder", auth, getAllOrder);
router.put("/updateOrderStatus/:id", auth, updateOrderStatus);
router.delete("/deleteOrder/:id", auth, deleteOrder);
module.exports = router;
