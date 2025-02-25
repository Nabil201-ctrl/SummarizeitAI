// routes/summarizedPDFRoutes.js
const express = require('express');
const router = express.Router();
const summarizedPDFController = require('../controllers/summarizedPDFController');
const { isAuthenticated } = require('../middleware/auth');

// Protect routes with authentication
router.get('/:id', isAuthenticated, summarizedPDFController.getSummarizedPDF);
router.post('/export/:id', isAuthenticated, summarizedPDFController.exportPDF);

module.exports = router;