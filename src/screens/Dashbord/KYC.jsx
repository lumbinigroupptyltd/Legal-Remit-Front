import React, { useEffect, useState } from 'react'
import { CommonConstants } from '../../Constants/common.constants'
import axios from 'axios'
import ModalComponent from './ModalComponent'
import ModalComponentPopup from './ModalComponentPopup'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import moment from 'moment'
import VerifiedIcon from '@mui/icons-material/Verified'
import Chip from '@mui/material/Chip'
import Loader from '../Loader/Loader'
import { Dropdown, Form } from 'react-bootstrap'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EditIcon from '@mui/icons-material/Edit'
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn'
import Button from '@mui/material/Button'
import ImagePreview from '../../components/ImagePreview'
import Modal from "react-bootstrap/Modal";

const KYC = ({individualuserData, editMode1, documents, afterAddoc}) => {
  const [verifiedKYC, setVerifiedKYC] = useState(false)
  const [editMode, setEditMode] = useState(false) // Step 1
  const [originalKYCDetails, setOriginalKYCDetails] = useState({}) // Store the original KYC details for cancel
  const [KYCDetils, setKYCDetails] = useState({
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
    isBlacklist: false,
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
      typeId: 0,
      idType: '',
      documentNumber: '',
      cardNumber: '',
      dob: '',
      documentValidity: '',
      issuingAuthority: '',
      createdAt: '',
      updatedAt: ''
    },
    kycdocuments: [
      {
        fileName: '',
        fileDownloadUri: ''
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
  const [TypeOfId, setTypeOfId] = useState()
  const [kycdocuments, setkycdocuments] = useState([])
  const [IdAuthority, setIdAuthority] = useState([])

  const [formData, setFormData] = useState({
    fName: '',
    mName: '',
    lName: '',
    streetName: '',
    suburb: '',
    stateName: '',
    idType: '',
    documentNumber: '',
    dob: '',
    issuingAuthority: '',
    cardNumber: '',
    documentValidity: '',
    nationality: '',
    postalCode: '',
    stateId: ''
  })

  const [hasChanges, setHasChanges] = useState(false)
  const [idData, setIdData] = useState([])
  const [typeID, setTypeID] = useState(14)
  const [selectedId, setSelctedIdeType] = useState(0)
  const [loadervalue, setloadervalue] = useState(false)
  const [Nationality, setNationality] = useState([])
  const [modalShowPrChange, setmodalShowPrChange] = useState(false)
  const [verifiedPopup, setVerifiedPopup] = useState(false)
  const [unVerifiedPopup, setUnverifiedPopup] = useState(false)
  const [message, setmessage] = useState(false)
  const [States, setStates] = useState([])
  const [devKyc, setDvsKyc] = useState(false)
  const [responceData, setResponceData] = useState('')

  const [showSuspendUser, setShowSuspendUser] = useState(false)
  const handleSuspendUserPopup = () => setShowSuspendUser(false)

  const submitSuspendUser = () => {
    setloadervalue(true)
    axios
      .post(CommonConstants.BASE_URL + `/saveblacklistedbyuserid?userId=${individualuserData}&isBlackListed=${KYCDetils.isBlacklist ? 'false' : 'true'}`)
      .then(async (res) => {
        if (res.data.code === 200) {
          setShowSuspendUser(false)
          setloadervalue(false)
        }

        fetachData()
        setShowSuspendUser(false)
        setloadervalue(false)
      })
  }

  const suspendUser = () => {
    setShowSuspendUser(true)
  }

  const handleCloseMessage = () => {
    setmessage(false)
  }
  const fetachData = async () => {
    const payload = {
      id: individualuserData //377
    }
    axios
      .post(CommonConstants.BASE_URL + '/getuserinfobyid', payload)
      .then(async (res) => {
        if (res.data.statuscode == 200) {
          const responceData = res.data.data
          setKYCDetails(responceData)
          setkycdocuments(responceData?.idDocuments)
          setVerifiedKYC(responceData?.userkycdetails?.verified)
          GetAllStates(responceData?.countryId)
          const NationalityName = {
            nationality: responceData?.userkycdetails?.nationality,
            countryId: responceData?.countryId
          }
          try {
            const response = await axios.post(
              CommonConstants.BASE_URL + '/getissueauthoritybynationality',
              NationalityName
            )
            if (response.data.status === true) {
              setIdAuthority(response.data.data)
            }
          } catch (error) {
          }
        }
      })
  }

  const handleEditClick = () => {
    setOriginalKYCDetails(KYCDetils) // Store the original KYC details before editing
    setEditMode(true)
  }

  const handleCancelClick = () => {
    // setKYCDetails(originalKYCDetails); // Reset KYC details to the original values
    setEditMode(!editMode)
  }
  const GetAllStates = async (values) => {
    try {
      const CountryId = {
        id: values
      }
      const response = await axios.post(
        CommonConstants.BASE_URL + '/getallstatebycountryid',
        CountryId
      )
      if (response.data.status === true) {
        setStates(response.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getIdTypes = async () => {
    try {
      const Responce = await axios.post(
        CommonConstants.BASE_URL + '/getactiveidtypebycountryid',
        {countryId: typeID}
      )
      const idData = Responce.data.data
      setIdData(idData)
    } catch (err) {
      console.log(err)
    }
  }

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value
    }))
    setHasChanges(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!hasChanges) {
      return
    }
    const requestBody = {
      users: {
        id: KYCDetils?.id, // userid
        fName: formData.fName || KYCDetils?.fName,
        mName: formData.mName || KYCDetils?.mName,
        lName: formData.lName || KYCDetils?.lName
      },
      userKycDetails: {
        id: KYCDetils?.userkycdetails.id, // kyc details id
        userId: KYCDetils?.userkycdetails.userId, // userid
        streetName:
          formData.streetName || KYCDetils?.userkycdetails?.streetName,
        stateId: formData.stateId || KYCDetils?.userkycdetails?.stateId,
        nationality:
          formData.nationality || KYCDetils?.userkycdetails?.nationality,
        suburb: formData.suburb || KYCDetils?.userkycdetails?.suburb,
        postalCode:
          formData.postalCode || KYCDetils?.userkycdetails?.postalCode
      },
      idDetails: {
        id: KYCDetils?.iddetails.id,
        userId: KYCDetils?.id,
        typeId: selectedId || KYCDetils?.iddetails?.typeId,
        documentNumber:
          formData.documentNumber || KYCDetils?.iddetails?.documentNumber,
        cardNumber: formData.cardNumber || KYCDetils?.iddetails?.cardNumber,
        dob: formData.dob || KYCDetils?.iddetails?.dob,
        documentValidity:
          formData.documentValidity || KYCDetils?.iddetails?.documentValidity,
        issuingAuthority:
          formData.issuingAuthority || KYCDetils?.iddetails?.issuingAuthority
      }
    }

    try {
      const response = await axios.post(
        CommonConstants.BASE_URL + '/updateuserdetails',
        requestBody
      )

      if (response.data.statuscode === 200) {
        setEditMode(false)
        fetachData()
        setHasChanges(false) // Reset changes status
      } else {
        console.error('Update failed')
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const [expanded, setExpanded] = useState(true)

  const handleChange = () => {
    setExpanded(!expanded)
  }
  const openPrompt = () => {
    setmodalShowPrChange(true)
  }
  const markKYC = async () => {
    try {
      handlePrchangePopupCancle()
      setloadervalue(true)

      const paylaod = {
        userId: individualuserData,
        verified: KYCDetils?.userkycdetails?.verified === true ? false : true
      }
      const kycVerifyResponse = await axios.post(
        `${CommonConstants.BASE_URL}/markedkycverified`, paylaod)
      if (kycVerifyResponse.data.status === true) {
        setloadervalue(false)
        if (KYCDetils?.userkycdetails?.verified === false) {
          setVerifiedPopup(true)
        } else {
          setUnverifiedPopup(true)
        }

        afterAddoc([kycVerifyResponse.data.data])
      }

      setloadervalue(false)
    } catch (error) {
      console.log(error)
    }
  }

  const GetAllNationality = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + '/getallnationality'
      )
      if (response.data.status === true) {
        setNationality(response.data.data)
      }
    } catch (err) {
      // console.log(err)
    }
  }
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false)
  }
  const handleClose = () => {
    setVerifiedPopup(false)
    setUnverifiedPopup(false)
    fetachData()
  }
  const openDvsModel = () => {
    setDvsKyc(true)
    setmodalShowPrChange(true)
  }

  const handleAction = async () => {
    setloadervalue(true)
    const sendData = await axios.post(CommonConstants.BASE_URL + '/checkdocumentverificationmanual', {'userId': KYCDetils?.id})
    if (sendData.data.status == true) {
      setmodalShowPrChange(false)
      setVerifiedPopup(true)
      setResponceData(sendData.data.message)
      setmessage(true)
    } else {
      setmodalShowPrChange(false)
      setResponceData(sendData.data.message)
      setmessage(true)
    }
    setloadervalue(false)
  }
  useEffect(() => {
    if (documents) {
      fetachData()
    }
    fetachData()
    getIdTypes()
    GetAllNationality()
  }, [individualuserData, documents, afterAddoc])



  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }
  return (
    <>
      {loadervalue == true ? <Loader/> : ''}

      <div className="col-lg-12 px-0">
        <div className="row respoChildFooter">
          <div className="px-0">
            {editMode1 ? (
              <div>Blank</div>
            ) : (
              <>
                <Typography variant="h5" className="my-3">
                  {KYCDetils?.fName ? `${KYCDetils?.fName}'s KYC Information` : 'KYC Information'}
                </Typography>
                <div className="d-flex justify-content-between purpleShadeBackground px-3 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className=" mt-0 d-flex mx-3 ">
                      <div className="medium ">
                        ID Type
                      </div>
                    </div>
                    <div className="mt-0  ms-5 d-flex align-items-center">
                      <div className="medium moneySendRespo">
                        KYC Status
                      </div>
                    </div>
                  </div>
                  <div className="actionButtons d-flex ms-auto">
                    <div className="medium">
                      Actions
                    </div>
                  </div>
                </div>

                <Accordion
                  className="py-3 my-3 mt-0"
                  expanded={expanded}
                >
                  <div className="d-flex respoChildFooter align-items-center justify-content-between">
                    <div className="d-flex  align-items-center">
                      <div>
                        <div className=" mt-0 d-flex ms-3 ps-0">
                          <i className="pe-1 fa fa-id-card purpleText"/>
                          <div className="ps-2">
                            {KYCDetils?.iddetails?.type == ''
                              ? '-'
                              : KYCDetils?.iddetails?.type}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="my-4 mt-0 mb-0 d-flex align-items-center">
                          <div className="ps-3 moneySendRespo">
                            {KYCDetils?.userkycdetails?.verified === true ? (
                              <div className="ps-2"><Chip className="border-0 p-0" icon={<VerifiedIcon/>}
                                                          label={<div className="dateChip">Verified</div>}
                                                          color="success" variant="outlined"/></div>
                            ) : (
                              <span>
                                <i className="fa fa-times-circle text-danger"></i> Unverified
                              </span>
                            )}
                          </div>
                          <Button
                            className="m-0 w-auto px-1 py-1 ms-2"
                            variant="outlined"
                            onClick={() => openDvsModel()}
                          >
                            DVS Verification
                          </Button>

                          <Button
                            className={`btn btn-default m-0 w-auto px-3 py-1 ms-2 ${KYCDetils.isBlacklist ? 'bg-secondary' : 'bg-danger'}`}
                            onClick={() => suspendUser()}
                          >
                            {KYCDetils.isBlacklist ? 'UnBlack list' : 'Black List'}
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">

                      <div>
                        <EditIcon variant="primary" onClick={handleEditClick} className="mx-2 purpleText"
                                  titleAccess="Edit"/>
                        <AssignmentTurnedInIcon
                          variant="primary"
                          className="purpleText"
                          titleAccess={`Mark KYC ${KYCDetils?.userkycdetails?.verified === true ? 'Unverified' : 'Verified'}`}
                          onClick={openPrompt}
                        />
                      </div>
                      <div className="">
                        <AccordionSummary
                          className="px-0"
                          expanded={expanded}
                          onChange={handleChange}
                          expandIcon={<ExpandMoreIcon/>}
                        >


                        </AccordionSummary>
                      </div>
                    </div>
                  </div>

                  <AccordionDetails className="px-0">
                    {
                      editMode ? (
                        <>
                          <div className="">
                            <form onSubmit={handleSubmit}>
                              <div className="py-3">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">First Name:</label>
                                      <input
                                        type="text"
                                        className="form-control "
                                        defaultValue={KYCDetils?.fName}
                                        onChange={(e) =>
                                          handleInputChange('fName', e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">Middle Name:</label>
                                      <input
                                        type="text"
                                        className="form-control "
                                        defaultValue={KYCDetils?.mName}
                                        onChange={(e) =>
                                          handleInputChange('mName', e.target.value)
                                        }
                                      />
                                    </div>
                                    {' '}
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">Last Name:</label>
                                      <input
                                        type="text"
                                        className="form-control "
                                        defaultValue={KYCDetils?.lName}
                                        onChange={(e) =>
                                          handleInputChange('lName', e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">House No and street Name:</label>
                                      <input
                                        type="text"
                                        className="form-control "
                                        defaultValue={KYCDetils?.userkycdetails?.streetName}
                                        onChange={(e) =>
                                          handleInputChange('streetName', e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">Suburbs/City:</label>
                                      <input
                                        type="text"
                                        className="form-control "
                                        defaultValue={KYCDetils?.userkycdetails?.suburb}
                                        onChange={(e) =>
                                          handleInputChange('suburb', e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">State:</label>
                                      <Form.Select
                                        aria-label="Default select example"
                                        onChange={(e) =>
                                          handleInputChange('stateId', e.target.value)
                                        }
                                        defaultValue={KYCDetils?.userkycdetails?.stateId}
                                      >
                                        <option>Select State</option>
                                        {States &&
                                          States.map((row) => {
                                            return (
                                              <>
                                                <option value={row.id}>{row.name}</option>
                                              </>
                                            )
                                          })}
                                      </Form.Select>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">Postal code:</label>
                                      <input
                                        type="text"
                                        className="form-control "
                                        defaultValue={KYCDetils?.userkycdetails?.postalCode}
                                        onChange={(e) =>
                                          handleInputChange('postalCode', e.target.value)
                                        }
                                      ></input>
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">ID Type</label>
                                      <Form.Select
                                        aria-label="Default select example"
                                        onChange={(e) => {
                                          setSelctedIdeType(e.target.value)
                                          setHasChanges(true)
                                        }}
                                        defaultValue={KYCDetils?.iddetails?.typeId}
                                      >
                                        <option>Select Type</option>
                                        {idData &&
                                          idData.map((row) => {
                                            return (
                                              <>
                                                <option value={row.id}>{row.name}</option>
                                              </>
                                            )
                                          })}
                                      </Form.Select>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">ID No:</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        defaultValue={KYCDetils?.iddetails?.documentNumber}
                                        onInput={(e) => {
                                          const sanitizedValue = e.target.value.replace(
                                            /[^A-Za-z0-9]/g,
                                            ''
                                          ) // Remove special characters
                                          e.target.value = sanitizedValue
                                          handleInputChange('documentNumber', sanitizedValue)
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">Date of Birth:</label>
                                      <input
                                        type="date"
                                        className="form-control "
                                        defaultValue={moment(
                                          KYCDetils?.iddetails?.dob,
                                          'DD-MM-YYYY'
                                        ).format('YYYY-MM-DD')}
                                        onChange={(e) => {
                                          const formattedDate = moment(e.target.value).format(
                                            'YYYY-MM-DD'
                                          ) // Convert to "YYYY-MM-DD" format
                                          handleInputChange('dob', formattedDate)
                                        }}
                                      ></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">ID Issuing Authority:</label>
                                      <Form.Select
                                        aria-label="Default select example"
                                        onChange={(e) =>
                                          handleInputChange(
                                            'issuingAuthority',
                                            e.target.value
                                          )
                                        }
                                        defaultValue={KYCDetils?.iddetails?.issuingAuthority}
                                      >
                                        <option>Select Authority Name</option>
                                        {IdAuthority &&
                                          IdAuthority.map((row) => {
                                            return (
                                              <>
                                                <option value={row.authorityName}>{row.authorityName}</option>
                                              </>
                                            )
                                          })}
                                      </Form.Select>

                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">Card No:</label>
                                      <input
                                        type="text"
                                        className="form-control "
                                        defaultValue={KYCDetils?.iddetails?.cardNumber}
                                        onChange={(e) => {
                                          const sanitizedValue = e.target.value.replace(
                                            /[^A-Za-z0-9]/g,
                                            ''
                                          )
                                          e.target.value = sanitizedValue
                                          handleInputChange('cardNumber', sanitizedValue)
                                        }}
                                      ></input>
                                    </div>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">ID of Expiry : </label>
                                      <input
                                        type="date"
                                        className="form-control"
                                        defaultValue={KYCDetils?.iddetails?.documentValidity}
                                        onInput={(e) => {
                                          const formattedDate = moment(e.target.value).format(
                                            'YYYY-MM-DD'
                                          ) // Convert to "YYYY-MM-DD" format
                                          handleInputChange(
                                            'documentValidity',
                                            formattedDate
                                          )
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="align-items-center py-2">
                                      <label className="">Nationality: </label>
                                      <Form.Select
                                        aria-label="Default select example"
                                        onChange={(e) =>
                                          handleInputChange('nationality', e.target.value)
                                        }
                                        defaultValue={KYCDetils?.userkycdetails?.nationality}
                                      >
                                        <option>Select Nationality</option>
                                        {Nationality &&
                                          Nationality.map((row) => {
                                            return (
                                              <>
                                                <option value={row.nationality}>{row.nationality}</option>
                                              </>
                                            )
                                          })}
                                      </Form.Select>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex justify-content-end mt-3">
                                <div className="text-center ">
                                  <button
                                    type="submit"
                                    className="btn text-light rounded-5"
                                    style={{background: '#AA2AE1'}}
                                  >
                                    Update
                                  </button>
                                </div>
                                <div className="text-center ">
                                  <button
                                    type="button"
                                    className="btn ms-3 text-light rounded-5 bg-dark"
                                    onClick={handleCancelClick}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </>
                      ) : (
                        <TableContainer className="border p-1">
                          <Table aria-label="collapsible table">
                            <TableBody>
                              {/* <div className="d-flex justify-content-end">
                            {editMode ? (
                              <>
                                <div className="d-flex justify-content-end mt-3">
                                  <div className="text-center mx-3">
                                    <button
                                      type="submit"
                                      className="btn text-light rounded-5 m-0 px-4"
                                      style={{ background: "#AA2AE1" }}
                                      onClick={hasChanges ? handleSubmit : null}
                                    >
                                      Update
                                    </button>
                                  </div>
                                  <div className="text-center ">
                                    <button
                                      type="button"
                                      className="btn text-black border rounded-5 m-0 px-4"
                                      onClick={handleCancelClick}
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <button
                                type="button"
                                className="btn rounded-5 purpleBackground text-white w-auto px-4 m-0 mt-3"
                                onClick={handleEditClick}
                              >
                                <i className="fa fa-edit"></i> Edit
                              </button>
                            )}
                            &nbsp;
                            {verifiedKYC == false && (
                              <div
                                id="KYCverifyButton"
                                className="respoChildFooter mt-3 "
                              >
                                {
                                  <button
                                    className="px-2 rounded-5 m-0 btn btn-success"
                                    onClick={markKYC}
                                  >
                                    {" "}
                                    Mark KYC Verified
                                  </button>
                                }
                              </div>
                            )}
                          </div> */}
                              <div className="d-flex mt-1">
                                <div className="col-lg-12 ps-0">
                                  <div className="KYCFont FirstFlexReverse ms-0 mx-4 mt-0 d-flex  ">
                                    <div className="d-flex pbSt">
                                      <i className="pe-2 fa fa-user  purpleText"/>
                                      First Name: <div
                                      className="ps-2">{KYCDetils?.fName == '' ? '-' : KYCDetils?.fName} </div>
                                    </div>
                                    <div className="d-flex ms-auto align-items-baseline justify-content-end">
                                      <label className="mt-3 pe-2">Documents: </label>
                                      <div className="px-0 flex-wrap">
                                        {kycdocuments &&
                                          kycdocuments.map((ele) => (
                                            <div
                                              className="align-items-center py-2 px-3 ps-0"
                                              key={ele.id}
                                            >
                                              <img
                                                onClick={handleOpenModal}
                                                src={ele.filePath}
                                                alt="KYCDocuments"
                                                height="50"
                                                width="50"
                                                className="image-zoom" // Apply the image-zoom class
                                                style={{cursor: 'pointer'}}
                                              />

                                              <ImagePreview
                                                imagePath={ele.filePath}
                                                openModal={openModal}
                                                handleCloseModal={handleCloseModal}
                                              />
                                            </div>
                                          ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="my-4 KYCFont mt-0 d-flex align-items-center">
                                    <i className="pe-2 fa fa-user purpleText"/>
                                    Middle Name:{' '}
                                    <div className="ps-2">
                                      {KYCDetils?.mName == ''
                                        ? '-'
                                        : KYCDetils?.mName}
                                    </div>
                                  </div>
                                  <div className="my-4 KYCFont mt-0 d-flex align-items-center">
                                    <i className="pe-2 fa fa-user purpleText"/>
                                    Last Name:{' '}
                                    <div className="ps-2">
                                      {KYCDetils?.lName == ''
                                        ? '-'
                                        : KYCDetils?.lName}
                                    </div>
                                  </div>

                                  <div className="KYCFont my-4 d-flex">
                                    <i className="pe-2 fa fa-building purpleText"/>
                                    House No & street Name:{' '}
                                    <div className="ps-2">
                                      {KYCDetils?.userkycdetails?.streetName == ''
                                        ? '-'
                                        : KYCDetils?.userkycdetails?.streetName}
                                    </div>
                                  </div>

                                  <div className="KYCFont my-4 d-flex">
                                    <i className="pe-2 fa fa-building purpleText"/>
                                    Suburbs/City:{' '}
                                    <div className="ps-2">
                                      {KYCDetils?.userkycdetails?.suburb == ''
                                        ? '-'
                                        : KYCDetils?.userkycdetails?.suburb}
                                    </div>
                                  </div>
                                  <div className="KYCFont my-4 d-flex">
                                    <i className="pe-2 fa fa-map-pin purpleText"/>
                                    State:{' '}
                                    <div className="ps-2">
                                      {KYCDetils?.userkycdetails?.stateName == ''
                                        ? '-'
                                        : KYCDetils?.userkycdetails?.stateName}
                                    </div>
                                  </div>
                                  <div className="KYCFont my-4 d-flex">
                                    <i className="pe-2 fa fa-map-pin purpleText"/>
                                    Postal Code :{' '}
                                    <div className="ps-2">
                                      {KYCDetils?.userkycdetails?.postalCode == ''
                                        ? '-'
                                        : KYCDetils?.userkycdetails?.postalCode}
                                    </div>
                                  </div>
                                  <div className="KYCFont my-4 d-flex mt-0">
                                    <i className="pe-2 fa fa-id-card purpleText"/>
                                    Id No :{' '}
                                    <div className="ps-2">
                                      {KYCDetils?.iddetails?.documentNumber == ''
                                        ? '-'
                                        : KYCDetils?.iddetails?.documentNumber}
                                    </div>
                                  </div>

                                  <div className="KYCFont my-4 d-flex">
                                    <i className="pe-2 fa fa-birthday-cake purpleText"/>
                                    Date of Birth :{' '}
                                    <div className="ps-2">
                                      {KYCDetils?.iddetails?.dob == ''
                                        ? '-'
                                        : KYCDetils?.iddetails?.dob}
                                    </div>
                                  </div>

                                  <div className="KYCFont my-4 d-flex">
                                    <i className="pe-2 fa fa-id-card purpleText"/>
                                    ID Issuing Authority :{' '}
                                    <div className="ps-2">
                                      {KYCDetils?.iddetails?.issuingAuthority == ''
                                        ? '-'
                                        : KYCDetils?.iddetails?.issuingAuthority}
                                    </div>
                                  </div>

                                  <div className="KYCFont my-4 d-flex">
                                    <i className="pe-2 fa fa-id-card purpleText"/>
                                    Card No :{' '}
                                    <div className="ps-2">
                                      {KYCDetils?.iddetails?.cardNumber == ''
                                        ? '-'
                                        : KYCDetils?.iddetails?.cardNumber}
                                    </div>
                                  </div>

                                  <div className="KYCFont my-4 d-flex ">
                                    <i className="pe-2 fa fa-calendar purpleText"/>
                                    ID of Expiry :{' '}
                                    <div className="ps-2">
                                      {KYCDetils?.iddetails?.documentValidity == ''
                                        ? '-'
                                        : KYCDetils?.iddetails?.documentValidity}
                                    </div>
                                  </div>
                                </div>

                              </div>

                              <div></div>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )
                    }
                  </AccordionDetails>
                </Accordion>

                {/* <TableContainer >
                <Table aria-label="collapsible table" className=' border-left border-right border-top border-bottom my-3'>
                <TableRow>
                    <TableCell component="td" className="bg-transparent">
                      <h5 className='mb-0 pb-0'>KYC Information{" "}</h5>
                    </TableCell>

                  </TableRow>
                  <TableBody>
                    <TableCell className='border-right'>
                      <div>
                        <div className="my-4 mt-0 d-flex align-items-center">
                          <i className="pe-2 fa fa-user purpleText" />
                          KYC Status: <div className="ps-2">
                            {KYCDetils?.userkycdetails?.verified === true ? (
                              <span>
                                <i className="fa fa-check-circle text-success"></i> Verified
                              </span>
                            ) : (
                              <span>
                                <i className="fa fa-times-circle text-danger"></i> Not Verified
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="my-4 mt-0 d-flex align-items-center">
                          <i className="pe-2 fa fa-user purpleText" />
                          First Name: <div className="ps-2">{KYCDetils?.fName == "" ? "-" : KYCDetils?.fName} </div>
                        </div>
                        <div className="my-4 mt-0 d-flex align-items-center">
                          <i className="pe-2 fa fa-user purpleText" />
                          Middle Name: <div className="ps-2">{KYCDetils?.mName == "" ? "-" : KYCDetils?.mName}</div>
                        </div>
                        <div className="my-4 mt-0 d-flex align-items-center">
                          <i className="pe-2 fa fa-user purpleText" />
                          Last Name: <div className="ps-2">{KYCDetils?.lName == "" ? "-" : KYCDetils?.lName}</div>
                        </div>


                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-building purpleText" />
                          House No And street Name: <div className="ps-2">{KYCDetils?.userkycdetails?.streetName == "" ? "-" : KYCDetils?.userkycdetails?.streetName}</div>
                        </div>

                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-building purpleText" />
                          Suburbs/City: <div className="ps-2">{KYCDetils?.userkycdetails?.suburb == "" ? "-" : KYCDetils?.userkycdetails?.suburb}</div>
                        </div>
                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-map-pin purpleText" />
                          State: <div className="ps-2">{KYCDetils?.userkycdetails?.stateName == "" ? "-" : KYCDetils?.userkycdetails?.stateName}</div>
                        </div>
                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-map-pin purpleText" />
                          Postal Code : <div className="ps-2">{KYCDetils?.userkycdetails?.postalCode == "" ? "-" : KYCDetils?.userkycdetails?.postalCode}</div>
                        </div>
                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-id-card purpleText" />
                          Id Type : <div className="ps-2">{KYCDetils?.iddetails?.type == "" ? "-" : KYCDetils?.iddetails?.type}</div>
                        </div>
                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-id-card purpleText" />
                          Id No : <div className="ps-2">{KYCDetils?.iddetails?.documentNumber == "" ? "-" : KYCDetils?.iddetails?.documentNumber}</div>
                        </div>

                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-birthday-cake purpleText" />
                          Date of Birth : <div className="ps-2">{KYCDetils?.iddetails?.dob == "" ? "-" : KYCDetils?.iddetails?.dob}</div>
                        </div>

                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-id-card purpleText" />
                          ID Issuing Authority : <div className="ps-2">{KYCDetils?.iddetails?.issuingAuthority == "" ? "-" : KYCDetils?.iddetails?.issuingAuthority}</div>
                        </div>

                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-id-card purpleText" />
                          Card No : <div className="ps-2">{KYCDetils?.iddetails?.cardNumber == "" ? "-" : KYCDetils?.iddetails?.cardNumber}</div>
                        </div>

                        <div className="KYCFont my-4 d-flex ">
                          <i className="pe-2 fa fa-calendar purpleText" />
                          Date of Expiry: <div className="ps-2">{KYCDetils?.iddetails?.documentValidity == "" ? "-" : KYCDetils?.iddetails?.documentValidity}</div>
                        </div>

                      </div>
                    </TableCell>
                  </TableBody>
                </Table>
              </TableContainer> */}
              </>
            )}
          </div>
        </div>
        {/* <div className="d-flex justify-content-end mt-3">
          <div className="text-center ">
            <button
              type="submit"
              className="btn text-light rounded-5"
              style={{ background: "#AA2AE1" }}
            >
              Update
            </button>
          </div>
          <div className="text-center ">
            <button
              type="button"
              className="btn ms-3 text-light rounded-5 bg-dark"
            >
              Cancel
            </button>
          </div>
        </div> */}
      </div>

      {/* Suspend User */}
      <Modal show={showSuspendUser} onHide={handleSuspendUserPopup} size="lg">
        <Modal.Body className="modal-kyc-verify">
          <div
            className="cardActivePurple"
          >
            <strong>Are you sure you want to {KYCDetils.isBlacklist ? 'remove black' : 'black'} list user?</strong>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="mt-2 col-lg-3 d-block m-auto nextBtn1 text-white"
            variant="primary"
            onClick={submitSuspendUser}
          >
            Yes
          </Button>
          <Button
            className="mt-2 col-lg-3 d-block m-auto"
            variant="danger"
            onClick={handleSuspendUserPopup}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <ModalComponent
        show={verifiedPopup}
        title11='Verified successfully'
        onHide={() => handleClose()}/>

      <ModalComponent
        show={unVerifiedPopup}
        title11='Unverified successfully'
        onHide={() => handleClose()}/>
      <ModalComponentPopup
        show={modalShowPrChange}
        title1={`Are you sure want to ${KYCDetils?.userkycdetails?.verified === true ? 'Un Verify' : 'Verify'} this KYC ?`}
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={() => devKyc == true ? handleAction() : markKYC()}
      />
      <ModalComponent
        show={message}
        title11={responceData}
        onHide={() => handleCloseMessage()}/>
    </>
  )
}

export default KYC
