import { createSlice } from "@reduxjs/toolkit";

const product=createSlice({
    name:"productData",
    initialState:{
        
        allproduct:{} , 
        allcategory:{}  
    },
    reducers:{
        setProductDetails:(state,action)=>{
            state.allproduct = action.payload
        },
        setcategoryDetails:(state,action)=>{
            state.allcategory=action.payload
        },
         
    }
});

  export const { setProductDetails,setcategoryDetails} = product.actions;
  export default product.reducer ;
  
