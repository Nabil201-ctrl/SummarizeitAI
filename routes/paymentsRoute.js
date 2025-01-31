import express from 'express';
import { createPayment, executePayment } from '../Controller/PaymentController.js'; // Use named imports

const router = express.Router();

// PayPal payment creation route
router.post('/create', createPayment);

// PayPal payment execution route
router.post('/execute', executePayment);

export default router;
