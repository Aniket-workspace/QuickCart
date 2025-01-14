import { useState, useEffect } from "react";
import { Card, CardContent, Box } from "@mui/material";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import { useTitleToSlug } from "@/customHooks/useTitleToSlug";
import ProductMedia from "./ProductMedia";
import ProductInfo from "./ProductInfo";
import ProductActions from "./ProductActions";
import CountdownTimer from "./CountdownTimer";
import SnackbarNotification from "../ProductDetails/SnackbarNotification";

const ProductCard = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { comparedProducts, addToCompare, removeFromCompare } = useCompare();
  const [timeLeft, setTimeLeft] = useState(0);
  const [showIcons, setShowIcons] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const timerKey = `hotDealTimer_${product.id}`;
    const savedEndTime = localStorage.getItem(timerKey);
    const now = Date.now();

    let endTime;
    if (savedEndTime && now < savedEndTime) {
      endTime = parseInt(savedEndTime, 10);
    } else {
      endTime = now + 7200000; // 2 hours in milliseconds
      localStorage.setItem(timerKey, endTime);
    }

    const timer = setInterval(() => {
      const remainingTime = Math.max(
        0,
        Math.floor((endTime - Date.now()) / 1000)
      );
      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        localStorage.setItem(timerKey, Date.now() + 7200000);
        setTimeLeft(7200);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [product.id]);

  useEffect(() => {
    setIsInCart(cart.some((item) => item.id === product.id));
    setIsInWishlist(wishlist.some((item) => item.id === product.id));
    setIsInCompare(comparedProducts.some((item) => item.id === product.id));
  }, [wishlist, comparedProducts, cart]);

  const slug = useTitleToSlug(product.title);

  return (
    <>
      <Card
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.01)",
            boxShadow: 6,
          },
          backgroundColor: "background.paper",
          border: "1px solid #ddd",
          height: {xs:290,sm:325},
        }}
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}
      >
        <Link href={`/products/${product.id}/${slug}`} passHref>
          <ProductMedia product={product} />
          <CardContent
            sx={{
              padding: 2,
              flexGrow: 0,
              marginTop: "auto",
            }}
          >
            <ProductInfo product={product} />
          </CardContent>
        </Link>

        {product.hotDeal && (
          <CountdownTimer timeLeft={timeLeft} />
        )}

        {showIcons && (
          <ProductActions
            product={product}
            isInCart={isInCart}
            isInWishlist={isInWishlist}
            isInCompare={isInCompare}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            addToCompare={addToCompare}
            removeFromCompare={removeFromCompare}
            setOpenSnackbar={setOpenSnackbar}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
            comparedProducts={comparedProducts}
          />
        )}
      </Card>

      <SnackbarNotification
        open={openSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={() => setOpenSnackbar(false)}
      />
    </>
  );
};

export default ProductCard;
