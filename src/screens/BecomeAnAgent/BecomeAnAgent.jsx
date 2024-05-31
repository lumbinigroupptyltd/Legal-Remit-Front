import React from "react";
import "./BecomeAnAgent.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";
import { Link, useNavigate } from "react-router-dom";

export default function BecomeAnAgent() {
  const navigate = useNavigate();

  const openAgentForm = () => {
    const url = '/agentforms';
    const newTab = window.open(url, '_blank');
    newTab.focus();
  };
  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage p-5">
            <h2 className="bolder purpleText text-center">Become an agent</h2>

            <p className="text-justify responsiveFontLarge first purpleText fs-6  pt-3">
              Join the World's Fastest-Growing Remittance Company
            </p>

            <p className="text-justify responsiveFontLarge first text-black fs-6  pt-3">
              Are you looking to enhance your existing business by adding a
              remittance service? Perhaps you've always dreamed of starting your
              own remittance business. Look no further - join our dynamic team
              and unlock the solutions you've been searching for.
            </p>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Express Your Interest:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Leave your details here, and one of our dedicated team members
                will promptly reach out to you. We understand the value of your
                time and will ensure a swift response to address any queries or
                requirements you may have. Together, let's explore the exciting
                opportunities that lie ahead.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                Perks of Being an Agent:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                As part of our expanding network, you'll enjoy a host of
                benefits that come with being an agent of our remittance
                company. Here are just a few advantages that await you:
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                1. Commission on Each Transaction:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Earn competitive commissions on every successful remittance
                transaction facilitated through your agency. Our transparent
                commission structure ensures you are duly rewarded for your
                efforts and contribution to our growing business.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                2. Consumer-Centric Platform:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Gain access to our advanced and user-friendly platform, designed
                with the customer in mind. Our intuitive interface makes
                remittance transactions seamless and convenient, ensuring a
                positive experience for your valued customers.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                3. 24/7 Technical and Transaction Support:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                We understand the importance of prompt assistance. As our agent,
                you'll have access to round-the-clock technical and transaction
                support, ensuring that any concerns or issues are addressed
                swiftly and efficiently. Rest assured, we've got your back every
                step of the way.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                4. Global Distribution Network:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Tap into our extensive global distribution network, spanning
                across numerous countries and communities. Our strong
                partnerships and strategic alliances enable you to reach a
                broader customer base and expand your remittance business on a
                global scale.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                5. Cutting-Edge Technology:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Leverage our state-of-the-art technology infrastructure,
                designed to streamline remittance processes and enhance
                efficiency. We continuously invest in innovation, ensuring that
                you have access to the latest tools and resources to drive your
                business forward.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                6. Marketing and Branding Support:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Benefit from our marketing and branding initiatives to create
                awareness and attract customers to your remittance agency. We
                provide marketing collateral, promotional materials, and
                guidance to help you effectively communicate the value of our
                services to your target audience.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                7. Training and Education:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                We believe in empowering our agents with the knowledge and
                skills needed to succeed. As part of our team, you'll receive
                comprehensive training and educational resources, keeping you
                updated with industry trends, regulatory requirements, and best
                practices.
              </p>
            </div>

            <div>
              <p className="purpleText text-justify responsiveFontLarge first fs-6  pt-2">
                8. Business Development Opportunities:
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Unlock potential business development opportunities by
                leveraging our network and industry connections. Collaborate
                with other agents and explore synergies to expand your reach and
                maximize your remittance business's growth potential.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2">
                Join the world's fastest-growing remittance company and become a
                valued member of our dynamic team. By expressing your interest,
                you open doors to exciting possibilities and gain access to a
                range of benefits, including attractive commissions, a
                consumer-centric platform, 24/7 support, a global distribution
                network, and much more.
              </p>
              <p className="text-justify responsiveFontLarge first text-black fs-6  pt-2 pb-3">
                Don't miss out on this opportunity to be part of our success
                story. Leave your details today, and one of our team members
                will reach out to you promptly to discuss how we can embark on
                this remittance journey together.
              </p>
         
              <div className="mt-0 fs-6 ">
              <div className="mt-0 text-black my-4 ">
              Express your interest by filling out the form below. 

              </div>
              <Link to="/agentforms" className="pointer purpleBackground text-white p-3 mt-2 rounded-3 medium text-decoration-none mt-3"  target="_blank">
        Click here to join
      </Link>
              {/* <a onClick={openAgentForm} className="pointer purpleBackground text-white p-3 mt-2 rounded-3 medium text-decoration-none mt-3" target="_blank">
                Click here to join{" "}
              </a> */}
              </div>
            </div>
          </div>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
