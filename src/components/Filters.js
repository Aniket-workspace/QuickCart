import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const Filters = ({
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder,
  category,
  maxPrice,
  initialPriceRange, // New prop for initial price range
}) => {
const handleMinPriceChange = (event) => {
  const inputValue = event.target.value;
  if (/^\d*$/.test(inputValue)) {
    // Only update if the input is a valid number or empty
    const minPrice = inputValue === "" ? "" : Math.max(0, Number(inputValue));
    setPriceRange([minPrice, priceRange[1]]);
  }
};

const handleMaxPriceChange = (event) => {
  const inputValue = event.target.value;
  if (/^\d*$/.test(inputValue)) {
    // Only update if the input is a valid number or empty
    const maxPriceValue =
      inputValue === ""
        ? ""
        : Math.max(priceRange[0], Number(inputValue));
    setPriceRange([priceRange[0], maxPriceValue]);
  }
};


  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Reset price range to initial values
  const handleResetPriceRange = () => {
    setPriceRange(initialPriceRange); // Reset to the initial price range
  };

  const convertedCategorySlug = (title) => {
    return title
      .trim() // Remove leading and trailing spaces
      .replace(/[\s_-]+/g, " "); // Replace spaces and underscores with hyphens
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Price Range Inputs */}
        <Grid item xs={12} sm={4} display="flex" gap={2} alignItems="center">
          <TextField
            label="Min Price"
            type="text"
            size="small"
            color="warning"
            value={
              Array.isArray(priceRange) && priceRange[0] !== undefined
                ? priceRange[0]
                : ""
            }
            onChange={handleMinPriceChange}
            sx={{ width: "100%" }}
          />
          <TextField
            label="Max Price"
            type="text"
            size="small"
            color="warning"
            value={
              Array.isArray(priceRange) && priceRange[1] !== undefined
                ? priceRange[1]
                : ""
            }
            onChange={handleMaxPriceChange}
            sx={{ width: "100%" }}
          />

          {/* Reset Button */}
          <Button
            variant="outlined"
            color="warning"
            onClick={handleResetPriceRange}
            sx={{ whiteSpace: "nowrap" }}
          >
            Reset
          </Button>
        </Grid>

        {/* Category Title */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ display: { xs: "none", md: "flex" } }}
          justifyContent="center"
        >
          <Typography
            variant="h5"
            sx={{
              textTransform: "capitalize",
              color: "#ff4b39",
              textAlign: "center",
              padding: 2,
              boxShadow: 3,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            {convertedCategorySlug(category)}
          </Typography>
        </Grid>

        {/* Sort by Price */}
        <Grid item xs={12} sm={4}>
          <FormControl sx={{ width: "100%" }} size="small" color="warning">
            <InputLabel id="sort-order-label">Sort by Price</InputLabel>
            <Select
              labelId="sort-order-label"
              value={sortOrder}
              onChange={handleSortOrderChange}
              label="Sort by Price"
            >
              <MenuItem value="asc">Low to High</MenuItem>
              <MenuItem value="desc">High to Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
