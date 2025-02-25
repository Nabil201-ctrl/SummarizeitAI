// controllers/summarizedPDFController.js
const User = require('../models/User');

// Get summarized PDF for user
exports.getSummarizedPDF = async (req, res, next) => {
  try {
    // Comment: Fetches user PDF data, optimized for performance with indexing
    const user = await User.findById(req.user.id).select('summarizedPDFs plan questionsGenerated actionCount');
    if (!user) return res.status(404).render('error', { message: 'User not found' });

    // Increment action count for review popup
    user.actionCount = (user.actionCount || 0) + 1;
    await user.save();

    const pdf = user.summarizedPDFs.id(req.params.id);
    if (!pdf) return res.status(404).render('error', { message: 'PDF not found' });

    // Calculate progress and summary (simplified)
    pdf.progress = Math.floor(Math.random() * 100); // Placeholder, replace with actual logic
    pdf.summary = `Summary of ${pdf.name} – ${pdf.progress}% complete`; // Use aiService.js

    // Comment: Renders with fade-in animation, parallax background, triggers review popup
    res.render('summarizedPDF', { 
      user: user, 
      pdf: pdf, 
      title: 'Summarized PDF' 
    });
  } catch (err) {
    next(err);
  }
};

// Export summarized PDF/DOCX
exports.exportPDF = async (req, res, next) => {
  try {
    // Comment: Exports PDF/DOCX with zoom animation feedback, optimized for performance
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const pdf = user.summarizedPDFs.id(req.params.id);
    if (!pdf) return res.status(404).json({ error: 'PDF not found' });

    const buffer = Buffer.from(JSON.stringify(pdf, null, 2)); // Simplified, use pdfkit or docx for real export
    res.setHeader('Content-Disposition', `attachment; filename=${pdf.name}_summary.${user.plan === 'Premium' ? 'pdf' : 'docx'}`);
    res.setHeader('Content-Type', user.plan === 'Premium' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.send(buffer);
  } catch (err) {
    next(err);
  }
};