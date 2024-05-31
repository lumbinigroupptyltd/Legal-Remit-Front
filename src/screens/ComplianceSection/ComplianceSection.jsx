import React from "react";
import "./ComplianceSection.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export default function ComplianceSection() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/legal";
  return (
    <>
      <section className="abtPage">
      {hideNavbarAndFooter ? null : <NavBar></NavBar>}
      <Container className={`bg-white mb-5 ${hideNavbarAndFooter ? 'mt-0' : 'mt-5 rounded-4 '}`}>
          <div  className={`innerAbtPage ${hideNavbarAndFooter ? 'pt-0 ps-0' : 'p-5'}`}>
            <h2 className={`bolder purpleText  ${hideNavbarAndFooter ? 'text-start' : 'text-center'}`} >  Compliance</h2>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-4">
                Compliance is at the core of our operations at Legal Remit, and
                we are committed to maintaining the highest standards of safety
                and security for our customers. As the parent entity of Legal
                Remit, Lumbini Group Pty Ltd is registered as an independent
                remittance dealer with Austrac, Australia's financial
                intelligence agency. Our Austrac registration number is
                100622798.
              </p>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                As part of our compliance measures, we strictly adhere to the
                guidelines set forth by the regulatory authority to combat money
                laundering, terrorism financing, and other financial crimes. We
                understand the critical role we play in safeguarding the
                financial ecosystem and preventing illegal activities.
              </p>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                To achieve this, we have robust systems in place that encompass
                customer due diligence and Know Your Customer (KYC) verification
                processes. When you use Legal Remit, we will request certain
                identification documents to ensure that we are dealing with
                legitimate customers and that funds are being transferred for
                lawful purposes.
              </p>
            </div>
            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Our KYC process includes electronic identity checks using DVS
                (Document Verification Service), which helps us verify the
                authenticity of identification documents provided by our
                customers. Additionally, we conduct checks against politically
                exposed persons (PEPs) and sanctions lists to mitigate the risk
                of potential illicit activities.
              </p>
            </div>
            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Compliance is a shared responsibility, and as our valued
                customer, your cooperation in providing the requested
                information is crucial to maintaining the integrity of our
                services. It also helps us fulfill our obligations as a
                regulated remittance dealer and ensures the security of your
                financial transactions.
              </p>
            </div>
            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              As part of our commitment to compliance, we may request additional information from you to meet our AML-CTF (Anti-Money Laundering and Counter-Terrorism Financing) program's requirements. We understand that the privacy and security of your personal data are of utmost importance, and we handle all information in accordance with relevant privacy laws and regulations.

              </p>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                By working together and staying vigilant, we can collectively
                combat financial crimes and contribute to a safer financial
                environment for everyone. We encourage you to stay informed
                about money laundering and related risks by visiting the Austrac
                website, where you can find valuable resources and educational
                materials.
              </p>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                At Legal Remit, we take pride in offering secure and compliant
                money transfer services, and we appreciate your trust in us as
                your remittance provider. If you have any questions or concerns
                about our compliance procedures, please feel free to reach out
                to our dedicated customer support team, available 24/7 to assist
                you. Together, we can create a stronger and more resilient
                financial ecosystem.
              </p>
            </div>
          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}
      </section>
    </>
  );
}
