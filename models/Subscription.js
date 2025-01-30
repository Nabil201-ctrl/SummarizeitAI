/////Subscription Schema

import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, required: true },
  price: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  isPremium: { type: Boolean, default: false }, // Determines if the user is a premium subscriber
  features: [String], // List of premium features accessible to the user
  discountCode: { type: String, default: null }, // Stores any applied discount code
  loyaltyReward: { type: Boolean, default: false }, // Flags if the user is eligible for a loyalty reward
});

module.exports = mongoose.model('Subscription', subscriptionSchema);

