// This line loads the environment variables from your .env file
require('dotenv').config();

// Import necessary packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // <-- ADDED THIS LINE

// ---- DATABASE CONNECTION ----
const db = require('./config/db.js');

// ---- ROUTE IMPORTS ----
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const storeRoutes = require('./routes/storeRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');

// Create the Express application
const app = express();

// Set the port from the .env file, or default to 3000
const PORT = process.env.PORT || 3000;

// ---- MIDDLEWARE ----
app.use(cors()); // <-- ADDED THIS LINE to enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This tells Express to serve all static files from the 'public' folder
app.use(express.static('public'));


// ---- API ROUTES ----
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Hyperlocal Delivery API!' });
});

app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/delivery', deliveryRoutes);


// ---- START THE SERVER ----
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
