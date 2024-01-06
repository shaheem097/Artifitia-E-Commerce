import { createSlice } from "@reduxjs/toolkit";

const singleUser=createSlice({
    name:"userData",
    initialState:{
        token:"",
        userData:{}  
    },
    reducers:{
        setUserDetails:(state,action)=>{


            state.userData = action.payload
        },
        setTokens:(state,action)=>{
            
            state.token=action.payload
        },
          logoutUser: (state) => {
            localStorage.removeItem("userAccessToken");
            state.userData = {};
            state.token='' // Reset user data when logging out
        },
    }
});


  
  export const { setUserDetails,logoutUser,setTokens} = singleUser.actions;
  export default singleUser.reducer ;
  
