const Store = require('../models/storeModel');

// This function is now updated to handle the location object
exports.createStore = async (req, res) => {
  try {
    const newStore = await Store.create(req.body);
    res.status(201).json({
      success: true,
      data: newStore
    });
  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ success: false, error: 'Store not found' });
    }
    res.status(200).json({ success: true, data: store });
  } catch (error) {
    console.error('Error getting store:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// --- NEW Controller for finding nearby stores ---
exports.findNearbyStores = async (req, res) => {
  try {
    // Get lat, lon, and radius from query parameters in the URL
    // e.g., /api/stores/nearby?lat=12.97&lon=77.59&radius=5000
    const { lat, lon, radius = 5000 } = req.query; // Default radius is 5km

    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        message: 'Please provide latitude (lat) and longitude (lon) query parameters.'
      });
    }

    const stores = await Store.findNearby(parseFloat(lat), parseFloat(lon), parseInt(radius));
    res.status(200).json({
      success: true,
      count: stores.length,
      data: stores
    });
  } catch (error) {
    console.error('Error finding nearby stores:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
