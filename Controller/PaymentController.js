// /controllers/PaymentController.js
const paypalService = require('../services/PaypalService');  // Import the PayPal service

// Route to create a PayPal payment
exports.createPayment = async (req, res) => {
    try {
        const payment = await paypalService.createPayment(req.body.amount);  // Call createPayment from PayPal service
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating PayPal payment', error });
    }
};

// Route to handle PayPal payment execution
exports.executePayment = async (req, res) => {
    try {
        const paymentDetails = await paypalService.executePayment(req.body.paymentId, req.body.payerId);  // Call executePayment from PayPal service
        res.json(paymentDetails);
    } catch (error) {
        res.status(500).json({ message: 'Error executing PayPal payment', error });
    }
};
