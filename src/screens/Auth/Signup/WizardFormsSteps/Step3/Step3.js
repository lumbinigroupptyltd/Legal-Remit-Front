import React, { useContext, useState, useEffect } from "react";
import "./Step3.scss";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../../../../Helpers/CountryDropdown/flags.css";
import ReactFlagsSelect from "react-flags-select";
import Modal from "react-bootstrap/Modal";
import OtpInput from "react-otp-input";
import userContext from "../../Signupdata/Usecontext";
import axios from "axios";
import { CommonConstants } from "../../../../../Constants/common.constants";
import Autocomplete from "react-google-autocomplete";
import GoogleComponent from "react-google-autocomplete";
import GoogleAutocomplete from "../../../../Helpers/GoogleAutocomplete/Autocomplete";
import Select from "react-select";
import Loader from '../../../../Loader/Loader';
const validator = require("../../../../../assets/js/validator");

export default function Step3({
  Name,
  StepOfivepopup,
  activestepkey,
  B_A_activestepkey,
  handleid,
  R_ID,
  B_ID,
  K_ID,
  I_ID,
  UpdateStep,
  GoNextStep,
  GoNextStepBA,
  StepBlank,
  DirectorForms,
  ShareholderForms
}) {
  // const [Oshow, setOShow] = useState(false);

  // const handleOClose = () => setOShow(false);
  // const handleOShow = () => setOShow(StepOfivepopup);

  const [select, setSelect] = useState("AU");
  const onSelect = (code) => setSelect(code);
  const [loadervalue, setloadervalue]=useState(false)
  const [FormPopup,setFormPopup] = useState(false)
  const [ShareholderFormPopup,setShareholderFormPopup] = useState(false)
  const [number, setNumber] = useState(1);
  const [number2, setNumber2] = useState(0);

  // console.log(number2,"Number")

  const [selectIndKycStep3, setSelectIndKycStep3] = useState("AU");
  const onSelectIndKycStep3 = (code) => setSelectIndKycStep3(code);
  const[Validnationality,setValidnationality] = useState('0')
  const[ValidOccupation,setValidOccupation] = useState('0')
  const[ValidCountryofBusiness,setValidCountryofBusiness] = useState('0')
  const[Valid,setValid] = useState(false)

  const [numberOfForms, setNumberOfForms] = useState(1);
  const [formData, setFormData] = useState([]);

  const [numberOfForms2, setNumberOfForms2] = useState(0);
  const [formData2, setFormData2] = useState([]);
  const [selectBusinessBusinessStep3, setSelectBusinessBusinessStep3] =
    useState("AU");
  const onSelectBusinessBusinessStep3 = (code) =>
    setSelectBusinessBusinessStep3(code);

  const [selectAgentBusinessStep3A, setSelectAgentBusinessStep3A] =
    useState("AU");
  const onSelectAgentBusinessStep3A = (code) =>
    setSelectAgentBusinessStep3A(code);

  const [selectAgentBusinessStep3B, setSelectAgentBusinessStep3B] =
    useState("AU");
  const onSelectAgentBusinessStep3B = (code) =>
    setSelectAgentBusinessStep3B(code);

  const { Countrydata,data2 } = useContext(userContext);
  const [inputState,setinputState] = useState('')
  
  const [inputFields, setInputFields] = useState([{ Director_Fullname: "" , Director_Email: "" , Director_Mobile: ""}]);
  const [validationMobile, setvalidationMobile] = useState(false);


  const [step3value, setstep3value] = useState({
    IndidualNationality: "",
    IndidualStreetName: "",
    IndidualCity: "",
    IndidualState: "",
    IndidualZip: "",
    IndidualOccupation: "",
    IndidualResidence: "",

    Business_CompanyType: "",
    Business_No_of_employees: "",
    Business_No_of_directors: "",
    Business_No_of_Shareholders: "",
    Business_Industry_type: "",
    Business_Target_Market: "", //--
    Business_sending_currency_per_year: "",
    Business_Expected_transaction_per_year: "",
    Business_Website: "",

    Agent_Business_Name: "",
    Agent_Registration_No: "",
    Agent_Country_of_Business_Registration: "", //---
    Agent_Address_of_Business: "",
    Agent_Target_Market: "", //----
    Agent_current_business_year: "", //--------
    Agent_sending_currency_per_year: "",
    Agent_Expected_transaction_per_year: "",
    Agent_Website: "",
  });

  // console.log(step3value,"step3value")
  const { setData3 } = useContext(userContext);
  const { data3 } = useContext(userContext);

  const handleDataStep3 = (e) => {
    const { name, value } = e.target;
    setstep3value((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDynamiForm =(event)=>{
    const inputValue = event.target.value.replace('.', '');
    // const 
    if (inputValue === '' || (parseInt(inputValue) >= 1 && parseInt(inputValue) <= 10)) {
      setNumber(inputValue); // Update the state with the valid input
      handleTextFieldChange(event);
      handleDataStep3(event);
      setstep3value((prevState) => ({
        ...prevState,
        Business_No_of_directors: inputValue,
      }));
    }
  }

  const handleDynamiForm2 =(event)=>{
    const inputValue = event.target.value.replace('.', '');
    if (inputValue === '' || (parseInt(inputValue) >= 0 && parseInt(inputValue) <= 10)) {
      setNumber2(inputValue); // Update the state with the valid input
      handleTextFieldChange2(event)
      handleDataStep3(event);
    }
  }

  const handleDataStepSelect3 = (e) => {
    setValidnationality(e)
    setKYCNationality(e.value)
    setstep3value((prevState) => ({
      ...prevState,
      IndidualNationality: e.value,
    }));
  };
 
  const handleDataStepSelectState3 = (e) => {
    setKYCNationality(e.value)
    setstep3value((prevState) => ({
      ...prevState,
      IndidualNationality: e.value,
    }));
  };

  const handleDataStepSelectOccupation = (e) => {
    setValidOccupation(e)
    setOccup(e.value);
    setstep3value((prevState) => ({
      ...prevState,
      IndidualOccupation: e.value
    }));
  };

  // google map code start
  const addressRegex = /^(\d+[A-Za-z]*|[A-Za-z]+\d+|\d+)[\/A-Za-z,]*\s+[A-Za-z\s]+$/;
  const [StreetNumber, setStreetNumber] = useState("");
  const [city, setcity] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(true);
  // const handleBlur = (addressValue) => {
  //   const isValid = addressRegex.test(addressValue);
  //   console.log(isValid)
  //   setIsAddressValid(isValid);
  // };

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

    setstep3value((prevState) => ({
      ...prevState,
      IndidualStreetName : '',
      IndidualCity: '',
      IndidualZip: '',
      IndidualState: ''
    }));
    
    setPostalZipcode('')
    setState('')
    setSubarbCity('')
    setStreetNumber('')
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
      
      streetName = place.formatted_address
      setstep3value((prevState) => ({
        ...prevState,
        IndividualCity: city,
        IndidualZip: postal_code,
        IndidualState: state,
        IndidualStreetName: streetName,
      }));
      const matchedState = States.find((stateItem) => stateItem.name === state);
      if (matchedState) {
        setState(matchedState.id);
      }
      setSubarbCity(city)
      setPostalZipcode(postal_code)
      setStreetNumber(streetName) 
    }
    setIsAddressValid(isValid);
    return isValid;
  };

  const autocompleteRef = React.useRef(null);

  const handlePlaceSelect2 = (place) => {
    console.log(place.address_components);

    setstep3value((prevState) => ({
      ...prevState,
      Agent_Address_of_Business: place.formatted_address,
    }));
  };

  const autocompleteRef2 = React.useRef(null);

  // google map code end

  const [Country, setCountry] = useState([]);
  const [States, setStates] = useState([]);
  const [Occupation, setOccupation] = useState([]);
  const [Nationality, setNationality] = useState([]);

  const [KYCNationality,setKYCNationality] = useState('')
  const [StreetName,setStreetName] = useState('')
  const [SubarbCity,setSubarbCity] = useState('')
  const [State,setState] = useState('')
  const [PostalZipcode,setPostalZipcode] = useState('')
  const [AutoTimeZone,setAutoTimeZone] = useState('')
  const [Occup,setOccup] = useState('')
  const [Recidence,setRecidence] = useState('Yes')
  useEffect(() => {
    var countryname = Countrydata.Countryiso3;
    if (!countryname == "") {
      const options = {
        componentRestrictions: { country: `${countryname}` },
      };

      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        options
      );
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        handlePlaceSelect(place);
      });

      const autocomplete2 = new window.google.maps.places.Autocomplete(
        autocompleteRef2.current,
        options
      );
      autocomplete2.addListener("place_changed", () => {
        const place = autocomplete2.getPlace();
        handlePlaceSelect2(place);
      });
    }
    document.getElementById("otherfield").style.display = "none";

    setData3(step3value);

    if (Name == "Individual") {
      if (activestepkey === "thirdStep") {
        handleid("Individual_KYC_step3");
      }
      document.getElementById("stepone3in1").style.display = "block";
      document.getElementById("steptwo3in2").style.display = "none";
      document.getElementById("stepthree3in3").style.display = "none";
      // console.lo
    } else if (Name == "Business") {
      if (B_A_activestepkey === "thirdStep") {
        handleid("Bussiness_Details_step3");
      }
      document.getElementById("stepone3in1").style.display = "none";
      document.getElementById("steptwo3in2").style.display = "block";
      document.getElementById("stepthree3in3").style.display = "none";
    } else {
      if (B_A_activestepkey === "thirdStep") {
        handleid("Agent_Details_step3");
      }
      document.getElementById("stepone3in1").style.display = "none";
      document.getElementById("steptwo3in2").style.display = "none";
      document.getElementById("stepthree3in3").style.display = "block";
    }
  }, [Name, StepOfivepopup, handleid ,data3]);

  useEffect(()=>{
    // if(UpdateStep == "IthirdStep" || UpdateStep == "BthirdStep" || UpdateStep == "AthirdStep"){
      GetAllCountrys();
      GetAllOccupation();
      GetAllNationality();
    // }
  },[])

  useEffect(()=>{
    GetAllStates();
  },[Countrydata])

  useEffect(() => { 
    if(UpdateStep=='IthirdStep'){
      handleUpdateDataIndividual()
    }else if(UpdateStep=='BthirdStep'){
      if(numberOfForms > 0){
        if(validator.error_input_validation("Bussiness_Details_step3")){
          setFormPopup(true)
        }else{
          StepBlank('')
        }
      }else if(numberOfForms2 > 0){
        if(validator.error_input_validation("Bussiness_Details_step3")){
          setShareholderFormPopup(true)
        }else{
          StepBlank('')
        }
      }else{
        handleBUpdateDataIndividual()
      }
    }else if(UpdateStep=='AthirdStep'){
      handleAUpdateDataIndividual()
    } 
  },[UpdateStep,R_ID, B_ID, K_ID, I_ID])

  const handleOther = (e) => {
    if (e.target.value == "Others") {
      document.getElementById("otherfield").style.display = "block";
    } else {
      document.getElementById("otherfield").style.display = "none";
    }
  };

  const [isSearchable, setIsSearchable] = useState(false);
  const [isSearchable1, setIsSearchable1] = useState(false);
  const [isSearchable2, setIsSearchable2] = useState(true);

  const GetAllNationality = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallnationality"
      );
      if (response.data.status === true) {
        const optionsForCountry = response.data.data.map((NationalityName) => ({
          value: NationalityName.nationality,
          label: NationalityName.nationality,
        }));
        setNationality(optionsForCountry);
        if (response.data.data.length >= 5) {
          setIsSearchable(true);
        } else {
          setIsSearchable(false);
        }
      }
    } catch (err) {
      console.log(err)
    }
  };

  // const [isSearchable1, setIsSearchable1] = useState(false);

  const GetAllCountrys = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallcountries"
      );
      if (response.data.status === true) {
        const optionsForCountry = response.data.data.map((countryname) => ({
          value: countryname.id,
          label: countryname.name,//countryname.emoji + " " +countryname.name,
          image:`https://flagcdn.com/16x12/${countryname.iso2.toLowerCase()}.png`,//countryname.iso2.toUpperCase()
          iso2:countryname.iso2,
          PhoneCode:countryname.phoneCode
        }));
        setCountry(optionsForCountry);
        if (response.data.data.length >= 5) {
          setIsSearchable1(true);
        } else {
          setIsSearchable1(false);
        }
      } else if (response.data.status === false) {
      }
    } catch (err) {}
  };

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
        // console.log(response.data.data)
        // const optionsForState = response.data.data.map((States) => ({
        //   value: States.id,
        //   label: States.name
        // }));
        // setStates(optionsForState);

        // // console.log(response.data.data)
        setStates(response.data.data);
      }
    } catch (err) {
      console.log(err)
    }
  };

  const GetAllOccupation = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getalloccupations"
      );
      if (response.data.status === true) {

        const optionsForState = response.data.data.map((States) => ({
          value: States.id,
          label: States.name
        }));
        setOccupation(optionsForState);

        // setOccupation(response.data.data);
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handlesetcity = (e) => {
    handleDataStep3(e);
    // setcity(e.target.value);
    setSubarbCity(e.target.value)
  };
  const handlesetpostalcode = (e) => {
    handleDataStep3(e);
    setPostalCode(e.target.value);
  };

  const handleUpdateDataIndividual = async () => {
    // setloadervalue(true)
    if(validator.error_input_validation("Individual_KYC_step3")){
      if(ValidOccupation =='0'){
        setValid(true)
        StepBlank('')
      }else if(Validnationality =='0'  ){
        setValid(true)
        StepBlank('')
      }else{
        setValid(false)
      axios.post(CommonConstants.BASE_URL + "/getuserinfobyid", {id:R_ID}).then((respo) => {
        // //console.log(respo,"USERINFO")
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
          "regTimezone":"${AutoTimeZone}",
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
          "streetName":"${StreetNumber}",
          "countryId":${respo.data.data.countryId},
          "stateId":${State},
          "nationality":"${KYCNationality}",
          "suburb":"${SubarbCity}",
          "postalCode":"${PostalZipcode}",
          "verified":0,
          "occupationId":${Occup},
          "isResidence": ${Recidence==="Yes" ? true: false},
          "kycStatus":""
        }`);

        formData.append('isFromSignup', false);
        formData.append('stepNo', 3);

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
            GoNextStep()
            setloadervalue(false)
          }
        })
        .catch(function (error) {
          // setloadervalue(false)
        });
      }).catch(err=>{
        console.log(err)
      })
    }
    }else if(ValidOccupation =='0'){
      setValid(true)
      StepBlank('')
    }else if(Validnationality =='0'  ){
      setValid(true)
      StepBlank('')
    }else{
      StepBlank('')
    }

  
  };

  const handleBUpdateDataIndividual = async () => {
    // // setloadervalue(true)
    // if (validator.error_input_validation("Director_List")) {
      // debugger
    if(validator.error_input_validation("Bussiness_Details_step3")){
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
         "mName":"",
         "lName":"",
         "businessName":"${respo.data.data.businessName}",
         "regNo":"${respo.data.data.regNo}",
         "regTimezone":"${respo.data.data.regTimezone}",
         "businessAddress":"${respo.data.data.businessAddress}",
         "phone":"${respo.data.data.phone}",
         "customerId":"${respo.data.data.customerId}",
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
      "businessDetails",
      `{
        "id":${B_ID},
        "userId":${R_ID},
        "companyName":"${step3value.Business_CompanyType}",
        "abn":"",
        "typeBusiness":"",
        "industryType":"${step3value.Business_Industry_type}",
        "noDirector":"${number}",
        "noShareholder":"${step3value.Business_No_of_Shareholders}",
        "noEmployee":"${step3value.Business_No_of_employees}",
        "businessAddress":"",
        "targetBusiness":"${step3value.Business_Target_Market}",
        "website":"${step3value.Business_Website}",
        "expectedRemittance":"${step3value.Business_sending_currency_per_year}",
        "volumeYear":"",
        "noOfTranscation":"${step3value.Business_Expected_transaction_per_year}",
        "countryOfBusiness":""
      }`
    );

    formData.append('isFromSignup', false);
    formData.append('stepNo', 3);

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

          if(numberOfForms>0 && numberOfForms2>0){
            setShareholderFormPopup(false)
          }else if(numberOfForms > 0 && numberOfForms2<1){
            setFormPopup(false);
          }else if(numberOfForms <= 0 && numberOfForms2>0){
            setShareholderFormPopup(false)
          }
          GoNextStepBA()
          setloadervalue(false)
        }
      })
      .catch(function (error) {
        // setloadervalue(false)
      });
    }).catch(err=>{
      console.log(err)
    })
  }else{
    StepBlank('')
  }
  };

  const handleAUpdateDataIndividual = async () => {
    // setloadervalue(true)
    if(validator.error_input_validation("Agent_Details_step3")){
    if(ValidCountryofBusiness =='0'){
      setValid(true)
      StepBlank('')
    }else{
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
      "businessDetails",
      `{
        "id":${B_ID},
        "userId":${R_ID},
        "companyName":"",
        "abn":"${step3value.Agent_Registration_No}",
        "typeBusiness":"${step3value.Agent_Business_Name}",
        "industryType":"",
        "noDirector":"",
        "noShareholder":"",
        "noEmployee":"",
        "businessAddress":"${step3value.Agent_Address_of_Business}",
        "targetBusiness":"${step3value.Agent_Target_Market}",
        "website":"${step3value.Agent_Website}",
        "expectedRemittance":"${step3value.Agent_sending_currency_per_year}",
        "volumeYear":"${step3value.Agent_current_business_year}",
        "noOfTranscation":"${step3value.Agent_Expected_transaction_per_year}",
        "countryOfBusiness":"${step3value.Agent_Country_of_Business_Registration}"
      }`
    );

    formData.append('isFromSignup', false);
    formData.append('stepNo', 3);

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
          GoNextStepBA()
          setloadervalue(false)
          // setloadervalue(false)
          // setModalShowAdd(true)
          // HandlerIndividualUser()
        }
      })
      .catch(function (error) {
        // setloadervalue(false)
      });
    }).catch(err=>{
      console.log(err)
    })
  }}else if(ValidCountryofBusiness =='0'){
    setValid(true)
    StepBlank('')
  }else{
    StepBlank('')
  }
  }
  
  const [image,setimage] = useState('')

  const CountryDataStep1 = (e) => {
    setValidCountryofBusiness(e)
    // console.log(e.value)
    setimage(e.iso2)
    // countryvalidation(1)
    // countryvalidationerrorremove()
    // let arr = e?.value.split(" ");
    setstep3value((prevState) => ({
      ...prevState,
      Agent_Country_of_Business_Registration: e.value
    }))
    // setCountryDetails({
    //   ...CountryDetails,
    //   Agent_Country_of_Business_Registration: e.value
    // });
  };

  const CustomOption = ({ innerProps, label, data }) => (
    <div {...innerProps} style={{ paddingLeft: '10px', paddingBottom: '8px', paddingTop: '8px' }}>
      <img src={data.image} alt={label} style={{ width: '20px', marginRight: '5px' }} />
      {label}
    </div>
  );

  const handlecloseDirector =()=> {
    // debugger
    setFormPopup(false); 
    handleSubmitDirector()
    setShareholderFormPopup(true);
  }

  const handleTextFieldChange = (event) => {
    const value = event.target.value;
    setNumberOfForms(Number(value));
  };

  const handleMobileCodeChange = (index, field, value) => {
    // const updatedFormData = [...formData];
    // updatedFormData[index] = {
    //   ...updatedFormData[index],
    //   phoneCode:value
    // };
    // setFormData(updatedFormData);

    setFormData((prevState) => ({
      ...prevState[index],
      phoneCode:value
    }));
    // DirectorForms(updatedFormData)
  };

  const handleFormInputChange = (index, field, value,phonecode,countryid) => {
    if(phonecode !== undefined){
      const updatedFormData = [...formData];
      updatedFormData[index] = {
      ...updatedFormData[index],
      userId:+R_ID,
      isShareHolder: false,
      phoneCode:phonecode,
      [field]: value,
    };
    setFormData(updatedFormData);
    }else{
      const updatedFormData = [...formData];
      updatedFormData[index] = {
      ...updatedFormData[index],
      userId:+R_ID,
      isShareHolder: false,
      phoneCode:phonecode == undefined ? "+61": phonecode,
      countryId:countryid == undefined ? 14: countryid,
      [field]: value,
    };
    setFormData(updatedFormData);
    }
    
    // DirectorForms(updatedFormData)
  };
  // console.log(formData,"hii byy")

  const mobilevalidationchanges = (CPhoneCode,e) => {
    // handleDataStep2(e);
    var mobilenumbervalidate = e.target.value;
    // setExistMobile(false);

    var phoneno = /^(?!0|4)\d{5,15}$/;
    var zerovalid = /^((04))\d{8}$/;
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

  const handleSubmitDirector = async() => {
    DirectorForms(formData)
      try {
        const response = await axios.post(
          CommonConstants.BASE_URL + "/adddirectors",formData
        );
        if (response.data.status === true) {
          console.log(response.data.data,"Add Director Details")
        }
      } catch (err) {
        console.log(err)
      }
    };

  const renderDynamicForms = () => {
    const forms = [];
    for (let i = 0; i < numberOfForms; i++) {
      forms.push(
        <div key={i} className="my-3">
          <h5 className="fs-6 ps-3">Director Details {i+1} </h5>
          <Row className="px-3 respoChildFooter">
            <Form.Group
              as={Col}
              className="OccupationSelect input-container required "
              controlId="formGridEmail1"
            >
              <div>
                <i className="orangeText OccupationIcon	fa fa-flag svgNationality"></i> 
              </div>
               
              <Select
                id="country"
                options={Country}
                className="responsiveFontLarge orangeForm nationality SelectHoverLabel required"
                closeMenuOnSelect={true}
                isSearchable={isSearchable1}
                defaultValue={{
                  "value": 14,
                  "label": "Australia",
                  "image": "https://flagcdn.com/16x12/au.png",
                  "iso2": "AU",
                  "PhoneCode": "61"
                }}
                onChange={(e) => {
                  console.log(e)
                  let CCodeNumber = e.PhoneCode ? e.PhoneCode.substring(0, 1) : "+";
                  let formattedPhoneCode = CCodeNumber === "+" ? e.PhoneCode : "+" + e.PhoneCode;
                  handleFormInputChange(i, 'countryId', e.value , formattedPhoneCode)
                }}
                components={{ Option: CustomOption }}
              />
              {ValidCountryofBusiness == '0' && Valid == true && (
                    <small className="error-message text-danger">Please Select The Country of Business Registration</small>
                  )}
              <label
                htmlFor="name" style={{zIndex:0}}
                className="form-label1 responsiveFontLarge"
              >
                Select Country
              </label>
            </Form.Group>
          </Row>

          <Row className="px-3 respoChildFooter">
            
            <Form.Group
              as={Col}
              className="left-inner-addon input-container"
            >
              <i className="orangeText main fa fa-user "></i>
              <Form.Control
                name="Director_Fullname"
                type="text"
                placeholder="Director Full name"
                value={formData[i]?.name || ''}
                className="formcontrol orangeForm form-input required"
                onChange={(e) => {
                  let inputValue = e.target.value;
                  let sanitizedValue = '';
                  let Alfabet ='';

                  if (inputValue) {
                    const regex = /[^a-zA-Z\s]/g;
                    Alfabet = inputValue.replace(regex, '');
                    const words = Alfabet.split(' ');
            
                  sanitizedValue = words
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                  }

                  handleFormInputChange(i, 'name', sanitizedValue,formData[i]?.phoneCode,formData[i]?.countryId); 
                }}
              />
              <small className="responsiveFontLarge d-none text-danger error ms-2">
                Please Enter Director full name
              </small>
              <label htmlFor="name" className="form-label1">
                Director Full Name
              </label>
            </Form.Group>
            <Form.Group
              as={Col}
              className="left-inner-addon input-container"
            >
              <i className="orangeText main fa fa-envelope "></i>
              <Form.Control
                name="Director_Email"
                type="text"
                placeholder="Director Email"
                value={formData[i]?.email || ''}
                className="formcontrol orangeForm email form-input required"
                onChange={(e) => handleFormInputChange(i, 'email', e.target.value,formData[i]?.phoneCode,formData[i]?.countryId)}
              />
              <small className="responsiveFontLarge d-none text-danger  error  ms-2">
                Please Enter Director Email
              </small>
              <small className="responsiveFontLarge d-none text-danger email_message  ms-2">
                Please Enter valid Email
              </small>
              <label htmlFor="name" className="form-label1">
                Email
              </label>
            </Form.Group>
          </Row>

          <Row className="px-3 respoChildFooter">
            <Form.Group
              as={Col}
              className="left-inner-addon input-container "
            >
              <div className="d-flex">
              <i className="orangeText main fa fa-mobile"></i>
                <Form.Control
                  type="text"
                  defaultValue={formData[i]?.phoneCode}
                  placeholder="Mobile"
                  readOnly
                  className={`inputphonecode countrycode pe-0 formcontroll1 BorderOrange form-input `}
                />
              <Form.Control
                name="Director_Mobile"
                type="text"
                placeholder="Director Mobile"
                value={formData[i]?.phone || ''}
                className={`inputphonenum inputmobile formcontroll2 BorderOrange required phone ps-0 form-input `}
                onChange={(e)=>{
                  let value = e.target.value;
                  const newValue = value.replace(/[^0-9]/g, '');
                  handleFormInputChange(i, 'phone', newValue,formData[i]?.phoneCode,formData[i]?.countryId)
                  mobilevalidationchanges(formData[i]?.phoneCode,e)
                }}
              />
              <label htmlFor="name" className="form-label1">
                Mobile
              </label>
              </div>

              <small className="responsiveFontLarge  d-none text-danger error ms-2">
                Please Enter Director Mobile
              </small>
              {validationMobile === true && formData[i]?.phone ? (
              <small
                className={`text-danger  ms-2 error_font`}
              >
                This mobile Number must start with 04 or 4 and have 10
                or 9 digits respectively
              </small>
              ) : ""
              }
              
            </Form.Group>
            <Form.Group
              as={Col}
              className="left-inner-addon input-container"
            >
              <i className="orangeText main fas fa-hand-holding-usd"></i>
              <Form.Control
                name="Director_shareHolding"
                type="text"
                // min={1}
                // max={10}
                placeholder="Share Holding (Percentage)"
                value={formData[i]?.percentageOfShareHolding || ''}
                className="formcontrol orangeForm form-input required"
                onChange={(e)=>{
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
                  if (cleanedValue === '' || (parseInt(cleanedValue) >= 0 && parseInt(cleanedValue) <= 100)){
                    handleFormInputChange(i, 'percentageOfShareHolding', cleanedValue,formData[i]?.phoneCode,formData[i]?.countryId)
                  }
                }
              }
              />
              <small className="responsiveFontLarge  d-none text-danger error ms-2">
                Please Enter Share Holding
              </small>
              <label htmlFor="name" className="form-label1">
                Share Holding (Percentage)
              </label>
            </Form.Group>
          </Row>
        </div>
      );
    }
    return forms;
  };

  const handleTextFieldChange2 = (event) => {
    const value = event.target.value;
    setNumberOfForms2(Number(value));
  };
  
  const handleFormInputChange2 = (index, field, value,phonecode,countryid) => {
// debugger
    if(phonecode !== undefined){
      const updatedFormData = [...formData2];
      updatedFormData[index] = {
      ...updatedFormData[index],
      userId:+R_ID,
      isShareHolder: true,
      phoneCode:phonecode,
      [field]: value,
    };
    setFormData2(updatedFormData);
    }else{
      const updatedFormData = [...formData2];
      updatedFormData[index] = {
      ...updatedFormData[index],
      userId:+R_ID,
      isShareHolder: true,
      phoneCode:phonecode == undefined ? "+61": phonecode,
      countryId:countryid == undefined ? 14: countryid,
      [field]: value,
    };
    setFormData2(updatedFormData);
    }
    // ShareholderForms(updatedFormData)
  };

  const handleSubmitShareHolder = async() => {
    // console.log(formData2)
    ShareholderForms(formData2)
    try {
      const response = await axios.post(
        CommonConstants.BASE_URL + "/adddirectors",formData2
      );
      if (response.data.status === true) {
        handleBUpdateDataIndividual()
        console.log(response.data.data,"Add Director Details")
      }
    } catch (err) {
      console.log(err)
    }
  };

  const renderShareholderDynamicForms = () =>{
    const forms2 = [];

    for (let i = 0; i < numberOfForms2; i++) {
      forms2.push(
        <div key={i} className="my-3">
          <h5 className="fs-6 ps-3">Director Details {i+1} </h5>
          <Row className="px-3 respoChildFooter">
            <Form.Group
              as={Col}
              className="OccupationSelect input-container required "
              controlId="formGridEmail1"
            >
              <div>
                <i className="orangeText OccupationIcon	fa fa-flag svgNationality"></i> 
              </div>
               
              <Select
                id="country"
                options={Country}
                className="responsiveFontLarge orangeForm nationality SelectHoverLabel required"
                closeMenuOnSelect={true}
                isSearchable={isSearchable1}
                defaultValue={{
                  "value": 14,
                  "label": "Australia",
                  "image": "https://flagcdn.com/16x12/au.png",
                  "iso2": "AU",
                  "PhoneCode": "61"
                }}
                onChange={(e) => {
                  console.log(e)
                  let CCodeNumber = e.PhoneCode ? e.PhoneCode.substring(0, 1) : "+";
                  let formattedPhoneCode = CCodeNumber === "+" ? e.PhoneCode : "+" + e.PhoneCode;
                  handleFormInputChange2(i, 'countryId', e.value , formattedPhoneCode)
                }}
                components={{ Option: CustomOption }}
              />
              {ValidCountryofBusiness == '0' && Valid == true && (
                    <small className="error-message text-danger">Please Select The Country of Business Registration</small>
                  )}
              <label
                htmlFor="name" style={{zIndex:0}}
                className="form-label1 "
              >
                Select Country
              </label>
            </Form.Group>
          </Row>

          <Row className="px-3 respoChildFooter">
            
            <Form.Group
              as={Col}
              className="left-inner-addon input-container"
            >
              <i className="orangeText main fa fa-user "></i>
              <Form.Control
                name="shareholder_Fullname"
                type="text"
                placeholder="shareholder Fullname"
                value={formData2[i]?.name || ''}
                className="formcontrol orangeForm form-input required"
                onChange={(e) => {
                  let inputValue = e.target.value;
                  let sanitizedValue = '';
                  let Alfabet ='';

                  if (inputValue) {
                    const regex = /[^a-zA-Z\s]/g;
                    Alfabet = inputValue.replace(regex, '');
                    const words = Alfabet.split(' ');
            
                  sanitizedValue = words
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                  }

                  handleFormInputChange2(i, 'name', sanitizedValue ,formData2[i]?.phoneCode,formData2[i]?.countryId); }}
              />
              <label htmlFor="name" className="form-label1">
                Shareholder Full Name
              </label>
              <small className="responsiveFontLarge  d-none text-danger error ms-2">
                Please Enter Shareholder full name
              </small>
            </Form.Group>
            <Form.Group
              as={Col}
              className="left-inner-addon input-container"
            >
              <i className="orangeText main fa fa-envelope "></i>
              <Form.Control
                name="shareholder_Email"
                type="text"
                placeholder="shareholder Email"
                value={formData2[i]?.email || ''}
                className="formcontrol orangeForm email form-input required"
                onChange={(e) => handleFormInputChange2(i, 'email', e.target.value,formData2[i]?.phoneCode,formData2[i]?.countryId)}
              />
              <label htmlFor="name" className="form-label1">
                Email
              </label>
              <small className="responsiveFontLarge  d-none text-danger error error ms-2">
                Please Enter Shareholder Email
              </small>
            </Form.Group>
          </Row>

          <Row className="px-3 respoChildFooter">
            <Form.Group
              as={Col}
              className="left-inner-addon input-container "
            >
              <div className="d-flex">
              <i className="orangeText main fa fa-mobile"></i>
                <Form.Control
                  type="text"
                  value={formData2[i]?.phoneCode}
                  placeholder="Mobile"
                  readOnly
                  className={`inputphonecode countrycode pe-0 formcontroll1 BorderOrange required form-input `}
                //    ${
                //     // ExistMobile === true ? "border-danger" : ""
                //   }`
                // }
                />
              <Form.Control
                name="shareholder_Mobile"
                type="text"
                placeholder="shareholder Mobile"
                value={formData2[i]?.phone || ''}
                className={`inputphonenum inputmobile formcontroll2 BorderOrange required phone ps-0 form-input `}
                  // className="inputphonenum inputmobile formcontrol orangeForm form-input required"
                onChange={(e)=>{
                  let value = e.target.value;
                  const newValue = value.replace(/\D/g, '');
                  handleFormInputChange2(i, 'phone', newValue,formData2[i]?.phoneCode,formData2[i]?.countryId)
                  mobilevalidationchanges(formData2[i]?.phoneCode,e)
                }}
              />
              <label htmlFor="name" className="form-label1">
                Mobile
              </label>
              </div>
              {validationMobile === true && formData2[i]?.phone ? (
              <small
                className={`text-danger  ms-2 error_font`}
              >
                This mobile Number must start with 04 or 4 and have 10
                or 9 digits respectively
              </small>
              ):""
              }
              <small className="responsiveFontLarge  d-none text-danger error ms-2">
                Please Enter Director Mobile
              </small>
            </Form.Group>
            <Form.Group
              as={Col}
              className="left-inner-addon input-container"
            >
              <i className="orangeText main fas fa-hand-holding-usd"></i>
              <Form.Control
                name="shareholder_shareHolding"
                type="text"
                min={1}
                max={10}
                placeholder="Share Holding (Percentage)"
                value={formData2[i]?.percentageOfShareHolding || ''}
                className="formcontrol orangeForm form-input required"
                onChange={(e)=>{
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

                  if (cleanedValue === '' || (parseInt(cleanedValue) >= 0 && parseInt(cleanedValue) <= 100)){
                    handleFormInputChange2(i,'percentageOfShareHolding', cleanedValue,formData2[i]?.phoneCode,formData2[i]?.countryId)
                  }
                }
              }
              />
              <label htmlFor="name" className="form-label1">
                Share Holding (Percentage)
              </label>
              <small className="responsiveFontLarge  d-none text-danger error ms-2">
                Please Enter Share Holding
              </small>
            </Form.Group>
          </Row>
        </div>
      );
    }

    // for (let i = 0; i < numberOfForms2; i++) {
    //   forms2.push(
    //     <div key={i} className="my-3">
    //         <h5 className="fs-6 ps-3">Shareholder Details {i+1} </h5>
          
    //       <Row className="px-3 respoChildFooter">
    //         <Form.Group
    //           as={Col}
    //           className="OccupationSelect input-container required "
    //           controlId="formGridEmail1"
    //         >
    //           <div>
    //             <i className="orangeText OccupationIcon	fa fa-flag svgNationality"></i> 
    //           </div>
               
    //           <Select
    //             id="country"
    //             options={Country}
    //             className="responsiveFontLarge orangeForm nationality SelectHoverLabel required"
    //             closeMenuOnSelect={true}
    //             isSearchable={isSearchable1}
    //             defaultValue={{
    //               "value": 14,
    //               "label": "Australia",
    //               "image": "https://flagcdn.com/16x12/au.png",
    //               "iso2": "AU",
    //               "PhoneCode": "61"
    //             }}
    //             onChange={(e) => {
    //               console.log(e)
    //               let CCodeNumber = e.PhoneCode ? e.PhoneCode.substring(0, 1) : "+";
    //               let formattedPhoneCode = CCodeNumber === "+" ? e.PhoneCode : "+" + e.PhoneCode;
    //               handleFormInputChange2(i, 'countryId', e.value , formattedPhoneCode)
    //             }}
    //             components={{ Option: CustomOption }}
    //           />
    //           {ValidCountryofBusiness == '0' && Valid == true && (
    //                 <small className="error-message text-danger">Please Select The Country of Business Registration</small>
    //               )}
    //           <label
    //             htmlFor="name" style={{zIndex:0}}
    //             className="form-label1 responsiveFontLarge"
    //           >
    //             select Country
    //           </label>
    //         </Form.Group>
    //       </Row>

    //       <Row className="px-3 respoChildFooter">
    //         <Form.Group
    //           as={Col}
    //           className="left-inner-addon input-container"
    //         >
    //           <i className="orangeText main fa fa-user "></i>
    //           <Form.Control
    //             name="shareholder_Fullname"
    //             type="text"
    //             placeholder="shareholder Fullname"
    //             value={formData2[i]?.name || ''}
    //             className="formcontrol orangeForm form-input required"
    //             onChange={(e) => handleFormInputChange2(i, 'name', e.target.value,formData2[i]?.phoneCode,formData2[i]?.countryId)}
    //           />
    //           <label htmlFor="name" className="form-label1">
    //             Shareholder FullName
    //           </label>
    //           <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
    //             Please Enter Shareholder Fullname
    //           </small>
    //         </Form.Group>
    //       </Row>

    //       <Row className="px-3 respoChildFooter">
    //         <Form.Group
    //           as={Col}
    //           className="left-inner-addon input-container"
    //         >
    //           <i className="orangeText main fa fa-envelope "></i>
    //           <Form.Control
    //             name="shareholder_Email"
    //             type="text"
    //             placeholder="shareholder Email"
    //             value={formData2[i]?.email || ''}
    //             className="formcontrol orangeForm form-input required"
    //             onChange={(e) => handleFormInputChange2(i, 'email', e.target.value,formData2[i]?.phoneCode,formData2[i]?.countryId)}
    //           />
    //           <label htmlFor="name" className="form-label1">
    //             Email
    //           </label>
    //           <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
    //             Please Enter shareholder Email
    //           </small>
    //         </Form.Group>
    //       </Row>
    //       <Row className="px-3 respoChildFooter">
    //         <Form.Group
    //           as={Col}
    //           className="left-inner-addon input-container d-flex"
    //         >
    //           <i className="orangeText main fa fa-mobile"></i>
    //             <Form.Control
    //               type="text"
    //               defaultValue={formData2[i]?.phoneCode}
    //               placeholder="Mobile"
    //               readOnly
    //               className={`inputphonecode countrycode pe-0 formcontroll1 BorderOrange required form-input `}
    //             //    ${
    //             //     // ExistMobile === true ? "border-danger" : ""
    //             //   }`
    //             // }
    //             />
    //           <Form.Control
    //             name="shareholder_Mobile"
    //             type="text"
    //             placeholder="shareholder Mobile"
    //             value={formData2[i]?.phone || ''}
    //             className="inputphonenum inputmobile formcontroll2 BorderOrange required phone ps-0 form-input "
    //             onChange={(e)=>{
    //               let value = e.target.value;
    //               const newValue = value.replace(/[^0-9]/g, '');
    //               handleFormInputChange2(i, 'phone', +newValue,formData2[i]?.phoneCode,formData2[i]?.countryId)
    //             }}
    //           />
    //           <label htmlFor="name" className="form-label1">
    //             Mobile
    //           </label>
    //           <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
    //             Please Enter shareholder Mobile
    //           </small>
    //         </Form.Group>
    //       </Row>
    //       <Row className="px-3 respoChildFooter">
    //         <Form.Group
    //           as={Col}
    //           className="left-inner-addon input-container"
    //         >
    //           <i className="orangeText main fas fa-hand-holding-usd"></i>
    //           <Form.Control
    //             name="shareholder_shareHolding"
    //             type="text"
    //             min={0}
    //             max={10}
    //             placeholder="Share Holding (Percentage)"
    //             value={formData2[i]?.percentageOfShareHolding || ''}
    //             className="formcontrol orangeForm form-input required"
    //             onChange={(e)=>{
    //               let value = e.target.value;
    //               const newValue = value.replace(/[^0-9]/g, '');
    //               if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 100)){
    //                 handleFormInputChange2(i, 'percentageOfShareHolding', +newValue,formData2[i]?.phoneCode,formData2[i]?.countryId)
    //               }
    //             }
    //           }
    //           />
    //           <label htmlFor="name" className="form-label1">
    //             Share Holding (Percentage)
    //           </label>
    //           <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
    //             Please Enter Share Holding
    //           </small>
    //         </Form.Group>
    //       </Row>
    //     </div>
    //   );
    // }
    return forms2;
  }

  // console.log(formData2,"formData2")
  return (
    <>
      <section>
        <div className="bgOrange text-white text-center bolder my-4 py-3">
          Welcome to LegalRemit
        </div>
        <Container fluid>
        {loadervalue == true ? <Loader /> : ""}
          <Row>
            <Col className="col-lg-12 p-0">
              <div className="mt-3 pe-4 ps-4 ">
                <Row id="stepone3in1">
                  <div className="text-center">
                    <label className="text-center text-black mb-4">
                      KYC Details
                    </label>
                  </div>
                  <Form id="Individual_KYC_step3">
                    
                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="nationalityDRP input-container orangeBorder"
                      >
                        <i className="orangeText nationalityMain3 	fa fa-flag svgNationality"></i>
                        <Select
                          name="IndidualNationality"
                          // id="Example2"
                          options={Nationality}
                          className="SelectValueSelect SelectValueSelect3 SelectHoverLabel required nationality"
                          closeMenuOnSelect={true}
                          isSearchable={isSearchable}
                          onChange={handleDataStepSelect3}
                        />
                        {Validnationality == '0' && Valid == true && (
                          <small className="error-message error_message text-danger">Please select Nationality</small>
                        )}
                        <label style={{zIndex:0}} htmlFor="name" className="form-label1">
                          Nationality
                        </label>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="orangeText mainStep3 	fa fa-home "></i>
                        <Form.Control
                          type="text"
                          ref={autocompleteRef}
                          placeholder="House No & Street Name"
                          onChange={(e) => {
                            setStreetNumber(e.target.value);
                          }}
                          value={StreetNumber}
                          name="IndidualStreetName"
                          className={`form-input orange-border-step3 required ${
                            !isAddressValid ? 'error-border' : ''
                          }`}
                        />
                        {!isAddressValid && (
                          <small className="error-message text-danger">Invalid address. Please select and search proper address which contains house number and street name.</small>
                        )}
                        <label htmlFor="name" className="form-label1">
                          House No & Street Name
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The House No & Street Name
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="orangeText mainStep3 fa fa-map-marker "></i>
                        <Form.Control
                          type="text"
                          placeholder="Suburb/City"
                          value={SubarbCity}
                          onChange={(e) => {
                            handlesetcity(e);
                          }}
                          name="IndidualCity"
                          className="form-input cityvalidation orange-border-step3 required"
                        />
                        <label htmlFor="name" className="form-label1">
                          Suburb/City
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The Suburb/City
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="orangeText mainStep3 fa fa-map-marker "></i>
                        <Form.Select
                          className="orangeBorder required form-input"
                          onChange={(e)=> {handleDataStep3(e); setState(e.target.value);}}
                          name="IndidualState"
                          value={State}
                        >
                          <option value="">State</option>
                          {States &&
                            States.map((States, index) => {
                              return (
                                <>
                                  <option value={States.id}>
                                    {States.name}
                                  </option>
                                </>
                              );
                            })}
                        </Form.Select>

                        <label htmlFor="name" className="form-label1">
                          State
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Select The State
                        </small>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="orangeText mainStep3 fa fa fa-envelope "></i>
                        <Form.Control
                          type="number"
                          placeholder="Postal / Zip Code"
                          value={PostalZipcode}
                          onChange={(e)=>{handlesetpostalcode(e); setPostalZipcode(e.target.value)}}
                          name="IndidualZip"
                          className="form-input orange-border-step3 required number"
                        />
                        <label htmlFor="name" className="form-label1">
                          Postal / Zip Code
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The Postal / Zip Code
                        </small>
                        
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="OccupationSelect input-container "
                      >
                        <i className="orangeText OccupationIcon fa fa-briefcase "></i>
                        {/* <Form.Select
                          className="orangeBorder required form-input"
                          onChange={(e)=> {handleDataStep3(e); setOccup(e.target.value)}}
                          name="IndidualOccupation"
                        >
                          <option value="">Occupation</option>
                          {Occupation &&
                            Occupation.map((occupation, index) => {
                              return (
                                <>
                                  <option value={occupation.id}>
                                    {occupation.name}
                                  </option>
                                </>
                              );
                            })}
                        </Form.Select> */}

                        <Select
                          name="IndidualOccupation"
                          options={Occupation}
                          className="SelectValueSelect SelectValueSelect3 SelectHoverLabel required nationality"
                          closeMenuOnSelect={true}
                          isSearchable={isSearchable2}
                          onChange={(e)=>{handleDataStepSelectOccupation(e)}}
                        />
                        <label style={{zIndex:0}} htmlFor="name" className="form-label1">
                          Occupation
                        </label>
                        {ValidOccupation == '0' && Valid == true && (
                          <small className="error-message error_message text-danger">Please Select The Occupation</small>
                        )}
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Select The Occupation
                        </small>
                        {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="orangeText mainStep3 fa fa-map-marker "></i>
                        
                        <Form.Select
                          className="orangeBorder required form-input"
                          onChange={(e) => {handleDataStep3(e); setRecidence(e.target.value)}}
                          value={Recidence}
                          name="IndidualResidence"
                        >
                          <option value="" disabled>
                            Is Residence of {Countrydata.CountryName}
                          </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Select>

                        <label htmlFor="name" className="form-label1">
                          Is Residence of {Countrydata.CountryName}
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Select The Residence
                        </small>
                        {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                      </Form.Group>
                    </Row>
                  </Form>
                </Row>

                <Row id="steptwo3in2">
                  <div className="text-center">
                    <label className="text-center text-black mb-4">
                      Business Details
                    </label>
                  </div>
                  <Form id="Bussiness_Details_step3">
                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon  input-container "
                      >
                        <i className="orangeText main fa fa-building "></i>
                        <Form.Select
                          id="select1"
                          onChange={handleDataStep3}
                          name="Business_CompanyType"
                          className="mainDrp orangeBorder required form-input"
                        >
                          <option value="">Company Type</option>
                          <option value="Sole Traders">Sole Traders</option>
                          <option value="Proprietary Limited (PTY LTD)">
                            Proprietary Limited (PTY LTD)
                          </option>
                          <option value="Partnership">Partnership</option>
                          <option value="Trustee">Trustee</option>
                          <option value="Public Limited company">
                            Public Limited company
                          </option>
                        </Form.Select>
                        <label htmlFor="name" className="form-label1">
                          Company Type
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please select company Type
                        </small>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="left-inner-addon  input-container "
                      >
                        <i className="orangeText main fa fa-user "></i>
                        
                        <Form.Select
                          id="select1"
                          onChange={(e)=>{
                            const invalidChars = ['-','+','*','\\'];
                            let value = e.target.value;
                            // let newValue = '';
                            // for (let i = 0; i < value.length; i++) {
                            //   if (invalidChars.indexOf(value[i]) === -1) {
                            //     newValue += value[i];
                            //   }
                            // }

                            // e.target.value = newValue;
                            // handleDataStep3
                            setstep3value((prevState) => ({
                              ...prevState,
                              Business_No_of_employees: value,
                            }));
                          }}
                          name="Business_No_of_employees"
                          className="mainDrp orangeBorder required form-input"
                        >
                          <option value="">No of employees</option>
                          <option value="1">1</option>
                          <option value="2-9">2-9</option>
                          <option value="10-19">10-19</option>
                          <option value="20-50">20-50</option>
                          <option value="50+">50+</option>
                        </Form.Select>
                        <label htmlFor="name" className="form-label1">
                          No of employees
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Confirm Employee count
                        </small>
                        <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
                          Please Enter Valid number
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon "
                        // input-container"
                      >
                        <i className="orangeText main fa fa-user "></i>
                        <Form.Control
                          onChange={(e)=>{handleDynamiForm(e)}}
                          name="Business_No_of_directors"
                          type="text"
                          value={number}
                          // onBlur={(e)=>{setFormPopup(true)}}
                          placeholder="No of directors"
                          className="formcontrol orangeForm form-input pbSt"
                        />
                        <label htmlFor="name" className="form-label1">
                          No of directors
                        </label>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="left-inner-addon"
                        //  input-container"
                      >
                        <i className="orangeText main fa fa-user "></i>
                        <Form.Control
                          onChange={(e)=>{handleDynamiForm2(e)}}
                          value={number2}
                          name="Business_No_of_Shareholders"
                          type="text"
                          placeholder="No. of Shareholders"
                          className="formcontrol orangeForm form-input"
                        />

                        <label htmlFor="name" className="form-label1">
                          No of Shareholders
                        </label>
                      </Form.Group>
                      <Row className="px-3">
                        <small className="notevalue bolder text-primary">Note: The number of shareholders must not include any individuals who also serve as directors of the company.</small>
                      </Row>
                    </Row>

                    <Row className="mb-3 respoChildFooter" id="drpIndustry">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main fas fa-building"></i>
                        <Form.Select
                          id="industryType"
                          onChange={handleDataStep3}
                          name="Business_Industry_type"
                          onClick={handleOther}
                          className="mainDrp orangeBorder required form-input"
                        >
                          <option value="">Industry type</option>
                          <option value="Education industry">
                            Education industry
                          </option>
                          <option value="Agricultural industry">
                            Agricultural industry
                          </option>
                          <option value="Chemical Industry">
                            Chemical Industry
                          </option>
                          <option value="Food Industry">Food Industry</option>
                          <option value="Infrastructure industry">
                            Infrastructure industry
                          </option>
                          <option value="Low technology industry">
                            Low technology industry
                          </option>
                          <option value="Information industry">
                            Information industry
                          </option>
                          <option value="Others">Others</option>
                        </Form.Select>

                        <label htmlFor="name" className="form-label1">
                          Industry type
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Industry Type
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter" id="otherfield">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main fas fa-building"></i>
                        <Form.Control
                          onChange={handleDataStep3}
                          name="Business_Industry_type"
                          type="text"
                          placeholder="Industry Type"
                          className="formcontrol orangeForm required number2 form-input"
                        />
                        <label htmlFor="name" className="form-label1">
                          Industry type
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Industry Type
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main fas fa-crosshairs"></i>
                        <Form.Control
                          type="text"
                          placeholder="Target Market"
                          value={step3value.Business_Target_Market}
                          onChange={(e)=>{
                            let value = e.target.value;
                            let Alfabet = value.replace(/[^a-zA-Z\s]/g, '');
                            const words = Alfabet.split(' ');
                            
                          let sanitizedValue = words
                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ');
                            setstep3value((prevState) => ({
                              ...prevState,
                              Business_Target_Market: sanitizedValue,
                            }));
                          }}
                          name="Business_Target_Market"
                          className="orangeForm required form-input"
                        />
                      <small className="responsiveFontLarge  d-none text-danger ms-2 error_message error">
                        Please Enter the Target Market
                      </small>
                        <label htmlFor="name" className="form-label1">
                          Target Market
                        </label>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main 	fas fa-dollar-sign "></i>
                        <Form.Control
                          onChange={(e)=>{
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
                            
                            setstep3value((prevState) => ({
                              ...prevState,
                              Business_sending_currency_per_year: cleanedValue,
                            }));
                          }}
                          value={step3value.Business_sending_currency_per_year}
                          name="Business_sending_currency_per_year"
                          type="text"
                          placeholder="Expected remittance volume (AUD)/sending currency per year."
                          className="formcontrol orangeForm required number3 form-input"
                        />
                        <label htmlFor="name" className="form-label1">
                          Expected remittance volume (AUD)/sending currency per
                          year
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Expected remittance volume (AUD)/sending
                          currency per year
                        </small>
                        <small className="responsiveFontLarge  d-none text-danger error_message error_message_number3 ms-2">
                          Please Enter Valid number
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main 	fas fa-dollar-sign "></i>
                        <Form.Control
                          onChange={(e)=>{
                            let values = e.target.value;
                            const newValue = values.replace(/[^0-9]/g, "");

                            setstep3value((prevState) => ({
                              ...prevState,
                              Business_Expected_transaction_per_year: newValue,
                            }));
                          }}
                          value={step3value.Business_Expected_transaction_per_year}
                          name="Business_Expected_transaction_per_year"
                          type="text"
                          placeholder="Expected No of transaction per year. "
                          className="formcontrol orangeForm required number4 form-input"
                        />
                        <label htmlFor="name" className="form-label1">
                          Expected No of transaction per year
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Expected No of transaction per year
                        </small>
                        <small className="responsiveFontLarge  d-none text-danger error_message error_message_number4 ms-2">
                          Please Enter Valid number
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main fa fa-globe "></i>
                        <Form.Control
                          onChange={handleDataStep3}
                          name="Business_Website"
                          type="text"
                          placeholder="Website"
                          className="formcontrol orangeForm form-input"
                        />
                        <label htmlFor="name" className="form-label1">
                          Website
                        </label>
                        {/* <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Website address
                        </small> */}
                      </Form.Group>
                    </Row>
                  </Form>
                </Row>

                <Row id="stepthree3in3">
                  <div className="text-center">
                    <label className="text-center text-black mb-4">
                      Business Details
                    </label>
                  </div>
                  <Form id="Agent_Details_step3">
                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main fa fa-user "></i>
                        <Form.Control
                          type="text"
                          placeholder="Business Name"
                          onChange={handleDataStep3}
                          name="Agent_Business_Name"
                          className="orangeForm required form-input"
                        />
                        <label htmlFor="name" className="form-label1">
                          Business Name
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The Business Name
                        </small>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main fa fa-user "></i>
                        <Form.Control
                          type="text"
                          placeholder="ACN/ABN/Registration No"
                          value={step3value.Agent_Registration_No}
                          onChange={(e)=>{
                            let value = e.target.value;
                            const newValue = value.replace(/[^a-zA-Z0-9\s]/g, '').toUpperCase();
                            setstep3value((prevState) => ({
                              ...prevState,
                              Agent_Registration_No: newValue,
                            }));
                          }}
                          name="Agent_Registration_No"
                          className=" orangeForm required form-input"
                        />
                        <label htmlFor="name" className="form-label1">
                          ACN/ABN/Registration No
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The ACN/ABN/Registration No
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      {/* <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <Form.Select
                          onChange={handleDataStep3}
                          className="mainDrp orangeForm required form-input"
                          name="Agent_Country_of_Business_Registration"
                        >
                          <option value="">
                            Country of Business Registration
                          </option>
                          {Country &&
                            Country.map((countryname, index) => {
                              return (
                                <option value={countryname.id}>
                                  {countryname.emoji}&nbsp;&nbsp;
                                  {countryname.name}
                                </option>
                              );
                            })}
                        </Form.Select>

                        <label htmlFor="name" className="form-label1">
                          Country of Business Registration
                        </label>
                      </Form.Group> */}
                      <Form.Group
                    as={Col}
                    className="OccupationSelect input-container required "
                    controlId="formGridEmail1"
                  >
                    {image == '' ? 
                    <div>
                      <i className="orangeText OccupationIcon	fa fa-flag svgNationality"></i> 
                    </div>
                    :''}
                    { image != '' ?
                        <div className="Flagimgset flagsetIcon">
                            <img src={`https://flagcdn.com/40x30/${image.toLowerCase()}.png`} className="" alt={image} style={{ width: '20px' }} />
                        </div>
                        :
                        ''
                    }
                    <Select
                      // name="bankId"
                      id="country"
                      options={Country}
                      className="responsiveFontLarge orangeForm nationality SelectHoverLabel required"
                      closeMenuOnSelect={true}
                      isSearchable={isSearchable1}
                      onChange={CountryDataStep1}
                      components={{ Option: CustomOption }}
                    />
                    {ValidCountryofBusiness == '0' && Valid == true && (
                          <small className="error-message text-danger">Please Select The Country of Business Registration</small>
                        )}
                    <label
                      htmlFor="name" style={{zIndex:0}}
                      className="form-label1 responsiveFontLarge"
                    >
                      Country of Business Registration
                    </label>
                    {/* <small className={`responsiveFontLarge responsiveFontLarge ${countryvalidationerror==1 ? "d-block" : "d-none"} text-danger ms-2 `}>
                      Please select the country
                    </small> */}
                  </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main fa fa-map-marker "></i>
                        <Form.Control
                          type="text"
                          ref={autocompleteRef2}
                          placeholder="Address of Business"
                          onChange={handleDataStep3}
                          name="Agent_Address_of_Business"
                          className="orangeForm required form-input"
                        />
                        <label htmlFor="name" className="form-label1">
                          Address of Business
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The Address of Business
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="orangeText main fas fa-crosshairs"></i>
                        <Form.Control
                          type="text"
                          placeholder="Target Market"
                          value={step3value.Agent_Target_Market}
                          onChange={(e)=>{
                            let value = e.target.value;
                            const newValue = value.replace(/[^A-Za-z]/g, '');
                            setstep3value((prevState) => ({
                              ...prevState,
                              Agent_Target_Market: newValue,
                            }));
                          }}
                          name="Agent_Target_Market"
                          className="orangeForm required form-input"
                        />

                        <small className="responsiveFontLarge d-none text-danger error_message ms-2 error">
                          Please Enter the Target Market
                        </small>

                        <label htmlFor="name" className="form-label1">
                          Target Market
                        </label>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main fas fa-medal "></i>
                        <Form.Control
                          type="text"
                          placeholder="No of years in current business"
                          value={step3value.Agent_current_business_year}
                          onChange={(e)=>{

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

                            setstep3value((prevState) => ({
                              ...prevState,
                              Agent_current_business_year: cleanedValue,
                            }));
                          }}
                          name="Agent_current_business_year"
                          className=" orangeForm required number form-input"
                        />
                        <label htmlFor="name" className="form-label1">
                          No of years in current business
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The No of years in current business
                        </small>
                        <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
                          Please Enter Valid number
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main 	fas fa-dollar-sign "></i>
                        <Form.Control
                          type="text"
                          placeholder="Expected remittance volume (AUD)/sending currency per year."
                          value={step3value.Agent_sending_currency_per_year}
                          onChange={(e)=>{
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
                            setstep3value((prevState) => ({
                              ...prevState,
                              Agent_sending_currency_per_year: cleanedValue,
                            }));
                          }}
                          name="Agent_sending_currency_per_year"
                          className=" orangeForm required number1 form-input"
                        />
                        <label htmlFor="name" className="form-label1">
                          Expected remittance volume (AUD)/sending currency per
                          year
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The Expected remittance volume
                        </small>
                        <small className="responsiveFontLarge  d-none text-danger error_message error_message_number1 ms-2">
                          Please Enter Valid number
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main 	fas fa-dollar-sign "></i>
                        <Form.Control
                          type="text"
                          placeholder="Expected No of transaction per year. "
                          value={step3value.Agent_Expected_transaction_per_year}
                          onChange={(e)=>{
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
                            setstep3value((prevState) => ({
                              ...prevState,
                              Agent_Expected_transaction_per_year: cleanedValue,
                            }));
                          }}
                          name="Agent_Expected_transaction_per_year"
                          className="orangeForm required number2 form-input"
                        />
                        <label htmlFor="name" className="form-label1">
                          Expected No of transaction per year
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The Expected No of transaction per year
                        </small>
                        <small className="responsiveFontLarge  d-none text-danger error_message error_message_number2 ms-2">
                          Please Enter Valid number
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container"
                      >
                        <i className="orangeText main fa fa-globe "></i>
                        <Form.Control
                          type="text"
                          placeholder="Website"
                          onChange={handleDataStep3}
                          name="Agent_Website"
                          className="orangeForm form-input"
                        />
                        <label htmlFor="name" className="form-label1">
                          Website
                        </label>
                        {/* <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The Website
                        </small> */}
                      </Form.Group>
                    </Row>
                  </Form>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>

        <Modal
          show={FormPopup}
          // onHide={(e)=>{setFormPopup(false); StepBlank('')}}
          size='lg' 
        >
          <Modal.Header className="text-center  mt-2">
              <Modal.Title className="d-flex m-auto">
                <h1 className="orangeText bolder responsiveFontLargeHeading  mb-0  mb-0">
                  Director Details
                </h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mainss">
                <div className="text-center mx-3 px-3">
                    <label className="text-center text-black mb-4">
                    You have to add No of directors name and contact details before do further procedure.
                    </label>
                  </div>
            <Row className="FormDynamic">
                <Col className="col-lg-12  m-auto justify-content-center">
                  <Form id="Director_List">
                  <div className="mb-3 mt-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon "
                        // input-container"
                      >
                        <i className="orangeText main fa fa-user "></i>
                        <Form.Control
                          onChange={(e)=>{handleDynamiForm(e)}}
                          name="Business_No_of_directors"
                          type="number"
                          value={number}
                          // onBlur={(e)=>{setFormPopup(true)}}
                          placeholder="No of directors"
                          className="formcontrol orangeForm required number1 form-input pbSt"
                        />
                        <label htmlFor="name" className="form-label1">
                          No of directors
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please enter Number of directors
                        </small>
                        <small className="responsiveFontLarge  d-none text-danger error_message error_message_number1 ms-2">
                          Please Enter Valid number
                        </small>
                      </Form.Group>
                      </div>
                    <div className="">
                      {renderDynamicForms()}
                    </div>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="mainss justify-content-center">
            <Row>
              <Col className="col-lg-12">
                <Button
                  className="d-block nextBtnDirector"
                  variant="primary"
                  onClick={(e)=>{
                    // console.log(formData)
                    if (validator.error_input_validation("Director_List")) {
                      if(number2 > 0){
                        handlecloseDirector(e)
                      }else{
                        handleSubmitDirector(e)
                        handleBUpdateDataIndividual(e)
                      }
                    }
                    }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
            </Modal.Footer>
              <Row></Row>
        </Modal>

        <Modal
          show={ShareholderFormPopup}
          // onHide={(e)=>{
          // setShareholderFormPopup(false)
          // StepBlank('')}}
          size='lg' 
        >
          <Modal.Header className="text-center  mt-2">
              <Modal.Title className="d-flex m-auto">
                <h1 className="orangeText bolder responsiveFontLargeHeading  mb-0  mb-0">
                  Shareholder Details
                </h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mainss">
                <div className="text-center mx-3 px-3">
                    <label className="text-center text-black mb-4">
                    You have to add No of Shareholders name and contact details before do further procedure.
                    </label>
                  </div>
            <Row className="FormDynamic">
                <Col className="col-lg-12  m-auto justify-content-center">
                  <Form id="shareholder_List">
                  <div className="mb-3 respoChildFooter">
                  <Form.Group
                        as={Col}
                        className="left-inner-addon"
                      >
                        <i className="orangeText main fa fa-user "></i>
                        <Form.Control
                          onChange={(e)=>{handleDynamiForm2(e)}}
                          value={number2}
                          name="Business_No_of_Shareholders"
                          type="number"
                          placeholder="No. of Shareholders"
                          className="formcontrol orangeForm required number2 form-input"
                        />

                        <label htmlFor="name" className="form-label1">
                          No of Shareholders
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter number of Shareholders
                        </small>
                      </Form.Group>
                      <Row className="px-3">
                        <small className="notevalue bolder text-primary">Note: The number of shareholders must not include any individuals who also serve as directors of the company.</small>
                      </Row>
                    </div>
                    <div className="">
                      {renderShareholderDynamicForms()}
                    </div>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="mainss justify-content-center">
            <Row>
              <Col className="col-lg-12">
                <Button
                  className="d-block nextBtnDirector"
                  variant="primary"
                  onClick={(e)=>{
                    if (validator.error_input_validation("shareholder_List")) {
                      
                      handleSubmitShareHolder(e)
                    }
                  }
                }
                >
                  Submit
                </Button>
              </Col>
            </Row>
            </Modal.Footer>
              <Row></Row>
        </Modal>
      </section>
    </>
  );
}
