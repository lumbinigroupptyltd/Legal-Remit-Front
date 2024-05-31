import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {
  Box,
  Paper,
  Modal,
  Button,
  Checkbox,
  FormControlLabel,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import vectorModal from "../../assets/images/moneyVector.svg";
import { Row, Col, Image, Badge } from "react-bootstrap";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import CampaignIcon from "@mui/icons-material/Campaign";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Form } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
// import styled from "styled-components";
import { styled } from '@mui/system';


const label = { inputProps: { "aria-label": "Switch demo" } };

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function UserManagement({ individualuserData }) {
  const [openConfirmModule, setOpenConfirmModule] = useState(false);
  const [loadervalue, setloadervalue] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModa1, setOpenModa1] = useState(false);
  const [openModa2, setOpenModa2] = useState(false);
  const [openModa3, setOpenModa3] = useState(false);
  const [openModa4, setOpenModa4] = useState(false);
  const [openModa5, setOpenModa5] = useState(false);
  const [paymentMethodIdToToggle, setPaymentMethodIdToToggle] = useState(null);
  const [selectedValue, setSeletedValue] = useState("");
  const [selectedChecked, setSelectedChecked] = useState(false);
  const [pendingToggles, setPendingToggles] = useState({});
  const [userSetting, setUserSettings] = useState({
    "Push notification": false,
    "Email notification": false,
    "SMS notification": false,
    "Receive promotional content": false,
    "Recipient related notification": false,
  });
  // const [paymentMethodToggles, setPaymentMethodToggles] = useState({
  //   "Bank Transfer": false,
  //   "Pay To": false,
  //   "Pay Id": false,
  //   "Debit Card": false,
  //   "Credit Card": false,
  // });

  const [paymentMethodToggles, setPaymentMethodToggles] = useState({}); // To manage the checked state of switches
  const [pendingToggle, setPendingToggle] = useState({}); // To manage pending toggles before confirmation

  const [paymentMethodId, setPaymentMethodId] = useState();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isPhoneVerified, setPhoneIsVerified] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [spacing, setSpacing] = React.useState(2);
  const [paymantMethodData, setPaymantMethodData] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [message, setMessage] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [PaymnetChecked, setPaymnetChecked] = useState(false);
  const [userPaymentMethodsData, setUserPaymentMethodsData] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [sendNotifi, setSendNotifi] = useState(true);
  const [sendPhone, setsendPhone] = useState(false);

  function generateRandomPassword(length) {
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const digitChars = "0123456789";
    const specialChars = "!@#$%^&*()_-+=<>?/[]{}|";

    const allChars =
      uppercaseChars + lowercaseChars + digitChars + specialChars;

    let password = "";
    // Ensure at least one character from each category
    password +=
      uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];
    password +=
      lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)];
    password += digitChars[Math.floor(Math.random() * digitChars.length)];
    password += specialChars[Math.floor(Math.random() * specialChars.length)];

    // Generate the remaining characters
    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    // Shuffle the characters to randomize the password
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    return password;
  }

  function validatePassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const isValid = validatePassword(newPassword);
    setPasswordValid(isValid);

    if (isValid) {
      setPasswordMessage("Password meets the criteria.");
    } else {
      setPasswordMessage(
        "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit."
      );
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(newConfirmPassword === password);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility1 = () => {
    setPasswordVisible1(!passwordVisible1);
  };
  const handleChange = (event) => {
    setOpenModal(true);
    const SelectedValue = event.target.value;
    const selectedChecked = event.target.checked;

    setUserSettings((prevSettings) => ({
      ...prevSettings,
      [SelectedValue]: selectedChecked,
    }));
  };

  const handleClickOk = async () => {
    const payload = {
      userId: individualuserData,
      isPushNotification: userSetting["Push notification"],
      isEmailNotification: userSetting["Email notification"],
      isSmsNotification: userSetting["SMS notification"],
      isReceivePromotionalContent: userSetting["Receive promotional content"],
      isRecipientRelatedNotification:
        userSetting["Recipient related notification"],
      isPinAuth: false,
      isExchangeRateAlert: false,
    };

    try {
      const response = await axios.post(
        CommonConstants.BASE_URL + "/savesettings",
        payload
      );

      if (response.data.status === true) {
        setOpenModal(false);
        getUsersSetting();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const jsx = `
<Grid container spacing={${spacing}}>
`;

  const [key, setKey] = useState("home");

  const getPaymentMethods = async () => {
    try {
      // const response1 = await axios.get(CommonConstants.BASE_URL + '/getallpaymentmethodname');
      const getUserInfo = await axios.post(
        CommonConstants.BASE_URL + "/getuserinfobyid",
        { id: individualuserData }
      );
      if (getUserInfo.data.status == true) {
        const countryID = getUserInfo.data.data.countryId;
        const payload = {
          fromCountryId: countryID,
          userId: individualuserData,
        };
        const getAllPaymentMethod = await axios.post(
          CommonConstants.BASE_URL + "/getallactivepaymentmethods",
          payload
        );
        setPaymantMethodData(getAllPaymentMethod.data.data);
      }

      // const paymentMethodsData = response1.data.data;
      // setPaymantMethodData(paymentMethodsData);

      const formdata = new FormData();
      formdata.append("userId", individualuserData);
      const response2 = await axios.post(
        CommonConstants.BASE_URL + "/getpaymentmthodbyuserid",
        formdata
      );
      const userPaymentMethodsData = response2.data.data;
      // Initialize the state with an object where paymentMethodId is the key
      const initialToggles = {};
      userPaymentMethodsData.forEach((method) => {
        initialToggles[method.paymentMethodId] = method.enabled;
      });
      setPaymentMethodToggles(initialToggles);

      setUserPaymentMethodsData(userPaymentMethodsData);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsersSetting = async () => {
    setloadervalue(true);
    await axios
      .post(CommonConstants.BASE_URL + "/getsettingbyuserid", {
        userId: individualuserData,
      })
      .then((response) => {
        const fetchedUserSettings = response.data.data;

        // Map the fetched settings to the userSetting state
        setUserSettings({
          "Push notification": fetchedUserSettings?.isPushNotification,
          "Email notification": fetchedUserSettings?.isEmailNotification,
          "SMS notification": fetchedUserSettings?.isSmsNotification,
          "Receive promotional content":
            fetchedUserSettings?.isReceivePromotionalContent,
          "Recipient related notification":
            fetchedUserSettings?.isRecipientRelatedNotification,
        });
      })
      .catch((error) => console.log(error));
    setloadervalue(false);
  };

  const handleOpenModel = (id) => {
    setPaymentMethodIdToToggle(id); // Add this state to hold the id of the payment method
    setOpenConfirmModule(true);
  };

  const handlePaymentMethodToggle = (paymentMethodId, checked) => {
    setPaymentMethodId(paymentMethodId);
    setPaymnetChecked(checked);

    // Set pending toggle state for the specific payment method
    setPendingToggle((prevPendingToggle) => ({
      ...prevPendingToggle,
      [paymentMethodId]: checked,
    }));

    setOpenConfirmModule(true); // Open the confirmation modal
  };

  const handleModalConfirm = async () => {
    try {
      for (const methodId in pendingToggle) {
        if (pendingToggle[methodId] !== paymentMethodToggles[methodId]) {
          const payload = {
            userId: individualuserData,
            paymentMethodId: methodId,
            enabled: pendingToggle[methodId],
            createdBy: localStorage.getItem("Id"),
            updatedBy: localStorage.getItem("Id"),
          };

          const response = await axios.post(
            CommonConstants.BASE_URL + "/saveuserpaymentmethod",
            payload
          );

          if (response.data.status === true) {
            setPaymentMethodToggles((prevToggles) => ({
              ...prevToggles,
              [methodId]: pendingToggle[methodId],
            }));
            getPaymentMethods();
          }
        }
      }
      setOpenConfirmModule(false); // Close the confirmation modal
      setPendingToggle({}); // Reset the pending toggle state
    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = async () => {
    setloadervalue(true);
    if (individualuserData !== "undefined" || individualuserData !== "") {
      const userPayLoad = new FormData();
      userPayLoad.append("userId", individualuserData);
      const userResponse = await axios.post(
        `${CommonConstants.BASE_URL}/getusersummery`,
        userPayLoad
      );
      if (userResponse.data.status == true) {
        const responseData = userResponse?.data?.data?.email;
        setUserEmail(responseData);
      }
    }
    setloadervalue(false);
  };
  const handleEmailBlur = async () => {
    setloadervalue(true);
    try {
      const payload = new FormData();
      payload.append("userId", individualuserData);
      payload.append("email", email);

      const response = await axios.post(
        CommonConstants.BASE_URL + "/sendemailverification",
        payload
      );
      if (response.data.status === true) {
        // setIsVerified(true);
        setModalShow(true);
        setMessage("Verification link sent to your email.");
      } else {
        setIsVerified(false);
      }
    } catch (error) {
      console.error("Error sending email verification:", error);
    }
    setloadervalue(false);
  };

  const getUsersCerd = async () => {
    try {
      await axios
        .post(CommonConstants.BASE_URL + "/getusercredentialsdetails", {
          userId: individualuserData,
        })
        .then((responce) => {
          const userData = responce.data.data;
          setEmail(userData?.email);
          setIsVerified(userData?.isEmailVerified);
          setPhoneNumber(userData?.phone);
          setPhoneIsVerified(userData?.isPhoneVerified);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateClick = async () => {
    if (passwordsMatch && passwordValid) {
      const requestData = {
        userId: individualuserData,
        password: password !== "" ? password : null,
        isEmail: sendNotifi,
        isSMs: sendPhone,
      };
      try {
        setloadervalue(true);
        const response = await axios.post(
          CommonConstants.BASE_URL + "/updateusercredentials",
          requestData
        );
        if (response.data.status == true) {
          setModalShow(true);
          setMessage(response.data.message);
        }
        setloadervalue(false);
      } catch (error) {
        console.error("Error updating password:", error);
      }
    } else {
      console.log("Passwords do not match. Cannot perform update action.");
    }
  };

  const handlePhoneNumberBlur = async () => {
    try {
      if (phoneNumber.trim() === "") {
        return;
      }
      if (phoneNumber.length < 9 || phoneNumber.length > 10) {
        setModalShow(true);
        setMessage("Please enter valid mobile number");
      } else {
        const requsetData = new FormData();
        requsetData.append("userId", individualuserData);
        requsetData.append("phone", phoneNumber);
        requsetData.append("phoneCode", 91);

        const response = await axios.post(
          CommonConstants.BASE_URL + "/sendotpfromadmin",
          requsetData
        );
        if (response.data.statuscode == 200) {
          setModalShow(true);
          setMessage(response.data.message);
          setIsOtpSent(true);
          setOtp(response.data.otp);
        }
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const handleOtpChange = async (e) => {
    // const opt = e.target.value;
    setOtp(e.target.value);
    const requsetData = new FormData();
    requsetData.append("userId", individualuserData);
    requsetData.append("phone", phoneNumber);
    requsetData.append("otp", otp);
    const response = await axios.post(
      CommonConstants.BASE_URL + "/verifyotpbyphonefromadmin",
      requsetData
    );
    if (response.data.status == true) {
      setModalShow(true);
      setMessage(response.data.message);
    }
  };

  const handleClose = () => {
    // setPassword('');
    // setConfirmPassword('');
    setModalShow(false);
    getUsersCerd();
  };
  useEffect(() => {
    getPaymentMethods();
    getUsersSetting();
    getUsersCerd();
    getUserData();
    const generatedPassword = generateRandomPassword(8);
    setPassword(generatedPassword);
    setConfirmPassword(generatedPassword);
  }, [individualuserData, isVerified]);
  return (
    <div>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid px-0">
        <div className="">
          <Tabs
            defaultActiveKey="info"
            id="uncontrolled-tab-example"
            className="mainUl mobilemainUL border-bottom "
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="home" title=" Credential Management">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      tabIndex={-1}
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      // onBlur={handleEmailBlur}
                    />
                    <Badge
                      className="mainBadge purpleBackground d-block h-100 pointer  capitalize "
                      onClick={() => handleEmailBlur()}
                    >
                      {" "}
                      <small className="mainBadge medium d-flex align-items-center text-white">
                        Send Mail
                      </small>
                    </Badge>
                  </div>
                  <Form.Text className="justify-content-end respoChildFooter mt-2  d-flex align-items-center">
                    {isVerified ? (
                      <small
                        mall
                        className="medium d-flex align-items-center px-2 py-1 rounded-4 bg-success text-white"
                      >
                        <i className="fa fa-check-circle pe-2" /> Verified
                      </small>
                    ) : (
                      <small className="medium d-flex align-items-center px-2 py-1 rounded-4 bg-danger text-white">
                        <i className="fa fa-exclamation-triangle pe-2" /> Not
                        Verified
                      </small>
                    )}
                    &nbsp;&nbsp;
                    <small
                      className="text-primary medium"
                      onClick={() => handleEmailBlur()}
                    >
                      Resend Email ?
                    </small>
                  </Form.Text>
                </Form.Group>
                <div>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Mobile</Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        tabIndex={-1}
                        type="number"
                        placeholder="Enter Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        // onBlur={handlePhoneNumberBlur} // Call the function on blur
                      />
                      <Badge
                        className="mainBadge purpleBackground d-block h-100 pointer  capitalize "
                        onClick={() => handlePhoneNumberBlur()}
                      >
                        <small className="mainBadge medium d-flex align-items-center text-white">
                          Send OTP
                        </small>
                      </Badge>
                    </div>
                    <Form.Text className="mt-2 respoChildFooter justify-content-end d-flex align-items-center">
                      {isPhoneVerified ? (
                        <small className="medium d-flex align-items-center px-2 py-1 rounded-4 bg-success text-white">
                          <i className="fa fa-check-circle pe-2" /> Verified
                        </small>
                      ) : (
                        <small className="medium d-flex align-items-center px-2 py-1 rounded-4 bg-danger text-white">
                          <i className="fa fa-exclamation-triangle pe-2" /> Not
                          Verified
                        </small>
                      )}{" "}
                      &nbsp;&nbsp;{" "}
                      <small
                        className="text-primary medium"
                        onClick={() => handlePhoneNumberBlur()}
                      >
                        Resend OTP ?
                      </small>
                    </Form.Text>
                    {isOtpSent ? (
                      <Form.Control
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        // onChange={handleOtpChange}
                        onBlur={handleOtpChange}
                        className="mt-3"
                      />
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </div>
                <div>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <div
                        className="positionEyeBtn"
                        onClick={() => togglePasswordVisibility()}
                      >
                        <i
                          className={`pointer  ${
                            passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"
                          }`}
                        />
                      </div>
                    </div>
                    <Form.Text
                      className={passwordValid ? "text-success" : "text-danger"}
                    >
                      {passwordMessage}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formBasicConfirmPassword"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type={passwordVisible1 ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                      />
                      <div
                        className="positionEyeBtn"
                        onClick={() => togglePasswordVisibility1()}
                      >
                        <i
                          className={`pointer  ${
                            passwordVisible ? "fa fa-eye-slash" : "fa fa-eye"
                          }`}
                        />
                      </div>
                    </div>
                    {!passwordsMatch && (
                      <Form.Text className="text-danger">
                        Passwords do not match.
                      </Form.Text>
                    )}
                  </Form.Group>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sendNotifi}
                        onChange={(e) => setSendNotifi(e.target.checked)}
                      />
                    }
                    label="Send In Email"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sendPhone}
                        onChange={(e) => setsendPhone(e.target.checked)}
                      />
                    }
                    label="Send In  Phone"
                  />
                </div>
                <Button
                  className="m-0 purpleBackground capitalize mx-3 w-auto px-3 d-flex btnINDIUser"
                  variant="contained"
                  onClick={
                    passwordsMatch && password !== "" && confirmPassword !== ""
                      ? handleUpdateClick
                      : null
                  }
                >
                  Update
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="profile" title="Payment Method Management">
              {/* <h3 className=" normal">Payment Methods</h3> */}
              <Row className="my-4 mt-0 respoChildFooter">
                {paymantMethodData?.map((row) => {
                  const paymentMethodId = row.id;
                  const isActive = userPaymentMethodsData.some(
                    (method) => method.paymentMethodId === paymentMethodId
                  );

                  return (
                    <Col className="pt-2 col-lg-4" key={paymentMethodId}>
                      <div className="d-flex align-items-center flex-column shadow-sm rounded-3">
                        <Switch
                          className="d-flex ms-auto"
                          checked={
                            paymentMethodToggles[paymentMethodId] || row.enabled
                          }
                          onChange={(event) =>
                            handlePaymentMethodToggle(
                              paymentMethodId,
                              event.target.checked
                            )
                          }
                          inputProps={{ "aria-label": "Toggle modal" }}
                        />
                        <Image
                          src={CommonConstants.BASE_URL + row.logo}
                          alt={`${row.name} logo`}
                          height={200}
                          width={200}
                          className=""
                        />
                        <h5 className="payName py-4">{row.name}</h5>
                      </div>
                    </Col>
                  );
                })}
              </Row>

              {/* <Grid container spacing={5} className="">
                  <Grid item xs={4}>
                    <Item className="d-flex align-items-center flex-column">
                      <Switch className="d-flex ms-auto" {...label} />
                      <img
                        src={trans}
                        className="img-fluid"
                        height="130"
                        width="130"
                      />
                      <h5 className="payName py-4">Bank Transfer</h5>
                    </Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Item className="d-flex align-items-center flex-column">
                      <Switch className="d-flex ms-auto" {...label} />
                      <img
                        src={payid}
                        className="img-fluid"
                        height="230"
                        width="230"
                      />
                      <h5 className="payName py-3">PayID</h5>
                    </Item>
                  </Grid>
                </Grid> */}

              <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 3,
                  }}
                >
                  <img
                    src={vectorModal}
                    height={200}
                    width={200}
                    className="d-block m-auto"
                  />
                  <h5 className="text-center">
                    Are you sure want to change this current status ?
                  </h5>
                  {/* Add modal content here */}
                  <div className="d-flex py-4 px-4">
                    <Button
                      className="m-0 purpleBackground capitalize mx-3"
                      variant="contained"
                      onClick={() => handleClickOk()}
                    >
                      Ok
                    </Button>

                    <Button
                      className="m-0 capitalize purpleBorder purpleText mx-3"
                      variant="outlined"
                      onClick={() => setOpenModal(false)}
                    >
                      Close
                    </Button>
                  </div>
                </Box>
              </Modal>
            </Tab>
            <Tab eventKey="contact" title="Notification Management">
              <Item className="my-3">
                <List
                  className="ddList"
                  sx={{ width: "100%", bgcolor: "background.paper" }}
                >
                  <ListItem
                    alignItems="flex-center"
                    className="respoChildFooter"
                  >
                    <ListItemAvatar>
                      <NotificationsActiveIcon
                        color="primary"
                        fontSize="large"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            className="d-flex me-auto ps-2"
                            sx={{ display: "inline", textAlign: "start" }}
                            component="div"
                            variant="body2"
                            color="text.primary"
                          >
                            Push notification
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <Switch
                      className="dflexSwitch"
                      {...label}
                      value="Push notification"
                      checked={userSetting["Push notification"]}
                      onChange={(e) => handleChange(e)}
                      inputProps={{ "aria-label": "Toggle modal" }}
                    />
                  </ListItem>
                </List>
              </Item>
              <Item className="my-3">
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  <ListItem
                    alignItems="flex-center"
                    className="respoChildFooter"
                  >
                    <ListItemAvatar>
                      <MarkEmailUnreadIcon color="primary" fontSize="large" />
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            className="d-flex me-auto ps-2"
                            sx={{ display: "inline", textAlign: "start" }}
                            component="div"
                            variant="body2"
                            color="text.primary"
                          >
                            Email notification
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <Switch
                      className="dflexSwitch"
                      {...label}
                      checked={userSetting["Email notification"]}
                      value="Email notification"
                      onChange={(e) => handleChange(e)}
                      inputProps={{ "aria-label": "Toggle modal" }}
                    />
                  </ListItem>
                </List>
              </Item>
              <Item className="my-3">
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  <ListItem
                    alignItems="flex-center"
                    className="respoChildFooter"
                  >
                    <ListItemAvatar>
                      <MarkUnreadChatAltIcon color="primary" fontSize="large" />
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            className="d-flex me-auto ps-2"
                            sx={{ display: "inline", textAlign: "start" }}
                            component="div"
                            variant="body2"
                            color="text.primary"
                          >
                            SMS notification
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <Switch
                      className="dflexSwitch"
                      {...label}
                      checked={userSetting["SMS notification"]}
                      value="SMS notification"
                      onChange={(e) => handleChange(e)}
                      inputProps={{ "aria-label": "Toggle modal" }}
                    />
                  </ListItem>
                </List>
              </Item>
              <Item className="my-3">
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  <ListItem
                    alignItems="flex-center"
                    className="respoChildFooter"
                  >
                    <ListItemAvatar>
                      <AnnouncementIcon color="primary" fontSize="large" />
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            className="d-flex me-auto ps-2"
                            sx={{ display: "inline", textAlign: "start" }}
                            component="div"
                            variant="body2"
                            color="text.primary"
                          >
                            Receive promotional content
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <Switch
                      className="dflexSwitch"
                      {...label}
                      checked={userSetting["Receive promotional content"]}
                      value="Receive promotional content"
                      onChange={(e) => handleChange(e)}
                      inputProps={{ "aria-label": "Toggle modal" }}
                    />
                  </ListItem>
                </List>
              </Item>
              <Item className="my-3">
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  <ListItem
                    alignItems="flex-center"
                    className="respoChildFooter"
                  >
                    <ListItemAvatar>
                      <CampaignIcon color="primary" fontSize="large" />
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <Typography
                            className="d-flex me-auto ps-2"
                            sx={{ display: "inline", textAlign: "start" }}
                            component="div"
                            variant="body2"
                            color="text.primary"
                          >
                            Recipient related notification
                          </Typography>
                        </React.Fragment>
                      }
                    />
                    <Switch
                      className="dflexSwitch"
                      {...label}
                      checked={userSetting["Recipient related notification"]}
                      value="Recipient related notification"
                      onChange={(e) => handleChange(e)}
                      inputProps={{ "aria-label": "Toggle modal" }}
                    />
                  </ListItem>
                </List>
              </Item>
            </Tab>
          </Tabs>

          <Modal
            open={openConfirmModule}
            onClose={() => setOpenConfirmModule(false)}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 3,
              }}
            >
              <img
                src={vectorModal}
                height={200}
                width={200}
                className="d-block m-auto"
              />
              <h5 className="text-center">
                Are you sure want to change this current status ?
              </h5>
              <div className="d-flex py-4 px-4">
                <Button
                  className="m-0 purpleBackground capitalize mx-3"
                  variant="contained"
                  onClick={() => {
                    // Apply the pending toggle and close the confirmation modal
                    setPaymentMethodToggles((prevToggles) => ({
                      ...prevToggles,
                      [paymentMethodId]: PaymnetChecked,
                    }));
                    handleModalConfirm();
                  }}
                >
                  Ok
                </Button>

                <Button
                  className="m-0 capitalize purpleBorder purpleText mx-3"
                  variant="outlined"
                  onClick={() => {
                    setOpenConfirmModule(false);
                    // Close the confirmation modal without changing the toggle
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Box>
          </Modal>

          <ModalComponent
            show={modalShow}
            title11={message}
            onHide={() => handleClose()}
          />
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
