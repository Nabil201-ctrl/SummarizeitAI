// routes/flashcardRoutes.js
const express = require('express');
const router = express.Router();
const flashcardController = require('../controllers/flashcardController');
const { isAuthenticated } = require('../middleware/auth');

// Protect routes with authentication
router.get('/', isAuthenticated, flashcardController.getFlashcards);
router.get('/create', isAuthenticated, (req, res) => {
  // Comment: Renders create page with bounce animation
  res.render('createFlashcards', { user: req.user, title: 'Create Flashcard' });
});
router.post('/create', isAuthenticated, flashcardController.createFlashcard);
router.get('/modify/:id', isAuthenticated, async (req, res, next) => {
  // Comment: Renders modify page with flip animation
  const user = await User.findById(req.user.id);
  const flashcard = user.flashcards.id(req.params.id);
  if (!flashcard) return res.status(404).render('error', { message: 'Flashcard not found' });
  res.render('modifyFlashcards', { user: user, flashcard: flashcard, title: 'Modify Flashcard' });
});
router.post('/modify/:id', isAuthenticated, flashcardController.modifyFlashcard);
router.get('/delete/:id', isAuthenticated, async (req, res, next) => {
  // Comment: Renders delete confirmation with pulse animation
  const user = await User.findById(req.user.id);
  const flashcard = user.flashcards.id(req.params.id);
  if (!flashcard) return res.status(404).render('error', { message: 'Flashcard not found' });
  res.render('deleteFlashcards', { user: user, flashcard: flashcard, title: 'Delete Flashcard' });
});
router.delete('/delete/:id', isAuthenticated, flashcardController.deleteFlashcard);

module.exports = router;