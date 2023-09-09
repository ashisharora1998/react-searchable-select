/** @format */

import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import Search from "../assets/search.svg";
import CrossIcon from "../assets/crossIcon.svg";

function SearchBar({
  value,
  onChange,
  placeholder,
  isValid,
  onClear,
  style,
  disabled = false,
}) {
  return (
    <Box>
      <TextField
        value={value}
        style={style}
        sx={{ width: "100%" }}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        isValid={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {value === "" ? (
                <img src={Search} alt="search" />
              ) : (
                <IconButton onClick={onClear} sx={{ p: "8px 0" }}>
                  <img src={CrossIcon} alt="clear" />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchBar;
