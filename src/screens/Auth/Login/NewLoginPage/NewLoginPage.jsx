import React, { useEffect, useState } from "react";
import { Button, Typography, Modal, Box, Grid, useTheme } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoginAvatar from "../../../../assets/images/LoginAvatar.svg";
import { jwtDecode } from "jwt-decode";
import { CommonConstants } from "../../../../Constants/common.constants";
import Loader from "../../../Loader/Loader";
import { nanoid } from "nanoid";
import RenderInput from "../../../../components/RenderInput/RenderInput";
import { checkIfExpired } from "../../../../utils/axiosIntercepters";
import { useLoginForm } from "../../../../forms/auth/login/loginForm";
import { CButton } from "../../../../components/MaterialUI/CButton";

const basicInputData = [
  {
    name: "email",
    label: "Email",
    required: true,
    type: "text",
    iconStart: <EmailIcon />,
    id: nanoid(),
    md: 12,
    sm: 12,
  },
  {
    name: "password",
    label: "Password",
    required: true,
    type: "password",
    iconEnd1: <Visibility />,
    iconEnd2: <VisibilityOff />,
    iconStart: <LockIcon />,
    id: nanoid(),
    md: 12,
    sm: 12,
  },
];

const NewLoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [UnameValue, setUnameValue] = useState("");
  const [loadervalue, setloadervalue] = useState(false);
  const [callNotification, setcallNotification] = useState(false);
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
  const [verfied, setverfied] = useState(false);

  const {
    formik,
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
  } = useLoginForm({});

  const props = {
    showPassword,
    showConfirmPassword,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    handleMouseDownPassword,
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSubmit();
    }
  };

  useEffect(() => {}, [loadervalue]);

  const handleSignUp = () => {
    window.scrollTo(0, 0);
    navigate("/signup");
  };

  const handleGoToProfile = () => {
    setSignupCompleteData("");
    navigate("/profile");
  };

  const handleSuccessClose = () => {
    setshowSuccess(false);
    navigate(signinData === true ? setChangePasswordAdmin(true) : "/");
  };

  const handleSuccessAdminClose = () => {
    setAdminShowSuccess(false);
    navigate("/dashboard");
  };

  const handleErrClose = () => {
    setshowSuccess(false);
  };

  const handleErrorCloseAdmin = () => {
    setAdminShowSuccess(false);
  };

  const handleErrorClose = () => {
    setshowError(false);
    localStorage.clear();
  };

  const setSignupCompleteData = (errorMessage, showPopup = false) => {
    setIsSignupCompleted((prevState) => ({
      ...prevState,
      error: errorMessage,
      showPopup: showPopup,
    }));
  };

  const checkValidation = (e) => {
    const email = e.target.value;
    if (email !== "" && !isEmail(email)) {
      e.target.classList.add("is-invalid");
    } else {
      e.target.classList.remove("is-invalid");
    }
  };

  const isEmail = (email) => {
    const regex =
      /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  };

  const handleErrorShow = () => setshowError(true);

  const onSubmit = async () => {
    try {
      if (verfied === true) {
        setRecaptchaErrorhandle(false);
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
          setloadervalue(true);
          const values2 = { email, password };
          const response = await axios.post(
            CommonConstants.BASE_URL + "/signin",
            values2
          );

          if (response.data.status === true) {
            let tokenData = await jwtDecode(response.data.token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            setcallNotification(true);
            setsigninData(tokenData.userDetails.isAdminResetPwd);

            const ipResponse = await fetch(
              "https://api.ipify.org/?format=json"
            );
            const ipData = await ipResponse.json();
            const osVersion = getOSVersion();
            const deviceData = {
              userId: tokenData.userDetails.id,
              client: "web",
              model: "",
              osVersion,
              appVersion: "",
              ip: ipData.ip,
              host: "",
              isFromSignup: false,
            };

            await axios.post(
              CommonConstants.BASE_URL + "/saveuserdeviceinfos",
              deviceData
            );
            localStorage.setItem("loginkey", "true");
            localStorage.setItem("Id", tokenData.userDetails.id);
            localStorage.setItem("Uname", tokenData.userDetails.firstName);
            localStorage.setItem(
              "login_name",
              `${tokenData.userDetails.firstName} ${tokenData.userDetails.lastName}`
            );
            localStorage.setItem(
              "VerifiedTransID",
              tokenData.userDetails.digitalVerifiedTransactionId
            );
            localStorage.setItem("rollID", tokenData.userDetails.roles[0].id);
            localStorage.setItem("idc", tokenData.userDetails.customerId);

            if (tokenData.userDetails.roles[0].id === 1) {
              handleSuccessAdminClose();
            } else {
              window.history.replaceState(null, null, window.location.href);
              if (tokenData.userDetails.isAdminResetPwd === true) {
                localStorage.setItem(
                  "AdminResetPermission",
                  tokenData.userDetails.isAdminResetPwd
                );
                setChangePasswordAdmin(true);
              } else if (
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
            setSuccesshandle(response.data.message);
            setloadervalue(false);
          } else if (response.data.status === false) {
            handleErrorShow();
            setErrorhandle(response.data.message);
            setloadervalue(false);
          }
        }
      } else {
        setRecaptchaErrorhandle(true);
      }
    } catch (err) {
      setloadervalue(false);
    }
  };

  const getOSVersion = () => {
    const userAgent = window.navigator.userAgent;
    const osVersionMatch = userAgent.match(
      /(Windows NT|Mac OS X|Android) ([\d._]+)/
    );
    return osVersionMatch ? osVersionMatch[0] : "";
  };

  const onChange = (value) => {
    setverfied(true);
    setRecaptchaErrorhandle(false);
  };

  const ForgotPassword = () => {
    window.scrollTo(0, 0);
    navigate("/forgotpassword");
  };

  const iconchnagehandle = () => {
    setShowPassword(!ShowPassword);
  };
  const [recapchaVal, setRecapchaVal] = useState(false);
  const handleRecaptcha = (val) => {
    if (val) setRecapchaVal(true);
  };
  const handleFormSubmit = () => {
    if (recapchaVal) {
      formik.handleSubmit();
    }
  };

  return (
    <>
      <section>
        {loadervalue && <Loader />}
       
        <Grid
          container
          spacing={3}
          width={"90%"}
          sx={{
            display: "flex",
            flexDirection: {
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            },
            justifyContent: "space-around",
            boxShadow: theme.palette.boxShadow.default,
            margin: "2rem auto",
            alignItems: "center",
          }}
          padding={"0rem 3rem"}
        >
          <Grid item xs={3} sm={4} md={5} lg={5}>
            <Box
              sx={{
                width: { lg: "450px", md: "350px", sm: "280px", xs: "240px" },
              }}
            >
              <img width="100%" src={LoginAvatar} alt="Login Avatar" />
            </Box>
          </Grid>

          {/* <div style={{ borderLeft: "1px solid red", height: "100%", width: "12px" }}></div> */}

          <Grid
            item
            xs={8}
            sm={7}
            md={5}
            lg={5}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                align="center"
                mb={2}
                sx={{
                  width: "fit-content",
                  borderRadius: "0 14px 14px 0",
                  background: theme.palette.button.primary,
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  "&:hover": {
                    background: theme.palette.hover.primary,
                  },
                }}
              >
                Welcome to LegalRemit
              </Typography>

              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="p"
                  sx={{
                    color: theme.palette.button.primary,
                    fontWeight: "800",
                    fontSize: "2rem",
                  }}
                >
                  Login
                </Typography>
              </Box>

              <Typography
                variant="body1"
                className="fs-6 mb-3 simple"
                align="center"
              >
                Enter your details to sign in into your account
              </Typography>
            </Box>
            <RenderInput
              inputField={basicInputData}
              formik={formik}
              passwordProps={props}
            />
            <Grid align="end">
              <Typography
                variant="p"
                sx={{ color: theme.palette.button.secondary }}
                onClick={() => navigate("/forgotpassword")}
              >
                Forgot Password?
              </Typography>
            </Grid>
            <Grid mt={2} align="center">
              <ReCAPTCHA
                onChange={handleRecaptcha}
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              />
            </Grid>
            <Grid mt={2} align="center">
              <Typography variant="body1" component="p">
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  style={{
                    textDecoration: "underline",
                    color: theme.palette.button.primary,
                    cursor: "pointer",
                  }}
                  href="https://policies.google.com/privacy?hl=en-GB"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  style={{
                    textDecoration: "underline",
                    color: theme.palette.button.primary,
                    cursor: "pointer",
                  }}
                  href="https://policies.google.com/terms?hl=en-GB"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </Typography>
            </Grid>

            <Grid mt={2}>
              <CButton
                buttonName={"Login"}
                OnClick={handleFormSubmit}
                variant={"contained"}
                fullWidth={"fullWidth"}
                Width={"-webkit-fill-available"}
                BGColor={theme.palette.button.primary}
                BGHover={`${theme.palette.hover.primary}`}
                disabled={!recapchaVal}
              />
            </Grid>
            <Grid mb={2} sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="p">
                Don't have an account?{" "}
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "1rem",
                    color: theme.palette.button.primary,
                    cursor: "pointer",
                  }}
                 
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Modal
          open={isSignupCompleted.showPopup}
          onClose={() => setSignupCompleteData("", false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal-container">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Signup Complete
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {isSignupCompleted.error}
            </Typography>
            <Button onClick={handleGoToProfile}>Go to Profile</Button>
          </Box>
        </Modal>
      </section>
    </>
  );
};
export default NewLoginPage;
