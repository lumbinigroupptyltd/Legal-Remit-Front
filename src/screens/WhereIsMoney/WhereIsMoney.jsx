import React from "react";
import "./WhereIsMoney.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export default function WhereIsMoney() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/help-resources";
  return (
    <>
      <section className="abtPage">
        {hideNavbarAndFooter ? null : <NavBar></NavBar>}
        <Container
          className={`bg-white mb-5 ${
            hideNavbarAndFooter ? "mt-0 rounded-0" : "mt-5 rounded-4 "
          }`}
        >
          <div
            className={`innerAbtPage ${
              hideNavbarAndFooter ? "pt-0 ps-0" : "p-5"
            }`}
          >
            <h2
              className={`bolder purpleText  ${
                hideNavbarAndFooter ? "text-start" : "text-center"
              }`}
            >
              Where is My Money?
            </h2>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Real-Time Tracking with Legal Remit
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                At Legal Remit, we understand that the question "Where is my
                money?" is of utmost importance to our valued customers. We
                recognize the need for transparency and peace of mind when it
                comes to your financial transactions. That's why we have
                developed a cutting-edge real-time tracking system that provides
                detailed information about your transaction at every stage of
                its journey. With Legal Remit's tracking feature, you can
                confidently monitor the progress of your money transfer and know
                exactly where your funds are and how long it may take to reach
                your intended recipient.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Real-Time Tracking for Peace of Mind:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Our real-time tracking system is designed to offer complete
                transparency and convenience to our customers. As soon as you
                initiate a money transfer through Legal Remit, you gain access
                to live updates on the status of your transaction. Whether
                you're sending money to family and friends, paying bills, or
                conducting business transactions, knowing the current status of
                your funds is just a few clicks away.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Detailed Information at Your Fingertips:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Legal Remit's tracking feature provides detailed information
                about each stage of your transaction's journey. From the moment
                you initiate the transfer to the final delivery, you can follow
                your money's progress every step of the way. Our tracking system
                displays real-time updates, such as when the transaction is
                initiated, when it is being processed, and when it is
                successfully delivered to the recipient.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Additionally, you can view estimated delivery times, ensuring
                that you and your recipient are well-informed about when the
                funds are expected to be available. This level of transparency
                empowers you to plan and manage your finances more effectively,
                even when sending money across borders.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Accessible on Mobile App and Web Application:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                To ensure your convenience and accessibility, Legal Remit's
                tracking feature is available on both our mobile app and web
                application. Whether you prefer to use your smartphone or
                desktop computer, you can effortlessly check the status of your
                transactions anytime, anywhere.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                The mobile app offers a user-friendly interface that allows you
                to track your money on-the-go. With just a few taps, you can
                access real-time updates and stay in control of your financial
                transactions, even when you are away from your computer.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Secure and Reliable Tracking:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                At Legal Remit, we prioritize the security and reliability of
                our tracking system. Your financial data and transaction details
                are encrypted and protected, ensuring that your sensitive
                information remains secure. Our robust tracking infrastructure
                is designed to deliver accurate and up-to-date information,
                providing you with complete confidence in the status of your
                money transfer.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                With Legal Remit's real-time tracking system, you no longer have
                to wonder, "Where is my money?" You can monitor your
                transaction's journey, know exactly where your funds are, and
                stay informed about the estimated delivery time. Our
                user-friendly mobile app and web application make it easy to
                access this valuable information at your convenience.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Empower yourself with transparency and control over your
                financial transactions. Choose Legal Remit for fast, secure, and
                reliable money transfers, backed by real-time tracking to
                provide you with peace of mind.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              How to Distinguish Legal Remit from Scams: Ensuring Your Safety and Security

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              As a responsible and customer-centric remittance company, Legal Remit is deeply committed to protecting our valued users from potential scams and fraudulent activities. We understand the importance of safeguarding your financial transactions and personal information. To help you identify and differentiate between Legal Remit and scams, we have compiled essential guidelines and best practices that you can follow for a secure online experience.

              </p>

              <Row className="">
              <ol className="nested-ordered-list ps-4">
                <li className="fs-6 text-black my-2">
                <b>Verify Domain and Links:</b> Always ensure that you are visiting our official websites: legalremit.com and legalremitnepal.com.au. Be cautious of any links that lead you to other domains, and immediately cease further interactions if this occurs. To download our mobile application, search for "Lumbini Group" on the App Store or Play Store, as we offer our services under this name.
                </li>
                <li className="fs-6 text-black my-2">
                <b>Validate Logo and App Icon:</b> Before proceeding with any transactions or interactions, verify that the displayed logo and app icon match our official Legal Remit branding. Consistency in branding elements is a key indicator of authenticity.

                </li>
                <li className="fs-6 text-black my-2">
                <b>Communication Practices:</b> Remember that Legal Remit will never contact you from a private number. We will never request your passwords or OTPs (One-Time Passwords) through calls, emails, or messages. Be cautious of any unsolicited communication asking for sensitive information, and refrain from sharing such details.

                </li>
                <li className="fs-6 text-black my-2">
                <b>Links and Rewards:</b> Legal Remit will never send you third-party links to click on. Our official links will consist of our trusted domains: legalremit.com and legalremitnepal.com.au. We will not send you links to claim rewards or prizes won in our campaigns. Any announcements regarding rewards will be made through mobile notifications and posted on our verified social media pages, including Facebook and Instagram.
                </li>
                <li className="fs-6 text-black my-2">
                <b>Secure Transactions:</b> Legal Remit will never ask you to transfer money to an individual account. Always ensure that you are making payments into our account using the provided payment methods on our official platform.                </li>
                <li className="fs-6 text-black my-2">
                <b>OTP Verification:</b> All OTPs sent to you by Legal Remit will clearly identify our name. Never share OTPs, passwords, or PINs with anyone, as these are sensitive credentials meant for your use only.
                </li>
                <li className="fs-6 text-black my-2">
                <b>Biometric Authentication:</b> For an added layer of protection, activate biometric authentication if available on your device. This will enhance the security of your Legal Remit account and ensure that only you can access it.
                </li>
                <li className="fs-6 text-black my-2">
                <b>Password Protection:</b> Maintain a strong password for your Legal Remit account. Your password should be a minimum of 8 characters and include uppercase letters, lowercase letters, special characters, and numbers. Change your passwords regularly to enhance security.                </li>
              </ol>
        
            </Row>
              
            </div>
          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}
      </section>
    </>
  );
}
