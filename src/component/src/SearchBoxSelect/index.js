import { Box, Button, InputLabel, Menu, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import SELECT_CARET from "../assets/arrowDownLightGrey.svg";
import { ScrollBox, SearchMenuItem, StyledMenuItem } from "./style";
import React from "react";

import SearchBar from "../SearchInput/index";

const useStyles = makeStyles((theme) => ({
  DropDownButton: {
    margin: "50px 50px",
    fontSize: "1.125rem",
    width: "inherit",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "2px solid #007bff",
    borderRadius: "10px",
    backgroundColor: "white",
    cursor: "pointer",
    padding: "0px 20px",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  search: {
    position: "relative",
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    // padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputInput: {
    // padding: theme.spacing(1, 1, 1, 0),
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create("width"),
    width: "100%",
  },
  searchBarContainer: {
    minWidth: "inherit",
    display: "flex",
    justifyContent: "space-evenly",
    cursor: "default",
    "&.MuiListItem-button": {
      "&:hover": {
        backgroundColor: "white",
      },
    },
  },
  menuDivider: {
    margin: "0 20px",
  },
  dashboardSelectMenu: {
    "& .MuiPopover-paper": {
      minWidth: "inherit",
      maxWidth: "fit-content",
      borderRadius: "6px",
    },
  },
  externalLinkIcon: {
    borderLeft: "1px solid var(--color-gray-eighty-five)",
    padding: "10px 0px 10px 10px",
    color: "var(--color-primary)",
    cursor: "pointer",
  },
}));

function SearchBoxSelect({
  selectionList,
  placeholder,
  labelKey,
  valueKeys,
  value = null,
  onChange,
  autoFormat = false,
  name,
  isRequired,
  label = null,
  search = false,
  allowOther = false,
  handleOnOtherClick,
  otherButtonText,
  menuWidth,
  buttonWidth,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selection, setSelection] = useState(value);
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    let array = [];
    if (autoFormat) {
      array = selectionList.map((tag) => {
        let label = [];
        valueKeys.map((w) => {
          label.push(tag[w]);
        });
        return { value: tag[labelKey], label: label.join(" ") };
      });
    } else {
      array = [...selectionList];
    }
    setSelectOptions(array);
  }, [selectionList]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setSearchText("");
    setAnchorEl(null);
  };

  const handleSelect = (e) => {
    onChange(e);
    setSelection(e);
    setSearchText("");
    setAnchorEl(null);
  };

  return (
    <div>
      {label && (
        <InputLabel
          htmlFor={name}
          required={isRequired}
          className="inputfield-label"
        >
          {label}
        </InputLabel>
      )}
      <div
        id={name}
        onClick={handleMenuOpen}
        style={{
          cursor: "pointer",
          border: "1px solid #8e8d8d",
          padding: "10px",
          borderRadius: "6px",
          display: "flex",
          height: "38px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          {selection ? (
            <Typography> selection.label</Typography>
          ) : (
            <Typography color={"grey"}> {placeholder}</Typography>
          )}
        </Box>
        <Box>
          <img
            src={SELECT_CARET}
            alt=""
            style={{
              width: "14px",
              transition: "all .2s ease",
              transform: anchorEl ? "rotate(180deg)" : null,
            }}
          />
        </Box>
      </div>
      {renderDashboardMenu()}
    </div>
  );

  function renderDashboardMenu() {
    const displayOptions = selectOptions
      .map((item) => {
        if (item.label.toLowerCase().includes(searchText.toLowerCase())) {
          return item;
        }
        return undefined;
      })
      .filter((item) => item !== undefined);

    function renderOption(value) {
      if (selection?.value === value?.value) {
        return <div className={classes.checkedItem}>{value.label}</div>;
      }
      return value.label;
    }

    return (
      <Menu
        sx={{ p: 0 }}
        anchorEl={anchorEl}
        keepMounted={true}
        open={!!anchorEl}
        onClose={handleClose}
        className={classes.dashboardSelectMenu}
      >
        {search && (
          <SearchMenuItem
            className={classes.searchBarContainer}
            sx={{ px: 1 }}
            disableTouchRipple={true}
          >
            <div className={classes.search}>
              <SearchBar
                onClear={() => setSearchText("")}
                placeholder={"Search by keyword.."}
                isValid={true}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value.trim())}
              />
            </div>
          </SearchMenuItem>
        )}
        <ScrollBox sx={{ maxHeight: "200px" }}>
          {displayOptions.map((item, index) => {
            return (
              <div key={index}>
                <StyledMenuItem
                  sx={{
                    background:
                      selection?.value === item.value &&
                      `${"orange"} !important`,
                    color:
                      selection?.value === item.value && `white !important`,
                  }}
                  onClick={() => handleSelect(item)}
                >
                  {renderOption(item)}
                </StyledMenuItem>
              </div>
            );
          })}
        </ScrollBox>
      </Menu>
    );
  }
}

export default SearchBoxSelect;
