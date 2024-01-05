import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Addproduct({ isOpen, onClose }) {
    const [categoryName, setCategoryName] = useState("");
    const [title, setTitle] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

  
    const [variants, setVariants] = useState([
      { ram: "", price: "", quantity: 1 },
    ]);
  
    const handleInputChange = (e, index, key) => {
      const newVariants = [...variants];
      newVariants[index][key] = e.target.value;
      setVariants(newVariants);
    };
  
    const handleArrowClick = (index, direction) => {
      const newVariants = [...variants];
      const step = 1;
      newVariants[index].quantity = Math.max(
        1,
        newVariants[index].quantity + direction * step
      );
      setVariants(newVariants);
    };
  
    const handleAddVariant = () => {
      setVariants([...variants, { ram: "", price: "", quantity: 1 }]);
    };
  
    const handleAddCategory = () => {
      // Handle the logic for adding the category here
      console.log("Adding category:", categoryName);
      // You may want to dispatch an action to handle the state or perform any other necessary logic
      onClose(); // Close the modal after adding category
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      
  return (
    <>
      <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>

      <div
     className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white p-6 rounded-lg w-3/7 min-h-5/6 h-auto flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4 ">Add Product</h2>

          <div className="flex mr-auto ml-16 mb-4 ">
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

        <div className=" mr-auto  ml-16">

          <label className="text-sm  font-semibold   text-gray-400">
              varient:
            </label>
        
          {variants.map((variant, index) => (
            
        <div key={index} className="flex mr-auto ml-36   mb-2">
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
            type="text"
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
        </div>
       
      ))}
      
</div>
          <button
        className="ml-auto mr-5 bg-[#292524] rounded-lg px-2 py-2 text-white mb-3"
        onClick={handleAddVariant}
      >
        Add Variants
      </button>

          <div className="flex  mr-auto ml-16 mb-4">
            <label className="text-sm font-semibold mb-2 text-gray-400 mt-1">
              {" "}
              Sub category:
            </label>
            <input
              type="text"
             className="border border-gray-300 rounded-lg px-3 py-2 ml-[55px] w-[400px]"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

          <div className="flex  mr-auto ml-16 mb-4">
            <label className="text-sm font-semibold mb-2 text-gray-400 mt-1">
              {" "}
              Description:
            </label>
            <input
              type="text"
             className="border border-gray-300 rounded-lg py-2 px-3 ml-[66px] w-[400px]"
              placeholder="Enter Description"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="flex  mr-auto ml-16 mb-4">
            <label className="text-sm font-semibold mb-2 text-gray-400 mt-12">
              {" "}
             Upload image:
            </label>
            <div className="flex items-center justify-center w-full w-[120px] h-[120px] ml-12">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <label className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
        )}
      </div>

          </div>

          <div className="mt-auto ml-auto flex space-x-4">
            <button
             className="bg-yellow-500 rounded-lg px-6 py-2 text-white"
              onClick={handleAddCategory}
            >
              Add
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

export default Addproduct;
