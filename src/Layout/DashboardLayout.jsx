import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  Tab,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo-LR.png";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DashboardSidebar from "./DashboardSidebar";
import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../utils/logout";
import userProfile from "../assets/images/userProfile.png";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("md", "sm"));

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const [values, setValues] = React.useState("dashboard");

  const handleChanges = (event, newValue) => {
    setValues(newValue);
    navigate(newValue);
    setOpenDrawer(false);
    window.scrollTo(0, 0);
  };

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <div style={{ backgroundColor: "#F4F7F6", height: "100vh" }}>
      <Box sx={{ background: "#ffff"}}>
        <Container
          // maxWidth="xl"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "70px",
            // padding: ".5rem",
          }}
        >
          {isXsScreen && (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setOpenDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          )}

          <div style={{ width: "120px" }}>
            <img
              src={logo}
              alt="Legal Remit Logo"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <Button variant="outlined" onClick={handleLogout}>Logout</Button>
        </Container>
      </Box>
      <Box>
        <TabContext value={values}>
          <Grid container spacing={2} sx={{ minHeight: "90vh", padding: "1.2rem 0 0 0rem", }}>
            {!isXsScreen && (
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#ffff",
                  height: "100vh",
                  // padding: "1.2rem 0 0 2rem",
                }}
              >
                <Grid sx={{display: "flex", alignItems: "center", marginLeft: "1rem", gap: "0.6rem", marginY: "1.2rem"}}>
                  <img width={40} src={userProfile} alt="admin-logo" />
                  <Typography variant="h5">Welcome</Typography>
                </Grid>
                <Grid>
                  <DashboardSidebar
                    values={values}
                    handleChanges={handleChanges}
                  />
                </Grid>
              </Grid>
            )}
            <Grid item xs={isXsScreen ? 12 : 10}>
              <Outlet />
            </Grid>
          </Grid>
        </TabContext>
      </Box>

      {isXsScreen && (
        <Drawer
          open={openDrawer}
          anchor={"left"}
          onClose={() => setOpenDrawer(false)}
          PaperProps={{
            sx: { width: "320px" },
          }}

        >
          <Grid sx={{display: "flex", alignItems: "center", marginLeft: "1rem", gap: "0.6rem", margin: "1rem 2rem"}}>
                  <img width={40} src={userProfile} alt="admin-logo" />
                  <Typography variant="h5">Welcome</Typography>
                </Grid>
          <DashboardSidebar values={values} handleChanges={handleChanges} />
        </Drawer>
      )}
      <style>
        {`
      .css-13xfq8m-MuiTabPanel-root {
        padding: 6px;
      }
      .css-7g4p3t-MuiGrid-root>.MuiGrid-item {
        padding: 0;
      }
      `}
      </style>
    </div>
  );
};

export default DashboardLayout;
