import React, { useContext, useEffect, useState } from 'react'
import './Step6.scss'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import '../../../../../Helpers/CountryDropdown/flags.css'

import ModalComponent from '../../../../../Dashbord/ModalComponent'
import userContext from '../../../Signupdata/Usecontext'
import BusinessUploadFiles from '../../../../../Helpers/UploadFiles/Business_File_Uploading'
import { CommonConstants } from '../../../../../../Constants/common.constants'
import axios from 'axios'
import { saveUserDocument } from '../../../api'

const validator = require('../../../../../../assets/js/validator')

export default function Step6 ({
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
		stepOneData,
		userIdType,
		setBusinessAdditionalDocument,
		stepFourData
	} = useContext(userContext)


	useEffect(() => {
		handleFormId()
	}, [])


	const [FrontImage, setFrontImage] = useState([])
	const [BackImage, setBackImage] = useState([])
	const [AdditionalIdTypePopupError, setAdditionalIdTypePopupError] = useState(false)

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


	const [additionalDocumentArray, setAdditionalDocumentArray] = useState([])

	const [Upload_Document, setUpload_Document] = useState(false)

	const handleAdditionalDocument = (imagee) => {
		setAdditionalDocumentArray(imagee)
	}

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

	const prepareAdditionalFormData = () => {

		const documentsWithImages = additionalDocumentArray.filter((doc) => doc.ImageArray.length > 0)
		// debugger
		if (documentsWithImages.length >= 2) {
			const formData = new FormData()
			const requests = []
			const localFileUrl = []
			additionalDocumentArray.forEach((item) => {
				if (item.ImageArray.length > 0) {
					if (item.typeName == 'Other Documents') {
						for (let i = 0; i < item.ImageFileArray.length; i++) {
							requests.push({
								fileName: item.ImageFileArray[i].name,
								type: item.OtherDocumnetName
							})

							formData.append('file', item.ImageFileArray[i])

							localFileUrl.push({
								name: item.OtherDocumnetName,
								url: URL.createObjectURL(item.ImageFileArray[i])
							})
						}
					} else {
						for (let i = 0; i < item.ImageFileArray.length; i++) {
							requests.push({
								fileName: item.ImageFileArray[i].name,
								documentTypeId: item.id
							})
							formData.append('file', item.ImageFileArray[i])

							localFileUrl.push({
								name: item.typeName,
								url: URL.createObjectURL(item.ImageFileArray[i])
							})
						}
					}

					setBusinessAdditionalDocument(localFileUrl)
				}
			})
			formData.append('requests', JSON.stringify(requests))
			return formData
		} else {
			setAdditionalIdTypePopupError(true)
			setLoaderValue(false)
		}

	}


	const handleSubmitDocument = async () => {
		try {
			setLoaderValue(true)
			const formData = prepareFormData()
			const response = await saveUserDocument(formData, registerId)
			if (response.data.status === true) {
				await handleAdditionalSubmitDocument()
			}
		} catch (error) {
			console.log(error, 'Error in saving document')
		} finally {
		}
	}


	const handleAdditionalSubmitDocument = async () => {
		setLoaderValue(true)
		const config = {
			method: 'POST',
			url: CommonConstants.BASE_URL + '/userfiles/uploadbusinessdocuments/' + registerId,
			headers: {'Content-Type': 'multipart/form-data'},
			data: prepareAdditionalFormData()
		}

		axios(config)
			.then(function (response) {
				if (response.data.status === true) {
					setLoaderValue(false)
					handleIndividualNextStep()
					setUpload_Document(true)
				}
			})
			.catch(function (error) {
				console.log(error)
			}).finally(() => {
			setLoaderValue(false)
		})
	}


	const updateStep = (e) => {
		console.log(e)
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

							<div className="mt-3">
								<Form id="">
									<Row className="d-flex m-auto">
										<Col className="col-lg-12 d-flex">
											<Col className=" pe-2">
												<BusinessUploadFiles
													imageData={imageData}
													IdType={userIdType.label}
													CountryId={stepOneData.countryId}
													UploadDocument={Upload_Document}
													Update_Step={updateStep}
													AdditionalDocument={handleAdditionalDocument}
												></BusinessUploadFiles>
											</Col>
										</Col>
									</Row>
								</Form>
							</div>

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
									className={`col-lg-3 ml-2 uppercase pointer nextButtonStep6 `}
									type="button"
									value={'Next'}
									onClick={handleSubmitDocument}
								/>
							</div>
						</Col>
					</Row>
				</Container>

				<ModalComponent
					show={IdTypePopupError}
					title11={'Id Details Document Upload Required'}
					onHide={() => setIdTypePopupError(false)}
				/>

				<ModalComponent
					show={AdditionalIdTypePopupError}
					title11={'Atleast 2 Document Details Upload Required'}
					onHide={() => setAdditionalIdTypePopupError(false)}
				/>
			</section>
		</>
	)
}
