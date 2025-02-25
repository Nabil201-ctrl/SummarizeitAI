// controllers/deepLearningController.js
const User = require('../models/User');

// Get deep learning data for a book
exports.getDeepLearning = async (req, res, next) => {
  try {
    // Comment: Fetches user book data, optimized for performance with indexing
    const user = await User.findById(req.user.id).select('deepLearningConfig plan books');
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    const book = user.books.id(req.params.id);
    if (!book) return res.status(404).render('error', { message: 'Book not found' });

    // Calculate progress and analytics (simplified)
    book.progress = Math.floor(Math.random() * 100); // Placeholder, replace with actual logic
    book.overallProgress = Math.floor(Math.random() * 100);
    book.completedCards = Math.floor(Math.random() * 50);
    book.totalCards = Math.floor(Math.random() * 100);
    book.timeSpent = Math.floor(Math.random() * 20);
    book.speed = Math.floor(Math.random() * 5);
    book.insights = 'Focus on key chapters';

    // Comment: Renders with flip animation, parallax background
    res.render('deepLearning', { 
      user: user, 
      book: book, 
      title: 'Deep Learning', 
      activeTab: 'notes' 
    });
  } catch (err) {
    next(err);
  }
};

// Highlight text in notes
exports.highlightText = async (req, res, next) => {
  try {
    // Comment: Highlights text with flip animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const book = user.books.id(req.body.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    book.highlights.push({ ...req.body.highlight, id: req.body.highlight.id });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Edit notes
exports.editNotes = async (req, res, next) => {
  try {
    // Comment: Edits notes with fade animation feedback, optimized for performance
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const book = user.books.id(req.body.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    book.notes = req.body.notes;
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Annotate text
exports.annotateText = async (req, res, next) => {
  try {
    // Comment: Annotates text with pop animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const book = user.books.id(req.body.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    book.annotations.push(req.body.annotation);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Export notes
exports.exportNotes = async (req, res, next) => {
  try {
    // Comment: Exports notes with zoom animation feedback, optimized for performance
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const book = user.books.id(req.body.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const pdfBuffer = Buffer.from(JSON.stringify(book, null, 2)); // Simplified, use a PDF library (e.g., pdfkit)
    res.setHeader('Content-Disposition', `attachment; filename=${book.name}_notes.pdf`);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    next(err);
  }
};

// Customize deep learning settings
exports.customizeDeepLearning = async (req, res, next) => {
  try {
    // Comment: Customizes tools with pop animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.deepLearningConfig = { ...user.deepLearningConfig, ...req.body.config };
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Remove highlight
exports.removeHighlight = async (req, res, next) => {
  try {
    // Comment: Removes highlight with slide-out animation feedback, optimized for performance
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const book = user.books.id(req.body.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    book.highlights = book.highlights.filter(h => h.id !== req.body.highlightId);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Generate question from highlight
exports.generateQuestion = async (req, res, next) => {
  try {
    // Comment: Generates question with pop animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const book = user.books.id(req.body.bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const highlight = book.highlights.find(h => h.id === req.body.highlightId);
    const question = { text: `What is ${highlight.text}?`, type: 'short', source: 'highlight' }; // Simplified, use aiService.js
    res.json({ success: true, question });
  } catch (err) {
    next(err);
  }
};