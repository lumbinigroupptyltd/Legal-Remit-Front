import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Footer from "../screens/Home/Footer/Footer";
import ErrorBoundary from "./ErrorBoundary";
import UserNavbar from "../screens/Home/Navbar/UserNavbar";

const UserLayout = () => {

  return (
    <>
    <ErrorBoundary>
        <div style={{ position: "relative", height: "100vh" }} className="mainLoginSection2">
          <UserNavbar />
          <section>
            <Outlet />
          </section>
        </div>
    </ErrorBoundary>
    </>
  );
};

export default UserLayout;
