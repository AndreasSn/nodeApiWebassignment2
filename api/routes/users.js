var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
const userController = require('../controllers/user')



router.post('/createUser', userController.createUser);

router.post('/login', userController.login);

router.post('/addWorkLog', auth,  userController.addWorkLog);


router.get('/user', auth, userController.getUser);

router.get('/allUsers', userController.getUsers);

module.exports = router