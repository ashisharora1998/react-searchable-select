import {
  Box,
  Button,
  Checkbox,
  Chip,
  InputLabel,
  Menu,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import SELECT_CARET from "../assets/arrowDownLightGrey.svg";
import { ScrollBox, SearchMenuItem, StyledMenuItem } from "./style";
import React from "react";
import PropTypes from "prop-types";
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

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].value === obj.value) {
      return true;
    }
  }

  return false;
}
function SearchBoxSelect(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selection, setSelection] = useState();
  const [selectOptions, setSelectOptions] = useState([]);
  const [multiSelection, setMultiSelection] = useState([]);

  useEffect(() => {
    let array = [];
    if (props.autoFormat) {
      array = props.selectionList.map((tag) => {
        let label = [];
        props.labelKeys.map((w) => {
          label.push(tag[w]);
        });
        return { value: tag[props.valueKey], label: label.join(" ") };
      });
    } else {
      array = [...props.selectionList];
    }
    setSelectOptions(array);
  }, [props.selectionList]);

  useEffect(() => {
    if (props.isMultiSelect) {
      setMultiSelection(props.value);
    } else {
      setSelection(props.value);
    }
  }, [props.selectionList]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setSearchText("");
    setAnchorEl(null);
  };

  const handleSelect = (e) => {
    props.onChange(e);
    setSelection(e);
    setSearchText("");
    setAnchorEl(null);
  };

  const handleMultiSelect = (e) => {
    let MultiSelection = [...multiSelection];
    if (MultiSelection.indexOf(e) > -1) {
      MultiSelection.splice(MultiSelection.indexOf(e), 1);
    } else {
      MultiSelection.push(e);
    }
    setMultiSelection(MultiSelection);
    props.onChange(MultiSelection);
  };

  const handleMultiSelectDelete = (e) => {
    let MultiSelection = [...multiSelection];
    MultiSelection.splice(MultiSelection.indexOf(e), 1);
    setMultiSelection(MultiSelection);
    props.onChange(MultiSelection);
  };

  return (
    <div>
      {props.label && (
        <InputLabel
          htmlFor={props.name}
          required={props.isRequired}
          className="select-box-label"
        >
          {props.label}
        </InputLabel>
      )}
      <div
        className="select-box"
        id={props.name}
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
        <div className="label-value-div">
          {selection ? (
            <Typography> {selection.label}</Typography>
          ) : (
            <Typography color={"grey"}> {props.placeholder}</Typography>
          )}
        </div>
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
      {props.isMultiSelect ? renderMultiSelectMenu() : renderSelectMenu()}
      <Box className="chip-group" sx={{ mt: 1 }}>
        {props.isMultiSelect && multiSelection.length && props.withChips > 0
          ? multiSelection.map((select, key) => (
              <Chip
                disabled={props.isDisabled}
                label={select.label}
                key={select.value}
                deleteIcon={props.chipDeleteIcon}
                onDelete={() => handleMultiSelectDelete(select)}
              />
            ))
          : null}
      </Box>
    </div>
  );
  function renderSelectMenu() {
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
        sx={{ p: 0, mt: 0.7 }}
        anchorEl={anchorEl}
        keepMounted={true}
        open={!!anchorEl}
        onClose={handleClose}
        className={classes.dashboardSelectMenu}
      >
        {props.isSearch && (
          <SearchMenuItem
            className={classes.searchBarContainer}
            sx={{ px: 1, mt: 0 }}
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
          {displayOptions.length > 0 ? (
            displayOptions.map((item, index) => {
              return (
                <div key={index}>
                  <StyledMenuItem
                    className="list-single-item"
                    sx={{
                      background:
                        selection?.value === item.value && `${"orange"}`,
                      color: selection?.value === item.value && `white`,
                    }}
                    onClick={() => handleSelect(item)}
                  >
                    {renderOption(item)}
                  </StyledMenuItem>
                </div>
              );
            })
          ) : (
            <div
              className="no-options-text"
              style={{ textAlign: "center", my: 1 }}
            >
              <Typography variant="hl_paragraphBold">No Options</Typography>
            </div>
          )}
        </ScrollBox>
      </Menu>
    );
  }

  function renderMultiSelectMenu() {
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
        sx={{ p: 0, mt: 0.7 }}
        anchorEl={anchorEl}
        keepMounted={true}
        open={!!anchorEl}
        onClose={handleClose}
        className={classes.dashboardSelectMenu}
        // anchorReference="anchorOrigin"
        // anchorPosition={{ top: 0, left: 0 }}
        // anchorOrigin={{
        //   vertical: "bottom",
        //   horizontal: "center",
        // }}
        // transformOrigin={{
        //   vertical: "top",
        //   horizontal: "center",
        // }}
      >
        <SearchMenuItem
          className={classes.searchBarContainer}
          sx={{ px: 1, mt: 0 }}
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
        <ScrollBox sx={{ maxHeight: "200px" }}>
          {displayOptions.length > 0 ? (
            displayOptions.map((item, index) => {
              return (
                <div key={index}>
                  {!containsObject(item, multiSelection) && (
                    <StyledMenuItem onClick={() => handleMultiSelect(item)}>
                      {props.withCheckBox && (
                        <Checkbox
                          sx={{ padding: 0 }}
                          checked={multiSelection.indexOf(item) > -1}
                        />
                      )}
                      {renderOption(item)}
                    </StyledMenuItem>
                  )}
                </div>
              );
            })
          ) : (
            <Box>
              <Typography variant="paragraph">No Options</Typography>
            </Box>
          )}
        </ScrollBox>
      </Menu>
    );
  }
}
SearchBoxSelect.propTypes = {
  selectionList: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  labelKey: PropTypes.array,
  valueKeys: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  autoFormat: PropTypes.bool,
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  isSearch: PropTypes.bool,
  isMultiSelect: PropTypes.bool,
  withCheckBox: PropTypes.bool,
  withChips: PropTypes.bool,
  isDisabled: PropTypes.bool,
  chipDeleteIcon: PropTypes.string,
};

export default SearchBoxSelect;
