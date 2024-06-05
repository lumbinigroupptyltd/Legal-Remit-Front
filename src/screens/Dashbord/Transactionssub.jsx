import React, { useEffect, useRef, useState } from "react";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import PageHeader from "../../components/PageHeader";
import Loader from "../Loader/Loader";
import {
  Box,
  Modal,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Menu,
  Tooltip,
  FormGroup,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Collapse,
  Grid
} from "@mui/material";
import { Dropdown, Form, Table, Alert } from "react-bootstrap";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import LockIcon from "@mui/icons-material/Lock";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import VerifiedIcon from "@mui/icons-material/Verified";
import html2pdf from "html2pdf.js";
import logo2 from "../../assets/images/logo2.png";
import AcceptIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import RejectIcon from "@mui/icons-material/ThumbDownAltOutlined";
import { saveAs } from "file-saver";
import ModalComponent from "./ModalComponent";
import ModalComponentPopup from "./ModalComponentPopup";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
// import { styled } from '@mui/material/styles';


// const StyledMenu = styled((props) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "right",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "right",
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiPaper-root": {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color:
//       theme.palette.mode === "light"
//         ? "rgb(55, 65, 81)"
//         : theme.palette.grey[300],
//     boxShadow:
//       "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 5px 7px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//     "& .MuiMenu-list": {
//       padding: "4px 0",
//     },
//     "& .MuiMenuItem-root": {
//       "& .MuiSvgIcon-root": {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       "&:active": {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity
//         ),
//       },
//     },
//   },
// }));


const Transactionsub = ({ individualuserData }) => {
  const [deliveryMethod, setDeliveryMethod] = useState("--");
  const [paymentMethod, setPaymentMethod] = useState("--");
  const [country, setCountry] = useState("--");
  const navigate = useNavigate();
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [openLockModal, setOpenLockeModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [openNotifyModal, setOpenNotifyModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [allTarnsation, setAllTransaction] = useState([]);
  const [page, setPage] = useState(1);
  const [numItems, SetNumItems] = useState(0);
  const [RowsPerPage, setRowsPerPage] = useState(50);
  const [CountPage, SetCountPage] = useState(0);
  const [recipients, setRecipients] = useState([]);
  const [Search, SetSearch] = useState("");
  const [totalAmount, settotalAmount] = useState(0);
  const [totalServiceCharge, setTotalServiceCharge] = useState(0);
  const [flag, setFlag] = useState("AUD");
  const [deliveryMethodCount, setDeliveryMethodCount] = useState({});
  const [userId, setUserId] = useState();
  const [DeleteResone, setDeleteResone] = useState("");
  const [userName, setUserName] = useState("");
  const [transactionId, setTansactionId] = useState();
  const [cancleResone, setCancelResone] = useState();
  const [CancelType, setCancelType] = useState();
  const [lockReson, setLockReson] = useState();
  const [usersNote, setUsersNote] = useState([]);
  const [noteType, setNoteType] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [anchorEl4, setAnchorEl4] = useState(null);
  const open3 = Boolean(anchorEl3);
  const open4 = Boolean(anchorEl4);
  const [anchorEl5, setAnchorEl5] = useState(null);
  const open5 = Boolean(anchorEl5);
  const [anchorEl6, setAnchorEl6] = useState(null);
  const open6 = Boolean(anchorEl6);
  const [anchorEl7, setAnchorEl7] = useState(null);
  const open7 = Boolean(anchorEl7);
  const [anchorEl8, setAnchorEl8] = useState(null);
  const open8 = Boolean(anchorEl8);
  const [anchorEl9, setAnchorEl9] = useState(null);
  const open9 = Boolean(anchorEl9);
  const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(true);
  const [handleConfirModel, setHandleConfirModel] = useState(false);
  const [openMarkDeliverdModel, setOpenMarkDeliverdModel] = useState(false);
  const [assignPartnerOpenModel, setAssignPartnerOpenModel] = useState(false);
  const [handleOpenSmr, setHandleOpenSmr] = useState(false);
  const [confirmReson, setConfirmReson] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [userAmonut, setUserAmount] = useState();
  const [userIdDeatils, setUserIdDeatils] = useState({});
  const [UserInfo, setUserInfo] = useState([]);
  const [SelectedBank, setSelectedBank] = useState();
  const [getAllPartnerBanks, setGetAllPartnerBanks] = useState([]);
  const [notificationTemplate, setNotificationTemplate] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [loadervalue, setloadervalue] = useState(false);
  const [isLock, setIsLock] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [DownloadPdf, setDownloadPdf] = useState(false);
  const [formattedDate, setformattedDate] = useState();
  const [TransactionDataById, setTransactionDataById] = useState({});
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const [error, setError] = useState(false);
  const [markSmrReson, setMarkSmrReson] = useState();
  const [mrkSmrType, setMarkSmrType] = useState();
  const [isPushChecked, setIsPushChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [openEditModel, setOpenEditModel] = useState(false);
  const [activeDelivryMethod, setactiveDelivryMethod] = useState([]);
  const [receiver, setReceivers] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(0);
  const [purposeOfTransacfer, setPurposeOfTransacfer] = useState([]);
  const [note, setNote] = useState();
  const [partnerBankId, setpartnerBankId] = useState(0);
  const [SelectedPurposeOfTransacferId, setSelectedPurposeOfTransacferId] =
    useState(0);
  const [paymentMethodName, setPaymentMethodName] = useState("");
  const [deliveryMethodId, setDeliveryMethodId] = useState(0);
  const [viewData, setViewData] = useState({});
  const [openView, setOpenView] = useState(false);
  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);
  const [showMessge, setShowMessage] = useState(false);
  const [isCheckedBalance, setIsBalanceChecked] = useState(false);
  const [openAssignConfirmModel, setOpenAssignConfirmModel] = useState(false);
  const [openContinueModel, setOpenContinueModel] = useState(false);
  const [partnerBankName, setpartnerBankName] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [ResolveModel, setResolveModel] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cId, setCId] = useState("");
  const [refundModel, setRefundModel] = useState(false);
  const [refundResone, setRefundRease] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [totalPayableCount, settotalPayableCount] = useState(0);
  const [totalReceivedAmount, settotalReceivedAmount] = useState(0);
  const [serviceCharge, setServiceCharge] = useState("");
  const [exchangeRate, setExchangeRate] = useState("");
  const [editStaus, setEditStatus] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [getTransactionInfo, setGetTransactionInfo] = useState({
    transactionNo: "",
    controlNo: "",
    userId: 0,
    userName: "",
    customerId: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    senderState: "",
    recipientId: 0,
    recipientName: "",
    recipientPhone: "",
    recipientCity: "",
    recipientState: null,
    recipientEmail: "",
    fullName: "[]",
    businessName: "",
    bankAccNo: "",
    bankName: "",
    walletName: "",
    relation: "Aunt",
    sendingCurrencyCode: "",
    recevingCurrencyCode: "",
    sendingCountryId: 0,
    sendingCountryName: "",
    recevingCountryId: 0,
    recevingCountryName: "",
    recevingCountryEmoji: null,
    partnerBankId: 0,
    partnerBankName: "",
    amount: 0,
    totalPayable: 0,
    discountedAmount: 0,
    receivingAmount: 0,
    exchangeRate: 0,
    serviceCharge: 0,
    deliveryMethodId: 0,
    deliveryMethodName: "",
    transactionStatusId: 0,
    transactionStatus: "",
    statusMessage: null,
    paymentRequestUuid: "",
    paytoAgreementUuid: "",
    otherDetails: "",
    status: null,
    published: false,
    publishedAt: null,
    transferPurposeId: 0,
    transferPurpose: "",
    userTrnsCount: 0,
    userTrnsAmountSum: 0.0,
    recTrnsCount: 0,
    paymentMethod: "",
    promoCode: "0",
    promoCodeServiceChargeDiscAmt: 0.0,
    promoCodeExRateDiscAmt: 0.0,
    cashBenefit: 0.0,
    pointBenefit: 0.0,
    usedCash: 0.0,
    transactionPaymentStatusId: 0,
    paymentNote: "",
    assignedUserId: 0,
    isHidden: false,
    isLock: false,
    client: null,
    cancellationResultId: false,
    deletedAt: null,
    source: "",
    ecddReason: "",
    ecddNote: "",
    ecddVerified: false,
    ecddVerifyDate: null,
    ecddVerifyBy: 0,
    accountStatus: "",
    stepNo: 0,
    isPreferedMethod: false,
    isRefundRequest: false,
    accountIdType: "",
    payId: "",
    bsb: "",
    accountno: "",
    reasonHold: "",
    transactionStatusLogs: null,
    refundReqStatus: 0,
    email: null,
    premimumExId: 0,
    premimumExRate: 0.0,
    premimumExAmt: 0,
    noOfTransaction: 0,
    createdAt: "",
    updatedAt: "",
    deleted: false,
    walletNo: "",
  });
  const [isTimeOut, setIsTimeOut] = useState(true);
  const [selectedRow, setSelectedRow] = useState(null);
  const [nameMatched, setNameMatched] = useState(false);
  const [amountMatched, setAmountMatched] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleRowselect = (row) => {
    if (row === selectedRow) {
      setSelectedRow(null); // Deselect the row if it's already selected
    } else {
      setSelectedRow(row); // Select the clicked row
    }
  };
  const handleCancelPoup = () => {
    setShowPopup(false);
    setHandleConfirModel(true);
  };
  const handleOkClick = () => {
    handleConfirmCloseModal();
    setAmountMatched(true);
    setIsConfirmed(true);
    handleCancelPoup();
  };
  const handleCloseDelete = () => {
    setModalShow(false);
    getAllTransaction();
  };
  const handleCheck = () => {
    if (amountMatched && !nameMatched) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  };
  const handleTextareaChange = (e) => {
    setConfirmReson(e.target.value);
    checkConfirmationConditions(); // Call the function to check conditions on textarea change
  };
  const checkConfirmationConditions = () => {
    const textWithoutSpaces = confirmReson
      ?.replace(/\s/g, "")
      .toLowerCase()
      .trim();
    const userNameWithoutSpaces = userName
      ?.replace(/\s/g, "")
      .toLowerCase()
      .trim();
    const minCharsRequiredForUserName = Math.ceil(
      userNameWithoutSpaces.length / 2
    );

    const userNameIncluded =
      [...userNameWithoutSpaces].filter((char) =>
        textWithoutSpaces?.includes(char)
      ).length >= minCharsRequiredForUserName;
    const userAmountIncluded = textWithoutSpaces?.includes(userAmonut);

    // Reset conditions
    setNameMatched(false);
    setAmountMatched(false);
    setIsConfirmed(false);

    // Check conditions
    if (userNameIncluded) {
      setNameMatched(true);
    }
    if (userAmountIncluded) {
      setAmountMatched(true);
    }
    // If both amount and name matched, enable confirmation
    if (userNameIncluded && userAmountIncluded) {
      setIsConfirmed(true);
    }
  };
  const handlePopupCheckboxClick = (e) => {
    setIsChecked(e.target.checked);
    setIsConfirmed(true);
  };

  const handleRefund = async (
    id,
    userId,
    userName,
    senderEmail,
    senderPhone,
    customerId,
    Tno
  ) => {
    setUserId(userId);
    setUserName(userName);
    setEmail(senderEmail);
    setPhone(senderPhone);
    setCId(customerId);
    setTansactionId(Tno);
    setRefundModel(true);
  };
  const refundMoney = () => {
    if (!refundResone) {
      setError(true);
    } else {
      const payload = {
        customerId: cId ? cId : "",
        // haveCustomerId: "",
        userId: userId == "" ? 0 : userId,
        title: "",
        fullName: cId ? "" : userName,
        email: cId ? "" : email,
        phone: cId ? "" : phone,
        haveCustomerId: cId ? true : false,
        transactionNo: transactionId ? transactionId : "",
        haveTransactionNo: transactionId ? true : false,
        reason: refundResone,
      };
      axios
        .post(
          CommonConstants.NEW_BASE_URL + "/savetransactionrefundrequest",
          payload
        )
        .then((responce) => {
          if (responce.data.status == true) {
            setRefundModel(false);
            getAllTransaction();
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const handleRejectRefund = async (id, Tid) => {
    setloadervalue(true);
    const fromData = new FormData();
    fromData.append("id", id);
    fromData.append("status", 2);
    fromData.append("transactionNo", Tid);
    const sendData = await axios.post(
      CommonConstants.NEW_BASE_URL + "/updaterequeststatus",
      fromData
    );
    if (sendData.data.status == true) {
      getAllTransaction();
    }
    setloadervalue(false);
  };

  const handleAcceptRefund = async (id, TNo) => {
    setloadervalue(true);
    const fromData = new FormData();
    fromData.append("id", id);
    fromData.append("status", 1);
    fromData.append("transactionNo", TNo);
    const sendData = await axios.post(
      CommonConstants.NEW_BASE_URL + "/updaterequeststatus",
      fromData
    );
    if (sendData.data.status == true) {
      getAllTransaction();
    }
    setloadervalue(false);
  };

  const openResolveModel = (transacionID, userID) => {
    setTansactionId(transacionID);
    setUserId(userID);
    setResolveModel(true);
  };
  const handleCloseResolveModel = () => {
    setResolveModel(false);
  };
  const resolveTransaction = async () => {
    if (!noteDescription) {
      setError(true);
    } else {
      setloadervalue(true);
      const payload = {
        transactionId: transactionId,
        userId: userId,
        noteType: "Informative",
        note: noteDescription,
      };
      const data = new FormData();
      data.append("userId", userId);
      data.append("transactionId", transactionId); //transactionId
      try {
        // Use Promise.all to wait for both API calls
        await Promise.all([
          axios.post(
            CommonConstants.NEW_BASE_URL + "/addnotetotransaction",
            payload
          ),
          axios.post(
            CommonConstants.NEW_BASE_URL + "/releasedtransaction",
            data
          ),
        ]);
        handleCloseResolveModel();
        getAllTransaction();
      } catch (error) {
        console.log(error);
      } finally {
        setloadervalue(false);
      }
    }
  };
  const closeModelContinue = () => {
    setOpenContinueModel(false);
  };
  const handleOpenEditModel = async (TransactionId) => {
    handleClose1();
    setTansactionId(TransactionId);
    try {
      const payload = {
        id: TransactionId,
      };
      const userInfo = await axios.post(
        CommonConstants.NEW_BASE_URL + "/gettransactionbyid",
        payload
      );
      if (userInfo.data.status == true) {
        setOpenEditModel(true);
        const userData = userInfo?.data.data;
        setGetTransactionInfo(userData);
        setEditStatus(userData.transactionStatus);
        setUserName(userData.userName);
        setpartnerBankId(userData.partnerBankId);
        setSelectedReceiver(userData.recipientId);
        setSelectedPurposeOfTransacferId(userData.transferPurposeId);
        setDeliveryMethodId(userData.deliveryMethodId);
        setNote(userData.paymentNote);
        setPaymentMethodName(userData.paymentMethod);
        GetActiveDeliveryMethod(userData.sendingCountryId);
        GetReceivers(userData.userId);
        setEditAmount(userData.amount);
        settotalPayableCount(userData.totalPayable);
        setServiceCharge(userData.serviceCharge);
        setExchangeRate(userData.exchangeRate);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const closeAssignConfirmModel = () => {
    setOpenAssignConfirmModel(false);
  };
  const openAssignConfirmModel1 = () => {
    handleCloseBankModel();
    setOpenAssignConfirmModel(true);
  };

  const handleYesClick = async () => {
    try {
      setloadervalue(true);
      const confirmedData = {
        id: transactionId,
        reason: confirmReson,
        isContinue: true,
      };
      const sendData = await axios.post(
        CommonConstants.NEW_BASE_URL + "/confirmtransaction",
        confirmedData
      );
      if (sendData.data.status == true) {
        closeModelContinue();
        setAnchorEl2(null);
        getAllTransaction();
        handleClose1();
      }
      setloadervalue(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNoClick = async () => {
    try {
      setloadervalue(true);
      const confirmedData = {
        id: transactionId,
        reason: confirmReson,
        isContinue: false,
      };
      const sendData = await axios.post(
        CommonConstants.NEW_BASE_URL + "/confirmtransaction",
        confirmedData
      );
      if (sendData.data.status == true) {
        closeModelContinue();
        setAnchorEl2(null);
        handleClose1();
      }
      setloadervalue(false);
    } catch (error) {
      console.log(error, "Error in confirmation");
    }
  };
  const GetActiveDeliveryMethod = async (sendingCountryId) => {
    await axios
      .post(CommonConstants.BASE_URL + "/getallactivedeliverymethods", {
        toCountryId: sendingCountryId,
      })
      .then((responce) => {
        if (responce.data.status == true) {
          setactiveDelivryMethod(responce.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const GetReceivers = async (useId) => {
    const formData = new FormData();
    formData.append("userId", useId);
    formData.append("isDeleted", true);
    await axios
      .post(
        CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
        formData
      )
      .then((responce) => {
        if (responce.data.status == true) {
          setReceivers(responce.data.data);
        }
      })
      .catch((error) => console.log(error));
  };

  function handleReceiverChange(event) {
    const selectedValue = event.target.value;
    setSelectedReceiver(selectedValue);
  }
  const handleCloseEdit = () => {
    setOpenEditModel(false);
  };

  const getallpurposeoftransfer = async () => {
    try {
      const payload = {
        pageindex: 1,
        pagesize: 50,
        searchdata: "%%",
        sortparam: "create_at",
        sortorder: "ASC",
      };
      await axios
        .post(CommonConstants.BASE_URL + "/getallpurposeoftransfer", payload)
        .then((res) => {
          setPurposeOfTransacfer(res.data.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const updateTransactin = async () => {
    // setloadervalue(true);
    const requestData = {
      id: getTransactionInfo.id,
      userId: getTransactionInfo.userId,
      recipientId: parseInt(selectedReceiver)
        ? parseInt(selectedReceiver)
        : getTransactionInfo.recipientId,
      sendingCurrencyCode: getTransactionInfo.sendingCurrencyCode,
      recevingCurrencyCode: getTransactionInfo.recevingCurrencyCode,
      sendingCountryId: getTransactionInfo.sendingCountryId,
      recevingCountryId: getTransactionInfo.recevingCountryId,
      partnerBankId: parseInt(partnerBankId)
        ? parseInt(partnerBankId)
        : getTransactionInfo.partnerBankId,
      amount: editAmount,
      totalPayable: totalPayableCount,
      receivingAmount: totalReceivedAmount
        ? totalReceivedAmount
        : getTransactionInfo.receivingAmount,
      exchangeRate: exchangeRate
        ? parseInt(exchangeRate)
        : getTransactionInfo.exchangeRate,
      serviceCharge: serviceCharge
        ? parseFloat(serviceCharge)
        : getTransactionInfo.serviceCharge,
      deliveryMethodId: parseInt(deliveryMethodId)
        ? parseInt(deliveryMethodId)
        : getTransactionInfo.deliveryMethodId,
      otherDetails: getTransactionInfo.otherDetails,
      transferPurposeId: parseInt(SelectedPurposeOfTransacferId)
        ? parseInt(SelectedPurposeOfTransacferId)
        : getTransactionInfo.transferPurposeId,
      recTrnsCount: getTransactionInfo.recTrnsCount,
      paymentMethod: paymentMethodName
        ? paymentMethodName
        : getTransactionInfo.paymentMethod,
      promoCode: getTransactionInfo.promoCode,
      promoCodeServiceChargeDiscAmt:
        getTransactionInfo.promoCodeServiceChargeDiscAmt,
      promoCodeServiceRateDiscAmt:
        getTransactionInfo.promoCodeServiceChargeDiscAmt,
      transactionStatusId: getTransactionInfo.transactionStatusId,
      paymentNote: note ? note : getTransactionInfo.paymentNote,
      email: getTransactionInfo.email,
      assignedUserId: getTransactionInfo.assignedUserId,
      stepNo: getTransactionInfo.stepNo,
      isPreferedMethod: getTransactionInfo.isPreferedMethod,
      deleteAt: "",
    };
    const sendData = await axios.post(
      CommonConstants.NEW_BASE_URL + "/savetransaction",
      requestData
    );
    if (sendData.data.status == true) {
      handleCloseEdit();
      handleClose1();
      setModalShow(true);
      getAllTransaction();
    }
  };
  const handlePushChange = (event) => {
    setIsPushChecked(event.target.checked);
  };

  const handleEmailChange = (event) => {
    setIsEmailChecked(event.target.checked);
  };

  const handleRowClick = (index) => {
    setOpenRowIndex((prevIndex) => {
      console.log("Previous openRowIndex:", prevIndex);
      return prevIndex === index ? null : index;
    });
  };
  const getPaymentMethos = (name) => {
    // Debit card: DC, Credit Card: CC, Payto : PT, PayID : PI, Bank Transfer: BT
    if (name == "Debit Card") {
      return "DC";
    } else if (name == "Credit Card") {
      return "CC";
    } else if (name == "Pay To") {
      return "PT";
    } else if (name == "Pay Id") {
      return "PI";
    } else if (name == "Bank Transfer") {
      return "BT";
    }
  };

  const statusColors = {
    Draft: "#FAEDFF",
    Confirmed: "#C4E9FF",
    Unconfirmed: "#C4FFF1",
    Processing: "#FFDDD7",
    "Compliance Hold": "#C4E9FF",
    Pending: "#FFF9D9",
    Delivered: "#FFFF",
    Cancelled: "#FDFDF2",
    Refunded: "#E5E5C3",
  };

  const steps = [
    "Transaction Initiated",
    "Received to bank",
    "Waiting for bank to process",
    "In Progress",
    "Delivered",
  ];
  function getStepIndex(transactionStatus) {
    switch (transactionStatus) {
      case "Draft":
        return 0;
      case "Confirmed":
        return 1;
      case "Processing":
        return 2;
      case "Delivered":
        return 4;
      case "Pending":
      case "Compliance Hold":
      case "Unconfirmed":
        return 2;
      case "Canceled and refund":
        return 4;
      default:
        return 0; // Default to the first step if the status is not recognized
    }
  }
  const handleCloseMarkSmr = () => {
    setHandleOpenSmr(false);
  };
  const printRef = useRef();
  const handlePrint = () => {
    const element = printRef.current;
    const opt = {
      filename: "Invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        // format: "a4",
        orientation: "portrait", // A4 size options
        format: [210, 297], // Width and height in millimeters
      },
    };

    html2pdf().from(element).set(opt).save();
  };

  const handleOpenDeleteModal = (transacionID, userName) => {
    handleClose1();
    setOpenDeleteModal(true);
    setUserId(transacionID);
    setUserName(userName);
  };
  const chekInput = (e) => {
    const inputValue = e.target.value;
    setCancelType(inputValue);

    const formatSting1 = inputValue.replace(/\s+/g, "").toLowerCase();
    const formatSting2 = userName.replace(/\s+/g, "").toLowerCase();
    if (formatSting1 === formatSting2) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };
  const handleCloseDeleteModal = async () => {
    const payloadData = {
      id: transactionId,
      reason: cancleResone,
      userId: userId,
    };
    await axios
      .post(CommonConstants.NEW_BASE_URL + "/canceltransaction", payloadData)
      .then((row) => {
        if (row.data.statuscode == 200) {
          setOpenCancelModal(false);
          getAllTransaction();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClick2 = (event, id, userID) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  const handleclick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };
  const handleclick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  const handleclick5 = (event) => {
    setAnchorEl5(event.currentTarget);
  };
  const handleClose5 = () => {
    setAnchorEl5(null);
  };
  const handleClick6 = (event) => {
    setAnchorEl6(event.currentTarget);
  };
  const handleClose6 = () => {
    setAnchorEl6(null);
  };
  const handleClick7 = (event) => {
    setAnchorEl7(event.currentTarget);
  };
  const handleClose7 = () => {
    setAnchorEl7(null);
  };
  const handleClick8 = (event) => {
    setAnchorEl8(event.currentTarget);
  };
  const handleClose8 = () => {
    setAnchorEl8(null);
  };
  const handleClick9 = (event) => {
    setAnchorEl9(event.currentTarget);
  };
  const handleClose9 = () => {
    setAnchorEl9(null);
  };
  const handleLockOpenModal = (transctionId, islock) => {
    setTansactionId(transctionId);
    setIsLock(islock);
    setOpenLockeModal(true);
  };
  const handleLockCloseModal = () => {
    setOpenLockeModal(false);
  };

  const handleCancelOpenModal = (id, userId, name) => {
    setTansactionId(id);
    setUserId(userId);
    setOpenCancelModal(true);
    setUserName(name);
  };
  const handleCancelCloseModal = () => {
    setOpenCancelModal(false);
  };

  const handleNoteOpenModal = async (transactionId, userId) => {
    setTansactionId(transactionId);
    setUserId(userId);
    setOpenNoteModal(true);
    const gettransactionnotesbyuserid = await axios.post(
      CommonConstants.NEW_BASE_URL + "/gettransactionnotesbyuserid",
      { userId: userId }
    );
    setUsersNote(gettransactionnotesbyuserid.data.data);
  };
  const handleNoteCloseModal = () => {
    setOpenNoteModal(false);
  };

  const handleNotifyOpenModal = (transacionID) => {
    handleClose1();
    getAllNotification();
    setTansactionId(transacionID);
    setOpenNotifyModal(true);
  };
  const handleNotifyCloseModal = () => {
    setOpenNotifyModal(false);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const moveToView = (id, userID) => {
    navigate({
      pathname: "/user-transaction-view",
      state: id,
      userID: userID,
    });
  };
  const getAllTransaction = async () => {
    if (isTimeOut) {
      setloadervalue(true);
    }
    try {
      const payload = {
        userId: individualuserData,
        pageindex: page,
        pagesize: RowsPerPage,
        searchdata: Search,
        status: "",
        sortparam: "create_at",
        sortorder: "DESC",
      };

      const response = await axios.post(
        CommonConstants.NEW_BASE_URL + "/gettransactionsbyuserid",
        payload
      );
      if (response.data.status == true) {
        const transactions = response.data.data;
        setloadervalue(false);
        setIsTimeOut(false);
        setUserName(transactions[0]?.userName);
        SetCountPage(response.data.totalPageCount);
        SetNumItems(response.data.recordCount);
        setShowSearch(
          response.data.recordCount == 0 ? (Search == "" ? false : true) : true
        );
        setAllTransaction(transactions);
        let totalAmount = 0;
        let totalServiceChare = 0;
        transactions.forEach((transaction) => {
          totalAmount += transaction.amount;
          totalServiceChare += transaction.serviceCharge;
          const deliveryMethod = transaction.deliveryMethodName;
          if (deliveryMethod in deliveryMethodCount) {
            deliveryMethodCount[deliveryMethod] += 1;
          } else {
            deliveryMethodCount[deliveryMethod] = 1;
          }
        });
        settotalAmount(totalAmount);
        setTotalServiceCharge(totalServiceChare);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == page) {
      setPage(NewPage);
    } else {
      setPage(NewPage);
    }
  };

  const ChangeRowSelected = (Event) => {
    setRowsPerPage(Number(Event.target.value));
    setPage(1);
  };
  const handlSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setPage(1);
    setShowSearch(allTarnsation.length > 0 || searchTerm.trim() !== "");
  };
  function convertToCSV(data) {
    const header = [
      "userName",
      "senderEmail",
      "senderPhone",
      "recipientName",
      "transactionNo",
      "recipientPhone",
      "bankName",
      "bankAccNo",
      "relation",
      "sendingCountryName",
      "recevingCountryName",
      "totalPayable",
      "receivingAmount",
      "deliveryMethodName",
      "paymentMethod",
    ];

    const csvData = [header.join(",")];
    data.forEach((row) => {
      const rowData = [
        row.userName,
        row.senderEmail,
        row.senderPhone,
        row.recipientName,
        row.transactionNo,
        row.recipientPhone,
        row.bankName,
        row.bankAccNo,
        row.relation,
        row.sendingCountryName,
        row.recevingCountryName,
        row.totalPayable,
        row.receivingAmount,
        row.deliveryMethodName,
        row.paymentMethod,
      ];
      csvData.push(rowData.join(","));
    });

    return csvData.join("\n");
  }
  const handleMenuOpen = (event) => {
    const csvContent = convertToCSV(allTarnsation);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "transactions.csv");
  };
  const deleteTransaction = () => {
    if (DeleteResone.trim().toLowerCase() === userName.trim().toLowerCase()) {
      const deletePayloadData = {
        id: userId,
        deleteReason: DeleteResone,
      };
      // console.log("hello")
      axios
        .post(
          CommonConstants.NEW_BASE_URL + "/deletetransaction",
          deletePayloadData
        )
        .then((res) => {
          if (res.data.status == true) {
            setOpenDeleteModal(false);
            getAllTransaction();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setError(true);
    }
  };
  //lock transaction
  const handleLockTransaction = () => {
    if (lockReson == "" || lockReson == undefined) {
      setError(true);
    } else {
      const lockTransactionPayload = {
        id: transactionId,
        reason: lockReson,
        isLock: true,
      };
      axios
        .post(
          CommonConstants.NEW_BASE_URL + "/locktransaction",
          lockTransactionPayload
        )
        .then((responce) => {
          if (responce.data.status == true) {
            setOpenLockeModal(false);
            getAllTransaction();
            setAnchorEl1(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleUnLockTransaction = () => {
    if (lockReson == "" || lockReson == undefined) {
      setError(true);
    } else {
      const unlockTransactionPayload = {
        id: transactionId,
        reason: lockReson,
        isLock: false,
      };
      axios
        .post(
          CommonConstants.NEW_BASE_URL + "/locktransaction",
          unlockTransactionPayload
        )
        .then((responce) => {
          if (responce.data.status == true) {
            setOpenLockeModal(false);
            getAllTransaction();
            setAnchorEl1(null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const addNoteTrasnsaction = async () => {
    const payload = {
      transactionId: transactionId,
      userId: userId,
      noteType: noteType,
      note: noteDescription,
    };
    axios
      .post(CommonConstants.NEW_BASE_URL + "/addnotetotransaction", payload)
      .then((res) => {
        if (res.data.status == true) {
          setOpenNoteModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteResoneChange = (e) => {
    const value = e.target.value;
    setDeleteResone(value);

    const formatSting1 = value.replace(/\s+/g, "").toLowerCase();
    const formatSting2 = userName.replace(/\s+/g, "").toLowerCase();

    if (formatSting1 === formatSting2) {
      setIsDeleteButtonDisabled(false);
    } else {
      setIsDeleteButtonDisabled(true);
    }
  };

  const handleOpenConfirmModel = (
    id,
    userID,
    name,
    amount,
    partnerBankName
  ) => {
    handleClose1();
    GetUserDetails(userID);
    setTansactionId(id);
    setUserName(name);
    setUserAmount(amount);
    setHandleConfirModel(true);
    setpartnerBankName(partnerBankName);
  };

  const openDeliverdModel = (transacionID) => {
    setTansactionId(transacionID);
    setOpenMarkDeliverdModel(true);
  };
  const openAssignBankModel = (transacionID, BankId) => {
    setSelectedBank(BankId);
    setTansactionId(transacionID);
    setAssignPartnerOpenModel(true);
  };

  const handleOpenMarkSmr = (transactionId, userId) => {
    setTansactionId(transactionId);
    setUserId(userId);
    setHandleOpenSmr(true);
  };
  const handleConfirmCloseModal = () => {
    setHandleConfirModel(false);
  };

  const gettransactionnotesbyuserid = async (id, userID) => {
    const payload = {
      id: id,
    };
    await axios
      .post(CommonConstants.NEW_BASE_URL + "/gettransactionbyid", payload)
      .then((res) => {
        const usersName = res.data.data;
        setUserName(usersName?.userName);
        setUserAmount(usersName?.amount);
        // setIsLock(usersName?.isLock);
      })
      .catch((error) => {
        console.log(error);
      });

    // const getDocumnet = await axios.post(CommonConstants.BASE_URL + '/getuserinfobyid', { id: userID });
    // setUserIdDeatils(getDocumnet.data.data?.iddetails);
    GetUserDetails(userID);
  };
  const GetUserDetails = async (userID) => {
    try {
      const userId = {
        id: userID,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getuserinfobyid",
        userId
      );
      if (response.data.status === true) {
        setUserInfo(response.data.data);
        setUserIdDeatils(response.data.data?.iddetails);
      }
    } catch (err) {}
  };
  //confiem transaction
  const confirmTransaction = () => {
    if (confirmReson == "" || confirmReson == undefined) {
      setError(true);
    } else {
      setHandleConfirModel(false);
      setOpenContinueModel(true);
    }
  };

  const handleCloseDelivery = () => {
    setOpenMarkDeliverdModel(false);
  };

  const markDeliverd = () => {
    const payload = {
      id: transactionId,
    };
    axios
      .post(CommonConstants.NEW_BASE_URL + "/markeddelivered", payload)
      .then((responce) => {
        if (responce.data.status == true) {
          setOpenMarkDeliverdModel(false);
          getAllTransaction();
        }
      })
      .catch((error) => console.log(error));
  };

  const handleCloseBankModel = () => {
    setAssignPartnerOpenModel(false);
    setShowMessage(false);
  };

  const handleAssignBank = async () => {
    try {
      if (!SelectedBank) {
        setError(true);
      } else {
        setloadervalue(true);
        const payload = {
          id: transactionId, //transaction id
          partnerBankId: SelectedBank, //partner bank id
        };
        const sendData = await axios.post(
          CommonConstants.NEW_BASE_URL + "/assigntopartnerbank",
          payload
        );
        if (sendData.data.status == true) {
          setAssignPartnerOpenModel(false);
          setAnchorEl2(null);
          closeAssignConfirmModel();
          getAllTransaction();
        }
        setloadervalue(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBankChange = (e) => {
    let bankValue = e.target.value;
    setSelectedBank(bankValue);
    const checkBalance = getAllPartnerBanks.find((row) => row.id == bankValue);
    if (checkBalance?.availableBalance < 0) {
      setShowMessage(true);
    } else {
      setShowMessage(false);
    }
  };

  const getAllPartnerBanksData = () => {
    const payalod = {
      pageindex: 1,
      pagesize: 50,
      searchdata: "%%",
      sortparam: "create_at",
      sortorder: "ASC",
    };
    axios
      .post(CommonConstants.BASE_URL + "/getallpartnerbanks", payalod)
      .then((row) => {
        setGetAllPartnerBanks(row.data.data);
      })
      .catch((err) => console.log(err));
  };

  const getAllNotification = () => {
    var InputParameter = {
      isTransaction: true,
    };
    axios
      .post(
        CommonConstants.BASE_URL + "/getnotificationbytransaction",
        InputParameter
      )
      .then((responce) => {
        let data = responce?.data.data;
        setNotificationTemplate(data);
      })
      .catch((error) => console.log(error));
  };

  const handleTemplateChange = (event) => {
    const selectedTitle = event.target.value;
    setSelectedTemplate(selectedTitle);
    // Find the template with the selected title
    const selectedTemplate = notificationTemplate.find((template) => {
      if (template.id == selectedTitle) {
        return template.description;
      }
    });
    // Update the description in the editor
    setDescription(selectedTemplate ? selectedTemplate.description : "");
  };

  const handleViewInvById = async (transacionID) => {
    try {
      const payload = {
        id: transacionID,
      };
      await axios
        .post(CommonConstants.NEW_BASE_URL + "/gettransactionbyid", payload)
        .then((response) => {
          setTransactionDataById(response.data.data);
          setformattedDate(moment(new Date()).format("DD/MM/YYYY"));
          setDownloadPdf(true);
          // setloadervalue(false)
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkSmrTransaction = () => {
    if (markSmrReson == "" || markSmrReson == undefined) {
      setError(true);
    } else if (mrkSmrType == "" || mrkSmrType == undefined) {
      setError(true);
    } else {
      let payLoad = {
        transactionId: transactionId, //transaction id
        reason: markSmrReson, //reason for smr
        type: mrkSmrType, //type of smr
        reportedBy: userId, //user id
      };

      axios
        .post(CommonConstants.NEW_BASE_URL + "/markedsmrtransaction", payLoad)
        .then((responce) => {
          if (responce.data.status == true) {
            setHandleOpenSmr(false);
            // setAnchorEl2(null);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSendNotification = async () => {
    try {
      setloadervalue(true);
      const payload = {
        transactionId: transactionId,
        notificationTemplateId: selectedTemplate,
        body: description,
        isPush: isPushChecked,
        isEmail: isEmailChecked,
      };
      const responce = await axios.post(
        CommonConstants.NEW_BASE_URL + "/notifyerror",
        payload
      );
      if (responce.data.status == true) {
        handleNotifyCloseModal();
        setAnchorEl2(null);
        handleClose1();
      }
      setloadervalue(false);
      // axios
      //     .post(CommonConstants.NEW_BASE_URL + "/notifyerror", payload)
      //     .then((responce) => {
      //         if (responce.data.status == true) {
      //             handleNotifyCloseModal();
      //         }
      //     })
      //     .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const getViewData = async (transacionID) => {
    handleClose1();
    try {
      const payload = {
        id: transacionID,
      };
      await axios
        .post(CommonConstants.NEW_BASE_URL + "/gettransactionbyid", payload)
        .then((response) => {
          if (response.data.status == true) {
            const responceData = response.data.data;
            setViewData(responceData);
            handleOpenView();
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllTransaction();
    getAllPartnerBanksData();
    getallpurposeoftransfer();
    if (DownloadPdf == true) {
      handlePrint();
    }
    const totalPayable = parseFloat(editAmount) + parseFloat(serviceCharge);
    settotalPayableCount(totalPayable);
    const totalReceived = parseFloat(editAmount) * parseFloat(exchangeRate);
    settotalReceivedAmount(totalReceived);
  }, [
    DownloadPdf,
    individualuserData,
    page,
    Search,
    RowsPerPage,
    editAmount,
    serviceCharge,
    exchangeRate,
  ]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getAllTransaction();
    }, 60000);
    return () => clearInterval(intervalId);
  }, [isTimeOut]);

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="row clearfix">
        <PageHeader
          HeaderText="Transactions lists"
          Breadcrumb={[
            { name: "Dashboard", navigate: "" },
            { name: "IoT Dashboard", navigate: "" },
          ]}
        />
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="body project_report">
              <div className="table-responsive">
                <div className="d-flex justify-content-between respoChildFooter">
                  {allTarnsation && allTarnsation.length > 0 && (
                    <div className="filter-row pb-2  pbSt">
                      Show Entries &nbsp; &nbsp;
                      <div className="d-flex align-items-center">
                        <Form.Select
                          name="tbl_meeting_length"
                          onChange={ChangeRowSelected}
                          value={RowsPerPage}
                          aria-controls="tbl_meeting"
                          className="form-control-sm py-2 h-auto  ps-3 mt-1"
                        >
                          {CommonConstants.show_rows.map((value) => (
                            <option value={value}>{value}</option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>
                  )}
                  {showSearch && (
                    <div className="form-group d-flex align-items-center">
                      <label className="mb-0">Search: </label> &nbsp;&nbsp;
                      <input
                        type="search"
                        id="search"
                        className="form-control p-0  px-3"
                        placeholder=""
                        onChange={handlSearch}
                      />
                      &nbsp;&nbsp;
                      <div>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={handleMenuOpen}
                          className="m-0"
                        >
                          <i className="fa fa-download" title="Download" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <TableContainer component={Paper} className="mt-3">
                    <Table aria-label="collapsible table">
                      <TableHead>
                        <TableCell />
                        <TableCell>Sender Details</TableCell>
                        <TableCell>Amount Details</TableCell>
                        <TableCell>Receiver Details</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                      </TableHead>
                      <TableBody>
                        {allTarnsation && allTarnsation.length > 0 ? (
                          allTarnsation.map((row, index) => {
                            return (
                              <>
                                <TableRow
                                  key={row.id}
                                  className={`border-secondary border-opacity-10 border-bottom ${
                                    row === selectedRow ? "selectedCell" : ""
                                  }`}
                                  // className={`border-secondary border-opacity-10 border-bottom  selectedCell`}
                                  style={{
                                    backgroundColor:
                                      statusColors[row.transactionStatus],
                                  }}
                                  onClick={() => handleRowselect(row)}
                                >
                                  <td component="td" className="border-bottom">
                                    <IconButton
                                      className="w-auto"
                                      aria-label="expand row"
                                      size="small"
                                      onClick={() => handleRowClick(index)}
                                    >
                                      {openRowIndex === index ? (
                                        <KeyboardArrowUpIcon />
                                      ) : (
                                        <KeyboardArrowDownIcon />
                                      )}
                                    </IconButton>
                                  </td>
                                  <TableCell component="td" scope="row">
                                    <i className="pe-2 fa fa-user purpleText" />
                                    {row.userName == null ? "-" : row.userName}
                                  </TableCell>
                                  <TableCell>
                                    <i className="pe-2 fa fa-dollar purpleText" />{" "}
                                    {row.totalPayable == null
                                      ? "-"
                                      : row.totalPayable}{" "}
                                    <br></br>
                                    {getPaymentMethos(row.paymentMethod)}
                                  </TableCell>
                                  <TableCell>
                                    <i className="pe-2 fa fa-user purpleText" />{" "}
                                    {row.recipientName == ""
                                      ? "-"
                                      : row.recipientName}
                                  </TableCell>
                                  <TableCell>
                                    {row.transactionStatus == null
                                      ? "-"
                                      : row.transactionStatus}{" "}
                                    <br></br>
                                    {row.partnerBankName == null
                                      ? ""
                                      : row.partnerBankName}
                                  </TableCell>
                                  <TableCell>
                                    {row.transactionStatus == "Delivered" ? (
                                      <>
                                        <div className="d-flex">
                                          {row.isRefundRequest == true &&
                                          row.refundReqStatus == 0 ? (
                                            <>
                                              <Tooltip
                                                title="Refund Accept"
                                                placement="top"
                                              >
                                                <AcceptIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleAcceptRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>

                                              <Tooltip
                                                title="Refund Reject"
                                                placement="top"
                                              >
                                                <RejectIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleRejectRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>
                                            </>
                                          ) : null}
                                          <Tooltip
                                            title="Cancel & Delete"
                                            placement="top"
                                          >
                                            <AnnouncementIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                handleCancelOpenModal(
                                                  row.id,
                                                  row.userId,
                                                  row.userName
                                                )
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2 pointer"
                                              onClick={(e) =>
                                                handleClick9(
                                                  e,
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl9}
                                            open={open9}
                                            onClose={handleClose9}
                                          >
                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(
                                                  row.id,
                                                  row.userId,
                                                  row.userName
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel & Delete
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleOpenMarkSmr(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark SMR
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                getViewData(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <RemoveRedEyeIcon />
                                              View
                                            </MenuItem>
                                            {row.isRefundRequest == true &&
                                            row.refundReqStatus == 0 ? (
                                              <>
                                                <Tooltip
                                                  title="Refund Accept"
                                                  placement="top"
                                                >
                                                  <AcceptIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleAcceptRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>

                                                <Tooltip
                                                  title="Refund Reject"
                                                  placement="top"
                                                >
                                                  <RejectIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleRejectRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>
                                              </>
                                            ) : null}
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus ===
                                      "Unconfirmed" ? (
                                      <>
                                        {row.isRefundRequest == true &&
                                        row.refundReqStatus == 0 ? (
                                          <>
                                            <Tooltip
                                              title="Refund Accept"
                                              placement="top"
                                            >
                                              <AcceptIcon
                                                className="purpleText m-2 pointer"
                                                onClick={() =>
                                                  handleAcceptRefund(
                                                    row.id,
                                                    row.transactionNo
                                                  )
                                                }
                                              />
                                            </Tooltip>

                                            <Tooltip
                                              title="Refund Reject"
                                              placement="top"
                                            >
                                              <RejectIcon
                                                className="purpleText m-2 pointer"
                                                onClick={() =>
                                                  handleRejectRefund(
                                                    row.id,
                                                    row.transactionNo
                                                  )
                                                }
                                              />
                                            </Tooltip>
                                          </>
                                        ) : null}
                                        <div className="d-flex">
                                          {row.isPaymentRecieved == false && (
                                            <Tooltip
                                              title="Mark Confirmed"
                                              placement="top"
                                            >
                                              <AssignmentTurnedInIcon
                                                className="purpleText m-2"
                                                onClick={() =>
                                                  handleOpenConfirmModel(
                                                    row.id,
                                                    row.userId,
                                                    row.userName,
                                                    row.amount,
                                                    row.partnerBankName
                                                  )
                                                }
                                              />
                                            </Tooltip>
                                          )}

                                          <Tooltip
                                            title="Cancel & Delete"
                                            placement="top"
                                            disableRipple
                                            className="my-2"
                                          >
                                            <AnnouncementIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                handleCancelOpenModal(
                                                  row.id,
                                                  row.userId,
                                                  row.userName
                                                )
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2 pointer"
                                              onClick={(e) =>
                                                handleClick1(
                                                  e,
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl1}
                                            open={open1}
                                            onClose={handleClose1}
                                          >
                                            {row.isRefundRequest == true &&
                                            row.refundReqStatus == 0 ? (
                                              <>
                                                <Tooltip
                                                  title="Refund Accept"
                                                  placement="top"
                                                >
                                                  <AcceptIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleAcceptRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>

                                                <Tooltip
                                                  title="Refund Reject"
                                                  placement="top"
                                                >
                                                  <RejectIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleRejectRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>
                                              </>
                                            ) : null}
                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(
                                                  row.id,
                                                  row.userId,
                                                  row.userName
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel & Delete
                                            </MenuItem>

                                            {row.isPaymentRecieved == false && (
                                              <MenuItem
                                                onClick={() =>
                                                  handleOpenConfirmModel(
                                                    row.id,
                                                    row.userId,
                                                    row.userName,
                                                    row.amount,
                                                    row.partnerBankName
                                                  )
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <AssignmentTurnedInIcon />
                                                Mark Confirmed
                                              </MenuItem>
                                            )}

                                            <MenuItem
                                              onClick={() =>
                                                getViewData(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <RemoveRedEyeIcon />
                                              View
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenEditModel(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <EditIcon />
                                              Edit
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleOpenDeleteModal(
                                                  row.id,
                                                  row.userName
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <DeleteIcon />
                                              Delete
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() => {
                                                handleRowClick(index);
                                                handleClose1();
                                              }}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnalyticsIcon />
                                              Track Status
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNotifyOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Notify Error
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenMarkSmr(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark SMR
                                            </MenuItem>
                                            {row.isLock == true ? (
                                              <MenuItem
                                                onClick={() =>
                                                  handleLockOpenModal(
                                                    row.id,
                                                    row.isLock
                                                  )
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <LockOpenIcon />
                                                Unlock
                                              </MenuItem>
                                            ) : (
                                              <MenuItem
                                                disableRipple
                                                className="my-2"
                                                onClick={() =>
                                                  handleLockOpenModal(
                                                    row.id,
                                                    row.isLock
                                                  )
                                                }
                                              >
                                                <LockIcon />
                                                Lock
                                              </MenuItem>
                                            )}
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus ===
                                      "Confirmed" ? (
                                      <>
                                        <div className="d-flex">
                                          {row.isRefundRequest == true &&
                                          row.refundReqStatus == 0 ? (
                                            <>
                                              <Tooltip
                                                title="Refund Accept"
                                                placement="top"
                                              >
                                                <AcceptIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleAcceptRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>

                                              <Tooltip
                                                title="Refund Reject"
                                                placement="top"
                                              >
                                                <RejectIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleRejectRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>
                                            </>
                                          ) : (
                                            <Tooltip
                                              title="Refund"
                                              placement="top"
                                            >
                                              <CurrencyExchangeIcon
                                                className="purpleText m-2 pointer"
                                                onClick={() =>
                                                  handleRefund(
                                                    row.id,
                                                    row.userId,
                                                    row.userName,
                                                    row.senderEmail,
                                                    row.senderPhone,
                                                    row.customerId,
                                                    row.transactionNo
                                                  )
                                                }
                                              />
                                            </Tooltip>
                                          )}
                                          <Tooltip
                                            title="Assign Partner Bank"
                                            placement="top"
                                          >
                                            <AssignmentTurnedInIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                openAssignBankModel(
                                                  row.id,
                                                  row.partnerBankId
                                                )
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2 pointer"
                                              onClick={(e) =>
                                                handleclick3(
                                                  e,
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl3}
                                            open={open3}
                                            onClose={handleClose3}
                                          >
                                            {row.isRefundRequest == true &&
                                            row.refundReqStatus == 0 ? (
                                              <>
                                                <Tooltip
                                                  title="Refund Accept"
                                                  placement="top"
                                                >
                                                  <AcceptIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleAcceptRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>

                                                <Tooltip
                                                  title="Refund Reject"
                                                  placement="top"
                                                >
                                                  <RejectIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleRejectRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>
                                              </>
                                            ) : (
                                              <MenuItem
                                                onClick={() =>
                                                  handleRefund(
                                                    row.id,
                                                    row.userId,
                                                    row.userName,
                                                    row.senderEmail,
                                                    row.senderPhone,
                                                    row.customerId,
                                                    row.transactionNo
                                                  )
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <CurrencyExchangeIcon />
                                                Refund
                                              </MenuItem>
                                            )}
                                            <MenuItem
                                              onClick={() =>
                                                getViewData(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <RemoveRedEyeIcon />
                                              View
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                openAssignBankModel(
                                                  row.id,
                                                  row.partnerBankId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Assign Partner Bank
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenEditModel(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <EditIcon />
                                              Edit
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleOpenDeleteModal(
                                                  row.id,
                                                  row.userName
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <DeleteIcon />
                                              Delete
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleRowClick(index)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnalyticsIcon />
                                              Track Status
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                openDeliverdModel(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark Delivered
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleOpenMarkSmr(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark SMR
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNotifyOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Notify Error
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>

                                            {row.isLock == true ? (
                                              <MenuItem
                                                onClick={() =>
                                                  handleLockOpenModal(
                                                    row.id,
                                                    row.isLock
                                                  )
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <LockOpenIcon />
                                                Unlock
                                              </MenuItem>
                                            ) : (
                                              <MenuItem
                                                disableRipple
                                                className="my-2"
                                                onClick={() =>
                                                  handleLockOpenModal(
                                                    row.id,
                                                    row.isLock
                                                  )
                                                }
                                              >
                                                <LockIcon />
                                                Lock
                                              </MenuItem>
                                            )}

                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(
                                                  row.id,
                                                  row.userId,
                                                  row.userName
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel & Delete
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus ===
                                        "Processing" ||
                                      row.transactionStatus === "Pending" ? (
                                      <>
                                        <div className="d-flex">
                                          {row.isRefundRequest == true &&
                                          row.refundReqStatus == 0 ? (
                                            <>
                                              <Tooltip
                                                title="Refund Accept"
                                                placement="top"
                                              >
                                                <AcceptIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleAcceptRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>

                                              <Tooltip
                                                title="Refund Reject"
                                                placement="top"
                                              >
                                                <RejectIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleRejectRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>
                                            </>
                                          ) : null}
                                          <Tooltip
                                            title="Cancel & Delete"
                                            placement="top"
                                          >
                                            <AnnouncementIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                handleCancelOpenModal(
                                                  row.id,
                                                  row.userId,
                                                  row.userName
                                                )
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2 pointer"
                                              onClick={(e) =>
                                                handleClick2(
                                                  e,
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl2}
                                            open={open2}
                                            onClose={handleClose2}
                                          >
                                            {row.isRefundRequest == true &&
                                            row.refundReqStatus == 0 ? (
                                              <div>
                                                <>
                                                  <Tooltip
                                                    title="Refund Accept"
                                                    placement="top"
                                                  >
                                                    <AcceptIcon
                                                      className="purpleText m-2 pointer"
                                                      onClick={() =>
                                                        handleAcceptRefund(
                                                          row.id,
                                                          row.transactionNo
                                                        )
                                                      }
                                                    />
                                                  </Tooltip>

                                                  <Tooltip
                                                    title="Refund Reject"
                                                    placement="top"
                                                  >
                                                    <RejectIcon
                                                      className="purpleText m-2 pointer"
                                                      onClick={() =>
                                                        handleRejectRefund(
                                                          row.id,
                                                          row.transactionNo
                                                        )
                                                      }
                                                    />
                                                  </Tooltip>
                                                </>
                                              </div>
                                            ) : null}
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenEditModel(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <EditIcon />
                                              Edit
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                getViewData(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <RemoveRedEyeIcon />
                                              View
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() => {
                                                handleRowClick(index);
                                                handleClose2();
                                              }}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnalyticsIcon />
                                              Track Status
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                openDeliverdModel(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark Delivered
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                openAssignBankModel(
                                                  row.id,
                                                  row.partnerBankId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Assign Partner Bank
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleNotifyOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Notify Error
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenMarkSmr(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark SMR
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(
                                                  row.id,
                                                  row.userId,
                                                  row.userName
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel & Delete
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus ===
                                      "Cancelled" ? (
                                      <>
                                        <div className="d-flex">
                                          {row.isRefundRequest == true &&
                                          row.refundReqStatus == 0 ? (
                                            <>
                                              <Tooltip
                                                title="Refund Accept"
                                                placement="top"
                                              >
                                                <AcceptIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleAcceptRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>

                                              <Tooltip
                                                title="Refund Reject"
                                                placement="top"
                                              >
                                                <RejectIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleRejectRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>
                                            </>
                                          ) : null}
                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2 pointer"
                                              onClick={(e) =>
                                                handleclick4(
                                                  e,
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl4}
                                            open={open4}
                                            onClose={handleClose4}
                                          >
                                            {row.isRefundRequest == true &&
                                            row.refundReqStatus == 0 ? (
                                              <>
                                                <Tooltip
                                                  title="Refund Accept"
                                                  placement="top"
                                                >
                                                  <AcceptIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleAcceptRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>

                                                <Tooltip
                                                  title="Refund Reject"
                                                  placement="top"
                                                >
                                                  <RejectIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleRejectRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>
                                              </>
                                            ) : null}
                                            <MenuItem
                                              onClick={() =>
                                                getViewData(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <RemoveRedEyeIcon />
                                              View
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenMarkSmr(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark SMR
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleOpenDeleteModal(
                                                  row.id,
                                                  row.userName
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <DeleteIcon />
                                              Delete
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus ===
                                      "Compliance Hold" ? (
                                      <>
                                        <div className="d-flex">
                                          {row.isRefundRequest == true &&
                                          row.refundReqStatus == 0 ? (
                                            <>
                                              <Tooltip
                                                title="Refund Accept"
                                                placement="top"
                                              >
                                                <AcceptIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleAcceptRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>

                                              <Tooltip
                                                title="Refund Reject"
                                                placement="top"
                                              >
                                                <RejectIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleRejectRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>
                                            </>
                                          ) : null}
                                          <Tooltip title="View" placement="top">
                                            <RemoveRedEyeIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                getViewData(row.id)
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2 pointer"
                                              onClick={(e) =>
                                                handleclick5(
                                                  e,
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl5}
                                            open={open5}
                                            onClose={handleClose5}
                                          >
                                            {row.isRefundRequest == true &&
                                            row.refundReqStatus == 0 ? (
                                              <>
                                                <Tooltip
                                                  title="Refund Accept"
                                                  placement="top"
                                                >
                                                  <AcceptIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleAcceptRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>

                                                <Tooltip
                                                  title="Refund Reject"
                                                  placement="top"
                                                >
                                                  <RejectIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleRejectRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>
                                              </>
                                            ) : null}
                                            {row.isPaymentRecieved == false && (
                                              <MenuItem
                                                onClick={() =>
                                                  handleOpenConfirmModel(
                                                    row.id,
                                                    row.userId,
                                                    row.userName,
                                                    row.amount,
                                                    row.partnerBankName
                                                  )
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <AssignmentTurnedInIcon />
                                                Mark Confirmed
                                              </MenuItem>
                                            )}
                                            <MenuItem
                                              onClick={() =>
                                                getViewData(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <RemoveRedEyeIcon />
                                              View
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenEditModel(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <EditIcon />
                                              Edit
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleOpenDeleteModal(
                                                  row.id,
                                                  row.userName
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <DeleteIcon />
                                              Delete
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() => {
                                                handleRowClick(index);
                                                handleClose5();
                                              }}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnalyticsIcon />
                                              Track Status
                                            </MenuItem>

                                            {/* <MenuItem
                                                                                                onClick={() =>
                                                                                                    handleOpenConfirmModel(
                                                                                                        row.id,
                                                                                                        row.userId,
                                                                                                        row.userName,
                                                                                                        row.amount,
                                                                                                        row.partnerBankName
                                                                                                    )
                                                                                                }
                                                                                                disableRipple
                                                                                                className="my-2"
                                                                                            >
                                                                                                <AssignmentTurnedInIcon />
                                                                                                Mark Confirmed
                                                                                            </MenuItem>  */}
                                            <MenuItem
                                              onClick={() =>
                                                openAssignBankModel(
                                                  row.id,
                                                  row.partnerBankId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Assign Partner Bank
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleOpenMarkSmr(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark SMR
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNotifyOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Notify Error
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                openResolveModel(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <VerifiedIcon />
                                              Resolve and Release
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleLockOpenModal(
                                                  row.id,
                                                  row.isLock
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              {row.isLock == true ? (
                                                <>
                                                  <LockOpenIcon />
                                                  Unlock
                                                </>
                                              ) : (
                                                <>
                                                  <LockIcon />
                                                  Lock
                                                </>
                                              )}
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(
                                                  row.id,
                                                  row.userId,
                                                  row.userName
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel & Delete
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus === "Draft" ? (
                                      <>
                                        <div className="d-flex">
                                          {row.isRefundRequest == true &&
                                          row.refundReqStatus == 0 ? (
                                            <>
                                              <Tooltip
                                                title="Refund Accept"
                                                placement="top"
                                              >
                                                <AcceptIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleAcceptRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>

                                              <Tooltip
                                                title="Refund Reject"
                                                placement="top"
                                              >
                                                <RejectIcon
                                                  className="purpleText m-2 pointer"
                                                  onClick={() =>
                                                    handleRejectRefund(
                                                      row.id,
                                                      row.transactionNo
                                                    )
                                                  }
                                                />
                                              </Tooltip>
                                            </>
                                          ) : null}
                                          <Tooltip title="Edit" placement="top">
                                            <EditIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                handleOpenEditModel(row.id)
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2 pointer"
                                              onClick={(e) =>
                                                handleClick6(
                                                  e,
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl6}
                                            open={open6}
                                            onClose={handleClose6}
                                          >
                                            {row.isRefundRequest == true &&
                                            row.refundReqStatus == 0 ? (
                                              <>
                                                <Tooltip
                                                  title="Refund Accept"
                                                  placement="top"
                                                >
                                                  <AcceptIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleAcceptRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>

                                                <Tooltip
                                                  title="Refund Reject"
                                                  placement="top"
                                                >
                                                  <RejectIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleRejectRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>
                                              </>
                                            ) : null}
                                            <MenuItem
                                              onClick={() =>
                                                getViewData(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <RemoveRedEyeIcon />
                                              View
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenEditModel(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <EditIcon />
                                              Edit
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleOpenDeleteModal(
                                                  row.id,
                                                  row.userName
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <DeleteIcon />
                                              Delete
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleRowClick(index)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnalyticsIcon />
                                              Track Status
                                            </MenuItem>

                                            {row.isPaymentRecieved == false && (
                                              <MenuItem
                                                onClick={() =>
                                                  handleOpenConfirmModel(
                                                    row.id,
                                                    row.userId,
                                                    row.userName,
                                                    row.amount,
                                                    row.partnerBankName
                                                  )
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <AssignmentTurnedInIcon />
                                                Mark Confirmed
                                              </MenuItem>
                                            )}

                                            <MenuItem
                                              onClick={() =>
                                                handleNotifyOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Notify Error
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenMarkSmr(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark SMR
                                            </MenuItem>
                                            <MenuItem
                                              onClick={() =>
                                                handleLockOpenModal(
                                                  row.id,
                                                  row.isLock
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              {row.isLock == true ? (
                                                <>
                                                  <LockOpenIcon />
                                                  Unlock
                                                </>
                                              ) : (
                                                <>
                                                  <LockIcon />
                                                  Lock
                                                </>
                                              )}
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(
                                                  row.id,
                                                  row.userId,
                                                  row.userName
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel & Delete
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : //  : row.transactionStatus === "Processing" ? (
                                    //     <>
                                    //         <div className="d-flex">
                                    //             {
                                    //                 row.isRefundRequest == true && row.refundReqStatus == 0 ? (
                                    //                     <>
                                    //                         <Tooltip title="Refund Accept" placement="top">
                                    //                             <AcceptIcon
                                    //                                 className="purpleText m-2 pointer"
                                    //                                 onClick={() =>
                                    //                                     handleAcceptRefund(row.id, row.transactionNo)
                                    //                                 }
                                    //                             />
                                    //                         </Tooltip>

                                    //                         <Tooltip title="Refund Reject" placement="top">
                                    //                             <RejectIcon
                                    //                                 className="purpleText m-2 pointer"
                                    //                                 onClick={() =>
                                    //                                     handleRejectRefund(row.id, row.transactionNo)
                                    //                                 }
                                    //                             />
                                    //                         </Tooltip>
                                    //                     </>
                                    //                 ) : null
                                    //             }
                                    //             <Tooltip title="View" placement="top">
                                    //                 <RemoveRedEyeIcon
                                    //                     className="purpleText m-2"
                                    //                     onClick={() => getViewData(row.id)}
                                    //                 />
                                    //             </Tooltip>

                                    //             <Tooltip title="Actions" placement="top">
                                    //                 <MoreVertIcon
                                    //                     className="purpleText m-2 pointer "
                                    //                     onClick={(e) => handleClick7(e, row.id, row.userId)}
                                    //                 />
                                    //             </Tooltip>

                                    //             <StyledMenu
                                    //                 id="demo-customized-menu"
                                    //                 MenuListProps={{
                                    //                     "aria-labelledby": "demo-customized-button",
                                    //                 }}
                                    //                 anchorEl={anchorEl7}
                                    //                 open={open7}
                                    //                 onClose={handleClose7}
                                    //             >
                                    //                 {row.isRefundRequest == true && row.refundReqStatus == 0 ? (
                                    //                     <>
                                    //                         <Tooltip title="Refund Accept" placement="top">
                                    //                             <AcceptIcon
                                    //                                 className="purpleText m-2 pointer"
                                    //                                 onClick={() =>
                                    //                                     handleAcceptRefund(row.id, row.transactionNo)
                                    //                                 }
                                    //                             />
                                    //                         </Tooltip>

                                    //                         <Tooltip title="Refund Reject" placement="top">
                                    //                             <RejectIcon
                                    //                                 className="purpleText m-2 pointer"
                                    //                                 onClick={() =>
                                    //                                     handleRejectRefund(row.id, row.transactionNo)
                                    //                                 }
                                    //                             />
                                    //                         </Tooltip>
                                    //                     </>
                                    //                 ) : null}
                                    //                 <MenuItem
                                    //                     onClick={() => getViewData(row.id)}
                                    //                     disableRipple
                                    //                     className="my-2"
                                    //                 >
                                    //                     <RemoveRedEyeIcon />
                                    //                     View
                                    //                 </MenuItem>
                                    //                 <MenuItem
                                    //                     onClick={() => handleOpenEditModel(row.id)}
                                    //                     disableRipple
                                    //                     className="my-2"
                                    //                 >
                                    //                     <EditIcon />
                                    //                     Edit
                                    //                 </MenuItem>
                                    //                 {/*
                                    //                 <MenuItem
                                    //                     onClick={() =>
                                    //                         handleOpenDeleteModal(row.id, row.userName)
                                    //                     }
                                    //                     disableRipple
                                    //                     className="my-2"
                                    //                 >
                                    //                     <DeleteIcon />
                                    //                     Delete
                                    //                 </MenuItem> */}

                                    //                 <MenuItem
                                    //                     onClick={() => handleRowClick(index)}
                                    //                     disableRipple
                                    //                     className="my-2"
                                    //                 >
                                    //                     <AnalyticsIcon />
                                    //                     Track Status
                                    //                 </MenuItem>

                                    //                 <MenuItem
                                    //                     onClick={() => openDeliverdModel(row.id)}
                                    //                     disableRipple
                                    //                     className="my-2"
                                    //                 >
                                    //                     <AssignmentTurnedInIcon />
                                    //                     Mark Delivered
                                    //                 </MenuItem>

                                    //                 <MenuItem
                                    //                     onClick={() => openAssignBankModel(row.id)}
                                    //                     disableRipple
                                    //                     className="my-2"
                                    //                 >
                                    //                     <AssignmentTurnedInIcon />
                                    //                     Assign Partner Bank
                                    //                 </MenuItem>

                                    //                 <MenuItem
                                    //                     onClick={() => handleNotifyOpenModal(row.id)}
                                    //                     disableRipple
                                    //                     className="my-2"
                                    //                 >
                                    //                     <AnnouncementIcon />
                                    //                     Notify Error
                                    //                 </MenuItem>

                                    //                 <MenuItem
                                    //                     onClick={() => handleNoteOpenModal(row.id, row.userId)}
                                    //                     disableRipple
                                    //                     className="my-2"
                                    //                 >
                                    //                     <TextSnippetIcon />
                                    //                     Notes
                                    //                 </MenuItem>

                                    //                 <MenuItem
                                    //                     onClick={() => handleLockOpenModal(row.id, row.isLock)}
                                    //                     disableRipple
                                    //                     className="my-2"
                                    //                 >
                                    //                     {row.isLock == true ? (
                                    //                         <>
                                    //                             <LockOpenIcon />
                                    //                             Unlock
                                    //                         </>
                                    //                     ) : (
                                    //                         <>
                                    //                             <LockIcon />
                                    //                             Lock
                                    //                         </>
                                    //                     )}
                                    //                 </MenuItem>

                                    //                 <MenuItem
                                    //                     onClick={() =>
                                    //                         handleCancelOpenModal(row.id, row.userId, row.userName)
                                    //                     }
                                    //                     disableRipple
                                    //                     className="my-2"
                                    //                 >
                                    //                     <AnnouncementIcon />
                                    //                     Cancel & Delete
                                    //                 </MenuItem>
                                    //             </StyledMenu>
                                    //         </div>
                                    //     </>
                                    // )
                                    row.transactionStatus === "Refunded" ? (
                                      <>
                                        <>
                                          <div className="d-flex">
                                            {row.isRefundRequest == true &&
                                            row.refundReqStatus == 0 ? (
                                              <>
                                                <Tooltip
                                                  title="Refund Accept"
                                                  placement="top"
                                                >
                                                  <AcceptIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleAcceptRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>

                                                <Tooltip
                                                  title="Refund Reject"
                                                  placement="top"
                                                >
                                                  <RejectIcon
                                                    className="purpleText m-2 pointer"
                                                    onClick={() =>
                                                      handleRejectRefund(
                                                        row.id,
                                                        row.transactionNo
                                                      )
                                                    }
                                                  />
                                                </Tooltip>
                                              </>
                                            ) : null}
                                            <Tooltip
                                              title="Actions"
                                              placement="top"
                                            >
                                              <MoreVertIcon
                                                className="purpleText m-2 pointer"
                                                onClick={(e) =>
                                                  handleClick8(
                                                    e,
                                                    row.id,
                                                    row.userId
                                                  )
                                                }
                                              />
                                            </Tooltip>
                                            <div
                                              id="demo-customized-menu"
                                              MenuListProps={{
                                                "aria-labelledby":
                                                  "demo-customized-button",
                                              }}
                                              anchorEl={anchorEl8}
                                              open={open8}
                                              onClose={handleClose8}
                                            >
                                              {row.isRefundRequest == true &&
                                              row.refundReqStatus == 0 ? (
                                                <>
                                                  <Tooltip
                                                    title="Refund Accept"
                                                    placement="top"
                                                  >
                                                    <AcceptIcon
                                                      className="purpleText m-2 pointer"
                                                      onClick={() =>
                                                        handleAcceptRefund(
                                                          row.id,
                                                          row.transactionNo
                                                        )
                                                      }
                                                    />
                                                  </Tooltip>

                                                  <Tooltip
                                                    title="Refund Reject"
                                                    placement="top"
                                                  >
                                                    <RejectIcon
                                                      className="purpleText m-2 pointer"
                                                      onClick={() =>
                                                        handleRejectRefund(
                                                          row.id,
                                                          row.transactionNo
                                                        )
                                                      }
                                                    />
                                                  </Tooltip>
                                                </>
                                              ) : null}
                                              <MenuItem
                                                onClick={() =>
                                                  getViewData(row.id)
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <RemoveRedEyeIcon />
                                                View
                                              </MenuItem>
                                              <MenuItem
                                                onClick={() =>
                                                  handleNoteOpenModal(
                                                    row.id,
                                                    row.userId
                                                  )
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <TextSnippetIcon />
                                                Notes
                                              </MenuItem>
                                              <MenuItem
                                                onClick={() =>
                                                  handleOpenMarkSmr(
                                                    row.id,
                                                    row.userId
                                                  )
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <AssignmentTurnedInIcon />
                                                Mark SMR
                                              </MenuItem>
                                            </div>
                                          </div>
                                        </>
                                      </>
                                    ) : (
                                      "-"
                                    )}
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell
                                    style={{ paddingBottom: 0, paddingTop: 0 }}
                                    colSpan={6}
                                  >
                                    <Collapse
                                      in={openRowIndex === index}
                                      timeout="auto"
                                      unmountOnExit
                                    >
                                      <Grid
                                        container
                                        spacing={2}
                                        className="border-bottom py-3"
                                      >
                                        <Grid item xs={4}>
                                          <TableContainer component={Paper}>
                                            {row.transactionStatus ==
                                              "Compliance Hold" && (
                                              <small className="font-weight-bolder text-danger">
                                                Reason for Compilance Hold :{" "}
                                                {row.reasonHold
                                                  ? row.reasonHold
                                                  : "-"}
                                              </small>
                                            )}
                                            {row.transactionStatus ==
                                              "Pending" && (
                                              <small className="font-weight-bolder text-danger">
                                                Reason for Pending:{" "}
                                                {row.reasonPending}
                                              </small>
                                            )}
                                            {row.isDuplicate == true && (
                                              <small className="font-weight-bold text-danger">
                                                {" "}
                                                Duplicate Transaction
                                              </small>
                                            )}
                                            {row.suspectedDuplicate == true && (
                                              <small className="font-weight-bold text-danger">
                                                Suspected Duplicate Transaction
                                              </small>
                                            )}
                                            <Table aria-label="collapsible table">
                                              <TableRow>
                                                <TableCell
                                                  component="td"
                                                  className="bg-transparent"
                                                >
                                                  Sender Details{" "}
                                                </TableCell>
                                              </TableRow>
                                              <TableBody>
                                                <TableCell>
                                                  <div>
                                                    <div className="my-3 mt-0">
                                                      <span
                                                        style={{
                                                          backgroundColor:
                                                            "blue",
                                                          fontWeight: "bold",
                                                          color: "white",
                                                          padding:
                                                            "0.3em 0.5em",
                                                        }}
                                                        title="No of Transaction"
                                                      >
                                                        {row.noOfTransaction}
                                                      </span>{" "}
                                                      {moment(
                                                        row.createdAt
                                                      ).format(
                                                        "DD-MM-YYYY HH:mm:ss"
                                                      )}
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-2 fa-solid fa-money-bill-transfer purpleText" />
                                                      Transaction No:{" "}
                                                      <div className="ps-2">
                                                        {row.transactionNo}
                                                      </div>
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-2 fa-solid fa-id-card purpleText" />
                                                      Control No:{" "}
                                                      <div className="ps-2">
                                                        {row.controlNo}
                                                      </div>
                                                    </div>
                                                    <div className="my-3 mt-0">
                                                      <i className="pe-2 fa fa-user purpleText" />
                                                      Name : {row.userName}
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-2 fa-solid fa-id-card purpleText" />
                                                      Customer Id:{" "}
                                                      <div className="ps-2">
                                                        {row.customerId}
                                                      </div>
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-2 fa fa-envelope purpleText" />
                                                      Email:{" "}
                                                      <div className="ps-2">
                                                        {row.senderEmail}
                                                      </div>
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-2 fa fa-mobile purpleText" />
                                                      Mobile:{" "}
                                                      <div className="ps-2">
                                                        {row.senderPhone}
                                                      </div>
                                                    </div>
                                                    {row.promoCode != "" && (
                                                      <div className="my-3 d-flex">
                                                        <i className="pe-2 fa fa-gift purpleText" />
                                                        promoCode:{" "}
                                                        <div className="ps-2">
                                                          {row.promoCode}
                                                        </div>
                                                      </div>
                                                    )}
                                                  </div>
                                                </TableCell>
                                              </TableBody>
                                            </Table>
                                          </TableContainer>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <TableContainer component={Paper}>
                                            <Table aria-label="collapsible table">
                                              <TableRow>
                                                {/* <TableCell /> */}
                                                <TableCell
                                                  component="td"
                                                  className="bg-transparent"
                                                >
                                                  Amount Details{" "}
                                                </TableCell>
                                              </TableRow>
                                              <TableBody>
                                                <TableCell>
                                                  <div>
                                                    <div className="my-3 mt-0 d-flex">
                                                      <i className="pe-3 fa fa-dollar purpleText" />
                                                      {row.sendingCurrencyCode}{" "}
                                                      :{" "}
                                                      <div className="ps-2">
                                                        {row.amount == ""
                                                          ? "-"
                                                          : row.amount}
                                                      </div>
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-3 fa fa-dollar purpleText" />
                                                      {row.recevingCurrencyCode}{" "}
                                                      :
                                                      <div className="ps-2">
                                                        {Number(
                                                          (
                                                            row.amount *
                                                            row.exchangeRate
                                                          )
                                                            ?.toString()
                                                            ?.match(
                                                              /^\d+(?:\.\d{0,2})?/
                                                            )
                                                        )}
                                                        {/* (
                                                                                                                    (row.amount) *
                                                                                                                        row.exchangeRate
                                                                                                                    ).toFixed(2)
                                                                                                                } */}
                                                      </div>
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-3 fa fa-dollar purpleText" />
                                                      Exchange Rate:{" "}
                                                      <div className="ps-2">
                                                        {row.exchangeRate}
                                                      </div>
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-3 fa fa-dollar purpleText" />
                                                      Service Charge:{" "}
                                                      <div className="ps-2">
                                                        {row.serviceCharge}
                                                      </div>
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-2 fa fa-credit-card purpleText" />
                                                      Payment Method:{" "}
                                                      <div className="ps-2">
                                                        {row.paymentMethod}
                                                      </div>
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-2  fa fa-bank purpleText" />
                                                      Payout Partner Bank:{" "}
                                                      <div className="ps-2">
                                                        {row.partnerBankName}
                                                      </div>
                                                    </div>
                                                    <div
                                                      className="my-3 d-flex pointer"
                                                      onClick={() =>
                                                        handleViewInvById(
                                                          row.id
                                                        )
                                                      }
                                                    >
                                                      <i className="pe-2 fa fa-receipt purpleText" />
                                                      Invoice
                                                    </div>
                                                  </div>
                                                </TableCell>
                                              </TableBody>
                                            </Table>
                                          </TableContainer>
                                        </Grid>
                                        <Grid item xs={4}>
                                          <TableContainer component={Paper}>
                                            <Table aria-label="collapsible table">
                                              <TableRow>
                                                {/* <TableCell /> */}
                                                <TableCell
                                                  component="td"
                                                  className="bg-transparent"
                                                >
                                                  Receiver Details{" "}
                                                </TableCell>
                                              </TableRow>
                                              <TableBody>
                                                <TableCell>
                                                  <div>
                                                    <div className="my-3 mt-0 d-flex">
                                                      <i className="pe-3 fa fa-dollar purpleText" />
                                                      Receiver Name :{" "}
                                                      <div className="ps-2">
                                                        {row.recipientName}{" "}
                                                      </div>
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-3 fa fa-mobile purpleText" />
                                                      Mobile No :
                                                      <div className="ps-2">
                                                        {row.recipientPhone}
                                                      </div>
                                                    </div>
                                                    {row.deliveryMethodName ===
                                                      "Wallet Deposit" ||
                                                    (row.deliveryMethodName ===
                                                      "Bank Deposit" &&
                                                      row.bankName) ? (
                                                      <div className="my-3 d-flex">
                                                        <i className="pe-3 fa fa-bank purpleText" />
                                                        {row.deliveryMethodName ===
                                                        "Bank Deposit"
                                                          ? "Bank Name"
                                                          : "Wallet Name"}{" "}
                                                        :{" "}
                                                        <div className="ps-2">
                                                          {" "}
                                                          {row.deliveryMethodName ===
                                                          "Bank Deposit"
                                                            ? row.bankName ==
                                                              null
                                                              ? "-"
                                                              : row.bankName
                                                            : row.walletName ==
                                                              null
                                                            ? "-"
                                                            : row.walletName}
                                                        </div>
                                                      </div>
                                                    ) : null}

                                                    {row.deliveryMethodName ===
                                                      "Wallet Deposit" ||
                                                    row.deliveryMethodName ===
                                                      "Bank Deposit" ? (
                                                      <div className="my-3 d-flex">
                                                        <i className="pe-3 fa fa-piggy-bank purpleText" />
                                                        {row.deliveryMethodName ===
                                                        "Bank Deposit"
                                                          ? "Account No"
                                                          : "Wallet No"}{" "}
                                                        :{" "}
                                                        <div className="ps-2">
                                                          {" "}
                                                          {row.deliveryMethodName ===
                                                          "Bank Deposit"
                                                            ? row.bankAccNo
                                                              ? row.bankAccNo
                                                              : "-"
                                                            : row.walletNo
                                                            ? row.walletNo
                                                            : "-"}
                                                        </div>
                                                      </div>
                                                    ) : null}

                                                    <div className="my-3 d-flex">
                                                      <i className="pe-3 fa fa-flag purpleText" />
                                                      Country :{" "}
                                                      <div className="ps-2">
                                                        {
                                                          row.recevingCountryName
                                                        }
                                                      </div>
                                                    </div>
                                                    <div className="my-3 d-flex">
                                                      <i className="pe-3 fa fa-envelope purpleText" />
                                                      Email :{" "}
                                                      <div className="ps-2">
                                                        {row.recipientEmail
                                                          ? row.recipientEmail
                                                          : "-"}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </TableCell>
                                              </TableBody>
                                            </Table>
                                          </TableContainer>
                                        </Grid>
                                      </Grid>
                                      <Grid className="mt-5">
                                        <Box sx={{ width: "100%" }}>
                                          <Stepper
                                            activeStep={getStepIndex(
                                              row.transactionStatus
                                            )}
                                            alternativeLabel
                                            sx={{
                                              "& .MuiStepIcon-root": {
                                                fontSize: "2rem", // Increase the size of the step round
                                              },
                                            }}
                                          >
                                            {steps.map((label, index) => (
                                              <Step key={index}>
                                                <StepLabel>
                                                  <div className="labelText">
                                                    {label}
                                                  </div>
                                                </StepLabel>
                                              </Step>
                                            ))}
                                          </Stepper>
                                        </Box>
                                      </Grid>
                                    </Collapse>
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          })
                        ) : (
                          <td colSpan={7}>
                            <p className="text-center mt-3">
                              No Transaction's Data Found{" "}
                            </p>
                          </td>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {allTarnsation && allTarnsation.length > 0 && (
                    <div>
                      <div className="d-flex justify-content-between pt-4 mr-4 mr-4">
                        <Pagination
                          count={CountPage}
                          className="pbDowSt pbSt"
                          page={page}
                          onChange={HandleChangePage}
                          color="secondary"
                          shape="rounded"
                        />
                      </div>

                      <div className="d-flex justify-content-between respoChildFooter pt-4 mr-4 mr-4">
                        <div className="font-weight-medium pbDowSt">
                          <div>Total Transaction Count : {numItems}</div>
                        </div>
                        <div>
                          <div className="font-weight-medium pbDowSt">
                            {" "}
                            Total Amount :{flag}{" "}
                            {totalAmount
                              ?.toString()
                              ?.match(/^\d+(?:\.\d{0,2})?/)}
                            {/* Total Amount :{flag} {totalAmount.toFixed(2)} */}
                          </div>
                        </div>{" "}
                        <div>
                          <div className="font-weight-medium pbDowSt">
                            Average Transaction Size :{flag}{" "}
                            {(totalAmount / numItems)
                              ?.toString()
                              ?.match(/^\d+(?:\.\d{0,2})?/)}
                            {/* {(totalAmount / numItems).toFixed(2)} */}
                          </div>
                        </div>{" "}
                        <div>
                          <div className="font-weight-medium pbDowSt">
                            Total Service Charge Count :{flag}{" "}
                            {totalServiceCharge
                              ?.toString()
                              ?.match(/^\d+(?:\.\d{0,2})?/)}
                            {/* {totalServiceCharge.toFixed(2)} */}
                          </div>
                        </div>
                      </div>
                      <div className="d-none col-lg-12 d-flex justify-content-between pt-4 respoChildFooter">
                        <div className="col-lg-4 pbSt">
                          <div>Total amount sent in local currencies : --</div>
                        </div>
                        <div className="col-lg-4 pbSt">
                          <div> No of transaction : --</div>
                        </div>
                        <div className="col-lg-4 pbSt">
                          <div>Average transaction size : --</div>
                        </div>
                      </div>
                      <div className="d-none col-lg-12 d-flex justify-content-between pt-4 respoChildFooter">
                        <div className="col-lg-4 pbSt">
                          <div>No of transaction by delivery method:</div>
                          <div className="d-flex align-items-center my-2">
                            <select
                              className="border-0 p-2 px-0 rounded-1 border shadow-sm"
                              value={deliveryMethod}
                              onChange={(e) =>
                                setDeliveryMethod(e.target.value)
                              }
                            >
                              <option>Method 1</option>
                              <option>Method 2</option>
                              <option>Method 3</option>
                            </select>
                            <div className="px-3">: 12</div>
                          </div>
                        </div>
                        <div className="col-lg-4 pbSt">
                          <div>No of transaction by payment method:</div>
                          <div className="d-flex align-items-center my-2">
                            <select
                              className="border-0 p-2 px-0 rounded-1 border shadow-sm"
                              value={deliveryMethod}
                              onChange={(e) =>
                                setDeliveryMethod(e.target.value)
                              }
                            >
                              <option>Payment 1</option>
                              <option>Payment 2</option>
                              <option>Payment 3</option>
                            </select>
                            <div className="px-3">: 12</div>
                          </div>
                        </div>
                        <div className="col-lg-4 pbSt">
                          <div>No of transaction by country:</div>
                          <br />
                          <div className="d-flex align-items-center my-2">
                            <select
                              className="border-0 p-2 px-0 rounded-1 border shadow-sm"
                              value={deliveryMethod}
                              onChange={(e) =>
                                setDeliveryMethod(e.target.value)
                              }
                            >
                              <option>Country 1</option>
                              <option>Country 2</option>
                              <option>Country 3</option>
                            </select>
                            <div className="px-3">: 12</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* refund model  */}
      <Modal open={refundModel} onClose={() => setRefundModel(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "60%", md: "60%", lg: "60%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-2 d-flex justify-content-between">
            <h5>Refund Request</h5> {/* Header Title */}
            <div onClick={() => setRefundModel(false)} className="pointer">
              <CloseIcon />
            </div>
          </div>
          <div className="">
            <div className="row">
              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                  Reason For Refund
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Reason For Refund"
                  onChange={(e) => setRefundRease(e.target.value)}
                  value={refundResone}
                />
                {error && !refundResone && (
                  <small className="responsiveFontLarge text-danger error_message ms-2 error checkboxError">
                    Please Enter Reason
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end mt-3 border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={refundMoney}
              >
                Refund
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={() => setRefundModel(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* assign confim model */}
      <Modal open={openAssignConfirmModel} onClose={closeAssignConfirmModel}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
            paddingBottom: "20px",
          }}
        >
          <div className="">
            <div className="row">
              <div>
                <div className="col-lg-12 my-2 px-0">
                  <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                    Remaining amount is in negative. Do you want to proceed?
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end align-items-center mt-3 border-top">
            <div className="col-lg-5">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={handleAssignBank}
              >
                Yes
              </Button>
            </div>
            <div className="col-lg-4">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={closeAssignConfirmModel}
              >
                No
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* confirm continue model */}
      <Modal open={openContinueModel} onClose={closeModelContinue}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
            paddingBottom: "20px",
          }}
        >
          <div className="">
            <div className="row">
              <div>
                <div className="col-lg-12 my-2 px-0">
                  <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                    Are You Sure Want To Continue With {partnerBankName} Bank?
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end align-items-center mt-3 border-top">
            <div className="col-lg-5">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={handleYesClick}
              >
                Yes
              </Button>
            </div>
            <div className="col-lg-4">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleNoClick}
              >
                No
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* view model */}
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
            <h5>View Transaction</h5>
            <div onClick={handleCloseView} className="pointer">
              <CloseIcon />
            </div>
          </div>

          <div className="">
            <div className="row viewModal my-4">
              {viewData && (
                <div className="col-lg-6">
                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">
                      Sending Country:
                    </small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.sendingCountryName}
                    </small>
                  </div>

                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">
                      Sender Name:
                    </small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.userName}
                    </small>
                  </div>
                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">
                      Sender Phone:
                    </small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.senderPhone}
                    </small>
                  </div>
                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">
                      Receiving Country:
                    </small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.recevingCountryName}
                    </small>
                  </div>

                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">Receiver:</small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.recipientName}
                    </small>
                  </div>

                  {/* <div className="d-flex my-3 justify-content-between ">
                  <small className="medium text-black fs-6 ">
                    Received At:
                  </small>
                  <small className="font-weight-light text-black fs-6 ">
                    2023-08-31 10:08:32
                  </small>
                </div> */}
                  {/* <div className="d-flex  my-3 justify-content-between">
                  <small className="medium text-black fs-6 ">
                  Sending Currency Code:
                  </small>
                  <small className="font-weight-light text-black fs-6 ">
                  AUD
                  </small>
                </div>
                <div className="d-flex  my-3 justify-content-between">
                  <small className="medium text-black fs-6 ">
                  Receiving Currency Code:
                  </small>
                  <small className="font-weight-light text-black fs-6 ">
                  NPR
                  </small>
                </div> */}

                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">
                      Purpose of Transfer:
                    </small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.transferPurpose}
                    </small>
                  </div>

                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">Status:</small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.transactionStatus == null
                        ? "-"
                        : viewData.transactionStatus}
                    </small>
                  </div>
                </div>
              )}

              {viewData && (
                <div className="col-lg-6">
                  <div className="d-flex my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">Amount:</small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.amount}
                    </small>
                  </div>

                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">
                      Exchange Rate:
                    </small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.exchangeRate}
                    </small>
                  </div>
                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">
                      Service Charge:
                    </small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.serviceCharge}
                    </small>
                  </div>
                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">
                      Payment Method:
                    </small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.paymentMethod}
                    </small>
                  </div>
                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">
                      Delivery Method:
                    </small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.deliveryMethodName}
                    </small>
                  </div>
                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">
                      Bank Account Number:
                    </small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.bankAccNo}
                    </small>
                  </div>

                  <div className="d-flex  my-3 justify-content-between">
                    <small className="medium text-black fs-6 ">
                      Partner bank Assigned:
                    </small>
                    <small className="font-weight-light text-black fs-6 ">
                      {viewData.partnerBankName}
                    </small>
                  </div>
                  {/* <div className="d-flex  my-3 justify-content-between">
                  <small className="medium text-black fs-6 ">
                  Bank Deposit Branch:
                  </small>
                  <small className="font-weight-light text-black fs-6 ">
                  Bank Branch
                  </small>
                </div> */}
                </div>
              )}
            </div>
            <div className="  my-3 mt-0">
              <Alert variant="success">
                <small className="medium text-black fs-6 ">Payment Note:</small>
                <small className="ps-2 font-weight-light text-black fs-6 ">
                  {viewData.paymentNote}
                </small>
              </Alert>
            </div>
          </div>

          <div className="row d-flex justify-content-end mt-3 border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleCloseView}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* edit model */}
      <Modal open={openEditModel} onClose={handleCloseEdit}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-1 d-flex justify-content-between">
            <h5>Edit Transaction</h5>
            <div onClick={handleCloseEdit} className="pointer">
              <CloseIcon />
            </div>
          </div>

          <div className="">
            <div className="row viewModal">
              <Form.Group controlId="formGridPassword">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  value={userName}
                  disabled
                />
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label className="mt-3">Delievery Method </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={deliveryMethodId}
                  onChange={(e) => setDeliveryMethodId(e.target.value)}
                >
                  <option>Select Delievery Method</option>
                  {activeDelivryMethod &&
                    activeDelivryMethod.map((row) => {
                      return (
                        <>
                          <option value={row.id}>{row.name}</option>
                        </>
                      );
                    })}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label className="mt-3">Receiver</Form.Label>
                <Form.Select
                  name="PaymentMethod"
                  onChange={handleReceiverChange}
                  value={selectedReceiver}
                >
                  <option>Select Receiver</option>
                  {receiver &&
                    receiver.map((row) => (
                      <option key={row.id} value={row.id}>
                        {`${
                          row.firstName == ""
                            ? row?.fullName == "[]"
                              ? row?.businessName
                              : row?.fullName
                            : row.firstName + " " + row.lastName
                        } - ${row.phone} - ${
                          row.bankName == null ? "-" : row.bankName
                        }`}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label className="mt-3">Transfer Purpose</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={SelectedPurposeOfTransacferId}
                  onChange={(e) =>
                    setSelectedPurposeOfTransacferId(e.target.value)
                  }
                >
                  <option>Select Transfer Purpose</option>
                  {purposeOfTransacfer &&
                    purposeOfTransacfer.map((row) => {
                      return (
                        <>
                          <option value={row.id}>{row.name}</option>
                        </>
                      );
                    })}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label className="mt-3"> Partner bank Assigned</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={partnerBankId}
                  onChange={(e) => setpartnerBankId(e.target.value)}
                >
                  <option>Select Partner Assigned</option>
                  {getAllPartnerBanks &&
                    getAllPartnerBanks.map((row) => {
                      return (
                        <>
                          <option value={row.id}>{row.name}</option>
                        </>
                      );
                    })}
                </Form.Select>
              </Form.Group>
              {editStaus == "Unconfirmed" && (
                <>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label className="mt-3">Amount </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Amount"
                      name="consumers"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label className="mt-3">Service Charge</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Service Charge"
                      name="consumers"
                      value={serviceCharge}
                      onChange={(e) => setServiceCharge(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label className="mt-3">Exchange Rate</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Exchange Rate"
                      name="consumers"
                      value={exchangeRate}
                      onChange={(e) => setExchangeRate(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label className="mt-3">
                      Total payable Amount
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Amount"
                      name="consumers"
                      value={totalPayableCount}
                      onChange={(e) => settotalPayableCount(e.target.value)}
                    />
                  </Form.Group>
                </>
              )}

              <Form.Group controlId="formGridPassword">
                <Form.Label className="mt-3">Payment Note</Form.Label>
                <Form.Control
                  as="textarea" // Use textarea instead of text
                  placeholder="Payment Note"
                  name="consumers"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row d-flex justify-content-end mt-3 border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={updateTransactin}
              >
                Update
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleCloseEdit}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* Delete Modal */}
      <Modal open={openDeleteModal} onClose={handleNoteCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-2 d-flex justify-content-between">
            <h5>Delete Transaction</h5> {/* Header Title */}
            <div onClick={() => setOpenDeleteModal(false)} className="pointer">
              <CloseIcon />
            </div>
          </div>
          <div className="">
            <div className="row viewModal">
              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                  Type{" "}
                  <div className="text-blue font-weight-bold px-2">
                    {userName}{" "}
                  </div>
                  to delete.
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Delete"
                  value={DeleteResone}
                  onChange={handleDeleteResoneChange}
                />
                {error && (
                  <small className="responsiveFontLarge text-danger error_message ms-2 error checkboxError">
                    Please Enter Above Name To Delete{" "}
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end mt-3 border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={deleteTransaction}
                disabled={isDeleteButtonDisabled}
              >
                Delete
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={() => setOpenDeleteModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* Cancel Modal */}
      <Modal open={openCancelModal} onClose={handleCancelCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "60%", md: "60%", lg: "60%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
            <h5>Cancel Transaction</h5> {/* Header Title */}
            <div onClose={handleCancelCloseModal} className="pointer">
              <CloseIcon />
            </div>
          </div>
          <div className="">
            <div className="row viewModal">
              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                  Type{" "}
                  <div className="text-blue font-weight-bold px-2">
                    {userName}{" "}
                  </div>
                  to cancel.
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cancel"
                  onChange={chekInput}
                />
              </div>

              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                  Cancellation Reason
                </div>
                <textarea
                  type="textarea"
                  className="form-control"
                  placeholder=""
                  rows="3"
                  onChange={(e) => setCancelResone(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-end mt-3 border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={handleCloseDeleteModal}
                disabled={isButtonDisabled}
              >
                Cancel
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleCancelCloseModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* Lock Transaction Modal */}
      <Modal open={openLockModal} onClose={handleLockCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "60%", md: "60%", lg: "60%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
            <h5>{`${isLock ? "Unlock" : "Lock"}`} Transaction</h5>{" "}
            {/* Header Title */}
            <div onClose={handleLockCloseModal} className="pointer">
              <CloseIcon />
            </div>
          </div>

          <div className="">
            <div className="row viewModal">
              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2  mb-2 text-black d-flex">
                  {`${isLock ? "Unlock" : "Lock"}`} Transaction
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`${isLock ? "Unlock" : "Lock"} Reson`}
                  onChange={(e) => setLockReson(e.target.value)}
                />
                {error && !lockReson && (
                  <small className="responsiveFontLarge   text-danger error_message ms-2 error checkboxError">
                    Please Enter {`${isLock ? "Unlock" : "Lock"}`} Reason
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end mt-3 border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={
                  isLock ? handleUnLockTransaction : handleLockTransaction
                }
              >
                {isLock ? "Unlock" : "Lock"}
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleLockCloseModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* Notes Modal */}

      <Modal open={openNoteModal} onClose={handleNoteCloseModal}>
        <Box
          className="py-3"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "60%", md: "60%", lg: "60%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
            <h5>Notes</h5> {/* Header Title */}
            <div onClick={handleNoteCloseModal} className="pointer">
              <CloseIcon />
            </div>
          </div>

          <div className="">
            <div className="row viewModal">
              <div className="col-lg-12">
                <table className="table-responsive m-b-0 d-lg-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Note Type</th>
                      <th>Note</th>
                      <th>Added By</th>
                      <th>Is Resolved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersNote && usersNote.length > 0 ? (
                      usersNote.map((row) => (
                        <tr key={row.noteId}>
                          <td className="py-1">
                            {moment(row.createdAt).format(
                              "YYYY-MM-DD HH:mm:ss"
                            )}
                          </td>
                          <td className="py-1">{row.noteType}</td>
                          <td className="py-1">{row.note}</td>
                          <td className="py-1">{row.userName}</td>
                          <td className="py-1">
                            {row.noteType == "Informative"
                              ? "-"
                              : row.isResolved == true
                              ? "Yes"
                              : "No"}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border text-center">
                        <td colSpan="4">No any notes yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2 mb-3 text-black d-flex">
                  Notes Type
                </div>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setNoteType(e.target.value)}
                >
                  <option>Select Type</option>
                  <option value="Informative">Informative</option>
                  <option value="Action">Action</option>
                </Form.Select>
                {error && !noteType && (
                  <small className="responsiveFontLarge text-danger error_message ms-2 error">
                    Please select an option
                  </small>
                )}
              </div>

              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2 mb-3 text-black d-flex">
                  New Notes
                </div>
                <textarea
                  type="textarea"
                  className="form-control"
                  placeholder=" New Notes"
                  rows="3"
                  onChange={(e) => setNoteDescription(e.target.value)}
                />
                {error && !noteDescription && (
                  <small className="responsiveFontLarge text-danger error_message ms-2 error">
                    Please Enter Note
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end mt-3 border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={addNoteTrasnsaction}
              >
                Add
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleNoteCloseModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* notifyError model */}
      <Modal open={openNotifyModal} onClose={handleNotifyCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "60%", md: "60%", lg: "60%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-2 d-flex justify-content-between">
            <h5 className="">Notify sender about transaction error</h5>{" "}
            {/* Header Title */}
            <div onClick={handleNotifyCloseModal} className="pointer">
              <CloseIcon />
            </div>
          </div>

          <div className="">
            <div className="row viewModal">
              <div>
                <div className="col-lg-12 my-2 px-0">
                  <div className="font-weight-normal m-2  text-black d-flex">
                    Select Template
                  </div>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handleTemplateChange}
                  >
                    <option>Select Template</option>
                    {notificationTemplate &&
                      notificationTemplate.map((row) => (
                        <option key={row.id} value={row.id}>
                          {row.title}
                        </option>
                      ))}
                  </Form.Select>
                  {/* {!noteType && <small className="responsiveFontLarge  text-danger error_message ms-2 error" >Please select option</small>} */}
                </div>

                <div className="col-lg-12 my-2 px-0">
                  <JoditEditor
                    value={description}
                    config={{ readonly: false }}
                    tabIndex={1}
                    onBlur={(newContent) => {}}
                    onChange={(newContent) => {
                      setDescription(newContent);
                    }}
                  />
                </div>
              </div>
              <FormGroup className="d-flex">
                <div className="d-flex">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isPushChecked}
                        onChange={handlePushChange}
                      />
                    }
                    label={
                      <div
                        style={{ color: "#ff0000 !important" }}
                        className="option-label"
                      >
                        Send through Push
                      </div>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isEmailChecked}
                        onChange={handleEmailChange}
                      />
                    }
                    label={
                      <div
                        style={{ color: "#ff0000 !important" }}
                        className="option-label"
                      >
                        Send through Email
                      </div>
                    }
                  />
                </div>
                <div
                  style={{ color: "#ff0000 !important" }}
                  className="option-label mt-1"
                >
                  No any notification sent yet.
                </div>
              </FormGroup>
            </div>
          </div>

          <div className="row d-flex justify-content-end align-items-center mt-1 border-top">
            <div className="col-lg-4">
              <div
                style={{ color: "#ff0000 !important" }}
                className="text-primary mt-2"
              >
                Request Document <b>(0)</b>
              </div>
            </div>
            <div className="col-lg-2">
              <div
                style={{ color: "#ff0000 !important" }}
                className="text-primary mt-2"
              >
                Chat
              </div>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={handleSendNotification}
              >
                Notify Error
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleNotifyCloseModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* mark confirmed module */}
      <Modal open={handleConfirModel} onClose={handleConfirmCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "60%", md: "60%", lg: "60%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
            <h5 className="responsiveFontLarge">
              Are you sure to mark transaction confirmed?
            </h5>{" "}
            {/* Header Title */}
            <div onClick={handleConfirmCloseModal} className="pointer">
              <CloseIcon />
            </div>
          </div>
          <div className="row viewModal">
            <div className="col-lg-12 my-2">
              <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                Sender:
                <div className="text-blue font-weight-bold px-2">
                  {userName}{" "}
                </div>
                Amount:{" "}
                <div className="text-blue font-weight-bold px-2">
                  {userAmonut}{" "}
                </div>
              </div>
              <textarea
                type="textarea"
                className="form-control"
                placeholder=" statement data"
                rows="3"
                onChange={handleTextareaChange}
                onBlur={handleCheck}
              />
              {error && !confirmReson && (
                <small className="responsiveFontLarge   text-danger error_message ms-2 error checkboxError">
                  Please Enetr Reason
                </small>
              )}
            </div>
            <div className="mt-3">
              <table className="table-responsive d-table">
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Uploaded</th>
                    <th>Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  <td>
                    {userIdDeatils?.type == null ? "-" : userIdDeatils?.type}
                  </td>
                  <td>
                    {moment(userIdDeatils?.createdAt).format("YYYY-MM-DD")}
                  </td>
                  <td>
                    {userIdDeatils?.documentValidity == ""
                      ? "-"
                      : moment(userIdDeatils?.documentValidity).format(
                          "YYYY-MM-DD"
                        )}
                  </td>
                </tbody>
              </table>
            </div>
            {amountMatched && (
              <div
                className="form-check mt-4 align-items-center"
                id="confirm-check-div"
              >
                <input
                  type="checkbox"
                  id="confirm-check-input"
                  className="form-check-input"
                  style={{ height: "20px", width: "20px" }}
                  checked={isChecked}
                  onChange={(e) => handlePopupCheckboxClick(e)}
                />
                <label
                  for="confirm-check-input"
                  className="form-check-label"
                  style={{ marginLeft: "28px" }}
                >
                  Mark verify and continue?
                </label>
              </div>
            )}

            <div className="row d-flex justify-content-end mt-3 border-top">
              <div className="col-lg-4">
                <Button
                  className="m-0 mt-3 w-auto btn btn-default d-block ms-auto"
                  variant="contained"
                  color="primary"
                  disabled={!isConfirmed}
                  onClick={confirmTransaction}
                >
                  Mark Confirmed
                </Button>
              </div>
              <div className="col-lg-3">
                <Button
                  className="m-0 mt-3"
                  variant="outlined"
                  onClick={handleConfirmCloseModal}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {/* mark transaction delivered */}
      <Modal open={openMarkDeliverdModel} onClose={handleCloseDelivery}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
            <h5>Are you sure to mark transaction delivered?</h5>{" "}
            {/* Header Title */}
            <div onClose={handleCloseDelivery} className="pointer">
              <CloseIcon />
            </div>
          </div>

          <div className="row d-flex justify-content-end mt-3">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={markDeliverd}
              >
                Mark Delivered
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleCloseDelivery}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* assign to partner bank  */}
      <Modal open={assignPartnerOpenModel} onClose={handleCloseBankModel}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-2 d-flex justify-content-between">
            <h5 className="">Todays Total Transaction:</h5> {/* Header Title */}
            <div onClick={handleCloseBankModel} className="pointer">
              <CloseIcon />
            </div>
          </div>

          <div className="">
            <div className="row viewModal">
              <div>
                <div className="col-lg-12 my-2 px-0">
                  <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                    Assign Partner Bank?
                  </div>
                  <Form.Select
                    aria-label="Default select example"
                    value={SelectedBank}
                    onChange={handleBankChange}
                  >
                    <option>Select Bank</option>
                    {getAllPartnerBanks &&
                      getAllPartnerBanks.map((row) => (
                        <option key={row.id} value={row.id}>
                          {row.name} {`(${row.availableBalance})`}
                        </option>
                      ))}
                  </Form.Select>
                  {error && !SelectedBank && (
                    <small className="responsiveFontLarge text-danger error_message ms-2 error">
                      Please select bank
                    </small>
                  )}
                  {showMessge && (
                    <div
                      className="form-check mt-4 align-items-center"
                      id="confirm-check-div"
                    >
                      <input
                        type="checkbox"
                        id="confirm-check-input"
                        className="form-check-input"
                        style={{ height: "20px", width: "20px" }}
                        checked={isCheckedBalance}
                        onChange={(e) => setIsBalanceChecked(e.target.checked)}
                      />
                      <small
                        for="confirm-check-input"
                        className="text-danger"
                        style={{ marginLeft: "28px", color: "red" }}
                      >
                        Allow transaction in negative balance?
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end align-items-center mt-3 border-top">
            <div className="col-lg-5">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                disabled={showMessge ? !isCheckedBalance : false}
                onClick={
                  showMessge ? openAssignConfirmModel1 : handleAssignBank
                }
              >
                Assign Partner
              </Button>
            </div>
            <div className="col-lg-4">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleCloseBankModel}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* mark SMR  */}
      <Modal open={handleOpenSmr} onClose={handleCloseMarkSmr}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "60%", md: "60%", lg: "60%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
            <h5>Mark SMR Transaction</h5> {/* Header Title */}
            <div onClose={handleCloseMarkSmr} className="pointer">
              <CloseIcon />
            </div>
          </div>

          <div className="">
            <div className="row viewModal">
              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2  mb-2 text-black d-flex">
                  Reason
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Reason"
                  onChange={(e) => setMarkSmrReson(e.target.value)}
                />
                {error && !markSmrReson && (
                  <small className="responsiveFontLarge   text-danger error_message ms-2 error checkboxError">
                    Please Enter Reason
                  </small>
                )}
              </div>
              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2  mb-2 text-black d-flex">
                  Type
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type"
                  onChange={(e) => setMarkSmrType(e.target.value)}
                />
                {error && !mrkSmrType && (
                  <small className="responsiveFontLarge   text-danger error_message ms-2 error checkboxError">
                    Please Enter SMR Type{" "}
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end mt-3 border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={handleMarkSmrTransaction}
              >
                Mark SMR
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleCloseMarkSmr}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* invoiceModel */}
      <div className="row expanded d-none my-5">
        <main className="columns">
          <div className="inner-container">
            <section className="row">
              <div className="callout large invoice-container " ref={printRef}>
                <table className="invoice w-100">
                  <tbody className="p-4">
                    <tr className="header">
                      <td className="">
                        <img
                          src={logo2}
                          alt="LegalRemit"
                          height={70}
                          width={170}
                        />
                      </td>
                      <td className="m-0 p-0 w-50">
                        <h3 className="mb-0 text-end pe-3 purpleText">
                          Transaction Details
                        </h3>
                      </td>
                    </tr>
                    <tr className="intro border-bottom">
                      <td className="">
                        <div className="d-flex justify-content-start">
                          <div>Tel: </div> &nbsp;{" "}
                          <div>
                            {TransactionDataById &&
                            TransactionDataById.phoneCode == null
                              ? ""
                              : TransactionDataById.phoneCode +
                                TransactionDataById.phone}
                          </div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-start">
                          <div>Email :</div> &nbsp;{" "}
                          <div>{TransactionDataById.senderEmail}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-start">
                          <div>ABN : </div> &nbsp; <div> -</div>
                        </div>
                      </td>

                      <td className="">
                        <div className="d-flex justify-content-end">
                          <div>Date: </div> &nbsp;
                          <div>{formattedDate}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div>Transaction No.: </div> &nbsp;{" "}
                          <div> {TransactionDataById.transactionNo}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div>Customer ID: </div> &nbsp;{" "}
                          <div> {TransactionDataById.customerId}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div className="purpleText d-flex">Control No: </div>
                          <div className="ps-2">
                            {TransactionDataById &&
                              TransactionDataById.controlNo}{" "}
                          </div>{" "}
                        </div>
                      </td>
                    </tr>
                    <tr className="header border-bottom">
                      <td>
                        <section className="additional-info">
                          <div className="row">
                            <div className="columns">
                              <h5 className="text-info mb-3">Sender</h5>
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">Name: </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-6 ps-0">
                                  {TransactionDataById &&
                                  TransactionDataById.userName
                                    ? TransactionDataById.userName
                                    : TransactionDataById.fullName
                                    ? TransactionDataById.fullName
                                    : TransactionDataById.businessName}
                                </div>
                              </div>
                              <br />
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">Country: </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {TransactionDataById &&
                                    TransactionDataById.sendingCountryName}
                                </div>
                              </div>
                              <br />
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">State: </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {TransactionDataById &&
                                    TransactionDataById.senderState}
                                </div>
                              </div>
                              <br />
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">Address: </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {TransactionDataById &&
                                    TransactionDataById.senderAddress}
                                </div>
                              </div>
                              <br />
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">
                                  Contact No. :{" "}
                                </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {TransactionDataById &&
                                    TransactionDataById.senderPhone}
                                </div>
                              </div>
                              <br />
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">Email: </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {TransactionDataById &&
                                    TransactionDataById.senderEmail}
                                </div>
                              </div>
                              <br />
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">Purpose: </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {TransactionDataById &&
                                    TransactionDataById.transferPurpose}
                                </div>
                              </div>
                              <br />
                            </div>
                          </div>
                        </section>
                      </td>
                      <td className="d-block">
                        <section className="additional-info">
                          <div className="row">
                            <div className="columns ps-5 ms-3">
                              <h5 className="text-info mb-3">Reciever</h5>
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">Name: </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {TransactionDataById &&
                                    TransactionDataById.recipientName}{" "}
                                </div>
                              </div>
                              <br />
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">Relation: </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {" "}
                                  {TransactionDataById.relation}{" "}
                                </div>
                              </div>
                              <br />
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">Country: </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {TransactionDataById.recevingCountryName}
                                </div>
                              </div>
                              <br />
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">Address: </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {TransactionDataById.recipientCity}
                                </div>
                              </div>
                              <br />
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">
                                  Contact No :{" "}
                                </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {TransactionDataById.recipientPhone}
                                </div>
                              </div>
                              <br />
                              <div className="d-flex">
                                <div className="col-lg-3 ps-0">Method: </div>{" "}
                                &nbsp;{" "}
                                <div className="col-lg-8 ps-0">
                                  {TransactionDataById.deliveryMethodName}
                                </div>
                              </div>
                              <br />
                              <br />
                            </div>
                          </div>
                        </section>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table className="bg-white pt-2 w-100">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th colspan="4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="bolder border-right" colspan="4">
                        Money To Send
                      </td>
                      <td className="item-stock">
                        {TransactionDataById.amount}&nbsp;
                        {TransactionDataById.sendingCurrencyCode}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="bolder border-right" colspan="4">
                        Money To Recieve
                      </td>
                      <td className="item-stock">
                        {TransactionDataById.receivingAmount}&nbsp;
                        {TransactionDataById.recevingCurrencyCode}
                      </td>
                    </tr>
                    <tr>
                      <td className="bolder border-right" colspan="4">
                        Exchange Rate
                      </td>
                      <td className="item-stock">
                        {TransactionDataById.exchangeRate}&nbsp;
                        {TransactionDataById.recevingCurrencyCode}
                      </td>
                    </tr>
                    <tr>
                      <td className="bolder border-right" colspan="4">
                        Service Charge
                      </td>
                      <td className="item-stock">
                        {TransactionDataById.serviceCharge}&nbsp;
                        {TransactionDataById.sendingCurrencyCode}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="bolder border-right" colspan="4">
                        GST
                      </td>
                      <td className="item-stock">
                        0.00&nbsp;{TransactionDataById.sendingCurrencyCode}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="text-offset border-top">
                      <td colspan="4" className="bolder border-right">
                        Total Amount
                      </td>
                      <td>
                        {TransactionDataById.totalPayable}&nbsp;
                        {TransactionDataById.sendingCurrencyCode}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
      {/* resolve model  */}
      <Modal open={ResolveModel} onClose={handleCloseResolveModel}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-2 d-flex justify-content-between">
            <h5 className=""> Resolve and Release :</h5> {/* Header Title */}
            <div onClick={handleCloseResolveModel} className="pointer">
              <CloseIcon />
            </div>
          </div>

          <div className="">
            <div className="row">
              <div>
                <div className="col-lg-12 my-2 px-0">
                  <div className="col-lg-12 my-2">
                    <div className="font-weight-normal m-2 mb-3 text-black d-flex">
                      Note
                    </div>
                    <textarea
                      type="textarea"
                      className="form-control"
                      placeholder="Note"
                      rows="3"
                      onChange={(e) => setNoteDescription(e.target.value)}
                    />
                    {error && !noteDescription && (
                      <small className="responsiveFontLarge text-danger error_message ms-2 error">
                        Please Enter Note
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end align-items-center mt-3 border-top">
            <div className="col-lg-5">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={() => resolveTransaction()}
              >
                Resolve and Release
              </Button>
            </div>
            <div className="col-lg-4">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleCloseResolveModel}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* update successmode */}
      <ModalComponent
        show={modalShow}
        title11={"Update successfully"}
        onHide={() => handleCloseDelete()}
      />
      <ModalComponentPopup
        show={showPopup}
        title1={"Amount matched name do not matched do you want to proceed?"}
        cancle={(e) => handleCancelPoup(e)}
        SavePr={() => handleOkClick()}
      />
    </>
  );
};
export default Transactionsub;
