import React, { useContext, useState, useEffect } from "react";
import "./Step6.scss";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../../../Helpers/CountryDropdown/flags.css";
import ReactFlagsSelect from "react-flags-select";
// import UploadFiles from "../../../../Helpers/UploadFiles/UploadFiles";
import BusinessUploadFiles from "../../../../Helpers/UploadFiles/Business_File_Uploading";
import AgentUploadFiles from "../../../../Helpers/UploadFiles/Agent_File_Uploading";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import userContext from "../../Signupdata/Usecontext";
import Individual_File_Upload from "../../../../Helpers/UploadFiles/Individual_File_Upload";
import axios from "axios";
import { CommonConstants } from "../../../../../Constants/common.constants";
import Loader from '../../../../Loader/Loader';
import ModalComponent from "../../../../Dashbord/ModalComponent";
import PdfLogo from "../../../../../assets/images/pdf.png";

const validator = require("../../../../../assets/js/validator");

export default function Step6({
  Name,
  B_A_activestepkey,
  handleid,
  activestepkey,
  step6Dataa,
  BusinessImages,
  AgentImages,
  R_ID,
  B_ID,
  K_ID,
  I_ID,
  GoNextStepBA,
  GoNextStep,
  UpdateStep,
  UserIdType,
  CountryID,
  StepBlank,
  SummuryDocumentsI,
  SummuryDocuments

}) {
  const [show, setShow] = useState(false);

  const [Upload_Document,setUpload_Document] = useState(false)

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  const [IdTypePopupError,setIdTypePopupError]=useState(false)
  const [AdditionalIdTypePopupError,setAdditionalIdTypePopupError]=useState(false)
  const handleSaveClose = () => {
    UPDATEuserDataIndividual()
    setShow(false);
    setEditvalue(false);
  };
  const [loadervalue, setloadervalue]=useState(false)

  const [cancleData, setcancleData] = useState(false);

  const handleCancledata = () => {
    setEditvalue(false);
    setcancleData(true);
    //////step1///////
    document.getElementById("IndividualFirstname").value =
      data2.IndidualFirstname;
    document.getElementById("IndividualMiddlename").value =
      data2.IndidualMiddlename;
    document.getElementById("IndividualLastname").value =
      data2.IndidualLastname;
    document.getElementById("IndividualEmail").value = data2.IndidualEmail;
    document.getElementById("IndividualMobileNumber").value =
      data2.IndidualMobileNumber;
    document.getElementById("IndividualPassword").value =
      data2.Indidualpassword;
    document.getElementById("IndividualCPassword").value =
      data2.IndidualCpassword;
    //////////////////

    //////step2///////
    document.getElementById("Indidual_Nationality").value =
      data3.IndidualNationality;
    document.getElementById("Individual_Housename").value =
      data3.IndidualStreetName;
    document.getElementById("Individual_kyccity").value = data3.IndidualCity;
    document.getElementById("Individual_State").value = data3.IndidualState;
    document.getElementById("Individual_kyczipcode").value = data3.IndidualZip;
    document.getElementById("Individual_Occupation").value =
      data3.IndidualOccupation;
    document.getElementById("Individual_Residence").value =
      data3.IndidualResidence;
    setStateId(data3.IndidualState)
    //////////////////

    //////step3///////
    document.getElementById("Individual_idtype").value = data4.IndidualIDType;
    document.getElementById("Individual_id-number").value =
      data4.IndidualIDNumber;
    document.getElementById("Individual_card-details").value =
      data4.IndidualCardNumber;
    document.getElementById("Individual_DOB-details").value = data4.IndidualDOB;
    document.getElementById("Individual_IdExpire-details").value =
      data4.IndidualIDExpiry;
    document.getElementById("Authorityname").value =
      data4.IndividualIDIssuingAuthority;
      setAuthorityName(data4.IndividualIDIssuingAuthority)
    //////////////////
    CanclePopup()
  };

  const [Editvalue, setEditvalue] = useState(false);
  const [Nationality, setNationality] = useState([]);
  const [IdAuthority, setIdAuthority] = useState([]);
  const [IdAuthoritySubtype, setIdAuthoritySubtype] = useState([]);
  const [Occupation, setOccupation] = useState([]);
  const [CPhoneCode, setCPhoneCode] = useState("");
  const [B_FrontImage, setB_FrontImage] = useState([]);
  const [B_BackImage, setB_BackImage] = useState([]);
  const [A_FrontImage, setA_FrontImage] = useState([]);
  const [A_BackImage, setA_BackImage] = useState([]);
  const [AdditionalDocumnetArray, setAdditionalDocumnetArray] = useState([]);
  const imageData = (imagee,images2) => {
    BusinessImages(imagee);
    setB_FrontImage(imagee);
    setB_BackImage(images2);
  };

  const imageData2 = (imagee,images2) => {
    // console.log(imagee)
    AgentImages(imagee);
    setA_FrontImage(imagee);
    setA_BackImage(images2);
  };

  const handleAdditionalDocument = (imagee) => {
    setAdditionalDocumnetArray(imagee)
  };

  let BusinessimageArray = B_FrontImage.concat(B_BackImage);
  let AgentimageArray = A_FrontImage.concat(A_BackImage);

  const GetAllNationality = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallnationality"
      );
      // // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {
        // // console.log(response.data.data)
        setNationality(response.data.data);
      } else if (response.data.status === "error") {
        // console.log(response.data.message)
      }
    } catch (err) {
      // console.log(err)
    }
  };
  const GetAllOccupation = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getalloccupations"
      );
      if (response.data.status === true) {
        setOccupation(response.data.data);
      } else if (response.data.status === "error") {
        // console.log(response.data.message)
      }
    } catch (err) {
      // console.log(err)
    }
  };
  const [selectedImagesArray, setselectedImagesArray] = useState([]);
  const [selectIndKycSummary, setSelectIndKycSummary] = useState("AU");
  const onSelectIndKycSummary = (code) => setSelectIndKycSummary(code);

  const { Countrydata, data2, data3, data4, data5, DataImage, DataImageBack,setAdditionalImageArray } =
    useContext(userContext);
    // const { setAdditionalImageArray } = useContext(userContext);


  const [Country, setCountry] = useState([]);
  const GetAllCountrys = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallcountries"
      );
      // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {
        // console.log(response.data.data)
        setCountry(response.data.data);
      } else if (response.data.status === "error") {
        // console.log(response.data.message)
      }
    } catch (err) {
      // console.log(err)
    }
  };

  const [States, setStates] = useState([]);
  const GetAllStates = async (values) => {
    try {
      const CountryId = {
        id: Countrydata.CountryId,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallstatebycountryid",
        CountryId
      );
      if (response.data.status === true) {
        setStates(response.data.data);
      } else if (response.data.status === "error") {
      }
    } catch (err) {
      console.log(err);
    }
  };

  const GetNationalityIdAuthority = async (values) => {
    try {
      const NationalityName = {
        nationality: data3.IndidualNationality,
        countryId : Countrydata.CountryId
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getissueauthoritybynationality",
        NationalityName
      );
      if (response.data.status == true) {
        setIdAuthority(response.data.data);
        setIdAuthoritySubtype(response.data.data[0].issueAuthority);
      } else if (response.data.status === "error") {
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // GetIdTypeByCountryId()
      if (UpdateStep == "BsixthStep") {
      handleBUpdateDataIndividual();
    } else if (UpdateStep == "AsixthStep") {
      handleAUpdateDataIndividual();
    }else if (SummuryDocumentsI == true && UpdateStep == "IfifthStep") {
      IUserData()
      GetNationalityIdAuthority()
    }else if(UpdateStep == "SkipIfifthStep"){
      IUserData()
      GetNationalityIdAuthority()
    }
  }, [SummuryDocumentsI,UpdateStep, R_ID, B_ID, K_ID, I_ID]);

  useEffect(()=>{
    if(UpdateStep == "IfifthStep" || UpdateStep == "BfifthStep" || UpdateStep == "AfifthStep"){
      GetAllNationality();
      GetAllCountrys();
      GetAllOccupation();
    }
  },[UpdateStep])

  useEffect(()=>{
    GetAllStates();
  },[])

  useEffect(() => {

    setAdditionalImageArray(AdditionalDocumnetArray);

        var countryname=Countrydata.Countryiso3
    if(!countryname==""){
      const options = {
        componentRestrictions: { country:`${countryname}`},
      };
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        options
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        handlePlaceSelect(place);
      });
    }
    // GetNationalityIdAuthority();

    // document.getElementById("Indidual_Nationality").value = data3.IndidualNationality;
    // document.getElementById("Individual_State").value = data3.IndidualState;
    // document.getElementById("Individual_Occupation").value = data3.IndidualOccupation;
    // document.getElementById("Individual_Residence").value = data3.IndidualResidence;
    // document.getElementById("Individual_idtype").value = data4.IndidualIDType;
    // document.getElementById("Authorityname").value = data4.IndividualIDIssuingAuthority;
    // setAuthorityName(data4.IndividualIDIssuingAuthority)

    step6Dataa(data2, data3, data4, data5);

    if (Name === "Individual") {
      const CCodeNumber = Countrydata.CountryPhoneCode.substring(0, 1);
      if (CCodeNumber === "+") {
        setCPhoneCode(Countrydata.CountryPhoneCode);
      } else {
        setCPhoneCode("+" + Countrydata.CountryPhoneCode);
      }
      document.getElementById("stepone6in1").style.display = "block";
      document.getElementById("steptwo6in2").style.display = "none";
      document.getElementById("stepthree6in3").style.display = "none";
    } else if (Name === "Business") {
      if (B_A_activestepkey === "sixthStep") {
        handleid("File_Uploading_Business");
      }
      document.getElementById("stepone6in1").style.display = "none";
      document.getElementById("steptwo6in2").style.display = "block";
      document.getElementById("stepthree6in3").style.display = "none";
    } else {
      if (B_A_activestepkey === "sixthStep") {
        handleid("File_Uploading_Agent");
      }
      document.getElementById("stepone6in1").style.display = "none";
      document.getElementById("steptwo6in2").style.display = "none";
      document.getElementById("stepthree6in3").style.display = "block";
    }
  }, [Name, handleid, Editvalue, cancleData]);



  useEffect(()=>{
    GetIdTypeByCountryId()
  },[CountryID])

  const addressRegex = /^(\d+[A-Za-z]*|[A-Za-z]+\d+|\d+)[\/A-Za-z,]*\s+[A-Za-z\s]+$/;
  const [isAddressValid, setIsAddressValid] = useState(true);
  const [PostalZipcode,setPostalZipcode] = useState('')
  const [StreetName,setStreetName] = useState('')
  const [SubarbCity,setSubarbCity] = useState('')
  const [State,setState] = useState('')
  const [AutoTimeZone,setAutoTimeZone] = useState('')

    const handlePlaceSelect = async(place) => {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${Date.now()/1000}&key=AIzaSyCNJRR1zkMpq2RLpT6bM2BLAO2kEDZ8qtA`);
      const data = await response.json();
      console.log(data.timeZoneId,"TimeZone")
      setAutoTimeZone(data.timeZoneId)
    var TemArray = place.address_components;
    //const isValid = addressRegex.test(place.name);
    var isValid = true;
    var streetName = ''
    var street_number = ''
    var street_long_name= ''
    var postal_code = ''
    var city = ''
    var state = ''

    setPostalZipcode('')
    setState('')
    setSubarbCity('')
    setStreetName('')
    console.log(place)
    if (isValid) {
      TemArray.map((item,index) => {
        item.types.map((titem) => {
          street_number = titem === "street_number" ? item.long_name : street_number
          street_long_name = titem === "route" ? item.long_name : street_long_name
          postal_code = titem === "postal_code" ? item.long_name : postal_code
          city = titem === "locality" ? item.long_name : city
          state = titem === "administrative_area_level_1" ? item.long_name : state
        });
      });

      streetName = street_number !== '' && street_long_name !== '' ? street_number + ' ' + street_long_name : place.formatted_address.split(",")[0].trim()

      const matchedState = States.find((stateItem) => stateItem.name === state);
      if (matchedState) {
        document.getElementById("Individual_State").value = matchedState.id
        setStateId(matchedState.id)
      }
      document.getElementById("Individual_Housename").value = streetName
      document.getElementById("Individual_kyccity").value = city
      document.getElementById("Individual_kyczipcode").value = postal_code
    }
    setIsAddressValid(isValid);
    return isValid;
  };

  const autocompleteRef = React.useRef(null);

  const [activeEventKey, setactiveEventKey] = useState("0");
  const [iudetails, setiudetails] = useState(false);

  /////////User(Individual) - Data//////////

  const EditIndividualUserDetails = () => {
    setEditvalue(true);
  };

  const saveIndividualUserDetails = () => {
    // UPDATEuserDataIndividual()
    // handleShow(false)
    validator.error_input_validation("summary_Individual_Step6_userDetaul");
    if (
      validator.error_input_validation("summary_Individual_Step6_userDetaul")
    ) {
      handleShow();
    }
  };

  const EditIndividualKYCUserDetails = () => {
    setEditvalue(true);
    setactiveEventKey("1");
  };

  const saveIndividualKYCDetails = () => {
    // handleShow()
    validator.error_input_validation("summary_Individual_Step6_kycDetail");
    if (
      validator.error_input_validation("summary_Individual_Step6_kycDetail")
    ) {
      handleShow();
    }
  };

  const [ExistVerifyDuplicate, setExistVerifyDuplicate] = useState(false)

  const EditIndividualIDDetails = () => {
    setEditvalue(true);
    setactiveEventKey("2");
  };
  const saveIndividualIDDetails = () => {
    validator.error_input_validation("summary_Individual_Step6_userDetaul");
    if (
      validator.error_input_validation("summary_Individual_Step6_userDetaul")
    ) {
      handleShow();
    }
    handleShow();
  };
  const CanclePopup = () => {
    handleClose();
  };

  const handleIndividual_OccupationChange = (event) => {
    document.getElementById("Individual_Occupation").value = event.target.value;
  };

  const handleIndividual_ResidenceChange = (event) => {
    document.getElementById("Individual_Residence").value = event.target.value;
  };

  const handleIndividual_idtypeChange = (event) => {
    document.getElementById("Individual_idtype").value = event.target.value;
    // console.log(data4, "data4data")
  };

  const handleIndividualIDIssuingAuthorityChange = (event) => {
    document.getElementById("Authorityname").value =
      event.target.value;
      setAuthorityName(event.target.value)
  };

  const changeCountryName = (event) => {
    document.getElementById("Indidual_Nationality").value = event.target.value;
    GetAllStates();
  };

  const changeStateName = (event) => {
    document.getElementById("Individual_State").value = event.target.value;
    setStateId(event.target.value)
  };

  ///////////////////////////////////

  const [AExistMobile, setAExistMobile] = useState(false);

  const AExistMobileVerify = async (e) => {
    try {
      const UserExist = {
        email: "",
        phone: e.target.value,
      };
      // console.log(UserExist, " checkuserexistornot");
      // console.log(document.getElementById("OtpNumber").value, " OtpVerifyData By Id")

      const MobileNumberVerify = await axios.post(
        CommonConstants.BASE_URL + "/checkuserexistornot",
        UserExist
      );
      // console.log("otpVerifyDataResponse",MobileNumberVerify)
      if (MobileNumberVerify.data.status === false) {
        setAExistMobile(true);
      } else {
        setAExistMobile(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [ExistMobile, setExistMobile] = useState(false);

  const ExistMobileVerify = async (e) => {
    try {
      const UserExist = {
        phone: e.target.value
      };
      // console.log(document.getElementById("OtpNumber").value, " OtpVerifyData By Id")

      const MobileNumberVerify = await axios.post(
        CommonConstants.BASE_URL + "/checkuserexistornot",
        UserExist
      );
      // console.log("otpVerifyDataResponse",MobileNumberVerify)

      if (MobileNumberVerify.data.status === false) {
        setExistMobile(true);
      } else {
        setExistMobile(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const IndividualhandlemobileNo = (e) => {
    // IndividualMo_Number(e.target.value);
    ExistMobileVerify(e);
  };

  const [validationMobile, setvalidationMobile] = useState(false);

  const mobilevalidationchanges = (VALUE) => {
    // handleDataStep2(e)
    var mobilenumbervalidate = VALUE

    setExistMobile(false);

    var phoneno = /^(?!0|4)\d{5,15}$/;
    var zerovalid = /^((04)|0)\d{8}$/;
    var Fourvalid = /^4\d{8}$/;

    if (CPhoneCode == "+61") {
      setvalidationMobile(true);
      if (zerovalid.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      } else if (Fourvalid.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      } else if (
        mobilenumbervalidate.indexOf("04") === "0" &&
        mobilenumbervalidate.charAt(0) === "4"
      ) {
        setvalidationMobile(true);
      }
    } else {
      if (phoneno.test(mobilenumbervalidate)) {
        setvalidationMobile(false);
      }
    }
  };

  ///////////////////Email////////////////////
  const [ExistEmail, setExistEmail] = useState(false);

  const ExistEmailVerify = async (e) => {
    try {
      const UserExist = {
        email: e.target.value
      };

      const EmailExistVerify = await axios.post(
        CommonConstants.BASE_URL + "/checkuserexistornot",
        UserExist
      );

      if (EmailExistVerify.data.status === false) {
        setExistEmail(true);
      } else {
        setExistEmail(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBUpdateDataIndividual = async () => {
    if(validator.error_input_validation("File_Uploading")){
    axios
      .post(CommonConstants.BASE_URL + "/getuserinfobyid", { id: R_ID })
      .then((respo) => {
        console.log(respo, "USERINFO");

        if(UserIdType == 'Passport'){
        if(BusinessimageArray.length == 1){
          const DocumentsWithImages = AdditionalDocumnetArray.filter((doc) => doc.ImageArray.length > 0);
          if(DocumentsWithImages.length >= 2){
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
              "kycdetails",
              `{
                "id":${K_ID},
                "userId":${R_ID},
                "streetName":"${respo.data.data.userkycdetails.streetName}",
                "countryId": "${respo.data.data.userkycdetails.countryId}",
                "stateId":"${respo.data.data.userkycdetails.stateId}",
                "nationality":"${respo.data.data.userkycdetails.nationality}",
                "suburb":"${respo.data.data.userkycdetails.suburb}",
                "postalCode":"${respo.data.data.userkycdetails.postalCode}",
                "verified":0,
                "occupationId":"${respo.data.data.userkycdetails.occupationId}",
                "isResidence": "${respo.data.data.userkycdetails.isResidence}",
                "kycStatus":""
                }`
            );

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
            formData.append('stepNo', 6);

            for (let i = 0; i < BusinessimageArray.length; i++) {
              const fileName = BusinessimageArray[i].name;
              formData.append("iddocuments", BusinessimageArray[i], fileName);
            }

            ///////Update changes remaining//////////

            console.log(formData, "formData");

            const config = {
              method: "POST",
              url: CommonConstants.BASE_URL + "/updateuserinfo",
              headers: { "Content-Type": "multipart/form-data" },
              data: formData,
            };

            axios(config)
              .then(function (response) {
                if (response.data.status === true) {

                  const documentsWithImages = AdditionalDocumnetArray.filter((doc) => doc.ImageArray.length > 0);
                  console.log(documentsWithImages,"documentsWithImages")
                  // debugger
                  if (documentsWithImages.length >= 2) {
                  AdditionalDocumnetArray.map((Item)=>{
                    if(Item.ImageArray.length>0){
                      const formDataa = new FormData();

                      if(Item.typeName == "Other Documents") {
                        formDataa.append(
                          "userId", respo.data.data.id
                        );

                        formDataa.append(
                          "documentTypeId",Item.id
                        );

                        formDataa.append(
                          "type",Item.OtherDocumnetName
                        );

                        for (let i = 0; i < Item.ImageFileArray.length; i++) {
                          formDataa.append("documents", Item.ImageFileArray[i]);
                        }
                      }
                      else{
                        formDataa.append(
                          "userId", respo.data.data.id
                        );

                        formDataa.append(
                          "documentTypeId",Item.id
                        );

                        for (let i = 0; i < Item.ImageFileArray.length; i++) {
                          formDataa.append("documents", Item.ImageFileArray[i]);
                        }
                      }


                      ///////Update changes remaining//////////

                      console.log(formDataa, "formDataa");

                      const config = {
                        method: "POST",
                        url: CommonConstants.BASE_URL + "/uploadbusinessdocuments",
                        headers: { "Content-Type": "multipart/form-data" },
                        data: formDataa,
                      };

                      axios(config)
                        .then(function (response) {
                          if (response.data.status === true) {
                            console.log(response.data.data, "UpdatedData");
                            Item.ImageFileArray=''
                            SummuryDocuments(true)
                            setUpload_Document(true)
                            GoNextStepBA();
                            setloadervalue(false);
                          }else{
                            setloadervalue(false)
                            StepBlank('')
                          }
                        })
                        .catch(function (error) {
                          // setloadervalue(false)
                          console.log(error)
                        });
                    }
                  })
                }else{
                  console.log(response.data.data, "UpdatedData");
                  // GoNextStepBA();
                  setAdditionalIdTypePopupError(true)
                  StepBlank('')
                  setloadervalue(false)
                }

                }
                else{
                  setloadervalue(false)
                  StepBlank('')
                }
              })
              .catch(function (error) {
                // setloadervalue(false)
              });
          }else{
            setAdditionalIdTypePopupError(true)
            StepBlank('')
            setloadervalue(false)
          }
        }
        else{
          StepBlank('')
          setIdTypePopupError(true)
        }
      }else{
        // debugger/
        if(BusinessimageArray.length == 2){
          const DocumentsWithImages = AdditionalDocumnetArray.filter((doc) => doc.ImageArray.length > 0);

          if(DocumentsWithImages.length >= 2){
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
              "kycdetails",
              `{
                "id":${K_ID},
                "userId":${R_ID},
                "streetName":"${respo.data.data.userkycdetails.streetName}",
                "countryId":"${respo.data.data.userkycdetails.countryId}" ,
                "stateId":"${respo.data.data.userkycdetails.stateId}",
                "nationality":"${respo.data.data.userkycdetails.nationality}",
                "suburb":"${respo.data.data.userkycdetails.suburb}",
                "postalCode":"${respo.data.data.userkycdetails.postalCode}",
                "verified":0,
                "occupationId":"${respo.data.data.userkycdetails.occupationId}",
                "isResidence": "${respo.data.data.userkycdetails.isResidence}",
                "kycStatus":""
                }`
            );

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
            formData.append('stepNo', 6);

            for (let i = 0; i < BusinessimageArray.length; i++) {
              const fileName = BusinessimageArray[i].name;
              formData.append("iddocuments", BusinessimageArray[i], fileName);
            }

            ///////Update changes remaining//////////

            console.log(formData, "formData");

            const config = {
              method: "POST",
              url: CommonConstants.BASE_URL + "/updateuserinfo",
              headers: { "Content-Type": "multipart/form-data" },
              data: formData,
            };

            // debugger
            axios(config)
              .then(function (response) {
            // debugger

                if (response.data.status === true) {
            // debugger

                  const documentsWithImages = AdditionalDocumnetArray.filter((doc) => doc.ImageArray.length > 0);
                  console.log(documentsWithImages,"documentsWithImages")
                  if (documentsWithImages.length >= 2) {
                  AdditionalDocumnetArray.map((Item)=>{
                    if(Item.ImageArray.length > 0){
                      const formDataa = new FormData();

                      if(Item.typeName == "Other Documents") {
                        formDataa.append(
                          "userId", respo.data.data.id
                        );

                        formDataa.append(
                          "documentTypeId",Item.id
                        );

                        formDataa.append(
                          "type",Item.OtherDocumnetName
                        );

                        for (let i = 0; i < Item.ImageFileArray.length; i++) {
                          formDataa.append("documents", Item.ImageFileArray[i]);
                        }
                      }
                      else{
                        formDataa.append(
                          "userId", respo.data.data.id
                        );

                        formDataa.append(
                          "documentTypeId",Item.id
                        );

                        for (let i = 0; i < Item.ImageFileArray.length; i++) {
                          formDataa.append("documents", Item.ImageFileArray[i]);
                        }
                      }

                      ///////Update changes remaining//////////

                      console.log(formDataa, "formDataa");

                      const config = {
                        method: "POST",
                        url: CommonConstants.BASE_URL + "/uploadbusinessdocuments",
                        headers: { "Content-Type": "multipart/form-data" },
                        data: formDataa,
                      };

                      axios(config)
                        .then(function (response) {
                          if (response.data.status === true) {
                            console.log(response.data.data, "UpdatedData");
                            SummuryDocuments(true)
                            setUpload_Document(true)
                            GoNextStepBA();
                            setloadervalue(false);
                          }else{
                            setloadervalue(false)
                            StepBlank('')
                          }
                        })
                        .catch(function (error) {
                          // setloadervalue(false)
                          console.log(error)
                        });
                    }
                  })
                }else{
                  console.log(response.data.data, "UpdatedData");
                  // GoNextStepBA();
                  setAdditionalIdTypePopupError(true)
                  StepBlank('')
                  setloadervalue(false)
                }

                }else{
                  setloadervalue(false)
                  StepBlank('')
                }
              })
              .catch(function (error) {
                // setloadervalue(false)
              });
          }else{
            setAdditionalIdTypePopupError(true)
            StepBlank('')
            setloadervalue(false)
          }

        }
        else{
          StepBlank('')
          setIdTypePopupError(true)
        }
      }
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      StepBlank('')
    }
  };

  const handleAUpdateDataIndividual = async () => {
    if(validator.error_input_validation("File_Uploading")){
    axios
      .post(CommonConstants.BASE_URL + "/getuserinfobyid", { id: R_ID })
      .then((respo) => {
        console.log(respo, "USERINFO");
        if(UserIdType == 'Passport'){
        if(AgentimageArray.length == 1){
          const DocumentsWithImages = AdditionalDocumnetArray.filter((doc) => doc.ImageArray.length > 0);
          if(DocumentsWithImages.length >= 2){
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
                 "phone":"${respo.data.data.phone}",
                 "phoneCode":"${respo.data.data.phoneCode}",
                 "businessName":"${respo.data.data.businessName}",
                 "customerId":"${respo.data.data.customerId}",
                 "regNo":"${respo.data.data.regNo}",
                 "regTimezone":"${respo.data.data.regTimezone}",
                 "businessAddress":"${respo.data.data.businessAddress}",
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
              "kycdetails",
              `{
                "id":${K_ID},
                "userId":${R_ID},
                "streetName":"${respo.data.data.userkycdetails.streetName}",
                "countryId": "${respo.data.data.userkycdetails.countryId}" ,
                "stateId":"${respo.data.data.userkycdetails.stateId}",
                "nationality":"${respo.data.data.userkycdetails.nationality}",
                "suburb":"${respo.data.data.userkycdetails.suburb}",
                "postalCode":"${respo.data.data.userkycdetails.postalCode}",
                "verified":0,
                "occupationId":"${respo.data.data.userkycdetails.occupationId}",
                "isResidence": "${respo.data.data.userkycdetails.isResidence}",
                "kycStatus":""
                }`
            );

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
            formData.append('stepNo', 6);

            for (let i = 0; i < AgentimageArray.length; i++) {
              const fileName = AgentimageArray[i].name;
              formData.append("iddocuments", AgentimageArray[i], fileName);
            }
            //////////////////////////baki che agnet//////////////////////////////////

            ///////Update changes remaining//////////

            console.log(formData, "formData");

            const config = {
              method: "POST",
              url: CommonConstants.BASE_URL + "/updateuserinfo",
              headers: { "Content-Type": "multipart/form-data" },
              data: formData,
            };

            axios(config)
              .then(function (response) {
                if (response.data.status === true) {

                  const documentsWithImages = AdditionalDocumnetArray.filter(doc => doc.ImageArray.length > 0);
                  if (documentsWithImages.length >= 2) {
                    AdditionalDocumnetArray.map((Item)=>{
                      if(Item.ImageArray.length >0){

                        const formDataa = new FormData();
                        if(Item.typeName == "Other Documents") {
                          formDataa.append(
                            "userId", respo.data.data.id
                          );

                          formDataa.append(
                            "documentTypeId",Item.id
                          );

                          formDataa.append(
                            "type",Item.OtherDocumnetName
                          );

                          for (let i = 0; i < Item.ImageFileArray.length; i++) {
                            formDataa.append("documents", Item.ImageFileArray[i]);
                          }
                        }
                        else{
                          formDataa.append(
                            "userId", respo.data.data.id
                          );

                          formDataa.append(
                            "documentTypeId",Item.id
                          );

                          for (let i = 0; i < Item.ImageFileArray.length; i++) {
                            formDataa.append("documents", Item.ImageFileArray[i]);
                          }
                        }

                        ///////Update changes remaining//////////

                        console.log(formDataa, "formDataa");

                        const config = {
                          method: "POST",
                          url: CommonConstants.BASE_URL + "/uploadbusinessdocuments",
                          headers: { "Content-Type": "multipart/form-data" },
                          data: formDataa,
                        };

                        axios(config)
                          .then(function (response) {
                            if (response.data.status === true) {
                              console.log(response.data.data, "UpdatedData");
                              SummuryDocuments(true)
                            setUpload_Document(true)
                            GoNextStepBA();
                              setloadervalue(false);
                            }else{
                              setloadervalue(false)
                              StepBlank('')
                            }
                          })
                          .catch(function (error) {
                            // setloadervalue(false)
                            console.log(error)
                          });
                      }
                    })
                  }else{
                    setAdditionalIdTypePopupError(true)
                    StepBlank('')
                    setloadervalue(false)
                  }
                }else{
                  setloadervalue(false)
                  StepBlank('')
                }
              })
              .catch(function (error) {
                console.log(error);
                // setloadervalue(false)
              });
          }else{
            setAdditionalIdTypePopupError(true)
            StepBlank('')
            setloadervalue(false)
          }

        }
        else{
          StepBlank('')
          setIdTypePopupError(true)
        }
      }else{
        if(AgentimageArray.length == 2){
          const DocumentsWithImages = AdditionalDocumnetArray.filter((doc) => doc.ImageArray.length > 0);
          if(DocumentsWithImages.length >= 2){
            setloadervalue(true)
            // debugger

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
                 "phone":"${respo.data.data.phone}",
                 "phoneCode":"${respo.data.data.phoneCode}",
                 "businessName":"${respo.data.data.businessName}",
                 "customerId":"${respo.data.data.customerId}",
                 "regNo":"${respo.data.data.regNo}",
                 "regTimezone":"${respo.data.data.regTimezone}",
                 "businessAddress":"${respo.data.data.businessAddress}",
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
              "kycdetails",
              `{
                "id":${K_ID},
                "userId":${R_ID},
                "streetName":"${respo.data.data.userkycdetails.streetName}",
                "stateId":"${respo.data.data.userkycdetails.stateId}",
                "countryId": "${respo.data.data.userkycdetails.countryId}" ,
                "nationality":"${respo.data.data.userkycdetails.nationality}",
                "suburb":"${respo.data.data.userkycdetails.suburb}",
                "postalCode":"${respo.data.data.userkycdetails.postalCode}",
                "verified":0,
                "occupationId":"${respo.data.data.userkycdetails.occupationId}",
                "isResidence": "${respo.data.data.userkycdetails.isResidence}",
                "kycStatus":""
                }`
            );

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
            formData.append('stepNo', 6);

            for (let i = 0; i < AgentimageArray.length; i++) {
              const fileName = AgentimageArray[i].name;
              formData.append("iddocuments", AgentimageArray[i], fileName);
            }
            //////////////////////////baki che agnet//////////////////////////////////

            ///////Update changes remaining//////////

            console.log(formData, "formData");

            const config = {
              method: "POST",
              url: CommonConstants.BASE_URL + "/updateuserinfo",
              headers: { "Content-Type": "multipart/form-data" },
              data: formData,
            };

            axios(config)
              .then(function (response) {
                if (response.data.status === true) {
            // debugger

                  const documentsWithImages = AdditionalDocumnetArray.filter(doc => doc.ImageArray.length > 0);
                  if (documentsWithImages.length >= 2) {
                    AdditionalDocumnetArray.map((Item)=>{
                      if(Item.ImageArray.length > 0){
            // debugger

                        const formDataa = new FormData();
                        if(Item.typeName == "Other Documents") {
                          formDataa.append(
                            "userId", respo.data.data.id
                          );

                          formDataa.append(
                            "documentTypeId",Item.id
                          );

                          formDataa.append(
                            "type",Item.OtherDocumnetName
                          );

                          for (let i = 0; i < Item.ImageFileArray.length; i++) {
                            formDataa.append("documents", Item.ImageFileArray[i]);
                          }
                        }
                        else{
                          formDataa.append(
                            "userId", respo.data.data.id
                          );

                          formDataa.append(
                            "documentTypeId",Item.id
                          );

                          for (let i = 0; i < Item.ImageFileArray.length; i++) {
                            formDataa.append("documents", Item.ImageFileArray[i]);
                          }
                        }

                        ///////Update changes remaining//////////

                        console.log(formDataa, "formDataa");

                        const config = {
                          method: "POST",
                          url: CommonConstants.BASE_URL + "/uploadbusinessdocuments",
                          headers: { "Content-Type": "multipart/form-data" },
                          data: formDataa,
                        };

                        axios(config)
                          .then(function (response) {
                            if (response.data.status == true) {
                              setUpload_Document(true)
                              SummuryDocuments(true)
                              console.log(response.data.data, "UpdatedData");
                              GoNextStepBA();
                              setloadervalue(false);
                            }else{
                              setloadervalue(false)
                              StepBlank('')
                            }
                          })
                          .catch(function (error) {
                            // setloadervalue(false)
                            console.log(error)
                          });
                      }
                    })
                  }else{
                    setAdditionalIdTypePopupError(true)
                    StepBlank('')
                    setloadervalue(false)
                  }
                }else{
                  setloadervalue(false)
                  StepBlank('')
                }
              })
              .catch(function (error) {
                console.log(error);
                // setloadervalue(false)
              });
          }else{
            setAdditionalIdTypePopupError(true)
            StepBlank('')
            setloadervalue(false)
          }

          }
          else{
            StepBlank('')
            setIdTypePopupError(true)
          }
      }
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      StepBlank('')
    }
  };

  const [AuthorityName,setAuthorityName] = useState('')
  const [StateId,setStateId] = useState('')

  const [userData,setuserData] = useState([])
  // const [userData,setuserData] = useState(0)

  const IUserData= async()=>{
    await axios
      .post(CommonConstants.BASE_URL + "/getuserinfobyid", { id: R_ID }).then((response)=>{

        var IndividualData = response.data.data

        data2.IndidualFirstname= IndividualData?.fName
        data2.IndidualMiddlename= IndividualData?.mName
        data2.IndidualLastname= IndividualData?.lName
        data2.IndidualEmail= IndividualData?.email
        data2.IndidualMobileNumber= IndividualData?.phone

        data3.IndidualNationality= IndividualData?.userkycdetails?.nationality
        data3.IndidualStreetName= IndividualData?.userkycdetails?.streetName
        data3.IndidualCity= IndividualData?.userkycdetails?.suburb
        data3.IndidualState= IndividualData?.userkycdetails?.stateId
        data3.IndidualZip= IndividualData?.userkycdetails?.postalCode
        data3.IndidualOccupation= IndividualData?.userkycdetails?.occupationId
        data3.IndidualResidence= IndividualData?.userkycdetails?.isResidence == true ? "Yes" :"No"

        data4.IndidualIDType= IndividualData?.iddetails?.typeId
        data4.IndidualIDNumber= IndividualData?.iddetails?.documentNumber
        data4.IndidualCardNumber= IndividualData?.iddetails?.cardNumber
        data4.IndidualDOB= IndividualData?.iddetails?.dob
        data4.IndidualIDExpiry= IndividualData?.iddetails?.documentValidity
        data4.IndividualIDIssuingAuthority= IndividualData?.iddetails?.issuingAuthority
        // debugger
        document.getElementById("Indidual_Nationality").value = IndividualData?.userkycdetails?.nationality;
        document.getElementById("Individual_State").value = IndividualData?.userkycdetails?.stateId;
        document.getElementById("Individual_Occupation").value = IndividualData?.userkycdetails?.occupationId;
        document.getElementById("Individual_Residence").value = IndividualData?.userkycdetails?.isResidence == true ? "Yes" :"No";
        document.getElementById("Individual_idtype").value = IndividualData?.iddetails?.typeId;
        document.getElementById("Authorityname").value = IndividualData?.iddetails?.issuingAuthority;
        setAuthorityName(IndividualData?.iddetails?.issuingAuthority)
        setStateId(IndividualData?.userkycdetails?.stateId)

        setuserData(response.data.data)
        console.log(response.data.data)
      }).catch((err)=>{
        console.log(err)
      })
  }

  ///////////updatevalue/////////
  const UPDATEuserDataIndividual = async () => {
    // setloadervalue(true)
    const formData = new FormData();
    setloadervalue(true)

    formData.append(
      "user",
      `{
         "id":${R_ID},
         "roleId":${userData.roleId},
         "countryId":${userData.countryId},
         "refCodeId":"${userData.refCodeId}",
         "fName":"${document.getElementById("IndividualFirstname").value}",
         "mName":"${document.getElementById("IndividualMiddlename").value}",
         "lName":"${document.getElementById("IndividualLastname").value}",
         "phone":"${document.getElementById("IndividualMobileNumber").value}",
         "customerId":"${userData.customerId}",
         "businessName":"${userData.businessName}",
         "regNo":"${userData.regNo}",
         "regTimezone":"${AutoTimeZone}",
         "businessAddress":"${userData.businessAddress}",
         "phoneCode":"${userData.phoneCode}",
         "phoneVerifiedAt":"",
         "isEmailVerified":0,
         "emailVerifiedAt":"",
         "isDeleted":false,
         "isOCRVerfiedId":0,
         "email":"${document.getElementById("IndividualEmail").value}",
         "password":"${document.getElementById("IndividualPassword").value}",
         "digitalVerifiedLink": "${userData.digitalVerifiedLink}",
         "digitalVerifiedTransactionId": "${userData.digitalVerifiedTransactionId}",
         "isSignupCompleted" : false 
        }`
    );

    formData.append(
      'kycdetails',
      `{
        "id":${K_ID},
        "userId":${R_ID},
        "streetName":"${document.getElementById("Individual_Housename").value}",
        "stateId":${StateId},
        "countryId": "${userData.userkycdetails.countryId}" ,
        "nationality":"${document.getElementById("Indidual_Nationality").value}",
        "suburb":"${document.getElementById("Individual_kyccity").value}",
        "postalCode":"${document.getElementById("Individual_kyczipcode").value}",
        "verified":0,
        "occupationId":"${document.getElementById("Individual_Occupation").value}",
        "isResidence": ${document.getElementById("Individual_Residence").value === "Yes" ? true: false},
        "kycStatus":""
      }`
    );

    formData.append(
      "iddetails",
      `{
        "id":${I_ID},
        "userId":${R_ID},
        "typeId":"${document.getElementById("Individual_idtype").value}",
        "documentNumber":"${document.getElementById("Individual_id-number").value}",
        "cardNumber":"${document.getElementById("Individual_card-details").value}",
        "dob":"${document.getElementById("Individual_DOB-details").value}",
        "documentValidity":"${document.getElementById("Individual_IdExpire-details").value}",
        "issuingAuthority":"${document.getElementById("Authorityname").value}"
      }`
    );


    formData.append('isFromSignup', ExistVerifyDuplicate);
    formData.append('stepNo', 6);

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
          IUserData()
          setloadervalue(false)
          setExistVerifyDuplicate(false)
        }
      })
      .catch(function (error) {
        // setloadervalue(false)
      });
  };

  const CancleData = () =>{
    handleShow();
  }

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
        setIdtypes(response.data.data);
      }
    } catch (err) {
      // console.log(err)
    }
  };

  const currentDate = new Date(); // Current date
  const tomorrowDate = new Date(currentDate); // Create a new date object with the current date
  tomorrowDate.setDate(currentDate.getDate() + 1); // Add 1 day to the current date

  // If the new date's day is different from the expected day, it means we crossed the month boundary
  // In that case, move to the next month
  if (tomorrowDate.getDate() !== currentDate.getDate() + 1) {
    tomorrowDate.setMonth(currentDate.getMonth() + 1);
    tomorrowDate.setDate(1); // Set the day to the first day of the next month
  }

  if (tomorrowDate.getFullYear() !== currentDate.getFullYear()) {
    tomorrowDate.setFullYear(currentDate.getFullYear() + 1); // Move to the next year
    tomorrowDate.setMonth(0); // Set the month to January
    tomorrowDate.setDate(1); // Set the day to the first day of January
  }
  const formattedDate = `${tomorrowDate.getFullYear()}-${String(tomorrowDate.getMonth() + 1).padStart(2, '0')}-${String(tomorrowDate.getDate()).padStart(2, '0')}`;

  // Calculate the max date that can be selected
  const MaxDate1  = new Date();
  MaxDate1.setFullYear(MaxDate1.getFullYear() - 18);
  const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  const minDate = new Date(currentDate.getFullYear() - 100, 0, 1);
  const currentDateString = MaxDate1.toISOString().split('T')[0];


  return (
    <>
      <section>
        <div className="step6Welcome text-white text-center bolder my-4 py-3">
          Welcome to LegalRemit
        </div>
        <Container fluid>
        {loadervalue == true ? <Loader /> : ""}
          <Row>
            <Col className="col-lg-12 p-0">
              <div className="mt-3 pe-2 ps-2">
                <Row id="stepone6in1">
                  <Row>
                    <Col className="col-lg-12 p-0">
                      <div className="text-center">
                        <label className="text-center text-black mb-2">
                          Summary
                        </label>
                      </div>
                      <div className=" ms-2">
                        <Accordion
                          className="accordian1 indiviual-accordian"
                          defaultActiveKey="0"
                        >
                          <Accordion.Item eventKey="0" className="">
                            <Accordion.Header
                              className={`formcontrol ${
                                Editvalue == true
                                  ? "disableAccordian"
                                  : "enableAccordian"
                              }`}
                            >
                              User Details
                            </Accordion.Header>
                            <Accordion.Body>
                              <Row
                                id=""
                                className={`mt-3 mb-2 ${
                                  Editvalue == true ? "d-none" : "d-block"
                                }`}
                              >
                                <div className="d-flex justify-content-end ">
                                  <p
                                    className=" Editbtn6 text-center pointer"
                                  >
                                    You can edit these fields from profile section after login.
                                  </p>
                                </div>
                              </Row>

                              <Row
                                id=""
                                className={`mt-3 mb-2 ${
                                  Editvalue == true ? "d-block" : "d-none"
                                }`}
                              >
                                <div className="d-flex justify-content-end">
                                  <p
                                    className=" pointer pe-3 canclebtn6 normal "
                                    onClick={(e)=>{CancleData()}}//handleCancledata}
                                  >
                                    DISCARD
                                  </p>
                                  <p
                                    className=" pointer savebtn6 "
                                    onClick={(e)=>{saveIndividualUserDetails()}}
                                  >
                                    SAVE
                                  </p>
                                </div>
                              </Row>

                              <Form id="summary_Individual_Step6_userDetaul">
                                <Row className="d-flex justify-content-center">
                                  <Row className="mb-3 respoChildFooter">
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        First Name
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="p-0 left-inner-addon input-container"
                                      >
                                        <i className="successText mainone fa fa-user "></i>
                                        <Form.Control
                                          type="text"
                                          id="IndividualFirstname"
                                          defaultValue={data2.IndidualFirstname}
                                          placeholder="First Name"
                                          className={`formcontrol required ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                          onChange={(e)=>{
                                            var inputValue = e.target.value
                                            var Alfabet = ''
                                            var sanitizedValue = ''

                                            if (inputValue) {
                                              const regex = /[^a-zA-Z\s]/g;
                                              Alfabet = inputValue.replace(regex, '');
                                              const words = Alfabet.split(' ');

                                            sanitizedValue = words
                                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                              .join(' ');
                                            }
                                            document.getElementById('IndividualFirstname').value = sanitizedValue
                                          }}
                                        />
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Enter First Name
                                        </small>
                                      </Form.Group>
                                    </Col>
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        Middle Name
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="p-0 left-inner-addon input-container"
                                      >
                                        <i className="successText mainone fa fa-user "></i>
                                        <Form.Control
                                          type="text"
                                          id="IndividualMiddlename"
                                          defaultValue={
                                            data2.IndidualMiddlename
                                          }
                                          placeholder="Middle Name"
                                          className={`formcontrol ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                          onChange={(e)=>{
                                            var inputValue = e.target.value
                                            var Alfabet = ''
                                            var sanitizedValue = ''

                                            if (inputValue) {
                                              const regex = /[^a-zA-Z\s]/g;
                                              Alfabet = inputValue.replace(regex, '');
                                              const words = Alfabet.split(' ');

                                            sanitizedValue = words
                                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                              .join(' ');
                                            }
                                            document.getElementById('IndividualMiddlename').value = sanitizedValue
                                          }}
                                        />
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Enter Middle Name
                                        </small>
                                      </Form.Group>
                                    </Col>
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        Last Name
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="p-0 left-inner-addon input-container"
                                      >
                                        <i className="successText mainone fa fa-user "></i>
                                        <Form.Control
                                          type="text"
                                          id="IndividualLastname"
                                          defaultValue={data2.IndidualLastname}
                                          placeholder="Last Name"
                                          className={`formcontrol required ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                          onChange={(e)=>{
                                            var inputValue = e.target.value
                                            var Alfabet = ''
                                            var sanitizedValue = ''

                                            if (inputValue) {
                                              const regex = /[^a-zA-Z\s]/g;
                                              Alfabet = inputValue.replace(regex, '');
                                              const words = Alfabet.split(' ');

                                            sanitizedValue = words
                                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                              .join(' ');
                                            }
                                            document.getElementById('IndividualLastname').value = sanitizedValue
                                          }}
                                        />
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Enter Last Name
                                        </small>
                                      </Form.Group>
                                    </Col>
                                  </Row>

                                  <Row className="mb-3 respoChildFooter">
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        Email
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container p-0"
                                      >
                                        <i className="successText mainone fa fa-envelope "></i>
                                        <Form.Control
                                          type="email"
                                          id="IndividualEmail"
                                          defaultValue={data2.IndidualEmail}
                                          onBlur={(e) => data2.IndidualEmail != e.target.value ? ExistEmailVerify(e):setExistEmail(false)}
                                          placeholder="Email"
                                          autoComplete="off"
                                          // autoComplete="new-email"
                                          className={`formcontrol email required ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                        />

                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Enter Valid Email
                                        </small>

                                        <small
                                          className={`text-danger  ms-2 error_font  ${
                                            ExistEmail === true
                                              ? "d-block"
                                              : "d-none"
                                          }`}
                                        >
                                          Email Already Exist
                                        </small>

                                      </Form.Group>
                                    </Col>

                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        Mobile
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container p-0"
                                      >
                                        <div className="d-flex">
                                          <i className="successText mainone fa fa-mobile "></i>
                                          <Form.Control
                                            type="text"
                                            // name="IndidualMobileNumber"
                                            // onChange={handleDataStep2}
                                            // onBlur={AgenthandlemobileNo}
                                            defaultValue={CPhoneCode}
                                            placeholder="Mobile"
                                            readOnly
                                            className={`inputphonecode formcontroll1 form-input ${
                                              ExistMobile === true
                                                ? "border-danger"
                                                : ""
                                            }`}
                                          />
                                          <Form.Control
                                            type="text"
                                            id="IndividualMobileNumber"
                                            defaultValue={
                                              data2.IndidualMobileNumber
                                            }
                                            onChange={(e) => {

                                                let value = e.target.value;
                                                const newValue = value.replace(/[^0-9]/g, '');
                                                document.getElementById("IndividualMobileNumber").value = newValue
                                                mobilevalidationchanges(newValue);

                                            }}
                                            onBlur={(e) => data2.IndidualMobileNumber != e.target.value ? IndividualhandlemobileNo(e) :setExistMobile(false)}
                                            // value={data2.MobileNumber}
                                            readOnly
                                            placeholder="Mobile"
                                            className={`inputphonenum inputmobile formcontroll2 required phone ${
                                              Editvalue == true
                                                ? "enableInput"
                                                : "disableInput"
                                            }`}
                                          />
                                        </div>
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Enter Valid Mobile Number
                                        </small>
                                        <small
                                          className={`text-danger  ms-2 error_font  ${
                                            ExistMobile === true
                                              ? "d-block"
                                              : "d-none"
                                          }`}
                                        >
                                          Mobile Already Exist
                                        </small>
                                        <small
                                          className={`text-danger  ms-2 error_font  ${
                                            validationMobile === true
                                              ? "d-block"
                                              : "d-none"
                                          }`}
                                        >
                                          This mobile Number must start with 04
                                          or 4 and have 10 or 9 digits
                                          respectively
                                        </small>
                                      </Form.Group>
                                    </Col>
                                  </Row>

                                  <Row className="mb-3 respoChildFooter">
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        Password
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container p-0"
                                      >
                                        <i className="successText mainone fa fa-lock "></i>
                                        <Form.Control
                                          type="password"
                                          id="IndividualPassword"
                                          defaultValue={data2.Indidualpassword}
                                            readOnly
                                            placeholder="Password"
                                          className={`formcontrol required password ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                        />
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Enter The Password
                                        </small>
                                        <small className="responsiveFontLarge  d-none text-danger password_error_message ms-2 error_message">
                                          It is Invalid Password
                                        </small>
                                      </Form.Group>
                                    </Col>
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        Confirm Password
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container p-0"
                                      >
                                        <i className="successText mainone fa fa-lock "></i>
                                        <Form.Control
                                          type="password"
                                          id="IndividualCPassword"
                                          defaultValue={data2.IndidualCpassword}
                                            readOnly
                                            placeholder="Confirm Password"
                                          className={`formcontrol required cpassword ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                        />
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Enter The Confirm Password
                                        </small>
                                        <small className="responsiveFontLarge  d-none text-danger error_message_matchpass ms-2 error_message">
                                          Password and confirm password are not
                                          matching
                                        </small>
                                      </Form.Group>
                                    </Col>
                                  </Row>
                                </Row>
                              </Form>
                            </Accordion.Body>
                          </Accordion.Item>

                          <Accordion.Item eventKey="1" id="accordianOne">
                            <Accordion.Header
                              className={`formcontrol ${
                                Editvalue == true
                                  ? "disableAccordian"
                                  : "enableAccordian"
                              }`}
                            >
                              KYC Details
                            </Accordion.Header>
                            <Accordion.Body>
                              <Row
                                id="Iedit1"
                                className={`mt-3 ${
                                  Editvalue == true ? "d-none" : "d-block"
                                }`}
                              >
                                <div className="d-flex justify-content-end ">
                                  <p
                                    className=" Editbtn6 text-center pointer"
                                    onClick={EditIndividualKYCUserDetails}
                                  >
                                    <i className="fas fa-edit"></i> Edit
                                  </p>
                                </div>
                              </Row>

                              <Row
                                id="Icancle1"
                                className={`mt-3 ${
                                  Editvalue == true ? "d-block" : "d-none"
                                }`}
                              >
                                <div className="d-flex justify-content-end">
                                  <p
                                    className=" pointer pe-3 canclebtn6 normal"
                                    onClick={(e)=>{CancleData()}}
                                  >
                                    Discard
                                  </p>
                                  <p
                                    className=" pointer savebtn6 "
                                    onClick={(e)=>{saveIndividualKYCDetails()}}
                                  >
                                    SAVE
                                  </p>
                                </div>
                              </Row>

                              <Form id="summary_Individual_Step6_kycDetail">
                                <Row
                                  id="stepone3in1"
                                  className="d-flex justify-content-center"
                                >
                                  <Row className="mb-3">
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        Nationality
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container "
                                      >
                                        <i className="orangeText mainStep3 	fa fa-flag "></i>
                                        <Form.Select
                                          onChange={changeCountryName}
                                          className={`orange-border-step3 required mainStep3SelectOrange ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                          id="Indidual_Nationality"
                                          name="IndidualNationality"
                                        >
                                          <option value="">
                                            Select Country
                                          </option>
                                          {Nationality &&
                                            Nationality.map(
                                              (NationalityName, index) => {
                                                // setCountryId()
                                                return (
                                                  <option key={index}
                                                    value={
                                                      NationalityName.nationality
                                                    }
                                                  >
                                                    {
                                                      NationalityName.nationality
                                                    }
                                                  </option>
                                                );
                                              }
                                            )}
                                        </Form.Select>
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Select Country
                                        </small>
                                      </Form.Group>
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        House No & Street Name
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container "
                                      >
                                        <i className="orangeText mainStep3 	fa fa-home "></i>
                                        <Form.Control
                                          type="text"
                                          ref={autocompleteRef}
                                          id="Individual_Housename"
                                          defaultValue={
                                            data3.IndidualStreetName
                                          }
                                          placeholder="House No & Street Name"
                                          className={`formControlStep3 orangeBorder required ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                        />
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Enter House No & Street Name
                                        </small>
                                      </Form.Group>
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        Suburb/City
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container "
                                      >
                                        <i className="orangeText mainStep3 fa fa-map-marker "></i>
                                        <Form.Control
                                          type="text"
                                          id="Individual_kyccity"
                                          defaultValue={data3.IndidualCity}
                                          placeholder="Suburb/City"
                                          className={`formControlStep3 required orangeBorder ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                          onChange={(e)=>{
                                            var inputValue = e.target.value
                                            var Alfabet = ''
                                            var sanitizedValue = ''

                                            if (inputValue) {
                                              const regex = /[^a-zA-Z\s]/g;
                                              Alfabet = inputValue.replace(regex, '');
                                              const words = Alfabet.split(' ');

                                            sanitizedValue = words
                                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                              .join(' ');
                                            }
                                            document.getElementById('Individual_kyccity').value = sanitizedValue
                                          }}
                                        />
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Enter Suburb/City
                                        </small>
                                      </Form.Group>
                                    </Col>
                                  </Row>

                                  <Row className="mb-3 respoChildFooter">
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        State
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container "
                                      >
                                        <i className="orangeText mainStep3 fa fa-map-marker "></i>
                                        {/* <Form.Select id="Individual_State" onChange={handleIndividual_StateChange} className={`mainStep3SelectOrange ${Editvalue == true ? 'enableInput' : 'disableInput'}`} defaultValue={data3.IndidualState} >
                                                                                    <option>State</option>
                                                                                    <option>Gujarat</option>
                                                                                    <option>Delhi</option>
                                                                                </Form.Select> */}
                                        <Form.Select
                                          className={`orangeBorder  required mainStep3SelectOrange ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                          name="IndidualState"
                                          id="Individual_State"
                                          value={StateId}
                                          onChange={changeStateName}
                                        >
                                          <option value="">State</option>
                                          {States &&
                                            States.map((States, index) => {
                                              return (
                                                <>
                                                  <option key={index} value={States.id}>
                                                    {States.name}
                                                  </option>
                                                </>
                                              );
                                            })}
                                        </Form.Select>
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Enter State
                                        </small>
                                      </Form.Group>
                                    </Col>
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        Postal / Zip Code
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container "
                                      >
                                        <i className="orangeText mainStep3 fa fa fa-envelope "></i>
                                        <Form.Control
                                          type="text"
                                          id="Individual_kyczipcode"
                                          defaultValue={data3.IndidualZip}
                                          placeholder="Postal / Zip Code"
                                          className={`formControlStep3 required orangeBorder number ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                        />
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Enter The Postal / Zip Code
                                        </small>
                                        <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
                                          Please Enter Valid number
                                        </small>
                                      </Form.Group>
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        Occupation
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container "
                                      >
                                        <i className="orangeText mainStep3 fa fa-briefcase "></i>
                                        <Form.Select
                                          id="Individual_Occupation"
                                          onChange={
                                            handleIndividual_OccupationChange
                                          }
                                          className={`mainStep3SelectOrange required ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                          defaultValue={
                                            data3.IndidualOccupation
                                          }
                                        >
                                          <option value="">Occupation</option>
                                          {Occupation &&
                                            Occupation.map(
                                              (occupation, index) => {
                                                return (
                                                  <>
                                                    <option key={index}
                                                      value={occupation.id}
                                                    >
                                                      {occupation.name}
                                                    </option>
                                                  </>
                                                );
                                              }
                                            )}
                                        </Form.Select>
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please Select Occupation
                                        </small>
                                        {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                      </Form.Group>
                                    </Col>
                                  </Row>

                                  <Row className="mb-3">
                                    <Col>
                                      <label className="normal ms-3 fs-6 mb-2">
                                        Is Residence of ({Countrydata.CountryName})
                                        {/* {userData?.userkycdetails?.countryName}) */}
                                      </label>
                                      <Form.Group
                                        as={Col}
                                        className="left-inner-addon input-container "
                                      >
                                        <i className="orangeText mainStep3 fa fa-map-marker "></i>
                                        <Form.Select
                                          id="Individual_Residence"
                                          onChange={
                                            handleIndividual_ResidenceChange
                                          }
                                          className={`mainStep3SelectOrange required ${
                                            Editvalue == true
                                              ? "enableInput"
                                              : "disableInput"
                                          }`}
                                        >
                                          <option value="">
                                            Is Residence of{" "}({Countrydata.CountryName})
                                            {/* {userData?.userkycdetails?.countryName} */}
                                          </option>
                                          <option value="Yes">Yes</option>
                                          <option value="No">No</option>
                                        </Form.Select>
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                          Please select If Residence of{" "}({Countrydata.CountryName})
                                          {/* {userData?.userkycdetails?.countryName} */}
                                        </small>
                                        {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                      </Form.Group>
                                    </Col>
                                  </Row>
                                </Row>
                              </Form>
                            </Accordion.Body>
                          </Accordion.Item>

                          <Accordion.Item eventKey="2">
                            <Accordion.Header
                              className={`formcontrol ${
                                Editvalue == true
                                  ? "disableAccordian"
                                  : "enableAccordian"
                              }`}
                            >
                              ID Details
                            </Accordion.Header>
                            <Accordion.Body>
                              <Row
                                id="Iedit2"
                                className={`mt-3 ${
                                  Editvalue == true ? "d-none" : "d-block"
                                }`}
                              >
                                <div className="d-flex justify-content-end ">
                                  {/* <i className="fas fa-edit pt-1 me-1 "></i> */}
                                  {/* <p  className=" pointer" onClick={EditBussinessUserDetails}>Edit</p> */}
                                  <p
                                    className=" Editbtn6 text-center pointer"
                                    onClick={()=>{setExistVerifyDuplicate(true); EditIndividualIDDetails();}}
                                  >
                                    <i className="fas fa-edit"></i> Edit
                                  </p>
                                </div>
                              </Row>

                              <Row
                                id="Icancle2"
                                className={`mt-3 ${
                                  Editvalue == true ? "d-block" : "d-none"
                                }`}
                              >
                                <div className="d-flex justify-content-end">
                                  <p
                                    className=" pointer pe-3 canclebtn6 normal"
                                    onClick={(e)=>{CancleData()}}
                                  >
                                    DISCARD
                                  </p>
                                  <p
                                    className=" pointer savebtn6"
                                    onClick={(e)=>{saveIndividualIDDetails()}}
                                  >
                                    SAVE
                                  </p>
                                </div>
                              </Row>

                              <Row>
                                <Form>
                                  <Row className="d-flex justify-content-center">
                                    <Row className="mb-3 ">
                                      <Col>
                                        <label className="normal ms-3 fs-6 mb-2">
                                          ID Type
                                        </label>
                                        <Form.Group
                                          as={Col}
                                          className="left-inner-addon input-container "
                                        >
                                          <i className="blueText mainStep4 fa fa-id-card "></i>
                                          <Form.Select
                                            className={`mainStep4Select ${
                                              Editvalue == true
                                                ? "enableInput"
                                                : "disableInput"
                                            }`}
                                            onChange={
                                              handleIndividual_idtypeChange
                                            }
                                            id="Individual_idtype"
                                            name="IndividualIdDetails"
                                          >
                                            <option value="">ID Type</option>
                                            {
                                              Idtypes && Idtypes.map((ID,Index)=>{
                                                return(
                                                  <>
                                                    <option key={Index} value={ID.id}>{ID.name}</option>
                                                  </>
                                                )
                                              })
                                            }
                                            {/* <option value="Australian Drivers License">Australian Drivers License </option> */}
                                          </Form.Select>
                                          {/* {// console.log(data4.IndidualIDType, "sss")} */}
                                        </Form.Group>
                                      </Col>
                                    </Row>

                                    <Row className="mb-3 respoChildFooter">
                                      <Col>
                                        <label className="normal ms-3 fs-6 mb-2">
                                          ID Number
                                        </label>
                                        <Form.Group
                                          as={Col}
                                          className="left-inner-addon input-container "
                                        >
                                          <i className="blueText mainStep4 fa fa-id-card "></i>
                                          <Form.Control
                                            type="text"
                                            defaultValue={
                                              data4.IndidualIDNumber
                                            }
                                            id="Individual_id-number"
                                            name="IndividualIdDetails"
                                            placeholder="ID Number"
                                            className={`formControlStep4 ${
                                              Editvalue == true
                                                ? "enableInput"
                                                : "disableInput"
                                            }`}
                                            onChange={(e)=>{
                                              let value = e.target.value;
                                              const newValue = value.replace(/[^0-9]/g, '');
                                              document.getElementById("Individual_id-number").value = newValue
                                            }}
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col>
                                        <label className="normal ms-3 fs-6 mb-2">
                                          Card Number
                                        </label>
                                        <Form.Group
                                          as={Col}
                                          className="left-inner-addon input-container "
                                        >
                                          <i className="blueText mainStep4 fa fa-id-card "></i>
                                          <Form.Control
                                            type="text"
                                            defaultValue={
                                              data4.IndidualCardNumber
                                            }
                                            id="Individual_card-details"
                                            name="IndividualIdDetails"
                                            placeholder="Card Number"
                                            className={`formControlStep4 ${
                                              Editvalue == true
                                                ? "enableInput"
                                                : "disableInput"
                                            }`}
                                            onChange={(e)=>{
                                              let value = e.target.value;
                                              const newValue = value.replace(/[^0-9]/g, '');
                                              document.getElementById("Individual_card-details").value = newValue
                                            }}
                                          />
                                        </Form.Group>
                                      </Col>
                                    </Row>

                                    <Row className="mb-3 respoChildFooter">
                                      <Col>
                                        <label className="normal ms-3 fs-6 mb-2">
                                          Date of Birth
                                        </label>
                                        <Form.Group
                                          as={Col}
                                          className="left-inner-addon input-container "
                                        >
                                          <i className="blueText mainStep4 fa fa-calendar "></i>
                                          <Form.Control
                                            type="date"
                                            defaultValue={data4.IndidualDOB}
                                            id="Individual_DOB-details"
                                            name="IndividualIdDetails"
                                            max={maxDate.toISOString().split('T')[0]}
                                            min={minDate.toISOString().split('T')[0]}
                                            placeholder="Date of Birth"
                                            className={`formControlStep4 ${
                                              Editvalue == true
                                                ? "enableInput"
                                                : "disableInput"
                                            }`}
                                          />
                                        </Form.Group>
                                      </Col>
                                      <Col>
                                        <label className="normal ms-3 fs-6 mb-2">
                                          Date of ID Expiry
                                        </label>
                                        <Form.Group
                                          as={Col}
                                          className="left-inner-addon input-container "
                                        >
                                          <i className="blueText mainStep4 fa fa-calendar"></i>
                                          <Form.Control
                                            type="date"
                                            defaultValue={
                                              data4.IndidualIDExpiry
                                            }
                                            id="Individual_IdExpire-details"
                                            name="IndividualIdDetails"
                                            min={formattedDate}
                                            placeholder="Date of ID Expiry"
                                            className={`formControlStep4 ${
                                              Editvalue == true
                                                ? "enableInput"
                                                : "disableInput"
                                            }`}
                                          />
                                        </Form.Group>
                                      </Col>
                                    </Row>

                                    <Row className="mb-3">
                                      <Col>
                                        <label className="normal ms-3 fs-6 mb-2">
                                          ID Issuing Authority
                                        </label>
                                        <Form.Group
                                          as={Col}
                                          className="left-inner-addon input-container "
                                        >
                                          <i className="blueText mainStep4 fas fa-landmark"></i>
                                          <Form.Select
                                            className={`mainStep4Select ${
                                              Editvalue == true
                                                ? "enableInput"
                                                : "disableInput"
                                            }`}
                                            id="Authorityname"
                                            value={AuthorityName}
                                            onChange={
                                              handleIndividualIDIssuingAuthorityChange
                                            }
                                            name="IndividualIdDetails"
                                          >
                                            <option value="">
                                              ID Issuing Authority
                                            </option>
                                            {IdAuthority &&
                                              IdAuthority.map((IdAuthorityName, index) => {
                                                return (
                                                  <option key={index} value={IdAuthorityName.authorityName}>
                                                    {IdAuthorityName.authorityName}
                                                  </option>
                                                );
                                              })}
                                          </Form.Select>
                                          {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                        </Form.Group>
                                      </Col>
                                    </Row>
                                  </Row>
                                </Form>
                              </Row>
                            </Accordion.Body>
                          </Accordion.Item>

                          <Accordion.Item eventKey="3">
                            <Accordion.Header
                              className={`formcontrol ${
                                Editvalue == true
                                  ? "disableAccordian"
                                  : "enableAccordian"
                              }`}
                            >
                              Documents
                            </Accordion.Header>
                            <Accordion.Body>
                              {/* <Row id="Iedit3" className="my-3 editt">
                                <div className="d-flex justify-content-end ">
                                  <p
                                    className=" Editbtn6 text-center pointer"
                                    onClick={EditIndividualUserDetails}
                                  >
                                    <i class="fas fa-edit"></i> Edit
                                  </p>
                                </div>
                              </Row> */}

                              {/* <Row id="Icancle3" className="my-3 saveandcancle">
                                <div className="d-flex justify-content-end">
                                  <p
                                    className=" pointer pe-3 fs canclebtn6 normal"
                                  >
                                    Discard
                                  </p>
                                  <p
                                    className=" pointer savebtn6 fs-5"
                                  >
                                    SAVE
                                  </p>
                                </div>
                              </Row> */}
                              {/* <Row>
                              <div className="bolder ms-2 text-black text-center mb-3">
                                Uploaded Document ({UserIdType})
                              </div>
                                <Col>
                                  <div className="bolder ms-2 text-black text-center responsiveFontLarge">
                                    ID front view
                                  </div>
                                  <div>
                                    {DataImage &&
                                      DataImage.map((image, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="image position relative"
                                          >
                                            <div className="img-box effect-image-1 ">
                                              <img
                                                src={image}
                                                height="100"
                                                width="200"
                                                className="d-flex justify-content-center hoverView uploadedImage roundedCorner"
                                                alt="upload"
                                              />
                                              <div className="overlay simple-overlay roundedCorner">
                                                <div className="mainBtnClose"></div>
                                                <div className="cta"></div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </div>
                                </Col>

                                <Col className={UserIdType == 'Passport' ? 'd-none' : 'd-block'}>
                                  <div className="bolder ms-2 text-black responsiveFontLarge">
                                    ID back view
                                  </div>
                                  <div className="l">
                                    {DataImageBack &&
                                      DataImageBack.map((image, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="image position relative"
                                          >
                                            <div className="img-box effect-image-1">
                                              <img
                                                src={image}
                                                height="100"
                                                width="200"
                                                className="hoverView uploadedImage roundedCorner"
                                                alt="upload"
                                              />
                                              <div className="overlay simple-overlay roundedCorner">
                                                <div className="mainBtnClose"></div>
                                                <div className="cta"></div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </div>
                                </Col>
                              </Row> */}
                              <Row className="border-bottom pb-3">
                          <div className="bolder ms-2 text-black text-center mb-3">
                            Uploaded Document ({UserIdType})
                          </div>
                          <Col>
                            <div className="bolder ms-2 text-black text-center">
                              ID Front view
                            </div>
                            <div className="d-flex">
                              {userData &&
                                userData?.idDocuments?.map((image, index) => {
                                  return (
                                    image.isFront == true && image.isActive == true ?
                                    <div
                                      key={index}
                                      className="image position relative"
                                    >
                                        {".pdf".includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf("."))) || ".doc".includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf("."))) ? (
                                          <div className="pdf-logo">
                                            <img
                                              src={PdfLogo}
                                              className="hoverView uploadedImage roundedCorner"
                                              alt="pdf"
                                            />
                                          </div>
                                        ) : (
                                          <>
                                          <img
                                            src={image.filePath}
                                            height="100"
                                            width="200"
                                            className="hoverView uploadedImage roundedCorner"
                                            alt="upload"
                                          />
                                          </>
                                        )}
                                    </div>
                                    :
                                    ""
                                  );
                                })}
                            </div>
                          </Col>

                          <Col className={UserIdType == 'Passport' ? 'd-none' : 'd-block'}>
                            <div className="bolder ms-2 text-black text-center">
                              ID Back view
                            </div>
                            <div className="d-flex">
                              {userData &&
                                userData?.idDocuments?.map((image, index) => {
                                  return (
                                    image.isBack == true && image.isActive == true ?
                                    <div
                                      key={index}
                                      className="image position relative"
                                    >
                                        {".pdf".includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf("."))) || ".doc".includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf("."))) ? (
                                          <div className="pdf-logo">
                                            <img
                                              src={PdfLogo}
                                              className="hoverView uploadedImage roundedCorner"
                                              alt="pdf"
                                            />
                                          </div>
                                        ) : (
                                          <>
                                          <img
                                            src={image.filePath}
                                            height="100"
                                            width="200"
                                            className="hoverView uploadedImage roundedCorner"
                                            alt="upload"
                                          />
                                          </>
                                        )}
                                    </div>
                                    :
                                    ""
                                  );
                                })}
                            </div>
                          </Col>
                        </Row>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </Col>
                  </Row>
                </Row>

                <Row id="steptwo6in2">
                  <Form id="">
                    <Row className="d-flex m-auto">
                      <Col className="col-lg-12 d-flex">
                        <Col className="pe-2">
                          <BusinessUploadFiles
                            imageData={imageData}
                            IdType={UserIdType}
                            CountryId={CountryID}
                            UploadDocument={Upload_Document}
                            Update_Step={UpdateStep}
                            AdditionalDocument={handleAdditionalDocument}
                            ></BusinessUploadFiles>
                        </Col>
                      </Col>
                    </Row>
                  </Form>
                </Row>

                <Row id="stepthree6in3">
                  <Form id="Agent_Document_Uploading_Step6">
                    <Row className="d-flex m-auto">
                      <Col className="col-lg-12 d-flex">
                        <Col className="pe-2">
                          <AgentUploadFiles
                            imageData={imageData2}
                            IdType={UserIdType}
                            CountryId={CountryID}
                            Update_Step={UpdateStep}
                            UploadDocument={Upload_Document}
                            AdditionalDocument={handleAdditionalDocument}
                          ></AgentUploadFiles>
                        </Col>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Modal show={show} onHide={handleClose} className="savemodal">
        <Modal.Header className="d-flex align-items-center" closeButton>
          <Modal.Title>
            <small className="responsiveFontLarge  text-black bolder mb-0">
              Confirm changes
            </small>
          </Modal.Title>
        </Modal.Header>
        <Row className="text-center d-flex justify-content-center">
          <Col className="col">
            <hr></hr>
          </Col>
        </Row>
        <Modal.Body>
          <div className="text-center mb-4">
            <small className="responsiveFontLarge  text-black text-center normal ">
              Are you sure you wish to save the changes? Please take a moment to review and confirm that the details entered are accurate.
            </small>
          </div>
        </Modal.Body>
        <div>
          <Container className="modal-body">
            <Row className="align-items-center justify-content-evenly pb-2">
              <Col className="col-lg-4 text-center">
                <Button
                    className=" border-0 bg-white pointer roundedCorner upparcase bolder maroonText"
                    variant="primary"
                    onClick={(e) => {
                      setExistVerifyDuplicate(false);
                      handleCancledata(e);
                    }}
                  >
                    DISCARD
                  </Button>
                {/* <p className="maroonText mb-0 pointer" onClick={(e)=>{handleCancledata()}}>
                  DISCARD
                </p> */}
              </Col>
              <Col className="col-lg-4  text-center">
                <Button
                  className="maroonButton border-0 roundedCorner upparcase bolder"
                  variant="primary"
                  onClick={(e)=>{handleSaveClose()}}
                >
                  SAVE
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal>

      <ModalComponent
        show={IdTypePopupError}
        title11={"Id Details Document Upload Required"}
        onHide={() => setIdTypePopupError(false)}
      />

      <ModalComponent
        show={AdditionalIdTypePopupError}
        title11={"Atleast 2 Document Details Upload Required"}
        onHide={() => setAdditionalIdTypePopupError(false)}
      />

      {/* <Modal show={show} onHide={handleClose} className="savemodal">
        <Modal.Header className="d-flex align-items-center" closeButton>
          <Modal.Title>
            <small className="responsiveFontLarge  text-black bolder mb-0">
              Confirm changes
            </small>
          </Modal.Title>
        </Modal.Header>
        <Row className="text-center d-flex justify-content-center">
          <Col className="col">
            <hr></hr>
          </Col>
        </Row>
        <Modal.Body>
          <div className="text-center mb-4">
            <small className="responsiveFontLarge  text-black text-center normal ">
              You are about to leave this page. Do you want to save changes
              before leaving this page ?
            </small>
          </div>
        </Modal.Body>
        <div>
          <Container className="modal-body">
            <Row className="align-items-center justify-content-evenly pb-2">
              <Col className="col-lg-4 text-center">
                <p className="maroonText mb-0 " onClick={CanclePopup}>
                  DISCARD
                </p>
              </Col>
              <Col className="col-lg-4  text-center">
                <Button
                  className="maroonButton border-0 roundedCorner upparcase bolder"
                  variant="primary"
                  onClick={handleSaveClose}
                >
                  SAVE
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal> */}

      {/* <Modal show={show} onHide={handleClose} className="savemodal">
        <Modal.Header className="d-flex align-items-center" closeButton>
          <Modal.Title>
            <small className="responsiveFontLarge  text-black bolder mb-0">
              Confirm changes
            </small>
          </Modal.Title>
        </Modal.Header>
        <Row className="text-center d-flex justify-content-center">
          <Col className="col">
            <hr></hr>
          </Col>
        </Row>
        <Modal.Body>
          <div className="text-center mb-4">
            <small className="responsiveFontLarge  text-black text-center normal ">
              You are about to leave this page. Do you want to save changes
              before leaving this page ?
            </small>
          </div>
        </Modal.Body>
        <div>
          <Container className="modal-body">
            <Row className="align-items-center justify-content-evenly pb-2">
              <Col className="col-lg-4 text-center">
                <p className="maroonText mb-0 " onClick={CanclePopup}>
                  DISCARD
                </p>
              </Col>
              <Col className="col-lg-4  text-center">
                <Button
                  className="maroonButton border-0 roundedCorner upparcase bolder"
                  variant="primary"
                  onClick={handleSaveClose}
                >
                  SAVE
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </Modal> */}
    </>
  );
}
