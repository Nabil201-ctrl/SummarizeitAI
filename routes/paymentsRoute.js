///////// Payements Route ///////////

// /routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
<<<<<<< HEAD
import paymentController from '../Controllers/PaymentController';

// PayPal payment creation route
router.post('/create', paymentController.createPayment);

// PayPal payment execution route
router.post('/execute', paymentController.executePayment);
=======
const paymentsController = require('../controllers/paymentsController');

// PayPal payment creation route
router.post('/create', paymentsController.createPayment);

// PayPal payment execution route
router.post('/execute', paymentsController.executePayment);
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

module.exports = router;

