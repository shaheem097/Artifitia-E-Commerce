
import {  useState} from "react";
import axios from "../Axios/axios";
import { useDispatch } from "react-redux";
import { setUserDetails,setTokens } from "../Redux/Reducers/userReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


function Signup() {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
  
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
 
    username: "",
    email: "",
    password: "",
  });


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };
 

 
  const handleSubmit = async (e) => {
    console.log("kkkkkkkkkkkkkkkkk");
    console.log(formData);
    e.preventDefault();

    const errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    } 
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
   

    if (formData.password.length < 5) {
      errors.password = "Password must be at least 5 characters long";
    }
  
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {

        axios.post("/signup", formData).then((response) => {
            console.log(response.data);
         if (response?.data?.status === true) {

           localStorage.setItem("userAccessToken", response?.data?.token);
         
           dispatch(setUserDetails({ payload: response?.data?.UserData}));
           dispatch(setTokens({ payload: response?.data?.token}));

           toast.success("Registration successful!");
           navigate("/");
         } else{
           toast.error(response.data.message);
         }
       });

          }
        };


  return (
    <div className="flex bg-gray-200 items-center justify-center h-screen">

      <div className="flex border border-gray-300 w-3/5 h-3/4 relative" style={{backgroundImage: "url('/assets/bg2.jpg')", opacity: 0.8}}>
        {/* Left side with image background */}
        <div className="w-1/3 bg-cover bg-center relative">
          {/* Overlay with reduced opacity */}

          {/* Left side content goes here */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            {/* Heading */}
            <h2 className="text-3xl font-bold mb-2 text-center">Welcome Back!</h2>

            {/* Two-line text at the bottom */}
            <div className="text-sm text-center mt-4">
              <p>To keep connected with us, please login with your login info.</p>
            </div>

            {/* Button for navigating to login page */}
            <button
              className="border border-white text-white px-8 py-2 rounded-full mt-8"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>

        {/* Right side with red background */}
        <div className="w-2/3 p-8 flex flex-col justify-center items-center bg-white">
          {/* Heading */}
          <h2 className="text-3xl font-bold mb-4 text-yellow-500 text-center">Create account</h2>

          <form onSubmit={handleSubmit}>
          <div className="mb-2 relative">
          <img src="/assets/user-icon.png" className="w-6 h-6 absolute h-6 w-6 left-3 top-2 " alt="" />
            <input
             type="text"
             placeholder="Name"
             id="username"
             name="username"
             value={formData.username}
             onChange={handleChange}
            className="pl-10 pr-2 py-2 rounded-lg border bg-gray-100" />
            {formErrors.username && (
              <p className="text-red-500">{formErrors.username}</p>
            )}
          </div>
          <div className="mb-2 relative">
          <img src="/assets/email-icon.png" className="w-6 h-6 absolute h-6 w-6 left-3 top-2 " alt="" />
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
             placeholder="Email"
             className="pl-10 pr-2 py-2 rounded-lg border  bg-gray-100" />
             {formErrors.email && (
              <p className="text-red-500">{formErrors.email}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <img src="/assets/password-icon.png" className="w-6 h-6 absolute h-6 w-6 left-3 top-2 " alt="" />
            <input 
            type="password"
             id="password"
             name="password"
             value={formData.password}
             placeholder="password"
             onChange={handleChange}
            className="pl-10 pr-2 py-2 rounded-lg border bg-gray-100" />
             {formErrors.password && (
              <p className="text-red-500">{formErrors.password}</p>
            )}
          </div>

          {/* Signup button */}
          <button 
          type="submit"
          className="ml-12 bg-yellow-500 text-white px-12 py-2 rounded-xl">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
