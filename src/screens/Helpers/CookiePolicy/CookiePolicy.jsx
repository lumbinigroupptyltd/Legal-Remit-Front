import React, { Component, useEffect, useState } from "react";
import "./CookiePolicy.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import cookieImage from "../../../assets/images/CookieSVG.svg";
import close from "../../../assets/images/Closes.svg";
import { Button } from "react-bootstrap";
import { Slide } from 'react-awesome-reveal';
import Modal from "react-bootstrap/Modal";

export default function CookiePolicy(props) {
  const [show, setShow2] = useState(false);
  const [showPopCookies, setshowPopCookies] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  return (
    <Slide right>
      <Row className={`d-flex justify-content-end ${showPopCookies===true ? "d-none" : "d-block"}`}>
        <Col className="col-lg-4 py-3 px-4  d-none">
          <div className="">
            <div className="cookieHeaderMain">
              <div className="d-flex justify-content-between align-items-start">
                <img src={cookieImage} className="img-fluid"></img>
                <img src={close} className="img-fluid pointer" onClick={()=>{setshowPopCookies(true)}}></img>
              </div>
              <div className="heading-row text-black normal pt-4">
                By clicking “Accept all cookies”, you agree Stack Exchange can
                store cookies on your device and disclose information in
                accordance with our Cookie Policy.
              </div>
              <div className="d-flex py-3 justify-content-between ">
                <Button className="purpleBackground col-lg-5 text-white border-0 ms-0 pointer" onClick={()=>{setshowPopCookies(true)}}>
                  Accept all cookies
                </Button>
                <Button
                  onClick={handleShow2}
                  style={{ border: "1px solid black !important" }}
                  className=" col-lg-5 text-black custom bg-transparent border-1 border-dark pointer"
                >
                  Customize settings
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose2} dialogClassName="modal-10w">
        <Modal.Header closeButton className="header-10w1">
          <Modal.Title>
            <img src={cookieImage} className="img-fluid" /> &nbsp;&nbsp;{" "}
            <small className="responsiveFontLarge  text-black bolder">Cookie Policy</small>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="body-10w">
          <section className="inner-body-cookie pt-3">
            <small className="responsiveFontLarge  text-black">
              By clicking “Accept all cookies”, you agree Stack Exchange can
              store cookies on your device and disclose information in
              accordance with our Cookie Policy.
            </small>{" "}
            <br></br>
            <br></br>
            <small>
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start"
              >
                <small className="responsiveFontLarge  text-black text-end bolder">
                  Strictly Necessary
                </small>
                <div class="switchI ">
                  <input type="checkbox" id="toggleAll4" />
                  <label for="toggleAll4"></label>
                </div>
              </div>
            </small>
            <small className="responsiveFontLarge  text-black">
              These cookies are necessary for our website to function properly
              and cannot be switched off in our systems. They are usually only
              set in response to actions made by you which amount to a request
              for services, such as setting your privacy preferences, logging in
              or filling in forms or where they’re essential to provide you with
              a service you have requested. You cannot opt-out of these cookies.
              You can set your browser to block or alert you about these
              cookies, but if you do, some parts of the site will not then work.
              These cookies do not store any personally identifiable
              information.
            </small>
            <br></br>
            <br></br>
            <small>
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start"
              >
                <small className="responsiveFontLarge  text-black text-end bolder">
                  Performance Cookies
                </small>

                <div class="switchI ">
                  <input type="checkbox" id="toggleAll5" />
                  <label for="toggleAll5"></label>
                </div>
              </div>
            </small>
            <small className="responsiveFontLarge  text-black">
              These cookies allow us to count visits and traffic sources so we
              can measure and improve the performance of our site. They help us
              to know which pages are the most and least popular and see how
              visitors move around the site, which helps us optimize your
              experience. All information these cookies collect is aggregated
              and therefore anonymous. If you do not allow these cookies we will
              not be able to use your data in this way.
              <a>Cookie details</a>
            </small>
            <br></br>
            <br></br>
            <small>
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start"
              >
                <small className="responsiveFontLarge  text-black text-end bolder">
                   Cookies
                </small>

                <div class="switchI ">
                  <input type="checkbox" id="toggleAll5" />
                  <label for="toggleAll5"></label>
                </div>
              </div>
            </small>
            <small className="responsiveFontLarge  text-black">
              These cookies allow us to count visits and traffic sources so we
              can measure and improve the performance of our site. They help us
              to know which pages are the most and least popular and see how
              visitors move around the site, which helps us optimize your
              experience. All information these cookies collect is aggregated
              and therefore anonymous. If you do not allow these cookies we will
              not be able to use your data in this way.
              <a>Cookie details</a>
            </small>
          </section>
        </Modal.Body>
        <Modal.Footer className="headerw-10w">
          <div className="d-flex py-3 justify-content-end ">
            <Button className="purpleBackground col-lg-6 text-white border-0 ms-0 pointer">
              Accept all cookies
            </Button>
            <Button
              onClick={handleShow2}
              style={{ border: "1px solid black !important" }}
              className=" col-lg-6 text-black custom bg-transparent border-1 border-dark pointer"
            >
              Accept selected
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Slide>
  );
}
