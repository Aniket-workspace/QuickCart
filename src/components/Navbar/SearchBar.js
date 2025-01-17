import React, { useState, useEffect } from "react";
import {
  InputBase,
  IconButton,
  Box,
  List,
  Typography,
  ListItemButton,
  ListItem,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { searchProduct } from "../../pages/api/all-api"; // Adjust the path if needed
import debounce from "lodash.debounce";
import Link from "next/link";
import { useTitleToSlug } from "@/customHooks/useTitleToSlug";

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions
  const fetchSuggestions = debounce(async (query) => {
    if (query) {
      const results = await searchProduct(query);
      setSuggestions(results.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    fetchSuggestions(searchQuery);
    return fetchSuggestions.cancel;
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?q=${searchQuery}`);
    }
    setSuggestions([]);
    if (onSearch) {
      onSearch(searchQuery);
    }
    setSearchQuery("");
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", alignItems: "center", width: "100%" }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color: "white",
            border: "1px solid white",
            borderRadius: "4px",
            padding: "0 8px",
          }}
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: 1, color: "white" }}>
          <SearchIcon />
        </IconButton>
      </form>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <List
          sx={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            backgroundColor: "#fff",
            boxShadow: 1,
            zIndex: 10,
            borderRadius: "4px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((product) => {
            const slug = useTitleToSlug(product.title);

            return (
              <Link href={`/products/${product.id}/${slug}`} key={product.id}>
                <ListItem>
                  {" "}
                  <ListItemButton
                    onClick={() => setSuggestions([])}
                    sx={{
                      display: "flex",
                      alignItems: "start",

                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <img src={product.images[0]} width={50} />
                    <Tooltip title={product.title} arrow>
                      <Box sx={{ overflow: "hidden" }}>
                        <Typography
                          variant="body2"
                          color="#312a29"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {product.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ${product.price}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default SearchBar;
