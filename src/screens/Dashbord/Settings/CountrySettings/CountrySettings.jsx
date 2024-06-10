import React, { useState, useEffect, useImperativeHandle } from "react";
import './CountrySettings.css';

import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";

import Select from "react-select";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import axios from 'axios'
import { CommonConstants } from "../../../../Constants/common.constants"
import { useNavigate } from "react-router-dom";

export default function CountrySettings(props) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValues2, setSelectedValues2] = useState([]);
  const [validationError1, setValidationError1] = useState(false);
  const [validationError2, setValidationError2] = useState(false);
  const [key, setKey] = useState("pay1");
  const [key1, setKey1] = useState("payinner1");
  const [key2, setKey2] = useState("payinners1");
  const [id, setId] = useState(props.location.state)
  const [recieverCountryIds, setRecieverCountryIds] = useState([])
  const [issenderCountryId, setissenderCountryId] = useState(null);
  const [senderCountryIds, setSenderCountryIds] = useState();
  const navigate = useNavigate()
  const [countrySettingData, setCountrySettingData] = useState({

    id: "",
    senderCountryId: "",
    recieverCountryIds: []
  })
  const [menuOpen, setMenuOpen] = useState(undefined);

  const [countryGet, setCountryGet] = useState([]);

  const GetAllCountrys = async (values) => {
    try {

      const response = await axios.get(CommonConstants.BASE_URL + "/getcountries");
      // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {

        // console.log('mainGet',response.data.data)

        const optionsForCountry = response.data.data.map(country => ({
          value: country.id,
          label: country.name
        }));
        setCountryGet(optionsForCountry)


      }
      else if (response.data.status === "error") {
        // console.log(response.data.message)
      }
    }


    catch (err) {
      // console.log(err)
    }
  };
  const handleSelect1Change = (selectedOption) => {
    console.log(selectedOption);
    const selectedValues = setSelectedValue(selectedOption.value);
  }
  const handleSelect2Change = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setSelectedValues2(selectedValues);
  };

  const validateSelect = (value) => {
    if (!value) {
      return false;
    }
    return true;
  };
  const createNewData = async () => {
    const isValid1 = validateSelect(selectedValue);
    const isValid2 = selectedValues2.length > 0;

    setValidationError1(!isValid1);
    setValidationError2(!isValid2);

    if (isValid1 && isValid2) {
      const dataValue = {
        senderCountryId: selectedValue,
        recieverCountryIds: selectedValues2
      }
      const response = await axios.post(`${CommonConstants.BASE_URL}/saveupdatecountrysettings`, dataValue)

      if (response.data.status == true) {
        navigate("/country-settings-list")
      } else {
        navigate("/country-settings")
      }
    }

  }

  const UpdateCountry = async () => {
    try {
      const response = await axios.post(`${CommonConstants.BASE_URL}/getcountrysettingsbyid`, { id: id })
      setSelectedValue(response.data.data.senderCountryId)
      setSelectedValues2(response.data.data.recieverCountryIds)
      setissenderCountryId(response.data.data.senderCountryId);
      setRecieverCountryIds(response.data.data.recieverCountryIds)
      var selectedId = response.data.data.senderCountryId
    }
    catch (error) {
      console.log(error);
    }
  }
  const arr = []
  if (recieverCountryIds.length > 0 && id) {
    recieverCountryIds.forEach(ele => {
      const find = countryGet.find(itm => itm.value == ele)
      if (find) {
        arr.push(find);
      }
    })
  }

  useEffect(() => {
    GetAllCountrys()
    if (id) {
      UpdateCountry();
    }
  }, [])

  const countrySelect = [
    { value: "1", label: "ind" },
    { value: "2", label: "aus" },
  ]

  const colourOptions = [
    { value: "australia", label: "Australia", color: "#00B8D9", isFixed: true },
    { value: "india", label: "India", color: "#0052CC", isDisabled: false },
    { value: "dubai", label: "Dubai", color: "#5243AA" },
    { value: "red", label: "Red", color: "#FF5630", isFixed: true },
    { value: "orange", label: "Orange", color: "#FF8B00" },
    { value: "yellow", label: "Yellow", color: "#FFC400" },
    { value: "green", label: "Green", color: "#36B37E" },
    { value: "forest", label: "Forest", color: "#00875A" },
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" }
  ];

  const onOptionChange = selectedOptions => {
    if (countryGet.length === selectedOptions.length) {
      setMenuOpen(false);
    }

    setCountrySettingData({ ...countrySettingData, "senderCountryId": selectedOptions.value })

  };
  const onOptionChange2 = selectedOptions => {
    if (countryGet.length === selectedOptions.length) {
      setMenuOpen(false);
    }
    if (Array.isArray(selectedOptions)) {
      // setSelectedBank(selectedOptions.map((opt) => opt.value))
      setCountrySettingData({ ...countrySettingData, "recieverCountryIds": selectedOptions.map((opt) => opt.value) })
    }
  };

  const onMenuOpen = () => {
    if (menuOpen !== undefined) setMenuOpen(undefined);
  };
  const handleCancel = () => {
    navigate("/country-settings-list")
  }
  var defaultValue = [countryGet[0]]
  if (issenderCountryId != null) {

    defaultValue = countryGet.find(item => item.value == issenderCountryId);
  }
  return (
    <>
      <section      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
        <Container>
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-white rounded-2">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Country Settings
              </h3>

              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Container className="">
                  <Row className="mb-4">
                    {
                      defaultValue != null &&
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Sender</Form.Label>
                        <Select
                          defaultValue={defaultValue}
                          menuIsOpen={menuOpen}
                          name="senderCountryId"
                          options={countryGet}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          closeMenuOnSelect={true} 
                          // onChange={onOptionChange}
                          onChange={handleSelect1Change}
                          onMenuOpen={onMenuOpen}
                        />
                        {validationError1 && <small className="responsiveFontLarge  text-danger">Please select a Sender.</small>}
                      </Form.Group>
                    }
                  </Row>
                  <Row className="mb-4">
                    {id && arr.length > 0 ? <>{console.log(arr)}<Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Receiver</Form.Label>
                      <Select
                        defaultValue={arr}
                        isMulti
                        menuIsOpen={menuOpen}
                        name="recieverCountryIds"
                        options={countryGet}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        closeMenuOnSelect={false}
                        onChange={handleSelect2Change}
                        onMenuOpen={onMenuOpen}
                      />
                    </Form.Group></>
                      : <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Receiver</Form.Label>
                        <Select
                          defaultValue={countryGet[0]}
                          isMulti
                          menuIsOpen={menuOpen}
                          name="recieverCountryIds"
                          options={countryGet}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          closeMenuOnSelect={false}
                          onChange={handleSelect2Change}
                          onMenuOpen={onMenuOpen}
                        />
                        {validationError2 && !selectedValues2.length && (
                          <small className="responsiveFontLarge  text-danger">Please select a receiver.</small>
                        )}
                      </Form.Group>}
                  </Row>


                  <Row>
                    {/* <div className="col-lg-2 pb-4 ">
                      <a
                        className="purpleBackground border-0 btn btn-danger text-white bolder d-flex mt-5 justify-content-center m-auto"
                      >
                        Submit
                      </a>
                    </div>
                    <div className="col-lg-2 pb-4 ">
                      <a
                        className="purpleBackground border-0 btn btn-danger text-white bolder d-flex mt-5 justify-content-center m-auto"
                      >
                        Cancel
                      </a>
                    </div> */}
                    <div className="row d-flex m-auto mt-3">
                      <a
                        className="purpleBackground btn btn-default text-white bolder d-block w-auto"
                        onClick={createNewData}
                      > {id ? "Update" : "Create"}
                      </a>

                      &nbsp;&nbsp;
                      <a
                        className="btn btn-default ms-3 text-black bolder border 2 w-auto"
                        onClick={handleCancel}
                      > Cancel
                      </a>

                    </div>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
