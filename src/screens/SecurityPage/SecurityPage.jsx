import React from "react";
import "./SecurityPage.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { useLocation } from "react-router-dom"; // Import the useLocation hook

export default function SecurityPage() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/help-resources";

  return (
    <>
      <section className="abtPage">
      {hideNavbarAndFooter ? null : <NavBar></NavBar>}
        <Container className={`bg-white mb-5 ${hideNavbarAndFooter ? 'mt-0' : 'mt-5 rounded-4 '}`}>
          <div  className={`innerAbtPage ${hideNavbarAndFooter ? 'pt-0 ps-0' : 'p-5'}`}>
            <h2 className={`bolder purpleText  ${hideNavbarAndFooter ? 'text-start' : 'text-center'}`} >Security</h2>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
              “Our Top Priority in the Digital World”
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-3">
              In today's digital age, staying safe online is a paramount
              concern, especially with the rise of cybercrimes and data
              breaches. At Legal Remit, we take the security of our customers
              seriously, and it is our unwavering commitment to ensure that you
              have a safe and secure experience while using our services. We
              understand the potential consequences of inadequate online
              security, and that is why we have implemented stringent security
              measures to safeguard your data and protect your activities on our
              platform.
            </p>



            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Robust Security Procedures:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Our dedication to security begins with the implementation of robust security procedures. We leave no stone unturned in safeguarding your sensitive information, including personal data, financial details, and transaction history. Our security protocols are designed to meet the highest industry standards, ensuring that your data is kept confidential and protected from unauthorized access.

              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
              Encryption Technology:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              To fortify your security further, Legal Remit employs state-of-the-art encryption technology. All data transmitted through our platform is encrypted, making it nearly impossible for cybercriminals to intercept and decipher your information. This means that your communications, transactions, and any sensitive data shared with Legal Remit remain encrypted and private, assuring you of a safe and secure online environment.

              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Secured Data Storage:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                At Legal Remit, data security is not limited to transmission
                alone. We ensure that your information is securely stored on our
                servers. Our data storage facilities employ stringent access
                controls, firewalls, and intrusion detection systems to prevent
                unauthorized access to your data. With our robust data storage
                practices, you can trust that your personal information is
                protected and safeguarded at all times.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Continuous Monitoring and Surveillance:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                To proactively safeguard your interests, Legal Remit maintains a
                constant vigil over our systems and platform. We have real-time
                monitoring and surveillance in place to detect and respond
                swiftly to any potential security threats. Our dedicated team of
                security experts diligently assesses and addresses any
                suspicious activities, ensuring that you can transact with
                confidence and peace of mind.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Employee Training and Awareness:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                We believe that security is a collective effort, and it starts
                with our employees. At Legal Remit, all our staff undergo
                rigorous security training and awareness programs. They are
                educated on the best practices in information security and are
                regularly updated on the latest cybersecurity threats and
                trends. By instilling a security-first culture within our
                organization, we ensure that every member of the Legal Remit
                team is committed to upholding your safety and privacy.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Constant Improvement and Compliance:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                In the ever-evolving landscape of cybersecurity, Legal Remit is
                dedicated to continuous improvement. We regularly assess and
                enhance our security measures to stay ahead of emerging threats
                and vulnerabilities. Additionally, we remain compliant with
                relevant data protection and privacy regulations to ensure that
                your information is handled with the utmost care and adherence
                to legal standards.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                At Legal Remit, your security is not just a checkbox; it is our
                fundamental principle and commitment. We understand the
                potential impact of cybercrimes and the importance of protecting
                your data and activities online. Our stringent security
                procedures, advanced encryption technology, secured data
                storage, continuous monitoring, and employee awareness efforts
                all come together to provide you with a safe and secure
                experience while using our platform.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Trust Legal Remit to keep you protected as you make your
                financial transactions with confidence, knowing that your safety
                and security are our topmost priorities.
              </p>
            </div>

            {/* <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                How to Distinguish Legal Remit from Scams: Ensuring Your Safety
                and Security
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                As a responsible and customer-centric remittance company, Legal
                Remit is deeply committed to protecting our valued users from
                potential scams and fraudulent activities. We understand the
                importance of safeguarding your financial transactions and
                personal information. To help you identify and differentiate
                between Legal Remit and scams, we have compiled essential
                guidelines and best practices that you can follow for a secure
                online experience.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                1. Verify Domain and Links:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Always ensure that you are visiting our official websites:
                legalremit.com and legalremitnepal.com.au. Be cautious of any
                links that lead you to other domains, and immediately cease
                further interactions if this occurs. To download our mobile
                application, search for "Lumbini Group" on the App Store or Play
                Store, as we offer our services under this name.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                2. Validate Logo and App Icon:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Before proceeding with any transactions or interactions, verify
                that the displayed logo and app icon match our official Legal
                Remit branding. Consistency in branding elements is a key
                indicator of authenticity.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                3. Communication Practices:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Remember that Legal Remit will never contact you from a private
                number. We will never request your passwords or OTPs (One-Time
                Passwords) through calls, emails, or messages. Be cautious of
                any unsolicited communication asking for sensitive information,
                and refrain from sharing such details.
              </p>
            </div>
            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                4. Links and Rewards:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Legal Remit will never send you third-party links to click on.
                Our official links will consist of our trusted domains:
                legalremit.com and legalremitnepal.com.au. We will not send you
                links to claim rewards or prizes won in our campaigns. Any
                announcements regarding rewards will be made through mobile
                notifications and posted on our verified social media pages,
                including Facebook and Instagram.
              </p>
            </div>
            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                5. Secure Transactions:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Legal Remit will never ask you to transfer money to an
                individual account. Always ensure that you are making payments
                into our account using the provided payment methods on our
                official platform.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                6. OTP Verification:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                All OTPs sent to you by Legal Remit will clearly identify our
                name. Never share OTPs, passwords, or PINs with anyone, as these
                are sensitive credentials meant for your use only.
              </p>
            </div>
            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                7. Biometric Authentication:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                For an added layer of protection, activate biometric
                authentication if available on your device. This will enhance
                the security of your Legal Remit account and ensure that only
                you can access it.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                8. Password Protection:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Maintain a strong password for your Legal Remit account. Your
                password should be a minimum of 8 characters and include
                uppercase letters, lowercase letters, special characters, and
                numbers. Change your passwords regularly to enhance security.
              </p>
            </div> */}
          </div>
        </Container>
        {hideNavbarAndFooter ? null : <Footer></Footer>}
      </section>
    </>
  );
}
