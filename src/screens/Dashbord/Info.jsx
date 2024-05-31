import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
;
import ModalComponent from "./ModalComponent";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { CommonConstants } from "../../Constants/common.constants";
import moment from 'moment';
import VerifiedIcon from '@mui/icons-material/Verified';
import Chip from '@mui/material/Chip';
import Loader from '../Loader/Loader';

function Info({ individualuserData, updatedUSerINFO }) {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate()
  const [id, setID] = useState()
  const [fName, setfName] = useState('')
  const [lName, setlName] = useState('')
  const [phone, setphone] = useState('')
  const [email, setemail] = useState('')
  const [mName, setmName] = useState('')
  const [countryId, setcountryId] = useState("")
  const [refCodeId, setrefCodeId] = useState('')
  const [roleId, setroleId] = useState(0)
  const [isPhoneVerified, setisPhoneVerified] = useState(false)
  const [phoneVerifiedAt, setphoneVerifiedAt] = useState(null)
  const [businessName, setbusinessName] = useState('')
  const [regNo, setregNo] = useState("")
  const [businessAddress, setbusinessAddress] = useState('')
  const [isEmailVerified, setisEmailVerified] = useState(false)
  const [emailVerifiedAt, setemailVerifiedAt] = useState(null)
  const [isDeleted, setisDeleted] = useState(false)
  const [isOCRVerfiedId, setisOCRVerfiedId] = useState(false)
  const [verifiedKYC, setVerifiedKYC] = useState(false)
  const [fullName, setFullName] = useState("");
  const [loadervalue, setloadervalue] = useState(false);
  const [userData, setUserData] = useState(
    {
      userStatus: null,
      userName: " ",
      email: "",
      streetName: "",
      riskLevel: null,
      noOfTransactions: 0,
      totalAmtSent: 0,
      avgTransaction: 0,
      totalServiceCharge: 0,
      totalNoOfFreeServiceCharge: 0.0,
      noOfReceivingCountry: 0,
      noOfAmtSentLocalCurrency: 0,
      daysSinceLastTran: 0,
      daysSinceLastLogin: 0,
      dateOfRegistration: "",
      dateOfFirstTransaction: "",
      noOfTransactionInOneYr: 0,
      totalAmtSentInOneYr: 0,
      totalNoOfTransactionInLast90Days: 0,
      totalAmtSentIn90Days: 0.0,
      longestGapBetweenTwoTransaction: 0,
      shortestGapBetweentwonTransaction: 0,
      phone: ""
    }
  );
  useEffect(() => {
    setID(individualuserData);
    getUserData();
    if (updatedUSerINFO) {
      getUserData();
    }
  }, [individualuserData, updatedUSerINFO])

  const getUserData = async () => {
    setloadervalue(true);
    if (individualuserData !== 'undefined' || individualuserData !== "") {
      const userPayLoad = new FormData();
      userPayLoad.append('userId', individualuserData);
      const userResponse = await axios.post(`${CommonConstants.BASE_URL}/getusersummery`, userPayLoad);
      const responseData = userResponse.data.data;
      if (userResponse.data.status == true) {
        setUserData(responseData);
      }
    }
    setloadervalue(false);
  }

  const onEditSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      id: id,
      roleId: roleId,
      countryId: countryId,
      refCodeId: refCodeId,
      fName: fullName,
      mName: mName,
      lName: lName,
      phone: phone,
      isPhoneVerified: isPhoneVerified,
      phoneVerifiedAt: phoneVerifiedAt,
      email: email,
      businessName: businessName,
      regNo: regNo,
      businessAddress: businessAddress,
      isEmailVerified: isEmailVerified,
      emailVerifiedAt: emailVerifiedAt,
      isDeleted: isDeleted,
      isOCRVerfiedId: isOCRVerfiedId
    }
    await axios.post(`${CommonConstants.BASE_URL}/updateuserinformation`, payload)
      .then(res => {
        if (res.data.statuscode == 200) {
          setModalShow(true)
        }
        setfName(res.data.data.fName)
        setphone(res.data.data.phone)
        setemail(res.data.data.email)
      }).catch(err => {
        // alert("save")
        console.log(err)
      })
  }


  // const [verifiedKYC, setVerifiedKYC] = useState(false)
  const markKYC = async () => {
    try {
      const payLoad = {
        userId: individualuserData
      };
      const kycVerifyResponse = await axios.post(`${CommonConstants.BASE_URL}/markedkycverified`, payLoad);
      if (kycVerifyResponse.data.status === true) {
        setVerifiedKYC(true)
      } else {
        setVerifiedKYC(false)
      }

    } catch (error) {
      console.log(error)
    }

  }
  const redirectToUserPage = () => {
    navigate('/users')
  }
  const handleLoginchange = (email, password) => {
    console.log(email, "email", password);
  }
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="py-3" onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <div className="">
          <div className="row">
            <div className="col-md-6 border px-0">
              <div className="bg-transparent border-bottom ">
                <h5 className="mb-0  px-2 py-3">User Information</h5>
              </div>
              {userData && (
                <div className='px-2 py-2'>
                  <div className="my-4 mt-0 d-flex align-items-center">
                    <i className="pe-2 fa fa-user purpleText" />
                    User Status:{" "}
                    <div className="ps-2">
                      {userData?.userStatus === true ? (
                        <Chip
                          className="border-0 p-0"
                          icon={<VerifiedIcon />}
                          label={<div className="dateChip">Active</div>}
                          color="success"
                          variant="outlined"
                        />
                      ) : (
                        <span>
                          <i className="fa fa-times-circle text-danger"></i> InActive
                        </span>
                      )}
                      {/* <Chip
                        className="border-0 p-0"
                        icon={<VerifiedIcon />}
                        label={<div className="dateChip">Active</div>}
                        color="success"
                        variant="outlined"
                      /> */}
                    </div>
                  </div>
                  <div className="my-4 d-flex">
                    <i className="pe-2 fa fa-user purpleText" />
                    Full Name:{" "}
                    <div className="ps-2">
                      {userData.userName ? userData.userName : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex">
                    <i className="pe-2 fa fa-mobile purpleText" />
                    Mobile:{" "}
                    <div className="ps-2">
                      {userData.phone ? userData.phone : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex">
                    <i className="pe-2 fa fa-envelope purpleText" />
                    Email:{" "}
                    <div className="ps-2" style={{ overflowWrap: 'anywhere' }}>
                      {userData.email ? userData.email : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex">
                    <i className="pe-2 fa fa-address-card purpleText" />
                    Full Address:{" "}
                    <div className="ps-2">
                      {userData.streetName ? userData.streetName : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex">
                    <i className="pe-2 fa fa-user purpleText" />
                    User Code:{" "}
                    <div className="ps-2">
                      {userData.code ? userData.code : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex">
                    <i className="pe-2 fa fa-address-card purpleText" />
                    Customer Id:{" "}
                    <div className="ps-2">
                      {userData.customerId ? userData.customerId : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex">
                    <i className="pe-2 fa fa-level-up purpleText" />
                    Risk Level:{" "}
                    <div className="ps-2">
                      {userData?.riskLevel == null ? "-" : userData?.riskLevel}
                    </div>
                  </div>
                  <div className="my-4 d-flex">
                    <i className="pe-2 fa fa-dollar purpleText" />
                    Total No. of Transaction:{" "}
                    <div className="ps-2">
                      {userData?.noOfTransactions ? userData.noOfTransactions : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex">
                    <i className="pe-2 fa fa-dollar purpleText" />
                    Total Amount sent:
                    <div className="ps-2">
                      {userData?.totalAmtSent !== undefined &&
                        userData?.totalAmtSent !== null
                        ? Number((userData.totalAmtSent)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        // ? (Number(userData.totalAmtSent)).toFixed(2)?.toString()?.match(/^\d+(?:\.\d{0,4})?/)
                        : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex ">
                    <i className="pe-2 fa fa-dollar purpleText" />
                    Average Transaction size:{" "}
                    <div className="ps-2">
                      {userData?.avgTransaction !== undefined &&
                        userData?.avgTransaction !== null
                        ? (Number(userData?.avgTransaction?.toString()?.match(/^\d+(?:\.\d{0,2})?/)))
                        // ? (Number(userData.avgTransaction)).toFixed(2)
                        : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex ">
                    <i className="pe-2 fa fa-dollar purpleText" />
                    Total service Charge:{" "}
                    <div className="ps-2">
                      {userData?.totalServiceCharge !== undefined &&
                        userData?.totalServiceCharge !== null
                        ? (Number(userData?.totalServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/)))
                        // ? (Number(userData.totalServiceCharge)).toFixed(2)?.toString()?.match(/^\d+(?:\.\d{0,2})?/)
                        : "-"}
                    </div>
                  </div>


                </div>
              )}
            </div>
            <div className="col-md-6 border">
              <div className="bg-transparent invisible">
                <h5 className="mb-0 pb-0">User Information</h5>
              </div>
              {userData && (
                <div>
                  <div className="my-4 d-flex ">
                    <i className="pe-2 fa fa-dollar purpleText" />
                    Total no of service charge free transaction:{" "}
                    <div className="ps-2">
                      {userData?.totalNoOfFreeServiceCharge
                        ? userData.totalNoOfFreeServiceCharge
                        : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex mb-0 ">
                    <i className="pe-2 fa fa-flag purpleText" />
                    No of countries (Receiving countries):{" "}
                    <div className="ps-2">
                      {userData?.noOfReceivingCountry
                        ? userData.noOfReceivingCountry
                        : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex mt-3 ">
                    <i className="pe-2 fa fa-dollar purpleText" />
                    Total amount sent in local currencies:{" "}
                    <div className="ps-2">
                      {userData?.noOfAmtSentLocalCurrency
                        ? userData?.noOfAmtSentLocalCurrency
                        : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex ">
                    <i className="pe-2 fa fa-calendar purpleText" />
                    Days since last Transaction:{" "}
                    <div className="ps-2">
                      {userData?.daysSinceLastTran ? userData.daysSinceLastTran : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex">
                    <i className="pe-2 fa fa-calendar purpleText" />
                    Days since last Login:{" "}
                    <div className="ps-2">
                      {userData?.daysSinceLastLogin ? userData.daysSinceLastLogin : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex">
                    <i className="pe-2 fa fa-calendar purpleText" />
                    Date of Registration:{" "}
                    <div className="ps-2">
                      {userData?.dateOfRegistration ? moment(userData?.dateOfRegistration).format("YYYY-MM-DD") : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex ">
                    <i className="pe-2 fa fa-calendar purpleText" />
                    Date of First Transaction:{" "}
                    <div className="ps-2">
                      {userData?.dateOfFirstTransaction
                        ? moment(userData?.dateOfFirstTransaction).format("YYYY-MM-DD")
                        : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex ">
                    <i className="pe-2 fa fa-hashtag purpleText" />
                    No of Transaction in last 365 Days:{" "}
                    <div className="ps-2">
                      {userData?.noOfReceivingCountry
                        ? userData.noOfReceivingCountry
                        : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex ">
                    <i className="pe-2 fa fa-dollar purpleText" />
                    Total amount sent in last 365 days:{" "}
                    <div className="ps-2">
                      {userData?.totalAmtSentInOneYr !== undefined &&
                        userData?.totalAmtSentInOneYr !== null
                        ? (Number(userData.totalAmtSentInOneYr?.toString()?.match(/^\d+(?:\.\d{0,2})?/)))
                        // ? (Number(userData.totalAmtSentInOneYr)).toFixed(2)
                        : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex ">
                    <i className="pe-2 fa fa-hashtag  purpleText" />
                    Total no of transaction in last 90 Days:{" "}
                    <div className="ps-2">
                      {userData?.totalNoOfTransactionInLastNinetyDays
                        ? userData.totalNoOfTransactionInLastNinetyDays
                        : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex ">
                    <i className="pe-2 fa fa-dollar purpleText" />
                    Total amount sent in last 90 days:{" "}
                    <div className="ps-2">
                      {userData?.totalAmtSentInNinetyDays
                        ? userData.totalAmtSentInNinetyDays
                        : "-"}
                    </div>
                  </div>
                  {/* <div className="my-4 d-flex ">
                    <i className="pe-2 fa fa-hashtag  purpleText" />
                    Longest Gap between two transaction:{" "}
                    <div className="ps-2">
                      {userData?.longestGapBetweenTwoTransaction
                        ? userData.longestGapBetweenTwoTransaction
                        : "-"}
                    </div>
                  </div>
                  <div className="my-4 d-flex mb-0 ">
                    <i className="pe-2 fa fa-hashtag  purpleText" />
                    Shortest Gap between two transaction:{" "}
                    <div className="ps-2">
                      {userData?.shortestGapBetweentwonTransaction
                        ? userData.shortestGapBetweentwonTransaction
                        : "-"}
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>




      {/* <form onSubmit={onEditSubmit}>
                <div className="d-flex  justify-content-end align-items-center mb-3">
                    <div className='respoChildFooter d-flex'>

                        <div className='text-center mx-1 pbSt'>
                        </div>
                        <div id="KYCverifyButton" className='respoChildFooter mx-1'>
                            {individualuserData?.countryId == 14 ? <button type="button" class={verifiedKYC ? "px-2 mx-1 rounded-5 m-0 btn btn-danger" : "px-2  rounded-5 m-0 btn btn-success"} onClick={markKYC}>{verifiedKYC ? <div id="KYCverifyButtonText">Mark KYC Unverified</div> : <div id="KYCverifyButtonText">Mark KYC Verified</div>}</button> : null}
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Full Name:</label>
                        <input onChange={e => setFullName(e.target.value)} type="text" className='form-control' value={fullName} readOnly />
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Mobile:</label>
                        <input onChange={e => setphone(e.target.value)} type="text" className='form-control ' value={phone} readOnly />
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Email:</label>
                        <input onChange={e => setemail(e.target.value)} type="email" className='form-control' value={email} readOnly />
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Full address:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' value={userData?.businessAddress} readOnly></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Risk Level:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' value={userData?.riskLevel} readOnly></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Total No of transaction:</label>
                        <input value={userData?.businessDetails?.noOfTranscation} onChange={e => e.target.value} type="number" className='form-control ' readOnly></input>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Total Amount sent:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Average Transaction size:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Total service Charge:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Total no of service charge free transaction:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>No of countries (Receiving countries):</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Total amount sent in local currencies (countrywise)</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Days since last Transaction:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Days since last Login:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Date of Registration:</label>
                        <input value={DateofRegistration} onChange={e => e.target.value} type="date" className='form-control ' readOnly></input>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Date of First Transaction:</label>
                        <input onChange={e => e.target.value} type="date" className='form-control ' readOnly></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>No of Transaction in last 365 Days:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Total amount sent in last 365 days:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Total no of transaction in last 90 Days:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly ></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Total Amount in Last 90 days:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                    <div className='col-sm-4'>
                        <label className='font-weight-normal m-2 ms-0 me-0 labelCard'>Longest Gap between two transaction and Shortest Gap Between Two transaction:</label>
                        <input onChange={e => e.target.value} type="text" className='form-control ' readOnly></input>
                    </div>
                </div>


                <div className='info mt-5'>
                    <ToastContainer />

                    <div className='d-flex justify-content-end'>
                        <div className='text-center '>
                        
                        </div>
                        <div className='text-center '>
                        
                            <button type="submit" className='btn text-light rounded-5' style={{ background: "#AA2AE1" }} onClick={() => redirectToUserPage()}>Back</button>

                        </div>
                    </div>
                </div>
                <div className='text-center '>
                </div>
                <ModalComponent
                    show={modalShow}
                    title={"User updated successfully"}
                    onHide={() => setModalShow(false)}
                />
            </form> */}

    </>
  )
}

export default Info