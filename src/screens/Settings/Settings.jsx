import React, { useEffect, useState } from 'react'
import './Settings.scss'
import { Button, Container, Form, Row } from 'react-bootstrap'
import NavBar from '../Home/Navbar/Navbar'
import Footer from '../Home/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import ReactFlagsSelect from 'react-flags-select'
import Select from 'react-dropdown-select'
import { country_list } from '../../Helpers/CountryPicker/customLabel'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'
import { CommonConstants } from '../../Constants/common.constants'
import nepalFlag from '../../assets/images/nepalFlag.png'
import Loader from '../Loader/Loader'

export default function Settings () {
  const [userID, setUserId] = useState(localStorage.getItem('Id'))
  const [countries, setCountries] = useState([])
  const [countries1, setCountries1] = useState([])
  const [select, setSelect] = useState('AU')
  const [select1, setSelect1] = useState('NP')
  const [senderCountries, setsenderCountries] = useState([])
  const [receiverCountries, setreceiverCountries] = useState([])
  const [flagSelect, setFlags] = useState(0)
  const [flagSelect1, setFlags1] = useState(1)
  const [ID, setId] = useState(14)
  const [Id2, setId2] = useState(154)
  const [temp, setTemp] = useState(1)
  const [toCountry, settoCountry] = useState(0)
  const [DefaultExchangeRate, setDefaultExchangeRate] = useState(toCountry)
  const [allAlertSetting, setAllAlertSetting] = useState([])
  // exchange rate states
  const [showDocumentUplodedPopup, setshowDocumentUplodedPopup] =
    useState(false)

  const [AlertNotify, setAlertNotify] = useState(false)

  const [loadervalue, setloadervalue] = useState(false)


  const [notificationSettings, setNotificationSettings] = useState({
    pushNotification: false,
    emailNotification: false,
    smsNotification: false,
    receivePromotional: false
  })
  const [userSetting, setUserSetting] = useState({
    'Push notification': false,
    'Email notification': false,
    'SMS notification': false,
    'Receive promotional content': false,
    'Recipient related notification': false,
    'Exchange Rate Alert': false
  })


  const navigate = useNavigate()

  const handleSaveSettings = async () => {
    const payload = {
      'userId': userID,
      'isPushNotification': userSetting['Push notification'],
      'isEmailNotification': userSetting['Email notification'],
      'isSmsNotification': userSetting['SMS notification'],
      'isReceivePromotionalContent': userSetting['Receive promotional content'],
      'isNotificationRelatedNotification': false,
      'isPinAuth': false,
      'isExchangeRateAlert': userSetting['Exchange Rate Alert']
    }

    try {
      const response = await axios.post(
        CommonConstants.BASE_URL + '/savesettings',
        payload
      )

      if (response.data.status === true) {
        // getUsersSetting()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const changePasswordHandle = () => {
    //navigating to Home
    navigate('/changepassword')
    window.scrollTo(0, 0)
  }

  function findIdByISO2 (iso2) {
    const matchedItem = countries.find((item) => item.iso2 === iso2)
    console.log(matchedItem, 'matchedItem')
    return matchedItem ? matchedItem.id : 0
  }

  const onSelect = (countryCode) => {
    // Handle selected country code
    console.log(countryCode)
    const matchedItem = countries.find(item => item.iso2 === countryCode)
    setFlags(matchedItem)
    setSelect(countryCode)
    // setId1(findIdByISO2(code))
    GetAllRecivingCountrys(findIdByISO2(countryCode))
    GetexChangeRate(findIdByISO2(countryCode), Id2)
  }

  const onSelect1 = (code) => {
    const matchedItem = countries1.find((item) => item.iso2 === code)
    setFlags1(matchedItem)
    setSelect1(code)
    console.log('object', code, matchedItem)
    // setId2(findIdByISO2(code))
    GetexChangeRate(ID, findIdByISO2(code))
  }


  const GetexChangeRate = async (id1, id2) => {
    try {
      // debugger
      const sendData = {
        fromCountryId: id1,
        toCountryId: id2
      }
      const Response = await axios.post(
        CommonConstants.BASE_URL + '/getexchangeratebycountryid',
        sendData
      )
      if (Response.data.status === true) {
        settoCountry(Response.data.data.publishedRate)
        setDefaultExchangeRate(Response.data.data.publishedRate)
        // setreceiveMoney((sendMoney * Response.data.data.publishedRate).toFixed(2));
      } else {
        settoCountry(0)
        // setreceiveMoney((sendMoney * 0).toFixed(2));
      }
    } catch (error) {
      console.log(error)
    }
  }


  const GetAllRecivingCountrys = async (Id) => {
    const getallrecivercountriesbysendercountryid = await axios.post(
      CommonConstants.BASE_URL + '/getallrecivercountriesbysendercountryid',
      {senderCountryId: Id}
    )
    setCountries1(getallrecivercountriesbysendercountryid.data.data)
    setFlags1(getallrecivercountriesbysendercountryid.data.data[0])
    setId2(getallrecivercountriesbysendercountryid.data.data[0].id)
    let rescountries = []
    getallrecivercountriesbysendercountryid.data.data.map((ele) => {
      rescountries.push(ele.iso2)
    })
    console.log(rescountries, 'rescountries')
    setreceiverCountries(rescountries)
    let ID2 = getallrecivercountriesbysendercountryid.data.data[0].id
    setSelect1(rescountries[0])
    GetexChangeRate(Id, ID2)
    // GetActiveDeliveryMethod(ID2);
    // handleGetDeliveryandPayment(sendMoney);
  }

  const GetAllCountrys = async () => {
    const response = await axios.get(
      CommonConstants.BASE_URL + '/getallsendercountries'
    )
    if (response.data.status === true || response.data.status === 'success') {
      setId(response.data.data[0].id)
      setCountries(response.data.data)
      setFlags(response.data.data[0])
      let sencountries = []
      response.data.data.map((ele) => {
        sencountries.push(ele.iso2)
      })
      setsenderCountries(sencountries)
      let Id = response.data.data[0].id

      const getallrecivercountriesbysendercountryid = await axios.post(
        CommonConstants.BASE_URL + '/getallrecivercountriesbysendercountryid',
        {senderCountryId: Id}
      )
      setCountries1(getallrecivercountriesbysendercountryid.data.data)
      setFlags1(getallrecivercountriesbysendercountryid.data.data[0])
      setId2(getallrecivercountriesbysendercountryid.data.data[0].id)
      let rescountries = []
      getallrecivercountriesbysendercountryid.data.data.map((ele) => {
        rescountries.push(ele.iso2)
      })
      setreceiverCountries(rescountries)
      let ID2 = getallrecivercountriesbysendercountryid.data.data[0].id
      GetexChangeRate(Id, ID2)
    }
  }

  const handleAlert = async () => {
    setloadervalue(true)
    const paylaod = {
      'userId': userID,
      'sendingCountryId': flagSelect.id,
      'receivingCountryId': flagSelect1.id,
      'sendingCurrency': flagSelect.currency,
      'receivingCurrency': flagSelect1.currency,
      'liveRate': DefaultExchangeRate,
      'enabled': false
    }
    await axios.post(CommonConstants.BASE_URL + '/saveexchangeratealertsettings', paylaod).then(
      (response) => {
        if (response.data.status == true) {
          getexchangeratealertsettingsbyuser()
        }
      }
    ).catch(error => console.log(error))
    setloadervalue(false)
  }
  const getexchangeratealertsettingsbyuser = async () => {
    setloadervalue(true)
    const fromData = new FormData()
    fromData.append('userId', userID)
    await axios.post(CommonConstants.BASE_URL + '/getexchangeratealertsettingsbyuser', fromData).then((responce) => {
      setAllAlertSetting(responce.data.data)
    }).catch(error => console.log(error))
    setloadervalue(false)
  }

  const handleToggleChange = async (isChecked, id) => {

    const payloadData = {
      'id': id,
      'enabled': isChecked
    }
    await axios.post(CommonConstants.BASE_URL + '/enableexchangeratealert', payloadData).then((row) => {
      if (row.data.status == true) {
        setshowDocumentUplodedPopup(false)
        getexchangeratealertsettingsbyuser()
      }
    }).catch(error => console.log(error))
  }

  const getUsersSetting = async () => {
    setloadervalue(true)
    await axios.post(CommonConstants.BASE_URL + '/getsettingbyuserid', {'userId': userID}).then((response) => {
      const fetchedUserSettings = response.data.data
      // Map the fetched settings to the userSetting state
      setUserSetting({
        'Push notification': fetchedUserSettings.isPushNotification,
        'Email notification': fetchedUserSettings.isEmailNotification,
        'SMS notification': fetchedUserSettings.isSmsNotification,
        'Receive promotional content': fetchedUserSettings.isReceivePromotionalContent,
        'Recipient related notification': fetchedUserSettings.isRecipientRelatedNotification,
        'Exchange Rate Alert': fetchedUserSettings.isExchangeRateAlert
      })

      setAlertNotify(fetchedUserSettings.isExchangeRateAlert)
    }).catch(error => console.log(error))
    setloadervalue(false)
  }

  // const handleChange = (event) => {
  //   let SelectedValue = event.target.value;
  //   let selectedChecked = event.target.checked;
  //   setSeletedValue(event.target.value);
  //   setSelectedChecked(event.target.checked);
  //   console.log(SelectedValue, "SelectedValue", selectedChecked);
  //   if (SelectedValue == 'Push notification') {
  //     setOpenModa1(selectedChecked ? true : false);
  //   } else if (SelectedValue == 'Email notification') {
  //     setOpenModa2(selectedChecked ? true : false);
  //   } else if (SelectedValue == 'SMS notification') {
  //     setOpenModa3(selectedChecked ? true : false);
  //   } else if (SelectedValue == 'Receive promotional content') {
  //     setOpenModa4(selectedChecked ? true : false);
  //   }

  // };
  const handleChange =  (event) => {
    const SelectedValue = event.target.value
    const selectedChecked = event.target.checked

     setUserSetting(prevSettings => ({
      ...prevSettings,
      [SelectedValue]: selectedChecked
    }))
  }

  useEffect(()=>{
    handleSaveSettings()
  },[userSetting])

  useEffect(() => {
    GetAllCountrys()
    if (userID) {
      getexchangeratealertsettingsbyuser()
      getUsersSetting()
    }
  }, [notificationSettings])
  return (
    <>
      {loadervalue == true ? <Loader/> : ''}
      <section className="abtPage settingSection">
        <NavBar></NavBar>
        <Container className="bg-white py-2 px-5 rounded-4 mb-5">
          <div className="main-header py-4">
            <h1 className="purpleText responsiveFontLargeHeading">Settings</h1>
          </div>
          {/* <div className="inner-header">
            <span className="text-black bolder py-3 fs-5">
              Notification Settings
            </span>
          </div> */}
          <div className="filter-row d-flex justify-content-between align-items-center">
            <span className="text-black bolder py-3 fs-5">
              Notification Settings
            </span>

            <div className=" justify-content-end d-flex  responsiveFontLarge">
              {/*<div*/}
              {/*  className="d-block pDiv responsiveFontLarge switchI purpleText bolder text-end w-100 pointer"*/}
              {/*  onClick={handleSaveSettings}*/}
              {/*>*/}
              {/*  Save Settings*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="inner-menus-main">
            <div className="inner-menu py-1 mt-3">
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start my-3"
              >
                <div className="pDiv responsiveFontLarge  text-black  ">
                  Push notification
                </div>
                <div class="switchI ">
                  <input
                    type="checkbox"
                    id="togglePush"
                    value="Push notification"
                    checked={userSetting['Push notification']}
                    onChange={(e) => handleChange(e)}
                  />
                  <label for="togglePush"></label>
                </div>
              </div>
            </div>

            <div className="inner-menu py-1">
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start my-3"
              >
                <div className="pDiv responsiveFontLarge  text-black  ">
                  Email notification
                </div>
                <div class="switchI ">
                  <input type="checkbox" id="toggleEmail"
                         value="Email notification"
                         checked={userSetting['Email notification']}
                         onChange={(e) => handleChange(e)}
                  />
                  <label for="toggleEmail"></label>
                </div>
              </div>
            </div>

            <div className="inner-menu py-1">
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start my-3"
              >
                <div className="pDiv responsiveFontLarge  text-black  ">
                  SMS notification
                </div>
                <div class="switchI ">
                  <input type="checkbox" id="toggleSMS"
                         value="SMS notification"
                         checked={userSetting['SMS notification']}
                         onChange={(e) => handleChange(e)}
                  />
                  <label for="toggleSMS"></label>
                </div>
              </div>
            </div>

            <div className="inner-menu py-1">
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start my-3"
              >
                <div className="pDiv responsiveFontLarge  text-black  ">
                  Receive promotional content
                </div>
                <div class="switchI ">
                  <input type="checkbox" id="toggleReceive"
                         value="Receive promotional content"
                         checked={userSetting['Receive promotional content']}
                         onChange={(e) => handleChange(e)}
                  />
                  <label for="toggleReceive"></label>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="inner-header">
            <span className="text-black bolder py-3 mt-2">
              Visibility settings
            </span>
          </div>

          <div className="inner-menus-main">
            <div className="inner-menu py-1 mt-3">
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start my-3"
              >
                <div className="pDiv responsiveFontLarge  text-black  ">
                  PIN settings to Hide/show transactions and recipients
                </div>
                <div class="pDiv responsiveFontLarge switchI purpleText bolder">
                  Change PIN
                </div>
              </div>
            </div>
          </div> */}

          <div className="inner-header mt-3">
            <span className="text-black bolder py-3 mt-2 fs-5">
              Security settings
            </span>
          </div>

          <div className="inner-menus-main mt-3">
            <div className="inner-menu py-1 mt-3">
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start my-3"
              >
                <div className="pDiv responsiveFontLarge text-black w-100">
                  Login credentials
                </div>
                <div
                  class="d-block pDiv responsiveFontLarge switchI purpleText bolder text-end w-100 pointer"
                  onClick={changePasswordHandle}
                >
                  Change password
                </div>
              </div>
            </div>
          </div>

          {/* <div className="inner-menus-main">
            <div className="inner-menu py-1 mt-3">
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start my-3"
              >
                <div className="pDiv responsiveFontLarge  text-black  ">
                  PIN authentication for sending money.
                </div>
                <div class="switchI ">
                  <input type="checkbox" id="toggleAll4" />
                  <label for="toggleAll4"></label>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="inner-menus-main mt-3">
            <div className="inner-menu py-1 mt-3">
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start my-3"
              >
                <div className="pDiv responsiveFontLarge   purpleText bolder">
                  Change PIN
                </div>
              </div>
            </div>
          </div> */}

          <div className="inner-header mt-3">
            <span className="text-black bolder py-3 fs-5">Alert Settings</span>
          </div>

          <div className="inner-menus-main pb-2">
            <div className="inner-menu py-1 mt-3">
              <div
                id="ManualBtn"
                className="d-flex justify-content-between align-items-start my-3"
              >
                <div className="pDiv responsiveFontLarge  text-black  ">
                  Alert me when current exchange rate reaches estimated exchange
                  rate
                </div>
                <div class="switchI ">
                  <input
                    type="checkbox"
                    id="toggleAlert"
                    value="Exchange Rate Alert"
                    checked={userSetting['Exchange Rate Alert']}
                    onChange={(e) => {
                      handleChange(e)
                      setAlertNotify(!AlertNotify)
                    }}
                  />
                  <label for="toggleAlert"></label>
                </div>
              </div>
            </div>
          </div>

          <div className={`row ${AlertNotify == true ? 'd-block' : 'd-none'}`}>
            <div className="col-lg-12 d-flex justify-content-between ">
              <div className="col-lg-4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <ReactFlagsSelect
                    className="responsiveFontLarge drp11 mr-5 mt-2 ReactFlagZIndex"
                    selected={select}
                    onSelect={onSelect}
                    customLabels={country_list}
                    countries={senderCountries}
                    style={{zIndex: 10}}
                    disabled
                  />
                  <Form.Control
                    type="text"
                    className="responsiveFontLarge countryDrp "
                    placeholder="0"
                    value={temp}
                    onChange={(e) => {
                      const inputValue = e.target.value.replace(/[^0-9]/g, '') // Filter out non-numeric characters
                      setTemp(inputValue)
                      // setsendMoney(inputValue);
                    }}
                    disabled
                    // onFocus={(e) => setFocus(false)}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-1 text-center align-items-center d-flex justify-content-center">
                <div>
                  <i className="fa fa-equals mb-2 text-center"/>
                </div>
              </div>
              <div className="col-lg-4">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <ReactFlagsSelect
                    className="drp11 mr-5 mt-2"
                    selected={select1}
                    onSelect={onSelect1}
                    customLabels={country_list}
                    countries={receiverCountries}
                    style={{zIndex: 1}} // Set a higher z-index for the first dropdown
                  />
                  <Form.Control
                    type="number" // Use the number type to enforce numeric keyboard
                    className="countryDrp"
                    placeholder="Enter value"
                    defaultValue={DefaultExchangeRate}
                    // value={focus ? temp : ConvertNepaltoaus(temp) === 'NaN' ? 0 : ConvertNepaltoaus(temp)}
                    onChange={(e) => {
                      const inputValue = e.target.value
                      setDefaultExchangeRate(inputValue)
                    }}
                    onKeyPress={(e) => {
                      const keyCode = e.which || e.keyCode
                      const keyValue = String.fromCharCode(keyCode)
                      if (!/[\d.]/.test(keyValue)) {
                        e.preventDefault() // Prevent non-numeric characters
                      }
                    }}
                    // onFocus={(e) => setFocus(true)}
                  />
                </Form.Group>
              </div>

              <div className="col-lg-2">
                <Button className="btn py-3 btn-default purpleBackground rounded-5 text-white bolder m-0"
                        onClick={handleAlert}>
                  Add Alert
                </Button>
              </div>
            </div>
            <div
              className="pDiv responsiveFontLarge text-black pb-5 pt-3 "
              onClick={(e) => setshowDocumentUplodedPopup(true)}
            >
              <span className="pointer text-black">
                <u>Show Alerts</u>
              </span>
            </div>
          </div>
        </Container>
        <Footer></Footer>

        <Modal
          centered
          show={showDocumentUplodedPopup}
          onHide={(e) => setshowDocumentUplodedPopup(false)}
          dialogClassName="modal-warning"
        >
          <Modal.Header className="border-bottom  justify-content-center">
            <Modal.Title className="d-flex align-items-center">
              <span className="text-black my-3 ">
                {' '}
                &nbsp; &nbsp; Exchange Rate Alerts
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="exchangePopup">
            <Row>
              {allAlertSetting && allAlertSetting.map((row) => (
                <div key={row.id} className="border rounded-2 p-3 my-2">
                  <div className="mainRow d-flex justify-content-between align-items-center">
                    <div className="childOne d-flex justify-content-between align-items-center">
                      <img src={nepalFlag} height={50} width={50}/>
                      <div className="d-flex flex-column">
                        <div className="main1 d-flex">
                          <div className="medium mx-3">{row.sendingCurrency}</div>
                          <i className="fa fa-arrow-right"/>
                          <div className="medium mx-3">{row.receivingCurrency}</div>
                        </div>
                        <div className="main2 d-flex">
                          <div className="bolder mx-3">1 AUD</div>
                          <div className="bolder">=</div>
                          <div className="bolder mx-3">{row.liveRate} {row.receivingCurrency}</div>
                        </div>
                      </div>
                    </div>
                    <div className="childTwo">
                      <div className="switchI">
                        <input
                          type="checkbox"
                          id={`Alrtnotify${row.id}`}
                          checked={row.enabled}
                          onChange={(e) => {
                            handleToggleChange(e.target.checked, row.id)
                          }}
                        />
                        <label htmlFor={`Alrtnotify${row.id}`}></label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Row>
          </Modal.Body>
        </Modal>
      </section>
    </>
  )
}
