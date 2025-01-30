const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const pdfkit = require('pdfkit');
require('dotenv').config();

// Nodemailer transporter setup for email sending
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate Payment Slip as a PDF
function generatePaymentSlip(paymentDetails) {
  const doc = new pdfkit();
  const filePath = path.join(__dirname, '..', 'public', 'payment-slips', `payment-slip-${paymentDetails.paymentId}.pdf`);

  doc.pipe(fs.createWriteStream(filePath)); // Write to the file

  doc.fontSize(25).text('Payment Receipt', { align: 'center' });

  doc.fontSize(12).text(`Amount: $${paymentDetails.amount}`, { align: 'left' });
  doc.text(`Payment Date: ${paymentDetails.date}`, { align: 'left' });
  doc.text(`Payment Status: ${paymentDetails.status}`, { align: 'left' });

  doc.end();  // Finalize the PDF

  return filePath; // Return the path to the generated payment slip
}

// Send Email with Payment Slip as Attachment
function sendPaymentSlipEmail(userEmail, paymentDetails, filePath) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Your Payment Slip',
    text: 'Dear User, please find your payment slip attached.',
    attachments: [
      {
        filename: `payment-slip-${paymentDetails.paymentId}.pdf`, // File name
        path: filePath, // Path to the generated PDF
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending payment slip email:', error);
    } else {
      console.log('Payment slip sent: ' + info.response);
    }
  });
}

module.exports = { generatePaymentSlip, sendPaymentSlipEmail };
