import React, { useEffect, useState } from "react";
import { Menu as MenuIcon, MenuOpen } from "@mui/icons-material";
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  useTheme,
  List,
  ListItem,
  Button,
  styled,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logo from "../../../assets/images/Logo-LR.png";
import { useNavigate } from "react-router";
import ResponsiveNavMenu from "./ResponsiveMenu";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import { styled } from '@mui/material/styles';


import  Box  from "@mui/material/Box";
import { CButton } from "../../../components/UIElements/CButton";
import { isAuthenticated } from "../../../utils/useHelper";

export const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const navItems = [
  {
    id: 1,
    item: "Send Money",
    path: "/send-money",
  },
  {
    id: 2,
    item: "Book Flight",
    path: "https://flylumbini.com",
  },
  {
    id: 3,
    item: "About Us",
    path: "/about-us",
  },
  {
    id: 4,
    item: "Contact Us",
    path: "/contact-us",
  },
  {
    id: 5,
    item: "Chat",
    path: "/chat-with-us",
  },
  {
    id: 6,
    item: "Login",
    path: "/login",
  },
];

const NavBarTest = () => {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scriptValue, setScriptValue] = useState({ companyInfo: "" });
  const navigate = useNavigate();
  const isAuthTrue = isAuthenticated();

  const themeMode = useSelector((state) => state.theme?.mode);
  const { pathname = "" } = useLocation();
  const [submenuAnchors, setSubmenuAnchors] = useState({});
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (isNavigating) {
      setSubmenuAnchors({});
      setIsMenuOpen(false);
      setIsNavigating(false);
    }
  }, [isNavigating]);
  const handleDropdownToggle = (event, itemId) => {
    if (submenuAnchors[itemId]) {
      setSubmenuAnchors((prevAnchors) => ({ ...prevAnchors, [itemId]: null }));
    } else {
      setSubmenuAnchors((prevAnchors) => ({
        ...prevAnchors,
        [itemId]: event.currentTarget,
      }));
    }
  };

  const handleActiveClick = (path, child) => {
    if (!child) {
      setIsNavigating(true);
      if (path && path.startsWith("http" || "https")) {
        window.open(path, "_blank");
      } else if ((path === "/send-money" || path === "/chat-with-us") && !isAuthTrue) {
        navigate("/login");
      } else {
        navigate(path);
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((val) => !val);
  };

  const symbols = [];
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getBackgroundColor = () => {
    return scrollPosition > window.innerHeight * 0.05
      ? theme.palette.surface.light
      : "#f1f5f8";
  };

  return (
    <AppBar
      style={{
        position: "sticky",
        top: 0,
        boxShadow: "none",
        background: getBackgroundColor(),
        color: "black",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: {
            xl: "0.5rem 6rem",
            lg: "0.5rem 5rem",
            md: "0.5rem 4rem",
            sm: "0.5rem 2rem",
            xs: "0.5rem 1rem",
          },
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <FlexBetween>
            {navItems.map((items) => (
              <List
                key={items?.id}
                sx={{
                  position: "relative",
                  display: { sm: "none", md: "block", xs: "none" },
                }}
              >
                <ListItem>
                  <div style={{ display: "flex" }}>
                    <List
                      onClick={(event) => {
                        handleDropdownToggle(event, items.id);
                        handleActiveClick(items?.path, items?.subLinks);
                      }}
                      sx={{
                        cursor: "pointer",
                        color:
                          pathname.startsWith(items.path) ||
                          (items.subLinks &&
                            items.subLinks.some((subLink) =>
                              pathname.startsWith(subLink.path)
                            ))
                            ? theme.palette.text.main
                            : theme.palette.text.main,
                        fontWeight:
                          pathname.startsWith(items.path) ||
                          (items.subLinks &&
                            items.subLinks.some((subLink) =>
                              pathname.startsWith(subLink.path)
                            ))
                            ? "700"
                            : "500",
                        "&:hover": {
                          transform: "scale(1.2)",
                          // transition: "transform 0.2s ease-in-out",
                          fontWeight: "bold",
                        },
                        "&:before": {
                          content: '""',
                          position: "absolute",
                          bottom: "10%",
                          left: "0%",
                          width: "70%",
                          height: "2px",
                          backgroundColor:
                            pathname.startsWith(items.path) ||
                            (items.subLinks &&
                              items.subLinks.some((subLink) =>
                                pathname.startsWith(subLink.path)
                              ))
                              ? "purple"
                              : "transparent",
                        },
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="p"
                        color={
                          theme?.palette?.mode === "light" ? "black" : "#ffff"
                        }
                      >
                        {items?.item}
                      </Typography>

                      {items?.subLinks && (
                        <KeyboardArrowDownIcon
                          sx={{
                            color: theme.palette.primary.alt,
                            marginLeft: "0.1rem",
                          }}
                        />
                      )}
                    </List>
                  </div>
                </ListItem>
              </List>
            ))}

            <CButton
              buttonName={"Sign Up"}
              variant={"contained"}
              fullWidth={"fullWidth"}
              Width={"fit-content"}
              BorderRadius={"24px"}
              BGColor={theme.palette.button.primary}
              BGHover={`${theme.palette.hover.primary}`}
              OnClick={() => navigate("/signup")}
            />
          </FlexBetween>

          <FlexBetween gap="12px">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMenu}
              sx={{
                display: { sm: "block", md: "none", xs: "block" },
                color: themeMode === "dark" ? "#fff" : "#0000008a",
              }}
            >
              {isMenuOpen ? (
                <MenuOpen sx={{ fontSize: "25px" }} />
              ) : (
                <MenuIcon sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
          </FlexBetween>
        </div>
      </Toolbar>

      <ResponsiveNavMenu
        isMenuOpen={isMenuOpen}
        navItem={navItems}
        handleActiveClick={(id, path) => handleActiveClick(id, path)}
        handleToggle={(val) => setIsMenuOpen(val)}
        symbols={symbols}
        scriptValue={scriptValue}
        handelScriptChange={(val) => setScriptValue(val)}
      />
    </AppBar>
  );
};

export default NavBarTest;
