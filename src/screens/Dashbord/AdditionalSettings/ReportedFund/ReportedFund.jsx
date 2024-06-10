import React, { useEffect, useState } from 'react';
import './ReportedFund.scss';
import PageHeader from '../../../../components/PageHeader';
import axios from 'axios';
import { CommonConstants } from '../../../../Constants/common.constants';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import moment from 'moment';
import { Box, Modal, Button, Pagination,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form } from "react-bootstrap";
import NoRecordWithAddBtn from '../../../../Helpers/NoRecord/NoRecordWithAddBtn';
import Loader from '../../../Loader/Loader';

export default function ReportedFund() {

  const [fundData, setFundData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [Search, SetSearch] = React.useState('');
  const [loadervalue, setloadervalue] = useState(false);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [Page, SetPage] = React.useState(1);
  const [numItems, SetNumItems] = React.useState(0);
  const [CountPage, SetCountPage] = React.useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [showData, setShowData] = useState({
    "id": "",
    "haveCustomerId": null,
    "customerId": "",
    "userId": 0,
    "fullName": "",
    "email": "",
    "phone": "",
    "reportingFraud": "",
    "fraudSuspectCountryId": 0,
    "fraudSuspectCountry": "",
    "fraudReportingCountryId": 0,
    "fraudReportingCountry": "",
    "title": "",
    "details": "",
    "createdAt": "",
    "updatedAt": "",
    "deleted": false
  });
  const handleExpand = () => {
    setExpanded(!expanded);
  }

  const handleNoteCloseModal = () => {
    setOpenNoteModal(false);
  };
  const handleOpenModel = async (id) => {
    await axios.post(CommonConstants.BASE_URL + "/getreportfraudbyid", { "id": id }).then((responce) => {
      if (responce.data.status == true) {
        setShowData(responce.data.data);
        setOpenNoteModal(true);
      }
    }).catch(error => console.log(error))

  };
  const getAllReportFraud = async () => {
    setloadervalue(true);
    const payload = {
      "pageindex": Page,
      "pagesize": RowsPerPage,
      "searchdata": Search,

    }
    await axios.post(CommonConstants.BASE_URL + '/getallreportfraud', payload).then((responce) => {
      setFundData(responce.data.data);
      setShowData(responce.data.data[0]);
      SetCountPage(responce.data.totalPageCount);
      SetNumItems(responce.data.recordCount);
      setShowSearch(responce.data.recordCount == 0 ? (Search == "" ? false : true) : true);
    }).catch(error => {
      console.log(error);
    })
    setloadervalue(false);
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(fundData.length > 0 || searchTerm.trim() !== '');
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
  useEffect(() => {
    getAllReportFraud();
  }, [Search, RowsPerPage, Page]);

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid" onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <PageHeader HeaderText="Reported Fraud" Breadcrumb={[{ name: "Dashboard", navigate: "" }, { name: "IoT Dashboard", navigate: "" }]} />
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="body project_report">
                <div className="table-responsive">
                  <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                    {fundData && fundData.length > 0 && <div className="filter-row pb-2 ">
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
                      {showSearch && <div className="form-group d-flex align-items-center mb-0">
                        <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                        <input
                          type="search"
                          id="search"
                          className="form-control p-0 px-3 "
                          placeholder=""
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
                              <th>Who Is Reporting Fraud</th>
                              <th>Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              fundData.map((row) => {
                                return (
                                  <tr>
                                    <td>{row.fullName == "" ? "-" : row.fullName}</td>
                                    <td>{row.email == "" ? "-" : row.email}</td>
                                    <td>{row.phone == "" ? "-" : row.phone}</td>
                                    <td>{row.customerId == "" ? '-' : row.customerId}</td>
                                    <td>{row.reportingFraud}</td>
                                    <td>{moment(row.createdAt).format('YYYY-MM-DD')}</td>
                                    <td className="project-actions">
                                      <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" title='View' onClick={() => handleOpenModel(row.id)}>
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
                {fundData && fundData.length > 0 && <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                  <div className="filter-row pt-2">
                    {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                  </div>
                  <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* view model  */}
      <Modal open={openNoteModal} onClose={handleNoteCloseModal}>
        <Box
          className="ReportFraudModal"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            width: { xs: "90%", sm: "70%", md: "50%", lg: "50%" },
            paddingBottom: "20px",
          }}
        >
          <div className=" border-bottom py-2 mb-4 d-flex justify-content-between">
            <h5>Details</h5> {/* Header Title */}
            <div onClick={handleNoteCloseModal} className="pointer">
              <CloseIcon />
            </div>
          </div>
          <div className="">
            <div className="row viewModal">
              <div className="my-2">
                <ul className="list-unstyled">
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Full Name:</div>
                    <div className="ms-3">{showData?.fullName}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Email:</div>
                    <div className="ms-3" style={{ overflowWrap: 'break-word' }}>{showData?.email}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Mobile:</div>
                    <div className="ms-3">{showData?.phone}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Customer Id:</div>
                    <div className="ms-3">{showData?.customerId == "" ? "-" : showData?.customerId}</div>
                  </li>

                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Who Is Reporting Fraud:</div>
                    <div className="ms-3">{showData?.reportingFraud}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Fraud Suspect Country:</div>
                    <div className="ms-3">{showData?.fraudSuspectCountry}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Fraud Reporting Country:</div>
                    <div className="ms-3">{showData?.fraudReportingCountry}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Title:</div>
                    <div className="ms-3">{showData?.title}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Details of matter:</div>
                    <div className="ms-4 w-50">{showData?.details}</div>
                  </li>
                  <li className="py-2 d-flex">
                    <div className="font-weight-normal w-50">Date:</div>
                    <div className="ms-3">{moment(showData?.createdAt).format('YYYY-MM-DD')}</div>
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

    </>
  )
}