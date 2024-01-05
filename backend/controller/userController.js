const { response } = require("express");
const userHelper = require("../helper/userHelper");

module.exports = {

    registerUser: async (req, res) => {
        try {
           
            const response = await userHelper.signup(req.body);
            console.log(response);

            if (response.emailExist) {
                res.json({message:'Email already exists'});
            } else if (response.phoneExist) {
                res.json({message:'Phone number already exists'});
            } else if (response.usercreated) {
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


    
      
};
