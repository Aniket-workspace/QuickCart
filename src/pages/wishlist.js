// pages/wishlist.js

import { Container, Typography, Box, Button } from "@mui/material";
import { useWishlist } from "../context/WishlistContext";
import WishlistItem from "@/components/WishlistItem";

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, emptyWishlist } = useWishlist();

  return (
    <Container
      sx={{
        padding: { xs: "16px", sm: "32px" },
        marginTop: 6,
        minHeight: "80vh",
      }}
    >
      <Box>
        {wishlist.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ color: "#ff6f61" }}>
            No items in your wishlist
          </Typography>
        ) : (
          // Wish list item
          <WishlistItem
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
          />
        )}

        {wishlist.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={emptyWishlist} // Call the emptyCart function here
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
              Empty Wishlist
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default WishlistPage;
