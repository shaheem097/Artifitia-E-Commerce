import  { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import EditProduct from "../components/EditProduct";

function Productdetails() {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleSaveModal = () => {
    // Implement the logic to save the edited product
    setEditModalOpen(false);
  };

  const { productId } = useParams();
  
  const getProductById = (productId2) => (state) => {
    const product = state.product.allproduct.find((p) => p._id === productId2);
    return product || null;
  };

  const selectedProduct = useSelector(getProductById(productId));
  const [selectedVariant, setSelectedVariant] = useState(
    selectedProduct.variants[0]
  );

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <div>
      <Header />

      <div>
        <div className="items-center justify-between ">
          <div className="flex items-center font-bold text-blue-500 mt-4 ml-5">
            <span className="mr-2 ml-28 ">Home</span>
            <span>&gt;</span>
            <span className="ml-2">Product details</span>
          </div>
          <div className="flex ml-16 mt-8  h-96">
            <div className="w-2/4">
              <div className="rounded-xl border-black border w-[500px] h-[350px] ml-16">
                <img
                  src={selectedProduct.imageUrls[0]}
                  className="w-64 h-64 mt-12 ml-28"
                  alt="product"
                />
              </div>
            </div>
            <div className="w-2/4 mx-auto ">
              {/* Top Part */}
              <div className="border-b-2 border-gray-300 w-2/4 pb-4 ">
                <h1 className="text-2xl  text-blue-900 mb-2 ">
                  {selectedProduct.title}
                </h1>
                <p className="font-bold text-gray-600 mb-2">
                  ₹ {selectedVariant.price}
                </p>
                <p className="text-green-500 mb-2">
                  <span className="font-bold text-black">Availability: </span>In
                  stock
                </p>
                <p className="text-gray-800 mb-2">
                  Hurry up! only {selectedVariant.quantity} product left in
                  stock!
                </p>
              </div>

              {/* Bottom Part */}
              <div className="pt-10">
                <div className="flex mb-2">
                  <p className="font-bold mr-2">RAM :</p>
                  {selectedProduct.variants.map((variant) => (
                    <div
                      key={variant._id}
                      className={`cursor-pointer  ml-3 rounded-lg ${
                        selectedVariant._id === variant._id
                          ? "text-black border px-2 border-black bg-gray-200"
                          : "px-2 bg-gray-200"
                      }`}
                      onClick={() => handleVariantChange(variant)}
                    >
                      {variant.ram}
                    </div>
                  ))}
                </div>

                <div className="flex mb-2">
                  <p className="font-bold mr-2">Quantity :</p>
                  <div className="flex items-center max-w-[6rem]">
                    <button
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-l p-2 focus:outline-none"
                    >
                      <svg
                        className="w-2 h-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="number"
                      className="ml-3 bg-gray-50 border-x-0 border-gray-300 h-8 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-1.5"
                      placeholder="1"
                      required
                    />
                    <button
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-r p-2 focus:outline-none"
                    >
                      <svg
                        className="w-2 h-2 text-gray-900"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-4 text-white">
                <button
                  className="bg-yellow-500 rounded-xl px-4 py-2 mr-4"
                  onClick={handleEditClick}
                >
                  Edit Product
                </button>{" "}
                <button className="bg-yellow-500 rounded-xl px-4 py-2 px-8">
                  Buy Now
                </button>
                <div
                  className="rounded-full bg-gray-200 p-2 ml-3 cursor-pointer"
                  onClick={(e) => {
                    e.currentTarget.querySelector("img").src = e.currentTarget
                      .querySelector("img")
                      .src.includes("whishlist.png")
                      ? "/assets/whishlist3.png"
                      : "/assets/whishlist.png";
                  }}
                >
                  <img
                    src="/assets/whishlist.png"
                    alt="Wishlist"
                    className="w-6 h-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditProduct
          onClose={handleCloseModal}
          onSave={handleSaveModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
}

export default Productdetails;
