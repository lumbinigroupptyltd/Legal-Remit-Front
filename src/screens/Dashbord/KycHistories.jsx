import React, { useEffect, useState } from 'react'
import { CommonConstants } from '../../Constants/common.constants'
import axios from 'axios'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'

import VerifiedIcon from '@mui/icons-material/Verified'
import Chip from '@mui/material/Chip'
import Loader from '../Loader/Loader'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";

const KYCHistories = ({individualuserData, afterAddoc}) => {
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
    kycDocuments: [
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
  const [kycDocuments, setKycDocuments] = useState([])
  const [idAuthority, setIdAuthority] = useState([])
  const [loaderValue, setLoaderValue] = useState(true)
  const [showVerifyKyc, setShowVerifyKyc] = useState(false)
  const [selectedKycDetail, setSelectedKycDetail] = useState('')
  const [selectedUserId, setSelectedUserId] = useState('')

  const handleVerifyKycPopup = () => setShowVerifyKyc(false)

  const verifyKyc = (kycDetailId, userId) => {
    setShowVerifyKyc(true)

    setSelectedKycDetail(kycDetailId)
    setSelectedUserId(userId)
  }

  const submitVerifyKyc = () => {
    setLoaderValue(true)

    axios
        .get(CommonConstants.BASE_URL + `/activateKycDetail/userId/${selectedUserId}/kycId/${selectedKycDetail}`)
        .then(async (res) => {
          if (res.data.code === 200) {
            setLoaderValue(false)
            setShowVerifyKyc(false)

            afterAddoc(res.data.data)
            await fetchData()
          }
        })

    setShowVerifyKyc(false)
    setLoaderValue(false)
  }

  const fetchData = async () => {
    setLoaderValue(false)
    axios
      .get(CommonConstants.BASE_URL + '/getinactivekycdetailslistbyuserid/'+ individualuserData)
      .then(async (res) => {
        if (res.data.code === 200) {
          const responseData = res.data.data
          setKYCDetails(responseData)
          setKycDocuments(responseData?.idDocuments)
        }
      })
  }

  useEffect(() => {
    fetchData()
  }, [individualuserData])

  return (
    <>
      {loaderValue === true ? <Loader/> : ''}

      <div className="col-lg-12 px-0">
        <div className="row respoChildFooter">
          <div className="px-0">
            {KYCDetils && KYCDetils.length > 0 ?
                KYCDetils.map((row, index) => {
                  return (
                      <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                          <div className="d-flex justify-content-between purpleShadeBackground w-100 px-3 py-3">
                            Kyc Details
                          </div>

                        </AccordionSummary>
                        <AccordionDetails>
                          <TableContainer className="border p-1">
                            <div className="d-flex justify-content-end">
                              <a
                                  className="purpleBackground btn btn-default text-white bolder"
                                  onClick={() => verifyKyc(row.id, row.userId)}
                              >
                                Verify KYC
                              </a>
                            </div>
                            <Table aria-label="collapsible table">
                              <TableBody>
                                <div className="d-flex mt-1">
                                  <div className="col-lg-12 ps-0">
                                    <div className="KYCFont my-4 d-flex">
                                      <i className="pe-2 fa fa-building purpleText"/>
                                      House No & street Name:{' '}
                                      <div className="ps-2">
                                        {row?.streetName == ''
                                            ? '-'
                                            : row?.streetName}
                                      </div>
                                    </div>

                                    <div className="KYCFont my-4 d-flex">
                                      <i className="pe-2 fa fa-building purpleText"/>
                                      Suburbs/City:{' '}
                                      <div className="ps-2">
                                        {row?.suburb == ''
                                            ? '-'
                                            : row?.suburb}
                                      </div>
                                    </div>
                                    <div className="KYCFont my-4 d-flex">
                                      <i className="pe-2 fa fa-map-pin purpleText"/>
                                      State:{' '}
                                      <div className="ps-2">
                                        {row?.streetName == ''
                                            ? '-'
                                            : row?.streetName}
                                      </div>
                                    </div>
                                    <div className="KYCFont my-4 d-flex">
                                      <i className="pe-2 fa fa-map-pin purpleText"/>
                                      Postal Code :{' '}
                                      <div className="ps-2">
                                        {row?.postalCode == ''
                                            ? '-'
                                            : row?.postalCode}
                                      </div>
                                    </div>

                                    <div className="KYCFont my-4 d-flex">
                                      <i className="pe-2 fa fa-map-pin purpleText"/>
                                      Occupation :{' '}
                                      <div className="ps-2">
                                        {row?.occupationName == ''
                                            ? '-'
                                            : row?.occupationName}
                                      </div>
                                    </div>

                                    <div className="KYCFont my-4 d-flex">
                                      <i className="pe-2 fa fa-map-pin purpleText"/>
                                      Is Residence :{' '}
                                      <div className="ps-2">
                                        {row?.isResidence == true
                                            ? 'Yes'
                                            : 'No'}
                                      </div>
                                    </div>
                                  </div>

                                </div>

                                <div></div>
                              </TableBody>
                            </Table>
                          </TableContainer>

                          {/* Kyc Verify */}
                          <Modal show={showVerifyKyc} onHide={handleVerifyKycPopup} size="lg">
                            <Modal.Body className="modal-kyc-verify">
                              <div
                                  className="cardActivePurple"
                              >
                                <strong>Are you sure you want to verify</strong>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                  className="mt-2 col-lg-3 d-block m-auto nextBtn1 text-white"
                                  variant="primary"
                                  onClick={submitVerifyKyc}
                              >
                                Yes
                              </Button>
                              <Button
                                  className="mt-2 col-lg-3 d-block m-auto"
                                  variant="danger"
                                  onClick={handleVerifyKycPopup}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </AccordionDetails>
                      </Accordion>

                  )
                })
                : <>No History</>
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default KYCHistories
