import React from 'react'
import './WhatWeDo.scss'
import NavBar from '../Home/Navbar/Navbar'
import Footer from '../Home/Footer/Footer'
import { Container,Row } from 'react-bootstrap'
import mission from '../../assets/images/mission.svg'
import vision from '../../assets/images/vision.svg'
import objective from '../../assets/images/objective.svg'

export default function WhatWeDo() {
  return (
        <>
            <section className='abtPage'>
            <NavBar></NavBar>
                <Container className='bg-white mt-5 rounded-4 mb-5'>
                    <div className='innerAbtPage p-5'>
                        <h2 className='bolder purpleText text-center'>What We Do</h2>

                      

                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-3'>
                        What we do: Simplifying Cross-Border Payments with Legal Remit
                        </p>
                        <p className='text-justify responsiveFontLarge first purpleText fs-6  pt-1'>
                       Introduction:
                        </p>
                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        Legal Remit is a leading provider of cross-border payment solutions, dedicated to simplifying and streamlining international transactions for individuals and businesses. With our range of services and advanced technology, we aim to make cross-border payments simple, secure, and efficient. Whether you need to send money to loved ones overseas, make payments to international business partners, or settle utility bills, Legal Remit has got you covered.
                        </p>

                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        Bank Transfers: Secure and Efficient International Payments in minutes. 
                        </p>

                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        One of our core offerings is the electronic bank transfer service. Bank transfers are widely used in the remittance industry due to their reliability and convenience. At Legal Remit, we prioritize the security of your funds and employ advanced encryption techniques to ensure the confidentiality and integrity of your transactions. Our bank transfers are completely electronic, eliminating the need for physical paperwork and reducing the risk of loss or theft.
                        </p>


                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        When you choose Legal Remit for your bank transfers, you can expect prompt and efficient delivery. In most cases, our bank transfers are completed within minutes or less, allowing your recipients to access the funds quickly. However, it's important to note that the exact delivery time may vary depending on the recipient country and its banking system. We provide estimated delivery times for information purposes, but we cannot guarantee specific delivery times in all circumstances.
                        </p>


                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        Cost-effectiveness is another advantage of using Legal Remit for bank transfers. Compared to traditional methods such as using swifts and other competitors, our bank transfers are typically more cost-effective. However, it's essential to consider that the transaction cost is dependent on the receiving country. To get a clear understanding of how we charge for bank transfers, you can visit our website and refer to the "send money" page. Here, you'll find country-specific information about charges and standard delivery times.
                        </p>


                        <div className='mt-5'>
                            <h5 className='purpleText'>
                            Wallet Top-up: Instant Access to Funds
                            </h5>
                            <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                            In today's digital age, electronic wallets have gained popularity as a convenient and secure way to manage funds. At Legal Remit, we offer a wallet top-up service that allows you to add funds to your digital wallet effortlessly. By utilizing secure and encrypted remittance channels, we ensure the safety of your transactions.
                        </p>
                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        When you choose wallet top-up through Legal Remit, you can enjoy the benefits of instant access to your funds. In normal circumstances, most wallet transactions are completed within minutes, providing you with swift and efficient fund management. However, it's important to note that the delivery time for wallet top-ups may vary based on the recipient country and the availability of their service. Rest assured, we strive to minimize any potential delays and provide a seamless experience.
                        </p>
                        </div>
                        <div className='mt-5'>
                            <h5 className='purpleText'>
                            Cash Pickups: Traditional and Reliable
                            </h5>
                            <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                            While digital transactions are becoming increasingly prevalent, cash pickups remain an essential method of remittance, particularly in regions with limited access to digital infrastructure. Legal Remit recognizes the importance of cash pickups and supports this traditional remittance approach.
                        </p>
                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        Cash pickups are known for their speed and reliability. When you choose Legal Remit for cash pickups, you can be confident that your funds will reach the intended recipients quickly. The delivery time for cash pickups is dependent upon the working hours of the destination country and the availability of the service. Rest assured, our team works diligently to ensure that your funds are available for pickup at the earliest opportunity.
                        </p>
                        </div>
                        <div className='mt-5'>
                            <h5 className='purpleText'>
                            Utility Bill Payment: Streamlining Your Expenses
                            </h5>
                            <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                            Legal Remit has taken a pioneering role in the Nepalese market by integrating utility bill payments into the remittance channel. We understand the importance of timely bill payments and aim to make the process more convenient for our customers.
                        </p>
                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        Through our platform, you can easily check and pay your utility bills in real-time. We have partnered with common service providers in Nepal to offer you a streamlined bill payment experience. Additionally, Legal Remit goes a step further by enabling the payment of insurance premiums through our platform. This comprehensive service ensures that you can conveniently manage your expenses while leveraging the benefits of international remittance.
                        </p>
                        </div>
                        <div className='mt-5'>
                            <h5 className='purpleText'>
                            B2B Payments: Facilitating International Business Transactions
                            </h5>
                            <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                            For businesses engaged in international trade, Legal Remit offers a range of services to facilitate smooth and efficient B2B payments. We understand the challenges businesses face when it comes to cross-border transactions, and our goal is to alleviate that burden.
                        </p>
                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        Legal Remit provides businesses with a low-cost, secure, and reliable platform to make payments to their business partners, service providers, and suppliers overseas. By utilizing our services, you can enjoy competitive conversion rates, lower transaction costs, and on-time delivery of your payments. This allows you to focus more on your core business operations while leaving the complexities of international payments to us.
                        </p>
                        </div>
                        <div className='mt-5'>
                            <h5 className='purpleText'>
                            P2B Payments: Convenience for Individual Customers
                            </h5>
                            <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                            Legal Remit also caters to individual customers who need to make payments to businesses in Nepal. Our platform offers a user-friendly interface and cost-effective solutions, allowing you to save money on each transaction.
                        </p>
                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        Whether you need to pay for services rendered or settle bills with local businesses, Legal Remit provides a secure and efficient platform for P2B payments. Our low transaction costs, higher conversion rates, and timely delivery of payments ensure a seamless experience for individual customers. Say goodbye to the hassles of traditional payment methods and embrace the convenience of Legal Remit.
                        </p>
                        </div>

                        <div className='mt-5'>
                            <h5 className='purpleText'>
                            Important Considerations and Final Thoughts:
                            </h5>
                            <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                            When using Legal Remit's services, it's crucial to ensure the accuracy of the provided details. Any errors in bank information or recipient details may result in delays or unintended payments. It's the sender's responsibility to verify and confirm the correctness of all provided information before initiating a transaction.
                        </p>
                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        Additionally, it's important to note that all successful transactions made through Legal Remit are irreversible. Once a transaction is completed, it cannot be reversed. We strongly advise our customers to exercise caution and verify all transaction details before proceeding.
                        </p>
                        <p className='text-justify responsiveFontLarge first text-black fs-6  pt-1'>
                        In conclusion, Legal Remit is committed to simplifying cross-border payments through secure, efficient, and cost-effective solutions. Whether you need to send money to loved ones, pay international bills, or make business transactions, our comprehensive range of services caters to your specific needs. Trust Legal Remit to handle your international transactions, allowing you to focus on what matters most to you. Experience the convenience of Legal Remit and enjoy seamless cross-border payments.

                        </p>
                        </div>
                    </div>
                </Container>
            <Footer></Footer>
            </section>
        </>
  )
}
