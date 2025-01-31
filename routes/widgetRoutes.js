const express = require("express");
const router = express.Router();
const { summarizeText, generateQuestions } = require("../Controllers/widgetController");
const { authenticateUser, checkPremiumAccess } = require("../Middlewares/Authmiddleware");

// Secure widget API routes
router.post("/summarize", checkAuth, checkPremiumAccess, summarizeText);
router.post("/generate-questions", checkAuth, generateQuestions);

export default router;
