import { Button } from "@mui/material";
import React from "react";

export const CButton = ({
  buttonName,
  OnClick,
  BGColor,
  BGHover,
  TextColor,
  TextColorHover,
  Border,
  disabled,
  variant,
  Width,
  margin,
  BorderRadius,
}) => {
  return (
    <>
      <Button
        variant={variant ? variant : "contained"}
        mt={2}
        onClick={OnClick ? OnClick : ""}
        // fullWidth={fullWidth ? fullWidth : "" }
        sx={{
          background: BGColor ? BGColor : "",
          color: TextColor ? TextColor : "#fff",
          border: Border ? Border : "",
          borderRadius: BorderRadius ? BorderRadius : "",
          margin: margin ? margin : "",
          width: Width? Width : "",
          textTransform: "none",
          "&:hover": {
            background: BGHover ? BGHover : "",
            color: TextColorHover ? TextColorHover : "",
          },
        }}
        disabled={disabled ? disabled : false}
      >
        {buttonName}
      </Button>
    </>
  );
};
