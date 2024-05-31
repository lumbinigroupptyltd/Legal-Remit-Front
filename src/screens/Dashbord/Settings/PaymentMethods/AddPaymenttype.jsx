import React, { useState, useRef, useMemo, useEffect } from "react";

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

import { useNavigate } from "react-router-dom";
import { CommonConstants } from "../../../../Constants/common.constants";
import ModalComponent from "../../ModalComponent";

export default function AddPaymenttype(props) {
  const [id, setId] = useState(props.location.state);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [image, setImage] = useState(null);
  const [UpdateRadioChecked, setUpdateRadioChecked] = useState(null);
  const [error, setError] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [enabled, setenabled] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);

  const isActiveMark = (e) => {
    const value = e.target.checked;
    setenabled(value);
  }

  const ChangeRadioEnableorDisable = (e) => {
    const { name, value } = e.target;
    setUpdateRadioChecked(value == "true" ? true : false);
  };
  const AddPayment = async (e) => {
    if (name == "" || name == undefined) {
      setError(true);
    } else if (image === null || image == undefined) {
      setError(true);
    } else {

      let data = new FormData();
      const dataValue = {
        name: name,
        enabled: enabled,
        isCustomized: true,
      };
      data.append("data", JSON.stringify(dataValue));
      data.append("logo", image);
      try {
        const response = await axios.post(
          CommonConstants.BASE_URL + "/addpaymentname",
          data
        );
        if (response.data.status === true) {
          navigate("/paymenttype");
        }

      } catch (err) {
        console.log(err);
      }
    }


  };
  const UpdatePayment = async () => {
    if (name == "") {
      setError(true);
    } else {
      let data = new FormData();
      const dataValue = {
        id: id,
        name: name,
        enabled: enabled,
        isCustomized: true,
      };
      data.append("data", JSON.stringify(dataValue));
      // data.append("logo", image);
      if (image) {
        data.append("logo", image);
      } else {
        data.append("logo", selectedImg);

      }
      try {
        const response = await axios.post(
          CommonConstants.BASE_URL + "/updatepaymentnamebyid",
          data
        );
        if (response.data.status === true) {
          navigate("/paymenttype");
        }
      } catch (err) {
        console.log(err);
      }
    }

  };

  const getPaymentName = async () => {
    try {
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getpaymentnamebyid",
        { id: id }
      );
      setName(response.data.data?.name);
      setUpdateRadioChecked(response.data.data?.enabled);
      setSelectedImg(response.data.data?.logo);
      setenabled(response.data.data?.enabled);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPaymentName();
  }, []);
  return (
    <div>
      <div>
        <div className="container-fluid">
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-black rounded-2">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Payment Type
              </h3>

              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Form id="notificationCheck">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="required"
                      onChange={(e) => {
                        const selectedvalue = e.target.value;
                        const alphabeticValue = selectedvalue.replace(/[^A-Za-z\s]/g, "");
                        setName(alphabeticValue);
                      }}
                      value={name}
                    />
                    {error && !name && (
                      <small className="responsiveFontLarge  text-danger">
                        Please Enter Name
                      </small>
                    )}
                  </Form.Group>
                  {(selectedImg || image) && (
                    <img
                      src={image ? URL.createObjectURL(image) : selectedImg}
                      alt="selectedImg"
                      className="deliverImage mb-3"
                    />
                  )}

                  <Row className="mb-4">
                    <Form.Group controlId="formGridCity" className="border-0">
                      <Form.Label>Logo</Form.Label>
                      <Form.Control
                        type="file"
                        className="w-auto rounded-0 border-0 required"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      {id
                        ? error &&
                        !selectedImg && (
                          <small className="responsiveFontLarge  text-danger ">
                            Please Select File
                          </small>
                        )
                        : error &&
                        !image && (
                          <small className="responsiveFontLarge  text-danger ">
                            Please Select File
                          </small>
                        )}
                    </Form.Group>
                  </Row>
                  {/* 
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      value=''
                      className="required"
                    />
                    <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error notentered" >Please enter Description</small>
                  </Form.Group> */}
                  {console.log(UpdateRadioChecked)}
                  <Form.Group>
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
                  </Form.Group>
                  <div className="row d-flex m-auto pt-3 border-top">
                    {id ? (
                      <div
                        style={{ background: "#AA2AE1" }}
                        className="rounded btn text-white bolder w-auto"
                        onClick={(e) => UpdatePayment()}
                      >
                        Update
                      </div>
                    ) : (
                      <div
                        style={{ background: "#AA2AE1" }}
                        className="rounded btn text-white bolder w-auto"
                        onClick={(e) => AddPayment()}
                      >
                        Create
                      </div>
                    )}
                    &nbsp;&nbsp;
                    <a
                      // href="#!"
                      className="btn btn-default  text-black bolder border 2 w-auto"
                      onClick={() => navigate("/paymenttype")}
                    >
                      {" "}
                      Cancel
                    </a>
                  </div>
                </Form>
                <div>
                  <Modal
                    className="rounded"
                    show={showDelete}
                    size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <div className="d-flex flex-column py-4">
                      <i
                        className="fa fa-exclamation-circle fa-5x mb-4"
                        color="red"
                      ></i>
                      <p className="text-center fs-6 mb-0">ERROR</p>
                    </div>
                    <Modal.Body>
                      <p className="text-center">Payment Name Already Exist!</p>
                    </Modal.Body>
                    <div className="text-center">
                      <button
                        className="w-25 success-btn purpleBackground border-0 rounded text-light"
                        onClick={() => handleCloseDelete()}
                      >
                        Ok
                      </button>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
