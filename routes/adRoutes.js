const express = require('express');
const { generateAd } = require('../controllers/adController');
const router = express.Router();

// Generate a personalized ad for a user
router.post('/generate', generateAd);

module.exports = router;
