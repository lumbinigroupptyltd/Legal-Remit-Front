import React, { useState } from "react";
import { Container, Row, Tab, Nav, Col } from "react-bootstrap";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./HelpResources.scss";
import Footer from "../Home/Footer/Footer";
import NavBar from "../Home/Navbar/Navbar";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import flight from "../../assets/images/flight.svg";
import lumbi from "../../assets/images/Lumbini logo 1.svg";
import { Tooltip, makeStyles } from "@mui/material";
import SecurityPage from "../SecurityPage/SecurityPage";
import WhereIsMoney from "../WhereIsMoney/WhereIsMoney";
import BankTransfer from "../BankTransfer/BankTransfer";
import WalletTopup from "../WalletTopup/WalletTopup";
import CashPickup from "../CashPickup/CashPickup";
import UtilityBillPayment from "../UtilityBillPayment/UtilityBillPayment";
import PartnerAndAffiliate from "../PartnerAndAffiliate/PartnerAndAffiliate";
import YourAccount from "../YourAccount/YourAccount";
import { Link, useNavigate, useRouteMatch } from "react-router-dom";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

import ExchangeRateAndServiceCharge from "../ExchangeRateAndServiceCharge/ExchangeRateAndServiceCharge";

const useStyles = makeStyles((theme) => ({
  accordion: {
    border: "none",
    boxShadow: "none",
    "&::before": {
      display: "none",
    },
  },
  summary: {},
  summaryContent: {
    fontWeight: "bold",
    color: "grey",
  },
  details: {
    color: "rgba(0, 0, 0, 0.69)",
  },
}));

export default function HelpResources() {
  const classes = useStyles();

  const [activeKey, setActiveKey] = useState("link1");

  const handleSelect = (key) => {
    setActiveKey(key);
  };

  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage">
            <h2 className="bolder purpleText text-center">Help </h2>

            <Row>
              <Col className="col-lg-12 mt-2 py-5">
                <Tab.Container id="left-tabs-example" defaultActiveKey="link1">
                  <Row>
                    <Col sm={3}>
                      <Nav
                        variant="pills"
                        className="nav-pills-custom flex-column"
                        activeKey={activeKey}
                        onSelect={handleSelect}
                      >
                        <Nav.Item className="navPill">
                          <Nav.Link
                            eventKey="link1"
                            className="purpleText medium navPill  py-3 my-2 "
                          >
                            FAQ
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link2"
                            className="purpleText medium navPill py-3 my-2"
                          >
                            Security
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navPill">
                          <Nav.Link
                            eventKey="link3"
                            className="purpleText medium navPill  py-3 my-2 "
                          >
                            Where is my money
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link4"
                            className="purpleText medium navPill py-3 my-2"
                          >
                            Your Account
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navPill">
                          <Nav.Link
                            eventKey="link5"
                            className="purpleText medium navPill  py-3 my-2 "
                          >
                            Bank Transfer
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link6"
                            className="purpleText medium navPill py-3 my-2"
                          >
                            Wallet Topup
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navPill">
                          <Nav.Link
                            eventKey="link7"
                            className="purpleText medium navPill  py-3 my-2 "
                          >
                            Cash Pickup
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link8"
                            className="purpleText medium navPill py-3 my-2"
                          >
                            Utility Bill Payment
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item>
                          <Nav.Link
                            eventKey="link10"
                            className="purpleText medium navPill py-3 my-2"
                          >
                            Affiliate and partnership
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navPill">
                          <Nav.Link
                            eventKey="link11"
                            className="purpleText medium navPill  py-3 my-2 "
                          >
                            Exchange Rate And Service Charge
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navPill">
                          <Nav.Link
                            eventKey="link9"
                            className="purpleText medium navPill  py-3 my-2 "
                          >
                            Fraud Awareness
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>

                    <Col sm={9}>
                      <Tab.Content>
                        <Tab.Pane eventKey="link1">
                          <div>
                            {/* 1st section */}
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Getting Started with Legal Remit: How to
                                  Register and Sign Up
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className={classes.details}>
                                  <div className="secFAQ1">
                                    <small className="text-justify responsiveFontLarge first text-black pt-0">
                                      Welcome to Legal Remit! We are delighted
                                      to have you on board as a valued customer.
                                      Getting started with Legal Remit is a
                                      simple and straightforward process that
                                      ensures a seamless and secure remittance
                                      experience for you. Follow the steps below
                                      to register and sign up with Legal Remit:
                                    </small>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        Step 1: Create an Account and Sign Up
                                      </small>
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        To initiate the registration process,
                                        visit our website or download the Legal
                                        Remit app from the App Store or Play
                                        Store. Click on the "Sign Up" or "Create
                                        Account" option to begin.
                                      </small>
                                    </div>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        Step 2: Profile Creation and
                                        Verification
                                      </small>
                                      <br />

                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Fill in your name, email address, and
                                        mobile number to create your profile. To
                                        ensure the security of your account, we
                                        will send a verification link to your
                                        email and an OTP (One-Time Password) to
                                        your mobile number. Verify both your
                                        email and mobile number by clicking on
                                        the link and entering the OTP received.
                                      </small>
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-danger pt-2">
                                        *Important: Ensure that the name
                                        provided during sign-up matches the name
                                        on your identification documents.
                                      </small>
                                    </div>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        Step 3: Enter KYC Details
                                      </small>
                                      <br />

                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        After successfully verifying your email
                                        and mobile number, you will be prompted
                                        to complete your KYC (Know Your
                                        Customer) details. This information is
                                        essential for identity verification and
                                        compliance with regulatory requirements.
                                        Provide your current residential
                                        address, including your house number and
                                        postcode, nationality, and date of
                                        birth. Click "Save and Next" to proceed
                                        to the next step.
                                      </small>
                                    </div>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        Step 4: Upload Valid Identification
                                        Document
                                      </small>
                                      <br />

                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        As part of the KYC process, we require
                                        you to upload a valid form of
                                        identification. Legal Remit currently
                                        accepts three types of IDs: Passport
                                        (from any country), Australian Driver's
                                        License, and Australian Photo ID (Age
                                        Card issued by the state government).
                                        Select the appropriate ID type from the
                                        list and enter the ID number, expiry
                                        date, and issuing authority. Ensure that
                                        the uploaded ID document is clear and
                                        readable, with your face visible.
                                      </small>
                                    </div>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        Step 5: Submit KYC and Complete Profile
                                      </small>
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Once you have entered all the necessary
                                        information and uploaded the valid ID,
                                        click on "Submit" to finalize your KYC
                                        details and complete your profile. With
                                        this step completed, you are now ready
                                        to initiate remittance transactions with
                                        Legal Remit.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-danger pt-2">
                                        *Note: For the security of your account
                                        and transactions, it is crucial to
                                        provide accurate and genuine information
                                        during the registration process.
                                      </small>
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        For any further assistance or queries,
                                        our dedicated support team is available
                                        to assist you at any time. Thank you for
                                        choosing Legal Remit as your trusted
                                        remittance partner.
                                      </small>
                                    </div>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Send Money Step by Step guide
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFAQ1">
                                    <small className="text-justify responsiveFontLarge first text-black pt-0">
                                      At Legal Remit, we are committed to
                                      providing you with a seamless and secure
                                      money transfer experience. Sending money
                                      to your loved ones is now easier than ever
                                      with our user-friendly platform. Follow
                                      these simple steps to initiate a
                                      remittance transaction with Legal Remit:
                                    </small>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        Step 1: Sign Up/Login to our App or
                                        Website
                                      </small>
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        If you are new to Legal Remit, start by
                                        signing up for an account. Visit our
                                        website or download the Legal Remit app
                                        from the App Store or Play Store. Click
                                        on the "Sign Up" option and follow the
                                        registration procedures. If you are an
                                        existing user, log in to your account
                                        with your credentials.
                                      </small>
                                    </div>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        Step 2: Enter the Amount, Choose Desired
                                        receiving country and your preferred
                                        delivery method and payment method.
                                      </small>
                                      <br />

                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Once you logged in, you click on send
                                        money, put the amount, choose country to
                                        receive, and choose delivery and payment
                                        method. This will show give you a brief
                                        summary of your transaction. In this
                                        step, you can apply a promo code if you
                                        have any. The flow will depend on your
                                        selection on this page. However, you can
                                        edit details at any point of time before
                                        you submit the transaction.
                                      </small>
                                    </div>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        Step 3: Enter the Amount, Receiving
                                        Country, and Payment Preferences
                                      </small>
                                      <br />
                                      <ol className="nested-ordered-list ps-4 my-3">
                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            After logging in, click on "Send
                                            Money" to begin the remittance
                                            process.
                                          </small>
                                        </li>
                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            Enter the desired amount you wish to
                                            send,
                                          </small>
                                        </li>

                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            Select the receiving country,
                                          </small>
                                        </li>
                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            Choose your preferred delivery and
                                            payment methods.
                                          </small>
                                        </li>
                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            You can apply a promo code if
                                            available.
                                          </small>
                                        </li>
                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            A brief summary of your transaction
                                            will be displayed with the total
                                            payable and total receivable amount.
                                          </small>
                                        </li>
                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            You have the flexibility to edit
                                            details before finalizing and
                                            submitting the transaction.
                                          </small>
                                        </li>
                                      </ol>
                                    </div>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        Step 4: Provide Recipient details
                                      </small>
                                      <br />

                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        You can select from an existing list of
                                        recipients or you can add a new
                                        recipient <br /> Choose the purpose of
                                        transfer from the given list <br />{" "}
                                        Final review of your payment summary.
                                      </small>
                                    </div>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        Step 5: Pay to Legal Remit
                                      </small>
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Once you confirmed all details, make the
                                        payment to Legal Remit by using your
                                        preferred payment method. You can change
                                        payment methods from this page again if
                                        you change your mind.
                                      </small>
                                      <br />

                                      <small className="text-justify responsiveFontLarge first text-black pt-3 d-block">
                                        Available payment methods
                                      </small>

                                      <ol className="nested-ordered-list ps-4 my-3">
                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            PayTo{" "}
                                          </small>
                                        </li>

                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            Debit card
                                          </small>
                                        </li>
                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            Credit Card
                                          </small>
                                        </li>
                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            PayID
                                          </small>
                                        </li>

                                        <li>
                                          <small className="text-justify responsiveFontLarge first text-black pt-2">
                                            Bank Transfer
                                          </small>
                                        </li>
                                      </ol>

                                      <small className="text-justify responsiveFontLarge first text-danger pt-2">
                                        Please note that availability of payment
                                        methods may vary based on your selected
                                        receiving country.
                                      </small>
                                    </div>

                                    {/* <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        How to use PayTo
                                      </small>
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        PayTo is a newly introduced
                                        revolutionary payment alternative to
                                        make real-time payments for individuals
                                        and businesses. Which was developed by
                                        NPP Australia.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        To use PayTo Please follow the following
                                        steps.
                                      </small>
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        -Provide your PayID or BSB, and Account
                                        Number <br />
                                        -Create and submit a PayTo agreement.
                                        (System will create a PayTo agreement
                                        you just need to provide PayID or bSB
                                        account No and click on next). <br />
                                        -You will receive a PayTo agreement in
                                        your mobile banking app or Internet
                                        banking. Review the agreement and
                                        authorize the agreement. <br />
                                        -As soon as you authorized the
                                        agreement, your account will be debited,
                                        and proceed with the payment. <br />
                                      </small>
                                    </div>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        Do I need to follow the same process in
                                        every transaction?
                                      </small>
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        No, You just need to authorize an
                                        agreement once, as long as you keep that
                                        agreement active, you can use that same
                                        PayID or BSB Account Number for faster
                                        payment.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first purpleText medium   d-block mt-3">
                                        Termination of PayTo agreement
                                      </small>
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        PayTo agreement can be terminated at
                                        your will at any point in time, you
                                        simply visit your Internet banking,
                                        check for the active agreement, and
                                        terminate the agreement as your wish.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first purpleText medium d-block mt-3">
                                        Is there a temporary suspension
                                        available on the PayTo agreement?
                                      </small>
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Yes, You can pause your PayTo agreement
                                        using your Internet banking. Simply log
                                        in and view the PayTo agreement, and you
                                        will see a pause agreement option. Once
                                        you paused the agreement, we are no
                                        longer able to use that agreement for
                                        the transaction unless you reactivate
                                        the agreement from Internet banking.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first purpleText medium d-block mt-3">
                                        Are there any charges that occurred in
                                        managing the PayTo agreement?
                                      </small>
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        No, this is completely free for
                                        individual users and gives full control
                                        over their spending.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first purpleText medium d-block mt-3">
                                        Is PayTo secure to use?
                                      </small>
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Yes, PayTo was developed by NPP
                                        Australia, in coordination with the RBA
                                        and other financial institutions. This
                                        gives you full control over all of your
                                        payments and without your authorization
                                        of the PayTo agreement, you can not make
                                        any size of transaction.
                                        <br />
                                        For more information about PayTo: Visit{" "}
                                        <a href="PayTo - Payments that keep business moving" />
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first purpleText medium d-block mt-3">
                                        Make Payment with a Debit Card
                                      </small>
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Choose a Debit card as the payment
                                        method <br />
                                        Enter Your Card details <br />
                                        Click on the Pay Now button. <br />
                                      </small>{" "}
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        The system may ask you to complete the
                                        3Ds challenge for the authorization of
                                        the transaction. This is just another
                                        form of OTP verification carried out by
                                        the bank.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-danger pt-2">
                                        Please note that we accept Master cards
                                        and Visa only as options for the cards.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first purpleText medium d-block mt-3">
                                        Make Payment with a Credit Card
                                      </small>
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Choose a Credit card as the payment
                                        method <br />
                                        Enter Your Card details <br />
                                        Click on the Pay Now button. <br />
                                      </small>{" "}
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        The system may ask you to complete the
                                        3Ds challenge for the authorization of
                                        the transaction. This is just another
                                        form of OTP verification carried out by
                                        the bank.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-danger pt-2">
                                        Please note that we accept Master cards
                                        and Visa only as options for the cards.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first purpleText medium d-block mt-3">
                                        Is it safe to provide my card details?
                                      </small>
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Yes, we ensure you that our cutting-edge
                                        technology, our strong partnership with
                                        the leading payment processor, and our
                                        highly sophisticated system ensure the
                                        security of your details at its best.
                                        However, we should always be careful
                                        about providing sensitive details
                                        online.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first purpleText medium d-block mt-3">
                                        Service charges for Debit Cards and
                                        Credit Cards are higher
                                      </small>
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        The card payment system is always
                                        expensive to use for payments, like
                                        other merchants, we also pass our cost
                                        to clients to be in a competitive and
                                        healthy position to offer you better
                                        service.
                                      </small>{" "}
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Credit cards charge even higher amounts
                                        than debit cards. But these payment
                                        methods are always expensive compared to
                                        other forms of payment. PayTo is the
                                        best alternative for card payments in
                                        Australia.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first purpleText medium d-block mt-3">
                                        Why do service charges vary by card
                                        type?
                                      </small>
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Based on the types of cards, the service
                                        charge varies because each cards have a
                                        different scheme and they charge based
                                        on their scheme. There are other charges
                                        such as gateway fees, and interchange
                                        fees which vary based on card type and
                                        resulted in higher charges.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first purpleText medium d-block mt-3">
                                        Make payments using PayID
                                      </small>
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        PayID is an easier method to use for
                                        those users who do not wish to provide
                                        the payment details to the payment
                                        processor and wish to use it for manual
                                        transfers like your fund transfer to
                                        your friends and family using your
                                        mobile banking. <br />
                                      </small>{" "}
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        This is a cheaper method to use. <br />
                                        Steps in Making payments using PayID{" "}
                                        <br />
                                        Choose PayID as the payment method{" "}
                                        <br />
                                        Copy or remember our PayID number from
                                        the payment method. <br />
                                        Minimize the Legal Remit app and log in
                                        to your bank internet banking or mobile
                                        banking. <br />
                                        Go to PaySome <br />
                                        Choose PayID as the transfer method.{" "}
                                        <br />
                                        Enter our PayID <br />
                                        Follow the steps <br />
                                        Take the screenshot <br />
                                        Open Legal Remit App again <br />
                                        Upload that receipt and submit your
                                        transaction. <br />
                                      </small>{" "}
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Please make sure you transfer funds to
                                        the correct details as given in the
                                        Payment method. We do not take money
                                        from your account, You need to transfer
                                        money to our account manually.
                                      </small>{" "}
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Transactions done via payID may get
                                        delayed because of the manual process
                                        involved in the transfer process.
                                      </small>{" "}
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Please note that it may take 24 hours
                                        for your payments to be received in our
                                        account in your first transaction.
                                      </small>{" "}
                                      <br />
                                      <br />
                                      <small className="text-justify responsiveFontLarge medium first purpleText pt-2">
                                        Making Payments using Bank Transfer
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        This is another manual payment method,
                                        which may cause some delay in your
                                        transaction processing. Please follow
                                        the following steps to complete your
                                        transaction using bank transfer.
                                      </small>{" "}
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Steps in Making payments using Bank
                                        Transfer
                                      </small>{" "}
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Choose Bank Transfer as the payment
                                        method <br />
                                        Copy or remember our Bank Transfer
                                        number from the payment method.
                                        <br />
                                        Minimize the Legal Remit app and log in
                                        to your bank internet banking or mobile
                                        banking.
                                        <br />
                                        Go to PaySome
                                        <br />
                                        Choose BSB and Account as the transfer
                                        method.
                                        <br />
                                        Enter our Account Details
                                        <br />
                                        Follow the steps
                                        <br />
                                        Take the screenshot
                                        <br />
                                        Open Legal Remit App again
                                        <br />
                                        Upload that receipt and submit your
                                        transaction.
                                        <br />
                                      </small>{" "}
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Please make sure you transfer funds to
                                        the correct details as given in the
                                        Payment method. We do not take money
                                        from your account, You need to transfer
                                        money to our account manually.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-black pt-2">
                                        Transactions done via Bank Transfer may
                                        get delayed because of the manual
                                        process involved in the transfer
                                        process. Please make sure you transfer
                                        funds to the correct details as given in
                                        the Payment method. We do not take money
                                        from your account, You need to transfer
                                        money to our account manually.
                                      </small>{" "}
                                      <br />
                                      <small className="text-justify responsiveFontLarge first text-danger pt-2">
                                        Please note that it may take 24 hours
                                        for your payments to be received in our
                                        account in your first transaction.
                                      </small>{" "}
                                      <br />
                                    </div> */}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How to use PayTo
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFAQ1">
                                    <small className="text-justify responsiveFontLarge first text-black pt-0">
                                      PayTo is a newly introduced revolutionary
                                      payment alternative to make real-time
                                      payments for individuals and businesses.
                                      Which was developed by NPP Australia.
                                    </small>

                                    <div className="secFaq mt-3">
                                      <small className="text-justify responsiveFontLarge first purpleText medium   pt-4">
                                        To use PayTo Please follow the following
                                        steps.
                                      </small>
                                      <br />
                                      <ul className="round ps-2">
                                        <li className="my-2 d-flex">
                                          <small className="text-justify responsiveFontLarge first text-black ">
                                            Provide your PayID or BSB, and
                                            Account Number
                                          </small>
                                        </li>
                                        <li className="my-2 d-flex">
                                          <small className="text-justify responsiveFontLarge first text-black ">
                                            Create and submit a PayTo agreement.
                                            (System will create a PayTo
                                            agreement you just need to provide
                                            PayID or bSB account No and click on
                                            next).
                                          </small>
                                        </li>
                                        <li className="my-2 d-flex">
                                          <small className="text-justify responsiveFontLarge first text-black ">
                                            You will receive a PayTo agreement
                                            in your mobile banking app or
                                            Internet banking. Review the
                                            agreement and authorize the
                                            agreement
                                          </small>
                                        </li>
                                        <li className="my-2 d-flex">
                                          <small className="text-justify responsiveFontLarge first text-black ">
                                            As soon as you authorized the
                                            agreement, your account will be
                                            debited, and proceed with the
                                            payment.
                                          </small>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Do I need to follow the same process in every
                                  transaction?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      No, You just need to authorize an
                                      agreement once, as long as you keep that
                                      agreement active, you can use that same
                                      PayID or BSB Account Number for faster
                                      payment.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Termination of PayTo agreement
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="responsiveFontLarge first text-black pt-2 ">
                                      PayTo agreement can be terminated at your
                                      will at any point in time, you simply
                                      visit your Internet banking, check for the
                                      active agreement, and terminate the
                                      agreement as your wish.
                                    </small>
                                    <br />
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Is there a temporary suspension available on
                                  the PayTo agreement?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Yes, You can pause your PayTo agreement
                                      using your Internet banking. Simply log in
                                      and view the PayTo agreement, and you will
                                      see a pause agreement option. Once you
                                      paused the agreement, we are no longer
                                      able to use that agreement for the
                                      transaction unless you reactivate the
                                      agreement from Internet banking.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Are there any charges that occurred in
                                  managing the PayTo agreement?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq mt-3">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      No, this is completely free for individual
                                      users and gives full control over their
                                      spending.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Is PayTo secure to use?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Yes, PayTo was developed by NPP Australia,
                                      in coordination with the RBA and other
                                      financial institutions. This gives you
                                      full control over all of your payments and
                                      without your authorization of the PayTo
                                      agreement, you can not make any size of
                                      transaction.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2 pe-2">
                                      For more information about PayTo Visit:
                                      <a href="https://payto.com.au/">
                                        {" "}
                                        PayTo - Payments that keep business
                                        moving
                                      </a>
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Make Payment with a Debit Card
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <ul className="round ps-2">
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Choose a Debit card as the payment
                                          method
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Enter Your Card details
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Click on the Pay Now button.
                                        </small>
                                      </li>
                                    </ul>
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      The system may ask you to complete the 3Ds
                                      challenge for the authorization of the
                                      transaction.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      This is just another form of OTP
                                      verification carried out by the bank.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Please note that we accept Master cards
                                      and Visa only as options for the cards.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Make Payment with a Credit Card
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <ul className="round ps-2">
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Choose a Credit card as the payment
                                          method
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Enter Your Card details
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Click on the Pay Now button.
                                        </small>
                                      </li>
                                    </ul>
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      The system may ask you to complete the 3Ds
                                      challenge for the authorization of the
                                      transaction.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      This is just another form of OTP
                                      verification carried out by the bank.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Please note that we accept Master cards
                                      and Visa only as options for the cards.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Is it safe to provide my card details?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black">
                                      Yes, we ensure you that our cutting-edge
                                      technology, our strong partnership with
                                      the leading payment processor, and our
                                      highly sophisticated system ensure the
                                      security of your details at its best.
                                      However, we should always be careful about
                                      providing sensitive details online.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Service charges for Debit Cards and Credit
                                  Cards are higher
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      The card payment system is always
                                      expensive to use for payments, like other
                                      merchants, we also pass our cost to
                                      clients to be in a competitive and healthy
                                      position to offer you better service.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Credit cards charge even higher amounts
                                      than debit cards. But these payment
                                      methods are always expensive compared to
                                      other forms of payment. PayTo is the best
                                      alternative for card payments in
                                      Australia.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            {/* end of 1st section  */}

                            {/* 2nd section */}
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Why do service charges vary by card type?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography className={classes.details}>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Based on the types of cards, the service
                                      charge varies because each cards have a
                                      different scheme and they charge based on
                                      their scheme. There are other charges such
                                      as gateway fees, and interchange fees
                                      which vary based on card type and resulted
                                      in higher charges.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Make payments using PayID
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      PayID is an easier method to use for those
                                      users who do not wish to provide the
                                      payment details to the payment processor
                                      and wish to use it for manual transfers
                                      like your fund transfer to your friends
                                      and family using your mobile banking.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black ">
                                      This is a cheaper method to use.
                                    </small>
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black ">
                                      Steps in Making payments using PayID
                                    </small>
                                    <ul className="round ps-2">
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Choose PayID as the payment method
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Copy or remember our PayID number from
                                          the payment method.
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Minimize the Legal Remit app and log
                                          in to your bank internet banking or
                                          mobile banking.
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Go to PaySome
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Choose PayID as the transfer method.
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Enter our PayID
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Follow the steps
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Take the screenshot
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Open Legal Remit App again
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Upload that receipt and submit your
                                          transaction.
                                        </small>
                                      </li>
                                    </ul>
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Please make sure you transfer funds to the
                                      correct details as given in the Payment
                                      method. We do not take money from your
                                      account, You need to transfer money to our
                                      account manually.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Transactions done via payID may get
                                      delayed because of the manual process
                                      involved in the transfer process.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify responsiveFontLarge font-italic first text-black pt-2">
                                      Please note that it may take 24 hours for
                                      your payments to be received in our
                                      account in your first transaction.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            {/* Extra content */}
                            {/* <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I change my delivery method once the
                                  transaction is created?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      If your transaction has not yet proceeded,
                                      you have the option to request a change in
                                      the delivery method. You can do this by
                                      sending us a request through various
                                      channels, such as messaging, chat, email,
                                      or over the phone. Once we receive your
                                      request, we will promptly update the
                                      system according to your preferred
                                      delivery method. It's essential to notify
                                      us before the transaction is processed to
                                      ensure a smooth and accurate transfer of
                                      funds according to your requirements.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion> */}
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Making Payments using Bank Transfer
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      This is another manual payment method,
                                      which may cause some delay in your
                                      transaction processing. Please follow the
                                      following steps to complete your
                                      transaction using bank transfer.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Steps in Making payments using Bank
                                      Transfer
                                    </small>{" "}
                                    <br />
                                    <ul className="round ps-2">
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Choose Bank Transfer as the payment
                                          method
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Copy or remember our Bank Transfer
                                          number from the payment method.
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Minimize the Legal Remit app and log
                                          in to your bank internet banking or
                                          mobile banking.
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Go to PaySome
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Choose BSB and Account as the transfer
                                          method.
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Enter our Account Details
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Follow the steps
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Take the screenshot
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Open Legal Remit App again
                                        </small>
                                      </li>
                                      <li className="my-2 d-flex">
                                        <small className="text-justify responsiveFontLarge first text-black ">
                                          Upload that receipt and submit your
                                          transaction.
                                        </small>
                                      </li>
                                    </ul>
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Please make sure you transfer funds to the
                                      correct details as given in the Payment
                                      method. We do not take money from your
                                      account, You need to transfer money to our
                                      account manually.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Transactions done via Bank Transfer may
                                      get delayed because of the manual process
                                      involved in the transfer process.
                                    </small>{" "}
                                    <br />
                                    <small className="text-justify font-italic responsiveFontLarge first text-black pt-2">
                                      Please note that it may take 24 hours for
                                      your payments to be received in our
                                      account in your first transaction.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What does KYC mean?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      KYC stands for "Know Your Customer." It is
                                      a standard process used by businesses and
                                      financial institutions to verify the
                                      identity of their customers and assess
                                      their suitability and potential risks
                                      before establishing a business
                                      relationship with them. The KYC process
                                      involves collecting and verifying
                                      information such as full name, date of
                                      birth, address, and valid identification
                                      documents. This helps prevent fraud, money
                                      laundering, and other illegal activities
                                      by ensuring that customers are legitimate
                                      and compliant with relevant regulations.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Components involved in KYC
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Full Name of Customer (Name must be
                                          matched with the identification
                                          documents)
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Date of Birth
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Nationality
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Residential address and Postal address
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Valid Identification documentent
                                        </small>
                                      </li>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What are valid Identification Documents we can
                                  use to get service from Legal Remit?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black">
                                      We accept two types of documents only to
                                      offer our remittance service.
                                    </small>{" "}
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          <b>International Passport:</b> We
                                          accept valid and readable
                                          international passports which must
                                          have an Australian Visa. We carry out
                                          your VEVO checks to verify your KYC
                                          and approve your account. If you do
                                          not have a valid Visa to stay and work
                                          in Australia, we may refuse to provide
                                          you with our money transfer service.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          <b>Australian Driving license:</b> We
                                          accept all forms of Australian Driving
                                          license which must be valid. You can
                                          use a learner permit license,
                                          Provisional License, and Full License
                                          issued within Australia. We run DVS
                                          checks against your license to
                                          identify whether it's a valid one or
                                          not.{" "}
                                        </small>
                                      </li>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What is KYC verification and why it is
                                  important for me?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black">
                                      KYC verification is a process of verifying
                                      your given details to determine whether
                                      the details are legitimate or not. Without
                                      verifying your KYC, we can not process
                                      your transaction for payment.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  KYC verification process
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black">
                                      To verify your KYC We check your ID from
                                      DVS and run a VEVO check along with other
                                      background checks to determine your
                                      provided details are genuine and
                                      legitimate to process a remittance
                                      transaction. If we failed to verify your
                                      KYC with the provided information, we may
                                      request an additional document from you.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What is an additional document?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black">
                                      An additional document is a piece of
                                      document that may be required for the KYC
                                      verification process. To verify your KYC
                                      and to protect your ID from misuse, you
                                      may be asked for an address proof document
                                      that consists of your current residential
                                      address. Other than address proof
                                      documents, we may need to ask for your
                                      bank statements and payslips if you are
                                      required to send a larger amount of money
                                      in a short period of time.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Documents that are accepted as address-proof
                                  documents.
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black">
                                      We accept the following address-proof
                                      documents
                                    </small>{" "}
                                    <br />
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Australian Driver license
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Australian Photo ID
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Bank statement
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Official letter sent via post (Letters
                                          such as a letter sent from the
                                          Australian government, Bank, ATO,
                                          Centrelink, insurance, and regulated
                                          service providers)
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Rental agreement
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Proof of rent payment{" "}
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Utility bills (Electricity bill,
                                          mobile phone bill, internet bill, gas
                                          bill, etc)
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Balance proof
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Address proof extracted from the bank
                                          account
                                        </small>
                                      </li>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Why and when do I need to give my payslips and
                                  bank statements?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="ext-justify responsiveFontLarge first text-black pt-2">
                                      You may be required to provide your
                                      payslips and bank statements in certain
                                      situations for verification and compliance
                                      purposes. The statement you provided
                                      contains some correct information, but
                                      let's rephrase it for clarity and
                                      accuracy:
                                    </small>
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      "You are required to provide your bank
                                      statements and payslips when initiating
                                      transactions involving a substantial
                                      amount of money. Typically, these
                                      documents are not necessary for
                                      transactions below $10,000. However, for
                                      larger transactions, it is essential to
                                      submit bank statements and payslips to
                                      verify the source of income for regulatory
                                      purposes. This process ensures compliance
                                      with relevant financial regulations and
                                      helps prevent money laundering and
                                      fraudulent activities. Rest assured that
                                      we handle all your documents in strict
                                      accordance with the Australian Privacy Act
                                      1988, ensuring the protection of your
                                      personal information and privacy."
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How we calculate the threshold.
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black  d-block">
                                      The threshold will be calculated for
                                      different time periods considering 365
                                      days as a one-window period. 1 Day Limit,
                                      7 Days Limit, 30 Days Limit, 90 Days
                                      Limit, 180 Days Limit, and 365 Days Limit
                                      will be considered for the threshold
                                      calculation and additional documents
                                      request.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  When does my money get delivered to the
                                  recipient?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Typically, 99% of our transactions get
                                      delivered in real-time.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What does real-time refer to?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      Real-time refers to a task that is
                                      completed in less than 60 sec. We defined
                                      real-time as a service completed within 10
                                      minutes from the time your transaction was
                                      created. Once the system verifies your
                                      transaction, it will be done within 60
                                      seconds.
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How do I get updates on my transaction?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      We keep you updated about your transaction
                                      via different types of notifications. We
                                      send you a push notification, In-app
                                      notification, SMS notification, and email
                                      notification to keep you updated about
                                      each stage of your transaction.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What types of notifications may I receive from
                                  Legal Remit?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black medium d-block">
                                      We send you the following notification:
                                    </small>
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          New transaction submission (push
                                          notification, in-app notification, and
                                          email notification){" "}
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Transaction confirmed (push
                                          notification, in-app notification, and
                                          email notification){" "}
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Transaction delivered (push
                                          notification, in-app notification,
                                          email notification, and SMS
                                          notification){" "}
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Transaction error notification: This
                                          notification will be sent if there is
                                          an error on your recipient details.
                                          (Push notifications, In-app
                                          notifications, and email notifications
                                          are sent){" "}
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Additional documents required: This
                                          notification will be sent to you if
                                          additional documents are required to
                                          complete your transaction. Address
                                          proof documents, bank statements, and
                                          payslips are the documents that might
                                          be required in some circumstances.
                                          (push notification, in-app
                                          notification, and email notification){" "}
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Fund transfer into the wrong account:
                                          If you transfer funds to the wrong
                                          account instead of Legal Remit’s
                                          account. you will be informed via chat
                                          available on our APP. We may give you
                                          a call to let you know about the
                                          error.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Amount error and confirmation: you
                                          will be notified about these errors
                                          via chat available in the App.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Delivered notification to the
                                          recipient (SMS Notification)
                                        </small>
                                      </li>

                                      <small className="text-black medium d-block">
                                        Please note that our notification
                                        category may be updated from time to
                                        time. The provided list may differ from
                                        the actual categories available in the
                                        app.
                                      </small>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I manage notifications?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      We have a dynamic setting option that
                                      allows you to control everything with a
                                      few taps. Please
                                      <Link
                                        to="/settings"
                                        className="pointer px-2"
                                        target="_blank"
                                      >
                                        click here
                                      </Link>
                                      to go to settings. You can choose what you
                                      want to be notified about.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How to get updated about rates?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black  d-block">
                                      You have the flexibility to set your
                                      preferred rate as desired. Once the
                                      exchange rate reaches your specified rate,
                                      our system will promptly notify you. For
                                      receiving regular rate updates, we suggest
                                      setting the expected rate slightly lower
                                      than the recent trends. This way, you'll
                                      stay informed about any favorable rate
                                      changes and have a better chance of making
                                      timely and informed decisions.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What is the delivery method?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black  d-block">
                                      A delivery method refers to the available
                                      options for sending money to your
                                      recipient back home. It includes three
                                      main choices:
                                    </small>
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Bank Account Deposit: This option
                                          allows the money to be directly
                                          deposited into the recipient's bank
                                          account, making it easily accessible
                                          and convenient for them to use.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Cash Pick-Up: With this method, the
                                          recipient can collect the money in
                                          cash from a designated pickup location
                                          or agent, which is particularly useful
                                          if they don't have a bank account or
                                          prefer to receive cash.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Wallet Top-Up: This option involves
                                          adding money to a digital wallet or
                                          mobile money account that the
                                          recipient can access and use for
                                          various transactions, such as paying
                                          bills or making purchases.
                                        </small>
                                      </li>
                                    </ol>
                                    <small className="text-black  d-block">
                                      These delivery methods offer flexibility
                                      and cater to the different preferences and
                                      needs of the recipients when receiving
                                      funds from abroad.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I change my delivery method once the
                                  transaction is created?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      If your transaction has not yet proceeded,
                                      you have the option to request a change in
                                      the delivery method. You can do this by
                                      sending us a request through various
                                      channels, such as messaging, chat, email,
                                      or over the phone. Once we receive your
                                      request, we will promptly update the
                                      system according to your preferred
                                      delivery method. It's essential to notify
                                      us before the transaction is processed to
                                      ensure a smooth and accurate transfer of
                                      funds according to your requirements.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I change my receiver/ recipient
                                  details?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      If a transaction has not been processed
                                      yet, you can edit recipient details using
                                      edit recipient’s details on the
                                      transaction. If the transaction is already
                                      processed our support team require to
                                      verify your change request. Alternatively,
                                      you can send us the correct details via
                                      sms, email, or chat and one of our
                                      friendly staff will amend details as per
                                      your request.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What Payment methods are available?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      The following four payment methods are
                                      available for customers via Legal Remit.
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          PayTo
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Debit Card
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          PayID/ OSKO
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Bank Transfer
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Credit Card
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2 d-block">
                                      Please note that some payment methods are
                                      available in specific countries only.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How does PayID work?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <h2 className="text-black my-2 d-block">
                                      What is PayID?
                                    </h2>

                                    <small className="text-black my-2 mb-1 d-block">
                                      PayID is a simple system enabling you to
                                      use an email address or phone number as a
                                      ‘shortcut’ to your existing bank accounts.
                                      Once you set up a PayID, instead of giving
                                      your banking details to someone to
                                      transfer the money you can just give them
                                      your chosen contact details as a shortcut
                                      to that account.
                                    </small>

                                    <small className="text-black my-2 d-block">
                                      A PayID can be an email address, a
                                      registered ABN, or a mobile or landline
                                      phone number which is a lot easier to
                                      remember rather than giving people your
                                      BSB and account numbers! When someone pays
                                      you through a PayID, they see the name you
                                      choose to display alongside your PayID
                                      details so they will be sure it’s they’re
                                      sending money to.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How It Works/How to send money in a PayID?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      To be able to send money into any PayID,
                                      you should have registered your PayID
                                      using internet banking, or using the
                                      mobile App of the bank. If you have
                                      already registered PayID, you can simply
                                      choose to send money
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      Please visit{" "}
                                      <a href="https://payid.com.au/how-it-works/">
                                        How it works - PayID
                                      </a>
                                      o know more about PayID
                                    </small>

                                    <small className="text-black my-2 d-block">
                                      *Please note that PayID transfer also
                                      takes up to 24 hours to be received in the
                                      recipient account, if you are paying for
                                      the first time.
                                    </small>

                                    <small className="text-black my-2 d-block font-italic">
                                      This is a manual method of fund transfer
                                      where Legal Remit does not have any
                                      control. Please make sure you transfer
                                      funds to the correct details, and correct
                                      amounts to make sure your will be
                                      completed swiftly.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How does Bank Transfer work?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      Bank transfer is a simple method of
                                      transferring funds from your bank account
                                      to another bank account using BSB and
                                      Account Number. Generally, a bank transfer
                                      takes up to 24 hours if you are paying for
                                      the first time in a new account. Most
                                      Australian banks are using OSKO payment in
                                      their bank transfer as well. OSKO makes it
                                      able to make payments in real-time to any
                                      connected account. there will be a
                                      real-time transfer after your first
                                      transaction
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      *Please note that Bank transfer also takes
                                      up to 24 hours to be received in the
                                      recipient account, if you are paying for
                                      the first time.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block font-italic">
                                      This is a manual method of fund transfer
                                      where Legal Remit does not have any
                                      control. Please make sure you transfer
                                      funds to the correct details, and correct
                                      amounts to make sure your will be
                                      completed swiftly.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How do Debit Card and credit payment methods
                                  work?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      It’s an easier payment method for
                                      customers to go with. It asks for your
                                      debit card or Credit card number, the date
                                      of the card’s expiry, and your CCV.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      *Note: Never share your card details with
                                      anyone including Legal Remit’s staff. We
                                      never ask you to provide us with your card
                                      details.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How does cash Pick-up work?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className=" text-black my-2">
                                      Cash Pick-Up is a convenient delivery
                                      option where the recipient can physically
                                      visit a designated outlet to receive the
                                      money in cash. As the sender, you will
                                      receive a transaction identification
                                      number (remittance number) or control
                                      number. The recipient needs to provide
                                      this control number and a valid form of
                                      ID, such as a driver's license or
                                      government-issued ID, for verification
                                      purposes when collecting the cash.
                                    </small>
                                    <small className="text-black my-2 d-block">
                                      To ensure a smooth transaction, it's
                                      essential for the details you provide
                                      while making the transaction to match the
                                      recipient's ID presented during the cash
                                      pick-up.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      The best part is that 99% of cash pick-up
                                      transactions are usually ready for
                                      collection within just a few minutes,
                                      making it a fast and efficient way to send
                                      money to your loved ones. They can receive
                                      the cash they need quickly and securely,
                                      and you can have peace of mind knowing
                                      your funds will reach them promptly.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How Does Bank Account Deposit Work?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    {/* <small className="text-black my-2">The referral process is simple and rewarding. Here's how it works:</small> */}
                                    <small className="text-black my-2 d-block">
                                      Bank Deposit or Account deposit is the
                                      most popular remittance delivery method in
                                      today's world. With this option, we
                                      transfer your desired amount in your
                                      chosen currency directly to your
                                      recipient's bank account. The best part is
                                      that 99% of bank deposits are completed
                                      within minutes, ensuring quick and
                                      convenient access to the funds.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      However, it's essential to keep in mind
                                      that delivery times are estimated and may
                                      vary from one transaction to another. The
                                      actual delivery time can be influenced by
                                      factors such as the payment method used
                                      and the receiving country's banking
                                      system.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      Despite possible variations in delivery
                                      times, the bank deposit remains a reliable
                                      and widely preferred choice for sending
                                      money globally, providing a secure and
                                      efficient way to transfer funds to your
                                      loved ones.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What details are required to make a bank
                                  deposit transaction?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    {/* <small className="text-black my-2">The referral process is simple and rewarding. Here's how it works:</small> */}
                                    <small className="text-black my-2 d-block">
                                      To complete a bank deposit transaction, we
                                      require the following details of your
                                      recipient:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Full name of the account holder or
                                          recipient.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Bank Name, Account Number, Routing
                                          Number, Branch code, etc.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Contact details of the recipient,
                                          including address and mobile number.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Your relationship with the recipient.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2 d-block">
                                      Please be aware that the required details
                                      may vary depending on the receiving
                                      country. The information provided above is
                                      a general guideline commonly used in most
                                      countries.
                                    </small>
                                    <small className="text-black my-2 d-block">
                                      It is crucial to ensure the accuracy of
                                      recipient details, as any mistakes could
                                      lead to the payment being sent to the
                                      wrong account. Once the payment is made,
                                      it cannot be reversed. It is your
                                      responsibility to verify and input the
                                      correct recipient details. Legal Remit
                                      will not be held liable for any losses
                                      resulting from incorrect recipient
                                      information provided by you.
                                    </small>
                                    <small className="text-black my-2 d-block">
                                      By providing accurate and complete
                                      recipient details, you can ensure a smooth
                                      and successful bank deposit transaction,
                                      securely transferring funds to your
                                      intended recipient's account.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What information is required for wallet
                                  deposit transactions?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    {/* <small className="text-black my-2">The referral process is simple and rewarding. Here's how it works:</small> */}
                                    <small className="text-black my-2 d-block">
                                      To complete a wallet deposit transaction,
                                      we require the following details of your
                                      recipient:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Full name of the account holder or
                                          recipient.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Wallet Name, and wallet account number
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Contact details of the recipient,
                                          including address and mobile number.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Your relationship with the recipient.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2 mb-1 d-block">
                                      Please be aware that the required details
                                      may vary depending on the receiving
                                      country. The information provided above is
                                      a general guideline commonly used in most
                                      countries.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      It is crucial to ensure the accuracy of
                                      recipient details, as any mistakes could
                                      lead to the payment being sent to the
                                      wrong account. Once the payment is made,
                                      it cannot be reversed. It is your
                                      responsibility to verify and input the
                                      correct recipient details. Legal Remit
                                      will not be held liable for any losses
                                      resulting from incorrect recipient
                                      information provided by you.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      By providing accurate and complete
                                      recipient details, you can ensure a smooth
                                      and successful wallet deposit transaction,
                                      securely transferring funds to your
                                      intended recipient's account.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What information is required for a cash Pickup
                                  transaction?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2">
                                      For a Cash Pickup transaction, you should
                                      provide the following information.
                                    </small>
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Full Name of Recipient (Name must
                                          match with the valid identification
                                          document)
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Contact details of the recipient,
                                          including address and mobile number.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Your relationship with the recipient.
                                        </small>
                                      </li>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Can I make a B2B transaction from Legal Remit?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2">
                                      Yes, Legal Remit offers the convenience of
                                      conducting B2B (Business-to-Business)
                                      transactions, facilitating seamless
                                      financial dealings between businesses.
                                      Currently, our B2B transaction services
                                      are specifically available for
                                      transactions from Australia to Nepal.
                                    </small>
                                    <small className="text-black my-2 d-block">
                                      With Legal Remit, businesses in Australia
                                      can efficiently transfer funds to their
                                      counterparts in Nepal, ensuring smooth
                                      cross-border trade and commercial
                                      activities. Whether it's for paying
                                      suppliers, settling invoices, or engaging
                                      in other business-related financial
                                      transactions, our B2B services provide a
                                      reliable and secure platform.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      To initiate a B2B transaction, businesses
                                      need to provide the necessary recipient
                                      details, such as the recipient company's
                                      name, bank account information, and any
                                      additional required information based on
                                      the specific needs of the transaction. Our
                                      robust system ensures that the funds are
                                      safely transferred to the designated
                                      business account in Nepal, promoting
                                      efficiency and transparency in
                                      international business payments. .
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      Moreover, our team at Legal Remit is
                                      dedicated to assisting businesses
                                      throughout the transaction process,
                                      offering support and guidance to ensure a
                                      seamless experience. We understand the
                                      importance of accuracy and timeliness in
                                      B2B transactions, and our services are
                                      tailored to meet the unique requirements
                                      of businesses engaging in cross-border
                                      financial activities.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      As a trusted financial partner, Legal
                                      Remit prioritizes the security of your
                                      transactions, adhering to regulatory
                                      standards and industry best practices. By
                                      choosing Legal Remit for your B2B
                                      transactions from Australia to Nepal, you
                                      can rest assured that your business
                                      payments are in safe hands, fostering
                                      stronger commercial relationships and
                                      facilitating growth opportunities in the
                                      global market.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What information is required for B2B
                                  transactions?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    {/* <small className="text-black my-2">
                                    If you are using the web app, follow these steps to reset your password:

                                    </small> */}
                                    {/* <small className="text-black my-2 d-block">
                                      To make a B2B transaction, the following
                                      information may be required.
                                    </small> */}

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Recipients Details
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Purpose of transfer
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          invoice (if making payment against any
                                          invoices)
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Evidence of Business Relationship
                                        </small>
                                      </li>
                                    </ol>
                                    <small className="text-black my-2 d-block">
                                      Please note that B2B transactions are only
                                      available from Australia to Nepal.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What information is required for B2C
                                  transactions?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    {/* <small className="text-black my-2">
                                    If you are using the web app, follow these steps to reset your password:

                                    </small> */}
                                    {/* <small className="text-black my-2 d-block">
                                      To make a B2B transaction, the following
                                      information may be required.
                                    </small> */}

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Recipients Details
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Purpose of transfer
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          invoice (if making payment against any
                                          invoices)
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Evidence of Business Relationship
                                        </small>
                                      </li>
                                    </ol>
                                    <small className="text-black my-2 d-block">
                                      Please note that B2C transactions are
                                      available for Australia to Nepal Only.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What information is required for P2B
                                  transactions?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    {/* <small className="text-black my-2">
                                    If you are using the web app, follow these steps to reset your password:

                                    </small> */}
                                    <small className="text-black my-2 d-block">
                                      To make a P2B transaction, the following
                                      information may be required.
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Recipients Details
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Purpose of transfer
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          invoice (if making payment against any
                                          invoices)
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Evidence of Business Relationship
                                        </small>
                                      </li>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How secure is my transfer with Legal Remit?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className=" text-black my-2">
                                      Your transfer with Legal Remit is highly
                                      secure. We prioritize the safety of your
                                      transactions by employing advanced
                                      encryption and multiple layers of
                                      cybersecurity protection. Your data is
                                      securely transmitted from your end to your
                                      recipient's end using a secure hosting
                                      system. At every stage of the transaction,
                                      you can track its progress, ensuring
                                      complete transparency and peace of mind.
                                      Rest assured that all your transactions
                                      are safeguarded and conducted with utmost
                                      security.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How does Legal Remit collect and manage my
                                  personal data?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className=" text-black my-2">
                                      At Legal Remit, your privacy is of utmost
                                      importance to us. We collect and manage
                                      your personal data in strict accordance
                                      with the guidelines outlined in the
                                      Australian Privacy Act 1988. Our
                                      commitment to safeguarding your
                                      information ensures that your data is
                                      handled with the highest level of
                                      confidentiality and security.
                                    </small>
                                    <br />
                                    <small className="text-black my-2">
                                      To know more about our privacy practices
                                      and how we manage your personal data, we
                                      encourage you to review our detailed
                                      Privacy Policy. You can find the Privacy
                                      Policy by clicking on this link{" "}
                                      <Link
                                        to="/privacy-policy"
                                        className="pointer"
                                        target="_blank"
                                      >
                                        Privacy Policy.
                                      </Link>
                                    </small>
                                    <br />
                                    <br />

                                    <small className="text-black my-2">
                                      For further information about the
                                      Australian Privacy Act 1988, you can visit
                                      the Federal Register of Legislation.{" "}
                                      <a
                                        href="https://www.legislation.gov.au/
"
                                        className="pointer"
                                        target="_blank"
                                      >
                                        https://www.legislation.gov.au/
                                      </a>
                                    </small>
                                    <br />
                                    <br />

                                    <small className="text-black my-2">
                                      Rest assured that at Legal Remit, we take
                                      every measure to protect and respect your
                                      privacy, adhering to all applicable laws
                                      and regulations to ensure the safety and
                                      security of your personal data. If you
                                      have any specific concerns or questions
                                      regarding your privacy, please don't
                                      hesitate to reach out to our dedicated
                                      support team.
                                    </small>
                                    <br />
                                    <br />

                                    <small className="text-black my-2">
                                      You can trust that your transfer and data
                                      are highly secured with Legal Remit due to
                                      several reasons:
                                    </small>
                                    <br />
                                    <br />

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Cutting-edge technology: Legal Remit
                                          employs advanced and state-of-the-art
                                          technology to ensure that each of your
                                          transactions is secure and encrypted,
                                          safeguarding your sensitive
                                          information from unauthorized access.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Compliance with Australian Privacy
                                          Act: We handle all customer data in
                                          strict compliance with the guidelines
                                          of the Australian Privacy Act 1988,
                                          which means your personal information
                                          is protected and managed with the
                                          highest level of confidentiality.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Transaction tracking: We provide the
                                          option to track your transactions at
                                          every stage of the process. This
                                          transparency allows you to have
                                          visibility into the progress of your
                                          transfer, ensuring peace of mind.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Secure payment system: Legal Remit
                                          uses a secure payment system with
                                          multiple layers of protection to keep
                                          your funds safe during the transfer
                                          process. This helps prevent any
                                          unauthorized access or fraudulent
                                          activities.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          24/7 customer support: Our dedicated
                                          customer support team is available
                                          round the clock. You can reach out to
                                          us anytime via chat or talk to get
                                          assistance or track your transaction
                                          status, ensuring constant
                                          communication and support.
                                        </small>
                                      </li>
                                    </ol>
                                    <br />
                                    <small className="text-black my-2">
                                      With Legal Remit, you can rest assured
                                      that your transactions and personal data
                                      are handled with the utmost care and
                                      security, providing you with a safe and
                                      reliable platform for your financial
                                      needs.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Can I cancel my transaction?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className=" text-black my-2">
                                      Yes, you can cancel your transaction under
                                      certain conditions. However, there are
                                      situations where cancellation may not be
                                      possible.
                                    </small>
                                    <br />
                                    <small className="text-black my-2">
                                      You can cancel your transactions under the
                                      following conditions.
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Before confirmation: If you change
                                          your mind or realize that you made a
                                          mistake in the transaction details,
                                          you can request to cancel the
                                          transaction before it is confirmed.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Transaction status: You can track the
                                          status of your transaction, and if it
                                          has not been confirmed yet, you may
                                          have the option to cancel it.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2">
                                      However, there are instances when
                                      cancellation may not be feasible:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Processed transactions: Once the
                                          transaction has been processed and
                                          confirmed, it is no longer possible to
                                          cancel it.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Delivered transactions: If the money
                                          has already been successfully
                                          delivered to the nominated recipient,
                                          cancellation is not possible.
                                        </small>
                                      </li>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What are the procedures to cancel my
                                  transaction?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2">
                                      To cancel your transaction, follow these
                                      simple steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Check transaction status: First, check
                                          the status of your transaction to see
                                          if it is eligible for cancellation. If
                                          the transaction has not been confirmed
                                          or delivered, it may be eligible for
                                          cancellation.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Access More Options: If the
                                          transaction is eligible for
                                          cancellation, access the "More
                                          Options" section related to that
                                          specific transaction.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Request Cancellation: Within the "More
                                          Options" section, you will find the
                                          option to request cancellation for the
                                          selected transaction. Click on the
                                          cancellation option to proceed.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Notification from our staff: After you
                                          initiate the cancellation request, one
                                          of our friendly staff members will
                                          promptly reach out to you to provide
                                          an update on the status of your
                                          cancellation request.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2">
                                      Please note that cancellation is only
                                      possible for transactions that have not
                                      been confirmed or delivered. Once a
                                      transaction has been processed or
                                      successfully delivered, cancellation will
                                      no longer be an option. For any concerns
                                      or further assistance, feel free to
                                      contact our customer support, and we'll be
                                      happy to help you.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I request a refund?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2">
                                      To request a refund, follow these steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Cancel the transaction: First, you
                                          need to request the cancellation of
                                          the transaction. If the transaction is
                                          eligible for cancellation, proceed
                                          with the cancellation process as
                                          mentioned earlier.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Access the refund option: After the
                                          cancellation request, go to the refund
                                          option provided for the specific
                                          transaction. Click on the refund
                                          option to initiate the refund process.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Fill out the required details: In the
                                          refund form, you will be required to
                                          provide certain details, including
                                          your account information. Ensure that
                                          the account details you provide match
                                          the same account used to make the
                                          original transaction. If the
                                          transaction was made from a debit card
                                          or credit card, the refund will be
                                          credited to the same card used for the
                                          transaction.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Additional compliance checks:
                                          Depending on the circumstances, there
                                          may be additional compliance checks
                                          needed to approve the reversal of your
                                          transaction for the refund process.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Refund processing time: The refund
                                          process may take approximately 3 to 7
                                          business days to complete.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2">
                                      Please be aware that administrative fees
                                      may apply to each refund made from a debit
                                      card or credit card. It's important to
                                      thoroughly review the refund policy and
                                      any associated fees before proceeding with
                                      the refund request.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  In which condition can I get a refund?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2">
                                      You can request a refund under the
                                      following conditions:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Cancellation: If you decide to cancel
                                          your transaction before it is
                                          confirmed or delivered, you can
                                          request a refund.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Mistaken transfer: If you accidentally
                                          transfer funds to our account or make
                                          a payment in error, you can request a
                                          refund for the mistaken transaction.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Invalid recipient details: If you made
                                          a transaction with incorrect or
                                          invalid recipient details and are
                                          unable to provide the correct and
                                          valid information, you can request a
                                          refund. In such a scenario, please get
                                          in touch with our customer service
                                          representative to initiate the refund
                                          process.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          In any of these situations, it is
                                          essential to promptly contact our
                                          customer support team to request a
                                          refund and provide the necessary
                                          information and details to facilitate
                                          the process. Please note that the
                                          refund process may involve compliance
                                          checks and may take a few business
                                          days to be completed.
                                        </small>
                                      </li>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How long will it take for a refund?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2">
                                      The refund process typically takes
                                      anywhere from 1 to 7 working days to be
                                      completed. During this period, certain
                                      compliance processes are carried out to
                                      ensure the refund is executed accurately
                                      and securely. While the maximum timeframe
                                      for the refund process is 7 working days,
                                      Legal Remit is committed to making the
                                      refund process quicker and more efficient.
                                    </small>
                                    <small className="text-black my-2 d-block">
                                      In fact, approximately 70 percent of our
                                      refunds are completed within just two
                                      working days, indicating our dedication to
                                      providing timely and reliable refund
                                      services. Rest assured that our team works
                                      diligently to process refunds promptly,
                                      aiming to minimize any inconvenience and
                                      ensure a smooth experience for our valued
                                      customers.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How to refer family and friends?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="bolder text-black my-2">
                                      From Mobile App
                                    </small>
                                    <small className="text-black my-2 d-block">
                                      On the home page of our mobile app, you'll
                                      find a reward section located in the
                                      middle. To access it, simply visit the
                                      reward section, where you'll discover a
                                      "Refer and Earn" option. Click on this
                                      option, and you'll be provided with a
                                      unique referral link and a promo code.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      To earn rewards, share this referral link
                                      or promo code with your friends and
                                      family. When they sign up for our
                                      services, make sure they use your referral
                                      link or enter the promo code during the
                                      signup process..
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      By doing so, both you and your referred
                                      friends can enjoy the benefits of our
                                      referral program, and you'll receive
                                      rewards as a token of our appreciation for
                                      spreading the word about our app and
                                      services. It's a win-win situation for
                                      everyone involved, so start referring and
                                      earning rewards today!
                                    </small>

                                    <small className="bolder text-black my-2">
                                      From Web
                                    </small>
                                    <small className="text-black my-2 d-block">
                                      For web users, follow these steps to
                                      access the "Refer and Rewards" option:
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      1. Click on the options menu located next
                                      to your name or profile icon. .
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      2. From the dropdown menu, look for the
                                      "Refer and Rewards" option and click on
                                      it.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      3. Upon clicking, you will be provided
                                      with a unique referral link.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      4. Share this referral link with your
                                      friends and family to invite them to our
                                      platform.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      By sharing the referral link and having
                                      your friends and family sign up using it,
                                      you and your referred contacts can both
                                      earn rewards as part of our referral
                                      program. It's a simple and rewarding way
                                      to spread the word about our services and
                                      benefit from the referral program. So,
                                      start sharing and enjoying the rewards
                                      today!
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How does referral work?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2">
                                      The referral process is simple and
                                      rewarding. Here's how it works:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Share the referral link or code: Once
                                          you have the referral link or promo
                                          code from the "Refer and Rewards"
                                          section, share it with your friends
                                          and family.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Friends and family signup: When your
                                          friends and family receive the
                                          referral link or use the promo code,
                                          they need to sign up for our services
                                          using it during the signup process.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Successful transaction: After signing
                                          up, when your referred contacts send
                                          money through our platform, and the
                                          transaction is successfully completed,
                                          both you and your referred friend will
                                          be eligible for a reward.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Reward value: The reward value may
                                          vary from time to time based on our
                                          promotion plans and current offers.
                                        </small>
                                      </li>
                                    </ol>
                                    <small className="text-black my-2 d-block">
                                      By participating in our referral program,
                                      both you and your friends benefit from the
                                      rewards as a thank-you gesture for
                                      introducing new customers to our platform.
                                      It's an excellent way to earn rewards
                                      while helping your loved ones discover the
                                      convenience and reliability of our
                                      services. Keep an eye out for the latest
                                      reward offers and start referring today!
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What benefits will I get if I refer someone?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2">
                                      By referring someone to our platform, you
                                      become eligible for various benefits
                                      through our referral program. As part of
                                      our customer-centric approach, we
                                      regularly update the reward values to
                                      ensure attractive incentives for both
                                      parties participating in the program.
                                    </small>
                                    <small className="text-black my-2 d-block">
                                      The specific benefits you and your
                                      referred friend will receive can be found
                                      in our terms and conditions, where we
                                      outline the criteria and details of the
                                      referral program. This way, you can have a
                                      clear understanding of the rewards you can
                                      earn and the conditions that must be met
                                      to qualify for the benefits.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      Our referral program is designed to be
                                      mutually beneficial, encouraging you to
                                      share our services with your friends and
                                      family while also providing them with the
                                      opportunity to experience the convenience
                                      and reliability of our platform. So, check
                                      our terms and conditions to know the
                                      current rewards and start referring to
                                      enjoy the benefits!
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What are rewards?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2">
                                      Rewards are the incentives and benefits we
                                      offer to our clients for using our
                                      services. As a customer-centric and
                                      dynamic company, we continuously update
                                      our rewards programs to provide attractive
                                      offerings to our valued customers. Our
                                      rewards program includes various types of
                                      benefits, such as:
                                    </small>
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Refer and Earn: This program allows
                                          you to earn rewards by referring our
                                          services to your friends and family.
                                          When they sign up and use our
                                          platform, both you and your referred
                                          contacts can receive rewards.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Cash Back Offers: We provide cashback
                                          offers on certain transactions, giving
                                          you the opportunity to get back a
                                          percentage of the transaction amount
                                          as a reward.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Discounts on Service Charges: Enjoy
                                          reduced service charges on specific
                                          transactions as part of our reward
                                          program, helping you save on fees.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Premium Exchange Rate: We may offer a
                                          premium exchange rate on select
                                          transactions, allowing you to get more
                                          value for your money.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Reward Points: Earn reward points with
                                          every transaction, which you can
                                          redeem for various benefits or
                                          discounts in the future.
                                        </small>
                                      </li>
                                    </ol>
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      {" "}
                                      Our rewards program is designed to enhance
                                      your overall experience with us, ensuring
                                      that you get the most out of our services
                                      while enjoying attractive benefits and
                                      incentives. Keep an eye on our latest
                                      rewards offerings to take advantage of
                                      these valuable benefits!
                                    </small>{" "}
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I earn points?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2">
                                      Earning points with Legal Remit is
                                      effortless and straightforward. Every time
                                      you send money using our platform, you
                                      automatically earn points. Our unique
                                      points-earning system rewards you based on
                                      the amount you send, and you also receive
                                      bonus points on each transaction.
                                    </small>
                                    <small className="text-black my-2 d-block">
                                      All the points you earn are collected in
                                      your Legal Remit wallet, providing a
                                      convenient way to track and manage your
                                      points balance. As your points accumulate,
                                      you can later redeem them for cash value,
                                      allowing you to get additional benefits
                                      from using our services.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      Please keep in mind that there may be
                                      specific requirements for redeeming
                                      points. You'll need to have a certain
                                      number of points to be eligible for
                                      redemption, and there might be a cap on
                                      the maximum amount that can be used or a
                                      minimum number of points required for
                                      redemption.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      With our points-earning system, you not
                                      only benefit from our reliable money
                                      transfer services but also receive
                                      additional rewards that add value to your
                                      transactions. Start sending money with
                                      Legal Remit and enjoy the perks of our
                                      points-earning program today!
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I change my password?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      To change your password in the Legal Remit
                                      mobile app, follow these steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Open the Legal Remit app on your
                                          mobile device.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Click on your profile icon, typically
                                          located on the left-hand side of the
                                          screen.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Go to the settings section.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Look for the "Change Password" option
                                          within the settings.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Click on the "Change Password" option
                                          to initiate the process.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Follow the steps provided to change
                                          your password.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Provide the required information and
                                          follow any additional verification
                                          steps as needed.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2 mb-1 d-block">
                                      Once you have completed all the necessary
                                      steps, your password will be successfully
                                      changed, and you can now log in with your
                                      new password for enhanced security.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      If You use the web app,
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      Please note that, if you wish to change
                                      your existing password, you are required
                                      to provide your current password while
                                      changing the password. If you do not have
                                      your existing password, you reset your
                                      password by clicking on forget password.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I reset my password?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      To reset your password, follow these
                                      simple steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Click on the "Forget Password" option,
                                          typically available on the login page
                                          or within the settings section.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Enter the email address that is
                                          registered with your Legal Remit
                                          account.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Once you submit your email address,
                                          you will receive a password reset link
                                          in your inbox.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Click on the password reset link to be
                                          redirected to the password reset page.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          On the password reset page, set up
                                          your new password by entering it in
                                          the provided field.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Confirm the new password by
                                          re-entering it in the confirmation
                                          field.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Save your changes, and your password
                                          will be successfully reset.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2 mb-1 d-block">
                                      Now you can log in to your Legal Remit
                                      account using the new password you just
                                      set up. This process ensures the security
                                      of your account and allows you to regain
                                      access if you forget your previous
                                      password or need to create a new one for
                                      any reason.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  If you are using the web app, follow these
                                  steps to reset your password:
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          log in to your Legal Remit account on
                                          the web app.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Go to your profile section, typically
                                          located in the top right corner of the
                                          page.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Within your profile, locate the
                                          "Password" section and click on the
                                          "Edit" option.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          To change your password using your
                                          current password, enter your current
                                          password in the required field and
                                          then input your new desired password
                                          in the appropriate field. Confirm the
                                          new password by re-entering it.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          If you don't remember your current
                                          password, you can click on the "Forgot
                                          Password" option.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          If you click on the "Forgot Password"
                                          option, you will be prompted to enter
                                          your registered email address.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          You will then receive a password reset
                                          link via email. Click on the link and
                                          set up your new password.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      By following these steps, you can either
                                      change your password using your current
                                      password or reset it through the "Forgot
                                      Password" option. This ensures that you
                                      can easily manage your password and
                                      maintain the security of your Legal Remit
                                      account.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  I am overseas now. How can I get the OTP
                                  verification code?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      If you are overseas and need to register
                                      your account with Legal Remit, you will
                                      require the OTP (One-Time Password)
                                      verification, which is mandatory for
                                      account registration. To get the OTP
                                      verification code, follow these steps:
                                    </small>
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Contact Customer Service: Reach out to
                                          Legal Remit's customer service team
                                          through the available channels (such
                                          as phone, email, or chat support).
                                          They will be able to assist you with
                                          the OTP verification process. .
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Provide Necessary Information: During
                                          your conversation with the customer
                                          service representative, be prepared to
                                          provide the necessary information to
                                          verify your identity. This may include
                                          details like your name, registered
                                          email address, and other relevant
                                          account information.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Receive the OTP: Once your identity is
                                          verified, the customer service team
                                          will initiate the OTP verification
                                          process. You will receive the OTP via
                                          the preferred contact method (usually
                                          through SMS or email).
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Enter the OTP: After receiving the
                                          OTP, enter it into the designated area
                                          provided during the account
                                          registration process.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Complete Account Registration: With
                                          the OTP successfully entered, you can
                                          complete the registration of your
                                          account with Legal Remit and begin
                                          using our services.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      By contacting customer service, they will
                                      guide you through the OTP verification
                                      process, ensuring that you can register
                                      your account securely and conveniently,
                                      even while overseas.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I change my email address?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      To change your email address, follow these
                                      steps:
                                    </small>
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Go to your profile section, typically
                                          located on the platform's dashboard or
                                          settings page. .
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Click on the "Edit Profile" option to
                                          make changes to your account
                                          information.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Within the edit profile section,
                                          locate the field for your current
                                          email address.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Replace your current email address
                                          with the new email address you wish to
                                          use.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Click on the "Update" or "Save" button
                                          to apply the changes to your account.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Once you have changed your email
                                          address, a verification link will be
                                          sent to your new email address.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Check your inbox for the verification
                                          email and click on the verification
                                          link to confirm and validate your new
                                          email address.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-justify font-italic responsiveFontLarge first text-black pt-2">
                                      Please note that verifying your new email
                                      address is mandatory to complete the
                                      change. If you are unable to verify the
                                      newly entered email address, it won’t be
                                      changed and the old email address will
                                      remain in your account. By following these
                                      steps, you can easily update your email
                                      address and ensure that your account
                                      information is up-to-date and secure.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I edit my KYC?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      To edit your KYC details, please follow
                                      these steps:
                                    </small>
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Go to your profile section on the
                                          Legal Remit platform.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          In the profile section, you will find
                                          your account information, including
                                          your KYC details, ID details, and the
                                          list of uploaded documents.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Look for the "Edit" option located
                                          just on top of your KYC information
                                          and click on it.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Make the necessary changes to your KYC
                                          details as required.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          After making the updates, click on the
                                          "Update" or "Save" button to save the
                                          changes.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Please note that after editing your
                                          KYC details, you will need to undergo
                                          KYC re-verification to ensure the
                                          updated information is valid and
                                          compliant.
                                        </small>
                                      </li>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How Can I upload my new identification
                                  document (IDs)?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      To edit your identification documents,
                                      please follow these steps:
                                    </small>
                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Go to your profile section on the
                                          Legal Remit platform.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          In the profile section, you will find
                                          your account information, including
                                          your KYC details, ID details, and the
                                          list of uploaded documents.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Look for the "Edit" option located
                                          just on top of your ID details
                                          information and click on it.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Make the necessary changes to your ID
                                          details as required.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          After making the updates, click on the
                                          "Update" or "Save" button to save the
                                          changes.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Please note that after editing your ID
                                          details, you will need to undergo KYC
                                          re-verification to ensure the updated
                                          information is valid and compliant.
                                        </small>
                                      </li>
                                    </ol>
                                    <small className="text-justify responsiveFontLarge first text-black pt-2 font-italic">
                                      Please note that your ID must be valid and
                                      accepted in Australia. We accept only
                                      international passports and Australian
                                      Driving licenses. Your ID details will be
                                      updated only after approval from our
                                      compliance team.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What information is not editable in Legal
                                  Remit?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      In Legal Remit, there are certain pieces
                                      of information that are not editable from
                                      the user's profile after KYC is submitted.
                                      These include:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Name: Once your KYC is submitted and
                                          verified, your name cannot be changed
                                          from your user profile. If any errors
                                          occur with your name, it's best to
                                          contact the support team for a more
                                          convenient resolution.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Date of Birth: Similar to the name,
                                          the date of birth provided during the
                                          KYC process is not editable from your
                                          user profile after submission.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2 mb-1 d-block">
                                      While most other information in your
                                      profile can be edited or updated, it is
                                      essential to follow the terms and
                                      conditions and policies of the company,
                                      especially with regards to compliance.
                                      Ensuring that your information is accurate
                                      and up-to-date is crucial for the security
                                      and smooth processing of your
                                      transactions. If you have any questions or
                                      need to update other details, always refer
                                      to the company's policies and contact
                                      support if necessary.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I change my address in Legal Remit?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      To change your address in Legal Remit,
                                      follow these steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Go to your profile section on the
                                          Legal Remit platform.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Look for the "Edit KYC" or "Edit
                                          Profile" option and click on it to
                                          make changes to your KYC information.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Locate the section for your address
                                          details and update it with the new
                                          address you wish to use.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          After making the necessary changes,
                                          click on the "Update" or "Save" button
                                          to save the updated address.
                                        </small>
                                      </li>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  I recently moved to a new address, how can I
                                  update it to Legal Remit?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      To update your new address in Legal Remit,
                                      follow these steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Log in to your Legal Remit account.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Go to your profile section on the
                                          Legal Remit platform.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Look for the "Edit KYC" or "Edit
                                          Profile" option and click on it to
                                          make changes to your KYC information.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Locate the section for your address
                                          details and update it with your new
                                          address.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          After making the necessary changes,
                                          click on the "Update" or "Save" button
                                          to save the updated address.
                                        </small>
                                      </li>
                                    </ol>
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      {" "}
                                      By following these steps, your new address
                                      will be updated in Legal Remit. Keeping
                                      your address information accurate and
                                      up-to-date is important for the smooth
                                      processing of your transactions and
                                      compliance with regulatory requirements.
                                      If you have any issues or questions, don't
                                      hesitate to reach out to Legal Remit's
                                      customer support for further assistance.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Why does my residential address need to be up
                                  to date?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      Keeping your residential address up to
                                      date is crucial for several reasons:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Compliance with Regulations: Financial
                                          institutions, including Legal Remit,
                                          are required to comply with various
                                          regulations and anti-money laundering
                                          (AML) laws. Updating your residential
                                          address helps Legal Remit ensure
                                          compliance with these regulations and
                                          prevents any potential legal issues.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Identity Verification: Your
                                          residential address is a critical part
                                          of the KYC (Know Your Customer)
                                          process. Verifying your identity
                                          through a valid and up-to-date address
                                          helps ensure that you are the rightful
                                          account holder and prevents fraudulent
                                          activities.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Preventing Financial Crimes: Providing
                                          an accurate residential address helps
                                          in minimizing financial crimes such as
                                          identity theft, money laundering, and
                                          fraud. It enables Legal Remit to
                                          verify the authenticity of the
                                          customer and protect both you and the
                                          platform from potential financial
                                          scams.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Effective Communication: Having your
                                          current residential address on file
                                          allows Legal Remit to send important
                                          communications, updates, and
                                          notifications to the right address,
                                          ensuring that you stay informed about
                                          your transactions and account status.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Ensuring Smooth Transactions: A
                                          correct address helps prevent delays
                                          or rejections in transactions that may
                                          occur due to address mismatch issues.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2 mb-1 d-block">
                                      By keeping your residential address up to
                                      date, you play an active role in promoting
                                      a secure and compliant financial
                                      environment while safeguarding your own
                                      interests from potential financial crimes
                                      and unauthorized access to your account.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I remove my recipients from the list?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 d-block">
                                      To remove a recipient from your list,
                                      follow these steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Go to the list of recipients in your
                                          Legal Remit account.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Find the recipient you wish to remove
                                          from the list.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Click on the option to delete or
                                          remove the recipient from the list.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2 mb-1 d-block font-italic">
                                      Please note that once you delete a
                                      recipient from your list, it is not
                                      possible to recover the recipient's
                                      details. If you need to send money to the
                                      same recipient again in the future, you
                                      will have to add their details again.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block font-italic">
                                      Before deleting a recipient, ensure that
                                      you no longer need their information for
                                      future transactions, as it cannot be
                                      retrieved once deleted. By keeping your
                                      list of recipients organized, you can
                                      easily manage and send money to the right
                                      recipients whenever needed.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I delete my transaction?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black medium my-2 d-block">
                                      To delete a transaction from your Legal
                                      Remit account, follow these steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          log in to the Legal Remit platform
                                          using either the mobile app or the web
                                          app.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Navigate to the transaction page where
                                          you can view a list of your
                                          transactions.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Find the specific transaction that you
                                          wish to delete.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Click on the "More" or "Options"
                                          button associated with that
                                          transaction.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Select the "Delete" option from the
                                          menu.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Confirm the deletion when prompted.
                                        </small>
                                      </li>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I edit my recipient’s details on the
                                  active transaction?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black medium my-2 d-block">
                                      To edit your recipient's details on an
                                      active transaction, follow these steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          If the "Edit" option is available on
                                          your active transaction, click on the
                                          "Edit Recipient Details" on the
                                          transaction page.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Make the necessary changes to your
                                          recipient's details as required.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Confirm the changes and proceed.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      {" "}
                                      However, if the "Edit" option is not
                                      available for the active transaction, you
                                      can still update the recipient's details
                                      by reaching out to Legal Remit via SMS,
                                      chat, call, or email. Inform our friendly
                                      staff about the changes you wish to make,
                                      and they will assist you in making the
                                      necessary updates.
                                    </small>
                                    <br />
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      {" "}
                                      Ensuring the accuracy of recipient details
                                      on your transactions is essential for the
                                      smooth processing of your remittances. If
                                      you encounter any issues or need
                                      assistance with updating recipient
                                      information, don't hesitate to contact
                                      Legal Remit's customer support for prompt
                                      and helpful service.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  I forgot my Login PIN. How can I change it?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      If you forget your Login PIN on Legal
                                      Remit, follow these steps to change it:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Click on the "Forget PIN" option on
                                          the login page.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          You will be prompted to log in to your
                                          account using your registered email or
                                          phone number and password.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Once logged in, the system will ask
                                          you to set up a new Login PIN for your
                                          account.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Choose a new PIN according to the
                                          security requirements (usually a
                                          combination of numbers).
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Confirm the new PIN and save the
                                          changes.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2 mb-1 d-block">
                                      By following these steps, you can
                                      successfully change your forgotten Login
                                      PIN and regain access to your Legal Remit
                                      account with a new secure PIN. Remember to
                                      choose a PIN that is easy for you to
                                      remember but difficult for others to guess
                                      to enhance the security of your account.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      48.) I don’t want to get a notification
                                      due to some privacy reason, how can I opt
                                      out?
                                    </small>

                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      To opt out of certain notifications in
                                      Legal Remit due to privacy reasons, follow
                                      these steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          log in to your Legal Remit account on
                                          the platform.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Go to the "Settings" section.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Look for the "Notification Settings
                                          and Preferences" option.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Make the desired changes to your
                                          notification preferences. You can
                                          choose to disable specific types of
                                          notifications that you do not wish to
                                          receive.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Save your changes, and the new
                                          notification settings will be applied
                                          to your account.
                                        </small>
                                      </li>
                                    </ol>
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      {" "}
                                      However, it's essential to note that while
                                      you can customize certain notification
                                      preferences, some notifications are
                                      mandatory and cannot be opted out of. For
                                      example:
                                    </small>
                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      {" "}
                                      - Notifications related to invalid
                                      recipient details: If the recipient's
                                      information you provided is invalid or
                                      incorrect, Legal Remit will notify you to
                                      ensure accurate transactions.
                                    </small>

                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      {" "}
                                      - Requests for further information: If
                                      Legal Remit requires additional
                                      information from you for compliance
                                      purposes, such as the source of funds,
                                      purpose of transfer, or declaration of
                                      funds, you may receive notifications
                                      asking for this information.
                                    </small>

                                    <br />
                                    <small className="text-justify responsiveFontLarge first text-black pt-2">
                                      {" "}
                                      These mandatory notifications are
                                      essential for the security and compliance
                                      of transactions on the platform. By
                                      customizing your notification preferences,
                                      you can strike a balance between receiving
                                      relevant updates and maintaining your
                                      privacy preferences.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I track my transaction status?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      To track your transaction status on Legal
                                      Remit, follow these steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Visit the transaction page on the
                                          Legal Remit platform. This page
                                          typically provides a list of all your
                                          past and current transactions.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Look for the specific transaction that
                                          you want to track and click on it.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          You will see real-time updates on the
                                          transaction, including details of each
                                          step of the transaction journey.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Legal Remit may also send you
                                          important tracking information through
                                          the chat feature to keep you updated
                                          on the progress of your transaction.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2 mb-1 d-block">
                                      By visiting the transaction page, you can
                                      easily track the status of your
                                      transactions and stay informed about each
                                      step in the process. This transparency and
                                      real-time updates help you monitor the
                                      progress of your remittance and ensure
                                      that your money reaches its intended
                                      recipient smoothly and securely.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I get an invoice/receipt for my
                                  transaction?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      To get an invoice or receipt for your
                                      transaction on Legal Remit, follow these
                                      steps:
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Visit the transaction page on the
                                          Legal Remit platform.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Find the specific transaction for
                                          which you need the invoice or receipt.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Look for an option to download or view
                                          the invoice on the transaction page.
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Click on the download or view option
                                          to access the invoice or receipt for
                                          the selected transaction.
                                        </small>
                                      </li>

                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          The invoice will contain details such
                                          as transaction amount, exchange rate,
                                          fees, date, recipient information, and
                                          other relevant transaction details.
                                        </small>
                                      </li>
                                    </ol>

                                    <small className="text-black my-2 mb-1 d-block">
                                      By following these steps, you can easily
                                      obtain the invoice or receipt for your
                                      transaction on Legal Remit. The invoice
                                      provides a detailed breakdown of the
                                      transaction and serves as a record of the
                                      financial transaction for your reference
                                      and records.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How much money can I send at a time?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      You can send up to A$10,000 per
                                      transaction on Legal Remit. In a single
                                      day, you can send a total of A$30,000 by
                                      splitting it into three separate
                                      transactions. There is no specific minimum
                                      transaction amount.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      Please note that transaction limits may
                                      vary depending on the recipient country
                                      and the chosen delivery method. For the
                                      most accurate and up-to-date information,
                                      kindly check Legal Remit's platform for
                                      the latest transaction limits.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      Always comply with the applicable
                                      transaction limits to ensure a smooth and
                                      secure remittance process with Legal
                                      Remit.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Can I deposit cash in Legal Remit?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      As an online-based remittance service,
                                      Legal Remit does not accept physical cash
                                      deposits. All transactions and fund
                                      transfers are conducted electronically
                                      through the platform. Customers can use
                                      various online payment methods, such as
                                      PayTo, bank transfers, credit/debit cards,
                                      or digital wallets, to send money using
                                      Legal Remit.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      By being an online-only platform, Legal
                                      Remit ensures convenience, security, and
                                      efficient transfer of funds for its
                                      customers without the need for physical
                                      cash handling. This digital approach
                                      allows for faster and more transparent
                                      transactions, making it easy for users to
                                      send money to their desired recipients
                                      across different countries.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Why can't I pay Legal Remit in cash?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      Legal Remit does not accept cash payments
                                      as part of its Anti-Money Laundering and
                                      Counter-Terrorism Financing (AML/CTF)
                                      policy. This policy is designed to prevent
                                      and detect financial crimes such as money
                                      laundering, terrorism financing, and other
                                      illicit activities that can be associated
                                      with physical cash transactions.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      By not accepting cash payments, Legal
                                      Remit aims to enhance the security and
                                      integrity of its remittance services.
                                      Electronic transactions allow for better
                                      traceability and transparency, making it
                                      easier to monitor and comply with
                                      regulatory requirements.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      The AML/CTF policy ensures that Legal
                                      Remit follows strict compliance measures
                                      to protect its customers and the financial
                                      system from potential risks associated
                                      with cash-based transactions. Customers
                                      can use various online payment methods,
                                      which provide a secure and efficient way
                                      to transfer funds through Legal Remit's
                                      platform.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What is the transaction number?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      The transaction number, also known as the
                                      transaction ID or reference number, is a
                                      unique identifier assigned to each
                                      transaction made with Legal Remit. It
                                      serves as a tracking code that helps
                                      identify and locate a specific transaction
                                      in the system.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      Whenever you send money through Legal
                                      Remit, a unique transaction number is
                                      generated for that particular transaction.
                                      This number is important for reference
                                      purposes and can be used when contacting
                                      Legal Remit's customer support or when
                                      inquiring about the status or details of a
                                      specific transaction.
                                    </small>
                                    <small className="text-black my-2 mb-1 d-block">
                                      By quoting the transaction number, you can
                                      easily and accurately communicate with
                                      Legal Remit's support team regarding any
                                      questions, concerns, or updates related to
                                      your transaction. It helps ensure smooth
                                      communication and efficient resolution of
                                      any transaction-related matters.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What is the Customer number?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      The customer number is a unique identifier
                                      assigned to each user during their
                                      registration with Legal Remit. It is
                                      generated at the time of account creation
                                      and remains the same for the entire
                                      duration of your use of the platform.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      The customer number serves as a reference
                                      code that helps Legal Remit identify and
                                      distinguish individual users in their
                                      system. It allows the company to access
                                      your account information and transaction
                                      history quickly and accurately when
                                      providing customer support or addressing
                                      any queries or concerns you may have.
                                    </small>
                                    <br />
                                    <small className="text-black my-2 mb-1 d-block">
                                      By using the customer number, Legal Remit
                                      can assist you more efficiently and
                                      provide personalized services based on
                                      your account profile and transaction
                                      activity. It also adds an additional layer
                                      of security and ensures that your account
                                      information is managed and accessed
                                      securely.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What is Control Number
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      The control number is a unique transaction
                                      reference number used in remittance
                                      services, especially for bank deposit
                                      transactions and cash pick-up options. It
                                      serves as a crucial identifier for the
                                      transaction and helps facilitate the
                                      successful transfer of funds to the
                                      recipient.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      For bank deposit transactions: When you
                                      initiate a remittance through Legal Remit,
                                      a control number is generated for the
                                      transaction. This control number is often
                                      used by the recipient's bank to identify
                                      and credit the funds to the correct
                                      account. It acts as a transaction
                                      reference in the recipient's bank
                                      statement, allowing them to easily
                                      identify the incoming funds.
                                    </small>
                                    <br />
                                    <small className="text-black my-2 mb-1 d-block">
                                      For cash pick-up transactions: The control
                                      number is also used for cash pick-up
                                      options. When you send money to be
                                      collected in cash by the recipient, you
                                      will receive a control number. The
                                      recipient must present this control number
                                      along with a valid form of identification
                                      to collect the cash at the designated cash
                                      pick-up location.
                                    </small>
                                    <br />
                                    <small className="text-black my-2 mb-1 d-block font-italic">
                                      Important: The control number is a vital
                                      element of the remittance process,
                                      ensuring the accurate and secure transfer
                                      of funds to the recipient's bank account
                                      or for cash pick-up. It helps streamline
                                      the transaction and provides both the
                                      sender and recipient with a clear
                                      reference for the payment.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What is the transaction PIN to pick up cash?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      Transaction PIN is the same as Control No.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      When you initiate a cash pick-up
                                      transaction with Legal Remit, a Control
                                      Number (Transaction PIN) is generated. The
                                      recipient must present this Control Number
                                      along with their valid form of
                                      identification documents (IDs) at the
                                      designated cash pick-up partner location
                                      to receive the cash.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can my recipient receive transaction PIN/
                                  Control No?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      As a sender, you are responsible for
                                      providing the Control Number/Transaction
                                      PIN to your recipient for cash pick-up.
                                      Legal Remit does not directly communicate
                                      with recipients regarding the Control
                                      Number/Transaction PIN. It is a sensitive
                                      piece of information that should be shared
                                      by you with your recipient.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      When you send money through Legal Remit
                                      for a cash pick-up transaction, you will
                                      receive the Control Number/Transaction
                                      PIN. It is your responsibility to forward
                                      this number, along with any other
                                      necessary guidance, to your recipient so
                                      they can successfully collect the cash at
                                      the designated pick-up location.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      Remember to securely share the Control
                                      Number/Transaction PIN with your recipient
                                      and ensure they have the necessary
                                      identification documents required for cash
                                      pick-up. This ensures a smooth and secure
                                      process for your recipient to receive the
                                      funds.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Does Legal Remit send control numbers to
                                  recipients?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      No. Legal Remit does not communicate
                                      directly with recipients regarding the
                                      Control Number/Transaction PIN or any
                                      potential money transfer to them. The
                                      sender is solely responsible for providing
                                      the necessary information to the
                                      recipient, including the Control
                                      Number/Transaction PIN, along with any
                                      other details required for the
                                      transaction.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      When you initiate a transaction with Legal
                                      Remit, you will receive the Control
                                      Number/Transaction PIN, and it is your
                                      responsibility to securely share this
                                      informanfnftion with your recipient. This
                                      ensures that the recipient can
                                      successfully collect the funds through
                                      cash pick-up or any other designated
                                      delivery method.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      Legal Remit prioritizes the security and
                                      privacy of its users, and as such, any
                                      communication related to the transaction
                                      and its details must be handled by the
                                      sender directly with the recipient. By
                                      taking charge of this communication, you
                                      can help ensure that the funds are
                                      received by the intended recipient
                                      securely and efficiently.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What is a remittance statement?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      A remittance statement is a detailed view
                                      of your transaction history, summarizing
                                      all the remittance transactions you have
                                      made through Legal Remit. It provides an
                                      overview of the funds you have sent, the
                                      recipients, transaction dates, amounts,
                                      and other relevant details.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      The remittance statement allows you to
                                      track and review your past transactions
                                      conveniently in one place. It provides a
                                      comprehensive record of your remittance
                                      activity, helping you keep track of your
                                      financial transactions and monitor your
                                      remittance history.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      With the remittance statement, you can
                                      easily access information about your
                                      previous remittances, which is useful for
                                      financial record-keeping, reconciliation,
                                      and reference purposes. It offers a
                                      transparent and organized view of your
                                      remittance activity, making it easier for
                                      you to manage your financial transactions
                                      through Legal Remit.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How long we can get access to such statements?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      You can access and view your remittance
                                      statements on Legal Remit for up to 2
                                      years. These statements provide a detailed
                                      history of your past transactions during
                                      this period, allowing you to review your
                                      remittance activity conveniently.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      If you need access to statements that are
                                      older than two years, you can request them
                                      from Legal Remit's support team. They will
                                      assist you in retrieving the required
                                      statements for your reference or
                                      record-keeping purposes.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      By offering access to transaction history
                                      for up to 2 years, Legal Remit ensures
                                      that users can easily track and manage
                                      their remittance activity within a
                                      reasonable timeframe. For older records,
                                      reaching out to the support team helps
                                      ensure that you can obtain the necessary
                                      information when needed.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How can I delete my account in Legal Remit?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      As per Legal Remit's compliance and
                                      regulatory requirements, there is no
                                      provision to delete your account. Your
                                      account must be kept registered in the
                                      system for a specific time frame to meet
                                      these obligations.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      If your account remains inactive for an
                                      extended period, typically more than 7
                                      years, it may be moved to an archive
                                      status. During this time, the account
                                      remains in the system for historical and
                                      record-keeping purposes but is no longer
                                      active for transactions or remittance
                                      activity.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      While you cannot delete your account,
                                      keeping it active ensures you can continue
                                      using Legal Remit's services when needed.
                                      If you have any concerns or inquiries
                                      regarding your account, you can always
                                      reach out to Legal Remit's support team
                                      for assistance.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What is the difference between the Express and
                                  Normal KYC verification methods?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      The main difference between Express and
                                      Normal KYC verification methods lies in
                                      the process and timing of verification:
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      1. Express Processing: <br />
                                      - In the Express processing method, Legal
                                      Remit uses Optical Character Recognition
                                      (OCR) technology to capture the details
                                      from your ID automatically.
                                      <br />
                                      - After the OCR processing, you are
                                      required to take a couple of selfies to
                                      verify your ID's image and your live
                                      image.
                                      <br />
                                      - The system then verifies the validity of
                                      your details using Document Verification
                                      Services (DVS).
                                      <br />
                                      - This entire process is completed in less
                                      than 1 minute, providing a quick and
                                      efficient verification method.
                                      <br />
                                      - It is recommended to perform this
                                      process in a well-lit area to ensure clear
                                      reading of your documents.
                                      <br />
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      2. Normal Processing:
                                      <br />
                                      - The Normal processing method is a manual
                                      KYC verification process.
                                      <br />
                                      - You need to manually fill out your ID
                                      details and upload a copy of your ID for
                                      verification.
                                      <br />
                                      - Unlike the Express method, your KYC
                                      verification occurs only at the time of
                                      your transaction.
                                      <br />
                                      - However, you can still initiate
                                      transactions without completing the KYC
                                      verification.
                                      <br />
                                      - Once Legal Remit receives your
                                      transaction, the system will start
                                      verifying your document details from DVS.
                                      <br />
                                      - After successful verification, the
                                      payment against your transaction will be
                                      processed.
                                      <br />
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      In summary, the Express Processing method
                                      offers a faster and more automated
                                      verification process using OCR technology,
                                      while the Normal Processing method
                                      requires manual submission of ID details
                                      and verification occurs only during the
                                      transaction process. Both methods comply
                                      with the necessary KYC requirements for
                                      secure and compliant remittance services.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What types of documents are required for
                                  business account registration?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      To register as a business user, you are
                                      required to provide the following
                                      documents
                                    </small>

                                    <ol className="nested-ordered-list ps-2">
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Business registration documents
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Business bank statement
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        {" "}
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          Tax Return of your business
                                        </small>
                                      </li>
                                      <li className="my-2">
                                        <small className="text-justify responsiveFontLarge first text-black pt-2">
                                          {" "}
                                          Structure of the business
                                        </small>
                                      </li>
                                    </ol>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  How long it may take for the KYC verification
                                  for the business users?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      The KYC verification process for business
                                      users may take a few hours if all the
                                      required documents are provided promptly.
                                      Legal Remit has specific procedures in
                                      place for onboarding businesses to ensure
                                      compliance with regulatory requirements
                                      and to enhance security.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      If you have completed the necessary steps
                                      and submitted all the required documents,
                                      the verification process is typically
                                      completed within a few hours. However, if
                                      you have an urgent need to send money and
                                      require quicker verification, you can
                                      contact Legal Remit's 24/7 support team
                                      for assistance.
                                    </small>
                                    <br />
                                    <small className="text-black my-2 mb-1 d-block">
                                      In urgent scenarios, the support team can
                                      expedite the verification process, and in
                                      many cases, the verification can be
                                      completed in less than 30 minutes. This
                                      way, you can proceed with your business
                                      transactions promptly and efficiently.
                                    </small>

                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      By offering expedited verification for
                                      urgent situations, Legal Remit ensures
                                      that business users can use the platform
                                      for their remittance needs in a timely
                                      manner, while still adhering to necessary
                                      compliance and security measures.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  What is the transaction limit for the business
                                  transaction?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2 mb-1 d-block">
                                      The transaction limit for business
                                      transactions on Legal Remit is typically
                                      higher compared to individual
                                      transactions. As a business user, you have
                                      the flexibility to send larger sums of
                                      money through the platform.
                                    </small>
                                    <br />

                                    <small className="text-black my-2 mb-1 d-block">
                                      However, to comply with regulatory
                                      requirements and ensure transparency,
                                      business users are required to provide
                                      additional information, such as the
                                      purpose of the transfer, the source of
                                      funds, and relevant invoices for the
                                      payments. This is a standard practice in
                                      the remittance industry to prevent money
                                      laundering and ensure the legitimacy of
                                      business transactions.
                                    </small>

                                    <small className="text-black my-2 mb-1 d-block">
                                      By providing the necessary documentation
                                      and details, business users can enjoy the
                                      convenience of higher transaction limits
                                      on Legal Remit, allowing them to
                                      efficiently manage their business
                                      remittances while maintaining compliance
                                      with the applicable regulations.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>

                            <Accordion className={classes.accordion}>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                className={classes.summary}
                              >
                                <Typography className={classes.summaryContent}>
                                  Countries supported for business transactions?
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails className={classes.details}>
                                <Typography>
                                  <div className="secFaq">
                                    <small className="text-black my-2  d-block">
                                      Currently, Legal Remit supports business
                                      transactions from Australia to Nepal only.
                                      For all other countries, the platform
                                      supports individual transactions but does
                                      not offer business transactions.
                                    </small>
                                    <br />

                                    <small className="text-black my-2  d-block">
                                      This means that businesses in Australia
                                      and Nepal can use Legal Remit for their
                                      remittance needs, including sending (from
                                      Australia) and receiving (to Nepal) money
                                      for business purposes. However, for
                                      businesses in other countries, Legal Remit
                                      currently supports individual transactions
                                      only.
                                    </small>
                                  </div>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                            {/* end of 2nd section  */}
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="link2">
                          <SecurityPage></SecurityPage>
                        </Tab.Pane>
                        <Tab.Pane eventKey="link3">
                          <WhereIsMoney />
                        </Tab.Pane>
                        <Tab.Pane eventKey="link4">
                          <YourAccount />
                        </Tab.Pane>
                        <Tab.Pane eventKey="link5">
                          <BankTransfer />
                        </Tab.Pane>
                        <Tab.Pane eventKey="link6">
                          <WalletTopup />
                        </Tab.Pane>
                        <Tab.Pane eventKey="link7">
                          <CashPickup />
                        </Tab.Pane>
                        <Tab.Pane eventKey="link8">
                          <UtilityBillPayment />
                        </Tab.Pane>
                        <Tab.Pane eventKey="link9">
                          <div>
                            {/* <Container className="bg-white mt-5 rounded-4 mb-5"> */}
                            <div className="innerAbtPage px-0 py-0">
                              <h2 className="bolder purpleText text-start">
                                Fraud Awareness
                              </h2>

                              <ul className="round ps-0">
                                <li className="text-justify  responsiveFontLarge first text-black fs-6 mt-4 ">
                                  Never transfer money to a stranger. Know who
                                  you are dealing with. A money transfer is like
                                  cash.
                                </li>
                              </ul>

                              <ul className="round ps-0">
                                <li className="text-black text-justify responsiveFontLarge first fs-6  ">
                                  Never send money in the following situations
                                </li>
                              </ul>
                              <ul className="round ps-5">
                                <li className="text-justify responsiveFontLarge first text-black fs-6  ">
                                  To make a charity donation or to pay an
                                  internet merchant for supplies during a
                                  pandemic, natural disaster, or other crisis.
                                </li>
                                <li className="text-justify responsiveFontLarge first text-black fs-6  ">
                                  To receive money (examples: lottery winnings,
                                  prize, job offer or loan).
                                </li>
                                <li className="text-justify responsiveFontLarge first text-black fs-6  ">
                                  To pay a government taxing authority or the
                                  police.
                                </li>
                                <li className="text-justify responsiveFontLarge first text-black fs-6  ">
                                  To buy a car, puppy, another unique or
                                  high-value item, or to make an apartment
                                  deposit
                                </li>
                              </ul>

                              <ul className="round ps-0">
                                <li className="text-justify responsiveFontLarge first text-black fs-6  ">
                                  Never send money without checking out the
                                  story. Reach out to that friend or family
                                  member you heard is in need first.
                                </li>
                              </ul>

                              <ul className="round ps-0">
                                <li className="text-justify responsiveFontLarge first text-black fs-6  ">
                                  If it sounds too good to be true, it probably
                                  is.
                                </li>
                              </ul>

                              <ul className="round ps-0">
                                <li className="text-justify responsiveFontLarge first text-black fs-6  ">
                                  Never give your transaction reference number
                                  to anyone other than the person you intend to
                                  receive the money. Sellers and telemarketers
                                  can't take money transfer payments from people
                                  in the US for something they're selling
                                  through telemarketing. If you've lost money to
                                  a scam via Legal Remit, call Legal Remit at
                                  0435022761 or 0419850130.
                                </li>
                              </ul>
                            </div>
                            {/* </Container> */}
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="link10">
                          <PartnerAndAffiliate />
                        </Tab.Pane>
                        <Tab.Pane eventKey="link11">
                          <ExchangeRateAndServiceCharge />
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Col>
            </Row>
          </div>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
