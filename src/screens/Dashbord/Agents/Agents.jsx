import React, { useEffect, useState } from 'react'
import PageHeader from "../../../components/PageHeader";
import { CommonConstants } from '../../../Constants/common.constants';
import Loader from '../../Loader/Loader';
import Pagination from "@mui/material/Pagination";

import { Form, Col } from 'react-bootstrap';
import axios from 'axios';
import ModalComponentPopup from "../ModalComponentPopup";
import ModalComponent from '../ModalComponent';
import NoRecordWithAddBtn from '../../../Helpers/NoRecord/NoRecordWithAddBtn';
import moment from 'moment';
import ScheduleSharpIcon from "@mui/icons-material/ScheduleSharp";
import LanguageIcon from '@mui/icons-material/Language';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import { Link, useNavigate } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { Tooltip } from '@mui/material';

export default function Agents() {
  const [loadervalue, setloadervalue] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [RowsPerPage, SetRowsPerPage] = useState(CommonConstants.DefaultPageSize);
  const [Search, SetSearch] = useState('');
  const [Page, SetPage] = useState(1);
  const [CountPage, SetCountPage] = useState(0);
  const [numItems, SetNumItems] = useState(0);
  const [allUsers, setallUsers] = useState([]);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const [showSearch, setShowSearch] = useState(false);


  const getAllAgents = async (e) => {
    setloadervalue(true);
    Search === "" ? setloadervalue(true) : setloadervalue(false)
    try {
      const payloadd = {
        pageindex: Page,
        pagesize: RowsPerPage,
        searchdata: Search,
      }

      const response = await axios.post(CommonConstants.BASE_URL + "/getallagents", payloadd);
      if (response.data.status === true) {
        setallUsers(response.data.data);
        SetCountPage(response.data?.totalPageCount)
        SetNumItems(response.data.recordCount);
        setShowSearch(response.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      }
    }
    catch (err) {
      console.log(err)
    }
    setloadervalue(false);
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
  const confirmClick = async (id) => {
    setmodalShowPrChange(true)
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const handleDelete = async () => {
    setmodalShowPrChange(false);
    setloadervalue(true);

    // await axios
    //   .post(`${CommonConstants.BASE_URL}/deleteuserbyid`, {
    //     id: id,
    //   })
    //   .then((res) => {
    //     if(res.data.statuscode){
    //       setModalShow(true)
    //     }
    //     getData();
    //     setloadervalue(false);
    //   })
    //   .catch((err) => {
    //     setloadervalue(false);
    //   });
  };
  const handlSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    SetPage(1)
    setShowSearch(allUsers.length > 0 || searchTerm.trim() !== '');;
  };

  const handleToggle = async (userID, newApprovalStatus) => {
    try {
      setloadervalue(true);
      const requsetData = new FormData();
      requsetData.append('userId', userID);
      requsetData.append('isApproved', newApprovalStatus);
      const response = await axios.post(
        CommonConstants.BASE_URL + '/agentrequestappovedbyadmin',
        requsetData
      );
      if (response.data.status == true) {
        getAllAgents();
      }
    } catch (error) {
      console.log(error);
    }
    setloadervalue(false);
  };
  useEffect(() => {
    getAllAgents();
  }, [RowsPerPage, Page, Search]);
  return (
    <>
      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        {loadervalue == true ? <Loader /> : ""}
        <div>
          <div >
            <div className="container-fluid">
              <PageHeader HeaderText="Agents" Breadcrumb={[{ name: "Dashboard", navigate: "" }, { name: "IoT Dashboard", navigate: "" }]} />
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12">
                  <div className="card">
                    <div className="body project_report">
                      <div className="table-responsive">
                        <div className="row">
                        </div>
                        <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                          {allUsers && allUsers.length > 0 && <div className="filter-row mb-2 ">
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
                          {
                            showSearch && <div className="form-group  d-flex align-items-center pbSt">
                              <label className="fw-bolder mb-0">Search: </label> &nbsp;&nbsp;
                              <input
                                type="search"
                                id="search"
                                className="form-control p-0 ps-3 pe-3"
                                placeholder=""
                                onChange={handlSearch}
                              />
                            </div>}
                        </div>

                        {allUsers && allUsers.length > 0 ? <div style={{ overflowX: "auto" }}>
                          <table className="table m-b-0 ">
                            <thead className="thead-light">
                              <tr>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email/ID</th>
                                <th>Registered</th>
                                <th>Approved</th>
                                {/* <th>Actions</th> */}
                              </tr>
                            </thead>

                            {allUsers && allUsers.map((item) => {
                              const createdAt = moment(item.createdAt);
                              const daysAgo = createdAt.fromNow();
                              return (
                                <tbody>
                                  <tr >
                                    <div className="mt-2 d-flex">
                                      {item?.client === 'web' ? <LanguageIcon className='text-black' /> : item?.client === 'android' ? <AndroidIcon className='text-black' /> : item?.client === 'iphone' ? <AppleIcon className='text-black' /> : <LanguageIcon className='text-black' />}
                                      &nbsp;
                                      <Link
                                        className="d-flex align-items-center w-75"
                                        to={{
                                          pathname: "/agent-details",
                                          state: item.id,
                                        }}
                                        style={{ textDecoration: "none" }}

                                      >
                                        <div className="border-0">
                                          {item.fName + " " + item.lName}
                                        </div>
                                      </Link>
                                      {" "}
                                      &nbsp;
                                      <Tooltip title={daysAgo} placement="top" className="ms-auto">
                                        <ScheduleSharpIcon
                                          className="text-black"
                                          color="black"
                                        />
                                      </Tooltip>

                                    </div>
                                    <td className="project-title border-0">{item.phone == "" ? "-" : item.phone}</td>
                                    <td className="project-title border-0">
                                      <h6>
                                        <a>{item.email == "" ? "-" : item.email}</a>
                                      </h6>
                                    </td>
                                    <td>{moment(item.createdAt).format('DD/MM/YYYY HH:MM:SS')}</td>
                                    <td className="project-title border-0">
                                      <FormControlLabel
                                        control={
                                          <Switch
                                            checked={item.appovedByAdmin}
                                            onChange={(event) => handleToggle(item.id, event.target.checked)}
                                          />
                                        }
                                      />
                                    </td>
                                    {/* <td className="project-actions">
                                      <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" title='View' >
                                        <RemoveRedEyeIcon />
                                      </a>{" "}
                                      &nbsp;
                                    </td> */}
                                  </tr>
                                </tbody>
                              )
                            })}
                          </table>
                        </div>
                          : <NoRecordWithAddBtn />}
                        {
                          allUsers && allUsers.length > 0 &&
                          <div className="d-flex paginationBetween pt-4 mr-4 respoChildFooter">
                            <div className="filter-row pt-2">
                              {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                            </div>
                            <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                          </div>
                        }

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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal className='rounded'
      show={modalShow}
      onHide={(e)=>setModalShow(false)}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className='d-flex flex-column py-4 d-flex text-center'>
        <h1>Add Relation</h1>
      </div>
      <div className='d-flex px-5 flex-column py-4'>
        <Form.Group as={Col} className="left-inner-addon  input-container">
                <i className=" main fa fa-pen "></i>
                <Form.Control
                  type="text"
                  placeholder="Relation"
                  className="formcontrol  required phone"
                />
              </Form.Group>
      </div>
      <Modal.Body>
        <p className='text-center'>
        </p>
      </Modal.Body>
      <div className='text-center'>
        <button className='w-25 success-btn purpleBackground border-0 rounded text-light' onClick={(e)=>setModalShow(false)}>Ok</button>
      </div>
      <br/>
    </Modal> */}
    </>
  )
}

