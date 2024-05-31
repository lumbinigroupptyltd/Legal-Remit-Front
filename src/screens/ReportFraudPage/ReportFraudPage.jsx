import React, { useEffect, useState } from "react";
import "./ReportFraudPage.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Form, Row, Button, Col } from "react-bootstrap";
import ModalComponent from "../Dashbord/ModalComponent";
import axios from "axios";
import {
  CommonConstants,
  ReportingFraud,
} from "../../Constants/common.constants";

export default function ReportFraudPage() {
  const [customerId, setCustomerId] = useState(localStorage.getItem('idc'));
  const [value, setValue] = useState("");
  const [selectedOption, setSelectedOption] = useState(customerId !== null && customerId !== "null" ? "option1" : "option2");
  const [error, setError] = useState(false);
  const [countryget, setCountryGet] = useState([]);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [complaintWithCustomerId, setcomplaintWithCustomerId] = useState({
    customerId: "",
    whoisReport: "",
    fraudSuspectCity: "",
    fraudReportingCountry: "",
    case: "",
    description: "",
  });

  const [complaintWithNoCustomerId, setcomplaintWithNoCustomerId] = useState({
    fullName: "",
    email: "",
    phone_number: "",
    whoisReport: "",
    fraudSuspectCity: "",
    fraudReportingCountry: "",
    case: "",
    description: "",
  });

  const isValidEmail = (email) => {
    // Allow specific domains like "armyspy.com" and "gmail.com"
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleInputChangesForNoCoutomerId = (e) => {
    const { name, value } = e.target;
    if (name == 'fullName') {
      const alphanumericRegex = /^[A-Za-z\s]+$/;
      if (alphanumericRegex.test(value)) {
        setcomplaintWithNoCustomerId({
          ...complaintWithNoCustomerId,
          [name]: value,
        });
      }
    } else if (name == "case") {
      const onlyChactercter = value.replace(/[^A-Za-z]+/g, '');
      setcomplaintWithNoCustomerId({
        ...complaintWithNoCustomerId,
        [name]: onlyChactercter,
      });
    } else {

      setcomplaintWithNoCustomerId({
        ...complaintWithNoCustomerId,
        [name]: value,
      });
    }
  };

  const submitComplinet = async () => {
    if (selectedOption == "option1") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (customerId === "null" && customerId === null && complaintWithCustomerId.customerId === "") {
        setError(true);
      } else {
        setError(false);
      }
      if (
        complaintWithCustomerId.case == "" ||
        complaintWithCustomerId.case == undefined
      ) {
        setError(true);
      } else if (
        complaintWithCustomerId.description == "" ||
        complaintWithCustomerId.description == undefined
      ) {
        setError(true);
      } else if (
        complaintWithCustomerId.whoisReport == "" ||
        complaintWithCustomerId.whoisReport == undefined
      ) {
        setError(true);
      } else if (
        complaintWithCustomerId.fraudSuspectCity == "" ||
        complaintWithCustomerId.fraudSuspectCity == undefined
      ) {
        setError(true);
      } else if (
        complaintWithCustomerId.fraudReportingCountry == "" ||
        complaintWithCustomerId.fraudReportingCountry == undefined
      ) {
        setError(true);
      } else {
        const payload = {
          haveCustomerId: true,
          customerId: complaintWithCustomerId.customerId || customerId,
          userId: localStorage.getItem("Id"),
          fullName: "",
          email: "",
          phone: "",
          reportingFraud: complaintWithCustomerId.whoisReport,
          fraudSuspectCountryId: +complaintWithCustomerId.fraudSuspectCity,
          fraudReportingCountryId: +complaintWithCustomerId.fraudReportingCountry,
          title: complaintWithCustomerId.case,
          details: complaintWithCustomerId.description,
        };
        await axios.post(CommonConstants.BASE_URL + "/reportfruad", payload).then((respo) => {
          if (respo.data.status == true) {
            setModalShowAdd(true);
            setcomplaintWithCustomerId({
              customerId: "",
              whoisReport: "",
              fraudSuspectCity: "",
              fraudReportingCountry: "",
              case: "",
              description: "",
            });

          }
        }).catch(err => {
          console.log(err)
        })
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (
        complaintWithNoCustomerId.fullName == "" ||
        complaintWithNoCustomerId.fullName == undefined
      ) {
        setError(true);
      } else if (
        complaintWithNoCustomerId.phone_number == "" || complaintWithNoCustomerId.phone_number.length <= 6
      ) {
        setError(true);
      } else if (
        complaintWithNoCustomerId.whoisReport == "" ||
        complaintWithNoCustomerId.whoisReport == undefined
      ) {
        setError(true);
      } else if (
        complaintWithNoCustomerId.fraudSuspectCity == "" ||
        complaintWithNoCustomerId.fraudSuspectCity == undefined
      ) {
        setError(true);
      } else if (
        complaintWithNoCustomerId.fraudReportingCountry == "" ||
        complaintWithNoCustomerId.fraudReportingCountry == undefined
      ) {
        setError(true);
      } else if (
        complaintWithNoCustomerId.case == "" ||
        complaintWithNoCustomerId.case == undefined
      ) {
        setError(true);
      } else if (
        complaintWithNoCustomerId.description == "" ||
        complaintWithNoCustomerId.description == undefined
      ) {
        setError(true);
      } else if (
        !complaintWithNoCustomerId.email ||
        !isValidEmail(complaintWithNoCustomerId.email)
      ) {
        setError(true);
      } else {
        setError(false);
        const payload = {
          haveCustomerId: false,
          customerId: "",
          userId: localStorage.getItem("Id"),
          fullName: complaintWithNoCustomerId.fullName,
          email: complaintWithNoCustomerId.email,
          phone: complaintWithNoCustomerId.phone_number,
          reportingFraud: complaintWithNoCustomerId.whoisReport,
          fraudSuspectCountryId: +complaintWithNoCustomerId.fraudSuspectCity,
          fraudReportingCountryId: +complaintWithNoCustomerId.fraudReportingCountry,
          title: complaintWithNoCustomerId.case,
          details: complaintWithNoCustomerId.description,
        }
        await axios.post(CommonConstants.BASE_URL + "/reportfruad", payload).then((respo) => {
          if (respo.data.status == true) {
            setModalShowAdd(true);
            setcomplaintWithNoCustomerId({
              fullName: "",
              email: "",
              phone_number: "",
              whoisReport: "",
              fraudSuspectCity: "",
              fraudReportingCountry: "",
              case: "",
              description: "",
            });
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  };

  const GetAllCountrys = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getcountries"
      );
      if (response.data.status === true) {
        setCountryGet(response.data.data);
      }
    } catch (err) { }
  };
  const handleOnchangeCustomerId = (e) => {
    const { name, value } = e.target;

    if (name === 'case') {
      // Use a regular expression to check if the input contains only letters (characters)
      if (/^[A-Za-z\s]+$/.test(value)) {
        setcomplaintWithCustomerId({ ...complaintWithCustomerId, [name]: value });
      }
    } else {
      setcomplaintWithCustomerId({ ...complaintWithCustomerId, [name]: value });
    }
  };


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
  useEffect(() => {
    GetAllCountrys();
    getAllData();
  }, []);

  const [userDetails, setuserDetails] = useState();
  const [userCustomerIdDetails, setuserCustomerIdDetails] = useState("");


  const getAllData = async () => {
    if (localStorage.getItem("Id")) {
      const userId = localStorage.getItem("Id");
      const payLoad = {
        id: userId, //3855
      };
      try {
        const response = await axios.post(
          `${CommonConstants.BASE_URL}/getuserinfobyid`,
          payLoad
        );
        // debugger
        // console.log(response.data.data,"getdata")
        const responseData = response.data.data;
        console.log(responseData.customerId, "Response Data");
        setuserDetails(responseData);
        setuserCustomerIdDetails(responseData.customerId);
        // GetNationalityIdAuthority();
      } catch (err) {
        console.log(err);
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
          <div className="innerAbtPage py-3">
            <h2 className="bolder purpleText text-center mb-1 responsiveFontLargeHeading">
              Report a fraud
            </h2>

            <div className="container ">
              <div className="d-flex flex-column text-center responsiveFontLarge">
                <div className="grayTextP my-3">
                  In case of fraudulent transaction you can report it to us.
                </div>

                {/* <span className="text-black my-3">
                Choose an option to request a refund
                </span> */}
                <Form>
                  <fieldset>
                    <Row>
                      <Form.Group className="mb-1">
                        <span
                          htmlFor="disabledSelect"
                          className="text-black responsiveFontLarge"
                        >
                          Choose an option to file a report a fraud
                        </span>
                        <Form.Select
                          onChange={handleSelectChange}
                          id="disabledSelect1"
                          className="mt-3 form-input"
                          defaultValue={selectedOption}
                          disabled={customerId !== null && customerId !== "null"}
                        >
                          <option value="option1">I have Customer ID</option>
                          <option value="option2">I don’t have Customer ID</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    {selectedOption === "option1" && (
                      <>
                        <Row className="mb-3">
                          <span
                            htmlFor="disabledSelect"
                            className="text-black my-3 responsiveFontLarge"
                          >
                            Contact Information
                          </span>
                          {customerId !== null && customerId != "null" ?
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Customer ID"
                                name="customerId"
                                className="form-input formControlStep2 reflink link"
                                onChange={handleOnchangeCustomerId}
                                value={customerId}
                                disabled
                              />
                              <label for="name" className="form-label1">
                                Customer ID
                              </label>

                              <small className="d-none text-danger error_message ms-2 error">
                                Please Enter Valid Referal link/Promocode
                              </small>
                            </Form.Group> :
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                maxLength="11"
                                title="Customer ID must be exactly 11 characters"
                                placeholder="Customer ID"
                                name="customerId"
                                className="form-input formControlStep2 reflink link"
                                onChange={handleOnchangeCustomerId}
                                value={complaintWithCustomerId.customerId}
                              />

                              <label for="name" className="form-label1">
                                Customer ID
                              </label>

                              {error && !complaintWithCustomerId.customerId && (
                                <small className="text-danger error_message ms-2 error">Please Enter Customer ID</small>
                              )}
                            </Form.Group>}
                        </Row>

                        <Row className="mb-3">
                          <span
                            htmlFor="disabledSelect"
                            className="text-black my-3 mb-0 responsiveFontLarge"
                          >
                            Case Details
                          </span>
                        </Row>

                        <Row>
                          <Form.Group className="mb-1 text-start">
                            <Form.Select
                              id="disabledSelect1"
                              className="mt-3 form-input"
                              name="whoisReport"
                              onChange={handleOnchangeCustomerId}
                              value={complaintWithCustomerId.whoisReport}
                            >
                              {ReportingFraud?.map((ele) => {
                                return (
                                  <option value={ele.value}> {ele.name}</option>
                                );
                              })}
                            </Form.Select>
                            {error && !complaintWithCustomerId.whoisReport && (
                              <small className="text-danger error_message ms-2 error">
                                Please Select Who Is Reporting Fraud
                              </small>
                            )}
                          </Form.Group>

                        </Row>

                        <Row>
                          <Form.Group className="mb-1 text-start">
                            <Form.Select
                              id="disabledSelect1"
                              className="mt-3 form-input"
                              name="fraudSuspectCity"
                              onChange={handleOnchangeCustomerId}
                              value={complaintWithCustomerId.fraudSuspectCity}
                            >
                              <option value="option1">
                                Fraud Suspect Country
                              </option>
                              {countryget.map((ele) => {
                                return (
                                  <option value={ele.id}>{ele.name}</option>
                                );
                              })}
                            </Form.Select>
                            {error &&
                              !complaintWithCustomerId.fraudSuspectCity && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Select Fraud Suspect Country
                                </small>
                              )}
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group className="mb-1 text-start">
                            <Form.Select
                              id="disabledSelect1"
                              className="mt-3 form-input"
                              name="fraudReportingCountry"
                              onChange={handleOnchangeCustomerId}
                              value={complaintWithCustomerId.fraudReportingCountry}
                            >
                              <option value="option1">
                                Fraud Reporting Country
                              </option>
                              {countryget.map((ele) => {
                                return (
                                  <option value={ele.id}>{ele.name}</option>
                                );
                              })}
                            </Form.Select>
                            {error &&
                              !complaintWithCustomerId.fraudReportingCountry && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Select Fraud Reporting Country
                                </small>
                              )}
                          </Form.Group>
                        </Row>

                        <Row className="mb-3">
                          <Form.Group
                            className="mb-3 text-start"
                            controlId="exampleForm.ControlTextarea1 "
                          >
                            <div>
                              <Form.Control
                                className="my-4"
                                name="case"
                                id="disabledSelect1"
                                type="text"
                                placeholder="Title"
                                onChange={handleOnchangeCustomerId}
                                value={complaintWithCustomerId.case}
                              />
                              {error && !complaintWithCustomerId.case && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Enter Title
                                </small>
                              )}
                            </div>
                            <div>
                              <Form.Control
                                as="textarea"
                              
                                rows={6}
                                id="disabledSelect1"
                                name="description"
                                placeholder="Details Of Matter"
                                onChange={handleOnchangeCustomerId}
                                value={complaintWithCustomerId.description}
                              />
                              {error && !complaintWithCustomerId.description && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Enter Details Of Matter
                                </small>
                              )}
                            </div>

                          </Form.Group>
                        </Row>
                      </>
                    )}

                    {selectedOption === "option2" && (
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

                            {error && !complaintWithNoCustomerId.fullName && (
                              <small className="text-danger error_message ms-2 error">
                                Please Enter full Name
                              </small>
                            )}
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
                        </Row>
                        <Row>
                          <Form.Group className="mb-1 text-start">
                            <Form.Select
                              id="disabledSelect1"
                              className="mt-1 form-input "
                              name="whoisReport"
                              onChange={handleInputChangesForNoCoutomerId}
                              value={complaintWithNoCustomerId.whoisReport}
                            >
                              {ReportingFraud?.map((ele) => {
                                return (
                                  <option value={ele.value}> {ele.name}</option>
                                );
                              })}
                            </Form.Select>
                          </Form.Group>
                          {error && !complaintWithNoCustomerId.whoisReport && (
                            <small className="text-start text-danger error_message ms-2 error ">
                              Please Select Who Is Reporting Fraud
                            </small>
                          )}
                        </Row>

                        <Row>
                          <Form.Group className="mb-1 text-start">
                            <Form.Select
                              id="disabledSelect1"
                              className="mt-3 form-input"
                              name="fraudSuspectCity"
                              onChange={handleInputChangesForNoCoutomerId}
                              value={complaintWithNoCustomerId.fraudSuspectCity}
                            >
                              <option value="option1">
                                Fraud Suspect Country
                              </option>
                              {countryget.map((ele) => {
                                return (
                                  <option value={ele.id}>{ele.name}</option>
                                );
                              })}
                            </Form.Select>
                          </Form.Group>
                          {error &&
                            !complaintWithNoCustomerId.fraudSuspectCity && (
                              <small className="text-start text-danger error_message ms-2 error">
                                Please Select Fraud Suspect Country
                              </small>
                            )}
                        </Row>

                        <Row>
                          <Form.Group className="mb-1 text-start">
                            <Form.Select
                              id="disabledSelect1"
                              className="mt-3 form-input"
                              name="fraudReportingCountry"
                              onChange={handleInputChangesForNoCoutomerId}
                              value={complaintWithNoCustomerId.fraudReportingCountry}
                            >
                              <option value="option1">
                                Fraud Reporting Country
                              </option>
                              {countryget.map((ele) => {
                                return (
                                  <option value={ele.id}>{ele.name}</option>
                                );
                              })}
                            </Form.Select>
                          </Form.Group>
                          {error &&
                            !complaintWithNoCustomerId.fraudReportingCountry && (
                              <small className="text-start text-danger error_message ms-2 error">
                                Please Select Fraud Reporting Country
                              </small>
                            )}
                        </Row>
                        <Row className="mb-3">
                          <Form.Group
                            className="mb-1 text-start"
                            controlId="exampleForm.ControlTextarea1"
                          >
                            <Form.Control
                              className="my-4 mb-3"
                              id="disabledSelect1"
                              name="case"
                              type="text"
                              placeholder="Title"
                              onChange={handleInputChangesForNoCoutomerId}
                              value={complaintWithNoCustomerId.case}
                            />
                            {error && !complaintWithNoCustomerId.case && (
                              <small className="text-danger error_message ms-2 error">
                                Please Enter Title
                              </small>
                            )}
                            <Form.Control
                              as="textarea"
                              rows={6}
                              id="disabledSelect1"
                              className="overflow-hidden"
                              placeholder="Details Of Matter"
                              name="description"
                              onChange={handleInputChangesForNoCoutomerId}
                              value={complaintWithNoCustomerId.description}
                            />
                            {error &&
                              !complaintWithNoCustomerId.description && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Enter Details Of Matter
                                </small>
                              )}
                          </Form.Group>
                        </Row>
                      </>
                    )}
                  </fieldset>

                  <div className="pt-1">
                    <Button className="mt-4 btn btn-default purpleBackground rounded-5 text-white col-lg-3 px-2 d-block m-auto bolder" onClick={() => submitComplinet()}>
                      SUBMIT REPORT A FRAUD
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
        title11={"Report a Fraud saved successfully ."}
        onHide={() => setModalShowAdd(false)}
      />
    </>
  );
}
