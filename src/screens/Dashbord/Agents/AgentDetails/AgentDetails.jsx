import React, { useEffect, useState } from "react";
import Chat from "../../Chat";
import Chats from "../../Chats";
import axios from "axios";
import Userinfo from "../../UserInfo";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Pagination from '@mui/material/Pagination';

import Tabs from "react-bootstrap/Tabs";
import Compliance from "../../Compliance";
import Rewards from "../../Rewards";
import Transactions from "../../Transactions";
import PageHeader from "../../../../components/PageHeader";
import { CommonConstants } from "../../../../Constants/common.constants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import Chip from "@mui/material/Chip";
import moment from "moment";
import Loader from "../../../Loader/Loader";

function AgentsDetails(props) {
  const [individualuserData, setindividualuserData] = useState([]);
  const [userId, setUserId] = useState();
  const [id, setId] = useState(props.location.state);
  const [loadervalue, setloadervalue] = useState(false);
  const [userData, setUserData] = useState({});
  const [allUserAgents, setAllUserAgents] = useState([]);
  const [RowsPerPage, SetRowsPerPage] = useState(CommonConstants.DefaultPageSize);
  const [Search, SetSearch] = useState('');
  const [Page, SetPage] = useState(1);
  const [CountPage, SetCountPage] = useState(0);
  const [numItems, SetNumItems] = useState(0);
  const [isApprovedByAdmin, setisApprovedByAdmin] = useState(false);

  const [activeTab, setActiveTab] = useState(1);
  const [activeTabIndex, setActiveTabIndex] = useState(1);

  const onTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleTabChange = (tabIndex) => {
    setActiveTabIndex(tabIndex);
  };


  const getUserData = async () => {
    setloadervalue(true);
    if (id !== 'undefined' || id !== "") {
      const userPayLoad = new FormData();
      userPayLoad.append('userId', id);
      const userResponse = await axios.post(`${CommonConstants.BASE_URL}/getusersummery`, userPayLoad);
      const responseData = userResponse.data.data;
      if (userResponse.data.status == true) {
        setUserData(responseData);
        setisApprovedByAdmin(responseData.appovedByAdmin);

      }
    }
    setloadervalue(false);
  };

  const getAgentsByUser = async () => {
    try {
      const requsetData = {
        userId: id,
        pageindex: Page,
        pagesize: RowsPerPage,
        searchdata: Search,
      }
      const usersAgent = await axios.post(CommonConstants.BASE_URL + "/getagentsbyuser", requsetData);
      if (usersAgent.data.status == true) {
        setAllUserAgents(usersAgent.data.data);
        SetCountPage(usersAgent.data?.totalPageCount);
        SetNumItems(usersAgent.data.recordCount);
        // setisApprovedByAdmin();
      }
    } catch (error) {
      console.log(error);
    }
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

  const handlSearch = (e) => {
    SetSearch(e.target.value);
    SetPage(1);
  };


  const markAgentAsApproved = async () => {
    try {
      setloadervalue(true);
      const requsetData = new FormData();
      requsetData.append('userId', id);
      requsetData.append('isApproved', true);
      const response = await axios.post(
        CommonConstants.BASE_URL + '/agentrequestappovedbyadmin',
        requsetData
      );
      if (response.data.status === true) {
        getUserData();
        // Perform any necessary actions upon success
        // getAllAgents(); // Assuming you have a function to fetch all agents
      }
      setloadervalue(false);
    } catch (error) {
      console.log(error);
    }
  };

  const markAgentAsDisapproved = async () => {
    try {
      setloadervalue(true);
      const requsetData = new FormData();
      requsetData.append('userId', id);
      requsetData.append('isApproved', false);
      const response = await axios.post(
        CommonConstants.BASE_URL + '/agentrequestappovedbyadmin',
        requsetData
      );
      if (response.data.status === true) {
        getUserData();
        // Perform any necessary actions upon success
        // getAllAgents(); // Assuming you have a function to fetch all agents
      }
      setloadervalue(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    getAgentsByUser();
  }, [id, Page, RowsPerPage, Search]);

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid"      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
        <PageHeader
          HeaderText="Agent Info"
          Breadcrumb={[
            { name: "Dashboard", navigate: "" },
            { name: "IoT Dashboard", navigate: "" },
          ]}
        />

        <div className="bg-white rounded-4 p-4">
          <div className="row">
            <div className="col-lg-12 col-md-12 pr-0 pl-0">
              <div className="cardas">
                <div className="bodys">
                  <div className="row">
                    <div className="col-12 border-right">
                      <div className="pb-4">
                        <ul className="nav nav-pills   " role="tablist">
                          <li
                            className={`nav-item mb-1 py-2 mx-3  pointer ${activeTab === 1 ? "active" : ""
                              }`}
                            id="bacicTab2-1"
                            role="presentation"
                            onClick={() => {
                              onTabChange(1);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3  ${activeTab === 1 ? "mainPillActive active" : ""
                                }`}
                            >
                              <i className="fa fa-user mr-3" />
                              Agent Info
                            </a>
                          </li>
                          <li
                            className={`nav-item mb-1 py-2 mx-3  pointer ${activeTab === 2 ? "active" : ""
                              }`}
                            id="bacicTab2-2"
                            role="presentation"
                            onClick={() => {
                              onTabChange(2);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3 ${activeTab === 2 ? "active mainPillActive" : ""
                                }`}
                              style={{
                                backgroundColor:
                                  activeTab === 2 ? "#AA2AE1" : "",
                              }}
                            >
                              <i className="fa fa-users	 mr-2" />
                              Agent Users
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 pr-0 pl-0">
                      <div className="tab-content pt-0">
                        <div
                          id="bacicTab2pan-1"
                          className={`tab-pane ${activeTab === 1 ? "show active" : ""
                            }`}
                        >

                          <Grid spacing={2} className=" py-3">
                            <div className="d-flex ms-auto justify-content-end">
                              {isApprovedByAdmin ?
                                (<a className="bg-danger text-white rounded-2" onClick={markAgentAsDisapproved}>
                                  <Chip
                                    className="border-0 p-0 pointer"
                                    icon={<NoAccountsIcon className="text-white" />}
                                    label={<div className="dateChip text-white medium">Mark Agent as Disapproved</div>}
                                    color="success"
                                    variant="outlined"
                                  />
                                </a>)
                                :
                                (<a className="bg-success text-white rounded-2 " onClick={markAgentAsApproved}>
                                  <Chip
                                    className="border-0 p-0 pointer"
                                    icon={<VerifiedIcon className="text-white" />}
                                    label={<div className="dateChip text-white medium">Mark Agent as Approved</div>}
                                    color="success"
                                    variant="outlined"
                                  />
                                </a>)
                              }
                            </div>
                            <Grid container item xs={12}>
                              <Grid xs={12} xl={6} lg={6} md={6} className="my-4">
                                <TableContainer>
                                  <Table
                                    aria-label="collapsible table"
                                    className="border-right-0 border-left border-top border-bottom"
                                  >
                                    <TableRow>
                                      <TableCell
                                        component="td"
                                        className="bg-transparent border"
                                      >
                                        <h5 className="mb-0 pb-0">
                                          Agent Information{" "}
                                        </h5>
                                      </TableCell>
                                    </TableRow>

                                    <TableBody>
                                      <TableCell className="border-right">
                                        {userData && (
                                          <div>
                                            <div className="my-4  d-flex align-items-center">
                                              <i className="pe-2 fa fa-user purpleText" />
                                              Agent Status :{" "}
                                              <div className="ps-2">
                                                {userData?.appovedByAdmin ? (<Chip
                                                  className="border-0 p-0"
                                                  icon={<VerifiedIcon />}
                                                  label={
                                                    <div className="dateChip">
                                                      Approved
                                                    </div>
                                                  }
                                                  color="success"
                                                  variant="outlined"
                                                />) :
                                                  (<Chip
                                                    className="border-0 p-0 text-danger"
                                                    icon={<NoAccountsIcon />}
                                                    label={
                                                      <div className="dateChip">
                                                        Disapproved
                                                      </div>
                                                    }
                                                    color="success"
                                                    variant="outlined"
                                                  />)}
                                              </div>
                                            </div>

                                            {userData?.appovedByAdmin && <div className="my-4 d-flex">
                                              <i className="pe-2 fa fa-address-card purpleText" />
                                              Agent Code:{" "}
                                              <div className="ps-2">{userData.code}</div>
                                            </div>}

                                            <div className="my-4 mt-0 d-flex align-items-center">
                                              <i className="pe-2 fa fa-user purpleText" />
                                              Name :{" "}
                                              <div className="ps-2">
                                                {userData?.userName == "" ? "-" : userData?.userName}
                                              </div>
                                            </div>

                                            <div className="my-4 d-flex">
                                              <i className="pe-2 fa fa-envelope purpleText" />
                                              Email:{" "}
                                              <div className="ps-2">
                                                {userData?.email == "" ? "-" : userData?.email}
                                              </div>
                                            </div>

                                            <div className="my-4 mb-2 d-flex">
                                              <i className="pe-2 fa fa-mobile purpleText" />
                                              Mobile:{" "}
                                              <div className="ps-2">
                                                {userData?.phone == "" ? "-" : userData?.phone}
                                              </div>
                                            </div>
                                            <div className="my-4 d-flex">
                                              <i className="pe-2 fa fa-address-card purpleText" />
                                              Full Address:{" "}
                                              <div className="ps-2">  {userData?.streetName == "" ? "-" : userData?.streetName}</div>
                                            </div>
                                          </div>
                                        )}
                                      </TableCell>
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Grid>
                            </Grid>
                          </Grid>
                        </div>
                        <div
                          id="bacicTab2pan-2"
                          className={`tab-pane ${activeTab === 2 ? "show active" : ""
                            }`}
                        >
                          <div className="container-fluid">
                            <div className="row clearfix">
                              <div className="col-lg-12 col-md-12 p-0">
                                <div className="card">
                                  <div className="body project_report p-0">
                                    <div className="table-responsive">
                                      <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                                        {allUserAgents && allUserAgents.length > 0 && <div className="filter-row pb-2 pbSt">
                                          Show Entries &nbsp; &nbsp;
                                          <div className="d-flex align-items-center">
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
                                          <div className="form-group d-flex align-items-center mb-0">
                                            <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                                            <input
                                              type="search"
                                              id="search"
                                              className="form-control p-0 px-3"
                                              placeholder=""
                                              onChange={handlSearch}
                                            />
                                          </div> &nbsp;&nbsp;

                                        </div>
                                      </div>
                                      <table className="table m-b-0 mt-3">
                                        <thead className="thead-light">
                                          <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>

                                          </tr>
                                        </thead>
                                        <tbody>
                                          {allUserAgents && allUserAgents.length > 0 ?
                                             allUserAgents.map((row) => {
                                              return (
                                                <>
                                                  <tr>
                                                    <td>{row.fName == "" ? "-" : row.fName + " " + row.lName}</td>
                                                    <td>{row.email == "" ? "-" : row.email}</td>
                                                    <td>{row.phone == "" ? "-" : row.phone}</td>
                                                  </tr>
                                                </>
                                              )
                                            })
                                            : <td colSpan={7}><p className="text-center mt-3"> No User's Data Found</p></td>}
                                        </tbody>
                                      </table>
                                      {allUserAgents && allUserAgents.length > 0 && <div className="d-flex paginationBetween pt-4 mr-4 respoChildFooter">
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Tabs
          defaultActiveKey="userinfo"
          id="uncontrolled-tab-example"
          className=" mainUl border-bottom"
        >
          <Tab eventKey="userinfo" className='text-white' title="User Info">
            <Userinfo individualuserData={individualuserData} />
          </Tab>
          <Tab eventKey="chats" title="Chats">
            <Chats />
          </Tab>
          <Tab eventKey="transactions" title="Transactions">
            <Transactions  individualuserData={userId}/>
          </Tab>
          <Tab eventKey="compliance" title="Compliance">
            <Compliance individualuserData={id} />
          </Tab>
          <Tab eventKey="rewards" title="Rewards">
            <Rewards />
          </Tab>
        </Tabs> */}
        </div>
      </div>
    </>
  );
}

export default AgentsDetails;
