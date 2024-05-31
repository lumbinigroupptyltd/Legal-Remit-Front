import React from "react";
import "../../../assets/assets/scss/pages/InternationalMoney.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import mobileVector from "../../../assets/images/newGIF.gif";
import { Fade } from 'react-awesome-reveal';


export default function InternationalMoney({ children }) {
  return (
    <>
      <div className="main-top">
        
        <section className="responsiveMainForMobile mainInternational bg-white">
          <Container className="">
            <Row className="align-items-center  respoInter">
            <Col className="col-lg-6">
               <Fade left duration={2000}> 
                <Image src={mobileVector} alt="gdf" className="img-fluid" />
                </Fade>
              </Col>
           
           
            
            <Col className="col-lg-6 pb-5 ">
            <Fade right duration={2000} className="">
                <h1 className="responsiveFontLargeHeading rspoH1">
                International Money Transfer Made Easy with Our New App!
                </h1>
                <p className="blackShade mt-4 mb-4 rspoP fs-6 lh-lg text-justify">
                Discover the convenience and simplicity of our new app that revolutionizes international money transfers. With just a few taps, you can securely send money across borders, right from the palm of your hand. Say goodbye to long queues and complex processes. Download our app now and experience a seamless, reliable, and efficient way to transfer funds globally.
                </p>  

                <div className=" ">
                  <div className="playStoreBtn d-flex mt-5 pt-4 pointer resposocial">
                  <img
                    className="maut_button-appstore-logo pointer"
                    src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png"
                    alt="Download on The App Store"
                  />
                  <img
                    className="maut_button-appstore-logo ms-3 pointer"
                    src="https://lh3.googleusercontent.com/cjsqrWQKJQp9RFO7-hJ9AfpKzbUb_Y84vXfjlP0iRHBvladwAfXih984olktDhPnFqyZ0nu9A5jvFwOEQPXzv7hr3ce3QVsLN8kQ2Ao=s0"
                    alt="Get it on Google Play"
                  />
                  </div>
                </div>
                </Fade>
              </Col>
           
            
            </Row>
          </Container>
        </section>
        
      </div>
    </>
  );
}
