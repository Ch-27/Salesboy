const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware   
app.use(express.json());     // Parse JSON request bodies

// Import routes
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);


connectDB();


  // Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
