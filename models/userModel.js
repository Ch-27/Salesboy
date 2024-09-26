const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  preferences: { type: Array, default: [] },   // Stores user preferences
  profile: { type: Object, default: {} },       // Contextual data, purchase history
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
