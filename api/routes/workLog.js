var express = require('express');
var router = express.Router();
const workLogController = require('../controllers/workLogController');
var auth = require('../middleware/auth');



router.post('/createWorkLog', workLogController.createWorkLog);

//router.get('/getWorkoutProgram/:id', auth, workoutProgramController.getWorkoutProgram);
module.exports = router;
