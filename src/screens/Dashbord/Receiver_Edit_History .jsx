import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import moment from "moment";
import Loader from "../Loader/Loader";
import ModalComponent from "./ModalComponent";
import ModalComponentPopup from './ModalComponentPopup';
import VerifiedIcon from "@mui/icons-material/Verified";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from '@mui/icons-material/Cancel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

const Receiver_Edit_history = ({ individualuserData }) => {
  const [showModal, setShowModal] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [loadervalue, setloadervalue] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const [editedById, setEditedById] = useState(0);
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");
  const [emailNotification, setEmailNotification] = useState(false);
  const [pushNotification, setPushNotification] = useState(false);

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleEmailCheckboxChange = (e) => {
    setEmailNotification(e.target.checked);
  };

  const handlePushCheckboxChange = (e) => {
    setPushNotification(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromData = new FormData();
    fromData.append("recipientLogId", id);
    fromData.append("isEmail", emailNotification);
    fromData.append("isPush", pushNotification);
    fromData.append("note", note);
    const sendData = await axios.post(CommonConstants.BASE_URL + "/notificationforrecipientdetailsupdate", fromData);
    if (sendData.data.status == true) {
      handleCloseModal();
      setModalShow(true);
      setMessage("Notification Send");
    }
  };

  const openAppoverModel = (ID, userID, type) => {
    setId(ID);
    setEditedById(userID);
    if (type == "approved") {
      setMessage("approved");
    } else {
      setMessage("reject");
    }
    setmodalShowPrChange(true);

  }
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const handleShowModal = (id) => {
    setShowModal(true);
    setId(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchData = () => {
    const formData = new FormData();
    formData.append("userId", individualuserData); //getrecipientactivitieslogs
    axios.post(CommonConstants.BASE_URL + "/getrecipientactivitieslogs", formData).then((responce) => {
      if (responce.data.status == true) {
        setHistoryList(responce.data.data);
      }
    }).catch(error => console.log(error));
  }
  const approvedrecipientdetails = async () => {
    setloadervalue(true);
    const formData = new FormData();
    formData.append("recipientLogId", id);
    formData.append("approvedBy", editedById);
    formData.append("isApproved", 1);
    const sendData = await axios.post(CommonConstants.BASE_URL + '/approvedrecipientdetails', formData);
    if (sendData.data.status == true) {
      fetchData();
      handlePrchangePopupCancle();
      setModalShow(true);
    }
    setloadervalue(false);
  }
  const dissapproviderecipientdetails = async () => {
    setloadervalue(true);
    const formData = new FormData();
    formData.append("recipientLogId", id);
    formData.append("approvedBy", editedById);
    formData.append("isApproved", 2);
    const sendData = await axios.post(CommonConstants.BASE_URL + '/approvedrecipientdetails', formData);
    if (sendData.data.status == true) {
      fetchData();
      handlePrchangePopupCancle();
      setModalShow(true);
    }
    setloadervalue(false);
  }
  useEffect(() => {
    fetchData();
  }, [individualuserData]);
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="p-0 body project_report">
                <div className="table-responsive">
                  <table className="table m-b-0">
                    <thead className="thead-light">
                      <tr>
                        <th>User</th>
                        <th>Fields</th>
                        <th>Old</th>
                        <th>New</th>
                        <th>Edited on</th>
                        <th>Edited By</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        historyList && historyList.length > 0 ?
                          historyList.map((res) => {
                            return (
                              <>
                                <tr>
                                  <td>{res.userName == "" ? "-" : res.userName}</td>
                                  <td>{res.field == "" ? "-" : res.field}</td>
                                  <td>{res.oldValue == ("" || "null") ? "-" : res.oldValue}</td>
                                  <td>{res.newValue == 'null' ? "-" : res.newValue}</td>
                                  <td>{moment(res.editedDate).format('YYYY-MM-DD HH:MM:SS')}</td>
                                  <td>{res.editedByName}</td>
                                  <td>
                                    {res.isApproved === 0 && (
                                      <>
                                        <a
                                          className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                          onClick={() => openAppoverModel(res.id, res.editedBy, "approved")}
                                        >
                                          <Tooltip title="Approve">
                                            <VerifiedIcon color="success" />
                                          </Tooltip>
                                        </a>
                                        <a
                                          className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                          onClick={() => openAppoverModel(res.id, res.editedBy, "reject")}
                                        >
                                          <Tooltip title="Dispproved">
                                            <CancelIcon style={{ color: "red" }} />
                                          </Tooltip>
                                        </a>
                                      </>
                                    )}

                                    {res.isApproved === 1 && (
                                      <a
                                        className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                      // onClick={() => openAppoverModel(res.id, res.editedBy, "approved")}
                                      >
                                        <Tooltip title="Approved">
                                          <CheckCircleIcon color="success" />
                                        </Tooltip>
                                      </a>
                                    )}

                                    {res.isApproved === 2 && (
                                      <a
                                        className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                        // onClick={() => openAppoverModel(res.id, res.editedBy, "reject")}
                                      >
                                        <Tooltip title="Dispproved">
                                          <CloseIcon style={{ color: "red" }} />
                                        </Tooltip>
                                      </a>
                                    )}

                                    <a
                                      className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                      onClick={() => handleShowModal(res.id)}
                                    >
                                      <Tooltip title="Send Notification">
                                        <NotificationsIcon className="purpleText" />
                                      </Tooltip>
                                    </a>
                                  </td>

                                </tr>
                              </>
                            )
                          })
                          : <td colSpan={7}><p className="text-center mt-3">No Data Found</p></td>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Modal component */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title>Send Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <div className="col-lg-12 px-0">
              <div className="font-weight-normal m-2 labelCard">
                Select Notification
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  style={{ color: "#6b757d", fontSize: "1rem" }}
                  className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border col-lg-12 d-flex align-items-center justify-content-between"
                  variant="secondary"
                >
                  Select Notification
                </Dropdown.Toggle>
                <Dropdown.Menu className="col-lg-12">
                  <Dropdown.Item>Account Created</Dropdown.Item>
                  <Dropdown.Item>Account Closed</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div> */}
            <Form.Group controlId="notes" className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} value={note} onChange={handleNoteChange} />
            </Form.Group>
            <Form.Group controlId="checkboxGroup" className="mt-3">
              <Form.Check type="checkbox" id="checkbox1" checked={emailNotification} onChange={handleEmailCheckboxChange} />
              <Form.Label htmlFor="checkbox1" style={{ marginLeft: "20px" }}>Email Notification</Form.Label>
              <Form.Check type="checkbox" id="checkbox2" checked={pushNotification} onChange={handlePushCheckboxChange} />
              <Form.Label htmlFor="checkbox2" style={{ marginLeft: "20px" }}>Push Notification</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="">
          <div className="d-flex ms-auto ">
            <Button className="purpleBorder bg-transparent purpleText" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button className="purpleBackground border-0 px-4" onClick={handleSubmit}>Add</Button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* confirm  */}
      <ModalComponent
        show={modalShow}
        title11={`${message} successfully`}
        onHide={() => setModalShow(false)}
      />
      <ModalComponentPopup
        show={modalShowPrChange}
        title1={`Are you sure you want to ${message} this recipient?`}
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={message === "approved" ? approvedrecipientdetails : dissapproviderecipientdetails}
      />

    </>
  );
};

export default Receiver_Edit_history;

