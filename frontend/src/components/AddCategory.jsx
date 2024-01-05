import React, { useState } from 'react';

const AddCategoryModal = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleAddCategory = () => {
    // Handle the logic for adding the category here
    console.log('Adding category:', categoryName);
    // You may want to dispatch an action to handle the state or perform any other necessary logic
    onClose(); // Close the modal after adding category
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full"></div>
      <div className="bg-white p-6 rounded w-200">
        <h2 className="text-xl font-bold mb-4">Add Category</h2>
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 mb-4"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className="flex space-x-4">
          <button className="bg-yellow-500 rounded px-4 py-2" onClick={handleAddCategory}>
            Add
          </button>
          <button className="bg-gray-300 rounded px-4 py-2" onClick={onClose}>
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
