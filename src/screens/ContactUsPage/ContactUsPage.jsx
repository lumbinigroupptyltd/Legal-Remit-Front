import React, { useState, useEffect } from "react";
import "./ContactUsPage.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import Loader from "../Loader/Loader";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ContactUsPage = () => {
  const [contactData, setContactData] = useState([]);
  const [maxHeight, setMaxHeight] = useState(0);
  const [message, setMessage] = useState(false);

  const options2 = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const [formData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [loadervalue, setloadervalue] = useState(false);
  const [errors, setErrors] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (["fullName", "subject"].includes(name)) {
      // Remove non-alphabetic characters
      const alphabeticValue = value.replace(/[^A-Za-z\s]/g, "");

      setFormData((prevData) => ({
        ...prevData,
        [name]: alphabeticValue,
      }));
      return;
    } else if (["phoneNumber"].includes(name)) {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!formData.fullName || !formData.message || !formData.emailAddress) {
        setErrors(true);
      } else if (!isValidEmail(formData.emailAddress)) {
        setErrors(true);
      } else if (
        formData.phoneNumber == "" ||
        formData.phoneNumber.length <= 6
      ) {
        setMessage(true);
      } else {
        setloadervalue(true);
        const payload = {
          name: formData.fullName,
          email: formData.emailAddress,
          phone: formData.phoneNumber,
          subject: formData.subject,
          message: formData.message,
        };
        await axios
          .post(CommonConstants.BASE_URL + "/savecontactus", payload)
          .then((response) => {
            if (response.data.status === true) {
              setFormData({
                fullName: "",
                emailAddress: "",
                phoneNumber: "",
                subject: "",
                message: "",
              });
              window.scrollTo(0, 0);
              setErrors(false);
            }
          });
        setloadervalue(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const cardElements = document.querySelectorAll(".itemFooter.purpleBox.mm");
    let newMaxHeight = 260;

    cardElements.forEach((card) => {
      const cardHeight = card.clientHeight;
      newMaxHeight = Math.max(newMaxHeight, cardHeight);
    });

    // Set the maximum height in the state
    setMaxHeight(newMaxHeight);

    // Define the API endpoint and request body
    const apiUrl = CommonConstants.BASE_URL + "/getallcontactus_details";
    const requestBody = {
      pageindex: 1,
      pagesize: 50,
      searchdata: "",
      sortparam: "created_at",
      sortorder: "DESC",
    };

    // Make the API request using Axios
    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        // Update the state with the fetched data
        setContactData(response.data.data);
      
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <section className="abtPage">
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage py-3">
            <h2 className="bolder purpleText text-center">Contact Us</h2>

            <Row>
              <div className="">
                <Slider className="owl-theme " {...options2}>
                  {contactData?.map((contact, index) => (
                    <div className="">
                      <div
                        className="itemFooter purpleBox mm py-4 mx-1"
                        style={{ height: `${maxHeight}px` }}
                      >
                        <ListGroup className="purpleText border-0 d-flex col-lg-12">
                          <ListGroup.Item className="text-black mb-0 pb-0 ps-0">
                            <h4 className="bolder upparcase text-center">
                              {contact?.location}
                            </h4>
                          </ListGroup.Item>
                          <div className="d-block m-auto">
                            <ListGroup.Item className="purpleText mb-0 pb-0 ps-0 d-flex">
                              <div className="responsiveFontLarge contactD  purpleText pb-2 d-flex">
                                <i
                                  className="fa fa-map-marker purpleText mt-1 mx-3"
                                  aria-hidden="true"
                                ></i>
                                {contact?.address}
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="purpleText mb-0 pb-0 ps-0 d-flex">
                              <div className="responsiveFontLarge contactD  purpleText pb-2 d-flex">
                                <i
                                  className="fa fa-envelope purpleText mt-1 mx-3"
                                  aria-hidden="true"
                                ></i>
                                {contact?.email}
                              </div>
                            </ListGroup.Item>
                            <ListGroup.Item className="purpleText mb-0 pb-0 ps-0 d-flex">
                              <div className="responsiveFontLarge contactD  purpleText pb-2 d-flex">
                                <i
                                  className="fa fa-phone purpleText mt-1 mx-3"
                                  aria-hidden="true"
                                ></i>
                                {contact?.phoneNumber1}
                                {contact?.phoneNumber2
                                  ? ` / ${contact.phoneNumber2}`
                                  : null}
                                <br></br>
                                {contact?.tollfreeNumber
                                  ? `Tollfree: ${contact.tollfreeNumber}`
                                  : null}
                                <br></br>
                                {contact?.landlineNumber
                                  ? `Landline: ${contact.landlineNumber}`
                                  : null}
                              </div>
                            </ListGroup.Item>
                          </div>
                        </ListGroup>
                      </div>
                    </div>
                    // <div className="itemFooter purpleBox mm py-4 ">
                    //   <ListGroup className="purpleText border-0 d-flex col-lg-12">
                    //     <ListGroup.Item className="text-black mb-0 pb-0 ps-0">
                    //       <h4 className="bolder upparcase text-center">
                    //         Canberra
                    //       </h4>
                    //     </ListGroup.Item>
                    //     <div className="d-block m-auto">
                    //       <ListGroup.Item className="purpleText mb-0 pb-0 ps-0 d-flex">
                    //         <div className="responsiveFontLarge contactD  purpleText pb-2 d-flex">
                    //           <i
                    //             className="fa fa-map-marker purpleText mt-1 mx-3"
                    //             aria-hidden="true"
                    //           ></i>
                    //           87 Anthony Rolfe Ave,ACT, 2912
                    //         </div>
                    //       </ListGroup.Item>
                    //       <ListGroup.Item className="purpleText mb-0 pb-0 ps-0 d-flex ">
                    //         <div className="responsiveFontLarge contactD  purpleText pb-2 d-flex">
                    //           <i
                    //             className="fa fa-envelope purpleText mt-1 mx-3"
                    //             aria-hidden="true"
                    //           ></i>
                    //           info@legalremit.com
                    //         </div>
                    //       </ListGroup.Item>
                    //       <ListGroup.Item className="purpleText mb-0 pb-0 ps-0 d-flex ">
                    //         <div className="contactD responsiveFontLarge contactD  purpleText pb-2 d-flex">
                    //           <i
                    //             className="fa fa-phone purpleText mt-1 mx-3"
                    //             aria-hidden="true"
                    //           ></i>
                    //           0435022761 / 0419850130<br></br>Tollfree: 1800005342{" "}
                    //           <br></br> Landline: 0261112905
                    //         </div>
                    //       </ListGroup.Item>
                    //     </div>
                    //   </ListGroup>
                    // </div>
                  ))}
                </Slider>

                {/* <Slider {...options2}>
      {contactData?.map((contact, index) => (
        <div key={index} className="itemFooter purpleBox mm py-4">
          <h4 className="bolder upparcase text-center">{contact.location}</h4>
          <ul className="purpleText border-0 d-flex col-lg-12">
            <li className="text-black mb-0 pb-0 ps-0">
              <i className="fa fa-map-marker purpleText mt-1 mx-3" aria-hidden="true"></i>
              {contact.address}
            </li>
            <li className="purpleText mb-0 pb-0 ps-0 d-flex">
              <i className="fa fa-envelope purpleText mt-1 mx-3" aria-hidden="true"></i>
              {contact.email}
            </li>
            <li className="purpleText mb-0 pb-0 ps-0 d-flex">
              <i className="fa fa-phone purpleText mt-1 mx-3" aria-hidden="true"></i>
              {contact.phone}<br />Toll-free: {contact.tollFree}<br />Landline: {contact.landline}
            </li>
          </ul>
        </div>
      ))}
    </Slider> */}
              </div>
            </Row>

            <Row>
              <Col className="col-lg-12 mt-5">
                <h2 className="bolder purpleText text-center responsiveFontLargeHeading">
                  Write a message
                </h2>

                <Form className="mt-2" onSubmit={handleSubmit}>
                  <Row className="py-3 respoChildFooter">
                    <Col>
                      <Form.Control
                        placeholder="Full Name"
                        className="purpleBorder pbSt"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                      {errors && !formData.fullName && (
                        <small className="text-danger error_message ms-2 error">
                          Please Enter Full Name
                        </small>
                      )}
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Email Address"
                        className="purpleBorder "
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                      />
                      {errors &&
                        (!formData.emailAddress ||
                          !isValidEmail(formData.emailAddress)) && (
                          <small className="text-danger error_message ms-2 error">
                            Please Enter Valid Email Address
                          </small>
                        )}
                    </Col>
                  </Row>

                  <Row className="py-3 respoChildFooter">
                    <Col>
                      <Form.Control
                        placeholder="Phone Number"
                        className="purpleBorder pbSt"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                      {/* {message &&
                        <small className="text-danger error_message ms-2 error">
                          Please Enter Valid Phone Number
                        </small>} */}
                      {message && (
                        <small className="text-danger error_message ms-2 error">
                          Please Enter Valid Mobile Number
                        </small>
                      )}
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="Subject"
                        className="purpleBorder"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>

                  <Row className="py-3 respoChildFooter">
                    <Form.Group
                      className=""
                      controlId="exampleForm.ControlTextarea1"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Write a message"
                        className="purpleBorder customTextArea"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={10}
                      />
                      {errors && !formData.message && (
                        <small className="text-danger error_message ms-2 error">
                          Please Enter Message
                        </small>
                      )}
                    </Form.Group>
                  </Row>
                  <Col className="col-lg-4 d-flex m-auto">
                    <Button
                      type="submit"
                      className="btn btn-default purpleBackground rounded-5 text-white d-block m-auto"
                    >
                      Send Message
                    </Button>
                  </Col>
                  <Row></Row>
                </Form>
              </Col>
            </Row>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ContactUsPage;
