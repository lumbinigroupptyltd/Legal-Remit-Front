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
import { CommonConstants } from "../../../../Constants/common.constants";
import axios from "axios";
import { useNavigate} from "react-router-dom";

const SendMoneyFormsCreate = () => {
    const [countrys, setCountrys] = useState([]);
    const navigate = useNavigate();

    const getAllCountry = () => {
        axios.get(CommonConstants.BASE_URL + "/getcountries").then(responce => {
            setCountrys(responce.data.data);
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        getAllCountry();
    }, [])
    
  const handleCancel = () => {
    navigate("/send-money-forms")
  }
    return (

        <>
            <Container      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
                <div className="mainBoxService mt-5">
                    <div className="serviceHeader bg-white text-white rounded-2">
                        <h3 className="text-black px-4 mx-2 responsiveFontLargeHeading normal  border-bottom  pt-4 pb-3 pb-2">
                            Send Money Forms
                        </h3>
                        <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                            <Container>
                                <Form>
                                    <Row className="mb-4">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Select name="countryId" className="required" >
                                            <option value="">Select Country</option>
                                            {countrys &&
                                                countrys.map((countryname, index) => {

                                                    return (
                                                        <option key={index} value={countryname.id}>{countryname.name}</option>
                                                    );
                                                })}
                                        </Form.Select>
                                    </Row>
                                    <Row>
                                        <Form.Label>fieldName</Form.Label>
                                        <Form.Group as={Col} className="left-inner-addon input-container">
                                            <Form.Control type="text" id="email" placeholder="" name='email' />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-4">
                                        <div className="d-flex ">
                                            <input
                                                type="radio"
                                                id="vehicle1"
                                                name="enabled"
                                                value="enable"
                                                className="main-radio requiredCheckBox"
                                            // onChange={ChangeRadioEnableorDisable}
                                            // checked={UpdatePaymenData.enabled === true}
                                            />
                                            <label htmlFor="vehicle5" className="ms-2">
                                                Enabled
                                            </label>
                                        </div>
                                        <div className="d-flex">
                                            <input
                                                type="radio"
                                                id="vehicle2"
                                                name="enabled"
                                                value="disable"
                                                className="main-radio  requiredCheckBox"
                                            // onChange={ChangeRadioEnableorDisable}
                                            // checked={UpdatePaymenData.enabled === false}
                                            />
                                            <label htmlFor="vehicle5" className="ms-2">
                                                Disabled
                                            </label>
                                        </div>
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error checkboxError" >Please select checkbox</small>
                                    </Row>
                                    <div className="row d-flex m-auto mt-3">
                                     
                                            <a
                                                className="purpleBackground w-auto btn btn-default text-white bolder mx-1"
                                            > Create
                                            </a>
                                  
                                     
                                            <a
                                                className="btn btn-default w-auto text-black bolder border 2 mx-1"
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
        </>
    )
}
export default SendMoneyFormsCreate;