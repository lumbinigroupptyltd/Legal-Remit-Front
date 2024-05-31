import React, { useContext, useEffect, useState } from "react";
import "./Step2.scss";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../../../Helpers/CountryDropdown/flags.css";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import axios from "axios";
import { CommonConstants } from "../../../../../Constants/common.constants";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ListGroup } from "react-bootstrap";
import userContext from "../../Signupdata/Usecontext";

const validator = require("../../../../../assets/js/validator");

export default function Step2({
  Name,
  activestepkey,
  ResendOTPIndvidual,
  OtpCountIndvidual,
  OtpCountBusiness,
  OtpCountAgent,
  ResendOTPBusiness,
  ResendOTPAgent,
  B_A_activestepkey,
  handleid,
  BuisnessDisplay,
  BusinessM_Number,
  BusinessEmailOtpvalue,
  IndividualMo_Number,
  IndividualEmailOtpvalue,
  IndividualEmailOtpvalueValid,
  BusinessEmailOtpvalueValid,
  AgentEmailOtpvalueValid,
  IndividualMobileOtpvalueValid,
  BusinessMobileOtpvalueValid,
  AgentMobileOtpvalueValid,
  AgentMo_Number,
  AgentEmailOtpvalue,
  StepUOtppopup,
  StepBOtppopup,
  StepAOtppopup,
  OtpSkip,
  AgentverifyOtp,
  IndividualverifyOtp,
  BussinessverifyOtp,
  CloseOtp,
  OTPValue,
  OTPValueB,
  OTPValueA,
  individualPassword,
  BusinessPassword,
  AgentPassword,
  handleEmailAndPhoneValid,
}) {
  const [OUshow, setOUShow] = useState(false);
  const [OBshow, setOBShow] = useState(false);
  const [OAshow, setOAShow] = useState(false);
  const [CpasswordValidator, setCpasswordValidator] = useState(false);
  const [BCpasswordValidator, setBCpasswordValidator] = useState(false);
  const [ACpasswordValidator, setACpasswordValidator] = useState(false);
  const [ShowPassword, setShowPassword] = useState(false);
  const [C_ShowPassword, setC_ShowPassword] = useState(false);
  const [I_Password, setI_Password] = useState("");
  const [B_Password, setB_Password] = useState("");
  const [A_Password, setA_Password] = useState("");

  const [step1value, setstep1value] = useState({
    IndidualFirstname: "",
    IndidualMiddlename: "",
    IndidualLastname: "",
    IndidualEmail: "",
    IndidualMobileNumber: "",
    Indidualpassword: "",
    IndidualCpassword: "",

    Business_Fullname: "",
    Business_BusinessName: "",
    Business_RegistrationNo: "",
    Business_AddressofBusiness: "",
    Business_BusinessEmail: "",
    Business_MobileNumber: "",
    Business_password: "",
    Business_C_password: "",

    Agent_Firstname: "",
    Agent_Middlename: "",
    Agent_Lastname: "",
    Agent_Email: "",
    Agent_MobileNumber: "",
    Agent_password: "",
    Agent_C_password: "",
  });

  const [otp, setOtp] = useState("");
  const [AutoOtp, setAutoOtp] = useState(false);
  const [otp2, setOtp2] = useState("");
  const [AutoOtp2, setAutoOtp2] = useState(false);
  const [otp3, setOtp3] = useState("");
  const [AutoOtp3, setAutoOtp3] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState(false);
  const [otpErrorShakeMessage, setotpErrorShakeMessage] = useState(false);
  const [password, setpassword] = useState("");
  const [Bpassword, setBpassword] = useState("");
  const [Apassword, setApassword] = useState("");

  const handlePlaceSelect = (place) => {
    setstep1value((prevState) => ({
      ...prevState,
      Business_AddressofBusiness: place.formatted_address,
    }));
  };

  useEffect(() => {
    individualPassword(I_Password);
  }, [I_Password]);

  useEffect(() => {
    BusinessPassword(B_Password);
  }, [B_Password]);

  useEffect(() => {
    AgentPassword(A_Password);
  }, [A_Password]);

  useEffect(() => {
    if (OTPValue != 0) {
      setOtp(OTPValue);
      const OtpVerifyData = {
        otp: OTPValue,
        phone: data2.IndidualMobileNumber,
      };

      const otpVerifyDataResponse = axios
        .post(CommonConstants.BASE_URL + "/verifyotpbyphone", OtpVerifyData)
        .then(function (response) {
          if (response.data.status === false) {
            setOtpDisable("true");
            setOtpErrorMessage(true);
            setotpErrorShakeMessage(true);
            setOtp("");
            setOtpError(true);
          } else if (response.data.status === true) {
            localStorage.setItem("MobileNumber", data2.IndidualMobileNumber);
            setOtpErrorMessage(false);
            setOtp("");
            setotpErrorShakeMessage(false);
            setOtpError(false);
            Individualhandleclose();
          }
        })
        .catch(function (error) {
          // setloadervalue(false)
        });
    }
  }, [OTPValue]);

  useEffect(() => {
    if (OTPValueB != 0) {
      setOtp(OTPValueB);
      const OtpVerifyData = {
        otp: OTPValueB,
        phone: data2.Business_MobileNumber,
      };

      const otpVerifyDataResponse = axios
        .post(CommonConstants.BASE_URL + "/verifyotpbyphone", OtpVerifyData)
        .then(function (response) {
          if (response.data.status === false) {
            setOtpErrorMessage(true);
            setotpErrorShakeMessage(true);
            setOtp2("");
            setOtpError(true);
          } else if (response.data.status === true) {
            localStorage.setItem("MobileNumber", data2.Business_MobileNumber);
            setotpErrorShakeMessage(false);
            setOtpErrorMessage(false);
            setOtpError(false);
            handleOBClose();
            BussinessverifyOtp(true);
            setOtp2("");
            setOtpDisable("true");
          }
        })
        .catch(function (error) {
          // setloadervalue(false)
        });
    }
  }, [OTPValueB]);

  useEffect(() => {
    if (OTPValueA != 0) {
      setOtp(OTPValueA);
      const OtpVerifyData = {
        otp: OTPValueA,
        phone: data2.Agent_MobileNumber,
      };

      const otpVerifyDataResponse = axios
        .post(CommonConstants.BASE_URL + "/verifyotpbyphone", OtpVerifyData)
        .then(function (response) {
          if (response.data.status == false) {
            // setOtpErrorMessage(response.data.message);
            setOtpErrorMessage(true);
            setotpErrorShakeMessage(true);
            setOtp3("");
            setOtpError(true);
          } else if (response.data.status == true) {
            localStorage.setItem("MobileNumber", data2.Agent_MobileNumber);
            setotpErrorShakeMessage(false);
            setOtpErrorMessage(false);
            setOtpError(false);
            handleOAClose();
            AgentverifyOtp(true);
            setOtp3("");
            setOtpDisable("true");
          }
        })
        .catch(function (error) {
          // setloadervalue(false)
        });
    }
  }, [OTPValueA]);

  const autocompleteRef = React.useRef(null);

  const { setData2 } = useContext(userContext);

  const handleOUClose = () => setOUShow(false);
  const handleOUShow = () => setOUShow(StepUOtppopup);

  const handleOBClose = () => setOBShow(false);
  const handleOBShow = () => setOBShow(StepBOtppopup);

  const handleOAClose = () => setOAShow(false);
  const handleOAShow = () => setOAShow(StepAOtppopup);

  const [select, setSelect] = useState("AU");
  const onSelect = (code) => setSelect(code);
  const [CountryMonileCode, setCountryMonileCode] = useState("");

  const { Countrydata } = useContext(userContext);

  const [otpDisable, setOtpDisable] = useState("true");
  const [CPhoneCode, setCPhoneCode] = useState("");

  useEffect(() => {
    var countryname = Countrydata.Countryiso3;
    if (!countryname == "") {
      const options = {
        componentRestrictions: { country: `${countryname}` },
      };
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        options
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        handlePlaceSelect(place);
      });
    }
    handleOUShow();
    handleOBShow();
    handleOAShow();
    setData2(step1value);
    // setCountryMonileCode(Countrydata.CountryPhoneCode);

    if (Name === "Individual") {
      if (activestepkey === "secondStep") {
        handleid("Individual_Details_step2");
        const CCodeNumber = Countrydata.CountryPhoneCode.substring(0, 1);
        if (CCodeNumber === "+") {
          setCPhoneCode(Countrydata.CountryPhoneCode);
        } else {
          setCPhoneCode("+" + Countrydata.CountryPhoneCode);
        }
      }
      document.getElementById("stepone").style.display = "block";
      document.getElementById("steptwo").style.display = "none";
      document.getElementById("stepthree").style.display = "none";
      // console.lo
    } else if (Name == "Business") {
      if (B_A_activestepkey === "secondStep") {
        handleid("Bussiness_Details_step2");
        const CCodeNumber = Countrydata.CountryPhoneCode.substring(0, 1);
        if (CCodeNumber === "+") {
          setCPhoneCode(Countrydata.CountryPhoneCode);
        } else {
          setCPhoneCode("+" + Countrydata.CountryPhoneCode);
        }
      }

      if (BuisnessDisplay == "businessModal") {
        document.getElementById("stepone").style.display = "none";
        document.getElementById("steptwo").style.display = "block";
        document.getElementById("stepthree").style.display = "none";
      } else {
        document.getElementById("stepone").style.display = "none";
        document.getElementById("steptwo").style.display = "block";
        document.getElementById("stepthree").style.display = "none";
      }
    } else {
      if (B_A_activestepkey === "secondStep") {
        handleid("Agent_Details_step2");
        const CCodeNumber = Countrydata.CountryPhoneCode.substring(0, 1);
        if (CCodeNumber === "+") {
          setCPhoneCode(Countrydata.CountryPhoneCode);
        } else {
          setCPhoneCode("+" + Countrydata.CountryPhoneCode);
        }
      }
      document.getElementById("stepone").style.display = "none";
      document.getElementById("steptwo").style.display = "none";
      document.getElementById("stepthree").style.display = "block";
    }
  }, [
    Name,
    BuisnessDisplay,
    StepUOtppopup,
    StepBOtppopup,
    StepAOtppopup,
    handleid,
    otpDisable,
    // CountryMonileCode,
    CPhoneCode,
    otp,
    otp2,
    otp3,
  ]);
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    if (StepUOtppopup === true) {
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

    if (StepBOtppopup === true) {
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

    if (StepAOtppopup === true) {
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
  }, [seconds, OtpCountIndvidual, StepUOtppopup, StepBOtppopup, StepAOtppopup]);

  useEffect(() => {
    if (AutoOtp === true) {
      IndividualVerifyOTP();
      setAutoOtp(false);
    } else if (AutoOtp2 === true) {
      //
      BussinessVerifyOTP();
      setAutoOtp2(false);
    } else if (AutoOtp3 === true) {
      AgentVerifyOTP();
      setAutoOtp3(false);
    } else {
    }
  }, [AutoOtp, AutoOtp2, AutoOtp3]);

  const handleDataStep2 = (e) => {
    // debugger
    let capitalizedValue = "";
    let sanitizedValue = "";
    let Numeric = "";
    let RegisterNo = "";
    let Alfabet = "";
    let inputValue = e.target.value;
    const { name, value } = e.target;

    if (
      name == "IndidualEmail" ||
      name == "Business_BusinessEmail" ||
      name == "Agent_Email"
    ) {
      setstep1value({ ...step1value, [name]: value });
    } else if (
      name == "IndidualFirstname" ||
      name == "IndidualMiddlename" ||
      name == "IndidualLastname" ||
      name == "Business_Fullname" ||
      name == "Business_BusinessName" ||
      name == "Agent_Firstname" ||
      name == "Agent_Middlename" ||
      name == "Agent_Lastname"
    ) {
      if (inputValue) {
        const regex = /[^a-zA-Z\s]/g;
        Alfabet = inputValue.replace(regex, "");
        const words = Alfabet.split(" ");

        sanitizedValue = words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
      setstep1value({ ...step1value, [name]: sanitizedValue });
    } else if (
      name == "IndidualMobileNumber" ||
      name == "Business_MobileNumber" ||
      name == "Agent_MobileNumber"
    ) {
      if (inputValue) {
        Numeric = inputValue.replace(/\D/g, "");
      }
      setstep1value({ ...step1value, [name]: Numeric });
    } else if (name == "Business_RegistrationNo") {
      if (inputValue) {
        RegisterNo = inputValue.replace(/[^a-zA-Z0-9\s]/g, "").toUpperCase();
      }
      setstep1value({ ...step1value, [name]: RegisterNo });
    } else if (
      name == "Indidualpassword" ||
      name == "IndidualCpassword" ||
      name == "Business_password" ||
      name == "Business_C_password" ||
      name == "Agent_password" ||
      name == "Agent_C_password"
    ) {
      setstep1value({ ...step1value, [name]: inputValue });
    } else {
      if (inputValue) {
        const words = inputValue.split(" ");

        capitalizedValue = words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
      setstep1value({ ...step1value, [name]: capitalizedValue });
    }
  };

  ///////////////password Popup show /////////////////
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordValid1, setIsPasswordValid1] = useState(false);
  const [isPasswordValid2, setIsPasswordValid2] = useState(false);

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    // setIsPasswordValid(event.target.value.length > 7 ? true : false)

    // Validate the password criteria here
    const isValid =
      password &&
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password);
    setIsPasswordValid(isValid);
  };
  const handleBusinessPasswordChange = (event) => {
    const password = event.target.value;
    // Validate the password criteria here
    setIsPasswordValid1(event.target.value.length > 7 ? true : false);
    const isValid =
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password);
    // setIsPasswordValid1(isValid);
  };

  const handleAgentPasswordChange = (event) => {
    const password = event.target.value;
    setIsPasswordValid2(event.target.value.length > 7 ? true : false);
    // Validate the password criteria here
    const isValid =
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password);
    // setIsPasswordValid2(isValid);
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
            {/[a-z]/.test(step1value.Indidualpassword) ? (
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
            {/[A-Z]/.test(step1value.Indidualpassword) ? (
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
            {/\d/.test(step1value.Indidualpassword) ? (
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
              step1value.Indidualpassword
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
            {/[a-z]/.test(step1value.Business_password) ? (
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
            {/[A-Z]/.test(step1value.Business_password) ? (
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
            {/\d/.test(step1value.Business_password) ? (
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
              step1value.Business_password
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

  const popover2 = (
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
            {isPasswordValid2 ? (
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
            {/[a-z]/.test(step1value.Agent_password) ? (
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
            {/[A-Z]/.test(step1value.Agent_password) ? (
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
            {/\d/.test(step1value.Agent_password) ? (
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
              step1value.Agent_password
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

  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isPopoverVisible1, setIsPopoverVisible1] = useState(false);
  const [isPopoverVisible2, setIsPopoverVisible2] = useState(false);

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

  const handleTextboxFocus2 = () => {
    setIsPopoverVisible2(true);
  };

  const handleTextboxBlur2 = () => {
    setIsPopoverVisible2(false);
  };

  /////////////////////////////////////////////////////////

  ////password set//////
  const handlepasswordset = (e) => {
    handleDataStep2(e);
    setpassword(e.target.value);
  };

  const handleCpasswordset = (e) => {
    handleCpassworCheck(e);
    handleDataStep2(e);
  };
  const handleCpassworCheck = (e) => {
    handleDataStep2(e);
    if (password == e.target.value) {
      setCpasswordValidator(false);
    } else {
      setCpasswordValidator(true);
    }
  };
  ///////////////////////

  /////////Business Password/////////

  const handleBpasswordset = (e) => {
    handleDataStep2(e);
    setBpassword(e.target.value);
  };

  const handleBCpasswordset = (e) => {
    handleBCpassword(e);
    handleDataStep2(e);
  };

  const handleBCpassword = (e) => {
    handleDataStep2(e);
    if (Bpassword == e.target.value) {
      setBCpasswordValidator(false);
    } else {
      setBCpasswordValidator(true);
    }
  };
  ////////////////////////////

  ////////Agent password///////

  const handleApasswordset = (e) => {
    handleDataStep2(e);
    setApassword(e.target.value);
  };

  const handleACpasswordset = (e) => {
    handleACpassword(e);
    handleDataStep2(e);
  };

  const handleACpassword = (e) => {
    handleDataStep2(e);
    if (Apassword == e.target.value) {
      setACpasswordValidator(false);
    } else {
      setACpasswordValidator(true);
    }
  };

  const IndividualhandlemobileNo = (e) => {
    IndividualMo_Number(e.target.value);
    if (e.target.value != "") {
      ExistMobileVerify(e);
    } else {
      setExistMobile(false);
      IndividualMobileOtpvalueValid(0);
    }
  };

  const BusinessmobilenoOtp = (e) => {
    BusinessM_Number(e.target.value);
    if (e.target.value != "") {
      BExistMobileVerify(e);
    } else {
      setBExistMobile(false);
      BusinessMobileOtpvalueValid(0);
    }
  };

  const AgenthandlemobileNo = (e) => {
    AgentMo_Number(e.target.value);
    if (e.target.value != "") {
      AExistMobileVerify(e);
    } else {
      setAExistMobile(false);
      AgentMobileOtpvalueValid(0);
    }
  };

  const IndividualEmailOtp = (e) => {
    IndividualEmailOtpvalue(e.target.value);
    if (e.target.value != "") {
      ExistEmailVerify(e);
    } else {
      setExistEmail(false);
      IndividualEmailOtpvalueValid(0);
    }
  };

  const BusinessEmailOtp = (e) => {
    BusinessEmailOtpvalue(e.target.value);
    if (e.target.value != "") {
      BExistEmailVerify(e);
    } else {
      setBExistEmail(false);
      BusinessEmailOtpvalueValid(0);
    }
  };

  const AgentEmailOtp = (e) => {
    AgentEmailOtpvalue(e.target.value);
    if (e.target.value != "") {
      AExistEmailVerify(e);
    } else {
      setAExistEmail(false);
      AgentEmailOtpvalueValid(0);
    }
  };

  const Resendotp = () => {
    setSeconds(60);
    setOtp("");
    ResendOTPIndvidual();
    setOtpErrorMessage(false);
  };

  const Resendotp2 = () => {
    setSeconds(60);
    setOtp2("");
    ResendOTPBusiness();
    setOtpErrorMessage(false);
  };

  const Resendotp3 = () => {
    setSeconds(60);
    setOtp3("");
    ResendOTPAgent();
    setOtpErrorMessage(false);
  };

  const AgenthandleSkip = () => {
    handleOAClose();
    OtpSkip(true);
    setOtp3("");
    setOtpDisable("true");
  };

  const AgentVerifyOTP = async () => {
    // code to verify otp start

    const OtpVerifyData = {
      otp: otp3,
      phone: data2.Agent_MobileNumber,
    };
    // console.log(OtpVerifyData, " OtpVerifyData")

    const otpVerifyDataResponse = await axios.post(
      CommonConstants.BASE_URL + "/verifyotpbyphone",
      OtpVerifyData
    );

    // console.log(otpVerifyDataResponse, " otpVerifyDataResponse")

    if (otpVerifyDataResponse.data.status == false) {
      // setOtpErrorMessage(otpVerifyDataResponse.data.message);
      setOtpErrorMessage(true);
      setotpErrorShakeMessage(true);
      setOtp3("");
      setOtpError(true);
    } else if (otpVerifyDataResponse.data.status == true) {
      localStorage.setItem("MobileNumber", data2.IndidualMobileNumber);
      setotpErrorShakeMessage(false);
      setOtpErrorMessage(false);
      setOtpError(false);
    }

    // code to verify otp end

    // code will move next without verifying...remove when verify is needed starts

    // handleOAClose()
    // AgentverifyOtp(true)
    // setOtp3("")
    // setOtpDisable("true")

    // code will move next without verifying...remove when verify is needed ends
  };

  const Agenthandleclose = () => {
    setOtpError(false);
    handleOAClose();
    CloseOtp(false);
    setOtp3("");
    setOtpDisable("true");
    setOtpErrorMessage(false);
  };

  ///////////////////////////////////

  const Individualhandleclose = () => {
    setOtpError(false);
    handleOUClose();
    CloseOtp(false);
    setOtp("");
    setOtpDisable("true");
    setOtpErrorMessage(false);
  };

  const { data2 } = useContext(userContext);

  const [otpError, setOtpError] = useState(false);

  const IndividualVerifyOTP = async () => {
    const OtpVerifyData = {
      otp: otp,
      phone: data2.IndidualMobileNumber,
    };

    const otpVerifyDataResponse = await axios.post(
      CommonConstants.BASE_URL + "/verifyotpbyphone",
      OtpVerifyData
    );

    if (otpVerifyDataResponse.data.status === false) {
      setOtpDisable("true");
      setOtpErrorMessage(true);
      setotpErrorShakeMessage(true);
      setOtp("");
      setOtpError(true);
    } else if (otpVerifyDataResponse.data.status === true) {
      localStorage.setItem("MobileNumber", data2.IndidualMobileNumber);
      setOtpErrorMessage(false);
      setotpErrorShakeMessage(false);
      setOtpError(false);
      Individualhandleclose();
      IndividualverifyOtp(true);
      setOtp("");
      setOtpDisable("false");
    }

    // code to verify otp end

    // code will move next without verifying...remove when verify is needed starts

    // Individualhandleclose()
    // IndividualverifyOtp(true)
    // setOtp("")
    // setOtpDisable("true")

    // code will move next without verifying...remove when verify is needed ends
  };

  ////////////////////////////////////

  const BussinessVerifyOTP = async () => {
    // code to verify otp start
    try {
      const OtpVerifyData = {
        otp: otp2,
        phone: data2.Business_MobileNumber,
      };
      // console.log(OtpVerifyData, " OtpVerifyData")

      const otpVerifyDataResponse = await axios.post(
        CommonConstants.BASE_URL + "/verifyotpbyphone",
        OtpVerifyData
      );

      // console.log(otpVerifyDataResponse, " otpVerifyDataResponse")

      if (otpVerifyDataResponse.data.status === false) {
        setOtpErrorMessage(true);
        setotpErrorShakeMessage(true);
        setOtp2("");
        setOtpError(true);
      } else if (otpVerifyDataResponse.data.status === true) {
        localStorage.setItem("MobileNumber", data2.IndidualMobileNumber);
        setotpErrorShakeMessage(false);
        setOtpErrorMessage(false);
        setOtpError(false);
        handleOBClose();
        BussinessverifyOtp(true);
        setOtp2("");
        setOtpDisable("true");
      }
    } catch (e) {
      console.log(e);
    }

    // code to verify otp end

    // code will move next without verifying...remove when verify is needed starts

    // handleOBClose()
    // BussinessverifyOtp(true)
    // setOtp2("")
    // setOtpDisable("true")

    // code will move next without verifying...remove when verify is needed ends
  };

  const Bussinesshandleclose = () => {
    setOtpError(false);
    handleOBClose();
    CloseOtp(false);
    setOtp2("");
    setOtpDisable("true");
    setOtpErrorMessage(false);
  };

  const changenumber = () => {
    setOtpError(false);

    document.getElementById("phonemsg").classList.remove("d-none");
    document.getElementById("otpmsg").classList.add("d-none");

    document.getElementById("otprecever").style.display = "none";
    document.getElementById("OTPtext").style.display = "none";
    document.getElementById("otpbtn").style.display = "none";
    document.getElementById("ChangeMobile").style.display = "block";
    document.getElementById("ChangeMobileOTPresendBtn").style.display = "block";
  };

  const [mobileNew, setMobileNew] = useState("");

  const changeMobileNumber = (e) => {
    setMobileNew(e.target.value);
  };

  const IndividualMobileVerifyOTP = async () => {
    if (validator.error_input_validation("Change_Mobile_Step2")) {
      const OtpData = {
        title: "Legal Remit",
        phone: mobileNew,
      };

      const sendOtpResponse = await axios.post(
        CommonConstants.BASE_URL + "/sendotp",
        OtpData
      );

      // console.log(sendOtpResponse.data);

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
    }
  };

  const handleChange = (e) => {
    setOtp(e);
    if (e.length == 6) {
      setotpErrorShakeMessage(false);
      setAutoOtp(true);
    } else {
      setOtpDisable("true");
      setotpErrorShakeMessage(true);
    }
  };
  const handleChange2 = (e) => {
    setOtp2(e);

    if (e.length == 6) {
      setotpErrorShakeMessage(false);
      // setOtpDisable("false");
      setAutoOtp2(true);
    } else {
      setOtpDisable("true");
      setotpErrorShakeMessage(true);
    }
  };

  const handleChange3 = (e) => {
    // debugger
    setOtp3(e);

    if (e.length == 6) {
      setotpErrorShakeMessage(false);
      setOtpDisable("false");
      setAutoOtp3(true);
    } else {
      setOtpDisable("true");
      setotpErrorShakeMessage(true);
    }
  };

  const [ExistEmail, setExistEmail] = useState(false);

  const ExistEmailVerify = async (e) => {
    try {
      if (e.target.value != "") {
        const UserExist = {
          email: e.target.value,
        };

        const EmailExistVerify = await axios.post(
          CommonConstants.BASE_URL + "/checkuserexistornot",
          UserExist
        );

        if (EmailExistVerify.data.status === true) {
          setExistEmail(false);
          IndividualEmailOtpvalueValid(0);
        }
      }
    } catch (e) {
      setExistEmail(true);
      IndividualEmailOtpvalueValid(1);
      console.log(e);
    }
  };

  const [ExistMobile, setExistMobile] = useState(false);
  const [validationMobile, setvalidationMobile] = useState(false);

  const ExistMobileVerify = async (e) => {
    console.log("ExistMobileVerify", e.target.value);
    try {
      const UserExist = {
        phone: e.target.value,
      };
      // console.log(document.getElementById("OtpNumber").value, " OtpVerifyData By Id")

      const MobileNumberVerify = await axios.post(
        CommonConstants.BASE_URL + "/checkuserexistornot",
        UserExist
      );
      // console.log("otpVerifyDataResponse",MobileNumberVerify)

      if (MobileNumberVerify.data.status === true) {
        setExistMobile(false);
        IndividualMobileOtpvalueValid(0);
      }
    } catch (e) {
      setExistMobile(true);
      IndividualMobileOtpvalueValid(1);
    }
  };

  const [BExistEmail, setBExistEmail] = useState(false);

  const BExistEmailVerify = async (e) => {
    try {
      if (e.target.value != "") {
        const UserExist = {
          email: e.target.value,
        };
        // console.log(UserExist, " checkuserexistornot");
        // console.log(document.getElementById("OtpNumber").value, " OtpVerifyData By Id")

        const MobileNumberVerify = await axios.post(
          CommonConstants.BASE_URL + "/checkuserexistornot",
          UserExist
        );
        // console.log("otpVerifyDataResponse",MobileNumberVerify)
        if (MobileNumberVerify.data.status === false) {
          setBExistEmail(true);
          BusinessEmailOtpvalueValid(1);
        } else {
          setBExistEmail(false);
          BusinessEmailOtpvalueValid(0);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [BExistMobile, setBExistMobile] = useState(false);

  const BExistMobileVerify = async (e) => {
    try {
      const UserExist = {
        phone: e.target.value,
      };
      // console.log(UserExist, " checkuserexistornot");
      // console.log(document.getElementById("OtpNumber").value, " OtpVerifyData By Id")

      const MobileNumberVerify = await axios.post(
        CommonConstants.BASE_URL + "/checkuserexistornot",
        UserExist
      );
      // console.log("otpVerifyDataResponse",MobileNumberVerify)
      if (MobileNumberVerify.data.status === false) {
        setBExistMobile(true);
        BusinessMobileOtpvalueValid(1);
      } else {
        setBExistMobile(false);
        BusinessMobileOtpvalueValid(0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [AExistEmail, setAExistEmail] = useState(false);

  const AExistEmailVerify = async (e) => {
    try {
      if (e.target.value != "") {
        const UserExist = {
          email: e.target.value,
        };
        // console.log(UserExist, " checkuserexistornot");
        // console.log(document.getElementById("OtpNumber").value, " OtpVerifyData By Id")

        const MobileNumberVerify = await axios.post(
          CommonConstants.BASE_URL + "/checkuserexistornot",
          UserExist
        );
        // console.log("otpVerifyDataResponse",MobileNumberVerify)
        if (MobileNumberVerify.data.status === false) {
          setAExistEmail(true);
          AgentEmailOtpvalueValid(1);
        } else {
          setAExistEmail(false);
          AgentEmailOtpvalueValid(0);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (ExistEmail == false && ExistMobile == false) {
      handleEmailAndPhoneValid(false);
    } else {
      handleEmailAndPhoneValid(true);
    }
  }, [ExistEmail, ExistMobile]);

  const [AExistMobile, setAExistMobile] = useState(false);

  const AExistMobileVerify = async (e) => {
    try {
      const UserExist = {
        phone: e.target.value,
      };
      const MobileNumberVerify = await axios.post(
        CommonConstants.BASE_URL + "/checkuserexistornot",
        UserExist
      );
      if (MobileNumberVerify.data.status === false) {
        setAExistMobile(true);
        AgentMobileOtpvalueValid(1);
      } else {
        setAExistMobile(false);
        AgentMobileOtpvalueValid(0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const mobilevalidationchanges = (e) => {
    handleDataStep2(e);
    var mobilenumbervalidate = e.target.value;
    setExistMobile(false);

    var phoneno = /^(?!0|4)\d{5,15}$/;
    var zerovalid = /^((04))\d{8}$/;
    var Fourvalid = /^4\d{8}$/;

    if (CPhoneCode == "+61") {
      setvalidationMobile(true);
      if (zerovalid.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      } else if (Fourvalid.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      } else if (
        mobilenumbervalidate.indexOf("04") === "0" &&
        mobilenumbervalidate.charAt(0) === "4"
      ) {
        setvalidationMobile(true);
      }
    } else {
      if (phoneno.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      } else {
        setvalidationMobile(false);
      }
    }
  };

  const mobilevalidationchanges1 = (e) => {
    handleDataStep2(e);
    var mobilenumbervalidate = e.target.value;
    setExistMobile(false);
    var phoneno = /^(?!0|4)\d{5,15}$/;
    var zerovalid = /^((04))\d{8}$/;
    var Fourvalid = /^4\d{8}$/;
    // if (
    //   mobilenumbervalidate.charAt(0) === "0" ||
    //   mobilenumbervalidate.charAt(0) === "4"
    // ) {
    //   setvalidationMobile(true);
    // } else {
    //   setvalidationMobile(false);
    // }

    // if (zerovalid.test(mobilenumbervalidate)) {
    //   setvalidationMobile(false);
    // } else if (Fourvalid.test(mobilenumbervalidate)) {
    //   setvalidationMobile(false);
    // }
    if (CPhoneCode == "+61") {
      setvalidationMobile(true);
      if (zerovalid.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      } else if (Fourvalid.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      } else if (
        mobilenumbervalidate.indexOf("04") === "0" &&
        mobilenumbervalidate.charAt(0) === "4"
      ) {
        setvalidationMobile(true);
      }
    } else {
      if (phoneno.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      } else {
        setvalidationMobile(false);
      }
    }
  };

  const mobilevalidationchanges2 = (e) => {
    handleDataStep2(e);
    var mobilenumbervalidate = e.target.value;
    setExistMobile(false);
    var phoneno = /^(?!0|4)\d{5,15}$/;
    var zerovalid = /^((04))\d{8}$/;
    var Fourvalid = /^4\d{8}$/;
    // if (
    //   mobilenumbervalidate.charAt(0) === "0" ||
    //   mobilenumbervalidate.charAt(0) === "4"
    // ) {
    //   setvalidationMobile(true);
    // } else {
    //   setvalidationMobile(false);
    // }

    // if (zerovalid.test(mobilenumbervalidate)) {
    //   setvalidationMobile(false);
    // } else if (Fourvalid.test(mobilenumbervalidate)) {
    //   setvalidationMobile(false);
    // }
    if (CPhoneCode == "+61") {
      setvalidationMobile(true);
      if (zerovalid.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      } else if (Fourvalid.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      } else if (
        mobilenumbervalidate.indexOf("04") === "0" &&
        mobilenumbervalidate.charAt(0) === "4"
      ) {
        setvalidationMobile(true);
      }
    } else {
      if (phoneno.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      } else {
        setvalidationMobile(false);
      }
    }
  };

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
                          value={step1value.IndidualFirstname}
                          name="IndidualFirstname"
                          onChange={handleDataStep2}
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
                          name="IndidualMiddlename"
                          onChange={handleDataStep2}
                          value={step1value.IndidualMiddlename}
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
                          name="IndidualLastname"
                          onChange={handleDataStep2}
                          value={step1value.IndidualLastname}
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
                          name="IndidualEmail"
                          onChange={handleDataStep2}
                          onBlur={IndividualEmailOtp}
                          value={
                            step1value.IndidualEmail == ""
                              ? ""
                              : step1value.IndidualEmail
                          }
                          placeholder="Email"
                          className={`formcontrol required email form-input ${
                            ExistEmail === true ? "border-danger" : ""
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
                            ExistEmail === true ? "d-block" : "d-none"
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
                            defaultValue={CPhoneCode}
                            placeholder="Mobile"
                            readOnly
                            className={`inputphonecode countrycode pe-0 formcontroll1 required form-input ${
                              ExistMobile === true ? "border-danger" : ""
                            }`}
                          />
                          <label className="form-label1">Mobile</label>
                          <Form.Control
                            type="tel"
                            name="IndidualMobileNumber"
                            onChange={(e) => {
                              mobilevalidationchanges(e);
                            }}
                            onBlur={IndividualhandlemobileNo}
                            value={step1value.IndidualMobileNumber}
                            placeholder="Mobile"
                            className={`inputphonenum inputmobile formcontroll2 required phone ps-0 ${
                              ExistMobile === true ? "border-danger" : ""
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
                            ExistMobile === true ? "d-block" : "d-none"
                          }`}
                        >
                          Mobile Already Exist
                        </small>
                        <small
                          className={`text-danger  ms-2 error_font  ${
                            validationMobile === true ? "d-block" : "d-none"
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
                            name="Indidualpassword"
                            onChange={(e) => {
                              handlepasswordset(e);
                              handlePasswordChange(e);
                            }}
                            placeholder="Password"
                            autoComplete="false"
                            className="formcontrol required password form-input11 form-input"
                            onFocus={handleTextboxFocus}
                            onBlur={(e) => {
                              handleTextboxBlur(e);
                              setI_Password(e.target.value);
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
                          name="IndidualCpassword"
                          onChange={handleCpasswordset}
                          // onKeyDown={handleCpassworCheck}
                          placeholder="Confirm Password"
                          autoComplete="false"
                          className={`formcontrol required form-input11 cpassword form-input ${
                            CpasswordValidator === true ? "error_Border" : ""
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

                <Row id="steptwo">
                  <div className="text-center">
                    <label className="text-center text-black mb-4">
                      User Details
                    </label>
                  </div>
                  <Form id="Bussiness_Details_step2">
                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="successText main fa fa-user "></i>
                        <Form.Control
                          type="text"
                          placeholder="Full Name"
                          onChange={handleDataStep2}
                          value={step1value.Business_Fullname}
                          name="Business_Fullname"
                          className="formcontrol required form-input"
                        />
                        <label className="form-label1">Full Name</label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Your Full Name
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="successText main fa fa-user "></i>
                        <Form.Control
                          type="text"
                          placeholder="Business Name"
                          onChange={handleDataStep2}
                          name="Business_BusinessName"
                          value={step1value.Business_BusinessName}
                          className="formcontrol required form-input"
                        />
                        <label className="form-label1">Business Name</label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Your Business Name
                        </small>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="successText main fa fa-user "></i>
                        <Form.Control
                          type="text"
                          placeholder="ACN/ABN/Registration No"
                          onChange={handleDataStep2}
                          value={step1value.Business_RegistrationNo}
                          name="Business_RegistrationNo"
                          className="formcontrol required form-input"
                        />
                        <label className="form-label1">
                          ACN/ABN/Registration No
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Your ACN/ABN/Registration Number
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="successText main fa fa-map-marker "></i>
                        <Form.Control
                          type="text"
                          placeholder="Address of Business"
                          ref={autocompleteRef}
                          onChange={handleDataStep2}
                          name="Business_AddressofBusiness"
                          className="formcontrol required form-input"
                        />
                        <label className="form-label1">
                          Address of Business
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Your Business Address
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
                          placeholder="Email"
                          onChange={handleDataStep2}
                          onBlur={BusinessEmailOtp}
                          value={
                            step1value.Business_BusinessEmail == ""
                              ? ""
                              : step1value.Business_BusinessEmail
                          }
                          name="Business_BusinessEmail"
                          className={`formcontrol required email form-input ${
                            BExistEmail === true ? "border-danger" : ""
                          }`}
                        />
                        <label className="form-label1">Email</label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Valid Email Address
                        </small>
                        <small
                          className={`text-danger  ms-2 error_font  ${
                            BExistEmail === true ? "d-block" : "d-none"
                          }`}
                        >
                          Email Already Exist
                        </small>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <div className="d-flex">
                          <i className="successText main fa fa-mobile "></i>
                          <Form.Control
                            type="text"
                            // name="IndidualMobileNumber"
                            // onChange={handleDataStep2}
                            // onBlur={BusinessmobilenoOtp}
                            defaultValue={CPhoneCode}
                            placeholder="Mobile"
                            readOnly
                            className={`inputphonecode formcontroll1 required  form-input ${
                              BExistMobile === true ? "border-danger" : ""
                            }`}
                          />
                          <Form.Control
                            type="text"
                            placeholder="Mobile"
                            onChange={(e) => {
                              mobilevalidationchanges1(e);
                            }}
                            onBlur={BusinessmobilenoOtp}
                            // defaultValue={CPhoneCode}
                            value={step1value.Business_MobileNumber}
                            name="Business_MobileNumber"
                            className={`inputphonenum inputmobile formcontroll2 required phone form-input ${
                              BExistMobile === true ? "border-danger" : ""
                            }`}
                          />
                          <label className="form-label1">Mobile</label>
                        </div>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Valid Mobile Number
                        </small>
                        <small
                          className={`text-danger  ms-2 error_font  ${
                            BExistMobile === true ? "d-block" : "d-none"
                          }`}
                        >
                          Mobile Number Already Exist
                        </small>
                        <small
                          className={`text-danger  ms-2 error_font  ${
                            validationMobile === true ? "d-block" : "d-none"
                          }`}
                        >
                          This mobile Number must start with 04 or 4 and have 10
                          or 9 digits respectively
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
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
                          <i className="successText fa fa-lock left1"></i>

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
                            placeholder="Password"
                            onChange={(e) => {
                              handleBpasswordset(e);
                              handleBusinessPasswordChange(e);
                            }} //handleBCpasswordset}
                            name="Business_password"
                            className="formcontrol required password form-input11 form-input"
                            onFocus={handleTextboxFocus1}
                            onBlur={(e) => {
                              handleTextboxBlur1(e);
                              setB_Password(e.target.value);
                            }}
                          />
                          <label className="form-label1">Password</label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please Enter Your Password
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
                          placeholder="Confirm Password"
                          onChange={handleBCpasswordset} //handleDataStep2}
                          name="Business_C_password"
                          className={`formcontrol required cpassword form-input11 form-input ${
                            BCpasswordValidator === true ? "error_Border" : ""
                          }`}
                        />
                        <label className="form-label1">Confirm Password</label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Confirm Your password
                        </small>
                        <small className="responsiveFontLarge  d-none text-danger error_message_matchpass ms-2 error_message">
                          Password and confirm password are not matching
                        </small>
                      </Form.Group>
                    </Row>
                  </Form>
                </Row>

                <Row id="stepthree">
                  <div className="text-center">
                    <label className="text-center text-black mb-4">
                      Agent Details
                    </label>
                  </div>
                  <Form id="Agent_Details_step2">
                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="successText main fa fa-user "></i>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          onChange={handleDataStep2}
                          value={step1value.Agent_Firstname}
                          name="Agent_Firstname"
                          className="formcontrol required form-input"
                        />
                        <label className="form-label1">First Name</label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
                          placeholder="Middle Name"
                          onChange={handleDataStep2}
                          value={step1value.Agent_Middlename}
                          name="Agent_Middlename"
                          className="formcontrol form-input"
                        />
                        {/* <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error" >Please Enter The Middle Name</small> */}
                        <label className="form-label1">Middle Name</label>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="successText main fa fa-user "></i>
                        <Form.Control
                          type="text"
                          placeholder="Last Name"
                          onChange={handleDataStep2}
                          value={step1value.Agent_Lastname}
                          name="Agent_Lastname"
                          className="formcontrol required form-input"
                        />
                        <label className="form-label1">Last Name</label>
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
                          placeholder="Email"
                          onChange={handleDataStep2}
                          onBlur={AgentEmailOtp}
                          value={
                            step1value.Agent_Email == ""
                              ? ""
                              : step1value.Agent_Email
                          }
                          name="Agent_Email"
                          className={`formcontrol required email form-input ${
                            AExistEmail === true ? "border-danger" : ""
                          }`}
                          // className="formcontrol required email"
                        />
                        <label className="form-label1">Email</label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Valid Email Address
                        </small>
                        <small
                          className={`text-danger  ms-2 error_font  ${
                            AExistEmail === true ? "d-block" : "d-none"
                          }`}
                        >
                          Email Already Exist
                        </small>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <div className="d-flex">
                          <i className="successText main fa fa-mobile "></i>
                          <Form.Control
                            type="text"
                            // name="IndidualMobileNumber"
                            // onChange={handleDataStep2}
                            // onBlur={AgenthandlemobileNo}
                            defaultValue={CPhoneCode}
                            placeholder="Mobile"
                            readOnly
                            className={`inputphonecode formcontroll1 required form-input ${
                              AExistMobile === true ? "border-danger" : ""
                            }`}
                          />
                          <Form.Control
                            type="text"
                            placeholder="Mobile"
                            // defaultValue={CPhoneCode}
                            onChange={(e) => {
                              mobilevalidationchanges2(e);
                            }}
                            onBlur={AgenthandlemobileNo}
                            value={step1value.Agent_MobileNumber}
                            name="Agent_MobileNumber"
                            className={` inputphonenum inputmobile formcontroll2 required phone form-input ${
                              AExistMobile === true ? "border-danger" : ""
                            }`}
                          />
                          <label className="form-label1">Mobile</label>
                        </div>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Valid Mobile Number
                        </small>
                        <small
                          className={`text-danger  ms-2 error_font  ${
                            AExistMobile === true ? "d-block" : "d-none"
                          }`}
                        >
                          Mobile Number Already Exist
                        </small>
                        <small
                          className={`text-danger  ms-2 error_font  ${
                            validationMobile === true ? "d-block" : "d-none"
                          }`}
                        >
                          This mobile Number must start with 04 or 4 and have 10
                          or 9 digits respectively
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <OverlayTrigger
                        show={isPopoverVisible2 && !isPasswordValid}
                        placement="right"
                        overlay={popover2}
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
                            placeholder="Password"
                            onChange={(e) => {
                              handleApasswordset(e);
                              handleAgentPasswordChange(e);
                            }} //handleACpasswordset}
                            name="Agent_password"
                            className="formcontrol required password form-input11 form-input"
                            onFocus={handleTextboxFocus2}
                            onBlur={(e) => {
                              handleTextboxBlur2(e);
                              setA_Password(e.target.value);
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
                          placeholder="Confirm Password"
                          onChange={handleACpasswordset} //handleDataStep2}
                          name="Agent_C_password"
                          className={`formcontrol required cpassword form-input11 form-input ${
                            ACpasswordValidator === true ? "error_Border" : ""
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
        </Container>
      </section>

      {/* User(Individual) Otp PopUp */}
      <Modal show={OUshow}>
        <Modal.Header
          className="d-flex align-items-center"
          closeButton
          onHide={Individualhandleclose}
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
              // value={OtpValue}
              // onChange={handleChange}
              id="OtpNumber"
              numInputs={6}
              value={otp}
              onChange={handleChange}
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
                  onChange={changeMobileNumber}
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
                        onClick={Resendotp}
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
                      onClick={changenumber}
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
                    disabled={otpDisable == "true" ? true : false}
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
                    onClick={IndividualMobileVerifyOTP}
                  >
                    Resend OTP
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Modal>

      {/* Bussiness Otp PopUp */}
      <Modal show={OBshow}>
        <Modal.Header
          className="d-flex align-items-center"
          closeButton
          onHide={Bussinesshandleclose}
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
              className="responsiveFontLarge  text-black text-center normal "
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
              className={` ${
                otpErrorMessage === true ? "error_otpModal" : "otpModal"
              } ${otpErrorShakeMessage === true ? "Error_Otp_input" : ""}`}
              // value={OtpValue}
              // onChange={handleChange}
              numInputs={6}
              value={otp2}
              onChange={(e) => {
                handleChange2(e);
              }}
            />
          </div>

          <Form id="Change_Mobile_Step2">
            <div id="ChangeMobile" className="otppopupMobilefield">
              <Form.Group as={Col} className="left-inner-addon input-container">
                <i className="successText main fa fa-mobile "></i>
                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  className="formcontrol required phone"
                  onChange={changeMobileNumber}
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
                    {/* Wait for 30 seconds before retry. */}
                    {seconds == 0 ? (
                      <small
                        className={`text-blue bolder mainAnchor pointer text-end`}
                        onClick={Resendotp2}
                      >
                        Resend OTP
                      </small>
                    ) : (
                      <small className={`bolder pointer text-end`}>
                        Resend OTP
                      </small>
                    )}
                  </small>
                  {/* <small className="responsiveFontLarge  text-black">
                    Wait for 30 seconds before retry.
                    <a className="text-blue bolder mainAnchor pointer" onClick={Resendotp2}>Resend OTP</a>
                  </small> */}
                  <br></br>
                  <br></br>
                  <small className="responsiveFontLarge  text-black text-center mt-4">
                    <a
                      className="text-blue bolder mainAnchor mt-4 pt-4 pointer"
                      onClick={changenumber}
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
                {/* <Col className="col-lg-4 text-start">
                    <p className="successText mb-0 ">SKIP</p>
                </Col> */}
                <Col className="col-lg-4">
                  <Button
                    className="greenButton border-0 roundedCorner upparcase bolder"
                    variant="primary"
                    // onClick={BussinessVerifyOTP}
                    disabled={otpDisable == "true" ? true : false}
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
                    onClick={IndividualMobileVerifyOTP}
                  >
                    Resend OTP
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Modal>

      {/* Agent Otp PopUp */}
      <Modal show={OAshow}>
        <Modal.Header
          className="d-flex align-items-center"
          closeButton
          onHide={Agenthandleclose}
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
              className="responsiveFontLarge  text-black text-center normal "
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
              className={` ${
                otpErrorMessage === true ? "error_otpModal" : "otpModal"
              } ${otpErrorShakeMessage === true ? "Error_Otp_input" : ""}`}
              numInputs={6}
              value={otp3}
              onChange={(e) => {
                handleChange3(e);
              }}
            />
          </div>

          <Form id="Change_Mobile_Step2">
            <div id="ChangeMobile" className="otppopupMobilefield">
              <Form.Group as={Col} className="left-inner-addon input-container">
                <i className="successText main fa fa-mobile "></i>
                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  className="formcontrol required phone"
                  onChange={changeMobileNumber}
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
                    {/* Wait for 30 seconds before retry. */}
                    {seconds == 0 ? (
                      <small
                        className={`text-blue bolder mainAnchor pointer text-end`}
                        onClick={Resendotp3}
                      >
                        Resend OTP
                      </small>
                    ) : (
                      <small className={`bolder pointer text-end`}>
                        Resend OTP
                      </small>
                    )}
                  </small>
                  {/* <small className="responsiveFontLarge  text-black">
                    Wait for 30 seconds before retry.
                    <a className="text-blue bolder mainAnchor pointer" onClick={Resendotp3}>Resend OTP</a>
                  </small> */}
                  <br></br>
                  <br></br>
                  <small className="responsiveFontLarge  text-black text-center mt-4">
                    <a
                      className="text-blue bolder mainAnchor mt-4 pt-4 pointer"
                      onClick={changenumber}
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
            {/* <Col className="col-lg-4 text-start">
                    <p className="successText mb-0 pointer" onClick={AgenthandleSkip}>SKIP</p>
                </Col> */}
            <div id="otpbtn">
              <Row className="align-items-center justify-content-evenly pb-2">
                <Col className="col-lg-4 text-start">
                  <p
                    className="successText mb-0 pointer"
                    onClick={AgenthandleSkip}
                  >
                    SKIP
                  </p>
                </Col>
                <Col className="col-lg-4">
                  <Button
                    className="greenButton border-0 roundedCorner upparcase bolder"
                    variant="primary"
                    // onClick={AgentVerifyOTP}
                    disabled={otpDisable == "true" ? true : false}
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
                    onClick={IndividualMobileVerifyOTP}
                  >
                    Resend OTP
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </Modal>
    </>
  );
}
