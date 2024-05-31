import React, { useState, useEffect } from 'react'
import './MoneyStep3.scss'
import { Container } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import info from '../../../../assets/images/info11.svg'
import gift from '../../../../assets/images/ph_gift-bold.svg'
import timer from '../../../../assets/images/timer.svg'
import { country_list } from '../../../../Helpers/CountryPicker/customLabel'
import { country_list1 } from '../../../../Helpers/CountryPicker/customLabel'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import firstPay from '../../../../assets/images/payto-icon 1.svg'
import tickIcon from '../../../../assets/images/mdi_tick-circle-outline.svg'
import card from '../../../../assets/images/debitCard.svg'
import editBtn from '../../../../assets/images/editBG.svg'
import InputGroup from 'react-bootstrap/InputGroup'
import MoneyStep5 from '../MoneyStep5/MoneyStep5'
import backA from '../../../../assets/images/BackArrow.svg'
import drpa from '../../../../assets/images/drparrw.svg'
import plus from '../../../../assets/images/PlusBG.svg'
import bankIcon from '../../../../assets/images/mdi_bank.svg'
import Loader from '../../../Loader/Loader'
import axios from 'axios'
import { CommonConstants } from '../../../../Constants/common.constants'
import { useNavigate } from 'react-router-dom'

import { useLocation } from 'react-router-dom'

export default function MoneyStep3 ({
                                      summaryData,
                                      DefaultSummuryId,
                                      sendingMoney,
                                      backDisplay,
                                      sendMoneyDCharge,
                                      PaymentNamee,
                                      visitBackStep,
                                      FirstStepData,
                                      RecieverCountryId,
                                      TransactionIDUpdate,
                                      visitNextStep,
                                      SetExchangerate,
                                      SetServiceCharge,
                                      PromoCodeVerify,
                                      PremiumEXRateValue,
                                      moneychange
                                    }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [countries, setCountries] = useState([])
  const [countries1, setCountries1] = useState([])
  const [Banks, setBanks] = useState([])
  const [modalShow, setModalShow] = React.useState(false)

  const [ShowPayment, setShowPayment] = useState(false)
  const handleClosePayment = () => setShowPayment(false)
  const handleShowPayment = () => setShowPayment(true)
  const [getAllPaymentMethod, setgetAllPaymentMethod] = useState('')
  const [flagSelect, setFlags] = useState(0)
  const [flagSelect1, setFlags1] = useState(1)
  const [receiveMoney, setreceiveMoney] = useState(0)
  const [fromCountry, setfromCountry] = useState(1)
  const [toCountry, settoCountry] = useState(0)
  const [counter, setCounter] = useState(420)
  // const [PremiumExchangerate, setPremiumExchangerate] = useState(0);
  // const [PremiumExchangerateId, setPremiumExchangerateId] = useState(0);
  // const [PremiumExchangerateAmount, setPremiumExchangerateAmount] = useState(0);
  const [estimateTimes, setEstimateTimes] = useState(
    FirstStepData.estimatetime
  )
  const [Removebtn, setRemovebtn] = useState(0)

  // const handleSelectPromo = (
  //   id,
  //   DeliveryMethod,
  //   PaymentMethod,
  //   BenifitOnCash,
  //   MinSendingAmt,
  //   minAmount,
  //   maxAmount,
  //   minExchangeRate,
  //   maxExchangeRate,
  //   minServiceCharge,
  //   maxServiceCharge,
  //   points,
  //   ExDiscount,
  //   SeDiscount,
  //   Promocode
  // ) => {
  //   // debugger;

  //   const TotalserviceCharge = FirstStepData !="" ? FirstStepData.serviceCharge !="" ? FirstStepData.serviceCharge : location.state?.TransactionData != undefined ? location.state?.TransactionData?.serviceCharge : "" :location.state?.TransactionData != undefined ? location.state?.TransactionData?.serviceCharge : 0.0

  //   setModalShow(false);
  //   if (
  //     DeliveryMethod != FirstStepData !="" ? FirstStepData.DeliveryMethod !="" ? FirstStepData.DeliveryMethod : location.state?.TransactionData != undefined ? location.state?.TransactionData?.DeliveryMethod : "" :location.state?.TransactionData != undefined ? location.state?.TransactionData?.DeliveryMethod : 0.0 &&
  //     PaymentMethod != FirstStepData !="" ? FirstStepData.paymentMethod !="" ? FirstStepData.paymentMethod : location.state?.TransactionData != undefined ? location.state?.TransactionData?.paymentMethod : "" :location.state?.TransactionData != undefined ? location.state?.TransactionData?.paymentMethod : 0.0
  //   ) {
  //     setPromo_Error_Message(
  //       "Your promocode not applicable with your delivery and payment method"
  //     );
  //     setPromo_Error_Popup(true);
  //   } else if (DeliveryMethod != defaultDeliveryMethod) {
  //     setPromo_Error_Message(
  //       "Your promocode not applicable with your delivery method"
  //     );
  //     setPromo_Error_Popup(true);
  //   } else if (PaymentMethod != defaultPaymentMethod) {
  //     setPromo_Error_Message(
  //       "Your promocode not applicable with your payment method"
  //     );
  //     setPromo_Error_Popup(true);
  //   } else {
  //     if (BenifitOnCash > 0 && sendMoney >= MinSendingAmt) {
  //       setRemovebtn(id);
  //       setBenifitonCase(BenifitOnCash);
  //       setPromo_Success_Message("Benefit on case Code Applied Successfully");
  //       setPromo_Success_Popup(true);
  //       setPromocode(Promocode);
  //       setBenifitonExchangeRateandServiceCharge(0);
  //       setBenifitonExchangeRateandServiceChargeName("");
  //     } else if (sendMoney >= minAmount && sendMoney <= maxAmount) {
  //       setRemovebtn(id);
  //       setgetPoints(points);
  //       setPromo_Success_Message("Benefit on point Code Applied Successfully");
  //       setPromo_Success_Popup(true);
  //       setPromocode(Promocode);
  //       setBenifitonExchangeRateandServiceCharge(0);
  //       setBenifitonExchangeRateandServiceChargeName("");
  //     } else if (toCountry >= minExchangeRate && toCountry <= maxExchangeRate) {
  //       setRemovebtn(id);
  //       var ExDisc = (toCountry * ExDiscount) / 100;
  //       setBenifitonExchangeRateandServiceCharge(ExDisc);
  //       setBenifitonExchangeRateandServiceChargeName("(ExchangeRate)");
  //       setPromo_Success_Message(
  //         "Benefit on ExchangeRate Code Applied Successfully"
  //       );
  //       setPromo_Success_Popup(true);
  //       setPromocode(Promocode);
  //     } else if (TotalserviceCharge >= minServiceCharge && TotalserviceCharge <= maxServiceCharge) {
  //       setRemovebtn(id);
  //       var SeDisc = (TotalserviceCharge * SeDiscount) / 100;
  //       setBenifitonExchangeRateandServiceCharge(SeDisc);
  //       setBenifitonExchangeRateandServiceChargeName("(ServiceCharge)");
  //       setPromo_Success_Message(
  //         "Benefit on ServiceCharge Code Applied Successfully"
  //       );
  //       setPromo_Success_Popup(true);
  //       setPromocode(Promocode);
  //     } else {
  //       setPromo_Error_Message("Your promocode not applicable for this amount");
  //       setPromo_Error_Popup(true);
  //     }
  //   }
  // };

  useEffect(() => {
    GetAllCountrys()
    // GetAllDeliveryMethod();
    // ExchangeRate();
    setCountries(country_list)
    setCountries1(country_list1)
    setFlags(country_list[0].label)
    setFlags1(country_list1[0].label)
    SummurryDetails()
    GetAllBanks()

    if (counter === 0) {
      setCounter(420)
    }
  }, [
    summaryData,
    backDisplay,
    sendingMoney,
    sendMoneyDCharge,
    PaymentNamee,
    visitBackStep,
    TransactionIDUpdate
  ])

  useEffect(() => {
    if (counter === 0) {
      setCounter(420)
    }

    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [counter])

  useEffect(() => {
    GetAllState()
    getRelation()
  }, [RecieverCountryId])
  const minutes = Math.floor(counter / 60)
  const seconds = counter % 60

  const goFirstStep = (index) => {
    backDisplay(true)
    visitBackStep(index, 'firstStep')
  }
  const goSecondStep = (index) => {
    //
    backDisplay(true)
    visitBackStep(index, 'secondStep')
  }
  const handleFlagSelect = (e) => {
    let selected = countries.filter((val) => val.currency == e.target.value)
    setFlags(selected[0])
    ExchangeRate(selected[0].id, flagSelect1.id)
  }

  const [UserData, setUserData] = useState({bankName: ''})
  const SummurryDetails = async () => {
    try {
      const userId = {
        id:
          summaryData != undefined
            ? summaryData
            : location.state && location.state.TransactionData != undefined
              ? location.state.TransactionData.recipientId
              : DefaultSummuryId
      }
      const response = await axios.post(
        CommonConstants.BASE_URL + '/getrecipientsbyid',
        userId
      )
      if (response.data.status === true) {
        setUserData(response.data.data)
      } else if (response.data.status === 'error') {
      }
    } catch (err) {
    }
  }

  const GetAllBanks = async (values) => {
    try {
      const type = {
        type: 'bank'
      }

      const response = await axios.post(
        CommonConstants.BASE_URL + '/getallbanks',
        type
      )
      if (response.data.status === true) {
        setBanks(response.data.data)
      } else if (response.data.status === 'error') {
        // handleErrorShow()
      }
    } catch (err) {
    }
  }
  const setMoney = (e) => {
    // setsendMoney(e.target.value)
    setreceiveMoney(e.target.value * toCountry)
  }

  const handleFlagSelect1 = (e) => {
    let selected = countries.filter((val) => val.currency == e.target.value)
    setFlags1(selected[0])
    ExchangeRate(flagSelect.id, selected[0].id)
  }

  const ExchangeRate = async (country_Id1, countryId2) => {
    try {
      const response = await axios.post(
        CommonConstants.BASE_URL + '/getexchangeratebycountryid',
        {
          fromCountryId: country_Id1,
          toCountryId: countryId2
        }
      )
      if (response.data.status === true) {
        if (response.data.data) {
          settoCountry(response.data.data.publishedRate)

          // const formData = new FormData();
          // formData.append("receivingCountryId", countryId2);
          // formData.append("userId", localStorage.getItem("Id"));

          // const config = {
          //   method: "POST",
          //   url: CommonConstants.BASE_URL + "/getpremiumexratebycountryid",
          //   headers: { "Content-Type": "multipart/form-data" },
          //   data: formData,
          // };

          // axios(config)
          //   .then(function (res) {
          //     if(res.data.status == true){
          //       if(res.data.data != null){
          //         setPremiumExchangerateAmount(res.data.data?.maxAmtForPremium)
          //         setPremiumExchangerate(res.data.data?.premiumAmount)
          //         setPremiumExchangerateId(res.data.data?.id)
          //         // setMoney(sendMoney,toCountry,response.data.data?.maxAmtForPremium,response.data.data?.premiumAmount);
          //         // setMoney(sendMoney,response.data.data.publishedRate,res.data.data?.maxAmtForPremium,res.data.data?.premiumAmount)
          //       }else{
          //         setPremiumExchangerateAmount(0)
          //         setPremiumExchangerate(0)
          //         setPremiumExchangerateId(0)
          //       }
          //     }
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
          setreceiveMoney(
            FirstStepData &&
            FirstStepData.amount * response.data.data.publishedRate
          )
        } else {
          settoCountry(0)
          setreceiveMoney(0)
        }
      } else if (response.data.status === false) {
        settoCountry(0)
      }
    } catch (err) {
    }
  }

  const GetAllCountrys = async () => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + '/getallcountries'
      )
      if (response.data.status === true) {
        setCountries(response.data.data)
        setCountries1(response.data.data)
        setFlags(response.data.data[0])
        setFlags1(response.data.data[1])
        ExchangeRate(response.data.data[0].id, response.data.data[1].id)
      } else if (response.data.status === 'error') {
      }
    } catch (err) {
    }
  }
  const [PaymentID, setPaymentID] = useState()

  const GetAllDeliveryMethod = async (method) => {
    try {
      const data = {
        toCountryId: RecieverCountryId, //Reciver Country Id Aavse Kadach
        userType: method
        //"indiviual"  "business" "joint"
      }
      const response = await axios.post(
        CommonConstants.BASE_URL + '/getallactivedeliverymethods',
        data
      )
      if (response.data.status === true) {
        var DeliveryDetails = response.data.data.filter(
          (Delivery) => Delivery.name === 'Bank Deposit'
        )
        // console.log(DeliveryDetails,"Delivery id")
        setgetAllDeliveryMethod(response.data.data)
        var SelectedDelivery = response.data.data.filter(
          (Delivery) => Delivery.id === FirstStepData.deliveryMethodId
        )

        GetAllBanks(SelectedDelivery[0].id)

        setgetAllDeliveryMethodFirst(SelectedDelivery[0]) ///First Method///
        // setgetDeliveryMethodIDFirst(SelectedDelivery[0]);///First Method///
        setMethodname(SelectedDelivery[0].name)
        setMethodId(SelectedDelivery[0].id)
        // setMethodname1(DeliveryDetails[0].name)
        // setMethodId1(DeliveryDetails[0].id)
        // setMethodname2(DeliveryDetails[0].name)
        // setMethodId2(DeliveryDetails[0].id)
        // setIsVisibleDynamic(SelectedDelivery[0].name)
        // setIsVisibleDynamic2(DeliveryDetails[0].name)
        // setIsVisibleDynamic3(DeliveryDetails[0].name)
        // setgetAllPaymentMethod(response.data.data[0]?.paymentMethodCharges)
      } else if (response.data.status === false) {
      }
    } catch (err) {
    }
  }

  const [PaymentRate, setPaymentRate] = useState(0)

  const [PaymentName, setPaymentName] = useState('')

  const handlePaymentmethod = (e, id, name, lower, upper, charge) => {
    setPaymentID(id)
    setPaymentName(name)
    var total =
      FirstStepData &&
      FirstStepData.amount >= lower &&
      FirstStepData &&
      FirstStepData.amount <= upper
        ? charge
        : 0
    setPaymentRate(total)
    // setTotalRate(DileveryRate+parseInt(total))
  }

  //////////////////////Update Reciption////////////////////////////
  const [show7, setShowRec7] = useState(false)
  const [UpdateUserData, setUpdateUserData] = useState({})
  const [updateinputFields, setupdateinputFields] = useState([
    {FullName: ''}
  ])
  const [MethodId, setMethodId] = useState('')
  const [Methodname, setMethodname] = useState('')
  const [isVisibleDynamicU, setIsVisibleDynamicU] = useState('')
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState()
  const [UBanks, setUBanks] = useState([])
  const [Uselected, setUselected] = useState('IFSC')
  const [UpdateFullnameArray, setUpdateFullnameArray] = useState([])
  const [dropdownStateU, setDropdownStateU] = useState(false)
  const [dropdownValueU, setDropdownValueU] = useState('')
  const [getAllDeliveryMethodFirst, setgetAllDeliveryMethodFirst] = useState()
  const [selected2, setSelected2] = useState('IFSC')
  const [getAllDeliveryMethod, setgetAllDeliveryMethod] = useState([])
  const [invalid, setInvalid] = useState(false)
  const [RequestChangetoadmin, setRequestChangetoadmin] = useState(false)

  const [step2UpdateSendMoneyvalue, setstep2UpdateSendMoneyvalue] = useState({
    UGroupId: '',
    UUserId: '',
    UIndidual_Firstname: '',
    UIndidual_Middlename: '',
    UIndidual_Lastname: '',
    UBusiness_Name: '',
    UBankId: '',
    UBankName: '',
    UBankAccountNumber: '',
    UwalletName: '',
    UwalletNo: '',
    UzaiUserId: '',
    UIFSC: '',
    UNoIFSC: '',
    UIFSC_Code: '',
    UBankState: '',
    UDistrict: '',
    UBranch: '',
    UAddress: '',
    UCity: '',
    UState: '',
    UPostalCode: '',
    UMobile: '',
    UEmail: '',
    URelation: ''
  })

  const handleCloseRec7 = () => setShowRec7(false)
  const handleShowRec7 = () => setShowRec7(true)
  const toggleVisibilityDynamicU = (value) => {
    setIsVisibleDynamicU(value)
  }
  const UchangeHandler = (e) => {
    setUselected(e.target.value)
  }
  const handleDropdownClickU = () => {
    setDropdownStateU(!dropdownStateU)
  }
  const handleSetDropdownValueU = (value, methodname, methodid) => {
    setDropdownValueU(value)
    setDropdownStateU(!dropdownStateU)
    setMethodId(methodid)
    setMethodname(methodname)
    GetUpdateBanks(UpdateUserData?.countryId, methodid)
  }

  const handleUpdateRecieverValue = (e) => {
    const {name, value} = e.target
    setstep2UpdateSendMoneyvalue({
      ...step2UpdateSendMoneyvalue,
      [name]: value
    })
  }

  const [getState, setgetState] = useState()
  const [adminRelation, setAdminRelation] = useState()

  const GetAllState = async () => {
    try {
      const userId = {
        id: RecieverCountryId
      }
      const response = await axios.post(
        CommonConstants.BASE_URL + '/getallstatebycountryid',
        userId
      )
      if (response.data.status === true) {
        setgetState(response.data.data)
        // GetAllCountrys()
      } else if (response.data.status === 'error') {
      }
    } catch (err) {
    }
  }
  const getRelation = async () => {
    const Relation = await axios.get(
      CommonConstants.BASE_URL + '/getactiverelations'
    )
    setAdminRelation(Relation.data.data)
  }

  ///////////////////Update Joint//////////////

  const UpdateFieldsReciptionDetails = () => {
    let newfield = {FullName: ''}

    setupdateinputFields([...updateinputFields, newfield])
  }

  const UpdateremoveFieldsReciptionDetails = (index) => {
    const fields = [...updateinputFields]
    fields.splice(index, 1)
    setupdateinputFields(fields)
  }

  const handleFormChangeUpdateDetails = (index, event) => {
    let data = [...updateinputFields]
    data[index][event.target.name] = event.target.value
    setupdateinputFields(data)
  }

  ////////////////////////////////////////////

  const Updatesubmit = (e) => {
    e.preventDefault()
    // setTwoSelect(false)
    if (
      updateinputFields[0].FullName == '' ||
      updateinputFields[0].FullName == undefined
    ) {
      setInvalid(true)
    } else {
      // handleCloseRec();
      setUpdateFullnameArray(updateinputFields)
      //setTwoSelect(true)
      // setJoinUser(true);
      // setShowRec6(true)
    }
  }

  const UpdateReciever = async (UID) => {
    try {
      const userId = {
        id: UID
      }
      const response = await axios.post(
        CommonConstants.BASE_URL + '/getrecipientsbyid',
        userId
      )
      if (response.data.status === true) {
        setUpdateUserData(response.data.data)
        GetAllDeliveryMethod(
          response.data.data.type == 'individual'
            ? 'individual'
            : response.data.data.type == 'business'
              ? 'business'
              : 'joint'
        )
        setUDeliveryName(response.data.data?.deliveryMethodName)
        setUWalletName(response.data.data?.walletName)

        const fullNameArray = response.data.data.fullName
          .substring(1, response.data.data.fullName.length - 1)
          .split(',')

        var EdittempArray2 = []
        fullNameArray.map((JointName, index) => {
          EdittempArray2.push({
            FullName: JointName
          })
        })
        setupdateinputFields(EdittempArray2)

        setMethodId(response.data.data.deliveryMethodId)
        setMethodname(response.data.data.deliveryMethodName)
        handleShowRec7()
        // var FilterMethodName=getAllDeliveryMethod.map((val) => response.data.data.deliveryMethodName == val.name)
        setIsVisibleDynamicU(response.data.data.deliveryMethodName)
        setSelectedDeliveryMethod(response.data.data.type)
        const checkIFSC = response.data.data.haveIfscCode
        GetUpdateBanks(
          response.data.data.countryId,
          response.data.data.deliveryMethodId
        )
        if (checkIFSC == true) {
          setUselected('IFSC')
        } else {
          setUselected('NoIFSC')
        }

        setstep2UpdateSendMoneyvalue((prevState) => ({
          ...prevState,
          UIndidual_Firstname: response.data.data.firstName,
          UIndidual_Middlename: response.data.data.middleName,
          UIndidual_Lastname: response.data.data.lastName,
          UBusiness_Name: response.data.data.businessName,
          UBankId: response.data.data.bankId,
          UBankAccountNumber: response.data.data.bankAccNo,
          UwalletNo: response.data.data.walletNo,
          // step2UpdateSendMoneyvalue.UBankId
          // UIFSC: response.data.data,
          // UNoIFSC: response.data.data,
          UIFSC_Code: response.data.data.ifscCode,
          UBankState: response.data.data.bankStateId,
          UDistrict: response.data.data.district,
          UBranch: response.data.data.bankBranch,
          UAddress: response.data.data.address,
          UCity: response.data.data.city,
          UState: response.data.data.stateId,
          UPostalCode: response.data.data.postalCode,
          UMobile: response.data.data.phone,
          URelation: response.data.data.relationId
        }))
      } else if (response.data.status === 'error') {
      }
    } catch (err) {
    }
  }

  const GetUpdateBanks = async (id, idd2) => {
    try {
      const type = {
        countryId: id,
        deliveryTypeId: idd2
      }

      const response = await axios.post(
        CommonConstants.BASE_URL + '/getactivetransactiondeliverymethods', //getallbank replace -- getactivetransactiondeliverymethods
        type
      )
      if (response.data.status === true) {
        setUBanks(response.data.data)
      }
    } catch (err) {
    }
  }


  const [UWalletName, setUWalletName] = useState('')
  const [UDeliveryName, setUDeliveryName] = useState('')

  const handleUpdateWalletname = (e) => {
    const Walletid = e.target.value
    var selectedWallet = Banks?.find((item) => item?.id == Walletid)
    setUWalletName(selectedWallet?.text)
  }

  const UpdateindividualReciever = async () => {
    try {
      setloadervalue(true)
      // debugger
      const URecieverData = {
        user_Recipients: {
          id: UpdateUserData.id,
          groupId: +localStorage.getItem('Id'),
          userId: +localStorage.getItem('Id'),
          type: 'individual',
          firstName: step2UpdateSendMoneyvalue.UIndidual_Firstname, //UpdateUserData.firstName,
          middleName: step2UpdateSendMoneyvalue.UIndidual_Middlename,
          lastName: step2UpdateSendMoneyvalue.UIndidual_Lastname,
          fullName: '[]',
          businessName: '',
          address: step2UpdateSendMoneyvalue.UAddress,
          relation: '',
          phone: +step2UpdateSendMoneyvalue.UMobile,
          email: step2UpdateSendMoneyvalue.UEmail,
          relationId: step2UpdateSendMoneyvalue.URelation,
          countryId: RecieverCountryId,
          stateId: step2UpdateSendMoneyvalue.Us,
          postalCode: step2UpdateSendMoneyvalue.UPostalCode,
          city: step2UpdateSendMoneyvalue.UCity,
          deliveryMethodId: MethodId,
          deliverymethodname: Methodname,
          bankName: '',
          bankId: UDeliveryName == 'Wallet Deposit' ? +step2UpdateSendMoneyvalue.UwalletName : UDeliveryName == 'Bank Deposit' ? +step2UpdateSendMoneyvalue.UBankName : 0,
          bankAccNo: UDeliveryName == 'Bank Deposit' ? step2UpdateSendMoneyvalue.UBankAccountNumber : '',
          haveIfscCode: Uselected === 'IFSC' ? true : false,
          ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
          bankStateId: 0,
          district: step2UpdateSendMoneyvalue.UDistrict,
          bankBranch: step2UpdateSendMoneyvalue.UBranch,
          bankDetailsVerified: false,
          otherDetails: '', //remaining
          oldRecipientsId: 0,
          walletName: UDeliveryName == 'Wallet Deposit' ? UWalletName : '',
          walletNo: UDeliveryName == 'Wallet Deposit' ? step2UpdateSendMoneyvalue.UwalletNo : ''
          // zaiUserId:step2UpdateSendMoneyvalue.UzaiUserId
        },
        isAdmin: false
      }

      const response = await axios.post(
        CommonConstants.BASE_URL + '/updaterecipienstsbyid',
        URecieverData
      )
      if (response.data.status == true) {
        // GetAllReciever();
        if (response.data.data.isChangesApproved === false) {
          setRequestChangetoadmin(true)
        }
        setShowRec7(false)
        SummurryDetails()
        setloadervalue(false)
      } else if (response.data.status === 'error') {
        setloadervalue(false)
      }
    } catch (err) {
    }
  }

  /////////////Joint Reciption Add API///////////////
  // const UpdateJointReciever = async () => {
  //   // setloadervalue(true);
  //   try {
  //     // setloadervalue(true)
  //     let FullnameArr = []
  //     // for(const val of FullnameArray){
  //     //   FullnameArr.push(val.FullName)
  //     // }
  //     UpdateFullnameArray.map((val) => {
  //       FullnameArr.push(val.FullName)
  //     })

  //     const UJointRecieverData = {
  //       id: UpdateUserData.id,
  //       groupId: +localStorage.getItem("Id"),
  //       userId: +localStorage.getItem("Id"),
  //       type: "joint",
  //       firstName: "",
  //       middleName: "",
  //       lastName: "",
  //       fullName: FullnameArr,
  //       businessName: "",
  //       address: step2UpdateSendMoneyvalue.UAddress,
  //       relation: "",
  //       phone: +step2UpdateSendMoneyvalue.UMobile,
  //       email: step2UpdateSendMoneyvalue.UEmail,
  //       walletName: step2UpdateSendMoneyvalue.UwalletName,
  //       walletNo: step2UpdateSendMoneyvalue.UwalletNo,
  //       relationId: step2UpdateSendMoneyvalue.URelation, //remaining
  //       countryId: RecieverCountryId,
  //       stateId: step2UpdateSendMoneyvalue.UState,
  //       postalCode: step2UpdateSendMoneyvalue.UPostalCode,
  //       city: step2UpdateSendMoneyvalue.UCity,
  //       deliveryMethodId: MethodId,
  //       deliverymethodname: Methodname,
  //       bankName: step2UpdateSendMoneyvalue.UBankName,
  //       bankId: +step2UpdateSendMoneyvalue.bankId,
  //       bankAccNo: step2UpdateSendMoneyvalue.UBankAccountNumber,
  //       haveIfscCode: selected2 === "IFSC" ? true : false,
  //       ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
  //       bankStateId: step2UpdateSendMoneyvalue.UBankState,
  //       district: step2UpdateSendMoneyvalue.UDistrict,
  //       bankBranch: step2UpdateSendMoneyvalue.UBranch,
  //       bankDetailsVerified: false,
  //       otherDetails: "", //remaining
  //       oldRecipientsId: 0
  //       // zaiUserId:step2UpdateSendMoneyvalue.UzaiUserId
  //     };
  //     const response = await axios.post(
  //       CommonConstants.BASE_URL + "/adduserrecipients",
  //       UJointRecieverData
  //     );
  //     if (response.data.status === true) {
  //       // setReceiverInfo(response.data.data)
  //       // GetAllCountrys()
  //       // handleShowRec6()
  //       // GetAllReciever();
  //       handleCloseRec7(false);
  //     // setloadervalue(false)
  //     // setloadervalue(false);
  //     } else if (response.data.status === "error") {
  //       console.log(response.data.message);
  //     }
  //   } catch (err) {
  //   }
  // };

  const UpdateJointReciever = async () => {
    // setloadervalue(true);
    try {
      setloadervalue(true)
      let FullnameArr = []
      UpdateFullnameArray.map((val) => {
        FullnameArr.push(val.FullName)
      })

      const UJointRecieverData = {
        user_Recipients: {
          id: UpdateUserData.id,
          groupId: UpdateUserData.groupId,
          userId: UpdateUserData.userId,
          type: 'joint',
          firstName: '',
          middleName: '',
          lastName: '',
          fullName: `[${FullnameArr}]`,
          businessName: '',
          address: step2UpdateSendMoneyvalue.UAddress,
          relation: '',
          phone: +step2UpdateSendMoneyvalue.UMobile,
          email: step2UpdateSendMoneyvalue.UEmail,
          walletName: UDeliveryName == 'Wallet Deposit' ? UWalletName : '',
          walletNo: UDeliveryName == 'Wallet Deposit' ? step2UpdateSendMoneyvalue.UwalletNo : '',
          relationId: step2UpdateSendMoneyvalue.URelation, //remaining
          countryId: RecieverCountryId,
          stateId: step2UpdateSendMoneyvalue.UState,
          postalCode: step2UpdateSendMoneyvalue.UPostalCode,
          city: step2UpdateSendMoneyvalue.UCity,
          deliveryMethodId: MethodId,
          deliverymethodname: Methodname,
          bankName: step2UpdateSendMoneyvalue.UBankName,
          bankId: UDeliveryName == 'Wallet Deposit' ? +step2UpdateSendMoneyvalue.UwalletName : UDeliveryName == 'Bank Deposit' ? +step2UpdateSendMoneyvalue.UBankName : 0,
          bankAccNo: UDeliveryName == 'Bank Deposit' ? step2UpdateSendMoneyvalue.UBankAccountNumber : '',
          haveIfscCode: selected2 === 'IFSC' ? true : false,
          ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
          bankStateId: step2UpdateSendMoneyvalue.UBankState,
          district: step2UpdateSendMoneyvalue.UDistrict,
          bankBranch: step2UpdateSendMoneyvalue.UBranch,
          bankDetailsVerified: UpdateUserData.bankDetailsVerified, //bankDetailsVerified
          otherDetails: '', //remaining
          oldRecipientsId: 0
          // zaiUserId:step2UpdateSendMoneyvalue.UzaiUserId
        },
        isAdmin: false
      }
      // debugger
      const response = await axios.post(
        CommonConstants.BASE_URL + '/updaterecipienstsbyid',
        UJointRecieverData
      )
      if (response.data.status === true) {
        if (response.data.data.isChangesApproved === false) {
          setRequestChangetoadmin(true)
        }
        SummurryDetails()
        setShowRec7(false)
        setloadervalue(false)
        // Perform actions after a successful response
      } else {
        setloadervalue(false)
        // Perform actions for an unsuccessful response
      }
    } catch (err) {
      console.log('An error occurred:', err)
    }
  }
  ////////////////////////////

  const UpdateBusinessReciever = async () => {
    try {
      setloadervalue(true)
      const UBusinessRecieverData = {
        user_Recipients: {
          id: UpdateUserData.id,
          groupId: +localStorage.getItem('Id'),
          userId: +localStorage.getItem('Id'),
          type: 'business',
          firstName: '',
          middleName: '',
          lastName: '',
          fullName: '[]',
          businessName: step2UpdateSendMoneyvalue.UBusiness_Name,
          address: step2UpdateSendMoneyvalue.UAddress,
          relation: '',
          phone: +step2UpdateSendMoneyvalue.UMobile,
          relationId: step2UpdateSendMoneyvalue.URelation,
          countryId: RecieverCountryId,
          stateId: step2UpdateSendMoneyvalue.UState,
          postalCode: step2UpdateSendMoneyvalue.UPostalCode,
          city: step2UpdateSendMoneyvalue.UCity,
          deliveryMethodId: MethodId,
          deliverymethodname: Methodname,
          bankName: step2UpdateSendMoneyvalue.UBankName,
          bankId: UDeliveryName == 'Wallet Deposit' ? +step2UpdateSendMoneyvalue.UwalletName : UDeliveryName == 'Bank Deposit' ? +step2UpdateSendMoneyvalue.UBankName : 0,
          bankAccNo: UDeliveryName == 'Bank Deposit' ? step2UpdateSendMoneyvalue.UBankAccountNumber : '',
          haveIfscCode: Uselected === 'IFSC' ? true : false,
          ifscCode: step2UpdateSendMoneyvalue.UIFSC_Code,
          bankStateId: 0,
          district: step2UpdateSendMoneyvalue.UDistrict,
          bankBranch: step2UpdateSendMoneyvalue.UBranch,
          bankDetailsVerified: false,
          otherDetails: '', //remaining
          oldRecipientsId: 0,
          walletName: UDeliveryName == 'Wallet Deposit' ? UWalletName : '',
          walletNo: UDeliveryName == 'Wallet Deposit' ? step2UpdateSendMoneyvalue.UwalletNo : ''
          // zaiUserId:step2UpdateSendMoneyvalue.UzaiUserId
        },
        isAdmin: false
      }
      const response = await axios.post(
        CommonConstants.BASE_URL + '/updaterecipienstsbyid',
        UBusinessRecieverData
      )
      if (response.data.status == true) {
        if (response.data.data.isChangesApproved === false) {
          setRequestChangetoadmin(true)
        }
        // setReceiverInfo(response.data.data)
        // GetAllCountrys()
        // handleShowRec6()
        // GetAllReciever();
        SummurryDetails()
        setShowRec7(false)
        setloadervalue(false)
      } else {
        setloadervalue(false)
      }
    } catch (err) {
    }
  }

  const [loadervalue, setloadervalue] = useState(false)
  const [TheyRecive, setTheyRecive] = useState(0)
  const [S_Charge, setS_Charge] = useState(0)
  useEffect(() => {
    setS_Charge(SetServiceCharge)
  }, [SetServiceCharge])

  useEffect(() => {
    console.log('TransactionIDUpdate', TransactionIDUpdate)
    if (TransactionIDUpdate != undefined) {
      getTransactionData()
    }
  }, [TransactionIDUpdate, moneychange])

  const getTransactionData = async () => {
    setloadervalue(true)
    // debugger
    const T_Id = {
      id: TransactionIDUpdate
        ? TransactionIDUpdate
        : location.state.TransactionData && location.state.TransactionData.id
    }
    axios
      .post(CommonConstants.NEW_BASE_URL + '/gettransactionbyid', T_Id)
      .then((res) => {
        if (res.data.statuscode == 200) {
          // if(res.data?.data?.exchangeRate)
          setTheyRecive(res.data?.data)
          setloadervalue(false)
        }
      })
      .catch((err) => {
        console.log(err)
        setloadervalue(false)
      })
  }

  const AddTransactionDetils = async () => {
    setloadervalue(true)
    // debugger
    const T_Id = {
      id: TransactionIDUpdate
        ? TransactionIDUpdate
        : location.state.TransactionData && location.state.TransactionData.id
    }
    axios
      .post(CommonConstants.NEW_BASE_URL + '/gettransactionbyid', T_Id)
      .then((res) => {
        if (res.data.statuscode == 200) {
          const recipientId =
            summaryData != undefined
              ? summaryData
              : location.state && location.state.TransactionData != undefined
                ? location.state.TransactionData.recipientId
                : DefaultSummuryId

          var totalpayable = FirstStepData != '' ? res.data.data.totalPayable : location.state?.TransactionData ? Number((location.state?.TransactionData?.amount + S_Charge)?.toString()?.match(/^\d+(?:\.\d{0,2})?/)) : res.data.data.totalPayable
          // var totalpayable =  FirstStepData != "" ? res.data.data.totalPayable : location.state?.TransactionData ? (location.state?.TransactionData?.amount + S_Charge ).toFixed(2) : res.data.data.totalPayable

          const data = {
            id: res.data.data.id,
            userId: res.data.data.userId,
            recipientId: res.data.data.recipientId,
            sendingCurrencyCode: res.data.data.sendingCurrencyCode,
            recevingCurrencyCode: res.data.data.recevingCurrencyCode,
            sendingCountryId: res.data.data.sendingCountryId,
            recevingCountryId: res.data.data.recevingCountryId,
            partnerBankId: res.data.data.partnerBankId,
            amount: res.data.data.amount,
            totalPayable: totalpayable, //----baki che
            receivingAmount: res.data.data.amount * toCountry, //---baki che
            exchangeRate: toCountry,
            serviceCharge: S_Charge,
            deliveryMethodId: res.data.data.deliveryMethodId,
            transactionStatusId: 1,
            paymentRequestUuid: res.data.data.paymentRequestUuid,
            paytoAgreementUuid: res.data.data.paytoAgreementUuid,
            stepNo: 4,
            otherDetails: '',
            transferPurposeId: res.data.data.transferPurposeId,
            userTrnsCount: 0,
            userTrnsAmountSum: 0,
            recTrnsCount: 0,
            paymentMethod: res.data.data.paymentMethod,
            promoCode:
              FirstStepData != ''
                ? FirstStepData.promoCode != ''
                  ? FirstStepData.promoCode
                  : ''
                : '',
            promoCodeServiceChargeDiscAmt:
              FirstStepData != ''
                ? FirstStepData.PromoCodeDiscount != ''
                  ? FirstStepData.PromoCodeDiscount
                  : 0.0
                : 0.0,
            promoCodeExRateDiscAmt:
              FirstStepData != ''
                ? FirstStepData.PromoCodeDiscount != ''
                  ? FirstStepData.PromoCodeDiscount
                  : 0.0
                : 0.0,
            cashBenefit:
              FirstStepData != ''
                ? FirstStepData.cashBenefit != ''
                  ? FirstStepData.cashBenefit
                  : 0
                : 0,
            pointBenefit:
              FirstStepData != ''
                ? FirstStepData.pointBenefit != ''
                  ? FirstStepData.pointBenefit
                  : 0.0
                : 0.0,
            discountedAmount:
              FirstStepData != ''
                ? FirstStepData.discountedAmount != ''
                  ? FirstStepData.discountedAmount
                  : 0
                : 0,
            transactionPaymentStatusId: 0,
            paymentNote: res.data.data.paymentNote,
            assignedUserId: 0,
            deleteAt: '',
            source: '',
            email: res.data.data.email,
            usedCash: FirstStepData != ''
              ? FirstStepData.usedCash != ''
                ? FirstStepData.usedCash
                : 0
              : 0,
            premimumExId:
              FirstStepData != ''
                ? FirstStepData.premimumExId != ''
                  ? FirstStepData.premimumExId
                  : 0
                : PremiumEXRateValue.premimumExId != 0
                  ? PremiumEXRateValue?.premimumExId
                  : 0,
            premimumExRate:
              FirstStepData != ''
                ? FirstStepData.premimumExRate != ''
                  ? FirstStepData.premimumExRate
                  : 0
                : PremiumEXRateValue.premimumExRate != 0
                  ? PremiumEXRateValue?.premimumExRate
                  : 0,
            premimumExAmt:
              FirstStepData != ''
                ? FirstStepData.premimumExAmt != ''
                  ? FirstStepData.premimumExAmt
                  : 0
                : PremiumEXRateValue.premimumExAmt != 0
                  ? PremiumEXRateValue?.premimumExAmt
                  : 0
            //  location.state?.TransactionData != undefined
            // ? location.state?.TransactionData?.usedCash
            // : "",
          }
          // visitNextStep();

          axios
            .post(CommonConstants.NEW_BASE_URL + '/savetransaction', data)
            .then((res) => {
              if (res.data.statuscode == 200) {
                visitNextStep()
                setloadervalue(false)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
  })

  return (
    <>
      <section>
        {loadervalue == true ? <Loader/> : ''}
        <Container>
          <Row className="respoChildFooter">
            <Col className="col-lg-12">
              <h1 className="purpleText bolder text-center mt-3 pt-3 pb-3">
                Send Money
              </h1>
            </Col>
            <Col className="col-lg-12 flex-column m-auto d-flex justify-content-center text-center ">
              <div className="smd pb-3">
                <div className="responsiveFontLarge  text-black text-center ">
                  {/* Glance at the summary and submit your data for transection */}
                </div>
              </div>
            </Col>
          </Row>

          <div className="paymentsection pe-2 ps-2 non_Select">
            {/* <Row className="innerForm mt-2">
              <Form className="mt-3" id="Signup_Step1">
                <Row className="me-0 ms-1">
                  <div className="mainS4 p-2 jaia d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center  pe-4 ps-4">
                      <img src={card} className="img-fluid" />
                      <Form.Control
                        aria-label="Text input with dropdown button"
                        className="bg-transparent paymentMethod textInputMoney border-0 text-black-50 bolder py-0"
                        placeholder="They Receive"
                        readOnly
                        value={FirstStepData && FirstStepData.paymentMethod}
                      />
                    </div>
                  </div>
                </Row>
              </Form>
            </Row> */}
          </div>

          <Row className="mt-4 ps-4 pe-3">
            <Col className="col-lg-12 d-flex justify-content-between editIcon pe-0 ps-0 pb-2 ms-1">
              <div className="responsiveFontLarge  purpleText bolder">
                Payment Details
              </div>
              <div className=" purpleText cursor-pointer ">
                {/* <i className="fas fa-edit purpleText"></i> */}
                {
                  <img
                    src={editBtn}
                    className="step4Editimg"
                    onClick={() => goFirstStep(0)}
                    alt=""
                  />
                }
              </div>
            </Col>
          </Row>
          <Col className=" px-0 pt-4">
            <div className="mainMoneyBox py-4">
              <div className="firstMoneyBox me-3 ms-3 ">
                <InputGroup className="my-2 align-items-center position-relative">
                  <div className="countryFlag ms-3 img-fluid">
                    {flagSelect && (
                      <img
                        src={`https://flagcdn.com/40x30/${flagSelect.iso2?.toLowerCase()}.png`}
                        alt={flagSelect.iso2}
                        style={{width: '30px', marginRight: '5px'}}
                      />
                    )}
                  </div>
                  <div className="position-relative mt-2 d-flex justify-content-between">
                    <div
                      className="moneyBoxLabel"
                      style={{
                        position: 'absolute',
                        top: '-9px',
                        left: '4px',
                        padding: '0 5px',
                        fontSize: '13px'
                      }}
                    >
                      You Send
                    </div>
                    {' '}
                    <Form.Control
                      // style={{ fontSize: 22, fontWeight: "bold" }}
                      aria-label="Text input with dropdown button"
                      className="bg-transparent moneysentvalue textInputMoney fs-6 border-0 bolder text-black"
                      placeholder="You Send"
                      readOnly
                      id="money"
                      type="number"
                      value={
                        FirstStepData && FirstStepData?.amount
                          ? FirstStepData?.amount
                          : location.state && location.state?.TransactionData
                            ? location.state?.TransactionData?.amount
                            : ''
                      }
                      // defaultValue={"1"}
                      min={0}
                      onChange={(e) => setMoney(e)}
                    />
                  </div>
                  <div className="d-flex ms-auto">
                    <Form.Select
                      className="select-country bolder text-black"
                      value={flagSelect && flagSelect.currency}
                      aria-label="Default select example"
                      name="SMfromCountry"
                      disabled
                      onChange={handleFlagSelect}
                    >
                      {countries.map((val, index) => {
                        return (
                          <option
                            key={index}
                            defaultValue={flagSelect ? flagSelect.id : ''}
                          >
                            {val.currency}
                          </option>
                        )
                      })}
                      {/* {countries &&
                            countries.map((countryname, index) => {

                          return (
                              <option value={countryname.id} >{countryname.emoji}&nbsp;&nbsp;{countryname.currency}</option>
                          );
                        })}
                    */}
                    </Form.Select>
                  </div>
                </InputGroup>
              </div>

              <div className="secondMoneyBox my-4 py-3">
                <div className="responsiveFontLarge text-white text-center excText">
                  Exchange rate:
                  <b className="bolder">
                    {fromCountry} {flagSelect ? flagSelect.currency : ''} ={' '}
                    {toCountry} {flagSelect1 ? flagSelect1.currency : ''}
                  </b>{' '}
                  (Locked for {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  )
                </div>
              </div>

              <div className="firstMoneyBox me-3 ms-3 ">
                <InputGroup className="my-2 align-items-center">
                  <div className="countryFlag ms-3 img-fluid">
                    {flagSelect1 && (
                      <img
                        src={`https://flagcdn.com/40x30/${flagSelect1.iso2?.toLowerCase()}.png`}
                        alt={flagSelect1.iso2}
                        style={{width: '30px', marginRight: '5px'}}
                      />
                    )}
                  </div>
                  <div className="position-relative mt-2 d-flex justify-content-between">
                    <div
                      className="moneyBoxLabel"
                      style={{
                        position: 'absolute',
                        top: '-9px',
                        left: '4px',
                        padding: '0 5px',
                        fontSize: '13px'
                      }}
                    >
                      They Receive
                    </div>
                    {' '}
                    <Form.Control
                      // style={{ fontSize: 22, fontWeight: "bold" }}
                      aria-label="Text input with dropdown button"
                      className="bg-transparent textInputMoney border-0 bolder text-black"
                      placeholder="They Receive"
                      readOnly
                      value={
                        TheyRecive && TheyRecive?.exchangeRate == Number(toCountry) ?
                          // TheyRecive?.receivingAmount
                          Number(
                            FirstStepData?.receivingAmount
                              ? FirstStepData?.receivingAmount
                              : location.state && location.state.TransactionData
                                ? location.state.TransactionData.receivingAmount
                                : ''
                          )
                          :
                          Number((
                            Number(
                              FirstStepData?.amount
                                ? FirstStepData?.amount
                                : location.state && location.state.TransactionData
                                  ? location.state.TransactionData.amount
                                  : ''
                            ) * Number(toCountry)
                          )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        // Number(FirstStepData?.exchangeRate ? FirstStepData?.exchangeRate : location.state && location.state.TransactionData ? location.state.TransactionData.exchangeRate :"")
                        // .toFixed(2)
                      }
                    />
                  </div>
                  <div className="d-flex ms-auto">
                    <Form.Select
                      className="select-country bolder text-black"
                      readOnly
                      value={flagSelect1 && flagSelect1.currency}
                      aria-label="Default select example"
                      disabled
                      name="SMtoCountry"
                      onChange={(e) => {
                        handleFlagSelect1(e)
                      }}
                    >
                      {countries.map((val, index) => {
                        return (
                          <option
                            key={index}
                            defaultValue={flagSelect1 ? flagSelect1.id : ''}
                          >
                            {val.currency}
                          </option>
                        )
                      })}
                    </Form.Select>
                  </div>
                </InputGroup>
              </div>
            </div>
          </Col>

          <Row className="mt-4 ps-4 pe-3">
            <Col className="col-lg-12 d-flex justify-content-between ps-4 ms-1">
              <div className="responsiveFontLarge purpleText bolder">
                Payment Method
              </div>
            </Col>
          </Row>
          {/* <Row> */}

          {/* </Row> */}

          <div className="mainMoneyBox mt-2">
            <div className="py-2 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center responsiveFontLarge textInputMoney pe-4 ps-4">
                <img src={card} className="img-fluid" alt=""/>
                <Form.Control
                  aria-label="Text input with dropdown button"
                  className="bg-transparent paymentMethod textInputMoney border-0 text-black-50 bolder py-0"
                  placeholder="They Receive"
                  readOnly
                  value={
                    FirstStepData && FirstStepData.paymentMethod
                      ? FirstStepData.paymentMethod
                      : location.state &&
                      location.state.TransactionData != undefined
                        ? location.state.TransactionData.paymentMethod
                        : ''
                  }
                />
              </div>
            </div>
          </div>

          {/* </Col> */}

          <Col className="mt-3">
            <div className="pe-4 ps-4 py-3 pb-0 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center  pe-4 ps-1">
                <img src={gift} className="img-fluid" alt=""/>
                <div className="responsiveFontLarge  purpleText bolder ms-2">
                  Apply Promocode
                </div>
                <img src={info} className="img-fluid ms-2" alt=""/>
              </div>
              <div
                className={
                  FirstStepData?.promoCode ||
                  (PromoCodeVerify &&
                    location.state?.TransactionData &&
                    location.state?.TransactionData?.promoCode != 0)
                    ? `PromoCodeBox bolder p-1 purpleText px-3`
                    : ''
                }
              >
                {FirstStepData?.promoCode
                  ? FirstStepData?.promoCode
                  : PromoCodeVerify &&
                  location.state?.TransactionData &&
                  location.state?.TransactionData?.promoCode}
              </div>
            </div>
          </Col>

          <Col className="mt-3 ">
            <div className=" pe-1 ps-1 pt-4 pb-3 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center  pe-4 ps-4">
                <img src={timer} className="img-fluid" alt=""/>
                <div className="responsiveFontLarge  successText  ms-2">
                  Estimated Delivery time
                </div>
              </div>
              <div className="responsiveFontLarge  successTextModel text-end bolder ms-2 pe-4 ps-4">
                {estimateTimes ? estimateTimes : 'Few Hours'}
              </div>
            </div>
          </Col>

          <Col className="pt-3 pb-3 p-0">
            <div className="mainMoneyBox">
              <div className=" pt-4 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center  pe-4 ps-4">
                  <div className="responsiveFontLarge  textGray bolder ms-2">
                    Transfer Amount:
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                  <div className="responsiveFontLarge  text-black bolder me-2 purpleText bolder pointer">
                    {/* {sendMoney ? sendMoney : defaultSendMoney} {flagSelect ?flagSelect.currency:''} */}
                    {FirstStepData?.amount
                      ? Number((FirstStepData?.amount)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      // ? (FirstStepData?.amount).toFixed(2)
                      : location.state && location.state.TransactionData
                        ? location.state.TransactionData.amount
                        : ''}
                    &nbsp;
                    {FirstStepData.sendingCurrencyCode
                      ? FirstStepData.sendingCurrencyCode
                      : location.state && location.state.TransactionData
                        ? location.state.TransactionData.sendingCurrencyCode
                        : ''}
                  </div>
                </div>
              </div>
              <div className=" pt-4 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center  pe-4 ps-4">
                  <div className="responsiveFontLarge  textGray bolder ms-2">
                    Service Charge:
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                  <div className="responsiveFontLarge  text-black bolder me-2 purpleText bolder pointer">
                    {S_Charge ? S_Charge : 0}
                    {/* {FirstStepData?.serviceCharge ? (FirstStepData?.serviceCharge).toFixed(2) :location.state && location.state.TransactionData ? (location.state.TransactionData.serviceCharge).toFixed(2) :""}&nbsp; */}
                    {FirstStepData.sendingCurrencyCode
                      ? FirstStepData.sendingCurrencyCode
                      : location.state && location.state.TransactionData
                        ? location.state.TransactionData.sendingCurrencyCode
                        : ''}
                  </div>
                </div>
              </div>
              {/* <div className={`${(FirstStepData ? FirstStepData?.usedCashFlag : location.state && location.state.TransactionData ? location.state.TransactionData.usedCash == 0 ? false : true : false) == false ? "pb-4" : ""}  pt-4 d-flex justify-content-between align-items-center`}> */}
              <div
                className={`${(FirstStepData ? FirstStepData?.usedCashFlag : false) == false ? 'pb-4' : ''}  pt-4 d-flex justify-content-between align-items-center`}>
                <div className="d-flex align-items-center  pe-4 ps-4">
                  <div className="responsiveFontLarge  textGray bolder ms-2">
                    Promocode discount &nbsp;
                    {FirstStepData?.PromoCodeDiscountBenifitName
                      ? FirstStepData?.PromoCodeDiscountBenifitName
                      // :
                      // location.state && location.state?.TransactionData
                      // ? location.state?.TransactionData
                      //     ?.promoCodeServiceChargeDiscAmt != "" &&
                      //   location.state?.TransactionData
                      //     ?.promoCodeServiceChargeDiscAmt != 0
                      //   ? "(Service Charge)"
                      //   : location.state?.TransactionData
                      //       ?.promoCodeExRateDiscAmt != "" &&
                      //     location.state?.TransactionData
                      //       ?.promoCodeExRateDiscAmt != 0
                      //   ? "(Exchange Rate)"
                      //   : ""
                      : ''}{' '}
                    :
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                  <div className="responsiveFontLarge  text-black bolder me-2 purpleText bolder pointer">
                    {FirstStepData?.PromoCodeDiscount
                      ? '-' + FirstStepData?.PromoCodeDiscount
                      // : location.state && location.state?.TransactionData
                      // ? location.state?.TransactionData
                      //     ?.promoCodeServiceChargeDiscAmt != "" &&
                      //   location.state?.TransactionData
                      //     ?.promoCodeServiceChargeDiscAmt != 0
                      //   ? "-" +
                      //     location.state?.TransactionData
                      //       ?.promoCodeServiceChargeDiscAmt
                      //   : location.state?.TransactionData
                      //       ?.promoCodeExRateDiscAmt != "" &&
                      //     location.state?.TransactionData
                      //       ?.promoCodeExRateDiscAmt != 0
                      //   ? "-" +
                      //     location.state?.TransactionData
                      //       ?.promoCodeExRateDiscAmt
                      //   : "0"
                      : '0'}
                    {/* location.state && location.state.TransactionData ? location.state.TransactionData.sendingCurrencyCode :""} */}
                    &nbsp;
                    {FirstStepData?.sendingCurrencyCode
                      ? FirstStepData?.sendingCurrencyCode
                      : location.state && location.state?.TransactionData
                        ? location.state?.TransactionData?.sendingCurrencyCode
                        : ''}
                  </div>
                </div>
              </div>

              {/* <div className={`${(FirstStepData ? FirstStepData?.usedCashFlag : location.state && location.state.TransactionData ? location.state.TransactionData.usedCash == 0 ? false : true : false) == true ? "d-block" : "d-none"} pb-4 pt-4 d-flex justify-content-between align-items-center`}> */}
              <div
                className={`${(FirstStepData ? FirstStepData?.usedCashFlag : false) == true ? 'd-block' : 'd-none'} pb-4 pt-4 d-flex justify-content-between align-items-center`}>
                <div className="d-flex align-items-center  ps-4">
                  <div className="responsiveFontLarge  textGray bolder ms-2">
                    Used Balance :
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                  <div className="responsiveFontLarge  text-black bolder me-2 purpleText bolder eventNone">
                    {
                      // FirstStepData ? FirstStepData?.usedCash == 0 ? 0 : "-"+FirstStepData?.usedCash : location.state && location.state.TransactionData ? location.state.TransactionData.usedCash == 0 ? 0 : "-"+location.state.TransactionData.usedCash : 0
                      FirstStepData ? FirstStepData?.usedCash == 0 ? 0 : '-' + FirstStepData?.usedCash : 0
                    }
                    &nbsp;
                    {/* {Promocode} */}
                    {FirstStepData.sendingCurrencyCode
                      ? FirstStepData.sendingCurrencyCode
                      : location.state && location.state.TransactionData
                        ? location.state.TransactionData.sendingCurrencyCode
                        : ''}
                  </div>
                </div>
              </div>

              <div className="pt-3 pb-3 d-flex justify-content-between align-items-center purpleBackground bottomBg">
                <div className="d-flex align-items-center  pe-4 ps-4">
                  <div className="responsiveFontLarge  textGray bolder ms-2 text-white">
                    Total Payable
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                  <h4 className="text-white bolder">
                    {FirstStepData?.amount
                      ? Number((
                        FirstStepData?.amount +
                        FirstStepData?.serviceCharge -
                        FirstStepData?.PromoCodeDiscount -
                        FirstStepData?.usedCash
                      )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                      // ).toFixed(FirstStepData?.PromoCodeDiscount == 0 ? 2 : 3)
                      : location.state && location.state?.TransactionData
                        ? location.state?.TransactionData?.discountedAmount == 0
                          ? Number((
                            location.state?.TransactionData?.amount +
                            S_Charge
                          )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                          // ).toFixed(2)
                          : Number((
                            location.state?.TransactionData?.amount +
                            S_Charge
                          )?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                        // ).toFixed(2)
                        : ''}{' '}

                    &nbsp;
                    {FirstStepData.sendingCurrencyCode
                      ? FirstStepData.sendingCurrencyCode
                      : location.state && location.state.TransactionData
                        ? location.state.TransactionData.sendingCurrencyCode
                        : ''}
                    {/* {TotalRate == 0 ? (defaultSendMoney && (parseFloat(defaultSendMoney) + parseFloat(defaultTotal))) : (parseFloat(TotalRate) + parseFloat(sendMoney))} {flagSelect ?flagSelect.currency:''} */}
                  </h4>
                </div>
              </div>
            </div>
          </Col>

          <div className="reciepntsection pe-2 ps-2">
            <Row className="mt-4 ps-3 pe-3">
              <Col className="col-lg-12 d-flex justify-content-between editIcon pe-0 ps-0 pb-2 ms-1">
                <div className="responsiveFontLarge  purpleText bolder">
                  Recipient Details{' '}
                </div>
                <div className=" purpleText cursor-pointer ">
                  {/* <i className="fas fa-edit purpleText"></i> */}
                  {
                    <img
                      src={editBtn}
                      className="step4Editimg"
                      alt=""
                      onClick={(e) =>
                        UpdateReciever(
                          UserData && UserData?.id
                            ? UserData?.id
                            : location.state &&
                            location.state.TransactionData != undefined
                              ? location.state.TransactionData.recipientId
                              : DefaultSummuryId
                        )
                      } //goSecondStep(1)}
                    />
                  }
                </div>
              </Col>
            </Row>
            <Row className="innerForm mt-2">
              <Form className="mt-3" id="Signup_Step1">
                <Row className="">
                  <Form.Group
                    as={Col}
                    className="left-inner-addon input-container required"
                  >
                    <i className="purpleText main fa fa-user "></i>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Full Name"
                      name="Referal"
                      value={
                        !UserData?.firstName == ''
                          ? UserData?.firstName + ' ' + UserData?.lastName + ''
                          : !UserData?.businessName == ''
                            ? UserData?.businessName
                            : !UserData?.fullName == ''
                              ? UserData?.fullName.replace('[', '').replace(']', '')
                              : ''
                      }
                      readOnly
                      className="py-4 formControlStep2 reflink link mainS4 non_Select form-input"
                    />
                    <label for="name" className="form-label1">
                      {UserData && !UserData?.businessName == ''
                        ? 'Business Name'
                        : !UserData?.firstName == ''
                          ? 'Full Name'
                          : 'Name'}
                    </label>
                    <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                      Full Name
                    </div>

                    {/* {errors.name && <p>{errors.name}</p>} */}
                  </Form.Group>
                </Row>

                <Row className={UserData?.deliveryMethodName == 'Cash Pickup' ? 'd-none' : 'd-block'}>
                  <Form.Group
                    as={Col}
                    className="left-inner-addon input-container required"
                  >
                    <i className="purpleText mainStep4 fas fa-landmark"></i>
                    <Form.Control
                      required
                      readOnly
                      type="text"
                      name="Referal"
                      className="py-4 formControlStep2 reflink link mainS4 non_Select form-input"
                      value={
                        UserData && UserData?.bankName
                          ? UserData?.bankName
                          : '' || UserData?.walletName
                            ? UserData?.walletName
                            : ''
                      }
                    />
                    <label for="name" className="form-label1">
                      {UserData && !UserData?.bankAccNo == ''
                        ? 'Bank Name'
                        : 'Wallet Name'}
                    </label>
                  </Form.Group>
                </Row>

                <Row className={UserData?.deliveryMethodName == 'Cash Pickup' ? 'd-none' : 'd-block'}>
                  <Form.Group
                    as={Col}
                    className="left-inner-addon input-container required"
                  >
                    <i className="purpleText main fas fa-landmark"></i>
                    <Form.Control
                      type="text"
                      readOnly
                      required
                      placeholder=" Bank Account Number"
                      name="Referal"
                      className="py-4 formControlStep2 reflink link mainS4 non_Select form-input"
                      value={
                        UserData && UserData?.bankAccNo
                          ? UserData?.bankAccNo
                          : '' || UserData?.walletNo
                            ? UserData?.walletNo
                            : ''
                      }
                    />
                    <label for="name" className="form-label1">
                      {UserData && !UserData?.bankAccNo == ''
                        ? 'Bank Account Number'
                        : 'Wallet Number'}
                    </label>
                    <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                      Bank Account Number
                    </div>

                    {/* {errors.name && <p>{errors.name}</p>} */}
                  </Form.Group>
                </Row>
              </Form>
            </Row>
          </div>

          <Row className="mt-2 ps-4 pe-3">
            <Col className="col-lg-12 d-flex justify-content-between ps-2 ">
              <div className="responsiveFontLarge purpleText bolder">
                Delivery Method
              </div>
            </Col>
          </Row>

          <div className="mainMoneyBox mt-2 mx-2">
            <div className="py-2 d-flex align-items-center justify-content-between ">
              <div className="d-flex align-items-center responsiveFontLarge textInputMoney pe-4 ps-4 ">
                <img src={card} className="img-fluid" alt=""/>
                <Form.Control
                  aria-label="Text input with dropdown button"
                  className="bg-transparent paymentMethod textInputMoney border-0 text-black-50 bolder py-0"
                  placeholder="They Receive"
                  readOnly
                  value={
                    UserData && UserData?.deliveryMethodName
                      ? UserData?.deliveryMethodName
                      : location.state &&
                      location.state.TransactionData != undefined
                        ? location.state.TransactionData.deliveryMethodName
                        : ''
                  }
                />
              </div>
            </div>
          </div>

          <div className="contactsection pe-2 ps-2">
            <Row className="innerForm mt-2">
              <Form className="mt-3" id="Signup_Step1">
                <Row className="">
                  <Form.Group
                    as={Col}
                    className={`left-inner-addon input-container required ${
                      UserData && UserData.countryId === 154
                        ? 'd-none'
                        : 'd-block'
                    }`}
                  >
                    <i className="purpleText main fa fa-map-marker"></i>
                    <Form.Control
                      type="text"
                      readOnly
                      required
                      placeholder="Full address"
                      name="Referal"
                      className="py-4 formControlStep2 reflink link mainS4 non_Select form-input"
                      defaultValue={UserData == null ? '' : UserData.address}
                    />
                    <label for="name" className="form-label1">
                      Full Address
                    </label>
                    <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                      Full address
                    </div>

                    {/* {errors.name && <p>{errors.name}</p>} */}
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    className={`left-inner-addon input-container required ${
                      UserData && UserData.countryId === 154
                        ? 'd-bock'
                        : 'd-none'
                    }`}
                  >
                    <i className="purpleText main fa fa-map-marker"></i>
                    <Form.Control
                      type="text"
                      readOnly
                      required
                      placeholder="city"
                      name="Referal"
                      className="py-4 formControlStep2 reflink link mainS4 non_Select form-input"
                      defaultValue={UserData == null ? '' : UserData.city}
                    />
                    <label for="name" className="form-label1">
                      City/Subarb
                    </label>
                    {/* {errors.name && <p>{errors.name}</p>} */}
                  </Form.Group>
                </Row>

                <Row
                  className={
                    UserData && UserData.countryId === 154
                      ? 'd-none'
                      : 'd-block'
                  }
                >
                  <Form.Group
                    as={Col}
                    className="left-inner-addon input-container required"
                  >
                    <i className="purpleText main fa fa-mobile"></i>
                    <Form.Control
                      type="text"
                      readOnly
                      required
                      placeholder="Email"
                      name="Referal"
                      className="py-4 formControlStep2 reflink link mainS4 non_Select form-input"
                      defaultValue={UserData == null ? '' : UserData.email}
                    />
                    <label for="name" className="form-label1">
                      Email Address
                    </label>
                    <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                      Email Address
                    </div>

                    {/* {errors.name && <p>{errors.name}</p>} */}
                  </Form.Group>
                </Row>

                <Row
                  className={
                    UserData && UserData.phone === 0 ? 'd-none' : 'd-block'
                  }
                >
                  <Form.Group
                    as={Col}
                    className="left-inner-addon input-container required"
                  >
                    <i className="purpleText main fa fa-mobile"></i>
                    <Form.Control
                      type="text"
                      readOnly
                      required
                      placeholder="Mobile"
                      name="Referal"
                      className="py-4 formControlStep2 reflink link mainS4 non_Select form-input"
                      defaultValue={UserData == null ? '' : UserData.phone}
                    />
                    <label for="name" className="form-label1">
                      Mobile
                    </label>
                    <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                      Mobile
                    </div>

                    {/* {errors.name && <p>{errors.name}</p>} */}
                  </Form.Group>
                </Row>

                <Row className="">
                  <Form.Group
                    as={Col}
                    className="left-inner-addon input-container required"
                  >
                    <i className="purpleText main fa fa-user "></i>
                    <Form.Control
                      type="text"
                      readOnly
                      required
                      placeholder="Relation"
                      name="Referal"
                      className="py-4 formControlStep2 reflink link mainS4 non_Select form-input"
                      defaultValue={
                        UserData == null ? '' : UserData.relationName
                      }
                    />
                    <label for="name" className="form-label1">
                      Relation
                    </label>
                    <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                      Relation
                    </div>

                    {/* {errors.name && <p>{errors.name}</p>} */}
                  </Form.Group>
                </Row>
              </Form>
            </Row>

            <Row>
              <div
                className={`btn-component pe-5 ps-5 d-flex justify-content-center} `}
              >
                <input
                  className={`col-lg-3 uppercase  nextButton1 `}
                  type="button"
                  value={'Next'}
                  onClick={(e) => {
                    // Displaynext(false);
                    AddTransactionDetils()
                  }}
                />
              </div>
            </Row>
          </div>

          {/* <div className="paymentsection pe-2 ps-2 non_Select">
            <Row className="mt-4 ps-3 pe-3">
              <Col className="col-lg-12 d-flex justify-content-between editIcon pe-0 ps-0 pb-2 ms-1">
                <div className="responsiveFontLarge  purpleText bolder">Payment Method </div>
                <div className=" purpleText cursor-pointer ">
                </div>
              </Col>
            </Row>
            <Row className="innerForm mt-2">
              <Form className="mt-3" id="Signup_Step1">
                <Row className="me-0 ms-1">
                  <div className="mainS4 p-2 jaia d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center  pe-4 ps-4">
                      <img src={card} className="img-fluid" />
                      <Form.Control
                        aria-label="Text input with dropdown button"
                        className="bg-transparent paymentMethod textInputMoney border-0 text-black-50 bolder py-0"
                        placeholder="They Receive"
                        readOnly
                        value={FirstStepData && FirstStepData.paymentMethod}
                      />
                    </div>
                  </div>
                </Row>
              </Form>
            </Row>
          </div>

            <Row className="mt-4 ps-4 pe-3">
              <Col className="col-lg-12 d-flex justify-content-between editIcon pe-0 ps-0 pb-2 ms-1">
                <div className="responsiveFontLarge  purpleText bolder">Payment Summary</div>
                <div className=" purpleText cursor-pointer ">
                </div>
              </Col>
            </Row>
              <Col className=" px-0 pt-4">
                <div className="mainMoneyBox py-4">
                  <div className="firstMoneyBox me-3 ms-3 ">
                    <InputGroup className="my-2 align-items-center position-relative">
                      <div className="countryFlag ms-3 img-fluid">
                        {flagSelect && flagSelect.emoji}
                      </div>
                      <Form.Control
                        aria-label="Text input with dropdown button"
                        className="bg-transparent moneysentvalue textInputMoney fs-6 border-0"
                        placeholder="You Send"
                        id="money"
                        type="number"
                        value={FirstStepData && FirstStepData.amount}
                        min={0}
                        onChange={(e)=>setMoney(e)}
                      />
                      <Form.Select
                        className="select-country"
                        value={flagSelect && flagSelect.currency}
                        aria-label="Default select example"
                        name="SMfromCountry"
                        disabled
                        onChange={handleFlagSelect
                      }
                      >
                        {countries.map((val, index) => {
                          return <option key={index} defaultValue={flagSelect ? flagSelect.id:''} >{val.currency}</option>;
                        })}

                      </Form.Select>
                    </InputGroup>
                  </div>

                  <div className="secondMoneyBox my-4 py-3">
                    <div className="responsiveFontLarge text-white text-center excText">
                      Exchange rate:<b className="bolder">{fromCountry} {flagSelect ?flagSelect.iso3:''} = {toCountry} {flagSelect1 ?flagSelect1.iso3:''}</b>{" "}
                      (Locked for {minutes}:{seconds < 10 ? `0${seconds}` : seconds})
                    </div>
                  </div>

                  <div className="firstMoneyBox me-3 ms-3 ">
                    <InputGroup className="my-2 align-items-center" >
                      <div className="countryFlag ms-3 img-fluid">
                        {flagSelect1 && flagSelect1.emoji}
                      </div>
                      <Form.Control
                        aria-label="Text input with dropdown button"
                        className="bg-transparent textInputMoney border-0 "
                        placeholder="They Receive"
                        value={(Number(FirstStepData?.amount)*Number(FirstStepData?.exchangeRate)).toFixed(2)}
                      />
                      <Form.Select
                        className="select-country"
                        readOnly
                        value={flagSelect1 && flagSelect1.currency }
                        aria-label="Default select example"
                        disabled
                        name="SMtoCountry"
                        onChange={(e) => {
                          handleFlagSelect1(e);
                        }}
                      >
                        {countries.map((val, index) => {
                          return <option key={index}  defaultValue={flagSelect1 ?flagSelect1.id:''}>{val.currency}</option>;
                        })}
                      </Form.Select>

                    </InputGroup>
                  </div>
                </div>
              </Col>

              <Col className="">
                <div className="pe-4 ps-4 py-3 pb-0 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center  pe-4 ps-1">
                    <img src={gift} className="img-fluid" />
                    <div className="responsiveFontLarge  purpleText bolder ms-2">
                      Apply Promocode
                    </div>
                    <img src={info} className="img-fluid ms-2" />
                  </div>
                </div>
              </Col>

              <Col className="pt-3 pb-3 p-0">
                <div className="mainMoneyBox">
                <div className=" pt-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center  pe-4 ps-4">
                      <div className="responsiveFontLarge  textGray bolder ms-2">
                        Transfer Amount:
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                      <div className="responsiveFontLarge  text-black bolder me-2 purpleText bolder pointer">
                       {FirstStepData?.amount}&nbsp;{FirstStepData.sendingCurrencyCode}
                      </div>
                    </div>
                  </div>
                  <div className=" pt-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center  pe-4 ps-4">
                      <div className="responsiveFontLarge  textGray bolder ms-2">
                        Service Charge:
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                      <div className="responsiveFontLarge  text-black bolder me-2 purpleText bolder pointer">
                       {FirstStepData?.serviceCharge}&nbsp;{FirstStepData.sendingCurrencyCode}
                      </div>
                    </div>
                  </div>
                  <div className="pb-4 pt-4 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center  pe-4 ps-4">
                      <div className="responsiveFontLarge  textGray bolder ms-2">
                        Promocode discount:
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end pe-4 ps-4">
                      <div className="responsiveFontLarge  text-black bolder me-2 purpleText bolder pointer">
                        0 AUD
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 pb-3 d-flex justify-content-between align-items-center purpleBackground bottomBg">
                    <div className="d-flex align-items-center  pe-4 ps-4">
                      <div className="responsiveFontLarge  textGray bolder ms-2 text-white">
                        Total Payable
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-end pe-4 ps-4">

                      <h4 className="text-white bolder">
                      {FirstStepData?.amount+FirstStepData?.serviceCharge}&nbsp;{FirstStepData.sendingCurrencyCode}
                      </h4>
                    </div>
                  </div>
                </div>
              </Col> */}
          {/* </Container> */}
        </Container>

        {/* Payment Method DropDown */}
        <Modal show={ShowPayment} onHide={handleClosePayment} size="lg">
          <Modal.Body className="modal-money-payment">
            {getAllPaymentMethod &&
              getAllPaymentMethod.map((PaymentMethod, index) => {
                return (
                  <>
                    <div
                      className={`cardActivePurple ${
                        PaymentID === index ? 'cardActiveSendMoney' : ''
                      }`}
                    >
                      <div
                        className="innerCardActive py-3 my-3"
                        onClick={(e) => {
                          handlePaymentmethod(
                            e,
                            index,
                            PaymentMethod.paymentMethodCharges[0].type,
                            PaymentMethod.paymentMethodCharges[0].range[0]
                              .lower,
                            PaymentMethod.paymentMethodCharges[0].range[0]
                              .upper,
                            PaymentMethod.paymentMethodCharges[0].range[0]
                              .charge
                          )
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start pe-3 ps-3 py-3 ">
                          <div className="">
                            <img src={firstPay} className="img-fluid"/>
                            <div className="responsiveFontLarge  text-black bolder ms-4 ">
                              {PaymentMethod.paymentMethodCharges[0].type}
                            </div>
                            <img src={info} className="img-fluid ms-2"/>

                            <br></br>
                            <div className="d-flex flex-column excLeft">
                              <div className="d-flex pb-2 justify-content-between">
                                <div className="textGray bolder">
                                  {fromCountry}{' '}
                                  {flagSelect ? flagSelect.currency : ''} ={' '}
                                  {toCountry}{' '}
                                  {flagSelect1 ? flagSelect1.currency : ''}{' '}
                                </div>
                              </div>
                              <div className="d-flex pb-2 justify-content-between">
                                <div className="text-black bolder">
                                  Total Receivable :
                                </div>
                                {' '}
                                <div className="text-black bolder">
                                  {Math.round(receiveMoney)}{' '}
                                  {flagSelect1 ? flagSelect1.currency : ''}
                                </div>
                              </div>
                              <div className="d-flex pb-2 justify-content-between">
                                <div className="text-black bolder">
                                  Total Service Charge :
                                </div>
                                {' '}
                                <div className="text-black bolder">
                                  {FirstStepData &&
                                  FirstStepData.amount >=
                                  PaymentMethod.paymentMethodCharges[0]
                                    .range[0].lower &&
                                  FirstStepData &&
                                  FirstStepData.amount <=
                                  PaymentMethod.paymentMethodCharges[0]
                                    .range[0].upper
                                    ? PaymentMethod.paymentMethodCharges[0]
                                      .range[0].charge
                                    : '0'}{' '}
                                  {flagSelect ? flagSelect.currency : ''}
                                </div>
                              </div>
                              <div className="d-flex pb-2 justify-content-between">
                                <div className="text-black bolder">
                                  Total Payable :
                                </div>
                                {' '}
                                <div className="text-black bolder">
                                  {FirstStepData &&
                                  FirstStepData.amount >=
                                  PaymentMethod.paymentMethodCharges[0]
                                    .range[0].lower &&
                                  FirstStepData &&
                                  FirstStepData.amount <=
                                  PaymentMethod.paymentMethodCharges[0]
                                    .range[0].upper
                                    ? parseInt(
                                      PaymentMethod.paymentMethodCharges[0]
                                        .range[0].charge
                                    ) +
                                    parseInt(
                                      FirstStepData && FirstStepData.amount
                                    )
                                    : FirstStepData &&
                                    FirstStepData.amount}{' '}
                                  {flagSelect ? flagSelect.currency : ''}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`tick ${
                              PaymentID === index ? 'd-block' : 'd-none'
                            }`}
                          >
                            <img src={tickIcon} className="img-fluid"/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="py-1 pe-2 ps-2"></hr>
                  </>
                )
              })}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={handleClosePayment}
            >
              Select
            </Button>
          </Modal.Footer>
        </Modal>

        {/* //////////////////Update Recipient/////////////////// */}

        <Modal show={show7} onHide={handleCloseRec7} size="lg">
          <Row className="">
            <Modal.Header className="text-center  mt-1">
              <img
                src={backA}
                className="img-fluid pointer"
                onClick={handleCloseRec7}
                alt=""
              />
              <Modal.Title className="d-flex m-auto">
                <h1 className="purpleText bolder responsiveFontLargeHeading  mb-0">
                  Edit Recipient
                </h1>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="mainss">
              <Row>
                <Col className="col-lg-12 d-flex m-auto justify-content-center">
                  <div className={`dropdown`}>
                    <button
                      onClick={handleDropdownClickU}
                      className="dropdown-btn d-flex justify-content-evenly align-items-start m-0"
                    >
                      {dropdownValueU === '' ? (
                        <>
                          <img
                            src={bankIcon}
                            width="50"
                            height="50"
                            alt=""
                            className="img-fluid"
                          />
                          <div className="d-flex flex-column ms-4">
                            <div className=" mainD responsiveFontLarge">
                              Delivery Method{' '}
                            </div>
                            <div className="text-black text-start bolder">
                              {isVisibleDynamicU}
                            </div>
                          </div>
                          <img
                            src={drpa}
                            className="img-fluid mt-4 ms-4"
                            alt=""
                          />
                        </>
                      ) : (
                        dropdownValueU
                      )}
                    </button>
                    {selectedDeliveryMethod == 'individual' && (
                      <div
                        className={`dropdown-items ${
                          dropdownStateU ? 'isVisible' : 'isHidden'
                        }`}
                      >
                        {getAllDeliveryMethod &&
                          getAllDeliveryMethod.map((DeliveryMethod, index) => {
                            return (
                              <div
                                key={index}
                                className="dropdown-item"
                                // onClick={(e) =>
                                //   toggleVisibilityDynamicU(
                                //     DeliveryMethod.name,
                                //     e
                                //   )
                                // }
                              >
                                <div
                                  className="dropdown__link d-flex align-items-start "
                                  onClick={(e) => {
                                    handleSetDropdownValueU(
                                      <>
                                        <img
                                          src={DeliveryMethod.logo}
                                          width="50"
                                          height="50"
                                          alt=""
                                          className="img-fluid"
                                        />
                                        <div className="d-flex flex-column ms-4">
                                          <div className="mainD responsiveFontLarge">
                                            Delivery Method
                                          </div>
                                          <div className="text-black text-start bolder  ">
                                            {DeliveryMethod.name}
                                          </div>
                                        </div>
                                        <img
                                          src={drpa}
                                          alt=""
                                          className="img-fluid mt-4 ms-4"
                                        />
                                      </>,
                                      DeliveryMethod.name,
                                      DeliveryMethod.id
                                    )
                                    setUDeliveryName(DeliveryMethod.name)
                                    toggleVisibilityDynamicU(
                                      DeliveryMethod.name
                                    )
                                  }
                                  }
                                >
                                  <img
                                    src={DeliveryMethod.logo}
                                    width="30"
                                    height="30"
                                    alt=""
                                    className="img-fluid"
                                  />
                                  <div className="text-black  bolder text-center ms-4">
                                    {DeliveryMethod.name}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                      </div>
                    )}
                  </div>
                </Col>
              </Row>

              {isVisibleDynamicU == 'Bank Deposit' ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <div
                            className={`${
                              UpdateUserData.type === 'individual'
                                ? 'd-block'
                                : 'd-none'
                            }`}
                          >
                            <Row className="">
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required text-start"
                              >
                                <i className="purpleText main fa fa-user "></i>
                                <Form.Control
                                  type="text"
                                  required
                                  defaultValue={UpdateUserData.firstName}
                                  placeholder="First Name"
                                  name="UIndidual_Firstname"
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleUpdateRecieverValue}
                                />
                                <label for="name" className="form-label1">
                                  First Name
                                </label>
                                <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  First Name
                                </div>

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                            <Row className="">
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required text-start"
                              >
                                <i className="purpleText main fa fa-user "></i>
                                <Form.Control
                                  type="text"
                                  required
                                  placeholder="Middle Name"
                                  defaultValue={UpdateUserData.middleName}
                                  name="UIndidual_Middlename"
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleUpdateRecieverValue}
                                />
                                <label for="name" className="form-label1">
                                  Middle Name
                                </label>
                                <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  Middle Name
                                </div>

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                            <Row className="">
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required text-start"
                              >
                                <i className="purpleText main fa fa-user "></i>
                                <Form.Control
                                  type="text"
                                  required
                                  placeholder="Last Name"
                                  defaultValue={UpdateUserData.lastName}
                                  name="UIndidual_Lastname"
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleUpdateRecieverValue}
                                />
                                <label for="name" className="form-label1">
                                  Last Name
                                </label>
                                <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  Last Name
                                </div>

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                          </div>
                          <div
                            className={`${
                              UpdateUserData.type === 'business'
                                ? 'd-block'
                                : 'd-none'
                            }`}
                          >
                            <Row className="">
                              <Form.Group
                                as={Col}
                                className="left-inner-addon input-container required text-start"
                              >
                                <i className="purpleText main fa fa-user "></i>
                                <Form.Control
                                  type="text"
                                  required
                                  defaultValue={UpdateUserData.businessName}
                                  placeholder="Business Name"
                                  name="UBusiness_Name"
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleUpdateRecieverValue}
                                />
                                <label for="name" className="form-label1">
                                  Business Name
                                </label>
                                <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                  First Name
                                </div>

                                {/* {errors.name && <p>{errors.name}</p>} */}
                              </Form.Group>
                            </Row>
                          </div>
                          <div
                            className={`${
                              UpdateUserData.type === 'joint'
                                ? 'd-block'
                                : 'd-none'
                            }`}
                          >
                            <Row className="">
                              <Col className="col-lg-12 d-flex mt-3 justify-content-end ms-auto">
                                <Button
                                  className="mt-2 col-lg-4 ps-2 pe-2 d-block upparcase fullRoundedCorner justify-content-end rounded-5 nextBtn1"
                                  variant="primary"
                                  // onClick={handleShowRec}
                                  onClick={UpdateFieldsReciptionDetails}
                                >
                                  <img
                                    src={plus}
                                    className="img-fluid"
                                    alt=""
                                  />{' '}
                                  add account holder
                                  {/* RECIPIENT */}
                                </Button>
                              </Col>
                            </Row>
                            <Form onSubmit={Updatesubmit}>
                              {updateinputFields.map((input, index) => {
                                return (
                                  <div key={index}>
                                    <Row className="">
                                      <div className="d-flex p-0 m-0">
                                        <Form.Group
                                          as={Col}
                                          className="left-inner-addon input-container required text-start"
                                        >
                                          <i className="purpleText main fa fa-user "></i>
                                          <Form.Control
                                            type="text"
                                            id={index}
                                            required
                                            value={input.FullName}
                                            placeholder={'Full Name '}
                                            name="FullName"
                                            className="formControlStep2 reflink link form-input"
                                            // onBlur={submit}
                                            onChange={(event) =>
                                              handleFormChangeUpdateDetails(
                                                index,
                                                event
                                              )
                                            }
                                          />
                                          <label
                                            for="name"
                                            className="form-label1"
                                          >
                                            Full Name{' '}
                                          </label>
                                        </Form.Group>
                                        <span
                                          className={`pt-2 ${
                                            index == 0 ? 'd-none' : 'd-block'
                                          }`}
                                          onClick={() =>
                                            UpdateremoveFieldsReciptionDetails(
                                              index
                                            )
                                          }
                                        >
                                          <i class="fas fa-times-circle pointer"></i>
                                        </span>
                                      </div>
                                      {invalid &&
                                        !updateinputFields[0].FullName && (
                                          <div className="responsiveFontLarge  text-danger error_message ms-2 error">
                                            Full Name is required
                                          </div>
                                        )}
                                    </Row>
                                  </div>
                                )
                              })}
                            </Form>
                          </div>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-landmark"></i>
                              <Form.Select
                                className="purpleBorder form-input"
                                name="UBankId"
                                value={
                                  step2UpdateSendMoneyvalue.UBankId != ''
                                    ? step2UpdateSendMoneyvalue.UBankId
                                    : UpdateUserData.bankId
                                }
                                id="select1"
                                onChange={handleUpdateRecieverValue}
                              >
                                <option value="">Bank Name (searchable)</option>
                                {UBanks &&
                                  UBanks.map((Bank, Index) => {
                                    return (
                                      <option value={Bank.id}>
                                        {Bank.text}
                                      </option>
                                    )
                                  })}
                              </Form.Select>
                              <label for="name" className="form-label1">
                                Bank Name
                              </label>
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-landmark"></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Bank Account Number"
                                name="UBankAccountNumber"
                                className="formControlStep2 reflink link form-input"
                                defaultValue={UpdateUserData.bankAccNo}
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Bank Account Number
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Bank Account Number
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <div
                            className={`${
                              FirstStepData.recevingCountryId === 101
                                ? 'd-block'
                                : 'd-none'
                            }`}
                          >
                            <div className=" d-flex align-items-center my-3">
                              <div className="radio">
                                <input
                                  type="radio"
                                  name="UIFSC"
                                  value="IFSC"
                                  id="UIFSC"
                                  onChange={UchangeHandler}
                                  checked={Uselected === 'IFSC'}
                                />
                                <label
                                  htmlFor="UIFSC"
                                  className="radio-label text-black mb-0 d-flex align-items-center"
                                >
                                  I have IFSC Code
                                </label>
                              </div>

                              <div className="radio ms-3">
                                <input
                                  type="radio"
                                  value="NoIFSC"
                                  id="UNoIFSC"
                                  name="gender"
                                  onChange={UchangeHandler}
                                  checked={Uselected === 'NoIFSC'}
                                />
                                <label
                                  htmlFor="UNoIFSC"
                                  className="radio-label text-black mb-0 d-flex align-items-center"
                                >
                                  I don’t have IFSC Code
                                </label>
                              </div>
                            </div>

                            <div
                              // id="female1"
                              className={`${
                                Uselected === 'IFSC' ? 'd-none' : 'd-block'
                              }`}
                              // aria-hidden={selected !== "female" ? true : false}
                            >
                              <Row
                                className=""
                                aria-hidden={
                                  Uselected !== 'male' ? true : false
                                }
                              >
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Select
                                    className="purpleBorder form-input"
                                    // defaultValue="Individual"
                                    id="select1"
                                    name="UBankState"
                                    defaultValue={UpdateUserData.bankStateId}
                                    onChange={handleUpdateRecieverValue}
                                  >
                                    {/* <option value="Registered">Registered as Business</option> */}
                                    <option value="">State</option>
                                    {getState &&
                                      getState.map((state, Index) => {
                                        return (
                                          <option value={state.id} key={Index}>
                                            {state.name}
                                          </option>
                                        )
                                      })}
                                  </Form.Select>
                                  <label for="name" className="form-label1">
                                    Bank State
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Control
                                    className="purpleBorder form-input"
                                    // defaultValue="Individual"
                                    placeholder="District"
                                    name="UDistrict"
                                    defaultValue={UpdateUserData.district}
                                    onChange={handleUpdateRecieverValue}
                                  ></Form.Control>
                                  <label for="name" className="form-label1">
                                    Bank District
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>

                              <Row>
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container text-start"
                                >
                                  <i className="purpleText mainStep4 fa fa-map-marker"></i>
                                  <Form.Control
                                    className="purpleBorder form-input"
                                    // defaultValue="Individual"
                                    name="UBranch"
                                    placeholder="Branch"
                                    id="select1"
                                    defaultValue={UpdateUserData.bankBranch}
                                    onChange={handleUpdateRecieverValue}
                                  >
                                    {/* <option value="Registered">Registered as Business</option> */}
                                    {/* <option value="Individual">Branch</option>
                                    <option value="Business">Business</option>
                                    <option value="Agent">Agent</option> */}
                                  </Form.Control>
                                  <label for="name" className="form-label1">
                                    Bank Branch
                                  </label>
                                  {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                                </Form.Group>
                              </Row>
                            </div>

                            <div
                              // id="male1"
                              className={`${
                                Uselected === 'NoIFSC' ? 'd-none' : 'd-block'
                              }`}

                              // aria-hidden={selected !== "male" ? true : false}
                            >
                              <Row
                                className=""
                                aria-hidden={
                                  Uselected !== 'female' ? true : false
                                }
                              >
                                <Form.Group
                                  as={Col}
                                  className="left-inner-addon input-container required text-start"
                                >
                                  <i className="purpleText mainStep4 fas fa-landmark"></i>
                                  <Form.Control
                                    type="text"
                                    required
                                    placeholder="IFSC Code (if India) / Routing Number (in USA)/ BSB (in AUS)"
                                    name="UIFSC_Code"
                                    className="formControlStep2 reflink link form-input"
                                    defaultValue={UpdateUserData.ifscCode}
                                    onChange={handleUpdateRecieverValue}
                                  />
                                  <label for="name" className="form-label1">
                                    IFSC Code (if India) / Routing Number (in
                                    USA)/ BSB (in AUS)
                                  </label>
                                  <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                    IFSC Code (if India) / Routing Number (in
                                    USA)/ BSB (in AUS)
                                  </div>

                                  {/* {errors.name && <p>{errors.name}</p>} */}
                                </Form.Group>
                              </Row>
                            </div>
                          </div>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamicU == 'Wallet Deposit' ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="First Name"
                                name="UIndidual_Firstname"
                                defaultValue={UpdateUserData.firstName}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                First Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                First Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Middle Name"
                                defaultValue={UpdateUserData.middleName}
                                name="UIndidual_Middlename"
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Middle Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Middle Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Last Name"
                                defaultValue={UpdateUserData.lastName}
                                name="UIndidual_Lastname"
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Last Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Last Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>

                          <Row>
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container text-start"
                            >
                              <i className="purpleText mainStep4 fas fa-wallet"></i>
                              <Form.Select
                                className="purpleBorder form-input"
                                // defaultValue={UpdateUserData.bankId}
                                id="select1"
                                name="UwalletName"
                                value={
                                  step2UpdateSendMoneyvalue.UwalletName != ''
                                    ? step2UpdateSendMoneyvalue.UwalletName
                                    : UpdateUserData.bankId
                                }
                                onChange={(e) => {
                                  handleUpdateRecieverValue(e)
                                  handleUpdateWalletname(e)
                                }}
                              >
                                <option value="">Wallet name</option>
                                {UBanks &&
                                  UBanks.map((Bank, Index) => {
                                    return (
                                      <option value={Bank.id}>
                                        {Bank.text}
                                      </option>
                                    )
                                  })}
                              </Form.Select>
                              {/* <Form.Control
                                  type="text"
                                  required
                                  placeholder="Wallet Name"
                                  name="UwalletName"
                                  defaultValue={UpdateUserData.walletName}
                                  className="formControlStep2 reflink link form-input"
                                  onChange={handleUpdateRecieverValue}
                                /> */}
                              <label for="name" className="form-label1">
                                Wallet Name
                              </label>

                              {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                            </Form.Group>
                          </Row>

                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fas fa-wallet "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Wallet Account no."
                                defaultValue={UpdateUserData.walletNo}
                                name="UwalletNo"
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Wallet Account Number 125
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Wallet Account no.
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                </>
              ) : isVisibleDynamicU == 'Cash Pickup' ? (
                <>
                  <Row>
                    <Col className="col-lg-12 mt-2 text-center">
                      <label className="text-black text-center">
                        Recipient Bank Details
                      </label>
                      <Form>
                        <Form
                          className="mt-3 sendMoneyPaddingForm"
                          id="Signup_Step1"
                        >
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="First Name"
                                name="UIndidual_Firstname"
                                defaultValue={UpdateUserData.firstName}
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                First Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                First Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Middle Name"
                                defaultValue={UpdateUserData.middleName}
                                name="UIndidual_Middlename"
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Middle Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Middle Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                          <Row className="">
                            <Form.Group
                              as={Col}
                              className="left-inner-addon input-container required text-start"
                            >
                              <i className="purpleText main fa fa-user "></i>
                              <Form.Control
                                type="text"
                                required
                                placeholder="Last Name"
                                defaultValue={UpdateUserData.lastName}
                                name="UIndidual_Lastname"
                                className="formControlStep2 reflink link form-input"
                                onChange={handleUpdateRecieverValue}
                              />
                              <label for="name" className="form-label1">
                                Last Name
                              </label>
                              <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                                Last Name
                              </div>

                              {/* {errors.name && <p>{errors.name}</p>} */}
                            </Form.Group>
                          </Row>
                        </Form>
                      </Form>
                    </Col>
                  </Row>
                </>
              ) : (
                ''
              )}
            </Modal.Body>
          </Row>

          <Row>
            <Modal.Body className="mainss">
              <>
                <Row>
                  <Col className="col-lg-12  text-center">
                    <label className="text-black text-center mb-0">
                      Contact Details
                    </label>
                    <Form>
                      <Form
                        className="mt-3 sendMoneyPaddingForm"
                        id="Signup_Step1"
                      >
                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? 'd-none'
                              : 'd-block'
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-map-marker "></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Address"
                              name="UAddress"
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.address}
                              onChange={handleUpdateRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Address
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Address
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row className="">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-map-marker "></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="City/District"
                              name="UCity"
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.city}
                              onChange={handleUpdateRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              City/District
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              City/District
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? 'd-none'
                              : 'd-block'
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container text-start"
                          >
                            <i className="purpleText mainStep4 fa fa-map-marker"></i>
                            <Form.Select
                              className="purpleBorder form-input"
                              // defaultValue="Individual"
                              id="select1"
                              value={UpdateUserData.stateId}
                              name="UState"
                              onChange={handleUpdateRecieverValue}
                            >
                              {/* <option value="Registered">Registered as Business</option> */}
                              <option value="">State</option>
                              {getState &&
                                getState.map((state, Index) => {
                                  return (
                                    <option value={state.id} key={Index}>
                                      {state.name}
                                    </option>
                                  )
                                })}
                            </Form.Select>
                            <label for="name" className="form-label1">
                              State
                            </label>
                            {/* <Form.Control type="text" placeholder="First Name" className="formControlStep2"/> */}
                          </Form.Group>
                        </Row>

                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? 'd-none'
                              : 'd-block'
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-map-marker"></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Postal Code"
                              name="UPostalCode"
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.postalCode}
                              onChange={handleUpdateRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Postal Code
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Postal Code
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row className="">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-mobile"></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Mobile"
                              name="UMobile"
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.phone}
                              onChange={handleUpdateRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Mobile
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Mobile
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row
                          className={`${
                            FirstStepData.recevingCountryId === 154
                              ? 'd-none'
                              : 'd-block'
                          }`}
                        >
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-mobile"></i>
                            <Form.Control
                              type="text"
                              required
                              placeholder="Email"
                              name="UEmail"
                              className="formControlStep2 reflink link form-input"
                              defaultValue={UpdateUserData.email}
                              onChange={handleUpdateRecieverValue}
                            />
                            <label for="name" className="form-label1">
                              Email
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Mobile
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>

                        <Row className="">
                          <Form.Group
                            as={Col}
                            className="left-inner-addon input-container required text-start"
                          >
                            <i className="purpleText main fa fa-user"></i>
                            <Form.Select
                              className="purpleBorder form-input"
                              defaultValue={UpdateUserData.relationId}
                              name="URelation"
                              id="select1"
                              onChange={handleUpdateRecieverValue}
                            >
                              <option value="">Relation</option>
                              {adminRelation &&
                                adminRelation.map((Relations, index) => {
                                  return (
                                    <option key={index} value={Relations.id}>
                                      {Relations.name}
                                    </option>
                                  )
                                })}
                            </Form.Select>
                            <label for="name" className="form-label1">
                              Relation
                            </label>
                            <div className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              Relation
                            </div>

                            {/* {errors.name && <p>{errors.name}</p>} */}
                          </Form.Group>
                        </Row>
                      </Form>
                    </Form>
                  </Col>
                </Row>

                <Row>
                  <Col className="col-lg-12">
                    <Button
                      className="mt-0 my-1 mb-4 col-lg-3 d-block m-auto nextBtn1"
                      onClick={
                        UpdateUserData.type === 'individual'
                          ? UpdateindividualReciever
                          : UpdateUserData.type === 'business'
                            ? UpdateBusinessReciever
                            : UpdateJointReciever
                      }
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </>
            </Modal.Body>
          </Row>
        </Modal>

        <Modal
          centered
          show={RequestChangetoadmin}
          onHide={(e) => {
            setRequestChangetoadmin(false)
          }}
        >
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black mt-2">Note</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pt-4 mt-2">
            <p className="text-black ">
              recipient update request sent to admin Successfully
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="mt-2 col-lg-3 d-block m-auto nextBtn1"
              variant="primary"
              onClick={(e) => {
                setRequestChangetoadmin(false)
              }}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className="border-bottom ">
            <Modal.Title id="contained-modal-title-vcenter">
              Apply Promocode
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="coupon-box ">
              {PromoCodeDetails.length > 0 ? (
                <>
                  {PromoCodeDetails.map((promodetails, index) => {
                    return (
                      <>
                        <div className={`radio-icon-div py-2 border-bottom `}>
                          <div
                            className={`radio-label-text ${
                              Removebtn == promodetails.id
                                ? "cardActiveSendMoney"
                                : ""
                            }  p-3`}
                          >
                            <div className="row ">
                              <div className="d-flex justify-content-between">
                                <div className="">
                                  <h3 className="custom-title">
                                    <span className="purpleText">
                                      {promodetails.promoCode}
                                    </span>
                                  </h3>
                                  <h5 className="custom-desc">
                                    <ul className="ps-0 fs-6 mt-4">
                                      <li className="coupon-description">
                                        {promodetails.description}
                                      </li>
                                      <li className="coupons-description">
                                        Valid till{" "}
                                        {moment(promodetails.validTo).format(
                                          "DD MMMM YYYY"
                                        )}
                                      </li>
                                    </ul>
                                  </h5>
                                </div>
                                <div className="">
                                  <Button
                                    className={`btn btn-default purpleBackground text-white m-0 w-auto px-5 ${
                                      Removebtn == promodetails.id
                                        ? "d-none"
                                        : "d-block"
                                    }`}
                                    onClick={() => {
                                      handleSelectPromo(
                                        promodetails?.id,
                                        promodetails?.deliveryMethod,
                                        promodetails?.paymentMethod,
                                        promodetails?.benifitsOnCash,
                                        promodetails?.minSendingAmt,
                                        promodetails?.minAmount,
                                        promodetails?.maxAmount,
                                        promodetails?.minExchangeRate,
                                        promodetails?.maxExchangeRate,
                                        promodetails?.minServiceCharge,
                                        promodetails?.maxServiceCharge,
                                        promodetails?.points,
                                        promodetails?.exDiscount,
                                        promodetails?.seDiscount,
                                        promodetails?.promoCode
                                      );
                                      setAppliedPromoCode(promodetails)
                                    }}
                                  >
                                    Apply
                                  </Button>

                                  <Button
                                    className={`btn btn-default bg-danger text-white m-0 w-auto px-5 ${
                                      Removebtn == promodetails.id
                                        ? "d-block"
                                        : "d-none"
                                    }`}
                                    onClick={() => {
                                      setRemovebtn(0);
                                      setBenifitonExchangeRateandServiceCharge(
                                        0
                                      );
                                      setAppliedPromoCode("noData")
                                    }}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                <div className="promocodePopupHeight align-items-center justify-content-center d-flex">
                  <p className="">No PromoCode available</p>
                </div>
              )}
            </div>
          </Modal.Body>
        </Modal> */}
      </section>
    </>
  )
}
