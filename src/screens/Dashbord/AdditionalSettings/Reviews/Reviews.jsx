import React, { useEffect, useState } from 'react'
import PageHeader from '../../../../components/PageHeader'
import { CommonConstants } from '../../../../Constants/common.constants';
import Form from 'react-bootstrap/Form';
import { Box, Modal, Pagination,} from "@mui/material";
import axios from 'axios';
import ModalComponentPopup from '../../ModalComponentPopup';
import ModalComponent from '../../ModalComponent';
import ProfileImg from '../../../../assets/images/defaultAvatar.png'
import CloseIcon from "@mui/icons-material/Close";

export default function Reviews() {
  const navigate = useNavigate();
  const [CountPage, SetCountPage] = React.useState(0);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [Search, SetSearch] = React.useState("");
  const [numItems, SetNumItems] = React.useState(0);
  const [loadervalue, setloadervalue] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [deleteDataId, setDeleteDataId] = useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
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

  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(reviewData.length > 0 || searchTerm.trim() !== '');
  };
  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(Page);
    } else {
      SetPage(NewPage);
    }
  };

  const handleEditReview = (id) => {
    navigate({
      pathname: "/edit-reviews",
      state: id
    });
  }
  const handleAddReview = () => {
    navigate({ pathname: "/edit-reviews" });
  }
  const generateRatingStars = (ratingValue) => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= ratingValue) {
        stars.push(<span key={i} className="fa fa-star" style={{ color: 'orange' }} />);
      } else {
        stars.push(<span key={i} className="fa fa-star" style={{ color: 'gray' }} />);
      }
    }

    return stars;
  };
  const getAllReview = async () => {
    setloadervalue(true);
    const payload = {
      pageindex: Page,
      pagesize: RowsPerPage,
      searchdata: Search,
      sortparam: "created_at",
      sortorder: "DESC"
    };
    await axios
      .post(CommonConstants.BASE_URL + "/getallreview", payload)
      .then((responce) => {
        setReviewData(responce.data.data);
        SetCountPage(responce.data.totalPageCount);
        SetNumItems(responce.data.recordCount);
        setShowSearch(responce.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      })
      .catch((error) => {
        console.log(error);
      });
    setloadervalue(false);
  };

  const handlOpenDelete = (id) => {
    setDeleteDataId(id);
    setmodalShowPrChange(true);
  };

  const handleDeleteClick = async () => {
    setmodalShowPrChange(false);
    try {
      const deleRecord = await axios.post(CommonConstants.BASE_URL + '/deletereviewbyid', { "id": deleteDataId });
      if (deleRecord.data.status == true) {
        setModalShow(true);
        getAllReview();
      }
    } catch (error) {
      console.log(error);
    }

  };


  useEffect(() => {
    getAllReview();
  }, [Search, RowsPerPage, Page])
  return (
    <div className="container-fluid" onClick={() => {
      document.body.classList.remove("offcanvas-active");
    }}>
      <PageHeader
        HeaderText="Reviews"
        Breadcrumb={[
          { name: "Dashboard", navigate: "" },
          { name: "IoT Dashboard", navigate: "" },
        ]}
      />
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="body project_report">
              <div className="row d-flex g-0">
                <div className="table-responsive" >
                  <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                    {reviewData && reviewData.length > 0 && <div className="filter-row pb-2 pbSt">
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
                    </div>}
                    <div className="d-flex align-items-center  respoChildFooter">
                      {showSearch && <div className="form-group d-flex align-items-center mb-0">
                        <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                        <input
                          type="search"
                          id="search"
                          className="form-control p-0 px-3"
                          placeholder=""
                          onChange={handleSearch}
                        />
                      </div>} &nbsp;&nbsp;
                      <div className="pbSt">
                        <a
                          className="purpleBackground btn btn-default  text-white bolder"
                          onClick={handleAddReview}
                        >
                          <i className="text-white fa fa-plus bolder"></i> Add New
                        </a>
                      </div>
                    </div>
                  </div>
                  <table className="table m-b-0  ">
                    <thead className="thead-light">
                      <tr>
                        <th>Name</th>
                        <th>Profile</th>
                        <th>Review</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        reviewData && reviewData.map((row) => (
                          <tr>
                            <td>{row.name}</td>
                            <td className=''>
                              {
                                row.image == "" ?
                                  (<img
                                    src={ProfileImg}
                                    alt="Image"
                                    height={100}
                                    width={100}
                                  />) :
                                  (<img
                                    src={row.image}
                                    alt="Image"
                                    height={100}
                                    width={100}
                                  />)
                              }
                            </td>
                            <td>
                              {row.message.length > 50 ? (
                                <>
                                  {`${row.message.slice(0, 50)}...`}
                                  <span
                                    onClick={() =>
                                      handleOpenQuestionModal(row.message)
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
                                row.message
                              )}
                            </td>
                            <td><span>{generateRatingStars(row.star)}</span></td>
                            <td>
                              <a
                                className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                onClick={() => handleEditReview(row.id)}
                              >
                                <i className="fa fa-edit" title="Edit"></i>
                              </a>{" "}
                              <a
                                className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                onClick={() => { handlOpenDelete(row.id) }}
                              >
                                <i className="fa fa-trash" style={{ color: "red" }} title="Delete"></i>
                              </a>{" "}
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                  {reviewData && reviewData.length > 0 && <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                    <div className="filter-row pt-2 pbSt">
                      {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : ""}
                    </div>
                    <Pagination count={CountPage} page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                  </div>}
                </div>
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
              <h5>Full message</h5>
              <div onClick={handleCloseQuestionModal} className="pointer">
                <CloseIcon />
              </div>
            </div>
            <div className="p-3 ps-0 ">{questionModalContent}</div>
          </div>
        </Box>
      </Modal>
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
    </div>
  )
}
