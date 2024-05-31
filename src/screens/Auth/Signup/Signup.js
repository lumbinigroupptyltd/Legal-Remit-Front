import React, {lazy, useEffect, useState, Suspense} from 'react'
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
import Step3 from './WizardFormsSteps/Step3/Step3'
import Step4 from './WizardFormsSteps/Step4/Step4'
import Step5 from './WizardFormsSteps/Step5/Step5'
import Step6 from './WizardFormsSteps/Step6/Step6'
import Step7 from './WizardFormsSteps/Step7/Step7'
import userContext from './Signupdata/Usecontext'
import { CommonConstants } from '../../../Constants/common.constants'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import Loader from '../../Loader/Loader'
import ModalComponent from '../../Dashbord/ModalComponent'

const Step2 = lazy(() => import('./WizardFormsSteps/Step2/Step2'))

// const validator = require('../../../assets/js/validator')

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
  return (<div>
    <Step3></Step3>
  </div>)
}
const fourthComponent = () => {
  return (<div>
    <Step4></Step4>
  </div>)
}
const fifthComponent = () => {
  return (<div>
    <Step5></Step5>
  </div>)
}
const sixthComponent = () => {
  return (<div>
    <Step6></Step6>
  </div>)
}
const finalComponent = () => {
  return (<div>
    <Step7></Step7>
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
  return <img src={fourth4}/>
}
const imageFifthComponent = () => {
  return <img src={fifth5}/>
}
const imageSixthComponent = () => {
  return <img src={sixth6}/>
}
const imageFinalComponent = () => {
  return <img src={final7}/>
}

export default function Signup () {
  const navigate = useNavigate()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const codeParam = queryParams.get('code')

  //////////loader set/////////////
  const [loadervalue, setloadervalue] = useState(false)
  /////////////////////////////////
  const [Countrydata, setCountryData] = useState('')
  const [AdditionalImageArray, setAdditionalImageArray] = useState()
  const [data, setData] = useState('')
  const [data2, setData2] = useState('')
  const [data3, setData3] = useState('')
  const [data4, setData4] = useState('')
  const [data5, setData5] = useState('')
  const [data6, setData6] = useState('')
  const [DataImage, setDataImage] = useState([])
  const [DataImageBack, setDataImageBack] = useState([])
  const [BusinessDataImageFront, setBusinessDataImageFront] = useState([])
  const [BusinessDataImageBack, setBusinessDataImageBack] = useState([])
  const [AgentDataImageFront, setAgentDataImageFront] = useState([])
  const [AgentDataImageBack, setAgentDataImageBack] = useState([])
  const [showSuccess, setshowSuccess] = useState(false)
  // const [name1, setName] = useState('Tarun');
  const [businessStep1, setBusissnesStep1] = useState('')
  const [showBuisnessModal, setBuisnessModal] = useState('')
  const [userIdType, setuserIdType] = useState('')
  const [IndividualOtpMobile, setIndividualOtpMobile] = useState('')
  const [BusinessOtpMobile, setBusinessOtpMobile] = useState('')
  const [AgentOtpMobile, setAgentOtpMobile] = useState('')
  const [show, setShow] = useState(false)
  const [modalShowAdd, setModalShowAdd] = useState(false)
  const [Validornot, setValidornot] = useState(0)
  const [BValidornot, setBValidornot] = useState(0)
  const [AValidornot, setAValidornot] = useState(0)
  const [MValidornot, setMValidornot] = useState(0)
  const [BMValidornot, setBMValidornot] = useState(0)
  const [AMValidornot, setAMValidornot] = useState(0)

  //////////SignupData State/////////////////

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSuccessClose = () => {
    setshowSuccess(false)
    // navigate('/')
  }

  const [steps1, setSteps1] = useState([{
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

  const [steps, setSteps] = useState([{
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
    label: 'Business Details',
    icon: third3,
    isDone: false,
    isRemain: false,
    component: thirdComponent,
    components: imageThirdComponent
  }, {
    key: 'fourthStep',
    label: 'KYC Details',
    icon: fourth4,
    isDone: false,
    isRemain: false,
    component: fourthComponent,
    components: imageFourthComponent
  }, {
    key: 'fifthStep',
    label: 'ID Details ',
    icon: fifth5,
    isDone: false,
    isRemain: false,
    component: fifthComponent,
    components: imageFifthComponent
  }, {
    key: 'sixthStep',
    label: 'Upload Document ',
    icon: sixth6,
    isDone: false,
    isRemain: false,
    component: sixthComponent,
    components: imageSixthComponent
  }, {
    key: 'finalStep',
    label: 'Summary',
    icon: final7,
    isDone: false,
    isRemain: false,
    component: finalComponent,
    components: imageFinalComponent
  }])

  // to set the data got from step6Data start

  const [Countryydata, setCountryydata] = useState()
  const [Countryydataerror, setCountryydataerror] = useState()
  const [Data1Step6, setData1Step6] = useState('')
  const [Data2Step6, setData2Step6] = useState()
  const [Data3Step6, setData3Step6] = useState()
  const [Data4Step7, setData4Step7] = useState()
  // const [clickToggle,setclickToggle]= useState("")

 
  // to get data from step6 start

  const step6Data = (step6Data1, step6Data2, step6Data3, step7data4) => {
    setData1Step6(step6Data1)

    setData2Step6(step6Data2)

    setData3Step6(step6Data3)

    setData4Step7(step7data4)
  }


  // to get data from step6 end

  // new code
  const [FrontImage, setFrontImage] = useState([])
  const [BackImage, setBackImage] = useState([])

  const NakeebImage = (nakeebData, nakeebDataBack) => {
    setFrontImage(nakeebData)
    setBackImage(nakeebDataBack)
  }

  let imageArray = FrontImage.concat(BackImage)

  const [BusinessFront, setBusinessFront] = useState([])
  const [BusinessBack, setBusinessBack] = useState([])
  const Business_Images = (Front, Back) => {
    setBusinessFront(Front)
    setBusinessBack(Back)
  }

  let B_imageArray = BusinessFront.concat(BusinessBack)
 

  const [AgentFront, setAgentFront] = useState([])
  const [AgentBack, setAgentBack] = useState([])

  const Agent_Images = (nakeebData, nakeebDataBack) => {
    
    setAgentFront(nakeebData)
    setAgentBack(nakeebDataBack)
  }
  let A_imageArray = AgentFront.concat(AgentBack)


  const CountryCode = () => {
    const CCodeNumber = Countrydata.CountryPhoneCode.substring(0, 1)
    if (CCodeNumber === '+') {
      return Countrydata.CountryPhoneCode
    } else {
      return '+' + Countrydata.CountryPhoneCode
    }
  }

  const [UserID, setUserID] = useState(0)
  const [USER_Info, setUSER_Info] = useState([])

  const [RegisterID, setRegisterID] = useState()
  const [BusinessRegisterID, setBusinessRegisterID] = useState()
  const [IdDocumnetRegisterID, setIdDocumnetRegisterID] = useState()
  const [KYCRegisterID, setKYCRegisterID] = useState()
  const [AutoRefralCode, setAutoRefralCode] = useState('')

  const RefralCode = (R_Code) => {
    setAutoRefralCode(R_Code)
  }

  const handleSendUPDATEDataIndividual = async () => {
    setloadervalue(true)

   
    if (RegisterID) {
      const formData = new FormData()
      formData.append('user', `{
           "id": ${RegisterID},
           "roleId":2,
           "countryId":${Countrydata.CountryId},
           "refCodeId":"",
           "fName":"${Data1Step6.IndidualFirstname}",
           "mName":"${Data1Step6.IndidualMiddlename}",
           "lName":"${Data1Step6.IndidualLastname}",
           "businessName":"",
           "regNo":"",
           "businessAddress":"",
           "phone":"${Data1Step6.IndidualMobileNumber}",
           "phoneCode":"${CountryCode()}",
           "isPhoneVerified":true,
           "phoneVerifiedAt":"",
           "isEmailVerified":0,
           "emailVerifiedAt":"",
           "isDeleted":false,
           "isOCRVerfiedId":0,
           "email":"${Data1Step6.IndidualEmail}",
           "digitalVerifiedLink": "${IndividualScantakID}",
           "digitalVerifiedTransactionId":"${IndividualScantakLink}",
           "isSignupCompleted":false,
           "referralCode": "${data.Referal}"
          }`)

      formData.append('kycdetails', `{
          "id": ${KYCRegisterID},
          "userId": ${RegisterID},
          "countryId":${USER_Info?.userkycdetails?.countryId ?? null},
          "streetName":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.streetName ? USER_Info.userkycdetails.streetName : `""`},
          "stateId":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.stateId ? USER_Info.userkycdetails.stateId : 0},
          "nationality":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.nationality ? USER_Info.userkycdetails.nationality : `""`}, 
          "suburb":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.suburb ? USER_Info.userkycdetails.suburb : `""`}, 
          "postalCode":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.postalCode ? USER_Info.userkycdetails.postalCode : `""`}, 
          "verified":0,
          "occupationId":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.occupationId ? USER_Info.userkycdetails.occupationId : 0}, 
          "isResidence": ${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.isResidence ? USER_Info.userkycdetails.isResidence : false}, 
          "kycStatus":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.kycStatus ? USER_Info.userkycdetails.kycStatus : false}
        }`)

      formData.append('iddetails', `{
          "id": ${IdDocumnetRegisterID},
          "userId": ${RegisterID},
          "typeId":${USER_Info?.iddetails?.typeId == undefined || USER_Info?.iddetails?.typeId == '' ? `""` : USER_Info?.iddetails?.typeId},
          "documentNumber":${USER_Info?.iddetails?.documentNumber == undefined || USER_Info?.iddetails?.documentNumber == '' ? `""` : USER_Info?.iddetails?.documentNumber},
          "cardNumber":${USER_Info?.iddetails?.cardNumber == undefined || USER_Info?.iddetails?.cardNumber == '' ? `""` : USER_Info?.iddetails?.cardNumber},
          "dob":${USER_Info?.iddetails?.dob == undefined || USER_Info?.iddetails?.dob == '' ? `""` : USER_Info?.iddetails?.dob},
          "documentValidity":${USER_Info?.iddetails?.documentValidity == undefined || USER_Info?.iddetails?.documentValidity == '' ? `""` : USER_Info?.iddetails?.documentValidity},
          "issuingAuthority":${USER_Info?.iddetails?.issuingAuthority == undefined || USER_Info?.iddetails?.issuingAuthority == '' ? `""` : USER_Info?.iddetails?.issuingAuthority}
        }`)

      formData.append('businessDetails', `{
          "id": ${BusinessRegisterID},
          "userId": ${RegisterID},
          "companyName":"",
          "abn":"",
          "typeBusiness":"",
          "industryType":"",
          "noDirector":"",
          "noShareholder":"",
          "noEmployee":"",
          "businessAddress":"",
          "targetBusiness":"",
          "website":"",
          "expectedRemittance":"",
          "volumeYear":"",
          "noOfTranscation":"",
          "countryOfBusiness":""
        }`)

      const config = {
        method: 'POST',
        url: CommonConstants.BASE_URL + '/updateuserinfo',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
      }

      await axios(config)
        .then(function (response) {
          if (response.data.status === true) {
            // handleOPopup()
            setloadervalue(false)
            HandlerIndividualUser()
            axios.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: response.data.data.id}).then((respo) => {
              setUserID(respo.data.data?.id)
              setUSER_Info(respo.data?.data)
              setBusinessRegisterID(respo.data.data.businessDetails.id)
              setIdDocumnetRegisterID(respo.data.data.iddetails.id)
              setKYCRegisterID(respo.data.data.userkycdetails.id)
            }).catch(err => {
              console.log(err)
            })
          } else {
            setloadervalue(false)
          }
        })
        .catch(function (error) {
          setloadervalue(false)
        })
    }
  }

  const handleSendDataIndividual = async () => {
    // if (validator.error_input_validation(handleId)) {
      setloadervalue(true)
      if (RegisterID) {
        const formData = new FormData()
        formData.append('user', `{
            "id": ${RegisterID},
            "roleId":2,
            "countryId":${Countrydata?.CountryId},
            "refCodeId":"",
            "fName":"${Data1Step6?.IndidualFirstname}",
            "mName":"${Data1Step6?.IndidualMiddlename}",
            "lName":"${Data1Step6?.IndidualLastname}",
            "businessName":"",
            "regNo":"",
            "businessAddress":"",
            "phone":"${Data1Step6?.IndidualMobileNumber}",
            "phoneCode":"${CountryCode()}",
            "isPhoneVerified":${USER_Info?.isPhoneVerified},
            "phoneVerifiedAt":"",
            "isEmailVerified":0,
            "emailVerifiedAt":"",
            "isDeleted":false,
            "isOCRVerfiedId":0,
            "email":"${Data1Step6?.IndidualEmail}",
            "digitalVerifiedLink": "${IndividualScantakID}",
            "digitalVerifiedTransactionId": "${IndividualScantakLink}",
            "isSignupCompleted" : false ,
            "referralCode": "${data?.Referal}"
            }`)

        formData.append('kycdetails', `{
          "id": ${KYCRegisterID},
          "userId": ${RegisterID},
          "countryId":${USER_Info?.userkycdetails?.countryId ?? null},
          "streetName":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.streetName ? USER_Info.userkycdetails.streetName : `""`},
          "stateId":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.stateId ? USER_Info.userkycdetails.stateId : 0},
          "nationality":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.nationality ? USER_Info.userkycdetails.nationality : `""`}, 
          "suburb":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.suburb ? USER_Info.userkycdetails.suburb : `""`}, 
          "postalCode":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.postalCode ? USER_Info.userkycdetails.postalCode : `""`}, 
          "verified":0,
          "occupationId":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.occupationId ? USER_Info.userkycdetails.occupationId : 0}, 
          "isResidence": ${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.isResidence ? USER_Info.userkycdetails.isResidence : false}, 
          "kycStatus":${USER_Info && USER_Info.userkycdetails && USER_Info.userkycdetails.kycStatus ? USER_Info.userkycdetails.kycStatus : false}
        }`)

        formData.append('iddetails', `{
            "id": ${IdDocumnetRegisterID},
            "userId": ${RegisterID},
            "typeId":${USER_Info?.iddetails?.typeId},
            "documentNumber":"${USER_Info?.iddetails?.documentNumber}",
            "cardNumber":"${USER_Info?.iddetails?.cardNumber}",
            "dob":"${USER_Info?.iddetails?.dob}",
            "documentValidity":"${USER_Info?.iddetails?.documentValidity}",
            "issuingAuthority":"${USER_Info?.iddetails?.issuingAuthority}"
          }`)

        formData.append('businessDetails', `{
            "id": ${BusinessRegisterID},
            "userId": ${RegisterID},
            "companyName":"",
            "abn":"",
            "typeBusiness":"",
            "industryType":"",
            "noDirector":"",
            "noShareholder":"",
            "noEmployee":"",
            "businessAddress":"",
            "targetBusiness":"",
            "website":"",
            "expectedRemittance":"",
            "volumeYear":"",
            "noOfTranscation":"",
            "countryOfBusiness":""
          }`)

        const config = {
          method: 'POST',
          url: CommonConstants.BASE_URL + '/updateuserinfo',
          headers: {'Content-Type': 'multipart/form-data'},
          data: formData
        }

        axios(config)
          .then(function (response) {
            if (response.data.status === true) {
              handleOPopup()
              setloadervalue(false)
              HandlerIndividualUser()
            } else {
              setloadervalue(false)
            }
          })
          .catch(function (error) {
            setloadervalue(false)
          })
      } else {
        const formData = new FormData()
        formData.append('user', `{
          "roleId":2,
          "countryId":${Countrydata?.CountryId},
          "refCodeId":"",
          "fName":"${Data1Step6?.IndidualFirstname}",
          "mName":"${Data1Step6?.IndidualMiddlename}",
          "lName":"${Data1Step6?.IndidualLastname}",
          "businessName":"",
          "regNo":"",
          "regTimezone":"",
          "businessAddress":"",
          "phone":"${Data1Step6?.IndidualMobileNumber}",
          "phoneCode":"${CountryCode()}",
          "isPhoneVerified":false,
          "phoneVerifiedAt":"",
          "isEmailVerified":0,
          "emailVerifiedAt":"",
          "isDeleted":false,
          "isOCRVerfiedId":0,
          "email":"${Data1Step6?.IndidualEmail}",
          "password":"${IndividualPassword}",
          "digitalVerifiedLink": "${IndividualScantakID}",
          "digitalVerifiedTransactionId": "${IndividualScantakLink}",
          "isSignupCompleted" : false ,
          "referralCode": "${AutoRefralCode}"
          }`)

        formData.append('kycdetails', `{
          "streetName":"",
          "countryId":${Countrydata?.CountryId},
          "stateId":"",
          "nationality":"", 
          "suburb":"", 
          "postalCode":"", 
          "verified":0,
          "occupationId":"", 
          "isResidence": "", 
          "kycStatus":""
        }`)

        formData.append('iddetails', `{
          "typeId":"",
          "documentNumber":"",
          "cardNumber":"",
          "dob":"",
          "documentValidity":"",
          "issuingAuthority":""
        }`)

        formData.append('businessDetails', `{
          "companyName":"",
          "abn":"",
          "typeBusiness":"",
          "industryType":"",
          "noDirector":"",
          "noShareholder":"",
          "noEmployee":"",
          "businessAddress":"",
          "targetBusiness":"",
          "website":"",
          "expectedRemittance":"",
          "volumeYear":"",
          "noOfTranscation":"",
          "countryOfBusiness":""
        }`)

        // for (let i = 0; i < imageArray.length; i++) {
        //   const fileName = imageArray[i].name;
        //   formData.append("iddocuments", imageArray[i], fileName);
        // }

        const config = {
          method: 'POST',
          url: CommonConstants.BASE_URL + '/signup',
          headers: {'Content-Type': 'multipart/form-data'},
          data: formData
        }

        axios(config)
          .then(function (response) {
            if (response.data.status === true) {
              setloadervalue(false)
              setRegisterID(response.data.data.id)
              axios.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: response.data.data.id}).then((respo) => {
                setUserID(respo.data.data?.id)
                setUSER_Info(respo.data?.data)
                setBusinessRegisterID(respo.data.data.businessDetails.id)
                setIdDocumnetRegisterID(respo.data.data.iddetails.id)
                setKYCRegisterID(respo.data.data.userkycdetails.id)
                handleOPopup()

              }).catch(err => {
                console.log(err)
              })
            } else {
              setloadervalue(false)
            }
          })
          .catch(function (error) {
            setloadervalue(false)
          })
      }
    // }
  }

  const handleUserIdType = (Type) => {
    setuserIdType(Type)
  }

  const handleIndividualUserIdType = (Type) => {
    setuserIdType(Type)
  }

  const [isEmailAndPhoneValid, setIsEmailAndPhoneValid] = useState(false)

  const updateIsEmailAndPhoneValid = (value) => {
    setIsEmailAndPhoneValid(value)
  }

  const handleSendDataUPDATEBusinessorAgent = async () => {
    setloadervalue(true)
    if (data.RoleId === 'Business') {
      // if (validator.error_input_validation(handleId)) {
        const formData = new FormData()
        if (RegisterID) {
          formData.append('user', `{
              "id":${RegisterID},
              "roleId":3 ,
              "countryId":${Countrydata?.CountryId},
              "refCodeId":"${data?.Referal}",
              "fName":"${Data1Step6?.Business_Fullname}",
              "mName":"",
              "lName":"",
              "businessName":"${Data1Step6?.Business_BusinessName}",
              "regNo":"${Data1Step6?.Business_RegistrationNo}",
              "regTimezone":"",
              "businessAddress":"${Data1Step6?.Business_AddressofBusiness}",
              "phone":"${Data1Step6?.Business_MobileNumber}",
              "phoneCode":"${CountryCode()}",
              "isPhoneVerified":true,
              "phoneVerifiedAt":"",
              "isEmailVerified":0,
              "emailVerifiedAt":"",
              "isDeleted":false,
              "isOCRVerfiedId":0,
              "email":"${Data1Step6?.Business_BusinessEmail}",
              "digitalVerifiedLink": "${BusinessScantakID}",
              "digitalVerifiedTransactionId": "${BusinessScantakLink}",
              "isSignupCompleted" : false,
              "referralCode": "${data?.Referal}"
              }`)

          formData.append('kycdetails', `{
                "id": ${KYCRegisterID},
                "userId": ${RegisterID},
                "countryId":${USER_Info?.userkycdetails?.countryId == undefined ? 0 : USER_Info?.userkycdetails?.countryId},
                "streetName":${USER_Info?.userkycdetails?.streetName == undefined ? `""` : USER_Info?.userkycdetails?.streetName},
                "stateId":${USER_Info?.userkycdetails?.stateId == undefined ? `""` : USER_Info?.userkycdetails?.stateId},
                "nationality":${USER_Info?.userkycdetails?.nationality == undefined ? `""` : USER_Info?.userkycdetails?.nationality}, 
                "suburb":${USER_Info?.userkycdetails?.suburb == undefined ? `""` : USER_Info?.userkycdetails?.suburb}, 
                "postalCode":${USER_Info?.userkycdetails?.postalCode == undefined ? `""` : USER_Info?.userkycdetails?.postalCode}, 
                "verified":0,
                "occupationId":${USER_Info?.userkycdetails?.occupationId == undefined ? `""` : USER_Info?.userkycdetails?.occupationId}, 
                "isResidence": ${USER_Info?.userkycdetails?.isResidence == undefined ? `""` : USER_Info?.userkycdetails?.isResidence}, 
                "kycStatus":${USER_Info?.userkycdetails?.kycStatus == undefined ? `""` : USER_Info?.userkycdetails?.kycStatus}
              }`)

          formData.append('iddetails', `{
              "id": ${IdDocumnetRegisterID},
              "userId": ${RegisterID},
              "typeId":${USER_Info?.iddetails?.typeId == undefined || USER_Info?.iddetails?.typeId == '' ? `""` : USER_Info?.iddetails?.typeId},
              "documentNumber":${USER_Info?.iddetails?.documentNumber == undefined || USER_Info?.iddetails?.documentNumber == '' ? `""` : USER_Info?.iddetails?.documentNumber},
              "cardNumber":${USER_Info?.iddetails?.cardNumber == undefined || USER_Info?.iddetails?.cardNumber == '' ? `""` : USER_Info?.iddetails?.cardNumber},
              "dob":${USER_Info?.iddetails?.dob == undefined || USER_Info?.iddetails?.dob == '' ? `""` : USER_Info?.iddetails?.dob},
              "documentValidity":${USER_Info?.iddetails?.documentValidity == undefined || USER_Info?.iddetails?.documentValidity == '' ? `""` : USER_Info?.iddetails?.documentValidity},
              "issuingAuthority":${USER_Info?.iddetails?.issuingAuthority == undefined || USER_Info?.iddetails?.issuingAuthority == '' ? `""` : USER_Info?.iddetails?.issuingAuthority}
            }`)


          formData.append('businessDetails', `{
              "id": ${BusinessRegisterID},
              "userId": ${RegisterID},
              "companyName":${USER_Info?.businessDetails?.companyName == undefined || USER_Info?.businessDetails?.companyName == '' ? `""` : USER_Info?.businessDetails?.companyName},
              "abn":${USER_Info?.businessDetails?.abn == undefined || USER_Info?.businessDetails?.abn == '' ? `""` : USER_Info?.businessDetails?.abn},
              "typeBusiness":${USER_Info?.businessDetails?.typeBusiness == undefined || USER_Info?.businessDetails?.typeBusiness == '' ? `""` : USER_Info?.businessDetails?.typeBusiness},
              "industryType":${USER_Info?.businessDetails?.industryType == undefined || USER_Info?.businessDetails?.industryType == '' ? `""` : USER_Info?.businessDetails?.industryType},
              "noDirector":${USER_Info?.businessDetails?.noDirector == undefined || USER_Info?.businessDetails?.noDirector == '' ? `""` : USER_Info?.businessDetails?.noDirector},
              "noShareholder":${USER_Info?.businessDetails?.noShareholder == undefined || USER_Info?.businessDetails?.noShareholder == '' ? `""` : USER_Info?.businessDetails?.noShareholder},
              "noEmployee":${USER_Info?.businessDetails?.noEmployee == undefined || USER_Info?.businessDetails?.noEmployee == '' ? `""` : USER_Info?.businessDetails?.noEmployee},
              "businessAddress":${USER_Info?.businessDetails?.businessAddress == undefined || USER_Info?.businessDetails?.businessAddress == '' ? `""` : USER_Info?.businessDetails?.businessAddress},
              "targetBusiness":${USER_Info?.businessDetails?.targetBusiness == undefined || USER_Info?.businessDetails?.targetBusiness == '' ? `""` : USER_Info?.businessDetails?.targetBusiness},
              "website":${USER_Info?.businessDetails?.website == undefined || USER_Info?.businessDetails?.website == '' ? `""` : USER_Info?.businessDetails?.website},
              "expectedRemittance":${USER_Info?.businessDetails?.expectedRemittance == undefined || USER_Info?.businessDetails?.expectedRemittance == '' ? `""` : USER_Info?.businessDetails?.expectedRemittance},
              "noOfTranscation":${USER_Info?.businessDetails?.noOfTranscation == undefined || USER_Info?.businessDetails?.noOfTranscation == '' ? `""` : USER_Info?.businessDetails?.noOfTranscation},
              "countryOfBusiness":${USER_Info?.businessDetails?.countryOfBusiness == undefined || USER_Info?.businessDetails?.countryOfBusiness == '' ? `""` : USER_Info?.businessDetails?.countryOfBusiness}
            }`)

          const config = {
            method: 'POST',
            url: CommonConstants.BASE_URL + '/updateuserinfo',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }

          axios(config)
            .then(function (response) {
              if (response.data.status === true) {
                // showSuccess(true)
                setloadervalue(false)
                handleBussinessAndAgent()
              } else {
                setloadervalue(false)
              }
            })
            .catch(function (error) {
            
              setloadervalue(false)
            })
        }
      }
    // }
     else if (data.RoleId === 'Agent') {
      setloadervalue(true)
      const formData = new FormData()
      // if (validator.error_input_validation(handleId)) {
        if (RegisterID) {
          formData.append('user', `{
             "id":${RegisterID},
             "roleId":4,
             "countryId":${Countrydata.CountryId},
             "refCodeId":"${data.Referal}",
             "fName":"${Data1Step6.Agent_Firstname}",
             "mName":"${Data1Step6.Agent_Middlename}",
             "lName":"${Data1Step6.Agent_Lastname}",
             "businessName":"",
             "regNo":"",
             "regTimezone":"",
             "businessAddress":"",
             "phone":"${Data1Step6.Agent_MobileNumber}",
             "phoneCode":"${CountryCode()}",
             "isPhoneVerified":true,
             "phoneVerifiedAt":"",
             "isEmailVerified":0,
             "emailVerifiedAt":"",
             "isDeleted":false,
             "isOCRVerfiedId":0,
             "email":"${Data1Step6.Agent_Email}",
             "digitalVerifiedLink": "${AgentScantakID}",
             "digitalVerifiedTransactionId": "${AgentScantakLink}",
             "isSignupCompleted" : false ,
             "referralCode": "${data.Referal}"
            }`)

          formData.append('kycdetails', `{
            "id": ${KYCRegisterID},
            "userId": ${RegisterID},
            "countryId":${USER_Info?.userkycdetails?.countryId == undefined ? 0 : USER_Info?.userkycdetails?.countryId},
            "streetName":${USER_Info?.userkycdetails?.streetName == undefined ? `""` : USER_Info?.userkycdetails?.streetName},
            "stateId":${USER_Info?.userkycdetails?.stateId == undefined ? `""` : USER_Info?.userkycdetails?.stateId},
            "nationality":${USER_Info?.userkycdetails?.nationality == undefined ? `""` : USER_Info?.userkycdetails?.nationality}, 
            "suburb":${USER_Info?.userkycdetails?.suburb == undefined ? `""` : USER_Info?.userkycdetails?.suburb}, 
            "postalCode":${USER_Info?.userkycdetails?.postalCode == undefined ? `""` : USER_Info?.userkycdetails?.postalCode}, 
            "verified":0,
            "occupationId":${USER_Info?.userkycdetails?.occupationId == undefined ? `""` : USER_Info?.userkycdetails?.occupationId}, 
            "isResidence": ${USER_Info?.userkycdetails?.isResidence == undefined ? `""` : USER_Info?.userkycdetails?.isResidence}, 
            "kycStatus":${USER_Info?.userkycdetails?.kycStatus == undefined ? `""` : USER_Info?.userkycdetails?.kycStatus}
          }`)

          formData.append('iddetails', `{
              "id": ${IdDocumnetRegisterID},
              "userId": ${RegisterID},
              "typeId":${USER_Info?.iddetails?.typeId == undefined || USER_Info?.iddetails?.typeId == '' ? `""` : USER_Info?.iddetails?.typeId},
              "documentNumber":${USER_Info?.iddetails?.documentNumber == undefined || USER_Info?.iddetails?.documentNumber == '' ? `""` : USER_Info?.iddetails?.documentNumber},
              "cardNumber":${USER_Info?.iddetails?.cardNumber == undefined || USER_Info?.iddetails?.cardNumber == '' ? `""` : USER_Info?.iddetails?.cardNumber},
              "dob":${USER_Info?.iddetails?.dob == undefined || USER_Info?.iddetails?.dob == '' ? `""` : USER_Info?.iddetails?.dob},
              "documentValidity":${USER_Info?.iddetails?.documentValidity == undefined || USER_Info?.iddetails?.documentValidity == '' ? `""` : USER_Info?.iddetails?.documentValidity},
              "issuingAuthority":${USER_Info?.iddetails?.issuingAuthority == undefined || USER_Info?.iddetails?.issuingAuthority == '' ? `""` : USER_Info?.iddetails?.issuingAuthority}
            }`)

          formData.append('businessDetails', `{
            "id": ${BusinessRegisterID},
            "userId": ${RegisterID},
            "companyName":${USER_Info?.businessDetails?.companyName == undefined || USER_Info?.businessDetails?.companyName == '' ? `""` : USER_Info?.businessDetails?.companyName},
            "abn":${USER_Info?.businessDetails?.abn == undefined || USER_Info?.businessDetails?.abn == '' ? `""` : USER_Info?.businessDetails?.abn},
            "typeBusiness":${USER_Info?.businessDetails?.typeBusiness == undefined || USER_Info?.businessDetails?.typeBusiness == '' ? `""` : USER_Info?.businessDetails?.typeBusiness},
            "industryType":${USER_Info?.businessDetails?.industryType == undefined || USER_Info?.businessDetails?.industryType == '' ? `""` : USER_Info?.businessDetails?.industryType},
            "noDirector":${USER_Info?.businessDetails?.noDirector == undefined || USER_Info?.businessDetails?.noDirector == '' ? `""` : USER_Info?.businessDetails?.noDirector},
            "noShareholder":${USER_Info?.businessDetails?.noShareholder == undefined || USER_Info?.businessDetails?.noShareholder == '' ? `""` : USER_Info?.businessDetails?.noShareholder},
            "noEmployee":${USER_Info?.businessDetails?.noEmployee == undefined || USER_Info?.businessDetails?.noEmployee == '' ? `""` : USER_Info?.businessDetails?.noEmployee},
            "businessAddress":${USER_Info?.businessDetails?.businessAddress == undefined || USER_Info?.businessDetails?.businessAddress == '' ? `""` : USER_Info?.businessDetails?.businessAddress},
            "targetBusiness":${USER_Info?.businessDetails?.targetBusiness == undefined || USER_Info?.businessDetails?.targetBusiness == '' ? `""` : USER_Info?.businessDetails?.targetBusiness},
            "website":${USER_Info?.businessDetails?.website == undefined || USER_Info?.businessDetails?.website == '' ? `""` : USER_Info?.businessDetails?.website},
            "expectedRemittance":${USER_Info?.businessDetails?.expectedRemittance == undefined || USER_Info?.businessDetails?.expectedRemittance == '' ? `""` : USER_Info?.businessDetails?.expectedRemittance},
            "noOfTranscation":${USER_Info?.businessDetails?.noOfTranscation == undefined || USER_Info?.businessDetails?.noOfTranscation == '' ? `""` : USER_Info?.businessDetails?.noOfTranscation},
            "countryOfBusiness":${USER_Info?.businessDetails?.countryOfBusiness == undefined || USER_Info?.businessDetails?.countryOfBusiness == '' ? `""` : USER_Info?.businessDetails?.countryOfBusiness}
          }`)

          const config = {
            method: 'POST',
            url: CommonConstants.BASE_URL + '/updateuserinfo',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }

          axios(config)
            .then(function (response) {
              if (response.data.status === true) {
                setloadervalue(false)
                handleBussinessAndAgent()
              } else {
                setloadervalue(false)
              }
            })
            .catch(function (error) {
              setloadervalue(false)
              console.log(error)
            })
        }
      // }
    }
  }

  const handleSendDataBusinessorAgent = async () => {
    if (data.RoleId === 'Business') {
      // if (validator.error_input_validation(handleId)) {
        setloadervalue(true)
        const formData = new FormData()

        if (RegisterID) {
          formData.append('user', `{
              "id":${RegisterID},
              "roleId":3 ,
              "countryId":${Countrydata?.CountryId},
              "refCodeId":"${data?.Referal}",
              "fName":"${Data1Step6?.Business_Fullname}",
              "mName":"",
              "lName":"",
              "businessName":"${Data1Step6?.Business_BusinessName}",
              "regNo":"${Data1Step6?.Business_RegistrationNo}",
              "regTimezone":"",
              "businessAddress":"${Data1Step6?.Business_AddressofBusiness}",
              "phone":"${Data1Step6?.Business_MobileNumber}",
              "phoneCode":"${CountryCode()}",
              "isPhoneVerified":${USER_Info?.isPhoneVerified},
              "phoneVerifiedAt":"",
              "isEmailVerified":0,
              "emailVerifiedAt":"",
              "isDeleted":false,
              "isOCRVerfiedId":0,
              "email":"${Data1Step6?.Business_BusinessEmail}",
              "digitalVerifiedLink": "${BusinessScantakID}",
              "digitalVerifiedTransactionId": "${BusinessScantakLink}",
              "isSignupCompleted" : false,
              "referralCode": "${data?.Referal}"
              }`)

          formData.append('kycdetails', `{
            "id": ${KYCRegisterID},
            "userId": ${RegisterID},
            "countryId":${USER_Info?.userkycdetails?.countryId},
            "streetName":${USER_Info?.userkycdetails?.streetName},
            "stateId":${USER_Info?.userkycdetails?.stateId},
            "nationality":${USER_Info?.userkycdetails?.nationality},
            "suburb":${USER_Info?.userkycdetails?.suburb},
            "postalCode":${USER_Info?.userkycdetails?.postalCode},
            "verified":0,
            "occupationId":${USER_Info?.userkycdetails?.occupationId},
            "isResidence":${USER_Info?.userkycdetails?.isResidence},
            "kycStatus":${USER_Info?.userkycdetails?.kycStatus}
          }`)

          formData.append('iddetails', `{
              "id": ${IdDocumnetRegisterID},
              "userId": ${RegisterID},
              "typeId":${USER_Info?.iddetails?.typeId},
              "documentNumber":${USER_Info?.iddetails?.documentNumber},
              "cardNumber":${USER_Info?.iddetails?.cardNumber},
              "dob":${USER_Info?.iddetails?.dob},
              "documentValidity":${USER_Info?.iddetails?.documentValidity},
              "issuingAuthority":${USER_Info?.iddetails?.issuingAuthority}
            }`)


          formData.append('businessDetails', `{
              "id": ${BusinessRegisterID},
              "userId": ${RegisterID},
              "companyName":${USER_Info?.businessDetails?.companyName == undefined || USER_Info?.businessDetails?.companyName == '' ? `""` : USER_Info?.businessDetails?.companyName},
              "abn":${USER_Info?.businessDetails?.abn == undefined || USER_Info?.businessDetails?.abn == '' ? `""` : USER_Info?.businessDetails?.abn},
              "typeBusiness":${USER_Info?.businessDetails?.typeBusiness == undefined || USER_Info?.businessDetails?.typeBusiness == '' ? `""` : USER_Info?.businessDetails?.typeBusiness},
              "industryType":${USER_Info?.businessDetails?.industryType == undefined || USER_Info?.businessDetails?.industryType == '' ? `""` : USER_Info?.businessDetails?.industryType},
              "noDirector":${USER_Info?.businessDetails?.noDirector == undefined || USER_Info?.businessDetails?.noDirector == '' ? `""` : USER_Info?.businessDetails?.noDirector},
              "noShareholder":${USER_Info?.businessDetails?.noShareholder == undefined || USER_Info?.businessDetails?.noShareholder == '' ? `""` : USER_Info?.businessDetails?.noShareholder},
              "noEmployee":${USER_Info?.businessDetails?.noEmployee == undefined || USER_Info?.businessDetails?.noEmployee == '' ? `""` : USER_Info?.businessDetails?.noEmployee},
              "businessAddress":${USER_Info?.businessDetails?.businessAddress == undefined || USER_Info?.businessDetails?.businessAddress == '' ? `""` : USER_Info?.businessDetails?.businessAddress},
              "targetBusiness":${USER_Info?.businessDetails?.targetBusiness == undefined || USER_Info?.businessDetails?.targetBusiness == '' ? `""` : USER_Info?.businessDetails?.targetBusiness},
              "website":${USER_Info?.businessDetails?.website == undefined || USER_Info?.businessDetails?.website == '' ? `""` : USER_Info?.businessDetails?.website},
              "expectedRemittance":${USER_Info?.businessDetails?.expectedRemittance == undefined || USER_Info?.businessDetails?.expectedRemittance == '' ? `""` : USER_Info?.businessDetails?.expectedRemittance},
              "noOfTranscation":${USER_Info?.businessDetails?.noOfTranscation == undefined || USER_Info?.businessDetails?.noOfTranscation == '' ? `""` : USER_Info?.businessDetails?.noOfTranscation},
              "countryOfBusiness":${USER_Info?.businessDetails?.countryOfBusiness == undefined || USER_Info?.businessDetails?.countryOfBusiness == '' ? `""` : USER_Info?.businessDetails?.countryOfBusiness}
            }`)

          const config = {
            method: 'POST',
            url: CommonConstants.BASE_URL + '/updateuserinfo',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }

          axios(config)
            .then(function (response) {
              if (response.data.status === true) {
                // showSuccess(true)
                setloadervalue(false)
                handleBussinessAndAgent()
              } else {
                setloadervalue(false)
              }
            })
            .catch(function (error) {
              // console.log(error,"SignupData");
              setloadervalue(false)
            })
        } else {

          formData.append('user', `{
            "roleId":3 ,
            "countryId":${Countrydata?.CountryId},
            "refCodeId":"",
            "fName":"${Data1Step6?.Business_Fullname}",
            "mName":"",
            "lName":"",
            "businessName":"${Data1Step6?.Business_BusinessName}",
            "regNo":"${Data1Step6?.Business_RegistrationNo}",
            "regTimezone":"",
            "businessAddress":"${Data1Step6?.Business_AddressofBusiness}",
            "phone":"${Data1Step6?.Business_MobileNumber}",
            "phoneCode":"${CountryCode()}",
            "phoneVerifiedAt":"",
            "isEmailVerified":0,
            "emailVerifiedAt":"",
            "isDeleted":false,
            "isOCRVerfiedId":0,
            "email":"${Data1Step6?.Business_BusinessEmail}",
            "password":"${Bus_Password}",
            "digitalVerifiedLink": "${BusinessScantakID}",
            "digitalVerifiedTransactionId": "${BusinessScantakLink}",
            "isSignupCompleted" : false ,
            "referralCode": "${AutoRefralCode}"
            }`)

          formData.append('kycdetails', `{
          "streetName":"",
          "countryId":${Countrydata.CountryId},
          "stateId":"",
          "nationality":"",
          "suburb":"",
          "postalCode":"",
          "verified":0,
          "occupationId":"",
          "isResidence":"",
          "kycStatus":""
        }`)

          formData.append('iddetails', `{
            "typeId":"",
            "documentNumber":"",
            "cardNumber":"",
            "dob":"",
            "documentValidity":"",
            "issuingAuthority":""
          }`)


          formData.append('businessDetails', `{
            "companyName":"",
            "abn":"",
            "typeBusiness":"",
            "industryType":"",
            "noDirector":"",
            "noShareholder":"",
            "noEmployee":"",
            "businessAddress":"",
            "targetBusiness":"",
            "website":"",
            "expectedRemittance":"",
            "noOfTranscation":"",
            "countryOfBusiness":""
          }`)

          const config = {
            method: 'POST',
            url: CommonConstants.BASE_URL + '/signup',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }

          axios(config)
            .then(function (response) {
              if (response.data.status === true) {
                // showSuccess(true)
                setloadervalue(false)
                // handleBussinessAndAgent();
                handleOtpBPopup()
                setRegisterID(response.data.data.id)
                // navigate("/login")
                axios.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: response.data.data.id}).then((respo) => {
                  //console.log(respo,"USERINFO")
                  setBusinessRegisterID(respo.data.data.businessDetails.id)
                  setIdDocumnetRegisterID(respo.data.data.iddetails.id)
                  setKYCRegisterID(respo.data.data.userkycdetails.id)
                }).catch(err => {
                  console.log(err)
                })
              }
            })
            .catch(function (error) {
              // console.log(error,"SignupData");
              setloadervalue(false)
            })
        }
      // }
    } else if (data.RoleId === 'Agent') {
      // if (validator.error_input_validation(handleId)) {
        setloadervalue(true)
        const formData = new FormData()
        if (RegisterID) {
          formData.append('user', `{
              "id":${RegisterID},
              "roleId":4,
              "countryId":${Countrydata?.CountryId},
              "refCodeId":"",
              "fName":"${Data1Step6?.Agent_Firstname}",
              "mName":"${Data1Step6?.Agent_Middlename}",
              "lName":"${Data1Step6?.Agent_Lastname}",
              "businessName":"",
              "regNo":"",
              "regTimezone":"",
              "businessAddress":"",
              "phone":"${Data1Step6?.Agent_MobileNumber}",
              "phoneCode":"${CountryCode()}",
              "isPhoneVerified":${USER_Info?.isPhoneVerified},
              "phoneVerifiedAt":"",
              "isEmailVerified":0,
              "emailVerifiedAt":"",
              "isDeleted":false,
              "isOCRVerfiedId":0,
              "email":"${Data1Step6?.Agent_Email}",
              "digitalVerifiedLink": "${AgentScantakID}",
              "digitalVerifiedTransactionId": "${AgentScantakLink}",
              "isSignupCompleted" : false ,
              "referralCode": "${data?.Referal}"
              }`)

          formData.append('kycdetails', `{
            "id": ${KYCRegisterID},
            "userId": ${RegisterID},
            "countryId":${USER_Info?.userkycdetails?.countryId},
            "streetName":${USER_Info?.userkycdetails?.streetName},
            "stateId":${USER_Info?.userkycdetails?.stateId},
            "nationality":${USER_Info?.userkycdetails?.nationality},
            "suburb":${USER_Info?.userkycdetails?.suburb},
            "postalCode":${USER_Info?.userkycdetails?.postalCode},
            "verified":0,
            "occupationId":${USER_Info?.userkycdetails?.occupationId},
            "isResidence":${USER_Info?.userkycdetails?.isResidence},
            "kycStatus":${USER_Info?.userkycdetails?.kycStatus}
          }`)

          formData.append('iddetails', `{
              "id": ${IdDocumnetRegisterID},
              "userId": ${RegisterID},
              "typeId":${USER_Info?.iddetails?.typeId},
              "documentNumber":${USER_Info?.iddetails?.documentNumber},
              "cardNumber":${USER_Info?.iddetails?.cardNumber},
              "dob":${USER_Info?.iddetails?.dob},
              "documentValidity":${USER_Info?.iddetails?.documentValidity},
              "issuingAuthority":${USER_Info?.iddetails?.issuingAuthority}
            }`)

          formData.append('businessDetails', `{
              "id": ${BusinessRegisterID},
              "userId": ${RegisterID},
              "companyName":${USER_Info?.businessDetails?.companyName == undefined || USER_Info?.businessDetails?.companyName == '' ? `""` : USER_Info?.businessDetails?.companyName},
              "abn":${USER_Info?.businessDetails?.abn == undefined || USER_Info?.businessDetails?.abn == '' ? `""` : USER_Info?.businessDetails?.abn},
              "typeBusiness":${USER_Info?.businessDetails?.typeBusiness == undefined || USER_Info?.businessDetails?.typeBusiness == '' ? `""` : USER_Info?.businessDetails?.typeBusiness},
              "industryType":${USER_Info?.businessDetails?.industryType == undefined || USER_Info?.businessDetails?.industryType == '' ? `""` : USER_Info?.businessDetails?.industryType},
              "noDirector":${USER_Info?.businessDetails?.noDirector == undefined || USER_Info?.businessDetails?.noDirector == '' ? `""` : USER_Info?.businessDetails?.noDirector},
              "noShareholder":${USER_Info?.businessDetails?.noShareholder == undefined || USER_Info?.businessDetails?.noShareholder == '' ? `""` : USER_Info?.businessDetails?.noShareholder},
              "noEmployee":${USER_Info?.businessDetails?.noEmployee == undefined || USER_Info?.businessDetails?.noEmployee == '' ? `""` : USER_Info?.businessDetails?.noEmployee},
              "businessAddress":${USER_Info?.businessDetails?.businessAddress == undefined || USER_Info?.businessDetails?.businessAddress == '' ? `""` : USER_Info?.businessDetails?.businessAddress},
              "targetBusiness":${USER_Info?.businessDetails?.targetBusiness == undefined || USER_Info?.businessDetails?.targetBusiness == '' ? `""` : USER_Info?.businessDetails?.targetBusiness},
              "website":${USER_Info?.businessDetails?.website == undefined || USER_Info?.businessDetails?.website == '' ? `""` : USER_Info?.businessDetails?.website},
              "expectedRemittance":${USER_Info?.businessDetails?.expectedRemittance == undefined || USER_Info?.businessDetails?.expectedRemittance == '' ? `""` : USER_Info?.businessDetails?.expectedRemittance},
              "noOfTranscation":${USER_Info?.businessDetails?.noOfTranscation == undefined || USER_Info?.businessDetails?.noOfTranscation == '' ? `""` : USER_Info?.businessDetails?.noOfTranscation},
              "countryOfBusiness":${USER_Info?.businessDetails?.countryOfBusiness == undefined || USER_Info?.businessDetails?.countryOfBusiness == '' ? `""` : USER_Info?.businessDetails?.countryOfBusiness}
            }`)

          const config = {
            method: 'POST',
            url: CommonConstants.BASE_URL + '/updateuserinfo',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }

          axios(config)
            .then(function (response) {
              if (response.data.status === true) {
                setloadervalue(false)
                handleBussinessAndAgent()
              } else {
                setloadervalue(false)
              }
            })
            .catch(function (error) {
              setloadervalue(false)
              console.log(error)
            })
        } else {
          formData.append('user', `{
            "roleId":4,
            "countryId":${Countrydata?.CountryId},
            "refCodeId":"",
            "fName":"${Data1Step6?.Agent_Firstname}",
            "mName":"${Data1Step6?.Agent_Middlename}",
            "lName":"${Data1Step6?.Agent_Lastname}",
            "businessName":"",
            "regNo":"",
            "regTimezone":"",
            "businessAddress":"",
            "phone":"${Data1Step6?.Agent_MobileNumber}",
            "phoneCode":"${CountryCode()}",
            "isPhoneVerified":false,
            "phoneVerifiedAt":"",
            "isEmailVerified":0,
            "emailVerifiedAt":"",
            "isDeleted":false,
            "isOCRVerfiedId":0,
            "email":"${Data1Step6?.Agent_Email}",
            "password":"${Agen_Password}",
            "digitalVerifiedLink": "${AgentScantakID}",
            "digitalVerifiedTransactionId": "${AgentScantakLink}",
            "isSignupCompleted" : false ,
            "referralCode": "${AutoRefralCode}"
            }`)

          formData.append('kycdetails', `{
          "streetName":"",
          "countryId":${Countrydata?.CountryId},
          "stateId":"",
          "nationality":"",
          "suburb":"",
          "postalCode":"",
          "verified":0,
          "occupationId":"",
          "isResidence":"",
          "kycStatus":""
        }`)

          formData.append('iddetails', `{
            "typeId":"",
            "documentNumber":"",
            "cardNumber":"",
            "dob":"",
            "documentValidity":"",
            "issuingAuthority":""
          }`)

          formData.append('businessDetails', `{
            "companyName":"",
            "abn":"",
            "typeBusiness":"",
            "industryType":"",
            "noDirector":"",
            "noShareholder":"",
            "noEmployee":"",
            "businessAddress":"",
            "targetBusiness":"",
            "website":"",
            "expectedRemittance":"",
            "volumeYear":"",
            "noOfTranscation":"",
            "countryOfBusiness":""
          }`)

          const config = {
            method: 'POST',
            url: CommonConstants.BASE_URL + '/signup',
            headers: {'Content-Type': 'multipart/form-data'},
            data: formData
          }

          axios(config)
            .then(function (response) {
              if (response.data.status === true) {
                setloadervalue(false)
                // handleBussinessAndAgent();
                handleOtpAPopup()
                setRegisterID(response.data.data.id)
                // navigate("/login")
                axios.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: response.data.data.id}).then((respo) => {
                  //console.log(respo,"USERINFO")
                  setBusinessRegisterID(respo.data.data.businessDetails.id)
                  setIdDocumnetRegisterID(respo.data.data.iddetails.id)
                  setKYCRegisterID(respo.data.data.userkycdetails.id)
                }).catch(err => {
                  console.log(err)
                })
                // navigate("/login")
              }
            })
            .catch(function (error) {
              setloadervalue(false)
              console.log(error)
            })
        }
      // }
    }
  }

  /////////////////////Signup last////////////////////////
  const handleSubmitDataIndividual = async () => {
    setloadervalue(true)
    const formData = new FormData()
    formData.append('user', `{
           "id": ${RegisterID},
           "roleId":2,
           "countryId":${Countrydata?.CountryId},
           "refCodeId":"${data?.Referal}",
           "fName":"${Data1Step6?.IndidualFirstname}",
           "mName":"${Data1Step6?.IndidualMiddlename}",
           "lName":"${Data1Step6?.IndidualLastname}",
           "businessName":"",
           "regNo":"",
           "businessAddress":"",
           "phone":"${Data1Step6?.IndidualMobileNumber}",
           "phoneCode":"${CountryCode()}",
           "phoneVerifiedAt":"",
           "isEmailVerified":0,
           "emailVerifiedAt":"",
           "isDeleted":false,
           "isOCRVerfiedId":0,
           "email":"${Data1Step6?.IndidualEmail}",
           "isSignupCompleted" : true 
          }`)

    const config = {
      method: 'POST',
      url: CommonConstants.BASE_URL + '/updateuserinfo',
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData
    }

    axios(config)
      .then(function (response) {
        if (response.data.status === true) {
          setloadervalue(false)
          setModalShowAdd(true)
        } else {
          setloadervalue(false)
        }
      })
      .catch(function (error) {
        setloadervalue(false)
      })
  }


  const handleSubmitDataBusinessorAgent = async () => {
    setloadervalue(true)

    // console.log(data.RoleId, "RoleId")
    if (data.RoleId === 'Business') {
      const formData = new FormData()

      formData.append('user', `{
            "id":${RegisterID},
             "roleId":3 ,
             "countryId":${Countrydata?.CountryId},
             "refCodeId":"${data?.Referal}",
             "fName":"${Data1Step6?.Business_Fullname}",
             "mName":"",
             "lName":"",
             "businessName":"${Data1Step6?.Business_BusinessName}",
             "regNo":"${Data1Step6?.Business_RegistrationNo}",
             "businessAddress":"${Data1Step6?.Business_AddressofBusiness}",
             "phone":"${Data1Step6?.Business_MobileNumber}",
             "phoneCode":"${CountryCode()}",
             "phoneVerifiedAt":"",
             "isEmailVerified":0,
             "emailVerifiedAt":"",
             "isDeleted":false,
             "isOCRVerfiedId":0,
             "email":"${Data1Step6?.Business_BusinessEmail}",
             "digitalVerifiedLink": "${BusinessScantakID}",
             "digitalVerifiedTransactionId": "${BusinessScantakLink}",
             "isSignupCompleted" : true 
            }`)

      const config = {
        method: 'POST',
        url: CommonConstants.BASE_URL + '/updateuserinfo',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
      }

      axios(config)
        .then(function (response) {
          if (response.data.status === true) {
            // showSuccess(true)
            setloadervalue(false)
            setModalShowAdd(true)
            // handleBussinessAndAgent();
          } else {
            setloadervalue(false)
          }
        })
        .catch(function (error) {
          // console.log(error,"SignupData");
          setloadervalue(false)
        })
    } else if (data.RoleId === 'Agent') {
      setloadervalue(true)
      const formData = new FormData()
      formData.append('user', `{
             "id":${RegisterID},
             "roleId":4,
             "countryId":${Countrydata?.CountryId},
             "refCodeId":"${data?.Referal}",
             "fName":"${Data1Step6?.Agent_Firstname}",
             "mName":"${Data1Step6?.Agent_Middlename}",
             "lName":"${Data1Step6?.Agent_Lastname}",
             "businessName":"",
             "regNo":"",
             "businessAddress":"",
             "phone":"${Data1Step6?.Agent_MobileNumber}",
             "phoneCode":"${CountryCode()}",
             "phoneVerifiedAt":"",
             "isEmailVerified":0,
             "emailVerifiedAt":"",
             "isDeleted":false,
             "isOCRVerfiedId":0,
             "email":"${Data1Step6?.Agent_Email}",
             "digitalVerifiedLink": "${AgentScantakID}",
             "digitalVerifiedTransactionId": "${AgentScantakLink}",
             "isSignupCompleted" : true 
            }`)


      const config = {
        method: 'POST',
        url: CommonConstants.BASE_URL + '/updateuserinfo',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
      }

      axios(config)
        .then(function (response) {
          if (response.data.status === true) {
            setloadervalue(false)
            setModalShowAdd(true)
            // handleBussinessAndAgent();
          } else {
            setloadervalue(false)
          }
        })
        .catch(function (error) {
          setloadervalue(false)
          console.log(error)
        })

    }
  }
  ///////////////////////////////////////////////////////

  const [OtpCountInd, setOtpCountInd] = useState(false)
  const [OtpCountBusi, setOtpCountBusi] = useState(false)
  const [OtpCountAg, setOtpCountAg] = useState(false)
  const [activeStep1, setActiveStep1] = useState(steps1[0])
  const [activeStep, setActiveStep] = useState(steps[0])

  useEffect(() => {
    // step6Data()
    //
    if (activeStep1.key === 'firstStep' && businessStep1 === 'Individual') {
      //////active key pramane set karvanu che ////////
      document.getElementById('sixxsteps').style.display = 'block'
      document.getElementById(activeStep1.key).style.display = 'block'
      document.getElementById('sevennstep').style.display = 'none'
    }
    if ((activeStep.key === 'firstStep' && businessStep1 === 'Business') || businessStep1 === 'Agent') {
      document.getElementById('sixxsteps').style.display = 'none'
      document.getElementById(activeStep.key).style.display = 'block'
      document.getElementById('sevennstep').style.display = 'block'
    }
  }, [businessStep1, activeStep1, showBuisnessModal, AgentDataImageFront, AgentDataImageBack, OtpCountInd, OtpCountBusi, OtpCountAg])

  // useEffect(() => {
  //   axios.post(CommonConstants.BASE_URL + '/getuserinfobyid', {id: UserID}).then((respo) => {
  //     //console.log(respo,"USERINFO")
  //     setUSER_Info(respo.data?.data)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // }, [UserID])
  // console.log(data3,"data3")

  const ToggleCloseOtp = (value) => {
    if (value === false) {
      setOtpAvelue(false)
      setOtpBvelue(false)
      setOveluee(false)
    }
  }
  ////Agent Otp PopUp////
  const AgentskipOtp = (value) => {
    if (value === true) {
      // handleBussinessAndAgent();
      handleSendDataBusinessorAgent()
      setOtpAvelue(false)
    }
  }

  const AgentOtpVerify = (value) => {
    if (value === true) {
      // handleBussinessAndAgent();
      handleSendDataUPDATEBusinessorAgent()
      setOtpAvelue(false)
    }
  }
  /////////////////////

  ////Bussiness Otp PopUp////
  const BussinessOtpVerify = (value) => {
    // console.log("lion")
    if (value === true) {
      handleSendDataUPDATEBusinessorAgent()
      setOtpBvelue(false)
    }
  }
  //////////////////////////

  ////Individual Otp PopUp////
  const IndividualOtpVerify = (value) => {
    if (value === true) {
      // HandlerIndividualUser();
      handleSendUPDATEDataIndividual()
      // handleSendDataIndividual()
    }
  }
  /////////////////////

  const [Uveluee, setUveluee] = useState(false)

  const handleUPopup = () => {
    setUveluee(true)
  }

  const [Oveluee, setOveluee] = useState(false)

  const [handleId, setHandleId] = useState()
  const [IndividualEmailOtp, setIndividualEmailOtp] = useState('')
  const [BusinessEmailOtp, setBusinessEmailOtp] = useState('')
  const [AgentEmailOtp, setAgentEmailOtp] = useState('')

  const IndividualEmailOtpvalue = (e) => {
    setIndividualEmailOtp(e)
  }

  const BusinessEmailOtpvalue = (e) => {
    setBusinessEmailOtp(e)
  }

  const AgentEmailOtpvalue = (e) => {
    setAgentEmailOtp(e)
  }

  const [OTPValue, setOTPValue] = useState(0)
  const [OTPValueB, setOTPValueB] = useState(0)
  const [OTPValueA, setOTPValueA] = useState(0)

  const handleOPopup = async () => {
    if (Validornot == 0 && MValidornot == 0) {
      HandleFormId()
      setOtpCountInd(true)
      if (validator.error_input_validation(handleId)) {
        setloadervalue(true)

        const OtpData = {
          title: 'Legal Remit', countryId: +Countrydata.CountryId, phone: IndividualOtpMobile,//Data1Step6.IndidualMobileNumber
          email: IndividualEmailOtp
        }

        const sendOtpResponse = await axios.post(CommonConstants.BASE_URL + '/sendotp', OtpData)
        if (sendOtpResponse && sendOtpResponse.data && sendOtpResponse.data.otp) {
          setOveluee(true)
          setloadervalue(false)
        }
      }
    }
  }

  const [IndividualPassword, setIndividualPassword] = useState('')
  const [Bus_Password, setBus_Password] = useState('')
  const [Agen_Password, setAgen_Password] = useState('')
  const individualPassword = (value) => {
    setIndividualPassword(value)
  }

  const BusinessPassword = (value) => {
    setBus_Password(value)
  }

  const AgentPassword = (value) => {
    setAgen_Password(value)
  }

  const HandleFormId = (form_Id) => {
    setHandleId(form_Id)
  }


  const [Laststep, setLaststep] = useState(false)

  const HandlerIndividualUser = async (props, form_id) => {
    HandleFormId()
    //
    validator.error_input_validation(handleId)
    if (validator.error_input_validation(handleId)) {
      setloadervalue(true)
      if (businessStep1 === 'Individual' && activeStep1.key === 'thirdStep') {
        handleUPopup()
        // setUveluee(true);
      }
      if (activeStep1.key === 'fifthStep') {
        setLaststep(true)
      }
      document.getElementById('sixxsteps').style.display = 'block'
      document.getElementById('sevennstep').style.display = 'none'
      window.scrollTo(0, 0)
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
      setloadervalue(false)
    }
  }

  // console.log(Laststep,"last is done")

  const [handleFirststepp, sethandleFirststepp] = useState(false)
  const handleFirstStep = async () => {
    if (Recaptcha == true) {
      HandleFormId()
      validator.error_input_validation(handleId)
      if (validator.error_input_validation(handleId)) {
        if (businessStep1 === 'Individual' && activeStep1.key === 'thirdStep') {
          handleUPopup()
          // setUveluee(true);
        }
        document.getElementById('sixxsteps').style.display = 'block'
        document.getElementById('sevennstep').style.display = 'none'
        window.scrollTo(0, 0)
        document.getElementById(activeStep1.key).style.display = 'none'
        // if (steps1[steps1.length - 1].key === activeStep1.key) {
        //   alert("You have completed all steps.");
        //   return;
        // }
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
      }
    } else {
      sethandleFirststepp(true)
    }
  }

  const handleBFirstStep = async () => {
    if (Recaptcha == true) {
      HandleFormId()
      validator.error_input_validation(handleId)

      if (validator.error_input_validation(handleId)) {
        window.scrollTo(0, 0)

        if (businessStep1 === 'Business' && activeStep.key === 'fourthStep') {
          handleBPopup()
          setBveluee(true)
        }
        if (businessStep1 === 'Agent' && activeStep.key === 'fourthStep') {
          handleAPopup()
          setAveluee(true)
        }
        document.getElementById('sixxsteps').style.display = 'none'
        document.getElementById('sevennstep').style.display = 'block'

        document.getElementById(activeStep.key).style.display = 'none'
        // if (steps[steps.length - 1].key === activeStep.key) {
        //   alert("You have completed all steps.");
        //   return;
        // }
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
    } else {
      sethandleFirststepp(true)
    }
  }

  const HandleSkipIndividual = () => {

    document.getElementById('sixxsteps').style.display = 'block'
    document.getElementById('sevennstep').style.display = 'none'
    window.scrollTo(0, 0)
    document.getElementById(activeStep1.key).style.display = 'none'
    // if (steps1[steps1.length - 1].key === activeStep1.key) {
    //   alert("You have completed all steps.");
    //   return;
    // }
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
  }

  const handlelastPopup = () => {
    window.scrollTo(0, 0)
    handleClose()
  }

  const [Aveluee, setAveluee] = useState(false)
  const [Bveluee, setBveluee] = useState(false)

  const handleAPopup = async () => {
    setAveluee(true)
  }

  const handleBPopup = async () => {
    setBveluee(true)
  }

  const [OtpBvelue, setOtpBvelue] = useState(false)
  const [OtpAvelue, setOtpAvelue] = useState(false)


  const BusinessM_Number = (e) => {
    // console.log(e,"ite")
    setBusinessOtpMobile(e)
  }

  const IndividualMo_Number = (e) => {
    // console.log(e,"ite")
    setIndividualOtpMobile(e)
  }

  const AgentMo_Number = (e) => {
    // console.log(e,"ite")
    setAgentOtpMobile(e)
  }

  // const HandleBOtp=()=>{
  //   step6Data()
  //   handleOtpBPopup()
  // }

  const handleOtpBPopup = async () => {
    // console.log("Hi from business")
    // step6Data()
    if (BValidornot == 0 && BMValidornot == 0) {
      HandleFormId()
      if (validator.error_input_validation(handleId)) {
        setloadervalue(true)

        // code for sending otp to mobile number starts
        setOtpCountBusi(true)

        const OtpData = {
          title: 'Legal Remit', countryId: +Countrydata.CountryId, phone: BusinessOtpMobile,//Data1Step6.Business_MobileNumber
          email: BusinessEmailOtp
        }

        const sendOtpResponse = await axios.post(CommonConstants.BASE_URL + '/sendotp', OtpData)
        console.log(sendOtpResponse.data)
        setOTPValueB(sendOtpResponse?.data?.otp)
        setOtpBvelue(true)
        setloadervalue(false)
      }
    }
  }

  const handleOtpAPopup = async () => {
    if (AValidornot == 0 && AMValidornot == 0) {
      try {
        HandleFormId()
        if (validator.error_input_validation(handleId)) {
          setloadervalue(true)

          // code for sending otp to mobile number starts
          setOtpCountAg(true)

          const OtpData = {
            title: 'Legal Remit', countryId: +Countrydata.CountryId, phone: AgentOtpMobile, email: AgentEmailOtp
          }

          // console.log(OtpData)

          const sendOtpResponse = await axios.post(CommonConstants.BASE_URL + '/sendotp', OtpData)
          console.log(sendOtpResponse.data)
          setOTPValueA(sendOtpResponse?.data?.otp)
          setOtpAvelue(true)
          setloadervalue(false)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  const handleBussinessAndAgent = async (props) => {
    HandleFormId()
    validator.error_input_validation(handleId)

    if (validator.error_input_validation(handleId)) {
      setloadervalue(true)
      window.scrollTo(0, 0)

      if (businessStep1 === 'Business' && activeStep.key === 'fourthStep') {
        handleBPopup()
        setBveluee(true)
      }
      if (businessStep1 === 'Agent' && activeStep.key === 'fourthStep') {
        handleAPopup()
        setAveluee(true)
      }
      document.getElementById('sixxsteps').style.display = 'none'
      document.getElementById('sevennstep').style.display = 'block'

      document.getElementById(activeStep.key).style.display = 'none'
      // if (steps[steps.length - 1].key === activeStep.key) {
      //   alert("You have completed all steps.");
      //   return;
      // }
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
      setloadervalue(false)
    }
  }

  const AgentSkipButton = () => {
    window.scrollTo(0, 0)

    if (businessStep1 === 'Business' && activeStep.key === 'fourthStep') {
      handleBPopup()
      setBveluee(true)
    }
    if (businessStep1 === 'Agent' && activeStep.key === 'fourthStep') {
      handleAPopup()
      setAveluee(true)
    }
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

  const AgentSkipButton1 = () => {

    Data3Step6.Agent_Nationality = ''
    Data3Step6.Agent_StreetName = ''
    Data3Step6.Agent_City = ''
    Data3Step6.Agent_State = ''
    Data3Step6.Agent_Zip = ''
    Data3Step6.Agent_Occupation = ''
    Data3Step6.Agent_Residence = ''


    window.scrollTo(0, 0)

    if (businessStep1 === 'Business' && activeStep.key === 'fourthStep') {
      handleBPopup()
      setBveluee(true)
    }
    if (businessStep1 === 'Agent' && activeStep.key === 'fourthStep') {
      handleAPopup()
      setAveluee(true)
    }
    document.getElementById('sixxsteps').style.display = 'none'
    document.getElementById('sevennstep').style.display = 'block'

    document.getElementById(activeStep.key).style.display = 'none'
    // if (steps[steps.length - 1].key === activeStep.key) {
    //   alert("You have completed all steps.");
    //   return;
    // }
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

  const AgentSkipButton2 = () => {

    // // console.log(Data4Step7, "Data4Step7")

    Data4Step7.Agent_IDType = ''
    Data4Step7.Agent_IDNumber = ''
    Data4Step7.Agent_CardNumber = ''
    Data4Step7.Agent_DOB = ''
    Data4Step7.Agent_IDExpiry = ''
    Data4Step7.Agent_IDIssuingAuthority = ''


    window.scrollTo(0, 0)

    if (businessStep1 === 'Business' && activeStep.key === 'fourthStep') {
      handleBPopup()
      setBveluee(true)
    }
    if (businessStep1 === 'Agent' && activeStep.key === 'fourthStep') {
      handleAPopup()
      setAveluee(true)
    }
    document.getElementById('sixxsteps').style.display = 'none'
    document.getElementById('sevennstep').style.display = 'block'

    document.getElementById(activeStep.key).style.display = 'none'
    // if (steps[steps.length - 1].key === activeStep.key) {
    //   alert("You have completed all steps.");
    //   return;
    // }
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

  const handleBack1 = () => {
    document.getElementById('sixxsteps').style.display = 'block'
    document.getElementById('sevennstep').style.display = 'none'
    window.scrollTo(0, 0)
    document.getElementById(activeStep1.key).style.display = 'none'
    setBuisnessModal('')
    const index = steps1.findIndex((x) => x.key === activeStep1.key)
    if (index === 0) return

    setSteps1((prevStep) => prevStep.map((x, i) => {
      if (x.key === activeStep1.key) {
        x.isDone = false
        x.isRemain = false
      } else {
        if (i < index) {
          x.isDone = true
          x.isRemain = true
        } else {
          x.isDone = false
          x.isRemain = false
        }
      }
      return x
    }))
    setActiveStep1(steps1[index - 1])
    document.getElementById(steps1[index - 1].key).style.display = 'block'
  }

  const handleBack = () => {
    document.getElementById('sixxsteps').style.display = 'none'
    document.getElementById('sevennstep').style.display = 'block'
    window.scrollTo(0, 0)
    document.getElementById(activeStep.key).style.display = 'none'
    setBuisnessModal('')
    const index = steps.findIndex((x) => x.key === activeStep.key)
    if (index === 0) return

    setSteps((prevStep) => prevStep.map((x, i) => {
      if (x.key === activeStep.key) {
        x.isDone = false
        x.isRemain = false
      } else {
        if (i < index) {
          x.isDone = true
          x.isRemain = true
        } else {
          x.isDone = false
          x.isRemain = false
        }
      }
      return x
    }))
    setActiveStep(steps[index - 1])
    document.getElementById(steps[index - 1].key).style.display = 'block'
  }

  const onselectionChange = (Business) => {
    setBusissnesStep1(Business)
  }

  const showBuisness = async () => {
    handleClose()
    setBuisnessModal('businessModal')
  }

  ////////////////Scantak Individual Id///////////////
  const [IndividualScantakID, setIndividualScantakID] = useState('')
  const ScantakId_I = (e) => {
    setIndividualScantakID(e)
  }

  const [IndividualScantakLink, setIndividualScantakLink] = useState('')
  const ScantakLink_I = (e) => {
    setIndividualScantakLink(e)
  }
  //////////////////////////////////////////////////////

  ////////////////Scantak Business Id///////////////
  const [BusinessScantakID, setBusinessScantakID] = useState('')
  const ScantakId_B = (e) => {
    setBusinessScantakID(e)
  }

  const [BusinessScantakLink, setBusinessScantakLink] = useState('')
  const ScantakLink_B = (e) => {
    setBusinessScantakLink(e)
  }
//////////////////////////////////////////////////////

  ////////////////Scantak Agent Id///////////////
  const [AgentScantakID, setAgentScantakID] = useState('')
  const ScantakId_A = (e) => {
    setAgentScantakID(e)
  }

  const [AgentScantakLink, setAgentScantakLink] = useState('')
  const ScantakLink_A = (e) => {
    setAgentScantakLink(e)
  }
  //////////////////////////////////////////////////////

  const [Recaptcha, setRecaptcha] = useState(false)
  const onselectionRecaptcha = (RecaptchaValue) => {
    setRecaptcha(RecaptchaValue)
  }

  // const [activeStep, setActiveStep] = useState(steps[0]);

  const handleStepClick = (index, stepkey) => {
    const selectedStep = steps1[index]
    if (selectedStep.isDone) {
      setActiveStep1(selectedStep)
      document.getElementById(activeStep1.key).style.display = 'none'
      document.getElementById(stepkey).style.display = 'block'
      setUpdatedataStep('')
    }
  }


  const handleStepClick1 = (index, stepkey1) => {
    const selectedStep = steps[index]
    if (selectedStep.isDone) {
      setActiveStep(selectedStep)
      document.getElementById(activeStep.key).style.display = 'none'
      document.getElementById(stepkey1).style.display = 'block'
      setUpdatedataStep('')
    }
  }
  const [UpdatedataStep, setUpdatedataStep] = useState('')
  const [HandleDocumentsI, setHandleDocumentsI] = useState(false)
  const [HandleDocuments, setHandleDocuments] = useState(false)

  const handleUpdateDataFlag = (stepname) => {
    setUpdatedataStep(stepname)
  }
  const [DirectorForm, setDirectorForm] = useState([])
  const handleDirectorForms = (e) => {
    setDirectorForm(e)
  }

  const [ShareholderForm, setShareholderForm] = useState([])
  const handleShareholderForms = (e) => {
    setShareholderForm(e)
  }

  const handleSkipDataFlag = (stepname) => {
    setUpdatedataStep(stepname)
  }

  const [selectedCountryId, setselectedCountryId] = useState()
  const handleCountryId = (id) => {
    setselectedCountryId(id)
  }

  return (<>
    <section className="mainLoginSection1">
      {loadervalue == true ? <Loader/> : ''}

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

              {/* /2/ */}
              <span id="sevennstep">
                  <ul
                    className="nav d-flex justify-content-evenly stepsSign sevennstep"
                    id="sevennstep"
                  >
                    {steps.map((step, i) => {
                      return (<li
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
                    {businessStep1 === 'Individual' ? activeStep1.components() : activeStep.components()}
                  </div>
                </div>
              </div>
              <div className="col-lg-7 p-0 pb-5">
                {/* <div className="step-component">{activeStep.component()}</div> */}
                <div className="step-component">
                  <userContext.Provider
                    value={{
                      data2,
                      data,
                      setData,
                      setData2,
                      data3,
                      setData3,
                      data4,
                      setData4,
                      data5,
                      setData5,
                      data6,
                      setData6,
                      DataImage,
                      setDataImage,
                      DataImageBack,
                      setDataImageBack,
                      BusinessDataImageFront,
                      setBusinessDataImageFront,
                      BusinessDataImageBack,
                      setBusinessDataImageBack,
                      AgentDataImageFront,
                      setAgentDataImageFront,
                      AgentDataImageBack,
                      setAgentDataImageBack,
                      Countrydata,
                      setCountryData,
                      AdditionalImageArray,
                      setAdditionalImageArray
                    }}
                  >
                    <div id="firstStep" style={{display: 'none'}}>
                      <Step1
                        Name={businessStep1}
                        activestepkey={activeStep1.key}
                        B_A_activestepkey={activeStep.key}
                        xyz={onselectionChange}
                        ReCaptchaValue={onselectionRecaptcha}
                        handleid={HandleFormId}
                        handleFirststepp={handleFirststepp}
                        countryvalidation={(e) => setCountryydata(e)}
                        countryvalidationerror={Countryydataerror}
                        countryvalidationerrorremove={(e) => setCountryydataerror(e)}
                        CountryID={handleCountryId}
                        // AutoRefralCode={Ref}
                        UpdateStep={UpdatedataStep}
                        GoNextStep={HandlerIndividualUser}
                        StepBlank={(e) => {
                          handleUpdateDataFlag(e)
                        }}
                        GoNextStepBA={handleBussinessAndAgent}
                        RefralCodeId={RefralCode}
                      ></Step1>
                    </div>

                    <div>
                      {/* Other JSX */}
                      <Suspense fallback={<div>Loading...</div>}>
                        <div id="secondStep" style={{display: 'none'}}>
                          <Step2
                            Name={businessStep1}
                            BuisnessDisplay={showBuisnessModal}
                            activestepkey={activeStep1.key}
                            B_A_activestepkey={activeStep.key}
                            handleid={HandleFormId}
                            StepUOtppopup={Oveluee}
                            StepBOtppopup={OtpBvelue}
                            StepAOtppopup={OtpAvelue}
                            CloseOtp={ToggleCloseOtp}
                            OtpSkip={AgentskipOtp}
                            ResendOTPIndvidual={handleOPopup}
                            ResendOTPBusiness={handleOtpBPopup}
                            ResendOTPAgent={handleOtpAPopup}
                            OtpCountIndvidual={OtpCountInd}
                            OtpCountBusiness={OtpCountBusi}
                            OtpCountAgent={OtpCountAg}
                            IndividualverifyOtp={IndividualOtpVerify}
                            BussinessverifyOtp={BussinessOtpVerify}
                            AgentverifyOtp={AgentOtpVerify}
                            BusinessM_Number={BusinessM_Number}
                            IndividualMo_Number={IndividualMo_Number}
                            AgentMo_Number={AgentMo_Number}
                            IndividualEmailOtpvalue={IndividualEmailOtpvalue}
                            BusinessEmailOtpvalue={BusinessEmailOtpvalue}
                            AgentEmailOtpvalue={AgentEmailOtpvalue}
                            IndividualEmailOtpvalueValid={(e) => {
                              setValidornot(e)
                            }}
                            BusinessEmailOtpvalueValid={(e) => {
                              setBValidornot(e)
                            }}
                            AgentEmailOtpvalueValid={(e) => {
                              setAValidornot(e)
                            }}
                            IndividualMobileOtpvalueValid={(e) => {
                              setMValidornot(e)
                            }}
                            BusinessMobileOtpvalueValid={(e) => {
                              setBMValidornot(e)
                            }}
                            AgentMobileOtpvalueValid={(e) => {
                              setAMValidornot(e)
                            }}
                            OTPValue={OTPValue}
                            OTPValueB={OTPValueB}
                            OTPValueA={OTPValueA}
                            individualPassword={individualPassword}
                            BusinessPassword={BusinessPassword}
                            AgentPassword={AgentPassword}
                            handleEmailAndPhoneValid={updateIsEmailAndPhoneValid}
                          />
                        </div>
                      </Suspense>
                    </div>

                    <div id="thirdStep" style={{display: 'none'}}>
                      <Step3
                        Name={businessStep1}
                        xyz={onselectionChange}
                        activestepkey={activeStep1.key}
                        B_A_activestepkey={activeStep.key}
                        handleid={HandleFormId}
                        R_ID={RegisterID}
                        B_ID={BusinessRegisterID}
                        K_ID={KYCRegisterID}
                        I_ID={IdDocumnetRegisterID}
                        // KycDATA={handleKYCDATA}
                        // nationality={setNationality}
                        // StreetName={setStreetName}
                        // subarb={setSubarbCity}
                        // state={setState}
                        // postalzipcode={setPostalZipcode}
                        // occup={setOccup}
                        // Recidence={setRecidence}
                        UpdateStep={UpdatedataStep}
                        GoNextStep={HandlerIndividualUser}
                        GoNextStepBA={handleBussinessAndAgent}
                        StepBlank={(e) => {
                          handleUpdateDataFlag(e)
                        }}
                        DirectorForms={handleDirectorForms}
                        ShareholderForms={handleShareholderForms}
                      ></Step3>
                    </div>
                    <div id="fourthStep" style={{display: 'none'}}>
                      <Step4
                        Name={businessStep1}
                        xyz={onselectionChange}
                        StepUfourpopup={Uveluee}
                        activestepkey={activeStep1.key}
                        B_A_activestepkey={activeStep.key}
                        handleid={HandleFormId}
                        ScantakId_I={ScantakId_I}
                        ScantakLink_I={ScantakLink_I}
                        R_ID={RegisterID}
                        B_ID={BusinessRegisterID}
                        K_ID={KYCRegisterID}
                        I_ID={IdDocumnetRegisterID}
                        UpdateStep={UpdatedataStep}
                        GoNextStep={HandlerIndividualUser}
                        GoNextStepBA={handleBussinessAndAgent}
                        UserIdType={handleIndividualUserIdType}
                        CountryID={selectedCountryId}
                        StepBlank={(e) => {
                          handleUpdateDataFlag(e)
                        }}
                      ></Step4>
                    </div>
                    <div id="fifthStep" style={{display: 'none'}}>
                      <Step5
                        Name={businessStep1}
                        xyz={onselectionChange}
                        StepAfivepopup={Aveluee}
                        StepBfivepopup={Bveluee}
                        ScantakId_B={ScantakId_B}
                        ScantakLink_B={ScantakLink_B}
                        ScantakId_A={ScantakId_A}
                        ScantakLink_A={ScantakLink_A}
                        activestepkey={activeStep1.key}
                        B_A_activestepkey={activeStep.key}
                        handleid={HandleFormId}
                        IndividualImages={NakeebImage} //new code
                        R_ID={RegisterID}
                        B_ID={BusinessRegisterID}
                        K_ID={KYCRegisterID}
                        I_ID={IdDocumnetRegisterID}
                        UpdateStep={UpdatedataStep}
                        GoNextStep={HandlerIndividualUser}
                        GoNextStepBA={handleBussinessAndAgent}
                        UserIdType={handleUserIdType}
                        IndividualUserIdType={userIdType}
                        CountryID={selectedCountryId}
                        StepBlank={(e) => {
                          handleUpdateDataFlag(e)
                        }}
                        SummuryDocumentsI={(e) => {
                          setHandleDocumentsI(e)
                        }}
                      ></Step5>
                    </div>
                    <div id="sixthStep" style={{display: 'none'}}>
                      <Step6
                        Name={businessStep1}
                        activestepkey={activeStep1.key}
                        B_A_activestepkey={activeStep.key}
                        handleid={HandleFormId}
                        step6Dataa={step6Data}
                        BusinessImages={Business_Images}
                        AgentImages={Agent_Images}
                        R_ID={RegisterID}
                        B_ID={BusinessRegisterID}
                        K_ID={KYCRegisterID}
                        I_ID={IdDocumnetRegisterID}
                        UpdateStep={UpdatedataStep}
                        GoNextStep={HandlerIndividualUser}
                        GoNextStepBA={handleBussinessAndAgent}
                        UserIdType={userIdType}
                        CountryID={selectedCountryId}
                        StepBlank={(e) => {
                          handleUpdateDataFlag(e)
                        }}
                        SummuryDocumentsI={HandleDocumentsI}
                        SummuryDocuments={(e) => {
                          setHandleDocuments(e)
                        }}
                        Countrydata={Countrydata}
                      ></Step6>
                    </div>
                    <div id="finalStep" style={{display: 'none'}}>
                      <Step7
                        Name={businessStep1}
                        xyz={onselectionChange}
                        activestepkey={activeStep1.key}
                        B_A_activestepkey={activeStep.key}
                        handleid={HandleFormId}
                        R_ID={RegisterID}
                        B_ID={BusinessRegisterID}
                        K_ID={KYCRegisterID}
                        I_ID={IdDocumnetRegisterID}
                        UpdateStep={UpdatedataStep}
                        GoNextStep={HandlerIndividualUser}
                        GoNextStepBA={handleBussinessAndAgent}
                        UserIdType={userIdType}
                        CountryID={selectedCountryId}
                        StepBlank={(e) => {
                          handleUpdateDataFlag(e)
                        }}
                        DirectorForms={DirectorForm}
                        ShareholderForms={ShareholderForm}
                        SummuryDocuments={HandleDocuments}
                      ></Step7>
                    </div>
                  </userContext.Provider>
                </div>
                <div
                  className={`btn-component ${businessStep1 === 'Individual' ? activeStep1.key === 'firstStep' ? 'd-flex justify-content-center' : 'justify-content-end' : activeStep.key === 'firstStep' ? 'd-flex justify-content-center' : 'justify-content-end'} `}
                >
                  {businessStep1 === 'Individual' && activeStep1.key === 'firstStep' ? (<input
                    className={`col-lg-3 uppercase pointer  ${activeStep1.key === 'firstStep' ? 'nextButtonStep1' : ''}`}
                    type="button"
                    value={steps1[steps1.length - 1].key !== activeStep1.key ? 'Next' : 'Submit'}
                    onClick={(e) => {
                      Countryydata == undefined && Recaptcha == false ? setCountryydataerror(1) : handleUpdateDataFlag('IndividualFirst')
                    }}
                  />) : businessStep1 === 'Business' && activeStep.key === 'firstStep' ? (<input
                    className={`col-lg-3 uppercase pointer  ${activeStep.key === 'firstStep' ? 'nextButtonStep1' : ''}`}
                    type="button"
                    disabled={Recaptcha == false}
                    value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                    onClick={(e) => {
                      Countryydata == undefined ? setCountryydataerror(1) : handleUpdateDataFlag('BusinessOrAgentFirst')
                    }}
                  />) : businessStep1 === 'Agent' && activeStep.key === 'firstStep' ? (<input
                    className={`col-lg-3 uppercase pointer  ${activeStep.key === 'firstStep' ? 'nextButtonStep1' : ''}`}
                    type="button"
                    disabled={Recaptcha == false}
                    value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                    onClick={(e) => {
                      Countryydata == undefined ? setCountryydataerror(1) : handleUpdateDataFlag('BusinessOrAgentFirst')
                    }}
                  />) : businessStep1 === 'Individual' && activeStep1.key === 'secondStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton d-block"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={() => {*/}
                    {/*    handleBack1()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps1[0].key === activeStep1.key}*/}
                    {/*/>*/}

                    <input
                      disabled={activeStep1.key === 'secondStep' ? isEmailAndPhoneValid : false}
                      className={`col-lg-3 uppercase pointer  ${activeStep1.key == 'secondStep' && isEmailAndPhoneValid ? 'emailAndPhoneValidClass' : 'nextButtonStep2'}`}
                      type="button"
                      value={steps1[steps1.length - 1].key !== activeStep1.key ? 'Next' : 'Submit'}
                      onClick={localStorage.getItem('MobileNumber') === IndividualOtpMobile ? RegisterID === undefined ? HandlerIndividualUser : handleOPopup : handleSendDataIndividual}
                    />
                  </>) : businessStep1 === 'Business' && activeStep.key === 'secondStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton d-block"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={() => {*/}
                    {/*    handleBack()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps[0].key === activeStep.key}*/}
                    {/*/>*/}

                    <input
                      className={`col-lg-3 uppercase pointer  ${activeStep.key == 'secondStep' ? 'nextButtonStep2' : ''}`}
                      type="button"
                      value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                      onClick={localStorage.getItem('MobileNumber') === BusinessOtpMobile ? RegisterID === undefined ? handleBussinessAndAgent : handleOtpBPopup : handleSendDataBusinessorAgent}
                    />

                  </>) : businessStep1 === 'Agent' && activeStep.key === 'secondStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton d-block"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={() => {*/}
                    {/*    handleBack()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps[0].key === activeStep.key}*/}
                    {/*/>*/}

                    <input
                      className={`col-lg-3 uppercase pointer  ${activeStep.key == 'secondStep' ? 'nextButtonStep2' : ''}`}
                      type="button"
                      value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                      onClick={localStorage.getItem('MobileNumber') === AgentOtpMobile ? RegisterID === undefined ? handleBussinessAndAgent : handleOtpAPopup : handleSendDataBusinessorAgent}
                      // onClick={handleBussinessAndAgent}
                    />
                  </>) : businessStep1 === 'Individual' && activeStep1.key === 'thirdStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton3"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={(e) => {*/}
                    {/*    handleBack1()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps1[0].key === activeStep1.key}*/}
                    {/*/>*/}

                    <input
                      className={`col-lg-3 uppercase pointer  ${activeStep1.key === 'thirdStep' ? 'nextButtonStep3' : ''}`}
                      type="button"
                      value={steps1[steps1.length - 1].key !== activeStep1.key ? 'Next' : 'Submit'}
                      onClick={(e) => {
                        handleUpdateDataFlag('IthirdStep')
                      }}//handleUpdateDataIndividual
                    />
                  </>) : businessStep1 === 'Business' && activeStep.key === 'thirdStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton3"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={(e) => {*/}
                    {/*    handleBack()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps[0].key === activeStep.key}*/}
                    {/*/>*/}

                    <input
                      className={`col-lg-3 uppercase pointer  ${activeStep.key == 'thirdStep' ? 'nextButtonStep3' : ''}`}
                      type="button"
                      value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                      onClick={(e) => {
                        handleUpdateDataFlag('BthirdStep')
                      }}//handleBussinessAndAgent}
                    />
                  </>) : businessStep1 === 'Agent' && activeStep.key === 'thirdStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton3"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={(e) => {*/}
                    {/*    handleBack()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps[0].key === activeStep.key}*/}
                    {/*/>*/}

                    <input
                      className={`col-lg-3 uppercase pointer  ${activeStep.key == 'thirdStep' ? 'nextButtonStep3' : ''}`}
                      type="button"
                      value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                      onClick={(e) => {
                        handleUpdateDataFlag('AthirdStep')
                      }}//handleBussinessAndAgent}
                    />
                  </>) : businessStep1 === 'Individual' && activeStep1.key === 'fourthStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton4"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={(e) => {*/}
                    {/*    handleBack1()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps1[0].key === activeStep1.key}*/}
                    {/*/>*/}
                    <input

                      className={`col-lg-3 uppercase pointer  ${activeStep1.key === 'fourthStep' ? 'nextButtonStep4' : ''}`}
                      type="button"
                      value={steps1[steps1.length - 1].key !== activeStep1.key ? 'Next' : 'Submit'}
                      onClick={(e) => {
                        handleUpdateDataFlag('IfourthStep')
                        // HandlerIndividualUser();
                      }}
                    />
                  </>) : businessStep1 === 'Business' && activeStep.key === 'fourthStep' ? (<>
                    {/*<input*/}

                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton4"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={(e) => {*/}
                    {/*    handleBack()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps[0].key === activeStep.key}*/}
                    {/*/>*/}

                    <input
                      // style={{zIndex:-1}}
                      className={`col-lg-3 uppercase pointer  ${activeStep.key == 'fourthStep' ? 'nextButtonStep4' : ''}`}
                      type="button"
                      value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                      onClick={(e) => {
                        handleUpdateDataFlag('BfourthStep')
                      }}//handleBussinessAndAgent}
                    />
                  </>) : businessStep1 === 'Agent' && activeStep.key === 'fourthStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton4"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={(e) => {*/}
                    {/*    handleBack()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps[0].key === activeStep.key}*/}
                    {/*/>*/}

                    <input
                      className="col-lg-3 uppercase pointer fourthskip"
                      type="button"
                      value="SKIP"
                      onClick={(e) => {
                        AgentSkipButton1(e)
                        handleUpdateDataFlag('SkipAfourthStep')
                      }}
                    />

                    <input
                      className={`col-lg-3 uppercase pointer  ${activeStep.key == 'fourthStep' ? 'nextButtonStep4' : ''}`}
                      type="button"
                      value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                      onClick={(e) => {
                        handleUpdateDataFlag('AfourthStep')
                      }}//handleBussinessAndAgent}
                    />
                  </>) : businessStep1 === 'Individual' && activeStep1.key === 'fifthStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton5"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={(e) => {*/}
                    {/*    handleBack1()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps1[0].key === activeStep1.key}*/}
                    {/*/>*/}

                    <input
                      className="col-lg-3 uppercase pointer verifyButton1"
                      type="button"
                      value="Submit Later"
                      onClick={(e) => {
                        HandleSkipIndividual(e)
                        handleSkipDataFlag('SkipIfifthStep')
                      }}
                    />

                    <input
                      className={`col-lg-3 ml-2 uppercase pointer  ${activeStep1.key == 'fifthStep' ? 'nextButtonStep5' : ''}`}
                      type="button"
                      value={steps1[steps1.length - 1].key !== activeStep1.key ? 'Next' : 'Submit'}
                      onClick={(e) => {
                        handleUpdateDataFlag('IfifthStep')
                      }}//HandlerIndividualUser}
                    />
                  </>) : businessStep1 === 'Business' && activeStep.key === 'fifthStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton5"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={(e) => {*/}
                    {/*    handleBack()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps[0].key === activeStep.key}*/}
                    {/*/>*/}

                    <input
                      className={`col-lg-3 uppercase pointer  ${activeStep.key == 'fifthStep' ? 'nextButtonStep5' : ''}`}
                      type="button"
                      value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                      onClick={(e) => {
                        handleUpdateDataFlag('BfifthStep')
                      }}//handleBussinessAndAgent}
                    />
                  </>) : businessStep1 === 'Agent' && activeStep.key === 'fifthStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton5"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={(e) => {*/}
                    {/*    handleBack()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps[0].key === activeStep.key}*/}
                    {/*/>*/}

                    <input
                      className="col-lg-3 uppercase pointer verifyButton1"
                      type="button"
                      value="SKIP"
                      onClick={AgentSkipButton2}
                    />

                    <input
                      className={`col-lg-3 uppercase pointer  ${activeStep.key == 'fifthStep' ? 'nextButtonStep5' : ''}`}
                      type="button"
                      value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                      onClick={(e) => {
                        handleUpdateDataFlag('AfifthStep')
                      }}//handleBussinessAndAgent}
                    />
                  </>) : businessStep1 === 'Business' && activeStep.key === 'sixthStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton6"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={(e) => {*/}
                    {/*    handleBack()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps[0].key === activeStep.key}*/}
                    {/*/>*/}

                    {/* <input
                        className="col-lg-3 uppercase pointer verifyButton"
                        type="button"
                        value="Submit Later"
                        onClick={handleBussinessAndAgent}
                      /> */}

                    <input
                      className={`col-lg-3 uppercase pointer  ${activeStep.key == 'sixthStep' ? 'nextButtonStep6' : ''}`}
                      type="button"
                      value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                      onClick={(e) => {
                        handleUpdateDataFlag('BsixthStep')
                      }}//handleBussinessAndAgent}
                    />
                  </>) : businessStep1 === 'Agent' && activeStep.key === 'sixthStep' ? (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className="col-lg-3 uppercase pointer backButton6"*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={(e) => {*/}
                    {/*    handleBack()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={steps[0].key === activeStep.key}*/}
                    {/*/>*/}
                    <input
                      className="col-lg-3 uppercase pointer sixskip"
                      type="button"
                      value="Submit Later"
                      onClick={(e) => {
                        AgentSkipButton(e)
                        handleSkipDataFlag('SkipAsixthStep')
                      }}
                    />

                    <input
                      className={`col-lg-3 uppercase pointer  ${activeStep.key == 'sixthStep' ? 'nextButtonStep6' : ''}`}
                      type="button"
                      value={steps[steps.length - 1].key !== activeStep.key ? 'Next' : 'Submit'}
                      onClick={(e) => {
                        handleUpdateDataFlag('AsixthStep')
                      }}//handleBussinessAndAgent}
                    />
                  </>) : (<>
                    {/*<input*/}
                    {/*  id="backBtn"*/}
                    {/*  className={`col-lg-3 uppercase pointer ${businessStep1 === 'Individual' ? activeStep1.key == 'firstStep' ? 'backButton1' : 'backButton6' : activeStep.key == 'firstStep' ? 'backButton1' : 'backButton7'}`}*/}
                    {/*  type="button"*/}
                    {/*  value="Back"*/}
                    {/*  onClick={businessStep1 === 'Individual' ? (e) => {*/}
                    {/*    handleBack1()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  } : (e) => {*/}
                    {/*    handleBack()*/}
                    {/*    handleUpdateDataFlag('')*/}
                    {/*  }}*/}
                    {/*  disabled={businessStep1 === 'Individual' ? steps1[0].key === activeStep1.key : steps[0].key === activeStep.key}*/}
                    {/*/>*/}

                    <input
                      className={`col-lg-3 uppercase pointer  ${businessStep1 === 'Individual' ? activeStep1.key == 'sixthStep' ? 'nextButtonStep6' : '' : activeStep.key == 'finalStep' ? 'nextButtonStep1' : ''}`}
                      type="button"
                      value={businessStep1 === 'Individual' ? steps1[steps1.length - 1].key !== activeStep1.key ? 'NextU' : 'Submit' : steps[steps.length - 1].key !== activeStep.key ? 'NextU' : 'Submit'}
                      onClick={() => {
                        businessStep1 === 'Individual' ? handleSubmitDataIndividual() : handleSubmitDataBusinessorAgent()
                      }}
                    />
                  </>)}
                </div>
              </div>
            </Row>
          </div>
        </div>
      </Container>
    </section>
    <Footer></Footer>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm changes</Modal.Title>
      </Modal.Header>
      <Modal.Body>Successfully SignUp..!!</Modal.Body>
      <Modal.Footer className="justify-content-center d-flex">
        {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
        <Link to="/login">
          <Button
            className="LastButtonPopup primary"
            onClick={handlelastPopup}
          >
            Go To Login
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>

    <Modal className="" show={showSuccess} onHide={handleSuccessClose} centered>
      <Row className="">
        <Col className="col-lg-12 d-flex align-items-center ">
          <Col className="col-lg-5 verfiyBlock1 ">
            {/* <img src={LoginAvatar} className="img-fluid p-5" /> */}
          </Col>
          <Col className="col-lg-7 Error_Popup">
            <Modal.Header className=" borderHeader py-3 ">
              <Modal.Title
                className="px-0"
              >
                <small className={` bolder text-danger radiumText fs-3 `}>
                  Error
                </small>

              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <p className={`fs-5 py-3 ${popupsetup===true ? "d-block": "d-none"}`} >{Successhandle}</p> */}

              <p className={` fs-5 py-3 `}>
                User Does Not Exist with this Email
              </p>
            </Modal.Body>
            <hr></hr>
            <div className="justify-content-center d-flex">
              <Button className={`w-50 uppercase loginButton fs-4 `}>Go Home</Button>
              <Button className={`w-50 uppercase loginButton fs-4 `}>Reset</Button>
            </div>
          </Col>
        </Col>
      </Row>
    </Modal>

    {/* Registration Successfully Modal */}
    <ModalComponent
      Size="sm"
      show={modalShowAdd}
      title11={'User Register Successfully'}
      onHide={() => {
        navigate('/login')
        window.scrollTo(0, 0)
      }}
    />
    {/* /////////////////////////////// */}
  </>)
}

// back button & side avatar & next button code is remaining //
