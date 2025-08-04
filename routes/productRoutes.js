const express = require('express');
// This allows us to access parameters from the parent router (e.g., :storeId)
const router = express.Router({ mergeParams: true });
const productController = require('../controllers/productController');

// Route for /api/stores/:storeId/products
router.route('/')
  .post(productController.addProductToStore)
  .get(productController.getProductsByStore);

module.exports = router;
