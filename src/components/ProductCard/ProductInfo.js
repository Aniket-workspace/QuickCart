import { Typography, Tooltip } from "@mui/material";

const ProductInfo = ({ product }) => {
  const actualPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <>
      <Tooltip title={product.title} arrow>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "#312a29",
            marginBottom: 1,
            cursor: "pointer",
            fontSize: { xs: "0.875rem", sm: "1rem" },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {product.title}
        </Typography>
      </Tooltip>
      <Typography
        variant="body2"
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
          ${actualPrice}
        </span>{" "}
        ${product.price}
      </Typography>
    </>
  );
};

export default ProductInfo;
