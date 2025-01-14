import axios from "axios";

export const fetchCategories = async () => {
  const response = await axios.get(
    `https://dummyjson.com/products/categories`
  );

  return response.data;
};

//   export const fetchProducts = async (category,sortBy) => {
//   const response = await axios.get(`https://dummyjson.com/products/category/${category}?sortBy=price&order=${sortBy}`);

//   return response.data.products;
// };

export const fetchProductDetails = async (id) => {
  const response = await axios.get(`https://dummyjson.com/products/${id}`);
  return response.data;
};

// export const searchProduct = async (query) => {
//   const response = await axios.get(
//     `https://dummyjson.com/products/search?q=${query}`
//   );
//   return response.data.products;
// };

// export const searchProduct = async (query, limit = 8, skip = 0, page) => {
//   const response = await axios.get(
//     `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}&page=${page}`
//   );
//   return response.data;
// };

export const fetchProducts = async (category, sortBy) => {
  const response = await axios.get(
    `https://dummyjson.com/products/category/${category}?sortBy=price&order=${sortBy}`
  );

  const products = response.data.products;

  // Randomly assign "Hot Deal" field to some products
  const hotDealCount = Math.floor(products.length / 4); // 25% of products
  const hotDealIndices = new Set();
  while (hotDealIndices.size < hotDealCount) {
    hotDealIndices.add(Math.floor(Math.random() * products.length));
  }

  return products.map((product, index) => ({
    ...product,
    hotDeal: hotDealIndices.has(index),
    offerEndsAt: hotDealIndices.has(index) ? getHotDealEndTime() : null,
  }));
};

// calculate the end time for a hot deal (2 hours from now)
const getHotDealEndTime = () => {
  return Date.now() + 2 * 60 * 60 * 1000; // 2 hours in milliseconds
};

//  searchProduct
// export const searchProduct = async (query) => {
//   const response = await axios.get(
//     `https://dummyjson.com/products/search?q=${query}`
//   );

//   const products = response.data.products;

//   //  products with hot deal and offer end time
//   const enhancedProducts = products.map((product, index) => {
//     //  hot deal for every third product
//     const isHotDeal = index % 3 === 0;

//     return {
//       ...product,
//       hotDeal: isHotDeal,
//       offerEndTime: isHotDeal ? getHotDealEndTime() : null,
//     };
//   });

//   return enhancedProducts;
// };

export const searchProduct = async (query) => {
  if (!query) return [];
  const response = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  const products = response.data.products;

  return products.map((product, index) => ({
    ...product,
    hotDeal: index % 3 === 0,
    offerEndTime: index % 3 === 0 ? getHotDealEndTime() : null,
  }));
};

