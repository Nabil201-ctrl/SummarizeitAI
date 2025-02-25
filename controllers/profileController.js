// controllers/profileController.js
const User = require('../models/User');

// Get profile for user
exports.getProfile = async (req, res, next) => {
  try {
    // Comment: Fetches user profile, optimized for performance with indexing
    const user = await User.findById(req.user.id).select('name email photo createdAt streaks progress plan badges leaderboardRank actionCount');
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    // Increment action count for review popup
    user.actionCount = (user.actionCount || 0) + 1;
    await user.save();

    // Calculate progress and stats (simplified)
    user.progress = Math.floor(Math.random() * 100); // Placeholder, replace with actual logic
    user.badges = user.plan === 'Premium' ? ['Scholar', 'Leader'] : [];
    user.leaderboardRank = user.plan === 'Premium' ? Math.floor(Math.random() * 100) : 'N/A';

    // Comment: Renders with fade-in animation, parallax background, triggers review popup
    res.render('profile', { user: user, title: 'Profile' });
  } catch (err) {
    next(err);
  }
};

// Upload profile photo
exports.uploadPhoto = async (req, res, next) => {
  try {
    // Comment: Uploads photo with zoom animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const photo = req.file; // Assuming multer middleware for file upload
    user.photo = `/public/uploads/${photo.filename}`;
    await user.save();
    res.json({ success: true, url: user.photo });
  } catch (err) {
    next(err);
  }
};

// Edit profile (simplified, expand for full form)
exports.editProfile = async (req, res, next) => {
  try {
    // Comment: Edits profile with bounce animation feedback, optimized for performance
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    user.name = req.body.name || user.name;
    await user.save();
    res.redirect('/profile');
  } catch (err) {
    next(err);
  }
};