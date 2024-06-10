import React, { useState, useRef, useMemo, useEffect } from "react";
import PageHeader from "../../../../../components/PageHeader";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './EditAboutUSContentPage.scss'
import { EditorState, ContentState, convertToRaw, convertFromRaw, convertFromHTML } from 'draft-js';
import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { CommonConstants } from "../../../../../Constants/common.constants";

import ModalComponent from "../../../ModalComponent";
import Loader from "../../../../Loader/Loader";
import { useNavigate } from "react-router-dom";
import Select from "react-dropdown-select";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// const validator = require("../../../../../assets/js/validator")

const toolbar = {
  options: ["inline", "blockType", "list", "textAlign", "history", "fontFamily", "colorPicker", "emoji"],
  inline: {
    inDropdown: false,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  // blockType: {
  //   inDropdown: true,
  //   options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6",],
  // },
  colorPicker: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
      'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
      'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
      'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
      'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
      'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
  },
  emoji: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
      '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
      '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
      '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
      '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
      '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
      '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
      '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
      '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
      '✅', '❎', '💯',
    ],
  },
  list: {
    inDropdown: true,
    options: ["unordered", "ordered"],
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  textAlign: {
    inDropdown: true,
    options: ["left", "center", "right", "justify"],
  },
  link: {
    inDropdown: false,
    showOpenOptionOnHover: false,
    defaultTargetOption: "_blank",
  },
  history: {
    inDropdown: false,
    options: ["undo", "redo"],
  },
};


export default function EditAboutUSContentPage(props) {
  const editor = useRef("");
  const navigate = useNavigate();

  const [id, setId] = useState(props.location.state);
  const [showHide, setshowHide] = useState(null);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [loadervalue, setloadervalue] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    address: '',
    location: '',
    email: '',
    phoneNumber1: '',
    phoneNumber2: '',
    tollfreeNumber: '',
    landlineNumber: '',
  });
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (["phoneNumber1", "phoneNumber2", "tollfreeNumber", "landlineNumber"].includes(name)) {
      // Remove non-numeric characters
      const numericValue = value.replace(/\D/g, "");
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
      return;
    } else if (name == "location") {
      const alphanumericRegex = /^[A-Za-z\s]+$/;
      if (alphanumericRegex.test(value)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const isValidEmail = (email) => {
    // Allow specific domains like "armyspy.com" and "gmail.com"
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleFormSubmit = async (e) => {
    if (id) {
      const newErrors = {};
      if (!formData.email || !isValidEmail(formData.email)) {
        newErrors.email = 'Please enter an  email address.';
      }
      if (!formData.location) {
        newErrors.location = 'Please enter Location';
      }
      if (!formData.address) {
        newErrors.address = 'Please enter Address';
      }
      if (!formData.phoneNumber1) {
        newErrors.phoneNumber1 = 'Please Enter Phone Number 1';
      }

      // if (!formData.phoneNumber2) {
      //   newErrors.phoneNumber2 = 'Please Enter Phone Number 2';
      // }
      // if (!formData.tollfreeNumber) {
      //   newErrors.tollfreeNumber = 'Please Enter Tollfree Number';
      // }
      // if (!formData.landlineNumber) {
      //   newErrors.landlineNumber = 'Please Enter Landline Number';
      // }
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        const payload = {
          "id": id,
          "address": formData.address,
          "location": formData.location,
          "email": formData.email,
          "phoneNumber1": formData.phoneNumber1,
          "phoneNumber2": formData.phoneNumber2,
          "tollfreeNumber": formData.tollfreeNumber,
          "landlineNumber": formData.landlineNumber,
        }
        await axios.post(CommonConstants.BASE_URL + "/editcontactusdetailsbyid", payload).then((responce) => {
          if (responce.data.status == true) {
            navigate("/aboutus-CMS");
          }
        }).catch(error => console.log(error));
      }

    } else {
      const newErrors = {};
      if (!formData.email || !isValidEmail(formData.email)) {
        newErrors.email = 'Please enter an  email address.';
      }
      if (!formData.location) {
        newErrors.location = 'Please enter Location';
      }
      if (!formData.address) {
        newErrors.address = 'Please enter Address';
      }
      if (!formData.phoneNumber1 || formData.phoneNumber1.length <= 6) {
        setError(true);
      }

      // if (!formData.phoneNumber2) {
      //   newErrors.phoneNumber2 = 'Please Enter Phone Number2';
      // }
      // if (!formData.tollfreeNumber) {
      //   newErrors.tollfreeNumber = 'Please Enter TollFree Number';
      // }
      // if (!formData.landlineNumber) {
      //   newErrors.landlineNumber = 'Please Enter Landline Number';
      // }
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 0) {
        const payload = {
          "address": formData.address,
          "location": formData.location,
          "email": formData.email,
          "phoneNumber1": formData.phoneNumber1,
          "phoneNumber2": formData.phoneNumber2,
          "tollfreeNumber": formData.tollfreeNumber,
          "landlineNumber": formData.landlineNumber,
        }
        await axios.post(CommonConstants.BASE_URL + "/savecontactusdetail", payload).then((responce) => {
          if (responce.data.status == true) {
            navigate("/aboutus-CMS");
          }
        }).catch(error => console.log(error));
      }

    }

  };

  const getConatctDetalis = async () => {
    try {
      const getData = await axios.post(CommonConstants.BASE_URL + "/getcontactusdetailsbyid", { "id": id });
      if (getData.data.status == true) {
        setFormData(getData.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    setshowHide(props.location.state);
    if (id) {
      getConatctDetalis();
    }
  }, [id]);

  return (
    <div>
      <div>
        <div className="container-fluid" onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
          {loadervalue == true ? <Loader /> : ""}
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-black rounded-2">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Contact Us
              </h3>

              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Form id="notificationCheck">
                  <Row>
                    <Form.Group className="mb-3 row d-flex" controlId="formBasicEmail">

                      <div className="col-lg-6">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                          type="text"
                          name="location"
                          placeholder="Location"
                          className="required"
                          value={formData.location}
                          onChange={handleInputChange}
                        />
                        {errors.location && !formData.location && (
                          <small className="text-danger error_message ms-2">
                            {errors.location}
                          </small>
                        )}
                      </div>
                      <div className="col-lg-6">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="Email"
                          name="email"
                          placeholder="Email"
                          className="required"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {errors.email && !isValidEmail(formData.email) && (
                          <small className="text-danger error_message ms-2">
                            {errors.email}
                          </small>
                        )}
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3 row d-flex" controlId="formBasicEmail">
                      <div className="col-lg-12">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          placeholder="Address"
                          className="required"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        {errors.address && !formData.address && (
                          <small className="text-danger error_message ms-2">
                            {errors.address}
                          </small>
                        )}
                      </div>

                    </Form.Group>
                  </Row>


                  <Row>
                    <Form.Group className="mb-3 row d-flex" controlId="formBasicEmail">
                      <div className="col-lg-6">
                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Phone Number 1</Form.Label>
                            <Form.Control type="text" id="phoneNumber1" name="phoneNumber1" placeholder="Phone Number 1" value={formData.phoneNumber1} onChange={handleInputChange} className="required" />
                            {/* {errors.phoneNumber1 && !formData.phoneNumber1 && (
                              <small className="text-danger error_message ms-2">
                                {errors.phoneNumber1}
                              </small>
                            )} */}
                            {error &&
                              (!formData.phoneNumber1 ||
                                formData.phoneNumber1.length < 6 ||
                                !/^\d+$/.test(formData.phoneNumber1)) && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Enter Valid Phone Number 1
                                </small>
                              )}
                          </Form.Group>
                        </Row>
                      </div>

                      <div className="col-lg-6">
                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Phone Number 2</Form.Label>
                            <Form.Control type="text" id="phoneNumber2" name="phoneNumber2" placeholder="Phone Number 2" value={formData.phoneNumber2} onChange={handleInputChange} />
                            {formData.phoneNumber2 &&
                              (
                                formData.phoneNumber2.length < 6 ||
                                !/^\d+$/.test(formData.phoneNumber2)) && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Enter Valid Phone Number 2
                                </small>
                              )}
                          </Form.Group>
                        </Row>
                      </div>

                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3 row d-flex" controlId="formBasicEmail">

                      <div className="col-lg-6">
                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Tollfree Number</Form.Label>
                            <Form.Control type="text" id="tollfreeNumber" name="tollfreeNumber" placeholder="Tollfree Number" value={formData.tollfreeNumber} onChange={handleInputChange} />
                            {formData.tollfreeNumber &&
                              (
                                formData.tollfreeNumber.length < 6 ||
                                !/^\d+$/.test(formData.tollfreeNumber)) && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Enter Valid Tollfree Number
                                </small>
                              )}
                          </Form.Group>
                        </Row>
                      </div>

                      <div className="col-lg-6">
                        <Row className="mb-4">
                          <Form.Group as={Col} controlId="formGridCity">
                            <Form.Label>Landline Number</Form.Label>
                            <Form.Control type="text" id="landlineNumber" name="landlineNumber" placeholder="Landline Number" value={formData.landlineNumber} onChange={handleInputChange} />
                            {formData.landlineNumber &&
                              (
                                formData.landlineNumber.length < 6 ||
                                !/^\d+$/.test(formData.landlineNumber)) && (
                                <small className="text-danger error_message ms-2 error">
                                  Please Enter Valid Landline Number
                                </small>
                              )}
                          </Form.Group>
                        </Row>
                      </div>
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
                      onClick={() => navigate("/aboutus-CMS")}
                    > Cancel
                    </a>
                  </div>



                </Form>
                <ModalComponent
                  show={modalShowEdit}
                  title1={"Notification Template updated successfully"}
                  onHide={() => setModalShowEdit(false)}
                />
                <ModalComponent
                  show={modalShowAdd}
                  title11={"Notification Template added successfully"}
                  onHide={() => setModalShowAdd(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
