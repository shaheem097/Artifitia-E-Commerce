import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../Axios/axios'
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
function AddSubCategory({ isOpen, onClose }) {
  const [subcategoryName, setSubCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');

  const categories = useSelector((state) => state.product.allcategory);
   const handleAddCategory = async () => {
    // Form validation
    if (!selectedCategory) {
      setError('Please select a category.');
      return;
    }

    if (!subcategoryName.trim()) {
      setError('Please enter a subcategory name.');
      return;
    }

    // Clear any previous errors
    setError('');

    try {
      // Make the API call using Axios
      const response = await axios.post('/addsubcategory', {
        categoryName: selectedCategory,
        subcategoryName: subcategoryName.trim(),
      });
      if (response.data.status) {
        toast.success(response.data.message);
        onClose();
      } else {
        toast.error(response.data.message);
      }
     
    } catch (error) {
      console.error('Error adding subcategory:', error);
      // Handle error, show a message to the user, etc.
    }
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
    <option key={index} value={category.categoryName}>{category.categoryName}</option>
            ))}
          </select>
          <input
            type="text"
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
            placeholder="Enter subcategory name"
            value={subcategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

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
