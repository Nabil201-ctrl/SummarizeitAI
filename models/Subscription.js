/////Subscription Schema

import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  price: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
