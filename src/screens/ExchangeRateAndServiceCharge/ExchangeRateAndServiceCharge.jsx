import React from "react";
import "./ExchangeRateAndServiceCharge.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export default function ExchangeRateAndServiceCharge() {
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
              Exchange Rate And Service Charge
            </h2>

            <div className="mt-3">
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Transparent Exchange Rates and Flexible Service Charges
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                At Legal Remit, we prioritize transparency and flexibility in
                our exchange rates and service charges to ensure that our valued
                clients have a clear understanding of the costs involved in
                their remittance transactions. Whether you are converting AUD
                into your desired currency or availing our diverse delivery
                methods, our aim is to provide you with a seamless and
                cost-effective remittance experience.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Exchange Rate: Real-Time Indicative Rates
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Our exchange rates are indicative and based on the live rate of
                the market. We update these rates in real-time to reflect the
                dynamic nature of the foreign exchange market. However, please
                note that these indicative rates can only be guaranteed at the
                time of your transaction submission. As soon as you submit your
                transaction, the exchange rate will be locked, and any
                subsequent market fluctuations will not affect your transaction.
                This ensures that you receive the rate you agreed upon,
                providing you with certainty and predictability.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Locking Rates for 24 Hours:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Once you submit your transaction, the exchange rate will be
                locked for a period of 24 hours. This allows you ample time to
                complete your payment, ensuring that you have a fixed rate for
                the entirety of the 24-hour period. In the event that we do not
                receive your payment within this period, you may proceed with
                your transaction again, taking into account the new rates
                available on the Legal Remit app.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Service Charge: Transparent Fee Structure
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                At Legal Remit, our service charge is applied to each
                transaction, and it varies based on several factors. These
                include the receiving country, your chosen delivery method, and
                your preferred payment method. We believe in providing
                flexibility to our customers, allowing them to choose the most
                cost-effective option for their specific remittance needs.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Factors Affecting Service Charges:
              </p>
        
              <div className="d-flex">
              <div className="fs-6 pe-2 text-black my-2">
                  - Receiving Country: The service charge may differ depending on
                the country where your recipient is located. Legal Remit aims to
                offer competitive service charges for each country to provide
                the best value for our clients.
                </div>
                </div>
          
              <div className="d-flex">
              <div className="fs-6 pe-2 text-black my-2">
                  - Delivery Method: The service charge may vary based on the
                delivery method you select for your remittance. Whether it's
                bank deposit, cash pickup, or wallet deposit, we strive to
                provide a transparent fee structure for each option.
                </div>
                </div>
              <div className="fs-6 pe-2 text-black my-2">
                  - Payment Method: The service charge may be influenced by your
                preferred payment method. Debit card and credit card payments
                may incur higher fees compared to other payment methods, such as
                PayTo, PayID, Poli, and bank transfer. We encourage our
                customers to explore various payment options to optimize
                cost-effectiveness.
                </div>
          
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Empowering You to Make Informed Decisions
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                At Legal Remit, our commitment to transparency empowers you to
                make well-informed decisions for your remittance transactions.
                We encourage you to compare exchange rates and service charges,
                allowing you to select the best combination for your unique
                requirements.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Legal Remit is dedicated to providing transparent exchange rates
                and service charges, ensuring that our clients have the utmost
                clarity and confidence in their remittance transactions. Our
                real-time indicative rates and flexible service fees exemplify
                our commitment to delivering a seamless and cost-effective
                remittance experience.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Join Legal Remit today, and experience the convenience of
                transparent rates and a wide range of delivery methods to meet
                your remittance needs with ease.
              </p>
            </div>
          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}
      </section>
    </>
  );
}
