import React from "react";
import "./CashPickup.css";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export default function CashPickup() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/help-resources";
  return (
    <>
      <section className="abtPage">
      {hideNavbarAndFooter ? null : <NavBar></NavBar>}
            <Container className={`bg-white mb-5 ${hideNavbarAndFooter ? 'mt-0 rounded-0' : 'mt-5 rounded-4 '}`}>
            <div  className={`innerAbtPage ${hideNavbarAndFooter ? 'pt-0 ps-0' : 'p-5'}`}>
                        <h2 className={`bolder purpleText  ${hideNavbarAndFooter ? 'text-start' : 'text-center'}`}>Cash Pickup</h2>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
            Traditional and Swift Remittance Solution

            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
            In the world of remittance, cash pickup remains a steadfast and reliable method used across all corners of the globe. As a traditional delivery channel, cash pickup offers unparalleled speed and convenience, making it an ideal choice for urgent and smaller transactions. With Legal Remit, you can trust that your cash pickup transactions will be handled with efficiency and care, ensuring that your funds reach your recipients promptly.

            </p>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
            Swift Delivery for Urgency:

            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
            Cash pickup is well-known for its rapid delivery, making it an optimal choice when time is of the essence. Our streamlined process ensures that your funds are available for pickup by your recipients swiftly. Whether it's a last-minute emergency or a time-sensitive financial need, cash pickup provides a quick solution to meet your remittance requirements.

            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
            The delivery time for cash pickup transactions is contingent upon the destination country's working hours and the availability of cash pickup services. Different countries have varying banking hours and operational schedules, which may affect the processing time for cash pickup. Rest assured, Legal Remit collaborates with an extensive network of partners to maximize accessibility and expedite the cash pickup process.


            </p>


            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
            Convenience and Accessibility:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
            Cash pickup offers unmatched convenience and accessibility for both senders and recipients. Unlike other methods, cash pickup allows your recipients to receive funds in physical cash form, eliminating the need for bank accounts or digital wallets. This convenience is particularly valuable for individuals in regions where access to banking services might be limited.

            </p>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
            Ideal for Smaller Transactions:

            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
            Cash pickup is particularly well-suited for smaller remittance transactions. If you need to send funds quickly for everyday expenses, emergency situations, or smaller financial support, cash pickup provides a straightforward solution with minimal transactional fees.

            </p>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
            Secure Transactions:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
            Despite being a traditional method, cash pickup transactions facilitated by Legal Remit are conducted with utmost security. Our commitment to ensuring your peace of mind extends to cash pickup, and we take every precaution to safeguard your financial data and the funds during the transfer process.

            </p>

            <p className="text-justify responsiveFontLarge first purpleText font-italic  fs-6  pt-3">
            Note: Accurate Details for Seamless Transactions:

            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
            To ensure a smooth cash pickup experience, it is vital to provide accurate recipient information, including the recipient's full name, contact details, and any unique transaction reference codes. This accuracy minimizes the possibility of delays and ensures that the funds are received promptly by the intended beneficiary.

            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
            Cash pickup remains a time-honored and swift remittance solution offered by Legal Remit. With its rapid delivery and accessibility, cash pickup provides an efficient way to transfer funds to your loved ones and associates worldwide. Trust Legal Remit for your cash pickup needs, and experience the convenience of a secure and reliable remittance process that bridges distances and connects hearts.


            </p>

          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}

      </section>
    </>
  );
}
