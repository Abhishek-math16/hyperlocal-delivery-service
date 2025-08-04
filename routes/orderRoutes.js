const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// --- NEW Route to get all orders ---
// This MUST come before the '/:id' route
router.get('/', orderController.getAllOrders);

// POST /api/orders
router.post('/', orderController.createOrder);

// GET /api/orders/:id
router.get('/:id', orderController.getOrder);

// POST /api/orders/:orderId/assign-delivery
router.post('/:orderId/assign-delivery', orderController.assignDelivery);

// PATCH /api/orders/:orderId/status
router.patch('/:orderId/status', orderController.updateOrderStatus);

module.exports = router;
