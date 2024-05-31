import React, { useEffect,useState } from 'react'
import fifth5 from "../../../assets/images/YellowVector.svg";
import logo1 from "../../../assets/images/Logo-LR.png";

import { Container,Row,Col,Form } from 'react-bootstrap';
import Select from "react-select";
import { CommonConstants } from '../../../Constants/common.constants';
import axios from 'axios';
import D_S_UploadFiles from "../UploadFiles/DirectororSharHolderUploadFileDocument";

export default function DirectororSharholderUploadFile() {
  const crypto = require('crypto-js');
    const addressRegex = /^(\d+[A-Za-z]*|[A-Za-z]+\d+|\d+)[\/A-Za-z,]*\s+[A-Za-z\s]+$/;
    
    const [Idtypes, setIdtypes] = useState([])
    const [IdAuthority, setIdAuthority] = useState([]);
    const [Nationality, setNationality] = useState([]);
    const [Occupation, setOccupation] = useState([]);
    const [D_States, setD_States] = useState([]);
    const [Country, setCountry] = useState([]);
    const [FrontImage, setFrontImage] = useState();
    const [BackImage, setBackImage] = useState();
    const [UploadedImages, setUploadedImages] = useState();
    const [DirectorDetails, setDirectorDetails] = useState();
console.log(FrontImage,"Front Image", ":", BackImage ,"back Image")
    const [isSearchable, setIsSearchable] = useState(true);
    const [isSearchable1, setIsSearchable1] = useState(true);

    const [ValidIdType,setValidIdType] = useState('0')
    const [ValidIdAuthority,setValidIdAuthority] = useState('0')
    const [ValidOccupation,setValidOccupation] = useState('0')
    const [Validnationality,setValidnationality] = useState('0')
    const [KYCNationality,setKYCNationality] = useState('')
    const [countrySelected, setcountrySelected] = useState('0');

    const [SubarbCity,setSubarbCity] = useState('')
    const [AState,setState] = useState('')
    const [PostalZipcode,setPostalZipcode] = useState('')
    const [StreetNumber, setStreetNumber] = useState("");
    const [image,setimage] = useState('')
    const [CountryId,setCountryId] = useState('')
    const [CountryName,setCountryName] = useState('')
    const [Countryiso3,setCountryiso3] = useState('')
    const [Director_Id,setDirector_Id] = useState('')

    const [Director_Name,setDirector_Name] = useState('')
    const [DOB,setDOB] = useState('')
    const [DOE,setDOE] = useState('')
    const [DocumentId,setDocumentId] = useState('')
    const [CardNumber,setCardNumber] = useState('')

    const [isAddressValid, setIsAddressValid] = useState(true);
    const [UploadDocumentDetails, setUploadDocumentDetails] = useState(false);
    const [IndividualUserIdType,setIndividualUserIdType]=useState('Aadhar Card')
    const [Valid,setValid] = useState(false)
    useEffect(()=>{
        GetAllCountrys()
        GetAllNationality()
        GetAllOccupation()//
        GetDirectorDetails()
    },[])

    useEffect(()=>{
      if(countrySelected != '0'){
        GetIdTypeByCountryId()//
        GetNationalityIdAuthority()//
        GetAllStates()//
      }else if(KYCNationality != ''){
        GetNationalityIdAuthority()
      }
    },[countrySelected,KYCNationality])
    
    //Auto Address//
    const handlePlaceSelect = (place,DirectorState) => {
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
          streetName = street_number !== '' && street_long_name !== '' ? street_number + ' ' + street_long_name : place.formatted_address.split(",")[0].trim()
          
          console.log(DirectorState)
          var matchedState = DirectorState.find((stateItem) => stateItem.name == state);
          console.log(
            
            DirectorState.find((stateItem) => stateItem.name == state)
          )
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

    //Id Type//
    const GetIdTypeByCountryId = async (values) => {
        try {
          const IdData = {
            countryId: CountryId
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

    const handleDataIdTypeIndividual = (e) => {
        setValidIdType(e)
      };

      const handleDataissueAuthority = (e) => {
        setValidIdAuthority(e)
      };

      const handleDataStepSelectOccupation = (e) => {
        setValidOccupation(e)
        // setOccup(e.value)
      };

      const handlenationality = (e) => {
        setValidnationality(e)
        setKYCNationality(e.value)
      };

      //Authority//
      const GetNationalityIdAuthority = async (values) => {
        // 
        try {
          const NationalityName = {
            nationality: Validnationality.value,
            countryId:CountryId
          };
          const response = await axios.post(
            CommonConstants.BASE_URL + "/getissueauthoritybynationality",
            NationalityName
          );
          if (response.data.status === true) {
            const optionsForState = response.data.data.map((States) => ({
              value: States.id,
              label: States.authorityName
            }));
            setIdAuthority(optionsForState);
          }
        } catch (err) {
          console.log(err)
        }
      };

      //nationality//
      const GetAllNationality = async (values) => {
        try {
          const response = await axios.get(
            CommonConstants.BASE_URL + "/getallnationality"
          );
          // // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
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
          } else if (response.data.status === "error") {
            // console.log(response.data.message)
          }
        } catch (err) {
          // console.log(err)
        }
      };

            //nationality//
      const GetDirectorDocument = async (values) => {
        try {
          const Director_Id={
            directorId:9543
          }
          const response = await axios.post(
            CommonConstants.BASE_URL + "/getdirectorsdocuments",Director_Id
          );
          if (response.data.status === true) {
            console.log(response.data.data)
          }
        } catch (err) {
          console.log(err)
        }
      };

      //nationality//
      const GetDirectorDetails = async (values) => {
        try {
          const queryParams = new URLSearchParams(window.location.search);
          const encryptedText = queryParams.get("id");

          const formData = new FormData();
          formData.append(
            "directorId", encryptedText
          );

          const config = {
            method: "POST",
            url: CommonConstants.BASE_URL + "/getdirectorbyid",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData,
          };
  
          axios(config)
            .then(function (response) {
              if (response.data.status === true) {
                console.log(response.data.data, "UpdatedData");
                setDirectorDetails(response.data.data)
                const Director_Id={
                  directorId:response.data.data.id
                }
                const Imageresponse = axios.post(
                  CommonConstants.BASE_URL + "/getdirectorsdocuments",Director_Id
                );
                Imageresponse.then((res)=>{
                  console.log(res.data.data,"getdirectorsdocuments")
                  setUploadedImages(res.data.data)
                }).catch((err)=>{
                  console.log(err)
                })
                // if (response.data.status === true) {
                //   console.log(response.data.data)
                // }
              }
            })
            .catch(function (error) {
              console.log(error)
            });
        } catch (err) {
          console.log(err)
        }
      };

      //Occupation//
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
          }
        } catch (err) {
          // console.log(err)
        }
      };

      //States//
      const GetAllStates = async (values) => {
        try {
          const C_Id = {
            id: CountryId
          };
          const response = await axios.post(
            CommonConstants.BASE_URL + "/getallstatebycountryid",
            C_Id
          );
          if (response.data.status === true) {
            console.log(response.data.data,"UseEffect Method")
            setD_States(response.data.data);

            var countryname = Countryiso3
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
            handlePlaceSelect(place,response.data.data);
          });
        }
          }
        } catch (err) {
          console.log(err)
        }
      };

      //selectCountry//
      const GetAllCountrys = async (values) => {
        try {
          const response = await axios.get(
            CommonConstants.BASE_URL + "/getallcountries"
          );
          if (response.data.status === true) {
            const optionsForCountry = response.data.data.map((countryname) => ({
              value:
                countryname.id +
                " " +
                countryname.name +
                " " +
                countryname.iso3,
              label: countryname.name,//countryname.emoji + " " +countryname.name,
              image:`https://flagcdn.com/16x12/${countryname.iso2?.toLowerCase()}.png`,//countryname.iso2.toUpperCase()
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
        } catch (err) {}
      };


      const CountryDataStep1 = (e) => {
        setcountrySelected(e)
        setimage(e.iso2)
        let arr = e?.value.split(" ");
        setCountryId(arr[0])
        setCountryName(arr[1])
        setCountryiso3(arr[2])
      };

      const CustomOption = ({ innerProps, label, data }) => (
        <div {...innerProps} style={{ paddingLeft: '10px', paddingBottom: '8px', paddingTop: '8px' }}>
          <img src={data.image} alt={label} style={{ width: '20px', marginRight: '5px' }} />
          {label}
        </div>
      );

      ////Upload Director Details////
      const DetailsUpload = async()=>{
        if(ValidIdType =='0'){
          setValid(true)
        }else if(ValidIdAuthority =='0'){
          setValid(true)
        }else if(ValidOccupation =='0'){
          setValid(true)
        }else if(Validnationality =='0'){
          setValid(true)
        }else if(countrySelected =='0'){
          setValid(true)
        }else if(SubarbCity ==''){
          setValid(true)
        }else if(AState ==''){
          setValid(true)
        }else if(PostalZipcode ==''){
          setValid(true)
        }else if(StreetNumber ==''){
          setValid(true)
        }else if(DOB ==''){
          setValid(true)
        }else if(DOE ==''){
          setValid(true)
        }else if(DocumentId ==''){
          setValid(true)
        }else if(CardNumber ==''){
          setValid(true)
        }else{
          try {

            const formData = new FormData();
            formData.append("directorId", DirectorDetails && DirectorDetails.id);
            formData.append("typeId", ValidIdType.value);
            formData.append("countryId", CountryId);
            formData.append("streetName", StreetNumber);
            formData.append("stateId", AState);
            formData.append("suburb", SubarbCity);
            formData.append("zipCode", PostalZipcode);
            formData.append("occupationId", ValidOccupation.value);
            formData.append("nationality", Validnationality.value);
            formData.append("idNumber", DocumentId);
            formData.append("cardNumber", CardNumber);
            formData.append("dob", DOB);
            formData.append("documentValidity", DOE);
            formData.append("issuingAuthorityId", ValidIdAuthority.value);
            for (let i = 0; i < FrontImage.length; i++) {
              formData.append("frontDocument", FrontImage[i]);
            }
            for (let i = 0; i < BackImage.length; i++) {
              formData.append("backDocument", BackImage[i]);
            }
            // formData.append("frontDocument", FrontImage);
            // formData.append("backDocument", BackImage);
  
            const config = {
              method: "POST",
              url: CommonConstants.BASE_URL + "/uploaddirectorsdocuments",
              headers: { "Content-Type": "multipart/form-data" },
              data: formData,
            };
    
            axios(config)
              .then(function (response) {
                if (response.data.status === true) {
                  console.log(response.data.data, "Success");
                  // setDirectorDetails(response.data.data)
                }
              })
              .catch(function (error) {
                console.log(error)
              });
          } catch (err) {
            console.log(err)
          }
        }

      }

    /////////Expiry date inputs////////
    const currentDate = new Date(); // Current date
    const tomorrowDate = new Date(currentDate); // Create a new date object with the current date
    tomorrowDate.setDate(currentDate.getDate() + 1); // Add 1 day to the current date
    
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
    
    /////////date of Birth ////////
    
    const MaxDate1  = new Date();
    MaxDate1.setFullYear(MaxDate1.getFullYear() - 18);
    const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    const minDate = new Date(currentDate.getFullYear() - 100, 0, 1);

    
  const imageData = (imagee,image2) => {
    setFrontImage(imagee);
    setBackImage(image2);
  };

  const onSubmit = async () => {
      // const queryParams = window.location.pathname
      // const queryParams = new URLSearchParams(window.location.search)
      // // const queryParams = new URLSearchParams("https://testapi.gvmtechnologies.com/uploaddocument/$2a$10$Th8cVyWOQDif13bbW9SB6OatBAF/xyUqPzV2ZQ1knxOgArrF92rZK")
      // var Data=queryParams.get("id")
      // console.log(queryParams.get("id"))
      // console.log(window.location.search)

      // const encryptedText = queryParams.get("id"); // Replace '...' with your actual encrypted data
      // const secretKey = '0dacf2d2882e8d79ebb5497a286f7878'; // Replace '...' with your actual secret key
  
      // const decrypted = CryptoJS.AES.decrypt(encryptedText, secretKey);
      // const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      
      // console.log(decryptedText,"decryptedText")
  
  };

  return (
    <div>
        <section>
        <Container>
          {/* <p>Hi there {props.name}</p> */}
          <div className=" jj mt-5 mb-5">
            <div className="box row d-flex p-0 m-0 ">
              

              <Row className=" ms-0">
                <div className="col-lg-12 p-0 pb-5">
                  <div className="step-component">
                    
                    <div className=" text-white text-center bolder ">
                        <img src={logo1} className='py-4 img-fluid'/>
                    </div>
                    <Container fluid>
                    {/* {loadervalue == true ? <Loader /> : ""} */}
                    <Row>
                        <Col className="col-lg-12 p-0">
                        <div className="mt-3 pe-4 ps-4 ">
                            <Row id="stepone3in1">
                            <div className="text-center">
                                <h4 className="text-center text-black mb-4">
                                Submit KYC Documents
                                </h4>
                            </div>
                            <Form id="Individual_KYC_step3" className={UploadDocumentDetails==false ? 'd-block' : 'd-none'}>

                            <Row className="mb-3">
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
                                        <img src={`https://flagcdn.com/40x30/${image?.toLowerCase()}.png`} alt={image} style={{ width: '20px' }} />
                                    </div>
                                    :
                                    ''
                                }
                                <Select
                                  // name="bankId"
                                  id="country"
                                  options={Country}
                                  className="responsiveFontLarge nationality SelectValueSelect1 SelectHoverLabel required"
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
                                {countrySelected == '0' && Valid == true && (
                                    <small className="error-message text-danger">Please Select The Country</small>
                                    )}
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
                                    <i className="purpleText main fa fa-user "></i>
                                    <Form.Control
                                    type="text"
                                    placeholder="Full Name"
                                    value={DirectorDetails && DirectorDetails.name}
                                    readOnly
                                    //   onChange={handleDataStep2}
                                    //   value={step1value.Business_Fullname}
                                    name="Business_Fullname"
                                    className=" formControlStep2 required form-input"
                                    />
                                    <label className="form-label1">
                                    Full Name
                                    </label>
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    Please Enter Your Full Name
                                    </small>
                                    {/* {countrySelected == '0' && Valid == true && (
                                    <small className="error-message text-danger">Please Select The Country</small>
                                    )} */}
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    className="left-inner-addon input-container "
                                >
                                    <i className="purpleText mainStep3 	fa fa-home "></i>
                                    <Form.Control
                                    type="text"
                                    ref={autocompleteRef}
                                    placeholder="House No & Street Name"
                                    onChange={(e) => {
                                        setStreetNumber(e.target.value);
                                    }}
                                    value={StreetNumber}
                                    name="IndidualStreetName"
                                    className={`form-input formControlStep2 required 
                                    ${
                                        !isAddressValid ? 'error-border' : ''
                                    }`}
                                    />
                                    {!isAddressValid && (
                                    <small className="error-message text-danger">Invalid address. Please select and search proper address which contains house number and street name.</small>
                                    )}
                                    {StreetNumber == '' && Valid == true && (
                                    <small className="error-message text-danger">Please Select The Country</small>
                                    )}
                                    <label htmlFor="name" className="form-label1">
                                    House No & Street Name
                                    </label>
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    Please Enter The House No & Street Name
                                    </small>
                                </Form.Group>
                                </Row>

                                {/* <Row className="mb-3 respoChildFooter">
                          
                                </Row> */}

                                <Row className="mb-3 respoChildFooter">
                                <Form.Group
                                    as={Col}
                                    className="left-inner-addon input-container "
                                >
                                    <i className="purpleText mainStep3 fa fa-map-marker "></i>
                                    <Form.Control
                                    type="text"
                                    placeholder="Suburb/City"
                                    value={SubarbCity}
                                    onChange={(e) => {
                                        setSubarbCity(e.target.value)
                                    }}
                                    name="IndidualCity"
                                    className="form-input cityvalidation formControlStep2 required"
                                    />
                                    <label htmlFor="name" className="form-label1">
                                    Suburb/City
                                    </label>
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    Please Enter The Suburb/City
                                    </small>
                                    <small className="responsiveFontLarge  d-none text-danger error_message_city ms-2 error">
                                    Not add number in Suburb/City
                                    </small>
                                </Form.Group>
                                </Row>

                                <Row className="mb-3 respoChildFooter">
                                <Form.Group
                                    as={Col}
                                    className="left-inner-addon input-container "
                                >
                                    <i className="purpleText mainStep3 fa fa-map-marker "></i>
                                    <Form.Select
                                    className="RadiusDropList1 required form-input bg-transparent"
                                    onChange={(e)=> {setState(e.target.value);}}
                                    name="IndidualState"
                                    value={AState}
                                    >
                                    <option value="">State</option>
                                        {D_States &&
                                            D_States.map((States, index) => {
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
                                    <i className="purpleText mainStep3 fa fa fa-envelope "></i>
                                    <Form.Control
                                    type="number"
                                    placeholder="Postal / Zip Code"
                                    value={PostalZipcode}
                                    onChange={(e)=>{setPostalZipcode(e.target.value)}}
                                    name="IndidualZip"
                                    className="form-input formControlStep2 required number"
                                    />
                                    <label htmlFor="name" className="form-label1">
                                    Postal / Zip Code
                                    </label>
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    Please Enter The Postal / Zip Code
                                    </small>
                                    <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
                                    Please Enter Valid number
                                    </small>
                                </Form.Group>
                                </Row>
                                <div className='parent-container'>
                                <Row className="mb-3 respoChildFooter">
                                <Form.Group
                                    as={Col}
                                    className="OccupationSelect input-container "
                                >
                                    <i className="purpleText OccupationIcon fa fa-briefcase "></i>

                                    <Select
                                    name="IndidualOccupation"
                                    options={Occupation}
                                    className="SelectValueSelect1  SelectHoverLabel required nationality"
                                    closeMenuOnSelect={true}
                                    isSearchable={isSearchable1}
                                    onChange={(e)=>{handleDataStepSelectOccupation(e)}}
                                    />
                                    <label style={{zIndex:0}} htmlFor="name" className="form-label1">
                                    Occupation
                                    </label>
                                    {ValidOccupation == '0' && Valid == true && (
                                    <small className="error-message text-danger">Please Select The Occupation</small>
                                    )}
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    Please Select The Occupation
                                    </small>
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    className="OccupationSelect input-container "
                                >
                                    <i className="purpleText OccupationIcon 	fa fa-flag svgNationality"></i>
                                    <Select
                                    name="IndidualNationality"
                                    options={Nationality}
                                    className="SelectValueSelect1 SelectHoverLabel required nationality"
                                    closeMenuOnSelect={true}
                                    isSearchable={isSearchable1}
                                    onChange={handlenationality}
                                    />
                                    {Validnationality == '0' && Valid == true && (
                                        <small className="error-message text-danger">Please select Nationality</small>
                                    )}
                                    <label style={{zIndex:0}} htmlFor="name" className="form-label1">
                                    Nationality
                                    </label>
                                </Form.Group>
                                </Row>
                                      </div>
          

                                {/* ////////////////////Id Details////////////////// */}
                                <div className='parent-container'>
                                <Row className="mb-3 ">
                                    <Form.Group
                                    as={Col}
                                    className="OccupationSelect input-container bg-transparent"
                                    >
                                    <i className="purpleText OccupationIcon fa fa-id-card "></i>
                                    <Select
                                        name="IndidualIDType"
                                        options={Idtypes}
                                        className="SelectValueSelect1 SelectHoverLabel required nationality bg-transparent"
                                        closeMenuOnSelect={true}
                                        isSearchable={isSearchable1}
                                        onChange={(e)=>{handleDataIdTypeIndividual(e)}}
                                    />
                                    {ValidIdType == '0' && Valid == true && (
                                        <small className="error-message text-danger">Please select Nationality</small>
                                    )}
                                    <label style={{zIndex:0}} htmlFor="name" className="form-label1">
                                        ID Type
                                    </label>
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                        Please Select The Id Type
                                    </small>
                                    </Form.Group>
                                </Row>
                                  </div>
                                <Row className="mb-3 respoChildFooter">
                                    <Form.Group
                                    as={Col}
                                    className="left-inner-addon input-container "
                                    >
                                    <i className="purpleText mainStep4 fa fa-id-card "></i>
                                    <Form.Control
                                        type="number"
                                        placeholder="ID Number"
                                        onChange={(e)=>{setDocumentId(e.target.value)}}
                                        name="IndidualIDNumber"
                                        className="formControlStep2 required number1 form-input"
                                    />
                                    <label htmlFor="name" className="form-label1">
                                        ID Number
                                    </label>
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                        Please Enter The ID Number
                                    </small>
                                    <small className="responsiveFontLarge  d-none text-danger error_message error_message_number1 ms-2">
                                        Please Enter Valid number
                                    </small>
                                    </Form.Group>
                                    <Form.Group
                                    as={Col}
                                    className="left-inner-addon input-container "
                                    >
                                    <i className="purpleText mainStep4 fa fa-id-card "></i>
                                    <Form.Control
                                        type="number"
                                        placeholder="Card Number"
                                        onChange={(e)=>{setCardNumber(e.target.value)}}
                                        name="IndidualCardNumber"
                                        className="formControlStep2 cardnumber form-input"
                                    />
                                    <label htmlFor="name" className="form-label1">
                                        Card Number
                                    </label>
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                        Please Enter The Card Number
                                    </small>
                                    <small className="responsiveFontLarge  d-none text-danger error_message error_message_number2 ms-2">
                                        Please Enter Valid number
                                    </small>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3 respoChildFooter">
                                    <Form.Group
                                    as={Col}
                                    className="left-inner-addon input-container "
                                    >
                                    <i className="purpleText mainStep4 fa fa-calendar "></i>
                                    <Form.Control
                                        type="date"
                                        onChange={(e)=>{setDOB(e.target.value)}}
                                        max={maxDate.toISOString().split('T')[0]}
                                        min={minDate.toISOString().split('T')[0]}
                                        name="IndidualDOB"
                                        placeholder="Date of Birth"
                                        className="form-input formControlStep2 required "
                                    />
                                    <label htmlFor="name" className="form-label1">
                                        Date of Birth
                                    </label>
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                        Please Enter The Date of Birth
                                    </small>
                                    </Form.Group>

                                    <Form.Group
                                    as={Col}
                                    className="left-inner-addon input-container "
                                    >
                                    <i className="purpleText mainStep4 fa fa-calendar"></i>
                                    <Form.Control
                                        type="date"
                                        onChange={(e)=>{setDOE(e.target.value)}}
                                        min={formattedDate}
                                        name="IndidualIDExpiry"
                                        placeholder="Date of ID Expiry"
                                        className="formControlStep2 required form-input"
                                    />
                                    <label htmlFor="name" className="form-label1">
                                        Date of ID Expiry
                                    </label>
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                        Please Enter The Expiry Date
                                    </small>
                                    </Form.Group>
                                </Row>
                                <div className='parent-container'>
                                <Row className="mb-3 respoChildFooter">
                                    <Form.Group
                                    as={Col}
                                    className="bg-transparent OccupationSelect  input-container "
                                    >
                                    <i className="purpleText OccupationIcon fas fa-landmark"></i>
                                    <Select
                                        name="IndividualIDIssuingAuthority"
                                        options={IdAuthority}
                                        className="bg-transparent SelectValueSelect1 SelectHoverLabel required nationality"
                                        closeMenuOnSelect={true}
                                        isSearchable={isSearchable1}
                                        onChange={(e)=>{handleDataissueAuthority(e)}}
                                    />
                                    {ValidIdAuthority == '0' && Valid == true && (
                                        <small className="error-message text-danger">Please Select The ID Issuing Authority</small>
                                    )}
                                    <label style={{zIndex:0}} htmlFor="name" className="form-label1">
                                        ID Issuing Authority
                                    </label>
                                    </Form.Group>
                                </Row>
                                </div>
                            </Form>

                            <Form id="Individual_KYC_step3" >
                                <Row id="stepone5in1" >
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
                                                <D_S_UploadFiles
                                                    // RunningStep={activestepkey}
                                                    imageData={imageData}
                                                    // Update_Step={UpdateStep}
                                                    I_UserIdType={IndividualUserIdType}
                                                ></D_S_UploadFiles>
                                                </Col>
                                            </Col>
                                            </Row>
                                        </Form>
                                          <section className={UploadedImages ? 'd-block' : 'd-none'}>
                                            <Row>
                                              <div className="bolder ms-2 text-black text-center">Uploaded Document</div>
                                              <Col>
                                                <div className="bolder ms-2 text-black">ID Front view</div>
                                                <div className="images">
                                                        <div className="image position relative">
                                                          <div className="img-box effect-image-1">
                                                            <img src={UploadedImages?.idFrontView} height="100" width="200" className="hoverView uploadedImage roundedCorner" alt="upload" />
                                                            <div class="overlay simple-overlay roundedCorner">
                                                            </div>
                                                          </div>

                                                        </div>
                                                </div>
                                              </Col>
                                              <Col>
                                                <div className="bolder ms-2 text-black">ID Back view</div>
                                                <div className="images">
                                                        <div className="image position relative">
                                                          <div className="img-box effect-image-1">
                                                            <img src={UploadedImages?.idBackView} height="100" width="200" className="hoverView uploadedImage roundedCorner" alt="upload" />
                                                            <div class="overlay simple-overlay roundedCorner">
                                                            </div>
                                                          </div>

                                                        </div>
                                                </div>
                                              </Col>
                                            </Row>
                                            </section>
                                        </div>
                                    </Col>
                                </Row>
                                </Form>
                            </Row>
                        </div>
                        </Col>
                    </Row>
                    </Container>
                      
                  </div>

                  <div
                    className={`btn-component "d-flex justify-content-center"`}
                  >
                      <input
                        className={` uppercase nextButtonStep1 w-auto`}
                        type="button"
                        value={"Upload Documnet"}
                        // onClick={(e)=> {DetailsUpload(e)}}onSubmit
                        onClick={(e)=> {DetailsUpload(e)}}
                      />
                  </div>
                </div>
              </Row>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
