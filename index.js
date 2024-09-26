
// // server.js
const express = require('express');
const mongoose = require('mongoose');
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


const username = encodeURIComponent(process.env.DB_username);
const password = encodeURIComponent(process.env.DB_password);
let uri =
  `mongodb+srv://${username}:${password}@cluster0.s73ig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB Connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
