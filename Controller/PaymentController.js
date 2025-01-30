const paypalService = require('../services/paypalService');
const { generatePaymentSlip, sendPaymentSlipEmail } = require('../services/emailService');
const Payment = require('../models/Payment'); // Assuming you have a Payment model to save the transaction details

// Create Subscription
exports.createSubscription = async (req, res) => {
  try {
    const subscription = await paypalService.createSubscription();
    res.redirect(subscription.approval_url);  // Redirect user to PayPal for approval
  } catch (error) {
    console.log('Error creating subscription:', error);
    res.status(500).send('Internal server error while creating subscription.');
  }
};

// Handle PayPal success
exports.paypalSuccess = async (req, res) => {
  try {
    // Assuming you get payment details from PayPal after success (capture payment details)
    const paymentDetails = {
      paymentId: req.query.paymentId,  // This will be returned by PayPal
      amount: req.query.amount,        // Example of amount, could vary
      date: new Date().toLocaleDateString(),
      status: 'completed',             // Payment successful
    };

    // Generate Payment Slip (PDF)
    const filePath = generatePaymentSlip(paymentDetails);

    // Send Payment Slip via Email to User
    await sendPaymentSlipEmail(req.user.email, paymentDetails, filePath);

    // Save payment record to database
    const newPayment = new Payment({
      userId: req.user._id,  // Assuming req.user is the authenticated user
      amount: paymentDetails.amount,
      paymentStatus: paymentDetails.status,
      paymentDate: paymentDetails.date,
      paymentSlipPath: filePath,  // Path to generated PDF
    });

    await newPayment.save();  // Save the payment info in the database

    // Render success page
    res.render('success', { paymentDetails });

  } catch (error) {
    console.log('Error processing PayPal success:', error);
    res.status(500).send('Internal server error while processing PayPal payment.');
  }
};

// Handle PayPal cancellation
exports.paypalCancel = (req, res) => {
  res.render('cancel');  // Render cancellation page
};
