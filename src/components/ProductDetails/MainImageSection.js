import { Box } from "@mui/material";

const MainImageSection = ({ images, mainImage, setMainImage, title }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    {/* Main Image */}
    <img
      src={mainImage}
      alt={title}
      style={{
        maxHeight: 500,
        width: "100%",
        objectFit: "contain",
        marginBottom: 16,
      }}
    />
    {/* Thumbnails */}
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 1,
        marginTop: 2,
      }}
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`${title} thumbnail`}
          style={{
            width: 60,
            height: 60,
            cursor: "pointer",
            border:
              mainImage === img ? "2px solid #ff6f61" : "2px solid #ddd",
            borderRadius: 4,
            objectFit: "cover",
          }}
          onClick={() => setMainImage(img)}
        />
      ))}
    </Box>
  </Box>
);

export default MainImageSection;
