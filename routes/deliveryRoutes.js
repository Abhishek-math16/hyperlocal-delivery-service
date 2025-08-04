const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');

// Route to create a new delivery person
// POST /api/delivery
router.post('/', deliveryController.createDeliveryPersonnel);

// Route to get a specific delivery person by their ID
// GET /api/delivery/:id
router.get('/:id', deliveryController.getDeliveryPersonnelById);

// Route to update a delivery person's location and status
// PUT /api/delivery/:id
router.put('/:id', deliveryController.updateDeliveryPersonnel);

module.exports = router;
