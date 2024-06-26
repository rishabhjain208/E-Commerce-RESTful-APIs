const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");

// Load environment variables
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // You can configure corsOptions if needed

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);

// MongoDB Connection (using a separate test database)
beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI_TEST; // Use a separate test database URI
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
});

// Close MongoDB connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
});

// Example test case
describe("GET /", () => {
  it('should return "working"', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("working");
  });
});

// Add more test cases for your endpoints

// Start the tests
describe("API Endpoints", () => {
  // Test cases for /api/v1/auth endpoints
  describe("/api/v1/auth", () => {
    // Example test case for POST /api/v1/auth/register
    describe("POST /register", () => {
      it("should register a new user", async () => {
        const newUser = {
          email: "test@example.com",
          password: "password123",
          username: "testuser",
        };

        const response = await request(app)
          .post("/api/v1/auth/register")
          .send(newUser);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.token).toBeDefined();
      });
    });

    // Add more test cases for other auth routes as needed
  });

  // Test cases for /api/v1/product endpoints
  describe("/api/v1/product", () => {
    // Example test case for GET /api/v1/product
    describe("GET", () => {
      it("should get all products", async () => {
        const response = await request(app).get("/api/v1/product");
        expect(response.status).toBe(200);
        expect(response.body.products).toBeDefined();
      });
    });

    // Add more test cases for other product routes as needed
  });

  // Test cases for /api/v1/order endpoints
  describe("/api/v1/order", () => {
    // Example test case for POST /api/v1/order
    describe("POST", () => {
      it("should create a new order", async () => {
        const newOrder = {
          // Define order data
        };

        const response = await request(app)
          .post("/api/v1/order")
          .send(newOrder);

        expect(response.status).toBe(201);
        expect(response.body.order).toBeDefined();
      });
    });

    // Add more test cases for other order routes as needed
  });

  // Test cases for /api/v1/payment endpoints
  describe("/api/v1/payment", () => {
    // Example test case for POST /api/v1/payment
    describe("POST", () => {
      it("should create a new payment", async () => {
        const newPayment = {
          // Define payment data
        };

        const response = await request(app)
          .post("/api/v1/payment")
          .send(newPayment);

        expect(response.status).toBe(200);
        expect(response.body.payment).toBeDefined();
      });
    });

    // Add more test cases for other payment routes as needed
  });
});

// Start the Express server for testing
const PORT = 5001; // Use a different port for testing if needed
const server = app.listen(PORT, () => {
  console.log(`Test server is running on port ${PORT}`);
});

module.exports = server; // Export the server for supertest to use
