import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import axios from "../Axios/axios";
import cloudinary from "cloudinary-core";
import { toast } from "react-toastify";

const cl = cloudinary.Cloudinary.new({ cloud_name: "dhzusekrd" });

// eslint-disable-next-line react/prop-types
function EditProduct({ onClose, product }) {
  const categories = useSelector((state) => state.product.allcategory);

  // eslint-disable-next-line react/prop-types
  const [title, setTitle] = useState(product.title);
  // eslint-disable-next-line react/prop-types
  const [variants, setVariants] = useState(product.variants);
  // eslint-disable-next-line react/prop-types
  const [category, setCategory] = useState(product.category);
  // eslint-disable-next-line react/prop-types
  const [subcategory, setSubcategory] = useState(product.subcategory);
  // eslint-disable-next-line react/prop-types
  const [description, setDescription] = useState(product.description);
  const [imagePreview, setImagePreview] = useState(
    // eslint-disable-next-line react/prop-types
    product.imageUrls && product.imageUrls.length > 0
      ? // eslint-disable-next-line react/prop-types
        product.imageUrls[0]
      : null
  );

  const [titleError, setTitleError] = useState("");
  const [variantsError, setVariantsError] = useState([]);
  const [categoryError, setCategoryError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [imageError, setImageError] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    validateForm();
  }, [title, variants, category, description]);

  const validateForm = () => {
    let isValid = true;

    // Title validation
    if (!title.trim()) {
      setTitleError("Title is required");
      isValid = false;
    } else {
      setTitleError("");
    }

    // Variant validation
    const variantErrors = variants.map((variant) => {
      const errors = {};
      if (!variant.ram.trim()) {
        errors.ram = "RAM is required";
        isValid = false;
      }
      if (!variant.price || isNaN(variant.price) || variant.price <= 0) {
        errors.price = "Price must be a positive number";
        isValid = false;
      }
      if (
        !variant.quantity ||
        isNaN(variant.quantity) ||
        variant.quantity < 0
      ) {
        errors.quantity = "Quantity must be a non-negative number";
        isValid = false;
      }
      return errors;
    });

    setVariantsError(variantErrors);

    // Category validation
    if (!category.trim()) {
      setCategoryError("Category is required");
      isValid = false;
    } else {
      setCategoryError("");
    }

    // Description validation
    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    return isValid;
  };

  const handleInputChange = (e, index, field) => {
    // Create a deep copy of the variants array and the modified variant
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...variants[index], [field]: e.target.value };
    setVariants(updatedVariants);

    // Clear the error for the modified field
    const updatedErrors = [...variantsError];
    updatedErrors[index] = { ...variantsError[index], [field]: "" };
    setVariantsError(updatedErrors);
  };

  const handleArrowClick = (index, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index].quantity += value;
    setVariants(updatedVariants);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImageFile(file);

    // Update the imagePreview state
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleEditProduct = async () => {
    if (validateForm()) {
      // Check if a new image is selected
      if (selectedImageFile) {
        // Upload the new image to Cloudinary
        try {
          setIsLoading(true);
          const formData = new FormData();
          formData.append("file", selectedImageFile);
          formData.append("upload_preset", "image_preset");

          const response = await Axios.post(
            "https://api.cloudinary.com/v1_1/dhzusekrd/image/upload",
            formData
          );

          const fileUrl = response.data.secure_url;

          // Update the imageUrls in the edited product data
          const editedProduct = {
            _id: product._id,
            title,
            variants,
            category,
            subcategory,
            description,
            imageUrls: [fileUrl],
          };

          // Make the edit product API call
          const res = await axios.post("/editproduct", editedProduct);

          if (res.data.status) {
            toast.success(res.data.message);
            onClose();
            setIsLoading(false);
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          // Handle Cloudinary upload error
          console.error("Error uploading image to Cloudinary:", error);
        }
      } else {
        // If no new image is selected, proceed with the existing image
        const editedProduct = {
          _id: product._id,
          title,
          variants,
          category,
          subcategory,
          description,
          imageUrls: [imagePreview],
        };

        console.log(editedProduct);

        // Make the edit product API call
        const res = await axios.post("/editproduct", editedProduct);

        if (res.data.status) {
          toast.success(res.data.message);
          setIsLoading(false);
          onClose();
        } else {
          toast.error(res.data.message);
        }
      }
    }
  };

  return (
    <>
      <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>

      <div
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center`}
      >
        <div className="bg-white p-6 rounded-lg w-3/7 min-h-5/6 h-auto flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4">Edit Product</h2>

          <div className="flex mr-auto ml-16">
            <label className="text-sm font-semibold mb-2 text-gray-400">
              Title:
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-3 py-2 ml-28 w-[400px]"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {titleError && (
            <p className="text-red-500 text-sm ml-2">{titleError}</p>
          )}
          <div className=" mr-auto  ml-16">
            <label className="text-sm  font-semibold   text-gray-400">
              varient:
            </label>
            {variants.map((variant, index) => (
              <div key={index} className="flex mr-auto ml-36 mb-2">
                <label className="text-sm font-semibold mb-2 text-gray-400 mt-1">
                  Ram:
                </label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg ml-1 px-3 w-[80px] py-1"
                  value={variant.ram}
                  onChange={(e) => handleInputChange(e, index, "ram")}
                />

                <label className="text-sm font-semibold mb-2 text-gray-400 ml-1 mt-1">
                  Price:
                </label>
                <input
                  type="number"
                  className="border border-gray-300 rounded-lg ml-1 px-3 w-[90px] py-1"
                  value={variant.price}
                  onChange={(e) => handleInputChange(e, index, "price")}
                />

                <div className="flex ml-1">
                  <label className="text-sm font-semibold mb-2 text-gray-400 mt-2">
                    QTY:
                  </label>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      className="border-l border-t  border-b border-gray-300 rounded-l-lg px-2 py-1"
                      onClick={() => handleArrowClick(index, -1)}
                    >
                      {"<"}
                    </button>
                    <input
                      type="text"
                      className="border-t border-b border-gray-300 text-center px-2 w-[50px] py-1"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={variant.quantity}
                      onChange={(e) => handleInputChange(e, index, "quantity")}
                    />

                    <button
                      className="border-r border-t  border-b border-gray-300 rounded-r-lg px-2 py-1"
                      onClick={() => handleArrowClick(index, 1)}
                    >
                      {">"}
                    </button>
                  </div>
                </div>
                {variantsError[index] && (
                  <div className="flex flex-col items-start">
                    {variantsError[index].ram && (
                      <p className="text-red-500 text-sm ml-1">
                        {variantsError[index].ram}
                      </p>
                    )}
                    {variantsError[index].price && (
                      <p className="text-red-500 text-sm ml-1">
                        {variantsError[index].price}
                      </p>
                    )}
                    {variantsError[index].quantity && (
                      <p className="text-red-500 text-sm ml-1">
                        {variantsError[index].quantity}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex mr-auto ml-16">
            <label className="text-sm font-semibold mb-2 text-gray-400 mt-1">
              Category:
            </label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 mb-3 ml-[85px] w-[400px]"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                // Reset subcategory when category changes
                setSubcategory("");
              }}
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category.categoryName}>
                  {category.categoryName}
                </option>
              ))}{" "}
            </select>
          </div>
          {categoryError && (
            <p className="text-red-500 text-sm ml-2">{categoryError}</p>
          )}

          {/* Subcategory Dropdown */}
          <div className="flex mr-auto ml-16 mb-4">
            <label className="text-sm font-semibold mb-2 text-gray-400 mt-1">
              Subcategory:
            </label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 ml-[59px] w-[400px]"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              disabled={!category} // Disable subcategory dropdown if no category selected
            >
              <option value="" disabled>
                Select subcategory
              </option>
              {category &&
                // Find the selected category in the list and map its subcategories
                categories
                  .find((c) => c.categoryName === category)
                  ?.subcategories.map((subcategory) => (
                    <option
                      key={subcategory._id}
                      value={subcategory.subcategoryName}
                    >
                      {subcategory.subcategoryName}
                    </option>
                  ))}
            </select>
          </div>

          <div className="flex  mr-auto ml-16">
            <label className="text-sm font-semibold mb-2 text-gray-400 mt-1">
              {" "}
              Description:
            </label>
            <input
              type="text"
              className={`border border-gray-300 rounded-lg py-2 px-3 ml-[66px] w-[400px] ${
                descriptionError && "border-red-500"
              }`}
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {descriptionError && (
            <p className="text-red-500 text-sm ml-2">{descriptionError}</p>
          )}
          <div className="flex  mr-auto ml-16 mb-4">
            <label className="text-sm font-semibold text-gray-400 mt-12 ">
              {" "}
              Click to change image:
              <img src="/assets/hand.png" className="w-5 h-5" alt="" />
            </label>
            <div className="flex items-center justify-center w-full w-[120px] h-[120px]">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-[120px] h-[120px] ml-6 object-cover rounded-lg mt-3"
              />

              <label className="ml-4 w-[130px] flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-8 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                </div>
                <input
                  id="your-file-input-id"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
          {imageError && (
            <p className="text-red-500 text-sm ml-2">{imageError}</p>
          )}

          <div className="mt-auto ml-auto flex space-x-4">
            {/* Save button should be placed outside the modal to avoid being inside the overlay */}
            <button
              className={`bg-yellow-500 rounded-lg px-6 py-2 text-white ${
                isLoading && "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleEditProduct}
              disabled={isLoading}
            >
              {isLoading ? "Sacing..." : "save"}
            </button>
            <button
              className="bg-gray-300 rounded-lg px-4 py-2"
              onClick={onClose}
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
