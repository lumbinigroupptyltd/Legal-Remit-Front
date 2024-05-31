import React, { useContext, useState, useEffect } from "react";
import "./Step5.scss";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../../../Helpers/CountryDropdown/flags.css";
import ReactFlagsSelect from "react-flags-select";
import UploadFiles from "../../../../Helpers/UploadFiles/Individual_File_Upload";
import Modal from "react-bootstrap/Modal";
import modalAVector from "../../../../../assets/images/YellowVector.svg";
import userContext from "../../Signupdata/Usecontext";
import axios from "axios";
import { CommonConstants } from "../../../../../Constants/common.constants";
import { isMobile, isTablet } from 'react-device-detect';
import Loader from '../../../../Loader/Loader';
import Select from "react-select";
import ModalComponent from "../../../../Dashbord/ModalComponent";
const validator = require("../../../../../assets/js/validator");

export default function Step5({
  Name,
  StepAfivepopup,
  StepBfivepopup,
  activestepkey,
  B_A_activestepkey,
  handleid,
  ImagesStep5,
  IndividualImages,
  ScantakId_B,
  ScantakLink_B,
  ScantakId_A,
  ScantakLink_A,
  R_ID,
  B_ID,
  K_ID,
  I_ID,
  UpdateStep,
  GoNextStep,
  GoNextStepBA,
  UserIdType,
  CountryID,
  IndividualUserIdType,
  SummuryDocumentsI,
  StepBlank
}) {
  const { Countrydata, data2 } = useContext(userContext);

  const [BScantakDataID, setBScantakDataID] = useState("");
  const [BScantakDataLink, setBScantakDataLink] = useState("");
  const [AScantakDataID, setAScantakDataID] = useState("");
  const [AScantakDataLink, setAScantakDataLink] = useState("");
  const [loadervalue, setloadervalue]=useState(false)
  const [IdTypePopupError,setIdTypePopupError]=useState(false)
  const [ExistUser,setExistUser]=useState(false)
  const [ExistUserMessage,setExistUserMessage]=useState("")

  const [Ashow, setAShow] = useState(false);

  const handleAClose = () => setAShow(false);
  const handleAShow = () =>
    Countrydata.CountryId === "14" ? setAShow(StepAfivepopup) : setAShow(false);

  const [Bshow, setBShow] = useState(false);

  const handleBClose = () => setBShow(false);
  const handleBShow = () =>
    Countrydata.CountryId === "14" ? setBShow(StepBfivepopup) : setBShow(false);

  const [idVerifyed, setidVerifyed] = useState(false);
  const [idAgentVerifyed, setidAgentVerifyed] = useState(false);
  const [IdverifyedSuccess, setIdverifyedSuccess] = useState(false);
  const [AgentscantekVerify, setAgentscantekVerify] = useState(false);
  const [BusinessscantekVerify, setBusinessscantekVerify] = useState(false);

  // new code
  const { data4 } = useContext(userContext);

  const [imageFile, setImageFile] = useState("");

  const [FrontImage, setFrontImage] = useState([]);
  const [BackImage, setBackImage] = useState([]);

  const imageData = (imagee,image2) => {
    // console.log(imagee,"Individual Kyc Image" ,image2)
    IndividualImages(imagee,image2);
    setFrontImage(imagee);
    setBackImage(image2);
  };

  let imageArray = FrontImage.concat(BackImage)
  // console.log(imageArray,"imageArray")
  // new code

  const [step5value, setstep5value] = useState({
    Business_IDType: "",
    Business_IDNumber: "",
    Business_CardNumber: "",
    Business_DOB: "",
    Business_IDExpiry: "",
    Business_IDIssuingAuthority: "",

    Agent_IDType: "",
    Agent_IDNumber: "",
    Agent_CardNumber: "",
    Agent_DOB: "",
    Agent_IDExpiry: "",
    Agent_IDIssuingAuthority: "",
  });

  // console.log(step5value,"step5value")

  const [IdAuthority, setIdAuthority] = useState([]);
  const [IdAuthoritySubtype, setIdAuthoritySubtype] = useState([]);

  const GetNationalityIdAuthority = async (values) => {
    // debugger
    try {
      const NationalityName = {
        nationality: data4.Business_Nationality,
        countryId:Countrydata.CountryId
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getissueauthoritybynationality",
        NationalityName
      );
      if (response.data.status === true) {
        const optionsForState = response.data.data.map((States) => ({
          value: States.authorityName,
          label: States.authorityName
        }));
        setIdAuthority(optionsForState);
        // setIdAuthority(response.data.data);
        // setIdAuthoritySubtype(response.data.data[0].issueAuthority);
      }
    } catch (err) {
      console.log(err)
    }
  };

  const [AIdAuthority, setAIdAuthority] = useState([]);
  const [AIdAuthoritySubtype, setAIdAuthoritySubtype] = useState([]);

  const GetNationalityAIdAuthority = async (values) => {
    try {
      const NationalityName = {
        nationality: data4.Agent_Nationality,
        countryId:Countrydata.CountryId
      };
      // console.log(data4.IndidualNationality,"data4.IndidualNationality")
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getissueauthoritybynationality",
        NationalityName
      );
      if (response.data.status === true) {
        const optionsForState = response.data.data.map((States) => ({
          value: States.authorityName,
          label: States.authorityName
        }));
        setAIdAuthority(optionsForState);
        // setAIdAuthority(response.data.data);
        // setAIdAuthoritySubtype(response.data.data[0].issueAuthority);

        // console.log(response.data,"")
      } else if (response.data.status === "error") {
        // console.log(response.data.message)
      }
    } catch (err) {
      // console.log(err)
    }
  };

  useEffect(()=>{
    GetIdTypeByCountryId();
  },[CountryID])

const [Idtypes, setIdtypes] = useState([])
  const GetIdTypeByCountryId = async (values) => {
    try {
      const IdData = {
        countryId: CountryID
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getactiveidtypebycountryid",
        IdData
      );
      if (response.data.status === true) {
        const optionsForState = response.data.data.map((States) => ({
          value: States.id,
          label: States.name
        }));
        setIdtypes(optionsForState);
        // setIdtypes(response.data.data);
      }
    } catch (err) {
      // console.log(err)
    }
  };
  const { setData5 } = useContext(userContext);

  const handleDataStep5 = (e) => {
    const { name, value } = e.target;
    setstep5value({ ...step5value, [name]: value });
    // setData(step3value)
  };

  // const handleImages=(Images)=>{
  //   ImagesStep5(Images)
  // }

  useEffect(() => {
    // GetNationalityIdAuthority();
    // GetNationalityAIdAuthority();
    setData5(step5value)
    // // console.log(activestepkey,"Running Tab")

    if (Name == "Individual") {
      if (activestepkey === "fifthStep") {
        handleid("File_Uploading");
        // handleBShow()
      }
      document.getElementById("stepone5in1").style.display = "block";
      document.getElementById("steptwo5in2").style.display = "none";
      document.getElementById("stepthree5in3").style.display = "none";
      // console.lo
    } else if (Name == "Business") {
      // handleShow()
      if (B_A_activestepkey === "fifthStep") {
        handleid("Bussiness_id_Details_step5");
        if (activestepkey === "fourthStep") {
          if (
            (isMobile || isTablet) &&
            (navigator.userAgent.match(/Android/i) ||
              navigator.userAgent.match(/iPhone|iPad|iPod/i))
          ) {
            handleBShow();
          } else {
            handleBClose();
          }
        }

      }
      document.getElementById("stepone5in1").style.display = "none";
      document.getElementById("steptwo5in2").style.display = "block";
      document.getElementById("stepthree5in3").style.display = "none";
    } else {
      if (B_A_activestepkey === "fifthStep") {
        handleid("Agent_id_Details_step5");
        // handleAShow();
        if (B_A_activestepkey === "fifthStep") {
          handleid("Bussiness_id_Details_step5");
          if (activestepkey === "fourthStep") {
            if (
              (isMobile || isTablet) &&
              (navigator.userAgent.match(/Android/i) ||
                navigator.userAgent.match(/iPhone|iPad|iPod/i))
            ) {
              handleAShow();
            } else {
              handleAClose();
            }
          }

        }
      }
      document.getElementById("stepone5in1").style.display = "none";
      document.getElementById("steptwo5in2").style.display = "none";
      document.getElementById("stepthree5in3").style.display = "block";
    }
  }, [
    Name,
    StepAfivepopup,
    StepBfivepopup,
    handleid,
    AgentscantekVerify,
    BusinessscantekVerify,
  ]);

  useEffect(() => {
    setData5(step5value);
  }, []);

  useEffect(() => {
    // GetIdTypeByCountryId()
    if(UpdateStep=='IfifthStep'){
      handleUpdateDataIndividual()
    }else if(UpdateStep=='BfifthStep'){
      handleBUpdateDataIndividual()
    }else if(UpdateStep=='AfifthStep'){
      handleAUpdateDataIndividual()
    }else if(UpdateStep=='BfourthStep'){
      GetNationalityIdAuthority()
    }else if(UpdateStep=='SkipAfourthStep' || UpdateStep=='AfourthStep'){
      GetNationalityAIdAuthority()
    }
  },[UpdateStep,R_ID, B_ID, K_ID, I_ID])

  const AgentScantakMessegeSend = () => {
    if (AgentscantekVerify === true) {
      try {
        const DegitalDetails = {
          version: 2,
          source: "Legal Remit",
          subject: {
            firstNames: data2.Agent_Firstname,
            lastNames: data2.Agent_Lastname,
            mobileNumber: data2.Agent_MobileNumber,
            emailAddress: data2.Agent_Email,
          },
          request: {
            demands: [{ type: "defaultSme.2" }],
            share: {
              customText: "appears in sms/email",
              type: "url",
              sendTo: ["emailAddress", "mobileNumber"],
            },
          },
        };
        const response = axios.post(
          CommonConstants.BASE_URL + "/generatedigitalverificationlink",
          DegitalDetails
        );
        if (response.data.status === true) {
          setAScantakDataID(response.data.data.transactionId);
          setAScantakDataLink(response.data.data.voiLink);
        } else if (response.data.status === "error") {
          // console.log(response.data.message)
        }
      } catch (err) {
        // console.log(err)
      }
    }
  };

  const BusinessScantakMessegeSend = () => {
    if (BusinessscantekVerify === true) {
      try {
        const DegitalDetails = {
          version: 2,
          source: "Legal Remit",
          subject: {
            firstNames: data2.Business_Fullname,
            lastNames: "",
            mobileNumber: data2.Business_MobileNumber,
            emailAddress: data2.Business_BusinessEmail,
          },
          request: {
            demands: [{ type: "defaultSme.2" }],
            share: {
              customText: "appears in sms/email",
              type: "url",
              sendTo: ["emailAddress", "mobileNumber"],
            },
          },
        };
        const response = axios.post(
          CommonConstants.BASE_URL + "/generatedigitalverificationlink",
          DegitalDetails
        );
        if (response.data.status === true) {
          // setIdAuthority(response.data.data)
          // console.log(response.data,"")
          setBScantakDataID(response.data.data.transactionId);
          setBScantakDataLink(response.data.data.voiLink);
        } else if (response.data.status === "error") {
          // console.log(response.data.message)
        }
      } catch (err) {
        // console.log(err)
      }
    }
  };

  const DigitalValue = () => {
    setidVerifyed(false);
    setIdverifyedSuccess(true);
    setBusinessscantekVerify(true);
  };

  const ManualValue = () => {
    setidVerifyed(true);
    setIdverifyedSuccess(true);
    setBusinessscantekVerify(false);
  };

  const AgentDigitalValue = () => {
    setidAgentVerifyed(false);
    setIdverifyedSuccess(true);
    setAgentscantekVerify(true);
  };
  const AgentManualValue = () => {
    setidAgentVerifyed(true);
    setIdverifyedSuccess(true);
    setAgentscantekVerify(false);
  };

  const handleBusinessId = () => {
    handleBClose();
    setIdverifyedSuccess(false);
    BusinessScantakMessegeSend();
  };

  const handleAgentId = () => {
    handleAClose();
    setIdverifyedSuccess(false);
    AgentScantakMessegeSend();
  };

  /////////Expiry date inputs////////
  const currentDate = new Date(); // Current date
  const tomorrowDate = new Date(currentDate); // Create a new date object with the current date
  tomorrowDate.setDate(currentDate.getDate() + 1); // Add 1 day to the current date

  // If the new date's day is different from the expected day, it means we crossed the month boundary
  // In that case, move to the next month
  if (tomorrowDate.getDate() !== currentDate.getDate() + 1) {
    tomorrowDate.setMonth(currentDate.getMonth() + 1);
    tomorrowDate.setDate(1); // Set the day to the first day of the next month
  }

  // Check if the new date is in the next year (e.g., December 31)
  if (tomorrowDate.getFullYear() !== currentDate.getFullYear()) {
    tomorrowDate.setFullYear(currentDate.getFullYear() + 1); // Move to the next year
    tomorrowDate.setMonth(0); // Set the month to January
    tomorrowDate.setDate(1); // Set the day to the first day of January
  }

// Format tomorrow's date as "yyyy-mm-dd"
  const formattedDate = `${tomorrowDate.getFullYear()}-${String(tomorrowDate.getMonth() + 1).padStart(2, '0')}-${String(tomorrowDate.getDate()).padStart(2, '0')}`;

  ////////////////////////////////////

  // Calculate the max date that can be selected
  const MaxDate1  = new Date();
  MaxDate1.setFullYear(MaxDate1.getFullYear() - 18);
  // maxDate.setFullYear(maxDate.getFullYear() - 18);
  const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  const minDate = new Date(currentDate.getFullYear() - 100, 0, 1);
  const currentDateString = MaxDate1.toISOString().split('T')[0];

  const handleUpdateDataIndividual = async () => {
    // setloadervalue(true)
    if(validator.error_input_validation("File_Uploading")){
      if(IndividualUserIdType == 'Passport'){
        if(imageArray.length == 1){
          axios.post(CommonConstants.BASE_URL + "/getuserinfobyid", {id:R_ID}).then((respo) => {
            //console.log(respo,"USERINFO")
            setloadervalue(true)

            const formData = new FormData();

          formData.append(
            "user",
            `{
              "id":${respo.data.data.id},
              "roleId":${respo.data.data.roleId},
              "countryId":${respo.data.data.countryId},
              "refCodeId":"${respo.data.data.refCodeId}",
              "fName":"${respo.data.data.fName}",
              "mName":"${respo.data.data.mName}",
              "lName":"${respo.data.data.lName}",
              "businessName":"${respo.data.data.businessName}",
              "regNo":"${respo.data.data.regNo}",
              "regTimezone":"${respo.data.data.regTimezone}",
              "businessAddress":"${respo.data.data.businessAddress}",
              "customerId":"${respo.data.data.customerId}",
              "phone":"${respo.data.data.phone}",
              "phoneCode":"${respo.data.data.phoneCode}",
              "phoneVerifiedAt":"",
              "isEmailVerified":0,
              "emailVerifiedAt":"",
              "isDeleted":false,
              "isOCRVerfiedId":0,
              "email":"${respo.data.data.email}",
              "digitalVerifiedLink": "${respo.data.data.digitalVerifiedLink}",
              "digitalVerifiedTransactionId": "${respo.data.data.digitalVerifiedTransactionId}",
              "isSignupCompleted" : false 
              }`
          );

          formData.append(
            'kycdetails',
            `{
              "id":${K_ID},
              "userId":${R_ID},
              "streetName":"${respo.data.data.userkycdetails.streetName}",
              "countryId": ${respo.data.data.userkycdetails.countryId} ,
              "stateId":${respo.data.data.userkycdetails.stateId},
              "nationality":"${respo.data.data.userkycdetails.nationality}",
              "suburb":"${respo.data.data.userkycdetails.suburb}",
              "postalCode":"${respo.data.data.userkycdetails.postalCode}",
              "verified":false,
              "occupationId":${respo.data.data.userkycdetails.occupationId},
              "isResidence": ${respo.data.data.userkycdetails.isResidence},
              "kycStatus":${respo.data.data.userkycdetails.kycStatus}
            }`);
          formData.append(
            "iddetails",
            `{
              "id":${I_ID},
              "userId":${R_ID},
              "typeId":"${respo.data.data.iddetails.typeId}",
              "documentNumber":"${respo.data.data.iddetails.documentNumber}",
              "cardNumber":"${respo.data.data.iddetails.cardNumber}",
              "dob":"${respo.data.data.iddetails.dob}",
              "documentValidity":"${respo.data.data.iddetails.documentValidity}",
              "issuingAuthority":"${respo.data.data.iddetails.issuingAuthority}"
            }`
          );

          formData.append('isFromSignup', false);
          formData.append('stepNo', 5);

          for (let i = 0; i < imageArray.length; i++) {
            const fileName = imageArray[i].name;
            formData.append('iddocuments', imageArray[i], fileName);
          }




          const config = {
            method: "POST",
            url: CommonConstants.BASE_URL + "/updateuserinfo",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData
          };

          axios(config)
            .then(function (response) {
              if(response.data.status===true){
                console.log(response.data.data,"UpdatedData")
                SummuryDocumentsI(true)
                GoNextStep()
                setloadervalue(false)
              }else{
                StepBlank('')
                setloadervalue(false)
              }
            })
            .catch(function (error) {
              console.log(error)
              setloadervalue(false)
              StepBlank('')
            });
          }).catch(err=>{
            console.log(err)
            setloadervalue(false)
            StepBlank('')
          })
          }else{
            setIdTypePopupError(true)
            setloadervalue(false)
            StepBlank('')
          }
      }else{
        if(imageArray.length == 2){
        axios.post(CommonConstants.BASE_URL + "/getuserinfobyid", {id:R_ID}).then((respo) => {
          //console.log(respo,"USERINFO")
          setloadervalue(true)

          const formData = new FormData();

        formData.append(
          "user",
          `{
            "id":${respo.data.data.id},
            "roleId":${respo.data.data.roleId},
            "countryId":${respo.data.data.countryId},
            "refCodeId":"${respo.data.data.refCodeId}",
            "fName":"${respo.data.data.fName}",
            "mName":"${respo.data.data.mName}",
            "lName":"${respo.data.data.lName}",
            "businessName":"${respo.data.data.businessName}",
            "regNo":"${respo.data.data.regNo}",
            "regTimezone":"${respo.data.data.regTimezone}",
            "businessAddress":"${respo.data.data.businessAddress}",
            "customerId":"${respo.data.data.customerId}",
            "phone":"${respo.data.data.phone}",
            "phoneCode":"${respo.data.data.phoneCode}",
            "phoneVerifiedAt":"",
            "isEmailVerified":0,
            "emailVerifiedAt":"",
            "isDeleted":false,
            "isOCRVerfiedId":0,
            "email":"${respo.data.data.email}",
            "digitalVerifiedLink": "${respo.data.data.digitalVerifiedLink}",
            "digitalVerifiedTransactionId": "${respo.data.data.digitalVerifiedTransactionId}",
            "isSignupCompleted" : false 
            }`
        );

        formData.append(
          'kycdetails',
          `{
            "id":${K_ID},
            "userId":${R_ID},
            "streetName":"${respo.data.data.userkycdetails.streetName}",
            "countryId": ${respo.data.data.userkycdetails.countryId},
            "stateId":${respo.data.data.userkycdetails.stateId},
            "nationality":"${respo.data.data.userkycdetails.nationality}",
            "suburb":"${respo.data.data.userkycdetails.suburb}",
            "postalCode":"${respo.data.data.userkycdetails.postalCode}",
            "verified":false,
            "occupationId":${respo.data.data.userkycdetails.occupationId},
            "isResidence": ${respo.data.data.userkycdetails.isResidence},
            "kycStatus":${respo.data.data.userkycdetails.kycStatus}
          }`);

        // formData.append(
        //   "iddetails",
        //   `{
        //     "id":${I_ID},
        //     "userId":${R_ID},
        //     "typeid":"",
        //     "documentNumber":"",
        //     "cardNumber":"",
        //     "dob":"",
        //     "documentValidity":"",
        //     "issuingAuthority":""
        //   }`
        // );
        formData.append(
          "iddetails",
          `{
            "id":${I_ID},
            "userId":${R_ID},
            "typeId":"${respo.data.data.iddetails.typeId}",
            "documentNumber":"${respo.data.data.iddetails.documentNumber}",
            "cardNumber":"${respo.data.data.iddetails.cardNumber}",
            "dob":"${respo.data.data.iddetails.dob}",
            "documentValidity":"${respo.data.data.iddetails.documentValidity}",
            "issuingAuthority":"${respo.data.data.iddetails.issuingAuthority}"
          }`
        );

        // formData.append(
        //   "businessDetails",
        //   `{
        //     "id":${R_ID},
        //     "userId":${B_ID},
        //     "companyName":"",
        //     "abn":"",
        //     "typeBusiness":"",
        //     "industryType":"",
        //     "noDirector":"",
        //     "noShareholder":"",
        //     "noEmployee":"",
        //     "businessAddress":"",
        //     "targetBusiness":"",
        //     "website":"",
        //     "expectedRemittance":"",
        //     "volumeYear":"",
        //     "noOfTranscation":"",
        //     "countryOfBusiness":""
        //   }`
        // );
        formData.append('isFromSignup', false);
        formData.append('stepNo', 5);

        for (let i = 0; i < imageArray.length; i++) {

          const fileName = imageArray[i].name;
          formData.append('iddocuments', imageArray[i], fileName);
        }


        const config = {
          method: "POST",
          url: CommonConstants.BASE_URL + "/updateuserinfo",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData
        };

        axios(config)
          .then(function (response) {
            if(response.data.status===true){
              console.log(response.data.data,"UpdatedData")
                SummuryDocumentsI(true)
                GoNextStep()
              setloadervalue(false)
            }else{
              setloadervalue(false)
              StepBlank('')
            }
          })
          .catch(function (error) {
            console.log(error)
            setloadervalue(false)
            StepBlank('')
          });
        }).catch(err=>{
          console.log(err)
          setloadervalue(false)
          StepBlank('')
        })
        }else{
          setIdTypePopupError(true)
          setloadervalue(false)
          StepBlank('')
        }
      }
    }else{
      StepBlank('')
      setloadervalue(false)
    }
  };

  const [userIdType,setuserIdType]=useState("")
  const [isSearchable1, setIsSearchable1] = useState(true);

  const handleDataIdTypeIndividual = (e) => {
    setValidBIdType(e)
    setstep5value((prevState) => ({
      ...prevState,
      Business_IDType: e.value
    }));
  };

  const handleDataIdTypeIndividual1 = (e) => {
    setValidAIdType(e)
    setstep5value((prevState) => ({
      ...prevState,
      Agent_IDType: e.value,
    }));
  };

  const handleDataIdIssueAuthority = (e) => {
    setValidBIdAuthority(e)
    setstep5value((prevState) => ({
      ...prevState,
      Business_IDIssuingAuthority: e.value,
    }));
  };

  const handleDataIdIssueAuthority1 = (e) => {
    setValidAIdAuthority(e)
    setstep5value((prevState) => ({
      ...prevState,
      Agent_IDIssuingAuthority: e.value,
    }));
  };

  const[ValidBIdType,setValidBIdType] = useState('0')
  const[ValidBIdAuthority,setValidBIdAuthority] = useState('0')
  const[ValidAIdType,setValidAIdType] = useState('0')
  const[ValidAIdAuthority,setValidAIdAuthority] = useState('0')

  const[Valid,setValid] = useState(false)

  const handleBUpdateDataIndividual = async () => {
    // setloadervalue(true)
    if(validator.error_input_validation("Bussiness_id_Details_step5")){
      if(ValidBIdType =='0'){
        setValid(true)
        StepBlank('')
      }else if(ValidBIdAuthority =='0'  ){
        setValid(true)
        StepBlank('')
      }else{
        setValid(false)
        axios.post(CommonConstants.BASE_URL + "/getuserinfobyid", {id:R_ID}).then((respo) => {
        //console.log(respo,"USERINFO")
        setloadervalue(true)

        const formData = new FormData();
        formData.append(
          "user",
          `{
            "id":${respo.data.data.id},
            "roleId":${respo.data.data.roleId},
            "countryId":${respo.data.data.countryId},
            "refCodeId":"${respo.data.data.refCodeId}",
            "fName":"${respo.data.data.fName}",
            "mName":"${respo.data.data.mName}",
            "lName":"${respo.data.data.lName}",
            "businessName":"${respo.data.data.businessName}",
            "regNo":"${respo.data.data.regNo}",
            "regTimezone":"${respo.data.data.regTimezone}",
            "businessAddress":"${respo.data.data.businessAddress}",
            "customerId":"${respo.data.data.customerId}",
            "phone":"${respo.data.data.phone}",
            "phoneCode":"${respo.data.data.phoneCode}",
            "phoneVerifiedAt":"",
            "isEmailVerified":0,
            "emailVerifiedAt":"",
            "isDeleted":false,
            "isOCRVerfiedId":0,
            "email":"${respo.data.data.email}",
            "digitalVerifiedLink": "${respo.data.data.digitalVerifiedLink}",
            "digitalVerifiedTransactionId": "${respo.data.data.digitalVerifiedTransactionId}",
            "isSignupCompleted" : false 
            }`
        );

        formData.append(
          "iddetails",
          `{
            "id":${I_ID},
            "userId":${R_ID},
            "typeId":"${step5value.Business_IDType}",
            "documentNumber":"${step5value.Business_IDNumber}",
            "cardNumber":"${step5value.Business_CardNumber}",
            "dob":"${step5value.Business_DOB}",
            "documentValidity":"${step5value.Business_IDExpiry}",
            "issuingAuthority":"${step5value.Business_IDIssuingAuthority}"
          }`
        );

        formData.append('isFromSignup', true);
        formData.append('stepNo', 5);
        ///////Update changes remaining//////////

        // console.log(formData,"formData")

        const config = {
          method: "POST",
          url: CommonConstants.BASE_URL + "/updateuserinfo",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        };

        axios(config)
          .then(function (response) {
            if(response.data.status===true){
              console.log(response.data.data,"UpdatedData")
              GoNextStepBA()
              setloadervalue(false)
              // UserIdType(step5value.Business_IDType)
              var IType =Idtypes.filter((e)=> e.value == step5value.Business_IDType)
              UserIdType(IType[0].label)
            } else if(response.data.status===false){
              setloadervalue(false)
              setExistUser(true)
              setExistUserMessage(response.data.message)
              StepBlank('')
            }
          })
          .catch(function (error) {
            // setloadervalue(false)
          });
        }).catch(err=>{
          console.log(err)
        })
      }
    }else if(ValidBIdType =='0'){
      setValid(true)
      StepBlank('')
    }else if(ValidBIdAuthority =='0'  ){
      setValid(true)
      StepBlank('')
    }else{
      StepBlank('')
    }
  };

  const handleAUpdateDataIndividual = async () => {
    // setloadervalue(true)
    if(validator.error_input_validation("Agent_id_Details_step5")){
      if(ValidAIdType =='0'){
        setValid(true)
        StepBlank('')
      }else if(ValidAIdAuthority =='0'  ){
        setValid(true)
        StepBlank('')
      }else{
        setValid(false)
        axios.post(CommonConstants.BASE_URL + "/getuserinfobyid", {id:R_ID}).then((respo) => {
          //console.log(respo,"USERINFO")
          setloadervalue(true)

        const formData = new FormData();
        formData.append(
          "user",
          `{
            "id":${respo.data.data.id},
            "roleId":${respo.data.data.roleId},
            "countryId":${respo.data.data.countryId},
            "refCodeId":"${respo.data.data.refCodeId}",
            "fName":"${respo.data.data.fName}",
            "mName":"${respo.data.data.mName}",
            "lName":"${respo.data.data.lName}",
            "businessName":"${respo.data.data.businessName}",
            "regNo":"${respo.data.data.regNo}",
            "regTimezone":"${respo.data.data.regTimezone}",
            "businessAddress":"${respo.data.data.businessAddress}",
            "customerId":"${respo.data.data.customerId}",
            "phone":"${respo.data.data.phone}",
            "phoneCode":"${respo.data.data.phoneCode}",
            "phoneVerifiedAt":"",
            "isEmailVerified":0,
            "emailVerifiedAt":"",
            "isDeleted":false,
            "isOCRVerfiedId":0,
            "email":"${respo.data.data.email}",
            "digitalVerifiedLink": "${respo.data.data.digitalVerifiedLink}",
            "digitalVerifiedTransactionId": "${respo.data.data.digitalVerifiedTransactionId}",
            "isSignupCompleted" : false 
            }`
        );
        //////////////////////////baki che agnet//////////////////////////////////
        formData.append(
          "iddetails",
          `{
            "id":${I_ID},
            "userId":${R_ID},
            "typeId":"${step5value.Agent_IDType}",
            "documentNumber":"${step5value.Agent_IDNumber}",
            "cardNumber":"${step5value.Agent_CardNumber}",
            "dob":"${step5value.Agent_DOB}",
            "documentValidity":"${step5value.Agent_IDExpiry}",
            "issuingAuthority":"${step5value.Agent_IDIssuingAuthority}"
          }`
        );

        formData.append('isFromSignup', true);
        formData.append('stepNo', 5);
        //////////////////////////baki che agnet//////////////////////////////////

        ///////Update changes remaining//////////

        // console.log(formData,"formData")

        const config = {
          method: "POST",
          url: CommonConstants.BASE_URL + "/updateuserinfo",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        };

        axios(config)
          .then(function (response) {
            if(response.data.status===true){
              console.log(response.data.data,"UpdatedData")
              GoNextStepBA()
              setloadervalue(false)
              var IType =Idtypes.filter((e)=> e.value == step5value.Agent_IDType)
              UserIdType(IType[0].label)
              // setloadervalue(false)
              // setModalShowAdd(true)
              // HandlerIndividualUser()
            } else if(response.data.status===false){
              setloadervalue(false)
              setExistUser(true)
              setExistUserMessage(response.data.message)
              StepBlank('')
            }
          })
          .catch(function (error) {
            // setloadervalue(false)
          });
        }).catch(err=>{
          console.log(err)
        })
      }
    }else if(ValidAIdType =='0'){
      setValid(true)
      StepBlank('')
    }else if(ValidAIdAuthority =='0'  ){
      setValid(true)
      StepBlank('')
    }else{
      StepBlank('')
    }
  };

  return (
    <>
      <section>
        <div className="step5Welcome text-white text-center bolder my-4 py-3">
          Welcome to LegalRemit
        </div>
        <Container fluid>
        {loadervalue == true ? <Loader /> : ""}
          <Row>
            <Col className="col-lg-12 p-0">
              <div className="mt-3 pe-4 ps-4">
                <Row id="stepone5in1">
                  <Col className="col-lg-12 p-0">
                    <div className="text-center">
                      <label className="text-center text-black mb-2 responsiveFontLarge">
                        Upload Document ({IndividualUserIdType})
                      </label>
                    </div>
                    <div className="mt-3">
                      <Form id="">
                        <Row className="d-flex m-auto">
                          <Col className="col-lg-12 d-flex">
                            <Col className=" pe-2">
                              <UploadFiles
                                RunningStep={activestepkey}
                                imageData={imageData}
                                Update_Step={UpdateStep}
                                I_UserIdType={IndividualUserIdType}
                              ></UploadFiles>
                            </Col>
                          </Col>
                        </Row>
                      </Form>
                    </div>
                  </Col>
                </Row>

                <Row id="steptwo5in2">
                  <Row className="d-flex align-items-center">
                    <Col className="col-lg-12 d-flex justify-content-center">
                      <label className="text-center text-black responsiveFontLarge">
                        ID Details
                      </label>
                    </Col>
                  </Row>

                  <Form className="mt-3 " id="Bussiness_id_Details_step5">
                    <Row className=" respoChildFooter">
                    <Form.Group
                        as={Col}
                        className="nationalityDRP input-container orangeBorder"
                      >
                        <i className="radiumText nationalityMain3 	fa fa-flag svgNationality"></i>
                        <Select
                          name="IndidualNationality"
                          // id="Example2"
                          options={Idtypes}

                          className="SelectValueSelect5 SelectValueSelect99 SelectHoverLabel required nationality"
                          closeMenuOnSelect={true}
                          isSearchable={isSearchable1}
                          onChange={(e)=>{handleDataIdTypeIndividual(e)}}
                        />
                   {/* ////////////////////////////////////// */}
                   {ValidBIdType == '0' && Valid == true && (
                            <small className="error-message text-danger">Please select ID Type</small>
                          )}
                          <label style={{zIndex:0}} htmlFor="name" className="form-label1">
                            ID Type
                          </label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please Select The Id Type
                          </small>

                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="radiumText mainStep4 fa fa-id-card "></i>
                        <Form.Control
                          name="Business_IDNumber"
                          onChange={(e)=>{
                            let value = e.target.value;
                            let sanitizedValue ='';

                            var sanitizedValues = value.replace(/[^a-zA-Z0-9]/g, '');
                            sanitizedValue = sanitizedValues.toUpperCase();

                            setstep5value((prevState) => ({
                              ...prevState,
                              Business_IDNumber: sanitizedValue,
                            }));
                          }}
                          value={step5value.Business_IDNumber}
                          type="text"
                          placeholder="ID Number"
                          className="purpleFormStep5 required form-input"
                        />
                        <label htmlFor="name" className="form-label1">ID Number</label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter ID Number
                        </small>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="radiumText mainStep4 fa fa-id-card "></i>
                        <Form.Control
                          name="Business_CardNumber"
                          onChange={(e)=>{
                            let value = e.target.value;
                            let sanitizedValue ='';

                            var sanitizedValues = value.replace(/[^a-zA-Z0-9]/g, '');
                            sanitizedValue = sanitizedValues.toUpperCase();
                            setstep5value((prevState) => ({
                              ...prevState,
                              Business_CardNumber: sanitizedValue,
                            }));
                          }}
                          value={step5value.Business_CardNumber}
                          type="text"
                          placeholder="Card Number"
                          className="purpleFormStep5 form-input"
                          // cardnumber
                        />
                        <label htmlFor="name" className="form-label1">Card Number</label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Card Number
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      {/* <Col className="p-0 m-0"> */}
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container "
                        >
                          <i className="radiumText mainStep4 fa fa-calendar "></i>
                          <Form.Control
                            name="Business_DOB"
                            onChange={handleDataStep5}
                            type="date"
                            max={maxDate.toISOString().split('T')[0]}
                            min={minDate.toISOString().split('T')[0]}
                            onKeyPress={(event) => event.preventDefault()}
                            placeholder="Date of Birth"
                            className="purpleFormStep5 required form-input"
                          />
                        <label htmlFor="name" className="form-label1">Date of Birth</label>
                          <span className="d-none text-danger error_message ms-2 error">
                            Please Enter Your Date of Birth
                          </span>
                          <small className="responsiveFontLarge  d-none text-danger error_message error_message_number2 ms-2">
                            Please Enter Valid number
                          </small>
                        </Form.Group>
                      {/* </Col>
                      <Col className="p-0 m-0"> */}

                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container "
                        >
                          <i className="radiumText mainStep4 fa fa-calendar"></i>
                          <Form.Control
                            name="Business_IDExpiry"
                            onChange={handleDataStep5}
                            min={formattedDate}
                            onKeyPress={(event) => event.preventDefault()}
                            type="date"
                            placeholder="Date of ID Expiry"
                            className="purpleFormStep5 required form-input"
                          />
                        <label htmlFor="name" className="form-label1">Date of ID Expiry</label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please Enter Date of ID Expiry
                          </small>
                          <small className="responsiveFontLarge  d-none text-danger error_message error_message_number3 ms-2">
                            Please Enter Valid number
                          </small>
                        </Form.Group>
                      {/* </Col> */}
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="radiumText mainStep4 fas fa-landmark"></i>
                        {/* <Form.Select
                          className="mainStep5Select required form-input"
                          name="Business_IDIssuingAuthority"
                          onChange={handleDataStep5}
                        >
                          <option value="">ID Issuing Authority</option>
                          {IdAuthority &&
                            IdAuthority.map((IdAuthorityName, index) => {
                              return (
                                <option value={IdAuthorityName.authorityName}>
                                  {IdAuthorityName.authorityName}
                                </option>
                              );
                            })}
                        </Form.Select> */}
                        <Select
                          name="IndidualIDType"
                          options={IdAuthority}
                          className="SelectValueSelect5 SelectHoverLabel required nationality"
                          closeMenuOnSelect={true}
                          isSearchable={isSearchable1}
                          onChange={(e)=>{handleDataIdIssueAuthority(e)}}
                        />
                        {ValidBIdAuthority == '0' && Valid == true && (
                          <small className="error-message text-danger">Please select ID Issuing Authority</small>
                        )}
                        <label style={{zIndex:0}} htmlFor="name" className="form-label1">ID Issuing Authority</label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Select ID Issuing Authority
                        </small>
                        {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                      </Form.Group>
                    </Row>
                  </Form>
                </Row>

                <Row id="stepthree5in3">
                  <Col className="col-lg-12 p-0">
                    <Row className="d-flex align-items-center pb-4">
                      <Col className="col-lg-12 d-flex justify-content-center">
                        <label className="text-center text-black">
                          ID Details
                        </label>
                      </Col>
                    </Row>

                    <Form className="mt-3 " id="Agent_id_Details_step5">
                      <Row className="mb-3 respoChildFooter">
                        <Form.Group
                          as={Col}
                          className="nationalityDRP left-inner-addon input-container "
                        >
                          <i className="radiumText nationalityMain3 	fa fa-flag svgNationality"></i>
                          {/* <Form.Select
                            className="mainStep5Select required form-input"
                            name="Agent_IDType"
                            onChange={handleDataStep5}
                          >
                            <option value="">ID Type</option>
                            {
                              Idtypes && Idtypes.map((ID)=>{
                                return(<option value={ID.id}>{ID.name}</option>)
                              })
                            }
                          </Form.Select> */}
                          <Select
                            name="IndidualIDType"
                            options={Idtypes}
                            className="SelectValueSelect5 SelectValueSelect99 SelectHoverLabel required nationality"
                            closeMenuOnSelect={true}
                            isSearchable={isSearchable1}
                            onChange={(e)=>{handleDataIdTypeIndividual1(e)}}
                          />
                          {ValidAIdType == '0' && Valid == true && (
                            <small className="error-message text-danger">Please select ID Type</small>
                          )}
                        <label style={{zIndex:0}} htmlFor="name" className="form-label1">ID Type</label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please Enter The ID Type
                          </small>
                          {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                        </Form.Group>
                      </Row>

                      <Row className="mb-3 respoChildFooter">
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container "
                        >
                          <i className="radiumText mainStep4 fa fa-id-card "></i>
                          <Form.Control
                            type="text"
                            name="Agent_IDNumber"
                            onChange={(e)=>{
                              let value = e.target.value;
                              let sanitizedValue ='';

                              var sanitizedValues = value.replace(/[^a-zA-Z0-9]/g, '');
                              sanitizedValue = sanitizedValues.toUpperCase();
                              setstep5value((prevState) => ({
                                ...prevState,
                                Agent_IDNumber: sanitizedValue,
                              }));
                            }}
                            value={step5value.Agent_IDNumber}
                            placeholder="ID Number"
                            className="purpleFormStep5 required form-input"
                          />
                        <label htmlFor="name" className="form-label1">ID Number</label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please Enter The ID Number
                          </small>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container "
                        >
                          <i className="radiumText mainStep4 fa fa-id-card "></i>
                          <Form.Control
                            type="text"
                            name="Agent_CardNumber"
                            onChange={(e)=>{
                              let value = e.target.value;
                              let sanitizedValue ='';

                              var sanitizedValues = value.replace(/[^a-zA-Z0-9]/g, '');
                              sanitizedValue = sanitizedValues.toUpperCase();
                              setstep5value((prevState) => ({
                                ...prevState,
                                Agent_CardNumber: sanitizedValue,
                              }));
                            }}
                            value={step5value.Agent_CardNumber}
                            placeholder="Card Number"
                            className="purpleFormStep5 form-input"
                            // cardnumber
                          />
                        <label htmlFor="name" className="form-label1">Card Number</label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please Enter The Card Number
                          </small>
                        </Form.Group>
                      </Row>

                      <Row className="mb-3 respoChildFooter">
                        {/* <Col className="p-0 m-0"> */}

                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container "
                          >
                            <i className="radiumText mainStep4 fa fa-calendar "></i>
                            <Form.Control
                              type="date"
                              name="Agent_DOB"
                              onChange={handleDataStep5}
                              max={maxDate.toISOString().split('T')[0]}
                              min={minDate.toISOString().split('T')[0]}
                              onKeyPress={(event) => event.preventDefault()}
                              placeholder="Date of Birth"
                              className="purpleFormStep5 required form-input"
                            />
                        <label htmlFor="name" className="form-label1">Date of Birth</label>
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Please Enter The Date of Birth
                            </small>
                            <small className="responsiveFontLarge  d-none text-danger error_message error_message_number2 ms-2">
                              Please Enter Valid number
                            </small>
                          </Form.Group>
                        {/* </Col>
                        <Col className="p-0 m-0"> */}

                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container "
                          >
                            <i className="radiumText mainStep4 fa fa-calendar"></i>
                            <Form.Control
                              type="date"
                              name="Agent_IDExpiry"
                              onChange={handleDataStep5}
                              onKeyPress={(event) => event.preventDefault()}
                              min={formattedDate}
                              placeholder="Date of ID Expiry"
                              className="purpleFormStep5 required form-input"
                            />
                        <label htmlFor="name" className="form-label1">Date of ID Expiry</label>
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Please Enter The Date of ID Expiry
                            </small>
                            <small className="responsiveFontLarge  d-none text-danger error_message error_message_number3 ms-2">
                              Please Enter Valid number
                            </small>
                          </Form.Group>
                        {/* </Col> */}
                      </Row>

                      <Row className="mb-3 respoChildFooter">
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container "
                        >
                          <i className="radiumText mainStep4 fas fa-landmark"></i>
                          {/* <Form.Select
                            className="mainStep5Select required form-input"
                            name="Agent_IDIssuingAuthority"
                            onChange={handleDataStep5}
                          >
                            <option value="">ID Issuing Authority</option>
                            {AIdAuthority &&
                              AIdAuthority.map((IdAuthorityName, index) => {
                                return (
                                  <option value={IdAuthorityName.authorityName}>
                                    {IdAuthorityName.authorityName}
                                  </option>
                                );
                              })}
                          </Form.Select> */}
                          <Select
                            name="IndidualIDType"
                            options={AIdAuthority}
                            className="SelectValueSelect5 SelectHoverLabel required nationality"
                            closeMenuOnSelect={true}
                            isSearchable={isSearchable1}
                            onChange={(e)=>{handleDataIdIssueAuthority1(e)}}
                          />
                          {ValidAIdAuthority == '0' && Valid == true && (
                            <small className="error-message text-danger">Please select ID Issuing Authority</small>
                          )}
                        <label style={{zIndex:0}} htmlFor="name" className="form-label1">ID Issuing Authority</label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please Select The ID Issuing Authority
                          </small>
                          {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                        </Form.Group>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>

        <Modal
          className="verifyModal"
          dialogClassName="modal-120w"
          show={Ashow}
        >
          <Row className="">
            <Col className="col-lg-12 d-flex align-items-center">
              <Col className="col-lg-5 verfiyBlock2 moneySendRespo">
                <img src={modalAVector} className="img-fluid p-2" />
              </Col>
              <Col className="col-lg-7 border-left verfiyBlock1 p-0">
                <Modal.Header className=" borderHeader 2">
                  <Modal.Title className="py-2">
                    <small className="responsiveFontLarge  text-black bolder ">
                      Choose ID Verification
                    </small>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex align-items-start flex-col mt-4">
                    <input
                      className="customRadioOrange "
                      id="specifyColor1"
                      // checked
                      type="radio"
                      onClick={AgentDigitalValue}
                      name="fav_language"
                      value="CSS"
                    />
                    <label for="html" className="text-black bolder ms-3">
                      Digital Verification (Recommended)
                    </label>
                  </div>
                  <small className="responsiveFontLarge  d-block ms-4 ps-3 pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </small>
                  <div className="d-flex align-items-center flex-col mt-4">
                    <input
                      className="customRadioOrange"
                      type="radio"
                      id="specifyColor2"
                      onClick={AgentManualValue}
                      name="fav_language"
                      value="CSS"
                    />
                    <label for="html" className="text-black bolder ms-3">
                      Manual Verification (Slower Method)
                    </label>
                  </div>
                  <small className="responsiveFontLarge  d-block ms-4 ps-3 pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </small>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="d-flex justify-content-center m-auto my-4 col-lg-4 w-25 verifyModalbtn"
                    variant="secondary"
                    disabled={IdverifyedSuccess == true ? false : true}
                    onClick={handleAgentId}
                  >
                    Next
                  </Button>
                </Modal.Footer>
              </Col>
            </Col>
          </Row>
        </Modal>

        <Modal className="verifyModal" dialogClassName="modal-90w" show={Bshow}>
          <Row className="">
            <Col className="col-lg-12 d-flex align-items-center">
              <Col className="col-lg-5 verfiyBlock2 moneySendRespo">
                <img src={modalAVector} className="img-fluid p-2" />
              </Col>
              <Col className="col-lg-7 border-left verfiyBlock1 p-0">
                <Modal.Header className=" borderHeader 2">
                  <Modal.Title className="py-2">
                    <small className="responsiveFontLarge  text-black bolder ">
                      Choose ID Verification
                    </small>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex align-items-start flex-col mt-4">
                    <input
                      className="customRadioOrange "
                      id="specifyColor1"
                      // checked
                      type="radio"
                      onClick={DigitalValue}
                      name="fav_language"
                      value="CSS"
                    />
                    <label for="html" className="text-black bolder ms-3">
                      Digital Verification (Recommended)
                    </label>
                  </div>
                  <small className="responsiveFontLarge  d-block ms-4 ps-3 pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </small>
                  <div className="d-flex align-items-center flex-col mt-4">
                    <input
                      className="customRadioOrange"
                      type="radio"
                      id="specifyColor2"
                      onClick={ManualValue}
                      name="fav_language"
                      value="CSS"
                    />
                    <label for="html" className="text-black bolder ms-3">
                      Manual Verification (Slower Method)
                    </label>
                  </div>
                  <small className="responsiveFontLarge  d-block ms-4 ps-3 pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </small>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="d-flex justify-content-center m-auto my-4 col-lg-4 w-25 verifyModalbtn"
                    variant="secondary"
                    disabled={IdverifyedSuccess == true ? false : true}
                    onClick={handleBusinessId}
                  >
                    Next
                  </Button>
                </Modal.Footer>
              </Col>
            </Col>
          </Row>
        </Modal>

        <Modal
          centered
          show={ExistUser}
          onHide={(e) => {
            setExistUser(false);
          }}
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Alert</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <p className="text-black ">
              {
                ExistUserMessage == "Duplicate" ? "Your account already exists, Please use your old account or Contact our support team":

                ExistUserMessage == "Suspected" ? "we are unable to verify your account, please contact our support in matter of urgency."

                : ""
              }
            </p>
          </Modal.Body>
          <Modal.Footer>
          {
              ExistUserMessage == "Duplicate" ?
              <Button
                  className="mt-2 col-lg-3 d-block m-auto nextBtn1"
                  variant="primary"
                  onClick={(e) => {
                    setExistUser(false);
                  }}
                >
                  Ok
              </Button>
              :
              ExistUserMessage == "Suspected" ?
              <>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setExistUser(false);
              }}
            >
              Cancel
            </Button>

            <Button
                className="mt-2 col-lg-3 d-block m-auto nextBtn1"
                variant="primary"
                onClick={(e) => {
                  GoNextStepBA()
                  //  handleIndividual : GoNextStepBA()
                  setExistUser(false);
                }}
              >
              Ok
            </Button>
            </>
            :""
}
          </Modal.Footer>
        </Modal>

        <ModalComponent
        show={IdTypePopupError}
        title11={"Id Details Document Upload Required"}
        onHide={() => setIdTypePopupError(false)}
      />
      </section>
    </>
  );
}
