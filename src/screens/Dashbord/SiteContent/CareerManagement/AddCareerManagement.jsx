import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Image, Form, Row, Col, Button, Modal } from "react-bootstrap";
import { CommonConstants } from "../../../../Constants/common.constants";
import { useNavigate } from "react-router-dom";

// const validator = require('../../../../assets/js/validator');

const AddCareerManagement = (props) => {
    const [id, setId] = useState(props.location.state);
    const navigate = useNavigate();
    const [countryget, setCountryGet] = useState([]);
    const [formData, setFormData] = useState({
        job_title: "",
        location: "",
        location_country: 14,
        description: ""
    });
    const GetAllCountrys = async (values) => {
        try {
            const response = await axios.get(
                CommonConstants.BASE_URL + "/getcountries"
            );
            if (response.data.status === true) {
                setCountryGet(response.data.data);
            }
        } catch (err) { }
    };
    const onhandleChange = (e) => {
        const { name, value } = e.target;
        const regex = /^[A-Za-z\s\-']+$/;

        if (name === "location" || name === "job_title") {
            if (value === "" || regex.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }
    const getCareerDataById = async () => {
        const getData = await axios.post(CommonConstants.BASE_URL + '/getcareersmanagementbyid', { "id": id });
        if (getData.data.status == true) {
            setFormData(getData.data.data);
        }
    }
    const handleFormSubmit = async () => {
        // if (validator.error_input_validation("careermangemntform")) {
            if (id) {
                const payload = {
                    id: id,
                    job_title: formData.job_title,
                    location: formData.location,
                    location_country: parseInt(formData.location_country),
                    description: formData.description,
                    createdBy: 0,
                    updatedBy: 0
                }
                const sendData = await axios.post(CommonConstants.BASE_URL + '/editcareersmanagement', payload);
                if (sendData.data.status == true) {
                    navigate('/careermanagement');
                }
            } else {
                const payload = {
                    job_title: formData.job_title,
                    location: formData.location,
                    location_country: parseInt(formData.location_country),
                    description: formData.description,
                    createdBy: 0,
                    updatedBy: 0
                }
                const sendData = await axios.post(CommonConstants.BASE_URL + '/savecareersmanagement', payload);
                if (sendData.data.status == true) {
                    navigate('/careermanagement');
                }
            }
        // }
    }
    useEffect(() => {
        GetAllCountrys();
        if (id) {
            getCareerDataById();
        }
    }, []);
    return (
        <>
            <div className="mainBoxService mt-5">
                <div className="serviceHeader bg-white text-black rounded-2">
                    <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                        {`${id ? "Edit" : "Add"}`}  Career Management
                    </h3>
                    <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                        <Form id="careermangemntform">
                            <Row>
                                <Form.Group className="mb-3 row d-flex" controlId="formGridEmail">
                                    <div className="col-lg-6">
                                        <Form.Label>Job Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="job_title"
                                            placeholder="Job Title"
                                            className="required"
                                            value={formData?.job_title}
                                            onChange={onhandleChange}
                                        />
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter Job Title</small>
                                    </div>
                                    <div className="col-lg-6">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Select onChange={onhandleChange} name="location_country" value={formData?.location_country} className="required">
                                            {countryget.map((ele) => {
                                                return (
                                                    <option value={ele.id}>{ele.name}</option>
                                                );
                                            })}
                                        </Form.Select>
                                        <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please select Country</small>
                                    </div>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group className="mb-3 respoChildFooter" controlId="formBasicEmail">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="location"
                                        placeholder="Location"
                                        className="required"
                                        value={formData?.location}
                                        onChange={onhandleChange}
                                    />
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter location </small>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3 respoChildFooter">
                                <Form.Group as={Col} className="pbSt" controlId="formGridPassword">
                                    <Form.Label>Job Description</Form.Label>
                                    <Form.Control
                                        as="textarea" // Use textarea instead of text
                                        placeholder="Job Description"
                                        name="description"
                                        rows={4}
                                        value={formData?.description}
                                        onChange={onhandleChange}
                                        className="required"
                                    />
                                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter Job Description</small>
                                </Form.Group>
                            </Row>
                            <div className="row d-flex ms-auto mt-3">
                                <a
                                    style={{ background: "#AA2AE1" }}
                                    className="w-auto px-3 rounded btn text-white bolder"
                                    onClick={() => handleFormSubmit()}
                                >
                                    {id ? "Update" : "Create"}
                                </a>
                                <a
                                    className="w-auto px-3 btn btn-default ms-3 text-black bolder border 2"
                                    onClick={() => navigate('/careermanagement')}
                                > Cancel
                                </a>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddCareerManagement;
