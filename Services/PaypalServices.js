/////// Paypal integration ////////////

const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: process.env.PAYPAL_MODE, // live or sandbox
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

exports.createSubscription = () => {
  const subscriptionDetails = {
    // PayPal subscription creation details
  };
  
  return new Promise((resolve, reject) => {
    paypal.billingAgreement.create(subscriptionDetails, (error, billingAgreement) => {
      if (error) {
        reject(error);
      } else {
        resolve(billingAgreement.links.find(link => link.rel === 'approval_url'));
      }
    });
  });
};
