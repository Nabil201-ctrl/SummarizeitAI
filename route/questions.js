const express = require("express");
const { generateAndStoreQuestions, getStoredQuestions } = require("../controllers/questionController");
const router = express.Router();

router.post("/generate", generateAndStoreQuestions);
router.get("/:userId", getStoredQuestions); // Fetch stored questions
router.post("/submit", submitAnswer);
router.get("/feedback/:userId", getFeedback);

module.exports = router;
