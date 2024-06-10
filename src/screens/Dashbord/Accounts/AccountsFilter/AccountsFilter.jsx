import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import "./AccountsFilter.css";
import GetAppIcon from "@mui/icons-material/GetApp"; // Import the export icon

const AccountsFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOpenDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const handleSelectAll = () => {
    if (!selectAllChecked) {
      const options = [
        "Unconfirmed Transactions",
        "Confirmed Transactions",
        "Pending Transactions",
        "Call History and Chat history",
      ];
      setSelectedOptions(options);
    } else {
      setSelectedOptions([]);
    }
    setSelectAllChecked(!selectAllChecked);
  };

  const handleOptionChange = (option) => {
    const newSelectedOptions = [...selectedOptions];
    const index = newSelectedOptions.indexOf(option);
    if (index > -1) {
      newSelectedOptions.splice(index, 1);
    } else {
      newSelectedOptions.push(option);
    }
    setSelectedOptions(newSelectedOptions);
    setSelectAllChecked(newSelectedOptions.length === 3);
  };

  const handleOK = () => {
    // Perform actions or handle the selected options here
    handleCloseDropdown();
  };

  const handleCancel = () => {
    // Reset the selected options and close the dropdown
    setSelectedOptions([]);
    setSelectAllChecked(false);
    handleCloseDropdown();
  };

  const renderOptions = () => {
    const options = [
      "Unconfirmed Transactions",
      "Confirmed Transactions",
      "Pending Transactions",
      "Call History and Chat history",
    ];
    return options.map((option, index) => (
      <MenuItem key={index}>
        <FormControlLabel
          control={
            <Checkbox
              name="options[]"
              className="option justone"
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
              style={{ color: "black" }}
            />
          }
          label={
            <div
              style={{ color: "#ff0000 !important" }}
              className="option-label"
            >
              {option}
            </div>
          }
        />
      </MenuItem>
    ));
  };

  const getTotalSelected = () => {
    const total = selectedOptions.length;
    return total > 0 ? `(${total}) ` : "(0)";
  };

  const getSelectText = () => {
    return selectedOptions.length === 3 ? "Reset" : " Select All";
  };

  return (
    <div className="dropdown">
      <Button
        variant="outlined"
        color="primary"
        className="m-0"
        onClick={handleOpenDropdown}
        // onClick={handleExport}// Set your desired background color here
        // Icon displayed before the text
      >
        <i className="fa fa-filter" />
      </Button>

      {/* <Button
        variant="outlined"
        className=""
        onClick={handleOpenDropdown}
      >
        <div className="dropdown-text">
          <i className="fa fa-filter" />
        </div>
      </Button> */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        className="mt-2"
        onClose={handleCloseDropdown}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                className="selectall"
                checked={selectAllChecked}
                onChange={handleSelectAll}
              />
            }
            label={<div className="select-text">{getSelectText()}</div>}
          />
        </MenuItem>
        <Divider />
        {renderOptions()}
        <Divider />
        <MenuItem className="d-flex justify-content-end">
          <Button
            variant="contained"
            className="m-0 me-2 px-2 p-0 col-lg-4 touch border-0"
            onClick={handleOK}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            className="m-0 p-0 px-2 bg-white text-black col-lg-4 border border-1"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AccountsFilter;
