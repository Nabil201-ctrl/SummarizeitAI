// controllers/homeController.js
const User = require('../models/User');

// Get home page for user
exports.getHome = async (req, res, next) => {
  try {
    // Comment: Fetches user home data, optimized for performance with indexing
    const user = await User.findById(req.user?.id).select('name streaks progress storageUsed plan onboarded actionCount');
    if (!user) return res.render('home', { user: null, title: 'Home' });

    // Increment action count for review popup
    user.actionCount = (user.actionCount || 0) + 1;
    await user.save();

    // Calculate stats (simplified)
    user.progress = Math.floor(Math.random() * 100); // Placeholder, replace with actual logic
    user.storageUsed = Math.floor(Math.random() * (user.plan === 'Premium' ? 10000 : user.plan === 'Basic' ? 1000 : 100)); // MB

    // Comment: Renders with fade-in animation, parallax background, triggers review popup
    res.render('home', { 
      user: user, 
      title: 'Home', 
      dashboardBoxes: [] // Can expand with more data
    });
  } catch (err) {
    next(err);
  }
};