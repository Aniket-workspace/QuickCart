import { Box } from "@mui/material";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// import "../../styles/"

const MainImageSection = ({ images, mainImage, setMainImage, title }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}
  >
    {/* Main Image with Zoom */}
    <Box
      sx={{
        backgroundColor: "#ebebeb",
        borderRadius: 5,
        minHeight: 400,
        display: { xs: "none", sm: "flex" },
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Zoom>
        <img
          src={mainImage}
          alt={title}
          style={{
            maxHeight: 400,
            width: "100%",
            objectFit: "contain",
          }}
        />
      </Zoom>
    </Box>

    {/* Thumbnail Gallery */}
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
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
            border: mainImage === img ? "2px solid #ff6f61" : "2px solid #ddd",
            borderRadius: 4,
            objectFit: "cover",
          }}
          onClick={() => setMainImage(img)}
        />
      ))}
    </Box>

    {/* Swipe Gallery for Mobile */}
    <Box
      sx={{
        display: { xs: "block", sm: "none" }, // Show only on small screens
        width: "100%",
      }}
    >
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        spaceBetween={10}
        slidesPerView={1}
        onSlideChange={(swiper) => setMainImage(images[swiper.activeIndex])}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                backgroundColor: "#ebebeb",
                borderRadius: 5,
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Zoom>
                <img
                  src={img}
                  alt={`${title} slide`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 5,
                    marginBottom: 10,
                  }}
                />{" "}
              </Zoom>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  </Box>
);

export default MainImageSection;
