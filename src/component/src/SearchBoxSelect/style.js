import styled from "@emotion/styled";
import { Box, MenuItem } from "@mui/material";

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    fontFamily: "Lato",
    fontSize: "15px",
    fontWeight: 400,
    lineHeight: "22px",
    letterSpacing: "0px",
    textAlign: "left",
    padding: "8px 16px 8px 16px",
    borderRadius: "6px",
    gap: "8px",
    margin: "2px 5px",
  },
  // "&.MuiButtonBase-root:hover": {
  //   background: "orange",
  //   color: "white",
  // },
}));

export const SearchMenuItem = styled(MenuItem)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    background: "transparent",
  },
  "&.MuiButtonBase-root:hover": {
    background: "transparent",
  },
}));

export const ScrollBox = styled(Box)(({ theme }) => ({
  "&.MuiBox-root": {
    overflowY: "auto",
    scrollbarColor: "grey",
    scrollbarWidth: "thin",
  },
  "&.MuiBox-root::-webkit-scrollbar": {
    width: "3px !important",
    borderRadius: "5px",
  },
  "&.MuiBox-root::-webkit-scrollbar-track": {
    background: "transparent",
  },
  "&.MuiBox-root::-webkit-scrollbar-thumb": {
    background: "#888 !important",
  },
}));
