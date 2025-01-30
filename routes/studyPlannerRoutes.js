///////////////////// Routes for Study Planner ////////////////////


// /routes/studyPlannerRoutes.js
const express = require('express');
const router = express.Router();
const studyPlannerController = require('../controllers/studyPlannerController');

// Route to generate a study plan
router.post('/generate', studyPlannerController.generateStudyPlan);

module.exports = router;
