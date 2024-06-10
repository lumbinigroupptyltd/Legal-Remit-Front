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
import { CommonConstants } from '../../../../Constants/common.constants'

export default function AddDeliveryType(props) {
  const [id, setId] = useState(props.location.state)
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState();
  const [UpdateRadioChecked, setUpdateRadioChecked] = useState(null)
  const [error, setError] = useState(false)
  const [showDelete, setShowDelete] = useState(false);
  const [enabled, setenabled] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);

  const isActiveMark = (e) => {
    const value = e.target.checked;
    setenabled(value);
  }

  const getDeliveryById = async () => {
    try {
      const response = await axios.post(CommonConstants.BASE_URL + "/getdeliverytypebyid", { id: id });
      setName(response.data.data?.type)
      setSelectedImg(response.data.data?.logo);
      setenabled(response.data.data?.enabled);
    } catch (error) {
      console.log(error)
    }

  }
  const ChangeRadioEnableorDisable = (e) => {

    const { name, value } = e.target
    setUpdateRadioChecked(value == "true" ? true : false)
  }
  const AddDeliveryTypeData = async (e) => {
    // if (name == "") {
    //   setError(true)
    // }
    // if (image == undefined) {
    //   setError(true)
    // }
    if (!name || !image) {
      setError(true)
    } else
      // if (name != "" && image != undefined) {
      try {
        let data = new FormData();
        const dataValue = {
          type: name,
          enabled: enabled,
          isCustomized: true
        }
        data.append('data', JSON.stringify(dataValue));
        data.append('logo', image);

        const response = await axios.post(CommonConstants.BASE_URL + "/adddeliverytype", data);
        if (response.data.statuscode === 200) {
          navigate('/deliverymethodlist')
        }
        if (!error && response.data.statuscode == 201) {
          setShowDelete(true);
        }
      }
      catch (err) {
        console.log(err)
      }
    // }
  }
  const UpdateDeliveryType = async () => {
    if (name == "") {
      setError(true)
    }
    if (image === undefined || selectedImg === undefined) {
      setError(true)
    }

    let formdata = new FormData();
    const sendData = {
      id: id,
      type: name,
      enabled: enabled,
      isCustomized: true
    }
    formdata.append("data", JSON.stringify(sendData))
    formdata.append("logo", image);
    axios.post(CommonConstants.BASE_URL + '/updatedeliverytypebyid', formdata).then((responce) => {
      if (responce.data.status == true) {
        navigate("/deliverymethodlist");
      }
    }).catch(error => console.log(error))
  }
  useEffect(() => {
    getDeliveryById()
  }, [])
  return (
    <div>
      <div>
        <div className="container-fluid">
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white  text-white rounded-2">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Delivery Type
              </h3>
              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Form id="notificationCheck">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="required"
                      value={name}
                      onChange={(e) => {
                        const alphanumericValue = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                        setName(alphanumericValue)
                      }}
                    />
                    {error && !name && <small className="responsiveFontLarge  text-danger" >Please Enter Name</small>}
                  </Form.Group>
                  {(selectedImg || image) && <img src={image ? URL.createObjectURL(image) : CommonConstants.BASE_URL + selectedImg} alt="selectedImg" className="deliverImage mb-3" />}
                  <Row className="mb-4">
                    <Form.Group
                      controlId="formGridCity"
                      className="border-0"
                    >
                      <Form.Label>Logo</Form.Label>
                      <Form.Control
                        type="file"
                        className="w-auto rounded-0 border-0 required"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                      {id ? (error && !selectedImg && <small className="responsiveFontLarge  text-danger " >Please Select File</small>) : (error && !image && <small className="responsiveFontLarge  text-danger " >Please Select File</small>)}
                    </Form.Group>
                  </Row>
                  <Form.Group>
                    {/* <div className="d-flex mt-3">
                      <input
                        type="radio"
                        id="vehicle1"
                        name="enabled"
                        value="true"
                        className="main-radio requiredCheckBox"
                        onChange={ChangeRadioEnableorDisable}
                        checked={UpdateRadioChecked === true}
                      />
                      <label for="vehicle1" className="ms-2">
                        Active
                      </label>
                    </div>
                    <div className="d-flex">
                      <input
                        type="radio"
                        id="vehicle2"
                        name="enabled"
                        value="false"
                        className="main-radio requiredCheckBox"
                        onChange={ChangeRadioEnableorDisable}
                        checked={UpdateRadioChecked === false}
                      />
                      <label for="vehicle2" className="ms-2">
                        Inactive
                      </label>
                    </div> */}
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
                    {/* {error && !UpdateRadioChecked && <small className="responsiveFontLarge  text-danger" >Please Select Checkbox</small>} */}
                  </Form.Group>
                  <div className="row d-flex m-auto pt-3 border-top">

                    {id ? <div
                      style={{ background: "#AA2AE1", }}
                      className="rounded btn text-white bolder w-auto"
                      onClick={(e) => UpdateDeliveryType()}
                    >
                      Update
                    </div> : <div
                      style={{ background: "#AA2AE1", }}
                      className="rounded btn text-white bolder w-auto"
                      onClick={(e) => AddDeliveryTypeData()}
                    >
                      Create
                    </div>}
                    &nbsp;&nbsp;
                    <a
                      className="btn btn-default text-black bolder border 2 w-auto"
                      onClick={() => navigate("/deliverymethodlist")}
                    > Cancel
                    </a>
                  </div>
                </Form>
                <div>
                  <Modal className='rounded'
                    show={showDelete}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <div className='d-flex flex-column py-4'>
                      <i className="fa fa-exclamation-circle fa-5x mb-4" color="red" ></i>
                      <p className='text-center fs-6 mb-0'>ERROR</p>

                    </div>
                    <Modal.Body>
                      <p className='text-center'>
                        Delivery Type Already Exist!
                      </p>
                    </Modal.Body>
                    <div className='text-center'>
                      <button className='w-25 success-btn purpleBackground border-0 rounded text-light' onClick={() => handleCloseDelete()}>Ok</button>
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
