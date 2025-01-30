/////////////// Smart Study Planner ///////////////////

// /controllers/studyPlannerController.js
<<<<<<< HEAD
import studyPlannerService from '../Services/studyPlannerService';
=======
const studyPlannerService = require('../Services/studyPlannerService');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

// Route to generate study plan based on user's exam dates and revision needs
exports.generateStudyPlan = async (req, res) => {
    try {
        const studyPlan = await studyPlannerService.createStudyPlan(req.user.id, req.body.examDate);
        res.json({ studyPlan });
    } catch (error) {
        res.status(500).json({ message: 'Error generating study plan', error });
    }
};
