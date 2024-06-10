import React from "react";
import "./FraudAwareness.scss";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import { Container, Row } from "react-bootstrap";
import mission from "../../assets/images/mission.svg";
import vision from "../../assets/images/vision.svg";
import objective from "../../assets/images/objective.svg";

export default function FraudAwareness() {
  return (
    <>
      <section className="abtPage">
        <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5">
          <div className="innerAbtPage p-5">
            <h2 className="bolder purpleText text-center">Fraud Awareness</h2>

            <ul className="round">
              <li className="text-justify  responsiveFontLarge first text-black fs-6 mt-4 ">
              Never transfer money to a stranger. Know who you are dealing with. A money transfer is like cash.
              </li>
            </ul>

            <ul className="round">
              <li className="text-black text-justify responsiveFontLarge first fs-6  ">
              Never send money in the following situations
              </li>
              </ul>
              <ul className="roundBorder ps-5">
              <li className="text-justify responsiveFontLarge first text-black fs-6  ">
              To make a charity donation or to pay an internet merchant for supplies during a pandemic, natural disaster, or other crisis.
              </li>
              <li className="text-justify responsiveFontLarge first text-black fs-6  ">
              To receive money (examples: lottery winnings, prize, job offer or loan).
              </li>
              <li className="text-justify responsiveFontLarge first text-black fs-6  ">
              To pay a government taxing authority or the police.
              </li>
              <li className="text-justify responsiveFontLarge first text-black fs-6  ">
              To buy a car, puppy, another unique or high-value item, or to make an apartment deposit
              </li>
            </ul>

            <ul className="round">
              <li className="text-justify responsiveFontLarge first text-black fs-6  ">
              Never send money without checking out the story. Reach out to that friend or family member you heard is in need first.
              </li>
            </ul>

    
            <ul className="round">
              <li className="text-justify responsiveFontLarge first text-black fs-6  ">
              If it sounds too good to be true, it probably is.
              </li>
            </ul>

            <ul className="round">
              <li className="text-justify responsiveFontLarge first text-black fs-6  ">
              Never  make give your transaction reference number to anyone other than the person you intend to receive the money. Sellers and telemarketers can't take money transfer payments from people in the US for something they're selling through telemarketing. If you've lost money to a scam via Legal Remit, call Legal Remit at 0435022761 or 0419850130.
              </li>
            </ul>


          </div>
        </Container>
        <Footer></Footer>
      </section>
    </>
  );
}
