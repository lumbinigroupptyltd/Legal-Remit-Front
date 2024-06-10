import React, { useEffect, useState } from "react";
import "./BlogsManagement.scss";
import PageHeader from "../../../../components/PageHeader";
import axios from "axios";
import { CommonConstants } from "../../../../Constants/common.constants";
import moment from "moment";
import { Pagination } from "@mui/material";
import { Form } from "react-bootstrap";
import NoRecordWithAddBtn from "../../../../Helpers/NoRecord/NoRecordWithAddBtn";
import Loader from "../../../Loader/Loader";
import ModalComponentPopup from "../../ModalComponentPopup";
import ModalComponent from "../../ModalComponent";
import { useNavigate } from "react-router-dom";

const label = { inputProps: { "aria-label": "Active" } };

export default function BlogsManagement() {
  const navigate = useNavigate();
  const [fundData, setFundData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [Search, SetSearch] = React.useState("");
  const [loadervalue, setloadervalue] = useState(false);
  const [RowsPerPage, SetRowsPerPage] = React.useState(
    CommonConstants.DefaultPageSize
  );
  const [deleteDataId, setDeleteDataId] = useState(0);
  const [Page, SetPage] = React.useState(1);
  const [numItems, SetNumItems] = React.useState(0);
  const [CountPage, SetCountPage] = React.useState(0);
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
  const [modalShow, setModalShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const getAllReportFraud = async () => {
    setloadervalue(true);
    const payload = {
      pageindex: Page,
      pagesize: RowsPerPage,
      searchdata: Search,
      sortparam: "created_at",
      sortorder: "DESC",
    };
    await axios
      .post(CommonConstants.BASE_URL + "/getallblogslist", payload)
      .then((responce) => {
        setFundData(responce.data.data);
        SetCountPage(responce.data.totalPageCount);
        SetNumItems(responce.data.recordCount);
        setShowSearch(
          responce.data.recordCount == 0 ? (Search == "" ? false : true) : true
        );
      })
      .catch((error) => {
        console.log(error);
      });
    setloadervalue(false);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(fundData.length > 0 || searchTerm.trim() !== "");
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

  const handleEditPage = (id) => {
    navigate({
      pathname: "/edit-blogs",
      state: id,
    });
  };

  const handleAddPage = () => {
    navigate({ pathname: "/edit-blogs" });
  };
  const handlOpenDelete = (id) => {
    setDeleteDataId(id);
    setmodalShowPrChange(true);
  };

  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const handleDeleteClick = async () => {
    setmodalShowPrChange(false);
    try {
      const deleRecord = await axios.post(
        CommonConstants.BASE_URL + "/deleteblogyid",
        { id: deleteDataId }
      );
      if (deleRecord.data.status == true) {
        setModalShow(true);
        getAllReportFraud();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllReportFraud();
  }, [Search, RowsPerPage, Page]);

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div
        className="container-fluid"
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <PageHeader
          HeaderText="Blogs"
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
                    {fundData && fundData.length > 0 && (
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
                      {showSearch && (
                        <div className="form-group d-flex align-items-center mb-0">
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
                        </div>
                      )}{" "}
                      &nbsp;
                      <div className="">
                        <div className=" ps-0 d-flex justify-content-end">
                          <a
                            onClick={() => handleAddPage()}
                            className="btn btn-default purpleBackground text-white bolder pbSt"
                          >
                            <i className="text-white fa fa-plus bolder"></i> Add
                            New
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row"></div>
                  {fundData && fundData.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table className="table m-b-0 table-hover mt-3">
                        <thead className="thead-light">
                          <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Enabled</th>
                            <th>Popular</th>
                            <th>View Count</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fundData.map((row) => {
                            return (
                              <tr>
                                <td>
                                  <img
                                    src={CommonConstants.BASE_URL + row.image}
                                    alt="img"
                                    height={100}
                                    width={100}
                                  />
                                </td>
                                <td>{row.title}</td>
                                <td>
                                  {row.enabled == true ? "True" : "False"}
                                </td>
                                <td>
                                  {row.popular == true ? "True" : "False"}
                                </td>
                                <td>{row.totalViewsCount}</td>
                                <td>
                                  {moment(row.createdAt).format("YYYY-MM-DD")}
                                </td>
                                <td className="project-actions">
                                  <a
                                    onClick={() => handleEditPage(row.id)}
                                    className="btn btn-outline-secondary mr-1"
                                  >
                                    <i className="fa fa-edit" title="Edit"></i>
                                  </a>
                                  &nbsp;&nbsp;
                                  <a
                                    onClick={() => {
                                      handlOpenDelete(row.id);
                                    }}
                                    className="btn btn-outline-secondary mr-1"
                                  >
                                    <i
                                      className="fa fa-trash text-danger"
                                      title="Edit"
                                    ></i>
                                  </a>
                                  &nbsp;
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
                {fundData && fundData.length > 0 && (
                  <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                    <div className="filter-row pt-2">
                      {numItems > 0
                        ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${
                            Page * RowsPerPage > numItems
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

      {/* delete model */}
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
    </>
  );
}
