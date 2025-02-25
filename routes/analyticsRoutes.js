// routes/analyticsRoutes.js
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { isAuthenticated } = require('../middleware/auth');

// Protect routes with authentication
router.get('/', isAuthenticated, analyticsController.getAnalytics);
router.post('/export', isAuthenticated, analyticsController.exportAnalytics);

module.exports = router;