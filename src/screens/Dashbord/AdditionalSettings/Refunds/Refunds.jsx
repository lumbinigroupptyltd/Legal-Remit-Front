import React, { useEffect, useState } from 'react';
import './Refund.scss';
import PageHeader from '../../../../components/PageHeader';
import axios from 'axios';
import { CommonConstants } from '../../../../Constants/common.constants';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import moment from 'moment';
import { Box, Modal, Button, Pagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form } from "react-bootstrap";
import NoRecordWithAddBtn from '../../../../Helpers/NoRecord/NoRecordWithAddBtn';
import Loader from '../../../Loader/Loader';
import ModalComponent from '../../ModalComponent';
import ModalComponentPopup from '../../ModalComponentPopup';

export default function Refunds() {
  const [expanded, setExpanded] = useState(false);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [Page, SetPage] = React.useState(1);
  const [fundData, setFundData] = useState([]);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [Search, SetSearch] = React.useState('');
  const [loadervalue, setloadervalue] = useState(false);
  const [numItems, SetNumItems] = React.useState(0);
  const [CountPage, SetCountPage] = React.useState(0);
  const [showData, setShowData] = useState({
    "id": 0,
    "haveCustomerId": false,
    "customerId": "",
    "userId": 0,
    "fullName": "",
    "email": "",
    "phone": "",
    "haveTransactionNo": true,
    "transactionNo": "",
    "reason": "",
    "createdAt": "",
    "updatedAt": "",
    "deleted": false
  });
  const [showSearch, setShowSearch] = useState(false);
  const [openLockModal, setOpenLockeModal] = useState(false);
  const [transactionNo, settransactionNo] = useState("");
  const [error, setError] = useState(false);
  const [id, setId] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);

  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [showTransactionMessage, setShowTransactionMessage] = useState(false);

  const checkTransactionNo = async (e) => {
    const selectedValue = e.target.value;
    const refundRequestId = id;
    try {
      if (selectedValue) {
        const response = await axios.get(
          CommonConstants.NEW_BASE_URL + "/validatetransactionrequest",
          {
            params: {
              refundRequestId,
              transactionNo: selectedValue,
            }
          }
        );
        if (response.data.data == false) {
          setShowTransactionMessage(true);
        } else {
          setShowTransactionMessage(false);
        }
      }
    } catch (error) {
      // Handle any errors, e.g., a 400 Bad Request
      console.error(error);
    }
  }

  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const openConfirmModel = async (id, tNo) => {
    settransactionNo(tNo);
    setId(id);
    setmodalShowPrChange(true);
  }
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    // Update showSearch based on fundData length and whether search term is present
    setShowSearch(fundData.length > 0 || searchTerm.trim() !== '');
  }
  const handleNoteCloseModal = () => {
    setOpenNoteModal(false);
  };
  const handleOpenModel = async (id) => {
    await axios.post(CommonConstants.NEW_BASE_URL + '/gettransactionrefundrequestbyid', { "id": id }).then((responce) => {
      if (responce.data.status == true) {
        setShowData(responce.data.data);
        setOpenNoteModal(true);

      }
    })
  };
  const getAllReportFraud = async () => {
    setloadervalue(true);
    const payload = {
      "pageindex": Page,
      "pagesize": RowsPerPage,
      "searchdata": Search
    }
    await axios.post(CommonConstants.NEW_BASE_URL + '/getalltransactionrefundrequest', payload).then((responce) => {
      setFundData(responce.data.data);
      SetCountPage(responce.data.totalPageCount);
      SetNumItems(responce.data.recordCount);
      setShowSearch(responce.data.recordCount == 0 ? (Search == "" ? false : true) : true);
    }).catch(error => {
      console.log(error);
    })
    setloadervalue(false);
  }

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
  const handleLockCloseModal = () => {
    setError(false);
    setOpenLockeModal(false);
    settransactionNo("");
    setShowTransactionMessage(false);
  };
  const handleAccept = async (ID, transacionID) => {
    setId(ID);
    setOpenLockeModal(true);
    // if (transacionID) {
    //   const fromData = new FormData();
    //   fromData.append("id", ID);
    //   fromData.append("status", 1);
    //   fromData.append("transactionNo", transacionID);
    //   const sendData = await axios.post(CommonConstants.NEW_BASE_URL + "/updaterequeststatus", fromData);
    //   if (sendData.data.status == true) {
    //     setOpenLockeModal(false);
    //     getAllReportFraud();
    //   }
    // } else {
    //   setId(ID);
    //   setOpenLockeModal(true);
    // }
  }
  const handleSubmit = async () => {
    if (!transactionNo) {
      setError(true);
    } else {
      const fromData = new FormData();
      fromData.append("id", id);
      fromData.append("status", 1);
      fromData.append("transactionNo", transactionNo);
      const sendData = await axios.post(CommonConstants.NEW_BASE_URL + "/updaterequeststatus", fromData);
      if (sendData.data.status == true) {
        setOpenLockeModal(false);
        getAllReportFraud();
        settransactionNo("");
      }
    }
  }
  const handleReject = async () => {
    setmodalShowPrChange(false);
    const fromData = new FormData();
    fromData.append("id", id);
    fromData.append("status", 2);
    fromData.append("transactionNo", transactionNo);
    const sendData = await axios.post(CommonConstants.NEW_BASE_URL + "/updaterequeststatus", fromData);
    if (sendData.data.status == true) {
      getAllReportFraud();
      setModalShow(true);
      settransactionNo("");
    }
  }
  useEffect(() => {
    getAllReportFraud();
  }, [Search, RowsPerPage, Page]);
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid" onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <PageHeader HeaderText="Refunds" Breadcrumb={[{ name: "Dashboard", navigate: "" }, { name: "IoT Dashboard", navigate: "" }]} />
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="body project_report">
                <div className="table-responsive">
                  <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                    {fundData && fundData.length > 0 && 
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
                    </div>}
                    <div className="d-flex align-items-center respoChildFooter">
                      {showSearch && < div className="form-group d-flex align-items-center mb-0">
                        <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                        <input
                          type="search"
                          id="search"
                          className="form-control p-0 px-3 "
                          placeholder=""
                          value={Search}
                          onChange={handleSearch}
                        />
                      </div>} &nbsp;
                    </div>
                  </div>
                  <div className="row">
                  </div>
                  {
                    fundData && fundData.length > 0 ?
                      <div style={{ overflowX: "auto" }}>
                        <table className="table m-b-0 table-hover mt-3">
                          <thead className="thead-light">
                            <tr>
                              <th>Full Name</th>
                              <th>Email</th>
                              <th>Mobile</th>
                              <th>Customer Id</th>
                              <th>Transaction Number</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              fundData.map((row) => {
                                return (
                                  <tr>
                                    <td>{row.fullName == null ? "-" : row.fullName}</td>
                                    <td>{row.email == "" ? "-" : row.email}</td>
                                    <td>{row.phone == "" ? "-" : row.phone}</td>
                                    <td>{row.customerId == "" ? '-' : row.customerId}</td>
                                    <td>{row.transactionNo === undefined || row.transactionNo === "undefined" ? "-" : row.transactionNo}</td>
                                    <td>{moment(row.createdAt).format('YYYY-MM-DD')}</td>
                                    <td className="project-actions">
                                      {row.status == 0 &&
                                        <>
                                          <a
                                            className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                            onClick={() => handleAccept(row.id, row.transactionNo)}
                                          >
                                            <i class="fa fa-check" aria-hidden="true" style={{ color: "green" }} title="Accept"></i>
                                          </a>{""}
                                          <a
                                            className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                            onClick={() => openConfirmModel(row.id, row.transactionNo)}
                                          >
                                            <i class="fa fa-times" aria-hidden="true" style={{ color: "red" }} title="Reject"></i>
                                          </a>
                                        </>
                                      }{""}
                                      <a className="btn btn-outline-secondary mr-1" title='View' onClick={() => handleOpenModel(row.id)}>
                                        <RemoveRedEyeIcon />
                                      </a>{" "}
                                      &nbsp;
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
                      : <NoRecordWithAddBtn />}

                </div>
                {fundData && fundData.length > 0 &&
                  <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                    <div className="filter-row pt-2">
                      {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                    </div>
                    <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                  </div>}
              </div>
            </div>
          </div>
        </div>
      </div >
      {/* view model  */}
      < Modal open={openNoteModal} onClose={handleNoteCloseModal} >
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
          <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
            <h5>Details</h5>
            <div onClick={handleNoteCloseModal} className="pointer">
              <CloseIcon />
            </div>
          </div>
          <div className="">
            <div className="row">
              <div className="my-2">
                <ul className='list-unstyled'>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal col-lg-6"> Full Name : </div>
                    <div className="">{showData.fullName} </div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal col-lg-6"> Email : </div>
                    <div className=" " style={{ overflowWrap: 'break-word' }}>{showData.email} </div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal col-lg-6"> Mobile : </div>
                    <div className="">{showData.phone} </div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal col-lg-6"> Customer Id : </div>
                    <div className="">{showData.customerId == "" ? "-" : showData.customerId} </div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal col-lg-6"> Transaction Number : </div>
                    <div className="">{showData.transactionNo} </div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal col-lg-6"> Reason for refund : </div>
                    <div className="">{showData.reason} </div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal col-lg-6"> Date : </div>
                    <div className="">{moment(showData.createdAt).format('YYYY-MM-DD')} </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-end mt-3 border-top">
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
      </Modal >
      {/* transction number model */}
      {/* <Modal open={openLockModal} onClose={handleLockCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "30px",
            width: { xs: "40%", sm: "30%", md: "30%", lg: "30%" },
            paddingBottom: "20px",
          }}
        >
          <div className="">
            <div className="row">
              <div className="col-lg-12 my-2">
                <div className="font-weight-normal m-2  mb-2 text-black d-flex">
                  Transaction Number
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="transaction number"
                  onChange={(e) => {
                    const selectedValue = e.target.value.replace(/^[a-zA-Z0-9-]*$/)
                    settransactionNo(selectedValue)
                  }}
                />
                {error && !transactionNo && (
                  <small className="responsiveFontLarge text-danger error_message ms-2 error checkboxError">
                    Please Enetr Transaction Number
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-end mt-3 border-top">
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
            <div className="col-lg-3">
              <Button
                className="m-0 mt-3"
                variant="outlined"
                onClick={handleLockCloseModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal> */}
      {/* confirm model */}
      <ModalComponent
        show={modalShow}
        title11={"Reject successfully"}
        onHide={() => setModalShow(false)}
      />
      <ModalComponent
        show={modalShow1}
        title11={"Please provid proper details!"}
        onHide={() => setModalShow1(false)}
      />
      <ModalComponentPopup
        show={modalShowPrChange}
        title1={"Are you sure want to reject this requset ?"}
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={() => handleReject()}
      />
      <Modal open={openLockModal} onClose={handleLockCloseModal}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "30px",
          width: { xs: "20%", sm: "30%", md: "30%", lg: "30%" },
          paddingBottom: "20px",
          height: "400px",
        }}>
          <div className=" border-bottom py-2 mb-4 d-flex justify-content-between">
            <h5>Confirmation</h5> {/* Header Title */}
            <div onClick={handleLockCloseModal} className="pointer">
              <CloseIcon />
            </div>
          </div>
          <div className="row viewModal">
            <div className="my-2">
              <ul className="list-unstyled">
                <li className="py-2 d-flex">
                  <div className="font-weight-normal col-lg-6 mt-3">Transaction Number : </div>
                  <div className=" w-100">
                    <input
                      type="text"
                      className="form-control w-100"
                      placeholder="transaction number"
                      onChange={(e) => {
                        const selectedValue = e.target.value
                        settransactionNo(selectedValue)
                      }}
                      value={transactionNo}
                      onBlur={(e) => checkTransactionNo(e)}
                    />
                    {error && !transactionNo && (
                      <small className="responsiveFontLarge text-danger error_message ms-2 error checkboxError">
                        Please Enter Transaction Number
                      </small>
                    )}
                    {
                      showTransactionMessage && <small className="responsiveFontLarge text-danger error_message ms-2 error checkboxError">
                        Please Enter Valid Transaction Number
                      </small>
                    }
                  </div>
                </li>
              </ul>
              <div className="row d-flex justify-content-end mt-3">
                <div className="col-lg-3">
                  <Button
                    className="m-0 mt-3"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={showTransactionMessage}
                  >
                    Submit
                  </Button>
                </div>
                <div className="col-lg-3">
                  <Button
                    className="m-0 mt-3"
                    variant="outlined"
                    onClick={handleLockCloseModal}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

    </>
  )
}