import { Box, Button, Icon } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BalanceIcon from "@mui/icons-material/Balance";
import DeleteIcon  from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ProductActions = ({
  handleAddToCart,
  handleWishlistClick,
  handleCompareClick,
  isInWishlist,
  isInCompare,
  isCompareDisabled,
  product,
  cart,
  updateQuantity,
  removeFromCart,
}) => {
  // Find the item in the cart
  const cartItem = cart?.find((item) => item.id === product.id);

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(cartItem.id, cartItem.quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && cartItem.quantity > 1) {
      updateQuantity(cartItem.id, cartItem.quantity - 1);
    }
  };

  const handleRemoveFromCart = () => {
    if (cartItem) {
      removeFromCart(cartItem.id);
    }
  };

  return (
    <Box marginTop={3}>
      {!cartItem ? (
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: "#ff6f61",
            color: "white",
            width: "100%",
            "&:hover": { backgroundColor: "#ff4b36" },
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
          onClick={handleAddToCart}
        >
          <ShoppingCartIcon sx={{ marginRight: 1 }} />
          Add to Cart
        </Button>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} gap={{xs:1,md:3}}>
          <Button
            variant="contained"
            size="small"
            fullWidth
            sx={{
              backgroundColor: "#ff6f61",
              color: "white",
              "&:hover": { backgroundColor: "#ff4b36" },
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: "8px",
            }}
            disabled
          >
            Added to Cart
          </Button>
          <Box sx={{display:"flex"}} gap={1}>
            <Icon
              onClick={handleDecreaseQuantity}
              sx={{
                cursor: "pointer",
                marginRight: 1,
                color: "#ff6f61",
                "&:hover": { color: "#ff4b36" },
              }}
            >
              <RemoveCircleOutlineIcon />
            </Icon>
            <Box>{cartItem.quantity}</Box>
            <Icon
              onClick={handleIncreaseQuantity}
              sx={{
                cursor: "pointer",
                marginLeft: 1,
                color: "#ff6f61",
                "&:hover": { color: "#ff4b36" },
              }}
            >
              <AddCircleOutlineIcon />
            </Icon>
            </Box>
          <Button
            size="small"
            variant="outlined"
            fullWidth
            sx={{
              color: "#ff6f61",
              borderColor: "#ff6f61",
              "&:hover": {
                color: "#ff4b36",
                borderColor: "#ff4b36",
              },
            }}
            onClick={handleRemoveFromCart}
          >
            <DeleteIcon sx={{marginRight:1}}/>
            Remove
          </Button>
        </Box>
      )}

      <Button
        variant="outlined"
        fullWidth
        size="small"
        sx={{
          textTransform: "none",
          fontSize: "0.75rem",
          padding: "6px 12px",
          borderColor: "#ff6f61",
          marginTop: 2,
          color: "#ff6f61",
          "&:hover": {
            borderColor: "#ff4b36",
            color: "#ff4b36",
          },
        }}
        onClick={handleWishlistClick}
      >
        <FavoriteIcon sx={{ marginRight: 1 }} />
        {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      </Button>

      <Button
        variant="outlined"
        fullWidth
        size="small"
        sx={{
          textTransform: "none",
          fontSize: "0.75rem",
          padding: "6px 12px",
          borderColor: "#ff6f61",
          marginTop: 2,
          color: "#ff6f61",
          "&:hover": {
            borderColor: "#ff4b36",
            color: "#ff4b36",
          },
        }}
        onClick={handleCompareClick}
        disabled={isCompareDisabled}
      >
        <BalanceIcon sx={{ marginRight: 1 }} />
        {isInCompare ? "Remove from Compare" : "Add to Compare"}
      </Button>
    </Box>
  );
};

export default ProductActions;
