import React from "react";
import  Container  from 'react-bootstrap/Container';
import  Row  from 'react-bootstrap/Row';
import  Col  from 'react-bootstrap/Col';
import  Image  from 'react-bootstrap/Image';
import '../../../assets/assets/scss/pages/AboutSection.css'
import aboutVector from '../../../assets/images/aboutVector.svg'
import _File_Invoice_ from '../../../assets/images/icon _File_Invoice_.svg'
import CoininHand from '../../../assets/images/CoininHand.svg'
import { Zoom, Fade, Bounce } from 'react-awesome-reveal';

export default function AboutSection({ children }) {
    return(
        <>
            <section className="aboutMain bg-white pb-5">
                <Container>
                    <Row className="chartRespo responsiveMainForMobile">
                        <Col className="col-lg-6 p-0 m-0 mb-5">
                        <Fade left duration={2000}> 
                        <Zoom duration={2000}>
                            <Image src={aboutVector} className="img-fluid" />
                            </Zoom>
                        </Fade>
                          
                        
                        </Col>
                        <Col className="col-lg-6">
                        <Bounce right duration={2000}>
                        <div className="innerAboutMain">
                                <h2 className="paddingZero responsiveFontLargeHeading abtBefore purpleText bolder">The first company to</h2>
                                {/* <h3 className="paddingZero medium responsiveFontLargeMedium">The first company to introduce</h3> */}
                                {/* <p className="paddingZero blackShade responsiveFontLarge">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum quis ipsum ac dui sagittis scelerisque vel et dui.</p> */}
                            </div>
                            <div className="innerAboutSecond mt-4">
                                 <div className="mainImage d-flex mt-1 align-items-lg-start">
                                    <Image src={CoininHand} alt="dghd" className="img-fluid mb-5 pb-3 moneySendRespo"></Image>
                                    <div className="d-flex flex-column marginLeftUtility">
                                        <span className="text-black pb-2 fs-5 medium responsiveFontLargeMedium" >Real-Time Payment</span>
                                        <p className="blackShade responsiveFontLarge fs-6 text-justify">In 2019, we proudly introduced our cutting-edge technology that enables real-time remittance payments from Australia to Nepal. This innovative solution revolutionizes the remittance process, ensuring swift and secure transactions for our valued customers.</p>
                                    </div>
                                 </div>
                                 <div className="mainImage d-flex mt-1 align-items-lg-start">
                                    <Image src={_File_Invoice_} alt="dghd" width={70} height={86} className=" mb-5 pb-3 moneySendRespo"></Image>
                                    <div className="d-flex flex-column marginLeftUtility1">
                                        <span className="text-black pb-2 fs-5 medium responsiveFontLargeMedium" >Utility Bill Payments</span>
                                        <p className="blackShade responsiveFontLarge fs-6 text-justify">We are delighted to announce the introduction of utility bill payments in Nepal from Australia through our remittance channel. This convenient service allows individuals in Australia to easily and securely pay their utility bills in Nepal. With our streamlined process, customers can now efficiently manage their financial obligations from the comfort of their own homes, ensuring a hassle-free experience</p>
                                    </div>
                                 </div>
                            </div>
                        </Bounce>
                         
                        </Col>
                    </Row>
                </Container>
            </section>
        </>

    )
}