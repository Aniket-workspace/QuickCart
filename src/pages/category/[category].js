// [category].js

import { Container, Grid, Box, Typography } from "@mui/material";
// import ProductCard from "../../components/ProductCard";
import Pagination from "../../components/Pagination";
import { useState, useEffect } from "react";
import { fetchProducts } from "../api/all-api";
import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard/ProductCard";
import Head from "next/head";
import { usePathname } from "next/navigation";
import BreadCrumb from "@/components/BreadCrumb";

const CategoryPage = ({
  category,
  initialProducts,
  initialSortOrder,
  maxPrice,
}) => {
  const path = usePathname();

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

  const convertedCategorySlug = (title) =>
    title.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

  return (
    <>
      <Head>
        <title>{`Shop ${convertedCategorySlug(
          category
        )} Products | Your Store`}</title>
        <meta
          name="description"
          content={`Discover a wide range of products in the ${convertedCategorySlug(
            category
          )} category. Find the best deals and offers curated for you.`}
        />
        <meta
          property="og:title"
          content={`Shop ${convertedCategorySlug(category)} Products`}
        />
        <meta
          property="og:description"
          content={`Explore products in the ${convertedCategorySlug(
            category
          )} category. Best prices guaranteed!`}
        />
        <meta property="og:image" content="path_to_category_image.jpg" />
        <meta
          property="og:url"
          content={`https://yourstore.com/categories/${category}`}
        />
      </Head>
      <Container
        maxWidth="lg"
        sx={{ paddingTop: 4, marginTop: 7, minHeight: "80vh" }}
      >
        <Box mb={2}>
        <BreadCrumb path={path}/>
        </Box>
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

        <Box
          sx={{
            display: { xs: "block", md: "none" },
            marginBottom: 4,
            marginTop: -3,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textTransform: "capitalize",
              color: "#ff4b39",
              textAlign: "center",
              padding: 2,
              boxShadow: 3,
              borderRadius: 2,
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            {convertedCategorySlug(category)}
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
        <Grid container spacing={{ xs: 1, md: 4 }}>
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
    </>
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
