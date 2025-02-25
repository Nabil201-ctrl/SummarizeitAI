// routes/historyRoutes.js
const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');
const { isAuthenticated } = require('../middleware/auth');

// Protect routes with authentication
router.get('/', isAuthenticated, historyController.getFileHistory);
router.delete('/delete/:id', isAuthenticated, historyController.deleteFile);

module.exports = router;