// components > Pagination.js

import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ currentPage, totalPages, setCurrentPage  }) => {
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <MuiPagination
      count={totalPages} 
      page={currentPage} 
      onChange={handlePageChange} 
      color="black"
      sx={{ marginTop: 4, display: "flex", justifyContent: "center" }}
    />
  );
};

export default Pagination;
