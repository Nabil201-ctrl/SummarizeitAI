///////////////////// Routes for Study Planner ////////////////////


// /routes/studyPlannerRoutes.js
const express = require('express');
const router = express.Router();
<<<<<<< HEAD
import studyPlannerController from '../Controllers/studyPlannerController';
=======
const studyPlannerController = require('../controllers/studyPlannerController');
>>>>>>> 34e4fcd325fb0fcefb9a1205591a5423aac30db9

// Route to generate a study plan
router.post('/generate', studyPlannerController.generateStudyPlan);

module.exports = router;
