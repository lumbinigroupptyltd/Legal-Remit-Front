import React from "react";
import "./PrivacyPolicy.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export default function PrivacyPolicy() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/legal";
  return (
    <>
      <section className="abtPage">
      {hideNavbarAndFooter ? null : <NavBar></NavBar>}
        <Container className={`bg-white mb-5 ${hideNavbarAndFooter ? 'mt-0' : 'mt-5 rounded-4 '}`}>
          <div  className={`innerAbtPage ${hideNavbarAndFooter ? 'pt-0 ps-0' : 'p-5'}`}>
            <h2 className={`bolder purpleText  ${hideNavbarAndFooter ? 'text-start' : 'text-center'}`} > Privacy and Policy</h2>
            <div className="termsFAQ">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-3">
                OVERVIEW
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                Legal Remit (ABN 54 635 043 248) ('Legal Remit', 'we', 'us',
                'our') is a business name of Lumbini Group Pty Ltd.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                We are committed to ensuring the privacy of the personal
                information you have provided us. We are bound by the Australian
                Privacy Principles ('APPs') established under the Privacy Act
                1998 (the 'Act'), which require you to be informed about how we
                handle your personal information. This Privacy Policy
                ('Privacy') describes how Legal Remit collects, holds, uses, and
                discloses your personal information and how the information is
                protected.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                All third parties (including customers, suppliers,
                sub-contractors, and agents) that have access to or use personal
                information collected and held by us must abide by this Policy.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6">
                Copies of this Policy are available free of charge by contacting
                our Privacy Officer or can be downloaded from our website{" "}
                <a href="https://legalremit.com/privacy-policy" target="_blank">
                  https://legalremit.com/privacy-policy
                </a>{" "}
                Please note that this Policy does not extend to websites of
                third parties that we may provide links to on or from our
                website.
              </p>
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-2">
                Your privacy is important to us
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
                We protect your information and aim to be clear and open with
                how we use your information. This policy explains how we handle
                your personal information.
              </p>
            </div>
            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-3">
                What information do we collect?
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
                We collect your personal information when you register on our
                website, information including.
              </p>

              <ul className="round">
                <li className="liCustom">
                  Your personal identifications, including your full name,
                  residential address, date of birth, gender, contact details,
                  and details of specific primary identification documents e.g.
                  Australian Drivers License or Passport.
                </li>
                <li className="liCustom">
                  Your beneficiary information, including full name, address,
                  account number and contact number, your relation with the
                  beneficiary, and the purpose of your transfer.
                </li>
                <li className="liCustom">
                  In some cases, we may ask you for any additional personal
                  information from you to verify your identification through
                  email or telephone. The following details might be asked if
                  required.{" "}
                </li>
                <li className="liCustom">Your Occupation.</li>
                <li className="liCustom">Your Payment details.</li>
                <li className="liCustom">Transaction information.</li>
                <li className="liCustom">
                  And additional verification documents such as address proof
                  documents, source of fund, your bank statement, Payslip, etc.
                </li>
                <li className="liCustom">
                  Your device information, IP address, and user record are
                  collected and used to give you a higher level of protection
                  against fraud and misuse of your account. And personalized,
                  customized experience. These details are used to track and
                  identify crash reports, issues, and bugs that are encountered
                  with you and give you a better user experience.{" "}
                </li>
              </ul>
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-3">
                How do we collect your information?
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
                We usually collect your personal information through our online
                (website/application), telephone, and email:
              </p>

              <ul className="round">
                <li className="liCustom">
                  When you register online through our website and mobile
                  application, we collect your personal information, including
                  your full name, date of birth, contact details, residential
                  address, and identification proof document.
                </li>
                <li className="liCustom">
                When you send your information or document through email or text or multimedia message. 

                </li>
                <li className="liCustom">
                  When you disclosed the information on the phone to a Legal
                  Remit representative speaking with you on behalf of Legal
                  Remit.
                </li>
              </ul>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                In some conditions, we may be provided with personal information
                about you from a third party. In that case, we will take
                reasonable steps to inform you that we hold the personal
                information and the purpose for which we hold the personal
                information. We will take reasonable steps to make you aware of
                this Policy.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                Please note that you do not have the option of dealing with us
                anonymously, or by using a fictitious name, which is illegal for
                us to deal with individuals who are not identified. If you do
                not provide us with the personal information we request, we may
                not be able to provide you with the service you have requested.
                For example; process your funds transfer request.
              </p>
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-3">
                How do we use your information?
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
                We use and disclose the information collected and held about you
                so that we may:
              </p>

              <ul className="round">
                <li className="liCustom">
                  Provide you with the service you have requested, inquired
                  about, or ordered through our website{" "}
                  <a href="www.legalremit.com ">www.legalremit.com </a>(e.g.
                  money transfer order), or our mobile application Legal Remit
                  available on IOS and Android platforms.
                </li>
                <li className="liCustom">
                  Fulfill your order, send your order confirmation, and manage
                  our customer service communications with you;
                </li>

                <li className="liCustom">
                  Verify your identity in order to provide you with the service
                  you have requested;
                </li>
                <li className="liCustom">
                  Comply with our various regulatory and legal obligations,
                  including but not limited to the Anti-Money Laundering and
                  Counter-Terrorism Financing Act 2006 (Cth);
                </li>
                <li className="liCustom">
                  Provide you with information about our products and services;
                </li>
                <li className="liCustom">
                  Consider and investigate any concerns or complaints you may
                  have.
                </li>
                <li className="liCustom">
                  Continuously improve our website and our customer experiences.
                </li>
                <li className="liCustom">
                  When we bring new schemes, offers, and services;
                </li>
              </ul>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                From time to time we may also use your information to tell you
                about our new products, services, offers, and schemes we think
                you might be interested in. We may use the following to contact
                you;
              </p>
              <ul className="round">
                <li className="liCustom">Phone</li>

                <li className="liCustom">SMS</li>
                <li className="liCustom">Email</li>
                <li className="liCustom">Social media</li>
                <li className="liCustom">Website</li>
              </ul>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                If you do not want to receive a direct marketing message, please
                unsubscribe through settings available in our mobile app or
                profile for the web user.
              </p>
              <p className="text-justify medium responsiveFontLarge first text-black fs-6 ">
                Please note that we never disclose your information to any third
                party other than our mandate obligations by the law of
                Australia. We do not provide your personal information to any
                third party for our commercial use.
              </p>
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-2">
               Who do we share your information with?
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
                Government agencies, law enforcement bodies, and courts where
                required by law; eg, AUSTRAC. The Identification Verification
                agencies are used to confirm your identity and meet the
                applicable identification and regulatory verification
                requirements; Our correspondent partners, disbursement and
                payment provider partners for the purposes of processing your
                requested transaction; and meeting the AML-CTF in the local
                jurisdiction and the jurisdiction of the receiving country.
              </p>
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-2">
                Keeping your information safe
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
                We keep your information safe and secure. Our staff are trained
                in how to keep your information safe and secure. We keep your
                information in the password-encrypted electronic system. Only
                authorized persons can access this information. We will retain
                your information for as long as needed to provide services to
                you, or as required by law. Where we no longer need your
                information, we will take reasonable steps to destroy or
                de-identify it.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
                Despite our efforts, no method of transmission over the
                internet, or method of electronic storage, is 100% secure. If
                you have any questions about security on our website, please
                contact us.
              </p>
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-2">
                Making a privacy complaint
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 mb-1">
                If you have a complaint regarding our handling of your personal
                information or if you believe we have breached the Privacy Act,
                contact Legal Remit’s Customer Service online; or by email at
                support@legalremit.com
              </p>

              <ul className="round">
                <li className="liCustom">
                  We will respond to your complaint within 30 days of receipt of
                  the initial complaint.
                </li>
                <li className="liCustom">
                  We will provide you with a written notice setting out our
                  decision. If we are unable to resolve the complaint within 30
                  days we will:
                </li>
                <li className="liCustom">
                  Inform you of the delay and the reasons for the delay; and
                </li>
                <li className="liCustom">
                  Specify a date when a decision can reasonably be expected.
                </li>
                <li className="liCustom">
                  All complaints will be processed free of cost
                </li>
              </ul>

              <div className="d-flex my-2 mt-5">
                <div className="email purpleText">Email :</div>
                <div className="mailID ps-2">info@legalremit.com</div>
              </div>
              <div className="d-flex my-2">
                <div className="email purpleText">Website :</div>
                <div className="mailID ps-2">www.legalremit.com</div>
              </div>
              <div className="d-flex my-2">
                <div className="email purpleText">Mail :</div>
                <div className="mailID ps-2">
                  Suite 1105 Level 11 104 Pitt Street, NSW, 2000.
                </div>
              </div>
            </div>
          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}
      </section>
    </>
  );
}
