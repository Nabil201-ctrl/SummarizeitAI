// controllers/notesController.js
const User = require('../models/User');

// Get notes for user
exports.getNotes = async (req, res, next) => {
  try {
    // Comment: Fetches user notes, optimized for performance with indexing
    const user = await User.findById(req.user.id).select('notes plan actionCount');
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    // Increment action count for review popup
    user.actionCount = (user.actionCount || 0) + 1;
    await user.save();

    // Calculate progress for each note (simplified)
    user.notes.forEach(note => {
      note.progress = Math.floor(Math.random() * 100); // Placeholder, replace with actual logic
    });

    // Comment: Renders with slide-up animation, parallax background, triggers review popup
    res.render('notes', { user: user, title: 'Notes' });
  } catch (err) {
    next(err);
  }
};

// Create a new note
exports.createNote = async (req, res, next) => {
  try {
    // Comment: Creates note with bounce animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    const { name, content, file } = req.body;
    user.notes.push({ name, content, file, progress: 0, date: new Date() });
    await user.save();
    res.redirect('/notes');
  } catch (err) {
    next(err);
  }
};

// View/edit a note
exports.viewNote = async (req, res, next) => {
  try {
    // Comment: Views/edits note with slide-up animation feedback, optimized for performance
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    const note = user.notes.id(req.params.id);
    if (!note) return res.status(404).render('error', { message: 'Note not found' });

    // Render edit form or view (simplified, expand for Premium tools)
    res.render('notes/view', { user: user, note: note, title: 'View/Edit Note' });
  } catch (err) {
    next(err);
  }
};

// Delete a note
exports.deleteNote = async (req, res, next) => {
  try {
    // Comment: Deletes note with pulse animation feedback, optimized for mobile
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.notes = user.notes.filter(n => n.id !== req.params.id);
    await user.save();
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};