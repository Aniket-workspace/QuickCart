// components/CategoryCard.js

import { Paper, Typography } from "@mui/material";
import Link from "next/link";

const CategoryCard = ({ validCategories }) => {
  return (
    <>
      {validCategories.map((category, index) => (
        <Link href={`/category/${category.slug}`} passHref key={index}>
          <Paper
            sx={{
              padding: 3,
              textAlign: "center",
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            {/* Category title */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#ff4b39",
                textTransform: "capitalize",
                fontSize:{xs:"1rem",sm:"1.25rem"}
              }}
            >
              {category.name}
            </Typography>
          </Paper>
        </Link>
      ))}
    </>
  );
};

export default CategoryCard;
