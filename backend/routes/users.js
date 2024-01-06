var express = require('express');
var router = express.Router();
const userController=require('../controller/userController')
const authenticateToken=require('../middleware/userAuth')



/* POST user Signup. */
router.post('/signup', userController.registerUser);

// POST user Login
router.post('/login',userController.loginUser)

//Add category
router.post('/addcategory',userController.addCategory)

//Add subcategory
router.post('/addsubcategory',userController.addSubcategory)

//Get All Category
router.get('/getallcategory',userController.getAllCategories)

//add product
router.post('/addproduct',userController.addProduct)

module.exports = router;
