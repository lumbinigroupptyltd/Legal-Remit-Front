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
import { nanoid } from "nanoid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import logo from "../../../assets/images/Logo-LR.png";
import { useNavigate } from "react-router";
import ResponsiveNavMenu from "./ResponsiveMenu";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import { styled } from '@mui/material/styles';

import Box from "@mui/material/Box";
import { isAuthenticated } from "../../../utils/useHelper";
import { logout } from "../../../utils/logout";

export const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const navItems = [
  {
    id: nanoid(),
    item: "Home",
    path: "/home/dashboard",
  },
  {
    id: nanoid(),
    item: "Send Money",
    path: "/home/sendmoney",
  },
  {
    id: nanoid(),
    item: "Book a Flight",
    path: "https://flylumbini.com",
  },
  {
    id: nanoid(),
    item: "About Us",
    path: "/home/about-us",
  },
  {
    id: nanoid(),
    item: "Contact Us",
    path: "/home/contact-us",
  },
  {
    id: nanoid(),
    item: "Transactions",
    path: "/home/transaction",
  },
  {
    id: nanoid(),
    item: "Chat",
    path: "/home/chats",
  },
];

const UserNavbar = () => {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthTrue = isAuthenticated();
  const themeMode = useSelector((state) => state.theme?.mode);
  const { pathname = "" } = useLocation();
  const [submenuAnchors, setSubmenuAnchors] = useState({});
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {

  }, [isAuthTrue]);
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

  const handleLogout = () => {
    navigate("/");
    logout();
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
          onClick={() => navigate("/home")}
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

            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                ":hover": {
                  backgroundColor: theme.palette.hover.primary,
                  color: "#fff",
                },
              }}
            >
              Logout
            </Button>
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
      />
    </AppBar>
  );
};

export default UserNavbar;
