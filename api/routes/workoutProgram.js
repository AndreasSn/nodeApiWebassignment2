var express = require('express');
var router = express.Router();
const workoutProgramController = require('../controllers/workoutProgramController');
var auth = require('../middleware/auth');

router.get('/getWorkoutPrograms', workoutProgramController.getAllWorkoutPrograms);
router.get('/getWorkoutProgram/:id', auth, workoutProgramController.getWorkoutProgram);

router.post('/createWorkoutProgram', auth,  workoutProgramController.createWorkoutProgram);

router.post('/addexercise/:id', auth,  workoutProgramController.addExercise);
router.get('/getExercises/:id', auth,  workoutProgramController.getAllExercises);

router.post('/getWorkourProgramsById', workoutProgramController.getWorkoutProgramsById);
module.exports = router;