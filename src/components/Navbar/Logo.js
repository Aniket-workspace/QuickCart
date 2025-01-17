import React from "react";
import Link from "next/link";
import { IconButton, Typography } from "@mui/material";

const Logo = ({onClick}) => (
  <Link href="/" passHref>
    <IconButton onClick={onClick}>
    {" "}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#312a29",
          textDecoration: "none",
          fontSize: { xs: "1rem", sm: "1.5rem" },
          backgroundColor: "#fff",
          padding: "0 10px",
          borderRadius: "10px",
        }}
      >
        <span style={{ color: "#ff4b39" }}>Quick</span>Cart
        <span style={{ fontSize: "12px" }}>.in</span>
      </Typography>
    </IconButton>
  </Link>
);

export default Logo;
