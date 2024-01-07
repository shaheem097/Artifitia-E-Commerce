import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/Reducers/userReducer'; 
import { useNavigate } from 'react-router-dom';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Wishlist from './Wishlist';
import { useState } from 'react';

function Header() {

  const [showWishlist, setShowWishlist] = useState(false);

  const wishlistCount = 3;
  const cartCount = 5;

  const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          title: "Are you sure?",
          text: "To Logout!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Logout",
          cancelButtonText: "Cancel",
          customClass: {
            confirmButton: "btn bg-danger",
            cancelButton: "btn bg-success",
          },
        }).then((result) => {
          if (result.isConfirmed) {
           
     
    
          dispatch(logoutUser());
          
    
            navigate("/login");
          }
        });

        
      };

      const toggleWishlist = () => {
        setShowWishlist(!showWishlist);
      };
  return (
    <div className="sticky bg-sky-900 shadow p-8 flex justify-between items-center">
      <div className="flex items-center w-full justify-center">
        {/* Search box */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search any things"
            className="w-96 px-4 py-3 rounded-xl border border-white bg-white text-black focus:outline-none z-10"
          />
          <button className="py-3 px-6 bg-yellow-500 rounded-l-2xl rounded-r-xl ml-[-95px] z-20 text-white">
            {/* Search icon or text */}
            {/* You can replace this with your search icon or text */}
            Search
          </button>
        </div>
      </div>

      {/* Wishlist, Cart, and Logout */}
      <div className="flex items-center">
        {/* Wishlist icon with count */}
        <div className="relative ml-4 flex items-center">
          <img src="/assets/whishlist.png"
           onClick={toggleWishlist}
          className='w-6 h-6 filter invert cursor-pointer' alt="" />
          {wishlistCount > 0 && (
            <div className="ml-2 bg-yellow-500 w-9 h-5 rounded-full flex items-center justify-center text-white">
              {wishlistCount}
            </div>
          )}

     {showWishlist && <Wishlist onClose={toggleWishlist} />}
        </div>
        
        {/* Cart icon with count */}
        <div className="relative ml-4 flex items-center">
          <img src="/assets/cart.png" className='w-6 h-6 filter invert cursor-pointer' alt="" />
          {cartCount > 0 && (
            <div className="ml-2 bg-yellow-500 w-9 h-5 rounded-full flex items-center justify-center text-white">
              {cartCount}
            </div>
          )}
        </div>
        
        {/* Logout text */}
        <span 
        onClick={handleLogout}
        className="text-white ml-4 cursor-pointer">Logout</span>
      </div>
    </div>
  );
}

export default Header;
