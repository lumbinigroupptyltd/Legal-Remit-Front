import React, { useState, useEffect } from "react";
import "./MoneyStep5.scss";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import info from "../../../../assets/images/info11.svg";
import gift from "../../../../assets/images/ph_gift-bold.svg";
import timer from "../../../../assets/images/timer.svg";
import people from "../../../../assets/images/people.svg";
import groupPeople from "../../../../assets/images/groupPeople.svg";
import case1 from "../../../../assets/images/suitcase.svg";
import backA from "../../../../assets/images/BackArrow.svg";
import bankIcon from "../../../../assets/images/mdi_bank.svg";
import walletIcon from "../../../../assets/images/ion_wallet.svg";
import cashW from "../../../../assets/images/bi_cash-stack.svg";
import drpa from "../../../../assets/images/drparrw.svg";
import visa from "../../../../assets/images/cib_cc-visa.svg";
import copy from "../../../../assets/images/copyclipboard.svg";


import firstPay from "../../../../assets/images/payto-icon 1.svg";
import secondPay from "../../../../assets/images/deposit.svg";
import thirdPay from "../../../../assets/images/payId.svg";
import fourthPay from "../../../../assets/images/bank transfer 1.svg";
import fifthPay from "../../../../assets/images/poli.svg";
import sixthPay from "../../../../assets/images/debitCredi.svg";

import { country_list } from "../../../../Helpers/CountryPicker/customLabel";
import { country_list1 } from "../../../../Helpers/CountryPicker/customLabel";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import InputGroup from "react-bootstrap/InputGroup";
import { UploadFile } from "@mui/icons-material";
import UploadFiles from "../../../../Helpers/UploadFiles/UploadFiles";

export default function MoneyStep5() {
  const [show3, setShowRec] = useState(false);

  const handleCloseRec = () => setShowRec(false);
  const handleShowRec = () => setShowRec(true);

  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);
  const [showDiv3, setShowDiv3] = useState(false);



  const handleButtonClick1 = () => {
    setShowDiv1(!showDiv1);
  }

  const handleButtonClick2 = () => {
    setShowDiv2(!showDiv2);
  }

  const handleButtonClick3 = () => {
    setShowDiv3(!showDiv3);
  }


  const [show5, setShowRec3] = useState(false);
  const [show6, setShowRec6] = useState(false);
  const [show7, setShowRec7] = useState(false);

  const handleCloseRec7 = () => setShowRec7(false);
  const handleShowRec7 = () => setShowRec7(true);

  const handleCloseRec6 = () => setShowRec6(false);
  const handleShowRec6 = () => setShowRec6(true);

  const handleCloseRec3 = () => setShowRec3(false);
  const handleShowRec3 = () => setShowRec3(true);

  const [dropdownState, setDropdownState] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [selected, setSelected] = useState("");

  const [isVisible, setIsVisible] = useState(true);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  const [isVisible5, setIsVisible5] = useState(false);

  const [isAllVisible, setIsAllVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(true);
    setIsVisible1(false);
    setIsVisible2(false);
    setIsVisible3(false);
    setIsVisible4(false);
    setIsVisible5(false);
  };

  const toggleVisibility1 = () => {
    setIsVisible(false);
    setIsVisible1(true);
    setIsVisible2(false);
    setIsVisible3(false);
    setIsVisible4(false);
    setIsVisible5(false);
  };

  const toggleVisibility2 = () => {
    setIsVisible(false);
    setIsVisible1(false);
    setIsVisible2(true);
    setIsVisible3(false);
    setIsVisible4(false);
    setIsVisible5(false);
  };

  const toggleVisibility3 = () => {
    setIsVisible(false);
    setIsVisible1(false);
    setIsVisible2(false);
    setIsVisible3(true);
    setIsVisible4(false);
    setIsVisible5(false);
  };

  const toggleVisibility4 = () => {
    setIsVisible(false);
    setIsVisible1(false);
    setIsVisible2(false);
    setIsVisible3(false);
    setIsVisible4(true);
    setIsVisible5(false);
  };

  const toggleVisibility5 = () => {
    setIsVisible(false);
    setIsVisible1(false);
    setIsVisible2(false);
    setIsVisible3(false);
    setIsVisible4(false);
    setIsVisible5(true);
  };

  const changeHandler = (e) => {
    setSelected(e.target.value);
  };

  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };
  const handleSetDropdownValue = (value) => {
    setDropdownValue(value);
    setDropdownState(!dropdownState);
  };

  const [firstSelect, setfirstSelect] = useState(false);
  const [TwoSelect, setTwoSelect] = useState(false);
  const [ThreeSelect, setThreeSelect] = useState(false);

  const One1 = () => {
    setfirstSelect(true);
    setTwoSelect(false);
    setThreeSelect(false);
  };
  const Two2 = () => {
    setfirstSelect(false);
    setTwoSelect(true);
    setThreeSelect(false);
  };
  const Third3 = () => {
    setfirstSelect(false);
    setTwoSelect(false);
    setThreeSelect(true);
  };

  useEffect(() => {}, [firstSelect, TwoSelect, ThreeSelect]);

  return (
    <>
      <section>
        <Container>
          <Row className="respoChildFooter">
            <Col className="col-lg-12">
              <h1 className="purpleText bolder text-center mt-3 pt-3 pb-3">
                Send Money
              </h1>
            </Col>
            <Col className="col-lg-12 flex-column m-auto d-flex justify-content-center text-center ">
              <div className="smd pb-3">
                {/* <small className="responsiveFontLarge  text-black text-center ">
                  Glance at the summary and submit your data for transection
                </small> */}
              </div>
            </Col>
          </Row>

          <Row className="">
            <Modal.Body className="mainss">
              <Row>
                <Col className="col-lg-12 d-flex m-auto justify-content-center">
                  <div className={`dropdown`}>
                    <button
                      onClick={handleDropdownClick}
                      className="dropdown-btn d-flex justify-content-evenly align-items-start"
                    >
                      {dropdownValue === "" ? (
                        <>
                          <img
                            src={firstPay}
                            width="80"
                            height="80"
                            className="img-fluid mt-1"
                          />
                          <div className="d-flex flex-column ms-4">
                            <div className=" mainD responsiveFontLarge">Payment Method</div>
                            <div className="text-black text-start bolder  ">
                              PayTO
                            </div>
                          </div>
                          <img src={drpa} className="img-fluid mt-4 ms-4" />
                        </>
                      ) : (
                        dropdownValue
                      )}
                    </button>
                    <div
                      className={`dropdown-items ${
                        dropdownState ? "isVisible" : "isHidden"
                      }`}
                    >
                      <div className="dropdown-item" onClick={toggleVisibility}>
                        <div
                          className="dropdown__link d-flex align-items-center "
                          onClick={() =>
                            handleSetDropdownValue(
                              <>
                                <img
                                  src={firstPay}
                                  width="80"
                                  height="80"
                                  className="img-fluid mt-1"
                                />
                                <div className="d-flex flex-column ms-4">
                                  <div className="mainD responsiveFontLarge">Payment Method</div>
                                  <div className="text-black text-start bolder  ">
                                    PayTO
                                  </div>
                                </div>
                                <img
                                  src={drpa}
                                  className="img-fluid mt-4 ms-4"
                                />
                              </>
                            )
                          }
                        >
                          <img
                            src={firstPay}
                            width="50"
                            height="50"
                            className="img-fluid"
                          />
                          <div className="text-black  bolder text-center ms-4">
                            PayTO
                          </div>
                        </div>
                      </div>

                      <div
                        className="dropdown-item"
                        onClick={toggleVisibility1}
                      >
                        <div
                          className="dropdown__link d-flex align-items-center "
                          onClick={() =>
                            handleSetDropdownValue(
                              <>
                                <img
                                  src={secondPay}
                                  width="50"
                                  height="50"
                                  className="img-fluid"
                                />
                                <div className="d-flex flex-column ms-4">
                                  <div className="mainD responsiveFontLarge">Payment Method</div>
                                  <div className="text-black text-start bolder  ">
                                    Debit Card
                                  </div>
                                </div>
                                <img
                                  src={drpa}
                                  className="img-fluid mt-4 ms-4"
                                />
                              </>
                            )
                          }
                        >
                          <img
                            src={secondPay}
                            width="50"
                            height="50"
                            className="img-fluid"
                          />{" "}
                          <div className="text-black bolder text-center ms-4">
                            Debit Card
                          </div>
                        </div>
                      </div>

                      <div
                        className="dropdown-item"
                        onClick={toggleVisibility2}
                      >
                        <div
                          className="dropdown__link d-flex align-items-center "
                          onClick={() =>
                            handleSetDropdownValue(
                              <>
                                <img
                                  src={thirdPay}
                                  width="80"
                                  height="80"
                                  className="img-fluid mt-1"
                                />{" "}
                                <div className="d-flex flex-column ms-4">
                                  <div className="mainD responsiveFontLarge">Payment Method</div>
                                  <div className="text-black text-start bolder  ">
                                    PayID
                                  </div>
                                </div>
                                <img
                                  src={drpa}
                                  className="img-fluid mt-4 ms-4"
                                />
                              </>
                            )
                          }
                        >
                          <img
                            src={thirdPay}
                            width="50"
                            height="50"
                            className="img-fluid"
                          />{" "}
                          <div className="text-black  bolder text-center ms-4">
                            PayID
                          </div>
                        </div>
                      </div>

                      <div
                        className="dropdown-item"
                        onClick={toggleVisibility3}
                      >
                        <div
                          className="dropdown__link d-flex align-items-center "
                          onClick={() =>
                            handleSetDropdownValue(
                              <>
                                <img
                                  src={fourthPay}
                                  width="60"
                                  height="60"
                                  className="img-fluid"
                                />{" "}
                                <div className="d-flex flex-column ms-4">
                                  <div className="mainD responsiveFontLarge">Payment Method</div>
                                  <div className="text-black text-start bolder ">
                                    Bank Transfer
                                  </div>
                                </div>
                                <img
                                  src={drpa}
                                  className="img-fluid mt-4 ms-4"
                                />
                              </>
                            )
                          }
                        >
                          <img
                            src={fourthPay}
                            width="50"
                            height="50"
                            className="img-fluid"
                          />{" "}
                          <div className="text-black  bolder text-center ms-4">
                            Bank Transfer
                          </div>
                        </div>
                      </div>

                      <div
                        className="dropdown-item"
                        onClick={toggleVisibility4}
                      >
                        <div
                          className="dropdown__link d-flex align-items-center "
                          onClick={() =>
                            handleSetDropdownValue(
                              <>
                                <img
                                  src={fifthPay}
                                  width="80"
                                  height="80"
                                  className="img-fluid mt-2"
                                />{" "}
                                <div className="d-flex flex-column ms-4">
                                  <div className="mainD responsiveFontLarge">Payment Method</div>
                                  <div className="text-black text-start bolder ">
                                    Credit Card
                                  </div>
                                </div>
                                <img
                                  src={drpa}
                                  className="img-fluid mt-4 ms-4"
                                />
                              </>
                            )
                          }
                        >
                          <img
                            src={fifthPay}
                            width="50"
                            height="50"
                            className="img-fluid"
                          />{" "}
                          <div className="text-black  bolder text-center ms-4">
                            Credit Card
                          </div>
                        </div>
                      </div>

                      <div
                        className="dropdown-item"
                        onClick={toggleVisibility5}
                      >
                        <div
                          className="dropdown__link d-flex align-items-center "
                          onClick={() =>
                            handleSetDropdownValue(
                              <>
                                <img
                                  src={sixthPay}
                                  width="50"
                                  height="50"
                                  className="img-fluid"
                                />{" "}
                                <div className="d-flex flex-column ms-4">
                                  <div className="mainD responsiveFontLarge">Payment Method</div>
                                  <div className="text-black text-start bolder ">
                                    Credit Card
                                  </div>
                                </div>
                                <img
                                  src={drpa}
                                  className="img-fluid mt-4 ms-4"
                                />
                              </>
                            )
                          }
                        >
                          <img
                            src={sixthPay}
                            width="50"
                            height="50"
                            className="img-fluid"
                          />{" "}
                          <div className="text-black  bolder text-center ms-4">
                            Credit Card
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              {isVisible && ( 
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center mt-3">
                      <div className="d-flex flex-column ">
                        <img
                          height="100"
                          width="100"
                          src={firstPay}
                          className="img-fluid my-2 d-block m-auto"
                        />
                        <small className="responsiveFontLarge  text-black text-center w-75 d-block m-auto my-2">
                          Set up PayTO agreement to Pay directly from your bank
                          account. Use PayID or BSB and account number.
                        </small>
                      </div>
                      {
                        !showDiv1 &&  
                        
                        <Form>
                        <Form className="mt-3 pe-1 ps-1" id="Signup_Step1">
                          <Row className="respoChildFooter">
                            <Form.Group
                              as={Col}
                              className="left-inner-addons input-container required"
                              
                            >
                              <img src={thirdPay} className="img-fluid aaa" />
                              <Form.Control
                                type="text"
                                required
                                placeholder="PayID"
                                name="Referal"
                                className="py-4 formControlStep2 reflink  link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                PayID
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <small className="responsiveFontLarge  text-center my-4">OR</small>
                          <Row className="mt-3">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                              
                            >
                              <Form.Control
                                type="text"
                                required
                                placeholder="BSB"
                                name="Referal"
                                className="py-4 formControlStep2 reflink link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                BSB
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="mt-3">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                              
                            >
                              <Form.Control
                                type="text"
                                required
                                placeholder="Account No."
                                name="Referal"
                                className="py-4 formControlStep2 reflink link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Account No.
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row className="mt-3 d-flex">
                            <div className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                id="vehicle1"
                                className="w-auto "
                                name="vehicle1"
                                value="Bike"
                              />
                              <label for="vehicle1" className="ms-2 mb-0">
                                {" "}
                                Save this as preferred payment method
                              </label>
                            </div>
                          </Row>
                        </Form>
                      </Form>
                      }
                      {
                        showDiv1 &&   
                     
                        <section className="container ">
                              <Form>
                            <Form.Group className="mb-3 text-start " controlId="formBasicEmail">
                              <Form.Label className="ms-2 text-black">Payee</Form.Label>
                              <Form.Control disabled type="text" placeholder="InvestApp" />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start text-black" controlId="formBasicEmail">
                              <Form.Label className="ms-2 text-black">Description</Form.Label>
                              <Form.Control disabled type="text" placeholder="invest and trade" />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start text-black" controlId="formBasicEmail">
                              <Form.Label className="ms-2 text-black">Bank Name</Form.Label>
                              <Form.Control disabled type="text" placeholder="XYZ" />
                            </Form.Group>
                  
                            <Form.Group className="mb-3 text-start text-black" controlId="formBasicEmail">
                              <Form.Label className="ms-2 text-black">Account Name</Form.Label>
                              <Form.Control disabled type="text" placeholder="InvestApp" />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start text-black" controlId="formBasicEmail">
                              <Form.Label className="ms-2 text-black">BSB/Acc No.</Form.Label>
                              <Form.Control disabled type="text" placeholder="123457894567" />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start text-black" controlId="formBasicEmail">
                              <Form.Label className="ms-2 text-black">Amount</Form.Label>
                              <Form.Control disabled type="text" placeholder="99999999" />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start text-black" controlId="formBasicEmail">
                              <Form.Label className="ms-2 text-black">Frequency</Form.Label>
                              <Form.Control disabled type="text" placeholder="Ad-hoc" />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start text-black" controlId="formBasicEmail">
                              <Form.Label className="ms-2 text-black">Start Date</Form.Label>
                              <Form.Control disabled type="text" placeholder="10-10-2010" />
                            </Form.Group>
                            <Form.Group className="mb-3 text-start text-black" controlId="formBasicEmail">
                              <Form.Label className="ms-2 text-black">Auto Renewal</Form.Label>
                              <Form.Control disabled type="text" placeholder="Yes" />
                            </Form.Group>
                          </Form>
                        </section>
                      }
                  
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12">
                      <Button
                        className="my-4 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleButtonClick1}
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              )}

              {isVisible1 && (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center mt-3">
                        Enter Card details to pay from your card
                      </label>
                      <Form>
                        <Form className="mt-3 pe-1 ps-1" id="Signup_Step1">
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="right-inner-addons input input-container required"
                              
                            >
                              <img src={visa} className="img-fluid bbb me-3" />
                              <Form.Control
                                type="text"
                                required
                                placeholder="Card Number"
                                name="Referal"
                                className=" py-4 formControlStep2 reflink  link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                card number
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                              
                            >
                              <Form.Control
                                type="text"
                                required
                                placeholder="Expiry Date"
                                name="Referal"
                                className="py-4 formControlStep2 reflink link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Expiry Date
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                              
                            >
                              <Form.Control
                                type="text"
                                required
                                placeholder="CVV"
                                name="Referal"
                                className="py-4 formControlStep2 reflink link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                CVV
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                              
                            >
                              <Form.Control
                                type="text"
                                required
                                placeholder="Card holder name"
                                name="Referal"
                                className="py-4 formControlStep2 reflink link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Card holder name
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row className="mt-3 ps-3 pe-3">
                            <div className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                id="vehicle1"
                                className="w-auto "
                                name="vehicle1"
                                value="Bike"
                              />
                              <label for="vehicle1" className="ms-2 mb-0">
                                {" "}
                                Save this as preferred payment method
                              </label>
                            </div>
                          </Row>

                          <Row className="mt-3 ps-3 pe-3">
                            <div className="d-flex justify-content-between">
                              <small className="responsiveFontLarge  textGray">
                                Service Charge :
                              </small>
                              <small className="responsiveFontLarge  bolder">1 AUD</small>
                            </div>
                          </Row>

                        </Form>
                      </Form>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="col-lg-12">
                      <Button
                        className="my-4 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleShowRec6}
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              )}

              {isVisible2 && (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-4 text-center">
                    {
                        !showDiv2 &&         
                        <>           
                      <label className="text-black text-center">
                      We won’t take money from your bank automatically
                      </label>

                        <Form className="mt-3 pe-1 ps-1" id="Signup_Step1">
                          <Container>
                        <Row>
                        <ol className="olMain">
                        <li className="liMain my-2 text-black">   We’ll give you our bank details.</li>
                        <li className="liMain my-2 text-black">   You’ll need to use your bank tranfer the money to Legalremit. </li>
                        <li className="liMain my-2 text-black">   Once we receive the money, we’ll start the transfer to recipient.</li>
                        </ol>
                     
                            </Row>
                          </Container>
                        </Form>
                        </>
               
                      }

                      {
                        showDiv2 && 
                        <section>
                          <Row className="text-center">
                            <small className="responsiveFontLarge  text-black my-3 bolder">Pay using PayID</small>
                          </Row>
                                    <Row>
                      <Container>
                      <small className="responsiveFontLarge  text-black text-center bolder"> Go to your online banking and transfer <b className="purpleText">1000 AUD </b>  to our PayID using email below.</small>
                      <div className="p-3 rounded-5 inin mt-3">
                        <i className="fa  fa-info-circle ps-3 pe-3 "></i>
                        Your transfer may take up to 24 hours to reach us due to checks in place by your bank.
                      </div>
                      </Container>

                      <Container>
                        <Row className="d-flex align-items-center me-3 ms-3 mt-4">
                          <Col className="col-lg-11">
                          <div className="p-2 rounded-5 hh mt-3 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <img src={thirdPay} className="img-fluid"/>
                           
                             <div className="ms-2"> PayID email (Dynamically loaded)</div>
                            </div>
                            <i className="fa fa-info-circle me-2"></i>
                            </div>
                          </Col>
                          <Col className="col-lg-1">
                          <div className="ms-2">
                              <img src={copy} className="img-fluid"/>
                            </div>
                          </Col>
                        </Row>

                        <Row className="respoChildFooter d-flex align-items-center me-3 ms-3">
                          <Col className="col-lg-11">
                          <div className="p-2 rounded-5  mt-3 align-items-center">
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                              
                            >
                              <Form.Control
                                type="text"
                                required
                                placeholder="Account Name"
                                name="Referal"
                                className=" py-4 formControlStep2 reflink  link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Account Name
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                            </div>
                          </Col>
                          <Col className="col-lg-1">
                          <div className="ms-2">
                              <img src={copy} className="img-fluid"/>
                            </div>
                          </Col>
                        </Row>
                        
                        <Row>
                        <Col className="col-lg-6 m-auto">
                                <UploadFiles />
                                </Col>
                        </Row>
                        
                        <Row className="mt-3 ps-5 pe-5 ">
                          <div className="d-flex justify-content-between pe-1 ps-1">
                          <small className="responsiveFontLarge  grayText">Service Charge :</small>
                          <b className="bolder">1 AUD</b>
                          </div>
                        </Row>

                        <Row className="respoChildFooter">
                          <div className="respoChildFooter d-flex justify-content-between ps-5 pe-5">
                          <Button
                        className="my-4 col-lg-3 d-block m-auto nextBtn11"
                        variant="primary"
                        onClick={handleButtonClick2}
                      >
                      I’ll Transfer later
                      </Button>

                          <Button
                        className="my-4 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleButtonClick2}
                      >
                        I’ve Transfered
                      </Button>
                          </div>
                        </Row>
                      </Container>
                    </Row>
                        </section>
                      }
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12 my-4">
                      <Button
                        className="my-4 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleButtonClick2}
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              )}

              {isVisible3 && (
               <>
               <Row>
                 <Col className="col-lg-12 mt-4 text-center">
                 {
                     !showDiv3 &&         
                     <>           
                   <label className="text-black text-center">
                   We won’t take money from your bank automatically
                   </label>

                     <Form className="mt-3 pe-1 ps-1" id="Signup_Step1">
                       <Container>
                     <Row>
                     <ol className="olMain">
                     <li className="liMain my-2 text-black">   We’ll give you our bank details.</li>
                     <li className="liMain my-2 text-black">   You’ll need to use your bank tranfer the money to Legalremit. </li>
                     <li className="liMain my-2 text-black">   Once we receive the money, we’ll start the transfer to recipient.</li>
                     </ol>
                  
                         </Row>
                       </Container>
                     </Form>
                     </>
            
                   }

                   {
                     showDiv3 && 
                     <section>
                  
                                 <Row>
                   <Container>
                   <small className="responsiveFontLarge  text-black text-center bolder"> Login to your bank account and transfer    <b className="purpleText">1000 AUD </b>  to Legalremit.</small>
                   <div className="p-3 rounded-5 inin mt-3">
                     <i className="fa  fa-info-circle ps-3 pe-3 "></i>
                     Your transfer may take up to 24 hours to reach us due to checks in place by your bank.
                   </div>
                   </Container>

                   <Container>
              

                     <Row className="d-flex align-items-center me-1 ms-1 justify-content-center">
                       <Col className="col-lg-11">
                       <div className="p-2 rounded-5  mt-3 align-items-center justify-content-center">
                       <Row className="respoChildFooter mt-2 align-items-center">
                        <Col className="col-lg-11">
                         <Form.Group
                           as={Col}
                           className="left-inner-addon input-container required"
                           
                         >
                           <Form.Control
                             type="text"
                             required
                             placeholder="Account Holder Name"
                             name="Referal"
                             className=" py-4 formControlStep2 reflink  link"
                           />
                           <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                           Account Name
                           </small>

                           {/* {errors.name && <p>{errors.name}</p>} */}
                         </Form.Group>
                        </Col>
                        <Col className="col-lg-1">
                        <div className="ms-2">
                           <img src={copy} className="img-fluid mb-3"/>
                         </div>
                        </Col>
                       </Row>

                       <Row className="respoChildFooter mt-2 align-items-center">
                        <Col className="col-lg-11">
                         <Form.Group
                           as={Col}
                           className="left-inner-addon input-container required"
                           
                         >
                           <Form.Control
                             type="text"
                             required
                             placeholder="BSB code"
                             name="Referal"
                             className=" py-4 formControlStep2 reflink  link"
                           />
                           <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                           BSB code
                           </small>

                           {/* {errors.name && <p>{errors.name}</p>} */}
                         </Form.Group>
                        </Col>
                        <Col className="col-lg-1">
                        <div className="ms-2">
                           <img src={copy} className="img-fluid mb-3"/>
                         </div>
                        </Col>
                       </Row>

                       <Row className="respoChildFooter mt-2 align-items-center">
                        <Col className="col-lg-11">
                         <Form.Group
                           as={Col}
                           className="left-inner-addon input-container required"
                           
                         >
                           <Form.Control
                             type="text"
                             required
                             placeholder="Account no."
                             name="Referal"
                             className=" py-4 formControlStep2 reflink  link"
                           />
                           <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                           Account no.
                           </small>

                           {/* {errors.name && <p>{errors.name}</p>} */}
                         </Form.Group>
                        </Col>
                        <Col className="col-lg-1">
                        <div className="ms-2">
                           <img src={copy} className="img-fluid mb-3"/>
                         </div>
                        </Col>
                       </Row>

                       <Row className="text-center my-4">
                        <small>Alternatively you can transfer to our mobile number using <small className="responsiveFontLarge  purpleText">PayID</small></small>
                       </Row>

                       <Row className="respoChildFooter">
                       <Col className="col-lg-11">
                            <Form.Group
                              as={Col}
                              className="left-inner-addons input-container required"
                              
                            >
                              <img src={thirdPay} className="img-fluid aaa" />
                              <Form.Control
                                type="text"
                                required
                                placeholder="PayID"
                                name="Referal"
                                className=" py-4 formControlStep2 reflink  link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                PayID
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                       </Col>
                       <Col className="col-lg-1">
                       <div className="ms-2">
                           <img src={copy} className="img-fluid mb-3"/>
                         </div>
                       </Col>
                          </Row>

           

                       <Row className="respoChildFooter mt-2 align-items-center">
                        <Col className="col-lg-11">
                         <Form.Group
                           as={Col}
                           className="left-inner-addon input-container required"
                           
                         >
                           <Form.Control
                             type="text"
                             required
                             placeholder="Account Name"
                             name="Referal"
                             className=" py-4 formControlStep2 reflink  link"
                           />
                           <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                           Account Name.
                           </small>

                           {/* {errors.name && <p>{errors.name}</p>} */}
                         </Form.Group>
                        </Col>
                        <Col className="col-lg-1">
                        <div className="ms-2">
                           <img src={copy} className="img-fluid mb-3"/>
                         </div>
                        </Col>
                       </Row>
                         </div>
                       </Col>
                    
                     </Row>
                     
                     <Row>
                     <Col className="col-lg-6 m-auto">
                                <UploadFiles />
                                </Col>
                     </Row>
                     
                     <Row className="mt-3 ps-5 pe-5 ">
                       <div className="d-flex justify-content-between pe-1 ps-1">
                       <small className="responsiveFontLarge  grayText">Service Charge :</small>
                       <b className="bolder">1 AUD</b>
                       </div>
                     </Row>

                     <Row className="respoChildFooter">
                       <div className="d-flex justify-content-between ps-5 pe-5">
                       <Button
                     className="my-4 col-lg-3 d-block m-auto nextBtn11"
                     variant="primary"
                     onClick={handleButtonClick2}
                   >
                   I’ll Transfer later
                   </Button>

                       <Button
                     className="my-4 col-lg-3 d-block m-auto nextBtn1"
                     variant="primary"
                     onClick={handleButtonClick2}
                   >
                     I’ve Transfered
                   </Button>
                       </div>
                     </Row>
                   </Container>
                 </Row>
                     </section>
                   }
                 </Col>
               </Row>
               <Row>
                 <Col className="col-lg-12 my-4">
                   <Button
                     className="my-4 col-lg-3 d-block m-auto nextBtn1"
                     variant="primary"
                     onClick={handleButtonClick3}
                   >
                     NEXT
                   </Button>
                 </Col>
               </Row>
             </>
              )}

              {isVisible4 && (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                    <div className="d-flex flex-column ">
                        <img
                          height="100"
                          width="100"
                          src={fifthPay}
                          className="img-fluid my-2 d-block m-auto"
                        />
                        <small className="responsiveFontLarge  bolder text-black mt-2">Pay with POLI</small>
                        <small className="responsiveFontLarge  text-black text-center  d-block m-auto my-4">
                        POLI lets you securely make a payment from your internet bank to Wise. You must send payments from an  account in  your name. Money coming from friends &realtives can’t be accepted. here’s a list of <b className="purpleText"> supported banks.</b>
                        </small>
                      </div> 
                   
                    </Col>
                  </Row>

                  <Row>
                    <Container>
                    <div className="p-3 rounded-5 inin mt-3">
                      <i className="fa fa-info-circle ps-3 pe-3 "></i>
                      Your transfer may take up to 24 hours to reach us due to checks in place by your bank
                    </div>
                    </Container>
                  </Row>

                  <Row>
                    <Col className="col-lg-12 my-4">
                      <Button
                        className="my-4 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleShowRec6}
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              )}

              {isVisible5 && (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center mt-3">
                        Enter Card details to pay from your card
                      </label>
                      <Form>
                        <Form className="mt-3 pe-1 ps-1" id="Signup_Step1">
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="right-inner-addons input input-container required"
                              
                            >
                              <img src={visa} className="img-fluid bbb me-3" />
                              <Form.Control
                                type="text"
                                required
                                placeholder="Card Number"
                                name="Referal"
                                className=" py-4 formControlStep2 reflink  link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                card number
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                              
                            >
                              <Form.Control
                                type="text"
                                required
                                placeholder="Expiry Date"
                                name="Referal"
                                className="py-4 formControlStep2 reflink link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Expiry Date
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                              
                            >
                              <Form.Control
                                type="text"
                                required
                                placeholder="CVV"
                                name="Referal"
                                className="py-4 formControlStep2 reflink link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                CVV
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                              
                            >
                              <Form.Control
                                type="text"
                                required
                                placeholder="Card holder name"
                                name="Referal"
                                className="py-4 formControlStep2 reflink link"
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Card holder name
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row className="mt-3 ps-3 pe-3">
                            <div className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                id="vehicle1"
                                className="w-auto "
                                name="vehicle1"
                                value="Bike"
                              />
                              <label for="vehicle1" className="ms-2 mb-0">
                                {" "}
                                Save this as preferred payment method
                              </label>
                            </div>
                          </Row>

                          <Row className="mt-3 ps-3 pe-3">
                            <div className="d-flex justify-content-between">
                              <small className="responsiveFontLarge  textGray">
                                Service Charge :
                              </small>
                              <small className="responsiveFontLarge  bolder">1 AUD</small>
                            </div>
                          </Row>

                        </Form>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12 my-4">
                      <Button
                        className="my-4 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleShowRec6}
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              )}
            </Modal.Body>
          </Row>
        </Container>
      </section>
    </>
  );
}
