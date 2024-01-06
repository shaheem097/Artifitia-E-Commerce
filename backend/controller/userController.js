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
        console.log(req.body,'hhhhhhhhhhh');
        try {
            const productData = req.body;
            const response = await userHelper.addProduct(productData);
    
            // You can handle the response as needed
            res.status(200).json({status:true, message: 'Product added successfully', data: response });
        } catch (error) {
            console.error(error);
            res.status(500).json({status:false, message: 'Internal Server Error' });
        }
    }


    
      
};