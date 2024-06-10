import React, { useEffect, useState } from "react";
import "./CMSManagement.scss";
import PageHeader from "../../../../components/PageHeader";
import axios from "axios";
import { CommonConstants } from "../../../../Constants/common.constants";
import { Form } from "react-bootstrap";
import NoRecordWithAddBtn from "../../../../Helpers/NoRecord/NoRecordWithAddBtn";
import Loader from "../../../Loader/Loader";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";

const label = { inputProps: { 'aria-label': 'Active' } };

export default function CMSManagement() {
  const navigate = useNavigate();
  const [fundData, setFundData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [Search, SetSearch] = React.useState("");
  const [loadervalue, setloadervalue] = useState(false);
  const [RowsPerPage, SetRowsPerPage] = React.useState(
    CommonConstants.DefaultPageSize
  );
  const [showSearch, setShowSearch] = useState(false);
  const [Page, SetPage] = React.useState(1);
  const [numItems, SetNumItems] = React.useState(0);
  const [CountPage, SetCountPage] = React.useState(0);
  const [cmsData, setCmsData] = useState([])
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
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleNoteCloseModal = () => {
    setOpenNoteModal(false);
  };
  const handleOpenModel = async (id) => {
    await axios
      .post(CommonConstants.BASE_URL + "/getreportfraudbyid", { id: id })
      .then((responce) => {
        if (responce.data.status == true) {
          setShowData(responce.data.data);
          setOpenNoteModal(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const getAllCMSData = async () => {
    setloadervalue(true);
    const payload = {
      pageindex: Page,
      pagesize: RowsPerPage,
      searchdata: Search,
    };
    await axios
      .post(CommonConstants.BASE_URL + "/getallcms", payload)
      .then((responce) => {
        setCmsData(responce.data.data);
        SetCountPage(responce.data.totalPageCount);
        SetNumItems(responce.data.recordCount);
        setShowSearch(responce.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      })
      .catch((error) => {
        console.log(error);
      });
    setloadervalue(false);
  }

  const navigateToAddFAQCreate = () => {
    navigate({ pathname: "/add-faq-content" });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(cmsData.length > 0 || searchTerm.trim() !== '');
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
    // alert('i')
    navigate({ pathname: "/edit-CMS", state: id });
    console.log('id', id);

  }

  const handleAddPage = () => {
    navigate({ pathname: "/edit-CMS" });

  }
  useEffect(() => {
    getAllCMSData()
  }, [Search, RowsPerPage, Page]);

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid" onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <PageHeader
          HeaderText="Content Management System "
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


                  {/* <div className="respoChildFooter ">
                    {fundData && fundData.length > 0 && (
                      <div className="filter-row pb-2 ">
                        Show Entries &nbsp; &nbsp;
                        <div className="d-flex justify-content-between align-items-center pbSt">
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
                    <div className="d-flex align-items-center justify-content-between respoChildFooter">
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
                      </div>{" "}
                      &nbsp;
                      <div className=" ps-0 d-flex justify-content-end">
                        <a
                          onClick={() => {
                            handleAddPage();
                          }}
                          className="btn btn-default purpleBackground text-white bolder pbSt"
                        >
                          <i className="text-white fa fa-plus bolder"></i> Add
                          New
                        </a>
                      </div>
                    </div>
                  </div> */}

                  <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                    {cmsData && cmsData.length > 0 && (
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
                      {showSearch && <div className="form-group d-flex align-items-center mb-0">
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
                      </div>}{" "}
                      &nbsp;
                      <div className="d-none ps-0 d-flex justify-content-end">
                        <a
                          onClick={() => {
                            handleAddPage();
                          }}
                          className="btn btn-default purpleBackground text-white bolder pbSt"
                        >
                          <i className="text-white fa fa-plus bolder"></i> Add
                          New
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="row"></div>
                  {cmsData && cmsData?.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table className="table m-b-0 table-hover mt-3">
                        <thead className="thead-light">
                          <tr>
                            <th>Page Name</th>
                            <th>URL Slug</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cmsData?.map((row) => {
                            return (
                              <tr>
                                <td>
                                  {row?.title}
                                </td>
                                <td>
                                  {row?.slug}
                                </td>
                                <td className="project-actions">

                                  <a
                                    onClick={() => handleEditPage(row.id)}
                                    className="btn btn-outline-secondary mr-1"
                                  >
                                    <i className="fa fa-edit" title="Edit"></i>
                                  </a>
                                  {/* <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" title='View' onClick={() => handleOpenModel(row.id)}>
                                        <RemoveRedEyeIcon />
                                      </a>{" "} */}
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
                {cmsData && cmsData.length > 0 && (
                  <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                    <div className="filter-row pt-2">
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
    </>
  );
}
