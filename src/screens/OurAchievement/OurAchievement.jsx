import React from "react";
import "./OurAchievement.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row, Tab, Nav, Col } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import flight from "../../assets/images/flight.svg";
import lumbi from "../../assets/images/Lumbini logo 1.svg";
import achieve from "../../assets/images/timeline.png";
import Timeline from "../Helpers/TimelinePage/TimelinePage";

export default function OurAchievement() {
  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage pt-4">
            <h2 className="bolder purpleText text-center responsiveFontLargeHeading">Our Achievement</h2>

            <p className="responsiveFontLarge text-justify first text-black pt-5 fs-6">
            Since the operation of Legal Remit, we have processed over 300 million Australian dollars to Nepal from over fifty thousand customers to send money to two hundred countries. Pinoring the real-time payments from Australia to Nepal with the adaptation of cutting edge technology made Legal Remit popular among the community people who require to send money overseas.
            </p>

            <p className="responsiveFontLarge text-justify first text-black pt-2 fs-6">
            Introduction of utility bill payment and insurance premium, Legal Remit become the first company to introduce such a service in Nepal.Since the operation of Legal Remit, we have processed over 300 million Australian dollars to Nepal from over fifty thousand customers to send money to two hundred countries.Here are some milestones achieved by our company so far:
            </p>

            <div className="row mt-5">
              <div className="col-lg-12 d-flex respoChildFooter">
                <div className="col-lg-2">
                <img src={achieve} className="img-fluid"/>
                </div>
                <div className="col-lg-10">
                  <div className="box-main mb-5 pb-3">
                    <div className="mileBox">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="boxMile mileTop py-4 px-4 d-flex flex-column justify-content-center">
                              <span className="text-black my-2 bolder responsiveFontLargeMedium fs-5">Legal Remit launched</span>
                              <p className="normal  pBox responsiveFontLarge fs-6">
                              This is the memorable date when Legal Remit was launched with a huge joy.
                              </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="boxMile py-4 mileTop px-4 d-flex flex-column justify-content-center">
                              <span className="text-black my-2 bolder responsiveFontLargeMedium fs-5">Real-time money transfer</span>
                              <p className="normal  pBox responsiveFontLarge fs-6">
                              This is the memorable date when Legal Remit was launched with a huge joy.
                              </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="box-main mb-5 pb-3">
                    <div className="mileBox">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="boxMile py-4 px-4 d-flex flex-column justify-content-center">
                              <span className="text-black my-2 bolder responsiveFontLargeMedium fs-5">Serve over 35000+ customers</span>
                              <p className="normal  pBox responsiveFontLarge fs-6">
                              Lorem ipsum dolor sit amet, consecteturdo eiusmod tempor incididunt labore dolore. 
                              </p>
                          </div>
                        </div>
                        <div className="col-lg-6">

                        </div>  
                      </div>
                    </div>
                  </div>
                  <div className="box-main mb-5 pb-3">
                    <div className="mileBox">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="boxMile py-4 px-4 d-flex flex-column justify-content-center">
                              <span className="text-black my-2 bolder responsiveFontLargeMedium fs-5">Transfer over 500 million safely and securely</span>
                              <p className="normal  pBox responsiveFontLarge fs-6">
                              Lorem ipsum dolor sit amet, consecteturdo eiusmod tempor incididunt labore dolore. 
                              </p>
                          </div>
                        </div>
                        <div className="col-lg-6">

                        </div>  
                      </div>
                    </div>
                  </div>
                  <div className="box-main">
                    <div className="mileBox">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="boxMile py-4 px-4 d-flex flex-column justify-content-center">
                              <span className="text-black my-2 bolder responsiveFontLargeMedium fs-5">Added 200+ countries</span>
                              <p className="normal  pBox responsiveFontLarge fs-6">
                              Lorem ipsum dolor sit amet, consecteturdo eiusmod tempor incididunt labore dolore. 
                              </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="boxMile py-4 mileTop px-4 d-flex flex-column justify-content-center">
                              <span className="text-black my-2 bolder responsiveFontLargeMedium fs-5">Utility bill payment</span>
                              <p className="normal  pBox responsiveFontLarge fs-6">
                              Lorem ipsum dolor sit amet, consecteturdo eiusmod tempor incididunt labore dolore. 
                              </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      <Footer></Footer>
      </section>
    </>
  );
}
