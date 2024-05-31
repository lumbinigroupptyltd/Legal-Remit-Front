import React from "react";
import "./AboutUsPage.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";

const AboutUsPage = () => {
  return (
    <>
      <section className="abtPage">
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage p-5">
            <h2 className="bolder purpleText text-center">About Us</h2>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-3">
              Welcome to Legal Remit!
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-3">
              Legal Remit is a fully owned subsidiary company of Lumbini Group
              Pty Ltd, established in 2019 with a clear vision in mind - to make
              money transfers seamless and hassle-free. Our story began with
              three friends who came to Australia from Nepal in the early 2000s.
              As students, they experienced firsthand the challenges and
              frustrations of sending money back home. Many students, including
              one of our co-founders, fell victim to unreliable informal
              channels that made money transfers a headache. Even traditional
              bank transfers were slow, taking up to a week for the money to
              reach its destination. With high fees and unattractive exchange
              rates, banks made the process even more discouraging.
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Over time, technology evolved, innovation flourished, and
              countless remittance companies entered the market. However,
              despite these advancements, sending money to Nepal remained an
              arduous task until 2019. It was at this juncture that our team
              resolved to leverage technology and innovation to make a
              difference.
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              In September 2019, Legal Remit Nepal introduced its groundbreaking
              real-time service for Nepal. Our innovative platform allows people
              to send money from Australia to Nepal in less than 2 minutes. Yes,
              you read that right - 2 minutes! Our team worked tirelessly to
              develop a robust infrastructure that ensures swift and secure
              money transfers. Through cutting-edge technology and strategic
              partnerships, we overcame the traditional barriers and streamlined
              the process, providing an unprecedented level of convenience to
              our customers.
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              But we didn't stop there. We went on to develop a system that
              enables 24/7 money deposits into our customers' bank accounts. We
              understood that flexibility and accessibility were paramount to
              our customers, and we strived to meet their needs. With our
              advanced technology and efficient processes, customers can now
              receive their funds at any time, day or night, even on weekends
              and holidays. This innovation has been a game-changer, eliminating
              the restrictions and delays that were once associated with
              traditional banking systems.
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              As we continued to listen to the needs of our Nepalese customers,
              we realized that utility bill payments were another area of
              struggle. In 2021, we expanded our services to include all sorts
              of utility bill payments in Nepal, again in real-time. We
              understood the importance of timely bill payments and the stress
              associated with managing multiple bills. Through Legal Remit, our
              customers can conveniently pay their utility bills, including
              electricity, water, internet, and more, with just a few clicks.
              Our user-friendly platform ensures that payments are processed
              instantly, saving time and eliminating the need for long queues
              and paperwork.
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Our commitment to the well-being of our customers goes beyond
              financial transactions. We believe in empowering individuals and
              communities to achieve better lives and financial security.
              Through Legal Remit's services, we aim to bridge the gap and
              create opportunities for our customers to thrive. By offering
              fast, reliable, and affordable money transfer options, we enable
              families to support one another, students to pursue education, and
              entrepreneurs to grow their businesses. We are proud to be a part
              of their success stories.
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              With our vision to help communities for a better life and
              financial well-being, we decided to spread our services to the
              remaining world under the brand name Legal Remit. From December
              2021, we enable sending money from Australia to the world. Legal
              Remit now connects more than 200 countries and communities
              worldwide, allowing individuals to send money to their loved ones
              with ease. Our global network of partnerships and reliable
              infrastructure ensures that funds are transferred securely and
              efficiently, no matter where they need to go.
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Our journey has been driven by the belief that technology and
              innovation can transform lives. We have witnessed the positive
              impact that our services have had on individuals and communities.
              Legal Remit has become a trusted name in the remittance industry,
              known for its speed, reliability, and customer-centric approach.
              We continually strive to enhance our services and exceed the
              expectations of our customers.
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Our vision is to keep helping people in their need with our
              services and products. We understand that financial transactions
              play a crucial role in people's lives, and we are committed to
              making the process as seamless and stress-free as possible. By
              leveraging cutting-edge technology, we aim to provide financial
              empowerment to individuals, irrespective of their location or
              circumstances. At Legal Remit, we believe that everyone deserves
              access to reliable and efficient financial solutions.
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
              Join us at Legal Remit and experience the convenience, speed, and
              peace of mind that come with our cutting-edge financial services.
              We are here to simplify your money transfers and contribute to
              your financial well-being. Together, let's build a brighter
              future, one transaction at a time.
            </p>

            <div className="row">
              <div className="purpleBox d-flex ps-0 pe-0 align-items-center mt-5 respoChildFooter">
                <div className="rhombus ">
                  <h2 className="text-white bolder text-center py-3 mt-2">
                    Mission
                  </h2>
                  <img
                    src={mission}
                    className="py-3 d-block m-auto "
                    height={100}
                    width={100}
                  />
                </div>
                <p className="responsiveMainForMobile text-justify px-4 responsiveFontLarge text-black fs-6 mb-0">
                  At Legal Remit, our mission is to safeguard the funds of our
                  customers throughout the transfer process until they are
                  securely delivered to the intended recipients. We are
                  dedicated to providing completely hassle-free and guaranteed
                  money transfer and money exchange services. Our commitment to
                  transparency, security, and reliability ensures that our
                  customers can transfer funds with confidence and peace of
                  mind. Through innovative technology and exceptional customer
                  service, we strive to simplify the financial experience and
                  empower individuals and communities worldwide. Our mission is
                  to be the trusted partner in facilitating seamless and secure
                  financial transactions for our valued customers.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="purpleBox d-flex ps-0 pe-0 align-items-center mt-5 respoChildFooter">
                <div className="rhombus ">
                  <h2 className="text-justify text-white bolder text-center py-3 mt-2">
                    Vision
                  </h2>
                  <img
                    src={vision}
                    className="py-3 d-block m-auto"
                    height={100}
                    width={100}
                  />
                </div>
                <p className="responsiveMainForMobile text-justify responsiveFontLarge px-4 text-black fs-6 mb-0">
                  We strive to positively impact individuals worldwide seeking
                  our financial services. With an unwavering focus on safety and
                  innovation, we will expand our trusted offerings, globalize
                  our network, and uphold the highest standards to deliver
                  exceptional financial services.
                </p>
              </div>
            </div>

            <div className="fs-2 purpleText medium my-5 mb-3">Objectives:</div>

            <ol className="nested-ordered-list">
              <li className="fs-6 text-black">
                Simplify Money Transfers: Our objective is to make money
                transfers simple and hassle-free for individuals and businesses
                alike. We will continuously enhance our processes and leverage
                technology to streamline the transfer experience, ensuring
                convenience and efficiency.
              </li>
              <li className="fs-6 text-black">
                {" "}
                Deliver Quality Customer Services: We are committed to providing
                exceptional customer services that exceed expectations. Our
                objective is to listen to our customers, address their concerns
                promptly, and deliver personalized support, ensuring a positive
                and satisfying experience throughout their financial journey
                with Legal Remit.
              </li>
              <li className="fs-6 text-black">
                Facilitate Business Money Transfers: We aim to make money
                transfers easier for businesses by offering tailored solutions
                that cater to their specific needs. Our objective is to provide
                efficient and cost-effective transfer options, enabling
                businesses to seamlessly manage their international
                transactions.
              </li>
              <li className="fs-6 text-black">
                Safeguard Transfers: Ensuring the security of our customers'
                funds is of utmost importance. Our objective is to implement
                robust security measures and advanced technologies to safeguard
                transfers, protecting our customers' money throughout the entire
                process.
              </li>
              <li className="fs-6 text-black">
                {" "}
                Reduce Transfer Costs: We are dedicated to reducing the cost of
                money transfers for our customers. Our objective is to optimize
                our operational efficiency, negotiate competitive exchange
                rates, and minimize transfer fees, allowing our customers to
                enjoy more affordable financial services.
              </li>
              <li className="fs-6 text-black">
                Provide Higher Value Transfers: Our objective is to offer higher
                value for each cent transferred. Through competitive exchange
                rates and efficient processes, we aim to maximize the amount
                received by the recipients, delivering optimal value and helping
                our customers make the most of their transfers.
              </li>
              <li className="fs-6 text-black">
                Drive Technological Innovation: We are technology and
                innovation-oriented in our approach. Our objective is to
                leverage cutting-edge technology to add value and enhance the
                modern remittance system. We will continuously explore new
                technologies and digital solutions to improve our services and
                provide innovative financial solutions to our customers.
              </li>
              <li className="fs-6 text-black">
                Transform Money Transfer Experience: Our objective is to change
                the way people send and receive money. We aim to revolutionize
                the remittance industry by offering user-friendly platforms,
                seamless processes, and innovative services that redefine the
                money transfer experience, empowering individuals and
                communities worldwide.
              </li>
            </ol>

            <p className="responsiveMainForMobile text-justify responsiveFontLarge px-4 text-black fs-6 mt-4">
              By pursuing these objectives, Legal Remit aims to be a trusted and
              innovative leader in the financial services industry, simplifying
              money transfers, providing exceptional customer services, and
              driving positive change in the way people send and receive money.
            </p>

            {/* <div className='row'>
                            <div className='purpleBox d-flex ps-0 pe-0 align-items-center mt-5 respoChildFooter'>
                            <div className='rhombus '>
                                <h2 className='text-white bolder text-center py-3 mt-2'>Objective</h2>
                                <img src={objective} className='py-3 d-block m-auto ' height={100} width={100}/>
                            </div>
                            <ol className='mb-0 responsiveMainForMobile responsiveFontLarge'>  

                            <li className="responsiveFontLarge text-black liList">1. Makes money transfer simple </li>  
                            <li className="responsiveFontLarge text-black liList">2. Provide quality customer services </li>  
                            <li className="responsiveFontLarge text-black liList">3. Make money transfer easier for business</li>  
                            <li className="responsiveFontLarge text-black liList">4. Safeguard your transfer</li>  
                            <li className="responsiveFontLarge text-black liList">5. Reduce the cost of money transfer</li>  
                            <li className="responsiveFontLarge text-black liList">6. Give a higher value for each cent you transfer</li>  
                            <li className="responsiveFontLarge text-black liList">7. Technology and innovation-oriented services / Use of technology to add a brick in the modern remittance system.</li>  
                            <li className="responsiveFontLarge text-black liList">8. Change the way people send and receive money.</li>  
                            </ol>  
                            </div>
                        </div> */}
          </div>
        </Container>
      </section>
    </>
  );
};

export default AboutUsPage;
