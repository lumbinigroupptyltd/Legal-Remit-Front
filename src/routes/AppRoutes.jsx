import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import ScrollToTop from "../utils/ScrollToTop";
import Spinner from "../components/spinner/Spinner";
import { useSelector } from "react-redux";

// Lazy-loaded components
const Dashboard = React.lazy(() => import("../screens/Dashbord/Dashbord"));
const AppLayout = React.lazy(() => import("../Layout/AppLayout"));
const DashboardLayout = React.lazy(() => import("../Layout/DashboardLayout"));
const NewProfilePage = React.lazy(() =>
  import("../screens/ProfilePage/NewProfilePage")
);
const NewSignUpPage = React.lazy(() =>
  import("../screens/Auth/SignupNew/newSignUp/NewSignUpPage")
);
const Home = React.lazy(() => import("../screens/Home/Home"));
const Maintanance = React.lazy(() => import("../screens/Pages/Maintanance"));
const NewLoginPage = React.lazy(() =>
  import("../screens/Auth/Login/NewLoginPage/NewLoginPage")
);
const ForgotPassword = React.lazy(() =>
  import("../screens/Auth/Login/ForgotPassword/ForgotPassword")
);
const VerifyEmailPage = React.lazy(() =>
  import("../screens/Auth/VerifyEmailPage")
);
const Page404 = React.lazy(() => import("../screens/Auth/Page404"));
const Page403 = React.lazy(() => import("../screens/Auth/Page403"));
const Page500 = React.lazy(() => import("../screens/Auth/Page500"));
const Page503 = React.lazy(() => import("../screens/Auth/Page503"));
const DynamicCMSPage = React.lazy(() => import("../screens/DynamicCMSPage/DynamicCMSPage"));
const Registration = React.lazy(() => import("../screens/Auth/Registration"));
const Lockscreen = React.lazy(() => import("../screens/Auth/Lockscreen"));
const AboutUsPage = React.lazy(() =>
  import("../screens/AboutUsPage/AboutUsPage")
);
const ContactUsPage = React.lazy(() =>
  import("../screens/ContactUsPage/ContactUsPage")
);
const UserDashboard = React.lazy(() =>
  import("../screens/Dashbord/UserDashboard")
);
import { DashboardRoutes } from "./DashboardRoutes";
import { UserRoutes } from "./UserRoutes";
import UserLayout from "../Layout/UserLayout";

const AppRoutes = () => {
  const { role, verified } = useSelector((state) => state.auth);
const kycStatus = "REJECTED";
// const kycStatus = "PENDING";
// const kycStatus = "REJECTED";
  return (
    <HashRouter hashType="slash">
      <ScrollToTop>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route exact path="/" element={<AppLayout />}>
              <Route exact index element={<Home />} />
              <Route exact path="login" element={<NewLoginPage />} />
              <Route exact path="signup" element={<NewSignUpPage />} />
              <Route exact path="maintanance" element={<Maintanance />} />
              <Route exact path="forgotpassword" element={<ForgotPassword />} />
              <Route exact path="verifyemail" element={<VerifyEmailPage />} />
              <Route exact path="page404" element={<Page404 />} />
              <Route exact path="page403" element={<Page403 />} />
              <Route exact path="page500" element={<Page500 />} />
              <Route exact path="page503" element={<Page503 />} />
              <Route exact path="/:id" element={<DynamicCMSPage />} />

              <Route
                path="/sendmoney"
                element={
                  verified ? (
                    <Navigate to="/sendmoney" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/chat"
                element={
                  verified ? <Navigate to="/chat" /> : <Navigate to="/login" />
                }
              />
              <Route exact path="about-us" element={<AboutUsPage />} />
              <Route exact path="contact-us" element={<ContactUsPage />} />
              <Route exact path="registration" element={<Registration />} />
              <Route exact path="lockscreen" element={<Lockscreen />} />
            </Route>
            {role === "ADMIN" && (
              <Route exact path="/dashboard" element={<DashboardLayout />}>
                <Route exact index element={<Dashboard />} />
                {DashboardRoutes?.map((route) => {
                  return (
                    <Route
                      index
                      key={route?.id}
                      path={route?.path}
                      exact
                      element={route?.component}
                    />
                  );
                })}
              </Route>
            )}
            {(kycStatus === "REJECTED") && (role === "USER" || role === "BUSINESS") && (
              <Route exact path="/profile" element={<NewProfilePage />} />
            )}
            {(kycStatus === "PENDING" || kycStatus === "VERIFIED") && (role === "USER" || role === "BUSINESS") && (
              <Route exact path="/home" element={<UserLayout />}>
                <Route exact index element={<UserDashboard />} />
                 {UserRoutes?.map((route) => {
                  return (
                    <Route
                      index
                      key={route?.id}
                      path={route?.path}
                      exact
                      element={route?.component}
                    />
                  );
                })}
              </Route>
            )}
          </Routes>
        </Suspense>
      </ScrollToTop>
    </HashRouter>
  );
};

export default AppRoutes;
