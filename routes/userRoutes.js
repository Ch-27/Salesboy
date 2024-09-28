import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();

// Get all users
router.get('/', userController.getUsers);

// Create a new user
router.post('/', userController.createUser);

export default router;
