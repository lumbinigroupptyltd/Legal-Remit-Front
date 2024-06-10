import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  ListGroup,
} from "react-bootstrap";
import { CommonConstants } from "../../../../../Constants/common.constants";
import axios from "axios";
import "./ChangePassword.css";
import { useNavigate } from "react-router-dom";
import { isMobile, isTablet } from "react-device-detect";
import ModalComponent from "../../../../Dashbord/ModalComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ChangePassword.css";
import NavBar from "../../../../Home/Navbar/Navbar";
import Footer from "../../../../Home/Footer/Footer";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangePassword({ children, props }) {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isPopoverVisible1, setIsPopoverVisible1] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordValid1, setIsPasswordValid1] = useState(false);
  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [Changenewpassword, setChangenewpassword] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);
  const [Ch_ShowPassword, setCh_ShowPassword] = useState(false);
  const [C_ShowPassword, setC_ShowPassword] = useState(false);
  const [ChangeAdmin, setChangeAdmin] = useState(false);

  const [invalid, setinvalid] = useState(false);
  const handleTextboxFocus = () => {
    setIsPopoverVisible(true);
  };

  const handleTextboxBlur = () => {
    setIsPopoverVisible(false);
  };

  const handleTextboxFocus1 = () => {
    setIsPopoverVisible1(true);
  };

  const handleTextboxBlur1 = () => {
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
            {/[a-z]/.test(oldpassword) ? (
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
            {/[A-Z]/.test(oldpassword) ? (
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
            {/\d/.test(oldpassword) ? (
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
            {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(oldpassword) ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon style={{ color: "#ff0000" }} />
            )}
          </ListGroup.Item>
        </ListGroup>
      </Popover.Body>
    </Popover>
  );

  const popover1 = (
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
            {isPasswordValid1 ? (
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
            {/[a-z]/.test(newpassword) ? (
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
            {/[A-Z]/.test(newpassword) ? (
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
            {/\d/.test(newpassword) ? (
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
            {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(newpassword) ? (
              <CheckCircleIcon color="success" />
            ) : (
              <CancelIcon style={{ color: "#ff0000" }} />
            )}
          </ListGroup.Item>
        </ListGroup>
      </Popover.Body>
    </Popover>
  );

  const handleoldPassword = (event) => {
    setoldpassword(event.target.value);
    const password = event.target.value;
    setIsPasswordValid(event.target.value.length > 7 ? true : false);
    // const isValid =
    //   password.length >= 8 &&
    //   /[a-z]/.test(password) &&
    //   /[A-Z]/.test(password) &&
    //   /\d/.test(password);
  };

  const handleNewPassword = (event) => {
    setnewpassword(event.target.value);
    const password = event.target.value;
    setIsPasswordValid1(event.target.value.length > 7 ? true : false);
    // const isValid =
    //   password.length >= 8 &&
    //   /[a-z]/.test(password) &&
    //   /[A-Z]/.test(password) &&
    //   /\d/.test(password);
    // setIsPasswordValid1(isValid);
  };

  const navigate = useNavigate();

  useEffect(() => {
  
  }, []);

  const handleSignUp = () => {
    // navigate('/signup', {replace: true})
    window.scrollTo(0, 0);
  };

  const [Successhandle, setSuccesshandle] = useState(null);
  const [Errorhandle, setErrorhandle] = useState("");

  const [showSuccess, setshowSuccess] = useState(false);
  const [showError, setshowError] = useState(false);

  const handleSuccessClose = () => {
    setshowSuccess(false);
    // navigate('/')
  };
  const handleSuccessShow = () => setshowSuccess(true);

  const handleErrorClose = () => setshowError(false);
  const handleErrorShow = () => setshowError(true);

  const onSubmit = async (values) => {
    // debugger
    var OldPassword = document.getElementById("oldpassword").value;
    var NewPassword = document.getElementById("newpassword").value;
    var ConfirmNewPassword =
      document.getElementById("Confirmnewpassword").value;
    if (
      !OldPassword.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;\"'<,>.?\/\\])(?!.*\s).{8,}$/
      )
    ) {
      setinvalid(true);
    } else if (
      !NewPassword.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;\"'<,>.?\/\\])(?!.*\s).{8,}$/
      )
    ) {
      setinvalid(true);
    } else if (NewPassword != ConfirmNewPassword) {
      setinvalid(true);
    } else {
      try {
        const Resetdata = {
          userId: localStorage.getItem("Id"),
          password: OldPassword,
          newPassword: NewPassword,
        };
        const response = await axios.post(
          CommonConstants.BASE_URL + "/changepassword",
          Resetdata
        );
        // debugger
        if (response.data.status === true) {
          // setSuccesshandle(response.data.message);
          if (localStorage.getItem("AdminResetPermission")) {
            setChangeAdmin(localStorage.getItem("AdminResetPermission"));
            localStorage.removeItem("AdminResetPermission");
          }
          handleResetSuccess();
        } else if (response.data.status == false) {
          // setoldpassword(true)
          // setErrorhandle(response.data.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const [verfied, setverfied] = useState(false);

  const onChange = (value) => {
   
    setverfied(true);
  };

  const [successReset, setsuccessReset] = useState(false);

  const handleResetSuccess = () => {
    setsuccessReset(true);
  };

  const handleLogin = () => {
    const link =
      "https://play.google.com/store/apps/details?id=com.view9.legalremit&hl=en&gl=US&pli=1"; //Enter link address

    // if ((isMobile || isTablet) &&(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i)) && window.navigator.standalone) { //have to check as window.navigator.standalone works for ios only
    // if ((isMobile || isTablet) && window.navigator.standalone) { //It is for ios only
    if (
      (isMobile || isTablet) &&
      (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/iPhone|iPad|iPod/i))
    ) {
      
      toast.success("Mobile/Tablet detected");
      window.location.href = link; // redirect to custom link if mobile app is installed
    } else {
      toast.success("No Mobile/Tablet detected");
      navigate("/login"); // continue on web if mobile app is not installed
    }
  };

  const options2 = {
    loop: true,
    margin: 10,
    items: 2,
    autoplay: true,
    nav: false,
    dots: false,
  };
  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage p-5">
            {/* <h2 className="bolder purpleText text-center">Change Password</h2> */}

            <Row>
              <div className=" row d-flex">
                <div className="col-lg-12 p-3 justify-content-center d-flex bg-white">
                  <div className="">
                    <div className="login">
                      <div className=" ">
                        <Row className="text-center">
                          <h1 className="Loginheading bolder">
                            Change Password
                          </h1>
                        </Row>

                        <ToastContainer />
                        <div id="beforeResetPassword">
                          <Row className="text-center mb-3">
                            <p className="fs-6 mb-3 simple">
                              No worries, we will send you reset instructions
                            </p>
                          </Row>
                          {/* <Form > */}
                          <Form id="resetPassword">
                            <Row className="mb-3">
                              <label></label>
                              <Form.Group
                                as={Col}
                                className="left-and-right-inner-addon1 input-container"
                              >
                                <i className="logincolor fa fa-lock left1"></i>
                                <div
                                  className="pointer"
                                  onClick={(e) => {
                                    setShowPassword(!ShowPassword);
                                  }}
                                >
                                  {ShowPassword ? (
                                    <Visibility className="logincolor" />
                                  ) : (
                                    <VisibilityOff className="logincolor" />
                                  )}
                                </div>
                                <Form.Control
                                  type={ShowPassword ? "text" : "Password"}
                                  id="oldpassword"
                                  placeholder="Old Password"
                                  className="loginformcontrol required password form-input11"
                                  name="password"
                                  onChange={(e) => {
                                    handleoldPassword(e);
                                  }}
                                  onFocus={handleTextboxFocus}
                                  onBlur={(e) => {
                                    handleTextboxBlur(e);
                                  }}
                                />
                                {invalid && !oldpassword && (
                                  <small className="ps-2 text-danger">
                                    Enter your old password{" "}
                                  </small>
                                )}
                                {invalid &&
                                  oldpassword != "" &&
                                  !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;\"'<,>.?\/\\])(?!.*\s).{8,}$/.test(
                                    oldpassword
                                  ) && (
                                    <small className="ps-2 text-danger">
                                      your old password is incorrect.
                                    </small>
                                  )}
                              </Form.Group>
                            </Row>

                            <Row className="mb-3">
                              <OverlayTrigger
                                show={isPopoverVisible1}
                                placement="right"
                                overlay={popover1}
                                trigger="manual"
                              >
                                <Form.Group
                                  as={Col}
                                  className="left-and-right-inner-addon1 input-container"
                                >
                                  <i className="logincolor fa fa-lock left1"></i>
                                  <div
                                    className="pointer"
                                    onClick={(e) => {
                                      setCh_ShowPassword(!Ch_ShowPassword);
                                    }}
                                  >
                                    {Ch_ShowPassword ? (
                                      <Visibility className="logincolor" />
                                    ) : (
                                      <VisibilityOff className="logincolor" />
                                    )}
                                  </div>
                                  <Form.Control
                                    type={Ch_ShowPassword ? "text" : "Password"}
                                    placeholder="New Password"
                                    id="newpassword"
                                    className="loginformcontrol required form-input11 password"
                                    name="password"
                                    onChange={(e) => {
                                      handleNewPassword(e);
                                    }}
                                    onFocus={handleTextboxFocus1}
                                    onBlur={handleTextboxBlur1}
                                  />

                                  {invalid && !newpassword && (
                                    <small className="ps-2 text-danger">
                                      Enter new password{" "}
                                    </small>
                                  )}
                                  {invalid &&
                                    newpassword != "" &&
                                    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;\"'<,>.?\/\\])(?!.*\s).{8,}$/.test(
                                      newpassword
                                    ) && (
                                      <small className="ps-2 text-danger">
                                        Your password pattern is incorrect.
                                      </small>
                                    )}
                                </Form.Group>
                              </OverlayTrigger>
                            </Row>

                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                className="left-and-right-inner-addon1 input-container"
                              >
                                <i className="logincolor fa fa-lock left1"></i>
                                <div
                                  className="pointer"
                                  onClick={(e) => {
                                    setC_ShowPassword(!C_ShowPassword);
                                  }}
                                >
                                  {C_ShowPassword ? (
                                    <Visibility className="logincolor" />
                                  ) : (
                                    <VisibilityOff className="logincolor" />
                                  )}
                                </div>

                                <Form.Control
                                  type={C_ShowPassword ? "text" : "Password"}
                                  id="Confirmnewpassword"
                                  placeholder="Confirm New Password"
                                  onChange={(e) => {
                                    setChangenewpassword(e.target.value);
                                  }}
                                  className="loginformcontrol form-input11 cpassword required"
                                  name="cpassword"
                                />
                                <div>
                                  {invalid && !Changenewpassword && (
                                    <small className="ps-2 text-danger">
                                      Password and Confirm Password do Not Match{" "}
                                    </small>
                                  )}
                                  {invalid &&
                                    Changenewpassword != "" &&
                                    !Changenewpassword == newpassword && (
                                      <small className="ps-2 text-danger">
                                        Password and Confirm Password do Not
                                        Match
                                      </small>
                                    )}
                                </div>
                              </Form.Group>
                            </Row>

                            <Row className="justify-content-center justify-items-center d-flex">
                              <Button
                                className="w-auto px-5 uppercase ForgotPasswordButton  "
                                onClick={onSubmit}
                              >
                                Change
                              </Button>
                            </Row>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </Container>
        <Footer></Footer>
        <ModalComponent
          show={successReset}
          title11={"Password Change Successfully..!"}
          onHide={(e) => {
            if (ChangeAdmin == "true") {
              localStorage.clear();
              sessionStorage.clear();
              navigate("/login");
              setsuccessReset(false);
            } else {
              setsuccessReset(false);
              navigate("/settings");
            }
          }}
        />
      </section>
    </>
  );
}
