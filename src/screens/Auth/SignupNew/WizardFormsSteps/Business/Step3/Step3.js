import React, { useContext, useEffect, useState } from 'react'
import './Step3.scss'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import '../../../../../Helpers/CountryDropdown/flags.css'
import userContext from '../../../Signupdata/Usecontext'
import { storeBusinessDetail } from '../../../api'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { CommonConstants } from '../../../../../../Constants/common.constants'
import Select from 'react-select'

const validator = require('../../../../../../assets/js/validator')

export default function Step3 ({
																 Name,
																 handleId,
																 handleIndividualNextStep,
																 activeStepKey
															 }) {
	const {
		setLoaderValue,
		registerId,
		setBusinessDetailData,
		setBusinessDetailId,
		businessDetailId,
		countryOptionList,
		setBusinessShareholderDetail,
		setBusinessDirectorDetail
	} = useContext(userContext)
	const [numberOfForms, setNumberOfForms] = useState(1)
	const [numberOfForms2, setNumberOfForms2] = useState(0)
	const [openDirectorPopup, setOpenDirectorPopup] = useState(false)
	const [shareholderFormPopup, setShareholderFormPopup] = useState(false)
	const [isMobileValid, setIsMobileValid] = useState(false)
	const [businessDetail, setBusinessDetail] = useState({

		companyType: '',
		industryType: '',
		noOfShareholder: 0,
		noDirector: 1,
		noOfEmployee: '',
		targetMarket: '',
		website: '',
		sendingCurrencyPerYear: '',
		expectedRemittance: '',
		noOfTransaction: ''
	})

	const [serverError, setServerError] = useState({
		message: '',
		openErrorModal: false
	})

	const handleErrorPopup = () => {
		setServerError({
			...serverError,
			openErrorModal: false
		})
	}




	const [shareholderDetail, setShareholderDetail] = useState([])
	const [directorDetail, setDirectorDetail] = useState([])


	const handleFormId = () => {
		handleId('Individual_KYC_step3')
	}

	useEffect(() => {
		if (registerId) {
			console.log('registerId', registerId)

		}
		handleFormId()

	}, [registerId])


	useEffect(() => {
		if (activeStepKey == 'thirdStep') {
			if (numberOfForms > 0) {
				if (validator.error_input_validation('Bussiness_Details_step3')) {
					setOpenDirectorPopup(true)
				}
			} else if (numberOfForms2 > 0) {
				if (validator.error_input_validation('Bussiness_Details_step3')) {
					setShareholderFormPopup(true)
				}
			}
		}
	}, [businessDetailId])

	const handleBusinessDetail = (e) => {
		const {name, value} = e.target

		setBusinessDetail((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	const CustomOption = ({innerProps, label, data}) => (
		<div {...innerProps} style={{paddingLeft: '10px', paddingBottom: '8px', paddingTop: '8px'}}>
			<img src={data.image} alt={label} style={{width: '20px', marginRight: '5px'}}/>
			{label}
		</div>
	)

	const submitBusinessDetail = async () => {

		validator.error_input_validation('Business_Details_step3')
		if (!validator.error_input_validation('Business_Details_step3')) {
			return
		}

		try {
			setLoaderValue(true)
			const businessData = prepareBusinessData()
			const response = await storeBusinessDetail(businessData)

			if (response.data.status === true) {

				if (numberOfForms > 0 && numberOfForms2 > 0) {
					setShareholderFormPopup(false)
				} else if (numberOfForms > 0 && numberOfForms2 < 1) {
					setOpenDirectorPopup(false)
				} else if (numberOfForms <= 0 && numberOfForms2 > 0) {
					setShareholderFormPopup(false)
				}

				setBusinessDetailData(businessDetail)

				setBusinessDetailId(response.data.data)
			}

		} catch (error) {
			setServerError({
				message: error.response.data,
				openErrorModal: true
			})
			console.log(error, 'Error in storing individual kyc')
		} finally {
			setLoaderValue(false)
		}

	}

	const handleDirectorDynamicForm = (event) => {
		const inputValue = event.target.value.replace('.', '')
		// const
		if (inputValue === '' || (parseInt(inputValue) >= 1 && parseInt(inputValue) <= 10)) {
			handleTextFieldChange(event)
			setBusinessDetail((prevState) => ({
				...prevState,
				noDirector: inputValue
			}))
		}
	}

	const handleShareHolderDynamicForm = (event) => {
		const inputValue = event.target.value.replace('.', '')
		if (inputValue === '' || (parseInt(inputValue) >= 0 && parseInt(inputValue) <= 10)) {
			handleTextFieldChange2(event)
			setBusinessDetail((prevState) => ({
				...prevState,
				noOfShareholder: inputValue
			}))
		}
	}

	const handleTextFieldChange2 = (event) => {
		const value = event.target.value
		setNumberOfForms2(Number(value))
	}

	const handleTextFieldChange = (event) => {
		const value = event.target.value
		setNumberOfForms(Number(value))
	}

	const prepareBusinessData = () => {
		return {
			userId: registerId,
			companyName: businessDetail.companyType,
			industryType: businessDetail.industryType,
			noDirector: businessDetail.noDirector,
			noShareholder: businessDetail.noOfShareholder,
			noEmployee: businessDetail.noOfEmployee,
			targetBusiness: businessDetail.targetMarket,
			website: businessDetail.website,
			expectedRemittance: businessDetail.expectedRemittance,
			noOfTranscation: businessDetail.noOfTransaction
		}
	}

	const handleOther = (e) => {
		if (e.target.value == 'Others') {
			document.getElementById('otherfield').style.display = 'block'
		} else {
			document.getElementById('otherfield').style.display = 'none'
		}
	}

	const handlecloseDirector = () => {
		// debugger
		setOpenDirectorPopup(false)
		handleSubmitShareHolder('director', false)

		setShareholderFormPopup(true)
	}

	const handleSubmitShareHolder = async (type, hasShareholderForm = false) => {

		if(type === 'director'){
			setBusinessDirectorDetail(directorDetail)
		}else{
			setBusinessShareholderDetail(shareholderDetail)
		}

		try {
			setLoaderValue(true)
			const response = await axios.post(
				CommonConstants.BASE_URL + '/adddirectors',
				type === 'director' ? directorDetail : shareholderDetail
			)
			if (response.data.status === true) {
				setLoaderValue(false)

				if(type === 'director'  && numberOfForms2 <= 0){
					handleIndividualNextStep()
					setOpenDirectorPopup(false)
				}

				if (hasShareholderForm === true ) {
					setShareholderFormPopup(false)
					handleIndividualNextStep()
				}
				console.log(response.data.data, 'Add Director Details')
			}
		} catch (err) {
			console.log(err)
		} finally {
			setLoaderValue(false)
		}
	}

	const handleFormInputChange2 = (index, field, value, phonecode, countryid) => {
// debugger
		if (phonecode !== undefined) {
			const updatedFormData = [...shareholderDetail]
			updatedFormData[index] = {
				...shareholderDetail[index],
				userId: +registerId,
				isShareHolder: true,
				phoneCode: phonecode,
				[field]: value
			}
			setShareholderDetail(updatedFormData)
		} else {
			const updatedFormData = [...shareholderDetail]
			updatedFormData[index] = {
				...updatedFormData[index],
				userId: +registerId,
				isShareHolder: true,
				phoneCode: phonecode === undefined ? '+61' : phonecode,
				countryId: countryid === undefined ? 14 : countryid,
				[field]: value
			}
			setShareholderDetail(updatedFormData)
		}
		// ShareholderForms(updatedFormData)
	}
	const handleFormInputChange = (index, field, value, phonecode, countryid) => {
// debugger
		if (phonecode !== undefined) {
			const updatedFormData = [...directorDetail]
			updatedFormData[index] = {
				...directorDetail[index],
				userId: +registerId,
				isShareHolder: false,
				phoneCode: phonecode,
				[field]: value
			}
			setDirectorDetail(updatedFormData)
		} else {
			const updatedFormData = [...directorDetail]
			updatedFormData[index] = {
				...updatedFormData[index],
				userId: +registerId,
				isShareHolder: true,
				phoneCode: phonecode === undefined ? '+61' : phonecode,
				countryId: countryid === undefined ? 14 : countryid,
				[field]: value
			}
			setDirectorDetail(updatedFormData)
		}
		// ShareholderForms(updatedFormData)
	}

	const checkMobileValidation = (countryPhoneCode, e) => {
		const inputedMobileNumber = e.target.value
		const mobileNo = /^(?!0|4)\d{5,15}$/
		const zeroValid = /^((04))\d{8}$/
		const fourValid = /^4\d{8}$/

		if (countryPhoneCode === '+61') {
			const isValid = (countryPhoneCode === '+61' && (zeroValid.test(inputedMobileNumber) || fourValid.test(inputedMobileNumber))) || mobileNo.test(inputedMobileNumber)

			setIsMobileValid(!isValid)
		} else {
			setIsMobileValid(false)
		}
	}

	const renderShareholderDynamicForms = () => {
		const forms2 = []

		for (let i = 0; i < numberOfForms2; i++) {
			forms2.push(
				<div key={i} className="my-3">
					<h5 className="fs-6 ps-3">Shareholder Details {i + 1} </h5>
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
								options={countryOptionList}
								className="responsiveFontLarge orangeForm nationality SelectHoverLabel required"
								closeMenuOnSelect={true}
								isSearchable={true}
								defaultValue={{
									'value': 14,
									'label': 'Australia',
									'image': 'https://flagcdn.com/16x12/au.png',
									'iso2': 'AU',
									'PhoneCode': '61'
								}}
								onChange={(e) => {
									console.log(e)
									let value = e.value.split(' ')
									handleFormInputChange2(i, 'countryId', value[0], '+' + value[1])
								}}
								components={{Option: CustomOption}}
							/>
							{/*{ValidCountryofBusiness == '0' && Valid == true && (*/}
							{/*	<small className="error-message text-danger">Please Select The Country of Business Registration</small>*/}
							{/*)}*/}
							<label
								htmlFor="name" style={{zIndex: 0}}
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
								value={shareholderDetail[i]?.name || ''}
								className="formcontrol orangeForm form-input required"
								onChange={(e) => {
									let inputValue = e.target.value
									let sanitizedValue = ''
									let Alfabet = ''

									if (inputValue) {
										const regex = /[^a-zA-Z\s]/g
										Alfabet = inputValue.replace(regex, '')
										const words = Alfabet.split(' ')

										sanitizedValue = words
											.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
											.join(' ')
									}

									handleFormInputChange2(i, 'name', sanitizedValue, shareholderDetail[i]?.phoneCode, shareholderDetail[i]?.countryId)
								}}
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
								value={shareholderDetail[i]?.email || ''}
								className="formcontrol orangeForm email form-input required"
								onChange={(e) => handleFormInputChange2(i, 'email', e.target.value, shareholderDetail[i]?.phoneCode, shareholderDetail[i]?.countryId)}
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
									value={shareholderDetail[i]?.phoneCode}
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
									value={shareholderDetail[i]?.phone || ''}
									className={`inputphonenum inputmobile formcontroll2 BorderOrange required phone ps-0 form-input `}
									// className="inputphonenum inputmobile formcontrol orangeForm form-input required"
									onChange={(e) => {
										let value = e.target.value
										const newValue = value.replace(/\D/g, '')
										handleFormInputChange2(i, 'phone', newValue, shareholderDetail[i]?.phoneCode, shareholderDetail[i]?.countryId)
										checkMobileValidation(shareholderDetail[i]?.phoneCode, e)
									}}
								/>
								<label htmlFor="name" className="form-label1">
									Mobile
								</label>
							</div>
							{isMobileValid === true && shareholderDetail[i]?.phone ? (
								<small
									className={`text-danger  ms-2 error_font`}
								>
									This mobile Number must start with 04 or 4 and have 10
									or 9 digits respectively
								</small>
							) : ''
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
								value={shareholderDetail[i]?.percentageOfShareHolding || ''}
								className="formcontrol orangeForm form-input required"
								onChange={(e) => {
									let values = e.target.value
									const newValue = values.replace(/[^0-9.]/g, '')
									var cleanedValue = newValue.replace(
										/\./g,
										function (match, offset, input) {
											return offset === input.indexOf('.')
												? match
												: ''
										}
									)

									if (cleanedValue === '' || (parseInt(cleanedValue) >= 0 && parseInt(cleanedValue) <= 100)) {
										handleFormInputChange2(i, 'percentageOfShareHolding', cleanedValue, shareholderDetail[i]?.phoneCode, shareholderDetail[i]?.countryId)
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
			)
		}


		return forms2
	}

	const renderDynamicForms = () => {
		const forms = []
		for (let i = 0; i < numberOfForms; i++) {
			forms.push(
				<div key={i} className="my-3">
					<h5 className="fs-6 ps-3">Director Details {i + 1} </h5>
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
								options={countryOptionList}
								className="responsiveFontLarge orangeForm nationality SelectHoverLabel required"
								closeMenuOnSelect={true}
								isSearchable={true}
								defaultValue={{
									'value': 14,
									'label': 'Australia',
									'image': 'https://flagcdn.com/16x12/au.png',
									'iso2': 'AU',
									'PhoneCode': '61'
								}}
								onChange={(e) => {
									let value = e.value.split(' ')
									handleFormInputChange(i, 'countryId', value[0], '+' + value[1])
								}}
								components={{Option: CustomOption}}
							/>
							{/*{ValidCountryofBusiness == '0' && Valid == true && (*/}
							{/*	<small className="error-message text-danger">Please Select The Country of Business Registration</small>*/}
							{/*)}*/}
							<label
								htmlFor="name" style={{zIndex: 0}}
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
								value={directorDetail[i]?.name || ''}
								className="formcontrol orangeForm form-input required"
								onChange={(e) => {
									let inputValue = e.target.value
									let sanitizedValue = ''
									let Alfabet = ''

									if (inputValue) {
										const regex = /[^a-zA-Z\s]/g
										Alfabet = inputValue.replace(regex, '')
										const words = Alfabet.split(' ')

										sanitizedValue = words
											.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
											.join(' ')
									}

									handleFormInputChange(i, 'name', sanitizedValue, directorDetail[i]?.phoneCode, directorDetail[i]?.countryId)
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
								value={directorDetail[i]?.email || ''}
								className="formcontrol orangeForm email form-input required"
								onChange={(e) => handleFormInputChange(i, 'email', e.target.value, directorDetail[i]?.phoneCode, directorDetail[i]?.countryId)}
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
									defaultValue={directorDetail[i]?.phoneCode}
									placeholder="Mobile"
									readOnly
									className={`inputphonecode countrycode pe-0 formcontroll1 BorderOrange form-input `}
								/>
								<Form.Control
									name="Director_Mobile"
									type="text"
									placeholder="Director Mobile"
									value={directorDetail[i]?.phone || ''}
									className={`inputphonenum inputmobile formcontroll2 BorderOrange required phone ps-0 form-input `}
									onChange={(e) => {
										let value = e.target.value
										const newValue = value.replace(/[^0-9]/g, '')
										handleFormInputChange(i, 'phone', newValue, directorDetail[i]?.phoneCode, directorDetail[i]?.countryId)
										checkMobileValidation(directorDetail[i]?.phoneCode, e)
									}}
								/>
								<label htmlFor="name" className="form-label1">
									Mobile
								</label>
							</div>

							<small className="responsiveFontLarge  d-none text-danger error ms-2">
								Please Enter Director Mobile
							</small>
							{isMobileValid === true && directorDetail[i]?.phone ? (
								<small
									className={`text-danger  ms-2 error_font`}
								>
									This mobile Number must start with 04 or 4 and have 10
									or 9 digits respectively
								</small>
							) : ''
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
								value={directorDetail[i]?.percentageOfShareHolding || ''}
								className="formcontrol orangeForm form-input required"
								onChange={(e) => {
									let values = e.target.value
									const newValue = values.replace(/[^0-9.]/g, '')
									var cleanedValue = newValue.replace(
										/\./g,
										function (match, offset, input) {
											return offset === input.indexOf('.')
												? match
												: ''
										}
									)
									if (cleanedValue === '' || (parseInt(cleanedValue) >= 0 && parseInt(cleanedValue) <= 100)) {
										handleFormInputChange(i, 'percentageOfShareHolding', cleanedValue, directorDetail[i]?.phoneCode, directorDetail[i]?.countryId)
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
			)
		}
		return forms
	}


	return (
		<>
			<section>
				<div className="bgOrange text-white text-center bolder my-4 py-3">
					Welcome to LegalRemit
				</div>
				<Container fluid>
					<Row>
						<Col className="col-lg-12 p-0">
							<div className="mt-3 pe-4 ps-4 ">
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
													onChange={handleBusinessDetail}
													name="companyType"
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
													onChange={(e) => {
														let value = e.target.value
														setBusinessDetail((prevState) => ({
															...prevState,
															noOfEmployee: value
														}))
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
												<small
													className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
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
													onChange={(e) => {
														handleDirectorDynamicForm(e)
													}}
													name="Business_No_of_directors"
													type="text"
													value={businessDetail.noDirector}
													// onBlur={(e)=>{setOpenDirectorPopup(true)}}
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
													onChange={(e) => {
														handleShareHolderDynamicForm(e)
													}}
													value={businessDetail.noOfShareholder}
													name="noOfShareholder"
													type="text"
													placeholder="No. of Shareholders"
													className="formcontrol orangeForm form-input"
												/>

												<label htmlFor="name" className="form-label1">
													No of Shareholders
												</label>
											</Form.Group>
											<Row className="px-3">
												<small className="notevalue bolder text-primary">Note: The number of shareholders must not
													include any individuals who also serve as directors of the company.</small>
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
													onChange={(e) =>{
														handleBusinessDetail(e)
														handleOther(e)
													}}
													name="industryType"
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

										<Row className="mb-3 respoChildFooter" id="otherfield" style={{display: 'none'}}>
											<Form.Group
												as={Col}
												className="left-inner-addon input-container"
											>
												<i className="orangeText main fas fa-building"></i>
												<Form.Control
													onChange={handleBusinessDetail}
													name="industryType"
													type="text"
													placeholder="Industry Type"
													className="formcontrol orangeForm form-input"
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
													value={businessDetail.targetMarket}
													onChange={(e) => {
														let value = e.target.value
														let Alfabet = value.replace(/[^a-zA-Z\s]/g, '')
														const words = Alfabet.split(' ')

														let sanitizedValue = words
															.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
															.join(' ')
														setBusinessDetail((prevState) => ({
															...prevState,
															targetMarket: sanitizedValue
														}))
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
													onChange={(e) => {
														let values = e.target.value
														const newValue = values.replace(/[^0-9.]/g, '')
														var cleanedValue = newValue.replace(
															/\./g,
															function (match, offset, input) {
																return offset === input.indexOf('.')
																	? match
																	: ''
															}
														)

														setBusinessDetail((prevState) => ({
															...prevState,
															expectedRemittance: cleanedValue
														}))
													}}
													value={businessDetail.expectedRemittance}
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
												<small
													className="responsiveFontLarge  d-none text-danger error_message error_message_number3 ms-2">
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
													onChange={(e) => {
														let values = e.target.value
														const newValue = values.replace(/[^0-9]/g, '')

														setBusinessDetail((prevState) => ({
															...prevState,
															noOfTransaction: newValue
														}))
													}}
													value={businessDetail.noOfTransaction}
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
												<small
													className="responsiveFontLarge  d-none text-danger error_message error_message_number4 ms-2">
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
													onChange={handleBusinessDetail}
													name="website"
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

								<div
									className={`btn-component  d-flex justify-content-center`}
								>
									<input
										className={`col-lg-3 uppercase pointer nextButtonStep3 `}
										type="button"
										value={'Next'}
										onClick={submitBusinessDetail}
									/>
								</div>

								{/*TODO: Business Details form Remaining*/}
							</div>
						</Col>
					</Row>
				</Container>

				<Modal
					show={openDirectorPopup}
					// onHide={(e)=>{setOpenDirectorPopup(false); StepBlank('')}}
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
													handleDirectorDynamicForm(e)
												}}
												name="Business_No_of_directors"
												type="number"
												value={businessDetail.noDirector}
												// onBlur={(e)=>{setOpenDirectorPopup(true)}}
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
									onClick={(e) => {
										// console.log(formData)
										if (validator.error_input_validation('Director_List')) {
											if (businessDetail.noOfShareholder > 0) {
												handlecloseDirector(e)
											} else {
												handleSubmitShareHolder('director')
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
					show={shareholderFormPopup}
					// onHide={(e)=>{
					// setShareholderFormPopup(false)
					// StepBlank('')}}
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
									<div className="mb-3 respoChildFooter">
										<Form.Group
											as={Col}
											className="left-inner-addon"
										>
											<i className="orangeText main fa fa-user "></i>
											<Form.Control
												onChange={(e) => {
													handleShareHolderDynamicForm(e)
												}}
												value={businessDetail.noOfShareholder}
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
											<small className="notevalue bolder text-primary">Note: The number of shareholders must not include
												any individuals who also serve as directors of the company.</small>
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
									onClick={(e) => {
										if (validator.error_input_validation('shareholder_List')) {
											handleSubmitShareHolder('shareholder', true)
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

				<Modal show={serverError.openErrorModal}>
					<Modal.Header
						className="d-flex align-items-center"
						onHide={handleErrorPopup}
					>
						<Modal.Title>
							<small className="responsiveFontLarge  text-black bolder mb-0">
								Server Error
							</small>
						</Modal.Title>
					</Modal.Header>
					<Row className="text-center d-flex justify-content-center">
						<Col className="col-lg-11 ">
							<hr></hr>
						</Col>
					</Row>
					<Modal.Body>
						<div className="text-center mb-4">
							{serverError.message && Object.values(serverError.message).map((error, index) => (
								<div key={index} className="responsiveFontLarge text-black text-center normal" id="otpmsg">
									{error}
								</div>
							))}
						</div>
					</Modal.Body>
					<div>
						<Container className="modal-body">
							<Row className="align-items-center justify-content-evenly pb-2">
								<Col className="col-lg-4">
									<Button
										className="WhiteButton border-danger text-danger roundedCorner upparcase bolder"
										variant="danger"
										onClick={handleErrorPopup}
									>
										Close
									</Button>
								</Col>
							</Row>
						</Container>
					</div>
				</Modal>
			</section>
		</>
	)
}
