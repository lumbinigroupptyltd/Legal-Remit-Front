// import React, { useState, useEffect } from "react";

// import {
//   Container,
//   Image,
//   Form,
//   Row,
//   Col,
//   Button,
//   Modal,
// } from "react-bootstrap";

// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Select from "react-select";


// import { CommonConstants } from "../../../../Constants/common.constants";


// export default function CreatePaymentMethods(props) {

//   const navigate = useNavigate()
//   const [Country, setCountry] = useState([])
//   const [UpdateRadioChecked, setUpdateRadioChecked] = useState(true)
//   const [Imagelogo, setImagelogo] = useState(null)
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const [newPaymentMethod, setNewPaymentMethod] = useState(null)

//   const handleChange = (e) => {
//     setNewPaymentMethod(e.target.value)
//   }

//   const handleSaveNewPaymentMethod = async () => {
//     setShow(false)
//     console.log(newPaymentMethod)
//     const paymentData = {
//       name: newPaymentMethod
//     }

//     const newPaymentDataResponse = await axios.post(`${CommonConstants.BASE_URL}/addpaymentname`, paymentData)
//   }

//   useEffect(() => {
//     console.log(UpdatePaymenData)
//     GetAllCountrys()
//     getallpaymentmethods()
//     getPaymentDataforId()
//     GetAllCountryss()
//   }, [])

//   const GetAllCountrys = async (values) => {
//     try {

//       const response = await axios.get(CommonConstants.BASE_URL + "/getallcountries");
//       // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
//       if (response.data.status === true) {

//         console.log(response.data.data)
//         setCountry(response.data.data)

//       }
//       else if (response.data.status === "error") {
//         console.log(response.data.message)
//       }
//     }
//     catch (err) {
//       console.log(err)
//     }
//   };

//   const [selectedCountry, setSelectedCountry] = useState([])
//   const getselectedCountry = (e) => {
//     const { name, value } = e.target
//     console.log(value)
//     setSelectedCountry(parseInt(value))
//   }





//   const [paymentMethod, setPaymentMethod] = useState([])
//   const [id, setId] = useState(props.location.state)
//   console.log(id, "nakeeb")

//   const getallpaymentmethods = async () => {

//     try {

//       let paymentMethodResponse = await axios.get(CommonConstants.BASE_URL + "/getallactivepaymentmethods")
//       console.log(paymentMethodResponse.data.data)
//       setPaymentMethod(paymentMethodResponse.data.data)

//     } catch (error) {
//       console.log(error)
//     }

//   }

//   const [selectedName, setSelectedName] = useState("")
//   const [UpdatePaymenData, setUpdatePaymenData] = useState({
//     id: "",
//     name: "",
//     enabled: "",
//   })


//   const handleNameChange = (e) => {
//     const { name, value } = e.target;
//     setSelectedName(value)
//     console.log(UpdatePaymenData)
//     setUpdatePaymenData({ ...UpdatePaymenData, [name]: value })
//   }

//   const handleOptionChange = (options) => {

//     console.log(options)

//     if (Array.isArray(options)) {
//       setSelectedName(options.map((opt) => opt.value))
//     }
//   }



//   const getPaymentDataforId = async () => {
//     try {
//       const PaymentId = {
//         id: props.location.state
//       }

//       const response = await axios.post(CommonConstants.BASE_URL + "/getpaymentmethodbyid", PaymentId);
//       console.log(response.data.data, "ooo")
//       if (response.data.status === true) {
//         console.log(response.data.data)
//         setUpdatePaymenData(response.data.data)
//       }
//       else if (response.data.status === "error") {
//         console.log(response.data.message)
//       }
//     }
//     catch (err) {
//       console.log(err)
//     }
//   }


//   console.log(UpdatePaymenData)



//   const [countryGet, setCountryGet] = useState([]);
//   const [menuOpen, setMenuOpen] = useState(undefined);

//   const GetAllCountryss = async (values) => {
//     try {

//       const response = await axios.get(CommonConstants.BASE_URL + "/getallpaymentmethodname");
//       console.log(response)
//       if (response.data.status === true) {

//         console.log('mainGet', response.data.data)

//         const optionsForCountry = response.data.data.map(country => ({
//           value: country.id,
//           label: country.name
//         }));
//         setCountryGet(optionsForCountry)


//       }
//       else if (response.data.status === "error") {
//         console.log(response.data.message)
//       }
//     }


//     catch (err) {
//       console.log(err)
//     }
//   };

//   const onOptionChange = selectedOptions => {
//     if (countryGet.length === selectedOptions.length) {
//       setMenuOpen(false);
//     }
//   };

//   const onMenuOpen = () => {
//     if (menuOpen !== undefined) setMenuOpen(undefined);
//   };











//   const ImageSend = (e) => {
//     const { name, files } = e.target
//     console.log(e.target.files[0])
//     setImagelogo(e.target.files[0]);
//     setUpdatePaymenData({ ...UpdatePaymenData, [name]: files[0] })
//   }

//   // console.log(document.getElementById("PaymentName").value)
//   console.log(UpdateRadioChecked)
//   console.log(Imagelogo)

//   const CreatePaymentMethod = () => {



//     if (id) {

//       console.log(id, "in create")
//       console.log(selectedName, "selectedName")
//       console.log(selectedCountry, "selectedCountry")
//       console.log(UpdateRadioChecked, "UpdateRadioChecked")

//       const FormData = require('form-data');
//       let data = new FormData();

//       const dataToSend = {
//         id: id,
//         paymentNameIds: selectedName,
//         countryId: selectedCountry,
//         enabled: UpdateRadioChecked
//       }


//       data.append('data', JSON.stringify(dataToSend)
//         //     `{
//         //   "id":${props.location.state},
//         //   "paymentNameIds":"${selectedName}",
//         //   "countryId":"${selectedCountry}",
//         //   "enabled":${UpdateRadioChecked}
//         // }`
//       );
//       data.append('logo', Imagelogo);

//       let config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'http://testapi.gvmtechnologies.com:8080/updatepaymentmethod',
//         headers: { 'Content-Type': 'multipart/form-data' },
//         data: data
//       };

//       axios.request(config)
//         .then((response) => {
//           console.log(JSON.stringify(response.data));
//           navigate("/payment-methods")
//         })
//         .catch((error) => {
//           console.log(error);
//         });

//     } else {

//       console.log(id, "in create")
//       console.log(selectedName, "selectedName")
//       console.log(selectedCountry, "selectedCountry")
//       console.log(UpdateRadioChecked, "UpdateRadioChecked")

//       const FormData = require('form-data');
//       let data = new FormData();

//       const dataToSend = {
//         paymentNameIds: selectedName,
//         countryId: selectedCountry,
//         enabled: UpdateRadioChecked
//       }

//       data.append('data', JSON.stringify(dataToSend)
//         //     `{
//         //   "paymentNameIds":${selectedName},
//         //   "countryId":${selectedCountry},
//         //   "enabled":${UpdateRadioChecked}
//         // }`
//       );
//       data.append('logo', Imagelogo);

//       let config = {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: 'http://testapi.gvmtechnologies.com:8080/addpaymentmethod',
//         headers: { 'Content-Type': 'multipart/form-data' },
//         data: data
//       };

//       axios.request(config)
//         .then((response) => {
//           console.log(JSON.stringify(response.data));
//           navigate("/payment-methods")
//         })
//         .catch((error) => {
//           console.log(error);
//         });

//     }


//   }

//   const ChangeRadioEnableorDisable = (e) => {
//     const { name, value } = e.target
//     setUpdateRadioChecked(value == "enable" ? true : false)
//     console.log(value)
//     setUpdatePaymenData({ ...UpdatePaymenData, [name]: value == "enable" ? true : false })
//   }

//   return (
//     <>
//       <section>
//         <Container>
//           <div className="mainBoxService mt-5">
//             <div className="serviceHeader purpleBackground text-white rounded-2">
//               <h3 className="text-white ms-5 bolder pt-4 pb-3 pb-2 pe-4">
//                 Payment Methods
//               </h3>
//               <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
//                 <Container className="">
//                   <Row className="mb-4 d-flex">
//                     <Form.Group as={Col} className="" controlId="formGridCity" >
//                       <Form.Label> Name</Form.Label>
//                       <div className="d-flex">


//                         {/* <Col className="col-lg-11 px-0">
//                           <Form.Select value={UpdatePaymenData ? UpdatePaymenData.name : selectedName} onChange={handleNameChange} name="name" disabled={id}>
//                             <option>Select Payment Method</option>
//                             {paymentMethod &&
//                               paymentMethod.map((paymentMethodName, index) => {
//                                 return (
//                                   <option value={paymentMethodName.name} key={index}>{paymentMethodName.name}</option>
//                                 );
//                               })}
//                           </Form.Select>
//                         </Col> */}

//                         <Select
//                           defaultValue={[countryGet[0]]}
//                           isMulti
//                           menuIsOpen={menuOpen}
//                           name="colors"
//                           options={countryGet}
//                           className="basic-multi-select payment-select"
//                           classNamePrefix="select"
//                           closeMenuOnSelect={false}
//                           onChange={handleOptionChange}
//                           onMenuOpen={onMenuOpen}
//                         />


//                         <Col className="col-lg-1 m-auto ms-3 ps-0">
//                           <a
//                             // href="#!"
//                             className="purpleBackground btn btn-default text-white bolder py-3 d-block AddButton"
//                             onClick={id ? "return false" : handleShow}
//                           > Add
//                           </a>
//                           {/* </div> */}
//                         </Col>
//                       </div>
//                     </Form.Group>
//                   </Row>



//                   <Row className="mb-4">
//                     <Form.Group
//                       as={Col}
//                       controlId="formGridCity"
//                       className="border-0"
//                     >
//                       <Form.Label>Logo</Form.Label>
//                       <Form.Control
//                         type="file"
//                         className="rounded-0 border-0"
//                         onChange={ImageSend}
//                       />
//                     </Form.Group>
//                   </Row>

//                   <Row className="mb-4">
//                     <Form.Group as={Col} controlId="formGridState">
//                       <Form.Label>Country</Form.Label>
//                       <Form.Select onChange={getselectedCountry} name="countryId">
//                         <option>Select Country</option>
//                         {Country &&
//                           Country.map((countryname, index) => {

//                             return (
//                               <option value={countryname.id}>{countryname.emoji}&nbsp;&nbsp;{countryname.name}</option>
//                             );
//                           })}
//                       </Form.Select>

//                     </Form.Group>
//                   </Row>

//                   <Row className="mb-4">
//                     <div className="d-flex ">
//                       <input
//                         type="radio"
//                         id="vehicle1"
//                         name="enabled"
//                         value="enable"
//                         className="main-radio"
//                         onChange={ChangeRadioEnableorDisable}
//                       />
//                       <label for="vehicle5" className="ms-2">
//                         Enabled
//                       </label>
//                     </div>
//                     <div className="d-flex">
//                       <input
//                         type="radio"
//                         id="vehicle2"
//                         name="enabled"
//                         value="disable"
//                         className="main-radio"
//                         onChange={ChangeRadioEnableorDisable}
//                       />
//                       <label for="vehicle5" className="ms-2">
//                         Disabled
//                       </label>
//                     </div>
//                   </Row>

//                   <div className="row d-flex m-auto mt-3">
//                     <div className="col-lg-2 pb-4 ps-0">
//                       <a
//                         // href="#!"
//                         className="purpleBackground btn btn-default text-white bolder d-block"
//                         onClick={CreatePaymentMethod}
//                       > Create
//                       </a>
//                     </div>
//                   </div>
//                 </Container>
//               </div>
//             </div>
//           </div>

//         </Container>
//         {/* <Modal
//       // {...props}
//       size="xl"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           Modal heading
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Centered Modal</h4>
//         <p>
//           Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//           dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//           consectetur ac, vestibulum at eros.
//         </p>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal> */}

//         <Modal show={show} centered>
//           <Modal.Header onHide={handleClose} closeButton >
//             <Modal.Title className="p-0 m-0"></Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <h3 className="bolder text-center">Add New Payment Method</h3><br></br>
//             <Form.Group as={Col} className="" controlId="formGridCity" >
//               <Col className="px-0">
//                 <Form.Label className="fs-5"> Name </Form.Label>
//                 <Form.Control className="fs-5" id="PaymentName" onChange={handleChange} />
//               </Col>
//             </Form.Group>
//             <br />
//             {/* <hr></hr> */}
//             <br />
//             <Row className="justify-content-center">
//               <Col className="col-lg-5 px-0 justify-content-center d-flex">
//                 <Button variant="primary" className="w-75 py-3" onClick={handleSaveNewPaymentMethod}>
//                   Save New Method
//                 </Button>
//               </Col>
//               <Col className="col-lg-5 px-0 justify-content-center d-flex">
//                 <Button variant="secondary" className="w-75 py-3" onClick={handleClose}>
//                   Cancel Method
//                 </Button>
//               </Col>
//             </Row>
//           </Modal.Body>

//           <Modal.Footer>

//           </Modal.Footer>
//         </Modal>
//       </section>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";

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
import axios from "axios";
import Select from "react-select";
import { CommonConstants } from "../../../../Constants/common.constants";

export default function CreatePaymentMethods(props) {

  const navigate = useNavigate()
  const [Country, setCountry] = useState([])
  const [UpdateRadioChecked, setUpdateRadioChecked] = useState(true)
  const [Imagelogo, setImagelogo] = useState()
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedLogo, setselectedLogo] = useState();
  const [error, setError] = useState(false);
  const [enabled, setenabled] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const [newPaymentMethod, setNewPaymentMethod] = useState(null)

  const handleChange = (e) => {
    setNewPaymentMethod(e.target.value)
  }

  const handleSaveNewPaymentMethod = async () => {
    const paymentData = {
      name: newPaymentMethod
    }

    const newPaymentDataResponse = await axios.post(`${CommonConstants.BASE_URL}/addpaymentname`, paymentData)
    setShow(false)
    // navigate("/create-payment-methods")
  }

  const isActiveMark = (e) => {
    const value = e.target.checked;
    setenabled(value);
  }
  useEffect(() => {
    GetAllCountrys()
    getallpaymentmethods()
    getPaymentDataforId()
    // GetAllCountryss()
  }, [show, showDelete])

  const GetAllCountrys = async (values) => {
    try {

      const response = await axios.get(CommonConstants.BASE_URL + "/getallcountries");
      // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {

        setCountry(response.data.data)

      }
      else if (response.data.status === "error") {
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  const [selectedCountry, setSelectedCountry] = useState()

  const getselectedCountry = (e) => {

    const { name, value } = e.target
    setSelectedCountry(parseInt(value))
    setUpdatePaymenData({ ...UpdatePaymenData, [name]: parseInt(value) })

  }





  const [paymentMethod, setPaymentMethod] = useState([])
  const [id, setId] = useState(props.location.state)

  const getallpaymentmethods = async () => {

    try {

      let paymentMethodResponse = await axios.get(CommonConstants.BASE_URL + "/getallpaymentmethodname")
      setPaymentMethod(paymentMethodResponse.data.data)

    } catch (error) {
      console.log(error)
    }

  }

  const [selectedName, setSelectedName] = useState("")
  const [UpdatePaymenData, setUpdatePaymenData] = useState({
    id: "",
    paymentNameId: "",
    logo: "",
    countryId: [],
    enabled: "",
    isCustomized: false
  })


  const [selectPaymentMethod, setSelectPaymentMethod] = useState("")
  const handleNameChange = (e) => {
    const { name, value } = e.target;
    setSelectedName(value)
    setSelectPaymentMethod(e.target.options[e.target.selectedIndex].text)
    setUpdatePaymenData({ ...UpdatePaymenData, [name]: parseInt(value) })
    setselectedLogo(value);
  }

  // const handleOptionChange = (options) => {

  //   console.log(options)

  //   if (Array.isArray(options)) {
  //     setSelectedName(options.map((opt) => opt.value))
  //   }
  // }




  const getPaymentDataforId = async () => {
    // if(id){

    // }
    try {
      const PaymentId = {
        id: props.location.state
      }

      const response = await axios.post(CommonConstants.BASE_URL + "/getpaymentmethodbyid", PaymentId);
      if (response.data.status === true) {
        setUpdatePaymenData(response.data.data);
        setenabled(response.data.data.enabled);
      }
      else if (response.data.status === "error") {
        console.log(response.data.message)
      }
    }
    catch (err) {
      console.log(err)
    }
  }





  // const [countryGet, setCountryGet] = useState([]);
  // const [menuOpen, setMenuOpen] = useState(undefined);

  // const GetAllCountryss = async (values) => {
  //   try {

  //     const response = await axios.get(CommonConstants.BASE_URL + "/getallpaymentmethodname");
  //     console.log(response)
  //     if (response.data.status === true) {

  //       console.log('mainGet', response.data.data)

  //       const optionsForCountry = response.data.data.map(country => ({
  //         value: country.id,
  //         label: country.name
  //       }));
  //       setCountryGet(optionsForCountry)


  //     }
  //     else if (response.data.status === "error") {
  //       console.log(response.data.message)
  //     }
  //   }


  //   catch (err) {
  //     console.log(err)
  //   }
  // };

  // const onOptionChange = selectedOptions => {
  //   if (countryGet.length === selectedOptions.length) {
  //     setMenuOpen(false);
  //   }
  // };

  // const onMenuOpen = () => {
  //   if (menuOpen !== undefined) setMenuOpen(undefined);
  // };



  // Delete payment method name start

  const [paymentMethodDelete, setPaymentMethodDelete] = useState("")

  const handlePaymentMethodNameDeleteChange = (e) => {
    const { name, value } = e.target;
    setPaymentMethodDelete(value)
  }


  const handlePaymentMethodNameDelete = async (e) => {
    try {
      const paymentMethodNameToDelete = {
        id: paymentMethodDelete
      }

      const responseDelete = await axios.post(CommonConstants.BASE_URL + "/deletepaymentmethodnamebyid", paymentMethodNameToDelete);
      setShowDelete(false);
      navigate("/create-payment-methods")

    }
    catch (err) {
      console.log(err)
    }
  }

  // Delete payment method name end

  const ImageSend = (e) => {
    const { name, files } = e.target
    setImagelogo(e.target.files[0]);
    setUpdatePaymenData({ ...UpdatePaymenData, [name]: files[0] })
  }

  const handleCancel = () => {
    navigate("/payment-methods")
  }

  const CreatePaymentMethod = async () => {
    if (id) {
      const dataValue = {
        id: UpdatePaymenData.id,
        paymentNameId: UpdatePaymenData.paymentNameId,
        countryId: UpdatePaymenData.countryId,
        enabled: enabled,
        logo: UpdatePaymenData.logo
      }

      axios.post(CommonConstants.BASE_URL + "/updatepaymentmethod", dataValue)
        .then(res => {
          if (res.data.status == true) {
            navigate("/payment-methods")
          } else {
            navigate("/create-payment-methods")
          }
          console.log(res);
        })
        .catch(error => console.log(error));

    } else {
      const respons = await axios.post(CommonConstants.BASE_URL + "/getpaymentnamebyid", { id: selectedLogo });
      var img = respons.data.data?.logo;
      if (!UpdatePaymenData.paymentNameId || UpdatePaymenData.countryId.length === 0) {
        setError(true);
      } else {
        const FormData = require('form-data');
        let data = new FormData();
        const dataValue = {
          paymentNameId: UpdatePaymenData.paymentNameId,
          logo: img,
          countryId: UpdatePaymenData.countryId,
          enabled: enabled,
          isCustomized: true,
        }
        axios.post(CommonConstants.BASE_URL + '/addpaymentmethod', dataValue, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.data.statuscode == 200) {
              navigate("/payment-methods")
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }

  const ChangeRadioEnableorDisable = (e) => {
    const { name, value } = e.target
    setUpdateRadioChecked(value == "enable" ? true : false)
    setUpdatePaymenData({ ...UpdatePaymenData, [name]: value == "enable" ? true : false })
  }


  const [selectedBank, setSelectedBank] = useState("")
  const handleOptionChange = (options) => {
    if (Array.isArray(options)) {
      setSelectedBank(options.map((opt) => opt.value))
      setUpdatePaymenData({ ...UpdatePaymenData, "countryId": options.map((opt) => opt.value) })
    }

  }

  const [menuOpen, setMenuOpen] = useState(undefined);
  const onMenuOpen = () => {
    if (menuOpen !== undefined) setMenuOpen(undefined);

    // if (individualUserData && individualUserData.deliveryTypeName == "Bank Deposit") {
    GetAllCountry()
    // } else {
    //   GetAllBankForWallet()
    // }

  };

  const [showCountry, setShowCountry] = useState([])
  const GetAllCountry = async (values) => {
    try {
      const response = await axios.get(CommonConstants.BASE_URL + "/getallcountries");
      if (response.data.status === true) {
        const optionsForCountry = response.data.data.map(country => ({
          value: country.id,
          label: country.name,
        }));
        setShowCountry(optionsForCountry)
      }
      else if (response.data.status === "error") {
      }
    }
    catch (err) {
      console.log(err)
    }
  };


  return (
    <>
      <section onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <Container>
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-black rounded-2">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Payment Methods
              </h3>
              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Container className="">
                  <Form id="paymentCheck">
                    <Row className="mb-4">
                      <Form.Group as={Col} controlId="formGridState">

                        <Form.Label>Country</Form.Label>

                        {id ?
                          <Form.Select value={UpdatePaymenData && UpdatePaymenData.countryId ? [UpdatePaymenData.countryId] : selectedCountry !== undefined ? [selectedCountry] : "14"} onChange={getselectedCountry} name="countryId" disabled={id} className="required" id="abc">
                            <option value="">Select Country</option>
                            {Country &&
                              Country.map((countryname, index) => {

                                return (
                                  <option key={index} value={countryname.id}>{countryname.emoji}&nbsp;&nbsp;{countryname.name}</option>
                                );
                              })}
                          </Form.Select>
                          :
                          <>
                            <Select
                              isMulti
                              menuIsOpen={menuOpen}
                              name="countryId"
                              options={showCountry}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              closeMenuOnSelect={false}
                              onChange={handleOptionChange}
                              onMenuOpen={onMenuOpen}
                            />
                            {error && (UpdatePaymenData.countryId.length === 0) && <small className="text-danger error_message ms-2 error" >Please select country</small>}
                          </>
                        }
                      </Form.Group>
                    </Row>

                    <Row className="mb-4 d-flex">
                      <Form.Group as={Col} className="" controlId="formGridCity" >
                        <Form.Label> Name</Form.Label>
                        <div className={"d-flex methodName1"}>
                          <Col className="col-lg-12 px-0">
                            <Form.Select value={UpdatePaymenData ? UpdatePaymenData.paymentNameId : selectPaymentMethod} onChange={handleNameChange} name="paymentNameId" disabled={id} className="required">
                              <option value="">Select Payment Method</option>
                              {paymentMethod &&
                                paymentMethod.map((paymentMethodName, index) => {
                                  return (
                                    <option value={paymentMethodName.id} key={index}>{paymentMethodName.name}</option>
                                  );
                                })}
                            </Form.Select>
                            {error && !(UpdatePaymenData.paymentNameId || selectPaymentMethod) && <small className="responsiveFontLarge text-danger error_message ms-2 error" >Please select payment method</small>}
                          </Col>
                        </div>
                      </Form.Group>
                    </Row>

                    <Row className="mb-4">
                      {/* <div className="d-flex ">
                        <input
                          type="radio"
                          id="vehicle1"
                          name="enabled"
                          value="enable"
                          className="main-radio requiredCheckBox"
                          onChange={ChangeRadioEnableorDisable}
                          checked={UpdatePaymenData.enabled === true}
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
                          onChange={ChangeRadioEnableorDisable}
                          checked={UpdatePaymenData.enabled === false}
                        />
                        <label htmlFor="vehicle5" className="ms-2">
                          Disabled
                        </label>
                      </div> */}
                      <div className="mt-3 d-flex">
                        <input
                          type="checkbox"
                          id="vehicle1"
                          name="enabled"
                          value="true"
                          className="main-radio requiredCheckBox"
                          onChange={isActiveMark}
                          checked={enabled}
                        />
                        <label for="vehicle1" className="ms-2">
                          Active
                        </label>
                      </div>

                      {/* <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error checkboxError" >Please select checkbox</small> */}
                    </Row>

                    <div className="row d-flex m-auto pt-3 border-top">

                      <a
                        className="purpleBackground btn btn-default text-white bolder mx-1 w-auto"
                        onClick={CreatePaymentMethod}
                      > {id ? "Update" : "Create"}
                      </a>
                      <a
                        // href="#!"
                        // className="purpleBorder purpleText btn btn-default  bolder d-block"
                        className="btn btn-default text-black bolder border 2 mx-1 w-auto"
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
        {/* <Modal
      // {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal> */}

        <Modal show={show} centered>
          <Modal.Header onHide={handleClose} closeButton >
            <Modal.Title className="p-0 m-0"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="bolder text-center">Add New Payment Method</h3><br></br>
            <Form.Group as={Col} className="" controlId="formGridCity" >
              <Col className="px-0">
                <Form.Label className="fs-5"> Name </Form.Label>
                <Form.Control className="fs-5" id="PaymentName" onChange={handleChange} />
              </Col>
            </Form.Group>
            <br />
            {/* <hr></hr> */}
            <br />
            <Row className="justify-content-center">
              <Col className="col-lg-5 px-0 justify-content-center d-flex">
                <Button variant="primary" className="w-75 py-3" onClick={handleSaveNewPaymentMethod}>
                  Save New Method
                </Button>
              </Col>
              <Col className="col-lg-5 px-0 justify-content-center d-flex">
                <Button variant="secondary" className="btn btn-default ms-3 text-black bolder border 2" onClick={handleClose}>
                  Cancel Method
                </Button>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>

          </Modal.Footer>
        </Modal>

        <Modal show={showDelete} centered>
          <Modal.Header onHide={handleCloseDelete} closeButton >
            <Modal.Title className="p-0 m-0"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="bolder text-center">Delete Payment Method Name</h3><br></br>
            {/* <Form.Group as={Col} className="" controlId="formGridCity" >
              <Col className="px-0">
                <Form.Label className="fs-5"> Name </Form.Label>
                <Form.Control className="fs-5" id="PaymentName" onChange={handleChange} />
              </Col>
            </Form.Group> */}


            <Col className="col-lg-11 px-0">
              <Form.Select onChange={handlePaymentMethodNameDeleteChange} name="paymentMethodName" disabled={id}>
                <option>Select Payment Method Name</option>
                {paymentMethod &&
                  paymentMethod.map((paymentMethodName, index) => {
                    return (
                      <option value={paymentMethodName.id} key={index}>{paymentMethodName.name}</option>
                    );
                  })}
              </Form.Select>
            </Col>
            <br />
            {/* <hr></hr> */}
            <br />
            <Row className="justify-content-center">
              <Col className="col-lg-5 px-0 justify-content-center d-flex">
                <Button variant="primary" className="w-75 py-3" onClick={handlePaymentMethodNameDelete}>
                  Delete
                </Button>
              </Col>
              <Col className="col-lg-5 px-0 justify-content-center d-flex">
                <Button variant="secondary" className="btn btn-default ms-3 text-black bolder border 2" onClick={handleCloseDelete}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>

          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
}

