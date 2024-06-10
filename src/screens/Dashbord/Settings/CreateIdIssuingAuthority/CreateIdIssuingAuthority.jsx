import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { CommonConstants } from "../../../../Constants/common.constants"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../ModalComponent";

export default function CreateIdIssuingAuthority(props) {
  const [key, setKey] = useState("pay1");
  const [key1, setKey1] = useState("payinner1");
  const [key2, setKey2] = useState("payinners1");
  const [Country, setCountry] = useState([])
  const [Nationality, setNationality] = useState([])
  const [onChangeNationality, setonChangeNationality] = useState('')
  const [id, setId] = useState(props.location.state)
  const [countryAuthority, setcountryAuthority] = useState('')
  const [nationalityAuthority, setnationalityAuthority] = useState('')
  const [nationalityAuthorityName, setcountryAuthorityName] = useState('')
  const [CountryDetails, setSelectedCountry] = useState();
  const [countryNameInfo, setcountryNameInfo] = useState("");
  const [countryIDInfo, setcountryIDInfo] = useState();
  const [onNationality, setonNationality] = useState("")
  const [nationalityname, setnationalityname] = useState("")
  const [error, setError] = useState(false);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [idIssuingAuth, setIdIssuingAuth] = useState({
    id: "",
    countryId: "",
    nationality: "",
    authorityName: ""
  })

  const navigate = useNavigate();
  const GetAllNationalities = async (NationalityName) => {
    try {
      const response = await axios.get(CommonConstants.BASE_URL + "/getallnationality");
      setNationality(response.data.data)
    }
    catch (err) {
      console.log(err)
    }
  };

  const getSelectedCountry = (e) => {
    const { name, value } = e.target;
    setIdIssuingAuth({ ...idIssuingAuth, [name]: Number(value) })
  }

  const getSelectedNationality = async (e) => {
    const { name, value } = e.target;
    setIdIssuingAuth({ ...idIssuingAuth, [name]: value })
  }

  const getSelectedText = (e) => {
    const { name, value } = e.target;
    if (name == "authorityName") {
      const alphabeticValue = e.target.value.replace(/[^A-Za-z\s]/g, "");
      setIdIssuingAuth({ ...idIssuingAuth, [name]: alphabeticValue });
    } else {
      setIdIssuingAuth({ ...idIssuingAuth, [name]: value });
    }
  }

  const createIdIssueAuthorityForCountry = async (values) => {
    if (id) {
      try {
        const ADDISSUAutho = {
          id: id,
          countryId: idIssuingAuth.countryId,
          nationality: "",
          authorityName: idIssuingAuth.authorityName
        }
        const response = await axios.post(CommonConstants.BASE_URL + "/updateissueauthority", ADDISSUAutho);
        if (response.data.status === true) {
          navigate("/id-issuing-authority")
        }
        else if (response.data.status === "error") {
          navigate("/create-id-issuing-authority")
        }
      }
      catch (err) {
        console.log(err)
      }
    } else {
      try {
        if (idIssuingAuth.authorityName == "" || idIssuingAuth.authorityName == undefined) {
          setError(true);
        } else if (idIssuingAuth.countryId == "" || idIssuingAuth.countryId == undefined) {
          setError(true);
        } else {
          const ADDISSUAutho = {
            countryId: idIssuingAuth.countryId,
            nationality: "",
            authorityName: idIssuingAuth.authorityName
          }
          const response = await axios.post(CommonConstants.BASE_URL + "/addissueauthority", ADDISSUAutho);
          if (response.data.status === true) {
            navigate("/id-issuing-authority")
          }
          else if (response.data.statuscode === 200) {
            setModalShowAdd(true);
          }
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  };
  const createIdIssueAuthorityForNationality = async (values) => {
    if (id) {
      try {
        const ADDISSUAutho = {
          id: id,
          countryId: "",
          nationality: idIssuingAuth.nationality,
          authorityName: idIssuingAuth.authorityName
        }
        const response = await axios.post(CommonConstants.BASE_URL + "/updateissueauthority", ADDISSUAutho);
        if (response.data.status === true) {
          navigate("/id-issuing-authority")
        }
        else if (response.data.status === "error") {
          navigate("/create-id-issuing-authority")
        }
      }
      catch (err) {
        console.log(err)
      }

    } else {
      try {
        if (idIssuingAuth.nationality == "" || idIssuingAuth.nationality == undefined) {
          setError(true);
        } else if (idIssuingAuth.authorityName == "" || idIssuingAuth.authorityName == undefined) {
          setError(true);
        } else {
          const ADDISSUAutho = {
            countryId: idIssuingAuth.countryId,
            nationality: idIssuingAuth.nationality,
            authorityName: idIssuingAuth.authorityName
          }
          const response = await axios.post(CommonConstants.BASE_URL + "/addissueauthority", ADDISSUAutho);
          if (response.data.status === true) {
            navigate("/id-issuing-authority")
          }
          else if (response.data.status === "error") {
            // navigate("/create-id-issuing-authority")
          }
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  };

  const GetAllCountrys = async (values) => {
    try {

      const response = await axios.get(CommonConstants.BASE_URL + "/getallcountries");
      if (response.data.status === true) {
        setCountry(response.data.data)

      }
      else if (response.data.status === "error") {
        console.log(response.data.message)
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  const [activeState, setActiveState] = useState("CountryWise")

  const getIdIssuingAuthDataforId = async () => {
    if (id) {
      try {
        const PaymentId = {
          id: props.location.state
        }

        const response = await axios.post(CommonConstants.BASE_URL + "/getissueauthoritybyid", PaymentId);
        if (response.data.status === true) {
          if (response.data.data.countryId == 0) {
            setActiveState("NationalityWise")
          } else {
            setActiveState("CountryWise")
          }
          setIdIssuingAuth(response.data.data)
        }
        else if (response.data.status === "error") {
          console.log(response.data.message)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  }
  useEffect(() => {
    GetAllCountrys()
    GetAllNationalities()
    getIdIssuingAuthDataforId()
  }, [onChangeNationality, CountryDetails, countryNameInfo, onNationality])

  const handleCancel = () => {
    navigate("/id-issuing-authority")
  }
  const handleSubmit = () => {
    setModalShowAdd(false);
  };

  return (
    <>
      <section onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <Container>
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-white rounded-2">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                {id ? "Update" : "Create"} Id Issuing Authority
              </h3>

              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Container className="">
                  <Tabs
                    defaultActiveKey={activeState}
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                    key={activeState}
                  >
                    <Tab eventKey="CountryWise" title="CountryWise">
                      <Row className="mb-4">
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>Country</Form.Label>
                          <Form.Select onChange={getSelectedCountry} id="selectCountries" name="countryId" value={idIssuingAuth.countryId}>
                            <option value="">Select Country</option>
                            {Country &&
                              Country.map((countryname, index) => {

                                return (
                                  <option value={countryname.id} >{countryname.name}</option>
                                );
                              })}
                          </Form.Select>
                        </Form.Group>
                        {error && !idIssuingAuth.countryId && <small className="responsiveFontLarge  text-danger">Please Select Country </small>}
                      </Row>
                      <Row className="mb-4">
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>Id Issuing Authority</Form.Label>
                          <Form.Control type="text" id="IdIssuingValue" name="authorityName" onChange={getSelectedText} value={idIssuingAuth.authorityName} />
                        </Form.Group>
                        {error && !idIssuingAuth.authorityName && <small className="responsiveFontLarge  text-danger">Please Enter Issuing Authority Name  </small>}
                      </Row>
                      <div className="row d-flex m-auto pt-3 border-top">

                        <a
                          className="purpleBackground btn btn-default text-white bolder d-block w-auto"
                          onClick={createIdIssueAuthorityForCountry}
                        > {id ? "Update" : "Create"}
                        </a>
                        &nbsp;
                        &nbsp;
                        <a
                          className="btn btn-default ms-3 text-black bolder border 2 w-auto"
                          onClick={handleCancel}
                        > Cancel
                        </a>
                      </div>
                    </Tab>
                    <Tab eventKey="NationalityWise" title="NationalityWise">
                      <Row className="mb-4">
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>Nationality</Form.Label>
                          <Form.Select id="nationSelect" onChange={getSelectedNationality} name="nationality" value={idIssuingAuth.nationality}>
                            <option value="">Select Nationality</option>
                            {Nationality &&
                              Nationality.map((nationalityname, index) => {
                                return (
                                  <option key={index} value={nationalityname.nationality}> {nationalityname.nationality}</option>
                                );
                              })}
                          </Form.Select>
                        </Form.Group>
                        {error && !idIssuingAuth.nationality && <small className="responsiveFontLarge  text-danger">Please Select Nationality </small>}
                      </Row>

                      <Row className="mb-4">
                        <Form.Group as={Col} controlId="formGridCity">
                          <Form.Label>Id Issuing Authority</Form.Label>
                          <Form.Control type="text" id="IdIssuingValue" name="authorityName" onChange={getSelectedText} value={idIssuingAuth.authorityName} />
                        </Form.Group>
                        {error && !idIssuingAuth.authorityName && <small className="responsiveFontLarge  text-danger">Please Enter Id Issuing Authority </small>}
                      </Row>
                      <div className="row d-flex m-auto mt-3">

                        <a
                          className="purpleBackground btn btn-default text-white bolder d-block w-auto"
                          onClick={createIdIssueAuthorityForNationality}
                        > {id ? "Update" : "Create"}
                        </a>
                        &nbsp;&nbsp;
                        &nbsp;
                        <a
                          className="btn btn-default text-black bolder border 2 w-auto"
                          onClick={handleCancel}
                        > Cancel
                        </a>
                      </div>
                    </Tab>
                  </Tabs>
                </Container>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <ModalComponent
        show={modalShowAdd}
        title11={"Issue authority already exist with this nationality"}
        onHide={() => setModalShowAdd(false)}
      />
    </>
  );
}



