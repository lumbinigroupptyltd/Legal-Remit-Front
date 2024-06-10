import React, { useEffect, useState } from "react";
import "./ComplaintsPage.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Form, Row, Button, Col } from "react-bootstrap";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import ModalComponent from "../Dashbord/ModalComponent";

export default function ComplaintsPage() {

  const [value, setValue] = useState("");
  const [customerId, setCustomerId] = useState(localStorage.getItem('idc'));
  const [selectedOption, setSelectedOption] = useState(customerId !== null && customerId !== "null" ? "option1" : "option2");
  const [showCustomerIdInput, setShowCustomerIdInput] = useState(customerId !== null);
  const [error, setError] = useState(false);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [complaintWithCustomerId, setcomplaintWithCustomerId] = useState({
    customerId: "",
    case: "",
    description: ""
  });
  const [complaintWithNoCustomerId, setcomplaintWithNoCustomerId] = useState({
    fullName: "",
    email: "",
    phone_number: "",
    case: "",
    description: ""
  });
  const [validEmail, setValidEmail] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name == "customerId") {
      const alphanumericRegex = /^[a-zA-Z0-9]*$/;
      if (alphanumericRegex.test(value)) {
        setcomplaintWithCustomerId({ ...complaintWithCustomerId, [name]: value });
      }
    } else if (name == "case") {
      const alphanumericRegex = /^[A-Za-z\s]+$/;
      if (alphanumericRegex.test(value)) {
        setcomplaintWithCustomerId({
          ...complaintWithCustomerId,
          [name]: value,
        });
      }
    } else {
      setcomplaintWithCustomerId({ ...complaintWithCustomerId, [name]: value });
    }
  }
  const handleInputChangesForNoCoutomerId = (e) => {
    const { name, value } = e.target;
    if (name == 'case' || name == 'fullName') {
      const alphanumericRegex = /^[A-Za-z\s]+$/;
      if (alphanumericRegex.test(value)) {
        setcomplaintWithNoCustomerId({
          ...complaintWithNoCustomerId,
          [name]: value,
        });
      }
    } else {

      setcomplaintWithNoCustomerId({ ...complaintWithNoCustomerId, [name]: value });
    }
  }
  const isValidEmail = (email) => {
    // Allow specific domains like "armyspy.com" and "gmail.com"
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const submitComplinet = async () => {
    if (selectedOption === 'option1') {
      if (customerId === "null" && complaintWithCustomerId.customerId === "") {
        setError(true);
      } else {
        setError(false);
      } if (complaintWithCustomerId.case == "" || complaintWithCustomerId.case == undefined) {
        setError(true);
      } else if (complaintWithCustomerId.description == "" || complaintWithCustomerId.description == undefined) {
        setError(true);
      } else {
        const userID = localStorage.getItem('Id');
        const payload = {
          customerId: complaintWithCustomerId.customerId || customerId,
          details: complaintWithCustomerId.description,
          title: complaintWithCustomerId.case,
          haveCustomerId: selectedOption == 'option1' ? true : false,
          userId: userID == "" ? 0 : userID,
          fullName: "",
          email: "",
          phone: "",
          haveTransactionNo: false,
          transactionNo: "",
        }
        await axios.post(CommonConstants.BASE_URL + "/savecomplaints", payload).then((responce) => {
          if (responce.data.status == true) {
            setModalShowAdd(true);
            setcomplaintWithCustomerId({
              customerId: "",
              case: "",
              description: "",
            });
          }
        }).catch(error => console.log(error));
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (complaintWithNoCustomerId.fullName == "" || complaintWithNoCustomerId.fullName == undefined) {
        setError(true);
      } else if (complaintWithNoCustomerId.phone_number == "" || complaintWithNoCustomerId.phone_number.length <= 6) {
        setError(true);
      } else if (complaintWithNoCustomerId.description == "" || complaintWithNoCustomerId.description == undefined) {
        setError(true);
      } else if (!complaintWithNoCustomerId.email || !isValidEmail(complaintWithNoCustomerId.email)) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
        const userID = localStorage.getItem('Id');
        const payload = {
          customerId: "",
          haveCustomerId: "",
          userId: userID == "" ? 0 : userID,
          title: complaintWithNoCustomerId.case,
          fullName: complaintWithNoCustomerId.fullName,
          email: complaintWithNoCustomerId.email,
          phone: complaintWithNoCustomerId.phone_number,
          haveCustomerId: selectedOption == 'option1' ? true : false,
          details: complaintWithNoCustomerId.description
        }
        await axios.post(CommonConstants.BASE_URL + "/savecomplaints", payload).then((responce) => {
          if (responce.data.status == true) {
            setModalShowAdd(true);
            setcomplaintWithNoCustomerId({
              fullName: "",
              email: "",
              phone_number: "",
              case: "",
              description: "",
            });
          }
        }).catch(error => console.log(error));
      }
    }

  }
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
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
          <div className="innerAbtPage py-3 ">
            <h2 className="bolder purpleText text-center mb-1 responsiveFontLargeHeading">Complaint</h2>

            <div className="container">
              <div className="d-flex flex-column text-center ">
                <div className="responsiveFontLarge grayTextP my-3">
                  You can file a complaint about any transaction or service, we are here to help you.
                </div>

                {/* <span className="text-black my-3">
                Choose an option to request a refund
                </span> */}
                <Form>
                  <fieldset>
                    <Row>
                      <Form.Group className="mb-4">
                        <span htmlFor="disabledSelect" className="text-black responsiveFontLarge">
                          Choose an option to file a complaint
                        </span>
                        <Form.Select
                          onChange={handleSelectChange}
                          id="disabledSelect1"
                          className="mt-3 form-input"
                          defaultValue={selectedOption}
                          disabled={customerId !== null && customerId !== "null"}
                        >
                          <option value="option1">I have Customer ID</option>
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
                            <Form.Group as={Col} className="left-inner-addon input-container required text-start">
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
                              className="form-input formControlStep2 reflink link"
                              onChange={handleInputChange}
                              value={complaintWithCustomerId.customerId}
                            />

                            <label for="name" className="form-label1">
                              Customer ID
                            </label>
                            {error && !complaintWithCustomerId.customerId && <small className="text-start text-danger error_message ms-2 error">
                              Please Enter Customer ID
                            </small>}
                          </Form.Group>)}
                        </Row>
                        <Row className="mb-3">

                          <span
                            htmlFor="disabledSelect"
                            className="text-black my-3 mb-0 responsiveFontLarge"
                          >
                            Case Details
                          </span>

                          <Form.Group
                            className="mb-0 text-start"
                            controlId="exampleForm.ControlTextarea1 text-start"
                          >
                            <div className="mb-4">
                              <Form.Control className="text-start my-4 mb-0 text-start" id="disabledSelect1" type="text"
                                placeholder="Title"
                                name="case"
                                onChange={handleInputChange}
                                value={complaintWithCustomerId.case}
                              />
                              {error && !complaintWithCustomerId.case && <small className="text-start text-danger error_message ms-2 error">
                                Please Enter Title
                              </small>}
                            </div>


                            <Form.Control
                              as="textarea"
                              className="overflow-hidden text-start"
                              rows={6}
                              id="disabledSelect1"
                              placeholder="Details Of Matter"
                              name="description"
                              onChange={handleInputChange}
                              value={complaintWithCustomerId.description}
                            />
                            {error && !complaintWithCustomerId.description && <small className="text-danger error_message ms-2 error">
                              Please Enter Details Of Matter
                            </small>}
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
                              value={complaintWithNoCustomerId.phone_number}
                              onKeyPress={handleKeyPress}
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
                            className="text-black my-3 mb-0 responsiveFontLarge"
                          >
                            Case Details
                          </span>
                          <Form.Group
                            className="mb-2 text-start"
                            controlId="exampleForm.ControlTextarea1 "
                          >
                            <Form.Control className="mb-2 mt-2" name="case" id="disabledSelect1" type="text"
                              placeholder="Title"
                              onChange={handleInputChangesForNoCoutomerId}
                              value={complaintWithNoCustomerId.case}
                            />
                            {error && !complaintWithNoCustomerId.case && <small className="text-start text-danger error_message ms-2 error">
                              Please Enter Title
                            </small>}

                            <Form.Control
                              as="textarea"
                              className="overflow-hidden"
                              rows={6}
                              id="disabledSelect1"
                              placeholder="Details Of Matter"
                              name="description"
                              onChange={handleInputChangesForNoCoutomerId}
                              value={complaintWithNoCustomerId.description}
                            />
                            {error && !complaintWithNoCustomerId.description && <small className="text-start text-danger error_message ms-2 error">
                              Please Enter Details Of Matter
                            </small>}
                          </Form.Group>
                        </Row>
                      </>
                    )}
                  </fieldset>
                  <div className="">
                    <Button className=" mt-2 btn btn-default purpleBackground rounded-5 text-white col-lg-3 px-2 d-block m-auto bolder" onClick={() => submitComplinet()}>
                      SUBMIT COMPLAINT
                    </Button>
                  </div>
                </Form>
                {/* REFUND REQUEST */}

              </div>
            </div>
          </div>
        </Container>
        <Footer></Footer>
      </section>
      <ModalComponent
        show={modalShowAdd}
        title11={"Complaints Saved Successfully."}
        onHide={() => setModalShowAdd(false)}
      />
    </>
  );
}
