import React, { useContext, useEffect, useState } from "react";
import "./Step2.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../../../Helpers/CountryDropdown/flags.css";
import userContext from "../../Signupdata/Usecontext";
import axios from "axios";
import { CommonConstants } from "../../../../../Constants/common.constants";
import { Button, ListGroup, OverlayTrigger } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const validator = require("../../../../../assets/js/validator");

export default function Step2({ Name, handleId, handleIndividualNextStep }) {
  const { stepOneData, setLoaderValue, setStepTwoData, setRegisterId } =
    useContext(userContext);

  const [countryPhoneCode, setCountryPhoneCode] = useState("");

  const handleFormId = () => {
    handleId("Individual_Details_step2");
  };

  useEffect(() => {
    handleFormId();

    setCountryPhoneCode(stepOneData.countryDetail.countryPhoneCode);
  }, [stepOneData]);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [isEmailExists, setIsEmailExists] = useState(false);
  const [isMobileExists, setIsMobileExists] = useState(false);
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const [hasAnyError, setHasAnyError] = useState(false);

  const [isOtpValid, setIsOtpValid] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  const capitalizeWords = (str) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const removeNonNumeric = (str) => str.replace(/\D/g, "");

  const upperCaseAlphaNumeric = (str) =>
    str.replace(/[^a-zA-Z0-9\s]/g, "").toUpperCase();

  const handleUserDetailsData = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (stepOneData.roleId === "Individual") {
      if (
        name === "firstName" ||
        name === "middleName" ||
        name === "lastName"
      ) {
        newValue = capitalizeWords(value);
      }

      if (name === "mobile") {
        newValue = removeNonNumeric(value);
      }
    } else {
      // 'Business_RegistrationNo': upperCaseAlphaNumeric
    }

    setUserDetails({ ...userDetails, [name]: newValue });
  };

  const verifyEmailExists = async (e) => {
    try {
      if (e.target.value !== "") {
        const UserExist = {
          email: e.target.value,
        };

        const EmailExistVerify = await axios.post(
          CommonConstants.BASE_URL + "/checkuserexistornot",
          UserExist
        );

        if (EmailExistVerify.data.status === true) {
          setIsEmailExists(false);
          setIsOtpValid(false);
        }
      }
    } catch (e) {
      setIsEmailExists(true);
      setIsOtpValid(false);
      console.log(e);
    }
  };

  const verifiyMobileExists = async (e) => {
    try {
      if (e.target.value !== "") {
        const response = await axios.post(
          CommonConstants.BASE_URL + "/checkuserexistornot",
          {
            phone: e.target.value,
          }
        );

        if (response.data.status === true) {
          setIsMobileExists(false);
        }
      }
    } catch (e) {
      setIsMobileExists(true);
    }
  };

  const checkMobileValidation = (e) => {
    handleUserDetailsData(e);
    const inputedMobileNumber = e.target.value;
    const mobileNo = /^(?!0|4)\d{5,15}$/;
    const zeroValid = /^((04))\d{8}$/;
    const fourValid = /^4\d{8}$/;

    if (countryPhoneCode === "+61") {
      const isValid =
        (countryPhoneCode === "+61" &&
          (zeroValid.test(inputedMobileNumber) ||
            fourValid.test(inputedMobileNumber))) ||
        mobileNo.test(inputedMobileNumber);

      setIsMobileValid(!isValid);
    } else {
      setIsMobileValid(false);
    }
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;

    const isValid =
      password &&
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password);
    setIsPasswordValid(isValid);
  };

  const handleTextboxFocus = (value) => {
    setIsPopoverVisible(value);
  };

  const handleConfirmPasswordChange = (event) => {
    handleUserDetailsData(event);

    const isValid = event.target.value == userDetails.password;

    setIsConfirmPasswordValid(!isValid);
  };

  const prepareUserDetails = () => {
    return {
      businessAddress: "",
      businessName: "",
      code: "",
      countryId: stepOneData.countryId,
      countryName: stepOneData.countryDetail.countryName,
      digitalVerifiedLink: "",
      digitalVerifiedTransactionId: "",
      email: userDetails.email,
      firstName: userDetails.firstName,
      id: 0,
      lastName: userDetails.lastName,
      middleName: userDetails.middleName,
      password: userDetails.password,
      phone: userDetails.mobile,
      phoneCode: countryPhoneCode,
      refCodeId: "",
      referralCode: stepOneData.referral,
      regNo: "",
      regTimezone: "",
      roleId: 2,
    };
  };

  const [serverError, setServerError] = useState({
    message: "",
    openErrorModal: false,
  });

  const handleErrorPopup = () => {
    setServerError({
      ...serverError,
      openErrorModal: false,
    });
  };

  const submitUserDetails = async () => {
    validator.error_input_validation("Individual_Details_step2");
    if (!validator.error_input_validation("Individual_Details_step2")) {
      return;
    }
    try {
      setLoaderValue(true);
      const response = await axios.post(
        CommonConstants.BASE_URL + "/user/create",
        prepareUserDetails()
      );
      if (response.data.status === true) {
        setRegisterId(response.data.data);

        //set user details in context
        setStepTwoData(userDetails);
        await sendNewOtp("getOtp");
      }
    } catch (e) {
      setLoaderValue(false);

      setServerError({
        message: e.response.data,
        openErrorModal: true,
      });

      console.log(e);
    } finally {
      setLoaderValue(false);
    }
  };

  const popover = (
    <Popover id="popover-positioned-textbox" className="custom__popover">
      <Popover.Header as="h5" className="py-3">
        Your password needs to contain
      </Popover.Header>
      <Popover.Body>
        <ListGroup as="ul" className="w-100 list-unstyled shadow-none border-0">
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">8 Characters Minimum</div>
            </div>
            {isPasswordValid ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon style={{ color: "#ff0000" }} />
            )}
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">A lowercase letter</div>
            </div>
            {/[a-z]/.test(userDetails.password) ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon style={{ color: "#ff0000" }} />
            )}
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">An uppercase letter</div>
            </div>
            {/[A-Z]/.test(userDetails.password) ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon style={{ color: "#ff0000" }} />
            )}
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">A number</div>
            </div>
            {/\d/.test(userDetails.password) ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon style={{ color: "#ff0000" }} />
            )}
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">A Special Character</div>
            </div>
            {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
              userDetails.password
            ) ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon style={{ color: "#ff0000" }} />
            )}
          </ListGroup.Item>
        </ListGroup>
      </Popover.Body>
    </Popover>
  );

  //Otp Verification Modal

  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");
  const [otpErrorShakeMessage, setOtpErrorShakeMessage] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpDisable, setOtpDisable] = useState(true);

  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [seconds, setSeconds] = useState(60);

  const onChangeNewNumber = () => {
    document.getElementById("phonemsg").classList.remove("d-none");
    document.getElementById("otpmsg").classList.add("d-none");

    document.getElementById("otprecever").style.display = "none";
    document.getElementById("OTPtext").style.display = "none";
    document.getElementById("otpbtn").style.display = "none";
    document.getElementById("ChangeMobile").style.display = "block";
    document.getElementById("ChangeMobileOTPresendBtn").style.display = "block";
  };

  const onOpenOtpModal = () => {
    setOpenOtpModal(true);
    setSeconds(60);
  };

  const handleOtpInput = async (otp) => {
    setOtp(otp);
    const isOtpLengthValid = otp.length === 6;
    setOtpErrorShakeMessage(!isOtpLengthValid);
    setOtpDisable(!isOtpLengthValid);
    console.log(isOtpLengthValid, otp, otp.length);

    if (otp.length === 6) {
      await verifyOtp(otp);
    }
  };

  useEffect(() => {
    if (openOtpModal === true) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }

        if (seconds === 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [seconds, openOtpModal]);

  const closeOtpModal = () => {
    setOpenOtpModal(false);
  };

  const generateNewOtpForNewNumber = async () => {
    if (validator.error_input_validation("Change_Mobile_Step2")) {
      const OtpData = {
        title: "Legal Remit",
        phone: userDetails.mobile,
      };

      try {
        setLoaderValue(true);
        const sendOtpResponse = await axios.post(
          CommonConstants.BASE_URL + "/sendotp",
          OtpData
        );

        if (sendOtpResponse.data.status == true) {
          document.getElementById("otpmsg").classList.remove("d-none");
          document.getElementById("phonemsg").classList.add("d-none");
          document.getElementById("otprecever").style.display = "block";
          document.getElementById("OTPtext").style.display = "block";
          document.getElementById("otpbtn").style.display = "block";
          document.getElementById("ChangeMobile").style.display = "none";
          document.getElementById("ChangeMobileOTPresendBtn").style.display =
            "none";
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoaderValue(false);
      }
    }
  };

  const onResendOtp = () => {
    setSeconds(60);
    sendNewOtp();
    setOtp("");
    setOtpErrorMessage(false);
  };

  const sendNewOtp = async (type = null) => {
    if (type === null) {
      validator.error_input_validation("Change_Mobile_Step2");
      if (!validator.error_input_validation("Change_Mobile_Step2")) {
        return;
      }
    }

    try {
      const OtpData = {
        title: "Legal Remit",
        countryId: stepOneData.countryId,
        phone: userDetails.mobile,
        email: userDetails.email,
      };

      const sendOtpResponse = await axios.post(
        CommonConstants.BASE_URL + "/sendotp",
        OtpData
      );

      if (
        sendOtpResponse &&
        sendOtpResponse.data &&
        sendOtpResponse.data.status == true
      ) {
        setOpenOtpModal(true);
        setLoaderValue(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoaderValue(false);
    }
  };

  const verifyOtp = async (value = null) => {
    const otpRequest = {
      otp: value !== null ? parseInt(value) : otp,
      phone: userDetails.mobile,
    };

    const response = await axios.post(
      CommonConstants.BASE_URL + "/verifyotpbyphone",
      otpRequest
    );

    if (response.data.status === false) {
      setOtpDisable(true);
      setOtpErrorMessage(true);
      setOtpErrorShakeMessage(true);
      setIsOtpVerified(false);
      setOtp("");
    } else if (response.data.status === true) {
      localStorage.setItem("MobileNumber", userDetails.mobile);
      setOtpErrorMessage(false);
      setOtpErrorShakeMessage(false);
      closeOtpModal();
      setIsOtpVerified(true);
      setOtp("");
      setOtpDisable(false);
      handleIndividualNextStep();
    }
  };

  //Check if there is any validation error or not before submitting the form

  useEffect(() => {
    if (isEmailExists || isMobileExists) {
      setHasAnyError(true);
    } else {
      setHasAnyError(false);
    }
  }, [isEmailExists, isMobileExists]);

  return (
    <>
      <section>
        <div className="bgGreen text-white text-center bolder my-4 py-3">
          Welcome to LegalRemit
        </div>
        <Container fluid>
          <Row>
            <Col className="col-lg-12 p-0">
              <div className="mt-3 pe-4 ps-4">
                <Row id="stepone" className="">
                  <div className="text-center">
                    <label className="text-center text-black mb-4">
                      User Details
                    </label>
                  </div>
                  <Form id="Individual_Details_step2" autoComplete="off">
                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="successText main fa fa-user "></i>
                        <Form.Control
                          type="text"
                          id="name-input"
                          placeholder="First Name"
                          value={userDetails.firstName}
                          name="firstName"
                          onChange={handleUserDetailsData}
                          className="formcontrol required form-input"
                        />
                        <label htmlFor="name-input" className="form-label1">
                          {" "}
                          First Name{" "}
                        </label>

                        <small className="responsiveFontLarge d-none text-danger error_message ms-2 error">
                          Please Enter The First Name
                        </small>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="successText main fa fa-user "></i>
                        <Form.Control
                          type="text"
                          id="name-input1"
                          name="middleName"
                          onChange={handleUserDetailsData}
                          value={userDetails.middleName}
                          placeholder="Middle Name"
                          className="formcontrol form-input"
                        />
                        {/* <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error" >Please Enter The Middle Name</small> */}
                        <label htmlFor="name-input1" className="form-label1">
                          Middle Name
                        </label>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="successText main fa fa-user "></i>
                        <Form.Control
                          type="text"
                          id="name-input2"
                          name="lastName"
                          onChange={handleUserDetailsData}
                          value={userDetails.lastName}
                          placeholder="Last Name"
                          className="formcontrol required form-input"
                        />
                        <label htmlFor="name-input2" className="form-label1">
                          Last Name
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The Last Name
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="successText main fa fa-envelope "></i>
                        <Form.Control
                          type="email"
                          autoComplete="off"
                          id="name-input4"
                          name="email"
                          onChange={handleUserDetailsData}
                          onBlur={verifyEmailExists}
                          value={userDetails.email}
                          placeholder="Email"
                          className={`formcontrol required email form-input ${
                            isEmailExists === true ? "border-danger" : ""
                          }`}
                        />
                        <label htmlFor="name-input4" className="form-label1">
                          Email
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Valid Email Address
                        </small>
                        <small
                          className={`text-danger  ms-2 error_font  ${
                            isEmailExists === true ? "d-block" : "d-none"
                          }`}
                        >
                          Email Already Exist
                        </small>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                        style={{ zIndex: 0 }}
                      >
                        <div className="d-flex">
                          {/* <Col className="col-lg-5 ps-0"> */}
                          <i className="successText main fa fa-mobile "></i>

                          <Form.Control
                            type="text"
                            defaultValue={countryPhoneCode}
                            placeholder="Mobile"
                            readOnly
                            className={`inputphonecode countrycode pe-0 formcontroll1 required form-input ${
                              isMobileExists === true ? "border-danger" : ""
                            }`}
                          />
                          <label className="form-label1">Mobile</label>
                          <Form.Control
                            type="tel"
                            name="mobile"
                            onChange={(e) => {
                              checkMobileValidation(e);
                            }}
                            onBlur={verifiyMobileExists}
                            value={userDetails.mobile}
                            placeholder="Mobile"
                            className={`inputphonenum inputmobile formcontroll2 required phone ps-0 ${
                              isMobileExists === true ? "border-danger" : ""
                            }`}
                          />
                        </div>
                        <small className="responsiveFontLarge d-none text-danger ms-2 error">
                          Please Enter the Mobile Number
                        </small>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Valid Mobile Number
                        </small>
                        <small
                          className={`text-danger  ms-2 error_font  ${
                            isMobileExists === true ? "d-block" : "d-none"
                          }`}
                        >
                          Mobile Already Exist
                        </small>
                        <small
                          className={`text-danger  ms-2 error_font  ${
                            isMobileValid === true ? "d-block" : "d-none"
                          }`}
                        >
                          This mobile Number must start with 04 or 4 and have 10
                          or 9 digits respectively
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <OverlayTrigger
                        show={isPopoverVisible}
                        placement="auto"
                        overlay={popover}
                        trigger="manual"
                      >
                        <Form.Group
                          as={Col}
                          className="left-and-right-inner-addon1 input-container"
                        >
                          <i className="successText fa fa-lock left1"></i>
                          <div
                            className="pointer"
                            onClick={(e) => {
                              setShowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? (
                              <Visibility className="logincolor" />
                            ) : (
                              <VisibilityOff className="logincolor" />
                            )}
                          </div>
                          <Form.Control
                            type={showPassword ? "text" : "Password"}
                            name="password"
                            onChange={(e) => {
                              handleUserDetailsData(e);
                              handlePasswordChange(e);
                            }}
                            placeholder="Password"
                            autoComplete="false"
                            className="formcontrol required password form-input11 form-input"
                            onFocus={() => handleTextboxFocus(true)}
                            onBlur={(e) => {
                              handleTextboxFocus(false);
                            }}
                          />

                          <label className="form-label1">Password</label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please Enter The Password
                          </small>
                          <small className="responsiveFontLarge  d-none text-danger password_error_message ms-2 error_message">
                            It is Invalid Password
                          </small>
                        </Form.Group>
                      </OverlayTrigger>

                      <Form.Group
                        as={Col}
                        className="left-and-right-inner-addon1 input-container"
                      >
                        <i className="successText fa fa-lock left1"></i>
                        <div
                          className="pointer"
                          onClick={(e) => {
                            setShowConfirmPassword(!showConfirmPassword);
                          }}
                        >
                          {showConfirmPassword ? (
                            <Visibility className="logincolor" />
                          ) : (
                            <VisibilityOff className="logincolor" />
                          )}
                        </div>
                        <Form.Control
                          type={showConfirmPassword ? "text" : "Password"}
                          name="IndidualCpassword"
                          onChange={(e) => handleConfirmPasswordChange(e)}
                          // onKeyDown={handleCpassworCheck}
                          placeholder="Confirm Password"
                          autoComplete="false"
                          className={`formcontrol required form-input11 cpassword form-input ${
                            isConfirmPasswordValid ? "error_Border" : ""
                          }`}
                        />

                        <label className="form-label1">Confirm Password</label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The Confirm Password
                        </small>
                        <small className="responsiveFontLarge  d-none text-danger error_message_matchpass ms-2 error_message">
                          Password and confirm password are not matching
                        </small>
                      </Form.Group>
                    </Row>
                  </Form>
                </Row>
              </div>
            </Col>
          </Row>

          <div className={`btn-component  d-flex justify-content-center`}>
            <input
              disabled={hasAnyError}
              className={`col-lg-3 uppercase pointer nextButtonStep2 `}
              type="button"
              value={"Next"}
              onClick={submitUserDetails}
            />
          </div>
        </Container>
      </section>

      <Modal show={openOtpModal}>
        <Modal.Header
          className="d-flex align-items-center"
          // closeButton
          onHide={closeOtpModal}
        >
          <Modal.Title>
            <small className="responsiveFontLarge  text-black bolder mb-0">
              SMS Verification
            </small>
          </Modal.Title>
        </Modal.Header>
        <Row className="text-center d-flex justify-content-center">
          <Col className="col-lg-11 ">
            <hr></hr>
          </Col>
        </Row>
        <Modal.Body>
          <div className="text-center mb-4">
            <small
              className="responsiveFontLarge  text-black text-center normal"
              id="otpmsg"
            >
              Please Enter 6 digit OTP sent to your registered phone number
            </small>
            <small
              className="text-black text-center normal d-none"
              id="phonemsg"
            >
              Enter phone number to receive OTP
            </small>
          </div>
          <div id="otprecever">
            <OtpInput
              isInputNum={true}
              className={`${
                otpErrorMessage === true ? "error_otpModal " : "otpModal"
              } ${otpErrorShakeMessage === true ? "Error_Otp_input" : ""}`}
              id="OtpNumber"
              numInputs={6}
              value={otp}
              onChange={handleOtpInput}
            />
          </div>
          {/* {otpError && (
            <div className="text-center">
              <small className="responsiveFontLarge  text-danger">{otpErrorMessage}</small>
            </div>
          )} */}

          <Form id="Change_Mobile_Step2">
            <div id="ChangeMobile" className="otppopupMobilefield">
              <Form.Group as={Col} className="left-inner-addon input-container">
                <i className="successText main fa fa-mobile "></i>
                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  className="formcontrol required phone"
                  onChange={(e) => {
                    checkMobileValidation(e);
                  }}
                />
                <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                  Please Enter Valid Mobile Number
                </small>
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <div>
          <div id="OTPtext">
            <Row className="d-block m-auto">
              <Col className="col-lg-12 pb-3">
                <Col className="pt-4 text-center">
                  <small className="responsiveFontLarge  text-black text-start">
                    {seconds > 0 ? (
                      <>
                        Wait for {seconds < 10 ? `0${seconds}` : seconds}{" "}
                        seconds before retry.
                      </>
                    ) : (
                      <>Didn't recieve code?</>
                    )}
                    {seconds == 0 ? (
                      <small
                        className={`text-blue bolder mainAnchor pointer text-end`}
                        onClick={onResendOtp}
                      >
                        Resend OTP
                      </small>
                    ) : (
                      <small className={`bolder pointer text-end`}>
                        Resend OTP
                      </small>
                    )}
                  </small>{" "}
                  <br></br>
                  <br></br>
                  <small className="responsiveFontLarge  text-black text-center mt-4">
                    <a
                      className="text-blue bolder mainAnchor mt-4 pt-4 pointer"
                      onClick={onChangeNewNumber}
                    >
                      {" "}
                      Change Number
                    </a>
                  </small>
                </Col>
              </Col>
            </Row>
          </div>
          <Container className="modal-body">
            <div id="otpbtn">
              <Row className="align-items-center justify-content-evenly pb-2">
                <Col className="col-lg-4">
                  <Button
                    className="greenButton border-0 roundedCorner upparcase bolder"
                    variant="primary"
                    disabled={otpDisable}
                  >
                    <i class="fa fa-check-circle"></i> &nbsp; Verify
                  </Button>
                </Col>
              </Row>
            </div>
            <div id="ChangeMobileOTPresendBtn" className="otppopupMobilefield">
              <Row className="align-items-center justify-content-evenly pb-2">
                <Col className="col-lg-4">
                  <Button
                    className="WhiteButton bordergreen successText roundedCorner upparcase bolder"
                    variant="primary"
                    onClick={generateNewOtpForNewNumber}
                  >
                    Resend OTP
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Modal>

      <Modal show={serverError.openErrorModal}>
        <Modal.Header
          className="d-flex align-items-center"
          onHide={handleErrorPopup}
        >
          <Modal.Title>
            <small className="responsiveFontLarge  text-black bolder mb-0">
              Server Error
            </small>
          </Modal.Title>
        </Modal.Header>
        <Row className="text-center d-flex justify-content-center">
          <Col className="col-lg-11 ">
            <hr></hr>
          </Col>
        </Row>
        <Modal.Body>
          <div className="text-center mb-4">
            {serverError.message &&
              Object.values(serverError.message).map((error, index) => (
                <div
                  key={index}
                  className="responsiveFontLarge text-black text-center normal"
                  id="otpmsg"
                >
                  {error}
                </div>
              ))}
          </div>
        </Modal.Body>
        <div>
          <Container className="modal-body">
            <Row className="align-items-center justify-content-evenly pb-2">
              <Col className="col-lg-4">
                <Button
                  className="WhiteButton border-danger text-danger roundedCorner upparcase bolder"
                  variant="danger"
                  onClick={handleErrorPopup}
                >
                  Close
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal>
    </>
  );
}
