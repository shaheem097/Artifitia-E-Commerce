import axios from 'axios';
import { logoutUser } from '../Redux/Reducers/userReducer';
import { store } from '../Redux/store';

const axiosInterceptorInstance = axios.create({
  
  baseURL: 'https://artifitia.onrender.com',
});


axiosInterceptorInstance.interceptors.request.use(
  (config) => {

    const userAccessToken = localStorage.getItem("userAccessToken");

    
  if (userAccessToken) {
   
      config.headers.Authorization = userAccessToken;
    }
    
    return config;
  },
  (error) => {
    console.log("Error in request");
    return Promise.reject(error);
  }
);

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 &&error.response?.data?.message==='userTokenNotverify') {

   
      store.dispatch(logoutUser());
 
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstance;
