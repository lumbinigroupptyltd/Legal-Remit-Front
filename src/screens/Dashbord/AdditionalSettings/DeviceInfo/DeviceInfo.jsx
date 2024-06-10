import React, { useEffect, useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import "./DeviceInfo.scss";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { CommonConstants } from "../../../../Constants/common.constants";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import moment from "moment";
import { useNavigate, Link } from "react-router-dom";
import LanguageIcon from '@mui/icons-material/Language';
import AndroidIcon from '@mui/icons-material/Android';
import NoRecordWithAddBtn from "../../../../Helpers/NoRecord/NoRecordWithAddBtn";
import Loader from "../../../Loader/Loader";

export default function DeviceInfo({ }) {
  const [deviceInfo, setDeviceInfo] = useState([]);
  const [time, setTime] = useState();
  const [userId, setUserId] = useState("");
  const [device, setDevice] = useState('');
  const [roleid, setRoleId] = useState(0);
  const [search, setSearch] = useState("");
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [CountPage, SetCountPage] = React.useState(0);
  const [numItems, SetNumItems] = React.useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [clearButtonDisabled, setClearButtonDisabled] = useState(false);
  const [loadervalue, setloadervalue] = useState(false);

  const navigate = useNavigate();
  const handleClear = () => {
    getDeviceInfo(1, 50, '', 0, 0, '');
    setDevice("");
    setUserId(0);
    setRoleId(0);
    setSearch("");
  };
  const getUserId = (e) => {
    const userID = e.target.value;
    setUserId(userID);
  }

  const getDeviceInfo = async (Page, RowsPerPage, device, userId, roleid, search) => {
    setloadervalue(true);
    const payload = {
      "pageindex": Page,
      "pagesize": RowsPerPage,
      "device": device, // datatype: String default : ''
      "userId": userId == "" ? 0 : userId, // datatype: Integer default : 0
      "roleid": roleid, // datatype: Integer default : 0
      "searchdata": search,
      "sortparam": "created_at",
      "sortorder": "DESC"
    }
    const deviceInfo = await axios.post(
      CommonConstants.BASE_URL + "/getalldeviceInfos",
      payload
    );
    const userDeviceInfo = deviceInfo.data.data;
    setDeviceInfo(userDeviceInfo);
    SetCountPage(deviceInfo.data.totalPageCount)
    SetNumItems(deviceInfo.data.recordCount)
    const createdAt = userDeviceInfo?.createdAt;
    const createdAtDate = new Date(createdAt);
    const timeDiff = new Date() - createdAtDate;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const displayText =
      daysAgo < 1
        ? "Today"
        : daysAgo === 1
          ? "1 day ago"
          : `${daysAgo} days ago`;
    setTime(displayText);
    setCurrentPage(RowsPerPage);
    setloadervalue(false);
  };

  const formatDate = (date) => {
    const currentDate = moment();
    const createdAtDate = moment(date);

    const diffInMinutes = currentDate.diff(createdAtDate, 'minutes');
    const diffInDays = currentDate.diff(createdAtDate, 'days');

    if (diffInMinutes < 1) {
      return 'Less than 1 minute ago';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInDays < 1) {
      return 'Today';
    } else if (diffInDays === 1) {
      return '1 day ago';
    } else {
      return `${diffInDays} days ago`;
    }
  };

  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
  };
  const onDeviceChange = (e) => {
    setDevice(e.target.value)
  }
  const handleSubmit = (e) => {
    getDeviceInfo(Page, RowsPerPage, device, userId, roleid, search);
  }

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
      getDeviceInfo(NewPage, RowsPerPage, device, userId, roleid, search);
    } else {
      SetPage(NewPage);
      getDeviceInfo(NewPage, RowsPerPage, device, userId, roleid, search);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  }

  const handleRole = (e) => {
    setRoleId(e.target.value);
  }
  useEffect(() => {
    // getDeviceInfo();
    getDeviceInfo(Page, RowsPerPage, device, userId, roleid, search);
  }, []);
  return (
    <div className="container-fluid" onClick={() => {
      document.body.classList.remove("offcanvas-active");
    }}>
      {loadervalue == true ? <Loader /> : ""}
      <PageHeader
        HeaderText="Device and IP Info"
        Breadcrumb={[
          { name: "Dashboard", navigate: "" },
          { name: "IoT Dashboard", navigate: "" },
        ]}
      />
      <div className="row clearfix">
        <div className="deviceMainTable">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 p-0">
              <div className="card">
                <div className="body project_report px-0">
                  <div className="table-responsive1">
                    <div className="">
                      <div className=" overflow-hidden">
                        <Col className="col-lg-12 d-flex px-3 justify-content-end  respoChildFooter">
                          <div class="mx-2 WFull me-auto">
                            Show Entries &nbsp; &nbsp;
                            <div className="dateSec  ">
                              <Form.Select
                                onChange={ChangeRowSelected}
                                value={RowsPerPage}
                                aria-label="Default select example"
                                className="d-flex m-auto selectContainer form-select-zz pe-5"
                                name="device"
                              >
                                {CommonConstants.show_rows.map((value) => (
                                  <option value={value}>{value}</option>
                                ))}

                              </Form.Select>
                            </div>
                          </div>
                          <div class="mx-2 WFull me-auto">
                            &nbsp; &nbsp;
                            <div className="dateSec ">
                              <Form.Select
                                aria-label="Default select example"
                                className="d-flex m-auto selectContainer form-select-zz pe-5"
                                name="device"
                                onChange={(e) => onDeviceChange(e)}
                                value={device}
                              >
                                <option value=''>Any Device</option>
                                <option value='Android'>Android</option>
                                <option value='IOS'>IOS</option>
                                <option value='Web'>Web</option>

                              </Form.Select>
                            </div>
                          </div>
                          <div class="mx-2 WFull ps-0 me-auto">
                            &nbsp; &nbsp;
                            <Form.Group
                              as={Col}
                              className=" input-container required pb-0 ps-0 pe-0 "
                            >
                              <Form.Control
                                type="number"
                                required
                                placeholder="User ID"
                                name="userId"
                                className=" reflink link py-2 "
                                onChange={(e) => getUserId(e)}
                                value={userId}
                              />
                            </Form.Group>
                          </div>
                          <div class="mx-2 WFull  ps-0 me-auto">
                            &nbsp; &nbsp;
                            <div className="dateSec ">
                              <Form.Select
                                aria-label="Default select example"
                                className="d-flex m-auto selectContainer pe-5"
                                name="rollId"
                                value={roleid}
                                onChange={(e) => handleRole(e)}
                              >
                                <option value={0}>Role</option>
                                <option value={1}>Admin</option>
                                <option value={2}>Business</option>
                                <option value={3}>Individual</option>
                                <option value={4}>Agent</option>
                              </Form.Select>
                            </div>
                          </div>
                          <div class="mx-2 WFull ps-0 ">
                            &nbsp; &nbsp;
                            <Form.Group
                              as={Col}
                              className=" input-container required pb-0 ps-0 pe-0 "
                            >
                              <Form.Control
                                type="text"
                                required
                                placeholder="Search"
                                name="search"
                                className=" reflink link py-2 "
                                value={search}
                                onChange={(e) => handleSearch(e)}
                              />
                            </Form.Group>
                          </div>
                          <div class="mx-2 ">
                            &nbsp; &nbsp;
                            <Button className="m-0  btn btn-default rounded-5 py-2 purpleBackground text-white" onClick={() => handleSubmit()}>
                              Submit
                            </Button>
                          </div>
                          <div class="mx-2 ">
                            &nbsp; &nbsp;
                            <Button className="m-0  btn btn-default rounded-5 py-2 purpleBackground text-white" onClick={handleClear}>
                              Clear
                            </Button>
                          </div>
                        </Col>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center px-3 respoChildFooter my-4 border-top pt-3">
                    </div>
                    {
                      deviceInfo && deviceInfo?.length > 0 ?
                        <div style={{ overflowX: "auto" }} className="px-3">
                          <Table className="table m-b-0">
                            <thead className="thead-light">
                              <tr>
                                <th>User</th>
                                <th>Time</th>
                                <th>Model</th>
                                <th>OS Versions</th>
                                <th>IP</th>
                                <th>App Versions</th>
                                <th>Server Versions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                deviceInfo && deviceInfo.map((items) => {
                                  return (
                                    <tr>
                                      <td>  {items.client === 'web' ? <LanguageIcon /> : null}
                                        {items.client === 'android' ? <AndroidIcon /> : null}
                                        &nbsp;
                                        <Link
                                          to={{
                                            pathname: "/individualuser",
                                            state: items.userId,
                                          }}
                                        >
                                          {items.firstName}&nbsp;{items.lastName}
                                        </Link>
                                      </td>
                                      <td>{formatDate(items.createdAt)}</td>
                                      <td>{items.model == "" ? "-" : items.model}</td>
                                      <td>{items.osVersion == "" ? "-" : items.osVersion}</td>
                                      <td>{items.ip == "" ? "-" : items.ip}</td>
                                      <td>{items.appVersion == "" ? "-" : items.appVersion}</td>
                                      <td className="word-break">{items.host == "" ? "-" : items.host}</td>
                                      {/* <td>{items.client == "" ? "-" : items.client}</td> */}
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </Table>
                        </div>
                        : <NoRecordWithAddBtn />}
                  </div>
                  {deviceInfo && deviceInfo.length > 0 && <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                    <div className="filter-row pt-2">
                      {numItems > 0 ? `Showing ${(Page - 1) * currentPage + 1} to ${(Page * currentPage) > numItems ? numItems : (Page * currentPage)} of ${numItems} entries` : "No records Available"}
                    </div>
                    <Pagination count={CountPage} className="pbDowSt " page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}