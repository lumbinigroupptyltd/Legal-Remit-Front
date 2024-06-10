import React from "react";
import "./YourAccount.css";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export default function YourAccount() {
  const location = useLocation();
    const hideNavbarAndFooter = location.pathname === "/help-resources";
  return (
    <>
      <section className="abtPage">
      {hideNavbarAndFooter ? null : <NavBar></NavBar>}
            <Container className={`bg-white mb-5 ${hideNavbarAndFooter ? 'mt-0 rounded-0' : 'mt-5 rounded-4 '}`}>
            <div  className={`innerAbtPage ${hideNavbarAndFooter ? 'pt-0 ps-0' : 'p-5'}`}>
                        <h2 className={`bolder purpleText  ${hideNavbarAndFooter ? 'text-start' : 'text-center'}`}>Your Account</h2>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
            Guidance to Keep Your Account Secure Online:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-3">
            Apart from distinguishing Legal Remit from scams, here are some general tips to keep your online accounts secure:

            </p>

            <div>
       
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              - Ignore and avoid interacting with unknown messages, links, and emails. <br/>
              - Verify the legitimacy of apps and websites before using any online platform. <br/>
              - Exercise caution with messages from unknown numbers or emails offering prizes or rewards. <br/>
              - Avoid using public Wi-Fi or shared networks to minimize the risk of data theft. <br/>
              - Always ensure that the website you visit has a valid SSL certificate, indicated by a locked icon and the website URL starting with "https://". <br/>


              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-3">
              At Legal Remit, we prioritize the safety and security of our customers. By adhering to the guidelines provided, you can confidently identify Legal Remit from potential scams and enjoy a secure and seamless experience while using our services. We are dedicated to providing you with a reliable and trustworthy platform for all your remittance needs.


            </p>
            </div>

          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}
      </section>
    </>
  );
}
