import React from "react";
import "./PartnerAndAffiliate.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export default function PartnerAndAffiliate() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/help-resources";
  return (
    <>
      <section className="abtPage">
      {hideNavbarAndFooter ? null : <NavBar></NavBar>}
            <Container className={`bg-white mb-5 ${hideNavbarAndFooter ? 'mt-0 rounded-0' : 'mt-5 rounded-4 '}`}>
            <div  className={`innerAbtPage ${hideNavbarAndFooter ? 'pt-0 ps-0' : 'p-5'}`}>
                        <h2 className={`bolder purpleText  ${hideNavbarAndFooter ? 'text-start' : 'text-center'}`}> Affiliate and partnership </h2>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-4">
              Empowering Global Connections through Strategic Affiliations and Partnerships
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              At Legal Remit, our commitment to excellence extends beyond our innovative platform and reliable services. We take great pride in establishing strong affiliations and partnerships with leading financial institutions and money transfer networks worldwide. These strategic alliances allow us to offer our valued clients exceptional remittance solutions and unparalleled convenience.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Strong Affiliations in Nepal:

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              In Nepal, we have forged robust affiliations with multiple A-grade banks, cementing our position as a premier remittance service provider in the country. These strategic alliances enable us to extend exceptional services to our clients, backed by the reliability and reputation of esteemed financial institutions. Through these affiliations, we are able to offer seamless bank deposit services, ensuring swift and secure transfers for our customers.

              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Extensive Network Access:

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Our strong affiliations and partnerships provide us with access to extensive networks, enabling us to offer a wide range of remittance options to our clients. By connecting with various financial institutions and money transfer networks, we enhance our reach and cater to diverse remittance needs, regardless of the geographical location of our customers.

              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Empowering Global Reach:

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Our affiliations and partnerships with financial institutions and networks enable us to offer a global reach for our remittance services. This expanded reach ensures that our clients can conveniently receive their funds from a multitude of secure and trusted locations worldwide. We are committed to providing fast, reliable, and convenient cash pickup options, making it easier for our clients to access their funds whenever and wherever they need them.

              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              The Power of Collaboration:

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              We believe in the power of collaboration to drive positive change and innovation in the remittance industry. Through our affiliations and partnerships, we strengthen our capabilities, enhance our services, and optimize the overall remittance experience for our clients. By working together with esteemed partners, we continuously strive to provide the best exchange rates, unparalleled service, and unmatched delivery times in every transaction.

              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Customer-Centric Excellence:

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Our focus on customer-centric excellence remains at the forefront of our affiliations and partnerships. Each collaboration is carefully chosen to align with our vision of delivering unparalleled convenience and financial empowerment to our clients. We place our customer's needs and preferences at the heart of every decision, ensuring that our services meet and exceed their expectations.

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              As a global remittance company, Legal Remit is proud of its strategic affiliations and partnerships with leading financial institutions and money transfer networks. These collaborations enable us to provide our clients with exceptional services, secure and swift transactions, and access to a wide range of remittance options worldwide. Through our strong affiliations, we reaffirm our commitment to empowering global connections and serving as a trusted companion in every step of our clients' remittance journey.


              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Join Legal Remit today and experience the benefits of our powerful affiliations and partnerships, ensuring a seamless and rewarding remittance experience for you and your loved ones worldwide.


              </p>
            </div>



      

          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}

      </section>
    </>
  );
}
