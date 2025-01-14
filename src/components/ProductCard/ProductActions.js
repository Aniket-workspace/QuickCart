import { IconButton, Box, Tooltip } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ProductActions = ({
  product,
  isInCart,
  isInWishlist,
  isInCompare,
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  addToCompare,
  removeFromCompare,
  setOpenSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,comparedProducts
}) => {
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
    setOpenSnackbar(true);
  };

  const handleCompareClick = () => {
    const categoryMismatch =
      comparedProducts.length > 0 &&
      comparedProducts[0].category !== product.category;

    if (categoryMismatch) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        `You can only compare products in the "${comparedProducts[0].category}" category.`
      );
      setOpenSnackbar(true);
      return;
    }

    setSnackbarSeverity("success");
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
    setOpenSnackbar(true);
  };

  return (
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
            <RemoveCircleIcon />
          </Tooltip>
        ) : (
          <Tooltip title={"Add To Compare "} arrow>
            <CompareArrowsIcon />
          </Tooltip>
        )}
      </IconButton>
    </Box>
  );
};

export default ProductActions;
