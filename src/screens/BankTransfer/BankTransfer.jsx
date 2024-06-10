import React from "react";
import "./BankTransfer.css";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export default function BankTransfer() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/help-resources";
  return (
    <>
      <section className="abtPage">
      {hideNavbarAndFooter ? null : <NavBar></NavBar>}
            <Container className={`bg-white mb-5 ${hideNavbarAndFooter ? 'mt-0 rounded-0' : 'mt-5 rounded-4 '}`}>
            <div  className={`innerAbtPage ${hideNavbarAndFooter ? 'pt-0 ps-0' : 'p-5'}`}>
                        <h2 className={`bolder purpleText  ${hideNavbarAndFooter ? 'text-start' : 'text-center'}`}>Bank Transfer</h2>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
              Swift, Secure, and Cost-Effective Remittance Solution
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              At Legal Remit, we understand the significance of timely and
              secure money transfers, and bank transfers have long been a
              favored delivery method in the remittance industry. Leveraging
              cutting-edge technology and encryption, our bank transfers are not
              only swift but also highly secured, providing you with peace of
              mind when sending money to your loved ones or conducting business
              transactions.
            </p>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
              Swift Delivery Time:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              We take pride in the efficiency of our bank transfers, with the
              majority of transactions being completed in minutes or less.
              However, the actual delivery time may vary depending on the
              receiving country's banking system and local regulations. While we
              provide indicative delivery times for your convenience, please
              note that Legal Remit does not guarantee exact delivery times due
              to unforeseen circumstances beyond our control.
            </p>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
              Cost-Effective Transactions:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              As your trusted remittance partner, we strive to offer
              cost-effective solutions to our customers. Our bank transfers
              through Legal Remit are known for their affordability, making them
              a more economical choice compared to traditional swifts and many
              of our competitors. The transaction cost may vary depending on the
              receiving country, and you can easily check the specific charges
              for your desired bank transfer on our user-friendly send money
              page.
            </p>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
              Secure Transactions:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              Your security is of paramount importance to us. All bank transfers
              through Legal Remit are conducted entirely electronically and
              encrypted, ensuring the highest level of protection for your
              financial data and transactions. Our state-of-the-art security
              measures shield your sensitive information from unauthorized
              access, giving you the confidence to transfer money with peace of
              mind.
            </p>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
              Required Details for Bank Deposit:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              To initiate a bank account deposit with Legal Remit, we request
              some essential information from you. Providing accurate details is
              crucial for a smooth and successful transaction. You will need to
              furnish the recipient's full name, bank name, branch, and account
              number. Please note that the required details may vary depending
              on the destination country. To ensure a seamless process, we urge
              you to carefully fill in the necessary information based on your
              recipient's location.
            </p>

            <p className="text-justify responsiveFontLarge first purpleText font-italic fs-6  pt-3">
              Note: Ensure Accuracy for Hassle-Free Transactions:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              We emphasize the importance of accuracy when providing bank
              details. Inaccurate information may lead to delays in delivery or,
              in worst-case scenarios, funds being sent to unintended
              recipients. All successful transactions are irreversible, making
              it essential for senders to double-check and verify the accuracy
              of the provided details. We encourage you to take the necessary
              time and effort to verify all information before proceeding with
              your bank transfer.
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              Bank transfer is a swift, secure, and cost-effective remittance
              solution provided by Legal Remit to ensure your money reaches its
              destination efficiently and reliably. Our commitment to excellence
              and your satisfaction drives us to deliver seamless financial
              services that exceed your expectations. Trust Legal Remit for all
              your remittance needs, and experience the convenience of seamless
              transactions with the highest level of security.
            </p>
          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}
      </section>
    </>
  );
}
