import React from "react";
import "./WalletTopup.css";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook
export default function WalletTopup() {
  const location = useLocation();
    const hideNavbarAndFooter = location.pathname === "/help-resources";
  return (
    <>
      <section className="abtPage">
      {hideNavbarAndFooter ? null : <NavBar></NavBar>}
            <Container className={`bg-white mb-5 ${hideNavbarAndFooter ? 'mt-0 rounded-0' : 'mt-5 rounded-4 '}`}>
            <div  className={`innerAbtPage ${hideNavbarAndFooter ? 'pt-0 ps-0' : 'p-5'}`}>
                        <h2 className={`bolder purpleText  ${hideNavbarAndFooter ? 'text-start' : 'text-center'}`}>Wallet Top-Up</h2>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
              Instant and Convenient Electronic Transfers
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              At Legal Remit, we continuously strive to enhance our remittance
              services to cater to your diverse needs. Wallet top-up is one such
              delivery method that offers a seamless and efficient way to
              transfer funds electronically. Leveraging secure and encrypted
              remittance channels, wallet top-up provides you with a swift and
              convenient option to send money to recipients with supported
              mobile wallet services.
            </p>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
              Fast and Efficient Transactions:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              Wallet top-up is designed to provide you with instant access to
              your funds. In normal circumstances, the majority of wallet
              transactions are completed in minutes or less. Our streamlined
              process ensures that your money reaches its destination swiftly,
              enabling your recipients to use the funds immediately for their
              financial needs.
            </p>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
              Recipient Country and Service Availability:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              The delivery time for wallet top-ups may vary depending on the
              recipient country and the availability of their mobile wallet
              service. Different countries have varying mobile wallet
              infrastructures, and the processing time could be influenced by
              factors such as local regulations and service providers. Rest
              assured, our dedicated team works diligently to ensure that your
              wallet top-up reaches its destination promptly.
            </p>


            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
              Secure and Encrypted Remittance Channels:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              Security is at the heart of all our services, and wallet top-up is
              no exception. We utilize advanced encryption technology and secure
              remittance channels to protect your sensitive information and
              financial transactions. With Legal Remit, you can trust that your
              money is in safe hands, and your data remains confidential
              throughout the process.
            </p>

            <p className="text-justify responsiveFontLarge first purpleText  fs-6  pt-3">
              Convenience and Accessibility:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              Wallet top-up offers unparalleled convenience and accessibility,
              making it an attractive option for both senders and recipients. By
              utilizing mobile wallet services, your recipients can easily
              access and manage their funds through their smartphones, reducing
              the need for physical visits to banks or remittance centers.
            </p>

            <p className="text-justify responsiveFontLarge first purpleText  fs-6  pt-3">
              Support for Various Mobile Wallet Services:
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              Legal Remit supports a wide range of mobile wallet services in
              different countries. From popular e-wallets to region-specific
              mobile payment platforms, we strive to offer extensive coverage to
              meet your global remittance needs. Our platform connects you to a
              network of trusted mobile wallet providers, ensuring that your
              recipients can receive and use the funds seamlessly.
            </p>

            <p className="text-justify responsiveFontLarge first purpleText  font-italic fs-6  pt-3">
              Note: Timely and Accurate Information for Successful Transactions
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              As with any financial transaction, accuracy and timely information
              are vital for successful wallet top-ups. When initiating a wallet
              top-up, it is essential to provide the correct recipient details,
              including the mobile wallet service used by the beneficiary. This
              ensures that your funds are promptly credited to the intended
              recipient's mobile wallet.
            </p>
            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              Wallet top-up is a contemporary and efficient electronic transfer
              method offered by Legal Remit to provide you with an instant and
              secure remittance option. With its swift delivery and support for
              various mobile wallet services, wallet top-up simplifies the
              process of sending money to your loved ones and business
              associates across the globe.
            </p>
            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-0">
              Experience the convenience of wallet top-up and access our
              comprehensive remittance services for all your financial needs.
              Trust Legal Remit for secure, reliable, and seamless transactions
              that empower you to stay connected with your global network.
            </p>
          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}
      </section>
    </>
  );
}
