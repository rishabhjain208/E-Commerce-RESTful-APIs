const Products = require("../models/Products");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, discription } = req.body;

    const newProduct = new Products({
      name: name,
      price: price,
      discription: discription,
    });

    const product = await newProduct.save();

    return res.status(200).json({
      message: "Product created successfully",
      product,
    });
  } catch (e) {
    return res.status(400).json({
      message: "Error creating product",
      error: e.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const products = await Products.find();
    if (!products) {
      return res.status(404).json({
        message: "No products found",
      });
    }
    return res.status(200).json({
      message: "Products fetched successfully",
      products,
    });
  } catch (e) {
    return res.status(400).json({
      error: e.message,
    });
  }
};
