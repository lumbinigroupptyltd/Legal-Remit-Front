import React, { useState } from "react";
import "./RefundsPage.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Form, Row, Button, Col } from "react-bootstrap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Typography, makeStyles } from '@mui/material';
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import { useLocation } from "react-router-dom";
import ModalComponent from "../Dashbord/ModalComponent";

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 15,
    color: 'red',
  },
}));


export default function RefundsPage(props) {
  const location = useLocation();
  const classes = useStyles();
  const [customerId, setCustomerId] = useState(localStorage.getItem('idc'));
  const [value, setValue] = useState("isTransactionNumber");
  const [selectedOption, setSelectedOption] = useState(customerId !== null && customerId !== "null" ? "option1" : "option2");
  const [error, setError] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validateTransactionNumber, setValidateTransactionNumber] = useState(true);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [message, setMessage] = useState("");
  const [complaintWithCustomerId, setcomplaintWithCustomerId] = useState({
    customerId: "",
    case: "",
    transactionNumber: props.location.state ? props.location.state : "",
    description: ""
  });
  const [complaintWithNoCustomerId, setcomplaintWithNoCustomerId] = useState({
    fullName: "",
    email: "",
    phone_number: "",
    transctionNumber: props.location.state ? props.location.state : "",
    description: ""
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == 'transactionNumber') {
      const alphanumericRegex = /^[a-zA-Z0-9-]*$/;
      if (alphanumericRegex.test(value)) {
        setcomplaintWithCustomerId({ ...complaintWithCustomerId, [name]: value });
      }
    } else {

      setcomplaintWithCustomerId({ ...complaintWithCustomerId, [name]: value });
    }
  }
  const handleInputChangesForNoCoutomerId = (e) => {
    const { name, value } = e.target;
    if (name == 'transctionNumber') {
      const alphanumericRegex = /^[a-zA-Z0-9-]*$/;
      if (alphanumericRegex.test(value)) {
        setcomplaintWithNoCustomerId({ ...complaintWithNoCustomerId, [name]: value });
      }
    } else if (name == "fullName") {
      const alphabeticValue = e.target.value.replace(/[^A-Za-z\s]/g, "");
      setcomplaintWithNoCustomerId({ ...complaintWithNoCustomerId, [name]: alphabeticValue });
    } else {

      setcomplaintWithNoCustomerId({ ...complaintWithNoCustomerId, [name]: value });
    }

  }
  const handleChange = (event) => {
    setValue(event.target.value);

    // Update the validation state based on the selected radio button value
    if (event.target.value === "isTransactionNumber") {
      setValidateTransactionNumber(true); // Enable validation
    } else {
      setValidateTransactionNumber(false); // Disable validation
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const isValidEmail = (email) => {
    // Allow specific domains like "armyspy.com" and "gmail.com"
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const submitComplinet = async () => {
    if (selectedOption === 'option1') {
      console.log(complaintWithCustomerId.transactionNumber, "complaintWithCustomerId.transactionNumber");
      if (customerId === "null" && complaintWithCustomerId.customerId === "") {
        setError(true);
      } else {
        setError(false);
      } if (
        value === "isTransactionNumber" &&
        (complaintWithCustomerId.transactionNumber === "" ||
          complaintWithCustomerId.transactionNumber === undefined)
      ) {
        setError(true);
      } else if (complaintWithCustomerId.description == "" || complaintWithCustomerId.description == undefined) {
        setError(true);
      } else {
        const userID = localStorage.getItem('Id');
        const url = `${CommonConstants.NEW_BASE_URL}/checktransactionno?userId=${userID}&transactionNo=${complaintWithCustomerId.transactionNumber}`;
        const responce = await axios.get(url);
        if (responce.data.data == false) {
          setModalShowAdd(true);
          setMessage("Refund request already generated with this transaction number.");
        } else {
          const payload = {
            customerId: complaintWithCustomerId.customerId || customerId,
            reason: complaintWithCustomerId.description,
            title: complaintWithCustomerId.case,
            haveCustomerId: selectedOption == 'option1' ? true : false,
            userId: userID == null ? 0 : userID,
            fullName: "",
            email: "",
            phone: "",
            haveTransactionNo: false,
            transactionNo: value == "isTransactionNumber" ? complaintWithCustomerId.transactionNumber : "",
          }
          axios.post(CommonConstants.NEW_BASE_URL + "/savetransactionrefundrequest", payload).then((responce) => {
            if (responce.data.status == true) {
              setcomplaintWithCustomerId({
                customerId: "",
                case: "",
                description: "",
                transactionNumber: ""
              });
              setcomplaintWithNoCustomerId({
                fullName: "",
                email: "",
                phone_number: "",
                transctionNumber: "",
                description: ""
              });
              setModalShowAdd(true);
              setMessage(responce.data.message);
            }
          }).catch(error => console.log(error));
        }
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (complaintWithNoCustomerId.fullName == "" || complaintWithNoCustomerId.fullName == undefined) {
        setError(true);
      } else if (!complaintWithNoCustomerId.phone_number || complaintWithNoCustomerId.phone_number.length <= 6) {
        setError(true);
      } else if (
        value === "isTransactionNumber" &&
        (complaintWithNoCustomerId.transctionNumber === "" ||
          complaintWithNoCustomerId.transctionNumber === undefined)
      ) {
        setError(true);
      }
      else if (complaintWithNoCustomerId.description == "" || complaintWithNoCustomerId.description == undefined) {
        setError(true);
      } else if (!complaintWithNoCustomerId.email || !isValidEmail(complaintWithNoCustomerId.email)) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
        const userID = localStorage.getItem('Id');
        const url = `${CommonConstants.NEW_BASE_URL}/checktransactionno?userId=${userID}&transactionNo=${complaintWithCustomerId.transactionNumber}`;
        const responce = await axios.get(url);

        if (responce.data.data == false) {
          setModalShowAdd(true);
          setMessage("please enter valid transaction number.");
        } else {
          const payload = {
            customerId: "",
            haveCustomerId: "",
            userId: userID == "" ? 0 : userID,
            title: '',
            fullName: complaintWithNoCustomerId.fullName,
            email: complaintWithNoCustomerId.email,
            phone: complaintWithNoCustomerId.phone_number,
            haveCustomerId: selectedOption == 'option1' ? true : false,
            transactionNo: value == 'isTransactionNumber' ? complaintWithNoCustomerId.transctionNumber : "",
            haveTransactionNo: value == 'isTransactionNumber' ? true : false,
            reason: complaintWithNoCustomerId.description
          }
          axios.post(CommonConstants.NEW_BASE_URL + "/savetransactionrefundrequest", payload).then((responce) => {
            if (responce.data.status == true) {
              setModalShowAdd(true);
              setMessage(responce.data.message);
              setcomplaintWithNoCustomerId({
                fullName: "",
                email: "",
                phone_number: "",
                transctionNumber: "",
                description: ""
              });
              setcomplaintWithCustomerId({
                customerId: "",
                case: "",
                description: "",
                transactionNumber: ""
              });
            }
          }).catch(error => console.log(error));
        }
      }
    }

  };

  const handleKeyPress = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    const inputValue = event.target.value;

    // Allow only numeric keys (ASCII 48 to 57) and a maximum length of 11 digits
    if ((charCode < 48 || charCode > 57) || inputValue.length >= 11) {
      event.preventDefault();
    }
  };
  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage p-5 ">
            <h2 className="bolder purpleText text-center mb-1">Refund Request</h2>

            <div className="container ">
              <div className="d-flex flex-column text-center responsiveFontLarge">
                <div className="grayTextP my-3 responsiveFontLarge">
                  You may be able to request a refund after <br></br> your
                  transaction.
                </div>
                <Form>
                  <fieldset>
                    <Row>
                      <Form.Group className="mb-4">
                        <span htmlFor="disabledSelect" className="text-black responsiveFontLarge">
                          Choose an option to request a refund
                        </span>
                        <Form.Select
                          onChange={handleSelectChange}
                          id="disabledSelect1"
                          className="mt-3 form-input"
                          defaultValue={selectedOption}
                          disabled={customerId !== null && customerId !== "null"}
                        >
                          <option value="option1" >I have Customer ID</option>
                          <option value="option2"> I don’t have Customer ID</option>
                        </Form.Select>

                      </Form.Group>
                    </Row>
                    {selectedOption === 'option1' && (
                      <>
                        <Row className="mb-3">
                          <span
                            htmlFor="disabledSelect"
                            className="text-black my-3 responsiveFontLarge"
                          >
                            Contact Information
                          </span>
                          {customerId !== null && customerId != "null" ? ( // If customerId is present, show the input field with the value
                            <Form.Group as={Col} className="left-inner-addon input-container required test-start">
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Customer ID"
                                name="customerId"
                                className="form-input formControlStep2 reflink link"
                                value={customerId} // Set the value of the input field to customerId
                                onChange={handleInputChange}
                                disabled
                              />
                              <label htmlFor="customerId" className="form-label1">
                                Customer ID
                              </label>
                              {error && !customerId && (
                                <small className="text-danger error_message ms-2 error">Please Enter Customer ID</small>
                              )}
                            </Form.Group>
                          ) : (<Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-user "></i>
                            <Form.Control
                              type="text"
                              required
                              maxLength="11"
                              placeholder="Customer ID"
                              name="customerId"
                              className="form-input formControlStep2 reflink link "
                              onChange={handleInputChange}
                              value={complaintWithCustomerId.customerId}
                            // disabled={customerId != "null"}
                            />

                            <label for="name" className="form-label1">
                              Customer ID
                            </label>
                            {error && !complaintWithCustomerId.customerId && <small className="text-danger error_message ms-2 error">
                              Please Enter Customer ID
                            </small>}
                          </Form.Group>)}
                        </Row>

                        <Row className="mb-3">
                          <span
                            htmlFor="disabledSelect"
                            className="text-black my-3 responsiveFontLarge"
                          >
                            Transaction Information
                          </span>

                          <FormControl component="fieldset">
                            <RadioGroup
                              aria-label="gender"
                              name="transactionNumberRadio"
                              value={value}
                              onChange={handleChange}
                              className="d-flex"
                            >
                              <div className="d-flex justify-content-center respoChildFooter">
                                <FormControlLabel
                                  value="isTransactionNumber"
                                  control={<Radio />}
                                  label={
                                    <Typography className={classes.label}>
                                      I have transaction Number
                                    </Typography>
                                  }
                                  className="responsiveFontLarge"
                                />
                                <FormControlLabel
                                  value="isNotTransactionNumber"
                                  control={<Radio />}
                                  label={
                                    <Typography className={classes.label}>
                                      I don’t have transaction Number
                                    </Typography>
                                  }
                                  className="responsiveFontLarge"
                                />
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </Row>

                        {value == "isTransactionNumber" && <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required  text-start"
                          >
                            <i className="purpleText main fa fa-landmark "></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Transaction Number"
                              name="transactionNumber"
                              className="form-input formControlStep2 reflink link"
                              onChange={handleInputChange}
                              value={complaintWithCustomerId.transactionNumber}

                            />
                            <label for="name" className="form-label1">
                              Transaction number
                            </label>

                            {error && value == "isTransactionNumber" && !complaintWithCustomerId.transactionNumber && <small className="text-danger error_message ms-2 error">
                              Please Enter Transaction Number
                            </small>}
                          </Form.Group>
                        </Row>}

                        <Row className="mb-3">
                          <Form.Group
                            className="mb-3  text-start"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Control
                              as="textarea"
                              className=""
                              rows={3}
                              id="disabledSelect1"
                              placeholder="Reason for refund"
                              name="description"
                              onChange={handleInputChange}
                              value={complaintWithCustomerId.description}

                            />
                            {error &&
                              !complaintWithCustomerId.description && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Enter Reason For Refund
                                </small>
                              )}
                          </Form.Group>
                        </Row>
                      </>
                    )}

                    {selectedOption === 'option2' && (
                      <>
                        <Row className="mb-3">
                          <span
                            htmlFor="disabledSelect"
                            className="text-black my-3 responsiveFontLarge"
                          >
                            Contact Information
                          </span>
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-user "></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Full Name"
                              name="fullName"
                              className="form-input formControlStep2 reflink link"
                              onChange={handleInputChangesForNoCoutomerId}
                              value={complaintWithNoCustomerId.fullName}
                            />
                            <label for="name" className="form-label1">
                              Full name
                            </label>

                            {error && !complaintWithNoCustomerId.fullName && <small className="text-danger error_message ms-2 error">
                              Please Enter Full Name
                            </small>}
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-envelope "></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Email"
                              name="email"
                              className="form-input formControlStep2 reflink link"
                              onChange={handleInputChangesForNoCoutomerId}
                              value={complaintWithNoCustomerId.email}
                            />
                            <label for="name" className="form-label1">
                              Email
                            </label>
                            {error && !isValidEmail(complaintWithNoCustomerId.email) && (
                              <small className="text-danger error_message ms-2 error">
                                Please Enter Valid Email
                              </small>
                            )}
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-mobile "></i>
                            <Form.Control
                              type="number"
                              required
                              placeholder="Mobile Number"
                              name="phone_number"
                              className="form-input formControlStep2 reflink link"
                              onChange={handleInputChangesForNoCoutomerId}
                              onKeyPress={handleKeyPress}
                              value={complaintWithNoCustomerId.phone_number}
                            />
                            <label for="name" className="form-label1">
                              Mobile Number
                            </label>
                            {/* {error && !complaintWithNoCustomerId.phone_number && <small className="text-danger error_message ms-2 error">
                              Please Enter Mobile Number
                            </small>} */}
                            {error &&
                              (!complaintWithNoCustomerId.phone_number ||
                                complaintWithNoCustomerId.phone_number.length < 6 ||
                                !/^\d+$/.test(complaintWithNoCustomerId.phone_number)) && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Enter Valid Mobile Number
                                </small>
                              )}
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <span
                            htmlFor="disabledSelect"
                            className="text-black my-3 responsiveFontLarge"
                          >
                            Transaction Information
                          </span>

                          <FormControl component="fieldset">
                            <RadioGroup
                              aria-label="gender"
                              name="transactionNumberRadio"
                              value={value}
                              onChange={handleChange}
                              className="d-flex"
                            >
                              <div className="d-flex justify-content-center respoChildFooter">
                                <FormControlLabel
                                  value="isTransactionNumber"
                                  control={<Radio />}
                                  label={
                                    <Typography className={classes.label}>
                                      I have transaction Number
                                    </Typography>
                                  }
                                  className="responsiveFontLarge"
                                />
                                <FormControlLabel
                                  value="isNotTransactionNumber"
                                  control={<Radio />}
                                  label={
                                    <Typography className={classes.label}>
                                      I don’t have transaction Number
                                    </Typography>
                                  }
                                  className="responsiveFontLarge"
                                />
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </Row>

                        {value == "isTransactionNumber" && <Row className="mb-3">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-landmark "></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Transaction Number"
                              name="transctionNumber"
                              className="form-input formControlStep2 reflink link"
                              onChange={handleInputChangesForNoCoutomerId}
                              value={complaintWithNoCustomerId.transctionNumber}

                            />
                            <label for="name" className="form-label1">
                              Transaction number
                            </label>

                            {error && value == "isTransactionNumber" && !complaintWithNoCustomerId.transctionNumber && <small className="text-danger error_message ms-2 error">
                              Please Enter Transaction Number
                            </small>}
                          </Form.Group>
                        </Row>}

                        <Row className="mb-3">
                          <Form.Group
                            className="mb-3 text-start"
                            controlId="exampleForm.ControlTextarea1 text-start"
                          >
                            <Form.Control
                              as="textarea"
                              className=""
                              rows={3}
                              id="disabledSelect1"
                              placeholder="Reason for refund"
                              name="description"
                              onChange={handleInputChangesForNoCoutomerId}
                              value={complaintWithNoCustomerId.description}

                            />
                            {error &&
                              !complaintWithNoCustomerId.description && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Enter Reason For Refund
                                </small>
                              )}
                          </Form.Group>
                        </Row>
                      </>
                    )}
                  </fieldset>

                  <div className="">
                    <Button className="mt-2 btn btn-default purpleBackground rounded-5 text-white col-lg-3 px-2 d-block m-auto bolder" onClick={() => submitComplinet()}>
                      SUBMIT REFUND REQUEST
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Container>
        <Footer></Footer>
      </section>
      <ModalComponent
        show={modalShowAdd}
        // title11={"Transaction Refund Request Submitted Successfully."}
        title11={message}
        onHide={() => setModalShowAdd(false)}
      />
    </>
  );
}
