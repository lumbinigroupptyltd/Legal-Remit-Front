import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { CommonConstants } from "../../Constants/common.constants";
import Pagination from '@mui/material/Pagination';
import NoRecordWithAddBtn from "../../Helpers/NoRecord/NoRecordWithAddBtn";
import Loader from "../Loader/Loader";

const Points = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [CountPage, SetCountPage] = useState(0);
  const [Page, SetPage] = useState(1);
  const [RowsPerPage, SetRowsPerPage] = useState(CommonConstants.DefaultPageSize);
  const [numItems, SetNumItems] = useState(0);
  const [allPoints, setAllPoints] = useState([]);
  const [loadervalue, setloadervalue] = useState(false);

  const getAllPoints = async () => {
    setloadervalue(true);
    const payload = {
      "userId": userId,//userId
      "pageindex": Page,
      "pagesize": RowsPerPage,
      "sortparam": "created_at",
      "sortorder": "DESC"
    }
    const getpoints = await axios.post(CommonConstants.BASE_URL + '/getuserpoints', payload);
    if (getpoints.data.status == true) {
      setAllPoints(getpoints.data.data);
      SetCountPage(getpoints.data.totalPageCount)
      SetNumItems(getpoints.data.recordCount);
    }
    setloadervalue(false);

  }
  const handleShowModal = () => {
    setShowModal(true);
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
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getAllPoints();
  }, [userId, Page, RowsPerPage,])
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 p-0">
            <div className="card">
              <div className="body project_report p-0">
                <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                  {allPoints && allPoints.length > 0 &&
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
                </div>
                <div className="table-responsive">
                  {allPoints && allPoints.length > 0 ?
                    <table className="table m-b-0">
                      <thead className="thead-light">
                        <tr>
                          <th>Points</th>
                          <th>Valid Untill</th>
                          <th>Is Redeem </th>
                          <th>Is Expired</th>
                        </tr>
                      </thead>
                      {allPoints.map((res) => (
                        <tbody>
                          <tr>
                            <td>{res.points}</td>
                            <td>{res.expiredDate ? res.expiredDate : "-"}</td>
                            <td>{res.redeem == true ? "YES" : "NO"}</td>
                            <td>{res.isExpired == true ? "YES" : "NO"}</td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                    : <NoRecordWithAddBtn />}
                </div>
                {allPoints && allPoints.length > 0 && <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
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

export default Points;

