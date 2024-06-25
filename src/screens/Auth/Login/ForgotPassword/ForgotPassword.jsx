import React, { useState, useEffect } from "react";
import Footer from "../../../Home/Footer/Footer";
import NavBar from "../../../Home/Navbar/Navbar";
import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import LoginAvatar from "../../../../assets/images/LoginAvatar.svg";
import ReCAPTCHA from "react-google-recaptcha";
import { CommonConstants } from "../../../../Constants/common.constants";
import axios from "axios";
import "../../../../assets/assets/scss/pages/ForgotPassword.scss";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import Loader from "../../../Loader/Loader";
import { coreAxiosInstance } from "../../../../utils/axiosIntercepters";

export default function ForgotPassword({ children, props }) {
  // const navigate = useNavigate()
  const navigate = useNavigate();
  const [loaderr, setLoader] = useState(false);

  useEffect(() => {
 
  }, []);



  const handleSignUp = () => {
    // navigate('/signup', {replace: true})
    window.scrollTo(0, 0);
  };

  const [Successhandle, setSuccesshandle] = useState(null);
  const [Errorhandle, setErrorhandle] = useState(null);

  const [showSuccess, setshowSuccess] = useState(false);
  const [showError, setshowError] = useState(false);

  const handleSuccessClose = () => {
    setshowSuccess(false);
    // navigate('/')
  };
  const handleSuccessShow = () => setshowSuccess(true);

  const handleErrorClose = () => setshowError(false);
  const handleErrorShow = () => setshowError(true);



  const [popupsetup, setpopupsetup] = useState(false);
  const [UserId, setuserId] = useState();

  const onSubmit = async (values) => {
    try {
      setLoader(true);
      const { ...data } = values;
 
      const response = await coreAxiosInstance.post(`/user/forgotPassword?emailOrPhoneNumber=${values?.email}`);
    
      if (response.data.status === true) {
        setSuccesshandle(response.data.message);
        // setuserId(response.data.data.id)
        localStorage.setItem("userid", response.data.data.id);
        setpopupsetup(true);
        handleSuccessShow();
        setLoader(false);
      } else if (response.data.status === false) {
        // setErrorhandle(response.data.message)
        setSuccesshandle(response.data.message);
        handleSuccessShow();
        setpopupsetup(false);
        setLoader(false);
      }
    } catch (err) {
    
    }
  };
 
  const formik = useFormik({
    initialValues: {
      email: "",
      // password: ""
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Please enter a valid email id")
        .required("Please enter email id"),

      // password: Yup.string()
      //   .min(6, "Must be 6 characters or more")
      //   .matches(/[a-z]+/, "One lowercase character")
      //   .matches(/[A-Z]+/, "One uppercase character")
      //   .matches(/[@$!%*#?&]+/, "One special character")
      //   .matches(/\d+/, "One number")
      //   .required("Please enter password"),
    }),

    onSubmit,
  });

  const [verfied, setverfied] = useState(false);

  const onChange = (value) => {
    setverfied(true);
  };

  const ResetPassword = () => {
    window.scrollTo(0, 0);
    navigate("/resetpassword");
  };

  return (
    <>
      {loaderr == true ? <Loader /> : ""}
      <section className="mainLoginSection loginpagepadding">
        {/* <NavBar></NavBar> */}
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
                <div className="bgSkyBlue  text-white text-center bolder my-5 py-3">
                  Welcome to LegalRemit
                </div>

                <div className="mx-3 login">
                  <div className="px-4">
                    <Row className="text-center">
                      <h1 className="Loginheading bolder">Forgot Password</h1>
                    </Row>
                    <Row className="text-center mb-3">
                      <p className="fs-6 mb-3 simple">
                        No worries, we will send you reset instructions
                      </p>
                    </Row>

                    <Form onSubmit={formik.handleSubmit}>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <i className="logincolor main fa fa-envelope"></i>
                          <Form.Control
                            type="email"
                            placeholder="Enter Email / phone"
                            onBlur={formik.handleBlur}
                            className="loginformcontrol"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.email && formik.touched.email && (
                            <small className="responsiveFontLarge  validation-msg medium ms-3">
                              {formik.errors.email}
                            </small>
                          )}
                        </Form.Group>
                      </Row>

                      <Row className="justify-content-center justify-items-center d-flex col-lg-4 m-auto">
                        <Button
                          className=" uppercase ForgotPasswordButton fs-4 "
                          type="submit"
                        >
                          SEND
                        </Button>
                        {/* <Button className='w-25 uppercase ForgotPasswordButton fs-4 ' type="submit" onClick={ResetPassword}>SEND</Button> */}
                      </Row>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <Modal
              className=""
              show={showSuccess}
              onHide={handleSuccessClose}
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
                      onHide={handleSuccessClose}
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
                          Error
                        </small>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p className="fs-6 py-5 pt-1 pb-1">{Successhandle}</p>
                    </Modal.Body>
                  </Col>
                </Col>
              </Row>
            </Modal>
          </div>
        </Container>
      </section>
      {/* <Footer></Footer> */}
    </>
  );
}
