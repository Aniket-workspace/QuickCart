// context/WishlistContext.js

import { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // initial loading from localstorage
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (storedWishlist) {
      setWishlist(storedWishlist);
    }
  }, []);

  // Save wishlist to localstorage
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } else {
      localStorage.removeItem("wishlist");
    }
  }, [wishlist]);

  // Add product
  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
  };

  // Remove product
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((product) => product.id !== productId));
  };

  // empty wishlist
  const emptyWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, emptyWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
