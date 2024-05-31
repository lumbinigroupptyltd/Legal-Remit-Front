import React, { useState } from "react";
import { Container, Row, Tab, Nav, Col } from "react-bootstrap";
import "./Legal.scss";
import Footer from "../Home/Footer/Footer";
import NavBar from "../Home/Navbar/Navbar";
import { makeStyles } from '@mui/material';
import TermsAndCondition from "../TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import CookiesPolicy from "../CookiesPolicy/CookiesPolicy";
import ComplianceSection from "../ComplianceSection/ComplianceSection";

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
    color:'grey'
  },
  details: {
    color:'rgba(0, 0, 0, 0.69)'
  },
}));

export default function Legal() {
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
            <h2 className="bolder purpleText text-center legalText">Legal</h2>

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
                            className="purpleText bolder navPill  py-3 my-2 "
                          >
                            Terms and Conditions
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link2"
                            className="purpleText bolder navPill py-3 my-2"
                          >
                            Privacy Policy
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navPill">
                          <Nav.Link
                            eventKey="link3"
                            className="purpleText bolder navPill  py-3 my-2 "
                          >
                       Cookies Policy
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="link4"
                            className="purpleText bolder navPill py-3 my-2"
                          >
                         Sitemap
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="navPill">
                          <Nav.Link
                            eventKey="link5"
                            className="purpleText bolder navPill  py-3 my-2 "
                          >
                          Compliance
                          </Nav.Link>
                        </Nav.Item>
                       
                      </Nav>
                    </Col>

                    <Col sm={9}>
                      <Tab.Content>
                        <Tab.Pane eventKey="link1">
                            <TermsAndCondition/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="link2">
                          <PrivacyPolicy/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="link3">
                          <CookiesPolicy/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="link4">Sitemap</Tab.Pane>
                        <Tab.Pane eventKey="link5"><ComplianceSection/></Tab.Pane>
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
