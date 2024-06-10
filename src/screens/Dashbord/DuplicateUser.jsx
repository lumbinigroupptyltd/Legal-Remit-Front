import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { CommonConstants } from '../../Constants/common.constants'
import VerifiedIcon from '@mui/icons-material/Verified'
import Chip from '@mui/material/Chip'
import Loader from '../Loader/Loader'
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

function ScanTekInfo ({id}) {
  const [loaderValue, setLoaderValue] = useState(false)

  const [userDatas, setUserData] = useState({})

  const getDuplicateData = async () => {
    try {
      setLoaderValue(true)
      const url = `${CommonConstants.BASE_URL}/getuserduplicatebyid/${id}`
      const response = await axios.get(url)

      setUserData(response.data.data)
      setLoaderValue(false)
    } catch (error) {
      setLoaderValue(false)
      console.log(error)
    }

  }

  useEffect(async () => {
    await getDuplicateData()
  }, [id])

  return (
    <>
      {loaderValue === true ? <Loader/> : ''}

      <div className="py-3" onClick={() => {
        document.body.classList.remove('offcanvas-active')
      }}>
        <div className="">
          <div className="bg-transparent border-bottom ">
            <h5 className="mb-0  px-2 py-3">Duplicate Information</h5>
          </div>
          {userDatas && userDatas.length > 0 ? userDatas.map(userData => {
            return(
              <TableContainer className="border p-1">
                <Table aria-label="collapsible table">
                  <TableBody>
                    <div className="d-flex mt-1">
                      <div className="col-lg-12 ps-0">
                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-building purpleText"/>
                          User Name:{' '}
                          <div className="ps-2">
                            {userData ? userData.f_name + ' ' + userData.l_name : ''}
                          </div>
                        </div>

                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-building purpleText"/>
                          User ID :{' '}
                          <div className="ps-2">
                            {userData ? userData.user_id : ''}
                          </div>
                        </div>
                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-map-pin purpleText"/>
                          DOB: {' '}
                          <div className="ps-2">
                            {userData ? userData.dob : ''}
                          </div>
                        </div>
                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-map-pin purpleText"/>
                          Document Number :{' '}
                          <div className="ps-2">
                            {userData ? userData.docuemtn_numner : ''}
                          </div>
                        </div>

                        <div className="KYCFont my-4 d-flex">
                          <i className="pe-2 fa fa-map-pin purpleText"/>
                          Card Number :{' '}
                          <div className="ps-2">
                            {userData ? userData.card_number : ''}
                          </div>
                        </div>
                      </div>

                    </div>

                    <div></div>
                  </TableBody>
                </Table>
              </TableContainer>
            )
          }) : ''}
        </div>
      </div>

    </>
  )
}

export default ScanTekInfo
