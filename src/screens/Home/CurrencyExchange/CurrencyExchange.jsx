import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../assets/assets/scss/pages/CurrencyExchange.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Fade, Bounce } from 'react-awesome-reveal';
import { CommonConstants } from "../../../Constants/common.constants";
import { country_list } from "../../Helpers/CountryPicker/customLabel";
import ReactFlagsSelect from "react-flags-select";
import ChartExchange from "../../../Helpers/ChartExchange/ChartExchange";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "First dataset",
      data: [33, 53, 85, 41, 44, 65],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "rgba(75,192,192,1)",
    },
    {
      label: "Second dataset",
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: "#742774",
    },
  ],
};

export default function CurrencyExchange({ children }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // GetAllCountrys()
  });

  const [select, setSelect] = useState("AU");
  const [select1, setSelect1] = useState("NP");
  const [select2, setSelect2] = useState("IN");

  const onSelect = (code) => setSelect(code);
  const onSelect1 = (code) => setSelect1(code);
  const onSelect2 = (code) => setSelect2(code);

  const GetAllCountrys = async () => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallcountries"
      );
      if (response.data.status === true) {
        setCountries(response.data.data);
        // setCountries1(response.data.data)
        // setFlags(response.data.data[13]);
        // setFlags1(response.data.data[153]);
        // ExchangeRate(response.data.data[13].id,response.data.data[153].id)
        // setFlags(response.data.data[0]);
        // setFlags1(response.data.data[1]);
        // ExchangeRate(response.data.data[0].id,response.data.data[1].id)
      } else if (response.data.status === "error") {
        // console.log(response.data.message)
      }
    } catch (err) {
      // console.log(err)
    }
  };
  return (
    <>
      <section className="pt-5 mb-5 currencySection purpleLIghtShade py-5">
        <Container>
          <Row className="d-flex align-items-center responsiveMainForMobile">
            <Col className="col-lg-6">
              <Fade right>
                <Bounce>
                  <h1 className="pb-4 responsiveFontLargeHeading">
                    Keep watch on live currency exchange rate!
                  </h1>
                  <p className="blackShade responsiveFontLarge fs-6 text-justify pe-4">
                  Stay informed and make smarter financial decisions with our live currency exchange rate monitoring service. This provides you with real-time updates on currency exchange rates, allowing you to keep a close eye on the ever-changing global market. Whether you're a frequent  remitter, a traveler, a business owner, or simply someone who wants to stay updated on currency trends, our platform ensures that you have access to accurate and up-to-date information on the exchange rate of AUD to all currencies of the world. Empower yourself with the knowledge to maximize your financial transactions and seize opportunities with confidence. Join us today and stay ahead in the world of remittance.
                  </p>
                </Bounce>
              </Fade>
            </Col>
            <Col className="col-lg-6  d-flex justify-content-between chartRespo">
              <Col className="col-lg-12 d-flex px-0 respoChildFooter">
                <Col className="col-lg-9 px-0">
                  <Fade left>
                    <div className="shake-element">
                      {/* <ChartExchange /> */}
                      <div className="counterDay mt-4" style={{display: "flex", gap: "1rem"}}>
                      
                        <div className="first1d plusDiv text-black bolder p-3 text-center">
                          1 W
                        </div>
                        <div className="first1d plusDiv text-black bolder p-3 text-center">
                          1 M
                        </div>
                        <div className="first1d plusDivActive text-black bolder p-3 text-center">
                          3 M
                        </div>
                        <div className="first1d plusDiv text-black bolder p-3 text-center">
                          1 Y
                        </div>
                        <div className="first1d plusDiv text-black bolder p-3 text-center">
                          3 Y
                        </div>
                      </div>
                    </div>
                  </Fade>
                </Col>
                <Col className="col-lg-3 ">
                  <div className="main">
                    <div className="fromDivSelect">
                      <small className="responsiveFontLarge  text-black bolder text-start">
                        {" "}
                        From{" "}
                      </small>
                      <ReactFlagsSelect
                        className="zIndexR react-select-container mt-2 plusDiv py-1 px-2"
                        id="fromSelectDrp"
                        selected={select}
                        onSelect={onSelect}
                        customLabels={country_list}
                      />
                    </div>
                    <div className="fromDivSelect mt-4">
                      <small className="responsiveFontLarge  text-black bolder text-start">
                        {" "}
                        To{" "}
                      </small>
                      <ReactFlagsSelect
                        className="zIndexR react-select-container mt-2 plusDiv py-1 px-2"
                        id="fromSelectDrp"
                        selected={select1}
                        onSelect={onSelect}
                        customLabels={country_list}
                      />
                    </div>
                    <div className="fromDivSelect">
                      <ReactFlagsSelect
                        className="zIndexR react-select-container mt-3 plusDiv py-1 px-2"
                        id="fromSelectDrp"
                        selected={select2}
                        onSelect={onSelect}
                        customLabels={country_list}
                      />
                    </div>

                    <div className="plusDiv mt-3 text-center py-2">
                      <i className="fa fa-plus bolder"></i>
                    </div>
                  </div>
                </Col>
              </Col>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
