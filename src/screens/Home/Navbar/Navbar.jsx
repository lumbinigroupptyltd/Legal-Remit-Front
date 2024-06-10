import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Dropdown } from "react-bootstrap";
import Button from "@mui/material/Button";
import logoLR from "../../../assets/images/Logo-LR.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../../assets/assets/scss/pages/Nabvar.css";
import profile from "../../../assets/images/gg_profile.svg";
import directional from "../../../assets/images/grommet-icons_transaction.svg";
import gift from "../../../assets/images/fluent_reward-12-regular.svg";
import statement from "../../../assets/images/statement.svg";
import recipients from "../../../assets/images/recipients.svg";
import bell from "../../../assets/images/ion_notifcations.svg";
import settings from "../../../assets/images/settings.svg";
import logout from "../../../assets/images/logout.svg";
import dashboard from "../../../assets/images/dashboard.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { CommonConstants } from "../../../Constants/common.constants";
import ModalComponentPopup from "../../Dashbord/ModalComponentPopup";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function NavBar({ route }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const [DuplicateUserPopUp, setDuplicateUserPopUp] = useState(false);
  const [DuplicateUserPopUpBA, setDuplicateUserPopUpBA] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [VerifyRefralPOPUP, setVerifyRefralPOPUP] = useState(false);
  let AdminResetPassword = localStorage.getItem("AdminResetPermission")
  const handleRedirectProfile = () => {
    navigate({
      pathname: "/profile",
      state: {
        Blank_Details: SendMoneyDetailsStatus,
        Document_Blank: SendMoneyDocumentStatus,
      },
    });
    setVerifyRefralPOPUP(false);
  };

  const [showMenu, setShowMenu] = useState(false);

  const handleClick1 = (event) => {
   
    setShowMenu(!showMenu);
    
  };

  const handleCopyClick = () => {
    const tempInput = document.createElement("input");
    tempInput.value = "0419850130";
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  const handleCopyClick2 = () => {
    const tempInput = document.createElement("input");
    tempInput.value = "info@legalremit.com";
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    const mailtoLink = `mailto:info@legalremit.com`;
    window.location.href = mailtoLink;
  };

  const [modalShowPrChange, setModalShowPrChange] = useState(false);

  const [NavbarMenu, setNavbarMenu] = useState("");
  const [loadervalue, setloadervalue] = useState(false);

  const handlePrchangePopupCancle = () => {
    setModalShowPrChange(false);
  };

  const confirmClick = async () => {
    setModalShowPrChange(true);
  };
  const handleClickHome = () => {
  
    navigate("/");
    window.scrollTo(0, 0);
  };


  const handleClickStatement = () => {
   
    navigate(AdminResetPassword ? "/changepassword" : "/statement");
    window.scrollTo(0, 0);
  };

  const handleClickReferal = () => {
    navigate(AdminResetPassword ? "/changepassword" : "/referal");
    window.scrollTo(0, 0);
  };

  const handleClickRecipients = () => {
    navigate(AdminResetPassword ? "/changepassword" : "/recipients");
    window.scrollTo(0, 0);
  };

  const handleClickTransactions = () => {
    navigate(AdminResetPassword ? "/changepassword" : "/transactions");
    window.scrollTo(0, 0);
  };

  const handlelogouttt = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
    setModalShowPrChange(false);
  };

  const handleClickNotification = () => {
    navigate(AdminResetPassword ? "/changepassword" : "/notification");
    window.scrollTo(0, 0);
  };

  const handleClickProfile = () => {
    navigate(AdminResetPassword ? "/changepassword" : "/profile");
    window.scrollTo(0, 0);
  };

  const handleClickSettings = () => {
    navigate(AdminResetPassword ? "/changepassword" : "/settings");
    window.scrollTo(0, 0);
  };

  const handleClickDashboard = () => {
    setloadervalue(true);
    navigate("/dashboard");
    setloadervalue(false);
  };
  const [UserData, setUserData] = useState();


  const UserDetails = async () => {
    try {
      const data = {
        id: localStorage.getItem("Id"),
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getuserinfobyid",
        data
      );
   
      if (response.data.data) {
        setUserData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [SendMoneyDetailsMessage, setSendMoneyDetailsMessage] = useState("");
  const [SendMoneyDetailsStatus, setSendMoneyDetailsStatus] = useState(0);
  const [SendMoneyDocumentStatus, setSendMoneyDocumentStatus] = useState(0);
  const [UserDetail, setUserDetail] = useState();

  const handleMenuItemClick = async (menuItem, path) => {
    setActiveMenuItem(menuItem);
    if (path && path.startsWith("http")) {
      window.open(path, "_blank");
    } else {

      if (menuItem === "Send Money" && !localStorage.getItem("loginkey")) {
      
        navigate("/login");
      } else if (menuItem === "Chat" && !localStorage.getItem("loginkey")) {
       
        navigate("/login");
      } else {
        if (menuItem === "Send Money") {
       
          const data = { id: localStorage.getItem("Id") };

          const response = await axios.post(
            CommonConstants.BASE_URL + "/getuserinfobyid",
            data
          );

            if(response.data.status == true && response.data.statuscode == 200){
              setUserDetail(response.data.data)
              if(response.data.data.role == "Individual"){
                if(response.data?.data?.isDuplicate == true){
                  setDuplicateUserPopUp(true)
                }else{
                  var UserInfo = response.data.data;
                    if (
                      (UserInfo?.iddetails?.typeId == "" ||
                        UserInfo?.iddetails?.documentNumber == "" ||
                        UserInfo?.iddetails?.dob == "" ||
                        UserInfo?.iddetails?.documentValidity == "" ||
                        UserInfo?.iddetails?.issuingAuthority == "") &&
                      (UserInfo?.userkycdetails?.streetName == "" ||
                        UserInfo?.userkycdetails?.stateId == "" ||
                        UserInfo?.userkycdetails?.nationality == "" ||
                        UserInfo?.userkycdetails?.suburb == "" ||
                        UserInfo?.userkycdetails?.postalCode == "" ||
                        UserInfo?.userkycdetails?.occupationId == "") &&
                      UserInfo?.role == "Business" &&
                      (UserInfo?.businessDetails?.companyName == "" ||
                        UserInfo?.businessDetails?.noDirector == 0 ||
                        UserInfo?.businessDetails?.noEmployee == "" ||
                        UserInfo?.businessDetails?.targetBusiness == "" ||
                        UserInfo?.businessDetails?.expectedRemittance == "" ||
                        UserInfo?.businessDetails?.noOfTranscation == 0)
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(1);
                      setSendMoneyDetailsMessage(
                        "Your Business Details , KYC Details and ID Details are missing ,please fill missing data to proceed transactions."
                      );

                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else if (
                      UserInfo?.role == "Business" &&
                      (UserInfo?.businessDetails?.companyName == "" ||
                        UserInfo?.businessDetails?.noDirector == 0 ||
                        UserInfo?.businessDetails?.noEmployee == "" ||
                        UserInfo?.businessDetails?.targetBusiness == "" ||
                        UserInfo?.businessDetails?.expectedRemittance == "" ||
                        UserInfo?.businessDetails?.noOfTranscation == 0)
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(4);
                      setSendMoneyDetailsMessage(
                        "Your business Details are missing ,please fill missing data to proceed transactions."
                      );

                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else if (
                      (UserInfo?.iddetails?.typeId == "" ||
                        UserInfo?.iddetails?.documentNumber == "" ||
                        UserInfo?.iddetails?.dob == "" ||
                        UserInfo?.iddetails?.documentValidity == "" ||
                        UserInfo?.iddetails?.issuingAuthority == "") &&
                      (UserInfo?.userkycdetails?.streetName == "" ||
                        UserInfo?.userkycdetails?.stateId == "" ||
                        UserInfo?.userkycdetails?.nationality == "" ||
                        UserInfo?.userkycdetails?.suburb == "" ||
                        UserInfo?.userkycdetails?.postalCode == "" ||
                        UserInfo?.userkycdetails?.occupationId == "")
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(1);
                      setSendMoneyDetailsMessage(
                        "Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions."
                      );

                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else if (
                      UserInfo?.userkycdetails?.streetName == "" ||
                      UserInfo?.userkycdetails?.stateId == "" ||
                      UserInfo?.userkycdetails?.nationality == "" ||
                      UserInfo?.userkycdetails?.suburb == "" ||
                      UserInfo?.userkycdetails?.postalCode == "" ||
                      UserInfo?.userkycdetails?.occupationId == ""
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(2);
                      setSendMoneyDetailsMessage(
                        "Your KYC details Details are missing. please fill missing data to proceed transactions."
                      );
                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else if (
                      (UserInfo?.iddetails?.typeId == "" ||
                        UserInfo?.iddetails?.documentNumber == "" ||
                        UserInfo?.iddetails?.dob == "" ||
                        UserInfo?.iddetails?.documentValidity == "" ||
                        UserInfo?.iddetails?.issuingAuthority == "") &&
                      UserInfo?.isDigital === false
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(3);
                      setSendMoneyDetailsMessage(
                        "Your Id Details are missing. please fill missing data to proceed transactions."
                      );
                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else if (
                      UserInfo?.role == "Business" &&
                      (UserInfo?.businessDetails?.companyName == "" ||
                        UserInfo?.businessDetails?.noDirector == 0 ||
                        UserInfo?.businessDetails?.noEmployee == "" ||
                        UserInfo?.businessDetails?.targetBusiness == "" ||
                        UserInfo?.businessDetails?.expectedRemittance == "" ||
                        UserInfo?.businessDetails?.noOfTranscation == 0)
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(4);
                      setSendMoneyDetailsMessage(
                        "Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions."
                      );

                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else {
                      setSendMoneyDetailsStatus(0);
                      setSendMoneyDocumentStatus(0);
                      navigate(AdminResetPassword ? "/changepassword" : path);
                    }
                }
              }else{
                if(response.data?.data?.isDuplicate == true){
                  setDuplicateUserPopUpBA(true)
                }else{
                  if(response.data.data.role == "Business"){
                    var UserInfo = response.data.data;
                    if (
                      (UserInfo?.iddetails?.typeId == "" ||
                        UserInfo?.iddetails?.documentNumber == "" ||
                        UserInfo?.iddetails?.dob == "" ||
                        UserInfo?.iddetails?.documentValidity == "" ||
                        UserInfo?.iddetails?.issuingAuthority == "") &&
                      (UserInfo?.userkycdetails?.streetName == "" ||
                        UserInfo?.userkycdetails?.stateId == "" ||
                        UserInfo?.userkycdetails?.nationality == "" ||
                        UserInfo?.userkycdetails?.suburb == "" ||
                        UserInfo?.userkycdetails?.postalCode == "" ||
                        UserInfo?.userkycdetails?.occupationId == "") &&
                      UserInfo?.role == "Business" &&
                      (UserInfo?.businessDetails?.companyName == "" ||
                        UserInfo?.businessDetails?.noDirector == 0 ||
                        UserInfo?.businessDetails?.noEmployee == "" ||
                        UserInfo?.businessDetails?.targetBusiness == "" ||
                        UserInfo?.businessDetails?.expectedRemittance == "" ||
                        UserInfo?.businessDetails?.noOfTranscation == 0)
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(1);
                      setSendMoneyDetailsMessage(
                        "Your Business Details , KYC Details and ID Details are missing ,please fill missing data to proceed transactions."
                      );

                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else if (
                      UserInfo?.role == "Business" &&
                      (UserInfo?.businessDetails?.companyName == "" ||
                        UserInfo?.businessDetails?.noDirector == 0 ||
                        UserInfo?.businessDetails?.noEmployee == "" ||
                        UserInfo?.businessDetails?.targetBusiness == "" ||
                        UserInfo?.businessDetails?.expectedRemittance == "" ||
                        UserInfo?.businessDetails?.noOfTranscation == 0)
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(4);
                      setSendMoneyDetailsMessage(
                        "Your business Details are missing ,please fill missing data to proceed transactions."
                      );

                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else if (
                      (UserInfo?.iddetails?.typeId == "" ||
                        UserInfo?.iddetails?.documentNumber == "" ||
                        UserInfo?.iddetails?.dob == "" ||
                        UserInfo?.iddetails?.documentValidity == "" ||
                        UserInfo?.iddetails?.issuingAuthority == "") &&
                      (UserInfo?.userkycdetails?.streetName == "" ||
                        UserInfo?.userkycdetails?.stateId == "" ||
                        UserInfo?.userkycdetails?.nationality == "" ||
                        UserInfo?.userkycdetails?.suburb == "" ||
                        UserInfo?.userkycdetails?.postalCode == "" ||
                        UserInfo?.userkycdetails?.occupationId == "")
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(1);
                      setSendMoneyDetailsMessage(
                        "Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions."
                      );

                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else if (
                      UserInfo?.userkycdetails?.streetName == "" ||
                      UserInfo?.userkycdetails?.stateId == "" ||
                      UserInfo?.userkycdetails?.nationality == "" ||
                      UserInfo?.userkycdetails?.suburb == "" ||
                      UserInfo?.userkycdetails?.postalCode == "" ||
                      UserInfo?.userkycdetails?.occupationId == ""
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(2);
                      setSendMoneyDetailsMessage(
                        "Your KYC details Details are missing. please fill missing data to proceed transactions."
                      );
                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else if (
                      (UserInfo?.iddetails?.typeId == "" ||
                        UserInfo?.iddetails?.documentNumber == "" ||
                        UserInfo?.iddetails?.dob == "" ||
                        UserInfo?.iddetails?.documentValidity == "" ||
                        UserInfo?.iddetails?.issuingAuthority == "") &&
                      UserInfo?.isDigital === false
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(3);
                      setSendMoneyDetailsMessage(
                        "Your Id Details are missing. please fill missing data to proceed transactions."
                      );
                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else if (
                      UserInfo?.role == "Business" &&
                      (UserInfo?.businessDetails?.companyName == "" ||
                        UserInfo?.businessDetails?.noDirector == 0 ||
                        UserInfo?.businessDetails?.noEmployee == "" ||
                        UserInfo?.businessDetails?.targetBusiness == "" ||
                        UserInfo?.businessDetails?.expectedRemittance == "" ||
                        UserInfo?.businessDetails?.noOfTranscation == 0)
                    ) {
                      setVerifyRefralPOPUP(true);
                      setSendMoneyDetailsStatus(4);
                      setSendMoneyDetailsMessage(
                        "Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions."
                      );

                      if (
                        UserInfo?.idDocuments?.length === 0 &&
                        ((UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0))
                      ) {
                        setSendMoneyDocumentStatus(1);
                      } else if (UserInfo?.idDocuments?.length === 0) {
                        setSendMoneyDocumentStatus(2);
                      } else if (
                        (UserInfo?.role == "Individual" &&
                          UserInfo?.additionalDocuments?.length === 0) ||
                        (UserInfo?.role == "Business" &&
                          UserInfo?.businessDocuments?.length === 0)
                      ) {
                        setSendMoneyDocumentStatus(3);
                      }
                    } else {
                      setSendMoneyDetailsStatus(0);
                      setSendMoneyDocumentStatus(0);
                      navigate(AdminResetPassword ? "/changepassword" : path);
                    }
                  }else{
                    navigate(path);
                  }
                }
              }
            }
        } else {
          navigate(path);
        }
      }
    }
  };
  
  const isLoggedIn = localStorage.getItem("loginkey");

  const menuItems = [
    { label: "Send Money", path: "/sendmoney" },
    { label: "Book Flight", path: "https://flylumbini.com" },
    { label: "About Us", path: "/about-us" },
    { label: "Contact Us", path: "/contact-us" },
    { label: "Chat", path: "/chats" },
    ...(isLoggedIn
      ? [
        {
          label: <i className="fa fa-bell purpleText"></i>,
          path: "/notification",
        },
        {
          label: (
            <Nav.Link
              id="NameDropdown"
              className="navLink medium navMedia ms-auto  ps-0"
            >
              <Dropdown show={showMenu} onToggle={handleClick1}>
                <a
                  className="main purpleBackground text-white rounded-5 p-2 text-decoration-none"
                  variant="light"
                  href="#"
                  onClick={handleClick1}
                >
                  <span className="text-white mx-1 medium capitalize">
                    {localStorage.getItem("Uname")}
                  </span>
                  <KeyboardArrowDownIcon className="text-white" />
                </a>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleClickProfile}>
                    <img
                      src={profile}
                      className="img-fluid me-2"
                      alt="Profile"
                    />
                    <span className="purpleText me-2">Profile</span>
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={handleClickDashboard}
                    className={`${UserData?.role == "Admin"
                      ? "d-block"
                      : "d-none"
                      }`}
                  >
                    <img
                      src={dashboard}
                      className="img-fluid me-2"
                      alt="Dashboard"
                    />
                    <span className="purpleText me-2 pe-3">Dashboard</span>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleClickTransactions}
                    className={`${UserData?.role == "Admin"
                      ? "d-none"
                      : "d-block"
                      }`}
                  >
                    <img
                      src={directional}
                      className="img-fluid me-2"
                      alt="Transactions"
                    />
                    <span className="purpleText me-2">Transactions</span>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleClickReferal}
                    className={`${UserData?.role == "Admin"
                      ? "d-none"
                      : "d-block"
                      }`}
                  >
                    <img
                      src={gift}
                      className="img-fluid me-2"
                      alt="Referral and rewards"
                    />
                    <span className="purpleText me-3">
                      Referral and rewards
                    </span>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleClickRecipients}
                    className={`${UserData?.role == "Admin"
                      ? "d-none"
                      : "d-block"
                      }`}
                  >
                    <img
                      src={recipients}
                      className="img-fluid me-2"
                      alt="Recipients"
                    />
                    <span className="purpleText me-2">Recipients</span>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleClickNotification}
                    className={`${UserData?.role == "Admin"
                      ? "d-none"
                      : "d-block"
                      }`}
                  >
                    <img
                      src={bell}
                      className="img-fluid me-2"
                      alt="Notifications"
                    />
                    <span className="purpleText me-2">Notifications</span>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleClickStatement}
                    className={`${UserData?.role == "Admin"
                      ? "d-none"
                      : "d-block"
                      }`}
                  >
                    <img
                      src={statement}
                      className="img-fluid me-2"
                      alt="Statement"
                    />
                    <span className="purpleText me-2">Statement</span>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleClickSettings}
                    className={`${UserData?.role == "Admin"
                      ? "d-none"
                      : "d-block"
                      }`}
                  >
                    <img
                      src={settings}
                      className="img-fluid me-2"
                      alt="Settings"
                    />
                    <span className="purpleText me-2">Settings</span>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={confirmClick}>
                    <img
                      src={logout}
                      className="img-fluid me-2"
                      alt="Logout"
                    />
                    <span className="purpleText">Logout</span>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>
          ),
          dropdown: true, 
        },
      ]
      : [
        { label: "Login", path: "/login" },

        {
          label: (
            <div
              className={`purpleBackground fullRoundedCorner medium capitalize text-white px-3 me-4 py-2 ${location.pathname === "/signup" ? "" : ""
                }`}
            >
              Sign Up
            </div>
          ),
          path: "/signup",
        },
      ]),
  
  ];
  useEffect(() => {
    if (localStorage.getItem("Id")) {
      UserDetails();

      setNavbarMenu(localStorage.getItem("Id"));
    }
  }, [NavbarMenu, isMenuOpen]);
  const hideNavbarAndFooter = location.pathname === "/legal";

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="respo-navbar">
        {loadervalue == true ? <Loader /> : ""}

        <Container className="d-flex">
          <div className="text-start">
            <Navbar.Brand onClick={handleClickHome} className="pointer">
              {" "}
              <img src={logoLR} alt="dj" />{" "}
            </Navbar.Brand>
          </div>
          {hideNavbarAndFooter ? null : (
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="w-auto purpleBackground text-white m-0"
            />
          )}
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className={`justify-content-end ${NavbarMenu !== "" ? "" : ""}`}
          >
            <div className="text-end">
              <Nav className="ms-auto align-items-center d-flex">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleMenuItemClick(item.label, item.path)}
                    className={`ms-auto navLink medium navMedia  ${location.pathname === item.path && item.path !== "/signup"
                      ? "active"
                      : ""
                      }`}
                  >
                    {item.label}
                  </div>
                ))}
              </Nav>

            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalComponentPopup
        show={modalShowPrChange}
        
        title1={
          < small className="text-black">
            CAUTIOUS!!! <br></br>
            Logging out will close your current session and require you to sign in again to access your account. Please save any unsaved changes before proceeding. For security on shared and public devices, it is important to log out to safeguard your account.
          </small>
        }
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={() => handlelogouttt()}
        title1Style={{ fontSize: "14px" }}
      />

      <Modal
        show={VerifyRefralPOPUP}
        onHide={() => {
          setVerifyRefralPOPUP(false);
        }}
        centered
      >
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="purpleText">
            <span className="text-black mt-2">Alert</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-3">
          <p>{SendMoneyDetailsMessage}</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-around">
          <Button
            className="purpleBackground border-0 col col-lg-3"
            onClick={() => {
              handleRedirectProfile();
            }}
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
          show={DuplicateUserPopUp}
          onHide={() => {
            setDuplicateUserPopUp(false);
          }}
          backdrop="static"
          keyboard={false}
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="purpleText">Sorry!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            We are unable to verify your account at the moment. Please get in touch with our customer support on <small className="text-primary pointer" onClick={handleCopyClick}>0419850130</small>, or <u className="text-primary pointer" onClick={handleCopyClick2}>info@legalremit.com</u>. Alternatively, you can send us a message from our mobile app and web app directly.

          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <div className="col-lg-6">
              <Button
                variant="secondary"
                className="purpleBackground"
                onClick={() => {
                  setDuplicateUserPopUp(false);
                    var UserInfo = UserDetail
                      if (
                        (UserInfo?.iddetails?.typeId == "" ||
                          UserInfo?.iddetails?.documentNumber == "" ||
                          UserInfo?.iddetails?.dob == "" ||
                          UserInfo?.iddetails?.documentValidity == "" ||
                          UserInfo?.iddetails?.issuingAuthority == "") &&
                        (UserInfo?.userkycdetails?.streetName == "" ||
                          UserInfo?.userkycdetails?.stateId == "" ||
                          UserInfo?.userkycdetails?.nationality == "" ||
                          UserInfo?.userkycdetails?.suburb == "" ||
                          UserInfo?.userkycdetails?.postalCode == "" ||
                          UserInfo?.userkycdetails?.occupationId == "") &&
                        UserInfo?.role == "Business" &&
                        (UserInfo?.businessDetails?.companyName == "" ||
                          UserInfo?.businessDetails?.noDirector == 0 ||
                          UserInfo?.businessDetails?.noEmployee == "" ||
                          UserInfo?.businessDetails?.targetBusiness == "" ||
                          UserInfo?.businessDetails?.expectedRemittance == "" ||
                          UserInfo?.businessDetails?.noOfTranscation == 0)
                      ) {
                        setVerifyRefralPOPUP(true);
                        setSendMoneyDetailsStatus(1);
                        setSendMoneyDetailsMessage(
                          "Your Business Details , KYC Details and ID Details are missing ,please fill missing data to proceed transactions."
                        );

                        if (
                          UserInfo?.idDocuments?.length === 0 &&
                          ((UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                            (UserInfo?.role == "Business" &&
                              UserInfo?.businessDocuments?.length === 0))
                        ) {
                          setSendMoneyDocumentStatus(1);
                        } else if (UserInfo?.idDocuments?.length === 0) {
                          setSendMoneyDocumentStatus(2);
                        } else if (
                          (UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0)
                        ) {
                          setSendMoneyDocumentStatus(3);
                        }
                      } else if (
                        UserInfo?.role == "Business" &&
                        (UserInfo?.businessDetails?.companyName == "" ||
                          UserInfo?.businessDetails?.noDirector == 0 ||
                          UserInfo?.businessDetails?.noEmployee == "" ||
                          UserInfo?.businessDetails?.targetBusiness == "" ||
                          UserInfo?.businessDetails?.expectedRemittance == "" ||
                          UserInfo?.businessDetails?.noOfTranscation == 0)
                      ) {
                        setVerifyRefralPOPUP(true);
                        setSendMoneyDetailsStatus(4);
                        setSendMoneyDetailsMessage(
                          "Your business Details are missing ,please fill missing data to proceed transactions."
                        );

                        if (
                          UserInfo?.idDocuments?.length === 0 &&
                          ((UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                            (UserInfo?.role == "Business" &&
                              UserInfo?.businessDocuments?.length === 0))
                        ) {
                          setSendMoneyDocumentStatus(1);
                        } else if (UserInfo?.idDocuments?.length === 0) {
                          setSendMoneyDocumentStatus(2);
                        } else if (
                          (UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0)
                        ) {
                          setSendMoneyDocumentStatus(3);
                        }
                      } else if (
                        (UserInfo?.iddetails?.typeId == "" ||
                          UserInfo?.iddetails?.documentNumber == "" ||
                          UserInfo?.iddetails?.dob == "" ||
                          UserInfo?.iddetails?.documentValidity == "" ||
                          UserInfo?.iddetails?.issuingAuthority == "") &&
                        (UserInfo?.userkycdetails?.streetName == "" ||
                          UserInfo?.userkycdetails?.stateId == "" ||
                          UserInfo?.userkycdetails?.nationality == "" ||
                          UserInfo?.userkycdetails?.suburb == "" ||
                          UserInfo?.userkycdetails?.postalCode == "" ||
                          UserInfo?.userkycdetails?.occupationId == "")
                      ) {
                        setVerifyRefralPOPUP(true);
                        setSendMoneyDetailsStatus(1);
                        setSendMoneyDetailsMessage(
                          "Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions."
                        );

                        if (
                          UserInfo?.idDocuments?.length === 0 &&
                          ((UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                            (UserInfo?.role == "Business" &&
                              UserInfo?.businessDocuments?.length === 0))
                        ) {
                          setSendMoneyDocumentStatus(1);
                        } else if (UserInfo?.idDocuments?.length === 0) {
                          setSendMoneyDocumentStatus(2);
                        } else if (
                          (UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0)
                        ) {
                          setSendMoneyDocumentStatus(3);
                        }
                      } else if (
                        UserInfo?.userkycdetails?.streetName == "" ||
                        UserInfo?.userkycdetails?.stateId == "" ||
                        UserInfo?.userkycdetails?.nationality == "" ||
                        UserInfo?.userkycdetails?.suburb == "" ||
                        UserInfo?.userkycdetails?.postalCode == "" ||
                        UserInfo?.userkycdetails?.occupationId == ""
                      ) {
                        setVerifyRefralPOPUP(true);
                        setSendMoneyDetailsStatus(2);
                        setSendMoneyDetailsMessage(
                          "Your KYC details Details are missing. please fill missing data to proceed transactions."
                        );
                        if (
                          UserInfo?.idDocuments?.length === 0 &&
                          ((UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                            (UserInfo?.role == "Business" &&
                              UserInfo?.businessDocuments?.length === 0))
                        ) {
                          setSendMoneyDocumentStatus(1);
                        } else if (UserInfo?.idDocuments?.length === 0) {
                          setSendMoneyDocumentStatus(2);
                        } else if (
                          (UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0)
                        ) {
                          setSendMoneyDocumentStatus(3);
                        }
                      } else if (
                        (UserInfo?.iddetails?.typeId == "" ||
                          UserInfo?.iddetails?.documentNumber == "" ||
                          UserInfo?.iddetails?.dob == "" ||
                          UserInfo?.iddetails?.documentValidity == "" ||
                          UserInfo?.iddetails?.issuingAuthority == "") &&
                        UserInfo?.isDigital === false
                      ) {
                        setVerifyRefralPOPUP(true);
                        setSendMoneyDetailsStatus(3);
                        setSendMoneyDetailsMessage(
                          "Your Id Details are missing. please fill missing data to proceed transactions."
                        );
                        if (
                          UserInfo?.idDocuments?.length === 0 &&
                          ((UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                            (UserInfo?.role == "Business" &&
                              UserInfo?.businessDocuments?.length === 0))
                        ) {
                          setSendMoneyDocumentStatus(1);
                        } else if (UserInfo?.idDocuments?.length === 0) {
                          setSendMoneyDocumentStatus(2);
                        } else if (
                          (UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0)
                        ) {
                          setSendMoneyDocumentStatus(3);
                        }
                      } else if (
                        UserInfo?.role == "Business" &&
                        (UserInfo?.businessDetails?.companyName == "" ||
                          UserInfo?.businessDetails?.noDirector == 0 ||
                          UserInfo?.businessDetails?.noEmployee == "" ||
                          UserInfo?.businessDetails?.targetBusiness == "" ||
                          UserInfo?.businessDetails?.expectedRemittance == "" ||
                          UserInfo?.businessDetails?.noOfTranscation == 0)
                      ) {
                        setVerifyRefralPOPUP(true);
                        setSendMoneyDetailsStatus(4);
                        setSendMoneyDetailsMessage(
                          "Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions."
                        );

                        if (
                          UserInfo?.idDocuments?.length === 0 &&
                          ((UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                            (UserInfo?.role == "Business" &&
                              UserInfo?.businessDocuments?.length === 0))
                        ) {
                          setSendMoneyDocumentStatus(1);
                        } else if (UserInfo?.idDocuments?.length === 0) {
                          setSendMoneyDocumentStatus(2);
                        } else if (
                          (UserInfo?.role == "Individual" &&
                            UserInfo?.additionalDocuments?.length === 0) ||
                          (UserInfo?.role == "Business" &&
                            UserInfo?.businessDocuments?.length === 0)
                        ) {
                          setSendMoneyDocumentStatus(3);
                        }
                      } else {
                        setSendMoneyDetailsStatus(0);
                        setSendMoneyDocumentStatus(0);
                        navigate(AdminResetPassword ? "/changepassword" : "/sendmoney");
                      }
                }}
              >
                OK
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        <Modal
          show={DuplicateUserPopUpBA}
          onHide={() => {
            setDuplicateUserPopUpBA(false);
          }}
          backdrop="static"
          keyboard={false}
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="purpleText">Sorry!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            We are unable to verify your account at the moment. Please get in touch with our customer support on <small className="text-primary pointer" onClick={handleCopyClick}>0419850130</small>, or <u className="text-primary pointer" onClick={handleCopyClick2}>info@legalremit.com</u>. Alternatively, you can send us a message from our mobile app and web app directly.

          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <div className="col-lg-6">
              <Button
                variant="secondary"
                className="purpleBackground"
                onClick={() => {
                  setDuplicateUserPopUpBA(false);
                }}
              >
                OK
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

    </>
  );
}
export default NavBar;
