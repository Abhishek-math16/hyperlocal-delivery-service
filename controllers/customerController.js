const Customer = require('../models/customerModel');

// Controller function to handle creating a new customer
exports.createCustomer = async (req, res) => {
  try {
    // req.body contains the JSON data sent from the client (e.g., { "name": "Jane Doe", "phone": "555-5678" })
    const newCustomer = await Customer.create(req.body);
    res.status(201).json({
      success: true,
      data: newCustomer
    });
  } catch (error) {
    // This will catch errors, like trying to create a customer with a phone number that already exists
    console.error('Error creating customer:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controller function to handle getting a single customer by their ID
exports.getCustomerById = async (req, res) => {
  try {
    // req.params.id gets the ID from the URL (e.g., /api/customers/1)
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      // If no customer is found with that ID, send a 404 Not Found error
      return res.status(404).json({
        success: false,
        error: 'Customer not found'
      });
    }

    res.status(200).json({
      success: true,
      data: customer
    });
  } catch (error) {
    console.error('Error getting customer:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
