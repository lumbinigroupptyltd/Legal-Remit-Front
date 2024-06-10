import React, { useState } from "react";
import "../../../assets/assets/scss/pages/HowItWorks.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import one from "../../../assets/images/oneLeave.png";
import two from "../../../assets/images/twoLeave.png";
import three from "../../../assets/images/threeLeave.png";
import four from "../../../assets/images/fourLeave.png";
import five from "../../../assets/images/fiveLeave.png";
import six from "../../../assets/images/sixLeave.png";
import seven from "../../../assets/images/howitvector.svg";
import { Grid } from "@mui/material";

export default function HowItWorks({ children }) {
  return (
    <>
      <section className="bg-white how pt-1 mt-1">
        <Container>
          <Row className="text-center my-4">
            <h2 className="responsiveFontLargeHeading abtBefore purpleText bolder pb-2">
              How it work
            </h2>
            <h1 className="responsiveFontLargeMedium  text-center d-inline-block justify-content-center m-auto">
              How to send money with LegalRemit
            </h1>
            {/* <span className="responsiveFontLarge blackShade mt-4 text-center d-flex justify-content-center m-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum quis ipsum ac dui sagittis{" "}
              </span> */}
          </Row>
          <div className="leavesMain my-5 d-flex">
            <div className="left-side">
              <div className="my-3 leavesChild1">
                <div className="media mright">
                  <div className="media-body">
                    <h4 className="media-heading text-black lh-base">
                      Sign Up for your account / Create a FREE account
                    </h4>
                    <div className="my-3">
                      You should create your profile using your name, email, and
                      mobile number. Email and mobile numbers must be verified
                      to continue using the verification link and OTP sent to
                      your mobile number. The name must be matched with the name
                      on your ID.
                    </div>
                  </div>
                  <div className="media-right">
                    {" "}
                    <a>
                      {" "}
                      <img
                        alt=""
                        className="media-object moneySendRespo"
                        src={one}
                      />{" "}
                    </a>{" "}
                  </div>
                </div>
              </div>

              <div className="my-3 leavesChild1">
                <div className="media mright">
                  <div className="media-body">
                    <h4 className="media-heading text-black">
                      Enter your KYC details:
                    </h4>
                    <div className="my-3">
                      Once you verify your mobile with OTP, we ask you to fill
                      in your KYC details. We need basic information about your
                      current residential address (Including house number and
                      postcode), your nationality, and occupation. Please click
                      on save and next to move to the next step.
                    </div>
                  </div>
                  <div className="media-right">
                    {" "}
                    <a>
                      {" "}
                      <img
                        alt=""
                        className="media-object moneySendRespo"
                        src={two}
                      />{" "}
                    </a>{" "}
                  </div>
                </div>
              </div>

              <div className="my-3 leavesChild1">
                <div className="media mright">
                  <div className="media-body">
                    <h4 className="media-heading text-black">
                      Choose ID Upload Method:
                    </h4>
                    <div className="my-3">
                      We require you to provide your ID details and ID copy in
                      this step. We only accept two types of IDs at the moment.
                      Passport (any country), and Australian Driver's license.
                      You should choose the type of ID from the given list, and
                      provide an ID number, Its expiry date, and issuing
                      authority. Once you complete this step, review all the
                      details and submit your KYC.
                    </div>
                  </div>
                  <div className="media-right">
                    {" "}
                    <a>
                      {" "}
                      <img
                        alt=""
                        className="media-object moneySendRespo"
                        src={three}
                      />{" "}
                    </a>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="my-3 leavesChild1 d-flex"
              style={{ lg: {width: "100px"}, md: {width: "100px"}, sm: {width: "100px"}, xs: {width: "100px"} }}
            >
              <img src={seven} width={"100%"} className="d-flex" alt="description" />
            </div>
            <div className="right-side">
              <div className="my-3 leavesChild1">
                <div className="media mleft">
                  <div className="media-left">
                    {" "}
                    <a>
                      {" "}
                      <img
                        alt=""
                        className="media-object moneySendRespo"
                        src={four}
                      />{" "}
                    </a>{" "}
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading text-black">Send Money:</h4>
                    <div className="my-3">
                      After completion of the registration, you are ready to
                      send money now, Choose country you wnat to send money,
                      enter amount details and along with the recipient details
                      and delivery method.
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="my-3 leavesChild1">
                <div className="media mleft">
                  <div className="media-left">
                    {" "}
                    <a>
                      {" "}
                      <img
                        alt=""
                        className="media-object moneySendRespo"
                        src={five}
                      />{" "}
                    </a>{" "}
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading text-black">
                      Pay to Legal Remit:
                    </h4>
                    <div className="my-3">
                      After completing other send noney steps, choose your
                      preferred payment method to make payments to Legal Remit.
                      You can choose from the available lists. Please note that,
                      POLI is no longer supported.
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="my-3 leavesChild1">
                <div className="media mleft">
                  <div className="media-left">
                    {" "}
                    <a>
                      {" "}
                      <img
                        alt=""
                        className="media-object moneySendRespo"
                        src={six}
                      />{" "}
                    </a>{" "}
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading text-black">
                      Get updates on your transaction:
                    </h4>
                    <div className="my-3">
                      You will receive different types updates regarding your
                      transaction. You can simply visit on the transaction page
                      to see tracking status of your transaction in every step.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
