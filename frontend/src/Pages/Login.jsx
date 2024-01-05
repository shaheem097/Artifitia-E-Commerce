import axios from "../Axios/axios";
import { toast } from "react-toastify";
import { setUserDetails,setTokens } from "../Redux/Reducers/userReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function Signup() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData,setFormData]=useState({
    email:"",
    password:"",
  })
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {const { name, value } = e.target;
  
  setFormData({
      ...formData,
      [name]: value,
    });

    setFormErrors({
      ...formErrors,
      [name]: "",
    });
  };


  const validateForm = () => {const errors = {};

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
  }
  if (!formData.password.trim()) {
    errors.password = "Password is required";
  }
  return errors;
};

const handleSubmit = (e) => {
  console.log(formData,'jjjjjjjjjjjj');
  e.preventDefault();

  // Validate the form
  const errors = validateForm();

  if (Object.keys(errors).length === 0) {
    // Send user input data to the backend using Axios
    axios
      .post("/login", formData,{withCredentials:true})

      .then((response) => {
        if (response?.data?.status === true) {
          localStorage.setItem("userAccessToken", response?.data?.token);

          dispatch(setUserDetails({ payload: response?.data?.userData}));
          dispatch(setTokens(response?.data?.token));

       
          toast.success("Login  Success");
          navigate("/");
        }  else {
            toast.warn("Invalid Email or Password !");
        }
      })
      .catch((error) => {
        console.error("Error occurred while making the request:", error);
      });
  } else {
  
    setFormErrors(errors);
  }
};

  return (
    <div className="flex bg-gray-200 items-center justify-center h-screen">
      <div className="flex border border-gray-300 bg-white w-3/5 h-3/4 relative" >
        
        <div className="w-2/3 bg-cover bg-center relative">
          
          <div className="w-full h-full absolute inset-0 flex flex-col justify-center items-center text-black " >
            {/* Heading */}
            <h2 className="text-3xl font-bold mb-2 text-yellow-500 text-center">Sign In to</h2>
          <h2 className="text-3xl font-bold mb-4 text-yellow-500 text-center">Your Account</h2>
      
            <form onSubmit={handleSubmit}>

            
            <div className="mb-2 relative" >
              <img src="/assets/email-icon.png" className="w-6 h-6 absolute h-6 w-6 left-3 top-2 " alt="" />
              <input 
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className="pl-10 pr-2 py-2 rounded-lg border  bg-gray-100" />
              {formErrors.email && (
                    <p className="text-red-500">{formErrors.email}</p>
                )}
            </div>
            <div className="mb-4 relative">
              <img src="/assets/password-icon.png" className="w-6 h-6 absolute h-6 w-6 left-3 top-2 " alt="" />
              <input
               id="password"
               name="password"
               type="password"
               value={formData.password}
               onChange={handleChange}
               autoComplete="current-password"
               placeholder="Password"
               className="pl-10 pr-2 py-2 rounded-lg border bg-gray-100" />
                 {formErrors.password && (
                    <p className="text-red-500">{formErrors.password}</p>
                )}
            </div>

            {/* Login button */}
            <button 
            type="submit"
            className="ml-12 bg-yellow-500 text-white px-12 py-2 rounded-xl">Login</button>
            </form>
          </div>
        </div>

        
        <div className="w-1/3 p-8 flex flex-col justify-center items-center bg-white text-white" style={{backgroundImage: "url('/assets/bg2.jpg')", opacity: 0.8}}>
          {/* Heading */}
          <h2 className="text-3xl font-bold mb-2 text-center ">Hello Friend !</h2>

          {/* Two-line text at the bottom */}
          <div className="text-sm text-center mt-4">
            <p>Enter your personal details and start your journey with us</p>
          </div>

          {/* Button for navigating to signin page */}
          <button
              className="border border-white text-white px-8 py-2 rounded-full mt-8"
              onClick={() => navigate('/signup')}
            >
              Sign up
            </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
