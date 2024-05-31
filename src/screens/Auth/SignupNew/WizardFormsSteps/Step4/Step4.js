import React, { useContext, useEffect, useState } from 'react'
import './Step4.scss'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import '../../../../Helpers/CountryDropdown/flags.css'
import blueVector from '../../../../../assets/images/blueVector.svg'
import Button from 'react-bootstrap/Button'
import userContext from '../../Signupdata/Usecontext'
import { isMobile, isTablet } from 'react-device-detect'
import Select from 'react-select'
import {
	generateScantekLink,
	getIdTypesByCountry,
	getIssueingAuthorityByNationality,
	saveUserIdDetail,
	updateUser
} from '../../api'

const validator = require('../../../../../assets/js/validator')

export default function Step4 ({
																 Name,
																 handleId,
																 activeStepKey,
																 handleIndividualNextStep
															 }) {

	const handleFormId = () => {
		handleId('Individual_Details_step4')
	}

	const {
		stepOneData,
		setStepFourData,
		nationalityId,
		userKycId,
		registerId,
		setLoaderValue,
		setUserDocumentId,
		setUserIdType,
		setIdTypeOptionList,
		setIdIssueingAuthorityOptionList
	} = useContext(userContext)

	const [openVerificationPopup, setOpenVerificationPopup] = useState(false)

	const handleCloseVerificationPopup = () => setOpenVerificationPopup(false)
	const handleShowVerificationPopup = () =>
		stepOneData.countryId === '14' ? setOpenVerificationPopup(true) : setOpenVerificationPopup(false)


	const [idTypeList, setIdTypeList] = useState([])
	const [idAuthorityList, setIdAuthorityList] = useState([])
	const [IdType, setIdType] = useState('')
	const [IdAuthority, setIdAuthority] = useState('')
	const [isDigitalVerification, setIsDigitalVerification] = useState(false)

	const [isIdTypeValid, setIsIdTypeValid] = useState(true)
	const [isIdAuthorityValid, setIsIdAuthorityValid] = useState(true)


	const [userIdDetail, setUserIdDetail] = useState({
		typeId: '',
		documentNumber: '',
		cardNumber: '',
		dob: '',
		documentValidity: '',
		issuingAuthority: ''
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


	const getIssuingAuthority = async () => {
		try {
			const response = await getIssueingAuthorityByNationality(nationalityId, stepOneData.countryId)

			if (response.data.status === true) {
				const options = response.data.data.map((authority) => ({
					value: authority.authorityName,
					label: authority.authorityName
				}))
				setIdAuthorityList(options)

				//Save data for future use
				setIdIssueingAuthorityOptionList(options)
			}
		} catch (e) {
			console.log(e, 'Error in getIssuingAuthority')
		}
	}

	const getIdTypes = async () => {
		try {
			const response = await getIdTypesByCountry(stepOneData.countryId)
			if (response.data.status === true) {
				let options = await response.data.data.map((type) => ({
					value: type.id,
					label: type.name
				}))

				//Save data for future use
				setIdTypeOptionList(options)

				setIdTypeList(options)
			}
		} catch (e) {
			console.log(e, 'Error in getIdTypes')
		}
	}


	const handleUserDocument = (event) => {
		const {name, value} = event.target
		setUserIdDetail({
			...userIdDetail,
			[name]: value
		})
	}

	useEffect(() => {
		if (userKycId) {
			getIssuingAuthority()
			getIdTypes()
			handleFormId()
		}
	}, [nationalityId, userKycId])

	useEffect(() => {
		if (stepOneData.roleId === 'Individual') {
			if (activeStepKey === 'fourthStep') {
				handleShowVerificationPopup()
				if (
					(isMobile || isTablet) &&
					(navigator.userAgent.match(/Android/i) ||
						navigator.userAgent.match(/iPhone|iPad|iPod/i))
				) {
					handleShowVerificationPopup()
				} else {
					handleCloseVerificationPopup()
				}
			}
		}
	}, [stepOneData.roleId, activeStepKey])


	const handleDataIdTypeIndividual = (e) => {
		setUserIdType(e)
		setValidIdType(e)
		setUserIdDetail((prevState) => ({
			...prevState,
			typeId: e.value
		}))

		if (e.value) {
			setIsIdTypeValid(true)
		} else {
			setIsIdTypeValid(false)
		}
	}

	const handleIssueAuthority = (e) => {
		setValidIdAuthority(e)
		setUserIdDetail((prevState) => ({
			...prevState,
			issuingAuthority: e.value
		}))

		if (e.value) {
			setIsIdAuthorityValid(true)
		} else {
			setIsIdAuthorityValid(false)
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


	const MaxDate1 = new Date()
	MaxDate1.setFullYear(MaxDate1.getFullYear() - 18)
	// maxDate.setFullYear(maxDate.getFullYear() - 18);
	const maxDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate())
	const minDate = new Date(currentDate.getFullYear() - 100, 0, 1)

	const [ValidIdType, setValidIdType] = useState('0')
	const [ValidIdAuthority, setValidIdAuthority] = useState('0')

	const [Valid, setValid] = useState(false)

	const submitUserIdDetails = async () => {

		if (userIdDetail.issuingAuthority === '') {
			setIsIdAuthorityValid(false)
		} else {
			setIsIdAuthorityValid(true)
		}

		if (userIdDetail.typeId === '') {
			setIsIdTypeValid(false)
		} else {
			setIsIdTypeValid(true)
		}

		validator.error_input_validation('Individual_Details_step4')
		if (!validator.error_input_validation('Individual_Details_step4')) {
			return
		}

		if (isIdTypeValid && isIdAuthorityValid) {
			try {
				setLoaderValue(true)
				const response = await saveUserIdDetail({
					...userIdDetail,
					userId: registerId
				})

				if (response.data.status === true) {
					setUserDocumentId(response.data.data)

					setStepFourData(userIdDetail)

					handleIndividualNextStep()
				}

			} catch (error) {

				setServerError({
					message: error.response.data,
					openErrorModal: true
				})
				console.log(error, 'Error in submitUserIdDetails')
			} finally {
				setLoaderValue(false)
			}
		}
	}

	const handleVerificationSubmit = () => {
		if (isDigitalVerification) {
			handleScantekVerification()
		} else {
			handleCloseVerificationPopup()
		}
	}

	const handleScantekVerification = async () => {

		try {
			setLoaderValue(true)
			let data = {
				id: registerId,
				digital: true
			}

			const response = await updateUser(data)

			if (response.data.status === true) {

				const scantekResponse = await generateScantekLink(registerId)

				if (scantekResponse.data.status === true) {
					setLoaderValue(false)
					window.open(scantekResponse.data.data.voiLink, '_self')
				}
			}
		} catch (error) {
			console.log(error, 'Error in handleScantekVerification')
		} finally {
			setLoaderValue(false)
		}
	}


	return (
		<>
			<section>
				<div className="step4Welcome  text-white text-center bolder my-4 py-3">
					Welcome to LegalRemit
				</div>
				<Container fluid>
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
										<Form className="mt-3" id="Individual_Details_step4">
											<Row className="mb-3 ">

												<Form.Group
													as={Col}
													className="nationalityDRP input-container orangeBorder"
												>
													<i className="blueText nationalityMain3 	fa fa-flag svgNationality"></i>
													<Select
														name="typeId"
														options={idTypeList}
														className={`SelectValueSelect99 SelectValueSelect99 SelectHoverLabel required nationality  ${isIdTypeValid === false ? 'custom__error' : ''}`}
														closeMenuOnSelect={true}
														isSearchable={false}
														onChange={(e) => {
															handleDataIdTypeIndividual(e)
														}}
													/>
													{/* ////////////////////////////////////// */}
													{isIdTypeValid === false && (
														<small className="error-message text-danger">Please select ID
															Type</small>
													)}
													<label style={{zIndex: 0}} htmlFor="name" className="form-label1">
														ID Type
													</label>
													<small
														className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
														value={userIdDetail.documentNumber}
														onChange={(e) => {
															let value = e.target.value
															let sanitizedValue = ''

															var sanitizedValues = value.replace(/[^a-zA-Z0-9]/g, '')
															sanitizedValue = sanitizedValues.toUpperCase()
															setUserIdDetail((prevState) => ({
																...prevState,
																documentNumber: sanitizedValue
															}))
														}}
														name="IndidualIDNumber"
														className="formControlStep4 required form-input"
													/>
													<label htmlFor="name" className="form-label1">
														ID Number
													</label>
													<small
														className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
														value={userIdDetail.cardNumber}
														onChange={(e) => {
															let value = e.target.value
															let sanitizedValue = ''

															var sanitizedValues = value.replace(/[^a-zA-Z0-9]/g, '')
															sanitizedValue = sanitizedValues.toUpperCase()
															setUserIdDetail((prevState) => ({
																...prevState,
																cardNumber: sanitizedValue
															}))
														}}
														name="IndidualCardNumber"
														className="formControlStep4 form-input"
														// cardnumber
													/>
													<label htmlFor="name" className="form-label1">
														Card Number
													</label>
													<small
														className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
														onChange={handleUserDocument}
														max={maxDate.toISOString().split('T')[0]}
														min={minDate.toISOString().split('T')[0]}
														// defaultValue={currentDateString}
														onKeyPress={(event) => event.preventDefault()}
														name="dob"
														placeholder="Date of Birth"
														className="form-input formControlStep4 required "
													/>

													<label htmlFor="name" className="form-label1">
														Date of Birth
													</label>
													<small
														className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
														value={userIdDetail.documentValidity}
														onChange={handleUserDocument}
														min={formattedDate}
														onKeyPress={(event) => event.preventDefault()}
														name="documentValidity"
														placeholder="Date of ID Expiry"
														className="formControlStep4 required form-input"
													/>
													<label htmlFor="name" className="form-label1">
														Date of ID Expiry
													</label>
													<small
														className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
														name="issuingAuthority"
														options={idAuthorityList}
														className={`SelectValueSelect99 SelectHoverLabel required nationality ${isIdAuthorityValid === false ? 'custom__error' : ''}`}
														closeMenuOnSelect={true}
														isSearchable={true}
														onChange={(e) => {
															handleIssueAuthority(e)
														}}
													/>
													{isIdAuthorityValid === false && (
														<small className="error-message text-danger">Please select the
															iD issuing authority</small>
													)}
													<label style={{zIndex: 0}} htmlFor="name" className="form-label1">
														ID Issuing Authority
													</label>
												</Form.Group>
											</Row>
										</Form>

										<div
											className={`btn-component  d-flex justify-content-center`}
										>
											<input
												className={`col-lg-3 uppercase pointer nextButtonStep4 `}
												type="button"
												value={'Next'}
												onClick={submitUserIdDetails}
											/>
										</div>
									</Col>

								</Row>
							</div>
						</Col>
					</Row>
				</Container>

				<Modal className="verifyModal" dialogClassName="modal-90w" show={openVerificationPopup}>
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
											onClick={() => {
												setIsDigitalVerification(true)
											}}
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
											onClick={() => {
												setIsDigitalVerification(false)
											}}
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
										onClick={handleVerificationSubmit}
									>
										Next
									</Button>
								</Modal.Footer>
							</Col>
						</Col>
					</Row>
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
