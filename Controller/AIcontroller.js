/////////// AI Summarization logic ///////////
const aiService = require('../services/aiService');

exports.summarize = async (req, res) => {
  const { document } = req.body;  // Assume document is sent as text
  const summary = await aiService.summarize(document);
  res.send({ summary });
};
