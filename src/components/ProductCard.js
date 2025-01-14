import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Tooltip,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCompare } from "@/context/CompareContext";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import SnackbarNotification from "./ProductDetails/SnackbarNotification";
import { useTitleToSlug } from "@/customHooks/useTitleToSlug";

const ProductCard = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { comparedProducts, addToCompare, removeFromCompare } = useCompare();
  const [timeLeft, setTimeLeft] = useState(0); // Remaining time in seconds
  const [showIcons, setShowIcons] = useState(false); // Toggle visibility of icons
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCompare, setIsInCompare] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    // Unique key for each product's timer
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

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // const toggleCart = () => setIsInCart((prev) => !prev);
  // const toggleWishlist = () => setIsInWishlist((prev) => !prev);
  // const toggleCompare = () => setIsInCompare((prev) => !prev);

  const actualPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  const checkProductInWishlist = () => {
    setIsInWishlist(wishlist.some((item) => item.id === product.id));
  };

  const checkProductInCompare = () => {
    setIsInCompare(comparedProducts.some((item) => item.id === product.id));
  };
  const checkProductInCart = () => {
    setIsInCart(cart.some((item) => item.id === product.id));
  };

  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(product.id);
      setSnackbarSeverity("error");
      setSnackbarMessage(`${product.title} removed from cart.`);
    } else {
      addToCart(product);
      setSnackbarSeverity("success");
      setSnackbarMessage(`${product.title} added to cart.`);
    }
    setIsInCart(!isInCart);
    setOpenSnackbar(true);
  };

  const handleWishlistClick = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      setSnackbarSeverity("error");
      setSnackbarMessage(`${product.title} removed from wishlist.`);
    } else {
      addToWishlist(product);
      setSnackbarSeverity("success");
      setSnackbarMessage(`${product.title} added to wishlist.`);
    }
    setIsInWishlist(!isInWishlist);
    setOpenSnackbar(true);
  };

  const handleCompareClick = () => {
    const categoryMismatch =
      comparedProducts.length > 0 &&
      comparedProducts[0].category !== product.category;

    if (categoryMismatch) {
      setSnackbarSeverity("error"); // Set severity to error
      setSnackbarMessage(
        `You can only compare products in the "${comparedProducts[0].category}" category.`
      );
      setOpenSnackbar(true);
      return;
    }

    setSnackbarSeverity("success"); // Default to success
    if (isInCompare) {
      removeFromCompare(product.id);
      setSnackbarMessage(`${product.title} removed from compare.`);
    } else {
      if (comparedProducts.length < 3) {
        addToCompare(product);
        setSnackbarMessage(`${product.title} added to compare.`);
      } else {
        setSnackbarMessage("You can compare a maximum of 3 products.");
      }
    }
    setIsInCompare(!isInCompare);
    setOpenSnackbar(true);
  };

  useEffect(() => {
    checkProductInWishlist();
    checkProductInCompare();
    checkProductInCart();
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
          transition: "transform 0.1s ease-in-out",
          "&:hover": {
            transform: "scale(1.01)",
            boxShadow: 6,
          },
          backgroundColor: "background.paper",
          border: "1px solid #ddd",
          height: 325,
        }}
        onMouseEnter={() => setShowIcons(true)}
        onMouseLeave={() => setShowIcons(false)}
      >
        <Link href={`/products/${product.id}/${slug}`} passHref>
          {product.hotDeal && (
            <Chip
              label="Hot Deal"
              size="small"
              sx={{
                background: "linear-gradient(135deg, #ff4500, #ff6f61)",
                color: "#fff",
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
          )}
          <Chip
            label={`${product.discountPercentage}% off`}
            size="small"
            sx={{
              background: "linear-gradient(135deg, #ff6f61, #ffcc00)",
              color: "#fff",
              position: "absolute",
              margin: "10px 0 0 10px",
            }}
          />
          <CardMedia
            component="img"
            image={product.images[0]}
            alt={product.title}
            sx={{
              padding: "10px",
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              objectFit: "contain",
              height: { xs: 180, sm: 200 },
              position: "relative",
              paddingTop: 3,
            }}
          />
          <CardContent
            sx={{
              padding: 2,
              flexGrow: 0,
              marginTop: "auto",
            }}
          >
            <Tooltip title={product.title} arrow>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "#655967",
                  marginBottom: 1,
                  cursor: "pointer",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {product.title}
              </Typography>
            </Tooltip>
            <Typography
              variant="body2"
              color="#ff4b39"
              sx={{
                marginBottom: 2,
                fontSize: { xs: "0.875rem", sm: "1rem" },
                fontWeight: "bold",
              }}
            >
              <span
                style={{
                  textDecoration: "line-through",
                  fontSize: "12px",
                  color: "grey",
                }}
              >
                ${actualPrice}
              </span>{" "}
              ${product.price}
            </Typography>
          </CardContent>
        </Link>

        {/* Countdown Timer */}
        {product.hotDeal && (
          <Box
            sx={{
              textAlign: "center",
              background: "linear-gradient(135deg, #ff4500, #ff6f61)",
              color: "#fff",
              padding: "5px 0",
              fontSize: "0.875rem",
              marginTop: -4,
            }}
          >
            Offer ends in: {formatTime(timeLeft)}
          </Box>
        )}

        {/* Hover Icons */}
        {showIcons && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 15,
              gap: 1,
              marginRight: 1,
            }}
          >
            <IconButton
              onClick={handleAddToCart}
              sx={{
                color: isInCart ? "#ff4b39" : "grey",
              }}
            >
              {isInCart ? (
                <Tooltip title={"Remove From Cart"} arrow>
                  <RemoveShoppingCartIcon />
                </Tooltip>
              ) : (
                <Tooltip title={"Add To Cart"} arrow>
                  <AddShoppingCartIcon />
                </Tooltip>
              )}
            </IconButton>
            <IconButton
              onClick={handleWishlistClick}
              sx={{
                color: isInWishlist ? "#ff4b39" : "grey",
              }}
            >
              {isInWishlist ? (
                <Tooltip title={"Remove From Wishlist"} arrow>
                  <FavoriteIcon />
                </Tooltip>
              ) : (
                <Tooltip title={"Add To Wishlist"} arrow>
                  <FavoriteBorderIcon />
                </Tooltip>
              )}
            </IconButton>
            <IconButton
              onClick={handleCompareClick}
              disabled={comparedProducts.length === 3 && !isInCompare}
              sx={{
                color: isInCompare ? "#ff4b39" : "grey",
              }}
            >
              {isInCompare ? (
                <Tooltip title={"Remove From Compare"} arrow>
                  <RemoveCircleIcon />{" "}
                </Tooltip>
              ) : (
                <Tooltip title={"Add To Compare "} arrow>
                  <CompareArrowsIcon />{" "}
                </Tooltip>
              )}
            </IconButton>
          </Box>
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
