import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Row, Col, Button, Modal, Container } from "react-bootstrap";

import { CommonConstants } from "../../../../Constants/common.constants";
import { useNavigate } from "react-router-dom";

function DeliveryMethodCreate(props) {
  const [id, setId] = useState(props.location.state);
  console.log(id);

  const navigate = useNavigate();

  const [partnerBank, setPartnerBank] = useState("");
  const [partnerBankId, setPartnerBankId] = useState("");
  const [type, setType] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [text, setText] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [hasIssue, setHasIssue] = useState(false);
  const [show, setShow] = useState(false);

  const [individualUserData, setIndividualUserData] = useState({
    id: "",
    type: "",
    text: "",
    partnerBankId: "",
    enabled: "",
    hasIssue: "",
  });
  // const [individualUserData, setIndividualUserData] = useState("")

  const getType = async () => {
    let response = await axios.get(
      CommonConstants.BASE_URL + "/getactivedeliverytype"
    );
    setType(response.data.data);
    console.log(response.data.data);
  };

  const handleTypeChange = (e) => {
    const { name, value } = e.target;
    setSelectedType(value);
    console.log(individualUserData);
    setIndividualUserData({ ...individualUserData, [name]: value });
  };

  const getPartnerBankData = async () => {
    let response = await axios.get(
      CommonConstants.BASE_URL + "/getallpartnerbanks"
    );
    setPartnerBank(response.data.data);
    console.log(response.data.data);
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChangeBank = (e) => {
    const { name, value } = e.target;
    setPartnerBankId(value);
    setIndividualUserData({ ...individualUserData, [name]: value });
  };

  const handleChangeEnabled = (e) => {
    const { name, value } = e.target;
    setEnabled(value == "true" ? true : false);
    setIndividualUserData({
      ...individualUserData,
      [name]: value == "true" ? true : false,
    });
  };

  const handleFileInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // modal onchanges start

  const [newDeliveryMethod, setNewDeliveryMethod] = useState(null);

  const handleChange = (e) => {
    setNewDeliveryMethod(e.target.value);
  };

  const handleSaveNewDeliveryMethod = async () => {
    setShow(false);
    console.log(newDeliveryMethod);
    const deliveryData = {
      type: newDeliveryMethod,
      enabled: true,
    };

    const newDeliveryDataResponse = await axios.post(
      `${CommonConstants.BASE_URL}/adddeliverytype`,
      deliveryData
    );
  };

  const addNewMethod = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  // modal onchanges end

  const createNewData = async (e) => {
    console.log(individualUserData);
    e.preventDefault();

    if (individualUserData.id != "") {
      const formData = new FormData();

      console.log(individualUserData.id);

      formData.append(
        "data",
        `{
                "id":"${individualUserData.id}",
                "type":"${individualUserData.type}",
                "text":"${individualUserData.text}",
                "partnerBankId":${individualUserData.partnerBankId},
                "enabled":${individualUserData.enabled},
                "hasIssue":${individualUserData.hasIssue}
            }`
      );

      formData.append("logo", selectedFile);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: CommonConstants.BASE_URL+"/updatedeliverymethod",
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.status == true) {
            console.log(JSON.stringify(response.data));
            navigate("/deliveryMethod");
          } else {
            navigate("/deliveryMethodCreate");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(selectedType,'kk',text,'kk',partnerBankId);
      console.log("start new");

      const formData = new FormData();

      formData.append(
        "data",
        `{
                "type":"${selectedType}",
                "text":"${text}",
                "partnerBankId":${partnerBankId},
                "enabled":${enabled},
                "hasIssue":${hasIssue}
            }`
      );

      formData.append("logo", selectedFile);

      // let config = {
      //   method: "post",
      //   maxBodyLength: Infinity,
      //   url: "http://testapi.gvmtechnologies.com:8080/adddeliverymethod",
      //   headers: { "Content-Type": "multipart/form-data" },
      //   data: formData,
      // };

      // axios
      //   .request(config)
      //   .then((response) => {
      //     if (response.data.status == true) {
      //       console.log(JSON.stringify(response.data));
      //       navigate(" /deliveryMethod");
      //     } else {
      //       navigate("/deliveryMethodCreate");
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  };

  useEffect(() => {
    getPartnerBankData();
    getType();

    if (id) {
      const payload = {
        id: id,
      };
      console.log("id", id);
      axios
        .post(`${CommonConstants.BASE_URL}/getdeliverymethodbyid`, {
          id: payload.id,
        })
        .then((res) => {
          console.log(res.data.data);
          setIndividualUserData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  console.log(individualUserData);

  return (
    <>
      <section>
        <Container>
          <div className="mainBoxService mt-5">
            <div className="serviceHeader purpleBackground text-white rounded-2">
              <h3 className="text-white ms-5 bolder pt-4 pb-3 pb-2 pe-4">
                Delivery Methods
              </h3>
              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Container>
                  <Row>
                    <Form.Group controlId="formGridState">
                      <Form.Label>Default Partner Bank</Form.Label>
                      <div className="d-flex">
                        <Col className="col-lg-11 px-0">
                          <Form.Select
                            value={
                              individualUserData
                                ? individualUserData.type
                                : selectedType
                            }
                            onChange={handleTypeChange}
                            name="type"
                            disabled={id}
                          >
                            <option>Select Type</option>
                            {type &&
                              type.map((typeName, index) => {
                                return (
                                  <option value={typeName.type} key={index}>
                                    {typeName.type}
                                  </option>
                                );
                              })}
                          </Form.Select>
                        </Col>
                        <Col className="col-lg-1 m-auto ms-3 ps-0">
                          <a
                            // href="#!"
                            className="purpleBackground btn btn-default text-white bolder py-3 d-block AddButton"
                            onClick={id ? "return false" : addNewMethod}
                          >
                            {" "}
                            Add
                          </a>
                        </Col>
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group controlId="formGridState" className="mt-3">
                      <Form.Label>Default Partner Bank</Form.Label>
                      <Form.Select
                        value={
                          individualUserData
                            ? individualUserData.partnerBankId
                            : partnerBankId
                        }
                        onChange={handleChangeBank}
                        name="partnerBankId"
                      >
                        <option>Select Default Partner Bank</option>
                        {partnerBank &&
                          partnerBank.map((partnerBankName, index) => {
                            // { console.log(partnerBankName.name) }
                            // { console.log(individualUserData.partnerBankId) }
                            return (
                              <option value={partnerBankName.id}>
                                {partnerBankName.name}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </Form.Group>
                    <Row>
                      <div className="d-flex mt-3">
                        <input
                          type="radio"
                          id="vehicle1"
                          name="enabled"
                          value="true"
                          className="main-radio mt-2"
                          onChange={handleChangeEnabled}
                        />
                        <label for="vehicle5" className="ms-2 radio">
                          Enabled
                        </label>
                      </div>
                      <div className="d-flex">
                        <input
                          type="radio"
                          id="vehicle2"
                          name="enabled"
                          value="false"
                          className="main-radio mt-2"
                          onChange={handleChangeEnabled}
                        />
                        <label for="vehicle5" className="ms-2 radio">
                          Disabled
                        </label>
                      </div>
                    </Row>
                    <Row>
                      <Form.Group
                        as={Col}
                        controlId="formGridCity"
                        className="border-0 mt-1"
                      >
                        <Form.Label>Logo</Form.Label>
                        <Form.Control
                          type="file"
                          className="rounded-0 border-0"
                          onChange={handleFileInputChange}
                        />
                      </Form.Group>
                    </Row>
                  </Row>
                  <Row>
                    <div className="row d-flex m-auto mt-3">
                      <div className="col-lg-2 pb-4 ps-0">
                        <a
                          href="#!"
                          className="purpleBackground btn btn-default text-white bolder d-block"
                          onClick={createNewData}
                        >
                          {" "}
                          Create
                        </a>
                      </div>
                    </div>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </Container>
        <Modal show={show} centered>
          <Modal.Header onHide={handleClose} closeButton>
            <Modal.Title className="p-0 m-0"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="bolder text-center">Add New Delivery Method</h3>
            <br></br>
            <Form.Group as={Col} className="" controlId="formGridCity">
              <Col className="px-0">
                <Form.Label className="fs-5"> Default Partner Bank </Form.Label>
                <Form.Control
                  className="fs-5"
                  id="PaymentName"
                  type="text"
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <br />
            <br />
            <Row className="justify-content-center">
              <Col className="col-lg-5 px-0 justify-content-center d-flex">
                <Button
                  variant="primary"
                  className="w-75 py-3"
                  onClick={handleSaveNewDeliveryMethod}
                >
                  Save
                </Button>
              </Col>
              <Col className="col-lg-5 px-0 justify-content-center d-flex">
                <Button
                  variant="secondary"
                  className="w-75 py-3"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </section>
    </>
  );
}

export default DeliveryMethodCreate;
