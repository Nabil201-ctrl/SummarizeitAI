const { generateQuestions } = require("../services/questionService");
const { summarizeText } = require("../services/aiService");
const Question = require("../models/Question");

/**
 * Handles question generation and stores it in the database.
 */
async function generateAndStoreQuestions(req, res) {
  try {
    const { pdfText, pdfName, userId } = req.body; 
    
    if (!pdfText || !pdfName || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Summarize the text before generating questions (optional)
    const summarizedText = await summarizeText(pdfText);

    // Generate questions
    const rawQuestions = await generateQuestions(summarizedText);

    // Format questions for database storage
    const formattedQuestions = rawQuestions.map(q => {
      const lines = q.split("\n");
      return {
        question: lines[0].replace("Q: ", "").trim(),
        options: [lines[1].replace("A) ", ""), lines[2].replace("B) ", ""), lines[3].replace("C) ", ""), lines[4].replace("D) ", "")],
        correctAnswer: lines[5].replace("Correct Answer: ", "").trim()
      };
    });

    // Save questions in the database
    const savedQuestion = new Question({ userId, pdfName, questions: formattedQuestions });
    await savedQuestion.save();

    res.json({ message: "Questions generated and stored successfully!", questions: formattedQuestions });
  } catch (error) {
    console.error("Error saving questions:", error);
    res.status(500).json({ error: "Failed to generate and store questions" });
  }
}

/**
 * Fetch stored questions for a user.
 */
async function getStoredQuestions(req, res) {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const userQuestions = await Question.find({ userId }).sort({ createdAt: -1 });
  
      if (userQuestions.length === 0) {
        return res.status(404).json({ message: "No questions found for this user" });
      }
  
      res.json({ questions: userQuestions });
    } catch (error) {
      console.error("Error retrieving questions:", error);
      res.status(500).json({ error: "Failed to retrieve questions" });
    }
  }
/**
 * Handles user responses and checks correctness.
 */
async function submitAnswer(req, res) {
    try {
      const { questionId, userAnswer } = req.body;
  
      if (!questionId || !userAnswer) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      const questionEntry = await Question.findOne({ "questions._id": questionId });
  
      if (!questionEntry) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      // Find the specific question in the array
      const questionIndex = questionEntry.questions.findIndex(q => q._id.toString() === questionId);
      if (questionIndex === -1) {
        return res.status(404).json({ error: "Question not found" });
      }
  
      // Check if the answer is correct
      const isCorrect = questionEntry.questions[questionIndex].correctAnswer === userAnswer;
  
      // Update the user's answer
      questionEntry.questions[questionIndex].userAnswer = userAnswer;
      questionEntry.questions[questionIndex].isCorrect = isCorrect;
  
      await questionEntry.save();
  
      res.json({ message: "Answer submitted", isCorrect });
    } catch (error) {
      console.error("Error submitting answer:", error);
      res.status(500).json({ error: "Failed to submit answer" });
    }
  }
  
  /**
   * Fetch feedback results for a user.
   */
  async function getFeedback(req, res) {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const results = await Question.find({ userId }).sort({ createdAt: -1 });
  
      if (!results.length) {
        return res.status(404).json({ message: "No responses found" });
      }
  
      res.render("feedback", { results });
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ error: "Failed to fetch feedback" });
    }
  }
  
  module.exports = { submitAnswer, getFeedback };
  
  module.exports = { generateAndStoreQuestions, getStoredQuestions };

