import { CardMedia, Chip } from "@mui/material";

const ProductMedia = ({ product }) => (
  <>
    {product.hotDeal && (
      <Chip
        label="Hot Deal"
        size="small"
        sx={{
          background: "linear-gradient(135deg, #ff4500, #ff6f61)",
          color: "#fff",
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 10,
          pointerEvents: "none",
          fontSize: { xs: "10px", sm: "" },
        }}
      />
    )}
    <Chip
      label={`${product.discountPercentage}% off`}
      size="small"
      sx={{
        background: "linear-gradient(135deg, #ff6f61, #ffcc00)",
        color: "#fff",
        position: "absolute",
        margin: "10px 0 0 10px",
        fontSize: { xs: "10px", sm: "" },
        zIndex: 10,
      }}
    />
    <CardMedia
      component="img"
      image={product.images[0]}
      alt={product.title}
      sx={{
        padding: "10px",
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        objectFit: "contain",
        height: { xs: 180, sm: 200 },
        position: "relative",
        paddingTop: 3,
      }}
    />
  </>
);

export default ProductMedia;
