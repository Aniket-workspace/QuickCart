import React from "react";
import { Tooltip, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BalanceIcon from "@mui/icons-material/Balance";
import { useRouter } from "next/router";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";

const IconButtons = ({ closeDrawer }) => {
  const router = useRouter();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { comparedProducts } = useCompare();

  const icons = [
    {
      title: "Cart",
      onClick: () => {
        router.push("/cart");
        if (closeDrawer) closeDrawer();
      },
      icon: <ShoppingCartIcon />,
      count: cart.length,
    },
    {
      title: "Wishlist",
      onClick: () => {
        router.push("/wishlist");
        if (closeDrawer) closeDrawer();
      },
      icon: <FavoriteIcon />,
      count: wishlist.length,
    },
    {
      title: "Compare",
      onClick: () => {
        router.push("/compare");
        if (closeDrawer) closeDrawer();
      },
      icon: <BalanceIcon />,
      count: comparedProducts.length,
    },
  ];

  return icons.map(({ title, onClick, icon, count }) => (
    <Tooltip title={title} arrow key={title}>
      <IconButton
        color="inherit"
        onClick={onClick}
        sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" } }}
      >
        <Badge badgeContent={count} color="error">
          {icon}
        </Badge>
      </IconButton>
    </Tooltip>
  ));
};

export default IconButtons;
