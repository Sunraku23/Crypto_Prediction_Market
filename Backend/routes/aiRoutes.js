const express = require('express');
const aiController = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Test route tanpa protection
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'AI Routes are working!',
    timestamp: new Date().toISOString()
  });
});

// Protected routes
router.post('/predict', protect, aiController.getPrediction);
router.get('/coins', protect, aiController.getAvailableCoins);
router.get('/health', aiController.getAIHealth);

module.exports = router;