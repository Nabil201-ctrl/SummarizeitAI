///////// Payements Route ///////////

// /routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController');

// PayPal payment creation route
router.post('/create', paymentsController.createPayment);

// PayPal payment execution route
router.post('/execute', paymentsController.executePayment);

module.exports = router;

