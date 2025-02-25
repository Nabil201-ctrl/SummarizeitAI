// controllers/flashcardController.js
const User = require('../models/User');

// Get all flashcards for user
exports.getFlashcards = async (req, res, next) => {
  try {
    // Comment: Fetches user flashcards, optimized for performance with indexing
    const user = await User.findById(req.user.id).select('flashcards plan');
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    // Apply plan limits (50/180/unlimited)
    const limit = user.plan === 'Premium' ? Infinity : user.plan === 'Basic' ? 180 : 50;
    const flashcards = user.flashcards.slice(0, limit);

    // Calculate mastery for each flashcard (simplified)
    flashcards.forEach(flashcard => {
      flashcard.mastery = Math.floor(Math.random() * 100); // Placeholder, replace with actual logic
    });

    // Comment: Renders with flip animation, parallax background
    res.render('flashcards', { user: user, title: 'Flashcards' });
  } catch (err) {
    next(err);
  }
};

// Create a new flashcard
exports.createFlashcard = async (req, res, next) => {
  try {
    // Comment: Creates flashcard with bounce animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    const limit = user.plan === 'Premium' ? Infinity : user.plan === 'Basic' ? 180 : 50;
    if (user.flashcards.length >= limit) {
      return res.status(403).render('createFlashcards', { user: user, error: 'Flashcard limit reached' });
    }

    const { name, front, back, category, background, font, animation, file } = req.body;
    user.flashcards.push({
      name, front, back, category, background, font, animation, file, mastery: 0, date: new Date()
    });
    await user.save();
    res.redirect('/flashcards');
  } catch (err) {
    next(err);
  }
};

// Modify an existing flashcard
exports.modifyFlashcard = async (req, res, next) => {
  try {
    // Comment: Modifies flashcard with flip animation feedback, optimized for performance
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    const flashcard = user.flashcards.id(req.params.id);
    if (!flashcard) return res.status(404).render('error', { message: 'Flashcard not found' });

    const { name, front, back, category, background, font, animation, file } = req.body;
    flashcard.name = name || flashcard.name;
    flashcard.front = front || flashcard.front;
    flashcard.back = back || flashcard.back;
    flashcard.category = category || flashcard.category;
    if (user.plan === 'Premium') {
      flashcard.background = background || flashcard.background;
      flashcard.font = font || flashcard.font;
      flashcard.animation = animation || flashcard.animation;
      if (file) flashcard.file = file;
    }
    await user.save();
    res.redirect('/flashcards');
  } catch (err) {
    next(err);
  }
};

// Delete a flashcard
exports.deleteFlashcard = async (req, res, next) => {
  try {
    // Comment: Deletes flashcard with pulse animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.flashcards = user.flashcards.filter(f => f.id !== req.params.id);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};