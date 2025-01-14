// [category].js

import { Container, Grid, Box, Typography } from "@mui/material";
// import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { useState, useEffect } from "react";
import { fetchProducts } from "../api/all-api";
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard/ProductCard";

const CategoryPage = ({
  category,
  initialProducts,
  initialSortOrder,
  maxPrice,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);

  // Fetch products when the sort order changes
  useEffect(() => {
    const fetchSortedProducts = async () => {
      const fetchedProducts = await fetchProducts(category, sortOrder);
      setProducts(fetchedProducts);
      setFilteredProducts(
        fetchedProducts.filter(
          (product) =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        )
      );
    };

    fetchSortedProducts();
  }, [sortOrder, category]);

  // Update filtered products when price range changes
  useEffect(() => {
    setFilteredProducts(
      products.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      )
    );
    setCurrentPage(1);
  }, [priceRange, products]);

  // Calculate paginated products
  const productsPerPage = 8;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <Container
      maxWidth="lg"
      sx={{ paddingTop: 4, marginTop: 7, minHeight: "80vh" }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          textAlign: "center",
          background: "linear-gradient(135deg, #ff6f61, #ffcc00)",
          padding: { xs: "30px 0", sm: "50px 0" },
          borderRadius: "8px",
          boxShadow: 3,
          marginBottom: 6,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "white",
            fontSize: { xs: "2rem", sm: "3rem" },
          }}
        >
          Shop the Latest Products
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            marginTop: 1,
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          Discover a wide range of products curated just for you!
        </Typography>
      </Box>

      {/* Filters */}

      <Filters
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        category={category}
        maxPrice={maxPrice}
        initialPriceRange={[0, maxPrice]} // Pass the initial price range here
      />

      {/* Products Grid */}
      <Grid container spacing={4}>
        {paginatedProducts.map((product) => (
          <Grid item xs={6} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
};
export async function getServerSideProps({ params, query }) {
  const { category } = params;
  const { sortBy = "asc" } = query;

  const products = await fetchProducts(category, sortBy);

  // Calculate max price safely
  const maxPrice =
    products.length > 0
      ? Math.max(...products.map((product) => product.price))
      : 0;

  return {
    props: {
      category,
      initialSortOrder: sortBy,
      initialProducts: products,
      maxPrice,
    },
  };
}

export default CategoryPage;
