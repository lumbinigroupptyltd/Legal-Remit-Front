import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Loader from "../Loader/Loader";
import { Form } from "react-bootstrap";
import { Box, Modal, Button, Pagination, Tooltip } from "@mui/material";
import axios from "axios";
import moment from "moment";
import ModalComponent from "./ModalComponent";
import { CommonConstants } from "../../Constants/common.constants";
import ModalComponentPopup from "./ModalComponentPopup";
import ScheduleSharpIcon from "@mui/icons-material/ScheduleSharp";
import LanguageIcon from '@mui/icons-material/Language';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple'
import NoRecordWithAddBtn from "../../Helpers/NoRecord/NoRecordWithAddBtn";
import { saveAs } from "file-saver";
import CloseIcon from "@mui/icons-material/Close";

export default function Users() {
  const [loadervalue, setloadervalue] = useState(false);
  const [RowsPerPage, SetRowsPerPage] = React.useState(
    CommonConstants.DefaultPageSize
  );
  const [Search, SetSearch] = React.useState("");
  const [Page, SetPage] = React.useState(1);
  const [CountPage, SetCountPage] = React.useState(0);
  const [numItems, SetNumItems] = React.useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const [time, setTime] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [allUsers, setallUsers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedDate1, setSelectedDate1] = useState("");
  const [selectedDate2, setSelectedDate2] = useState("");
  const [riskLevel, setRiskLevel] = useState("");
  const [KYCStaus, setKYCStaus] = useState("");
  const [kycVerified, setKYCSVerified] = useState("");
  const [KYCSVerifiedBY, setKYCSVerifiedBY] = useState("");
  const [NoOfTransaction, setNoOfTransaction] = useState("");
  const [NoDays, setNoDays] = useState(0);
  const [userType, setUserType] = useState(0);

  const navigate = useNavigate();

  const handleModalClose = () => {
    setOpen(false);
  };
  const statusColorsUsers = {
    first: "#c5e1b2",
    second: "#9cc3e6",
    third: "#fee799",
    fourth: "#afabab",
    fifth: "#ededed",
    sixth: "#ecedec",
    seventh: "#fae4d6",
  };

  const handleEdit = (id) => {
    navigate({
      pathname: "/individualuser",
      state: {
        id: id,
      },
    });
  };

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    const formattedDate = moment(inputDate).format("YYYY-MM-DD");
    setSelectedDate1(formattedDate);
  };

  const handleDateChange2 = (e) => {
    const inputDate = e.target.value;
    const formattedDate = moment(inputDate).format("YYYY-MM-DD");
    setSelectedDate2(formattedDate);
  };
  const handleRiskDropdown = (eventKey) => {
    setRiskLevel(eventKey);
  }
  const handleKYCDropdown = (eventKey) => {
    setKYCStaus(eventKey);
  }
  const handleStatusDropdown = (eventKey) => {
    setKYCSVerified(eventKey);
  }
  const handleDropdown = (eventKey) => {
    setKYCSVerifiedBY(eventKey);
  }
  const NOOfTransactionDropdown = (eventKey) => {
    setNoOfTransaction(eventKey);
  }
  const handleDaysDropDown = (eventKey) => {
    setNoDays(eventKey);
  }
  const handleUserDropdown = (eventKey) => {
    setUserType(eventKey)
  }
  const confirmClick = async (id) => {
    setmodalShowPrChange(true);
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const handleFilterPopup = () => {
    getData();
  }
  const getData = async (e) => {
    setloadervalue(true);
    Search === "" ? setloadervalue(true) : setloadervalue(false);
    try {
      const payload = {
        "pageindex": Page,
        "pagesize": RowsPerPage,
        "searchdata": Search,
        "sortparam": "created_at",
        "sortorder": "DESC",
        "fromDate": selectedDate1 == "Invalid date" ? "" : selectedDate1,  //default " " Pass Date in YYYY-MM-DD
        "toDate": selectedDate2 == "Invalid date" ? "" : selectedDate2, //default " " Pass Date in YYYY-MM-DD
        "riskLevel": riskLevel, //default "" low | medium | high
        "isSignupDone": kycVerified, //default '' true/false
        "kycVerified": KYCStaus, //default '' true/false
        "kycVerifiedBy": KYCSVerifiedBY, //default '' digital : true | manual : false
        "noOfTransaction": NoOfTransaction, //default '' 1 | 2 .... '10+' String
        "userType": parseInt(userType), // default 0 int individual 2 | business 3 | agent 4
        "activeDays": parseInt(NoDays)  // default 0 int
      }
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getallusers",
        payload
      );
      if (response.data.status === true) {
        setallUsers(response.data.data);
        SetCountPage(response.data?.totalPageCount);
        SetNumItems(response.data.recordCount);
        setShowSearch(response.data.recordCount == 0 ? (Search == "" ? false : true) : true);
        handleModalClose();
      }


      const backgroundColor = statusColorsUsers[""] || "";
    } catch (err) {
      console.log(err);
    }
    setloadervalue(false);
  };

  const handlSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    SetPage(1);
    setShowSearch(allUsers.length > 0 || searchTerm.trim() !== '');
  };
  const handleFilter = () => {
    setOpen(true);
  }
  function convertToCSV(data) {
    const header = [
      "S.N",
      "Date of Registration",
      "Customer ID",
      "User Name",
      "Mobile",
      "Email",
      "Date of Birth",
      "No of Transaction",
      "Total Amount sent",
      "Date of First Transaction",
      "Date of Last Transaction",
      "Average Transaction Size",
      "Total Service charge",
      "Total No of Recipient",
      "KYC Status",
      "KYC Verification method",
      "KYC Verified By",
      "Risk Level",
      "Street Name",
      "Suburb",
      "State",
      "Postal Code",
      "Country",
      "Referred By",
      "Referred to",
      "Points",
      "Used Cash Balnce",
      "Available cash balance"
    ];

    const csvData = [header.join(",")];
    data.forEach((row, index) => {
      const rowData = [
        index + 1,
        moment(row.createdAt).format(' DD MMM YYYY h:mm A'),
        row.customerId,
        row.fName + row.lName,
        row.phone,
        row.email,
        row.dob,
        row.totalNoTransactions,
        row.totalSentAmt,
        row.firstTranDate,
        row.lastTranDate,
        row.avgTranSize,
        row.totalServiceCharge,
        row.noOfRecipients,
        row.kycVerified == true ? "Verified" : "Unverified",
        row.isDigital == true ? "Digitally" : "Manually",
        row.paymentMethod,
        row.riskLevel == null ? "" : row.riskLevel,
        row.businessAddress,
        row.country,
        row.referredBy,
        "",
        "",
        ""

      ];
      csvData.push(rowData.join(","));
    });

    return csvData.join("\n");
  }
  const handleMenuOpen = async (event) => {
    setloadervalue(true);
    const payload = {
      "pageindex": Page,
      "pagesize": numItems,
      "searchdata": Search,
      "sortparam": "created_at",
      "sortorder": "DESC",
      "fromDate": selectedDate1 == "Invalid date" ? "" : selectedDate1,  //default " " Pass Date in YYYY-MM-DD
      "toDate": selectedDate2 == "Invalid date" ? "" : selectedDate2, //default " " Pass Date in YYYY-MM-DD
      "riskLevel": riskLevel, //default "" low | medium | high
      "isSignupDone": kycVerified, //default '' true/false
      "kycVerified": KYCStaus, //default '' true/false
      "kycVerifiedBy": KYCSVerifiedBY, //default '' digital : true | manual : false
      "noOfTransaction": NoOfTransaction, //default '' 1 | 2 .... '10+' String
      "userType": parseInt(userType), // default 0 int individual 2 | business 3 | agent 4
      "activeDays": parseInt(NoDays)  // default 0 int
    }
    const response = await axios.post(
      CommonConstants.BASE_URL + "/getallusers",
      payload
    );
    setloadervalue(false);
    if (response.data.status == true) {
      const csvContent = convertToCSV(response.data.data);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, "UserReports.csv");
    }

  };
  //getallusers api
  useEffect(() => {
    getData();
  }, [RowsPerPage, Page, Search]);
  // delete api
  const handleDelete = async () => {
    // console.log(id)
    setmodalShowPrChange(false);
    setloadervalue(true);

    await axios
      .post(`${CommonConstants.BASE_URL}/deleteuserbyid`, {
        id: id,
      })
      .then((res) => {
        if (res.data.statuscode) {
          setModalShow(true);
        }
        getData();
        setloadervalue(false);
      })
      .catch((err) => {
        // console.log(err);
        setloadervalue(false);
      });
  };

  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
    // document.getElementById("hideloding").style.display = "block";
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
    }
  };
  const goIndividualuser = () => {
    navigate("/individualuser");
  };

  const handleLinkClick = (itemId) => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  };
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}

      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div className="container-fluid">
            <PageHeader
              HeaderText="Users"
              Breadcrumb={[
                { name: "Dashboard", navigate: "" },
                { name: "IoT Dashboard", navigate: "" },
              ]}
            />
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="body project_report">
                    <div className="table-responsive1">
                      <div className="row d-flex g-0">
                        <div className=""></div>
                      </div>
                      {/* <hr className="pt-0 mt-0"></hr> */}

                      <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                        {allUsers && allUsers.length > 0 &&
                          <div className="filter-row mb-2 ">
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
                        }
                        <div className="form-group  d-flex align-items-center pbSt">
                          {showSearch &&
                            <>
                              <label className="fw-bolder mb-0">Search: </label>{" "}
                              &nbsp;&nbsp;
                              <input
                                type="search"
                                id="search"
                                className="form-control p-0 ps-3 pe-3"
                                placeholder=""
                                onChange={handlSearch}
                              />
                            </>}
                          &nbsp;&nbsp;
                          <div>
                            <Button
                              variant="outlined"
                              color="primary"
                              className="m-0"
                              onClick={handleFilter}
                            >
                              <i className="fa fa-filter" title="Filter" />
                            </Button>
                          </div>{" "}
                          &nbsp;&nbsp;
                          <div>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={handleMenuOpen}
                              className="m-0"
                            >
                              <i className="fa fa-download" title="Download" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      {
                        allUsers && allUsers.length > 0 ?
                          <div
                            style={{ overflowX: "auto", overflowY: "hidden" }}
                            id="style-4"
                          >
                            <table className="table m-b-0">
                              <thead className="thead-light">
                                <tr>
                                  <th>Name</th>
                                  <th>Mobile</th>
                                  <th>Email/ID</th>
                                  <th>Registered <br /> Date</th>
                                  <th>User Type</th>
                                  <th>KYC Verified</th>
                                  <th>Total No. of <br /> Transactions</th>
                                  <th>KYC Status</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              {allUsers && allUsers.map((item) => {
                                const createdAt = moment(item.createdAt);
                                const daysAgo = createdAt.fromNow();
                                return (
                                  <tbody>
                                    <tr
                                      key={item.id}
                                      style={{
                                        backgroundColor: item.isSignupCompleted === true && item.kycVerified === true && item.totalNoTransactions == 0
                                          ? statusColorsUsers.third
                                          : item.isSignupCompleted === true && item.kycVerified === false
                                            ? statusColorsUsers.fourth
                                            : item.isSignupCompleted === true
                                              ? statusColorsUsers.seventh
                                              : item.kycVerified == false && item.totalNoTransactions > 0
                                                ? statusColorsUsers.fifth
                                                : item.totalNoTransactions > 1
                                                  ? statusColorsUsers.first
                                                  : statusColorsUsers.second
                                      }}
                                    >
                                      <div className="mt-2 d-flex text-black fw-normal">
                                        {item?.client === 'web' ? <LanguageIcon /> : item?.client === 'android' ? <AndroidIcon /> : item?.client === 'iphone' ? <AppleIcon /> : <LanguageIcon />}
                                        &nbsp;
                                        <Link
                                          className="d-flex align-items-center w-75 text-black fw-normal "
                                          to={{
                                            pathname: "/individualuser",
                                            state: item.id,
                                          }}
                                          // style={{ color: "black" }}
                                          onClick={() => handleLinkClick(item.id)}
                                        >
                                          <div className="border-0">
                                            {item.fName}{" "}{item.lName}
                                          </div>
                                        </Link>
                                        &nbsp;
                                        <Tooltip title={daysAgo} placement="top" className="ms-auto">
                                          <ScheduleSharpIcon
                                            className="text-black"
                                            color="black"
                                          />
                                        </Tooltip>

                                      </div>
                                      <td className="border-0">{item.phone === "" ? "-" : (item.phone[0] !== '0' ? '0' + item.phone : item.phone)}</td>
                                      <td className="border-0">
                                        {item.email == "" ? "-" : item.email}
                                      </td>
                                      <td className="border-0">
                                        {moment(item.createdAt).format(
                                          "DD/MM/YYYY"
                                        )} <br />
                                        {moment(item.createdAt).format(
                                          "HH:MM:SS"
                                        )}
                                      </td>
                                      <td>{item.roleId == 2 ? "Individual" : (item.roleId == 3 ? "Business" : "Agent")}</td>
                                      <td className="border-0">{item.isDigital === true ? "Digitally" : "Manually"}</td>
                                      <td className="border-0">{item.totalNoTransactions}</td>
                                      <td className="border-0">{item.kycVerified == true ? "Verified" : "Unverified"}</td>
                                      <td className="border-0">
                                        <a
                                          onClick={() => {
                                            confirmClick(item.id);
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
                                  </tbody>
                                )
                              })}
                            </table>
                          </div>
                          : <NoRecordWithAddBtn />
                      }

                      {
                        allUsers && allUsers.length > 0 &&
                        <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                          <div className="filter-row pt-2">
                            {/* {/* Showing 1 to 51 of 184 entries */}
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
                            defaultPage={7}
                            onChange={HandleChangePage}
                            color="secondary"
                            shape="rounded"
                          />
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
                      {/* <Pagination
                          postsPerPage={this.state.postsPerPage}
                          totalPosts={this.state.data.length}
                          paginate={this.paginate}
                        // paginateBack={this.paginateBack}
                        /> */}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal open={open} onClose={handleModalClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "20px",
                  width: { xs: "90%", sm: "70%", md: "60%", lg: "60%" },
                  paddingBottom: "20px",
                  maxHeight: "90vh", // Set a maximum height for the container
                  overflowY: "auto", // Enable vertical scrolling
                }}
              >
                <div className="border-bottom py-2 mb-2 d-flex justify-content-between">
                  <h5>Filter</h5>
                  <div onClick={handleModalClose} className="pointer">
                    <CloseIcon />
                  </div>
                </div>

                <div className="">
                  <div className="row mt-2">
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">From</div>
                      <Form.Control
                        type="date"
                        required
                        placeholder="From date"
                        name="Referal"
                        className="reflink link py-4 pbSt"
                        value={selectedDate1}
                        onChange={handleDateChange}
                      />
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">To</div>
                      <Form.Control
                        type="date"
                        required
                        placeholder="To date"
                        name="Referal"
                        className="reflink link py-4 pbSt"
                        value={selectedDate2}
                        onChange={handleDateChange2}
                      />
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Risk Level
                      </div>
                      <Form.Select
                        onChange={(event) =>
                          handleRiskDropdown(event.target.value)
                        }
                        value={riskLevel}
                      >
                        <option value="">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </Form.Select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">KYC Status</div>
                      <Form.Select
                        onChange={(event) =>
                          handleKYCDropdown(event.target.value)
                        }
                        value={KYCStaus}
                      >
                        <option value="">All</option>
                        <option value={true}>Verified</option>
                        <option value={false}>Unverified</option>
                      </Form.Select>
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Registration Status
                      </div>
                      <Form.Select
                        onChange={(event) =>
                          handleStatusDropdown(event.target.value)
                        }
                        value={kycVerified}
                      >
                        <option value="">All</option>
                        <option value={false}>Incomplete</option>
                        <option value={true}>Completed</option>
                      </Form.Select>
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">KYC Verified By</div>
                      <Form.Select
                        onChange={(event) =>
                          handleDropdown(event.target.value)
                        }
                        value={KYCSVerifiedBY}
                      >
                        <option value="">All</option>
                        <option value={true}>Digitally</option>
                        <option value={false}>Manually</option>
                      </Form.Select>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        No of transaction
                      </div>
                      <Form.Select
                        onChange={(event) =>
                          NOOfTransactionDropdown(event.target.value)
                        }
                        value={NoOfTransaction}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="10+">10+</option>
                      </Form.Select>
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Active status
                      </div>
                      <Form.Select
                        onChange={(event) =>
                          handleDaysDropDown(event.target.value)
                        }
                        value={NoDays}
                      >
                        <option value={0}>All</option>
                        <option value={365}>Active in last 365 days</option>
                        <option value={180}>Active in last 180 days</option>
                        <option value={90}>Active in last 90 days</option>
                        <option value={30}>Active in last 30 days</option>
                        <option value={0}>Not active in last 365 days</option>
                      </Form.Select>
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">User type</div>
                      <Form.Select
                        onChange={(event) =>
                          handleUserDropdown(event.target.value)
                        }
                        value={userType}
                      >
                        <option value={0}>All</option>
                        <option value={2}>Individual</option>
                        <option value={3}>Business</option>
                        <option value={4}>Agent</option>
                      </Form.Select>
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-end mt-3 border-top">
                  <div className="col-lg-2">
                    <Button
                      className="m-0 mt-3"
                      variant="contained"
                      color="primary"
                      onClick={() => handleFilterPopup()}
                    >
                      Filter
                    </Button>
                  </div>
                  <div className="col-lg-2">
                    <Button
                      className="m-0 mt-3"
                      variant="outlined"
                      onClick={handleModalClose}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
