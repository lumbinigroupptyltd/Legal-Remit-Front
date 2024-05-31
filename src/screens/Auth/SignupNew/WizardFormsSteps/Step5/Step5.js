import React, { useContext, useEffect, useState } from 'react'
import './Step5.scss'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import '../../../../Helpers/CountryDropdown/flags.css'

import ModalComponent from '../../../../Dashbord/ModalComponent'
import UploadFiles from '../../../../Helpers/UploadFiles/Individual_File_Upload'
import userContext from '../../Signupdata/Usecontext'
import { saveUserDocument } from '../../api'

const validator = require('../../../../../assets/js/validator')

export default function Step5 ({
																 Name,
																 handleId,
																 handleIndividualNextStep,
																 activestepkey
															 }) {

	const handleFormId = () => {
		handleId('File_Uploading')
	}

	const {
		registerId,
		setLoaderValue,
		setStepFiveData,
		userIdType,
		stepFourData
	} = useContext(userContext)


	useEffect(() => {
		handleFormId()
	}, [])


	const [FrontImage, setFrontImage] = useState([])
	const [BackImage, setBackImage] = useState([])

	const [IdTypePopupError, setIdTypePopupError] = useState(false)

	const imageData = (image1, image2) => {
		setFrontImage(image1)
		setBackImage(image2)

		setStepFiveData((prevState) => ({
			...prevState,
			frontImage: image1[0] && URL.createObjectURL(image1[0]),
			backImage: image2[0] && URL.createObjectURL(image2[0])
		}))
	}

	const imageArray = FrontImage.concat(BackImage)

	const prepareFormData = () => {
		const formData = new FormData()

		const requests = []
		for (let i = 0; i < imageArray.length; i++) {
			requests.push({
				fileName: i === 0 ? FrontImage[0].name : BackImage[0].name,
				isFront: i === 0,
				isBack: i === 1,
				typeId: stepFourData.typeId
			})
		}
		formData.append('requests', JSON.stringify(requests))

		imageArray.forEach((image) => {
			formData.append('file', image)
		})

		return formData
	}


	const handleSubmitDocument = async () => {
		try {
			setLoaderValue(true)
			const formData = prepareFormData()
			const response = await saveUserDocument(formData, registerId)
			if (response.data.status === true) {
				setLoaderValue(false)
				handleIndividualNextStep()
			}
		} catch (error) {
			console.log(error, 'Error in saving document')
		} finally {
			setLoaderValue(false)
		}
	}


	const updateStep = (e) => {
		console.log(e)
	}

	return (
		<>
			<section>
				<div className="step5Welcome text-white text-center bolder my-4 py-3">
					Welcome to LegalRemit
				</div>
				<Container fluid>
					<Row>
						<Col className="col-lg-12 p-0">
							<div className="mt-3 pe-4 ps-4">
								<Row id="stepone5in1">
									<Col className="col-lg-12 p-0">
										<div className="text-center">
											<label className="text-center text-black mb-2 responsiveFontLarge">
												Upload Document ({userIdType?.label})
											</label>
										</div>
										<div className="mt-3">
											<Form id="">
												<Row className="d-flex m-auto">
													<Col className="col-lg-12 d-flex">
														<Col className=" pe-2">
															<UploadFiles
																RunningStep={activestepkey}
																imageData={imageData}
																Update_Step={updateStep}
																I_UserIdType={userIdType.label}
															></UploadFiles>
														</Col>
													</Col>
												</Row>
											</Form>
										</div>
									</Col>
								</Row>

								<div
									className={`btn-component  d-flex justify-content-center`}
								>
									<input
										className="col-lg-3 uppercase pointer verifyButton1"
										type="button"
										value="Submit Later"
										onClick={(e) => {
											handleIndividualNextStep(e)
										}}
									/>

									<input
										className={`col-lg-3 ml-2 uppercase pointer nextButtonStep5 `}
										type="button"
										value={'Next'}
										onClick={handleSubmitDocument}
									/>
								</div>
							</div>
						</Col>
					</Row>
				</Container>

				<ModalComponent
					show={IdTypePopupError}
					title11={'Id Details Document Upload Required'}
					onHide={() => setIdTypePopupError(false)}
				/>
			</section>
		</>
	)
}
