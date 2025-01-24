import React from "react";
import { Drawer, Box, IconButton } from "@mui/material";
import SearchBar from "./SearchBar";
import IconButtons from "./IconButtons";
import Logo from "./Logo";
import CloseIcon from "@mui/icons-material/Close";

const MobileMenu = ({ searchQuery, setSearchQuery, onClose, isOpen }) => (
  <Drawer
    anchor="right"
    open={isOpen}
    onClose={onClose}
    sx={{
      "& .MuiDrawer-paper": {
        backgroundColor: "#ffffff",
        padding: "5px 15px",
        width: "60%", // Adjust the width as needed
        paddingBottom: 3,
      },
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        justifyContent: { xs: "space-between", sm: "" },
        marginBottom: 1,
      }}
    >
      <Logo />
      <IconButton
        sx={{ display: { xs: "block", sm: "none" }, color: "#000" }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
    </Box>
    <Box sx={{ mb: 3 }}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={onClose}
      />
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <IconButtons closeDrawer={onClose} />
    </Box>
  </Drawer>
);

export default MobileMenu;
