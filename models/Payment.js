const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Card", "UPI", "Net banking"],
    default: "Card",
  },
  status: {
    type: String,
    enum: [
      "succeeded",
      "requires_action",
      "requires_payment_method",
      "canceled",
    ],
    default: "requires_payment_method",
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);
