import React, { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import ModalComponent from "./ModalComponent";
import ModalComponentPopup from "./ModalComponentPopup";
import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";

import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import { Alert } from "react-bootstrap";

export default function ExchangeRateForm(props) {
  const [id, setId] = useState(props.location.state);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [modalShowEditPrChange, setmodalShowEditPrChange] = useState(false);
  //const date1 = new Date().toLocaleString();
  const current = new Date();
  const date1 = `${current.getDate()}/${current.getMonth() + 1
    }/${current.getFullYear()}`;
  const [validFrom, setvalidFrom] = useState(date1);
  const [countries, setcountries] = useState([]);
  const [ShowHide, SetShowHide] = useState(null);
  const [exchangeFromID, setexchangeFromID] = useState(14);
  const [exchangeToID, setexchangeToID] = useState(154);
  const [liveRate, setliveRate] = useState(0);
  const [minMarkup, setminMarkup] = useState(CommonConstants.minMarkup);
  const [standardMarkup, setstandardMarkup] = useState(CommonConstants.standardMarkup);
  const [dealRate, setdealRate] = useState(0);
  const [publishRate, setpublishRate] = useState(0);
  const [ManualpublishRate, setManualpublishRate] = useState(0);
  const [exchangeFromCurrency, setexchangeFromCurrency] = useState("AUD");
  const [exchangeToCurrency, setexchangeToCurrency] = useState("NPR");
  const [exchangeFromName, setexchangeFromName] = useState("Australia");
  const [exchangeToName, setexchangeToName] = useState("Nepal");
  const navigate = useNavigate();


  const showLiveRate = async () => {
    const payload = {
      from: exchangeFromCurrency,
      to: exchangeToCurrency,
    };
   
    await axios
      .post(`${CommonConstants.BASE_URL}/getexchangeratebycurrency`, payload)
      .then((res) => {
        setliveRate(Number(res.data.result[Object.keys(res.data.result)]?.toString()?.match(/^\d+(?:\.\d{0,4})?/)));
        showDealRate(Number(res.data.result[Object.keys(res.data.result)]?.toString()?.match(/^\d+(?:\.\d{0,4})?/)));
        // setliveRate(res.data.result[Object.keys(res.data.result)].toFixed(4));
        // showDealRate(res.data.result[Object.keys(res.data.result)].toFixed(4));
        //return res.data.result[Object.keys(res.data.result)].toFixed(4)
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  const showDealRate = async (liveRateAPI) => {
    await axios
      .get(`${CommonConstants.BASE_URL}/getlastexchangerate`)
      .then((res) => {
        setdealRate(Number(res.data.data?.toString()?.match(/^\d+(?:\.\d{0,4})?/)));
        setpublishRate(res.data.data - minMarkup < liveRateAPI - standardMarkup ? Number((liveRateAPI - standardMarkup)?.toString()?.match(/^\d+(?:\.\d{0,4})?/)) : Number((res.data.data - minMarkup)?.toString()?.match(/^\d+(?:\.\d{0,4})?/)));
        setManualpublishRate(res.data.data - minMarkup < liveRateAPI - standardMarkup ? Number((liveRateAPI - standardMarkup)?.toString()?.match(/^\d+(?:\.\d{0,4})?/)) : Number((res.data.data - minMarkup)?.toString()?.match(/^\d+(?:\.\d{0,4})?/)));
        // setdealRate(res.data.data.toFixed(4));
        // setpublishRate(res.data.data - minMarkup < liveRateAPI - standardMarkup ? (liveRateAPI - standardMarkup).toFixed(4) : (res.data.data - minMarkup).toFixed(4));
        // setManualpublishRate(res.data.data - minMarkup < liveRateAPI - standardMarkup ? (liveRateAPI - standardMarkup).toFixed(4) : (res.data.data - minMarkup).toFixed(4));
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const getStandardAndMinimumMarkup = () => {
    const payload = {
      fromCountryId: exchangeFromID,
      toCountryId: exchangeToID,
    }

    axios
      .post(`${CommonConstants.BASE_URL}/getexchangeratebycountryid`, payload).then(res => {
      setstandardMarkup(res.data.data.standardMarkup)
      setminMarkup(res.data.data.minimumMarkup)
    })
  }

  const showPublishRate = async () => {

    // const PR = liveRate - standardMarkup;
    // const dealMin = dealRate - minMarkup;

    // if (dealMin < PR) {
  
    //   setpublishRate(dealMin.toFixed(4));
    //   setManualpublishRate(dealMin.toFixed(4));
    // } else if (PR < dealMin) {
   
    //   setpublishRate(PR.toFixed(4));
    //   setManualpublishRate(PR.toFixed(4));
    // }
  };

  const saveExchangeRate = async () => {
    const payload = {
      fromCountryId: exchangeFromID,
      toCountryId: exchangeToID,
      validFrom: validFrom,
      minimumMarkup: minMarkup,
      standardMarkup: standardMarkup,
      dealRate: dealRate,
      liveRate: liveRate,
      publishedRate: (dealRate - minMarkup) < (liveRate - standardMarkup) ? Number((dealRate - minMarkup)?.toString()?.match(/^\d+(?:\.\d{0,4})?/)) : Number((liveRate - standardMarkup)?.toString()?.match(/^\d+(?:\.\d{0,4})?/)),
      // publishedRate: (dealRate - minMarkup) < (liveRate - standardMarkup) ? (dealRate - minMarkup).toFixed(4) : (liveRate - standardMarkup).toFixed(4),
      customPublishedRate: ManualpublishRate,
      // fromCountryName: exchangeFromName,
      // toCountryName: exchangeToName,
      isConstant: false,
    };
    await axios
      .post(`${CommonConstants.BASE_URL}/saveexchangerate`, payload)
      .then((res) => {
       
        if (res.data.statuscode == 200) {
          // setModalShowAdd(true)
          setpublishRate(false);
          navigate("/exchange-rate");
        }
      })
      .catch((err) => {
        console.log("err", err);
      });

  };

  const handlePrchangePopupCancle = () => {
    // setModalShowAdd(false)
    setmodalShowPrChange(false);
    // setmodalShowEditPrChange(false)
    //setManualpublishRate(publishRate);
  };

  const handleEditPrchangePopupCancle = () => {
    // setModalShowAdd(false)
    // setmodalShowPrChange(false)
    setmodalShowEditPrChange(false);
    setManualpublishRate(publishRate);
  };

  const ChangePr = () => {
    if (ManualpublishRate !== publishRate) {
      ShowHide === true ? setmodalShowPrChange(true) : setmodalShowEditPrChange(true)
    } else {
      saveExchangeRate()
    }
  };

  const editExchangeRate = async () => {
    if (ManualpublishRate !== publishRate) {
      const payload = {
        id: id,
        fromCountryId: exchangeFromID,
        toCountryId: exchangeToID,
        validFrom: validFrom,
        minimumMarkup: minMarkup,
        standardMarkup: standardMarkup,
        dealRate: dealRate,
        liveRate: liveRate,
        publishedRate: ManualpublishRate,
        isConstant: true,
      };
      await axios
        .post(`${CommonConstants.BASE_URL}/updateexchangerate`, payload)
        .then((res) => {
          if (res.data.statuscode == 200) {
            setModalShowEdit(true);
          }
        
          setexchangeFromID(res.data.data.fromCountryId);
          setexchangeToID(res.data.data.toCountryId);
          setvalidFrom(res.data.data.validFrom);
          setminMarkup(res.data.data.minimumMarkup);
          setstandardMarkup(res.data.data.standardMarkup);
          setdealRate(res.data.data.dealRate);
          setliveRate(res.data.data.liveRate);
          setpublishRate(res.data.data.publishedRate);
          setmodalShowEditPrChange(false);
          //setManualpublishRate(res.data.data.publishedRate)
          navigate("/exchange-rate");
        })
        .catch((err) => {
          console.log("err", err);
        });
    } else {
      const payload = {
        id: id,
        fromCountryId: exchangeFromID,
        toCountryId: exchangeToID,
        validFrom: validFrom,
        minimumMarkup: minMarkup,
        standardMarkup: standardMarkup,
        dealRate: dealRate,
        liveRate: liveRate,
        publishedRate: ManualpublishRate,
        isConstant: false,
      };
      await axios
        .post(`${CommonConstants.BASE_URL}/updateexchangerate`, payload)
        .then((res) => {
          if (res.data.statuscode == 200) {
            setModalShowEdit(true);
          }
          // console.log("res", res);
          setexchangeFromID(res.data.data.fromCountryId);
          setexchangeToID(res.data.data.toCountryId);
          setvalidFrom(res.data.data.validFrom);
          setminMarkup(res.data.data.minimumMarkup);
          setstandardMarkup(res.data.data.standardMarkup);
          setdealRate(res.data.data.dealRate);
          setliveRate(res.data.data.liveRate);
          setpublishRate(res.data.data.publishedRate);
          setmodalShowEditPrChange(false);
          //setManualpublishRate(res.data.data.publishedRate)
          navigate("/exchange-rate");
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const handleChangeFromCountry = async (e) => {
    setexchangeFromID(e.target.value);
    // console.log("countries123",countries)
    const dataFrom = countries.filter((value) => value.id == e.target.value);
    setexchangeFromCurrency(dataFrom[0].currency);
    setexchangeFromName(dataFrom[0].name);
    // const payload = {
    //   from:dataFrom[0].currency,
    //   to:exchangeToCurrency
    // }
    // await axios.post(`${CommonConstants.BASE_URL}/getexchangeratebycurrency`, payload).then(res => {
    //   setliveRate(res.data.result[Object.keys(res.data.result)])
    // }).catch(err => {
    //   console.log(err,"err")
    // })
  };

  const handleChangeToCountry = async (e) => {
    setexchangeToID(e.target.value);
    // console.log("idto",e.target.value)
    const dataTo = countries.filter((value) => value.id == e.target.value);
    setexchangeToCurrency(dataTo[0].currency);
    setexchangeToName(dataTo[0].name);
    // const payload = {
    //   from:exchangeFromCurrency,
    //   to:dataTo[0].currency
    // }
    // await axios.post(`${CommonConstants.BASE_URL}/getexchangeratebycurrency`, payload).then(res => {
    //   setliveRate(res.data.result[Object.keys(res.data.result)])
    // }).catch(err => {
    //   console.log(err,"err")
    // })
  };

  const redirectToExchangeRatePage = () => {
    navigate("/exchange-rate");
  };

  useEffect(() => {
    axios
      .get(`${CommonConstants.BASE_URL}/getallcountries`)
      .then((res) => {
        setcountries(res.data.data);
        // console.log("exc", exchangeFromID);
      })
      .catch((err) => {
        console.log(err)
      })
    SetShowHide(props.location.state)
    showLiveRate()
    showPublishRate()
    getStandardAndMinimumMarkup()

  }, [exchangeFromID, exchangeToID, exchangeFromName, exchangeToName, minMarkup, standardMarkup]);

  return (
    <>
      <section onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <Container>
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-black rounded-0">
              <h3 className="text-black px-4 mx-2 responsiveFontLargeHeading normal  border-bottom  pt-4 pb-3 pb-2">
                Exchange Rate New
              </h3>
              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Form>
                  <Container className="">
                    <Row className="mb-4 respoChildFooter">
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Exchange From</Form.Label>

                        <Form.Select
                          onChange={(e) => {
                            handleChangeFromCountry(e);
                          }}
                          value={exchangeFromID}
                        >
                          {countries?.map((value) => {
                            return (
                              <option value={value?.id}>{value?.name}</option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridState" className="pbDowSt">
                        <Form.Label>Exchange To</Form.Label>
                        <Form.Select
                          onChange={(e) => {
                            handleChangeToCountry(e);
                          }}
                          value={exchangeToID}
                        >
                          {countries.map((value) => {
                            return (
                              <option value={value.id}>{value.name}</option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>

                      {/* <Container>
                  <Row>
                    <Col className="col-lg-12">
                      <div style={{ background: "#AA2AE1", width: "100%" }} className="rounded-1 btn text-white"
                        onClick={() => showLiveRate()}
                      >Show Publish Rate</div>

                    </Col>
                  </Row>
                </Container> */}

                      <Container className="pt-4">
                        <Row>
                          <Col className="col-lg-12">
                            <div className="text-white">
                              <Alert key="success" variant="success">
                                Show Live Rate : {liveRate}
                              </Alert>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </Row>

                    <Row className="mb-4 respoChildFooter">
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Standard Markup</Form.Label>
                        <Form.Control
                          value={standardMarkup}
                          type="number"
                          onChange={(e) => setstandardMarkup(e.target.value)}
                        />
                      </Form.Group>
                      {/* <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Date</Form.Label>

                        <Form.Control
                          value={validFrom}
                          onChange={(e) => setvalidFrom(e.target.value)}
                          type="text"
                        />
              </Form.Group> */}

                      <Form.Group as={Col} controlId="formGridZip" className="pbDowSt">
                        <Form.Label>Minimum Markup</Form.Label>
                        <Form.Control
                          value={minMarkup}
                          type="number"
                          onChange={(e) => setminMarkup(e.target.value)}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-4 respoChildFooter">


                      <Form.Group as={Col} controlId="formGridZip" className="">
                        <Form.Label>Our Deal Rate</Form.Label>
                        <Form.Control
                          value={dealRate}
                          type="number"
                          onChange={(e) => setdealRate(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPR" className="pbDowSt">
                        <Form.Label>Custom Publish Rate</Form.Label>
                        <Form.Control
                          value={ManualpublishRate}
                          type="number"
                          onChange={(e) => setManualpublishRate(e.target.value)}

                        />
                      </Form.Group>
                    </Row>
                  </Container>
                  <Container className="">
                    <Row>


                      <Col className="col-lg-12 d-flex justify-content-end respoChildFooter">
                        <div className="d-none col-lg-6 mx-1">
                          <div
                            style={{ background: "#AA2AE1", width: "100%" }}
                            className="pt-3 pb-3 rounded btn text-white"
                            onClick={() => showLiveRate()}
                          >
                            Show Publish Rate
                          </div>
                        </div>
                        <div className="col-lg-6 mx-1">
                          <div className="text-white pbDowSt">
                            <Alert
                              key="success"
                              className="rounded text-center"
                              variant="primary"
                            >
                              Publish Rate : {(dealRate - minMarkup) < (liveRate - standardMarkup) ? Number((dealRate - minMarkup)?.toString()?.match(/^\d+(?:\.\d{0,4})?/)) : Number((liveRate - standardMarkup)?.toString()?.match(/^\d+(?:\.\d{0,4})?/))}
                              {/* Publish Rate : {(dealRate - minMarkup) < (liveRate - standardMarkup) ? (dealRate - minMarkup).toFixed(4) : (liveRate - standardMarkup).toFixed(4)} */}
                            </Alert>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>

                  <div className="d-flex">
                    {ShowHide === true ? (
                      <Container className="pt-3">
                        <Row>
                          <div className="d-flex">
                            <div className="">
                              <a
                                style={{ background: "#AA2AE1" }}
                                onClick={() => ChangePr()}
                                className="rounded btn text-white"
                              >
                                Create
                              </a>


                            </div>
                            <div className="">
                              <div className=" border-0">
                                <a
                                  onClick={() => redirectToExchangeRatePage()}
                                  className="btn btn-default ms-3 text-black bolder border 2"
                                >
                                  Cancel
                                </a>
                              </div>
                            </div>
                          </div>
                        </Row>
                      </Container>
                    ) : (
                      <Container className="pt-3">
                        <Row>
                          <div className="d-flex">
                            <div>
                              <div
                                style={{ background: "#AA2AE1" }}
                                onClick={() => {
                                  editExchangeRate();
                                }}
                                className="rounded btn text-white"
                              >
                                Edit
                              </div>
                            </div>

                            <div className="">
                              <div className="border-0">
                                <a
                                  onClick={() => redirectToExchangeRatePage()}
                                  className="btn btn-default ms-3 text-black bolder border 2"
                                >
                                  Cancel
                                </a>
                              </div>
                            </div>
                          </div>
                        </Row>
                      </Container>
                    )}
                  </div>
                  <ModalComponent
                    show={modalShowEdit}
                    title11={"Exchange Rate updated successfully"}
                    onHide={() => setModalShowEdit(false)}
                  />
                  <ModalComponent
                    show={modalShowAdd}
                    title11={"Exchange Rate added successfully"}
                    onHide={
                      () => {
                        setModalShowAdd(false)
                        redirectToExchangeRatePage()
                      }

                    }
                  />

                  <ModalComponentPopup
                    show={modalShowPrChange}
                    // onHide={modalShowPrChange}
                    title1={"Are you sure want to change this Publish Rate ?"}
                    cancle={(e) => handlePrchangePopupCancle(e)}
                    SavePr={() => saveExchangeRate()}
                  />

                  <ModalComponentPopup
                    show={modalShowEditPrChange}
                    // onHide={modalShowPrChange}
                    title1={"Are you sure want to change this Publish Rate ?"}
                    cancle={(e) => handleEditPrchangePopupCancle(e)}
                    SavePr={() => editExchangeRate()}
                  />
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
