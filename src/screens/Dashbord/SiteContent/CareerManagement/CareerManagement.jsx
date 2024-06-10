import React, { useEffect, useState } from "react";
import "./CareerManagement.scss";
import PageHeader from "../../../../components/PageHeader";
import axios from "axios";
import { CommonConstants } from "../../../../Constants/common.constants";
import {
  Box,
  Modal,
  Button,
  Pagination,
} from "@mui/material";
import { Form } from "react-bootstrap";
import NoRecordWithAddBtn from "../../../../Helpers/NoRecord/NoRecordWithAddBtn";
import Loader from "../../../Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import ModalComponent from "../../ModalComponent";
import ModalComponentPopup from "../../ModalComponentPopup";


const label = { inputProps: { "aria-label": "Active" } };

export default function CareerManagement() {
  const navigate = useNavigate();
  const [careerData, setCareerData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [Search, SetSearch] = React.useState("");
  const [loadervalue, setloadervalue] = useState(false);
  const [RowsPerPage, SetRowsPerPage] = React.useState(
    CommonConstants.DefaultPageSize
  );
  const [Page, SetPage] = React.useState(1);
  const [numItems, SetNumItems] = React.useState(0);
  const [CountPage, SetCountPage] = React.useState(0);
  const [showData, setShowData] = useState({
    id: "",
    haveCustomerId: null,
    customerId: "",
    userId: 0,
    fullName: "",
    email: "",
    phone: "",
    reportingFraud: "",
    fraudSuspectCountryId: 0,
    fraudSuspectCountry: "",
    fraudReportingCountryId: 0,
    fraudReportingCountry: "",
    title: "",
    details: "",
    createdAt: "",
    updatedAt: "",
    deleted: false,
  });
  const [modalShow, setModalShow] = useState(false);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [id, setId] = useState(0);
  // Function to open the modal and set the selected message
  const openMessageModal = (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };
  const confirmClick = async (id) => {
    setmodalShowPrChange(true)
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(careerData.length > 0 || searchTerm.trim() !== '');
  };
  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
    }
  };

  const handleEditPage = (id) => {
    // navigate({ pathname: "/view-careermanagement" });
    navigate({
      pathname: '/add-careermanagement',
      state: id
    });
  };
  const moveToAdd = () => {
    navigate('/add-careermanagement');
  }
  const getAllCareerManagemnets = async () => {
    const payload = {
      "pageindex": Page,
      "pagesize": RowsPerPage,
      "searchdata": Search,
      "sortparam": "created_at",
      "sortorder": "DESC"
    }
    const getData = await axios.post(CommonConstants.BASE_URL + '/getallcareersmanagement', payload);
    if (getData.data.status == true) {
      setCareerData(getData.data.data);
      SetCountPage(getData.data.totalPageCount);
      SetNumItems(getData.data.recordCount);
      setShowSearch(getData.data.recordCount == 0 ? (Search == "" ? false : true) : true);
    }
  }
  const handleDelete = async () => {
    setmodalShowPrChange(false);
    const deleteData = await axios.post(CommonConstants.BASE_URL + "/deletecareersmanagemenbyid", { "id": id });
    if (deleteData.data.status == true) {
      setModalShow(true);
      getAllCareerManagemnets();
    }
  }
  useEffect(() => {
    getAllCareerManagemnets();
  }, [Search, RowsPerPage, Page]);
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid" onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <PageHeader
          HeaderText="Careers Management"
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
                    {careerData && careerData.length > 0 && (
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
                          onChange={handleSearch}
                        />
                      </div>}{" "}
                      &nbsp;
                      <div className=" ps-0 d-flex justify-content-end">
                        <a
                          onClick={() => {
                            moveToAdd()
                          }}
                          className="btn btn-default purpleBackground text-white bolder pbSt"
                        >
                          <i className="text-white fa fa-plus bolder"></i> Add
                          New
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row"></div>
                  {careerData && careerData.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table className="table m-b-0 table-hover mt-3">
                        <thead className="thead-light">
                          <tr>
                            <th>Job Title</th>
                            <th>Job Description</th>
                            <th>Country</th>
                            <th>Location</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            careerData.map((row) => (
                              <tr>
                                <td>
                                  <Link
                                    className="d-flex align-items-center w-75"
                                    to={{
                                      pathname: "/view-careermanagement",
                                      state: row.id
                                    }}
                                    style={{ textDecoration: "none" }}
                                  >
                                    <div className="border-0">
                                      {row.job_title}
                                    </div>{" "}
                                    &nbsp;
                                  </Link>
                                </td>

                                <td>
                                  {row.description.slice(0, 20)}
                                  {row.description.length > 20 && (
                                    <span
                                      className="read-more-link text-primary pointer"
                                      onClick={() => openMessageModal(row.description)}
                                    >
                                      ... Read More
                                    </span>
                                  )}
                                </td>
                                <td>{row.countryName}</td>

                                <td>{row.location}</td>

                                <td className="project-actions">
                                  <a
                                    onClick={() => handleEditPage(row.id)}
                                    className="btn btn-outline-secondary mr-1"
                                  >
                                    <i className="fa fa-edit" title="Edit"></i>
                                  </a>
                                  &nbsp;
                                  <a
                                    onClick={() => confirmClick(row.id)}
                                    className="btn btn-outline-secondary mr-1"
                                  >
                                    <i
                                      className="fa fa-trash text-danger"
                                      title="Delete"
                                    ></i>
                                  </a>
                                  {/* <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" title='View' onClick={() => handleOpenModel(row.id)}>
                                        <RemoveRedEyeIcon />
                                      </a>{" "} */}
                                  &nbsp;
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <NoRecordWithAddBtn />
                  )}
                </div>
                {careerData && careerData.length > 0 && (
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
      <ModalComponent
        show={modalShow}
        title11={"Deleted successfully"}
        onHide={() => setModalShow(false)}
      />
      <ModalComponentPopup
        show={modalShowPrChange}
        title1={"Are you sure want to delete this record ?"}
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={() => handleDelete()}
      />
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
            <h5>Job Description</h5>
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
    </>
  );
}
