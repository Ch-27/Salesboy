import express from 'express';
import  generateAd  from '../controllers/adController.js';
const router = express.Router();

// Generate a personalized ad for a user
router.post('/generate', generateAd);

export default router;
