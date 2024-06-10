


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Form,
//   Row,
//   Col,
//   Button,
//   Modal,
//   Container
// } from "react-bootstrap";
// import Select from "react-select";
// import { useNavigate } from 'react-router-dom'
;

// import { CommonConstants } from '../../../../Constants/common.constants';

// const validator = require("../../../../assets/js/validator")

// function DeliveryMethodCreate(props) {

//   const [id, setId] = useState(props.location.state)

//   console.log()

//   const navigate = useNavigate()

//   const [partnerBank, setPartnerBank] = useState("")
//   const [partnerBankId, setPartnerBankId] = useState("")
//   const [type, setType] = useState("")
//   const [selectedType, setSelectedType] = useState("")
//   const [enabled, setEnabled] = useState(false)
//   const [show, setShow] = useState(false)
//   const [Country, setCountry] = useState([])
//   const [selectedCountry, setSelectedCountry] = useState([])
//   const [bank, setBank] = useState([])
//   const [showDelete, setShowDelete] = useState(false);

//   const handleShowDelete = () => setShowDelete(true);
//   const handleCloseDelete = () => setShowDelete(false);


//   const [menuOpen, setMenuOpen] = useState(undefined);

//   const [individualUserData, setIndividualUserData] = useState({
//     id: "",
//     deliveryTypeId: "",
//     text: "",
//     partnerBankId: "",
//     enabled: "",
//     hasIssue: false,
//     countryId: "",
//     bankId: [],
//     deliveryTypeName: "",
//     estimatedDelivery: "",
//     locationId: "",
//     locationIdNic: "",
//     locationIdCit: "",
//     locationIdEve: "",
//     locationIdNmb: "",
//     locationIdGlo: "",
//     locationIdGme: "",
//     locationIdEsewa: "",
//     locationIdIpay: "",
//     locationIdPrabhu: "",
//     locationIdIme: "",
//     // bankSwiftCode: "",
//     charge: "",
//   })




//   // upload Type Start
//   const getType = async () => {

//     let response = await axios.get(CommonConstants.BASE_URL + "/getactivedeliverytype")
//     setType(response.data.data)
//     console.log(response.data.data)
//   }


//   console.log(individualUserData.deliveryTypeName)
//   const handleTypeChange = (e) => {


//     if (e.target.options[e.target.selectedIndex].text === "Bank Deposit") {
//       GetAllBank()
//     } else {
//       GetAllBankForWallet()
//     }
//     const { name, value } = e.target;
//     console.log(e.target.options[e.target.selectedIndex].text)
//     console.log(value)
//     setSelectedType(e.target.options[e.target.selectedIndex].text)
//     setIndividualUserData({ ...individualUserData, [name]: parseInt(value), ["deliveryTypeName"]: e.target.options[e.target.selectedIndex].text })
//   }


//   // upload Type ends

//   // Partner Bank Start
//   const getPartnerBankData = async () => {

//     let response = await axios.get(CommonConstants.BASE_URL + "/getallactivepartnerbanks")
//     setPartnerBank(response.data.data)
//     console.log(response.data.data)
//   }

//   const handleChangePartnerBank = (e) => {

//     const { name, value } = e.target;
//     console.log(value)
//     setPartnerBankId(value)
//     setIndividualUserData({ ...individualUserData, [name]: parseInt(value) })

//   }
//   // Partner Bank ends

//   const handleChangeEnabled = (e) => {

//     const { name, value } = e.target;
//     setEnabled(value == "true" ? true : false)
//     setIndividualUserData({ ...individualUserData, [name]: value == "true" ? true : false })
//   }

//   //Upload File Starts
//   const [selectedFile, setSelectedFile] = useState(null)
//   const handleFileInputChange = (e) => {

//     const { name, files } = e.target

//     setSelectedFile(e.target.files[0]);
//     setIndividualUserData({ ...individualUserData, [name]: files[0] })

//   }
//   // Upload File end

//   // Countries start
//   const GetAllCountrys = async (values) => {
//     try {

//       const response = await axios.get(CommonConstants.BASE_URL + "/getallcountries");
//       console.log(response)
//       if (response.data.status === true) {
//         console.log(response.data.data)
//         setCountry(response.data.data)
//       }
//       else if (response.data.status === "error") {
//         console.log(response.data.message)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   };

//   const getselectedCountry = (e) => {
//     const { name, value } = e.target
//     console.log(value)
//     setSelectedCountry(parseInt(value))
//     setIndividualUserData({ ...individualUserData, [name]: parseInt(value) })
//   }
//   // Countries end


//   // Bank Name start
//   const GetAllBanks = async (values) => {

//     try {

//       const response = await axios.post(CommonConstants.BASE_URL + "/getallbanks", {});
//       console.log(response)
//       if (response.data.status === true) {
//         console.log(response.data.data)
//         setBank(response.data.data)
//       }
//       else if (response.data.status === "error") {
//         console.log(response.data.message)
//       }
//     } catch (err) {
//       console.log(err)
//     }
//   };

//   const handleCancel = () => {
//     navigate("/deliveryMethod")
//   }

//   // const getselectedBank = (e) => {
//   //     const { name, value } = e.target
//   //     console.log(e.target.value)
//   //     // setIndividualUserData({ ...individualUserData, ["walletId"]: [] })
//   //     setIndividualUserData({ ...individualUserData, [name]: [...individualUserData.bankId, parseInt(value)] })
//   //     // setIndividualUserData({
//   //     //     id: individualUserData.id,
//   //     //     type: individualUserData.type,
//   //     //     text: "",
//   //     //     partnerBankId: individualUserData.partnerBankId,
//   //     //     enabled: individualUserData.enabled,
//   //     //     hasIssue: individualUserData.hasIssue,
//   //     //     countryId: individualUserData.countryId,
//   //     //     bankId: [...individualUserData.bankId, parseInt(value)],
//   //     //     walletId: []
//   //     // })
//   // }


//   // const getselectedWallet = (e) => {
//   //     const { name, value } = e.target
//   //     console.log(e.target.value)
//   //     setIndividualUserData({ ...individualUserData, [name]: [...individualUserData.walletId, parseInt(value)] })
//   // }


//   const getselectedText = (e) => {
//     const { name, value } = e.target
//     console.log(e.target.value)
//     setIndividualUserData({ ...individualUserData, [name]: value })
//   }
//   // Bank Name ends


//   // modal onchanges start

//   const [newDeliveryMethod, setNewDeliveryMethod] = useState(null)

//   const handleChange = (e) => {
//     setNewDeliveryMethod(e.target.value)
//   }

//   const handleSaveNewDeliveryMethod = async () => {
//     console.log(newDeliveryMethod)
//     const deliveryData = {
//       type: newDeliveryMethod,
//       enabled: true
//     }

//     const newDeliveryDataResponse = await axios.post(`${CommonConstants.BASE_URL}/adddeliverytype`, deliveryData)
//     setShow(false)
//   }

//   const addNewMethod = () => {
//     setShow(true)
//   };

//   const handleClose = () => setShow(false);

//   // modal onchanges end


//   // To select checkbox starts



//   const [showBank, setShowBank] = useState([])
//   const GetAllBank = async (values) => {
//     try {

//       const response = await axios.post(CommonConstants.BASE_URL + "/getallbanks", { type: "bank" });
//       console.log(response)
//       if (response.data.status === true) {

//         console.log('mainGetttt', response.data.data)

//         const optionsForCountry = response.data.data.map(bank => ({
//           value: bank.id,
//           label: bank.bankName,
//         }));
//         setShowBank(optionsForCountry)


//       }
//       else if (response.data.status === "error") {
//         console.log(response.data.message)
//       }
//     }


//     catch (err) {
//       console.log(err)
//     }
//   };


//   const GetAllBankForWallet = async (values) => {
//     try {

//       const response = await axios.post(CommonConstants.BASE_URL + "/getallbanks", { type: "wallet" });
//       console.log(response)
//       if (response.data.status === true) {

//         console.log('mainGetttt', response.data.data)

//         const optionsForCountry = response.data.data.map(bank => ({
//           value: bank.id,
//           label: bank.bankName,
//         }));
//         setShowBank(optionsForCountry)


//       }
//       else if (response.data.status === "error") {
//         console.log(response.data.message)
//       }
//     }


//     catch (err) {
//       console.log(err)
//     }
//   };


//   const [selectedBank, setSelectedBank] = useState("")

//   const handleOptionChange = (options) => {

//     if (Array.isArray(options)) {
//       setSelectedBank(options.map((opt) => opt.value))
//       setIndividualUserData({ ...individualUserData, "bankId": options.map((opt) => opt.value) })
//     }

//   }



//   const onMenuOpen = () => {
//     if (menuOpen !== undefined) setMenuOpen(undefined);

//     if (individualUserData && individualUserData.deliveryTypeName == "Bank Deposit") {
//       GetAllBank()
//     } else {
//       GetAllBankForWallet()
//     }

//   };


//   // Delete delivery method name start

//   const [deliveryMethodDelete, setDeliveryMethodDelete] = useState("")

//   const handleDeliveryMethodNameDeleteChange = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value)
//     setDeliveryMethodDelete(value)
//   }


//   const handleDeliveryMethodNameDelete = async (e) => {

//     console.log(deliveryMethodDelete)

//     try {
//       const DeliveryMethodNameToDelete = {
//         id: deliveryMethodDelete
//       }

//       const responseDelete = await axios.post(CommonConstants.BASE_URL + "/deletedeliverymethodtypebyid", DeliveryMethodNameToDelete);
//       console.log(responseDelete)
//       setShowDelete(false);
//       navigate("/deliveryMethodCreate")

//     }
//     catch (err) {
//       console.log(err)
//     }
//   }

//   // Delete delivery method name end












//   // To select checkbox ends



//   const createNewData = async (e) => {

//     console.log(individualUserData)
//     e.preventDefault();

//     if (validator.error_input_validation("deliveryCheck")) {



//       if (id) {

//         const formData = new FormData();

//         if (individualUserData.deliveryTypeName === "Bank Deposit") {

//           const data = {
//             id: individualUserData.id,
//             countryId: individualUserData.countryId,
//             bankId: individualUserData.bankId,
//             deliveryTypeId: individualUserData.deliveryTypeId,
//             text: "",
//             partnerBankId: individualUserData.partnerBankId,
//             enabled: individualUserData.enabled,
//             hasIssue: individualUserData.hasIssue,
//             estimatedDelivery: individualUserData.estimatedDelivery,
//             locationId: individualUserData.locationId,
//             locationIdNic: individualUserData.locationIdNic,
//             locationIdCit: individualUserData.locationIdCit,
//             locationIdEve: individualUserData.locationIdEve,
//             locationIdNmb: individualUserData.locationIdNmb,
//             locationIdGlo: individualUserData.locationIdGlo,
//             locationIdGme: individualUserData.locationIdGme,
//             locationIdEsewa: individualUserData.locationIdEsewa,
//             locationIdIpay: individualUserData.locationIdIpay,
//             locationIdPrabhu: individualUserData.locationIdPrabhu,
//             locationIdIme: individualUserData.locationIdIme,
//             charge: individualUserData.charge,




//           }

//           formData.append('data', JSON.stringify(data)
//           );


//         } else if (individualUserData.deliveryTypeName === "wallet") {

//           const data = {
//             id: individualUserData.id,
//             countryId: individualUserData.countryId,
//             bankId: individualUserData.bankId,
//             deliveryTypeId: individualUserData.deliveryTypeId,
//             text: "",
//             partnerBankId: individualUserData.partnerBankId,
//             enabled: individualUserData.enabled,
//             hasIssue: individualUserData.hasIssue,
//             estimatedDelivery: individualUserData.estimatedDelivery,
//             locationId: individualUserData.locationId,
//             locationIdNic: individualUserData.locationIdNic,
//             locationIdCit: individualUserData.locationIdCit,
//             locationIdEve: individualUserData.locationIdEve,
//             locationIdNmb: individualUserData.locationIdNmb,
//             locationIdGlo: individualUserData.locationIdGlo,
//             locationIdGme: individualUserData.locationIdGme,
//             locationIdEsewa: individualUserData.locationIdEsewa,
//             locationIdIpay: individualUserData.locationIdIpay,
//             locationIdPrabhu: individualUserData.locationIdPrabhu,
//             locationIdIme: individualUserData.locationIdIme,
//             charge: individualUserData.charge,
//           }

//           formData.append('data', JSON.stringify(data)
//           );


//         } else {

//           const data = {
//             id: individualUserData.id,
//             countryId: individualUserData.countryId,
//             bankId: [],
//             deliveryTypeId: individualUserData.deliveryTypeId,
//             text: individualUserData.text,
//             partnerBankId: individualUserData.partnerBankId,
//             enabled: individualUserData.enabled,
//             hasIssue: individualUserData.hasIssue,
//             estimatedDelivery: individualUserData.estimatedDelivery,
//             locationId: individualUserData.locationId,
//             locationIdNic: individualUserData.locationIdNic,
//             locationIdCit: individualUserData.locationIdCit,
//             locationIdEve: individualUserData.locationIdEve,
//             locationIdNmb: individualUserData.locationIdNmb,
//             locationIdGlo: individualUserData.locationIdGlo,
//             locationIdGme: individualUserData.locationIdGme,
//             locationIdEsewa: individualUserData.locationIdEsewa,
//             locationIdIpay: individualUserData.locationIdIpay,
//             locationIdPrabhu: individualUserData.locationIdPrabhu,
//             locationIdIme: individualUserData.locationIdIme,
//             charge: individualUserData.charge,
//           };

//           formData.append('data', JSON.stringify(data)
//           );


//         }

//         formData.append("logo", selectedFile);

//         let config = {
//           method: 'post',
//           maxBodyLength: Infinity,
//           url: 'http://testapi.gvmtechnologies.com:8080/updatedeliverymethod',
//           headers: { 'Content-Type': 'multipart/form-data' },
//           data: formData
//         };

//         axios.request(config)
//           .then((response) => {
//             console.log(response.data)
//             if (response.data.status == true) {
//               console.log(JSON.stringify(response.data));
//               navigate("/deliveryMethod")
//             } else {
//               navigate("/deliveryMethodCreate")
//             }
//           })
//           .catch((error) => {
//             console.log(error);
//           });

//       } else {

//         const formData = new FormData();

//         const data = {
//           countryId: individualUserData.countryId,
//           bankId: individualUserData.bankId,
//           deliveryTypeId: individualUserData.deliveryTypeId,
//           text: individualUserData.text,
//           partnerBankId: individualUserData.partnerBankId,
//           enabled: individualUserData.enabled,
//           hasIssue: individualUserData.hasIssue,
//           estimatedDelivery: individualUserData.estimatedDelivery,
//           locationId: individualUserData.locationId,
//           locationIdNic: individualUserData.locationIdNic,
//           locationIdCit: individualUserData.locationIdCit,
//           locationIdEve: individualUserData.locationIdEve,
//           locationIdNmb: individualUserData.locationIdNmb,
//           locationIdGlo: individualUserData.locationIdGlo,
//           locationIdGme: individualUserData.locationIdGme,
//           locationIdEsewa: individualUserData.locationIdEsewa,
//           locationIdIpay: individualUserData.locationIdIpay,
//           locationIdPrabhu: individualUserData.locationIdPrabhu,
//           locationIdIme: individualUserData.locationIdIme,
//           charge: individualUserData.charge,

//         };



//         formData.append('data', JSON.stringify(data));

//         formData.append("logo", selectedFile);

//         let config = {
//           method: 'post',
//           maxBodyLength: Infinity,
//           url: 'http://testapi.gvmtechnologies.com:8080/adddeliverymethod',
//           headers: { 'Content-Type': 'multipart/form-data' },
//           data: formData
//         };

//         axios.request(config)
//           .then((response) => {
//             console.log(response.data)
//             if (response.data.status == true) {
//               console.log(JSON.stringify(response.data));
//               navigate("/deliveryMethod")
//             } else {
//               console.log('Not sent');
//               navigate("/deliveryMethodCreate")
//             }
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     }
//   }

//   useEffect(() => {

//     GetAllCountrys()
//     getPartnerBankData()
//     getType()
//     GetAllBanks()

//     if (id) {
//       const payload = {
//         id: id
//       }
//       console.log("id", id)
//       axios.post(`${CommonConstants.BASE_URL}/getdeliverymethodbyid`, {
//         id: payload.id,
//       }).then(res => {
//         console.log(res.data.data)
//         setIndividualUserData(res.data.data)
//         console.log(individualUserData.deliveryTypeName)
//       }).catch((err) => {
//         console.log(err);
//       })
//     }

//   }, [show, showDelete])



//   console.log(individualUserData)


//   return (
//     <>
//       <section>
//         <Container>
//           <div className="mainBoxService mt-5">
//             <div className="serviceHeader purpleBackground text-white rounded-2">
//               <h3 className="text-white ms-5 bolder pt-4 pb-3 pb-2 pe-4">
//                 Delivery Methods
//               </h3>
//               <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
//                 <Container>
//                   <Form id="deliveryCheck">
//                     <Row className="mb-3">
//                       <Form.Group as={Col} controlId="formGridState">
//                         <Form.Label>Country</Form.Label>
//                         <Form.Select value={individualUserData ? individualUserData.countryId : selectedCountry} onChange={getselectedCountry} name="countryId" disabled={id} className="required">
//                           <option value="">Select Country</option>
//                           {Country &&
//                             Country.map((countryname, index) => {

//                               return (
//                                 <option value={countryname.id}>{countryname.emoji}&nbsp;&nbsp;{countryname.name}</option>
//                               );
//                             })}
//                         </Form.Select>
//                         <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error" >Please select Country</small>
//                       </Form.Group>
//                     </Row>
//                     <Row>
//                       <Form.Group controlId="formGridState" className="mt-1">
//                         <Form.Label>Type</Form.Label>
//                         {/* <div className={id ? "d-flex methodName1" : "d-flex methodName"}> */}
//                         <div className={"d-flex methodName1"}>
//                           <Col className="col-lg-11 px-0">
//                             <Form.Select value={individualUserData ? individualUserData.deliveryTypeId : selectedType} onChange={handleTypeChange} required name="deliveryTypeId" disabled={id} className="required">
//                               <option value="">Select Type</option>
//                               {type &&
//                                 type.map((typeName, index) => {
//                                   // const value = [typeName.id, typeName.type];
//                                   return (
//                                     <option value={typeName.id} key={index}>{typeName.type}</option>
//                                   );
//                                 })}
//                             </Form.Select>
//                             <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error" >Please select Type</small>
//                           </Col>
//                           {/* {id ? null : <Col className="col-lg-1 m-auto ms-3 ps-0">
//                             <a
//                               // href="#!"
//                               // className="purpleBackground btn btn-default text-white bolder py-3 d-block AddButton"
//                               className="btn btn-primary text-white bolder"
//                               onClick={id ? "return false" : addNewMethod}
//                             ><i className="fa fa-plus"></i> Add
//                             </a>
//                           </Col>}
//                           {id ? null : <Col className="col-lg-1 m-auto ms-0 ps-0">
//                             <a
//                               // href="#!"
//                               // className="purpleBackground btn btn-default text-white bolder py-3 d-block AddButton"
//                               className="btn btn-danger text-white bolder ms-0 deleteButton"
//                               onClick={id ? "return false" : handleShowDelete}
//                             ><i className="text-white fa fa-trash bolder"></i> Delete
//                             </a>
//                           </Col>} */}
//                         </div>
//                       </Form.Group>
//                     </Row>
//                     <Row className="mt-3 respoChildFooter pbSt">

//                       <Form.Group as={Col} controlId="formGridState">
//                         <Form.Label>{individualUserData.deliveryTypeName == "Bank Deposit" ? "Bank Name" : individualUserData.deliveryTypeName == "Wallet Deposit" ? "Wallet Name" : "Text"}</Form.Label>
//                         {individualUserData.deliveryTypeName == "Bank Deposit" ?
//                           <div>
//                             <Select
//                               isMulti
//                               menuIsOpen={menuOpen}
//                               name="bankId"
//                               options={showBank}
//                               className="basic-multi-select"
//                               classNamePrefix="select"
//                               closeMenuOnSelect={false}
//                               onChange={handleOptionChange}
//                               onMenuOpen={onMenuOpen}
//                             />
//                             <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error" >Please select Above field</small>
//                           </div> : individualUserData.deliveryTypeName == "Wallet Deposit" ?
//                             <div>
//                               <Select
//                                 isMulti
//                                 menuIsOpen={menuOpen}
//                                 name="bankId"
//                                 options={showBank}
//                                 className="basic-multi-select"
//                                 classNamePrefix="select"
//                                 closeMenuOnSelect={false}
//                                 onChange={handleOptionChange}
//                                 onMenuOpen={onMenuOpen}
//                               />
//                               <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error" >Please select Above field</small>
//                             </div> :
//                             <div>
//                               <input type="text" className="form-control required" id="Text" onChange={getselectedText} name="text" />
//                               <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error" >Please select Above field</small>
//                             </div>
//                         }


//                       </Form.Group>
//                     </Row>
//                     <Row>
//                       <Form.Group controlId="formGridState" className="mt-3 respoChildFooter pbSt">
//                         <Form.Label>Payout Partner Bank</Form.Label>
//                         <Form.Select value={individualUserData ? individualUserData.partnerBankId : partnerBankId} onChange={handleChangePartnerBank} name="partnerBankId" className='required'>
//                           <option value="">Select Payout Partner Bank</option>
//                           {partnerBank &&
//                             partnerBank.map((partnerBankName, index) => {
//                               return (
//                                 <option value={partnerBankName.id}>{partnerBankName.name}</option>
//                               );
//                             })}
//                         </Form.Select>
//                         <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error" >Please select Payout Partner Bank</small>
//                       </Form.Group>
//                     </Row>
//                     <Row>
//                       <div className="d-flex mt-3">
//                         <input
//                           type="radio"
//                           id="vehicle1"
//                           name="enabled"
//                           value="true"
//                           className="main-radio mt-2 requiredCheckBox"
//                           onChange={handleChangeEnabled}
//                           checked={individualUserData.enabled === true}
//                         />
//                         <label htmlFor="vehicle5" className="ms-2 radio">
//                           Enabled
//                         </label>
//                       </div>
//                       <div className="d-flex">
//                         <input
//                           type="radio"
//                           id="vehicle2"
//                           name="enabled"
//                           value="false"
//                           className="main-radio mt-2 requiredCheckBox"
//                           onChange={handleChangeEnabled}
//                           checked={individualUserData.enabled === false}
//                         />
//                         <label htmlFor="vehicle5" className="ms-2 radio">
//                           Disabled
//                         </label>
//                       </div>
//                       <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error checkboxError" >Please select checkbox</small>
//                     </Row>
//                     <Row>
//                       <Form.Group
//                         as={Col}
//                         controlId="formGridCity"
//                         className="border-0 mt-1"
//                       >
//                         <Form.Label>Logo</Form.Label>
//                         <Form.Control
//                           type="file"
//                           className={id ? "rounded-0 border-0" : "rounded-0 border-0 required"}
//                           onChange={handleFileInputChange}
//                         />
//                       </Form.Group>
//                       {(selectedFile || individualUserData.logo) && <img src={selectedFile ? URL.createObjectURL(selectedFile) : individualUserData.logo} alt="" className="paymentImage" />}
//                     </Row>
//                     <Row className="mt-4 respoChildFooter pbSt">
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Estimated Delivery</Form.Label>
//                           &nbsp;&nbsp;<a href="#">View</a>
//                           <Form.Control
//                             type="text"
//                             placeholder="Estimated Delivery"
//                             onChange={getselectedText}
//                             name="estimatedDelivery"
//                             className="form-input"
//                             defaultValue={individualUserData.estimatedDelivery}
//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Location ID in Sunrise</Form.Label>
//                           &nbsp;&nbsp;<a href="#">View</a>
//                           <Form.Control
//                             type="text"
//                             placeholder="Location ID in Sunrisey"
//                             onChange={getselectedText}
//                             name="locationId"
//                             className="form-input"
//                             defaultValue={individualUserData.locationId}
//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>
//                     <Row className="mt-3 respoChildFooter pbSt">
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Location ID in NIC</Form.Label>
//                           &nbsp;&nbsp;<a href="#">View</a>
//                           <Form.Control
//                             type="text"
//                             placeholder="Location ID in NIC"
//                             onChange={getselectedText}
//                             name="locationIdNic"
//                             className="form-input"
//                             defaultValue={individualUserData.locationIdNic}

//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Location ID in Citizens</Form.Label>
//                           <Form.Control
//                             type="text"
//                             placeholder="Location ID in Citizens"
//                             onChange={getselectedText}
//                             name="locationIdCit"
//                             className="form-input"
//                             defaultValue={individualUserData.locationIdCit}

//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Row className="mt-3 respoChildFooter pbSt">
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Location ID in Everest</Form.Label>
//                           <Form.Control
//                             type="text"
//                             placeholder="Location ID in Everest"
//                             onChange={getselectedText}
//                             name="locationIdEve"
//                             className="form-input"
//                             defaultValue={individualUserData.locationIdEve}

//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Location ID in NMB</Form.Label>
//                           <Form.Control
//                             type="text"
//                             placeholder="Location ID in NMB"
//                             onChange={getselectedText}
//                             name="locationIdNmb"
//                             className="form-input"
//                             defaultValue={individualUserData.locationIdNmb}

//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Row className="mt-3 respoChildFooter pbSt">
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Branch Code in Global</Form.Label>
//                           <Form.Control
//                             type="text"
//                             placeholder="Branch Code in Global"
//                             onChange={getselectedText}
//                             name="locationIdGlo"
//                             className="form-input"
//                             defaultValue={individualUserData.locationIdGlo}

//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Location Code in GME</Form.Label>
//                           &nbsp;&nbsp;<a href="#">View</a>
//                           <Form.Control
//                             type="text"
//                             placeholder="Location Code in GME"
//                             onChange={getselectedText}
//                             name="locationIdGme"
//                             className="form-input"
//                             defaultValue={individualUserData.locationIdGme}

//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Row className="mt-3 respoChildFooter pbSt">
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Location ID in eSewa</Form.Label>
//                           &nbsp;&nbsp;<a href="#">View</a>
//                           <Form.Control
//                             type="text"
//                             placeholder="Location ID in eSewa"
//                             onChange={getselectedText}
//                             name="locationIdEsewa"
//                             className="form-input"
//                             defaultValue={individualUserData.locationIdEsewa}

//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Location ID in iPay</Form.Label>
//                           &nbsp;&nbsp;<a href="#">View</a>
//                           <Form.Control
//                             type="text"
//                             placeholder="Location ID in iPay"
//                             onChange={getselectedText}
//                             name="locationIdIpay"
//                             className="form-input"
//                             defaultValue={individualUserData.locationIdIpay}

//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Row className="mt-3 respoChildFooter pbSt">
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Location ID in Prabhu</Form.Label>
//                           &nbsp;&nbsp;<a href="#">View</a>
//                           <Form.Control
//                             type="text"
//                             placeholder="Location ID in Prabhu"
//                             onChange={getselectedText}
//                             name="locationIdPrabhu"
//                             className="form-input"
//                             defaultValue={individualUserData.locationIdPrabhu}

//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Location ID in IME</Form.Label>
//                           &nbsp;&nbsp;<a href="#">View</a>
//                           <Form.Control
//                             type="text"
//                             placeholder="Location ID in IME"
//                             onChange={getselectedText}
//                             name="locationIdIme"
//                             className="form-input"
//                             defaultValue={individualUserData.locationIdIme}

//                           />
//                         </Form.Group>
//                       </Col>
//                     </Row>

//                     <Row className="mt-3 respoChildFooter pbSt">
//                       <Col>
//                         <Form.Group
//                           as={Col}
//                           className="left-inner-addon input-container"
//                         >
//                           <Form.Label>Bank Swift Code</Form.Label>
//                           <Form.Control
//                             type="text"
//                             placeholder="Bank Swift Code"
//                             onChange={getselectedText}
//                             name="charge"
//                             className="form-input"
//                             defaultValue={individualUserData.charge}

//                           />
//                         </Form.Group>
//                       </Col>
//                       <Col>{null}</Col>
//                     </Row>

//                     <Row>
//                       <div className="row d-flex m-auto mt-3">
//                         <div className="col-lg-2 pb-4 ps-0">
//                           <a
//                             href="#!"
//                             className="purpleBackground btn btn-default text-white bolder d-block"
//                             onClick={createNewData}
//                           > {id ? "Update" : "Create"}
//                           </a>
//                         </div>
//                         <div className="col-lg-2 pb-4 ps-0">
//                           <a
//                             // href="#!"
//                             className="btn btn-dark ms-3 text-white bolder"
//                             onClick={handleCancel}
//                           > Cancel
//                           </a>
//                         </div>
//                       </div>
//                     </Row>
//                   </Form>
//                 </Container>
//               </div>
//             </div>
//           </div>
//         </Container>


//         <Modal show={show} centered>
//           <Modal.Header onHide={handleClose} closeButton >
//             <Modal.Title className="p-0 m-0"></Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <h3 className="bolder text-center">Add New Delivery Method</h3><br></br >
//             <Form.Group as={Col} className="" controlId="formGridCity" >
//               <Col className="px-0">
//                 <Form.Label className="fs-5"> Default Partner Bank </Form.Label>
//                 <Form.Control className="fs-5" id="PaymentName" type="text" onChange={handleChange} />
//               </Col>
//             </Form.Group>
//             <br />
//             < br />
//             <Row className="justify-content-center">
//               <Col className="col-lg-5 px-0 justify-content-center d-flex">
//                 <Button variant="primary" className="w-75 py-3" onClick={handleSaveNewDeliveryMethod}>
//                   Save
//                 </Button>
//               </Col>
//               <Col className="col-lg-5 px-0 justify-content-center d-flex">
//                 <Button variant="secondary" className="w-75 py-3" onClick={handleClose}>
//                   Cancel
//                 </Button>
//               </Col>
//             </Row>
//           </Modal.Body>
//         </Modal>

//         <Modal show={showDelete} centered>
//           <Modal.Header onHide={handleCloseDelete} closeButton >
//             <Modal.Title className="p-0 m-0"></Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <h3 className="bolder text-center">Delete Delivery Type</h3><br></br>
//             {/* <Form.Group as={Col} className="" controlId="formGridCity" >
//               <Col className="px-0">
//                 <Form.Label className="fs-5"> Name </Form.Label>
//                 <Form.Control className="fs-5" id="PaymentName" onChange={handleChange} />
//               </Col>
//             </Form.Group> */}


//             <Col className="col-lg-11 px-0">
//               <Form.Select onChange={handleDeliveryMethodNameDeleteChange} name="deliveryMethodName" disabled={id}>
//                 <option>Select Delivery type Name</option>
//                 {type &&
//                   type.map((typeName, index) => {
//                     return (
//                       <option value={typeName.id} key={index}>{typeName.type}</option>
//                     );
//                   })}
//               </Form.Select>
//             </Col>
//             <br />
//             {/* <hr></hr> */}
//             <br />
//             <Row className="justify-content-center">
//               <Col className="col-lg-5 px-0 justify-content-center d-flex">
//                 <Button variant="primary" className="w-75 py-3" onClick={handleDeliveryMethodNameDelete}>
//                   Delete
//                 </Button>
//               </Col>
//               <Col className="col-lg-5 px-0 justify-content-center d-flex">
//                 <Button variant="secondary" className="w-75 py-3" onClick={handleCloseDelete}>
//                   Cancel
//                 </Button>
//               </Col>
//             </Row>
//           </Modal.Body>

//           <Modal.Footer>

//           </Modal.Footer>
//         </Modal>
//       </section>
//     </>
//   )
// }

// export default DeliveryMethodCreate





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Form,
  Row,
  Col,
  Button,
  Modal,
  Container
} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

import { CommonConstants } from '../../../../Constants/common.constants';


function DeliveryMethodCreate(props) {

  const [id, setId] = useState(props.location.state)
  const navigate = useNavigate()
  const [partnerBank, setPartnerBank] = useState("")
  const [partnerBankId, setPartnerBankId] = useState("")
  const [type, setType] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [enabled, setEnabled] = useState(false)
  const [show, setShow] = useState(false)
  const [Country, setCountry] = useState([])
  const [selectedCountry, setSelectedCountry] = useState([])
  const [bank, setBank] = useState([])
  const [showDelete, setShowDelete] = useState(false);
  const [selectedLogo, setselectedLogo] = useState();
  const [error, setError] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);
  const [menuOpen, setMenuOpen] = useState(undefined);
  const [getText, setGetText] = useState("");

  const [individualUserData, setIndividualUserData] = useState({
    id: "",
    deliveryTypeId: "",
    text: "",
    logo: "",
    partnerBankId: "",
    enabled: "",
    hasIssue: false,
    countryId: 14,
    deliveryTypeName: "",
    estimatedDelivery: "",
    locationId: "",
    locationIdNic: "",
    locationIdCit: "",
    locationIdEve: "",
    locationIdNmb: "",
    locationIdGlo: "",
    locationIdGme: "",
    locationIdEsewa: "",
    locationIdIpay: "",
    locationIdPrabhu: "",
    locationIdIme: "",
    bankSwiftCode: "",
    commission: "",
    charge: "",
  })

  // upload Type Start
  const getType = async () => {

    let response = await axios.get(CommonConstants.BASE_URL + "/getactivedeliverytype")
    setType(response.data.data)
  }

  const isActiveMark = (e) => {
    const value = e.target.checked;
    setEnabled(value);
  }

  const handleTypeChange = (e) => {
    e.preventDefault();

    if (e.target.options[e.target.selectedIndex].text === "Bank Deposit") {
      GetAllBank()
    } else {
      GetAllBankForWallet()
    }
    const { name, value } = e.target;
    setSelectedType(e.target.options[e.target.selectedIndex].text)
    setIndividualUserData({ ...individualUserData, [name]: parseInt(value), ["deliveryTypeName"]: e.target.options[e.target.selectedIndex].text });
    setselectedLogo(value);

  }


  // upload Type ends

  // Partner Bank Start
  const getPartnerBankData = async () => {

    let response = await axios.get(CommonConstants.BASE_URL + "/getallactivepartnerbanks")
    setPartnerBank(response.data.data)
  }

  const handleChangePartnerBank = (e) => {

    const { name, value } = e.target;
    setPartnerBankId(value)
    setIndividualUserData({ ...individualUserData, [name]: parseInt(value) })

  }
  // Partner Bank ends

  const handleChangeEnabled = (e) => {

    const { name, value } = e.target;
    setEnabled(value == "true" ? true : false)
    setIndividualUserData({ ...individualUserData, [name]: value == "true" ? true : false })
  }

  //Upload File Starts
  const [selectedFile, setSelectedFile] = useState(null)
  const handleFileInputChange = (e) => {

    const { name, files } = e.target

    setSelectedFile(e.target.files[0]);
    setIndividualUserData({ ...individualUserData, [name]: files[0] })

  }
  // Upload File end

  // Countries start
  const GetAllCountrys = async (values) => {
    try {

      const response = await axios.get(CommonConstants.BASE_URL + "/getallcountries");
      if (response.data.status === true) {
        setCountry(response.data.data)
      }
      else if (response.data.status === "error") {
        console.log(response.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  };

  const getselectedCountry = (e) => {
    const { name, value } = e.target
    setSelectedCountry(parseInt(value))
    setIndividualUserData({ ...individualUserData, [name]: parseInt(value) })
  }
  // Countries end


  // Bank Name start
  const GetAllBanks = async (values) => {

    try {

      const response = await axios.post(CommonConstants.BASE_URL + "/getallbanks", {});
      if (response.data.status === true) {
        setBank(response.data.data)
      }
      else if (response.data.status === "error") {
        console.log(response.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handleCancel = () => {
    navigate("/deliveryMethod")
  }

  // const getselectedBank = (e) => {
  //     const { name, value } = e.target
  //     console.log(e.target.value)
  //     // setIndividualUserData({ ...individualUserData, ["walletId"]: [] })
  //     setIndividualUserData({ ...individualUserData, [name]: [...individualUserData.bankId, parseInt(value)] })
  //     // setIndividualUserData({
  //     //     id: individualUserData.id,
  //     //     type: individualUserData.type,
  //     //     text: "",
  //     //     partnerBankId: individualUserData.partnerBankId,
  //     //     enabled: individualUserData.enabled,
  //     //     hasIssue: individualUserData.hasIssue,
  //     //     countryId: individualUserData.countryId,
  //     //     bankId: [...individualUserData.bankId, parseInt(value)],
  //     //     walletId: []
  //     // })
  // }


  // const getselectedWallet = (e) => {
  //     const { name, value } = e.target
  //     console.log(e.target.value)
  //     setIndividualUserData({ ...individualUserData, [name]: [...individualUserData.walletId, parseInt(value)] })
  // }

  const [checkExist, setCheckExist] = useState(false)

  const getExistingRecord = async (e) => {
    const { name, value } = e.target;
    if (
      individualUserData.deliveryTypeName === "Bank Deposit" ||
      individualUserData.deliveryTypeName === "Wallet Deposit"
    ) {
      const Data = {
        deliveryTypeId: individualUserData.deliveryTypeId,
        text: value,
      };
      if (value !== getText) {
        try {
          const response = await axios.post(
            CommonConstants.BASE_URL +
            "/checktextexistornotfordeliverymethod",
            Data
          );
          if (response.data.data) {
            setCheckExist(true);
            var element = document.getElementById("exists");
            element.classList.remove("d-none");
            var element2 = document.getElementById("Text");
            element2.classList.add("is-invalidError");
          } else {
            setCheckExist(false);
            var element = document.getElementById("exists");
            element.classList.add("d-none");
            var element2 = document.getElementById("Text");
            element2.classList.remove("is-invalidError");
          }
        } catch (error) {
          // Handle API call error
          console.error("API call failed:", error);
        }
      }
    }

    // Update the previous text
    setGetText(value);
  };

  const getselectedText = async (e) => {
    const { name, value } = e.target
    if (name == "text") {
      const alphanumericValue = value.replace(/[^A-Za-z]+/g, '');
      setIndividualUserData({ ...individualUserData, [name]: alphanumericValue });
    } else {
      const alphanumericValue = value.replace(/[^A-Za-z0-9\s]+/g, '');
      setIndividualUserData({ ...individualUserData, [name]: alphanumericValue });
    }
  }
  // modal onchanges start
  const [newDeliveryMethod, setNewDeliveryMethod] = useState(null)
  const handleChange = (e) => {
    setNewDeliveryMethod(e.target.value)
  }
  const handleSaveNewDeliveryMethod = async () => {
    const deliveryData = {
      type: newDeliveryMethod,
      enabled: true
    }
    const newDeliveryDataResponse = await axios.post(`${CommonConstants.BASE_URL}/adddeliverytype`, deliveryData)
    setShow(false)
  }
  const addNewMethod = () => {
    setShow(true)
  };
  const handleClose = () => setShow(false);
  // modal onchanges end
  // To select checkbox starts
  const [showBank, setShowBank] = useState([])
  const GetAllBank = async (values) => {
    try {

      const response = await axios.post(CommonConstants.BASE_URL + "/getallbanks", { type: "bank" });
      if (response.data.status === true) {
        const optionsForCountry = response.data.data.map(bank => ({
          value: bank.id,
          label: bank.bankName,
        }));
        setShowBank(optionsForCountry)


      }
      else if (response.data.status === "error") {
        console.log(response.data.message)
      }
    }


    catch (err) {
      console.log(err)
    }
  };


  const GetAllBankForWallet = async (values) => {
    try {

      const response = await axios.post(CommonConstants.BASE_URL + "/getallbanks", { type: "wallet" });
      if (response.data.status === true) {
        const optionsForCountry = response.data.data.map(bank => ({
          value: bank.id,
          label: bank.bankName,
        }));
        setShowBank(optionsForCountry)


      }
      else if (response.data.status === "error") {
        console.log(response.data.message)
      }
    }


    catch (err) {
      console.log(err)
    }
  };


  const [selectedBank, setSelectedBank] = useState("")

  const handleOptionChange = (options) => {

    if (Array.isArray(options)) {
      setSelectedBank(options.map((opt) => opt.value))
      setIndividualUserData({ ...individualUserData, "bankId": options.map((opt) => opt.value) })
    }

  }

  const onMenuOpen = () => {
    if (menuOpen !== undefined) setMenuOpen(undefined);

    if (individualUserData && individualUserData.deliveryTypeName == "Bank Deposit") {
      GetAllBank()
    } else {
      GetAllBankForWallet()
    }

  };


  // Delete delivery method name start

  const [deliveryMethodDelete, setDeliveryMethodDelete] = useState("")
  const handleDeliveryMethodNameDeleteChange = (e) => {
    const { name, value } = e.target;
    setDeliveryMethodDelete(value)
  }


  const handleDeliveryMethodNameDelete = async (e) => {
    try {
      const DeliveryMethodNameToDelete = {
        id: deliveryMethodDelete
      }

      const responseDelete = await axios.post(CommonConstants.BASE_URL + "/deletedeliverymethodtypebyid", DeliveryMethodNameToDelete);
      setShowDelete(false);
      navigate("/deliveryMethodCreate")

    }
    catch (err) {
      console.log(err)
    }
  }

  const createNewData = async (e) => {
    if (selectedType == undefined || !individualUserData.text) {
      setError(true)
    }
    if (checkExist == false) {
      e.preventDefault();
      // if (validator.error_input_validation("deliveryCheck")) {
        if (id) {
          const data = {
            id: individualUserData.id,
            countryId: individualUserData.countryId,
            deliveryTypeId: individualUserData.deliveryTypeId,
            text: individualUserData.text,
            partnerBankId: individualUserData.partnerBankId,
            enabled: enabled,
            hasIssue: individualUserData.hasIssue,
            estimatedDelivery: individualUserData.estimatedDelivery,
            locationId: individualUserData.locationId,
            locationIdNic: individualUserData.locationIdNic,
            locationIdCit: individualUserData.locationIdCit,
            locationIdEve: individualUserData.locationIdEve,
            locationIdNmb: individualUserData.locationIdNmb,
            locationIdGlo: individualUserData.locationIdGlo,
            locationIdGme: individualUserData.locationIdGme,
            locationIdEsewa: individualUserData.locationIdEsewa,
            locationIdIpay: individualUserData.locationIdIpay,
            locationIdPrabhu: individualUserData.locationIdPrabhu,
            locationIdIme: individualUserData.locationIdIme,
            bankSwiftCode: individualUserData.bankSwiftCode,
            logo: selectedFile,
            charge: individualUserData.charge
          };

          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: CommonConstants.BASE_URL + '/updatedeliverymethod',
            headers: { 'Content-Type': 'application/json' },
            data: data
          };

          axios.request(config)
            .then((response) => {
              if (response.data.status === true) {
                navigate("/deliveryMethod");
              } else {
                navigate("/deliveryMethodCreate");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          if (individualUserData.deliveryTypeId != "" || individualUserData.text != "") {
            const respons = await axios.post(CommonConstants.BASE_URL + "/getdeliverytypebyid", { id: selectedLogo });
            var img = respons.data.data.logo;
            setIndividualUserData({ ...individualUserData, "logo": img })

            const formData = new FormData();
            const data = {
              countryId: individualUserData.countryId,
              bankId: individualUserData.bankId,
              deliveryTypeId: individualUserData.deliveryTypeId,
              text: individualUserData.text,
              logo: img,
              partnerBankId: individualUserData.partnerBankId,
              enabled: enabled,
              hasIssue: individualUserData.hasIssue,
              estimatedDelivery: individualUserData.estimatedDelivery,
              locationId: individualUserData.locationId,
              locationIdNic: individualUserData.locationIdNic,
              locationIdCit: individualUserData.locationIdCit,
              locationIdEve: individualUserData.locationIdEve,
              locationIdNmb: individualUserData.locationIdNmb,
              locationIdGlo: individualUserData.locationIdGlo,
              locationIdGme: individualUserData.locationIdGme,
              locationIdEsewa: individualUserData.locationIdEsewa,
              locationIdIpay: individualUserData.locationIdIpay,
              locationIdPrabhu: individualUserData.locationIdPrabhu,
              locationIdIme: individualUserData.locationIdIme,
              bankSwiftCode: individualUserData.bankSwiftCode,
              charge: individualUserData.charge
            };
            axios.post(CommonConstants.BASE_URL + '/adddeliverymethod', data, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(response => {
                console.log(response.data);
                if (response.data.statuscode == 200) {
                  navigate("/deliveryMethod")
                }
              })
              .catch(error => {
                console.error(error);
              });
          }
        }
      // }
    } else {
      e.preventDefault();
      navigate("/deliveryMethodCreate")
    }
  }


  useEffect(() => {

    GetAllCountrys()
    getPartnerBankData()
    getType()
    GetAllBanks()

    if (id) {
      const payload = {
        id: id
      }
      axios.post(`${CommonConstants.BASE_URL}/getdeliverymethodbyid`, {
        id: payload.id,
      }).then(res => {
        setIndividualUserData(res.data.data);
        setGetText(res.data.data.text);
        setEnabled(res.data.data.enabled);
      }).catch((err) => {
        console.log(err);
      })
    }

  }, [show, showDelete])
  return (
    <>
      <section onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <Container>
          <div className="mainBoxService mt-5">
            <div className="serviceHeader bg-white text-white rounded-2">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Delivery Method
              </h3>
              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Container>
                  <Form id="deliveryCheck">
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Country</Form.Label>
                        <Form.Select value={individualUserData ? individualUserData.countryId : selectedCountry !== undefined ? selectedCountry : "14"} onChange={getselectedCountry} name="countryId" disabled={id} className="required">
                          <option value="">Select Country</option>
                          {Country &&
                            Country.map((countryname, index) => {

                              return (
                                <option value={countryname.id}>{countryname.emoji}&nbsp;&nbsp;{countryname.name}</option>
                              );
                            })}
                        </Form.Select>
                        {<small className="responsiveFontLarge  d-none text-danger error_message ms-2 error" >Please select Country</small>}
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group controlId="formGridState" className="mt-1">
                        <Form.Label>Type</Form.Label>
                        {/* <div className={id ? "d-flex methodName1" : "d-flex methodName"}> */}
                        <div className={"d-flex"}>
                          <Col className="col-lg-12 px-0">
                            <Form.Select value={individualUserData ? individualUserData.deliveryTypeId : selectedType} onChange={handleTypeChange} required name="deliveryTypeId" disabled={id} className="required">
                              <option value="">Select Type</option>
                              {type &&
                                type.map((typeName, index) => {
                                  // const value = [typeName.id, typeName.type];
                                  return (
                                    <option value={typeName.id} key={index}>{typeName.type}</option>
                                  );
                                })}
                            </Form.Select>
                            {error && !selectedType && <small className="responsiveFontLarge  text-danger" >Please select Type</small>}
                          </Col>
                        </div>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group controlId="formGridState" className="mt-3 respoChildFooter pbSt">
                        <Form.Label>Default Payout Partner Bank</Form.Label>
                        <Form.Select value={individualUserData ? individualUserData.partnerBankId : partnerBankId} onChange={handleChangePartnerBank} name="partnerBankId">
                          <option value={0}>Select Payout Partner Bank</option>
                          {partnerBank &&
                            partnerBank.map((partnerBankName, index) => {
                              return (
                                <option value={partnerBankName.id}>{partnerBankName.name}</option>
                              );
                            })}
                        </Form.Select>
                        {/* <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error" >Please select Payout Partner Bank</small> */}
                      </Form.Group>
                    </Row>
                    <Row className="mt-3 respoChildFooter pbSt">
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>{individualUserData?.deliveryTypeName == "Bank Deposit" ? "Bank Name" : individualUserData?.deliveryTypeName == "Wallet Deposit" ? "Wallet Name" : individualUserData?.deliveryTypeName == "Cash Pickup" ? "Type Name" : "Text"}</Form.Label>
                        <div>
                          <input type="text" className="form-control required" id="Text" onBlur={getExistingRecord} onChange={getselectedText} name="text" value={individualUserData?.text} />
                          {error && !individualUserData?.text && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please enter {individualUserData?.deliveryTypeName == "Bank Deposit" ? "Bank Name" : individualUserData?.deliveryTypeName == "Wallet Deposit" ? "Wallet Name" : individualUserData?.deliveryTypeName == "Cash Pickup" ? "Type Name" : "Text"}</small>}
                          {checkExist && <small id="exists" className="text-danger error_message ms-2 error" >Name already exists</small>}
                        </div>
                      </Form.Group>
                    </Row>
                    <Row>
                      {/* <div className="d-flex mt-3">
                        <input
                          type="radio"
                          id="vehicle1"
                          name="enabled"
                          value="true"
                          className="main-radio mt-2 requiredCheckBox"
                          onChange={handleChangeEnabled}
                          checked={individualUserData.enabled === true}
                        />
                        <label htmlFor="vehicle5" className="ms-2 radio">
                          Enabled
                        </label>
                      </div>
                      <div className="d-flex">
                        <input
                          type="radio"
                          id="vehicle2"
                          name="enabled"
                          value="false"
                          className="main-radio mt-2 requiredCheckBox"
                          onChange={handleChangeEnabled}
                          checked={individualUserData.enabled === false}
                        />
                        <label htmlFor="vehicle5" className="ms-2 radio">
                          Disabled
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
                      {/* <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error checkboxError" >Please select checkbox</small> */}
                    </Row>
                    <Row className="mt-4 respoChildFooter pbSt">
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Estimated Delivery</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Estimated Delivery"
                            onChange={getselectedText}
                            name="estimatedDelivery"
                            className="form-input"
                            value={individualUserData?.estimatedDelivery}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3 respoChildFooter pbSt">
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Bank Swift Code</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Bank Swift Code"
                            onChange={getselectedText}
                            name="bankSwiftCode"
                            className="form-input"
                            value={individualUserData?.bankSwiftCode}

                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Branch Code in Global</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Branch Code in Global"
                            onChange={getselectedText}
                            name="locationIdGlo"
                            className="form-input"
                            value={individualUserData?.locationIdGlo}

                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3 respoChildFooter pbSt">
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Location ID in Everest</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Location ID in Everest"
                            onChange={getselectedText}
                            name="locationIdEve"
                            className="form-input"
                            value={individualUserData?.locationIdEve}

                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Location ID in NMB</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Location ID in NMB"
                            onChange={getselectedText}
                            name="locationIdNmb"
                            className="form-input"
                            value={individualUserData?.locationIdNmb}

                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3 respoChildFooter pbSt">


                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Location ID in Citizens</Form.Label>
                          &nbsp;&nbsp;<a href="#">View</a>
                          <Form.Control
                            type="text"
                            placeholder="Location ID in Citizens"
                            onChange={getselectedText}
                            name="locationIdCit"
                            className="form-input"
                            value={individualUserData?.locationIdCit}

                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Location Code in GME</Form.Label>
                          &nbsp;&nbsp;<a href="#">View</a>
                          <Form.Control
                            type="text"
                            placeholder="Location Code in GME"
                            onChange={getselectedText}
                            name="locationIdGme"
                            className="form-input"
                            value={individualUserData?.locationIdGme}

                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3 respoChildFooter pbSt">
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Location ID in NIC</Form.Label>
                          &nbsp;&nbsp;<a href="#">View</a>
                          <Form.Control
                            type="text"
                            placeholder="Location ID in NIC"
                            onChange={getselectedText}
                            name="locationIdNic"
                            className="form-input"
                            value={individualUserData?.locationIdNic}

                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Location ID in Sunrise</Form.Label>
                          &nbsp;&nbsp;<a href="#">View</a>
                          <Form.Control
                            type="text"
                            placeholder="Location ID in Sunrisey"
                            onChange={getselectedText}
                            name="locationId"
                            className="form-input"
                            value={individualUserData?.locationId}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3 respoChildFooter pbSt">
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Location ID in eSewa</Form.Label>
                          &nbsp;&nbsp;<a href="#">View</a>
                          <Form.Control
                            type="text"
                            placeholder="Location ID in eSewa"
                            onChange={getselectedText}
                            name="locationIdEsewa"
                            className="form-input"
                            value={individualUserData?.locationIdEsewa}

                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Location ID in iPay</Form.Label>
                          &nbsp;&nbsp;<a href="#">View</a>
                          <Form.Control
                            type="text"
                            placeholder="Location ID in iPay"
                            onChange={getselectedText}
                            name="locationIdIpay"
                            className="form-input"
                            value={individualUserData?.locationIdIpay}

                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mt-3 respoChildFooter pbSt">
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Location ID in Prabhu</Form.Label>
                          &nbsp;&nbsp;<a href="#">View</a>
                          <Form.Control
                            type="text"
                            placeholder="Location ID in Prabhu"
                            onChange={getselectedText}
                            name="locationIdPrabhu"
                            className="form-input"
                            defaultValue={individualUserData?.locationIdPrabhu}

                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group
                          as={Col}
                          className="left-inner-addon input-container"
                        >
                          <Form.Label>Location ID in IME</Form.Label>
                          &nbsp;&nbsp;<a href="#">View</a>
                          <Form.Control
                            type="text"
                            placeholder="Location ID in IME"
                            onChange={getselectedText}
                            name="locationIdIme"
                            className="form-input"
                            defaultValue={individualUserData?.locationIdIme}

                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <div className="row d-flex m-auto mt-3">
                        <a
                          className="purpleBackground btn btn-default text-white bolder d-block w-auto"
                          onClick={createNewData}
                        > {id ? "Update" : "Create"}
                        </a>
                        &nbsp;&nbsp;
                        <a
                          className="btn btn-default  text-black bolder w-auto"
                          onClick={handleCancel}
                        > Cancel
                        </a>
                      </div>
                    </Row>
                  </Form>
                </Container>
              </div>
            </div>
          </div>
        </Container>


        <Modal show={show} centered>
          <Modal.Header onHide={handleClose} closeButton >
            <Modal.Title className="p-0 m-0"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="bolder text-center">Add New Delivery Method</h3><br></br >
            <Form.Group as={Col} className="" controlId="formGridCity" >
              <Col className="px-0">
                <Form.Label className="fs-5"> Default Partner Bank </Form.Label>
                <Form.Control className="fs-5" id="PaymentName" type="text" onChange={handleChange} />
              </Col>
            </Form.Group>
            <br />
            < br />
            <Row className="justify-content-center">
              <Col className="col-lg-5 px-0 justify-content-center d-flex">
                <Button variant="primary" className="w-75 py-3" onClick={handleSaveNewDeliveryMethod}>
                  Save
                </Button>
              </Col>
              <Col className="col-lg-5 px-0 justify-content-center d-flex">
                <Button variant="secondary" className="w-75 py-3" onClick={handleClose}>
                  Cancel
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>

        <Modal show={showDelete} centered>
          <Modal.Header onHide={handleCloseDelete} closeButton >
            <Modal.Title className="p-0 m-0"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3 className="bolder text-center">Delete Delivery Type</h3><br></br>
            {/* <Form.Group as={Col} className="" controlId="formGridCity" >
              <Col className="px-0">
                <Form.Label className="fs-5"> Name </Form.Label>
                <Form.Control className="fs-5" id="PaymentName" onChange={handleChange} />
              </Col>
            </Form.Group> */}


            <Col className="col-lg-11 px-0">
              <Form.Select onChange={handleDeliveryMethodNameDeleteChange} name="deliveryMethodName" disabled={id}>
                <option>Select Delivery type Name</option>
                {type &&
                  type.map((typeName, index) => {
                    return (
                      <option value={typeName.id} key={index}>{typeName.type}</option>
                    );
                  })}
              </Form.Select>
            </Col>
            <br />
            {/* <hr></hr> */}
            <br />
            <Row className="justify-content-center">
              <Col className="col-lg-5 px-0 justify-content-center d-flex">
                <Button variant="primary" className="w-75 py-3" onClick={handleDeliveryMethodNameDelete}>
                  Delete
                </Button>
              </Col>
              <Col className="col-lg-5 px-0 justify-content-center d-flex">
                <Button variant="secondary" className="w-75 py-3" onClick={handleCloseDelete}>
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
  )
}

export default DeliveryMethodCreate

