import { Box, Breadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function BreadCrumb({ path }) {
  const convertedCategorySlug = (title) => {
    return title
      .trim() // Remove leading and trailing spaces
      .replace(/[\s_-]+/g, " "); // Replace spaces and underscores with hyphens
  };

  console.log(path.split("/"));
  return (
    <div role="presentation">
      <Breadcrumbs 
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            textTransform: "capitalize",
          }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Home
        </Link>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textTransform: "capitalize",
          }}
          color={path.split("/").length == 2 ? "#312a29" : "inherit"}
        >
          {path.split("/")[1]}
        </Box>

        {path.split("/")[2] && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textTransform: "capitalize",
              color: "#312a29",
              width: { xs: 100, md: "auto" },
            }}
            color="inherit"
          >
            {" "}
            <Typography
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {convertedCategorySlug(path.split("/")[2])}
            </Typography>
          </Box>
        )}
      </Breadcrumbs>
    </div>
  );
}

export default BreadCrumb;
