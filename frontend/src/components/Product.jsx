import { useState } from "react";
import AddCategoryModal from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import Addproduct from "./Addproduct";

function Product() {
  const [wishlistClicked, setWishlistClicked] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [isSubCategoryOpen, setSubCategoryOpen] = useState(false);
  const [isAddProducOpen, setAddProductOpen] = useState(false);

  const toggleWishlist = () => {
    setWishlistClicked(!wishlistClicked);
  };

  const openAddCategoryModal = () => {
    setAddCategoryModalOpen(true);
  };

  const closeAddCategoryModal = () => {
    setAddCategoryModalOpen(false);
  };

  const openSubCategoryModal = () => {
    setSubCategoryOpen(true);
  };
  const closeSubCategoryModal = () => {
    setSubCategoryOpen(false);
  };

  const openAddProductModal = () => {
    setAddProductOpen(true);
  };
  const closeAddProductModal = () => {
    setAddProductOpen(false);
  };


  return (
    <>
    <div>

      <div className="flex items-center justify-between p-4 text-white">
        <div className="flex items-center">
          <span className="text-black mr-2 ml-16">Home</span>
          <span>&gt;</span>
          <span className="ml-2">Product</span>
        </div>
        <div className="flex space-x-2">
          <button 
          onClick={openAddCategoryModal}
          className="bg-yellow-500 rounded-full px-4 py-2">
            Add Category
          </button>
          
          <button 
          onClick={openSubCategoryModal}
          className="bg-yellow-500 rounded-full px-4 py-2">
            Add Subcategory
          </button>
          <button 
          onClick={openAddProductModal}
          className="bg-yellow-500 rounded-full px-4 py-2">
            Add Product
          </button>
        </div>
      </div>
      <div className="flex h-screen">
        {/* Left Div */}

        <div className="w-1/4   p-4 text-black">
          <h5 className="ml-16 text-blue-500 font-bold text-lg mb-2 font-roboto">
            Categories
          </h5>

          <div className="flex mb-4 ml-16">
            {/* Add your category list here */}
            <div>Category 1</div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-12 mt-1 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12l-6-6-1.414 1.414L10 14.828l7.414-7.414L16 6z" />
            </svg>

            {/* Add onClick handlers to show subcategories */}
          </div>
        </div>

        {/* Right Div */}
        <div className="w-3/4 p-4">
          {/* Product Card */}
          <div className="relative m-10 w-64 h-72 border border-gray-400 max-w-xs overflow-hidden rounded-lg bg-white shadow-md">
            <a href="#">
              <img
                className="h-40  w-full rounded-t-lg object-cover"
                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="product image"
              />
            </a>

            {/* Wishlist Icon */}
            <div
              className={`absolute top-2 right-2 cursor-pointer `}
              onClick={toggleWishlist}
            >
              <img
                src={
                  wishlistClicked
                    ? "/assets/whishlist3.png"
                    : "/assets/whishlist.png"
                }
                alt="wishlist icon"
                className="w-6 h-6"
              />
            </div>

            <div className="mt-4 px-5 pb-5">
              <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-slate-900">
                  Nike Air MX Super 5000
                </h5>
              </a>

              <div className="flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                  ₹ 249
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
          </div>
        </div>
      </div>
      {isAddCategoryModalOpen&&(
        <AddCategoryModal
        isOpen={isAddCategoryModalOpen}
        onClose={closeAddCategoryModal}
        />
      )}
      {isSubCategoryOpen&&(
        <AddSubCategory
        isOpen={isSubCategoryOpen}
        onClose={closeSubCategoryModal}
        />
      )}
      {isAddProducOpen&&(
        <Addproduct
        isOpen={isAddProducOpen}
        onClose={closeAddProductModal}
        />
      )}
    </div>
      
    </>
  );
}

export default Product;
