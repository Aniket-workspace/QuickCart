import { createContext, useState, useContext, useEffect } from "react";

const CompareContext = createContext();

export const useCompare = () => {
  return useContext(CompareContext);
};

export const CompareProvider = ({ children }) => {
  const [comparedProducts, setComparedProducts] = useState([]);
  const [CompareSnackbarMessage, setSnackbarMessage] = useState("");

  // initial loading from localstorage
  useEffect(() => {
    const storedComparedProducts = JSON.parse(
      localStorage.getItem("comparedProducts")
    );
    if (storedComparedProducts) {
      setComparedProducts(storedComparedProducts);
    }
  }, []);

  // Save compared products to localstorage
  useEffect(() => {
    if (comparedProducts.length > 0) {
      localStorage.setItem(
        "comparedProducts",
        JSON.stringify(comparedProducts)
      );
    } else {
      localStorage.removeItem("comparedProducts");
    }
  }, [comparedProducts]);

  // Show snackbar for 3 seconds
  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setTimeout(() => setSnackbarMessage(""), 3000);
  };

  // Add product (limit to 3 items, same category check)
  const addToCompare = (product) => {
    if (comparedProducts.length > 0) {
      const category = comparedProducts[0].category; // Assume the first product determines the category
      if (product.category !== category) {
        showSnackbar(
          `You can only compare products in the "${category}" category.`
        );
        return;
      }
    }

    if (comparedProducts.length < 3) {
      setComparedProducts((prev) => [...prev, product]);
    } else {
      showSnackbar("You can compare a maximum of 3 products.");
    }
  };

  // Remove product
  const removeFromCompare = (productId) => {
    setComparedProducts((prev) =>
      prev.filter((product) => product.id !== productId)
    );
  };

  // empty compare
  const emptyCompare = () => {
    setComparedProducts([]);
  };

  return (
    <CompareContext.Provider
      value={{
        comparedProducts,
        addToCompare,
        removeFromCompare,
        CompareSnackbarMessage,
        emptyCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
