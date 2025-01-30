// /routes/aiRoutes.js
const express = require('express');
const router = express.Router();
import AIcontroller from '../Controllers/AIcontroller';

// Route to generate summary from a PDF
router.post('/summarize', AIcontroller.summarizePDF);

// Route to generate practice questions based on the summarized content
router.post('/generate-questions', AIcontroller.generateQuestions);

