// /services/PaypalService.js
const dotenv = require('dotenv');
dotenv.config()
import paypal from 'paypal-rest-sdk';

// Configure PayPal SDK with environment variables
paypal.configure({
    mode: process.env.PAYPAL_MODE, // 'sandbox' or 'live'
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
});

// Create PayPal payment
const createPayment = (amount) => {
    return new Promise((resolve, reject) => {
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:5000/payment/execute",
                "cancel_url": "http://localhost:5000/payment/cancel"
            },
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": amount
                },
                "description": "Subscription payment"
            }]
        };

        paypal.payment.create(create_payment_json, (error, payment) => {
            if (error) {
                reject(error);
            } else {
                resolve(payment);
            }
        });
    });
};

// Execute PayPal payment after approval
const executePayment = (paymentId, payerId) => {
    return new Promise((resolve, reject) => {
        const execute_payment_json = {
            "payer_id": payerId
        };

        paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
            if (error) {
                reject(error);
            } else {
                resolve(payment);
            }
        });
    });
};

// Default export
module.exports = { createPayment, executePayment };
