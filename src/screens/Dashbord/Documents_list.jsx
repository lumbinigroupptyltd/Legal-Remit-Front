import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import moment from "moment";
import {Box, Modal, Button} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form } from "react-bootstrap";
import PdfLogo from '../../assets/images/pdf.png'
import ModalComponentPopup from "./ModalComponentPopup";
import ModalComponent from "./ModalComponent";
import Loader from "../Loader/Loader";

const Document_list = ({ userId, addedDocument }) => {
  const category = [
    "Account Created",
    "Account Closed",
    "Account Deleted",
    "Send Otp",
    "Forgot Password",
    "Verified Email",
    "Register Email",
    "Transaction notify",
    "Transaction submitted",
    "Transaction refund",
    "Transaction cancel",
    "Additional Document request",
    "Report of Fraud",
    "Support",
    "Refund Request",
    "Birthday Notification",
    "Request Document"
  ]
  const [loadervalue, setloadervalue] = useState(false);
  const [documantData, setDocumentData] = useState([]);
  const [idDocuments, setIdDocuments] = useState([]);
  const [businessDocuments, setBusinessDocuments] = useState([]);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [openRequsetModel, setOpenRequsetModel] = useState(false);
  const [notificationTemplate, setNotificationTemplate] = useState([]);
  const [idData, setIdData] = useState([]);
  const [typeID, setTypeID] = useState(14);
  const [selectedId, setSelctedIdeType] = useState(7991);
  const [error, setError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [description, setDescription] = useState('');
  const [notificationTemplateId, setNotificationTemplateId] = useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, selectedID] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);

  const [isFront, setIsFront] = useState(false);
  const [isBack, setIsBack] = useState(false);
  const [idIsueauthority, setIdIsueauthority] = useState([]);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [Search, SetSearch] = React.useState('');
  const [idNumber, setIdNumber] = useState('');
  const [exprieyDate, setExprieyDate] = useState("");
  const [IdIsueauthorityID, setIdIsueauthorityID] = useState("");
  const [Idtypes, setIdtypes] = useState([]);
  const [documnetType, setDocumnetType] = useState("Id Document");
  const [otherDocumnet, setOtherDocument] = useState(0);
  const [selectDocName, setSelectDocName] = useState("");
  const [isLoding, setIsLoding] = useState(false);


  const getNotificationTemplate = async () => {

    await axios.get(CommonConstants.BASE_URL + '/getnotificationtemplatesbykyc').then((responce) => {
      setNotificationTemplate(responce.data.data);
    }).catch(error => {
      console.log(error);
    })
  }
  const getDocuments = async () => { //userId
    setloadervalue(true);
    await axios.post(CommonConstants.BASE_URL + "/getuserinfobyid", { id: userId }).then(responce => {
      if (responce.data.status == true) {
        const documnets = responce.data.data;
        setDocumentData(documnets.additionalDocuments);
        setIdDocuments(documnets.idDocuments);
        setBusinessDocuments(documnets.businessDocuments);
        getIdIssueauthority(documnets?.userkycdetails?.nationality, documnets.countryId);
        getOtherDoument(documnets.countryId);
      }
      setloadervalue(false);
    }).catch(error => console.log(error))
  }
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setOtherDocument(selectedValue);
    const selectedName = Idtypes.find(ele => ele.id == selectedValue);
    setSelectDocName(selectedName.name);
  }
  const getOtherDoument = async (countryID) => {
    const payload = {
      countryId: countryID
    }
    const getData = await axios.post(CommonConstants.BASE_URL + "/getactiveadditiondocumenttypebycountryid", payload);
    if (getData.data.status == true) {
      setIdtypes(getData.data.data);
    }
  }
  const handleOpenDeleteModel = (id) => {
    setmodalShowPrChange(true);
    selectedID(id);
  }
  const handleCloseModal = () => {
    setOpenRequsetModel(false);
    setError(false);
  }
  const handleOpnModel = () => {
    setOpenRequsetModel(true);
  }
  const opemodel = () => {
    setOpenNoteModal(true);
  }
  const handleNoteCloseModal = () => {
    setOpenNoteModal(false);
    setError(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setIsFront(true);
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    setSelectedFile2(file);
    setIsBack(true);
  };

  const handleFileChange3 = (e) => {
    const file = e.target.files[0];
    setSelectedFile3(file);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const handleDelete = async () => {
    try {
      setmodalShowPrChange(false);
      const payload = {
        "id": id
      }
      const deleteData = await axios.post(CommonConstants.BASE_URL + '/addtoarchive', payload);
      if (deleteData.data.status == true) {
        setModalShow(true);
      }
    } catch (error) { console.log(error) }
  }
  const getImgLogo = (row) => {
    let icon;
    if (row.toLowerCase().endsWith('.jpg') || row.toLowerCase().endsWith('.png')) {
      icon = (
        <img
          src={row}
          className="img-fluid"
          height="60"
          width="60"
          alt="Image"
        />
      );
    } else if (row.toLowerCase().endsWith('.pdf')) {
      icon = (
        <img
          src={PdfLogo} // Replace with the actual path to the PDF logo
          className="img-fluid"
          height="60"
          width="60"
          alt="PDF"
        />
      );
    } else if (row.toLowerCase().endsWith('.doc') || row.toLowerCase().endsWith('.docx')) {
      icon = (
        <img
          src={PdfLogo} // Replace with the actual path to the DOC logo
          className="img-fluid"
          height="60"
          width="60"
          alt="DOC"
        />
      );
    } else {
      icon = '-';
    }
    return icon;
  }
  const getIdTypes = async () => {
    try {
      const Responce = await axios.post(CommonConstants.BASE_URL + '/getactiveidtypebycountryid', { "countryId": typeID });
      const idData = Responce.data.data;
      setIdData(idData);
    } catch (err) { console.log(err) }
  }

  const addTypeOfId = async () => {
    if (documnetType == "Id Document") {
      if (!selectedId || selectedFile == null || !idNumber || !exprieyDate || !IdIsueauthorityID) {
        setError(true);
      } else if (selectedId == 7956 && !selectedFile2) {
        setError(true);
      } else {
        setloadervalue(true);
        const requestData = new FormData();
        requestData.append('userId', userId);
        requestData.append('typeId', selectedId);
        requestData.append('frontDocument', selectedFile);
        requestData.append('backDocument', selectedFile2);
        requestData.append('documentNumber', idNumber);
        requestData.append('documentValidity', exprieyDate);
        requestData.append('issuingAuthority', IdIsueauthorityID);
        await axios.post(CommonConstants.BASE_URL + '/uploadiddocument', requestData).then((responce) => {
          if (responce.data.status == true) {
            setOpenNoteModal(false);
            getDocuments();
            setloadervalue(false);
            setSelctedIdeType(0);
            setSelectedFile2(null);
            setSelectedFile(null);
            setIdNumber("");
            setIdIsueauthorityID("");
            setExprieyDate("");
            addedDocument(responce.data.data);
          }
        }).catch(error => console.log(error));
      }
    } else {
      try {
        setloadervalue(true);
        const sendData = new FormData();
        sendData.append("userId", userId);
        sendData.append("documentTypeId", otherDocumnet);
        sendData.append("documents", selectedFile3);
        sendData.append("type", selectDocName);
        const sendRequest = await axios.post(CommonConstants.BASE_URL + '/uploadbusinessdocuments', sendData);
        if (sendRequest.data.status == true) {
          setOpenNoteModal(false);
          getDocuments();
          setIsLoding(true);
        }
        setloadervalue(false);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    let selectedCategoryData = event.target.value;
    getNotificationText(selectedCategoryData);
  };

  const getNotificationText = async (value) => {
    try {
      const data = {
        "category": value.toString()
      };
      const response = await axios.post(CommonConstants.BASE_URL + "/getnotificationbycategory", data);
      if (response?.data?.status === true && response?.data?.data) {
        const { title, description } = response.data.data;
        setDescription(description);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requsetDocumet = async () => {
    try {
      setloadervalue(true);
      if (selectedCategory == 0) {
        setError(true);
      } else {
        const requestData = new FormData();
        requestData.append('userId', userId);
        requestData.append('notificationTemplateId', selectedCategory);
        requestData.append('description', description);
        const responce = await axios.post(CommonConstants.BASE_URL + '/requestdocument', requestData);
        if (responce.data.status == true) {
          setOpenRequsetModel(false);
          setModalShow1(true);
          setDescription("");
        }
      }
      setloadervalue(false);
    } catch (error) { console.log(error) }

  }

  const handleCloseDelete = () => {
    setModalShow(false);
    getDocuments();
  }
  const handleCloseDelete1 = () => {
    setModalShow1(false);
    getDocuments();
  }
  const getIdIssueauthority = async (nationality, Country) => {
    try {
      const payload = {
        nationality: nationality,
        countryId: Country
      };
      const Responce = await axios.post(CommonConstants.BASE_URL + '/getissueauthoritybynationality', payload);  //getissueauthoritybynationality
      const idData = Responce.data.data;
      setIdIsueauthority(idData);
    } catch (err) { console.log(err) }
  }
  useEffect(() => {
    getIdTypes();
    getDocuments();
    getNotificationTemplate();
  }, [userId, addedDocument])
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid">
        <PageHeader
          className="responsiveFontLarge"
          HeaderText="Document List"
          Breadcrumb={[
            { name: "Dashboard", navigate: "" },
            { name: "IoT Dashboard", navigate: "" },
          ]}
        />
        <div className="d-flex justify-content-end mt-3 respoChildFooter">
          <div className="text-center " style={{ marginRight: "10px" }}>
            <button
              type="submit"
              className="btn m-1 text-light rounded-5 m-0"
              style={{ background: "#AA2AE1" }}
              onClick={() => opemodel()}
            >
              Add Document
            </button>
          </div>
          <div className="text-center ">
            <button
              type="button"
              className="btn m-1 text-light rounded-5 bg-dark m-0"
              onClick={handleOpnModel}
            >
              Request Document
            </button>
          </div>
        </div>
        {documantData && documantData.length > 0 && <div className="filter-row pb-2">
          <p className="font-weight-normal responsiveFontLarge">Additional Documents</p>
          <div style={{ overflowX: "auto" }}>
            <table className="table m-b-0 mt-3">
              <thead className="thead-light">
                <tr>
                  <th>Type</th>
                  <th>Upload Date</th>
                  <th>Preview</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  documantData && documantData.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td>{row.type}</td>
                        <td>{moment(row.createdAt).format('YYYY-MM-DD HH:MM:SS')}</td>
                        <td>{getImgLogo(row.filePath)}</td>
                        <td className="project-actions">
                          <a
                            className="btn btn-outline-secondary"
                            onClick={() => handleOpenDeleteModel(row.id)} // Replace with your delete function
                          >
                            <i
                              className="fa fa-trash"
                              style={{ color: 'red' }}
                              title="Move To Archive"
                            ></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>}
        <br></br>
        {idDocuments && idDocuments.length > 0 && <div className="filter-row pb-2">
          <p className="font-weight-normal responsiveFontLarge">ID Documents</p>
          <div style={{ overflowX: "auto" }}>
            <table className="table m-b-0 mt-3">
              <thead className="thead-light">
                <tr>
                  <th>Type</th>
                  <th>Upload Date</th>
                  <th>Front View</th>
                  <th>Back View</th>
                  <th>Preview</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  idDocuments && idDocuments.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td>{row.type}</td>
                        <td>{moment(row.createdAt).format('YYYY-MM-DD HH:MM:SS')}</td>
                        <td>{row.isFront == true ? "YES" : "No"}</td>
                        <td>{row.isBack == true ? "YES" : "No"}</td>
                        <td>{getImgLogo(row.filePath)}</td>
                        <td className="project-actions">
                          <a
                            className="btn btn-outline-secondary"
                            onClick={() => handleOpenDeleteModel(row.id)} // Replace with your delete function
                          >
                            <i
                              className="fa fa-trash"
                              style={{ color: 'red' }}
                              title="Move To Archive"
                            ></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>}
        <br></br>
        {businessDocuments && businessDocuments.length > 0 && <div className="filter-row pb-2">
          <p className="font-weight-normal responsiveFontLarge">Business Documents</p>
          <div style={{ overflowX: "auto" }}>
            <table className="table m-b-0 mt-3">
              <thead className="thead-light">
                <tr>
                  <th>Type</th>
                  <th>Upload Date</th>
                  <th>Preview</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  businessDocuments && businessDocuments.map((row, index) => {
                    return (
                      <tr key={index}>
                        <td>{row.documentType == "" || null ? "-" : row.documentType}</td>
                        <td>{moment(row.createdAt).format('YYYY-MM-DD HH:MM:SS')}</td>
                        <td>{getImgLogo(row.filePath)}</td>
                        <td className="project-actions">
                          <a
                            className="btn btn-outline-secondary"
                            onClick={() => handleOpenDeleteModel(row.id)} // Replace with your delete function
                          >
                            <i
                              className="fa fa-trash"
                              style={{ color: 'red' }}
                              title="Move To Archive"
                            ></i>
                          </a>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>}
      </div>


      {/* add documnet model */}
      <Modal open={openNoteModal} onClose={handleNoteCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-1 d-flex justify-content-between">
            <h5>Add Document</h5> {/* Header Title */}
            <div onClick={handleNoteCloseModal} className="pointer">
              <CloseIcon />
            </div>
          </div>

          <div className="">
            <div className="row">
              <div className="col-lg-12 my-2">
                <div className="font-weight-normal  mb-1 text-black d-flex">
                  Document Type
                </div>
                <Form.Select aria-label="Default select example"
                  onChange={(e) => setDocumnetType(e.target.value)} value={documnetType} >
                  <option value="Id Document">Id Document</option>
                  <option value="Other Document">Other Document</option>
                </Form.Select>
              </div>
              {
                documnetType == "Id Document" ?
                  <>
                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal  mb-1 text-black d-flex">
                        Document Type
                      </div>
                      <Form.Select aria-label="Default select example"
                        onChange={(e) => setSelctedIdeType(e.target.value)} value={selectedId} >
                        <option>Select Type</option>
                        {
                          idData && idData.map((row) => {
                            return (
                              <>
                                <option value={row.id}>{row.name}</option>
                              </>
                            )
                          })
                        }
                      </Form.Select>
                      {error && !selectedId && <small className="responsiveFontLarge  text-danger"> Please Select Document Type </small>}
                    </div>
                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal   mb-1 text-black d-flex">
                        ID Number
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="ID Number"
                        value={idNumber}
                        onChange={(e) => {
                          const alphanumericValue = e.target.value.replace(/[^A-Za-z0-9]/g, "");
                          setIdNumber(alphanumericValue);
                        }}
                      />

                      {error && !idNumber && <small className="responsiveFontLarge  text-danger"> Please Enter idNumber </small>}
                    </div>
                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal   mb-1 text-black d-flex">
                        Date of Expiry
                      </div>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Date of Expiry"
                        value={exprieyDate}
                        onChange={(e) => setExprieyDate(moment(e.target.value).format("YYYY-MM-DD"))}
                      />
                      {error && !exprieyDate && <small className="responsiveFontLarge  text-danger"> Please Select Expiry Date </small>}
                    </div>
                    <div className="font-weight-normal   mb-1 text-black d-flex">
                      Issuing Authority
                    </div>
                    <Form.Select aria-label="Default select example"
                      onChange={(e) => setIdIsueauthorityID(e.target.value)} defaultValue={IdIsueauthorityID} >
                      <option>Select Issuing Authority</option>
                      {
                        idIsueauthority && idIsueauthority.map((row) => {
                          return (
                            <>
                              <option value={row.authorityName}>{row.authorityName}</option>
                            </>
                          )
                        })
                      }
                    </Form.Select>
                    {error && !IdIsueauthorityID && <small className="responsiveFontLarge  text-danger"> Please Select Issuing Authority </small>}
                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal   mb-1 text-black d-flex">
                        Document (Front)
                      </div>
                      <input
                        type="file"
                        className=""
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {error && !selectedFile && <small className="responsiveFontLarge  text-danger"> Please Select File </small>}
                    </div>
                    {selectedId == 7956 && <div className="col-lg-12 my-2">
                      <div className="font-weight-normal   mb-1 text-black d-flex">
                        Document (Back)
                      </div>
                      <input
                        type="file"
                        className=""
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange2}
                      />
                      {error && selectedId == 7956 && !selectedFile2 && <small className="responsiveFontLarge  text-danger"> Please Select File </small>}
                    </div>}

                  </>
                  :
                  <>
                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal  mb-1 text-black d-flex">
                        Select Any Document
                      </div>
                      <Form.Select aria-label="Default select example"
                        onChange={(e) => handleChange(e)} value={otherDocumnet} >
                        <option>Select Document</option>
                        {
                          Idtypes && Idtypes.map((row) => {
                            return (
                              <>
                                <option value={row.id}>{row.name}</option>
                              </>
                            )
                          })
                        }
                      </Form.Select>
                    </div>
                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal   mb-1 text-black d-flex">
                        Document
                      </div>
                      <input
                        type="file"
                        className=""
                        id="fileInput"
                        // accept="image/*"
                        onChange={handleFileChange3}
                      />
                      {/* {error && !selectedFile && <small className="responsiveFontLarge  text-danger"> Please Select File </small>} */}
                    </div>
                  </>
              }

            </div>
          </div>

          <div className="row d-flex justify-content-end  border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={addTypeOfId}
              >
                Submit
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleNoteCloseModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* requset documnet */}
      <Modal open={openRequsetModel} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-1 d-flex justify-content-between">
            <h5>Request Document</h5> {/* Header Title */}
            <div onClick={handleCloseModal} className="pointer">
              <CloseIcon />
            </div>
          </div>

          <div className="">
            <div className="row">
              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                  Select Template
                </div>
                <Form.Select aria-label="Default select example" onChange={handleCategoryChange}>
                  <option value="">Select an option</option>
                  {notificationTemplate.map((row, index) => (
                    <option key={index} value={row.id}>{row.title}</option>
                  ))}
                </Form.Select>
                {error && !selectedCategory && <small className="responsiveFontLarge  text-danger"> Please Select an option </small>}
              </div>

              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                  Description
                </div>
                <textarea
                  type="textarea"
                  className="form-control"
                  // placeholder=" New Note"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end mt-3 border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={requsetDocumet}
              >
                Send
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* delete model */}
      <ModalComponentPopup
        show={modalShowPrChange}
        title1={"Are you sure want to delete this record ?"}
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={() => handleDelete()}
      />

      {/* delete success model  */}
      <ModalComponent
        show={modalShow}
        title11={"Deleted successfully"}
        onHide={() => handleCloseDelete()}
      />
      <ModalComponent
        show={modalShow1}
        title11={"Request send to user successfully"}
        onHide={() => handleCloseDelete1()}
      />
    </>
  )
}
export default Document_list;