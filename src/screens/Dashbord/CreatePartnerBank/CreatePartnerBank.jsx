import React, { useState, useEffect, useRef } from "react";

import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CommonConstants } from '../../../Constants/common.constants';
import Loader from "../../Loader/Loader";

export default function CreatePartnerBank(props) {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [loadervalue, setloadervalue] = useState(false);
  const [key, setKey] = useState("pay1");
  const [countries, setcountries] = useState([]);
  const [id, setId] = useState(props.location.state);
  const [selectedCountry, setSelectedCountry] = useState();
  const [error, setError] = useState(false);
  const [logo, setlogo] = useState(null);
  const [message, setMessage] = useState(false);
  const [partnerBankData, setPartnerBankData] = useState({
    id: "",
    name: "",
    address: "",
    city: "",
    countryId: 14,
    enabled: false,
    apiSecret: "",
    apiIp: "",
    maxProcessableAmount: "",
    minTransaction: "",
    maxTransaction: "",
    openingBalance: "",
    hasIssue: false,
    commissionWallet: "",
    commissionCash: "",
    commissionBank: ""
  });

  const ChangeRadioEnableorDisable = (e) => {
    const checked = e.target.checked;
    const name = e.target.name;
    // setUpdateRadioChecked(value == "true" ? true : false)
    setPartnerBankData({ ...partnerBankData, [name]: checked })
  }

  const hasIssueCheck = (e) => {
    const checked = e.target.checked;
    const name = e.target.name;
    setPartnerBankData({ ...partnerBankData, [name]: checked })

  }
  const handleFileInputChange = (e) => {
    setlogo(e.target.files[0]);
  }
  const createPartnerBank = () => {
    // if (validator.error_input_validation("partnerBankCheck")) {
      if (id) {

        const FormData = require('form-data');
        let data = new FormData();
        data.append('data',
          `{
      "id":${id},
      "name":"${partnerBankData.name}",
      "address":"${partnerBankData.address}",
      "city":"${partnerBankData.city}",
      "countryId":${partnerBankData.countryId},
      "apiSecret":"${partnerBankData.apiSecret}",
      "apiIp":"${partnerBankData.apiIp}",
      "maxProcessableAmount":${partnerBankData.maxProcessableAmount},
      "openingBalance":${partnerBankData.openingBalance},
      "minTransaction":${partnerBankData.minTransaction},
      "maxTransaction":${partnerBankData.maxTransaction},
      "commissionBank":${partnerBankData.commissionBank},
      "commissionCash":${partnerBankData.commissionCash},
      "commissionWallet":${partnerBankData.commissionWallet},
      "enabled":${partnerBankData.enabled},
      "hasIssue":${partnerBankData.hasIssue}
    }`);
        data.append('logo', logo);

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: CommonConstants.BASE_URL + '/updatepartnerbank',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: data
        };

        axios.request(config)
          .then((response) => {
            navigate("/partner-bank")
            setloadervalue(false);
          })
          .catch((error) => {
            console.log(error);
            setloadervalue(false);
          });

      } else {
        if (logo == null || logo == 'null') {
          setError(true);
        } else {
          const formData = new FormData();

          formData.append('data', JSON.stringify({
            "name": partnerBankData.name,
            "address": partnerBankData.address,
            "city": partnerBankData.city,
            "countryId": partnerBankData.countryId,
            "enabled": partnerBankData.enabled,
            "apiSecret": "",
            "apiIp": "",
            "maxProcessableAmount": parseInt(partnerBankData.maxProcessableAmount),
            "openingBalance": parseInt(partnerBankData.openingBalance),
            "minTransaction": parseInt(partnerBankData.minTransaction),
            "maxTransaction": parseInt(partnerBankData.maxTransaction),
            "commissionBank": parseFloat(partnerBankData.commissionBank),
            "commissionCash": parseFloat(partnerBankData.commissionCash),
            "commissionWallet": parseFloat(partnerBankData.commissionWallet),
            "hasIssue": partnerBankData.hasIssue
          }));
          formData.append('logo', logo);
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: CommonConstants.BASE_URL + '/addpartnerbank',
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData
          };
          axios.request(config)
            .then((response) => {
              if (response.data.status == true) {
                navigate("/partner-bank")
              } else {
                navigate("/create-partner-bank")
              }
            })
            .catch((error) => {
              setloadervalue(false);
            });
        }

      }
    // }

  }

  const getDataForId = async () => {
    if (id) {
      try {

        const partnerBankId = {
          id: id
        }

        const response = await axios.post(CommonConstants.BASE_URL + "/getpartnerbanksbyid", partnerBankId);
        if (response.data.status === true) {
          setPartnerBankData(response.data.data)
        }
        else if (response.data.status === "error") {
          console.log(response.data.message)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  const handleChangeData = (e) => {
    const { name, value } = e.target;

    if (["minTransaction", "maxTransaction","maxProcessableAmount","openingBalance"].includes(name)) {
      // Remove non-numeric characters
      const numericValue = value.replace(/\D/g, "");
      setPartnerBankData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
      return;
    }



    if (["commissionBank", "commissionWallet", "commissionCash"].includes(name)) {
      // Remove non-numeric characters
      const selectedValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except '.'
      setPartnerBankData((prevData) => ({
        ...prevData,
        [name]: selectedValue,
      }));
      return;
    }
    let sanitizedValue = value;
    // if (name === 'openingBalance' || name === 'maxProcessableAmount') {
    //   const numericValue = sanitizedValue.replace(/[^0-9.]/g, '');
    //   const openingBalance = name === 'openingBalance' ? numericValue : partnerBankData.openingBalance;
    //   const reserveBalance = name === 'maxProcessableAmount' ? numericValue : partnerBankData.maxProcessableAmount;
    //   if (parseFloat(openingBalance) <= parseFloat(reserveBalance)) {
    //     setMessage(true);
    //   } else {
    //     setMessage(false);
    //   }
    //   if (sanitizedValue.length > 15) {
    //     sanitizedValue = sanitizedValue.slice(0, 15);
    //     setPartnerBankData({ ...partnerBankData, [name]: sanitizedValue });
    //   }
    // }
    setPartnerBankData({ ...partnerBankData, [name]: value });
  };
  const getAllCountrys = async (values) => {
    setloadervalue(true);
    try {
      const response = await axios.get(CommonConstants.BASE_URL + "/getallcountries");
      if (response.data.status === true) {
        setcountries(response.data.data)
      }
      else if (response.data.status === "error") {
      }
      setloadervalue(false);
    }


    catch (err) {
      // console.log(err)
      setloadervalue(false);
    }
  };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const getselectedCountry = (e) => {
    const { name, value } = e.target
    setSelectedCountry(parseInt(value))
    setPartnerBankData({ ...partnerBankData, [name]: parseInt(value) })
  }
  useEffect(() => {
    getAllCountrys();
    getDataForId();
  }, [])

  const redirectPartnerBank = () => {
    navigate("/partner-bank")
  }

  return (
    <>
      <section onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <Container>
          <Row>
            {loadervalue == true ? <Loader /> : ""}
            <Col className="col-lg-12">
              <div className="mainBoxService mt-5">
                <div className="serviceHeader bg-white text-white rounded-2">
                  <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                    Partner Bank
                  </h3>

                  <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                    <Container className="">
                      <Form id="partnerBankCheck">
                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label >Country</Form.Label>
                            <Form.Select id="countryId" name="countryId" value={partnerBankData ? partnerBankData.countryId : selectedCountry !== undefined ? selectedCountry : "14"} onChange={getselectedCountry}>
                              <option>Select Country</option>
                              {countries &&
                                countries.map((countryname, index) => {

                                  return (
                                    <option value={countryname.id}>{countryname.emoji}&nbsp;&nbsp;{countryname.name}</option>
                                  );
                                })}
                            </Form.Select>
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please select file</small>
                          </Form.Group>
                        </Row>
                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control id="name" name="name" value={partnerBankData?.name} onChange={handleChangeData} className="required" />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter Bank Name</small>
                          </Form.Group>
                        </Row>
                        {(partnerBankData.logo || logo) && <img src={logo ? URL.createObjectURL(logo) : partnerBankData.logo} alt="" className="paymentImage mb-3" />}
                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity" className="border-0">
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <label style={{ marginBottom: '0.5rem' }}>Logo</label>
                              <Form.Control
                                type="file"
                                name="logo"
                                accept="image/*"
                                onChange={handleFileInputChange}
                                className="rounded-0 border-0"
                              />
                            </div>
                            {error && (
                              <small className="text-danger error_message error_message_number ms-2">
                                Please Select Image
                              </small>
                            )}
                          </Form.Group>
                        </Row>

                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Opening Balance</Form.Label>
                            <Form.Control
                              type="text"
                              id="openingBalance"
                              name="openingBalance"
                              value={partnerBankData.openingBalance}
                              onChange={handleChangeData}
                              className="required"
                              disabled={id ? true : false}
                            />
                            <small className="responsiveFontLarge d-none text-danger error_message ms-2 error notentered">
                              Please enter valid opening Balance. Amount
                            </small>
                            {message &&
                              <small className="responsiveFontLarge text-danger error_message ms-2 error notentered">
                                Opening balance should be grater than Reserve balance
                              </small>
                            }

                          </Form.Group>
                        </Row>

                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Reserve Balance</Form.Label>
                            <Form.Control
                              type="text"
                              id="maxProcessableAmount"
                              name="maxProcessableAmount"
                              value={partnerBankData.maxProcessableAmount}
                              onChange={handleChangeData}
                              className="required"
                            />
                            <small className="responsiveFontLarge d-none text-danger error_message ms-2 error notentered">
                              Please enter valid Reserve Balance Amount
                            </small>
                          </Form.Group>
                        </Row>
                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Min Transaction Amount</Form.Label>
                            <Form.Control type="text" id="minTransaction" name="minTransaction" value={partnerBankData?.minTransaction} onChange={handleChangeData} className="required" />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter valid Min Transaction Amount</small>
                          </Form.Group>
                        </Row>

                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Max Transaction Amount</Form.Label>
                            <Form.Control type="text" id="maxTransaction" name="maxTransaction" value={partnerBankData?.maxTransaction} onChange={handleChangeData} className="required" />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter valid Max Transaction Amount</small>
                          </Form.Group>
                        </Row>

                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Commission For Bank Deposite %</Form.Label>
                            <Form.Control type="text" id="commissionBank" name="commissionBank" value={partnerBankData?.commissionBank} onChange={handleChangeData} className="required" />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter Commission For Bank Deposite</small>
                          </Form.Group>
                        </Row>

                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Commission For Wallet Deposite %</Form.Label>
                            <Form.Control type="text" id="commissionWallet" name="commissionWallet" value={partnerBankData?.commissionWallet} onChange={handleChangeData} className="required" />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter Commission For Wallet Deposite</small>
                          </Form.Group>
                        </Row>

                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Commission For Cash Pickup %</Form.Label>
                            <Form.Control type="text" id="commissionCash" name="commissionCash" value={partnerBankData?.commissionCash} onChange={handleChangeData} className="required" />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter Commission For  Cash Pickup</small>
                          </Form.Group>
                        </Row>
                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" id="address" name="address" value={partnerBankData?.address} onChange={handleChangeData} className="required" />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter Address</small>
                          </Form.Group>
                        </Row>

                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control id="city" name="city" value={partnerBankData?.city} onChange={handleChangeData} className="required" />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter City</small>
                          </Form.Group>
                        </Row>

                        <Row className="mt-3">
                          <div className="d-flex">
                            <input
                              type="checkbox"
                              id="hasissue"
                              name="hasIssue"
                              className="main-radio"
                              checked={partnerBankData.hasIssue}
                              onChange={hasIssueCheck}
                            />
                            <label for="vehicle1" className="ms-2">
                              Has Issue ?
                            </label>
                          </div>
                        </Row>

                        <Row className="mt-3">
                          <div className="d-flex">
                            <input
                              type="checkbox"
                              id="enabled"
                              name="enabled"
                              className="main-radio"
                              checked={partnerBankData.enabled}
                              onChange={ChangeRadioEnableorDisable}
                            />
                            <label for="vehicle1" className="ms-2">
                              Enabled
                            </label>
                          </div>
                        </Row>

                        <Row className="d-none mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>API Secret Key</Form.Label>
                            <Form.Control id="apiSecret" name="apiSecret" value={partnerBankData?.apiSecret} onChange={handleChangeData} className="required" />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error checkboxError" >Please select API Secret Key</small>
                          </Form.Group>
                        </Row>

                        <Row className="d-none mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>API IP</Form.Label>
                            <Form.Control id="apiIp" name="apiIp" value={partnerBankData?.apiIp} onChange={handleChangeData} className="required" />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error checkboxError" >Please select API IP</small>
                          </Form.Group>
                        </Row>

                        <div className="row d-flex m-auto pt-3 border-top">
                          <a
                            className="purpleBackground btn btn-default text-white bolder d-block w-auto"
                            onClick={createPartnerBank}
                          >{id ? "Update" : "Create"}
                          </a>
                          &nbsp;&nbsp;

                          <a
                            className="btn btn-default ms-3 text-black bolder border 2 w-auto"
                            onClick={redirectPartnerBank}
                          >
                            {" "}
                            Cancel
                          </a>
                        </div>
                      </Form>
                    </Container>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
