const User = require("../models/User");

exports.createFlashcard = async (req, res) => {
    const { question, answer } = req.body;
    const user = await User.findById(req.user.id);

    user.customFlashcards.push({ question, answer });
    await user.save();

    res.json({ message: "Flashcard added successfully!" });
};
