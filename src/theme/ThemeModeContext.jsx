import { ThemeProvider, responsiveFontSizes } from "@mui/material";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
 import {createTheme} from "@mui/material";

export const ThemeModeContext = createContext({
  toggleMode: () => {},
  mode: "light",
  isMobile: false,
  toggleMobile: () => {},
  palette: {}, // Empty palette initially
});

// Define getPalette outside the ThemeContextProvider
const getPalette = (mode) => {
  const palette = {
    primary: {
      main: "#aa2ae1",
      light: "#F7EAFC",
      dark: "#7bb338",
      holiday: "#FF8A7B",
    },
    border: {
      main: "#aa2ae1"
    },
    secondary: {
      main: "#98D8F1",
      light: "#418fdd",
      dark: "#336cb8",
    },
    background: {
      main: "#aa2ae1",
      default: "#f8f8f8",
      light: "#e7e7e7",
      paper: "#fff",
      imageCaption: "#616161",
      tabbg: "#E8F5E9",
      activetabBg: "#C8E6C9",
      event: "#D5FFCB",
      holiday: "#FFEDEA",
      toDo: "#F2F4F4",
      error: "red",
      modal: "#4aa14e", // title modal
      header: "#4aa191", // title modal
    },
    text: {
      primary: "#000000",
      dark: "#222222",
      secondary: "#616161",
      white: "#000",
      tableHead: "#25262E",
      error: "#930a0a",
      light: "#aa2ae1"
    },
    button: {
      primary: "#aa2ae1",
      secondary: "#38b6ff",
      error: "#930a0a",
    },
    hover: {
      primary: "#9925CA",
      secondary: "#32A3E5",
      error: "#930a0a",
    },
    boxShadow: {
      default: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    },
    surface: {
      neutral: "rgba(225, 233, 238, 1)",
      light: "#eef1f4",
    },
    divider: "rgba(0,0,0,0.12)",
  };

  // Adjust palette based on mode
  if (mode === "dark") {
    // Modify palette for dark mode
  }

  return palette;
};

export const ThemeContextProvider = ({ children }) => {
  const storedMode = localStorage.getItem("mode") || "light";
  const [mode, setMode] = useState(storedMode);
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= 768);

  const handleWindowSizeChange = useCallback(() => {
    setWidth(window.innerWidth);
    setIsMobile(width <= 768);
  }, [width]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, [handleWindowSizeChange]);

  const colorMode = useMemo(() => ({
    isMobile,
    palette: getPalette(mode),
  }), [isMobile, mode]);

  let theme = createTheme({
    palette: getPalette(mode),
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeContext;
