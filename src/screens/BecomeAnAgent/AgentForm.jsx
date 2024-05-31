import React, { useEffect, useState } from "react";
import "./BecomeAnAgent.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import Loader from "../Loader/Loader";

export default function AgentForm() {
  const navigate = useNavigate();
  const [countrys, setAllCountrys] = useState([]);
  const [errors, setErrors] = useState({});
  const [loadervalue, setloadervalue] = useState(false);
  const [message, setMessage] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    Company: "",
    BusinessStreet: "",
    BusinessCountry: 0,
    BusinessCity: "",
    PhoneNumber: "",
    EmailAddress: "",
    postCode: "",
    whereFindUs: "",
    typeofBusiness: "",
    consumers: "",
    transferservice: null,
    transferserviceInPast: null,
    transferserviceCancelled: null,
    language: "",
    moneyTransacfer: "",
    locations: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation for fields where only characters are allowed
    if (["firstName", "lastName", "typeofBusiness", "consumers", "Company", "BusinessStreet", "BusinessCity", "whereFindUs"].includes(name)) {
      // Remove non-alphabetic characters
      const alphabeticValue = value.replace(/[^A-Za-z\s]/g, "");

      setFormData((prevData) => ({
        ...prevData,
        [name]: alphabeticValue,
      }));
      return;
    }

    // Validation for numeric fields
    if (["PhoneNumber", "postCode", "locations"].includes(name)) {
      const numericValue = value.replace(/\D/g, "");

      if (name == "PhoneNumber") {
        if (numericValue.length >= 6 && numericValue.length <= 11) {
          setFormData((prevData) => ({
            ...prevData,
            [name]: numericValue,
          }));
          setMessage(false);
          return;
        } else {
          setMessage(true);
        }
      }

      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
      return;
    }

    // For other fields, update the value normally
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openAgentForm = () => {
    navigate("/agentforms");
  };

  const GetAllCountrys = async () => {
    await axios.get(CommonConstants.BASE_URL + '/getcountries').then((responce) => {
      if (responce.data.status == true) {
        setAllCountrys(responce.data.data);
      }
    }).catch(error => console.log(error))
  }

  const isValidEmail = (email) => {
    // Allow specific domains like "armyspy.com" and "gmail.com"
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    // Check for empty or invalid fields and update the errors state
    if (!formData.firstName) {
      newErrors.firstName = 'Please enter your first name';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Please enter your last name';
    }
    if (!formData.Company) {
      newErrors.Company = 'Please enter company name';
    }
    if (!formData.BusinessStreet) {
      newErrors.BusinessStreet = 'Please enter business street name';
    }
    if (!formData.BusinessCountry) {
      newErrors.BusinessCountry = 'Please Select business country';
    }
    if (!formData.BusinessCity) {
      newErrors.BusinessCity = 'Please enter business city ';
    }
    if (!formData.postCode) {
      newErrors.postCode = 'Please enter Zip/Postal Code';
    }
    if (!formData.whereFindUs) {
      newErrors.whereFindUs = 'Please enter Where did you find us';
    }
    if (!formData.typeofBusiness) {
      newErrors.typeofBusiness = 'Please enter type of Business';
    }
    if (!formData.consumers) {
      newErrors.consumers = 'Please enter type of service you want to offer to consumers.';
    }
    if (!formData.transferservice) {
      newErrors.transferservice = 'Please select money transfer services.';
    }
    if (!formData.transferserviceInPast) {
      newErrors.transferserviceInPast = 'Please select money transfer services in the past.';
    }
    if (!formData.transferserviceCancelled) {
      newErrors.transferserviceCancelled = 'Please select declined as a legal remit or services cancelled.';
    }
    if (!formData.language) {
      newErrors.language = 'Please select language';
    }
    if (!formData.moneyTransacfer) {
      newErrors.moneyTransacfer = 'Please select volumes for money transfer';
    }
    if (!formData.locations) {
      newErrors.locations = 'Please enter locations.';
    }

    if (!formData.EmailAddress || !isValidEmail(formData.EmailAddress)) {
      newErrors.EmailAddress = 'Please enter a business email address.';
    }

    if (!formData.PhoneNumber || formData.PhoneNumber.length <= 6) {
      newErrors.PhoneNumber = 'Please enter valid business phone number.';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Perform your form submission logic here
      setloadervalue(true);
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.Company,
        businessStreet: formData.BusinessStreet,
        businessCountryId: parseInt(formData.BusinessCountry),
        businessCity: formData.BusinessCity,
        postalCode: formData.postCode,
        phone: parseInt(formData.PhoneNumber),
        email: formData.EmailAddress,
        findUs: formData.whereFindUs,
        typeOfBusiness: formData.typeofBusiness,
        serviceOfferToConsumers: formData.consumers,
        currentServiceProvider: formData.transferservice === "true" ? true : false,
        pastServiceProvider: formData.transferserviceInPast === "true" ? true : false,
        isDeclined: formData.transferserviceCancelled === "true" ? true : false,
        preferredLanguage: formData.language,
        monthlyVolumn: formData.moneyTransacfer,
        totalLocation: formData.locations
      }
      const sendRequest = await axios.post(CommonConstants.BASE_URL + '/savefrontendagentsdetails', payload);
      if (sendRequest.data.status === true) {
        window.scroll(0, 0);
        setFormData({
          firstName: '',
          lastName: '',
          Company: "",
          BusinessStreet: "",
          BusinessCountry: 0,
          BusinessCity: 0,
          PhoneNumber: 0,
          EmailAddress: "",
          postCode: "",
          whereFindUs: "",
          typeofBusiness: "",
          consumers: "",
          transferservice: null,
          transferserviceInPast: null,
          transferserviceCancelled: null,
          language: "",
          moneyTransacfer: "",
          locations: ""
        });
      }
      setloadervalue(false);
    }
  };

  useEffect(() => {
    GetAllCountrys();
  }, [])
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage p-5">
            <h2 className="bolder purpleText text-center">
              Become an Agent Form
            </h2>

            <p className="text-justify responsiveFontLarge first  fs-6  pt-4">
              Interested? Fill out the form below to learn more, and we will
              contact you directly. Please note that your business must
              currently be open to the public to be considered.
            </p>

            <div className="p-3 border rounded-3 mt-3">
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                    {errors.firstName && !formData.firstName && (
                      <small className="text-danger error_message ms-2">
                        {errors.firstName}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                    {errors.lastName && !formData.lastName && (
                      <small className="text-danger error_message ms-2">
                        {errors.lastName}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" placeholder="Company" name="Company" value={formData.Company} onChange={handleChange} />
                    {errors.Company && !formData.Company && (
                      <small className="text-danger error_message ms-2">
                        {errors.Company}
                      </small>
                    )}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Business Street</Form.Label>
                    <Form.Control type="text" placeholder="Business Street" value={formData.BusinessStreet} name="BusinessStreet" onChange={handleChange} />
                    {errors.BusinessStreet && !formData.BusinessStreet && (
                      <small className="text-danger error_message ms-2">
                        {errors.BusinessStreet}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Business Country</Form.Label>
                    <Form.Select type="number" name="BusinessCountry" value={formData.BusinessCountry} onChange={handleChange}>
                      <option>Business Country</option>
                      {
                        countrys && countrys.map((row) => {
                          return (
                            <>
                              <option value={row.id}>{row.name}</option>
                            </>
                          )

                        })
                      }
                    </Form.Select>
                    {errors.BusinessCountry && !formData.BusinessCountry && (
                      <small className="text-danger error_message ms-2">
                        {errors.BusinessCountry}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Business City</Form.Label>
                    <Form.Control type="text" placeholder="Business City" value={formData.BusinessCity} name="BusinessCity" onChange={handleChange} />
                    {errors.BusinessCity && !formData.BusinessCity && (
                      <small className="text-danger error_message ms-2">
                        {errors.BusinessCity}
                      </small>
                    )}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Business Zip/Postal Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Business Zip/Postal Code"
                      name="postCode"
                      onChange={handleChange}
                      value={formData.postCode}
                    />
                    {errors.postCode && !formData.postCode && (
                      <small className="text-danger error_message ms-2">
                        {errors.postCode}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Business Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      maxLength="11"
                      placeholder="Business Phone"
                      name="PhoneNumber"
                      value={formData.PhoneNumber}
                      onChange={handleChange}
                    />
                    {errors.PhoneNumber && !formData.PhoneNumber && (
                      <small className="text-danger error_message ms-2">
                        {errors.PhoneNumber}
                      </small>
                    )}
                    {message && (
                      <small className="text-danger error_message ms-2">
                        please enter valid phone number
                      </small>
                    )}
                  </Form.Group>


                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Business Email Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Business Email Address"
                      name="EmailAddress"
                      onChange={handleChange}
                      value={formData.EmailAddress}
                    />
                    {errors.EmailAddress && !isValidEmail(formData.EmailAddress) && (
                      <small className="text-danger error_message ms-2">
                        {errors.EmailAddress}
                      </small>
                    )}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Where did you find us?</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Eg. Facebook/Instagram"
                      name="whereFindUs"
                      onChange={handleChange}
                      value={formData.whereFindUs}
                    />
                    {errors.whereFindUs && !formData.whereFindUs && (
                      <small className="text-danger error_message ms-2">
                        {errors.whereFindUs}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Type of Business</Form.Label>
                    <Form.Control
                      type="text"
                      name="typeofBusiness"
                      placeholder="Eg. Remittance/Ticketing"
                      onChange={handleChange}
                      value={formData.typeofBusiness}
                    />
                    {errors.typeofBusiness && !formData.typeofBusiness && (
                      <small className="text-danger error_message ms-2">
                        {errors.typeofBusiness}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>
                      Service you want to offer to consumers
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Eg. Money Transfer-Send only"
                      name="consumers"
                      onChange={handleChange}
                      value={formData.consumers}
                    />
                    {errors.consumers && !formData.consumers && (
                      <small className="text-danger error_message ms-2">
                        {errors.consumers}
                      </small>
                    )}
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <FormControl className="px-3">
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Do you currently provide money transfer services?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="transferservice"
                      onChange={handleChange}
                      value={formData.transferservice}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    {errors.transferservice && !formData.transferservice && (
                      <small className="text-danger error_message ms-2">
                        {errors.transferservice}
                      </small>
                    )}
                  </FormControl>
                </Row>
                <Row className="mb-4">
                  <FormControl className="px-3">
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Have you provided money transfer services in the past?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="transferserviceInPast"
                      onChange={handleChange}
                      value={formData.transferserviceInPast}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    {errors.transferserviceInPast && !formData.transferserviceInPast && (
                      <small className="text-danger error_message ms-2">
                        {errors.transferserviceInPast}
                      </small>
                    )}
                  </FormControl>
                </Row>
                <Row className="mb-3">
                  <FormControl className="px-3">
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Have you been declined as a Legal Remit agent in the past or had Legal Remit services cancelled?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="transferserviceCancelled"
                      onChange={handleChange}
                      value={formData.transferserviceCancelled}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                    {errors.transferserviceCancelled && !formData.transferserviceCancelled && (
                      <small className="text-danger error_message ms-2">
                        {errors.transferserviceCancelled}
                      </small>
                    )}
                  </FormControl>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Preferred language for your consumer base</Form.Label><br></br><br></br>
                    <Form.Select name="language" value={formData.language} onChange={handleChange}>
                      <option value=''>Select language</option>
                      <option value='Nepali'>Nepali</option>
                      <option value='English'>English</option>
                      <option value='Other'>Other</option>
                    </Form.Select>
                    {errors.language && !formData.language && (
                      <small className="text-danger error_message ms-2">
                        {errors.language}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Anticipated monthly volumes for money transfer</Form.Label>
                    <Form.Select value={formData.moneyTransacfer} name="moneyTransacfer" onChange={handleChange}>
                      <option value=''>0-00 items</option>
                      <option value='1-50'>1-50 items</option>
                      <option value='51-250'>51-250 items</option>
                      <option value='251-1000'>251-1000 items</option>
                    </Form.Select>
                    {errors.moneyTransacfer && !formData.moneyTransacfer && (
                      <small className="text-danger error_message ms-2">
                        {errors.moneyTransacfer}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Total locations</Form.Label><br></br><br></br>
                    <Form.Control type="number" placeholder="Total locations" name="locations" onChange={handleChange} value={formData.locations} />
                    {errors.locations && !formData.locations && (
                      <small className="text-danger error_message ms-2">
                        {errors.locations}
                      </small>
                    )}
                  </Form.Group>
                </Row>

                <Button className="btn btn-default purpleBackground text-white w-auto px-3 d-flex ms-auto mt-5" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
