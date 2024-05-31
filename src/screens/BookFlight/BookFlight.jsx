import React from "react";
import "./BookFlight.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import coming from '../../assets/images/comingsoon.svg'


export default function BookFlight() {
  const options2 = {
    loop: true,
    margin: 10,
    items: 2,
    autoplay: true,
    nav: false,
    dots: false,
  };
  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage p-5">
            <h2 className="bolder purpleText text-center">Book Flight</h2>

            <Row>
              <Col className="col-lg-12 d-flex mt-5 d-block m-auto justify-content-center py-5 my-5">
                  <img src={coming} className="img-fluid py-5 my-5"/>
              </Col>
            </Row>       
          </div>
        </Container>
      <Footer></Footer>
      </section>
    </>
  );
}
