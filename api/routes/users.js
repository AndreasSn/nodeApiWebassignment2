var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
const userController = require('../controllers/user')



router.post('/createUser', userController.createUser);

router.post('/login', userController.login);

router.get('/user', auth, userController.getUser)

module.exports = router