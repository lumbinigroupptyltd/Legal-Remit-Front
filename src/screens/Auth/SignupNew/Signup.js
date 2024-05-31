import React, { lazy, Suspense, useEffect, useState } from 'react'
import Footer from '../../Home/Footer/Footer'
import NavBar from '../../Home/Navbar/Navbar'
import { Container } from 'react-bootstrap'
import './Signup.scss'
import first1 from '../../../assets/images/purpleVector.svg'
import second2 from '../../../assets/images/greenVector.svg'
import third3 from '../../../assets/images/orangeVector.svg'
import fourth4 from '../../../assets/images/blueVector.svg'
import fifth5 from '../../../assets/images/YellowVector.svg'
import sixth6 from '../../../assets/images/UploadDocument.svg'
import final7 from '../../../assets/images/SummaryVector.svg'

import Step1 from './WizardFormsSteps/Step1/Step1'
import Step7 from './WizardFormsSteps/Step7/Step7'
import userContext from './Signupdata/Usecontext'
import { useNavigate, useLocation } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Loader from '../../Loader/Loader'

const Step2 = lazy(() => import('./WizardFormsSteps/Step2/Step2'))
const Step3 = lazy(() => import('./WizardFormsSteps/Step3/Step3'))
const Step4 = lazy(() => import('./WizardFormsSteps/Step4/Step4'))
const Step5 = lazy(() => import('./WizardFormsSteps/Step5/Step5'))
const Step6 = lazy(() => import('./WizardFormsSteps/Step6/Step6'))

//Business Components
const BusinessStep2 = lazy(() => import('./WizardFormsSteps/Business/Step2/Step2'))
const BusinessStep3 = lazy(() => import('./WizardFormsSteps/Business/Step3/Step3'))
const BusinessStep4 = lazy(() => import('./WizardFormsSteps/Business/Step4/Step4'))
const BusinessStep5 = lazy(() => import('./WizardFormsSteps/Business/Step5/Step5'))
const BusinessStep6 = lazy(() => import('./WizardFormsSteps/Business/Step6/Step6'))
const BusinessStep7 = lazy(() => import('./WizardFormsSteps/Business/Step7/Step7'))


const validator = require('../../../assets/js/validator')

const firstComponent = () => {
	return (<div>
		<Step1></Step1>
	</div>)
}
const secondComponent = () => {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<Step2/>
			</Suspense>
		</div>
	)
}
const thirdComponent = () => {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<Step3></Step3>
			</Suspense>
		</div>)
}
const fourthComponent = () => {
	return (<div>
		<Suspense fallback={<div>Loading...</div>}>
			<Step4></Step4>
		</Suspense>
	</div>)
}
const fifthComponent = () => {
	return (<div>
		<Suspense fallback={<div>Loading...</div>}>
			<Step5></Step5>
		</Suspense>
	</div>)
}
const sixthComponent = () => {
	return (<div>
		<Suspense fallback={<div>Loading...</div>}>
			<Step6></Step6>
		</Suspense>
	</div>)
}
const finalComponent = () => {
	return (<div>
		<Step7></Step7>
	</div>)
}

const secondBusinessComponent = () => {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<BusinessStep2/>
			</Suspense>
		</div>
	)
}
const thirdBusinessComponent = () => {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<BusinessStep3></BusinessStep3>
			</Suspense>
		</div>)
}
const fourthBusinessComponent = () => {
	return (<div>
		<Suspense fallback={<div>Loading...</div>}>
			<BusinessStep4></BusinessStep4>
		</Suspense>
	</div>)
}
const fifthBusinessComponent = () => {
	return (<div>
		<Suspense fallback={<div>Loading...</div>}>
			<BusinessStep5></BusinessStep5>
		</Suspense>
	</div>)
}
const sixthBusinessComponent = () => {
	return (<div>
		<Suspense fallback={<div>Loading...</div>}>
			<BusinessStep6></BusinessStep6>
		</Suspense>
	</div>)
}
const finalBusinessComponent = () => {
	return (<div>
		<BusinessStep7></BusinessStep7>
	</div>)
}

const imageFirstComponent = () => {
	return <img src={first1} alt=""/>
}
const imageSecondComponent = () => {
	return <img src={second2} alt=""/>
}
const imageThirdComponent = () => {
	return <img src={third3} alt="" id="3rdimage"/>
}
const imageFourthComponent = () => {
	return <img src={fourth4} alt={'logo'}/>
}
const imageFifthComponent = () => {
	return <img src={fifth5} alt={'logo'}/>
}
const imageSixthComponent = () => {
	return <img src={sixth6} alt={'logo'}/>
}
const imageFinalComponent = () => {
	return <img src={final7} alt={'logo'}/>
}

export default function Signup () {
	const navigate = useNavigate()

	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const codeParam = queryParams.get('code')

	const [loaderValue, setLoaderValue] = useState(false)

	//Constants that holds the api response data in each steps

	const [countryOptionList, setCountryOptionList] = useState([])
	const [stateOptionList, setStateOptionList] = useState([])
	const [nationalityOptionList, setNationalityOptionList] = useState([])
	const [idTypeOptionList, setIdTypeOptionList] = useState([])
	const [idIssueingAuthorityOptionList, setIdIssueingAuthorityOptionList] = useState([])
	const [occupationOptionList, setOccupationOptionList] = useState([])

	const [stepOneData, setStepOneData] = useState({})
	const [stepTwoData, setStepTwoData] = useState({})
	const [stepThreeData, setStepThreeData] = useState({})
	const [stepFourData, setStepFourData] = useState({})
	const [stepFiveData, setStepFiveData] = useState({})

	const [userIdType, setUserIdType] = useState('')
	const [registerId, setRegisterId] = useState('')
	const [businessDetailId, setBusinessDetailId] = useState('')
	const [businessDetailData, setBusinessDetailData] = useState('')
	const [userKycId, setUserKycId] = useState('')
	const [userDocumentId, setUserDocumentId] = useState('')
	const [businessAdditionalDocument, setBusinessAdditionalDocument] = useState([])
	const [businessDirectorDetail, setBusinessDirectorDetail] = useState([])
	const [businessShareholderDetail, setBusinessShareholderDetail] = useState([])

	const [nationalityId, setNationalityId] = useState('')

	const [selectedUserType, setSelectedUserType] = useState('Individual')

	const [isTermAccepted, setIsTermAccepted] = useState(false)

	const [steps1, setSteps1] = useState([
		{
			key: 'firstStep',
			label: 'Registration',
			icon: first1,
			isDone: true,
			isRemain: true,
			component: firstComponent,
			components: imageFirstComponent
		}, {
			key: 'secondStep',
			label: 'User Details',
			icon: second2,
			isDone: false,
			isRemain: false,
			component: secondComponent,
			components: imageSecondComponent
		}, {
			key: 'thirdStep',
			label: 'KYC Details',
			icon: fourth4,
			isDone: false,
			isRemain: false,
			component: fourthComponent,
			components: imageThirdComponent
		}, {
			key: 'fourthStep',
			label: 'ID Details ',
			icon: fifth5,
			isDone: false,
			isRemain: false,
			component: fifthComponent,
			components: imageFourthComponent
		}, {
			key: 'fifthStep',
			label: 'Upload Document ',
			icon: sixth6,
			isDone: false,
			isRemain: false,
			component: sixthComponent,
			components: imageFifthComponent
		}, {
			key: 'sixthStep',
			label: 'Summary',
			icon: final7,
			isDone: false,
			isRemain: false,
			component: finalComponent,
			components: imageSixthComponent
		}])

	const [steps, setSteps] = useState([
		{
			key: 'firstStep',
			label: 'Registration',
			icon: first1,
			isDone: true,
			isRemain: true,
			component: firstComponent,
			components: imageFirstComponent
		}, {
			key: 'secondStep',
			label: 'User Details',
			icon: second2,
			isDone: false,
			isRemain: false,
			component: secondBusinessComponent,
			components: imageSecondComponent
		}, {
			key: 'thirdStep',
			label: 'Business Details',
			icon: third3,
			isDone: false,
			isRemain: false,
			component: thirdBusinessComponent,
			components: imageThirdComponent
		}, {
			key: 'fourthStep',
			label: 'KYC Details',
			icon: fourth4,
			isDone: false,
			isRemain: false,
			component: fourthBusinessComponent,
			components: imageFourthComponent
		}, {
			key: 'fifthStep',
			label: 'ID Details ',
			icon: fifth5,
			isDone: false,
			isRemain: false,
			component: fifthBusinessComponent,
			components: imageFifthComponent
		}, {
			key: 'sixthStep',
			label: 'Upload Document ',
			icon: sixth6,
			isDone: false,
			isRemain: false,
			component: sixthBusinessComponent,
			components: imageSixthComponent
		}, {
			key: 'finalStep',
			label: 'Summary',
			icon: final7,
			isDone: false,
			isRemain: false,
			component: fifthBusinessComponent,
			components: imageFinalComponent
		}])

	const [activeStep1, setActiveStep1] = useState(steps1[0])
	const [activeStep, setActiveStep] = useState(steps[0])

	const [isCaptchaChecked, setIsCaptchaChecked] = useState(false)

	const handleCaptcha = (value) => {
		setIsCaptchaChecked(value)
	}


	useEffect(() => {
		if (activeStep1.key === 'firstStep' && selectedUserType === 'Individual') {
			document.getElementById('sixxsteps').style.display = 'block'
			document.getElementById(activeStep1.key).style.display = 'block'
			document.getElementById('sevennstep').style.display = 'none'
		}
		if ((activeStep.key === 'firstStep' && selectedUserType === 'Business')) {
			document.getElementById('sixxsteps').style.display = 'none'
			document.getElementById(activeStep.key).style.display = 'block'
			document.getElementById('sevennstep').style.display = 'block'
		}
	}, [selectedUserType])


	const onRoleIdChange = (e) => {
		setSelectedUserType(e)
	}

	const [handleId, setHandleId] = useState('')

	const handleFormId = (formId) => {
		setHandleId(formId)
	}


	const handleNextStep = async (props, form_id) => {
		handleFormId()

		validator.error_input_validation(handleId)
		if (validator.error_input_validation(handleId)) {

			window.scrollTo(0, 0)

			if (selectedUserType === 'Individual') {
				document.getElementById('sixxsteps').style.display = 'block'
				document.getElementById('sevennstep').style.display = 'none'

				document.getElementById(activeStep1.key).style.display = 'none'
				const index = steps1.findIndex((x) => x.key === activeStep1.key)
				setSteps1((prevStep) => prevStep.map((x) => {
					if (x.key === steps1[index + 1].key) {
						x.isDone = true
						x.isRemain = true
					} else {
						if (x.isDone === true) {
							x.isDone = true
							x.isRemain = true
						} else {
							x.isDone = false
							x.isRemain = false
						}
					}
					return x
				}))
				setActiveStep1(steps1[index + 1])
				document.getElementById(steps1[index + 1].key).style.display = 'block'
			} else {
				document.getElementById('sixxsteps').style.display = 'none'
				document.getElementById('sevennstep').style.display = 'block'

				document.getElementById(activeStep.key).style.display = 'none'
				const index = steps.findIndex((x) => x.key === activeStep.key)
				setSteps((prevStep) => prevStep.map((x) => {
					if (x.key === steps[index + 1].key) {
						x.isDone = true
						x.isRemain = true
					} else {
						if (x.isDone === true) {
							x.isDone = true
							x.isRemain = true
						} else {
							x.isDone = false
							x.isRemain = false
						}
					}
					return x
				}))
				setActiveStep(steps[index + 1])
				document.getElementById(steps[index + 1].key).style.display = 'block'
			}
		}
	}

	const handleAcceptTerm = (e) => {
		setIsTermAccepted(e.target.checked)
	}

	return (<>
		<section className="mainLoginSection1">
			{loaderValue === true ? <Loader/> : ''}

			<NavBar></NavBar>
			<Container>

				<div className="mainLoginBox mt-5 mb-5">
					<div className="box row d-flex p-0 m-0 ">
						<div className="steps">
							{/* /1/ */}
							<span id="sixxsteps">
                  <ul
										className="nav d-flex justify-content-evenly sixsteps stepsSign"
										id="sixsteps"
									>
                    {steps1.map((step, j) => {
											return (<li
												key={j}
												className={`${activeStep1.key === step.key ? step.key + 'active' : step.isDone ? step.key + 'active' : ''} ${step.isDone ? 'done' : ''} ${step.isRemain ? '' : step.key + 'remain'}`}
												// onClick={() => handleStepClick(j, step.key)}
											>
												<div className="step1"></div>
												<p className="stepLabel text-black mt-2">
													{step.label}
												</p>
											</li>)
										})}
                  </ul>
                </span>

							{/*/2/ */}
							<span id="sevennstep">
                  <ul
										className="nav d-flex justify-content-evenly stepsSign sevennstep"
										id="sevennstep"
									>
                    {steps.map((step, i) => {
											return (
												<li
												key={i}
												className={`${activeStep.key === step.key ? step.key + 'active' : step.isDone ? step.key + 'active' : ''} ${step.isDone ? 'done' : ''} ${step.isRemain ? '' : step.key + 'remain'}`}
												// onClick={() => handleStepClick1(i, step.key)}
											>
												<div className="step3" id="sevensteplogo"></div>
												<p className="stepLabel text-black mt-2">
													{step.label}
												</p>
											</li>)
										})}
                  </ul>
                </span>
						</div>

						<Row className="secondBlock ms-0">
							<div className="col-lg-5 firstBlock">
								{/* <div className="bg-alert text-black" onClick={usestateClick}>ma</div> */}

								<div className="row mt-5 mb-5">
									<div className="col-lg-12 my-5 py-5 d-flex m-auto justify-content-center">
										{selectedUserType === 'Individual' ? activeStep1.components() : activeStep.components()}
									</div>
								</div>
							</div>
							<div className="col-lg-7 p-0 pb-5">
								{/* <div className="step-component">{activeStep.component()}</div> */}
								<div className="step-component">
									<userContext.Provider
										value={{
											countryOptionList,
											setCountryOptionList,
											stateOptionList,
											setStateOptionList,
											nationalityOptionList,
											setNationalityOptionList,
											idTypeOptionList,
											setIdTypeOptionList,
											idIssueingAuthorityOptionList,
											setIdIssueingAuthorityOptionList,
											occupationOptionList,
											setOccupationOptionList,


											stepOneData,
											setStepOneData,
											stepTwoData,
											setStepTwoData,
											stepThreeData,
											setStepThreeData,
											stepFourData,
											setStepFourData,
											stepFiveData,
											setStepFiveData,
											setLoaderValue,
											registerId,
											setRegisterId,
											userKycId,
											setUserKycId,
											nationalityId,
											setNationalityId,
											userDocumentId,
											setUserDocumentId,
											setBusinessDetailId,
											businessDetailId,
											businessDetailData,
											setBusinessDetailData,
											businessAdditionalDocument,
											setBusinessAdditionalDocument,
											userIdType,
											setUserIdType,
											businessDirectorDetail,
											setBusinessDirectorDetail,
											businessShareholderDetail,
											setBusinessShareholderDetail
										}}
									>
										<div id="firstStep" style={{display: 'none'}}>
											<Step1
												onRoleIdChange={onRoleIdChange}
												handleIndividualNextStep={handleNextStep}
												handleId={handleFormId}
												handleCaptcha={handleCaptcha}
												handleAcceptTerm={handleAcceptTerm}
											></Step1>
										</div>

										{selectedUserType === 'Individual' ? (
												<>


													<div>
														{/* Other JSX */}
														<Suspense fallback={<div>Loading...</div>}>
															<div id="secondStep" style={{display: 'none'}}>
																<Step2
																	Name={selectedUserType}
																	handleIndividualNextStep={handleNextStep}
																	handleId={handleFormId}
																/>
															</div>
														</Suspense>
													</div>
													<Suspense fallback={<div>Loading...</div>}>
														<div id="thirdStep" style={{display: 'none'}}>
															<Step3
																Name={selectedUserType}
																handleId={handleFormId}
																handleIndividualNextStep={handleNextStep}
															></Step3>
														</div>
													</Suspense>

													<div>
														<Suspense fallback={<div>Loading...</div>}>
															<div id="fourthStep" style={{display: 'none'}}>
																<Step4
																	Name={selectedUserType}
																	handleId={handleFormId}
																	handleIndividualNextStep={handleNextStep}
																	activeStepKey={activeStep1.key}
																></Step4>
															</div>
														</Suspense>
													</div>

													<div>
														<Suspense fallback={<div>Loading...</div>}>
															<div id="fifthStep" style={{display: 'none'}}>
																<Step5
																	Name={selectedUserType}
																	handleId={handleFormId}
																	handleIndividualNextStep={handleNextStep}
																	activeStepKey={activeStep1.key}
																></Step5>
															</div>
														</Suspense>
													</div>

													<div>
														<Suspense fallback={<div>Loading...</div>}>
															<div id="sixthStep" style={{display: 'none'}}>
																<Step6
																	Name={selectedUserType}
																	handleId={handleFormId}
																	handleIndividualNextStep={handleNextStep}
																	activeStepKey={activeStep1.key}
																></Step6>
															</div>
														</Suspense>
													</div>
												</>
											) :
											<>
												<div>
													{/* Other JSX */}
													<Suspense fallback={<div>Loading...</div>}>
														<div id="secondStep" style={{display: 'none'}}>
															<BusinessStep2
																Name={selectedUserType}
																handleIndividualNextStep={handleNextStep}
																handleId={handleFormId}
															/>
														</div>
													</Suspense>
												</div>
												<Suspense fallback={<div>Loading...</div>}>
													<div id="thirdStep" style={{display: 'none'}}>
														<BusinessStep3
															Name={selectedUserType}
															handleId={handleFormId}
															handleIndividualNextStep={handleNextStep}
															activeStepKey={activeStep.key}
														></BusinessStep3>
													</div>
												</Suspense>

												<div>
													<Suspense fallback={<div>Loading...</div>}>
														<div id="fourthStep" style={{display: 'none'}}>
															<BusinessStep4
																Name={selectedUserType}
																handleId={handleFormId}
																handleIndividualNextStep={handleNextStep}
																activeStepKey={activeStep.key}
															></BusinessStep4>
														</div>
													</Suspense>
												</div>

												<div>
													<Suspense fallback={<div>Loading...</div>}>
														<div id="fifthStep" style={{display: 'none'}}>
															<BusinessStep5
																Name={selectedUserType}
																handleId={handleFormId}
																handleIndividualNextStep={handleNextStep}
																activeStepKey={activeStep.key}
															></BusinessStep5>
														</div>
													</Suspense>
												</div>

												<div>
													<Suspense fallback={<div>Loading...</div>}>
														<div id="sixthStep" style={{display: 'none'}}>
															<BusinessStep6
																Name={selectedUserType}
																handleId={handleFormId}
																handleIndividualNextStep={handleNextStep}
																activeStepKey={activeStep.key}
															></BusinessStep6>
														</div>
													</Suspense>
												</div>

												<div>
													<Suspense fallback={<div>Loading...</div>}>
														<div id="finalStep" style={{display: 'none'}}>
															<BusinessStep7
																Name={selectedUserType}
																handleId={handleFormId}
																handleIndividualNextStep={handleNextStep}
																activeStepKey={activeStep.key}
															></BusinessStep7>
														</div>
													</Suspense>
												</div>
											</>
										}

										{activeStep1.key === 'firstStep' && selectedUserType === 'Individual' && (
											<div
												className={`btn-component ${selectedUserType === 'Individual' ? activeStep1.key === 'firstStep' ? 'd-flex justify-content-center' : 'justify-content-end' : activeStep.key === 'firstStep' ? 'd-flex justify-content-center' : 'justify-content-end'} `}
											>
												<input
													disabled={!isCaptchaChecked || !isTermAccepted}
													className={`col-lg-3 uppercase pointer nextButtonStep1 `}
													type="button"
													value={steps1[steps1.length - 1].key !== activeStep1.key ? 'Next' : 'Submit'}
													onClick={handleNextStep}
												/>
											</div>
										)}

										{activeStep.key === 'firstStep' && selectedUserType === 'Business' && (
											<div
												className={`btn-component ${selectedUserType === 'Individual' ? activeStep1.key === 'firstStep' ? 'd-flex justify-content-center' : 'justify-content-end' : activeStep.key === 'firstStep' ? 'd-flex justify-content-center' : 'justify-content-end'} `}
											>
												<input
													disabled={!isCaptchaChecked || !isTermAccepted}
													className={`col-lg-3 uppercase pointer nextButtonStep1 `}
													type="button"
													value={steps1[steps1.length - 1].key !== activeStep1.key ? 'Next' : 'Submit'}
													onClick={handleNextStep}
												/>
											</div>
										)}
									</userContext.Provider>
								</div>
							</div>
						</Row>
					</div>
				</div>
			</Container>
		</section>
		<Footer></Footer>
	</>)
}

