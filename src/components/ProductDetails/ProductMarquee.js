import React, { useEffect, useState } from "react";
import { Box, Card, CardMedia, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import { useTitleToSlug } from "@/customHooks/useTitleToSlug";

const ProductMarquee = ({ product }) => {
  const [products, setProducts] = useState([]);

  const fetchMarqueeProducts = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${product.category}`
      );
      setProducts(
        response.data.products.filter(
          (i) => i.category === product.category && i.id !== product.id
        )
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchMarqueeProducts();
  }, [product]);

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        position: "relative",
        marginTop: 3,
      }}
    >
      <Typography
        variant="h6"
        textAlign={"center"}
        mb={4}
        sx={{ fontWeight: "bold", color: "#655967" }}
      >
        You may also like
      </Typography>
      <Box
        gap={2}
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          animation: "scroll 30s linear infinite",
          "& > a": {
            display: "block",
            marginRight: 1,
            textDecoration: "none",
          },
          "&:hover": {
            animationPlayState: "paused",
          },
          "@keyframes scroll": {
            from: { transform: "translateX(100%)" },
            to: { transform: "translateX(-100%)" },
          },
        }}
      >
        {products.map((product, index) => {
          const slug = useTitleToSlug(product.title);
          return (
            <Link key={index} href={`/products/${product.id}/${slug}`} passHref>
              <Card
                sx={{
                  width: 130,
                  height: 200,
                  boxShadow: "none",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="120"
                  image={product.images[0]}
                  alt={product.title}
                  sx={{
                    objectFit: "contain",
                    maxWidth: "100%",
                    backgroundColor: "#ebebeb",
                    borderRadius: 3,
                  }}
                />
                <Tooltip title={product.title} arrow>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: "0.875rem",
                      color: "text.primary",
                      padding: "4px 0",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.title}
                  </Typography>
                </Tooltip>
                <Typography
                  variant="caption"
                  sx={{
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  ${product.price}
                </Typography>
              </Card>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProductMarquee;
