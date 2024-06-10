import React from "react";
import "./TermsAndCondition.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export default function TermsAndCondition() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/legal";
  return (
    <>
      <section className="abtPage">
        {hideNavbarAndFooter ? null : <NavBar></NavBar>}
        <Container
          className={`bg-white mb-5 ${
            hideNavbarAndFooter ? "mt-0" : "mt-5 rounded-4 "
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
              {" "}
              Terms And Conditions
            </h2>
            <div className="termsFAQ">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-3">
                1. OVERVIEW
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                The “Terms and Conditions” is the document that explains the
                terms and conditions of our service when you use our service
                through our website. When you register and use our service you
                must be agreed to bind by the terms and conditions of Legal
                Remit. You do not have a standing arrangement to make
                transactions. We reserve all the rights to whether a permit or
                not any transaction you have made. By accepting our terms and
                conditions you will be legally bound by Legal Remit’s “terms and
                conditions”.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                In these Terms and Conditions, the terms “Legal Remit”, ‘we',
                'us', 'our' refers to Lumbini Group Pty Ltd, its employees,
                directors, affiliates, and assigns. Legal Remit is a business
                name of Lumbini Group Pty Ltd, registered in Australia with (ABN
                54 635 043 248). Its corporate office address is at 87 Anthony
                Rolfe Avenue Gungahlin, 2912, ACT., and its branch office is at
                Suite 1105 Level 11, 370 Pitt Street, NSW, 2000.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6">
                The terms <b>"you" </b>and <b>"your"</b> refer to users of the Service, as
                Senders, Recipients, other users, or visitors to the website
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                These Terms and Conditions are effective from the date on which
                you first access, register or use the Service. Terms and
                conditions may change from time to time, but it is only
                applicable when you use the service, if you use the service
                before the change has been made that won’t apply to you. Any
                changes to these Terms and Conditions will be communicated to
                you. To continue to use the service after the amendment of the
                new Terms and conditions, you need to accept the changes.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                The Service is to send money to family and friends, who you know
                well. This is not the service to send money to third parties
                such as sellers of the goods and so on.
              </p>
            </div>

            <div className="termsFAQ mt-2">
              <p className="text-justify medium responsiveFontLarge first purpleText fs-6  pt-3">
                2. TERMS AND THEIR DEFINITIONS
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Website”</b> refers to Legal Remit’s website
                www.legalremit.com, where you can register and request a money
                transfer order.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Mobile App”</b> refers to the Legal Remit mobile application
                available on Play Store and App Store for Android and IOS
                respectively. Using our mobile App, you can register, request a
                money transfer order, and make utility bill payments.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“System”</b> refers to the website of Legal Remit and our
                LR-Remit software and integrated software of partner banks in
                Nepal.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Registration”</b> refers to the account creation of the
                customer in our system, where you need to update your personal
                details also known as KYC details.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Payment method"</b> refers to the way you wish to transfer
                the money to our account. You can choose the method of payment
                as we have bank transfer, PAY ID/OSKO, and POLI. We don’t
                receive any cash deposits in our bank account. If you deposit
                cash in our account, we will refund your amount, but it might
                take up to 7 business days to be received in your accounts. Cash
                always carries a higher degree of risk; some cash deposits may
                take longer than 7 days period for the refunds if they required
                additional verification and compliance check on our part.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Transaction”</b> refers to the money transfer request you
                made through the website and our mobile application.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Transaction Amount”</b> refers to the amount of money or the
                value that the Sender wishes to send to the receiver, excluding
                any applicable Service Fee and prior to any foreign exchange
                conversion.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Transaction History”</b> refers to the record of your
                Transactions on our system which you may access using your login
                credentials Legal Remit website and mobile application.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Sender”</b> refers to the user who uses the service to send
                the money
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Recipient”</b> refers to the beneficiary who receives the
                money from our partner on behalf of the sender.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Service Provider”</b> means a local bank, money exchange
                house, or other third-party service provider with whom Legal
                Remit works to offer our remittance service.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Unconfirmed Transaction Status”</b> refers to the money
                transfer order from the customers whose money is yet to be
                received in our given bank account.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Confirmed Transaction Status”</b> refers to the money
                transfer orders from customers, whose funds are reflected and
                confirmed by Legal Remit. These transactions are now on the way
                to pay the nominated beneficiary.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Delivered Transaction Status”</b> refers to the money
                transfer orders which are already delivered to the recipient’s
                account or the recipient received the money
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Account Details Mismatch”</b> refers to the money transfer
                orders with an invalid recipient’s bank or wallet details
                provided by the sender to Legal Remit.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Tracking”</b> refers to the method of tracking transaction
                status offered by Legal Remit to keep customers updated about
                the transaction.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Purpose of transfer”</b> refers to the reason you wish to
                send money to the recipient.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Real-time payment”</b> refers to the instant payment to the
                nominated beneficiary or nominated beneficiary account.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Service Charge”</b> refers to the charge you need to pay for
                using our service. Service charges are subject to change without
                prior notice. Our service charge may vary depending on your
                preferred delivery method and preferred payment method.
              </p>

              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                Poli Payment processing fees: You agreed to pay Legal Remit
                processing fees for the POLI Payments under these terms and
                conditions. The amount will be charged on top of your money
                transfer order. We display the exact amount of charges while
                making a transaction using Poli payment.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                Debit Card processing fees: You agreed to pay Legal Remit a
                debit card processing fee by accepting these terms and
                conditions. The amount will be charged on top of your money
                transfer order. We display the exact amount of charges while
                making a transaction using a Debit Card. Debit card fees are
                always applied to each amount on a % basis.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                Credit Card Processing Fees: You are agreed to pay Legal Remit
                credit card processing fees by accepting these terms and
                conditions. The amount will be charged on top of your money
                transfer order. We display the exact amount of charges while
                making a transaction using Credit Card. Credit card fees will be
                applied to each amount on a % basis. Please be informed that
                credit card processing fees are generally higher.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                Please note that all service charge is inclusive of GST.
              </p>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“Exchange rate”</b> refers to the published rate on our
                mobile application and website as per the market standard.
              </p>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>“KYC”</b> Know Your Customers refers to the personal details
                you are required to provide while registering your account for
                verification purposes. These include but are not limited to your
                Full Name, Your contact details, your residential address, and
                government-issued ID either a passport or an Australian driving
                license.
              </p>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Profile"</b> refers to your registered account details with
                Legal Remit.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Additional Documents"</b> refers to any types of documents
                that might be required for the verification process. We may
                request additional documents at any time. You are obliged to
                provide the necessary documents for your KYC verification and
                the verification of the source of wealth and source of funds.
              </p>
            </div>
            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                Note 1. All customers are required to send us an address
                proof document upon their registration.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                2. For any amount more than $10,000 in a 30-day
                period, you must provide us with your recent pay slips, bank
                statement, or source of funds such as loan, sales of property,
                bonus, incentives, etc. We may request you to provide us with
                your bank statement and pay slips for any amount for compliance
                purposes.
              </p>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Transaction Limit"</b> refers to the limit given to the size
                and number given to you by meeting the regulatory requirements.
              </p>
              <ol className="nested-ordered-list ps-4">
                <li>
                  <small className="text-black fs-6">Daily Limit:</small> You are allowed to send $10,000 in a transaction, and $30,000 in a day. However, you are required to provide us with your Bank statement and pay slips as we requested.
                </li>
                <li>
                  <small className="text-black fs-6">Weekly Limit:</small> You are allowed to send $30,000 in a week.  However, you are required to provide us with your Bank statement and pay slips as we requested.
                </li>
                <li>
                  <small className="text-black fs-6">30 Days Limit:</small> You are allowed to send $35,000 in a month.  However, you are required to provide us with your Bank statement and pay slips as we requested. 
                </li>
                <li>
                  <small className="text-black fs-6">90 Days Limit:</small> You can send $45,000 every 90 days.  However, you are required to provide us with your Bank statement and pay slips as we requested.
                </li>
                <li>
                  <small className="text-black fs-6">180 Days Limit:</small> You are allowed to send $55,000 every 180 days. However, you are required to provide us with your Bank statement and pay slips as we requested. 
                </li>
                <li>
                  <small className="text-black fs-6">365 Days Limit:</small> You are allowed to send $60,000 every 365 days.  However, you are required to provide us with your Bank statement and pay slips as we requested. 
                </li>
              </ol>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6 mt-3">
                <b>"Rewards and Benefits"</b> refer to the various kinds of offers and schemes we bring on different occasions.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Referrer"</b> refers to our existing customers who can refer their family and friends to use Legal Remit’s service. 
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Referee"</b> refers to a new customer who uses our service with reference to existing customers. In return, both will be awarded a reward. Rewards may vary from time to time.  
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Promo Code" refers </b> to the different kinds of codes we
                use for promotions with various benefits and a fixed validation
                period.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Cash Back"</b> refers to the cash value Legal Remit offers
                in certain promotion campaigns against the use of Legal Remit
                services or receiving cash back from affiliation with our
                partner's brands and services.
              </p>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Reward Points"</b> refers to the earned points every user are entitled to against their transaction value and bonus points against the number of transaction they made. Such points can be redeemed in the future. 
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Redemption of Points"</b> refers to the method of converting virtual rewards points to a cash value, or any other kind of value such as discount, or allocated loyalty benefits. 
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Receiving Country"</b> refers to the country where the recipient receives money or made a utility payment using the Legal Remit service. 
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Delivery Method"</b> refers to the payment mode you choose while sending to your beneficiary. We provide different ways of delivery methods (bank deposit, Cash-Pickup, Wallet Top-up, and Utility Bill payment). 
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                Bank deposit- this method refers to a direct credit system to your nominated beneficiary bank account overseas. 

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
              Cash Pickup- Your recipient can receive cash in Nepal from our 10000+ paying agents.  Your receivers should go to agents with valid IDs and control numbers provided by Legal Remit. Information about agents can be found on our website.

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
              Wallet Top-up- refers to the direct credit system to your nominated wallet account. 

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
              Utility Payment- refers to the payment option for the utility bills such as electricity, internet, insurance premium, and mobile recharge in Nepal. 

              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Delivery Time"</b> refers to the time that your beneficiary receives the money overseas.
              </p>
              <p className="fs-6">
              The delivery time mentioned on our website is “average standard time” it might vary due to various reasons. 

              </p>
              <ol className="nested-ordered-list ps-4">
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                  <small className="text-black fs-6">Working Hours:</small>In Australia, you can process sending money 24/7 through our website and it will be delivered 24/7 in Nepal under normal circumstances.  however, it may take a longer time in case of a system error or the unavailability of the banking service in Nepal. Our service time will depend on the bank’s opening hours and the availability of the bank’s service. 
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                  <small className="text-black fs-6">
                    {" "}
                    Public Holidays and Weekends:
                  </small>{" "}
                  you can process sending money through our website and mobile application even on public holidays and weekends. 99% of transactions are credited in real-time, however, failed transactions will be delivered on the next working day when banks open in Nepal. 
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                  <small className="text-black fs-6">
                    Reversal of Payment:
                  </small>{" "}
                  For bank transfer, if your beneficiary account detail is wrong, the transaction will be rejected. If you failed to provide the correct bank details your transaction will be reversed. We need to amend the correct account details in the system again. So, in this scenario delivery time could be longer. 
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                  <small className="text-black fs-6">ID Verification:</small>{" "}
                  Your transaction will be processed only after successful verification of your identity known as KYC. 
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                  Your money order will be processed only after your money is
                  received in our account.
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                  For the cash pick-up, the receiver should have a valid ID used
                  in Nepal such as a driving license, citizenship of Nepal,
                  voting ID, and Pan Card. The name of the receiver should be
                  accurately matched with the ID, otherwise, they cannot receive
                  the money.
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                  Legal Remit reserves all the rights including but not limited
                  to canceling, stopping, holding, or reversing your transaction
                  at any time. subject to regulatory requirements.
                </li>
              </ol>
            </div>

            <div className="mt-3">
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Working Days"</b> refer to any day Legal Remit or any of our
                partners open for the delivery of the service, which is
                executing your transaction request as per your instruction.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Transaction Request"</b> refers to any type of money
                transfer order generated from the Legal Remit website or mobile
                application. This is also known as a money transfer instruction.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                <b>"Local Taxes"</b> refer to any applicable taxes on your money
                transfer.
              </p>
            </div>

            <div>
              <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 ">
                3. Rights and Responsibilities
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6 ">
                By accepting terms and conditions, you agreed to follow terms
                and conditions.
              </p>
              <p className="text-justify responsiveFontLarge text-black first fs-6 ">
                You agreed that
              </p>
            </div>

            <Row className="">
              <ol className="nested-ordered-list ps-4">
                <li className="fs-6 text-black my-2">
                  You will provide accurate and true personal information and
                  evidence of your identification information by providing
                  identification documents.
                </li>
                <li className="fs-6 text-black my-2">
                  You will not make more than one account in our system without
                  our permission
                </li>
                <li className="fs-6 text-black my-2">
                  You will not provide any false or misleading information.
                </li>
                <li className="fs-6 text-black my-2">
                  You will provide any additional information or documents if we
                  request them.
                </li>
              </ol>
              <ul className="round ps-4">
                <li className="fs-6 text-black my-2">
                  When you are using the Service under these Terms and
                  Conditions, it is your responsibility to make sure all the
                  details are accurate before submitting. Once a transaction
                  request has been received it is not normally possible to
                  change any details of that transaction request. You will be
                  given the opportunity to confirm the transaction request
                  before submission and you must check the details carefully.
                </li>
                <li className="fs-6 text-black my-2">
                  Legal Remit reserves all the rights to your transaction and
                  validation of your profile. We reserve the right to review
                  your profile for the validation process, while doing so, we
                  can ask for further details such as bank statements, utility
                  bills/Employment letters/pay slips for address proof if
                  needed. You are required to provide accurate details to
                  complete your profile. If we think the information, you
                  provide is not enough or right, we may refuse to provide the
                  service you have requested, and we will refund your amount. It
                  may take up to 7 business days to refund your money.
                </li>
                <li className="fs-6 text-black my-2">
                  We may refuse or cancel transaction requests or transactions
                  from certain senders or to certain receivers, including but
                  not limited to entities and individuals on restricted or
                  prohibited lists issued by any government authorities to
                  comply with anti-money laundering or counter-terrorism
                  financing laws and regulations. We may refuse to process a
                  transaction funded from a certain Payment Instrument where we
                  have reason to believe the security of the Payment Instrument
                  has been compromised or where we suspect the unauthorized or
                  fraudulent use of the Payment Instrument.
                </li>
                <li className="fs-6 text-black my-2">
                  Regular KYC update- Clients must update their KYC when their
                  ID expired if they migrate to a new place and their contact
                  details change. Clients must use only one email and one phone
                  number in an account, we won’t allow you to make multiple
                  accounts with the same email and phone number.
                </li>

                <li className="fs-6 text-black my-2">
                  One customer is allowed to have a single account only. Our
                  automated system will identify and blacklist you if it
                  identifies you making a duplicate account.
                </li>

                <li className="fs-6 text-black my-2">
                  Type of identification document- we accept passports,
                  Australian driver's licenses, and Australian photo IDs for
                  primary documents, and we can ask for additional documents
                  such as bank cards, Medicare cards utility bills, bank
                  statements, employment letters, and so on.
                </li>
                <li className="fs-6 text-black my-2">
                  Validation of ID- The date of expiry on your ID should be at
                  least a week at the time of the transaction, but you need to
                  update your valid ID again for the next transaction.
                </li>
                <li className="fs-6 text-black my-2">
                  Transaction submission for payment- Once your funds are
                  received in our bank account, your transaction will be
                  eligible for payment in Nepal.
                </li>
                <li className="fs-6 text-black my-2">
                  Receiver’s details- The sender must provide the correct
                  address, relationship, and contact number of the receiver and
                  the purpose of the transfer.
                </li>
                <li className="fs-6 text-black my-2">
                  If there is any issue in the system of Legal Remit and its
                  partner banks, we may not be able to deliver your money on a
                  real-time basis. Sometimes real-time payment systems might be
                  down because of maintenance and upgrade of their system in
                  banks in Nepal, so, we may use alternative payment gateways,
                  which may not have real-time delivery service.
                </li>
                <li className="fs-6 text-black my-2">
                  Sometimes there may be some system errors in certain banks,
                  which results in rejecting the transactions, so, we may ask
                  customers to provide an alternative bank detail, if they got
                  another option. In this scenario, the estimated delivery time
                  will be longer than usual.
                </li>
                <li className="fs-6 text-black my-2">
                  Exchange rate- We reserve all the right to exchange rate. We
                  update the exchange rate from time to time as per
                  international standards.
                </li>
                <li className="fs-6 text-black my-2">
                  Promo code- We generate random codes for many promotional
                  plans and activities with certain rewards, which will be valid
                  for a certain period. Customers can use one promo code for one
                  transaction only.
                </li>
                <li className="fs-6 text-black my-2">
                  Referrer and referee- When the referrer refers to a new
                  customer, the referee will be awarded rewards in his/her first
                  transaction. When the referee’s money is delivered, the
                  referrer will be notified about their rewards and their
                  validity period. The information can be found in the “refers
                  and rewards” section in your profile for all rewards and
                  benefits you have.
                </li>
              </ul>
            </Row>

            <div>
              <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 ">
                4. Conditions for Cash Pickup
              </p>
            </div>

            <Row className="">
              <ul className="round ps-4">
                <li className="fs-6 text-black my-2">
                  Upon Acceptance of a Transfer, the Recipient may collect the
                  received amount from a Legal Remit agent during the agent’s
                  operating hours, subject to local restrictions and compliance
                  with regulatory requirements.
                </li>
                <li className="fs-6 text-black my-2">
                  The Sender is responsible for providing the control number
                  when the money transfer order is ready to collect. The control
                  number can be found on tracking and invoice as soon as your
                  transaction is confirmed.
                </li>
                <li className="fs-6 text-black my-2">
                  The sender is responsible for notifying the recipient to
                  collect money from the nearest Legal Remit agent.
                </li>
                <li className="fs-6 text-black my-2">
                  To receive the money, the recipient is responsible to identify
                  themselves by providing a government-issued identification
                  document of the receiving country.
                </li>
                <li className="fs-6 text-black my-2">
                  The sender is responsible for maintaining the privacy of your
                  money transfer order and would not disclose the control number
                  (the transaction reference number) to any third party.
                </li>
                <li className="fs-6 text-black my-2">
                  The sender is responsible to ensure all the details required
                  for the cash-pickup transaction are correct and exactly shown
                  in the government-issued ID, including the recipient’s name
                  and other relevant details.
                </li>
              </ul>
            </Row>

            <div>
              <div>
                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 ">
                  5. Conditions for Bank deposit
                </p>
              </div>

              <Row className="">
                <ul className="round round ps-4">
                  <li className="fs-6 text-black my-2">
                    Upon the delivery of your money transfer order, it will be
                    available instantly in your recipient’s bank account and
                    available to use. 99% of your money transfer orders are
                    completed in real-time.
                  </li>
                  <li className="fs-6 text-black my-2">
                    The sender is responsible for providing the correct details
                    of the recipient.
                  </li>
                  <li className="fs-6 text-black my-2">
                    Incorrect account details of the beneficiary may lead to the
                    transaction being delivered to the wrong person or delay in
                    the process. Such an amount is irrevocable.
                  </li>
                  <li className="fs-6 text-black my-2">
                    All successful transactions cannot be reversible; hence,
                    this is the sender’s responsibility to provide us with the
                    correct details of the recipient.
                  </li>
               
                  <li className="fs-6 text-black my-2">
                    This is the sender’s responsibility to notify the
                    beneficiary about the transaction they made.
                  </li>
                  <li className="fs-6 text-black my-2">
                    Although bank account deposit is available 24/7 in
                    real-time, some banks may terminate or stop providing
                    service during non-banking hours due to various reasons such
                    as scheduled maintenance, unexpected system error, security
                    concerns, etc.
                  </li>
                  <li className="fs-6 text-black my-2">
                    In case of the wrong account details, the sender is
                    responsible to send Legal remit the correct account details
                    for the amendment.
                  </li>
                </ul>
              </Row>
            </div>
            <div>
              <div>
                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 ">
                  Conditions for Wallet Top-up
                </p>
              </div>

              <Row className="">
                <ul className="round round ps-4">
                  <li className="fs-6 text-black my-2">
                    Upon the successful completion of your transaction, the
                    money will be available instantly in the recipient’s wallet
                    account in usable form.
                  </li>
                  <li className="fs-6 text-black my-2">
                    This is the sender's responsibility to provide us with the
                    correct wallet details of the recipient.
                  </li>
                  <li className="fs-6 text-black my-2">
                    Incorrect account details of the beneficiary may lead to the
                    transaction being delivered to the wrong person or delay the
                    process. Such an amount is irrevocable.
                  </li>
                  <li className="fs-6 text-black my-2">
                    Although bank wallet top-up is available 24/7 in real-time,
                    some wallets may terminate or stop providing service during
                    non-banking hours due to various reasons such as scheduled
                    maintenance, unexpected system error, security concerns,
                    etc.
                  </li>
                </ul>
              </Row>
            </div>
            <div>
              <div>
                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 ">
                  Conditions for Utility Bill Payment in Nepal
                </p>
              </div>

              <Row className="">
                <ul className="round round ps-4">
                  <li className="fs-6 text-black my-2">
                    Upon the acceptance of your utility bill payment request,
                    your bill will be cleared instantly. However, it may take
                    some time to reflect on your utility provider system.
                  </li>
                  <li className="fs-6 text-black my-2">
                    Nepal Electricity Authority (NEA) offers a bill payment
                    facility between (10 AM NST to 11:59 PM NST) every day.
                  </li>
                  <li className="fs-6 text-black my-2">
                    This is your responsibility to provide correct details and
                    validate, verify, and confirm your bill amount and your
                    recipient.
                  </li>
                  <li className="fs-6 text-black my-2">
                    This is your responsibility to provide all correct and
                    relevant references to the utility bill.
                  </li>
                  <li className="fs-6 text-black my-2">
                    Payment made to the wrong providers or with the wrong
                    reference is not irrevocable.
                  </li>
                </ul>
              </Row>
            </div>
            <div>
              <div>
                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 ">
                  Refund and Cancellation
                </p>
              </div>

              <Row className="">
                <ul className="round ps-4">
                  <li className="fs-6 text-black my-2">
                    Upon the confirmation of your money transfer order, the
                    transaction is irreversible. However, you may send a
                    cancellation request, if the transaction has not been
                    delivered yet or not collected by the recipient.
                  </li>
                  <li className="fs-6 text-black my-2">
                    Customers can send cancellation requests via email or the
                    customer service helpline. We highly encourage customers to
                    call us directly on our customer support helpline for quick
                    action.
                  </li>
                  <li className="fs-6 text-black my-2">
                    If the money has not been delivered yet, we process your
                    refund upon your request.
                  </li>
                  <li className="fs-6 text-black my-2">
                    It may take up to seven business days for the reversal of
                    the funds to your account. However, some transactions may
                    take a longer time due to the regulatory requirement and
                    compliance process.
                  </li>
                  <li className="fs-6 text-black my-2">
                    The transaction amount will be refunded after all the dues
                    and liabilities with Legal Remit.
                  </li>
                  <li className="fs-6 text-black my-2">
                    We will charge merchant fees and other applicable fees in
                    case of the refund of transactions made from Poli, Debit
                    card, or Credit card.
                  </li>
                  <li className="fs-6 text-black my-2">
                    Payments from the wallet such as Google Pay, and Apple Pay
                    belong to your debit card and credit card payment. Hence the
                    merchant fees are applicable in the reversal of such
                    transaction.
                  </li>

                  <li className="fs-6 text-black my-2">
                    Refunds will be made to the same account where the fund was
                    initiated.
                  </li>

                  <li className="fs-6 text-black my-2">
                    We may request you provide us with an additional document
                    such as proof of the transfer from the account you request
                    for the refund.
                  </li>
                  <li className="fs-6 text-black my-2">
                    You are responsible for cooperation with our service team to
                    complete your refund on time.
                  </li>
                </ul>
              </Row>
            </div>
            <div>
              <div>
                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 ">
                  Condition for Exchange rate
                </p>
              </div>

              <Row className="">
                <ul className="round ps-4">
                  <li className="fs-6 text-black my-2">
                    The exchange rate is subject to change at any time without
                    prior notice.
                  </li>
                  <li className="fs-6 text-black my-2">
                    The exchange rate will be locked upon the successful
                    submission of your transaction request.
                  </li>
                  <li className="fs-6 text-black my-2">
                    The exchange rate is not changeable after a money transfer
                    order is created.
                  </li>
                  <li className="fs-6 text-black my-2">
                    The exchange rate will be locked for seven minutes once you
                    enter the send money section of the Legal Remit Mobile App
                    or the website. This feature is available to send money to
                    Nepal only.
                  </li>
                  <li className="fs-6 text-black my-2">
                    The available exchange rate on our website or mobile
                    application at the time of exchange rate is the current
                    exchange rate for the conversion.
                  </li>
                  <li className="fs-6 text-black my-2">
                    The available exchange rate on our website or mobile
                    application will be valid for 24 hours upon the submission
                    of your money transfer order.
                  </li>
                  <li className="fs-6 text-black my-2">
                    If funds are not received within 24 hours, the transaction
                    will be canceled automatically, and a new rate will be
                    applied for the new transaction.
                  </li>

                  <li className="fs-6 text-black my-2">
                    The locked rate with unconfirmed transactions is applicable
                    for that transaction only.
                  </li>
                </ul>
              </Row>
            </div>

            <div className="panel12">
              <div>
                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 ">
                  Referral and Rewards Program
                </p>

                <p className="text-justify responsiveFontLarge first text-black  uppercase  fs-6 ">
                  Please carefully read and understand the following terms and
                  conditions governing Legal Remit's Referral and Rewards
                  Program. By participating in the program, you agree to abide
                  by these terms and conditions.
                </p>
              </div>
              
              <ol className="nested-ordered-list">
                <li>
                  Referral Cash Rewards:
                  <ol>
                    <li>
                      The Referral Cash Rewards are available for a limited time
                      and must be used within the specified time frame. If the
                      reward is not used within the given time frame, it will
                      expire, and the reward value will no longer be available
                      for use.
                    </li>
                    <li>
                      The value of each referral cash reward may vary from time
                      to time based on our ongoing promotions or offers. The
                      specific reward value will be communicated to you at the
                      time of referral.
                    </li>
                    <li>
                      The validity period for each referral reward may differ.
                      Please refer to the communication you receive or check our
                      website for the specific validity period applicable to
                      your referral cash reward.
                    </li>
                    <li>
                      The redemption or any rewards or use of cash value is
                      capped at $5 per transaction. If you have $25 dollar value
                      in your Legal Remit app, you may need to use it in five
                      separate transaction to consume full value available in
                      your account which is $25 in this case.
                    </li>
                    <li>
                      Legal Remit reserves the right to alter the methods of
                      using referral rewards at any time without prior notice.
                      We may introduce new redemption options or modify existing
                      ones to enhance the program's effectiveness and benefits
                    </li>
                  </ol>
                </li>
                <li>
                  Redemption of Rewards:
                  <ol>
                    <li>
                      All rewards earned through the Referral and Rewards
                      Program will be distributed to be used in multiple
                      transactions instead of a one-time discount. The specific
                      usage requirements will be communicated to you at the time
                      of reward distribution.
                    </li>
                    <li>
                      For example, if you receive a $20 voucher as a reward, you
                      may be eligible to use it in one transaction, or you may
                      need to make multiple transactions to consume the full $20
                      reward value.
                    </li>
                    <li>
                    To use the value of the rewards, you must meet a minimum transaction amount threshold. For example, if the minimum threshold is set at $200, you can redeem and use the value of the rewards for transactions equal to or exceeding $200. If you send an amount lower than $200 in a transaction, you will not be able to redeem and use the cash balance of your rewards.
                    </li>
                    <li>
                      The rewards value is not redeemable for cash and can only
                      be used towards eligible transactions on the Legal Remit
                      platform.
                    </li>
                    {/* <li>
                      The rewards value is not redeemable for cash and can only
                      be used towards eligible transactions on the Legal Remit
                      platform.
                    </li> */}
                  </ol>
                </li>
                <li>
                  Points Redemption:
                  <ol>
                    <li>
                      Points earned through the Rewards Program can be redeemed
                      once they reach a value of $5 or higher.
                    </li>
                    <li>
                      You may redeem your accumulated points for various rewards
                      and benefits, such as discounts on future transactions,
                      exclusive promotional offers, or merchandise from our
                      partners.
                    </li>
                    <li>
                      The specific rewards available and the redemption process
                      will be outlined on our website and may be subject to
                      change at Legal Remit's discretion.
                    </li>
               
                  </ol>
                </li>

                <h5 className="purpleText py-4 fs-6">General Terms:</h5>

                <li>
                  Legal Remit reserves the right to modify or terminate the
                  Referral and Rewards Program at any time without prior notice.
                </li>
                <li>
                  Legal Remit shall not be liable for any losses or damages
                  incurred as a result of the program's modification,
                  termination, or any changes to the rewards or their redemption
                  methods.
                </li>
                <li>
                  The Referral and Rewards Program is subject to compliance with
                  all applicable laws and regulations. Legal Remit reserves the
                  right to disqualify participants who engage in fraudulent
                  activities or violate any of the program's terms and
                  conditions.
                </li>
                <li>
                  Legal Remit's decision regarding any aspect of the Referral
                  and Rewards Program, including eligibility, reward
                  distribution, redemption, and program modifications, is final
                  and binding.
                </li>
                <li>
                  Eligibility and Valid Referrals:
                  <ol>
                    <li>
                      To be eligible for the Referral and Rewards Program, both
                      the referrer and the referred person must have active
                      Legal Remit accounts in good standing.
                    </li>
                    <li>
                      The referred person must sign up for a Legal Remit account
                      using the referrer's unique referral link or code to
                      qualify for the referral rewards.
                    </li>
                    <li>
                      Referrals made between accounts held by the same
                      individual or multiple accounts created with the intent to
                      abuse the program will not be considered valid, and no
                      rewards will be granted for such referrals.
                    </li>
                  </ol>
                </li>
                <li>
                  Non-Transferability:
                  <ol>
                    <li>
                      Referral cash rewards and earned points are
                      non-transferable and cannot be exchanged for cash or
                      transferred to another Legal Remit account.
                    </li>
                    <li>
                      Rewards and points earned are specific to the account
                      holder and cannot be transferred to any other person or
                      account.
                    </li>
                  </ol>
                </li>
                <li>
                  Fraudulent Activities:
                  <ol>
                    <li>
                      Any fraudulent activities, including but not limited to
                      creating fake accounts, using misleading information, or
                      engaging in any form of unethical behavior to earn rewards
                      or points, will result in immediate disqualification from
                      the Referral and Rewards Program.
                    </li>
                    <li>
                      Legal Remit reserves the right to revoke any rewards,
                      points, or benefits earned through fraudulent activities
                      and take appropriate legal action if necessary.
                    </li>
                  </ol>
                </li>
                <li>
                  Modifications and Termination:
                  <ol>
                    <li>
                      Legal Remit reserves the right to modify, suspend, or
                      terminate the Referral and Rewards Program at any time
                      without prior notice.
                    </li>
                    <li>
                      In the event of program termination, all unredeemed
                      rewards and points will be forfeited.
                    </li>
                  </ol>
                </li>
                <li>
                  Privacy and Data Protection:
                  <ol>
                    <li>
                      By participating in the Referral and Rewards Program, you
                      agree that Legal Remit may collect, use, and process your
                      personal data for the purposes of administering the
                      program, tracking referrals, and providing rewards.
                    </li>
                    <li>
                      Legal Remit adheres to strict privacy and data protection
                      policies. For more information on how we handle personal
                      data, please refer to our Privacy Policy.
                    </li>
                  </ol>
                </li>
                <li>
                  Governing Law:
                  <ol>
                    <li>
                      The Referral and Rewards Program and these terms and
                      conditions shall be governed by and construed in
                      accordance with the laws of the jurisdiction where Legal
                      Remit operates. <br /> <br />
                      <small className="fs-6 text-black">
                        By participating in Legal Remit's Referral and Rewards
                        Program, you acknowledge that you have read, understood,
                        and agreed to these terms and conditions. If you have
                        any questions or require further clarification, please
                        contact our customer support team.
                      </small>
                    </li>
                  </ol>
                </li>
              </ol>
            </div>

            <div>
              <div>
                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 mt-3">
                  Our Responsibilities
                </p>
              </div>

              <Row className="">
                <ul className="round ps-3">
                  <li className="fs-6 text-black my-2">
                    Subject to these terms and conditions we are agreed to
                    provide a remittance service using our digital platform from
                    Australia to the rest of the World. Our service may not be
                    available in some parts or whole regions.
                  </li>
                  <li className="fs-6 text-black my-2">
                    We are not liable to execute your transaction if you failed
                    to provide evidence of your identification as to our
                    requirement or provided information is incomplete, or
                    incorrect, or if the sender’s activity is suspicious.
                  </li>
                  <li className="fs-6 text-black my-2">
                    We process transactions on our behalf; hence we are not
                    obliged to process your transaction if you failed to meet
                    our requirements or if we have a reason to deny your
                    transaction.
                  </li>
                  <li className="fs-6 text-black my-2">
                    Legal Remit reserve the right to terminate, cancel or break
                    this agreement because of abnormal or unforeseeable
                    circumstances outside our control where we could not avoid
                    breaking this agreement despite all efforts to the contrary
                  </li>
                  <li className="fs-6 text-black my-2">
                    Legal Remit won’t be liable for any incidental, indirect, or
                    consequential damages suffered by the Sender.
                  </li>
                  <li className="fs-6 text-black my-2">
                    The information available on our website and mobile
                    application regarding our services such as the availability
                    of a specific money transfer service and its delivery time
                    is quoted based on normal circumstances. We cannot guarantee
                    you an individual transaction.
                  </li>
                  <li className="fs-6 text-black my-2">
                    We send you updates about your transaction at each stage. We
                    send you the push notification and email notification on
                    your registered email upon successful submission of your
                    transaction request. We send you another notification on the
                    APP and email as soon as we confirm your transaction. We
                    send you the final notification by email, SMS to your
                    registered number, and a push notification on the APP as
                    well. We will send an SMS to notify your recipient to let
                    them know that they have received money from you. However,
                    these notifications are not guaranteed, and we may not be
                    able to provide such updates in different circumstances such
                    as system failure, server issues at the service provider
                    side, or any other unexpected issue that arises.
                  </li>

                  <li className="fs-6 text-black my-2">
                    We are committed to providing you with a 2-minute delivery
                    of your money transfer order in normal circumstances,
                    however, it may take longer than expected for some
                    transactions. We may not be able to provide you with two
                    minutes delivery in all individual transactions. This time
                    is estimated based on our current transaction processing
                    time and may change in the future without any prior notice.
                  </li>

                  <li className="fs-6 text-black my-2">
                    We are committed to offering 24/7 service all the time in a
                    usual operation situation. However, we may change, cancel,
                    or suspend our service at any time in some abnormal or
                    unforeseeable circumstances outside our control.
                  </li>

                  <li className="fs-6 text-black my-2">
                    Except for any liability that cannot be excluded by law, we
                    are not liable for anything whatever other clauses mean.
                    This clause overrides all other clauses of these terms and
                    conditions.
                  </li>
                </ul>
              </Row>
            </div>
            <div className="panel12">
              <div>
                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 ">
                  Dispute resolution clause:
                </p>

                <p className="text-justify responsiveFontLarge first text-black  uppercase  fs-6 ">
                  Legal Remit and its users must follow these dispute resolution
                  clauses and proceedings before having recourse to arbitration
                  or litigation.
                </p>
              </div>

              <small className="text-black fs-6 my-3 d-block bolder">Mediation:</small>
              <ol className="nested-ordered-list ps-4">
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The parties shall endeavour to settle any dispute arising out of or relating to this agreement, including with regard to its existence, validity, or termination through mediation administrated by Legal Remit’s meditation before having recourse to arbitration or litigation. 
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The mediation shall be conducted in accordance with the guidelines of Legal Remit’s mediation terms set out in this agreement.  
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The terms of the mediation are hereby incorporated into this agreement. 
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The clause shall survive termination of this agreement. 
                </li>
             
              </ol>

              <small className="text-black fs-6 my-3 d-block bolder">Conciliation:</small>
              <ol className="nested-ordered-list ps-4">
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The parties shall settle any dispute arising out of or relating to this agreement, through conciliation administrated by Legal Remit before having recourse to arbitration or litigation. 
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The Conciliation shall be conducted in accordance with the guidelines of Legal Remit’s Conciliation terms set out in this agreement. 
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The terms of conciliation are hereby incorporated into this agreement. 
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The clause shall survive termination of this agreement.
                </li>
             
              </ol>

              <small className="text-black fs-6 my-3 bolder d-block">Expert Determination:</small>
              <ol className="nested-ordered-list ps-4">
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The parties shall settle any dispute arising out of or relating to this agreement, through the expert determination team administrated by Legal Remit.
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The expert determination shall be conducted at 87 Anthony Rolfe Ave, Gungahlin ACT, 2912.
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The terms of the Rules are hereby deemed incorporated into this agreement.
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                This clause shall survive the termination of this agreement.
                </li>
             
              </ol>

              <small className="text-black fs-6 my-3 bolder d-block">Arbitration:</small>
              <ol className="nested-ordered-list ps-4">
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                Any dispute, controversy, or claim arising out of, relating to, or in connection with this agreement, including any questions regarding its existence, validity, or termination, shall be referred to and finally resolved by arbitration administered by Legal Remit.
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                The arbitration shall be conducted at 87 Anthony Rolfe Ave, Gungahlin ACT, 2912.
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                in accordance with Legal Remit’s Domestic Arbitration operating at the time the dispute is referred to Legal Remit
                </li>
                <li className="text-justify responsiveFontLarge first text-black fs-6 ">
                This clause shall survive the termination of this agreement.
                </li>
             
              </ol>

       
             
                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 mt-4">
                  Mediation followed by Expert Determination:
                </p>

                <small className="fs-6 text-black">
                  The parties shall endeavour to settle any dispute arising out
                  of or relating to this agreement, including with regard to its
                  existence, validity, or termination, by mediation administered
                  by Legal Remit followed by expert determination. ice.
                </small>

                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 mt-2">
                  Termination of this agreement
                </p>
                <ul className="round ps-4">
                  <li className="fs-6 text-black">
                    This agreement will be terminated as soon as your
                    transaction is completed. You will be no longer liable for
                    these terms and conditions thereafter.
                  </li>
                </ul>

                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 mt-2">
                  Data and Privacy
                </p>

                <ul className="round">
                  <li className="fs-6 text-black">
                    Collection of personal data: By law, we are required to
                    collect your personal details such as your full name,
                    contact details, current residential address, and a valid
                    government-issued ID. This information is mandatory and
                    required to fight against money laundering and keep our
                    country safe.
                  </li>
                  <li className="fs-6 text-black">
                    Verification of data: By law, we are obliged to verify your
                    given personal data, in doing so we pass your data to DVS
                    and Austrac authorized verification agency. They use these
                    data for verification purposes only and there is no
                    commercial relationship with your personal data.
                  </li>
                  <li className="fs-6 text-black">
                    Data Disclosure: Except for any government body that cannot
                    be excluded by law or for the purpose of meeting the
                    regulatory requirement, we do not disclose your personal
                    data to anyone. Any of your personal information will not be
                    shared with any third party other than mentioned in this
                    clause.
                  </li>
                </ul>

                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 mt-2">
                  Change in the terms and conditions
                </p>

                <small className="fs-6 text-black">
                  Legal Remit may review, update, and modify these terms and
                  conditions to meet the regulatory requirement and follow the
                  local laws and jurisdiction.
                </small>

                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 mt-2">
                  Governing Law
                </p>

                <small className="fs-6 text-black">
                  These terms and conditions are governed by the law of the ACT
                  government. Acceptance of this agreement enforces you and
                  Legal Remit to be obliged exclusively with the law of ACT and
                  the federal government.
                </small>

                <p className="text-justify responsiveFontLarge first purpleText  uppercase  fs-6 mt-2">
                  Agreement:
                </p>

                <small className="fs-6 text-black">
                  By accepting this agreement, you, and Legal Remit both agreed
                  to follow these terms and conditions thoroughly.
                </small>
            
            </div>
          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}
      </section>
    </>
  );
}
