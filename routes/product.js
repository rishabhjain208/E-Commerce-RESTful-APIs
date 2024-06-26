const express = require("express");
const { auth } = require("../middleware/verify");
const {
  createProduct,
  getProduct,
} = require("../controllers/productController");
const router = express.Router();

router.post("/createProduct", auth, createProduct);
router.get("/getProduct", getProduct);

module.exports = router;
