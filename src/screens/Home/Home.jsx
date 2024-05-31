import React, { useEffect } from "react";
import Partner from "./Footer/MoneyTransferCountry/Partners";
import MainParticle from "./MainParticle/MainParticle";
import MoneyExchangeCard from "./MoneyExchangeCard/MoneyExchangeCard";
import InternationalMoney from "./InternationMoney/InternationalMoney";
import Utilty from "./Utility/Utility";
import "../../assets/assets/scss/pages/Home.css";
import AboutSection from "./AboutSection/AboutSection";
import CurrencyExchange from "./CurrencyExchange/CurrencyExchange";
import Services from "./Services/Services";
import Clients from "./Clients/Clients";
import HowItWorks from "./HowItWorks/HowItWorks";
import CookiePolicy from "../Helpers/CookiePolicy/CookiePolicy";
import LatestNews from "../LatestNews/LatestNews";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import { useNavigate } from "react-router-dom";
import { checkIfExpired } from "../../utils/axiosIntercepters";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if(localStorage.getItem("Id")){
      GetUsedDetails()
    }
  },[]);

  const GetUsedDetails = async () => {
    try {
      axios
      .post(CommonConstants.BASE_URL + "/getuserinfobyid", {
        id: localStorage.getItem("Id"),
      })
      .then((respo) => {
        if(respo.data.data.isAdminResetPwd == true){
          localStorage.setItem('AdminResetPermission',respo.data.data.isAdminResetPwd);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <div className="cookieMain">
        <CookiePolicy />
      </div>
      <div className="bg-white ">
        <section className="bg-white mainLoginSection position-relative">         
          <MainParticle />
        </section>
        <MoneyExchangeCard />
        <InternationalMoney />
        <Utilty />
        <AboutSection />
        <CurrencyExchange />
        <Services />
        <Clients />
        <HowItWorks />
        <LatestNews id="latestNews" />
        <Partner />
              
      </div>
    
    </>
  );
}
