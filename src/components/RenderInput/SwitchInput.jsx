import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { FormLabel, useTheme } from "@mui/material";
import { styled } from '@mui/system';

export const ThemeSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: "1px",
    transitionDuration: "300ms",
    // "&.Mui-checked": {
    //   transform: "translateX(16px)",
    //   color: "#64B5F6",
    //   backgroundColor: theme.palette.mode === "dark" ? "#BBDEFB" : "#1976D233",
    //   "& + .MuiSwitch-track": {
    //     backgroundColor:
    //       theme.palette.mode === "dark" ? "#BBDEFB" : "#1976D233",
    //     border: 0,
    //   },
    // },

    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.4,
      backgroundColor: "#c7c7c77a",
    },
  },
  // "& .MuiSwitch-thumb": {
  //   boxSizing: "border-box",
  //   width: 20,
  //   height: 20,
  //   backgroundColor: theme.palette.mode === "dark" ? "#64B5F6" : "#64B5F6",
  // },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    // transition: theme.transitions.create(["background-color"], {
    //   duration: 500,
    // }),
  },
}));

export default function CustomizedSwitches({
  id,
  name,
  checked,
  label,
  onChange,
  formLabel,
  trueLabel,
  falseLabel,
  multiLabelEnable,
  isDisabled,
}) {
  const [checkedState, setCheckedState] = React.useState(false);

  React.useEffect(() => {
    setCheckedState(checked);
  }, [checked]);

  const getLabel = () => {
    if (multiLabelEnable) {
      return checkedState ? trueLabel : falseLabel;
    } else {
      return label;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginLeft: "8px",
      }}
    >
      {formLabel && <FormLabel>{formLabel}</FormLabel>}
      <FormControlLabel
        label={getLabel()}
        control={
          <ThemeSwitch
            sx={{ m: 1 }}
            name={name}
            id={id}
            checked={checkedState}
            onChange={onChange}
            disabled={isDisabled ? isDisabled : false}
          />
        }
      />
    </div>
  );
}
