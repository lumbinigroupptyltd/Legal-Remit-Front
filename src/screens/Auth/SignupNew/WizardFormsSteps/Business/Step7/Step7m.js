import React, { useContext, useEffect, useState } from 'react'
import './Step7.scss'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import '../../../../../Helpers/CountryDropdown/flags.css'
import ReactFlagsSelect from 'react-flags-select'
import Accordion from 'react-bootstrap/Accordion'
import Modal from 'react-bootstrap/Modal'
import userContext from '../../../Signupdata/Usecontext'
import axios from 'axios'
import { CommonConstants } from '../../../../../../Constants/common.constants'
import Loader from '../../../../../Loader/Loader'
import PdfLogo from '../../../../../../assets/images/pdf.png'

const validator = require('../../../../../../assets/js/validator')

export default function Step7 ({
																 Name,
																 handleid,
																 GoNextStepBA,
																 UpdateStep,
																 R_ID,
																 B_ID,
																 K_ID,
																 I_ID,
																 CountryID,
																 UserIdType,
																 StepBlank,
																 DirectorForms,
																 ShareholderForms,
																 SummuryDocuments
															 }) {
	const [select, setSelect] = useState('AU')
	const onSelect = (code) => setSelect(code)
	const [loadervalue, setloadervalue] = useState(false)
	const [show, setShow] = useState(false)
	const [Ashow, setAShow] = useState(false)
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const handleAgentClose = () => setAShow(false)
	const handleAgentShow = () => setAShow(true)
	const [CPhoneCode, setCPhoneCode] = useState('')
	const [AExistMobile, setAExistMobile] = useState(false)
	const [FormPopup, setFormPopup] = useState(false)
	const [ShareholderFormPopup, setShareholderFormPopup] = useState(false)
	const [number, setNumber] = useState(1)
	const [number2, setNumber2] = useState(0)
	const [numberOfForms, setNumberOfForms] = useState(0)
	const [formDataa, setFormData] = useState([{name: '', email: '', phone: '', percentageOfShareHolding: ''}])


	const [numberOfForms2, setNumberOfForms2] = useState(0)
	const [formData2, setFormData2] = useState([{name: '', email: '', phone: '', percentageOfShareHolding: ''}])

	const [SummuryValidation, setSummuryValidation] = useState('')

	const handleDynamiForm = (event) => {
		const inputValue = event.target.value
		if (inputValue === '' || (parseInt(inputValue) >= 1 && parseInt(inputValue) <= 10)) {
			setNumber(inputValue) // Update the state with the valid input
			handleTextFieldChange(event)
			// handleDataStep3(event);
		}
	}

	const handleDynamiForm2 = (event) => {
		const inputValue = event.target.value
		if (inputValue === '' || (parseInt(inputValue) >= 0 && parseInt(inputValue) <= 10)) {
			setNumber2(inputValue) // Update the state with the valid input
			handleTextFieldChange2(event)
			// handleDataStep3(event);
		}
	}

	const handleTextFieldChange = (event) => {
		const value = event.target.value
		setNumberOfForms(Number(value))
	}

	const handleFormInputChange = (index, field, value) => {
		const updatedFormData = [...formDataa]
		updatedFormData[index] = {
			...updatedFormData[index],
			userId: +R_ID,
			isShareHolder: false,
			[field]: value
		}
		setFormData(updatedFormData)
	}

	const handleTextFieldChange2 = (event) => {
		const value = event.target.value
		setNumberOfForms2(Number(value))
	}

	const handleFormInputChange2 = (index, field, value) => {
		const updatedFormData = [...formData2]
		updatedFormData[index] = {
			...updatedFormData[index],
			userId: +R_ID,
			isShareHolder: true,
			[field]: value
		}
		setFormData2(updatedFormData)
	}

	// const renderShareholderDynamicForms = () =>{
	//   const forms2 = [];
	//   for (let i = 0; i < numberOfForms2; i++) {
	//     forms2.push(
	//       <div key={i} className="my-3">

	//         <Row className="px-3 respoChildFooter">
	//           <h5 className="fs-6 ps-3">Shareholder Details {i+1} </h5>
	//           <Form.Group
	//             as={Col}
	//             className="left-inner-addon input-container"
	//           >
	//             <i className="orangeText main fa fa-user "></i>
	//             <Form.Control
	//               name="shareholder_Fullname"
	//               type="text"
	//               placeholder="shareholder Fullname"
	//               value={formData2[i]?.name || ''}
	//               className="formcontrol orangeForm form-input required"
	//               onChange={(e) => handleFormInputChange2(i, 'name', e.target.value)}
	//             />
	//             <label htmlFor="name" className="form-label1">
	//               Director FullName
	//             </label>
	//             <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
	//               Please Enter Shareholder Fullname
	//             </small>
	//           </Form.Group>
	//         </Row>

	//         <Row className="px-3 respoChildFooter">
	//           <Form.Group
	//             as={Col}
	//             className="left-inner-addon input-container"
	//           >
	//             <i className="orangeText main fa fa-envelope "></i>
	//             <Form.Control
	//               name="shareholder_Email"
	//               type="text"
	//               placeholder="shareholder Email"
	//               value={formData2[i]?.email || ''}
	//               className="formcontrol orangeForm form-input required"
	//               onChange={(e) => handleFormInputChange2(i, 'email', e.target.value)}
	//             />
	//             <label htmlFor="name" className="form-label1">
	//               Email
	//             </label>
	//             <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
	//               Please Enter shareholder Email
	//             </small>
	//           </Form.Group>
	//         </Row>
	//         <Row className="px-3 respoChildFooter">
	//           <Form.Group
	//             as={Col}
	//             className="left-inner-addon input-container"
	//           >
	//             <i className="orangeText main fa fa-mobile"></i>
	//             <Form.Control
	//               name="shareholder_Mobile"
	//               type="text"
	//               placeholder="shareholder Mobile"
	//               value={formData2[i]?.phone || ''}
	//               className="formcontrol orangeForm form-input required"
	//               onChange={(e) => handleFormInputChange2(i, 'phone', +e.target.value)}
	//             />
	//             <label htmlFor="name" className="form-label1">
	//               Mobile
	//             </label>
	//             <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
	//               Please Enter shareholder Mobile
	//             </small>
	//           </Form.Group>
	//         </Row>
	//         <Row className="px-3 respoChildFooter">
	//           <Form.Group
	//             as={Col}
	//             className="left-inner-addon input-container"
	//           >
	//             <i className="orangeText main fa fa-mobile"></i>
	//             <Form.Control
	//               name="shareholder_shareHolding"
	//               type="number"
	//               min={0}
	//               max={10}
	//               placeholder="Share Holding"
	//               value={formData2[i]?.percentageOfShareHolding || ''}
	//               className="formcontrol orangeForm form-input required"
	//               onChange={(e) => handleFormInputChange2(i, 'percentageOfShareHolding', +e.target.value)}
	//             />
	//             <label htmlFor="name" className="form-label1">
	//               Share Holding
	//             </label>
	//             <small className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
	//               Please Enter Share Holding
	//             </small>
	//           </Form.Group>
	//         </Row>
	//       </div>
	//     );
	//   }
	//   return forms2;
	// }

	const handlecloseDirector = (e) => {
		setFormPopup(false)
		handleSubmitDirector(e)
		setShareholderFormPopup(true)
	}

	const handleSubmitDirector = async (e) => {
		try {
			const data = submitDelivery(e)
			console.log(data, 'datadata')
			const response = await axios.post(
				CommonConstants.BASE_URL + '/adddirectors', formDataa
			)
			if (response.data.status === true) {
				data3.Business_No_of_directors = formDataa.length
				setFormPopup(false)
				handleBUpdateDataIndividual()
				console.log(response.data.data, 'Add Director Details')
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleSubmitShareHolder = async (e) => {
		// console.log(formData2)
		const data = submitShareHolder(e)
		try {
			const response = await axios.post(
				CommonConstants.BASE_URL + '/adddirectors', formData2
			)
			if (response.data.status === true) {
				data3.Business_No_of_directors = formData2.length
				setShareholderFormPopup(false)
				handleBUpdateDataIndividual()
				console.log(response.data.data, 'Add Director Details')
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleBusinessSaveClose = () => {
		setShow(false)
		setEditValue(false)
	}

	const handleAgentSaveClose = () => {
		setShow(false)
		setAgentValue(false)
	}

	const [cancleData, setcancleData] = useState(false)
	const [ExistVerifyDuplicate, setExistVerifyDuplicate] = useState(false)

	const handleBusinessCancledata = () => {
		// setShow(false);
		handleClose()
		setEditValue(false)
		setcancleData(true)
		//////Business step1///////
		document.getElementById('BusinessFullName').value = data2.Business_Fullname
		document.getElementById('B_BusinessName').value =
			data2.Business_BusinessName
		document.getElementById('B_ACN/ABN/Registration_No').value =
			data2.Business_RegistrationNo
		document.getElementById('B_BussinessAddress').value =
			data2.Business_AddressofBusiness
		document.getElementById('B_Email').value = data2.Business_BusinessEmail
		document.getElementById('B_Mobile').value = data2.Business_MobileNumber
		document.getElementById('B_Password').value = data2.Business_password
		document.getElementById('B_CPassword').value = data2.Business_C_password
		//////////////////

		//////Business step2///////
		document.getElementById('Business_Company_Type').value =
			data3.Business_CompanyType
		document.getElementById('B_employees').value =
			data3.Business_No_of_employees
		document.getElementById('B_directors').value =
			data3.Business_No_of_directors
		document.getElementById('B_Shareholders').value =
			data3.Business_No_of_Shareholders
		document.getElementById('Business_IndustryType').value =
			data3.Business_Industry_type
		document.getElementById('Business_Target_Market').value =
			data3.Business_Target_Market
		document.getElementById('B_sending_currency').value =
			data3.Business_sending_currency_per_year
		document.getElementById('Expected_trans').value =
			data3.Business_Expected_transaction_per_year
		document.getElementById('B_Website').value = data3.Business_Website
		//////////////////

		//////Business step3///////
		document.getElementById('Business_Nationality').value =
			data4.Business_Nationality
		document.getElementById('B_KYC_Housename').value =
			data4.Business_StreetName
		document.getElementById('B_KYC_city').value = data4.Business_City
		document.getElementById('B_KYC_Business_State').value =
			data4.Business_State
		document.getElementById('B_KYC_zipcode').value = data4.Business_Zip
		document.getElementById('B_KYC__Occupation').value =
			data4.Business_Occupation
		document.getElementById('B_KYC__Residence').value =
			data4.Business_Residence
		setB_StateId(data4.Business_State)
		//////////////////////////

		//////step4///////
		document.getElementById('Business_Id_Type').value = data5.Business_IDType
		document.getElementById('B-id-number').value = data5.Business_IDNumber
		document.getElementById('B-card-details').value = data5.Business_CardNumber
		document.getElementById('B-DOB-details').value = data5.Business_DOB
		document.getElementById('B-IdExpire-details').value =
			data5.Business_IDExpiry
		document.getElementById('Business_IDIssuingAuthority').value =
			data5.Business_IDIssuingAuthority
		setB_AuthorityName(data5.Business_IDIssuingAuthority)
		/////////////////
	}

	const handleAgentCancledata = () => {
		// setAShow(false);
		handleAgentClose()
		setAgentValue(false)
		setcancleData(true)

		//////Agent step1///////
		document.getElementById('Agent_First_Name').value = data2.Agent_Firstname
		document.getElementById('Agent_Middle_Name').value = data2.Agent_Middlename
		document.getElementById('Agent_Last_Name').value = data2.Agent_Lastname
		document.getElementById('Agent_Email').value = data2.Agent_Email
		document.getElementById('Agent_Mobile').value = data2.Agent_MobileNumber
		document.getElementById('Agent_Password').value = data2.Agent_password
		document.getElementById('Agent_Confirm_Password').value =
			data2.Agent_C_password
		//////////////////

		//////Agent step2///////
		document.getElementById('Agent_Business_Name').value =
			data3.Agent_Business_Name ////
		document.getElementById('Agent_ACN/ABN/Registration_No').value =
			data3.Agent_Registration_No
		document.getElementById('Agent_Country_of_Business_Registration').value =
			data3.Agent_Country_of_Business_Registration
		document.getElementById('Agent_Bussinessaddress').value =
			data3.Agent_Address_of_Business
		document.getElementById('Agent_Target_Market').value =
			data3.Agent_Target_Market
		document.getElementById('Agent_No_of_years_in_current_business').value =
			data3.Agent_current_business_year
		document.getElementById('Agent_sending_currency').value =
			data3.Agent_sending_currency_per_year
		document.getElementById('Agent_Expected_trans').value =
			data3.Agent_Expected_transaction_per_year
		document.getElementById('AgentWebsite').value = data3.Agent_Website
		//////////////////

		//////Agent step3///////
		document.getElementById('Agent_Nationality').value =
			data4.Agent_Nationality
		document.getElementById('AgentHousename').value = data4.Agent_StreetName
		document.getElementById('Agentkyccity').value = data4.Agent_City
		document.getElementById('Agent_kycstate').value = data4.Agent_State
		document.getElementById('Agentkyczipcode').value = data4.Agent_Zip
		document.getElementById('Agent_kycOccupation').value =
			data4.Agent_Occupation
		document.getElementById('Agent_kycResidence').value = data4.Agent_Residence
		setA_StateId(data4.Agent_State)
		//////////////////////////

		//////Agent step4///////
		document.getElementById('Agent_IdType').value = data5.Agent_IDType
		document.getElementById('Agent-id-number').value = data5.Agent_IDNumber
		document.getElementById('Agent-card-details').value =
			data5.Agent_CardNumber
		document.getElementById('Agent-DOB-details').value = data5.Agent_DOB
		document.getElementById('Agent-IdExpire-details').value =
			data5.Agent_IDExpiry
		document.getElementById('Agent_IDIssuingAuthority').value =
			data5.Agent_IDIssuingAuthority
		setA_AuthorityName(data5.Agent_IDIssuingAuthority)
		/////////////////
	}

	const [AgentValue, setAgentValue] = useState(false)
	const [EditValue, setEditValue] = useState(false)

	const [
		selectBusinessBusinessDetailSummary,
		setSelectBusinessBusinessDetailSummary
	] = useState('AU')
	const onSelectBusinessBusinessDetailSummary = (code) =>
		setSelectBusinessBusinessDetailSummary(code)

	const [selectBusinessKycDetailSummary, setSelectBusinessKycDetailSummary] =
		useState('AU')
	const onSelectBusinessKycDetailSummary = (code) =>
		setSelectBusinessKycDetailSummary(code)

	const [
		selectAgentBusinessDetailSummary,
		setSelectAgentBusinessDetailSummary
	] = useState('AU')
	const onSelectAgentBusinessDetailSummary = (code) =>
		setSelectAgentBusinessDetailSummary(code)

	const [selectAgentKycDetailSummary, setSelectAgentKycDetailSummary] =
		useState('AU')
	const onSelectAgentKycDetailSummary = (code) =>
		setSelectAgentKycDetailSummary(code)

	const [IdAuthority, setIdAuthority] = useState([])
	const [IdAuthoritySubtype, setIdAuthoritySubtype] = useState([])

	const GetNationalityIdAuthority = async (values) => {
		try {
			// debugger
			const NationalityName = {
				nationality: data4.Business_Nationality,
				countryId: Countrydata.CountryId
			}
			const response = await axios.post(
				CommonConstants.BASE_URL + '/getissueauthoritybynationality',
				NationalityName
			)
			if (response.data.status === true) {
				console.log(response.data.data, 'Nationality Authority')
				setIdAuthority(response.data.data)
				// setIdAuthoritySubtype(response.data.data[0].issueAuthority);
				// console.log(response.data.data[0].issueAuthority,"authoSub")
			}
		} catch (err) {
			console.log(err)
		}
	}

	const [AIdAuthority, setAIdAuthority] = useState([])
	const [AIdAuthoritySubtype, setAIdAuthoritySubtype] = useState([])

	const GetNationalityIdAuthorityAgent = async (values) => {
		try {
			const NationalityName = {
				nationality: data4.Agent_Nationality,
				countryId: Countrydata.CountryId
			}
			const response = await axios.post(
				CommonConstants.BASE_URL + '/getissueauthoritybynationality',
				NationalityName
			)
			if (response.data.status === true) {
				setAIdAuthority(response.data.data)
				setAIdAuthoritySubtype(response.data.data[0].issueAuthority)
				// console.log(response.data.data[0].issueAuthority,"authoSub")
			}
		} catch (err) {
			console.log(err)
		}
	}

	const {
		Countrydata,
		data2,
		data3,
		data4,
		data5,
		BusinessDataImageFront,
		BusinessDataImageBack,
		AgentDataImageFront,
		AgentDataImageBack,
		AdditionalImageArray
	} = useContext(userContext)

	// console.log(data5,"data5")
	// const [States,setStates]=useState([])
	const [Country, setCountry] = useState([])
	const [States, setStates] = useState([])
	const [StatesAgent, setStatesAgent] = useState([])
	// const [StatesAgent, setStatesAgent] = useState([]);
	// const [StatesAgent, setStatesAgent] = useState([]);
	const [AutoTimeZone, setAutoTimeZone] = useState('')

	useEffect(() => {


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


		document.getElementById('Agent_Country_of_Business_Registration').value =
			data3.Agent_Country_of_Business_Registration
		document.getElementById('Agent_Target_Market').value =
			data3.Agent_Target_Market

		document.getElementById('Business_Company_Type').value =
			data3.Business_CompanyType

		document.getElementById('B_employees').value =
			data3.Business_No_of_employees

		document.getElementById('Business_IndustryType').value =
			data3.Business_Industry_type

		document.getElementById('Business_Target_Market').value =
			data3.Business_Target_Market

		document.getElementById('Business_Nationality').value =
			data4.Business_Nationality
		// document.getElementById("B_KYC_Business_State").value =
		//   data4.Business_State;
		document.getElementById('B_KYC__Occupation').value =
			data4.Business_Occupation
		document.getElementById('B_KYC__Residence').value =
			data4.Business_Residence

		document.getElementById('Agent_Nationality').value =
			data4.Agent_Nationality
		// document.getElementById("Agent_kycstate").value = data4.Agent_State;
		document.getElementById('Agent_kycOccupation').value =
			data4.Agent_Occupation
		document.getElementById('Agent_kycResidence').value = data4.Agent_Residence

		document.getElementById('Business_Id_Type').value = data5.Business_IDType
		// document.getElementById("Business_IDIssuingAuthority").value =
		//   data5.Business_IDIssuingAuthority;

		document.getElementById('Agent_IdType').value = data5.Agent_IDType
		// document.getElementById("Agent_IDIssuingAuthority").value =
		//   data5.Agent_IDIssuingAuthority;

		if (Name == 'Individual') {
			document.getElementById('stepone7in1').style.display = 'block'
			document.getElementById('steptwo7in2').style.display = 'none'
			document.getElementById('stepthree7in3').style.display = 'none'
		} else if (Name == 'Business') {
			const CCodeNumber = Countrydata.CountryPhoneCode.substring(0, 1)

			if (CCodeNumber === '+') {
				setCPhoneCode(Countrydata.CountryPhoneCode)
			} else {
				setCPhoneCode('+' + Countrydata.CountryPhoneCode)
			}
			document.getElementById('stepone7in1').style.display = 'none'
			document.getElementById('steptwo7in2').style.display = 'block'
			document.getElementById('stepthree7in3').style.display = 'none'
		} else {
			if (Name == 'Agent') {
				const CCodeNumber = Countrydata.CountryPhoneCode.substring(0, 1)

				if (CCodeNumber === '+') {
					setCPhoneCode(Countrydata.CountryPhoneCode)
				} else {
					setCPhoneCode('+' + Countrydata.CountryPhoneCode)
				}
			}
			document.getElementById('stepone7in1').style.display = 'none'
			document.getElementById('steptwo7in2').style.display = 'none'
			document.getElementById('stepthree7in3').style.display = 'block'
		}
	}, [Name, AgentValue, EditValue, handleid, data4])

	useEffect(() => {
		if (UpdateStep == 'IsixthStep' || UpdateStep == 'BsixthStep' || UpdateStep == 'AsixthStep') {
			GetAllCountrys()
			GetAllNationality()
			GetAllOccupation()
		}
	}, [])

	useEffect(() => {
		if (SummuryDocuments == true && UpdateStep == 'BsixthStep') {
			BUserData()
			GetNationalityIdAuthority()
			GetAllStates()
		} else if (SummuryDocuments == true && UpdateStep == 'AsixthStep' || UpdateStep == 'SkipAsixthStep') {
			AUserData()
			GetNationalityIdAuthorityAgent()
			GetAllStatesAgent()
		}
	}, [UpdateStep, R_ID, B_ID, K_ID, I_ID, SummuryDocuments])

	useEffect(() => {
		if (CountryID) {
			GetIdTypeByCountryId()
		}
	}, [CountryID])
	useEffect(() => {

		if (DirectorForms) {
			const DetailsArray = []
			DirectorForms.map((details) => {
				const DArrayname = {
					userId: +R_ID,
					isShareHolder: false,
					name: details.name,
					email: details.email,
					phone: details.phone,
					percentageOfShareHolding: details.percentageOfShareHolding
				}
				DetailsArray.push(DArrayname)
			})
			setFormData(DetailsArray)
		}

		if (ShareholderForms) {
			const ShareholderArray = []
			ShareholderForms.map((details) => {
				const DArrayname = {
					userId: +R_ID,
					isShareHolder: false,
					name: details.name,
					email: details.email,
					phone: details.phone,
					percentageOfShareHolding: details.percentageOfShareHolding
				}
				ShareholderArray.push(DArrayname)
			})
			setFormData2(ShareholderArray)
		}
	}, [DirectorForms, ShareholderForms])

	const AddFieldDirector = () => {
		let newfield = {userId: +R_ID, isShareHolder: false, name: '', email: '', phone: '', percentageOfShareHolding: ''}

		setFormData([...formDataa, newfield])
	}

	const UpdateremoveFieldsReciptionDetails = (index) => {
		// debugger;
		const fields = [...formDataa]
		fields.splice(index, 1)
		setFormData(fields)
	}

	const submitDelivery = (e) => {
		e.preventDefault()
		return formDataa
	}

	const AddFieldShareHolder = () => {
		let newfield = {userId: +R_ID, isShareHolder: false, name: '', email: '', phone: '', percentageOfShareHolding: ''}

		setFormData2([...formData2, newfield])
	}

	const UpdateremoveFieldsShareHolder = (index) => {
		// debugger;
		const fields = [...formData2]
		fields.splice(index, 1)
		setFormData2(fields)
	}

	const submitShareHolder = (e) => {
		e.preventDefault()
		return formData2
	}

	// const handleFormChangeUpdateDetails = (index, event) => {
	//   let data = [...formData];
	//   data[index][event.target.name] = event.target.value;
	//   setFormData(data);
	// };

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

			const matchedState = States.find((stateItem) => stateItem.name === state)
			if (matchedState) {
				document.getElementById('B_KYC_Business_State').value = matchedState.id
				setB_StateId(matchedState.id)
			}
			document.getElementById('B_KYC_Housename').value = streetName
			document.getElementById('B_KYC_city').value = city
			document.getElementById('B_KYC_zipcode').value = postal_code
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

			const matchedState = States.find((stateItem) => stateItem.name === state)
			if (matchedState) {
				setA_StateId(matchedState.id)
				document.getElementById('Agent_kycstate').value = matchedState.id
			}
			document.getElementById('AgentHousename').value = streetName
			document.getElementById('Agentkyccity').value = city
			document.getElementById('Agentkyczipcode').value = postal_code
		}
		setIsAddressValid2(isValid)
		return isValid
	}

	const autocompleteRef2 = React.useRef(null)

	//////////////////////////////
	/////get-All-State or Country/////
	const GetAllCountrys = async (values) => {
		try {
			const response = await axios.get(
				CommonConstants.BASE_URL + '/getallcountries'
			)
			// console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
			if (response.data.status === true) {
				// console.log(response.data.data)
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
				id: Countrydata.CountryId
			}
			// // console.log(values)
			const response = await axios.post(
				CommonConstants.BASE_URL + '/getallstatebycountryid',
				CountryId
			)
			// console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
			if (response.data.status === true) {
				// console.log(response.data.data)
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
				id: Countrydata.CountryId
			}
			// // console.log(values)
			const response = await axios.post(
				CommonConstants.BASE_URL + '/getallstatebycountryid',
				CountryId
			)
			// console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
			if (response.data.status == true) {
				// console.log(response.data.data)
				setStatesAgent(response.data.data)
			} else if (response.data.status === 'error') {
				// console.log(response.data.message)
				// setErrorhandle(response.data.message)
				// handleErrorShow()
			}
		} catch (err) {
			// console.log(err)
		}
	}

	/////////////////////////////

	const handleBusinessTarget_market = (event) => {
		document.getElementById('Business_Target_Market').value =
			event.target.value
	}

	const handleBusiness_CompanyTypeChange = (event) => {
		document.getElementById('Business_Company_Type').value = event.target.value
	}

	const handleBusiness_No_of_Employee = (event) => {
		document.getElementById('B_employees').value = event.target.value
	}

	const Agent_Country_of_Business_Registration = (event) => {
		document.getElementById('Agent_Country_of_Business_Registration').value =
			event.target.value
	}

	const Agent_Target_Market = (event) => {
		document.getElementById('Agent_Target_Market').value = event.target.value
	}

	const handleBusiness_IndustryTypeChange = (event) => {
		document.getElementById('Business_IndustryType').value = event.target.value
	}

	const handleBusiness_Kyc_NationalityChange = (event) => {
		document.getElementById('Business_Nationality').value = event.target.value
		// GetAllStates();
	}

	const handleAgent_Kyc_NationalityChange = (event) => {
		document.getElementById('Agent_Nationality').value = event.target.value
		// GetAllStatesAgent();
	}

	const handleBusiness_Kyc_StateChange = (event) => {
		document.getElementById('Business_State').value = event.target.value
		setB_StateId(event.target.value)
	}

	const handleBusiness_Kyc_OccupationChange = (event) => {
		document.getElementById('B_KYC__Occupation').value = event.target.value
	}

	const handleBusiness_Kyc_ResidenceChange = (event) => {
		document.getElementById('Business_Residence').value = event.target.value
	}

	const handleAgent_Kyc_StateChange = (event) => {
		document.getElementById('Agent_kycstate').value = event.target.value
		setA_StateId(event.target.value)
	}

	const handleAgent_Kyc_OccupationChange = (event) => {
		document.getElementById('Agent_kycOccupation').value = event.target.value
	}

	const handleAgent_Kyc_ResidenceChange = (event) => {
		document.getElementById('Agent_kycResidence').value = event.target.value
	}

	const handleBusiness_Kyc_IDTypeChange = (event) => {
		document.getElementById('Business_IdType').value = event.target.value
	}

	const handleBusiness_Kyc_IDIssuingAuthorityChange = (event) => {
		document.getElementById('Business_IDIssuingAuthority').value =
			event.target.value
		setB_AuthorityName(event.target.value)
	}

	const handleAgent_Kyc_IDTypeChange = (event) => {
		document.getElementById('Agent_IdType').value = event.target.value
	}

	const handleAgent_Kyc_IDIssuingAuthorityChange = (event) => {
		document.getElementById('Agent_IDIssuingAuthority').value =
			event.target.value
		setA_AuthorityName(event.target.value)
	}
	/////////Bussiness - Data//////////

	const EditBussinessUserDetails = () => {
		setEditValue(true)
	}

	const saveBussinessUserDetails = () => {
		validator.error_input_validation('SummaryStep7Business1')
		if (validator.error_input_validation('SummaryStep7Business1')) {
			handleShow()
		}
	}

	const EditBussinessBusinessDetails = () => {
		setEditValue(true)
	}
	const saveBussinessDetails = () => {
		validator.error_input_validation('Sumarry7BusinessDetails_Validation')
		if (
			validator.error_input_validation('Sumarry7BusinessDetails_Validation')
		) {
			handleShow()
		}
	}

	const EditBussinessKYCUserDetails = () => {
		setEditValue(true)
	}
	const saveBussinessKYCDetails = () => {
		validator.error_input_validation('Sumarry7Business_KYC_Validation')
		if (validator.error_input_validation('Sumarry7Business_KYC_Validation')) {
			handleShow()
		}
	}

	const EditBussinessIDDetails = () => {
		setEditValue(true)
	}
	const saveBussinessIDDetails = () => {
		validator.error_input_validation('Sumarry7Business_IDDetails_Validation')
		if (
			validator.error_input_validation('Sumarry7Business_IDDetails_Validation')
		) {
			handleShow()
		}
	}

	///////////////////////////////////

	/////////Agent - Data//////////
	const EditAgentUserDetails = () => {
		setAgentValue(true)
	}
	const saveAgentUserDetails = () => {
		validator.error_input_validation('Summary7AgentUserDetails')
		if (validator.error_input_validation('Summary7AgentUserDetails')) {
			handleAgentShow()
		}
	}

	const EditAgentBussinessDetails = () => {
		setAgentValue(true)
	}

	const saveAgentBussinessUserDetails = () => {
		validator.error_input_validation('Summary7AgentBusinessDetails')
		if (validator.error_input_validation('Summary7AgentBusinessDetails')) {
			handleAgentShow()
		}
	}

	const EditAgentKYCUserDetails = () => {
		setAgentValue(true)
	}

	const saveAgentKYCDetails = () => {
		handleAgentShow()
	}

	const EditAgentIDDetails = () => {
		setAgentValue(true)
	}

	const saveAgentIDDetails = () => {
		handleAgentShow()
	}

	///////////////////////////////////
	const [Occupation, setOccupation] = useState([])

	const GetAllOccupation = async (values) => {
		try {
			const response = await axios.get(
				CommonConstants.BASE_URL + '/getalloccupations'
			)
			if (response.data.status === true) {
				setOccupation(response.data.data)
			} else if (response.data.status === 'error') {
				// console.log(response.data.message)
			}
		} catch (err) {
			// console.log(err)
		}
	}

	const [Nationality, setNationality] = useState([])
	const GetAllNationality = async (values) => {
		try {
			const response = await axios.get(
				CommonConstants.BASE_URL + '/getallnationality'
			)
			// // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
			if (response.data.status === true) {
				// // console.log(response.data.data)
				setNationality(response.data.data)
			} else if (response.data.status === 'error') {
				// console.log(response.data.message)
			}
		} catch (err) {
			// console.log(err)
		}
	}
	/////////////////////////////////////////////////

	const [ExistMobile, setExistMobile] = useState(false)

	const ExistMobileVerify = async (e) => {
		try {
			const UserExist = {
				phone: e.target.value
			}

			const MobileNumberVerify = await axios.post(
				CommonConstants.BASE_URL + '/checkuserexistornot',
				UserExist
			)

			if (MobileNumberVerify.data.status === false) {
				setExistMobile(true)
			} else {
				setExistMobile(false)
			}
		} catch (e) {
			console.log(e)
		}
	}

	const IndividualhandlemobileNo = (e) => {
		// IndividualMo_Number(e.target.value);
		ExistMobileVerify(e)
	}

	const [validationMobile, setvalidationMobile] = useState(false)

	const mobilevalidationchanges = (e) => {
		// handleDataStep2(e)
		var mobilenumbervalidate = e.target.value

		setExistMobile(false)

		var phoneno = /^(?!0|4)\d{5,15}$/
		var zerovalid = /^((04)|0)\d{8}$/
		var Fourvalid = /^4\d{8}$/

		if (CPhoneCode == '+61') {
			setvalidationMobile(true)
			if (zerovalid.test(mobilenumbervalidate)) {
				setvalidationMobile(false)
			} else if (Fourvalid.test(mobilenumbervalidate)) {
				setvalidationMobile(false)
			} else if (
				mobilenumbervalidate.indexOf('04') === '0' &&
				mobilenumbervalidate.charAt(0) === '4'
			) {
				setvalidationMobile(true)
			}
		} else {
			if (phoneno.test(mobilenumbervalidate)) {
				setvalidationMobile(false)
			}
		}
	}

	//   const [AExistMobile,setAExistMobile]=useState(false)

	const AExistMobileVerify = async (e) => {
		try {
			const UserExist = {
				phone: e.target.value
			}
			// console.log(UserExist, " checkuserexistornot");
			// console.log(document.getElementById("OtpNumber").value, " OtpVerifyData By Id")

			const MobileNumberVerify = await axios.post(
				CommonConstants.BASE_URL + '/checkuserexistornot',
				UserExist
			)
			// console.log("otpVerifyDataResponse",MobileNumberVerify)
			if (MobileNumberVerify.data.status === false) {
				setAExistMobile(true)
			} else {
				setAExistMobile(false)
			}
		} catch (e) {
			console.log(e)
		}
	}

	const AgenthandlemobileNo = (e) => {
		// AgentMo_Number(e.target.value);
		AExistMobileVerify(e)
	}

	const mobilevalidationchanges2 = (e) => {
		// handleDataStep2(e)
		var mobilenumbervalidate = e.target.value
		setExistMobile(false)
		var zerovalid = /^((04)|0)\d{8}$/
		var Fourvalid = /^4\d{8}$/
		if (
			mobilenumbervalidate.charAt(0) === '0' ||
			mobilenumbervalidate.charAt(0) === '4'
		) {
			setvalidationMobile(true)
		} else {
			setvalidationMobile(false)
		}

		if (zerovalid.test(mobilenumbervalidate)) {
			setvalidationMobile(false)
		} else if (Fourvalid.test(mobilenumbervalidate)) {
			setvalidationMobile(false)
		}
	}
	///////////////////Email/////////////////////
	const [AExistEmail, setAExistEmail] = useState(false)

	const AExistEmailVerify = async (e) => {
		try {
			const UserExist = {
				email: e.target.value
			}
			// console.log(UserExist, " checkuserexistornot");
			// console.log(document.getElementById("OtpNumber").value, " OtpVerifyData By Id")

			const MobileNumberVerify = await axios.post(
				CommonConstants.BASE_URL + '/checkuserexistornot',
				UserExist
			)
			// console.log("otpVerifyDataResponse",MobileNumberVerify)
			if (MobileNumberVerify.data.status === false) {
				setAExistEmail(true)
			} else {
				setAExistEmail(false)
			}
		} catch (e) {
			console.log(e)
		}
	}

	const [BExistEmail, setBExistEmail] = useState(false)

	const BExistEmailVerify = async (e) => {
		try {
			if (data2.Business_BusinessEmail != e.target.value) {
				const UserExist = {
					email: e.target.value
				}
				// console.log(UserExist, " checkuserexistornot");
				// console.log(document.getElementById("OtpNumber").value, " OtpVerifyData By Id")

				const MobileNumberVerify = await axios.post(
					CommonConstants.BASE_URL + '/checkuserexistornot',
					UserExist
				)
				// console.log("otpVerifyDataResponse",MobileNumberVerify)
				if (MobileNumberVerify.data.status === false) {
					setBExistEmail(true)
				} else {
					setBExistEmail(false)
				}
			}
		} catch (e) {
			console.log(e)
		}
	}
	const [userData, setuserData] = useState([])
	const [UploadImageArray, setUploadImageArray] = useState([])
	const [B_AuthorityName, setB_AuthorityName] = useState('')
	const [B_StateId, setB_StateId] = useState('')

	const [A_AuthorityName, setA_AuthorityName] = useState('')
	const [A_StateId, setA_StateId] = useState('')

	const BUserData = () => {
		axios
			.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: R_ID})
			.then((response) => {

				// console.log(response.data.data.idDocuments)
				// setUploadImageArray()
				var Data = response.data.data

				data2.Business_Fullname = Data.fName
				data2.Business_BusinessName = Data.businessName
				data2.Business_RegistrationNo = Data.regNo
				data2.Business_AddressofBusiness = Data.businessAddress
				data2.Business_BusinessEmail = Data.email
				data2.Business_MobileNumber = Data.phone

				data3.Business_CompanyType = Data.businessDetails.companyName
				data3.Business_No_of_employees = Data.businessDetails.noEmployee
				data3.Business_No_of_directors = Data.businessDetails.noDirector
				data3.Business_No_of_Shareholders = Data.businessDetails.noShareholder
				data3.Business_Industry_type = Data.businessDetails.industryType
				data3.Business_Target_Market = Data.businessDetails.targetBusiness //--
				data3.Business_sending_currency_per_year =
					Data.businessDetails.expectedRemittance
				data3.Business_Expected_transaction_per_year =
					Data.businessDetails.noOfTranscation
				data3.Business_Website = Data.businessDetails.website

				data4.Business_Nationality = Data.userkycdetails.nationality
				data4.Business_StreetName = Data.userkycdetails.streetName
				data4.Business_City = Data.userkycdetails.suburb
				data4.Business_State = Data.userkycdetails.stateId
				data4.Business_Zip = Data.userkycdetails.postalCode
				data4.Business_Occupation = Data.userkycdetails.occupationId
				data4.Business_Residence =
					Data.userkycdetails.isResidence == true ? 'Yes' : 'No'

				data5.Business_IDType = Data.iddetails.typeId
				data5.Business_IDNumber = Data.iddetails.documentNumber
				data5.Business_CardNumber = Data.iddetails.cardNumber
				data5.Business_DOB = Data.iddetails.dob
				data5.Business_IDExpiry = Data.iddetails.documentValidity
				data5.Business_IDIssuingAuthority = Data.iddetails.issuingAuthority
				setAutoTimeZone(response.data.data.regTimezone)
				setuserData(response.data.data)


				var ImageArray = []

				if (response.data.data.roleId === 2) {
					response.data.data.additionalDocuments.map((ImagesArray, index) => {
						const isDuplicate = ImageArray.some(item => item?.documentType === ImagesArray?.documentType)
						if (!isDuplicate) {
							if (ImagesArray?.documentType != null) {
								const OtherImageArray = {
									documentTypeId: ImagesArray?.documentTypeId,
									documentType: ImagesArray?.documentType,
									filePath: []
								}
								ImageArray.push(OtherImageArray)
							}
						}
					})

					const documentTypeMap = {}
					ImageArray.forEach((obj, index) => {
						documentTypeMap[obj.documentTypeId] = index
					})

					response.data.data.additionalDocuments.forEach((image) => {
						if (documentTypeMap[image?.documentTypeId] !== undefined) {
							const index = documentTypeMap[image?.documentTypeId]
							ImageArray[index].filePath.push({
								files: image?.filePath,
								active: image?.isActive
							})
						}
					})
				} else {
					response.data.data.businessDocuments.map((ImagesArray, index) => {
						console.log(ImagesArray?.documentType, 'ImagesArray?')
						const isDuplicate = ImageArray.some(item => item.documentType === ImagesArray?.documentType)
						console.log(isDuplicate, 'isDuplicate')
						if (!isDuplicate) {
							if (ImagesArray?.documentType != null) {
								const OtherImageArray = {
									documentTypeId: ImagesArray?.documentTypeId,
									documentType: ImagesArray?.documentType,
									filePath: []
								}
								ImageArray.push(OtherImageArray)
							}
						}
					})
					const documentTypeMap = {}
					ImageArray.forEach((obj, index) => {
						documentTypeMap[obj.documentTypeId] = index
					})

					response.data.data.businessDocuments.forEach((image) => {
						if (documentTypeMap[image?.documentTypeId] !== undefined) {
							const index = documentTypeMap[image?.documentTypeId]
							ImageArray[index].filePath.push({
								files: image?.filePath,
								active: image?.isActive
							})
						}
					})
				}
				setUploadImageArray(ImageArray)

				document.getElementById('Business_Nationality').value = Data.userkycdetails.nationality
				document.getElementById('B_KYC_Business_State').value = Data.userkycdetails.stateId
				document.getElementById('B_KYC__Occupation').value = Data.userkycdetails.occupationId
				document.getElementById('B_KYC__Residence').value = Data.userkycdetails.isResidence == true ? 'Yes' : 'No'
				document.getElementById('Business_Id_Type').value = Data.iddetails.typeId
				document.getElementById('Business_IDIssuingAuthority').value = Data.iddetails.issuingAuthority
				setB_AuthorityName(Data.iddetails.issuingAuthority)
				setB_StateId(Data.userkycdetails.stateId)
				console.log(response.data.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const AUserData = () => {
		axios
			.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: R_ID})
			.then((response) => {
				console.log(response.data.data)
				var Data = response.data.data

				data2.Agent_Firstname = Data.fName
				data2.Agent_Middlename = Data.mName
				data2.Agent_Lastname = Data.lName
				data2.Agent_Email = Data.email
				data2.Agent_MobileNumber = Data.phone

				data3.Agent_Business_Name = Data.businessDetails.typeBusiness
				data3.Agent_Registration_No = Data.businessDetails.abn
				data3.Agent_Country_of_Business_Registration =
					Data.businessDetails.countryOfBusiness
				data3.Agent_Address_of_Business = Data.businessDetails.businessAddress
				data3.Agent_Target_Market = Data.businessDetails.targetBusiness
				data3.Agent_current_business_year = Data.businessDetails.volumeYear
				data3.Agent_sending_currency_per_year =
					Data.businessDetails.expectedRemittance
				data3.Agent_Expected_transaction_per_year =
					Data.businessDetails.noOfTranscation
				data3.Agent_Website = Data.businessDetails.website

				data4.Agent_Nationality = Data.userkycdetails.nationality
				data4.Agent_StreetName = Data.userkycdetails.streetName
				data4.Agent_City = Data.userkycdetails.suburb
				data4.Agent_State = Data.userkycdetails.stateId
				data4.Agent_Zip = Data.userkycdetails.postalCode
				data4.Agent_Occupation = Data.userkycdetails.occupationId
				data4.Agent_Residence =
					Data.userkycdetails.isResidence == true ? 'Yes' : 'No'

				data5.Agent_IDType = Data.iddetails.typeId
				data5.Agent_IDNumber = Data.iddetails.documentNumber
				data5.Agent_CardNumber = Data.iddetails.cardNumber
				data5.Agent_DOB = Data.iddetails.dob
				data5.Agent_IDExpiry = Data.iddetails.documentValidity
				data5.Agent_IDIssuingAuthority = Data.iddetails.issuingAuthority

				setAutoTimeZone(response.data.data.regTimezone)
				setuserData(response.data.data)

				var ImageArray = []

				if (response.data.data.roleId === 2) {
					response.data.data.additionalDocuments.map((ImagesArray, index) => {
						// console.log(ImagesArray.documentType,"ImagesArray")
						const isDuplicate = ImageArray.some(item => item?.documentType === ImagesArray?.documentType)
						// console.log(isDuplicate,"isDuplicate")
						if (!isDuplicate) {
							if (ImagesArray?.documentType != null) {
								const OtherImageArray = {
									documentTypeId: ImagesArray?.documentTypeId,
									documentType: ImagesArray?.documentType,
									filePath: []
								}
								ImageArray.push(OtherImageArray)
							}
						}
					})
					// console.log(ImageArray,"ImagesDuplicate")
					const documentTypeMap = {}
					ImageArray.forEach((obj, index) => {
						documentTypeMap[obj.documentTypeId] = index
					})

					// Fill the filePath arrays using map
					response.data.data.additionalDocuments.forEach((image) => {
						if (documentTypeMap[image?.documentTypeId] !== undefined) {
							const index = documentTypeMap[image?.documentTypeId]
							ImageArray[index].filePath.push({
								files: image?.filePath,
								active: image?.isActive
							})
						}
					})
				} else {
					response.data.data.businessDocuments.map((ImagesArray, index) => {
						console.log(ImagesArray?.documentType, 'ImagesArray?')
						const isDuplicate = ImageArray.some(item => item.documentType === ImagesArray?.documentType)
						console.log(isDuplicate, 'isDuplicate')
						if (!isDuplicate) {
							if (ImagesArray?.documentType != null) {
								const OtherImageArray = {
									documentTypeId: ImagesArray?.documentTypeId,
									documentType: ImagesArray?.documentType,
									filePath: []
								}
								ImageArray.push(OtherImageArray)
							}
						}
					})
					// console.log(ImageArray,"ImagesDuplicate")
					const documentTypeMap = {}
					ImageArray.forEach((obj, index) => {
						documentTypeMap[obj.documentTypeId] = index
					})

					// Fill the filePath arrays using map
					response.data.data.businessDocuments.forEach((image) => {
						if (documentTypeMap[image?.documentTypeId] !== undefined) {
							const index = documentTypeMap[image?.documentTypeId]
							ImageArray[index].filePath.push({
								files: image?.filePath,
								active: image?.isActive
							})
						}
					})
				}
				setUploadImageArray(ImageArray)

				document.getElementById('Agent_Nationality').value = Data.userkycdetails.nationality
				document.getElementById('Agent_kycstate').value = Data.userkycdetails.stateId
				document.getElementById('Agent_kycOccupation').value = Data.userkycdetails.occupationId
				document.getElementById('Agent_kycResidence').value = Data.userkycdetails.isResidence == true ? 'Yes' : 'No'
				document.getElementById('Agent_IdType').value = Data.iddetails.typeId
				document.getElementById('Agent_IDIssuingAuthority').value = Data.iddetails.issuingAuthority
				setA_AuthorityName(Data.iddetails.issuingAuthority)
				setA_StateId(Data.userkycdetails.stateId)
				console.log(response.data.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	//   const UPDATEuserDataIndividual = async () => {
	//     // setloadervalue(true)
	//     const formData = new FormData();
	//     formData.append(
	//       "user",
	//       `{
	//          "id":${R_ID},
	//          "roleId":${userData.roleId},
	//          "countryId":${userData.countryId},
	//          "refCodeId":"${userData.refCodeId}",
	//          "fName":"${document.getElementById("IndividualFirstname").value}",
	//          "mName":"${document.getElementById("IndividualMiddlename").value}",
	//          "lName":"${document.getElementById("IndividualLastname").value}",
	//          "phone":"${document.getElementById("IndividualMobileNumber").value}",
	//          "phoneCode":"${userData.phoneCode}",
	//          "phoneVerifiedAt":"",
	//          "isEmailVerified":0,
	//          "emailVerifiedAt":"",
	//          "isDeleted":false,
	//          "isOCRVerfiedId":0,
	//          "email":"${document.getElementById("IndividualEmail").value}",
	//          "password":"${document.getElementById("IndividualPassword").value}",
	//          "digitalVerifiedLink": "${userData.digitalVerifiedLink}",
	//          "digitalVerifiedTransactionId": "${userData.digitalVerifiedTransactionId}"
	//         }`
	//     );

	//     formData.append(
	//       'kycdetails',
	//       `{
	//         "id":${K_ID},
	//         "userId":${R_ID},
	//         "streetName":"${document.getElementById("Individual_Housename").value}",
	//         "stateId":${document.getElementById("Individual_State").value},
	//         "nationality":"${document.getElementById("Indidual_Nationality").value}",
	//         "suburb":"${document.getElementById("Individual_kyccity").value}",
	//         "postalCode":"${document.getElementById("Individual_kyczipcode").value}",
	//         "verified":0,
	//         "occupationId":${document.getElementById("Individual_Occupation").value},
	//         "isResidence": ${document.getElementById("Individual_Residence").value==="Yes" ? true: false},
	//         "kycStatus":""
	//       }`
	//     );

	//     formData.append(
	//       "iddetails",
	//       `{
	//         "id":${I_ID},
	//         "userId":${R_ID},
	//         "idType":"${document.getElementById("Individual_idtype").value}",
	//         "documentNumber":"${document.getElementById("Individual_id-number").value}",
	//         "cardNumber":"${document.getElementById("Individual_card-details").value}",
	//         "dob":"${document.getElementById("Individual_DOB-details").value}",
	//         "documentValidity":"${document.getElementById("Individual_IdExpire-details").value}",
	//         "issuingAuthority":"${document.getElementById("Individual_IDIssuingAuthority").value}"
	//       }`
	//     );

	//     const config = {
	//       method: "POST",
	//       url: CommonConstants.BASE_URL + "/updateuserinfo",
	//       headers: { "Content-Type": "multipart/form-data" },
	//       data: formData
	//     };

	//     axios(config)
	//       .then(function (response) {
	//         if(response.data.status===true){
	//           console.log(response.data.data,"UpdatedData")
	//           BUserData()
	//           // GoNextStepBA()
	//           // setloadervalue(false)
	//           // setModalShowAdd(true)
	//           // HandlerIndividualUser()
	//         }
	//       })
	//       .catch(function (error) {
	//         // setloadervalue(false)
	//       });
	//   };

	const handleBUpdateDataIndividual = async () => {
		// debugger
		axios
			.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: R_ID})
			.then((respo) => {
				console.log(respo, 'USERINFO')
				const formData = new FormData()
				formData.append(
					'user',
					`{
                 "id":${respo.data.data.id},
                 "roleId":${respo.data.data.roleId},
                 "countryId":${respo.data.data.countryId},
                 "refCodeId":"${respo.data.data.refCodeId}",
                 "fName":"${document.getElementById('BusinessFullName').value}",
                 "mName":"${respo.data.data.mName}",
                 "lName":"${respo.data.data.lName}",
                 "businessName":"${
						document.getElementById('B_BusinessName').value
					}",
                 "regNo":"${
						document.getElementById('B_ACN/ABN/Registration_No').value
					}",
                 "regTimezone":"${AutoTimeZone}",
                 "businessAddress":"${
						document.getElementById('B_BussinessAddress').value
					}",
                 "customerId":"${respo.data.data.customerId}",
                 "phone":"${document.getElementById('B_Mobile').value}",
                 "phoneCode":"${respo.data.data.phoneCode}",
                 "phoneVerifiedAt":"",
                 "isEmailVerified":0,
                 "emailVerifiedAt":"",
                 "isDeleted":false,
                 "isOCRVerfiedId":0,
                 "email":"${document.getElementById('B_Email').value}",
                 "password":"${document.getElementById('B_Password').value}",
                 "digitalVerifiedLink": "${
						respo.data.data.digitalVerifiedLink
					}",
                 "digitalVerifiedTransactionId": "${
						respo.data.data.digitalVerifiedTransactionId
					}",
                 "isSignupCompleted" : false 
                }`
				)

				formData.append(
					'businessDetails',
					`{
                  "id":${B_ID},
                  "userId":${R_ID},
                  "companyName":"${
						document.getElementById('Business_Company_Type').value
					}",
                  "abn":"",
                  "typeBusiness":"",
                  "industryType":"${
						document.getElementById('Business_IndustryType').value
					}",
                  "noDirector":"${
						// document.getElementById("B_directors").value
						formDataa.length
					}",
                  "noShareholder":"${
						// document.getElementById("B_Shareholders").value
						formData2.length
					}",
                  "noEmployee":"${
						document.getElementById('B_employees').value
					}",
                  "businessAddress":"",
                  "targetBusiness":"${
						document.getElementById('Business_Target_Market').value
					}",
                  "website":"${document.getElementById('B_Website').value}",
                  "expectedRemittance":"${
						document.getElementById('B_sending_currency').value
					}",
                  "volumeYear":"",
                  "noOfTranscation":"${
						document.getElementById('Expected_trans').value
					}",
                  "countryOfBusiness":""
                }`
				)

				formData.append(
					'kycdetails',
					`{
                "id":${K_ID},
                "userId":${R_ID},
                "streetName":"${
						document.getElementById('B_KYC_Housename').value
					}",
                "stateId":${
						B_StateId
					},
                "countryId": ${userData.userkycdetails.countryId} ,
                "nationality":"${
						document.getElementById('Business_Nationality').value
					}",
                "suburb":"${document.getElementById('B_KYC_city').value}",
                "postalCode":"${
						document.getElementById('B_KYC_zipcode').value
					}",
                "verified":0,
                "occupationId":${
						document.getElementById('B_KYC__Occupation').value
					},
                "isResidence": ${
						document.getElementById('B_KYC__Residence').value === 'Yes'
							? true
							: false
					},
                "kycStatus":""
                }`
				)

				formData.append(
					'iddetails',
					`{
                  "id":${I_ID},
                  "userId":${R_ID},
                  "typeId":"${
						document.getElementById('Business_Id_Type').value
					}",
                  "documentNumber":"${
						document.getElementById('B-id-number').value
					}",
                  "cardNumber":"${
						document.getElementById('B-card-details').value
					}",
                  "dob":"${document.getElementById('B-DOB-details').value}",
                  "documentValidity":"${
						document.getElementById('B-IdExpire-details').value
					}",
                  "issuingAuthority":"${
						document.getElementById('Business_IDIssuingAuthority').value
					}"
                }`
				)


				formData.append('isFromSignup', ExistVerifyDuplicate)
				formData.append('stepNo', 7)

				console.log(formData, 'formData')

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
							setEditValue(false)
							BUserData()
							handleClose()
							setExistVerifyDuplicate(false)
							//   GoNextStepBA();
							// setloadervalue(false)
							// setModalShowAdd(true)
							// HandlerIndividualUser()
							setShow(false)
						}
					})
					.catch(function (error) {
						// setloadervalue(false)
					})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const handleAUpdateDataIndividual = async () => {
		axios
			.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: R_ID})
			.then((respo) => {
				console.log(respo, 'USERINFO')
				const formData = new FormData()
				formData.append(
					'user',
					`{
              "id":${R_ID},
              "roleId":${userData.roleId},
              "countryId":${userData.countryId},
              "refCodeId":"${userData.refCodeId}",
              "fName":"${
						document.getElementById('Agent_First_Name').value
					}",
              "mName":"${
						document.getElementById('Agent_Middle_Name').value
					}",
              "lName":"${
						document.getElementById('Agent_Last_Name').value
					}",
              "phone":"${document.getElementById('Agent_Mobile').value}",
              "businessName":"${userData.businessName}",
              "regNo":"${userData.regNo}",
              "regTimezone":"${AutoTimeZone}",
              "businessAddress":"${userData.businessAddress}",
              "customerId":"${userData.customerId}",
              "phoneCode":"${userData.phoneCode}",
              "phoneVerifiedAt":"",
              "isEmailVerified":0,
              "emailVerifiedAt":"",
              "isDeleted":false,
              "isOCRVerfiedId":0,
              "email":"${document.getElementById('Agent_Email').value}",
              "password":"${
						document.getElementById('Agent_Password').value
					}",
              "digitalVerifiedLink": "${userData.digitalVerifiedLink}",
              "digitalVerifiedTransactionId": "${
						userData.digitalVerifiedTransactionId
					}",
              "isSignupCompleted" : false 
            }`
				)
				//////////////////////////baki che agnet//////////////////////////////////
				formData.append(
					'businessDetails',
					`{
                  "id":${B_ID},
                  "userId":${R_ID},
                  "companyName":"",
                  "abn":"${
						document.getElementById('Agent_ACN/ABN/Registration_No')
							.value
					}",
                  "typeBusiness":"${
						document.getElementById('Agent_Business_Name').value
					}",
                  "industryType":"",
                  "noDirector":"",
                  "noShareholder":"",
                  "noEmployee":"",
                  "businessAddress":"${
						document.getElementById('Agent_Bussinessaddress').value
					}",
                  "targetBusiness":"${
						document.getElementById('Agent_Target_Market').value
					}",
                  "website":"${document.getElementById('AgentWebsite').value}",
                  "expectedRemittance":"${
						document.getElementById('Agent_sending_currency').value
					}",
                  "volumeYear":"${
						document.getElementById(
							'Agent_No_of_years_in_current_business'
						).value
					}",
                  "noOfTranscation":"${
						document.getElementById('Agent_Expected_trans').value
					}",
                  "countryOfBusiness":"${
						document.getElementById(
							'Agent_Country_of_Business_Registration'
						).value
					}"
                }`
				)

				formData.append(
					'kycdetails',
					`{
                  "id":${K_ID},
                  "userId":${R_ID},
                  "streetName":"${
						document.getElementById('AgentHousename').value
					}",
                  "stateId":${A_StateId},
                  "countryId": ${userData.userkycdetails.countryId} ,
                  "nationality":"${
						document.getElementById('Agent_Nationality').value
					}",
                  "suburb":"${document.getElementById('Agentkyccity').value}",
                  "postalCode":"${
						document.getElementById('Agentkyczipcode').value
					}",
                  "verified":0,
                  "occupationId":${
						document.getElementById('Agent_kycOccupation').value
					},
                  "isResidence": ${
						document.getElementById('Agent_kycResidence').value ===
						'Yes'
							? true
							: false
					},
                  "kycStatus":""
                }`
				)

				formData.append(
					'iddetails',
					`{
                  "id":${I_ID},
                  "userId":${R_ID},
                  "typeId":"${document.getElementById('Agent_IdType').value}",
                  "documentNumber":"${
						document.getElementById('Agent-id-number').value
					}",
                  "cardNumber":"${
						document.getElementById('Agent-card-details').value
					}",
                  "dob":"${document.getElementById('Agent-DOB-details').value}",
                  "documentValidity":"${
						document.getElementById('Agent-IdExpire-details').value
					}",
                  "issuingAuthority":"${
						document.getElementById('Agent_IDIssuingAuthority').value
					}"
                }`
				)


				formData.append('isFromSignup', ExistVerifyDuplicate)
				formData.append('stepNo', 7)

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
							setAgentValue(false)
							AUserData()
							handleAgentClose()
							setExistVerifyDuplicate(false)
							setAShow(false)
						}
					})
					.catch(function (error) {
						console.log(error)
						// setloadervalue(false)
					})
			})
			.catch((err) => {
				console.log(err)
			})
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
				setIdtypes(response.data.data)
			}
		} catch (err) {
			// console.log(err)
		}
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


	return (
		<>
			<section>
				<div className="bgPurple  text-white text-center bolder my-4 py-3">
					Welcome to LegalRemit
				</div>
				<Container fluid>
					{loadervalue == true ? <Loader/> : ''}

					<Row id="stepone7in1" className="mb-5">
						<Row>
							<Col className="col-lg-12 p-0">
								<div className="text-center">
									<label className="text-center text-black mb-2">
										Summary (User){' '}
									</label>
								</div>
								<div className=" ms-2">
									<Accordion defaultActiveKey="0">
										<Accordion.Item eventKey="0">
											<Accordion.Header>User Details</Accordion.Header>
											<Accordion.Body>
												<Row className="my-3">
													<div className="d-flex justify-content-end ">
														<i className="fas fa-edit pt-1 me-1 "></i>
														<p className="edit pointer">Edit</p>
													</div>
												</Row>
												<Form>
													<Row>
														<div className="text-center">
															<label className="text-center text-black mb-4">
																User Details
															</label>
														</div>
														<Row className="mb-3 respoChildFooter">
															<Form.Group
																as={Col}
																className="left-inner-addon input-container"
															>
																<i className="successText main fa fa-user "></i>
																<Form.Control
																	type="text"
																	placeholder="First Name"
																	className={`formcontrol ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableAgentInput'
																	}`}
																/>
															</Form.Group>

															<Form.Group
																as={Col}
																className="left-inner-addon input-container"
															>
																<i className="successText main fa fa-user "></i>
																<Form.Control
																	type="text"
																	placeholder="Middle Name"
																	className={`formcontrol ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableAgentInput'
																	}`}
																/>
															</Form.Group>

															<Form.Group
																as={Col}
																className="left-inner-addon input-container"
															>
																<i className="successText main fa fa-user "></i>
																<Form.Control
																	type="text"
																	placeholder="Last Name"
																	className={`formcontrol ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableAgentInput'
																	}`}
																/>
															</Form.Group>
														</Row>

														<Row className="mb-3 respoChildFooter">
															<Form.Group
																as={Col}
																className="left-inner-addon input-container"
															>
																<i className="successText main fa fa-envelope "></i>
																<Form.Control
																	type="email"
																	placeholder="Email"
																	className={`formcontrol ${
																		AgentValue == true
																			? 'enableInput'
																			: 'disableAgentInput'
																	}`}
																/>
															</Form.Group>

															<Form.Group
																as={Col}
																className="left-inner-addon input-container"
															>
																<i className="successText main fa fa-mobile "></i>
																<Form.Control
																	type="text"
																	placeholder="Mobile"
																	className={`formcontrol ${
																		AgentValue == true
																			? 'enableInput'
																			: 'disableAgentInput'
																	}`}
																/>
															</Form.Group>
														</Row>

														<Row className="mb-3 respoChildFooter">
															<Form.Group
																as={Col}
																className="left-inner-addon input-container"
															>
																<i className="successText main fa fa-lock "></i>
																<Form.Control
																	type="password"
																	placeholder="Password"
																	className={`formcontrol ${
																		AgentValue == true
																			? 'enableInput'
																			: 'disableAgentInput'
																	}`}
																/>
															</Form.Group>

															<Form.Group
																as={Col}
																className="left-inner-addon input-container"
															>
																<i className="successText main fa fa-lock "></i>
																<Form.Control
																	type="password"
																	placeholder="Confirm Password"
																	className={`formcontrol ${
																		AgentValue == true
																			? 'enableInput'
																			: 'disableAgentInput'
																	}`}
																/>
															</Form.Group>
														</Row>
													</Row>
												</Form>
											</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="1">
											<Accordion.Header>KYC Details</Accordion.Header>
											<Accordion.Body>
												<Row className="my-3">
													<div className="d-flex justify-content-end ">
														<i className="fas fa-edit pt-1 me-1 "></i>
														<p className="edit pointer">Edit</p>
													</div>
												</Row>
												<Row id="stepone3in1">
													<div className="text-center">
														<label className="text-center text-black mb-2">
															KYC (individuale) Details
														</label>
													</div>
													<Row className="mb-3 respoChildFooter">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container "
														>
															<ReactFlagsSelect
																className="mainStep3Drps1"
																selected={select}
																onSelect={onSelect}
															/>
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
																placeholder="House No & Street Name"
																className={`formControlStep3 ${
																	AgentValue == true
																		? 'enableAgentInput'
																		: 'disableInput'
																}`}
															/>
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
																placeholder="Suburb/City"
																className={`formControlStep3 ${
																	AgentValue == true
																		? 'enableAgentInput'
																		: 'disableInput'
																}`}
															/>
														</Form.Group>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container "
														>
															<i className="blueText mainStep3 fa fa-map-marker "></i>
															<Form.Select className="mainStep3Select">
																<option>State</option>
																<option>Gujarat</option>
																<option>Delhi</option>
															</Form.Select>
														</Form.Group>
														<Form.Group
															as={Col}
															className="left-inner-addon input-container "
														>
															<i className="blueText mainStep3 fa fa fa-envelope "></i>
															<Form.Control
																type="text"
																placeholder="Postal / Zip Code"
																className={`formControlStep3 ${
																	AgentValue == true
																		? 'enableAgentInput'
																		: 'disableInput'
																}`}
															/>
														</Form.Group>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container "
														>
															<i className="blueText mainStep3 fa fa-briefcase "></i>
															<Form.Select className="mainStep3Select">
																<option>Occupation</option>
																<option>Job</option>
																<option>Business</option>
															</Form.Select>
															{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
														</Form.Group>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container "
														>
															<i className="blueText mainStep3 fa fa-map-marker "></i>
															<Form.Select className="mainStep3Select">
																<option>Is Residence of (USA)</option>
																<option>1</option>
																<option>3</option>
																<option>4</option>
															</Form.Select>
															{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
														</Form.Group>
													</Row>
												</Row>
											</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="2">
											<Accordion.Header>ID Details</Accordion.Header>
											<Accordion.Body>
												<Row className="my-3">
													<div className="d-flex justify-content-end ">
														<i className="fas fa-edit pt-1 me-1 "></i>
														<p className="edit pointer">Edit</p>
													</div>
												</Row>
												<Row>
													<div className="text-center">
														<label className="text-center text-black mb-2">
															KYC (individuale) Details
														</label>
													</div>
													<Row className="mb-3 respoChildFooter">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container "
														>
															<ReactFlagsSelect
																className="mainStep3Drps1"
																selected={select}
																onSelect={onSelect}
															/>
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
																placeholder="House No & Street Name"
																className={`formControlStep3 ${
																	AgentValue == true
																		? 'enableAgentInput'
																		: 'disableInput'
																}`}
															/>
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
																placeholder="Suburb/City"
																className={`formControlStep3 ${
																	AgentValue == true
																		? 'enableAgentInput'
																		: 'disableInput'
																}`}
															/>
														</Form.Group>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container "
														>
															<i className="blueText mainStep3 fa fa-map-marker "></i>
															<Form.Select className="mainStep3Select">
																<option>State</option>
																<option>Gujarat</option>
																<option>Delhi</option>
															</Form.Select>
														</Form.Group>
														<Form.Group
															as={Col}
															className="left-inner-addon input-container "
														>
															<i className="blueText mainStep3 fa fa fa-envelope "></i>
															<Form.Control
																type="text"
																placeholder="Postal / Zip Code"
																className={`formControlStep3 ${
																	AgentValue == true
																		? 'enableAgentInput'
																		: 'disableInput'
																}`}
															/>
														</Form.Group>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container "
														>
															<i className="blueText mainStep3 fa fa-briefcase "></i>
															<Form.Select className="mainStep3Select">
																<option>Occupation</option>
																<option>Job</option>
																<option>Business</option>
															</Form.Select>
															{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
														</Form.Group>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container "
														>
															<i className="blueText mainStep3 fa fa-map-marker "></i>
															<Form.Select className="mainStep3Select">
																<option>Is Residence of (USA)</option>
																<option>1</option>
																<option>3</option>
																<option>4</option>
															</Form.Select>
															{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
														</Form.Group>
													</Row>
												</Row>
											</Accordion.Body>
										</Accordion.Item>
										<Accordion.Item eventKey="3">
											<Accordion.Header>Documents</Accordion.Header>
											<Accordion.Body>
												<Row className="my-3">
													<div className="d-flex justify-content-end ">
														<i className="fas fa-edit pt-1 me-1 "></i>
														<p className="edit pointer">Edit</p>
													</div>
												</Row>
												Comming Soon..
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</div>
							</Col>
							{/* <Row className="d-flex justify-content-center mt-5">
                                <input type="button" className="col-lg-3 uppercase step7summary" value={"Edit All"}></input>
                            </Row> */}
						</Row>
					</Row>

					<Row id="steptwo7in2" className="mb-5">
						<Col className="col-lg-12 p-0">
							<div className="text-center">
								<label className="text-center text-black mb-2">Summary</label>
							</div>
							<div className=" ms-2">
								<Accordion defaultActiveKey="0">
									<Accordion.Item eventKey="0">
										<Accordion.Header
											className={`formcontrol ${
												EditValue == true
													? 'disableAccordian'
													: 'enableAccordian'
											}`}
										>
											User Details
										</Accordion.Header>
										<Accordion.Body>
											<Row
												id="Bedit"
												className={`my-3 ${
													EditValue == true ? 'd-none' : 'd-block'
												}`}
											>
												<div className="d-flex justify-content-end ">
													{/* <i className="fas fa-edit pt-1 me-1 "></i> */}
													{/* <p  className=" pointer" onClick={EditBussinessUserDetails}>Edit</p> */}
													<p
														className=" Editbtn7 text-center pointer"
														onClick={(e) => {
															EditBussinessUserDetails()
														}}
													>
														<i className="fas fa-edit"></i> Edit
													</p>
												</div>
											</Row>

											<Row
												id="Bcancle"
												className={`my-3 saveandcancle ${
													EditValue == true ? 'd-block' : 'd-none'
												}`}
											>
												<div className="d-flex justify-content-end">
													<p
														className=" pointer pe-3 canclebtn7 normal"
														onClick={(e) => {
															handleShow()
														}}
													>
														Cancel
													</p>
													<p
														className=" pointer savebtn7"
														onClick={(e) => {
															saveBussinessUserDetails()
														}}
													>
														Save
													</p>
												</div>
											</Row>

											<Form id="SummaryStep7Business1">
												<Row className="mb-3 respoChildFooter">
													<Col>
														<label className="normal ms-3 fs-6 mb-2">
															Full Name
														</label>
														<Form.Group
															as={Col}
															className="left-inner-addon input-container p-0"
														>
															<i className="successText mainone fa fa-user "></i>
															<Form.Control
																type="text"
																id="BusinessFullName"
																defaultValue={data2.Business_Fullname}
																placeholder="Full Name"
																className={`formcontrol required ${
																	EditValue == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
																onChange={(e) => {
																	var inputValue = e.target.value
																	var Alfabet = ''
																	var sanitizedValue = ''

																	if (inputValue) {
																		const regex = /[^a-zA-Z\s]/g
																		Alfabet = inputValue.replace(regex, '')
																		const words = Alfabet.split(' ')

																		sanitizedValue = words
																			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
																			.join(' ')
																	}
																	document.getElementById('BusinessFullName').value = sanitizedValue
																}}
															/>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Full Name
															</small>
														</Form.Group>
													</Col>
												</Row>
												<Row className="my-3">
													<Col className="mbStep">
														<label className="normal ms-3 fs-6 mb-2">
															Business Name
														</label>
														<Form.Group
															as={Col}
															className="left-inner-addon input-container p-0"
														>
															<i className="successText mainone fa fa-user "></i>
															<Form.Control
																type="text"
																id="B_BusinessName"
																defaultValue={data2.Business_BusinessName}
																placeholder="Business Name"
																className={`formcontrol required ${
																	EditValue == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
																onChange={(e) => {
																	var inputValue = e.target.value
																	var Alfabet = ''
																	var sanitizedValue = ''

																	if (inputValue) {
																		const regex = /[^a-zA-Z\s]/g
																		Alfabet = inputValue.replace(regex, '')
																		const words = Alfabet.split(' ')

																		sanitizedValue = words
																			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
																			.join(' ')
																	}
																	document.getElementById('B_BusinessName').value = sanitizedValue
																}}
															/>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Business Name
															</small>
														</Form.Group>
													</Col>
													<Col>
														<label className="normal ms-3 fs-6 mb-2">
															ACN/ABN/Registration_No
														</label>
														<Form.Group
															as={Col}
															className="left-inner-addon input-container p-0"
														>
															<i className="successText mainone fa fa-user "></i>
															<Form.Control
																type="text"
																id="B_ACN/ABN/Registration_No"
																defaultValue={data2.Business_RegistrationNo}
																placeholder="ACN/ABN/Registration No"
																className={`formcontrol required ${
																	EditValue == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
																onChange={(e) => {
																	let value = e.target.value
																	const newValue = value.replace(/[^0-9]/g, '')
																	document.getElementById('B_ACN/ABN/Registration_No').value = newValue
																}}
															/>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter ACN/ABN/Registration_No
															</small>
														</Form.Group>
													</Col>
												</Row>

												<Row className="mb-3 respoChildFooter">
													<Col>
														<label className="normal ms-3 fs-6 mb-2">
															Address of Business
														</label>
														<Form.Group
															as={Col}
															className="left-inner-addon input-container p-0"
														>
															<i className="successText mainone fa fa-map-marker "></i>
															<Form.Control
																type="text"
																id="B_BussinessAddress"
																defaultValue={data2.Business_AddressofBusiness}
																placeholder="Address of Business"
																className={`formcontrol required ${
																	EditValue == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
															/>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Bussiness Address
															</small>
														</Form.Group>
													</Col>
												</Row>

												<Row className="mb-3 respoChildFooter">
													<Col className="mbStep">
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
																id="B_Email"
																defaultValue={data2.Business_BusinessEmail}
																onBlur={(e) =>
																	data2.Business_BusinessEmail != e.target.value
																		? BExistEmailVerify(e)
																		: setBExistEmail(false)
																}
																placeholder="Email"
																className={`formcontrol email required ${
																	EditValue == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
															/>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Email
															</small>
															<small
																className={`text-danger  ms-2 error_font  ${
																	BExistEmail === true ? 'd-block' : 'd-none'
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
																	className={`inputphonecode formcontroll1 required form-input ${
																		ExistMobile === true ? 'border-danger' : ''
																	}`}
																/>
																<Form.Control
																	type="text"
																	id="B_Mobile"
																	defaultValue={data2.Business_MobileNumber}
																	onChange={(e) => {
																		mobilevalidationchanges(e)
																	}}
																	onBlur={(e) =>
																		data2.Business_MobileNumber !=
																		e.target.value
																			? ExistMobileVerify(e)
																			: setExistMobile(false)
																	}
																	readOnly
																	placeholder="Mobile"
																	className={`inputphonenum inputmobile formcontroll2 phone required ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
															</div>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Valid Mobile
															</small>
															<small
																className={`text-danger  ms-2 error_font  ${
																	ExistMobile === true ? 'd-block' : 'd-none'
																}`}
															>
																Mobile Already Exist
															</small>
															<small
																className={`text-danger  ms-2 error_font  ${
																	validationMobile === true
																		? 'd-block'
																		: 'd-none'
																}`}
															>
																This mobile Number must start with 04 or 4 and
																have 10 or 9 digits respectively
															</small>
														</Form.Group>
													</Col>
												</Row>

												<Row className="mb-3 respoChildFooter">
													<Col className="mbStep">
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
																id="B_Password"
																defaultValue={data2.Business_password}
																readOnly
																placeholder="Password"
																className={`formcontrol password required ${
																	EditValue == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
															/>
															{/* <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error" >Please Enter Password</small> */}
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter The Password
															</small>
															<small
																className="responsiveFontLarge  d-none text-danger password_error_message ms-2 error_message">
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
																id="B_CPassword"
																defaultValue={data2.Business_C_password}
																readOnly
																placeholder="Confirm Password"
																className={`formcontrol cpassword required ${
																	EditValue == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
															/>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter The Confirm Password
															</small>
															<small
																className="responsiveFontLarge  d-none text-danger error_message_matchpass ms-2 error_message">
																Password and confirm password are not matching
															</small>
														</Form.Group>
													</Col>
												</Row>
											</Form>
										</Accordion.Body>
									</Accordion.Item>

									<Accordion.Item eventKey="1">
										<Accordion.Header
											className={`formcontrol ${
												EditValue == true
													? 'disableAccordian'
													: 'enableAccordian'
											}`}
										>
											Bussiness Details
										</Accordion.Header>
										<Accordion.Body>
											<Row
												id="Bedit1"
												className={`my-3 editt ${
													EditValue == true ? 'd-none' : 'd-block'
												}`}
											>
												<div className="d-flex justify-content-end ">
													{/* <i className="fas fa-edit pt-1 me-1 "></i> */}
													{/* <p  className=" pointer" onClick={EditBussinessUserDetails}>Edit</p> */}
													<p
														className=" Editbtn7 text-center pointer"
														onClick={(e) => {
															EditBussinessBusinessDetails()
														}}
													>
														<i className="fas fa-edit"></i> Edit
													</p>
												</div>
											</Row>

											<Row
												id="Bcancle1"
												className={`my-3 saveandcancle ${
													EditValue == true ? 'd-block' : 'd-none'
												}`}
											>
												<div className="d-flex justify-content-end">
													<p
														className=" pointer pe-3  canclebtn7 normal"
														onClick={(e) => {
															handleShow()
														}}
													>
														Cancel
													</p>
													<p
														className=" pointer savebtn7 "
														onClick={(e) => {
															saveBussinessDetails()
														}}
													>
														Save
													</p>
												</div>
											</Row>

											<Row className="my-3 d-flex justify-content-center">
												<Form id="Sumarry7BusinessDetails_Validation">
													<Row className="respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Company Type
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon  input-container "
															>
																<i className="orangeText main fa fa-user "></i>
																<Form.Select
																	id="Business_Company_Type"
																	onChange={handleBusiness_CompanyTypeChange}
																	className={`mainDrp orangeBorder required formcontrol ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																>
																	<option value="">Company Type</option>
																	<option value="Sole Traders">
																		Sole Traders
																	</option>
																	<option value="Proprietary Limited (PTY LTD)">
																		Proprietary Limited (PTY LTD)
																	</option>
																	<option value="Partnership">
																		Partnership
																	</option>
																	<option value="Trustee">Trustee</option>
																	<option value="Public Limited company">
																		Public Limited company
																	</option>
																</Form.Select>
																{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Select Company Type
																</small>
															</Form.Group>
														</Col>

														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																No of Employees
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon  input-container "
															>
																<i className="orangeText main fa fa-user "></i>

																<Form.Select
																	// defaultValue={data3.Business_No_of_employees}
																	type="text"
																	onChange={handleBusiness_No_of_Employee}
																	id="B_employees"
																	name="businessdetails"
																	placeholder="No. of employees"
																	className={`mainDrp required number orangeBorder formcontrol ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																>
																	<option value="">No of employees</option>
																	<option value="1">1</option>
																	<option value="2-9">2-9</option>
																	<option value="10-19">10-19</option>
																	<option value="20-50">20-50</option>
																	<option value="50+">50+</option>
																</Form.Select>
																{/* <Form.Control defaultValue={data2.Business_Fullname} type="text" placeholder="First Name" className="formControlStep2"/> */}
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter No. of employees
																</small>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
																	Please Enter Valid number
																</small>
															</Form.Group>

														</Col>

														<label htmlFor="name" className="form-label1">
															No of employees
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Confirm Employee count
														</small>
														<small
															className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
															Please Enter Valid number
														</small>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																No. of directors
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container pb-0"
															>
																<i className="orangeText main fa fa-user "></i>
																<Form.Control
																	defaultValue={data3.Business_No_of_directors}
																	type="text"
																	id="B_directors"
																	name="businessdetails"
																	readOnly
																	placeholder="No. of directors "
																	className={`mainDrp orangeBorder number1 required formcontrol ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	onChange={(e) => {
																		let value = e.target.value
																		const newValue = value.replace(/[^0-9]/g, '')
																		document.getElementById('B_directors').value = newValue
																	}}
																/>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter No. of directors
																</small>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message error_message_number1 ms-2">
																	Please Enter Valid number
																</small>
															</Form.Group>
															<small className={`responsiveFontLarge text-primary error_message error_message_number ms-4 pointer 
                                  ${EditValue == true
																? 'd-block'
																: 'd-none'}`} onClick={(e) => {
																setFormPopup(true)
															}}>
																view director
															</small>
														</Col>

														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																No. of Shareholders
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container pb-0"
															>
																<i className="orangeText main fa fa-user "></i>
																<Form.Control
																	defaultValue={
																		data3.Business_No_of_Shareholders
																	}
																	type="text"
																	id="B_Shareholders"
																	readOnly
																	name="businessdetails"
																	placeholder="No. of Shareholders"
																	className={`mainDrp orangeBorder number2 required formcontrol ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	onChange={(e) => {
																		let value = e.target.value
																		const newValue = value.replace(/[^0-9]/g, '')
																		document.getElementById('B_Shareholders').value = newValue
																	}}
																/>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter No. of Shareholders
																</small>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message error_message_number2 ms-2">
																	Please Enter Valid number
																</small>
															</Form.Group>
															<small className={`responsiveFontLarge text-primary error_message error_message_number ms-4 pointer
                                  ${EditValue == true
																? 'd-block'
																: 'd-none'}`
															} onClick={(e) => {
																setShareholderFormPopup(true)
															}}>
																view Shareholders
															</small>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Industry Type
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container"
															>
																<i className="orangeText main fas fa-building"></i>

																<Form.Select
																	id="Business_IndustryType"
																	onChange={handleBusiness_IndustryTypeChange}
																	// defaultValue={data3.Business_Fullname}
																	// onChange={handleDataStep3} name="Business_Industry_type"
																	className={`mainDrp orangeBorder formcontrol required ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	// className="mainDrp orangeBorder required"
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
																	<option value="Food Industry">
																		Food Industry
																	</option>
																	<option value="Infrastructure industry">
																		Infrastructure industry
																	</option>
																	<option value="Low technology industry">
																		Low technology industry
																	</option>
																	<option value="Information industry">
																		Information industry
																	</option>
																</Form.Select>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Select Industry type
																</small>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Target Market
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="orangeText main fas fa-crosshairs"></i>

																<Form.Control
																	defaultValue={data3.Business_Target_Market}
																	className={`padding_remove_left mainDrp mainDrp4 required  formcontrol ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	id="Business_Target_Market"
																	name="Business_Target_Market"
																	onChange={(e) => {
																		var inputValue = e.target.value
																		var Alfabet = ''
																		var sanitizedValue = ''

																		if (inputValue) {
																			const regex = /[^a-zA-Z\s]/g
																			Alfabet = inputValue.replace(regex, '')
																			const words = Alfabet.split(' ')

																			sanitizedValue = words
																				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
																				.join(' ')
																		}
																		document.getElementById('Business_Target_Market').value = sanitizedValue
																	}}
																>
																	{/* <option value="">Select Country</option>
                                                            {Country &&
                                                                Country.map((countryname, index) => {

                                                                return (
                                                                    <option value={countryname.id}>{countryname.emoji}&nbsp;&nbsp;{countryname.name}</option>
                                                                );
                                                                })} */}
																</Form.Control>
																{/* /////////////////////////// */}
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter Target Market
																</small>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Expected remittance volume (AUD)/sending
																currency per year.
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container"
															>
																<i className="orangeText main 	fas fa-dollar-sign "></i>
																<Form.Control
																	defaultValue={
																		data3.Business_sending_currency_per_year
																	}
																	type="text"
																	id="B_sending_currency"
																	name="businessdetails"
																	placeholder="Expected remittance volume (AUD)/sending currency per year."
																	className={`mainDrp required number3 orangeBorder formcontrol ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	onChange={(e) => {
																		let value = e.target.value
																		const newValue = value.replace(/[^0-9]/g, '')
																		document.getElementById('B_sending_currency').value = newValue
																	}}
																/>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter sending currency per year
																</small>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message error_message_number3 ms-2">
																	Please Enter Valid number
																</small>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Expected No of transaction per year.
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container"
															>
																<i className="orangeText main 	fas fa-dollar-sign "></i>
																<Form.Control
																	defaultValue={
																		data3.Business_Expected_transaction_per_year
																	}
																	type="text"
																	id="Expected_trans"
																	name="businessdetails"
																	placeholder="Expected No of transaction per year. "
																	className={`mainDrp required orangeBorder number4 formcontrol ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	onChange={(e) => {
																		let value = e.target.value
																		const newValue = value.replace(/[^0-9]/g, '')
																		document.getElementById('Expected_trans').value = newValue
																	}}
																/>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter Expected No of transaction per
																	year
																</small>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message error_message_number4 ms-2">
																	Please Enter Valid number
																</small>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Website
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container"
															>
																<i className="orangeText main fa fa-globe "></i>
																<Form.Control
																	defaultValue={data3.Business_Website}
																	type="text"
																	id="B_Website"
																	name="businessdetails"
																	placeholder="Website"
																	className={`mainDrp required orangeBorder formcontrol ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter Website
																</small>
															</Form.Group>
														</Col>
													</Row>
												</Form>
											</Row>
										</Accordion.Body>
									</Accordion.Item>

									<Accordion.Item eventKey="2">
										<Accordion.Header
											className={`formcontrol ${
												EditValue == true
													? 'disableAccordian'
													: 'enableAccordian'
											}`}
										>
											KYC Details
										</Accordion.Header>
										<Accordion.Body>
											<Row
												id="Bedit2"
												className={`my-3 editt ${
													EditValue == true ? 'd-none' : 'd-block'
												}`}
											>
												<div className="d-flex justify-content-end ">
													{/* <i className="fas fa-edit pt-1 me-1 "></i> */}
													{/* <p  className=" pointer" onClick={EditBussinessUserDetails}>Edit</p> */}
													<p
														className=" Editbtn7 text-center pointer"
														onClick={(e) => {
															EditBussinessKYCUserDetails()
														}}
													>
														<i className="fas fa-edit"></i> Edit
													</p>
												</div>
											</Row>

											<Row
												id="Bcancle2"
												className={`my-3 saveandcancle ${
													EditValue == true ? 'd-block' : 'd-none'
												}`}
											>
												<div className="d-flex justify-content-end">
													<p
														className=" pointer pe-3  canclebtn7 normal"
														onClick={(e) => {
															handleShow()
														}}
													>
														Cancel
													</p>
													<p
														className=" pointer savebtn7 "
														onClick={(e) => {
															saveBussinessKYCDetails()
														}}
													>
														Save
													</p>
												</div>
											</Row>

											<Row className="my-3 d-flex justify-content-center">
												<Form id="Sumarry7Business_KYC_Validation">
													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Nationality
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="blueText mainStep3 	fa fa-flag"></i>
																<Form.Select
																	onChange={
																		handleBusiness_Kyc_NationalityChange
																	}
																	className={`formcontrol mainStep3Select required formControlStep3 mainStep3Drps1 ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	id="Business_Nationality"
																	name="Business_Nationality"
																>
																	<option key="" value="">Select Nationality</option>
																	{Nationality &&
																		Nationality.map(
																			(NationalityName, index) => {
																				// setCountryId()
																				return (
																					<option key={index}
																									value={NationalityName.nationality}
																					>
																						{NationalityName.nationality}
																					</option>
																				)
																			}
																		)}
																</Form.Select>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Select Nationality
																</small>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																House No & Street Name
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="blueText mainStep3 	fa fa-home "></i>
																<Form.Control
																	defaultValue={data4.Business_StreetName}
																	type="text"
																	ref={autocompleteRef}
																	placeholder="House No & Street Name"
																	id="B_KYC_Housename"
																	name="kycdetails"
																	className={`formcontrol required formControlStep3 ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	} ${
																		!isAddressValid ? 'error-border' : ''
																	}`}
																/>
																{!isAddressValid && (
																	<small className="error-message text-danger">Invalid address. Please select and search
																		proper address which contains house number and street name.</small>
																)}
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter House No & Street Name
																</small>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Suburb/City
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="blueText mainStep3 fa fa-map-marker "></i>
																<Form.Control
																	defaultValue={data4.Business_City}
																	type="text"
																	id="B_KYC_city"
																	name="kycdetails"
																	placeholder="Suburb/City"
																	className={`formcontrol required formControlStep3 ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	onChange={(e) => {
																		var inputValue = e.target.value
																		var Alfabet = ''
																		var sanitizedValue = ''

																		if (inputValue) {
																			const regex = /[^a-zA-Z\s]/g
																			Alfabet = inputValue.replace(regex, '')
																			const words = Alfabet.split(' ')

																			sanitizedValue = words
																				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
																				.join(' ')
																		}
																		document.getElementById('B_KYC_city').value = sanitizedValue
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
																<i className="blueText mainStep3 fa fa-map-marker "></i>
																<Form.Select
																	onChange={handleBusiness_Kyc_StateChange}
																	id="B_KYC_Business_State"
																	className={`formcontrol required mainStep3Select ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	value={B_StateId}
																	name="kycdetails"
																>
																	<option key="" value="">State</option>
																	{States &&
																		States.map((States, index) => {
																			return (
																				<>
																					<option key={index} value={States.id}>
																						{States.name}
																					</option>
																				</>
																			)
																		})}
																</Form.Select>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Select State
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
																<i className="blueText mainStep3 fa fa fa-envelope "></i>
																<Form.Control
																	defaultValue={data4.Business_Zip}
																	type="text"
																	id="B_KYC_zipcode"
																	name="kycdetails"
																	placeholder="Postal / Zip Code"
																	className={`formcontrol number required formControlStep3 ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter Postal / Zip Code
																</small>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message error_message_number4 ms-2">
																	Please Enter Valid number
																</small>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Occupation
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="blueText mainStep3 fa fa-briefcase "></i>
																<Form.Select
																	onChange={handleBusiness_Kyc_OccupationChange}
																	id="B_KYC__Occupation"
																	className={`formcontrol required mainStep3Select ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	name="kycdetails"
																>
																	<option key="" value="">Occupation</option>
																	{Occupation &&
																		Occupation.map((occupation, index) => {
																			return (
																				<>
																					<option key={index} value={occupation.id}>
																						{occupation.name}
																					</option>
																				</>
																			)
																		})}
																</Form.Select>
																{/* <Form.Control defaultValue={data2.Business_Fullname} type="text" placeholder="First Name" className="formControlStep2"/> */}
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Select Occupation
																</small>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Is Residence of ({userData?.userkycdetails?.countryName})
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="blueText mainStep3 fa fa-map-marker "></i>
																<Form.Select
																	onChange={handleBusiness_Kyc_ResidenceChange}
																	id="B_KYC__Residence"
																	className={`formcontrol required mainStep3Select ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	name="kycdetails"
																>
																	<option value="">
																		Is Residence of ({userData?.userkycdetails?.countryName})
																	</option>
																	<option value="Yes">Yes</option>
																	<option value="No">No</option>
																</Form.Select>
																{/* <Form.Control defaultValue={data2.Business_Fullname} type="text" placeholder="First Name" className="formControlStep2"/> */}
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Select Residence of ({userData?.userkycdetails?.countryName})
																</small>
															</Form.Group>
														</Col>
													</Row>
												</Form>
											</Row>
										</Accordion.Body>
									</Accordion.Item>

									<Accordion.Item eventKey="3">
										<Accordion.Header
											className={`formcontrol ${
												EditValue == true
													? 'disableAccordian'
													: 'enableAccordian'
											}`}
										>
											ID Details
										</Accordion.Header>
										<Accordion.Body>
											<Row
												id="Bedit3"
												className={`my-3 editt ${
													EditValue == true ? 'd-none' : 'd-block'
												}`}
											>
												<div className="d-flex justify-content-end ">
													<p
														className=" Editbtn7 text-center pointer"
														onClick={(e) => {
															setExistVerifyDuplicate(true)
															EditBussinessIDDetails()
														}}
													>
														<i className="fas fa-edit"></i> Edit
													</p>
												</div>
											</Row>

											<Row
												id="Bcancle3"
												className={`my-3 saveandcancle ${
													EditValue == true ? 'd-block' : 'd-none'
												}`}
											>
												<div className="d-flex justify-content-end">
													<p
														className=" pointer pe-3  canclebtn7 normal"
														onClick={(e) => {
															handleShow()
														}}
													>
														Cancel
													</p>
													<p
														className=" pointer savebtn7 "
														onClick={(e) => {
															saveBussinessIDDetails()
														}}
													>
														Save
													</p>
												</div>
											</Row>

											<Row className="my-3 d-flex justify-content-center">
												<Form id="Sumarry7Business_IDDetails_Validation">
													<Row className="mb-3 respoChildFooter">
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
																	id="Business_Id_Type"
																	className={`formcontrol required mainStep4Select ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	onChange={handleBusiness_Kyc_IDTypeChange}
																>
																	<option key="" value="">ID Type</option>
																	{Idtypes &&
																		Idtypes.map((ID, index) => {
																			return (
																				<option key={ID.id} value={ID.id}>{ID.name}</option>
																			)
																		})}
																	{/* <option value="Australian Drivers License">Australian Drivers License </option> */}
																</Form.Select>
																{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Select ID Type
																</small>
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
																	defaultValue={data5.Business_IDNumber}
																	type="text"
																	id="B-id-number"
																	name="BussinessIdDetails"
																	placeholder="ID Number"
																	className={`formcontrol number1 required formControlStep4 ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	onChange={(e) => {
																		let value = e.target.value
																		const newValue = value.replace(/[^0-9]/g, '')
																		document.getElementById('B-id-number').value = newValue
																	}}
																/>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter ID Type
																</small>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message error_message_number1 ms-2">
																	Please Enter Valid number
																</small>
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
																	defaultValue={data5.Business_CardNumber}
																	type="text"
																	id="B-card-details"
																	name="BussinessIdDetails"
																	placeholder="Card Number"
																	className={`formcontrol formControlStep4 ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	onChange={(e) => {
																		let value = e.target.value
																		const newValue = value.replace(/[^0-9]/g, '')
																		document.getElementById('B-card-details').value = newValue
																	}}
																/>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter Card Type
																</small>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message error_message_number2 ms-2">
																	Please Enter Valid number
																</small>
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
																className="left-inner-addon input-container"
															>
																<i className="blueText mainStep4 fa fa-calendar "></i>
																<Form.Control
																	defaultValue={data5.Business_DOB}
																	type="date"
																	id="B-DOB-details"
																	max={maxDate.toISOString().split('T')[0]}
																	min={minDate.toISOString().split('T')[0]}
																	name="BussinessIdDetails"
																	placeholder="Date of Birth"
																	className={`formcontrol required formControlStep4 ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter Date of Birth
																</small>
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
																	defaultValue={data5.Business_IDExpiry}
																	type="date"
																	id="B-IdExpire-details"
																	min={formattedDate}
																	name="BussinessIdDetails"
																	placeholder="Date of ID Expiry"
																	className={`formcontrol required formControlStep4 ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter Date of ID Expiry
																</small>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
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
																	id="Business_IDIssuingAuthority"
																	onChange={
																		handleBusiness_Kyc_IDIssuingAuthorityChange
																	}
																	value={B_AuthorityName}
																	className={`formcontrol required mainStep4Select ${
																		EditValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	name="BussinessIdDetails"
																>
																	<option key="" value="">ID Issuing Authority</option>
																	{IdAuthority &&
																		IdAuthority.map(
																			(IdAuthorityName, index) => {
																				return (
																					<>
																						<option
																							key={index}
																							value={
																								IdAuthorityName.authorityName
																							}
																						>
																							{IdAuthorityName.authorityName}
																						</option>
																						{/* <option value={IdAuthorityName.issueAuthority[0].authorityName}>{IdAuthorityName.issueAuthority[0].authorityName}</option> */}
																					</>
																				)
																			}
																		)}
																</Form.Select>
																{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
																<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Select ID Issuing Authority
																</small>
															</Form.Group>
														</Col>
													</Row>
												</Form>
											</Row>
										</Accordion.Body>
									</Accordion.Item>

									<Accordion.Item eventKey="4">
										<Accordion.Header
											className={`formcontrol ${
												EditValue == true
													? 'disableAccordian'
													: 'enableAccordian'
											}`}
										>
											Documents
										</Accordion.Header>
										<Accordion.Body>

											<Row
												id="cancle"
												className={`my-3 saveandcancle ${
													EditValue == true ? 'd-block' : 'd-none'
												}`}
											>
												<div className="d-flex justify-content-end">
													<p
														className=" pointer pe-3  canclebtn7 normal"
														onClick={(e) => {
															handleShow()
														}}
													>
														Cancel
													</p>
													<p
														className=" pointer savebtn7 "
														onClick={(e) => {
															saveBussinessUserDetails()
														}}
													>
														Save
													</p>
												</div>
											</Row>

											{/* <ImageView
                        BusinessDataImageFront={BusinessDataImageFront}
                        BusinessDataImageBack={BusinessDataImageBack}
                        AdditionalImageArray={AdditionalImageArray}
                        UserIdType={UserIdType}
                      ></ImageView> */}

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
																			{'.pdf'.includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf('.'))) || '.doc'.includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf('.'))) ? (
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
																		''
																)
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
																			{'.pdf'.includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf('.'))) || '.doc'.includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf('.'))) ? (
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
																		''
																)
															})}
													</div>
												</Col>
											</Row>
											<Row>
												<section>
													<div className="bolder ms-2 text-black d-flex justify-content-center my-3">
														Uploaded Additional Documents
													</div>
													<div className="d-flex flex-wrap">
														{UploadImageArray &&
															UploadImageArray.map((images, index) => {
																const Imgeactive = images.filePath.filter((doc) => doc.active == true)
																return (
																	Imgeactive.length > 0 ?
																		<>
																			{/* <div>Hello</div> */}
																			{images.filePath.length > 0 ?
																				<>
																					<span>{images.documentType}</span>


																					<div className="images2 imageblock border rounded-2 py-2 my-2">
																						{images.filePath &&
																							images.filePath.map((image, index) => {
																								return (
																									image.active == true ?
																										<div key={image?.files} className="image position relative">
																											<div className="img-box effect-image-1">
																												{'.pdf'.includes(image?.files.toLowerCase().substring(image?.files.toLowerCase().lastIndexOf('.'))) || '.doc'.includes(image?.files.toLowerCase().substring(image?.files.toLowerCase().lastIndexOf('.'))) ? (
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
																															src={image?.files}
																															height="100"
																															width="200"
																															className="hoverView uploadedImage roundedCorner"
																															alt="upload"
																														/>
																													</>
																												)}
																												{/* <img src={image?.files} height="100" width="200" className="hoverView uploadedImage roundedCorner" alt="upload" /> */}
																												{/* <div class="overlay simple-overlay roundedCorner">
                                                <div className="mainBtnClose" onClick={() => deleteHandlerAddtional(image,index,images.id)}>
                                                  <img src={closeVector} className="img-fluid" />
                                                </div>
                                                <div className="cta">
                                                    <img src={previewVector} className="preview img-fluid"/>
                                                </div>
                                                </div> */}
																											</div>
																										</div>
																										:
																										''
																								)
																							})

																						}
																					</div>
																					<hr/>
																				</>
																				:
																				''
																			}
																		</>
																		: ''
																)
															})}
													</div>
												</section>
											</Row>

											{/* <Row className="border-bottom pb-3">
                        <div className="bolder ms-2 text-black text-center mb-3">
                          Uploaded Document ({UserIdType})
                        </div>
                        <Col>
                          <div className="bolder ms-2 text-black text-center">
                            ID Front view
                          </div>
                          <div className=" d-flex">
                            {BusinessDataImageFront &&
                              BusinessDataImageFront.map((image, index) => {
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
                          <div className="bolder ms-2 text-black text-center">
                            ID Back view
                          </div>
                          <div className="l">
                            {BusinessDataImageBack &&
                              BusinessDataImageBack.map((image, index) => {
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
                      </Row>
                      <Row>
                      <div className="bolder ms-2 text-black d-flex justify-content-center my-3">
                        Uploaded Additional Documents
                      </div>
                      <div className="">
                            {AdditionalImageArray &&
                              AdditionalImageArray.map((images, index) => {
                                return (
                                  <div key={index}>
                                    {images.ImageArray.length > 0 ? (
                                    <>
                                    <div>
                                      <b>
                                        <div>{images.typeName}</div>
                                      </b>
                                    </div>

                                      <div className="images2 imageblock border rounded-2 py-2 my-2">
                                        {images.ImageArray &&
                                          images.ImageArray.map(
                                            (image, index) => {
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
                                                    </div>
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    <hr />
                                    </>
                                    ) : ''}
                                  </div>
                                );
                              })}
                          </div>
                      </Row> */}
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</div>
						</Col>
					</Row>

					<Row id="stepthree7in3" className="mb-5">
						<Row className="d-flex m-auto justify-content-center">
							<Col className="col-lg-12 p-0">
								<div className="text-center">
									<label className="text-center text-black mb-2">Summary</label>
								</div>
								<Row className="">
									<Accordion defaultActiveKey="0">
										<Accordion.Item eventKey="0">
											<Accordion.Header
												className={`${
													AgentValue == true
														? 'disableAccordian'
														: 'enableAccordian'
												}`}
											>
												User Details
											</Accordion.Header>
											<Accordion.Body>
												<Row
													id="Aedit"
													className={`my-3 ${
														AgentValue == true ? 'd-none' : 'd-block'
													}`}
												>
													<div className="d-flex justify-content-end ">
														<p
															className=" Editbtn7 text-center pointer"
															onClick={(e) => {
																EditAgentUserDetails()
															}}
														>
															<i className="fas fa-edit"></i> Edit
														</p>
													</div>
												</Row>

												<Row
													id="Acancle"
													className={`my-3 ${
														AgentValue == true ? 'd-block' : 'd-none'
													}`}
												>
													<div className="d-flex justify-content-end">
														<p
															className=" pointer pe-3  canclebtn7 normal"
															onClick={(e) => {
																handleAgentShow()
															}}
														>
															Cancel
														</p>
														<p
															className=" pointer savebtn7 "
															onClick={(e) => {
																saveAgentUserDetails()
															}}
														>
															Save
														</p>
													</div>
												</Row>

												<Form id="Summary7AgentUserDetails">
													<Row className="d-flex justify-content-center">
														<div id="">
															<Row className="mb-3 respoChildFooter">
																<Col className="">
																	<label className="normal ms-3 fs-6 mb-2">
																		First Name
																	</label>
																	<Form.Group
																		as={Col}
																		className="left-inner-addon input-container"
																	>
																		<i className="successText main fa fa-user "></i>
																		<Form.Control
																			type="text"
																			id="Agent_First_Name"
																			placeholder="First Name"
																			defaultValue={data2.Agent_Firstname}
																			className={`formcontrol required ${
																				AgentValue == true
																					? 'enableAgentInput'
																					: 'disableInput'
																			}`}
																			onChange={(e) => {
																				var inputValue = e.target.value
																				var Alfabet = ''
																				var sanitizedValue = ''

																				if (inputValue) {
																					const regex = /[^a-zA-Z\s]/g
																					Alfabet = inputValue.replace(regex, '')
																					const words = Alfabet.split(' ')

																					sanitizedValue = words
																						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
																						.join(' ')
																				}
																				document.getElementById('Agent_First_Name').value = sanitizedValue
																			}}
																			// className="formcontrol required"
																		/>
																		<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																			Please Enter The First Name
																		</small>
																	</Form.Group>
																</Col>
																<Col className="">
																	<label className="normal ms-3 fs-6 mb-2">
																		Middle Name
																	</label>
																	<Form.Group
																		as={Col}
																		className="left-inner-addon input-container"
																	>
																		<i className="successText main fa fa-user "></i>
																		<Form.Control
																			type="text"
																			id="Agent_Middle_Name"
																			placeholder="Middle Name"
																			defaultValue={data2.Agent_Middlename}
																			// className="formcontrol required"
																			className={`formcontrol ${
																				AgentValue == true
																					? 'enableAgentInput'
																					: 'disableInput'
																			}`}
																			onChange={(e) => {
																				var inputValue = e.target.value
																				var Alfabet = ''
																				var sanitizedValue = ''

																				if (inputValue) {
																					const regex = /[^a-zA-Z\s]/g
																					Alfabet = inputValue.replace(regex, '')
																					const words = Alfabet.split(' ')

																					sanitizedValue = words
																						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
																						.join(' ')
																				}
																				document.getElementById('Agent_Middle_Name').value = sanitizedValue
																			}}
																		/>
																		<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																			Please Enter The Middle Name
																		</small>
																	</Form.Group>
																</Col>
																<Col className="">
																	<label className="normal ms-3 fs-6 mb-2">
																		Last Name
																	</label>
																	<Form.Group
																		as={Col}
																		className="left-inner-addon input-container"
																	>
																		<i className="successText main fa fa-user "></i>
																		<Form.Control
																			type="text"
																			id="Agent_Last_Name"
																			placeholder="Last Name"
																			defaultValue={data2.Agent_Lastname}
																			// className="formcontrol required"
																			className={`formcontrol required ${
																				AgentValue == true
																					? 'enableAgentInput'
																					: 'disableInput'
																			}`}
																			onChange={(e) => {
																				var inputValue = e.target.value
																				var Alfabet = ''
																				var sanitizedValue = ''

																				if (inputValue) {
																					const regex = /[^a-zA-Z\s]/g
																					Alfabet = inputValue.replace(regex, '')
																					const words = Alfabet.split(' ')

																					sanitizedValue = words
																						.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
																						.join(' ')
																				}
																				document.getElementById('Agent_Last_Name').value = sanitizedValue
																			}}
																		/>
																		<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																			Please Enter The Last Name
																		</small>
																	</Form.Group>
																</Col>
															</Row>

															<Row className="mb-3 respoChildFooter">
																<Col className="">
																	<label className="normal ms-3 fs-6 mb-2">
																		Email
																	</label>
																	<Form.Group
																		as={Col}
																		className="left-inner-addon input-container "
																	>
																		<i className="successText main fa fa-envelope "></i>
																		<Form.Control
																			type="email"
																			id="Agent_Email"
																			placeholder="Email"
																			defaultValue={data2.Agent_Email}
																			onBlur={(e) =>
																				data2.Agent_Email != e.target.value
																					? AExistEmailVerify(e)
																					: setAExistEmail(false)
																			}
																			// className="formcontrol required email"
																			className={`formcontrol email required ${
																				AgentValue == true
																					? 'enableAgentInput'
																					: 'disableInput'
																			} ${
																				AExistEmail === true
																					? 'border-danger'
																					: ''
																			}`}
																		/>
																		<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																			Please Enter Valid Email Address
																		</small>
																		<small
																			className={`text-danger  ms-2 error_font  ${
																				AExistEmail === true
																					? 'd-block'
																					: 'd-none'
																			}`}
																		>
																			Email Already Exist
																		</small>
																	</Form.Group>
																</Col>
																<Col className="">
																	<label className="normal ms-3 fs-6 mb-2">
																		Mobile
																	</label>
																	<Form.Group
																		as={Col}
																		className="left-inner-addon input-container "
																	>
																		<div className="d-flex">
																			<i className="successText main fa fa-mobile "></i>
																			<Form.Control
																				type="text"
																				// name="IndidualMobileNumber"
																				// onChange={handleDataStep2}
																				// onBlur={AgenthandlemobileNo}
																				defaultValue={CPhoneCode}
																				placeholder="Mobile"
																				readOnly
																				className={`inputphonecode formcontroll1 required form-input ${
																					ExistMobile === true
																						? 'border-danger'
																						: ''
																				}`}
																			/>
																			<Form.Control
																				type="text"
																				id="Agent_Mobile"
																				placeholder="Mobile"
																				defaultValue={data2.Agent_MobileNumber}
																				onChange={(e) => {
																					mobilevalidationchanges2(e)
																				}}
																				readOnly
																				onBlur={(e) =>
																					data2.Agent_MobileNumber !=
																					e.target.value
																						? AExistMobileVerify(e)
																						: setAExistMobile(false)
																				}
																				// className="formcontrol required phone"
																				className={`inputphonenum inputmobile formcontroll2 phone required ${
																					AgentValue == true
																						? 'enableAgentInput'
																						: 'disableInput'
																				}`}
																			/>
																		</div>
																		<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																			Please Enter Valid Mobile Number
																		</small>
																	</Form.Group>
																</Col>
															</Row>

															<Row className="mb-3 respoChildFooter">
																<Col className="">
																	<label className="normal ms-3 fs-6 mb-2">
																		Password
																	</label>
																	<Form.Group
																		as={Col}
																		className="left-inner-addon input-container"
																	>
																		<i className="successText main fa fa-lock "></i>
																		<Form.Control
																			type="password"
																			id="Agent_Password"
																			placeholder="Password"
																			readOnly
																			defaultValue={data2.Agent_password}
																			// className="formcontrol required password"
																			className={`formcontrol password required ${
																				AgentValue == true
																					? 'enableAgentInput'
																					: 'disableInput'
																			}`}
																		/>
																		<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																			Please Enter The Password
																		</small>
																		<small
																			className="responsiveFontLarge  d-none text-danger password_error_message ms-2 error_message">
																			It is Invalid Password
																		</small>
																	</Form.Group>
																</Col>
																<Col className="">
																	<label className="normal ms-3 fs-6 mb-2">
																		Confirm Password
																	</label>
																	<Form.Group
																		as={Col}
																		className="left-inner-addon input-container"
																	>
																		<i className="successText main fa fa-lock "></i>
																		<Form.Control
																			type="password"
																			id="Agent_Confirm_Password"
																			readOnly
																			placeholder="Confirm Password"
																			defaultValue={data2.Agent_C_password}
																			// className="formcontrol required cpassword"
																			className={`formcontrol cpassword required ${
																				AgentValue == true
																					? 'enableAgentInput'
																					: 'disableInput'
																			}`}
																		/>
																		<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																			Please Enter The Confirm Password
																		</small>
																		<small
																			className="responsiveFontLarge  d-none text-danger error_message_matchpass ms-2 error_message">
																			Password and confirm password are not
																			matching
																		</small>
																	</Form.Group>
																</Col>
															</Row>
														</div>
													</Row>
												</Form>
											</Accordion.Body>
										</Accordion.Item>

										<Accordion.Item eventKey="1">
											<Accordion.Header
												className={`${
													AgentValue == true
														? 'disableAccordian'
														: 'enableAccordian'
												}`}
											>
												Bussiness Details
											</Accordion.Header>
											<Accordion.Body>
												<Row
													id="Aedit1"
													className={`my-3 ${
														AgentValue == true ? 'd-none' : 'd-block'
													}`}
												>
													<div className="d-flex justify-content-end ">
														{/* <i className="fas fa-edit pt-1 me-1 "></i> */}
														{/* <p  className=" pointer" onClick={EditBussinessUserDetails}>Edit</p> */}
														<p
															className=" Editbtn7 text-center pointer"
															onClick={(e) => {
																EditAgentBussinessDetails()
															}}
														>
															<i className="fas fa-edit"></i> Edit
														</p>
													</div>
												</Row>

												<Row
													id="Acancle1"
													className={`my-3 ${
														AgentValue == true ? 'd-block' : 'd-none'
													}`}
												>
													<div className="d-flex justify-content-end">
														<p
															className=" pointer pe-3 fs canclebtn7 normal"
															onClick={(e) => {
																handleAgentShow()
															}}
														>
															Cancel
														</p>
														<p
															className=" pointer savebtn7 fs-5"
															onClick={(e) => {
																saveAgentBussinessUserDetails()
															}}
														>
															Save
														</p>
													</div>
												</Row>

												<Row className="my-3 d-flex justify-content-center">
													<Form id="Summary7AgentBusinessDetails">
														<Row className="mb-3 respoChildFooter">
															<Col className="p-0">
																<label className="normal ms-3 fs-6 mb-2">
																	Business Name
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container"
																>
																	<i className="orangeText main fa fa-user "></i>
																	<Form.Control
																		type="text"
																		id="Agent_Business_Name"
																		placeholder="Business Name"
																		defaultValue={data3.Agent_Business_Name}
																		// className="orangeForm required"
																		className={`formcontrol required orangeBorder ${
																			AgentValue == true
																				? 'enableAgentInput'
																				: 'disableInput'
																		}`}
																		onChange={(e) => {
																			var inputValue = e.target.value
																			var Alfabet = ''
																			var sanitizedValue = ''

																			if (inputValue) {
																				const regex = /[^a-zA-Z\s]/g
																				Alfabet = inputValue.replace(regex, '')
																				const words = Alfabet.split(' ')

																				sanitizedValue = words
																					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
																					.join(' ')
																			}
																			document.getElementById('Agent_Business_Name').value = sanitizedValue
																		}}
																	/>
																	<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																		Please Enter The Business Name
																	</small>
																</Form.Group>
															</Col>
															<Col className="p-0">
																<label className="normal ms-3 fs-6 mb-2">
																	ACN/ABN/Registration No
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container"
																>
																	<i className="orangeText main fa fa-user "></i>
																	<Form.Control
																		type="text"
																		id="Agent_ACN/ABN/Registration_No"
																		defaultValue={data3.Agent_Registration_No}
																		placeholder="ACN/ABN/Registration No"
																		// className=" orangeForm required"
																		className={`formcontrol required orangeBorder ${
																			AgentValue == true
																				? 'enableAgentInput'
																				: 'disableInput'
																		}`}
																		onChange={(e) => {
																			let value = e.target.value
																			const newValue = value.replace(/[^0-9]/g, '')
																			document.getElementById('Agent_ACN/ABN/Registration_No').value = newValue
																		}}
																	/>
																	<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																		Please Enter The ACN/ABN/Registration No
																	</small>
																</Form.Group>
															</Col>
														</Row>

														<Row className="mb-3 respoChildFooter">
															<Col>
																<label className="normal ms-3 fs-6 mb-2">
																	Country of Business Registration
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container "
																>
																	<Form.Select
																		onChange={
																			Agent_Country_of_Business_Registration
																		}
																		className={`mainDrp orangeForm required ${
																			AgentValue == true
																				? 'enableAgentInput'
																				: 'disableInput'
																		} `}
																		id="Agent_Country_of_Business_Registration"
																	>
																		<option key="" value="">
																			Country of Business Registration
																		</option>
																		{Country &&
																			Country.map((countryname, index) => {
																				return (
																					<option key={index} value={countryname.id}>
																						{countryname.emoji}&nbsp;&nbsp;
																						{countryname.name}
																					</option>
																				)
																			})}
																	</Form.Select>
																	<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																		Please Select The Country of Business
																		Registration
																	</small>
																</Form.Group>
															</Col>
														</Row>

														<Row className="mb-3 respoChildFooter">
															<Col>
																<label className="normal ms-3 fs-6 mb-2">
																	Address of Business
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container"
																>
																	<i className="orangeText main fa fa-map-marker "></i>
																	<Form.Control
																		type="text"
																		id="Agent_Bussinessaddress"
																		name="AgentBussinessDetails"
																		defaultValue={
																			data3.Agent_Address_of_Business
																		}
																		placeholder="Address of Business"
																		className={`formcontrol required orangeForm ${
																			AgentValue == true
																				? 'enableAgentInput'
																				: 'disableInput'
																		}`}
																	/>
																	<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																		Please Enter The Bussiness Address
																	</small>
																</Form.Group>
															</Col>
														</Row>

														<Row className="mb-3 respoChildFooter">
															<Col>
																<label className="normal ms-3 fs-6 mb-2">
																	Target Market
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container "
																>
																	<i className="orangeText main fas fa-crosshairs"></i>

																	<Form.Control
																		defaultValue={data3.Agent_Target_Market}
																		className={`mainDrp orangeForm required ${
																			AgentValue == true
																				? 'enableAgentInput'
																				: 'disableInput'
																		} `}
																		id="Agent_Target_Market"
																		onChange={(e) => {
																			var inputValue = e.target.value
																			var Alfabet = ''
																			var sanitizedValue = ''

																			if (inputValue) {
																				const regex = /[^a-zA-Z\s]/g
																				Alfabet = inputValue.replace(regex, '')
																				const words = Alfabet.split(' ')

																				sanitizedValue = words
																					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
																					.join(' ')
																			}
																			document.getElementById('Agent_Target_Market').value = sanitizedValue
																		}}
																	>
																		{/* <option value="">Target Market</option>
                                                                {Country &&
                                                                    Country.map((countryname, index) => {

                                                                    return (
                                                                        <option value={countryname.id}>{countryname.emoji}&nbsp;&nbsp;{countryname.name}</option>
                                                                    );
                                                                    })} */}
																	</Form.Control>
																	<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																		Please Select The Target Market
																	</small>
																</Form.Group>
															</Col>
														</Row>

														<Row className="mb-3 respoChildFooter">
															<Col>
																<label className="normal ms-3 fs-6 mb-2">
																	No of years in current business
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container"
																>
																	<i className="orangeText main fas fa-medal "></i>
																	<Form.Control
																		type="text"
																		defaultValue={
																			data3.Agent_current_business_year
																		}
																		id="Agent_No_of_years_in_current_business"
																		name="AgentBussinessDetails"
																		placeholder="No of years in current business"
																		className={`formcontrol required number orangeForm ${
																			AgentValue == true
																				? 'enableAgentInput'
																				: 'disableInput'
																		}`}
																		onChange={(e) => {
																			let value = e.target.value
																			const newValue = value.replace(/[^0-9]/g, '')
																			document.getElementById('Agent_No_of_years_in_current_business').value = newValue
																		}}
																	/>
																	<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																		Please Enter The No of years in current
																		business
																	</small>
																	<small
																		className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
																		Please Enter Valid number
																	</small>
																</Form.Group>
															</Col>
														</Row>

														<Row className="mb-3 respoChildFooter">
															<Col>
																<label className="normal ms-3 fs-6 mb-2">
																	Expected remittance volume (AUD)/sending
																	currency per year
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container"
																>
																	<i className="orangeText main 	fas fa-dollar-sign "></i>
																	<Form.Control
																		type="text"
																		defaultValue={
																			data3.Agent_sending_currency_per_year
																		}
																		id="Agent_sending_currency"
																		name="AgentBussinessDetails"
																		placeholder="Expected remittance volume (AUD)/sending currency per year."
																		className={`formcontrol required number1 orangeForm ${
																			AgentValue == true
																				? 'enableAgentInput'
																				: 'disableInput'
																		}`}
																		onChange={(e) => {
																			let value = e.target.value
																			const newValue = value.replace(/[^0-9]/g, '')
																			document.getElementById('Agent_sending_currency').value = newValue
																		}}
																	/>
																	<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																		Please Enter The Expected remittance volume
																		(AUD)/sending currency per year
																	</small>
																	<small
																		className="responsiveFontLarge  d-none text-danger error_message error_message_number1 ms-2">
																		Please Enter Valid number
																	</small>
																</Form.Group>
															</Col>
														</Row>

														<Row className="mb-3 respoChildFooter">
															<Col>
																<label className="normal ms-3 fs-6 mb-2">
																	Expected No of transaction per year
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container"
																>
																	<i className="orangeText main 	fas fa-dollar-sign "></i>
																	<Form.Control
																		type="text"
																		defaultValue={
																			data3.Agent_Expected_transaction_per_year
																		}
																		id="Agent_Expected_trans"
																		name="AgentBussinessDetails"
																		placeholder="Expected No of transaction per year. "
																		className={`formcontrol number2 required orangeForm ${
																			AgentValue == true
																				? 'enableAgentInput'
																				: 'disableInput'
																		}`}
																		onChange={(e) => {
																			let value = e.target.value
																			const newValue = value.replace(/[^0-9]/g, '')
																			document.getElementById('Agent_Expected_trans').value = newValue
																		}}
																	/>
																	<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																		Please Enter The Expected No of transaction
																		per year
																	</small>
																	<small
																		className="responsiveFontLarge  d-none text-danger error_message error_message_number2 ms-2">
																		Please Enter Valid number
																	</small>
																</Form.Group>
															</Col>
														</Row>

														<Row className="mb-3 respoChildFooter">
															<Col>
																<label className="normal ms-3 fs-6 mb-2">
																	Website
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container"
																>
																	<i className="orangeText main fa fa-globe "></i>
																	<Form.Control
																		type="text"
																		defaultValue={data3.Agent_Website}
																		id="AgentWebsite"
																		name="AgentBussinessDetails"
																		placeholder="Website"
																		className={`formcontrol required orangeForm ${
																			AgentValue == true
																				? 'enableAgentInput'
																				: 'disableInput'
																		}`}
																	/>
																	<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																		Please Enter The Website
																	</small>
																</Form.Group>
															</Col>
														</Row>
													</Form>
												</Row>
											</Accordion.Body>
										</Accordion.Item>

										<Accordion.Item eventKey="2">
											<Accordion.Header
												className={`${
													AgentValue == true
														? 'disableAccordian'
														: 'enableAccordian'
												}`}
											>
												KYC Details
											</Accordion.Header>
											<Accordion.Body>
												<Row
													id="Aedit2"
													className={`my-3 ${
														AgentValue == true ? 'd-none' : 'd-block'
													}`}
												>
													<div className="d-flex justify-content-end ">
														{/* <i className="fas fa-edit pt-1 me-1 "></i> */}
														{/* <p  className=" pointer" onClick={EditBussinessUserDetails}>Edit</p> */}
														<p
															className=" Editbtn7 text-center pointer"
															onClick={() => {
																EditAgentKYCUserDetails()
															}}
														>
															<i className="fas fa-edit"></i> Edit
														</p>
													</div>
												</Row>

												<Row
													id="Acancle2"
													className={`my-3 ${
														AgentValue == true ? 'd-block' : 'd-none'
													}`}
												>
													<div className="d-flex justify-content-end">
														<p
															className=" pointer pe-3 fs canclebtn7 normal"
															onClick={(e) => {
																handleAgentShow()
															}}
														>
															Cancel
														</p>
														<p
															className=" pointer savebtn7 fs-5"
															onClick={(e) => {
																saveAgentKYCDetails()
															}}
														>
															Save
														</p>
													</div>
												</Row>

												<Row className="my-3 d-flex justify-content-center">
													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Nationality
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="blueText mainStep3 	fa fa-flag svgNationality"></i>
																<Form.Select
																	onChange={handleAgent_Kyc_NationalityChange}
																	value={data4.Agent_Nationality}
																	className={`formcontrol mainStep3Select ${
																		AgentValue == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	id="Agent_Nationality"
																	name="Agent_Nationality"
																>
																	<option key="" value="">Select Nationality</option>
																	{Nationality &&
																		Nationality.map(
																			(NationalityName, index) => {
																				// setCountryId()
																				return (
																					<option key={NationalityName.id}
																									value={NationalityName.nationality}
																					>
																						{NationalityName.nationality}
																					</option>
																				)
																			}
																		)}
																</Form.Select>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																House No & Street Name
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="blueText mainStep3 	fa fa-home "></i>
																<Form.Control
																	defaultValue={data4.Agent_StreetName}
																	type="text"
																	ref={autocompleteRef2}
																	id="AgentHousename"
																	name="AgentKYCDetails"
																	placeholder="House No & Street Name"
																	className={`formControlStep3 ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
																	} ${
																		!isAddressValid2 ? 'error-border' : ''
																	}`}
																/>
																{!isAddressValid2 && (
																	<small className="error-message text-danger">Invalid address. Please select and search
																		proper address which contains house number and street name.</small>
																)}
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Suburb/City
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="blueText mainStep3 fa fa-map-marker "></i>
																<Form.Control
																	defaultValue={data4.Agent_City}
																	type="text"
																	id="Agentkyccity"
																	name="AgentKYCDetails"
																	placeholder="Suburb/City"
																	className={`formControlStep3 ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
																	}`}
																/>
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
																<i className="blueText mainStep3 fa fa-map-marker "></i>
																<Form.Select
																	onChange={handleAgent_Kyc_StateChange}
																	className={`mainStep3Select ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
																	}`}
																	id="Agent_kycstate"
																	value={A_StateId}
																	name=""
																>
																	<option key="" value="">State</option>
																	{StatesAgent &&
																		StatesAgent.map((States, index) => {
																			return (
																				<>
																					<option key={States.id} value={States.id}>
																						{States.name}
																					</option>
																				</>
																			)
																		})}
																</Form.Select>
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
																<i className="blueText mainStep3 fa fa fa-envelope "></i>
																<Form.Control
																	defaultValue={data4.Agent_Zip}
																	type="text"
																	id="Agentkyczipcode"
																	name="AgentKYCDetails"
																	placeholder="Postal / Zip Code"
																	className={`formControlStep3 ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
																	}`}
																/>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Occupation
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="blueText mainStep3 fa fa-briefcase "></i>
																<Form.Select
																	onChange={handleAgent_Kyc_OccupationChange}
																	className={`mainStep3Select ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
																	}`}
																	id="Agent_kycOccupation"
																	name="AgentKYCDetails"
																>
																	<option key="" value="">Occupation</option>
																	{Occupation &&
																		Occupation.map((occupation, index) => {
																			return (
																				<>
																					<option key={occupation.id} value={occupation.id}>
																						{occupation.name}
																					</option>
																				</>
																			)
																		})}
																</Form.Select>
																{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Is Residence of ({userData?.userkycdetails?.countryName})
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="blueText mainStep3 fa fa-map-marker "></i>
																<Form.Select
																	onChange={handleAgent_Kyc_ResidenceChange}
																	className={`mainStep3Select ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
																	}`}
																	id="Agent_kycResidence"
																>
																	<option value="">
																		Is Residence of ({userData?.userkycdetails?.countryName})
																	</option>
																	<option value="Yes">Yes</option>
																	<option value="No">No</option>
																</Form.Select>
																{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
															</Form.Group>
														</Col>
													</Row>
												</Row>
											</Accordion.Body>
										</Accordion.Item>

										<Accordion.Item eventKey="3">
											<Accordion.Header
												className={`${
													AgentValue == true
														? 'disableAccordian'
														: 'enableAccordian'
												}`}
											>
												ID Details
											</Accordion.Header>
											<Accordion.Body>
												<Row
													id="Aedit3"
													className={`my-3 ${
														AgentValue == true ? 'd-none' : 'd-block'
													}`}
												>
													<div className="d-flex justify-content-end ">
														{/* <i className="fas fa-edit pt-1 me-1 "></i> */}
														{/* <p  className=" pointer" onClick={EditBussinessUserDetails}>Edit</p> */}
														<p
															className=" Editbtn7 text-center pointer"
															onClick={(e) => {
																setExistVerifyDuplicate(true)
																EditAgentIDDetails()
															}}
														>
															<i className="fas fa-edit"></i> Edit
														</p>
													</div>
												</Row>

												<Row
													id="Acancle3"
													className={`my-3 ${
														AgentValue == true ? 'd-block' : 'd-none'
													}`}
												>
													<div className="d-flex justify-content-end">
														<p
															className=" pointer pe-3 fs canclebtn7 normal"
															onClick={(e) => {
																handleAgentShow()
															}}
														>
															Cancel
														</p>
														<p
															className=" pointer savebtn7 fs-5"
															onClick={(e) => {
																saveAgentIDDetails()
															}}
														>
															Save
														</p>
													</div>
												</Row>
												<Row className="my-3 d-flex justify-content-center">
													<Row className="mb-3 respoChildFooter">
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
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
																	}`}
																	id="Agent_IdType"
																	onChange={handleAgent_Kyc_IDTypeChange}
																>
																	<option key="" value="">ID Type</option>
																	{Idtypes &&
																		Idtypes.map((ID, index) => {
																			return (
																				<option key={index} value={ID.id}>{ID.name}</option>
																			)
																		})}
																	{/* <option value="Australian Drivers License">Australian Drivers License</option> */}
																</Form.Select>
																{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
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
																	defaultValue={data5.Agent_IDNumber}
																	type="text"
																	id="Agent-id-number"
																	placeholder="ID Number"
																	className={`formControlStep4 ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
																	}`}
																	onChange={(e) => {
																		let value = e.target.value
																		const newValue = value.replace(/[^0-9]/g, '')
																		document.getElementById('Agent-id-number').value = newValue
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
																	defaultValue={data5.Agent_CardNumber}
																	type="text"
																	id="Agent-card-details"
																	placeholder="Card Number"
																	className={`formControlStep4 ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
																	}`}
																	onChange={(e) => {
																		let value = e.target.value
																		const newValue = value.replace(/[^0-9]/g, '')
																		document.getElementById('Agent-card-details').value = newValue
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
																	defaultValue={data5.Agent_DOB}
																	type="date"
																	id="Agent-DOB-details"
																	max={maxDate.toISOString().split('T')[0]}
																	min={minDate.toISOString().split('T')[0]}
																	placeholder="Date of Birth"
																	className={`formControlStep4 ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
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
																	defaultValue={data5.Agent_IDExpiry}
																	type="date"
																	id="Agent-IdExpire-details"
																	min={formattedDate}
																	placeholder="Date of ID Expiry"
																	className={`formControlStep4 ${
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
																	}`}
																/>
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3 respoChildFooter">
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
																		AgentValue == true
																			? 'enableAgentInput'
																			: 'disableInput'
																	}`}
																	id="Agent_IDIssuingAuthority"
																	value={A_AuthorityName}
																	onChange={
																		handleAgent_Kyc_IDIssuingAuthorityChange
																	}
																>
																	<option key="" value="">ID Issuing Authority</option>
																	{AIdAuthority &&
																		AIdAuthority.map(
																			(IdAuthorityName, index) => {
																				return (
																					<>
																						<option key={index}
																										value={
																											IdAuthorityName.authorityName
																										}
																						>
																							{IdAuthorityName.authorityName}
																						</option>
																						{/* <option value={IdAuthorityName.issueAuthority[0].authorityName}>{IdAuthorityName.issueAuthority[0].authorityName}</option> */}
																					</>
																				)
																			}
																		)}
																	{/* {AIdAuthoritySubtype &&
                                                                    AIdAuthoritySubtype.map((IdAuthoritySubName, index) => {
                                                                    return (<>
                                                                        <option value={IdAuthoritySubName.authorityName}>{IdAuthoritySubName.authorityName}</option>
                                                                        </>
                                                                    );
                                                                    })} */}
																</Form.Select>
																{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
															</Form.Group>
														</Col>
													</Row>
												</Row>
											</Accordion.Body>
										</Accordion.Item>

										<Accordion.Item eventKey="4">
											<Accordion.Header
												className={`${
													AgentValue == true
														? 'disableAccordian'
														: 'enableAccordian'
												}`}
											>
												Documents
											</Accordion.Header>
											<Accordion.Body>
												{/* <Row id="Aedit4" className={`my-3 ${AgentValue == true ? 'd-none' : 'd-block'}`}>
                                                    <div className="d-flex justify-content-end " >
                                                        <p className=" Editbtn7 text-center pointer" onClick={(e)=>{EditBussinessUserDetails()}}><i className="fas fa-edit"></i> Edit</p>
                                                    </div>
                                                </Row> */}

												<Row
													id="Acancle4"
													className={`my-3 ${
														AgentValue == true ? 'd-block' : 'd-none'
													}`}
												>
													<div className="d-flex justify-content-end">
														<p
															className=" pointer pe-3 fs canclebtn7 normal"
															onClick={(e) => {
																handleAgentShow()
															}}
														>
															Cancel
														</p>
														<p
															className=" pointer savebtn7 fs-5"
															onClick={(e) => {
																saveAgentIDDetails()
															}}
														>
															Save
														</p>
													</div>
												</Row>

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
																		image.isFront == true ?
																			<div
																				key={index}
																				className="image position relative"
																			>
																				{'.pdf'.includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf('.'))) || '.doc'.includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf('.'))) ? (
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

																				{/* <div className="img-box effect-image-1 ">
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
                                      </div> */}
																			</div>
																			:
																			''
																	)
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
																		image.isBack == true ?
																			<div
																				key={index}
																				className="image position relative"
																			>
																				{'.pdf'.includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf('.'))) || '.doc'.includes(image.filePath.toLowerCase().substring(image.filePath.toLowerCase().lastIndexOf('.'))) ? (
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

																				{/* <div className="img-box effect-image-1 ">
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
                                      </div> */}
																			</div>
																			:
																			''
																	)
																})}
														</div>
														{/* <div className="l"> */}
														{/* {AgentDataImageBack &&
                                AgentDataImageBack.map((image, index) => {
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
                                })} */}
														{/* </div> */}
													</Col>
												</Row>
												<Row>
													<section>
														<div className="bolder ms-2 text-black d-flex justify-content-center my-3">
															Uploaded Additional Documents
														</div>
														<div className="d-flex flex-wrap">
															{UploadImageArray &&
																UploadImageArray.map((images, index) => {
																	const Imgeactive = images.filePath.filter((doc) => doc.active == true)
																	return (
																		Imgeactive.length > 0 ?
																			<>
																				{/* <div>Hello</div> */}
																				{images.filePath.length > 0 ?
																					<>
																						<span>{images.documentType}</span>


																						<div className="images2 imageblock border rounded-2 py-2 my-2">
																							{images.filePath &&
																								images.filePath.map((image, index) => {
																									return (
																										image.active == true ?
																											<div key={image?.files} className="image position relative">
																												<div className="img-box effect-image-1">
																													{'.pdf'.includes(image?.files.toLowerCase().substring(image?.files.toLowerCase().lastIndexOf('.'))) || '.doc'.includes(image?.files.toLowerCase().substring(image?.files.toLowerCase().lastIndexOf('.'))) ? (
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
																																src={image?.files}
																																height="100"
																																width="200"
																																className="hoverView uploadedImage roundedCorner"
																																alt="upload"
																															/>
																														</>
																													)}
																													{/* <img src={image?.files} height="100" width="200" className="hoverView uploadedImage roundedCorner" alt="upload" /> */}
																													{/* <div class="overlay simple-overlay roundedCorner">
                                                <div className="mainBtnClose" onClick={() => deleteHandlerAddtional(image,index,images.id)}>
                                                  <img src={closeVector} className="img-fluid" />
                                                </div>
                                                <div className="cta">
                                                    <img src={previewVector} className="preview img-fluid"/>
                                                </div>
                                                </div> */}
																												</div>
																											</div>
																											:
																											''
																									)
																								})

																							}
																						</div>
																						<hr/>
																					</>
																					:
																					''
																				}
																			</>
																			: ''
																	)
																})}
														</div>
													</section>
													{/* <div className="bolder ms-2 text-black d-flex justify-content-center my-3">
                            Uploaded Additional Documents
                        </div>
                        <div className="">
                          {AdditionalImageArray &&
                          AdditionalImageArray.map((images, index) => {
                              return (
                              <div key={index}>
                                  {images.ImageArray.length > 0 ? (
                                  <>
                                  <div>
                                    <b>
                                        <div>{images.typeName}</div>
                                    </b>
                                  </div>

                                  <div className="images2 imageblock border rounded-2 py-2 my-2">
                                      {images.ImageArray &&
                                      images.ImageArray.map(
                                          (image, index) => {
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
                                                  </div>
                                              </div>
                                              </div>
                                          );
                                          }
                                      )}
                                  </div>
                                  <hr />
                                  </>
                                  ) : ''}
                              </div>
                              );
                          })}
                      </div> */}
												</Row>
											</Accordion.Body>
										</Accordion.Item>
									</Accordion>
								</Row>
							</Col>
							{/* <Row className="d-flex justify-content-center mt-5">
                                <input type="button" className="col-lg-3 uppercase step7summary" value={"Edit All"} onClick={handleShow}></input>
                            </Row> */}
						</Row>
					</Row>
				</Container>

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
								You are about to leave this page. Do you want to save changes
								before leaving this page ?
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
											setExistVerifyDuplicate(false)
											handleBusinessCancledata(e)
										}}
									>
										DISCARD
									</Button>
									{/* <p
                    className="maroonText mb-0 pointer"
                    onClick={(e) => {
                      handleBusinessCancledata();
                    }}
                  >
                    DISCARD
                  </p> */}
								</Col>
								<Col className="col-lg-4  text-center">
									<Button
										className="maroonButton border-0 roundedCorner upparcase bolder"
										variant="primary"
										onClick={(e) => {
											handleBUpdateDataIndividual(e)
										}}
									>
										SAVE
									</Button>
								</Col>
							</Row>
						</Container>
					</div>
				</Modal>

				<Modal show={Ashow} onHide={handleAgentClose} className="savemodal">
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
									<Button
										className=" border-0 bg-white pointer roundedCorner upparcase bolder maroonText"
										variant="primary"
										onClick={(e) => {
											setExistVerifyDuplicate(false)
											handleAgentCancledata(e)
										}}
									>
										DISCARD
									</Button>
									{/* <p
                    className="maroonText mb-0 pointer"
                    onClick={(e) => {
                      handleAgentCancledata();
                    }}
                  >
                    DISCARD
                  </p> */}
								</Col>
								<Col className="col-lg-4  text-center">
									<Button
										className="maroonButton border-0 roundedCorner upparcase bolder"
										variant="primary"
										onClick={(e) => {
											handleAUpdateDataIndividual(e)
										}}
									>
										SAVE
									</Button>
								</Col>
							</Row>
						</Container>
					</div>
				</Modal>

				{/* ////////////////Director or Shareholder///////////////// */}
				<Modal
					show={FormPopup}
					onHide={(e) => {
						setFormPopup(false)
						StepBlank('')
					}}
					size="lg"
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
												onChange={(e) => {
													handleDynamiForm(e)
												}}
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
											<small
												className="responsiveFontLarge  d-none text-danger error_message error_message_number1 ms-2">
												Please Enter Valid number
											</small>
										</Form.Group>
									</div>
									<div className="">
										{/* <label className="" onClick={AddFieldDirector}>Add Director</label> */}
										{/* {renderDynamicForms()} */}
										{formDataa && formDataa.map((item, i) => (
											<div key={i} className="my-3">

												<Row className="px-3 respoChildFooter">
													<div className="d-flex justify-content-between pb-3 pt-1">
														<h5 className="fs-6 ps-3">Director Details {i + 1} </h5>
														<h5
															className={`fs-6 ps-3 text-danger pointer ${formDataa.length < 2 ? 'd-none' : 'd-block'}`}
															onClick={(e) => {
																UpdateremoveFieldsReciptionDetails(i)
															}}>remove</h5>
													</div>
													<Form.Group
														as={Col}
														className="left-inner-addon input-container"
													>
														<i className="orangeText main fa fa-user "></i>
														<Form.Control
															name="name"
															type="text"
															placeholder="Director Full name"
															value={item?.name || ''}
															className="formcontrol orangeForm form-input required"
															onChange={(e) => handleFormInputChange(i, 'name', e.target.value)}
														/>
														<label htmlFor="name" className="form-label1">
															Director Full Name
														</label>
														<small
															className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
															Please Enter Director Full name
														</small>
													</Form.Group>
												</Row>

												<Row className="px-3 respoChildFooter">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container"
													>
														<i className="orangeText main fa fa-envelope "></i>
														<Form.Control
															name="email"
															type="text"
															placeholder="Director Email"
															value={item?.email || ''}
															className="formcontrol orangeForm form-input required"
															onChange={(e) => handleFormInputChange(i, 'email', e.target.value)}
														/>
														<label htmlFor="name" className="form-label1">
															Email
														</label>
														<small
															className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
															Please Enter Director Email
														</small>
													</Form.Group>
												</Row>
												<Row className="px-3 respoChildFooter">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container"
													>
														<i className="orangeText main fa fa-mobile"></i>
														<Form.Control
															name="phone"
															type="number"
															placeholder="Director Mobile"
															value={item?.phone || ''}
															className="formcontrol orangeForm form-input required"
															onChange={(e) => handleFormInputChange(i, 'phone', +e.target.value)}
														/>
														<label htmlFor="name" className="form-label1">
															Mobile
														</label>
														<small
															className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
															Please Enter Director Mobile
														</small>
													</Form.Group>
												</Row>
												<Row className="px-3 respoChildFooter">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container"
													>
														<i className="orangeText main fa fa-mobile"></i>
														<Form.Control
															name="percentageOfShareHolding"
															type="number"
															min={1}
															max={10}
															placeholder="Share Holding"
															value={item?.percentageOfShareHolding || ''}
															className="formcontrol orangeForm form-input required"
															onChange={(e) => handleFormInputChange(i, 'percentageOfShareHolding', +e.target.value)}
														/>
														<label htmlFor="name" className="form-label1">
															Share Holding
														</label>
														<small
															className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
															Please Enter Share Holding
														</small>
													</Form.Group>
												</Row>
											</div>
										))};
										<Row>
											<Col className="col-lg-12 d-flex m-auto justify-content-center">
												<Button
													className="d-block nextBtnDirector w-auto px-3"
													variant="primary"
													onClick={(e) => {
														AddFieldDirector(e)
													}}
												>
													Add Director
												</Button>
											</Col>
										</Row>
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
									onClick={(e) => {
										if (validator.error_input_validation('Director_List')) {
											handleSubmitDirector(e)
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
					onHide={(e) => {
						setShareholderFormPopup(false)
						StepBlank('')
					}
					}
					size="lg"
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
									<div className="mb-3 mt-3 respoChildFooter">
										<Form.Group
											as={Col}
											className="left-inner-addon"
											//  input-container"
										>
											<i className="orangeText main fa fa-user "></i>
											<Form.Control
												onChange={(e) => {
													handleDynamiForm2(e)
												}}
												value={data3.Business_No_of_directors}
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
											<small
												className="responsiveFontLarge  d-none text-danger error_message error_message_number2 ms-2">
												Please Enter Valid number
											</small>
										</Form.Group>
										<Row className="px-3">
											<small className="notevalue bolder text-primary">Note: The number of shareholders must not include
												any individuals who also serve as directors of the company.</small>
										</Row>
									</div>
									<div className="">
										{/* <label className="" onClick={AddFieldDirector}>Add Director</label> */}
										{/* {renderDynamicForms()} */}
										{formData2.map((item, i) => (
											<div key={i} className="my-3">

												<Row className="px-3 respoChildFooter">
													<div className="d-flex justify-content-between pb-3 pt-1">
														<h5 className="fs-6 ps-3">Shareholder Details {i + 1} </h5>
														<h5 className={`fs-6 ps-3 text-danger pointer `} onClick={(e) => {
															UpdateremoveFieldsShareHolder(i)
														}}>remove</h5>
													</div>
													<Form.Group
														as={Col}
														className="left-inner-addon input-container"
													>
														<i className="orangeText main fa fa-user "></i>
														<Form.Control
															name="name"
															type="text"
															placeholder="Director Full name"
															value={item?.name || ''}
															className="formcontrol orangeForm form-input required"
															onChange={(e) => handleFormInputChange2(i, 'name', e.target.value)}
														/>
														<label htmlFor="name" className="form-label1">
															Shareholders Full Name
														</label>
														<small
															className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
															Please Enter Shareholder Full name
														</small>
													</Form.Group>
												</Row>

												<Row className="px-3 respoChildFooter">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container"
													>
														<i className="orangeText main fa fa-envelope "></i>
														<Form.Control
															name="email"
															type="text"
															placeholder="Director Email"
															value={item?.email || ''}
															className="formcontrol orangeForm form-input required"
															onChange={(e) => handleFormInputChange2(i, 'email', e.target.value)}
														/>
														<label htmlFor="name" className="form-label1">
															Email
														</label>
														<small
															className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
															Please Enter Shareholder Email
														</small>
													</Form.Group>
												</Row>
												<Row className="px-3 respoChildFooter">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container"
													>
														<i className="orangeText main fa fa-mobile"></i>
														<Form.Control
															name="phone"
															type="number"
															placeholder="Director Mobile"
															value={item?.phone || ''}
															className="formcontrol orangeForm form-input required"
															onChange={(e) => handleFormInputChange2(i, 'phone', +e.target.value)}
														/>
														<label htmlFor="name" className="form-label1">
															Mobile
														</label>
														<small
															className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
															Please Enter Shareholder Mobile
														</small>
													</Form.Group>
												</Row>
												<Row className="px-3 respoChildFooter">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container"
													>
														<i className="orangeText main fa fa-mobile"></i>
														<Form.Control
															name="percentageOfShareHolding"
															type="number"
															min={1}
															max={10}
															placeholder="Share Holding"
															value={item?.percentageOfShareHolding || ''}
															className="formcontrol orangeForm form-input required"
															onChange={(e) => handleFormInputChange2(i, 'percentageOfShareHolding', +e.target.value)}
														/>
														<label htmlFor="name" className="form-label1">
															Share Holding
														</label>
														<small
															className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
															Please Enter Share Holding
														</small>
													</Form.Group>
												</Row>
											</div>
										))}
										<Row>
											<Col className="col-lg-12 d-flex m-auto justify-content-center">
												<Button
													className="d-block nextBtnDirector w-auto px-3"
													variant="primary"
													onClick={(e) => {
														AddFieldShareHolder(e)
													}}
												>
													Add Director
												</Button>
											</Col>
										</Row>
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
									onClick={(e) => {
										if (validator.error_input_validation('shareholder_List')) {

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
				{/* //////////////////////////////////////////////////////// */}
			</section>
		</>
	)
}
