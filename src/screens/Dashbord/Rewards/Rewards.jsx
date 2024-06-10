import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown, Col, Row } from "react-bootstrap";
import Select from "react-select";
import "./Rewards.scss";
import axios from "axios";
import PageHeader from "../../../components/PageHeader";
import {
  CommonConstants,
  Types,
  DataTypes,
} from "../../../Constants/common.constants";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";
import moment from "moment";
import {
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import Loader from "../../Loader/Loader";
import ModalComponent from "../ModalComponent";
import ModalComponentPopup from "../ModalComponentPopup";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

function Rewards(props) {
  const [individualuserData, setindividualuserData] = useState([]);
  const [userId, setUserId] = useState();
  const [id, setId] = useState(props.location.state);
  const [loadervalue, setloadervalue] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValues2, setSelectedValues2] = useState([]);
  const [validationError1, setValidationError1] = useState(false);
  const [validationError2, setValidationError2] = useState(false);
  const [key, setKey] = useState("pay1");
  const [key1, setKey1] = useState("payinner1");
  const [key2, setKey2] = useState("payinners1");
  const [recieverCountryIds, setRecieverCountryIds] = useState([]);
  const [issenderCountryId, setissenderCountryId] = useState(null);
  const [senderCountryIds, setSenderCountryIds] = useState();
  const navigate = useNavigate();
  const [countrySettingData, setCountrySettingData] = useState({
    id: "",
    senderCountryId: "",
    recieverCountryIds: [],
  });
  const [menuOpen, setMenuOpen] = useState(undefined);
  const [menuOpen1, setMenuOpen1] = useState(undefined);
  const [menuOpen2, setMenuOpen2] = useState(undefined);
  const [menuOpen3, setMenuOpen3] = useState(undefined);
  const [countryGet, setCountryGet] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [senderCashBalance, setSenderCashBalance] = useState(0);
  const [receiverCashBalance, setReceiverCashBalance] = useState(0);
  const [senderPoints, setSenderPoints] = useState(0);
  const [receiverPoints, setReceiverPoints] = useState(0);
  const [senderMinTransaction, setSenderMinTransaction] = useState(0);
  const [receiverMinTransaction, setReceiverMinTransaction] = useState(0);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [referlDetils, setRefrelDetils] = useState([]);
  const [PremiumExchangeRate, setPremiumExchangeRate] = useState([]);
  const [allCashBalance, setAllCashBalance] = useState([]);
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [AllPromocodes, setAllPromocodes] = useState([]);
  const [allPoints, setAllPoints] = useState([]);
  const [selectedCountries1, setSelectedCountries1] = useState([]);
  const [selectedCountries2, setSelectedCountries2] = useState([]);
  const [selectedCountries3, setSelectedCountries3] = useState([]);
  const [selectedCountries4, setSelectedCountries4] = useState([]);

  const [amount1, setAmount1] = useState(0);
  const [convertedPoints, setConvertedPoints] = useState(0);
  const [amount2, setAmount2] = useState(0);
  const [preminumamt, setpreminumamt] = useState(0);
  const [maxPreAmt, setmaxPreAmt] = useState(0);
  const [redeemPoints, setRedeemPoints] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [redeemPerTransaction, setRedeemPerTransaction] = useState(0);
  const [maxRedimPoint, setmaxRedimPoint] = useState(0);
  const [sendMinAmount, setSendMinAmount] = useState("");
  const [deliveryMethod, setDeliveryMethos] = useState([]);
  const [paymentMethod, setPaymentMethos] = useState([]);
  const [duration, setDuration] = useState(0);
  const [Referralduration, setReferralDuration] = useState("");
  const [pointsFromDate, setpointsFromDate] = useState("");
  const [pointDuration, setPointDuration] = useState("");
  const [perTransactionAddPoint, setPerTransactionAddPoint] = useState("");
  const [senderCountryIds2, setSenderCountryIds2] = useState([]);
  const [selectedPaymnetMethods, setSelectedPaymnetMethods] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [paymnetMethod, setPaymentMethod] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [deliveryMethodId, setDeliveryMethodId] = useState("");
  const [selectedDelivryMethod, setSelectedDelivryMethod] = useState([]);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [points, setPoints] = useState(0);
  const [minExchangeRate, setMinExchangeRate] = useState(0);
  const [maxExchangeRate, setMaxExchangeRate] = useState(0);
  const [discountOnExchangeRate, setdiscountOnExchangeRate] = useState(0);
  const [discountOnServiceCharge, setDiscountOnServiceCharge] = useState(0);
  const [minTransaction, setMinTransaction] = useState("");
  const [maxTransaction, setMaxTransaction] = useState("");
  const [validTo, setValidTo] = useState("");
  const [applyMinServiceCharge, setApplyMinServiceCharge] = useState(0);
  const [applyMaxServiceCharge, setApplyMaxServiceCharge] = useState(0);
  const [error, setError] = useState(false);
  const [additionalCheckboxValue, setAdditionalCheckboxValue] = useState(true);
  const [ReferralPromoCode, setReferralPromoCode] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validFromPromo, setValidFromPromo] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [touched, setTouched] = useState(false);
  const [currency, setCurrency] = useState("");
  const [currency1, setCurrency1] = useState("");
  const [currency2, setCurrency2] = useState("");
  const [currency3, setCurrency3] = useState("");

  const [receiver, setReceivers] = useState([]);
  const [Page, SetPage] = useState(1);
  const [RowsPerPage, SetRowsPerPage] = useState(
    CommonConstants.DefaultPageSize
  );
  const [Search, SetSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [cashBalance, setCashBalance] = useState(0);
  const [minimumSendingAmount, setMinimumSendingAmount] = useState(0);
  const [isForCompleteSignup, setIsForCompleteSignup] = useState(false);
  const [isForTransaction, setIsForTransaction] = useState(false);
  const [message, setMessage] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState([
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ]);
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [selectedType, setSelectedType] = useState("");
  const [selectedTypeValue, setSelectedTypeValue] = useState(0);
  const [selectedtemplate, setSelectedTemplatetype] = useState("");
  const [isForInActiveUser, setIsForInActiveUser] = useState(false);
  const [isKYCIncomple, setIsKYCIncomple] = useState(false);
  const [isForTransactionNotDone, setIsForTransactionNotDone] = useState(false);
  const [minDays, setminDays] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [deleteID, setDeleteId] = useState(0);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [fullTitle, setFullTitle] = useState("");
  const [fullDesciption, setFullDesciption] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [isHidden, setisHidden] = useState(false);
  const [editId, setEditId] = useState(0);
  const handleClose = () => setShowModal1(false);
  const handleShow = () => setShowModal1(true);
  const handleClose1 = () => setShowModal2(false);
  const handleShow1 = () => setShowModal2(true);
  const handleSelect = (ranges) => {
    setSelectionRange([ranges.selection]);
  };
  const openTitleModel = (title) => {
    setFullTitle(title);
    handleShow();
  };
  const openDescriptionModel = (description) => {
    setFullDesciption(description);
    handleShow1();
  };
  const handleDateChange2 = (newDateRange) => {
    const date1 = newDateRange[0]?.$d;
    const date2 = newDateRange[1]?.$d;
    setpointsFromDate(moment(date1).format("YYYY-MM-DD"));
    setExpiryDate(moment(date2).format("YYYY-MM-DD"));
  };
  const editPromocode = async (id) => {
    try {
      setloadervalue(true);
      const url = CommonConstants.BASE_URL + "/getpromocodebyid?id=" + id;
      const response = await axios.get(url);
      setloadervalue(false);
      if (response.data.status == true) {
        togglePreviewPromocode();
        setEditId(id);
        const getData = response.data.data;
        const initialCountry = countryGet.find(
          (option) => option.value === getData.countryId
        );
        setSenderCountryIds2(initialCountry);
        const delivereyMethodMethodIdArray = getData.deliveryMethodId
          .split(",")
          .map((id) => parseInt(id));
        const selectedDelivryMethodOptions = deliveryMethod.filter((option) =>
          delivereyMethodMethodIdArray.includes(option.value)
        );
        setSelectedDelivryMethod(selectedDelivryMethodOptions);
        setDeliveryMethodId(getData.deliveryMethodId);
        const appliedUserIdArray = getData.appliedUserId
          .split(",")
          .map((id) => parseInt(id));
        const initialSelectedUsers = receiver.filter((option) =>
          appliedUserIdArray.includes(option.value)
        );
        setSelectedUsers(initialSelectedUsers);
        setSelectedUserId(getData.appliedUserId);
        setPromoCode(getData.promoCode);
        setValidTo(getData.validTo);
        setValidFromPromo(getData.validFrom);
        const paymentMethodIdArray = getData.paymentMethodId
          .split(",")
          .map((id) => parseInt(id));
        const selectedPaymentMethodOptions = paymentMethod.filter((option) =>
          paymentMethodIdArray.includes(option.value)
        );
        setPaymentMethod(selectedPaymentMethodOptions);
        setPaymentMethodId(getData.paymentMethodId);
        setDescription(getData.description);
        setTitle(getData.title);
        setMinimumSendingAmount(getData.minSendingAmt);
        setCashBalance(getData.benifitsOnCash);
        setMaxAmount(getData.maxAmount);
        setMinAmount(getData.minAmount);
        setDuration(getData.validUpTo);
        setPoints(getData.points);
        setApplyMinServiceCharge(getData.minServiceCharge);
        setDiscountOnServiceCharge(getData.seDiscount);
        setApplyMaxServiceCharge(getData.maxServiceCharge);
        const selectedType = Types.find(
          (option) => option.name === getData.types
        );
        setSelectedTypeValue(selectedType.value);
        setSelectedTemplatetype(selectedType.name);
        setMaxTransaction(getData.maxTransaction);
        setMinTransaction(getData.minTransaction);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editPremiumExchange = async (id) => {
    setEditId(id);
    try {
      const url =
        CommonConstants.BASE_URL + "/getpremimumexchangeratebyid?id=" + id;
      const response = await axios.get(url);
      if (response.data.status == true) {
        const getData = response.data.data;
        const initialCountry = countryGet.find(
          (option) => option.value === getData.countryId
        );
        setSelectedCountries4(initialCountry);
        setCurrency3(getData.countryCode);
        setpreminumamt(getData.premiumAmount);
        setmaxPreAmt(getData.maxAmtForPremium);
        setPreminumExchnageRate(
          (preminumExchnageRate) => !preminumExchnageRate
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const confirmClick = async (id, name) => {
    setDeleteId(id);
    setSelectedName(name);
    setmodalShowPrChange(true);
  };
  const editReferal = async (id) => {
    setEditId(id);
    try {
      const url = CommonConstants.BASE_URL + "/getreferraldetailsbyid?id=" + id;
      const response = await axios.get(url);
      if (response.data.status == true) {
        const getData = response.data.data;
        const initialCountry = countryGet.find(
          (option) => option.value === getData.countryId
        );
        setSelectedCountries([initialCountry]);
        setReferralDuration(getData.validUpTo);
        setReceiverCashBalance(getData.receiverCash);
        setSenderCashBalance(getData.senderCash);
        setReceiverPoints(getData.receiverPoint);
        setSenderPoints(getData.senderPoint);
        setReceiverMinTransaction(getData.maxTransaction);
        setSenderMinTransaction(getData.minTransaction);
        setShowPreviewRewards((showPreviewRewards) => !showPreviewRewards);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editPoints = async (id) => {
    setEditId(id);
    setloadervalue(true);
    const url =
      CommonConstants.BASE_URL + "/getpointsconfigurationbyid?id=" + id;
    const response = await axios.get(url);
    if (response.data.status == true) {
      const getData = response.data.data;
      const initialCountry = countryGet.find(
        (option) => option.value === getData.countryId
      );
      setCurrency1(getData.currencyCode);
      setSelectedCountries2(initialCountry);
      setAmount1(getData.sentAmount);
      setConvertedPoints(getData.convertedPoints);
      setPointDuration(getData.durationDays);
      setPerTransactionAddPoint(getData.maxTransactionAdditionalPoints);
      setDaysOfWeek([
        getData.isMon,
        getData.isTue,
        getData.isWed,
        getData.isThu,
        getData.isFri,
        getData.isSat,
        getData.isSun,
      ]);
      setSelectionRange([
        {
          startDate: new Date(getData.validFrom),
          endDate: new Date(getData.validTo),
          key: "selection",
        },
      ]);
      setShowPreview((prevShowPreview) => !prevShowPreview);
    }
    setloadervalue(false);
  };
  const editCashBalance = async (ID) => {
    setEditId(ID);
    const url =
      CommonConstants.BASE_URL + "/getcashbalanceconfigurationbyid?id=" + ID;
    const response = await axios.get(url);
    if (response.data.status == true) {
      const getData = response.data.data;
      const initialCountry = countryGet.find(
        (option) => option.value === getData.countryId
      );
      setSelectedCountries3([initialCountry]);
      setCurrency2(getData.currencyCode);
      setRedeemPoints(getData.redeemPoints);
      setConvertedAmount(getData.covertedAmt);
      setRedeemPerTransaction(getData.cashBalRedeemPerTransaction);
      setSendMinAmount(getData.sendingMinAmt);
      setmaxRedimPoint(getData.maxRedeemPoint);
      setShowCashBalance((showCashBalance) => !showCashBalance);
    }
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const deletePromocode = async () => {
    setmodalShowPrChange(false);
    const formData = new FormData();
    formData.append("id", deleteID);
    const deletePromocodes = await axios.post(
      CommonConstants.BASE_URL + "/deletepromocodebyid",
      formData
    );
    if (deletePromocodes.data.status == true) {
      getAllPromocodes();
      setModalShow(true);
    }
  };
  const deleteReferral = async () => {
    setmodalShowPrChange(false);
    const formData = new FormData();
    formData.append("id", deleteID);
    const deletePromocodes = await axios.post(
      CommonConstants.BASE_URL + "/deletereferralbyid",
      formData
    );
    if (deletePromocodes.data.status == true) {
      setModalShow(true);
      getallreferraldetails();
    }
  };
  const deletePoints = async () => {
    setmodalShowPrChange(false);
    const url =
      CommonConstants.BASE_URL + "/deletepointconfigurationbyid?id=" + deleteID;
    const response = await axios.get(url);
    if (response.data.status == true) {
      getallpointsconfiguration();
      setModalShow(true);
    }
  };
  const deleteCashBalance = async () => {
    setmodalShowPrChange(false);
    const url =
      CommonConstants.BASE_URL +
      "/deletecashbalanceconfigurationbyid?id=" +
      deleteID;
    const response = await axios.get(url);
    if (response.data.status == true) {
      getallcashbalanceconfiguration();
      setModalShow(true);
    }
  };
  const deletePremiumExchangeRate = async () => {
    setmodalShowPrChange(false);
    const url =
      CommonConstants.BASE_URL + "/deletepremimumexchangerate?id=" + deleteID;
    const response = await axios.get(url);
    if (response.data.status == true) {
      getallPremiumExchangeRate();
      setModalShow(true);
    }
  };
  const handleDelete = () => {
    switch (selectedName) {
      case "Referral":
        deleteReferral();
        break;
      case "Promocode":
        deletePromocode();
        break;
      case "Points":
        deletePoints();
        break;
      case "Cash Balance":
        deleteCashBalance();
        break;
      case "Premium Exchange Rate":
        deletePremiumExchangeRate();
        break;
      default:
        console.log("Unknown selectedName");
    }
  };
  const handleCheckboxChange = (index) => {
    const updatedDaysOfWeek = [...daysOfWeek];
    updatedDaysOfWeek[index] = !updatedDaysOfWeek[index];
    setDaysOfWeek(updatedDaysOfWeek);
  };
  const handleTypesChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10); // Parse the value to an integer
    const label = DataTypes?.find((res) => res.value == selectedValue);
    setSelectedType(label.name);
    switch (selectedValue) {
      case 1: {
        setSelectedTypeValue(1);
        setIsForInActiveUser(true);
        setminDays(90);
        break;
      }
      case 2: {
        setSelectedTypeValue(2);
        setIsForInActiveUser(true);
        setminDays(180);
        break;
      }
      case 3: {
        setSelectedTypeValue(3);
        setIsForInActiveUser(true);
        setminDays(365);
        break;
      }
      case 4: {
        setSelectedTypeValue(4);
        setIsKYCIncomple(true);
        setminDays(14);
        break;
      }
      case 5: {
        setIsKYCIncomple(false);
        setSelectedTypeValue(5);
        setminDays(60);
        setIsForTransactionNotDone(true);
        break;
      }
      case 6: {
        setminDays(365);
        setSelectedTypeValue(6);
        setIsForTransaction(true);
        break;
      }
      case 7: {
        setminDays(365);
        setSelectedTypeValue(7);
        setIsForCompleteSignup(true);
        break;
      }
      default: {
        setSelectedType(""); // Reset the selected type if none of the cases match
        setIsForInActiveUser(false);
        setIsKYCIncomple(false);
        setIsForTransactionNotDone(false);
        setIsForTransaction(false);
        setIsForCompleteSignup(false);
        break;
      }
    }
  };
  const handleDateChange = (event) => {
    const enteredDate = event.target.value;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (datePattern.test(enteredDate)) {
      setSelectedDate(enteredDate);
    }
  };
  const handleSelect3 = (selectedOptions) => {
    setSenderCountryIds2(selectedOptions);
    setTouched(true);
  };
  const handlePaymentSelect = (selectedOptions) => {
    setPaymentMethod(selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.value).join(",");
    setPaymentMethodId(selectedIds);
    setTouched(true);
  };
  const userSelect = (selectedOptions) => {
    setSelectedUsers(selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.value).join(",");
    setSelectedUserId(selectedIds);
    setTouched(true);
  };
  const handleDeliverychange = (selectedOptions) => {
    setSelectedDelivryMethod(selectedOptions);
    const selectedIds = selectedOptions.map((option) => option.value).join(",");
    setDeliveryMethodId(selectedIds);
    setTouched(true);
  };
  const handleDurationChange = (e) => {
    const newValue = e.target.value;
    const numericValue = newValue.replace(/\D/g, "");
    if (numericValue <= 365) {
      setDuration(numericValue);
      setReferralDuration(numericValue);
    }
  };
  const handleDurationChange1 = (e) => {
    const newValue = e.target.value;
    const numericValue = newValue.replace(/\D/g, "");
    if (numericValue <= 365) {
      setPointDuration(numericValue);
    }
  };
  const handleSelectChange = (selectedOptions) => {
    setSelectedCountries1(selectedOptions);
    setCurrency(selectedOptions.currency);
  };
  const handleSelectChange1 = (selectedOptions) => {
    setSelectedCountries2(selectedOptions);
    setCurrency1(selectedOptions.currency);
  };
  const handleSelectChange2 = (selectedOptions) => {
    setSelectedCountries3(selectedOptions);
    setCurrency2(selectedOptions.currency);
  };
  const handleSelectChange3 = (selectedOptions) => {
    setSelectedCountries4(selectedOptions);
    setCurrency3(selectedOptions.currency);
  };
  const GetAllCountrys = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getcountries"
      );
      // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {
        // console.log('mainGet',response.data.data)

        const optionsForCountry = response.data.data.map((country) => ({
          value: country.id,
          label: country.name,
          currency: country.currency,
        }));
        setCountryGet(optionsForCountry);
      } else if (response.data.status === "error") {
        // console.log(response.data.message)
      }
    } catch (err) {
      // console.log(err)
    }
  };
  let Country = [];
  const handleSelect1Change = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
  };
  const handleSelect2Change = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedValues2(selectedValues);
  };
  const validateSelect = (value) => {
    if (!value) {
      return false;
    }
    return true;
  };
  const createNewData = async () => {
    const isValid1 = validateSelect(selectedValue);
    const isValid2 = selectedValues2.length > 0;

    setValidationError1(!isValid1);
    setValidationError2(!isValid2);

    if (isValid1 && isValid2) {
      const dataValue = {
        senderCountryId: selectedValue,
        recieverCountryIds: selectedValues2,
      };
      const response = await axios.post(
        `${CommonConstants.BASE_URL}/saveupdatecountrysettings`,
        dataValue
      );

      if (response.data.status == true) {
        navigate("/country-settings-list");
      } else {
        navigate("/country-settings");
      }
    }
  };
  const UpdateCountry = async () => {
    try {
      const response = await axios.post(
        `${CommonConstants.BASE_URL}/getcountrysettingsbyid`,
        { id: id }
      );
      setSelectedValue(response.data.data.senderCountryId);
      setSelectedValues2(response.data.data.recieverCountryIds);
      setissenderCountryId(response.data.data.senderCountryId);
      setRecieverCountryIds(response.data.data.recieverCountryIds);
      var selectedId = response.data.data.senderCountryId;
    } catch (error) {
      console.log(error);
    }
  };
  const arr = [];
  if (recieverCountryIds.length > 0 && id) {
    recieverCountryIds.forEach((ele) => {
      const find = countryGet.find((itm) => itm.value == ele);
      if (find) {
        arr.push(find);
      }
    });
  }
  useEffect(() => {
    handleGeneratePromoCode();
    GetAllCountrys();
    getallreferraldetails();
    getallcashbalanceconfiguration();
    getAllPromocodes();
    getallpointsconfiguration();
    GetActivePaymentMethod();
    GetActiveDeliveryMethod();
    GetReceivers();
    getallPremiumExchangeRate();
    if (id) {
      UpdateCountry();
    }
  }, []);

  const onOptionChange = (selectedOptions) => {
    if (countryGet.length === selectedOptions.length) {
      setMenuOpen(false);
    }

    setCountrySettingData({
      ...countrySettingData,
      senderCountryId: selectedOptions.value,
    });
  };

  const onMenuOpen = () => {
    if (menuOpen !== undefined) setMenuOpen(undefined);
  };
  const onMenuOpen1 = () => {
    if (menuOpen1 !== undefined) setMenuOpen1(undefined);
  };
  const onMenuOpen2 = () => {
    if (menuOpen2 !== undefined) setMenuOpen2(undefined);
  };
  const onMenuOpen3 = () => {
    if (menuOpen3 !== undefined) setMenuOpen3(undefined);
  };
  const handleCancel = () => {
    navigate("/country-settings-list");
  };
  var defaultValue = [countryGet[0]];
  if (issenderCountryId != null) {
    defaultValue = countryGet.find((item) => item.value == issenderCountryId);
  }

  const onTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
    setShowPreviewRewards(true);
    setShowPreviewPromocode(true);
    setShowPreview(true);
    setEditId(0);
    setShowCashBalance(true);
    setPreminumExchnageRate(true);
  };

  const handleTabChange = (tabIndex) => {
    setActiveTabIndex(tabIndex);
  };

  const handleAddPoints = () => {
    navigate("/addpoints");
  };

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const payload = {
      id: id,
    };
    axios
      .post(`${CommonConstants.BASE_URL}/getuserinfobyid`, {
        id: payload.id,
      })
      .then((res) => {
        setindividualuserData(res.data.data);
        setUserId(res.data.data.id);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [userId, id]);

  const [showPreview, setShowPreview] = useState(true);

  const togglePreview = () => {
    setShowPreview((prevShowPreview) => !prevShowPreview);
    setEditId(0);
    setCurrency1("");
    getallpointsconfiguration();
    setSelectedCountries2([]);
    setAmount1("");
    setConvertedPoints(0);
    setPointDuration("");
    setPerTransactionAddPoint("");
    setPointDuration("");
    setpointsFromDate("");
    // setDaysOfWeek([false, false, false, false, false, false, false]);
    setSelectionRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };

  const [showPreviewRewards, setShowPreviewRewards] = useState(true);
  const [showCashBalance, setShowCashBalance] = useState(true);
  const [preminumExchnageRate, setPreminumExchnageRate] = useState(true);

  const togglePreminumExchangeRate = () => {
    setPreminumExchnageRate((preminumExchnageRate) => !preminumExchnageRate);
    setEditId(0);
    getallPremiumExchangeRate();
    setSelectedCountries4([]);
    setCurrency3("");
    setpreminumamt(0);
    setmaxPreAmt(0);
  };

  const toggleCashBalance = () => {
    setShowCashBalance((showCashBalance) => !showCashBalance);
    setEditId(0);
    setSelectedCountries3([]);
    setCurrency2("");
    setRedeemPoints(0);
    setConvertedAmount("");
    setRedeemPerTransaction(0);
    setSendMinAmount("");
    setmaxRedimPoint(0);
  };

  const togglePreviewRewards = () => {
    setShowPreviewRewards((showPreviewRewards) => !showPreviewRewards);
    setEditId(0);
    setSelectedCountries([]);
    setReferralDuration("");
    setReferralPromoCode(0);
    setReceiverCashBalance(0);
    setSenderCashBalance(0);
    setSenderPoints(0);
    setReceiverPoints(0);
    setSenderMinTransaction(0);
    setReceiverMinTransaction(0);
    setValidFrom("");
    setSelectedDate("");
    setAdditionalCheckboxValue(false);
  };
  const [showPreviewPromocode, setShowPreviewPromocode] = useState(true);

  const togglePreviewPromocode = () => {
    setShowPreviewPromocode((showPreviewPromocode) => !showPreviewPromocode);
    setEditId(0);
    setSenderCountryIds2([]);
    setSelectedDelivryMethod([]);
    setDeliveryMethodId("");
    setSelectedUsers([]);
    setSelectedUserId("");
    // setPromoCode('');
    setValidTo("");
    setValidFromPromo("");
    setPaymentMethod([]);
    setPaymentMethodId(0);
    setDescription("");
    setTitle("");
    setMinimumSendingAmount(0);
    setCashBalance(0);
    setMaxAmount("");
    setMinAmount("");
    setDuration("");
    setPoints("");
    setApplyMinServiceCharge("");
    setDiscountOnServiceCharge("");
    setApplyMaxServiceCharge("");
    setSelectedTypeValue("");
    setSelectedTemplatetype("");
    setMaxTransaction("");
    setMinTransaction("");
  };

  const getallreferraldetails = async () => {
    try {
      const detils = await axios.get(
        CommonConstants.BASE_URL + "/getallreferraldetails"
      );
      if (detils.data.status == true) {
        setRefrelDetils(detils.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getallPremiumExchangeRate = async () => {
    try {
      const detils = await axios.get(
        CommonConstants.BASE_URL + "/getallpremimumexchangerate"
      );
      if (detils.data.status == true) {
        setPremiumExchangeRate(detils.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getallcashbalanceconfiguration = async () => {
    try {
      const detils = await axios.get(
        CommonConstants.BASE_URL + "/getallcashbalanceconfiguration"
      );
      if (detils.data.status == true) {
        setAllCashBalance(detils.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const saveCashBalance = async () => {
    if (
      selectedCountries3?.length == 0 ||
      !redeemPoints ||
      !convertedAmount ||
      !redeemPerTransaction ||
      !sendMinAmount ||
      !maxRedimPoint
    ) {
      setError(true);
    } else {
      let payload;
      if (editId) {
        payload = {
          id: editId,
          countryId: selectedCountries3[0]?.value,
          currencyCode: currency2,
          redeemPoints: parseInt(redeemPoints),
          covertedAmt: parseInt(convertedAmount),
          cashBalRedeemPerTransaction: parseInt(redeemPerTransaction),
          sendingMinAmt: parseInt(sendMinAmount),
          maxRedeemPoint: parseInt(maxRedimPoint),
        };
      } else {
        payload = {
          countryId: selectedCountries3?.value,
          currencyCode: currency2,
          redeemPoints: parseInt(redeemPoints),
          covertedAmt: parseInt(convertedAmount),
          cashBalRedeemPerTransaction: parseInt(redeemPerTransaction),
          sendingMinAmt: parseInt(sendMinAmount),
          maxRedeemPoint: parseInt(maxRedimPoint),
        };
      }
      const sendData = await axios.post(
        CommonConstants.BASE_URL + "/savecashbalanceconfiguration",
        payload
      );
      if (sendData.data.status == true) {
        setEditId(0);
        getallcashbalanceconfiguration();
        toggleCashBalance();
        setSelectedCountries3([]);
        setRedeemPoints(0);
        setConvertedAmount(0);
        setRedeemPerTransaction(0);
        setSendMinAmount(0);
      }
    }
  };
  const savePremiumExchange = async () => {
    if (selectedCountries4?.length == 0 || !preminumamt || !maxPreAmt) {
      setError(true);
    } else {
      let payload;
      if (editId) {
        payload = {
          id: editId,
          countryId: selectedCountries4?.value,
          countryCode: currency3,
          premiumAmount: preminumamt,
          maxAmtForPremium: maxPreAmt,
        };
      } else {
        payload = {
          countryId: selectedCountries4?.value,
          countryCode: currency3,
          premiumAmount: preminumamt,
          maxAmtForPremium: maxPreAmt,
        };
      }
      const sendData = await axios.post(
        CommonConstants.BASE_URL + "/savepremimumexchangerate",
        payload
      );
      if (sendData.data.status == true) {
        setEditId(0);
        getallPremiumExchangeRate();
        setPreminumExchnageRate(
          (preminumExchnageRate) => !preminumExchnageRate
        );
        setSelectedCountries4([]);
        setCurrency3("");
        setpreminumamt(0);
        setmaxPreAmt(0);
      }
    }
  };
  const getAllPromocodes = async () => {
    try {
      const detils = await axios.get(
        CommonConstants.BASE_URL + "/getallpromocodes"
      );
      if (detils.data.status == true) {
        setAllPromocodes(detils.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getallpointsconfiguration = async () => {
    try {
      const detils = await axios.get(
        CommonConstants.BASE_URL + "/getallpointsconfiguration"
      );
      if (detils.data.status == true) {
        setAllPoints(detils.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const saveReferralDetails = async (e) => {
    const newErrors = {};
    if (senderCashBalance || receiverCashBalance) {
      if (!senderCashBalance) {
        newErrors.senderCashBalance = "Please Enter Referrer Cash balance";
      }
      if (!receiverCashBalance) {
        newErrors.receiverCashBalance = "Please Enter Referee Cash Balance";
      }
    }
    if (senderPoints || receiverPoints) {
      if (!senderPoints) {
        newErrors.senderPoints = "Please enter Referrer Points";
      }
      if (!receiverPoints) {
        newErrors.receiverPoints = "Please enter Referee Points";
      }
    }
    if (!senderMinTransaction) {
      newErrors.senderMinTransaction = "Please enter Referrer Min Transaction";
    }
    if (!receiverMinTransaction) {
      newErrors.receiverMinTransaction = "Please enter Referee Min Transaction";
    }
    if (!Referralduration) {
      newErrors.Referralduration = "Please enter Duration";
    }
    if (selectedCountries.length === 0) {
      newErrors.sendercontry = "Please Select Referrer Country";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const selectedCountryIds = selectedCountries.map(
        (country) => country.value
      );
      let requsetData;
      if (editId) {
        requsetData = {
          id: editId,
          countryIds: selectedCountryIds,
          validUpTo: parseInt(Referralduration),
          senderCash: parseInt(senderCashBalance),
          receiverCash: parseInt(receiverCashBalance),
          senderPoint: parseInt(senderPoints),
          receiverPoint: parseInt(receiverPoints),
          minTransaction: parseInt(senderMinTransaction),
          maxTransaction: parseInt(receiverMinTransaction),
        };
      } else {
        requsetData = {
          countryIds: selectedCountryIds,
          validUpTo: parseInt(Referralduration),
          senderCash: parseInt(senderCashBalance),
          receiverCash: parseInt(receiverCashBalance),
          senderPoint: parseInt(senderPoints),
          receiverPoint: parseInt(receiverPoints),
          minTransaction: parseInt(senderMinTransaction),
          maxTransaction: parseInt(receiverMinTransaction),
        };
      }
      await axios
        .post(CommonConstants.BASE_URL + "/savereferraldetails", requsetData)
        .then((responce) => {
          if (responce.data.status == true) {
            setEditId(0);
            togglePreviewRewards();
            getallreferraldetails();
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const savePoints = async () => {
    const newErrors = {};

    if (selectedCountries2.length == 0) {
      newErrors.selectedCountries2 = "Please Select Sender Country";
    }
    if (!amount1) {
      newErrors.amount1 = "Please Enter Amount";
    }
    if (!convertedPoints) {
      newErrors.convertedPoints = "Please Enter Converted Points";
    }
    if (!pointDuration) {
      newErrors.pointDuration = "Please enter Duration";
    }
    if (!perTransactionAddPoint) {
      newErrors.perTransactionAddPoint =
        "Please enter Per Transaction Additional Point";
    }
    if (!selectionRange[0].startDate || !selectionRange[0].endDate) {
      setError(true);
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      let requestData;
      if (editId) {
        requestData = {
          id: editId,
          countryId: selectedCountries2?.value,
          currencyCode: currency1,
          sentAmount: parseInt(amount1),
          convertedPoints: parseInt(convertedPoints),
          durationDays: parseInt(pointDuration),
          maxTransactionAdditionalPoints: parseInt(perTransactionAddPoint),
          validFrom: moment(selectionRange[0].startDate).format("YYYY-MM-DD"), // Format as 'YYYY-MM-DD'
          validTo: moment(selectionRange[0].endDate).format("YYYY-MM-DD"),
          isMon: daysOfWeek[0],
          isTue: daysOfWeek[1],
          isWed: daysOfWeek[2],
          isThu: daysOfWeek[3],
          isFri: daysOfWeek[4],
          isSat: daysOfWeek[5],
          isSun: daysOfWeek[6],
        };
      } else {
        requestData = {
          countryId: selectedCountries2?.value,
          currencyCode: currency1,
          sentAmount: parseInt(amount1),
          convertedPoints: parseInt(convertedPoints),
          durationDays: parseInt(pointDuration),
          maxTransactionAdditionalPoints: parseInt(perTransactionAddPoint),
          validFrom: moment(selectionRange[0].startDate).format("YYYY-MM-DD"), // Format as 'YYYY-MM-DD'
          validTo: moment(selectionRange[0].endDate).format("YYYY-MM-DD"),
          isMon: daysOfWeek[0],
          isTue: daysOfWeek[1],
          isWed: daysOfWeek[2],
          isThu: daysOfWeek[3],
          isFri: daysOfWeek[4],
          isSat: daysOfWeek[5],
          isSun: daysOfWeek[6],
        };
      }
      await axios
        .post(CommonConstants.BASE_URL + "/savepointconfiguration", requestData)
        .then((responce) => {
          if (responce.data.status == true) {
            setEditId(0);
            togglePreview();
            getallpointsconfiguration();
            setSelectedCountries2([]);
            setAmount1("");
            setConvertedPoints(0);
            setPointDuration("");
            setPerTransactionAddPoint("");
            setPointDuration("");
            setpointsFromDate("");
            // setDaysOfWeek([false, false, false, false, false, false, false]);
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const GetActivePaymentMethod = async () => {
    await axios
      .get(CommonConstants.BASE_URL + "/getallpaymentmethodname")
      .then((responce) => {
        if (responce.data.status == true) {
          const paymentMethods = responce.data.data.map((row) => ({
            value: row.id,
            label: row.name,
          }));
          setPaymentMethos(paymentMethods);
        }
      })
      .catch((error) => console.log(error));
  };
  const GetActiveDeliveryMethod = async () => {
    await axios
      .get(CommonConstants.BASE_URL + "/getalldeliverytype")
      .then((responce) => {
        if (responce.data.status == true) {
          const delivereyMethod = responce.data.data.map((row) => ({
            value: row.id,
            label: row.type,
          }));
          setDeliveryMethos(delivereyMethod);
        }
      })
      .catch((error) => console.log(error));
  };
  const GetReceivers = async () => {
    await axios
      .get(CommonConstants.BASE_URL + "/getallsenders")
      .then((responce) => {
        if (responce.data.status == true) {
          console.log(responce, "responce");
          const receivers = responce.data.data.map((row) => ({
            value: row.id,
            label: row.fName + " " + row.lName,
          }));
          setReceivers(receivers);
        }
      })
      .catch((error) => console.log(error));
  };
  function generatePromoCode(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let promoCode = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      promoCode += charset[randomIndex];
    }

    return promoCode;
  }
  function handleGeneratePromoCode() {
    const newPromoCode = generatePromoCode(6); // Change the length as needed
    setPromoCode(newPromoCode);
    setTouched(true);
  }
  const checkPromocode = async (e) => {
    const selectedPromocode = e.target.value;
    const formData = new FormData();
    formData.append("promocode", selectedPromocode);
    const isPromocodeExist = await axios.post(
      CommonConstants.BASE_URL + "/checkpromocodesexistornot",
      formData
    );
    if (isPromocodeExist.data.data == true) {
      setMessage(true);
    } else {
      setPromoCode(selectedPromocode);
    }
  };
  const handleSubmit = async () => {
    const newErrors = {};
    if (!promoCode) {
      newErrors.promoCode = "Please Enter PromoCode";
    }
    if (!paymnetMethod.length > 0 || !paymentMethodId) {
      newErrors.paymentMethodId = "Please Select Payment Method  ";
    }
    if (!selectedDelivryMethod.length > 0 || !deliveryMethodId) {
      newErrors.deliveryMethodId = "Please Select Delivery Method ";
    }
    if (!validFromPromo) {
      newErrors.validFromPromo = "Please Select Valid From Date ";
    }
    if (!validTo) {
      newErrors.validTo = "Please Select Valid To Date ";
    }
    if (senderCountryIds2 && senderCountryIds2?.length == 0) {
      newErrors.senderCountryIds2 = "Please Select Sender Country  ";
    }
    if (!title) {
      newErrors.title = "Please Enter Title";
    }
    if (!description) {
      newErrors.description = "Please Enter Description";
    }
    if (minimumSendingAmount || cashBalance) {
      if (!minimumSendingAmount) {
        newErrors.minimumSendingAmount = "Please Enter Minimum Sending Amount ";
      }
      if (!cashBalance) {
        newErrors.cashBalance = "Please Enter  Cash Balance ";
      }
    }
    if (minAmount || maxAmount || duration || points) {
      if (!minAmount) {
        newErrors.minAmount = "Please Enter Min Amount";
      }
      if (!maxAmount) {
        newErrors.maxAmount = "Please Enter Max Amount";
      }
      if (!duration) {
        newErrors.duration = "Please Enter Duration ";
      }
      if (!points) {
        newErrors.points = "Please Enter points";
      }
    }
    if (discountOnServiceCharge || applyMinServiceCharge) {
      if (!discountOnServiceCharge) {
        newErrors.discountOnServiceCharge =
          "Please Enter Discount on service charge";
      }
      if (!applyMinServiceCharge) {
        newErrors.applyMinServiceCharge =
          "Please Enter Apply when min Service charge value";
      }
    }
    if (discountOnExchangeRate || minExchangeRate) {
      if (!discountOnExchangeRate) {
        newErrors.discountOnExchangeRate =
          "Please Enter Discount on Exchange Rate";
      }
      if (!minExchangeRate) {
        newErrors.minExchangeRate =
          "Please Enter Apply When Min. Exchange Rate";
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      const countryArry = [];
      countryArry.push(senderCountryIds2?.value);
      let payload;
      if (editId) {
        payload = {
          id: editId,
          countryIds: countryArry,
          title: title,
          description: description,
          promoCode: promoCode,
          paymentMethodId: paymentMethodId,
          deliveryMethodId: deliveryMethodId,
          minAmount: minAmount ? parseInt(minAmount) : 0,
          maxAmount: maxAmount ? parseInt(maxAmount) : 0,
          points: points ? parseInt(points) : 0,
          validUpTo: duration ? parseInt(duration) : 0,
          isCoverttableIntoCash: true,
          minExchangeRate: minExchangeRate ? parseFloat(minExchangeRate) : 0,
          maxExchangeRate: maxExchangeRate ? parseFloat(maxExchangeRate) : 0,
          exDiscount: discountOnExchangeRate
            ? parseFloat(discountOnExchangeRate)
            : 0,
          minServiceCharge: applyMinServiceCharge
            ? parseFloat(applyMinServiceCharge)
            : 0,
          maxServiceCharge: applyMaxServiceCharge
            ? parseFloat(applyMaxServiceCharge)
            : 0,
          seDiscount: discountOnServiceCharge
            ? parseFloat(discountOnServiceCharge)
            : 0,
          minTransaction: minTransaction ? parseInt(minTransaction) : 0,
          maxTransaction: maxTransaction ? parseInt(maxTransaction) : 0,
          validFrom: validFromPromo ? validFromPromo : "",
          validTo: validTo ? validTo : "",
          benifitsOnCash: cashBalance ? parseInt(cashBalance) : 0,
          minSendingAmt: minimumSendingAmount
            ? parseFloat(minimumSendingAmount)
            : 0,
          isForGeneral: false,
          isForCompleteSignup: isForCompleteSignup,
          isForTransaction: isForTransaction,
          isForInActiveUser: isForInActiveUser,
          isForNeverUsedService: false,
          isUserSpecific: selectedUserId ? true : false,
          appliedUserId: selectedUserId,
          types: selectedType || selectedtemplate,
          minDays: parseInt(minDays),
          isKycIncomplete: isKYCIncomple,
          isForTransactionNotDone: isForTransactionNotDone,
          isHidden: isHidden,
        };
      } else {
        payload = {
          countryIds: senderCountryIds2
            ? [senderCountryIds2[0].value]
            : countryArry,
          title: title,
          description: description,
          promoCode: promoCode,
          paymentMethodId: paymentMethodId,
          deliveryMethodId: deliveryMethodId,
          minAmount: minAmount ? parseInt(minAmount) : 0,
          maxAmount: maxAmount ? parseInt(maxAmount) : 0,
          points: points ? parseInt(points) : 0,
          validUpTo: duration ? parseInt(duration) : 0,
          isCoverttableIntoCash: true,
          minExchangeRate: minExchangeRate ? parseFloat(minExchangeRate) : 0,
          maxExchangeRate: maxExchangeRate ? parseFloat(maxExchangeRate) : 0,
          exDiscount: discountOnExchangeRate
            ? parseFloat(discountOnExchangeRate)
            : 0,
          minServiceCharge: applyMinServiceCharge
            ? parseFloat(applyMinServiceCharge)
            : 0,
          maxServiceCharge: applyMaxServiceCharge
            ? parseFloat(applyMaxServiceCharge)
            : 0,
          seDiscount: discountOnServiceCharge
            ? parseFloat(discountOnServiceCharge)
            : 0,
          minTransaction: minTransaction ? parseInt(minTransaction) : 0,
          maxTransaction: maxTransaction ? parseInt(maxTransaction) : 0,
          validFrom: validFromPromo ? validFromPromo : "",
          validTo: validTo ? validTo : "",
          benifitsOnCash: cashBalance ? parseInt(cashBalance) : 0,
          minSendingAmt: minimumSendingAmount
            ? parseFloat(minimumSendingAmount)
            : 0,
          isForGeneral: false,
          isForCompleteSignup: isForCompleteSignup,
          isForTransaction: isForTransaction,
          isForInActiveUser: isForInActiveUser,
          isForNeverUsedService: false,
          isUserSpecific: selectedUserId ? true : false,
          appliedUserId: selectedUserId,
          types: selectedType || selectedtemplate,
          minDays: parseInt(minDays),
          isKycIncomplete: isKYCIncomple,
          isForTransactionNotDone: isForTransactionNotDone,
          isHidden: isHidden,
        };
      }
      try {
        const response = await axios.post(
          CommonConstants.BASE_URL + "/savepromocodedetails",
          payload
        );
        if (response.data.status === true) {
          setEditId(0);
          togglePreviewPromocode();
          setSenderCountryIds2([]);
          getAllPromocodes();
          setDescription("");
          setTitle("");
          setDeliveryMethodId("");
          setPaymentMethodId("");
          setPromoCode("");
          setPoints(0);
          setApplyMaxServiceCharge("");
          setMaxAmount("");
          setMinAmount("");
          setMinExchangeRate("");
          setdiscountOnExchangeRate("");
          setApplyMinServiceCharge(0);
          setDiscountOnServiceCharge(0);
          setMaxTransaction("");
          setMinTransaction("");
          setValidFromPromo("");
          setValidTo("");
        } else {
          // Handle error
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <>
      <div
        className="container-fluid"
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <PageHeader
          HeaderText="Rewards"
          Breadcrumb={[
            { name: "Dashboard", navigate: "" },
            { name: "IoT Dashboard", navigate: "" },
          ]}
        />
        {loadervalue == true ? <Loader /> : ""}
        <div className="bg-white rounded-4">
          <div className="row">
            <div className="col-lg-12 col-md-12 pr-0 pl-0">
              <div className="cardas p-3">
                <div className="bodys">
                  <div className="row">
                    <div className="col-12 border-right">
                      <div className="pb-4">
                        <ul
                          className="nav nav-pills  navPillResp "
                          role="tablist"
                        >
                          <li
                            className={`WFull nav-item mb-1 py-2 mx-3  pointer ${
                              activeTab === 1 ? "active" : ""
                            }`}
                            id="bacicTab2-1"
                            role="presentation"
                            onClick={() => {
                              onTabChange(1);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3   ${
                                activeTab === 1 ? "mainPillActive active" : ""
                              }`}
                            >
                              <i className="fa fa-gift mr-3" />
                              Referral Configuration
                            </a>
                          </li>
                          <li
                            className={`WFull nav-item mb-1 py-2 mx-3  pointer ${
                              activeTab === 2 ? "active" : ""
                            }`}
                            id="bacicTab2-2"
                            role="presentation"
                            onClick={() => {
                              onTabChange(2);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3 ${
                                activeTab === 2 ? "active mainPillActive" : ""
                              }`}
                              style={{
                                backgroundColor:
                                  activeTab === 2 ? "#AA2AE1" : "",
                              }}
                            >
                              <i className="fa fa-tag	 mr-2" />
                              Promocodes
                            </a>
                          </li>
                          <li
                            className={`WFull nav-item mb-1 py-2 mx-3  pointer ${
                              activeTab === 3 ? "active" : ""
                            }`}
                            id="bacicTab2-3"
                            role="presentation"
                            onClick={() => {
                              onTabChange(3);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3 ${
                                activeTab === 3 ? "active mainPillActive" : ""
                              }`}
                            >
                              <ScoreboardIcon className="mr-2" />
                              Points Configuration
                            </a>
                          </li>
                          <li
                            className={`WFull nav-item mb-1 py-2 mx-3  pointer ${
                              activeTab === 4 ? "active" : ""
                            }`}
                            id="bacicTab2-3"
                            role="presentation"
                            onClick={() => {
                              onTabChange(4);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3 WFull  ${
                                activeTab === 4 ? "mainPillActive active" : ""
                              }`}
                            >
                              <i class="fa fa-money-check-dollar mr-2"></i>
                              Cash Balance Configuration
                            </a>
                          </li>
                          <li
                            className={`WFull nav-item mb-1 py-2 mx-3  pointer ${
                              activeTab === 5 ? "active" : ""
                            }`}
                            id="bacicTab2-3"
                            role="presentation"
                            onClick={() => {
                              onTabChange(5);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3  ${
                                activeTab === 5 ? "mainPillActive active" : ""
                              }`}
                            >
                              <i class="fa fa-exchange mr-3"></i>
                              Premium Exchange Rate
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 pr-0 pl-0">
                      <div className="tab-content pt-0">
                        <div
                          id="bacicTab2pan-1"
                          className={`tab-pane ${
                            activeTab === 1 ? "show active" : ""
                          }`}
                        >
                          <div className="main px-3 px-xl-2">
                            <div>
                              <div className="container-fluid">
                                <div className="row clearfix">
                                  <div className="col-lg-12 col-md-12 p-0">
                                    {showPreviewRewards ? (
                                      <>
                                        <div className="  align-items-center respoChildFooter mb-2">
                                          <div className="d-flex pbSt align-items-center respoChildFooter justify-content-between ">
                                            <h5 className="mb-3 pb-0 purpleText my-4">
                                              Referral Configuration{" "}
                                            </h5>
                                            &nbsp;&nbsp;
                                            <a
                                              className="btn btn-default purpleBackground text-white bolder"
                                              onClick={() =>
                                                togglePreviewRewards()
                                              }
                                            >
                                              <i className="text-white fa fa-plus bolder"></i>{" "}
                                              Add Referral
                                            </a>
                                          </div>
                                        </div>

                                        {referlDetils &&
                                        referlDetils.length > 0 ? (
                                          <div className="row clearfix">
                                            <div className="col-lg-6 col-md-6 col-md-12">
                                              {referlDetils
                                                .slice(
                                                  0,
                                                  Math.ceil(
                                                    referlDetils.length / 2
                                                  )
                                                )
                                                .map((item, index) => {
                                                  return (
                                                    <div className="card shadow">
                                                      <div className="body p-xl-3">
                                                        <div className="showEnd">
                                                          <a
                                                            className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                            onClick={(e) =>
                                                              editReferal(
                                                                item.id
                                                              )
                                                            }
                                                          >
                                                            <i
                                                              className="fa fa-pencil purpleText"
                                                              title="Edit"
                                                            ></i>
                                                          </a>{" "}
                                                          &nbsp;
                                                          <a
                                                            className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                            onClick={(e) =>
                                                              confirmClick(
                                                                item.id,
                                                                "Referral"
                                                              )
                                                            }
                                                          >
                                                            <i
                                                              className="fa fa-trash"
                                                              style={{
                                                                color: "red",
                                                              }}
                                                              title="Delete"
                                                            ></i>
                                                          </a>
                                                        </div>
                                                        <div className="clearfix">
                                                          <>
                                                            <div
                                                              key={index}
                                                              className="d-flex justify-content-between align-items-baseline  respoChildFooter"
                                                            >
                                                              <div className="">
                                                                <div className="my-4 mt-0 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-flag purpleText" />
                                                                  Country:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.countryName
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-calendar purpleText" />
                                                                  Duration:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.validUpTo
                                                                    }{" "}
                                                                    Days
                                                                  </div>
                                                                </div>

                                                                <div className="my-4 mt-3 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                  Referrer
                                                                  Points:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.senderPoint
                                                                    }
                                                                  </div>
                                                                </div>

                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                  Referee
                                                                  Points:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.receiverPoint
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="">
                                                                <div className="my-4 d-flex rewardRespFont mt-3">
                                                                  <i className="pe-2 fa fa-money-bill purpleText" />
                                                                  Referrer Cash
                                                                  balance:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.senderCash
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-money-bill purpleText" />
                                                                  Referee Cash
                                                                  balance:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.receiverCash
                                                                    }
                                                                  </div>
                                                                </div>

                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-exchange purpleText" />
                                                                  Referrer Min.
                                                                  Trans Amount:{" "}
                                                                  <div className="ps-2">
                                                                    {" "}
                                                                    {
                                                                      item.minTransaction
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-exchange purpleText" />
                                                                  Referee Min.
                                                                  Trans Amount:{" "}
                                                                  <div className="ps-2">
                                                                    {" "}
                                                                    {
                                                                      item.maxTransaction
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-md-12">
                                              {referlDetils
                                                .slice(
                                                  Math.ceil(
                                                    referlDetils.length / 2
                                                  )
                                                )
                                                .map((item, index) => {
                                                  return (
                                                    <div className="card shadow">
                                                      <div className="body p-xl-3">
                                                        <div className="showEnd">
                                                          <a
                                                            className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                            onClick={(e) =>
                                                              editReferal(
                                                                item.id
                                                              )
                                                            }
                                                          >
                                                            <i
                                                              className="fa fa-pencil purpleText"
                                                              title="Edit"
                                                            ></i>
                                                          </a>{" "}
                                                          &nbsp;
                                                          <a
                                                            className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                            onClick={(e) =>
                                                              confirmClick(
                                                                item.id,
                                                                "Referral"
                                                              )
                                                            }
                                                          >
                                                            <i
                                                              className="fa fa-trash"
                                                              style={{
                                                                color: "red",
                                                              }}
                                                              title="Delete"
                                                            ></i>
                                                          </a>
                                                        </div>
                                                        <div className="clearfix">
                                                          <>
                                                            <div
                                                              key={index}
                                                              className="d-flex justify-content-between align-items-baseline respoChildFooter "
                                                            >
                                                              <div className="">
                                                                <div className="my-4 mt-0 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-flag purpleText" />
                                                                  Country:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.countryName
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-calendar purpleText" />
                                                                  Duration:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.validUpTo
                                                                    }{" "}
                                                                    Days
                                                                  </div>
                                                                </div>

                                                                <div className="my-4 mt-3 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                  Referrer
                                                                  Points:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.senderPoint
                                                                    }
                                                                  </div>
                                                                </div>

                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                  Referee
                                                                  Points:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.receiverPoint
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="">
                                                                <div className="my-4 d-flex rewardRespFont mt-3">
                                                                  <i className="pe-2 fa fa-money-bill purpleText" />
                                                                  Referrer Cash
                                                                  balance:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.senderCash
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-money-bill purpleText" />
                                                                  Referee Cash
                                                                  balance:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.receiverCash
                                                                    }
                                                                  </div>
                                                                </div>

                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-exchange purpleText" />
                                                                  Referrer Min.
                                                                  Trans Amount:{" "}
                                                                  <div className="ps-2">
                                                                    {" "}
                                                                    {
                                                                      item.minTransaction
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-exchange purpleText" />
                                                                  Referee Min.
                                                                  Trans Amount:{" "}
                                                                  <div className="ps-2">
                                                                    {" "}
                                                                    {
                                                                      item.maxTransaction
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                            </div>
                                          </div>
                                        ) : (
                                          <p className="text-center">
                                            {" "}
                                            No Referral's Data Found{" "}
                                          </p>
                                        )}

                                        {/* <div className="row clearfix mt-4">
                                          <div className="shadow-lg rounded-4  px-3 col-lg-6 col-md-6 col-md-12 h-100 my-3">
                                            {referlDetils.slice(0, Math.ceil(referlDetils.length / 2)).map((item, index) => {
                                              return (
                                                <>
                                                  < div key={index} className="d-flex justify-content-between align-items-baseline  respoChildFooter">
                                                    <div className="">
                                                      <div className="my-4 mt-0 d-flex rewardRespFont">
                                                        <i className="pe-2 fa fa-flag purpleText" />
                                                        Country:{" "}
                                                        <div className="ps-2">
                                                          {item.countryName}
                                                        </div>
                                                      </div>
                                                      <div className="my-4 d-flex rewardRespFont">
                                                        <i className="pe-2 fa fa-calendar purpleText" />
                                                        Expiry Date:{" "}
                                                        <div className="ps-2">
                                                          {item.validTo}
                                                        </div>
                                                      </div>

                                                      <div className="my-4 mt-3 d-flex rewardRespFont">
                                                 
                                                        <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                        Sender Points:{" "}
                                                        <div className="ps-2">{item.senderPoint}</div>
                                                      </div>

                                                      <div className="my-4 d-flex rewardRespFont">
                                               
                                                        <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                        Reciever Points:{" "}
                                                        <div className="ps-2">{item.receiverPoint}</div>
                                                      </div>
                                                    </div>
                                                    <div className="">
                                                      <div className="my-4 d-flex rewardRespFont mt-3">
                                                        <i className="pe-2 fa fa-money-bill purpleText" />
                                                        Sender Cash balance:{" "}
                                                        <div className="ps-2">
                                                          {item.senderCash}
                                                        </div>
                                                      </div>
                                                      <div className="my-4 d-flex rewardRespFont">
                                                        <i className="pe-2 fa fa-money-bill purpleText" />
                                                        Reciever Cash balance:{" "}
                                                        <div className="ps-2">
                                                          {item.receiverCash}
                                                        </div>
                                                      </div>

                                                      <div className="my-4 d-flex rewardRespFont">
                                                        <i className="pe-2 fa fa-exchange purpleText" />
                                                        Min. Transaction:{" "}
                                                        <div className="ps-2"> {item.minTransaction}</div>
                                                      </div>
                                                      <div className="my-4 d-flex rewardRespFont">
                                                        <i className="pe-2 fa fa-exchange purpleText" />
                                                        Max. Transaction:{" "}
                                                        <div className="ps-2"> {item.maxTransaction}</div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                              )
                                            })
                                            }
                                          </div>
                                          <div className="shadow-lg rounded-4 px-3 h-100  col-lg-6 col-md-6 col-md-12 my-3">
                                            {referlDetils.slice(Math.ceil(referlDetils.length / 2)).map((item, index) => {
                                              return (
                                                <>
                                                  < div key={index} className="d-flex justify-content-between align-items-baseline respoChildFooter ">
                                                    <div className="">
                                                      <div className="my-4 mt-0 d-flex rewardRespFont">
                                                        <i className="pe-2 fa fa-flag purpleText" />
                                                        Country:{" "}
                                                        <div className="ps-2">
                                                          {item.countryName}
                                                        </div>
                                                      </div>
                                                      <div className="my-4 d-flex rewardRespFont">
                                                        <i className="pe-2 fa fa-calendar purpleText" />
                                                        Expiry Date:{" "}
                                                        <div className="ps-2">
                                                          {item.validTo}
                                                        </div>
                                                      </div>

                                                      <div className="my-4 mt-3 d-flex rewardRespFont">
                                           
                                                        <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                        Sender Points:{" "}
                                                        <div className="ps-2">{item.senderPoint}</div>
                                                      </div>

                                                      <div className="my-4 d-flex rewardRespFont">
                                            
                                                        <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                        Reciever Points:{" "}
                                                        <div className="ps-2">{item.receiverPoint}</div>
                                                      </div>
                                                    </div>
                                                    <div className="">
                                                      <div className="my-4 d-flex rewardRespFont mt-3">
                                                        <i className="pe-2 fa fa-money-bill purpleText" />
                                                        Sender Cash balance:{" "}
                                                        <div className="ps-2">
                                                          {item.senderCash}
                                                        </div>
                                                      </div>
                                                      <div className="my-4 d-flex rewardRespFont">
                                                        <i className="pe-2 fa fa-money-bill purpleText" />
                                                        Reciever Cash balance:{" "}
                                                        <div className="ps-2">
                                                          {item.receiverCash}
                                                        </div>
                                                      </div>

                                                      <div className="my-4 d-flex rewardRespFont">
                                                        <i className="pe-2 fa fa-exchange purpleText" />
                                                        Min. Transaction:{" "}
                                                        <div className="ps-2"> {item.minTransaction}</div>
                                                      </div>
                                                      <div className="my-4 d-flex rewardRespFont">
                                                        <i className="pe-2 fa fa-exchange purpleText" />
                                                        Max. Transaction:{" "}
                                                        <div className="ps-2"> {item.maxTransaction}</div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                              )
                                            })
                                            }
                                          </div>
                                        </div> */}
                                      </>
                                    ) : (
                                      <div className="pointsAddTable p-3 pt-0 px-0">
                                        <h5 className="mb-3 pb-0 purpleText my-4">
                                          {editId ? "Update" : "Add"} Referral{" "}
                                        </h5>
                                        <Form>
                                          <div className="border p-3 rounded-2 d-flex py-4 respoChildFooter align-items-center">
                                            <div className="col-lg-6 ">
                                              <Form.Group
                                                as={Col}
                                                className=""
                                                controlId="formGridState"
                                              >
                                                <Form.Label>
                                                  Select Referrer Country
                                                </Form.Label>
                                                <Select
                                                  isMulti
                                                  menuIsOpen={menuOpen}
                                                  name="senderCountryId"
                                                  options={countryGet}
                                                  className="basic-multi-select"
                                                  classNamePrefix="select"
                                                  closeMenuOnSelect={false}
                                                  onChange={handleSelect1Change}
                                                  onMenuOpen={onMenuOpen}
                                                  value={selectedCountries}
                                                  isDisabled={editId}
                                                />
                                                {errors.sendercontry &&
                                                  !selectedCountries.length >
                                                    0 && (
                                                    <small className="text-danger error_message ms-2">
                                                      Please select a Referrer
                                                      Country.
                                                    </small>
                                                  )}
                                              </Form.Group>
                                            </div>

                                            <div className="col-lg-6">
                                              <div className="w-100 ">
                                                <Form.Label>
                                                  Duration
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  placeholder="Duration in Days"
                                                  inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                  pattern="[0-9]*" // This will enforce numeric-only input
                                                  value={Referralduration}
                                                  onChange={
                                                    handleDurationChange
                                                  }
                                                  min="1" // Set a minimum value (optional)
                                                  max="365"
                                                />
                                                {errors.Referralduration &&
                                                  !Referralduration && (
                                                    <small className="text-danger error_message ms-2">
                                                      {errors.Referralduration}
                                                    </small>
                                                  )}
                                              </div>
                                              {/* <Form.Group as={Col} controlId="formGridState"
                                                className="d-flex justify-content-between align-items-center respoChildFooter"
                                              >
                                                <div className="w-100">
                                                  <Form.Label>Promocode</Form.Label>
                                                  <Form.Control
                                                    type="text"
                                                    placeholder="Promocode"
                                                    value={ReferralPromoCode}
                                                    onChange={(e) => setReferralPromoCode(e.target.value)}
                                                  />
                                                  {errors.ReferralPromoCode && !ReferralPromoCode && (
                                                    <small className="text-danger error_message ms-2">
                                                      {errors.ReferralPromoCode}
                                                    </small>
                                                  )}
                                                </div>
                                              </Form.Group>

                                              <Form.Group as={Col} controlId="formGridState">
                                                <div className="w-100 ">
                                                  <Form.Label>Valid To</Form.Label>
                                                  <Form.Control
                                                    type="date"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    min={today}
                                                  />
                                                </div>
                                                {errors.selectedDate && !selectedDate && (
                                                  <small className="text-danger error_message ms-2">
                                                    {errors.selectedDate}
                                                  </small>
                                                )}
                                              </Form.Group> */}
                                            </div>
                                          </div>

                                          <div className="my-4">
                                            <div className="border p-3 rounded-2">
                                              <h5 className="purpleText">
                                                Benefits on cash balance
                                              </h5>
                                              <Row className="my-4">
                                                <div className="col-lg-12 "></div>
                                              </Row>
                                              <div className="col-lg-12 px-0 my-3">
                                                <Form.Group
                                                  className="d-flex justify-content-between align-items-center respoChildFooter"
                                                  controlId="formGridCity"
                                                >
                                                  <div className="w-100 col-lg-6 ">
                                                    <Form.Label>
                                                      Referrer Cash Balance
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Referrer Cash balance"
                                                      inputMode="numeric"
                                                      pattern="[0-9]*"
                                                      value={senderCashBalance}
                                                      onChange={(e) => {
                                                        const numericValue =
                                                          e.target.value.replace(
                                                            /[^0-9.]/g,
                                                            ""
                                                          );
                                                        setSenderCashBalance(
                                                          numericValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.senderCashBalance &&
                                                      !senderCashBalance && (
                                                        <small className="text-danger error_message ms-2">
                                                          {
                                                            errors.senderCashBalance
                                                          }
                                                        </small>
                                                      )}
                                                  </div>

                                                  <div className="w-100 col-lg-6">
                                                    <Form.Label>
                                                      Referee Cash Balance
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Referee Cash balance"
                                                      inputMode="numeric"
                                                      pattern="[0-9]*"
                                                      value={
                                                        receiverCashBalance
                                                      }
                                                      onChange={(e) => {
                                                        const numericValue =
                                                          e.target.value.replace(
                                                            /[^0-9.]/g,
                                                            ""
                                                          );
                                                        setReceiverCashBalance(
                                                          numericValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.receiverCashBalance &&
                                                      !receiverCashBalance && (
                                                        <small className="text-danger error_message ms-2">
                                                          {
                                                            errors.receiverCashBalance
                                                          }
                                                        </small>
                                                      )}
                                                  </div>
                                                </Form.Group>
                                              </div>
                                              {/* <FormControlLabel control={<Checkbox checked={additionalCheckboxValue} onChange={(e) => setAdditionalCheckboxValue(e.target.checked)} />} label="Convertible Into Cash" /> */}
                                            </div>

                                            <div className="border p-3 rounded-2 my-3">
                                              <h5 className="purpleText">
                                                Benefits on points
                                              </h5>

                                              <div className="col-lg-12 px-0 my-3">
                                                <Form.Group
                                                  className="d-flex justify-content-between align-items-center respoChildFooter"
                                                  controlId="formGridCity"
                                                >
                                                  <div className="w-100 col-lg-6 ">
                                                    <Form.Label>
                                                      Referrer Points
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Referrer Points"
                                                      inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                      pattern="[0-9]*" // This will enforce numeric-only input
                                                      value={senderPoints}
                                                      onChange={(e) => {
                                                        const numericValue =
                                                          e.target.value.replace(
                                                            /\D/g,
                                                            ""
                                                          );
                                                        setSenderPoints(
                                                          numericValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.senderPoints &&
                                                      !senderPoints && (
                                                        <small className="text-danger error_message ms-2">
                                                          {errors.senderPoints}
                                                        </small>
                                                      )}
                                                  </div>

                                                  <div className="w-100 col-lg-6">
                                                    <Form.Label>
                                                      Referee Points
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Referee Points"
                                                      inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                      pattern="[0-9]*" // This will enforce numeric-only input
                                                      value={receiverPoints}
                                                      onChange={(e) => {
                                                        const numericValue =
                                                          e.target.value.replace(
                                                            /\D/g,
                                                            ""
                                                          );
                                                        setReceiverPoints(
                                                          numericValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.receiverPoints &&
                                                      !receiverPoints && (
                                                        <small className="text-danger error_message ms-2">
                                                          {
                                                            errors.receiverPoints
                                                          }
                                                        </small>
                                                      )}
                                                  </div>
                                                </Form.Group>
                                              </div>
                                              <div className="col-lg-12 px-0 my-3">
                                                <Form.Group
                                                  className="d-flex justify-content-between align-items-center respoChildFooter"
                                                  controlId="formGridCity"
                                                ></Form.Group>
                                              </div>
                                            </div>
                                            <div className="border p-3 rounded-2 my-3">
                                              <h5 className="purpleText">
                                                Conditions
                                              </h5>

                                              <div className="col-lg-12 px-0 my-3">
                                                <Form.Group
                                                  className="d-flex justify-content-between align-items-center respoChildFooter"
                                                  controlId="formGridCity"
                                                >
                                                  <div className="w-100 col-lg-6 ">
                                                    <Form.Label>
                                                      Referrer Min. Transaction
                                                      Amount
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Referrer  Min. Transaction Amount"
                                                      inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                      pattern="[0-9]*" // This will enforce numeric-only input
                                                      value={
                                                        senderMinTransaction
                                                      }
                                                      onChange={(e) => {
                                                        const numericValue =
                                                          e.target.value.replace(
                                                            /[^0-9.]/g,
                                                            ""
                                                          );
                                                        setSenderMinTransaction(
                                                          numericValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.senderMinTransaction &&
                                                      !senderMinTransaction && (
                                                        <small className="text-danger error_message ms-2">
                                                          {
                                                            errors.senderMinTransaction
                                                          }
                                                        </small>
                                                      )}
                                                  </div>

                                                  <div className="w-100 col-lg-6">
                                                    <Form.Label>
                                                      Referee Min. Transaction
                                                      Amount
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Referee Min. Transaction Amount"
                                                      inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                      pattern="[0-9]*" // This will enforce numeric-only input
                                                      value={
                                                        receiverMinTransaction
                                                      }
                                                      onChange={(e) => {
                                                        const numericValue =
                                                          e.target.value.replace(
                                                            /[^0-9.]/g,
                                                            ""
                                                          );
                                                        setReceiverMinTransaction(
                                                          numericValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.receiverMinTransaction &&
                                                      !receiverMinTransaction && (
                                                        <small className="text-danger error_message ms-2">
                                                          {
                                                            errors.receiverMinTransaction
                                                          }
                                                        </small>
                                                      )}
                                                  </div>
                                                </Form.Group>
                                              </div>
                                            </div>
                                          </div>
                                        </Form>
                                        <div className="row d-flex justify-content-end mt-3 ">
                                          <div className="col-lg-1">
                                            <Button
                                              className="m-0 mt-3 purpleBackground text-white"
                                              variant="contained"
                                              onClick={() =>
                                                saveReferralDetails()
                                              }
                                            >
                                              {editId ? "Update" : "Add"}
                                            </Button>
                                          </div>
                                          <div className="col-lg-1">
                                            <Button
                                              className="m-0 mt-3 text-black border"
                                              onClick={() =>
                                                togglePreviewRewards()
                                              }
                                              variant="outlined"
                                            >
                                              Close
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* The Modal component */}
                              <Modal
                                show={showModal}
                                onHide={handleCloseModal}
                                centered
                              >
                                <Modal.Header closeButton className="">
                                  <Modal.Title>Send notification</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <Form>
                                    <div className="col-lg-12 px-0">
                                      <div className="font-weight-normal m-2 labelCard">
                                        Select notification
                                      </div>
                                      <Dropdown>
                                        <Dropdown.Toggle
                                          style={{
                                            color: "#6b757d",
                                            fontSize: "1rem",
                                          }}
                                          className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border col-lg-12 d-flex align-items-center justify-content-between"
                                          variant="secondary"
                                        >
                                          Select notification
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="col-lg-12">
                                          <Dropdown.Item>
                                            Account Created
                                          </Dropdown.Item>
                                          <Dropdown.Item>
                                            Account Closed
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>

                                    <Form.Group
                                      controlId="notes"
                                      className="mt-3"
                                    >
                                      <Form.Label>Note</Form.Label>
                                      <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                  </Form>
                                </Modal.Body>
                                <Modal.Footer className="">
                                  <div className="d-flex ms-auto ">
                                    <Button
                                      className="purpleBorder bg-transparent purpleText"
                                      onClick={togglePreview}
                                    >
                                      Cancel
                                    </Button>
                                    <Button className="purpleBackground border-0 px-4">
                                      Add
                                    </Button>
                                  </div>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          </div>
                        </div>
                        <div
                          id="bacicTab2pan-2"
                          className={`tab-pane ${
                            activeTab === 2 ? "show active" : ""
                          }`}
                        >
                          <div className="main px-3 px-xl-2">
                            <div>
                              <div className="container-fluid">
                                <div className="row clearfix">
                                  <div className="col-lg-12 col-md-12 p-0">
                                    {showPreviewPromocode ? (
                                      <>
                                        <div className=" align-items-center respoChildFooter mb-2">
                                          <div className="d-flex pbSt align-items-center justify-content-between respoChildFooter ">
                                            <h5 className="mb-3 pb-0 purpleText my-4 ml-2">
                                              Promocode Information{" "}
                                            </h5>
                                            &nbsp;&nbsp;
                                            <a
                                              className="btn btn-default purpleBackground text-white bolder"
                                              onClick={() =>
                                                togglePreviewPromocode()
                                              }
                                            >
                                              <i className="text-white fa fa-plus bolder"></i>{" "}
                                              {editId ? "Update" : "Add"}{" "}
                                              Promocode
                                            </a>
                                          </div>
                                        </div>
                                        {AllPromocodes &&
                                        AllPromocodes.length > 0 ? (
                                          <div className="row clearfix d-flex justify-content-between ">
                                            <div className="p-3 col-lg-6 my-3">
                                              {AllPromocodes.slice(
                                                0,
                                                Math.ceil(
                                                  AllPromocodes.length / 2
                                                )
                                              ).map((item, index) => {
                                                return (
                                                  <>
                                                    <div className="card shadow">
                                                      <div className="body p-xl-3">
                                                        <div className="clearfix">
                                                          <div className="showEnd">
                                                            <a
                                                              className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                              onClick={() =>
                                                                editPromocode(
                                                                  item.id
                                                                )
                                                              }
                                                            >
                                                              <i
                                                                className="fa fa-pencil purpleText"
                                                                title="Edit"
                                                              ></i>
                                                            </a>{" "}
                                                            &nbsp;
                                                            <a
                                                              className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                              onClick={(e) =>
                                                                confirmClick(
                                                                  item.id,
                                                                  "Promocode"
                                                                )
                                                              }
                                                            >
                                                              <i
                                                                className="fa fa-trash"
                                                                style={{
                                                                  color: "red",
                                                                }}
                                                                title="Delete"
                                                              ></i>
                                                            </a>
                                                          </div>
                                                          <div className="d-flex justify-content-between align-items-baseline  respoChildFooter ">
                                                            <div className="">
                                                              <div className="my-4 mt-0 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-flag purpleText" />
                                                                Country:{" "}
                                                                <div className="ps-2">
                                                                  {item.country}
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-dollar purpleText" />
                                                                Valid From:{" "}
                                                                <div className="ps-2">
                                                                  {" "}
                                                                  {
                                                                    item.validFrom
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-dollar purpleText" />
                                                                Delivered
                                                                Method:{" "}
                                                                <div className="ps-2">
                                                                  {" "}
                                                                  {
                                                                    item.deliveryMethod
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-dollar purpleText" />
                                                                Title:{" "}
                                                                <div className="ps-2">
                                                                  {item.title
                                                                    .length >
                                                                  20 ? (
                                                                    <>
                                                                      {`${item.title.slice(
                                                                        0,
                                                                        20
                                                                      )}`}
                                                                      <span
                                                                        onClick={() =>
                                                                          openTitleModel(
                                                                            item.title
                                                                          )
                                                                        }
                                                                        style={{
                                                                          cursor:
                                                                            "pointer",
                                                                          color:
                                                                            "blue",
                                                                          textDecoration:
                                                                            "underline",
                                                                        }}
                                                                      >
                                                                        ....
                                                                      </span>
                                                                    </>
                                                                  ) : (
                                                                    item.title
                                                                  )}
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-dollar purpleText" />
                                                                Min. Service
                                                                Charge:{" "}
                                                                <div className="ps-2">
                                                                  {" "}
                                                                  {
                                                                    item.minServiceCharge
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Min No Trans:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.minTransaction
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-dollar purpleText" />
                                                                Type:{" "}
                                                                <div className="ps-2">
                                                                  {item.types}
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-gift purpleText" />
                                                                PromoCode:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.promoCode
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Valid To:{" "}
                                                                <div className="ps-2">
                                                                  {item.validTo}
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Payment Method:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.paymentMethod
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Discount On
                                                                Service Charge:{" "}
                                                                <div className="ps-2">
                                                                  {item.seDiscount
                                                                    ? item.seDiscount
                                                                    : "-"}
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Max Service
                                                                Charge:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.maxServiceCharge
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                Max No Trans:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.maxTransaction
                                                                  }
                                                                </div>
                                                              </div>
                                                              {/* 
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                Receiver Points:{" "}
                                                                <div className="ps-2">{item.minAmount}</div>
                                                              </div> */}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </>
                                                );
                                              })}
                                            </div>
                                            <div className="rounded-4 p-3 col-lg-6 my-3">
                                              {AllPromocodes.slice(
                                                Math.ceil(
                                                  AllPromocodes.length / 2
                                                )
                                              ).map((item, index) => {
                                                return (
                                                  <>
                                                    <div className="card shadow">
                                                      <div className="body p-xl-3">
                                                        <div className="clearfix">
                                                          <div className="showEnd">
                                                            <a
                                                              className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                              onClick={() =>
                                                                editPromocode(
                                                                  item.id
                                                                )
                                                              }
                                                            >
                                                              <i
                                                                className="fa fa-pencil purpleText"
                                                                title="Edit"
                                                              ></i>
                                                            </a>{" "}
                                                            &nbsp;
                                                            <a
                                                              className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                              onClick={(e) =>
                                                                confirmClick(
                                                                  item.id,
                                                                  "Promocode"
                                                                )
                                                              }
                                                            >
                                                              <i
                                                                className="fa fa-trash"
                                                                style={{
                                                                  color: "red",
                                                                }}
                                                                title="Delete"
                                                              ></i>
                                                            </a>
                                                          </div>
                                                          <div className="d-flex justify-content-between align-items-baseline  respoChildFooter ">
                                                            <div className="">
                                                              <div className="my-4 mt-0 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-flag purpleText" />
                                                                Country:{" "}
                                                                <div className="ps-2">
                                                                  {item.country}
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-dollar purpleText" />
                                                                Valid From:{" "}
                                                                <div className="ps-2">
                                                                  {" "}
                                                                  {
                                                                    item.validFrom
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-dollar purpleText" />
                                                                Delivered
                                                                Method:{" "}
                                                                <div className="ps-2">
                                                                  {" "}
                                                                  {
                                                                    item.deliveryMethod
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-dollar purpleText" />
                                                                Title:{" "}
                                                                <div className="ps-2">
                                                                  {item.title
                                                                    .length >
                                                                  20 ? (
                                                                    <>
                                                                      {`${item.title.slice(
                                                                        0,
                                                                        20
                                                                      )}`}
                                                                      <span
                                                                        onClick={() =>
                                                                          openTitleModel(
                                                                            item.title
                                                                          )
                                                                        }
                                                                        style={{
                                                                          cursor:
                                                                            "pointer",
                                                                          color:
                                                                            "blue",
                                                                          textDecoration:
                                                                            "underline",
                                                                        }}
                                                                      >
                                                                        ....
                                                                      </span>
                                                                    </>
                                                                  ) : (
                                                                    item.title
                                                                  )}
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-dollar purpleText" />
                                                                Min. Service
                                                                Charge:{" "}
                                                                <div className="ps-2">
                                                                  {" "}
                                                                  {
                                                                    item.minServiceCharge
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Min No Trans:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.minTransaction
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-dollar purpleText" />
                                                                Type:{" "}
                                                                <div className="ps-2">
                                                                  {item.types}
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-gift purpleText" />
                                                                PromoCode:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.promoCode
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Valid To:{" "}
                                                                <div className="ps-2">
                                                                  {item.validTo}
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Payment Method:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.paymentMethod
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Discount On
                                                                Service Charge:{" "}
                                                                <div className="ps-2">
                                                                  <div className="ps-2">
                                                                    {item.seDiscount
                                                                      ? item.seDiscount
                                                                      : "-"}
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Max Service
                                                                Charge:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.maxServiceCharge
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                Max No Trans:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.maxServiceCharge
                                                                  }
                                                                </div>
                                                              </div>
                                                              {/* <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                Receiver Points:{" "}
                                                                <div className="ps-2">{item.minAmount}</div>
                                                              </div> */}
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        ) : (
                                          <p className="text-center">
                                            No Promocode's Data Found
                                          </p>
                                        )}
                                        <ModalComponent
                                          show={modalShow}
                                          title11={"Deleted successfully"}
                                          onHide={() => setModalShow(false)}
                                        />
                                        <ModalComponentPopup
                                          show={modalShowPrChange}
                                          title1={`Are you sure want to delete this ${selectedName} ?`}
                                          cancle={(e) =>
                                            handlePrchangePopupCancle(e)
                                          }
                                          SavePr={() => handleDelete()}
                                        />
                                        {/* title model */}
                                        <Modal
                                          show={showModal1}
                                          onHide={handleClose}
                                        >
                                          <Modal.Header closeButton>
                                            <Modal.Title>
                                              Full Title
                                            </Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>{fullTitle}</Modal.Body>
                                          <Modal.Footer>
                                            <Button
                                              variant="secondary"
                                              onClick={handleClose}
                                            >
                                              Close
                                            </Button>
                                          </Modal.Footer>
                                        </Modal>
                                        {/* description model */}
                                        <Modal
                                          show={showModal2}
                                          onHide={handleClose1}
                                        >
                                          <Modal.Header closeButton>
                                            <Modal.Title>
                                              Full Description
                                            </Modal.Title>
                                          </Modal.Header>
                                          <Modal.Body>
                                            {fullDesciption}
                                          </Modal.Body>
                                          <Modal.Footer>
                                            <Button
                                              variant="secondary"
                                              onClick={handleClose1}
                                            >
                                              Close
                                            </Button>
                                          </Modal.Footer>
                                        </Modal>
                                      </>
                                    ) : (
                                      <div className="pointsAddTable p-3 pt-0 px-0">
                                        <h5 className="mb-3 pb-0 purpleText my-4">
                                          {editId ? "Update" : "Add"} Promocode{" "}
                                        </h5>
                                        <Form>
                                          <div className="border p-3 rounded-2 d-flex py-4 respoChildFooter align-items-center">
                                            <div className="col-lg-12 px-0">
                                              <Form.Group
                                                as={Col}
                                                className="d-flex justify-content-between align-items-center respoChildFooter flex-wrap "
                                                controlId="formGridState"
                                              >
                                                <div className="w-100 col-lg-6 ">
                                                  <Form.Label>
                                                    Select Sender Country
                                                  </Form.Label>
                                                  <Select
                                                    isMulti
                                                    menuIsOpen={menuOpen}
                                                    name="senderCountryId"
                                                    options={countryGet}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    closeMenuOnSelect={false}
                                                    onMenuOpen={onMenuOpen}
                                                    onChange={handleSelect3}
                                                    value={senderCountryIds2}
                                                    isDisabled={editId}
                                                  />
                                                  {errors.senderCountryIds2 &&
                                                    senderCountryIds2.length ==
                                                      0 && (
                                                      <small className="text-danger error_message ms-2">
                                                        {
                                                          errors.senderCountryIds2
                                                        }
                                                      </small>
                                                    )}
                                                </div>
                                                <div className="w-100 col-lg-6 ">
                                                  <Form.Label>
                                                    Promocode
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="text"
                                                    placeholder="Promocode"
                                                    inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                    pattern="[0-9]*" // This will enforce numeric-only input
                                                    value={promoCode}
                                                    onChange={(e) =>
                                                      checkPromocode(e)
                                                    }
                                                    disabled={
                                                      editId ? true : false
                                                    }
                                                  />
                                                  {errors.promoCode &&
                                                    !promoCode && (
                                                      <small className="text-danger error_message ms-2">
                                                        {errors.promoCode}
                                                      </small>
                                                    )}
                                                  {message && (
                                                    <small className="text-danger error_message ms-2">
                                                      Promocode Already Exist
                                                    </small>
                                                  )}
                                                </div>
                                              </Form.Group>
                                              <Form.Group
                                                as={Col}
                                                className="d-flex justify-content-between align-items-center respoChildFooter flex-wrap  my-3"
                                                controlId="formGridState"
                                              >
                                                <div className="w-100 col-lg-6 ">
                                                  <Form.Label>
                                                    Valid From
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="date"
                                                    value={validFromPromo}
                                                    onChange={(e) => {
                                                      const enteredDate =
                                                        e.target.value;
                                                      const datePattern =
                                                        /^\d{4}-\d{2}-\d{2}$/;
                                                      if (
                                                        datePattern.test(
                                                          enteredDate
                                                        )
                                                      ) {
                                                        setValidFromPromo(
                                                          enteredDate
                                                        );
                                                        setTouched(true);
                                                      }
                                                    }}
                                                    min={today}
                                                  />
                                                  {errors.validFromPromo &&
                                                    !validFromPromo && (
                                                      <small className="text-danger error_message ms-2">
                                                        {errors.validFromPromo}
                                                      </small>
                                                    )}
                                                </div>
                                                <div className="w-100 col-lg-6 ">
                                                  <Form.Label>
                                                    Valid To
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="date"
                                                    inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                    pattern="[0-9]*" // This will enforce numeric-only input
                                                    value={validTo}
                                                    onChange={(e) => {
                                                      const enteredDate =
                                                        e.target.value;
                                                      const datePattern =
                                                        /^\d{4}-\d{2}-\d{2}$/;
                                                      if (
                                                        datePattern.test(
                                                          enteredDate
                                                        )
                                                      ) {
                                                        setValidTo(enteredDate);
                                                        setTouched(true);
                                                      }
                                                    }}
                                                    min={today}
                                                  />
                                                  {errors.validTo &&
                                                    !validTo && (
                                                      <small className="text-danger error_message ms-2">
                                                        {errors.validTo}
                                                      </small>
                                                    )}
                                                </div>
                                              </Form.Group>
                                              <Form.Group
                                                as={Col}
                                                className="d-flex justify-content-between align-items-center respoChildFooter flex-wrap  my-3"
                                                controlId="formGridState"
                                              >
                                                <div className="w-100 col-lg-6 ">
                                                  <Form.Label>
                                                    Delivery Method
                                                  </Form.Label>
                                                  <Select
                                                    isMulti
                                                    menuIsOpen={menuOpen2}
                                                    name="deliveryMethodId"
                                                    options={deliveryMethod}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    closeMenuOnSelect={false}
                                                    onMenuOpen={onMenuOpen2}
                                                    onChange={
                                                      handleDeliverychange
                                                    }
                                                    value={
                                                      selectedDelivryMethod
                                                    }
                                                  />
                                                  {errors.deliveryMethodId &&
                                                    !deliveryMethodId && (
                                                      <small className="text-danger error_message ms-2">
                                                        {
                                                          errors.deliveryMethodId
                                                        }
                                                      </small>
                                                    )}
                                                </div>
                                                <div className="w-100 col-lg-6 ">
                                                  <Form.Label>
                                                    Payment Method
                                                  </Form.Label>
                                                  <Select
                                                    isMulti
                                                    menuIsOpen={menuOpen1}
                                                    name="paymentMethodId"
                                                    options={paymentMethod}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    closeMenuOnSelect={false}
                                                    onMenuOpen={onMenuOpen1}
                                                    onChange={
                                                      handlePaymentSelect
                                                    }
                                                    value={paymnetMethod}
                                                  />
                                                  {errors.paymentMethodId &&
                                                    !paymentMethodId && (
                                                      <small className="text-danger error_message ms-2">
                                                        {errors.paymentMethodId}
                                                      </small>
                                                    )}
                                                </div>
                                              </Form.Group>

                                              <Form.Group
                                                as={Col}
                                                className="d-flex justify-content-between align-items-center respoChildFooter flex-wrap  my-3"
                                                controlId="formGridState"
                                              >
                                                <div className="w-100 col-lg-6 ">
                                                  <Form.Label>Users</Form.Label>
                                                  <Select
                                                    isMulti
                                                    menuIsOpen={menuOpen3}
                                                    name="usersId"
                                                    options={receiver}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    closeMenuOnSelect={false}
                                                    onMenuOpen={onMenuOpen3}
                                                    onChange={userSelect}
                                                    value={selectedUsers}
                                                  />
                                                  {errors.selectedUserId &&
                                                    !selectedUserId && (
                                                      <small className="text-danger error_message ms-2">
                                                        {errors.selectedUserId}
                                                      </small>
                                                    )}
                                                </div>
                                                <div className="w-100 col-lg-6 ">
                                                  <Form.Label>Title</Form.Label>
                                                  <Form.Control
                                                    type="text"
                                                    placeholder="Title"
                                                    value={title}
                                                    onChange={(e) => {
                                                      setTitle(e.target.value);
                                                      setTouched(true);
                                                    }}
                                                  />
                                                  {errors.title && !title && (
                                                    <small className="text-danger error_message ms-2">
                                                      {errors.title}
                                                    </small>
                                                  )}
                                                </div>
                                              </Form.Group>

                                              <Form.Group
                                                as={Col}
                                                className="d-flex justify-content-between align-items-center respoChildFooter flex-wrap  my-3"
                                                controlId="formGridState"
                                              >
                                                <div className="w-100 col-lg-12 ">
                                                  <Form.Label>
                                                    Description
                                                  </Form.Label>
                                                  <Form.Control
                                                    as="textarea" // Use textarea element for multiline input
                                                    rows={4} // Number of visible rows for the textarea
                                                    value={description}
                                                    onChange={(e) =>
                                                      setDescription(
                                                        e.target.value
                                                      )
                                                    }
                                                    placeholder="Description"
                                                  />
                                                  {errors.description &&
                                                    !description && (
                                                      <small className="text-danger error_message ms-2">
                                                        {errors.description}
                                                      </small>
                                                    )}
                                                </div>
                                              </Form.Group>

                                              <div className="w-100 col-lg-6 ml-2">
                                                <FormControlLabel
                                                  control={
                                                    <Checkbox
                                                      checked={isHidden}
                                                      onChange={(e) =>
                                                        setisHidden(
                                                          e.target.checked
                                                        )
                                                      }
                                                    />
                                                  }
                                                  label="Is Hidden"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="my-4">
                                            <div className="border p-3 rounded-2">
                                              <h5 className="purpleText">
                                                Benefits On Cash
                                              </h5>
                                              <Row className="my-4">
                                                <div className="col-lg-12 ">
                                                  <Form.Group
                                                    as={Col}
                                                    className="d-flex justify-content-between align-items-center respoChildFooter flex-wrap"
                                                    controlId="formGridState"
                                                  >
                                                    <div className="w-100 col-lg-6 ">
                                                      <Form.Label>
                                                        Cash Balance
                                                      </Form.Label>
                                                      <Form.Control
                                                        type="text"
                                                        placeholder="Cash Balance"
                                                        inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                        pattern="[0-9]*" // This will enforce numeric-only input
                                                        value={cashBalance}
                                                        onChange={(e) => {
                                                          const numericValue =
                                                            e.target.value.replace(
                                                              /\D/g,
                                                              ""
                                                            );
                                                          setCashBalance(
                                                            numericValue
                                                          );
                                                        }}
                                                      />
                                                      {errors.cashBalance &&
                                                        !cashBalance && (
                                                          <small className="text-danger error_message ms-2">
                                                            {errors.cashBalance}
                                                          </small>
                                                        )}
                                                    </div>
                                                    <div className="w-100 col-lg-6 ">
                                                      <Form.Label>
                                                        Minimum Sending Amount
                                                      </Form.Label>
                                                      <Form.Control
                                                        type="text"
                                                        placeholder="Minimum Sending Amount"
                                                        inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                        pattern="[0-9]*" // This will enforce numeric-only input
                                                        value={
                                                          minimumSendingAmount
                                                        }
                                                        onChange={(e) => {
                                                          const numericValue =
                                                            e.target.value.replace(
                                                              /\D/g,
                                                              ""
                                                            );
                                                          setMinimumSendingAmount(
                                                            numericValue
                                                          );
                                                        }}
                                                      />
                                                      {errors.minimumSendingAmount &&
                                                        !minimumSendingAmount && (
                                                          <small className="text-danger error_message ms-2">
                                                            {
                                                              errors.minimumSendingAmount
                                                            }
                                                          </small>
                                                        )}
                                                    </div>
                                                  </Form.Group>
                                                </div>
                                              </Row>
                                            </div>
                                            <div className="border p-3 rounded-2">
                                              <h5 className="purpleText">
                                                Benefits in Get Points
                                              </h5>
                                              <Row className="my-4">
                                                <div className="col-lg-12 "></div>
                                              </Row>

                                              <div className="col-lg-12 px-0 my-3">
                                                <Form.Group
                                                  className="d-flex justify-content-between align-items-center respoChildFooter flex-wrap"
                                                  controlId="formGridCity"
                                                >
                                                  <div className="w-100 col-lg-6 ">
                                                    <Form.Label>
                                                      Min Amount
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Min Amount"
                                                      inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                      pattern="[0-9]*" // This will enforce numeric-only input
                                                      value={minAmount}
                                                      onChange={(e) => {
                                                        const numericValue =
                                                          e.target.value.replace(
                                                            /\D/g,
                                                            ""
                                                          );
                                                        setMinAmount(
                                                          numericValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.minAmount &&
                                                      !minAmount && (
                                                        <small className="text-danger error_message ms-2">
                                                          {errors.minAmount}
                                                        </small>
                                                      )}
                                                  </div>

                                                  <div className="w-100 col-lg-6 ">
                                                    <Form.Label>
                                                      Max Amount
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Max Amount"
                                                      inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                      pattern="[0-9]*" // This will enforce numeric-only input
                                                      value={maxAmount}
                                                      onChange={(e) => {
                                                        const numericValue =
                                                          e.target.value.replace(
                                                            /\D/g,
                                                            ""
                                                          );
                                                        setMaxAmount(
                                                          numericValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.maxAmount &&
                                                      !maxAmount && (
                                                        <small className="text-danger error_message ms-2">
                                                          {errors.maxAmount}
                                                        </small>
                                                      )}
                                                  </div>

                                                  <div className="w-100 col-lg-6  my-3">
                                                    <Form.Label>
                                                      Get Points
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Get Points"
                                                      inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                      pattern="[0-9]*" // This will enforce numeric-only input
                                                      value={points}
                                                      onChange={(e) => {
                                                        const numericValue =
                                                          e.target.value.replace(
                                                            /\D/g,
                                                            ""
                                                          );
                                                        setPoints(numericValue);
                                                      }}
                                                    />
                                                    {errors.points &&
                                                      !points && (
                                                        <small className="text-danger error_message ms-2">
                                                          {errors.points}
                                                        </small>
                                                      )}
                                                  </div>

                                                  <div className="w-100 col-lg-6  my-3">
                                                    <Form.Label>
                                                      Duration
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text" // Use type="number" for numeric input
                                                      placeholder="Duration in Days"
                                                      value={duration}
                                                      onChange={
                                                        handleDurationChange
                                                      }
                                                      min="1" // Set a minimum value (optional)
                                                      max="365" // Set a maximum value
                                                    />
                                                    {errors.duration &&
                                                      !duration && (
                                                        <small className="text-danger error_message ms-2">
                                                          {errors.duration}
                                                        </small>
                                                      )}
                                                  </div>
                                                  {/* <div className="w-100 col-lg-6 ">
                                                    <FormControlLabel control={<Checkbox checked={isCoverttableIntoCash} onChange={(e) => setIsCoverttableIntoCash(e.target.checked)} />} label="Convertible Into Cash" />
                                                  </div> */}
                                                </Form.Group>
                                              </div>
                                            </div>

                                            <div className="d-none border p-3 rounded-2 my-3">
                                              <h5 className="purpleText">
                                                Benefits In Exchange Rate
                                              </h5>

                                              <div className="col-lg-12 px-0 my-3">
                                                <Form.Group
                                                  className="d-flex justify-content-between align-items-center respoChildFooter"
                                                  controlId="formGridCity"
                                                >
                                                  <div className="w-100 col-lg-6 ">
                                                    <Form.Label>
                                                      Discount on Exchange Rate
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Discount on Exchange Rate"
                                                      inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                      pattern="[0-9]*" // This will enforce numeric-only input
                                                      value={
                                                        discountOnExchangeRate
                                                      }
                                                      onChange={(e) => {
                                                        const selectedValue =
                                                          e.target.value.replace(
                                                            /[^0-9.]/g,
                                                            ""
                                                          );
                                                        setdiscountOnExchangeRate(
                                                          selectedValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.discountOnExchangeRate &&
                                                      !discountOnExchangeRate && (
                                                        <small className="text-danger error_message ms-2">
                                                          {
                                                            errors.discountOnExchangeRate
                                                          }
                                                        </small>
                                                      )}
                                                  </div>

                                                  <div className="w-100 col-lg-6">
                                                    <Form.Label>
                                                      Apply When Min. Exchange
                                                      Rate
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Apply When Min. Exchange Rate"
                                                      inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                      pattern="[0-9]*" // This will enforce numeric-only input
                                                      value={minExchangeRate}
                                                      onChange={(e) => {
                                                        const selectedValue =
                                                          e.target.value.replace(
                                                            /[^0-9.]/g,
                                                            ""
                                                          );
                                                        setMinExchangeRate(
                                                          selectedValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.minExchangeRate &&
                                                      !minExchangeRate && (
                                                        <small className="text-danger error_message ms-2">
                                                          {
                                                            errors.minExchangeRate
                                                          }
                                                        </small>
                                                      )}
                                                  </div>
                                                </Form.Group>
                                                <div className="w-100 col-lg-6">
                                                  <Form.Label className="mt-3">
                                                    Max Exchange Rate
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="text"
                                                    placeholder="Apply When Min. Exchange Rate"
                                                    inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                    pattern="[0-9]*" // This will enforce numeric-only input
                                                    value={maxExchangeRate}
                                                    onChange={(e) => {
                                                      const selectedValue =
                                                        e.target.value.replace(
                                                          /[^0-9.]/g,
                                                          ""
                                                        );
                                                      setMaxExchangeRate(
                                                        selectedValue
                                                      );
                                                    }}
                                                  />
                                                  {errors.minExchangeRate &&
                                                    !minExchangeRate && (
                                                      <small className="text-danger error_message ms-2">
                                                        {errors.minExchangeRate}
                                                      </small>
                                                    )}
                                                </div>
                                              </div>
                                            </div>

                                            <div className="border p-3 rounded-2 my-3">
                                              <h5 className="purpleText">
                                                Benefits in service charge
                                              </h5>

                                              <div className="col-lg-12 px-0 my-3">
                                                <Form.Group
                                                  className="d-flex justify-content-between align-items-center respoChildFooter"
                                                  controlId="formGridCity"
                                                >
                                                  <div className="w-100 col-lg-6 ">
                                                    <Form.Label>
                                                      Discount on service charge
                                                      (percentage)
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Discount on service charge"
                                                      inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                      pattern="[0-9]*" // This will enforce numeric-only input
                                                      value={
                                                        discountOnServiceCharge
                                                      }
                                                      onChange={(e) => {
                                                        const selectedValue =
                                                          e.target.value.replace(
                                                            /[^0-9.]/g,
                                                            ""
                                                          );
                                                        setDiscountOnServiceCharge(
                                                          selectedValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.discountOnServiceCharge &&
                                                      !discountOnServiceCharge && (
                                                        <small className="text-danger error_message ms-2">
                                                          {
                                                            errors.discountOnServiceCharge
                                                          }
                                                        </small>
                                                      )}
                                                  </div>

                                                  <div className="w-100 col-lg-6">
                                                    <Form.Label>
                                                      Min Service charge
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Apply when min Service charge value"
                                                      inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                      pattern="[0-9]*" // This will enforce numeric-only input
                                                      value={
                                                        applyMinServiceCharge
                                                      }
                                                      onChange={(e) => {
                                                        const selectedValue =
                                                          e.target.value.replace(
                                                            /[^0-9.]/g,
                                                            ""
                                                          );
                                                        setApplyMinServiceCharge(
                                                          selectedValue
                                                        );
                                                      }}
                                                    />
                                                    {errors.applyMinServiceCharge &&
                                                      !applyMinServiceCharge && (
                                                        <small className="text-danger error_message ms-2">
                                                          {
                                                            errors.applyMinServiceCharge
                                                          }
                                                        </small>
                                                      )}
                                                  </div>
                                                </Form.Group>

                                                <div className="w-100 col-lg-6">
                                                  <Form.Label className="mt-3">
                                                    Max Service charge
                                                  </Form.Label>
                                                  <Form.Control
                                                    type="text"
                                                    placeholder="Apply when min Service charge value"
                                                    inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                    pattern="[0-9]*" // This will enforce numeric-only input
                                                    value={
                                                      applyMaxServiceCharge
                                                    }
                                                    onChange={(e) => {
                                                      const selectedValue =
                                                        e.target.value.replace(
                                                          /[^0-9.]/g,
                                                          ""
                                                        );
                                                      setApplyMaxServiceCharge(
                                                        selectedValue
                                                      );
                                                    }}
                                                  />
                                                  {errors.applyMinServiceCharge &&
                                                    !applyMinServiceCharge && (
                                                      <small className="text-danger error_message ms-2">
                                                        {
                                                          errors.applyMinServiceCharge
                                                        }
                                                      </small>
                                                    )}
                                                </div>
                                              </div>
                                            </div>

                                            <div className="border p-3 rounded-2 my-3">
                                              <h5 className="purpleText">
                                                No. of Transaction when this
                                                Apply
                                              </h5>

                                              <div className="col-lg-12 px-0 my-3">
                                                <Form.Group
                                                  className="d-flex justify-content-between align-items-center respoChildFooter"
                                                  controlId="formGridCity"
                                                >
                                                  <div className="w-100 mt-3">
                                                    <Form.Select
                                                      type="number"
                                                      onChange={(e) =>
                                                        handleTypesChange(e)
                                                      }
                                                      value={selectedTypeValue}
                                                    >
                                                      <option>
                                                        Select Types
                                                      </option>
                                                      {Types &&
                                                        Types.map((row) => (
                                                          <option
                                                            value={row.value}
                                                          >
                                                            {row.name}
                                                          </option>
                                                        ))}
                                                    </Form.Select>
                                                  </div>
                                                </Form.Group>
                                              </div>

                                              <div className="col-lg-12 px-0 my-3">
                                                <Form.Group
                                                  className="d-flex justify-content-between align-items-center respoChildFooter"
                                                  controlId="formGridCity"
                                                >
                                                  <div className="w-100 col-lg-6">
                                                    <Form.Label>
                                                      Minimum No. Of Transaction
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder=" Minimum No.  Of Transactions"
                                                      inputMode="numeric"
                                                      pattern="[0-9]*"
                                                      value={minTransaction}
                                                      onChange={(e) => {
                                                        const numericValue =
                                                          e.target.value.replace(
                                                            /\D/g,
                                                            ""
                                                          );
                                                        setMinTransaction(
                                                          numericValue
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                  <div className="w-100 col-lg-6">
                                                    <Form.Label>
                                                      Maximum No. Of Transaction
                                                    </Form.Label>
                                                    <Form.Control
                                                      type="text"
                                                      placeholder="Maximum No. Of Transaction"
                                                      inputMode="numeric"
                                                      pattern="[0-9]*"
                                                      value={maxTransaction}
                                                      onChange={(e) => {
                                                        const numericValue =
                                                          e.target.value.replace(
                                                            /\D/g,
                                                            ""
                                                          );
                                                        setMaxTransaction(
                                                          numericValue
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                </Form.Group>
                                                <Form.Group>
                                                  <div className="respoChildFooter pt-4 mr-4 mr-4 ml-3">
                                                    <div className="font-weight-bold pbDowSt">
                                                      <div>
                                                        <span>
                                                          . Promocode can be
                                                          used only once per
                                                          user{" "}
                                                        </span>{" "}
                                                        <br />
                                                        <span>
                                                          . Min No Required = 0
                                                          & Max No = 1 -- Only
                                                          1st Transaction
                                                        </span>{" "}
                                                        <br />
                                                        <span>
                                                          . Min No Required = 4
                                                          & Max No = 5 -- Only
                                                          5th Transaction{" "}
                                                        </span>
                                                        <br />
                                                        <span>
                                                          . Min No Required = 2
                                                          & Max No = 5 -- Only
                                                          on 3rd, 4th and 5th{" "}
                                                        </span>
                                                        <br />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </Form.Group>
                                              </div>
                                            </div>
                                          </div>
                                        </Form>
                                        <div className="row d-flex justify-content-end mt-3 ">
                                          <div className="col-lg-1">
                                            <Button
                                              className="m-0 mt-3 purpleBackground text-white"
                                              variant="contained"
                                              onClick={handleSubmit}
                                            >
                                              {editId ? "Update" : "Add"}
                                            </Button>
                                          </div>
                                          <div className="col-lg-1">
                                            <Button
                                              className="m-0 mt-3 text-black border"
                                              onClick={togglePreviewPromocode}
                                              variant="outlined"
                                            >
                                              Close
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* The Modal component */}
                              <Modal
                                show={showModal}
                                onHide={handleCloseModal}
                                centered
                              >
                                <Modal.Header closeButton className="">
                                  <Modal.Title>Send notification</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <Form>
                                    <div className="col-lg-12 px-0">
                                      <div className="font-weight-normal m-2 labelCard">
                                        Select notification
                                      </div>
                                      <Dropdown>
                                        <Dropdown.Toggle
                                          style={{
                                            color: "#6b757d",
                                            fontSize: "1rem",
                                          }}
                                          className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border col-lg-12 d-flex align-items-center justify-content-between"
                                          variant="secondary"
                                        >
                                          Select notification
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="col-lg-12">
                                          <Dropdown.Item>
                                            Account Created
                                          </Dropdown.Item>
                                          <Dropdown.Item>
                                            Account Closed
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>

                                    <Form.Group
                                      controlId="notes"
                                      className="mt-3"
                                    >
                                      <Form.Label>Note</Form.Label>
                                      <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                  </Form>
                                </Modal.Body>
                                <Modal.Footer className="">
                                  <div className="d-flex ms-auto ">
                                    <Button
                                      className="purpleBorder bg-transparent purpleText"
                                      onClick={togglePreview}
                                    >
                                      Cancel
                                    </Button>
                                    <Button className="purpleBackground border-0 px-4">
                                      Add
                                    </Button>
                                  </div>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          </div>
                        </div>
                        <div
                          id="bacicTab2pan-3"
                          className={`tab-pane ${
                            activeTab === 3 ? "show active" : ""
                          }`}
                        >
                          <div className="main px-3 px-xl-2">
                            <div className="container-fluid">
                              <div className="row clearfix">
                                <div className="col-lg-12 col-md-12 p-0">
                                  {showPreview ? (
                                    <>
                                      <div className=" align-items-center respoChildFooter respoChildFooter mb-4">
                                        <div className="d-flex justify-content-between pbSt align-items-center justify-content-end ms-auto respoChildFooter">
                                          <h5 className="mb-3 pb-0 purpleText my-4 ml-2">
                                            Points Information{" "}
                                          </h5>
                                          &nbsp;&nbsp;
                                          <a
                                            className="btn btn-default purpleBackground text-white bolder"
                                            onClick={togglePreview}
                                          >
                                            <i className="text-white fa fa-plus bolder"></i>{" "}
                                            {editId ? "Update" : "Add"} Points
                                          </a>
                                        </div>
                                      </div>
                                      {allPoints && allPoints.length > 0 ? (
                                        <div className="previewSection">
                                          <div className="row d-flex justify-content-between">
                                            <div className="col-lg-6 my-3">
                                              {allPoints
                                                .slice(
                                                  0,
                                                  Math.ceil(
                                                    allPoints.length / 2
                                                  )
                                                )
                                                .map((item, index) => {
                                                  return (
                                                    <>
                                                      <div className="card shadow">
                                                        <div className="body p-xl-3">
                                                          <div className="showEnd">
                                                            <a
                                                              className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                              onClick={() =>
                                                                editPoints(
                                                                  item.id
                                                                )
                                                              }
                                                            >
                                                              <i
                                                                className="fa fa-pencil purpleText"
                                                                title="Edit"
                                                              ></i>
                                                            </a>{" "}
                                                            &nbsp;
                                                            <a
                                                              className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                              onClick={(e) =>
                                                                confirmClick(
                                                                  item.id,
                                                                  "Points"
                                                                )
                                                              }
                                                            >
                                                              <i
                                                                className="fa fa-trash"
                                                                style={{
                                                                  color: "red",
                                                                }}
                                                                title="Delete"
                                                              ></i>
                                                            </a>
                                                          </div>
                                                          <div className="clearfix">
                                                            <div className="d-flex justify-content-between align-items-baseline mx-2 respoChildFooter ">
                                                              <div className="">
                                                                <div className="my-4 mt-0 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-flag purpleText" />
                                                                  Country:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.country
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-dollar purpleText" />
                                                                  Send Amount:{" "}
                                                                  <div className="ps-2">
                                                                    {" "}
                                                                    {
                                                                      item.sentAmount
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 mb-0 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-calendar purpleText" />
                                                                  Duration:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.durationDays
                                                                    }{" "}
                                                                    Days
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="">
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-money-bill purpleText" />
                                                                  Currency Code:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.currencyCode
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                  Converted
                                                                  Points:{" "}
                                                                  <div className="ps-2">
                                                                    {" "}
                                                                    {
                                                                      item.convertedPoints
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 mb-0 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-dollar purpleText" />
                                                                  Per Trans
                                                                  Additional
                                                                  Point:{" "}
                                                                  <div className="ps-2">
                                                                    {" "}
                                                                    {
                                                                      item.maxTransactionAdditionalPoints
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="my-4 mx-1 d-flex rewardRespFont">
                                                              <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                              Offer Validility:{" "}
                                                              <div className="ps-2">{`${item.validFrom} To ${item.validTo}`}</div>
                                                            </div>
                                                            <div className="my-4 mx-1 d-flex rewardRespFont mt-0">
                                                              <i className="pe-2 fa fa-calendar purpleText" />
                                                              Specific Day:
                                                              <div className="ps-2">
                                                                {item.isMon ? (
                                                                  <span>
                                                                    Mon ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isTue ? (
                                                                  <span>
                                                                    Tue ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isWed ? (
                                                                  <span>
                                                                    Wed ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isThu ? (
                                                                  <span>
                                                                    Thu ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isFri ? (
                                                                  <span>
                                                                    Fri ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isSat ? (
                                                                  <span>
                                                                    Sat ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isSun ? (
                                                                  <span>
                                                                    Sun
                                                                  </span>
                                                                ) : null}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </>
                                                  );
                                                })}
                                            </div>
                                            <div className="col-lg-6 my-3">
                                              {allPoints
                                                .slice(
                                                  Math.ceil(
                                                    allPoints.length / 2
                                                  )
                                                )
                                                .map((item, index) => {
                                                  return (
                                                    <>
                                                      <div className="card shadow">
                                                        <div className="body p-xl-3">
                                                          <div className="showEnd">
                                                            <a
                                                              className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                              onClick={() =>
                                                                editPoints(
                                                                  item.id
                                                                )
                                                              }
                                                            >
                                                              <i
                                                                className="fa fa-pencil purpleText"
                                                                title="Edit"
                                                              ></i>
                                                            </a>{" "}
                                                            &nbsp;
                                                            <a
                                                              className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                              onClick={(e) =>
                                                                confirmClick(
                                                                  item.id,
                                                                  "Points"
                                                                )
                                                              }
                                                            >
                                                              <i
                                                                className="fa fa-trash"
                                                                style={{
                                                                  color: "red",
                                                                }}
                                                                title="Delete"
                                                              ></i>
                                                            </a>
                                                          </div>
                                                          <div className="clearfix">
                                                            <div className="d-flex justify-content-between align-items-baseline mx-2 respoChildFooter ">
                                                              <div className="">
                                                                <div className="my-4 mt-0 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-flag purpleText" />
                                                                  Country:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.country
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-dollar purpleText" />
                                                                  Send Amount:{" "}
                                                                  <div className="ps-2">
                                                                    {" "}
                                                                    {
                                                                      item.sentAmount
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 mb-0 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-calendar purpleText" />
                                                                  Duration:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.durationDays
                                                                    }{" "}
                                                                    Days
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="">
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-money-bill purpleText" />
                                                                  Currency Code:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.currencyCode
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                  Converted
                                                                  Points:{" "}
                                                                  <div className="ps-2">
                                                                    {" "}
                                                                    {
                                                                      item.convertedPoints
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 mb-0 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-dollar purpleText" />
                                                                  Per Trans
                                                                  Additional
                                                                  Point:{" "}
                                                                  <div className="ps-2">
                                                                    {" "}
                                                                    {
                                                                      item.maxTransactionAdditionalPoints
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="my-4 mx-1 d-flex rewardRespFont">
                                                              <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                              Offer Validility:{" "}
                                                              <div className="ps-2">{`${item.validFrom} To ${item.validTo}`}</div>
                                                            </div>
                                                            <div className="my-4 mx-1 d-flex rewardRespFont mt-0">
                                                              <i className="pe-2 fa fa-calendar purpleText" />
                                                              Specific Day:
                                                              <div className="ps-2">
                                                                {item.isMon ? (
                                                                  <span>
                                                                    Mon ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isTue ? (
                                                                  <span>
                                                                    Tue ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isWed ? (
                                                                  <span>
                                                                    Wed ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isThu ? (
                                                                  <span>
                                                                    Thu ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isFri ? (
                                                                  <span>
                                                                    Fri ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isSat ? (
                                                                  <span>
                                                                    Sat ,
                                                                  </span>
                                                                ) : null}
                                                                {item.isSun ? (
                                                                  <span>
                                                                    Sun
                                                                  </span>
                                                                ) : null}
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </>
                                                  );
                                                })}
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <p className="text-center">
                                          No Point's Data Found
                                        </p>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <h5 className="mb-3 pb-0 purpleText my-4">
                                        {editId ? "Update" : "Add"} Points{" "}
                                      </h5>
                                      <div className="pointsAddTable border p-3">
                                        <div className="w-auto d-flex">
                                          <div
                                            className="alert alert-warning w-auto px-3"
                                            role="alert"
                                          >
                                            This Calculation based on only AUD
                                            Currency.
                                          </div>
                                        </div>
                                        <Form>
                                          <Row className="my-4">
                                            <div className="col-lg-6 ">
                                              <Form.Group
                                                as={Col}
                                                controlId="formGridState"
                                              >
                                                <Form.Label>
                                                  Select Sender Country
                                                </Form.Label>
                                                <Select
                                                  menuIsOpen={menuOpen}
                                                  name="senderCountryId"
                                                  options={countryGet}
                                                  className="basic-multi-select"
                                                  classNamePrefix="select"
                                                  closeMenuOnSelect={true}
                                                  onMenuOpen={onMenuOpen}
                                                  onChange={handleSelectChange1}
                                                  value={selectedCountries2}
                                                  isDisabled={editId}
                                                />
                                                {errors.selectedCountries2 &&
                                                  selectedCountries2?.length ==
                                                    0 && (
                                                    <small className="text-danger error_message ms-2">
                                                      Please select a Sender
                                                      Country.
                                                    </small>
                                                  )}
                                              </Form.Group>
                                            </div>
                                            <div className="col-lg-6">
                                              <div className="w-100">
                                                <Form.Label>
                                                  Currency code
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  disabled
                                                  placeholder={currency1}
                                                />
                                              </div>
                                            </div>
                                          </Row>
                                          <Row className="my-4">
                                            <div className="col-lg-6">
                                              <div className="w-100 ml-2">
                                                <Form.Label>
                                                  Send Amount
                                                </Form.Label>
                                                <Form.Control
                                                  type="number"
                                                  placeholder="Amount"
                                                  inputMode="numeric"
                                                  pattern="[0-9]*"
                                                  value={amount1}
                                                  onChange={(e) =>
                                                    setAmount1(e.target.value)
                                                  }
                                                />
                                                {errors.amount1 && !amount1 && (
                                                  <small className="text-danger error_message ms-2">
                                                    Please enter Send Amount
                                                  </small>
                                                )}
                                              </div>
                                            </div>
                                            <div className="col-lg-6">
                                              <div className="w-100">
                                                <Form.Label>
                                                  Converted Points
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  placeholder="Converted Points"
                                                  inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                  pattern="[0-9]*" // This will enforce numeric-only input
                                                  value={convertedPoints}
                                                  onChange={(e) => {
                                                    const numericValue =
                                                      e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                      );
                                                    setConvertedPoints(
                                                      numericValue
                                                    );
                                                  }}
                                                />
                                                {errors.convertedPoints &&
                                                  !convertedPoints && (
                                                    <small className="text-danger error_message ms-2">
                                                      Please enter Converted
                                                      Points
                                                    </small>
                                                  )}
                                              </div>
                                            </div>
                                          </Row>
                                          <Row className="my-4">
                                            <div className="col-lg-6">
                                              <div className="w-100 ">
                                                <Form.Label>
                                                  Duration
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  placeholder="Duration in Days"
                                                  inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                  pattern="[0-9]*" // This will enforce numeric-only input
                                                  value={pointDuration}
                                                  onChange={
                                                    handleDurationChange1
                                                  }
                                                  min="1" // Set a minimum value (optional)
                                                  max="365"
                                                />
                                                {errors.pointDuration &&
                                                  !pointDuration && (
                                                    <small className="text-danger error_message ms-2">
                                                      {errors.pointDuration}
                                                    </small>
                                                  )}
                                              </div>
                                            </div>
                                            <div className="col-lg-6">
                                              <div className="w-100">
                                                <Form.Label>
                                                  Per Transaction Additional
                                                  Point
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  placeholder="Per Transaction Additional Point"
                                                  inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                  pattern="[0-9]*" // This will enforce numeric-only input
                                                  value={perTransactionAddPoint}
                                                  onChange={(e) => {
                                                    const numericValue =
                                                      e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                      );
                                                    setPerTransactionAddPoint(
                                                      numericValue
                                                    );
                                                  }}
                                                />
                                                {errors.perTransactionAddPoint &&
                                                  !perTransactionAddPoint && (
                                                    <small className="text-danger error_message ms-2">
                                                      Please enter Per
                                                      Transaction Additional
                                                      Point
                                                    </small>
                                                  )}
                                              </div>
                                            </div>
                                          </Row>
                                          <Row className="my-4">
                                            <div className="col-lg-6">
                                              <div className="w-100">
                                                <div className="d-flex flex-column">
                                                  <Form.Label>
                                                    Offer Validility
                                                  </Form.Label>

                                                  <div className="mt-4 d-flex justify-content-center">
                                                    <DateRange
                                                      ranges={selectionRange}
                                                      onChange={handleSelect}
                                                      className="selected-range" // Apply the custom CSS class for border
                                                      rangeColors={["#aa2ae1"]} // Set the color of the selected range
                                                    />
                                                  </div>
                                                </div>
                                                {error &&
                                                  !selectionRange[0]
                                                    .startDate &&
                                                  !selectionRange[0]
                                                    .endDate && (
                                                    <small className="text-danger error_message ms-2">
                                                      Please Select Valid Offer
                                                      Validity
                                                    </small>
                                                  )}
                                                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                  <DemoContainer components={['DateRangePicker']}>
                                                    <DateRangePicker localeText={{ start: 'From', end: 'To' }} onChange={(newDateRange) => handleDateChange2(newDateRange)} />
                                                  </DemoContainer>
                                                </LocalizationProvider> */}
                                              </div>
                                            </div>
                                            <div className="col-lg-6">
                                              <div className="w-100">
                                                <Form.Label>
                                                  Specific Day
                                                </Form.Label>
                                                <div>
                                                  {dayNames &&
                                                    dayNames.length === 7 &&
                                                    dayNames?.map(
                                                      (day, index) => (
                                                        <div
                                                          key={index}
                                                          className="form-check"
                                                        >
                                                          <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id={`checkbox-${index}`}
                                                            checked={
                                                              daysOfWeek[index]
                                                            }
                                                            onChange={() =>
                                                              handleCheckboxChange(
                                                                index
                                                              )
                                                            }
                                                          />
                                                          <label
                                                            className="form-check-label ml-4"
                                                            htmlFor={`checkbox-${index}`}
                                                          >
                                                            {day}
                                                          </label>
                                                        </div>
                                                      )
                                                    )}
                                                </div>
                                              </div>
                                            </div>
                                          </Row>
                                        </Form>

                                        <div className="row d-flex justify-content-end mt-3 ">
                                          <div className="col-lg-1">
                                            <Button
                                              className="m-0 mt-3 purpleBackground text-white"
                                              variant="contained"
                                              onClick={savePoints}
                                            >
                                              {editId ? "Update" : "Add"}
                                            </Button>
                                          </div>
                                          <div className="col-lg-1">
                                            <Button
                                              className="m-0 mt-3 text-black border"
                                              onClick={togglePreview}
                                              variant="outlined"
                                            >
                                              Close
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* The Modal component */}
                            <Modal
                              show={showModal}
                              onHide={handleCloseModal}
                              centered
                            >
                              <Modal.Header closeButton className="">
                                <Modal.Title>Send notification</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form>
                                  <div className="col-lg-12 px-0">
                                    <div className="font-weight-normal m-2 labelCard">
                                      Select notification
                                    </div>
                                    <Dropdown>
                                      <Dropdown.Toggle
                                        style={{
                                          color: "#6b757d",
                                          fontSize: "1rem",
                                        }}
                                        className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border col-lg-12 d-flex align-items-center justify-content-between"
                                        variant="secondary"
                                      >
                                        Select notification
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu className="col-lg-12">
                                        <Dropdown.Item>
                                          Account Created
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                          Account Closed
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </div>

                                  <Form.Group
                                    controlId="notes"
                                    className="mt-3"
                                  >
                                    <Form.Label>Note</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                  </Form.Group>
                                </Form>
                              </Modal.Body>
                              <Modal.Footer className="">
                                <div className="d-flex ms-auto ">
                                  <Button
                                    className="purpleBorder bg-transparent purpleText"
                                    onClick={togglePreview}
                                  >
                                    Cancel
                                  </Button>
                                  <Button className="purpleBackground border-0 px-4">
                                    Add
                                  </Button>
                                </div>
                              </Modal.Footer>
                            </Modal>
                          </div>
                        </div>
                        <div
                          id="bacicTab2pan-1"
                          className={`tab-pane ${
                            activeTab === 4 ? "show active" : ""
                          }`}
                        >
                          <div className="main px-3 px-xl-2">
                            <div>
                              <div className="container-fluid">
                                <div className="row clearfix">
                                  <div className="col-lg-12 col-md-12 p-0">
                                    {showCashBalance ? (
                                      <>
                                        <div className="  align-items-center respoChildFooter mb-2">
                                          <div className="d-flex pbSt align-items-center respoChildFooter justify-content-between ">
                                            <h5 className="mb-3 pb-0 purpleText my-4">
                                              Cash Balance Configuration{" "}
                                            </h5>
                                            &nbsp;&nbsp;
                                            <a
                                              className="btn btn-default purpleBackground text-white bolder"
                                              onClick={() =>
                                                toggleCashBalance()
                                              }
                                            >
                                              <i className="text-white fa fa-plus bolder"></i>{" "}
                                              {editId ? "Update" : "Add"} Cash
                                              Balance
                                            </a>
                                          </div>
                                        </div>

                                        {allCashBalance &&
                                        allCashBalance.length > 0 ? (
                                          <div className="row clearfix">
                                            <div className="col-lg-6 col-md-6 col-md-12">
                                              {allCashBalance
                                                .slice(
                                                  0,
                                                  Math.ceil(
                                                    allCashBalance.length / 2
                                                  )
                                                )
                                                .map((item, index) => {
                                                  return (
                                                    <div className="card shadow">
                                                      <div className="body p-xl-3">
                                                        <div className="showEnd">
                                                          <a
                                                            className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                            onClick={() =>
                                                              editCashBalance(
                                                                item.id
                                                              )
                                                            }
                                                          >
                                                            <i
                                                              className="fa fa-pencil purpleText"
                                                              title="Edit"
                                                            ></i>
                                                          </a>{" "}
                                                          &nbsp;
                                                          <a
                                                            className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                            onClick={(e) =>
                                                              confirmClick(
                                                                item.id,
                                                                "Cash Balance"
                                                              )
                                                            }
                                                          >
                                                            <i
                                                              className="fa fa-trash"
                                                              style={{
                                                                color: "red",
                                                              }}
                                                              title="Delete"
                                                            ></i>
                                                          </a>
                                                        </div>
                                                        <div className="clearfix">
                                                          <>
                                                            <div
                                                              key={index}
                                                              className="d-flex justify-content-between align-items-baseline  respoChildFooter"
                                                            >
                                                              <div className="">
                                                                <div className="my-4 mt-0 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-flag purpleText" />
                                                                  Country:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.country
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-calendar purpleText" />
                                                                  Min Reedem
                                                                  Points:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.redeemPoints
                                                                    }
                                                                  </div>
                                                                </div>

                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  {/* <ScoreboardIcon className="pe-2 fs-3 purpleText" /> */}
                                                                  <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                  Reedem per
                                                                  trans:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.cashBalRedeemPerTransaction
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="">
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-money-bill purpleText" />
                                                                  Currency Code:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.currencyCode
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 mt-3 d-flex rewardRespFont">
                                                                  {/* <ScoreboardIcon className="pe-2 fs-3 purpleText" /> */}
                                                                  <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                  Converted
                                                                  Amount:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.covertedAmt
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont mt-3">
                                                                  <i className="pe-2 fa fa-money-bill purpleText" />
                                                                  Sending Min.
                                                                  Amount:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.sendingMinAmt
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-md-12">
                                              {allCashBalance
                                                .slice(
                                                  Math.ceil(
                                                    allCashBalance.length / 2
                                                  )
                                                )
                                                .map((item, index) => {
                                                  return (
                                                    <div className="card shadow">
                                                      <div className="body p-xl-3">
                                                        <div className="showEnd">
                                                          <a
                                                            className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                            onClick={() =>
                                                              editCashBalance(
                                                                item.id
                                                              )
                                                            }
                                                          >
                                                            <i
                                                              className="fa fa-pencil purpleText"
                                                              title="Edit"
                                                            ></i>
                                                          </a>{" "}
                                                          &nbsp;
                                                          <a
                                                            className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                            onClick={(e) =>
                                                              confirmClick(
                                                                item.id,
                                                                "Cash Balance"
                                                              )
                                                            }
                                                          >
                                                            <i
                                                              className="fa fa-trash"
                                                              style={{
                                                                color: "red",
                                                              }}
                                                              title="Delete"
                                                            ></i>
                                                          </a>
                                                        </div>
                                                        <div className="clearfix">
                                                          <>
                                                            <div
                                                              key={index}
                                                              className="d-flex justify-content-between align-items-baseline respoChildFooter "
                                                            >
                                                              <div className="">
                                                                <div className="my-4 mt-0 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-flag purpleText" />
                                                                  Country:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.country
                                                                    }
                                                                  </div>
                                                                </div>
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-calendar purpleText" />
                                                                  Min Reedem
                                                                  Points:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.redeemPoints
                                                                    }
                                                                  </div>
                                                                </div>

                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                  Reedem per
                                                                  trans:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.cashBalRedeemPerTransaction
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="">
                                                                <div className="my-4 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-money-bill purpleText" />
                                                                  Currency Code:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.currencyCode
                                                                    }
                                                                  </div>
                                                                </div>

                                                                <div className="my-4 mt-3 d-flex rewardRespFont">
                                                                  <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                  Converted
                                                                  Amount:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.covertedAmt
                                                                    }
                                                                  </div>
                                                                </div>

                                                                <div className="my-4 d-flex rewardRespFont mt-3">
                                                                  <i className="pe-2 fa fa-money-bill purpleText" />
                                                                  Sending Min.
                                                                  Amount:{" "}
                                                                  <div className="ps-2">
                                                                    {
                                                                      item.sendingMinAmt
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                            </div>
                                          </div>
                                        ) : (
                                          <p className="text-center">
                                            No Cash Balance's Data Found
                                          </p>
                                        )}
                                      </>
                                    ) : (
                                      <div className="pointsAddTable p-3 pt-0 px-0">
                                        <h5 className="mb-3 pb-0 purpleText my-4">
                                          {editId ? "Update" : "Add"} Cash
                                          Balance{" "}
                                        </h5>
                                        <Form>
                                          <Row className="my-4">
                                            <div className="col-lg-6">
                                              <Form.Group
                                                as={Col}
                                                controlId="formGridState"
                                              >
                                                <Form.Label>
                                                  Select Sender Country
                                                </Form.Label>
                                                <Select
                                                  menuIsOpen={menuOpen}
                                                  name="senderCountryId"
                                                  options={countryGet}
                                                  className="basic-multi-select"
                                                  classNamePrefix="select"
                                                  closeMenuOnSelect={true}
                                                  onMenuOpen={onMenuOpen}
                                                  onChange={handleSelectChange2}
                                                  value={selectedCountries3}
                                                  isDisabled={editId}
                                                />
                                                {error &&
                                                  !selectedCountries1?.length >
                                                    0 && (
                                                    <small className="text-danger error_message ms-2">
                                                      Please select a Sender
                                                      Country.
                                                    </small>
                                                  )}
                                              </Form.Group>
                                            </div>
                                            <div className="col-lg-6">
                                              <div className="w-100">
                                                <Form.Label>
                                                  Currency code
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  disabled
                                                  placeholder={currency2}
                                                />
                                              </div>
                                            </div>
                                          </Row>
                                          <Row className="my-4">
                                            <div className="col-lg-6">
                                              <div className="ml-2">
                                                <Form.Label>
                                                  Minimum Reedem Points
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  placeholder="Minimum Reedem Points"
                                                  inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                  pattern="[0-9]*" // This will enforce numeric-only input
                                                  value={redeemPoints}
                                                  onChange={(e) => {
                                                    const numericValue =
                                                      e.target.value.replace(
                                                        /[^0-9.]/g,
                                                        ""
                                                      );
                                                    setRedeemPoints(
                                                      numericValue
                                                    );
                                                  }}
                                                />
                                                {error && !redeemPoints && (
                                                  <small className="text-danger error_message ms-2">
                                                    Please enter Reedem Points
                                                  </small>
                                                )}
                                              </div>
                                            </div>
                                            <div className="col-lg-6">
                                              <div className="">
                                                <Form.Label>
                                                  Converted Amount (Cash
                                                  Balance)
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  placeholder="Amount"
                                                  inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                  pattern="[0-9]*" // This will enforce numeric-only input
                                                  value={convertedAmount}
                                                  onChange={(e) => {
                                                    const numericValue =
                                                      e.target.value.replace(
                                                        /[^0-9.]/g,
                                                        ""
                                                      );
                                                    setConvertedAmount(
                                                      numericValue
                                                    );
                                                  }}
                                                />
                                                {error && !convertedAmount && (
                                                  <small className="text-danger error_message ms-2">
                                                    Please enter Converted
                                                    Amount
                                                  </small>
                                                )}
                                              </div>
                                            </div>
                                          </Row>
                                          <Row className="my-4">
                                            <div className="col-lg-6">
                                              <div className="ml-2">
                                                <Form.Label>
                                                  How much Cash Balance reedem
                                                  per transaction?
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  placeholder="How much Cash Balance reedem per transaction?"
                                                  inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                  pattern="[0-9]*" // This will enforce numeric-only input
                                                  value={redeemPerTransaction}
                                                  onChange={(e) => {
                                                    const numericValue =
                                                      e.target.value.replace(
                                                        /[^0-9.]/g,
                                                        ""
                                                      );
                                                    setRedeemPerTransaction(
                                                      numericValue
                                                    );
                                                  }}
                                                />
                                                {error &&
                                                  !redeemPerTransaction && (
                                                    <small className="text-danger error_message ms-2">
                                                      Please enter How much Cash
                                                      Balance reedem per
                                                      transaction?
                                                    </small>
                                                  )}
                                              </div>
                                            </div>
                                            <div className="col-lg-6">
                                              <Form.Label>
                                                Sending Minimum Amount
                                              </Form.Label>
                                              <Form.Control
                                                type="text"
                                                placeholder="Sending Minimum Amount"
                                                inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                pattern="[0-9]*" // This will enforce numeric-only input
                                                value={sendMinAmount}
                                                onChange={(e) => {
                                                  const numericValue =
                                                    e.target.value.replace(
                                                      /[^0-9.]/g,
                                                      ""
                                                    );
                                                  setSendMinAmount(
                                                    numericValue
                                                  );
                                                }}
                                              />
                                              {error && !sendMinAmount && (
                                                <small className="text-danger error_message ms-2">
                                                  Please enter Sending Minimum
                                                  Amount
                                                </small>
                                              )}
                                            </div>
                                          </Row>
                                          <Row className="my-4">
                                            <div className="col-lg-6">
                                              <div className="ml-2">
                                                <Form.Label>
                                                  How much points redeem at a
                                                  time?
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  placeholder="How much points redeem at a time?"
                                                  inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                  pattern="[0-9]*" // This will enforce numeric-only input
                                                  value={maxRedimPoint}
                                                  onChange={(e) => {
                                                    const numericValue =
                                                      e.target.value.replace(
                                                        /[^0-9.]/g,
                                                        ""
                                                      );
                                                    setmaxRedimPoint(
                                                      numericValue
                                                    );
                                                  }}
                                                />
                                                {error && !maxRedimPoint && (
                                                  <small className="text-danger error_message ms-2">
                                                    Please enter How much points
                                                    redeem at a time?
                                                  </small>
                                                )}
                                              </div>
                                            </div>
                                          </Row>
                                        </Form>
                                        <div className="row d-flex justify-content-end mt-3 ">
                                          <div className="col-lg-1">
                                            <Button
                                              className="m-0 mt-3 purpleBackground text-white"
                                              variant="contained"
                                              onClick={() => saveCashBalance()}
                                            >
                                              {editId ? "Update" : "Add"}
                                            </Button>
                                          </div>
                                          <div className="col-lg-1">
                                            <Button
                                              className="m-0 mt-3 text-black border"
                                              onClick={() =>
                                                toggleCashBalance()
                                              }
                                              variant="outlined"
                                            >
                                              Close
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* The Modal component */}
                              <Modal
                                show={showModal}
                                onHide={handleCloseModal}
                                centered
                              >
                                <Modal.Header closeButton className="">
                                  <Modal.Title>Send notification</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <Form>
                                    <div className="col-lg-12 px-0">
                                      <div className="font-weight-normal m-2 labelCard">
                                        Select notification
                                      </div>
                                      <Dropdown>
                                        <Dropdown.Toggle
                                          style={{
                                            color: "#6b757d",
                                            fontSize: "1rem",
                                          }}
                                          className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border col-lg-12 d-flex align-items-center justify-content-between"
                                          variant="secondary"
                                        >
                                          Select notification
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="col-lg-12">
                                          <Dropdown.Item>
                                            Account Created
                                          </Dropdown.Item>
                                          <Dropdown.Item>
                                            Account Closed
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>

                                    <Form.Group
                                      controlId="notes"
                                      className="mt-3"
                                    >
                                      <Form.Label>Note</Form.Label>
                                      <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                  </Form>
                                </Modal.Body>
                                <Modal.Footer className="">
                                  <div className="d-flex ms-auto ">
                                    <Button
                                      className="purpleBorder bg-transparent purpleText"
                                      onClick={togglePreview}
                                    >
                                      Cancel
                                    </Button>
                                    <Button className="purpleBackground border-0 px-4">
                                      Add
                                    </Button>
                                  </div>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          </div>
                        </div>
                        <div
                          id="bacicTab2pan-1"
                          className={`tab-pane ${
                            activeTab === 5 ? "show active" : ""
                          }`}
                        >
                          <div className="main px-3 px-xl-2">
                            <div>
                              <div className="container-fluid">
                                <div className="row clearfix">
                                  <div className="col-lg-12 col-md-12 p-0">
                                    {preminumExchnageRate ? (
                                      <>
                                        <div className="  align-items-center respoChildFooter mb-2">
                                          <div className="d-flex pbSt align-items-center respoChildFooter justify-content-between ">
                                            <h5 className="mb-3 pb-0 purpleText my-4 ml-2">
                                              Premium Exchange Rate{" "}
                                            </h5>
                                            &nbsp;&nbsp;
                                            <a
                                              className="btn btn-default purpleBackground text-white bolder"
                                              onClick={() =>
                                                togglePreminumExchangeRate()
                                              }
                                            >
                                              <i className="text-white fa fa-plus bolder"></i>{" "}
                                              {editId ? "Update" : "Add"}{" "}
                                              Premium Exchange Rate
                                            </a>
                                          </div>
                                        </div>

                                        {PremiumExchangeRate &&
                                        PremiumExchangeRate.length > 0 ? (
                                          <div className="row clearfix">
                                            <div className="col-lg-6 col-md-6 col-md-12">
                                              {PremiumExchangeRate.slice(
                                                0,
                                                Math.ceil(
                                                  PremiumExchangeRate.length / 2
                                                )
                                              ).map((item, index) => {
                                                return (
                                                  <div className="card shadow">
                                                    <div className="body p-xl-3">
                                                      <div className="showEnd">
                                                        <a
                                                          className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                          onClick={() =>
                                                            editPremiumExchange(
                                                              item.id
                                                            )
                                                          }
                                                        >
                                                          <i
                                                            className="fa fa-pencil purpleText"
                                                            title="Edit"
                                                          ></i>
                                                        </a>{" "}
                                                        &nbsp;
                                                        <a
                                                          className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                          onClick={(e) =>
                                                            confirmClick(
                                                              item.id,
                                                              "Premium Exchange Rate"
                                                            )
                                                          }
                                                        >
                                                          <i
                                                            className="fa fa-trash"
                                                            style={{
                                                              color: "red",
                                                            }}
                                                            title="Delete"
                                                          ></i>
                                                        </a>
                                                      </div>
                                                      <div className="clearfix">
                                                        <>
                                                          <div
                                                            key={index}
                                                            className="d-flex justify-content-between align-items-baseline  respoChildFooter"
                                                          >
                                                            <div className="">
                                                              <div className="my-4 mt-0 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-flag purpleText" />
                                                                Country:{" "}
                                                                <div className="ps-2">
                                                                  {item.country}
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-calendar purpleText" />
                                                                Premium Exchange
                                                                Rate:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.premiumAmount
                                                                  }
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="">
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Currency Code:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.countryCode
                                                                  }
                                                                </div>
                                                              </div>
                                                              <div className="my-4 mt-3 d-flex rewardRespFont">
                                                                {/* <ScoreboardIcon className="pe-2 fs-3 purpleText" /> */}
                                                                <i className="pe-2 fa fa-hand-holding-heart purpleText" />
                                                                Max Amount for
                                                                Premium:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.maxAmtForPremium
                                                                  }
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-md-12">
                                              {PremiumExchangeRate.slice(
                                                Math.ceil(
                                                  PremiumExchangeRate.length / 2
                                                )
                                              ).map((item, index) => {
                                                return (
                                                  <div className="card shadow">
                                                    <div className="body p-xl-3">
                                                      <div className="showEnd">
                                                        <a
                                                          className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                          onClick={() =>
                                                            editPremiumExchange(
                                                              item.id
                                                            )
                                                          }
                                                        >
                                                          <i
                                                            className="fa fa-pencil purpleText"
                                                            title="Edit"
                                                          ></i>
                                                        </a>{" "}
                                                        &nbsp;
                                                        <a
                                                          className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                                          onClick={(e) =>
                                                            confirmClick(
                                                              item.id,
                                                              "Premium Exchange Rate"
                                                            )
                                                          }
                                                        >
                                                          <i
                                                            className="fa fa-trash"
                                                            style={{
                                                              color: "red",
                                                            }}
                                                            title="Delete"
                                                          ></i>
                                                        </a>
                                                      </div>
                                                      <div className="clearfix">
                                                        <>
                                                          <div
                                                            key={index}
                                                            className="d-flex justify-content-between align-items-baseline respoChildFooter "
                                                          >
                                                            <div className="">
                                                              <div className="my-4 mt-0 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-flag purpleText" />
                                                                Country:{" "}
                                                                <div className="ps-2">
                                                                  {item.country}
                                                                </div>
                                                              </div>
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-calendar purpleText" />
                                                                Premium Exchange
                                                                Rate:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.premiumAmount
                                                                  }
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <div className="">
                                                              <div className="my-4 d-flex rewardRespFont">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Currency Code:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.countryCode
                                                                  }
                                                                </div>
                                                              </div>

                                                              <div className="my-4 d-flex rewardRespFont mt-3">
                                                                <i className="pe-2 fa fa-money-bill purpleText" />
                                                                Max Amount for
                                                                Premium:{" "}
                                                                <div className="ps-2">
                                                                  {
                                                                    item.maxAmtForPremium
                                                                  }
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        ) : (
                                          <p className="text-center">
                                            No Premium Exchange Rate's Data
                                            Found
                                          </p>
                                        )}
                                      </>
                                    ) : (
                                      <div className="pointsAddTable p-3 pt-0 px-0">
                                        <h5 className="mb-3 pb-0 purpleText my-4">
                                          {editId ? "Update" : "Add"} Premium
                                          Exchange Rate{" "}
                                        </h5>
                                        <Form>
                                          <Row className="my-4">
                                            <div className="col-lg-6">
                                              <Form.Group
                                                as={Col}
                                                controlId="formGridState"
                                              >
                                                <Form.Label>
                                                  Select Receiving Country
                                                </Form.Label>
                                                <Select
                                                  menuIsOpen={menuOpen}
                                                  name="senderCountryId"
                                                  options={countryGet}
                                                  className="basic-multi-select"
                                                  classNamePrefix="select"
                                                  closeMenuOnSelect={true}
                                                  onMenuOpen={onMenuOpen}
                                                  onChange={handleSelectChange3}
                                                  value={selectedCountries4}
                                                  isDisabled={editId}
                                                />
                                                {error &&
                                                  !selectedCountries4?.length >
                                                    0 && (
                                                    <small className="text-danger error_message ms-2">
                                                      Please select a Receiving
                                                      Country.
                                                    </small>
                                                  )}
                                              </Form.Group>
                                            </div>
                                            <div className="col-lg-6">
                                              <div className="w-100">
                                                <Form.Label>
                                                  Currency code
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  disabled
                                                  placeholder={currency3}
                                                />
                                              </div>
                                            </div>
                                          </Row>
                                          <Row className="my-4">
                                            <div className="col-lg-6">
                                              <div className="ml-2">
                                                <Form.Label>
                                                  Premium Exchange Rate
                                                </Form.Label>
                                                <Form.Control
                                                  type="text"
                                                  placeholder="Premium Exchange Rate"
                                                  inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                  pattern="[0-9]*" // This will enforce numeric-only input
                                                  value={preminumamt}
                                                  onChange={(e) => {
                                                    const numericValue =
                                                      e.target.value.replace(
                                                        /[^0-9.]/g,
                                                        ""
                                                      );
                                                    setpreminumamt(
                                                      numericValue
                                                    );
                                                  }}
                                                />
                                                {error && !redeemPoints && (
                                                  <small className="text-danger error_message ms-2">
                                                    Please enter Premium
                                                    Exchange Rate
                                                  </small>
                                                )}
                                              </div>
                                            </div>

                                            <div className="col-lg-6">
                                              <Form.Label>
                                                Max Amount for Premium
                                              </Form.Label>
                                              <Form.Control
                                                type="text"
                                                placeholder="Amount"
                                                inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                                pattern="[0-9]*" // This will enforce numeric-only input
                                                value={maxPreAmt}
                                                onChange={(e) => {
                                                  const numericValue =
                                                    e.target.value.replace(
                                                      /[^0-9.]/g,
                                                      ""
                                                    );
                                                  setmaxPreAmt(numericValue);
                                                }}
                                              />
                                              {error && !amount2 && (
                                                <small className="text-danger error_message ms-2">
                                                  Please enter Max Amount for
                                                  Premium
                                                </small>
                                              )}
                                            </div>
                                          </Row>
                                        </Form>
                                        <div className="row d-flex justify-content-end mt-3 ">
                                          <div className="col-lg-1">
                                            <Button
                                              className="m-0 mt-3 purpleBackground text-white"
                                              variant="contained"
                                              onClick={() =>
                                                savePremiumExchange()
                                              }
                                            >
                                              {editId ? "Update" : "Add"}
                                            </Button>
                                          </div>
                                          <div className="col-lg-1">
                                            <Button
                                              className="m-0 mt-3 text-black border"
                                              onClick={() =>
                                                togglePreminumExchangeRate()
                                              }
                                              variant="outlined"
                                            >
                                              Close
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {/* The Modal component */}
                              <Modal
                                show={showModal}
                                onHide={handleCloseModal}
                                centered
                              >
                                <Modal.Header closeButton className="">
                                  <Modal.Title>Send notification</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <Form>
                                    <div className="col-lg-12 px-0">
                                      <div className="font-weight-normal m-2 labelCard">
                                        Select notification
                                      </div>
                                      <Dropdown>
                                        <Dropdown.Toggle
                                          style={{
                                            color: "#6b757d",
                                            fontSize: "1rem",
                                          }}
                                          className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border col-lg-12 d-flex align-items-center justify-content-between"
                                          variant="secondary"
                                        >
                                          Select notification
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="col-lg-12">
                                          <Dropdown.Item>
                                            Account Created
                                          </Dropdown.Item>
                                          <Dropdown.Item>
                                            Account Closed
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>

                                    <Form.Group
                                      controlId="notes"
                                      className="mt-3"
                                    >
                                      <Form.Label>Note</Form.Label>
                                      <Form.Control as="textarea" rows={3} />
                                    </Form.Group>
                                  </Form>
                                </Modal.Body>
                                <Modal.Footer className="">
                                  <div className="d-flex ms-auto ">
                                    <Button
                                      className="purpleBorder bg-transparent purpleText"
                                      onClick={togglePreview}
                                    >
                                      Cancel
                                    </Button>
                                    <Button className="purpleBackground border-0 px-4">
                                      Add
                                    </Button>
                                  </div>
                                </Modal.Footer>
                              </Modal>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rewards;
