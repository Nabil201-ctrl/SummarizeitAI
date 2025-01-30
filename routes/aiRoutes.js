// /routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

// Route to generate summary from a PDF
router.post('/summarize', aiController.summarizePDF);

// Route to generate practice questions based on the summarized content
router.post('/generate-questions', aiController.generateQuestions);

module.exports = router;
