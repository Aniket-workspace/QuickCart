import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
// import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { searchProduct } from "./api/all-api";
import { useRouter } from "next/router";
import ProductCard from "@/components/ProductCard/ProductCard";

const ITEMS_PER_PAGE = 8;

const SearchResults = ({ initialProducts }) => {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate products for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = initialProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ p: 2, marginTop: 9, minHeight: "80vh" }}>
      <Box mb={2}>
        <Typography variant="body1" color="#655967">Search result for:  {router.query.q}</Typography>
      </Box>
      <Box>
        {initialProducts.length === 0 ? (
          <Typography>No products found</Typography>
        ) : (
          <>
            <Grid container spacing={4}>
              {paginatedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(initialProducts.length / ITEMS_PER_PAGE)}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export async function getServerSideProps({ query }) {
  const { q } = query;
  const response = await searchProduct(q);
  return {
    props: {
      initialProducts: response,
    },
  };
}

export default SearchResults;
