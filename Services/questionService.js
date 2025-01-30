const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Add this key in your .env file
});

/**
 * Generates practice questions based on the summarized text.
 * @param {string} text - The summarized text extracted from the PDF.
 * @returns {Promise<string[]>} - A list of generated questions.
 */
async function generateQuestions(text) {
  try {
    const prompt = `Generate 5 multiple-choice questions based on the following content:\n\n"${text}"\n\nFormat each question like this:\n\nQ: [Question here]\nA) Option 1\nB) Option 2\nC) Option 3\nD) Option 4\nCorrect Answer: [Correct letter]`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "system", content: "You are an AI tutor." }, { role: "user", content: prompt }],
      temperature: 0.7,
    });

    return response.choices[0].message.content.split("\n\n");
  } catch (error) {
    console.error("Error generating questions:", error);
    throw new Error("Failed to generate questions");
  }
}

module.exports = { generateQuestions };
