import React, { useState, useEffect } from 'react';
import { Container, Image, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { CommonConstants } from "../../../../../Constants/common.constants"
import axios from 'axios';
import '../../../../../assets/assets/scss/pages/ForgotPassword.scss'
import './ResetPassword.scss'
import LrImage from "../../../../../../src/assets/images/Logo-LR.png"
import { isMobile, isTablet } from 'react-device-detect';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {ListGroup} from "react-bootstrap";

export default function ForgotPassword({ children, props }) {

  // const navigate = useNavigate()
  const navigate = useNavigate()
  // const validator = require("../../../../../assets/js/validator");

  useEffect(() => {
    // // console.log(ShowNameZone,"this is comment")
  }, [])

  const handleSignUp = () => {
    // navigate('/signup', {replace: true})
    window.scrollTo(0, 0)
  }

  const [Successhandle, setSuccesshandle] = useState(null);
  const [Errorhandle, setErrorhandle] = useState(null);

  const [showSuccess, setshowSuccess] = useState(false);
  const [showError, setshowError] = useState(false);
  const [ResetPasswordvalue, setResetPasswordvalue] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleSuccessClose = () => {
    setshowSuccess(false)
    // navigate('/')
  };
  const handleSuccessShow = () => setshowSuccess(true);

  const handleErrorClose = () => setshowError(false);
  const handleErrorShow = () => setshowError(true);

  const [ShowPassword,setShowPassword] =useState(false)
  const [ShowPassword1,setShowPassword1] =useState(false)
  const iconchnagehandle = ()=>{
    setShowPassword(!ShowPassword);
  } 
  const iconchnagehandle1 = ()=>{
    setShowPassword1(!ShowPassword1);
  } 

  const onSubmit = async (values) => {
    try {
      // if (validator.error_input_validation("resetPassword")) {
      const queryParams = new URLSearchParams(window.location.search)

      const Resetdata = {
        verificationnumber: queryParams.get("gen"),
        password: document.getElementById('ResetPassword').value
      }
      const response = await axios.post(CommonConstants.BASE_URL + "/resetpassword", Resetdata);
      if (response.data.status === true) {
        setSuccesshandle(response.data.message)
        handleResetSuccess()
      }
      else if (response.data.status === "error") {
        setErrorhandle(response.data.message)
      }
    // }
    }
    catch (err) {
      console.log(err)
    }
  
  };

  const [verfied, setverfied] = useState(false)

  const onChange = (value) => {
    // console.log("Captcha value:", value);
    setverfied(true)
  }

  const [successReset, setsuccessReset] = useState(false)

  const handleResetSuccess = () => {
    setsuccessReset(true)
  }

  const handleLogin = () => {


    const link = "https://play.google.com/store/apps/details?id=com.view9.legalremit&hl=en&gl=US&pli=1"; //Enter link address

    // if ((isMobile || isTablet) &&(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i)) && window.navigator.standalone) { //have to check as window.navigator.standalone works for ios only
    // if ((isMobile || isTablet) && window.navigator.standalone) { //It is for ios only
    if ((isMobile || isTablet) && (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i))) {
      // console.log("In if")
      toast.success("Mobile/Tablet detected")
      window.location.href = link; // redirect to custom link if mobile app is installed
    } else {

      toast.success("No Mobile/Tablet detected")
      navigate('/login') // continue on web if mobile app is not installed
    }
  }

  const [isPopoverVisible1, setIsPopoverVisible1] = useState(false);

  const handleTextboxFocus = () => {
    setIsPopoverVisible1(true);
  };

  const handleTextboxBlur = () => {
    setIsPopoverVisible1(false);
  };

  const popover = (
    <Popover id="popover-positioned-textbox">
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
            {/[a-z]/.test(ResetPasswordvalue) ? (
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
            {/[A-Z]/.test(ResetPasswordvalue) ? (
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
            {/\d/.test(ResetPasswordvalue) ? (
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
            {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(ResetPasswordvalue) ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon style={{ color: '#ff0000' }} />
            )}
          </ListGroup.Item>
        </ListGroup>
      </Popover.Body>
    </Popover>
  );

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setResetPasswordvalue(event.target.value)
    setIsPasswordValid(event.target.value.length > 7 ? true : false);
    // Validate the password criteria here
    const isValid = password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
    // setIsPasswordValid(isValid);
  };

  return (
    <>

      <section className="bg-white ">
        <Container className="bg-white resetSection" style={{height:'100vh'}}>
          <div className=" row d-flex">

            <div className='col-lg-12 justify-content-center d-flex bg-white'>
              <div className='col-lg-7 p-3 '>
                <div className='mx-3 login'>

                  <div className=''>
                    <Row className='d-flex justify-content-center mb-5'>
                      <img src={LrImage} className="logoImageSet" alt="LegalRemit"></img>
                    </Row>

                    <Row className='text-center'>
                      <h1 className='Loginheading bolder'>Reset Password</h1>
                    </Row>

                    <ToastContainer />

                    <div id="beforeResetPassword" className={successReset === false ? "d-block" : "d-none"}>
                      <Row className='text-center mb-3'>
                        <p className='fs-6 mb-3 simple'>No worries, we will send you reset instructions</p>
                      </Row>
                      {/* <Form > */}
                      <Form id='resetPassword'>

                        <Row className="mb-3">
                          <label></label>
                          <OverlayTrigger
                            show={isPopoverVisible1}
                            placement="right"
                            overlay={popover}
                            trigger="manual"
                          >
                            <Form.Group as={Col} className="left-and-right-inner-addon1 input-container" >
                              <i className="logincolor fa fa-lock left1"></i>
                              <div className="pointer" onClick={(e) => {
                                  setShowPassword(!ShowPassword);
                                }}>
                                  {ShowPassword ? <Visibility /> : <VisibilityOff />}
                              </div>
                              <Form.Control type={ShowPassword ? "text":"Password"} id='ResetPassword' onChange={(e)=>{handlePasswordChange(e)}} placeholder="Enter Password" className="loginformcontrol form-input11 password required" name='password'
                                onFocus={handleTextboxFocus}
                                onBlur={handleTextboxBlur}
                                autoComplete='false'
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Please Enter The Password
                              </small>
                            </Form.Group>
                            </OverlayTrigger>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group as={Col} className="left-and-right-inner-addon1 input-container" >
                          <i className="logincolor fa fa-lock left1"></i>
                          <div className="pointer" onClick={(e) => {
                              setShowPassword1(!ShowPassword1);
                            }}>
                              <FontAwesomeIcon className='logincolor right1 ' icon={ShowPassword1 ? faEye : faEyeSlash} />
                          </div>
                            <Form.Control type={ShowPassword1 ? "text":"Password"} id="Confirm_reset" autoComplete='false' placeholder="Confirm Password" className="loginformcontrol form-input11 cpassword required" name='cpassword'  />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Please Enter The Confirm Password
                              </small>
                            <small className="responsiveFontLarge  d-none validation-msg medium ms-2 error_message_matchpass"> Password and Confirm Password do Not Match!</small>
                          </Form.Group>
                        </Row>


                        <Row className='justify-content-center justify-items-center d-flex'>
                          <Button className='w-auto px-5 uppercase ForgotPasswordButton fs-4 ' onClick={onSubmit}>Reset</Button>
                        </Row>
                      </Form>
                    </div >

                    <div id="beforeResetPassword" className={successReset === true ? "d-block" : "d-none"}>
                      <Row className='text-center mb-3'>
                        <p className='fs-5 mb-2 mt-5 simple boldfont'>Password Reset Successful!</p>
                      </Row>
                      <Row className='text-center mb-3'>
                        <p className='fs-6 mb-3 simple'>You can now use your new password to log in to your account.</p>
                      </Row>
                      <Row className='justify-content-center justify-items-center d-flex mb-5'>
                        <Button className='w-auto px-5 uppercase ForgotPasswordButton fs-4 mb-5' onClick={handleLogin} type="submit">Login</Button>
                      </Row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}


        </Container>
      </section>
      {/* <Footer></Footer> */}

    </>
  )
}