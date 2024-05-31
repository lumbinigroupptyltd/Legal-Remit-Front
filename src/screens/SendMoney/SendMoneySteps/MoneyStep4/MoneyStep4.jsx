import React, { useEffect, useState } from "react";
import "./MoneyStep4.scss";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import drpa from "../../../../assets/images/drparrw.svg";
import visa from "../../../../assets/images/cib_cc-visa.svg";
import mastercard from "../../../../assets/images/MasterCrad.png";
import amex from "../../../../assets/images/amex.png";
import discover from "../../../../assets/images/discover.png";
import unknown from "../../../../assets/images/Default.png";
import copy from "../../../../assets/images/copyclipboard.svg";
import firstPay from "../../../../assets/images/payto-icon 1.svg";
import thirdPay from "../../../../assets/images/payId.svg";
import fifthPay from "../../../../assets/images/poli.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UploadFiles from "../../../../Helpers/UploadFiles/UploadFiles";
import axios from "axios";
import { CommonConstants } from "../../../../Constants/common.constants";
import moment from "moment";
import Loader from "../../../Loader/Loader";
import SuccessTransaction from "../../../../assets/images/TransactionSuccessIcon.svg";
import { useNavigate, useLocation } from "react-router-dom";
import AdditionalUploadDocument from "../../../Helpers/ReVerifyIDDocument/AdditionalDocumentUpload";
import tickIcon from "../../../../assets/images/mdi_tick-circle-outline.svg";
import info from "../../../../assets/images/info11.svg";
import { Edit } from "@mui/icons-material";

export default function MoneyStep4({
  TransactionID,
  TrsnsactionData,
  FirstStepData,
  PromoCodeVerify,
  SetServiceCharge,
  SetExchangerate,
  PremiumEXRateValue,
}) {
  const navigate = useNavigate();
  const [dropdownState, setDropdownState] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [selected, setSelected] = useState("");
  const [methodname, setMethodname] = useState("payTo");
  const [loadervalue, setloadervalue] = useState(false);
  const [aggrementStatus, setAggrementStatus] = useState();
  const [TransactionInfo, setTransactionInfo] = useState();
  const [NepalTransactionmsgPopup, setNepalTransactionmsgPopup] =
    useState(false);
  const [NepalTransactionmsg, setNepalTransactionmsg] = useState("");
  const [showDiv1, setShowDiv1] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);
  const [showDiv3, setShowDiv3] = useState(false);
  const [DebitChangetoCredit, setDebitChangetoCredit] = useState(false);
  const location = useLocation();
  const [isVisibleDynamic, setIsVisibleDynamic] = useState("Pay To"); //("Pay To");
  const [CloseCard1, setCloseCard1] = useState(false);
  const [NotValidCard, setNotValidCard] = useState(false);

  const [expiry, setExpiry] = useState("");

  const [cardImage, setCardImage] = useState("");
  const [CVVNumber, setCVVNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [isCardValid, setIsCardValid] = useState(true);
  const [savedForFuture, setSavedForFuture] = useState(true);
  const [sanitizedCardNumber, setSanitizedCardNumber] = useState("");
  const [TransactionIddd, setTransactionIddd] = useState(0);
  const [S_Charge, setS_Charge] = useState(0);

  const [Paytoalidation, setPaytoValidation] = useState(false);
  const [cardValidation, setCardValidation] = useState(false);

  const handleExpiryChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    if (inputValue.length > 2) {
      setExpiry(`${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}`);
    } else {
      setExpiry(inputValue);
    }
  };

  const handleCardInput = async () => {
    setloadervalue(true);

    const transactionInfo = await getTransactionInfo();

    let cardNumber, expiryMonth, expiryYear, name, cvv;

    cardNumber =
      !editCardDetail && cardNumberAutoFill === sanitizedCardNumber
        ? cardNumberAutoFill
        : sanitizedCardNumber;
    expiryMonth =
      expiry.charAt(0) === "0" ? expiry.slice(0, 2) : expiry.slice(0, 2);
    expiryYear = expiry.slice(3, 7);
    name = holderName;
    cvv = CVVNumber;

    let totalAmount = Number(
      (transactionInfo.amount + transactionInfo.serviceCharge)
        ?.toString()
        ?.match(/^\d+(?:\.\d{0,2})?/)
    );

    const CreditCardData = new FormData();

    CreditCardData.append("userId", transactionInfo.userId);
    CreditCardData.append("amount", totalAmount);
    CreditCardData.append("currency", transactionInfo.sendingCurrencyCode);
    CreditCardData.append("cardNumber", cardNumber);
    CreditCardData.append("expiry_month", expiryMonth);
    CreditCardData.append("expiry_year", expiryYear);
    CreditCardData.append("name", name);
    CreditCardData.append("cvv", cvv);

    const config = {
      method: "POST",
      url: CommonConstants.NEW_BASE_URL + "/checkcardtype",
      headers: { "Content-Type": "multipart/form-data" },
      data: CreditCardData,
    };
    try {
      const checkoutResponse = await axios(config);

      if (
        checkoutResponse.data.statuscode === 200 &&
        checkoutResponse.data.status === true
      ) {
        if (
          checkoutResponse.data.data &&
          checkoutResponse.data.data._links.redirect &&
          checkoutResponse.data.data._links.redirect.href
        ) {
          const PayToformData = new FormData();
          PayToformData.append("transactionId", TransactionID);
          PayToformData.append("isPreferedMethod", prferedMethod);

          const config = {
            method: "POST",
            url: CommonConstants.NEW_BASE_URL + "/sendmoney",
            headers: { "Content-Type": "multipart/form-data" },
            data: PayToformData,
          };
          await axios(config);

          window.open(checkoutResponse.data.data._links.redirect.href, "_self");
        } else {
          await handleDirectSendmoneyCall();
        }
        console.log(checkoutResponse.data);
      }
    } catch (error) {
      setloadervalue(false);
      setErrorMessage(error.response.data?.message);
      setOnError(true);
      console.log(error);
    }
  };

  const [editCardDetail, setEditCardDetail] = useState(true);

  const handleCvvNumber = (event) => {
    const inputCardNumber = event.target.value.replace(/\D/g, "");
    setCVVNumber(inputCardNumber);
  };

  const [RefImage, setRefImage] = useState([]);

  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const RefimageData = (image) => {
    if (image) {
      setRefImage(image);
      setIsImageUploaded(true);
    } else {
      setIsImageUploaded(false);
    }
  };

  const handleCardNumberChange = (event) => {
    const inputCardNumber = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    if (inputCardNumber.match(/^4/)) {
      setCardImage(visa);
    } else if (inputCardNumber.match(/^5[1-5]/)) {
      setCardImage(mastercard);
    } else if (inputCardNumber.match(/^3[47]/)) {
      setCardImage(amex);
    } else if (inputCardNumber.match(/^6(?:011|5)/)) {
      setCardImage(discover);
    } else {
      setCardImage(unknown); // Set a default image
    }
    // Insert a space every four digits
    const formattedCardNumber = inputCardNumber.replace(
      /(\d{4})(?=\d)/g,
      "$1 "
    );
    setSanitizedCardNumber(inputCardNumber);
    setCardNumber(formattedCardNumber);
    setIsCardValid(validateCardNumber(inputCardNumber));
  };

  useEffect(() => {
    setS_Charge(SetServiceCharge);
  }, [SetServiceCharge]);

  const handleCardNameChange = (event) => {
    let inputValue = event.target.value;
    let capitalizedValue = "";

    if (inputValue) {
      const words = inputValue.split(" ");

      capitalizedValue = words
        .map((word) => {
          const alphabeticWord = word.replace(/[^a-zA-Z]/g, "");
          return (
            alphabeticWord.charAt(0).toUpperCase() + alphabeticWord.slice(1)
          );
        })
        .join(" ");
    }

    setHolderName(capitalizedValue);
  };

  const validateCardNumber = (cardNumber) => {
    const sanitizedCardNumber = cardNumber.replace(/\s/g, "");
    var sum = 0;
    var doubleUp = false;

    for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
      var digit = parseInt(sanitizedCardNumber.charAt(i), 10);
      // console.log(digit,"digit")

      if (doubleUp) {
        if ((digit *= 2) > 9) digit -= 9;
      }

      sum += digit;
      doubleUp = !doubleUp;
    }

    return sum % 10 === 0;
  };

  const [cardImage1, setCardImage1] = useState("");
  const [cardNumber1, setCardNumber1] = useState("");
  const [cardNumber1AutoFill, setCardNumber1AutoFill] = useState("");
  const [cardNumberAutoFill, setCardNumberAutoFill] = useState("");
  const [holderName1, setHolderName1] = useState("");
  const [CVVNumber1, setCVVNumber1] = useState("");
  const [isCardValid1, setIsCardValid1] = useState(true);
  const [isCardExpiry1, setisCardExpiry1] = useState(true);
  const [isCardExpiry, setisCardExpiry] = useState(true);
  const [savedforfuture1, setsavedforfuture1] = useState(true);

  const [BankTransferData, setBankTransferData] = useState({
    AccountHoldernName: "Legal Remit",
    BSB: "012936",
    AccountNumber: "317069305",
  });

  const [PayIdData, setPayIdData] = useState({
    PayIdAccountNumber: "0419850130",
    PayIdAccountName: "LUMBINI GROUP PTY LTD",
  });

  //Error Messages for the Payment Methods
  const [errorMessage, setErrorMessage] = useState("");
  const [onError, setOnError] = useState(false);

  const [prferedMethod, setpreferedMethod] = useState(true);
  const [PaytoInvalid, setPaytoInvalid] = useState(false);
  const [PaytoType, setPaytoType] = useState(false);
  const [paymentData, setPaymentData] = useState({
    PayTo: "",
    BSB: "",
    Account_No: "",
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const getTransactionInfo = async () => {
    const transactionId = TransactionID
      ? TransactionID
      : location?.state?.TransactionData &&
        location?.state?.TransactionData?.id;

    const getTransactionInfo = await axios.post(
      CommonConstants.NEW_BASE_URL + "/gettransactionbyid",
      { id: transactionId }
    );
    const TransactionInfos = getTransactionInfo.data.data;

    setTransactionInfo(TransactionInfos);

    return TransactionInfos;
  };

  const handleButtonClick1 = async () => {
    if (
      paymentData.PayTo == "" &&
      paymentData.BSB == "" &&
      paymentData.Account_No == ""
    ) {
      setPaytoValidation(true);
    } else {
      setloadervalue(true);

      const TransactionInfos = await getTransactionInfo();

      let totalAmount = Number(
        (TransactionInfos.amount + TransactionInfos.serviceCharge)
          ?.toString()
          ?.match(/^\d+(?:\.\d{0,2})?/)
      );

      if (paymentData.PayTo !== "") {
        const sendData = {
          userId: TransactionInfos.userId,
          accountIdType: "PAYID",
          payIdType: "EMAL",
          payId: `${paymentData.PayTo}`,
          amount: totalAmount,
          bsb: "",
          accountno: "",
        };
        await validatePayToAgreement(sendData);
      }
      if (!paymentData.BSB == "" || !paymentData.Account_No == "") {
        const sendData = {
          userId: TransactionInfos.userId,
          accountIdType: "BBAN",
          payId: "",
          amount: totalAmount,
          bsb: `${paymentData.BSB}`,
          accountId: `${paymentData.Account_No}`,
        };
        await validatePayToAgreement(sendData);
      }
    }
  };

  const validatePayToAgreement = async (data) => {
    try {
      const validatePayToAgreement = await axios.post(
        CommonConstants.NEW_BASE_URL + "/zaiPayment/validatePayToAgreement",
        data
      );

      if (validatePayToAgreement.data.status === true) {
        setloadervalue(false);
        setShowDiv1(true);
        setOnError(false);
      }
    } catch (err) {
      setloadervalue(false);
      setAggrementStatus(null);
      setErrorMessage(err.message);
      setOnError(true);
      setShowDiv1(false);
    }
  };

  const createPayToAgreement = async () => {
    setloadervalue(true);

    try {
      const payToAgreement = await axios.post(
        CommonConstants.NEW_BASE_URL +
          "/zaiPayment/createPayToAgreement/" +
          TransactionInfo.userId
      );

      if (payToAgreement.data.status === true) {
        setAggrementStatus(payToAgreement.data.data);
        setloadervalue(false);
        handleSuccessAggrement();
      }
    } catch (err) {
      setloadervalue(false);

      const regex = /"error_code"\s*:\s*"PAYT-ERR-2100"/;

      if (regex.test(err.response.data.message)) {
        setErrorMessage(
          "Agreement validation is in progress. Please wait few second and continue again."
        );
        setOnError(true);
      }

      console.log(err);
    }
  };

  const [MultipleDebitCreditCard, setMultipleDebitCreditCard] = useState([]);
  const [MultiplePayToDetails, setMultiplePayToDetails] = useState([]);

  const handleAutoFillPreferredData = async (paymentMethod) => {
    const formData = new FormData();
    formData.append("userId", localStorage.getItem("Id"));
    formData.append("paymentMethod", paymentMethod);
    const config = {
      method: "POST",
      url: CommonConstants.NEW_BASE_URL + "/getprefereddata",
      headers: { "Content-Type": "multipart/form-data" },
      data: formData,
    };

    axios(config)
      .then((Res) => {
        if (Res.data.status === true && Res.data.statuscode === 200) {
          if (Res?.data?.data != null && Res?.data?.data?.length != 0) {
            if (paymentMethod == "Pay To") {
              setMultiplePayToDetails(Res.data.data);
              setselectCardId1(0);
              let Responsee = Res.data?.data[0];
              setPaymentData((prevState) => ({
                ...prevState,
                PayTo: Responsee?.payId == null ? "" : Responsee?.payId,
                BSB: Responsee?.bsb == null ? "" : Responsee?.bsb,
                Account_No:
                  Responsee?.accountno == null ? "" : Responsee?.accountno,
              }));
            } else {
              setselectCardId1(0);
              setMultiplePayToDetails([]);
            }
          } else {
            setMultipleDebitCreditCard([]);
            setselectCardId(0);
            setCardNumberAutoFill("");
            setCardNumber("");
            setSanitizedCardNumber("");
            setExpiry("");
            setEditCardDetail(false);
            setHolderName("");
            setCardImage(unknown);
            setEditCardDetail(false);
          }
        } else {
          setEditCardDetail(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDirectSendmoneyCall = async () => {
    const PayToformData = new FormData();
    PayToformData.append("transactionId", TransactionID);
    PayToformData.append("isPreferedMethod", prferedMethod);

    const config = {
      method: "POST",
      url: CommonConstants.NEW_BASE_URL + "/sendmoney",
      headers: { "Content-Type": "multipart/form-data" },
      data: PayToformData,
    };
    setloadervalue(true);

    const PaymentRequest = await axios(config);

    if (
      PaymentRequest.data.statuscode === 200 &&
      PaymentRequest.data.status === true
    ) {
      setShowDiv1(false);
      setloadervalue(false);
      navigate({
        pathname: "/transactions",
        state: { TransactionId: TransactionID },
      });
    } else {
      setExistUserWithMwthod(true);
      setloadervalue(false);
      setNepalTransactionmsg(PaymentRequest.data.message);
      setUploadmessage(PaymentRequest.data.body);
      setRecivermessage(PaymentRequest.data.receivermsg);
    }
  };

  const handleBankTransferandPayId = async () => {
    setloadervalue(true);

    const PayToformData = new FormData();
    PayToformData.append("transactionId", TransactionID);
    PayToformData.append("paytoAgreementUuid", "");
    PayToformData.append("isPreferedMethod", false);
    if (RefImage.length > 0) {
      for (let i = 0; i < RefImage.length; i++) {
        PayToformData.append("receipt", RefImage[i]);
      }
    } else {
      PayToformData.append("receipt", "");
    }

    const config = {
      method: "POST",
      url: CommonConstants.NEW_BASE_URL + "/sendmoney",
      headers: { "Content-Type": "multipart/form-data" },
      data: PayToformData,
    };

    const PaymentRequest = await axios(config);

    // const PaytoData = {
    //   transactionId: TransactionID,
    //   paytoAgreementUuid: "",
    //   isPreferedMethod:false,
    //   type: isVisibleDynamic == "Debit Card" || isVisibleDynamic == "Credit Card" ? "card" : "",
    //   cardNumber:isVisibleDynamic == "Credit Card" ? sanitizedCardNumber : isVisibleDynamic == "Debit Card" ? debitcardnumber:"" ,
    //   expiryMonth:isVisibleDynamic == "Credit Card" ? expiry.slice(0, 2) : isVisibleDynamic == "Debit Card" ? expiry1.slice(0, 2) : "",
    //   expiryYear:isVisibleDynamic == "Credit Card" ? expiry.slice(3, 7) : isVisibleDynamic == "Debit Card" ? expiry1.slice(3, 7) : "",
    //   name:isVisibleDynamic == "Credit Card" ? holderName : holderName1 != "" ? holderName1 : "",
    //   cvv:isVisibleDynamic == "Credit Card" ? CVVNumber : isVisibleDynamic == "Debit Card" ? CVVNumber1 : "",
    //   isSavedForFuture:isVisibleDynamic == "Credit Card" ? savedForFuture : isVisibleDynamic == "Debit Card" ? savedforfuture1 : false,
    // };

    // const PaymentRequest = await axios.post(
    //   CommonConstants.NEW_BASE_URL + "/sendmoney",
    //   PaytoData
    // );
    if (PaymentRequest.data.statuscode === 200) {
      if (PaymentRequest.data.status == true) {
        setloadervalue(false);
        setNepalTransactionmsg(PaymentRequest.data.message);
        setNepalTransactionmsgPopup(true);
        if (PaymentRequest.data.data != 0) {
          if (PaymentRequest.data.data == 1) {
            setVerifyKYCDocument(false);
            setVerifyOtherDocument(false);
            setUploadmessage(PaymentRequest.data.body);
            setRecivermessage(PaymentRequest.data.receivermsg);
          } else if (PaymentRequest.data.data == 2) {
            setVerifyKYCDocument(true);
            setVerifyOtherDocument(false);
            setUploadmessage(PaymentRequest.data.body);
            setRecivermessage(PaymentRequest.data.receivermsg);
          } else if (PaymentRequest.data.data == 3) {
            setVerifyKYCDocument(true);
            setVerifyOtherDocument(false);
            setUploadmessage(PaymentRequest.data.body);
            setRecivermessage(PaymentRequest.data.receivermsg);
          } else if (PaymentRequest.data.data == 4) {
            setVerifyKYCDocument(false);
            setVerifyOtherDocument(true);
            setUploadmessage(PaymentRequest.data.body);
            setRecivermessage(PaymentRequest.data.receivermsg);
          }
          setUploadDocumentPropt(true);
          // setUploadmessagepopup(true)
          // setNepalTransactionmsg(PaymentRequest.data.message);
          setloadervalue(false);
          // setNepalTransactionmsgPopup(true);
        }
      } else if (PaymentRequest.data.status == false) {
        // if (PaymentRequest.data.data != null) {
        // debugger
        if (PaymentRequest.data.data != 0) {
          if (PaymentRequest.data.data == 1) {
            setVerifyKYCDocument(false);
            setVerifyOtherDocument(false);
            setUploadmessage(PaymentRequest.data.body);
            setRecivermessage(PaymentRequest.data.receivermsg);
          } else if (PaymentRequest.data.data == 2) {
            setVerifyKYCDocument(true);
            setVerifyOtherDocument(false);
            setUploadmessage(PaymentRequest.data.body);
            setRecivermessage(PaymentRequest.data.receivermsg);
          } else if (PaymentRequest.data.data == 3) {
            setVerifyKYCDocument(true);
            setVerifyOtherDocument(false);
            setUploadmessage(PaymentRequest.data.body);
            setRecivermessage(PaymentRequest.data.receivermsg);
          } else if (PaymentRequest.data.data == 4) {
            setVerifyKYCDocument(false);
            setVerifyOtherDocument(true);
            setUploadmessage(PaymentRequest.data.body);
            setRecivermessage(PaymentRequest.data.receivermsg);
          }
          setUploadDocumentPropt(true);
          // setUploadmessagepopup(true)
          setNepalTransactionmsg(PaymentRequest.data.message);
          setloadervalue(false);
          setNepalTransactionmsgPopup(true);
        } else {
          // if(PaymentRequest.data.data === 0){
          //   setNepalTransactionmsgPopup(true);
          //   setUploadDocumentPropt(true)
          //   setNepalTransactionmsg(PaymentRequest.data.message);
          //   setUploadmessage(PaymentRequest.data.body);
          setRecivermessage(PaymentRequest.data.receivermsg);
          //   setloadervalue(false);
          // }
          setExistUserWithMwthod(true);
          setloadervalue(false);
          setNepalTransactionmsg(PaymentRequest.data.message);
          setUploadmessage(PaymentRequest.data.body);
          setRecivermessage(PaymentRequest.data.receivermsg);
        }
        setloadervalue(false);
      }
    } else if (
      PaymentRequest.data.status == false &&
      PaymentRequest.data.statuscode === 500
    ) {
      if (PaymentRequest.data.data == 0) {
        setExistUserWithMwthod(true);
        setloadervalue(false);
        setNepalTransactionmsg(PaymentRequest.data.message);
        setUploadmessage(PaymentRequest.data.body);
        setRecivermessage(PaymentRequest.data.receivermsg);
      }
    } else {
      setloadervalue(false);
    }
  };

  const handleCopyClick = (textToCopy) => {
    const tempInput = document.createElement("input");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  };

  const [createpaytoAgrement, setCreatepaytoAgrement] = useState();
  const [SuccessAggrement, setSuccessAggrement] = useState(false);
  const [ErrorAggrementCreate, setErrorAggrementCreate] = useState(false);
  const [ErrorAggrementActive, setErrorAggrementActive] = useState(false);

  const [payIdEmail, setPayIdEmail] = useState("");

  const getZaiPayIdEmail = async () => {
    try {
      setloadervalue(true);
      const transactionInfo = await getTransactionInfo();
      const getZaiPayIdEmail = await axios.post(
        CommonConstants.NEW_BASE_URL +
          "/zaiPayment/createPayIdEmail/" +
          transactionInfo.userId
      );
      if (getZaiPayIdEmail.data.status === true) {
        setPayIdEmail(getZaiPayIdEmail.data.data);
        setloadervalue(false);
      }
    } catch (err) {
      setloadervalue(false);
      console.log(err);
    }
  };

  const handleSuccessAggrement = () => {
    handleDirectSendmoneyCall();
    setSuccessAggrement(false);
  };

  const handleButtonClick2 = async () => {
    if (isVisibleDynamic === "Pay ID Email") {
      await getZaiPayIdEmail();
    }
    setShowDiv2(!showDiv2);
  };

  const handleButtonClick3 = () => {
    setShowDiv3(!showDiv3);
  };

  const [show6, setShowRec6] = useState(false);

  const handleShowRec6 = () => setShowRec6(true);

  // console.log(isVisibleDynamic,"isVisibleDynamic",FirstStepData?.paymentMethod)
  const toggleVisibility = (value) => {
    setIsVisibleDynamic(value);
    setDebitChangetoCredit(false);
    // setDebitChangetoCredit(false)
  };

  const DebitVisibility = (value) => {
    setIsVisibleDynamic(value);
    setDebitChangetoCredit(true);
  };

  // const CreditVisibility = (value) => {
  //   setIsVisibleDynamic(value);
  //   setDebitChangetoCredit(true)
  // };

  const changeHandler = (e) => {
    setSelected(e.target.value);
  };

  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };
  const handleSetDropdownValue = (value, methodname) => {
    setDropdownValue(value);
    setMethodname(methodname);
    setDropdownState(!dropdownState);
  };

  const handleSaveTransaction = (ServiceCharge, PaymentMethodName) => {
    // if()
    setloadervalue(true);
    // debugger
    const T_Id = {
      id: TransactionID
        ? TransactionID
        : location?.state?.TransactionData &&
          location?.state?.TransactionData?.id,
    };
    axios
      .post(CommonConstants.NEW_BASE_URL + "/gettransactionbyid", T_Id)
      .then((res) => {
        if (res.data.statuscode == 200) {
          setloadervalue(false);

          if (res.data.data.paymentMethod != PaymentMethodName) {
            setloadervalue(true);

            const data = {
              id: res.data.data.id,
              userId: res.data.data.userId,
              recipientId: res.data.data.recipientId,
              sendingCurrencyCode: res.data.data.sendingCurrencyCode,
              recevingCurrencyCode: res.data.data.recevingCurrencyCode,
              sendingCountryId: res.data.data.sendingCountryId,
              recevingCountryId: res.data.data.recevingCountryId,
              partnerBankId: res.data.data.partnerBankId,
              amount: res.data.data.amount,
              totalPayable: Number(
                (res.data.data.amount + +ServiceCharge)
                  ?.toString()
                  ?.match(/^\d+(?:\.\d{0,2})?/)
              ), //----baki che
              receivingAmount:
                FirstStepData != ""
                  ? FirstStepData.receivingAmount != ""
                    ? Number(
                        (res.data.data.amount * SetExchangerate)
                          ?.toString()
                          ?.match(/^\d+(?:\.\d{0,2})?/)
                      )
                    : location.state?.TransactionData != undefined
                    ? Number(
                        (
                          location.state?.TransactionData?.amount *
                          SetExchangerate
                        )
                          ?.toString()
                          ?.match(/^\d+(?:\.\d{0,2})?/)
                      )
                    : 0
                  : location.state?.TransactionData != undefined
                  ? Number(
                      (
                        location.state?.TransactionData?.amount *
                        SetExchangerate
                      )
                        ?.toString()
                        ?.match(/^\d+(?:\.\d{0,2})?/)
                    )
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
                    ? ServiceCharge
                    : location.state?.TransactionData != undefined
                    ? S_Charge
                    : 0
                  : location.state?.TransactionData != undefined
                  ? S_Charge
                  : 0,
              deliveryMethodId: res.data.data.deliveryMethodId,
              transactionStatusId: 1,
              paymentRequestUuid: res.data.data.paymentRequestUuid,
              paytoAgreementUuid: res.data.data.paytoAgreementUuid,
              stepNo: 5,
              otherDetails: "",
              transferPurposeId: res.data.data.transferPurposeId,
              userTrnsCount: 0,
              userTrnsAmountSum: 0,
              recTrnsCount: 0,
              paymentMethod: PaymentMethodName,
              promoCode:
                FirstStepData != ""
                  ? FirstStepData.promoCode != ""
                    ? FirstStepData.promoCode
                    : ""
                  : "",
              promoCodeServiceChargeDiscAmt:
                FirstStepData != ""
                  ? FirstStepData.PromoCodeDiscount != ""
                    ? FirstStepData.PromoCodeDiscount
                    : 0.0
                  : 0.0,
              promoCodeExRateDiscAmt:
                FirstStepData != ""
                  ? FirstStepData.PromoCodeDiscount != ""
                    ? FirstStepData.PromoCodeDiscount
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
                  ? FirstStepData.discountedAmount != "" &&
                    FirstStepData.discountedAmount != 0
                    ? res.data.data.amount +
                      +ServiceCharge -
                      res.data.data.promoCodeServiceChargeDiscAmt -
                      res.data.data.promoCodeExRateDiscAmt
                    : 0.0
                  : 0.0,
              transactionPaymentStatusId: 0,
              paymentNote: res.data.data.paymentNote,
              assignedUserId: 0,
              deleteAt: "",
              source: "",
              email: res.data.data.email,
              usedCash:
                FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    : 0
                  : 0,
              premimumExId: PremiumEXRateValue.PremiumExchangerateId,
              premimumExRate: PremiumEXRateValue.PremiumExchangerate,
              premimumExAmt: PremiumEXRateValue.PremiumExchangerateAmount,
            };

            axios
              .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
              .then((res) => {
                if (res.data.statuscode == 200) {
                  // visitNextStep()
                  setloadervalue(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeSaveTransaction = (ServiceCharge, PaymentMethodName) => {
    // if()
    setloadervalue(true);
    // debugger
    const T_Id = {
      id: TransactionID
        ? TransactionID
        : location?.state?.TransactionData &&
          location?.state?.TransactionData?.id,
    };
    axios
      .post(CommonConstants.NEW_BASE_URL + "/gettransactionbyid", T_Id)
      .then((res) => {
        if (res.data.statuscode == 200) {
          setloadervalue(false);

          if (res.data.data.paymentMethod != PaymentMethodName) {
            setloadervalue(true);

            const data = {
              id: res.data.data.id,
              userId: res.data.data.userId,
              recipientId: res.data.data.recipientId,
              sendingCurrencyCode: res.data.data.sendingCurrencyCode,
              recevingCurrencyCode: res.data.data.recevingCurrencyCode,
              sendingCountryId: res.data.data.sendingCountryId,
              recevingCountryId: res.data.data.recevingCountryId,
              partnerBankId: res.data.data.partnerBankId,
              amount: res.data.data.amount,
              totalPayable: Number(
                (res.data.data.amount + +ServiceCharge)
                  ?.toString()
                  ?.match(/^\d+(?:\.\d{0,2})?/)
              ), //----baki che
              receivingAmount:
                FirstStepData != ""
                  ? FirstStepData.receivingAmount != ""
                    ? Number(
                        (res.data.data.amount * SetExchangerate)
                          ?.toString()
                          ?.match(/^\d+(?:\.\d{0,2})?/)
                      )
                    : location.state?.TransactionData != undefined
                    ? Number(
                        (
                          location.state?.TransactionData?.amount *
                          SetExchangerate
                        )
                          ?.toString()
                          ?.match(/^\d+(?:\.\d{0,2})?/)
                      )
                    : 0
                  : location.state?.TransactionData != undefined
                  ? Number(
                      (
                        location.state?.TransactionData?.amount *
                        SetExchangerate
                      )
                        ?.toString()
                        ?.match(/^\d+(?:\.\d{0,2})?/)
                    )
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
                    ? ServiceCharge
                    : location.state?.TransactionData != undefined
                    ? S_Charge
                    : 0
                  : location.state?.TransactionData != undefined
                  ? S_Charge
                  : 0,
              deliveryMethodId: res.data.data.deliveryMethodId,
              transactionStatusId: 1,
              paymentRequestUuid: res.data.data.paymentRequestUuid,
              paytoAgreementUuid: res.data.data.paytoAgreementUuid,
              stepNo: 5,
              otherDetails: "",
              transferPurposeId: res.data.data.transferPurposeId,
              userTrnsCount: 0,
              userTrnsAmountSum: 0,
              recTrnsCount: 0,
              paymentMethod: PaymentMethodName,
              promoCode:
                FirstStepData != ""
                  ? FirstStepData.promoCode != ""
                    ? FirstStepData.promoCode
                    : ""
                  : "",
              promoCodeServiceChargeDiscAmt:
                FirstStepData != ""
                  ? FirstStepData.PromoCodeDiscount != ""
                    ? FirstStepData.PromoCodeDiscount
                    : 0.0
                  : 0.0,
              promoCodeExRateDiscAmt:
                FirstStepData != ""
                  ? FirstStepData.PromoCodeDiscount != ""
                    ? FirstStepData.PromoCodeDiscount
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
                  ? FirstStepData.discountedAmount != "" &&
                    FirstStepData.discountedAmount != 0
                    ? res.data.data.amount +
                      +ServiceCharge -
                      res.data.data.promoCodeServiceChargeDiscAmt -
                      res.data.data.promoCodeExRateDiscAmt
                    : 0.0
                  : 0.0,
              transactionPaymentStatusId: 0,
              paymentNote: res.data.data.paymentNote,
              assignedUserId: 0,
              deleteAt: "",
              source: "",
              email: res.data.data.email,
              usedCash:
                FirstStepData != ""
                  ? FirstStepData.usedCash != ""
                    ? FirstStepData.usedCash
                    : 0
                  : 0,
              premimumExId: PremiumEXRateValue.PremiumExchangerateId,
              premimumExRate: PremiumEXRateValue.PremiumExchangerate,
              premimumExAmt: PremiumEXRateValue.PremiumExchangerateAmount,
            };

            axios
              .post(CommonConstants.NEW_BASE_URL + "/savetransaction", data)
              .then((res) => {
                if (res.data.statuscode == 200) {
                  setloadervalue(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [getAllPaymentMethod, setgetAllPaymentMethod] = useState([]);

  const GetAllPaymentMethod = async () => {
    try {
      const data = {
        fromCountryId: TrsnsactionData?.sendingCountryId,
        userId: localStorage.getItem("Id"),
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallactivepaymentmethods",
        data
      );
      if (response.data.status === true) {
        setgetAllPaymentMethod(response.data.data);
      } else if (response.data.status === false) {
      }
    } catch (err) {}
  };

  const [showAdditionalIdUpdate, setshowAdditionalIdUpdate] = useState(false);
  const [showDocumentUplodedPopup, setshowDocumentUplodedPopup] =
    useState(false);
  const [DocumentMessage, setDocumentMessage] = useState("");
  const [Uploadmessage, setUploadmessage] = useState("");
  const [Recivermessage, setRecivermessage] = useState("");
  const [Uploadmessagepopup, setUploadmessagepopup] = useState(false);
  const [UploadDocumentPropt, setUploadDocumentPropt] = useState(false);

  const handleCloseAdditionalIDVerify = () => setshowAdditionalIdUpdate(false);
  const handleShowAdditionalIDVerify = () => setshowAdditionalIdUpdate(true);

  const handlecloseDocumentUplodedVerify = () => {
    setshowDocumentUplodedPopup(false);
  };
  const handleshowDocumentUplodedVerify = () => {
    setshowDocumentUplodedPopup(true);
    // handleCloseAdditionalIDVerify();
  };

  const [Idtypes, setIdtypes] = useState([]);
  const GetIdTypeByCountryId = async (values) => {
    try {
      const IdData = {
        countryId: FirstStepData?.CountryID,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getactiveidtypebycountryid",
        IdData
      );
      if (response.data.status === true) {
        setIdtypes(response.data.data);
      }
    } catch (err) {
      // console.log(err)
    }
  };

  const [MatchPrefred, setMatchPrefred] = useState("");

  const [ID_Images, setID_Images] = useState([]);
  const [AdditionalImage, setAdditionalImage] = useState([]);

  const imageData = (imagee, image2) => {
    setID_Images(imagee.concat(image2));
  };

  const HandleAdditionalDocument = (imagee) => {
    setAdditionalImage(imagee);
  };

  const [VerifyOtherDocument, setVerifyOtherDocument] = useState(false);
  const [VerifyKYCDocument, setVerifyKYCDocument] = useState(false);

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
              "typeId": ${
                IdDocument_Id == null
                  ? UserInfo.data.data.iddetails.typeId
                  : IdDocument_Id
              },
              "documentNumber":"${UserInfo.data.data.iddetails.documentNumber}",
              "cardNumber":"${UserInfo.data.data.iddetails.cardNumber}",
              "dob":"${UserInfo.data.data.iddetails.dob}",
              "documentValidity":"${
                UserInfo.data.data.iddetails.documentValidity
              }",
              "issuingAuthority":"${
                UserInfo.data.data.iddetails.issuingAuthority
              }"
            }`
          );

          for (let i = 0; i < ID_Images.length; i++) {
            formData.append("iddocuments", ID_Images[i]);
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
                  // console.log(documentsWithImages,"documentsWithImages")
                  if (documentsWithImages.length >= 2) {
                    AdditionalImage.map((Item) => {
                      if (Item.ImageArray.length > 0) {
                        // const formDataa = new FormData();

                        // if(Item.typeName == "Other Documents") {
                        //   formDataa.append(
                        //     "userId", localStorage.getItem("Id")
                        //   );

                        //   formDataa.append(
                        //     "documentTypeId",Item.id
                        //   );

                        //   formDataa.append(
                        //     "type",Item.OtherDocumnetName
                        //   );

                        //   for (let i = 0; i < Item.ImageFileArray.length; i++) {
                        //     formDataa.append("documents", Item.ImageFileArray[i]);
                        //   }
                        // }
                        // else{
                        //   formDataa.append(
                        //     "userId", localStorage.getItem("Id")
                        //   );

                        //   formDataa.append(
                        //     "documentTypeId",Item.id
                        //   );

                        //   for (let i = 0; i < Item.ImageFileArray.length; i++) {
                        //     formDataa.append("documents", Item.ImageFileArray[i]);
                        //   }
                        // }

                        const formDataa = new FormData();

                        formData.append("userId", localStorage.getItem("Id"));

                        formData.append("typeId", Item.id);

                        for (let i = 0; i < ID_Images.length; i++) {
                          formData.append("document", ID_Images[i]);
                        }

                        ///////Update changes remaining//////////

                        // console.log(formDataa, "formDataa");

                        const config = {
                          method: "POST",
                          // url: CommonConstants.BASE_URL + "/uploadbusinessdocuments",
                          url:
                            CommonConstants.BASE_URL +
                            "/uploadadditionaldocument",
                          headers: { "Content-Type": "multipart/form-data" },
                          data: formDataa,
                        };

                        axios(config)
                          .then(function (response) {
                            if (response.data.status === true) {
                              // console.log(response.data.data, "UpdatedData");
                              Item.ImageFileArray = "";
                              setloadervalue(false);
                              setDocumentMessage(
                                "Document uploaded successfully."
                              );
                              handleshowDocumentUplodedVerify();
                            } else {
                              setloadervalue(false);
                              setDocumentMessage(
                                "Document uploaded successfully."
                              );
                              handleshowDocumentUplodedVerify();
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
                  setDocumentMessage("Document uploaded successfully.");
                  handleshowDocumentUplodedVerify();
                }
              } else if (response.data.statuscode == 500) {
                if (response.data.status == false) {
                  if (response.data.data == null) {
                    setshowDocumentUplodedPopup(true);
                    setDocumentMessage(response.data.message);
                  }
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
          // console.log(documentsWithImages,"documentsWithImages")
          if (documentsWithImages.length >= 2) {
            AdditionalImage.map((Item) => {
              if (Item.ImageArray.length > 0) {
                // const formDataa = new FormData();

                // if(Item.typeName == "Other Documents") {
                //   formDataa.append(
                //     "userId", localStorage.getItem("Id")
                //   );

                //   formDataa.append(
                //     "documentTypeId",Item.id
                //   );

                //   formDataa.append(
                //     "type",Item.OtherDocumnetName
                //   );

                //   for (let i = 0; i < Item.ImageFileArray.length; i++) {
                //     formDataa.append("documents", Item.ImageFileArray[i]);
                //   }
                // }
                // else{
                //   formDataa.append(
                //     "userId", localStorage.getItem("Id")
                //   );

                //   formDataa.append(
                //     "documentTypeId",Item.id
                //   );

                //   for (let i = 0; i < Item.ImageFileArray.length; i++) {
                //     formDataa.append("documents", Item.ImageFileArray[i]);
                //   }
                // }

                const formDataa = new FormData();

                formDataa.append("userId", localStorage.getItem("Id"));

                formDataa.append("typeId", Item.id);

                for (let i = 0; i < ID_Images.length; i++) {
                  formDataa.append("document", ID_Images[i]);
                }

                ///////Update changes remaining//////////

                const config = {
                  method: "POST",
                  // url: CommonConstants.BASE_URL + "/uploadbusinessdocuments",
                  url: CommonConstants.BASE_URL + "/uploadadditionaldocument",
                  headers: { "Content-Type": "multipart/form-data" },
                  data: formDataa,
                };

                axios(config)
                  .then(function (response) {
                    if (response.data.status === true) {
                      // console.log(response.data.data, "UpdatedData");
                      Item.ImageFileArray = "";
                      setloadervalue(false);
                      setDocumentMessage("Document uploaded successfully.");
                      handleshowDocumentUplodedVerify();
                    } else if (response.data.statuscode == 500) {
                      if (response.data.status == false) {
                        if (response.data.data == null) {
                          setloadervalue(false);
                          setshowDocumentUplodedPopup(true);
                          setDocumentMessage(response.data.message);
                        }
                      }
                    }
                    // else{
                    //   setloadervalue(false)
                    //   setDocumentMessage("something went wrong !");
                    //   handleshowDocumentUplodedVerify();
                    // }
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

  const [IdDocument_Id, setIdDocument_Id] = useState();

  const handledocumentId = (e) => {
    setIdDocument_Id(e.target.value);
  };

  const handleBUpdateDataIndividual = async () => {
    if (IdDocument_Id !== undefined) {
      const formData = new FormData();

      formData.append("userId", localStorage.getItem("Id"));

      formData.append("typeId", IdDocument_Id);

      for (let i = 0; i < ID_Images.length; i++) {
        formData.append("document", ID_Images[i]);
      }

      const config = {
        method: "POST",
        url: CommonConstants.BASE_URL + "/uploadadditionaldocument",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios(config)
        .then(function (response) {
          if (response.data.status == true) {
            setDocumentMessage(response.data.message);
            handleshowDocumentUplodedVerify();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    // handleShowAdditionalIDVerify(); //Additional Document upload popup
    GetIdTypeByCountryId();
    if (TrsnsactionData) {
      GetAllPaymentMethod();
    }

    // handleAutoFillPreferredData(isVisibleDynamic)
  }, [TrsnsactionData]);

  useEffect(() => {
    setTransactionIddd(TransactionID);
    if (location.state?.TransactionData != undefined) {
      setTransactionIddd(location.state?.TransactionData?.id);
    }
  }, [TransactionID]);

  useEffect(() => {
    if (DebitChangetoCredit === false) {
      handleAutoFillPreferredData(isVisibleDynamic);
    }
  }, [isVisibleDynamic]);

  useEffect(() => {
    GetActivePaymentMethod();
    handleGetDeliveryandPayment();
    setIsVisibleDynamic(
      FirstStepData == "" || FirstStepData == undefined
        ? location.state?.TransactionData != undefined
          ? location.state?.TransactionData?.paymentMethod
          : "Pay To"
        : (FirstStepData && FirstStepData?.paymentMethod === undefined) ||
          FirstStepData?.paymentMethod === ""
        ? "Pay To"
        : FirstStepData?.paymentMethod
    );
    setSelectPayment(
      FirstStepData == ""
        ? location.state?.TransactionData != undefined
          ? location.state?.TransactionData?.paymentMethod
          : "Pay To"
        : (FirstStepData && FirstStepData?.paymentMethod === undefined) ||
          FirstStepData?.paymentMethod === ""
        ? "Pay To"
        : FirstStepData?.paymentMethod
    );
    // handleShowPayment()
  }, [FirstStepData]);

  // const handleAutoFill = () => {
  //   const T_Id = {
  //     id: TransactionID
  //       ? TransactionID
  //       : location.state?.TransactionData &&
  //         location.state?.TransactionData?.id,
  //   };
  //   axios
  //     .post(CommonConstants.NEW_BASE_URL + "/gettransactionbyid", T_Id)
  //     .then((res) => {
  //       if (res.data.statuscode == 200) {
  //         setMatchPrefred(res.data.data);
  //         if (res.data.data?.isPreferedMethod === true) {
  //           setPaymentData({
  //             ...paymentData,
  //             PayTo: res.data.data?.payId,
  //             BSB: "",
  //             Account_No: "",
  //           });
  //         }
  //       }
  //     });
  // };

  //////////////////////////Payment Modal///////////////////////////////
  const [ActivePaymentMethods, setActivePaymentMethods] = useState([]);

  const GetActivePaymentMethod = async (id) => {
    try {
      const data = {
        fromCountryId:
          FirstStepData?.sendingCountryId != undefined
            ? FirstStepData?.sendingCountryId
            : location.state &&
              location.state?.TransactionData?.sendingCountryId,
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

  const [PaymentLowerUpper, setPaymentLowerUpper] = useState([]);
  const [DeliveryLowerUpper, setDeliveryLowerUpper] = useState([]);
  const [Submit_delevery_Method, setSubmit_delevery_Method] = useState(0);
  const [DeafultPSC, setDeafultPSC] = useState(0);

  const handleGetDeliveryandPayment = async (value) => {
    // debugger
    const Servicecharge = {
      amount:
        FirstStepData?.amount != undefined
          ? FirstStepData?.amount
          : location.state && location.state?.TransactionData?.amount,
      fromCountryId:
        FirstStepData?.sendingCountryId != undefined
          ? FirstStepData?.sendingCountryId
          : location.state && location.state?.TransactionData?.sendingCountryId,
      toCountryId:
        FirstStepData?.recevingCountryId != undefined
          ? FirstStepData?.recevingCountryId
          : location.state &&
            location.state?.TransactionData?.recevingCountryId,
    };
    try {
      const getServiceCharge = await axios.post(
        CommonConstants.BASE_URL + "/getservicechargeforsendmoney",
        Servicecharge
      );
      const ServiceChargearray = getServiceCharge.data?.data;
      if (ServiceChargearray != null) {
        // setgetAllPaymentMethodStatic(getServiceCharge.data.data)
        // setgetAllPaymentMethodCharge(getServiceCharge.data.data.paymentMethodCharges);
        // setgetAllDeliveryMethodCharge(getServiceCharge.data.data.deliveryMethodCharges);
        const getAllDeliveryMethodCharge =
          getServiceCharge.data.data.deliveryMethodCharges;
        setDeliveryLowerUpper(getAllDeliveryMethodCharge);

        const defultDelivery =
          location.state &&
          getAllDeliveryMethodCharge.find(
            (item) =>
              item.type == location.state?.TransactionData?.deliveryMethodName
          ).range[0].charge;

        setSubmit_delevery_Method(defultDelivery);
        const getAllPaymentMethodCharge =
          getServiceCharge.data.data.paymentMethodCharges;
        const getAllPaymentMethodStatic = getServiceCharge.data.data;
        if (FirstStepData?.amount !== 0 || "0") {
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
              var S_Amount =
                FirstStepData != ""
                  ? FirstStepData?.amount
                  : location.state && location.state?.TransactionData?.amount;

              var DCA =
                S_Amount >= item.range[0].lower &&
                S_Amount <= item.range[0].upper
                  ? item.range[0].charge
                  : getAllPaymentMethodStatic.serviceCharge;
              var DCAOFC =
                S_Amount >= item.range[0].lower &&
                S_Amount <= item.range[0].upper
                  ? item.range[0].ourfees
                  : 0;
              var DCAFFC =
                S_Amount >= item.range[0].lower &&
                S_Amount <= item.range[0].upper
                  ? item.range[0].fixfees
                  : 0;
              var DCAAT = item.range[0].type;
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
              let S_Amount =
                FirstStepData != ""
                  ? FirstStepData?.amount
                  : location.state && location.state?.TransactionData?.amount;
              // var bbb =
              //   S_Amount >= item.range[0].lower && S_Amount <= item.range[0].upper
              //     ? item.range[0].charge
              //     : getAllPaymentMethodStatic?.serviceCharge;

              var bbbaa = item?.range.filter(
                (items, i) =>
                  (S_Amount == "" ? 0 : S_Amount) >= items.lower &&
                  (S_Amount == "" ? 0 : S_Amount) <= items.upper
              );

              var bbb =
                bbbaa.length == 0
                  ? item?.range[item?.range?.length - 1]?.charge
                  : bbbaa[0].charge;

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
          setPaymentLowerUpper(LoWer123);
          if (LoWer123.length > 0) {
            const sortedPaymentMethods = LoWer123.sort(
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
              (method) =>
                method.name !== "Debit Card" && method.name !== "Credit Card"
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
                  (FirstStepData?.amount *
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
                var percentageCharge =
                  FirstStepData?.amount *
                  (sortedPaymentMethods[0].serviceCharge / 100);
                const mydata =
                  percentageCharge +
                  sortedPaymentMethods[0].OurFees +
                  sortedPaymentMethods[0].FixFees;
                amountvalue(mydata);
                // PaymentRate(mydata)
              }
            }
          }
        }
      }
    } catch (err) {}
  };

  const [show1, setShowPayment] = useState(false);
  const [PaymentID, setPaymentID] = useState();
  const [selectCardId, setselectCardId] = useState(0);
  const [selectCardId1, setselectCardId1] = useState(0);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState("");
  const [PaymentName, setPaymentName] = useState("");
  const [TotalRate, setTotalRate] = useState(0);
  const [PaymentRate, setPaymentRate] = useState(0);
  const handleClosePayment = () => setShowPayment(false);
  const [ExistUserWithMwthod, setExistUserWithMwthod] = useState(false);

  const handleShowPayment = () => {
    if (!PaymentID) {
      const index = ActivePaymentMethods.findIndex(
        (item) => item.name === defaultPaymentMethod
      );
      setPaymentID(index);
    }
    setShowPayment(true);
  };

  const [SelectPayment, setSelectPayment] = useState(isVisibleDynamic);

  const handlePaymentmethod = (e, id, name, charge, paymentid) => {
    setPaymentID(id);
    setPaymentName(name);
    var ChargeRate = charge[0];
    setPaymentRate(ChargeRate);
    setSelectPayment(name);
    setTotalRate(FirstStepData?.DileveryRate + ChargeRate);
  };

  useEffect(() => {
    var ArrayD = [];
    var RealArrayDelivery = ActivePaymentMethods.map((PaymentMethod, index) => {
      if (PaymentMethod?.enabled === true) {
        var enablearray = {
          name: PaymentMethod.name,
          serviceCharge:
            (FirstStepData?.amount != undefined
              ? FirstStepData?.amount
              : location.state && location.state?.TransactionData?.amount) !== 0
              ? // FirstStepData?.amount != 0 ?
                Number(
                  (
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
                              FirstStepData?.amount != undefined
                                ? FirstStepData?.amount *
                                  (val.serviceCharge / 100)
                                : (location?.state?.TransactionData &&
                                    location.state?.TransactionData?.amount) *
                                  (val.serviceCharge / 100);
                            return percentageCharge + val.OurFees + val.FixFees;
                          }
                        } else {
                          return (FirstStepData?.amount != undefined
                            ? FirstStepData?.amount
                            : location.state &&
                              location.state?.TransactionData?.amount) == 0
                            ? 0
                            : val.serviceCharge;
                        }
                      })
                    ) +
                    (FirstStepData?.DileveryRate != undefined
                      ? FirstStepData?.DileveryRate
                      : location.state && Submit_delevery_Method)
                  )
                    ?.toString()
                    ?.match(/^\d+(?:\.\d{0,2})?/)
                )
              : // ).toFixed(2)
              //  FirstStepData?.DileveryRate ).toFixed(2)
              FirstStepData?.amount != undefined
              ? FirstStepData?.amount
              : location.state && location.state?.TransactionData?.amount,
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
  }, [
    ActivePaymentMethods,
    PaymentLowerUpper,
    Submit_delevery_Method,
    FirstStepData,
  ]);

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <section>
        <Container>
          <Row className="respoChildFooter">
            <Col className="col-lg-12">
              <h1 className="purpleText bolder text-center mt-3 pt-3 pb-3">
                Send Money
              </h1>
            </Col>
            <Col className="col-lg-12 flex-column m-auto d-flex justify-content-center text-center ">
              <div className="smd pb-3">
                {/* <div className="responsiveFontLarge  text-black text-center ">
                  Glance at the summary and submit your data for transection
                </div> */}
              </div>
            </Col>
          </Row>

          <Row className="">
            <Modal.Body className="mainss">
              {!showDiv1 && (
                <Row>
                  <Col className="col-lg-12 d-flex m-auto justify-content-center">
                    <div className={`dropdown`}>
                      <button
                        onClick={(e) => {
                          handleShowPayment();
                        }}
                        className="dropdown-btn d-flex justify-content-evenly align-items-start"
                      >
                        {dropdownValue === "" ? (
                          <>
                            <img
                              src={
                                ActivePaymentMethods && SelectPayment
                                  ? CommonConstants.BASE_URL +
                                    ActivePaymentMethods.find(
                                      (item) => item.name == SelectPayment
                                    )?.logo
                                  : firstPay
                              }
                              width="80"
                              height="80"
                              alt=""
                              className="img-fluid mt-1"
                            />
                            <div className="d-flex flex-column ms-4">
                              <div className=" mainD responsiveFontLarge">
                                Payment Method
                              </div>
                              <div className="text-black text-start bolder  ">
                                {SelectPayment}
                              </div>
                            </div>
                            <img
                              src={drpa}
                              className="img-fluid mt-4 ms-4"
                              alt=""
                            />
                          </>
                        ) : (
                          dropdownValue
                        )}
                      </button>
                    </div>
                  </Col>
                </Row>
              )}

              {isVisibleDynamic == "Pay To" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center mt-3">
                      {!showDiv1 && (
                        <>
                          <div className="d-flex flex-column ">
                            <img
                              height="100"
                              width="100"
                              src={firstPay}
                              alt=""
                              className="img-fluid my-2 d-block m-auto"
                            />
                            <div className="responsiveFontLarge  text-black text-center w-75 d-block m-auto my-2">
                              Set up PayTO agreement to Pay directly from your
                              bank account. Use PayID or BSB and account number.
                            </div>
                          </div>

                          {/* <Form> */}
                          <Form className="mt-3 pe-1 ps-1" id="Signup_Step1">
                            <Row>
                              <div
                                className={`${
                                  MultiplePayToDetails.length <= 1
                                    ? "d-none"
                                    : ""
                                } justify-content-end d-flex pe-4`}
                              >
                                <p
                                  className={`mycardbtn bolder pointer nextBtn1 px-3 text-white`}
                                  onClick={(e) => {
                                    setCloseCard1(true);
                                  }}
                                >
                                  Saved PayTo Details
                                </p>
                              </div>
                            </Row>
                            <Row className="respoChildFooter">
                              <Form.Group
                                as={Col}
                                className="left-inner-addons input-container required"
                              >
                                <img
                                  src={thirdPay}
                                  className="img-fluid aaa"
                                  alt=""
                                />
                                <Form.Control
                                  type="text"
                                  required
                                  placeholder="PayID"
                                  name="PayTo"
                                  value={paymentData.PayTo}
                                  disabled={
                                    !paymentData.BSB == "" ||
                                    !paymentData.Account_No == ""
                                      ? true
                                      : false
                                  }
                                  className=" py-4 formControlStep2 reflink  link"
                                  onChange={(e) => {
                                    if (e.target.value == "") {
                                      setPaytoInvalid(false);
                                    }
                                    handleValueChange(e);
                                  }}
                                />
                                <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  PayID
                                </div>
                                {Paytoalidation &&
                                  (paymentData.PayTo == "" &&
                                  paymentData.Account_No == "" &&
                                  paymentData.BSB == ""
                                    ? true
                                    : paymentData.PayTo == ""
                                    ? paymentData.Account_No != "" ||
                                      paymentData.BSB != ""
                                      ? false
                                      : true
                                    : false) == true && (
                                    <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                      please Enter PayId
                                    </div>
                                  )}
                                {PaytoInvalid && (
                                  <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                    please Enter Valid PayId
                                  </div>
                                )}

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                            <div className="responsiveFontLarge  text-center my-4">
                              OR
                            </div>
                            <Row className="mt-3">
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required"
                              >
                                <Form.Control
                                  type="text"
                                  required
                                  placeholder="BSB"
                                  name="BSB"
                                  className={`py-4 formControlStep2 reflink link`}
                                  disabled={
                                    !paymentData.PayTo == "" ? true : false
                                  }
                                  onChange={(e) => {
                                    handleValueChange(e);
                                    setPaytoInvalid(false);
                                  }}
                                />
                                <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  BSB
                                </div>
                                {/* {Paytoalidation && paymentData.BSB == "" && (
                                  <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                    please Enter BSB
                                  </div>
                                )} */}

                                {Paytoalidation &&
                                  (paymentData.PayTo == "" &&
                                  paymentData.Account_No == "" &&
                                  paymentData.BSB == ""
                                    ? true
                                    : paymentData.BSB == ""
                                    ? paymentData.PayTo != ""
                                      ? false
                                      : true
                                    : false) && (
                                    <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                      please Enter BSB
                                    </div>
                                  )}

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                            <Row className="mt-3">
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required"
                              >
                                <Form.Control
                                  type="text"
                                  required
                                  placeholder="Account No."
                                  name="Account_No"
                                  disabled={
                                    !paymentData.PayTo == "" ? true : false
                                  }
                                  className="py-4 formControlStep2 reflink link"
                                  onChange={(e) => {
                                    handleValueChange(e);
                                    setPaytoInvalid(false);
                                  }}
                                />
                                <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  Account No.
                                </div>
                                {Paytoalidation &&
                                  (paymentData.PayTo == "" &&
                                  paymentData.Account_No == "" &&
                                  paymentData.BSB == ""
                                    ? true
                                    : paymentData.Account_No == ""
                                    ? paymentData.PayTo != ""
                                      ? false
                                      : true
                                    : false) && (
                                    <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                      please Enter Account No.
                                    </div>
                                  )}

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>

                            <Row className="mt-3 d-flex">
                              <div className="d-flex align-items-center">
                                <input
                                  type="checkbox"
                                  id="vehicle1"
                                  className="w-auto "
                                  name="vehicle1"
                                  value="Bike"
                                  checked={prferedMethod}
                                  onChange={(e) => {
                                    setpreferedMethod(!prferedMethod);
                                  }}
                                />
                                <label htmlFor="vehicle1" className="ms-2 mb-0">
                                  {" "}
                                  Save this as preferred payment method
                                </label>
                              </div>
                            </Row>
                            {/* </Form> */}
                            <Row>
                              <Col className="col-lg-12">
                                <Button
                                  className="my-4 col-lg-3 d-block m-auto nextBtn1"
                                  variant="primary"
                                  onClick={(e) => {
                                    if (paymentData.PayTo != "") {
                                      if (
                                        paymentData?.PayTo?.match(
                                          /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$/i
                                        )
                                      ) {
                                        handleButtonClick1(e);
                                        setPaytoInvalid(false);
                                        setPaytoType("EMAL");
                                      } else if (
                                        paymentData?.PayTo?.match(
                                          /^\+\d[0-9]{1,3}-[1-9][0-9]{0,28}$/
                                        )
                                      ) {
                                        handleButtonClick1(e);
                                        setPaytoInvalid(false);
                                        setPaytoType("TELI");
                                      } else if (
                                        paymentData?.PayTo?.match(
                                          /^((\d{9})|(\d{11}))$/
                                        )
                                      ) {
                                        handleButtonClick1(e);
                                        setPaytoInvalid(false);
                                        setPaytoType("AUBN");
                                      } else if (
                                        paymentData?.PayTo?.match(
                                          /^[!-@[-~]{0,254}[!-@[-~]]$/
                                        )
                                      ) {
                                        handleButtonClick1(e);
                                        setPaytoInvalid(false);
                                        setPaytoType("ORGN");
                                      } else {
                                        setPaytoInvalid(true);
                                        setPaytoType("");
                                      }
                                    } else {
                                      handleButtonClick1(e);
                                    }
                                    // handleButtonClick1(e)
                                  }}
                                >
                                  Pay Now
                                </Button>
                              </Col>
                            </Row>
                          </Form>
                        </>
                      )}
                      {showDiv1 && (
                        <section className="container ">
                          <Form>
                            <Form.Group
                              className="mb-3 text-start "
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="ms-2 text-black">
                                Payee
                              </Form.Label>
                              <Form.Control
                                disabled
                                type="text"
                                placeholder={
                                  TransactionInfo && TransactionInfo.userName
                                }
                                value={
                                  TransactionInfo && TransactionInfo.userName
                                }
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-3 text-start text-black"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="ms-2 text-black">
                                Description
                              </Form.Label>
                              <Form.Control
                                disabled
                                type="text"
                                placeholder={
                                  TransactionInfo && TransactionInfo.paymentNote
                                }
                                value={"Agreement on behalf of Legal Remit"}
                              />
                            </Form.Group>

                            {paymentData.BSB == "" ? (
                              <Form.Group
                                className="mb-3 text-start text-black"
                                controlId="formBasicEmail"
                              >
                                <Form.Label className="ms-2 text-black">
                                  PAYID
                                </Form.Label>
                                <Form.Control
                                  disabled
                                  type="text"
                                  placeholder="PAYID"
                                  value={paymentData.PayTo}
                                />
                              </Form.Group>
                            ) : (
                              <>
                                <Form.Group
                                  className="mb-3 text-start text-black"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label className="ms-2 text-black">
                                    BSB
                                  </Form.Label>
                                  <Form.Control
                                    disabled
                                    type="text"
                                    placeholder="123457894567"
                                    value={paymentData.BSB}
                                  />
                                </Form.Group>
                                <Form.Group
                                  className="mb-3 text-start text-black"
                                  controlId="formBasicEmail"
                                >
                                  <Form.Label className="ms-2 text-black">
                                    Acc No.
                                  </Form.Label>
                                  <Form.Control
                                    disabled
                                    type="text"
                                    placeholder="Account No"
                                    value={paymentData.Account_No}
                                  />
                                </Form.Group>
                              </>
                            )}
                            <Form.Group
                              className="mb-3 text-start text-black"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="ms-2 text-black">
                                Amount
                              </Form.Label>
                              <Form.Control
                                disabled
                                type="text"
                                placeholder={
                                  TransactionInfo && TransactionInfo.amount
                                }
                                value={Number(
                                  (
                                    TransactionInfo.amount +
                                    TransactionInfo.serviceCharge
                                  )
                                    ?.toString()
                                    ?.match(/^\d+(?:\.\d{0,2})?/)
                                )}
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-3 text-start text-black"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="ms-2 text-black">
                                Frequency
                              </Form.Label>
                              <Form.Control
                                disabled
                                type="text"
                                placeholder="Frequency"
                                value={"Ad-hoc"}
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-3 text-start text-black"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="ms-2 text-black">
                                Start Date
                              </Form.Label>
                              <Form.Control
                                disabled
                                type="text"
                                placeholder={"Start Date"}
                                value={
                                  TransactionInfo &&
                                  moment(TransactionInfo.createdAt).format(
                                    "DD-MM-YYYY"
                                  )
                                }
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-3 text-start text-black"
                              controlId="formBasicEmail"
                            >
                              <Form.Label className="ms-2 text-black">
                                Auto Renewal
                              </Form.Label>
                              <Form.Control
                                disabled
                                type="text"
                                placeholder="Auto Renewal"
                                value={"No"}
                              />
                            </Form.Group>
                          </Form>
                          <Row>
                            <Col className="col-lg-12">
                              <Button
                                className="my-4 col-lg-3 d-block m-auto nextBtn1"
                                variant="primary"
                                // onClick={handleButtonClick1}
                                onClick={createPayToAgreement}
                              >
                                SUBMIT AGREEMENT
                              </Button>
                            </Col>
                          </Row>
                        </section>
                      )}
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamic == "Pay Id" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-4 text-center">
                      {!showDiv2 && (
                        <>
                          <label className="text-black text-center">
                            We won’t take money from your bank automatically
                          </label>

                          <Form className="mt-3 pe-1 ps-1" id="Signup_Step1">
                            <Container>
                              <Row>
                                <ol className="olMain">
                                  <li className="liMain my-2 text-black ">
                                    {" "}
                                    {/* We’ll give you our bank details. */}
                                    PayID details are on the Next page.
                                  </li>
                                  <li className="liMain my-2 text-black">
                                    {" "}
                                    {/* You’ll need to use your bank tranfer the
                                    money to Legalremit.{" "} */}
                                    Please transfer money from your bank to
                                    Legal Remit PayID
                                  </li>
                                  <li className="liMain my-2 text-black">
                                    {" "}
                                    Once we receive the money, we’ll start the
                                    transfer to recipient.
                                  </li>
                                </ol>
                              </Row>
                            </Container>
                          </Form>
                          <Row>
                            <Col className="col-lg-12 my-4">
                              <Button
                                className="my-4 col-lg-3 d-block m-auto nextBtn1"
                                variant="primary"
                                onClick={handleButtonClick2}
                              >
                                NEXT
                              </Button>
                            </Col>
                          </Row>
                        </>
                      )}

                      {showDiv2 && (
                        <section>
                          <Row className="text-center">
                            <div className="responsiveFontLarge  text-black my-3 bolder">
                              Pay using PayID
                            </div>
                          </Row>
                          <Row>
                            <Container>
                              <div className="responsiveFontLarge  text-black text-center bolder">
                                {" "}
                                Go to your online banking and transfer{" "}
                                <b className="purpleText">
                                  {FirstStepData?.amount
                                    ? Number(
                                        (
                                          FirstStepData?.amount +
                                          TotalRate -
                                          FirstStepData?.PromoCodeDiscount
                                        )
                                          ?.toString()
                                          ?.match(/^\d+(?:\.\d{0,2})?/)
                                      )
                                    : // ).toFixed(FirstStepData?.PromoCodeDiscount == 0 ? 2 : 3)
                                    location.state &&
                                      location.state?.TransactionData
                                    ? location.state?.TransactionData
                                        ?.discountedAmount == 0
                                      ? Number(
                                          (
                                            location.state?.TransactionData
                                              ?.amount + TotalRate
                                          )
                                            ?.toString()
                                            ?.match(/^\d+(?:\.\d{0,2})?/)
                                        )
                                      : // ).toFixed(2)
                                        Number(
                                          (
                                            location.state?.TransactionData
                                              ?.amount +
                                            TotalRate -
                                            location.state?.TransactionData
                                              ?.promoCodeServiceChargeDiscAmt -
                                            location.state?.TransactionData
                                              ?.promoCodeExRateDiscAmt
                                          )
                                            ?.toString()
                                            ?.match(/^\d+(?:\.\d{0,2})?/)
                                        )
                                    : // ).toFixed(3)
                                      ""}{" "}
                                  &nbsp;
                                  {FirstStepData.sendingCurrencyCode
                                    ? FirstStepData.sendingCurrencyCode
                                    : location.state &&
                                      location.state.TransactionData
                                    ? location.state.TransactionData
                                        .sendingCurrencyCode
                                    : ""}
                                </b>{" "}
                                to our PayID using email below.
                              </div>
                              <div className="p-3 rounded-5 inin mt-3">
                                <i className="fa  fa-info-circle ps-3 pe-3 "></i>
                                Your transfer may take up to 24 hours to reach
                                us due to checks in place by your bank.
                              </div>
                            </Container>

                            <Container>
                              <Row className="d-flex align-items-center me-3 ms-3 mt-4 respoChildFooter">
                                <div className="p-2 rounded-5 hh mt-3 d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={thirdPay}
                                      alt=""
                                      className="img-fluid"
                                    />

                                    <div className="ms-2 bolder">
                                      {" "}
                                      {PayIdData.PayIdAccountNumber}
                                    </div>
                                  </div>
                                  <div className="ms-2">
                                    <i className="fa fa-info-circle me-2"></i>
                                    <img
                                      src={copy}
                                      alt=""
                                      className="img-fluid pointer"
                                      onClick={() => {
                                        handleCopyClick(
                                          PayIdData.PayIdAccountNumber
                                        );
                                      }}
                                    />
                                  </div>
                                </div>
                              </Row>

                              <Row className="respoChildFooter d-flex align-items-center me-3 ms-3">
                                <div className="p-2 rounded-5  mt-3 align-items-center">
                                  <Row className="">
                                    <Form.Group className="d-flex align-items-center px-1 input-container required">
                                      <Form.Control
                                        type="text"
                                        required
                                        placeholder="Account Name"
                                        disabled
                                        value={PayIdData.PayIdAccountName}
                                        name="Referal"
                                        className="position-relative py-4 formControlStep2 reflink  link"
                                      />
                                      <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                        Account Name
                                      </div>

                                      {/* {errors.name && <p>{errors.name}</p>} */}
                                      <div
                                        className="ms-2 position-absolute"
                                        style={{ right: 12 }}
                                      >
                                        <img
                                          src={copy}
                                          alt=""
                                          className="img-fluid pointer"
                                          onClick={() => {
                                            handleCopyClick(
                                              PayIdData.PayIdAccountName
                                            );
                                          }}
                                        />
                                      </div>
                                    </Form.Group>
                                  </Row>
                                </div>
                              </Row>

                              <Row>
                                <Col className="col-lg-6 m-auto">
                                  <UploadFiles RefimageData={RefimageData} />
                                </Col>
                              </Row>
                            </Container>
                          </Row>
                          <Row>
                            <Col className="col-lg-12 my-4">
                              <Button
                                className="my-4 col-lg-3 d-block m-auto nextBtn1"
                                variant="primary"
                                onClick={handleBankTransferandPayId} //handleButtonClick2}
                              >
                                Submit
                              </Button>
                            </Col>
                          </Row>
                        </section>
                      )}
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamic == "Pay ID Email" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-4 text-center">
                      {!showDiv2 && (
                        <>
                          <label className="text-black text-center">
                            We won’t take money from your bank automatically
                          </label>

                          <Form className="mt-3 pe-1 ps-1" id="Signup_Step1">
                            <Container>
                              <Row>
                                <ol className="olMain">
                                  <li className="liMain my-2 text-black ">
                                    {" "}
                                    {/* We’ll give you our bank details. */}
                                    Pay ID Email details are on the Next page.
                                  </li>
                                  <li className="liMain my-2 text-black">
                                    {" "}
                                    {/* You’ll need to use your bank tranfer the
                                    money to Legalremit.{" "} */}
                                    Please transfer money from your bank to
                                    Legal Remit PayID
                                  </li>
                                  <li className="liMain my-2 text-black">
                                    {" "}
                                    Once we receive the money, we’ll start the
                                    transfer to recipient.
                                  </li>
                                </ol>
                              </Row>
                            </Container>
                          </Form>
                          <Row>
                            <Col className="col-lg-12 my-4">
                              <Button
                                className="my-4 col-lg-3 d-block m-auto nextBtn1"
                                variant="primary"
                                onClick={handleButtonClick2}
                              >
                                NEXT
                              </Button>
                            </Col>
                          </Row>
                        </>
                      )}

                      {showDiv2 && (
                        <section>
                          <Row className="text-center">
                            <div className="responsiveFontLarge  text-black my-3 bolder">
                              Pay using PayID Email
                            </div>
                          </Row>
                          <Row>
                            <Container>
                              <div className="responsiveFontLarge  text-black text-center bolder">
                                {" "}
                                Go to your online banking and transfer{" "}
                                <b className="purpleText">
                                  {FirstStepData?.amount
                                    ? Number(
                                        (
                                          FirstStepData?.amount +
                                          TotalRate -
                                          FirstStepData?.PromoCodeDiscount
                                        )
                                          ?.toString()
                                          ?.match(/^\d+(?:\.\d{0,2})?/)
                                      )
                                    : // ).toFixed(FirstStepData?.PromoCodeDiscount == 0 ? 2 : 3)
                                    location.state &&
                                      location.state?.TransactionData
                                    ? location.state?.TransactionData
                                        ?.discountedAmount == 0
                                      ? Number(
                                          (
                                            location.state?.TransactionData
                                              ?.amount + TotalRate
                                          )
                                            ?.toString()
                                            ?.match(/^\d+(?:\.\d{0,2})?/)
                                        )
                                      : // ).toFixed(2)
                                        Number(
                                          (
                                            location.state?.TransactionData
                                              ?.amount +
                                            TotalRate -
                                            location.state?.TransactionData
                                              ?.promoCodeServiceChargeDiscAmt -
                                            location.state?.TransactionData
                                              ?.promoCodeExRateDiscAmt
                                          )
                                            ?.toString()
                                            ?.match(/^\d+(?:\.\d{0,2})?/)
                                        )
                                    : // ).toFixed(3)
                                      ""}{" "}
                                  &nbsp;
                                  {FirstStepData.sendingCurrencyCode
                                    ? FirstStepData.sendingCurrencyCode
                                    : location.state &&
                                      location.state.TransactionData
                                    ? location.state.TransactionData
                                        .sendingCurrencyCode
                                    : ""}
                                </b>{" "}
                                to our PayID using email below.
                              </div>
                              <div className="p-3 rounded-5 inin mt-3">
                                <i className="fa  fa-info-circle ps-3 pe-3 "></i>
                                Your transfer may take up to 24 hours to reach
                                us due to checks in place by your bank.
                              </div>
                            </Container>

                            <Container>
                              <Row className="d-flex align-items-center me-3 ms-3 mt-4 respoChildFooter">
                                <div className="p-2 rounded-5 hh mt-3 d-flex justify-content-between align-items-center">
                                  <div className="d-flex align-items-center">
                                    <img
                                      src={thirdPay}
                                      alt=""
                                      className="img-fluid"
                                    />

                                    <div className="ms-2 bolder">
                                      {" "}
                                      {payIdEmail}
                                    </div>
                                  </div>
                                  <div className="ms-2">
                                    <i className="fa fa-info-circle me-2"></i>
                                    <img
                                      src={copy}
                                      alt=""
                                      className="img-fluid pointer"
                                      onClick={() => {
                                        handleCopyClick(payIdEmail);
                                      }}
                                    />
                                  </div>
                                </div>
                              </Row>

                              <Row className="respoChildFooter d-flex align-items-center me-3 ms-3">
                                <div className="p-2 rounded-5  mt-3 align-items-center">
                                  <Row className="">
                                    <Form.Group className="d-flex align-items-center px-1 input-container required">
                                      <Form.Control
                                        type="text"
                                        required
                                        placeholder="Account Name"
                                        disabled
                                        value={TransactionInfo?.userName}
                                        name="Referal"
                                        className="position-relative py-4 formControlStep2 reflink  link"
                                      />
                                      <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                        Account Name
                                      </div>

                                      {/* {errors.name && <p>{errors.name}</p>} */}
                                      <div
                                        className="ms-2 position-absolute"
                                        style={{ right: 12 }}
                                      >
                                        <img
                                          src={copy}
                                          alt=""
                                          className="img-fluid pointer"
                                          onClick={() => {
                                            handleCopyClick(
                                              PayIdData.PayIdAccountName
                                            );
                                          }}
                                        />
                                      </div>
                                    </Form.Group>
                                  </Row>
                                </div>
                              </Row>

                              <Row>
                                <Col className="col-lg-6 m-auto">
                                  <UploadFiles RefimageData={RefimageData} />
                                  {!isImageUploaded ? (
                                    <span className="text-danger">
                                      Proof upload is required
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </Col>
                              </Row>
                            </Container>
                          </Row>
                          <Row>
                            <Col className="col-lg-12 my-4">
                              <Button
                                disabled={!isImageUploaded}
                                className="my-4 col-lg-3 d-block m-auto nextBtn1"
                                variant="primary"
                                onClick={handleBankTransferandPayId} //handleButtonClick2}
                              >
                                Submit
                              </Button>
                            </Col>
                          </Row>
                        </section>
                      )}
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col className="col-lg-12 my-4">
                      <Button
                        className="my-4 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleBankTransferandPayId}//handleButtonClick2}
                      >
                        PAY
                      </Button>
                    </Col>
                  </Row> */}
                </>
              ) : isVisibleDynamic == "Bank Transfer" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-4 text-center">
                      {!showDiv3 && (
                        <>
                          <label className="text-black text-center">
                            We won’t take money from your bank automatically
                          </label>

                          <Form className="mt-3 pe-1 ps-1" id="Signup_Step1">
                            <Container>
                              <Row>
                                <ol className="olMain">
                                  <li className="liMain my-2 text-black">
                                    {" "}
                                    Bank details are available on the Next Page.
                                  </li>
                                  <li className="liMain my-2 text-black">
                                    {" "}
                                    Please transfer money from your bank to
                                    Legal Remit’s Bank Account.{" "}
                                  </li>
                                  <li className="liMain my-2 text-black">
                                    {" "}
                                    Once we receive the money, we will process
                                    the payment.
                                  </li>
                                </ol>
                              </Row>
                            </Container>
                          </Form>
                          <Row>
                            <Col className="col-lg-12 my-4">
                              <Button
                                className="my-4 col-lg-3 d-block m-auto nextBtn1"
                                variant="primary"
                                onClick={handleButtonClick3}
                              >
                                NEXT
                              </Button>
                            </Col>
                          </Row>
                        </>
                      )}

                      {showDiv3 && (
                        <section>
                          <Row>
                            <Container>
                              <div className="responsiveFontLarge  text-black text-center bolder">
                                {" "}
                                Login to your bank account and transfer{" "}
                                <b className="purpleText">
                                  {FirstStepData?.amount
                                    ? Number(
                                        (
                                          FirstStepData?.amount +
                                          FirstStepData?.serviceCharge -
                                          FirstStepData?.PromoCodeDiscount
                                        )
                                          ?.toString()
                                          ?.match(/^\d+(?:\.\d{0,2})?/)
                                      )
                                    : // ).toFixed(FirstStepData?.PromoCodeDiscount == 0 ? 2 : 3)
                                    location.state &&
                                      location.state?.TransactionData
                                    ? location.state?.TransactionData
                                        ?.discountedAmount == 0
                                      ? Number(
                                          (
                                            location.state?.TransactionData
                                              ?.amount +
                                            location.state?.TransactionData
                                              ?.serviceCharge
                                          )
                                            ?.toString()
                                            ?.match(/^\d+(?:\.\d{0,2})?/)
                                        )
                                      : // ).toFixed(2)
                                        Number(
                                          (
                                            location.state?.TransactionData
                                              ?.amount +
                                            location.state?.TransactionData
                                              ?.serviceCharge -
                                            location.state?.TransactionData
                                              ?.promoCodeServiceChargeDiscAmt -
                                            location.state?.TransactionData
                                              ?.promoCodeExRateDiscAmt
                                          )
                                            ?.toString()
                                            ?.match(/^\d+(?:\.\d{0,2})?/)
                                        )
                                    : // ).toFixed(3)
                                      ""}{" "}
                                  &nbsp;
                                  {FirstStepData.sendingCurrencyCode
                                    ? FirstStepData.sendingCurrencyCode
                                    : location.state &&
                                      location.state.TransactionData
                                    ? location.state.TransactionData
                                        .sendingCurrencyCode
                                    : ""}
                                </b>{" "}
                                to Legalremit.
                              </div>
                              <div className="p-3 rounded-5 inin mt-3">
                                <i className="fa  fa-info-circle ps-3 pe-3 "></i>
                                Your transfer may take up to 24 hours to reach
                                us due to checks in place by your bank.
                              </div>
                            </Container>

                            <Container>
                              <Row className="d-flex align-items-center me-1 ms-1 justify-content-center">
                                <Col className="col-lg-11">
                                  <div className="p-2 rounded-5  mt-3 align-items-center justify-content-center">
                                    <Row className="respoChildFooter mt-2 align-items-center">
                                      <Form.Group
                                        as={Col}
                                        className="d-flex align-items-center input-container required"
                                      >
                                        <Form.Control
                                          type="text"
                                          required
                                          placeholder="Account Holder Name"
                                          value={
                                            BankTransferData.AccountHoldernName
                                          }
                                          disabled
                                          name="AccountHoldernName"
                                          className="position-relative py-4 formControlStep2 reflink  link"
                                        />
                                        <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Account Name
                                        </div>
                                        <div
                                          className="ms-2 position-absolute"
                                          style={{ right: 20, top: 10 }}
                                        >
                                          <img
                                            src={copy}
                                            alt=""
                                            className="img-fluid mb-3 pointer"
                                            onClick={() => {
                                              handleCopyClick(
                                                BankTransferData.AccountHoldernName
                                              );
                                            }}
                                          />
                                        </div>
                                        {/* {errors.name && <p>{errors.name}</p>} */}
                                      </Form.Group>
                                    </Row>

                                    <Row className="respoChildFooter mt-2 align-items-center">
                                      <Form.Group
                                        as={Col}
                                        className="d-flex align-items-center  input-container required"
                                      >
                                        <Form.Control
                                          type="text"
                                          required
                                          placeholder="BSB code"
                                          value={BankTransferData.BSB}
                                          disabled
                                          name="BSB"
                                          className="position-relative  py-4 formControlStep2 reflink  link"
                                        />
                                        <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          BSB code
                                        </div>
                                        <div
                                          className="ms-2 position-absolute"
                                          style={{ right: 20, top: 10 }}
                                        >
                                          <img
                                            src={copy}
                                            alt=""
                                            className="img-fluid mb-3 pointer"
                                            onClick={() => {
                                              handleCopyClick(
                                                BankTransferData.BSB
                                              );
                                            }}
                                          />
                                        </div>
                                        {/* {errors.name && <p>{errors.name}</p>} */}
                                      </Form.Group>
                                    </Row>

                                    <Row className="respoChildFooter mt-2 align-items-center">
                                      <Form.Group
                                        as={Col}
                                        className="d-flex align-items-center input-container required"
                                      >
                                        <Form.Control
                                          type="text"
                                          required
                                          value={BankTransferData.AccountNumber}
                                          disabled
                                          placeholder="Account no."
                                          name="AccountNumber"
                                          className="position-relative py-4 formControlStep2 reflink  link"
                                        />
                                        <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Account no.
                                        </div>

                                        {/* {errors.name && <p>{errors.name}</p>} */}

                                        <div
                                          className="ms-2 position-absolute"
                                          style={{ right: 20, top: 10 }}
                                        >
                                          <img
                                            src={copy}
                                            alt=""
                                            className="img-fluid mb-3 pointer"
                                            onClick={() => {
                                              handleCopyClick(
                                                BankTransferData.AccountNumber
                                              );
                                            }}
                                          />
                                        </div>
                                      </Form.Group>
                                    </Row>
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col className="col-lg-6 m-auto">
                                  <UploadFiles RefimageData={RefimageData} />
                                </Col>
                              </Row>
                            </Container>
                          </Row>
                          <Row>
                            <Col className="col-lg-12 my-4">
                              <Button
                                className="my-4 col-lg-3 d-block m-auto nextBtn1"
                                variant="primary"
                                onClick={handleBankTransferandPayId} //handleButtonClick2}
                              >
                                Submit
                              </Button>
                            </Col>
                          </Row>
                        </section>
                      )}
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamic == "POLi" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <div className="d-flex flex-column ">
                        <img
                          height="100"
                          width="100"
                          src={fifthPay}
                          alt=""
                          className="img-fluid my-2 d-block m-auto"
                        />
                        <div className="responsiveFontLarge  bolder text-black mt-2">
                          Pay with POLI
                        </div>
                        <div className="responsiveFontLarge  text-black text-center  d-block m-auto my-4">
                          POLI lets you securely make a payment from your
                          internet bank to Wise. You must send payments from an
                          account in your name. Money coming from friends
                          &realtives can’t be accepted. here’s a list of{" "}
                          <b className="purpleText"> supported banks.</b>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Container>
                      <div className="p-3 rounded-5 inin mt-3">
                        <i className="fa fa-info-circle ps-3 pe-3 "></i>
                        Your transfer may take up to 24 hours to reach us due to
                        checks in place by your bank
                      </div>
                    </Container>
                  </Row>

                  <Row>
                    <Col className="col-lg-12 my-4">
                      <Button
                        className="my-4 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={handleShowRec6}
                      >
                        Pay Now
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamic == "Credit Card" ||
                isVisibleDynamic == "Debit Card" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center mt-3">
                        Enter Card details to pay from your card
                      </label>
                      <Form>
                        <Form className="mt-3 pe-1 ps-1" id="Signup_Step1">
                          <Row>
                            {/*<div*/}
                            {/*    className={`${MultipleDebitCreditCard.length <= 1 ? 'd-none' : 'd-block'} justify-content-end d-flex pe-4`}>*/}
                            {/*    <p className={`mycardbtn bolder pointer nextBtn1 px-3 text-white`}*/}
                            {/*       onClick={(e) => {*/}
                            {/*           setCloseCard(true)*/}
                            {/*       }}>*/}
                            {/*        My Card*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className={`right-inner-addons input ${
                                isCardValid ? "input-container" : ""
                              } required`}
                            >
                              <img
                                src={cardImage}
                                className={`img-fluid bbb ${
                                  editCardDetail == false ? "me-2" : "me-5"
                                }`}
                                alt=""
                              />
                              <Form.Control
                                type="text"
                                required
                                placeholder="Card Number"
                                id="cardNumber"
                                name="cardNumber"
                                value={cardNumber}
                                readOnly={editCardDetail}
                                maxLength="19"
                                onChange={handleCardNumberChange}
                                className=" py-4 formControlStep2 reflink  link"
                              />
                              <Edit
                                className={`purpleText eye-icon ${
                                  editCardDetail === false
                                    ? "d-none"
                                    : "d-block"
                                }`}
                              />

                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                card number
                              </div>
                              {cardValidation && cardNumber == "" && (
                                <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                  Please Enter cardNumber
                                </div>
                              )}
                            </Form.Group>
                            {!isCardValid && (
                              <p className="error_message d-flex justify-content-start text-danger ps-2">
                                Invalid credit card number
                              </p>
                            )}
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className={`left-inner-addon required ${
                                isCardExpiry1 ? "input-container" : ""
                              } `}
                            >
                              <Form.Control
                                type="text"
                                required
                                id="expiry"
                                pattern="(0[1-9]|1[0-2])\/\d{4}"
                                placeholder="MM/YY"
                                value={expiry}
                                maxLength="5"
                                onChange={handleExpiryChange}
                                name="expiry"
                                className="py-4 formControlStep2 reflink link"
                              />
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Expiry Date
                              </div>
                              {cardValidation && expiry == "" && (
                                <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                  Please Enter card expire
                                </div>
                              )}
                              {!isCardExpiry && (
                                <p className="error_message d-flex justify-content-start text-danger ps-2">
                                  your card has expire
                                </p>
                              )}
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              {/* <input type="text" id="cvv" name="cvv" pattern="[0-9]{3,4}" maxlength="4" placeholder="CVV" required> */}

                              <Form.Control
                                type="password"
                                id="cvv"
                                pattern="[0-9]{3,4}"
                                maxlength="4"
                                required
                                placeholder="CVV"
                                value={CVVNumber}
                                onChange={handleCvvNumber}
                                name="cvv"
                                className="py-4 formControlStep2 reflink link"
                              />
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                CVV
                              </div>
                              {cardValidation && CVVNumber == "" && (
                                <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                  Please Enter CVV
                                </div>
                              )}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              <Form.Control
                                type="text"
                                required
                                placeholder="Card holder name"
                                name="Referal"
                                maxlength="25"
                                value={holderName}
                                onChange={handleCardNameChange}
                                className="py-4 formControlStep2 reflink link"
                              />
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Card holder name
                              </div>
                              {cardValidation && holderName == "" && (
                                <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                  Please Enter card holder name
                                </div>
                              )}
                            </Form.Group>
                          </Row>

                          <Row className="mt-3 ps-3 pe-3">
                            <div className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                id="vehicle1"
                                className="w-auto "
                                name="vehicle1"
                                value="Bike"
                                checked={savedForFuture}
                                onChange={(e) => {
                                  setSavedForFuture(!savedForFuture);
                                }}
                              />
                              <label htmlFor="vehicle1" className="ms-2 mb-0">
                                {" "}
                                Save this card for future payment
                              </label>
                            </div>
                          </Row>

                          {/* <Row className="mt-3 ps-3 pe-3">
                                                    <div className="d-flex justify-content-between">
                                                      <div className="responsiveFontLarge  textGray">
                                                        Service Charge :
                                                      </div>
                                                      <div className="responsiveFontLarge  bolder">
                                                        1 AUD
                                                      </div>
                                                    </div>
                                                  </Row> */}
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="col-lg-12 my-4">
                      <Button
                        className="my-4 col-lg-3 d-block m-auto nextBtn1"
                        variant="primary"
                        onClick={(e) => {
                          if (
                            holderName == "" ||
                            CVVNumber == "" ||
                            expiry == "" ||
                            cardNumber == ""
                          ) {
                            setCardValidation(true);
                          } else {
                            setCardValidation(false);
                            handleCardInput(e);
                          }
                        }}
                      >
                        Pay Now
                      </Button>
                    </Col>
                  </Row>
                </>
              ) : (
                ""
              )}
            </Modal.Body>
          </Row>
        </Container>

        <Modal
          centered
          show={SuccessAggrement}
          onHide={handleSuccessAggrement}
          size="lg"
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Success</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <p className="text-black pt-1 mt-0 fs-6">
              {/* Please go to your mobile banking you will receive one transaction
              pay to Authorisation Agreement, please authorise your agreement,
              once you submit the agreement to Authorisation then only your
              money can be withdrawn from your account. Please make sure your
              account has a sufficient balance. */}
              Please go to your mobile/internet banking, You will receive a
              PayTo Agreement. Please review this agreement, and Authorise this
              agreement to allow Legal Remit to debit your account. Without
              this, we can not receive your payment.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={handleSuccessAggrement}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        {/* ////////////////// Payment Send Successfull /////////////////// */}

        <Modal
          centered
          show={NepalTransactionmsgPopup}
          onHide={
            UploadDocumentPropt == true
              ? ""
              : (e) => {
                  setNepalTransactionmsgPopup(false);
                  navigate("/");
                }
          }
          size="lg"
        >
          <Modal.Header className=" justify-content-center py-4 ">
            <Modal.Title>
              <div className="d-flex">
                <img src={SuccessTransaction} alt=""></img>
              </div>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="pt-2 mt-2">
            <div className="d-flex justify-content-center">
              <h3>{NepalTransactionmsg}</h3>
            </div>
            <p className="text-black mt-4">
              You can always track your payments in the "Transaction" section
              from Home Screen
            </p>
            {UploadDocumentPropt == true ? (
              <div className="text-black mt-4 ">
                <b className="text-danger">Alert!</b> <b>:</b> {Uploadmessage}
              </div>
            ) : (
              ""
            )}
          </Modal.Body>

          <Modal.Footer className="pb-4">
            {VerifyOtherDocument === false && VerifyKYCDocument === false ? (
              <Button
                className="mt-2 col-lg-3 d-block m-auto nextBtn1"
                variant="primary"
                onClick={(e) => {
                  navigate({
                    pathname: "/transactions",
                    state: { TransactionId: TransactionID },
                  });
                  setNepalTransactionmsgPopup(false);
                }}
              >
                OK
              </Button>
            ) : UploadDocumentPropt == true ? (
              <Button
                className="mt-2 col-lg-3 d-block m-auto nextBtn1"
                variant="primary"
                onClick={(e) => {
                  setNepalTransactionmsgPopup(false);
                  setshowAdditionalIdUpdate(true);
                }}
              >
                Upload Document
              </Button>
            ) : (
              <Button
                className="mt-2 col-lg-3 d-block m-auto nextBtn1"
                variant="primary"
                onClick={(e) => {
                  navigate({
                    pathname: "/transactions",
                    state: { TransactionId: TransactionID },
                  });
                  setNepalTransactionmsgPopup(false);
                }}
              >
                OK
              </Button>
            )}
          </Modal.Footer>
        </Modal>

        {/* /////////////////////////////////////////////////////////////// */}

        <Modal
          centered
          show={onError}
          onHide={(e) => {
            setOnError(false);
          }}
          size="lg"
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Error</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-2">
            <p className="text-black">{errorMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setOnError(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          centered
          show={ErrorAggrementCreate}
          onHide={(e) => {
            setErrorAggrementCreate(false);
            setShowDiv1(!showDiv1);
          }}
          size="lg"
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Error</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <p className="text-black pt-1 mt-4">Something went wrong..!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setErrorAggrementCreate(false);
                setShowDiv1(!showDiv1);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          centered
          show={ErrorAggrementActive}
          onHide={(e) => {
            setErrorAggrementActive(false);
          }}
          size="lg"
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Error</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <p className="text-black pt-1 ">
              Agreement is not active, Please verify from your Mobile banking.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setErrorAggrementActive(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        {/* /////////////////upload Document/////////////////// */}

        <Modal
          centered
          show={Uploadmessagepopup}
          onHide={(e) => {
            setUploadmessagepopup(false);
            // navigate("/");
            navigate({
              pathname: "/transactions",
              state: { TransactionId: TransactionID },
            });
          }}
          size="lg"
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Error</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="">
            <p className="text-black pt-1 ">{Uploadmessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                handleShowAdditionalIDVerify();
              }}
            >
              Upload Document
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          centered
          show={showAdditionalIdUpdate}
          onHide={(e) => {
            navigate({
              pathname: "/transactions",
              state: { TransactionId: TransactionID },
            });
            handleCloseAdditionalIDVerify(e);
          }}
          size="lg"
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
                      Upload Your Document
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
                        <AdditionalUploadDocument
                          IdType={
                            Idtypes.find((item) => item.id == IdDocument_Id)
                              ?.name
                          }
                          CountryId={FirstStepData?.CountryID}
                          VerifyOtherDocument={VerifyOtherDocument}
                          VerifyKYCDocument={VerifyKYCDocument}
                          imageData={imageData}
                          AdditionalDocument={HandleAdditionalDocument}
                        ></AdditionalUploadDocument>
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
              onClick={handleBUpdateDocument} //handleBUpdateDataIndividual}
            >
              Upload Document
            </Button>
          </Modal.Footer>
          <br />
          {/* <br/> */}
        </Modal>

        {/* <Modal
          centered
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
                <div className="mt-5">
                  <Row className="d-flex m-auto">
                    <Col className="col-lg-12 d-flex">
                      <Col className=" pe-2">
                        <AdditionalUploadDocument
                          imageData={imageData}
                        ></AdditionalUploadDocument>
                      </Col>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={handleBUpdateDataIndividual}
            >
              Upload Document
            </Button>
          </Modal.Footer>
          <br />
        </Modal> */}
        {/* /////////////////////////////////////////////////// */}

        <Modal
          centered
          show={showDocumentUplodedPopup}
          onHide={(e) => {
            // navigate("/");
            navigate({
              pathname: "/transactions",
              state: { TransactionId: TransactionID },
            });
            handlecloseDocumentUplodedVerify();
          }}
          dialogClassName="modal-warning"
          size="lg"
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
              onClick={(e) => {
                navigate({
                  pathname: "/transactions",
                  state: { TransactionId: TransactionID },
                });
                handlecloseDocumentUplodedVerify();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
          <br />
          {/* <br/> */}
        </Modal>

        <Modal show={show1} onHide={handleClosePayment} size="lg">
          <Modal.Body className="modal-money-payment">
            {ActivePaymentMethods &&
              ActivePaymentMethods.map((PaymentMethod, index) => {
                if (PaymentMethod?.enabled === true) {
                  return (
                    <div key={index}>
                      <div
                        className={`cardActivePurple ${
                          SelectPayment == PaymentMethod.name
                            ? "cardActiveSendMoney"
                            : ""
                        }`}
                      >
                        <div
                          className="innerCardActive py-3 my-3"
                          onClick={(e) => {
                            toggleVisibility(PaymentMethod.name, e);
                            handlePaymentmethod(
                              e,
                              index,
                              PaymentMethod.name,
                              FirstStepData?.amount !== 0
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
                                          FirstStepData?.amount *
                                          (val.serviceCharge / 100);
                                        return (
                                          percentageCharge +
                                          val.OurFees +
                                          val.FixFees
                                        );
                                      }
                                    } else {
                                      return FirstStepData?.amount === 0
                                        ? 0
                                        : val.serviceCharge;
                                    }
                                  })
                                : FirstStepData?.amount,
                              PaymentMethod.id
                            );
                            handleAutoFillPreferredData(PaymentMethod.name);
                            handleSetDropdownValue(
                              <>
                                <img
                                  src={
                                    CommonConstants.BASE_URL +
                                    PaymentMethod.logo
                                  }
                                  width="80"
                                  alt=""
                                  height="80"
                                  className="img-fluid mt-1"
                                />
                                <div className="d-flex flex-column ms-4">
                                  <div className="mainD responsiveFontLarge">
                                    Payment Method
                                  </div>
                                  <div className="text-black text-start bolder  ">
                                    {PaymentMethod.name}
                                  </div>
                                </div>
                                <img
                                  src={drpa}
                                  alt=""
                                  className="img-fluid mt-4 ms-4"
                                />
                              </>,
                              PaymentMethod.name
                            );
                            handleClosePayment();
                            handleSaveTransaction(
                              (FirstStepData?.amount != undefined
                                ? FirstStepData?.amount
                                : location.state &&
                                  location.state?.TransactionData?.amount) !== 0
                                ? // FirstStepData?.amount != 0 ?
                                  Number(
                                    (
                                      Number(
                                        PaymentLowerUpper.filter(
                                          (val) =>
                                            val.name === PaymentMethod.name
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
                                                FirstStepData?.amount !=
                                                undefined
                                                  ? FirstStepData?.amount *
                                                    (val.serviceCharge / 100)
                                                  : (location?.state
                                                      ?.TransactionData &&
                                                      location.state
                                                        ?.TransactionData
                                                        ?.amount) *
                                                    (val.serviceCharge / 100);
                                              return (
                                                percentageCharge +
                                                val.OurFees +
                                                val.FixFees
                                              );
                                            }
                                          } else {
                                            return (FirstStepData?.amount !=
                                            undefined
                                              ? FirstStepData?.amount
                                              : location.state &&
                                                location.state?.TransactionData
                                                  ?.amount) == 0
                                              ? 0
                                              : val.serviceCharge;
                                          }
                                        })
                                      ) +
                                      (FirstStepData?.DileveryRate != undefined
                                        ? FirstStepData?.DileveryRate
                                        : location.state &&
                                          Submit_delevery_Method)
                                    )
                                      ?.toString()
                                      ?.match(/^\d+(?:\.\d{0,2})?/)
                                  )
                                : // ).toFixed(2)
                                //  FirstStepData?.DileveryRate ).toFixed(2)
                                FirstStepData?.amount != undefined
                                ? FirstStepData?.amount
                                : location.state &&
                                  location.state?.TransactionData?.amount,
                              PaymentMethod.name
                            );
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-start pe-3 ps-3 py-3 ">
                            <div className="">
                              <div className="d-flex align-items-center">
                                <img
                                  src={
                                    CommonConstants.BASE_URL +
                                    PaymentMethod.logo
                                  }
                                  className="img-fluid getLogoSize"
                                  alt=""
                                  height={100}
                                  width={100}
                                />
                                <div className="responsiveFontLarge  text-black bolder ms-4 ">
                                  {PaymentMethod.name}
                                </div>
                                <img
                                  src={info}
                                  className="img-fluid ms-2"
                                  alt=""
                                />
                              </div>
                              <br></br>
                              <div className="d-flex flex-column excLeft">
                                <div className="d-flex pb-2 justify-content-between">
                                  <div className="textGray bolder">
                                    {"1"}{" "}
                                    {FirstStepData?.SendingCurrancy != undefined
                                      ? FirstStepData?.SendingCurrancy
                                      : location.state &&
                                        location.state?.TransactionData
                                          ?.sendingCurrencyCode}{" "}
                                    ={" "}
                                    {FirstStepData?.exchangeRate != undefined
                                      ? FirstStepData?.exchangeRate
                                      : location.state &&
                                        location.state?.TransactionData
                                          ?.exchangeRate}{" "}
                                    {FirstStepData?.RecivingCurrancy !=
                                    undefined
                                      ? FirstStepData?.RecivingCurrancy
                                      : location.state &&
                                        location.state?.TransactionData
                                          ?.recevingCurrencyCode}{" "}
                                  </div>
                                </div>
                                <div className="d-flex pb-2 justify-content-between">
                                  <div className="text-black bolder">
                                    Total Receivable :
                                  </div>{" "}
                                  <div className="text-black bolder">
                                    {
                                      Number(
                                        (FirstStepData?.receivingAmount !=
                                        undefined
                                          ? FirstStepData?.receivingAmount
                                          : location.state &&
                                            location.state?.TransactionData
                                              ?.receivingAmount
                                        )
                                          ?.toString()
                                          ?.match(/^\d+(?:\.\d{0,2})?/)
                                      )
                                      // ).toFixed(2)
                                    }{" "}
                                    {FirstStepData?.RecivingCurrancy !=
                                    undefined
                                      ? FirstStepData?.RecivingCurrancy
                                      : location.state &&
                                        location.state?.TransactionData
                                          ?.recevingCurrencyCode}{" "}
                                  </div>
                                </div>
                                <div className="d-flex pb-2 justify-content-between">
                                  <div className="text-black bolder">
                                    Total Service Charge :
                                  </div>{" "}
                                  <div className="text-black bolder">
                                    {(FirstStepData?.amount != undefined
                                      ? FirstStepData?.amount
                                      : location.state &&
                                        location.state?.TransactionData
                                          ?.amount) !== 0
                                      ? // FirstStepData?.amount != 0 ?
                                        Number(
                                          (
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
                                                      FirstStepData?.amount !=
                                                      undefined
                                                        ? FirstStepData?.amount *
                                                          (val.serviceCharge /
                                                            100)
                                                        : (location?.state
                                                            ?.TransactionData &&
                                                            location.state
                                                              ?.TransactionData
                                                              ?.amount) *
                                                          (val.serviceCharge /
                                                            100);
                                                    return (
                                                      percentageCharge +
                                                      val.OurFees +
                                                      val.FixFees
                                                    );
                                                  }
                                                } else {
                                                  return (FirstStepData?.amount !=
                                                  undefined
                                                    ? FirstStepData?.amount
                                                    : location.state &&
                                                      location.state
                                                        ?.TransactionData
                                                        ?.amount) == 0
                                                    ? 0
                                                    : val.serviceCharge;
                                                }
                                              })
                                            ) +
                                            (FirstStepData?.DileveryRate !=
                                            undefined
                                              ? FirstStepData?.DileveryRate
                                              : location.state &&
                                                Submit_delevery_Method)
                                          )
                                            ?.toString()
                                            ?.match(/^\d+(?:\.\d{0,2})?/)
                                        )
                                      : // ).toFixed(2)
                                      //  FirstStepData?.DileveryRate ).toFixed(2)
                                      FirstStepData?.amount != undefined
                                      ? FirstStepData?.amount
                                      : location.state &&
                                        location.state?.TransactionData
                                          ?.amount}{" "}
                                    {FirstStepData?.SendingCurrancy != undefined
                                      ? FirstStepData?.SendingCurrancy
                                      : location.state &&
                                        location.state?.TransactionData
                                          ?.sendingCurrencyCode}
                                    {/* {FirstStepData?.SendingCurrancy} */}
                                  </div>
                                </div>
                                <div className="d-flex pb-2 justify-content-between">
                                  <div className="text-black bolder">
                                    Total Payable :
                                  </div>{" "}
                                  <div className="text-black bolder">
                                    {/* {
                                    FirstStepData?.amount != undefined ? FirstStepData?.amount :location.state && location.state?.TransactionData?.amount !== 0 ?
                                      (Number(PaymentLowerUpper.filter(val => val.name === PaymentMethod.name)
                                      .map((val) => {
                                        if (val.name === "Debit Card" || val.name === "Credit Card") {
                                          if (val.amountType === "amount") {
                                            var amountvalue = val.serviceCharge + val.OurFees + val.FixFees
                                            return amountvalue !== 0 || amountvalue !== '' ? amountvalue : "0"

                                          } else if (val.amountType === "percentage") {
                                            var percentageCharge = FirstStepData?.amount * (val.serviceCharge / 100);
                                            return percentageCharge + val.OurFees + val.FixFees
                                          }
                                        }
                                        else {
                                          return FirstStepData?.amount != undefined ? FirstStepData?.amount :location.state && location.state?.TransactionData?.amount === 0 ? 0 : val.serviceCharge
                                        }
                                      }
                                      )) + (FirstStepData?.DileveryRate != undefined ? FirstStepData?.DileveryRate : location.state && Submit_delevery_Method)).toFixed(2)
                                      : FirstStepData?.amount != undefined ? FirstStepData?.amount :location.state && location.state?.TransactionData?.amount
                                  }{" "} */}
                                    {
                                      Number(
                                        (
                                          +((FirstStepData?.amount != undefined
                                            ? FirstStepData?.amount
                                            : location.state &&
                                              location.state?.TransactionData
                                                ?.amount) !== 0
                                            ? // FirstStepData?.amount != 0 ?
                                              Number(
                                                (
                                                  Number(
                                                    PaymentLowerUpper.filter(
                                                      (val) =>
                                                        val.name ===
                                                        PaymentMethod.name
                                                    ).map((val) => {
                                                      if (
                                                        val.name ===
                                                          "Debit Card" ||
                                                        val.name ===
                                                          "Credit Card"
                                                      ) {
                                                        if (
                                                          val.amountType ===
                                                          "amount"
                                                        ) {
                                                          var amountvalue =
                                                            val.serviceCharge +
                                                            val.OurFees +
                                                            val.FixFees;
                                                          return amountvalue !==
                                                            0 ||
                                                            amountvalue !== ""
                                                            ? amountvalue
                                                            : "0";
                                                        } else if (
                                                          val.amountType ===
                                                          "percentage"
                                                        ) {
                                                          var percentageCharge =
                                                            FirstStepData?.amount !=
                                                            undefined
                                                              ? FirstStepData?.amount *
                                                                (val.serviceCharge /
                                                                  100)
                                                              : (location?.state
                                                                  ?.TransactionData &&
                                                                  location.state
                                                                    ?.TransactionData
                                                                    ?.amount) *
                                                                (val.serviceCharge /
                                                                  100);
                                                          return (
                                                            percentageCharge +
                                                            val.OurFees +
                                                            val.FixFees
                                                          );
                                                        }
                                                      } else {
                                                        return (FirstStepData?.amount !=
                                                        undefined
                                                          ? FirstStepData?.amount
                                                          : location.state &&
                                                            location.state
                                                              ?.TransactionData
                                                              ?.amount) == 0
                                                          ? 0
                                                          : val.serviceCharge;
                                                      }
                                                    })
                                                  ) +
                                                  (FirstStepData?.DileveryRate !=
                                                  undefined
                                                    ? FirstStepData?.DileveryRate
                                                    : location.state &&
                                                      Submit_delevery_Method)
                                                )
                                                  ?.toString()
                                                  ?.match(/^\d+(?:\.\d{0,2})?/)
                                              )
                                            : // ).toFixed(2)?
                                            //  FirstStepData?.DileveryRate ).toFixed(2)
                                            FirstStepData?.amount != undefined
                                            ? FirstStepData?.amount
                                            : location.state &&
                                              location.state?.TransactionData
                                                ?.amount) +
                                          (FirstStepData?.amount != undefined
                                            ? +FirstStepData?.amount
                                            : location.state &&
                                              +location.state?.TransactionData
                                                ?.amount)
                                        )
                                          ?.toString()
                                          ?.match(/^\d+(?:\.\d{0,2})?/)
                                      )
                                      // ).toFixed(2)
                                    }
                                    {FirstStepData?.SendingCurrancy != undefined
                                      ? FirstStepData?.SendingCurrancy
                                      : location.state &&
                                        location.state?.TransactionData
                                          ?.sendingCurrencyCode}
                                    {/* {FirstStepData?.SendingCurrancy} */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`tick ${
                                SelectPayment == PaymentMethod.name
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
          {/* <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={handleClosePayment}
            >
              Select
            </Button>
          </Modal.Footer> */}
        </Modal>

        <Modal
          centered
          show={ExistUserWithMwthod}
          onHide={(e) => {
            setExistUserWithMwthod(false);
          }}
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Alert</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2 text-center">
            <p className="text-black text-center">{NepalTransactionmsg}</p>
            <br />
            <small className="text-black ">{Uploadmessage}</small>
            <small className={Recivermessage == "" ? "d-none" : "text-black "}>
              {Recivermessage}
            </small>
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

        {/* Multiple Payto data selection popup */}
        <Modal
          show={CloseCard1}
          onHide={(e) => {
            setCloseCard1(false);
          }}
          size="lg"
        >
          <Modal.Body className="modal-money-payment">
            {MultiplePayToDetails &&
              MultiplePayToDetails.map((mycard, index) => {
                // if(PaymentMethod?.enabled === true){
                return (
                  <div key={index}>
                    <div
                      className={`cardActivePurple 
                      ${selectCardId1 === index ? "cardActiveSendMoney" : ""}`}
                    >
                      <div className="innerCardActive py-3 my-3 px-3">
                        <div
                          className="d-flex justify-content-between align-items-start py-3 "
                          onClick={(e) => {
                            setselectCardId1(index);
                            setCloseCard1(false);
                            setPaymentData((prevState) => ({
                              ...prevState,
                              PayTo: mycard?.payId == null ? "" : mycard?.payId,
                              BSB: mycard?.bsb == null ? "" : mycard?.bsb,
                              Account_No:
                                mycard?.accountno == null
                                  ? ""
                                  : mycard?.accountno,
                            }));
                          }}
                        >
                          <div className="">
                            <div className="d-flex align-items-center">
                              <img
                                src={firstPay}
                                alt=""
                                className="img-fluid getLogoSize"
                                height={100}
                                width={100}
                              />
                              <div>
                                <div
                                  className={`${
                                    mycard?.payId == null || mycard?.payId == ""
                                      ? "d-none"
                                      : "d-block"
                                  } fs-5 responsiveFontLarge text-black bolder ms-4`}
                                >
                                  PayTo Id : {mycard?.payId}
                                </div>
                                {/* <div></div> */}
                                <div
                                  className={`${
                                    mycard?.bsb == null || mycard?.bsb == ""
                                      ? "d-none"
                                      : "d-block"
                                  } fs-5 responsiveFontLarge text-black bolder ms-4`}
                                >
                                  BSB : {mycard?.bsb}
                                </div>
                                <div
                                  className={`${
                                    mycard?.accountno == null ||
                                    mycard?.accountno == ""
                                      ? "d-none"
                                      : "d-block"
                                  } fs-6 responsiveFontLarge text-black bolder ms-4`}
                                >
                                  Account Number : {mycard?.accountno}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`tick 
                            ${selectCardId1 === index ? "d-block" : "d-none"}`}
                          >
                            <img src={tickIcon} className="img-fluid" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="py-1 pe-2 ps-2"></hr>
                  </div>
                );
                // }
              })}
          </Modal.Body>
        </Modal>

        <Modal
          centered
          show={NotValidCard}
          onHide={(e) => {
            setNotValidCard(false);
          }}
          size="md"
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Alert</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <small className="text-black fs-6">
              Your card number is not valid. Please enter your valid card
              number.
            </small>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setNotValidCard(false);
              }}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
}
