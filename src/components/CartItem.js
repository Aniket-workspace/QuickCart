import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import Link from "next/link";
import Image from "next/image";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTitleToSlug } from "@/customHooks/useTitleToSlug";

const CartItem = ({ cart, updateQuantity, removeFromCart }) => {
  return (
    <List sx={{ marginBottom: "20px" }}>
      {/* Cart Items List */}
      {cart.map((item) => {
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
            <Link
              href={`/products/${item.id}/${slug}`}
              passHref
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginRight: "100px",
                }}
              >
                {/* Optimized Image */}
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

                {/* Text */}
                <ListItemText
                  primary={item.title}
                  secondary={`$${item.price} x ${item.quantity}`}
                  sx={{ marginBottom: "8px" }}
                />
              </Box>
            </Link>
            {/* Item Action Buttons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                variant="outlined"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                sx={{
                  width: "40px",
                  height: "40px",
                  color: "#ff6f61",
                  "&:hover": {
                    color: "#ff4b36",
                  },
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
              <IconButton
                variant="outlined"
                onClick={() =>
                  item.quantity > 1 &&
                  updateQuantity(item.id, item.quantity - 1)
                }
                sx={{
                  width: "40px",
                  height: "40px",
                  color: "#ff6f61",
                  "&:hover": {
                    color: "#ff4b36",
                  },
                }}
              >
                <RemoveCircleOutlineIcon fontSize="200" />
              </IconButton>
              <IconButton
                variant="contained"
                color="error"
                onClick={() => removeFromCart(item.id)}
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

export default CartItem;
