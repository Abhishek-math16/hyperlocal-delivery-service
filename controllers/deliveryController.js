const DeliveryPersonnel = require('../models/deliveryModel');

// Controller to create a new delivery person
exports.createDeliveryPersonnel = async (req, res) => {
  try {
    const newPerson = await DeliveryPersonnel.create(req.body);
    res.status(201).json({
      success: true,
      data: newPerson
    });
  } catch (error) {
    console.error('Error creating delivery person:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controller to update a driver's location and status
exports.updateDeliveryPersonnel = async (req, res) => {
  try {
    const { id } = req.params; // Get driver's ID from the URL
    // Get location and status from the request body
    const { latitude, longitude, status } = req.body;

    if (!latitude || !longitude || !status) {
      return res.status(400).json({
        success: false,
        error: 'Latitude, longitude, and status are required.'
      });
    }

    const updatedPerson = await DeliveryPersonnel.updateLocationAndStatus(id, { latitude, longitude, status });

    if (!updatedPerson) {
      return res.status(404).json({ success: false, error: 'Delivery person not found.' });
    }

    res.status(200).json({
      success: true,
      data: updatedPerson
    });
  } catch (error) {
    console.error('Error updating delivery person:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Controller to get a single delivery person by ID
exports.getDeliveryPersonnelById = async (req, res) => {
  try {
    const person = await DeliveryPersonnel.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ success: false, error: 'Delivery person not found' });
    }
    res.status(200).json({
      success: true,
      data: person
    });
  } catch (error) {
    console.error('Error getting delivery person:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
