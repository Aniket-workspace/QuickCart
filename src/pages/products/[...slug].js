import { Box, Button, Container, Grid, Typography } from "@mui/material";
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
import Head from "next/head";
import ReviewCard from "@/components/ProductDetails/ReviewCard";
import ProductMarquee from "@/components/ProductDetails/ProductMarquee";
import BreadCrumb from "@/components/BreadCrumb";
import { usePathname } from "next/navigation";

const ProductDetailsPage = ({ product }) => {
  const router = useRouter();
  const { slug } = router.query;

  const path = usePathname()

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

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
    setSnackbarMessage(`${product.title} removed from cart!`);
    setSnackbarSeverity("error");
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
      setOpenSnackbar(true);
      return; // Exit the function here to prevent the toggle
    } else if (isInCompare) {
      removeFromCompare(product.id);
      setSnackbarMessage(`${product.title} removed from compare.`);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } else if (comparedProducts.length < 3) {
      addToCompare(product);
      setSnackbarMessage(`${product.title} added to compare.`);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage("You can compare a maximum of 3 products.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return; // Exit the function here to prevent the toggle
    }

    // Toggle the 'isInCompare' only after adding/removing
    setIsInCompare(!isInCompare);
  };

  console.log(product.reviews);
  return (
    <>
      <Head>
        <title>{`${product.title} - Your Store`}</title>
        <meta
          name="description"
          content={product.description || "Product details and specifications."}
        />
        <meta property="og:title" content={product.title} />
        <meta
          property="og:description"
          content={
            product.description || "Explore product features and details."
          }
        />
        <meta
          property="og:image"
          content={product.images[0] || "default-image-url"}
        />
        <meta
          property="og:url"
          content={`https://yourstore.com/products/${product.slug}`}
        />
      </Head>
      <Container sx={{ marginTop: 12, minHeight: "80vh" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <BreadCrumb path={path}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <MainImageSection
              key={product.id} // Ensure re-initialization of Swiper components
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
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>

          <Grid
            item
            xs={12}
            container
            spacing={2}
            mt={2}
            justifyContent="flex-start"
          >
            {product.reviews.map((review, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ReviewCard reviewInfo={[review]} />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>
            <ProductMarquee product={product} />
          </Grid>
        </Grid>
        <SnackbarNotification
          key={snackbarMessage}
          open={openSnackbar}
          message={snackbarMessage}
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
        />
      </Container>
    </>
  );
};

export async function getServerSideProps({ params }) {
  const product = await fetchProductDetails(params.slug[1]);

  return {
    props: { product },
  };
}

export default ProductDetailsPage;
