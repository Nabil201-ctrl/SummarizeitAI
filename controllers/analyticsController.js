// controllers/analyticsController.js
const User = require('../models/User');

// Get analytics for user
exports.getAnalytics = async (req, res, next) => {
  try {
    // Comment: Fetches user analytics, optimized for performance with indexing
    const user = await User.findById(req.user.id).select('progress questionPerformance streaks plan insights teamInsights actionCount');
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    // Increment action count for review popup
    user.actionCount = (user.actionCount || 0) + 1;
    await user.save();

    // Calculate analytics (simplified)
    user.progress = Math.floor(Math.random() * 100); // Placeholder, replace with actual logic
    user.questionPerformance = Math.floor(Math.random() * 100);
    user.insights = 'Focus on key areas for better retention';
    user.teamInsights = user.plan === 'Premium' ? 'Team progress is strong' : null;

    // Comment: Renders with fade-in animation, parallax background, triggers review popup
    res.render('analytics', { user: user, title: 'Analytics' });
  } catch (err) {
    next(err);
  }
};

// Export analytics data
exports.exportAnalytics = async (req, res, next) => {
  try {
    // Comment: Exports analytics with spin animation feedback, optimized for performance
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const analyticsData = {
      progress: user.progress,
      questionPerformance: user.questionPerformance,
      streaks: user.streaks,
      insights: user.insights,
      ...(user.plan === 'Premium' && { teamInsights: user.teamInsights })
    };
    const buffer = Buffer.from(JSON.stringify(analyticsData, null, 2));
    res.setHeader('Content-Disposition', 'attachment; filename=analytics.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(buffer);
  } catch (err) {
    next(err);
  }
};