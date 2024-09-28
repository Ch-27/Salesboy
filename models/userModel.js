import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  preferences: { type: Array, default: [] },   // Stores user preferences
  profile: { type: Object, default: {} },       // Contextual data, purchase history
}, { timestamps: true });

export default mongoose.model('User', userSchema);
