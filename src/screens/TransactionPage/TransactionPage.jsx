import React, { useEffect, useState, useRef } from "react";
import "./TransactionPage.scss";
import {
  Container,
  Form,
  Row,
  Dropdown,
  Col,
} from "react-bootstrap";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import clock from "../../assets/images/mdi_clock-fast.svg";
import Delivered from "../../assets/images/Delivered.svg";
import unconfirmed from "../../assets/images/unconfirmed.svg";
import SubmitTrans from "../../assets/images/Layer_1.svg";
import Cancle from "../../assets/images/Cancle.svg";
import bin from "../../assets/images/deletBg.svg";
import invoice from "../../assets/images/basil_invoice-solid.svg";
import leftArr from "../../assets/images/leftRoundedArrow.svg";
import refresh from "../../assets/images/refresh.svg";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import backA from "../../assets/images/BackArrow.svg";
import bankIcon from "../../assets/images/mdi_bank.svg";
import drpa from "../../assets/images/drparrw.svg";
import Modal from "react-bootstrap/Modal";
import moment from 'moment';
import {
  Button,
  MenuItem,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../Loader/Loader";
import plus from "../../assets/images/PlusBG.svg";
import html2pdf from "html2pdf.js";
import logo2 from '../../assets/images/logo2.png'
import { useLocation } from "react-router-dom";
import { HourglassBottom } from '@mui/icons-material';

export default function TransactionPage() {
  const location = useLocation();
  const history = useNavigate();
  const [TransactionData, setTransactionData] = useState([]);
  const [TransactionDataById, setTransactionDataById] = useState([]);
  const [ReciptionDetails, setReciptionDetails] = useState([]);
  const [ControlledNumber, setControlledNumber] = useState('')
  const [DownloadPdf, setDownloadPdf] = useState(false)
  const [formattedDate, setformattedDate] = useState('')
  const [VerifyRefralPOPUP, setVerifyRefralPOPUP] = useState(false)
  const [SendMoneyDetailsMessage, setSendMoneyDetailsMessage] = useState('')
  const [SendMoneyDetailsStatus, setSendMoneyDetailsStatus] = useState(0)
  const [SendMoneyDocumentStatus, setSendMoneyDocumentStatus] = useState(0)
  // console.log(ControlledNumber,"")
  const [RequestChangetoadmin, setRequestChangetoadmin] = useState(false);

  const [selectedOption, setSelectedOption] = useState("All");
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputFields2, setInputFields2] = useState([{ FullName: "" }]);

  const handleFormChangeCashPickup = (index, event) => {
    const { name, value } = event.target;
    const fields = [...inputFields2];
    fields[index][name] = value;
    setInputFields2(fields);
  };

  const printRef = useRef();

  const handlePrint = () => {
    const element = printRef.current;
    const opt = {
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        // format: "a4",
        orientation: "portrait", // A4 size options
        // Explicitly set width and height for A4 size
        format: [210 , 370], // Width and height in millimeters
      },
    };

    html2pdf().from(element).set(opt).save();
  };

  useEffect(() => {
    GetAllCountrys()
  }, [])

  useEffect(() => {
    if (DownloadPdf == true) {
      handlePrint()
      setDownloadPdf(false)
    }
  }, [DownloadPdf])

  const handleViewInvById = async (Tid) => {
    try {
      setloadervalue(true)
      const payload = {
        id: Tid
      };
      await axios.post(
        CommonConstants.NEW_BASE_URL + "/gettransactionbyid",
        payload
      ).then((response) => {
        setTransactionDataById(response.data.data);
        setControlledNumber(response.data.data.controlNo);
        setformattedDate(moment(new Date()).format("DD/MM/YYYY"))
        handleViewReciption(response.data.data.recipientId)
        setloadervalue(false)
        // console.log('object', response.data.data);
      }).catch((err) => { console.log(err) })


    } catch (error) {
      console.log(error);
    }
  }

  const handleViewReciption = async (Tid) => {
    try {
      await axios.post(
        CommonConstants.BASE_URL + "/getrecipientsbyid",
        { id: Tid }
      ).then((R_Details) => {
        setDownloadPdf(true)
        return setReciptionDetails(R_Details.data.data)

        // console.log(R_Details,"Reciption")
      }).catch(err => console.log(err))

    } catch (error) {
      console.log(error);
    }
  }
  // console.log('trans',TransactionDataById,ControlledNumber);


  const removeFieldCashPickup = (index) => {
    const fields = [...inputFields2];
    fields.splice(index, 1);
    setInputFields2(fields);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRefund = (transactionNo) => {
    navigate({
      pathname: "/refunds-page",
      state: transactionNo
    });
    setAnchorEl(null);
  };

  const [ReciverCountry, setReciverCountry] = useState();

  const handleDropdownSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };
  const [CountPage, SetCountPage] = React.useState(0);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(50);
  const [numItems, SetNumItems] = React.useState(0);

  const [SuccessTransaction, setSuccessTransaction] = useState(false)
  const [SuccessupdateStatus, setSuccessupdateStatus] = useState(false)
  const [loadingimageset, setloadingimageset] = useState(false)
  // console.log(location.state?.TransactionId,"location.state?.TransactionId")
  useEffect(() => {
    getAllTransaction();
    GetUserDetails();
    if(location.state && location.state?.TransactionId){
      if(SuccessupdateStatus == false){
        try {
          const payload = {
            id: location.state?.TransactionId
          };
          axios.post(
            CommonConstants.NEW_BASE_URL + "/gettransactionbyid",
            payload
          ).then((response) => {
            if (response.data.status == true && response.data.statuscode == 200) {
              const paymentMethods = ["Pay To", "Debit Card", "Credit Card"]
              if (paymentMethods.includes(response.data.data.paymentMethod)) {
                if (response.data.data?.transactionStatus == "Unconfirmed" || response.data.data?.transactionStatus == "Confirmed" || response.data.data?.transactionStatus == "Processing") {
                  setloadingimageset(true)
                  const initialApiCallTimeout = setTimeout(() => {
                    AutoMaticRedirectionTransactioncall();
                    const intervalId = setInterval(getAllTransactionReflact, 60000);
                    clearTimeout(initialApiCallTimeout);
                    return () => {
                      clearInterval(intervalId);
                    };
                  }, 5000);
                } else {
                  setSuccessupdateStatus(true)
                  const timer = setInterval(getAllTransactionReflact, 60000);
                  setloadingimageset(true)
                  return () => clearInterval(timer);
                }
              }
            }
          }).catch((err) => {
            console.log(err)
          })
        } catch (error) {
          console.log(error);
        }
      } else {
        const timer = setInterval(getAllTransactionReflact, 60000);
        return () => clearInterval(timer);
      }

    } else {
      const timer = setInterval(getAllTransactionReflact, 60000);
      return () => clearInterval(timer);
    }
  }, [Page, RowsPerPage]);


  const AutoMaticRedirectionTransactioncall = async() => {
    try {
      setloadervalue(true)
      const payload = {
        id: location.state?.TransactionId
      };
      await axios.post(
        CommonConstants.NEW_BASE_URL + "/gettransactionbyid",
        payload
      ).then((response) => {
        if(response.data.status == true && response.data.statuscode == 200){
            if(response.data.data?.transactionStatus != "Unconfirmed"){
              setloadingimageset(true)
              setSuccessupdateStatus(true)
              setloadervalue(false)
              const index = TransactionData.findIndex(item => item.id === response.data.data?.id);
              if (index !== -1) {
                const updatedItems = [...TransactionData];
                updatedItems.splice(index, 1, response.data.data);
                setTransactionData(updatedItems);

              }
              getAllTransactionReflact1()
            }else{
              setloadervalue(false)
              setSuccessupdateStatus(true)
            }
        }
      }).catch((err) => {
         console.log(err)
        })
  }catch(err){
    console.log(err,"Error")
  }
  }

  const getAllTransaction = async () => {
    try {
      setloadervalue(true)
      const payload = {
        userId: localStorage.getItem("Id"),
        pageindex: Page, // page,
        pagesize: RowsPerPage, //RowsPerPage,
        status: "",
        searchdata: "",
        sortparam: "create_at",
        sortorder: "DESC",
      };

      const response = await axios.post(
        CommonConstants.NEW_BASE_URL + "/gettransactionsbyuserid",
        payload
      );
      setTransactionData(response.data.data);
      SetCountPage(response.data?.totalPageCount);
      SetNumItems(response.data.recordCount);
      setloadervalue(false)
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTransactionReflact = async () => {
    try {
      const payload = {
        userId: localStorage.getItem("Id"),
        pageindex: Page, // page,
        pagesize: RowsPerPage, //RowsPerPage,
        status: "",
        searchdata: "",
        sortparam: "create_at",
        sortorder: "DESC",
      };

      const response = await axios.post(
        CommonConstants.NEW_BASE_URL + "/gettransactionsbyuserid",
        payload
      );
      setTransactionData(response.data.data);
      SetCountPage(response.data?.totalPageCount);
      SetNumItems(response.data.recordCount);
      setloadingimageset(false)
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(loadingimageset,"loadingimageset")
  
  const getAllTransactionReflact1 = async () => {
    try {
      const payload = {
        userId: localStorage.getItem("Id"),
        pageindex: Page, // page,
        pagesize: RowsPerPage, //RowsPerPage,
        status: "",
        searchdata: "",
        sortparam: "create_at",
        sortorder: "DESC",
      };

      const response = await axios.post(
        CommonConstants.NEW_BASE_URL + "/gettransactionsbyuserid",
        payload
      );
      setTransactionData(response.data.data);
      SetCountPage(response.data?.totalPageCount);
      SetNumItems(response.data.recordCount);
      setloadingimageset(true)
    } catch (error) {
      console.log(error);
    }
  };

  const [UserInfo, setUserInfo] = useState([]);
  const [Address, setAddress] = useState([]);
  const [State, setState] = useState([]);
  const [U_Country, setU_Country] = useState([]);
  const [UserInfoKyc, setUserInfoKyc] = useState([]);

  const GetUserDetails = async () => {
    try {
      const userId = {
        id: localStorage.getItem("Id"),
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getuserinfobyid",
        userId
      );
      if (response.data.status === true) {
        setUserInfo(response.data.data);
        setState(response.data.data.userkycdetails.stateName)
        setUserInfoKyc(response.data.data.userkycdetails)

        const Country = await axios.get(
          CommonConstants.BASE_URL + "/getallcountries",
          userId
        );
        var data = Country.data.data.filter((item) => item.id == response.data.data.countryId)
        // console.log(data[0].currency)
        // setSenderCountryCurrency(data[0].currency)
      }
    } catch (err) { }
  };

  const DeleteTransaction = async (D_id) => {
    try {
      setloadervalue(true)
      const payload = {
        id: TransactionIdforCancle, //transaction id
      };

      const response = await axios.post(
        CommonConstants.NEW_BASE_URL + "/hiddentransaction",
        payload
      );
      if (response.data.status == true) {
        setDeleteTransactionPopup(false)
        getAllTransaction()
      }
      // setTransactionData(response.data.data);
      // SetCountPage(response.data?.totalPageCount);
      // SetNumItems(response.data.recordCount);
      setloadervalue(false)
    } catch (error) {
      console.log(error);
    }
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
    }
  };

  const [selectedValue, setSelectedValue] = useState(50);

  const ChangeRowSelected = (Event) => {
    setSelectedValue(Event);
    SetRowsPerPage(Number(Event));
    SetPage(1);
  };

  const [loadervalue, setloadervalue] = useState(false);
  const [dropdownStateU, setDropdownStateU] = useState(false);
  const [dropdownValueU, setDropdownValueU] = useState("");
  const [Methodname, setMethodname] = useState("");
  const [MethodId, setMethodId] = useState("");
  const [isVisibleDynamicU, setIsVisibleDynamicU] = useState("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState();
  const [getAllDeliveryMethod, setgetAllDeliveryMethod] = useState([]);
  const [UpdateUserData, setUpdateUserData] = useState({});
  const [UBanks, setUBanks] = useState([]);
  const [Uselected, setUselected] = useState("IFSC");
  const [CancleTransactionPopup, setCancleTransactionPopup] = useState(false);
  const [CancleRequestChangetoadmin, setCancleRequestChangetoadmin] = useState(false);
  const [DeleteTransactionPopup, setDeleteTransactionPopup] = useState(false);
  const [TransactionIdforCancle, setTransactionIdforCancle] = useState(false);
  const [adminRelation, setAdminRelation] = useState();
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
  const [show7, setShowRec7] = useState(false);
  const CloseUpdate = () => setShowRec7(false);
  const ShowUpdate = () => setShowRec7(true);

  const handleDropdownClickU = () => {
    setDropdownStateU(!dropdownStateU);
  };
  const toggleVisibilityDynamicU = (value) => {
    setIsVisibleDynamicU(value);
  };
  const handleSetDropdownValueU = (value, methodname, methodid) => {
    // console.log(value, "value");
    setDropdownValueU(value);
    setDropdownStateU(!dropdownStateU);
    setMethodId(methodid);
    setMethodname(methodname);
    GetAllBanks(methodid)
  };
  const UpdateFieldsReciptionDetails = () => {
    let newfield = { FullName: "" };

    setInputFields2([...inputFields2, newfield]);
  };
  const handleUpdateRecieverValue = (e) => {
    const { name, value } = e.target;
    setstep2UpdateSendMoneyvalue({
      ...step2UpdateSendMoneyvalue,
      [name]: value,
    });
  };
  const UchangeHandler = (e) => {
    setUselected(e.target.value);
  };
  const handleEditReciption = (ReciptionId, RecivingCountry) => {
    // debugger
    // console.log(ReciptionId , RecivingCountry , "USSS")
    GetAllState(RecivingCountry)
    getRelation()
    setReciverCountry(RecivingCountry)
    UpdateReciever(ReciptionId, RecivingCountry)
  }
  const GetAllDeliveryMethod = async (R_country, method, methodid) => {
    try {
      const data = {
        toCountryId: R_country,
        userType: method
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallactivedeliverymethods",
        data
      );
      if (response.data.status === true) {
        setgetAllDeliveryMethod(response.data.data);
        var SelectedDelivery = response.data.data.filter((Delivery) => Delivery.id === methodid)
        setMethodname(SelectedDelivery[0].name)
        setMethodId(SelectedDelivery[0].id)
      } else if (response.data.status === false) {
      }
    } catch (err) { }
  };
  const GetUpdateBanks = async (id, idd2) => {
    try {
      // debugger
      const type = {
        "countryId": id,
        "deliveryTypeId": idd2
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getactivetransactiondeliverymethods",//getallbank replace -- getactivetransactiondeliverymethods
        type
      );
      if (response.data.status === true) {
        setUBanks(response.data.data);
        // console.log(response.data.data)
      }
    } catch (err) {
    }
  };
  const GetAllBanks = async (values) => {
    try {
      const type = {
        "countryId": ReciverCountry,
        "deliveryTypeId": values
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getactivetransactiondeliverymethods",//getallbank replace -- getactivetransactiondeliverymethods
        type
      );
      if (response.data.status === true) {
        setUBanks(response.data.data);
      }
    } catch (err) {
    }
  };
  const UpdateReciever = async (UID, RecivingCountry) => {
    try {
      const userId = {
        id: UID,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getrecipientsbyid",
        userId
      );

      if (response.data.status === true) {

        GetUpdateBanks(RecivingCountry, response.data.data.deliveryMethodId)
        // setInputFields2(response.data.data.fullName)
        setUDeliveryName(response.data.data?.deliveryMethodName)
        setUWalletName(response.data.data?.walletName)

        const fullNameArray = response.data.data.fullName
          .substring(1, response.data.data.fullName.length - 1)
          .split(",");

        // console.log(fullNameArray, "fullNameArray")

        var EdittempArray2 = [];
        fullNameArray.map((JointName, index) => {
          EdittempArray2.push({
            FullName: JointName
          });
        });
        setInputFields2(EdittempArray2);
        // setIsVisibleDynamicU(response.data.data.deliveryMethodName);

        if (response.data.data.type == "individual") {
          let Method = 'individual'
          GetAllDeliveryMethod(response.data.data.countryId, Method, response.data.data.deliveryMethodId)
        } else if (response.data.data.type == "business") {
          let Method = 'business'
          GetAllDeliveryMethod(response.data.data.countryId, Method, response.data.data.deliveryMethodId)
        } else if (response.data.data.type == "joint") {
          let Method = 'joint'
          GetAllDeliveryMethod(response.data.data.countryId, Method, response.data.data.deliveryMethodId)
        }

        // console.log(response.data.data, "UserDetails");
        setUpdateUserData(response.data.data);
        setMethodId(response.data.data.deliveryMethodId);
        setMethodname(response.data.data.deliveryMethodName);
        ShowUpdate();
        // var FilterMethodName=getAllDeliveryMethod.map((val) => response.data.data.deliveryMethodName == val.name)
        setIsVisibleDynamicU(response.data.data.deliveryMethodName);
        setSelectedDeliveryMethod(response.data.data.type);
        const checkIFSC = response.data.data.haveIfscCode;
        // GetUpdateBanks(response.data.data.countryId,response.data.data.deliveryMethodId)
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
    } catch (err) { }
  };

  const [getState, setgetState] = useState();

  const GetAllState = async (Rec_Id) => {
    try {
      const userId = {
        id: Rec_Id,
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
    } catch (err) { }
  };

  const getRelation = async () => {
    const Relation = await axios.get(
      CommonConstants.BASE_URL + "/getactiverelations"
    );
    setAdminRelation(Relation.data.data);
  };

  const [UWalletName,setUWalletName] = useState("")
  const [UDeliveryName,setUDeliveryName] = useState("")

  const handleUpdateWalletname = (e) =>{
    const Walletid = e.target.value;
    var selectedWallet = UBanks?.find((item)=> item?.id == Walletid)
    setUWalletName(selectedWallet?.text)
  }

  const UpdateindividualReciever = async () => {
    try {
      const URecieverData = {
        user_Recipients :{
        id: UpdateUserData.id,
        groupId: +localStorage.getItem("Id"),
        userId: +localStorage.getItem("Id"),
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
        countryId: ReciverCountry,
        stateId: step2UpdateSendMoneyvalue.Us,
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
        bankDetailsVerified: false,
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
        // GetAllReciever();
        getAllTransaction()
        CloseUpdate();
      } else if (response.data.status === "error") {
        console.log(response.data.message);
      }
    } catch (err) { }
  };

  ///////Joint//////
  const [FullnameArray, setFullnameArray] = useState([])

  const submit = (e) => {
    e.preventDefault();
    if (inputFields2[0].FullName == "" || inputFields2[0].FullName == undefined) {
      // setInvalid(true)
    } else {
      setFullnameArray(inputFields2);
    }
  };

  const UpdateJointReciever = async () => {
    try {
      let FullnameArr = [];
      FullnameArray.map((val) => {
        FullnameArr.push(val.FullName)
      })

      const UJointRecieverData = {
        user_Recipients :{
        id: UpdateUserData.id,
        groupId: +localStorage.getItem("Id"),
        userId: +localStorage.getItem("Id"),
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
        countryId: ReciverCountry,
        stateId: step2UpdateSendMoneyvalue.UState,
        postalCode: step2UpdateSendMoneyvalue.UPostalCode,
        city: step2UpdateSendMoneyvalue.UCity,
        deliveryMethodId: MethodId,
        deliverymethodname: Methodname,
        bankName: step2UpdateSendMoneyvalue.UBankName,
        bankId: UDeliveryName == "Wallet Deposit" ?  +step2UpdateSendMoneyvalue.UwalletName : UDeliveryName == "Bank Deposit" ? +step2UpdateSendMoneyvalue.UBankName : 0, 
        bankAccNo: UDeliveryName == "Bank Deposit" ? step2UpdateSendMoneyvalue.UBankAccountNumber : "",
        // haveIfscCode: selected2 === "IFSC" ? true : false,
        ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
        bankStateId: step2UpdateSendMoneyvalue.UBankState,
        district: step2UpdateSendMoneyvalue.UDistrict,
        bankBranch: step2UpdateSendMoneyvalue.UBranch,
        bankDetailsVerified: false,
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
        getAllTransaction()
        CloseUpdate();
      } else if (response.data.status === "error") {
        console.log(response.data.message);
      }
    } catch (err) { }
  };

  ///////Business//////

  const UpdateBusinessReciever = async () => {
    try {
      const UBusinessRecieverData = {
        user_Recipients :{
        id: UpdateUserData.id,
        groupId: +localStorage.getItem("Id"),
        userId: +localStorage.getItem("Id"),
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
        countryId: ReciverCountry,
        stateId: step2UpdateSendMoneyvalue.UState,
        postalCode: step2UpdateSendMoneyvalue.UPostalCode,
        city: step2UpdateSendMoneyvalue.UCity,
        deliveryMethodId: MethodId,
        deliverymethodname: Methodname,
        bankName: step2UpdateSendMoneyvalue.UBankName,
        bankId: UDeliveryName == "Wallet Deposit" ?  +step2UpdateSendMoneyvalue.UwalletName : UDeliveryName == "Bank Deposit" ? +step2UpdateSendMoneyvalue.UBankName : 0, 
        bankAccNo: UDeliveryName == "Bank Deposit" ? step2UpdateSendMoneyvalue.UBankAccountNumber : "",
        haveIfscCode: Uselected === "IFSC" ? true : false,
        ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
        bankStateId: 0,
        district: step2UpdateSendMoneyvalue.UDistrict,
        bankBranch: step2UpdateSendMoneyvalue.UBranch,
        bankDetailsVerified: false,
        otherDetails: "", //remaining
        oldRecipientsId: 0,
        walletName: UDeliveryName == "Wallet Deposit" ? UWalletName : "",
        walletNo:  UDeliveryName == "Wallet Deposit" ? step2UpdateSendMoneyvalue.UwalletNo : ""
        // zaiUserId:step2UpdateSendMoneyvalue.UzaiUserId
      },
      isAdmin: false
      };
      // console.log(UBusinessRecieverData, "UBusinessRecieverData")
      const response = await axios.post(
        CommonConstants.BASE_URL + "/updaterecipienstsbyid",
        UBusinessRecieverData
      );
      if (response.data.status === true) {
        if(response.data.data.isChangesApproved === false){
          setRequestChangetoadmin(true)
        }
        getAllTransaction()
        CloseUpdate();
      } else if (response.data.status === "error") {
      }
    } catch (err) { }
  };

  const [progress, setProgress] = useState(2); // Set the initial progress
  const [showProgressBar, setShowProgressBar] = useState(false);

  const steps = [
    "Transaction Initiated",
    "Fund Received",//"Received to bank",
    "Waiting for bank to process",
    "In Progress",
    "Delivered",
  ];
  const steps1 = [
    "Transaction Initiated",
    "Fund Received",//"Received to bank",
    "Waiting for bank to process",
    "In Progress",
    "Cancelled",
  ];

  
  // const renderSteps = (Process_Status,StatusLog) => {
  //   const DateandTime=[]
  //   var inputDate = JSON.parse(StatusLog);

  //   if(inputDate != null){
  //     inputDate.map((item)=>{
  //       if (item.status == "Draft") {
  //         DateandTime.push({subindex:1,DateAndTime:item.date})
  //       } else if (item.status == "Confirmed") {
  //         DateandTime.push({subindex:2,DateAndTime:item.date})
  //       } else if (item.status == "Unconfirmed") {
  //         DateandTime.push({subindex:3,DateAndTime:item.date})
  //       } else if (item.status == "Processing") {
  //         DateandTime.push({subindex:4,DateAndTime:item.date})
  //       } else if (item.status == "Compliance Hold") {
  //         DateandTime.push({subindex:2,DateAndTime:item.date})
  //       } else if (item.status == "Pending") {
  //         DateandTime.push({subindex:3,DateAndTime:item.date})
  //       } else if (item.status == "Delivered") {
  //         DateandTime.push({subindex:5,DateAndTime:item.date})
  //       } else if (item.status == "Cancelled") {
  //         DateandTime.push({subindex:5,DateAndTime:item.date})
  //       } else if (item.status == "Refunded") {
  //         DateandTime.push({subindex:5,DateAndTime:item.date})
  //       }
  //     })
  //   }

  //   console.log(DateandTime,"DateandTime")

  //   var Process_Bar;

  //   if (Process_Status == "Draft") {
  //     Process_Bar = 1;
  //   } else if (Process_Status == "Confirmed") {
  //     Process_Bar = 2;
  //   } else if (Process_Status == "Unconfirmed") {
  //     Process_Bar = 3;
  //   } else if (Process_Status == "Processing") {
  //     Process_Bar = 4;
  //   } else if (Process_Status == "Compliance Hold") {
  //     Process_Bar = 2;//3; confirmed vise changes
  //   } else if (Process_Status == "Pending") {
  //     Process_Bar = 3;
  //   } else if (Process_Status == "Delivered") {
  //     Process_Bar = 5;
  //   } else if (Process_Status == "Cancelled") {
  //     Process_Bar = 5;
  //   } else if (Process_Status == "Refunded") {
  //     Process_Bar = 5;
  //   }

  //   if (Process_Status == "Cancelled") {
  //     return steps1.map((step, index) => {
  //       let className = "stepper-item";
  //       if (index === Process_Bar) {
  //         className += " active";
  //       } else if (index < Process_Bar) {
  //         className += " completed";
  //       }
  //       return (
  //         <div className={className} key={index}>
  //           <div className="step-counter">
  //             {index < Process_Bar ? (
  //               <i className="fa fa-check text-white" />
  //             ) : (
  //               <i className="fa fa-circle borderShadeColor" />
  //             )}
  //           </div>
  //           <div className="step-name normal fs-6 text-center">{step}</div>
  //           <div className="step-name normal fs-6 text-center">13-03-2223</div>
  //         </div>
  //       );
  //     });
  //   } else {
  //     return steps.map((step, index) => {
  //       let className = "stepper-item";
  //       if (index === Process_Bar) {
  //         className += " active";
  //       } else if (index < Process_Bar) {
  //         className += " completed";
  //       }

  //       // var SetDate = DateandTime.find((item)=> item.subindex == Process_Bar)
  //       return (
  //         <div className={className} key={index}>
  //           <div className="step-counter">
  //             {index < Process_Bar ? (
  //               <i className="fa fa-check text-white" />
  //             ) : (
  //               <i className="fa fa-circle borderShadeColor" />
  //             )}
  //           </div>
  //           <div className="step-name normal fs-6 text-center">{step}</div>
  //           <div className="step-name normal fs-6 text-center">{moment(new Date()).format("DD/MM/YYYY")}</div>
  //         </div>
  //       );
  //     });
  //   }
  // };

  const StatusLOGO =JSON.stringify([{"date": "2023-10-13 11:04:18.327000","status": "Compliance Hold"},{"date": "2023-10-11 01:04:18.127000","status": "Draft"}])
  const renderSteps = (Process_Status, StatusLog , isPaymentRecieved) => {
    const DateandTime = [];
    var inputDate = JSON.parse(StatusLog);
  
    if (inputDate != null) {
      inputDate.map((item) => {
        if (item.status == "Draft") {
          DateandTime.push({ subindex: 1, TrackIndex:0 ,DateAndTime: item.date });
        } else if (item.status == "Confirmed") {
          DateandTime.push({ subindex: 2, TrackIndex:1 ,DateAndTime: item.date });
        } else if (item.status == "Unconfirmed") {
          DateandTime.push({ subindex: 3, TrackIndex:2 ,DateAndTime: item.date });
        } else if (item.status == "Processing") {
          DateandTime.push({ subindex: 4, TrackIndex:3 ,DateAndTime: item.date });
        } else if (item.status == "Compliance Hold") {
          DateandTime.push({ subindex: 2, TrackIndex:1 ,DateAndTime: item.date });
        } else if (item.status == "Pending") {
          DateandTime.push({ subindex: 3, TrackIndex:2 ,DateAndTime: item.date });
        } else if (item.status == "Delivered") {
          DateandTime.push({ subindex: 5, TrackIndex:4 ,DateAndTime: item.date });
        } else if (item.status == "Cancelled") {
          DateandTime.push({ subindex: 5, TrackIndex:4 ,DateAndTime: item.date });
        } else if (item.status == "Refunded") {
          DateandTime.push({ subindex: 5, TrackIndex:4 ,DateAndTime: item.date });
        }
      });
    }
  
    var Process_Bar;
  
    if (Process_Status == "Draft") {
      Process_Bar = 1;
    } else if (Process_Status == "Confirmed") {
      Process_Bar = 2;
    } else if (Process_Status == "Unconfirmed") {
      Process_Bar = 1;
    } else if (Process_Status == "Processing") {
      Process_Bar = 4;
    } else if (Process_Status == "Compliance Hold") {
      Process_Bar = isPaymentRecieved ? 2 : 1 ; //3; confirmed vise changes
    } else if (Process_Status == "Pending") {
      Process_Bar = 3;
    } else if (Process_Status == "Delivered") {
      Process_Bar = 5;
    } else if (Process_Status == "Cancelled") {
      Process_Bar = 5;
    } else if (Process_Status == "Refunded") {
      Process_Bar = 5;
    }
  
    if (Process_Status == "Cancelled") {
      return steps1.map((step, index) => {
        let className = "stepper-item";
        if (index === Process_Bar) {
          className += " active";
        } else if (index < Process_Bar) {
          className += " completed";
        }
        let Ligaal=DateandTime?.find((item) => item.TrackIndex === index)?.DateAndTime
        return (
          <div className={className} key={index}>
            <div className="step-counter">
              {index < Process_Bar ? <i className="fa fa-check text-white" /> : <i className="fa fa-circle borderShadeColor" />}
            </div>
            <div className="step-name normal fs-6 text-center">{step}</div>
            <div className="step-name normal fs-6 text-center">{Ligaal ? moment(Ligaal).format("hh:mm A DD-MM-YY") : ""}</div>
          </div>
        );
      });
    } else {
      return steps.map((step, index) => {
        let className = "stepper-item";
        if (index === Process_Bar) {
          className += " active";
        } else if (index < Process_Bar) {
          className += " completed";
        }
        let Ligaal=DateandTime?.find((item) => item.TrackIndex === index)?.DateAndTime
        return (
          <div className={className} key={index}>
            <div className="step-counter">
              {index < Process_Bar ? <i className="fa fa-check text-white" /> : <i className="fa fa-circle borderShadeColor" />}
            </div>
            <div className="step-name normal fs-6 text-center">{step}</div>
            {/* <div className="step-name normal fs-6 text-center">{Ligaal ? moment(Ligaal).format("hh:mm A DD-MM-YY") : ""}</div> */}
          </div>
        );
      });
    }
  };
  

  const [Country, setCountry] = useState([]);
  const GetAllCountrys = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallcountries"
      );
      if (response.data.status === true) {
        const optionsForCountry = response.data.data.map((countryname) => ({
          name: countryname.name,
          iso2: countryname.iso2
        }));
        setCountry(optionsForCountry);
      } else if (response.data.status === false) {
      }
    } catch (err) { }
  };

  const Flag = (Name) => {
    const FlagData = Country.filter((Flagname) => Flagname?.name == Name)
    const FlagIso2 = FlagData[0]?.iso2
    return FlagIso2?.toLowerCase();
  };

  const handleDataClick = (index) => {
    // Set the progress and show the progress bar
    setProgress(index);
    setShowProgressBar(true);
  };

  const handleCancleTransaction = async () => {
    setloadervalue(true)
    var CancleData = {
      id: TransactionIdforCancle,
      userId:localStorage.getItem("Id"),
      reason: document.getElementById('reason').value
    }
    const CancleResponse = await axios.post(
      CommonConstants.NEW_BASE_URL + "/canceltransaction", CancleData
    );
    if (CancleResponse.data.status == true) {
      setloadervalue(false)
      setCancleTransactionPopup(false);
      setCancleRequestChangetoadmin(true)
      getAllTransaction()
    }
  }

  const handleSubmitTransaction = async (TransactionDetails) => {
    const data = { id: localStorage.getItem("Id") };

    const response = await axios.post(
      CommonConstants.BASE_URL + "/getuserinfobyid",
      data
    );
    // console.log(response.data.data,"User info")
    if (response.data.data.role == "Individual" || response.data.data.role == "Business") {
      if (response.data.status === true) {
        var UserInfo = response.data.data
        if ((UserInfo?.iddetails?.typeId == "" || UserInfo?.iddetails?.documentNumber == "" || UserInfo?.iddetails?.dob == "" || UserInfo?.iddetails?.documentValidity == "" || UserInfo?.iddetails?.issuingAuthority == "") && (UserInfo?.userkycdetails?.streetName == "" || UserInfo?.userkycdetails?.stateId == "" || UserInfo?.userkycdetails?.nationality == "" || UserInfo?.userkycdetails?.suburb == "" || UserInfo?.userkycdetails?.postalCode == "" || UserInfo?.userkycdetails?.occupationId == "") && (UserInfo?.role == 'Business' && (UserInfo?.businessDetails?.companyName == "" || UserInfo?.businessDetails?.noDirector == 0 || UserInfo?.businessDetails?.noEmployee == "" || UserInfo?.businessDetails?.targetBusiness == "" || UserInfo?.businessDetails?.expectedRemittance == "" || UserInfo?.businessDetails?.noOfTranscation == 0))) {
          setVerifyRefralPOPUP(true)
          setSendMoneyDetailsStatus(1)
          setSendMoneyDetailsMessage('Your Business Details , KYC Details and ID Details are missing ,please fill missing data to proceed transactions.')

          if ((UserInfo?.idDocuments?.length === 0) && (UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0 || UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(1)
          } else if (UserInfo?.idDocuments?.length === 0) {
            setSendMoneyDocumentStatus(2)
          } else if ((UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0) || (UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(3)
          }

        } else if (UserInfo?.role == 'Business' && (UserInfo?.businessDetails?.companyName == "" || UserInfo?.businessDetails?.noDirector == 0 || UserInfo?.businessDetails?.noEmployee == "" || UserInfo?.businessDetails?.targetBusiness == "" || UserInfo?.businessDetails?.expectedRemittance == "" || UserInfo?.businessDetails?.noOfTranscation == 0)) {
          setVerifyRefralPOPUP(true)
          setSendMoneyDetailsStatus(4)
          setSendMoneyDetailsMessage('Your business Details are missing ,please fill missing data to proceed transactions.')

          if ((UserInfo?.idDocuments?.length === 0) && (UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0 || UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(1)
          } else if (UserInfo?.idDocuments?.length === 0) {
            setSendMoneyDocumentStatus(2)
          } else if ((UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0) || (UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(3)
          }

        } else if ((UserInfo?.iddetails?.typeId == "" || UserInfo?.iddetails?.documentNumber == "" || UserInfo?.iddetails?.dob == "" || UserInfo?.iddetails?.documentValidity == "" || UserInfo?.iddetails?.issuingAuthority == "") && (UserInfo?.userkycdetails?.streetName == "" || UserInfo?.userkycdetails?.stateId == "" || UserInfo?.userkycdetails?.nationality == "" || UserInfo?.userkycdetails?.suburb == "" || UserInfo?.userkycdetails?.postalCode == "" || UserInfo?.userkycdetails?.occupationId == "")) {
          setVerifyRefralPOPUP(true)
          setSendMoneyDetailsStatus(1)
          setSendMoneyDetailsMessage('Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions.')

          if ((UserInfo?.idDocuments?.length === 0) && (UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0 || UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(1)
          } else if (UserInfo?.idDocuments?.length === 0) {
            setSendMoneyDocumentStatus(2)
          } else if ((UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0) || (UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(3)
          }

        } else if (UserInfo?.userkycdetails?.streetName == "" || UserInfo?.userkycdetails?.stateId == "" || UserInfo?.userkycdetails?.nationality == "" || UserInfo?.userkycdetails?.suburb == "" || UserInfo?.userkycdetails?.postalCode == "" || UserInfo?.userkycdetails?.occupationId == "") {
          setVerifyRefralPOPUP(true)
          setSendMoneyDetailsStatus(2)
          setSendMoneyDetailsMessage('Your KYC details Details are missing. please fill missing data to proceed transactions.')
          if ((UserInfo?.idDocuments?.length === 0) && (UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0 || UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(1)
          } else if (UserInfo?.idDocuments?.length === 0) {
            setSendMoneyDocumentStatus(2)
          } else if ((UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0) || (UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(3)
          }
        } else if ((UserInfo?.iddetails?.typeId == "" || UserInfo?.iddetails?.documentNumber == "" || UserInfo?.iddetails?.dob == "" || UserInfo?.iddetails?.documentValidity == "" || UserInfo?.iddetails?.issuingAuthority == "") && UserInfo?.isDigital === false) {
          setVerifyRefralPOPUP(true)
          setSendMoneyDetailsStatus(3)
          setSendMoneyDetailsMessage('Your Id Details are missing. please fill missing data to proceed transactions.')
          if ((UserInfo?.idDocuments?.length === 0) && (UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0 || UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(1)
          } else if (UserInfo?.idDocuments?.length === 0) {
            setSendMoneyDocumentStatus(2)
          } else if ((UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0) || (UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(3)
          }
        } else if (UserInfo?.role == 'Business' && (UserInfo?.businessDetails?.companyName == "" || UserInfo?.businessDetails?.noDirector == 0 || UserInfo?.businessDetails?.noEmployee == "" || UserInfo?.businessDetails?.targetBusiness == "" || UserInfo?.businessDetails?.expectedRemittance == "" || UserInfo?.businessDetails?.noOfTranscation == 0)) {
          setVerifyRefralPOPUP(true)
          setSendMoneyDetailsStatus(4)
          setSendMoneyDetailsMessage('Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions.')

          if ((UserInfo?.idDocuments?.length === 0) && (UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0 || UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(1)
          } else if (UserInfo?.idDocuments?.length === 0) {
            setSendMoneyDocumentStatus(2)
          } else if ((UserInfo?.role == 'Individual' && UserInfo?.additionalDocuments?.length === 0) || (UserInfo?.role == "Business" && UserInfo?.businessDocuments?.length === 0)) {
            setSendMoneyDocumentStatus(3)
          }
        } else {
          // console.log(TransactionDetails, "TransactionDetails")
          navigate({ pathname: '/sendmoney', state: { TransactionData: TransactionDetails } })
          window.scrollTo(0, 0)
        }
      }
    } else {
      // console.log(TransactionDetails, "TransactionDetails")
      navigate({ pathname: '/sendmoney', state: { TransactionData: TransactionDetails } })
      window.scrollTo(0, 0)
    }
  }

  const handleRedirectProfile = () => {
    navigate({ pathname: '/profile', state: { Blank_Details: SendMoneyDetailsStatus, Document_Blank: SendMoneyDocumentStatus } })
    setVerifyRefralPOPUP(false)
  }
  const [Open, setOpen] = useState('')

  return (
    <>
      <section className="statementSec abtPage">
        {/* <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <PDFViewer style={{ width: '80%', height: '80vh', border: '1px solid #ccc' }}>
      <Invoice />
    </PDFViewer>
    </div> */}
        {loadervalue == true ? <Loader /> : ""}
        <NavBar></NavBar>
        <Container className="pb-5 bg-white py-2 px-4 rounded-4 mb-5">
          <div className="headerText d-flex justify-content-between pb-2 py-4 respoChildFooter">
            <h1 className="purpleText bolder">Transactions</h1>
            <Dropdown className="bg-transparent" onSelect={ChangeRowSelected}>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="m-0 bg-transparent text-white"
              >
                {selectedValue}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {CommonConstants.show_rows.map((value) => (
                  <Dropdown.Item key={value} eventKey={value}>
                    {value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="mainHeader">
            <Row>
              <Col className="col-lg-12">
                <div className="innerHeaderText  justify-content-between py-3 px-4 rounded-5 moneySendRespo">
                  <span className="ReciepientDetails col-lg-3 responsiveFontLargeMedium mainFontSize2 bolder text-black">
                    Recipients details
                  </span>
                  <span className="ReciepientDetails col-lg-3 responsiveFontLargeMedium mainFontSize2 bolder text-black">
                    Transaction details
                  </span>
                  <span className="ReciepientDetails col-lg-4 responsiveFontLargeMedium mainFontSize2 bolder text-black">
                    Status
                  </span>
                </div>
                <div className="innerMainPart">
                  {
                    TransactionData.length > 0 ?
                      TransactionData &&
                      TransactionData.map((TransData, index) => {
                        return (
                          <>
                            <div
                              className={`c my-4 main1
                          ${TransData && TransData.transactionStatus == "Draft"//cancle transaction ,Edit Reciption ,refund
                                  ? "Draft"
                                  : TransData.transactionStatus == "Confirmed"//cancle transaction ,Edit Reciption ,refund
                                    ? "Confirmed"
                                    : TransData.transactionStatus == "Unconfirmed"//cancle transaction ,Edit Reciption ,refund
                                      ? "Unconfirmed"
                                      : TransData.transactionStatus == "Processing" //cancle transaction ,Edit Reciption ,refund
                                        ? "Processing"
                                        : TransData.transactionStatus == "Compliance Hold"//cancle transaction ,Edit Reciption ,refund
                                          ? TransData?.isPaymentRecieved ? "compliancehold" : "Unconfirmed"
                                          : TransData.transactionStatus == "Pending"//cancle transaction ,Edit Reciption ,refund
                                            ? "Pending"
                                            : TransData.transactionStatus == "Delivered"//cancle transaction ,Edit Reciption ,refund
                                              ? "Delivered"
                                              : TransData.transactionStatus == "Cancelled"//cancle transaction ,Edit Reciption ,refund
                                                ? "Cancelled"
                                                : TransData.transactionStatus == "Refunded"//cancle transaction ,Edit Reciption ,refund
                                                  ? "Refunded"
                                                  : ""
                                }
                          `}
                            >
                              <input
                                className="checkMain"
                                type="checkbox"
                                // value={Open}
                                id={`faq-${index}`}
                              />

                              <h1 className="d-grid">
                                <label for={`faq-${index}`} className="respoChildFooter">
                                  <div className="col-lg-12 respoChildFooter border-bottom d-flex justify-content-between align-items-center ">
                                    <Col className="col-lg-3">
                                      <div className="mainHeadInner pb-2 py-4 d-flex my-2 align-items-center">
                                        <span className=" mainFontSize2 bolder text-black fs-6">
                                          {TransData.recipientName == " " ? (TransData.businessName == "" ? TransData.fullName.replace("[", "").replace("]", "") : TransData.businessName) : TransData.recipientName}
                                        </span>
                                        <small className="responsiveFontLarge  textGray ms-4 fs-5">
                                          <img src={`https://flagcdn.com/40x30/${Flag(TransData.recevingCountryName)}.png`} alt={Flag} style={{ width: '20px' }} />
                                          {TransData.recevingCountryName}
                                        </small>
                                      </div>

                                      <div className="pbDowSt dataInner d-flex flex-column">
                                        <small className="responsiveFontLarge  text-black normal my-1">
                                          Transaction No : {TransData.transactionNo}
                                        </small>
                                        <small className="responsiveFontLarge  text-black normal my-1">
                                          Control No : {TransData.controlNo}
                                        </small>
                                        <small className="responsiveFontLarge  text-black normal my-1">
                                          Phone No : {TransData.recipientPhone}
                                        </small>
                                        {/* <small className="responsiveFontLarge  text-black normal my-1">
                                        Delievery Method :{" "}
                                        {TransData.deliveryMethodName}
                                      </small> */}
                                        <small className="responsiveFontLarge  text-black normal my-1">
                                          Bank Name : {TransData.bankName}
                                        </small>
                                        {TransData &&
                                          TransData.bankAccNo != "" ? (
                                          <small className="responsiveFontLarge  text-black normal my-1">
                                            Account No : {TransData.bankAccNo}
                                          </small>
                                        ) : (
                                          <small className="responsiveFontLarge  text-black normal my-1">
                                            Wallet No : {TransData.walletNo}
                                          </small>
                                        )}
                                        <small className="responsiveFontLarge  text-black normal my-1">
                                          Relation : {TransData.relation}
                                        </small>
                                      </div>
                                    </Col>
                                    <Col className="col-lg-3">
                                      <div className="pbDowSt dataInner d-flex flex-column">
                                        <small className="responsiveFontLarge  text-black normal my-1">
                                          {/* December 15 */}
                                          {/* {new Intl.DateTimeFormat("en-US", {
                                          month: "short",
                                          day: "numeric",
                                        }).format(
                                          new Date(TransData.createdAt)
                                        )} */}
                                          {moment(TransData.createdAt).format("DD MMM YYYY")}
                                        </small>
                                        <small className="responsiveFontLarge  text-black normal my-1">
                                          {" "}
                                          {TransData.sendingCurrencyCode}:{" "}
                                          {TransData.amount}
                                        </small>
                                        <small className="responsiveFontLarge  text-black normal my-1">
                                          {TransData.recevingCurrencyCode}:{" "}
                                          {TransData.receivingAmount}
                                        </small>
                                        <small className="responsiveFontLarge  text-black normal my-1">
                                          Rate: {TransData?.exchangeRate}
                                        </small>
                                        <small className={`responsiveFontLarge  text-black normal my-1 ${TransData?.premimumExAmt == 0 || TransData?.premimumExRate == 0 ? "d-none" : "d-block"}`}>
                                          Premium Rate for {TransData?.premimumExAmt >= TransData?.amount ? TransData?.amount :TransData?.premimumExAmt} {TransData.sendingCurrencyCode}: {Number(TransData.exchangeRate)+Number(TransData?.premimumExRate)}
                                        </small>
                                        <small className="responsiveFontLarge  text-black normal my-1">
                                          Service Charge:{" "}
                                          {TransData?.serviceCharge}
                                        </small>
                                        <small className={`responsiveFontLarge  text-black normal my-1 ${TransData?.promoCode == "" || TransData && TransData.transactionStatus == "Draft" ? "d-none" : "d-block"}`}>
                                          Promocode:{" "}
                                          {TransData?.promoCode}
                                        </small>
                                        <small className={`responsiveFontLarge  text-black normal my-1 ${TransData?.promoCodeServiceChargeDiscAmt == 0 || TransData && TransData.transactionStatus == "Draft" ? "d-none" : "d-block"}`}>
                                          Service Charge Discount:{" "}
                                          {TransData?.promoCodeServiceChargeDiscAmt}
                                        </small>
                                        <small className={`responsiveFontLarge  text-black normal my-1 ${TransData?.promoCodeExRateDiscAmt == 0 || TransData && TransData.transactionStatus == "Draft" ? "d-none" : "d-block"}`}>
                                          Exchange Rate Discount:{" "}
                                          {TransData?.promoCodeExRateDiscAmt}
                                        </small>
                                        <small className={`responsiveFontLarge  text-black normal my-1 ${TransData?.usedCash == 0 || TransData && TransData.transactionStatus == "Draft" ? "d-none" : "d-block"}`}>
                                          Used Cash:{" "}
                                          {TransData?.usedCash}
                                        </small>
                                        <small className="responsiveFontLarge  text-black normal my-1">
                                          <b>Total Payable </b>:{" "}
                                          {TransData?.discountedAmount == 0 ? TransData?.totalPayable :TransData?.discountedAmount}{" "}
                                          {TransData?.sendingCurrencyCode}
                                        </small>
                                      </div>
                                    </Col>
                                    <Col className="col-lg-4 pb-2 py-4 d-flex flex-column">
                                      <div className="draftInner d-flex  justify-content-between">
                                        {TransData &&
                                          TransData.transactionStatus == "Draft" ? (
                                          <div className="d-flex ">
                                            <img
                                              src={clock}
                                              className="img-fluid"
                                              alt=""
                                            />
                                            <span className="ms-3 my-2 mainFontSize2 fs-5 purpleText">
                                              {TransData.transactionStatus}
                                            </span>
                                          </div>
                                        ) : TransData.transactionStatus ==
                                          "Confirmed" ? (
                                            <div className="d-flex align-items-center">
                                            {loadingimageset == false ?
                                              <img
                                                src={refresh}
                                                className="img-fluid"
                                                alt=""
                                              />
                                              :
                                              <HourglassBottom className="purpleText" sx={{ fontSize: '3rem' }} />
                                            }
                                            <span className="ms-3 my-2 mainFontSize2 fs-5 purpleText">
                                              {loadingimageset == true ? "Loading..." : TransData.transactionStatus}
                                            </span>
                                          </div>
                                        ) : TransData.transactionStatus ==
                                          "Unconfirmed" ? (
                                            <div className="d-flex align-items-center">
                                            {loadingimageset == false ?
                                              <img
                                                src={unconfirmed}
                                                alt=""
                                                className="img-fluid"
                                              />
                                              :
                                              <HourglassBottom className="purpleText" sx={{ fontSize: '3rem' }} />
                                            }
                                            <span className="ms-3 my-2 mainFontSize2 fs-5 purpleText">
                                              {loadingimageset == true ? "Loading..." : TransData.transactionStatus}
                                            </span>
                                          </div>
                                        ) : TransData.transactionStatus ==
                                          "Processing" ? (
                                            <div className="d-flex align-items-center">
                                            {loadingimageset == false ?
                                              <img
                                                src={clock}
                                                alt=""
                                                className="img-fluid"
                                              />
                                              :
                                              <HourglassBottom className="purpleText" sx={{ fontSize: '3rem' }} />
                                            }
                                            <span className="ms-3 my-2 mainFontSize2 fs-5 purpleText">
                                              {loadingimageset == true ? "Loading..." : TransData.transactionStatus}
                                            </span>
                                          </div>
                                        ) : TransData.transactionStatus ==
                                          "Compliance Hold" ? (
                                          <div className="d-flex ">
                                            <img
                                              src={TransData?.isPaymentRecieved ? refresh : unconfirmed}
                                              alt=""
                                              className="img-fluid"
                                            />
                                            <span className="ms-3 my-2 mainFontSize2 fs-5 purpleText">
                                              {TransData.transactionStatus == "Compliance Hold" ? TransData?.isPaymentRecieved ? "Confirmed" : "Unconfirmed" : ""}
                                            </span>
                                          </div>
                                        ) : TransData.transactionStatus ==
                                          "Pending" ? (
                                          <div className="d-flex align-items-center">
                                            <img
                                              src={clock}
                                              alt=""
                                              className="img-fluid"
                                            />
                                            <span className="ms-3 my-2 mainFontSize2 fs-5 purpleText">
                                              {TransData.transactionStatus}
                                            </span>
                                          </div>
                                        ) : TransData.transactionStatus ==
                                          "Delivered" ? (
                                          <div className="d-flex ">
                                            <img
                                              src={Delivered}
                                              alt=""
                                              className="img-fluid"
                                            />
                                            <span className="ms-3 my-2 mainFontSize2 fs-5 purpleText">
                                              {TransData.transactionStatus}
                                            </span>
                                          </div>
                                        ) : TransData.transactionStatus ==
                                          "Cancelled" ? (
                                          <div className="d-flex ">
                                            <img
                                              src={Cancle}
                                              alt=""
                                              className="img-fluid"
                                            />
                                            <span className="ms-3 my-2 mainFontSize2 fs-5 purpleText">
                                              {TransData.transactionStatus}
                                            </span>
                                          </div>
                                        ) : TransData.transactionStatus ==
                                          "Refunded" ? (
                                          <div className="d-flex ">
                                            <img
                                              src={leftArr}
                                              alt=""
                                              className="img-fluid"
                                            />
                                            <span className="ms-3 my-2 mainFontSize2 fs-5 purpleText">
                                              {TransData.transactionStatus}
                                            </span>
                                          </div>
                                        ) : (
                                          ""
                                        )}

                                        <div className={`d-flex my-2`}>
                                          <img src={bin} className="img-fluid pointer"
                                            alt=""
                                            onClick={(e) => {
                                              setDeleteTransactionPopup(true);
                                              setTransactionIdforCancle(TransData.id);
                                            }}
                                          />
                                        </div>
                                      </div>

                                      <div className="">
                                        {TransData &&
                                          TransData.transactionStatus == "Draft" ? (
                                          <p className="purpleText bolder responsiveFontLarge innerP   mt-3">
                                            {TransData?.statusMessage}
                                            {/* Transaction details saved, please complete the transaction */}
                                          </p>
                                        ) : TransData.transactionStatus ==
                                          "Confirmed" ? (
                                            <>
                                          <p className="purpleText bolder responsiveFontLarge innerP   mt-3">
                                            {TransData?.statusMessage}
                                          </p>
                                          <p className={TransData && TransData.isRefundRequest == true && TransData && TransData.refundReqStatus == 0 ? "d-block text-danger responsiveFontLarge bolder innerP" : "d-none"}>You have sent refund request</p>
                                          <p className={TransData && TransData.isRefundRequest == true && TransData && TransData.refundReqStatus == 2 ? "d-block text-danger responsiveFontLarge bolder innerP" : "d-none"}>Your refund request is rejected</p>
                                            </>
                                        ) : TransData.transactionStatus ==
                                          "Unconfirmed" ? (
                                            <>
                                          <p className="purpleText bolder responsiveFontLarge innerP   mt-3">
                                            {TransData?.statusMessage}
                                          </p>
                                          <p className={TransData && TransData.isCancelRequest == true ? "d-block text-danger responsiveFontLarge bolder innerP" : "d-none"}>You have sent Cancle request</p>
                                          <p className={TransData && TransData.isRefundRequest == true && TransData && TransData.refundReqStatus == 0 ? "d-block text-danger responsiveFontLarge bolder innerP" : "d-none"}>You have sent refund request</p>
                                          <p className={TransData && TransData.isRefundRequest == true && TransData && TransData.refundReqStatus == 2 ? "d-block text-danger responsiveFontLarge bolder innerP" : "d-none"}>Your refund request is rejected</p>
                                            </>
                                        ) : TransData.transactionStatus ==
                                          "Processing" ? (
                                          <p className="purpleText bolder responsiveFontLarge innerP   mt-3">
                                            {TransData?.statusMessage}
                                          </p>
                                        ) : TransData.transactionStatus ==
                                          "Compliance Hold" ? (
                                            <>
                                          <p className="purpleText bolder responsiveFontLarge innerP   mt-3">
                                            {/* {TransData?.statusMessage} */}
                                            {
                                              TransData?.isPaymentRecieved ? "We received your transferred funds in our account. We shall be processed for payment shortly." : "Your transaction request is received. We are verifying your payment now. It shall be processed as soon as we receive your funds in our account."
                                            }
                                          </p>
                                          <p className={TransData && TransData.isCancelRequest == true ? "d-block text-danger responsiveFontLarge bolder innerP" : "d-none"}>You have sent Cancle request</p>
                                          <p className={TransData && TransData.isRefundRequest == true && TransData && TransData.refundReqStatus == 0 ? "d-block text-danger responsiveFontLarge bolder innerP" : "d-none"}>You have sent refund request</p>
                                          <p className={TransData && TransData.isRefundRequest == true && TransData && TransData.refundReqStatus == 2 ? "d-block text-danger responsiveFontLarge bolder innerP" : "d-none"}>Your refund request is rejected</p>
                                            </>
                                        ) : TransData.transactionStatus ==
                                          "Pending" ? (
                                          <p className="purpleText bolder responsiveFontLarge innerP   mt-3">
                                            {TransData?.statusMessage}
                                          </p>
                                        ) : TransData.transactionStatus ==
                                          "Delivered" ? (
                                            <>
                                          <p className="purpleText bolder responsiveFontLarge innerP   mt-3">
                                            {TransData?.statusMessage}
                                          </p>
                                          <p className={TransData && TransData.isRefundRequest == true && TransData && TransData.refundReqStatus == 0 ? "d-block text-danger responsiveFontLarge bolder innerP" : "d-none"}>You have sent refund request</p>
                                          <p className={TransData && TransData.isRefundRequest == true && TransData && TransData.refundReqStatus == 2 ? "d-block text-danger responsiveFontLarge bolder innerP" : "d-none"}>Your refund request is rejected</p>
                                            </>
                                        ) : TransData.transactionStatus ==
                                          "Cancelled" ? (
                                          <p className="purpleText bolder responsiveFontLarge innerP mt-3">
                                            {TransData?.statusMessage}
                                          </p>
                                        ) : TransData.transactionStatus ==
                                          "Refunded" ? (
                                          <p className="purpleText bolder responsiveFontLarge innerP mt-3">
                                            {TransData?.statusMessage}
                                          </p>
                                        ) : (
                                          ""
                                        )}

                                        <div className={`d-flex align-items-center`}>
                                          <div className={`invoice ${TransData && TransData.transactionStatus == "Draft"//cancle transaction ,Edit Reciption ,refund
                                            ? "d-none"
                                            : TransData.transactionStatus == "Confirmed"//cancle transaction ,Edit Reciption ,refund
                                              ? "d-block"
                                              : TransData.transactionStatus == "Unconfirmed"//cancle transaction ,Edit Reciption ,refund
                                                ? "d-none"
                                                : TransData.transactionStatus == "Processing" //cancle transaction ,Edit Reciption ,refund
                                                  ? "d-block"
                                                  : TransData.transactionStatus == "Compliance Hold"//cancle transaction ,Edit Reciption ,refund
                                                    ? TransData?.isPaymentRecieved ? "d-block" : "d-none" //"d-block" confirmed vise change
                                                    : TransData.transactionStatus == "Pending"//cancle transaction ,Edit Reciption ,refund
                                                      ? "d-none"
                                                      : TransData.transactionStatus == "Delivered"//cancle transaction ,Edit Reciption ,refund
                                                        ? "d-block"
                                                        : TransData.transactionStatus == "Cancelled"//cancle transaction ,Edit Reciption ,refund
                                                          ? "d-none"
                                                          : TransData.transactionStatus == "Refunded"//cancle transaction ,Edit Reciption ,refund
                                                            ? "d-none"
                                                            : ""
                                            }`} onClick={(e) => { handleViewInvById(TransData.id); }}>
                                            <img
                                              src={invoice}
                                              alt=""
                                              className="img-fluid"
                                            />
                                            <small className="responsiveFontLarge  ms-2 purpleText bolder ">
                                              View Invoice
                                            </small>
                                          </div>

                                          {/* <div className="invoice" onClick={(e)=>{setOpen(`faq-${index}`)}}> */}
                                          {/* <div className="invoice">
                                          <img
                                            src={invoice}
                                            className="img-fluid"
                                          />
                                          <small className="responsiveFontLarge  ms-2 purpleText bolder ">
                                            View Process
                                          </small>
                                        </div> */}

                                          {/* <div>
                                          <Button
                                            aria-controls="menu"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                            startIcon={<MoreVertIcon/>}
                                            variant="text"
                                          >
                                           <small className="responsiveFontLarge text-capitalize purpleText bolder ">More</small> 
                                          </Button>
                                          
                                          <Menu
                                            id="menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                          >
                                            <MenuItem onClick={handleClose}>
                                              <ListItemIcon>
                                                <CloseIcon fontSize="small" />
                                              </ListItemIcon>
                                       
                                                <div className="py-2">
                                                  Cancel Request
                                                </div>
                                         
                                            </MenuItem>
                                            <MenuItem onClick={handleRefund}>
                                              <ListItemIcon>
                                                <SettingsBackupRestoreIcon fontSize="small" />
                                              </ListItemIcon>
                                              <div className="py-2">
                                                  Refund Request
                                                </div>
                                            </MenuItem>
                                            <MenuItem onSelect={(e)=>{ handleEditReciption(TransData.recipientId,TransData.recevingCountryId) }}>
                                              <ListItemIcon>
                                                <EditIcon fontSize="small" />
                                              </ListItemIcon>
                                              <div className="py-2">
                                                  Edit Reciepient Details
                                                </div>
                                            </MenuItem>
                                          </Menu>

                                          {TransData.recipientId}
                                        </div> */}
                                          <div className={` 
                                        ${TransData && TransData.transactionStatus == "Draft"//cancle transaction ,Edit Reciption ,refund
                                              ? "d-block"
                                              : TransData.transactionStatus == "Confirmed"//cancle transaction ,Edit Reciption ,refund
                                                ? TransData && TransData.isRefundRequest == false ? "d-block" : "d-none"
                                                : TransData.transactionStatus == "Unconfirmed"//cancle transaction ,Edit Reciption ,refund
                                                  ? "d-block"
                                                  : TransData.transactionStatus == "Processing" //cancle transaction ,Edit Reciption ,refund
                                                    ? "d-none"
                                                    : TransData.transactionStatus == "Compliance Hold"//cancle transaction ,Edit Reciption ,refund
                                                      ? TransData?.isPaymentRecieved ? TransData && TransData.isRefundRequest == false ? "d-block" : "d-none" : "d-block"
                                                      : TransData.transactionStatus == "Pending"//cancle transaction ,Edit Reciption ,refund
                                                        ? "d-block"
                                                        : TransData.transactionStatus == "Delivered"//cancle transaction ,Edit Reciption ,refund
                                                          ? TransData && TransData.isRefundRequest == false ? "d-block" : "d-none"
                                                          : TransData.transactionStatus == "Cancelled"//cancle transaction ,Edit Reciption ,refund
                                                            ? "d-none"
                                                            : TransData.transactionStatus == "Refunded"//cancle transaction ,Edit Reciption ,refund
                                                              ? "d-none"
                                                              : ""
                                            }`}>
                                            <Dropdown className="bg-transparent border-0">
                                              <Dropdown.Toggle
                                                variant="light"
                                                id="dropdown-basic"
                                                className="border-0 m-0 bg-transparent custom-dropdown-toggle"
                                              >
                                                <small className="responsiveFontLarge text-capitalize text-white bolder">
                                                  <MoreVertIcon /> More
                                                </small>
                                              </Dropdown.Toggle>

                                              <Dropdown.Menu>
                                                <Dropdown.Item
                                                  className={`py-0 purpleText bolder
                                                ${TransData && TransData.transactionStatus == "Draft"//cancle transaction ,Edit Reciption ,refund
                                                      ? "d-none"
                                                      : TransData.transactionStatus == "Confirmed"//cancle transaction ,Edit Reciption ,refund
                                                        ? "d-none"
                                                        : TransData.transactionStatus == "Unconfirmed"//cancle transaction ,Edit Reciption ,refund
                                                          ? TransData.isCancelRequest == false ? "d-block" : "d-none"
                                                          : TransData.transactionStatus == "Processing" //cancle transaction ,Edit Reciption ,refund
                                                            ? TransData.isCancelRequest == false ? "d-block" : "d-none"
                                                            : TransData.transactionStatus == "Compliance Hold"//cancle transaction ,Edit Reciption ,refund
                                                              // ? TransData?.isPaymentRecieved ? TransData && TransData.isRefundRequest == false ? TransData.isCancelRequest == false ? "d-block" : "d-none": "d-none" : TransData.isCancelRequest == false ? "d-block" : "d-none"
                                                              ? TransData?.isPaymentRecieved ? "d-none" : TransData.isCancelRequest == false ? "d-block" : "d-none"
                                                              : TransData.transactionStatus == "Pending"//cancle transaction ,Edit Reciption ,refund
                                                                ? TransData.isCancelRequest == false ? "d-block" : "d-none"
                                                                : TransData.transactionStatus == "Delivered"//cancle transaction ,Edit Reciption ,refund
                                                                  ? "d-none"
                                                                  : TransData.transactionStatus == "Cancelled"//cancle transaction ,Edit Reciption ,refund
                                                                    ? "d-none"
                                                                    : TransData.transactionStatus == "Refunded"//cancle transaction ,Edit Reciption ,refund
                                                                      ? "d-none"
                                                                      : ""
                                                    }`}
                                                  onClick={(e) => {
                                                    setCancleTransactionPopup(true);
                                                    setTransactionIdforCancle(TransData.id)
                                                  }}
                                                >
                                                  <CloseIcon fontSize="small" />{" "}
                                                  &nbsp; Cancel Request
                                                </Dropdown.Item>

                                                <Dropdown.Item
                                                  className={`py-0  purpleText bolder
                                                ${TransData && TransData.transactionStatus == "Draft"//cancle transaction ,Edit Reciption ,refund
                                                      ? "d-block"
                                                      : "d-none"
                                                    }`}
                                                  onClick={(e) => {
                                                    // setCancleTransactionPopup(true);
                                                    handleSubmitTransaction(TransData)
                                                  }}
                                                >
                                                  {/* <CloseIcon fontSize="small" /> */}
                                                  <img src={SubmitTrans} className="countinueTransactionlogo" alt=""></img>{" "}
                                                  &nbsp; Submit Transaction
                                                </Dropdown.Item>

                                                <Dropdown.Item
                                                  className={`py-0  purpleText bolder
                                                ${TransData && TransData.transactionStatus == "Draft"//cancle transaction ,Edit Reciption ,refund
                                                      ? "d-none"
                                                      : TransData.transactionStatus == "Confirmed"//cancle transaction ,Edit Reciption ,refund
                                                        ? TransData && TransData.isRefundRequest == false ? "d-block" : "d-none"
                                                        : TransData.transactionStatus == "Unconfirmed"//cancle transaction ,Edit Reciption ,refund
                                                          ? "d-none"
                                                          : TransData.transactionStatus == "Processing" //cancle transaction ,Edit Reciption ,refund
                                                            ? "d-none"
                                                            : TransData.transactionStatus == "Compliance Hold"//cancle transaction ,Edit Reciption ,refund
                                                              ? TransData?.isPaymentRecieved ? TransData && TransData.isRefundRequest == false ? "d-block" : "d-none" : "d-none"
                                                              : TransData.transactionStatus == "Pending"//cancle transaction ,Edit Reciption ,refund
                                                                ? "d-none"
                                                                : TransData.transactionStatus == "Delivered"//cancle transaction ,Edit Reciption ,refund
                                                                  ? TransData && TransData.isRefundRequest == false ? "d-block" : "d-none"
                                                                  : TransData.transactionStatus == "Cancelled"//cancle transaction ,Edit Reciption ,refund
                                                                    ? "d-none"
                                                                    : TransData.transactionStatus == "Refunded"//cancle transaction ,Edit Reciption ,refund
                                                                      ? "d-none"
                                                                      : ""
                                                    }`}
                                                  onClick={(e) => {
                                                    handleRefund(TransData.transactionNo);
                                                  }}
                                                >
                                                  <SettingsBackupRestoreIcon fontSize="small" />{" "}
                                                  &nbsp; Refund Request
                                                </Dropdown.Item>

                                                <Dropdown.Item
                                                  className={`py-0 purpleText bolder
                                                ${TransData && TransData.transactionStatus == "Draft"//cancle transaction ,Edit Reciption ,refund
                                                      ? "d-block"
                                                      : TransData.transactionStatus == "Confirmed"//cancle transaction ,Edit Reciption ,refund
                                                        ? "d-none"
                                                        : TransData.transactionStatus == "Unconfirmed"//cancle transaction ,Edit Reciption ,refund
                                                          ? "d-block"
                                                          : TransData.transactionStatus == "Processing" //cancle transaction ,Edit Reciption ,refund
                                                            ? "d-block"
                                                            : TransData.transactionStatus == "Compliance Hold"//cancle transaction ,Edit Reciption ,refund
                                                              ? TransData?.isPaymentRecieved ? "d-none" : "d-block"
                                                              : TransData.transactionStatus == "Pending"//cancle transaction ,Edit Reciption ,refund
                                                                ? "d-none"
                                                                : TransData.transactionStatus == "Delivered"//cancle transaction ,Edit Reciption ,refund
                                                                  ? "d-none"
                                                                  : TransData.transactionStatus == "Cancelled"//cancle transaction ,Edit Reciption ,refund
                                                                    ? "d-none"
                                                                    : TransData.transactionStatus == "Refunded"//cancle transaction ,Edit Reciption ,refund
                                                                      ? "d-none"
                                                                      : ""
                                                    }`}
                                                  onClick={(e) => {
                                                    handleEditReciption(
                                                      TransData?.recipientId,
                                                      TransData?.recevingCountryId
                                                    );
                                                  }}
                                                >
                                                  <EditIcon fontSize="small" />{" "}
                                                  &nbsp; Edit Recipient Details
                                                </Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </Col>
                                  </div>
                                </label>
                              </h1>
                              {/* ////progress bar//// */}
                              <div className="p">
                                <p>
                                  <div>
                                    <div className="stepper-wrapper">
                                      {renderSteps(TransData.transactionStatus, TransData?.transactionStatusLogs,TransData.isPaymentRecieved)}
                                    </div>
                                  </div>
                                </p>
                              </div>
                              {/* //////////////////// */}
                            </div>
                          </>
                        );
                      })
                      :
                      <>
                        <div className="d-flex justify-content-center py-5">
                          <h5 className="py-5"> No Transaction Data</h5>
                        </div>
                      </>
                  }
                  <div className="d-flex justify-content-between pt-4 mr-4 mr-4">
                    {
                      TransactionData.length > 0 ?
                        <>
                          <div className="filter-row pt-2">
                            Showing {(Page - 1) * RowsPerPage + 1} to{" "}
                            {Page * RowsPerPage > numItems
                              ? numItems
                              : Page * RowsPerPage}{" "}
                            of {numItems} entries
                          </div>
                          <Pagination
                            count={CountPage}
                            page={Page}
                            onChange={HandleChangePage}
                            className="d-flex justify-content-end"
                          />
                        </>
                        :
                        <>
                        </>
                    }
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>

        {/* <div > */}
        <div className="row expanded d-none my-5">
          <main className="columns">
            <div className="inner-container">
              <section className="row">
                <div className="callout large invoice-container " ref={printRef}>
                  <table className="invoice w-100">
                    <tbody >
                      <div className="p-3">
                      {/* <tr className="header" >
                       <h2 className="purpleText text-center d-flex justify-content-center"> Transaction Details </h2>
                    </tr> */}
                    <tr className="header " >
                        <div className="d-flex flex-column px-2 py-3">

                       <h4 className="purpleText  ">Lumbini Group Pvt.Ltd. </h4>
                       <h5 className="text-black ">Trading as </h5>

                        </div>
                    </tr>
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
                            <div>ABN : </div> &nbsp; <div> 572699</div>
                          </div>
                          <br />
                          <div className="d-flex justify-content-start">
                            <div>Austrac: </div> &nbsp; <div>100622798</div>
                          </div>
                          <br />
                          <div className="d-flex justify-content-start">
                            <div>Tel: </div> &nbsp; <div>{UserInfo && UserInfo.phoneCode == null ? "" : UserInfo.phoneCode + UserInfo.phone}</div>
                          </div>
                          <br />
                          <div className="d-flex justify-content-start">
                            <div>Email :</div> &nbsp;{" "}
                            <div>{UserInfo.email}</div>
                          </div>                          
                        </td>

                        <td className="">
                          <div className="d-flex justify-content-end">
                            <div>Date: </div> &nbsp;
                            <div>
                              {formattedDate}
                            </div>
                          </div>
                          <br />
                          <div className="d-flex justify-content-end">
                            <div>Transaction No.: </div> &nbsp; <div> {TransactionDataById.transactionNo}</div>
                          </div>
                          <br />
                          <div className="d-flex justify-content-end">
                            <div>Customer ID: </div> &nbsp; <div> {UserInfo.customerId}</div>
                          </div>
                          <br />
                          <div className="d-flex justify-content-end">
                            <div className="purpleText d-flex">
                              Control No: </div><div className="ps-2">{ControlledNumber && ControlledNumber} </div>{" "}

                          </div>
                        </td>
                        {/* <td className="text-right">
                      </td> */}
                      </tr>

                      <tr className="header border-bottom">
                        <td>
                          <section className="additional-info">
                            <div className="row">
                              <div className="columns">
                                <h5 className="text-info mb-3">Sender</h5>
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Name: </div> &nbsp; <div className="col-lg-8 ps-0">{UserInfo && UserInfo.fName + " " + UserInfo.mName + " " + UserInfo.lName}</div>
                                </div>
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Country: </div> &nbsp; <div className="col-lg-8 ps-0">{UserInfoKyc && UserInfoKyc.countryName}</div>
                                </div>
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">State: </div> &nbsp; <div className="col-lg-8 ps-0">{State}</div>
                                </div>
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Address: </div> &nbsp; <div className="col-lg-8 ps-0">{UserInfoKyc && UserInfoKyc.streetName + " , " + UserInfoKyc.suburb + " , " + State}</div>
                                </div>
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Contact No. : </div> &nbsp; <div className="col-lg-8 ps-0">{UserInfo && UserInfo.phoneCode + " " + UserInfo.phone}</div>
                                </div>
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Email: </div> &nbsp; <div className="col-lg-8 ps-0">{UserInfo && UserInfo.email}</div>
                                </div>
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Purpose: </div> &nbsp; <div className="col-lg-8 ps-0">{TransactionDataById && TransactionDataById.transferPurpose}</div>
                                </div>
                              </div>

                            </div>
                          </section>
                        </td>
                        <td className="d-block">
                          <section className="additional-info">
                            <div className="row">
                              <div className="columns">
                                <h5 className="text-info mb-3">Reciever</h5>
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Name: </div> &nbsp; <div className="col-lg-8 ps-0">{ReciptionDetails?.firstName != "" && ReciptionDetails?.firstName != undefined ? ReciptionDetails?.firstName + " " + ReciptionDetails?.middleName + " " + ReciptionDetails?.lastName : ReciptionDetails?.businessName != "" && ReciptionDetails?.businessName != undefined ? ReciptionDetails?.businessName : ReciptionDetails?.fullName != '[]' && ReciptionDetails?.fullName != undefined ? ReciptionDetails?.fullName : ""} </div>
                                </div>
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Relation: </div> &nbsp; <div className="col-lg-8 ps-0"> {ReciptionDetails?.relationName} </div>
                                </div>
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Country: </div> &nbsp; <div className="col-lg-8 ps-0">{ReciptionDetails?.countryName}</div>
                                </div>
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Address: </div> &nbsp; <div className="col-lg-8 ps-0">{ReciptionDetails?.address != "" ? ReciptionDetails?.address : ReciptionDetails?.city}</div>
                                </div>
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Contact No : </div> &nbsp; <div className="col-lg-8 ps-0">{ReciptionDetails?.phone}</div>
                                </div>
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-4 ps-0">Method: </div> &nbsp; <div className="col-lg-8 ps-0">{ReciptionDetails?.deliveryMethodName}</div>
                                </div>
                                <br />
                                {
                                  TransactionDataById?.bankAccNo != "" ?
                                    <>
                                      <div className="d-flex">
                                        <div className="col-lg-4 ps-0">Bank Name: </div> &nbsp; <div className="col-lg-8 ps-0">{ReciptionDetails?.bankName}</div>
                                      </div>
                                      <br />
                                      <div className="d-flex">
                                        <div className="col-lg-5 px-0">Account Number: </div> &nbsp; <div className="col-lg-7 ps-0">{ReciptionDetails?.bankAccNo}</div>
                                      </div>
                                    </>
                                    :TransactionDataById?.walletNo != "" ?
                                    <>
                                      <div className="d-flex">
                                        <div className="col-lg-4 ps-0">Wallet Name: </div> &nbsp; <div className="col-lg-8 ps-0">{ReciptionDetails?.walletName}</div>
                                      </div>
                                      <br />
                                      <div className="d-flex">
                                        <div className="col-lg-5 px-0">Wallet Number: </div> &nbsp; <div className="col-lg-7 ps-0">{ReciptionDetails?.walletNo}</div>
                                      </div>
                                    </> :""
                                }
                                <br />
                                <div className="d-flex">
                                  <div className="col-lg-5 ps-0">Delivery Status: </div> &nbsp; <div className="col-lg-7 ps-0">{TransactionDataById?.transactionStatus == "Compliance Hold" ? TransactionDataById?.isPaymentRecieved ?"Confirmed" : "UnConfirmed" : TransactionDataById?.transactionStatus}</div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </td>
                      </tr>
                      </div>
                    </tbody>
                  </table>
                  <div className="px-3 bg-white">

                  <table className="bg-white pt-2 w-100 border">
                    {/* <div className="p-3"> */}
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th colspan="4">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr >
                        <td className="bolder border-right" colspan="4">
                          Money To Send
                        </td>
                        <td className="item-stock">{TransactionDataById.amount}&nbsp;{TransactionDataById.sendingCurrencyCode} </td>
                      </tr>
                      <tr>
                        <td className="bolder border-right" colspan="4">
                          Money To Recieve
                        </td>
                        <td className="item-stock">{TransactionDataById.receivingAmount}&nbsp;{TransactionDataById.recevingCurrencyCode}</td>
                      </tr>
                      <tr>
                        <td className="bolder border-right" colspan="4">
                          Exchange Rate
                        </td>
                        <td className="item-stock">{TransactionDataById.exchangeRate}&nbsp;{TransactionDataById.recevingCurrencyCode}</td>
                      </tr>
                      <tr className={TransactionDataById?.premimumExAmt == 0 || TransactionDataById?.premimumExRate == 0 ? "d-none" : ""}>
                      {/* <tr> */}
                        <td className="bolder border-right" colspan="4">
                          Premium Exchange Rate for {TransactionDataById?.premimumExAmt >= TransactionDataById?.amount ? TransactionDataById?.amount :TransactionDataById?.premimumExAmt} {TransactionDataById.sendingCurrencyCode}
                        </td>
                        <td className="item-stock">{Number(TransactionDataById.exchangeRate)+Number(TransactionDataById?.premimumExRate)}&nbsp;{TransactionDataById.recevingCurrencyCode}</td>
                      </tr>
                      <tr>
                        <td className="bolder border-right" colspan="4">
                          Service Charge
                        </td>
                        <td className="item-stock">{TransactionDataById.serviceCharge}&nbsp;{TransactionDataById.sendingCurrencyCode} </td>
                      </tr>
                      <tr>
                        <td className="bolder border-right" colspan="4">
                          GST
                        </td>
                        <td className="item-stock">0.00&nbsp;{TransactionDataById.sendingCurrencyCode}</td>
                      </tr>
                      <tr className={TransactionDataById?.promoCodeServiceChargeDiscAmt == 0 || TransactionDataById?.promoCodeExRateDiscAmt == 0 ? "d-none" : ""}>
                        <td className="bolder border-right" colspan="4">
                          PromoCode Discount
                        </td>
                        <td className="item-stock">{TransactionDataById?.promoCodeServiceChargeDiscAmt != 0 ? TransactionDataById?.promoCodeServiceChargeDiscAmt : TransactionDataById?.promoCodeExRateDiscAmt != 0 ? TransactionDataById?.promoCodeExRateDiscAmt : 0}&nbsp;{TransactionDataById.sendingCurrencyCode} </td>
                      </tr>

                      <tr className={TransactionDataById?.usedCash == 0 ? "d-none" : ""}>
                        <td className="bolder border-right" colspan="4">
                          Used Cash
                        </td>
                        <td className="item-stock">{TransactionDataById?.usedCash}&nbsp;{TransactionDataById.sendingCurrencyCode} </td>
                      </tr>
                    </tbody>

                    <tfoot>
                      <tr className="text-offset border-top">
                        <td colspan="4" className="bolder border-right">Total Amount</td>
                        <td>{TransactionDataById?.amount+TransactionDataById?.serviceCharge-(TransactionDataById?.promoCodeServiceChargeDiscAmt != 0 ? TransactionDataById?.promoCodeServiceChargeDiscAmt : TransactionDataById?.promoCodeExRateDiscAmt != 0 ? TransactionDataById?.promoCodeExRateDiscAmt : 0)-TransactionDataById?.usedCash}&nbsp;{TransactionDataById.sendingCurrencyCode}</td>
                      </tr>
                    </tfoot>
                    {/* </div> */}
                  </table>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
        {/* </div> */}

        <Modal show={show7} onHide={CloseUpdate} size="lg">
          <Row className="">
            <Modal.Header className="text-center  mt-1">
              <img
                src={backA}
                className="img-fluid pointer"
                alt=""
                onClick={CloseUpdate}
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
                      onClick={handleDropdownClickU}
                      className="dropdown-btn d-flex justify-content-evenly align-items-start m-0"
                    >
                      {dropdownValueU === "" ? (
                        <>
                          <img
                            src={bankIcon}
                            width="50"
                            alt=""
                            height="50"
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
                          <img src={drpa} className="img-fluid mt-4 ms-4" alt="" />
                        </>
                      ) : (
                        dropdownValueU
                      )}
                    </button>
                    {/* {selectedDeliveryMethod == "individual" && ( */}
                    {/* {( */}
                    <div
                      className={`dropdown-items ${dropdownStateU ? "isVisible" : "isHidden"
                        }`}
                    >
                      {getAllDeliveryMethod &&
                        getAllDeliveryMethod.map((DeliveryMethod, index) => {
                          return (
                            <div
                              key={index}
                              className="dropdown-item"
                              // onClick={(e) =>
                              //   toggleVisibilityDynamicU(
                              //     DeliveryMethod.name,
                              //     e
                              //   )
                              // }
                            >
                              <div
                                className="dropdown__link d-flex  "
                                onClick={(e) =>{
                                  handleSetDropdownValueU(
                                    <>
                                      <img
                                        src={CommonConstants.BASE_URL+DeliveryMethod.logo}
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
                                  toggleVisibilityDynamicU(
                                    DeliveryMethod.name
                                  )
                                  setUDeliveryName(DeliveryMethod.name)
                                }
                              }
                              >
                                <img
                                  src={CommonConstants.BASE_URL+DeliveryMethod.logo}
                                  width="30"
                                  height="30"
                                  className="img-fluid"
                                  alt=""
                                />
                                <div className="text-black  bolder text-center ms-4">
                                  {DeliveryMethod.name}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {/* )} */}
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
                        <Form className="mt-3 sendMoneyPaddingForm" id="Signup_Step1">
                          <div
                            className={`${UpdateUserData.type === "individual"
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
                                <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  First Name
                                </small>

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
                                <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  Middle Name
                                </small>
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
                                <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  Last Name
                                </small>

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                          </div>
                          <div
                            className={`${UpdateUserData.type === "business"
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
                                <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  First Name
                                </small>

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                          </div>
                          <div
                            className={`${UpdateUserData.type === "joint"
                              ? "d-block"
                              : "d-none"
                              }`}
                          >
                            <Row className="">
                              <Col className="col-lg-12 d-flex mt-3 justify-content-end ms-auto">
                                <Button
                                  className="mt-2 col-lg-4 ps-2 pe-2 d-block upparcase fullRoundedCorner text-white justify-content-end rounded-5 nextBtn1"
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
                            <Form
                              className="mt-3"
                              id="Signup_Step1"
                              onSubmit={submit}
                            >
                              {inputFields2?.map((input, index) => {
                                return (
                                  <div key={index} className="align-items-center position-relative">
                                    <Row className="">
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container required text-start d-flex align-items-center"
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
                                            handleFormChangeCashPickup(
                                              index,
                                              event
                                            )
                                          }
                                          onBlur={(e) => {
                                            submit(e);
                                          }}
                                        />
                                        <label for="name" className="form-label1">Full Name</label>
                                        <span
                                          className={`pt-2 ps-2 ${index == 0 ? "d-none" : "d-block"
                                            }`}
                                          onClick={() =>
                                            removeFieldCashPickup(
                                              index
                                            )
                                          }
                                        ><i class="fas fa-times-circle pointer"></i></span>
                                        {/* <span className="pt-2 " onClick={() => removeFieldCashPickup(index)}><i class="fas fa-times-circle pointer" ></i></span> */}

                                        {/* {invalid && !inputFields2[0].FullName && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                          Full Name is require
                                        </small>} */}
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
                                <option value="">Bank Name (searchable)</option>
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
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Bank Account Number
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <div
                            className={`${ReciverCountry === 101 ? "d-block" : "d-none"
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
                              className={`${Uselected === "IFSC" ? "d-none" : "d-block"
                                }`}
                            // aria-hidden={selected !== "female" ? true : false}
                            >
                              <Row
                                className=""
                                aria-hidden={
                                  Uselected !== "male" ? true : false
                                }
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
                              className={`${Uselected === "NoIFSC" ? "d-none" : "d-block"
                                }`}

                            // aria-hidden={selected !== "male" ? true : false}
                            >
                              <Row
                                className=""
                                aria-hidden={
                                  Uselected !== "female" ? true : false
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
                                  <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    IFSC Code (if India) / Routing Number (in
                                    USA)/ BSB (in AUS)
                                  </small>

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
                        <Form className="mt-3 sendMoneyPaddingForm" id="Signup_Step1">
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
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                First Name
                              </small>

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
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Middle Name
                              </small>

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
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Last Name
                              </small>

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
                                onChange={(e) => {handleUpdateRecieverValue(e); handleUpdateWalletname(e);}}
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
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Wallet Account no.
                              </small>

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
                        <Form className="mt-3 sendMoneyPaddingForm" id="Signup_Step1">
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
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                First Name
                              </small>

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
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Middle Name
                              </small>

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
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Last Name
                              </small>

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
                      <Form className="mt-3 sendMoneyPaddingForm" id="Signup_Step1">
                        <Row
                          className={`${ReciverCountry === 154 ? "d-none" : "d-block"
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
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Address
                            </small>

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
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              City/District
                            </small>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row
                          className={`${ReciverCountry === 154 ? "d-none" : "d-block"
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
                          className={`${ReciverCountry === 154 ? "d-none" : "d-block"
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
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Postal Code
                            </small>

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
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Mobile
                            </small>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row
                          className={`${ReciverCountry === 154 ? "d-none" : "d-block"
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
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Mobile
                            </small>

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
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Relation
                            </small>

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
                      className="mt-0 my-1 mb-4 col-lg-3 d-block m-auto nextBtn1 text-white"
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

        <Modal
          centered
          show={CancleTransactionPopup}
          onHide={(e) => {
            setCancleTransactionPopup(false);
          }}
          dialogClassName="modal-warning"
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Alert</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <p className="text-black ">
              Do you really want to cancel this transaction ?
            </p>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label >Reason : </Form.Label>
                <Form.Control as="textarea" rows={3} id="reason" />
              </Form.Group>
            </Form>
            <small onClick={(e) => { navigate('/legal') }} className="pointer text-primary"><u>cancellation condition and policy</u> </small>

          </Modal.Body>
          <Modal.Footer>
            {/* <div> */}
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1 bg-light border"
              variant="primary"
              onClick={(e) => {
                setCancleTransactionPopup(false)
              }}
            >
              Cancel
            </Button>

            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1 text-white"
              variant="primary"
              onClick={(e) => {
                handleCancleTransaction();
              }}
            >
              Submit
            </Button>

            {/* </div> */}
          </Modal.Footer>
        </Modal>

        <Modal
          centered
          show={DeleteTransactionPopup}
          onHide={(e) => {
            setDeleteTransactionPopup(false);
          }}
          dialogClassName="modal-warning"
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Alert</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <p className="text-black ">
              {/* Do you really want to Delete this transaction ? */}
              Are you sure you want to delete transaction? Deleting transaction is irreversible. No recovery possible.
            </p>
            {/* <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label >Reason : </Form.Label>
              <Form.Control as="textarea" rows={3} id="Delete-reason"/>
            </Form.Group>
            </Form> */}
            {/* <small onClick={(e)=>{navigate('/legal')}} className="pointer text-primary"><u>cancellation condition and policy</u> </small> */}

          </Modal.Body>
          <Modal.Footer>
            {/* <div> */}
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1 bg-light border"
              variant="primary"
              onClick={(e) => {
                setDeleteTransactionPopup(false)
              }}
            >
              Cancel
            </Button>

            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1 text-white"
              variant="primary"
              onClick={(e) => {
                DeleteTransaction();
              }}
            >
              Delete
            </Button>

            {/* </div> */}
          </Modal.Footer>
        </Modal>

        <Footer></Footer>
        <Modal show={VerifyRefralPOPUP} onHide={() => { setVerifyRefralPOPUP(false) }} centered>
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="purpleText"><span className="text-black mt-2">Alert</span></Modal.Title>
          </Modal.Header>
          <Modal.Body className="mt-3">
            <p>
              {SendMoneyDetailsMessage}
            </p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-around">
            <Button
              className="purpleBackground border-0 col col-lg-3"
              onClick={() => { handleRedirectProfile() }}
            >
              Ok
            </Button>
          </Modal.Footer>
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

        <Modal
          centered
          show={CancleRequestChangetoadmin}
          onHide={(e) => {
            setCancleRequestChangetoadmin(false);
          }}
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Note</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <p className="text-black ">
              Your request has been submitted to the admin. They will now proceed with your request.
            </p>
          </Modal.Body>
          <Modal.Footer>
          <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1 text-white"
              variant="primary"
              onClick={(e) => {
                setCancleRequestChangetoadmin(false);
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
