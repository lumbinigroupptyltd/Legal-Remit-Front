import React from "react";
import "./SiteMapPage.css";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";

export default function SiteMapPage() {
  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage p-5">
            <h2 className="bolder purpleText text-center">Sitemap</h2>
            <div className="row mt-5">
              <div className="col-lg-12">
                <ul className="round11">
                  <li className="commonSiteMap bluecolor  medium text-justify responsiveFontLarge first commonSiteMap   ">
                    Company
                  </li>
                </ul>
                <ul className="roundBorder11 ps-5">
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    About Us
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Lumbini Group
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Our Achievement
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    What we do
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Referral and Rewards
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    B2B Payments
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    P2B Payments
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Careers- we’re hiring
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Notice
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    News
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Blog
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Reviews
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Become an Agent
                  </li>
                </ul>
              </div>
            </div>
              <div className="row">
              <div className="col-lg-12">
                <ul className="round11">
                  <li className="commonSiteMap bluecolor  medium text-justify responsiveFontLarge first commonSiteMap   ">
                    Help & Resources
                  </li>
                </ul>
                <ul className="roundBorder11 ps-5">
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Create Account
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    FAQ
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Where is my money
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Security
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Where is my money
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Your Account
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Bank Transfer
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Wallet Topup
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Cash Pickup
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Utility Bill Payment
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Affilliate and partnership
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Exchange rates and service charge
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Fraud Awareness
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Report a Fraud
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Refund request
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Complaint
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Help
                  </li>
                  {/* <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Agents
                  </li> */}
                </ul>
              </div>
              </div>
            <div className="row">
              <div className="col-lg-12">
                <ul className="round11">
                  <li className="commonSiteMap bluecolor  medium text-justify responsiveFontLarge first commonSiteMap   ">
                    Legal
                  </li>
                </ul>
                <ul className="roundBorder11 ps-5">
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Terms and Conditions
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Privacy Policy
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Cookies Policy
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Sitemap
                  </li>
                  <li className="text-decoration-underline pointer  text-justify responsiveFontLarge first commonSiteMap bluecolor  my-2 ">
                    Compliance
                  </li>
                </ul>
              </div>
            </div>
            {/* 
            <ul className="round">
              <li className=" text-justify responsiveFontLarge first   ">
              Never send money in the following situations
              </li>
              </ul>
              <ul className="roundBorder ps-5">
              <li className="text-justify responsiveFontLarge first text-black fs-6  ">
              To make a charity donation or to pay an internet merchant for supplies during a pandemic, natural disaster, or other crisis.
              </li>
              <li className="text-justify responsiveFontLarge first text-black fs-6  ">
              To receive money (examples: lottery winnings, prize, job offer or loan).
              </li>
              <li className="text-justify responsiveFontLarge first text-black fs-6  ">
              To pay a government taxing authority or the police.
              </li>
              <li className="text-justify responsiveFontLarge first text-black fs-6  ">
              To buy a car, puppy, another unique or high-value item, or to make an apartment deposit
              </li>
            </ul>

            <ul className="round">
              <li className="text-black text-justify responsiveFontLarge first fs-6  ">
              Never send money in the following situations
              </li>
              </ul> */}
          </div>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
