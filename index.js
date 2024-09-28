import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware   
app.use(express.json());     // Parse JSON request bodies

// Import routes
import userRoutes from './routes/userRoutes.js';
import adRoutes from './routes/adRoutes.js';

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes);


connectDB();


  // Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
