import React, { useEffect, useState } from "react";
import "./NewsPage.scss";
import PageHeader from "../../../../components/PageHeader";
import axios from "axios";
import { CommonConstants } from "../../../../Constants/common.constants";
import {
  Box,
  Modal,
  Pagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form } from "react-bootstrap";
import NoRecordWithAddBtn from "../../../../Helpers/NoRecord/NoRecordWithAddBtn";
import Loader from "../../../Loader/Loader";
import parse from 'html-react-parser';

const apiKey = "71fc1cdfa4fcbfaece15ab70bc4ce4df";
const query = "business"; // You can customize the query based on your needs.
const url = `https://gnews.io/api/v4/search?q=${query}&token=${apiKey}&lang=en`;



export default function NewsPage() {
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
  const [showSearch, setShowSearch] = useState(false);
  const [newsArticles, setNewsArticles] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const fetchNews = async () => {
    try {
      setloadervalue(true);
      const sendData = {
        "pageindex": Page,
        "pagesize": RowsPerPage,
        "searchdata": Search,
        "sortparam": "created_at",
        "sortorder": "DESC"
      }
      const response = await axios.post(CommonConstants.BASE_URL + '/getallnews', sendData);
      if (response.data.status == true) {
        setNewsArticles(response.data.data);
        SetCountPage(response.data.totalPageCount);
        SetNumItems(response.data.recordCount);
        setShowSearch(response.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      }
      setloadervalue(false);
    } catch (error) {
      console.log("Error fetching news articles:", error);
    }
  };


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

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(newsArticles.length > 0 || searchTerm.trim() !== '');
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


  useEffect(() => {
    fetchNews();
  }, [Search, RowsPerPage, Page]);

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid" onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <PageHeader
          HeaderText="News "
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
                    {newsArticles && newsArticles.length > 0 && (
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
                      </div>}
                      {" "}
                      &nbsp;

                    </div>
                  </div>
                  <div className="row"></div>
                  {newsArticles && newsArticles?.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table className="table m-b-0 table-hover mt-3">
                        <thead className="thead-light">
                          <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newsArticles?.map((row) => {
                            return (
                              <tr>
                                <td>
                                  <img
                                    src={row.image}
                                    alt="demo"
                                    height={100}
                                    width={100}
                                  />
                                </td>
                                <td>
                                  {row.title.length > 30 ? (
                                    <>
                                      {`${row.title.slice(0, 30)}...`}
                                      <span
                                        onClick={() =>
                                          handleOpenQuestionModal(row.title)
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
                                    row.title
                                  )}
                                </td>
                                <td>
                                  {row.description.length > 30 ? (
                                    <>
                                      {`${row.description.slice(0, 30)}...`}
                                      <span
                                        onClick={() =>
                                          handleOpenAnswerModal(row.description)
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
                                    row.description
                                  )}
                                </td>
                                <td>
                                  {new Date(row?.publishedAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
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
                {newsArticles && newsArticles.length > 0 && (
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
              <h5>Full Title</h5>
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
              <h5>Full Description</h5>
              <div onClick={handleCloseAnswerModal} className="pointer">
                <CloseIcon />
              </div>
            </div>
            <div className="p-3 ps-0 answerScrolling">{parse(answerModalContent)}</div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
