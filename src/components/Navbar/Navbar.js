import React, { useState } from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import IconButtons from "./IconButtons";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#ff6f61", boxShadow: 2 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: { xs: "0 16px", sm: "0 32px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: { xs: "space-between", sm: "" },
          }}
        >
          <Logo onClick={isMobileMenuOpen ? toggleMobileMenu : undefined} />
          <IconButton
            sx={{ display: { xs: "block", sm: "none" }, color: "white" }}
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            width: "50%",
            justifyContent: "center",
          }}
        >
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}>
          <IconButtons toggle={toggleMobileMenu} />
        </Box>
      </Toolbar>
      {isMobileMenuOpen && (
        <MobileMenu
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={closeMobileMenu}
          isOpen={isMobileMenuOpen}
        />
      )}
    </AppBar>
  );
};

export default Navbar;
