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
  return (
    <>
      <ErrorBoundary>
        <div
          style={{ position: "relative", height: "100vh" }}
          className="mainLoginSection2"
        >
          <UserNavbar />
          <section style={{overflow: "scroll"}}>
            <Outlet />
          </section>
        </div>
      </ErrorBoundary>
    </>
  );
};

export default UserLayout;
