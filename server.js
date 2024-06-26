const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const auth = require("./routes/auth");
const rateLimit = require("express-rate-limit");
const product = require("./routes/product");
const order = require("./routes/order");
const payment = require("./routes/payment");
dotenv.config();
const mongoose = require("mongoose");
const corsOptions = {
  origin: true,
  credentials: true,
};

// Testing endpoint
app.get("/", (req, res) => {
  return res.send("working");
});

// MongoDB Connection
mongoose.set("strictQuery", false);
const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/product", product);
app.use("/api/v1/order", order);
app.use("/api/v1/payment", payment);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  Connect();
  console.log(`Server running on port ${PORT}`);
});
