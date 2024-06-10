import React, { useEffect, useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import { CommonConstants } from "../../../../Constants/common.constants";
import { Dropdown, Form } from "react-bootstrap";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import Loader from "../../../Loader/Loader";
import NoRecordWithAddBtn from "../../../../Helpers/NoRecord/NoRecordWithAddBtn";
import { Modal, Box, Button } from "@mui/material";
import moment from "moment";
import JoditEditor from "jodit-react";
import ModalComponent from "../../ModalComponent";
import ModalComponentPopup from '../../ModalComponentPopup';

const ContactUs = () => {
  const staticMessage =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. ";
  const [RowsPerPage, SetRowsPerPage] = useState(
    CommonConstants.DefaultPageSize
  );
  const [showFullContent, setShowFullContent] = useState(false);
  const [hideTable, setHideTable] = useState(false);

  const [Page, SetPage] = useState(1);
  const [fundData, setFundData] = useState([]);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [Search, SetSearch] = useState("");
  const [loadervalue, setloadervalue] = useState(false);
  const [numItems, SetNumItems] = useState(0);
  const [CountPage, SetCountPage] = useState(0);
  const [conatctsData, setConatactsData] = useState([]);

  // State to manage the modal visibility and message content
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [showMessageDetailsModal, setShowMessageDetailsModal] = useState(false);
  const [showRecieverModal, setShowRecieverModalModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedMessageDetails, setSelectedMessageDetails] = useState("");
  const [hideMessageTable, setHideMessageTable] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [description, setDescription] = useState('');
  const [selectVideoTrackByID, setSelectVideoTrackByID] = useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [deleteModel, setDeletemodel] = useState(false);

  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const openDeleteModel = (id) => {
    setSelectVideoTrackByID(id);
    setmodalShowPrChange(true);
  }
  const deleteConatct = async () => {
    setmodalShowPrChange(false);
    try {
      const formData = new FormData();
      formData.append("id", selectVideoTrackByID);
      const response = await axios.post(CommonConstants.BASE_URL + "/deletecontactusdetails", formData);
      if (response.data.status === true) {
        setDeletemodel(true);
        getContact()
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleDescriptionChange = (value) => {
    setDescription(value);
  };
  const openMessageDetailsModal = (messageDetails) => {
    setSelectedMessageDetails(messageDetails);
    setShowMessageDetailsModal(true);
  };

  const closeMessageDetailsModal = () => {
    setShowMessageDetailsModal(false);
  };

  const openMessageDetailsModal1 = (id) => {
    setSelectVideoTrackByID(id);
    setShowRecieverModalModal(true);
  };

  const submitReplay = async () => {
    setloadervalue(true);
    const paylaod = new FormData();
    paylaod.append("contactusId", selectVideoTrackByID);
    paylaod.append("description", description);

    const sendData = await axios.post(CommonConstants.BASE_URL + "/replaycontactus", paylaod);
    if (sendData.data.status == true) {
      closeMessageDetailsModal1();
      getContact();
    }
    setloadervalue(false);
  }
  const closeMessageDetailsModal1 = () => {
    setShowRecieverModalModal(false);
  };

  // Function to open the modal and set the selected message
  const openMessageModal = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
    }
  };

  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
  };
  const handleSerach = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(conatctsData.length > 0 || searchTerm.trim() !== '');
    SetPage(1);
  };
  const getContact = async () => {
    try {
      setloadervalue(true);
      const requsetData = {
        pageindex: Page,
        pagesize: RowsPerPage,
        searchdata: Search,
      };
      const getConatctData = await axios.post(
        CommonConstants.BASE_URL + "/getallcontactusdetails",
        requsetData
      );
      if (getConatctData.data.status == true) {
        setConatactsData(getConatctData.data.data);
        SetCountPage(getConatctData.data.totalPageCount);
        SetNumItems(getConatctData.data.recordCount);
        setShowSearch(getConatctData.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      }
      setloadervalue(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContact();
  }, [RowsPerPage, Page, Search]);
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid" onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <PageHeader
          HeaderText="Contact Us Lead"
          Breadcrumb={[
            { name: "Dashboard", navigate: "" },
            { name: "IoT Dashboard", navigate: "" },
          ]}
        />
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="body project_report">
                <div className="table-responsive">
                  <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                    {conatctsData && conatctsData.length > 0 && (
                      <div className="filter-row pb-2 ">
                        Show Entries &nbsp; &nbsp;
                        <div className="d-flex align-items-center pbSt">
                          <Form.Select
                            name="tbl_meeting_length"
                            onChange={ChangeRowSelected}
                            value={RowsPerPage}
                            aria-controls="tbl_meeting"
                            className="form-control-sm py-2 h-auto  ps-3 mt-1"
                          >
                            {CommonConstants.show_rows.map((value) => (
                              <option value={value}>{value}</option>
                            ))}
                          </Form.Select>
                        </div>
                      </div>
                    )}
                    <div className="d-flex align-items-center respoChildFooter">
                      {showSearch && <div className="form-group d-flex align-items-center mb-0">
                        <label className="font-weight-normal mb-0">
                          Search:{" "}
                        </label>{" "}
                        &nbsp;&nbsp;
                        <input
                          type="search"
                          id="search"
                          className="form-control p-0 px-3 "
                          placeholder=""
                          onChange={handleSerach}
                        />
                      </div>}{" "}
                      &nbsp;
                    </div>
                  </div>
                  {conatctsData && conatctsData.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table className="table m-b-0 table-hover mt-3">
                        <thead className="thead-light">
                          <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Subject</th>
                            <th>Messages</th>
                            <th>Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {conatctsData &&
                            conatctsData.map((row) => {
                              return (
                                <>
                                  <tr>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.phone == "" ? "-" : row.phone}</td>
                                    <td>{row.subject}</td>
                                    <td>
                                      {row.message.slice(0, 30)}
                                      {row.message.length > 30 && (
                                        <span
                                          className="read-more-link text-primary pointer"
                                          onClick={() =>
                                            openMessageModal(row.message)
                                          }
                                        >
                                          ... Read More
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      {moment(row.createdAt).format(
                                        "YYYY-MM-DD HH:MM:SS"
                                      )}
                                    </td>
                                    <td className="project-actions">
                                      {row.isReply == true && <a
                                        className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                        onClick={() =>
                                          openMessageDetailsModal(row.replayDesc)
                                        }
                                      >
                                        <i
                                          className="fa fa-eye text-warning"
                                          title="View Reply"
                                        ></i>
                                      </a>}
                                      &nbsp; &nbsp;
                                      <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={() =>
                                        openMessageDetailsModal1(row.id)
                                      }>
                                        <i
                                          className="fa fa-reply"
                                          style={{ color: "green" }}
                                          title="Reply"
                                        ></i>
                                      </a>
                                      &nbsp; &nbsp;
                                      <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={() => openDeleteModel(row.id)} >
                                        <i
                                          className="fa fa-trash"
                                          style={{ color: "red" }}
                                          title="Delete"
                                        ></i>
                                      </a>
                                      &nbsp;
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <NoRecordWithAddBtn />
                  )}
                  {conatctsData && conatctsData.length > 0 && (
                    <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                      <div className="filter-row pt-2">
                        {numItems > 0
                          ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${Page * RowsPerPage > numItems
                            ? numItems
                            : Page * RowsPerPage
                          } of ${numItems} entries`
                          : "No records Available"}
                      </div>
                      <Pagination
                        count={CountPage}
                        className="pbDowSt pbSt"
                        page={Page}
                        onChange={HandleChangePage}
                        color="secondary"
                        shape="rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal open={showMessageDetailsModal}>
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
          <div className="border-bottom py-2 mb-3 d-flex justify-content-between">
            <h5>Replies</h5>
            <div onClick={closeMessageDetailsModal} className="pointer">
              <i className="fa fa-close text-black" />
            </div>
          </div>
          <div className="">
            <div className="row">
              <div className="my-2 mt-0 ">
                <div className="row ">
                  <div className="my-2 mt-0 ">
                    {showTable ? (
                      <table className="table-responsive ">
                        <thead className="thead-light d-block">
                          <tr>
                            <th>Message</th>
                            {/* <th>Action</th> */}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="font-weight-bold">
                              <div className="truncate-text">
                                {selectedMessageDetails
                                  ? selectedMessageDetails
                                  : ""}
                              </div>
                            </td>
                            {/* <td>
                              <a
                                className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black"
                                onClick={() => setShowTable(!showTable)}
                              >
                                <i
                                  className="fa fa-eye text-warning"
                                  title="Toggle Full Content"
                                ></i>
                              </a>
                            </td> */}
                          </tr>
                          {/* ... (other details) */}
                        </tbody>
                      </table>
                    ) : (
                      // Rendered when showTable is false
                      <div>
                        <span className="d-block text-justify">
                          {selectedMessageDetails}
                        </span>
                        <div className="">
                          <Button
                            className="m-0 mt-3 w-auto px-3 d-flex ms-auto "
                            variant="outlined"
                            onClick={() => setShowTable(!showTable)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={showRecieverModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "60%" },
            paddingBottom: "20px",
            height: "350px"
          }}
        >
          <div className="border-bottom py-2 mb-3 d-flex justify-content-between">
            <h5>Enquiry checking</h5>
            <div onClick={closeMessageDetailsModal1} className="pointer">
              <i className="fa fa-close text-black" />
            </div>
          </div>
          <div className="">
            <div className="row viewModal">
              <div className="my-2 mt-0">
                <div className="row">
                  <div className="my-2 mt-0">
                    <Form>
                      {/* <div className="col-lg-12 px-0">
                        <div className="font-weight-normal m-2 labelCard">
                          Select Template
                        </div>
                        <Dropdown>
                          <Dropdown.Toggle
                            style={{ color: "#6b757d", fontSize: "1rem" }}
                            className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border col-lg-12 d-flex align-items-center justify-content-between"
                            variant="secondary"
                          >
                            Select Template
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="col-lg-12">
                            <Dropdown.Item>Email</Dropdown.Item>
                            <Dropdown.Item>Birthday Wishes</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div> */}

                      <Form.Group controlId="notes" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        {/* <JoditEditor
                          onChange={handleDescriptionChange}
                          config={{ readonly: false }}
                          value={description}
                        /> */}
                        <textarea
                          type="textarea"
                          className="form-control"
                          rows=""
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                    <div className="row d-flex justify-content-end mt-3 border-top">
                      <div className="d-flex justify-content-end">
                        <Button
                          className="m-0 mt-3 w-auto px-3"
                          variant="contained"
                          color="primary"
                          onClick={submitReplay}
                        >
                          Send
                        </Button>
                        &nbsp;
                        &nbsp;
                        <Button
                          className="m-0 mt-3 w-auto px-3"
                          variant="outlined"
                          onClick={closeMessageDetailsModal1}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={showMessageModal}>
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
            <h5>Description</h5>
            <div onClick={closeMessageModal} className="pointer">
              <i className="fa fa-close text-black" />
            </div>
          </div>
          <div className="">
            <div className="row">
              <div className="my-2">
                <ul className="list-unstyled mb-0">
                  <li className="py-2 d-flex">
                    {/* <div className="font-weight-normal w-50"> Full Name : </div> */}
                    <div className="">{selectedMessage}</div>
                  </li>
                  {/* ... (other details) */}
                  {/* Replace with your other details */}
                </ul>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-end mt-3 border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={closeMessageModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <ModalComponent
        show={deleteModel}
        title11={"Deleted successfully"}
        onHide={() => setDeletemodel(false)} />
      <ModalComponentPopup
        show={modalShowPrChange}
        title1={"Are you sure want to delete this record ?"}
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={() => deleteConatct()}
      />
    </>
  );
};

export default ContactUs;
