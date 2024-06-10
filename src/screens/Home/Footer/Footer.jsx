import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../../../assets/assets/scss/pages/Footer.css";
import ListGroup from "react-bootstrap/ListGroup";
import whiteLogo from "../../../assets/images/Footer/whiteLogo.svg";
import dialSvg from "../../../assets/images/Footer/dial.svg";
import Slider from "react-slick"; // Import Slick Slider
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CommonConstants } from "../../../Constants/common.constants";
import { Grid, List, ListItem, Typography } from "@mui/material";

const Footer = ({ children }) => {
  const [contactData, setContactData] = useState([]);
  const options2 = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
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

  const navigate = useNavigate();
  const location = useLocation();

  const handleClickLumbiniGroup = () => {
    //navigating to Home
    navigate("/lumbini-group");
    window.scrollTo(0, 0);
  };

  const handleClickAboutUs = () => {
    //navigating to Home
    navigate("/about-us");
    window.scrollTo(0, 0);
  };

  const handleClickContactUs = () => {
    //navigating to Home
    navigate("/contact-us");
    window.scrollTo(0, 0);
  };

  const legals = () => {
    //navigating to Home
    navigate("/legal");
    window.scrollTo(0, 0);
  };

  const WhatWeDo = () => {
    //navigating to Home
    navigate("/what-we-do");
    window.scrollTo(0, 0);
  };

  const p2b = () => {
    //navigating to Home
    navigate("/what-we-do");
    window.scrollTo(0, 2000);
  };

  const excServ = () => {
    //navigating to Home
    navigate("/utilitybillpayment");
    window.scrollTo(0, 1500);
  };

  const ReferalRewards = () => {
    //navigating to Home
    navigate("/referal-rewards");
    window.scrollTo(0, 0);
  };

  const careersPage = () => {
    //navigating to Home
    navigate("/careers");
    window.scrollTo(0, 0);
  };

  const handleClickAchievement = () => {
    //navigating to Home
    navigate("/achievement");
    window.scrollTo(0, 0);
  };

  const handleClickHelpResources = () => {
    //navigating to Home
    navigate("/help-resources");
    window.scrollTo(0, 0);
  };

  const handleClickRefunds = () => {
    const checkLogin = localStorage.getItem("rollID");
    if (checkLogin) {
      navigate("/refunds-page");
      window.scrollTo(0, 0);
    } else {
      navigate("/login");
      window.scrollTo(0, 0);
    }
    //navigating to Home
  };

  const handleClickComplaints = () => {
    //navigating to Home
    navigate("/complaints");
    window.scrollTo(0, 0);
  };

  const handleClickReportFraud = () => {
    //navigating to Home
    navigate("/report-fraud");
    window.scrollTo(0, 0);
  };

  const handleClickNotice = () => {
    //navigating to Home
    navigate("/notice");
    window.scrollTo(0, 0);
  };

  const handleClickSecurity = () => {
    //navigating to Home
    navigate("/security");
    window.scrollTo(0, 0);
  };

  const handleClickWhereisMoney = () => {
    //navigating to Home
    navigate("/whereismoney");
    window.scrollTo(0, 0);
  };
  const handleClickAgents = () => {
    //navigating to Home
    navigate("/agents-page");
    window.scrollTo(0, 0);
  };
  const handleClickBecomeAnAgent = () => {
    //navigating to Home
    navigate("/becomeagent");
    window.scrollTo(0, 0);
  };

  const handleClickUtilityBill = () => {
    //navigating to Home
    navigate("/utilitybillpayment");
    window.scrollTo(0, 0);
  };

  const handleClickFAQ = () => {
    //navigating to Home
    navigate("/faq");
    window.scrollTo(0, 0);
  };

  const handleClickFraudAwareness = () => {
    //navigating to Home
    navigate("/fraudawareness");
    window.scrollTo(0, 0);
  };

  const compliancePage = () => {
    //navigating to Home
    navigate("/compliancesection");
    window.scrollTo(0, 0);
  };

  const blogsPage = () => {
    //navigating to Home
    navigate("/blogspage");
    window.scrollTo(0, 0);
  };

  const handleClickPartnerAndAffiliate = () => {
    //navigating to Home
    navigate("/partnerandaffiliate");
    window.scrollTo(0, 0);
  };
  const handleClickremittanceservices = () => {
    //navigating to Home
    navigate("/remittanceservices");
    window.scrollTo(0, 0);
  };

  const handleClickYourAccount = () => {
    //navigating to Home
    navigate("/youraccount");
    window.scrollTo(0, 0);
  };
  const handleClickBankTransfer = () => {
    //navigating to Home
    navigate("/banktransfer");
    window.scrollTo(0, 0);
  };

  const handleClickWalletTopup = () => {
    navigate("/wallettopup");
    window.scrollTo(0, 0);
  };

  const handleClickCashPickup = () => {
    navigate("/cashpickup");
    window.scrollTo(0, 0);
  };

  const handleClickSignup = () => {
    //navigating to Home
    navigate("/signup");
    window.scrollTo(0, 0);
  };

  const reviewPage = () => {
    //navigating to Home
    navigate("/review-page");
    window.scrollTo(0, 0);
  };

  const handleClickTermsCondition = () => {
    //navigating to Home
    navigate("/termsandconditions");
    window.scrollTo(0, 0);
  };

  const handleClickPrivacyPolicy = () => {
    //navigating to Home
    navigate("/privacy-policy");
    window.scrollTo(0, 0);
  };

  const handleClickExcAndService = () => {
    //navigating to Home
    navigate("/exchangerate-servicecharge");
    window.scrollTo(0, 0);
  };

  const handleClickCookiePolicy = () => {
    //navigating to Home
    navigate("/cookies-policy");
    window.scrollTo(0, 0);
  };

  const handleClickSiteMap = () => {
    //navigating to Home
    navigate("/sitemap");
    window.scrollTo(0, 0);
  };

  const handleClickNews = () => {
    // Navigating to Home
    navigate("/");

    // Scroll to the Latest News section
    const latestNewsSection = document.getElementById("latestNews");
    if (latestNewsSection) {
      window.scrollTo(0, latestNewsSection.offsetTop);
    }
  };

  const isHomePage = location.pathname === "/";

  useEffect(() => {
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
      <section
        className={`childFooterMain py-5 responsiveMainForMobile paddingFooter ${
          isHomePage ? "partner-main" : ""
        }`}
      >
        <Container className="subFooter text-white responsiveMainForMobile">
          <Container>
            <Row className="responsiveMainForMobile">
           
            </Row>
          </Container>
        </Container>

        <Container className="subFooter text-white responsiveMainForMobile">
          <Container>
            <Row className="responsiveMainForMobile">
              <Grid my={2} sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h6">Transfer Money To</Typography>
              </Grid>
              <Grid container pb={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <List
                    sx={{
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <ListItem>Afghanistan</ListItem>
                    <ListItem>Albania</ListItem>
                    <ListItem>Algeria</ListItem>
                    <ListItem>American Samoa</ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <List
                    sx={{
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <ListItem>Angola</ListItem>
                    <ListItem>Andorra</ListItem>
                    <ListItem>Antigua And Barbuda</ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <List
                    sx={{
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <ListItem>Argentina</ListItem>
                    <ListItem>Armenia</ListItem>
                    <ListItem>Aruba</ListItem>
                    <ListItem>Austria</ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <List
                    sx={{
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <ListItem>Azerbaijan</ListItem>
                    <ListItem>Bahrain</ListItem>
                    <ListItem>Bangladesh</ListItem>
                    <ListItem>Barbados</ListItem>
                  </List>
                </Grid>
              </Grid>
            </Row>
          </Container>
        </Container>
      </section>

      <section className="footer-main responsiveMainForMobile">
        <Container>
          <Row className="paddingFooter respoChildFooter">
            <Col className="col-lg-5">
              <p className="bolder upparcase text-white">Company</p>
              <hr className="text-white hrFooter"></hr>
              <Row>
                <Col className="col-lg-6">
                  <ListGroup className="text-white border-0 w-auto">
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickAboutUs}
                    >
                      About Us
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickLumbiniGroup}
                    >
                      Lumbini Group
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickAchievement}
                    >
                      Our Achievement
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={WhatWeDo}
                    >
                      What we do
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={ReferalRewards}
                    >
                      Referral and Rewards
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={p2b}
                    >
                      B2B Payments
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={p2b}
                    >
                      P2B Payments
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col className="col-lg-6">
                  <ListGroup className="text-white border-0 w-auto">
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={careersPage}
                    >
                      Careers- we’re hiring
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickNotice}
                    >
                      Notice
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickremittanceservices}
                    >
                      Service
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickNews}
                    >
                      News
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={blogsPage}
                    >
                      Blog
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={reviewPage}
                    >
                      Reviews
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickBecomeAnAgent}
                    >
                      Become an Agent
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
            <Col className="col-lg-5 paddingFooter  footerMargin">
              <p className="bolder upparcase text-white uppercase">
                help & resources
              </p>
              <hr className="text-white hrFooter"></hr>
              <Row>
                <Col className="col-lg-6">
                  <ListGroup className="text-white border-0 w-auto">
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickSignup}
                    >
                      Create Account
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickFAQ}
                    >
                      FAQ{" "}
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickSecurity}
                    >
                      Security
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickWhereisMoney}
                    >
                      Where is my money
                    </ListGroup.Item>

                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickYourAccount}
                    >
                      Your Account
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickBankTransfer}
                    >
                      Bank Transfer
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickWalletTopup}
                    >
                      Wallet Topup
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickCashPickup}
                    >
                      Cash Pickup
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickUtilityBill}
                    >
                      Utility Bill Payment
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col className="col-lg-6">
                  <ListGroup className="text-white border-0 w-auto">
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickPartnerAndAffiliate}
                    >
                      Affiliate and partnership
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickExcAndService}
                    >
                      Exchange rates and Service charge
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickFraudAwareness}
                    >
                      Fraud Awareness
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickReportFraud}
                    >
                      Report a Fraud
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickRefunds}
                    >
                      Refund request
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickComplaints}
                    >
                      Complaint
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickHelpResources}
                    >
                      Help{" "}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
            <Col className="col-lg-2 footerMargin">
              <p className="bolder upparcase text-white upparcase medium">
                legal
              </p>
              <hr className="text-white hrFooter"></hr>
              <Row>
                <Col className="col-lg-12">
                  <ListGroup className="text-white border-0 w-auto">
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickTermsCondition}
                    >
                      Terms and Conditions
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickPrivacyPolicy}
                    >
                      Privacy Policy
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickCookiePolicy}
                    >
                      Cookies Policy
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={handleClickSiteMap}
                    >
                      Sitemap
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="text-white mb-0 pb-0 ps-0 pointer"
                      onClick={compliancePage}
                    >
                      Compliance
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="col-lg-5">
              <div>
                <div>
                  <img src={whiteLogo} className="img-fluid" alt="df" />
                </div>
                <div className="col-lg-12 ps-0">
                  <div
                    className="col-lg-7 p-0
                  "
                  >
                    <Button
                      className="darkBlueBackground touchBTn py-3 ms-0 border-0 text-white  "
                      onClick={handleClickContactUs}
                    >
                      <img src={dialSvg} className="img-fluid" alt="ff" />
                      &nbsp;&nbsp; &nbsp;&nbsp;Get in touch
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="col-lg-7">
              <Row>
                <div className="">
                  <Slider className="owl-theme " {...options2}>
                    {contactData?.map((contact, index) => (
                      <div key={index} className="">
                        <div className="itemFooter  mm py-4 pt-0 mx-3">
                          <ListGroup className="text-white border-0 d-flex col-lg-12">
                            <ListGroup.Item className="text-black mb-0 pb-0 ps-0">
                              <h4 className="text-white bolder upparcase text-center">
                                {contact?.location}
                              </h4>
                            </ListGroup.Item>
                            <div className="d-block m-auto">
                              <ListGroup.Item className="text-white mb-0 pb-0 ps-0 d-flex">
                                <div className="responsiveFontLarge contactD  text-white pb-2 d-flex">
                                  <i
                                    className="fa fa-map-marker text-white mt-1 mx-3"
                                    aria-hidden="true"
                                  ></i>
                                  {contact?.address}
                                </div>
                              </ListGroup.Item>
                              <ListGroup.Item className="purpleText mb-0 pb-0 ps-0 d-flex">
                                <div className="responsiveFontLarge contactD  text-white pb-2 d-flex">
                                  <i
                                    className="fa fa-envelope text-white mt-1 mx-3"
                                    aria-hidden="true"
                                  ></i>
                                  {contact?.email}
                                </div>
                              </ListGroup.Item>
                              <ListGroup.Item className="text-white mb-0 pb-0 ps-0 d-flex">
                                <div className="responsiveFontLarge contactD text-white pb-2 d-flex">
                                  <i
                                    className="fa fa-phone text-white mt-1 mx-3"
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
                    ))}
                  </Slider>
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col>
              <p className="responsiveFontLarge text-white text-justify fs-6">
                Legalremit is authorised by the Financial Conduct Authority
                under the Electronic Money Regulations 2011, Firm Reference
                900507, for the issuing of electronic money. Wise works with a
                local bank partner to offer the service in India with the
                approval of the Reserve Bank of India.
              </p>
            </Col>
          </Row>
          <hr className="w-100 mw-100 text-white mainInner"></hr>
          <div className="paddingFooter innerFooterDflex">
            <div className="">
              <p className="text-white responsiveFontLarge fs-6">
                ©2023 Legalremit. All rights reserved.
              </p>
            </div>
            <div className="">
              <p
                className="text-white responsiveFontLarge fs-6 pointer"
                onClick={handleClickTermsCondition}
              >
                Policies and conditions
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Footer;
