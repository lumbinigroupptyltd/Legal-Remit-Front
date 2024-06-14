import React, { useState, Component, useEffect, useRef } from "react";

import { Container, Form } from "react-bootstrap";
import "./SendMoney.scss";
import first1 from "../../assets/images/moneyVector.svg";
import second2 from "../../assets/images/moneyVector.svg";
import third3 from "../../assets/images/moneyVector.svg";
import fourth4 from "../../assets/images/moneyVector.svg";
import fifth5 from "../../assets/images/moneyVector.svg";

import warning from "../../assets/images/warning.svg";


import Step1 from "./SendMoneySteps/MoneyStep1/MoneyStep1";
import Step2 from "./SendMoneySteps/MoneyStep2/MoneyStep2";
import Step3 from "./SendMoneySteps/MoneyStep3/MoneyStep3";
import Step4 from "./SendMoneySteps/MoneyStep4/MoneyStep4";
import UploadFiles from "../Helpers/ReVerifyIDDocument/ReverifyIdDocument";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import userContext from "../Auth/SignupNew/Usecontext";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'

// const validator = require("../../assets/js/validator");

// import validator from "../../../assets/js/validator"


const imageFirstComponent = () => {
  return <img src={first1} className="d-block m-auto" />;
};
const imageSecondComponent = () => {
  return <img src={second2} className="d-block m-auto" />;
};
const imageThirdComponent = () => {
  return <img src={third3} className="d-block m-auto" id="3rdimage" />;
};
const imageFourthComponent = () => {
  return <img src={fourth4} className="d-block m-auto" />;
};

const imageFifthComponent = () => {
  return <img src={fifth5} className="d-block m-auto" />;
};

export default function SendMoney() {
  const location = useLocation();
  const [handleId, setHandleId] = useState();
  const [show1, setShowVerify] = useState(false);
  const [Reciver_CountryId, setReciver_CountryId] = useState();
  const [SummuryId, setSummuryId] = useState()
  const [TrsnsactionId, setTrsnsactionId] = useState();
  const [TrsnsactionData, setTrsnsactionData] = useState();

  const navigate = useNavigate()

  const [isSignupCompleted, setIsSignupCompleted] = useState({
    error: '',
    showPopup: false
  })

  const setSignupCompleteData = (errorMessage, showPopup = false) => {
    setIsSignupCompleted((prevState) => ({
      ...prevState,
      error: errorMessage,
      showPopup: showPopup
    }))
  }

  const handleGoToProfile = () => {
    navigate('/profile')
    window.location.reload();
    setSignupCompleteData('')
  }

  useEffect(async() => {
    let token = localStorage.getItem('token')
    if(!token){
      navigate('/login')
    }

    let tokenData = await jwtDecode(token)

    if(tokenData.userDetails.signupCompleted === false &&  tokenData.userDetails.roles[0].id !==1){
      setSignupCompleteData('Please complete the profile to continue!', true)
    }
  }, [])

  const [FirstStepTransactionData, setFirstStepTransactionData] = useState('')

  const FirstStepDataTrans = (Data) => {
    setFirstStepTransactionData(Data)
  }

  const handleTransId = (TransId) => {
    setTrsnsactionId(TransId.id)
    setTrsnsactionData(TransId)
  }

  const handleCloseVerify = () => setShowVerify(false);

  const handleShowVerify = () => {
    HandleFormId();
    // validator.error_input_validation(handleId);
    // if (validator.error_input_validation(handleId)) {
      if (handleId) {
      if (Reciver_CountryId == 154) {
        visitNextStep();
      } else {
        setShowVerify(true);

      }
    }
  }

  const [showIdUpdate, setshowIdUpdate] = useState(false);

  const handleCloseIDVerify = () => setshowIdUpdate(false);
  const handleShowIDVerify = () => setshowIdUpdate(true);




  const [DisplayButton, setDisplayButton] = useState(false)

  const [steps1, setSteps] = useState([
    {
      key: "firstStep",
      label: "Calculate",
      icon: first1,
      isDone: true,
      isRemain: true,
      components: imageFirstComponent,
    },
    {
      key: "secondStep",
      label: "Recipient ",
      icon: second2,
      isDone: false,
      isRemain: false,
      components: imageSecondComponent,
    },
    {
      key: "newStep",
      label: "Purpose",
      icon: third3,
      isDone: false,
      isRemain: false,
      components: imageSecondComponent,
    },
    {
      key: "thirdStep",
      label: "Summary",
      icon: third3,
      isDone: false,
      isRemain: false,
      components: imageThirdComponent,
    },
    {
      key: "fourthStep",
      label: "Payment",
      icon: fourth4,
      isDone: false,
      isRemain: false,
      components: imageFourthComponent,
    }
  ]);


  const [data1, setData1] = useState("");
  const [SendMoneyData, setSendMoneyData] = useState("");
  const [backDisplay, setBackDisplay] = useState(false)

  const backDisplayfunction = (value) => {
    setBackDisplay(value)
  }

  useEffect(() => {
    // handleShowAdditionalIDVerify() // Additional Document
    VerfiedTransactionId()
  }, [DisplayButton, SummuryId]);

  const VerfiedTransactionId = async () => {
    try {
      if (!localStorage.getItem("VerifiedTransID") === null) {

        const data = {
          transactionId: localStorage.getItem("VerifiedTransID")
        }

        const response = await axios.post(CommonConstants.BASE_URL + "/getdigitalverifiedtransactionbyid", data);
        if (!response.data.summary.status === "complete") {
          handleShowIDVerify()
        }

      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const [activeStep, setActiveStep] = useState(steps1[0]);

  // step 1 return data
  let [receiver, setreceiver] = useState(0)

  const HandleFormId = (form_Id) => {
    setHandleId(form_Id);
  };

  // get data from first step
  const FirstStepData = (data) => {
    receiver = data
    setreceiver(data)
  }


  const visitNextStep = async (props) => {
    handleCloseVerify()
    handleCloseIDVerify()
    HandleFormId();
    // validator.error_input_validation(handleId);

    // if (validator.error_input_validation(handleId)) {
    if (handleId) {
      window.scrollTo(0, 0);

      document.getElementById(activeStep.key).style.display = "none";

      if (steps1[steps1.length - 1].key === activeStep.key) {
        // alert("You have completed all steps1.");
        return;
      }
      const index = steps1.findIndex((x) => x.key === activeStep.key);
      setSteps((prevStep) =>
        prevStep.map((x) => {
          if (x.key === steps1[index + 1].key) {
            x.isDone = true;
            x.isRemain = true;
          } else {
            if (x.isDone === true) {
              x.isDone = true;
              x.isRemain = true;
            } else {
              x.isDone = false;
              x.isRemain = false;
            }
          }
          return x;
        })
      );
      setActiveStep(steps1[index + 1]);
      document.getElementById(steps1[index + 1].key).style.display = "block";
    }
  };

  const messageDialogshowValue = (Value) => {
    setDisplayButton(Value)
  }

  const RecieverCountryId = (ReciverCountryid) => {
    setReciver_CountryId(ReciverCountryid)
  }


  const SummurryDetails = (SummuryId) => {
    setSummuryId(SummuryId)
  }

  const [sendMoney, setsendMoney] = useState(0)
  const [sendMoneyDCharge, setsendMoneyDCharge] = useState(0)
  const [PAymentName, setPAymentName] = useState("")

  const sendingMoneyValue = (SendingValue) => {
    setsendMoney(SendingValue)
  }

  const DileveryCharge = (deliveryCharge) => {
    setsendMoneyDCharge(deliveryCharge)
  }

  const PaymentmethodName = (PaymentName) => {
    setPAymentName(PaymentName)
  }

  const handleStepClick = (index, stepkey) => {
    const selectedStep = steps1[index];
    if (selectedStep.isDone) {
      setBackDisplay(true);
      setActiveStep(selectedStep);
      document.getElementById(activeStep.key).style.display = "none";
      document.getElementById(stepkey).style.display = "block";
    }
  };

  const handleGoFirstStep = (index, stepkey) => {
    const selectedStep = steps1[index];
    if (selectedStep.isDone) {
      setBackDisplay(true)
      setActiveStep(selectedStep);
      document.getElementById(activeStep.key).style.display = "none"
      document.getElementById(stepkey).style.display = "block"
    }
  };

  const [ChangesenDMoney,setChangesenDMoney] = useState(0)

  const moneychange = (Value) =>{
    setChangesenDMoney(Value)
  }

  const [DefRecId, setDefRecId] = useState()
  const [DefaultDel_Name, setDefaultDel_Name] = useState()

  const [Exchangerate, setExchangerate] = useState(0)
  const [PremiumExchangerate, setPremiumExchangerate] = useState({
    premimumExId: 0,
    premimumExRate: 0,
    premimumExAmt: 0
  })
  const [ServiceCharge, setServiceCharge] = useState(0)

  const handleDefaultUserRecId = (DefaultUserRecId) => {
    setDefRecId(DefaultUserRecId)
  }

  const handleDefaultDeliveryName = (Dilivery_id) => {
    setDefaultDel_Name(Dilivery_id)
  }
  // index

  const handleCountinueTransaction = (indexvalue) => {
    var IndexType = indexvalue == 2 || indexvalue == 3 ? 2 : indexvalue == 4 ? 3 : indexvalue == 5 ? 4 : 1
    for (var i = 0; i <= IndexType; i++) {
      steps1[i].isDone = true;
      setActiveStep(steps1[i])
    }
    const selectedStep = steps1[IndexType];
    if (selectedStep?.isDone) {
      // debugger
      setBackDisplay(true)
      setActiveStep(selectedStep);
      document.getElementById(activeStep?.key).style.display = "none"
      document.getElementById(selectedStep?.key).style.display = "block"
    }
  };

  var CountinueTransaction = null;
  const [PromoCodeVerify, setPromoCodeVerify] = useState("");
  const [R_Deliverymethod, setR_Deliverymethod] = useState("");

  useEffect(() => {
    if (location.state?.TransactionData != undefined) {
      if (CountinueTransaction == null) {
        CountinueTransaction = location?.state
        const Countinue_Transaction = location?.state
        setSteps((prevStep) =>
          prevStep.map((x) => {
            if (x.key === steps1[Countinue_Transaction?.TransactionData?.stepNo - 1].key) {
              x.isDone = true;
              x.isRemain = true;
            } else {
              if (x.isDone === true) {
                x.isDone = true;
                x.isRemain = true;
              } else {
                x.isDone = false;
                x.isRemain = false;
              }
            }
            return x;
          })
        );
        return handleCountinueTransaction(Countinue_Transaction?.TransactionData?.stepNo)
      }
    }
  }, [])

  return (
    <>
      <section className="mainLoginSection1">
        {/* <NavBar></NavBar> */}
        <Container>
          {/* <p>Hi there {props.name}</p> */}
          <div className="mainLoginBox mt-5 mb-5">
            <div className="box row d-flex p-0 m-0 ">
              <Row className="secondBlock ms-0 border-0">
                <div className="col-lg-5 firstBlockss">
                  <div className="stepsmain stepsSendMoney pb-0">
                    <span id="sevennstep">
                      <ul
                        className="nav d-flex justify-content-evenly py-5 pt-4 pb-2 sevennstep"
                        id="sevennstep"
                      >
                        {steps1.map((step, i) => {
                          return (
                            <li
                              key={i}
                              className={`${activeStep.key === step.key
                                ? step.key + "active"
                                : step.isDone
                                  ? step.key + "active"
                                  : ""
                                } ${step.isDone ? "done" : ""} ${step.isRemain ? "" : step.key + "remain"
                                }`}
                              onClick={() => handleStepClick(i, step.key)}
                            >
                              <div className="step3 fourthStepremain" id="sevensteplogo" ></div>
                              <p className="stepLabel text-black mt-2">
                                {step.label}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </span>
                  </div>

                  <div className="row mt-3 mb-5 moneySendRespo m-auto justify-content-center">
                    <div className="col-lg-12 my-5 py-5  m-auto justify-content-center mt-0 pt-0">
                      {activeStep.components()}
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 p-0 pb-5">
                  <userContext.Provider
                    value={
                      { data1, setData1, SendMoneyData, setSendMoneyData }
                    }
                  >
                    <div className="step-component">

                      <div id="firstStep" >
                        <Step1
                          FirstStepData={setreceiver}
                          backDisplay={backDisplayfunction}
                          handleid={HandleFormId}
                          RecieverCountryId={RecieverCountryId}
                          sendingMoney={sendingMoneyValue}
                          DileveryCharge={DileveryCharge}
                          PaymentmethodName={PaymentmethodName}
                          handleShowVerifys={handleShowVerify}
                          FirstStepdata={FirstStepDataTrans}
                          TransactionIDUpdate={TrsnsactionId}
                          Default_Delivery_id={DefaultDel_Name}
                          setExchangerate={(value) => { setExchangerate(value) }}
                          setServiceCharge={(value) => { setServiceCharge(value); }}
                          PromoCodeVerify={PromoCodeVerify}
                          HandleChangeDelivery={R_Deliverymethod}
                          PremiumEXRateValue={(value) => { setPremiumExchangerate(value) }}
                          Moneychange={(value)=>{moneychange(value)}}
                        ></Step1>
                      </div>

                      <div
                      // id={`secondStep`} style={{ display: "none" }}
                      >
                        <Step2
                          backDisplay={backDisplay}
                          Displaynext={backDisplayfunction}
                          messageDialogshow={messageDialogshowValue}
                          RecieverCountryId={Reciver_CountryId}
                          SummurryDetails={SummurryDetails}
                          TransactionIDSet={handleTransId}
                          FirstStepData={FirstStepTransactionData}
                          visitNextStep={visitNextStep}
                          DefaultUserReciptionId={handleDefaultUserRecId}
                          DefaultDeliveryName={handleDefaultDeliveryName}
                          PromoCodeVerify={PromoCodeVerify}
                          SetServiceCharge={ServiceCharge}
                          SetExchangerate={Exchangerate}
                          HandleChangeDelivery={(e) => { setR_Deliverymethod(e) }}
                          PremiumEXRateValue={PremiumExchangerate}
                        ></Step2>
                      </div>

                      <div id="thirdStep" style={{ display: "none" }}>
                        <Step3
                          summaryData={SummuryId}
                          DefaultSummuryId={DefRecId}
                          RecieverCountryId={Reciver_CountryId}
                          backDisplay={backDisplayfunction}
                          sendingMoney={sendMoney}
                          sendMoneyDCharge={sendMoneyDCharge}
                          PaymentNamee={PAymentName}
                          TransactionIDUpdate={TrsnsactionId}
                          visitNextStep={visitNextStep}
                          FirstStepData={FirstStepTransactionData}
                          visitBackStep={handleGoFirstStep}
                          SetExchangerate={Exchangerate}
                          SetServiceCharge={ServiceCharge}
                          PromoCodeVerify={PromoCodeVerify}
                          PremiumEXRateValue={PremiumExchangerate}
                          moneychange={ChangesenDMoney}
                        ></Step3>
                      </div>

                      <div id="fourthStep" style={{ display: "none" }}>
                        <Step4 TransactionID={TrsnsactionId} PromoCodeVerify={PromoCodeVerify} PremiumEXRateValue={PremiumExchangerate} FirstStepData={FirstStepTransactionData} SetServiceCharge={ServiceCharge} SetExchangerate={Exchangerate} TrsnsactionData={TrsnsactionData}></Step4>
                      </div>

                    </div>
                  </userContext.Provider>
                  <div
                    className={`btn-component pe-5 ps-5 ${activeStep.key === "firstStep"
                      ? "d-flex justify-content-center"
                      : ""
                      } `}
                  >
                    {activeStep.key === "firstStep" ? (
                      // <input
                      //   className={`col-lg-3 uppercase  ${activeStep.key === "firstStep" ? "nextButtonStep1" : ""
                      //     }`}
                      //   type="button"
                      //   value={
                      //     steps1[steps1.length - 1].key !== activeStep.key
                      //       ? "Next"
                      //       : "Submit"
                      //   }
                      //   onClick={handleShowVerify}
                      // />
                      ""
                    ) : activeStep.key === "secondStep" ? (
                      <>
                        {/* <input
                          className={`col-lg-3 uppercase  ${activeStep.key == "secondStep"
                            ? "nextButtonStep1"
                            : ""
                            } ${DisplayButton == true
                            ? "d-block"
                            : "d-none"
                            }
                            `}
                          type="button"
                          value={
                            steps1[steps1.length - 1].key !== activeStep.key
                              ? "Next"
                              : "Submit"
                          }
                          onClick={visitNextStep}
                        // onClick={handleBussinessAndAgent}
                        /> */}
                      </>
                    ) : activeStep.key === "thirdStep" ? (
                      <>
                        {/* <input
                          className={`col-lg-3 uppercase  ${activeStep.key == "thirdStep"
                            ? "nextButtonStep1"
                            : ""
                            }`}
                          type="button"
                          value={
                            steps1[steps1.length - 1].key !== activeStep.key
                              ? "Next"
                              : "Submit"
                          }
                          onClick={visitNextStep}
                        /> */}
                      </>
                    ) : (
                      <>
                        {/* <input
                          className={`col-lg-3 uppercase  ${activeStep.key == "fourthStep"
                              ? "nextButtonStep1"
                              : ""
                            // : activeStep.key == "finalStep"
                            //   ? "nextButtonStep1"
                            //   : ""
                            }`}
                          type="button"
                          value={
                              steps1[steps1.length - 1].key !== activeStep.key
                                ? "NextU"
                                : "Submit"
                          }
                          onClick={() => {// console.log("its final step") }}
                        /> */}
                      </>
                    )}

                  </div>
                </div>
              </Row>
            </div>
          </div>
        </Container>

      </section>
      {/* <Footer></Footer> */}

      <Modal size='lg' show={show1} onHide={handleCloseVerify} centered>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="d-flex align-items-center"><img src={warning} /><span className="text-black mt-2"> &nbsp; &nbsp;  Fraud warning</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-4 mt-2">
          <small className="responsiveFontLarge  text-black ">
            Thieves pose as authentic companies and lure victims into paying fees in anticipation of receiving something of greater value, like a loan, credit card, grant, investment or inheritance money. The victim sends money to the scammer using a money transfer service, but then receives nothing in return. These loans, credit cards, grants, investments or inheritance sums never actually existed. And once the scammers get their money, they are never heard from again.
          </small>
          <p className="text-black pt-1 mt-4">Protect yourself from fraud</p>
          <ul className="">
            <li className="text-black" >Don’t send money for loan or credit card fees, customs or shipping fees.</li>
            <li className="text-black" >Don’t send money to someone you haven’t met in person.</li>
            <li className="text-black" >Be suspicious of businesses without a verified street address.</li>
            <li className="text-black" >Don’t pay for an item or service with a money transfer to an individual.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mt-2 col-lg-3 d-block m-auto nextBtn1"
            variant="primary"
            onClick={visitNextStep}
          >
            Yes ! i’m aware
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showIdUpdate} onHide={handleCloseIDVerify} dialogClassName="modal-warning">
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="d-flex align-items-center"><span className="text-black mt-2"> &nbsp; &nbsp;  Document Upload</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-4 mt-2">
          <Row>
            <Col className="col-lg-12 p-0">
              <div className="text-center">
                <label className="text-center fs-4 text-black mb-2">Upload Document</label>
              </div>
              <div className="mt-5">
                {/* <Form id=""> */}
                <Row className="d-flex m-auto">
                  <Col className="col-lg-12 d-flex">
                    <Col className=" pe-2">

                      <UploadFiles ></UploadFiles>
                    </Col>
                  </Col>
                </Row>
                {/* </Form> */}
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mt-2 col-lg-3 d-block m-auto nextBtn1"
            variant="primary"
            onClick={visitNextStep}
          >
            Upload Document
          </Button>

        </Modal.Footer>
        <br />
        {/* <br/> */}
      </Modal>

      {/*Signup not completed Popup*/}
      <Modal show={isSignupCompleted.showPopup} className="modelset lg">
        <div className="errmodel rounded-pill">
          <Modal.Body className="" closeButton>
            <div className="m-3">
              <center>
                <b><h4 className="mb-3 bolder capitalize">Incomplete User Details</h4></b>
                <p className="textColorDefault mb-3"><b>{isSignupCompleted.error}</b></p>
                <Button variant="primary" className="col-lg-10 rounded btnInfo justify-content-center"
                        onClick={handleGoToProfile}>
                  Go to profile
                </Button>
              </center>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );


}
