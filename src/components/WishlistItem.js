// components/WishlistItem.js

import {
  Button,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useTitleToSlug } from "@/customHooks/useTitleToSlug";

const WishlistItem = ({ wishlist, removeFromWishlist }) => {
  const { addToCart } = useCart();

  return (
    <List sx={{ marginBottom: "20px" }}>
      {wishlist.map((item) => {
        const slug = useTitleToSlug(item.title);

        return (
          <ListItem
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
              borderBottom: "1px solid #eee",
              paddingBottom: "16px",
            }}
          >
            {/* Item Details */}
            <Link href={`/products/${item.id}/${slug}`} passHref>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginRight: "100px",
                }}
              >
                {/* image */}
                <ListItemIcon>
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={50}
                    height={50}
                    unoptimized
                    style={{ borderRadius: "4px" }}
                  />
                </ListItemIcon>

                {/* title */}
                <ListItemText
                  primary={item.title}
                  secondary={`$${item.price}`}
                  sx={{ marginBottom: "8px" }}
                />
              </Box>
            </Link>

            {/*  Action Buttons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                onClick={() => {
                  addToCart(item);
                  removeFromWishlist(item.id);
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#ff6f61",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#ff4b36",
                  },
                  padding: "6px 12px",
                }}
              >
                Move to Cart
              </Button>

              <IconButton
                variant="contained"
                color="error"
                onClick={() => removeFromWishlist(item.id)}
                sx={{
                  height: "40px",
                  backgroundColor: "#ff6f61",
                  "&:hover": {
                    backgroundColor: "#ff4b36",
                  },
                  color: "white",
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};

export default WishlistItem;
