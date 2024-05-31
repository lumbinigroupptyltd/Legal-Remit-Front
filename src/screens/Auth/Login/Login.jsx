import React, { useEffect, useState } from "react";
import Footer from "../../Home/Footer/Footer";
import NavBar from "../../Home/Navbar/Navbar";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import LoginAvatar from "../../../assets/images/LoginAvatar.svg";
import ReCAPTCHA from "react-google-recaptcha";
import { CommonConstants } from "../../../Constants/common.constants";
import axios from "axios";
import "./Login.css";
import "../../../assets/assets/scss/pages/Login.scss";

import Loader from "../../Loader/Loader";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import $ from "jquery";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Login({ children, props }) {
  // const validator = require("../../../assets/js/validator");

  const navigate = useNavigate();

  const [UnameValue, setUnameValue] = useState();

  // const { setUserNameDrp } = useContext(userContext);
  const [loadervalue, setloadervalue] = useState(false);
  const [callNotification, setcallNotification] = useState(false);

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission behavior
      onSubmit();
    }
  };

  useEffect(() => {
    // setUserNameDrp(UnameValue)
  }, [loadervalue]);

  const handleSignUp = () => {
    // navigate('/signup', {replace: true})
    window.scrollTo(0, 0);
    navigate("/signup");
  };

  const [Successhandle, setSuccesshandle] = useState(null);
  const [Errorhandle, setErrorhandle] = useState(null);
  const [popupsetup, setpopupsetup] = useState(false);
  const [ShowPassword, setShowPassword] = useState(false);
  const [RecaptchaErrorhandle, setRecaptchaErrorhandle] = useState(false);
  const [signinData, setsigninData] = useState(false);
  const [ChangePasswordAdmin, setChangePasswordAdmin] = useState(false);
  const [showSuccess, setshowSuccess] = useState(false);
  const [adminShowSuccess, setAdminShowSuccess] = useState(false);

  const [showError, setshowError] = useState(false);

  const [isSignupCompleted, setIsSignupCompleted] = useState({
    error: "",
    showPopup: false,
  });

  const setSignupCompleteData = (errorMessage, showPopup = false) => {
    setIsSignupCompleted((prevState) => ({
      ...prevState,
      error: errorMessage,
      showPopup: showPopup,
    }));
  };

  const handleGoToProfile = () => {
    setSignupCompleteData("");
    navigate("/profile");
  };

  const handleSuccessClose = () => {
    setshowSuccess(false);
    navigate(signinData == true ? setChangePasswordAdmin(true) : "/");
  };
  const handleSuccessAdminClose = () => {
    // setAdminShowSuccess(false)
    navigate("/dashboard");
  };

  const handleErrClose = () => {
    setshowSuccess(false);
  };
  const handleErrorCloseAdmin = () => {
    setAdminShowSuccess(false);
  };
  const handleSuccessShow = () => setshowSuccess(true);
  const handleErrorClose = () => {
    setshowError(false);
    localStorage.clear();
  };
  const handleErrorShow = () => setshowError(true);

  const checkValidation = (e) => {
    if (e.target.value != "") {
      if (isEmail(e.target.value)) {
        e.target.classList.remove("is-invalid");
        document.querySelector(".error_email").classList.add("d-none");
        document.querySelector(".error_email").classList.remove("d-block");
      } else {
        e.target.classList.add("is-invalid");
        $(this).nextAll(".error").addClass("d-none");
        document.querySelector(".error_email").classList.add("d-block");
        document.querySelector(".error_email").classList.remove("d-none");
      }
    }
  };

  const isEmail = (email) => {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  };

  const onSubmit = async () => {
    try {
      if (verfied == true) {
        setRecaptchaErrorhandle(false);
        // if (validator.error_input_validation("Logindata")) {
          setloadervalue(true);
          const values2 = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
          };

          const response = await axios.post(
            CommonConstants.BASE_URL + "/signin",
            values2
          );
        
          if (response.data.status === true) {
            navigate("/dashboard");
            let tokenData = await jwtDecode(response.data.token);

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);

            setcallNotification(true);
            setsigninData(tokenData.userDetails.isAdminResetPwd);
            const ipResponse = await fetch(
              "https://api.ipify.org/?format=json"
            );
            const ipData = await ipResponse.json();
            let osVersion = "";
            const userAgent = window.navigator.userAgent;
            const osVersionMatch = userAgent.match(
              /(Windows NT|Mac OS X|Android) ([\d._]+)/
            );
            if (osVersionMatch) {
              osVersion = osVersionMatch[0];
            }
            const deviceData = {
              userId: tokenData.userDetails.id,
              client: "web",
              model: "",
              osVersion: osVersion,
              appVersion: "",
              ip: ipData.ip,
              host: "",
              isFromSignup: false,
            };

            const deviceDataResponse = await axios.post(
              CommonConstants.BASE_URL + "/saveuserdeviceinfos",
              deviceData
            );

            //handle not active accounts

            // if (tokenData.userDetails.active === false) {
            // 	setErrorhandle('Given account is not active. Please contact customer care for further processing.')
            // 	setloadervalue(false)
            // 	handleErrorShow()
            // 	return
            // }

            localStorage.setItem("loginkey", "true");
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("Id", tokenData.userDetails.id);
            localStorage.setItem("Uname", tokenData.userDetails.firstName);
            localStorage.setItem(
              "login_name",
              tokenData.userDetails.firstName +
                " " +
                tokenData.userDetails.lastName
            );
            localStorage.setItem(
              "VerifiedTransID",
              tokenData.userDetails.digitalVerifiedTransactionId
            );
            localStorage.setItem("rollID", tokenData.userDetails.roles[0].id);
            localStorage.setItem("idc", tokenData.userDetails.customerId);

            if (tokenData) {
              navigate("/dashboard");
              setAdminShowSuccess(true);
              setpopupsetup(true);
            } else {
              window.history.replaceState(null, null, window.location.href);
              window.history.replaceState({}, "login", "/");
              if (tokenData.userDetails.isAdminResetPwd == true) {
                localStorage.setItem(
                  "AdminResetPermission",
                  tokenData.userDetails.isAdminResetPwd
                );
                setChangePasswordAdmin(true);
              } else {
                if (
                  tokenData.userDetails.signupCompleted === false &&
                  tokenData.userDetails.roles[0].id !== 1
                ) {
                  setloadervalue(false);
                  setSignupCompleteData(
                    "Please complete the profile to continue!",
                    true
                  );
                  return;
                } else {
                  handleSuccessClose();
                }
              }
              setpopupsetup(true);
              setSuccesshandle(response.data.message);
            }
            setloadervalue(false);
          } else if (response.data.status === false) {
            handleSuccessShow();
            setpopupsetup(false);
            setErrorhandle(response.data.message);
            setSuccesshandle(response.data.message);
            handleErrorShow();
            setloadervalue(false);
          }
        // }
      } else {
        setRecaptchaErrorhandle(true);
      }
    } catch (err) {
   
      setloadervalue(false);
    }
  };


  const [verfied, setverfied] = useState(false);

  const onChange = (value) => {
    setverfied(true);
    setRecaptchaErrorhandle(false);
  };

  const ForgotPassword = () => {
    // LoaderPage()
    window.scrollTo(0, 0);
    navigate("/forgotpassword");
  };

  // const LoaderPage=()=>{
  //   if(loadervalue === true){
  //   return(<Loader></Loader>)
  // }
  // }
  const iconchnagehandle = () => {
    setShowPassword(!ShowPassword);
  };

  return (
    <>
      <section className="mainLoginSection2 loginpagepadding">
        {loadervalue == true ? <Loader /> : ""}
        <NavBar></NavBar>
        <Container>
          <div className="mainLoginBox mt-5 ">
            <div className="box row d-flex">
              <div className="col-lg-5 firstBlock ">
                <div className=" justify-content-center justify-items-center d-flex my-5 mt-6 m-auto">
                  {/* <h1>first side</h1> */}
                  <Image src={LoginAvatar} className="loginavatar"></Image>
                </div>
              </div>
              <div className="col-lg-7 loginPadding g-0">
                <div className="bgSkyBlue  text-white text-center bolder my-5 mb-0 py-3">
                  Welcome to LegalRemit
                </div>

                <div className="mx-3 login">
                  <div className=" px-4 ">
                    <Row className="text-center">
                      <h1 className="Loginheading bolder">Login</h1>
                    </Row>
                    <Row className="text-center mb-3">
                      <p className="fs-6 mb-3 simple">
                        Enter your details to sign in into your account
                      </p>
                    </Row>

                    <Form id="Logindata">
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <i className="logincolor main fa fa-envelope"></i>
                          <Form.Control
                            onChange={checkValidation}
                            type="email"
                            id="email"
                            placeholder=""
                            className="loginformcontrol email required form-input"
                            name="email"
                          />

                          <label for="name" className="form-label1">
                            Email
                          </label>
                          {/*<small className="responsiveFontLarge d-none error validation-msg medium ms-2">Enter Your*/}
                          {/*  Email</small>*/}
                          <small className="responsiveFontLarge d-none error_email validation-msg medium ms-2">
                            Enter Valid Email
                          </small>
                        </Form.Group>
                      </Row>

                      <Row className="mb-1">
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <i className="logincolor main fa fa-lock "></i>
                          <Form.Control
                            type={ShowPassword ? "text" : "Password"}
                            id="password"
                            placeholder=""
                            className="loginformcontrol form-input required"
                            onKeyPress={handleInputKeyPress}
                            name="password"
                          />
                          <div
                            className="pointer"
                            onClick={(e) => {
                              iconchnagehandle();
                            }}
                          >
                            {ShowPassword ? (
                              <Visibility className="logincolor" />
                            ) : (
                              <VisibilityOff className="logincolor" />
                            )}
                          </div>
                          <label for="name" className="form-label1">
                            Password
                          </label>
                          <small className="responsiveFontLarge error d-none  validation-msg1 medium ms-2">
                            Enter Your Password
                          </small>
                        </Form.Group>
                      </Row>
                      <Row>
                        <p className="logincolor mb-0 fs-6 medium text-end ">
                          <a
                            className="a_link pointer"
                            onClick={ForgotPassword}
                          >
                            Forgot Password ?
                          </a>
                        </p>
                      </Row>
                      <Row className="justify-content-center justify-items-center d-flex text-center">
                        <div className="d-flex justify-content-center m-4 ">
                          <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                            onChange={onChange}
                            className={
                              RecaptchaErrorhandle == true
                                ? "recaptchaalert"
                                : "border-none"
                            }
                          />
                        </div>
                      </Row>

                      <Row>
                        <p className="text-center terms px-4 fs-6 mt-2">
                          This site is protected by reCAPTCHA and the Google{" "}
                          <a
                            href="https://policies.google.com/privacy?hl=en-GB"
                            className="text-underline text-blue pointer"
                          >
                            Privacy Policy
                          </a>{" "}
                          and{" "}
                          <a
                            href="https://policies.google.com/terms?hl=en-GB"
                            className="text-underline text-blue pointer"
                          >
                            Terms of Service
                          </a>{" "}
                          apply.
                        </p>
                      </Row>
                      <Row className="justify-content-center justify-items-center d-flex col-lg-4 m-auto">
                        <Button
                          className="uppercase loginButton fs-4 "
                          onClick={onSubmit}
                          disabled={!verfied}
                        >
                          Login
                        </Button>
                        {/* <Button className="col-lg-12 col-md-12 col-sm-12 col-12 btnDanger" variant="primary" type="submit">
                                LOGIN
                            </Button> */}
                      </Row>
                      <Row className="text-center pb-4">
                        <p className="fs-6">
                          Don't have an account?{" "}
                          <a
                            className="logintext a_link medium pointer"
                            onClick={handleSignUp}
                          >
                            {" "}
                            Sign Up
                          </a>
                        </p>
                      </Row>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* success model  */}
          {/* <Modal show={showSuccess} onHide={handleSuccessClose} className="modelset lg">
            <div className="sucmodel rounded-pill">
              <Modal.Body>
                <div className='m-3'>
                  <center>
                    <img src={Successmessageicon} className='mb-3 fw-12'></img><br/>
                    <b><h4 className='mb-3 bolder '>Success</h4></b>
                    <p className='textColorDefault mb-3'><b>{Successhandle}</b></p>
                    <Button variant="primary" className="col-lg-10 rounded btnInfo justify-content-center" onClick={handleSuccessClose}>
                      Ok
                    </Button>
                  </center>
                </div>
              </Modal.Body>
            </div>
          </Modal> */}

          {/* error model */}

          <Modal
            show={showError}
            onHide={handleErrorClose}
            className="modelset lg"
          >
            <div className="errmodel rounded-pill">
              <Modal.Body className="" closeButton>
                <div className="m-3">
                  <center>
                    <b>
                      <h4 className="mb-3 bolder capitalize">Error</h4>
                    </b>
                    <p className="textColorDefault mb-3">
                      <b>{Errorhandle}</b>
                    </p>
                    <Button
                      variant="primary"
                      className="col-lg-10 rounded btnInfo justify-content-center"
                      onClick={handleErrorClose}
                    >
                      Ok
                    </Button>
                  </center>
                </div>
              </Modal.Body>
            </div>
          </Modal>

          {/*Signup not completed Popup*/}
          <Modal show={isSignupCompleted.showPopup} className="modelset lg">
            <div className="errmodel rounded-pill">
              <Modal.Body className="" closeButton>
                <div className="m-3">
                  <center>
                    <b>
                      <h4 className="mb-3 bolder capitalize">
                        Incomplete User Details
                      </h4>
                    </b>
                    <p className="textColorDefault mb-3">
                      <b>{isSignupCompleted.error}</b>
                    </p>
                    <Button
                      variant="primary"
                      className="col-lg-10 rounded btnInfo justify-content-center"
                      onClick={handleGoToProfile}
                    >
                      Go to profile
                    </Button>
                  </center>
                </div>
              </Modal.Body>
            </div>
          </Modal>

          <div className="">
            <Modal
              size="lg"
              show={showSuccess}
              onHide={popupsetup === true ? handleSuccessClose : handleErrClose}
              centered
            >
              <Row className="">
                <Col className="col-lg-12 d-flex align-items-center ">
                  <Col className="col-lg-5 verfiyBlock1 moneySendRespo">
                    <img src={LoginAvatar} className="img-fluid p-5" />
                  </Col>
                  <Col className="col-lg-7 Error_Popup">
                    <Modal.Header
                      className=" borderHeader py-3 "
                      closeButton
                      onHide={
                        popupsetup === true
                          ? handleSuccessClose
                          : handleErrClose
                      }
                    >
                      <Modal.Title className="px-0">
                        <small
                          className={` bolder successText fs-3 ${
                            popupsetup === true ? "d-block" : "d-none"
                          }`}
                        >
                          Success
                        </small>
                        <small
                          className={` bolder text-danger radiumText fs-3 ${
                            popupsetup === false ? "d-block" : "d-none"
                          }`}
                        >
                          Alert!
                        </small>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p
                        className={`fs-5 py-3 ${
                          popupsetup === true ? "d-block" : "d-none"
                        }`}
                      >
                        {Successhandle}
                      </p>

                      <p
                        className={` fs-5 py-3 ${
                          popupsetup === false ? "d-block" : "d-none"
                        }`}
                      >
                        {Successhandle}
                        {/* User Does Not Exist with this Email */}
                      </p>
                    </Modal.Body>
                    <hr></hr>
                    <div className="justify-content-center d-flex">
                      <Button
                        className={`w-50 uppercase loginButton fs-4 ${
                          popupsetup === true ? "d-block" : "d-none"
                        }`}
                        onClick={handleSuccessClose}
                      >
                        Go Home
                      </Button>
                      <Button
                        className={`w-50 uppercase loginButton fs-4 ${
                          popupsetup === false ? "d-block" : "d-none"
                        }`}
                        onClick={handleErrClose}
                      >
                        Retry
                      </Button>
                    </div>
                  </Col>
                </Col>
              </Row>
            </Modal>
          </div>

          <div className="">
            <Modal
              size="lg"
              className="smallModals"
              show={adminShowSuccess}
              onHide={
                popupsetup === true
                  ? handleSuccessAdminClose
                  : handleErrorCloseAdmin
              }
              centered
            >
              <Row className="">
                <Col className="col-lg-12 d-flex align-items-center ">
                  <Col className="col-lg-5 verfiyBlock1 moneySendRespo">
                    <img src={LoginAvatar} className="img-fluid p-5" />
                  </Col>
                  <Col className="col-lg-7 Error_Popup">
                    <Modal.Header
                      className=" borderHeader py-3 "
                      closeButton
                      onHide={
                        popupsetup === true
                          ? handleSuccessAdminClose
                          : handleErrorCloseAdmin
                      }
                    >
                      <Modal.Title className="px-0">
                        <small
                          className={` bolder successText fs-3 ${
                            popupsetup === true ? "d-block" : "d-none"
                          }`}
                        >
                          Success
                        </small>
                        <small
                          className={` bolder text-danger radiumText fs-3 ${
                            popupsetup === false ? "d-block" : "d-none"
                          }`}
                        >
                          Alert!
                        </small>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p
                        className={`fs-5 py-3 text-start ${
                          popupsetup === true ? "d-block" : "d-none"
                        }`}
                      >
                        Admin login successfully.
                      </p>

                      <p
                        className={` fs-5 py-3 text-start ${
                          popupsetup === false ? "d-block" : "d-none"
                        }`}
                      >
                        Admin Does Not Exist with this Email
                      </p>
                    </Modal.Body>
                    <hr></hr>
                    <div className="justify-content-center d-flex">
                      <Col className="col-lg-10">
                        <Button
                          className={`uppercase loginButton fs-4  m-0${
                            popupsetup === true ? "d-block" : "d-none"
                          }`}
                          onClick={handleSuccessAdminClose}
                        >
                          <h5 className="text-white mb-0">Go Dashboard</h5>
                        </Button>
                        <Button
                          className={`uppercase loginButton fs-4 m-0 ${
                            popupsetup === false ? "d-block" : "d-none"
                          }`}
                          onClick={handleErrorCloseAdmin}
                        >
                          <h5 className="text-white mb-0">Retry</h5>
                        </Button>
                      </Col>
                    </div>
                  </Col>
                </Col>
              </Row>
            </Modal>
          </div>

          <Modal
            show={ChangePasswordAdmin}
            onHide={() => {
              setChangePasswordAdmin(false);
            }}
            backdrop="static"
            keyboard={false}
            size="md"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="purpleText">Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              It seems your password has been changed by the Admin. Please
              re-login to the application
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <div className="col-lg-6">
                <Button
                  variant="secondary"
                  className="purpleBackground"
                  onClick={(e) => {
                    setChangePasswordAdmin(false);
                    navigate("/changepassword");
                  }}
                >
                  OK
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </Container>
      </section>
      <Footer></Footer>
    </>
  );
}
