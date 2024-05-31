import React, { useEffect, useState } from 'react'
import './ProfilePage.scss'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import NavBar from '../Home/Navbar/Navbar'
import Footer from '../Home/Footer/Footer'
import PdfLogo from '../../assets/images/pdf.png'
import { CommonConstants } from '../../Constants/common.constants'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import ModalComponent from '../Dashbord/ModalComponent'
import KYCuploadDocuments from '../Helpers/UploadDocumentFilePopupProfile/KYCuploadDocuments'
import OtheruploadDocuments from '../Helpers/UploadDocumentFilePopupProfile/OtherDocumentUpload'
import Loader from '../Loader/Loader'
import bin from '../../assets/images/deletBg.svg'
import { useLocation } from 'react-router-dom'
import { saveUserDocument } from '../Auth/SignupNew/api'

const validator = require('../../assets/js/validator')

export default function ProfilePage () {
	const location = useLocation()
	const [selectedImages, setSelectedImages] = useState([])
	const [fullName, setFullName] = useState('')
	const [getState, setgetState] = useState()
	const [selectedStateId, setselectedStateId] = useState()
	const [isEditing, setIsEditing] = useState(false)
	const [isEditing2, setIsEditing2] = useState(false)
	const [isEditing3, setIsEditing3] = useState(false)
	const [isEditing4, setIsEditing4] = useState(false)
	const [EditEnable, setEditEnable] = useState(false)
	const [Occupation, setOccupation] = useState([])
	const [IdAuthority, setIdAuthority] = useState([])
	const [nationality, setNationality] = useState()
	const [nationalityArray, setNationalityArray] = useState()
	const [businessDetailsId, setBusinessDetailsId] = useState()
	const [BusinessDetailsUserId, setBusinessDetailsUserId] = useState()
	const [countryId, setCountryId] = useState()
	const [IdAuthoritySubtype, setIdAuthoritySubtype] = useState([])
	const [userDetailsId, setUserDetailsId] = useState()
	const [userDetailsRollId, setUserDetailsRollId] = useState()
	const [userDetailsCountryId, setUserDetailsCountryId] = useState()
	const [kycdetilsID, setKycDetailsId] = useState()
	const [kycDetailsUserId, setKycDetailsUserId] = useState()
	const [kycDetailsCountryId, setKycDetailscountryId] = useState()
	const [idDetailsId, setIddetailsId] = useState()
	const [loadervalue, setloadervalue] = useState(false)
	const [idDetilsUserId, setIdDetailsUserId] = useState()
	const [showFileInput, setShowFileInput] = useState(false)
	const [selectedFileName, setSelectedFileName] = useState('')
	const [UploadImageArray, setUploadImageArray] = useState([])
	const [FormPopup, setFormPopup] = useState(false)
	const [SendMoneyDetailsMessage, setSendMoneyDetailsMessage] = useState('')
	const [VerifyRefralPOPUP, setVerifyRefralPOPUP] = useState(false)
	const [ShareholderFormPopup, setShareholderFormPopup] = useState(false)
	const [UserCurrency, setUserCurrency] = useState('')

	const [userData, setUserData] = useState({
		id: null,
		roleId: null,
		countryId: null,
		refCodeId: '',
		fName: '',
		mName: '',
		lName: '',
		phone: '',
		isPhoneVerified: null,
		phoneVerifiedAt: null,
		email: '',
		businessName: '',
		digitalVerifiedLink: null,
		digitalVerifiedTransactionId: null,
		regNo: '',
		businessAddress: '',
		isEmailVerified: null,
		emailVerifiedAt: null,
		password: '',
		isDeleted: null,
		isOCRVerfiedId: null,
		createdAt: '',
		updatedAt: '',
		userkycdetails: {
			id: null,
			userId: null,
			streetName: '',
			countryId: null,
			stateId: null,
			nationality: '',
			suburb: '',
			postalCode: '',
			verified: null,
			occupationId: 0,
			occupationName: '',
			isResidence: null,
			createdAt: '',
			kycStatus: ''
		},
		iddetails: {
			id: null,
			userId: null,
			typeId: '',
			documentNumber: '',
			cardNumber: '',
			dob: '',
			documentValidity: '',
			issuingAuthority: '',
			createdAt: '',
			updatedAt: ''
		},
		idDocuments: [
			{
				// fileName: "",
				// filePath: ""

				id: null,
				userId: null,
				idDetailsId: null,
				typeId: null,
				filePath: '',
				filePathBack: null
			}
		],
		businessDetails: {
			id: '',
			userId: '',
			companyName: '',
			abn: '',
			typeBusiness: '',
			industryType: '',
			noDirector: '',
			noShareholder: '',
			noEmployee: '',
			businessAddress: '',
			targetBusiness: '',
			website: '',
			expectedRemittance: '',
			volumeYear: '',
			noOfTranscation: '',
			countryOfBusiness: ''
		}
	})
	const [UpdateuserData, setUpdateuserData] = useState({
		id: null,
		roleId: null,
		countryId: null,
		refCodeId: '',
		fName: '',
		mName: null,
		lName: '',
		phone: '',
		isPhoneVerified: null,
		phoneVerifiedAt: null,
		email: '',
		businessName: '',
		digitalVerifiedLink: null,
		digitalVerifiedTransactionId: null,
		regNo: '',
		businessAddress: '',
		isEmailVerified: null,
		emailVerifiedAt: null,
		password: '',
		isDeleted: null,
		isOCRVerfiedId: null,
		createdAt: '',
		updatedAt: '',
		userkycdetails: {
			id: null,
			userId: null,
			streetName: '',
			countryId: null,
			stateId: null,
			nationality: '',
			suburb: '',
			postalCode: '',
			verified: null,
			occupationId: 0,
			occupationName: '',
			isResidence: null,
			createdAt: '',
			kycStatus: ''
		},
		iddetails: {
			id: null,
			userId: null,
			typeId: '',
			documentNumber: '',
			cardNumber: '',
			dob: '',
			documentValidity: '',
			issuingAuthority: '',
			createdAt: '',
			updatedAt: ''
		},
		idDocuments: [
			{
				id: null,
				userId: null,
				idDetailsId: null,
				typeId: null,
				filePath: '',
				filePathBack: null
			}
		],
		businessDetails: {
			id: '',
			userId: '',
			companyName: '',
			abn: '',
			typeBusiness: '',
			industryType: '',
			noDirector: '',
			noShareholder: '',
			noEmployee: '',
			businessAddress: '',
			targetBusiness: '',
			website: '',
			expectedRemittance: '',
			volumeYear: '',
			noOfTranscation: '',
			countryOfBusiness: ''
		}
	})
	const handleAddDocument = () => {
		setShowFileInput(true)
	}


	function deleteHandlerFront (image, index) {
		setSelectedImages(selectedImages.filter((e) => e !== image))
		OtherSelectedImages.splice(index, 1)
		URL.revokeObjectURL(image)
	}

	const [OtherSelectedImages, setOtherSelectedImages] = useState([])
	const [ImagetypeValidation, setImagetypeValidation] = useState(false)
	const [OptiontoChoseUpload, setOptiontoChoseUpload] = useState(false)
	// const [RequireError , setRequireError] = useState(location?.state && location?.state?.Blank_Details ? location?.state?.Blank_Details : 0);
	const [RequireError, setRequireError] = useState(
		location?.state?.Blank_Details || 0
	)
	const [RequireDocumentError, setRequireDocumentError] = useState(location?.state && location?.state?.Document_Blank ? location?.state?.Document_Blank : 0)
	const [KYCtoChoseUpload, setKYCtoChoseUpload] = useState(false)
	const [ErrorPopup, setErrorPopup] = useState(false)
	const [ErrorMessage, setErrorMessage] = useState(false)
	const [OthertoChoseUpload, setOthertoChoseUpload] = useState(false)
	const [ImagesizeValidation, setImagesizeValidation] = useState(false)
	const [IdDocument_Id, setIdDocument_Id] = useState(0)
	const [formDataa, setFormData] = useState([{name: '', email: '', phone: '', percentageOfShareHolding: ''}])
	const [formData2, setFormData2] = useState([{name: '', email: '', phone: '', percentageOfShareHolding: ''}])
	const [number, setNumber] = useState(1)
	const [number2, setNumber2] = useState(0)
	const [numberOfForms, setNumberOfForms] = useState(0)
	const [numberOfForms2, setNumberOfForms2] = useState(0)
	const handleDynamiForm = (event) => {
		const inputValue = event.target.value
		if (inputValue === '' || (parseInt(inputValue) >= 1 && parseInt(inputValue) <= 10)) {
			setNumber(inputValue) // Update the state with the valid input
			handleTextFieldChange(event)
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
			userId: +localStorage.getItem('Id'),
			isShareHolder: false,
			[field]: value
		}
		setFormData(updatedFormData)
	}

	const AddFieldDirector = () => {
		let newfield = {
			userId: +localStorage.getItem('Id'),
			isShareHolder: false,
			name: '',
			email: '',
			phone: '',
			percentageOfShareHolding: ''
		}

		setFormData([...formDataa, newfield])
	}

	const UpdateremoveFieldsReciptionDetails = (index) => {
		// debugger;
		const fields = [...formDataa]
		fields.splice(index, 1)
		setFormData(fields)
	}

	const UpdateremoveFieldsShareHolder = (index) => {
		// debugger;
		const fields = [...formData2]
		fields.splice(index, 1)
		setFormData2(fields)
	}

	const handleDynamiForm2 = (event) => {
		const inputValue = event.target.value
		if (inputValue === '' || (parseInt(inputValue) >= 0 && parseInt(inputValue) <= 10)) {
			setNumber2(inputValue) // Update the state with the valid input
			handleTextFieldChange2(event)
			// handleDataStep3(event);
		}
	}

	const handleTextFieldChange2 = (event) => {
		const value = event.target.value
		setNumberOfForms2(Number(value))
	}

	const handleFormInputChange2 = (index, field, value) => {
		const updatedFormData = [...formData2]
		updatedFormData[index] = {
			...updatedFormData[index],
			userId: +localStorage.getItem('Id'),
			isShareHolder: true,
			[field]: value
		}
		setFormData2(updatedFormData)
	}

	const submitDelivery = (e) => {
		e.preventDefault()
		return formDataa
	}

	const submitShareHolder = (e) => {
		e.preventDefault()
		return formData2
	}

	const AddFieldShareHolder = () => {
		let newfield = {
			userId: +localStorage.getItem('Id'),
			isShareHolder: false,
			name: '',
			email: '',
			phone: '',
			percentageOfShareHolding: ''
		}

		setFormData2([...formData2, newfield])
	}

	const handleSubmitDirector = async (e) => {
		try {
			const data = submitDelivery(e)
			const response = await axios.post(
				CommonConstants.BASE_URL + '/adddirectors', formDataa
			)
			if (response.data.status === true) {
				setUpdateBusinessDetails({...updateBusinessDetails, noDirector: formDataa.length})
				setFormPopup(false)
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
				setUpdateBusinessDetails({...updateBusinessDetails, noShareholder: formData2.length})
				setShareholderFormPopup(false)
				// console.log(response.data.data,"Add Director Details")
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleFileChange = (event) => {
		const selectedFile = event.target.files[0]
		// console.log(event.target.files[0]);
		setSelectedFileName(selectedFile)
		// ... do something with the selected file

		const file = event.target.files[0] // Get the selected file
		// Check if a file is selected
		if (file) {
			const fileName = file.name.toLowerCase()
			const fileSize = file.size

			// Check file type
			const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf', '.doc']
			const fileExtension = fileName.substring(fileName.lastIndexOf('.'))

			if (allowedExtensions.includes(fileExtension)) {
				const maxSizeInBytes = 2 * 1024 * 1024 // 2 MB
				if (fileSize > maxSizeInBytes) {
					// alert('File size exceeds the maximum limit of 2 MB.');
					setImagesizeValidation(true)
					// return;
				} else {
					// console.log(event.target.files,"HHHHHH")
					const selectedFiles = event.target.files
					const selectedFilesArray = Array.from(selectedFiles)
					const imagesArray = selectedFilesArray.map((file) => {
						return URL.createObjectURL(file)
					})
					const imagesFileArray = selectedFilesArray.map((file) => {
						return file
					})
					// setSelectedImagesFront((previousImages) => previousImages.concat(imagesArray));
					setSelectedImages((previousImages) =>
						previousImages.concat(imagesArray)
					)
					setOtherSelectedImages((previousImages) =>
						previousImages.concat(imagesFileArray)
					)
				}
			} else {
				// alert('Invalid file type. Only PNG, JPG, and JPEG files are allowed.');
				setImagetypeValidation(true)
			}
		}
	}

	const [KYCDocument, setKYCDocument] = useState([])
	const [AdditionalDocument, setAdditionalDocument] = useState([])

	const imageData = (images) => {
		setKYCDocument(images)
	}

	const OtherimageData = (images) => {
		setAdditionalDocument(images)
	}

	const handledocumentId = (e) => {
		setIdDocument_Id(e.target.value)
	}

	const [updateUserDetails, setUpdateUserDetails] = useState({
		id: userDetailsId,
		roleId: userDetailsRollId,
		countryId: userDetailsCountryId,
		refCodeId: '',
		fName: '',
		mName: '',
		lName: '',
		phone: '',
		isPhoneVerified: false,
		phoneVerifiedAt: null,
		email: '',
		businessName: '',
		digitalVerifiedLink: null,
		digitalVerifiedTransactionId: null,
		regNo: '',
		businessAddress: '',
		isEmailVerified: false,
		emailVerifiedAt: null,
		isOCRVerfiedId: false
	})

	const [StreetName, setStreetName] = useState('')

	const [updatekycdetails, setUpdatekycdetails] = useState({
		id: kycdetilsID,
		userId: kycDetailsUserId,
		streetName: '',
		countryId: kycDetailsCountryId,
		stateId: '',
		nationality: '',
		suburb: '',
		postalCode: '',
		verified: false,
		occupationId: '',
		isResidence: '',
		kycStatus: ''
	})

	const [updateBusinessDetails, setUpdateBusinessDetails] = useState({
		id: businessDetailsId,
		userId: BusinessDetailsUserId,
		companyName: '',
		abn: '',
		typeBusiness: '',
		industryType: '',
		noDirector: '',
		noShareholder: '',
		noEmployee: '',
		businessAddress: '',
		targetBusiness: '',
		website: '',
		expectedRemittance: '',
		volumeYear: '',
		noOfTranscation: '',
		countryOfBusiness: ''
	})
	const [updateIdDetails, setUpdateDetails] = useState({
		id: idDetailsId,
		userId: idDetilsUserId,
		typeId: '',
		documentNumber: '',
		cardNumber: '',
		dob: '', //19-02-1996
		documentValidity: '',
		issuingAuthority: ''
	})
	const handleChange = (e) => {
		const {name, value} = e.target
		setUpdateUserDetails({...updateUserDetails, [name]: value})
	}
	const handleKYCChange = (e) => {
		const {name, value} = e.target
		setUpdatekycdetails({...updatekycdetails, [name]: value})
	}
	const handleBusinessChange = (e) => {
		const {name, value} = e.target
		setUpdateBusinessDetails({...updateBusinessDetails, [name]: value})
	}
	const handleIdChange = (e) => {
		const {name, value} = e.target
		setUpdateDetails({...updateIdDetails, [name]: value})
		handledocumentId(e)
	}

	const handleEditClick = () => {
		if (isEditing === true || isEditing2 === true || isEditing3 === true || isEditing4 === true) {
			setIsEditing(false)
		} else {
			setIsEditing(true)
		}
	}

	const handleEditClick1 = () => {
		if (isEditing === true || isEditing2 === true || isEditing3 === true || isEditing4 === true) {
			setIsEditing2(false)
		} else {
			setIsEditing2(true)
		}
	}

	const handleKYCONClick = () => {
		if (isEditing === true || isEditing2 === true || isEditing3 === true || isEditing4 === true) {
			setEditEnable(true)
		} else {
			setEditEnable(false)
			setIsEditing2(true)
		}
	}

	const handleEditClick3 = () => {
		if (isEditing === true || isEditing2 === true || isEditing3 === true || isEditing4 === true) {
			setIsEditing3(false)
		} else {
			setIsEditing3(true)
		}
	}

	const handleIDDetailsONClick = () => {
		if (isEditing === true || isEditing2 === true || isEditing3 === true || isEditing4 === true) {
			setEditEnable(true)
		} else {
			setEditEnable(false)
			setIsEditing3(true)
		}
	}

	const handleBusinessEdit = () => {
		if (isEditing === true || isEditing2 === true || isEditing3 === true || isEditing4 === true) {
			setIsEditing4(false)
		} else {
			setIsEditing4(true)
		}
	}

	const handleBusinessONClick = () => {
		if (isEditing === true || isEditing2 === true || isEditing3 === true || isEditing4 === true) {
			setEditEnable(true)
		} else {
			setEditEnable(false)
			setIsEditing4(true)
		}
	}


	const [OtherTextFieldVisible, setOtherTextFieldVisible] = useState('')

	const handleOther = (e) => {
		if (e.target.value == 'Others') {
			setOtherTextFieldVisible(true)
		} else {
			setOtherTextFieldVisible(false)
		}
	}

	const handleSubmit = async (handleId) => {
		validator.error_input_validation(handleId)
		if (validator.error_input_validation(handleId)) {

			const updatedUserDetails = {
				id: userDetailsId,
				roleId: userDetailsRollId,
				countryId: userDetailsCountryId,
				refCodeId: null,
				firstName: updateUserDetails?.fName || userData?.fName,
				middleName: updateUserDetails?.mName || userData?.mName,
				lastName: updateUserDetails?.lName || userData?.lName,
				phone: updateUserDetails?.phone || userData?.phone,
				phoneCode: userData?.phoneCode,
				customerId: userData?.customerId,
				isPhoneVerified: updateUserDetails?.isPhoneVerified || userData?.isPhoneVerified,
				phoneVerifiedAt: updateUserDetails?.phoneVerifiedAt || userData?.phoneVerifiedAt,
				email: updateUserDetails?.email || userData?.email,
				businessName: updateUserDetails?.businessName || userData?.businessName,
				digitalVerifiedLink: updateUserDetails?.digitalVerifiedLink || userData?.phoneVerifiedAt,
				digitalVerifiedTransactionId: updateUserDetails?.digitalVerifiedTransactionId || userData?.digitalVerifiedTransactionId,
				regNo: updateUserDetails?.regNo || userData?.regNo,
				businessAddress: updateUserDetails?.businessAddress || userData?.businessAddress,
				isEmailVerified: updateUserDetails?.isEmailVerified || userData?.isEmailVerified,
				emailVerifiedAt: updateUserDetails?.emailVerifiedAt || userData?.emailVerifiedAt,
				isOCRVerfiedId: updateUserDetails?.isOCRVerfiedId || userData?.isOCRVerfiedId
			}

			const updatedKycDetails = {
				id: userData?.userkycdetails?.id,
				userId: kycDetailsUserId,
				streetName: updatekycdetails?.streetName || userData?.userkycdetails?.streetName,
				countryId: userData?.countryId,
				stateId: updatekycdetails?.stateId || userData?.userkycdetails?.stateId,
				nationality: updatekycdetails?.nationality || userData?.userkycdetails?.nationality,
				suburb: updatekycdetails?.suburb || userData?.userkycdetails?.suburb,
				postalCode: updatekycdetails?.postalCode || userData?.userkycdetails?.postalCode,
				verified: updatekycdetails?.verified,
				occupationId: updatekycdetails?.occupationId || userData?.userkycdetails?.occupationId,
				isResidence: updatekycdetails?.isResidence == 'Yes' ? true : false,
				kycStatus: updatekycdetails?.kycStatus || null
			}

			// const updatedBusinessDetails = {
			// 	id: businessDetailsId,
			// 	userId: BusinessDetailsUserId,
			// 	companyName:
			// 	updateBusinessDetails?.companyName,
			// 	abn: updateBusinessDetails?.abn || userData?.businessDetails.abn,
			// 	typeBusiness:
			// 		updateBusinessDetails?.typeBusiness ||
			// 		userData?.businessDetails.typeBusiness,
			// 	industryType:
			// 		updateBusinessDetails?.industryType ||
			// 		userData?.businessDetails.industryType,
			// 	noDirector:
			// 		updateBusinessDetails?.noDirector || userData?.businessDetails.noDirector,
			// 	noShareholder:
			// 		updateBusinessDetails?.noShareholder ||
			// 		userData?.businessDetails.noShareholder,
			// 	noEmployee:
			// 		updateBusinessDetails?.noEmployee || userData?.businessDetails.noEmployee,
			// 	businessAddress:
			// 		updateBusinessDetails?.businessAddress ||
			// 		userData?.businessDetails.businessAddress,
			// 	targetBusiness:
			// 		updateBusinessDetails?.targetBusiness ||
			// 		userData?.businessDetails.targetBusiness,
			// 	website:
			// 		updateBusinessDetails?.website || userData?.businessDetails.website,
			// 	expectedRemittance: updateBusinessDetails?.expectedRemittance || userData?.businessDetails.expectedRemittance,
			// 	volumeYear:
			// 		updateBusinessDetails?.volumeYear || userData?.businessDetails.volumeYear,
			// 	noOfTranscation:
			// 		updateBusinessDetails?.noOfTranscation ||
			// 		userData?.businessDetails.noOfTranscation,
			// 	countryOfBusiness: updateBusinessDetails?.countryOfBusiness || userData?.businessDetails.countryOfBusiness
			// }

			const updatedIdDetails = {
				id: userData?.iddetails?.id,
				userId: userDetailsId,
				typeId: IdDocument_Id == 0 ? updateIdDetails?.typeId : +IdDocument_Id,
				documentNumber: updateIdDetails?.documentNumber || userData?.iddetails?.documentNumber,
				cardNumber: updateIdDetails?.cardNumber || userData?.iddetails?.cardNumber,
				dob: updateIdDetails?.dob == '' ? userData?.iddetails?.dob : updateIdDetails?.dob,
				documentValidity: updateIdDetails?.documentValidity || userData?.iddetails?.documentValidity,
				issuingAuthority: updateIdDetails?.issuingAuthority || userData?.iddetails?.issuingAuthority
			}

			const formData = new FormData()

			// formData.append('businessDetails', JSON.stringify(updatedBusinessDetails))

			if (handleId === 'UserDetails') {
				await updateUserDetail(updatedUserDetails)
			}

			if (handleId === 'KYCDetails') {
				await updateKycDetail(updatedKycDetails)
			}

			if (handleId === 'ID_Details') {
				await updateIdDetail(updatedIdDetails)
			}

			if (handleId === 'IdDocument') {
				await handleSubmitDocument()
			}
		}
	}

	const prepareFormData = () => {
		const formData = new FormData()

		const requests = []

		for (let i = 0; i < KYCDocument.length; i++) {
			requests.push({
				fileName: KYCDocument[i].name,
				isFront: i === 0,
				isBack: i === 1,
				typeId: IdDocument_Id
			})
		}

		formData.append('requests', JSON.stringify(requests))

		KYCDocument.forEach((image) => {
			formData.append('file', image)
		})

		return formData
	}

	const handleSubmitDocument = async () => {
		try {
			setloadervalue(true)

			const formData = prepareFormData()
			const response = await saveUserDocument(formData, userDetailsId)

			if (response.data.status === true) {

				setKYCtoChoseUpload(false)

				if (selectedImages.length > 0) {
					setSelectedImages([])
				}

				if (OtherSelectedImages.length > 0) {
					setOtherSelectedImages([])
				}

				setIsEditing3(false)
				setloadervalue(false)
				await getAllData()
			}
		} catch (error) {
			setloadervalue(false)
			setErrorPopup(true)
			setErrorMessage(error.response.data.message)
		}
	}

	const updateUserDetail = (data) => {
		setloadervalue(true)
		axios.patch(
			CommonConstants.BASE_URL + '/user/update', data
		).then(async (response) => {
			setIsEditing(false)
			setloadervalue(false)
			await getAllData()
		}).catch((error) => {
			setloadervalue(false)
			setErrorPopup(true)
			setErrorMessage(error.response.data.message)
		})
	}

	const updateKycDetail = (data) => {
		setloadervalue(true)
		axios.patch(
			CommonConstants.BASE_URL + '/userkycdetails/update', data
		).then(async (response) => {
			setloadervalue(false)
			setIsEditing2(false)
			await getAllData()
		}).catch((error) => {
			setloadervalue(false)
			setErrorPopup(true)
			setErrorMessage(error.response.data.message)
		})
	}

	const updateIdDetail = (data) => {
		setloadervalue(true)
		axios.patch(
			CommonConstants.BASE_URL + '/useriddetails/update', data
		).then(async (response) => {
			setIsEditing3(false)
			setloadervalue(false)
			await getAllData()
		}).catch((error) => {
			setloadervalue(false)
			setErrorPopup(true)
			setErrorMessage(error.response.data.message)
		})
	}

	const prepareAdditionalFormData = () => {
		const formData = new FormData()

		const requests = []

		AdditionalDocument.map((item) => {
			if (item.ImageArray.length > 0) {
				if (userData && userData?.roleId == 2) {
					for (let i = 0; i < item.ImageFileArray.length; i++) {
						requests.push({
							fileName: item.ImageFileArray[i].name,
							typeId: item.id
						})
						formData.append('file', item.ImageFileArray[i])
					}
				} else {
					if (item.typeName == 'Other Documents') {
						for (let i = 0; i < item.ImageFileArray.length; i++) {
							requests.push({
								fileName: item.ImageFileArray[i].name,
								type: item.OtherDocumnetName
							})

							formData.append('file', item.ImageFileArray[i])
						}
					} else {
						for (let i = 0; i < item.ImageFileArray.length; i++) {
							requests.push({
								fileName: item.ImageFileArray[i].name,
								documentTypeId: item.id
							})
							formData.append('file', item.ImageFileArray[i])
						}
					}
				}
			}
		})

		formData.append('requests', JSON.stringify(requests))

		return formData
	}

	const handleOtherDocumentUpload = async () => {
		try {
			setloadervalue(true)
			const formData = prepareAdditionalFormData()
			const response = await saveUserDocument(formData, userDetailsId)

			if (response.data.statuscode === 200) {
				setOptiontoChoseUpload(false)
				setOthertoChoseUpload(false)
				setloadervalue(false)
				await getAllData()
			}

		} catch (error) {
			setErrorPopup(true)
			setErrorMessage(error.response.message)
		} finally {
			setloadervalue(false)
		}
	}

	const GetAllState = async (CountryIds) => {
		const reciverCountryId = localStorage.getItem('reciverCountryId')
		try {
			const userId = {
				id: CountryIds
			}
			const response = await axios.post(
				CommonConstants.BASE_URL + '/getallstatebycountryid',
				userId
			)
			if (response.data.status === true) {
				setgetState(response.data.data)

				const resp = await axios.get(
					CommonConstants.BASE_URL + '/getallcountries'
				)
				if (resp.data.status === true) {
					var Iso3 = resp.data.data.find((Item) => Item.id === CountryIds).iso3

					const options = {
						componentRestrictions: {country: `${Iso3}`}
					}

					const autocomplete = new window.google.maps.places.Autocomplete(
						autocompleteRef.current,
						options
					)
					autocomplete.addListener('place_changed', () => {
						const place = autocomplete.getPlace()
						handlePlaceSelect(place, response.data.data)
					})

					const autocomplete2 = new window.google.maps.places.Autocomplete(
						autocompleteRef2.current,
						options
					)
					autocomplete2.addListener('place_changed', () => {
						const place = autocomplete2.getPlace()
						handlePlaceSelect2(place)
					})

					const autocomplete3 = new window.google.maps.places.Autocomplete(
						autocompleteRef3.current,
						options
					)
					autocomplete3.addListener('place_changed', () => {
						const place = autocomplete3.getPlace()
						handlePlaceSelect3(place)
					})

				}


			} else if (response.data.status === 'error') {
			}
		} catch (err) {
		}
	}

	const onSelectFile = (event) => {
		const selectedFiles = event.target.files
		const selectedFilesArray = Array.from(selectedFiles)

		const imagesArray = selectedFilesArray.map((file) => {
			return URL.createObjectURL(file)
		})

		setSelectedImages((previousImages) => previousImages.concat(imagesArray))

		// FOR BUG IN CHROME
		event.target.value = ''
	}

	function deleteHandler (image) {
		// setSelectedFileName(selectedFileName.filter((e) => e !== image));
		URL.revokeObjectURL(image)
	}

	//get id issueing country
	const GetNationalityIdAuthority = async (Natinalityname, Countryid) => {
		try {
			const NationalityName = {
				nationality: Natinalityname,
				countryId: Countryid
			}
			const response = await axios.post(
				CommonConstants.BASE_URL + '/getissueauthoritybynationality',
				NationalityName
			)
			if (response.data.status === true) {
				setIdAuthority(response.data.data)
				setIdAuthoritySubtype(response.data.data[0].issueAuthority)
			} else if (response.data.status === 'error') {
			}
		} catch (err) {
			// console.log(err)
		}
	}

	const [Idtypes, setIdtypes] = useState([])
	const [ResidenseCountry, setResidenseCountry] = useState('')
	const GetIdTypeByCountryId = async (values, setIdTypesinDocument) => {
		try {
			const IdData = {
				countryId: values//Countrydata.CountryId
			}
			const response = await axios.post(
				CommonConstants.BASE_URL + '/getactiveidtypebycountryid',
				IdData
			)
			if (response.data.status === true) {
				setIdtypes(response.data.data)
				if (setIdTypesinDocument == null || setIdTypesinDocument == '') {
					// setIdDocument_Id(response.data.data[0].id)
				}
			}
		} catch (err) {
			// console.log(err)
		}
	}
	const autocompleteRef = React.useRef(null)

	// To get the user info starts
	const getAllData = async () => {
		setloadervalue(true)
		const userId = localStorage.getItem('Id')
		const payLoad = {
			id: userId //3855
		}
		try {
			const response = await axios.post(
				`${CommonConstants.BASE_URL}/getuserinfobyid`,
				payLoad
			)

			if (response.data.status === true) {
				await setUpdateUserDetails((prevState) => ({
					...prevState,
					phone: response.data.data.phone
				}))

				console.log(updateUserDetails, 'UpdateuserDetails')

				GetDirectorOrShareHolder(response.data.data.id)

				GetAllState(response.data.data.countryId)
				const responseData = response.data.data
				var ImageArray = []

				// console.log(response.data.data.countryId);
				if (response.data.data.roleId === 2) {
					response.data.data.additionalDocuments.map((ImagesArray, index) => {
						const isDuplicate = ImageArray.some(item => item?.documentType === ImagesArray?.type)
						// console.log(isDuplicate,"isDuplicate")
						if (!isDuplicate) {
							if (ImagesArray?.type != null) {
								const OtherImageArray = {
									documentTypeId: ImagesArray?.documentTypeId,
									documentType: ImagesArray?.type,
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
						// console.log(ImagesArray?.documentType,"ImagesArray?")
						const isDuplicate = ImageArray.some(item => item.documentType === ImagesArray?.documentType)
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

				if (location?.state && (location?.state?.Document_Blank || location?.state?.Blank_Details)) {
					if ((responseData?.iddetails?.typeId == '' || responseData?.iddetails?.documentNumber == '' || responseData?.iddetails?.cardNumber == '' || responseData?.iddetails?.dob == '' || responseData?.iddetails?.documentValidity == '' || responseData?.iddetails?.issuingAuthority == '') && (responseData?.userkycdetails?.streetName == '' || responseData?.userkycdetails?.stateId == '' || responseData?.userkycdetails?.nationality == '' || responseData?.userkycdetails?.suburb == '' || responseData?.userkycdetails?.postalCode == '' || responseData?.userkycdetails?.occupationId == '')) {
						setRequireError(1)
					} else if (responseData?.userkycdetails?.streetName == '' || responseData?.userkycdetails?.stateId == '' || responseData?.userkycdetails?.nationality == '' || responseData?.userkycdetails?.suburb == '' || responseData?.userkycdetails?.postalCode == '' || responseData?.userkycdetails?.occupationId == '') {
						setRequireError(2)
					} else if ((responseData?.iddetails?.typeId == '' || responseData?.iddetails?.documentNumber == '' || responseData?.iddetails?.cardNumber == '' || responseData?.iddetails?.dob == '' || responseData?.iddetails?.documentValidity == '' || responseData?.iddetails?.issuingAuthority == '') && responseData?.isDigital === false) {
						setRequireError(3)
					} else {
						setRequireError(0)
					}

					if ((responseData?.idDocuments?.length === 0) && (responseData?.role == 'Individual' && responseData?.additionalDocuments?.length === 0 || responseData?.role == 'Business' && responseData?.businessDocuments?.length === 0)) {
						setRequireDocumentError(1)
					} else if (responseData?.idDocuments?.length === 0) {
						setRequireDocumentError(2)
					} else if ((responseData?.role == 'Individual' && responseData?.additionalDocuments?.length === 0) || (responseData?.role == 'Business' && responseData?.businessDocuments?.length === 0)) {
						setRequireDocumentError(3)
					} else {
						setRequireDocumentError(0)
					}
				}
				setUploadImageArray(ImageArray)

				GetIdTypeByCountryId(response.data.data.countryId, responseData?.iddetails?.typeId)
				setResidenseCountry(response.data.data.userkycdetails.countryName)
				GetNationalityIdAuthority(responseData.userkycdetails.nationality, response.data.data.countryId)
				await setUserData(responseData)
				setUserCurrency(responseData?.currency)

				setUpdateUserDetails((prevState) => ({
					...prevState,
					regNo: response.data.data?.regNo,
					businessName: response.data.data?.businessName
				}))

				setUpdateDetails((prevState) => ({
					...prevState,
					typeId: response.data.data.iddetails?.typeId,
					documentNumber: response.data.data.iddetails?.documentNumber,
					cardNumber: response.data.data.iddetails?.cardNumber
				}))
				setUpdatekycdetails((prevState) => ({
					...prevState,
					streetName: response.data.data.userkycdetails?.streetName,
					isResidence: response.data.data.userkycdetails?.isResidence === true ? 'Yes' : 'No'
				}))
				setUpdateUserDetails((prevState) => ({
					...prevState,
					businessAddress: response.data.data?.businessAddress
				}))
				setUpdateBusinessDetails((prevState) => ({
					...prevState,
					businessAddress: response.data.data.businessDetails?.businessAddress,
					companyName: response.data.data.businessDetails?.companyName
				}))
				setStreetName(response.data.data.userkycdetails?.streetName)
				setIdDocument_Id(responseData?.iddetails?.typeId)
				setFullName(responseData.fName + ' ' + responseData.lName)
				setselectedStateId(responseData.userkycdetails.stateName)
				setNationality(responseData.userkycdetails.nationality)
				setUserDetailsId(responseData.id)
				setCountryId(responseData.countryId)
				setUserDetailsRollId(responseData.roleId)
				setUserDetailsCountryId(responseData.countryId)
				setBusinessDetailsId(responseData.businessDetails.id)
				setBusinessDetailsUserId(responseData.businessDetails.userId)
				setKycDetailsId(responseData.userkycdetails.id)
				setKycDetailsUserId(responseData.userkycdetails.userId)
				setKycDetailscountryId(responseData.countryId)
				setIddetailsId(responseData.iddetails.id)
				setIdDetailsUserId(responseData.iddetails.userId)
				setloadervalue(false)
			}
		} catch (err) {
			console.log(err)
			setloadervalue(false)
		}
	}

	// To get the user info ends
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

	const GetDirectorOrShareHolder = async (U_Id) => {
		try {

			const Director_Data = new FormData()

			Director_Data.append('userId', U_Id)

			const response = await axios.post(
				CommonConstants.BASE_URL + '/getdirectorsdetailsbyuserid', Director_Data
			)
			if (response.data.status === true) {
				const DetailsArray = []
				const ShareholderArray = []

				response.data.data.map((details) => {
					if (details.isShareHolder == false) {
						const DArrayname = {
							userId: +details.userId,
							isShareHolder: false,
							name: details.name,
							email: details.email,
							phone: details.phone,
							percentageOfShareHolding: details.percentageOfShareHolding
						}
						DetailsArray.push(DArrayname)
					}
				})
				setFormData(DetailsArray)

				response.data.data.map((details) => {
					if (details.isShareHolder == true) {
						const DArrayname = {
							userId: +details.userId,
							isShareHolder: false,
							name: details.name,
							email: details.email,
							phone: details.phone,
							percentageOfShareHolding: details.percentageOfShareHolding
						}
						ShareholderArray.push(DArrayname)
					}
				})
				setFormData2(ShareholderArray)

				// setOccupation(response.data.data);
			} else {
				// console.log(response.data.message)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const addressRegex = /^(\d+[A-Za-z]*|[A-Za-z]+\d+|\d+)[\/A-Za-z,]*\s+[A-Za-z\s]+$/

	const handlePlaceSelect = async (place, States) => {
		var TemArray = place.address_components
		//const isValid = addressRegex.test(place.name);
		var isValid = true
		var streetName = ''
		var street_number = ''
		var street_long_name = ''
		var postal_code = ''
		var city = ''
		var state = ''

		setUpdatekycdetails((prevState) => ({
			...prevState,
			streetName: '',
			suburb: '',
			postalCode: '',
			stateId: ''
		}))

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
			setStreetName(streetName)
			setselectedStateId((States?.find((stateItem) => stateItem.name === state))?.name)

			await setUpdatekycdetails((prevState) => ({
				...prevState,
				suburb: city,
				postalCode: postal_code,
				stateId: (States?.find((stateItem) => stateItem.name === state))?.id,
				streetName: streetName
			}))
		}

		return isValid
	}

	const handlePlaceSelect2 = (place) => {

		setUpdateUserDetails((prevState) => ({
			...prevState,
			businessAddress: place.formatted_address
		}))
	}
	const autocompleteRef2 = React.useRef(null)

	const handlePlaceSelect3 = (place) => {

		setUpdateBusinessDetails((prevState) => ({
			...prevState,
			businessAddress: place.formatted_address
		}))
	}

	const autocompleteRef3 = React.useRef(null)

	useEffect(() => {
		GetAllNationality()
		getAllData()
		// GetAllState();
		GetAllOccupation()

	}, [])

	const GetAllNationality = async (values) => {
		try {
			const response = await axios.get(
				CommonConstants.BASE_URL + '/getallnationality'
			)
			if (response.data.status === true) {
				const optionsForCountry = response.data.data.map((NationalityName) => ({
					value: NationalityName.nationality,
					label: NationalityName.nationality
				}))
				setNationalityArray(optionsForCountry)
			} else if (response.data.status === 'error') {
				// console.log(response.data.message)
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

	return (
		<>
			<section className="abtPage profileSection ">
				{loadervalue == true ? <Loader/> : ''}
				<NavBar></NavBar>
				<Container className="bg-white py-2 px-5 rounded-4 mb-5">

					<div className="headerText d-flex align-items-center">
						<h1 className="purpleText bolder pt-3"> Profile </h1>
						&nbsp;
						<h4
							className="bolder pt-3">{userData?.role == 'Individual' ? '(Individual)' : userData?.role == 'Business' ? '(Business)' : userData?.role == 'Agent' ? '(Agent)' : ''}</h4>
					</div>

					<div className="personalDetails py-4">
						<div className="d-flex justify-content-between">
							<span className="bolder text-black">Personal Details</span>
							<div className="d-flex">
								{!isEditing ? (
									<div className="pointer" onClick={() => handleEditClick()}>
										<i className="fa fa-pencil purpleText"></i>{' '}
										<small
											className="responsiveFontLarge purpleText bolder"

										>
											Edit
										</small>
									</div>
								) : (
									<>
										<small
											className="responsiveFontLarge me-2 pointer CancleBUtton px-3 purpleText bolder"
											onClick={() => {
												setIsEditing(false)
											}}
										>
											Cancel
										</small>
										<div className="pointer" onClick={() => handleSubmit('UserDetails')}>
											<i className="fa fa-pencil purpleText"></i>{' '}
											<small
												className="responsiveFontLarge purpleText bolder"

											>
												Update
											</small>
										</div>
									</>
								)}
							</div>
						</div>

						{/* <Form> */}
						<Row className="innerForm mt-2" id="UserDetails">
							<Form className="mt-3" id="">

								<Row className={`${userData?.roleId == 3 ? 'd-block' : 'd-none'}`}>
									<Form.Group
										as={Col}
										className="left-inner-addon input-container required"
									>
										<i className="purpleText main fa fa-user "></i>
										<Form.Control
											type="text"
											required
											// placeholder="Full Name"
											name="fName"
											className="formControlStep2 mainS4 "
											defaultValue={userData?.fName}
											readOnly//={!isEditing}
											onChange={handleChange}
										/>
										<label for="name" className="ProfileLables">
											Full Name
										</label>
									</Form.Group>
								</Row>

								<Row className={`${userData?.roleId == 3 ? 'd-none' : 'd-block'} d-flex px-0`}>
									<Col className="col-lg-4 px-0">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fa fa-user "></i>
											<Form.Control
												type="text"
												required
												// placeholder="First Name"
												name="fName"
												className="formControlStep2 mainS4 "
												defaultValue={userData?.fName}
												readOnly//={!isEditing}
												onChange={handleChange}
											/>
											<label for="name" className="ProfileLables">
												First Name
											</label>
										</Form.Group>
									</Col>
									<Col className="col-lg-4 px-0">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fa fa-user "></i>
											<Form.Control
												type="text"
												required
												// placeholder="Middle Name"
												name="mName"
												className="formControlStep2 mainS4 "
												defaultValue={userData?.mName}
												readOnly//={!isEditing}
												onChange={handleChange}
											/>
											<label for="name" className="ProfileLables">
												Middle Name
											</label>
										</Form.Group>
									</Col>
									<Col className="col-lg-4 px-0">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fa fa-user "></i>
											<Form.Control
												type="text"
												required
												// placeholder="Last Name"
												name="lName"
												className="formControlStep2 mainS4 "
												defaultValue={userData?.lName}
												readOnly//={!isEditing}
												onChange={handleChange}
											/>
											<label for="name" className="ProfileLables">
												Last Name
											</label>
										</Form.Group>
									</Col>
								</Row>

								{
									isEditing ?
										(<Row className="">
											<Form.Group
												as={Col}
												className="left-inner-addon input-container required"
											>
												<i className="purpleText main fa fa-envelope "></i>
												<Form.Control
													type="text"
													required
													// placeholder=""
													name="email"
													className="formControlStep2 email mainS4 required"
													defaultValue={userData?.email}
													readOnly={!isEditing}
													onChange={handleChange}
												/>
												<label for="name" className="ProfileLables">
													Email
												</label>
												<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
													Please Enter Your Email
												</small>
											</Form.Group>
										</Row>)
										:
										(<Row className="">
											<Form.Group
												as={Col}
												className="left-inner-addon input-container required"
											>
												<i className="purpleText main fa fa-envelope "></i>
												<Form.Control
													type="text"
													required
													// placeholder=""
													name="email"
													className="formControlStep2 email mainS4 required"
													value={userData?.email}
													readOnly={!isEditing}
													onChange={handleChange}
												/>
												<label for="name" className="ProfileLables">
													Email
												</label>
												<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
													Please Enter Your Email
												</small>
											</Form.Group>
										</Row>)
								}

								{userData?.roleId == 3 ?
									<>
										{
											isEditing ?
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container"
													>
														<i className="purpleText main fa fa-envelope "></i>
														<Form.Control
															type="text"
															required
															// placeholder=""
															name="businessName"
															className="formControlStep2 required mainS4 "
															value={updateUserDetails?.businessName}
															readOnly={!isEditing}
															onChange={(e) => {
																let values = e.target.value
																const newValue = values.replace(/[^a-zA-Z\s]/g, '')
																setUpdateUserDetails((prevState) => ({
																	...prevState,
																	businessName: newValue
																}))
															}}
														/>
														<label for="name" className="ProfileLables">
															Business Name
														</label>
														<small className="responsiveFontLarge  d-none text-danger ms-2 error">
															Please Enter Your Business Name
														</small>
													</Form.Group>
												</Row>)
												:
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container"
													>
														<i className="purpleText main fa fa-envelope "></i>
														<Form.Control
															type="text"
															required
															// placeholder=""
															name="businessName"
															className="formControlStep2 required mainS4 "
															value={userData?.businessName}
															readOnly={!isEditing}
															// onChange={handleChange}
														/>
														<label for="name" className="ProfileLables">
															Business Name
														</label>
														<small className="responsiveFontLarge  d-none text-danger ms-2 error">
															Please Enter Your Business Name
														</small>
													</Form.Group>
												</Row>)
										}

										{
											isEditing ?
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-envelope "></i>
														<Form.Control
															type="text"
															required
															// placeholder=""
															name="regNo"
															className="formControlStep2 mainS4 "
															value={updateUserDetails?.regNo}
															readOnly={!isEditing}
															onChange={(e) => {
																let values = e.target.value
																const newValue = values.replace(/[^a-zA-Z0-9\s]/g, '').toUpperCase()
																setUpdateUserDetails((prevState) => ({
																	...prevState,
																	regNo: newValue
																}))
															}}
														/>
														<label for="name" className="ProfileLables">
															Register Number1
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Register Number
														</small>
													</Form.Group>
												</Row>)
												:
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-envelope "></i>
														<Form.Control
															type="text"
															required
															// placeholder=""
															name="regNo"
															className="formControlStep2 mainS4 "
															value={userData?.regNo}
															readOnly={!isEditing}
															// onChange={(e)=>{
															//   let values = e.target.value;
															//   const newValue = values.replace(/[^0-9]/g, '');
															//     setUpdateUserDetails((prevState) => ({
															//       ...prevState,
															//       regNo : newValue
															//     }));
															// }}
														/>
														<label for="name" className="ProfileLables">
															Register Number
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Register Number
														</small>
													</Form.Group>
												</Row>)
										}

										{
											isEditing ?
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-envelope "></i>
														<Form.Control
															type="text"
															required
															placeholder=" "
															ref={autocompleteRef2}
															name="businessAddress"
															className={`formControlStep2 required mainS4 ${!isEditing ? 'disableInput' : ''}`}
															// defaultValue={userData?.businessAddress}
															value={updateUserDetails?.businessAddress}
															readOnly={!isEditing}
															onChange={handleChange}
														/>
														<label for="name" className="ProfileLables">
															Business Address
														</label>
														<small className="responsiveFontLarge d-none text-danger ms-2 error">
															Please Enter Your Business Address
														</small>
													</Form.Group>
												</Row>)
												:
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-envelope "></i>
														<Form.Control
															type="text"
															required
															placeholder=" "
															ref={autocompleteRef2}
															name="businessAddress"
															className={`formControlStep2 required mainS4 ${!isEditing ? 'disableInput' : ''}`}
															// defaultValue={userData?.businessAddress}
															value={userData?.businessAddress}
															readOnly={!isEditing}
															onChange={handleChange}
														/>
														<label for="name" className="ProfileLables">
															Business Address
														</label>
														<small className="responsiveFontLarge d-none text-danger ms-2 error">
															Please Enter Your Business Address
														</small>
													</Form.Group>
												</Row>)
										}
									</>
									: ''}

								{
									isEditing ?
										(<Row className="">
											<Form.Group
												as={Col}
												className="left-inner-addon input-container required"
											>
												<div className="d-flex">
													{/* <Col className="col-lg-5 ps-0"> */}
													<i className="purpleText main fa fa-mobile "></i>

													<Form.Control
														type="text"
														defaultValue={userData?.phoneCode}
														// placeholder=""
														readOnly
														className={`inputMobilecode countrycode formcontroll22 `}
													/>
													<Form.Control
														type="text"
														required
														name="phone"
														onChange={(e) => {
															let values = e.target.value
															const newValue = values.replace(/[^0-9]/g, '')
															if (newValue.length <= 14) {
																setUpdateUserDetails((prevState) => ({
																	...prevState,
																	phone: newValue
																}))
															}
														}}
														value={updateUserDetails?.phone}
														readOnly={!isEditing}
														// placeholder=""
														className={`inputMobilenum inputmobile formcontroll33 phone required ps-0 `}
													/>
													<label for="name" className="ProfileLables">
														Mobile
													</label>
												</div>
												<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
													Please Enter Your Phone Number
												</small>
											</Form.Group>
										</Row>)
										:
										(<Row className="">
											<Form.Group
												as={Col}
												className="left-inner-addon input-container required"
											>
												<div className="d-flex">
													{/* <Col className="col-lg-5 ps-0"> */}
													<i className="purpleText main fa fa-mobile "></i>

													<Form.Control
														type="text"
														defaultValue={userData?.phoneCode}
														// placeholder=""
														readOnly
														className={`inputMobilecode countrycode formcontroll22 `}
													/>
													<Form.Control
														type="text"
														required
														name="phone"
														value={userData?.phone}
														readOnly={!isEditing}
														// placeholder=""
														className={`inputMobilenum inputmobile formcontroll33 phone required ps-0 `}
													/>
													<label for="name" className="ProfileLables">
														Mobile
													</label>
												</div>
												<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
													Please Enter Your Phone Number
												</small>
											</Form.Group>
										</Row>)
								}
							</Form>
						</Row>
					</div>

					<div className={`${userData && userData.roleId == 3 ? 'd-block' : 'd-none'}`} id="B_Business">
						{userData && userData?.businessDetails !== null && (
							<div className="personalDetails py-4">
								<div className="d-flex justify-content-between">
              <span className="bolder text-black d-flex">Business Details
								{RequireError === 1 || RequireError === 4 ? (
									<span className="text-danger d-block">
                      * required (Before sendmoney please fill kyc details by click on <u><span className="pointer"
																																																onClick={(e) => {
																																																	if (EditEnable == false) {
																																																		handleBusinessONClick(e)
																																																	}
																																																}}>Edit</span></u>)
                    </span>
								) : (
									<span className="d-none">
                      * required (<u>Before sendmoney please fill kyc details by click on <span>Edit</span></u>)
                    </span>
								)}
                </span>

									<div className="d-flex">
										{!isEditing4 ? (
											<div className="pointer" onClick={() => handleBusinessEdit()}>
												<i className="fa fa-pencil purpleText"></i>{' '}
												<small
													className="responsiveFontLarge  purpleText bolder"

												>
													Edit
												</small>
											</div>
										) : (
											<>
												<small
													className="responsiveFontLarge me-2 pointer CancleBUtton px-3 purpleText bolder"
													onClick={() => {
														setIsEditing4(false)
														setEditEnable(false)
													}}
												>
													Cancel
												</small>
												<div className="pointer" onClick={() => handleSubmit('B_Business')}>
													<i className="fa fa-pencil purpleText"></i>{' '}
													<small
														className="responsiveFontLarge  purpleText bolder"

													>
														Update
													</small>
												</div>
											</>
										)}
									</div>
								</div>

								{/* <Form> */}
								<Row className="innerForm mt-2">
									<Form className="mt-3" id="Signup_Step1">
										{isEditing4 ? (
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container required"
												>
													<i className="purpleText main fa fa-industry "></i>
													<Form.Select
														required
														name="companyName"
														className="mainStep5Select required form-input mainS4"
														value={updateBusinessDetails?.companyName}
														onChange={handleBusinessChange}
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
													<label for="name" className="ProfileLables">
														Company Type
													</label>
													<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
														Full Name
													</small>
												</Form.Group>
											</Row>
										) : (
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container required"
												>
													<i className="purpleText main fa fa-industry "></i>
													<Form.Control
														type="text"
														required
														// placeholder="company name"
														name="companyName"
														className="formControlStep2 mainS4 "
														value={userData?.businessDetails?.companyName}
														readOnly={!isEditing4}
													/>
													<label for="name" className="ProfileLables">
														Company Type
													</label>
													<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
														Please Enter Your Full Name
													</small>
												</Form.Group>
											</Row>
										)}

										{
											isEditing4 ?
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-users "></i>
														<Form.Control
															type="number"
															required
															// placeholder="Number Of Director"
															name="noDirector"
															disabled={isEditing4}
															className="formControlStep2 required mainS4 "
															defaultValue={userData?.businessDetails?.noDirector}
															readOnly={!isEditing4}
															onChange={handleBusinessChange}
														/>
														{isEditing4 && <div onClick={() => {
															setFormPopup(true)
														}}>
															<i className="purpleText eye-icon fa fa-pen"/>
															{/* <FontAwesomeIcon className='purpleText eye-icon' icon={faPen} /> */}
														</div>
														}
														<label for="name" className="ProfileLables">
															Number Of Director
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Number Of Director
														</small>
													</Form.Group>
												</Row>)
												:
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-users "></i>
														<Form.Control
															type="number"
															required
															// placeholder="Number Of Director"
															name="noDirector"
															disabled={isEditing4}
															className="formControlStep2 required mainS4 "
															value={userData?.businessDetails?.noDirector}
															readOnly={!isEditing4}
														/>
														{isEditing4 && <div onClick={() => {
															setFormPopup(true)
														}}>
															<i className="purpleText eye-icon fa fa-pen"/>
															{/* <FontAwesomeIcon className='purpleText eye-icon' icon={faPen} /> */}
														</div>
														}
														<label for="name" className="ProfileLables">
															Number Of Director
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Number Of Director
														</small>
													</Form.Group>
												</Row>)
										}

										{/* {
                  isEditing4 ?
                  (<Row className="">
                    <Form.Group
                      as={Col}
                      className="left-inner-addon input-container required"
                    >
                      <i className="purpleText main fa fa-users "></i>
                      <Form.Control
                        type="number"
                        required
                        // placeholder="Number Of Director"
                        name="noDirector"
                        disabled={isEditing4}
                        className="formControlStep2 required mainS4 "
                        defaultValue={userData?.businessDetails?.noDirector}
                        readOnly={!isEditing4}
                        onChange={handleBusinessChange}
                      />
                      {isEditing4 && <div onClick={()=>{setFormPopup(true)}}>
                        <i className='purpleText eye-icon fa fa-pen' />
                      </div>
                      }
                      <label for="name" className="ProfileLables">
                        Number Of Director
                      </label>
                      <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                        Please Enter Your Number Of Director
                      </small>
                    </Form.Group>
                  </Row>)
                  :
                  (<Row className="">
                    <Form.Group
                      as={Col}
                      className="left-inner-addon input-container required"
                    >
                      <i className="purpleText main fa fa-users "></i>
                      <Form.Control
                        type="number"
                        required
                        // placeholder="Number Of Director"
                        name="noDirector"
                        disabled={isEditing4}
                        className="formControlStep2 required mainS4 "
                        value={userData?.businessDetails?.noDirector}
                        readOnly={!isEditing4}
                      />
                      {isEditing4 && <div onClick={()=>{setFormPopup(true)}}>
                        <i className='purpleText eye-icon fa fa-pen' />
                      </div>
                      }
                      <label for="name" className="ProfileLables">
                        Number Of Director
                      </label>
                      <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                        Please Enter Your Number Of Director
                      </small>
                    </Form.Group>
                  </Row>)
                } */}

										{
											isEditing4 ?
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-users "></i>
														<Form.Control
															type="number"
															required
															// placeholder="Number Of Shareholder"
															disabled={isEditing4}
															name="noShareholder"
															className="formControlStep2 required mainS4 "
															defaultValue={userData?.businessDetails?.noShareholder}
															readOnly={!isEditing4}
															onChange={handleBusinessChange}
														/>
														{isEditing4 && <div onClick={() => {
															setShareholderFormPopup(true)
														}}>
															<i className="purpleText eye-icon fa fa-pen"/>
														</div>}
														<label for="name" className="ProfileLables">
															Number Of Shareholder
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Number Of Shareholder
														</small>
													</Form.Group>
												</Row>)
												:
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-users "></i>
														<Form.Control
															type="number"
															required
															// placeholder="Number Of Shareholder"
															disabled={isEditing4}
															name="noShareholder"
															className="formControlStep2 required mainS4 "
															value={userData?.businessDetails?.noShareholder}
															readOnly={!isEditing4}
														/>
														{isEditing4 && <div onClick={() => {
															setShareholderFormPopup(true)
														}}>
															<i className="purpleText eye-icon fa fa-pen"/>
														</div>}
														<label for="name" className="ProfileLables">
															Number Of Shareholder
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Number Of Shareholder
														</small>
													</Form.Group>
												</Row>)
										}


										{isEditing4 ? (
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container required"
												>
													<i className="purpleText main fa fa-user "></i>
													<Form.Select
														required
														name="noEmployee"
														className="mainStep5Select required form-input mainS4"
														value={updateBusinessDetails?.noEmployee == '' ? userData?.businessDetails?.noEmployee : updateBusinessDetails?.noEmployee}
														// readOnly={!isEditing4}
														onChange={handleBusinessChange}
													>
														<option value="">No of employees</option>
														<option value="1">1</option>
														<option value="2-9">2-9</option>
														<option value="10-19">10-19</option>
														<option value="20-50">20-50</option>
														<option value="50+">50+</option>
													</Form.Select>
													<label for="name" className="ProfileLables">
														No of employees
													</label>
													<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
														Please Enter No of employees
													</small>
												</Form.Group>
											</Row>
										) : (
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container required"
												>
													<i className="purpleText main fa fa-users "></i>
													<Form.Control
														type="text"
														required
														// placeholder="Number Of Employee"
														name="noEmployee"
														className="formControlStep2 mainS4 "
														value={userData?.businessDetails?.noEmployee}
														readOnly={!isEditing4}
														// onChange={handleBusinessChange}
													/>
													<label for="name" className="ProfileLables">
														Number Of Employee
													</label>
												</Form.Group>
											</Row>
										)}

										{isEditing4 ? (
											<>
												<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-industry "></i>
														<Form.Select
															required
															name="industryType"
															className="mainStep5Select required form-input mainS4"
															value={updateBusinessDetails?.industryType == '' ? userData?.businessDetails?.industryType : updateBusinessDetails?.industryType}
															onChange={(e) => {
																handleBusinessChange(e)
																handleOther(e)
															}}
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
														<label for="name" className="ProfileLables">
															Industry Type
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Number Of Employee Industry Type
														</small>
													</Form.Group>
												</Row>

												<Row className={`mb-3 respoChildFooter ${OtherTextFieldVisible == true ? 'd-block' : 'd-none'}`}
														 id="OtherField">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container"
													>
														<i className="orangeText main fas fa-building"></i>
														<Form.Control
															onChange={handleBusinessChange}
															name="industryType"
															type="text"
															// placeholder="Other Industry Type"
															className="formcontrol orangeForm number2 mainS4"
														/>
														<label htmlFor="name" className="ProfileLables">
															Industry type
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Industry Type
														</small>
													</Form.Group>
												</Row>
											</>
										) : (
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container required"
												>
													<i className="purpleText main fa fa-industry "></i>
													<Form.Control
														type="text"
														required
														// placeholder="Industry Type"
														name="industryType"
														className="formControlStep2 mainS4 "
														value={userData?.businessDetails?.industryType}
														readOnly={!isEditing4}
													/>
													<label for="name" className="ProfileLables">
														Industry Type
													</label>
													<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
														Full Name
													</small>
												</Form.Group>
											</Row>
										)}

										{
											isEditing4 ?
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-credit-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="Target Market"
															name="targetBusiness"
															className="formControlStep2 required mainS4 "
															defaultValue={userData?.businessDetails?.targetBusiness}
															readOnly={!isEditing4}
															onChange={(e) => {
																let values = e.target.value
																const newValue = values.replace(/[^a-zA-Z\s]/g, '')
																setUpdateBusinessDetails((prevState) => ({
																	...prevState,
																	targetBusiness: newValue
																}))
															}}
														/>
														<label for="name" className="ProfileLables">
															Target Market
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Target Market
														</small>
													</Form.Group>
												</Row>)
												:
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-credit-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="Target Market"
															name="targetBusiness"
															className="formControlStep2 required mainS4 "
															value={userData?.businessDetails?.targetBusiness}
															readOnly={!isEditing4}
														/>
														<label for="name" className="ProfileLables">
															Target Market
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Target Market
														</small>
													</Form.Group>
												</Row>)
										}

										{
											isEditing4 ?
												(
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container required"
														>
															<i className="purpleText main fa fa-credit-card "></i>
															<Form.Control
																type="text"
																required
																// // placeholder="Expected remittance volume (AUD)/sending currency per year"
																name="expectedRemittance"
																className="formControlStep2 required mainS4 "
																defaultValue={userData?.businessDetails?.expectedRemittance}
																readOnly={!isEditing4}
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
																	setUpdateBusinessDetails((prevState) => ({
																		...prevState,
																		expectedRemittance: cleanedValue
																	}))
																}}
															/>
															<label for="name" className="ProfileLables">
																Expected remittance volume ({UserCurrency})/sending currency per year
															</label>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Your Expected remittance volume ({UserCurrency})/sending currency per year
															</small>
														</Form.Group>
													</Row>
												)
												:
												(
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container required"
														>
															<i className="purpleText main fa fa-credit-card "></i>
															<Form.Control
																type="text"
																required
																// placeholder="Expected remittance volume (AUD)/sending currency per year"
																name="expectedRemittance"
																className="formControlStep2 required mainS4 "
																value={userData?.businessDetails?.expectedRemittance}
																readOnly={!isEditing4}
															/>
															<label for="name" className="ProfileLables">
																Expected remittance volume ({UserCurrency})/sending currency per year
															</label>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Your Expected remittance volume ({UserCurrency})/sending currency per year
															</small>
														</Form.Group>
													</Row>
												)
										}

										{
											isEditing4 ?
												(
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container required"
														>
															<i className="purpleText main fa fa-credit-card "></i>
															<Form.Control
																type="text"
																required
																// placeholder="Expected remittance volume (AUD)/sending currency per year"
																name="expectedRemittance"
																className="formControlStep2 required mainS4 "
																defaultValue={userData?.businessDetails?.expectedRemittance}
																readOnly={!isEditing4}
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
																	setUpdateBusinessDetails((prevState) => ({
																		...prevState,
																		expectedRemittance: cleanedValue
																	}))
																}}
															/>
															<label for="name" className="ProfileLables">
																Expected remittance volume ({UserCurrency})/sending currency per year
															</label>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Your Expected remittance volume ({UserCurrency})/sending currency per year
															</small>
														</Form.Group>
													</Row>
												)
												:
												(
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container required"
														>
															<i className="purpleText main fa fa-credit-card "></i>
															<Form.Control
																type="text"
																required
																// placeholder="Expected remittance volume (AUD)/sending currency per year"
																name="expectedRemittance"
																className="formControlStep2 required mainS4 "
																value={userData?.businessDetails?.expectedRemittance}
																readOnly={!isEditing4}
															/>
															<label for="name" className="ProfileLables">
																Expected remittance volume ({UserCurrency})/sending currency per year
															</label>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Your Expected remittance volume ({UserCurrency})/sending currency per year
															</small>
														</Form.Group>
													</Row>
												)
										}

										{
											isEditing4 ?
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-credit-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="Expected No of transaction per year"
															name="noOfTranscation"
															className="formControlStep2 required mainS4"
															defaultValue={updateBusinessDetails.noOfTranscation == '' ? userData?.businessDetails?.noOfTranscation : updateBusinessDetails.noOfTranscation}
															readOnly={!isEditing4}
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
																setUpdateBusinessDetails((prevState) => ({
																	...prevState,
																	noOfTranscation: cleanedValue
																}))
															}}
														/>
														<label for="name" className="ProfileLables">
															Expected No of transaction per year
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Expected No of transaction per year
														</small>
													</Form.Group>
												</Row>)
												:
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-credit-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="Expected No of transaction per year"
															name="noOfTranscation"
															className="formControlStep2 required mainS4"
															value={userData?.businessDetails?.noOfTranscation}
															readOnly={!isEditing4}
															onChange={(e) => {
																let values = e.target.value
																const newValue = values.replace(/[^0-9]/g, '')
																setUpdateBusinessDetails((prevState) => ({
																	...prevState,
																	noOfTranscation: newValue
																}))
															}}
														/>
														<label for="name" className="ProfileLables">
															Expected No of transaction per year
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Expected No of transaction per year
														</small>
													</Form.Group>
												</Row>)
										}

										{
											isEditing4 ?
												(
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container required"
														>
															<i className="purpleText main fa fa-globe "></i>
															<Form.Control
																type="text"
																required
																// placeholder="Website"
																name="website"
																className="formControlStep2 website mainS4"
																defaultValue={userData?.businessDetails?.website}
																readOnly={!isEditing4}
																onChange={handleBusinessChange}
															/>
															<label for="name" className="ProfileLables">
																website
															</label>
															<small className="responsiveFontLarge d-none text-danger ms-2 web_error_message">
																Please Enter Your website
															</small>
														</Form.Group>
													</Row>
												)
												:
												(
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container required"
														>
															<i className="purpleText main fa fa-globe "></i>
															<Form.Control
																type="text"
																required
																// placeholder="Website"
																name="website"
																className="formControlStep2 website mainS4"
																value={userData?.businessDetails?.website}
																readOnly={!isEditing4}
															/>
															<label for="name" className="ProfileLables">
																website
															</label>
															<small className="responsiveFontLarge d-none text-danger ms-2 web_error_message">
																Please Enter Your website
															</small>
														</Form.Group>
													</Row>
												)
										}

									</Form>
								</Row>
							</div>
						)}
					</div>

					<div className={`${userData && userData.roleId == 4 ? 'd-block' : 'd-none'}`} id="A_Business">
						{userData && userData?.businessDetails !== null && (
							<div className="personalDetails py-4">
								<div className="d-flex justify-content-between">
									<span className="bolder text-black">Business Details</span>
									<div className="d-flex">
										{!isEditing4 ? (
											<div className="pointer" onClick={() => handleBusinessEdit()}>
												<i className="fa fa-pencil purpleText"></i>{' '}
												<small
													className="responsiveFontLarge  purpleText bolder"

												>
													Edit
												</small>
											</div>
										) : (
											<>
												<small
													className="responsiveFontLarge me-2 pointer CancleBUtton px-3 purpleText bolder"
													onClick={() => {
														setIsEditing4(false)
													}}
												>
													Cancel
												</small>
												<div className="pointer" onClick={() => handleSubmit('A_Business')}>
													<i className="fa fa-pencil purpleText"></i>{' '}
													<small
														className="responsiveFontLarge  purpleText bolder"

													>
														Update
													</small>
												</div>
											</>
										)}
									</div>
								</div>

								{/* <Form> */}
								<Row className="innerForm mt-2">
									<Form className="mt-3" id="Signup_Step1">
										{
											isEditing4 ?

												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-industry "></i>
														<Form.Control
															type="text"
															required
															// placeholder="Business name"
															name="typeBusiness"
															className="formControlStep2 required mainS4 "
															defaultValue={userData?.businessDetails?.typeBusiness}
															readOnly={!isEditing4}
															onChange={handleBusinessChange}
														/>
														<label for="name" className="ProfileLables">
															Business Name
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Business Name
														</small>
													</Form.Group>
												</Row>)
												:
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-industry "></i>
														<Form.Control
															type="text"
															required
															// placeholder="Business name"
															name="typeBusiness"
															className="formControlStep2 required mainS4 "
															value={userData?.businessDetails?.typeBusiness}
															readOnly={!isEditing4}
														/>
														<label for="name" className="ProfileLables">
															Business Name
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Business Name
														</small>
													</Form.Group>
												</Row>)
										}

										{
											isEditing4 ?

												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-credit-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="ABN"
															name="abn"
															className="formControlStep2 required mainS4 "
															defaultValue={updateBusinessDetails.abn == '' ? userData?.businessDetails?.abn : updateBusinessDetails.abn}
															readOnly={!isEditing4}
															onChange={(e) => {
																let values = e.target.value
																const newValue = values.replace(/[^0-9]/g, '')
																setUpdateBusinessDetails((prevState) => ({
																	...prevState,
																	abn: newValue
																}))
															}}
														/>
														<label for="name" className="ProfileLables">
															ABN
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your ABN
														</small>
													</Form.Group>
												</Row>)
												:
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-credit-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="ABN"
															name="abn"
															className="formControlStep2 required mainS4 "
															defaultValue={userData?.businessDetails?.abn}
															readOnly={!isEditing4}
														/>
														<label for="name" className="ProfileLables">
															ABN
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your ABN
														</small>
													</Form.Group>
												</Row>)
										}
										{/* {isEditing4 ? (
                  <Row className="">
                  <Form.Group
                      as={Col}
                      className="left-inner-addon input-container required"
                    >
                      <i className="purpleText main fa fa-industry "></i>
                      <Form.Select
                        required
                        name="companyName"
                        className="mainStep5Select required form-input mainS4"
                        value={userData?.businessDetails?.companyName}
                        readOnly={!isEditing4}
                        onChange={handleBusinessChange}
                      >
                        <option value="14">Austalia</option>
                        <option value="154">Nepal</option>

                      </Form.Select>
                      <label for="name" className="ProfileLables">
                        Country of Business Registration
                      </label>
                      <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                        Country of Business Registration
                      </small>
                    </Form.Group>
                  </Row>
                  ) : (
                  <Row className="">
                    <Form.Group
                      as={Col}
                      className="left-inner-addon input-container required"
                    >
                      <i className="purpleText main fa fa-industry "></i>
                      <Form.Control
                        type="text"
                        required
                        // placeholder="Country of Business Registration"
                        name="companyName"
                        className="formControlStep2 required mainS4 "
                        defaultValue={userData?.businessDetails?.companyName}
                        readOnly={!isEditing4}
                        onChange={handleBusinessChange}
                      />
                      <label for="name" className="ProfileLables">
                        Country of Business Registration
                      </label>
                      <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                        Country of Business Registration
                      </small>
                    </Form.Group>
                  </Row>
                  )} */}

										{
											isEditing4 ?

												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-address-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="Business Address"
															ref={autocompleteRef3}
															name="businessAddress"
															className={`formControlStep2 required mainS4 ${!isEditing4 ? 'disableInput' : ''}`}
															// defaultValue={
															//   userData?.businessDetails?.businessAddress
															// }
															value={updateBusinessDetails?.businessAddress}
															readOnly={!isEditing4}
															onChange={handleBusinessChange}
														/>
														<label for="name" className="ProfileLables">
															Business Address
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Business Address
														</small>
													</Form.Group>
												</Row>)
												:
												(
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container required"
														>
															<i className="purpleText main fa fa-address-card "></i>
															<Form.Control
																type="text"
																required
																// placeholder="Business Address"
																ref={autocompleteRef3}
																name="businessAddress"
																className={`formControlStep2 required mainS4 ${!isEditing4 ? 'disableInput' : ''}`}
																value={userData?.businessDetails?.businessAddress}
																readOnly={!isEditing4}
															/>
															<label for="name" className="ProfileLables">
																Business Address
															</label>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Your Business Address
															</small>
														</Form.Group>
													</Row>
												)

										}

										{
											isEditing4 ?

												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-credit-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="Target Market"
															name="targetBusiness"
															className="formControlStep2 required mainS4 "
															defaultValue={updateBusinessDetails.targetBusiness == '' ? userData?.businessDetails?.targetBusiness : updateBusinessDetails.targetBusiness}
															readOnly={!isEditing4}
															onChange={(e) => {
																let values = e.target.value
																const newValue = values.replace(/[^a-zA-Z\s]/g, '')
																setUpdateBusinessDetails((prevState) => ({
																	...prevState,
																	targetBusiness: newValue
																}))
															}}
														/>
														<label for="name" className="ProfileLables">
															Target Market
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Target Market
														</small>
													</Form.Group>
												</Row>)
												:
												(
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container required"
														>
															<i className="purpleText main fa fa-credit-card "></i>
															<Form.Control
																type="text"
																required
																// placeholder="Target Market"
																name="targetBusiness"
																className="formControlStep2 required mainS4 "
																defaultValue={userData?.businessDetails?.targetBusiness}
																readOnly={!isEditing4}
															/>
															<label for="name" className="ProfileLables">
																Target Market
															</label>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Your Target Market
															</small>
														</Form.Group>
													</Row>
												)
										}

										{
											isEditing4 ?
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-credit-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="No of years in current business"
															name="volumeYear"
															className="formControlStep2 required mainS4 "
															value={updateBusinessDetails.volumeYear == '' ? userData?.businessDetails?.volumeYear : updateBusinessDetails.volumeYear}
															readOnly={!isEditing4}
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
																setUpdateBusinessDetails((prevState) => ({
																	...prevState,
																	volumeYear: cleanedValue
																}))
															}}
														/>
														<label for="name" className="ProfileLables">
															No of years in current business
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your No of years in current business
														</small>
													</Form.Group>
												</Row>)
												:
												(
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container required"
														>
															<i className="purpleText main fa fa-credit-card "></i>
															<Form.Control
																type="text"
																required
																// placeholder="No of years in current business"
																name="volumeYear"
																className="formControlStep2 required mainS4 "
																value={userData?.businessDetails?.volumeYear}
																readOnly={!isEditing4}
															/>
															<label for="name" className="ProfileLables">
																No of years in current business
															</label>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Your No of years in current business
															</small>
														</Form.Group>
													</Row>
												)
										}

										{
											isEditing4 ?
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-credit-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="Expected remittance volume (AUD)/sending currency per year"
															name="expectedRemittance"
															className="formControlStep2 required mainS4 "
															defaultValue={updateBusinessDetails.expectedRemittance == '' ? userData?.businessDetails?.expectedRemittance : updateBusinessDetails.expectedRemittance}
															readOnly={!isEditing4}
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
																setUpdateBusinessDetails((prevState) => ({
																	...prevState,
																	expectedRemittance: cleanedValue
																}))
															}}
														/>
														<label for="name" className="ProfileLables">
															Expected remittance volume ({UserCurrency})/sending currency per year
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Expected remittance volume ({UserCurrency})/sending currency per year
														</small>
													</Form.Group>
												</Row>)
												:
												(<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-credit-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="Expected remittance volume (AUD)/sending currency per year"
															name="expectedRemittance"
															className="formControlStep2 required mainS4 "
															defaultValue={userData?.businessDetails?.expectedRemittance}
															readOnly={!isEditing4}
														/>
														<label for="name" className="ProfileLables">
															Expected remittance volume ({UserCurrency})/sending currency per year
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Expected remittance volume ({UserCurrency})/sending currency per year
														</small>
													</Form.Group>
												</Row>)
										}

										{
											isEditing4 ?
												(
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container required"
														>
															<i className="purpleText main fa fa-credit-card "></i>
															<Form.Control
																type="text"
																required
																// placeholder="Expected No of transaction per year"
																name="noOfTranscation"
																className="formControlStep2 required mainS4"
																defaultValue={updateBusinessDetails.noOfTranscation == '' ? userData?.businessDetails?.noOfTranscation : updateBusinessDetails.noOfTranscation}
																readOnly={!isEditing4}
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
																	setUpdateBusinessDetails((prevState) => ({
																		...prevState,
																		noOfTranscation: cleanedValue
																	}))
																}}
															/>
															<label for="name" className="ProfileLables">
																Expected No of transaction per year
															</label>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Your Expected No of transaction per year
															</small>
														</Form.Group>
													</Row>
												) : (<Row className="">
													<Form.Group
														as={Col}
														className="left-inner-addon input-container required"
													>
														<i className="purpleText main fa fa-credit-card "></i>
														<Form.Control
															type="text"
															required
															// placeholder="Expected No of transaction per year"
															name="noOfTranscation"
															className="formControlStep2 required mainS4"
															value={userData?.businessDetails?.noOfTranscation}
															readOnly={!isEditing4}
														/>
														<label for="name" className="ProfileLables">
															Expected No of transaction per year
														</label>
														<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
															Please Enter Your Expected No of transaction per year
														</small>
													</Form.Group>
												</Row>)
										}

										{
											isEditing4 ?
												(
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container required"
														>
															<i className="purpleText main fa fa-globe "></i>
															<Form.Control
																type="text"
																required
																// placeholder="Website"
																name="website"
																className="formControlStep2 required mainS4"
																defaultValue={userData?.businessDetails?.website}
																readOnly={!isEditing4}
																onChange={handleBusinessChange}
															/>
															<label for="name" className="ProfileLables">
																website
															</label>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Your website
															</small>
														</Form.Group>
													</Row>
												) : (
													<Row className="">
														<Form.Group
															as={Col}
															className="left-inner-addon input-container"
														>
															<i className="purpleText main fa fa-globe "></i>
															<Form.Control
																type="text"
																required
																// placeholder="Website"
																name="website"
																className="formControlStep2 mainS4"
																value={userData?.businessDetails?.website}
																readOnly={!isEditing4}
															/>
															<label for="name" className="ProfileLables">
																website
															</label>
															<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
																Please Enter Your website
															</small>
														</Form.Group>
													</Row>
												)
										}

									</Form>
								</Row>
								{/* </Form> */}
							</div>
						)}
					</div>

					{/* KYC Details */}
					<div className="KYCDetails py-4" id="KYCDetails">
						<div className="d-flex justify-content-between">
              <span className="bolder text-black d-flex">KYC Details <span
								className={`text-danger ${RequireError === 1 ? 'd-block' : RequireError === 2 ? 'd-block' : 'd-none'}`}> * required (Before sendmoney please fill kyc details by click on <u><span
								className="pointer" onClick={(e) => {
								if (EditEnable == false) {
									handleKYCONClick(e)
								}
							}}>Edit</span></u>)</span></span>
							{/* <span className="bolder text-black">KYC Details</span> */}
							<div className="d-flex">
								{!isEditing2 ? (
									<div className="pointer" onClick={() => handleEditClick1()}>
										<i className="fa fa-pencil purpleText"></i>{' '}
										<small
											className="responsiveFontLarge  purpleText bolder"
										>
											Edit
										</small>
									</div>
								) : (
									<>
										<small
											className="responsiveFontLarge me-2 pointer CancleBUtton px-3 purpleText bolder"
											onClick={() => {
												setIsEditing2(false)
												setEditEnable(false)
											}}
										>
											Cancel
										</small>

										<div className="pointer" onClick={() => handleSubmit('KYCDetails')}>
											<i className="fa fa-pencil purpleText"></i>{' '}
											<small
												className="responsiveFontLarge  purpleText bolder"

											>
												Update
											</small>
										</div>
									</>
								)}
							</div>
						</div>
						{/* <Form> */}
						<Row className="innerForm mt-2">
							<Form className="mt-3" id="Signup_Step1">
								{isEditing2 ? (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container "
										>
											<i className="radiumText mainStep4 fas fa-landmark"></i>
											<Form.Select
												className="mainStep5Select required form-input mainS4 no-border"
												name="nationality"
												value={updatekycdetails?.nationality == '' ? userData?.userkycdetails?.nationality : updatekycdetails?.nationality}
												onChange={handleKYCChange}
											>
												<option value="">Nationality</option>
												{nationalityArray &&
													nationalityArray?.map((nationalityName, index) => {
															return (
																<option value={nationalityName.value}>
																	{nationalityName.label}
																</option>
															)
														}
													)
												}
											</Form.Select>
											<label for="name" className="ProfileLables">
												Nationality
											</label>
											<small className="responsiveFontLarge  d-none text-danger ms-2 error">
												Please Select Nationality
											</small>
										</Form.Group>
									</Row>
								) : (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fa fa-flag "></i>
											{/* {userData?.userkycdetails?.nationality == "Austrian" ? <img src={AusFlag} alt="countryfalg" className="main" style={{ height: "50px" }} ></img> :
                            <img src={IndiaFlag} alt="countryfalg" className="main" style={{ height: "50px" }} ></img>
                        } */}
											<Form.Control
												type="text"
												required
												// placeholder="nationality"
												name="nationality"
												className="formControlStep2  mainS4"
												value={userData?.userkycdetails?.nationality}
												readOnly={!isEditing2}
											/>
											<label for="name" className="ProfileLables">
												Nationality
											</label>
										</Form.Group>
									</Row>
								)}

								{isEditing2 ? (

									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fa fa-home "></i>
											<Form.Control
												type="text"
												//  ref={autocompleteRef}
												ref={autocompleteRef}
												required
												//  placeholder="House No & Street Name"
												name="streetName"
												className="formControlStep2 required mainS4 "
												// defaultValue={userData?.userkycdetails?.streetName}
												value={updatekycdetails?.streetName}
												//  value={StreetName}
												onChange={(e) => {
													handleKYCChange(e)
													setStreetName(e.target.value)
												}}
												readOnly={!isEditing2}
											/>
											<label for="name" className="ProfileLables">
												House No & Street Name
											</label>
											<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
												Please Enter Your House No & Street Name
											</small>
										</Form.Group>
									</Row>
								) : (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fa fa-home "></i>
											<Form.Control
												type="text"
												ref={autocompleteRef}
												required
												placeholder=""
												name="streetName"
												className="formControlStep2 required mainS4 disableInput"
												// defaultValue={updatekycdetails?.streetName == "" ? userData?.userkycdetails?.streetName : updatekycdetails?.streetName}
												value={userData?.userkycdetails?.streetName}
												onChange={handleKYCChange}
												readOnly={!isEditing2}
											/>
											<label for="name" className="ProfileLables">
												House No & Street Name
											</label>
											<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
												Please Enter Your House No & Street Name
											</small>
										</Form.Group>
									</Row>
								)}

								{
									isEditing2 ?
										(
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container"
												>
													<i className="purpleText main fa fa-map-marker"></i>
													<Form.Control
														type="text"
														required
														// placeholder="Suburb/City"
														name="suburb"
														defaultValue={updatekycdetails?.suburb == '' ? userData?.userkycdetails?.suburb : updatekycdetails?.suburb}
														className="formControlStep2 required mainS4"
														// defaultValue={userData?.userkycdetails?.suburb}
														readOnly={!isEditing2}
														onChange={handleKYCChange}
													/>
													<label for="name" className="ProfileLables">
														Subarb/City
													</label>
													<small className="responsiveFontLarge  d-none text-danger ms-2 error">
														Please Enter Your Suburb/City
													</small>

													{/* {errors.name && <p>{errors.name}</p>} */}
												</Form.Group>
											</Row>
										)
										:
										(
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container"
												>
													<i className="purpleText main fa fa-map-marker"></i>
													<Form.Control
														type="text"
														required
														// placeholder="Suburb/City"
														name="suburb"
														value={userData?.userkycdetails?.suburb}
														className="formControlStep2 required mainS4"
														// defaultValue={userData?.userkycdetails?.suburb}
														readOnly={!isEditing2}
													/>
													<label for="name" className="ProfileLables">
														Subarb/City
													</label>
													<small className="responsiveFontLarge  d-none text-danger ms-2 error">
														Please Enter Your Suburb/City
													</small>

													{/* {errors.name && <p>{errors.name}</p>} */}
												</Form.Group>
											</Row>
										)
								}


								{
									isEditing2 ?
										(
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container"
												>
													<i className="purpleText main fa fa-envelope"></i>
													<Form.Control
														type="text"
														required
														// placeholder="Postal / Zip Code"
														name="postalCode"
														className="formControlStep2 required mainS4"
														// defaultValue={userData?.userkycdetails?.postalCode}
														defaultValue={updatekycdetails?.postalCode == '' ? userData?.userkycdetails?.postalCode : updatekycdetails?.postalCode}
														readOnly={!isEditing2}
														onChange={handleKYCChange}
													/>
													<label for="name" className="ProfileLables">
														Postal / Zip Code
													</label>
													<small className="responsiveFontLarge  d-none text-danger ms-2 error">
														Please Enter Your Postal / Zip Code
													</small>

													{/* {errors.name && <p>{errors.name}</p>} */}
												</Form.Group>
											</Row>
										)
										:
										(
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container"
												>
													<i className="purpleText main fa fa-envelope"></i>
													<Form.Control
														type="text"
														required
														// placeholder="Postal / Zip Code"
														name="postalCode"
														className="formControlStep2 required mainS4"
														// defaultValue={userData?.userkycdetails?.postalCode}
														value={userData?.userkycdetails?.postalCode}
														readOnly={!isEditing2}
													/>
													<label for="name" className="ProfileLables">
														Postal / Zip Code
													</label>
													<small className="responsiveFontLarge  d-none text-danger ms-2 error">
														Please Enter Your Postal / Zip Code
													</small>

													{/* {errors.name && <p>{errors.name}</p>} */}
												</Form.Group>
											</Row>
										)
								}


								{isEditing2 ? (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container "
										>
											<i className="purpleText main fa fa-map-marker"></i>
											<Form.Select
												className=" mainStep5Select required mainS4 no-border"
												name="stateId"
												id="select1"
												value={updatekycdetails?.stateId == '' ? userData?.userkycdetails?.stateId : updatekycdetails?.stateId}
												onChange={handleKYCChange}
											>
												<option
													value={userData?.userkycdetails?.stateId != '' ? userData?.userkycdetails?.stateId : ''}>{userData?.userkycdetails?.stateId != '' ? selectedStateId : 'State'}</option>
												{getState &&
													getState.map((state, Index) => {
														return (
															<option value={state.id} key={state.id}>
																{state?.name}
															</option>
														)
													})}
											</Form.Select>
											<label for="name" className="ProfileLables">
												State
											</label>

											<small className="responsiveFontLarge d-none text-danger ms-2 error">
												Please Enter Your State
											</small>
										</Form.Group>
									</Row>
								) : (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fa fa-map-marker"></i>
											<Form.Control
												type="text"
												required
												// placeholder="State"
												name="Referal"
												className="formControlStep2  mainS4"
												value={userData?.userkycdetails?.stateName}
												readOnly={!isEditing2}
											/>
											<label for="name" className="ProfileLables">
												State
											</label>
											<small className="responsiveFontLarge d-none text-danger ms-2">
												state
											</small>
										</Form.Group>
									</Row>
								)}

								{isEditing2 ? (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container "
										>
											<i className="blueText mainStep3 fa fa-briefcase mainS4 no-border"></i>
											<Form.Select
												className="mainStep5Select required mainS4"
												name="occupationId"
												onChange={handleKYCChange}
											>
												<option
													value={userData?.userkycdetails?.occupationId != '' ? userData?.userkycdetails?.occupationId : ''}>
													{userData?.userkycdetails?.occupationId != '' ? userData?.userkycdetails?.occupationName : 'Occupation'}
												</option>
												:""
												{Occupation &&
													Occupation?.map((occupation, index) => {
														return (
															<>
																<option value={occupation.id}>
																	{occupation.name}
																</option>
															</>
														)
													})}
											</Form.Select>
											<label for="name" className="ProfileLables">
												Occupation
											</label>
											<small className="responsiveFontLarge  d-none text-danger ms-2 error">
												Please Select Occupation
											</small>
										</Form.Group>
									</Row>
								) : (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container"
										>
											<i className="purpleText main fa fa-briefcase"></i>
											<Form.Control
												type="text"
												required
												// placeholder="Occupation"
												name="Referal"
												className="formControlStep2  mainS4"
												value={userData?.userkycdetails?.occupationName}
												readOnly={!isEditing2}
											/>
											<label for="name" className="ProfileLables">
												Occupation
											</label>
										</Form.Group>
									</Row>
								)}

								{/*{isEditing2 ? (*/}
								{/*	<Row className="">*/}
								{/*		<Form.Group*/}
								{/*			as={Col}*/}
								{/*			className="left-inner-addon input-container required"*/}
								{/*		>*/}
								{/*			<i className="purpleText main fa fa-map-marker"></i>*/}
								{/*			<Form.Select*/}
								{/*				required*/}
								{/*				name="isResidence"*/}
								{/*				className="mainStep5Select required form-input mainS4"*/}
								{/*				value={updatekycdetails?.isResidence}*/}
								{/*				onChange={handleKYCChange}*/}
								{/*			>*/}
								{/*				<option value="" disabled>*/}
								{/*					Is Residence of ({ResidenseCountry})*/}
								{/*				</option>*/}
								{/*				<option value="Yes">Yes</option>*/}
								{/*				<option value="No">No</option>*/}
								{/*			</Form.Select>*/}
								{/*			<label for="name" className="ProfileLables">*/}
								{/*				Is Residence of ({ResidenseCountry})*/}
								{/*			</label>*/}
								{/*			<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">*/}
								{/*				Please Enter Your Is Residence of ({ResidenseCountry})*/}
								{/*			</small>*/}
								{/*		</Form.Group>*/}
								{/*	</Row>*/}
								{/*) : (*/}
								{/*	<Row className="">*/}
								{/*		<Form.Group*/}
								{/*			as={Col}*/}
								{/*			className="left-inner-addon input-container"*/}
								{/*		>*/}
								{/*			<i className="purpleText main fa fa-map-marker"></i>*/}
								{/*			<Form.Control*/}
								{/*				type="text"*/}
								{/*				required*/}
								{/*				// placeholder={`Is Residence of (${ResidenseCountry})`}*/}
								{/*				name="isResidence"*/}
								{/*				className="formControlStep2 required mainS4"*/}
								{/*				value={userData?.userkycdetails?.isResidence == true ? 'Yes' : 'No'}*/}
								{/*				readOnly={!isEditing2}*/}
								{/*			/>*/}
								{/*			<label for="name" className="ProfileLables">*/}
								{/*				Is Residence of ({ResidenseCountry})*/}
								{/*			</label>*/}
								{/*			<small className="responsiveFontLarge d-none text-danger ms-2 error">*/}
								{/*				Please Enter Your Is Residence of ({ResidenseCountry})*/}
								{/*			</small>*/}
								{/*		</Form.Group>*/}
								{/*	</Row>*/}
								{/*)}*/}
							</Form>
						</Row>
					</div>

					<div className="KYCDetails py-4" id="ID_Details">
						<div className="d-flex justify-content-between">
              <span className="bolder text-black d-flex">ID Details <span
								className={`text-danger ${RequireError === 1 ? 'd-block' : RequireError === 3 ? 'd-block' : 'd-none'}`}> * required (Before sendmoney please fill kyc details by click on <u><span
								className="pointer" onClick={(e) => {
								if (EditEnable == false) {
									handleIDDetailsONClick(e)
								}
							}}>Edit</span></u>)</span></span>
							<div className="d-flex">
								{!isEditing3 ? (
									<div className="pointer" onClick={() => handleEditClick3()}>
										<i className="fa fa-pencil purpleText"></i>{' '}
										<small
											className="responsiveFontLarge  purpleText bolder"
										>
											Edit
										</small>
									</div>
								) : (
									<>
										<small
											className="responsiveFontLarge me-2 pointer CancleBUtton px-3 purpleText bolder"
											onClick={() => {
												setIsEditing3(false)
												setEditEnable(false)
											}}
										>
											Cancel
										</small>

										<div className="pointer" onClick={() => handleSubmit('ID_Details')}>
											<i className="fa fa-pencil purpleText"></i>{' '}
											<small
												className="responsiveFontLarge  purpleText bolder"
											>
												Update
											</small>
										</div>
									</>
								)}
							</div>
						</div>
						{/* <Form> */}
						<Row className="innerForm mt-2">
							<Form className="mt-3" id="Signup_Step1">
								{isEditing3 ? (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container "
										>
											<i className="purpleText mainStep4 fas fa-landmark"></i>
											<Form.Select
												className="mainStep5Select required form-input mainS4"
												name="issuingAuthority"
												value={updateIdDetails?.issuingAuthority == '' ? userData?.iddetails?.issuingAuthority : updateIdDetails?.issuingAuthority}
												onChange={handleIdChange}
											>
												<option value="">ID Issuing Authority</option>
												{IdAuthority &&
													IdAuthority?.map((IdAuthorityName, index) => {
														return (
															<option value={IdAuthorityName.authorityName}>
																{IdAuthorityName.authorityName}
															</option>
														)
													})}
												{IdAuthoritySubtype &&
													IdAuthoritySubtype?.map(
														(IdAuthoritySubName, index) => {
															return (
																<>
																	<option
																		value={IdAuthoritySubName.authorityName}
																	>
																		{IdAuthoritySubName.authorityName}
																	</option>
																</>
															)
														}
													)}
											</Form.Select>
											<label for="name" className="ProfileLables">
												ID Issuing Authority
											</label>
											<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
												Please Select ID Issuing Authority
											</small>
										</Form.Group>
									</Row>
								) : (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fas fa-landmark"></i>
											<Form.Control
												type="text"
												required
												// placeholder="ID Issuing Authority"
												name="issuingAuthority"
												className="formControlStep2 mainS4"
												value={userData?.iddetails?.issuingAuthority}
												readOnly={!isEditing3}
											/>
											<label for="name" className="ProfileLables">
												ID Issuing Authority
											</label>
											<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
												ID Issuing Authority
											</small>
										</Form.Group>
									</Row>
								)}

								{
									isEditing3 ?
										(<Row className="">
											<Form.Group
												as={Col}
												className="left-inner-addon input-container "
											>
												<i className="purpleText mainStep4 fa fa-id-card "></i>
												<Form.Select
													className={`mainStep5Select required mainS4
                        ${isEditing3 ? 'enableInput'
														: 'disableInput'}`}
													name="typeId"
													onChange={handleIdChange}
													value={updateIdDetails?.typeId == '' ? userData?.iddetails?.typeId : updateIdDetails?.typeId}
												>
													<option value="">ID Type</option>
													{
														Idtypes && Idtypes.map((ID) => {
															return (<option value={ID.id}>{ID.name}</option>)
														})
													}
												</Form.Select>
												<label for="name" className="ProfileLables">
													ID Type
												</label>
												<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
													Please Enter The ID Type
												</small>
											</Form.Group>
										</Row>)
										:
										(<Row className="">
											<Form.Group
												as={Col}
												className="left-inner-addon input-container "
											>
												<i className="purpleText mainStep4 fa fa-id-card "></i>

												<Form.Control
													type="text"
													required
													// placeholder="ID Issuing Authority"
													name="typeId"
													className="formControlStep2 mainS4"
													value={userData?.iddetails?.type}
													readOnly={!isEditing3}
												/>
												<label for="name" className="ProfileLables">
													ID Type
												</label>
												<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
													Please Enter The ID Type
												</small>
											</Form.Group>
										</Row>)
								}

								{
									isEditing3 ?
										(
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container required"
												>
													<i className="purpleText main fa fa-id-card"></i>
													<Form.Control
														type="text"
														required
														// placeholder="Card Number"
														name="cardNumber"
														className="formControlStep2 mainS4"
														value={updateIdDetails?.cardNumber}
														readOnly={!isEditing3}
														onChange={(e) => {
															let value = e.target.value
															let sanitizedValue = ''
															var sanitizedValues = value.replace(/[^a-zA-Z0-9]/g, '')
															sanitizedValue = sanitizedValues.toUpperCase()
															setUpdateDetails((prevState) => ({
																...prevState,
																cardNumber: sanitizedValue
															}))
														}}
													/>
													<label for="name" className="ProfileLables">
														Card Number
													</label>
													<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
														Please Enter Your Card Number
													</small>

													{/* {errors.name && <p>{errors.name}</p>} */}
												</Form.Group>
											</Row>
										)
										:
										(
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container required"
												>
													<i className="purpleText main fa fa-id-card"></i>
													<Form.Control
														type="text"
														required
														// placeholder="Card Number"
														name="cardNumber"
														className="formControlStep2 mainS4"
														value={userData?.iddetails?.cardNumber}
														readOnly={!isEditing3}
													/>
													<label for="name" className="ProfileLables">
														Card Number
													</label>
													<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
														Please Enter Your Card Number
													</small>

													{/* {errors.name && <p>{errors.name}</p>} */}
												</Form.Group>
											</Row>
										)
								}


								{
									isEditing3 ?
										(
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container required"
												>
													<i className="purpleText main fa fa-id-card"></i>
													<Form.Control
														type="text"
														required
														// placeholder="ID Number"
														name="documentNumber"
														className="formControlStep2 required mainS4"
														value={updateIdDetails?.documentNumber}
														readOnly={!isEditing3}
														onChange={(e) => {
															let value = e.target.value
															let sanitizedValue = ''
															var sanitizedValues = value.replace(/[^a-zA-Z0-9]/g, '')
															sanitizedValue = sanitizedValues.toUpperCase()
															setUpdateDetails((prevState) => ({
																...prevState,
																documentNumber: sanitizedValue
															}))
														}}
													/>
													<label for="name" className="ProfileLables">
														ID Number
													</label>
													<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
														Please Enter Your ID Number
													</small>
												</Form.Group>
											</Row>
										)
										:
										(
											<Row className="">
												<Form.Group
													as={Col}
													className="left-inner-addon input-container required"
												>
													<i className="purpleText main fa fa-id-card"></i>
													<Form.Control
														type="text"
														required
														// placeholder="ID Number"
														name="documentNumber"
														className="formControlStep2 required mainS4"
														value={userData?.iddetails?.documentNumber}
														readOnly={!isEditing3}
													/>
													<label for="name" className="ProfileLables">
														ID Number
													</label>
													<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
														Please Enter Your ID Number
													</small>
												</Form.Group>
											</Row>
										)
								}

								{isEditing3 ? (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fa fa-calendar"></i>
											<Form.Control
												type="date"
												required
												max={maxDate.toISOString().split('T')[0]}
												min={minDate.toISOString().split('T')[0]}
												name="dob"
												className="formControlStep2 required mainS4"
												defaultValue={userData?.iddetails?.dob}
												onChange={handleIdChange}
												onKeyPress={(event) => event.preventDefault()}
												readOnly={userData?.iddetails?.dob == '' ? false : true}
											/>
											<label for="name" className="ProfileLables">
												Date-of-birth
											</label>
											<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
												Please Enter Your Date-of-birth
											</small>
										</Form.Group>
									</Row>
								) : (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fa fa-calendar"></i>
											<Form.Control
												type="date"
												required
												readOnly={!isEditing3}
												name="dob"
												className="formControlStep2 mainS4"
												value={userData?.iddetails?.dob}
												onKeyPress={(event) => event.preventDefault()}
											/>
											<label for="name" className="ProfileLables">
												Date of birth
											</label>
										</Form.Group>
									</Row>
								)}

								{isEditing3 ? (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fa fa-calendar"></i>
											<Form.Control
												type="date"
												required
												name="documentValidity"
												min={formattedDate}
												className="formControlStep2 required mainS4"
												defaultValue={userData?.iddetails?.documentValidity}
												onChange={handleIdChange}
												onKeyPress={(event) => event.preventDefault()}
											/>
											<label for="name" className="ProfileLables">
												{/* Date-of-Expiry */}
												Date of Id Expiry
											</label>
											<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
												Please Enter Your Date of Id Expiry
											</small>
										</Form.Group>
									</Row>
								) : (
									<Row className="">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container required"
										>
											<i className="purpleText main fa fa-calendar"></i>
											<Form.Control
												type="date"
												required
												readOnly={!isEditing3}
												name="documentValidity"
												className="formControlStep2 mainS4"
												value={userData?.iddetails?.documentValidity}
												onKeyPress={(event) => event.preventDefault()}
											/>
											<label for="name" className="ProfileLables">
												{/* Date-of-Expiry */}
												Date of Id Expiry
												{/* Date of Id Expiry */}
											</label>
										</Form.Group>
									</Row>
								)}


							</Form>
						</Row>
						{/* </Form> */}
					</div>
					{/* <Row className="">
            {userData &&
              userData?.idDocuments.map((image, index) => (
                <div className="col-sm-1" key={index}>
                  <div className="image position relative d-flex border-0 align-items-center shadow-none">
                    <div className="img-box effect-image-1">
                      <img
                        src={image.filePath}
                        height="122"
                        width="122"
                        className="hoverView uploadedImage roundedCorner"
                        alt="upload"
                      />
                      <div className="overlay simple-overlay roundedCorner">
                        <div
                          className="mainBtnClose"
                          onClick={() => deleteHandler(image)}
                        >
                          <img
                            src={closeVector}
                            className="img-fluid"
                            alt="close"
                          />
                        </div>
                        <div className="cta">
                          <img
                            src={previewVector}
                            className="preview img-fluid"
                            alt="preview"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Row> */}
					<hr></hr>
					<div className="KYCDetails py-4">
						<div className="d-flex justify-content-between respoChildFooter">
							<h1 className="bolder purpleText responsiveFontLargeHeading">
								My documents
							</h1>
							<label
								htmlFor="fileInput"
								className="bg-transparent file-input-label pointer"
								onClick={(e) => {
									setOptiontoChoseUpload(true)
								}}
							>
								<i className="fa fa-plus-circle purpleText"></i>{' '}
								<small className="responsiveFontLarge purpleText bolder">
									Add New Document
								</small>
							</label>
						</div>

						<div className="mt-2 d-flex">
							<span className="text-black bolder py-3">KYC Documents</span>
							<small className="responsiveFontLarge  text-gray font-italic py-3">
								{' '}
								(non-deletable)
							</small>
							<span
								className={`text-danger bolder py-3 ${RequireDocumentError === 1 ? 'd-block' : RequireDocumentError === 2 ? 'd-block' : 'd-none'}`}> * required (<u>Before sendmoney please upload KYC Documents</u>)</span>
						</div>
						<hr className="m-0"/>
						<Form>
							<div className={userData?.idDocuments?.length == 0 ? 'd-none' : 'd-block'}>
								<Row className="innerForm mt-2">
									{/* <span>Front Image</span> */}
									<Col className="text-center row">
										<span>Front Image ({userData?.iddetails?.type})</span>
										<hr></hr>
										{userData &&
											userData?.idDocuments &&
											userData?.idDocuments?.map((image, index) => (
												image.isFront && image.isActive == true ?
													<div className="images col-lg-4 border-0" key={index}>
														<div className="image position relative d-flex border-0 align-items-center shadow-none">
															<div className="img-box effect-image-1">
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
																<div className="overlay simple-overlay roundedCorner"></div>

															</div>
														</div>
													</div>
													:
													''
											))}
									</Col>

									{/* <div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="file-input"
                      style={{ display: "none" }}
                      id="fileInput"
                    />
                  </div> */}

									<Col
										className={`text-center d-flex ${userData?.iddetails?.type == 'Passport' ? 'd-none' : 'd-block'}`}>
										<span>Back Image ({userData?.iddetails?.type})</span>
										<hr></hr>

										{userData &&
											userData?.idDocuments &&
											userData?.idDocuments?.map((image, index) => (
												image.isBack && image.isActive == true ?
													<div className="images col-lg-4 border-0" key={index}>
														<div className="image position relative d-flex border-0 align-items-center shadow-none">
															<div className="img-box effect-image-1">
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
																<div className="overlay simple-overlay roundedCorner">
																	{/* <div
                                className="mainBtnClose"
                                onClick={() => deleteHandler(image)}
                              >
                                <img src={closeVector} className="img-fluid" alt="close" />
                              </div>
                              <div className="cta">
                                <img
                                  src={previewVector}
                                  className="preview img-fluid"
                                  alt="preview"
                                />
                              </div> */}
																</div>
															</div>
														</div>
													</div>
													:
													''
											))
										}
									</Col>
									<hr className="m-0"/>
								</Row>
							</div>
							<div className={`my-3 text-center py-3 ${userData?.idDocuments?.length == 0 ? 'd-block' : 'd-none'}`}>
								No Document uploaded
							</div>
							<Row>
								<div className="d-flex">
									<span className="bolder text-black py-3">Other Documents</span>
									<span
										className={`text-danger bolder py-3 ${RequireDocumentError === 1 ? 'd-block' : RequireDocumentError === 3 ? 'd-block' : 'd-none'}`}> * require (<u>before sendmoney please upload Other Documents</u>)</span>

									{/* <div className="pointer">
                    {OtherSelectedImages.length > 0 && (
                      <div className="pointer" onClick={(e) => handleSubmit(e)}>
                        <i className="fa fa-pencil purpleText"></i>{" "}
                        <small
                          className="responsiveFontLarge  purpleText bolder"

                        >
                          Update
                        </small>
                      </div>
                    )}
                  </div> */}
								</div>
								<hr></hr>

								<section>
									<div
										className={`d-flex flex-wrap ${UploadImageArray && UploadImageArray?.length > 0 ? 'd-block' : 'd-none'}`}>
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
																								<div className="overlay simple-overlay roundedCorner"></div>
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
									<div
										className={`my-3 text-center py-3 ${UploadImageArray && UploadImageArray?.length > 0 ? 'd-none' : 'd-block'}`}>
										No Document uploaded
									</div>
								</section>
							</Row>
						</Form>
					</div>

					<Modal className="rounded"
						// {...props}
								 show={OptiontoChoseUpload}
								 onHide={(e) => {
									 setOptiontoChoseUpload(false)
								 }}
								 size="md"
								 aria-labelledby="contained-modal-title-vcenter"
								 centered
					>
						{/* <div className='d-flex flex-column py-4'>
        <i className="fa fa-check-circle fa-5x success-icon mb-4" color="green" ></i>
        <p className='text-center fs-6 mb-0'>SUCCESS</p>
      </div> */}
						<Modal.Body>
							<p className="text-center">
								Select Document:
							</p>
						</Modal.Body>
						<div className="text-center">
							<button
								className="w-25 success-btn purpleBackground border-0 rounded text-light"
								onClick={(e) => {
									if ((userData?.iddetails?.typeId == '' || userData?.iddetails?.documentNumber == '' || userData?.iddetails?.dob == '' || userData?.iddetails?.documentValidity == '' || userData?.iddetails?.issuingAuthority == '') && (userData?.userkycdetails?.streetName == '' || userData?.userkycdetails?.stateId == '' || userData?.userkycdetails?.nationality == '' || userData?.userkycdetails?.suburb == '' || userData?.userkycdetails?.postalCode == '' || userData?.userkycdetails?.occupationId == '')) {
										setVerifyRefralPOPUP(true)
										setOptiontoChoseUpload(false)
										setSendMoneyDetailsMessage('Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions')
									} else if (userData?.userkycdetails?.streetName == '' || userData?.userkycdetails?.stateId == '' || userData?.userkycdetails?.nationality == '' || userData?.userkycdetails?.suburb == '' || userData?.userkycdetails?.postalCode == '' || userData?.userkycdetails?.occupationId == '') {
										setVerifyRefralPOPUP(true)
										setOptiontoChoseUpload(false)
										setSendMoneyDetailsMessage('Your KYC details Details are missing. please fill missing data to proceed transactions.')
									} else if ((userData?.iddetails?.typeId == '' || userData?.iddetails?.documentNumber == '' || userData?.iddetails?.dob == '' || userData?.iddetails?.documentValidity == '' || userData?.iddetails?.issuingAuthority == '') && userData?.isDigital === false) {
										setVerifyRefralPOPUP(true)
										setOptiontoChoseUpload(false)
										setSendMoneyDetailsMessage('Your Id Details are missing. please fill missing data to proceed transactions.')
									} else {
										setKYCtoChoseUpload(true)
										setOptiontoChoseUpload(false)
									}
								}}>
								KYC Documents
							</button>
							<button
								className="w-25 success-btn purpleBackground border-0 rounded text-light"
								onClick={(e) => {
									if ((userData?.iddetails?.typeId == '' || userData?.iddetails?.documentNumber == '' || userData?.iddetails?.dob == '' || userData?.iddetails?.documentValidity == '' || userData?.iddetails?.issuingAuthority == '') && (userData?.userkycdetails?.streetName == '' || userData?.userkycdetails?.stateId == '' || userData?.userkycdetails?.nationality == '' || userData?.userkycdetails?.suburb == '' || userData?.userkycdetails?.postalCode == '' || userData?.userkycdetails?.occupationId == '')) {
										setVerifyRefralPOPUP(true)
										setOptiontoChoseUpload(false)
										setSendMoneyDetailsMessage('Your ID Details and KYC Details are missing ,please fill missing data to proceed transactions.')
									} else if (userData?.userkycdetails?.streetName == '' || userData?.userkycdetails?.stateId == '' || userData?.userkycdetails?.nationality == '' || userData?.userkycdetails?.suburb == '' || userData?.userkycdetails?.postalCode == '' || userData?.userkycdetails?.occupationId == '') {
										setVerifyRefralPOPUP(true)
										setOptiontoChoseUpload(false)
										setSendMoneyDetailsMessage('Your KYC details Details are missing. please fill missing data to proceed transactions.')
									} else if ((userData?.iddetails?.typeId == '' || userData?.iddetails?.documentNumber == '' || userData?.iddetails?.dob == '' || userData?.iddetails?.documentValidity == '' || userData?.iddetails?.issuingAuthority == '') && userData?.isDigital === false) {
										setVerifyRefralPOPUP(true)
										setOptiontoChoseUpload(false)
										setSendMoneyDetailsMessage('Your Id Details are missing. please fill missing data to proceed transactions.')
									} else {
										setOthertoChoseUpload(true)
										setOptiontoChoseUpload(false)
									}
								}}>
								Others Document
							</button>
							{/* <button className='w-25 success-btn purpleBackground border-0 rounded text-light' onClick={props.onHide}>Ok</button> */}
						</div>
					</Modal>

					{/* if(UserData?.userkycdetails?.streetName == "" || UserData?.userkycdetails?.stateId == "" || UserData?.userkycdetails?.nationality == "" || UserData?.userkycdetails?.suburb == "" || UserData?.userkycdetails?.postalCode == "" || UserData?.userkycdetails?.occupationId == ""){
            setVerifyRefralPOPUP(true)
            setSendMoneyDetailsStatus(2)
            setSendMoneyDetailsMessage('Your KyC details is not fill up. Please Fill That.')
          }else if(UserData?.iddetails?.typeId == "" || UserData?.iddetails?.documentNumber == "" || UserData?.iddetails?.cardNumber == "" || UserData?.iddetails?.dob == "" || UserData?.iddetails?.documentValidity == "" || UserData?.iddetails?.issuingAuthority == ""){
            setVerifyRefralPOPUP(true)
            setSendMoneyDetailsStatus(3)
            setSendMoneyDetailsMessage('Your Id Details is not fill up. Please Fill That.')
          } */}
					{/* {console.log(Intl.DateTimeFormat().resolvedOptions().timeZone,"TimeZone")} */}
					<Modal
						centered
						size="lg"
						show={KYCtoChoseUpload}
						onHide={(e) => {
							setKYCtoChoseUpload(false)
						}}
						dialogClassName="modal-warning"
					>
						<Modal.Header closeButton className="border-bottom">
							<Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">
                {' '}
								&nbsp; &nbsp; Document Upload
              </span>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body className="pt-4 mt-2">
							<Row>
								<Col className="col-lg-12 p-0">
									<div className="text-center">
										<label className="text-center fs-4 text-black mb-2">
											KYC Documents Upload
										</label>
									</div>
									<Row className="mb-3 m-auto">
										<Form.Group
											as={Col}
											className="left-inner-addon input-container"
										>
											<Form.Select
												className=""
												name="typeId"
												onChange={(e) => {
													handledocumentId(e)
												}}
												// value={IdDocument_Id}
											>
												<option value="" disabled selected>
													Id Document
												</option>
												{Idtypes &&
													Idtypes.map((ID) => {
														return <option value={ID.id}>{ID.name}</option>
													})}
											</Form.Select>
										</Form.Group>
									</Row>
									<div className="mt-5">
										<Row className="d-flex m-auto">
											<Col className="col-lg-12 d-flex">
												<Col className=" pe-2">
													<KYCuploadDocuments
														I_UserIdType={IdDocument_Id}
														imageData={imageData}
													></KYCuploadDocuments>
												</Col>
											</Col>
										</Row>
									</div>
								</Col>
							</Row>
						</Modal.Body>
						<Modal.Footer>
							<Button
								className="mt-2 col-lg-3 d-block m-auto nextBtn1"
								variant="primary"
								onClick={(e) => {
									handleSubmit('IdDocument')
								}}
							>
								Upload Document
							</Button>
						</Modal.Footer>
						<br/>
						{/* <br/> */}
					</Modal>

					<Modal
						centered
						size="lg"
						show={OthertoChoseUpload}
						onHide={(e) => {
							setOthertoChoseUpload(false)
						}}
						dialogClassName="modal-warning"
					>
						<Modal.Header closeButton className="border-bottom">
							<Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">
                {' '}
								&nbsp; &nbsp; Document Upload
              </span>
							</Modal.Title>
						</Modal.Header>
						<Modal.Body className="pt-4 mt-2">
							<Row>
								<Col className="col-lg-12 p-0">
									<div className="text-center">
										<label className="text-center fs-4 text-black mb-2">
											Other Documents Upload
										</label>
									</div>

									<div className="mt-5">
										{/* <Form id=""> */}
										<Row className="d-flex m-auto">
											<Col className="col-lg-12 d-flex">
												<Col className=" pe-2">
													<OtheruploadDocuments
														// imageData={OtherimageData}
														IdType={userData && userData?.countryId?.type}
														CountryId={userData && userData?.countryId}
														AdditionalDocument={OtherimageData}
														UserRole={userData && userData?.roleId}
													></OtheruploadDocuments>
												</Col>
											</Col>
										</Row>
										{/* </Form> */}
									</div>
								</Col>
							</Row>
						</Modal.Body>
						<Modal.Footer>
							<Button
								className="mt-2 col-lg-3 d-block m-auto nextBtn1"
								variant="primary"
								onClick={(e) => {
									handleOtherDocumentUpload('OtherDocument')
								}}
							>
								Upload Document
							</Button>
						</Modal.Footer>
						<br/>
						{/* <br/> */}
					</Modal>

					<ModalComponent
						show={ImagetypeValidation}
						title11={'Invalid file type , Only PNG, JPG, and JPEG files are allowed.'}
						onHide={() => setImagetypeValidation(false)}
					/>
					<ModalComponent
						show={ImagesizeValidation}
						title11={'File size exceeds the maximum limit of 2 MB.'}
						onHide={() => setImagesizeValidation(false)}
					/>

					<ModalComponent
						show={ErrorPopup}
						title11={ErrorMessage}
						onHide={() => setErrorPopup(false)}
					/>

					<Modal
						show={FormPopup}
						onHide={(e) => {
							setFormPopup(false)
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
													// onChange={(e)=>{handleDynamiForm(e)}}
													name="Business_No_of_directors"
													type="number"
													value={formDataa.length}
													// onBlur={(e)=>{setFormPopup(true)}}
													// placeholder="No of directors"
													className="formcontrol orangeForm required number1 form-input"
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
															<h5 className="fs-6 ps-3 bolder"> Director Details {i + 1}</h5>
															<img src={bin} className="img-fluid pointer" alt="" onClick={(e) => {
																UpdateremoveFieldsReciptionDetails(i)
															}}/>
															{/* <button className={`bg-danger col-lg-2 fullRoundedCorner pointer p-0 m-0 responsiveFontLarge text-white ${formDataa.length < 2 ? "d-none" :"d-block"}`} onClick={(e)=>{UpdateremoveFieldsReciptionDetails(i)}}>remove</button> */}
														</div>
														<Form.Group
															as={Col}
															className="left-inner-addon input-container"
														>
															<i className="orangeText main fa fa-user "></i>
															<Form.Control
																name="name"
																type="text"
																// placeholder="Director Full name"
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
																// placeholder="Director Email"
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
																// placeholder="Director Mobile"
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
																// placeholder="Share Holding"
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
												<Col className="col-lg-12">
													<Button
														className="d-block nextBtnDirector"
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
										<div className="mb-3 mt-3 respoChildFooter">
											<Form.Group
												as={Col}
												className="left-inner-addon"
											>
												<i className="orangeText main fa fa-user "></i>
												<Form.Control
													// onChange={(e)=>{handleDynamiForm2(e)}}
													value={formData2.length}
													name="Business_No_of_Shareholders"
													type="number"
													// placeholder="No. of Shareholders"
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
												<small className="notevalue bolder text-primary">Note: The number of shareholders must not
													include any individuals who also serve as directors of the company.</small>
											</Row>
										</div>
										<div className="">
											{formData2.map((item, i) => (
												<div key={i} className="my-3">

													<Row className="px-3 respoChildFooter">
														<div className="d-flex justify-content-between pb-3 pt-1">
															<h5 className="fs-6 ps-3 bolder">Shareholder Details {i + 1} </h5>
															{/* <h5 className={`fs-6 ps-3 text-danger pointer `} onClick={(e)=>{UpdateremoveFieldsShareHolder(i)}}>remove</h5> */}
															<img src={bin} className="img-fluid pointer" alt="" onClick={(e) => {
																UpdateremoveFieldsShareHolder(i)
															}}/>
														</div>
														<Form.Group
															as={Col}
															className="left-inner-addon input-container"
														>
															<i className="orangeText main fa fa-user "></i>
															<Form.Control
																name="name"
																type="text"
																// placeholder="Director Full name"
																value={item?.name || ''}
																className="formcontrol orangeForm form-input required"
																onChange={(e) => handleFormInputChange2(i, 'name', e.target.value)}
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
																// placeholder="Director Email"
																value={item?.email || ''}
																className="formcontrol orangeForm form-input required"
																onChange={(e) => handleFormInputChange2(i, 'email', e.target.value)}
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
																// placeholder="Director Mobile"
																value={item?.phone || ''}
																className="formcontrol orangeForm form-input required"
																onChange={(e) => handleFormInputChange2(i, 'phone', +e.target.value)}
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
																// placeholder="Share Holding"
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
											))};
											<Row>
												<Col className="col-lg-12">
													<Button
														className="d-block nextBtnDirector"
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

				</Container>
				{/* <ToastContainer /> */}
				<Footer></Footer>
			</section>

			<Modal show={VerifyRefralPOPUP} onHide={() => {
				setVerifyRefralPOPUP(false)
			}} centered>
				<Modal.Header closeButton className="border-bottom">
					<Modal.Title className="purpleText"><span className="text-black mt-2">Alert</span></Modal.Title>
				</Modal.Header>
				<Modal.Body className="mt-3">
					<p>
						{SendMoneyDetailsMessage}
					</p>
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-around">
					<Button
						className="purpleBackground border-0 col col-lg-3"
						onClick={() => {
							setVerifyRefralPOPUP(false)
						}}
					>
						Ok
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}
