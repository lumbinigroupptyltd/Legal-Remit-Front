import React, { useEffect, useState } from "react";

import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import ModalComponent from "../../ModalComponent";
import axios from "axios";
import { CommonConstants, Option, NumberOfDays } from "../../../../Constants/common.constants";
import { useNavigate} from "react-router-dom";
// const validator = require('../../../../assets/js/validator')


export default function CreateRiskManagement(props) {

  const navigate = useNavigate()
  const [Category, setCategory] = useState();
  const [days, setDays] = useState(1);
  const [lowRiskAmount, setLowRiskAmount] = useState();
  const [mediumRiskAmount, setMediumRiskAmount] = useState();
  const [highRiskAmount, sethighRiskAmount] = useState();
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [isEmpty, setIsempty] = useState(false);
  const [id, setId] = useState(props.location.state)
  const [categoryOfRisk, setCategoryOfRisk] = useState(1);
  const [durationLabel, setDurationLabel] = useState("Amount");

  const handleCategoryChange = (e) => {
    setCategoryOfRisk(e.target.value);
    if (e.target.value == 3) {
      setDays(365)
    }
    // Set the duration label based on the selected category
    switch (e.target.value) {
      case '1':
        setDurationLabel('Amount');
        break;
      case '2':
        setDurationLabel('Transaction');
        break;
      case '3':
        setDurationLabel('Number Of Active Recipients');
        break;
      default:
        setDurationLabel('');
        break;
    }
  };
  const postRiskManagmentData = () => {
    if (days == undefined) {
      setIsempty(true)
      return 0;
    }
    if (lowRiskAmount == undefined) {
      setIsempty(true)
      return 0;
    }
    if (mediumRiskAmount == undefined) {
      setIsempty(true)
      return 0;
    }
    if (highRiskAmount == undefined) {
      setIsempty(true)
      return 0;
    }

    const isSelectedData = {
      categoryId: categoryOfRisk,
      days: days,
      lowRisk: lowRiskAmount,
      mediumRisk: mediumRiskAmount,
      highRisk: highRiskAmount
    }
    axios.post(CommonConstants.BASE_URL + '/saveupdaterisksettings', isSelectedData).then(async (responce) => {
      setModalShowAdd(true);
      if (responce.data.status == true) {
        navigate('/risk-management');
      }
    }).catch(error => console.log(error));


  }
  const getRiskSetting = () => {
    if (id) {
      axios.post(CommonConstants.BASE_URL + '/getrisksettingsbyid', { id: id }).then((res) => {
        setDays(res.data.data.days)
        setLowRiskAmount(res.data.data.lowRisk)
        setMediumRiskAmount(res.data.data.mediumRisk)
        sethighRiskAmount(res.data.data.highRisk)
        setCategoryOfRisk(res.data.data.categoryId)
        if (res.data.data.categoryId == 1) {
          setDurationLabel('Amount');
        } else if (res.data.data.categoryId == 2) {
          setDurationLabel('Transaction');
        } else {
          setDurationLabel('Number Of Active Recipients');
        }

      }).catch(error => console.log(error))
    }

  }
  const updateRiskSetting = () => {
    const isSelectedData = {
      id: id,
      categoryId: categoryOfRisk,
      days: days,
      lowRisk: lowRiskAmount,
      mediumRisk: mediumRiskAmount,
      highRisk: highRiskAmount
    }
    axios.post(CommonConstants.BASE_URL + '/saveupdaterisksettings', isSelectedData).then(async (responce) => {
      // setModalShowAdd(true);
      if (responce.data.status == true) {
        navigate('/risk-management');
      }
    }).catch(error => console.log(error));
  }
  const handleCancel = () => {
    navigate("/risk-management");

  }
  useEffect(() => {
    getRiskSetting();
  }, [categoryOfRisk])
  return (
    <>
      <section      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
        <Container className="">
          <div className="mainBoxService mt-3">
            <div className="serviceHeader bg-white text-black rounded-0">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Risk Management
              </h3>
              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Container className="">
                  <Row className="mb-4">
                    <Form.Group as={Col} controlId="formGridCity" defaultValue={categoryOfRisk} onChange={handleCategoryChange}>
                      <Form.Label>Category of Risk</Form.Label>
                      <Form.Select aria-label="Default select example">
                        {Option.map((option) => (
                          <option value={option.value} key={option.value} selected={categoryOfRisk === option.value}>
                            {option.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Row>
                  <Row className="mb-4">
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Duration (Days)</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        value={categoryOfRisk === "3" ? 365 : days}
                        disabled={categoryOfRisk == "3"}
                        onChange={(e) => setDays(e.target.value)}
                      >
                        {NumberOfDays.map((option) => (
                          <option value={option.value} key={option.value}>
                            {option.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    {isEmpty && !days && <small className="responsiveFontLarge text-danger">Please Enter Duration </small>}
                  </Row>

                  <Row className="mb-4">
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Low Risk {categoryOfRisk && `(${durationLabel})`}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Low Risk Amount"
                        value={lowRiskAmount}
                        onChange={e => {
                          const inputValue = e.target.value;
                          const numericValue = inputValue.replace(/[^0-9]/g, '');
                          setLowRiskAmount(numericValue);
                        }}
                        inputMode="numeric" // This will show a numeric keyboard on mobile devices
                        pattern="[0-9]*" // This will enforce numeric-only input
                      />
                      {isEmpty && !lowRiskAmount && <small className="responsiveFontLarge  text-danger" >Please Enter Low Risk Amount </small>}
                    </Form.Group>
                  </Row>
                  <Row className="mb-4">
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Medium Risk {categoryOfRisk && `(${durationLabel})`}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Medium Risk Amount"
                        value={mediumRiskAmount}
                        onChange={e => {
                          const inputValue = e.target.value;
                          const numericValue = inputValue.replace(/[^0-9]/g, '');
                          setMediumRiskAmount(numericValue);
                        }}
                        inputMode="numeric" // This will show a numeric keyboard on mobile devices
                        pattern="[0-9]*" // This will enforce numeric-only input
                      />
                      {isEmpty && !mediumRiskAmount && <small className="responsiveFontLarge  text-danger" >Please Enter Medium Risk Amount </small>}

                    </Form.Group>
                  </Row><Row className="mb-4">
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>High Risk {categoryOfRisk && `(${durationLabel})`}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="High Risk Amount"
                        value={highRiskAmount}
                        onChange={e => {
                          const inputValue = e.target.value;
                          const numericValue = inputValue.replace(/[^0-9]/g, '');
                          sethighRiskAmount(numericValue);
                        }}
                        inputMode="numeric" // This will show a numeric keyboard on mobile devices
                        pattern="[0-9]*" // This will enforce numeric-only input
                      />
                      {isEmpty && !highRiskAmount && <small className="responsiveFontLarge  text-danger " >Please Enter High Risk Amount </small>}
                    </Form.Group>
                  </Row>


                  <Row className="row d-flex m-auto  pt-3">
                    {id ?
                      <Button size="sm" className="purpleBackground border-0 w-auto px-3" onClick={() => updateRiskSetting()}>
                        Update
                      </Button>
                      :

                      <Button size="sm" className="purpleBackground text-white border text-black w-auto px-3" onClick={() => postRiskManagmentData()}>
                        Create
                      </Button>

                    }
                    <Button size="sm" className="bg-transparent  border text-black w-auto px-3" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Row>


                </Container>
              </div>
            </div>
          </div>
          <ModalComponent
            show={modalShowAdd}
            title11={"Create Risk Management successfully"}
            onHide={() => setModalShowAdd(false)}
          />
        </Container>

      </section>
    </>
  )
}