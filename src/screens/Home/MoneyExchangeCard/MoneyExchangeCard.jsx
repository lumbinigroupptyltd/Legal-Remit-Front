import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../../assets/assets/scss/pages/MoneyExchangeCard.scss";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import illustratorVector from "../../../assets/images/illustration.svg";
import info from "../../../assets/images/info.svg";
import "react-phone-input-2/lib/bootstrap.css";
// import $ from 'jquery'
import { country_list } from "../../Helpers/CountryPicker/customLabel";
import ReactFlagsSelect from "react-flags-select";
import Select from "react-dropdown-select";
import axios from "axios";
import { CommonConstants } from "../../../Constants/common.constants";
import Tooltip from "@mui/material/Tooltip";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import {
  Box,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
// second

const MoneyExchangeCard = ({ sendingMoney }) => {
  const navigate = useNavigate();
  const [select, setSelect] = useState("AU");
  const [select1, setSelect1] = useState("NP");
  const [fromCountry, setfromCountry] = useState(1);
  const [toCountry, settoCountry] = useState(0);
  const [id1, setId1] = useState(14);
  const [id2, setId2] = useState(154);
  const [senderCountries, setsenderCountries] = useState([]);
  const [receiverCountries, setreceiverCountries] = useState([]);
  const [flagSelect, setFlags] = useState([]);
  const [flagSelect1, setFlags1] = useState([]);
  const [estimateTimes, setEstimateTimes] = useState();
  const [ActivePaymentMethods, setActivePaymentMethods] = useState([]);
  const [ActiveDeliveryMethods, setActiveDeliveryMethods] = useState([]);
  const [PaymentName, setPaymentName] = useState("");
  const [DeliveryName, setDeliveryName] = useState("");
  const [sendMoney, setsendMoney] = useState(100);
  const [receiveMoney, setreceiveMoney] = useState(0);
  const [VerifyRefralPOPUP, setVerifyRefralPOPUP] = useState(false);
  const [maxSendingAmountPopUp, setmaxSendingAmountPopUp] = useState(false);
  const [SendMoneyDetailsMessage, setSendMoneyDetailsMessage] = useState("");
  const [SendMoneyDetailsStatus, setSendMoneyDetailsStatus] = useState(0);
  const [SendMoneyDocumentStatus, setSendMoneyDocumentStatus] = useState(0);
  const [MaxSendAmount, setMaxSendAmount] = useState(0);
  const [NullValuePresentMessage, setNullValuePresentMessage] = useState("");
  const [NullValuePopUp, setNullValuePopUp] = useState(false);

  const onSelect = (code) => {
    const matchedItem = countries.find((item) => item.iso2 === code);
    // setSenderCurruncy(matchedItem)
    setFlags(matchedItem);
    setSelect(code);
    setId1(findIdByISO2(code));
    GetAllRecivingCountrys(findIdByISO2(code));
    GetexChangeRate(findIdByISO2(code), id2);
  };

  const onSelect1 = (code) => {
    const matchedItem = countries1.find((item) => item.iso2 === code);
    //  setRecivingCurrency(matchedItem)
    setFlags1(matchedItem);
    setSelect1(code);
    setId2(findIdByISO2(code));
    GetexChangeRate(id1, findIdByISO2(code));
  };

  const [PaymentLowerUpper, setPaymentLowerUpper] = useState([]);
  const [DeliveryLowerUpper, setDeliveryLowerUpper] = useState([]);
  const [DefaultDSC, setDefaultDSC] = useState(0);
  const [DeafultPSC, setDeafultPSC] = useState(0);
  const [defaultDeliveryMethod, setDefaultDeliveryMethod] = useState("");
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState("");
  const [TotalRate, setTotalRate] = useState();
  const [PaymentRate, setPaymentRate] = useState(0);
  const [DileveryRate, setDileveryRate] = useState(0);
  const [selectedDeliveryServiceCharge, setSelectedDeliveryServiceCharge] =
    useState(0);
  const [selectedPaymentServiceCharge, setSelectedPaymentServiceCharge] =
    useState(0);
  const [temp, setTemp] = useState(100);
  const [focus, setFocus] = useState(false);
  const [countries, setCountries] = useState([]);
  const [countries1, setCountries1] = useState([]);
  const [PremiumExchangerate, setPremiumExchangerate] = useState(0);
  const [PremiumExchangerateAmount, setPremiumExchangerateAmount] = useState(0);

  function findIdByISO2(iso2) {
    const matchedItem = countries.find((item) => item.iso2 === iso2);
    return matchedItem ? matchedItem.id : 0;
  }

  const GetAllCountrys = async () => {
    const response = await axios.get(
      CommonConstants.BASE_URL + "/getallsendercountries"
    );
    if (response.data.status === true || response.data.status === "success") {
      setId1(response.data.data[0]?.id);
      setCountries(response.data.data);
      setFlags(response.data.data[0]);
      let sencountries = [];
      response.data.data.map((ele) => {
        sencountries.push(ele.iso2);
      });
      setsenderCountries(sencountries);
      let Id = response.data.data[0]?.id;
      GetActivePaymentMethod(Id);

      const getallrecivercountriesbysendercountryid = await axios.post(
        CommonConstants.BASE_URL + "/getallrecivercountriesbysendercountryid",
        { senderCountryId: Id }
      );
      setCountries1(getallrecivercountriesbysendercountryid.data.data);
      setFlags1(getallrecivercountriesbysendercountryid.data.data[0]);
      setId2(getallrecivercountriesbysendercountryid.data.data[0]?.id);
      let rescountries = [];
      getallrecivercountriesbysendercountryid.data.data.map((ele) => {
        rescountries.push(ele.iso2);
      });
      setreceiverCountries(rescountries);
      let ID2 = getallrecivercountriesbysendercountryid.data.data[0]?.id;
      GetexChangeRate(Id, ID2);
      GetActiveDeliveryMethod(ID2);
      handleGetDeliveryandPayment(sendMoney);
    }
  };

  const GetAllRecivingCountrys = async (Id) => {
    const getallrecivercountriesbysendercountryid = await axios.post(
      CommonConstants.BASE_URL + "/getallrecivercountriesbysendercountryid",
      { senderCountryId: Id }
    );
    setCountries1(getallrecivercountriesbysendercountryid.data.data);
    setFlags1(getallrecivercountriesbysendercountryid.data.data[0]);
    setId2(getallrecivercountriesbysendercountryid.data.data[0].id);
    let rescountries = [];
    getallrecivercountriesbysendercountryid.data.data.map((ele) => {
      rescountries.push(ele.iso2);
    });
    setreceiverCountries(rescountries);
    let ID2 = getallrecivercountriesbysendercountryid.data.data[0].id;
    setSelect1(rescountries[0]);
    GetexChangeRate(Id, ID2);
    GetActiveDeliveryMethod(ID2);
    handleGetDeliveryandPayment(sendMoney);
  };

  const GetexChangeRate = async (id1, id2) => {
    try {
      const sendData = {
        fromCountryId: id1,
        toCountryId: id2,
      };
      const Response = await axios.post(
        CommonConstants.BASE_URL + "/getexchangeratebycountryid",
        sendData
      );
      if (Response.data.status === true) {
        settoCountry(Response.data.data.publishedRate);

        if (localStorage.getItem("Id")) {
          const formData = new FormData();
          formData.append("receivingCountryId", id2);
          formData.append("userId", localStorage.getItem("Id"));

          const config = {
            method: "POST",
            url: CommonConstants.BASE_URL + "/getpremiumexratebycountryid",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
          };

          axios(config)
            .then(function (res) {
              if (res.data.status == true) {
                if (res.data.data != null) {
                  setPremiumExchangerateAmount(res.data.data?.maxAmtForPremium);
                  setPremiumExchangerate(res.data.data?.premiumAmount);
                  // setMoney(sendMoney,toCountry,response.data.data?.maxAmtForPremium,response.data.data?.premiumAmount);
                  // debugger
                  if (res.data.data != null) {
                    setMoney(
                      sendMoney,
                      Response.data.data.publishedRate,
                      res.data.data?.maxAmtForPremium,
                      res.data.data?.premiumAmount
                    );
                  } else {
                    setreceiveMoney(
                      Number(
                        (sendMoney * Response.data.data.publishedRate)
                          ?.toString()
                          ?.match(/^\d+(?:\.\d{0,2})?/)
                      )
                    );
                    // setreceiveMoney((sendMoney * Response.data.data.publishedRate).toFixed(2));
                  }
                } else {
                  setreceiveMoney(
                    Number(
                      (sendMoney * Response.data.data.publishedRate)
                        ?.toString()
                        ?.match(/^\d+(?:\.\d{0,2})?/)
                    )
                  );
                  // setreceiveMoney((sendMoney * Response.data.data.publishedRate).toFixed(2));
                  setPremiumExchangerateAmount(0);
                  setPremiumExchangerate(0);
                }
              } else {
                setreceiveMoney(
                  Number(
                    (sendMoney * Response.data.data.publishedRate)
                      ?.toString()
                      ?.match(/^\d+(?:\.\d{0,2})?/)
                  )
                );
                // setreceiveMoney((sendMoney * Response.data.data.publishedRate).toFixed(2));
                setPremiumExchangerateAmount(0);
                setPremiumExchangerate(0);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }

        // setreceiveMoney((sendMoney * Response.data.data.publishedRate).toFixed(2));
      } else {
        settoCountry(0);
        setreceiveMoney(
          Number((sendMoney * 0)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
        );
        // setreceiveMoney((sendMoney * 0).toFixed(2));
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const GetActiveDeliveryMethod = async (Rid) => {
    try {
      const data = {
        toCountryId: Rid,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallactivedeliverymethods ",
        data
      );
      if (response.data.status === true) {
        const Delivery = response.data.data.map((Delivery) => ({
          id: Delivery.id,
          name: Delivery.name,
          logo: Delivery.logo,
        }));
        setActiveDeliveryMethods(Delivery);
      }
    } catch (err) {
      // console.log(err)
    }
  };

  const GetActivePaymentMethod = async (id) => {
    try {
      const data = {
        fromCountryId: id,
        userId: localStorage.getItem("Id"),
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallactivepaymentmethods",
        data
      );
      if (response.data.status === true) {
        const Payments = response.data.data.map((payment) => ({
          id: payment.id,
          name: payment.name,
          logo: payment.logo,
        }));
        setActivePaymentMethods(Payments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HandleDeliverMethodName = (event, charge) => {
    let name = event.target.value;
    setDeliveryName(name);
    var ChargeRate = charge[0];
    setDileveryRate(ChargeRate);
    setTotalRate(ChargeRate + PaymentRate);
    getEstimateDeliveryTime();
    const selectedMethod = event.target.value;
    const selectedMethodServiceCharge = DeliveryLowerUpper.find(
      (item) => item.name === selectedMethod
    )?.serviceCharge;

    setSelectedDeliveryServiceCharge(selectedMethodServiceCharge);
    // console.log(selectedMethod);
  };

  const HandlePaymentMethod = (e, charge) => {
    let name = e.target.value;
    setPaymentName(name);
    var ChargeRate = charge[0];
    setPaymentRate(ChargeRate);
    setTotalRate(DileveryRate + ChargeRate);
    const selectedPaymentMethod = e.target.value;
    const selectedPaymentMethodServiceCharge = PaymentLowerUpper.find(
      (item) => item.name === selectedPaymentMethod
    ).serviceCharge;
    setSelectedPaymentServiceCharge(selectedPaymentMethodServiceCharge);
  };

  const getEstimateDeliveryTime = async () => {
    const postData = {
      pageindex: 1,
      pagesize: 5,
      searchdata: "%%",
      sortparam: "created_at",
      sortorder: "ASC",
    };
    const EstimateTime = await axios.post(
      CommonConstants.BASE_URL + "/getalldeliverymethods",
      postData
    );
    // console.log(EstimateTime, 'EstimateTime');
    const Estimate = EstimateTime.data.data.map((ele) => {
      const checkDeliveryMethod = DeliveryName === ele.deliveryTypeName;
      if (checkDeliveryMethod) {
        return ele.estimatedDelivery;
      }
    });
    const estimateValue = Estimate.find((time) => time !== null);
    setEstimateTimes(estimateValue || "Few Hours");
  };

  const setMoney = (SendingValue, ExRate, PremiumAmount, PremiumRate) => {
    // setsendMoney(SendingValue);
    // debugger
    if (PremiumAmount != undefined && PremiumRate != undefined) {
      if (Number(SendingValue) <= PremiumAmount) {
        let AcceptPremeumAmount = SendingValue;
        let AcceptPremiumExRate = AcceptPremeumAmount * (ExRate + PremiumRate);
        let TotalReciverble = Number(AcceptPremiumExRate);
        setreceiveMoney(
          Number(TotalReciverble?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
        );
        // setreceiveMoney((TotalReciverble).toFixed(2));
      } else {
        let WithoutPremeumAmount = SendingValue - PremiumAmount;
        let AcceptPremeumAmount = PremiumAmount;
        let AcceptPremiumExRate = AcceptPremeumAmount * (ExRate + PremiumRate);
        let WithoutPremiumExRate = 0;
        if (WithoutPremeumAmount != 0) {
          WithoutPremiumExRate = WithoutPremeumAmount * ExRate;
        }
        let TotalReciverble =
          Number(AcceptPremiumExRate) + Number(WithoutPremiumExRate);
        setreceiveMoney(
          Number(TotalReciverble?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
        );
        // setreceiveMoney((TotalReciverble).toFixed(2));
      }
    } else {
      setreceiveMoney(
        Number((SendingValue / ExRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
      );
      // setreceiveMoney((SendingValue / ExRate).toFixed(2));
    }
  };

  const setReciveMoney = (ReciveValue, ExRate) => {
    // debugger
    if (!isNaN(ReciveValue) && isFinite(ReciveValue)) {
      // debugger
      // Convert ReciveValue to a number and round it to 2 decimal places
      // const parsedValue = parseFloat(ReciveValue);
      setreceiveMoney(ReciveValue);
      // debugger

      let RecivingAmount =
        PremiumExchangerateAmount * (ExRate + PremiumExchangerate);
      // let Samount = (ReciveValue / ExRate)+(0.01*ExRate)
      let R_Amount = Number(ReciveValue) + 0.01 * ExRate;
      if (PremiumExchangerateAmount != 0 && PremiumExchangerate != 0) {
        if (Number(R_Amount) <= RecivingAmount) {
          let AcceptPremeumAmount = ReciveValue;
          let AcceptPremiumExRate =
            AcceptPremeumAmount / (ExRate + PremiumExchangerate) + 0.01;
          let TotalReciverble = Number(
            AcceptPremiumExRate?.toString()?.match(/^\d+(?:\.\d{0,2})?/)
          );
          // let TotalReciverble = Number(AcceptPremiumExRate)?.toFixed(2)
          setsendMoney(TotalReciverble);
        } else {
          let WithoutP_Amount = ReciveValue - RecivingAmount;
          let WithoutPremeumAmount = WithoutP_Amount / ExRate;
          let AcceptPremeumAmount =
            RecivingAmount / (ExRate + PremiumExchangerate);
          let TotalReciverble =
            Number(AcceptPremeumAmount) + Number(WithoutPremeumAmount) + 0.01;
          setsendMoney(
            Number(TotalReciverble?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
          );
          // setsendMoney((TotalReciverble)?.toFixed(2));
        }
      } else {
        setsendMoney(
          Number(
            (ReciveValue / ExRate + 0.01)
              ?.toString()
              ?.match(/^\d+(?:\.\d{0,2})?/)
          )
        );
        // setsendMoney(((ReciveValue / ExRate) + 0.01).toFixed(2));
      }
    } else {
      // Handle the case where ReciveValue is not a valid number
      // You can display an error message or take appropriate action here
    }
  };

  const setMoneySummurry = (e) => {
    // sendingMoney(e.target.value);
    let value = e.target.value;
    handleGetDeliveryandPayment(value);
  };

  const handleGetDeliveryandPayment = async (value) => {
    const Servicecharge = {
      amount: value,
      fromCountryId: id1,
      toCountryId: id2,
    };
    try {
      const getServiceCharge = await axios.post(
        CommonConstants.BASE_URL + "/getservicechargeforsendmoney",
        Servicecharge
      );
      // setgetAllPaymentMethodStatic(getServiceCharge.data.data)
      // setgetAllPaymentMethodCharge(getServiceCharge.data.data.paymentMethodCharges);
      // setgetAllDeliveryMethodCharge(getServiceCharge.data.data.deliveryMethodCharges);
      const ServiceChargearray = getServiceCharge.data?.data;
      // debugger
      if (ServiceChargearray != null) {
        setMaxSendAmount(getServiceCharge.data?.data?.maximumTransaction);
        const getAllDeliveryMethodCharge =
          getServiceCharge.data.data.deliveryMethodCharges;
        const getAllPaymentMethodCharge =
          getServiceCharge.data.data.paymentMethodCharges;
        const getAllPaymentMethodStatic = getServiceCharge.data.data;
        if (sendMoney !== 0 || "0") {
          var SC = [];
          ActivePaymentMethods.map((item, index) => {
            var aaa = getAllPaymentMethodCharge.map(
              (val) => val.type == item.name
            );
            SC.push(aaa[0]);
          });
          var LoWer123 = [];
          getAllPaymentMethodCharge.map((item, index) => {
            if (item.type == "Debit Card" || item.type == "Credit Card") {
              var DCA =
                sendMoney >= item.range[0].lower &&
                sendMoney <= item.range[0].upper
                  ? item.range[0].charge
                  : getAllPaymentMethodStatic.serviceCharge;
              var DCAOFC =
                sendMoney >= item.range[0].lower &&
                sendMoney <= item.range[0].upper
                  ? item.range[0].ourfees
                  : 0;
              var DCAFFC =
                sendMoney >= item.range[0].lower &&
                sendMoney <= item.range[0].upper
                  ? item.range[0].fixfees
                  : 0;
              var DCAAT = item.range[0].type;
              // console.log(DCAAT, 'DCAAT');
              var DCaLowerUpperServiceCharge = {
                name: item.type,
                serviceCharge:
                  Servicecharge.amount === "0" || Servicecharge.amount === ""
                    ? 0
                    : DCA,
                OurFees:
                  Servicecharge.amount === "0" || Servicecharge.amount === ""
                    ? 0
                    : DCAOFC,
                FixFees:
                  Servicecharge.amount === "0" || Servicecharge.amount === ""
                    ? 0
                    : DCAFFC,
                amountType: DCAAT,
              };
              LoWer123.push(DCaLowerUpperServiceCharge);
            } else {
              var bbb =
                sendMoney >= item.range[0].lower &&
                sendMoney <= item.range[0].upper
                  ? item.range[0].charge
                  : getAllPaymentMethodStatic.serviceCharge;
              var DCAAT = item.range[0].type;
              var LowerUpperServiceCharge = {
                name: item.type,
                serviceCharge:
                  Servicecharge.amount === "0" || Servicecharge.amount === ""
                    ? 0
                    : bbb,
                amountType: DCAAT,
              };
              LoWer123.push(LowerUpperServiceCharge);
              var lowestServiceChargePaymentMethod = LoWer123.reduce(
                (minMethod, currentMethod) => {
                  if (currentMethod.serviceCharge < minMethod.serviceCharge) {
                    return currentMethod;
                  } else {
                    return minMethod;
                  }
                }
              );
              setDefaultPaymentMethod(lowestServiceChargePaymentMethod.name);
              setDeafultPSC(lowestServiceChargePaymentMethod.serviceCharge);
            }
          });
          setPaymentLowerUpper(LoWer123);
        }

        if (sendMoney !== 0 || "0") {
          var DeliverySC = [];
          ActiveDeliveryMethods.map((item, index) => {
            var aaa = getAllDeliveryMethodCharge.map(
              (val) => val.type == item.name
            );
            DeliverySC.push(aaa[0]);
          });
          var DeliveryServiceChrage = [];
          getAllDeliveryMethodCharge.map((item, index) => {
            var bbb =
              sendMoney >= item.range[0].lower &&
              sendMoney <= item.range[0].upper
                ? item.range[0].charge
                : getAllPaymentMethodStatic.serviceCharge;
            var LowerUpperServiceCharge = {
              name: item.type,
              serviceCharge:
                Servicecharge.amount === "0" || Servicecharge.amount === ""
                  ? 0
                  : bbb,
            };
            DeliveryServiceChrage.push(LowerUpperServiceCharge);
          });
          setDeliveryLowerUpper(DeliveryServiceChrage);
          var lowestServiceChargeMethod = DeliveryServiceChrage.reduce(
            (minMethod, currentMethod) => {
              if (currentMethod.serviceCharge < minMethod.serviceCharge) {
                return currentMethod;
              } else {
                return minMethod;
              }
            }
          );
          setDefaultDeliveryMethod(lowestServiceChargeMethod.name);
          setDefaultDSC(lowestServiceChargeMethod.serviceCharge);
        }
      } else {
        setMaxSendAmount(0);
        setDeafultPSC(0);
        setDefaultDSC(0);
        setTotalRate(0);
        setPaymentRate(0);
        setDileveryRate(0);
        setDeliveryLowerUpper([]);
        setPaymentLowerUpper([]);
        setNullValuePresentMessage(getServiceCharge.data?.message);
      }
    } catch (err) {
      // console.log(err)
    }
  };

  const goToLogin = () => {
    navigate("/login");
    window.scrollTo(0, 0);
  };
  // co
  const goToSendMoney = async () => {
    const data = { id: localStorage.getItem("Id") };

    const response = await axios.post(
      CommonConstants.BASE_URL + "/getuserinfobyid",
      data
    );
    // console.log(response.data.data,"User info")
    if (
      response.data.data.roleId == 2 ||
      response.data.data.role == "Business" ||
      response.data.data.role == "Agent"
    ) {
      if (
        response.data.data.roleId == 2 ||
        response.data.data.role == "Business"
      ) {
        if (response.data.status === true) {
          var UserInfo = response.data.data;
          if (
            (UserInfo?.iddetails?.typeId == "" ||
              UserInfo?.iddetails?.documentNumber == "" ||
              UserInfo?.iddetails?.dob == "" ||
              UserInfo?.iddetails?.documentValidity == "" ||
              UserInfo?.iddetails?.issuingAuthority == "") &&
            (UserInfo?.userkycdetails?.streetName == "" ||
              UserInfo?.userkycdetails?.stateId == "" ||
              UserInfo?.userkycdetails?.nationality == "" ||
              UserInfo?.userkycdetails?.suburb == "" ||
              UserInfo?.userkycdetails?.postalCode == "" ||
              UserInfo?.userkycdetails?.occupationId == "") &&
            UserInfo?.role == "Business" &&
            (UserInfo?.businessDetails?.companyName == "" ||
              UserInfo?.businessDetails?.noDirector == 0 ||
              UserInfo?.businessDetails?.noEmployee == "" ||
              UserInfo?.businessDetails?.targetBusiness == "" ||
              UserInfo?.businessDetails?.expectedRemittance == "" ||
              UserInfo?.businessDetails?.noOfTranscation == 0)
          ) {
            setVerifyRefralPOPUP(true);
            setSendMoneyDetailsStatus(1);
            setSendMoneyDetailsMessage(
              "Your Business Details , KYC Details and ID Details are missing ,please fill missing data to proceed transactions."
            );

            if (
              UserInfo?.idDocuments?.length === 0 &&
              ((UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
                (UserInfo?.role == "Business" &&
                  UserInfo?.businessDocuments?.length === 0))
            ) {
              setSendMoneyDocumentStatus(1);
            } else if (UserInfo?.idDocuments?.length === 0) {
              setSendMoneyDocumentStatus(2);
            } else if (
              (UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
              (UserInfo?.role == "Business" &&
                UserInfo?.businessDocuments?.length === 0)
            ) {
              setSendMoneyDocumentStatus(3);
            }
          } else if (
            UserInfo?.role == "Business" &&
            (UserInfo?.businessDetails?.companyName == "" ||
              UserInfo?.businessDetails?.noDirector == 0 ||
              UserInfo?.businessDetails?.noEmployee == "" ||
              UserInfo?.businessDetails?.targetBusiness == "" ||
              UserInfo?.businessDetails?.expectedRemittance == "" ||
              UserInfo?.businessDetails?.noOfTranscation == 0)
          ) {
            setVerifyRefralPOPUP(true);
            setSendMoneyDetailsStatus(4);
            setSendMoneyDetailsMessage(
              "Your business Details are missing ,please fill missing data to proceed transactions."
            );

            if (
              UserInfo?.idDocuments?.length === 0 &&
              ((UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
                (UserInfo?.role == "Business" &&
                  UserInfo?.businessDocuments?.length === 0))
            ) {
              setSendMoneyDocumentStatus(1);
            } else if (UserInfo?.idDocuments?.length === 0) {
              setSendMoneyDocumentStatus(2);
            } else if (
              (UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
              (UserInfo?.role == "Business" &&
                UserInfo?.businessDocuments?.length === 0)
            ) {
              setSendMoneyDocumentStatus(3);
            }
          } else if (
            (UserInfo?.iddetails?.typeId == "" ||
              UserInfo?.iddetails?.documentNumber == "" ||
              UserInfo?.iddetails?.dob == "" ||
              UserInfo?.iddetails?.documentValidity == "" ||
              UserInfo?.iddetails?.issuingAuthority == "") &&
            (UserInfo?.userkycdetails?.streetName == "" ||
              UserInfo?.userkycdetails?.stateId == "" ||
              UserInfo?.userkycdetails?.nationality == "" ||
              UserInfo?.userkycdetails?.suburb == "" ||
              UserInfo?.userkycdetails?.postalCode == "" ||
              UserInfo?.userkycdetails?.occupationId == "")
          ) {
            setVerifyRefralPOPUP(true);
            setSendMoneyDetailsStatus(1);
            setSendMoneyDetailsMessage(
              "Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions."
            );

            if (
              UserInfo?.idDocuments?.length === 0 &&
              ((UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
                (UserInfo?.role == "Business" &&
                  UserInfo?.businessDocuments?.length === 0))
            ) {
              setSendMoneyDocumentStatus(1);
            } else if (UserInfo?.idDocuments?.length === 0) {
              setSendMoneyDocumentStatus(2);
            } else if (
              (UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
              (UserInfo?.role == "Business" &&
                UserInfo?.businessDocuments?.length === 0)
            ) {
              setSendMoneyDocumentStatus(3);
            }
          } else if (
            UserInfo?.userkycdetails?.streetName == "" ||
            UserInfo?.userkycdetails?.stateId == "" ||
            UserInfo?.userkycdetails?.nationality == "" ||
            UserInfo?.userkycdetails?.suburb == "" ||
            UserInfo?.userkycdetails?.postalCode == "" ||
            UserInfo?.userkycdetails?.occupationId == ""
          ) {
            setVerifyRefralPOPUP(true);
            setSendMoneyDetailsStatus(2);
            setSendMoneyDetailsMessage(
              "Your KYC details Details are missing. please fill missing data to proceed transactions."
            );
            if (
              UserInfo?.idDocuments?.length === 0 &&
              ((UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
                (UserInfo?.role == "Business" &&
                  UserInfo?.businessDocuments?.length === 0))
            ) {
              setSendMoneyDocumentStatus(1);
            } else if (UserInfo?.idDocuments?.length === 0) {
              setSendMoneyDocumentStatus(2);
            } else if (
              (UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
              (UserInfo?.role == "Business" &&
                UserInfo?.businessDocuments?.length === 0)
            ) {
              setSendMoneyDocumentStatus(3);
            }
          } else if (
            (UserInfo?.iddetails?.typeId == "" ||
              UserInfo?.iddetails?.documentNumber == "" ||
              UserInfo?.iddetails?.dob == "" ||
              UserInfo?.iddetails?.documentValidity == "" ||
              UserInfo?.iddetails?.issuingAuthority == "") &&
            UserInfo?.isDigital === false
          ) {
            setVerifyRefralPOPUP(true);
            setSendMoneyDetailsStatus(3);
            setSendMoneyDetailsMessage(
              "Your Id Details are missing. please fill missing data to proceed transactions."
            );
            if (
              UserInfo?.idDocuments?.length === 0 &&
              ((UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
                (UserInfo?.role == "Business" &&
                  UserInfo?.businessDocuments?.length === 0))
            ) {
              setSendMoneyDocumentStatus(1);
            } else if (UserInfo?.idDocuments?.length === 0) {
              setSendMoneyDocumentStatus(2);
            } else if (
              (UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
              (UserInfo?.role == "Business" &&
                UserInfo?.businessDocuments?.length === 0)
            ) {
              setSendMoneyDocumentStatus(3);
            }
          } else if (
            UserInfo?.role == "Business" &&
            (UserInfo?.businessDetails?.companyName == "" ||
              UserInfo?.businessDetails?.noDirector == 0 ||
              UserInfo?.businessDetails?.noEmployee == "" ||
              UserInfo?.businessDetails?.targetBusiness == "" ||
              UserInfo?.businessDetails?.expectedRemittance == "" ||
              UserInfo?.businessDetails?.noOfTranscation == 0)
          ) {
            setVerifyRefralPOPUP(true);
            setSendMoneyDetailsStatus(4);
            setSendMoneyDetailsMessage(
              "Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions."
            );

            if (
              UserInfo?.idDocuments?.length === 0 &&
              ((UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
                (UserInfo?.role == "Business" &&
                  UserInfo?.businessDocuments?.length === 0))
            ) {
              setSendMoneyDocumentStatus(1);
            } else if (UserInfo?.idDocuments?.length === 0) {
              setSendMoneyDocumentStatus(2);
            } else if (
              (UserInfo?.role == "Individual" &&
                UserInfo?.additionalDocuments?.length === 0) ||
              (UserInfo?.role == "Business" &&
                UserInfo?.businessDocuments?.length === 0)
            ) {
              setSendMoneyDocumentStatus(3);
            }
          } else {
            setSendMoneyDetailsStatus(0);
            setSendMoneyDocumentStatus(0);
            const Data = {
              amount: sendMoney,
              D_Method:
                DeliveryName != "" ? DeliveryName : defaultDeliveryMethod,
              P_Method: PaymentName != "" ? PaymentName : defaultPaymentMethod,
              sendingCurrencyCode: flagSelect.currency,
              recevingCurrencyCode: flagSelect1.currency,
            };
            navigate({
              pathname: "/sendmoney",
              state: { HomeScreenData: Data },
            });
            window.scrollTo(0, 0);
          }
        }
      } else {
        const Data = {
          amount: sendMoney,
          D_Method: DeliveryName != "" ? DeliveryName : defaultDeliveryMethod,
          P_Method: PaymentName != "" ? PaymentName : defaultPaymentMethod,
          sendingCurrencyCode: flagSelect.currency,
          recevingCurrencyCode: flagSelect1.currency,
        };
        navigate({ pathname: "/sendmoney", state: { HomeScreenData: Data } });
        window.scrollTo(0, 0);
      }
    }
  };

  const handleRedirectProfile = () => {
    navigate({
      pathname: "/profile",
      state: {
        Blank_Details: SendMoneyDetailsStatus,
        Document_Blank: SendMoneyDocumentStatus,
      },
    });
    setVerifyRefralPOPUP(false);
  };

  const convertCountryAmount = (value) => {
    const exchangeRate = toCountry;
    const australianAmount = value / exchangeRate + 0.01;
    return australianAmount.toFixed(2);
  };

  const ConvertNepaltoaus = (value) => {
    return (value * toCountry).toFixed(2);
  };

  useEffect(() => {
    if (!DileveryRate && !PaymentRate) {
      setTotalRate(DefaultDSC + DeafultPSC);
    } else if (DileveryRate && !PaymentRate) {
      setTotalRate(DileveryRate + DeafultPSC);
    } else if (!DileveryRate && PaymentRate) {
      setTotalRate(DefaultDSC + PaymentRate);
    } else {
      setTotalRate(DileveryRate + PaymentRate);
    }
  }, [PaymentRate, DileveryRate, TotalRate, DeafultPSC, DefaultDSC]);

  // useEffect(() => {
  // GetAllCountrys();
  // setTotalRate(selectedDeliveryServiceCharge + selectedPaymentServiceCharge)
  // }, [selectedDeliveryServiceCharge, selectedPaymentServiceCharge, TotalRate])

  useEffect(() => {
    GetAllCountrys();
  }, []);


  return (
    <>
      <div className="moneyCard">
        <Container>
          <Grid
            container
            // spacing={1}
            sx={{ display: {lg: "flex", md: "column", sm: "column", xs: "column"}, alignItems: "center"}}
          >
            <Grid
              item
              lg={7}
              sm={5}
              xs={12}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography
                variant="p"
                sx={{
                  fontSize: {
                    xs: "1rem",
                    sm: "1.5rem",
                    md: "2.2rem",
                    lg: "3rem",
                  },
                  fontWeight: 600,
                  margin: "0 1rem",
                }}
              >
                Send money from Australia to overseas in minutes or less!
              </Typography>
              <Grid className="imageVector moneySendRespo" sx={{height: {lg: "500px", md: "500px", sm: "200px", xs: "200px"}}}>
                <img src={illustratorVector} alt="demo" />
              </Grid>
            </Grid>
            <Grid item lg={5} sm={7} xs={12}>
              <Grid>
                <Card className="mt-2 ">
                  <Card.Body style={{borderTop: "6px solid #ab2ce2", borderBottom: "6px solid purple", borderRadius: "1.2rem"}} className="container-fluid innerBoxCard py-4 responsiveMainForMobile">
                    <Row>
                      <Col className="col-lg-12">
                        <div style={{ background: "#f2e0fb", borderRadius: "24px", padding: "0.8rem"}} className="mm lightPurpleShadeBackground fullRoundedCorner text-center responsiveFontLarge mainLabel">
                          Exchange Rate:{" "}
                          <b className="bolder">
                            {fromCountry}{" "}
                            {flagSelect ? flagSelect.currency : ""} ={" "}
                            {toCountry}{" "}
                            {flagSelect1 ? flagSelect1.currency : ""}
                          </b>{" "}
                        </div>
                      </Col>
                      <div className="dropdown-container">
                        <Form className="mt-4 position-relative">
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label style={{color: "#aa2ae1", fontSize: "1.2rem", fontWeight: "600"}} className="purpleText upparcase bolder ms-2 responsiveFontLarge">
                              You Send
                            </Form.Label>

                            <ReactFlagsSelect
                              className="responsiveFontLarge pt-1 drp12 mr-3 ReactFlagZIndex py-0"
                              selected={select}
                              onSelect={onSelect}
                              customLabels={country_list}
                              countries={senderCountries}
                              // style={{ zIndex: 10 }} // Set a lower z-index for the second dropdown
                            />
                            <Form.Control
                              type="text"
                              className="responsiveFontLarge countryDrp "
                              placeholder="0"
                              style={{ fontSize: 20, fontWeight: "bold" }}
                              value={sendMoney}
                              min={0}
                              onChange={(e) => {
                                // const inputValue = e.target.value.replace(/[^0-9]/g, ''); // Filter out non-numeric characters
                                let values = e.target.value;
                                const newValue = values.replace(/[^0-9.]/g, "");
                                var cleanedValue = newValue.replace(
                                  /\./g,
                                  function (match, offset, input) {
                                    return offset === input.indexOf(".")
                                      ? match
                                      : "";
                                  }
                                );
                                setTemp(cleanedValue);
                                setsendMoney(cleanedValue);
                                setMoney(
                                  cleanedValue,
                                  toCountry,
                                  PremiumExchangerateAmount,
                                  PremiumExchangerate
                                );
                              }}
                              onBlur={(e) => setMoneySummurry(e)}
                              onFocus={(e) => setFocus(false)}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label  style={{color: "#aa2ae1", fontSize: "1.2rem", fontWeight: "600"}} className="purpleText upparcase bolder ms-2 responsiveFontLarge">
                              You Recieve
                            </Form.Label>

                            <ReactFlagsSelect
                              style={{ zIndex: 9999 }}
                              className="z-index pt-1 drp12 mr-3 "
                              selected={select1}
                              onSelect={onSelect1}
                              countries={receiverCountries}
                              customLabels={country_list}
                              // style={{ zIndex: 1 }} // Set a higher z-index for the first dropdown
                            />
                            <Form.Control
                              type="text"
                              className="countryDrp"
                              placeholder="0"
                              style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                zIndex: 0,
                              }}
                              // value={focus ? temp : ConvertNepaltoaus(temp) === 'NaN' ? 0 : ConvertNepaltoaus(temp)}
                              value={receiveMoney}
                              onChange={(e) => {
                                let values = e.target.value;
                                const newValue = values.replace(/[^0-9.]/g, "");
                                var cleanedValue = newValue.replace(
                                  /\./g,
                                  function (match, offset, input) {
                                    return offset === input.indexOf(".")
                                      ? match
                                      : "";
                                  }
                                );
                                // setTemp(cleanedValue);
                                setReciveMoney(cleanedValue, toCountry);
                              }}
                              onFocus={(e) => setFocus(true)}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label  style={{color: "#aa2ae1", fontSize: "1.2rem", fontWeight: "600"}} className="purpleText upparcase bolder ms-2 responsiveFontLarge">
                              DELIVERY METHOD
                            </Form.Label>

                            <Form.Select
                              aria-label="Default select example"
                              className="responsiveFontLarge"
                              value={
                                DeliveryName != ""
                                  ? DeliveryName
                                  : defaultDeliveryMethod
                              }
                              onChange={(e) => {
                                HandleDeliverMethodName(
                                  e,
                                  sendMoney !== 0
                                    ? DeliveryLowerUpper.filter(
                                        (val) => val.name === e.target.value
                                      ).map((val) =>
                                        val.serviceCharge
                                          ? val.serviceCharge
                                          : 0
                                      )
                                    : sendMoney
                                );
                              }}
                            >
                              {ActiveDeliveryMethods &&
                                ActiveDeliveryMethods.map(
                                  (DeliveryMethod, i) => {
                                    return (
                                      <option
                                        key={i}
                                        value={DeliveryMethod.name}
                                      >
                                        {DeliveryMethod.name}
                                      </option>
                                    );
                                  }
                                )}
                            </Form.Select>
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label  style={{color: "#aa2ae1", fontSize: "1.2rem", fontWeight: "600"}} className="responsiveFontLarge purpleText upparcase bolder ms-2">
                              PAYMENT METHOD
                            </Form.Label>

                            <Form.Select
                              aria-label="Default select example"
                              className="responsiveFontLarge"
                              value={
                                PaymentName != ""
                                  ? PaymentName
                                  : defaultPaymentMethod
                              }
                              onChange={(e) => {
                                HandlePaymentMethod(
                                  e,
                                  sendMoney !== 0
                                    ? PaymentLowerUpper.filter(
                                        (val) => val.name === e.target.value
                                      ).map((val) => {
                                        if (
                                          val.name === "Debit Card" ||
                                          val.name === "Credit Card"
                                        ) {
                                          if (val.amountType === "amount") {
                                            var amountvalue =
                                              val.serviceCharge +
                                              val.OurFees +
                                              val.FixFees;
                                            return amountvalue !== 0 ||
                                              amountvalue !== ""
                                              ? amountvalue
                                              : "0";
                                          } else if (
                                            val.amountType === "percentage"
                                          ) {
                                            var percentageCharge =
                                              sendMoney *
                                              (val.serviceCharge / 100);
                                            return (
                                              percentageCharge +
                                              val.OurFees +
                                              val.FixFees
                                            );
                                          }
                                        } else {
                                          return sendMoney === 0
                                            ? 0
                                            : val.serviceCharge;
                                        }
                                      })
                                    : sendMoney
                                );
                              }}
                            >
                              {ActivePaymentMethods &&
                                ActivePaymentMethods.map((ele, i) => {
                                  return (
                                    <option key={i} value={ele.name}>
                                      {ele.name}
                                    </option>
                                  );
                                })}
                            </Form.Select>
                          </Form.Group>

                          <Form.Group
                            className=""
                            controlId="formBasicEmail ms-2"
                          >
                            <div className="d-flex justify-content-between align-items-center mb-2 mt-2">
                              <label className="d-flex align-items-center normal grayShade mb-0 responsiveFontLarge">
                                Delivery Estimation Time{" "}
                                <Tooltip
                                  placement="top"
                                  title="This is an estimation based on normal scenarios.  Our 99% of transactions get delivered within this time frame."
                                >
                                  <img
                                    src={info}
                                    className="ms-2 info-icon img-fluid pointer"
                                  />
                                </Tooltip>
                              </label>
                              <label className="eventNone purpleText bolder mb-0 normal responsiveFontLarge">
                                {estimateTimes ? estimateTimes : "Few Hours"}
                              </label>
                            </div>
                            <div className="d-flex justify-content-between">
                              <label className="d-flex grayShade normal responsiveFontLarge">
                                Service charge{" "}
                                <div>
                                  <Tooltip
                                    placement="top"
                                    title="The service charges are subject to variation depending on your chosen delivery method, payment option, and destination country. We apply a specific service fee in consideration of the services provided to you."
                                  >
                                    <img
                                      src={info}
                                      className="ms-2 info-icon img-fluid pointer"
                                    />
                                  </Tooltip>
                                </div>
                              </label>
                              <label className="responsiveFontLarge eventNone purpleText normal  mb-2 ">
                                {TotalRate == 0
                                  ? Number(
                                      (DeafultPSC + DefaultDSC)
                                        ?.toString()
                                        ?.match(/^\d+(?:\.\d{0,2})?/)
                                    )
                                  : Number(
                                      TotalRate?.toString()?.match(
                                        /^\d+(?:\.\d{0,2})?/
                                      )
                                    )}{" "}
                                {flagSelect ? flagSelect.currency : ""}
                                {/* {TotalRate == 0 ? (DeafultPSC + DefaultDSC)?.toFixed(2) : TotalRate?.toFixed(2)} {flagSelect ? flagSelect.currency : ''} */}
                              </label>
                            </div>
                            <div className="d-flex justify-content-between">
                              <label className="responsiveFontLarge d-flex uppercase text-black">
                                {" "}
                                TOTAL PAYABLE
                                <div>
                                  <Tooltip
                                    placement="top"
                                    title='The "Total Payable" amount represents the aggregate sum owed to us for this transaction. This encompasses service fees, any eligible discounts, applicable taxes, and various other service-related costs'
                                  >
                                    <img
                                      src={info}
                                      className="ms-2 info-icon img-fluid pointer"
                                    />
                                  </Tooltip>
                                </div>
                              </label>
                              {/* <label className="responsiveFontLarge eventNone purpleText bolder">{TotalRate == 0 ? (parseFloat(DeafultPSC + DefaultDSC) + parseFloat(sendMoney))?.toFixed(2) : (TotalRate && sendMoney ? parseFloat(TotalRate) + parseFloat(sendMoney) : 0).toFixed(2)} {""} */}
                              <label className="responsiveFontLarge eventNone purpleText bolder">
                                {TotalRate == 0
                                  ? Number(
                                      (
                                        parseFloat(DeafultPSC + DefaultDSC) +
                                        parseFloat(sendMoney)
                                      )
                                        ?.toString()
                                        ?.match(/^\d+(?:\.\d{0,2})?/)
                                    )
                                  : Number(
                                      (TotalRate && sendMoney
                                        ? parseFloat(TotalRate) +
                                          parseFloat(sendMoney)
                                        : 0
                                      )
                                        ?.toString()
                                        ?.match(/^\d+(?:\.\d{0,2})?/)
                                    )}{" "}
                                {""}
                                {flagSelect ? flagSelect.currency : ""}
                              </label>
                            </div>
                          </Form.Group>
                          <div className="col-lg-8 d-block m-auto">
                            {localStorage.getItem("loginkey") === "true" ? (
                              <Button
                                className="purpleBackground capitalize bgSend medium"
                                onClick={(e) => {
                                  if (NullValuePresentMessage !== "") {
                                    setNullValuePopUp(true);
                                  } else {
                                    if (localStorage.getItem("rollID") == 2) {
                                      if (sendMoney <= MaxSendAmount) {
                                        setmaxSendingAmountPopUp(false);
                                        goToSendMoney(e);
                                      } else {
                                        setmaxSendingAmountPopUp(true);
                                      }
                                    } else {
                                      goToSendMoney(e);
                                    }
                                  }
                                }}
                              >
                                Send Money
                              </Button>
                            ) : (
                              <Button
                                className="purpleBackground capitalize bgSend medium"
                                style={{
                                  width: "100%",
                                  padding: "10px",
                                  margin: "10px",
                                }}
                                onClick={goToLogin}
                              >
                                Login
                              </Button>
                            )}
                          </div>
                        </Form>
                      </div>
                    </Row>
                  </Card.Body>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <Container>
         
          <Modal
            show={VerifyRefralPOPUP}
            onHide={() => {
              setVerifyRefralPOPUP(false);
            }}
            centered
          >
            <Modal.Header closeButton className="border-bottom">
              <Modal.Title className="purpleText">
                <span className="text-black mt-2">Alert</span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mt-3">
              <p>{SendMoneyDetailsMessage}</p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-around">
              <Button
                className="purpleBackground border-0 col col-lg-3"
                onClick={() => {
                  handleRedirectProfile();
                }}
              >
                Ok
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal
            show={maxSendingAmountPopUp}
            onHide={() => {
              setmaxSendingAmountPopUp(false);
            }}
            backdrop="static"
            keyboard={false}
            size="md"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="purpleText">Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* You can not send amount more than {MaxSendAmount}. */}
              You can send a maximum of AUD {MaxSendAmount} in a single
              transaction. Please enter the value below ${MaxSendAmount}. To
              send money above ${MaxSendAmount} please create another
              transaction again. Service fees are subject to apply per
              transaction.
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <div className="col-lg-6">
                <Button
                  variant="secondary"
                  className="purpleBackground"
                  onClick={() => {
                    setmaxSendingAmountPopUp(false);
                  }}
                >
                  OK
                </Button>
              </div>
            </Modal.Footer>
          </Modal>

          <Modal
            show={NullValuePopUp}
            onHide={() => {
              setNullValuePopUp(false);
            }}
            backdrop="static"
            keyboard={false}
            size="md"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title className="purpleText">Alert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              you can't send amount exide your limits.
              {/* You can send a maximum of AUD {MaxSendAmount} in a single transaction. Please enter the value below ${MaxSendAmount}. To send money above ${MaxSendAmount} please create another transaction again. Service fees are subject to apply per transaction. */}
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
              <div className="col-lg-6">
                <Button
                  variant="secondary"
                  className="purpleBackground"
                  onClick={() => {
                    setNullValuePopUp(false);
                  }}
                >
                  OK
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default MoneyExchangeCard;
