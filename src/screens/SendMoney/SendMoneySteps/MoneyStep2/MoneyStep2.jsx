import React, { useState, useEffect } from "react";
import "./MoneyStep2.scss";
import plus from "../../../../assets/images/PlusBG.svg";
import searchMan from "../../../../assets/images/searchman.svg";
import editBtn from "../../../../assets/images/editBG.svg";
import deleteBtn from "../../../../assets/images/deletBg.svg";
import people from "../../../../assets/images/people.svg";
import groupPeople from "../../../../assets/images/groupPeople.svg";
import case1 from "../../../../assets/images/suitcase.svg";
import backA from "../../../../assets/images/BackArrow.svg";
import bankIcon from "../../../../assets/images/mdi_bank.svg";
import drpa from "../../../../assets/images/drparrw.svg";
import Form from "react-bootstrap/Form";
import walletIcon from "../../../../assets/images/ion_wallet.svg";
import cashW from "../../../../assets/images/bi_cash-stack.svg";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { CommonConstants } from "../../../../Constants/common.constants";
import axios from "axios";
import Loader from "../../../Loader/Loader";

import Button1 from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import info from "../../../../assets/images/info11.svg";
import tickIcon from "../../../../assets/images/mdi_tick-circle-outline.svg";

const bankIcon1 = bankIcon; // Provide the path to your bank icon image

export default function MoneyStep2({
  backDisplay,
  Displaynext,
  messageDialogshow,
  RecieverCountryId,
  SummurryDetails,
  TransactionIDSet,
  visitNextStep,
  DefaultUserReciptionId,
  FirstStepData,
  DefaultDeliveryName,
  PromoCodeVerify,
  HandleChangeDelivery,
  SetServiceCharge,
  SetExchangerate,
  PremiumEXRateValue
}) {
  // console.log("servicecharge :",SetServiceCharge,"ExchangeRate :" ,SetExchangerate)
  const location = useLocation();
  // console.log("SubmitAmount :",location.state?.TransactionData?.amount,"Firststep Amount :" ,FirstStepData.amount)
  const [show3, setShowRec] = useState(false);
  const handleCloseRec = () => setShowRec(false);
  const handleShowRec = () => setShowRec(true);
  const [show5, setShowRec3] = useState(false);
  const [show6, setShowRec6] = useState(false);
  const [show7, setShowRec7] = useState(false);
  const [messageDialog, setmessageDialog] = useState(false);
  const handleCloseRec7 = () => setShowRec7(false);
  const handleShowRec7 = () => setShowRec7(true);
  const [saveTansaction, setSaveTansaction] = useState([]);
  const [SaveTansactionID, setSaveTansactionID] = useState(
    location.state?.TransactionData != undefined
      ? location.state?.TransactionData?.id
      : undefined
  );
  const [userEmail, setUserEmail] = useState("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState();
  // console.log(FirstStepData,"All FirstStep Data")
  const [loadervalue, setloadervalue] = useState(false);
  const [ExistUserWithMwthod, setExistUserWithMwthod] = useState(false);
  const [ExistUserWithsameMethod, setExistUserWithsameMethod] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedItem, setSelectedItem] = useState("Bank Deposit");
  const [selectedImage, setSelectedImage] = useState(bankIcon); // Provide the default image path
  const [show, setShowDelivery] = useState(false);
  const [RequestChangetoadmin, setRequestChangetoadmin] = useState(false);

  const [ActiveDeliveryMethods, setActiveDeliveryMethods] = useState([]);
  const handleCloseDelivery = () => setShowDelivery(false);
  const [DeliveryID, setDeliveryID] = useState(FirstStepData
    ? FirstStepData?.deliveryMethodId : location.state && location.state?.TransactionData
    ? location.state?.TransactionData?.deliveryMethodId
    : 0);
  const [DeliveryName, setDeliveryName] = useState("");
  const [deliveryName, setdeliveryName] = useState("");
  const [defaultDeliveryMethod, setDefaultDeliveryMethod] = useState("");
  const [DefaultDSC, setDefaultDSC] = useState(0);
  const [DeliveryLowerUpper, setDeliveryLowerUpper] = useState([]);
  const [DeafultPSC, setDeafultPSC] = useState(0);
  const [PaymentRate, setPaymentRate] = useState(0);
  const [ActivePaymentMethods, setActivePaymentMethods] = useState([]);
  const [PaymentLowerUpper, setPaymentLowerUpper] = useState([]);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState("");
  const [ActiveDeliveryMethodsId, setActiveDeliveryMethodsId] = useState();
  const [TotalRate, setTotalRate] = useState();
  const [DileveryRate, setDileveryRate] = useState(0);
  const [dynamicDeliveryID, setdynamicDeliveryID] = useState();
  const [TotalServicecharge, setTotalServicecharge] = useState(0);

  const GetActiveDeliveryMethod = async (Rid) => {
    try {
      // const data = {
      //   toCountryId: Rid,
      // };
      // const response = await axios.post(
      //   CommonConstants.BASE_URL + "/getallactivedeliverymethods ",
      //   data
      // );
      // if (response.data.status === true) {
      //   const Delivery = response.data.data.map((Delivery) => ({
      //     id: Delivery.id,
      //     name: Delivery.name,
      //     logo: Delivery.logo,
      //     estimatedDelivery: Delivery.estimatedDelivery,
      //   }));

      //   setActiveDeliveryMethods(Delivery);
      //   const Estimate = Delivery.map((ele) => {
      //     const checkDeliveryMethod = DeliveryName === ele.name;
      //     if (checkDeliveryMethod) {
      //       return ele.estimatedDelivery;
      //     }
      //   });
      //   const estimateValue = Estimate.find((time) => time !== undefined);
      // } else if (response.data.status === false) {
      // }
    } catch (err) {}
  };

  const GetActivePaymentMethod = async (id) => {
    try {
      const data = {
        fromCountryId: id,
        userId:localStorage.getItem("Id")
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
      } else if (response.data.status === false) {
      }
    } catch (err) {}
  };

  const handleGetDeliveryandPayment = async (fromcountry,tocountry,value) => {
    const Servicecharge = {
      amount: value,
      fromCountryId: fromcountry,
      toCountryId: tocountry,
    };
    try {
      const getServiceCharge = await axios.post(
        CommonConstants.BASE_URL + "/getservicechargeforsendmoney",
        Servicecharge
      );
      const ServiceChargearray = getServiceCharge.data?.data;
      if (ServiceChargearray != null) {
      const getAllDeliveryMethodCharge =
        getServiceCharge.data.data.deliveryMethodCharges;
      const getAllPaymentMethodCharge =
        getServiceCharge.data.data.paymentMethodCharges;
      const getAllPaymentMethodStatic = getServiceCharge.data.data;
      if (
        (FirstStepData && FirstStepData?.amount
          ? FirstStepData?.amount
          : location.state && location.state?.TransactionData
          ? location.state?.TransactionData?.amount
          : 0) != 0 ||
        "0"
      ) {
        var SC = [];
        ActivePaymentMethods.map((item, i) => {
          var aaa = getAllPaymentMethodCharge.map(
            (val) => val.type == item?.name
          );
          SC.push(aaa[0]);
        });

        var LoWer123 = [];
        getAllPaymentMethodCharge.map((item, index) => {
          // debugger
          if (item.type == "Debit Card" || item.type == "Credit Card") {
            var bbba = item?.range.filter(
              (items, i) =>
                (FirstStepData && FirstStepData?.amount
                ? FirstStepData?.amount
                : location.state && location.state?.TransactionData
                ? location.state?.TransactionData?.amount
                : 0) >= items.lower &&
                (FirstStepData && FirstStepData?.amount
                ? FirstStepData?.amount
                : location.state && location.state?.TransactionData
                ? location.state?.TransactionData?.amount
                : 0) <= items.upper
            );


            var DCA =
              bbba?.length == 0
                ? getAllPaymentMethodStatic?.serviceCharge
                : bbba[0]?.charge;
              // (FirstStepData && FirstStepData?.amount
              //   ? FirstStepData?.amount
              //   : location.state && location.state?.TransactionData
              //   ? location.state?.TransactionData?.amount
              //   : 0) >= item.range[0].lower &&
              // (FirstStepData && FirstStepData?.amount
              //   ? FirstStepData?.amount
              //   : location.state && location.state?.TransactionData
              //   ? location.state?.TransactionData?.amount
              //   : 0) <= item.range[0].upper
              //   ? item.range[0].charge
              //   : getAllPaymentMethodStatic.serviceCharge;
            var DCAOFC =
              bbba?.length == 0
                    ? item?.range[item?.range?.length - 1]?.ourfees
                    : bbba[0]?.ourfees;
              // (FirstStepData && FirstStepData?.amount
              //   ? FirstStepData?.amount
              //   : location.state && location.state?.TransactionData
              //   ? location.state?.TransactionData?.amount
              //   : 0) >= item.range[0].lower &&
              // (FirstStepData && FirstStepData?.amount
              //   ? FirstStepData?.amount
              //   : location.state && location.state?.TransactionData
              //   ? location.state?.TransactionData?.amount
              //   : 0) <= item.range[0].upper
              //   ? item.range[0].ourfees
              //   : 0;
            var DCAFFC =
              bbba?.length == 0
                    ? item?.range[item?.range?.length - 1]?.fixfees
                    : bbba[0]?.fixfees;
              // (FirstStepData && FirstStepData?.amount
              //   ? FirstStepData?.amount
              //   : location.state && location.state?.TransactionData
              //   ? location.state?.TransactionData?.amount
              //   : 0) >= item.range[0].lower &&
              // (FirstStepData && FirstStepData?.amount
              //   ? FirstStepData?.amount
              //   : location.state && location.state?.TransactionData
              //   ? location.state?.TransactionData?.amount
              //   : 0) <= item.range[0].upper
              //   ? item.range[0].fixfees
              //   : 0;
            var DCAAT =  bbba?.length == 0 ? "amount" : bbba[0]?.type;

            var calculationServicecharge =
                bbba?.length == 0
                  ? item?.range[item?.range?.length - 1]?.charge
                  : (DCAAT == "percentage"
                      ? Number(value * (bbba[0]?.charge / 100))
                      : bbba[0]?.charge) +
                    Number(bbba[0]?.ourfees) +
                    Number(bbba[0]?.fixfees);

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
              calculationServicecharge:
                  value === "0" || value === "" ? 0 : calculationServicecharge
            };
            LoWer123.push(DCaLowerUpperServiceCharge);
          } else {
            var bbbaa = item?.range.filter(
              (items, i) =>
                (FirstStepData && FirstStepData?.amount
                ? FirstStepData?.amount
                : location.state && location.state?.TransactionData
                ? location.state?.TransactionData?.amount
                : 0) >= items.lower &&
                (FirstStepData && FirstStepData?.amount
                ? FirstStepData?.amount
                : location.state && location.state?.TransactionData
                ? location.state?.TransactionData?.amount
                : 0) <= items.upper
            );

            var bbb =
              bbbaa.length == 0
                ? item?.range[item?.range?.length - 1]?.charge
                : bbbaa[0].charge;
              // (FirstStepData && FirstStepData?.amount
              //   ? FirstStepData?.amount
              //   : location.state && location.state?.TransactionData
              //   ? location.state?.TransactionData?.amount
              //   : 0) >= item.range[0].lower &&
              // (FirstStepData && FirstStepData?.amount
              //   ? FirstStepData?.amount
              //   : location.state && location.state?.TransactionData
              //   ? location.state?.TransactionData?.amount
              //   : 0) <= item.range[0].upper
              //   ? item.range[0].charge
              //   : getAllPaymentMethodStatic.serviceCharge;
              var DCAATT = bbbaa.length == 0 ? "amount" : bbbaa[0].type;

            var LowerUpperServiceCharge = {
              name: item.type,
              serviceCharge:
                Servicecharge.amount === "0" || Servicecharge.amount === ""
                  ? 0
                  : bbb,
              amountType: DCAATT,
              calServicecharge: value === "0" || value === "" ? 0 : bbb,
            };

            LoWer123.push(LowerUpperServiceCharge);
          }
        });
        // setPaymentLowerUpper(LoWer123);
        const Transaction_P_Data =
          location.state && location.state.TransactionData != undefined
            ? LoWer123?.filter(
                (method) =>
                  method?.name == location.state.TransactionData?.paymentMethod
              )
            : FirstStepData != ""
            ? LoWer123?.filter(
                (method) =>
                  method?.name == FirstStepData?.paymentMethod
              )
            : 0;

        if (LoWer123.length > 0) {
          const sortedPaymentMethods =
            Transaction_P_Data === 0
              ?
              LoWer123.sort((a, b) => {
                if (a.calServicecharge === b.calServicecharge) {
                  if (a.name === "Pay To") {
                    return -1;
                  } else if (b.name === "Pay To") {
                    return 1;
                  }
                }
                return a.calServicecharge - b.calServicecharge;
              })
              : Transaction_P_Data;
          let lowestServiceChargeMethod = [];
          let totalCharge;
          // debugger
          if (
            sortedPaymentMethods.length > 0 &&
            (sortedPaymentMethods[0].name === "Debit Card" ||
              sortedPaymentMethods[0].name === "Credit Card")
          ) {
            const debitCreditCard = sortedPaymentMethods[0];
            totalCharge =
              debitCreditCard.serviceCharge +
              debitCreditCard.OurFees +
              debitCreditCard.FixFees;
          }
          const filteredPaymentMethods = sortedPaymentMethods.filter(
            (method) =>
              method.name != "Debit Card" && method.name != "Credit Card"
          );
          if (filteredPaymentMethods.length > 0) {
            lowestServiceChargeMethod = filteredPaymentMethods.reduce(
              (prev, current) =>
                prev.serviceCharge < current.serviceCharge ? prev : current
            );
          }
          if (lowestServiceChargeMethod.serviceCharge < totalCharge) {
            setDefaultPaymentMethod(lowestServiceChargeMethod.name);
            if (lowestServiceChargeMethod.amountType == "amount") {
              var data =
                lowestServiceChargeMethod.serviceCharge +
                (lowestServiceChargeMethod.OurFees
                  ? lowestServiceChargeMethod.OurFees
                  : 0) +
                (lowestServiceChargeMethod.FixFees
                  ? lowestServiceChargeMethod.FixFees
                  : 0);
              setDeafultPSC(data);
              // PaymentRate(data)
            } else {
              var percentageCharge =
                ((FirstStepData && FirstStepData?.amount
                  ? FirstStepData?.amount
                  : location.state && location.state?.TransactionData
                  ? location.state?.TransactionData?.amount
                  : 0) *
                  lowestServiceChargeMethod.serviceCharge) /
                100;
              const mydata =
                percentageCharge +
                (lowestServiceChargeMethod.OurFees
                  ? lowestServiceChargeMethod.OurFees
                  : 0) +
                (lowestServiceChargeMethod.FixFees
                  ? lowestServiceChargeMethod.FixFees
                  : 0);
              setDeafultPSC(percentageCharge);
              // PaymentRate(percentageCharge)
            }
          } else {
            setDefaultPaymentMethod(sortedPaymentMethods[0].name);
            if (sortedPaymentMethods[0].amountType === "amount") {
              var amountvalue =
                sortedPaymentMethods[0].serviceCharge +
                (sortedPaymentMethods[0].OurFees
                  ? sortedPaymentMethods[0].OurFees
                  : 0) +
                (sortedPaymentMethods[0].FixFees
                  ? sortedPaymentMethods[0].FixFees
                  : 0);
              setDeafultPSC(amountvalue);
              // PaymentRate(amountvalue)
            } else if (sortedPaymentMethods[0].amountType === "percentage") {
              var DebitCreditpercentageCharge =
                (FirstStepData && FirstStepData?.amount
                  ? FirstStepData?.amount
                  : location.state && location.state?.TransactionData
                  ? location.state?.TransactionData?.amount
                  : 0) *
                (sortedPaymentMethods[0].serviceCharge / 100);
              const mydata =
                DebitCreditpercentageCharge +
                sortedPaymentMethods[0].OurFees +
                sortedPaymentMethods[0].FixFees;
              // amountvalue(mydata);
              setDeafultPSC(mydata);
              // PaymentRate(mydata)
            }
          }
        }
      }

      if (
        (FirstStepData && FirstStepData?.amount
          ? FirstStepData?.amount
          : location.state && location.state?.TransactionData
          ? location.state?.TransactionData?.amount
          : 0) !== 0 ||
        "0"
      ) {
        var DeliverySC = [];
        ActiveDeliveryMethods.map((item, index) => {
          var aaa = getAllDeliveryMethodCharge.map(
            (val) => val.type == item.name
          );
          DeliverySC.push(aaa[0]);
        });

        var DeliveryServiceChrage = [];

        getAllDeliveryMethodCharge.map((item, index) => {

          var bbba = item?.range.filter(
            (items, i) =>
            (FirstStepData && FirstStepData?.amount
              ? FirstStepData?.amount
              : location.state && location.state?.TransactionData
              ? location.state?.TransactionData?.amount
              : 0) >= items.lower &&
              (FirstStepData && FirstStepData?.amount
                ? FirstStepData?.amount
                : location.state && location.state?.TransactionData
                ? location.state?.TransactionData?.amount
                : 0) <= items.upper
          );

          var bbb =
              bbba.length == 0
                ? item?.range[item?.range?.length - 1]?.charge
                : bbba[0].charge;
            // (FirstStepData && FirstStepData?.amount
            //   ? FirstStepData?.amount
            //   : location.state && location.state?.TransactionData
            //   ? location.state?.TransactionData?.amount
            //   : 0) >= item.range[0].lower &&
            // (FirstStepData && FirstStepData?.amount
            //   ? FirstStepData?.amount
            //   : location.state && location.state?.TransactionData
            //   ? location.state?.TransactionData?.amount
            //   : 0) <= item.range[0].upper
            //   ? item.range[0].charge
            //   : getAllPaymentMethodStatic.serviceCharge;

          var LowerUpperServiceCharge = {
            typeid: item.typeid,
            name: item.type,
            serviceCharge:
              Servicecharge.amount === "0" || Servicecharge.amount === ""
                ? 0
                : bbb,
          };
          DeliveryServiceChrage.push(LowerUpperServiceCharge);
        });
         setDeliveryLowerUpper(DeliveryServiceChrage);

        // debugger
        const Transaction_D_Data =
          location.state &&
          location.state.TransactionData != undefined &&
          DeliveryServiceChrage?.filter(
            (method) =>
              method?.name == location.state.TransactionData?.deliveryMethodName
          );

        if (DeliveryServiceChrage.length > 0) {
          const sortData = DeliveryServiceChrage.sort((a, b) => {
            if (a.serviceCharge === b.serviceCharge) {
              if (a.name === "Bank Deposit") {
                return -1;
              } else if (b.name === "Bank Deposit") {
                return 1;
              }
            }
            return a.serviceCharge - b.serviceCharge;
          });
          if (location.state && location.state.TransactionData) {
            setDefaultDeliveryMethod(Transaction_D_Data[0].name);
            setDefaultDSC(Transaction_D_Data[0].serviceCharge);
            setActiveDeliveryMethodsId(Transaction_D_Data[0].typeid);
          } else {
            setDefaultDeliveryMethod(sortData[0].name);
            setDefaultDSC(sortData[0].serviceCharge);
            setActiveDeliveryMethodsId(sortData[0].typeid);
          }
        }
      }
    }
    } catch (err) {}
  };

  useEffect(() => {
    // debugger
    if (PaymentLowerUpper && PaymentLowerUpper.length > 0) {
      // debugger
      const sortedPaymentMethods = PaymentLowerUpper.sort(
        (a, b) => a.serviceCharge - b.serviceCharge
      );
      let lowestServiceChargeMethod;
      let totalCharge;
      if (
        sortedPaymentMethods.length > 0 &&
        (sortedPaymentMethods[0].name === "Debit Card" ||
          sortedPaymentMethods[0].name === "Credit Card")
      ) {
        const debitCreditCard = sortedPaymentMethods[0];
        totalCharge =
          debitCreditCard.serviceCharge +
          debitCreditCard.OurFees +
          debitCreditCard.FixFees;
      }
      const filteredPaymentMethods = sortedPaymentMethods.filter(
        (method) => method.name != "Debit Card" && method.name != "Credit Card"
      );
      if (filteredPaymentMethods.length > 0) {
        lowestServiceChargeMethod = filteredPaymentMethods.reduce(
          (prev, current) =>
            prev.serviceCharge < current.serviceCharge ? prev : current
        );
      }
      // debugger
      if (lowestServiceChargeMethod.serviceCharge < totalCharge) {
        setDefaultPaymentMethod(lowestServiceChargeMethod.name);
        if (lowestServiceChargeMethod.amountType == "amount") {
          var data =
            lowestServiceChargeMethod.serviceCharge +
            (lowestServiceChargeMethod.OurFees
              ? lowestServiceChargeMethod.OurFees
              : 0) +
            (lowestServiceChargeMethod.FixFees
              ? lowestServiceChargeMethod.FixFees
              : 0);
          setDeafultPSC(data);
          // PaymentRate(data)
        } else {
          var percentageCharge =
            ((FirstStepData && FirstStepData?.amount
              ? FirstStepData?.amount
              : location.state && location.state?.TransactionData
              ? location.state?.TransactionData?.amount
              : 0) *
              lowestServiceChargeMethod.serviceCharge) /
            100;
          const mydata =
            percentageCharge +
            (lowestServiceChargeMethod.OurFees
              ? lowestServiceChargeMethod.OurFees
              : 0) +
            (lowestServiceChargeMethod.FixFees
              ? lowestServiceChargeMethod.FixFees
              : 0);
          setDeafultPSC(percentageCharge);
          // PaymentRate(percentageCharge)
        }
      } else {
        setDefaultPaymentMethod(sortedPaymentMethods[0].name);
        if (sortedPaymentMethods[0].amountType === "amount") {
          var amountvalue =
            sortedPaymentMethods[0].serviceCharge +
            (sortedPaymentMethods[0].OurFees
              ? sortedPaymentMethods[0].OurFees
              : 0) +
            (sortedPaymentMethods[0].FixFees
              ? sortedPaymentMethods[0].FixFees
              : 0);
          setDeafultPSC(amountvalue);
        } else if (sortedPaymentMethods[0].amountType === "percentage") {
          var percentageCharge =
            (FirstStepData && FirstStepData?.amount
              ? FirstStepData?.amount
              : location.state && location.state?.TransactionData
              ? location.state?.TransactionData?.amount
              : 0) *
            (sortedPaymentMethods[0].serviceCharge / 100);
          const mydata =
            percentageCharge +
            sortedPaymentMethods[0].OurFees +
            sortedPaymentMethods[0].FixFees;
          amountvalue(mydata);
        }
      }
    }
  }, [ActiveDeliveryMethods, ActivePaymentMethods]);

  useEffect(() => {
    // RecieverCountryId(RecievercountryId);
    // DileveryCharge(TotalRate);
    //
    if (!DileveryRate && !PaymentRate) {
      setTotalRate(DefaultDSC + DeafultPSC);
    } else if (DileveryRate && !PaymentRate) {
      setTotalRate(DileveryRate + DeafultPSC);
    } else if (!DileveryRate && PaymentRate) {
      setTotalRate(DefaultDSC + PaymentRate);
    } else {
      setTotalRate(DileveryRate + PaymentRate);
    }
  }, [PaymentRate, DileveryRate, TotalRate]);

  useEffect(()=>{
    // if(SetServiceCharge != FirstStepData.serviceCharge){
      // debugger
      setTotalServicecharge(SetServiceCharge)
    // }
  },[SetServiceCharge,HandleChangeDelivery])

  const handleDeliverymethod = (e, id, name, charge, DeliveryId) => {
    setDeliveryID(DeliveryId);
    setDeliveryName(name);
    setDefaultDeliveryMethod(name);
    var ChargeRate = charge[0];
    setTotalRate(ChargeRate + PaymentRate);
    setDileveryRate(ChargeRate);
    setdynamicDeliveryID(DeliveryId);
    setActiveDeliveryMethodsId(DeliveryId);

    // if (AppliedPromoCode != "noData") {
    //   var paymentDefaultSC = PaymentRate == 0 ? DeafultPSC : PaymentRate;
    //   var totalServicecharge = ChargeRate + paymentDefaultSC;
    //   const isMethodExistDelivery =
    //     AppliedPromoCode?.deliveryMethod.includes(name);
    //   const isMethodExistPayment =
    //     AppliedPromoCode?.paymentMethod.includes(defaultPaymentMethod);
    //   const TotalserviceCharge =
    //     totalServicecharge == 0 ? DeafultPSC + DefaultDSC : totalServicecharge;

    //   setModalShow(false);
    //   if (isMethodExistDelivery != true && isMethodExistPayment != true) {
    //     setPromo_Error_Message(
    //       "Your promocode not applicable with your delivery and payment method"
    //     );
    //     setRemovebtn(0);
    //     handleCloseDelivery();
    //     setPromo_Error_Popup(true);
    //     setPromocode("");
    //     setBenifitonCase(0);
    //     setgetPoints(0);
    //     setBenifitonExchangeRateandServiceCharge(0);
    //     setBenifitonExchangeRateandServiceChargeName("");
    //   } else if (isMethodExistDelivery != true) {
    //     setPromo_Error_Message(
    //       "Your promocode not applicable with your delivery method"
    //     );
    //     setRemovebtn(0);
    //     handleCloseDelivery();
    //     setPromo_Error_Popup(true);
    //     setPromocode("");
    //     setBenifitonCase(0);
    //     setgetPoints(0);
    //     setBenifitonExchangeRateandServiceCharge(0);
    //     setBenifitonExchangeRateandServiceChargeName("");
    //   } else if (isMethodExistPayment != true) {
    //     setPromo_Error_Message(
    //       "Your promocode not applicable with your payment method"
    //     );
    //     setRemovebtn(0);
    //     handleCloseDelivery();
    //     setPromo_Error_Popup(true);
    //     setPromocode("");
    //     setBenifitonCase(0);
    //     setgetPoints(0);
    //     setBenifitonExchangeRateandServiceCharge(0);
    //     setBenifitonExchangeRateandServiceChargeName("");
    //   } else {
    //     if (
    //       AppliedPromoCode?.benifitsOnCash > 0 &&
    //       (FirstStepData && FirstStepData?.amount
    //         ? FirstStepData?.amount
    //         : location.state && location.state?.TransactionData
    //         ? location.state?.TransactionData?.amount
    //         : 0) >= AppliedPromoCode?.minSendingAmt
    //     ) {
    //       setRemovebtn(AppliedPromoCode?.id);
    //       setBenifitonCase(AppliedPromoCode?.benifitsOnCash);
    //       setBenifitonExchangeRateandServiceCharge(0);
    //       setBenifitonExchangeRateandServiceChargeName("");
    //       setPromocode(Promocode);
    //     } else if (
    //       (FirstStepData && FirstStepData?.amount
    //         ? FirstStepData?.amount
    //         : location.state && location.state?.TransactionData
    //         ? location.state?.TransactionData?.amount
    //         : 0) >= AppliedPromoCode?.minAmount &&
    //       (FirstStepData && FirstStepData?.amount
    //         ? FirstStepData?.amount
    //         : location.state && location.state?.TransactionData
    //         ? location.state?.TransactionData?.amount
    //         : 0) <= AppliedPromoCode?.maxAmount
    //     ) {
    //       setRemovebtn(AppliedPromoCode?.id);
    //       setgetPoints(AppliedPromoCode?.points);
    //       setPromocode(Promocode);
    //       setBenifitonExchangeRateandServiceCharge(0);
    //       setBenifitonExchangeRateandServiceChargeName("");
    //     } else if (
    //       toCountry >= AppliedPromoCode?.minExchangeRate &&
    //       toCountry <= AppliedPromoCode?.maxExchangeRate
    //     ) {
    //       setRemovebtn(AppliedPromoCode?.id);
    //       var ExDisc = (toCountry * AppliedPromoCode?.exDiscount) / 100;
    //       setBenifitonExchangeRateandServiceCharge(ExDisc);
    //       setBenifitonExchangeRateandServiceChargeName("(ExchangeRate)");
    //       setPromocode(Promocode);
    //     } else if (
    //       TotalserviceCharge >= AppliedPromoCode?.minServiceCharge &&
    //       TotalserviceCharge <= AppliedPromoCode?.maxServiceCharge
    //     ) {
    //       setRemovebtn(AppliedPromoCode?.id);
    //       var SeDisc =
    //         (TotalserviceCharge * AppliedPromoCode?.seDiscount) / 100;
    //       setBenifitonExchangeRateandServiceCharge(SeDisc);
    //       setBenifitonExchangeRateandServiceChargeName("(ServiceCharge)");
    //       setPromocode(Promocode);
    //     } else {
    //       setPromo_Error_Message(
    //         "Your promocode not applicable for this amount"
    //       );
    //       setRemovebtn(0);
    //       setPromocode("");
    //       setBenifitonCase(0);
    //       setgetPoints(0);
    //       setBenifitonExchangeRateandServiceCharge(0);
    //       setBenifitonExchangeRateandServiceChargeName("");
    //       setPromo_Error_Popup(true);
    //       handleCloseDelivery();
    //     }
    //   }
    // }
  };

  const handleClick111 = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose111 = (event) => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item, image) => {
    setSelectedItem(item);
    setSelectedImage(image);
    handleClose111();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseRec6 = () => {
    setErrors(false);
    setShowRec6(false);
    setShowRec3(false);
  };

  const handlebackContactDetails = () => {
    setErrors(false);
    setShowRec6(false);
    setShowRec3(true);
  };

  const handleShowRec6 = (e) => {
    e.preventDefault();
    if (isVisibleDynamic == "Cash Pickup") {
      if (
        step2SendMoneyvalue.Indidual_Firstname == "" ||
        step2SendMoneyvalue.Indidual_Firstname == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.Indidual_Lastname == "" ||
        step2SendMoneyvalue.Indidual_Lastname == undefined
      ) {
        setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }
    if (isVisibleDynamic == "Wallet Deposit") {
      if (
        step2SendMoneyvalue.Indidual_Firstname == "" ||
        step2SendMoneyvalue.Indidual_Firstname == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.Indidual_Lastname == "" ||
        step2SendMoneyvalue.Indidual_Lastname == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.walletName == "" ||
        step2SendMoneyvalue.walletName == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.walletNo == "" ||
        step2SendMoneyvalue.walletNo == undefined
      ) {
        setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }

    if (isVisibleDynamic == "Bank Deposit") {
      if (
        step2SendMoneyvalue.Indidual_Firstname == "" ||
        step2SendMoneyvalue.Indidual_Firstname == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.Indidual_Lastname == "" ||
        step2SendMoneyvalue.Indidual_Lastname == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.BankName == "" ||
        step2SendMoneyvalue.BankName == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.BankAccountNumber == "" ||
        step2SendMoneyvalue.BankAccountNumber == undefined
      ) {
        setInvalid(true);
        // }else if(step2SendMoneyvalue.IFSC_Code == "" ||step2SendMoneyvalue.IFSC_Code == undefined ){
        //   setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }
  };
  const handleBusiness2 = () => {
    if (isVisibleDynamic2 == "Wallet Deposit") {
      if (
        inputFields[0].FullName == "" ||
        inputFields[0].FullName == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.walletName == "" ||
        step2SendMoneyvalue.walletName == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.walletNo == "" ||
        step2SendMoneyvalue.walletNo == undefined
      ) {
        setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }

    if (isVisibleDynamic2 == "Bank Deposit") {
      if (
        inputFields[0].FullName == "" ||
        inputFields[0].FullName == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.BankName == "" ||
        step2SendMoneyvalue.BankName == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.BankAccountNumber == "" ||
        step2SendMoneyvalue.BankAccountNumber == undefined
      ) {
        setInvalid(true);
        // }else if(step2SendMoneyvalue.IFSC_Code == "" ||step2SendMoneyvalue.IFSC_Code == undefined ){
        //   setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }
  };

  const handleBusiness = () => {
    if (isVisibleDynamic3 == "Cash Pickup") {
      if (
        step2SendMoneyvalue.Business_Name == "" ||
        step2SendMoneyvalue.Business_Name == undefined
      ) {
        setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    } else if (isVisibleDynamic3 == "Wallet Deposit") {
      if (
        step2SendMoneyvalue.Business_Name == "" ||
        step2SendMoneyvalue.Business_Name == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.walletName == "" ||
        step2SendMoneyvalue.walletName == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.walletNo == "" ||
        step2SendMoneyvalue.walletNo == undefined
      ) {
        setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    } else if (isVisibleDynamic3 == "Bank Deposit") {
      if (
        step2SendMoneyvalue.BankName == "" ||
        step2SendMoneyvalue.BankName == undefined
      ) {
        setInvalid(true);
      } else if (
        step2SendMoneyvalue.BankAccountNumber == "" ||
        step2SendMoneyvalue.BankAccountNumber == undefined
      ) {
        setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }
  };

  const handleCleanData = () => {
    setstep2SendMoneyvalue({
      Indidual_Firstname: "",
      Indidual_Middlename: "",
      Indidual_Lastname: "",
      Business_Name: "",
      BankName: "",
      BankAccountNumber: "",
      walletName: "",
      walletNo: "",
      zaiUserId: "",
      IFSC: "",
      NoIFSC: "",
      IFSC_Code: "",
      BankState: "",
      District: "",
      Branch: "",
      Address: "",
      City: "",
      State: "",
      PostalCode: "",
      Mobile: "",
      Email: "",
      Relation: "",
    });
  };

  const handleCloseRec3 = () => {
    setShowRec3(false);
    setInvalid(false);
    setDropdownValue("");
    setDropdownState(false);
    setShowRec(false);
  };

  const handlebackReciptionDetails = () => {
    setShowRec3(false);
    setInvalid(false);
    setDropdownValue("");
    setDropdownState(false);
    setShowRec(true);
  };

  const handleShowRec3 = () => {
    if (firstSelect == true) {
      GetAllDeliveryMethod("individual");
    } else if (TwoSelect == true) {
      GetAllDeliveryMethod("joint");
    } else {
      GetAllDeliveryMethod("business");
    }
    setShowRec3(true);
    handleCloseRec();
  };
  const [dropdownState, setDropdownState] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [dropdownState1, setDropdownState1] = useState(false);
  const [dropdownValue1, setDropdownValue1] = useState(
    <>
      <img src={bankIcon} width="50" height="50" alt="" className="img-fluid" />
      <div className="d-flex flex-column ms-4">
        <div className="mainD responsiveFontLarge">Delivery Method</div>
        <div className="text-black text-start bolder  ">Bank Deposit</div>
      </div>
      <img src={drpa} className="img-fluid mt-4 ms-4" alt="" />
    </>
  );
  const [dropdownState2, setDropdownState2] = useState(false);
  const [dropdownValue2, setDropdownValue2] = useState(
    <>
      <img src={bankIcon} width="50" height="50" alt="" className="img-fluid" />
      <div className="d-flex flex-column ms-4">
        <div className="mainD responsiveFontLarge">Delivery Method</div>
        <div className="text-black text-start bolder  ">Bank Deposit</div>
      </div>
      <img src={drpa} alt="" className="img-fluid mt-4 ms-4" />
    </>
  );

  const [dropdownStateU, setDropdownStateU] = useState(false);
  const [dropdownValueU, setDropdownValueU] = useState("");
  const [UpdateUserData, setUpdateUserData] = useState({});
  const [FullnameArray, setFullnameArray] = useState([]);
  const [UpdateFullnameArray, setUpdateFullnameArray] = useState([]);
  const [selected, setSelected] = useState("IFSC");
  const [selected1, setSelected1] = useState("IFSC");
  const [selected2, setSelected2] = useState("IFSC");
  const [Uselected, setUselected] = useState("IFSC");
  const [getAllDeliveryMethodFirst, setgetAllDeliveryMethodFirst] = useState();
  const [getDeliveryMethodIDFirst, setgetDeliveryMethodIDFirst] = useState();
  const [getAllDeliveryMethod, setgetAllDeliveryMethod] = useState([]);
  const [isVisibleDynamic, setIsVisibleDynamic] = useState("Bank Deposit");
  const [isVisibleDynamic2, setIsVisibleDynamic2] = useState("Bank Deposit");
  const [isVisibleDynamic3, setIsVisibleDynamic3] = useState("Bank Deposit");
  const [isVisibleDynamicU, setIsVisibleDynamicU] = useState("");
  const [adminRelation, setAdminRelation] = useState();
  const [MethodId, setMethodId] = useState("");
  const [Methodname, setMethodname] = useState("");
  const [MethodId1, setMethodId1] = useState("");
  const [Methodname1, setMethodname1] = useState("");
  const [MethodId2, setMethodId2] = useState("");
  const [Methodname2, setMethodname2] = useState("");
  const [JointUser, setJoinUser] = useState(false);
  const [errors, setErrors] = useState(false);
  const [NoteErr, setNoteErr] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [note, setNote] = useState(
    location.state && location.state.TransactionData != undefined
      ? location.state.TransactionData.paymentNote
      : ""
  );
  const [LimitNumber, setLimitNumber] = useState(0);
  const [step2SendMoneyvalue, setstep2SendMoneyvalue] = useState({
    Indidual_Firstname: "",
    Indidual_Middlename: "",
    Indidual_Lastname: "",
    Business_Name: "",
    BankName: "",
    BankAccountNumber: "",
    walletName: "",
    walletNo: "",
    zaiUserId: "",
    IFSC: "",
    NoIFSC: "",
    IFSC_Code: "",
    BankState: "",
    District: "",
    Branch: "",
    Address: "",
    City: "",
    State: "",
    PostalCode: "",
    Mobile: "",
    Email: "",
    Relation: "",
  });
  const [allpurpose, setAllPurpose] = useState([]);
  const [invalid, setInvalid] = useState(false);
  const [step2UpdateSendMoneyvalue, setstep2UpdateSendMoneyvalue] = useState({
    UGroupId: "",
    UUserId: "",
    UIndidual_Firstname: "",
    UIndidual_Middlename: "",
    UIndidual_Lastname: "",
    UBusiness_Name: "",
    UBankId: "",
    UBankName: "",
    UBankAccountNumber: "",
    UwalletName: "",
    UwalletNo: "",
    UzaiUserId: "",
    UIFSC: "",
    UNoIFSC: "",
    UIFSC_Code: "",
    UBankState: "",
    UDistrict: "",
    UBranch: "",
    UAddress: "",
    UCity: "",
    UState: "",
    UPostalCode: "",
    UMobile: "",
    UEmail: "",
    URelation: "",
  });

  const [Mobilelength, setMobilelength] = useState(false);

  const handleRecieverValue = (e) => {
    // let AlphanbetValue = '';
    let capitalizedValue = "";
    let sanitizedValue = "";
    let Numeric = "";
    let inputValue = e.target.value;
    const { name, value } = e.target;
    if (name == "Email") {
      setstep2SendMoneyvalue({ ...step2SendMoneyvalue, [name]: value });
    } else if (name == "Mobile") {
      if (inputValue) {
        // Remove any non-digit characters from the input
        Numeric = inputValue.replace(/\D/g, "");
      }
      setstep2SendMoneyvalue({ ...step2SendMoneyvalue, [name]: Numeric });
    } else if (name == "BankAccountNumber" || name == "walletNo") {
      if (inputValue) {
        var sanitizedValues = inputValue.replace(/[^a-zA-Z0-9]/g, "");
        sanitizedValue = sanitizedValues.toUpperCase();
      }
      setstep2SendMoneyvalue({
        ...step2SendMoneyvalue,
        [name]: sanitizedValue,
      });
    } else if (name == "BankName" || name == "Relation" || name == "walletName" ) {
      setstep2SendMoneyvalue({ ...step2SendMoneyvalue, [name]: inputValue });
    } else {
      if (inputValue) {
        var AlphanbetValue = inputValue.replace(/[^a-zA-Z\s]/g, "");

        const words = AlphanbetValue.split(" ");

        capitalizedValue = words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
      setstep2SendMoneyvalue({
        ...step2SendMoneyvalue,
        [name]: capitalizedValue,
      });
    }
  };

  const handleLimitNotes = (e) => {
    let inputValue = e.target.value;
    let Limit = "";

    if (inputValue) {
      inputValue = inputValue.slice(0, 120);

      Limit = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      // const words = inputValue.split(' ');

      // Limit = words
      //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      //   .join(' ');
    }
    setNote(Limit);
  };

  const handleUpdateRecieverValue = (e) => {
    const { name, value } = e.target;
    setstep2UpdateSendMoneyvalue({
      ...step2UpdateSendMoneyvalue,
      [name]: value,
    });
  };
  const toggleVisibilityDynamic = (value) => {
    setIsVisibleDynamic(value);
  };
  const toggleVisibilityDynamic2 = (value) => {
    setIsVisibleDynamic2(value);
  };
  const toggleVisibilityDynamic3 = (value) => {
    setIsVisibleDynamic3(value);
  };
  const toggleVisibilityDynamicU = (value) => {
    setIsVisibleDynamicU(value);
  };
  const changeHandler = (e) => {
    setSelected(e.target.value);
  };
  const changeHandlerr1 = (e) => {
    setSelected1(e.target.value);
  };
  const changeHandler2 = (e) => {
    setSelected2(e.target.value);
  };
  const UchangeHandler = (e) => {
    setUselected(e.target.value);
  };
  const getRelation = async () => {
    const Relation = await axios.get(
      CommonConstants.BASE_URL + "/getactiverelations"
    );
    setAdminRelation(Relation.data.data);
  };
  ///////////////Individual/////////////////
  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };

  const [SelectedMethodId, setSelectedMethodId] = useState();

  const handleSetDropdownValue = (value, methodname, methodid) => {
    setMethodname(methodname);
    setMethodId(methodid);
    setDropdownValue(value);
    setSelectedMethodId(methodid);
    setDropdownState(!dropdownState);
    GetAllBanks(methodid);
  };
  //////////////////////////////////////////

  ///////////////Joint/////////////////
  const handleDropdownClick1 = () => {
    setDropdownState1(!dropdownState1);
    setShowRec(false);
  };

  const handleSetDropdownValue1 = (value, methodname, methodid) => {
    setMethodname1(methodname);
    setMethodId1(methodid);
    setDropdownValue1(value);
    setDropdownState1(!dropdownState1);
  };
  //////////////////////////////////////////

  ///////////////Business/////////////////
  const handleDropdownClick2 = () => {
    setDropdownState2(!dropdownState2);
  };

  const handleSetDropdownValue2 = (value, methodname, methodid) => {
    setMethodname2(methodname);
    setMethodId2(methodid);
    setDropdownValue2(value);
    setDropdownState2(!dropdownState2);
  };
  //////////////////////////////////////////

  ///////////////Update User/////////////////
  const handleDropdownClickU = () => {
    setDropdownStateU(!dropdownStateU);
  };
  const handleSetDropdownValueU = (value, methodname, methodid) => {
    setDropdownValueU(value);
    setDropdownStateU(!dropdownStateU);
    setMethodId(methodid);
    setMethodname(methodname);
    GetUpdateBanks(UpdateUserData?.countryId, methodid);
  };

  const handleSetDropdownValueU1 = (value, methodname, methodid) => {
    setDropdownValueU(value);
    setMethodId(methodid);
    setMethodname(methodname);
    GetUpdateBanks(UpdateUserData?.countryId, methodid);
  };

  const [firstSelect, setfirstSelect] = useState(true);
  const [TwoSelect, setTwoSelect] = useState(false);
  const [ThreeSelect, setThreeSelect] = useState(false);

  const One1 = () => {
    setfirstSelect(true);
    setTwoSelect(false);
    setThreeSelect(false);
  };
  const Two2 = () => {
    setfirstSelect(false);
    setTwoSelect(true);
    setThreeSelect(false);
    setJoinUser(true);
  };
  const Third3 = () => {
    setfirstSelect(false);
    setTwoSelect(false);
    setThreeSelect(true);
  };

  const [ReceiverInfo, setReceiverInfo] = useState([]);
  const [SearchInfo, setSearchInfo] = useState([]);
  const [DataReceiverInfo, setDataReceiverInfo] = useState([]);
  const [Country, setCountry] = useState([]);
  const [Banks, setBanks] = useState([]);
  const [UBanks, setUBanks] = useState([]);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const filteredRecipients = SearchInfo.filter((recipient) => {
      const fullNameSearch = recipient.firstName + ' ' + recipient.lastName;

      return (
        (fullNameSearch &&
          fullNameSearch.toLowerCase().includes(value.toLowerCase())) ||
        (recipient.firstName &&
          recipient.firstName.toLowerCase().includes(value.toLowerCase())) ||
        (recipient.lastName &&
          recipient.lastName.toLowerCase().includes(value.toLowerCase())) ||
        (recipient.businessName &&
          recipient.businessName.toLowerCase().includes(value.toLowerCase())) ||
        (recipient.fullName &&
          recipient.fullName
            .replace('[', '')
            .replace(']', '')
            .replace(/,/g, ' , ')
            .toLowerCase()
            .includes(value.toLowerCase()))
      );
    });

    setReceiverInfo(filteredRecipients);
  };


  useEffect(() => {

    if(location.state){
      if(location.state?.ReciptionData){
        setSelectedRecipentD_Method(location.state?.ReciptionData?.deliveryMethodId)
      }else if(location.state?.TransactionData){
        setSelectedRecipentD_Method(location.state?.TransactionData?.deliveryMethodId)
      }

      // if(Number(SendingValue) <= PremiumAmount){
      //   let AcceptPremeumAmount = SendingValue
      //   let AcceptPremiumExRate = AcceptPremeumAmount*(ExRate+PremiumRate)
      //   let TotalReciverble = Number(AcceptPremiumExRate)
      //   setreceiveMoney((TotalReciverble).toFixed(2));
      // }else{
      //   let WithoutPremeumAmount = SendingValue-PremiumAmount
      //   let AcceptPremeumAmount = PremiumAmount
      //   let AcceptPremiumExRate = AcceptPremeumAmount*(ExRate+PremiumRate)
      //   let WithoutPremiumExRate = 0
      //   if(WithoutPremeumAmount != 0){
      //     WithoutPremiumExRate = WithoutPremeumAmount*(ExRate)
      //   }
      //   let TotalReciverble = Number(AcceptPremiumExRate)+Number(WithoutPremiumExRate)
      //   setreceiveMoney((TotalReciverble).toFixed(2));
      // }
    }

    if((FirstStepData != undefined && FirstStepData != "") || (location.state && location.state?.TransactionData != undefined)){
      GetActivePaymentMethod((FirstStepData && FirstStepData?.sendingCountryId
        ? FirstStepData?.sendingCountryId
        : location.state && location.state?.TransactionData
        ? location.state?.TransactionData?.sendingCountryId
        : 0));
      GetActiveDeliveryMethod((FirstStepData && FirstStepData?.recevingCountryId
        ? FirstStepData?.recevingCountryId
        : location.state && location.state?.TransactionData
        ? location.state?.TransactionData?.recevingCountryId
        : 0));
      handleGetDeliveryandPayment((FirstStepData && FirstStepData?.sendingCountryId
        ? FirstStepData?.sendingCountryId
        : location.state && location.state?.TransactionData
        ? location.state?.TransactionData?.sendingCountryId
        : 0),(FirstStepData && FirstStepData?.recevingCountryId
          ? FirstStepData?.recevingCountryId
          : location.state && location.state?.TransactionData
          ? location.state?.TransactionData?.recevingCountryId
          : 0),(FirstStepData && FirstStepData?.amount
        ? FirstStepData?.amount
        : location.state && location.state?.TransactionData
        ? location.state?.TransactionData?.amount
        : 0))
      }
      setMethodId(FirstStepData ? FirstStepData?.deliveryMethodId : "")
  }, [FirstStepData]);

  useEffect(() => {
    messageDialogshow(messageDialog);
    if (backDisplay == true) {
      setmessageDialog(false);
    }
    GetAllCountrys();
    if (FirstStepData) {
      // GetAllBanks();
    }
  }, [
    firstSelect,
    TwoSelect,
    ThreeSelect,
    messageDialog,
    RecieverCountryId,
    backDisplay,
    FirstStepData,
  ]);

  const ShowmessageDialog = () => {
    if (selectReciever != null) {
      window.scrollTo(0, 0);
      setmessageDialog(true);
    }
  };

  const handleApicallfunction = () =>{
    GetAllReciever();
    GetAllState();
    GetActivePurposeofTransfer();
    getRelation();
  }

  useEffect(()=>{
    handleApicallfunction()
  },[])


  useEffect(()=>{
    if(RecieverCountryId != undefined){
      GetAllDeliveryMethod("individual");
    }
  },[RecieverCountryId])

  ////////////////////////////////////////////////////////////
  const [WalletName,setWalletName] = useState("")

  const handleChangeWalletname = (e) =>{
    const Walletid = e.target.value;
    var selectedWallet = Banks?.find((item)=> item?.id == Walletid)
    setWalletName(selectedWallet?.text)
  }

  const [UWalletName,setUWalletName] = useState("")
  const [UDeliveryName,setUDeliveryName] = useState("")

  const handleUpdateWalletname = (e) =>{
    const Walletid = e.target.value;
    var selectedWallet = Banks?.find((item)=> item?.id == Walletid)
    setUWalletName(selectedWallet?.text)
  }

  const ADDReciever = async () => {
    try {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (FirstStepData.recevingCountryId === 154) {
        if (
          step2SendMoneyvalue.Relation == "" ||
          step2SendMoneyvalue.Relation == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.City == "" ||
          step2SendMoneyvalue.City == undefined
        ) {
          setErrors(true);
        } else {
          setloadervalue(true);
          const RecieverData = {
            type: "individual",
            groupId: +localStorage.getItem("Id"),
            userId: +localStorage.getItem("Id"),
            firstName: step2SendMoneyvalue.Indidual_Firstname,
            middleName: step2SendMoneyvalue.Indidual_Middlename,
            lastName: step2SendMoneyvalue.Indidual_Lastname,
            fullName: "[]",
            businessName: "",
            address: step2SendMoneyvalue.Address,
            relation: "",
            phone: +step2SendMoneyvalue.Mobile,
            email: step2SendMoneyvalue.Email,
            relationId: step2SendMoneyvalue.Relation,
            countryId: RecieverCountryId,
            stateId: step2SendMoneyvalue.State,
            postalCode: step2SendMoneyvalue.PostalCode,
            city: step2SendMoneyvalue.City,
            deliveryMethodId: +MethodId,
            deliverymethodname: Methodname,
            bankId:deliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
              // step2SendMoneyvalue.BankName !== ""
              //   ? +step2SendMoneyvalue.BankName
              //   : +step2SendMoneyvalue.walletName,
            bankAccNo: step2SendMoneyvalue.BankAccountNumber,
            haveIfscCode: false, //selected === "IFSC" ? true : false,
            ifscCode: step2SendMoneyvalue.IFSC_Code,
            bankStateId: step2SendMoneyvalue.BankState,
            district: step2SendMoneyvalue.District,
            bankBranch: step2SendMoneyvalue.Branch,
            bankDetailsVerified: false,
            otherDetails: "",
            oldRecipientsId: 0,
            walletName: WalletName,
            walletNo: step2SendMoneyvalue.walletNo,
          };
          const response = await axios.post(
            CommonConstants.BASE_URL + "/adduserrecipients",
            RecieverData
          );
          if (response.data.status === true) {
            // debugger
            if (
              response.data.message ==
              "Recipients already exists with same delivery method and account number!"
            ) {
              setShowRec6(false);
              setloadervalue(false);
              setExistUserWithMwthod(true);
            } else {
              GetAllReciever();
              setShowRec6(false);
              const UserData = new FormData();
              UserData.append("userId",  localStorage.getItem("Id"));
              UserData.append("isDeleted", false);
              const getIndex = await axios.post(
                CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
                UserData
              );
              const Findex = getIndex.data.data.findIndex(
                (item) => item.id === response.data.data?.user_Recipients?.id
              );
              setselectReciever(Findex);
              BlankField();
              const sortedRecipients = [...ReceiverInfo].sort(
                (a, b) => b.id - a.id
              );
              if (sortedRecipients.length > 0) {
                const index = sortedRecipients.findIndex(
                  (item) => item.id === response.data.data?.user_Recipients?.id
                );
                if (index !== -1) {
                  setselectReciever(sortedRecipients[index]);
                }
              }
              setSelectedRecipentID(response.data?.data?.user_Recipients?.id)
              // debugger
              if (
                response.data?.data?.user_Recipients?.deliveryMethodId ==
                FirstStepData?.deliveryMethodId
              ) {
                // debugger
                if (SaveTansactionID == undefined) {
                  const data = {
                    userId:
                      FirstStepData != ""
                        ? FirstStepData.userId != ""
                          ? FirstStepData.userId
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.userId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.userId
                        : "",
                    recipientId:
                      response.data.data.id != ""
                        ? response.data.data.id
                          ? response.data.data.id
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.recipientId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.recipientId
                        : "",
                    sendingCurrencyCode:
                      FirstStepData != ""
                        ? FirstStepData.sendingCurrencyCode != ""
                          ? FirstStepData.sendingCurrencyCode
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.sendingCurrencyCode
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.sendingCurrencyCode
                        : "",
                    recevingCurrencyCode:
                      FirstStepData != ""
                        ? FirstStepData.recevingCurrencyCode != ""
                          ? FirstStepData.recevingCurrencyCode
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.recevingCurrencyCode
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.recevingCurrencyCode
                        : "",
                    sendingCountryId:
                      FirstStepData != ""
                        ? FirstStepData.sendingCountryId != ""
                          ? FirstStepData.sendingCountryId
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.sendingCountryId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.sendingCountryId
                        : "",
                    recevingCountryId:
                      FirstStepData != ""
                        ? FirstStepData.recevingCountryId != ""
                          ? FirstStepData.recevingCountryId
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.recevingCountryId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.recevingCountryId
                        : "",
                    partnerBankId: 3544,
                    amount:
                      FirstStepData != ""
                        ? FirstStepData.amount != ""
                          ? FirstStepData.amount
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.amount
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.amount
                        : "",
                    totalPayable:
                      FirstStepData != ""
                        ? FirstStepData.totalPayable != ""
                          ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                          : location.state?.TransactionData != undefined
                          ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                          : ""
                        : location.state?.TransactionData != undefined
                        ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : "",
                    usedCash: FirstStepData != ""
                      ? FirstStepData.usedCash != ""
                        ? FirstStepData.usedCash
                        :0
                      :0,
                    receivingAmount:
                      FirstStepData != ""
                        ? FirstStepData.receivingAmount != ""
                          ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                          : location.state?.TransactionData != undefined
                          ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                          : 0
                        : location.state?.TransactionData != undefined
                        ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : 0,
                    exchangeRate:
                      FirstStepData != ""
                        ? FirstStepData.exchangeRate != ""
                          ? FirstStepData.exchangeRate
                          : location.state?.TransactionData != undefined
                          ? SetExchangerate
                          : 0
                        : location.state?.TransactionData != undefined
                        ? SetExchangerate
                        : 0,
                    serviceCharge:
                      FirstStepData != ""
                        ? FirstStepData.serviceCharge != ""
                          ? TotalServicecharge
                          : location.state?.TransactionData != undefined
                          ? TotalServicecharge
                          : 0
                        : location.state?.TransactionData != undefined
                        ? TotalServicecharge
                        : 0,
                    deliveryMethodId:
                    response.data.status == true
                        ? response.data.data?.deliveryMethodId
                          ? response.data.data?.deliveryMethodId
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.deliveryMethodId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.deliveryMethodId
                        : "",
                    transactionStatusId: 1,
                    paymentRequestUuid: "",
                    paytoAgreementUuid: "",
                    stepNo: 3,
                    otherDetails: "",
                    transferPurposeId:
                      FirstStepData != ""
                        ? purposeOfSendMoneyId
                          ? Number(purposeOfSendMoneyId)
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.transferPurposeId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.transferPurposeId
                        : "",
                    userTrnsCount: 0,
                    userTrnsAmountSum: 0,
                    recTrnsCount: 0,
                    paymentMethod:
                      FirstStepData != ""
                        ? FirstStepData.paymentMethod != ""
                          ? FirstStepData.paymentMethod
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.paymentMethod
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.paymentMethod
                        : "",
                    promoCode:
                    FirstStepData != ""
                        ? FirstStepData.promoCode != ""
                          ? FirstStepData.promoCode
                          :""
                        : "",
                      // FirstStepData != ""
                      //   ? FirstStepData.promoCode != ""
                      //     ? FirstStepData.promoCode
                      //     : PromoCodeVerify &&
                      //       location.state?.TransactionData != undefined
                      //     ? location.state?.TransactionData?.promoCode
                      //     : ""
                      //   : PromoCodeVerify &&
                      //     location.state?.TransactionData != undefined
                      //   ? location.state?.TransactionData?.promoCode
                      //   : "",
                    promoCodeServiceChargeDiscAmt:
                      FirstStepData != ""
                          ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                            ? FirstStepData.promoCodeServiceChargeDiscAmt
                            : 0.0
                          : 0.0,
                      // FirstStepData != ""
                      //   ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                      //     ? FirstStepData.promoCodeServiceChargeDiscAmt
                      //     : PromoCodeVerify &&
                      //       location.state?.TransactionData != undefined
                      //     ? location.state?.TransactionData
                      //         ?.promoCodeServiceChargeDiscAmt
                      //     : ""
                      //   : PromoCodeVerify &&
                      //     location.state?.TransactionData != undefined
                      //   ? location.state?.TransactionData
                      //       ?.promoCodeServiceChargeDiscAmt
                      //   : 0.0,
                    promoCodeExRateDiscAmt:
                      FirstStepData != ""
                        ? FirstStepData.promoCodeExRateDiscAmt != ""
                          ? FirstStepData.promoCodeExRateDiscAmt
                          : 0.0
                        : 0.0,
                    cashBenefit:
                      FirstStepData != ""
                        ? FirstStepData.cashBenefit != ""
                          ? FirstStepData.cashBenefit
                          : 0.0
                        : 0.0,
                    pointBenefit:
                      FirstStepData != ""
                        ? FirstStepData.pointBenefit != ""
                          ? FirstStepData.pointBenefit
                          : 0.0
                        : 0.0,
                    discountedAmount:
                      FirstStepData != ""
                        ? FirstStepData.discountedAmount != ""
                          ? FirstStepData.discountedAmount
                          : 0
                        : 0,
                    transactionPaymentStatusId: 0,
                    paymentNote:
                      FirstStepData != ""
                        ? note != ""
                          ? note
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.paymentNote
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.paymentNote
                        : "",
                    assignedUserId: 0,
                    deleteAt: "",
                    source: "",
                    email:
                      FirstStepData != ""
                        ? userEmail != ""
                          ? userEmail
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.email
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.email
                        : "",
                        premimumExId:
                        FirstStepData != ""
                        ? FirstStepData.premimumExId != ""
                          ? FirstStepData.premimumExId
                          : 0
                        : PremiumEXRateValue.premimumExId != 0
                          ? PremiumEXRateValue?.premimumExId
                          :0,
                      premimumExRate:
                        FirstStepData != ""
                          ? FirstStepData.premimumExRate != ""
                            ? FirstStepData.premimumExRate
                            : 0
                          : PremiumEXRateValue.premimumExRate != 0
                          ? PremiumEXRateValue?.premimumExRate
                          :0,
                      premimumExAmt:
                        FirstStepData != ""
                          ? FirstStepData.premimumExAmt != ""
                            ? FirstStepData.premimumExAmt
                            : 0
                          : PremiumEXRateValue.premimumExAmt != 0
                          ? PremiumEXRateValue?.premimumExAmt
                          :0,
                  };

                  axios
                    .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                    .then((res) => {
                      if (res.data.statuscode == 200) {
                        // visitNextStep();
                        TransactionIDSet(res.data.data);
                        setSaveTansaction(res.data.data);
                        setSaveTansactionID(res.data.data.id);
                        HandleChangeDelivery(response.data.data?.deliveryMethodId)
                        ShowmessageDialog();
                        SummurryDetails(response.data.data.id);
                        // SummurryDetails(userId)
                        // setShowRec6(false);
                        visitNextStep();
                        setloadervalue(false);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  const data = {
                    id:
                      saveTansaction?.length != 0
                        ? saveTansaction.id
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.id
                        : "",
                    userId:
                      FirstStepData != ""
                        ? FirstStepData.userId != ""
                          ? FirstStepData.userId
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.userId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.userId
                        : "",
                    recipientId:
                      response.data.data.id != ""
                        ? response.data.data.id
                          ? response.data.data.id
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.recipientId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.recipientId
                        : "",
                    sendingCurrencyCode:
                      FirstStepData != ""
                        ? FirstStepData.sendingCurrencyCode != ""
                          ? FirstStepData.sendingCurrencyCode
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.sendingCurrencyCode
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.sendingCurrencyCode
                        : "",
                    recevingCurrencyCode:
                      FirstStepData != ""
                        ? FirstStepData.recevingCurrencyCode != ""
                          ? FirstStepData.recevingCurrencyCode
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.recevingCurrencyCode
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.recevingCurrencyCode
                        : "",
                    sendingCountryId:
                      FirstStepData != ""
                        ? FirstStepData.sendingCountryId != ""
                          ? FirstStepData.sendingCountryId
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.sendingCountryId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.sendingCountryId
                        : "",
                    recevingCountryId:
                      FirstStepData != ""
                        ? FirstStepData.recevingCountryId != ""
                          ? FirstStepData.recevingCountryId
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.recevingCountryId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.recevingCountryId
                        : "",
                    partnerBankId: 3544,
                    amount:
                      FirstStepData != ""
                        ? FirstStepData.amount != ""
                          ? FirstStepData.amount
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.amount
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.amount
                        : "",
                    totalPayable:
                      FirstStepData != ""
                        ? FirstStepData.totalPayable != ""
                          ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                          : location.state?.TransactionData != undefined
                          ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                          : ""
                        : location.state?.TransactionData != undefined
                        ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : "",
                      usedCash: FirstStepData != ""
                      ? FirstStepData.usedCash != ""
                        ? FirstStepData.usedCash
                        :0
                      :0,
                    receivingAmount:
                      FirstStepData != ""
                        ? FirstStepData.receivingAmount != ""
                          ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                          : location.state?.TransactionData != undefined
                          ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                          : 0
                        : location.state?.TransactionData != undefined
                        ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : 0,
                    exchangeRate:
                      FirstStepData != ""
                        ? FirstStepData.exchangeRate != ""
                          ? FirstStepData.exchangeRate
                          : location.state?.TransactionData != undefined
                          ? SetExchangerate
                          : 0
                        : location.state?.TransactionData != undefined
                        ? SetExchangerate
                        : 0,
                    serviceCharge:
                      FirstStepData != ""
                        ? FirstStepData.serviceCharge != ""
                          ? TotalServicecharge
                          : location.state?.TransactionData != undefined
                          ? TotalServicecharge
                          : 0
                        : location.state?.TransactionData != undefined
                        ? TotalServicecharge
                        : 0,
                    deliveryMethodId:
                    response.data.status == true
                    ? response.data.data?.deliveryMethodId
                      ? response.data.data?.deliveryMethodId
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.deliveryMethodId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.deliveryMethodId
                        : "",
                    transactionStatusId: 1,
                    paymentRequestUuid: "",
                    paytoAgreementUuid: "",
                    stepNo: 3,
                    otherDetails: "",
                    transferPurposeId:
                      FirstStepData != ""
                        ? purposeOfSendMoneyId
                          ? Number(purposeOfSendMoneyId)
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.transferPurposeId
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.transferPurposeId
                        : "",
                    userTrnsCount: 0,
                    userTrnsAmountSum: 0,
                    recTrnsCount: 0,
                    paymentMethod:
                      FirstStepData != ""
                        ? FirstStepData.paymentMethod != ""
                          ? FirstStepData.paymentMethod
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.paymentMethod
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.paymentMethod
                        : "",
                    promoCode:
                      FirstStepData != ""
                          ? FirstStepData.promoCode != ""
                            ? FirstStepData.promoCode
                            :""
                          : "",
                    promoCodeServiceChargeDiscAmt:
                      FirstStepData != ""
                          ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                            ? FirstStepData.promoCodeServiceChargeDiscAmt
                            : 0.0
                          : 0.0,
                    promoCodeExRateDiscAmt:
                      FirstStepData != ""
                        ? FirstStepData.promoCodeExRateDiscAmt != ""
                          ? FirstStepData.promoCodeExRateDiscAmt
                          : 0.0
                        : 0.0,
                    cashBenefit:
                      FirstStepData != ""
                        ? FirstStepData.cashBenefit != ""
                          ? FirstStepData.cashBenefit
                          : 0.0
                        : 0.0,
                    pointBenefit:
                      FirstStepData != ""
                        ? FirstStepData.pointBenefit != ""
                          ? FirstStepData.pointBenefit
                          : 0.0
                        : 0.0,
                    discountedAmount:
                      FirstStepData != ""
                        ? FirstStepData.discountedAmount != ""
                          ? FirstStepData.discountedAmount
                          : 0
                        : 0,
                    transactionPaymentStatusId: 0,
                    paymentNote:
                      FirstStepData != ""
                        ? note != ""
                          ? note
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.paymentNote
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.paymentNote
                        : "",
                    assignedUserId: 0,
                    deleteAt: "",
                    source: "",
                    email:
                      FirstStepData != ""
                        ? userEmail != ""
                          ? userEmail
                          : location.state?.TransactionData != undefined
                          ? location.state?.TransactionData?.email
                          : ""
                        : location.state?.TransactionData != undefined
                        ? location.state?.TransactionData?.email
                        : "",
                        premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
                  };

                  axios
                    .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                    .then((res) => {
                      if (res.data.statuscode == 200) {
                        // visitNextStep();
                        TransactionIDSet(res.data.data);
                        setSaveTansaction(res.data.data);
                        setSaveTansactionID(res.data.data.id);
                        ShowmessageDialog();
                        HandleChangeDelivery(response.data.data?.deliveryMethodId)
                        SummurryDetails(response.data.data.id);
                        // setShowRec6(false);
                        visitNextStep();
                        setloadervalue(false);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              } else {
                // debugger
                setExistUserWithsameMethod(true);
                setloadervalue(false);
              }


            }
          }
        }
      } else {
        if (
          step2SendMoneyvalue.Address == "" ||
          step2SendMoneyvalue.Address == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.State == "" ||
          step2SendMoneyvalue.State == undefined
        ) {
          setErrors(true);
        } else if (step2SendMoneyvalue.Mobile.length <= 0) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.Email == "" ||
          !emailRegex.test(step2SendMoneyvalue.Email)
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.Relation == "" ||
          step2SendMoneyvalue.Relation == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.PostalCode == "" ||
          step2SendMoneyvalue.PostalCode == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.City == "" ||
          step2SendMoneyvalue.City == undefined
        ) {
          setErrors(true);
        } else {
          setloadervalue(true);
          const RecieverData = {
            type: "individual",
            groupId: +localStorage.getItem("Id"),
            userId: +localStorage.getItem("Id"),
            firstName: step2SendMoneyvalue.Indidual_Firstname,
            middleName: step2SendMoneyvalue.Indidual_Middlename,
            lastName: step2SendMoneyvalue.Indidual_Lastname,
            fullName: "[]",
            businessName: "",
            address: step2SendMoneyvalue.Address,
            relation: "",
            phone: +step2SendMoneyvalue.Mobile,
            email: step2SendMoneyvalue.Email,
            relationId: step2SendMoneyvalue.Relation,
            countryId: RecieverCountryId,
            stateId: step2SendMoneyvalue.State,
            postalCode: step2SendMoneyvalue.PostalCode,
            city: step2SendMoneyvalue.City,
            deliveryMethodId: +MethodId,
            deliverymethodname: Methodname,
            bankId:deliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
              // step2SendMoneyvalue.BankName !== ""
              //   ? +step2SendMoneyvalue.BankName
              //   : +step2SendMoneyvalue.walletName,
            bankAccNo: step2SendMoneyvalue.BankAccountNumber,
            haveIfscCode: selected === "IFSC" ? true : false,
            ifscCode: step2SendMoneyvalue.IFSC_Code,
            bankStateId: step2SendMoneyvalue.BankState,
            district: step2SendMoneyvalue.District,
            bankBranch: step2SendMoneyvalue.Branch,
            bankDetailsVerified: false,
            otherDetails: "",
            oldRecipientsId: 0,
            walletName: WalletName,
            walletNo: step2SendMoneyvalue.walletNo,
          };
          const response = await axios.post(
            CommonConstants.BASE_URL + "/adduserrecipients",
            RecieverData
          );
          if (response.data.status === true) {
            GetAllReciever();
            setShowRec6(false);

            const UserData = new FormData();
            UserData.append("userId",  localStorage.getItem("Id"));
            UserData.append("isDeleted", false);
            const getIndex = await axios.post(
              CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
              UserData
            );
            const Findex = getIndex.data.data.findIndex(
              (item) => item.id === response.data.data?.user_Recipients?.id
            );
            setselectReciever(Findex);
            BlankField();
            const sortedRecipients = [...ReceiverInfo].sort(
              (a, b) => b.id - a.id
            );
            if (sortedRecipients.length > 0) {
              const index = sortedRecipients.findIndex(
                (item) => item.id === response.data.data?.user_Recipients?.id
              );
              if (index !== -1) {
                setselectReciever(sortedRecipients[index]);
              }
            }
            setSelectedRecipentID(response.data?.data?.user_Recipients?.id)
            if (
              response.data?.data?.user_Recipients?.deliveryMethodId ===
              FirstStepData?.deliveryMethodId
            ) {
            // SummurryDetails(response.data.data.id)
            if (SaveTansactionID == undefined) {
              const data = {
                userId:
                  FirstStepData != ""
                    ? FirstStepData.userId != ""
                      ? FirstStepData.userId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.userId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.userId
                    : "",
                recipientId:
                  response.data.data?.user_Recipients?.id != ""
                    ? response.data.data?.user_Recipients?.id
                      ? response.data.data?.user_Recipients?.id
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recipientId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recipientId
                    : "",
                sendingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.sendingCurrencyCode != ""
                      ? FirstStepData.sendingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCurrencyCode
                    : "",
                recevingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.recevingCurrencyCode != ""
                      ? FirstStepData.recevingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCurrencyCode
                    : "",
                sendingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.sendingCountryId != ""
                      ? FirstStepData.sendingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCountryId
                    : "",
                recevingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.recevingCountryId != ""
                      ? FirstStepData.recevingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCountryId
                    : "",
                partnerBankId: 3544,
                amount:
                  FirstStepData != ""
                    ? FirstStepData.amount != ""
                      ? FirstStepData.amount
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.amount
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.amount
                    : "",
                totalPayable:
                  FirstStepData != ""
                  ? FirstStepData.totalPayable != ""
                    ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : ""
                  : location.state?.TransactionData != undefined
                  ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                  : "",
                  usedCash: FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    :0
                  :0,
                receivingAmount:
                  FirstStepData != ""
                  ? FirstStepData.receivingAmount != ""
                    ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : 0
                  : location.state?.TransactionData != undefined
                  ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                  : 0,
                exchangeRate:
                  FirstStepData != ""
                  ? FirstStepData.exchangeRate != ""
                    ? FirstStepData.exchangeRate
                    : location.state?.TransactionData != undefined
                    ? SetExchangerate
                    : 0
                  : location.state?.TransactionData != undefined
                  ? SetExchangerate
                  : 0,
                serviceCharge:
                  FirstStepData != ""
                  ? FirstStepData.serviceCharge != ""
                    ? FirstStepData.serviceCharge
                    : location.state?.TransactionData != undefined
                    ? TotalServicecharge
                    : 0
                  : location.state?.TransactionData != undefined
                  ? TotalServicecharge
                  : 0,
                deliveryMethodId:
                response.data.status == true
                ? response.data.data?.user_Recipients?.deliveryMethodId
                  ? response.data.data?.user_Recipients?.deliveryMethodId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.deliveryMethodId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.deliveryMethodId
                    : "",
                transactionStatusId: 1,
                paymentRequestUuid: "",
                paytoAgreementUuid: "",
                stepNo: 3,
                otherDetails: "",
                transferPurposeId:
                  FirstStepData != ""
                    ? purposeOfSendMoneyId
                      ? Number(purposeOfSendMoneyId)
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.transferPurposeId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.transferPurposeId
                    : "",
                userTrnsCount: 0,
                userTrnsAmountSum: 0,
                recTrnsCount: 0,
                paymentMethod:
                  FirstStepData != ""
                    ? FirstStepData.paymentMethod != ""
                      ? FirstStepData.paymentMethod
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentMethod
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentMethod
                    : "",
                promoCode:
                  FirstStepData != ""
                      ? FirstStepData.promoCode != ""
                        ? FirstStepData.promoCode
                        :""
                      : "",
                promoCodeServiceChargeDiscAmt:
                  FirstStepData != ""
                      ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                        ? FirstStepData.promoCodeServiceChargeDiscAmt
                        : 0.0
                      : 0.0,
                promoCodeExRateDiscAmt:
                  FirstStepData != ""
                    ? FirstStepData.promoCodeExRateDiscAmt != ""
                      ? FirstStepData.promoCodeExRateDiscAmt
                      : 0.0
                    : 0.0,
                cashBenefit:
                  FirstStepData != ""
                    ? FirstStepData.cashBenefit != ""
                      ? FirstStepData.cashBenefit
                      : 0.0
                    : 0.0,
                pointBenefit:
                  FirstStepData != ""
                    ? FirstStepData.pointBenefit != ""
                      ? FirstStepData.pointBenefit
                      : 0.0
                    : 0.0,
                discountedAmount:
                  FirstStepData != ""
                    ? FirstStepData.discountedAmount != ""
                      ? FirstStepData.discountedAmount
                      : 0
                    : 0,
                transactionPaymentStatusId: 0,
                paymentNote:
                  FirstStepData != ""
                    ? note != ""
                      ? note
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentNote
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentNote
                    : "",
                assignedUserId: 0,
                deleteAt: "",
                source: "",
                email:
                  FirstStepData != ""
                    ? userEmail != ""
                      ? userEmail
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.email
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.email
                    : "",
                    premimumExId:
                    FirstStepData != ""
                    ? FirstStepData.premimumExId != ""
                      ? FirstStepData.premimumExId
                      : 0
                    : PremiumEXRateValue.premimumExId != 0
                      ? PremiumEXRateValue?.premimumExId
                      :0,
                  premimumExRate:
                    FirstStepData != ""
                      ? FirstStepData.premimumExRate != ""
                        ? FirstStepData.premimumExRate
                        : 0
                      : PremiumEXRateValue.premimumExRate != 0
                      ? PremiumEXRateValue?.premimumExRate
                      :0,
                  premimumExAmt:
                    FirstStepData != ""
                      ? FirstStepData.premimumExAmt != ""
                        ? FirstStepData.premimumExAmt
                        : 0
                      : PremiumEXRateValue.premimumExAmt != 0
                      ? PremiumEXRateValue?.premimumExAmt
                      :0,
              };

              axios
                .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                .then((res) => {
                  if (res.data.statuscode == 200) {
                    // visitNextStep();
                    TransactionIDSet(res.data.data);
                    setSaveTansaction(res.data.data);
                    setSaveTansactionID(res.data.data.id);
                    ShowmessageDialog();
                    HandleChangeDelivery(response.data.data?.user_Recipients?.deliveryMethodId)
                    SummurryDetails(response.data.data?.user_Recipients?.id);
                    // setShowRec6(false);
                    visitNextStep();
                    setloadervalue(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              const data = {
                id:
                  saveTansaction?.length != 0
                    ? saveTansaction.id
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.id
                    : "",
                userId:
                  FirstStepData != ""
                    ? FirstStepData.userId != ""
                      ? FirstStepData.userId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.userId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.userId
                    : "",
                recipientId:
                  response.data.data?.user_Recipients?.id != ""
                    ? response.data.data?.user_Recipients?.id
                      ? response.data.data?.user_Recipients?.id
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recipientId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recipientId
                    : "",
                sendingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.sendingCurrencyCode != ""
                      ? FirstStepData.sendingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCurrencyCode
                    : "",
                recevingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.recevingCurrencyCode != ""
                      ? FirstStepData.recevingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCurrencyCode
                    : "",
                sendingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.sendingCountryId != ""
                      ? FirstStepData.sendingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCountryId
                    : "",
                recevingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.recevingCountryId != ""
                      ? FirstStepData.recevingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCountryId
                    : "",
                partnerBankId: 3544,
                amount:
                  FirstStepData != ""
                    ? FirstStepData.amount != ""
                      ? FirstStepData.amount
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.amount
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.amount
                    : "",
                totalPayable:
                  FirstStepData != ""
                    ? FirstStepData.totalPayable != ""
                      ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : ""
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : "",
                receivingAmount:
                  FirstStepData != ""
                    ? FirstStepData.receivingAmount != ""
                      ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : 0
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : 0,
                exchangeRate:
                  FirstStepData != ""
                    ? FirstStepData.exchangeRate != ""
                      ? FirstStepData.exchangeRate
                      : location.state?.TransactionData != undefined
                      ? SetExchangerate
                      : 0
                    : location.state?.TransactionData != undefined
                    ? SetExchangerate
                    : 0,
                serviceCharge:
                  FirstStepData != ""
                    ? FirstStepData.serviceCharge != ""
                      ? FirstStepData.serviceCharge
                      : location.state?.TransactionData != undefined
                      ? TotalServicecharge
                      : 0
                    : location.state?.TransactionData != undefined
                    ? TotalServicecharge
                    : 0,
                deliveryMethodId:
                response.data.status == true
                ? response.data.data?.user_Recipients?.deliveryMethodId
                  ? response.data.data?.user_Recipients?.deliveryMethodId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.deliveryMethodId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.deliveryMethodId
                    : "",
                transactionStatusId: 1,
                paymentRequestUuid: "",
                paytoAgreementUuid: "",
                stepNo: 3,
                otherDetails: "",
                transferPurposeId:
                  FirstStepData != ""
                    ? purposeOfSendMoneyId
                      ? Number(purposeOfSendMoneyId)
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.transferPurposeId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.transferPurposeId
                    : "",
                userTrnsCount: 0,
                userTrnsAmountSum: 0,
                recTrnsCount: 0,
                paymentMethod:
                  FirstStepData != ""
                    ? FirstStepData.paymentMethod != ""
                      ? FirstStepData.paymentMethod
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentMethod
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentMethod
                    : "",
                promoCode:
                  FirstStepData != ""
                      ? FirstStepData.promoCode != ""
                        ? FirstStepData.promoCode
                        :""
                      : "",
                ppromoCodeServiceChargeDiscAmt:
                  FirstStepData != ""
                      ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                        ? FirstStepData.promoCodeServiceChargeDiscAmt
                        : 0.0
                      : 0.0,
                promoCodeExRateDiscAmt:
                  FirstStepData != ""
                    ? FirstStepData.promoCodeExRateDiscAmt != ""
                      ? FirstStepData.promoCodeExRateDiscAmt
                      : 0.0
                    : 0.0,
                cashBenefit:
                  FirstStepData != ""
                    ? FirstStepData.cashBenefit != ""
                      ? FirstStepData.cashBenefit
                      : 0.0
                    : 0.0,
                pointBenefit:
                  FirstStepData != ""
                    ? FirstStepData.pointBenefit != ""
                      ? FirstStepData.pointBenefit
                      : 0.0
                    : 0.0,
                discountedAmount:
                  FirstStepData != ""
                    ? FirstStepData.discountedAmount != ""
                      ? FirstStepData.discountedAmount
                      : 0
                    : 0,
                transactionPaymentStatusId: 0,
                paymentNote:
                  FirstStepData != ""
                    ? note != ""
                      ? note
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentNote
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentNote
                    : "",
                assignedUserId: 0,
                deleteAt: "",
                source: "",
                email:
                  FirstStepData != ""
                    ? userEmail != ""
                      ? userEmail
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.email
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.email
                    : "",
                usedCash: FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    :0
                  :0,
                  premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
              };

              axios
                .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                .then((res) => {
                  if (res.data.statuscode == 200) {
                    // visitNextStep();
                    TransactionIDSet(res.data.data);
                    setSaveTansaction(res.data.data);
                    setSaveTansactionID(res.data.data.id);
                    ShowmessageDialog();
                    HandleChangeDelivery(response.data.data?.user_Recipients?.deliveryMethodId)
                    SummurryDetails(response.data.data?.user_Recipients?.id);
                    // setShowRec6(false);
                    visitNextStep();
                    setloadervalue(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else {
            setExistUserWithsameMethod(true);
            setloadervalue(false);
          }
          }
        }
      }
    } catch (err) {}
  };

  /////////////Joint Reciption Add API///////////////
  const ADDJointReciever = async () => {
    try {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (FirstStepData.recevingCountryId === 154) {
        if (
          step2SendMoneyvalue.Relation == "" ||
          step2SendMoneyvalue.Relation == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.City == "" ||
          step2SendMoneyvalue.City == undefined
        ) {
          setErrors(true);
        } else {
          setloadervalue(true);
          let FullnameArr = [];
          inputFields.map((val) => {
            FullnameArr.push(`${val.FullName}`);
          });
          let DeliveryMethodId = MethodId1 == "" ? 3019 : MethodId1;
          let DeliveryMethodName =
            Methodname1 == "" ? "Bank Deposit" : Methodname1;
          const JointRecieverData = {
            type: "joint",
            groupId: +localStorage.getItem("Id"),
            userId: +localStorage.getItem("Id"),
            firstName: "",
            middleName: "",
            lastName: "",
            fullName: `[${FullnameArr}]`,
            businessName: "",
            address: step2SendMoneyvalue.Address,
            relation: "",
            phone: +step2SendMoneyvalue.Mobile,
            email: step2SendMoneyvalue.Email,
            walletName: WalletName,
            walletNo: step2SendMoneyvalue.walletNo,
            relationId: step2SendMoneyvalue.Relation,
            countryId: RecieverCountryId,
            stateId: step2SendMoneyvalue.State,
            postalCode: step2SendMoneyvalue.PostalCode,
            city: step2SendMoneyvalue.City,
            deliveryMethodId: DeliveryMethodId,
            deliveryMethodname: DeliveryMethodName,
            bankId:deliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
              // step2SendMoneyvalue.BankName !== ""
              //   ? +step2SendMoneyvalue.BankName
              //   : +step2SendMoneyvalue.walletName,
            bankAccNo: step2SendMoneyvalue.BankAccountNumber,
            haveIfscCode: selected2 === "IFSC" ? true : false,
            ifscCode: step2SendMoneyvalue.IFSC_Code,
            bankStateId: step2SendMoneyvalue.BankState,
            district: step2SendMoneyvalue.District,
            bankBranch: step2SendMoneyvalue.Branch,
            bankDetailsVerified: false,
            otherDetails: "",
            oldRecipientsId: 0,
          };
          const response = await axios.post(
            CommonConstants.BASE_URL + "/adduserrecipients",
            JointRecieverData
          );
          if (response.data.status === true) {
            GetAllReciever();
            setShowRec6(false);
            BlankField();
            const UserData = new FormData();
            UserData.append("userId",  localStorage.getItem("Id"));
            UserData.append("isDeleted", false);
            const getIndex = await axios.post(
              CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
              UserData
            );

            const Findex = getIndex.data.data.findIndex(
              (item) => item.id === response.data.data?.user_Recipients?.id
            );
            setselectReciever(Findex);
            // SummurryDetails(response.data.data.id)
            setSelectedRecipentID(response.data?.data?.user_Recipients?.id)
            if (
              response.data?.data?.user_Recipients?.deliveryMethodId ===
              FirstStepData?.deliveryMethodId
            ){

            if (SaveTansactionID == undefined) {
              const data = {
                userId:
                  FirstStepData != ""
                    ? FirstStepData.userId != ""
                      ? FirstStepData.userId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.userId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.userId
                    : "",
                recipientId:
                  response.data.data?.user_Recipients?.id != ""
                    ? response.data.data?.user_Recipients?.id
                      ? response.data.data?.user_Recipients?.id
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recipientId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recipientId
                    : "",
                sendingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.sendingCurrencyCode != ""
                      ? FirstStepData.sendingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCurrencyCode
                    : "",
                recevingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.recevingCurrencyCode != ""
                      ? FirstStepData.recevingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCurrencyCode
                    : "",
                sendingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.sendingCountryId != ""
                      ? FirstStepData.sendingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCountryId
                    : "",
                recevingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.recevingCountryId != ""
                      ? FirstStepData.recevingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCountryId
                    : "",
                partnerBankId: 3544,
                amount:
                  FirstStepData != ""
                    ? FirstStepData.amount != ""
                      ? FirstStepData.amount
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.amount
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.amount
                    : "",
                  totalPayable:
                    FirstStepData != ""
                      ? FirstStepData.totalPayable != ""
                        ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : location.state?.TransactionData != undefined
                        ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : ""
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : "",
                receivingAmount:
                  FirstStepData != ""
                    ? FirstStepData.receivingAmount != ""
                      ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : 0
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : 0,
                exchangeRate:
                  FirstStepData != ""
                    ? FirstStepData.exchangeRate != ""
                      ? FirstStepData.exchangeRate
                      : location.state?.TransactionData != undefined
                      ? SetExchangerate
                      : 0
                    : location.state?.TransactionData != undefined
                    ? SetExchangerate
                    : 0,
                serviceCharge:
                  FirstStepData != ""
                    ? FirstStepData.serviceCharge != ""
                      ? FirstStepData.serviceCharge
                      : location.state?.TransactionData != undefined
                      ? TotalServicecharge
                      : 0
                    : location.state?.TransactionData != undefined
                    ? TotalServicecharge
                    : 0,
                deliveryMethodId:
                response.data.status == true
                ? response.data.data?.user_Recipients?.deliveryMethodId
                  ? response.data.data?.user_Recipients?.deliveryMethodId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.deliveryMethodId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.deliveryMethodId
                    : "",
                transactionStatusId: 1,
                paymentRequestUuid: "",
                paytoAgreementUuid: "",
                stepNo: 3,
                otherDetails: "",
                transferPurposeId:
                  FirstStepData != ""
                    ? purposeOfSendMoneyId
                      ? Number(purposeOfSendMoneyId)
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.transferPurposeId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.transferPurposeId
                    : "",
                userTrnsCount: 0,
                userTrnsAmountSum: 0,
                recTrnsCount: 0,
                paymentMethod:
                  FirstStepData != ""
                    ? FirstStepData.paymentMethod != ""
                      ? FirstStepData.paymentMethod
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentMethod
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentMethod
                    : "",
                promoCode:
                  FirstStepData != ""
                      ? FirstStepData.promoCode != ""
                        ? FirstStepData.promoCode
                        :""
                      : "",
                promoCodeServiceChargeDiscAmt:
                  FirstStepData != ""
                      ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                        ? FirstStepData.promoCodeServiceChargeDiscAmt
                        : 0.0
                      : 0.0,
                promoCodeExRateDiscAmt:
                  FirstStepData != ""
                    ? FirstStepData.promoCodeExRateDiscAmt != ""
                      ? FirstStepData.promoCodeExRateDiscAmt
                      : 0.0
                    : 0.0,
                cashBenefit:
                  FirstStepData != ""
                    ? FirstStepData.cashBenefit != ""
                      ? FirstStepData.cashBenefit
                      : 0.0
                    : 0.0,
                pointBenefit:
                  FirstStepData != ""
                    ? FirstStepData.pointBenefit != ""
                      ? FirstStepData.pointBenefit
                      : 0.0
                    : 0.0,
                discountedAmount:
                  FirstStepData != ""
                    ? FirstStepData.discountedAmount != ""
                      ? FirstStepData.discountedAmount
                      : 0
                    : 0,
                transactionPaymentStatusId: 0,
                paymentNote:
                  FirstStepData != ""
                    ? note != ""
                      ? note
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentNote
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentNote
                    : "",
                assignedUserId: 0,
                deleteAt: "",
                source: "",
                email:
                  FirstStepData != ""
                    ? userEmail != ""
                      ? userEmail
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.email
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.email
                    : "",
                usedCash: FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    :0
                  :0,
                  premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
              };

              axios
                .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                .then((res) => {
                  if (res.data.statuscode == 200) {
                    // visitNextStep();
                    TransactionIDSet(res.data.data);
                    setSaveTansaction(res.data.data);
                    setSaveTansactionID(res.data.data.id);
                    SummurryDetails(response.data.data?.user_Recipients?.id);
                    ShowmessageDialog();
                    HandleChangeDelivery(response.data.data?.user_Recipients?.deliveryMethodId)
                    visitNextStep();
                    setloadervalue(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              const data = {
                id:
                  saveTansaction?.length != 0
                    ? saveTansaction.id
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.id
                    : "",
                userId:
                  FirstStepData != ""
                    ? FirstStepData.userId != ""
                      ? FirstStepData.userId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.userId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.userId
                    : "",
                recipientId:
                  response.data.data?.user_Recipients?.id != ""
                    ? response.data.data?.user_Recipients?.id
                      ? response.data.data?.user_Recipients?.id
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recipientId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recipientId
                    : "",
                sendingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.sendingCurrencyCode != ""
                      ? FirstStepData.sendingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCurrencyCode
                    : "",
                recevingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.recevingCurrencyCode != ""
                      ? FirstStepData.recevingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCurrencyCode
                    : "",
                sendingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.sendingCountryId != ""
                      ? FirstStepData.sendingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCountryId
                    : "",
                recevingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.recevingCountryId != ""
                      ? FirstStepData.recevingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCountryId
                    : "",
                partnerBankId: 3544,
                amount:
                  FirstStepData != ""
                    ? FirstStepData.amount != ""
                      ? FirstStepData.amount
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.amount
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.amount
                    : "",
                totalPayable:
                  FirstStepData != ""
                  ? FirstStepData.totalPayable != ""
                    ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : ""
                  : location.state?.TransactionData != undefined
                  ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                  : "",
                receivingAmount:
                  FirstStepData != ""
                  ? FirstStepData.receivingAmount != ""
                    ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : 0
                  : location.state?.TransactionData != undefined
                  ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                  : 0,
                exchangeRate:
                  FirstStepData != ""
                    ? FirstStepData.exchangeRate != ""
                      ? FirstStepData.exchangeRate
                      : location.state?.TransactionData != undefined
                      ? SetExchangerate
                      : 0
                    : location.state?.TransactionData != undefined
                    ? SetExchangerate
                    : 0,
                serviceCharge:
                  FirstStepData != ""
                    ? FirstStepData.serviceCharge != ""
                      ? FirstStepData.serviceCharge
                      : location.state?.TransactionData != undefined
                      ? TotalServicecharge
                      : 0
                    : location.state?.TransactionData != undefined
                    ? TotalServicecharge
                    : 0,
                deliveryMethodId:
                response.data.status == true
                ? response.data.data?.user_Recipients?.deliveryMethodId
                  ? response.data.data?.user_Recipients?.deliveryMethodId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.deliveryMethodId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.deliveryMethodId
                    : "",
                transactionStatusId: 1,
                paymentRequestUuid: "",
                paytoAgreementUuid: "",
                stepNo: 3,
                otherDetails: "",
                transferPurposeId:
                  FirstStepData != ""
                    ? purposeOfSendMoneyId
                      ? Number(purposeOfSendMoneyId)
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.transferPurposeId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.transferPurposeId
                    : "",
                userTrnsCount: 0,
                userTrnsAmountSum: 0,
                recTrnsCount: 0,
                paymentMethod:
                  FirstStepData != ""
                    ? FirstStepData.paymentMethod != ""
                      ? FirstStepData.paymentMethod
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentMethod
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentMethod
                    : "",
                promoCode:
                  FirstStepData != ""
                      ? FirstStepData.promoCode != ""
                        ? FirstStepData.promoCode
                        :""
                      : "",
                promoCodeServiceChargeDiscAmt:
                  FirstStepData != ""
                      ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                        ? FirstStepData.promoCodeServiceChargeDiscAmt
                        : 0.0
                      : 0.0,
                promoCodeExRateDiscAmt:
                  FirstStepData != ""
                    ? FirstStepData.promoCodeExRateDiscAmt != ""
                      ? FirstStepData.promoCodeExRateDiscAmt
                      : 0.0
                    : 0.0,
                cashBenefit:
                  FirstStepData != ""
                    ? FirstStepData.cashBenefit != ""
                      ? FirstStepData.cashBenefit
                      : 0.0
                    : 0.0,
                pointBenefit:
                  FirstStepData != ""
                    ? FirstStepData.pointBenefit != ""
                      ? FirstStepData.pointBenefit
                      : 0.0
                    : 0.0,
                discountedAmount:
                  FirstStepData != ""
                    ? FirstStepData.discountedAmount != ""
                      ? FirstStepData.discountedAmount
                      : 0
                    : 0,
                transactionPaymentStatusId: 0,
                paymentNote:
                  FirstStepData != ""
                    ? note != ""
                      ? note
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentNote
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentNote
                    : "",
                assignedUserId: 0,
                deleteAt: "",
                source: "",
                email:
                  FirstStepData != ""
                    ? userEmail != ""
                      ? userEmail
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.email
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.email
                    : "",
                usedCash: FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    :0
                  :0,
                  premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
              };

              axios
                .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                .then((res) => {
                  if (res.data.statuscode == 200) {
                    // visitNextStep();
                    TransactionIDSet(res.data.data);
                    setSaveTansaction(res.data.data);
                    setSaveTansactionID(res.data.data.id);
                    ShowmessageDialog();
                    HandleChangeDelivery(response.data.data?.user_Recipients?.deliveryMethodId)
                    SummurryDetails(response.data.data?.user_Recipients?.id);
                    // setShowRec6(false);
                    visitNextStep();
                    setloadervalue(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }else {
            setExistUserWithsameMethod(true);
            setloadervalue(false);
          }
            setTwoSelect(false);
          }
        }
      } else {
        if (
          step2SendMoneyvalue.Address == "" ||
          step2SendMoneyvalue.Address == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.State == "" ||
          step2SendMoneyvalue.State == undefined
        ) {
          setErrors(true);
        } else if (step2SendMoneyvalue.Mobile.length <= 0) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.Email == "" ||
          !emailRegex.test(step2SendMoneyvalue.Email)
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.Relation == "" ||
          step2SendMoneyvalue.Relation == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.PostalCode == "" ||
          step2SendMoneyvalue.PostalCode == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.City == "" ||
          step2SendMoneyvalue.City == undefined
        ) {
          setErrors(true);
        } else {
          setloadervalue(true);
          let FullnameArr = [];
          inputFields.map((val) => {
            FullnameArr.push(`${val.FullName}`);
          });
          let DeliveryMethodId = MethodId1 == "" ? 3019 : MethodId1;
          let DeliveryMethodName =
            Methodname1 == "" ? "Bank Deposit" : Methodname1;
          const JointRecieverData = {
            type: "joint",
            groupId: +localStorage.getItem("Id"),
            userId: +localStorage.getItem("Id"),
            firstName: "",
            middleName: "",
            lastName: "",
            fullName: `[${FullnameArr}]`,
            businessName: "",
            address: step2SendMoneyvalue.Address,
            relation: step2SendMoneyvalue.Relation,
            phone: +step2SendMoneyvalue.Mobile,
            email: step2SendMoneyvalue.Email,
            walletName: WalletName,
            walletNo: step2SendMoneyvalue.walletNo,
            relationId: 0,
            countryId: RecieverCountryId,
            stateId: step2SendMoneyvalue.State,
            postalCode: step2SendMoneyvalue.PostalCode,
            city: step2SendMoneyvalue.City,
            deliveryMethodId: DeliveryMethodId,
            deliveryMethodname: DeliveryMethodName,
            bankId:deliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
              // step2SendMoneyvalue.BankName !== ""
              //   ? +step2SendMoneyvalue.BankName
              //   : +step2SendMoneyvalue.walletName,
            bankAccNo: step2SendMoneyvalue.BankAccountNumber,
            haveIfscCode: selected2 === "IFSC" ? true : false,
            ifscCode: step2SendMoneyvalue.IFSC_Code,
            bankStateId: step2SendMoneyvalue.BankState,
            district: step2SendMoneyvalue.District,
            bankBranch: step2SendMoneyvalue.Branch,
            bankDetailsVerified: false,
            otherDetails: "",
            oldRecipientsId: 0,
          };
          const response = await axios.post(
            CommonConstants.BASE_URL + "/adduserrecipients",
            JointRecieverData
          );
          if (response.data.status === true) {
            GetAllReciever();
            setShowRec6(false);
            BlankField();
            const UserData = new FormData();
            UserData.append("userId",  localStorage.getItem("Id"));
            UserData.append("isDeleted", false);
            const getIndex = await axios.post(
              CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
              UserData
            );
            const Findex = getIndex.data.data.findIndex(
              (item) => item.id === response.data.data?.user_Recipients?.id
            );
            setselectReciever(Findex);
            // SummurryDetails(response.data.data.id)
            setSelectedRecipentID(response.data?.data?.user_Recipients?.id)
            if (
              response.data?.data?.user_Recipients?.deliveryMethodId ===
              FirstStepData?.deliveryMethodId
            ) {
            if (SaveTansactionID == undefined) {
              const data = {
                userId:
                  FirstStepData != ""
                    ? FirstStepData.userId != ""
                      ? FirstStepData.userId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.userId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.userId
                    : "",
                recipientId:
                  response.data.data?.user_Recipients?.id != ""
                    ? response.data.data?.user_Recipients?.id
                      ? response.data.data?.user_Recipients?.id
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recipientId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recipientId
                    : "",
                sendingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.sendingCurrencyCode != ""
                      ? FirstStepData.sendingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCurrencyCode
                    : "",
                recevingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.recevingCurrencyCode != ""
                      ? FirstStepData.recevingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCurrencyCode
                    : "",
                sendingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.sendingCountryId != ""
                      ? FirstStepData.sendingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCountryId
                    : "",
                recevingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.recevingCountryId != ""
                      ? FirstStepData.recevingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCountryId
                    : "",
                partnerBankId: 3544,
                amount:
                  FirstStepData != ""
                    ? FirstStepData.amount != ""
                      ? FirstStepData.amount
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.amount
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.amount
                    : "",
                  totalPayable:
                    FirstStepData != ""
                      ? FirstStepData.totalPayable != ""
                        ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : location.state?.TransactionData != undefined
                        ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : ""
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : "",
                receivingAmount:
                  FirstStepData != ""
                    ? FirstStepData.receivingAmount != ""
                      ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : 0
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : 0,
                exchangeRate:
                FirstStepData != ""
                ? FirstStepData.exchangeRate != ""
                  ? FirstStepData.exchangeRate
                  : location.state?.TransactionData != undefined
                  ? SetExchangerate
                  : 0
                : location.state?.TransactionData != undefined
                ? SetExchangerate
                : 0,
                serviceCharge:
                FirstStepData != ""
                ? FirstStepData.serviceCharge != ""
                  ? FirstStepData.serviceCharge
                  : location.state?.TransactionData != undefined
                  ? TotalServicecharge
                  : 0
                : location.state?.TransactionData != undefined
                ? TotalServicecharge
                : 0,
                deliveryMethodId:
                response.data.status == true
                ? response.data.data?.user_Recipients?.deliveryMethodId
                  ? response.data.data?.user_Recipients?.deliveryMethodId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.deliveryMethodId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.deliveryMethodId
                    : "",
                transactionStatusId: 1,
                paymentRequestUuid: "",
                paytoAgreementUuid: "",
                stepNo: 3,
                otherDetails: "",
                transferPurposeId:
                  FirstStepData != ""
                    ? purposeOfSendMoneyId
                      ? Number(purposeOfSendMoneyId)
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.transferPurposeId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.transferPurposeId
                    : "",
                userTrnsCount: 0,
                userTrnsAmountSum: 0,
                recTrnsCount: 0,
                paymentMethod:
                  FirstStepData != ""
                    ? FirstStepData.paymentMethod != ""
                      ? FirstStepData.paymentMethod
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentMethod
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentMethod
                    : "",
                promoCode:
                  FirstStepData != ""
                      ? FirstStepData.promoCode != ""
                        ? FirstStepData.promoCode
                        :""
                      : "",
                promoCodeServiceChargeDiscAmt:
                  FirstStepData != ""
                      ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                        ? FirstStepData.promoCodeServiceChargeDiscAmt
                        : 0.0
                      : 0.0,
                promoCodeExRateDiscAmt:
                  FirstStepData != ""
                    ? FirstStepData.promoCodeExRateDiscAmt != ""
                      ? FirstStepData.promoCodeExRateDiscAmt
                      : 0.0
                    : 0.0,
                cashBenefit:
                  FirstStepData != ""
                    ? FirstStepData.cashBenefit != ""
                      ? FirstStepData.cashBenefit
                      : 0.0
                    : 0.0,
                pointBenefit:
                  FirstStepData != ""
                    ? FirstStepData.pointBenefit != ""
                      ? FirstStepData.pointBenefit
                      : 0.0
                    : 0.0,
                discountedAmount:
                  FirstStepData != ""
                    ? FirstStepData.discountedAmount != ""
                      ? FirstStepData.discountedAmount
                      : 0
                    : 0,
                transactionPaymentStatusId: 0,
                paymentNote:
                  FirstStepData != ""
                    ? note != ""
                      ? note
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentNote
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentNote
                    : "",
                assignedUserId: 0,
                deleteAt: "",
                source: "",
                email:
                  FirstStepData != ""
                    ? userEmail != ""
                      ? userEmail
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.email
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.email
                    : "",
                usedCash: FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    :0
                  :0,

                  premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
              };

              axios
                .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                .then((res) => {
                  if (res.data.statuscode == 200) {
                    // visitNextStep();
                    TransactionIDSet(res.data.data);
                    setSaveTansaction(res.data.data);
                    setSaveTansactionID(res.data.data.id);
                    ShowmessageDialog();
                    HandleChangeDelivery(response.data.data?.user_Recipients?.deliveryMethodId)
                    SummurryDetails(response.data.data?.user_Recipients?.id);
                    // setShowRec6(false);
                    visitNextStep();
                    setloadervalue(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              const data = {
                id:
                  saveTansaction?.length != 0
                    ? saveTansaction.id
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.id
                    : "",
                userId:
                  FirstStepData != ""
                    ? FirstStepData.userId != ""
                      ? FirstStepData.userId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.userId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.userId
                    : "",
                recipientId:
                  response.data.data?.user_Recipients?.id != ""
                    ? response.data.data?.user_Recipients?.id
                      ? response.data.data?.user_Recipients?.id
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recipientId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recipientId
                    : "",
                sendingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.sendingCurrencyCode != ""
                      ? FirstStepData.sendingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCurrencyCode
                    : "",
                recevingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.recevingCurrencyCode != ""
                      ? FirstStepData.recevingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCurrencyCode
                    : "",
                sendingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.sendingCountryId != ""
                      ? FirstStepData.sendingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCountryId
                    : "",
                recevingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.recevingCountryId != ""
                      ? FirstStepData.recevingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCountryId
                    : "",
                partnerBankId: 3544,
                amount:
                  FirstStepData != ""
                    ? FirstStepData.amount != ""
                      ? FirstStepData.amount
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.amount
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.amount
                    : "",
                totalPayable:
                  FirstStepData != ""
                  ? FirstStepData.totalPayable != ""
                    ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : ""
                  : location.state?.TransactionData != undefined
                  ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                  : "",
                receivingAmount:
                  FirstStepData != ""
                    ? FirstStepData.receivingAmount != ""
                      ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : 0
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : 0,
                exchangeRate:
                FirstStepData != ""
                ? FirstStepData.exchangeRate != ""
                  ? FirstStepData.exchangeRate
                  : location.state?.TransactionData != undefined
                  ? SetExchangerate
                  : 0
                : location.state?.TransactionData != undefined
                ? SetExchangerate
                : 0,
                serviceCharge:
                  FirstStepData != ""
                  ? FirstStepData.serviceCharge != ""
                    ? FirstStepData.serviceCharge
                    : location.state?.TransactionData != undefined
                    ? TotalServicecharge
                    : 0
                  : location.state?.TransactionData != undefined
                  ? TotalServicecharge
                  : 0,
                deliveryMethodId:
                response.data.status == true
                ? response.data.data?.user_Recipients?.deliveryMethodId
                  ? response.data.data?.user_Recipients?.deliveryMethodId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.deliveryMethodId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.deliveryMethodId
                    : "",
                transactionStatusId: 1,
                paymentRequestUuid: "",
                paytoAgreementUuid: "",
                stepNo: 3,
                otherDetails: "",
                transferPurposeId:
                  FirstStepData != ""
                    ? purposeOfSendMoneyId
                      ? Number(purposeOfSendMoneyId)
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.transferPurposeId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.transferPurposeId
                    : "",
                userTrnsCount: 0,
                userTrnsAmountSum: 0,
                recTrnsCount: 0,
                paymentMethod:
                  FirstStepData != ""
                    ? FirstStepData.paymentMethod != ""
                      ? FirstStepData.paymentMethod
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentMethod
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentMethod
                    : "",
                promoCode:
                  FirstStepData != ""
                    ? FirstStepData.promoCode != ""
                      ? FirstStepData.promoCode
                      :""
                    : "",
                promoCodeServiceChargeDiscAmt:
                  FirstStepData != ""
                      ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                        ? FirstStepData.promoCodeServiceChargeDiscAmt
                        : 0.0
                      : 0.0,
                promoCodeExRateDiscAmt:
                  FirstStepData != ""
                    ? FirstStepData.promoCodeExRateDiscAmt != ""
                      ? FirstStepData.promoCodeExRateDiscAmt
                      : 0.0
                    : 0.0,
                cashBenefit:
                  FirstStepData != ""
                    ? FirstStepData.cashBenefit != ""
                      ? FirstStepData.cashBenefit
                      : 0.0
                    : 0.0,
                pointBenefit:
                  FirstStepData != ""
                    ? FirstStepData.pointBenefit != ""
                      ? FirstStepData.pointBenefit
                      : 0.0
                    : 0.0,
                discountedAmount:
                  FirstStepData != ""
                    ? FirstStepData.discountedAmount != ""
                      ? FirstStepData.discountedAmount
                      : 0
                    : 0,
                transactionPaymentStatusId: 0,
                paymentNote:
                  FirstStepData != ""
                    ? note != ""
                      ? note
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentNote
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentNote
                    : "",
                assignedUserId: 0,
                deleteAt: "",
                source: "",
                email:
                  FirstStepData != ""
                    ? userEmail != ""
                      ? userEmail
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.email
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.email
                    : "",
                usedCash: FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    :0
                  :0,

                  premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
              };

              axios
                .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                .then((res) => {
                  if (res.data.statuscode == 200) {
                    // visitNextStep();
                    TransactionIDSet(res.data.data);
                    setSaveTansaction(res.data.data);
                    setSaveTansactionID(res.data.data.id);
                    ShowmessageDialog();
                    HandleChangeDelivery(response.data.data?.user_Recipients?.deliveryMethodId)
                    SummurryDetails(response.data.data?.user_Recipients?.id);
                    // setShowRec6(false);
                    visitNextStep();
                    setloadervalue(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else {
            setExistUserWithsameMethod(true);
            setloadervalue(false);
          }
            setTwoSelect(false);
          }
        }
      }
    } catch (err) {}
  };

  const BlankField = () => {
    step2SendMoneyvalue.Indidual_Firstname = "";
    step2SendMoneyvalue.Indidual_Middlename = "";
    step2SendMoneyvalue.Indidual_Lastname = "";
    step2SendMoneyvalue.Business_Name = "";
    step2SendMoneyvalue.BankName = "";
    step2SendMoneyvalue.BankAccountNumber = "";
    step2SendMoneyvalue.walletName = "";
    step2SendMoneyvalue.walletNo = "";
    step2SendMoneyvalue.zaiUserId = "";
    step2SendMoneyvalue.IFSC = "";
    step2SendMoneyvalue.NoIFSC = "";
    step2SendMoneyvalue.IFSC_Code = "";
    step2SendMoneyvalue.BankState = "";
    step2SendMoneyvalue.District = "";
    step2SendMoneyvalue.Branch = "";
    step2SendMoneyvalue.Address = "";
    step2SendMoneyvalue.City = "";
    step2SendMoneyvalue.State = "";
    step2SendMoneyvalue.PostalCode = "";
    step2SendMoneyvalue.Mobile = "";
    step2SendMoneyvalue.Email = "";
    step2SendMoneyvalue.Relation = "";
  };

  const ADDBusinessReciever = async () => {
    try {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (FirstStepData.recevingCountryId === 154) {
        if (
          step2SendMoneyvalue.Relation == "" ||
          step2SendMoneyvalue.Relation == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.City == "" ||
          step2SendMoneyvalue.City == undefined
        ) {
          setErrors(true);
        } else {
          setloadervalue(true);
          let DeliveryMethodId = MethodId2 == "" ? 3019 : MethodId2;
          let DeliveryMethodName =
            Methodname2 == "" ? "Bank Deposit" : Methodname2;
          const BusinessRecieverData = {
            type: "business",
            groupId: +localStorage.getItem("Id"),
            userId: +localStorage.getItem("Id"),
            firstName: "",
            middleName: "",
            lastName: "",
            fullName: "[]",
            businessName: step2SendMoneyvalue.Business_Name,
            address: step2SendMoneyvalue.Address,
            relation: "",
            phone: +step2SendMoneyvalue.Mobile,
            email: step2SendMoneyvalue.Email,
            relationId: step2SendMoneyvalue.Relation, //remaining
            countryId: RecieverCountryId,
            stateId: step2SendMoneyvalue.State,
            postalCode: step2SendMoneyvalue.PostalCode,
            city: step2SendMoneyvalue.City,
            deliveryMethodId: DeliveryMethodId,
            deliverymethodname: DeliveryMethodName,
            bankId:deliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
              // step2SendMoneyvalue.BankName !== ""
              //   ? +step2SendMoneyvalue.BankName
              //   : +step2SendMoneyvalue.walletName,
            bankAccNo: step2SendMoneyvalue.BankAccountNumber,
            haveIfscCode: selected2 === "IFSC" ? true : false,
            ifscCode: step2SendMoneyvalue.IFSC_Code,
            bankStateId: step2SendMoneyvalue.BankState,
            district: step2SendMoneyvalue.District,
            bankBranch: step2SendMoneyvalue.Branch,
            bankDetailsVerified: false,
            otherDetails: "", //remaining
            oldRecipientsId: 0,
            walletName: WalletName,
            walletNo: step2SendMoneyvalue.walletNo,
            // zaiUserId:step2SendMoneyvalue.zaiUserId
          };
          const response = await axios.post(
            CommonConstants.BASE_URL + "/adduserrecipients",
            BusinessRecieverData
          );
          if (response.data.status === true) {
            GetAllReciever();
            setShowRec6(false);
            BlankField();
            const UserData = new FormData();
            UserData.append("userId",  localStorage.getItem("Id"));
            UserData.append("isDeleted", false);
            const getIndex = await axios.post(
              CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
              UserData
            );
            const Findex = getIndex.data.data.findIndex(
              (item) => item.id === response.data.data?.user_Recipients?.id
            );
            setselectReciever(Findex);
            setSelectedRecipentID(response.data?.data?.user_Recipients?.id)
            if (
              response.data?.data?.user_Recipients?.deliveryMethodId ===
              FirstStepData?.deliveryMethodId
            ) {
            // SummurryDetails(response.data.data?.user_Recipients?.id)
            if (SaveTansactionID == undefined) {
              const data = {
                userId:
                  FirstStepData != ""
                    ? FirstStepData.userId != ""
                      ? FirstStepData.userId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.userId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.userId
                    : "",
                recipientId:
                  response.data.data?.user_Recipients?.id != ""
                    ? response.data.data?.user_Recipients?.id
                      ? response.data.data?.user_Recipients?.id
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recipientId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recipientId
                    : "",
                sendingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.sendingCurrencyCode != ""
                      ? FirstStepData.sendingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCurrencyCode
                    : "",
                recevingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.recevingCurrencyCode != ""
                      ? FirstStepData.recevingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCurrencyCode
                    : "",
                sendingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.sendingCountryId != ""
                      ? FirstStepData.sendingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCountryId
                    : "",
                recevingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.recevingCountryId != ""
                      ? FirstStepData.recevingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCountryId
                    : "",
                partnerBankId: 3544,
                amount:
                  FirstStepData != ""
                    ? FirstStepData.amount != ""
                      ? FirstStepData.amount
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.amount
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.amount
                    : "",
                totalPayable:
                  FirstStepData != ""
                    ? FirstStepData.totalPayable != ""
                      ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : ""
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : "",
                receivingAmount:
                  FirstStepData != ""
                    ? FirstStepData.receivingAmount != ""
                      ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : 0
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : 0,
                exchangeRate:
                  FirstStepData != ""
                    ? FirstStepData.exchangeRate != ""
                      ? FirstStepData.exchangeRate
                      : location.state?.TransactionData != undefined
                      ? SetExchangerate
                      : 0
                    : location.state?.TransactionData != undefined
                    ? SetExchangerate
                    : 0,
                serviceCharge:
                  FirstStepData != ""
                    ? FirstStepData.serviceCharge != ""
                      ? FirstStepData.serviceCharge
                      : location.state?.TransactionData != undefined
                      ? TotalServicecharge
                      : 0
                    : location.state?.TransactionData != undefined
                    ? TotalServicecharge
                    : 0,
                deliveryMethodId:
                response.data.status == true
                ? response.data.data?.user_Recipients?.deliveryMethodId
                  ? response.data.data?.user_Recipients?.deliveryMethodId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.deliveryMethodId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.deliveryMethodId
                    : "",
                transactionStatusId: 1,
                paymentRequestUuid: "",
                paytoAgreementUuid: "",
                stepNo: 3,
                otherDetails: "",
                transferPurposeId:
                  FirstStepData != ""
                    ? purposeOfSendMoneyId
                      ? Number(purposeOfSendMoneyId)
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.transferPurposeId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.transferPurposeId
                    : "",
                userTrnsCount: 0,
                userTrnsAmountSum: 0,
                recTrnsCount: 0,
                paymentMethod:
                  FirstStepData != ""
                    ? FirstStepData.paymentMethod != ""
                      ? FirstStepData.paymentMethod
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentMethod
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentMethod
                    : "",
                promoCode:
                  FirstStepData != ""
                      ? FirstStepData.promoCode != ""
                        ? FirstStepData.promoCode
                        :""
                      : "",
                promoCodeServiceChargeDiscAmt:
                  FirstStepData != ""
                      ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                        ? FirstStepData.promoCodeServiceChargeDiscAmt
                        : 0.0
                      : 0.0,
                promoCodeExRateDiscAmt:
                  FirstStepData != ""
                    ? FirstStepData.promoCodeExRateDiscAmt != ""
                      ? FirstStepData.promoCodeExRateDiscAmt
                      : 0.0
                    : 0.0,
                cashBenefit:
                  FirstStepData != ""
                    ? FirstStepData.cashBenefit != ""
                      ? FirstStepData.cashBenefit
                      : 0.0
                    : 0.0,
                pointBenefit:
                  FirstStepData != ""
                    ? FirstStepData.pointBenefit != ""
                      ? FirstStepData.pointBenefit
                      : 0.0
                    : 0.0,
                discountedAmount:
                  FirstStepData != ""
                    ? FirstStepData.discountedAmount != ""
                      ? FirstStepData.discountedAmount
                      : 0
                    : 0,
                transactionPaymentStatusId: 0,
                paymentNote:
                  FirstStepData != ""
                    ? note != ""
                      ? note
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentNote
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentNote
                    : "",
                assignedUserId: 0,
                deleteAt: "",
                source: "",
                email:
                  FirstStepData != ""
                    ? userEmail != ""
                      ? userEmail
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.email
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.email
                    : "",
                usedCash: FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    :0
                  :0,

                  premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
              };

              axios
                .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                .then((res) => {
                  if (res.data.statuscode == 200) {
                    // visitNextStep();
                    TransactionIDSet(res.data.data);
                    setSaveTansaction(res.data.data);
                    setSaveTansactionID(res.data.data.id);
                    HandleChangeDelivery(response.data.data?.user_Recipients?.deliveryMethodId)
                    ShowmessageDialog();
                    // setShowRec6(false);
                    visitNextStep();
                    SummurryDetails(response.data.data?.user_Recipients?.id);
                    setloadervalue(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              const data = {
                id:
                  saveTansaction?.length != 0
                    ? saveTansaction.id
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.id
                    : "",
                userId:
                  FirstStepData != ""
                    ? FirstStepData.userId != ""
                      ? FirstStepData.userId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.userId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.userId
                    : "",
                recipientId:
                  response.data.data?.user_Recipients?.id != ""
                    ? response.data.data?.user_Recipients?.id
                      ? response.data.data?.user_Recipients?.id
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recipientId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recipientId
                    : "",
                sendingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.sendingCurrencyCode != ""
                      ? FirstStepData.sendingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCurrencyCode
                    : "",
                recevingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.recevingCurrencyCode != ""
                      ? FirstStepData.recevingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCurrencyCode
                    : "",
                sendingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.sendingCountryId != ""
                      ? FirstStepData.sendingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCountryId
                    : "",
                recevingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.recevingCountryId != ""
                      ? FirstStepData.recevingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCountryId
                    : "",
                partnerBankId: 3544,
                amount:
                  FirstStepData != ""
                    ? FirstStepData.amount != ""
                      ? FirstStepData.amount
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.amount
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.amount
                    : "",
                totalPayable:
                    FirstStepData != ""
                      ? FirstStepData.totalPayable != ""
                        ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : location.state?.TransactionData != undefined
                        ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : ""
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : "",
                receivingAmount:
                  FirstStepData != ""
                    ? FirstStepData.receivingAmount != ""
                      ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : 0
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : 0,
                exchangeRate:
                  FirstStepData != ""
                    ? FirstStepData.exchangeRate != ""
                      ? FirstStepData.exchangeRate
                      : location.state?.TransactionData != undefined
                      ? SetExchangerate
                      : 0
                    : location.state?.TransactionData != undefined
                    ? SetExchangerate
                    : 0,
                serviceCharge:
                  FirstStepData != ""
                    ? FirstStepData.serviceCharge != ""
                      ? FirstStepData.serviceCharge
                      : location.state?.TransactionData != undefined
                      ? TotalServicecharge
                      : 0
                    : location.state?.TransactionData != undefined
                    ? TotalServicecharge
                    : 0,
                deliveryMethodId:
                response.data.status == true
                ? response.data.data?.user_Recipients?.deliveryMethodId
                  ? response.data.data?.user_Recipients?.deliveryMethodId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.deliveryMethodId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.deliveryMethodId
                    : "",
                transactionStatusId: 1,
                paymentRequestUuid: "",
                paytoAgreementUuid: "",
                stepNo: 3,
                otherDetails: "",
                transferPurposeId:
                  FirstStepData != ""
                    ? purposeOfSendMoneyId
                      ? Number(purposeOfSendMoneyId)
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.transferPurposeId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.transferPurposeId
                    : "",
                userTrnsCount: 0,
                userTrnsAmountSum: 0,
                recTrnsCount: 0,
                paymentMethod:
                  FirstStepData != ""
                    ? FirstStepData.paymentMethod != ""
                      ? FirstStepData.paymentMethod
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentMethod
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentMethod
                    : "",
                promoCode:
                  FirstStepData != ""
                      ? FirstStepData.promoCode != ""
                        ? FirstStepData.promoCode
                        :""
                      : "",
                promoCodeServiceChargeDiscAmt:
                  FirstStepData != ""
                      ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                        ? FirstStepData.promoCodeServiceChargeDiscAmt
                        : 0.0
                      : 0.0,
                promoCodeExRateDiscAmt:
                  FirstStepData != ""
                    ? FirstStepData.promoCodeExRateDiscAmt != ""
                      ? FirstStepData.promoCodeExRateDiscAmt
                      : 0.0
                    : 0.0,
                cashBenefit:
                  FirstStepData != ""
                    ? FirstStepData.cashBenefit != ""
                      ? FirstStepData.cashBenefit
                      : 0.0
                    : 0.0,
                pointBenefit:
                  FirstStepData != ""
                    ? FirstStepData.pointBenefit != ""
                      ? FirstStepData.pointBenefit
                      : 0.0
                    : 0.0,
                discountedAmount:
                  FirstStepData != ""
                    ? FirstStepData.discountedAmount != ""
                      ? FirstStepData.discountedAmount
                      : 0
                    : 0,
                transactionPaymentStatusId: 0,
                paymentNote:
                  FirstStepData != ""
                    ? note != ""
                      ? note
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentNote
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentNote
                    : "",
                assignedUserId: 0,
                deleteAt: "",
                source: "",
                email:
                  FirstStepData != ""
                    ? userEmail != ""
                      ? userEmail
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.email
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.email
                    : "",
                    usedCash: FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.usedCash
                    : ""
                  : location.state?.TransactionData != undefined
                  ? location.state?.TransactionData?.usedCash
                  : "",
                  premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
              };

              axios
                .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                .then((res) => {
                  if (res.data.statuscode == 200) {
                    // visitNextStep();
                    TransactionIDSet(res.data.data);
                    setSaveTansaction(res.data.data);
                    setSaveTansactionID(res.data.data.id);
                    ShowmessageDialog();
                    HandleChangeDelivery(response.data.data?.user_Recipients?.deliveryMethodId)
                    SummurryDetails(response.data.data?.user_Recipients?.id);
                    // setShowRec6(false);
                    visitNextStep();
                    setloadervalue(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else {
            setExistUserWithsameMethod(true);
            setloadervalue(false);
          }
            // setShowRec6(false);
          } else if (response.data.status === "error") {
          }
        }
      } else {
        if (
          step2SendMoneyvalue.Address == "" ||
          step2SendMoneyvalue.Address == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.State == "" ||
          step2SendMoneyvalue.State == undefined
        ) {
          setErrors(true);
        } else if (step2SendMoneyvalue.Mobile.length <= 0) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.Email == "" ||
          !emailRegex.test(step2SendMoneyvalue.Email)
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.Relation == "" ||
          step2SendMoneyvalue.Relation == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.PostalCode == "" ||
          step2SendMoneyvalue.PostalCode == undefined
        ) {
          setErrors(true);
        } else if (
          step2SendMoneyvalue.City == "" ||
          step2SendMoneyvalue.City == undefined
        ) {
          setErrors(true);
        } else {
          setloadervalue(true);
          let DeliveryMethodId = MethodId2 == "" ? 3019 : MethodId2;
          let DeliveryMethodName =
            Methodname2 == "" ? "Bank Deposit" : Methodname2;
          const BusinessRecieverData = {
            type: "business",
            groupId: +localStorage.getItem("Id"),
            userId: +localStorage.getItem("Id"),
            firstName: "",
            middleName: "",
            lastName: "",
            fullName: "[]",
            businessName: step2SendMoneyvalue.Business_Name,
            address: step2SendMoneyvalue.Address,
            relation: step2SendMoneyvalue.Relation,
            phone: +step2SendMoneyvalue.Mobile,
            email: step2SendMoneyvalue.Email,
            relationId: 0, //remaining
            countryId: RecieverCountryId,
            stateId: step2SendMoneyvalue.State,
            postalCode: step2SendMoneyvalue.PostalCode,
            city: step2SendMoneyvalue.City,
            deliveryMethodId: DeliveryMethodId,
            deliverymethodname: DeliveryMethodName,
            bankId:deliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
              // step2SendMoneyvalue.BankName !== ""
              //   ? +step2SendMoneyvalue.BankName
              //   : +step2SendMoneyvalue.walletName,
            bankAccNo: step2SendMoneyvalue.BankAccountNumber,
            haveIfscCode: selected2 === "IFSC" ? true : false,
            ifscCode: step2SendMoneyvalue.IFSC_Code,
            bankStateId: step2SendMoneyvalue.BankState,
            district: step2SendMoneyvalue.District,
            bankBranch: step2SendMoneyvalue.Branch,
            bankDetailsVerified: false,
            otherDetails: "", //remaining
            oldRecipientsId: 0,
            walletName: WalletName,
            walletNo: step2SendMoneyvalue.walletNo,
            // zaiUserId:step2SendMoneyvalue.zaiUserId
          };
          const response = await axios.post(
            CommonConstants.BASE_URL + "/adduserrecipients",
            BusinessRecieverData
          );

          if (response.data.status === true) {
            GetAllReciever();
            setShowRec6(false);
            BlankField();
            const UserData = new FormData();
            UserData.append("userId",  localStorage.getItem("Id"));
            UserData.append("isDeleted", false);
            const getIndex = await axios.post(
              CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
              UserData
            );
            const Findex = getIndex.data.data.findIndex(
              (item) => item.id === response.data.data?.user_Recipients?.id
            );
            setselectReciever(Findex);
            setSelectedRecipentID(response.data?.data?.user_Recipients?.id)
            if (
              response.data?.data?.user_Recipients?.deliveryMethodId ===
              FirstStepData?.deliveryMethodId
            ) {
            // SummurryDetails(response.data.data?.user_Recipients?.id)
            if (SaveTansactionID == undefined) {
              const data = {
                userId:
                  FirstStepData != ""
                    ? FirstStepData.userId != ""
                      ? FirstStepData.userId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.userId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.userId
                    : "",
                recipientId:
                  response.data.data?.user_Recipients?.id != ""
                    ? response.data.data?.user_Recipients?.id
                      ? response.data.data?.user_Recipients?.id
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recipientId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recipientId
                    : "",
                sendingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.sendingCurrencyCode != ""
                      ? FirstStepData.sendingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCurrencyCode
                    : "",
                recevingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.recevingCurrencyCode != ""
                      ? FirstStepData.recevingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCurrencyCode
                    : "",
                sendingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.sendingCountryId != ""
                      ? FirstStepData.sendingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCountryId
                    : "",
                recevingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.recevingCountryId != ""
                      ? FirstStepData.recevingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCountryId
                    : "",
                partnerBankId: 3544,
                amount:
                  FirstStepData != ""
                    ? FirstStepData.amount != ""
                      ? FirstStepData.amount
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.amount
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.amount
                    : "",
                totalPayable:
                  FirstStepData != ""
                    ? FirstStepData.totalPayable != ""
                      ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : ""
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : "",
                  receivingAmount:
                    FirstStepData != ""
                      ? FirstStepData.receivingAmount != ""
                        ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : location.state?.TransactionData != undefined
                        ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        : 0
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : 0,
                  exchangeRate:
                    FirstStepData != ""
                      ? FirstStepData.exchangeRate != ""
                        ? FirstStepData.exchangeRate
                        : location.state?.TransactionData != undefined
                        ? SetExchangerate
                        : 0
                      : location.state?.TransactionData != undefined
                      ? SetExchangerate
                      : 0,
                  serviceCharge:
                    FirstStepData != ""
                      ? FirstStepData.serviceCharge != ""
                        ? FirstStepData.serviceCharge
                        : location.state?.TransactionData != undefined
                        ? TotalServicecharge
                        : 0
                      : location.state?.TransactionData != undefined
                      ? TotalServicecharge
                      : 0,
                deliveryMethodId:
                response.data.status == true
                ? response.data.data?.user_Recipients?.deliveryMethodId
                  ? response.data.data?.user_Recipients?.deliveryMethodId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.deliveryMethodId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.deliveryMethodId
                    : "",
                transactionStatusId: 1,
                paymentRequestUuid: "",
                paytoAgreementUuid: "",
                stepNo: 3,
                otherDetails: "",
                transferPurposeId:
                  FirstStepData != ""
                    ? purposeOfSendMoneyId
                      ? Number(purposeOfSendMoneyId)
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.transferPurposeId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.transferPurposeId
                    : "",
                userTrnsCount: 0,
                userTrnsAmountSum: 0,
                recTrnsCount: 0,
                paymentMethod:
                  FirstStepData != ""
                    ? FirstStepData.paymentMethod != ""
                      ? FirstStepData.paymentMethod
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentMethod
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentMethod
                    : "",
                promoCode:
                  FirstStepData != ""
                      ? FirstStepData.promoCode != ""
                        ? FirstStepData.promoCode
                        :""
                      : "",
                promoCodeServiceChargeDiscAmt:
                  FirstStepData != ""
                      ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                        ? FirstStepData.promoCodeServiceChargeDiscAmt
                        : 0.0
                      : 0.0,
                promoCodeExRateDiscAmt:
                  FirstStepData != ""
                    ? FirstStepData.promoCodeExRateDiscAmt != ""
                      ? FirstStepData.promoCodeExRateDiscAmt
                      : 0.0
                    : 0.0,
                cashBenefit:
                  FirstStepData != ""
                    ? FirstStepData.cashBenefit != ""
                      ? FirstStepData.cashBenefit
                      : 0.0
                    : 0.0,
                pointBenefit:
                  FirstStepData != ""
                    ? FirstStepData.pointBenefit != ""
                      ? FirstStepData.pointBenefit
                      : 0.0
                    : 0.0,
                discountedAmount:
                  FirstStepData != ""
                    ? FirstStepData.discountedAmount != ""
                      ? FirstStepData.discountedAmount
                      : 0
                    : 0,
                transactionPaymentStatusId: 0,
                paymentNote:
                  FirstStepData != ""
                    ? note != ""
                      ? note
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentNote
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentNote
                    : "",
                assignedUserId: 0,
                deleteAt: "",
                source: "",
                email:
                  FirstStepData != ""
                    ? userEmail != ""
                      ? userEmail
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.email
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.email
                    : "",
                usedCash: FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    :0
                  :0,
                  premimumExId:
                  FirstStepData != ""
                  ? FirstStepData.premimumExId != ""
                    ? FirstStepData.premimumExId
                    : 0
                  : PremiumEXRateValue.premimumExId != 0
                    ? PremiumEXRateValue?.premimumExId
                    :0,
                premimumExRate:
                  FirstStepData != ""
                    ? FirstStepData.premimumExRate != ""
                      ? FirstStepData.premimumExRate
                      : 0
                    : PremiumEXRateValue.premimumExRate != 0
                    ? PremiumEXRateValue?.premimumExRate
                    :0,
                premimumExAmt:
                  FirstStepData != ""
                    ? FirstStepData.premimumExAmt != ""
                      ? FirstStepData.premimumExAmt
                      : 0
                    : PremiumEXRateValue.premimumExAmt != 0
                    ? PremiumEXRateValue?.premimumExAmt
                    :0,
              };

              axios
                .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                .then((res) => {
                  if (res.data.statuscode == 200) {
                    // visitNextStep();
                    TransactionIDSet(res.data.data);
                    setSaveTansaction(res.data.data);
                    setSaveTansactionID(res.data.data.id);
                    ShowmessageDialog();
                    HandleChangeDelivery(response.data.data?.user_Recipients?.deliveryMethodId)
                    SummurryDetails(response.data.data?.user_Recipients?.id);
                    // setShowRec6(false);
                    visitNextStep();
                    setloadervalue(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              const data = {
                id:
                  saveTansaction?.length != 0
                    ? saveTansaction.id
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.id
                    : "",
                userId:
                  FirstStepData != ""
                    ? FirstStepData.userId != ""
                      ? FirstStepData.userId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.userId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.userId
                    : "",
                recipientId:
                  response.data.data.id != ""
                    ? response.data.data.id
                      ? response.data.data.id
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recipientId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recipientId
                    : "",
                sendingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.sendingCurrencyCode != ""
                      ? FirstStepData.sendingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCurrencyCode
                    : "",
                recevingCurrencyCode:
                  FirstStepData != ""
                    ? FirstStepData.recevingCurrencyCode != ""
                      ? FirstStepData.recevingCurrencyCode
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCurrencyCode
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCurrencyCode
                    : "",
                sendingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.sendingCountryId != ""
                      ? FirstStepData.sendingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.sendingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.sendingCountryId
                    : "",
                recevingCountryId:
                  FirstStepData != ""
                    ? FirstStepData.recevingCountryId != ""
                      ? FirstStepData.recevingCountryId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.recevingCountryId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.recevingCountryId
                    : "",
                partnerBankId: 3544,
                amount:
                  FirstStepData != ""
                    ? FirstStepData.amount != ""
                      ? FirstStepData.amount
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.amount
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.amount
                    : "",
                totalPayable:
                  FirstStepData != ""
                    ? FirstStepData.totalPayable != ""
                      ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : ""
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : "",
                receivingAmount:
                  FirstStepData != ""
                    ? FirstStepData.receivingAmount != ""
                      ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : location.state?.TransactionData != undefined
                      ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : 0
                    : location.state?.TransactionData != undefined
                    ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    : 0,
                exchangeRate:
                    FirstStepData != ""
                      ? FirstStepData.exchangeRate != ""
                        ? FirstStepData.exchangeRate
                        : location.state?.TransactionData != undefined
                        ? SetExchangerate
                        : 0
                      : location.state?.TransactionData != undefined
                      ? SetExchangerate
                      : 0,
                serviceCharge:
                  FirstStepData != ""
                    ? FirstStepData.serviceCharge != ""
                      ? FirstStepData.serviceCharge
                      : location.state?.TransactionData != undefined
                      ? TotalServicecharge
                      : 0
                    : location.state?.TransactionData != undefined
                    ? TotalServicecharge
                    : 0,
                deliveryMethodId:
                response.data.status == true
                    ? response.data.data?.deliveryMethodId
                      ? response.data.data?.deliveryMethodId
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.deliveryMethodId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.deliveryMethodId
                    : "",
                transactionStatusId: 1,
                paymentRequestUuid: "",
                paytoAgreementUuid: "",
                stepNo: 3,
                otherDetails: "",
                transferPurposeId:
                  FirstStepData != ""
                    ? purposeOfSendMoneyId
                      ? Number(purposeOfSendMoneyId)
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.transferPurposeId
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.transferPurposeId
                    : "",
                userTrnsCount: 0,
                userTrnsAmountSum: 0,
                recTrnsCount: 0,
                paymentMethod:
                  FirstStepData != ""
                    ? FirstStepData.paymentMethod != ""
                      ? FirstStepData.paymentMethod
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentMethod
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentMethod
                    : "",
                promoCode:
                  FirstStepData != ""
                      ? FirstStepData.promoCode != ""
                        ? FirstStepData.promoCode
                        :""
                      : "",
                promoCodeServiceChargeDiscAmt:
                  FirstStepData != ""
                      ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                        ? FirstStepData.promoCodeServiceChargeDiscAmt
                        : 0.0
                      : 0.0,
                promoCodeExRateDiscAmt:
                  FirstStepData != ""
                    ? FirstStepData.promoCodeExRateDiscAmt != ""
                      ? FirstStepData.promoCodeExRateDiscAmt
                      : 0.0
                    : 0.0,
                cashBenefit:
                  FirstStepData != ""
                    ? FirstStepData.cashBenefit != ""
                      ? FirstStepData.cashBenefit
                      : 0.0
                    : 0.0,
                pointBenefit:
                  FirstStepData != ""
                    ? FirstStepData.pointBenefit != ""
                      ? FirstStepData.pointBenefit
                      : 0.0
                    : 0.0,
                discountedAmount:
                  FirstStepData != ""
                    ? FirstStepData.discountedAmount != ""
                      ? FirstStepData.discountedAmount
                      : 0
                    : 0,
                transactionPaymentStatusId: 0,
                paymentNote:
                  FirstStepData != ""
                    ? note != ""
                      ? note
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.paymentNote
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.paymentNote
                    : "",
                assignedUserId: 0,
                deleteAt: "",
                source: "",
                email:
                  FirstStepData != ""
                    ? userEmail != ""
                      ? userEmail
                      : location.state?.TransactionData != undefined
                      ? location.state?.TransactionData?.email
                      : ""
                    : location.state?.TransactionData != undefined
                    ? location.state?.TransactionData?.email
                    : "",
                usedCash: FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    :0
                  :0,

                  premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
              };

              axios
                .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
                .then((res) => {
                  if (res.data.statuscode == 200) {
                    // visitNextStep();
                    TransactionIDSet(res.data.data);
                    setSaveTansaction(res.data.data);
                    setSaveTansactionID(res.data.data.id);
                    ShowmessageDialog();
                    HandleChangeDelivery(response.data.data?.deliveryMethodId)
                    // setShowRec6(false);
                    SummurryDetails(response.data.data.id);
                    visitNextStep();
                    setloadervalue(false);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else {
            setExistUserWithsameMethod(true);
            setloadervalue(false);
          }

            // setShowRec6(false);
          } else if (response.data.status === "error") {
          }
        }
      }
    } catch (err) {}
  };

  const UpdateindividualReciever = async () => {
    try {
      setloadervalue(true);
      const URecieverData = {
        user_Recipients :{
          id: UpdateUserData.id,
          groupId: UpdateUserData.groupId,
          userId: UpdateUserData.userId,
          type: "individual",
          firstName: step2UpdateSendMoneyvalue.UIndidual_Firstname, //UpdateUserData.firstName,
          middleName: step2UpdateSendMoneyvalue.UIndidual_Middlename,
          lastName: step2UpdateSendMoneyvalue.UIndidual_Lastname,
          fullName: "[]",
          businessName: "",
          address: step2UpdateSendMoneyvalue.UAddress,
          relation: "",
          phone: +step2UpdateSendMoneyvalue.UMobile,
          email: step2UpdateSendMoneyvalue.UEmail,
          relationId: step2UpdateSendMoneyvalue.URelation,
          countryId: RecieverCountryId,
          stateId: step2UpdateSendMoneyvalue.UState,
          postalCode: step2UpdateSendMoneyvalue.UPostalCode,
          city: step2UpdateSendMoneyvalue.UCity,
          deliveryMethodId: MethodId,
          deliverymethodname: Methodname,
          bankName: "",
          bankId: UDeliveryName == "Wallet Deposit" ?  +step2UpdateSendMoneyvalue.UwalletName : UDeliveryName == "Bank Deposit" ? +step2UpdateSendMoneyvalue.UBankName : 0,
          bankAccNo: UDeliveryName == "Bank Deposit" ? step2UpdateSendMoneyvalue.UBankAccountNumber : "",
          haveIfscCode: Uselected === "IFSC" ? true : false,
          ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
          bankStateId: 0,
          district: step2UpdateSendMoneyvalue.UDistrict,
          bankBranch: step2UpdateSendMoneyvalue.UBranch,
          bankDetailsVerified: UpdateUserData.bankDetailsVerified,
          otherDetails: "", //remaining
          oldRecipientsId: 0,
          walletName: UDeliveryName == "Wallet Deposit" ? UWalletName : "",
          walletNo:  UDeliveryName == "Wallet Deposit" ? step2UpdateSendMoneyvalue.UwalletNo : ""
          // zaiUserId:step2UpdateSendMoneyvalue.UzaiUserId
        },
        isAdmin: false
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/updaterecipienstsbyid",
        URecieverData
      );
      if (response.data.status === true) {
        if(response.data.data.isChangesApproved === false){
          setRequestChangetoadmin(true)
        }
        GetAllReciever();
        setShowRec7(false);
        setloadervalue(false)
    }
    } catch (err) {
    }
  };

  /////////////Joint Reciption Add API///////////////
  const UpdateJointReciever = async () => {
    // setloadervalue(true);
    try {
      setloadervalue(true);
      let FullnameArr = [];
      UpdateFullnameArray.map((val) => {
        FullnameArr.push(val.FullName);
      });

      const UJointRecieverData = {
        user_Recipients :{
        id: UpdateUserData.id,
        groupId: UpdateUserData.groupId,
        userId: UpdateUserData.userId,
        type: "joint",
        firstName: "",
        middleName: "",
        lastName: "",
        fullName: `[${FullnameArr}]`,
        businessName: "",
        address: step2UpdateSendMoneyvalue.UAddress,
        relation: "",
        phone: +step2UpdateSendMoneyvalue.UMobile,
        email: step2UpdateSendMoneyvalue.UEmail,
        walletName: UDeliveryName == "Wallet Deposit" ? UWalletName : "",
        walletNo:  UDeliveryName == "Wallet Deposit" ? step2UpdateSendMoneyvalue.UwalletNo : "",
        relationId: step2UpdateSendMoneyvalue.URelation, //remaining
        countryId: RecieverCountryId,
        stateId: step2UpdateSendMoneyvalue.UState,
        postalCode: step2UpdateSendMoneyvalue.UPostalCode,
        city: step2UpdateSendMoneyvalue.UCity,
        deliveryMethodId: MethodId,
        deliverymethodname: Methodname,
        // bankName: step2UpdateSendMoneyvalue.UBankName,
        bankId: UDeliveryName == "Wallet Deposit" ?  +step2UpdateSendMoneyvalue.UwalletName : UDeliveryName == "Bank Deposit" ? +step2UpdateSendMoneyvalue.UBankName : 0,
        bankAccNo: UDeliveryName == "Bank Deposit" ? step2UpdateSendMoneyvalue.UBankAccountNumber : "",
        haveIfscCode: selected2 === "IFSC" ? true : false,
        ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
        bankStateId: step2UpdateSendMoneyvalue.UBankState,
        district: step2UpdateSendMoneyvalue.UDistrict,
        bankBranch: step2UpdateSendMoneyvalue.UBranch,
        bankDetailsVerified: UpdateUserData.bankDetailsVerified, //bankDetailsVerified
        otherDetails: "", //remaining
        oldRecipientsId: 0,
        // zaiUserId:step2UpdateSendMoneyvalue.UzaiUserId
      },
      isAdmin: false
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/updaterecipienstsbyid",
        UJointRecieverData
      );

      if (response.data.status === true) {
        if(response.data.data.isChangesApproved === false){
          setRequestChangetoadmin(true)
        }
        GetAllReciever();
        setShowRec7(false);
        setloadervalue(false)
      }
    } catch (err) {}
  };
  ////////////////////////////

  const UpdateBusinessReciever = async () => {
    try {
      setloadervalue(true);
      const UBusinessRecieverData = {
        user_Recipients :{
          id: UpdateUserData.id,
          groupId: UpdateUserData.groupId,
          userId: UpdateUserData.userId,
          type: "business",
          firstName: "",
          middleName: "",
          lastName: "",
          fullName: "[]",
          businessName: step2UpdateSendMoneyvalue.UBusiness_Name,
          address: step2UpdateSendMoneyvalue.UAddress,
          relation: "",
          phone: +step2UpdateSendMoneyvalue.UMobile,
          relationId: step2UpdateSendMoneyvalue.URelation,
          countryId: RecieverCountryId,
          stateId: step2UpdateSendMoneyvalue.UState,
          postalCode: step2UpdateSendMoneyvalue.UPostalCode,
          city: step2UpdateSendMoneyvalue.UCity,
          deliveryMethodId: MethodId,
          deliverymethodname: Methodname,
          // bankName: step2UpdateSendMoneyvalue.UBankName,
          bankId: UDeliveryName == "Wallet Deposit" ?  +step2UpdateSendMoneyvalue.UwalletName : UDeliveryName == "Bank Deposit" ? +step2UpdateSendMoneyvalue.UBankName : 0,
          bankAccNo: UDeliveryName == "Bank Deposit" ? step2UpdateSendMoneyvalue.UBankAccountNumber : "",
          haveIfscCode: Uselected === "IFSC" ? true : false,
          ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
          bankStateId: 0,
          district: step2UpdateSendMoneyvalue.UDistrict,
          bankBranch: step2UpdateSendMoneyvalue.UBranch,
          bankDetailsVerified: UpdateUserData.bankDetailsVerified,
          otherDetails: "", //remaining
          oldRecipientsId: 0,
          walletName: UDeliveryName == "Wallet Deposit" ? UWalletName : "",
          walletNo:  UDeliveryName == "Wallet Deposit" ? step2UpdateSendMoneyvalue.UwalletNo : ""
          // zaiUserId:step2UpdateSendMoneyvalue.UzaiUserId
        },
        isAdmin: false
        };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/updaterecipienstsbyid",
        UBusinessRecieverData
      );
      if (response.data.status === true) {
        if(response.data.data.isChangesApproved === false){
          setRequestChangetoadmin(true)
        }
        GetAllReciever();
        setShowRec7(false);
        setloadervalue(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateReciever = async (UID) => {
    try {
      const userId = {
        id: UID,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getrecipientsbyid",
        userId
      );
      if (response.data.status === true) {
        setUpdateUserData(response.data.data);
        setUDeliveryName(response.data.data.deliveryMethodName)
        setUWalletName(response.data.data.walletName)
        GetAllDeliveryMethod(
          response.data.data?.type == "individual"
            ? "individual"
            : response.data.data?.type == "business"
            ? "business"
            : response.data.data?.type == "joint"
            ? "joint"
            : "Individual"
        );

        const fullNameArray = response.data.data.fullName
          .substring(1, response.data.data.fullName.length - 1)
          .split(",");

        var EdittempArray2 = [];
        fullNameArray.map((JointName, index) => {
          EdittempArray2.push({
            FullName: JointName,
          });
        });
        setupdateinputFields(EdittempArray2);

        setMethodId(response.data.data.deliveryMethodId);
        setMethodname(response.data.data.deliveryMethodName);
        handleShowRec7();
        // var FilterMethodName=getAllDeliveryMethod.map((val) => response.data.data.deliveryMethodName == val.name)


        const IconName=response.data.data.deliveryMethodName == "Bank Deposit" ? bankIcon : response.data.data.deliveryMethodName == "Wallet Deposit" ? walletIcon : response.data.data.deliveryMethodName == "Cash Pickup" ? cashW :""

        handleSetDropdownValueU1(
          <>
            <img
              src={IconName}
              width="50"
              height="50"
              alt=""
              className="img-fluid"
            />
            <div className="d-flex flex-column ms-4">
              <div className="mainD responsiveFontLarge">
                Delivery Method
              </div>
              <div className="text-black text-start bolder  ">
                {response.data?.data?.deliveryMethodName}
              </div>
            </div>
            <img
              src={drpa}
              className="img-fluid mt-4 ms-4"
              alt=""
            />
          </>,
          response.data?.data?.deliveryMethodName,
          response.data?.data?.id
        );
        setUDeliveryName(response.data?.data?.deliveryMethodName)
        toggleVisibilityDynamicU(
          response.data?.data?.deliveryMethodName
        )

        setIsVisibleDynamicU(response.data.data.deliveryMethodName);
        setSelectedDeliveryMethod(response.data.data.type);
        const checkIFSC = response.data.data.haveIfscCode;
        GetUpdateBanks(
          response.data.data.countryId,
          response.data.data.deliveryMethodId
        );
        if (checkIFSC == true) {
          setUselected("IFSC");
        } else {
          setUselected("NoIFSC");
        }

        setstep2UpdateSendMoneyvalue((prevState) => ({
          ...prevState,
          UIndidual_Firstname: response.data.data.firstName,
          UIndidual_Middlename: response.data.data.middleName,
          UIndidual_Lastname: response.data.data.lastName,
          UBusiness_Name: response.data.data.businessName,
          UBankId: response.data.data.bankId,
          UwalletName:response.data.data.bankId,
          UBankAccountNumber: response.data.data.bankAccNo,
          UwalletNo: response.data.data.walletNo,
          // step2UpdateSendMoneyvalue.UBankId
          // UIFSC: response.data.data,
          // UNoIFSC: response.data.data,
          UIFSC_Code: response.data.data.ifscCode,
          UBankState: response.data.data.bankStateId,
          UDistrict: response.data.data.district,
          UBranch: response.data.data.bankBranch,
          UAddress: response.data.data.address,
          UCity: response.data.data.city,
          UState: response.data.data.stateId,
          UPostalCode: response.data.data.postalCode,
          UMobile: response.data.data.phone,
          URelation: response.data.data.relationId,
        }));
      } else if (response.data.status === "error") {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const GetAllReciever = async () => {
    try {
      const UserData = new FormData();
      UserData.append("userId",  localStorage.getItem("Id"));
      UserData.append("isDeleted", false);
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
        UserData
      );
      DefaultUserReciptionId(response.data.data[0].id);
      if (response.data.status === true) {
        setReceiverInfo(response.data.data);
        setSearchInfo(response.data.data)
        var ReciptionDetails = response.data.data.findIndex(item => item.id == location.state?.ReciptionData?.recipientId)
        // const index = response.data.data.indexOf(ReciptionDetails);
        // console.log(ReciptionDetails,"ReciptionDetails")
        setselectReciever(ReciptionDetails !== -1 ? ReciptionDetails :0 )

        setDeliveryMethodReciption(response.data.data[0]?.deliveryMethodId);

        setDataReceiverInfo(response.data.data);
        console.log(DataReceiverInfo,"response.data.data")
      } else if (response.data.status === "error") {
      }
    } catch (err) {}
  };

  const handleRecieverdelete = async () => {
    try {
      setloadervalue(true);
      const reciever_id = {
        id: Delete_id,
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/deleterecipienstsbyid",
        reciever_id
      );
      if (response.data.status === true) {
        setDataReceiverInfo([]);
        GetAllReciever();
        setloadervalue(false);
        setDeletereciptionpopup(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [selectReciever, setselectReciever] = useState(0);
  const [Summuryupdate, setSummuryupdate] = useState();
  const [DeliveryMethodReciption, setDeliveryMethodReciption] = useState();
  const [selectedRecipentID, setSelectedRecipentID] = useState(location.state && location.state.ReciptionData?.recipientId);
  const [selectedRecipentD_Method, setSelectedRecipentD_Method] = useState();
  // console.log(selectReciever,"selectReciever")
  // const [selectedRecipentID, setSelectedRecipentID] = useState(location.state && location.state.TransactionData != undefined ? location.state.TransactionData.transferPurposeId: 0);
  const [purposeOfSendMoneyId, setpurposeOfSendMoneyId] = useState(
    location.state && location.state.TransactionData != undefined
      ? location.state.TransactionData.transferPurposeId
      : 0
  );

  // useEffect(()=>{
  //   debugger
  //   var ReciptionDetails = ReceiverInfo.find(item => item.id == location.state && location.state.ReciptionData?.recipientId)
  //   const index = ReceiverInfo.indexOf(ReciptionDetails);
  //   console.log(index,"index")
  //   setselectReciever(index)
  // },[ReceiverInfo])

  const Recieverselected = (R_id, userId, D_method_Id) => {
    // ChangeReciptionDetils(userId)
    setselectReciever(R_id);
    setSelectedRecipentD_Method(D_method_Id)
    // SummurryDetails(userId);
    setSelectedRecipentID(userId);
    setDeliveryMethodReciption(D_method_Id);
  };

  const [Deletereciptionpopup, setDeletereciptionpopup] = useState(false);

  const GetAllCountrys = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallcountries"
      );
      if (response.data.status === true) {
        setCountry(response.data.data);
        // GetAllReciever()
      }
    } catch (err) {}
  };
  const getSendingPurpose = (e) => {
    setpurposeOfSendMoneyId(e.target.value);
  };

  const GetAllDeliveryMethod = async (method) => {
    try {
      var data;
      if(method=="individual"){
        data = {
          toCountryId: RecieverCountryId != undefined ? RecieverCountryId :location.state &&
          location.state?.TransactionData
        ? location.state?.TransactionData?.recevingCountryId
        : 0
        };
      }else{
        data = {
          toCountryId: RecieverCountryId != undefined ? RecieverCountryId :location.state &&
          location.state?.TransactionData
        ? location.state?.TransactionData?.recevingCountryId
        : 0 , //Reciver Country Id Aavse Kadach
          userType: method,
          //"Individual"  "business" "joint"
        };

      }
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallactivedeliverymethods",
        data
      );
      if (response.data.status === true) {

        const Delivery = response.data.data.map((Delivery) => ({
          id: Delivery.id,
          name: Delivery.name,
          logo: Delivery.logo,
          estimatedDelivery: Delivery.estimatedDelivery,
          enabled : Delivery.enabled
        }));

        const EnableDeliveryMethod = Delivery.find((Delivryy)=> (FirstStepData && FirstStepData?.deliveryMethodId
          ? FirstStepData?.deliveryMethodId
          : location.state &&
            location.state?.TransactionData
          ? location.state?.TransactionData?.deliveryMethodId
          : 0) == Delivryy?.id)
// debugger
        const selectDeliveryMethod = EnableDeliveryMethod == undefined ?
        Delivery.find((Delivryy)=> "Bank Deposit" == Delivryy?.name) : EnableDeliveryMethod

        setDeliveryID(selectDeliveryMethod?.id)

        setActiveDeliveryMethods(Delivery);

        const Estimate = Delivery.map((ele) => {
          const checkDeliveryMethod = DeliveryName === ele.name;
          if (checkDeliveryMethod) {
            return ele.estimatedDelivery;
          }
        });

        var DeliveryDetails = response.data.data.filter(
          (Delivery) => Delivery.name === "Bank Deposit"
        );
        setgetAllDeliveryMethod(response.data.data);
        var SelectedDelivery = response.data.data.filter(
          (Delivery) =>
            Delivery.id ==
            (FirstStepData != ""
              ? FirstStepData?.deliveryMethodId
                ? FirstStepData?.deliveryMethodId
                : location.state?.TransactionData != undefined
                ? location.state?.TransactionData?.deliveryMethodId
                : ""
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.deliveryMethodId
              : "")
        );
        if (SelectedDelivery.length == 0) {
          DefaultDeliveryName("");
          GetAllBanks(DeliveryDetails[0].id);
        } else {
          GetAllBanks(SelectedDelivery[0].id);
        }
        setdeliveryName(SelectedDelivery[0].name)
        setgetAllDeliveryMethodFirst(SelectedDelivery[0]); ///First Method///
        setgetDeliveryMethodIDFirst(SelectedDelivery[0]); ///First Method///
        setMethodname(SelectedDelivery[0].name);

        setMethodId(SelectedDelivery[0].id);
        setMethodname1(DeliveryDetails[0].name);
        setMethodId1(DeliveryDetails[0].id);
        setMethodname2(DeliveryDetails[0].name);
        setMethodId2(DeliveryDetails[0].id);
        setIsVisibleDynamic(SelectedDelivery[0].name);
        setIsVisibleDynamic2(DeliveryDetails[0].name);
        setIsVisibleDynamic3(DeliveryDetails[0].name);
        // setgetAllPaymentMethod(response.data.data[0]?.paymentMethodCharges)
      } else if (response.data.status === false) {
      }
    } catch (err) {}
  };

  const [getState, setgetState] = useState();

  const GetAllState = async () => {
    try {
      const userId = {
        id: RecieverCountryId,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallstatebycountryid",
        userId
      );
      if (response.data.status === true) {
        setgetState(response.data.data);
        // GetAllCountrys()
      } else if (response.data.status === "error") {
      }
    } catch (err) {}
  };

  const GetAllBanks = async (values) => {
    try {
      const type = {
        countryId:
          FirstStepData != ""
            ? FirstStepData.recevingCountryId != ""
              ? FirstStepData.recevingCountryId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.recevingCountryId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.recevingCountryId
            : "",
        deliveryTypeId: values ? values : FirstStepData?.deliveryMethodId,
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getactivetransactiondeliverymethods", //getallbank replace -- getactivetransactiondeliverymethods
        type
      );
      if (response.data.status === true) {
        setBanks(response.data.data);
      }
    } catch (err) {}
  };

  const GetUpdateBanks = async (id, idd2) => {
    try {
      const type = {
        countryId: id,
        deliveryTypeId: idd2,
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getactivetransactiondeliverymethods", //getallbank replace -- getactivetransactiondeliverymethods
        type
      );
      if (response.data.status === true) {
        setUBanks(response.data.data);
      }
    } catch (err) {}
  };

  //////////////////////Add Dynamic Field//////////////////////////
  const [inputFields, setInputFields] = useState([{ FullName: "" }]);
  const [inputFields1, setInputFields1] = useState([{ FullName: "" }]);
  const [inputFields2, setInputFields2] = useState([{ FullName: "" }]);
  const [updateinputFields, setupdateinputFields] = useState([
    { FullName: "" },
  ]);

  const handleFormChangeBankDeposite = (index, event) => {
    let data = [...inputFields];
    let inputValue = event.target.value;
    let capitalizedValue = "";

    if (inputValue) {
      var AlphanbetValue = inputValue.replace(/[^a-zA-Z\s]/g, ""); // Include \s to match spaces
      const words = AlphanbetValue.split(" ");

      capitalizedValue = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    data[index][event.target.name] = capitalizedValue;
    setInputFields(data);
  };
  const handleFormChangeWalletDeposite = (index, event) => {
    let data = [...inputFields1];
    data[index][event.target.name] = event.target.value;
    setInputFields1(data);
  };
  const handleFormChangeCashPickup = (index, event) => {
    const { name, value } = event.target;
    const fields = [...inputFields2];
    fields[index][name] = value;
    setInputFields(fields);
  };

  const removeFieldCashPickup = (index) => {
    const fields = [...inputFields2];
    fields.splice(index, 1);
    setInputFields2(fields);
  };

  const addFieldsBankDeposite = () => {
    let newfield = { FullName: "" };

    setInputFields([...inputFields, newfield]);
  };

  const removeFieldsBankDeposite = (index) => {
    const fields = [...inputFields];
    fields.splice(index, 1);
    setInputFields(fields);
  };

  const addFieldsWalletDeposite = () => {
    let newfield1 = { FullName: "" };

    setInputFields1([...inputFields1, newfield1]);
  };

  const removeFieldsWalletDeposite = (index) => {
    const fields = [...inputFields1];
    fields.splice(index, 1);
    setInputFields1(fields);
  };

  const addFieldsCashPickup = () => {
    setInputFields2([...inputFields2, { FullName: "" }]);
  };

  ///////////////////Update Joint//////////////

  const UpdateFieldsReciptionDetails = () => {
    let newfield = { FullName: "" };

    setupdateinputFields([...updateinputFields, newfield]);
  };

  const UpdateremoveFieldsReciptionDetails = (index) => {
    const fields = [...updateinputFields];
    fields.splice(index, 1);
    setupdateinputFields(fields);
  };

  const handleFormChangeUpdateDetails = (index, event) => {
    let data = [...updateinputFields];
    data[index][event.target.name] = event.target.value;
    setupdateinputFields(data);
  };

  ////////////////////////////////////////////

  const submit = (e) => {
    e.preventDefault();
    setTwoSelect(false);
    if (
      inputFields2[0].FullName == "" ||
      inputFields2[0].FullName == undefined
    ) {
      setInvalid(true);
    } else {
      handleCloseRec();
      setFullnameArray(inputFields2);
      //setTwoSelect(true)
      setJoinUser(true);
      setShowRec6(true);
    }
  };
  const Updatesubmit = (e) => {
    e.preventDefault();
    setTwoSelect(false);
    if (
      updateinputFields[0].FullName == "" ||
      updateinputFields[0].FullName == undefined
    ) {
      setInvalid(true);
    } else {
      // handleCloseRec();
      setUpdateFullnameArray(updateinputFields);
      //setTwoSelect(true)
      setJoinUser(true);
      setShowRec7(true);
    }
  };
  const GetActivePurposeofTransfer = async () => {
    const allpurpose = await axios.get(
      CommonConstants.BASE_URL + "/getactivepurposeoftransfer"
    );
    setAllPurpose(allpurpose.data.data);
    if(allpurpose?.data?.data != null && allpurpose?.data?.data?.length > 0){
      setpurposeOfSendMoneyId(allpurpose?.data?.data[0]?.id)
    }
  };


  useEffect(()=>{
    var ArrayD = []
    var RealArrayDelivery = ActiveDeliveryMethods.map((DeliveryMethod, index) => {
      if(DeliveryMethod?.enabled === true){
        var enablearray = {
          name:DeliveryMethod.name,
          serviceCharge:
          (FirstStepData && FirstStepData?.amount
            ? FirstStepData?.amount
            : location.state &&
              location.state?.TransactionData
            ? location.state?.TransactionData?.amount
            : 0) !== 0
            ? !PaymentRate
              ? DeliveryLowerUpper.filter(
                  (val) =>
                    val.name === DeliveryMethod.name
                ).map((val) =>
                  val.serviceCharge
                    ? Number((
                        Number(val.serviceCharge) +
                        DeafultPSC
                      )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      // ).toFixed(2)
                    : 0
                )
              : DeliveryLowerUpper.filter(
                  (val) =>
                    val.name === DeliveryMethod.name
                ).map((val) =>
                  val.serviceCharge
                    ? Number((
                        Number(val.serviceCharge) +
                        PaymentRate
                      )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      // ).toFixed(2)
                    : 0
                )
            : FirstStepData && FirstStepData?.amount
            ? FirstStepData?.amount
            : location.state &&
              location.state?.TransactionData
            ? location.state?.TransactionData?.amount
            : 0
        }
        ArrayD.push(enablearray)
      }
    })
    const sortedData = ArrayD.sort((a, b) => parseFloat(a.serviceCharge) - parseFloat(b.serviceCharge));

    const nameMap = {};
    sortedData.forEach(item => {
      nameMap[item.name] = item;
    });

    // Sort array a based on the order in object b
    const sortedA = ActiveDeliveryMethods.sort((itemA, itemB) => {
      const nameA = itemA.name;
      const nameB = itemB.name;

      return sortedData.findIndex(item => item.name === nameA) - sortedData.findIndex(item => item.name === nameB);
    });

    setActiveDeliveryMethods(sortedA)
  },[ActiveDeliveryMethods,PaymentRate,DeliveryLowerUpper,DeafultPSC,FirstStepData])

  // console.log(typeof(FirstStepData),"FirstStepData Step2")

  const AddTransactionDetils = async () => {
    setloadervalue(true);
    const recipientId = selectedRecipentID
      ? selectedRecipentID
      : ReceiverInfo[0].id;

      const recipientDeliveryMethod = selectedRecipentD_Method
      ? selectedRecipentD_Method
      : ReceiverInfo[0].deliveryMethodId;


    if (SaveTansactionID == undefined) {
      const data = {
        userId:
          FirstStepData != ""
            ? FirstStepData.userId != ""
              ? FirstStepData.userId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.userId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.userId
            : "",
        recipientId:
          FirstStepData != ""
            ? recipientId
              ? recipientId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.recipientId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.recipientId
            : "",
        sendingCurrencyCode:
          FirstStepData != ""
            ? FirstStepData.sendingCurrencyCode != ""
              ? FirstStepData.sendingCurrencyCode
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.sendingCurrencyCode
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.sendingCurrencyCode
            : "",
        recevingCurrencyCode:
          FirstStepData != ""
            ? FirstStepData.recevingCurrencyCode != ""
              ? FirstStepData.recevingCurrencyCode
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.recevingCurrencyCode
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.recevingCurrencyCode
            : "",
        sendingCountryId:
          FirstStepData != ""
            ? FirstStepData.sendingCountryId != ""
              ? FirstStepData.sendingCountryId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.sendingCountryId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.sendingCountryId
            : "",
        recevingCountryId:
          FirstStepData != ""
            ? FirstStepData.recevingCountryId != ""
              ? FirstStepData.recevingCountryId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.recevingCountryId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.recevingCountryId
            : "",
        partnerBankId: 3544,
        amount:
          FirstStepData != ""
            ? FirstStepData.amount != ""
              ? FirstStepData.amount
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.amount
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.amount
            : "",
        totalPayable:
          FirstStepData != ""
            ? FirstStepData.totalPayable != ""
              ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
              : location.state?.TransactionData != undefined
              ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
              : ""
            : location.state?.TransactionData != undefined
            ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
            : "",
        receivingAmount:
          FirstStepData != ""
            ? FirstStepData.receivingAmount != ""
              ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
              : location.state?.TransactionData != undefined
              ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
              : 0
            : location.state?.TransactionData != undefined
            ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
            : 0,
        exchangeRate:
          FirstStepData != ""
            ? FirstStepData.exchangeRate != ""
              ? FirstStepData.exchangeRate
              : location.state?.TransactionData != undefined
              ? SetExchangerate
              : 0
            : location.state?.TransactionData != undefined
            ? SetExchangerate
            : 0,
        serviceCharge:
          FirstStepData != ""
            ? FirstStepData.serviceCharge != ""
              ? FirstStepData.serviceCharge
              : location.state?.TransactionData != undefined
              ? TotalServicecharge
              : 0
            : location.state?.TransactionData != undefined
            ? TotalServicecharge
            : 0,
        deliveryMethodId:recipientDeliveryMethod,
        transactionStatusId: 1,
        paymentRequestUuid: "",
        paytoAgreementUuid: "",
        stepNo: 2,
        otherDetails: "",
        transferPurposeId:
          FirstStepData != ""
            ? purposeOfSendMoneyId
              ? Number(purposeOfSendMoneyId)
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.transferPurposeId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.transferPurposeId
            : "",
        userTrnsCount: 0,
        userTrnsAmountSum: 0,
        recTrnsCount: 0,
        paymentMethod:
          FirstStepData != ""
            ? FirstStepData.paymentMethod != ""
              ? FirstStepData.paymentMethod
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.paymentMethod
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.paymentMethod
            : "",
        promoCode:
          FirstStepData != ""
              ? FirstStepData.promoCode != ""
                ? FirstStepData.promoCode
                :""
              : "",
        promoCodeServiceChargeDiscAmt:
          FirstStepData != ""
              ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                ? FirstStepData.promoCodeServiceChargeDiscAmt
                : 0.0
              : 0.0,
        promoCodeExRateDiscAmt:
          FirstStepData != ""
            ? FirstStepData.promoCodeExRateDiscAmt != ""
              ? FirstStepData.promoCodeExRateDiscAmt
              : 0.0
            : 0.0,
        cashBenefit:
          FirstStepData != ""
            ? FirstStepData.cashBenefit != ""
              ? FirstStepData.cashBenefit
              : 0.0
            : 0.0,
        pointBenefit:
          FirstStepData != ""
            ? FirstStepData.pointBenefit != ""
              ? FirstStepData.pointBenefit
              : 0.0
            : 0.0,
        discountedAmount:
          FirstStepData != ""
            ? FirstStepData.discountedAmount != ""
              ? FirstStepData.discountedAmount
              : 0
            : 0,
        transactionPaymentStatusId: 0,
        paymentNote:
          FirstStepData != ""
            ? note != ""
              ? note
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.paymentNote
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.paymentNote
            : "",
        assignedUserId: 0,
        deleteAt: "",
        source: "",
        email:
          FirstStepData != ""
            ? userEmail != ""
              ? userEmail
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.email
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.email
            : "",
        usedCash: FirstStepData != ""
            ? FirstStepData.usedCash != ""
              ? FirstStepData.usedCash
              :0
            :0,
            premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
      };

      axios
        .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
        .then((res) => {
          if (res.data.statuscode == 200) {
            TransactionIDSet(res.data.data);
            setSaveTansaction(res.data.data);
            setSaveTansactionID(res.data.data.id);
            SummurryDetails(recipientId);
            HandleChangeDelivery(res.data.data?.deliveryMethodId)
            setExistUserWithsameMethod(false);
            visitNextStep();
            ShowmessageDialog();
            setloadervalue(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const data = {
        id:
          saveTansaction?.length != 0
            ? saveTansaction.id
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.id
            : "",
        userId:
          FirstStepData != ""
            ? FirstStepData.userId != ""
              ? FirstStepData.userId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.userId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.userId
            : "",
        recipientId:
          FirstStepData != ""
            ? recipientId
              ? recipientId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.recipientId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.recipientId
            : "",
        sendingCurrencyCode:
          FirstStepData != ""
            ? FirstStepData.sendingCurrencyCode != ""
              ? FirstStepData.sendingCurrencyCode
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.sendingCurrencyCode
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.sendingCurrencyCode
            : "",
        recevingCurrencyCode:
          FirstStepData != ""
            ? FirstStepData.recevingCurrencyCode != ""
              ? FirstStepData.recevingCurrencyCode
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.recevingCurrencyCode
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.recevingCurrencyCode
            : "",
        sendingCountryId:
          FirstStepData != ""
            ? FirstStepData.sendingCountryId != ""
              ? FirstStepData.sendingCountryId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.sendingCountryId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.sendingCountryId
            : "",
        recevingCountryId:
          FirstStepData != ""
            ? FirstStepData.recevingCountryId != ""
              ? FirstStepData.recevingCountryId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.recevingCountryId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.recevingCountryId
            : "",
        partnerBankId: 3544,
        amount:
          FirstStepData != ""
            ? FirstStepData.amount != ""
              ? FirstStepData.amount
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.amount
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.amount
            : "",
        totalPayable:
          FirstStepData != ""
            ? FirstStepData.totalPayable != ""
              ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
              : location.state?.TransactionData != undefined
              ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
              : ""
            : location.state?.TransactionData != undefined
            ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
            : "",
          receivingAmount:
            FirstStepData != ""
              ? FirstStepData.receivingAmount != ""
                ? Number(FirstStepData.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                : location.state?.TransactionData != undefined
                ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                : 0
              : location.state?.TransactionData != undefined
              ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
              : 0,
          exchangeRate:
            FirstStepData != ""
              ? FirstStepData.exchangeRate != ""
                ? FirstStepData.exchangeRate
                : location.state?.TransactionData != undefined
                ? SetExchangerate
                : 0
              : location.state?.TransactionData != undefined
              ? SetExchangerate
              : 0,
          serviceCharge:
            FirstStepData != ""
              ? FirstStepData.serviceCharge != ""
                ? FirstStepData.serviceCharge
                : location.state?.TransactionData != undefined
                ? TotalServicecharge
                : 0
              : location.state?.TransactionData != undefined
              ? TotalServicecharge
              : 0,
        deliveryMethodId:recipientDeliveryMethod,
        transactionStatusId: 1,
        paymentRequestUuid: "",
        paytoAgreementUuid: "",
        stepNo: 2,
        otherDetails: "",
        transferPurposeId:
          FirstStepData != ""
            ? purposeOfSendMoneyId
              ? Number(purposeOfSendMoneyId)
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.transferPurposeId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.transferPurposeId
            : "",
        userTrnsCount: 0,
        userTrnsAmountSum: 0,
        recTrnsCount: 0,
        paymentMethod:
          FirstStepData != ""
            ? FirstStepData.paymentMethod != ""
              ? FirstStepData.paymentMethod
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.paymentMethod
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.paymentMethod
            : "",
        promoCode:
          FirstStepData != ""
              ? FirstStepData.promoCode != ""
                ? FirstStepData.promoCode
                :""
              : "",
        promoCodeServiceChargeDiscAmt:
          FirstStepData != ""
              ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                ? FirstStepData.promoCodeServiceChargeDiscAmt
                : 0.0
              : 0.0,
        promoCodeExRateDiscAmt:
          FirstStepData != ""
            ? FirstStepData.promoCodeExRateDiscAmt != ""
              ? FirstStepData.promoCodeExRateDiscAmt
              : 0.0
            : 0.0,
        cashBenefit:
          FirstStepData != ""
            ? FirstStepData.cashBenefit != ""
              ? FirstStepData.cashBenefit
              : 0.0
            : 0.0,
        pointBenefit:
          FirstStepData != ""
            ? FirstStepData.pointBenefit != ""
              ? FirstStepData.pointBenefit
              : 0.0
            : 0.0,
        discountedAmount:
          FirstStepData != ""
            ? FirstStepData.discountedAmount != ""
              ? FirstStepData.discountedAmount
              : 0
            : 0,
        transactionPaymentStatusId: 0,
        paymentNote:
          FirstStepData != ""
            ? note != ""
              ? note
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.paymentNote
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.paymentNote
            : "",
        assignedUserId: 0,
        deleteAt: "",
        source: "",
        email:
          FirstStepData != ""
            ? userEmail != ""
              ? userEmail
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.email
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.email
            : "",
        usedCash: FirstStepData != ""
          ? FirstStepData.usedCash != ""
            ? FirstStepData.usedCash
            :0
          :0,
          premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
      };
      // visitNextStep();

      axios
        .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
        .then((res) => {
          if (res.data.statuscode == 200) {
            TransactionIDSet(res.data.data);
            setSaveTansaction(res.data.data);
            setSaveTansactionID(res.data.data.id);
            SummurryDetails(recipientId);
            HandleChangeDelivery(res.data.data?.deliveryMethodId)
            setExistUserWithsameMethod(false);
            ShowmessageDialog();
            visitNextStep();
            setloadervalue(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const ChangeReciptionDetils = async (Rid) => {
    if (SaveTansactionID != undefined) {
      setloadervalue(true);
      const data = {
        id: saveTansaction.id,
        userId: FirstStepData.userId,
        recipientId: Rid,
        sendingCurrencyCode: FirstStepData.sendingCurrencyCode,
        recevingCurrencyCode: FirstStepData.recevingCurrencyCode,
        sendingCountryId: FirstStepData.sendingCountryId,
        recevingCountryId: FirstStepData.recevingCountryId,
        partnerBankId: 3544,
        amount: FirstStepData.amount,
        totalPayable: Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/)), //----baki che
        receivingAmount: Number(FirstStepData?.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/)), //---baki che
        exchangeRate: FirstStepData.exchangeRate,
        serviceCharge: FirstStepData.serviceCharge,
        deliveryMethodId: FirstStepData.deliveryMethodId,
        transactionStatusId: 1,
        paymentRequestUuid: "",
        paytoAgreementUuid: "",
        stepNo: 2,
        otherDetails: "",
        transferPurposeId: Number(purposeOfSendMoneyId),
        userTrnsCount: 0,
        userTrnsAmountSum: 0,
        recTrnsCount: 0,
        paymentMethod: FirstStepData.paymentMethod,
        promoCode:
          FirstStepData != ""
            ? FirstStepData.promoCode != ""
              ? FirstStepData.promoCode
              : ""
            : "",
        promoCodeServiceChargeDiscAmt:
          FirstStepData != ""
            ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
              ? FirstStepData.promoCodeServiceChargeDiscAmt
              : 0.0
            :0.0,
        promoCodeExRateDiscAmt:
          FirstStepData != ""
            ? FirstStepData.promoCodeExRateDiscAmt != ""
              ? FirstStepData.promoCodeExRateDiscAmt
              : 0.0
            : 0.0,
        cashBenefit:
          FirstStepData != ""
            ? FirstStepData.cashBenefit != ""
              ? FirstStepData.cashBenefit
              : 0
            : 0,
        pointBenefit:
          FirstStepData != ""
            ? FirstStepData.pointBenefit != ""
              ? FirstStepData.pointBenefit
              : 0
            : 0,
        discountedAmount:
          FirstStepData != ""
            ? FirstStepData.discountedAmount != ""
              ? FirstStepData.discountedAmount
              : PromoCodeVerify && location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.discountedAmount
              : ""
            : PromoCodeVerify && location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.discountedAmount
            : 0,
        transactionPaymentStatusId: 0,
        paymentNote: note,
        assignedUserId: 0,
        deleteAt: "",
        source: "",
        email:
          FirstStepData != ""
            ? userEmail != ""
              ? userEmail
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.email
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.email
            : "",
            usedCash: FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    : 0
                  : 0,

            premimumExId:
                FirstStepData != ""
                ? FirstStepData.premimumExId != ""
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  :0,
              premimumExRate:
                FirstStepData != ""
                  ? FirstStepData.premimumExRate != ""
                    ? FirstStepData.premimumExRate
                    : 0
                  : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  :0,
              premimumExAmt:
                FirstStepData != ""
                  ? FirstStepData.premimumExAmt != ""
                    ? FirstStepData.premimumExAmt
                    : 0
                  : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  :0,
      };
      // visitNextStep();

      axios
        .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
        .then((res) => {
          if (res.data.statuscode == 200) {
            TransactionIDSet(res.data.data);
            setSaveTansaction(res.data.data);
            setSaveTansactionID(res.data.data.id);
            setloadervalue(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [Delete_id, setDelete_id] = useState();

  const handleShowDeletepopup = (e, _id) => {
    setDeletereciptionpopup(true);
    setDelete_id(_id);
  };

  const updateTransactionDetils = async () => {
    const regaxEmail =
      /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (purposeOfSendMoneyId == 0 || purposeOfSendMoneyId == undefined) {
      setErrors(true);
    } else if (!(userEmail == "") && !regaxEmail.test(userEmail)) {
      setErrors(true);
    } else {
      setloadervalue(true);
      const recipientId = selectedRecipentID
        ? selectedRecipentID
        : ReceiverInfo[0].id;
      const data = {
        id:
          saveTansaction?.length != 0
            ? saveTansaction.id
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.id
            : "",
        userId:
          FirstStepData != ""
            ? FirstStepData.userId != ""
              ? FirstStepData.userId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.userId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.userId
            : "",
        recipientId:
          FirstStepData != ""
            ? recipientId
              ? recipientId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.recipientId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.recipientId
            : "",
        sendingCurrencyCode:
          FirstStepData != ""
            ? FirstStepData.sendingCurrencyCode != ""
              ? FirstStepData.sendingCurrencyCode
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.sendingCurrencyCode
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.sendingCurrencyCode
            : "",
        recevingCurrencyCode:
          FirstStepData != ""
            ? FirstStepData.recevingCurrencyCode != ""
              ? FirstStepData.recevingCurrencyCode
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.recevingCurrencyCode
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.recevingCurrencyCode
            : "",
        sendingCountryId:
          FirstStepData != ""
            ? FirstStepData.sendingCountryId != ""
              ? FirstStepData.sendingCountryId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.sendingCountryId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.sendingCountryId
            : "",
        recevingCountryId:
          FirstStepData != ""
            ? FirstStepData.recevingCountryId != ""
              ? FirstStepData.recevingCountryId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.recevingCountryId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.recevingCountryId
            : "",
        partnerBankId: 3544,
        amount:
          FirstStepData != ""
            ? FirstStepData.amount != ""
              ? FirstStepData.amount
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.amount
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.amount
            : "",
        totalPayable:
          FirstStepData != ""
            ? FirstStepData.totalPayable != ""
              ? Number(FirstStepData.totalPayable?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
              : location.state?.TransactionData != undefined
              ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
              : ""
            : location.state?.TransactionData != undefined
            ? Number((location.state?.TransactionData?.amount + TotalServicecharge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
            : "",
        receivingAmount:
          FirstStepData != ""
            ? FirstStepData.receivingAmount != ""
              ? Number(FirstStepData?.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
              : location.state?.TransactionData != undefined
              ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
              : 0
            : location.state?.TransactionData != undefined
            ? Number((location.state?.TransactionData?.amount * SetExchangerate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
            : 0,
        exchangeRate:
          FirstStepData != ""
            ? FirstStepData.exchangeRate != ""
              ? FirstStepData.exchangeRate
              : location.state?.TransactionData != undefined
              ? SetExchangerate
              : 0
            : location.state?.TransactionData != undefined
            ? SetExchangerate
            : 0,
        serviceCharge:
          FirstStepData != ""
            ? FirstStepData.serviceCharge != ""
              ? FirstStepData.serviceCharge
              : location.state?.TransactionData != undefined
              ? TotalServicecharge
              : 0
            : location.state?.TransactionData != undefined
            ? TotalServicecharge
            : 0,
        deliveryMethodId:
          FirstStepData != ""
            ? MethodId
              ? MethodId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.deliveryMethodId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.deliveryMethodId
            : "",
        transactionStatusId: 1,
        paymentRequestUuid: "",
        paytoAgreementUuid: "",
        stepNo: 3,
        otherDetails: "",
        transferPurposeId:
          FirstStepData != ""
            ? purposeOfSendMoneyId
              ? Number(purposeOfSendMoneyId)
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.transferPurposeId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.transferPurposeId
            : "",
        userTrnsCount: 0,
        userTrnsAmountSum: 0,
        recTrnsCount: 0,
        paymentMethod:
          FirstStepData != ""
            ? FirstStepData.paymentMethod != ""
              ? FirstStepData.paymentMethod
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.paymentMethod
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.paymentMethod
            : "",
        promoCode:
          FirstStepData != ""
              ? FirstStepData.promoCode != ""
                ? FirstStepData.promoCode
                :""
              : "",
        promoCodeServiceChargeDiscAmt:
          FirstStepData != ""
              ? FirstStepData.promoCodeServiceChargeDiscAmt != ""
                ? FirstStepData.promoCodeServiceChargeDiscAmt
                : 0.0
              : 0.0,
        promoCodeExRateDiscAmt:
          FirstStepData != ""
            ? FirstStepData.promoCodeExRateDiscAmt != ""
              ? FirstStepData.promoCodeExRateDiscAmt
              : 0.0
            : 0.0,
        cashBenefit:
          FirstStepData != ""
            ? FirstStepData.cashBenefit != ""
              ? FirstStepData.cashBenefit
              : 0.0
            : 0.0,
        pointBenefit:
          FirstStepData != ""
            ? FirstStepData.pointBenefit != ""
              ? FirstStepData.pointBenefit
              : 0.0
            : 0.0,
        discountedAmount:
          FirstStepData != ""
            ? FirstStepData.discountedAmount != ""
              ? FirstStepData.discountedAmount
              : 0
            : 0,
        transactionPaymentStatusId: 0,
        paymentNote:
          FirstStepData != ""
            ? note != ""
              ? note
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.paymentNote
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.paymentNote
            : "",
        assignedUserId: 0,
        deleteAt: "",
        source: "",
        email:
          FirstStepData != ""
            ? userEmail != ""
              ? userEmail
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.email
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.email
            : "",
        usedCash: FirstStepData != ""
          ? FirstStepData.usedCash != ""
            ? FirstStepData.usedCash
            :0
          :0,
          premimumExId:
          FirstStepData != ""
          ? FirstStepData.premimumExId != ""
            ? FirstStepData.premimumExId
            : 0
          : PremiumEXRateValue.premimumExId != 0
            ? PremiumEXRateValue?.premimumExId
            :0,
        premimumExRate:
          FirstStepData != ""
            ? FirstStepData.premimumExRate != ""
              ? FirstStepData.premimumExRate
              : 0
            : PremiumEXRateValue.premimumExRate != 0
            ? PremiumEXRateValue?.premimumExRate
            :0,
        premimumExAmt:
          FirstStepData != ""
            ? FirstStepData.premimumExAmt != ""
              ? FirstStepData.premimumExAmt
              : 0
            : PremiumEXRateValue.premimumExAmt != 0
            ? PremiumEXRateValue?.premimumExAmt
            :0,
      };

      axios
        .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
        .then((res) => {
          if (res.data.statuscode == 200) {
            visitNextStep();
            // gettransactionbyid()
            TransactionIDSet(res.data.data);
            ShowmessageDialog();
            setloadervalue(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  //////////////////////////////////////////////////////////////////

  return (
    <>
      <section>
        {loadervalue == true ? <Loader /> : ""}

        <Container
          id={`secondStep`}
          style={{ display: "none" }}
          //  className={messageDialog === true ? "d-none" : "d-block"}
        >
          <Row className="respoChildFooter">
            <Col className="col-lg-12">
              <h1 className="purpleText bolder text-center mt-3 pt-3 pb-3">
                Send Money
              </h1>
            </Col>
            <Col className="col-lg-12 flex-column m-auto d-flex justify-content-center text-center ">
              <div className="smd pb-3">
                <div className="responsiveFontLarge  text-black text-center ">
                  Please choose an existing recipient or add a new recipient.
                </div>
              </div>
            </Col>
          </Row>
          <Row className="">
            <Col className="col-lg-12 d-flex mt-3 justify-content-end ms-auto">
              <Button
                className="mt-2 col-lg-4 ps-2 pe-2 d-block fullRoundedCorner justify-content-end rounded-5 nextBtn1"
                variant="primary"
                onClick={handleShowRec}
              >
                <img src={plus} className="img-fluid" alt="" /> ADD RECIPIENT
              </Button>
            </Col>
          </Row>
      
          <Container>
            {DataReceiverInfo.length == 0 ? (
              <Row className="text-center mt-5">
                <div className="mt-5">
                  <h5>No Recipient Available.</h5>
                </div>
              </Row>
            ) : (
              <>
                <Row className=" mt-4 ">
                  <div>
                    <div className="right-inner-addon input-container ">
                      <img src={searchMan} className="searchMain" alt="" />
                      <input
                        type="text"
                        className="form-control purpleTextV  py-4"
                        placeholder="Search recipient"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                      />
                    </div>
                  </div>
                </Row>
                <Row className="scrollStep2Main">
                  {/* /////////////“Receiver////////////// */}
                  {ReceiverInfo &&
                    ReceiverInfo.map((RecieverDetails, index) => {
                      return (
                        <div key={index}>
                          <div
                            className={`${
                              selectReciever == index ? "activeCardR p-3" : ""
                            }  mt-3 p-3`}
                            onClick={(e) => {
                              Recieverselected(
                                index,
                                RecieverDetails.id,
                                RecieverDetails.deliveryMethodId
                              );
                            }}
                          >
                            <div className="row ">
                              <div className="d-flex justify-content-between">
                                <div className="1 bolder text-black">
                                  {RecieverDetails.firstName +
                                    " " +
                                    RecieverDetails.lastName}
                                  {RecieverDetails.businessName}
                                  {RecieverDetails.fullName == "[]"
                                    ? ""
                                    : RecieverDetails.fullName
                                        .replace("[", "")
                                        .replace("]", "")
                                        .replace(/,/g, " , ")}
                                </div>
                                <div className="1 cursor-pointer d-flex">
                                  <img
                                    src={editBtn}
                                    alt=""
                                    className={`img-fluid pointer ${
                                      selectReciever == index
                                        ? "d-block"
                                        : "d-none"
                                    }`}
                                    onClick={() => {
                                      UpdateReciever(RecieverDetails.id);
                                    }} //handleShowRec7}
                                  />

<img
                                    src={deleteBtn}
                                    alt=""
                                    className={`img-fluid pointer ps-2 ${
                                      selectReciever == index
                                        ? "d-block"
                                        : "d-none"
                                    }`}
                                    onClick={(e) => {
                                      handleShowDeletepopup(
                                        e,
                                        RecieverDetails.id
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                              <div className={`${RecieverDetails.phone == 0 ? "d-none" : "d-block"} d-flex justify-content-between mt-2`}>
                                <div className={`1 text-black `}>
                                  {RecieverDetails.phone == 0
                                    ? "-"
                                    : RecieverDetails.phone}
                                </div>
                                {/* <div className="1">
                                  <img
                                    src={deleteBtn}
                                    alt=""
                                    className={`img-fluid pointer ${
                                      selectReciever == index
                                        ? "d-block"
                                        : "d-none"
                                    }`}
                                    onClick={(e) => {
                                      handleShowDeletepopup(
                                        e,
                                        RecieverDetails.id
                                      );
                                    }}
                                  />
                                </div> */}
                              </div>
                              <div className="d-flex justify-content-between mt-2">
                                <div className="1 text-black">
                                  {RecieverDetails.deliveryMethodName == ""
                                    ? ""
                                    : RecieverDetails.deliveryMethodName}
                                </div>
                              </div>
                              <div className="d-flex justify-content-between mt-2">
                                <div className="1 text-black">
                                  {RecieverDetails.bankName == "" ||
                                  RecieverDetails.bankName == undefined
                                    ? ""
                                    : RecieverDetails.bankName}
                                </div>
                              </div>
                              <div
                                className={`d-flex justify-content-between mt-2 ${
                                  selectReciever == index ? "d-block" : "d-none"
                                }`}
                              >
                                <div className={`1 text-black `}>
                                  {RecieverDetails.bankAccNo !== ""
                                    ? RecieverDetails.bankAccNo
                                    : RecieverDetails.walletNo}
                                </div>
                              </div>
                              <div
                                className={`d-flex justify-content-between mt-2 ${
                                  selectReciever == index ? "d-block" : "d-none"
                                }`}
                              >
                                <div className="1 text-black">
                                  {RecieverDetails.relationName}
                                </div>
                                <div className="1 textGray">
                                  {Country.map((item) => {
                                    if (item.id === ReceiverInfo[0].countryId) {
                                      return item.name;
                                    }
                                  })}
                                  {/* Country */}
                                  {/* {Country.filter((val=>val.id===ReceiverInfo.countryId))} */}
                                </div>
                              </div>
                            </div>
                          </div>
                          <hr className="py-1 mt-4"></hr>
                        </div>
                      );
                    })}
                </Row>
                <Row>
                  <div
                    className={`btn-component pe-5 ps-5 d-flex justify-content-center} `}
                  >
                    <input
                      className={`col-lg-3 uppercase  nextButton1 ${
                        ReceiverInfo.length == 0 ? "d-none" : "d-block"
                      }`}
                      type="button"
                      value={"Next"}
                      onClick={(e) => {
                        if (
                          DeliveryMethodReciption ==
                          FirstStepData.deliveryMethodId
                        ) {
                          Displaynext(false);
                          AddTransactionDetils();
                        } else {
                          setExistUserWithsameMethod(true);
                        }
                      }}
                    />
                  </div>
                </Row>
              </>
            )}
          </Container>
        </Container>

        <Container id={`newStep`} style={{ display: "none" }}>
          <Row className="respoChildFooter">
            <Col className="col-lg-12">
              <h1 className="purpleText bolder text-center mt-3 pt-3 pb-3">
                Send Money
              </h1>
            </Col>
            <Col className="col-lg-12 flex-column m-auto d-flex justify-content-center text-center ">
              <div className="smd pb-3">
                <div className="responsiveFontLarge  text-black text-center ">
                  Please choose an existing recipient or add a new recipient.
                </div>
              </div>
            </Col>
          </Row>
          <Container>
            <Form className="mt-4">
              <Row className="">
                <Form.Group as={Col} className=" input-container ">
                  {/* <i className="purpleText mainStep4 fas fa-landmark"></i> */}
                  <Form.Select
                    className="purpleBorder text-black ps-3"
                    // defaultValue="Individual"
                    id="select1"
                    value={purposeOfSendMoneyId}
                    onChange={getSendingPurpose}
                  >
                    <option value="" disabled>Purpose of transfer</option>
                    {allpurpose &&
                      allpurpose.map((element, i) => {
                        return (
                          <option key={i} value={element.id}>
                            {element.name}
                          </option>
                        );
                      })}
                  </Form.Select>
                  {errors && !purposeOfSendMoneyId && (
                    <div className="responsiveFontLarge text-start text-danger error_message ms-3 mt-2 error">
                      Purpose of transfer is required
                    </div>
                  )}
                </Form.Group>
              </Row>
              <Row className="mt-2">
                <Form.Group
                  className="mb-3 text-center"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <div className="responsiveFontLarge  text-black bolder">
                    Message to receiver
                  </div>
                  <Form.Control
                    as="textarea"
                    className="textAt h-75 mt-3"
                    rows={7}
                    value={note}
                    placeholder="Type your special message (optional) "
                    onChange={(e) => {
                      // e.target.value.length > 119
                      // setLimitNumber(e.target.value.length > 121 ? LimitNumber : e.target.value.length )
                      if (e.target.value.length <= 120) {
                        setLimitNumber(e.target.value.length);
                      } else {
                        setLimitNumber(120);
                      }
                      handleLimitNotes(e);
                    }}
                  />
                  <div className="d-flex justify-content-end">
                    {LimitNumber}/120
                  </div>
                  {/* {NoteErr && NoteErr == true && (
                    <div className="responsiveFontLarge text-start text-danger error_message ms-2 error">
                      Description only 120 charachter
                    </div>
                  )} */}
                </Form.Group>
              </Row>
              <Row
                className=""
                //   aria-hidden={selected !== "female" ? true : false}
              >
                <Form.Group
                  as={Col}
                  className="  input-container required text-start"
                >
                  {/* <i className="purpleText mainStep4 fas fa-landmark"></i> */}
                  <Form.Control
                    type="email"
                    required
                    placeholder="Email (Optional)"
                    name="Referal"
                    className="ps-2 formControlStep2 reflink link py-4"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email address"
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                      const regaxEmail =
                        /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                      if (regaxEmail.test(e.target.value)) {
                        setErrors(false);
                      }
                    }}
                  />
                  {errors && !userEmail == "" && (
                    <div className="responsiveFontLarge text-start text-danger error_message ms-2 error">
                      Enter Correct Email Address
                    </div>
                  )}
                </Form.Group>
              </Row>
            </Form>
          </Container>
          <div className="btn-component pe-5 ps-5 d-flex justify-content-center">
            <input
              className="col-lg-3 uppercase nextButtonStep1"
              type="button"
              value="NEXT"
              onClick={updateTransactionDetils}
            />
          </div>
        </Container>

        {/* /////////reciver Type start/////// */}

        <Modal
          show={show3}
          onHide={(e) => {
            handleCloseRec();
            handleCleanData();
            One1();
            GetAllDeliveryMethod("individual");
          }}
          size="lg"
        >
          <Modal.Header className="text-center d-block justify-content-center m-auto mt-1">
            <Modal.Title>
              <h1 className="purpleText bolder responsiveFontLargeHeading  mb-0 ">
                Add Recipient
              </h1>
            </Modal.Title>
          </Modal.Header>
          <div className="responsiveFontLarge  text-black mt-3 text-center bolder mb-2">
            Select recipient type
          </div>
          <Modal.Body>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col className="col-lg-12 d-flex justify-content-center m-auto my-3">
                  <Col className="col-lg-10">
                    <Nav variant="pills" className="flex-column navMain">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="first"
                          id="Send to Individual account"
                          onClick={One1}
                        >
                          <div className="innerIconRec  ">
                            <img src={people} className="img-fluid" alt="" />
                            <span className="text-black bolder responsiveFontLarge  indAcc d-flex">
                              {" "}
                              Send to Individual account
                            </span>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="second"
                          id="Send to Joint account"
                          onClick={Two2}
                        >
                          <div className="innerIconRec  ">
                            <img
                              src={groupPeople}
                              className="img-fluid"
                              alt=""
                            />
                            <span className="text-black  indAcc responsiveFontLarge bolder ">
                              {" "}
                              Send to Joint account
                            </span>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="third"
                          id="Send to Business account"
                          onClick={Third3}
                        >
                          <div className="innerIconRec  ">
                            <img src={case1} className="img-fluid" alt="" />
                            <span className="text-black  indAcc responsiveFontLarge bolder ">
                              {" "}
                              Send to Business account
                            </span>
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Col>
              </Row>
            </Tab.Container>
          </Modal.Body>
          <Modal.Footer className="mb-2">
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={handleShowRec3}
            >
              Select
            </Button>
          </Modal.Footer>
        </Modal>
        {/* /////////reciver Type end/////// */}

        {/* second modal */}
        {/* Add reciver Start */}
        <Modal
          show={show5}
          onHide={(e) => {
            handleCloseRec3();
            handleCleanData();
            One1();
            GetAllDeliveryMethod("individual");
          }}
          size="lg"
        >
          {/* /////First Form////// */}

          <Row className={`${firstSelect === true ? "d-block" : "d-none"}`}>
            <Modal.Header className="text-center  mt-2">
              <img
                src={backA}
                className="img-fluid pointer"
                onClick={(e)=>{handlebackReciptionDetails(e); handleCleanData(e);}}
                alt=""
              />
              <Modal.Title className="d-flex m-auto">
                <h1 className="purpleText bolder responsiveFontLargeHeading  mb-0  mb-0">
                  Add Recipient
                </h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mainss">
              <Row>
                <Col className="col-lg-12 d-flex m-auto justify-content-center">
                  <div className={`dropdown`}>
                    <button
                      onClick={(e)=>{setShowDelivery(true)}}
                      // onBlur={handleDropdownClick}
                      className="dropdown-btn d-flex justify-content-evenly align-items-start m-0"
                    >
                      {dropdownValue === "" ? (
                        // getAllDeliveryMethodFirst &&
                        <>
                          <img
                            src={bankIcon}
                            width="50"
                            height="50"
                            alt=""
                            className="img-fluid"
                          />
                          <div className="d-flex flex-column ms-4">
                            <div className="responsiveFontLarge mainD responsiveFontLarge">
                              Delivery Method
                            </div>
                            <div className="text-black text-start bolder  ">
                              {/* Bank Deposit */}
                              {getAllDeliveryMethodFirst?.name}
                            </div>
                          </div>
                          <img src={drpa} className="img-fluid mt-4 ms-4" />
                        </>
                      ) : (
                        dropdownValue
                      )}
                    </button>

                    {/* <div
                      className={`dropdown-items ${
                        dropdownState ? "isVisible" : "isHidden"
                      }`}
                    >
                      {console.log(getAllDeliveryMethod,"getAllDeliveryMethod")}
                      {getAllDeliveryMethod &&
                        getAllDeliveryMethod.map((DeliveryMethod, index) => {
                          return (
                            <div
                              key={index}
                              className="dropdown-item"
                              onClick={(e) =>
                                toggleVisibilityDynamic(DeliveryMethod.name, e)
                              }
                            >
                              <div
                                className="dropdown__link d-flex align-items-start m-0"
                                onClick={() =>
                                  handleSetDropdownValue(
                                    <>
                                      <img
                                        src={
                                          CommonConstants.BASE_URL +
                                          DeliveryMethod.logo
                                        }
                                        width="50"
                                        alt=""
                                        height="50"
                                        className="img-fluid"
                                      />
                                      <div className="d-flex flex-column ms-4">
                                        <div className="mainD responsiveFontLarge">
                                          Delivery Method
                                        </div>
                                        <div className="text-black text-start bolder  ">
                                          {DeliveryMethod.name}
                                        </div>
                                      </div>
                                      <img
                                        src={drpa}
                                        alt=""
                                        className="img-fluid mt-4 ms-4"
                                      />
                                    </>,
                                    DeliveryMethod.name,
                                    DeliveryMethod.id
                                  )
                                }
                              >
                                <img
                                  src={
                                    CommonConstants.BASE_URL +
                                    DeliveryMethod.logo
                                  }
                                  width="30"
                                  alt=""
                                  height="30"
                                  className="img-fluid"
                                />
                                <div className="text-black  bolder text-center ms-4">

                                  {DeliveryMethod.name}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div> */}
                  </div>
                </Col>
              </Row>

              {isVisibleDynamic == "Bank Deposit" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="First Name"
                                name="Indidual_Firstname"
                                id="FirstName"
                                value={step2SendMoneyvalue.Indidual_Firstname}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                First Name
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.Indidual_Firstname && (
                                  <div className="responsiveFontLarge text-start text-danger error_message ms-2 error">
                                    First Name is required
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Middle Name"
                                id="MiddleName"
                                name="Indidual_Middlename"
                                value={step2SendMoneyvalue.Indidual_Middlename}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Middle Name
                              </label>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Last Name"
                                id="LastName"
                                value={step2SendMoneyvalue.Indidual_Lastname}
                                name="Indidual_Lastname"
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Last Name
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.Indidual_Lastname && (
                                  <div className="responsiveFontLarge text-start text-danger error_message ms-2 error">
                                    Last Name is required
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-landmark"></i>
                              <Form.Select
                                className="purpleBorder form-input"
                                defaultValue="Individual"
                                name="BankName"
                                id="select1"
                                value={step2SendMoneyvalue.BankName}
                                onChange={handleRecieverValue}
                              >
                                <option value="">Bank Name</option>
                                {Banks &&
                                  Banks.map((Bank, Index) => {
                                    return (
                                      <option value={Bank.id}>
                                        {Bank.text}
                                      </option>
                                    );
                                  })}

                                {/* <option value="Agent">Agent</option> */}
                              </Form.Select>
                              {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                              <label for="name" className="form-label1">
                                Bank Name
                              </label>
                              {invalid && !step2SendMoneyvalue.BankName && (
                                <div className="responsiveFontLarge text-start text-danger error_message ms-2 error">
                                  Bank Name is required
                                </div>
                              )}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-landmark"></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Bank Account Number"
                                id="Bank_Account_Number"
                                name="BankAccountNumber"
                                value={step2SendMoneyvalue.BankAccountNumber}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Bank Account Number
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.BankAccountNumber && (
                                  <div className="responsiveFontLarge text-start text-danger error_message ms-2 error">
                                    Bank Account Number is required
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <div
                            className={`${
                              FirstStepData.recevingCountryId === 101
                                ? "d-block"
                                : "d-none"
                            }`}
                          >
                            <div className=" d-flex align-items-center my-3">
                              <div className="radio">
                                <input
                                  type="radio"
                                  name="IFSC"
                                  value="IFSC"
                                  id="male"
                                  checked={selected === "IFSC"}
                                  onChange={changeHandler}
                                />
                                <label
                                  htmlFor="male"
                                  className="radio-label text-black mb-0 d-flex align-items-center"
                                >
                                  I have IFSC Code
                                </label>
                              </div>

                              <div className="radio ms-3">
                                <input
                                  type="radio"
                                  value="NoIFSC"
                                  id="female"
                                  checked={selected === "NoIFSC"}
                                  name="NoIFSC"
                                  onChange={changeHandler}
                                />
                                <label
                                  htmlFor="female"
                                  className="radio-label text-black mb-0 d-flex align-items-center"
                                >
                                  I don’t have IFSC Code
                                </label>
                              </div>
                            </div>

                            <div
                              className={`${
                                selected === "IFSC" ? "d-none" : "d-block"
                              }`}
                              id="female1"
                              aria-hidden={selected !== "female" ? true : false}
                            >
                              <Row
                                className=""
                                aria-hidden={selected !== "male" ? true : false}
                              >
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Select
                                    className="purpleBorder form-input"
                                    defaultValue="Individual"
                                    name="BankState"
                                    id="select1"
                                    onChange={handleRecieverValue}
                                  >
                                    {/* <option value="Registered">Registered as Business</option> */}
                                    <option value="">State</option>
                                    {getState &&
                                      getState.map((state, Index) => {
                                        return (
                                          <option key={Index} value={state.id}>
                                            {state.name}
                                          </option>
                                        );
                                      })}
                                    {/* <option value="Agent">Gandhinagar</option> */}
                                  </Form.Select>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                  <label for="name" className="form-label1">
                                    Bank State
                                  </label>
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Control
                                    className="purpleBorder form-input"
                                    placeholder="District"
                                    name="District"
                                    value={step2SendMoneyvalue.District}
                                    id="select1"
                                    onChange={handleRecieverValue}
                                  >
                                    {/* <option value="Registered">Registered as Business</option>
                                  <option value="Individual">District</option>
                                  <option value="Business">Business</option>
                                <option value="Agent">Agent</option> */}
                                  </Form.Control>
                                  <label for="name" className="form-label1">
                                    Bank District
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Control
                                    className="purpleBorder form-input"
                                    placeholder="Branch"
                                    name="Branch"
                                    id="select1"
                                    value={step2SendMoneyvalue.Branch}
                                    onChange={handleRecieverValue}
                                  ></Form.Control>
                                  <label for="name" className="form-label1">
                                    Bank Branch
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>
                            </div>

                            <div
                              id="male1"
                              className={`${
                                selected === "NoIFSC" ? "d-none" : "d-block"
                              }`}
                              aria-hidden={selected !== "male" ? true : false}
                            >
                              <Row
                                aria-hidden={
                                  selected !== "female" ? true : false
                                }
                              >
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container required text-start"
                                >
                                  <i className="purpleText mainStep4 fas fa-landmark"></i>
                                  <Form.Control
                                    type="text"
                                    required
                                    placeholder="IFSC Code (if India) / Routing Number (in USA)/ BSB (in AUS)"
                                    id="IFSC_Code"
                                    name="IFSC_Code"
                                    value={step2SendMoneyvalue.IFSC_Code}
                                    className="formControlStep2 reflink link form-input"
                                    onChange={handleRecieverValue}
                                  />
                                  <label for="name" className="form-label1">
                                    IFSC Code (if India) / Routing Number (in
                                    USA)/ BSB (in AUS)
                                  </label>
                                  {/* {invalid && !step2SendMoneyvalue.IFSC_Code && <div className="responsiveFontLarge   text-danger error_message ms-2 error">
                                    IFSC Code is required
                                </div>} */}

                                  {/* {errors.name && <p>{errors.name}</p>} */}
                                </Form.Group>
                              </Row>
                            </div>
                          </div>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12">
                      <Button
                        className="mt-0 my-4 mt-0 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleShowRec6}
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamic == "Wallet Deposit" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="First Name"
                                name="Indidual_Firstname"
                                value={step2SendMoneyvalue.Indidual_Firstname}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                First Name
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.Indidual_Firstname && (
                                  <div className="responsiveFontLarge  text-danger ">
                                    First Name is required
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Middle Name"
                                name="Indidual_Middlename"
                                value={step2SendMoneyvalue.Indidual_Middlename}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Middle Name
                              </label>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Last Name"
                                name="Indidual_Lastname"
                                value={step2SendMoneyvalue.Indidual_Lastname}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Last Name
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.Indidual_Lastname && (
                                  <div className="responsiveFontLarge  text-danger ">
                                    Last Name is required
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row>
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-wallet"></i>
                              {/* <Form.Control
                                  type="text"
                                  required
                                  placeholder="Wallet Name"
                                  name="walletName"
                                  value={step2SendMoneyvalue.walletName}
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleRecieverValue}
                                /> */}

                              <Form.Select
                                className="purpleBorder form-input"
                                defaultValue="Individual"
                                name="walletName"
                                id="select1"
                                onChange={(e)=>{handleRecieverValue(e); handleChangeWalletname(e)}}
                              >
                                <option value="">
                                  Wallet Name (searchable)
                                </option>
                                {Banks &&
                                  Banks.map((Bank, Index) => {
                                    return (
                                      <option value={Bank.id}>
                                        {Bank.text}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              <label for="name" className="form-label1">
                                Wallet Name
                              </label>
                              {invalid && !step2SendMoneyvalue.walletName && (
                                <div className="error_message  text-danger">
                                  wallet name is required
                                </div>
                              )}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fas fa-wallet "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Wallet Account no. "
                                name="walletNo"
                                value={step2SendMoneyvalue.walletNo}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Wallet Account no.
                              </label>
                              {invalid && !step2SendMoneyvalue.walletNo && (
                                <div className="error_message  text-danger ">
                                  wallet accountNo is required
                                </div>
                              )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12">
                      <Button
                        className="mt-0 my-4  mt-0 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleShowRec6}
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamic == "Cash Pickup" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="First Name"
                                name="Indidual_Firstname"
                                value={step2SendMoneyvalue.Indidual_Firstname}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                First Name
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.Indidual_Firstname && (
                                  <div className="responsiveFontLarge  text-danger">
                                    First Name is requiredd
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Middle Name"
                                name="Indidual_Middlename"
                                value={step2SendMoneyvalue.Indidual_Middlename}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Middle Name
                              </label>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Last Name"
                                name="Indidual_Lastname"
                                value={step2SendMoneyvalue.Indidual_Lastname}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Last Name
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.Indidual_Lastname && (
                                  <div className="responsiveFontLarge  text-danger ">
                                    Last Name is requiredd
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12">
                      <Button
                        className="mt-0 my-4 mt-0 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleShowRec6}
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : (
                ""
              )}
            </Modal.Body>
          </Row>

          {/* /////Second Form////// */}

          <Row className={`${TwoSelect === true ? "d-block" : "d-none"}`}>
            <Modal.Header className="text-center  mt-1">
              <img
                src={backA}
                alt=""
                className="img-fluid pointer"
                onClick={handlebackReciptionDetails}
              />
              <Modal.Title className="d-flex m-auto">
                <h1 className="purpleText bolder responsiveFontLargeHeading  mb-0">
                  Add Recipient
                </h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mainss">
              <Row>
                <Col className="col-lg-12 d-flex m-auto justify-content-center">
                  <div className={`dropdown`}>
                    <button
                      onClick={(e)=>{setShowDelivery(true)}}
                      // onBlur={handleDropdownClick1}
                      className="dropdown-btn d-flex justify-content-evenly align-items-start m-0"
                    >
                      {dropdownValue1 === "" ? (
                        <>
                          <img
                            src={bankIcon}
                            width="50"
                            alt=""
                            height="50"
                            className="img-fluid"
                          />
                          <div className="d-flex flex-column ms-4">
                            <div className="mainD responsiveFontLarge">
                              Delivery Method
                            </div>
                            <div className="text-black text-start bolder  ">
                              {getAllDeliveryMethodFirst?.name}
                            </div>
                          </div>
                          <img src={drpa} className="img-fluid mt-4 ms-4" />
                        </>
                      ) : (
                        dropdownValue1
                      )}
                    </button>
                  </div>
                </Col>
              </Row>

              {isVisibleDynamic2 == "Bank Deposit" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Row className="">
                        <Col className="col-lg-12 d-flex mt-3 justify-content-end ms-auto">
                          <Button
                            className="mt-2 w-auto ps-2 pe-2 d-block upparcase fullRoundedCorner justify-content-end rounded-5 nextBtn1"
                            variant="primary"
                            // onClick={handleShowRec}
                            onClick={addFieldsBankDeposite}
                          >
                            <img src={plus} className="img-fluid" /> add account
                            holder
                            {/* RECIPIENT */}
                          </Button>
                        </Col>
                      </Row>
                      <Form>
                        <Form
                          className="sendMoneyPaddingForm mt-3"
                          id="Signup_Step1"
                        >
                          <Form onSubmit={submit}>
                            {inputFields.map((input, index) => {
                              return (
                                <div key={index}>
                                  <Row className="">
                                    <div className="d-flex p-0 m-0">
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container required text-start"
                                      >
                                        <i className="purpleText main fa fa-user "></i>
                                        <Form.Control
                                          type="text"
                                          id={index}
                                          required
                                          value={input.FullName}
                                          placeholder={"Full Name "}
                                          name="FullName"
                                          className="formControlStep2 reflink link form-input"
                                          // onBlur={submit}
                                          onChange={(event) =>
                                            handleFormChangeBankDeposite(
                                              index,
                                              event
                                            )
                                          }
                                        />
                                        <label
                                          for="name"
                                          className="form-label1"
                                        >
                                          Full Name{" "}
                                        </label>
                                        {invalid &&
                                          !inputFields[0].FullName && (
                                            <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                              Full1 Name is required
                                            </div>
                                          )}
                                      </Form.Group>
                                      <span
                                        className={`pt-2 ${
                                          index == 0 ? "d-none" : "d-block"
                                        }`}
                                        onClick={() =>
                                          removeFieldsBankDeposite(index)
                                        }
                                      >
                                        <i class="fas fa-times-circle pointer"></i>
                                      </span>
                                    </div>
                                  </Row>
                                </div>
                              );
                            })}
                          </Form>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-landmark"></i>
                              <Form.Select
                                className="purpleBorder form-input"
                                defaultValue="Individual"
                                id="select1"
                                name="BankName"
                                onChange={handleRecieverValue}
                              >
                                <option value="">Bank Name</option>
                                {Banks &&
                                  Banks.map((Bank, Index) => {
                                    return (
                                      <option value={Bank.id}>
                                        {Bank.text}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              <label for="name" className="form-label1">
                                Bank Name
                              </label>
                              {invalid && !step2SendMoneyvalue.BankName && (
                                <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                  Bank Name is required
                                </div>
                              )}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-landmark"></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Bank Account Number"
                                name="BankAccountNumber"
                                value={step2SendMoneyvalue.BankAccountNumber}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Bank Account Number
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.BankAccountNumber && (
                                  <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                    Bank Account Number is required
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <div
                            className={`${
                              FirstStepData.recevingCountryId === 101
                                ? "d-block"
                                : "d-none"
                            }`}
                          >
                            <div className=" d-flex align-items-center my-3">
                              <div className="radio">
                                <input
                                  type="radio"
                                  name="IFSC1"
                                  value="IFSC"
                                  id="IFSC1"
                                  checked={selected1 === "IFSC"}
                                  onChange={changeHandlerr1}
                                />
                                <label
                                  htmlFor="IFSC1"
                                  className="radio-label text-black mb-0 d-flex align-items-center"
                                >
                                  I have IFSC Code
                                </label>
                              </div>

                              <div className="radio ms-3">
                                <input
                                  type="radio"
                                  value="NoIFSC"
                                  id="NoIFSC1"
                                  checked={selected1 === "NoIFSC"}
                                  name="NoIFSC1"
                                  onChange={changeHandlerr1}
                                />
                                <label
                                  htmlFor="NoIFSC1"
                                  className="radio-label text-black mb-0 d-flex align-items-center"
                                >
                                  I don’t have IFSC Code
                                </label>
                              </div>
                            </div>

                            <div
                              className={`${
                                selected1 === "IFSC" ? "d-none" : "d-block"
                              }`}
                              id="female1"
                              // aria-hidden={selected !== "female" ? true : false}
                            >
                              <Row
                                className=""
                                // aria-hidden={selected !== "male" ? true : false}
                              >
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Select
                                    className="purpleBorder form-input"
                                    defaultValue="Individual"
                                    id="select1"
                                  >
                                    {/* <option value="Registered">Registered as Business</option> */}
                                    <option value="">State</option>
                                    {getState &&
                                      getState.map((state, Index) => {
                                        return (
                                          <option value={state.id} key={Index}>
                                            {state.name}
                                          </option>
                                        );
                                      })}
                                  </Form.Select>
                                  <label for="name" className="form-label1">
                                    Bank State
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Control
                                    className="purpleBorder form-input"
                                    placeholder="District"
                                    name="District"
                                    id="select1"
                                    value={step2SendMoneyvalue.District}
                                    onChange={handleRecieverValue}
                                  />
                                  <label for="name" className="form-label1">
                                    Bank District
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Control
                                    className="purpleBorder form-input"
                                    placeholder="Branch"
                                    name="Branch"
                                    id="select1"
                                    value={step2SendMoneyvalue.Branch}
                                    onChange={handleRecieverValue}
                                  />
                                  <label for="name" className="form-label1">
                                    Bank Branch
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>
                            </div>

                            <div
                              className={`${
                                selected1 === "NoIFSC" ? "d-none" : "d-block"
                              }`}
                              id=""
                              // aria-hidden={selected !== "male" ? true : false}
                            >
                              <Row
                                className=""
                                // aria-hidden={selected !== "female" ? true : false}
                              >
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container required text-start"
                                >
                                  <i className="purpleText mainStep4 fas fa-landmark"></i>
                                  <Form.Control
                                    type="text"
                                    required
                                    placeholder="IFSC Code (if India) / Routing Number (in USA)/ BSB (in AUS)"
                                    name="IFSC_Code"
                                    value={step2SendMoneyvalue.IFSC_Code}
                                    className="formControlStep2 reflink link form-input"
                                    onChange={handleRecieverValue}
                                  />
                                  <label for="name" className="form-label1">
                                    IFSC Code (if India) / Routing Number (in
                                    USA)/ BSB (in AUS)
                                  </label>
                                  {/* {invalid && !step2SendMoneyvalue.IFSC_Code &&  <div className="responsiveFontLarge   text-danger error_message ms-2 error">
                                    IFSC Code is required
                                </div>} */}

                                  {/* {errors.name && <p>{errors.name}</p>} */}
                                </Form.Group>
                              </Row>
                            </div>
                          </div>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12">
                      <Button
                        className="mt-0 my-4 mt-0 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleBusiness2}
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamic2 == "Wallet Deposit" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Row className="">
                        <Col className="col-lg-12 d-flex mt-3 justify-content-end ms-auto">
                          <Button
                            className="mt-2 w-auto ps-2 pe-2 d-block upparcase fullRoundedCorner justify-content-end rounded-5 nextBtn1"
                            variant="primary"
                            // onClick={handleShowRec}
                            onClick={addFieldsWalletDeposite}
                          >
                            <img src={plus} className="img-fluid" /> add account
                            holder
                            {/* RECIPIENT */}
                          </Button>
                        </Col>
                      </Row>
                      <Form>
                        <Form
                          className="sendMoneyPaddingForm
mt-3"
                          id="Signup_Step1"
                        >
                          {/* <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"

                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Full Name"
                                name="FullName1"
                                className="formControlStep2"
                              />
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Full Name
                            </div>
                            </Form.Group>
                          </Row> */}
                          {inputFields1.map((input, index) => {
                            return (
                              <div key={index}>
                                <Row className="">
                                  <Form.Group
                                    as={Col}
                                    className="left-inner-addon d-flex input-container required text-start"
                                  >
                                    <i className="purpleText main fa fa-user "></i>
                                    <Form.Control
                                      type="text"
                                      id={index}
                                      required
                                      value={input.FullName}
                                      placeholder={"Full Name "}
                                      name="FullName"
                                      className="formControlStep2 reflink link form-input"
                                      onChange={(event) =>
                                        handleFormChangeWalletDeposite(
                                          index,
                                          event
                                        )
                                      }
                                    />
                                    <label for="name" className="form-label1">
                                      Full Name{" "}
                                    </label>
                                    <span
                                      className="pt-2 "
                                      onClick={() =>
                                        removeFieldsWalletDeposite(index)
                                      }
                                    >
                                      <i class="fas fa-times-circle pointer"></i>
                                    </span>

                                    {/* {errors.name && <p>{errors.name}</p>} */}
                                  </Form.Group>
                                  {invalid && !inputFields1[0].FullName && (
                                    <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                      Full Name is required
                                    </div>
                                  )}
                                </Row>
                              </div>
                            );
                          })}

                          <Row>
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-wallet"></i>
                              {/* <Form.Control
                                type="text"
                                required
                                placeholder="Wallet Name"
                                name="walletName"
                                value={step2SendMoneyvalue.walletName}
                                className="formControlStep2 reflink link form-input"
                                onChange={(e)=>{handleRecieverValue(e); handleChangeWalletname(e)}}
                              /> */}
                              <Form.Select
                                className="purpleBorder form-input"
                                defaultValue="Individual"
                                name="walletName"
                                id="select1"
                                onChange={(e)=>{handleRecieverValue(e); handleChangeWalletname(e)}}
                              >
                                <option value="">
                                  Wallet Name (searchable)
                                </option>
                                {Banks &&
                                  Banks.map((Bank, Index) => {
                                    return (
                                      <option value={Bank.id}>
                                        {Bank.text}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              <label for="name" className="form-label1">
                                Wallet Name
                              </label>
                              {invalid && !step2SendMoneyvalue.walletName && (
                                <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                  wallet name is required
                                </div>
                              )}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fas fa-wallet "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Wallet Account no. "
                                name="walletNo"
                                value={step2SendMoneyvalue.walletNo}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Wallet Account no.
                              </label>
                              {invalid && !step2SendMoneyvalue.walletNo && (
                                <div className="responsiveFontLarge   text-danger error_message ms-2 error">
                                  Wallet Account no.
                                </div>
                              )}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12">
                      <Button
                        className="mt-0 my-4 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleBusiness2}
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamic2 == "Cash Pickup" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Row className="">
                        <Col className="col-lg-12 d-flex mt-3 justify-content-end ms-auto">
                          <Button
                            className="mt-2 w-auto ps-2 pe-2 d-block upparcase fullRoundedCorner justify-content-end rounded-5 nextBtn1"
                            variant="primary"
                            // onClick={handleShowRec}
                            onClick={addFieldsCashPickup}
                          >
                            <img src={plus} className="img-fluid" /> add account
                            holder
                            {/* RECIPIENT */}
                          </Button>
                        </Col>
                      </Row>
                      <Form>
                        <Form
                          className="sendMoneyPaddingForm
mt-3"
                          id="Signup_Step1"
                          onSubmit={submit}
                        >
                          {inputFields2.map((input, index) => {
                            return (
                              <div
                                key={index}
                                className="align-items-center position-relative"
                              >
                                <Row className="">
                                  <Form.Group
                                    as={Col}
                                    className="left-inner-addon input-container required text-start"
                                  >
                                    <i className="purpleText main fa fa-user "></i>
                                    <Form.Control
                                      type="text"
                                      id={index}
                                      required
                                      value={input.FullName}
                                      placeholder={"Full Name"}
                                      name="FullName"
                                      className="formControlStep2 reflink link form-input"
                                      onChange={(event) =>
                                        handleFormChangeCashPickup(index, event)
                                      }
                                    />
                                    <label for="name" className="form-label1">
                                      Full Name
                                    </label>
                                    <span
                                      className="pt-2 "
                                      onClick={() =>
                                        removeFieldCashPickup(index)
                                      }
                                    >
                                      <i class="fas fa-times-circle pointer"></i>
                                    </span>

                                    {invalid && !inputFields2[0].FullName && (
                                      <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                        Full Name is required
                                      </div>
                                    )}
                                    {/* <div className="removbtn"></div> */}
                                    {/* <Button variant="danger" onClick={() => removeFieldCashPickup(index)}>
                                          Remove
                                        </Button> */}
                                    {/* {errors.name && <p>{errors.name}</p>} */}
                                  </Form.Group>
                                </Row>
                              </div>
                            );
                          })}
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12">
                      <Button
                        className="mt-0 my-4 col-lg-3 d-block m-auto nextBtn1"
                        // onClick={handleShowRec6}
                        onClick={submit}
                        variant="primary"
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : (
                ""
              )}
            </Modal.Body>
          </Row>

          {/* /////Third Form////// */}

          <Row className={`${ThreeSelect === true ? "d-block" : "d-none"}`}>
            <Modal.Header className="text-center  mt-1">
              <img
                src={backA}
                className="img-fluid pointer"
                onClick={handlebackReciptionDetails}
              />
              <Modal.Title className="d-flex m-auto">
                <h1 className="purpleText bolder responsiveFontLargeHeading  mb-0">
                  Add Recipient
                </h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mainss">
              <Row>
                <Col className="col-lg-12 d-flex m-auto justify-content-center">
                  <div className={`dropdown`}>
                    <button
                      onClick={(e)=>{setShowDelivery(true)}}
                      // onBlur={handleDropdownClick2}
                      className="dropdown-btn d-flex justify-content-evenly align-items-start m-0"
                    >
                      {dropdownValue2 === "" ? (
                        <>
                          <img
                            src={bankIcon}
                            width="50"
                            height="50"
                            className="img-fluid"
                            alt=""
                          />
                          <div className="d-flex flex-column ms-4">
                            <div className="mainD responsiveFontLarge">
                              Delivery Method
                            </div>
                            <div className="text-black text-start bolder  ">
                              {getAllDeliveryMethodFirst?.name}
                            </div>
                          </div>
                          <img
                            src={drpa}
                            className="img-fluid mt-4 ms-4"
                            alt=""
                          />
                        </>
                      ) : (
                        dropdownValue2
                      )}
                    </button>
                  </div>
                </Col>
              </Row>

              {isVisibleDynamic3 == "Bank Deposit" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Business Name"
                                name="Business_Name"
                                value={step2SendMoneyvalue.Business_Name}
                                className="formControlStep2 required form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Business Name{" "}
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.Business_Name && (
                                  <div className="responsiveFontLarge  text-danger error error_message  ms-2 error text-start">
                                    Business Name is required
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-landmark"></i>
                              <Form.Select
                                className="purpleBorder form-input"
                                defaultValue="Individual"
                                name="BankName"
                                id="select1"
                                onChange={handleRecieverValue}
                              >
                                {/* <option value="Registered">Registered as Business</option> */}
                                <option value="">Bank Name</option>
                                {Banks &&
                                  Banks.map((Bank, Index) => {
                                    return (
                                      <option value={Bank.id}>
                                        {Bank.text}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              <label for="name" className="form-label1">
                                Bank Name
                              </label>
                              {invalid && !step2SendMoneyvalue.BankName && (
                                <div className="responsiveFontLarge  text-danger error error_message  ms-2 error text-start">
                                  Bank Name is required
                                </div>
                              )}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-landmark"></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Bank Account Number"
                                name="BankAccountNumber"
                                value={step2SendMoneyvalue.BankAccountNumber}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Bank Account Number
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.BankAccountNumber && (
                                  <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                    Bank Account Number is required
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <div
                            className={`${
                              FirstStepData.recevingCountryId === 101
                                ? "d-block"
                                : "d-none"
                            }`}
                          >
                            <div className=" d-flex align-items-center my-3">
                              <div className="radio">
                                <input
                                  type="radio"
                                  name="IFSC"
                                  value="IFSC"
                                  id="IFSC2"
                                  checked={selected2 === "IFSC"}
                                  onChange={changeHandler2}
                                />
                                <label
                                  htmlFor="IFSC2"
                                  className="radio-label text-black mb-0 d-flex align-items-center"
                                >
                                  I have IFSC Code
                                </label>
                              </div>

                              <div className="radio ms-3">
                                <input
                                  type="radio"
                                  value="NoIFSC"
                                  id="NoIFSC2"
                                  checked={selected2 === "NoIFSC"}
                                  name="NoIFSC"
                                  onChange={changeHandler2}
                                />
                                <label
                                  htmlFor="NoIFSC2"
                                  className="radio-label text-black mb-0 d-flex align-items-center"
                                >
                                  I don’t have IFSC Code
                                </label>
                              </div>
                            </div>

                            <div
                              // id="IFSC"
                              className={`${
                                selected2 === "IFSC" ? "d-none" : "d-block"
                              }`}
                              // aria-hidden={selected !== "female" ? true : false}
                            >
                              <Row
                                className=""
                                // aria-hidden={selected !== "male" ? true : false}
                              >
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Select
                                    className="purpleBorder form-input"
                                    defaultValue="Individual"
                                    id="select1"
                                    name="BankState"
                                    onChange={handleRecieverValue}
                                  >
                                    {/* <option value="Registered">Registered as Business</option> */}
                                    <option value="">State</option>
                                    {getState &&
                                      getState.map((state, Index) => {
                                        return (
                                          <option value={state.id} key={Index}>
                                            {state.name}
                                          </option>
                                        );
                                      })}
                                  </Form.Select>
                                  <label for="name" className="form-label1">
                                    Bank State
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Control
                                    className="purpleBorder form-input"
                                    name="District"
                                    placeholder="District"
                                    value={step2SendMoneyvalue.District}
                                    onChange={handleRecieverValue}
                                  ></Form.Control>
                                  <label for="name" className="form-label1">
                                    Bank District
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Control
                                    className="purpleBorder form-input"
                                    // defaultValue="Individual"
                                    // id="select1"
                                    placeholder="Branch"
                                    name="Branch"
                                    value={step2SendMoneyvalue.Branch}
                                    onChange={handleRecieverValue}
                                  >
                                    {/* <option value="Registered">Registered as Business</option> */}
                                    {/* <option value="Individual">Branch</option>
                                  <option value="Business">Business</option>
                                  <option value="Agent">Agent</option> */}
                                  </Form.Control>
                                  <label for="name" className="form-label1">
                                    Bank Branch
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>
                            </div>

                            <div
                              // id="NoIFSC"
                              className={`${
                                selected2 === "NoIFSC" ? "d-none" : "d-block"
                              }`}
                              // aria-hidden={selected !== "male" ? true : false}
                            >
                              <Row
                                className=""
                                aria-hidden={
                                  selected !== "female" ? true : false
                                }
                              >
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container required text-start"
                                >
                                  <i className="purpleText mainStep4 fas fa-landmark"></i>
                                  <Form.Control
                                    type="text"
                                    required
                                    placeholder="IFSC Code (if India) / Routing Number (in USA)/ BSB (in AUS)"
                                    name="IFSC_Code"
                                    value={step2SendMoneyvalue.IFSC_Code}
                                    className="formControlStep2 reflink link form-input"
                                    onChange={handleRecieverValue}
                                  />
                                  <label for="name" className="form-label1">
                                    IFSC Code (if India) / Routing Number (in
                                    USA)/ BSB (in AUS)
                                  </label>
                                  {/* {invalid && !step2SendMoneyvalue.IFSC_Code  && <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                    IFSC Code is required
                                </div>} */}
                                </Form.Group>
                              </Row>
                            </div>
                          </div>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12">
                      <Button
                        className="mt-0 my-4 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleBusiness}
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamic3 == "Wallet Deposit" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Business Name"
                                name="Business_Name"
                                value={step2SendMoneyvalue.Business_Name}
                                className="formControlStep2 required form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Business Name{" "}
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.Business_Name && (
                                  <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                    Business Name is required
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row>
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-wallet"></i>
                              {/* <Form.Control
                                type="text"
                                required
                                placeholder="Wallet Name"
                                name="BankName"
                                value={step2SendMoneyvalue.walletName}
                                className="formControlStep2 reflink link form-input"
                                onChange={(e)=>{handleRecieverValue(e); handleChangeWalletname(e)}}
                              /> */}
                              <Form.Select
                                className="purpleBorder form-input"
                                name="walletName"
                                id="select1"
                                onChange={(e)=>{handleRecieverValue(e); handleChangeWalletname(e)}}
                              >
                                <option value="">
                                  Wallet Name (searchable)
                                </option>
                                {Banks &&
                                  Banks.map((Bank, Index) => {
                                    return (
                                      <option value={Bank.id}>
                                        {Bank.text}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              <label for="name" className="form-label1">
                                Wallet Name
                              </label>
                              {invalid && !step2SendMoneyvalue.walletName && (
                                <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                  wallet name is required
                                </div>
                              )}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fas fa-wallet "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Wallet Account no. "
                                name="walletNo"
                                value={step2SendMoneyvalue.walletNo}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Wallet Account Number
                              </label>
                              {invalid && !step2SendMoneyvalue.walletNo && (
                                <div className="responsiveFontLarge   text-danger error_message ms-2 error">
                                  Wallet Account Number is required
                                </div>
                              )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12">
                      <Button
                        className="mt-0 my-4 col-lg-3 d-block m-auto nextBtn1"
                        onClick={handleBusiness}
                        variant="primary"
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamic3 == "Cash Pickup" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Business Name"
                                name="Business_Name"
                                value={step2SendMoneyvalue.Business_Name}
                                className="formControlStep2 required form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Business Name{" "}
                              </label>
                              {invalid &&
                                !step2SendMoneyvalue.Business_Name && (
                                  <div className="responsiveFontLarge   text-danger error ms-2 error">
                                    Business Name is required
                                  </div>
                                )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12">
                      <Button
                        className="mt-0 my-1 col-lg-3 d-block m-auto nextBtn1"
                        onClick={handleBusiness}
                        variant="primary"
                      >
                        NEXT
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : (
                ""
              )}
            </Modal.Body>
          </Row>
        </Modal>
        {/* Add reciver End */}
        {/* second End */}

        {/* third modal */}
        {/* /////////Contact Details start/////// */}
        <Modal
          show={show6}
          onHide={() => {
            handleCloseRec6();
            handleCleanData();
            One1();
            GetAllDeliveryMethod("individual");
          }}
          size="lg"
        >
          <Row>
            <Modal.Header className="text-center  mt-1">
              <img
                src={backA}
                className="img-fluid pointer"
                alt=""
                onClick={handlebackContactDetails}
              />
              <Modal.Title className="d-flex m-auto">
                <h1 className="purpleText bolder responsiveFontLargeHeading  mb-0">
                  Add Recipient
                </h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mainss">
              <>
                <Row>
                  <Col className="col-lg-12  text-center">
                    <label className="text-black text-center mb-0">
                      Contact Details
                    </label>
                    <Form>
                      <Form
                        className="mt-3 sendMoneyPaddingForm"
                        id="Signup_Step1"
                      >
                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? "d-none"
                              : "d-block"
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-map-marker "></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Address"
                              name="Address"
                              value={step2SendMoneyvalue.Address}
                              className="formControlStep2 reflink link form-input"
                              onChange={handleRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Address
                            </label>
                            {errors && !step2SendMoneyvalue.Address && (
                              <div className="responsiveFontLarge  text-danger">
                                Address is required
                              </div>
                            )}

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-map-marker "></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="City/District"
                              name="City"
                              value={step2SendMoneyvalue.City}
                              className="formControlStep2 reflink link form-input"
                              onChange={handleRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              City/District
                            </label>
                            {errors && !step2SendMoneyvalue.City && (
                              <div className="responsiveFontLarge error_message text-danger">
                                City/District is required
                              </div>
                            )}

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>
                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? "d-none"
                              : "d-block"
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container text-start"
                          >
                            <i className="purpleText mainStep4 fa fa-map-marker"></i>
                            <Form.Select
                              className="purpleBorder form-input"
                              defaultValue="Individual"
                              name="State"
                              id="select1"
                              onChange={handleRecieverValue}
                            >
                              {/* <option value="Registered">Registered as Business</option> */}
                              <option value="">State</option>
                              {getState &&
                                getState.map((state, Index) => {
                                  return (
                                    <option value={state.id} key={Index}>
                                      {state.name}
                                    </option>
                                  );
                                })}
                            </Form.Select>
                            <label for="name" className="form-label1">
                              State
                            </label>
                            {errors && !step2SendMoneyvalue.State && (
                              <div className="responsiveFontLarge  text-danger ">
                                State is required
                              </div>
                            )}
                            {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                          </Form.Group>
                        </Row>

                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? "d-none"
                              : "d-block"
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-map-marker"></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Postal Code"
                              name="PostalCode"
                              value={step2SendMoneyvalue.PostalCode}
                              className="formControlStep2 reflink link form-input"
                              onChange={handleRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Postal Code
                            </label>
                            {errors && !step2SendMoneyvalue.PostalCode && (
                              <div className="responsiveFontLarge  text-danger">
                                Postal Code is required
                              </div>
                            )}

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row className="">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-mobile"></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Mobile"
                              name="Mobile"
                              value={step2SendMoneyvalue.Mobile}
                              className="formControlStep2 reflink link form-input"
                              onChange={handleRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Mobile
                            </label>
                            {Mobilelength === true &&
                              step2SendMoneyvalue.Mobile != "" && (
                                <div className="responsiveFontLarge error_message text-danger ">
                                  please Enter Valid Mobile Number
                                </div>
                              )}

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? "d-none"
                              : "d-block"
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-mobile"></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Email"
                              name="Email"
                              value={step2SendMoneyvalue.Email}
                              className="formControlStep2 reflink link form-input"
                              onChange={handleRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Email
                            </label>
                            {errors && !step2SendMoneyvalue.Email && (
                              <div className="responsiveFontLarge  text-danger ">
                                Enter Valid Email
                              </div>
                            )}

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>
                        <Row className="">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container text-start"
                          >
                            <i className="purpleText mainStep4 fa fa-user"></i>
                            <Form.Select
                              className="purpleBorder form-input"
                              defaultValue="Individual"
                              name="Relation"
                              id="select1"
                              onChange={handleRecieverValue}
                            >
                              {/* <option value="Registered">Registered as Business</option> */}
                              <option value="">Relation</option>
                              {adminRelation &&
                                adminRelation.map((Relation, index) => {
                                  return (
                                    <option key={index} value={Relation.id}>
                                      {Relation.name}
                                    </option>
                                  );
                                })}
                            </Form.Select>
                            <label for="name" className="form-label1">
                              Relation
                            </label>
                            {errors && !step2SendMoneyvalue.Relation && (
                              <div className="responsiveFontLarge error_message text-danger ">
                                Relation is required
                              </div>
                            )}
                            {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                          </Form.Group>
                        </Row>
                      </Form>
                    </Form>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-lg-12">
                    <Button
                      className="mt-0 my-1 mb-4 col-lg-3 d-block m-auto nextBtn1"
                      onClick={(e) => {
                        // debugger
                        if (
                          step2SendMoneyvalue.Mobile == "" ||
                          (step2SendMoneyvalue.Mobile.length > 7 &&
                            step2SendMoneyvalue.Mobile.length < 14)
                        ) {
                          setMobilelength(false);
                          Displaynext(false);
                          firstSelect === true
                            ? ADDReciever()
                            : JointUser === true
                            ? ADDJointReciever()
                            : ADDBusinessReciever();
                        } else {
                          setMobilelength(true);
                        }
                      }}
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </>
            </Modal.Body>
          </Row>
        </Modal>
        {/* /////////Contact Details end/////// */}

        {/* Four modal */}
        {/* /////////Update Reciver Details start/////// */}
        <Modal show={show7} onHide={(e)=>{handleCloseRec7(e); setDropdownStateU(false);}} size="lg">
          <Row className="">
            <Modal.Header className="text-center  mt-1">
              <img
                src={backA}
                className="img-fluid pointer"
                alt=""
                onClick={(e)=>{handleCloseRec7(e); setDropdownStateU(false);}}
              />
              <Modal.Title className="d-flex m-auto">
                <h1 className="purpleText bolder responsiveFontLargeHeading  mb-0">
                  Edit Recipient
                </h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mainss">
              <Row>
                <Col className="col-lg-12 d-flex m-auto justify-content-center">
                  <div className={`dropdown`}>
                    <button
                      onClick={(e) => {
                        handleDropdownClickU(e);
                      }}
                      className="dropdown-btn d-flex justify-content-evenly align-items-start m-0"
                    >
                      {dropdownValueU === "" ? (
                        <>
                          <img
                            src={bankIcon}
                            width="50"
                            height="50"
                            alt=""
                            className="img-fluid"
                          />
                          <div className="d-flex flex-column ms-4">
                            <div className=" mainD responsiveFontLarge">
                              Delivery Method{" "}
                            </div>
                            <div className="text-black text-start bolder">
                              {isVisibleDynamicU}
                            </div>
                          </div>
                          <img src={drpa} className="img-fluid mt-4 ms-4" />
                        </>
                      ) : (
                        dropdownValueU
                      )}
                    </button>
                    {/* {selectedDeliveryMethod == "individual" && ( */}
                    {
                      <div
                        className={`dropdown-items ${
                          dropdownStateU ? "isVisible" : "isHidden"
                        }`}
                      >
                        {getAllDeliveryMethod &&
                          getAllDeliveryMethod.map((DeliveryMethod, index) => {
                            return (
                              <div
                                key={index}
                                className="dropdown-item"
                                // onClick={(e) =>{
                                //   setUDeliveryName(DeliveryMethod.name)
                                //   toggleVisibilityDynamicU(
                                //     DeliveryMethod.name,
                                //     e
                                //   )
                                // }
                                // }
                              >
                                <div
                                  className="dropdown__link d-flex align-items-start "
                                  onClick={(e) =>{
                                    handleSetDropdownValueU(
                                      <>
                                        <img
                                          src={CommonConstants.BASE_URL + DeliveryMethod.logo}
                                          width="50"
                                          height="50"
                                          alt=""
                                          className="img-fluid"
                                        />
                                        <div className="d-flex flex-column ms-4">
                                          <div className="mainD responsiveFontLarge">
                                            Delivery Method
                                          </div>
                                          <div className="text-black text-start bolder  ">
                                            {DeliveryMethod.name}
                                          </div>
                                        </div>
                                        <img
                                          src={drpa}
                                          className="img-fluid mt-4 ms-4"
                                          alt=""
                                        />
                                      </>,
                                      DeliveryMethod.name,
                                      DeliveryMethod.id
                                    )
                                    setUDeliveryName(DeliveryMethod.name)
                                    toggleVisibilityDynamicU(
                                      DeliveryMethod.name,
                                      e
                                    )
                                  }
                                  }
                                >
                                  <img
                                    src={CommonConstants.BASE_URL +DeliveryMethod.logo}
                                    width="30"
                                    height="30"
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="text-black  bolder text-center ms-4">
                                    {DeliveryMethod.name}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    }
                  </div>
                </Col>
              </Row>

              {isVisibleDynamicU == "Bank Deposit" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <div
                            className={`${
                              UpdateUserData.type === "individual"
                                ? "d-block"
                                : "d-none"
                            }`}
                          >
                            <Row className="">
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required text-start"
                              >
                                <i className="purpleText main fa fa-user "></i>
                                <Form.Control
                                  type="text"
                                  required
                                  defaultValue={UpdateUserData.firstName}
                                  placeholder="First Name"
                                  name="UIndidual_Firstname"
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleUpdateRecieverValue}
                                />
                                <label for="name" className="form-label1">
                                  First Name
                                </label>
                                <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  First Name
                                </div>

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                            <Row className="">
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required text-start"
                              >
                                <i className="purpleText main fa fa-user "></i>
                                <Form.Control
                                  type="text"
                                  required
                                  placeholder="Middle Name"
                                  defaultValue={UpdateUserData.middleName}
                                  name="UIndidual_Middlename"
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleUpdateRecieverValue}
                                />
                                <label for="name" className="form-label1">
                                  Middle Name
                                </label>
                                <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  Middle Name
                                </div>

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                            <Row className="">
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required text-start"
                              >
                                <i className="purpleText main fa fa-user "></i>
                                <Form.Control
                                  type="text"
                                  required
                                  placeholder="Last Name"
                                  defaultValue={UpdateUserData.lastName}
                                  name="UIndidual_Lastname"
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleUpdateRecieverValue}
                                />
                                <label for="name" className="form-label1">
                                  Last Name
                                </label>
                                <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  Last Name
                                </div>

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                          </div>
                          <div
                            className={`${
                              UpdateUserData.type === "business"
                                ? "d-block"
                                : "d-none"
                            }`}
                          >
                            <Row className="">
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required text-start"
                              >
                                <i className="purpleText main fa fa-user "></i>
                                <Form.Control
                                  type="text"
                                  required
                                  defaultValue={UpdateUserData.businessName}
                                  placeholder="Business Name"
                                  name="UBusiness_Name"
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleUpdateRecieverValue}
                                />
                                <label for="name" className="form-label1">
                                  Business Name
                                </label>
                                <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  First Name
                                </div>

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                          </div>
                          <div
                            className={`${
                              UpdateUserData.type === "joint"
                                ? "d-block"
                                : "d-none"
                            }`}
                          >
                            <Row className="">
                              <Col className="col-lg-12 d-flex mt-3 justify-content-end ms-auto">
                                <Button
                                  className="mt-2 col-lg-4 ps-2 pe-2 d-block upparcase fullRoundedCorner justify-content-end rounded-5 nextBtn1"
                                  variant="primary"
                                  // onClick={handleShowRec}
                                  onClick={UpdateFieldsReciptionDetails}
                                >
                                  <img src={plus} className="img-fluid" /> add
                                  account holder
                                  {/* RECIPIENT */}
                                </Button>
                              </Col>
                            </Row>
                            <Form onSubmit={Updatesubmit}>
                              {updateinputFields.map((input, index) => {
                                return (
                                  <div key={index}>
                                    <Row className="">
                                      <div className="d-flex p-0 m-0">
                                        <Form.Group
                                          as={Col}
                                          className="left-inner-addon input-container required text-start pb-0"
                                        >
                                          <i className="purpleText main fa fa-user "></i>
                                          <Form.Control
                                            type="text"
                                            id={index}
                                            required
                                            value={input.FullName}
                                            placeholder={"Full Name "}
                                            name="FullName"
                                            className="formControlStep2 reflink link form-input"
                                            // onBlur={submit}
                                            onChange={(event) =>
                                              handleFormChangeUpdateDetails(
                                                index,
                                                event
                                              )
                                            }
                                            onBlur={(e) => {
                                              Updatesubmit(e);
                                            }}
                                          />
                                          <label
                                            for="name"
                                            className="form-label1"
                                          >
                                            Full Name{" "}
                                          </label>
                                        </Form.Group>
                                        <span
                                          className={`pt-2 ${
                                            index == 0 ? "d-none" : "d-block"
                                          }`}
                                          onClick={() =>
                                            UpdateremoveFieldsReciptionDetails(
                                              index
                                            )
                                          }
                                        >
                                          <i class="fas fa-times-circle pointer"></i>
                                        </span>
                                      </div>
                                      {invalid && !inputFields[0].FullName && (
                                        <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                          Full Name is required
                                        </div>
                                      )}
                                    </Row>
                                  </div>
                                );
                              })}
                            </Form>
                          </div>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-landmark"></i>
                              <Form.Select
                                className="purpleBorder form-input"
                                name="UBankId"
                                value={
                                  step2UpdateSendMoneyvalue.UBankId != ""
                                    ? step2UpdateSendMoneyvalue.UBankId
                                    : UpdateUserData.bankId
                                }
                                id="select1"
                                onChange={handleUpdateRecieverValue}
                              >
                                <option value="">Bank Name</option>
                                {UBanks &&
                                  UBanks.map((Bank, Index) => {
                                    return (
                                      <option value={Bank.id}>
                                        {Bank.text}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              <label for="name" className="form-label1">
                                Bank Name
                              </label>
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-landmark"></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Bank Account Number"
                                name="UBankAccountNumber"
                                className="formControlStep2 reflink link form-input"
                                defaultValue={UpdateUserData.bankAccNo}
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Bank Account Number
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Bank Account Number
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <div
                            className={`${
                              FirstStepData.recevingCountryId === 101
                                ? "d-block"
                                : "d-none"
                            }`}
                          >
                            <div className=" d-flex align-items-center my-3">
                              <div className="radio">
                                <input
                                  type="radio"
                                  name="UIFSC"
                                  value="IFSC"
                                  id="UIFSC"
                                  onChange={UchangeHandler}
                                  checked={Uselected === "IFSC"}
                                />
                                <label
                                  htmlFor="UIFSC"
                                  className="radio-label text-black mb-0 d-flex align-items-center"
                                >
                                  I have IFSC Code
                                </label>
                              </div>

                              <div className="radio ms-3">
                                <input
                                  type="radio"
                                  value="NoIFSC"
                                  id="UNoIFSC"
                                  name="gender"
                                  onChange={UchangeHandler}
                                  checked={Uselected === "NoIFSC"}
                                />
                                <label
                                  htmlFor="UNoIFSC"
                                  className="radio-label text-black mb-0 d-flex align-items-center"
                                >
                                  I don’t have IFSC Code
                                </label>
                              </div>
                            </div>

                            <div
                              // id="female1"
                              className={`${
                                Uselected === "IFSC" ? "d-none" : "d-block"
                              }`}
                              // aria-hidden={selected !== "female" ? true : false}
                            >
                              <Row
                                className=""
                                aria-hidden={selected !== "male" ? true : false}
                              >
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Select
                                    className="purpleBorder form-input"
                                    // defaultValue="Individual"
                                    id="select1"
                                    name="UBankState"
                                    defaultValue={UpdateUserData.bankStateId}
                                    onChange={handleUpdateRecieverValue}
                                  >
                                    {/* <option value="Registered">Registered as Business</option> */}
                                    <option value="">State</option>
                                    {getState &&
                                      getState.map((state, Index) => {
                                        return (
                                          <option value={state.id} key={Index}>
                                            {state.name}
                                          </option>
                                        );
                                      })}
                                  </Form.Select>
                                  <label for="name" className="form-label1">
                                    Bank State
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Control
                                    className="purpleBorder form-input"
                                    // defaultValue="Individual"
                                    placeholder="District"
                                    name="UDistrict"
                                    defaultValue={UpdateUserData.district}
                                    onChange={handleUpdateRecieverValue}
                                  ></Form.Control>
                                  <label for="name" className="form-label1">
                                    Bank District
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Control
                                    className="purpleBorder form-input"
                                    // defaultValue="Individual"
                                    name="UBranch"
                                    placeholder="Branch"
                                    id="select1"
                                    defaultValue={UpdateUserData.bankBranch}
                                    onChange={handleUpdateRecieverValue}
                                  >
                                    {/* <option value="Registered">Registered as Business</option> */}
                                    {/* <option value="Individual">Branch</option>
                                    <option value="Business">Business</option>
                                    <option value="Agent">Agent</option> */}
                                  </Form.Control>
                                  <label for="name" className="form-label1">
                                    Bank Branch
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>
                            </div>

                            <div
                              // id="male1"
                              className={`${
                                Uselected === "NoIFSC" ? "d-none" : "d-block"
                              }`}

                              // aria-hidden={selected !== "male" ? true : false}
                            >
                              <Row
                                className=""
                                aria-hidden={
                                  selected !== "female" ? true : false
                                }
                              >
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container required text-start"
                                >
                                  <i className="purpleText mainStep4 fas fa-landmark"></i>
                                  <Form.Control
                                    type="text"
                                    required
                                    placeholder="IFSC Code (if India) / Routing Number (in USA)/ BSB (in AUS)"
                                    name="UIFSC_Code"
                                    className="formControlStep2 reflink link form-input"
                                    defaultValue={UpdateUserData.ifscCode}
                                    onChange={handleUpdateRecieverValue}
                                  />
                                  <label for="name" className="form-label1">
                                    IFSC Code (if India) / Routing Number (in
                                    USA)/ BSB (in AUS)
                                  </label>
                                  <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    IFSC Code (if India) / Routing Number (in
                                    USA)/ BSB (in AUS)
                                  </div>

                                  {/* {errors.name && <p>{errors.name}</p>} */}
                                </Form.Group>
                              </Row>
                            </div>
                          </div>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamicU == "Wallet Deposit" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="First Name"
                                name="UIndidual_Firstname"
                                defaultValue={UpdateUserData.firstName}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                First Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                First Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Middle Name"
                                defaultValue={UpdateUserData.middleName}
                                name="UIndidual_Middlename"
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Middle Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Middle Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Last Name"
                                defaultValue={UpdateUserData.lastName}
                                name="UIndidual_Lastname"
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Last Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Last Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row>
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-wallet"></i>
                              <Form.Select
                                className="purpleBorder form-input"
                                // defaultValue={UpdateUserData.bankId}
                                id="select1"
                                name="UwalletName"
                                value={
                                  step2UpdateSendMoneyvalue.UwalletName != ""
                                    ? step2UpdateSendMoneyvalue.UwalletName
                                    : UpdateUserData.bankId
                                }
                                onChange={(e) => {handleUpdateRecieverValue(e); handleUpdateWalletname(e)}}
                              >
                                <option value="">Wallet name</option>
                                {UBanks &&
                                  UBanks.map((Bank, Index) => {
                                    return (
                                      <option value={Bank.id}>
                                        {Bank.text}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              {/* <Form.Control
                                  type="text"
                                  required
                                  placeholder="Wallet Name"
                                  name="UwalletName"
                                  defaultValue={UpdateUserData.walletName}
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleUpdateRecieverValue}
                                /> */}
                              <label for="name" className="form-label1">
                                Wallet Name
                              </label>

                              {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fas fa-wallet "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Wallet Account no. "
                                name="UwalletNo"
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                                defaultValue={UpdateUserData.walletNo}
                              />
                              <label for="name" className="form-label1">
                                Wallet Account Number
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Wallet Account no.
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamicU == "Cash Pickup" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="First Name"
                                name="UIndidual_Firstname"
                                defaultValue={UpdateUserData.firstName}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                First Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                First Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Middle Name"
                                defaultValue={UpdateUserData.middleName}
                                name="UIndidual_Middlename"
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Middle Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Middle Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Last Name"
                                defaultValue={UpdateUserData.lastName}
                                name="UIndidual_Lastname"
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Last Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Last Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                </>
              ) : (
                ""
              )}
            </Modal.Body>
          </Row>

          <Row>
            <Modal.Body className="mainss">
              <>
                <Row>
                  <Col className="col-lg-12  text-center">
                    <label className="text-black text-center mb-0">
                      Contact Details
                    </label>
                    <Form>
                      <Form
                        className="mt-3 sendMoneyPaddingForm"
                        id="Signup_Step1"
                      >
                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? "d-none"
                              : "d-block"
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-map-marker "></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Address"
                              name="UAddress"
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.address}
                              onChange={handleUpdateRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Address
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Address
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row className="">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-map-marker "></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="City/District"
                              name="UCity"
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.city}
                              onChange={handleUpdateRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              City/District
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              City/District
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? "d-none"
                              : "d-block"
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container text-start"
                          >
                            <i className="purpleText mainStep4 fa fa-map-marker"></i>
                            <Form.Select
                              className="purpleBorder form-input"
                              // defaultValue="Individual"
                              id="select1"
                              value={UpdateUserData.stateId}
                              name="UState"
                              onChange={handleUpdateRecieverValue}
                            >
                              {/* <option value="Registered">Registered as Business</option> */}
                              <option value="">State</option>
                              {getState &&
                                getState.map((state, Index) => {
                                  return (
                                    <option value={state.id} key={Index}>
                                      {state.name}
                                    </option>
                                  );
                                })}
                            </Form.Select>
                            <label for="name" className="form-label1">
                              State
                            </label>
                            {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                          </Form.Group>
                        </Row>

                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? "d-none"
                              : "d-block"
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-map-marker"></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Postal Code"
                              name="UPostalCode"
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.postalCode}
                              onChange={handleUpdateRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Postal Code
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Postal Code
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row className="">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-mobile"></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Mobile"
                              name="UMobile"
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.phone}
                              onChange={handleUpdateRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Mobile
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Mobile
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? "d-none"
                              : "d-block"
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-mobile"></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Email"
                              name="UEmail"
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.email}
                              onChange={handleUpdateRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Email
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Mobile
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row className="">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-user"></i>
                            <Form.Select
                              className="purpleBorder form-input"
                              defaultValue={UpdateUserData.relationId}
                              name="URelation"
                              id="select1"
                              onChange={handleUpdateRecieverValue}
                            >
                              <option value="">Relation</option>
                              {adminRelation &&
                                adminRelation.map((Relations, index) => {
                                  return (
                                    <option key={index} value={Relations.id}>
                                      {Relations.name}
                                    </option>
                                  );
                                })}
                            </Form.Select>
                            <label for="name" className="form-label1">
                              Relation
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Relation
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>
                      </Form>
                    </Form>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-lg-12">
                    <Button
                      className="mt-0 my-1 mb-4 col-lg-3 d-block m-auto nextBtn1"
                      onClick={
                        UpdateUserData.type === "individual"
                          ? UpdateindividualReciever
                          : UpdateUserData.type === "business"
                          ? UpdateBusinessReciever
                          : UpdateJointReciever
                        // : UpdateUserData.type === "joint"
                        // ? UpdateJointReciever
                        // : handleShowRec6
                      } //handleShowRec6}
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </>
            </Modal.Body>
          </Row>
        </Modal>
        {/* /////////Update Reciver Details end/////// */}

        {/* //////////////////Delete Reciption popup///////////////// */}
        <Modal
          centered
          show={Deletereciptionpopup}
          onHide={(e) => {
            setDeletereciptionpopup(false);
          }}
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Alert</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <p className="text-black fs-5">
              Are you sure you want to delete recipient? Deleting recipient is
              irreversible. No recovery possible.
            </p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-end ms-auto">
            <Button
              className="mt-2 w-auto px-5 d-block m-auto nextBtn1 me-3"
              variant="primary"
              onClick={(e) => {
                handleRecieverdelete(e);
              }}
            >
              Yes
            </Button>
            <Button
              className="mt-2 w-auto px-5 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setDeletereciptionpopup(false);
              }}
            >
              No
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          centered
          show={ExistUserWithMwthod}
          onHide={(e) => {
            setExistUserWithMwthod(false);
          }}
          size="sm"
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Alert</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <p className="text-black ">
              Recipients already exists with same delivery method and account
              number!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setExistUserWithMwthod(false);
              }}
            >
              Ok
            </Button>
            {/* <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setDeletereciptionpopup(false);
              }}
            >
              No
            </Button> */}
          </Modal.Footer>
        </Modal>

        <Modal
          centered
          show={ExistUserWithsameMethod}
          onHide={(e) => {
            setExistUserWithsameMethod(false);
          }}
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Alert</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <p className="text-black ">
              Your selected recipient delivery method is {getAllDeliveryMethod.find((item)=>item.id == (selectedRecipentD_Method?selectedRecipentD_Method:ReceiverInfo[0]?.deliveryMethodId))?.name} for delivery. are you sure you change your {getAllDeliveryMethod.find((item)=>item.id === FirstStepData.deliveryMethodId)?.name} method to switch to {getAllDeliveryMethod.find((item)=>item.id == (selectedRecipentD_Method?selectedRecipentD_Method:ReceiverInfo[0]?.deliveryMethodId))?.name} method.
            </p>
          </Modal.Body>
          <Modal.Footer>

          <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setExistUserWithsameMethod(false);
              }}
            >
              No
            </Button>

            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                AddTransactionDetils(e);
              }}
            >
              Yes
            </Button>
            {/* <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setDeletereciptionpopup(false);
              }}
            >
              No
            </Button> */}
          </Modal.Footer>
        </Modal>

        {/* //////////////////////////////////////////////


//////////////////////////////////////////////// */}

        {/* //delivery method // * */}

        <Modal show={show} onHide={handleCloseDelivery} size="lg">
          <Modal.Body className="modal-money-payment">
            {ActiveDeliveryMethods &&
              ActiveDeliveryMethods.map((DeliveryMethod, index) => {
                if(DeliveryMethod?.enabled === true){
                return (
                  <div key={index}>
                    <div
                      className={`cardActivePurple ${
                        DeliveryID == DeliveryMethod?.id ? "cardActiveSendMoney" : ""
                      }`}
                    >
                      <div
                        className="innerCardActive py-3 my-3"
                        onClick={(e) => {
                          handleDeliverymethod(
                            e,
                            index,
                            DeliveryMethod.name,
                            (FirstStepData && FirstStepData?.amount
                              ? FirstStepData?.amount
                              : location.state &&
                                location.state?.TransactionData
                              ? location.state?.TransactionData?.amount
                              : 0) !== 0
                              ? DeliveryLowerUpper.filter(
                                  (val) => val.name === DeliveryMethod.name
                                ).map((val) =>
                                  val.serviceCharge >= 0 ? val.serviceCharge : 0
                                )
                              : FirstStepData && FirstStepData?.amount
                              ? FirstStepData?.amount
                              : location.state &&
                                location.state?.TransactionData
                              ? location.state?.TransactionData?.amount
                              : 0,
                            DeliveryMethod.id
                          );
                          handleSetDropdownValue(
                            <>
                              <img
                                src={
                                  CommonConstants.BASE_URL +
                                  DeliveryMethod.logo
                                }
                                width="50"
                                alt=""
                                height="50"
                                className="img-fluid"
                              />
                              <div className="d-flex flex-column ms-4">
                                <div className="mainD responsiveFontLarge">
                                  Delivery Method
                                </div>
                                <div className="text-black text-start bolder  ">
                                  {DeliveryMethod.name}
                                </div>
                              </div>
                              <img
                                src={drpa}
                                alt=""
                                className="img-fluid mt-4 ms-4"
                              />
                            </>,
                            DeliveryMethod.name,
                            DeliveryMethod.id
                          )
                          setdeliveryName(DeliveryMethod?.name)
                          handleCloseDelivery(e)
                          setIsVisibleDynamic(DeliveryMethod?.name)
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start pe-3 ps-3">
                          <div className="">
                            <div className="d-flex align-items-center">
                              <img
                                src={
                                  CommonConstants.BASE_URL + DeliveryMethod.logo
                                }
                                className="img-fluid getLogoSize"
                                alt=""
                              />
                              <div className="responsiveFontLarge text-black bolder ms-4 d-flex align-items-center">
                                {DeliveryMethod.name}
                                <div className="tooltip-container">
                                  <img
                                    src={info}
                                    className="tooltip-button img-fluid ms-2"
                                    alt=""
                                  />
                                  <div className="tooltip-content">
                                    {/* {getTooltipContent(DeliveryMethod.name)} */}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <br></br>
                            <div className="d-flex flex-column excLeft">
                              <div className="d-flex pb-2 justify-content-between">
                                <div className="textGray bolder responsiveFontLarge">
                                  Exhange rate :
                                </div>{" "}
                                &nbsp;
                                <div className="textGray bolder responsiveFontLarge">
                                  {"1"}{" "}
                                  {FirstStepData?.SendingCurrancy != undefined
                                    ? FirstStepData?.SendingCurrancy
                                    : location.state &&
                                      location.state?.TransactionData
                                        ?.sendingCurrencyCode}{" "}
                                  =
                                  {FirstStepData?.exchangeRate != undefined
                                    ? FirstStepData?.exchangeRate
                                    : location.state &&
                                      location.state?.TransactionData
                                        ?.exchangeRate}{" "}
                                  {FirstStepData?.RecivingCurrancy != undefined
                                    ? FirstStepData?.RecivingCurrancy
                                    : location.state &&
                                      location.state?.TransactionData
                                        ?.recevingCurrencyCode}{" "}
                                </div>
                              </div>
                              <div className="d-flex pb-2 justify-content-between">
                                <div className="text-black bolder responsiveFontLarge">
                                  Total Receivable :
                                </div>{" "}
                                <div className="text-black bolder responsiveFontLarge">
                                  {Number((
                                    FirstStepData?.receivingAmount != undefined
                                      ? FirstStepData?.receivingAmount
                                      : location.state &&
                                          location.state?.TransactionData
                                            ?.receivingAmount
                                  )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                  // ).toFixed(2)
                                }{" "}
                                  {FirstStepData?.RecivingCurrancy != undefined
                                    ? FirstStepData?.RecivingCurrancy
                                    : location.state &&
                                      location.state?.TransactionData
                                        ?.recevingCurrencyCode}{" "}
                                </div>
                              </div>
                              <div className="d-flex pb-2 justify-content-between">
                                <div className="text-black bolder responsiveFontLarge">
                                  Total Service Charge :
                                </div>{" "}
                                <div className="text-black bolder responsiveFontLarge">
                                  {(FirstStepData && FirstStepData?.amount
                                    ? FirstStepData?.amount
                                    : location.state &&
                                      location.state?.TransactionData
                                    ? location.state?.TransactionData?.amount
                                    : 0) !== 0
                                    ? !PaymentRate
                                      ? DeliveryLowerUpper.filter(
                                          (val) =>
                                            val.name === DeliveryMethod.name
                                        ).map((val) =>
                                          val.serviceCharge >= 0
                                            ? Number((
                                                Number(val.serviceCharge) +
                                                DeafultPSC
                                              )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                              // ).toFixed(2)
                                            : 0
                                        )
                                      : DeliveryLowerUpper.filter(
                                          (val) =>
                                            val.name === DeliveryMethod.name
                                        ).map((val) =>
                                          val.serviceCharge >= 0
                                            ? Number((
                                                Number(val.serviceCharge) +
                                                PaymentRate
                                              )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                              // ).toFixed(2)
                                            : 0
                                        )
                                    : FirstStepData && FirstStepData?.amount
                                    ? FirstStepData?.amount
                                    : location.state &&
                                      location.state?.TransactionData
                                    ? location.state?.TransactionData?.amount
                                    : 0}{" "}

                                  {/* {!DileveryRate && !PaymentRate ? DefaultDSC + DeafultPSC : DileveryRate && !PaymentRate ? DileveryRate + DeafultPSC : !DileveryRate && PaymentRate ? DefaultDSC + PaymentRate :DileveryRate + PaymentRate} */}
                                  {FirstStepData?.SendingCurrancy != undefined
                                    ? FirstStepData?.SendingCurrancy
                                    : location.state &&
                                      location.state?.TransactionData
                                        ?.sendingCurrencyCode}
                                </div>
                              </div>
                              <div className="d-flex pb-2 justify-content-between">
                                <div className="text-black bolder responsiveFontLarge">
                                  Total Payable :
                                </div>{" "}
                                <div className="text-black bolder responsiveFontLarge">
                                  {(FirstStepData?.amount != undefined
                                    ? FirstStepData?.amount
                                    : location.state &&
                                      location.state?.TransactionData
                                        ?.amount) !== 0
                                    ? !PaymentRate
                                      ? DeliveryLowerUpper.filter(
                                          (val) =>
                                            val.name === DeliveryMethod.name
                                        ).map((val) =>
                                          val.serviceCharge >= 0
                                            ? (
                                                Number(val.serviceCharge) +
                                                DeafultPSC +
                                                parseFloat((
                                                  FirstStepData &&
                                                    FirstStepData?.amount
                                                    ? FirstStepData?.amount
                                                    : location.state &&
                                                      location.state
                                                        ?.TransactionData
                                                    ? location.state
                                                        ?.TransactionData
                                                        ?.amount
                                                    : 0
                                                )
                                              )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                              // ).toFixed(2)
                                            : 0
                                        )
                                      : DeliveryLowerUpper.filter(
                                          (val) =>
                                            val.name === DeliveryMethod.name
                                        ).map((val) =>
                                          val.serviceCharge >= 0
                                            ? (
                                                Number(val.serviceCharge) +
                                                PaymentRate +
                                                parseFloat((
                                                  FirstStepData &&
                                                    FirstStepData?.amount
                                                    ? FirstStepData?.amount
                                                    : location.state &&
                                                      location.state
                                                        ?.TransactionData
                                                    ? location.state
                                                        ?.TransactionData
                                                        ?.amount
                                                    : 0
                                                )
                                              )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                              // ).toFixed(2)
                                            : 0
                                        )
                                    : FirstStepData && FirstStepData?.amount
                                    ? FirstStepData?.amount
                                    : location.state &&
                                      location.state?.TransactionData
                                    ? location.state?.TransactionData?.amount
                                    : 0}{" "}
                                  {/* {!DileveryRate && !PaymentRate ? DefaultDSC + DeafultPSC : DileveryRate && !PaymentRate ? DileveryRate + DeafultPSC : !DileveryRate && PaymentRate ? DefaultDSC + PaymentRate :DileveryRate + PaymentRate} */}
                                  {FirstStepData?.SendingCurrancy != undefined
                                    ? FirstStepData?.SendingCurrancy
                                    : location.state &&
                                      location.state?.TransactionData
                                        ?.sendingCurrencyCode}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`tick ${
                              DeliveryID == DeliveryMethod?.id ? "d-block" : "d-none"
                            }`}
                          >
                            <img src={tickIcon} className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="py-1 pe-2 ps-2"></hr>
                  </div>
                );
              }
              })}
          </Modal.Body>
          {/* <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={handleCloseDelivery}
            >
              Select
            </Button>
          </Modal.Footer> */}
        </Modal>

        <Modal
          centered
          show={RequestChangetoadmin}
          onHide={(e) => {
            setRequestChangetoadmin(false);
          }}
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Note</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <p className="text-black ">
            Your request has been submitted to the admin. They will now proceed with your request
            </p>
          </Modal.Body>
          <Modal.Footer>
          <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setRequestChangetoadmin(false);
              }}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ////////////////////// */}
      </section>
    </>
  );
}
