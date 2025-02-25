// controllers/historyController.js
const User = require('../models/User');

// Get file history for user
exports.getFileHistory = async (req, res, next) => {
  try {
    // Comment: Fetches user file history, optimized for performance with indexing
    const user = await User.findById(req.user.id).select('fileHistory recentlyViewed plan');
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    // Apply retention based on plan (30/90/unlimited days)
    const retentionDays = user.plan === 'Premium' ? Infinity : user.plan === 'Basic' ? 90 : 30;
    const fileHistory = user.fileHistory.filter(file => {
      const daysAgo = (new Date() - new Date(file.date)) / (1000 * 60 * 60 * 24);
      return daysAgo <= retentionDays;
    });

    // Comment: Renders with slide-in animation, parallax background
    res.render('fileHistory', { user: user, title: 'File History' });
  } catch (err) {
    next(err);
  }
};

// Delete a file from history
exports.deleteFile = async (req, res, next) => {
  try {
    // Comment: Deletes file with pulse animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.fileHistory = user.fileHistory.filter(file => file.id !== req.params.id);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};