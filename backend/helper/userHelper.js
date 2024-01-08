const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require('../model/userSchema')
const Category=require('../model/categorySchema')
const Product=require('../model/ProductSchema')
const Wishlist=require('../model/WishlistSchema')



module.exports={

    //create jwt token
    createToken: async (userId, username) => {

        const JWT_SECRET = process.env.JWT_SECRET;

        if (JWT_SECRET) {
            const token = jwt.sign({ id: userId, username: username }, JWT_SECRET, {
                expiresIn: '30d',
            });
            return token;
        } else {
            throw new Error('JWT TOKEN is not defined');
        }
    },

    // signup user
    signup: async (userdata) => {
        try {
            const emailExist = await User.findOne({ email: userdata.email });
            if (emailExist) {
                return { emailExist: true };
            }
            const password = await bcrypt.hash(userdata.password, 10);
            const user = new User({
                username: userdata.username,
                email: userdata.email,
                password: password,
            });

            const usercreated = await user.save();
            return { existinguser: false, password: true, usercreated };
        } catch (error) {
            console.error(error);
            throw new Error('Error in signup process.');
        }
    },

    // login user
    forlogin: async (loginData) => {
        try {
            let userExist = await User.findOne({ email: loginData.email });
            if (!userExist) {
                return { login: false };
            } else {
                let checkPassword = await bcrypt.compare(loginData.password, userExist.password);
                if (checkPassword) {
                    return { login: true, userExist };
                } else {
                    return { login: false };
                }
            }
        } catch (error) {
            console.log('Internal Server Error');
            throw new Error('Internal Server Error');
        }
    },

    //add category
   addCategory : async (category) => {

        try {
            // Check if the category already exists
            const existingCategory = await Category.findOne({ categoryName: category });
    
            if (existingCategory) {
                return ({categoryExist:true});
            }else{

    
            // Category does not exist, create a new document
            const newCategory = new Category({
                categoryName: category
            });
    
            // Save the new category to the database
            const savedCategory = await newCategory.save();
    
            return savedCategory;
        }

        } catch (error) {
            console.error(error);
            throw error;
        }
    },
  

    //add subcategory

    addSubcategory : async (categoryName, subcategoryName) => {
        try {
            // Find the category by name
            const category = await Category.findOne({ categoryName });
    
            if (!category) {
                // Category does not exist, you can handle this case as needed
                console.log('Category does not exist');
                return null;
            }
    
            // Check if the subcategory already exists in the category
            const existingSubcategory = category.subcategories.find(sub => sub.subcategoryName === subcategoryName);
    
            if (existingSubcategory) {
                // Subcategory already exists, you can handle this case as needed
                console.log('Subcategory already exists');
                return ({subcategoryexist:true});
            }
    
            // Add the new subcategory to the category's subcategories array
            category.subcategories.push({ subcategoryName });
    
            // Save the updated category to the database
            const updatedCategory = await category.save();
    
            return updatedCategory;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    //get all categories
    getAllCategories : async () => {
        try {
            // Retrieve all categories from the database
            const categories = await Category.find();
    
            return categories;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    //add product
    addProduct : async (productData) => {
        try {
            // Create a new product instance with the provided data
            const newProduct = new Product(productData);
    
            // Save the new product to the database
            const savedProduct = await newProduct.save();
    
            return savedProduct;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },


    //Get all products
    getAllProducts: async () => {
        try {
            // Retrieve all products from the database
            const products = await Product.find();
            return products;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    //Edit product
    updateProduct : async (productId, updatedData) => {
        try {
            // Find the product by ID
            const existingProduct = await Product.findById(productId);
    
            if (!existingProduct) {
                throw new Error('Product not found');
            }
    
            // Update the existing product with the new data
            Object.assign(existingProduct, updatedData);
    
            // Save the updated product to the database
            const updatedProduct = await existingProduct.save();
            return updatedProduct;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    //add to wishlist 
    addToWishlist:async(productId ,userId )=>{
        try {
        
            const product = await Product.findById(productId);
            
            if (!product) {
              return res.status(404).json({ message: 'Product not found' });
            }
        
            let wishlist = await Wishlist.findOne({ userId });
        
            if (!wishlist) {
              wishlist = new Wishlist({ userId, products: [] });
            }
        
            const existingProduct = wishlist.products.find(item => item.productId === productId);
        
            if (existingProduct) {
              return ({message:'Product already in whishlist'})
            }
        
            wishlist.products.push({
              productId,
              title: product.title,
              variants: product.variants,
              category: product.category,
              subcategory: product.subcategory,
              description: product.description,
              imageUrls: product.imageUrls,
            });
        
            await wishlist.save();
            return({ message: 'Product added to wishlist successfully', wishlist });
          } catch (error) {
            console.error(error);
            return({ message: 'Internal server error' });
          }
    },

    //remove from wishlist
    removeFromwhishlist : async (productId, userId) => {
        try {
          const wishlist = await Wishlist.findOne({ userId });
      
          if (!wishlist) {
            throw new Error('Wishlist not found');
          }
      
          const productIndex = wishlist.products.findIndex(item => item.productId === productId);
      
          if (productIndex === -1) {
            throw new Error('Product not found in wishlist');
          }
      
          wishlist.products.splice(productIndex, 1);
      
          await wishlist.save();
      
          return { message: 'Product removed from wishlist successfully', wishlist };
        } catch (error) {
          console.error(error);
          throw new Error('Error removing product from wishlist');
        }
      } ,
      
      //Get all wish list items

      getWishlistItem:async(userId)=>{
        try {
            // Find the wishlist document for the given userId
            const wishlist = await Wishlist.findOne({ userId });
        
            // If no wishlist is found, you can handle it accordingly
            if (!wishlist) {
              return { message: 'No wishlist found for the user', products: [],status:false };
            }
        
            // Return only the products array from the wishlist
            const { products } = wishlist;
            return { message: 'Wishlist products retrieved successfully', products };
          } catch (error) {
            console.error(error);
            throw new Error('Error retrieving wishlist products');
          }
      },

      //search products
      searchProducts: async (searchTerm) => {
        try {
            const products = await Product.find({
                $or: [
                    { title: new RegExp(searchTerm, 'i') },
                    { category: new RegExp(searchTerm, 'i') },
                    { subcategory: new RegExp(searchTerm, 'i') }
                ]
            });
            if(products.length>0 &&products){
                return products;
            }else{
                return ({status:false,message:"no result found",products})
            }
        } catch (error) {
            throw error;
        }
    },

    filterProduct: async ({ categoryNames }) => {
        try {
            console.log(categoryNames);
          const products = await Product.find({
            subcategory: { $in: categoryNames }
          });
      
          return products;
        } catch (error) {
          throw error;
        }
      },
      
}