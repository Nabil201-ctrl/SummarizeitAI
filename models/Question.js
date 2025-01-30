const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  pdfName: { type: String, required: true },
  questions: [{ 
    question: String, 
    options: [String], 
    correctAnswer: String,
    userAnswer: { type: String, default: null }, // Stores the user's answer
    isCorrect: { type: Boolean, default: null }  // Tracks if the answer is correct
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Question", questionSchema);
