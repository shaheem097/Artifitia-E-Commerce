import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "../Axios/axios";


// eslint-disable-next-line react/prop-types
function Wishlist({ onClose }) {

    const userId = useSelector((state) => state.user.userData.payload._id); 
    
    const [wishlistItems, setWishlistItems] = useState([]);

    useEffect(() => {
        // Fetch wishlist items when the component mounts
        const fetchWishlist = async () => {
          try {
            const response = await axios.get(`/getallwishlist/${userId}`);

            if(response.data.status){
                setWishlistItems(response.data.data.products);
            }else{
                setWishlistItems([])
            }
            
          } catch (error) {
            console.error("Error fetching wishlist items:", error);
          }
        };
    
        fetchWishlist();
      }, [userId]);

      const removeFromWishlist = async (productId) => {
        try {
          // Call API to remove item from wishlist
          await axios.delete(`/removewishlist/${productId}/${userId}`);
    
          // Update local state
          setWishlistItems((prevItems) => prevItems.filter(item => item.productId !== productId));
    
          // Update Redux state (if needed)
        } catch (error) {
          console.error("Error removing item from wishlist:", error);
        }
      };
    

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          className={`relative fixed top-0 left-0 w-full h-full flex items-center justify-center`}
        >
          <div className="fixed top-0 right-0 h-screen w-1/4 bg-white shadow-lg ">
            <div className="flex bg-sky-900 h-[114px]">
              <div className="flex absolute mt-8 rounded-full w-10 bg-gray-200 p-2 ml-8 cursor-pointer">
                <img
                  src="/assets/whishlist.png"
                  alt="Wishlist"
                  className="w-6 h-6"
                />
                <h1 className="ml-4 text-white">Items</h1>
              </div>
              <div className="flex items-center ml-auto pr-4">
                <img
                  src="/assets/greater1.png"
                  alt="Greater than symbol"
                  className="w-8 h-8 mr-2 mt-[-15px] cursor-pointer"
                  onClick={onClose}
                />
              </div>
            </div>
            <div className="h-screen  ">
                
              {/* Wishlist content goes here */}
              {wishlistItems.length === 0 ? (
          <p className="text-center font-bold mt-16 text-gray-500">No items in Wishlist</p>
        ) : (
          wishlistItems.map((item) => (
            <div key={item.productId} className="w-full h-36 border border-gray-400  flex">
              <div className="w-2/4">
                <div className="border-black w-28 h-28 mt-4 ml-12 border rounded-xl ">
                  <img
                    src={item.imageUrls[0]} // Assuming the first image is used
                    alt="Product"
                    className="m-5 w-16 h-16"
                  />
                </div>
              </div>
              <div className="w-2/4">
                <h2 className="text-xl mt-8 font-semibold text-blue-900">{item.title}</h2>
                <div className="flex">
                  <p className="text-gray-800 font-bold mt-2">${item.variants[0].price}</p>
                  <img
                    src="/assets/cross2.png"
                    className="w-4 h-4 ml-20 mt-3 cursor-pointer"
                    alt="cross"
                    onClick={() => removeFromWishlist(item.productId)}

                  />
                </div>
                <img
                  src="/assets/star2.png"
                  alt=""
                  className="w-20 h-20 mt-[-20px]"
                />
              </div>
            </div>
          ))
        )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wishlist;
