import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { CommonConstants } from '../../Constants/common.constants'
import VerifiedIcon from '@mui/icons-material/Verified'
import Chip from '@mui/material/Chip'
import Loader from '../Loader/Loader'

function ScanTekInfo ({id}) {
  const [loaderValue, setLoaderValue] = useState(false)

  const [userData, setUserData] = useState({})

  const getUserDataFromScantek = async () => {
    try {
      setLoaderValue(true)
      const url = `${CommonConstants.BASE_URL}/getScantekVerifiedTransaction/${id}`
      const response = await axios.get(url)
      setUserData(response.data)
      setLoaderValue(false)
    } catch (error) {
      setLoaderValue(false)
      console.log(error)
    }

  }

  useEffect(() => {
    getUserDataFromScantek()
  }, [id])

  return (
    <>
      {loaderValue === true ? <Loader/> : ''}

      <div className="py-3" onClick={() => {
        document.body.classList.remove('offcanvas-active')
      }}>
        <div className="">
          <div className="bg-transparent border-bottom ">
            <h5 className="mb-0  px-2 py-3">ScanTek Information</h5>
          </div>
          {userData && (
            <div className="px-2 py-2">
              <div className="my-4 mt-0 d-flex align-items-center">
                <i className="pe-2 fa fa-user purpleText"/>
                User Status:{' '}
                <div className="ps-2">
                  {userData?.aggregateStatusLabel !== 'Not Matched' ? (
                    <Chip
                      className="border-0 p-0"
                      icon={<VerifiedIcon/>}
                      label={<div className="dateChip">Active</div>}
                      color="success"
                      variant="outlined"
                    />
                  ) : (
                    <span>
                          <i className="fa fa-times-circle text-danger"></i> Not Matched
                        </span>
                  )}
                </div>
              </div>
              <div className="my-4 d-flex">
                <i className="pe-2 fa fa-user purpleText"/>
                Full Name:{' '}
                <div className="ps-2">
                  {userData.firstNames !== null ? userData.firstNames + ' ' : ''}
                  {userData.middleNames !== null ? userData.middleNames + ' ' : ''}
                  {userData.lastNames !== null ? userData.lastNames : ''}
                </div>
              </div>
              <div className="my-4 d-flex">
                <i className="pe-2 fa fa-mobile purpleText"/>
                Mobile:{' '}
                <div className="ps-2">
                  {userData.dateOfBirth ? userData.dateOfBirth : '-'}
                </div>
              </div>
              <div className="my-4 d-flex">
                <i className="pe-2 fa fa-calendar purpleText"/>
                Date of Birth:{' '}
                <div className="ps-2">
                  {userData.dateOfBirth ? userData.dateOfBirth : '-'}
                </div>
              </div>
              <div className="my-4 d-flex">
                <i className="pe-2 fa fa-envelope purpleText"/>
                Email:{' '}
                <div className="ps-2" style={{overflowWrap: 'anywhere'}}>
                  {userData.emailAddress ? userData.emailAddress : '-'}
                </div>
              </div>

              <div className="border-top">
                <div className="bg-transparent border-bottom ">
                  <h5 className="mb-0  px-2 py-3">Verification Outcomes</h5>
                </div>
                <table className="w-100">
                  <thead>
                  <tr>
                    <th>Outcome Key</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Result</th>
                  </tr>
                  </thead>
                  <tbody>
                  {userData && userData.checkOutComes && userData.checkOutComes.map((item, index) => (
                    <tr key={index}>
                      <td>{item.outcomeKey}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.outcome === 'needsReview' ? 'Needs Review' : item.outcome}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>

              <div className="border-top mt-4">

                {userData && userData.idDetails ? (
                  <div className="row w-100">
                    <div className="col-md-6 col-sm-12">
                      <div className="bg-transparent border-bottom ">
                        <h5 className="mb-0  px-2 py-3">Scanned ID Details</h5>
                      </div>
                      <table className="ps-2">
                        {Object.entries(userData.idDetails)
                          .filter(([key, value]) => value !== null && value !== '')
                          .map(([key, value]) => (
                            <tr key={key}>
                              <td className='capitalize'>{key.replace(/([a-z])([A-Z])/g, '$1 $2')}:</td>
                              <td> {value}{' '}</td>
                            </tr>
                          ))}
                      </table>
                    </div>

                    <div className="col-md-6 w-full">
                      <div className="bg-transparent border-bottom ">
                        <h5 className="mb-0  px-2 py-3">Scanned Images</h5>
                      </div>
                      {userData && userData.scantekDocuments && userData.scantekDocuments.map((item, index) => (
                          <>
                            {
                              Object.entries(item)
                                .filter(([key, value]) => value !== null && value !== '')
                                .map(([key, value]) => (
                                  <div key={key} className='mt-4'>
                                    <p className="font-14 m-0">{key.replace(/([a-z])([A-Z])/g, '$1 $2')}:</p>
                                    <img
                                      src={value}
                                      alt="id"
                                      style={{width: '400px', height: 'auto', objectFit: 'contain'}}
                                    />
                                  </div>
                                ))
                            }
                          </>
                        )
                      )}
                    </div>
                  </div>
                ) : ''}

              </div>

            </div>
          )}
        </div>
      </div>

    </>
  )
}

export default ScanTekInfo
