import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


import './Step6.scss'
import '../../../../Helpers/CountryDropdown/flags.css'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Accordion from 'react-bootstrap/Accordion'
import userContext from '../../Signupdata/Usecontext'
import ModalComponent from '../../../../Dashbord/ModalComponent'
import { updateUser } from '../../api'


export default function Step6 () {

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
		setLoaderValue
	} = useContext(userContext)

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
			console.log(e)
		} finally {
			setLoaderValue(false)
		}
	}

	return (
		<>
			<section>
				<div className="step6Welcome text-white text-center bolder my-4 py-3">
					Welcome to LegalRemit
				</div>
				<Container fluid>
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
																		className=" Editbtn6 text-center pointer"
																	>
																		You can edit these fields from profile section
																		after login.
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
																					defaultValue={stepTwoData.firstName}
																					placeholder="First Name"
																					className={`formcontrol required ${
																						isEdit === true
																							? 'enableInput'
																							: 'disableInput'
																					}`}
																				/>
																				<small
																					className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																						stepTwoData.middleName
																					}
																					placeholder="Middle Name"
																					className={`formcontrol ${
																						isEdit === true
																							? 'enableInput'
																							: 'disableInput'
																					}`}
																				/>
																				<small
																					className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																					defaultValue={stepTwoData.lastName}
																					placeholder="Last Name"
																					className={`formcontrol required ${
																						isEdit === true
																							? 'enableInput'
																							: 'disableInput'
																					}`}
																				/>
																				<small
																					className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
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
																					defaultValue={stepTwoData.email}
																					placeholder="Email"
																					autoComplete="off"
																					// autoComplete="new-email"
																					className={`formcontrol email required ${
																						isEdit === true
																							? 'enableInput'
																							: 'disableInput'
																					}`}
																				/>

																				<small
																					className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																					Please Enter Valid Email
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
																						defaultValue={stepOneData?.countryDetail?.countryPhoneCode}
																						placeholder="Mobile"
																						readOnly
																						className={`inputphonecode formcontroll1 form-input`}
																					/>
																					<Form.Control
																						type="text"
																						id="IndividualMobileNumber"
																						defaultValue={stepTwoData.mobile}
																						readOnly
																						placeholder="Mobile"
																						className={`inputphonenum inputmobile formcontroll2 required phone ${
																							isEdit === true
																								? 'enableInput'
																								: 'disableInput'
																						}`}
																					/>
																				</div>
																				<small
																					className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																					Please Enter Valid Mobile Number
																				</small>
																			</Form.Group>
																		</Col>
																	</Row>

																	{/*<Row className="mb-3 respoChildFooter">*/}
																	{/*	<Col>*/}
																	{/*		<label className="normal ms-3 fs-6 mb-2">*/}
																	{/*			Password*/}
																	{/*		</label>*/}
																	{/*		<Form.Group*/}
																	{/*			as={Col}*/}
																	{/*			className="left-inner-addon input-container p-0"*/}
																	{/*		>*/}
																	{/*			<i className="successText mainone fa fa-lock "></i>*/}
																	{/*			<Form.Control*/}
																	{/*				type="password"*/}
																	{/*				id="IndividualPassword"*/}
																	{/*				defaultValue={stepTwoData.password}*/}
																	{/*				readOnly*/}
																	{/*				placeholder="Password"*/}
																	{/*				className={`formcontrol required password ${*/}
																	{/*					isEdit === true*/}
																	{/*						? 'enableInput'*/}
																	{/*						: 'disableInput'*/}
																	{/*				}`}*/}
																	{/*			/>*/}
																	{/*			<small*/}
																	{/*				className="responsiveFontLarge  d-none text-danger error_message ms-2 error">*/}
																	{/*				Please Enter The Password*/}
																	{/*			</small>*/}
																	{/*			<small*/}
																	{/*				className="responsiveFontLarge  d-none text-danger password_error_message ms-2 error_message">*/}
																	{/*				It is Invalid Password*/}
																	{/*			</small>*/}
																	{/*		</Form.Group>*/}
																	{/*	</Col>*/}
																	{/*	<Col>*/}
																	{/*		<label className="normal ms-3 fs-6 mb-2">*/}
																	{/*			Confirm Password*/}
																	{/*		</label>*/}
																	{/*		<Form.Group*/}
																	{/*			as={Col}*/}
																	{/*			className="left-inner-addon input-container p-0"*/}
																	{/*		>*/}
																	{/*			<i className="successText mainone fa fa-lock "></i>*/}
																	{/*			<Form.Control*/}
																	{/*				type="password"*/}
																	{/*				id="IndividualCPassword"*/}
																	{/*				defaultValue={stepTwoData.confirmPassword}*/}
																	{/*				readOnly*/}
																	{/*				placeholder="Confirm Password"*/}
																	{/*				className={`formcontrol required cpassword ${*/}
																	{/*					isEdit === true*/}
																	{/*						? 'enableInput'*/}
																	{/*						: 'disableInput'*/}
																	{/*				}`}*/}
																	{/*			/>*/}
																	{/*			<small*/}
																	{/*				className="responsiveFontLarge  d-none text-danger error_message ms-2 error">*/}
																	{/*				Please Enter The Confirm Password*/}
																	{/*			</small>*/}
																	{/*			<small*/}
																	{/*				className="responsiveFontLarge  d-none text-danger error_message_matchpass ms-2 error_message">*/}
																	{/*				Password and confirm password are*/}
																	{/*				not*/}
																	{/*				matching*/}
																	{/*			</small>*/}
																	{/*		</Form.Group>*/}
																	{/*	</Col>*/}
																	{/*</Row>*/}
																</Row>
															</Form>
														</Accordion.Body>
													</Accordion.Item>

													<Accordion.Item eventKey="1" id="accordianOne">
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
																											selected={stepThreeData.occupationId === occupation.value}
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
																					of{' '}({stepOneData?.countryDetail?.countryName})
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

													<Accordion.Item eventKey="3">
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
														</Accordion.Body>
													</Accordion.Item>
												</Accordion>
											</div>
										</Col>
									</Row>
								</Row>

								<div
									className={`btn-component  d-flex justify-content-center`}
								>
									<input
										className={`col-lg-3 ml-2 uppercase pointer nextButtonStep6 `}
										type="button"
										value={'Submit'}
										onClick={handleSubmit}
									/>
								</div>
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
		</>
	)
}
