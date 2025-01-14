import { createContext, useContext, useState } from "react";

// Create Category Context
const CategoryContext = createContext();

// Provider Component
export const CategoryProvider = ({ children }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <CategoryContext.Provider
      value={{ selectedCategories, toggleCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Custom Hook to Use Category Context
export const useCategory = () => useContext(CategoryContext);
