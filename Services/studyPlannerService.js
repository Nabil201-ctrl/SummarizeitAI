/////////////// Logic for Generating Study Plans ///////////////////

// /services/studyPlannerService.js
<<<<<<< HEAD
import StudyPlan from '../models/StudyPlan';
import User from '../models/User';
=======
const StudyPlan = require('../models/StudyPlan');
const User = require('../models/User');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

// Function to generate a smart study plan based on the user's exam date
exports.createStudyPlan = async (userId, examDate) => {
    try {
        const user = await User.findById(userId);
        const studyPlan = new StudyPlan({
            userId: user.id,
            examDate: examDate,
            planDetails: 'Study 2 hours per day until exam date',
            createdAt: new Date()
        });

        await studyPlan.save();
        return studyPlan;
    } catch (error) {
        throw new Error('Error creating study plan');
    }
};
