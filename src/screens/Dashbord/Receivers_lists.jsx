import React, { useEffect, useState } from "react";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import PageHeader from "../../components/PageHeader";
import Loader from "../Loader/Loader";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import groupPeople from "../../assets/images/groupPeople.svg";
import case1 from "../../assets/images/suitcase.svg";
import people from "../../assets/images/people.svg";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import backA from "../../assets/images/BackArrow.svg";
import bankIcon from "../../assets/images/mdi_bank.svg";
import drpa from "../../assets/images/drparrw.svg";
import plus from "../../assets/images/PlusBG.svg";

const ModalDetails = ({ item, onClose }) => {
  return (
    <Modal show={true} onHide={onClose} size="lg">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title>Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-unstyled">
          <li className="py-2 d-flex">
            <div className="font-weight-normal w-50">Name :</div>
            <div className="font-weight-normal w-50">{item.firstName == "" ? item.fullName == "[]" ? item.businessName : "-" : item.firstName + " " + item.lastName}</div>
          </li>
          <li className="py-2 d-flex">
            <div className="font-weight-normal w-50">Account Type :</div>
            <div className="font-weight-normal w-50">{item.type}</div>
          </li>
          <li className="py-2 d-flex">
            <div className="font-weight-normal w-50">Delivery Method :</div>
            <div className="font-weight-normal w-50">{item.deliveryMethodName == "" ? "-" : item.deliveryMethodName}</div>
          </li>
          {item.bankName ?
            <>
              <li className="py-2 d-flex">
                <div className="font-weight-normal w-50">Bank Name :</div>
                <div className="font-weight-normal w-50">{item.bankName == "" ? "-" : item.bankName}</div>
              </li>
              <li className="py-2 d-flex">
                <div className="font-weight-normal w-50">Account Number :</div>
                <div className="font-weight-normal w-50">{item.bankAccNo == "" ? "-" : item.bankAccNo}</div>
              </li>
            </>
            : item.walletName ?
              <>
                <li className="py-2 d-flex">
                  <div className="font-weight-normal w-50">Wallet Name :</div>
                  <div className="font-weight-normal w-50">{item.walletName == "" ? "-" : item.walletName}</div>
                </li>
                <li className="py-2 d-flex">
                  <div className="font-weight-normal w-50">Wallet Number :</div>
                  <div className="font-weight-normal w-50">{item.walletNo == "" ? "-" : item.walletNo}</div>
                </li>
              </> : ""}
          <li className="py-2 d-flex">
            <div className="font-weight-normal w-50">City :</div>
            <div className="font-weight-normal w-50">{item.city == "" ? "-" : item.city}</div>
          </li>
          <li className="py-2 d-flex">
            <div className="font-weight-normal w-50">Country :</div>
            <div className="font-weight-normal w-50">{item.countryName == "" ? "-" : item.countryName}</div>
          </li>
          <li className="py-2 d-flex">
            <div className="font-weight-normal w-50">Mobile :</div>
            <div className="font-weight-normal w-50">{item.phone}</div>
          </li>
          <li className="py-2 d-flex">
            <div className="font-weight-normal w-50">Relation :</div>
            <div className="font-weight-normal w-50">{item.relationName}</div>
          </li>
          <li className="py-2 d-flex">
            <div className="font-weight-normal w-50">Status :</div>
            <div className="font-weight-normal w-50">{item.isDeleted == true ? "Deleted" : "-"}</div>
          </li>
          <li className="py-2 d-flex">
            <div className="font-weight-normal w-50">Total Transactions</div>
            <div className="font-weight-normal w-50">{item.noOfTransaction == "" ? "-" : item.noOfTransaction}</div>
          </li>
          <li className="py-2 d-flex">
            <div className="font-weight-normal w-50">
              Sum of total amount sent :
            </div>
            <div className="font-weight-normal w-50">{item.totalAmt == null ? 0 : item.totalAmt}</div>
          </li>
        </ul>
      </Modal.Body>
      <Modal.Footer className="border-top">
        <Button
          className="w-auto purpleBackground ms-auto border-0"
          onClick={onClose}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Receivers_lists = ({ individualuserData, setreceiverData }) => {
  const [ReceiverInfo, setReceiverInfo] = useState([]);
  const [Country, setCountry] = useState([]);
  const [loadervalue, setloadervalue] = useState(false);
  const [showRCountry, setshowRCountry] = useState(false);
  const [Reciver_CountryId, setReciver_CountryId] = useState(154);
  const [show3, setShowRec] = useState(false);
  const [getAllDeliveryMethod, setgetAllDeliveryMethod] = useState([]);
  const [getAllDeliveryMethodFirst, setgetAllDeliveryMethodFirst] = useState(
    []
  );
  const [firstSelect, setfirstSelect] = useState(false);
  const [TwoSelect, setTwoSelect] = useState(false);
  const [ThreeSelect, setThreeSelect] = useState(false);
  const [show5, setShowRec3] = useState(false);
  const [Methodname, setMethodname] = useState("");
  const [Methodname1, setMethodname1] = useState("");
  const [Methodname2, setMethodname2] = useState("");
  const [isVisibleDynamic, setIsVisibleDynamic] = useState("Bank Deposit");
  const [isVisibleDynamic2, setIsVisibleDynamic2] = useState("Bank Deposit");
  const [isVisibleDynamic3, setIsVisibleDynamic3] = useState("Bank Deposit");
  const [MethodId, setMethodId] = useState("");
  const [MethodId2, setMethodId2] = useState("");
  const [MethodId1, setMethodId1] = useState("");
  const [Banks, setBanks] = useState([]);
  const [dropdownState, setDropdownState] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [getState, setgetState] = useState();
  const [invalid, setInvalid] = useState(false);
  const [selected, setSelected] = useState("IFSC");
  const [selected1, setSelected1] = useState("IFSC");
  const [dropdownValue1, setDropdownValue1] = useState("");
  const [inputFields, setInputFields] = useState([{ FullName: "" }]);
  const [inputFields1, setInputFields1] = useState([{ FullName: "" }]);
  const [inputFields2, setInputFields2] = useState([{ FullName: "" }]);
  const [show6, setShowRec6] = useState(false);
  const [dropdownState1, setDropdownState1] = useState(false);
  const [FullnameArray, setFullnameArray] = useState([]);
  const [selected2, setSelected2] = useState("IFSC");
  const [dropdownState2, setDropdownState2] = useState(false);
  const [type, setType] = useState("");
  const [UpdateUserData, setUpdateUserData] = useState({});
  const [adminRelation, setAdminRelation] = useState();
  const [errors, setErrors] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [show7, setShowRec7] = useState(false);
  const [isVisibleDynamicU, setIsVisibleDynamicU] = useState("Bank Deposit");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState();
  const [UBanks, setUBanks] = useState([]);
  const [AllBanks, setAllBanks] = useState([]);
  const [openAddModel, setOpenAddModel] = useState(false);
  const [addModelType, setAddModelType] = useState('Bank Deposit');
  const [selectedType, setSelectedType] = useState('');
  const [userID, setUserId] = useState();
  const [groupId, setGroupId] = useState();
  const [deliveryMethodId, setDeliveryMethodId] = useState(0);
  const [Uselected, setUselected] = useState(
    UpdateUserData.haveIfscCode === true ? "IFSC" : "NoIFSC"
  );
  const [RequestChangetoadmin, setRequestChangetoadmin] = useState(false);
  const [step2UpdateSendMoneyvalue, setstep2UpdateSendMoneyvalue] = useState({
    UGroupId: "",
    UUserId: "",
    UIndidual_Firstname: "",
    UIndidual_Middlename: "",
    UIndidual_Lastname: "",
    UBusiness_Name: "",
    UBankName: "",
    UBankId: "",
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
  });

  const [addModelData, setAddModelData] = useState({
    GroupId: "",
    UserId: "",
    Indidual_Firstname: "",
    Indidual_Middlename: "",
    Indidual_Lastname: "",
    Business_Name: "",
    BankName: "",
    BankId: "",
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
  const [dropdownStateU, setDropdownStateU] = useState(false);
  const [dropdownValueU, setDropdownValueU] = useState("");
  const [UDeliveryName, setUDeliveryName] = useState("");
  const [ExistUserWithsameMethod, setExistUserWithsameMethod] = useState(false);
  const [existUserError, setexistUserError] = useState('');
  const [UWalletName, setUWalletName] = useState("");

  const [showBlackListReceiver, setShowBlackListReceiver] = useState(false)
  const [selectedReceiver, setSelectedReceiver] = useState()

  const handleBlackListPopup = () => {
    setShowBlackListReceiver(false)
  }

  const submitBlackListReceiver = () => {
    setloadervalue(true)
    axios.post(CommonConstants.BASE_URL + `/saverecipientblacklist?recipientId=${selectedReceiver.id}&isRecipientBlacklist=${selectedReceiver.isBlacklist ? 'false' : 'true'}`).then((response) => {
      if (response.data.status === true) {
        setShowBlackListReceiver(false)

        setloadervalue(false)
        GetAllReciever()
      }

      setloadervalue(false)
    })
  }

  const openBlackListReceiver = (data) => {
    setShowBlackListReceiver(true)
    setSelectedReceiver(data)

  }

  const handleDropdownClickU = () => {
    setDropdownStateU(!dropdownStateU);
  };
  const handleSetDropdownValueU = (value, methodname, methodid) => {
    setDropdownValueU(value);
    setDropdownStateU(!dropdownStateU);
    setMethodId(methodid);
    setMethodname(methodname);
  }
  const [bankId, setBankId] = useState(0);
  const handleCloseRec7 = () => setShowRec7(false);
  const handleShowRec7 = () => setShowRec7(true);
  const handleCloseAddModel = () => setOpenAddModel(false);

  const openModal = async (item) => {
    await axios.post(CommonConstants.BASE_URL + '/getrecipientsbyid', { id: item }).then((responce) => {
      if (responce.data.status == true) {
        const showData = responce.data.data;
        setSelectedItem(showData);
        setShowModal(true);
      }
    })
  };

  const toggleVisibilityDynamicU = (value) => {
    setIsVisibleDynamicU(value)
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleOpenAddModel = () => {
    setOpenAddModel(true);
  }
  // Assuming you have access to the list of relations in the component state
  const getRelationNameById = (relationId) => {
    const relation = adminRelation?.find((rel) => rel.id === relationId);
    return relation ? relation.name : '-';
  };

  const handleUpdateRecieverValue = (e) => {
    const { name, value } = e.target;
    setstep2UpdateSendMoneyvalue({
      ...step2UpdateSendMoneyvalue,
      [name]: value,
    });
  };

  const handleUpdateWalletname = (e) => {
    const Walletid = e.target.value;
    var selectedWallet = UBanks?.find((item) => item?.id == Walletid)
    setUWalletName(selectedWallet?.text)
  }
  const addDataModel = (e) => {
    const { value, name } = e.target;
    setAddModelData({ ...addModelData, [name]: value })
  }
  const GetUpdateBanks = async (id, idd2, bankId) => {
    try {
      const type = {
        "countryId": id,
        "deliveryTypeId": idd2
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getactivetransactiondeliverymethods",//getallbank replace -- getactivetransactiondeliverymethods
        type
      );
      if (response.data.status === true) {
        const getData = response.data.data;
        setUBanks(getData);
        if (bankId) {
          const selectedBankName = getData.find((row) => row.id == bankId);
          // console.log(selectedBankName[0].text, "selectedBankName");
        }
      }
    } catch (err) {
    }
  };

  const getAllBank = async () => {
    try {
      const type = {
        "type": "bank"
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallbanks",//getallbank replace -- getactivetransactiondeliverymethods
        type
      );
      if (response.data.status === true) {
        setAllBanks(response.data.data);
      }
    } catch (err) {
    }
  }
  const UchangeHandler = (e) => {
    setUselected(e.target.value);
  };
  const UpdateBusinessReciever = async () => {
    setloadervalue(true);
    try {
      // const UBusinessRecieverData = {
      //   id: UpdateUserData.id,
      //   groupId: UpdateUserData.groupId,
      //   userId: UpdateUserData.userId,
      //   type: "Business",
      //   firstName: "",
      //   middleName: "",
      //   lastName: "",
      //   fullName: "",
      //   businessName: step2UpdateSendMoneyvalue.UBusiness_Name || UpdateUserData.businessName,
      //   address: step2UpdateSendMoneyvalue.UAddress || UpdateUserData.address,
      //   relation: step2UpdateSendMoneyvalue.URelation,
      //   phone: +step2UpdateSendMoneyvalue.UMobile || UpdateUserData.phone,
      //   email: step2UpdateSendMoneyvalue.UEmail || UpdateUserData.email,
      //   walletName: step2UpdateSendMoneyvalue.UwalletName || UpdateUserData.walletName,
      //   walletNo: step2UpdateSendMoneyvalue.UwalletNo || UpdateUserData.walletNo,
      //   relationId: step2UpdateSendMoneyvalue.URelation || UpdateUserData.relationId,
      //   countryId: Reciver_CountryId,
      //   stateId: step2UpdateSendMoneyvalue.UState || UpdateUserData.stateId,
      //   postalCode: step2UpdateSendMoneyvalue.UPostalCode || UpdateUserData.postalCode,
      //   city: step2UpdateSendMoneyvalue.UCity || UpdateUserData.city,
      //   deliveryMethodId: +MethodId || UpdateUserData.deliveryMethodId,
      //   bankId: +step2UpdateSendMoneyvalue.UBankId || UpdateUserData.bankId,
      //   bankAccNo: step2UpdateSendMoneyvalue.UBankAccountNumber || UpdateUserData.bankAccNo,
      //   haveIfscCode: Uselected === "IFSC" ? true : false,
      //   ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code || UpdateUserData.ifscCode,
      //   bankStateId: 0,
      //   district: step2UpdateSendMoneyvalue.UDistrict || UpdateUserData.district,
      //   bankBranch: step2UpdateSendMoneyvalue.UBranch || UpdateUserData.bankBranch,
      //   bankDetailsVerified: false,
      //   otherDetails: "", //remaining
      //   oldRecipientsId: 0,
      // };
      const payload = {
        "user_Recipients": {
          id: UpdateUserData.id,
          groupId: UpdateUserData.groupId,
          userId: UpdateUserData.userId,
          type: "Business",
          firstName: "",
          middleName: "",
          lastName: "",
          fullName: "",
          businessName: step2UpdateSendMoneyvalue.UBusiness_Name || UpdateUserData.businessName,
          address: step2UpdateSendMoneyvalue.UAddress || UpdateUserData.address,
          relation: step2UpdateSendMoneyvalue.URelation,
          phone: +step2UpdateSendMoneyvalue.UMobile || UpdateUserData.phone,
          email: step2UpdateSendMoneyvalue.UEmail || UpdateUserData.email,
          walletName: step2UpdateSendMoneyvalue.UwalletName || UWalletName,
          walletNo: step2UpdateSendMoneyvalue.UwalletNo || UpdateUserData.walletNo,
          relationId: step2UpdateSendMoneyvalue.URelation || UpdateUserData.relationId,
          countryId: Reciver_CountryId,
          stateId: step2UpdateSendMoneyvalue.UState || UpdateUserData.stateId,
          postalCode: step2UpdateSendMoneyvalue.UPostalCode || UpdateUserData.postalCode,
          city: step2UpdateSendMoneyvalue.UCity || UpdateUserData.city,
          deliveryMethodId: +MethodId || UpdateUserData.deliveryMethodId,
          bankId: +step2UpdateSendMoneyvalue.UBankId || UpdateUserData.bankId,
          bankAccNo: step2UpdateSendMoneyvalue.UBankAccountNumber || UpdateUserData.bankAccNo,
          haveIfscCode: Uselected === "IFSC" ? true : false,
          ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code || UpdateUserData.ifscCode,
          bankStateId: 0,
          district: step2UpdateSendMoneyvalue.UDistrict || UpdateUserData.district,
          bankBranch: step2UpdateSendMoneyvalue.UBranch || UpdateUserData.bankBranch,
          bankDetailsVerified: false,
          otherDetails: "", //remaining
          oldRecipientsId: 0,
        },
        "isAdmin": true
      }
      const response = await axios.post(
        CommonConstants.BASE_URL + "/updaterecipienstsbyid",
        payload
      );
      if (response.data.status === true) {
        if (response.data.data.isChangesApproved === false) {
          setRequestChangetoadmin(true)
        }
        GetAllReciever();
        handleCloseRec7();
        // setloadervalue(false);
      } else if (response.data.status === "error") {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log(err);
      // setloadervalue(true)
    }
  };

  const UpdateindividualReciever = async () => {
    setloadervalue(true);
    try {
      // const URecieverData = {
      //   id: UpdateUserData.id,
      //   groupId: UpdateUserData.groupId,
      //   userId: UpdateUserData.userId,
      //   type: "individual",
      //   firstName: step2UpdateSendMoneyvalue.UIndidual_Firstname || UpdateUserData.firstName,
      //   middleName: step2UpdateSendMoneyvalue.UIndidual_Middlename || UpdateUserData.middleName,
      //   lastName: step2UpdateSendMoneyvalue.UIndidual_Lastname || UpdateUserData.lastName,
      //   fullName: "",
      //   businessName: "",
      //   address: step2UpdateSendMoneyvalue.UAddress || UpdateUserData.address,
      //   relation: "",
      //   phone: +step2UpdateSendMoneyvalue.UMobile || UpdateUserData.phone,
      //   relationId: step2UpdateSendMoneyvalue.URelation || UpdateUserData.relationId,
      //   countryId: Reciver_CountryId,
      //   stateId: step2UpdateSendMoneyvalue.UState || UpdateUserData.stateId,
      //   postalCode: step2UpdateSendMoneyvalue.UPostalCode || UpdateUserData.postalCode,
      //   city: step2UpdateSendMoneyvalue.UCity || UpdateUserData.city,
      //   deliveryMethodId: +MethodId || UpdateUserData.deliveryMethodId,
      //   bankId: +step2UpdateSendMoneyvalue.UBankId || UpdateUserData.bankId,
      //   bankAccNo: step2UpdateSendMoneyvalue.UBankAccountNumber || UpdateUserData.bankAccNo,
      //   haveIfscCode: Uselected === "IFSC" ? true : false,
      //   ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code || UpdateUserData.ifscCode,
      //   bankStateId: 0,
      //   district: step2UpdateSendMoneyvalue.UDistrict || UpdateUserData.district,
      //   bankBranch: step2UpdateSendMoneyvalue.UBranch || UpdateUserData.bankBranch,
      //   bankDetailsVerified: false,
      //   otherDetails: "", //remaining
      //   oldRecipientsId: 0,
      //   walletName: step2UpdateSendMoneyvalue.UwalletName || UpdateUserData.walletName,
      //   walletNo: step2UpdateSendMoneyvalue.UwalletNo || UpdateUserData.walletNo,
      // };
      const payaod = {
        "user_Recipients": {
          id: UpdateUserData.id,
          groupId: UpdateUserData.groupId,
          userId: UpdateUserData.userId,
          type: "individual",
          firstName: step2UpdateSendMoneyvalue.UIndidual_Firstname || UpdateUserData.firstName,
          middleName: step2UpdateSendMoneyvalue.UIndidual_Middlename || UpdateUserData.middleName,
          lastName: step2UpdateSendMoneyvalue.UIndidual_Lastname || UpdateUserData.lastName,
          fullName: "",
          businessName: "",
          address: step2UpdateSendMoneyvalue.UAddress || UpdateUserData.address,
          relation: "",
          phone: +step2UpdateSendMoneyvalue.UMobile || UpdateUserData.phone,
          relationId: step2UpdateSendMoneyvalue.URelation || UpdateUserData.relationId,
          countryId: Reciver_CountryId,
          stateId: step2UpdateSendMoneyvalue.UState || UpdateUserData.stateId,
          postalCode: step2UpdateSendMoneyvalue.UPostalCode || UpdateUserData.postalCode,
          city: step2UpdateSendMoneyvalue.UCity || UpdateUserData.city,
          deliveryMethodId: +MethodId || UpdateUserData.deliveryMethodId,
          bankId: +step2UpdateSendMoneyvalue.UBankId || UpdateUserData.bankId,
          bankAccNo: step2UpdateSendMoneyvalue.UBankAccountNumber || UpdateUserData.bankAccNo,
          haveIfscCode: Uselected === "IFSC" ? true : false,
          ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code || UpdateUserData.ifscCode,
          bankStateId: 0,
          district: step2UpdateSendMoneyvalue.UDistrict || UpdateUserData.district,
          bankBranch: step2UpdateSendMoneyvalue.UBranch || UpdateUserData.bankBranch,
          bankDetailsVerified: false,
          otherDetails: "", //remaining
          oldRecipientsId: 0,
          walletName: step2UpdateSendMoneyvalue.UwalletName || UWalletName,
          walletNo: step2UpdateSendMoneyvalue.UwalletNo || UpdateUserData.walletNo,
        },
        "isAdmin": true
      }
      const response = await axios.post(
        CommonConstants.BASE_URL + "/updaterecipienstsbyid",
        payaod
      );
      if (response.data.status === true) {
        if (response.data.data.isChangesApproved === false) {
          setRequestChangetoadmin(true)
        }
        GetAllReciever();
        handleCloseRec7();
        setloadervalue(false);
      } else if (response.data.status === "error") {
        console.log(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const submitModelData = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    try {
      let hasErrors = false;

      if (!addModelType || !selectedType) {
        setErrors(true);
        return;
      }
      if (selectedType === "individual") {
        // Validation checks for individual type
        if (!addModelData.Indidual_Firstname ||
          !addModelData.Indidual_Middlename ||
          !addModelData.Indidual_Lastname ||
          !addModelData.BankId ||
          !addModelData.BankAccountNumber ||
          !addModelData.Address ||
          !addModelData.State ||
          !emailRegex.test(addModelData.Email) ||
          !addModelData.Relation ||
          !addModelData.PostalCode ||
          !addModelData.City) {
          hasErrors = true;
        }
      } else if (selectedType === "joint") {
        if (!inputFields[0].FullName ||
          !addModelData.Relation ||
          !addModelData.City) {
          hasErrors = true;
        }
      } else if (selectedType === "business") {
        if (!addModelData.Business_Name ||
          !addModelData.Relation ||
          !addModelData.City) {
          hasErrors = true;
        }
      }

      if (hasErrors) {
        setErrors(true);
        return;
      } else {
        let FullnameArr = [];
        inputFields.forEach((val) => {
          FullnameArr.push(val.FullName);
        });

        const sendData = {
          "type": selectedType,
          "groupId": individualuserData,
          "userId": individualuserData,
          "firstName": addModelData.Indidual_Firstname,
          "middleName": addModelData.Indidual_Middlename,
          "lastName": addModelData.Indidual_Lastname,
          "email": addModelData.Email,
          "fullName": `[${FullnameArr}]`,
          "businessName": addModelData.Business_Name,
          "address": addModelData.Address,
          "relation": '',
          "phone": addModelData.Mobile,
          "relationId": addModelData.Relation,
          "countryId": Reciver_CountryId,
          "stateId": addModelData.State,
          "city": addModelData.City,
          "postalCode": addModelData.PostalCode,
          "deliveryMethodId": deliveryMethodId,
          "bankId": addModelData.BankId,
          "bankAccNo": addModelData.BankAccountNumber,
          "haveIfscCode": false,
          "ifscCode": addModelData.IFSC,
          "bankStateId": 0,
          "district": addModelData.District,
          "bankBranch": addModelData.Branch,
          "bankDetailsVerified": false,
          "otherDetails": "",
          "oldRecipientsId": 0,
          "walletName": addModelData.walletName,
          "walletNo": addModelData.walletNo
        }
        const addReciever = await axios.post(
          CommonConstants.BASE_URL + "/adduserrecipients",
          sendData
        );
        if (addReciever.data.status === true) {
          if (addReciever.data.message == "Recipients already exists with same delivery method and account number!") {
            setExistUserWithsameMethod(true);
            setexistUserError(addReciever.data.message);
            setOpenAddModel(false);
          } else {
            setOpenAddModel(false);
            GetAllReciever();
            setreceiverData(addReciever.data.data);
          }
        } else {
          console.error("Failed to add receiver:", addReciever.data);
        }
      }

    } catch (error) {
      console.error("Error occurred while submitting:", error);
    }
  };


  const [dropdownValue2, setDropdownValue2] = useState(
    <>
      <img src={bankIcon} width="50" height="50" className="img-fluid" />
      <div className="d-flex flex-column ms-4">
        <div className="mainD responsiveFontLarge">Delivery Method</div>
        <div className="text-black text-start bolder  ">Bank Deposit</div>
      </div>
      <img src={drpa} className="img-fluid mt-4 ms-4" />
    </>
  );

  const [step2SendMoneyvalue, setstep2SendMoneyvalue] = useState({
    Indidual_Firstname: "",
    Indidual_Middlename: "",
    Indidual_Lastname: "",
    Business_Name: "",
    BankId: "",
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
    RelationId: "",
  });

  const getRelation = async () => {
    const Relation = await axios.get(
      CommonConstants.BASE_URL + "/getactiverelations"
    );
    setAdminRelation(Relation.data.data);
  };
  const getRecipientsbyid = (ReceiptId) => {
    axios
      .post(CommonConstants.BASE_URL + "/getrecipientsbyid", { id: ReceiptId })
      .then((responce) => {
        if (responce.data.status == true) {
          GetAllDeliveryMethod(responce.data.data.type);
          setUDeliveryName(responce.data.data?.deliveryMethodName);
          handleShowRec7();
          setIsVisibleDynamicU(responce.data.data.deliveryMethodName);
          setUpdateUserData(responce.data.data);
          setType(responce.data.data.type);
          setReciver_CountryId(responce.data.data.countryId);
          setIsVisibleDynamic2(responce.data.data.deliveryMethodName);
          setIsVisibleDynamic(responce.data.data.deliveryMethodName);
          GetUpdateBanks(responce.data.data.countryId, responce.data.data.deliveryMethodId, responce.data.data.bankId);
          const fullNameArray = responce.data.data.fullName
            .substring(1, responce.data.data.fullName.length - 1)
            .split(",");
          var EdittempArray2 = [];
          fullNameArray.map((JointName, index) => {
            EdittempArray2.push({
              FullName: JointName
            });
          });
          setInputFields(EdittempArray2);
          const checkIFSC = responce.data.data.haveIfscCode;
          if (checkIFSC == true) {
            setUselected("IFSC")
          } else {
            setUselected("NoIFSC")
          }
        }
      })
      .catch((error) => console.log(error));
  };

  const addFieldsBankDeposite = () => {
    let newfield = { FullName: "" };
    setInputFields([...inputFields, newfield]);
  };

  // const validator = require("../../assets/js/validator");

  const handle_Reciver_CountryId = (e) => {
    setReciver_CountryId(e.target.value);
  };

  const GetAllReciever = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", individualuserData);
      formData.append("isDeleted", true);
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
        formData
      );
      if (response.data.status === true) {
        setReceiverInfo(response.data.data);
      } else if (response.data.status === "error") {
      }
    } catch (err) { }
  };
  const GetAllCountrys = async (values) => {
    setloadervalue(true);
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallrecivercountries" //getallrecivercountries
      );

      if (response.data.status === true) {
        setCountry(response.data.data);
        setloadervalue(false);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const GetAllDeliveryMethod = async (method) => {
    try {
      const data = {
        toCountryId: Reciver_CountryId,
        userType: method, //indiviual
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallactivedeliverymethods",
        data
      );
      if (response.data.status === true) {
        setgetAllDeliveryMethod(response.data.data);
        console.log(response.data.data, "response.data.data");
        // var DeliveryDetails = response.data.data.filter(
        //   (Delivery) => Delivery.name === "Bank Deposit"
        // );
        // var SelectedDelivery = response.data.data.filter(
        //   (Delivery) => Delivery.name === "Bank Deposit"
        // );
        // setgetAllDeliveryMethodFirst(SelectedDelivery[0]);
        // setMethodname(SelectedDelivery[0].name);
        // setMethodId(SelectedDelivery[0].id);
        // setMethodname1(DeliveryDetails[0].name);
        // setMethodId1(DeliveryDetails[0].id);
        // setMethodname2(DeliveryDetails[0].name);
        // setMethodId2(DeliveryDetails[0].id);
        // setIsVisibleDynamic3(SelectedDelivery[0].name);
        // GetAllBanks(SelectedDelivery[0].id);

      } else if (response.data.status === false) {
      }
    } catch (err) {
      // console.log(err)
    }
  };
  const GetAllBanks = async (values) => {
    setloadervalue(true);
    try {
      const type = {
        type: "bank",
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallbanks",
        type
      );
      if (response.data.status === true) {
        setBanks(response.data.data);
        setloadervalue(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDropdownClick = () => {
    setDropdownState(!dropdownState);
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
      } else if (response.data.status === "error") {
        console.log(response.data.message);
        // setloadervalue(false)
      }
    } catch (err) { }
  };

  const handleSetDropdownValue = (value, methodname, methodid) => {
    setMethodname(methodname);
    setMethodId(methodid);
    setDropdownValue(value);
    setDropdownState(!dropdownState);
    GetAllBanks(methodid);
  };



  const handleShowRec6 = (e) => {
    e.preventDefault();
    if (isVisibleDynamic == "Cash Pickup") {
      setShowRec6(true);
      setShowRec3(false);
    }
    if (isVisibleDynamic == "Wallet Deposit") {
      setShowRec6(true);
      setShowRec3(false);
    }

    if (isVisibleDynamic == "Bank Deposit") {
      setShowRec6(true);
      setShowRec3(false);
    }
  };


  const handleFormChangeBankDeposite = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };



  const removeFieldsBankDeposite = (index) => {
    const fields = [...inputFields];
    fields.splice(index, 1);
    setInputFields(fields);
  };

  const UpdateJointReciever = async () => {
    let FullnameArr = [];
    inputFields.map((val) => {
      FullnameArr.push(val.FullName);
    });
    // const paylaod = {
    //   id: UpdateUserData.id,
    //   type: type,
    //   groupId: UpdateUserData.groupId,
    //   userId: UpdateUserData.userId,
    //   firstName: UpdateUserData.firstName,
    //   middleName: UpdateUserData.middleName,
    //   email: UpdateUserData.email,
    //   lastName: UpdateUserData.lastName,
    //   fullName: `[${FullnameArr}]` || `[${UpdateUserData.fullName}]`,
    //   businessName: UpdateUserData.businessName,
    //   address: UpdateUserData.address,
    //   phone: step2UpdateSendMoneyvalue.UMobile || UpdateUserData.phone,
    //   relationId: step2SendMoneyvalue.Relation || UpdateUserData.relationId,
    //   countryId: UpdateUserData.countryId,
    //   stateId: UpdateUserData.stateId,
    //   city: step2SendMoneyvalue.City || UpdateUserData.city,
    //   postalCode: UpdateUserData.postalCode,
    //   deliveryMethodId: UpdateUserData.deliveryMethodId,
    //   deliverymethodname: UpdateUserData.deliveryMethodName,
    //   bankId: step2SendMoneyvalue.BankId || UpdateUserData.bankId,
    //   bankName: "",
    //   bankCode: UpdateUserData.bankCode,
    //   bankAccNo: step2UpdateSendMoneyvalue.UBankAccountNumber || UpdateUserData.bankAccNo,
    //   haveIfscCode: UpdateUserData.haveIfscCode,
    //   ifscCode: step2SendMoneyvalue.IFSC_Code || UpdateUserData.ifscCode,
    //   bankStateId: UpdateUserData.bankStateId,
    //   district: step2SendMoneyvalue.District || UpdateUserData.district,
    //   bankBranch: UpdateUserData.bankBranch,
    //   bankDetailsVerified: UpdateUserData.bankDetailsVerified,
    //   otherDetails: UpdateUserData.otherDetails,
    //   oldRecipientsId: 0,
    //   walletName: UpdateUserData.walletName,
    //   walletNo: UpdateUserData.walletNo,
    //   zaiUserId: UpdateUserData.zaiUserId,
    //   isHidden: false,
    //   deletedAt: null,
    //   isDeleted: false,
    // };

    const payload2 = {
      "user_Recipients": {
        id: UpdateUserData.id,
        type: type,
        groupId: UpdateUserData.groupId,
        userId: UpdateUserData.userId,
        firstName: UpdateUserData.firstName,
        middleName: UpdateUserData.middleName,
        email: UpdateUserData.email,
        lastName: UpdateUserData.lastName,
        fullName: `[${FullnameArr}]` || `[${UpdateUserData.fullName}]`,
        businessName: UpdateUserData.businessName,
        address: UpdateUserData.address,
        phone: step2UpdateSendMoneyvalue.UMobile || UpdateUserData.phone,
        relationId: step2SendMoneyvalue.Relation || UpdateUserData.relationId,
        countryId: UpdateUserData.countryId,
        stateId: UpdateUserData.stateId,
        city: step2SendMoneyvalue.City || UpdateUserData.city,
        postalCode: UpdateUserData.postalCode,
        deliveryMethodId: UpdateUserData.deliveryMethodId,
        deliverymethodname: UpdateUserData.deliveryMethodName,
        bankId: step2SendMoneyvalue.BankId || UpdateUserData.bankId,
        bankName: "",
        bankCode: UpdateUserData.bankCode,
        bankAccNo: step2UpdateSendMoneyvalue.UBankAccountNumber || UpdateUserData.bankAccNo,
        haveIfscCode: UpdateUserData.haveIfscCode,
        ifscCode: step2SendMoneyvalue.IFSC_Code || UpdateUserData.ifscCode,
        bankStateId: UpdateUserData.bankStateId,
        district: step2SendMoneyvalue.District || UpdateUserData.district,
        bankBranch: UpdateUserData.bankBranch,
        bankDetailsVerified: UpdateUserData.bankDetailsVerified,
        otherDetails: UpdateUserData.otherDetails,
        oldRecipientsId: 0,
        walletName: UpdateUserData.walletName || UWalletName,
        walletNo: UpdateUserData.walletNo,
        zaiUserId: UpdateUserData.zaiUserId,
        isHidden: false,
        deletedAt: null,
        isDeleted: false,
      },
      "isAdmin": true
    }
    await axios.post(CommonConstants.BASE_URL + '/updaterecipienstsbyid', payload2).then((responce) => {
      if (responce.data.status == true) {
        if (responce.data.data.isChangesApproved === false) {
          setRequestChangetoadmin(true)
        }
        GetAllReciever();
        handleCloseRec7();
        setloadervalue(false);
        // setShowRec6(false);
      }
    }).catch(error => console.log(error));
  };

  const handleTypeSelect = (e) => {
    const selectedValue = e.target.value;
    GetAllDeliveryMethod(selectedValue);
    setSelectedType(selectedValue);
  }

  const handleDeliverMethodChange = (e) => {
    const selectedValue = e.target.value;
    setDeliveryMethodId(selectedValue);
    const selectedType = getAllDeliveryMethod.find((ele) => {
      return ele.id === parseInt(selectedValue);
    });
    setAddModelType(selectedType.name);
    GetUpdateBanks(Reciver_CountryId, selectedValue, 0);
  }

  // const getBankName = (selectedBankId) => {
  //   if (selectedBank) {
  //     const selectedBank = UBanks.find((bank) => bank.id === selectedBankId);
  //     console.log(selectedBank, "bankData");
  //     return bankData.bankName
  //   }
  // }
  useEffect(() => {
    getAllBank();
    GetAllReciever();
    GetAllCountrys();
    GetAllState();
    getRelation();
    setUpdateUserData({});
  }, [individualuserData, show7, setreceiverData]);
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="cardq">
              <div className="body project_reportq">
                <div className="row d-flex g-0">
                  <div className=" justify-content-end d-flex  responsiveFontLarge">
                    <a
                      className="btn btn-default purpleBackground text-white bolder responsiveFontLarge"
                      onClick={() => {
                        handleOpenAddModel();
                      }}
                    >
                      <i className="text-white fa fa-plus bolder"></i> Add New
                    </a>

                  </div>
                </div>
                <div className="table-responsive mt-3">
                  <table className="table m-b-0 ">
                    <thead className="thead-light">
                      <tr>
                        <th>Name</th>
                        <th>Delivery Method</th>
                        <th>Account Type</th>
                        <th>Relation</th>
                        <th>Total Transactions</th>
                        <th>Sum of total <br /> amount sent</th>
                        <th>Status</th>
                        <th>Is Black Listed?</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {ReceiverInfo && ReceiverInfo.length > 0 ? ReceiverInfo.map((item) => {
                      return (
                        <tbody>
                          <tr>
                            <td>
                              {
                                item.firstName === ""
                                  ? item.fullName === "[]" || item.fullName === ""
                                    ? item.businessName
                                    : item.fullName.substring(1, item.fullName.length - 1)
                                  : item.firstName + " " + item.lastName
                              }
                            </td>
                            <td>{item.deliveryMethodName == null ? "-" : item.deliveryMethodName}</td>
                            <td>{item.type == null ? "-" : item.type}</td>
                            <td>{item.relationId === "" ? "-" : getRelationNameById(item.relationId)}</td>
                            <td className="text-center">{item.noOfTransaction == "" ? "0" : item.noOfTransaction}</td>
                            <td className="text-center">
                              {item.totalAmt == null
                                ? 0
                                : item.totalAmt}
                            </td>
                            <td className="text-center">{item.isDeleted == true ? "Deleted" : "-"}</td>
                            <td className="text-center">
                              <small
                                className={`medium d-flex align-items-center justify-content-center py-1 rounded-4 ${item.isBlacklist == true ? 'bg-danger' : 'bg-success'} text-white`}>
                                <i className={`pe-2`}/> {item.isBlacklist == true ? "Yes" : "No"}
                              </small>
                            </td>
                            <td className="project-actions">
                              {/* <a
                                className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                onClick={() => handleOpenAddModel(item.userId, item.groupId)}
                              >
                                <i className="fa fa-plus" title="Add"></i>
                              </a>{" "} */}
                              <a
                                className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                onClick={() => getRecipientsbyid(item.id)}
                              >
                                <i className="fa fa-edit" title="Edit"></i>
                              </a>{" "}
                              <a
                                className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                onClick={() => openModal(item.id)}
                              >
                                <i className="fa fa-eye text-black" title="View"></i>
                              </a>{" "}
                              <a
                                className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                onClick={() => openBlackListReceiver(item)}
                              >
                                <i className={`fa ${item.isBlacklist ? 'fa-check' : 'fa-lock'} text-black`} title="Black List"></i>
                              </a>{" "}
                              &nbsp;
                            </td>
                          </tr>
                        </tbody>
                      );
                    }) : <td colSpan={7}><p className="text-center mt-3">No Reciever's Data Found</p></td>}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedItem && (
        <ModalDetails item={selectedItem} onClose={closeModal} />
      )}

      {/* update receipent form */}
      <Modal show={show7} onHide={handleCloseRec7} size="lg">
        <Row className="">
          <Modal.Header className="text-center  mt-3">
            <img
              src={backA}
              className="img-fluid pointer"
              onClick={handleCloseRec7}
            />
            <Modal.Title className="d-flex m-auto">
              <h1 className="purpleText bolder">Edit Recipient</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="mainss">
            <Row>
              <Col className="col-lg-12 d-flex m-auto justify-content-center">
                <div className={`dropdown`}>
                  <button
                    onClick={(e) => {
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
                        <img src={drpa} className="img-fluid mt-4 ms-4" alt="" />
                      </>
                    ) : (
                      dropdownValueU
                    )}
                  </button>
                  {/* {selectedDeliveryMethod == "individual" && ( */}
                  {(
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

                            // }
                            >
                              <div
                                className="dropdown__link d-flex align-items-start "
                                onClick={(e) => {
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
                                  )
                                }
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
                          className={`${UpdateUserData.type == "individual" || UpdateUserData.type == "indiviual"
                            ? "d-block"
                            : "d-none"
                            }`}
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                              controlId="formGridEmail1"
                            >
                              <Form.Select
                                onChange={handle_Reciver_CountryId}
                                className="purpleBorder required form-input"
                                defaultValue={Reciver_CountryId}
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
                                className="formControlStep2 reflink link"
                                placeholder="First Name"
                                defaultValue={UpdateUserData.firstName}
                                name="UIndidual_Firstname"
                                onChange={handleUpdateRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                First Name
                              </small>
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
                                className="formControlStep2 reflink link"
                                defaultValue={UpdateUserData.middleName}
                                name="UIndidual_Middlename"
                                onChange={handleUpdateRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Middle Name
                              </small>
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
                                className="formControlStep2 reflink link"
                                name="UIndidual_Lastname"
                                defaultValue={UpdateUserData.lastName}
                                onChange={handleUpdateRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Last Name
                              </small>
                            </Form.Group>
                          </Row>
                        </div>
                        <div

                          className={`${UpdateUserData.type === "Business"
                            ? "d-block"
                            : "d-none"
                            }`}
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                defaultValue={UpdateUserData.businessName}
                                placeholder="Business Name"
                                name="UBusiness_Name"
                                className="formControlStep2 reflink link"
                                onChange={handleUpdateRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                First Name
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                        </div>
                        <div className={`${UpdateUserData.type === "joint"
                          ? "d-block"
                          : "d-none"
                          }`}>
                          <Row className="">
                            <Col className="col-lg-12 d-flex mt-3 justify-content-end ms-auto">
                              <Button
                                className="mt-2 col-lg-4 ps-2 pe-2 d-block upparcase fullRoundedCorner justify-content-end rounded-5 nextBtn1"
                                variant="primary"
                                onClick={addFieldsBankDeposite}
                              >
                                <img src={plus} className="img-fluid" /> add account
                                holder
                              </Button>
                            </Col>
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
                                          defaultValue={input.FullName}
                                          placeholder="Full Name"
                                          name="FullName"
                                          className="formControlStep2 reflink link form-input"
                                          onChange={(event) => handleFormChangeBankDeposite(index, event)}
                                        />
                                        <label for="name" className="form-label1">
                                          Full Name{" "}
                                        </label>
                                      </Form.Group>
                                      <span
                                        className={`pt-2 ${index == 0 ? "d-none" : "d-block"
                                          }`}
                                        onClick={() =>
                                          removeFieldsBankDeposite(index)
                                        }
                                      >
                                        <i class="fas fa-times-circle pointer"></i>
                                      </span>
                                    </div>
                                  </Row>
                                  {invalid && !inputFields[0].FullName && (
                                    <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                      Full Name is required
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </Row>
                        </div>
                        <div className={`${UpdateUserData.type === "business"
                          ? "d-block"
                          : "d-none"
                          }`}>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                defaultValue={UpdateUserData.businessName}
                                placeholder="Business Name"
                                name="UBusiness_Name"
                                className="formControlStep2 reflink link"
                                onChange={handleUpdateRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Business Name
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                        </div>
                        <Row className="">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container "
                          >
                            <i className="purpleText mainStep4 fas fa-landmark"></i>
                            <Form.Select
                              className="purpleBorder"
                              name="UBankId"
                              defaultValue={UpdateUserData.bankId}
                              id="select1"
                              onChange={handleUpdateRecieverValue}
                            >
                              <option value="">
                                {UpdateUserData.bankName ? UpdateUserData.bankName : "select bank name"}
                              </option>
                              {UBanks &&
                                UBanks.map((Bank, Index) => {
                                  return (
                                    <option value={Bank.id}>
                                      {Bank.text}
                                    </option>
                                  );
                                })}
                            </Form.Select>
                          </Form.Group>
                        </Row>
                        <Row className="">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required"
                          >
                            <i className="purpleText mainStep4 fas fa-landmark"></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Bank Account Number"
                              name="UBankAccountNumber"
                              className="formControlStep2 reflink link"
                              defaultValue={UpdateUserData.bankAccNo}
                              onChange={handleUpdateRecieverValue}
                            />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Bank Account Number
                            </small>
                          </Form.Group>
                        </Row>

                        <div className={`${Reciver_CountryId == 101 ? 'd-block' : 'd-none'}`}>
                          <div className=" d-flex align-items-center my-3">
                            <div className="radio">
                              <input
                                type="radio"
                                name="UIFSC"
                                value="IFSC"
                                id="UIFSC"
                                checked={Uselected === "IFSC"}
                                onChange={UchangeHandler}
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
                                checked={Uselected === "NoIFSC"}
                                name="gender"
                                onChange={UchangeHandler}
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
                              aria-hidden={selected !== "male" ? true : false}
                            >
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container "
                              >
                                <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                <Form.Select
                                  className="purpleBorder"
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
                                        <option value={state.id}>
                                          {state.name}
                                        </option>
                                      );
                                    })}
                                </Form.Select>
                                {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                              </Form.Group>
                            </Row>

                            <Row>
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container "
                              >
                                <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                <Form.Control
                                  className="purpleBorder"
                                  // defaultValue="Individual"
                                  placeholder="District"
                                  name="UDistrict"
                                  defaultValue={UpdateUserData.district}
                                  onChange={handleUpdateRecieverValue}
                                >
                                  {/* <option value="Registered">Registered as Business</option> */}
                                  {/* <option value="Individual">District</option>
                                  <option value="Business">Business</option>
                                  <option value="Agent">Agent</option> */}
                                </Form.Control>
                                {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                              </Form.Group>
                            </Row>

                            <Row>
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container "
                              >
                                <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                <Form.Control
                                  className="purpleBorder"
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
                                selected !== "female" ? true : false
                              }
                            >
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required"
                              >
                                <i className="purpleText mainStep4 fas fa-landmark"></i>
                                <Form.Control
                                  type="text"
                                  required
                                  placeholder="IFSC Code (if India) / Routing Number (in USA)/ BSB (in AUS)"
                                  name="UIFSC_Code"
                                  className="formControlStep2 reflink link"
                                  defaultValue={UpdateUserData.ifscCode}
                                  onChange={handleUpdateRecieverValue}
                                />
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
            )
              : isVisibleDynamicU == "Wallet Deposit" ? (
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
                              className="left-inner-addon input-container required"
                              controlId="formGridEmail1"
                            >
                              <Form.Select
                                onChange={handle_Reciver_CountryId}
                                className="purpleBorder required form-input"
                                defaultValue={Reciver_CountryId}
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
                                className="formControlStep2 reflink link"
                                placeholder="First Name"
                                defaultValue={UpdateUserData.firstName}
                                name="UIndidual_Firstname"
                                onChange={handleUpdateRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                First Name
                              </small>
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
                                className="formControlStep2 reflink link"
                                defaultValue={UpdateUserData.middleName}
                                name="UIndidual_Middlename"
                                onChange={handleUpdateRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Middle Name
                              </small>
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
                                className="formControlStep2 reflink link"
                                name="UIndidual_Lastname"
                                defaultValue={UpdateUserData.lastName}
                                onChange={handleUpdateRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Last Name
                              </small>
                            </Form.Group>
                          </Row>
                          {/* <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              <i className="purpleText main fas fa-wallet "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Wallet Name"
                                name="UwalletName"
                                defaultValue={UpdateUserData.walletName}
                                className="formControlStep2 reflink link"
                                onChange={handleUpdateRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Wallet Name
                              </small>
                            </Form.Group>
                          </Row> */}
                          <Row>
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-wallet"></i>
                              <Form.Select
                                className="purpleBorder form-input"
                                id="select1"
                                name="UwalletName"
                                value={
                                  UpdateUserData.walletName
                                }
                                onFocus={(e) => { setDropdownStateU(false) }}
                                onChange={(e) => { handleUpdateRecieverValue(e); handleUpdateWalletname(e) }}
                              >
                                <option value="">Wallet name</option>
                                {UBanks &&
                                  UBanks.map((Bank, Index) => {
                                    return (
                                      <option value={Bank.text}>
                                        {Bank.text}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                              <label for="name" className="form-label1">
                                Wallet Name
                              </label>
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Please Select Wallet Name
                              </small>
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
                                name="UwalletNo"
                                defaultValue={UpdateUserData.walletNo}
                                className="formControlStep2 reflink link"
                                onChange={handleUpdateRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Wallet Account no.
                              </small>
                            </Form.Group>
                          </Row>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                </>
              )

                : isVisibleDynamicU == "Cash Pickup" ? (
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
                                className="left-inner-addon input-container required"
                                controlId="formGridEmail1"
                              >
                                <Form.Select
                                  onChange={handle_Reciver_CountryId}
                                  className="purpleBorder required form-input"
                                  defaultValue={Reciver_CountryId}
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
                                  placeholder="First Name"
                                  name="UIndidual_Firstname"
                                  className="formControlStep2 reflink link"
                                  defaultValue={UpdateUserData.firstName}
                                  onChange={handleUpdateRecieverValue}
                                />
                                <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  First Name
                                </small>
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
                                  className="formControlStep2 reflink link"
                                  name="UIndidual_Middlename"
                                  defaultValue={UpdateUserData.middleName}
                                  onChange={handleUpdateRecieverValue}
                                />
                                <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  Middle Name
                                </small>

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
                                  className="formControlStep2 reflink link"
                                  name="UIndidual_Lastname"
                                  defaultValue={UpdateUserData.lastName}
                                  onChange={handleUpdateRecieverValue}
                                />
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
                )
                  : ""
            }
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
                      <Row className={`${Reciver_CountryId === 154 ? 'd-none' : 'd-block'}`}>
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
                          <label for="name" className="form-label1">Address</label>
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
                          <label for="name" className="form-label1">City/District</label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            City/District
                          </small>

                          {/* {errors.name && <p>{errors.name}</p>} */}
                        </Form.Group>
                      </Row>

                      <Row className={`${Reciver_CountryId === 154 ? 'd-none' : 'd-block'}`}>
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
                          <label for="name" className="form-label1">State</label>
                          {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                        </Form.Group>
                      </Row>

                      <Row className={`${Reciver_CountryId === 154 ? 'd-none' : 'd-block'}`}>
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
                          <label for="name" className="form-label1">Postal Code</label>
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
                          <label for="name" className="form-label1">Mobile</label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Mobile
                          </small>

                          {/* {errors.name && <p>{errors.name}</p>} */}
                        </Form.Group>
                      </Row>

                      <Row className={`${Reciver_CountryId === 154 ? 'd-none' : 'd-block'}`}>
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
                          <label for="name" className="form-label1">Email</label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Email
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
                            defaultValue={UpdateUserData.relationName}
                            name="URelation"
                            id="select1"
                            onChange={handleUpdateRecieverValue}
                          >
                            <option>{UpdateUserData.relationName}</option>
                            {adminRelation &&
                              adminRelation.map((state, index) => {
                                return (
                                  <option key={index} value={state.id}>
                                    {state.name}
                                  </option>
                                );
                              })}
                          </Form.Select>
                          <label for="name" className="form-label1">Relation</label>
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
                <Col className="col-lg-12 my-5">
                  <Button
                    className="my-4 col-lg-3 d-block m-auto nextBtn1"
                    onClick={
                      UpdateUserData.type === "indiviual" || UpdateUserData.type === "individual"
                        ? UpdateindividualReciever
                        : UpdateUserData.type === "business" || UpdateUserData.type === "Business"
                          ? UpdateBusinessReciever
                          : UpdateUserData.type === "joint"
                            ? UpdateJointReciever
                            : handleShowRec6
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
      </Modal >

      {/* add  recipent */}
      < Modal show={openAddModel} onHide={handleCloseAddModel} size="lg" >
        <Row className="">
          <Modal.Header className="text-center  mt-3">
            <img
              src={backA}
              className="img-fluid pointer"
              onClick={handleCloseAddModel}
            />
            <Modal.Title className="d-flex m-auto">
              <h1 className="purpleText bolder">Add Recipient</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="mainss">
            <Row>
              <Col className="col-lg-12 mt-2 text-center">
                <Form className="mt-3 sendMoneyPaddingForm" id="Signup_Step1">
                  <Row className="">
                    <Form.Group
                      as={Col}
                      className="left-inner-addon input-container required text-start"
                      controlId="formGridEmail1"
                    >
                      <Form.Select
                        onChange={handle_Reciver_CountryId}
                        className="purpleBorder required form-input"
                        defaultValue={Reciver_CountryId}
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
                    </Form.Group>
                  </Row>
                  {/* code for select type */}
                  <Row className="">
                    <Form.Group
                      as={Col}
                      className="left-inner-addon input-container required text-start"
                      controlId="formGridEmail1"
                    >
                      <Form.Select
                        onChange={handleTypeSelect}
                        className="purpleBorder required form-input"
                      >
                        <option>Select  Type</option>
                        <option value="indiviual">Individual</option>
                        <option value="joint">Joint</option>
                        <option value="business">Business</option>
                      </Form.Select>
                      <label for="name" className="form-label1">
                        Select Type
                      </label>
                      {errors && !selectedType && <small className="responsiveFontLarge text-danger error_message ms-2 error">
                        Please Select  Type
                      </small>}
                    </Form.Group>
                  </Row>
                  {/* code for delivery method select  */}
                  <Row className="">
                    <Form.Group
                      as={Col}
                      className="left-inner-addon input-container required text-start"
                      controlId="formGridEmail1"
                    >
                      <Form.Select
                        onChange={handleDeliverMethodChange}
                        className="purpleBorder required form-input"
                      >
                        <option>Select Delivery Method</option>
                        {
                          getAllDeliveryMethod.map((DeliveryMethod) => {
                            return (
                              <>
                                <option value={DeliveryMethod.id}>{DeliveryMethod.name}</option>
                              </>
                            )
                          })
                        }
                      </Form.Select>
                      <label for="name" className="form-label1">
                        Select Delivery Method
                      </label>
                      {errors && !deliveryMethodId && <small className="responsiveFontLarge text-danger error_message ms-2 error">
                        Please Select Delivery Method
                      </small>}
                    </Form.Group>
                  </Row>
                </Form>
              </Col>
            </Row>
            {addModelType == "Bank Deposit" ? (
              <>
                <Row>
                  <Col className="col-lg-12 mt-2 text-center">
                    <label className="text-black text-center">
                      Recipient Bank Details
                    </label>
                    <Form>
                      <Form className="mt-3 sendMoneyPaddingForm" id="Signup_Step1">
                        <div className={`${selectedType === "indiviual" || selectedType === "individual" ? "d-block" : "d-none"}`}>
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
                                name="Indidual_Firstname"
                                className="formControlStep2 reflink link form-input"
                                onChange={addDataModel}
                              />
                              <label for="name" className="form-label1">First Name</label>
                              {errors && !addModelData.Indidual_Firstname && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                Please Enter First Name
                              </small>}

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
                                name="Indidual_Middlename"
                                className="formControlStep2 reflink link form-input"
                                onChange={addDataModel}
                              />
                              <label for="name" className="form-label1">Middle Name</label>
                              {errors && !addModelData.Indidual_Middlename && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                Please Enter Middle Name
                              </small>}

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
                                name="Indidual_Lastname"
                                className="formControlStep2 reflink link form-input"
                                onChange={addDataModel}
                              />
                              <label for="name" className="form-label1">Last Name</label>
                              {errors && !addModelData.Indidual_Lastname && <small className="responsiveFontLarge text-danger error_message ms-2 error">
                                Please Enter Last Name
                              </small>}
                            </Form.Group>
                          </Row>
                        </div>
                        <div

                          className={`${UpdateUserData.type === "Business"
                            ? "d-block"
                            : "d-none"
                            }`}
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                defaultValue={UpdateUserData.businessName}
                                placeholder="Business Name"
                                name="UBusiness_Name"
                                className="formControlStep2 reflink link"
                                onChange={handleUpdateRecieverValue}
                              />
                              <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                First Name
                              </small>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                        </div>
                        <div className={`${selectedType === "joint"
                          ? "d-block"
                          : "d-none"
                          }`}>
                          <Row className="">
                            <Col className="col-lg-12 d-flex mt-3 justify-content-end ms-auto">
                              <Button
                                className="mt-2 col-lg-4 ps-2 pe-2 d-block upparcase fullRoundedCorner justify-content-end rounded-5 nextBtn1"
                                variant="primary"
                                // onClick={handleShowRec}
                                onClick={addFieldsBankDeposite}
                              >
                                <img src={plus} className="img-fluid" /> add account
                                holder
                              </Button>
                            </Col>
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
                                          defaultValue={UpdateUserData.fullName}
                                          placeholder={"Full Name "}
                                          name="FullName"
                                          className="formControlStep2 reflink link form-input"
                                          onChange={(event) =>
                                            handleFormChangeBankDeposite(
                                              index,
                                              event
                                            )
                                          }
                                        />
                                        <label for="name" className="form-label1">
                                          Full Name{" "}
                                        </label>
                                      </Form.Group>
                                      <span
                                        className={`pt-2 ${index == 0 ? "d-none" : "d-block"
                                          }`}
                                        onClick={() =>
                                          removeFieldsBankDeposite(index)
                                        }
                                      >
                                        <i class="fas fa-times-circle pointer"></i>
                                      </span>
                                    </div>
                                    {errors && !inputFields[0].FullName && (
                                      <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                        Full Name is required
                                      </div>
                                    )}
                                  </Row>
                                </div>
                              );
                            })}
                          </Row>
                        </div>
                        <div className={`${selectedType === "business"
                          ? "d-block"
                          : "d-none"
                          }`}>
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
                                className="formControlStep2 reflink link form-input"
                                onChange={addDataModel}
                              />
                              <label for="name" className="form-label1">Business Name</label>
                              {errors && !addModelData.Business_Name && <small className="responsiveFontLarge text-danger error_message ms-2 error">
                                Please enter Business Name
                              </small>}
                            </Form.Group>
                          </Row>
                        </div>
                        <Row className="">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText mainStep4 fas fa-landmark"></i>
                            <Form.Select
                              className="purpleBorder"
                              name="BankId"
                              id="select1"
                              onChange={addDataModel}
                            >
                              <option value="">
                                Select Bank Name
                              </option>

                              {UBanks &&
                                UBanks.map((Bank, Index) => {
                                  return (
                                    <option value={Bank.id}>
                                      {Bank.text}
                                    </option>
                                  );
                                })}

                            </Form.Select>
                            {errors && !addModelData.BankId && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                              Please Select Bank
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
                              placeholder="Bank Account Number"
                              name="BankAccountNumber"
                              className="formControlStep2 reflink link form-input"
                              onChange={addDataModel}
                            />
                            <label for="name" className="form-label1">Bank Account Number</label>
                            {errors && !addModelData.BankAccountNumber && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                              Please Enter Bank Account Number
                            </small>}
                          </Form.Group>
                        </Row>

                        <div className={`${Reciver_CountryId == 101 ? 'd-block' : 'd-none'}`}>
                          <div className=" d-flex align-items-center my-3">
                            <div className="radio">
                              <input
                                type="radio"
                                name="IFSC"
                                value="IFSC"
                                id="UIFSC"
                                checked={Uselected === "IFSC"}
                                onChange={addDataModel}
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
                                id="NoIFSC"
                                checked={Uselected === "NoIFSC"}
                                name="gender"
                                onChange={addDataModel}
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
                              aria-hidden={selected !== "male" ? true : false}
                            >
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container "
                              >
                                <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                <Form.Select
                                  className="purpleBorder"
                                  id="select1"
                                  name="BankState"
                                  defaultValue={UpdateUserData.bankStateId}
                                  onChange={addDataModel}
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
                                {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                              </Form.Group>
                            </Row>

                            <Row>
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container "
                              >
                                <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                <Form.Control
                                  className="purpleBorder"
                                  // defaultValue="Individual"
                                  placeholder="District"
                                  name="District"
                                  defaultValue={UpdateUserData.district}
                                  onChange={addDataModel}
                                >
                                  {/* <option value="Registered">Registered as Business</option> */}
                                  {/* <option value="Individual">District</option>
                                  <option value="Business">Business</option>
                                  <option value="Agent">Agent</option> */}
                                </Form.Control>
                                {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                              </Form.Group>
                            </Row>

                            <Row>
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container "
                              >
                                <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                <Form.Control
                                  className="purpleBorder"
                                  // defaultValue="Individual"
                                  name="Branch"
                                  placeholder="Branch"
                                  id="select1"
                                  defaultValue={UpdateUserData.bankBranch}
                                  onChange={addDataModel}
                                >
                                  {/* <option value="Registered">Registered as Business</option> */}
                                  {/* <option value="Individual">Branch</option>
                                  <option value="Business">Business</option>
                                  <option value="Agent">Agent</option> */}
                                </Form.Control>
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
                                selected !== "female" ? true : false
                              }
                            >
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required"
                              >
                                <i className="purpleText mainStep4 fas fa-landmark"></i>
                                <Form.Control
                                  type="text"
                                  required
                                  placeholder="IFSC Code (if India) / Routing Number (in USA)/ BSB (in AUS)"
                                  name="IFSC_Code"
                                  className="formControlStep2 reflink link"
                                  defaultValue={UpdateUserData.ifscCode}
                                  onChange={addDataModel}
                                />
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
            )
              : addModelType == "Wallet Deposit" ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form className="mt-3 sendMoneyPaddingForm" id="Signup_Step1">
                          {/* <Row className="">
                            <Col className="col-lg-12 d-flex mt-3 justify-content-end ms-auto">
                              <Button
                                className="mt-2 col-lg-4 ps-2 pe-2 d-block upparcase fullRoundedCorner justify-content-end rounded-5 nextBtn1"
                                variant="primary"
                                // onClick={handleShowRec}
                                onClick={addFieldsBankDeposite}
                              >
                                <img src={plus} className="img-fluid" /> add account
                                holder
                              </Button>
                            </Col>
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
                                          placeholder={"Full Name "}
                                          name="FullName"
                                          className="formControlStep2 reflink link form-input"
                                          onChange={(event) =>
                                            handleFormChangeBankDeposite(
                                              index,
                                              event
                                            )
                                          }
                                        />
                                        <label for="name" className="form-label1">
                                          Full Name{" "}
                                        </label>
                                      </Form.Group>
                                      <span
                                        className={`pt-2 ${index == 0 ? "d-none" : "d-block"
                                          }`}
                                        onClick={() =>
                                          removeFieldsBankDeposite(index)
                                        }
                                      >
                                        <i class="fas fa-times-circle pointer"></i>
                                      </span>
                                    </div>
                                  </Row>
                                  {errors && !inputFields[0].FullName && (
                                    <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                      Full Name is required
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </Row> */}
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
                                name="Indidual_Firstname"
                                className="formControlStep2 reflink link form-input"
                                onChange={addDataModel}
                              />
                              <label for="name" className="form-label1">First Name</label>
                              {errors && !addModelData.Indidual_Firstname && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                Please Enter First Name
                              </small>}

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
                                name="Indidual_Middlename"
                                className="formControlStep2 reflink link form-input"
                                onChange={addDataModel}
                              />
                              <label for="name" className="form-label1">Middle Name</label>
                              {errors && !addModelData.Indidual_Middlename && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                                Please Enter Middle Name
                              </small>}

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
                                name="Indidual_Lastname"
                                className="formControlStep2 reflink link form-input"
                                onChange={addDataModel}
                              />
                              <label for="name" className="form-label1">Last Name</label>
                              {errors && !addModelData.Indidual_Lastname && <small className="responsiveFontLarge text-danger error_message ms-2 error">
                                Please Enter Last Name
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
                                placeholder="Wallet Name"
                                name="walletName"
                                className="formControlStep2 reflink link form-input"
                                onChange={addDataModel}
                              />
                              <label for="name" className="form-label1"> Wallet Name</label>
                              {errors && !addModelData.walletName && <small className="responsiveFontLarge text-danger error_message ms-2 error">
                                Please Enter Wallet Name
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
                                className="formControlStep2 reflink link form-input"
                                onChange={addDataModel}
                              />
                              <label for="name" className="form-label1">Wallet Account No</label>
                              {errors && !addModelData.walletNo && <small className="responsiveFontLarge text-danger error_message ms-2 error">
                                Please Enter Wallet Account no.
                              </small>}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                </>
              )

                : addModelType == "Cash Pickup" ? (
                  <>
                    <Row>
                      <Col className="col-lg-12 mt-2 text-center">
                        <label className="text-black text-center">
                          Recipient Bank Details
                        </label>
                        <Form>
                          <Form className="mt-3 sendMoneyPaddingForm" id="Signup_Step1">
                            <Row className="">
                              <Col className="col-lg-12 d-flex mt-3 justify-content-end ms-auto">
                                <Button
                                  className="mt-2 col-lg-4 ps-2 pe-2 d-block upparcase fullRoundedCorner justify-content-end rounded-5 nextBtn1"
                                  variant="primary"
                                  onClick={addFieldsBankDeposite}
                                >
                                  <img src={plus} className="img-fluid" /> add account
                                  holder
                                </Button>
                              </Col>
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
                                            defaultValue={UpdateUserData.fullName}
                                            placeholder={"Full Name "}
                                            name="FullName"
                                            className="formControlStep2 reflink link form-input"
                                            onChange={(event) =>
                                              handleFormChangeBankDeposite(
                                                index,
                                                event
                                              )
                                            }
                                          />
                                          <label for="name" className="form-label1">
                                            Full Name{" "}
                                          </label>
                                        </Form.Group>
                                        <span
                                          className={`pt-2 ${index == 0 ? "d-none" : "d-block"
                                            }`}
                                          onClick={() =>
                                            removeFieldsBankDeposite(index)
                                          }
                                        >
                                          <i class="fas fa-times-circle pointer"></i>
                                        </span>
                                      </div>
                                    </Row>
                                    {errors && !inputFields[0].FullName && (
                                      <div className="responsiveFontLarge  text-danger error_message text-start ms-2 error">
                                        Full Name Is Required
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </Row>
                          </Form>
                        </Form>
                      </Col>
                    </Row>
                  </>
                )
                  : ""
            }
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
                      <div className={`${Reciver_CountryId === 154
                        ? "d-none"
                        : "d-block"
                        }`}>
                        <Row >
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
                              className="formControlStep2 reflink link form-input"
                              onChange={addDataModel}
                            />
                            <label for="name" className="form-label1">Address</label>
                            {errors && !addModelData.Address && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                              Please Enter Address
                            </small>}
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container text-start"
                          >
                            <i className="purpleText mainStep4 fa fa-map-marker"></i>
                            <Form.Select
                              className="purpleBorder form-input"
                              id="select1"
                              value={UpdateUserData.stateId}
                              name="State"
                              onChange={addDataModel}
                            >
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
                            <label for="name" className="form-label1">State</label>
                            {errors && !addModelData.State && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                              Please Select State
                            </small>}
                          </Form.Group>
                        </Row>

                        <Row >
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
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.postalCode}
                              onChange={addDataModel}
                            />
                            <label for="name" className="form-label1">Postal Code</label>
                            {errors && !addModelData.PostalCode && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                              Please Enter Postal Code
                            </small>}
                          </Form.Group>
                        </Row>

                        <Row >
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
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.email}
                              onChange={addDataModel}
                            />
                            <label for="name" className="form-label1">Email</label>
                            {errors && !addModelData.Email && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                              Please Enter Email
                            </small>}
                          </Form.Group>
                        </Row>
                      </div>
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
                            name="City"
                            className="formControlStep2 reflink link form-input"
                            onChange={addDataModel}
                          />
                          <label for="name" className="form-label1">City/District</label>
                          {errors && !addModelData.City && <small className="responsiveFontLarge  text-danger error_message ms-2 error">
                            Please Enter  City/District
                          </small>}
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
                            placeholder="Mobile Number"
                            name="Mobile"
                            className="formControlStep2 reflink link form-input"
                            onChange={addDataModel}
                          />
                          <label for="name" className="form-label1">Mobile</label>
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
                            name="Relation"
                            id="select1"
                            onChange={addDataModel}
                          >
                            <option>Select Relation </option>
                            {adminRelation &&
                              adminRelation.map((state, index) => {
                                return (
                                  <option key={index} value={state.id}>
                                    {state.name}
                                  </option>
                                );
                              })}
                          </Form.Select>
                          <label for="name" className="form-label1">Relation</label>
                          {errors && !addModelData.Relation && <small className="responsiveFontLarge text-danger error_message ms-2 error">
                            Please Select Relation
                          </small>}
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
                    onClick={submitModelData}
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </>
          </Modal.Body>
        </Row>
      </Modal >
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

      {/* Black list receiver */}
      <Modal show={showBlackListReceiver} onHide={handleBlackListPopup} size="lg">
        <Modal.Body className="modal-kyc-verify">
          <div
            className="cardActivePurple"
          >
            <strong>Are you sure you want to {selectedReceiver && selectedReceiver.isBlacklist ? 'remove' : '' } black list receiver?</strong>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mt-2 col-lg-3 d-block m-auto nextBtn1 text-white"
            variant="primary"
            onClick={submitBlackListReceiver}
          >
            Yes
          </Button>
          <Button
            className="mt-2 col-lg-3 d-block m-auto"
            variant="danger"
            onClick={handleBlackListPopup}
          >
            Close
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
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Receivers_lists;
