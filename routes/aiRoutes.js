// /routes/aiRoutes.js
const express = require('express');
const router = express.Router();
<<<<<<< HEAD
import AIcontroller from '../Controllers/AIcontroller';

// Route to generate summary from a PDF
router.post('/summarize', AIcontroller.summarizePDF);

// Route to generate practice questions based on the summarized content
router.post('/generate-questions', AIcontroller.generateQuestions);
=======
const aiController = require('../controllers/aiController');

// Route to generate summary from a PDF
router.post('/summarize', aiController.summarizePDF);

// Route to generate practice questions based on the summarized content
router.post('/generate-questions', aiController.generateQuestions);
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

module.exports = router;
