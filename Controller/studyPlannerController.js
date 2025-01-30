/////////////// Smart Study Planner ///////////////////

// /controllers/studyPlannerController.js
import studyPlannerService from '../Services/studyPlannerService';

// Route to generate study plan based on user's exam dates and revision needs
exports.generateStudyPlan = async (req, res) => {
    try {
        const studyPlan = await studyPlannerService.createStudyPlan(req.user.id, req.body.examDate);
        res.json({ studyPlan });
    } catch (error) {
        res.status(500).json({ message: 'Error generating study plan', error });
    }
};
