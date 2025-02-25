// controllers/reviewController.js
const User = require('../models/User');

// Submit review and rating
exports.submitReview = async (req, res, next) => {
  try {
    // Comment: Submits review with pop animation feedback, optimized for performance
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.review = { rating: req.body.rating, feedback: req.body.feedback, date: new Date() };
    user.reviewed = true;
    user.loginCount = 0; // Reset login count after review
    user.actionCount = 0; // Reset action count after review
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Check if review popup should show
exports.checkReviewPopup = async (req, res, next) => {
  try {
    // Comment: Checks review status with pulse animation, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const showPopup = (!user.reviewed && (user.loginCount >= 3 || user.actionCount >= 5));
    res.json({ showPopup });
  } catch (err) {
    next(err);
  }
};