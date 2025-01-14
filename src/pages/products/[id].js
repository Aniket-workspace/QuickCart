// import { Container, Grid } from "@mui/material";
// import { useEffect, useState } from "react";

// import { useCart } from "../../context/CartContext";
// import { useWishlist } from "../../context/WishlistContext";
// import { useCompare } from "../../context/CompareContext";
// import { fetchProductDetails } from "../api/all-api";
// import MainImageSection from "@/components/ProductDetails/MainImageSection";
// import ProductInfoSection from "@/components/ProductDetails/ProductInfoSection";
// import ProductActions from "@/components/ProductDetails/ProductActions";
// import SnackbarNotification from "@/components/ProductDetails/SnackbarNotification";

// const ProductDetailsPage = ({ product }) => {
//   const { cart, addToCart, updateQuantity,removeFromCart } = useCart();
//   const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
//   const { comparedProducts, addToCompare, removeFromCompare } = useCompare();

//   const [mainImage, setMainImage] = useState(product.images[0]);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [isInWishlist, setIsInWishlist] = useState(false);
//   const [isInCompare, setIsInCompare] = useState(false);

//   const checkProductInWishlist = () => {
//     setIsInWishlist(wishlist.some((item) => item.id === product.id));
//   };

//   const checkProductInCompare = () => {
//     setIsInCompare(comparedProducts.some((item) => item.id === product.id));
//   };

//   const handleAddToCart = () => {
//     addToCart(product);
//     setSnackbarMessage(`${product.title} added to cart!`);
//     setOpenSnackbar(true);
//   };

//   const handleWishlistClick = () => {
//     if (isInWishlist) {
//       removeFromWishlist(product.id);
//       setSnackbarMessage(`${product.title} removed from wishlist.`);
//     } else {
//       addToWishlist(product);
//       setSnackbarMessage(`${product.title} added to wishlist.`);
//     }
//     setIsInWishlist(!isInWishlist);
//     setOpenSnackbar(true);
//   };

//   const handleCompareClick = () => {
//     if (isInCompare) {
//       removeFromCompare(product.id);
//       setSnackbarMessage(`${product.title} removed from compare.`);
//     } else {
//       addToCompare(product);
//       setSnackbarMessage(`${product.title} added to compare.`);
//     }
//     setIsInCompare(!isInCompare);
//     setOpenSnackbar(true);
//   };

//   useEffect(() => {
//     checkProductInWishlist();
//     checkProductInCompare();
//   }, [wishlist, comparedProducts]);

//   return (
//     <Container sx={{ marginTop: 10, minHeight: "80vh" }}>
//       <Grid container spacing={3} alignItems="center">
//         <Grid item xs={12} sm={6}>
//           <MainImageSection
//             images={product.images}
//             mainImage={mainImage}
//             setMainImage={setMainImage}
//             title={product.title}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <ProductInfoSection product={product} />
//           <ProductActions
//             handleAddToCart={handleAddToCart}
//             handleWishlistClick={handleWishlistClick}
//             handleCompareClick={handleCompareClick}
//             isInWishlist={isInWishlist}
//             isInCompare={isInCompare}
//             isCompareDisabled={comparedProducts.length === 3 && !isInCompare}
//             product={product}
//             cart={cart}
//             updateQuantity={updateQuantity}
//             removeFromCart={removeFromCart}
//           />
//         </Grid>
//       </Grid>
//       <SnackbarNotification
//         open={openSnackbar}
//         message={snackbarMessage}
//         onClose={() => setOpenSnackbar(false)}
//       />
//     </Container>
//   );
// };

// export async function getServerSideProps({ params }) {
//   const product = await fetchProductDetails(params.id);

//   return {
//     props: { product },
//   };
// }

// export default ProductDetailsPage;
