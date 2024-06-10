import React from "react";
import "./NoticePage.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import flight from "../../assets/images/flight.svg";
import lumbi from "../../assets/images/notice.svg";

export default function NoticePage() {
  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage p-5">
            <h2 className="bolder purpleText text-center">Notice</h2>

            <img src={lumbi} className="img-fluid my-5 d-block m-auto" />
            <div>
              <p className="responsiveFontLarge text-justify first purpleText fs-6">
                Notice 1: Introduction of PayTo as a New Form of Payment Gateway
              </p>

              <p className="responsiveFontLarge text-justify first text-black  pt-2 fs-6">
                Title: Introducing PayTo: Real-Time Payment Method for Legal
                Remit
              </p>

              <p className="responsiveFontLarge text-justify first fs-6">
                Dear Valued Customers,
              </p>

              <p className="responsiveFontLarge text-justify first fs-6">
                We are thrilled to announce the introduction of PayTo, a
                revolutionary payment method that allows you to make real-time
                payments to Legal Remit for your remittance transactions. PayTo
                is a cutting-edge payment gateway provided by NPP Australia,
                offering a seamless and efficient way to transfer funds using
                your PayID or BSB and account number.
              </p>

              <div class="panel12">
                <ol className="nested-ordered-list">
                  <p className="fs-6 text-black d-block my-3">
                    To use PayTo in Legal Remit, please follow these
                    instructions:
                  </p>

                  <li>
                    Choose PayTo as your preferred payment method during your
                    transaction.
                  </li>
                  <li>
                    Provide either your PayID or BSB and account number
                    associated with your transactional account.
                  </li>
                  <li>
                    Upon providing the correct details, proceed to the next
                    step.
                  </li>
                  <li>
                    The system will present you with a PayTo agreement. Please
                    carefully read the agreement and submit it.
                  </li>
                  <li>
                    You will receive a notification on your mobile banking app
                    or internet banking from your bank, requesting your
                    authorization for the PayTo agreement.
                  </li>
                  <li>
                    Review the agreement and authorize it as prompted by your
                    bank.
                  </li>
                  <li>
                    Once authorized, your transaction should be successfully
                    completed.
                  </li>
                </ol>

                <p className="responsiveFontLarge text-justify first fs-6 mt-3">
                  Note: It is essential to ensure that you have sufficient funds
                  in your transactional account to complete the payment
                  successfully.
                </p>
                <p className="responsiveFontLarge text-justify first fs-6">
                  We believe that the introduction of PayTo will greatly enhance
                  the payment experience for our valued customers, providing you
                  with a faster and more convenient way to make real-time
                  payments to Legal Remit.
                </p>
              </div>
            </div>
            <div>
              <p className="responsiveFontLarge text-justify first purpleText fs-6">
                Notice 2: Seamless Transaction Using Debit and Credit Cards
              </p>

              <p className="responsiveFontLarge text-justify first text-black pt-2 fs-6">
                Title: Introducing Debit and Credit Card Payments for Legal
                Remit
              </p>

              <p className="responsiveFontLarge text-justify first fs-6">
                Dear Valued Customers,
              </p>

              <p className="responsiveFontLarge text-justify first fs-6">
                We are pleased to announce that you can now make transactions
                using Visa and Mastercard debit and credit cards when using
                Legal Remit's services. This new feature allows for a seamless
                and secure payment experience for our customers.
              </p>
              <div class="panel12">
                <ol className="nested-ordered-list">
                  <p className="fs-6 text-black d-block my-3">
                    To make a transaction using your debit or credit card,
                    simply follow these steps:
                  </p>

                  <li>
                    Select the debit or credit card payment method during your
                    transaction.
                  </li>
                  <li>
                    Follow the instructions provided within the Legal Remit app
                    or website to enter your card details securely.
                  </li>
                  <li>
                    Complete the transaction as guided by the app or website.
                  </li>
                </ol>

                <p className="responsiveFontLarge text-justify first fs-6">
                  Please note that using debit and credit cards for transactions
                  may incur higher charges compared to other payment methods.
                  Legal Remit accepts Visa and Mastercard only for debit and
                  credit card payments.
                </p>
                <p className="responsiveFontLarge text-justify first fs-6">
                  We hope that this new payment option will provide you with
                  added convenience and flexibility when sending money through
                  Legal Remit.
                </p>
              </div>
            </div>
            <div>
              <p className="responsiveFontLarge text-justify first purpleText fs-6">
                Notice 3: Termination of POLI Payment Method
              </p>

              <p className="responsiveFontLarge text-justify first text-black pt-2 fs-6">
                Title: Discontinuation of POLI Payment Method
              </p>

              <p className="responsiveFontLarge text-justify first fs-6">
                Dear Valued Customers,
              </p>

              <p className="responsiveFontLarge text-justify first fs-6">
                It is with regret that we announce the discontinuation of POLI
                payments as a form of payment method within the Legal Remit
                mobile app and website. This decision is due to several factors,
                including the limited availability of banks supporting POLI
                payments and the formal closure of POLI Payment Australia on
                September 30th, 2023.
              </p>
              <p className="responsiveFontLarge text-justify first fs-6">
                We sincerely apologize for any inconvenience caused to our
                customers who have been using POLI payments. However, we are
                pleased to offer alternative payment methods, including PayTo,
                PayID, Debit Card, and Credit Card. We encourage you to utilize
                these new payment options for your future transactions.
              </p>
              <p className="responsiveFontLarge text-justify first fs-6">
                Should you require any assistance or have any questions
                regarding the alternative payment methods, please do not
                hesitate to contact our customer support team.
              </p>
              <p className="responsiveFontLarge text-justify first fs-6">
                Thank you for your understanding, and we appreciate your
                continued support as we strive to provide you with the best
                payment solutions.
              </p>
            </div>
            <div>
              <p className="responsiveFontLarge text-justify first  purpleText fs-6">
                Notice 4: Sending Money to More Wallets in Nepal
              </p>

              <p className="responsiveFontLarge text-justify first text-black pt-2 fs-6">
                Title: Expanded Wallet Options for Remittance Transactions to
                Nepal
              </p>

              <p className="responsiveFontLarge text-justify first fs-6">
                Dear Valued Customers,
              </p>

              <p className="responsiveFontLarge text-justify first fs-6">
                We are thrilled to announce the addition of IME Pay, Khalti, and
                Prabhu Pay as new wallet options for receiving remittance
                transactions from Australia to Nepal. With these new additions,
                you now have more choices when sending money to your loved ones
                in Nepal.
              </p>
              <p className="responsiveFontLarge text-justify first fs-6">
                IME Pay, Khalti, and Prabhu Pay are widely recognized and
                trusted wallet services in Nepal, offering convenient ways to
                receive funds and make payments within the country. By expanding
                our wallet options, we aim to provide you with greater
                flexibility and cater to your specific needs.
              </p>
              <p className="responsiveFontLarge text-justify first fs-6">
                To send money to these wallets, simply select the preferred
                wallet option during your transaction with Legal Remit. Our
                platform will guide you through the necessary steps to ensure a
                smooth and secure transfer of funds.
              </p>
              <p className="responsiveFontLarge text-justify first fs-6">
                We are committed to continuously improving our services to offer
                you a wide range of options for your remittance needs. Thank you
                for choosing Legal Remit as your trusted partner in sending
                money to Nepal.
              </p>
            </div>
            <div>
              <p className="responsiveFontLarge text-justify first purpleText fs-6">
                Notice 5: Expanded Reach: Sending Money to 200+ Destinations
                from Australia
              </p>

              <p className="responsiveFontLarge text-justify first text-black   pt-2 fs-6">
                Title: Instant Money Transfers to Over 200 Destinations
                Worldwide from Australia
              </p>

              <p className="responsiveFontLarge text-justify first fs-6">
                Dear Valued Customers,
              </p>

              <p className="responsiveFontLarge text-justify first fs-6">
                We are delighted to share exciting news with you. Legal Remit
                now enables you to send money from Australia to any destination
                in the world, covering over 200 countries and regions. With our
                fast and reliable service, you can make instant money transfers
                to your loved ones or business partners in a matter of minutes.
              </p>
              <p className="responsiveFontLarge text-justify first fs-6">
                Our competitive rates and low fees ensure that you receive the
                most efficient and cost-effective remittance services available.
                Whether you need to send funds via bank deposit, cash pickup, or
                wallet deposit, Legal Remit has you covered.
              </p>
              <p className="responsiveFontLarge text-justify first fs-6">
                Our extensive global network allows us to offer a wide range of
                options for sending money securely and swiftly to your desired
                destination. With Legal Remit, you can trust that your funds
                will be delivered promptly, providing peace of mind and
                convenience for your international transactions.
              </p>
              <p className="responsiveFontLarge text-justify first fs-6">
                We are dedicated to serving you with the utmost professionalism
                and reliability, ensuring that your remittance experience is
                seamless and satisfying. Thank you for choosing Legal Remit as
                your preferred service provider for sending money worldwide.
              </p>
              <p className="responsiveFontLarge text-justify first fs-6">
                Please note: All service features, terms, and conditions
                mentioned in the notices are subject to change. We recommend
                visiting the Legal Remit website or contacting our customer
                support team for the most up-to-date information and assistance.
              </p>
            </div>
          </div>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
