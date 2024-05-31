import React, { useState, useEffect } from "react";

import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import { CommonConstants } from "../../../../Constants/common.constants";
// const validator = require("../../../../assets/js/validator")


export default function CreateTypeOfID(props) {

  const navigate = useNavigate()
  const [Country, setCountry] = useState([])
  const [name, setName] = useState();
  const [UpdateRadioChecked, setUpdateRadioChecked] = useState(true)
  const [error, setError] = useState(false);
  const [enabled, setenabled] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();
  const [id, setId] = useState(props.location.state);
  const [UpdatePaymenData, setUpdatePaymenData] = useState({
    id: "",
    name: "",
    countryId: [],
    enabled: ""
  });
  const [menuOpen, setMenuOpen] = useState(undefined);
  const [showCountry, setShowCountry] = useState([]);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isBusinessChecked, setIsBusinessChecked] = useState(false);


  const GetAllCountrys = async (values) => {
    try {
      const response = await axios.get(CommonConstants.BASE_URL + "/getcountries");
      // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {
        setCountry(response.data.data)
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  const isActiveMark = (e) => {
    const value = e.target.checked;
    setenabled(value);
  };

  const getselectedCountry = (e) => {

    const { name, value } = e.target
    setSelectedCountry(parseInt(value))
  };

  const getPaymentDataforId = async () => {
    if (id) {
      try {
        const PaymentId = {
          id: id
        }
        const response = await axios.post(CommonConstants.BASE_URL + "/getidtypebyid", PaymentId);
        if (response.data.status === true) {
          setUpdatePaymenData(response.data.data);
          setenabled(response.data.data.enabled);
          setIsBusinessChecked(response.data.data.isBusiness);
          setIsIdChecked(response.data.data.isId);
        }
        else if (response.data.status === "error") {
          console.log(response.data.message)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  };

  const handleIdCheckboxChange = () => {
    setIsIdChecked(true);
    setIsBusinessChecked(false);
  };

  const handleBusinessCheckboxChange = () => {
    setIsIdChecked(false);
    setIsBusinessChecked(true);
  };
  const handleCancel = () => {
    navigate("/typeofid")
  };

  const CreatePaymentMethod = async () => {
    if (id) {
      const FormData = require('form-data');
      let data = new FormData();

      const dataValue = {
        id: id,
        name: UpdatePaymenData.name,
        countryId: [UpdatePaymenData.countryId],
        enabled: enabled,
        isStatic: false,
        isId: isIdChecked,
        isBusiness: isBusinessChecked,
        isAdditional: false
      }
      axios.post(CommonConstants.BASE_URL + '/saveidtypes', dataValue, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.data.statuscode == 200) {
            navigate("/typeofid")
          }
        })
        .catch(error => {
          console.error(error);
        });
    } else {

      if (UpdatePaymenData.name == undefined || UpdatePaymenData.name == "") {
        setError(true);
      } else if (UpdatePaymenData.countryId.length < 0) {
        setError(true);
      }
      else {

        const dataValue = {
          name: UpdatePaymenData.name,
          countryId: UpdatePaymenData.countryId,
          enabled: enabled,
          isStatic: false,
          isId: isIdChecked,
          isBusiness: isBusinessChecked,
          isAdditional: false
        }
        axios.post(CommonConstants.BASE_URL + '/saveidtypes', dataValue, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.data.statuscode == 200) {
              navigate("/typeofid")
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }

  };

  const ChangeRadioEnableorDisable = (e) => {
    const { name, value } = e.target
    setUpdateRadioChecked(value == "enable" ? true : false)
    setUpdatePaymenData({ ...UpdatePaymenData, [name]: value == "enable" ? true : false })
  };

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    if (name == "name") {
      // const onlyText = value.replace(/[^A-Za-z]+/g, '');
      const alphabeticValue = e.target.value.replace(/[^A-Za-z\s]/g, "");
      setUpdatePaymenData({ ...UpdatePaymenData, [name]: alphabeticValue });
    } else {
      setUpdatePaymenData({ ...UpdatePaymenData, [name]: value });
    }
  };

  const handleOptionChange = (options) => {
    if (Array.isArray(options)) {
      setUpdatePaymenData({ ...UpdatePaymenData, "countryId": options.map((opt) => opt.value) })
    }

  };

  const onMenuOpen = () => {
    if (menuOpen !== undefined) setMenuOpen(undefined);
    GetAllCountry()
  };

  const GetAllCountry = async (values) => {
    try {

      const response = await axios.get(CommonConstants.BASE_URL + "/getallcountries");
      if (response.data.status === true) {
        const optionsForCountry = response.data.data.map(country => ({
          value: country.id,
          label: country.name,
        }));
        setShowCountry(optionsForCountry)
      }
      else if (response.data.status === "error") {
        console.log(response.data.message)
      }
    }

    catch (err) {
      console.log(err)
    }
  };


  useEffect(() => {
    GetAllCountrys();
    getPaymentDataforId();
  }, [name]);

  return (
    <>
      <section onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <Container>
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-white rounded-2">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Type of ID
              </h3>

              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Container className="">
                  <Form id="paymentCheck">
                    <Row className="mb-4">
                      <Form.Group as={Col} controlId="formGridState">

                        <Form.Label>Country</Form.Label>
                        {id ?
                          <Form.Select value={UpdatePaymenData && UpdatePaymenData.countryId ? [UpdatePaymenData.countryId] : selectedCountry !== undefined ? [selectedCountry] : "14"} name="countryId" disabled={id} className="required" id="{id}">
                            <option value="">Select Country</option>
                            {Country &&
                              Country.map((countryname, index) => {
                                return (
                                  <option key={index} value={countryname.id}>{countryname.emoji}&nbsp;&nbsp;{countryname.name}</option>
                                );
                              })}
                          </Form.Select>
                          :
                          <Select
                            id="countryId"
                            isMulti
                            menuIsOpen={menuOpen}
                            name="countryId"
                            options={showCountry}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            closeMenuOnSelect={false}
                            onChange={handleOptionChange}
                            onMenuOpen={onMenuOpen}
                          />}
                        {error && UpdatePaymenData.countryId.length == 0 && <small className="responsiveFontLarge text-danger error_message ms-2 error checkboxError" >Please select country</small>}
                      </Form.Group>
                    </Row>

                    <Row className="mb-4 d-flex">
                      <Form.Group as={Col} className="" controlId="formGridCity" >
                        <Form.Label>Type of Id</Form.Label>
                        <div className={"d-flex methodName1"}>
                          <Col className="col-lg-12 px-0">
                            <Form.Control id="name" name="name" type="text" placeholder="" value={UpdatePaymenData?.name} onChange={handleChangeData} className="required" />
                            {/* {error && !name && <small className="responsiveFontLarge  text-danger" >Please Enter Type of Id</small>} */}
                            {error && !UpdatePaymenData.name && <small className="responsiveFontLarge  text-danger error_message ms-2 error checkboxError" >Please Enter Type of Id</small>}
                          </Col>
                        </div>
                      </Form.Group>
                    </Row>
                    <Row className="mb-4">
                      <div className="mt-3 d-flex">
                        <input
                          type="checkbox"
                          id="vehicle1"
                          name="isActive"
                          value="true"
                          className="main-radio requiredCheckBox"
                          onChange={handleIdCheckboxChange}
                          checked={isIdChecked}
                        />
                        <label for="vehicle1" className="ms-2">
                          ID Related
                        </label>
                      </div>
                    </Row>

                    <Row className="mb-4">
                      <div className="mt-3 d-flex">
                        <input
                          type="checkbox"
                          id="vehicle1"
                          name="isActive"
                          value="true"
                          className="main-radio requiredCheckBox"
                          onChange={handleBusinessCheckboxChange}
                          checked={isBusinessChecked}
                        />
                        <label for="vehicle1" className="ms-2">
                          Business Related
                        </label>
                      </div>
                    </Row>

                    <Row className="mb-4">
                      <div className="mt-3 d-flex">
                        <input
                          type="checkbox"
                          id="vehicle1"
                          name="isActive"
                          value="true"
                          className="main-radio requiredCheckBox"
                          onChange={isActiveMark}
                          checked={enabled}
                        />
                        <label for="vehicle1" className="ms-2">
                          Active
                        </label>
                      </div>
                      {/* {error && <small className="responsiveFontLarge   text-danger error_message ms-2 error checkboxError" >Please select radio button</small>} */}
                    </Row>

                    <div className="row d-flex m-auto pt-3 ">

                      <a
                        className="purpleBackground btn btn-default text-white bolder d-block w-auto"
                        onClick={CreatePaymentMethod}
                      > {id ? "Update" : "Create"}
                      </a>

                      &nbsp;&nbsp;
                      <a
                        className="btn btn-default ms-3 text-black bolder border 2 w-auto"
                        onClick={handleCancel}
                      > Cancel
                      </a>

                    </div>
                  </Form>
                </Container>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

