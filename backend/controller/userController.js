const { response } = require("express");
const userHelper = require("../helper/userHelper");

module.exports = {


    //signup user
    registerUser: async (req, res) => {
        try {
           
            const response = await userHelper.signup(req.body);

            if (response.emailExist) {
                res.json({message:'Email already exists'});
            }else if (response.usercreated) {
                const UserData=response.usercreated
                console.log(UserData,'register');
                const userId = response.usercreated._id;
                const username = response.usercreated.username;

                const token = await userHelper.createToken(userId.toString(), username);

                res.json({status:true,message:"User registerd",UserData,token})
            } else {
                res.json({status:false,UserData})
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },


    // login user
    loginUser: async (req, res) => {
        
        try {
            const response = await userHelper.forlogin(req.body);
            if (response.login && response.userExist) {
                const userData=response.userExist
                const userId = response.userExist._id;
                const username = response.userExist.username;

                const token = await userHelper.createToken(userId.toString(), username);
                
                res.json({status:true,userData,token});
            } else {
                res.json({status:false})
            }
        } catch (error) {
            console.log('Internal Server Error');
            res.status(500).send('Internal Server Error');
        }
    },


    //add category
     addCategory : async (req, res) => {
        try {
            const { categoryName } = req.body;
            const response = await userHelper.addCategory(categoryName);
            if(response.categoryExist){
                res.json({status:false,message:'Category already exist'})
            }else{
                res.status(200).json({status:true, message: 'Category Added', data: response });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({status:false, message: 'Internal Server Error' });
        }
    },

    //add subcategory
    addSubcategory :async (req, res) => {
        try {
            const { categoryName, subcategoryName } = req.body;
            const response = await userHelper.addSubcategory(categoryName, subcategoryName);

            if(response.subcategoryexist){
                res.json({status:false,message:'Subcategory already exist'})
            }else{

                res.status(200).json({status:true, message: 'Subcategory Added', data: response });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({status:false, message: 'Internal Server Error' });
        }
    },

    //get all categories
    getAllCategories : async (req, res) => {
        try {
            const categories = await userHelper.getAllCategories();
    
            // You can handle the response as needed
            res.status(200).json({status:true,data: categories });
        } catch (error) {
            console.error(error);
            res.status(500).json({status:false, message: 'Internal Server Error' });
        }
    },

    //add product
    addProduct : async (req, res) => {
        try {
            const productData = req.body;
            const response = await userHelper.addProduct(productData);
    
            // You can handle the response as needed
            res.status(200).json({status:true, message: 'Product added', data: response });
        } catch (error) {
            console.error(error);
            res.status(500).json({status:false, message: 'Internal Server Error' });
        }
    },

    //Get all product
    getAllProduct:async(req,res)=>{
        try {
            const products = await userHelper.getAllProducts();
    
            // You can handle the response as needed
            res.status(200).json({status:true,data: products });
        } catch (error) {
            console.error(error);
            res.status(500).json({status:false, message: 'Internal Server Error' });
        }
    },

    //Edit Product
    editProduct : async (req, res) => {

        try {
            const { _id: productId, ...updatedData } = req.body;
           
            const response = await userHelper.updateProduct(productId, updatedData);

            // You can handle the response as needed
            res.status(200).json({status:true, message: 'Product Edited', data: response });
        } catch (error) {
            console.error(error);
            res.status(500).json({status:false, message: 'Internal Server Error' });
        }
    },

    //add to wishlist
    addToWishlist: async (req, res) => {

        try {
            const { productId, userId } = req.body;
           
            const response = await userHelper.addToWishlist(productId, userId);

            // You can handle the response as needed
            res.status(200).json({status:true, message: 'Item added to wishlist', data: response });
        } catch (error) {
            console.error(error);
            res.status(500).json({status:false, message: 'Internal Server Error' });
        }
    },

    //remove from whishlist
    removeFromwhishlist: async (req, res) => {

        try {
            const { productId, userId } = req.params;
           
            const response = await userHelper.removeFromwhishlist(productId, userId);

            // You can handle the response as needed
            res.status(200).json({status:true, message: 'Removed from whishlist', data: response });
        } catch (error) {
            console.error(error);
            res.status(500).json({status:false, message: 'Internal Server Error' });
        }

    },
    
    //Get all wishlist item
    getAllWishlist: async (req, res) => {

        try {
            const {  userId } = req.params;
           
            const response = await userHelper.getWishlistItem( userId);
            if(response.status===false){
                res.json({status:false});
            }else{
                res.status(200).json({status:true, data: response });
            }
          
        } catch (error) {
            console.error(error);
            res.status(500).json({status:false, message: 'Internal Server Error' });
        }

    },

    //Search products
    searchResult:async (req, res) => {
        try {
            const { searchTerm } = req.body;
            const result = await userHelper.searchProducts(searchTerm);
            if(result.status===false){
                const product=result.products
                res.json({message:"No result found",product})
            }else{
                res.status(200).json({status:true,result});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    //Filter Product
    filterProduct:async (req, res) => {
        try {
            // const { subCategories } = req.body;
            const result = await userHelper.filterProduct(req.body);
                res.status(200).json({status:true,result});
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

      
};
