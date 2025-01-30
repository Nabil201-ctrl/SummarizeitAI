///////// Payements Route ///////////

// /routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
import paymentController from '../Controllers/PaymentController';

// PayPal payment creation route
router.post('/create', paymentController.createPayment);

// PayPal payment execution route
router.post('/execute', paymentController.executePayment);

module.exports = router;

