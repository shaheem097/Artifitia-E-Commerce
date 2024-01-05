import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function AddSubCategory({ isOpen, onClose }) {
  const [subcategoryName, setSubCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories] = useState(['Category 1', 'Category 2']);

  const handleAddCategory = () => {
    // Handle the logic for adding the category here
    console.log('Adding category:', subcategoryName, 'Selected category:', selectedCategory);
    // You may want to dispatch an action to handle the state or perform any other necessary logic
    onClose(); // Close the modal after adding category
  };

  return (
    <>
      <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>

      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
        <div className="bg-white p-6 rounded-lg w-[300px] flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold mb-4">Add Subcategory</h2>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 w-5/6"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>Select category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
            placeholder="Enter subcategory name"
            value={subcategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
          />
         
          <div className="flex space-x-4">
            <button className="bg-yellow-500 rounded-lg px-6 py-2 text-white" onClick={handleAddCategory}>
              Add
            </button>
            <button className="bg-gray-300 rounded-lg px-4 py-2" onClick={onClose}>
              Discard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSubCategory;
