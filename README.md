# Node.js RESTful API with Express and MongoDB

This project implements a RESTful API for managing users, products, orders, and payments using Node.js, Express.js, and MongoDB.

## Features

- **User Authentication**: Secure user registration and login using JWT tokens.
- **Product Management**: CRUD operations for managing products, including creation, retrieval, update, and deletion.
- **Order Processing**: Ability to create new orders, retrieve orders by ID, update order status, and delete orders.
- **Payment Integration**: Integration with Stripe for processing payments securely.
- **Middleware**: Authentication middleware (`auth`) to protect routes requiring authentication.
- **Error Handling**: Robust error handling for API requests to ensure reliable performance.
- **Database Integration**: MongoDB integration for storing user data, products, orders, and payments.
- **RESTful API**: API endpoints designed following REST principles for clear and predictable behavior.
- **Environment Variables**: Setup with environment variables for configuration flexibility (MongoDB URI, JWT Secret, Stripe Secret Key).


## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <project-folder>
   
2. **Install dependencies**
   
     ```bash
   npm install

3. **Set up environment variables**
   
     ```bash
   MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    STRIPE_SECRET_KEY=<your-stripe-secret-key>
     
4. **Start the server**

     ```bash
   npm start

### API Endpoints

## Authentication

- **GET /**: Check if the server is running.
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login a user.
 
 ## Products
 
- **POST /api/v1/product/createProduct**: Create a new product (requires authentication).
- **GET /api/v1/product/getProduct**:  Get all products.

## Orders

- **POST /api/v1/order/createOrder**: Create a new order (requires authentication).
- **GET /api/v1/order/getOrder/**: Get an order by ID (requires authentication).
- **GET /api/v1/order/getAllOrder**: Get all orders (requires authentication).
- **PUT /api/v1/order/updateOrderStatus/**: : Update order status by ID (requires authentication).
- **DELETE /api/v1/order/deleteOrder/**: : : Delete an order by ID (requires authentication).
  
## Payments

- **POST /api/v1/payment/create-payment**: Create a payment for an order (requires authentication).
- **GET /api/v1/payment/get-payment**: Get all payments (requires authentication).

## Middleware
 
- **Authentication middleware (auth)**: Verifies JWT token for protected routes.

## Libraries Used

- **List of libraries/frameworks used in your project (e.g., Express, MongoDB, bcrypt, Stripe)**.

## Contributors

- **Rishabh Jain**

## License

This project is licensed under the MIT License - see the LICENSE file for details.
   ```bash
    Replace `<placeholders>` with actual values specific to your project. This template includes sections for features, setup instructions, API endpoints, middleware, libraries used, contributors, and licensing information. Adjust it further based on your specific project details and requirements.
