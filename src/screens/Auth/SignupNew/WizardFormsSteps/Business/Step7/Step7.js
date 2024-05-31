import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


import '../Step6/Step6.scss'
import '../../../../../Helpers/CountryDropdown/flags.css'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Accordion from 'react-bootstrap/Accordion'
import userContext from '../../../Signupdata/Usecontext'
import ModalComponent from '../../../../../Dashbord/ModalComponent'
import { updateUser } from '../../../api'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Select from 'react-select'


export default function Step7 () {

	const navigate = useNavigate()

	const [isEdit, setIsEdit] = useState(false)
	const [showSuccessModal, setShowSuccessModal] = useState(false)

	const {
		stepOneData,
		stepTwoData,
		nationalityOptionList,
		stateOptionList,
		occupationOptionList,
		idTypeOptionList,
		idIssueingAuthorityOptionList,
		stepThreeData,
		stepFourData,
		stepFiveData,
		registerId,
		userIdType,
		businessDetailData,
		setLoaderValue,
		countryOptionList,
		businessAdditionalDocument,
		businessDirectorDetail,
		businessShareholderDetail
	} = useContext(userContext)

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

	const handleSubmit = async () => {
		try {
			setLoaderValue(true)
			const data = {
				id: registerId,
				signupCompleted: true
			}
			const response = await updateUser(data)

			if (response.data.status === true) {
				setLoaderValue(false)
				setShowSuccessModal(true)
			}

		} catch (e) {
			setLoaderValue(false)

			setServerError({
				message: e.response.data,
				openErrorModal: true
			})

			console.log(e)
		} finally {
			setLoaderValue(false)
		}
	}


	const CustomOption = ({innerProps, label, data}) => (
		<div {...innerProps} style={{paddingLeft: '10px', paddingBottom: '8px', paddingTop: '8px'}}>
			<img src={data.image} alt={label} style={{width: '20px', marginRight: '5px'}}/>
			{label}
		</div>
	)


	const [openDirectorPopup, setOpenDirectorPopup] = useState(false)
	const [shareholderFormPopup, setShareholderFormPopup] = useState(false)

	const renderShareholderDynamicForms = () => {
		const forms2 = []

		for (let i = 0; i < businessDetailData.noOfShareholder; i++) {
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
								components={{Option: CustomOption}}
							/>
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
								value={businessShareholderDetail[i]?.name || ''}
								className="formcontrol orangeForm form-input required"
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
								value={businessShareholderDetail[i]?.email || ''}
								className="formcontrol orangeForm email form-input required"
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
									value={businessShareholderDetail[i]?.phoneCode}
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
									value={businessShareholderDetail[i]?.phone || ''}
									className={`inputphonenum inputmobile formcontroll2 BorderOrange required phone ps-0 form-input `}
									// className="inputphonenum inputmobile formcontrol orangeForm form-input required"
								/>
								<label htmlFor="name" className="form-label1">
									Mobile
								</label>
							</div>

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
								value={businessShareholderDetail[i]?.percentageOfShareHolding || ''}
								className="formcontrol orangeForm form-input required"
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
		for (let i = 0; i < businessDetailData.noDirector; i++) {
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
								components={{Option: CustomOption}}
							/>
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
								value={businessDirectorDetail[i]?.name || ''}
								className="formcontrol orangeForm form-input required"
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
								value={businessDirectorDetail[i]?.email || ''}
								className="formcontrol orangeForm email form-input required"
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
									defaultValue={businessDirectorDetail[i]?.phoneCode}
									placeholder="Mobile"
									readOnly
									className={`inputphonecode countrycode pe-0 formcontroll1 BorderOrange form-input `}
								/>
								<Form.Control
									name="Director_Mobile"
									type="text"
									placeholder="Director Mobile"
									value={businessDirectorDetail[i]?.phone || ''}
									className={`inputphonenum inputmobile formcontroll2 BorderOrange required phone ps-0 form-input `}
								/>
								<label htmlFor="name" className="form-label1">
									Mobile
								</label>
							</div>
						</Form.Group>
						<Form.Group
							as={Col}
							className="left-inner-addon input-container"
						>
							<i className="orangeText main fas fa-hand-holding-usd"></i>
							<Form.Control
								name="Director_shareHolding"
								type="text"
								placeholder="Share Holding (Percentage)"
								value={businessDirectorDetail[i]?.percentageOfShareHolding || ''}
								className="formcontrol orangeForm form-input required"
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
				<div className="bgPurple text-white text-center bolder my-4 py-3">
					Welcome to LegalRemit
				</div>
				<Container fluid>

					<Row id="steptwo7in2" className="mb-5">
						<Col className="col-lg-12 p-0">
							<div className="text-center">
								<label className="text-center text-black mb-2">Summary</label>
							</div>
							<div className=" ms-2">
								<Accordion
									className="accordian"
									defaultActiveKey="0"
								>
									<Accordion.Item eventKey="0" className="">
										<Accordion.Header
											className={`formcontrol ${
												isEdit === true
													? 'disableAccordian'
													: 'enableAccordian'
											}`}
										>
											User Details
										</Accordion.Header>
										<Accordion.Body>
											<Row
												id=""
												className={`mt-3 mb-2 ${
													isEdit === true ? 'd-none' : 'd-block'
												}`}
											>
												<div className="d-flex justify-content-end ">
													<p
														style={{
															color: '#aa2ae1'
														}}
														className="  text-center pointer"
													>
														You can edit these fields from profile section
														after login.
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
																defaultValue={stepTwoData.fName}
																placeholder="Full Name"
																className={`formcontrol required ${
																	isEdit == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
															/>
															<small
																className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																defaultValue={stepTwoData.businessName}
																placeholder="Business Name"
																className={`formcontrol required ${
																	isEdit == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
															/>
															<small
																className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																defaultValue={stepTwoData.regNo}
																placeholder="ACN/ABN/Registration No"
																className={`formcontrol required ${
																	isEdit == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
															/>
															<small
																className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																defaultValue={stepTwoData.businessAddress}
																placeholder="Address of Business"
																className={`formcontrol required ${
																	isEdit == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
															/>
															<small
																className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																defaultValue={stepTwoData.email}
																placeholder="Email"
																className={`formcontrol email required ${
																	isEdit == true
																		? 'enableInput'
																		: 'disableInput'
																}`}
															/>
															<small
																className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Email
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
																	defaultValue={stepTwoData.phone}
																	placeholder="Mobile"
																	readOnly
																	className={`inputphonecode formcontroll1 required form-input`}
																/>
																<Form.Control
																	type="text"
																	id="B_Mobile"
																	defaultValue={stepTwoData.phone}

																	readOnly
																	placeholder="Mobile"
																	className={`inputphonenum inputmobile formcontroll2 phone required ${
																		isEdit == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
															</div>
															<small
																className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Valid Mobile
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
												isEdit == true
													? 'disableAccordian'
													: 'enableAccordian'
											}`}
										>
											Bussiness Details
										</Accordion.Header>
										<Accordion.Body>

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
																	className={`mainDrp orangeBorder required formcontrol ${
																		isEdit == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																>
																	<option value="">Company Type</option>
																	<option
																		value="Sole Traders"
																		selected={businessDetailData.companyType === 'Sole Traders'}
																	>
																		Sole Traders
																	</option>
																	<option
																		value="Proprietary Limited (PTY LTD)"
																		selected={businessDetailData.companyType === 'Proprietary Limited (PTY LTD)'}
																	>
																		Proprietary Limited (PTY LTD)
																	</option>
																	<option
																		value="Partnership"
																		selected={businessDetailData.companyType === 'Partnership'}
																	>
																		Partnership
																	</option>
																	<option
																		value="Trustee"
																		selected={businessDetailData.companyType === 'Trustee'}
																	>Trustee
																	</option>
																	<option
																		value="Public Limited company"
																		selected={businessDetailData.companyType === 'Public Limited company'}
																	>
																		Public Limited company
																	</option>
																</Form.Select>
																{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																	id="B_employees"
																	name="businessdetails"
																	placeholder="No. of employees"
																	className={`mainDrp required number orangeBorder formcontrol ${
																		isEdit == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																>
																	<option value="">No of employees</option>
																	<option
																		value="1"
																		selected={businessDetailData.noOfEmployee === '1'}
																	>1
																	</option>
																	<option
																		value="2-9"
																		selected={businessDetailData.noOfEmployee === '2-9'}
																	>2-9
																	</option>
																	<option
																		value="10-19"
																		selected={businessDetailData.noOfEmployee === '10-19'}
																	>10-19
																	</option>
																	<option
																		value="20-50"
																		selected={businessDetailData.noOfEmployee === '20-50'}
																	>20-50
																	</option>
																	<option
																		value="50+"
																		selected={businessDetailData.noOfEmployee === '50+'}
																	>50+
																	</option>
																</Form.Select>
																{/* <Form.Control defaultValue={data2.Business_Fullname} type="text" placeholder="First Name" className="formControlStep2"/> */}
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																	defaultValue={businessDetailData.noDirector}
																	type="text"
																	id="B_directors"
																	name="businessdetails"
																	readOnly
																	placeholder="No. of directors "
																	className={`mainDrp orangeBorder number1 required formcontrol ${
																		isEdit == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter No. of directors
																</small>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message error_message_number1 ms-2">
																	Please Enter Valid number
																</small>
															</Form.Group>
															<small
																onClick={(e) => {
																	setOpenDirectorPopup(true)
																}}
																className={`responsiveFontLarge text-primary error_message error_message_number ms-4 pointer `}>
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
																	defaultValue={businessDetailData.noOfShareholder}
																	type="text"
																	id="B_Shareholders"
																	readOnly
																	name="businessdetails"
																	placeholder="No. of Shareholders"
																	className={`mainDrp orangeBorder number2 required formcontrol ${
																		isEdit == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}

																/>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter No. of Shareholders
																</small>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message error_message_number2 ms-2">
																	Please Enter Valid number
																</small>
															</Form.Group>
															<small
																onClick={(e) => {
																	setShareholderFormPopup(true)
																}}
																className={`responsiveFontLarge text-primary error_message error_message_number ms-4 pointer`
																}>
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
																	// defaultValue={data3.Business_Fullname}
																	// onChange={handleDataStep3} name="Business_Industry_type"
																	className={`mainDrp orangeBorder formcontrol required ${
																		isEdit == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	// className="mainDrp orangeBorder required"
																>
																	<option value="">Industry type</option>
																	<option
																		value="Education industry"
																		selected={businessDetailData.industryType === 'Education industry'}
																	>
																		Education industry
																	</option>
																	<option
																		value="Agricultural industry"
																		selected={businessDetailData.industryType === 'Agricultural industry'}
																	>
																		Agricultural industry
																	</option>
																	<option
																		value="Chemical Industry"
																		selected={businessDetailData.industryType === 'Chemical Industry'}
																	>
																		Chemical Industry
																	</option>
																	<option
																		selected={businessDetailData.industryType === 'Food Industry'}
																		value="Food Industry"
																	>
																		Food Industry
																	</option>
																	<option
																		value="Infrastructure industry"
																		selected={businessDetailData.industryType === 'Infrastructure industry'}
																	>
																		Infrastructure industry
																	</option>
																	<option
																		value="Low technology industry"
																		selected={businessDetailData.industryType === 'Low technology industry'}
																	>
																		Low technology industry
																	</option>
																	<option
																		value="Information industry"
																		selected={businessDetailData.industryType === 'Information industry'}
																	>
																		Information industry
																	</option>
																</Form.Select>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																	defaultValue={businessDetailData.targetMarket}
																	className={`padding_remove_left mainDrp mainDrp4 required  formcontrol ${
																		isEdit == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	id="Business_Target_Market"
																	name="Business_Target_Market"

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
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																		businessDetailData.sendingCurrencyPerYear
																	}
																	type="text"
																	id="B_sending_currency"
																	name="businessdetails"
																	placeholder="Expected remittance volume (AUD)/sending currency per year."
																	className={`mainDrp required number3 orangeBorder formcontrol ${
																		isEdit == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																		businessDetailData.expectedRemittance
																	}
																	type="text"
																	id="Expected_trans"
																	name="businessdetails"
																	placeholder="Expected No of transaction per year. "
																	className={`mainDrp required orangeBorder number4 formcontrol ${
																		isEdit == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																	defaultValue={businessDetailData.website}
																	type="text"
																	id="B_Website"
																	name="businessdetails"
																	placeholder="Website"
																	className={`mainDrp required orangeBorder formcontrol ${
																		isEdit == true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
												isEdit === true
													? 'disableAccordian'
													: 'enableAccordian'
											}`}
										>
											KYC Details
										</Accordion.Header>
										<Accordion.Body>

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
																	className={`orange-border-step3 required mainStep3SelectOrange ${
																		isEdit === true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	id="Indidual_Nationality"
																	name="IndidualNationality"
																>
																	<option value="">Select Country
																	</option>
																	{nationalityOptionList &&
																		nationalityOptionList.map(
																			(nationality, index) => {
																				return (
																					<option key={index}
																									value={
																										nationality.value
																									}

																									selected={stepThreeData.nationality === nationality.value}
																					>
																						{
																							nationality.label
																						}
																					</option>
																				)
																			}
																		)}
																</Form.Select>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																	id="Individual_Housename"
																	defaultValue={
																		stepThreeData.streetName
																	}
																	placeholder="House No & Street Name"
																	className={`formControlStep3 orangeBorder required ${
																		isEdit === true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																	defaultValue={stepThreeData.suburb}
																	placeholder="Suburb/City"
																	className={`formControlStep3 required orangeBorder ${
																		isEdit === true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																<Form.Select
																	className={`orangeBorder  required mainStep3SelectOrange ${
																		isEdit === true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	name="IndidualState"
																	id="Individual_State"
																	value={stepThreeData.stateId}
																>
																	<option value="">State</option>
																	{stateOptionList &&
																		stateOptionList.map((state, index) => {
																			return (
																				<>
																					<option key={index}
																									value={state.id}>
																						{state.name}
																					</option>
																				</>
																			)
																		})}
																</Form.Select>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																	defaultValue={stepThreeData.postalCode}
																	placeholder="Postal / Zip Code"
																	className={`formControlStep3 required orangeBorder number ${
																		isEdit === true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																/>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Enter The Postal / Zip Code
																</small>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message error_message_number ms-2">
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

																	className={`mainStep3SelectOrange required ${
																		isEdit === true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																	// defaultValue={
																	// 	stepThreeData.occupationId
																	// }
																>
																	<option value="">Occupation</option>
																	{occupationOptionList &&
																		occupationOptionList.map(
																			(occupation, index) => {
																				return (
																					<>
																						<option
																							key={index}
																							value={occupation.id}
																							selected={stepThreeData.occupationName === occupation.value}
																						>
																							{occupation.label}
																						</option>
																					</>
																				)
																			}
																		)}
																</Form.Select>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please Select Occupation
																</small>
																{/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
															</Form.Group>
														</Col>
													</Row>

													<Row className="mb-3">
														<Col>
															<label className="normal ms-3 fs-6 mb-2">
																Is Residence of
																({stepOneData?.countryDetail?.countryName})
																{/* {userData?.userkycdetails?.countryName}) */}
															</label>
															<Form.Group
																as={Col}
																className="left-inner-addon input-container "
															>
																<i className="orangeText mainStep3 fa fa-map-marker "></i>
																<Form.Select
																	id="Individual_Residence"

																	className={`mainStep3SelectOrange required ${
																		isEdit === true
																			? 'enableInput'
																			: 'disableInput'
																	}`}
																>
																	<option value="">
																		Is Residence
																		of{' '}({stepOneData?.countryDetail?.countryName})
																	</option>
																	<option value="Yes"
																					selected={stepThreeData.isResidence === true}>Yes
																	</option>
																	<option value="No"
																					selected={stepThreeData.isResidence === false}>No
																	</option>
																</Form.Select>
																<small
																	className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																	Please select If Residence
																	of{' '}({stepOneData?.countryDetail?.label})
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

									<Accordion.Item eventKey="3">
										<Accordion.Header
											className={`formcontrol ${
												isEdit === true
													? 'disableAccordian'
													: 'enableAccordian'
											}`}
										>
											ID Details
										</Accordion.Header>
										<Accordion.Body>
											<Row>
												<Form>
													<Row className="d-flex justify-content-center">
														<Row className="mb-3 ">
															<Col>
																<label
																	className="normal ms-3 fs-6 mb-2">
																	ID Type
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container "
																>
																	<i className="blueText mainStep4 fa fa-id-card "></i>
																	<Form.Select
																		className={`mainStep4Select ${
																			isEdit === true
																				? 'enableInput'
																				: 'disableInput'
																		}`}

																		id="Individual_idtype"
																		name="IndividualIdDetails"
																	>
																		<option value="">ID Type
																		</option>
																		{
																			idTypeOptionList && idTypeOptionList.map((type, index) => {
																				return (
																					<>
																						<option
																							key={index}
																							value={type.id}
																							selected={stepFourData.typeId === type.value}
																						>{
																							type.label}
																						</option>
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
																<label
																	className="normal ms-3 fs-6 mb-2">
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
																			stepFourData.documentNumber
																		}
																		id="Individual_id-number"
																		name="IndividualIdDetails"
																		placeholder="ID Number"
																		className={`formControlStep4 ${
																			isEdit === true
																				? 'enableInput'
																				: 'disableInput'
																		}`}
																	/>
																</Form.Group>
															</Col>
															<Col>
																<label
																	className="normal ms-3 fs-6 mb-2">
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
																			stepFourData.cardNumber
																		}
																		id="Individual_card-details"
																		name="IndividualIdDetails"
																		placeholder="Card Number"
																		className={`formControlStep4 ${
																			isEdit === true
																				? 'enableInput'
																				: 'disableInput'
																		}`}
																	/>
																</Form.Group>
															</Col>
														</Row>

														<Row className="mb-3 respoChildFooter">
															<Col>
																<label
																	className="normal ms-3 fs-6 mb-2">
																	Date of Birth
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container "
																>
																	<i className="blueText mainStep4 fa fa-calendar "></i>
																	<Form.Control
																		type="date"
																		defaultValue={stepFourData.dob}
																		id="Individual_DOB-details"
																		name="IndividualIdDetails"
																		placeholder="Date of Birth"
																		className={`formControlStep4 ${
																			isEdit === true
																				? 'enableInput'
																				: 'disableInput'
																		}`}
																	/>
																</Form.Group>
															</Col>
															<Col>
																<label
																	className="normal ms-3 fs-6 mb-2">
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
																			stepFourData.documentValidity
																		}
																		id="Individual_IdExpire-details"
																		name="IndividualIdDetails"
																		placeholder="Date of ID Expiry"
																		className={`formControlStep4 ${
																			isEdit === true
																				? 'enableInput'
																				: 'disableInput'
																		}`}
																	/>
																</Form.Group>
															</Col>
														</Row>

														<Row className="mb-3">
															<Col>
																<label
																	className="normal ms-3 fs-6 mb-2">
																	ID Issuing Authority
																</label>
																<Form.Group
																	as={Col}
																	className="left-inner-addon input-container "
																>
																	<i className="blueText mainStep4 fas fa-landmark"></i>
																	<Form.Select
																		className={`mainStep4Select ${
																			isEdit === true
																				? 'enableInput'
																				: 'disableInput'
																		}`}
																		id="Authorityname"
																		value={stepFourData.issuingAuthority}

																		name="IndividualIdDetails"
																	>
																		<option value="">
																			ID Issuing Authority
																		</option>
																		{idIssueingAuthorityOptionList &&
																			idIssueingAuthorityOptionList.map((authority, index) => {
																				return (
																					<option key={index}
																									value={authority.value}
																					>
																						{authority.label}
																					</option>
																				)
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

									<Accordion.Item eventKey="4">
										<Accordion.Header
											className={`formcontrol ${
												isEdit === true
													? 'disableAccordian'
													: 'enableAccordian'
											}`}
										>
											Documents
										</Accordion.Header>
										<Accordion.Body>
											<Row className="border-bottom pb-3">
												<div
													className="bolder ms-2 text-black text-center mb-3">
													Uploaded Document ({userIdType.label})
												</div>
												<Col>
													<div className="bolder ms-2 text-black text-center">
														ID Front view
													</div>
													<div className="d-flex">
														{stepFiveData &&
															(
																<>
																	<img
																		src={stepFiveData.frontImage}
																		height="100"
																		width="200"
																		className="hoverView uploadedImage roundedCorner"
																		alt="upload"
																	/>
																</>
															)
														}
													</div>
												</Col>

												<Col
													className={userIdType.label === 'Passport' ? 'd-none' : 'd-block'}>
													<div className="bolder ms-2 text-black text-center">
														ID Back view
													</div>
													<div className="d-flex">
														{stepFiveData &&
															(
																<>
																	<img
																		src={stepFiveData.backImage}
																		height="100"
																		width="200"
																		className="hoverView uploadedImage roundedCorner"
																		alt="upload"
																	/>
																</>
															)
														}
													</div>
												</Col>
											</Row>

											<Row className="border-bottom pb-3">
												<div
													className="bolder ms-2 text-black text-center mb-3">
													Uploaded Additional Document
												</div>

												{businessAdditionalDocument.length > 0 && businessAdditionalDocument.map((item, index) => (
													<Col key={index} className="col-sm-12 col-md-4">
														<div className="medium ms-2 text-black text-center">
															{item.name}
														</div>
														<div className="d-flex justify-content-center">
															{item.url && (
																<img
																	src={item.url}
																	height="100"
																	width="200"
																	className="hoverView uploadedImage roundedCorner"
																	alt="upload"
																/>
															)}
														</div>
													</Col>
												))}

											</Row>
										</Accordion.Body>
									</Accordion.Item>
								</Accordion>
							</div>
							<div
								className={`btn-component  d-flex justify-content-center`}
							>
								<input
									className={`col-lg-3 ml-2 uppercase pointer nextButtonStep1 `}
									type="button"
									value={'Submit'}
									onClick={handleSubmit}
								/>
							</div>
						</Col>

					</Row>

				</Container>
			</section>


			{/* Registration Successfully Modal */}
			<ModalComponent
				Size="sm"
				show={showSuccessModal}
				title11={'User Register Successfully'}
				onHide={() => {
					navigate('/login')
					setShowSuccessModal(false)
					window.scrollTo(0, 0)
				}}
			/>

			<Modal
				show={openDirectorPopup}
				onHide={(e) => {
					setOpenDirectorPopup(false)
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
											name="Business_No_of_directors"
											type="number"
											value={businessDetailData.noDirector}
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
									setOpenDirectorPopup(false)
								}}
							>
								Close
							</Button>
						</Col>
					</Row>
				</Modal.Footer>
				<Row></Row>
			</Modal>

			<Modal
				show={shareholderFormPopup}
				onHide={(e) => {
					setShareholderFormPopup(false)
				}}
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
											value={businessDetailData.noOfShareholder}
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
									setShareholderFormPopup(false)
								}
								}
							>
								Close
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
		</>
	)
}
