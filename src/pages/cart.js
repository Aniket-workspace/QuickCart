import { Box, Button, Typography } from "@mui/material";
import { useCart } from "../context/CartContext";
import CartItem from "@/components/CartItem";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, emptyCart } = useCart();

  const totalAmount = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Box
      sx={{
        padding: { xs: "16px", sm: "32px" },
        marginTop: 6,
        minHeight: "80vh",
      }}
    >
      {cart.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ color: "#ff6f61" }}>
          No items in the cart
        </Typography>
      ) : (
        <CartItem
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      )}

      {cart.length > 0 && (
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Total: ${totalAmount}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={emptyCart} // Call the emptyCart function here
            sx={{
              backgroundColor: "#ff6f61",
              color: "white",
              "&:hover": {
                backgroundColor: "#ff4b36",
              },
              padding: "10px 20px",
              textTransform: "none",
            }}
          >
            Empty Cart
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
