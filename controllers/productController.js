const Product = require('../models/productModel');

// Controller function to handle adding a product to a store
exports.addProductToStore = async (req, res) => {
  try {
    // The store's ID comes from the URL parameters
    const { storeId } = req.params;
    // The product details come from the request body
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, error: 'Name and price are required.' });
    }

    const newProduct = await Product.create(storeId, { name, price });
    res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    console.error('Error adding product to store:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controller function to get all products for a specific store
exports.getProductsByStore = async (req, res) => {
  try {
    const { storeId } = req.params;
    const products = await Product.findByStoreId(storeId);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Error getting products by store:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
