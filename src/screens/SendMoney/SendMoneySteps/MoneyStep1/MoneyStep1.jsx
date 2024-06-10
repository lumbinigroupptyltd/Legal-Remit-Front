import React, { useState, useEffect, useContext } from "react";
import "./MoneyStep1.scss";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import info from "../../../../assets/images/info11.svg";
import gift from "../../../../assets/images/ph_gift-bold.svg";
import timer from "../../../../assets/images/timer.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tooltip from "@mui/material/Tooltip";
import card from "../../../../assets/images/debitCard.svg";
import tickIcon from "../../../../assets/images/mdi_tick-circle-outline.svg";
import userContext from "../../../Auth/Signup/Signupdata/Usecontext";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import { CommonConstants } from "../../../../Constants/common.constants";
import Loader from "../../../Loader/Loader";
import UploadBusinessAndAgentDocument from "../../../Helpers/ReVerifyIDDocument/UploadBusinessAndAgentDocument";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { RemoveCircle } from '@mui/icons-material';


export default function MoneyStep1({
  props,
  handleid,
  backDisplay,
  RecieverCountryId,
  sendingMoney,
  DileveryCharge,
  PaymentmethodName,
  activeStep,
  handleShowVerifys,
  FirstStepdata,
  TransactionIDUpdate,
  Default_Delivery_id,
  setExchangerate,
  setServiceCharge,
  PromoCodeVerify,
  HandleChangeDelivery,
  PremiumEXRateValue,
  Moneychange
}) {
  const location = useLocation();
  const StateData = location?.state;
  // const CountinueTransaction = location?.state
  const [countries, setCountries] = useState([]);
  const [countries1, setCountries1] = useState([]);
  const [alert, setAlert] = useState(false);
  const [flagSelect, setFlags] = useState(0);
  const [flagSelect1, setFlags1] = useState([]);
  const [flagSelect1FlagList, setflagSelect1FlagList] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShowDelivery] = useState(false);
  const [Removebtn, setRemovebtn] = useState(0);
  const [PreviousExchangeRate, setPreviousExchangeRate] = useState(0);
  // exchange rate states
  const [fromCountry, setfromCountry] = useState(1);
  const [toCountry, settoCountry] = useState(0);
  const [sendMoney, setsendMoney] = useState(
    location.state && location.state.TransactionData != undefined
      ? location.state && location.state?.TransactionData?.amount
      : location.state && location.state?.HomeScreenData != undefined
      ? location.state && location.state?.HomeScreenData?.amount
      : 100
  );
  const [receiveMoney, setreceiveMoney] = useState();
  const [UserDetails, setUserDetails] = useState();
  const [usedcasebalanceflag, setusedcasebalanceflag] = useState(false);
  const [usedcasebalance, setusedcasebalance] = useState(0);
  const [UserUsedCaseBalance, setUserUsedCaseBalance] = useState(0);

  const handleCloseDelivery = () => setShowDelivery(false);
  const handleShowDelivery = () => {
    if (!DeliveryID) {
      const index = ActiveDeliveryMethods.find(
        (item) => item.name === defaultDeliveryMethod
      );
      setDeliveryID(index.id);
    }
    setShowDelivery(true);
  };

  const [show1, setShowPayment] = useState(false);

  const handleClosePayment = () => setShowPayment(false);
  const handleShowPayment = () => {
    if (!PaymentID) {
      const index = ActivePaymentMethods.findIndex(
        (item) => item.name === defaultPaymentMethod
      );
      setPaymentID(index);
    }
    setShowPayment(true);
  };

  const [show2, setShowVerify] = useState(false);

  const handleCloseVerify = () => setShowVerify(false);
  const handleShowVerify = () => setShowVerify(true);
  const [loadervalue, setloadervalue] = useState(false);

  const [BankDepositevalue, setBankDepositevalue] = useState(false);
  const [WalletDepositvalue, setWalletDepositvalue] = useState(false);
  const [CashPickupvalue, setCashPickupvalue] = useState(false);
  const [RecievercountryId, setRecievercountryId] = useState();
  const [TotalRate, setTotalRate] = useState();
  const [PaymentRate, setPaymentRate] = useState(0);
  const [DileveryRate, setDileveryRate] = useState(0);
  const [ID, setId] = useState(14);
  const [Id2, setId2] = useState(154);
  const [PaymentLowerUpper, setPaymentLowerUpper] = useState([]);
  const [NullValuePresentMessage, setNullValuePresentMessage] = useState("");
  const [MaxSendAmount, setMaxSendAmount] = useState(0);
  const [MinSendAmount, setMinSendAmount] = useState(0);
  const [NullValuePopUp, setNullValuePopUp] = useState(false);
  const [DuplicateUserPopUp, setDuplicateUserPopUp] = useState(false);
  const [DeliveryLowerUpper, setDeliveryLowerUpper] = useState([]);
  const [DefaultServiceCharge, setDefaultServiceCharge] = useState([]);
  const [DefaultDSC, setDefaultDSC] = useState(0);
  const [Def_D_Flag, setDef_D_Flag] = useState(0);
  const [DeafultPSC, setDeafultPSC] = useState(0);
  const [ActivePaymentMethods, setActivePaymentMethods] = useState([]);
  // console.log(ActivePaymentMethods,"ActivePaymentMethods")
  const [ActiveDeliveryMethods, setActiveDeliveryMethods] = useState([]);
  const [estimateTimes, setEstimateTimes] = useState();
  const [defaultDeliveryMethod, setDefaultDeliveryMethod] = useState("");
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState("");
  const [fromCountryidvalue, setfromCountryidvalue] = useState();
  const [toCountryidvalue, settoCountryidvalue] = useState();
  const [focus, setFocus] = useState(false);
  const [counter, setCounter] = useState(420);
  const [UserData, setUserData] = useState();
  const [ActiveDeliveryMethodsId, setActiveDeliveryMethodsId] = useState();
  const [step1value, setstep1value] = useState({
    SMfromCountry: "",
    SMCountry: "",
  });
  const [Promocode, setPromocode] = useState("");
  const [showAdditionalIdUpdate, setshowAdditionalIdUpdate] = useState(false);
  const [showDocumentUplodedPopup, setshowDocumentUplodedPopup] =
    useState(false);
  const [IdDocument_Id, setIdDocument_Id] = useState();
  const [DocumentMessage, setDocumentMessage] = useState("");
  const handleCloseAdditionalIDVerify = () => setshowAdditionalIdUpdate(false);
  const handleShowAdditionalIDVerify = () => setshowAdditionalIdUpdate(true);
  const [VerifyRefralPOPUP, setVerifyRefralPOPUP] = useState(false);
  const [VerifyOtherDocument, setVerifyOtherDocument] = useState(false);
  const [VerifyKYCDocument, setVerifyKYCDocument] = useState(false);
  const [PremiumExchangerate, setPremiumExchangerate] = useState(0);
  const [PremiumExchangerateId, setPremiumExchangerateId] = useState(0);
  const [PremiumExchangerateAmount, setPremiumExchangerateAmount] = useState(0);
  const [InputPromoCodeValue, setInputPromoCodeValue] = useState("");
  const [maxSendingAmountPopUp, setmaxSendingAmountPopUp] = useState(false);
  const [maxSendingAmount, setmaxSendingAmount] = useState(false);

  const handledocumentId = (e) => {
    setIdDocument_Id(e.target.value);
  };

  const [Idtypes, setIdtypes] = useState([]);
  const GetIdTypeByCountryId = async (values) => {
    try {
      const IdData = {
        countryId: values,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getactiveidtypebycountryid",
        IdData
      );
      if (response.data.status === true) {
        setIdtypes(response.data.data);
        setIdDocument_Id(response.data.data[0].id);
      }
    } catch (err) {
      // console.log(err)
    }
  };

  const handleCopyClick = () => {
    const tempInput = document.createElement("input");
    tempInput.value = "0419850130";
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  const handleCopyClick2 = () => {
    const tempInput = document.createElement("input");
    tempInput.value = "info@legalremit.com";
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    const mailtoLink = `mailto:info@legalremit.com`;
    window.location.href = mailtoLink;
  };

  const handlechangeusedcasebalance = () => {
    setusedcasebalanceflag(!usedcasebalanceflag);
  };

  const GetUsedDetails = async () => {
    try {
      axios
        .post(CommonConstants.BASE_URL + "/getuserinfobyid", {
          id: localStorage.getItem("Id"),
        })
        .then((respo) => {
          setUserDetails(respo.data.data);
          GetUsedBalance(
            respo.data?.data?.id,
            respo.data?.data?.countryId,
            sendMoney == "" ? 0 : sendMoney
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      // console.log(err)
    }
  };

  const GetUsedBalance = async (Id, Countryid, Moneysend) => {
    try {
      const formData = new FormData();
      formData.append("userId", Id);
      formData.append("countryId", Countryid);
      formData.append("amount", Moneysend);

      const config = {
        method: "POST",
        url: CommonConstants.BASE_URL + "/getusedcashbalance",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios(config)
        .then(function (response) {
          if (
            response.data.status === true &&
            response.data.statuscode == 200
          ) {
            if (response.data.data != null) {
              if (response.data?.data <= Moneysend) {
                setusedcasebalance(response.data?.data);
                if (response.data?.data == 0) {
                  setusedcasebalanceflag(false);
                }
                setUserUsedCaseBalance(response.data?.data);
              } else {
                setusedcasebalance(Moneysend);
                if (response.data?.data == 0) {
                  setusedcasebalanceflag(false);
                }
                setUserUsedCaseBalance(Moneysend);
              }
            } else {
              setusedcasebalance(0);
              setusedcasebalanceflag(false);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      // console.log(err)
    }
  };

  const handleInputPromocode = (e) => {
    const TragetValue = e.target.value;

    if (TragetValue) {
      const InputValue = TragetValue.replace(/[^a-zA-Z0-9]/g, "");
      const CapitalizeValue = InputValue.toUpperCase();
      setInputPromoCodeValue(CapitalizeValue);
    } else {
      setInputPromoCodeValue("");
    }
  };

  const ApplyPromocode = (e) => {
    const Promo = PromoCodeDetails.find(
      (item) => item.promoCode == InputPromoCodeValue
    );
    if (Promo == undefined) {
      setInputPromoCodeValue("");
      const formData = new FormData();
      formData.append("userId", localStorage.getItem("Id"));
      formData.append("promocode", InputPromoCodeValue);

      const config = {
        method: "POST",
        url: CommonConstants.BASE_URL + "/checkpromocodesexistornotforuser",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios(config)
        .then(function (response) {
          // setPromoCodeDetails(response.data.data);
          // setAppliedPromoCode(response.data.data)
          if (response.data.data != null && response.data.status === true) {
            var PromoInput = response.data.data;
            handleSelectPromo(
              PromoInput?.id,
              PromoInput?.deliveryMethod,
              PromoInput?.paymentMethod,
              PromoInput?.benifitsOnCash,
              PromoInput?.minSendingAmt,
              PromoInput?.minAmount,
              PromoInput?.maxAmount,
              PromoInput?.minExchangeRate,
              PromoInput?.maxExchangeRate,
              PromoInput?.minServiceCharge,
              PromoInput?.maxServiceCharge,
              PromoInput?.points,
              PromoInput?.exDiscount,
              PromoInput?.seDiscount,
              PromoInput?.promoCode
            );
            setInputPromoCodeValue("");
            setAppliedPromoCode(PromoInput);
          } else {
            // setPromo_Success_Message("Promocode does not exist!");
            // setPromo_Success_Popup(true);
            setPromo_Error_Message("Promocode does not exist!");
            setPromo_Error_Popup(true);
            setModalShow(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      handleSelectPromo(
        Promo?.id,
        Promo?.deliveryMethod,
        Promo?.paymentMethod,
        Promo?.benifitsOnCash,
        Promo?.minSendingAmt,
        Promo?.minAmount,
        Promo?.maxAmount,
        Promo?.minExchangeRate,
        Promo?.maxExchangeRate,
        Promo?.minServiceCharge,
        Promo?.maxServiceCharge,
        Promo?.points,
        Promo?.exDiscount,
        Promo?.seDiscount,
        Promo?.promoCode
      );
      setInputPromoCodeValue("");
      setAppliedPromoCode(Promo);
    }
  };

  const handlesc = () => {
    // debugger
    // TotalRate == 0
    //   ? Number(DeafultPSC + DefaultDSC).toFixed(2)
    //   : DeafultPSC == 0 && DefaultDSC != 0
    //     ? Number(DefaultDSC + PaymentRate).toFixed(2)
    //     : DefaultDSC == 0 && DeafultPSC != 0 && Def_D_Flag == 1
    //       ? Number(DeafultPSC + DileveryRate).toFixed(2)
    //       : Number(TotalRate).toFixed(2)
  };

  const handlecloseDocumentUplodedVerify = () => {
    setshowDocumentUplodedPopup(false);
  };
  const handleshowDocumentUplodedVerify = () => {
    setshowDocumentUplodedPopup(true);
    handleCloseAdditionalIDVerify();
  };
  const [ID_Images, setID_Images] = useState([]);
  const [AdditionalImage, setAdditionalImage] = useState([]);

  const imageData = (imagee, image2) => {
    setID_Images(imagee.concat(image2));
  };

  const HandleAdditionalDocument = (imagee) => {
    setAdditionalImage(imagee);
  };

  const handleBUpdateDocument = async () => {
    var GetData = {
      id: localStorage.getItem("Id"),
    };

    const UserInfo = await axios.post(
      CommonConstants.BASE_URL + "/getuserinfobyid",
      GetData
    );

    if (UserInfo.data.status === true) {
      if (IdDocument_Id !== undefined) {
        setloadervalue(true);

        if (VerifyKYCDocument === true) {
          const formData = new FormData();

          formData.append(
            "user",
            `{
              "id":${UserInfo.data.data.id},
              "roleId":${UserInfo.data.data.roleId},
              "countryId":${UserInfo.data.data.countryId},
              "refCodeId":"${UserInfo.data.data.refCodeId}",
              "fName":"${UserInfo.data.data.fName}",
              "mName":"${UserInfo.data.data.mName}",
              "lName":"${UserInfo.data.data.lName}",
              "businessName":"${UserInfo.data.data.businessName}",
              "regNo":"${UserInfo.data.data.regNo}",
              "businessAddress":"${UserInfo.data.data.businessAddress}",
              "customerId":"${UserInfo.data.data.customerId}",
              "phone":"${UserInfo.data.data.phone}",
              "phoneCode":"${UserInfo.data.data.phoneCode}",
              "isPhoneVerified":${UserInfo.data.data.isPhoneVerified},
              "isDigital":${UserInfo.data.data.isDigital},
              "phoneVerifiedAt":"",
              "isEmailVerified":0,
              "emailVerifiedAt":"",
              "isDeleted":false,
              "isOCRVerfiedId":0,
              "email":"${UserInfo.data.data.email}",
              "digitalVerifiedLink": "${UserInfo.data.data.digitalVerifiedLink}",
              "digitalVerifiedTransactionId": "${UserInfo.data.data.digitalVerifiedTransactionId}",
              "isSignupCompleted" : ${UserInfo.data.data.isSignupCompleted} 
              }`
          );

          formData.append(
            "kycdetails",
            `{
              "id":${UserInfo.data.data.userkycdetails.id},
              "userId":${UserInfo.data.data.id},
              "streetName":"${UserInfo.data.data.userkycdetails.streetName}",
              "countryId": ${UserInfo.data.data.userkycdetails.countryId} ,
              "stateId":${UserInfo.data.data.userkycdetails.stateId},
              "nationality":"${UserInfo.data.data.userkycdetails.nationality}",
              "suburb":"${UserInfo.data.data.userkycdetails.suburb}",
              "postalCode":"${UserInfo.data.data.userkycdetails.postalCode}",
              "occupationId":${UserInfo.data.data.userkycdetails.occupationId},
              "isResidence": ${UserInfo.data.data.userkycdetails.isResidence},
              "kycStatus":""
            }`
          );

          formData.append(
            "iddetails",
            `{
              "id":${UserInfo.data.data.iddetails.id},
              "userId":${UserInfo.data.data.id},
              "typeId":"${UserInfo.data.data.iddetails.typeId}",
              "documentNumber":"${UserInfo.data.data.iddetails.documentNumber}",
              "cardNumber":"${UserInfo.data.data.iddetails.cardNumber}",
              "dob":"${UserInfo.data.data.iddetails.dob}",
              "documentValidity":"${UserInfo.data.data.iddetails.documentValidity}",
              "issuingAuthority":"${UserInfo.data.data.iddetails.issuingAuthority}"
            }`
          );

          for (let i = 0; i < ID_Images.length; i++) {
            formData.append("document", ID_Images[i]);
          }

          const config = {
            method: "POST",
            url: CommonConstants.BASE_URL + "/updateuserinfo",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
          };

          axios(config)
            .then(function (response) {
              if (response.data.status == true) {
                setDocumentMessage(response.data.message);
                // handleshowDocumentUplodedVerify();
                setshowAdditionalIdUpdate(false);
                if (VerifyOtherDocument === true) {
                  const documentsWithImages = AdditionalImage.filter(
                    (doc) => doc.ImageArray.length > 0
                  );
                  if (documentsWithImages.length >= 2) {
                    AdditionalImage.map((Item) => {
                      if (Item.ImageArray.length > 0) {
                        const formDataa = new FormData();

                        if (Item.typeName == "Other Documents") {
                          formDataa.append(
                            "userId",
                            localStorage.getItem("Id")
                          );

                          formDataa.append("documentTypeId", Item.id);

                          formDataa.append("type", Item.OtherDocumnetName);

                          for (let i = 0; i < Item.ImageFileArray.length; i++) {
                            formDataa.append(
                              "documents",
                              Item.ImageFileArray[i]
                            );
                          }
                        } else {
                          formDataa.append(
                            "userId",
                            localStorage.getItem("Id")
                          );

                          formDataa.append("documentTypeId", Item.id);

                          for (let i = 0; i < Item.ImageFileArray.length; i++) {
                            formDataa.append(
                              "documents",
                              Item.ImageFileArray[i]
                            );
                          }
                        }

                        ///////Update changes remaining//////////

                        const config = {
                          method: "POST",
                          url:
                            CommonConstants.BASE_URL +
                            "/uploadbusinessdocuments",
                          headers: { "Content-Type": "multipart/form-data" },
                          data: formDataa,
                        };

                        axios(config)
                          .then(function (response) {
                            if (response.data.status === true) {
                              Item.ImageFileArray = "";
                              setloadervalue(false);
                            } else {
                              setloadervalue(false);
                            }
                          })
                          .catch(function (error) {
                            // setloadervalue(false)
                            console.log(error);
                          });
                      }
                    });
                  } else {
                    setloadervalue(false);
                  }
                } else {
                  setloadervalue(false);
                }
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else if (VerifyOtherDocument === true) {
          const documentsWithImages = AdditionalImage.filter(
            (doc) => doc.ImageArray.length > 0
          );
          if (documentsWithImages.length >= 2) {
            AdditionalImage.map((Item) => {
              if (Item.ImageArray.length > 0) {
                const formDataa = new FormData();

                if (Item.typeName == "Other Documents") {
                  formDataa.append("userId", localStorage.getItem("Id"));

                  formDataa.append("documentTypeId", Item.id);

                  formDataa.append("type", Item.OtherDocumnetName);

                  for (let i = 0; i < Item.ImageFileArray.length; i++) {
                    formDataa.append("documents", Item.ImageFileArray[i]);
                  }
                } else {
                  formDataa.append("userId", localStorage.getItem("Id"));

                  formDataa.append("documentTypeId", Item.id);

                  for (let i = 0; i < Item.ImageFileArray.length; i++) {
                    formDataa.append("documents", Item.ImageFileArray[i]);
                  }
                }

                ///////Update changes remaining//////////

                const config = {
                  method: "POST",
                  url: CommonConstants.BASE_URL + "/uploadbusinessdocuments",
                  headers: { "Content-Type": "multipart/form-data" },
                  data: formDataa,
                };

                axios(config)
                  .then(function (response) {
                    if (response.data.status === true) {
                      Item.ImageFileArray = "";
                      setloadervalue(false);
                    } else {
                      setloadervalue(false);
                    }
                  })
                  .catch(function (error) {
                    // setloadervalue(false)
                    console.log(error);
                  });
              } else {
                setloadervalue(false);
              }
            });
          } else {
            setloadervalue(false);
          }
        }
      }
    }
  };

  const { setData1 } = useContext(userContext);
  const handleSendMoneyDataStep1 = (e) => {
    setstep1value({
      ...step1value,
      SMfromCountry: fromCountryidvalue,
      SMtoCountry: toCountryidvalue,
    });
  };

  const hFormID = () => {
    handleid("Sendmoney_Step1");
  };
  const handleCloses = () => setAlert(false);
  const handleShows = () => setAlert(true);

  const [PromoCodeDetails, setPromoCodeDetails] = useState([]);
  const [Promo_Error_Message, setPromo_Error_Message] = useState("");
  const [Promo_Error_Popup, setPromo_Error_Popup] = useState(false);
  const [Promo_Success_Message, setPromo_Success_Message] = useState("");
  const [Promo_Success_Popup, setPromo_Success_Popup] = useState(false);

  const [AppliedPromoCode, setAppliedPromoCode] = useState(
    // PromoCodeVerify != "" ? PromoCodeVerify :
    "noData"
  );
  const [BenifitonCase, setBenifitonCase] = useState(
    // PromoCodeVerify && location.state && location.state?.TransactionData != undefined
    // ? location.state?.TransactionData?.cashBenefit
    // :
    0
  );
  const [PromoCodeInfo, setPromoCodeInfo] = useState();
  const [getPoints, setgetPoints] = useState(
    // PromoCodeVerify && location.state && location.state?.TransactionData != undefined
    // ? location.state?.TransactionData?.pointBenefit
    // :
    0
  );
  const [
    BenifitonExchangeRateandServiceCharge,
    setBenifitonExchangeRateandServiceCharge,
  ] = useState(
    // PromoCodeVerify && location.state && location.state?.TransactionData != undefined
    // ? location.state?.TransactionData?.promoCodeServiceChargeDiscAmt
    // :
    0
  );
  const [
    BenifitonExchangeRateandServiceChargeName,
    setBenifitonExchangeRateandServiceChargeName,
  ] = useState(
    ""
    // PromoCodeVerify && location.state && location.state?.TransactionData
    //   ? location.state?.TransactionData?.promoCodeServiceChargeDiscAmt != "" && location.state?.TransactionData?.promoCodeServiceChargeDiscAmt != 0
    //     ? "(ServiceCharge)"
    //     : PromoCodeVerify && location.state?.TransactionData?.promoCodeExRateDiscAmt != "" && location.state?.TransactionData?.promoCodeExRateDiscAmt != 0
    //       ? "(ExchangeRate)"
    //       :""
    //       :""
  );

  const HandlePromocodeDetails = async (Countryid) => {
    const formData = new FormData();
    formData.append("countryId", Countryid);
    formData.append("userId", localStorage.getItem("Id"));
    formData.append("isForTransaction", true);
    formData.append("isForCompleteSignup", false);

    const config = {
      method: "POST",
      url: CommonConstants.BASE_URL + "/getpromocodes",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    };

    axios(config)
      .then(function (response) {
        setPromoCodeDetails(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSelectPromo = (
    id,
    DeliveryMethod,
    PaymentMethod,
    BenifitOnCash,
    MinSendingAmt,
    minAmount,
    maxAmount,
    minExchangeRate,
    maxExchangeRate,
    minServiceCharge,
    maxServiceCharge,
    points,
    ExDiscount,
    SeDiscount,
    Promocode
  ) => {
    const isMethodExistDelivery = DeliveryMethod.includes(
      defaultDeliveryMethod
    );
    const isMethodExistPayment = PaymentMethod.includes(defaultPaymentMethod);

    const TotalserviceCharge =
      TotalRate == 0 ? DeafultPSC + DefaultDSC : TotalRate;
    setModalShow(false);
    if (isMethodExistDelivery != true && isMethodExistPayment != true) {
      // "Your promocode not applicable with your delivery and payment method"
      setPromo_Error_Message(
        "This promo code can not used on your selected Payment Payment and Delivery method. Please try alternative payment methods and delivery methods to use it."
      );
      setPromo_Error_Popup(true);
      setRemovebtn(0);
      setPromocode("");
      setBenifitonCase(0);
      setgetPoints(0);
      setAppliedPromoCode("noData");
      setBenifitonExchangeRateandServiceCharge(0);
      setBenifitonExchangeRateandServiceChargeName("");
    } else if (isMethodExistDelivery != true) {
      // "Your promocode not applicable with your delivery method"
      setPromo_Error_Message(
        "This promo code can not used on your selected Delivery method. Please try changing the alternative delivery method to use the promo code."
      );
      setPromo_Error_Popup(true);
      setRemovebtn(0);
      setPromocode("");
      setBenifitonCase(0);
      setgetPoints(0);
      setAppliedPromoCode("noData");
      setBenifitonExchangeRateandServiceCharge(0);
      setBenifitonExchangeRateandServiceChargeName("");
    } else if (isMethodExistPayment != true) {
      // "Your promocode not applicable with your payment method"
      setPromo_Error_Message(
        "This promo code can not used on your selected Payment method. Please try changing the alternative payment method to use the promo code."
      );
      setPromo_Error_Popup(true);
      setRemovebtn(0);
      setPromocode("");
      setBenifitonCase(0);
      setgetPoints(0);
      setAppliedPromoCode("noData");
      setBenifitonExchangeRateandServiceCharge(0);
      setBenifitonExchangeRateandServiceChargeName("");
    } else {
      // if (BenifitOnCash > 0 && (sendMoney == "" ? 0 : sendMoney) >= MinSendingAmt) {
      //   setRemovebtn(id);
      //   // setBenifitonCase(BenifitOnCash);
      //   // setPromo_Success_Message("Benefit on case Code Applied successfully");
      //   // setPromo_Success_Popup(true);
      //   setPromocode(Promocode);
      //   setBenifitonExchangeRateandServiceCharge(0);
      //   setBenifitonExchangeRateandServiceChargeName("");
      // } else if ((sendMoney == "" ? 0 : sendMoney) >= minAmount && (sendMoney == "" ? 0 : sendMoney) <= maxAmount) {
      //   setRemovebtn(id);
      //   // setgetPoints(points);
      //   // setPromo_Success_Message("Benefit on point Code Applied Successfully");
      //   // setPromo_Success_Popup(true);
      //   setPromocode(Promocode);
      //   setBenifitonExchangeRateandServiceCharge(0);
      //   setBenifitonExchangeRateandServiceChargeName("");
      // } else {
      //   setRemovebtn(0);
      //   setPromocode("");
      //   setBenifitonCase(0)
      //   setgetPoints(0)
      //   setBenifitonExchangeRateandServiceCharge(0);
      //   setBenifitonExchangeRateandServiceChargeName("");
      //   // setPromo_Error_Message("Your promocode not applicable for this amount");
      //   // setPromo_Error_Popup(true);
      // }

      if (toCountry >= minExchangeRate && toCountry <= maxExchangeRate) {
        setRemovebtn(id);
        var ExDisc = (toCountry * ExDiscount) / 100;
        setBenifitonExchangeRateandServiceCharge(ExDisc);
        setBenifitonExchangeRateandServiceChargeName("(ExchangeRate)");
        setPromo_Success_Message(
          "Benefit on ExchangeRate Code Applied Successfully"
        );
        setPromo_Success_Popup(true);
        setPromocode(Promocode);
      } else if (
        TotalserviceCharge >= minServiceCharge &&
        TotalserviceCharge <= maxServiceCharge
      ) {
        setRemovebtn(id);
        var SeDisc = (TotalserviceCharge * SeDiscount) / 100;
        setBenifitonExchangeRateandServiceCharge(SeDisc);
        setBenifitonExchangeRateandServiceChargeName("(ServiceCharge)");
        setPromo_Success_Message(
          `You are awarded ${SeDisc?.toString()?.match(/^\d+(?:\.\d{0,2})?/)} ${flagSelect ? flagSelect.currency : ""} discount on service.`
          // `You are awarded ${SeDisc.toFixed(3)} ${flagSelect ? flagSelect.currency : ""} discount on service.`
        );

        setPromo_Success_Popup(true);
        setPromocode(Promocode);
      } else {
        if (
          BenifitOnCash > 0 &&
          (sendMoney == "" ? 0 : sendMoney) >= MinSendingAmt
        ) {
          setRemovebtn(id);
          // setBenifitonCase(BenifitOnCash);
          setPromo_Success_Message(
            `You are awarded ${BenifitOnCash} ${flagSelect ? flagSelect.currency : ""}. Once you complete your transaction. Cash will be available in your wallet.`
          );
          setPromo_Success_Popup(true);
          setPromocode(Promocode);
          setBenifitonExchangeRateandServiceCharge(0);
          setBenifitonExchangeRateandServiceChargeName("");
        } else if (
          (sendMoney == "" ? 0 : sendMoney) >= minAmount &&
          (sendMoney == "" ? 0 : sendMoney) <= maxAmount
        ) {
          setRemovebtn(id);
          // setgetPoints(points);
          // setPromo_Success_Message("Benefit on point Code Applied Successfully");
          // setPromo_Success_Popup(true);
          setPromocode(Promocode);
          setBenifitonExchangeRateandServiceCharge(0);
          setBenifitonExchangeRateandServiceChargeName("");
        } else {
          setRemovebtn(0);
          setPromocode("");
          setBenifitonCase(0);
          setgetPoints(0);
          setAppliedPromoCode("noData");
          setBenifitonExchangeRateandServiceCharge(0);
          setBenifitonExchangeRateandServiceChargeName("");
          setPromo_Error_Message(
            "Your promocode not applicable for this amount"
          );
          setPromo_Error_Popup(true);
        }
      }
    }
  };

  useEffect(() => {
    // GetIdTypeByCountryId();
    hFormID();
    RecieverCountryId(RecievercountryId);
    DileveryCharge(TotalRate);
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

    setData1(step1value);
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [handleid, PaymentRate, DileveryRate, TotalRate]);

  useEffect(() => {
    const timer = setInterval(() => {

      setServiceCharge(
        +(TotalRate == 0
          ? Number((DeafultPSC + DefaultDSC)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
          : DeafultPSC == 0 && DefaultDSC !== 0
          ? Number((DefaultDSC + PaymentRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
          : DefaultDSC == 0 && DeafultPSC !== 0 && Def_D_Flag == 1
          ? Number((DeafultPSC + DileveryRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
          : Number((TotalRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/)))
      );

      // setServiceCharge(
      //   +(TotalRate == 0
      //     ? Number(DeafultPSC + DefaultDSC).toFixed(2)
      //     : DeafultPSC == 0 && DefaultDSC !== 0
      //     ? Number(DefaultDSC + PaymentRate).toFixed(2)
      //     : DefaultDSC == 0 && DeafultPSC !== 0
      //     ? Number(DeafultPSC + DileveryRate).toFixed(2)
      //     : Number(TotalRate).toFixed(2))
      // );
    }, 1000);
    return () => clearInterval(timer);
  }, [DeafultPSC, DefaultDSC, PaymentRate, DileveryRate, TotalRate]);

  var CountinuePromo = true;
  var ChangeDelivery = false;

  useEffect(() => {
    GetAllCountrys();
    HandlePromocodeDetails(ID);
    // HandlePremiumeexchangerate(ID);
  }, []);

  const HandlePremiumeexchangerate = (RecivingId) => {
    try {
      const formData = new FormData();
      formData.append("receivingCountryId", RecivingId);
      formData.append("userId", localStorage.getItem("Id"));

      const config = {
        method: "POST",
        url: CommonConstants.BASE_URL + "/getpremiumexratebycountryid",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios(config)
        .then(function (response) {
          if (response.data.status == true) {
            if (response.data.data != null) {
              PremiumEXRateValue({
                premimumExId: response.data.data?.id,
                premimumExRate: response.data.data?.premiumAmount,
                premimumExAmt: response.data.data?.maxAmtForPremium,
              });
              setPremiumExchangerateAmount(
                response.data.data?.maxAmtForPremium
              );
              setPremiumExchangerate(response.data.data?.premiumAmount);
              setPremiumExchangerateId(response.data.data?.id);
              // setMoney((sendMoney == "" ? 0 : sendMoney),toCountry,response.data.data?.maxAmtForPremium,response.data.data?.premiumAmount);
            } else {
              setreceiveMoney(
                Number((
                  (sendMoney == "" ? 0 : sendMoney) *
                  response.data.data.publishedRate
                )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                // (
                //   (sendMoney == "" ? 0 : sendMoney) *
                //   response.data.data.publishedRate
                // ).toFixed(2)
              );
              setPremiumExchangerateAmount(0);
              setPremiumExchangerate(0);
              setPremiumExchangerateId(0);
            }
          } else {
            // setreceiveMoney(((sendMoney == "" ? 0 : sendMoney) * response.data.data.publishedRate).toFixed(2));
            setPremiumExchangerateAmount(0);
            setPremiumExchangerate(0);
            setPremiumExchangerateId(0);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch {}
  };

  useEffect(() => {
    if (ChangeDelivery == false) {
      GetAllCountrys();
      ChangeDelivery = true;
    }
  }, [HandleChangeDelivery]);

  //// PromoCode Regarding ////
  useEffect(() => {
    if (
      location.state?.TransactionData &&
      location.state?.TransactionData?.promoCode != ""
    ) {
      if (
        PromoCodeVerify != "" &&
        CountinuePromo == true &&
        defaultPaymentMethod != "" &&
        defaultDeliveryMethod != ""
      ) {
        CountinuePromo = false;

        // Parse the validFrom and validTo dates
        const validFromDate = new Date(PromoCodeVerify?.validFrom);
        const validToDate = new Date(PromoCodeVerify?.validTo);

        const CurruntDate = new Date();

        if (CurruntDate >= validFromDate && CurruntDate <= validToDate) {
          handleSelectPromo(
            PromoCodeVerify?.id,
            PromoCodeVerify?.deliveryMethod,
            PromoCodeVerify?.paymentMethod,
            PromoCodeVerify?.benifitsOnCash,
            PromoCodeVerify?.minSendingAmt,
            PromoCodeVerify?.minAmount,
            PromoCodeVerify?.maxAmount,
            PromoCodeVerify?.minExchangeRate,
            PromoCodeVerify?.maxExchangeRate,
            PromoCodeVerify?.minServiceCharge,
            PromoCodeVerify?.maxServiceCharge,
            PromoCodeVerify?.points,
            PromoCodeVerify?.exDiscount,
            PromoCodeVerify?.seDiscount,
            PromoCodeVerify?.promoCode
          );
        } else {
          setPromo_Error_Message("Your promocode is Expire");
          setPromo_Error_Popup(true);
        }
      }
    }
  }, [
    defaultDeliveryMethod,
    defaultPaymentMethod,
    TotalRate,
    toCountry,
    PromoCodeVerify,
  ]);
  /////////////////////////////

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
            ((sendMoney == "" ? 0 : sendMoney) *
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
          // debugger
          var PrecentageRate =
            (sendMoney == "" ? 0 : sendMoney) *
            (sortedPaymentMethods[0].serviceCharge / 100);
          var PercentageCharge =
            PrecentageRate == 0 ? DefaultServiceCharge : PrecentageRate;

          const mydata =
            PercentageCharge +
            sortedPaymentMethods[0].OurFees +
            sortedPaymentMethods[0].FixFees;
          setDeafultPSC(mydata);
          // amountvalue(mydata);
        }
      }
    }
  }, [ActiveDeliveryMethods, ActivePaymentMethods]);

  useEffect(() => {
    if (counter === 0) {
      try {
        const data = {
          fromCountryId: ID,
          toCountryId: Id2,
        };
        axios
          .post(CommonConstants.BASE_URL + "/getexchangeratebycountryid", data)
          .then((resp) => {
            if (resp.data.status === true) {
              if (!resp.data.data.publishedRate == toCountry) {
                setAlert(true);
                setCounter(420);
                settoCountry(resp.data.data.publishedRate);
                setExchangerate(resp.data.data.publishedRate);
                if ((sendMoney == "" ? 0 : sendMoney) !== undefined) {
                  // setreceiveMoney(
                  //   ((sendMoney == "" ? 0 : sendMoney) * resp.data.data.publishedRate).toFixed(2)
                  // );
                  setMoney(
                    sendMoney == "" ? 0 : sendMoney,
                    resp.data.data.publishedRate
                  );
                } else {
                  setreceiveMoney(0);
                }
              } else {
                setCounter(420);
              }
            } else if (resp.data.status === false) {
              settoCountry(0);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [counter]);

  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  const handleFlagSelect = async (e) => {
    handleSendMoneyDataStep1(e);
    let selected = countries.filter((val) => val.currency == e.target.value);
    setFlags(selected[0]);
    ExchangeRate(selected[0].id, flagSelect1.id);
    setId(selected[0].id);
    GetAllRecivingCountrys(selected[0].id);
    HandlePromocodeDetails(selected[0].id);
  };

  const handleFlagSelect1 = (e) => {
    const selectedval = countries1.filter(
      (val) => val.currency == e.target.value
    );
    setFlags1(selectedval[0]);
    setId2(selectedval[0]?.id);
    ExchangeRate(flagSelect.id, selectedval[0]?.id);
  };

  const GetAllCountrys = async () => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallsendercountries"
      );

      if (response.data.status === true || response.data.status === "success") {
        setCountries(response.data.data);
        setFlags(response.data.data[0]);
        setId(response.data.data[0].id);
        var id = response.data.data[0].id;
        const getallrecivercountriesbysendercountryid = await axios.post(
          CommonConstants.BASE_URL + "/getallrecivercountriesbysendercountryid",
          { senderCountryId: id }
        );
        setCountries1(getallrecivercountriesbysendercountryid.data.data);
        setFlags1(getallrecivercountriesbysendercountryid.data.data[0]);
        setflagSelect1FlagList(
          getallrecivercountriesbysendercountryid.data.data
        );
        setId2(getallrecivercountriesbysendercountryid.data.data[0].id);
        var id2 = getallrecivercountriesbysendercountryid.data.data[0].id;
        RecieverCountryId(id2);
        HandlePremiumeexchangerate(id2);
        localStorage.setItem("reciverCountryId", id2);

        ExchangeRate(id, id2);
        GetActivePaymentMethod(id);
        GetActiveDeliveryMethod(id2);
        handleGetDeliveryandPayment(sendMoney == "" ? 0 : sendMoney);
      } else if (response.data.status === "error") {
      }
    } catch (err) {}
  };

  const GetAllRecivingCountrys = async (Id) => {
    const getallrecivercountriesbysendercountryid = await axios.post(
      CommonConstants.BASE_URL + "/getallrecivercountriesbysendercountryid",
      { senderCountryId: Id }
    );
    let ID2 = getallrecivercountriesbysendercountryid.data.data[0].id;
    GetActiveDeliveryMethod(ID2);
    handleGetDeliveryandPayment(sendMoney == "" ? 0 : sendMoney);

    setCountries1(getallrecivercountriesbysendercountryid.data.data);
    setFlags1(getallrecivercountriesbysendercountryid.data.data[0]);
    setflagSelect1FlagList(getallrecivercountriesbysendercountryid.data.data);
    setId2(getallrecivercountriesbysendercountryid.data.data[0].id);

    var id2 = getallrecivercountriesbysendercountryid.data.data[0].id;
    HandlePremiumeexchangerate(id2);
    RecieverCountryId(id2);
    localStorage.setItem("reciverCountryId", id2);

    ExchangeRate(Id, id2);
    GetActivePaymentMethod(Id);
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
          enabled: payment.enabled,
        }));
        setActivePaymentMethods(Payments);
      } else if (response.data.status === false) {
      }
    } catch (err) {}
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
          estimatedDelivery: Delivery.estimatedDelivery,
          enabled: Delivery.enabled,
        }));

        const SortDelivery = Delivery.sort(
          (a, b) => a.serviceCharge - b.serviceCharge
        );

        setActiveDeliveryMethods(Delivery);
        const Estimate = Delivery.map((ele) => {
          const checkDeliveryMethod = DeliveryName === ele.name;
          if (checkDeliveryMethod) {
            return ele.estimatedDelivery;
          }
        });
        const estimateValue = Estimate.find((time) => time !== undefined);
        setEstimateTimes(estimateValue || "Few Hours");
      } else if (response.data.status === false) {
      }
    } catch (err) {}
  };

  const setMoney = (SendingValue, ExRate, PremiumAmount, PremiumRate) => {
    // setsendMoney(SendingValue);
    // debugger
    if (Number(SendingValue) <= PremiumAmount) {
      let AcceptPremeumAmount = SendingValue;
      let AcceptPremiumExRate = AcceptPremeumAmount * (ExRate + PremiumRate);
      let TotalReciverble = Number(AcceptPremiumExRate);

      setreceiveMoney(Number(TotalReciverble?.toString()?.match(/^\d+(?:\.\d{0,2})?/)));
      // setreceiveMoney(TotalReciverble.toFixed(2));
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
      setreceiveMoney(Number(TotalReciverble?.toString()?.match(/^\d+(?:\.\d{0,2})?/)));
      // setreceiveMoney(TotalReciverble.toFixed(2));
    }
  };

  useEffect(() => {
    setMoney(
      sendMoney == "" ? 0 : sendMoney,
      toCountry,
      PremiumExchangerateAmount,
      PremiumExchangerate
    );
  }, [toCountry, PremiumExchangerateAmount, PremiumExchangerate]);

  const handlesetPromocodeLimit = (SendingValue) => {
    // debugger
    if (AppliedPromoCode != "noData") {
      const isMethodExistDelivery = AppliedPromoCode?.deliveryMethod.includes(
        defaultDeliveryMethod
      );
      const isMethodExistPayment =
        AppliedPromoCode?.paymentMethod.includes(defaultPaymentMethod);
      const TotalserviceCharge =
        TotalRate == 0 ? DeafultPSC + DefaultDSC : TotalRate;

      setModalShow(false);
      if (isMethodExistDelivery != true && isMethodExistPayment != true) {
        // "Your promocode not applicable with your delivery and payment method"
        setPromo_Error_Message(
          "This promo code can not used on your selected Payment Payment and Delivery method. Please try alternative payment methods and delivery methods to use it."
        );
        setPromo_Error_Popup(true);
        setRemovebtn(0);
        setAppliedPromoCode("noData");
        setPromocode("");
        setBenifitonCase(0);
        setgetPoints(0);
        setBenifitonExchangeRateandServiceCharge(0);
        setBenifitonExchangeRateandServiceChargeName("");
      } else if (isMethodExistDelivery != true) {
        // "Your promocode not applicable with your delivery method"
        setPromo_Error_Message(
          "This promo code can not used on your selected Delivery method. Please try changing the alternative delivery method to use the promo code."
        );
        setPromo_Error_Popup(true);
        setRemovebtn(0);
        setPromocode("");
        setAppliedPromoCode("noData");
        setBenifitonCase(0);
        setgetPoints(0);
        setBenifitonExchangeRateandServiceCharge(0);
        setBenifitonExchangeRateandServiceChargeName("");
      } else if (isMethodExistPayment != true) {
        // "Your promocode not applicable with your payment method"
        setPromo_Error_Message(
          "This promo code can not used on your selected Payment method. Please try changing the alternative payment method to use the promo code."
        );
        setPromo_Error_Popup(true);
        setRemovebtn(0);
        setPromocode("");
        setAppliedPromoCode("noData");
        setBenifitonCase(0);
        setgetPoints(0);
        setBenifitonExchangeRateandServiceCharge(0);
        setBenifitonExchangeRateandServiceChargeName("");
      } else {
        // if (AppliedPromoCode?.benifitsOnCash > 0 && SendingValue >= AppliedPromoCode?.minSendingAmt) {
        //   setRemovebtn(AppliedPromoCode?.id);
        //   // setBenifitonCase(AppliedPromoCode?.benifitsOnCash);
        //   setBenifitonExchangeRateandServiceCharge(0);
        //   setBenifitonExchangeRateandServiceChargeName("");
        //   // setPromo_Success_Message("Benefit on case Code Applied Successfully");
        //   // setPromo_Success_Popup(true);
        //   setPromocode(Promocode);
        // } else if (SendingValue >= AppliedPromoCode?.minAmount && SendingValue <= AppliedPromoCode?.maxAmount) {
        //   setRemovebtn(AppliedPromoCode?.id);
        //   // setgetPoints(AppliedPromoCode?.points);
        //   setPromocode(Promocode);
        //   setBenifitonExchangeRateandServiceCharge(0);
        //   setBenifitonExchangeRateandServiceChargeName("");
        //   // setPromo_Success_Message("Benefit on point Code Applied Successfully");
        //   // setPromo_Success_Popup(true);
        // } else {
        //   setRemovebtn(0);
        //   setPromocode("");
        //   setBenifitonCase(0)
        //   setgetPoints(0)
        //   setBenifitonExchangeRateandServiceCharge(0);
        //   setBenifitonExchangeRateandServiceChargeName("");
        //   // setPromo_Error_Message("Your promocode not applicable for this amount");
        //   // setPromo_Error_Popup(true);
        // }

        if (
          toCountry >= AppliedPromoCode?.minExchangeRate &&
          toCountry <= AppliedPromoCode?.maxExchangeRate
        ) {
          setRemovebtn(AppliedPromoCode?.id);
          var ExDisc = (toCountry * AppliedPromoCode?.exDiscount) / 100;
          setBenifitonExchangeRateandServiceCharge(ExDisc);
          setBenifitonExchangeRateandServiceChargeName("(ExchangeRate)");
          setPromocode(Promocode);
          // setPromo_Success_Message(
          //   "Benefit on ExchangeRate Code Applied Successfully"
          // );
          // setPromo_Success_Popup(true);
        } else if (
          TotalserviceCharge >= AppliedPromoCode?.minServiceCharge &&
          TotalserviceCharge <= AppliedPromoCode?.maxServiceCharge
        ) {
          setRemovebtn(AppliedPromoCode?.id);
          var SeDisc =
            (TotalserviceCharge * AppliedPromoCode?.seDiscount) / 100;
          setBenifitonExchangeRateandServiceCharge(SeDisc);
          setBenifitonExchangeRateandServiceChargeName("(ServiceCharge)");
          setPromocode(Promocode);
          setPromo_Success_Message(
            `You are awarded ${SeDisc?.toString()?.match(/^\d+(?:\.\d{0,2})?/)} ${flagSelect ? flagSelect.currency : ""} discount on service.`
            // `You are awarded ${SeDisc.toFixed(3)} ${flagSelect ? flagSelect.currency : ""} discount on service.`
          );
          setPromo_Success_Popup(true);
        } else {
          if (
            AppliedPromoCode?.benifitsOnCash > 0 &&
            SendingValue >= AppliedPromoCode?.minSendingAmt
          ) {
            setRemovebtn(AppliedPromoCode?.id);
            // setBenifitonCase(AppliedPromoCode?.benifitsOnCash);
            setBenifitonExchangeRateandServiceCharge(0);
            setBenifitonExchangeRateandServiceChargeName("");
            setPromo_Success_Message(
              `You are awarded ${AppliedPromoCode?.benifitsOnCash} ${flagSelect ? flagSelect.currency : ""}. Once you complete your transaction. Cash will be available in your wallet.`
            );
            setPromo_Success_Popup(true);
            setPromocode(Promocode);
          } else if (
            SendingValue >= AppliedPromoCode?.minAmount &&
            SendingValue <= AppliedPromoCode?.maxAmount
          ) {
            setRemovebtn(AppliedPromoCode?.id);
            // setgetPoints(AppliedPromoCode?.points);
            setPromocode(Promocode);
            setBenifitonExchangeRateandServiceCharge(0);
            setBenifitonExchangeRateandServiceChargeName("");
            // setPromo_Success_Message("Benefit on point Code Applied Successfully");
            // setPromo_Success_Popup(true);
          } else {
            setRemovebtn(0);
            setPromocode("");
            setBenifitonCase(0);
            setgetPoints(0);
            setAppliedPromoCode("noData");
            setBenifitonExchangeRateandServiceCharge(0);
            setBenifitonExchangeRateandServiceChargeName("");
            setPromo_Error_Message(
              "Your promocode not applicable for this amount"
            );
            setPromo_Error_Popup(true);
          }
        }
      }
    }
  };

  const setReciveMoney = (ReciveValue, ExRate) => {
    if (!isNaN(ReciveValue) && isFinite(ReciveValue)) {
      setreceiveMoney(ReciveValue);

      let RecivingAmount =
        PremiumExchangerateAmount * (ExRate + PremiumExchangerate);
      if (PremiumExchangerateAmount != 0 && PremiumExchangerate != 0) {
        if (Number(ReciveValue) <= RecivingAmount) {
          let AcceptPremeumAmount = ReciveValue;
          let AcceptPremiumExRate =
            AcceptPremeumAmount / (ExRate + PremiumExchangerate) + 0.01;
          let TotalReciverble = Number((AcceptPremiumExRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/));
          // let TotalReciverble = Number(AcceptPremiumExRate)?.toFixed(2);
          setsendMoney(TotalReciverble);
        } else {
          let WithoutP_Amount = ReciveValue - RecivingAmount;
          let WithoutPremeumAmount = WithoutP_Amount / ExRate;
          let AcceptPremeumAmount =
            RecivingAmount / (ExRate + PremiumExchangerate);
          let TotalReciverble =
            Number(AcceptPremeumAmount) + Number(WithoutPremeumAmount) + 0.01;
          setsendMoney(Number(TotalReciverble?.toString()?.match(/^\d+(?:\.\d{0,2})?/)));
          // setsendMoney(TotalReciverble?.toFixed(2));
        }
      } else {
        setsendMoney(Number((ReciveValue / ExRate + 0.01)?.toString()?.match(/^\d+(?:\.\d{0,2})?/)));
        // setsendMoney((ReciveValue / ExRate + 0.01).toFixed(2));
      }
    } else {
      // Handle the case where ReciveValue is not a valid number
      // You can display an error message or take appropriate action here
    }
  };

  const setMoneySummurry = (e) => {
    sendingMoney(e.target.value);
    let value = e.target.value;
    handleDeliveryandPayment(value);
    // handleGetDeliveryandPayment(value);
  };

  const ExchangeRate = async (country_Id1, countryId2) => {
    setRecievercountryId(countryId2);
    try {
      const data = {
        fromCountryId: country_Id1,
        toCountryId: countryId2,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getexchangeratebycountryid",
        data
      );
      if (response.data.status === true) {
        setExchangerate(response.data.data.publishedRate);
        setPreviousExchangeRate(response.data.data.publishedRate);
        settoCountry(response.data.data.publishedRate);
        if ((sendMoney == "" ? 0 : sendMoney) !== undefined) {
          // debugger
          // setreceiveMoney(
          //   ((sendMoney == "" ? 0 : sendMoney) * response.data.data.publishedRate).toFixed(2)
          // );
          const formData = new FormData();
          formData.append("receivingCountryId", countryId2);
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
                  PremiumEXRateValue({
                    premimumExId: response.data.data?.id,
                    premimumExRate: response.data.data?.premiumAmount,
                    premimumExAmt: response.data.data?.maxAmtForPremium,
                  });
                  setPremiumExchangerateAmount(res.data.data?.maxAmtForPremium);
                  setPremiumExchangerate(res.data.data?.premiumAmount);
                  setPremiumExchangerateId(res.data.data?.id);
                  // setMoney((sendMoney == "" ? 0 : sendMoney),toCountry,response.data.data?.maxAmtForPremium,response.data.data?.premiumAmount);
                  setMoney(
                    sendMoney == "" ? 0 : sendMoney,
                    response.data.data.publishedRate,
                    res.data.data?.maxAmtForPremium,
                    res.data.data?.premiumAmount
                  );
                } else {
                  setreceiveMoney(
                    Number((
                      (sendMoney == "" ? 0 : sendMoney) *
                      response.data.data.publishedRate
                    )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    // (
                    //   (sendMoney == "" ? 0 : sendMoney) *
                    //   response.data.data.publishedRate
                    // ).toFixed(2)
                  );
                  setPremiumExchangerateAmount(0);
                  setPremiumExchangerate(0);
                  setPremiumExchangerateId(0);
                }
              } else {
                setreceiveMoney(
                  Number((
                    (sendMoney == "" ? 0 : sendMoney) *
                    response.data.data.publishedRate
                  )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                  // (
                  //   (sendMoney == "" ? 0 : sendMoney) *
                  //   response.data.data.publishedRate
                  // ).toFixed(2)
                );
                setPremiumExchangerateAmount(0);
                setPremiumExchangerate(0);
                setPremiumExchangerateId(0);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          setreceiveMoney(0);
        }
      } else if (response.data.status === false) {
        settoCountry(0);
      }
    } catch (err) {}
  };

  const handleBankDeposite = () => {
    setBankDepositevalue(true);
    setWalletDepositvalue(false);
    setCashPickupvalue(false);
  };

  const [PaymentID, setPaymentID] = useState();
  const [DeliveryID, setDeliveryID] = useState();
  const [dynamicDeliveryID, setdynamicDeliveryID] = useState();

  const [PaymentName, setPaymentName] = useState("");
  const [DeliveryName, setDeliveryName] = useState("");

  const handlePaymentmethod = (e, id, name, charge, paymentid) => {
    // debugger
    setPaymentID(id);
    setPaymentName(name);
    setDefaultPaymentMethod(name);
    PaymentmethodName(name);
    var ChargeRate = charge[0];
    setPaymentRate(ChargeRate);
    setTotalRate(DileveryRate + ChargeRate);

    if (AppliedPromoCode != "noData") {
      var DeliveryDefaultSC = DileveryRate == 0 ? DefaultDSC : DileveryRate;
      var Totalservicecharge = DeliveryDefaultSC + ChargeRate;
      const isMethodExistDelivery = AppliedPromoCode?.deliveryMethod.includes(
        defaultDeliveryMethod
      );
      const isMethodExistPayment =
        AppliedPromoCode?.paymentMethod.includes(name);

      const TotalserviceCharge =
        Totalservicecharge == 0 ? DeafultPSC + DefaultDSC : Totalservicecharge;

      setModalShow(false);
      if (isMethodExistDelivery != true && isMethodExistPayment != true) {
        // "Your promocode not applicable with your delivery and payment method"
        setPromo_Error_Message(
          "This promo code can not used on your selected Payment Payment and Delivery method. Please try alternative payment methods and delivery methods to use it."
        );
        setRemovebtn(0);
        handleClosePayment();
        setPromo_Error_Popup(true);
        setPromocode("");
        setBenifitonCase(0);
        setAppliedPromoCode("noData");
        setgetPoints(0);
        setBenifitonExchangeRateandServiceCharge(0);
        setBenifitonExchangeRateandServiceChargeName("");
      } else if (isMethodExistDelivery != true) {
        // "Your promocode not applicable with your delivery method"
        setPromo_Error_Message(
          "This promo code can not used on your selected Delivery method. Please try changing the alternative delivery method to use the promo code."
        );
        setRemovebtn(0);
        handleClosePayment();
        setPromo_Error_Popup(true);
        setPromocode("");
        setBenifitonCase(0);
        setAppliedPromoCode("noData");
        setgetPoints(0);
        setBenifitonExchangeRateandServiceCharge(0);
        setBenifitonExchangeRateandServiceChargeName("");
      } else if (isMethodExistPayment != true) {
        // "Your promocode not applicable with your payment method"
        setPromo_Error_Message(
          "This promo code can not used on your selected Payment method. Please try changing the alternative payment method to use the promo code."
        );
        setRemovebtn(0);
        handleClosePayment();
        setPromo_Error_Popup(true);
        setPromocode("");
        setBenifitonCase(0);
        setAppliedPromoCode("noData");
        setgetPoints(0);
        setBenifitonExchangeRateandServiceCharge(0);
        setBenifitonExchangeRateandServiceChargeName("");
      } else {
        // if (AppliedPromoCode?.benifitsOnCash > 0 && (sendMoney == "" ? 0 : sendMoney) >= AppliedPromoCode?.minSendingAmt) {
        //   setRemovebtn(AppliedPromoCode?.id);
        //   setBenifitonCase(AppliedPromoCode?.benifitsOnCash);
        //   setBenifitonExchangeRateandServiceCharge(0);
        //   setBenifitonExchangeRateandServiceChargeName("");
        //   setPromocode(Promocode);
        // } else if ((sendMoney == "" ? 0 : sendMoney) >= AppliedPromoCode?.minAmount && (sendMoney == "" ? 0 : sendMoney) <= AppliedPromoCode?.maxAmount) {
        //   setRemovebtn(AppliedPromoCode?.id);
        //   setgetPoints(AppliedPromoCode?.points);
        //   setPromocode(Promocode);
        //   setBenifitonExchangeRateandServiceCharge(0);
        //   setBenifitonExchangeRateandServiceChargeName("");
        // } else {
        //   // setPromo_Error_Message("Your promocode not applicable for this amount");
        //   // setPromo_Error_Popup(true);
        //   setRemovebtn(0);
        //   setPromocode("");
        //   setBenifitonCase(0)
        //   setgetPoints(0)
        //   setBenifitonExchangeRateandServiceCharge(0);
        //   setAppliedPromoCode("noData")
        //   setBenifitonExchangeRateandServiceChargeName("");
        //   handleClosePayment()
        // }

        if (
          toCountry >= AppliedPromoCode?.minExchangeRate &&
          toCountry <= AppliedPromoCode?.maxExchangeRate
        ) {
          setRemovebtn(AppliedPromoCode?.id);
          var ExDisc = (toCountry * AppliedPromoCode?.exDiscount) / 100;
          setBenifitonExchangeRateandServiceCharge(ExDisc);
          setBenifitonExchangeRateandServiceChargeName("(ExchangeRate)");
          setPromocode(AppliedPromoCode.promoCode);
          handleClosePayment();
        } else if (
          TotalserviceCharge >= AppliedPromoCode?.minServiceCharge &&
          TotalserviceCharge <= AppliedPromoCode?.maxServiceCharge
        ) {
          setRemovebtn(AppliedPromoCode?.id);
          var SeDisc =
            (TotalserviceCharge * AppliedPromoCode?.seDiscount) / 100;
          setBenifitonExchangeRateandServiceCharge(SeDisc);
          setBenifitonExchangeRateandServiceChargeName("(ServiceCharge)");
          setPromocode(AppliedPromoCode.promoCode);
          handleClosePayment();
        } else {
          if (
            AppliedPromoCode?.benifitsOnCash > 0 &&
            (sendMoney == "" ? 0 : sendMoney) >= AppliedPromoCode?.minSendingAmt
          ) {
            setRemovebtn(AppliedPromoCode?.id);
            setBenifitonCase(AppliedPromoCode?.benifitsOnCash);
            setBenifitonExchangeRateandServiceCharge(0);
            setBenifitonExchangeRateandServiceChargeName("");
            handleClosePayment();
            setPromocode(AppliedPromoCode.promoCode);
          } else if (
            (sendMoney == "" ? 0 : sendMoney) >= AppliedPromoCode?.minAmount &&
            (sendMoney == "" ? 0 : sendMoney) <= AppliedPromoCode?.maxAmount
          ) {
            setRemovebtn(AppliedPromoCode?.id);
            setgetPoints(AppliedPromoCode?.points);
            setPromocode(AppliedPromoCode.promoCode);
            setBenifitonExchangeRateandServiceCharge(0);
            setBenifitonExchangeRateandServiceChargeName("");
            handleClosePayment();
          } else {
            setPromo_Error_Message(
              "Your promocode not applicable for this amount"
            );
            setPromo_Error_Popup(true);
            setRemovebtn(0);
            setPromocode("");
            setBenifitonCase(0);
            setAppliedPromoCode("noData");
            setgetPoints(0);
            setBenifitonExchangeRateandServiceCharge(0);
            setBenifitonExchangeRateandServiceChargeName("");
            handleClosePayment();
          }
        }
      }
    }
  };

  const handleDeliverymethod = (e, id, name, charge, DeliveryId) => {
    setDeliveryID(DeliveryId);
    setDeliveryName(name);
    setDefaultDeliveryMethod(name);
    var ChargeRate = charge[0];
    setTotalRate(ChargeRate + PaymentRate);
    setDileveryRate(ChargeRate);
    setdynamicDeliveryID(DeliveryId);
    setActiveDeliveryMethodsId(DeliveryId);

    if (AppliedPromoCode != "noData") {
      var paymentDefaultSC = PaymentRate == 0 ? DeafultPSC : PaymentRate;
      var totalServicecharge = ChargeRate + paymentDefaultSC;
      const isMethodExistDelivery =
        AppliedPromoCode?.deliveryMethod.includes(name);
      const isMethodExistPayment =
        AppliedPromoCode?.paymentMethod.includes(defaultPaymentMethod);
      const TotalserviceCharge =
        totalServicecharge == 0 ? DeafultPSC + DefaultDSC : totalServicecharge;

      setModalShow(false);
      // debugger
      if (isMethodExistDelivery != true && isMethodExistPayment != true) {
        // "Your promocode not applicable with your delivery and payment method"
        setPromo_Error_Message(
          "This promo code can not used on your selected Payment Payment and Delivery method. Please try alternative payment methods and delivery methods to use it."
        );
        setRemovebtn(0);
        handleCloseDelivery();
        setPromo_Error_Popup(true);
        setPromocode("");
        setBenifitonCase(0);
        setAppliedPromoCode("noData");
        setgetPoints(0);
        setBenifitonExchangeRateandServiceCharge(0);
        setBenifitonExchangeRateandServiceChargeName("");
      } else if (isMethodExistDelivery != true) {
        // "Your promocode not applicable with your delivery method"
        setPromo_Error_Message(
          "This promo code can not used on your selected Delivery method. Please try changing the alternative delivery method to use the promo code."
        );
        setRemovebtn(0);
        handleCloseDelivery();
        setPromo_Error_Popup(true);
        setPromocode("");
        setBenifitonCase(0);
        setAppliedPromoCode("noData");
        setgetPoints(0);
        setBenifitonExchangeRateandServiceCharge(0);
        setBenifitonExchangeRateandServiceChargeName("");
      } else if (isMethodExistPayment != true) {
        // "Your promocode not applicable with your payment method"
        setPromo_Error_Message(
          "This promo code can not used on your selected Payment method. Please try changing the alternative payment method to use the promo code."
        );
        setRemovebtn(0);
        handleCloseDelivery();
        setPromo_Error_Popup(true);
        setPromocode("");
        setBenifitonCase(0);
        setgetPoints(0);
        setAppliedPromoCode("noData");
        setBenifitonExchangeRateandServiceCharge(0);
        setBenifitonExchangeRateandServiceChargeName("");
      } else {
        // if (AppliedPromoCode?.benifitsOnCash > 0 && (sendMoney == "" ? 0 : sendMoney) >= AppliedPromoCode?.minSendingAmt) {
        //   setRemovebtn(AppliedPromoCode?.id);
        //   setBenifitonCase(AppliedPromoCode?.benifitsOnCash);
        //   setBenifitonExchangeRateandServiceCharge(0);
        //   setBenifitonExchangeRateandServiceChargeName("");
        //   setPromocode(Promocode);
        // } else if ((sendMoney == "" ? 0 : sendMoney) >= AppliedPromoCode?.minAmount && (sendMoney == "" ? 0 : sendMoney) <= AppliedPromoCode?.maxAmount) {
        //   setRemovebtn(AppliedPromoCode?.id);
        //   setgetPoints(AppliedPromoCode?.points);
        //   setPromocode(Promocode);
        //   setBenifitonExchangeRateandServiceCharge(0);
        //   setBenifitonExchangeRateandServiceChargeName("");
        // } else {
        //   // setPromo_Error_Message("Your promocode not applicable for this amount");
        //   setRemovebtn(0);
        //   setPromocode("");
        //   setBenifitonCase(0)
        //   setgetPoints(0)
        //   setAppliedPromoCode("noData")
        //   setBenifitonExchangeRateandServiceCharge(0);
        //   setBenifitonExchangeRateandServiceChargeName("");
        //   // setPromo_Error_Popup(true);
        //   handleCloseDelivery()
        // }

        if (
          toCountry >= AppliedPromoCode?.minExchangeRate &&
          toCountry <= AppliedPromoCode?.maxExchangeRate
        ) {
          setRemovebtn(AppliedPromoCode?.id);
          var ExDisc = (toCountry * AppliedPromoCode?.exDiscount) / 100;
          setBenifitonExchangeRateandServiceCharge(ExDisc);
          setBenifitonExchangeRateandServiceChargeName("(ExchangeRate)");
          setPromocode(AppliedPromoCode.promoCode);
          handleCloseDelivery();
        } else if (
          TotalserviceCharge >= AppliedPromoCode?.minServiceCharge &&
          TotalserviceCharge <= AppliedPromoCode?.maxServiceCharge
        ) {
          setRemovebtn(AppliedPromoCode?.id);
          var SeDisc =
            (TotalserviceCharge * AppliedPromoCode?.seDiscount) / 100;
          setBenifitonExchangeRateandServiceCharge(SeDisc);
          setBenifitonExchangeRateandServiceChargeName("(ServiceCharge)");
          setPromocode(AppliedPromoCode.promoCode);
          handleCloseDelivery();
        } else {
          if (
            AppliedPromoCode?.benifitsOnCash > 0 &&
            (sendMoney == "" ? 0 : sendMoney) >= AppliedPromoCode?.minSendingAmt
          ) {
            setRemovebtn(AppliedPromoCode?.id);
            // setBenifitonCase(AppliedPromoCode?.benifitsOnCash);
            setBenifitonExchangeRateandServiceCharge(0);
            setBenifitonExchangeRateandServiceChargeName("");
            setPromocode(AppliedPromoCode.promoCode);
            handleCloseDelivery();
          } else if (
            (sendMoney == "" ? 0 : sendMoney) >= AppliedPromoCode?.minAmount &&
            (sendMoney == "" ? 0 : sendMoney) <= AppliedPromoCode?.maxAmount
          ) {
            setRemovebtn(AppliedPromoCode?.id);
            // setgetPoints(AppliedPromoCode?.points);
            setPromocode(AppliedPromoCode.promoCode);
            setBenifitonExchangeRateandServiceCharge(0);
            setBenifitonExchangeRateandServiceChargeName("");
            handleCloseDelivery();
          } else {
            setPromo_Error_Message(
              "Your promocode not applicable for this amount"
            );
            setRemovebtn(0);
            setPromocode("");
            setBenifitonCase(0);
            setgetPoints(0);
            setAppliedPromoCode("noData");
            setBenifitonExchangeRateandServiceCharge(0);
            setBenifitonExchangeRateandServiceChargeName("");
            setPromo_Error_Popup(true);
            handleCloseDelivery();
          }
        }
      }
    }
  };

  const findCharge = (amount, chargeConfig) => {
    // debugger
    for (const charge of chargeConfig) {
      if (amount >= charge.lower && amount <= charge.upper) {
        return charge.charge;
      }
    }
    // If no matching range is found, return the charge of the last range
    return chargeConfig[chargeConfig.length - 1].charge;
  };

  const [AllServiceCharge, setAllServiceCharge] = useState([]);
  const [PaymentServiceCharge, setPaymentServiceCharge] = useState([]);
  const [DeliveryServiceCharge, setDeliveryServiceCharge] = useState([]);

  ////////////////////Upcoming Service Charge start/////////////////////////
  const handleGetDeliveryandPayment = async (value) => {
    const Servicecharge = {
      amount: value,
      fromCountryId: ID,
      toCountryId: Id2,
    };
    try {
      const getServiceCharge = await axios.post(
        CommonConstants.BASE_URL + "/getservicechargeforsendmoney",
        Servicecharge
      );
      const ServiceChargearray = getServiceCharge.data?.data;
      // debugger
      if (ServiceChargearray != null) {
        setAllServiceCharge(ServiceChargearray);
        setDeliveryServiceCharge(ServiceChargearray);
        setPaymentServiceCharge(ServiceChargearray);

        setMaxSendAmount(getServiceCharge.data?.data?.maximumTransaction);
        setMinSendAmount(getServiceCharge.data?.data?.minimumTransaction);
        setNullValuePresentMessage("");
        const getAllDeliveryMethodCharge =
          getServiceCharge.data?.data?.deliveryMethodCharges;
        const getAllPaymentMethodCharge =
          getServiceCharge.data?.data?.paymentMethodCharges;
        const getAllPaymentMethodStatic = getServiceCharge.data?.data;
        setDefaultServiceCharge(getAllPaymentMethodStatic?.serviceCharge);
        if ((sendMoney == "" ? 0 : sendMoney) !== 0 || "0") {
          var SC = [];
          ActivePaymentMethods.map((item, index) => {
            var aaa = getAllPaymentMethodCharge?.map(
              (val) => val?.type == item?.name
            );
            SC.push(aaa[0]);
          });
          var LoWer123 = [];
          getAllPaymentMethodCharge.map((item, index) => {
            if (item.type == "Debit Card" || item.type == "Credit Card") {
              var bbba = item?.range.filter(
                (items, i) =>
                  (sendMoney == "" ? 0 : sendMoney) >= items.lower &&
                  (sendMoney == "" ? 0 : sendMoney) <= items.upper
              );

              var DCA =
                bbba?.length == 0
                  ? item?.range[item?.range?.length - 1]?.charge
                  : bbba[0]?.charge;
              // (sendMoney == "" ? 0 : sendMoney) >= item?.range[0].lower &&
              //   (sendMoney == "" ? 0 : sendMoney) <= item?.range[0].upper
              //   ? item?.range[0]?.charge
              //   : item?.range[item?.range?.length - 1]?.charge;
              var DCAOFC =
                bbba?.length == 0
                  ? item?.range[item?.range?.length - 1]?.ourfees
                  : bbba[0]?.ourfees;
              // (sendMoney == "" ? 0 : sendMoney) >= item?.range[0].lower &&
              //   (sendMoney == "" ? 0 : sendMoney) <= item?.range[0].upper
              //   ? item?.range[0]?.ourfees
              //   : 0;
              var DCAFFC =
                bbba?.length == 0
                  ? item?.range[item?.range?.length - 1]?.fixfees
                  : bbba[0]?.fixfees;
              // (sendMoney == "" ? 0 : sendMoney) >= item?.range[0].lower &&
              //   (sendMoney == "" ? 0 : sendMoney) <= item?.range[0].upper
              //   ? item?.range[0]?.fixfees
              //   : 0;
              var DCAAT = bbba?.length == 0 ? "amount" : bbba[0]?.type;

              var calculationServicecharge =
                bbba?.length == 0
                  ? item?.range[item?.range?.length - 1]?.charge
                  : (DCAAT == "percentage"
                      ? Number(value * (bbba[0]?.charge / 100))
                      : bbba[0]?.charge) +
                    Number(bbba[0]?.ourfees) +
                    Number(bbba[0]?.fixfees);

              var DCaLowerUpperServiceCharge = {
                name: item?.type,
                serviceCharge: value === "0" || value === "" ? 0 : DCA,
                OurFees: value === "0" || value === "" ? 0 : DCAOFC,
                FixFees: value === "0" || value === "" ? 0 : DCAFFC,
                amountType: DCAAT,
                calServicecharge:
                  value === "0" || value === "" ? 0 : calculationServicecharge,
              };
              LoWer123.push(DCaLowerUpperServiceCharge);
            } else {
              var bbbaa = item?.range.filter(
                (items, i) =>
                  (sendMoney == "" ? 0 : sendMoney) >= items.lower &&
                  (sendMoney == "" ? 0 : sendMoney) <= items.upper
              );

              var bbb =
                bbbaa.length == 0
                  ? item?.range[item?.range?.length - 1]?.charge
                  : bbbaa[0].charge;
              // (sendMoney == "" ? 0 : sendMoney) >= item.range[0].lower &&
              // (sendMoney == "" ? 0 : sendMoney) <= item.range[0].upper
              //   ? item.range[0].charge
              //   : item?.range[item?.range?.length - 1]?.charge;
              var DCAATT = bbbaa.length == 0 ? "amount" : bbbaa[0].type;

              var LowerUpperServiceCharge = {
                name: item.type,
                serviceCharge: value === "0" || value === "" ? 0 : bbb,
                amountType: DCAATT,
                calServicecharge: value === "0" || value === "" ? 0 : bbb,
              };
              LoWer123.push(LowerUpperServiceCharge);
            }
          });

          setPaymentLowerUpper(LoWer123);
          const Transaction_P_Data =
            location.state && location.state.TransactionData != undefined
              ? LoWer123?.filter(
                  (method) =>
                    method?.name ==
                    location.state.TransactionData?.paymentMethod
                )
              : location.state && location.state.HomeScreenData != undefined
              ? LoWer123?.filter(
                  (method) =>
                    method?.name == location.state.HomeScreenData?.P_Method
                )
              : [];

          if (LoWer123.length > 0) {
            const sortedPaymentMethods =
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

            let lowestServiceChargeMethod = [];
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
                  ((sendMoney == "" ? 0 : sendMoney) *
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
                var DebitCreditpercentageCharge =
                  (sendMoney == "" ? 0 : sendMoney) *
                  (sortedPaymentMethods[0].serviceCharge / 100);
                const mydata =
                  DebitCreditpercentageCharge +
                  sortedPaymentMethods[0].OurFees +
                  sortedPaymentMethods[0].FixFees;
                setDeafultPSC(mydata);
              }
            }
            if (JSON.stringify(LoWer123) != JSON.stringify(PaymentLowerUpper)) {
              if (location.state && location.state.TransactionData) {
                setPaymentName(Transaction_P_Data[0].name);
                setPaymentID(Transaction_P_Data[0].typeid);
                setDefaultPaymentMethod(Transaction_P_Data[0].name);
                setDeafultPSC(Transaction_P_Data[0].serviceCharge);
              } else if (location.state && location.state.HomeScreenData) {
                setPaymentName(Transaction_P_Data[0].name);
                setPaymentID(Transaction_P_Data[0].typeid);
                setDefaultPaymentMethod(Transaction_P_Data[0].name);
                setDeafultPSC(Transaction_P_Data[0].serviceCharge);
              } else {
                setPaymentName(sortedPaymentMethods[0].name);
                setPaymentID(sortedPaymentMethods[0].typeid);
                setDefaultPaymentMethod(sortedPaymentMethods[0].name);
                setDeafultPSC(sortedPaymentMethods[0].serviceCharge);
              }
            }
          }
        }

        if ((sendMoney == "" ? 0 : sendMoney) !== 0 || "0") {
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
                (sendMoney == "" ? 0 : sendMoney) >= items.lower &&
                (sendMoney == "" ? 0 : sendMoney) <= items.upper
            );

            var bbb =
              bbba.length == 0
                ? item?.range[item?.range?.length - 1]?.charge
                : bbba[0].charge;
            // (sendMoney == "" ? 0 : sendMoney) >= item.range[0].lower && (sendMoney == "" ? 0 : sendMoney) <= item.range[0].upper
            //   ? item.range[0].charge
            //   : item?.range[item?.range?.length - 1]?.charge;

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

          const Transaction_D_Data =
            HandleChangeDelivery != "" && HandleChangeDelivery != undefined
              ? DeliveryServiceChrage?.filter(
                  (method) => method?.typeid == HandleChangeDelivery
                )
              : location.state && location.state.TransactionData != undefined
              ? DeliveryServiceChrage?.filter(
                  (method) =>
                    method?.name ==
                    location.state.TransactionData?.deliveryMethodName
                )
              : location.state && location.state.ReciptionData != undefined
              ? DeliveryServiceChrage?.filter(
                  (method) =>
                    method?.name ==
                    location.state.ReciptionData?.deliveryMethodName
                )
              : location.state && location.state.HomeScreenData != undefined
              ? DeliveryServiceChrage?.filter(
                  (method) =>
                    method?.name == location.state.HomeScreenData?.D_Method
                )
              : [];

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
            if (
              JSON.stringify(DeliveryServiceChrage) !=
              JSON.stringify(DeliveryLowerUpper)
            ) {
              if (
                HandleChangeDelivery != "" &&
                HandleChangeDelivery != undefined
              ) {
                setDeliveryName(Transaction_D_Data[0].name);
                setDeliveryID(Transaction_D_Data[0].typeid);
                setDefaultDeliveryMethod(Transaction_D_Data[0].name);
                setDefaultDSC(Transaction_D_Data[0].serviceCharge);
                setActiveDeliveryMethodsId(Transaction_D_Data[0].typeid);
              } else if (location.state && location.state.TransactionData) {
                setDeliveryName(Transaction_D_Data[0].name);
                setDeliveryID(Transaction_D_Data[0].typeid);
                setDefaultDeliveryMethod(Transaction_D_Data[0].name);
                setDefaultDSC(Transaction_D_Data[0].serviceCharge);
                setActiveDeliveryMethodsId(Transaction_D_Data[0].typeid);
              } else if (location.state && location.state.ReciptionData) {
                setDeliveryName(Transaction_D_Data[0].name);
                setDeliveryID(Transaction_D_Data[0].typeid);
                setDefaultDeliveryMethod(Transaction_D_Data[0].name);
                setDefaultDSC(Transaction_D_Data[0].serviceCharge);
                setActiveDeliveryMethodsId(Transaction_D_Data[0].typeid);
              } else if (location.state && location.state.HomeScreenData) {
                setDeliveryName(Transaction_D_Data[0].name);
                setDeliveryID(Transaction_D_Data[0].typeid);
                setDefaultDeliveryMethod(Transaction_D_Data[0].name);
                setDefaultDSC(Transaction_D_Data[0].serviceCharge);
                setActiveDeliveryMethodsId(Transaction_D_Data[0].typeid);
              } else {
                setDeliveryName(sortData[0].name);
                setDeliveryID(sortData[0].typeid);
                setDefaultDeliveryMethod(sortData[0].name);
                setDefaultDSC(sortData[0].serviceCharge);
                setDef_D_Flag(sortData[0].serviceCharge == 0 ? 0 : 1);
                setActiveDeliveryMethodsId(sortData[0].typeid);
              }
            }
          }
        }
      } else {
        setMaxSendAmount(0);
        setMinSendAmount(0);
        setDeafultPSC(0);
        setDefaultDSC(0);
        setTotalRate(0);
        setPaymentRate(0);
        setDileveryRate(0);
        setDeliveryLowerUpper([]);
        setPaymentLowerUpper([]);
        setNullValuePresentMessage(getServiceCharge.data?.message);
        const updatedMyPaymentamountObject = ActivePaymentMethods.map(
          (item) => {
            return {
              ...item, // Copy the original item's properties
              serviceCharge: 0, // Update the "serviceCharge" property to 0
            };
          }
        );
        const updatedMyDeliveryamountObject = ActiveDeliveryMethods.map(
          (item) => {
            return {
              ...item, // Copy the original item's properties
              serviceCharge: 0, // Update the "serviceCharge" property to 0
            };
          }
        );
        setActivePaymentMethods(updatedMyPaymentamountObject);
        setDefaultServiceCharge(0);
        setActiveDeliveryMethods(updatedMyDeliveryamountObject);
      }
    } catch (err) {}
  };

  const handleDeliveryandPayment = async (value) => {
    const ServiceChargearray = AllServiceCharge;
    if (ServiceChargearray != null) {
      setDeliveryServiceCharge(ServiceChargearray);
      setPaymentServiceCharge(ServiceChargearray);
      setMaxSendAmount(ServiceChargearray?.maximumTransaction);
      setMinSendAmount(ServiceChargearray?.minimumTransaction);
      setNullValuePresentMessage("");
      const getAllDeliveryMethodCharge =
        ServiceChargearray?.deliveryMethodCharges;
      const getAllPaymentMethodCharge =
        ServiceChargearray?.paymentMethodCharges;
      const getAllPaymentMethodStatic = ServiceChargearray;
      setDefaultServiceCharge(getAllPaymentMethodStatic?.serviceCharge);
      if ((sendMoney == "" ? 0 : sendMoney) !== 0 || "0") {
        var SC = [];
        ActivePaymentMethods.map((item, index) => {
          var aaa = getAllPaymentMethodCharge?.map(
            (val) => val?.type == item?.name
          );
          SC.push(aaa[0]);
        });
        var LoWer123 = [];
        getAllPaymentMethodCharge.map((item, index) => {
          if (item.type == "Debit Card" || item.type == "Credit Card") {
            var bbba = item?.range.filter(
              (items, i) =>
                (sendMoney == "" ? 0 : sendMoney) >= items.lower &&
                (sendMoney == "" ? 0 : sendMoney) <= items.upper
            );

            var DCA =
              bbba?.length == 0
                ? getAllPaymentMethodStatic?.serviceCharge
                : bbba[0]?.charge;
            // (sendMoney == "" ? 0 : sendMoney) >= item?.range[0].lower &&
            //   (sendMoney == "" ? 0 : sendMoney) <= item?.range[0].upper
            //   ? item?.range[0]?.charge
            //   : getAllPaymentMethodStatic?.serviceCharge;
            var DCAOFC =
              bbba?.length == 0
                ? getAllPaymentMethodStatic?.serviceCharge
                : bbba[0]?.ourfees;
            // (sendMoney == "" ? 0 : sendMoney) >= item?.range[0].lower &&
            //   (sendMoney == "" ? 0 : sendMoney) <= item?.range[0].upper
            //   ? item?.range[0]?.ourfees
            //   : 0;
            var DCAFFC =
              bbba?.length == 0
                ? getAllPaymentMethodStatic?.serviceCharge
                : bbba[0]?.fixfees;
            // (sendMoney == "" ? 0 : sendMoney) >= item?.range[0].lower &&
            //   (sendMoney == "" ? 0 : sendMoney) <= item?.range[0].upper
            //   ? item?.range[0]?.fixfees
            //   : 0;
            var DCAAT = bbba?.length == 0 ? "amount" : bbba[0]?.type;

            var calculationServicecharge =
              bbba?.length == 0
                ? getAllPaymentMethodStatic?.serviceCharge
                : (DCAAT == "percentage"
                    ? Number(value * (bbba[0]?.charge / 100))
                    : bbba[0]?.charge) +
                  Number(bbba[0]?.ourfees) +
                  Number(bbba[0]?.fixfees);

            var DCaLowerUpperServiceCharge = {
              name: item?.type,
              serviceCharge: value === "0" || value === "" ? 0 : DCA,
              OurFees: value === "0" || value === "" ? 0 : DCAOFC,
              FixFees: value === "0" || value === "" ? 0 : DCAFFC,
              amountType: DCAAT,
              calServicecharge:
                value === "0" || value === "" ? 0 : calculationServicecharge,
            };
            LoWer123.push(DCaLowerUpperServiceCharge);
          } else {
            var bbbaa = item?.range.filter(
              (items, i) =>
                (sendMoney == "" ? 0 : sendMoney) >= items.lower &&
                (sendMoney == "" ? 0 : sendMoney) <= items.upper
            );

            var bbb =
              bbbaa.length == 0
                ? item?.range[item?.range?.length - 1]?.charge
                : bbbaa[0].charge;
            // (sendMoney == "" ? 0 : sendMoney) >= item.range[0].lower &&
            // (sendMoney == "" ? 0 : sendMoney) <= item.range[0].upper
            //   ? item.range[0].charge
            //   : item?.range[item?.range?.length - 1]?.charge;
            var DCAATT = bbbaa.length == 0 ? "amount" : bbbaa[0].type;

            var LowerUpperServiceCharge = {
              name: item.type,
              serviceCharge: value === "0" || value === "" ? 0 : bbb,
              amountType: DCAATT,
              calServicecharge: value === "0" || value === "" ? 0 : bbb,
            };

            LoWer123.push(LowerUpperServiceCharge);
          }
        });


        setPaymentLowerUpper(LoWer123);
        const Transaction_P_Data =
          location.state && location.state.TransactionData != undefined
            ? LoWer123?.filter(
                (method) =>
                  method?.name == location.state.TransactionData?.paymentMethod
              )
            : location.state && location.state.HomeScreenData != undefined
            ? LoWer123?.filter(
                (method) =>
                  method?.name == location.state.HomeScreenData?.P_Method
              )
            : 0;

        if (LoWer123.length > 0) {
          const sortedPaymentMethods =LoWer123.sort((a, b) => {
                  if (a.calServicecharge == b.calServicecharge) {
                    if (a.name === "Pay To") {
                      return -1;
                    } else if (b.name === "Pay To") {
                      return 1;
                    }
                  }
                  return a.calServicecharge - b.calServicecharge;
                })
              // : LoWer123?.filter(
              //     (method) => method?.name == Transaction_P_Data
              //   );
          let lowestServiceChargeMethod = [];
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
            } else {
              var percentageCharge =
                ((sendMoney == "" ? 0 : sendMoney) *
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
                (sendMoney == "" ? 0 : sendMoney) *
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

          if (JSON.stringify(LoWer123) != JSON.stringify(PaymentLowerUpper)) {
            if (location.state && location.state.TransactionData) {
              setPaymentName(Transaction_P_Data[0].name);
              setPaymentID(Transaction_P_Data[0].typeid);
              setDefaultPaymentMethod(Transaction_P_Data[0].name);
              setDeafultPSC(Transaction_P_Data[0].serviceCharge);
            } else if (location.state && location.state.HomeScreenData) {
              setPaymentName(Transaction_P_Data[0].name);
              setPaymentID(Transaction_P_Data[0].typeid);
              setDefaultPaymentMethod(Transaction_P_Data[0].name);
              setDeafultPSC(Transaction_P_Data[0].serviceCharge);
            } else {
              setPaymentName(sortedPaymentMethods[0].name);
              setPaymentID(sortedPaymentMethods[0].typeid);
              setDefaultPaymentMethod(sortedPaymentMethods[0].name);
              setDeafultPSC(sortedPaymentMethods[0].serviceCharge);
            }
          }
        }
      }

      if ((sendMoney == "" ? 0 : sendMoney) !== 0 || "0") {
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
              (sendMoney == "" ? 0 : sendMoney) >= items.lower &&
              (sendMoney == "" ? 0 : sendMoney) <= items.upper
          );

          var bbb =
            bbba.length == 0
              ? item?.range[item?.range?.length - 1]?.charge
              : bbba[0].charge;
          // (sendMoney == "" ? 0 : sendMoney) >= item.range[0].lower && (sendMoney == "" ? 0 : sendMoney) <= item.range[0].upper
          //   ? item.range[0].charge
          //   : item?.range[item?.range?.length - 1]?.charge;

          var LowerUpperServiceCharge = {
            typeid: item.typeid,
            name: item.type,
            serviceCharge: value === "0" || value === "" ? 0 : bbb,
          };

          DeliveryServiceChrage.push(LowerUpperServiceCharge);
        });

        setDeliveryLowerUpper(DeliveryServiceChrage);
        // debugger
        const Transaction_D_Data =
          HandleChangeDelivery != "" && HandleChangeDelivery != undefined
            ? DeliveryServiceChrage?.filter(
                (method) => method?.typeid == HandleChangeDelivery
              )
            : location.state && location.state.TransactionData != undefined
            ? DeliveryServiceChrage?.filter(
                (method) =>
                  method?.name ==
                  location.state.TransactionData?.deliveryMethodName
              )
            : location.state && location.state.ReciptionData != undefined
            ? DeliveryServiceChrage?.filter(
                (method) =>
                  method?.name ==
                  location.state.ReciptionData?.deliveryMethodName
              )
            : location.state && location.state.HomeScreenData != undefined
            ? DeliveryServiceChrage?.filter(
                (method) =>
                  method?.name == location.state.HomeScreenData?.D_Method
              )
            : "";

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

          if (
            JSON.stringify(DeliveryServiceChrage) !=
            JSON.stringify(DeliveryLowerUpper)
          ) {
            if (
              HandleChangeDelivery != "" &&
              HandleChangeDelivery != undefined
            ) {
              setDeliveryName(Transaction_D_Data[0].name);
              setDeliveryID(Transaction_D_Data[0].typeid);
              setDefaultDeliveryMethod(Transaction_D_Data[0].name);
              setDefaultDSC(Transaction_D_Data[0].serviceCharge);
              setActiveDeliveryMethodsId(Transaction_D_Data[0].typeid);
            } else if (location.state && location.state.TransactionData) {
              setDeliveryName(Transaction_D_Data[0].name);
              setDeliveryID(Transaction_D_Data[0].typeid);
              setDefaultDeliveryMethod(Transaction_D_Data[0].name);
              setDefaultDSC(Transaction_D_Data[0].serviceCharge);
              setActiveDeliveryMethodsId(Transaction_D_Data[0].typeid);
            } else if (location.state && location.state.ReciptionData) {
              setDeliveryName(Transaction_D_Data[0].name);
              setDeliveryID(Transaction_D_Data[0].typeid);
              setDefaultDeliveryMethod(Transaction_D_Data[0].name);
              setDefaultDSC(Transaction_D_Data[0].serviceCharge);
              setActiveDeliveryMethodsId(Transaction_D_Data[0].typeid);
            } else if (location.state && location.state.HomeScreenData) {
              setDeliveryName(Transaction_D_Data[0].name);
              setDeliveryID(Transaction_D_Data[0].typeid);
              setDefaultDeliveryMethod(Transaction_D_Data[0].name);
              setDefaultDSC(Transaction_D_Data[0].serviceCharge);
              setActiveDeliveryMethodsId(Transaction_D_Data[0].typeid);
            } else {
              setDeliveryName(sortData[0].name);
              setDeliveryID(sortData[0].typeid);
              setDefaultDeliveryMethod(sortData[0].name);
              setDefaultDSC(sortData[0].serviceCharge);
              setDef_D_Flag(sortData[0].serviceCharge == 0 ? 0 : 1);
              setActiveDeliveryMethodsId(sortData[0].typeid);
            }
          }
        }
      }
    } else {
      setMaxSendAmount(0);
      setMinSendAmount(0);
      setDeafultPSC(0);
      setDefaultDSC(0);
      setTotalRate(0);
      setPaymentRate(0);
      setDileveryRate(0);
      setDeliveryLowerUpper([]);
      setPaymentLowerUpper([]);
      // setNullValuePresentMessage(getServiceCharge.data?.message)
      const updatedMyPaymentamountObject = ActivePaymentMethods.map((item) => {
        return {
          ...item, // Copy the original item's properties
          serviceCharge: 0, // Update the "serviceCharge" property to 0
        };
      });
      const updatedMyDeliveryamountObject = ActiveDeliveryMethods.map(
        (item) => {
          return {
            ...item, // Copy the original item's properties
            serviceCharge: 0, // Update the "serviceCharge" property to 0
          };
        }
      );
      setActivePaymentMethods(updatedMyPaymentamountObject);
      setDefaultServiceCharge(0);
      setActiveDeliveryMethods(updatedMyDeliveryamountObject);
    }
  };

  useEffect(() => {
    var ArrayD = [];
    var RealArrayDelivery = ActiveDeliveryMethods.map(
      (DeliveryMethod, index) => {
        if (DeliveryMethod?.enabled === true) {
          var enablearray = {
            name: DeliveryMethod.name,
            serviceCharge:
              (sendMoney == "" ? 0 : sendMoney) !== 0
                ? !PaymentRate
                  ? DeliveryLowerUpper.filter(
                      (val) => val.name === DeliveryMethod.name
                    ).map((val) =>
                      val.serviceCharge
                        ? Number((Number(val.serviceCharge) + DeafultPSC)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        // ? (Number(val.serviceCharge) + DeafultPSC).toFixed(2)
                        : 0
                    )[0]
                  : DeliveryLowerUpper.filter(
                      (val) => val.name === DeliveryMethod.name
                    ).map((val) =>
                      val.serviceCharge
                        ? Number((Number(val.serviceCharge) + PaymentRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        // ? (Number(val.serviceCharge) + PaymentRate).toFixed(2)
                        : 0
                    )[0]
                : sendMoney == ""
                ? 0
                : sendMoney,
          };
          ArrayD.push(enablearray);
        }
      }
    );
    const sortedData = ArrayD.sort(
      (a, b) => parseFloat(a.serviceCharge) - parseFloat(b.serviceCharge)
    );

    const nameMap = {};
    sortedData.forEach((item) => {
      nameMap[item.name] = item;
    });

    // Sort array a based on the order in object b
    const sortedA = ActiveDeliveryMethods.sort((itemA, itemB) => {
      const nameA = itemA.name;
      const nameB = itemB.name;

      return (
        sortedData.findIndex((item) => item.name === nameA) -
        sortedData.findIndex((item) => item.name === nameB)
      );
    });

    setActiveDeliveryMethods(sortedA);
  }, [ActiveDeliveryMethods, PaymentRate, DeliveryLowerUpper, DeafultPSC]);

  useEffect(() => {
    var ArrayD = [];
    var RealArrayDelivery = ActivePaymentMethods.map((PaymentMethod, index) => {
      if (PaymentMethod?.enabled === true) {
        var enablearray = {
          name: PaymentMethod.name,
          serviceCharge:
            (sendMoney == "" ? 0 : sendMoney) !== 0
              ? !DileveryRate
                ? Number((
                    Number(
                      PaymentLowerUpper.filter(
                        (val) => val.name === PaymentMethod.name
                      ).map((val) => {
                        if (
                          val.name === "Debit Card" ||
                          val.name === "Credit Card"
                        ) {
                          if (val.amountType === "amount") {
                            var amountvalue =
                              val.serviceCharge + val.OurFees + val.FixFees;
                            return amountvalue !== 0 || amountvalue !== ""
                              ? amountvalue
                              : "0";
                          } else if (val.amountType === "percentage") {
                            var percentageCharge =
                              (sendMoney == "" ? 0 : sendMoney) *
                              (val.serviceCharge / 100);
                            return percentageCharge + val.OurFees + val.FixFees;
                          }
                        } else {
                          return (sendMoney == "" ? 0 : sendMoney) === 0
                            ? 0
                            : val.serviceCharge;
                        }
                      })
                    ) + DefaultDSC
                  )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                  // ).toFixed(2)
                : Number((
                    Number(
                      PaymentLowerUpper.filter(
                        (val) => val.name === PaymentMethod.name
                      ).map((val) => {
                        if (
                          val.name === "Debit Card" ||
                          val.name === "Credit Card"
                        ) {
                          if (val.amountType === "amount") {
                            var amountvalue =
                              val.serviceCharge + val.OurFees + val.FixFees;
                            return amountvalue !== 0 || amountvalue !== ""
                              ? amountvalue
                              : "0";
                          } else if (val.amountType === "percentage") {
                            var percentageCharge =
                              (sendMoney == "" ? 0 : sendMoney) *
                              (val.serviceCharge / 100);
                            return percentageCharge + val.OurFees + val.FixFees;
                          }
                        } else {
                          return (sendMoney == "" ? 0 : sendMoney) === 0
                            ? 0
                            : val.serviceCharge;
                        }
                      })
                    ) + DileveryRate
                  )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                  // ).toFixed(2)
              : sendMoney == ""
              ? 0
              : sendMoney,
        };
        ArrayD.push(enablearray);
      }
    });
    const sortedData = ArrayD.sort(
      (a, b) => parseFloat(a.serviceCharge) - parseFloat(b.serviceCharge)
    );

    const nameMap = {};
    sortedData.forEach((item) => {
      nameMap[item.name] = item;
    });

    // Sort array a based on the order in object b
    const sortedB = ActivePaymentMethods.sort((itemA, itemB) => {
      const nameA = itemA.name;
      const nameB = itemB.name;

      return (
        sortedData.findIndex((item) => item.name === nameA) -
        sortedData.findIndex((item) => item.name === nameB)
      );
    });

    setActivePaymentMethods(sortedB);
  }, [ActivePaymentMethods, DileveryRate, PaymentLowerUpper, DefaultDSC]);

  const [Bus_Age_PopupMessage, setBus_Age_PopupMessage] = useState(
    "Your KYC details are not verified please Upload your document again to do the transaction."
  );

  const saveTransaction = () => {
    axios
      .post(CommonConstants.BASE_URL + "/getuserinfobyid", {
        id: localStorage.getItem("Id"),
      })
      .then((respo) => {
        setUserData(respo.data.data);
        GetIdTypeByCountryId(respo.data.data?.countryId);
        if (respo.data.data.role == "Business") {
          var KYC_Case = respo.data.data?.userkycdetails?.kycCase;
          var OtherDocument = respo.data.data?.businessDocuments?.length;
          if (
            KYC_Case === 1 ||
            KYC_Case === 2 ||
            KYC_Case === 3 ||
            OtherDocument == 0
          ) {
            if (KYC_Case == 1) {
              setVerifyRefralPOPUP(true);
              setVerifyOtherDocument(OtherDocument == 0 ? true : false);
              setVerifyKYCDocument(true);
              setBus_Age_PopupMessage(
                "Your KYC details are not verified please Upload your document again to do the transaction."
              );
            } else if (KYC_Case == 2) {
              setVerifyRefralPOPUP(true);
              setVerifyOtherDocument(OtherDocument == 0 ? true : false);
              setVerifyKYCDocument(true);
              setBus_Age_PopupMessage(
                "It seems you did not upload documents when registering, so please upload them now to do the transaction."
              );
            } else if (KYC_Case == 3) {
              setVerifyRefralPOPUP(true);
              setVerifyOtherDocument(OtherDocument == 0 ? true : false);
              setVerifyKYCDocument(true);
              setBus_Age_PopupMessage(
                "Your Id documents are expired, Please upload them again to do the transaction."
              );
            } else if (OtherDocument == 0) {
              setVerifyRefralPOPUP(true);
              setVerifyOtherDocument(OtherDocument == 0 ? true : false);
              setVerifyKYCDocument(false);
              setBus_Age_PopupMessage(
                "Your Other documents is not upload please Upload your other document to do the transaction."
              );
            }
          } else {
            backDisplay(false);
            const TotalserviceCharge =
              TotalRate == 0 ? DeafultPSC + DefaultDSC : TotalRate;
            const sendingCurrencyCode = flagSelect ? flagSelect?.currency : "";
            const recevingCurrencyCode = flagSelect1
              ? flagSelect1?.currency
              : "";
            const paymentMethod = PaymentName
              ? PaymentName
              : defaultPaymentMethod;
            const DeliveryMethod = DeliveryName
              ? DeliveryName
              : defaultDeliveryMethod;

            FirstStepdata({
              userId: Number(localStorage.getItem("Id")),
              recipientId: "",
              sendingCurrencyCode: `${sendingCurrencyCode}`,
              recevingCurrencyCode: `${recevingCurrencyCode}`,
              sendingCountryId: ID,
              recevingCountryId: Id2,
              amount: Number(sendMoney == "" ? 0 : sendMoney),
              SendingCurrancy: flagSelect?.currency,
              RecivingCurrancy: flagSelect1?.currency,
              DileveryRate: !DileveryRate ? DefaultDSC : DileveryRate,
              totalPayable: Number((
                TotalRate == 0
                  ? parseFloat(DeafultPSC + DefaultDSC) +
                      parseFloat(sendMoney == "" ? 0 : sendMoney)
                  : TotalRate && (sendMoney == "" ? 0 : sendMoney)
                  ? parseFloat(TotalRate) +
                    parseFloat(sendMoney == "" ? 0 : sendMoney)
                  : 0
                )?.toString()?.match(/^\d+(?:\.\d{0,2})?/)),
                // ).toFixed(2),
              discountedAmount:
                BenifitonExchangeRateandServiceCharge == 0 &&
                usedcasebalanceflag == false
                  ? 0
                  : Number((
                      TotalRate == 0
                        ? parseFloat(DeafultPSC + DefaultDSC) +
                            (usedcasebalanceflag
                              ? parseFloat(sendMoney == "" ? 0 : sendMoney) -
                                parseFloat(
                                  UserUsedCaseBalance == ""
                                    ? 0
                                    : UserUsedCaseBalance
                                )
                              : parseFloat(sendMoney == "" ? 0 : sendMoney)) -
                            parseFloat(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                            // parseFloat(BenifitonExchangeRateandServiceCharge.toFixed(2))
                        : TotalRate && (sendMoney == "" ? 0 : sendMoney)
                        ? parseFloat(TotalRate) +
                          (usedcasebalanceflag
                            ? parseFloat(sendMoney == "" ? 0 : sendMoney) -
                              parseFloat(
                                UserUsedCaseBalance == ""
                                  ? 0
                                  : UserUsedCaseBalance
                              )
                            : parseFloat(sendMoney == "" ? 0 : sendMoney)) -
                          parseFloat(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                          // parseFloat(BenifitonExchangeRateandServiceCharge.toFixed(2))
                        : 0
                    )?.toString()?.match(/^\d+(?:\.\d{0,3})?/)),
                    // ).toFixed(3),
              receivingAmount: Number((receiveMoney)?.toString()?.match(/^\d+(?:\.\d{0,3})?/)),
              // receivingAmount: Number(receiveMoney).toFixed(2),
              exchangeRate: toCountry,
              serviceCharge: TotalserviceCharge,
              deliveryMethodId: ActiveDeliveryMethodsId,
              transactionStatusId: 1,
              transferPurposeId: "",
              userTrnsCount: 0,
              estimatetime: estimateTimes,
              userTrnsAmountSum: 0,
              recTrnsCount: 0,
              paymentMethod: `${paymentMethod}`,
              DeliveryMethod: `${DeliveryMethod}`,
              promoCode: Promocode,
              promoCodeServiceChargeDiscAmt:
                BenifitonExchangeRateandServiceChargeName == "(ServiceCharge)"
                  ? Number(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                  // ? BenifitonExchangeRateandServiceCharge.toFixed(2)?.toString()?.match(/^\d+(?:\.\d{0,3})?/)
                  : 0.0,
              promoCodeExRateDiscAmt:
                BenifitonExchangeRateandServiceChargeName == "(ExchangeRate)"
                  ? Number(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                  // ? BenifitonExchangeRateandServiceCharge.toFixed(2)
                  : 0.0,
              usedCash: usedcasebalanceflag
                ? parseFloat(
                    UserUsedCaseBalance == "" ? 0 : UserUsedCaseBalance
                  )
                : 0,
              usedCashFlag: usedcasebalanceflag,
              cashBenefit: BenifitonCase,
              pointBenefit: getPoints,
              transactionPaymentStatusId: 0,
              assignedUserId: 0,
              CountryID: respo.data.data.countryId,
              PromoCodeDiscount: Number(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/)),
              // PromoCodeDiscount: BenifitonExchangeRateandServiceCharge.toFixed(2),
              PromoCodeDiscountBenifitName:
                BenifitonExchangeRateandServiceChargeName,
              premimumExId: PremiumExchangerateId,
              premimumExRate: PremiumExchangerate,
              premimumExAmt: PremiumExchangerateAmount,
            });
            handleShowVerifys();
            if (TransactionIDUpdate != undefined) {
              updateTransactionDetils();
            }
          }
        } else {
          backDisplay(false);
          const TotalserviceCharge =
            TotalRate == 0 ? DeafultPSC + DefaultDSC : TotalRate;
          const sendingCurrencyCode = flagSelect ? flagSelect.currency : "";
          const recevingCurrencyCode = flagSelect1 ? flagSelect1.currency : "";

          const paymentMethod = PaymentName
            ? PaymentName
            : defaultPaymentMethod;
          const DeliveryMethod = DeliveryName
            ? DeliveryName
            : defaultDeliveryMethod;

          FirstStepdata({
            userId: Number(localStorage.getItem("Id")),
            recipientId: "",
            sendingCurrencyCode: `${sendingCurrencyCode}`,
            recevingCurrencyCode: `${recevingCurrencyCode}`,
            sendingCountryId: ID,
            recevingCountryId: Id2,
            amount: Number(sendMoney == "" ? 0 : sendMoney),
            SendingCurrancy: flagSelect?.currency,
            RecivingCurrancy: flagSelect1?.currency,
            DileveryRate: !DileveryRate ? DefaultDSC : DileveryRate,
            totalPayable: Number((
              TotalRate == 0
                ? parseFloat(DeafultPSC + DefaultDSC) +
                    parseFloat(sendMoney == "" ? 0 : sendMoney)
                : TotalRate && (sendMoney == "" ? 0 : sendMoney)
                ? parseFloat(TotalRate) +
                  parseFloat(sendMoney == "" ? 0 : sendMoney)
                : 0
            )?.toString()?.match(/^\d+(?:\.\d{0,2})?/)),
            // ).toFixed(2),
            receivingAmount: Number((receiveMoney)?.toString()?.match(/^\d+(?:\.\d{0,2})?/)),
            // receivingAmount: Number(receiveMoney).toFixed(2),
            usedCash: usedcasebalanceflag
              ? parseFloat(UserUsedCaseBalance == "" ? 0 : UserUsedCaseBalance)
              : 0,
            usedCashFlag: usedcasebalanceflag,
            exchangeRate: toCountry,
            serviceCharge: TotalserviceCharge,
            deliveryMethodId: ActiveDeliveryMethodsId,
            transactionStatusId: 1,
            transferPurposeId: "",
            userTrnsCount: 0,
            estimatetime: estimateTimes,
            userTrnsAmountSum: 0,
            recTrnsCount: 0,
            paymentMethod: `${paymentMethod}`,
            DeliveryMethod: `${DeliveryMethod}`,
            promoCode: Promocode,
            FromDate: "",
            ToDate: "",
            promoCodeServiceChargeDiscAmt:
              BenifitonExchangeRateandServiceChargeName == "(ServiceCharge)"
                ? Number(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                // ? BenifitonExchangeRateandServiceCharge.toFixed(2)
                : 0.0,
            promoCodeExRateDiscAmt:
              BenifitonExchangeRateandServiceChargeName == "(ExchangeRate)"
                ? Number(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                // ? BenifitonExchangeRateandServiceCharge.toFixed(2)
                : 0.0,
            cashBenefit: BenifitonCase,
            pointBenefit: getPoints,
            discountedAmount:
              BenifitonExchangeRateandServiceCharge == 0 &&
              usedcasebalanceflag == false
                ? 0
                : Number(Number(
                    TotalRate == 0
                      ? parseFloat(DeafultPSC + DefaultDSC) +
                          (usedcasebalanceflag
                            ? parseFloat(sendMoney == "" ? 0 : sendMoney) -
                              parseFloat(
                                UserUsedCaseBalance == ""
                                  ? 0
                                  : UserUsedCaseBalance
                              )
                            : parseFloat(sendMoney == "" ? 0 : sendMoney)) -
                          parseFloat(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                          // parseFloat(BenifitonExchangeRateandServiceCharge.toFixed(2))?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      : TotalRate && (sendMoney == "" ? 0 : sendMoney)
                      ? parseFloat(TotalRate) +
                        (usedcasebalanceflag
                          ? parseFloat(sendMoney == "" ? 0 : sendMoney) -
                            parseFloat(
                              UserUsedCaseBalance == ""
                                ? 0
                                : UserUsedCaseBalance
                            )
                          : parseFloat(sendMoney == "" ? 0 : sendMoney)) -
                        parseFloat(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        // parseFloat(BenifitonExchangeRateandServiceCharge.toFixed(2))
                      : 0
                  )?.toString()?.match(/^\d+(?:\.\d{0,2})?/)),
                  // ).toFixed(3),
            transactionPaymentStatusId: 0,
            assignedUserId: 0,
            CountryID: respo.data.data.countryId,
            PromoCodeDiscount: Number(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/)),
            // PromoCodeDiscount: BenifitonExchangeRateandServiceCharge.toFixed(2),
            PromoCodeDiscountBenifitName:
              BenifitonExchangeRateandServiceChargeName,
            premimumExId: PremiumExchangerateId,
            premimumExRate: PremiumExchangerate,
            premimumExAmt: PremiumExchangerateAmount,
          });

          handleShowVerifys();
          if (TransactionIDUpdate != undefined) {
            updateTransactionDetils();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTransactionDetils = async () => {
    if (TransactionIDUpdate != undefined) {
      setloadervalue(true);
      backDisplay(false);
      const TotalserviceCharge =
        TotalRate == 0 ? DeafultPSC + DefaultDSC : TotalRate;
      const sendingCurrencyCode = flagSelect ? flagSelect.currency : "";
      const recevingCurrencyCode = flagSelect1 ? flagSelect1.currency : "";
      const paymentMethod = PaymentName ? PaymentName : defaultPaymentMethod;

      const getTransactionInfo = await axios.post(
        CommonConstants.NEW_BASE_URL + "/gettransactionbyid",
        { id: TransactionIDUpdate }
      );
      // const data = {
      //   id: getTransactionInfo.data.data.recipientId != 0 || getTransactionInfo.data.data.recipientId != "" ? getTransactionInfo.data.data.recipientId: location.state?.TransactionData != undefined ? location.state?.TransactionData?.id : "" ,
      //   userId: Number(localStorage.getItem("Id")),
      //   recipientId: getTransactionInfo.data.data.recipientId,
      //   sendingCurrencyCode: `${sendingCurrencyCode}`,
      //   recevingCurrencyCode: `${recevingCurrencyCode}`,
      //   sendingCountryId: ID,
      //   recevingCountryId: Id2,
      //   partnerBankId: "",
      //   amount: Number((sendMoney == "" ? 0 : sendMoney)),
      //   totalPayable: Number(
      //     TotalRate == 0
      //       ? parseFloat(DeafultPSC + DefaultDSC) +
      //           parseFloat((sendMoney == "" ? 0 : sendMoney))
      //       : TotalRate && (sendMoney == "" ? 0 : sendMoney)
      //       ? parseFloat(TotalRate) +
      //         parseFloat((sendMoney == "" ? 0 : sendMoney))
      //       : 0
      //   ).toFixed(2),
      //   receivingAmount: Number(receiveMoney),
      //   exchangeRate: toCountry,
      //   serviceCharge: TotalserviceCharge,
      //   deliveryMethodId: dynamicDeliveryID
      //     ? dynamicDeliveryID
      //     : ActiveDeliveryMethodsId,
      //   transactionStatusId: 1,
      //   paymentRequestUuid: "",
      //   paytoAgreementUuid: "",
      //   stepNo: 1,
      //   otherDetails: "",
      //   transferPurposeId: getTransactionInfo.data.data.transferPurposeId,
      //   userTrnsCount: 0,
      //   userTrnsAmountSum: 0,
      //   recTrnsCount: 0,
      //   paymentMethod: `${paymentMethod}`,
      //   promoCode: Promocode,
      //   promoCodeServiceChargeDiscAmt: BenifitonExchangeRateandServiceChargeName == "(ServiceCharge)" ? BenifitonExchangeRateandServiceCharge : 0.0 ,
      //   promoCodeExRateDiscAmt: BenifitonExchangeRateandServiceChargeName ==  "(ExchangeRate)" ? BenifitonExchangeRateandServiceCharge : 0.0,
      //   cashBenefit: BenifitonCase,
      //   pointBenefit: getPoints,
      //   discountedAmount:BenifitonExchangeRateandServiceCharge == 0 ? 0 : Number(
      //     TotalRate == 0
      //       ? parseFloat(DeafultPSC + DefaultDSC) +
      //           parseFloat((sendMoney == "" ? 0 : sendMoney)) -
      //           parseFloat(BenifitonExchangeRateandServiceCharge)
      //       : TotalRate && (sendMoney == "" ? 0 : sendMoney)
      //       ? parseFloat(TotalRate) +
      //         parseFloat((sendMoney == "" ? 0 : sendMoney)) -
      //         parseFloat(BenifitonExchangeRateandServiceCharge)
      //       : 0
      //   ).toFixed(3),
      //   transactionPaymentStatusId: 0,
      //   paymentNote: getTransactionInfo.data.data.paymentNote,
      //   assignedUserId: 0,
      //   deleteAt: "",
      //   source: "",
      //   email: getTransactionInfo.data.data.email,
      // };

      const data = {
        id:
          getTransactionInfo.data.data.recipientId != 0 ||
          getTransactionInfo.data.data.recipientId != ""
            ? getTransactionInfo.data.data.recipientId
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.id
            : "",
        userId: localStorage.getItem("Id")
          ? Number(localStorage.getItem("Id"))
          : location.state?.TransactionData != undefined
          ? location.state?.TransactionData?.userId
          : "",
        recipientId:
          getTransactionInfo.data.data.recipientId != ""
            ? getTransactionInfo.data.data.recipientId
              ? getTransactionInfo.data.data.recipientId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.recipientId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.recipientId
            : "",
        sendingCurrencyCode: `${sendingCurrencyCode}`,
        recevingCurrencyCode: `${recevingCurrencyCode}`,
        sendingCountryId: ID,
        recevingCountryId: Id2,
        partnerBankId: 3544,
        amount: Number(sendMoney == "" ? 0 : sendMoney),
        totalPayable: Number((
          TotalRate == 0
            ? parseFloat(DeafultPSC + DefaultDSC) +
                parseFloat(sendMoney == "" ? 0 : sendMoney)
            : TotalRate && (sendMoney == "" ? 0 : sendMoney)
            ? parseFloat(TotalRate) +
              parseFloat(sendMoney == "" ? 0 : sendMoney)
            : 0
        )?.toString()?.match(/^\d+(?:\.\d{0,2})?/)),
        // ).toFixed(2),
        receivingAmount: Number(receiveMoney?.toString()?.match(/^\d+(?:\.\d{0,2})?/)),
        exchangeRate: toCountry,
        serviceCharge: TotalserviceCharge,
        deliveryMethodId: ActiveDeliveryMethodsId,
        transactionStatusId: 1,
        paymentRequestUuid: "",
        paytoAgreementUuid: "",
        stepNo: 1,
        otherDetails: "",
        transferPurposeId:
          getTransactionInfo.data.data.transferPurposeId != ""
            ? getTransactionInfo.data.data.transferPurposeId
              ? getTransactionInfo.data.data.transferPurposeId
              : location.state?.TransactionData != undefined
              ? location.state?.TransactionData?.transferPurposeId
              : ""
            : location.state?.TransactionData != undefined
            ? location.state?.TransactionData?.transferPurposeId
            : "",
        userTrnsCount: 0,
        userTrnsAmountSum: 0,
        recTrnsCount: 0,
        paymentMethod: `${paymentMethod}`,
        promoCode: Promocode,
        promoCodeServiceChargeDiscAmt:
          BenifitonExchangeRateandServiceChargeName == "(ServiceCharge)"
            ? Number(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
            // ? BenifitonExchangeRateandServiceCharge.toFixed(2)
            : 0.0,
        promoCodeExRateDiscAmt:
          BenifitonExchangeRateandServiceChargeName == "(ExchangeRate)"
            ? Number(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
            // ? BenifitonExchangeRateandServiceCharge.toFixed(2)
            : 0.0,
        usedCash: usedcasebalanceflag
          ? parseFloat(UserUsedCaseBalance == "" ? 0 : UserUsedCaseBalance)
          : 0,
        // usedCashFlag : usedcasebalanceflag,
        cashBenefit: BenifitonCase,
        pointBenefit: getPoints,
        discountedAmount:
          BenifitonExchangeRateandServiceCharge == 0 &&
          usedcasebalanceflag == false
            ? 0
            : Number((
                TotalRate == 0
                  ? parseFloat(DeafultPSC + DefaultDSC) +
                      (usedcasebalanceflag
                        ? parseFloat(sendMoney == "" ? 0 : sendMoney) -
                          parseFloat(
                            UserUsedCaseBalance == "" ? 0 : UserUsedCaseBalance
                          )
                        : parseFloat(sendMoney == "" ? 0 : sendMoney)) -
                      parseFloat(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      // parseFloat(BenifitonExchangeRateandServiceCharge.toFixed(2))
                  : TotalRate && (sendMoney == "" ? 0 : sendMoney)
                  ? parseFloat(TotalRate) +
                    (usedcasebalanceflag
                      ? parseFloat(sendMoney == "" ? 0 : sendMoney) -
                        parseFloat(
                          UserUsedCaseBalance == "" ? 0 : UserUsedCaseBalance
                        )
                      : parseFloat(sendMoney == "" ? 0 : sendMoney)) -
                    parseFloat(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                    // parseFloat(BenifitonExchangeRateandServiceCharge.toFixed(2))
                  : 0
              )?.toString()?.match(/^\d+(?:\.\d{0,2})?/)),
              // ).toFixed(3),
        transactionPaymentStatusId: 0,
        paymentNote: getTransactionInfo.data.data.paymentNote,
        assignedUserId: 0,
        deleteAt: "",
        source: "",
        email: getTransactionInfo.data.data.email,
        premimumExId: PremiumExchangerateId,
        premimumExRate: PremiumExchangerate,
        premimumExAmt: PremiumExchangerateAmount,
      };

      axios
        .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
        .then((res) => {
          if (res.data.statuscode == 200) {
            handleShowVerifys();
            setloadervalue(false);
            Moneychange(Number(sendMoney == "" ? 0 : sendMoney))
          }
        })
        .catch((err) => {
          setloadervalue(false);
        });
    }
  };

  const CountinueTransaction = null;
  useEffect(() => {
    GetUsedDetails();

    // if(CountinueTransaction == undefined){
    if (CountinueTransaction === null) {
      const CountinueTransaction = location?.state;

      // FirstStepdata({
      //   "userId": Number(localStorage.getItem('Id')),
      //   "recipientId": "",
      //   "sendingCurrencyCode": `${sendingCurrencyCode}`,
      //   "recevingCurrencyCode": `${recevingCurrencyCode}`,
      //   "sendingCountryId": ID,
      //   "recevingCountryId": Id2,
      //   "amount": Number((sendMoney == "" ? 0 : sendMoney)),
      //   "SendingCurrancy": flagSelect?.currency,
      //   "RecivingCurrancy": flagSelect1?.currency,
      //   "DileveryRate": !DileveryRate ? DefaultDSC : DileveryRate,
      //   "totalPayable": Number(TotalRate == 0 ? (parseFloat(DeafultPSC + DefaultDSC) + parseFloat((sendMoney == "" ? 0 : sendMoney)) - parseFloat(Promocode)) : (TotalRate && (sendMoney == "" ? 0 : sendMoney) ? parseFloat(TotalRate) + parseFloat((sendMoney == "" ? 0 : sendMoney)) - parseFloat(Promocode) : 0)).toFixed(2),
      //   "receivingAmount": Number(receiveMoney).toFixed(2),
      //   "exchangeRate": toCountry,
      //   "serviceCharge": TotalserviceCharge,
      //   "deliveryMethodId": dynamicDeliveryID ? dynamicDeliveryID :ActiveDeliveryMethodsId,
      //   "transactionStatusId": 1,
      //   "transferPurposeId": "",
      //   "userTrnsCount": 0,
      //   "estimatetime":estimateTimes,
      //   "userTrnsAmountSum": 0,
      //   "recTrnsCount": 0,
      //   "paymentMethod": `${paymentMethod}`,
      //   "DeliveryMethod": `${DeliveryMethod}`,
      //   "promoCodeServiceChargeDiscAmt": 0.0,
      //   "promoCodeExRateDiscAmt": 0.0,
      //   "transactionPaymentStatusId": 0,
      //   "assignedUserId": 0,
      // })
    }
  }, []);

  const getTooltipContent = (paymentMethod) => {
    switch (paymentMethod) {
      case "Wallet Deposit":
        return "This is an emerging way of remittance transactions. With this option, recipients receive funds in their wallet account within a matter of minutes.";
      case "Cash Pickup":
        return "This user-friendly option allows recipients to swiftly collect cash from our authorized payout agent's outlet, ensuring access within mere minutes.";
      case "Bank Deposit":
        return "This user-friendly option allows recipients to swiftly collect cash from our authorized payout agent's outlet, ensuring access within mere minutes.";
      default:
        return "default method";
    }
  };

  const getTooltipContent1 = (paymentMethod) => {
    switch (paymentMethod) {
      case "wallet deposit":
        return "Tooltip content for wallet deposit method.";
      case "cash pickup":
        return "Tooltip content for cash pickup method.";
      case "bank deposit":
        return "Tooltip content for bank deposit method.";
      case "Pay Id":
        return "Widely adopted payment method in Australia. Senders can send money to mobile numbers and emails from their mobile app with ease. Most of the PayID transactions are done in real-time. An ideal choice for those who don’t want to use their card details online.";
      case "Bank Transfer":
        return "A traditional payment method, where you can transfer money to our account from your internet/mobile banking. Normally this payment method takes a longer time for funds to be received. But this is the cheapest method for making payments. ";
      case "Credit Card":
        return "Easier method to make payments. Where you can use your Visa and Master card credit cards for payments. This method charges higher service fees.         ";
      case "Pay To":
        return "The most convenient payment method. Where users make payments using their BSB account number or using PayID. This is based on a direct debit agreement and most of the transaction are done in real-time. This is a cheaper method compared to card payments.";
      default:
        return "Default tooltip content.";
    }
  };

  return (
    <>
      <section>
        {loadervalue == true ? <Loader /> : ""}
        <Container>
          <Form id="Sendmoney_Step1">
            <Row className="respoChildFooter">
              <Col className="col-lg-12">
                <h1 className="purpleText bolder text-center mt-3 pt-3 pb-3">
                  Send Money
                </h1>
              </Col>
              <Col className="col-lg-12 flex-column m-auto d-flex justify-content-center text-center ">
                <div className="smd pb-3">
                  <div className="responsiveFontLarge  text-black text-center medium">
                    Calculate amount of money to be transferred
                  </div>
                </div>
              </Col>
              <Container>
                <Col className="pt-3 noPadding">
                  <div className="mainMoneyBox py-4">
                    <div className={`firstMoneyBox me-3 ms-3 ${maxSendingAmount ? 'custom_send_money_error' : ''}`}>
                      <InputGroup className="my-2 align-items-center ">
                        <div className="countryFlag ms-3 img-fluid">
                          {flagSelect && (
                            <img
                              src={`https://flagcdn.com/40x30/${flagSelect.iso2.toLowerCase()}.png`}
                              alt={flagSelect.iso2}
                              style={{ width: "30px", marginRight: "5px" }}
                            />
                          )}
                        </div>
                        <div className="position-relative d-flex mt-2 justify-content-between">
                          <div
                            className="moneyBoxLabel"
                            style={{
                              position: "absolute",
                              top: "-3px",
                              left: "3px",
                              padding: "0 5px",
                            }}
                          >
                            You Send
                          </div>{" "}
                          {/* Label */}
                          <Form.Control
                            style={{ fontSize: 22, fontWeight: "bold" }}
                            aria-label="Text input with dropdown button"
                            className="bg-transparent moneysentvalue textInputMoney border-0 mt-2"
                            placeholder="0"
                            value={sendMoney} //focus ? convertCountryAmount((sendMoney == "" ? 0 : sendMoney)) : (sendMoney == "" ? 0 : sendMoney)}
                            min={0}
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
                              // handlesetPromocodeLimit(cleanedValue)
                              // setTemp(cleanedValue);
                              setsendMoney(cleanedValue);
                              setMoney(
                                cleanedValue,
                                toCountry,
                                PremiumExchangerateAmount,
                                PremiumExchangerate
                              );
                              if ((cleanedValue > MaxSendAmount) || cleanedValue <= MinSendAmount) {
                                setmaxSendingAmount(true);
                              } else {
                                setmaxSendingAmount(false);
                              }
                            }}
                            onBlur={(e) => {
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
                              setMoneySummurry(e);
                              GetUsedBalance(
                                UserDetails?.id,
                                UserDetails?.countryId,
                                cleanedValue
                              );
                              handlesetPromocodeLimit(cleanedValue);

                              // if(cleanedValue >= MaxSendAmount){
                              //   setmaxSendingAmountPopUp(true)
                              // }else{
                              //   setmaxSendingAmountPopUp(false)
                              // }
                            }}
                            onFocus={(e) => setFocus(false)}
                          />

                        </div>
                        <div className="d-flex ms-auto">
                          <Form.Select
                            className="select-country bolder text-black"
                            value={flagSelect && flagSelect.currency}
                            aria-label="Default select example"
                            name="SMfromCountry"
                            onChange={handleFlagSelect}
                          >
                            {countries.map((val, index) => {
                              return (
                                <option
                                  key={index}
                                  defaultValue={flagSelect ? flagSelect.id : ""}
                                >
                                  {val.currency}
                                </option>
                              );
                            })}
                          </Form.Select>
                          <div className="caretDRP"></div>
                        </div>
                      </InputGroup>

                    </div>
                    {maxSendingAmount ? <small className='error text-danger pl-4' > Amount should range between {MinSendAmount}  {flagSelect ? flagSelect.currency : ""} - {MaxSendAmount}  {flagSelect ? flagSelect.currency : ""} </small> : ''}


                    <div className="secondMoneyBox my-4 py-3">
                      <div className="text-white text-center excText responsiveFontLarge">
                        Exchange rate:
                        <b className="bolder responsiveFontLarge">
                          {fromCountry} {flagSelect ? flagSelect.currency : ""}{" "}
                          = {toCountry}{" "}
                          {flagSelect1 ? flagSelect1.currency : ""}
                        </b>{" "}
                        (Locked for {minutes}:
                        {seconds < 10 ? `0${seconds}` : seconds})
                      </div>
                    </div>

                    <div className="firstMoneyBox me-3 ms-3">
                      <InputGroup className="my-2 align-items-center">
                        <div className="countryFlag ms-3 img-fluid">
                          {/* {flagSelect1 && flagSelect1.emoji} */}
                          {flagSelect1 && (
                            <img
                              src={`https://flagcdn.com/40x30/${flagSelect1.iso2?.toLowerCase()}.png`}
                              alt={flagSelect1.iso2}
                              style={{ width: "30px", marginRight: "5px" }}
                            />
                          )}
                        </div>
                        <div className="position-relative mt-2 d-flex justify-content-between">
                          <div
                            className="moneyBoxLabel"
                            style={{
                              position: "absolute",
                              top: "-3px",
                              left: "3px",
                              padding: "0 5px",
                            }}
                          >
                            They Receive
                          </div>{" "}
                          {/* Label */}
                          <Form.Control
                            style={{ fontSize: 22, fontWeight: "bold" }}
                            aria-label="Text input with dropdown button"
                            className="bg-transparent moneysentvalue mt-2 textInputMoney border-0"
                            placeholder="0"
                            value={receiveMoney}
                            // value={
                            //   focus
                            //     ? receiveMoney
                            //     : ConvertNepaltoaus(temp) === "NaN"
                            //     ? 0
                            //     : ConvertNepaltoaus(temp)
                            // }
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
                            onBlur={(e) => {
                              let value = e.target.value;
                              const newValu = value.replace(/[^0-9.]/g, "");
                              var cleanedValue = newValu.replace(
                                /\./g,
                                function (match, offset, input) {
                                  return offset === input.indexOf(".")
                                    ? match
                                    : "";
                                }
                              );
                              if (
                                !isNaN(cleanedValue) &&
                                isFinite(cleanedValue)
                              ) {
                                setReciveMoney(cleanedValue, toCountry);
                                let Sendingvalue = Number((
                                  cleanedValue / toCountry
                                )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                // ).toFixed(2);

                                handlesetPromocodeLimit(Sendingvalue);
                              }
                            }}
                            onFocus={(e) => setFocus(true)}
                          />
                        </div>

                        <div className="d-flex ms-auto">
                          <Form.Select
                            className="select-country bolder text-black"
                            value={flagSelect1 && flagSelect1.currency}
                            aria-label="Default select example"
                            name="SMtoCountry"
                            onChange={
                              handleFlagSelect1
                              // }
                            }
                          >
                            {flagSelect1FlagList.map((flag, index) => (
                              <option
                                key={index}
                                defaultValue={flagSelect1 ? flag.id : ""}
                              >
                                {flag.currency}
                              </option>
                            ))}
                          </Form.Select>
                          <div className="caretDRP"></div>
                        </div>
                      </InputGroup>
                    </div>
                  </div>
                  {/* PremiumExchangerateAmount == 0 || PremiumExchangerate == 0 ? "d-none": */}
                  {/* {console.log(flagSelect1FlagList,flagSelect1 && flagSelect1.currency,flagSelect1FlagList.filter((Countryy) => Countryy.currency == flagSelect1.currency),"Country")} */}
                  <p
                    className={
                      PremiumExchangerateAmount == 0 || PremiumExchangerate == 0
                        ? "d-none"
                        : `text-center PremiumExchangerateNote m-0 bolder`
                    }
                  >
                    You are Eligible for {PremiumExchangerate} Premium Exchange
                    Rate upto ${PremiumExchangerateAmount} for{" "}
                    {
                      flagSelect1FlagList.find(
                        (country) => country?.currency == flagSelect1?.currency
                      )?.name
                    }
                  </p>
                </Col>
              </Container>

              <Container>
                <Col className="pt-3 pb-3">
                  <div className="mainMoneyBox">
                    <div className=" py-4 ">
                      <div className="d-flex align-items-center justify-content-between  pe-4 ps-4">
                        <div className="d-flex align-items-center responsiveFontLarge  textInputMoney border-0 text-black-50 bolder ">
                          <img src={card} className="img-fluid" alt="" />
                          <div className="ps-2">
                            {!DeliveryName.length == 0
                              ? DeliveryName
                              : defaultDeliveryMethod}
                          </div>
                        </div>
                        <div
                          className="d-flex align-items-center justify-content-end ps-4"
                          onClick={handleShowDelivery}
                        >
                          <div className="responsiveFontLarge textGray bolder  me-2 purpleText bolder pointer">
                            Change
                          </div>
                          <Tooltip
                            placement="top"
                            title='The "Delivery Method" refers to the manner in which you wish to transmit funds to your designated recipient. You have the option to select the preferred delivery method of your recipient.'
                          >
                            <img src={info} className="img-fluid" alt="" />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 pb-4 d-flex justify-content-between align-items-center ">
                      <div className="d-flex align-items-center  pe-4 ps-4">
                        <img src={card} className="img-fluid" alt="" />
                        <Form.Control
                          aria-label="Text input with dropdown button"
                          className="bg-transparent paymentMethod textInputMoney border-0 text-black-50 bolder py-0"
                          placeholder="They Receive"
                          readOnly
                          value={
                            !PaymentName.length == 0
                              ? PaymentName
                              : defaultPaymentMethod
                          }
                        />
                      </div>
                      <div
                        className="d-flex align-items-center justify-content-end pe-4 ps-4"
                        onClick={handleShowPayment}
                      >
                        <div className="responsiveFontLarge textGray bolder me-2 purpleText bolder pointer">
                          Change
                        </div>
                        <Tooltip
                          placement="top"
                          title='The "Payment Method" is a mechanism through which you can remit payments to Legal Remit. You have the flexibility to select a payment option that aligns with your convenience.'
                        >
                          <img src={info} className="img-fluid" alt="" />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="promoPLeft">
                  <div className="pe-4 ps-4 pt-2 pb-4 d-flex justify-content-between align-items-center">
                    <div
                      className="d-flex align-items-center pointer"
                      onClick={() => setModalShow(true)}
                    >
                      <img src={gift} className="img-fluid" alt="" />
                      <div className="responsiveFontLarge  purpleText bolder ms-2 ">
                        Apply Promocode
                      </div>
                      <Tooltip
                        placement="top"
                        title="Redeem your rewards and get discounts on your every transfer.
                            Please note that promo codes are subject to terms and conditions, and expiry dates may apply. Make the most of your shopping experience by using valid promo codes today!"
                      >
                        <img src={info} className="img-fluid" alt="" />
                      </Tooltip>
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        className={
                          Promocode != ""
                            ? //  ||
                              // (PromoCodeVerify &&
                              //   location.state?.TransactionData &&
                              //   location.state?.TransactionData?.promoCode != 0)
                              `PromoCodeBox bolder p-1 purpleText px-3`
                            : ""
                        }
                      >
                        {Promocode != ""
                          ? Promocode
                          : // : PromoCodeVerify &&
                            //   location.state?.TransactionData ?
                            //   location.state?.TransactionData?.promoCode
                            ""}
                      </div>
                      <div>
                        <RemoveCircle
                          className={
                            Promocode != ""
                              ? "text-danger ms-2 pointer"
                              : "d-none"
                          }
                          onClick={(e) => {
                            setRemovebtn(0);
                            setPromocode("");
                            setBenifitonCase(0);
                            setgetPoints(0);
                            setAppliedPromoCode("noData");
                            setBenifitonExchangeRateandServiceCharge(0);
                            setBenifitonExchangeRateandServiceChargeName("");
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="promoPLeft">
                  <div className="pe-4 ps-4 pt-2 pb-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center  ">
                      <img src={timer} className="img-fluid" alt="" />
                      <div className="responsiveFontLarge  successText  ms-2">
                        Estimated Delivery time
                      </div>
                      <Tooltip
                        placement="top"
                        title="This is an estimation based on normal scenarios . Our 99% of transactions get delivered within this time frame."
                      >
                        <img src={info} className="img-fluid" alt="" />
                      </Tooltip>
                    </div>
                    <div className="responsiveFontLarge  successTextModel text-end bolder ms-2 pe-4 ps-4">
                      {ActiveDeliveryMethods.find(
                        (item) =>
                          item.name ===
                          (!DeliveryName?.length == 0
                            ? DeliveryName
                            : defaultDeliveryMethod)
                      )?.estimatedDelivery == (undefined || "")
                        ? "Few Hours"
                        : ActiveDeliveryMethods.find(
                            (item) =>
                              item.name ===
                              (!DeliveryName?.length == 0
                                ? DeliveryName
                                : defaultDeliveryMethod)
                          )?.estimatedDelivery}
                      {/* {estimateTimes ? estimateTimes : "Few Hours"} */}
                    </div>
                  </div>
                </Col>

                <Col
                  className={`promoPLeft ${
                    usedcasebalance != 0 ? "d-block" : "d-none"
                  }`}
                >
                  <div className="pe-4 ps-4 pt-2 pb-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center  ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                        checked={usedcasebalanceflag}
                        onChange={(e) => {
                          handlechangeusedcasebalance();
                        }}
                      />
                      <label
                        className="form-check-label ps-4 purpleText"
                        for="flexCheckChecked"
                      >
                        Used Cash Balance
                      </label>
                      <Tooltip placement="top" title="Used Cash Balance">
                        <img src={info} className="img-fluid" alt="" />
                      </Tooltip>
                    </div>
                    <div
                      className={`${
                        usedcasebalanceflag == true && usedcasebalance != 0
                          ? "d-block"
                          : "d-none"
                      } responsiveFontLarge  successTextModel text-end bolder pe-4`}
                    >
                      {/* <input type="text" className="w-25" disabled readOnly value={usedcasebalance}></input> &nbsp; {"=>"} &nbsp; */}
                      <input
                        type="text"
                        className="rounded-3 bolder"
                        value={UserUsedCaseBalance}
                        onChange={(e) => {
                          let values = e.target.value;
                          const newValue = values.replace(/[^0-9]/g, "");
                          if (
                            Number(newValue) >= 0 &&
                            Number(newValue) <= usedcasebalance
                          ) {
                            setUserUsedCaseBalance(newValue);
                          }
                        }}
                      ></input>
                      {/* {estimateTimes ? estimateTimes : "Few Hours"} */}
                    </div>
                  </div>
                </Col>

                <Col className="pt-3 pb-3">
                  <div className="mainMoneyBox">
                    <div className=" pt-4 d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center  ps-4">
                        <div className="responsiveFontLarge  textGray bolder ms-2">
                          Transfer Amount:
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                        <div className="responsiveFontLarge  text-black bolder me-2 purpleText bolder eventNone">
                          {(sendMoney == "" ? 0 : sendMoney)
                            ? sendMoney == ""
                              ? 0
                              : sendMoney
                            : 0}{" "}
                          {flagSelect ? flagSelect.currency : ""}{" "}
                          {/*/flagSelect ? flagSelect.map((ele) => { return (ele.currency) }) : ""*/}
                        </div>
                      </div>
                    </div>
                    <div className=" pt-4 d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center ps-4">
                        <div
                          className="responsiveFontLarge  textGray bolder ms-2"
                          onClick={(e) => {
                            handlesc(e);
                          }}
                        >
                          Service Charge:
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                        <div className="responsiveFontLarge  text-black bolder me-2 purpleText bolder eventNone">
                          {TotalRate == 0
                            ? Number((DeafultPSC + DefaultDSC)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                            // ? Number(DeafultPSC + DefaultDSC).toFixed(2)
                            : DeafultPSC == 0 && DefaultDSC != 0
                            ? Number((DefaultDSC + PaymentRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                            // ? Number(DefaultDSC + PaymentRate).toFixed(2)
                            : DefaultDSC == 0 &&
                              DeafultPSC != 0 &&
                              Def_D_Flag == 1
                            ? Number((DeafultPSC + DileveryRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                            // ? Number(DeafultPSC + DileveryRate).toFixed(2)
                            : Number((TotalRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))}{" "}
                            {/* : Number(TotalRate).toFixed(2)}{" "} */}
                          {/* {TotalRate == 0
                            ? Number(DeafultPSC + DefaultDSC).toFixed(2)
                            : Number(TotalRate).toFixed(2)}{" "} */}
                          {flagSelect ? flagSelect.currency : ""}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${
                        usedcasebalanceflag == false ? "pb-4" : ""
                      } pt-4 d-flex justify-content-between align-items-center`}
                    >
                      <div className="d-flex align-items-center  ps-4">
                        <div className="responsiveFontLarge  textGray bolder ms-2">
                          Promocode discount &nbsp;
                          {BenifitonExchangeRateandServiceChargeName ==
                          "(ServiceCharge)"
                            ? "(Service Charge)"
                            : BenifitonExchangeRateandServiceChargeName ==
                              "(ExchangeRate)"
                            ? "(Exchange Rate)"
                            : BenifitonExchangeRateandServiceChargeName}
                          :
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                        <div className="responsiveFontLarge  text-black bolder me-2 purpleText bolder eventNone">
                          {BenifitonExchangeRateandServiceCharge == 0
                            ? Number(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                            // ? BenifitonExchangeRateandServiceCharge.toFixed(2)
                            : "-" +
                              Number(BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                              // .toFixed(
                              //   BenifitonExchangeRateandServiceCharge == 0
                              //     ? 2
                              //     : 3
                              // )
                              }{" "}
                          &nbsp;
                          {flagSelect ? flagSelect.currency : ""}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${
                        usedcasebalanceflag == true && usedcasebalance != 0
                          ? "d-block"
                          : "d-none"
                      } pb-4 pt-4 d-flex justify-content-between align-items-center`}
                    >
                      <div className="d-flex align-items-center  ps-4">
                        <div className="responsiveFontLarge  textGray bolder ms-2">
                          Used Balance :
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                        <div className="responsiveFontLarge  text-black bolder me-2 purpleText bolder eventNone">
                          {UserUsedCaseBalance == "" ||
                          UserUsedCaseBalance == 0 ||
                          UserUsedCaseBalance == "" ||
                          usedcasebalanceflag == false
                            ? 0
                            : "-" + UserUsedCaseBalance}
                          &nbsp;
                          {/* {Promocode} */}
                          {flagSelect ? flagSelect.currency : ""}
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 pb-3 d-flex justify-content-between align-items-center purpleBackground bottomBg">
                      <div className="d-flex align-items-center  pe-4 ps-4">
                        <div className="responsiveFontLarge  textGray bolder ms-2 text-white">
                          Total Payable
                        </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                        <h4 className="text-white bolder responsiveFontLarge">
                          {TotalRate == 0
                            ? Number((
                                parseFloat(DeafultPSC + DefaultDSC) +
                                (usedcasebalanceflag
                                  ? parseFloat(
                                      sendMoney == "" ? 0 : sendMoney
                                    ) -
                                    parseFloat(
                                      UserUsedCaseBalance == ""
                                        ? 0
                                        : UserUsedCaseBalance
                                    )
                                  : parseFloat(
                                      sendMoney == "" ? 0 : sendMoney
                                    )) -
                                parseFloat(
                                  BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/)
                                  // BenifitonExchangeRateandServiceCharge.toFixed(2)
                                )
                              )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                              // .toFixed(
                              //   BenifitonExchangeRateandServiceCharge == 0
                              //     ? 2
                              //     : 3
                              // )
                            : Number((TotalRate && (sendMoney == "" ? 0 : sendMoney)
                                ? parseFloat(TotalRate) +
                                  (usedcasebalanceflag
                                    ? parseFloat(
                                        sendMoney == "" ? 0 : sendMoney
                                      ) -
                                      parseFloat(
                                        UserUsedCaseBalance == ""
                                          ? 0
                                          : UserUsedCaseBalance
                                      )
                                    : parseFloat(
                                        sendMoney == "" ? 0 : sendMoney
                                      )) -
                                  parseFloat(
                                    BenifitonExchangeRateandServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/)
                                    // BenifitonExchangeRateandServiceCharge.toFixed(2)
                                  )
                                : 0
                              )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                              // .toFixed(
                              //   BenifitonExchangeRateandServiceCharge == 0
                              //     ? 2
                              //     : 3
                              // )
                              }{" "}
                          {flagSelect ? flagSelect.currency : ""}
                        </h4>
                      </div>
                    </div>
                  </div>
                </Col>
                <div className="btn-component pe-5 ps-5 d-flex justify-content-center">
                  <input
                    className="col-lg-3 uppercase  nextButtonStep1"
                    type="button"
                    disabled={maxSendingAmount}
                    value="NEXT"
                    onClick={(e) => {
                      if (localStorage.getItem("rollID") == 2) {
                        if (NullValuePresentMessage !== "") {
                          setNullValuePopUp(true);
                        } else {
                          if (sendMoney <= MaxSendAmount) {
                            setmaxSendingAmountPopUp(false);
                            saveTransaction(e);
                          } else {
                            setmaxSendingAmountPopUp(true);
                          }
                        }
                      } else {
                        saveTransaction(e);
                      }
                    }}
                    // handleShowVerifys
                  />
                </div>

                {/* //////this is error////// */}

                <div className="justify-content-center d-grid">
                  <div className="responsiveFontLarge d-none text-danger merror ms-2 bolder fs-6">
                    {/* Enter the {flagSelect ? flagSelect.currency:''} You Send Money */}
                    Please enter valid amount
                  </div>
                  <br />
                  <div className="responsiveFontLarge  d-none text-danger derror ms-2 bolder fs-6">
                    Select the Delivery Method
                  </div>
                  <br />
                  <div className="responsiveFontLarge  d-none text-danger perror ms-2 bolder fs-6">
                    Select the Payment Method
                  </div>
                </div>
                {/* //////////// */}
              </Container>
            </Row>
          </Form>
        </Container>

        {/* //delivery method // * */}

        <Modal show={show} onHide={handleCloseDelivery} size="lg">
          <Modal.Body className="modal-money-payment">
            {ActiveDeliveryMethods &&
              ActiveDeliveryMethods.map((DeliveryMethod, index) => {
                if (DeliveryMethod?.enabled === true) {
                  return (
                    <div key={index}>
                      <div
                        className={`cardActivePurple ${
                          DeliveryID == DeliveryMethod?.id
                            ? "cardActiveSendMoney"
                            : ""
                        }`}
                        onClick={handleBankDeposite}
                      >
                        <div
                          className="innerCardActive py-3 my-3"
                          onClick={(e) => {
                            handleDeliverymethod(
                              e,
                              index,
                              DeliveryMethod.name,
                              (sendMoney == "" ? 0 : sendMoney) !== 0
                                ? DeliveryLowerUpper.filter(
                                    (val) => val.name === DeliveryMethod.name
                                  ).map((val) =>
                                    val.serviceCharge >= 0
                                      ? val.serviceCharge
                                      : 0
                                  )
                                : sendMoney == ""
                                ? 0
                                : sendMoney,
                              DeliveryMethod.id
                            );
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-start pe-3 ps-3">
                            <div className="">
                              <div className="d-flex align-items-center">
                                <img
                                  src={
                                    CommonConstants.BASE_URL +
                                    DeliveryMethod.logo
                                  }
                                  className="img-fluid getLogoSize"
                                  alt="Delivery Methods"
                                  style={{ width: '10%' }}
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
                                      {getTooltipContent(DeliveryMethod.name)}
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
                                    {fromCountry}{" "}
                                    {flagSelect ? flagSelect.currency : ""}
                                    &nbsp; = &nbsp;
                                    {toCountry}{" "}
                                    {flagSelect1 ? flagSelect1.currency : ""}{" "}
                                  </div>
                                </div>
                                <div className="d-flex pb-2 justify-content-between">
                                  <div className="text-black bolder responsiveFontLarge">
                                    Total Receivable :
                                  </div>{" "}
                                  <div className="text-black bolder responsiveFontLarge">
                                    {Number((receiveMoney)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))}{" "}
                                    {/* {Number(receiveMoney).toFixed(2)}{" "} */}
                                    {flagSelect1 ? flagSelect1.currency : ""}
                                  </div>
                                </div>
                                <div className="d-flex pb-2 justify-content-between">
                                  <div className="text-black bolder responsiveFontLarge">
                                    Total Service Charge :
                                  </div>{" "}
                                  <div className="text-black bolder responsiveFontLarge">
                                    {(sendMoney == "" ? 0 : sendMoney) !== 0
                                      ? !PaymentRate
                                        ? DeliveryLowerUpper.length !== 0
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
                                          : "0.00"
                                        : DeliveryLowerUpper.length !== 0
                                        ? DeliveryLowerUpper.filter(
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
                                        : "0.00"
                                      : sendMoney == ""
                                      ? 0
                                      : sendMoney}{" "}
                                    {/* {!DileveryRate && !PaymentRate ? DefaultDSC + DeafultPSC : DileveryRate && !PaymentRate ? DileveryRate + DeafultPSC : !DileveryRate && PaymentRate ? DefaultDSC + PaymentRate :DileveryRate + PaymentRate} */}
                                    {flagSelect ? flagSelect.currency : ""}
                                  </div>
                                </div>
                                <div className="d-flex pb-2 justify-content-between">
                                  <div className="text-black bolder responsiveFontLarge">
                                    Total Payable :
                                  </div>{" "}
                                  <div className="text-black bolder responsiveFontLarge">
                                    {(sendMoney == "" ? 0 : sendMoney) !== 0
                                      ? !PaymentRate
                                        ? DeliveryLowerUpper.length !== 0
                                          ? DeliveryLowerUpper.filter(
                                              (val) =>
                                                val.name === DeliveryMethod.name
                                            ).map((val) =>
                                              val.serviceCharge >= 0
                                                ? Number((
                                                    Number(val.serviceCharge) +
                                                    DeafultPSC +
                                                    parseFloat(
                                                      sendMoney == ""
                                                        ? 0
                                                        : sendMoney
                                                    )
                                                  )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                                  // ).toFixed(2)
                                                : Number((sendMoney)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                                // : Number(sendMoney).toFixed(2)
                                            )
                                          : Number((sendMoney)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                          // : Number(sendMoney).toFixed(2)
                                        : DeliveryLowerUpper.length !== 0
                                        ? DeliveryLowerUpper.filter(
                                            (val) =>
                                              val.name === DeliveryMethod.name
                                          ).map((val) =>
                                            val.serviceCharge >= 0
                                              ? Number((
                                                  Number(val.serviceCharge) +
                                                  PaymentRate +
                                                  parseFloat(
                                                    sendMoney == ""
                                                      ? 0
                                                      : sendMoney
                                                  )
                                                )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                                // ).toFixed(2)
                                              : Number((sendMoney)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                              // : Number(sendMoney).toFixed(2)
                                          )
                                        : Number((sendMoney)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                        // : Number(sendMoney).toFixed(2)
                                      : sendMoney == ""
                                      ? 0
                                      : Number((sendMoney)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))}{" "}
                                      {/* : Number(sendMoney).toFixed(2)}{" "} */}
                                    {/* {!DileveryRate && !PaymentRate ? DefaultDSC + DeafultPSC : DileveryRate && !PaymentRate ? DileveryRate + DeafultPSC : !DileveryRate && PaymentRate ? DefaultDSC + PaymentRate :DileveryRate + PaymentRate} */}
                                    {flagSelect ? flagSelect.currency : ""}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`tick ${
                                DeliveryID == DeliveryMethod?.id
                                  ? "d-block"
                                  : "d-none"
                              }`}
                            >
                              <img
                                src={tickIcon}
                                className="img-fluid"
                                alt=""
                              />
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
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={handleCloseDelivery}
            >
              Select
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ////////////////////// */}

        {/* Payment Method DropDown */}

        <Modal
          show={show1}
          onHide={handleClosePayment}
          size="lg"
          // dialogClassName="modal-money"
        >
          <Modal.Body className="modal-money-payment">
            {ActivePaymentMethods &&
              ActivePaymentMethods.map((PaymentMethod, index) => {
                if (PaymentMethod?.enabled === true) {
                  return (
                    <div key={index}>
                      <div
                        className={`cardActivePurple ${
                          PaymentID === index ? "cardActiveSendMoney" : ""
                        }`}
                      >
                        <div
                          className="innerCardActive py-3 my-3"
                          onClick={(e) => {
                            handlePaymentmethod(
                              e,
                              index,
                              PaymentMethod.name,
                              (sendMoney == "" ? 0 : sendMoney) !== 0
                                ? PaymentLowerUpper.filter(
                                    (val) => val.name === PaymentMethod.name
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
                                          (sendMoney == "" ? 0 : sendMoney) *
                                          (val.serviceCharge / 100);
                                        return (
                                          percentageCharge +
                                          val.OurFees +
                                          val.FixFees
                                        );
                                      }
                                    } else {
                                      return (sendMoney == ""
                                        ? 0
                                        : sendMoney) === 0
                                        ? 0
                                        : val.serviceCharge;
                                    }
                                  })
                                : sendMoney == ""
                                ? 0
                                : sendMoney,
                              PaymentMethod.id
                            );
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-start py-3 ">
                            <div className="">
                              <div className="d-flex align-items-center">
                                <img
                                  src={
                                    CommonConstants.BASE_URL +
                                    PaymentMethod.logo
                                  }
                                  alt=""
                                  className="img-fluid getLogoSize"
                                  height={100}
                                  width={100}
                                />
                                <div className="responsiveFontLarge text-black bolder ms-4">
                                  {PaymentMethod.name}
                                </div>
                                <div className="tooltip-container">
                                  <img
                                    src={info}
                                    alt=""
                                    className="ms-2 tooltip-button"
                                  />
                                  <div className="tooltip-content">
                                    {getTooltipContent1(PaymentMethod.name)}
                                  </div>
                                </div>
                              </div>

                              <br></br>
                              <div className="d-flex flex-column wallLeft">
                                <div className="d-flex pb-2 justify-content-between">
                                  <div className="textGray bolder">
                                    Exhange rate : &nbsp;
                                    {fromCountry}{" "}
                                    {flagSelect ? flagSelect.currency : ""}{" "}
                                    &nbsp;=&nbsp;
                                    {toCountry}{" "}
                                    {flagSelect1 ? flagSelect1.currency : ""}{" "}
                                  </div>
                                </div>
                                <div className="d-flex pb-2 justify-content-between">
                                  <div className="text-black bolder">
                                    Total Receivable :
                                  </div>{" "}
                                  <div className="text-black bolder">
                                    {Number((receiveMoney)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))}{" "}
                                    {/* {Number(receiveMoney).toFixed(2)}{" "} */}
                                    {flagSelect1 ? flagSelect1.currency : ""}
                                  </div>
                                </div>
                                <div className="d-flex pb-2 justify-content-between">
                                  <div className="text-black bolder">
                                    Total Service Charge :
                                  </div>{" "}
                                  <div className="text-black bolder">
                                    {(sendMoney == "" ? 0 : sendMoney) !== 0
                                      ? !DileveryRate
                                        ? Number((
                                            Number(
                                              PaymentLowerUpper.filter(
                                                (val) =>
                                                  val.name ===
                                                  PaymentMethod.name
                                              ).map((val) => {
                                                if (
                                                  val.name === "Debit Card" ||
                                                  val.name === "Credit Card"
                                                ) {
                                                  if (
                                                    val.amountType === "amount"
                                                  ) {
                                                    var amountvalue =
                                                      val.serviceCharge +
                                                      val.OurFees +
                                                      val.FixFees;
                                                    return amountvalue !== 0 ||
                                                      amountvalue !== ""
                                                      ? amountvalue
                                                      : "0";
                                                  } else if (
                                                    val.amountType ===
                                                    "percentage"
                                                  ) {
                                                    var percentageCharge =
                                                      (sendMoney == ""
                                                        ? 0
                                                        : sendMoney) *
                                                      (val.serviceCharge / 100);
                                                    return (
                                                      percentageCharge +
                                                      val.OurFees +
                                                      val.FixFees
                                                    );
                                                  }
                                                } else {
                                                  return (sendMoney == ""
                                                    ? 0
                                                    : sendMoney) === 0
                                                    ? 0
                                                    : val.serviceCharge;
                                                }
                                              })
                                            ) + DefaultDSC
                                          )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                          // ).toFixed(2)
                                        : Number((
                                            Number(
                                              PaymentLowerUpper.filter(
                                                (val) =>
                                                  val.name ===
                                                  PaymentMethod.name
                                              ).map((val) => {
                                                if (
                                                  val.name === "Debit Card" ||
                                                  val.name === "Credit Card"
                                                ) {
                                                  if (
                                                    val.amountType === "amount"
                                                  ) {
                                                    var amountvalue =
                                                      val.serviceCharge +
                                                      val.OurFees +
                                                      val.FixFees;
                                                    return amountvalue !== 0 ||
                                                      amountvalue !== ""
                                                      ? amountvalue
                                                      : "0";
                                                  } else if (
                                                    val.amountType ===
                                                    "percentage"
                                                  ) {
                                                    var percentageCharge =
                                                      (sendMoney == ""
                                                        ? 0
                                                        : sendMoney) *
                                                      (val.serviceCharge / 100);
                                                    return (
                                                      percentageCharge +
                                                      val.OurFees +
                                                      val.FixFees
                                                    );
                                                  }
                                                } else {
                                                  return (sendMoney == ""
                                                    ? 0
                                                    : sendMoney) === 0
                                                    ? 0
                                                    : val.serviceCharge;
                                                }
                                              })
                                            ) + DileveryRate
                                          )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                          // ).toFixed(2)
                                      : sendMoney == ""
                                      ? 0
                                      : sendMoney}{" "}
                                    {flagSelect ? flagSelect.currency : ""}
                                  </div>
                                </div>
                                <div className="d-flex pb-2 justify-content-between">
                                  <div className="text-black bolder">
                                    Total Payable :
                                  </div>{" "}
                                  <div className="text-black bolder">
                                    {(sendMoney == "" ? 0 : sendMoney) !== 0
                                      ? !DileveryRate
                                        ? Number((
                                            Number(
                                              PaymentLowerUpper.filter(
                                                (val) =>
                                                  val.name ===
                                                  PaymentMethod.name
                                              ).map((val) => {
                                                if (
                                                  val.name === "Debit Card" ||
                                                  val.name === "Credit Card"
                                                ) {
                                                  if (
                                                    val.amountType === "amount"
                                                  ) {
                                                    var amountvalue =
                                                      val.serviceCharge +
                                                      val.OurFees +
                                                      val.FixFees;
                                                    return amountvalue !== 0 ||
                                                      amountvalue !== ""
                                                      ? amountvalue
                                                      : "0";
                                                  } else if (
                                                    val.amountType ===
                                                    "percentage"
                                                  ) {
                                                    var percentageCharge =
                                                      (sendMoney == ""
                                                        ? 0
                                                        : sendMoney) *
                                                      (val.serviceCharge / 100);
                                                    return (
                                                      percentageCharge +
                                                      val.OurFees +
                                                      val.FixFees
                                                    );
                                                  }
                                                } else {
                                                  return (sendMoney == ""
                                                    ? 0
                                                    : sendMoney) === 0
                                                    ? 0
                                                    : val.serviceCharge;
                                                }
                                              })
                                            ) +
                                            DefaultDSC +
                                            parseFloat(
                                              sendMoney == "" ? 0 : sendMoney
                                            )
                                          )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                          // ).toFixed(2)?.toString()?.match(/^\d+(?:\.\d{0,2})?/)
                                        : Number((
                                            Number(
                                              PaymentLowerUpper.filter(
                                                (val) =>
                                                  val.name ===
                                                  PaymentMethod.name
                                              ).map((val) => {
                                                if (
                                                  val.name === "Debit Card" ||
                                                  val.name === "Credit Card"
                                                ) {
                                                  if (
                                                    val.amountType === "amount"
                                                  ) {
                                                    var amountvalue =
                                                      val.serviceCharge +
                                                      val.OurFees +
                                                      val.FixFees;
                                                    return amountvalue !== 0 ||
                                                      amountvalue !== ""
                                                      ? amountvalue
                                                      : "0";
                                                  } else if (
                                                    val.amountType ===
                                                    "percentage"
                                                  ) {
                                                    var percentageCharge =
                                                      (sendMoney == ""
                                                        ? 0
                                                        : sendMoney) *
                                                      (val.serviceCharge / 100);
                                                    return (
                                                      percentageCharge +
                                                      val.OurFees +
                                                      val.FixFees
                                                    );
                                                  }
                                                } else {
                                                  return (sendMoney == ""
                                                    ? 0
                                                    : sendMoney) === 0
                                                    ? 0
                                                    : val.serviceCharge;
                                                }
                                              })
                                            ) +
                                            DileveryRate +
                                            parseFloat(
                                              sendMoney == "" ? 0 : sendMoney
                                            )
                                          )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                                          // ).toFixed(2)
                                      : sendMoney == ""
                                      ? 0
                                      : sendMoney}{" "}
                                    {flagSelect ? flagSelect.currency : ""}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`tick ${
                                PaymentID === index ? "d-block" : "d-none"
                              }`}
                            >
                              <img
                                src={tickIcon}
                                className="img-fluid"
                                alt=""
                              />
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
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={handleClosePayment}
            >
              Select
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ////////////////////// */}

        <Modal
          show={alert}
          onHide={(e) => {
            setPreviousExchangeRate(toCountry);
            handleCloses(e);
          }}
          backdrop="static"
          keyboard={false}
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="bolder">Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="bolder">Exchange rate :</p>
            <div className="bolder mb-1">
              Old Exchange Rate : {PreviousExchangeRate}
            </div>

            <div className="bolder mb-1">New Exchange Rate : {toCountry}</div>
            <br />
            <p className="bolder">They Receive :</p>
            <div className="bolder mb-1">
              They were to receive :{" "}
              {Number((sendMoney * PreviousExchangeRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))}
              {/* {(sendMoney * PreviousExchangeRate).toFixed(2)} */}
            </div>

            <div className="bolder mb-1">
              Now they receive : {Number((sendMoney * toCountry)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))}
              {/* Now they receive : {(sendMoney * toCountry).toFixed(2)} */}
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center modal-footer">
            <Button
              variant="secondary"
              className="w-50"
              onClick={(e) => {
                setPreviousExchangeRate(toCountry);
                handleCloses(e);
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          centered
          size="lg"
          show={showAdditionalIdUpdate}
          onHide={handleCloseAdditionalIDVerify}
          dialogClassName="modal-warning"
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">
                {" "}
                &nbsp; &nbsp; Document Upload
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <Row>
              <Col className="col-lg-12 p-0">
                <div
                  className={VerifyKYCDocument === true ? "d-block" : "d-none"}
                >
                  <div className="text-center">
                    <label className="text-center fs-4 text-black mb-2">
                      Additional Documents Upload
                    </label>
                  </div>
                  <Row className="mb-3 m-auto">
                    <Form.Group
                      as={Col}
                      className="left-inner-addon input-container"
                    >
                      <Form.Select
                        className=" "
                        onChange={(e) => {
                          handledocumentId(e);
                        }}
                      >
                        <option value="" disabled selected>
                          Id Document
                        </option>
                        {Idtypes &&
                          Idtypes.map((ID) => {
                            return <option value={ID.id}>{ID.name}</option>;
                          })}
                      </Form.Select>
                      {IdDocument_Id == undefined ? (
                        <div className="responsiveFontLarge d-none text-danger error_message ms-2 error">
                          PayID
                        </div>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                  </Row>
                </div>
                <div
                  className={VerifyKYCDocument === true ? "d-block" : "mt-5"}
                >
                  {/* <Form id=""> */}
                  <Row className="d-flex m-auto">
                    <Col className="col-lg-12 d-flex">
                      <Col className=" pe-2">
                        <UploadBusinessAndAgentDocument
                          IdType={IdDocument_Id}
                          CountryId={UserData?.countryId}
                          VerifyOtherDocument={VerifyOtherDocument}
                          VerifyKYCDocument={VerifyKYCDocument}
                          imageData={imageData}
                          AdditionalDocument={HandleAdditionalDocument}
                        ></UploadBusinessAndAgentDocument>
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
              onClick={handleBUpdateDocument}
            >
              Upload Document
            </Button>
          </Modal.Footer>
          <br />
          {/* <br/> */}
        </Modal>

        <Modal
          size="lg"
          centered
          show={showDocumentUplodedPopup}
          onHide={handlecloseDocumentUplodedVerify}
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2"> &nbsp; &nbsp; Success</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <Row>
              {/* <></> */}
              <label className="text-center fs-5 text-black mb-2">
                {DocumentMessage}
              </label>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={handlecloseDocumentUplodedVerify}
            >
              Close
            </Button>
          </Modal.Footer>
          <br />
          {/* <br/> */}
        </Modal>

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
            <p>{Bus_Age_PopupMessage}</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-around">
            <Button
              className="bg-transparent text-black purpleBorder col px-3"
              onClick={() => {
                setVerifyRefralPOPUP(false);
              }}
            >
              NO
            </Button>
            <Button
              className="purpleBackground border-0 col"
              onClick={() => {
                setshowAdditionalIdUpdate(true);
                setVerifyRefralPOPUP(false);
              }}
            >
              YES
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <MyVerticallyCenteredModal
          show={modalShow}
          clg={() => console.log("Apply")}
          PromoCodeDetails={PromoCodeDetails}

        /> */}

        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="border-bottom ">
            <Modal.Title id="contained-modal-title-vcenter">
              Apply Promocode
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="coupon-box ">
              <div className="mainContainer col-lg-12">
                <div className="copy-text" style={{ background: "#fafafa" }}>
                  <input
                    type="text"
                    className="promocodeInputField"
                    value={InputPromoCodeValue}
                    placeholder="Type promo code here"
                    onChange={(e) => {
                      handleInputPromocode(e);
                    }}
                  />
                  <button
                    className="w-auto promocodeInputButton bolder px-4"
                    disabled={InputPromoCodeValue == "" ? true : false}
                    onClick={(e) => {
                      ApplyPromocode(e);
                    }}
                  >
                    APPLY
                  </button>
                </div>
              </div>
              <hr></hr>
              {PromoCodeDetails?.length > 0 ? (
                <>
                  {PromoCodeDetails.map((promodetails, index) => {
                    return (
                      <>
                        <div className={`radio-icon-div py-2 border-bottom `}>
                          <div
                            className={`radio-label-text ${
                              Removebtn == promodetails.id
                                ? "cardActiveSendMoney"
                                : ""
                            }  p-3`}
                          >
                            <div className="row ">
                              <div className="d-flex justify-content-between">
                                <div className="">
                                  <h3 className="custom-title">
                                    <span className="purpleText">
                                      {promodetails.promoCode}
                                    </span>
                                  </h3>
                                  <h5 className="custom-desc">
                                    <ul className="ps-0 fs-6 mt-4">
                                      <li className="coupon-description">
                                        {promodetails.description}
                                      </li>
                                      <li className="coupons-description">
                                        Valid till{" "}
                                        {moment(promodetails.validTo).format(
                                          "DD MMMM YYYY"
                                        )}
                                      </li>
                                    </ul>
                                  </h5>
                                </div>
                                <div className="">
                                  <Button
                                    className={`btn btn-default purpleBackground text-white m-0 w-auto px-5 ${
                                      Removebtn == promodetails.id
                                        ? "d-none"
                                        : "d-block"
                                    }`}
                                    onClick={() => {
                                      handleSelectPromo(
                                        promodetails?.id,
                                        promodetails?.deliveryMethod,
                                        promodetails?.paymentMethod,
                                        promodetails?.benifitsOnCash,
                                        promodetails?.minSendingAmt,
                                        promodetails?.minAmount,
                                        promodetails?.maxAmount,
                                        promodetails?.minExchangeRate,
                                        promodetails?.maxExchangeRate,
                                        promodetails?.minServiceCharge,
                                        promodetails?.maxServiceCharge,
                                        promodetails?.points,
                                        promodetails?.exDiscount,
                                        promodetails?.seDiscount,
                                        promodetails?.promoCode
                                      );
                                      setAppliedPromoCode(promodetails);
                                    }}
                                  >
                                    Apply
                                  </Button>

                                  <Button
                                    className={`btn btn-default bg-danger text-white m-0 w-auto px-5 ${
                                      Removebtn == promodetails.id
                                        ? "d-block"
                                        : "d-none"
                                    }`}
                                    onClick={() => {
                                      setRemovebtn(0);
                                      setPromocode("");
                                      setBenifitonCase(0);
                                      setBenifitonExchangeRateandServiceCharge(
                                        0
                                      );
                                      setgetPoints(0);
                                      setBenifitonExchangeRateandServiceChargeName(
                                        ""
                                      );
                                      setAppliedPromoCode("noData");
                                      setPromo_Success_Message("");
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                <div className="promocodePopupHeight align-items-center justify-content-center d-flex">
                  <p className="">No PromoCode available</p>
                </div>
              )}
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={Promo_Error_Popup}
          onHide={() => {
            setPromo_Error_Popup(false);
          }}
          backdrop="static"
          keyboard={false}
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="purpleText">Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>{Promo_Error_Message}</Modal.Body>
          <Modal.Footer className="justify-content-center">
            <div className="col-lg-6">
              <Button
                variant="secondary"
                className="purpleBackground"
                onClick={() => {
                  setPromo_Error_Popup(false);
                }}
              >
                OK
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        <Modal
          show={Promo_Success_Popup}
          onHide={() => {
            setPromo_Success_Popup(false);
          }}
          backdrop="static"
          keyboard={false}
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="purpleText">Congratulation!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>{Promo_Success_Message}</Modal.Body>
          <Modal.Footer className="justify-content-center">
            <div className="col-lg-6">
              <Button
                variant="secondary"
                className="purpleBackground"
                onClick={() => {
                  setPromo_Success_Popup(false);
                }}
              >
                OK
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* ///high amount can't send popup/// */}

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
            transaction. Please enter the value below ${MaxSendAmount}. To send
            money above ${MaxSendAmount} please create another transaction
            again. Service fees are subject to apply per transaction.
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

        <Modal
          show={DuplicateUserPopUp}
          onHide={() => {
            setDuplicateUserPopUp(false);
          }}
          backdrop="static"
          keyboard={false}
          size="md"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="purpleText">Sorry!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            We are unable to verify your account at the moment. Please get in touch with our customer support on <small className="text-primary pointer" onClick={handleCopyClick}>0419850130</small>, or <u className="text-primary pointer" onClick={handleCopyClick2}>info@legalremit.com</u>. Alternatively, you can send us a message from our mobile app and web app directly.
            {/* You can send a maximum of AUD {MaxSendAmount} in a single transaction. Please enter the value below ${MaxSendAmount}. To send money above ${MaxSendAmount} please create another transaction again. Service fees are subject to apply per transaction. */}
          </Modal.Body>
          <Modal.Footer className="justify-content-center">
            <div className="col-lg-6">
              <Button
                variant="secondary"
                className="purpleBackground"
                onClick={() => {
                  setDuplicateUserPopUp(false);
                }}
              >
                OK
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
}
