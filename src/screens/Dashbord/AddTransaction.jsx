import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import { CommonConstants } from "../../Constants/common.constants";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Loader from "../Loader/Loader";
import './AddTransaction.scss';
import logo from '../../assets/images/pdf.png'
import PayTo from '../../assets/images/payto-icon.png'
import UploadFiles from "../../Helpers/UploadFiles/UploadFiles";
import SuccessTransaction from '../../assets/images/TransactionSuccessIcon.svg';
import moment from "moment";
import CloseIcon from "@mui/icons-material/Close";

const AddTransaction = ({ individualuserData, onSuccess, addedData }) => {
    const [completed, setCompleted] = useState(false);
    const [countrys, setAllCountrys] = useState([]);
    const [senderCountrys, setSenderCountrys] = useState([]);
    const [sendingCountryName, setSenderCountryName] = useState(0);
    const [ReceivingCountrys, setReceivingCountrys] = useState([]);
    const [receiveCountryName, setReceiveCountryName] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [receiveMoney, setreceiveMoney] = useState(0);
    const [sendingAmount, setSendingAmount] = useState(0);
    const [deliveryMethod, setDeliveryMethos] = useState([]);
    const [paymentMethod, setPaymentMethos] = useState([]);
    const [receiver, setReceivers] = useState([]);
    const [selectedReceiver, setSelectedReceiver] = useState(0);
    const [purposeOfTransacfer, setPurposeOfTransacfer] = useState([]);
    const [PayoutPartners, setPayoutPartners] = useState([]);
    const [paymentMethodName, setPaymentMethoName] = useState(0);
    const [showPaymentFields, setShowPaymentFields] = useState(true);
    const [selectedPaymnetMethos, setSelectedPaymnetMethos] = useState("");
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [deliveryMethodId, setDaliverMethodId] = useState(0);
    const [purposeOfTransacferId, setPurposeOfTransacferId] = useState(0);
    const [email, setEmail] = useState('');
    const [note, setNote] = useState('');
    const [totalCharge, setTotalCharge] = useState(0);
    const [pserviceCharge, setPserviceCharge] = useState(0);
    const [dserviceCharge, setDserviceCharge] = useState(0);
    const [loadervalue, setloadervalue] = useState(false);
    const [inputValues, setInputValues] = useState({
        payTo: '',
        bsb: '',
        accountNumber: '',
        preferredCheck: true,
    });
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadedFiles1, setUploadedFiles2] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [partnerbankId, setPartnerbankId] = useState(0);
    const [NepalTransactionmsg, setNepalTransactionmsg] = useState("");
    const [NepalTransactionmsgPopup, setNepalTransactionmsgPopup] = useState(false);
    const [showDiv1, setShowDiv1] = useState(false);
    const [TransactionInfo, setTransactionInfo] = useState();
    const [TransactionId, setTransactionId] = useState();
    const [VerifyOtherDocument, setVerifyOtherDocument] = useState(false);
    const [Uploadmessage, setUploadmessage] = useState("");
    const [VerifyKYCDocument, setVerifyKYCDocument] = useState(false);
    const [UploadDocumentPropt, setUploadDocumentPropt] = useState(false);
    const [ErrorAggrementActive, setErrorAggrementActive] = useState(false);
    const [ErrorAggrementCreate, setErrorAggrementCreate] = useState(false);
    const [createpaytoAgrement, setCreatepaytoAgrement] = useState()
    const [SuccessAggrement, setSuccessAggrement] = useState(false);
    const [ExistUserWithMwthod, setExistUserWithMwthod] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [userData, setUserData] = useState([]);
    const [isDataMissing, setIsDataMissing] = useState(false);


    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    const imageData = (imagee, image2) => {
        setUploadedFiles(imagee);
    };
    const imageData2 = (img) => {
        setUploadedFiles2(img);
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };
    const isPayToFilled = inputValues.payTo.trim() !== '';
    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (value.length <= 19) {
            setCardNumber(value);
        }
    };

    const handleExpiryDateChange = (e) => {
        let inputValue = e.target.value;

        // Remove non-numeric characters
        inputValue = inputValue.replace(/[^0-9]/g, '');

        // Format the input
        if (inputValue.length > 2) {
            inputValue = inputValue.slice(0, 2) + '/' + inputValue.slice(2, 6);
        }

        setExpiryDate(inputValue);
    };

    const handleCVVChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        if (value.length <= 4) {
            setCVV(value);
        }
    };

    const handleCardHolderNameChange = (e) => {
        const value = e.target.value.replace(/[^A-Za-z ]/g, ''); // Allow only alphabetic letters and spaces
        setCardHolderName(value);
    };


    const GetAllCountrys = async () => {
        await axios.get(CommonConstants.BASE_URL + '/getcountries').then((responce) => {
            if (responce.data.status == true) {
                setAllCountrys(responce.data.data);
            }
        }).catch(error => console.log(error))
    }

    const GetAllSenderCountry = async () => {
        await axios.get(CommonConstants.BASE_URL + '/getallsendercountries').then((responce) => {
            if (responce.data.status == true) {
                setSenderCountrys(responce.data.data);
            }
        }).catch(error => console.log(error))
    }

    const handleChange = (e) => {
        setloadervalue(true);
        const countryName = e.target.value;
        setSenderCountryName(countryName);
        GetAllReceivingCountry(countryName);
        GetActivePaymentMethod(countryName);
        setloadervalue(false);

    };

    const handleReceivingDropDown = (e) => {
        const selectedvalue = e.target.value;
        setReceiveCountryName(selectedvalue);
        getExchnageRate(selectedvalue);
        GetActiveDeliveryMethod(selectedvalue);

    }
    const GetAllReceivingCountry = async (sendingCountryName) => {
        await axios.post(CommonConstants.BASE_URL + '/getallrecivercountriesbysendercountryid', {
            "senderCountryId": sendingCountryName
        }).then((responce) => {
            if (responce.data.status == true) {
                setReceivingCountrys(responce.data.data);
            }
        }).catch(error => console.log(error))
    };
    const getUserInfo = async () => {
        const getInfo = await axios.post(CommonConstants.BASE_URL + '/getuserinfobyid', { "id": individualuserData });
        if (getInfo.data.status == true) {
            setUserData(getInfo.data.data); //userkycdetails iddetails
            checkDataMissing(getInfo.data.data);
        }
    }
    const getExchnageRate = (receiveCountry) => {
        try {
            const data = {
                fromCountryId: sendingCountryName,
                toCountryId: receiveCountry,
            };
            axios
                .post(CommonConstants.BASE_URL + "/getexchangeratebycountryid", data)
                .then((resp) => {
                    if (resp.data.status === true) {
                        setExchangeRate(resp.data.data.publishedRate);
                    }
                })
        } catch (err) {
            console.log(err);
        }
    };

    const handleAmount = (e) => {
        const amount = e.target.value;
        setSendingAmount(amount);
        setreceiveMoney(
            Number((amount * exchangeRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
            // (amount * exchangeRate).toFixed(2)
        );
    };

    const GetActiveDeliveryMethod = async (sendingCountryName) => {
        await axios.post(CommonConstants.BASE_URL + '/getallactivedeliverymethods', {
            "toCountryId": sendingCountryName
        }).then((responce) => {
            if (responce.data.status == true) {
                setDeliveryMethos(responce.data.data);
            }
        }).catch(error => console.log(error))
    };

    const GetActivePaymentMethod = async (sendingCountryName) => {
        await axios.post(CommonConstants.BASE_URL + '/getallactivepaymentmethods', {
            "fromCountryId": sendingCountryName,
            "userId": individualuserData
        }).then((responce) => {
            if (responce.data.status == true) {
                setPaymentMethos(responce.data.data);
            }
        }).catch(error => console.log(error))
    };

    const GetPayoutPartners = async (sendingCountryName) => {
        const payload = {
            "pageindex": 1,
            "pagesize": 50,
            "searchdata": "",
            "sortparam": "created_at",
            "sortorder": "DESC"
        }
        await axios.post(CommonConstants.BASE_URL + '/getallpartnerbanks', payload).then((responce) => {
            if (responce.data.status == true) {
                setPayoutPartners(responce.data.data);
            }
        }).catch(error => console.log(error))
    };
    const GetReceivers = async () => {
        const formData = new FormData();
        formData.append("userId", individualuserData);
        formData.append("isDeleted", true);

        await axios.post(CommonConstants.BASE_URL + '/getalluserrecipientsbyuserid', formData).then((responce) => {
            if (responce.data.status == true) {
                setReceivers(responce.data.data);
            }
        }).catch(error => console.log(error))
    };

    const getallpurposeoftransfer = async () => {
        await axios.get(CommonConstants.BASE_URL + '/getactivepurposeoftransfer').then((responce) => {
            if (responce.data.status == true) {
                setPurposeOfTransacfer(responce.data.data);
            }
        }).catch(error => console.log(error))
    };

    function handleReceiverChange(event) {
        const selectedValue = event.target.value;
        setSelectedReceiver(selectedValue);
    };

    const handlePaymnetChange = (e) => {
        setloadervalue(true);
        let value = e.target.value;
        setPaymentMethoName(value);
        const selectedMethod = paymentMethod.find((row) => row.id == value);
        setSelectedPaymnetMethos(selectedMethod.name);
        getServiceCharge(selectedMethod.name);
        setloadervalue(false);

    };

    const handleDeliveryChange = (e) => {
        setDaliverMethodId(e.target.value);
    };

    const handlePurpose = (e) => {
        setPurposeOfTransacferId(e.target.value);
    }
    const getServiceCharge = async (selectedPaymentMethodName) => {
        try {
            const payload = {
                "fromCountryId": parseInt(sendingCountryName),
                "toCountryId": parseInt(receiveCountryName),
                "amount": parseInt(sendingAmount)
            };
            const response = await axios.post(CommonConstants.BASE_URL + "/getservicechargeforsendmoney", payload);
            if (response.data.status === true) {
                const getAllPaymentMethodCharge = response.data.data.paymentMethodCharges;
                const getAllDeliveryMethodCharge = response.data.data.deliveryMethodCharges;
                const getAllPaymentMethodStatic = response.data.data;

                var LoWer123 = [];
                getAllPaymentMethodCharge.map((item, index) => {
                    if (item.type == "Debit Card" || item.type == "Credit Card") {
                        var DCA =
                            parseInt(sendingAmount) >= item.range[0].lower &&
                                parseInt(sendingAmount) <= item.range[0].upper
                                ? item.range[0].charge
                                : getAllPaymentMethodStatic.serviceCharge;
                        var DCAOFC =
                            parseInt(sendingAmount) >= item.range[0].lower &&
                                parseInt(sendingAmount) <= item.range[0].upper
                                ? item.range[0].ourfees
                                : 0;
                        var DCAFFC =
                            parseInt(sendingAmount) >= item.range[0].lower &&
                                parseInt(sendingAmount) <= item.range[0].upper
                                ? item.range[0].fixfees
                                : 0;
                        var DCAAT = item.range[0].type;
                        var DCaLowerUpperServiceCharge = {
                            name: item.type,
                            serviceCharge:
                                parseInt(sendingAmount) === "0" || parseInt(sendingAmount) === ""
                                    ? 0
                                    : DCA,
                            OurFees:
                                parseInt(sendingAmount) === "0" || parseInt(sendingAmount) === ""
                                    ? 0
                                    : DCAOFC,
                            FixFees:
                                parseInt(sendingAmount) === "0" || parseInt(sendingAmount) === ""
                                    ? 0
                                    : DCAFFC,
                            amountType: DCAAT,
                        };
                        LoWer123.push(DCaLowerUpperServiceCharge);
                    } else {
                        var bbb =
                            parseInt(sendingAmount) >= item.range[0].lower &&
                                parseInt(sendingAmount) <= item.range[0].upper
                                ? item.range[0].charge
                                : getAllPaymentMethodStatic.serviceCharge;
                        var DCAATT = item.range[0].type;

                        var LowerUpperServiceCharge = {
                            name: item.type,
                            serviceCharge:
                                parseInt(sendingAmount) === "0" || parseInt(sendingAmount) === ""
                                    ? 0
                                    : bbb,
                            amountType: DCAATT,
                        };

                        LoWer123.push(LowerUpperServiceCharge);
                    }
                });
                const selectedPaymentMethod = LoWer123.find(method => method.name === selectedPaymentMethodName);

                // If the selected payment method is found, retrieve the service charge
                let serviceCharge = 0; // Default value if payment method is not found
                if (selectedPaymentMethod) {
                    serviceCharge = selectedPaymentMethod.serviceCharge;
                    if (selectedPaymentMethodName === "Debit Card" || selectedPaymentMethodName === "Credit Card") {
                        serviceCharge += selectedPaymentMethod.OurFees + selectedPaymentMethod.FixFees;
                    }
                }
                setPserviceCharge(serviceCharge);
                var DeliveryServiceChrage = [];
                getAllDeliveryMethodCharge.map((item, index) => {
                    var bbb =
                        parseInt(sendingAmount) >= item.range[0].lower && parseInt(sendingAmount) <= item.range[0].upper
                            ? item.range[0].charge
                            : getAllPaymentMethodStatic.serviceCharge;
                    var LowerUpperServiceCharge = {
                        typeid: item.typeid,
                        name: item.type,
                        serviceCharge:
                            parseInt(sendingAmount) === "0" || parseInt(sendingAmount) === ""
                                ? 0
                                : bbb,
                    };
                    DeliveryServiceChrage.push(LowerUpperServiceCharge);
                });

                let deliveryMethodserviceCharge = 0;
                if (DeliveryServiceChrage) {
                    let data = DeliveryServiceChrage.find((ele) => deliveryMethodId == ele.typeid);
                    setDserviceCharge(data.serviceCharge);
                    deliveryMethodserviceCharge = data.serviceCharge;
                }
                // setTotalCharge(serviceCharge + data.serviceCharge);
                setTotalCharge(serviceCharge + deliveryMethodserviceCharge);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlePartenrBank = (e) => {
        setPartnerbankId(e.target.value);
    }
    const checkAgreement = async (transactionId) => {
        if (paymentMethodName == 2963) {
            if (selectedPaymnetMethos == "Pay To" && !inputValues.payTo == "") {
                const sendData = {
                    userId: individualuserData,
                    accountIdType: "PAYID",
                    payId: inputValues.payTo,
                    bsb: "",
                    accountno: "",
                };
                const checkTransctionStatus = await axios.post(
                    CommonConstants.NEW_BASE_URL + "/checkagreementcreatedornot",
                    sendData
                );
                if (checkTransctionStatus.data.data === null) {
                    setloadervalue(false);
                    handleOpenView();
                } else if (checkTransctionStatus.data.data != null) {
                    const UUid = {
                        agreement_uuid: checkTransctionStatus.data.data.agreementUuid,
                    };
                    const AggrementStatus = await axios.post(
                        CommonConstants.NEW_BASE_URL + "/getagreementstatus",
                        UUid
                    );
                    if (AggrementStatus.data.data.status == "ACTIVE") {
                        const PayToformData = new FormData();
                        PayToformData.append("transactionId", transactionId);
                        PayToformData.append("paytoAgreementUuid", AggrementStatus?.data?.data?.agreement_uuid);
                        PayToformData.append("isPreferedMethod", inputValues?.preferredCheck);
                        const config = {
                            method: "POST",
                            url: CommonConstants.NEW_BASE_URL + "/sendmoney",
                            headers: { "Content-Type": "multipart/form-data" },
                            data: PayToformData,
                        };

                        const PaymentRequest = await axios(config);
                        if (PaymentRequest.data.statuscode === 200) {
                            if (PaymentRequest.data.status == true) {
                                setNepalTransactionmsg(PaymentRequest.data.message);
                                setNepalTransactionmsgPopup(true); // onSuccess();
                            } else {
                                setNepalTransactionmsg(PaymentRequest.data.message);
                                setNepalTransactionmsgPopup(true);
                            }
                        } else {
                            setloadervalue(false);
                            setNepalTransactionmsg(PaymentRequest.data.message);
                            setNepalTransactionmsgPopup(true);
                        }
                    } else {
                        setErrorAggrementActive(true);
                        setloadervalue(false);
                    }
                }
            }
        } else if (!inputValues.bsb == "" || !inputValues.accountNumber == "") {
            const sendData = {
                userId: individualuserData,
                accountIdType: "BBAN",
                payId: "",
                bsb: inputValues.bsb,
                accountno: inputValues.accountNumber,
            };

            const checkTransctionStatus = await axios.post(
                CommonConstants.NEW_BASE_URL + "/checkagreementcreatedornot",
                sendData
            );
            if (checkTransctionStatus.data.data === null) {
                setloadervalue(false);
                handleOpenView();
            } else if (checkTransctionStatus.data.data != null) {
                const UUid = {
                    agreement_uuid: checkTransctionStatus.data.data.agreementUuid,
                };
                const AggrementStatus = await axios.post(
                    CommonConstants.NEW_BASE_URL + "/getagreementstatus",
                    UUid
                );
                if (AggrementStatus.data.data.status == "ACTIVE") {
                    const PayToformData = new FormData();
                    PayToformData.append("transactionId", transactionId);
                    PayToformData.append("paytoAgreementUuid", checkTransctionStatus.data.data.agreementUuid);
                    PayToformData.append("isPreferedMethod", inputValues?.preferredCheck);

                    const config = {
                        method: "POST",
                        url: CommonConstants.NEW_BASE_URL + "/sendmoney",
                        headers: { "Content-Type": "multipart/form-data" },
                        data: PayToformData,
                    };

                    const PaymentRequest = await axios(config);
                    if (PaymentRequest.data.statuscode === 200) {
                        if (PaymentRequest.data.status == true) {
                            setNepalTransactionmsg(PaymentRequest.data.message);
                            setNepalTransactionmsgPopup(true); // onSuccess();
                        }
                    } else {
                        setNepalTransactionmsg(PaymentRequest.data.message);
                        setNepalTransactionmsgPopup(true);
                        setloadervalue(false);
                    }
                } else {
                    setErrorAggrementActive(true);
                    setloadervalue(false);
                }
            }
        }
    }
    // Function to check if the required information is present
    const checkDataMissing = (data) => {
        const kycDetails = data.userkycdetails;
        const idDetails = data.iddetails;

        const missingData =
            !kycDetails?.nationality ||
            !kycDetails?.streetName ||
            !kycDetails?.suburb ||
            !kycDetails?.postalCode ||
            !kycDetails?.stateName ||
            !kycDetails?.occupationName ||
            !idDetails?.issuingAuthority ||
            !idDetails?.type ||
            !idDetails?.documentNumber ||
            !idDetails?.dob ||
            !idDetails?.documentValidity;

        setIsDataMissing(missingData);
    }
    const saveTransacion = async () => {
        try {
            setValidationErrors({});
            const errors = {};
            if (!sendingCountryName) {
                errors.sendingCountryName = "Please Select Sender Country ";
            }
            if (!sendingAmount) {
                errors.sendingAmount = "Please Enter Sending Amount ";
            }
            if (!receiveCountryName) {
                errors.receiveCountryName = "Please Select  Receiving Country ";
            }
            if (!deliveryMethodId) {
                errors.deliveryMethodId = "Please Select Delivery Method  ";
            }
            if (!purposeOfTransacferId) {
                errors.purposeOfTransacferId = "Please Select Purpose Of Transacfer ";
            }
            if (!paymentMethodName) {
                errors.receiveCountry = "Please Select payment MethodName ";
            }
            if (!paymentMethodName) {
                errors.paymentMethodName = "Please Select paymentMethod ";
            }
            if (!selectedReceiver) {
                errors.selectedReceiver = "Please Select Receiver ";
            }
            if (selectedPaymnetMethos == "Credit Card" || selectedPaymnetMethos == "Debit Card") {
                if (!cardNumber) {
                    errors.cardNumber = " Please enter Card Number ";
                }
                if (!cardHolderName) {
                    errors.cardHolderName = " Please enter Card  Holder Name ";
                }
                if (!cvv) {
                    errors.cvv = " Please enter CVV ";
                }
                if (!expiryDate) {
                    errors.expiryDate = " Please enter Expiry Date ";
                }
            }
            if (!inputValues.payTo) {
                errors.payTo = "Please enter Pay To Id"
                errors.bsb = "";
                errors.accountNumber = ""
            } else if (inputValues.payTo) {
                errors.bsb = "";
                errors.accountNumber = "";
            } else {
                if (inputValues.bsb || inputValues.accountNumber) {
                    if (!inputValues.bsb && inputValues.accountNumber) {
                        errors.bsb = 'Please enter BSB.';
                        errors.payTo = "";
                    }
                    if (!inputValues.accountNumber && inputValues.bsb) {
                        errors.accountNumber = 'Please enter Account Number.';
                        errors.payTo = "";
                    }
                }
            }

            setValidationErrors(errors);
            if (Object.keys(validationErrors).length > 0) {
                setloadervalue(true);
                const sendingCurrencyCode = senderCountrys.find((row) => row.id == sendingCountryName);
                const recevingCurrencyCode = ReceivingCountrys.find((row) => row.id == receiveCountryName);
                const totalPayable = Number((parseFloat(sendingAmount) + parseFloat(totalCharge))?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                // const totalPayable = (parseFloat(sendingAmount) + parseFloat(totalCharge)).toFixed(2);

                const requestData = {
                    "userId": individualuserData,
                    "recipientId": selectedReceiver ? parseInt(selectedReceiver) : 0,
                    "sendingCurrencyCode": sendingCurrencyCode?.currency,
                    "recevingCurrencyCode": recevingCurrencyCode?.currency,
                    "sendingCountryId": parseInt(sendingCountryName),
                    "recevingCountryId": parseInt(receiveCountryName),
                    "partnerBankId": parseInt(partnerbankId),
                    "amount": parseInt(sendingAmount),
                    "totalPayable": parseFloat(totalPayable),
                    "receivingAmount": parseInt(receiveMoney),
                    "exchangeRate": parseFloat(exchangeRate),
                    "serviceCharge": parseInt(totalCharge),
                    "deliveryMethodId": parseInt(deliveryMethodId),
                    "otherDetails": "",
                    "transferPurposeId": parseInt(purposeOfTransacferId),
                    "recTrnsCount": 0,
                    "paymentMethod": selectedPaymnetMethos,
                    "promoCode": "",
                    "promoCodeServiceChargeDiscAmt": 0.0,
                    "promoCodeServiceRateDiscAmt": 0.0,
                    "transactionStatusId": 1,
                    "paymentNote": note,
                    "email": email,
                    "assignedUserId": 0,
                    "stepNo": 1,
                    "isPreferedMethod": true,
                    "deleteAt": ""
                }
                const sendData = await axios.post(CommonConstants.NEW_BASE_URL + "/savetransaction", requestData);
                if (sendData.data.status == true) {
                    // let TransactionID = sendData.data.data.transactionNo;
                    let transactionId = sendData.data.data.id;
                    setTransactionId(transactionId);
                    const getTransactionInfo = await axios.post(
                        CommonConstants.NEW_BASE_URL + "/gettransactionbyid",
                        { id: transactionId }
                    );
                    setTransactionInfo(getTransactionInfo.data.data);
                    if (selectedPaymnetMethos == "Pay To") {
                        await checkAgreement(transactionId);

                    } else if (selectedPaymnetMethos == "Bank Transfer") {
                        await handleBankTransferandPayId(transactionId);
                    } else {
                        await hendlePayIdTransacferPayId(transactionId);
                    }
                }
                setloadervalue(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const CreatePaytoAggrement = async () => {
        if (selectedPaymnetMethos == "Pay To" && !inputValues.payTo == "") {
            setloadervalue(true);
            const sendData = {
                userid: TransactionInfo.userId,
                recipientid: TransactionInfo.recipientId,
                accountidtype: "PAYID",
                bsb: "",
                accountid: "",
                payid: inputValues.payTo,
                payidtype: "EMAL",
                payee: TransactionInfo.userName,
                description: "Agreement on behalf of Legal Remit",
                amount: TransactionInfo.amount + TransactionInfo.serviceCharge,
                currency: TransactionInfo.sendingCurrencyCode,
                agreementtype: "AUPM",
                frequency: "ADHOC",
                startdate: moment(TransactionInfo.createdAt).format("YYYY-MM-DD"),
                autorenewal: true,
            };
            const checkTransctionStatus = await axios.post(
                CommonConstants.NEW_BASE_URL + "/createpaytoagreement",
                sendData
            );
            if (checkTransctionStatus.data.status === true) {
                setloadervalue(false);
                setSuccessAggrement(true);
                setCreatepaytoAgrement(checkTransctionStatus.data.data);
                handleSuccessAggrement(checkTransctionStatus.data.data);
            } else if (!checkTransctionStatus.data.data == null) {
            } else {
                setloadervalue(false);
                setErrorAggrementCreate(true);
            }
        } else if (!inputValues.bsb == "" || !inputValues.accountNumber == "") {
            const sendData = {
                userid: TransactionInfo.userId,
                recipientid: TransactionInfo.recipientId,
                accountidtype: "BBAN",
                bsb: inputValues.bsb,
                accountid: inputValues.accountNumber,
                payid: "",
                payidtype: "",
                payee: TransactionInfo.userName,
                description: "Agreement on behalf of Legal Remit",
                amount: Math.round(
                    TransactionInfo.amount + TransactionInfo.serviceCharge
                ),
                currency: TransactionInfo.sendingCurrencyCode,
                agreementtype: "AUPM",
                frequency: "ADHOC",
                startdate: moment(TransactionInfo.createdAt).format("YYYY-MM-DD"),
                autorenewal: true,
            };
            const checkTransctionStatus = await axios.post(
                CommonConstants.NEW_BASE_URL + "/createpaytoagreement",
                sendData
            );
            if (checkTransctionStatus.data.status === true) {
                setSuccessAggrement(true);
                onSuccess();
            } else if (!checkTransctionStatus.data.data == null) {
            } else {
                setloadervalue(false);
                setErrorAggrementCreate(true);
            }
        }
    };
    const handleBankTransferandPayId = async (tId) => {
        setloadervalue(true);
        const PayToformData = new FormData();
        PayToformData.append("transactionId", tId);
        PayToformData.append("paytoAgreementUuid", "");
        PayToformData.append("isPreferedMethod", false);
        for (let i = 0; i < uploadedFiles1.length; i++) {
            PayToformData.append("receipt", uploadedFiles1[i]);
        }
        // PayToformData.append("receipt", uploadedFiles1);
        const config = {
            method: "POST",
            url: CommonConstants.NEW_BASE_URL + "/sendmoney",
            headers: { "Content-Type": "multipart/form-data" },
            data: PayToformData,
        };
        const PaymentRequest = await axios(config);
        if (PaymentRequest.data.status == true) {
            setNepalTransactionmsg(PaymentRequest.data.message);
            setNepalTransactionmsgPopup(true);
        } else {
            setNepalTransactionmsgPopup(true);
            setNepalTransactionmsg(PaymentRequest.data.message);
            setloadervalue(false);
        }

    }
    const hendlePayIdTransacferPayId = async (tid) => {
        setloadervalue(true);
        const PayToformData = new FormData();
        PayToformData.append("transactionId", tid);
        PayToformData.append("paytoAgreementUuid", "");
        PayToformData.append("isPreferedMethod", false);
        for (let i = 0; i < uploadedFiles.length; i++) {
            PayToformData.append("receipt", uploadedFiles[i]);
        }
        // PayToformData.append("receipt", uploadedFiles1);
        const config = {
            method: "POST",
            url: CommonConstants.NEW_BASE_URL + "/sendmoney",
            headers: { "Content-Type": "multipart/form-data" },
            data: PayToformData,
        };
        const PaymentRequest = await axios(config);
        if (PaymentRequest.data.status == true) {
            setNepalTransactionmsg(PaymentRequest.data.message);
            setNepalTransactionmsgPopup(true);
        } else {
            setNepalTransactionmsg(PaymentRequest.data.message);
            setloadervalue(false);
            setNepalTransactionmsgPopup(true);
        }
    }
    const handleSuccessAggrement = (data) => {
        handleDirectSendmoneyCall(data)
        setShowDiv1(!showDiv1);
        setSuccessAggrement(false);
    };

    const hideSuccessModel = () => {
        setNepalTransactionmsgPopup(false);
        onSuccess();
    }
    const handleDirectSendmoneyCall = async (UID) => {
        const PayToformData = new FormData();
        PayToformData.append("transactionId", TransactionId);
        PayToformData.append("paytoAgreementUuid", UID?.agreement_uuid);
        PayToformData.append("isPreferedMethod", inputValues.preferredCheck);
        const config = {
            method: "POST",
            url: CommonConstants.NEW_BASE_URL + "/sendmoney",
            headers: { "Content-Type": "multipart/form-data" },
            data: PayToformData,
        };
        const PaymentRequest = await axios(config);
        if (PaymentRequest.data.statuscode === 200) {
            if (PaymentRequest.data.status == false) {
                setNepalTransactionmsg(PaymentRequest.data.message);
                setExistUserWithMwthod(true);
            } else {
                setNepalTransactionmsg(PaymentRequest.data.message);
                setNepalTransactionmsgPopup(true);

            }
        } else {
            setNepalTransactionmsg(PaymentRequest.data.message);
            setExistUserWithMwthod(true);
        }
    }
    useEffect(() => {
        if (addedData) {
            GetReceivers();
        }
        GetAllCountrys();
        GetAllSenderCountry();
        GetReceivers();
        getallpurposeoftransfer();
        GetPayoutPartners();
        getUserInfo();
    }, [individualuserData, addedData]);


    return (
        <>
            {loadervalue == true ? <Loader /> : ""}
            <section className="row clearfix">
                <Container className="bg-white  rounded-4 mb-5">
                    <div className="innerAbtPage p-0">

                        <div className="p-3 pt-0 rounded-3">
                            <div className="w-auto d-flex respoChildFooter">
                                <div
                                    className="alert alert-warning w-auto px-3"
                                    role="alert"
                                >
                                    Please fill out the information one by one.
                                </div>
                            </div>
                            <Form >
                                {/* onSubmit={handleSubmit} */}
                                <Row className="mb-3 respoChildFooter">
                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Sender Country</Form.Label>
                                        <Form.Select type="number" name="SenderCountry" onChange={handleChange} >
                                            <option>Sender Country</option>
                                            {
                                                senderCountrys && senderCountrys.map((row) => {
                                                    return (
                                                        <>
                                                            <option value={row.id}>{row.name}</option>
                                                        </>
                                                    )

                                                })
                                            }
                                        </Form.Select>
                                        {validationErrors.sendingCountryName && !sendingCountryName && (
                                            <small className="text-danger error_message ms-2">
                                                {validationErrors.sendingCountryName}
                                            </small>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Receiving Country</Form.Label>
                                        <Form.Select type="number" name="BusinessCountry" onChange={handleReceivingDropDown} >
                                            <option>Receiving Country</option>
                                            {
                                                ReceivingCountrys && ReceivingCountrys.map((row) => {
                                                    return (
                                                        <>
                                                            <option value={row.id}>{row.name}</option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                        {validationErrors.receiveCountryName && !receiveCountryName && (
                                            <small className="text-danger error_message ms-2">
                                                {validationErrors.receiveCountryName}
                                            </small>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Exchange Rate</Form.Label>
                                        <Form.Control type="text" placeholder="Exchange Rate" name="ExchangeRate" value={exchangeRate} disabled />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3 respoChildFooter">
                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Sending Amount</Form.Label>
                                        <Form.Control type="number" placeholder="Sending Amount" name="Amount" value={sendingAmount} onChange={handleAmount} />
                                        {validationErrors.sendingAmount && !sendingAmount && (
                                            <small className="text-danger error_message ms-2">
                                                {validationErrors.sendingAmount}
                                            </small>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Delivery Method</Form.Label>
                                        <Form.Select type="number" name="DeliveryMethod" onChange={handleDeliveryChange}>
                                            <option>Select Delivery Method</option>
                                            {
                                                deliveryMethod && deliveryMethod.map((row) => {
                                                    return (
                                                        <>
                                                            <option value={row.id}>{row.name}</option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                        {validationErrors.deliveryMethodId && !deliveryMethodId && (
                                            <small className="text-danger error_message ms-2">
                                                {validationErrors.deliveryMethodId}
                                            </small>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Receiving Amount</Form.Label>
                                        <Form.Control type="text" placeholder="Receiving Amount" name="RecevingAmount" value={receiveMoney} disabled />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3 respoChildFooter">
                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Payment Method</Form.Label>
                                        <Form.Select type="number" name="PaymentMethod" onChange={handlePaymnetChange}  >
                                            <option>Select Payment Method</option>
                                            {
                                                paymentMethod &&
                                                paymentMethod
                                                    .filter((row) => row.name !== "Credit Card" && row.name !== "Debit Card")
                                                    .map((row) => (
                                                        <option key={row.id} value={row.id}>
                                                            {row.name}
                                                        </option>
                                                    ))
                                            }
                                        </Form.Select>
                                        {validationErrors.paymentMethodName && !paymentMethodName && (
                                            <small className="text-danger error_message ms-2">
                                                {validationErrors.paymentMethodName}
                                            </small>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Receiver</Form.Label>
                                        <Form.Select name="PaymentMethod" onChange={handleReceiverChange} value={selectedReceiver}>
                                            <option>Select Receiver</option>
                                            {receiver.length > 0 ? receiver &&
                                                receiver.map((row) => (
                                                    <option key={row.id} value={row.id}>
                                                        {`${row.firstName == "" ? row?.fullName == "[]" ? row?.businessName : row?.fullName : row.firstName + " " + row.lastName} - ${row.phone} - ${row.bankName == null ? "-" : row.bankName}`}
                                                    </option>
                                                )) : <option>No Receiver Available</option>}
                                        </Form.Select>
                                        {validationErrors.selectedReceiver && !selectedReceiver && (
                                            <small className="text-danger error_message ms-2">
                                                {validationErrors.selectedReceiver}
                                            </small>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Service Charge</Form.Label>
                                        <Form.Control type="number" placeholder="Service Charge" name="PhoneNumber" value={totalCharge} disabled />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3 respoChildFooter">
                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Purpose Of Transfer</Form.Label>
                                        <Form.Select type="number" name="DeliveryMethod" onChange={handlePurpose} >
                                            <option>Select purpose Of Transfer </option>
                                            {
                                                purposeOfTransacfer && purposeOfTransacfer.map((row) => {
                                                    return (
                                                        <>
                                                            <option value={row.id}>{row.name}</option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                        {validationErrors.purposeOfTransacferId && !purposeOfTransacferId && (
                                            <small className="text-danger error_message ms-2">
                                                {validationErrors.purposeOfTransacferId}
                                            </small>
                                        )}
                                    </Form.Group>

                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Partner Bank</Form.Label>
                                        <Form.Select type="number" name="DeliveryMethod" onChange={handlePartenrBank} >
                                            <option>Select Partner Bank </option>
                                            {
                                                PayoutPartners && PayoutPartners.map((row) => {
                                                    return (
                                                        <>
                                                            <option value={row.id}>{row.name}</option>
                                                        </>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                        {/* {validationErrors.partnerbankId && !partnerbankId && (
                                            <small className="text-danger error_message ms-2">
                                                {validationErrors.partnerbankId}
                                            </small>
                                        )} */}
                                    </Form.Group>
                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Email (optional)</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Form.Group>


                                </Row>
                                <Row className="mb-3 respoChildFooter">

                                    <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            as="textarea" // Use textarea instead of text
                                            placeholder="Message"
                                            name="consumers"
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        />
                                    </Form.Group>
                                </Row>
                                {selectedPaymnetMethos == "Pay To" ?
                                    (<Row className="mb-3 respoChildFooter">
                                        <Form.Group as={Col} className="pbSt" controlId="formGridEmail">
                                            <Form.Label>Pay To</Form.Label>
                                            <div className="input-with-logo">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="PayTo"
                                                    name="payTo"
                                                    value={inputValues.payTo}
                                                    onChange={handleInputChange}
                                                />
                                                <div className="logo-icon" style={{ backgroundImage: `url(${PayTo})` }}></div>
                                                {validationErrors.payTo && <div className="text-danger">{validationErrors.payTo}</div>}
                                            </div>
                                        </Form.Group>
                                        OR
                                        <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                            <Form.Label>BSB</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="BSB"
                                                name="bsb"
                                                value={inputValues.bsb}
                                                onChange={handleInputChange}
                                            />
                                            {validationErrors.bsb && <div className="text-danger">{validationErrors.bsb}</div>}
                                        </Form.Group>
                                        <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                            <Form.Label>Account Number</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Account Number"
                                                name="accountNumber"
                                                value={inputValues.accountNumber}
                                                onChange={handleInputChange}
                                            />
                                            {validationErrors.accountNumber && <div className="text-danger">{validationErrors.accountNumber}</div>}
                                        </Form.Group>
                                        <Row className="mt-3 d-flex">
                                            <div className="d-flex align-items-center">
                                                <input
                                                    type="checkbox"
                                                    id="vehicle1"
                                                    className="w-auto"
                                                    name="preferredCheck"
                                                    checked={inputValues.preferredCheck}
                                                    onChange={handleInputChange}
                                                />
                                                <label htmlFor="vehicle1" className="ms-2 mb-0">
                                                    {" "}
                                                    Save this as preferred payment method
                                                </label>
                                            </div>
                                        </Row>
                                    </Row>)
                                    : selectedPaymnetMethos == "Pay Id" ?
                                        (<Row className="mb-3 respoChildFooter">
                                            <Row>
                                                <Col className="col-md-4 m-auto">
                                                    <UploadFiles RefimageData={imageData} />
                                                </Col>
                                            </Row>
                                            {uploadedFiles.map((file, index) => (
                                                <div key={index} className="uploaded-file">
                                                    {file.name}
                                                    {file.type === 'application/pdf' && (
                                                        <img src={logo} alt="PDF Logo" className="pdf-logo" />
                                                    )}
                                                </div>
                                            ))}
                                        </Row>) :
                                        selectedPaymnetMethos == "Bank Transfer" ?
                                            (<Row className="mb-3 respoChildFooter">
                                                <Row>
                                                    <Col className="col-md-4 m-auto">
                                                        <UploadFiles RefimageData={imageData2} />
                                                    </Col>
                                                </Row>
                                                {uploadedFiles1.map((file, index) => (
                                                    <div key={index} className="uploaded-file ml-3">
                                                        {file.name}
                                                        {file.type === 'application/pdf' && (
                                                            <img src={logo} alt="PDF Logo" className="pdf-logo" />
                                                        )}
                                                    </div>
                                                ))}
                                            </Row>)
                                            : ""}
                                {/* selectedPaymnetMethos == "Credit Card" || selectedPaymnetMethos == "Debit Card" ?
                                                (<Row className="col-md-12 mb-3">
                                                    <div className="col-md-6">
                                                        <Form.Group as={Col} className="pbSt" controlId="formGridEmail">
                                                            <Form.Label>Card Number</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Card Number"
                                                                name="PayTo"
                                                                value={cardNumber}
                                                                onChange={handleCardNumberChange}
                                                                maxLength={19}
                                                                required
                                                            />
                                                            {validationErrors.cardNumber && <small className="text-danger error_message ms-2">{validationErrors.cardNumber}</small>}
                                                        </Form.Group>

                                                        <Form.Group as={Col} className="pbSt mt-3" controlId="formGridPassword" >
                                                            <Form.Label>Expiry Date</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="MM/YY"
                                                                value={expiryDate}
                                                                onChange={handleExpiryDateChange}
                                                                required
                                                            />
                                                            {validationErrors.expiryDate && <small className="text-danger error_message ms-2">{validationErrors.expiryDate}</small>}
                                                        </Form.Group>
                                                    </div>

                                                    <div className="col-md-6">
                                                        <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                                            <Form.Label>CVV</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="CVV"
                                                                pattern="[0-9]{3}"
                                                                title="Please enter a valid CVV (3 digits)"
                                                                required
                                                                value={cvv}
                                                                onChange={handleCVVChange}
                                                            />
                                                            {validationErrors.cvv && <small className="text-danger error_message ms-2">{validationErrors.cvv}</small>}
                                                        </Form.Group>
                                                        <Form.Group as={Col} className="pbSt mt-3" controlId="formGridPassword">
                                                            <Form.Label>Card Holder Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="Card Holder Name"
                                                                required
                                                                value={cardHolderName}
                                                                onChange={handleCardHolderNameChange}
                                                            />
                                                            {validationErrors.cardHolderName && <small className="text-danger error_message ms-2">{validationErrors.cardHolderName}</small>}
                                                        </Form.Group>
                                                    </div>
                                                </Row>) */}

                                <Button className="btn btn-default purpleBackground text-white w-auto px-3 d-flex ms-auto mt-5" onClick={() => saveTransacion()} disabled={isDataMissing}>
                                    Submit
                                </Button>
                                {isDataMissing && (
                                    <small className="responsiveFontLarge text-danger error_message ms-2 error">NOTE : Your KYC Details or ID Details are missing. Please go to the profile section and fill in the required information..</small>
                                )}
                            </Form>
                        </div>
                    </div>
                    {/* aggrement create model */}
                    <Modal
                        open={openView}
                        onClose={handleCloseView}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "white",
                                padding: "30px",
                                width: { xs: "90%", sm: "70%", md: "50%", lg: "60%" },
                                paddingBottom: "20px",
                            }}
                        >
                            <div className="border-bottom py-2 mb-1 d-flex justify-content-between">
                                <h5>AGREEMENT</h5>
                                <div onClick={handleCloseView} className="pointer">
                                    <CloseIcon />
                                </div>
                            </div>
                            <div className="">
                                <div className="row my-4">
                                    <div className="col-lg-6">
                                        <div className="d-flex  my-3 justify-content-between">
                                            <small className="medium text-black fs-6 ">
                                                Payee:
                                            </small>
                                            <small className="font-weight-light text-black fs-6 ">
                                                {TransactionInfo && TransactionInfo.userName}
                                            </small>
                                        </div>
                                        {inputValues.bsb == "" ?
                                            <>
                                                <div className="d-flex  my-3 justify-content-between">
                                                    <small className="medium text-black fs-6 ">
                                                        PAYID:
                                                    </small>
                                                    <small className="font-weight-light text-black fs-6 ">
                                                        {inputValues.payTo}
                                                    </small>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="d-flex  my-3 justify-content-between">
                                                    <small className="medium text-black fs-6 ">
                                                        BSB:
                                                    </small>
                                                    <small className="font-weight-light text-black fs-6 ">
                                                        {inputValues.bsb}
                                                    </small>
                                                </div>

                                                <div className="d-flex  my-3 justify-content-between">
                                                    <small className="medium text-black fs-6 ">Acc No:</small>
                                                    <small className="font-weight-light text-black fs-6 ">
                                                        {inputValues.accountNumber}
                                                    </small>
                                                </div>
                                            </>}
                                        <div className="d-flex  my-3 justify-content-between">
                                            <small className="medium text-black fs-6 ">
                                                Amount:
                                            </small>
                                            <small className="font-weight-light text-black fs-6 ">
                                                {TransactionInfo && TransactionInfo.amount}
                                            </small>
                                        </div>
                                        <div className="d-flex  my-3 justify-content-between">
                                            <small className="medium text-black fs-6 ">Frequency:</small>
                                            <small className="font-weight-light text-black fs-6 ">
                                                Ad-hoc
                                            </small>
                                        </div>
                                        <div className="d-flex  my-3 justify-content-between">
                                            <small className="medium text-black fs-6 ">
                                                Description:
                                            </small>
                                            <small className="font-weight-light text-black fs-6 ">
                                                Agreement on behalf of Legal Remit
                                            </small>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="d-flex my-3 justify-content-between">
                                            <small className="medium text-black fs-6 "> Start Date:</small>
                                            <small className="font-weight-light text-black fs-6 ">
                                                {
                                                    TransactionInfo &&
                                                    moment(TransactionInfo.createdAt).format(
                                                        "DD-MM-YYYY"
                                                    )
                                                }
                                            </small>
                                        </div>

                                        <div className="d-flex  my-3 justify-content-between">
                                            <small className="medium text-black fs-6 ">
                                                Auto Renewal:
                                            </small>
                                            <small className="font-weight-light text-black fs-6 ">
                                                Yes
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-end mt-3 border-top">
                                <div className="col-lg-3">
                                    <Button
                                        className="m-0 mt-3"
                                        variant="primary"
                                        onClick={CreatePaytoAggrement}
                                    >
                                        SUBMIT AGREEMENT
                                    </Button>
                                </div>
                            </div>
                        </Box>
                    </Modal>
                    {/* aggremnet success model */}
                    <Modal
                        open={SuccessAggrement}
                        onClose={handleSuccessAggrement}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "white",
                                padding: "30px",
                                width: { xs: "90%", sm: "70%", md: "50%", lg: "60%" },
                                paddingBottom: "20px",
                            }}>
                            <div className="border-bottom py-2 mb-1 d-flex justify-content-between">
                                <h5>Success</h5>
                                <div onClick={handleSuccessAggrement} className="pointer">
                                    <CloseIcon />
                                </div>
                                <div className="pt-4 mt-2">
                                    <p className="text-black pt-1 mt-0 fs-6">
                                        Please go to your mobile banking you will receive one transaction
                                        pay to Authorisation Agreement, please authorise your agreement,
                                        once you submit the agreement to Authorisation then only your
                                        money can be withdrawn from your account. Please make sure your
                                        account has a sufficient balance.
                                    </p>
                                </div>
                            </div>
                            <Button
                                className="mt-2 col-lg-3 d-block m-auto nextBtn1"
                                variant="primary"
                                onClick={handleSuccessAggrement}
                            >
                                OK
                            </Button>
                        </Box>
                    </Modal>
                    {/* payment scussessful model */}
                    <Modal
                        open={NepalTransactionmsgPopup}
                        onClose={hideSuccessModel}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "white",
                                padding: "30px",
                                width: { xs: "50%", sm: "50%", md: "50%", lg: "50%" },
                                paddingBottom: "20px",
                            }}>
                            <div className=" justify-content-center py-4 ">
                                <div className="d-flex">
                                    <img src={SuccessTransaction} alt=""></img>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <h3>{NepalTransactionmsg}</h3>
                                </div>
                                <div className="pt-2 mt-2">
                                    <p className="text-black mt-4">
                                        You can always track your payments in the "Transaction" section
                                        from Home Screen
                                    </p>
                                </div>
                                <div className="row d-flex justify-content-end mt-3 border-top">
                                    <div className="col-lg-3">
                                        <Button
                                            className="m-0 mt-3"
                                            variant="primary"
                                            onClick={hideSuccessModel}
                                        >
                                            OK
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Modal>

                    {/* success but not received model  */}
                    <Modal
                        open={ExistUserWithMwthod}
                        onClose={() => setExistUserWithMwthod(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description">
                        <Box sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "white",
                            padding: "30px",
                            width: { xs: "60%", sm: "40%", md: "30%", lg: "40%" },
                            paddingBottom: "20px",
                        }}>
                            <div className="border-bottom">
                                <div className="d-flex align-items-center">
                                    <h3 className="text-black mt-2">Alert</h3>
                                </div>
                            </div>
                            <div className="pt-4 mt-2 text-center">
                                <p className="text-black text-center">{NepalTransactionmsg}</p>
                            </div>
                            <Button
                                className="mt-2 col-lg-3 d-block m-auto nextBtn1"
                                variant="primary"
                                onClick={(e) => {
                                    setExistUserWithMwthod(false);
                                }}
                            >
                                Ok
                            </Button>
                        </Box>
                    </Modal>
                </Container>
            </section>
        </>
    )
}
export default AddTransaction;