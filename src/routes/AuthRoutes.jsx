import React from "react";
import { Route } from "react-router-dom";
import Registration from "../screens/Auth/Registration";
import NewSignUpPage from "../screens/Auth/SignupNew/newSignUp/NewSignUpPage";
import NewLoginPage from "../screens/Auth/Login/NewLoginPage/NewLoginPage";
import ForgotPassword from "../screens/Auth/Login/ForgotPassword/ForgotPassword";
import ResetPassword from "../screens/Auth/Login/ForgotPassword/ForgotPasswordPages/Resetpassword";

const AuthRoutes = () => (
  <>
    {/* <Route exact path="/registration" component={Registration} /> */}
    {/* <Route exact path="/forgotpassword" component={ForgotPassword} /> */}
    {/* <Route exact path="/resetpassword" component={ResetPassword} /> */}
    <Route exact path="/signup" component={NewSignUpPage} />
    <Route exact path="/login" component={NewLoginPage} />
  </>
);

export default AuthRoutes;
