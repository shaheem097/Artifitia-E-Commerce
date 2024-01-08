// Create a new file, e.g., SubcategoryContext.js
import { createContext, useContext, useState } from 'react';

const SubcategoryContext = createContext();

// eslint-disable-next-line react/prop-types
export const SubcategoryProvider = ({ children }) => {
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const updateSelectedSubcategories = (subcategories) => {
    setSelectedSubcategories(subcategories);
  };

  return (
    <SubcategoryContext.Provider
      value={{ selectedSubcategories, updateSelectedSubcategories }}
    >
      {children}
    </SubcategoryContext.Provider>
  );
};

export const useSubcategories = () => {
  return useContext(SubcategoryContext);
};
