// /controllers/paymentsController.js
<<<<<<< HEAD
import paypalService from '../Services/PaypalServices';
=======
const paypalService = require('../services/paymentService');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

// Route to create a PayPal payment
exports.createPayment = async (req, res) => {
    try {
        const payment = await paypalService.createPayment(req.body.amount);
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating PayPal payment', error });
    }
};

// Route to handle PayPal payment execution
exports.executePayment = async (req, res) => {
    try {
        const paymentDetails = await paypalService.executePayment(req.body.paymentId, req.body.payerId);
        res.json(paymentDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error executing PayPal payment', error });
    }
};
