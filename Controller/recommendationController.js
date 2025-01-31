const User = require("../models/User");

exports.getStudyRecommendations = async (req, res) => {
    const user = await User.findById(req.user.id);

    const mostFrequentTopics = user.questionHistory.reduce((topics, q) => {
        topics[q.text] = (topics[q.text] || 0) + 1;
        return topics;
    }, {});

    const sortedTopics = Object.entries(mostFrequentTopics).sort((a, b) => b[1] - a[1]);

    const recommendations = sortedTopics.slice(0, 3).map(([topic]) => `Revise more on: ${topic}`);

    res.json({ recommendations });
};
