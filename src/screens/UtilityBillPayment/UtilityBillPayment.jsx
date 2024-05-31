import React from "react";
import "./UtilityBillPayment.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export default function UtilityBillPayment() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/help-resources";
  return (
    <>
      <section className="abtPage">
      {hideNavbarAndFooter ? null : <NavBar></NavBar>}
            <Container className={`bg-white mb-5 ${hideNavbarAndFooter ? 'mt-0 rounded-0' : 'mt-5 rounded-4 '}`}>
            <div  className={`innerAbtPage ${hideNavbarAndFooter ? 'pt-0 ps-0' : 'p-5'}`}>
                        <h2 className={`bolder purpleText  ${hideNavbarAndFooter ? 'text-start' : 'text-center'}`}>Utility Bill Payments</h2>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Utility Bill Payments in Nepal is even easier. 
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Legal Remit takes immense pride in pioneering utility bill payments within the remittance industry, making it accessible to our valued customers in the Nepalese market. We understand the significance of timely bill payments and the convenience it brings to the lives of our users. With our innovative platform, users can now effortlessly check and pay their utility bills in real-time, streamlining their financial responsibilities and enhancing their overall quality of life.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Real-Time Bill Payments:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Gone are the days of waiting in long queues and grappling with paperwork to settle utility bills. Legal Remit revolutionized the process by introducing real-time bill payments. With just a few clicks on our user-friendly platform, users can instantly view their utility bills and make hassle-free payments. This seamless process ensures that your bills are settled promptly, preventing any potential disruptions to essential services.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Diverse Service Providers in Nepal:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Legal Remit collaborates with a wide range of common service providers in Nepal, offering bill payment solutions for electricity, water, internet, mobile services, and more. Our extensive network of partners ensures that users have the flexibility to settle multiple bills through a single platform, saving time and effort. Now, managing utility expenses is as effortless as a few taps on your mobile device.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Convenience and Accessibility:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Utility bill payment through Legal Remit brings unparalleled convenience to your fingertips. Our platform is accessible 24/7, allowing you to pay bills at your convenience, even outside regular banking hours. Say goodbye to the stress of meeting deadlines and the inconvenience of in-person payments. Legal Remit empowers you to manage your finances on your terms.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Insurance Premium Payments:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              In addition to utility bills, Legal Remit extends its services to include the payment of insurance premiums. Insurance is a vital aspect of financial planning, and we recognize the importance of ensuring that your coverage remains current. With our platform, you can now conveniently pay insurance premiums in real-time, safeguarding yourself and your loved ones with continuous protection.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Security and Peace of Mind:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Your security and peace of mind are at the core of our service. Legal Remit employs state-of-the-art security measures and encryption protocols to safeguard your financial data and personal information during every transaction. Rest assured, your bill payments and insurance premiums are conducted with the utmost confidentiality and protection.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Embrace Financial Empowerment:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Legal Remit's utility bill payment service goes beyond mere transactions; it empowers you to take control of your financial obligations efficiently and promptly. Embrace the convenience of real-time bill payments and insurance premium settlements, and experience the freedom that comes with having your financial responsibilities at your fingertips.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Utility bill payment and insurance premium settlement through Legal Remit represents a groundbreaking step in providing comprehensive financial solutions to our customers in Nepal. We are committed to simplifying your financial life, ensuring that you can easily manage your bills and safeguard your insurance coverage without any hassle.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Join Legal Remit's ever-growing family, and experience the transformative power of seamless utility bill payment and secure insurance premium transactions.

              </p>
            </div>




          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}
      </section>
    </>
  );
}
