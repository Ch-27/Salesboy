const mongoose = require('mongoose');
require('dotenv').config();


const username = encodeURIComponent(process.env.DB_username);
const password = encodeURIComponent(process.env.DB_password);
let uri =
  `mongodb+srv://${username}:${password}@cluster0.s73ig.mongodb.net/SalesDATA?retryWrites=true&w=majority&appName=Cluster0`;

// MongoDB Connection
const connectDB = async () => {
    try {
      await mongoose.connect(uri);
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);  // Exit with failure code if connection fails
    }
  };

  module.exports = connectDB;