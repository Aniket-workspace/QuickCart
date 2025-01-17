import { useState } from "react";
import { Box } from "@mui/material";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Thumbs } from "swiper/modules";

const MainImageSection = ({ images, mainImage, setMainImage, title }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Main Image Swiper */}
      <Box
        sx={{
          backgroundColor: "#ebebeb",
          borderRadius: 5,
          minHeight: 400,
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Swiper
          modules={[Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={(swiper) => setMainImage(images[swiper.activeIndex])}
          spaceBetween={10}
          slidesPerView={1}
          style={{ width: "100%", maxHeight: 400 }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Zoom>
                <img
                  src={img}
                  alt={title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    maxHeight: 400,
                    objectFit: "contain",
                    borderRadius: 5,
                  }}
                />
              </Zoom>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Thumbnail Swiper */}
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          marginTop: 2,
          width: "100%",
        }}
      >
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbsSwiper}
          watchSlidesProgress={true}
          slideToClickedSlide={true}
          slidesPerView={4}
          spaceBetween={10}
          style={{
            width: "100%",
            cursor: "pointer",
          }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`${title} thumbnail`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 5,
                  border:
                    mainImage === img ? "2px solid #ff6f61" : "2px solid #ddd",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box
        sx={{
          display: { xs: "block", sm: "none" },
          width: "100%",
          position: "relative", // Ensure proper positioning for pagination
        }}
      >
        <Swiper
          modules={[Pagination]}
          loop={true}
          lazy={true}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          spaceBetween={10}
          slidesPerView={1}
          onSlideChange={(swiper) => setMainImage(images[swiper.activeIndex])}
          style={{
            paddingBottom: 40, // Add bottom padding for pagination bullets
          }}
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
                    loading="lazy"
                    alt={`${title} slide`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 5,
                      marginBottom: 10,
                    }}
                  />
                </Zoom>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default MainImageSection;
