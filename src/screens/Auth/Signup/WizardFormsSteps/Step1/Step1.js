import React, { useContext, useEffect, useState, useCallback } from 'react'
import './Step1.scss'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import '../../../../Helpers/CountryDropdown/flags.css'
import ReactFlagsSelect, { Af } from 'react-flags-select'
import ReCAPTCHA from 'react-google-recaptcha'
import userContext from '../../Signupdata/Usecontext'
import axios from 'axios'
import { CommonConstants } from '../../../../../Constants/common.constants'
import UnicodeConverter from '../../../../../Helpers/UnicodeConverter/UnicodeConverter'
import Select from 'react-select'
import { useLocation } from 'react-router-dom'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import { Modal } from 'react-bootstrap'
import warning from '../../../../../assets/images/warning.svg'

// import Signup from "../../Signup.scss";

export default function Step1 ({
                                 props,
                                 activestepkey,
                                 Name,
                                 xyz,
                                 Validationnext1,
                                 handleValidateButton,
                                 handleid,
                                 ReCaptchaValue,
                                 handleFirststepp,
                                 countryvalidation,
                                 countryvalidationerror,
                                 countryvalidationerrorremove,
                                 CountryID,
                                 UpdateStep,
                                 GoNextStep,
                                 GoNextStepBA,
                                 RefralCodeId,
                                 StepBlank
                               }) {
  const rushabh = async (e) => {
    let drop = document.getElementById('select1').value
    xyz(drop)
  }

  const [firststepvalue, setFirststepvalue] = useState({
    RoleId: 'Individual',
    Referal: ''
  })

  const [CountryDetails, setCountryDetails] = useState({
    CountryId: '11',
    CountryPhoneCode: '61',
    CountryName: 'Australia',
    Countryiso3: 'AUS'
  })

  const [ReCaptchaValuee, setReCaptchaValuee] = useState(false)
  const [countrySelected, setcountrySelected] = useState('0')
  const [AutoRefralCode, setAutoRefralCode] = useState('')

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const codeParam = queryParams.get('code')
  // const decodedVerificationCode = codeParam == null ? "" : codeParam?.replace(/\s/g, '+');


  useEffect(() => {
    setData(firststepvalue)
    setCountryData(CountryDetails)
    rushabh()
    hFormID()
  }, [handleid])

  useEffect(() => {
    GetAllCountrys()
  }, [])

  useEffect(() => {
    if (codeParam != null) {
      handleAutoFillRefral()
    }
  }, [])

  useEffect(() => {
    RefralCodeId(AutoRefralCode)
    if (UpdateStep == 'IndividualFirst') {
      if (firststepvalue.Referal != '') {
        handleAutoGetRefralCode()
      } else {
        GoNextStep()
      }
    } else if (UpdateStep == 'BusinessOrAgentFirst') {
      if (firststepvalue.Referal != '') {
        handleAutoGetRefralCode()
      } else {
        GoNextStepBA()
      }
    }
  }, [UpdateStep])

  const {setData} = useContext(userContext)
  const {setCountryData} = useContext(userContext)

  const handleDataStep1 = (e) => {
    const {name, value} = e.target
    setFirststepvalue({...firststepvalue, [name]: value})
  }
  const [VerifyRefralPOPUP, setVerifyRefralPOPUP] = useState(false)
  const [RefralVerify, setRefralVerify] = useState(false)

  const handleAutoFillRefral = () => {
    setFirststepvalue({...firststepvalue, Referal: codeParam?.replace(/\s/g, '+')})
    setAutoRefralCode(codeParam?.replace(/\s/g, '+'))
  }

  const handleCleanRefral = () => {
    setFirststepvalue({...firststepvalue, Referal: ''})
    setAutoRefralCode('')
    setVerifyRefralPOPUP(false)
    if (firststepvalue.RoleId === 'Individual') {
      GoNextStep()
    } else {
      GoNextStepBA()
    }
  }

  const handleAutoGetRefralCode = (e) => {
    const formData = new FormData()
    formData.append('code', firststepvalue?.Referal)
    formData.append('countryId', CountryDetails?.CountryId)
    const config = {
      method: 'POST',
      url: CommonConstants.BASE_URL + '/checkreferralcodeexistornot',
      headers: {'Content-Type': 'multipart/form-data'},
      data: formData
    }

    axios(config).then((Res) => {
      if (Res.data.status === true) {
        if (firststepvalue.RoleId === 'Individual') {
          GoNextStep()
        } else {
          GoNextStepBA()
        }
      } else {
        setVerifyRefralPOPUP(true)
        StepBlank('')
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const [image, setimage] = useState('')

  const CountryDataStep1 = (e) => {
    setcountrySelected(e)
    setimage(e.iso2)
    countryvalidation(1)
    countryvalidationerrorremove()
    let arr = e?.value.split(' ')
    CountryID(arr[0])
    setCountryDetails({
      ...CountryDetails,
      CountryId: arr[0],
      CountryPhoneCode: arr[1],
      CountryName: arr[2],
      Countryiso3: arr[3]
    })
  }

  const [isSearchable, setIsSearchable] = useState(false)
  const [Country, setCountry] = useState([])
  const GetAllCountrys = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + '/getallcountries'
      )
      if (response.data.status === true) {
        const optionsForCountry = response.data.data.map((countryname) => ({
          value:
            countryname.id +
            ' ' +
            countryname.phoneCode +
            ' ' +
            countryname.name +
            ' ' +
            countryname.iso3,
          label: countryname.name,//countryname.emoji + " " +countryname.name,
          image: `https://flagcdn.com/16x12/${countryname.iso2.toLowerCase()}.png`,//countryname.iso2.toUpperCase()
          iso2: countryname.iso2
        }))
        setCountry(optionsForCountry)
        // console.log(optionsForCountry,"optionsForCountry")
        if (response.data.data.length >= 5) {
          setIsSearchable(true)
        } else {
          setIsSearchable(false)
        }
      } else if (response.data.status === false) {
      }
    } catch (err) {
    }
  }

  const hFormID = () => {
    handleid('Signup_Step1')
  }

  const [selectedValue, setSelectedValue] = useState('Individual')

  const handleSelectRoleIdChange = (event) => {
    // console.log(document.getElementById('country').value)
    setSelectedValue(event.target.value)
    rushabh(event)
    handleDataStep1(event)
  }

  const onChange = (value) => {
    setReCaptchaValuee(true)
    ReCaptchaValue(true)
  }

  const CustomOption = ({innerProps, label, data}) => (
    <div {...innerProps} style={{paddingLeft: '10px', paddingBottom: '8px', paddingTop: '8px'}}>
      <img src={data.image} alt={label} style={{width: '20px', marginRight: '5px'}}/>
      {label}
    </div>
  )


//set default country to australia
  useEffect(() => {
    CountryDataStep1({
        value: '14 61 Australia AUS',
        label: 'Australia',
        image: 'https://flagcdn.com/16x12/au.png',
        iso2: 'AU'
      }
    )
  }, [])

  return (
    <>
      <section>
        <div className="bgPurple text-white text-center bolder my-4 py-3 responsiveFontLarge">
          Welcome to LegalRemit
        </div>

        <Container fluid>
          <Row>
            <Col className="col-lg-12 p-0">
              <div className="text-center">
                <label className="text-center text-black mb-2 responsiveFontLarge">
                  Registration Details
                </label>
              </div>
              <Form className="mt-3 pe-4 ps-4" id="Signup_Step1">
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="left-inner-addon input-container required "
                    controlId="formGridEmail1"
                  >
                    {image == '' ?
                      <div>
                        <i className="purpleText mainStep3	fa fa-flag svgNationality"></i>
                      </div>
                      : ''}
                    {image != '' ?
                      <div className="Flagimgset">
                        <img src={`https://flagcdn.com/40x30/${image.toLowerCase()}.png`} alt={image}
                             style={{width: '20px'}}/>
                      </div>
                      :
                      ''
                    }
                    <Select
                      // name="bankId"
                      id="country"
                      options={Country}
                      className="responsiveFontLarge SelectValueSelect nationality SelectValueSelect1 SelectHoverLabel required pointer"
                      value={countrySelected}
                      closeMenuOnSelect={true}
                      isSearchable={isSearchable}
                      onChange={CountryDataStep1}
                      components={{Option: CustomOption}}
                    />
                    <label
                      htmlFor="name"
                      className="form-label1 "
                    >
                      Select Country
                    </label>
                    <small
                      className={`responsiveFontLarge responsiveFontLarge ${countryvalidationerror == 1 ? 'd-block' : 'd-none'} text-danger ms-2 `}>
                      Please select the country
                    </small>
                  </Form.Group>
                </Row>


                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="left-inner-addon input-container"
                  >
                    <i className="purpleText main fa fa-user "></i>
                    <Form.Select
                      onChange={handleSelectRoleIdChange}
                      className="responsiveFontLarge purpleBorder form-input"
                      value={selectedValue}
                      id="select1"
                      name="RoleId"
                    >
                      <option value="Individual">Individual</option>
                      <option value="Business">Business</option>
                      {/*<option value="Agent">Agent</option>*/}
                    </Form.Select>
                    <label htmlFor="name" className="form-label1">
                      Select User Type
                    </label>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    className="left-inner-addon input-container required"
                  >
                    <i className="purpleText main fa fa-ticket "></i>
                    <Form.Control
                      type="text"
                      required
                      disabled={AutoRefralCode === '' ? false : true}
                      placeholder=""
                      value={firststepvalue.Referal}
                      name="Referal"
                      className="form-input formControlStep2"
                      onChange={(e) => {
                        handleDataStep1(e)
                      }}
                    />
                    <label htmlFor="name" className="form-label1">
                      Referral link / Promocode
                    </label>
                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                      Please Enter Valid Referral link/Promocode
                    </small>
                  </Form.Group>
                </Row>
                <Row className="justify-content-center justify-items-center d-flex text-center">
                  <div className="d-flex justify-content-center m-4">
                    <ReCAPTCHA
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                      onChange={onChange}
                      className={`${ReCaptchaValuee == false
                        ? handleFirststepp == true
                          ? 'recaptchaalert'
                          : ''
                        : 'border-none'
                      }`}
                    />
                  </div>
                </Row>
                <Row>
                  <p className="responsiveFontLarge text-center terms">
                    This site is protected by reCAPTCHA and the Google{' '}
                    <a className="text-underline text-blue">Privacy Policy</a>{' '}
                    and{' '}
                    <a className="text-underline text-blue">Terms of Service</a>{' '}
                    apply. By clicking on next, you agree with our{' '}
                    <a className="text-underline text-blue">
                      terms and conditions
                    </a>{' '}
                    and{' '}
                    <a className="text-underline text-blue">privacy policy</a>.
                  </p>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>


        <Modal show={VerifyRefralPOPUP} onHide={() => {
          setVerifyRefralPOPUP(false)
        }} centered>
          <Modal.Header closeButton className="border-bottom">
            <Modal.Title className="purpleText"><img src={warning} alt=""/><span
              className="text-black mt-2">Alert</span></Modal.Title>
          </Modal.Header>
          <Modal.Body className="mt-3">
            <span>
              Referral Code you entered is invalid. Please enter a valid referral link or Code to get a reward. If you continue, the referral reward won’t be redeemed. Are you sure you want to continue without Referral Code?
            </span>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-around">
            <Button
              className="bg-transparent text-black purpleBorder col px-3"
              onClick={() => {
                setVerifyRefralPOPUP(false)
              }}
            >
              NO
            </Button>
            <Button
              className="purpleBackground border-0 col"
              onClick={() => {
                handleCleanRefral()
              }}
            >
              YES
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  )
}
