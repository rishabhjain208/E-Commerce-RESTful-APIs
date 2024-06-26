const express = require("express");
const {
  createPayment,
  getPayments,
} = require("../controllers/paymentController");
const { auth } = require("../middleware/verify");
const router = express.Router();

router.post("/create-payment", auth, createPayment);
router.get("/get-payment", auth, getPayments);

module.exports = router;
