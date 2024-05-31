import React, { useContext, useEffect, useState } from 'react'
import './Step1.scss'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import '../../../../Helpers/CountryDropdown/flags.css'
import ReCAPTCHA from 'react-google-recaptcha'
import userContext from '../../Signupdata/Usecontext'
import Select from 'react-select'
import { useLocation } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import warning from '../../../../../assets/images/warning.svg'
import { getCountries } from '../../../Signup/api'
import axios from 'axios'
import { CommonConstants } from '../../../../../Constants/common.constants'


export default function Step1 ({onRoleIdChange, handleIndividualNextStep, handleId, handleCaptcha, handleAcceptTerm}) {

	const {stepOneData, setStepOneData, setCountryOptionList} = useContext(userContext)

	const [countryList, setCountryList] = useState([])
	const [selectedCountryFlag, setSelectedCountryFlag] = useState('')
	const [countrySelected, setCountrySelected] = useState({})

	const [countryDetail, setCountryDetail] = useState({
		countryId: '14',
		countryPhoneCode: '+61',
		countryName: 'Australia',
		countryIso3: 'AUS'
	})

	const getCountryList = async () => {
		try {
			const response = await getCountries()
			if (response.data.status === true) {
				const countryOptions = response.data.data.map((countryName) => ({
					value:
						countryName.id +
						' ' +
						countryName.phoneCode +
						' ' +
						countryName.name +
						' ' +
						countryName.iso3,
					label: countryName.name,
					image: `https://flagcdn.com/16x12/${countryName.iso2.toLowerCase()}.png`,
					iso2: countryName.iso2
				}))
				setCountryList(countryOptions)

				//Store in context for further use
				setCountryOptionList(countryOptions)

				if (response.data.data.length >= 5) {
					setIsSearchable(true)
				} else {
					setIsSearchable(false)
				}
			} else if (response.data.status === false) {
			}
		} catch (err) {
			console.log('Error in getting country list', err)
		}
	}


	useEffect(() => {
			getCountryList()

			setSelectedCountryFlag('au')

			setCountrySelected({
				image: 'https://flagcdn.com/16x12/au.png',
				iso2: 'AU',
				label: 'Australia',
				value: '14 61 Australia AUS'
			})

			handleFormId()

			setStepOneData({
				...stepOneData,
				countryDetail: countryDetail,
				countryId: '14',
				roleId: 'Individual',
				referral: '',
				reCaptcha: ''
			})
		},
		[]
	)


	const handleFormId = () => {
		handleId('Signup_Step1')
	}


	const onCountrySelected = async (e) => {

		setSelectedCountryFlag(e.iso2)
		setCountrySelected(e)

		let arr = e?.value.split(' ')

		await setCountryDetail({
			...countryDetail,
			countryId: arr[0],
			countryPhoneCode: '+' + arr[1],
			countryName: arr[2],
			countryIso3: arr[3]
		})

		setStepOneData({
			...stepOneData,
			countryId: arr[0],
			countryDetail: {
				countryId: arr[0],
				countryPhoneCode: '+' + arr[1],
				countryName: arr[2],
				countryIso3: arr[3]
			}
		})
	}

	const CustomOption = ({innerProps, label, data}) => (
		<div {...innerProps} style={{paddingLeft: '10px', paddingBottom: '8px', paddingTop: '8px'}}>
			<img src={data.image} alt={label} style={{width: '20px', marginRight: '5px'}}/>
			{label}
		</div>
	)


	//User Type
	const [selectedUserType, setSelectedUserType] = useState('Individual')

	const onSelectedRoleChange = async (e) => {
		let drop = document.getElementById('select1').value
		onRoleIdChange(drop)
	}


	const handleSelectRoleIdChange = (event) => {
		setSelectedUserType(event.target.value)
		setStepOneData({...stepOneData, roleId: event.target.value})
		onSelectedRoleChange(event)
	}


	const [reCaptchaValue, setReCaptchaValue] = useState(false)
	const [autoReferralCode, setAutoReferralCode] = useState('')

	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const codeParam = queryParams.get('code')
	// const decodedVerificationCode = codeParam == null ? "" : codeParam?.replace(/\s/g, '+');

	useEffect(() => {
		if (codeParam != null) {
			handleAutoFillReferral()
		}
	}, [])

	// useEffect(() => {
	//   RefralCodeId(autoReferralCode)
	//   if (UpdateStep == 'IndividualFirst') {
	//     if (firststepvalue.referral != '') {
	//       handleAutoGetReferralCode()
	//     } else {
	//       GoNextStep()
	//     }
	//   } else if (UpdateStep == 'BusinessOrAgentFirst') {
	//     if (firststepvalue.referral != '') {
	//       handleAutoGetReferralCode()
	//     } else {
	//       GoNextStepBA()
	//     }
	//   }
	// }, [UpdateStep])


	const [verifyReferralPopUp, setVerifyReferralPopUp] = useState(false)
	const [RefralVerify, setRefralVerify] = useState(false)

	const handleAutoFillReferral = () => {
		let code = codeParam?.replace(/\s/g, '+')
		setStepOneData({...stepOneData, referral: code})
		setAutoReferralCode(code)
	}

	const handleCleanReferral = () => {
		setStepOneData({...stepOneData, referral: ''})
		setAutoReferralCode('')
		setVerifyReferralPopUp(false)
		if (stepOneData.roleId === 'Individual') {
			handleIndividualNextStep()
		} else {
			// GoNextStepBA()
		}
	}

	const handleAutoGetReferralCode = (e) => {
		const formData = new FormData()
		formData.append('code', stepOneData?.referral)
		formData.append('countryId', stepOneData?.countryId)
		const config = {
			method: 'POST',
			url: CommonConstants.BASE_URL + '/checkreferralcodeexistornot',
			headers: {'Content-Type': 'multipart/form-data'},
			data: formData
		}

		axios(config).then((Res) => {
			if (Res.data.status === true) {
				if (stepOneData.roleId === 'Individual') {
					// GoNextStep()
				} else {
					// GoNextStepBA()
				}
			} else {
				setVerifyReferralPopUp(true)
				// StepBlank('')
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	const [isSearchable, setIsSearchable] = useState(false)


	const onReCaptchaChange = (value) => {
		setReCaptchaValue(true)
		handleCaptcha(true)
		setStepOneData({...stepOneData, reCaptcha: value})
	}

	return (
		<>
			<section>
				<div className="bgPurple text-white text-center bolder my-4 py-3 responsiveFontLarge">
					Welcome to LegalRemit
				</div>

				<Container fluid>
					<Row>
						<Col className="col-lg-12 p-0">
							<div className="text-center">
								<label className="text-center text-black mb-2 responsiveFontLarge">
									Registration Details
								</label>
							</div>
							<Form className="mt-3 pe-4 ps-4" id="Signup_Step1">
								<Row className="mb-3">
									<Form.Group
										as={Col}
										className="left-inner-addon input-container required "
										controlId="formGridEmail1"
									>
										{selectedCountryFlag == '' ?
											<div>
												<i className="purpleText mainStep3	fa fa-flag svgNationality"></i>
											</div>
											: ''}
										{selectedCountryFlag != '' ?
											<div className="Flagimgset">
												<img
													src={`https://flagcdn.com/40x30/${selectedCountryFlag.toLowerCase()}.png`}
													alt={selectedCountryFlag}
													style={{width: '20px'}}/>
											</div>
											:
											''
										}
										<Select
											id="country"
											options={countryList}
											className="responsiveFontLarge SelectValueSelect nationality SelectValueSelect1 SelectHoverLabel required pointer"
											value={countrySelected}
											closeMenuOnSelect={true}
											isSearchable={isSearchable}
											onChange={onCountrySelected}
											components={{Option: CustomOption}}
										/>
										<label
											htmlFor="name"
											className="form-label1 "
										>
											Select Country
										</label>
										{/*<small*/}
										{/*  className={`responsiveFontLarge responsiveFontLarge ${countryvalidationerror == 1 ? 'd-block' : 'd-none'} text-danger ms-2 `}>*/}
										{/*  Please select the country*/}
										{/*</small>*/}
									</Form.Group>
								</Row>


								<Row className="mb-3">
									<Form.Group
										as={Col}
										className="left-inner-addon input-container"
									>
										<i className="purpleText main fa fa-user "></i>
										<Form.Select
											onChange={handleSelectRoleIdChange}
											className="responsiveFontLarge purpleBorder form-input"
											value={selectedUserType}
											id="select1"
											name="roleId"
										>
											<option value="Individual">Individual</option>
											<option value="Business">Business</option>
											{/*<option value="Agent">Agent</option>*/}
										</Form.Select>
										<label htmlFor="name" className="form-label1">
											Select User Type
										</label>
									</Form.Group>
								</Row>

								<Row className="mb-3">
									<Form.Group
										as={Col}
										className="left-inner-addon input-container required"
									>
										<i className="purpleText main fa fa-ticket "></i>
										<Form.Control
											type="text"
											required
											disabled={autoReferralCode === '' ? false : true}
											placeholder=""
											value={setStepOneData.referral}
											name="referral"
											className="form-input formControlStep2"
											onChange={(e) => {
												setStepOneData({...stepOneData, referral: e.target.value})
											}}
										/>
										<label htmlFor="name" className="form-label1">
											Referral link / Promocode
										</label>
										<small
											className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
											Please Enter Valid Referral link/Promocode
										</small>
									</Form.Group>
								</Row>
								<Row className="justify-content-center justify-items-center d-flex text-center">
									<div className="d-flex justify-content-center m-4">
										<ReCAPTCHA
											sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
											onChange={onReCaptchaChange}
										/>
									</div>
								</Row>

								<Row>
									<p className="responsiveFontLarge text-center terms">
										This site is protected by reCAPTCHA and the Google{' '}
										<a className="text-underline text-blue">Privacy Policy</a>{' '}
										and{' '}
										<a className="text-underline text-blue">Terms of Service</a>{' '}
										apply. By clicking on next, you agree with our{' '}
										<a className="text-underline text-blue">
											terms and conditions
										</a>{' '}
										and{' '}
										<a className="text-underline text-blue">privacy policy</a>.
									</p>
								</Row>

								<Row>
									<div className="">
										<label
											htmlFor="accept"
											className="d-flex font-10 font-weight-normal justify-content-center align-items-center text-left"
											style={{
												gap: '1rem'
											}}
										>
											<input
												id="accept"
												type="checkbox"
												value={true}
												style={{
													height: '2rem',
													width: '4rem'
												}}

												onChange={(e)=>{
													handleAcceptTerm(e)
												}}
											/>
											<span
												className="responsiveFontLarge text-black "
												style={
													{
														lineHeight: '1.5rem'
													}
												}
											>
												I confirm that I am authorised to provide the personal details presented and I consent to the information being checked with the document issuer or official record holder via third party systems for the purpose of confirming my identity.
											</span>
										</label>

									</div>

								</Row>
							</Form>
						</Col>
					</Row>
				</Container>


				<Modal show={verifyReferralPopUp} onHide={() => {
					setVerifyReferralPopUp(false)
				}} centered>
					<Modal.Header closeButton className="border-bottom">
						<Modal.Title className="purpleText"><img src={warning} alt=""/><span
							className="text-black mt-2">Alert</span></Modal.Title>
					</Modal.Header>
					<Modal.Body className="mt-3">
            <span>
              Referral Code you entered is invalid. Please enter a valid referral link or Code to get a reward. If you continue, the referral reward won’t be redeemed. Are you sure you want to continue without Referral Code?
            </span>
					</Modal.Body>
					<Modal.Footer className="d-flex justify-content-around">
						<Button
							className="bg-transparent text-black purpleBorder col px-3"
							onClick={() => {
								setVerifyReferralPopUp(false)
							}}
						>
							NO
						</Button>
						<Button
							className="purpleBackground border-0 col"
							onClick={() => {
								handleCleanReferral()
							}}
						>
							YES
						</Button>
					</Modal.Footer>
				</Modal>
			</section>
		</>
	)
}
