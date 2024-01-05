var express = require('express');
var router = express.Router();
const userController=require('../controller/userController')
const authenticateToken=require('../middleware/userAuth')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST user Signup. */
router.post('/signup', userController.registerUser);

// POST user Login
router.post('/login',userController.loginUser)



module.exports = router;
