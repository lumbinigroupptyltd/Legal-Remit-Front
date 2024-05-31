import React, { useContext, useEffect, useState } from 'react'
import './Step3.scss'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import '../../../../Helpers/CountryDropdown/flags.css'
import userContext from '../../Signupdata/Usecontext'
import Select from 'react-select'
import { getNationalities, getOccupations, getStates, storeIndividualKyc } from '../../api'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

const validator = require('../../../../../assets/js/validator')

export default function Step3 ({
																 Name,
																 handleId,
																 handleIndividualNextStep
															 }) {
	const {
		stepOneData,
		setStepThreeData,
		setNationalityId,
		setLoaderValue,
		registerId,
		setUserKycId,
		setStateOptionList,
		setNationalityOptionList,
		setOccupationOptionList
	} = useContext(userContext)


	const [userKyc, setUserKyc] = useState({
		nationality: '',
		streetName: '',
		suburb: '',
		stateId: '',
		postalCode: '',
		occupationId: '',
		isResidence: true
	})

	const [nationalityList, setNationalityList] = useState([])
	const [stateList, setStateList] = useState([])
	const [occupationList, setOccupationList] = useState([])
	const [isNationalitySearchable, setIsNationalitySearchable] = useState(false)
	const [autoTimeZone, setAutoTimeZone] = useState('')

	const [nationality, setNationality] = useState('')
	const [streetName, setStreetName] = useState('')
	const [suburb, setSuburb] = useState('')
	const [state, setState] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [occupation, setOccupation] = useState('')
	const [isResidence, setIsResidence] = useState(true)

	const [isAddressValid, setIsAddressValid] = useState(true)
	const [isNationalityValid, setIsNationalityValid] = useState(true)
	const [isOccupationValid, setIsOccupationValid] = useState(true)

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

	const getNationalityList = async () => {
		try {
			const response = await getNationalities()

			if (response.data.status === true) {
				const nationalityOptions = response.data.data.map((nationality) => ({
					value: nationality.nationality,
					label: nationality.nationality
				}))

				setNationalityList(nationalityOptions)

				//Store option for future use
				setNationalityOptionList(nationalityOptions)

				if (response.data.data.length >= 5) {
					setIsNationalitySearchable(true)
				} else {
					setIsNationalitySearchable(false)
				}
			}
		} catch (error) {
			console.log(error)
		}
	}


	const getGetAllStates = async () => {
		try {
			const response = await getStates(stepOneData.countryId)
			if (response.data.status === true) {
				setStateList(response.data.data)

				//Store option for future use
				setStateOptionList(response.data.data)
			}
		} catch (err) {
			console.log(err, 'Error in getting states')
		}
	}


	const getOccupationList = async () => {
		try {
			const response = await getOccupations()

			if (response.data.status === true) {

				const occupationOptions = response.data.data.map((ocupation) => ({
					value: ocupation.id,
					label: ocupation.name
				}))

				//Store option for future use
				setOccupationOptionList(occupationOptions)

				setOccupationList(occupationOptions)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleFormId = () => {
		handleId('Individual_KYC_step3')
	}

	useEffect(() => {
		if (registerId) {
			console.log('registerId', registerId)
			getNationalityList()
			getGetAllStates()
			getOccupationList()
		}
		handleFormId()

	}, [registerId])


	const handleUserKycDetail = (e) => {
		const {name, value} = e.target

		if (name === 'isResidence') {
			setUserKyc((prevState) => ({
				...prevState,
				[name]: value === 'true'
			}))
			return
		}

		setUserKyc((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	const autocompleteRef = React.useRef(null)


	const handlePlaceSelect = async (place) => {
		const location = {
			lat: place.geometry.location.lat(),
			lng: place.geometry.location.lng()
		}
		const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${location.lat},${location.lng}&timestamp=${Date.now() / 1000}&key=AIzaSyCNJRR1zkMpq2RLpT6bM2BLAO2kEDZ8qtA`)
		const data = await response.json()

		setAutoTimeZone(data.timeZoneId)

		const tempArray = place.address_components
		//const isValid = addressRegex.test(place.name);
		let isValid = true
		let streetName = ''
		let streetNumber = ''
		let streetLongName = ''
		let postalCode = ''
		let city = ''
		let state = ''

		setUserKyc((prevState) => ({
			...prevState,
			streetName: '',
			suburb: '',
			stateId: '',
			postalCode: ''
		}))

		setPostalCode('')
		setStreetName('')
		setSuburb('')
		setState('')


		if (isValid) {
			tempArray.map((item, index) => {
				item.types.map((titem) => {
					streetNumber = titem === 'street_number' ? item.long_name : streetNumber
					streetName = titem === 'route' ? item.long_name : streetLongName
					postalCode = titem === 'postal_code' ? item.long_name : postalCode
					city = titem === 'locality' ? item.long_name : city
					state = titem === 'administrative_area_level_1' ? item.long_name : state
				})
			})

			streetName = place.formatted_address

			setUserKyc((prevState) => ({
				...prevState,
				streetName: streetName,
				suburb: city,
				postalCode: postalCode

			}))

			const matchedState = stateList.find((stateItem) => stateItem.name === state)
			if (matchedState) {
				setState(matchedState.id)

				setUserKyc((prevState) => ({
					...prevState,
					stateId: matchedState.id
				}))
			}
			setSuburb(city)
			setPostalCode(postalCode)
			setStreetName(streetName)
		}
		setIsAddressValid(isValid)

		return isValid
	}


	useEffect(() => {
		var countryName = stepOneData?.countryDetail?.countryIso3

		if (!countryName == '') {
			const options = {
				componentRestrictions: {country: `${countryName}`}
			}

			const autocomplete = new window.google.maps.places.Autocomplete(
				autocompleteRef.current,
				options
			)
			autocomplete.addListener('place_changed', () => {
				const place = autocomplete.getPlace()
				handlePlaceSelect(place)
			})
		}
		// document.getElementById('otherfield').style.display = 'none'

		// if (Name == 'Individual') {
		//   if (activestepkey === 'thirdStep') {
		//     handleid('Individual_KYC_step3')
		//   }
		document.getElementById('stepone3in1').style.display = 'block'
		// document.getElementById('steptwo3in2').style.display = 'none'
		// document.getElementById('stepthree3in3').style.display = 'none'
		// }
	}, [streetName])


	const handleSetCity = (e) => {
		handleUserKycDetail(e)
		setSuburb(e.target.value)
	}

	const handleSetPostalCode = (e) => {
		handleUserKycDetail(e)
		setPostalCode(e.target.value)
	}

	const handleDataStepSelectOccupation = async (e) => {
		await setOccupation(e.value)

		setUserKyc((prevState) => ({
			...prevState,
			occupationId: e.value
		}))
		setIsOccupationValid(true)
	}

	const handleNationalityChange = async (e) => {
		await setNationality(e.value)
		setNationalityId(e.value)
		setUserKyc((prevState) => ({
			...prevState,
			nationality: e.value
		}))

		setIsNationalityValid(true)
	}


	const submitUserKyc = async () => {
		if (nationality === '') {
			setIsNationalityValid(false)
		} else {
			setIsNationalityValid(true)
		}

		if (occupation === '') {
			setIsOccupationValid(false)
		} else {
			setIsOccupationValid(true)
		}

		validator.error_input_validation('Individual_KYC_step3')
		if (!validator.error_input_validation('Individual_KYC_step3')) {
			return
		}
		if (nationality !== '' && occupation !== '') {
			try {
				setLoaderValue(true)
				const individualKycData = prepareIndividualKycData()
				const response = await storeIndividualKyc(individualKycData)

				if (response.data.status === true) {
					setUserKycId(response.data.data)

					//Save data in context
					setStepThreeData(userKyc)
					handleIndividualNextStep()
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


	}

	const prepareIndividualKycData = () => {
		return {
			...userKyc,
			userId: registerId,
			countryId: parseInt(stepOneData?.countryId),
			verified: 0,
			kycStatus: '',
			kycCase: 0
		}
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
													name="nationality"
													options={nationalityList}
													className={`SelectValueSelect SelectValueSelect3 SelectHoverLabel required nationality ${isNationalityValid === false ? 'custom__error' : ''}  `}
													closeMenuOnSelect={true}
													isSearchable={isNationalitySearchable}
													onChange={handleNationalityChange}
												/>
												{isNationalityValid === false && (
													<small className="error  error-message error_message text-danger">Please
														select Nationality</small>
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
												<i className="orangeText mainStep3 	fa fa-home "></i>
												<Form.Control
													type="text"
													ref={autocompleteRef}
													placeholder="House No & Street Name"
													onChange={(e) => {
														setStreetName(e.target.value)
													}}
													value={streetName}
													name="streetName"
													className={`form-input orange-border-step3 required ${
														!isAddressValid ? 'error-border' : ''
													}`}
												/>
												{!isAddressValid && (
													<small className="error-message text-danger">Invalid address. Please
														select and search proper address which contains house number and
														street name.</small>
												)}
												<label htmlFor="name" className="form-label1">
													House No & Street Name
												</label>
												<small
													className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
													value={suburb}
													onChange={(e) => {
														handleSetCity(e)
													}}
													name="suburb"
													className="form-input cityvalidation orange-border-step3 required"
												/>
												<label htmlFor="name" className="form-label1">
													Suburb/City
												</label>
												<small
													className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
													onChange={(e) => {
														handleUserKycDetail(e)
														setState(e.target.value)
													}}
													name="stateId"
													value={state}
												>
													<option value="">State</option>
													{stateList &&
														stateList.map((state, index) => {
															return (
																<>
																	<option value={state.id}>
																		{state.name}
																	</option>
																</>
															)
														})}
												</Form.Select>

												<label htmlFor="name" className="form-label1">
													State
												</label>
												<small
													className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
													value={postalCode}
													onChange={(e) => {
														handleSetPostalCode(e)
														setPostalCode(e.target.value)
													}}
													name="IndidualZip"
													className="form-input orange-border-step3 required number"
												/>
												<label htmlFor="name" className="form-label1">
													Postal / Zip Code
												</label>
												<small
													className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
												<Select
													name="occupationId"
													options={occupationList}
													className={`SelectValueSelect SelectValueSelect3 SelectHoverLabel required nationality ${isOccupationValid === false ? 'custom__error' : ''}`}
													closeMenuOnSelect={true}
													isSearchable={true}
													onChange={(e) => {
														handleDataStepSelectOccupation(e)
													}}
												/>
												<label style={{zIndex: 0}} htmlFor="name" className="form-label1">
													Occupation
												</label>
												{isOccupationValid === false && (
													<small className="error error-message error_message text-danger">Please
														Select The Occupation</small>
												)}

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
													onChange={(e) => {
														handleUserKycDetail(e)
														setIsResidence(e.target.value)
													}}
													value={isResidence}
													name="isResidence"
												>
													<option value="" disabled>
														Is Residence of {stepOneData?.countryDetail?.name}
													</option>
													<option value="true">Yes</option>
													<option value="false">No</option>
												</Form.Select>

												<label htmlFor="name" className="form-label1">
													Is Residence of {stepOneData?.countryDetail?.name}
												</label>
												<small
													className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
													Please Select The Residence
												</small>
												{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
											</Form.Group>
										</Row>
									</Form>

									<div
										className={`btn-component  d-flex justify-content-center`}
									>
										<input
											className={`col-lg-3 uppercase pointer nextButtonStep3 `}
											type="button"
											disabled={!isAddressValid || !isNationalityValid || !isOccupationValid}
											value={'Next'}
											onClick={submitUserKyc}
										/>
									</div>
								</Row>

								{/*TODO: Business Details form Remaining*/}
							</div>
						</Col>
					</Row>
				</Container>


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
