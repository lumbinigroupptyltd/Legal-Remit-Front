import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown, Col, Row } from "react-bootstrap";
import PageHeader from "../../../../components/PageHeader";
import axios from "axios";
import { CommonConstants } from "../../../../Constants/common.constants";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function AddPoints(props) {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValues2, setSelectedValues2] = useState([]);
  const [validationError1, setValidationError1] = useState(false);
  const [validationError2, setValidationError2] = useState(false);
  const [key, setKey] = useState("pay1");
  const [key1, setKey1] = useState("payinner1");
  const [key2, setKey2] = useState("payinners1");
  const [id, setId] = useState(props.location.state);
  const [recieverCountryIds, setRecieverCountryIds] = useState([]);
  const [issenderCountryId, setissenderCountryId] = useState(null);
  const [senderCountryIds, setSenderCountryIds] = useState();
  const navigate = useNavigate();
  const [countrySettingData, setCountrySettingData] = useState({
    id: "",
    senderCountryId: "",
    recieverCountryIds: [],
  });
  const [menuOpen, setMenuOpen] = useState(undefined);

  const [countryGet, setCountryGet] = useState([]);

  const GetAllCountrys = async (values) => {
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getcountries"
      );
      // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {
        // console.log('mainGet',response.data.data)

        const optionsForCountry = response.data.data.map((country) => ({
          value: country.id,
          label: country.name,
        }));
        setCountryGet(optionsForCountry);
      } else if (response.data.status === "error") {
        // console.log(response.data.message)
      }
    } catch (err) {
      // console.log(err)
    }
  };
  const handleSelect1Change = (selectedOption) => {
    console.log(selectedOption);
    const selectedValues = setSelectedValue(selectedOption.value);
  };
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
        recieverCountryIds: selectedValues2,
      };
      const response = await axios.post(
        `${CommonConstants.BASE_URL}/saveupdatecountrysettings`,
        dataValue
      );

      if (response.data.status == true) {
        navigate("/country-settings-list");
      } else {
        navigate("/country-settings");
      }
    }
  };

  const UpdateCountry = async () => {
    try {
      const response = await axios.post(
        `${CommonConstants.BASE_URL}/getcountrysettingsbyid`,
        { id: id }
      );
      setSelectedValue(response.data.data.senderCountryId);
      setSelectedValues2(response.data.data.recieverCountryIds);
      setissenderCountryId(response.data.data.senderCountryId);
      setRecieverCountryIds(response.data.data.recieverCountryIds);
      var selectedId = response.data.data.senderCountryId;
    } catch (error) {
      console.log(error);
    }
  };
  const arr = [];
  if (recieverCountryIds.length > 0 && id) {
    recieverCountryIds.forEach((ele) => {
      const find = countryGet.find((itm) => itm.value == ele);
      if (find) {
        arr.push(find);
      }
    });
  }

  useEffect(() => {
    GetAllCountrys();
    if (id) {
      UpdateCountry();
    }
  }, []);

  const countrySelect = [
    { value: "1", label: "ind" },
    { value: "2", label: "aus" },
  ];

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
    { value: "silver", label: "Silver", color: "#666666" },
  ];

  const onOptionChange = (selectedOptions) => {
    if (countryGet.length === selectedOptions.length) {
      setMenuOpen(false);
    }

    setCountrySettingData({
      ...countrySettingData,
      senderCountryId: selectedOptions.value,
    });
  };
  const onOptionChange2 = (selectedOptions) => {
    if (countryGet.length === selectedOptions.length) {
      setMenuOpen(false);
    }
    if (Array.isArray(selectedOptions)) {
      // setSelectedBank(selectedOptions.map((opt) => opt.value))
      setCountrySettingData({
        ...countrySettingData,
        recieverCountryIds: selectedOptions.map((opt) => opt.value),
      });
    }
  };

  const onMenuOpen = () => {
    if (menuOpen !== undefined) setMenuOpen(undefined);
  };
  const handleCancel = () => {
    navigate("/country-settings-list");
  };
  var defaultValue = [countryGet[0]];
  if (issenderCountryId != null) {
    defaultValue = countryGet.find((item) => item.value == issenderCountryId);
  }
  return (
    <>
      <div className="container-fluid">
        <PageHeader
          HeaderText="Add Points"
          Breadcrumb={[
            { name: "Dashboard", navigate: "" },
            { name: "IoT Dashboard", navigate: "" },
          ]}
        />

        <div className="bg-white rounded-4 p-4">
          <div className="row">
            <div className="col-lg-12 col-md-12 pr-0 pl-0">
              <div className="cardas">
                <div className="bodys">
                  <div className="px-3">
                    <div className="w-auto d-flex">
                      <div
                        className="alert alert-warning w-auto px-3"
                        role="alert"
                      >
                        This Calculation based on only US Dollar Currency.
                      </div>
                    </div>
                    {/* <h5 className="purpleText">Get Points</h5> */}
                    <Form>
                      <Row className="my-4">
                        <div className="col-lg-6 ps-0">
                          <Form.Group as={Col} controlId="formGridState">
                            <Form.Label>Select Country</Form.Label>
                            <Select
                              isMulti
                              defaultValue={defaultValue}
                              menuIsOpen={menuOpen}
                              name="senderCountryId"
                              options={countryGet}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              closeMenuOnSelect={false}
                              // onChange={onOptionChange}
                              onChange={handleSelect1Change}
                              onMenuOpen={onMenuOpen}
                            />
                            {validationError1 && (
                              <small className="responsiveFontLarge  text-danger">
                                Please select a Sender.
                              </small>
                            )}
                          </Form.Group>
                        </div>
                        <div className="col-lg-6">
                          <div className="w-100">
                            <Form.Label>Currency code</Form.Label>
                            <Form.Control
                              type="text"
                              disabled
                              placeholder="USD"
                              // value={lowRiskAmount}
                              // onChange={e => {
                              //   const inputValue = e.target.value;
                              //   const numericValue = inputValue.replace(/[^0-9]/g, '');
                              //   setLowRiskAmount(numericValue);
                              // }}
                            />
                          </div>
                        </div>
                      </Row>
                      <Row className="my-4">
                        <div className="col-lg-6">
                          <Form.Group
                            className="d-flex justify-content-between align-items-center"
                            controlId="formGridCity"
                          >
                            <div className="w-100">
                              <Form.Label>Amount</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Amount"
                                // value={lowRiskAmount}
                                // onChange={e => {
                                //   const inputValue = e.target.value;
                                //   const numericValue = inputValue.replace(/[^0-9]/g, '');
                                //   setLowRiskAmount(numericValue);
                                // }}
                                inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                pattern="[0-9]*" // This will enforce numeric-only input
                              />
                            </div>

                            <div className="px-5 mt-4">
                              <i class="fa fa-angle-double-right text-black"></i>
                            </div>

                            <div className="w-100">
                              <Form.Label>Converted Points</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Converted Points"
                                // value={lowRiskAmount}
                                // onChange={e => {
                                //   const inputValue = e.target.value;
                                //   const numericValue = inputValue.replace(/[^0-9]/g, '');
                                //   setLowRiskAmount(numericValue);
                                // }}
                                inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                pattern="[0-9]*" // This will enforce numeric-only input
                              />
                            </div>
                          </Form.Group>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group
                            className="d-flex justify-content-between align-items-center"
                            controlId="formGridCity"
                          >
                            <div className="w-100">
                              <Form.Label>Amount</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Amount"
                                // value={lowRiskAmount}
                                // onChange={e => {
                                //   const inputValue = e.target.value;
                                //   const numericValue = inputValue.replace(/[^0-9]/g, '');
                                //   setLowRiskAmount(numericValue);
                                // }}
                                inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                pattern="[0-9]*" // This will enforce numeric-only input
                              />
                            </div>

                            <div className="px-5 mt-4">
                              <i class="fa fa-angle-double-right text-black"></i>
                            </div>

                            <div className="w-100">
                              <Form.Label>Reedem Points</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Reedem Points"
                                // value={lowRiskAmount}
                                // onChange={e => {
                                //   const inputValue = e.target.value;
                                //   const numericValue = inputValue.replace(/[^0-9]/g, '');
                                //   setLowRiskAmount(numericValue);
                                // }}
                                inputMode="numeric" // This will show a numeric keyboard on mobile devices
                                pattern="[0-9]*" // This will enforce numeric-only input
                              />
                            </div>
                          </Form.Group>
                        </div>
                      </Row>
                      <Row className="my-4">
                        <div className="col-lg-6">
                          <div className="w-100">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                              type="date"
                              // placeholder="Amount"
                              // value={lowRiskAmount}
                              // onChange={e => {
                              //   const inputValue = e.target.value;
                              //   const numericValue = inputValue.replace(/[^0-9]/g, '');
                              //   setLowRiskAmount(numericValue);
                              // }}
                              // inputMode="numeric" // This will show a numeric keyboard on mobile devices
                              // pattern="[0-9]*" // This will enforce numeric-only input
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="w-100">
                            <Form.Label>
                              How much points reedem per transaction?
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Redeem Points per transaction"
                              // value={lowRiskAmount}
                              // onChange={e => {
                              //   const inputValue = e.target.value;
                              //   const numericValue = inputValue.replace(/[^0-9]/g, '');
                              //   setLowRiskAmount(numericValue);
                              // }}
                              inputMode="numeric" // This will show a numeric keyboard on mobile devices
                              pattern="[0-9]*" // This will enforce numeric-only input
                            />
                          </div>
                        </div>
                      </Row>
                    </Form>

                    <div className="row d-flex justify-content-end mt-3 ">
                <div className="col-lg-1">
                  <Button
                    className="m-0 mt-3 purpleBackground text-white"
                    variant="contained"
                  >
                    Add
                  </Button>
                </div>
                <div className="col-lg-1">
                  <Button
                    className="m-0 mt-3 text-black border"
                    variant="outlined"
                  >
                    Close
                  </Button>
                </div>
              </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
