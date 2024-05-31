import React, { useEffect, useState } from "react";
import "./FAQContent.scss";
import PageHeader from "../../../../components/PageHeader";
import axios from "axios";
import { CommonConstants } from "../../../../Constants/common.constants";
import moment from "moment";
import {
  Box,
  Modal,
  Button,
  Pagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form } from "react-bootstrap";
import NoRecordWithAddBtn from "../../../../Helpers/NoRecord/NoRecordWithAddBtn";
import Loader from "../../../Loader/Loader";
import ModalComponentPopup from "../../ModalComponentPopup";
import ModalComponent from "../../ModalComponent";
import parse from 'html-react-parser';
import { useNavigate } from "react-router-dom";


export default function FAQContent() {
  const [deleteDataId, setDeleteDataId] = useState(0);
  const navigate = useNavigate();
  const [fundData, setFundData] = useState([]);
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
  const [modalShow, setModalShow] = useState(false);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
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
  const [questionModalContent, setQuestionModalContent] = useState(""); // Add this line
  const [openQuestionModal, setOpenQuestionModal] = useState(false); // Add this line
  const [answerModalContent, setAnswerModalContent] = useState("");
  const [openAnswerModal, setOpenAnswerModal] = useState(false);

  const handleOpenQuestionModal = (content) => {
    setQuestionModalContent(content);
    setOpenQuestionModal(true);
  };

  const handleCloseQuestionModal = () => {
    setOpenQuestionModal(false);
  };

  const handleOpenAnswerModal = (content) => {
    setAnswerModalContent(content);
    setOpenAnswerModal(true);
  };

  const handleCloseAnswerModal = () => {
    setOpenAnswerModal(false);
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleNoteCloseModal = () => {
    setOpenNoteModal(false);
  };
  const handleOpenModel = async (id) => {
    await axios
      .post(CommonConstants.BASE_URL + "/getreportfraudbyid", { id: id })
      .then((responce) => {
        if (responce.data.status == true) {
          setShowData(responce.data.data);
          setOpenNoteModal(true);
        }
      })
      .catch((error) => console.log(error));
  };
  const getAllReportFraud = async () => {
    setloadervalue(true);
    const payload = {
      pageindex: Page,
      pagesize: RowsPerPage,
      searchdata: Search,
      sortparam: "created_at",
      sortorder: "DESC",
    };
    await axios
      .post(CommonConstants.BASE_URL + "/getallfaq", payload)
      .then((responce) => {
        setFundData(responce.data.data);
        setShowData(responce.data.data[0]);
        SetCountPage(responce.data.totalPageCount);
        SetNumItems(responce.data.recordCount);
        setShowSearch(responce.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      })
      .catch((error) => {
        console.log(error);
      });
    setloadervalue(false);
  };

  const navigateToAddFAQCreate = (id) => {
    navigate({
      pathname: "/add-faq-content",
    });
  };

  const navigateToEditFAQCreate = (id) => {
    navigate({
      pathname: "/add-faq-content",
      state: id,
    });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(fundData.length > 0 || searchTerm.trim() !== '');
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
  const handlOpenDelete = (id) => {
    setDeleteDataId(id);
    setmodalShowPrChange(true);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const handleDeleteClick = async () => {
    setmodalShowPrChange(false);
    try {
      const deleRecord = await axios.post(
        CommonConstants.BASE_URL + "/deletfaqbyid",
        { id: deleteDataId }
      );
      if (deleRecord.data.status == true) {
        setModalShow(true);
        getAllReportFraud();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllReportFraud();
  }, [Search, RowsPerPage, Page]);

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid" onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <PageHeader
          HeaderText="FAQ "
          Breadcrumb={[
            { name: "Dashboard", navigate: "" },
            { name: "IoT Dashboard", navigate: "" },
          ]}
        />
        <div className="row clearfix" >
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="body project_report">
                <div className="table-responsive">
                  <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                    {fundData && fundData.length > 0 && (
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
                            navigateToAddFAQCreate();
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
                  {fundData && fundData.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table className="table m-b-0 table-hover mt-3">
                        <thead className="thead-light">
                          <tr>
                            <th>Questions</th>
                            <th>Answers</th>
                            <th>Sort Order</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fundData.map((row) => {
                            return (
                              <tr>
                                <td>
                                  {row.question.length > 50 ? (
                                    <>
                                      {`${row.question.slice(0, 50)}...`}
                                      <span
                                        onClick={() =>
                                          handleOpenQuestionModal(row.question)
                                        }
                                        style={{
                                          cursor: "pointer",
                                          color: "blue",
                                          textDecoration: "underline",
                                        }}
                                      >
                                        Read More
                                      </span>
                                    </>
                                  ) : (
                                    row.question
                                  )}
                                </td>
                                <td>
                                  {row.answer.length > 50 ? (
                                    <>
                                      {`${row.answer.slice(0, 50)}...`}
                                      <span
                                        onClick={() =>
                                          handleOpenAnswerModal(row.answer)
                                        }
                                        style={{
                                          cursor: "pointer",
                                          color: "blue",
                                          textDecoration: "underline",
                                        }}
                                      >
                                        Read More
                                      </span>
                                    </>
                                  ) : (
                                    row.answer
                                  )}
                                </td>
                                <td>{row.sortorderNumber ? row.sortorderNumber : 0}</td>
                                <td className="project-actions">
                                  <a
                                    onClick={() =>
                                      navigateToEditFAQCreate(row.id)
                                    }
                                    className="btn btn-outline-secondary mr-1"
                                  >
                                    <i className="fa fa-edit" title="Edit"></i>
                                  </a>
                                  &nbsp;
                                  <a
                                    onClick={() => {
                                      handlOpenDelete(row.id);
                                    }}
                                    className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                  >
                                    <i
                                      className="fa fa-trash"
                                      style={{ color: "red" }}
                                      title="Delete"
                                    ></i>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <NoRecordWithAddBtn />
                  )}
                </div>
                {fundData && fundData.length > 0 && (
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

      <Modal open={openQuestionModal} onClose={handleCloseQuestionModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "50%" },
            paddingBottom: "20px",
          }}
        >
          <div>
            <div className="border-bottom py-2 mb-0 d-flex justify-content-between">
              <h5>Full Question</h5>
              <div onClick={handleCloseQuestionModal} className="pointer">
                <CloseIcon />
              </div>
            </div>
            <div className="p-3 ps-0 ">{questionModalContent}</div>
          </div>
        </Box>
      </Modal>

      <Modal open={openAnswerModal} onClose={handleCloseAnswerModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "50%" },
            paddingBottom: "20px",
          }}
        >
          <div>
            <div className="border-bottom py-2 mb-0 d-flex justify-content-between">
              <h5>Full Answer</h5>
              <div onClick={handleCloseAnswerModal} className="pointer">
                <CloseIcon />
              </div>
            </div>
            {/* <div className="p-3 ps-0 answerScrolling">{answerModalContent}</div> */}

            <div className="p-3 ps-0 answerScrolling">{parse(answerModalContent)}</div>

          </div>
        </Box>
      </Modal>

      {/* view model  */}
      <Modal open={openNoteModal} onClose={handleNoteCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "50%" },
            paddingBottom: "20px",
          }}
        >
          <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
            <h5>Details</h5> {/* Header Title */}
            <div onClick={handleNoteCloseModal} className="pointer">
              <CloseIcon />
            </div>
          </div>
          <div className="">
            <div className="row">
              <div className="my-2">
                <ul className="list-unstyled">
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Full Name:</div>
                    <div className="ms-3">{showData?.fullName}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Email:</div>
                    <div className="ms-3">{showData?.email}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Mobile:</div>
                    <div className="ms-3">{showData?.phone}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Customer Id:</div>
                    <div className="ms-3">
                      {showData?.customerId == "" ? "-" : showData?.customerId}
                    </div>
                  </li>

                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">
                      Who Is Reporting Fraud:
                    </div>
                    <div className="ms-3">{showData?.reportingFraud}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">
                      Fraud Suspect Country:
                    </div>
                    <div className="ms-3">{showData?.fraudSuspectCountry}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">
                      Fraud Reporting Country:
                    </div>
                    <div className="ms-3">
                      {showData?.fraudReportingCountry}
                    </div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Title:</div>
                    <div className="ms-3">{showData?.title}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">
                      Details of matter:
                    </div>
                    <div className="ms-3">{showData?.details}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Date:</div>
                    <div className="ms-3">
                      {moment(showData?.createdAt).format("YYYY-MM-DD")}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end mt-3 border-top">
            {/* <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
              // onClick={addNoteTrasnsaction}
              >
                Add
              </Button>
            </div> */}
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
      {/* delete model */}
      <ModalComponentPopup
        show={modalShowPrChange}
        title1={"Are you sure want to delete this record ?"}
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={() => handleDeleteClick()}
      />

      <ModalComponent
        show={modalShow}
        title11={"Deleted successfully"}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
