import React, { useState ,useEffect} from "react";

import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { CommonConstants } from "../../../../Constants/common.constants";


export default function UpdatePaymentMethods(props) {
  const [visible, setVisible] = useState(true);

  const navigate = useNavigate()

  const [Country, setCountry] = useState([])
  const [UpdatePaymenData,setUpdatePaymenData] =useState("")
  const [UpdateRadioChecked,setUpdateRadioChecked] =useState(false)
  const [Imagelogo,setImagelogo]=useState(null)
  const [FilePath,setFilePath]=useState([])

  // console.log(props.location.state,"idUp")

  useEffect(()=>{
    GetAllCountrys()
    getPaymentDataforId()
  },[])

  const getPaymentDataforId = async () => {
    try {
      const PaymentId={
        id:props.location.state
      }
  
      const response = await axios.post(CommonConstants.BASE_URL + "/getpaymentmethodbyid",PaymentId);
      // console.log(response.data.data,"ooo")
      if (response.data.status === true) {
          // console.log(response.data.data)
          setUpdatePaymenData(response.data.data)
          setUpdateRadioChecked(response.data.data.enabled)
      }
      else if (response.data.status === "error") {
          // console.log(response.data.message)
      }
    }  
    catch (err) {
        // console.log(err)
    }
  }
  
  const UpadatePaymentDataforId = async () => {
  
    const FormData = require('form-data');
    let data = new FormData();
    data.append('data', 
    `{
      "id":${props.location.state},
      "name":"${document.getElementById("PaymentName").value}",
      "enabled":${UpdateRadioChecked}
    }`);
    data.append('logo', Imagelogo );

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: CommonConstants.BASE_URL+'/updatepaymentmethod',
      headers: {'Content-Type': 'multipart/form-data'},
      data : data
    };

    axios.request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      // navigate("/payment-methods")
    })
    .catch((error) => {
      // console.log(error);
    });
  }

  const ImageSend=(e)=>{
    // console.log(e.target.files[0] ,"iii")
    setImagelogo(e.target.files[0]);
    // setFilePath(URL.createObjectURL(e.target.files[0]));
  }

  const GetAllCountrys = async (values) => {
    try {
  
        const response = await axios.get(CommonConstants.BASE_URL + "/getallcountries");
        // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
        if (response.data.status === true) {
            // // console.log(response.data.data)
            setCountry(response.data.data)
        }
        else if (response.data.status === "error") {
            // console.log(response.data.message)
        }
    }

    
    catch (err) {
        // console.log(err)
    }
  };

  const ChangeRadioEnableorDisable=(e)=>{
    // console.log(e.target.value,"lll")
    setUpdateRadioChecked(e.target.value==="enable" ? true : false)
  }

  return (
    <>
      <section      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
        <Container>
          <div className="mainBoxService mt-5">
            <div className="serviceHeader purpleBackground text-white rounded-2">
              <h3 className="text-white ms-5 bolder pt-4 pb-3 pb-2 pe-4">
                Payment Methods
              </h3>
              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Container className="">
                  <Row className="mb-4">
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label> Name</Form.Label>
                      <Form.Control id="PaymentName" defaultValue={UpdatePaymenData.name} disabled/>
                    </Form.Group>
                  </Row>

                  <Row className="mb-4">
                        <Form.Group
                          as={Col}
                          controlId="formGridCity"
                          className="border-0"
                        >
                          <Form.Label>Logo</Form.Label>
                          <Form.Control
                            type="file"
                            id="PaymentLogo"
                            className="rounded-0 border-0"
                            onChange={ImageSend}
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-4">
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>Country</Form.Label>
                          <Form.Select defaultValue="Choose...">
                            <option>Select Country</option>
                            {Country &&
                            Country.map((countryname, index) => {

                              return (
                                <option value={countryname.id}>{countryname.emoji}&nbsp;&nbsp;{countryname.name}</option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                      </Row>

                      <Row className="mb-4">
                        <div className="d-flex ">
                          <input
                            type="radio"
                            id="vehicle1"
                            name="vehicle5"
                            value="enable"
                            className="main-radio"
                            checked={UpdateRadioChecked}
                            onChange={ChangeRadioEnableorDisable}
                          />
                          <label for="vehicle5" className="ms-2">
                          Enabled
                          </label>
                        </div>
                        <div className="d-flex">
                          <input
                            type="radio"
                            id="vehicle2"
                            name="vehicle5"
                            value="disable"
                            className="main-radio"
                            checked={!UpdateRadioChecked}
                            onChange={ChangeRadioEnableorDisable}
                          />
                          <label for="vehicle5" className="ms-2">
                          Disabled
                          </label>
                        </div>
                      </Row>

                      <div className="row d-flex m-auto mt-3">
                        <div className="col-lg-2 pb-4 ps-0">
                        <a
                    // href=""
                    className="purpleBackground btn btn-default text-white bolder d-block"
                    onClick={UpadatePaymentDataforId}
                  > Update
                  </a>
                        </div>
                      </div>
                </Container>
              </div>
            </div>
          </div>
        </Container>

   
      </section>
    </>
  );
}
