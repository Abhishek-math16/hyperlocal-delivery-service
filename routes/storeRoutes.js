const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

// --- IMPORT PRODUCT ROUTER ---
const productRouter = require('./productRoutes');

// --- NESTED ROUTE ---
// Tell the store router to use the product router for any path that looks like /:storeId/products
router.use('/:storeId/products', productRouter);


// --- EXISTING STORE ROUTES ---
// This new route must come BEFORE the /:id route
// GET /api/stores/nearby?lat=...&lon=...
router.get('/nearby', storeController.findNearbyStores);

// POST /api/stores
router.post('/', storeController.createStore);

// GET /api/stores/:id
router.get('/:id', storeController.getStoreById);

module.exports = router;
