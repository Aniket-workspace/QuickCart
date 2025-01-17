import { Typography, Rating, Stack, Chip, Box } from "@mui/material";

const ProductInfoSection = ({ product }) => {
  const actualPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#312a29",
        }}
      >
        {product.title}
      </Typography>
      <Typography
        variant="h6"
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
          {" "}
          ${actualPrice}
        </span>{" "}
        ${product.price}
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          textAlign: "justify",
          color: "#333",
        }}
      >
        {product.description}
      </Typography>

      <Typography
        variant="body2"
        gutterBottom
        sx={{
          color: "#ff4b39",
        }}
      >
        {product.discountPercentage}% Off
      </Typography>

      <Typography
        variant="body2"
        gutterBottom
        sx={{
          color: "#333",
          textTransform: "capitalize",
        }}
      >
        Category: {product.category}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center" }} gap={1}>
        <Rating value={product.rating} readOnly />{" "}
        <Typography variant="body2" color="textSecondary">
          {product.reviews.length} Review(s)
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} mt={2}>
        {product.tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            sx={{
              background: "linear-gradient(135deg, #ff6f61, #ffcc00)",
              color: "#fff",
            }}
          />
        ))}
      </Stack>
    </>
  );
};

export default ProductInfoSection;
