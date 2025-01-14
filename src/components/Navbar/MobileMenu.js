import React from "react";
import { Box } from "@mui/material";
import SearchBar from "./SearchBar";
import IconButtons from "./IconButtons";

const MobileMenu = ({ searchQuery, setSearchQuery, onClose }) => (
  <Box
    sx={{
      display: { xs: "flex", sm: "none" },
      flexDirection: "column",
      backgroundColor: "#ff6f61",
      padding: 2,
    }}
  >
    <Box sx={{ mb: 2 }}>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={onClose} />
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <IconButtons closeDrawer={onClose}/>
    </Box>
  </Box>
);

export default MobileMenu;
