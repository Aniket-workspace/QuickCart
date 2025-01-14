import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import { fetchProductDetails } from "../api/all-api";
import MainImageSection from "@/components/ProductDetails/MainImageSection";
import ProductInfoSection from "@/components/ProductDetails/ProductInfoSection";
import ProductActions from "@/components/ProductDetails/ProductActions";
import SnackbarNotification from "@/components/ProductDetails/SnackbarNotification";
import { useRouter } from "next/router";

const ProductDetailsPage = ({ product }) => {
  const router = useRouter();
  const { slug } = router.query;

  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { comparedProducts, addToCompare, removeFromCompare } = useCompare();

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (slug?.length !== 2) {
      return;
    }

    // Reset main image when product changes
    if (product?.images?.length) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    setIsInWishlist(wishlist.some((item) => item.id === product.id));
    setIsInCompare(comparedProducts.some((item) => item.id === product.id));
  }, [wishlist, comparedProducts]);

  const handleAddToCart = () => {
    addToCart(product);
    setSnackbarMessage(`${product.title} added to cart!`);
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      setSnackbarMessage(`${product.title} removed from wishlist.`);
      setSnackbarSeverity("error");
    } else {
      addToWishlist(product);
      setSnackbarMessage(`${product.title} added to wishlist.`);
      setSnackbarSeverity("success");
    }
    setIsInWishlist(!isInWishlist);
    setOpenSnackbar(true);
  };

  const handleCompareClick = () => {
    if (
      comparedProducts.length > 0 &&
      comparedProducts[0].category !== product.category
    ) {
      setSnackbarMessage(
        `You can only compare products in the "${comparedProducts[0].category}" category.`
      );
      setSnackbarSeverity("error");
    } else if (isInCompare) {
      removeFromCompare(product.id);
      setSnackbarMessage(`${product.title} removed from compare.`);
      setSnackbarSeverity("error");
    } else if (comparedProducts.length < 3) {
      addToCompare(product);
      setSnackbarMessage(`${product.title} added to compare.`);
      setSnackbarSeverity("success");
    } else {
      setSnackbarMessage("You can compare a maximum of 3 products.");
      setSnackbarSeverity("error");
    }
    setIsInCompare(!isInCompare);
    setOpenSnackbar(true);
  };

  return (
    <Container sx={{ marginTop: 10, minHeight: "80vh" }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
          <MainImageSection
            images={product.images}
            mainImage={mainImage}
            setMainImage={setMainImage}
            title={product.title}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProductInfoSection product={product} />
          <ProductActions
            handleAddToCart={handleAddToCart}
            handleWishlistClick={handleWishlistClick}
            handleCompareClick={handleCompareClick}
            isInWishlist={isInWishlist}
            isInCompare={isInCompare}
            isCompareDisabled={comparedProducts.length === 3 && !isInCompare}
            product={product}
            cart={cart}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        </Grid>
      </Grid>
      <SnackbarNotification
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setOpenSnackbar(false)}
      />
    </Container>
  );
};

export async function getServerSideProps({ params }) {
  const product = await fetchProductDetails(params.slug[0]);

  return {
    props: { product },
  };
}

export default ProductDetailsPage;
