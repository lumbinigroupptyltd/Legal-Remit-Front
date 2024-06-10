import React from "react";
import "../../../assets/assets/scss/pages/Services.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import one from "../../../../src/assets/images/cashWithdraw.svg";
import two from "../../../../src/assets/images/24hOURS.svg";
import three from "../../../../src/assets/images/dollarFlower.svg";
import four from "../../../../src/assets/images/easyToUSE.svg";
import five from "../../../../src/assets/images/SMILE.svg";
import six from "../../../../src/assets/images/antivirus.svg";
import { Roll } from 'react-awesome-reveal';

export default function Services({ children }) {
  return (
    <>
      <section className="bg-white responsiveMainForMobile">
        <Container className="text-center">
          <Row className="text-center">
            <div className="slide-in-right-element" left duration={2000}>
              <h2 className="responsiveFontLargeHeading abtBefore purpleText bolder pb-2">Why Choose Us</h2>
              {/* <h1 className="customerRes responsiveFontLargeMedium text-center d-inline-block justify-content-center m-auto">
                Over 50,000+ customers have chosen LegalRemit, here’s why:
              </h1> */}
            </div>

          </Row>
          <Row className=" pt-5 d-flex respoChildFooter">
            <Col className="col-lg-6">
              <Roll left duration={2000}>
              <div className="d-flex ">
                  <div className="d-flex WhyChooseUsAlignment  pb-5 ">
                    <h4 className="h4Service responsiveFontLargeMedium medium ms-4  m-0 me-4">24 / 7 Service</h4>
                    {/* <Card.Text>
                  </Card.Text> */}
                    <Card.Text className=" me-4">
                      <small className="smallService responsiveFontLarge  responsiveFontLarge blackShade ">
                      Embrace unparalleled convenience with our 24/7 service, offering round-the-clock assistance for all your needs, ensuring reliability and accessibility at any time.
                      </small>
                    </Card.Text>
                  </div>
                  <div className="justify-content-end me-2">
                    <Image src={two} className="moneySendRespo" alt="bjb"></Image>
                  </div>
                </div>
                <div className="d-flex ">
                  <div className="d-flex WhyChooseUsAlignment pb-5 ">
                    <h4 className="h4Service responsiveFontLargeMedium medium ms-4  m-0 me-4">Blazing Fast Service</h4>
                    {/* <Card.Text>
                  </Card.Text> */}
                    <Card.Text className=" me-4">
                      <small className="smallService responsiveFontLarge  responsiveFontLarge blackShade ">
                      Experience lightning-speed efficiency: over 99% of transactions are completed in real-time or under 5 minutes*.
                      </small>
                    </Card.Text>
                  </div>
                  <div className="justify-content-end me-2">
                    <Image src={one} className="moneySendRespo" alt="bjb"></Image>
                  </div>
                </div>
        

                <div className="d-flex mt-4">
                  <div className="d-flex  pb-5 WhyChooseUsAlignment">
                    <h4 className="h4Service responsiveFontLargeMedium medium ms-4  m-0 me-4">Low Cost</h4>
                    {/* <Card.Text>
                  </Card.Text> */}
                    <Card.Text className=" me-4">
                      <small className="smallService responsiveFontLarge  responsiveFontLarge blackShade ">
                      Save up to 90% on every transfer with Legal Remit's unbeatable low-cost pricing*.
                      </small>
                    </Card.Text>
                  </div>
                  <div className="justify-content-end me-2">
                    <Image src={three} className="moneySendRespo" alt="bjb"></Image>
                  </div>
                </div>
              </Roll>

            </Col>
            <Col className="col-lg-6">
              <Roll right duration={2000}>
                <div className="d-flex flex-row-reverse ">
                  <div className="d-flex flex-column justify-content-center pb-5 align-items-start text-start">
                    <h4 className="h4Service responsiveFontLargeMedium medium ms-4  m-0">Easy To Use</h4>
                    {/* <Card.Text>
                  </Card.Text> */}
                    <Card.Text className=" ms-4">
                      <small className="smallService responsiveFontLarge  responsiveFontLarge blackShade ">
                      Effortless simplicity - our intuitive, user-friendly platform makes transactions smooth and hassle-free.
                      </small>
                    </Card.Text>
                  </div>
                  <div className="justify-content-end">
                    <Image src={four} className="moneySendRespo" alt="bjb"></Image>
                  </div>
                </div>
                <br/>
                <br/>


                <div className="d-flex flex-row-reverse mt-2">
                  <div className="d-flex flex-column justify-content-center pb-5 align-items-start text-start">
                    {/* <Card.Text> */}
                    <h4 className="h4Service responsiveFontLargeMedium medium ms-4  m-0">
                      Amazing Customer Experience
                    </h4>
                    {/* <Card.Text>
                  </Card.Text> */}
                    <Card.Text className=" ms-4">
                      <small className="smallService responsiveFontLarge  responsiveFontLarge blackShade ">
                      Indulge in an amazing customer experience. Enjoy personalized service and prompt assistance with guaranteed satisfaction*.
                      </small>
                    </Card.Text>
                  </div>
                  <div className="justify-content-end me-2">
                    <Image src={five} className="moneySendRespo" alt="bjb"></Image>
                  </div>
                </div>

                <div className="d-flex flex-row-reverse ">
                  <div className="d-flex flex-column justify-content-center pb-5 align-items-start text-start">
                    {/* <Card.Text> */}
                    <h4 className="h4Service responsiveFontLargeMedium medium ms-4  m-0">Safe and Secure</h4>
                    {/* </Card.Text> */}
                    <Card.Text className=" ms-4">
                      <small className="smallService responsiveFontLarge  responsiveFontLarge blackShade ">
                      Rest assured with our unwavering commitment to safety and compliance. Your security is our top priority for a worry-free experience.
                      </small>
                    </Card.Text>
                  </div>
                  <div className="justify-content-end me-2">
                    <Image src={six} className="moneySendRespo" alt="bjb"></Image>
                  </div>
                </div>
              </Roll>

            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
