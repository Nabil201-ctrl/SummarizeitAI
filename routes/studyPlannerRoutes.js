///////////////////// Routes for Study Planner ////////////////////


// /routes/studyPlannerRoutes.js
const express = require('express');
const router = express.Router();
import studyPlannerController from '../Controllers/studyPlannerController';

// Route to generate a study plan
router.post('/generate', studyPlannerController.generateStudyPlan);

module.exports = router;
