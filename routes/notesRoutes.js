// routes/notesRoutes.js
const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');
const { isAuthenticated } = require('../middleware/auth');

// Protect routes with authentication
router.get('/', isAuthenticated, notesController.getNotes);
router.get('/create', isAuthenticated, (req, res) => {
  // Comment: Renders create page with bounce animation
  res.render('notes/create', { user: req.user, title: 'Create Note' });
});
router.post('/create', isAuthenticated, notesController.createNote);
router.get('/view/:id', isAuthenticated, notesController.viewNote);
router.delete('/delete/:id', isAuthenticated, notesController.deleteNote);

module.exports = router;