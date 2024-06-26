const Stripe = require("stripe");
const Payment = require("../models/Payment");
const Order = require("../models/Order");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;

    const order = await Order.findById(orderId).populate("products.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const amount = order.totalAmount * 100;

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      payment_method_types: ["card"],
      confirm: true,
      receipt_email: req.user.email,
    });

    // Save payment details to the database
    const newPayment = new Payment({
      orderId,
      amount: order.totalAmount,
      paymentMethod: paymentMethod,
      status: paymentIntent.status,
    });

    const payment = await newPayment.save();

    // Update order status
    order.status = "Processing";
    await order.save();

    return res.status(200).json({
      message: "Payment created successfully",
      payment,
    });
  } catch (e) {
    return res.status(400).json({
      message: "Error creating payment",
      error: e.message,
    });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    return res.status(200).json({
      message: "Payments fetched successfully",
      payments,
    });
  } catch (e) {
    return res.status(400).json({
      message: "Error fetching payments",
      error: e.message,
    });
  }
};
