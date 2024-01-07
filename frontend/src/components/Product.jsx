import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import AddCategoryModal from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import Addproduct from "./Addproduct";
import axios from "../Axios/axios";
import { Link, useNavigate } from "react-router-dom";
import {
  setProductDetails,
  setcategoryDetails,
} from "../Redux/Reducers/productReducer";

function Product() {
  const [wishlistClicked, setWishlistClicked] = useState(false);
  const [isAddCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [isSubCategoryOpen, setSubCategoryOpen] = useState(false);
  const [isAddProducOpen, setAddProductOpen] = useState(false);
  const [allcategory, setAllCategory] = useState([]);
  const [allProduct, setAllProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(allProduct.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/getallcategory");
      if (response.data.status) {
        // Update the Redux store with the fetched categories
        setAllCategory(response.data.data);
        dispatch(setcategoryDetails(response.data.data));
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchproducts = async () => {
    try {
      const response = await axios.get("/getallproduct");
      if (response.data.status) {
        // Update the Redux store with the fetched categories
        setAllProduct(response.data.data);
        dispatch(setProductDetails(response.data.data));
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // useEffect to fetch data when isModalOpen changes
  useEffect(() => {
    if (!isModalOpen) {
      fetchCategories();
      fetchproducts();
    }
  }, [isModalOpen]);

  const toggleWishlist = () => {
    setWishlistClicked(!wishlistClicked);
  };

  const openAddCategoryModal = () => {
    setIsModalOpen(true);
    setAddCategoryModalOpen(true);
  };

  const openSubCategoryModal = () => {
    setIsModalOpen(true);
    setSubCategoryOpen(true);
  };

  const openAddProductModal = () => {
    setIsModalOpen(true);
    setAddProductOpen(true);
  };

  // Functions to close modals
  const closeAddCategoryModal = () => {
    setIsModalOpen(false);
    setAddCategoryModalOpen(false);
  };

  const closeSubCategoryModal = () => {
    setIsModalOpen(false);
    setSubCategoryOpen(false);
  };

  const closeAddProductModal = () => {
    setIsModalOpen(false);
    setAddProductOpen(false);
  };
  const handleCategoryClick = (category) => {
    // Toggle selected category
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? null : category
    );
    // Reset selected subcategory
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    // Toggle selected subcategory
    setSelectedSubCategory((prevSubCategory) =>
      prevSubCategory === subCategory ? null : subCategory
    );
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between p-4 text-white">
          <div className="flex items-center font-bold text-blue-500">
            <span className=" mr-2 ml-16">Home</span>
            <span>&gt;</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={openAddCategoryModal}
              className="bg-yellow-500 rounded-full px-4 py-2"
            >
              Add Category
            </button>

            <button
              onClick={openSubCategoryModal}
              className="bg-yellow-500 rounded-full px-4 py-2"
            >
              Add Subcategory
            </button>
            <button
              onClick={openAddProductModal}
              className="bg-yellow-500 rounded-full px-4 py-2"
            >
              Add Product
            </button>
          </div>
        </div>
        <div className="flex h-auto">
          {/* Left Div */}

          <div className="w-1/4 p-4 text-black">
            <h5 className="ml-16 text-blue-500 font-bold text-lg mb-2 font-roboto">
              Categories
            </h5>

            <div className="flex flex-col ml-16">
              {/* Map over allcategory array and render category cards */}
              {allcategory.map((category) => (
                <div key={category._id} className="mb-4">
                  <div
                    className="flex items-center justify-between cursor-pointer mb-3"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="">{category.categoryName}</div>

                    {/* Add down arrow SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ml-2 text-blue-500 ${
                        selectedCategory &&
                        selectedCategory._id === category._id
                          ? ""
                          : "-rotate-90"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12l-6-6-1.414 1.414L10 14.828l7.414-7.414L16 6z" />
                    </svg>
                  </div>

                  {/* Display subcategories if available and selectedCategory matches */}
                  {selectedCategory &&
                    selectedCategory._id === category._id &&
                    category.subcategories &&
                    category.subcategories.length > 0 && (
                      <div className="ml-4">
                        {category.subcategories.map((subCategory) => (
                          <div
                            key={subCategory._id}
                            className="flex items-center mb-2 cursor-pointer"
                            onClick={() => handleSubCategoryClick(subCategory)}
                          >
                            <input
                              type="checkbox"
                              id={`subCategoryCheckbox_${subCategory._id}`}
                              className="form-checkbox mr-2 w-5 h-5 text-black" // Add w-5 and h-5 classes
                              // checked={subCategory.isSelected || false}
                              // onChange={() => handleSubCategoryCheckboxChange(subCategory)}
                            />
                            <label
                              htmlFor={`subCategoryCheckbox_${subCategory._id}`}
                              className="cursor-pointer"
                              style={{ fontSize: "1rem" }}
                            >
                              {subCategory.subcategoryName}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Div */}
          <div className="flex flex-wrap w-3/4 h-auto p-4">
            {/* Product Card */}
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="relative ml-5 mb-4 w-72 h-72 border border-gray-400 max-w-xs overflow-hidden rounded-lg bg-white shadow-md"
              >
                <Link to={`/productdetails/${product._id}`}>
                  {" "}
                  <a href="#">
                    <img
                      className="h-40 w-full rounded-t-lg object-cover"
                      src={product.imageUrls[0]}
                      alt="product image"
                    />
                  </a>
                </Link>
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
                <Link to={`/productdetails/${product._id}`}>
                  <div className="mt-4 px-5 pb-5">
                    <a href="#">
                      <h5 className="text-xl font-semibold tracking-tight text-slate-900">
                        {product.title}
                      </h5>
                    </a>

                    <div className="flex items-center justify-between">
                      <p>
                        <span className="text-3xl font-bold text-slate-900">
                          ₹ {product.variants[0].price}
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
            ))}
          </div>
        </div>
        <div className="flex justify-center ">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`${
                currentPage === index + 1
                  ? "bg-yellow-500 text-white"
                  : "bg-white text-black"
              } rounded-full px-3 py-1 mx-2 focus:outline-none`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {isAddCategoryModalOpen && (
          <AddCategoryModal
            isOpen={isAddCategoryModalOpen}
            onClose={closeAddCategoryModal}
          />
        )}
        {isSubCategoryOpen && (
          <AddSubCategory
            isOpen={isSubCategoryOpen}
            onClose={closeSubCategoryModal}
          />
        )}
        {isAddProducOpen && (
          <Addproduct isOpen={isAddProducOpen} onClose={closeAddProductModal} />
        )}
      </div>
    </>
  );
}

export default Product;
