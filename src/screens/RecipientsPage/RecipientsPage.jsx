import React, { useEffect, useState } from "react";
import "./RecipientsPage.scss";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import plus from "../../assets/images/PlusBG.svg";
import searchMan from "../../assets/images/searchman.svg";
import editBtn from "../../assets/images/editBG.svg";
import deleteBtn from "../../assets/images/deletBg.svg";
import axios from "axios";
import people from "../../assets/images/people.svg";
import groupPeople from "../../assets/images/groupPeople.svg";
import case1 from "../../assets/images/suitcase.svg";
import bankIcon from "../../assets/images/mdi_bank.svg";
import SubmitTransaction from "../../assets/images/SubmitTransaction.png";
import { Modal } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import backA from "../../assets/images/BackArrow.svg";
import drpa from "../../assets/images/drparrw.svg";
import walletIcon from "../../assets/images/ion_wallet.svg";
import cashW from "../../assets/images/bi_cash-stack.svg";
import { CommonConstants } from "../../Constants/common.constants";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function RecipientsPage() {
  const navigate = useNavigate();
  const [show3, setShowRec] = useState(false);
  const [showRCountry, setshowRCountry] = useState(false);

  // const validator = require("../../assets/js/validator");

  const handleCloseRecCountry = () => setshowRCountry(false);
  const handleShowRecCountry = () => setshowRCountry(true);

  const handleCloseRec = () => {setShowRec(false);}

  const handleCleanData = () =>{

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
      Relation: ""
    });
  }

  const [errorValidation,seterrorValidation]= useState(false)

  const handleShowRec = () => {
    // if (validator.error_input_validation("Reciver_Country_Id")) {
      if(countryvalidationerror === 1){
        setShowRec(true);
        setshowRCountry(false);
        seterrorValidation(false)
      }else{
        seterrorValidation(true)
      }
    // }
  };
  const [ReceiverInfo, setReceiverInfo] = useState([]);
  const [SearchInfo, setSearchInfo] = useState([]);
  const [Country, setCountry] = useState([]);
  const [selectReciever, setselectReciever] = useState(null);
  const [ExistUserWithsameMethod, setExistUserWithsameMethod] = useState(false);
  const [RequestChangetoadmin, setRequestChangetoadmin] = useState(false);
  const [existUserError,setexistUserError] = useState('')

  const [show5, setShowRec3] = useState(false);

  const handleCloseRec3 = () => {
     setShowRec3(false);
     setDropdownState(false); 
     setDropdownValue(""); 
     setDropdownState(false)
     setShowRec(true);
    }

    const handleCloseHide = () => {
      setShowRec3(false);
      setDropdownState(false); 
      setDropdownValue(""); 
      setDropdownState(false)
      setShowRec(false);
     }

  const handleShowRec3 = () => {
    if (firstSelect == true) {
      GetAllDeliveryMethod("individual")
    } else if (TwoSelect == true) {
      GetAllDeliveryMethod("joint")
    } else {
      GetAllDeliveryMethod("business")
    }
    setShowRec3(true)
    handleCloseRec();
    setshowRCountry(false);
  };

  // const [dropdownValue, setDropdownValue] = useState();
  const [dropdownValue, setDropdownValue] = useState("");
  const [dropdownValue1, setDropdownValue1] = useState("");
  const [dropdownState1, setDropdownState1] = useState(false);
  const [dropdownState, setDropdownState] = useState(false);
  const [getAllDeliveryMethodFirst, setgetAllDeliveryMethodFirst] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [selected, setSelected] = useState("IFSC");
  const [MethodId, setMethodId] = useState("");
  const [Methodname, setMethodname] = useState("");
  const [MethodId1, setMethodId1] = useState("");
  const [Methodname1, setMethodname1] = useState("");
  const [MethodId2, setMethodId2] = useState("");
  const [Methodname2, setMethodname2] = useState("");
  const [selected1, setSelected1] = useState("IFSC");
  const [selected2, setSelected2] = useState("IFSC");
  const [UpdateUserData, setUpdateUserData] = useState({});
  const [Uselected, setUselected] = useState(
    UpdateUserData.haveIfscCode === true ? "IFSC" : "NoIFSC"
  );
  const [getState, setgetState] = useState();
  const [show6, setShowRec6] = useState(false);
  const [FullnameArray, setFullnameArray] = useState([])
  const [inputFields, setInputFields] = useState([{ FullName: "" }]);
  const [inputFields1, setInputFields1] = useState([{ FullName: "" }]);
  const [inputFields2, setInputFields2] = useState([{ FullName: "" }]);
  const [Reciver_CountryId, setReciver_CountryId] = useState(154);
  const [show7, setShowRec7] = useState(false);
  const [loadervalue, setloadervalue] = useState(false);
  const [getAllDeliveryMethod, setgetAllDeliveryMethod] = useState([]);
  const [isVisibleDynamic, setIsVisibleDynamic] = useState("Bank Deposit");
  const [isVisibleDynamic2, setIsVisibleDynamic2] = useState("Bank Deposit");
  const [isVisibleDynamic3, setIsVisibleDynamic3] = useState("Bank Deposit");
  const [isVisibleDynamicU, setIsVisibleDynamicU] = useState("Bank Deposit");
  const [UpdateDeliverymethod, setUpdateDeliverymethod] = useState();
  const [UpdateDeliverymethodType, setUpdateDeliverymethodType] = useState();
  const handleCloseRec7 = () => setShowRec7(false);
  const handleShowRec7 = () => setShowRec7(true);

  const [firstSelect, setfirstSelect] = useState(true);
  const [TwoSelect, setTwoSelect] = useState(false);
  const [ThreeSelect, setThreeSelect] = useState(false);
  const [Banks, setBanks] = useState([]);
  const [UBanks, setUBanks] = useState([]);
  const [Deletereciptionpopup,setDeletereciptionpopup] = useState(false)
  const [Delete_id, setDelete_id] = useState()

  const handleShowDeletepopup = (e,_id) =>{
    setDeletereciptionpopup(true)
    setDelete_id(_id)
  }

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
        GetAllReciever();
        setDeletereciptionpopup(false)
        setloadervalue(false);
      } else if (response.data.status === "error") {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [Mobilelength,setMobilelength] = useState(false)

  const [invalid, setInvalid] = useState(false);
  const [step2SendMoneyvalue, setstep2SendMoneyvalue] = useState({
    Indidual_Firstname: "",
    Indidual_Middlename: "",
    Indidual_Lastname: "",
    Business_Name: "",
    BankName: "",
    BankAccountNumber: "",
    walletName: "",
    walletNo: "",
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

  const [step2UpdateSendMoneyvalue, setstep2UpdateSendMoneyvalue] = useState({
    UGroupId: "",
    UUserId: "",
    UIndidual_Firstname: "",
    UIndidual_Middlename: "",
    UIndidual_Lastname: "",
    UBusiness_Name: "",
    UBankName: "",
    UBankAccountNumber: "",
    UwalletName: "",
    UwalletNo: "",
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
    UBankId:""
  });

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

  const [adminRelation, setAdminRelation] = useState();

  const getRelation = async () => {
    const Relation = await axios.get(CommonConstants.BASE_URL + '/getactiverelations');
    setAdminRelation(Relation.data.data);

  }

  const toggleVisibilityDynamic = (value) => {
    setIsVisibleDynamic(value)
  };

  const toggleVisibilityDynamic2 = (value) => {
    setIsVisibleDynamic2(value)
  };

  const toggleVisibilityDynamic3 = (value) => {
    setIsVisibleDynamic3(value)
  };

  const toggleVisibilityDynamicU = (value) => {
    setIsVisibleDynamicU(value)
  };

  const toggleVisibility1 = () => {
    setIsVisible(false);
    setIsVisible1(true);
    setIsVisible2(false);
  };

  const toggleVisibility2 = () => {
    setIsVisible(false);
    setIsVisible1(false);
    setIsVisible2(true);
  };

  const handleRecieverValue = (e) => {
    let capitalizedValue = '';
    let sanitizedValue = '';
    let Numeric ='';
    let inputValue = e.target.value;
    const { name, value } = e.target;
    if(name=="Email"){
      setstep2SendMoneyvalue({ ...step2SendMoneyvalue, [name]: value });
    }else if(name=="Mobile"){
      if (inputValue) {
        // Remove any non-digit characters from the input
        Numeric = inputValue.replace(/\D/g, '');
      }
      setstep2SendMoneyvalue({ ...step2SendMoneyvalue, [name]: Numeric });
    }else if(name=="BankAccountNumber" || name=="walletNo"){
      if (inputValue) {
       var sanitizedValues = inputValue.replace(/[^a-zA-Z0-9]/g, '');
      sanitizedValue = sanitizedValues.toUpperCase();
    }
    setstep2SendMoneyvalue({ ...step2SendMoneyvalue, [name]: sanitizedValue });
    }else if(name=="BankName" || name=="Relation" || name == "walletName"){
    setstep2SendMoneyvalue({ ...step2SendMoneyvalue, [name]: inputValue });
    }else{
    if (inputValue) {
      var AlphanbetValue = inputValue.replace(/[^a-zA-Z\s]/g, '');

      const words = AlphanbetValue.split(' ');

      capitalizedValue = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    setstep2SendMoneyvalue({ ...step2SendMoneyvalue, [name]: capitalizedValue });
    }
  };

  const removeFieldsBankDeposite = (index) => {
    const fields = [...inputFields];
    fields.splice(index, 1);
    setInputFields(fields);
  };

  const removeFieldsWalletDeposite = (index) => {
    const fields = [...inputFields1];
    fields.splice(index, 1);
    setInputFields1(fields);
  };

  const removeFieldCashPickup = (index) => {
    const fields = [...inputFields2];
    fields.splice(index, 1);
    setInputFields2(fields);
  };

  useEffect(() => {
    GetAllReciever();
    getRelation();
    // GetAllBanks(); //aani jagya e function ni under mukvanu che
    GetAllState();
    GetAllCountrys();
    GetAllDeliveryMethod("individual");
  }, [firstSelect, TwoSelect, ThreeSelect, Reciver_CountryId]);


  const GetAllCountrys = async (values) => {
    setloadervalue(true);
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallrecivercountries" //getallrecivercountries
      );

      // if (response.data.status === true) {
      //   setCountry(response.data.data);
      //   setloadervalue(false);
      // }

      if (response.data.status === true) {
        const optionsForCountry = response.data.data.map((countryname) => ({
          value:
            countryname.id +
            " " +
            countryname.phoneCode +
            " " +
            countryname.name +
            " " +
            countryname.iso3,
          label: countryname.name,//countryname.emoji + " " +countryname.name,
          image:`https://flagcdn.com/16x12/${countryname.iso2.toLowerCase()}.png`,//countryname.iso2.toUpperCase()
          iso2:countryname.iso2
        }));
        setCountry(optionsForCountry);
        if (response.data.data.length >= 5) {
          setIsSearchable(true);
        } else {
          setIsSearchable(false);
        }
      } else if (response.data.status === false) {
      }

    } catch (err) {
      console.log(err);
    }
  };

  const [countrySelected, setcountrySelected] = useState('0');
  const [image,setimage] = useState('')
  const [isSearchable, setIsSearchable] = useState(false);
  const [countryvalidationerror, setcountryvalidationerror] = useState(0);
  const [CountryDetails, setCountryDetails] = useState({
    CountryId: "",
    CountryPhoneCode: "",
    CountryName: "",
    Countryiso3: "",
  });

const [CountryShow,setCountryShow] = useState(false)

  const CountryDataStep1 = (e) => {
    setcountryvalidationerror(1)
    setCountryShow(true)
    setcountrySelected(e)
    setimage(e.iso2)
    let arr = e?.value.split(" ");
    var CountryId = arr[0]
    setReciver_CountryId(Number(CountryId))
    
    setCountryDetails({
      ...CountryDetails,
      CountryId: arr[0],
      CountryPhoneCode: arr[1],
      CountryName: arr[2],
      Countryiso3: arr[3],
    });
  };

  const CustomOption = ({ innerProps, label, data }) => (
    <div {...innerProps} style={{ paddingLeft: '10px', paddingBottom: '8px', paddingTop: '8px' }}>
      <img src={data.image} alt={label} style={{ width: '20px', marginRight: '5px' }} />
      {label}
    </div>
  );

  const addFieldsBankDeposite = () => {
    let newfield = { FullName: "" };
    setInputFields([...inputFields, newfield]);
  };

  const addFieldsWalletDeposite = () => {
    let newfield1 = { FullName: "" };
    setInputFields1([...inputFields1, newfield1]);
  };

  const addFieldsCashPickup = () => {
    let newfield2 = { FullName: "" };
    setInputFields2([...inputFields2, newfield2]);
  };

  const handleFormChangeBankDeposite = (index, event) => {
    let data = [...inputFields];
    let inputValue = event.target.value;
    let capitalizedValue=''

    if (inputValue) {
      var AlphanbetValue = inputValue.replace(/[^a-zA-Z\s]/g, ''); // Include \s to match spaces
      const words = AlphanbetValue.split(' ');

      capitalizedValue = words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
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
    let data = [...inputFields2];
    data[index][event.target.name] = event.target.value;
    setInputFields2(data);
  };
  
  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
  };

  const handleDropdownClickoonee = () => {
    setDropdownState(false);
  };

  const [WalletName,setWalletName] = useState("")
  const [DeliveryName,setDeliveryName] = useState("")

  const handleChangeWalletname = (e) =>{
    const Walletid = e.target.value;
    var selectedWallet = Banks?.find((item)=> item?.id == Walletid)
    setWalletName(selectedWallet?.text)
  }

  const [UWalletName,setUWalletName] = useState("")
  const [UDeliveryName,setUDeliveryName] = useState("")

  const handleUpdateWalletname = (e) =>{
    const Walletid = e.target.value;
    var selectedWallet = UBanks?.find((item)=> item?.id == Walletid)
    setUWalletName(selectedWallet?.text)
  }


  const handleSetDropdownValue = (value, methodname, methodid) => {
    setMethodname(methodname)
    setMethodId(methodid)
    setDropdownValue(value);
    setDropdownState(!dropdownState);
    GetAllBanks(methodid)
    
  };

  const [dropdownStateU, setDropdownStateU] = useState(false);
  const [dropdownValueU, setDropdownValueU] = useState("");

  const handleDropdownClickU = () => {
    setDropdownStateU(!dropdownStateU);
  };

  const handleSetDropdownValueU = (value, methodname, methodid) => {
    // console.log(value,"value");
    setDropdownValueU(value);
    setDropdownStateU(!dropdownStateU);
    setMethodId(methodid);
    setMethodname(methodname);
    GetUpdateBanks(UpdateUserData.countryId,methodid)
  };

  const handleSetDropdownValueU1 = (value, methodname, methodid) => {
    // debugger
    setDropdownValueU(value);
    setMethodId(methodid);
    setMethodname(methodname);
    GetUpdateBanks(UpdateUserData.countryId,methodid)
  };

    ///////////////////Update Joint//////////////
    const [updateinputFields, setupdateinputFields] = useState([{ FullName: "" }]);

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
    const [UpdateFullnameArray, setUpdateFullnameArray] = useState([])
    const [JointUser, setJoinUser] = useState(false);

    const Updatesubmit = (e) => {
      e.preventDefault();
      setTwoSelect(false)
      if (updateinputFields[0].FullName == "" || updateinputFields[0].FullName == undefined) {
        setInvalid(true)
      } else {
        // handleCloseRec();
        setUpdateFullnameArray(updateinputFields);
        //setTwoSelect(true)
        setJoinUser(true);
        setShowRec7(true)
      }
    };
  
    ////////////////////////////////////////////

  const handleDropdownClick1 = () => {
    setDropdownState1(!dropdownState1);
    setShowRec(false)
  };

  const handleDropdownClickOne = () => {
    setDropdownState1(false);
  };

  const handleSetDropdownValue1 = (value, methodname, methodid) => {
    setMethodname1(methodname);
    setMethodId1(methodid);
    setDropdownValue1(value);
    setDropdownState1(!dropdownState1);
  };


  
  const [dropdownState2, setDropdownState2] = useState(false);
  const [dropdownValue2, setDropdownValue2] = useState(<>
    <img
      src={bankIcon}
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
        Bank Deposit
      </div>
    </div>
    <img
      src={drpa}
      alt=""
      className="img-fluid mt-4 ms-4"
    />
  </>);

  const handleDropdownClick2 = () => {
    setDropdownState2(!dropdownState2);
  };
  
  const handleDropdownClicktwp = () => {
    setDropdownState2(false);
  };

  const handleSetDropdownValue2 = (value, methodname, methodid) => {
    // console.log(methodname,"methodname",methodid);
    setMethodname2(methodname)
    setMethodId2(methodid)
    setDropdownValue2(value);
    setDropdownState2(!dropdownState2);
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

  const handleShowRec6 = (e) => {
    e.preventDefault();
    if (isVisibleDynamic == "Cash Pickup") {
      if (step2SendMoneyvalue.Indidual_Firstname == "" || step2SendMoneyvalue.Indidual_Firstname == undefined) {
        setInvalid(true);
      // } else if (step2SendMoneyvalue.Indidual_Middlename == "" || step2SendMoneyvalue.Indidual_Middlename == undefined) {
      //   setInvalid(true);

      } else if (step2SendMoneyvalue.Indidual_Lastname == "" || step2SendMoneyvalue.Indidual_Lastname == undefined) {
        setInvalid(true);

      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }
    if (isVisibleDynamic == "Wallet Deposit") {
      if (step2SendMoneyvalue.Indidual_Firstname == "" || step2SendMoneyvalue.Indidual_Firstname == undefined) {
        setInvalid(true);
      // } else if (step2SendMoneyvalue.Indidual_Middlename == "" || step2SendMoneyvalue.Indidual_Middlename == undefined) {
      //   setInvalid(true);

      } else if (step2SendMoneyvalue.Indidual_Lastname == "" || step2SendMoneyvalue.Indidual_Lastname == undefined) {
        setInvalid(true);

      } else if (step2SendMoneyvalue.walletName == "" || step2SendMoneyvalue.walletName == undefined) {
        setInvalid(true);

      } else if (step2SendMoneyvalue.walletNo == "" || step2SendMoneyvalue.walletNo == undefined) {
        setInvalid(true);

      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }

    if (isVisibleDynamic == "Bank Deposit") {
      if (step2SendMoneyvalue.Indidual_Firstname == "" || step2SendMoneyvalue.Indidual_Firstname == undefined) {
        setInvalid(true);
      // } else if (step2SendMoneyvalue.Indidual_Middlename == "" || step2SendMoneyvalue.Indidual_Middlename == undefined) {
      //   setInvalid(true);

      } else if (step2SendMoneyvalue.Indidual_Lastname == "" || step2SendMoneyvalue.Indidual_Lastname == undefined) {
        setInvalid(true);

      } else if (step2SendMoneyvalue.BankName == "" || step2SendMoneyvalue.BankName == undefined) {
        setInvalid(true);

      } else if (step2SendMoneyvalue.BankAccountNumber == "" || step2SendMoneyvalue.BankAccountNumber == undefined) {
        setInvalid(true);
        // }else if(step2SendMoneyvalue.IFSC_Code == "" ||step2SendMoneyvalue.IFSC_Code == undefined ){
        //   setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }
  };

  const [R_Country, setR_Country] = useState("");

  const handleReciverCountry = () => {
    setR_Country(true);
    // setShowRec3(false)
  };

  const GetAllDeliveryMethod = async (method) => {
    try {
      var data;
      if(method == "individual"){
        data = {
          toCountryId: Reciver_CountryId
        };
      }else{
        data = {
          toCountryId: Reciver_CountryId,
          userType: method
        };
      }

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallactivedeliverymethods",
        data
      );
      if (response.data.status === true) {
        var FilterDelivery = response.data.data.filter((Delivery) => Delivery.name === "Bank Deposit")
        var DeliveryDetails = FilterDelivery.length == 0 ? response.data.data : FilterDelivery
        setgetAllDeliveryMethod(response.data.data);
        var SelectedDelivery = FilterDelivery.length == 0 ? response.data.data : FilterDelivery
        setDeliveryName(SelectedDelivery[0]?.name)
        setgetAllDeliveryMethodFirst(SelectedDelivery[0]);
        // setgetDeliveryMethodIDFirst(SelectedDelivery[0]);///First Method///
        setMethodname(SelectedDelivery[0]?.name)
        setMethodId(SelectedDelivery[0]?.id)
        setMethodname1(DeliveryDetails[0]?.name)
        setMethodId1(DeliveryDetails[0]?.id)
        setMethodname2(DeliveryDetails[0]?.name)
        setMethodId2(DeliveryDetails[0]?.id)
        setIsVisibleDynamic(SelectedDelivery[0]?.name)
        setIsVisibleDynamic2(SelectedDelivery[0]?.name)
        setIsVisibleDynamic3(SelectedDelivery[0]?.name)
        GetAllBanks(SelectedDelivery[0]?.id);

        const IconName=response.data.data[0]?.name == "Bank Deposit" ? bankIcon : response.data.data.deliveryMethodName == "Wallet Deposit" ? walletIcon : response.data.data.deliveryMethodName == "Cash Pickup" ? cashW :""

        // handleSetDropdownValueU1(
        //   <>
        //     <img
        //       src={IconName}
        //       width="50"
        //       height="50"
        //       alt=""
        //       className="img-fluid"
        //     />
        //     <div className="d-flex flex-column ms-4">
        //       <div className="mainD responsiveFontLarge">
        //         Delivery Method
        //       </div>
        //       <div className="text-black text-start bolder  ">
        //         {response.data?.data[0]?.name}
        //       </div>
        //     </div>
        //     <img
        //       src={drpa}
        //       className="img-fluid mt-4 ms-4"
        //       alt=""
        //     />
        //   </>,
        //   response.data?.data[0]?.name,
        //   response.data?.data?.id
        // );
        // setUDeliveryName(response.data?.data[0]?.name)
        // toggleVisibilityDynamicU(
        //   response.data?.data[0]?.name
        // )

      } else if (response.data.status === false) {
      }
    } catch (err) {
      // console.log(err)
    }
  };

  const GetAllState = async () => {
    try {
      const userId = {
        id: Reciver_CountryId,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallstatebycountryid",
        userId
      );
      if (response.data.status === true) {
        setgetState(response.data.data);
        // GetAllCountrys()
        // setloadervalue(false);
      }
    } catch (err) {
    }
  };

  const GetAllReciever = async () => {
    setloadervalue(true);
    try {
      // const userId = {
      //   userId: localStorage.getItem("Id"),
      //   isDeleted: false
      // };

      const UserData = new FormData();
    UserData.append("userId",  localStorage.getItem("Id"));
    UserData.append("isDeleted", false);

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
        UserData
      );
      if (response.data.status === true) {
        setReceiverInfo(response.data.data);
        setSearchInfo(response.data.data)
        // setArrayCountry(countrysArray)
        // const cId=countrysArray.filter((countryname => response.data.data[0].countryId===countryname.id))
        // GetAllCountrys()
        setloadervalue(false);
      }
    } catch (err) {
      // console.log(err)
    }
  };

  const GetAllBanks = async (values) => {
    setloadervalue(true);
    try {
      const type = {
        "countryId": Reciver_CountryId,
        "deliveryTypeId": values ? values : MethodId 
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getactivetransactiondeliverymethods",
        type
      );
      if (response.data.status === true) {
        setBanks(response.data.data);
        setloadervalue(false);
      }else{
        setloadervalue(false);
      }
    } catch (err) {
      console.log(err)
    }
  };

  const Recieverselected = (R_id, userId) => {
    setselectReciever(R_id);
    // SummurryDetails(userId)
  };
  const [searchQuery, setSearchQuery] = useState('');

  // const handleSearchInputChange = (e) => {
  //   const value = e.target.value;
  //   setSearchQuery(value);

  //   const filteredRecipients = ReceiverInfo && ReceiverInfo.filter((recipient) => {
  //     var FullnameSearch = recipient.firstName+" "+recipient.lastName
  //     FullnameSearch && FullnameSearch.toLowerCase().includes(value.toLowerCase())||
  //     recipient.firstName && recipient.firstName.toLowerCase().includes(value.toLowerCase())||
  //     recipient.lastName && recipient.lastName.toLowerCase().includes(value.toLowerCase())||
  //     recipient.businessName && recipient.businessName.toLowerCase().includes(value.toLowerCase())||
  //     recipient.fullName && recipient.fullName.replace("[", "").replace("]", "").replace(/,/g, " , ").toLowerCase().includes(value.toLowerCase())
  //   });
  //   setReceiverInfo(filteredRecipients);
  //   if (value == "") {
  //     GetAllReciever();
  //   }
  // };
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
        //     ||
        // (recipient.deliveryMethodName &&
        //   recipient.deliveryMethodName.toLowerCase().includes(value.toLowerCase()))
      );
    });

    setReceiverInfo(filteredRecipients);
  };
  // const handleRecieverdelete = async (R_id) => {
  //   setloadervalue(true);

  //   try {
  //     const reciever_id = {
  //       id: R_id,
  //     };

  //     const response = await axios.post(
  //       CommonConstants.BASE_URL + "/deleterecipienstsbyid",
  //       reciever_id
  //     );
  //     if (response.data.status === true) {
  //       GetAllReciever();
  //       setloadervalue(false);
  //     } 
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const submit = (e) => {
    e.preventDefault();
    setTwoSelect(false)
    if (inputFields2[0].FullName == "" || inputFields2[0].FullName == undefined) {
      setInvalid(true)
    } else {
      handleCloseRec();
      setFullnameArray(inputFields2);
      //setTwoSelect(true)
      setJoinUser(true);
      setShowRec6(true)
    }
  };

  const handleCloseRec6 = () => {
    setErrors(false)
    setShowRec6(false);
    setShowRec3(false);
  };

  const handlebackContactDetails = () => {
    setErrors(false)
    setShowRec6(false);
    setShowRec3(true);
  };

  const handleUpdateWalletName = (e) =>{
    setstep2UpdateSendMoneyvalue({ ...step2UpdateSendMoneyvalue, UBankId: e.target.value });
  }

  const[selectedDeliveryMethod,setSelectedDeliveryMethod]=useState();

  const UpdateReciever = async (UID,UserType) => {
    setloadervalue(true);
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
        setUDeliveryName(response.data.data?.deliveryMethodName)
        setUWalletName(response.data.data?.walletName)
        GetAllDeliveryMethod(response.data.data.type)

        const fullNameArray = response.data.data.fullName
          .substring(1, response.data.data.fullName.length - 1)
          .split(",");

          // console.log(fullNameArray,"fullNameArray")

        var EdittempArray2 = [];
        fullNameArray.map((JointName, index) => {
            EdittempArray2.push({
              FullName : JointName
            });
          });
        setupdateinputFields(EdittempArray2);

        step2UpdateSendMoneyvalue.UBankId = response.data.data.bankId
        setMethodId(response.data.data.deliveryMethodId)
        setMethodname(response.data.data.deliveryMethodName)
        handleShowRec7();

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
        GetUpdateBanks(response.data.data.countryId,response.data.data.deliveryMethodId)
        if (checkIFSC == true) {
          setUselected("IFSC")
        } else {
          setUselected("NoIFSC")
        }
        setstep2UpdateSendMoneyvalue((prevState) => ({
          ...prevState,
          UIndidual_Firstname: response.data.data.firstName,
          UIndidual_Middlename: response.data.data.middleName,
          UIndidual_Lastname: response.data.data.lastName,
          UBusiness_Name: response.data.data.businessName,
          UBankName: response.data.data.deliveryMethodName == "Bank Deposit" ? response.data.data.bankId : "",
          UBankAccountNumber: response.data.data.bankAccNo,
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
          UwalletNo: response.data.data.walletNo,
          UwalletName: response.data.data.deliveryMethodName == "Wallet Deposit" ? response.data.data.bankId : ""
        }));
        // step2UpdateSendMoneyvalue.UwalletName
        setloadervalue(false);
      } else if (response.data.status === "error") {
        // setloadervalue(false)
      }
    } catch (err) {
    }
  };

  const GetUpdateBanks = async (id , idd2) => {
    try {
      const type = {
        "countryId":id,
        "deliveryTypeId":idd2
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getactivetransactiondeliverymethods",//getallbank replace -- getactivetransactiondeliverymethods
        type
      );
      if (response.data.status === true) {
        setUBanks(response.data.data);
        // console.log(response.data.data)
      }else{

      }
    } catch (err) {
    }
  };
  const [errors, setErrors] = useState(false);
  const [errorsU, setErrorsU] = useState(false);

  //////////////Add Reciver API///////////////
  const ADDReciever = async () => {
    try {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if(Reciver_CountryId === 154){
        if (step2SendMoneyvalue.Relation == "" || step2SendMoneyvalue.Relation == undefined) {
          setErrors(true)
        } else if (step2SendMoneyvalue.City == "" || step2SendMoneyvalue.City == undefined) {
          setErrors(true)
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
          countryId: Reciver_CountryId,
          stateId: step2SendMoneyvalue.State,
          postalCode: step2SendMoneyvalue.PostalCode,
          city: step2SendMoneyvalue.City,
          deliveryMethodId: +MethodId,
          deliverymethodname: Methodname,
          bankId: DeliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
          bankAccNo: step2SendMoneyvalue.BankAccountNumber,
          haveIfscCode: false,//selected === "IFSC" ? true : false,
          ifscCode: step2SendMoneyvalue.IFSC_Code,
          bankStateId: step2SendMoneyvalue.BankState,
          district: step2SendMoneyvalue.District,
          bankBranch: step2SendMoneyvalue.Branch,
          bankDetailsVerified: false,
          otherDetails: "",
          oldRecipientsId: 0,
          walletName: WalletName,
          walletNo: step2SendMoneyvalue.walletNo
        };
        const response = await axios.post(
          CommonConstants.BASE_URL + "/adduserrecipients",
          RecieverData
        );
      if (response.data.status === true) {
        if(response.data.message == "Recipients already exists with same delivery method and account number!"){
          setShowRec6(false);
          setExistUserWithsameMethod(true)
          setexistUserError(response.data.message)
          setloadervalue(false);
          setfirstSelect(true);
          setTwoSelect(false);
          setThreeSelect(false);
          handleCleanData();
          BlankField()
        }else{
          BlankField();
          GetAllReciever();
          setShowRec6(false);
          // handleCloseRec();
          handleCloseRecCountry();
          setloadervalue(false);
        }
      }
    }
      }else{
        if (step2SendMoneyvalue.Address == "" || step2SendMoneyvalue.Address == undefined) {
          setErrors(true)
        } else if (step2SendMoneyvalue.State == "" || step2SendMoneyvalue.State == undefined) {
          setErrors(true)
        } else if (step2SendMoneyvalue.Mobile.length <= 0) {
          setErrors(true)
        } else if (step2SendMoneyvalue.Email == "" || !emailRegex.test(step2SendMoneyvalue.Email)) {
          setErrors(true)
        } else if (step2SendMoneyvalue.Relation == "" || step2SendMoneyvalue.Relation == undefined) {
          setErrors(true)
        } else if (step2SendMoneyvalue.PostalCode == "" || step2SendMoneyvalue.PostalCode == undefined) {
          setErrors(true)
        } else if (step2SendMoneyvalue.City == "" || step2SendMoneyvalue.City == undefined) {
          setErrors(true)
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
            countryId: Reciver_CountryId,
            stateId: step2SendMoneyvalue.State,
            postalCode: step2SendMoneyvalue.PostalCode,
            city: step2SendMoneyvalue.City,
            deliveryMethodId: +MethodId,
            deliverymethodname: Methodname,
            bankId: DeliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
            bankAccNo: step2SendMoneyvalue.BankAccountNumber,
            haveIfscCode: false,//selected === "IFSC" ? true : false,
            ifscCode: step2SendMoneyvalue.IFSC_Code,
            bankStateId: step2SendMoneyvalue.BankState,
            district: step2SendMoneyvalue.District,
            bankBranch: step2SendMoneyvalue.Branch,
            bankDetailsVerified: false,
            otherDetails: "",
            oldRecipientsId: 0,
            walletName: WalletName,
            walletNo: step2SendMoneyvalue.walletNo
          };
          const response = await axios.post(
            CommonConstants.BASE_URL + "/adduserrecipients",
            RecieverData
          );
        // const RecieverData = {
        //    type: "individual",
        //     groupId: +localStorage.getItem("Id"),
        //     userId: +localStorage.getItem("Id"),
        //     firstName: step2SendMoneyvalue.Indidual_Firstname,
        //     middleName: step2SendMoneyvalue.Indidual_Middlename,
        //     lastName: step2SendMoneyvalue.Indidual_Lastname,
        //     fullName: "[]",
        //     businessName: "",
        //     address: step2SendMoneyvalue.Address,
        //     relation: step2SendMoneyvalue.Relation,
        //     phone: +step2SendMoneyvalue.Mobile,
        //     email: step2SendMoneyvalue.Email,
        //     relationId: 0,
        //     countryId: +Reciver_CountryId,
        //     stateId: step2SendMoneyvalue.State,
        //     postalCode: step2SendMoneyvalue.PostalCode,
        //     city: step2SendMoneyvalue.City,
        //     deliveryMethodId: +MethodId,
        //     deliverymethodname: Methodname,
        //     bankId: step2SendMoneyvalue.BankName !== "" ? +step2SendMoneyvalue.BankName : +step2SendMoneyvalue.walletName,
        //     bankAccNo: step2SendMoneyvalue.BankAccountNumber,
        //     haveIfscCode: false,//selected === "IFSC" ? true : false,
        //     ifscCode: step2SendMoneyvalue.IFSC_Code,
        //     bankStateId: step2SendMoneyvalue.BankState,
        //     district: step2SendMoneyvalue.District,
        //     bankBranch: step2SendMoneyvalue.Branch,
        //     bankDetailsVerified: false,
        //     otherDetails: "",
        //     oldRecipientsId: 0,
        //     walletName: "",
        //     walletNo: step2SendMoneyvalue.walletNo
        // };
        // const response = await axios.post(
        //   CommonConstants.BASE_URL + "/adduserrecipients",
        //   RecieverData
        // );
        if (response.data.status === true) {
          if(response.data.message == "Recipients already exists with same delivery method and account number!"){
            setShowRec6(false);
            setExistUserWithsameMethod(true)
            setexistUserError(response.data.message)
            setloadervalue(false);
            setfirstSelect(true);
            setTwoSelect(false);
            setThreeSelect(false);
            handleCleanData();
            BlankField()
          }else{
            BlankField();
            GetAllReciever();
            setShowRec6(false);
            // handleCloseRec();
            handleCloseRecCountry();
            setloadervalue(false);
          }
        }
      }
      }
    } catch (err) {
      console.log(err);
    }
  
  };
  /////////////////////////////

  /////////////Business Reciption Add API///////////////
  const ADDBusinessReciever = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if(Reciver_CountryId === 154){
      if (step2SendMoneyvalue.Relation == "" || step2SendMoneyvalue.Relation == undefined) {
        setErrors(true)
      } else if (step2SendMoneyvalue.City == "" || step2SendMoneyvalue.City == undefined) {
        setErrors(true)
      } else {
      setloadervalue(true);
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
        walletName: WalletName,
        walletNo: step2SendMoneyvalue.walletNo,
        relationId: step2SendMoneyvalue.Relation, //remaining
        countryId: Reciver_CountryId,
        stateId: step2SendMoneyvalue.State,
        postalCode: step2SendMoneyvalue.PostalCode,
        city: step2SendMoneyvalue.City,
        deliveryMethodId: +MethodId,
        // deliverymethodname: Methodname,
        bankId: DeliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
        bankAccNo: step2SendMoneyvalue.BankAccountNumber,
        haveIfscCode: selected2 === "IFSC" ? true : false,
        ifscCode: step2SendMoneyvalue.IFSC_Code,
        bankStateId: step2SendMoneyvalue.BankState,
        district: step2SendMoneyvalue.District,
        bankBranch: step2SendMoneyvalue.Branch,
        bankDetailsVerified: false,
        otherDetails: "", //remaining
        oldRecipientsId: 0,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/adduserrecipients",
        BusinessRecieverData
      );
    if (response.data.status === true) {
      if(response.data.message == "Recipients already exists with same delivery method and account number!"){
        setShowRec6(false);
        setExistUserWithsameMethod(true)
        setexistUserError(response.data.message)
        setloadervalue(false);
        One1()
        handleCleanData();
        BlankField()
      }else{
        BlankField();
        GetAllReciever();
        setShowRec6(false);
        // handleCloseRec();
        handleCloseRecCountry();
        setloadervalue(false);
        One1()
        handleCleanData();
        BlankField()
      }
    }
  }
    }else{
      if (step2SendMoneyvalue.Address == "" || step2SendMoneyvalue.Address == undefined) {
        setErrors(true)
      } else if (step2SendMoneyvalue.State == "" || step2SendMoneyvalue.State == undefined) {
        setErrors(true)
      } else if (step2SendMoneyvalue.Mobile.length <= 0) {
        setErrors(true)
      } else if (step2SendMoneyvalue.Email == "" || !emailRegex.test(step2SendMoneyvalue.Email)) {
        setErrors(true)
      } else if (step2SendMoneyvalue.Relation == "" || step2SendMoneyvalue.Relation == undefined) {
        setErrors(true)
      } else if (step2SendMoneyvalue.PostalCode == "" || step2SendMoneyvalue.PostalCode == undefined) {
        setErrors(true)
      } else if (step2SendMoneyvalue.City == "" || step2SendMoneyvalue.City == undefined) {
        setErrors(true)
      } else {
      setloadervalue(true);
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
        walletName: WalletName,
        walletNo: step2SendMoneyvalue.walletNo,
        relationId: step2SendMoneyvalue.Relation, //remaining
        countryId: Reciver_CountryId,
        stateId: step2SendMoneyvalue.State,
        postalCode: step2SendMoneyvalue.PostalCode,
        city: step2SendMoneyvalue.City,
        deliveryMethodId: +MethodId,
        // deliverymethodname: Methodname,
        bankId: DeliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
        bankAccNo: step2SendMoneyvalue.BankAccountNumber,
        haveIfscCode: selected2 === "IFSC" ? true : false,
        ifscCode: step2SendMoneyvalue.IFSC_Code,
        bankStateId: step2SendMoneyvalue.BankState,
        district: step2SendMoneyvalue.District,
        bankBranch: step2SendMoneyvalue.Branch,
        bankDetailsVerified: false,
        otherDetails: "", //remaining
        oldRecipientsId: 0,
      };
        const response = await axios.post(
          CommonConstants.BASE_URL + "/adduserrecipients",
          BusinessRecieverData
        );
      if (response.data.status === true) {
        if(response.data.message == "Recipients already exists with same delivery method and account number!"){
          setShowRec6(false);
          setExistUserWithsameMethod(true)
          setexistUserError(response.data.message)
          setloadervalue(false);
          One1()
          handleCleanData();
          BlankField()
        }else{
          BlankField();
          GetAllReciever();
          setShowRec6(false);
          // handleCloseRec();
          handleCloseRecCountry();
          setloadervalue(false);
          One1()
          handleCleanData();
          BlankField()
        }
      }
    }
    }
    // setloadervalue(true);
    // try {
    //   const BusinessRecieverData = {
    //     type: "business",
    //     groupId: +localStorage.getItem("Id"),
    //     userId: +localStorage.getItem("Id"),
    //     firstName: "",
    //     middleName: "",
    //     lastName: "",
    //     fullName: "[]",
    //     businessName: step2SendMoneyvalue.Business_Name,
    //     address: step2SendMoneyvalue.Address,
    //     relation: "",
    //     phone: +step2SendMoneyvalue.Mobile,
    //     email: step2SendMoneyvalue.Email,
    //     walletName: step2SendMoneyvalue.walletName,
    //     walletNo: step2SendMoneyvalue.walletNo,
    //     relationId: step2SendMoneyvalue.Relation, //remaining
    //     countryId: Reciver_CountryId,
    //     stateId: step2SendMoneyvalue.State,
    //     postalCode: step2SendMoneyvalue.PostalCode,
    //     city: step2SendMoneyvalue.City,
    //     deliveryMethodId: +MethodId,
    //     // deliverymethodname: Methodname,
    //     bankId: +step2SendMoneyvalue.BankName,
    //     bankAccNo: step2SendMoneyvalue.BankAccountNumber,
    //     haveIfscCode: selected2 === "IFSC" ? true : false,
    //     ifscCode: step2SendMoneyvalue.IFSC_Code,
    //     bankStateId: step2SendMoneyvalue.BankState,
    //     district: step2SendMoneyvalue.District,
    //     bankBranch: step2SendMoneyvalue.Branch,
    //     bankDetailsVerified: false,
    //     otherDetails: "", //remaining
    //     oldRecipientsId: 0,
    //   };
    //   const response = await axios.post(
    //     CommonConstants.BASE_URL + "/adduserrecipients",
    //     BusinessRecieverData
    //   );
    //   if (response.data.status === true) {
    //     if(response.data.data == null){
    //       setShowRec6(false);
    //       setExistUserWithsameMethod(true)
    //       setexistUserError(response.data.message)
    //       setloadervalue(false);
    //     }else{
    //       BlankField();
    //       GetAllReciever();
    //       setShowRec6(false);
    //       handleCloseRec();
    //       handleCloseRecCountry();
    //       setloadervalue(false);
    //     }
    //   } else if (response.data.status === "error") {
    //     console.log(response.data.message);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  };
  ////////////////////////////

  /////////////Joint Reciption Add API///////////////
  const ADDJointReciever = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if(Reciver_CountryId === 154){
      if (step2SendMoneyvalue.Relation == "" || step2SendMoneyvalue.Relation == undefined) {
        setErrors(true)
      } else if (step2SendMoneyvalue.City == "" || step2SendMoneyvalue.City == undefined) {
        setErrors(true)
      } else {
      setloadervalue(true);
      let FullnameArr = []

      inputFields.map((val) => {
        FullnameArr.push(val.FullName)
      })

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
        countryId: Reciver_CountryId,
        stateId: step2SendMoneyvalue.State,
        postalCode: step2SendMoneyvalue.PostalCode,
        city: step2SendMoneyvalue.City,
        deliveryMethodId: +MethodId,
        deliveryMethodname: "",//DeliveryMethodName,
        bankId: DeliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
        bankAccNo: step2SendMoneyvalue.BankAccountNumber,
        haveIfscCode: selected2 === "IFSC" ? true : false,
        ifscCode: step2SendMoneyvalue.IFSC_Code,
        bankStateId: step2SendMoneyvalue.BankState,
        district: step2SendMoneyvalue.District,
        bankBranch: step2SendMoneyvalue.Branch,
        bankDetailsVerified: false,
        otherDetails: "",
        oldRecipientsId: 0
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/adduserrecipients",
        JointRecieverData
      );
    if (response.data.status === true) {
      if(response.data.message == "Recipients already exists with same delivery method and account number!"){
        setShowRec6(false);
        setExistUserWithsameMethod(true)
        setexistUserError(response.data.message)
        setloadervalue(false);
        One1()
        handleCleanData();
        BlankField()
        setInputFields([{ FullName: "" }])
      }else{
        BlankField();
        GetAllReciever();
        setShowRec6(false);
        // handleCloseRec();
        handleCloseRecCountry();
        setloadervalue(false);
        One1()
        handleCleanData();
        BlankField()
        setInputFields([{ FullName: "" }])
      }
    }
  }
    }else{
      if (step2SendMoneyvalue.Address == "" || step2SendMoneyvalue.Address == undefined) {
        setErrors(true)
      } else if (step2SendMoneyvalue.State == "" || step2SendMoneyvalue.State == undefined) {
        setErrors(true)
      } else if (step2SendMoneyvalue.Mobile.length <= 0) {
        setErrors(true)
      } else if (step2SendMoneyvalue.Email == "" || !emailRegex.test(step2SendMoneyvalue.Email)) {
        setErrors(true)
      } else if (step2SendMoneyvalue.Relation == "" || step2SendMoneyvalue.Relation == undefined) {
        setErrors(true)
      } else if (step2SendMoneyvalue.PostalCode == "" || step2SendMoneyvalue.PostalCode == undefined) {
        setErrors(true)
      } else if (step2SendMoneyvalue.City == "" || step2SendMoneyvalue.City == undefined) {
        setErrors(true)
      } else {
      setloadervalue(true);
      let FullnameArr = []

      inputFields.map((val) => {
        FullnameArr.push(val.FullName)
      })

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
        countryId: Reciver_CountryId,
        stateId: step2SendMoneyvalue.State,
        postalCode: step2SendMoneyvalue.PostalCode,
        city: step2SendMoneyvalue.City,
        deliveryMethodId: +MethodId,
        deliveryMethodname: "",//DeliveryMethodName,
        bankId: DeliveryName == "Wallet Deposit" ?  +step2SendMoneyvalue.walletName : +step2SendMoneyvalue.BankName,
        bankAccNo: step2SendMoneyvalue.BankAccountNumber,
        haveIfscCode: selected2 === "IFSC" ? true : false,
        ifscCode: step2SendMoneyvalue.IFSC_Code,
        bankStateId: step2SendMoneyvalue.BankState,
        district: step2SendMoneyvalue.District,
        bankBranch: step2SendMoneyvalue.Branch,
        bankDetailsVerified: false,
        otherDetails: "",
        oldRecipientsId: 0
      };
        const response = await axios.post(
          CommonConstants.BASE_URL + "/adduserrecipients",
          JointRecieverData
        );
      if (response.data.status === true) {
        if(response.data.message == "Recipients already exists with same delivery method and account number!"){
          setShowRec6(false);
          setExistUserWithsameMethod(true)
          setexistUserError(response.data.message)
          setloadervalue(false);
          One1()
          handleCleanData();
          BlankField()
        }else{
          BlankField();
          GetAllReciever();
          setShowRec6(false);
          // handleCloseRec();
          handleCloseRecCountry();
          setloadervalue(false);
          One1()
          handleCleanData();
          BlankField()
          setInputFields([{ FullName: "" }])
        }
      }
    }
    }
  };
  ////////////////////////////
  
  const BlankField = () =>{
    step2SendMoneyvalue.Indidual_Firstname= ""
          step2SendMoneyvalue.Indidual_Middlename= ""
          step2SendMoneyvalue.Indidual_Lastname= ""
          step2SendMoneyvalue.Business_Name= ""
          step2SendMoneyvalue.BankName= ""
          step2SendMoneyvalue.BankAccountNumber= ""
          step2SendMoneyvalue.walletName= ""
          step2SendMoneyvalue.walletNo= ""
          step2SendMoneyvalue.zaiUserId= ""
          step2SendMoneyvalue.IFSC= ""
          step2SendMoneyvalue.NoIFSC= ""
          step2SendMoneyvalue.IFSC_Code= ""
          step2SendMoneyvalue.BankState= ""
          step2SendMoneyvalue.District= ""
          step2SendMoneyvalue.Branch= ""
          step2SendMoneyvalue.Address= ""
          step2SendMoneyvalue.City= ""
          step2SendMoneyvalue.State= ""
          step2SendMoneyvalue.PostalCode= ""
          step2SendMoneyvalue.Mobile= ""
          step2SendMoneyvalue.Email= ""
          step2SendMoneyvalue.Relation= ""
  }

  //////////////Update Individual/////////////
  const UpdateindividualReciever = async () => {
    // debugger
    setloadervalue(true);
    try {
      const URecieverData = {
          user_Recipients :{
          id: UpdateUserData.id,
          groupId: +localStorage.getItem("Id"),
          userId: +localStorage.getItem("Id"),
          type: "individual",
          firstName: step2UpdateSendMoneyvalue.UIndidual_Firstname,
          middleName: step2UpdateSendMoneyvalue.UIndidual_Middlename,
          lastName: step2UpdateSendMoneyvalue.UIndidual_Lastname,
          fullName: "[]",
          businessName: "",
          address: step2UpdateSendMoneyvalue.UAddress,
          relation: "",
          phone: +step2UpdateSendMoneyvalue.UMobile,
          relationId: step2UpdateSendMoneyvalue.URelation,
          email: step2UpdateSendMoneyvalue.UEmail,
          countryId: Reciver_CountryId,
          stateId: step2UpdateSendMoneyvalue.UState,
          postalCode: step2UpdateSendMoneyvalue.UPostalCode,
          city: step2UpdateSendMoneyvalue.UCity,
          deliveryMethodId: +MethodId,
          bankId: UDeliveryName == "Bank Deposit" ? +step2UpdateSendMoneyvalue.UBankName : UDeliveryName == "Wallet Deposit" ?  +step2UpdateSendMoneyvalue.UwalletName : 0, 
          bankAccNo: UDeliveryName == "Bank Deposit" ? step2UpdateSendMoneyvalue.UBankAccountNumber : "",
          haveIfscCode: Uselected === "IFSC" ? true : false,
          ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
          bankStateId: +step2UpdateSendMoneyvalue?.UBankState,
          district: step2UpdateSendMoneyvalue.UDistrict,
          bankBranch: step2UpdateSendMoneyvalue.UBranch,
          bankDetailsVerified: false,
          otherDetails: "", //remaining
          oldRecipientsId: 0,
          walletName: UDeliveryName == "Wallet Deposit" ? UWalletName : "",
          walletNo:  UDeliveryName == "Wallet Deposit" ? step2UpdateSendMoneyvalue.UwalletNo : ""
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
        handleCloseRec7();
        setloadervalue(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(UDeliveryName,"UDeliveryName")
  ///////////////////////////////////////////////////

  //////////////Business Update//////////////////////
  const UpdateBusinessReciever = async () => {
    setloadervalue(true);

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
          email: step2UpdateSendMoneyvalue.UEmail,
          walletName: UDeliveryName == "Wallet Deposit" ? UWalletName : "",
          walletNo: UDeliveryName == "Wallet Deposit" ? step2UpdateSendMoneyvalue.UwalletNo : "",
          // relationId: 0,
          countryId: Reciver_CountryId,
          stateId: step2UpdateSendMoneyvalue.UState,
          postalCode: step2UpdateSendMoneyvalue.UPostalCode,
          city: step2UpdateSendMoneyvalue.UCity,
          deliveryMethodId: +MethodId,
          bankId: UDeliveryName == "Wallet Deposit" ?  +step2UpdateSendMoneyvalue.UwalletName : UDeliveryName == "Bank Deposit" ? +step2UpdateSendMoneyvalue.UBankName : 0, 
          bankAccNo: UDeliveryName == "Bank Deposit" ? step2UpdateSendMoneyvalue.UBankAccountNumber : "",
          haveIfscCode: Uselected === "IFSC" ? true : false,
          ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
          bankStateId: +step2UpdateSendMoneyvalue?.UBankState,
          district: step2UpdateSendMoneyvalue.UDistrict,
          bankBranch: step2UpdateSendMoneyvalue.UBranch,
          bankDetailsVerified: false,
          otherDetails: "", //remaining
          oldRecipientsId: 0
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
        // setReceiverInfo(response.data.data)
        // GetAllCountrys()
        // handleShowRec6()
        GetAllReciever();
        handleCloseRec7();
        setloadervalue(false);
      } 
    } catch (err) {
      console.log(err);
      // setloadervalue(true)
    }
  };
  ///////////////////////////////////////////////////

  /////////////Joint Reciption Add API///////////////
  const UpdateJointReciever = async () => {
    try {
      setloadervalue(true)
      let FullnameArr = []
      updateinputFields.map((val) => {
        FullnameArr.push(val.FullName)
      })
      
      // debugger

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
          countryId: Reciver_CountryId,
          stateId: step2UpdateSendMoneyvalue.UState,
          postalCode: step2UpdateSendMoneyvalue.UPostalCode,
          city: step2UpdateSendMoneyvalue.UCity,
          deliveryMethodId: +MethodId,
          // deliverymethodname: Methodname,
          bankId: UDeliveryName == "Wallet Deposit" ?  +step2UpdateSendMoneyvalue.UwalletName : UDeliveryName == "Bank Deposit" ? +step2UpdateSendMoneyvalue.UBankName : 0, 
          bankAccNo: UDeliveryName == "Bank Deposit" ? step2UpdateSendMoneyvalue.UBankAccountNumber : "",
          haveIfscCode: selected2 === "IFSC" ? true : false,
          ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
          bankStateId: +step2UpdateSendMoneyvalue.UBankState,
          district: step2UpdateSendMoneyvalue.UDistrict,
          bankBranch: step2UpdateSendMoneyvalue.UBranch,
          bankDetailsVerified: UpdateUserData.bankDetailsVerified,//bankDetailsVerified
          otherDetails: "", //remaining
          oldRecipientsId: 0
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
      } else if (response.data.status === "error") {
        console.log(response.data.message);
      }
    } catch (err) {
    }
  };
  ///////////////////////////////////////////////////

  const handleBusiness2 = () => {
    if (isVisibleDynamic2 == "Wallet Deposit") {
      if (inputFields[0].FullName == "" || inputFields[0].FullName == undefined) {
        setInvalid(true)
      } else if (step2SendMoneyvalue.walletName == "" || step2SendMoneyvalue.walletName == undefined) {
        setInvalid(true)
      } else if (step2SendMoneyvalue.walletNo == "" || step2SendMoneyvalue.walletNo == undefined) {
        setInvalid(true)
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }
    
    if (isVisibleDynamic2 == "Bank Deposit") {

      // inputFields
      // for(let i = inputFields)
      // debugger
      const isAnyFullNameBlank = inputFields.some(item => item.FullName === "");

      if (isAnyFullNameBlank) {
        setInvalid(true);
      } else if (step2SendMoneyvalue.BankName == "" || step2SendMoneyvalue.BankName == undefined) {
        setInvalid(true);
      } else if (step2SendMoneyvalue.BankAccountNumber == "" || step2SendMoneyvalue.BankAccountNumber == undefined) {
        setInvalid(true);
        // }else if(step2SendMoneyvalue.IFSC_Code == "" ||step2SendMoneyvalue.IFSC_Code == undefined ){
        //   setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }

  }

  const handleBusiness = () => {
    if (isVisibleDynamic3 == "Cash Pickup") {
      if (step2SendMoneyvalue.Business_Name == "" || step2SendMoneyvalue.Business_Name == undefined) {
        setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    } else if (isVisibleDynamic3 == "Wallet Deposit") {
      if (step2SendMoneyvalue.Business_Name == "" || step2SendMoneyvalue.Business_Name == undefined) {
        setInvalid(true)
      } else if (step2SendMoneyvalue.walletName == "" || step2SendMoneyvalue.walletName == undefined) {
        setInvalid(true)
      } else if (step2SendMoneyvalue.walletNo == "" || step2SendMoneyvalue.walletNo == undefined) {
        setInvalid(true)
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    } else if (isVisibleDynamic3 == "Bank Deposit") {
      if (step2SendMoneyvalue.BankName == "" || step2SendMoneyvalue.BankName == undefined) {
        setInvalid(true);
      } else if (step2SendMoneyvalue.BankAccountNumber == "" || step2SendMoneyvalue.BankAccountNumber == undefined) {
        setInvalid(true);
      } else {
        setShowRec6(true);
        setShowRec3(false);
      }
    }
  }

  return (
    <>
      <section className="secRecipient abtPage loginpagepadding responsiveMainForMobile">
      <NavBar></NavBar>
        <Container className="bg-white mt-5 rounded-4 mb-5 px-3">
          <Row className="mx-4 pt-3">
            {loadervalue == true ? <Loader /> : ""}
            <Col className="col-lg-12 d-flex respoChildFooter mt-3 justify-content-between align-items-center ms-auto ps-0 pe-0">
              <h1 className="purpleText bolder">Recipients</h1>
              <Button
                className="mt-2 col-lg-3 ps-2 pe-2 d-block fullRoundedCorner justify-content-end rounded-5 nextBtn1"
                variant="primary"
                onClick={handleShowRecCountry} //handleShowRec}
              >
                <img src={plus} className="img-fluid" alt=""/> &nbsp; &nbsp;ADD RECIPIENT
              </Button>
            </Col>
          </Row>

          <Container className="">
            <Row className="my-4 mx-4 ps-0 pe-0 mb-0 ">
              <div className="ps-0 pe-0">
                <div className="right-inner-addon input-container ">
                  <img src={searchMan} className="searchMain" alt="" />
                  <input
                    type="text"
                    className="form-control purpleTextV py-4 "
                    placeholder="Search recipient"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                </div>
              </div>
            </Row>
            <Row className="tableRespo1">
                {
                  ReceiverInfo.length > 0 ?
              <div className=" p-4 ">
                <div className="row">
                  {ReceiverInfo &&
                    ReceiverInfo.map((RecieverDetails, index) => {
                      return (
                        <>
                        <div className="d-flex">
                          <div
                            className={`${selectReciever == index ? "activeCardR" : ""
                              } p-4 mt-3 col-lg-12`}
                            onClick={(e) => {
                              Recieverselected(index, RecieverDetails.id);
                            }}
                          >
                            <div className="row">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="1 bolder text-black">
                                {RecieverDetails.firstName +
                                " " +
                                RecieverDetails.lastName}
                              {RecieverDetails.businessName}
                              {RecieverDetails.fullName == "[]" ? "" : RecieverDetails.fullName.replace("[", "").replace("]", "").replace(/,/g, " , ")}
                                </div>
                                <div className="1 cursor-pointer d-flex">
                                  <img
                                    src={editBtn}
                                    alt=""
                                    className={`img-fluid pointer ${selectReciever == index
                                      ? "d-block"
                                      : "d-none"
                                      }`}
                                    onClick={() => {
                                      UpdateReciever(RecieverDetails.id,RecieverDetails?.type);
                                    }} //handleShowRec7}
                                  />
                                  <img
                                    src={deleteBtn}
                                    alt=""
                                    className={`img-fluid pointer ps-2 ${selectReciever == index
                                      ? "d-block"
                                      : "d-none"
                                      }`}
                                    onClick={(e) => {
                                      handleShowDeletepopup(e, RecieverDetails.id);
                                    }}
                                  />
                                  <img
                                    src={SubmitTransaction}
                                    alt=""
                                    height={35}
                                    width={35}
                                    className={`pointer ms-2`}
                                    onClick={() => {
                                      const Data ={
                                        recipientId: RecieverDetails?.id,
                                        deliveryMethodName: RecieverDetails?.deliveryMethodName,
                                        deliveryMethodId: RecieverDetails?.deliveryMethodId
                                      }
                                      navigate({pathname:'/sendmoney',state:{ReciptionData :Data}})
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="d-flex justify-content-between mt-2">
                                <div className="1 text-black">
                                {RecieverDetails.phone == 0 ? "-" : RecieverDetails.phone}
                                </div>
                                {/* <div className="1">
                                  <img
                                    src={deleteBtn}
                                    alt=""
                                    className={`img-fluid pointer ${selectReciever == index
                                      ? "d-block"
                                      : "d-none"
                                      }`}
                                    onClick={(e) => {
                                      handleShowDeletepopup(e, RecieverDetails.id);
                                    }}
                                  />
                                </div> */}
                              </div>
                              <div className="d-flex justify-content-between mt-2">
                                <div className="1 text-black">{RecieverDetails.deliveryMethodName == "" ? "" : RecieverDetails.deliveryMethodName}</div>
                              </div>
                              <div className="d-flex justify-content-between mt-2">
                                <div className="1 text-black">{RecieverDetails.bankName == "" || RecieverDetails.bankName == undefined ? "" : RecieverDetails.bankName}</div>
                              </div>
                              <div
                                className={`d-flex justify-content-between mt-2 ${selectReciever == index ? "d-block" : "d-none"
                                  }`}
                              >
                                <div className={`1 text-black `}>
                                  {RecieverDetails.bankAccNo == "" ? RecieverDetails.walletNo : RecieverDetails.bankAccNo}
                                </div>
                              </div>
                              <div
                                className={`d-flex justify-content-between mt-2 ${selectReciever == index ? "d-block" : "d-none"
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
                                </div>
                              </div>
                              <div
                                className={`d-flex justify-content-between mt-2 `}
                              >
                                <div className={`1 text-black `}>
                                  No. of Transactions : {RecieverDetails.noOfTransaction == "" || RecieverDetails.noOfTransaction == null ? 0 : RecieverDetails.noOfTransaction}
                                </div>
                              </div>
                            </div>
                            
                          </div>
                            {/* <div className="justify-content-end d-flex col-lg-1 pt-4">
                            <img
                                src={SubmitTransaction}
                                alt=""
                                className={`img-fluid pointer submitTransactionLogo`}
                                onClick={() => {
                                  const Data ={
                                    recipientId: RecieverDetails?.id,
                                    deliveryMethodName: RecieverDetails?.deliveryMethodName,
                                    deliveryMethodId: RecieverDetails?.deliveryMethodId
                                  }
                                  navigate({pathname:'/sendmoney',state:{ReciptionData :Data}})
                                }}
                              />
                            
                            </div> */}
                        </div>
                          <hr className="py-1 mt-4"></hr>
                        </>
                      );
                    })}
                </div>
                
              </div>
              :
                
              <div className="align-items-center d-flex justify-content-center">
                  <p>No recipient data available</p>
                </div>
                }
            </Row>
          </Container>

          {/* First modal Start*/}
          {/* /////////reciver country start/////// */}
          <Modal
            show={showRCountry}
            onHide={handleCloseRecCountry}
            size="lg"
          >
            <Modal.Header className="text-center d-block justify-content-center m-auto mt-3">
              <Modal.Title>
                <h1 className="purpleText bolder ">Add Recipient Country</h1>
              </Modal.Title>
            </Modal.Header>
            <small className="responsiveFontLarge  text-black mt-3 text-center bolder mb-2">
              Select Recipient Country
            </small>
            <Modal.Body>
              <Form id="Reciver_Country_Id">
                <Row className="mb-3">
                  {/* <Form.Group
                    as={Col}
                    className="left-inner-addon input-container required"
                    controlId="formGridEmail1"
                  >
                    <Form.Select
                      onChange={handle_Reciver_CountryId}
                      className="purpleBorder required form-input"
                    >
                      {Country &&
                        Country.map((countryname, index) => {
                          return (
                            <option value={countryname.id}>
                              {countryname.emoji}&nbsp;&nbsp;{countryname.name}
                            </option>
                          );
                        })}
                    </Form.Select>
                    <label for="name" className="form-label1">
                      Select Country
                    </label>
                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                      Please select the country
                    </small>
                  </Form.Group> */}
                  <Form.Group
                    as={Col}
                    className="left-inner-addon input-container required "
                    controlId="formGridEmail1"
                  >
                    {image == '' ? 
                    <div>
                      <i className="purpleText mainStep3	fa fa-flag svgNationality"></i> 
                    </div>
                    :''}
                    { image != '' ?
                        <div className="Flagimgset">
                            <img src={`https://flagcdn.com/40x30/${image.toLowerCase()}.png`} alt={image} style={{ width: '20px' }} />
                        </div>
                        :
                        ''
                    }
                    <Select
                      // name="bankId"
                      id="country"
                      options={Country}
                      className="responsiveFontLarge SelectValueSelect nationality SelectValueSelect1 SelectHoverLabel required pointer"
                      value={countrySelected}
                      closeMenuOnSelect={true}
                      isSearchable={isSearchable}
                      onChange={CountryDataStep1}
                      components={{ Option: CustomOption }}
                    />
                    <label
                      htmlFor="name"
                      className="form-label1 "
                    >
                      Select Country
                    </label>
                    { errorValidation && <small className={`responsiveFontLarge responsiveFontLarge ${countryvalidationerror == 0 ? "d-block" : "d-none"} text-danger ms-2 `}>
                      Please select the country
                    </small>
}
                  </Form.Group>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer className="mb-2">
              <Button
                className="mt-2 col-lg-3 d-block m-auto nextBtn1"
                variant="primary"
                onClick={handleShowRec}
              >
                Select
              </Button>
            </Modal.Footer>
          </Modal>
          {/* /////////reciver country end/////// */}
          {/* First modal End*/}

          {/* /////////reciver Type start/////// */}
          <Modal
            show={show3}
            onHide={(e)=>{handleCloseRec(); handleCleanData(); One1();}}
            size="lg"
          >
            <Modal.Header className="text-center d-block justify-content-center m-auto mt-3">
              <Modal.Title>
                <h1 className="purpleText bolder ">Add Recipient</h1>
              </Modal.Title>
            </Modal.Header>
            <small className="responsiveFontLarge  text-black mt-3 text-center bolder mb-2">
              Select recipient type
            </small>
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
                            <div className="innerIconRec p-4 mt-2">
                              <img src={people} className="img-fluid" />
                              <span className="text-black bolder ms-3">
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
                            <div className="innerIconRec p-4 mt-2">
                              <img src={groupPeople} className="img-fluid" />
                              <span className="text-black bolder ms-3">
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
                            <div className="innerIconRec p-4 mt-2">
                              <img src={case1} className="img-fluid" />
                              <span className="text-black bolder ms-3">
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
            onHide={(e)=>{handleCloseHide(); handleCleanData(); One1(); handleDropdownClicktwp(); handleDropdownClickOne(); handleDropdownClickoonee();  }}
            size="lg"
          >
            {/* /////First Form////// */}

            <Row className={`${firstSelect === true ? "d-block" : "d-none"}`}>
              <Modal.Header className="text-center  mt-3">
                <img
                  src={backA}
                  className="img-fluid pointer"
                  alt=""
                  onClick={(e)=>{handleCloseRec3(e); handleDropdownClickoonee(e); One1(e); }}
                />
                <Modal.Title className="d-flex m-auto">
                  <h1 className="purpleText bolder">Add Recipient</h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="mainss">
                <Row>
                  <Col className="col-lg-12 d-flex m-auto justify-content-center" >
                    <div className={`dropdown`}>
                      <button
                        onClick={handleDropdownClick}
                        // onBlur={handleDropdownClick}
                        className="dropdown-btn d-flex justify-content-evenly align-items-start DropDownSize"
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
                              <div className=" mainD responsiveFontLarge">Delivery Method</div>
                              <div className="text-black text-start bolder  ">
                                {getAllDeliveryMethodFirst?.name}
                              </div>
                            </div>
                            <img src={drpa} className="img-fluid mt-4 ms-4" alt="" />
                          </>

                        ) : (
                          dropdownValue
                        )}
                      </button>

                      <div
                        className={`dropdown-items ${dropdownState ? "isVisible" : "isHidden"
                          }`}
                      >

                        {getAllDeliveryMethod &&
                          getAllDeliveryMethod.map((DeliveryMethod, index) => {
                            return (
                              <div
                                className="dropdown-item"
                                // onClick={(e) => toggleVisibilityDynamic(DeliveryMethod.name, e)}
                              >
                                <div
                                  className="dropdown__link d-flex align-items-start "
                                  onClick={(e) =>{
                                    setDeliveryName(DeliveryMethod?.name)
                                    handleSetDropdownValue(
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
                                          alt=""
                                          className="img-fluid mt-4 ms-4"
                                        />
                                      </>, DeliveryMethod.name, DeliveryMethod.id
                                    )
                                    toggleVisibilityDynamic(DeliveryMethod.name, e)
                                  }
                                  }
                                >
                                  <img
                                    src={CommonConstants.BASE_URL + DeliveryMethod.logo}
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
                      </div>
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
                        <Form className="mt-3 sendMoneyPaddingForm" id="Signup_Step1">
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="First Name"
                                name="Indidual_Firstname"
                                id="FirstName"
                                value={step2SendMoneyvalue.Indidual_Firstname}
                                onFocus={handleDropdownClickoonee}
                                className="formControlStep2 required form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">First Name</label>
                              {invalid && !step2SendMoneyvalue.Indidual_Firstname && <small className="responsiveFontLarge text-start text-danger error_message ms-2 error">
                                First Name is required
                              </small>}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Middle Name"
                                id="MiddleName"
                                name="Indidual_Middlename"
                                onFocus={handleDropdownClickoonee}
                                value={step2SendMoneyvalue.Indidual_Middlename}
                                className="formControlStep2  form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">Middle Name</label>
                              {/* {invalid && !step2SendMoneyvalue.Indidual_Middlename && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                Middle Name is required
                              </small>} */}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container  text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Last Name"
                                id="LastName"
                                value={step2SendMoneyvalue.Indidual_Lastname}
                                onFocus={handleDropdownClickoonee}
                                name="Indidual_Lastname"
                                className="formControlStep2 required form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">Last Name</label>
                              {invalid && !step2SendMoneyvalue.Indidual_Lastname && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                Last Name is required
                              </small>}

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
                                className="purpleBorder form-input required"
                                defaultValue="Individual"
                                name="BankName"
                                id="select1"
                                onFocus={handleDropdownClickoonee}
                                value={step2SendMoneyvalue.BankName}
                                onChange={handleRecieverValue}
                              >
                                <option value="">
                                  Bank Name
                                </option>
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
                              <label for="name" className="form-label1">Bank Name</label>
                              {invalid && !step2SendMoneyvalue.BankName && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                Bank Name  is required
                              </small>}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-landmark"></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Bank Account Number"
                                id="Bank_Account_Number"
                                value={step2SendMoneyvalue.BankAccountNumber}
                                name="BankAccountNumber"
                                onFocus={handleDropdownClickoonee}
                                className="formControlStep2 required form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">Bank Account Number</label>
                              {invalid && !step2SendMoneyvalue.BankAccountNumber && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                Bank Account Number  is required
                              </small>}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <div className={`${Number(Reciver_CountryId) == 101 ? 'd-block' : 'd-none'}`}>
                          <div className=" d-flex align-items-center my-3">
                            <div className="radio">
                              <input
                                type="radio"
                                name="IFSC"
                                value="IFSC"
                                id="male"
                                onFocus={handleDropdownClickoonee}
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
                                onFocus={handleDropdownClickoonee}
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
                            className={`${selected === "IFSC" ? "d-none" : "d-block"
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
                                  onFocus={handleDropdownClickoonee}
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
                                <label for="name" className="form-label1">Bank State</label>
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
                                  onFocus={handleDropdownClickoonee}
                                  value={step2SendMoneyvalue.District}
                                  id="select1"
                                  onChange={handleRecieverValue}
                                >
                                  {/* <option value="Registered">Registered as Business</option>
                                  <option value="Individual">District</option>
                                  <option value="Business">Business</option>
                                <option value="Agent">Agent</option> */}
                                </Form.Control>
                                <label for="name" className="form-label1">Bank District</label>
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
                                  onFocus={handleDropdownClickoonee}
                                  id="select1"
                                  value={step2SendMoneyvalue.Branch}
                                  onChange={handleRecieverValue}
                                >
                                </Form.Control>
                                <label for="name" className="form-label1">Bank Branch</label>
                                {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                              </Form.Group>
                            </Row>
                          </div>

                          <div
                            id="male1"
                            className={`${selected === "NoIFSC" ? "d-none" : "d-block"
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
                                  onFocus={handleDropdownClickoonee}
                                  value={step2SendMoneyvalue.IFSC_Code}
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleRecieverValue}
                                />
                                <label for="name" className="form-label1">IFSC Code (if India) / Routing Number (in USA)/ BSB (in AUS)</label>
                                {/* {invalid && !step2SendMoneyvalue.IFSC_Code && <small className="responsiveFontLarge   text-danger error_message ms-2 error">
                                    IFSC Code is required
                                  </small>} */}

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
                          className="my-4 col-lg-3 d-block m-auto nextBtn1"
                          variant="primary"
                          onClick={handleShowRec6}
                        >
                          NEXT
                        </Button>
                      </Col>
                    </Row>
                  </>
                ) :

                  isVisibleDynamic == "Wallet Deposit" ? (
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
                                  className="left-inner-addon input-container "
                                >
                                  <i className="purpleText main fa fa-user "></i>
                                  <Form.Control
                                    type="text"
                                    required
                                    placeholder="First Name"
                                    name="Indidual_Firstname"
                                    value={step2SendMoneyvalue.Indidual_Firstname}
                                    onFocus={handleDropdownClickoonee}
                                    className="formControlStep2 form-input required"
                                    onChange={handleRecieverValue}
                                  />
                                  <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    First Name
                                  </small>
                                  <label for="name" className="form-label1">First Name</label>

                                  {/* {errors.name && <p>{errors.name}</p>} */}
                                </Form.Group>
                              </Row>
                              <Row className="">
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container"
                                >
                                  <i className="purpleText main fa fa-user "></i>
                                  <Form.Control
                                    type="text"
                                    required
                                    placeholder="Middle Name"
                                    name="Indidual_Middlename"
                                    value={step2SendMoneyvalue.Indidual_Middlename}
                                    onFocus={handleDropdownClickoonee}
                                    className="formControlStep2 form-input "
                                    onChange={handleRecieverValue}
                                  />
                                  <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    Middle Name
                                  </small>
                                  <label for="name" className="form-label1">Middle Name</label>

                                  {/* {errors.name && <p>{errors.name}</p>} */}
                                </Form.Group>
                              </Row>
                              <Row className="">
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container"
                                >
                                  <i className="purpleText main fa fa-user "></i>
                                  <Form.Control
                                    type="text"
                                    required
                                    placeholder="Last Name"
                                    name="Indidual_Lastname"
                                    value={step2SendMoneyvalue.Indidual_Lastname}
                                    onFocus={handleDropdownClickoonee}
                                    className="formControlStep2 form-input required"
                                    onChange={handleRecieverValue}
                                  />
                                  <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    Last Name
                                  </small>
                                  <label for="name" className="form-label1">Last Name</label>

                                  {/* {errors.name && <p>{errors.name}</p>} */}
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container "
                                >
                                  <i className="purpleText mainStep4 fas fa-wallet"></i>
                                  {/* <Form.Control
                                    type="text"
                                    required
                                    placeholder="Wallet Name"
                                    name="walletName"
                                    className="formControlStep2 form-input reflink link"
                                    onChange={handleRecieverValue}
                                  /> */}
                                  <Form.Select
                                  className="purpleBorder form-input"
                                  defaultValue="Individual"
                                  name="walletName"
                                  value={step2SendMoneyvalue.walletName}
                                  onFocus={handleDropdownClickoonee}
                                  id="select1"
                                  onChange={(e)=>{handleRecieverValue(e); handleChangeWalletname(e)}}
                                >
                                  {/* <option value="Registered">Registered as Business</option> */}
                                  <option value="">
                                  Wallet Name 
                                  </option>
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
                                <label for="name" className="form-label1">Wallet Name</label>
                                  {/* <Form.Select
                                  className="purpleBorder"
                                  defaultValue="Wallet name"
                                  id="select1"
                                >
                                  <option value="Registered">Registered as Business</option>
                                  <option value="Individual">
                                    Wallet name
                                  </option>
                                  <option value="Business">1</option>
                                  <option value="Agent">2</option>
                                </Form.Select> */}
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2 form-input"/> */}
                                </Form.Group>
                              </Row>

                              <Row className="">
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container required"
                                >
                                  <i className="purpleText main fas fa-wallet "></i>
                                  <Form.Control
                                    type="text"
                                    required
                                    placeholder="Wallet Account no. "
                                    name="walletNo"
                                    value={step2SendMoneyvalue.walletNo}
                                    className="formControlStep2 form-input reflink link"
                                    onChange={handleRecieverValue}
                                    onFocus={handleDropdownClickoonee}
                                  />
                                  <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    Wallet Account no.
                                  </small>
                                  <label for="name" className="form-label1">Wallet Account no.</label>

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
                            className="my-4 col-lg-3 d-block m-auto nextBtn1"
                            variant="primary"
                            onClick={handleShowRec6}
                          >
                            NEXT
                          </Button>
                        </Col>
                      </Row>
                    </>
                  ) :

                    isVisibleDynamic == "Cash Pickup" ? (
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
                                    className="left-inner-addon input-container"
                                  >
                                    <i className="purpleText main fa fa-user "></i>
                                    <Form.Control
                                      type="text"
                                      required
                                      placeholder="First Name"
                                      value={step2SendMoneyvalue.Indidual_Firstname}
                                      name="Indidual_Firstname"
                                      id="FirstName"
                                      className="formControlStep2 form-input required"
                                      onFocus={handleDropdownClickoonee}
                                      onChange={handleRecieverValue}
                                    />
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                      First Name
                                    </small>
                                    <label for="name" className="form-label1">First Name</label>

                                    {/* {errors.name && <p>{errors.name}</p>} */}
                                  </Form.Group>
                                </Row>
                                <Row className="">
                                  <Form.Group
                                    as={Col}
                                    className="left-inner-addon input-container required"
                                  >
                                    <i className="purpleText main fa fa-user "></i>
                                    <Form.Control
                                      type="text"
                                      required
                                      placeholder="Middle Name"
                                      id="MiddleName"
                                      name="Indidual_Middlename"
                                    value={step2SendMoneyvalue.Indidual_Middlename}
                                    className="formControlStep2 form-input "
                                    onFocus={handleDropdownClickoonee}
                                      onChange={handleRecieverValue}
                                    />
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                      Middle Name
                                    </small>
                                    <label for="name" className="form-label1">Middle Name</label>

                                    {/* {errors.name && <p>{errors.name}</p>} */}
                                  </Form.Group>
                                </Row>
                                <Row className="">
                                  <Form.Group
                                    as={Col}
                                    className="left-inner-addon input-container required"
                                  >
                                    <i className="purpleText main fa fa-user "></i>
                                    <Form.Control
                                      type="text"
                                      required
                                      placeholder="Last Name"
                                      id="LastName"
                                      name="Indidual_Lastname"
                                      className="formControlStep2 form-input required"
                                    value={step2SendMoneyvalue.Indidual_Lastname}
                                    onFocus={handleDropdownClickoonee}
                                    onChange={handleRecieverValue}
                                    />
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                      Last Name
                                    </small>
                                    <label for="name" className="form-label1">Last Name</label>

                                    {/* {errors.name && <p>{errors.name}</p>} */}
                                  </Form.Group>
                                </Row>
                              </Form>
                            </Form>
                          </Col>
                        </Row>
                        <Row>
                          <Col className="col-lg-12 my-4">
                            <Button
                              className="my-4 col-lg-3 d-block m-auto nextBtn1"
                              variant="primary"
                              onClick={handleShowRec6}
                            >
                              NEXT
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )
                      : ""}
              </Modal.Body>
            </Row>

            {/* /////Second Form////// */}

            <Row className={`${TwoSelect === true ? "d-block" : "d-none"}`}>
              <Modal.Header className="text-center  mt-3">
                <img
                  src={backA}
                  className="img-fluid pointer"
                  onClick={(e)=>{handleCloseRec3(e); handleDropdownClickOne(e); One1(e);}}
                  alt=""
                />
                <Modal.Title className="d-flex m-auto">
                  <h1 className="purpleText bolder">Add Recipient</h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="mainss">
                <Row>
                  <Col className="col-lg-12 d-flex m-auto justify-content-center">
                    <div className={`dropdown`}>
                      <button
                        onClick={handleDropdownClick1}
                        // onBlur={handleDropdownClick1}
                        className="dropdown-btn d-flex justify-content-evenly align-items-start"
                      >
                        {dropdownValue1 === "" ? (
                          <>
                            <img
                              src={bankIcon}
                              alt=""
                              width="50"
                              height="50"
                              className="img-fluid"
                            />
                            <div className="d-flex flex-column ms-4">
                              <div className="mainD responsiveFontLarge">Delivery Method</div>
                              <div className="text-black text-start bolder  ">
                                {getAllDeliveryMethodFirst?.name}
                              </div>
                            </div>
                            <img src={drpa} className="img-fluid mt-4 ms-4" alt="" />
                          </>
                        ) : (
                          dropdownValue1
                        )}
                      </button>
                      <div
                        className={`dropdown-items ${dropdownState1 ? "isVisible" : "isHidden"
                          }`}
                      >
                        {getAllDeliveryMethod &&
                          getAllDeliveryMethod.map((DeliveryMethod, index) => {
                            return (
                              <div
                                className="dropdown-item"
                                // onClick={(e) => toggleVisibilityDynamic2(DeliveryMethod.name, e)}
                              >
                                <div
                                  className="dropdown__link d-flex align-items-start "
                                  onClick={(e) =>{
                                    setDeliveryName(DeliveryMethod?.name)
                                    handleSetDropdownValue1(
                                      <>
                                        <img
                                          src={CommonConstants.BASE_URL +DeliveryMethod.logo}
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
                                      </>
                                    )
                                    toggleVisibilityDynamic2(DeliveryMethod.name, e)
                                  }
                                  }
                                >
                                  <img
                                    src={CommonConstants.BASE_URL + DeliveryMethod.logo}
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
                            <img src={plus} className="img-fluid" /> add
                            account holder
                            {/* RECIPIENT */}
                          </Button>
                        </Col>
                      </Row>
                      <Form>
                        <Form className="sendMoneyPaddingForm
mt-3" id="Signup_Step1">
                          <Form onSubmit={submit}>
                            {inputFields.map((input, index) => {
                              return (
                                <div key={index} className="pb-2">
                                  <Row className="pb-2">
                                    <div className="d-flex p-0 m-0">
                                    <Form.Group
                                      as={Col}
                                      className="left-inner-addon input-container text-start pb-0"
                                    >
                                      <i className="purpleText main fa fa-user "></i>
                                      <Form.Control
                                        type="text"
                                        id={index}
                                        required
                                        value={input.FullName}
                                        placeholder={"Full Name "}
                                        name="FullName"
                                        onFocus={handleDropdownClickOne}
                                        className="formControlStep2 form-input required form-input"
                                        // onBlur={submit}
                                        onChange={(event) =>
                                          handleFormChangeBankDeposite(
                                            index,
                                            event
                                          )
                                        }
                                      />
                                      <label for="name" className="form-label1">Full Name </label>
                                    </Form.Group>
                                      <span className={`pt-2 ${index==0 ? "d-none": "d-block"}`} onClick={() => removeFieldsBankDeposite(index)}><i class="fas fa-times-circle pointer" ></i></span>
                                    </div>
                                      {invalid && !inputFields[index].FullName && <small className="responsiveFontLarge text-start text-danger error_message ms-2 error">
                                        Full Name is required
                                      </small>}
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
                                className="purpleBorder form-input "
                                defaultValue="Individual"
                                id="select1"
                                name="BankName"
                                value={step2SendMoneyvalue?.BankName}
                                onFocus={handleDropdownClickOne}
                                onChange={handleRecieverValue}
                              >
                                <option value="">
                                  Bank Name 
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
                              <label for="name" className="form-label1">Bank Name</label>
                              {invalid && !step2SendMoneyvalue.BankName && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                Bank Name is required
                              </small>}
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
                                onFocus={handleDropdownClickOne}
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">Bank Account Number</label>
                              {invalid && !step2SendMoneyvalue.BankAccountNumber && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                Bank Account Number is required
                              </small>}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <div className={`${Reciver_CountryId === 101 ? 'd-block' : 'd-none'}`}>

                          <div className=" d-flex align-items-center my-3">
                            <div className="radio">
                              <input
                                type="radio"
                                name="IFSC1"
                                value="IFSC"
                                id="IFSC1"
                                checked={selected1 === "IFSC"}
                                onFocus={handleDropdownClickOne}
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
                                onFocus={handleDropdownClickOne}
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
                            className={`${selected1 === "IFSC" ? "d-none" : "d-block"
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
                                  onFocus={handleDropdownClickOne}
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
                                <label for="name" className="form-label1">Bank State</label>
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
                                  onFocus={handleDropdownClickOne}
                                  name="District"
                                  id="select1"
                                  value={step2SendMoneyvalue.District}
                                  onChange={handleRecieverValue}
                                />
                                <label for="name" className="form-label1">Bank District</label>
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
                                  onFocus={handleDropdownClickOne}
                                  value={step2SendMoneyvalue.Branch}
                                  onChange={handleRecieverValue}
                                />
                                <label for="name" className="form-label1">Bank Branch</label>
                                {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                              </Form.Group>
                            </Row>
                          </div>

                          <div
                            className={`${selected1 === "NoIFSC" ? "d-none" : "d-block"
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
                                  onFocus={handleDropdownClickOne}
                                />
                                <label for="name" className="form-label1">IFSC Code (if India) / Routing Number (in USA)/ BSB (in AUS)</label>
                                {/* {invalid && !step2SendMoneyvalue.IFSC_Code &&  <small className="responsiveFontLarge   text-danger error_message ms-2 error">
                                    IFSC Code is required
                                  </small>} */}

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
              ) :

                isVisibleDynamic2 == "Wallet Deposit" ? (
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
                              <img src={plus} className="img-fluid" /> add
                              account holder
                              {/* RECIPIENT */}
                            </Button>
                          </Col>
                        </Row>
                        <Form>
                          <Form className="sendMoneyPaddingForm
mt-3" id="Signup_Step1">
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
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Full Name
                              </small>
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
                                        onFocus={handleDropdownClickOne}
                                        className="formControlStep2 reflink link form-input"
                                        onChange={(event) =>
                                          handleFormChangeWalletDeposite(
                                            index,
                                            event
                                          )
                                        }
                                      />
                                      <label for="name" className="form-label1">Full Name </label>
                                      <span className="pt-2 " onClick={() => removeFieldsWalletDeposite(index)}><i class="fas fa-times-circle pointer" ></i></span>

                                      {/* {errors.name && <p>{errors.name}</p>} */}
                                    </Form.Group>
                                      {invalid && !inputFields1[0].FullName && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                        Full Name is required
                                      </small>}
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
                                <Form.Select
                                  className="purpleBorder form-input"
                                  defaultValue="Individual"
                                  name="walletName"
                                  value={step2SendMoneyvalue.walletName}
                                  onFocus={handleDropdownClickoonee}
                                  id="select1"
                                  onChange={(e)=>{handleRecieverValue(e); handleChangeWalletname(e)}}
                                >
                                  {/* <option value="Registered">Registered as Business</option> */}
                                  <option value="">
                                  Wallet Name 
                                  </option>
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
                                <label for="name" className="form-label1">Wallet Name</label>
                                {invalid && !step2SendMoneyvalue.walletName && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                  wallet name is required
                                </small>}
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
                                  onFocus={handleDropdownClickOne}
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleRecieverValue}
                                />
                                <label for="name" className="form-label1">Wallet Account no.</label>
                                {invalid && !step2SendMoneyvalue.walletNo && <small className="responsiveFontLarge   text-danger error_message ms-2 error">
                                  Wallet Account no.
                                </small>}

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
                ) :

                  isVisibleDynamic2 == "Cash Pickup" ? (
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
                                <img src={plus} className="img-fluid" /> add
                                account holder
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
                                  <div key={index} className="align-items-center position-relative">
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
                                          onFocus={handleDropdownClickOne}
                                          className="formControlStep2 reflink link form-input"
                                          onChange={(event) =>
                                            handleFormChangeCashPickup(
                                              index,
                                              event
                                            )
                                          }
                                        />
                                        <label for="name" className="form-label1">Full Name</label>
                                      <span className="pt-2 " onClick={() => removeFieldCashPickup(index)}><i class="fas fa-times-circle pointer" ></i></span>

                                        {invalid && !inputFields2[0].FullName && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                          Full Name is required
                                        </small>}
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
                  ) : ""}
              </Modal.Body>
            </Row>

            {/* /////Third Form////// */}

            <Row className={`${ThreeSelect === true ? "d-block" : "d-none"}`}>
              <Modal.Header className="text-center  mt-3">
                <img
                  src={backA}
                  className="img-fluid pointer"
                  onClick={(e)=>{handleCloseRec3(e); handleDropdownClickOne(e); One1(e);}}
                  alt=""
                />
                <Modal.Title className="d-flex m-auto">
                  <h1 className="purpleText bolder">Add Recipient</h1>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="mainss">
                <Row>
                  <Col className="col-lg-12 d-flex m-auto justify-content-center">
                    <div className={`dropdown`}>
                      <button
                        onClick={handleDropdownClick2}
                        // onBlur={handleDropdownClick2}
                        className="dropdown-btn d-flex justify-content-evenly align-items-start"
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
                              <div className="mainD responsiveFontLarge">Delivery Method</div>
                              <div className="text-black text-start bolder  ">
                                {getAllDeliveryMethodFirst.name}
                              </div>
                            </div>
                            <img src={drpa} className="img-fluid mt-4 ms-4" alt="" />
                          </>
                        ) : (
                          dropdownValue2
                        )}
                      </button>

                      <div
                        className={`dropdown-items ${dropdownState2 ? "isVisible" : "isHidden"
                          }`}
                      >
                        {getAllDeliveryMethod &&
                          getAllDeliveryMethod.map((DeliveryMethod, index) => {
                            return (
                              <div
                                className="dropdown-item"
                                onClick={(e) => toggleVisibilityDynamic3(DeliveryMethod.name, e)}
                              >
                                <div
                                  className="dropdown__link d-flex align-items-start "
                                  onClick={(e) =>{
                                    setDeliveryName(DeliveryMethod?.name)
                                    handleSetDropdownValue2(
                                      <>
                                        <img
                                          src={CommonConstants.BASE_URL + DeliveryMethod.logo}
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
                                      </>
                                    )
                                  toggleVisibilityDynamic3(DeliveryMethod.name, e)
                                  }
                                  }
                                >
                                  <img
                                    src={CommonConstants.BASE_URL +DeliveryMethod.logo}
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

                        {/* <div
                          className="dropdown-item"
                          onClick={toggleVisibility1}
                        >
                          <div
                            className="dropdown__link d-flex justify-content-evenly align-items-start "
                            onClick={() =>
                              handleSetDropdownValue(
                                <>
                                  <img
                                    src={walletIcon}
                                    width="50"
                                    height="50"
                                    className="img-fluid"
                                  />
                                  <div className="d-flex flex-column ms-4">
                                    <div className="mainD responsiveFontLarge">
                                      Delivery Method
                                    </div>
                                    <div className="text-black text-start bolder  ">
                                      Wallet Deposit
                                    </div>
                                  </div>
                                  <img
                                    src={drpa}
                                    className="img-fluid mt-4 ms-4"
                                  />
                                </>
                              )
                            }
                          >
                            <img
                              src={walletIcon}
                              width="30"
                              height="30"
                              className="img-fluid"
                            />{" "}
                            <div className="text-black bolder text-center ms-4">
                              Wallet Deposit{" "}
                            </div>
                          </div>
                        </div>
                        <div
                          className="dropdown-item"
                          onClick={toggleVisibility2}
                        >
                          <div
                            className="dropdown__link d-flex justify-content-evenly align-items-start "
                            onClick={() =>
                              handleSetDropdownValue(
                                <>
                                  <img
                                    src={cashW}
                                    width="50"
                                    height="50"
                                    className="img-fluid"
                                  />{" "}
                                  <div className="d-flex flex-column ms-4">
                                    <div className="mainD responsiveFontLarge">
                                      Delivery Method
                                    </div>
                                    <div className="text-black text-start bolder  ">
                                      Cash Pickup
                                    </div>
                                  </div>
                                  <img
                                    src={drpa}
                                    className="img-fluid mt-4 ms-4"
                                  />
                                </>
                              )
                            }
                          >
                            <img
                              src={cashW}
                              width="30"
                              height="30"
                              className="img-fluid"
                            />{" "}
                            <div className="text-black  bolder text-center ms-4">
                              Cash Pickup{" "}
                            </div>
                          </div>
                        </div> */}
                      </div>
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
                                placeholder="Business Name"
                                name="Business_Name"
                                value={step2SendMoneyvalue.Business_Name}
                                onFocus={handleDropdownClicktwp}
                                className="formControlStep2 required form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">Business Name </label>
                              {invalid && !step2SendMoneyvalue.Business_Name && <small className="responsiveFontLarge  text-danger error error_message  ms-2 error">
                                Business Name is required
                              </small>}

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
                                onFocus={handleDropdownClicktwp}
                                value={step2SendMoneyvalue?.BankName}
                                id="select1"
                                onChange={handleRecieverValue}
                              >
                                {/* <option value="Registered">Registered as Business</option> */}
                                <option value="">
                                  Bank Name 
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
                              <label for="name" className="form-label1">Bank Name</label>
                              {invalid && !step2SendMoneyvalue.BankName && <small className="responsiveFontLarge  text-danger error error_message  ms-2 error">
                                Bank Name is required
                              </small>}
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
                                onFocus={handleDropdownClicktwp}
                                value={step2SendMoneyvalue.BankAccountNumber}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleRecieverValue}
                              />
                              <label for="name" className="form-label1">Bank Account Number</label>
                              {invalid && !step2SendMoneyvalue.BankAccountNumber && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                Bank Account Number is required
                              </small>}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <div className={`${Reciver_CountryId === 101 ? 'd-block' : 'd-none'}`}>
                          <div className=" d-flex align-items-center my-3">
                            <div className="radio">
                              <input
                                type="radio"
                                name="IFSC"
                                value="IFSC"
                                id="IFSC2"
                                checked={selected2 === "IFSC"}
                                onFocus={handleDropdownClicktwp}
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
                                onFocus={handleDropdownClicktwp}
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
                            className={`${selected2 === "IFSC" ? "d-none" : "d-block"
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
                                  onFocus={handleDropdownClicktwp}
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
                                <label for="name" className="form-label1">Bank State</label>
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
                                  // id="select1"
                                  name="District"
                                  placeholder="District"
                                  onFocus={handleDropdownClicktwp}
                                  value={step2SendMoneyvalue.District}
                                  onChange={handleRecieverValue}
                                >
                                  {/* <option value="Registered">Registered as Business</option> */}
                                  {/* <option value="Individual">District</option>
                                  <option value="Business">Business</option>
                                  <option value="Agent">Agent</option> */}
                                </Form.Control>
                                <label for="name" className="form-label1">Bank District</label>
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
                                  onFocus={handleDropdownClicktwp}
                                  value={step2SendMoneyvalue.Branch}
                                  onChange={handleRecieverValue}
                                >
                                  {/* <option value="Registered">Registered as Business</option> */}
                                  {/* <option value="Individual">Branch</option>
                                  <option value="Business">Business</option>
                                  <option value="Agent">Agent</option> */}
                                </Form.Control>
                                <label for="name" className="form-label1">Bank Branch</label>
                                {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                              </Form.Group>
                            </Row>
                          </div>

                          <div
                            // id="NoIFSC"
                            className={`${selected2 === "NoIFSC" ? "d-none" : "d-block"
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
                                  onFocus={handleDropdownClicktwp}
                                  value={step2SendMoneyvalue.IFSC_Code}
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleRecieverValue}
                                />
                                <label for="name" className="form-label1">IFSC Code (if India) / Routing Number (in USA)/ BSB (in AUS)</label>
                                {/* {invalid && !step2SendMoneyvalue.IFSC_Code  && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                    IFSC Code is required
                                  </small>} */}

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
              ) :

                isVisibleDynamic3 == "Wallet Deposit" ? (
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
                                  placeholder="Business Name"
                                  name="Business_Name"
                                  onFocus={handleDropdownClicktwp}
                                  value={step2SendMoneyvalue.Business_Name}
                                  className="formControlStep2 required form-input"
                                  onChange={handleRecieverValue}
                                />
                                <label for="name" className="form-label1">Business Name </label>
                                {invalid && !step2SendMoneyvalue.Business_Name && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                  Business Name is required
                                </small>}

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
                                  defaultValue="Individual"
                                  name="walletName"
                                  value={step2SendMoneyvalue.walletName}
                                  onFocus={handleDropdownClickoonee}
                                  id="select1"
                                  onChange={(e)=>{handleRecieverValue(e); handleChangeWalletname(e)}}
                                >
                                  {/* <option value="Registered">Registered as Business</option> */}
                                  <option value="">
                                  Wallet Name 
                                  </option>
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
                                <label for="name" className="form-label1">Wallet Name</label>
                                {invalid && !step2SendMoneyvalue.walletName && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                  wallet name is required
                                </small>}
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
                                  onFocus={handleDropdownClicktwp}
                                  value={step2SendMoneyvalue.walletNo}
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleRecieverValue}
                                />
                                <label for="name" className="form-label1">Wallet Account Number</label>
                                {invalid && !step2SendMoneyvalue.walletNo && <small className="responsiveFontLarge   text-danger error_message ms-2 error">
                                  Wallet Account Number is required
                                </small>}

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
                ) :

                  isVisibleDynamic3 == "Cash Pickup" ? (
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
                                    placeholder="Business Name"
                                    name="Business_Name"
                                    onFocus={handleDropdownClicktwp}
                                    value={step2SendMoneyvalue.Business_Name}
                                    className="formControlStep2 required form-input"
                                    onChange={handleRecieverValue}
                                  />
                                  <label for="name" className="form-label1">Business Name   </label>
                                  {invalid && !step2SendMoneyvalue.Business_Name && <small className="responsiveFontLarge   text-danger error ms-2 error">
                                    Business Name is required
                                  </small>}

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
                  ) : ""}
              </Modal.Body>
            </Row>
          </Modal>
          {/* Add reciver End */}
          {/* second End */}

          {/* third modal */}
          {/* /////////Contact Details start/////// */}
          <Modal
            show={show6}
            onHide={(e)=>{handleCloseRec6(); handleCleanData(); One1();}}
            size="lg"
          >
            <Row>
              <Modal.Header className="text-center  mt-3">
                <img
                  src={backA}
                  className="img-fluid pointer"
                  alt=""
                  onClick={(e)=>{handlebackContactDetails(e)}}
                />
                <Modal.Title className="d-flex m-auto">
                  <h1 className="purpleText bolder">Add Recipient</h1>
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
                        <Form className="mt-3 sendMoneyPaddingForm" id="Signup_Step1">
                          <Row className={`${Reciver_CountryId == 154 ? 'd-none' : 'd-block'}`}>
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              <i className="purpleText main fa fa-map-marker "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Address"
                                name="Address"
                                className="formControlStep2 reflink link"
                                value={step2SendMoneyvalue.Address}
                                onChange={handleRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Address
                              </small>
                              {errors && !step2SendMoneyvalue.Address && (
                              <div className="responsiveFontLarge  text-danger text-start ms-2">
                                Address is required
                              </div>
                            )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              <i className="purpleText main fa fa-map-marker "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="City/District"
                                name="City"
                                value={step2SendMoneyvalue.City}
                                className="formControlStep2 reflink link"
                                onChange={handleRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                City/District
                              </small>
                              {errors && !step2SendMoneyvalue.City && (
                                <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                  City/District is required
                                </div>
                              )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className={`${Reciver_CountryId == 154 ? 'd-none' : 'd-block'}`}>
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container "
                            >
                              <i className="purpleText mainStep4 fa fa-map-marker"></i>
                              <Form.Select
                                className="purpleBorder"
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
                                      <option value={state.id}>
                                        {state.name}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              {errors && !step2SendMoneyvalue.State && (
                              <div className="responsiveFontLarge  text-danger text-start ms-2">
                                State is required
                              </div>
                            )}
                              {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                            </Form.Group>
                          </Row>

                          <Row className={`${Reciver_CountryId == 154 ? 'd-none' : 'd-block'}`}>
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              <i className="purpleText main fa fa-map-marker"></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Postal Code"
                                name="PostalCode"
                                value={step2SendMoneyvalue.PostalCode}
                                className="formControlStep2 reflink link"
                                onChange={handleRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Postal Code
                              </small>
                              {errors && !step2SendMoneyvalue.PostalCode && (
                              <div className="responsiveFontLarge  text-danger text-start ms-2">
                                Postal Code is required
                              </div>
                            )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              <i className="purpleText main fa fa-mobile"></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Mobile"
                                name="Mobile"
                                value={step2SendMoneyvalue.Mobile}
                                className="formControlStep2 reflink link"
                                onChange={handleRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Mobile
                              </small>
                              {Mobilelength === true && step2SendMoneyvalue.Mobile != "" && (
                              <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                please Enter Valid Mobile Number
                              </div>
                            )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row className={`${Reciver_CountryId == 154 ? 'd-none' : 'd-block'}`}>
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              <i className="purpleText main fa fa-mobile"></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Email"
                                name="Email"
                                value={step2SendMoneyvalue.Email}
                                className="formControlStep2 reflink link"
                                onChange={handleRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Email
                              </small>
                              {errors && !step2SendMoneyvalue.Email && (
                              <div className="responsiveFontLarge  text-danger text-start ms-2">
                                Enter Valid Email
                              </div>
                            )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              <i className="purpleText main fa fa-user"></i>
                              {/* <Form.Control
                                type="text"
                                required
                                placeholder="Relation"
                                name="Relation"
                                className="formControlStep2 reflink link"
                                onChange={handleRecieverValue}
                              /> */}
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
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Relation
                              </small>
                              {errors && !step2SendMoneyvalue.Relation && (
                              <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                Relation is required
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
                    <Col className="col-lg-12 my-5">
                      <Button
                        className="my-4 col-lg-3 d-block m-auto nextBtn1"
                        onClick={(e) => {
                          if(step2SendMoneyvalue.Mobile == "" || step2SendMoneyvalue.Mobile.length > 7){
                            setMobilelength(false);
                              firstSelect === true
                                ? ADDReciever()
                                : TwoSelect === true
                                  ? ADDJointReciever()
                                  : ADDBusinessReciever()
                                }else{
                                  setMobilelength(true)
                                }
                        }}
                         //handleShowRec6}
                        // setfirstSelect(true);
                        // setTwoSelect(false);
                        // setThreeSelect(false);
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
                      onClick={(e)=>{
                        handleDropdownClickU(e)
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
                          <img src={drpa} className="img-fluid mt-4 ms-4" alt=""/>
                        </>
                      ) : (
                        dropdownValueU
                      )}
                    </button>
                    {/* {selectedDeliveryMethod == "individual" && ( */}
                    {(
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
                                // onClick={(e) =>
                                  
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
                                    );
                                    setUDeliveryName(DeliveryMethod.name)
                                    toggleVisibilityDynamicU(
                                      DeliveryMethod.name,
                                      e
                                    )}
                                  }
                                >
                                  <img
                                    src={CommonConstants.BASE_URL + DeliveryMethod.logo}
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
                    )}
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
                                  // defaultValue={UpdateUserData.firstName}
                                  placeholder="First Name"
                                  value={step2UpdateSendMoneyvalue?.UIndidual_Firstname}
                                  name="UIndidual_Firstname"
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  // defaultValue={UpdateUserData.middleName}
                                  value={step2UpdateSendMoneyvalue?.UIndidual_Middlename}
                                  name="UIndidual_Middlename"
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  // defaultValue={UpdateUserData.lastName}
                                  value={step2UpdateSendMoneyvalue?.UIndidual_Lastname}
                                  name="UIndidual_Lastname"
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  // defaultValue={UpdateUserData.businessName}
                                  placeholder="Business Name"
                                  name="UBusiness_Name"
                                  value={step2UpdateSendMoneyvalue?.UBusiness_Name}
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  <img src={plus} className="img-fluid" alt=""/> add
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
                                          className={`left-inner-addon input-container required text-start ${errorsU == true && updateinputFields[index].FullName == "" ? "pb-0" : ""}`}
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
                                            onFocus={(e)=>{setDropdownStateU(false)}}
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
                                      {errorsU && !updateinputFields[index].FullName && (
                                        <div className={`responsiveFontLarge  text-danger error_message text-start ms-2 error ${errorsU == true ? "pb-3" : ""}`}>
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
                                name="UBankName"
                                value={
                                  step2UpdateSendMoneyvalue.UBankName
                                }
                                id="select1"
                                onFocus={(e)=>{setDropdownStateU(false)}}
                                onChange={handleUpdateRecieverValue}
                              >
                                <option value="">Bank Name </option>
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
                              {errorsU && !step2UpdateSendMoneyvalue.UBankName && (
                                <div className="responsiveFontLarge error_message text-danger text-start ms-2">
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
                                name="UBankAccountNumber"
                                className="formControlStep2 reflink link form-input"
                                defaultValue={UpdateUserData.bankAccNo}
                                value={step2UpdateSendMoneyvalue?.UBankAccountNumber}
                                onFocus={(e)=>{setDropdownStateU(false)}}
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Bank Account Number
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Bank Account Number
                              </div>
                              {errorsU && !step2UpdateSendMoneyvalue?.UBankAccountNumber && (
                                <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                  Bank Account Number is required
                                </div>
                              )}

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <div
                            className={`${
                              Reciver_CountryId === 101
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
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                    value={step2UpdateSendMoneyvalue?.UBankState}
                                    onFocus={(e)=>{setDropdownStateU(false)}}
                                    // defaultValue={UpdateUserData.bankStateId}
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
                                    value={step2UpdateSendMoneyvalue?.UDistrict}
                                    onFocus={(e)=>{setDropdownStateU(false)}}
                                    // defaultValue={UpdateUserData.district}
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
                                    value={step2UpdateSendMoneyvalue?.UBranch}
                                    onFocus={(e)=>{setDropdownStateU(false)}}
                                    // defaultValue={UpdateUserData.bankBranch}
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
                                    onFocus={(e)=>{setDropdownStateU(false)}}
                                    className="formControlStep2 reflink link form-input"
                                    // defaultValue={UpdateUserData.ifscCode}
                                    value={step2UpdateSendMoneyvalue?.UIFSC_Code}
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
                        <Form className="mt-3 sendMoneyPaddingForm" id="Signup_Step1">
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
                                  // defaultValue={UpdateUserData.firstName}
                                  value={step2UpdateSendMoneyvalue?.UIndidual_Firstname}
                                  placeholder="First Name"
                                  name="UIndidual_Firstname"
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  value={step2UpdateSendMoneyvalue?.UIndidual_Middlename}
                                  name="UIndidual_Middlename"
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  value={step2UpdateSendMoneyvalue?.UIndidual_Lastname}
                                  name="UIndidual_Lastname"
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  value={step2UpdateSendMoneyvalue?.UBusiness_Name}
                                  placeholder="Business Name"
                                  name="UBusiness_Name"
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  <img src={plus} className="img-fluid" alt=""/> add
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
                                          className={`left-inner-addon input-container required text-start${errorsU == true && updateinputFields[index].FullName == "" ? "pb-0" : ""}`}
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
                                            onFocus={(e)=>{setDropdownStateU(false)}}
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
                                      {errorsU && !updateinputFields[index].FullName && (
                                        <div className={`responsiveFontLarge  text-danger error_message text-start ms-2 error ${errorsU == true ? "pb-3" : ""}`}>
                                          Full Name is required
                                        </div>
                                      )}
                                    </Row>
                                  </div>
                                );
                              })}
                            </Form>
                          </div>

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
                                  step2UpdateSendMoneyvalue.UwalletName
                                }
                                onFocus={(e)=>{setDropdownStateU(false)}}
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
                              {errorsU && !step2UpdateSendMoneyvalue.UwalletName && (
                                <div className="responsiveFontLarge error_message text-danger text-start ms-2">
                                  Wallet Name is required
                                </div>
                              )}

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
                                onFocus={(e)=>{setDropdownStateU(false)}}
                                onChange={handleUpdateRecieverValue}
                                value={step2UpdateSendMoneyvalue.UwalletNo}
                              />
                              <label for="name" className="form-label1">
                                Wallet Account Number
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Wallet Account no.
                              </div>
                              {errorsU && !step2UpdateSendMoneyvalue?.UwalletNo && (
                                <div className="responsiveFontLarge error_message text-danger text-start ms-2">
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
                                  value={
                                    step2UpdateSendMoneyvalue.UIndidual_Firstname
                                  }
                                  placeholder="First Name"
                                  name="UIndidual_Firstname"
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  value={
                                    step2UpdateSendMoneyvalue.UIndidual_Middlename
                                  }
                                  name="UIndidual_Middlename"
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  value={
                                    step2UpdateSendMoneyvalue.UIndidual_Lastname
                                  }
                                  name="UIndidual_Lastname"
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  value={
                                    step2UpdateSendMoneyvalue.UBusiness_Name
                                  }
                                  placeholder="Business Name"
                                  name="UBusiness_Name"
                                  onFocus={(e)=>{setDropdownStateU(false)}}
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
                                  <img src={plus} className="img-fluid" alt=""/> add
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
                                          className={`left-inner-addon input-container required text-start${errorsU == true && updateinputFields[index].FullName == "" ? "pb-0" : ""}`}
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
                                            onFocus={(e)=>{setDropdownStateU(false)}}
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
                                      {errorsU && !updateinputFields[index].FullName && (
                                        <div className={`responsiveFontLarge  text-danger error_message text-start ms-2 error ${errorsU == true ? "pb-3" : ""}`}>
                                          Full Name is required
                                        </div>
                                      )}
                                    </Row>
                                  </div>
                                );
                              })}
                            </Form>
                          </div>
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
                          className={`${
                            Reciver_CountryId === 154
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
                              onFocus={(e)=>{setDropdownStateU(false)}}
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
                              onFocus={(e)=>{setDropdownStateU(false)}}
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
                            Reciver_CountryId === 154
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
                              onFocus={(e)=>{setDropdownStateU(false)}}
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
                            Reciver_CountryId === 154
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
                              onFocus={(e)=>{setDropdownStateU(false)}}
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
                              onFocus={(e)=>{setDropdownStateU(false)}}
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
                            Reciver_CountryId === 154
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
                              onFocus={(e)=>{setDropdownStateU(false)}}
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
                              onFocus={(e)=>{setDropdownStateU(false)}}
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
                      onClick={(e)=>{
                        // debugger
                          if((isVisibleDynamicU == "Bank Deposit" && step2UpdateSendMoneyvalue.UBankName == "") || (isVisibleDynamicU == "Bank Deposit" && step2UpdateSendMoneyvalue?.UBankAccountNumber == "")){
                            setErrorsU(true)
                          }else if((isVisibleDynamicU == "Wallet Deposit" && step2UpdateSendMoneyvalue.UwalletName == "") || (isVisibleDynamicU == "Wallet Deposit" && step2UpdateSendMoneyvalue.UwalletNo == "")){
                            setErrorsU(true)
                          }else{
                            setErrorsU(false)
                            if(UpdateUserData.type === "individual"){
                              UpdateindividualReciever(e)
                            }else if(UpdateUserData.type === "business"){
                              UpdateBusinessReciever(e)
                            }else if(UpdateUserData.type === "joint"){
                              let isAnyFullNameBlank = updateinputFields.some(item => item.FullName === "");
                              if(isAnyFullNameBlank){
                                setErrorsU(true)
                              }else{
                                UpdateJointReciever(e)
                              }
                            }
                          }
                        }
                      }
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
        </Container>

      <Footer></Footer>

       {/* //////////////////Delete Reciption popup///////////////// */}
       <Modal centered show={Deletereciptionpopup} onHide={(e)=> {setDeletereciptionpopup(false)}} size="md">
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title className="d-flex align-items-center"><span className="text-black mt-2">Alert</span></Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-4 mt-2">
          
          <p className="text-black fs-5">
          Are you sure you want to delete recipient? Deleting recipient is irreversible. No recovery possible.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mt-2 col-lg-3 d-block m-auto nextBtn1"
            variant="primary"
            onClick={(e)=>{setDeletereciptionpopup(false)}}
          >
            No
          </Button>
          <Button
            className="mt-2 col-lg-3 d-block m-auto nextBtn1"
            variant="primary"
            onClick={(e)=>{handleRecieverdelete();}}
          >
            Yes
          </Button>
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
             {existUserError}
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

        {/* update recipent alert to admin */}
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
      </section>
    </>
  );
}
