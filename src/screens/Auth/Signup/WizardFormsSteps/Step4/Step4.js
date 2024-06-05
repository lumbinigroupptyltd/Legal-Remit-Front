import React, { useContext, useState, useEffect } from 'react'
import './Step4.scss'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import '../../../../Helpers/CountryDropdown/flags.css'
import ReactFlagsSelect from 'react-flags-select'
import UploadFiles from '../../../../Helpers/UploadFiles/Individual_File_Upload'
import Modal from 'react-bootstrap/Modal'
import blueVector from '../../../../../assets/images/blueVector.svg'
import userContext from '../../Signupdata/Usecontext'
import { CommonConstants } from '../../../../../Constants/common.constants'
import { isMobile, isTablet } from 'react-device-detect'
import axios from 'axios'
// import { Dropdown,DropdownButton } from "react-bootstrap";
import Select from 'react-select'
import Loader from '../../../../Loader/Loader'

const validator = require('../../../../../assets/js/validator')


export default function Step4 ({
                                 Name,
                                 StepUfourpopup,
                                 activestepkey,
                                 B_A_activestepkey,
                                 handleid,
                                 ScantakId_I,
                                 ScantakLink_I,
                                 R_ID,
                                 B_ID,
                                 K_ID,
                                 I_ID,
                                 UpdateStep,
                                 GoNextStep,
                                 GoNextStepBA,
                                 CountryID,
                                 UserIdType,
                                 StepBlank
                               }) {
  const {Countrydata} = useContext(userContext)
  const [Ishow, setIShow] = useState(false)

  const handleIClose = () => setIShow(false)
  const handleIShow = () =>
    Countrydata.CountryId === '14' ? setIShow(StepUfourpopup) : setIShow(false)

  const [select, setSelect] = useState('AU')
  const onSelect = (code) => setSelect(code)
  const [loadervalue, setloadervalue] = useState(false)

  const [idVerifyed, setidVerifyed] = useState(false)
  const [scantekVerify, setscantekVerify] = useState(false)
  const [IdverifyedSuccess, setIdverifyedSuccess] = useState(false)

  const [Occupation, setOccupation] = useState([])
  const [Nationality, setNationality] = useState([])
  const [birthdate, setBirthdate] = useState('')
  const [IdAuthority, setIdAuthority] = useState([])
  const [IdAuthoritySubtype, setIdAuthoritySubtype] = useState([])
  const [DigitalIdAuthority, setDigitalIdAuthority] = useState([]) ///
  const [ExistUser, setExistUser] = useState(false)
  const [ExistUserMessage, setExistUserMessage] = useState('')

  // const {Data}=userContext
  const [step4value, setstep4value] = useState({
    IndidualIDType: '',
    IndidualIDNumber: '',
    IndidualCardNumber: '',
    IndidualDOB: '',
    IndidualIDExpiry: '',
    IndividualIDIssuingAuthority: '',

    Business_Nationality: '',
    Business_StreetName: '',
    Business_City: '',
    Business_State: '',
    Business_Zip: '',
    Business_Occupation: '',
    Business_Residence: '',

    Agent_Nationality: '',
    Agent_StreetName: '',
    Agent_City: '',
    Agent_State: '',
    Agent_Zip: '',
    Agent_Occupation: '',
    Agent_Residence: ''
  })

  // console.log(step4value,"step4value")

  const [IScantakDataID, setIScantakDataID] = useState('')
  const [IScantakDataLink, setIScantakDataLink] = useState('')

  const [step4ScantakDatavalue, setstep4ScantakDatavalue] = useState({
    Individual_ScantakID: '',
    Individual_ScantakLink: ''

    // Business_ScantakID: BScantakDataID,
    // Business_ScantakLink: BScantakDataLink,

    // Agent_ScantakID: AScantakDataID,
    // Agent_ScantakLink: AScantakDataLink
  })

  const {data2} = useContext(userContext)

  const {setData4} = useContext(userContext)
  const {data4} = useContext(userContext)
  const {data3} = useContext(userContext)

  const handleDataStep4 = (event) => {

    const {name, value} = event.target
    setstep4value({...step4value, [name]: value})
    // setData(step3value)
  }

  const handleBDataStepSelect4 = (e) => {
    setValidBnationality(e)
    setKYCNationality(e.value)
    setstep4value((prevState) => ({
      ...prevState,
      Business_Nationality: e.value
    }))
  }

  const handleADataStepSelect4 = (e) => {
    setValidAnationality(e)
    setAKYCNationality(e.value)
    setstep4value((prevState) => ({
      ...prevState,
      Agent_Nationality: e.value
    }))
  }

  const [Country, setCountry] = useState([])
  const [States, setStates] = useState([])
  const [StatesAgent, setStatesAgent] = useState([])

  useEffect(() => {
    if (Name == 'Individual') {
      if (activestepkey === 'fourthStep') {
        if (
          (isMobile || isTablet) &&
          (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/iPhone|iPad|iPod/i))
        ) {
          handleIShow()
        } else {
          handleIClose()
        }
      }
    }
  }, [Name, handleid])

  // google map code start
  const [StreetNumber, setStreetNumber] = useState('')
  const [city, setcity] = useState('')
  const [PostalCode, setPostalCode] = useState('')
  const [StreetNumber2, setStreetNumber2] = useState('')
  const [city2, setcity2] = useState('')
  const [PostalCode2, setPostalCode2] = useState('')

  const [KYCNationality, setKYCNationality] = useState('')
  const [StreetName, setStreetName] = useState('')
  const [SubarbCity, setSubarbCity] = useState('')
  const [State, setState] = useState('')
  const [PostalZipcode, setPostalZipcode] = useState('')
  const [Occup, setOccup] = useState('')
  const [Recidence, setRecidence] = useState('Yes')
  const [AutoTimeZone, setAutoTimeZone] = useState('')

  const [AKYCNationality, setAKYCNationality] = useState('')
  const [AStreetName, setAStreetName] = useState('')
  const [ASubarbCity, setASubarbCity] = useState('')
  const [AState, setAState] = useState('')
  const [APostalZipcode, setAPostalZipcode] = useState('')
  const [AOccup, setAOccup] = useState('')
  const [ARecidence, setARecidence] = useState('Yes')
  const addressRegex = /^(\d+[A-Za-z]*|[A-Za-z]+\d+|\d+)[\/A-Za-z,]*\s+[A-Za-z\s]+$/
  const [isAddressValid, setIsAddressValid] = useState(true)
  const [isAddressValid2, setIsAddressValid2] = useState(true)

  const handlePlaceSelect = async (place) => {
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }
    const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${Date.now() / 1000}&key=AIzaSyCNJRR1zkMpq2RLpT6bM2BLAO2kEDZ8qtA`)
    const data = await response.json()
    console.log(data.timeZoneId, 'TimeZone')
    setAutoTimeZone(data.timeZoneId)
    var TemArray = place.address_components
    //const isValid = addressRegex.test(place.name);
    var isValid = true
    var streetName = ''
    var street_number = ''
    var street_long_name = ''
    var postal_code = ''
    var city = ''
    var state = ''

    setstep4value((prevState) => ({
      ...prevState,
      Business_StreetName: '',
      Business_City: '',
      Business_Zip: '',
      Business_State: ''
    }))

    setPostalZipcode('')
    setState('')
    setSubarbCity('')
    setStreetName('')
    console.log(place)
    if (isValid) {
      TemArray.map((item, index) => {
        item.types.map((titem) => {
          street_number = titem === 'street_number' ? item.long_name : street_number
          street_long_name = titem === 'route' ? item.long_name : street_long_name
          postal_code = titem === 'postal_code' ? item.long_name : postal_code
          city = titem === 'locality' ? item.long_name : city
          state = titem === 'administrative_area_level_1' ? item.long_name : state
        })
      })

      streetName = street_number !== '' && street_long_name !== '' ? street_number + ' ' + street_long_name : place.formatted_address.split(',')[0].trim()
      setstep4value((prevState) => ({
        ...prevState,
        Business_City: city,
        Business_Zip: postal_code,
        Business_State: state,
        Business_StreetName: streetName
      }))
      const matchedState = States.find((stateItem) => stateItem.name === state)
      if (matchedState) {
        setState(matchedState.id)
      }
      setSubarbCity(city)
      setPostalZipcode(postal_code)
      setStreetName(streetName)
    }
    setIsAddressValid(isValid)
    return isValid
  }

  const autocompleteRef = React.useRef(null)


  const handlePlaceSelect2 = async (place) => {
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }
    const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${Date.now() / 1000}&key=AIzaSyCNJRR1zkMpq2RLpT6bM2BLAO2kEDZ8qtA`)
    const data = await response.json()
    setAutoTimeZone(data.timeZoneId)
    var TemArray = place.address_components
    //const isValid = addressRegex.test(place.name);
    var isValid = true
    var streetName = ''
    var street_number = ''
    var street_long_name = ''
    var postal_code = ''
    var city = ''
    var state = ''

    setstep4value((prevState) => ({
      ...prevState,
      Agent_StreetName: '',
      Agent_City: '',
      Agent_Zip: '',
      Agent_State: ''
    }))

    setAPostalZipcode('')
    setAState('')
    setASubarbCity('')
    setAStreetName('')
    if (isValid) {
      TemArray.map((item, index) => {
        item.types.map((titem) => {
          street_number = titem === 'street_number' ? item.long_name : street_number
          street_long_name = titem === 'route' ? item.long_name : street_long_name
          postal_code = titem === 'postal_code' ? item.long_name : postal_code
          city = titem === 'locality' ? item.long_name : city
          state = titem === 'administrative_area_level_1' ? item.long_name : state
        })
      })

      streetName = street_number !== '' && street_long_name !== '' ? street_number + ' ' + street_long_name : place.formatted_address.split(',')[0].trim()
      setstep4value((prevState) => ({
        ...prevState,
        Agent_City: city,
        Agent_Zip: postal_code,
        Agent_State: state,
        Agent_StreetName: streetName
      }))
      const matchedState = States.find((stateItem) => stateItem.name === state)
      if (matchedState) {
        setAState(matchedState.id)
      }
      setASubarbCity(city)
      setAPostalZipcode(postal_code)
      setAStreetName(streetName)
    }
    setIsAddressValid2(isValid)
    return isValid
  }












  
  const autocompleteRef2 = React.useRef(null)

  // google map code end

  useEffect(() => {
    ScantakId_I(IScantakDataID)
    ScantakLink_I(IScantakDataLink)

    // console.log(step4value, "step4value")
    // google map code start
    var countryname = Countrydata.Countryiso3
    if (!countryname == '') {
      const options = {
        componentRestrictions: {country: `${countryname}`}
      }
      const autocomplete = new window.google.maps.places.Autocomplete(
        autocompleteRef.current,
        options
      )
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        handlePlaceSelect(place)
      })

      const autocomplete2 = new window.google.maps.places.Autocomplete(
        autocompleteRef2.current,
        options
      )
      autocomplete2.addListener('place_changed', () => {
        const place = autocomplete2.getPlace()
        handlePlaceSelect2(place)
      })
    }

    // google map code end

    GetNationalityIdAuthority()
    setData4(step4value)
    if (Name == 'Individual') {
      if (activestepkey === 'fourthStep') {
        handleid('Individual_id_Details_step4')
        // handleIShow()
      }
      document.getElementById('stepone1').style.display = 'block'
      document.getElementById('steptwo2').style.display = 'none'
      document.getElementById('stepthree3').style.display = 'none'
    } else if (Name == 'Business') {
      if (B_A_activestepkey === 'fourthStep') {
        handleid('Bussiness_KYC_step4')
        // handleIShow()
      }
      document.getElementById('stepone1').style.display = 'none'
      document.getElementById('steptwo2').style.display = 'block'
      document.getElementById('stepthree3').style.display = 'none'
    } else {
      if (B_A_activestepkey === 'fourthStep') {
        handleid('Agent_KYC_step4')
        // handleIShow()
      }
      document.getElementById('stepone1').style.display = 'none'
      document.getElementById('steptwo2').style.display = 'none'
      document.getElementById('stepthree3').style.display = 'block'
    }
  }, [
    Name,
    StepUfourpopup,
    handleid,
    idVerifyed,
    setidVerifyed,
    scantekVerify
  ])

  useEffect(() => {
    if (UpdateStep == 'IthirdStep' || UpdateStep == 'BthirdStep' || UpdateStep == 'AthirdStep') {
      GetAllCountrys()
      GetAllOccupation()
      GetAllNationality()
    }
  }, [UpdateStep])

  useEffect(() => {
    // GetIdTypeByCountryId()
    if (UpdateStep == 'IfourthStep') {
      handleUpdateDataIndividual()
    } else if (UpdateStep == 'BfourthStep') {
      handleBUpdateDataIndividual()
    } else if (UpdateStep == 'AfourthStep') {
      handleAUpdateDataIndividual()
    }
  }, [UpdateStep, R_ID, B_ID, K_ID, I_ID])

  useEffect(() => {
    GetIdTypeByCountryId()
    GetAllStates()
    GetAllStatesAgent()
  }, [CountryID])

  const GetNationalityIdAuthority = async (values) => {
    try {
      const NationalityName = {
        nationality: data3.IndidualNationality,
        countryId: Countrydata.CountryId
      }
      const response = await axios.post(
        CommonConstants.BASE_URL + '/getissueauthoritybynationality',
        NationalityName
      )
      if (response.data.status === true) {
        const optionsForState = response.data.data.map((States) => ({
          value: States.authorityName,
          label: States.authorityName
        }))
        setIdAuthority(optionsForState)

        // setIdAuthority(response.data.data);
      }
    } catch (err) {
      // console.log(err)
    }
  }
  const [isSearchable, setIsSearchable] = useState(false)

  const GetAllNationality = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + '/getallnationality'
      )
      // // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {
        const optionsForCountry = response.data.data.map((NationalityName) => ({
          value: NationalityName.nationality,
          label: NationalityName.nationality
        }))
        setNationality(optionsForCountry)
        if (response.data.data.length >= 5) {
          setIsSearchable(true)
        } else {
          setIsSearchable(false)
        }
      } else if (response.data.status === 'error') {
        // console.log(response.data.message)
      }
    } catch (err) {
      // console.log(err)
    }
  }

  // const [isSearchable, setIsSearchable] = useState(false);
  const [isSearchable1, setIsSearchable1] = useState(true)
  const GetAllOccupation = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + '/getalloccupations'
      )
      if (response.data.status === true) {
        const optionsForState = response.data.data.map((States) => ({
          value: States.id,
          label: States.name
        }))
        setOccupation(optionsForState)
        // setOccupation(response.data.data);
      } else if (response.data.status === 'error') {
        // console.log(response.data.message)
      }
    } catch (err) {
      // console.log(err)
    }
  }

  const handleDataStepSelectOccupation = (e) => {
    // setKYCNationality(e.value)
    setValidBOccupation(e)
    setOccup(e.value)
    setstep4value((prevState) => ({
      ...prevState,
      Business_Occupation: e.value
    }))
  }

  const handleDataIdTypeIndividual = (e) => {
    setValidIdType(e)
    setstep4value((prevState) => ({
      ...prevState,
      IndidualIDType: e.value
    }))
  }

  const handleDataissueAuthority = (e) => {
    setValidIdAuthority(e)
    setstep4value((prevState) => ({
      ...prevState,
      IndividualIDIssuingAuthority: e.value
    }))
  }


  const handleDataStepSelectOccupation1 = (e) => {
    setValidAOccupation(e)
    setAOccup(e.value)
    setstep4value((prevState) => ({
      ...prevState,
      Agent_Occupation: e.value
    }))
  }

  const GetAllCountrys = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + '/getallcountries'
      )
      // // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {
        // // console.log(response.data.data)
        setCountry(response.data.data)
      } else if (response.data.status === 'error') {
        // console.log(response.data.message)
      }
    } catch (err) {
      // console.log(err)
    }
  }

  const GetAllStates = async (values) => {
    try {
      const CountryId = {
        id: CountryID
      }
      // // console.log(values)
      const response = await axios.post(
        CommonConstants.BASE_URL + '/getallstatebycountryid',
        CountryId
      )
      // // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {
        // // console.log(response.data.data)
        setStates(response.data.data)
      } else if (response.data.status === 'error') {
        // console.log(response.data.message)
        // setErrorhandle(response.data.message)
        // handleErrorShow()
      }
    } catch (err) {
      // console.log(err)
    }
  }

  const GetAllStatesAgent = async (values) => {
    try {
      const CountryId = {
        id: CountryID
      }
      // // console.log(values)
      const response = await axios.post(
        CommonConstants.BASE_URL + '/getallstatebycountryid',
        CountryId
      )
      // // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {
        setStatesAgent(response.data.data)
      } else if (response.data.status === 'error') {
        // setErrorhandle(response.data.message)
        // handleErrorShow()
      }
    } catch (err) {
      // console.log(err)
    }
  }

  const ScantakMessegeSend = async () => {
    if (scantekVerify == true) {
      setloadervalue(true)
      const config = {
        method: 'POST',
        url: CommonConstants.BASE_URL + '/generatedigitalverificationlink/' + R_ID,
        headers: {'Content-Type': 'application/json'},
        data: {
          'subject': {
            'dateOfBirth': '',
            'emailAddress': data2.IndidualEmail,
            'firstNames': data2.IndidualFirstname,
            'middleNames': data2?.IndidualMiddlename,
            'lastNames': data2?.IndidualLastname
          }
        }
      }

      try {
        const response = await axios(config)
        if (response.data.status === true) {
          setloadervalue(false)
          window.open(response.data.data.voiLink, '_self')
        }
      } catch (error) {
        setloadervalue(false)
        console.log(error.data)
      }
    }
  }

  const DigitalValue = () => {
    setidVerifyed(false)
    setIdverifyedSuccess(true)
    setscantekVerify(true)
  }
  const ManualValue = () => {
    setidVerifyed(true)
    setIdverifyedSuccess(true)
    setscantekVerify(false)
  }

  const handleIndividualId = () => {
    setIdverifyedSuccess(false)
    ScantakMessegeSend()
    handleIClose()
  }

  const handleIdverify = () => {
  }

  const currentDate = new Date() // Current date
  const tomorrowDate = new Date(currentDate) // Create a new date object with the current date
  tomorrowDate.setDate(currentDate.getDate() + 1) // Add 1 day to the current date

  // If the new date's day is different from the expected day, it means we crossed the month boundary
  // In that case, move to the next month
  if (tomorrowDate.getDate() !== currentDate.getDate() + 1) {
    tomorrowDate.setMonth(currentDate.getMonth() + 1)
    tomorrowDate.setDate(1) // Set the day to the first day of the next month
  }

  // Check if the new date is in the next year (e.g., December 31)
  if (tomorrowDate.getFullYear() !== currentDate.getFullYear()) {
    tomorrowDate.setFullYear(currentDate.getFullYear() + 1) // Move to the next year
    tomorrowDate.setMonth(0) // Set the month to January
    tomorrowDate.setDate(1) // Set the day to the first day of January
  }

// Format tomorrow's date as "yyyy-mm-dd"
  const formattedDate = `${tomorrowDate.getFullYear()}-${String(tomorrowDate.getMonth() + 1).padStart(2, '0')}-${String(tomorrowDate.getDate()).padStart(2, '0')}`

  ////////////////////////////////////

  // Calculate the max date that can be selected

  const MaxDate1 = new Date()
  MaxDate1.setFullYear(MaxDate1.getFullYear() - 18)
  // maxDate.setFullYear(maxDate.getFullYear() - 18);
  const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate())
  const minDate = new Date(currentDate.getFullYear() - 100, 0, 1)
  const currentDateString = MaxDate1.toISOString().split('T')[0]

  const handlesetcity = (e) => {
    handleDataStep4(e)
    setSubarbCity(e.target.value)
  }
  const handlesetpostalcode = (e) => {
    handleDataStep4(e)
    setPostalZipcode(e.target.value)
  }

  const handlesetcity1 = (e) => {
    handleDataStep4(e)
    setASubarbCity(e.target.value)
  }
  const handlesetpostalcode1 = (e) => {
    handleDataStep4(e)
    setAPostalZipcode(e.target.value)
  }

  // const [] = useState('')

  const handleUpdateDataIndividual = async () => {
    // setloadervalue(true)
    if (validator.error_input_validation('Individual_id_Details_step4')) {
      if (ValidIdType == '0') {
        setValid(true)
        StepBlank('')
      } else if (ValidIdAuthority == '0') {
        setValid(true)
        StepBlank('')
      } else {
        setValid(false)
        axios.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: R_ID}).then((respo) => {
          //console.log(respo,"USERINFO")
          setloadervalue(true)
          const formData = new FormData()
          formData.append(
            'user',
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
          )

          formData.append('kycdetails', `{
          "id": ${K_ID},
          "userId": ${R_ID},
          "countryId":${respo.data.data?.userkycdetails?.countryId ?? null},
          "streetName":"${respo.data.data && respo.data.data.userkycdetails && respo.data.data.userkycdetails.streetName ? respo.data.data.userkycdetails.streetName : `""` }",
          "stateId":${respo.data.data && respo.data.data.userkycdetails && respo.data.data.userkycdetails.stateId ? respo.data.data.userkycdetails.stateId : 0},
          "nationality":"${respo.data.data && respo.data.data.userkycdetails && respo.data.data.userkycdetails.nationality ? respo.data.data.userkycdetails.nationality : `""` }", 
          "suburb":"${respo.data.data && respo.data.data.userkycdetails && respo.data.data.userkycdetails.suburb ? respo.data.data.userkycdetails.suburb : `""` }", 
          "postalCode":"${respo.data.data && respo.data.data.userkycdetails && respo.data.data.userkycdetails.postalCode ? respo.data.data.userkycdetails.postalCode : `""` }", 
          "verified":0,
          "occupationId":${respo.data.data && respo.data.data.userkycdetails && respo.data.data.userkycdetails.occupationId ? respo.data.data.userkycdetails.occupationId : 0}, 
          "isResidence": ${respo.data.data && respo.data.data.userkycdetails && respo.data.data.userkycdetails.isResidence ? respo.data.data.userkycdetails.isResidence :  false}, 
          "kycStatus":${respo.data.data && respo.data.data.userkycdetails && respo.data.data.userkycdetails.kycStatus ? respo.data.data.userkycdetails.kycStatus :  false}
        }`)


          // formData.append(
          //   'kycdetails',
          //   `{
          //     "id":${K_ID},
          //     "userId":${R_ID},
          //     "streetName":"${StreetName}",
          //     "stateId":${State},
          //     "nationality":"${KYCNationality}",
          //     "suburb":"${SubarbCity}",
          //     "postalCode":"${PostalZipcode}",
          //     "verified":0,
          //     "occupationId":${Occup},
          //     "isResidence": ${Recidence==="Yes" ? true: false},
          //     "kycStatus":""
          //   }`);

          formData.append(
            'iddetails',
            `{
          "id":${I_ID},
          "userId":${R_ID},
          "typeId":"${step4value.IndidualIDType}",
          "documentNumber":"${step4value.IndidualIDNumber}",
          "cardNumber":"${step4value.IndidualCardNumber}",
          "dob":"${step4value.IndidualDOB}",
          "documentValidity":"${step4value.IndidualIDExpiry}",
          "issuingAuthority":"${step4value.IndividualIDIssuingAuthority}"
        }`
          )

          formData.append('isFromSignup', true)
          formData.append('stepNo', 4)

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

          // formData.append("iddocuments", Nakeeb); //new code
          // formData.append("iddocuments", []); //new code

          ///////Update changes remaining//////////

          // console.log(formData,"formData")

          const config = {
            method: 'POST',
            url: CommonConstants.BASE_URL + '/updateuserinfo',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }

          axios(config)
            .then(function (response) {
              if (response.data.status === true) {
                console.log(response.data.data, 'UpdatedData')
                GoNextStep()
                setloadervalue(false)
                var IType = Idtypes.filter((e) => e.value == step4value.IndidualIDType)
                UserIdType(IType[0].label)
                // setloadervalue(false)
                // setModalShowAdd(true)
                // HandlerIndividualUser()
              } else if (response.data.status === false) {
                setloadervalue(false)
                setExistUser(true)
                setExistUserMessage(response.data.message)
                StepBlank('')
              }
            })
            .catch(function (error) {
              // setloadervalue(false)
            })
        }).catch(err => {
          console.log(err)
        })
      }
    } else if (ValidIdType == '0') {
      setValid(true)
      StepBlank('')
    } else if (ValidIdAuthority == '0') {
      setValid(true)
      StepBlank('')
    } else {
      StepBlank('')
    }
  }

  const handleBUpdateDataIndividual = async () => {
    // setloadervalue(true)
    if (validator.error_input_validation('Bussiness_KYC_step4')) {
      if (ValidBnationality == '0') {
        setValid(true)
        StepBlank('')
      } else if (ValidBOccupation == '0') {
        setValid(true)
        StepBlank('')
      } else {
        setValid(false)
        axios.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: R_ID}).then((respo) => {
          //console.log(respo,"USERINFO")
          setloadervalue(true)
          const formData = new FormData()
          formData.append(
            'user',
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
          )

          formData.append(
            'kycdetails',
            `{
            "id":${K_ID},
            "userId":${R_ID},
            "streetName":"${StreetName}",
            "countryId":${respo.data.data.countryId},
            "stateId":${State},
            "nationality":"${KYCNationality}",
            "suburb":"${SubarbCity}",
            "postalCode":"${PostalZipcode}",
            "verified":0,
            "occupationId":${Occup},
            "isResidence": ${Recidence === 'Yes' ? true : false},
            "kycStatus":""
          }`)

          formData.append('isFromSignup', false)
          formData.append('stepNo', 4)

          ///////Update changes remaining//////////

          // console.log(formData,"formData")

          const config = {
            method: 'POST',
            url: CommonConstants.BASE_URL + '/updateuserinfo',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }

          axios(config)
            .then(function (response) {
              if (response.data.status === true) {
                console.log(response.data.data, 'UpdatedData')
                GoNextStepBA()
                setloadervalue(false)
                // setloadervalue(false)
                // setModalShowAdd(true)
                // HandlerIndividualUser()
              }
            })
            .catch(function (error) {
              // setloadervalue(false)
            })
        }).catch(err => {
          console.log(err)
        })
      }
    } else if (ValidBnationality == '0') {
      setValid(true)
      StepBlank('')
    } else if (ValidBOccupation == '0') {
      setValid(true)
      StepBlank('')
    } else {
      StepBlank('')
    }

  }

  const [ValidBnationality, setValidBnationality] = useState('0')
  const [ValidBOccupation, setValidBOccupation] = useState('0')
  const [ValidAnationality, setValidAnationality] = useState('0')
  const [ValidAOccupation, setValidAOccupation] = useState('0')

  const [ValidIdType, setValidIdType] = useState('0')
  const [ValidIdAuthority, setValidIdAuthority] = useState('0')

  const [Valid, setValid] = useState(false)

  const handleAUpdateDataIndividual = async () => {
    // setloadervalue(true)
    if (validator.error_input_validation('Agent_KYC_step4')) {
      if (ValidAnationality == '0') {
        setValid(true)
        StepBlank('')
      } else if (ValidAOccupation == '0') {
        setValid(true)
        StepBlank('')
      } else {
        setValid(false)
        axios.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: R_ID}).then((respo) => {
          //console.log(respo,"USERINFO")
          setloadervalue(true)
          const formData = new FormData()
          formData.append(
            'user',
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
          )
          //////////////////////////baki che agnet//////////////////////////////////
          formData.append(
            'kycdetails',
            `{
            "id":${K_ID},
            "userId":${R_ID},
            "streetName":"${AStreetName}",
            "countryId":${respo.data.data.countryId},
            "stateId":${AState},
            "nationality":"${AKYCNationality}",
            "suburb":"${ASubarbCity}",
            "postalCode":"${APostalZipcode}",
            "verified":0,
            "occupationId":${AOccup},
            "isResidence": ${ARecidence === 'Yes' ? true : false},
            "kycStatus":""
          }`)


          formData.append('isFromSignup', false)
          formData.append('stepNo', 4)
          //////////////////////////baki che agnet//////////////////////////////////

          ///////Update changes remaining//////////

          // console.log(formData,"formData")

          const config = {
            method: 'POST',
            url: CommonConstants.BASE_URL + '/updateuserinfo',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }

          axios(config)
            .then(function (response) {
              if (response.data.status === true) {
                console.log(response.data.data, 'UpdatedData')
                GoNextStepBA()
                setloadervalue(false)
                // setloadervalue(false)
                // setModalShowAdd(true)
                // HandlerIndividualUser()
              }
            })
            .catch(function (error) {
              // setloadervalue(false)
            })
        }).catch(err => {
          console.log(err)
        })
      }
    } else if (ValidAnationality == '0') {
      setValid(true)
      StepBlank('')
    } else if (ValidAOccupation == '0') {
      setValid(true)
      StepBlank('')
    } else {
      StepBlank('')
    }
  }

  const [Idtypes, setIdtypes] = useState([])
  const GetIdTypeByCountryId = async (values) => {
    try {
      const IdData = {
        countryId: CountryID
      }
      const response = await axios.post(
        CommonConstants.BASE_URL + '/getactiveidtypebycountryid',
        IdData
      )
      if (response.data.status === true) {
        const optionsForState = response.data.data.map((States) => ({
          value: States.id,
          label: States.name
        }))
        setIdtypes(optionsForState)
        // setIdtypes(response.data.data);
      }
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <>
      <section>
        <div className="step4Welcome  text-white text-center bolder my-4 py-3">
          Welcome to LegalRemit
        </div>
        <Container fluid>
          {loadervalue == true ? <Loader/> : ''}
          <Row>
            <Col className="col-lg-12 p-0">
              <div className="mt-3 pe-4 ps-4">
                <Row id="stepone1">
                  <Col className="col-lg-12 p-0">
                    <div className="text-center">
                      <label className="text-center text-black mb-2">
                        ID Details
                      </label>
                    </div>
                    <Form className="mt-3" id="Individual_id_Details_step4">
                      <Row className="mb-3 ">

                        <Form.Group
                          as={Col}
                          className="nationalityDRP input-container orangeBorder"
                        >
                          <i className="blueText nationalityMain3 	fa fa-flag svgNationality"></i>
                          <Select
                            name="IndidualNationality"
                            // id="Example2"
                            options={Idtypes}

                            className="SelectValueSelect99 SelectValueSelect99 SelectHoverLabel required nationality"
                            closeMenuOnSelect={true}
                            isSearchable={isSearchable1}
                            onChange={(e) => {
                              handleDataIdTypeIndividual(e)
                            }}
                          />
                          {/* ////////////////////////////////////// */}
                          {ValidIdType == '0' && Valid == true && (
                            <small className="error-message text-danger">Please select ID Type</small>
                          )}
                          <label style={{zIndex: 0}} htmlFor="name" className="form-label1">
                            ID Type
                          </label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please select the id type
                          </small>

                        </Form.Group>

                      </Row>

                      <Row className="mb-3 respoChildFooter">
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container "
                        >
                          <i className="blueText mainStep4 fa fa-id-card "></i>
                          <Form.Control
                            type="text"
                            placeholder="ID Number"
                            value={step4value.IndidualIDNumber}
                            onChange={(e) => {
                              let value = e.target.value
                              let sanitizedValue = ''

                              var sanitizedValues = value.replace(/[^a-zA-Z0-9]/g, '')
                              sanitizedValue = sanitizedValues.toUpperCase()
                              setstep4value((prevState) => ({
                                ...prevState,
                                IndidualIDNumber: sanitizedValue
                              }))
                            }}
                            name="IndidualIDNumber"
                            className="formControlStep4 required form-input"
                          />
                          <label htmlFor="name" className="form-label1">
                            ID Number
                          </label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please enter the iD number
                          </small>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container "
                        >
                          <i className="blueText mainStep4 fa fa-id-card "></i>
                          <Form.Control
                            type="text"
                            placeholder="Card Number"
                            value={step4value.IndidualCardNumber}
                            onChange={(e) => {
                              let value = e.target.value
                              let sanitizedValue = ''

                              var sanitizedValues = value.replace(/[^a-zA-Z0-9]/g, '')
                              sanitizedValue = sanitizedValues.toUpperCase()
                              setstep4value((prevState) => ({
                                ...prevState,
                                IndidualCardNumber: sanitizedValue
                              }))
                            }}
                            name="IndidualCardNumber"
                            className="formControlStep4 form-input"
                            // cardnumber
                          />
                          <label htmlFor="name" className="form-label1">
                            Card Number
                          </label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please enter the card number
                          </small>
                        </Form.Group>
                      </Row>

                      <Row className="mb-3 respoChildFooter">
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container "
                        >
                          <i className="blueText mainStep4 fa fa-calendar "></i>
                          <Form.Control
                            type="date"
                            onChange={handleDataStep4}
                            max={maxDate.toISOString().split('T')[0]}
                            min={minDate.toISOString().split('T')[0]}
                            // defaultValue={currentDateString}
                            onKeyPress={(event) => event.preventDefault()}
                            name="IndidualDOB"
                            placeholder="Date of Birth"
                            className="form-input formControlStep4 required "
                          />
                          <label htmlFor="name" className="form-label1">
                            Date of Birth
                          </label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please enter the date of birth
                          </small>
                          {/* <small className="responsiveFontLarge  d-none text-danger error_message error_message_number3 ms-2" >Please Enter Valid number</small> */}
                        </Form.Group>

                        {/* <label className="normal ms-4 smalllabel mb-2">Date of ID Expiry</label> */}
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container "
                        >
                          <i className="blueText mainStep4 fa fa-calendar"></i>
                          <Form.Control
                            type="date"
                            onChange={handleDataStep4}
                            min={formattedDate}
                            onKeyPress={(event) => event.preventDefault()}
                            name="IndidualIDExpiry"
                            placeholder="Date of ID Expiry"
                            className="formControlStep4 required form-input"
                          />
                          <label htmlFor="name" className="form-label1">
                            Date of ID Expiry
                          </label>
                          <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                            Please enter the expiry date
                          </small>
                          {/* <small className="responsiveFontLarge  d-none text-danger error_message error_message_number4 ms-2" >Please Enter Valid number</small> */}
                        </Form.Group>
                        {/* </Col> */}
                      </Row>

                      <Row className="mb-3 respoChildFooter">
                        <Form.Group
                          as={Col}
                          className="OccupationSelect  input-container "
                        >
                          <i className="blueText OccupationIcon fas fa-landmark"></i>

                          <Select
                            name="IndividualIDIssuingAuthority"
                            options={IdAuthority}
                            className="SelectValueSelect4 SelectHoverLabel required nationality"
                            closeMenuOnSelect={true}
                            isSearchable={isSearchable1}
                            onChange={(e) => {
                              handleDataissueAuthority(e)
                            }}
                          />
                          {ValidIdAuthority == '0' && Valid == true && (
                            <small className="error-message text-danger">Please select the iD issuing authority</small>
                          )}
                          <label style={{zIndex: 0}} htmlFor="name" className="form-label1">
                            ID Issuing Authority
                          </label>
                        </Form.Group>
                      </Row>
                    </Form>
                  </Col>
                </Row>

                <Row id="steptwo2">
                  <div className="text-center">
                    <label className="text-center text-black mb-4">
                      KYC Details
                    </label>
                  </div>
                  <Form id="Bussiness_KYC_step4">

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="OccupationSelect input-container "
                      >
                        <i className="blueText OccupationIcon 	fa fa-flag svgNationality"></i>
                        <Select
                          name="IndidualNationality"
                          options={Nationality}
                          className="SelectValueSelect4 SelectHoverLabel required nationality"
                          closeMenuOnSelect={true}
                          isSearchable={isSearchable}
                          onChange={handleBDataStepSelect4}
                        />
                        {ValidBnationality == '0' && Valid == true && (
                          <small className="error_message text-danger">Please select Nationality</small>
                        )}
                        <label style={{zIndex: 0}} htmlFor="name" className="form-label1">
                          Nationality
                        </label>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="blueText mainStep3 	fa fa-home "></i>
                        <Form.Control
                          type="text"
                          ref={autocompleteRef}
                          name="Business_StreetName"
                          onChange={(e) => {
                            setStreetName(e.target.value)
                          }}
                          value={StreetName}
                          placeholder="House No & Street Name"
                          className={`formControlStep3 required form-input ${
                            !isAddressValid ? 'error-border' : ''
                          }`}
                        />
                        {!isAddressValid && (
                          <small className="error-message text-danger">Invalid address. Please select and search proper
                            address which contains house number and street name.</small>
                        )}
                        <label htmlFor="name" className="form-label1">
                          House No & Street Name
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter House No & Street Name
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="blueText mainStep3 fa fa-map-marker "></i>
                        <Form.Control
                          type="text"
                          name="Business_City"
                          onChange={(e) => {
                            handlesetcity(e)
                          }}
                          placeholder="Suburb/City"
                          value={SubarbCity}
                          className="formControlStep3 required form-input cityvalidation"
                        />
                        <label htmlFor="name" className="form-label1">
                          Suburb/City
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Suburb/City Name
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="blueText mainStep3 fa fa-map-marker "></i>
                        <Form.Select
                          className="mainStep3Select required form-input"
                          name="Business_State"
                          onChange={(e) => {
                            handleDataStep4(e)
                            setState(e.target.value)
                          }}
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
                              )
                            })}
                          {/* <option value="Gujarat">Gujarat</option>
                                                    <option value="Delhi">Delhi</option> */}
                        </Form.Select>
                        <label htmlFor="name" className="form-label1">
                          State
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Select the State
                        </small>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="blueText mainStep3 fa fa fa-envelope "></i>
                        <Form.Control
                          type="number"
                          name="Business_Zip"
                          onChange={(e) => {
                            handlesetpostalcode(e)
                          }}
                          value={PostalZipcode}
                          placeholder="Postal / Zip Code"
                          className="form-input formControlStep3 required number"
                        />
                        <label htmlFor="name" className="form-label1">
                          Postal / Zip Code
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter Postal / Zip Code
                        </small>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="OccupationSelect ds input-container "
                      >
                        <i className="blueText OccupationIcon fa fa-briefcase "></i>

                        <Select
                          name="IndidualOccupation"
                          options={Occupation}
                          className="SelectValueSelect4  jj SelectHoverLabel required nationality  "
                          closeMenuOnSelect={true}
                          isSearchable={isSearchable1}
                          onChange={(e) => {
                            handleDataStepSelectOccupation(e)
                          }}
                        />
                        {ValidBOccupation == '0' && Valid == true && (
                          <small className="error-message text-danger">Please select Occupation</small>
                        )}
                        <label style={{zIndex: 0}} htmlFor="name" className="form-label1">
                          Occupation
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Select Occupation
                        </small>
                        {/* <Form.Control type="text" name="Business_StreetName" onChange={handleDataStep4} placeholder="First Name" className="formControlStep2"/> */}
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "

                      >
                        <i className="blueText mainStep3 fa fa-map-marker "></i>

                        <Form.Select
                          className="mainStep3Select required form-input"
                          name="Business_Residence"
                          value={Recidence} // Set the selected value using the `value` prop
                          onChange={(e) => {
                            handleDataStep4(e)
                            setRecidence(e.target.value)
                          }}
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
                          Please Confirm if Resident of USA
                        </small>
                        {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                      </Form.Group>
                    </Row>
                  </Form>
                </Row>


                <Row id="stepthree3">
                  <div className="text-center">
                    <label className="text-center text-black mb-4">
                      KYC Details
                    </label>
                  </div>
                  <Form id="Agent_KYC_step4">


                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="OccupationSelect input-container "
                      >
                        <i className="blueText OccupationIcon 	fa fa-flag svgNationality"></i>
                        <Select
                          name="IndidualNationality"
                          options={Nationality}
                          className="SelectValueSelect4 SelectHoverLabel required nationality"
                          closeMenuOnSelect={true}
                          isSearchable={isSearchable}
                          onChange={handleADataStepSelect4}
                        />
                        {ValidAnationality == '0' && Valid == true && (
                          <small className="error-message text-danger">Please select Nationality</small>
                        )}
                        <label style={{zIndex: 0}} htmlFor="name" className="form-label1">
                          Nationality
                        </label>
                      </Form.Group>
                    </Row>

                    <Row className="mb-3 respoChildFooter">
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="blueText mainStep3 	fa fa-home "></i>
                        <Form.Control
                          onChange={(e) => {
                            setAStreetName(e.target.value)
                          }}
                          value={AStreetName}
                          ref={autocompleteRef2}
                          id="A_StreetName"
                          name="Agent_StreetName"
                          type="text"
                          placeholder="House No & Street Name"
                          className={`formControlStep3 required form-input ${
                            !isAddressValid2 ? 'error-border' : ''
                          }`}
                        />
                        {!isAddressValid2 && (
                          <small className="error-message text-danger">Invalid address. Please select and search proper
                            address which contains house number and street name.</small>
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
                        <i className="blueText mainStep3 fa fa-map-marker "></i>
                        <Form.Control
                          onChange={(e) => {
                            handlesetcity1(e)
                          }}
                          id="Agent_City"
                          value={ASubarbCity}
                          type="text"
                          placeholder="Suburb/City"
                          className="formControlStep3 required form-input cityvalidation"
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
                        <i className="blueText mainStep3 fa fa-map-marker "></i>
                        <Form.Select
                          className="mainStep3Select required form-input"
                          id="Agent_State"
                          onChange={(e) => {
                            handleDataStep4(e)
                            setAState(e.target.value)
                          }}
                          name="Agent_State"
                          value={AState}

                        >
                          <option value="">State</option>
                          {StatesAgent &&
                            StatesAgent.map((States, index) => {
                              return (
                                <>
                                  <option value={States.id}>
                                    {States.name}
                                  </option>
                                </>
                              )
                            })}
                        </Form.Select>
                        <label htmlFor="name" className="form-label1">
                          State
                        </label>
                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                          Please Enter The State
                        </small>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        className="left-inner-addon input-container "
                      >
                        <i className="blueText mainStep3 fa fa fa-envelope "></i>
                        <Form.Control
                          onChange={(e) => {
                            handlesetpostalcode1(e)
                          }}
                          id="Agent_Zip"
                          value={APostalZipcode}
                          type="number"
                          placeholder="Postal / Zip Code"
                          className="formControlStep3 required number form-input"
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
                        className="OccupationSelect  input-container "
                      >
                        <i className="blueText OccupationIcon fa fa-briefcase "></i>
                        {/* <Form.Select
                          className="mainStep3Select required form-input"
                          id="Agent_Occupation"
                          onChange={(e)=>{handleDataStep4(e); setAOccup(e.target.value)}}
                          name="Agent_Occupation"
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
                          className="SelectValueSelect4 SelectHoverLabel required nationality"
                          closeMenuOnSelect={true}
                          isSearchable={isSearchable1}
                          onChange={(e) => {
                            handleDataStepSelectOccupation1(e)
                          }}
                        />
                        {ValidAOccupation == '0' && Valid == true && (
                          <small className="error-message text-danger">Please select Occupation</small>
                        )}
                        <label style={{zIndex: 0}} htmlFor="name" className="form-label1">
                          Occupation
                        </label>
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
                        <i className="blueText mainStep3 fa fa-map-marker "></i>
                        {/* <Form.Select
                          className="mainStep3Select required form-input"
                          id="Agent_Residence"
                          onChange={(e) => {handleDataStep4(e); setARecidence(e.target.value)}}
                          name="Agent_Residence"
                        >
                          <option value="" disabled>
                            Is Residence of {Countrydata.CountryName}
                          </option>
                          <option value="Yes" selected>
                            Yes
                          </option>
                          <option value="No">No</option>
                        </Form.Select> */}
                        <Form.Select
                          className="mainStep3Select required form-input"
                          id="Agent_Residence"
                          onChange={(e) => {
                            handleDataStep4(e)
                            setARecidence(e.target.value)
                          }}
                          name="Agent_Residence"
                          value={ARecidence} // Replace 'yourStateValue' with the value from your state that represents the selected option
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
                          Please Select The Is Residence of{' '}
                          {Countrydata.CountryName}
                        </small>
                        {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                      </Form.Group>
                    </Row>
                  </Form>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>

        <Modal className="verifyModal" dialogClassName="modal-90w" show={Ishow}>
          <Row className="">
            <Col className="col-lg-12 d-flex align-items-center">
              <Col className="col-lg-5 verfiyBlock2 moneySendRespo">
                <img src={blueVector} className="img-fluid p-2"/>
              </Col>
              <Col className="col-lg-7 border-left p-0 verfiyBlock1">
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
                      className="customRadioOrange specifyColor"
                      id="Degital"
                      // checked
                      type="radio"
                      onClick={DigitalValue}
                      name="fav_language"
                      value="Degital"
                    />
                    <label for="html" className="text-black bolder ms-3">
                      Digital Verification (Recommended)
                    </label>
                  </div>
                  <small className="responsiveFontLarge  d-block ms-4 ps-3 pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
                  </small>
                  <div className="d-flex align-items-center flex-col mt-4">
                    <input
                      className="customRadioOrange specifyColor"
                      type="radio"
                      id="Manual"
                      onClick={ManualValue}
                      name="fav_language"
                      value="Manual"
                    />
                    <label for="html" className="text-black bolder ms-3">
                      Manual Verification (Slower Method)
                    </label>
                  </div>
                  <small className="responsiveFontLarge  d-block ms-4 ps-3 pt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
                  </small>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="d-flex justify-content-center m-auto my-4 col-lg-4 w-25 verifyModalbtn4"
                    variant="secondary"
                    disabled={IdverifyedSuccess == true ? false : true}
                    onClick={handleIndividualId}
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
            setExistUser(false)
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
                ExistUserMessage == 'Duplicate' ? 'Your account already exists, Please use your old account or Contact our support team' :

                  ExistUserMessage == 'Suspected' ? 'we are unable to verify your account, please contact our support in matter of urgency.'

                    : ''
              }
            </p>
          </Modal.Body>
          <Modal.Footer>
            {
              ExistUserMessage == 'Duplicate' ?
                <Button
                  className="mt-2 col-lg-3 d-block m-auto nextBtn1"
                  variant="primary"
                  onClick={(e) => {
                    setExistUser(false)
                  }}
                >
                  Ok
                </Button>
                :
                ExistUserMessage == 'Suspected' ?
                  <>
                    <Button
                      className="mt-2 col-lg-3 d-block m-auto nextBtn1"
                      variant="primary"
                      onClick={(e) => {
                        setExistUser(false)
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      className="mt-2 col-lg-3 d-block m-auto nextBtn1"
                      variant="primary"
                      onClick={(e) => {
                        GoNextStep()
                        setExistUser(false)
                        //  handleIndividual : GoNextStepBA()
                      }}
                    >
                      Ok
                    </Button>
                  </>
                  : ''
            }
          </Modal.Footer>
        </Modal>
      </section>
    </>
  )
}
