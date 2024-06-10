import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Footer from "../screens/Home/Footer/Footer";
import ErrorBoundary from "./ErrorBoundary";
import UserNavbar from "../screens/Home/Navbar/UserNavbar";
import { Button, Grid } from "@mui/material";
import { logout } from "../utils/logout";
import logo from "../assets/images/Logo-LR.png";
import { useSelector } from "react-redux";
import PendingStatusComp from "./PendingStatusComp";

const UserLayout = () => {
  // const { kycStatus } = useSelector((state) => state.auth);
const kycStatus = "REJECTED";

  const handleLogout = () => {
    navigate("/");
    logout();
  };

  return (
    <>
      {kycStatus === "PENDING" && (
        <>
          <Grid
            container
            mt={2}
            mb={5}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Grid>
              <img width={120} src={logo} alt="logo" />
            </Grid>
            <Grid></Grid>
            <Grid>
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{margin: {lg: "6rem", md: "5rem", sm: "4rem", xs: "3rem"}}}>
            <PendingStatusComp />
          </Grid>
        </>
      )}
      {kycStatus === "VERIFIED" && (
        <>
          <ErrorBoundary>
            <div
              style={{ position: "relative", height: "100vh" }}
              className="mainLoginSection2"
            >
              <UserNavbar />
              <section>
                <Outlet />
              </section>
            </div>
          </ErrorBoundary>
        </>
      )}
    </>
  );
};

export default UserLayout;
