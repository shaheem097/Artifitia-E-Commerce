import { createSlice } from "@reduxjs/toolkit";

const whishlist=createSlice({
    name:"wishlistData",
    initialState:{
        
        wishlistProduct:{} , 
    },
    reducers:{
        setWishlistData:(state,action)=>{
            state.wishlistProduct = action.payload
        },
       
         
    }
});


  
  export const { setWishlistData} = whishlist.actions;
  export default whishlist.reducer ;
  
