const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// When a POST request is made to /api/customers/, call the createCustomer function
router.post('/', customerController.createCustomer);

// When a GET request is made to /api/customers/:id, call the getCustomerById function
router.get('/:id', customerController.getCustomerById);

module.exports = router;
