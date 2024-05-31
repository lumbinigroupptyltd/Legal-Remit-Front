import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import Loader from "../Loader/Loader";


const ReferralUser = ({ userId }) => {
  // const [id, setId] = useState(props.location.state);
  const [showModal, setShowModal] = useState(false);
  const [RowsPerPage, SetRowsPerPage] = useState(CommonConstants.DefaultPageSize);
  const [Page, SetPage] = useState(1);
  const [allUserAgents, setAllUserAgents] = useState([]);
  const [Search, SetSearch] = useState("");
  const [CountPage, SetCountPage] = useState(0);
  const [numItems, SetNumItems] = useState(0);
  const [loadervalue, setloadervalue] = useState(false);
  const [userData, setUserData] = useState(
    {
      userStatus: null,
      userName: " ",
      email: "",
      streetName: "",
      referralCode: "",
      riskLevel: null,
      noOfTransactions: 0,
      totalAmtSent: 0,
      avgTransaction: 0,
      totalServiceCharge: 0,
      totalNoOfFreeServiceCharge: 0.0,
      noOfReceivingCountry: 1,
      noOfAmtSentLocalCurrency: 0,
      daysSinceLastTran: 0,
      daysSinceLastLogin: 0,
      dateOfRegistration: "",
      dateOfFirstTransaction: "",
      noOfTransactionInOneYr: 12,
      totalAmtSentInOneYr: 6034.9,
      totalNoOfTransactionInLast90Days: 0,
      totalAmtSentIn90Days: 0.0,
      longestGapBetweenTwoTransaction: 0,
      shortestGapBetweentwonTransaction: 0,
      phone: ""
    }
  );


  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getUserData = async () => {
    if (userId !== 'undefined' || userId !== "") {
      const userPayLoad = new FormData();
      userPayLoad.append('userId', userId);
      const userResponse = await axios.post(`${CommonConstants.BASE_URL}/getusersummery`, userPayLoad);
      const responseData = userResponse.data.data;
      if (userResponse.data.status == true) {
        setUserData(responseData);
      }
    }
  };
  const getUserAgents = async () => {
    try {
      setloadervalue(true);
      const sendData = {
        userId: userId,
        pageindex: Page,
        pagesize: RowsPerPage,
        searchdata: Search
      };

      const response = await axios.post(CommonConstants.BASE_URL + '/getagentsbyuser', sendData);
      if (response.data.status === true) {
        setAllUserAgents(response.data.data);
        SetCountPage(response.data.totalPageCount)
        SetNumItems(response.data.recordCount)
      }
      setloadervalue(false);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
    }
  };
  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
  };
  const handleSearch = (e) => {
    SetSearch(e.target.value);
    SetPage(1);
  };
  useEffect(() => {
    getUserAgents();
    getUserData();
  }, [userId, Page, RowsPerPage, Search]);
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 p-0">
            {userData && userData.referralCode ? (
              <div className="alert alert-success d-flex align-items-center" role="alert">
                <i className='fas fa-gifts fs-5 pe-3'></i>  {userData?.userName} is referred by John Doe from <b className="ps-1">{userData?.phone}.</b>
              </div>
            ) : (
              <div className="alert alert-danger d-flex align-items-center mt-3" role="alert">
                <i className='fa fa-frown fs-5 pe-3'></i>  {userData?.userName} wasn't referred by anyone.
              </div>
            )}
            <h5 className="purpleText my-4 mt-1">
              Referral to ({numItems ? numItems : 0})
            </h5>
            <div className="d-flex justify-content-between align-items-center respoChildFooter ">
              {allUserAgents && allUserAgents.length > 0 &&
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
              }
              {allUserAgents && allUserAgents.length > 0 && <div className="d-flex align-items-center respoChildFooter">
                <div className="form-group d-flex align-items-center mb-0">
                  <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                  <input
                    type="search"
                    id="search"
                    className="form-control p-0 px-3 "
                    placeholder=""
                    onChange={handleSearch}
                  />
                </div> &nbsp;
              </div>}
            </div>
            {allUserAgents && allUserAgents.length > 0 ?
              (<div className="card">
                <div className="body project_report p-0">
                  <div className="table-responsive">
                    <table className="table m-b-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUserAgents.map(item => (
                          <tr key={item.id}>
                            <td>{item.fName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>)
              :
              ''
            }
            {
              allUserAgents && allUserAgents.length > 0 &&
              <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                <div className="filter-row pt-2">
                  {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                </div>
                <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
              </div>
            }
            {allUserAgents && allUserAgents.length <= 0 ?
              (<div className="alert alert-danger d-flex align-items-center mt-3" role="alert">
                <i className='fa fa-frown fs-5 pe-3'></i>  {userData?.userName} has't referred anyone yet!
              </div>)
              :
              ''
            }
          </div>
        </div>
      </div>

      {/* The Modal component */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title>Send notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="col-lg-12 px-0">
              <div className="font-weight-normal m-2 labelCard">
                Select notification
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  style={{ color: "#6b757d", fontSize: "1rem" }}
                  className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border col-lg-12 d-flex align-items-center justify-content-between"
                  variant="secondary"
                >
                  Select notification
                </Dropdown.Toggle>
                <Dropdown.Menu className="col-lg-12">
                  <Dropdown.Item>Account Created</Dropdown.Item>
                  <Dropdown.Item>Account Closed</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Form.Group controlId="notes" className="mt-3">
              <Form.Label>Note</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="">
          <div className="d-flex ms-auto ">
            <Button className="purpleBorder bg-transparent purpleText">
              Cancel
            </Button>
            <Button className="purpleBackground border-0 px-4">Add</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReferralUser;

