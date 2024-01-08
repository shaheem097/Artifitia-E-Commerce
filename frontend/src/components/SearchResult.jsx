import { useState, useEffect } from 'react';
import Header from './Header';
import axios from '../Axios/axios';
import { useSearch } from '../Context/SerachContext';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function SearchResult() {

    const [wishlistClickedProducts, setWishlistClickedProducts] = useState({});

  const { searchTerm } = useSearch();
  const [searchResults, setSearchResults] = useState([]);
  const userId = useSelector((state) => state.user.userData.payload._id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchTerm) {
          const response = await axios.post('/search', { searchTerm });

          if (response.data.status) {
            setSearchResults(response.data.result);
          } else {
            setSearchResults(response.data.product);
          }
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchData();
  }, [searchTerm]);


  const toggleWishlist = async (productId) => {
    console.log(productId);
    try {
      // Check if the product is already in the wishlistClickedProducts state
      const isProductClicked = wishlistClickedProducts[productId];

      if (!isProductClicked) {
        console.log("added");
        // Add to wishlist
        await axios.post("/addtowishlist", { productId, userId });
      } else {
        console.log("removed");
        // Remove from wishlist
        await axios.delete(`/removewishlist/${productId}/${userId}`);
      }

      // Toggle the clicked status for the product
      setWishlistClickedProducts((prevProducts) => ({
        ...prevProducts,
        [productId]: !isProductClicked,
      }));
    } catch (error) {
      console.error("Error toggling wishlist:", error.message);
    }
  };
  return (
    <div>
      <Header />
      <h1 className="font-bold text-3xl mt-8 mb-4 text-blue-900 ml-[500px]">Search Results </h1>

      {searchResults.length === 0 ? (
        <>
        <div className='items-center ml-[500px] '>
            <img src="/assets/noresults.png" className='w-48 h-48' alt="" />
         <h1 className="font-bold text-3xl mt-8 mb-4 text-gray-400 ">No Result !! </h1>

        </div>
         </>
      ) : (
        <div className="grid grid-cols-4 ">
          {searchResults.map((result) => (
            <div key={result.id} className="card">
                <div className=" ml-5 mb-4 w-72 h-72 border border-gray-400 max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
                  <Link to={`/productdetails/${result._id}`}>
                    <img
                      className="h-40 w-full rounded-t-lg object-cover mb-[-150px]"
                      src={result.imageUrls[0]}
                      alt="product image"
                    />
                  </Link>

                  {/* Wishlist Icon */}
                  <div
                    className=" ml-60 cursor-pointer "
                    onClick={() => toggleWishlist(result._id)}
                  >
                      <div className=" absolute  rounded-full w-8 h-8 bg-gray-200 p-2  cursor-pointer">
                    <img
                      src={
                        wishlistClickedProducts[result._id]
                          ? "/assets/whishlist3.png"
                          : "/assets/whishlist.png"
                      }
                      alt="wishlist icon"
                      className="w-6 h-4 "
                    />
                  </div>
                  </div>

                  <Link to={`/productdetails/${result._id}`}>
                    <div className="mt-4 px-5 pb-5 mt-[150px]">
                      <h5 className="text-xl font-bold tracking-tight text-slate-900">
                        {result.title}
                      </h5>

                      <div className="flex items-center justify-between">
                        <p>
                          <span className="text-2xl font-semibold text-slate-600">
                            ₹ {result.variants[0].price}
                          </span>
                        </p>
                      </div>
                      <div className="mt-2.5 mb-5 flex items-center">
                        <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                          5.0
                        </span>
                        {[...Array(4)].map((_, index) => (
                          <svg
                            key={index}
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
