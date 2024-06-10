import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import NavBar from "../screens/Home/Navbar/Navbar";
import Footer from "../screens/Home/Footer/Footer";
import { getUserToken } from "../utils/useHelper";
import ErrorBoundary from "./ErrorBoundary";
import NavBarTest from "../screens/Home/Navbar/NavBarTest";

const AppLayout = () => {
  // const authToken = getUserToken();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!authToken) {
  //     navigate("/");
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [authToken]);

  return (
    <>
      <ErrorBoundary>
        <div style={{ position: "relative", height: "100vh" }} className="mainLoginSection2">
          <NavBarTest />
          <section>
            <Outlet />
          </section>
          <Footer />
        </div>
      </ErrorBoundary>
    </>
  );
};

export default AppLayout;
