// components/CategorySearch.jsx
"use client";

import React from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const CategorySearch = ({ query, setQuery }) => {
  return (
    <Box sx={{ width: "100%", maxWidth: 400, mx: "auto", mb: 4, mt: 6 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: 0,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton onClick={() => setQuery("")}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CategorySearch;
