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

//Get all Product
router.get('/getallproduct',userController.getAllProduct)

//Edit product
router.post('/editproduct',userController.editProduct)

//add to wishlist
router.post('/addtowishlist',userController.addToWishlist)

//remove from whishlist
router.delete('/removewishlist/:productId/:userId',userController.removeFromwhishlist)

//Get all wishlist
router.get('/getallwishlist/:userId',userController.getAllWishlist)

//Search Product
router.post('/search',userController.searchResult)

//Filter products
router.post('/filter',userController.filterProduct)

module.exports = router;
