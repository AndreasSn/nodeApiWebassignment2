var express = require('express');
var router = express.Router();
const workLogController = require('../controllers/workLogController');
var auth = require('../middleware/auth');



router.post('/createWorkLog', workLogController.createWorkLog);

router.get('/getWorkLog', auth, workLogController.getWorkLog);



module.exports = router;
