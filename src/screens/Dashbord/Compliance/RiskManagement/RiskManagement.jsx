import React, { useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CommonConstants } from '../../../../Constants/common.constants'
import { useEffect } from "react";
import Pagination from '@mui/material/Pagination';
import Loader from '../../../Loader/Loader'
import ModalComponent from "../../ModalComponent";
import ModalComponentPopup from "../../ModalComponentPopup";

export default function RiskManagement() {
  const navigate = useNavigate()
  const [loadervalue, setloadervalue] = useState(false);
  const [page, setPage] = useState(1);
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [RowsPerPage, setRowsPerPage] = useState(10);
  const [Search, SetSearch] = useState('');
  const [riskManagementData, setRiskManagementData] = useState([]);
  const [riskManagementData1, setRiskManagementData1] = useState([]);
  const [riskManagementData2, setRiskManagementData2] = useState([]);
  const [numItems, SetNumItems] = useState(0);
  const [numItems1, SetNumItems1] = useState(0);
  const [numItems2, SetNumItems2] = useState(0);
  const [CountPage, SetCountPage] = useState(0);
  const [CountPage1, SetCountPage1] = useState(0);
  const [CountPage2, SetCountPage2] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);

  const confirmClick = async (id) => {
    setmodalShowPrChange(true)
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const handleEditRiskManagement = (id) => {
    navigate({ pathname: '/create-risk-management', state: id })
  }
  const handleDelete = async () => {
    setloadervalue(true);
    setmodalShowPrChange(false);
    await axios
      .post(`${CommonConstants.BASE_URL}/deleterisksetting`, {
        id: id,
      })
      .then((res) => {
        if (res.data.statuscode) {
          setModalShow(true)
        }
        getallrisksettings();
        getallrisksettings2();
        getallrisksettings3();
        setloadervalue(false);
      })
      .catch((err) => {
        // console.log(err);
        setloadervalue(false);
      });
  };
  const ChangeRowSelected = (Event) => {
    setRowsPerPage(Number(Event.target.value));
    setPage(1);
  };
  const RequestSearch = (Event) => {
    if (Event.key === "Enter") {
      var SearchedVal = document.getElementById("search").value;
      SetSearch('%' + SearchedVal + '%');
      setPage(1);
    }
    console.log('serach', SearchedVal);
  };
  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == page) {
      setPage(NewPage);
    } else {
      setPage(NewPage);
    }
    console.log('newpage', NewPage);
  };
  const getallrisksettings = () => {
    setloadervalue(true);
    Search === "" ? setloadervalue(true) : setloadervalue(false);
    const data = {
      pageindex: page,
      categoryId: 1,
      pagesize: RowsPerPage,
      searchdata: Search === "" ? '%%' : Search,
      sortparam: "create_at",
      sortorder: "ASC"
    }
    axios.post(CommonConstants.BASE_URL + "/getallrisksettings", data).then(async (res) => {
      const riskSettingData = await res.data.data;
      if (res.data.status === true) {
        setRiskManagementData(riskSettingData)
        SetCountPage(res.data?.totalPageCount)
        SetNumItems(res.data.recordCount)
      }
    }).catch((error) => {
      console.log(error);
    })
    setloadervalue(false);
  }
  const getallrisksettings2 = () => {
    setloadervalue(true);
    Search === "" ? setloadervalue(true) : setloadervalue(false);
    const data = {
      pageindex: page,
      categoryId: 2,
      pagesize: RowsPerPage,
      searchdata: Search === "" ? '%%' : Search,
      sortparam: "create_at",
      sortorder: "ASC"
    }
    axios.post(CommonConstants.BASE_URL + "/getallrisksettings", data).then(async (res) => {
      const riskSettingData = await res.data.data;
      if (res.data.status === true) {
        setRiskManagementData1(riskSettingData)
        SetCountPage1(res.data?.totalPageCount)
        SetNumItems1(res.data.recordCount)
      }
    }).catch((error) => {
      console.log(error);
    })
    setloadervalue(false);
  }
  const getallrisksettings3 = () => {
    setloadervalue(true);
    Search === "" ? setloadervalue(true) : setloadervalue(false);
    const data = {
      pageindex: page,
      categoryId: 3,
      pagesize: RowsPerPage,
      searchdata: Search === "" ? '%%' : Search,
      sortparam: "create_at",
      sortorder: "ASC"
    }
    axios.post(CommonConstants.BASE_URL + "/getallrisksettings", data).then(async (res) => {
      const riskSettingData = await res.data.data;
      if (res.data.status === true) {
        setRiskManagementData2(riskSettingData)
        SetCountPage2(res.data?.totalPageCount)
        SetNumItems2(res.data.recordCount)
      }
    }).catch((error) => {
      console.log(error);
    })
    setloadervalue(false);
  }

  const createRiskManagement = () => {
    navigate('/create-risk-management')
  }
  useEffect((e) => {
    getallrisksettings(e)
    getallrisksettings2(e);
    getallrisksettings3(e);
  }, [Search, page, RowsPerPage])

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div>
        <div>
          <div className="container-fluid" onClick={() => {
            document.body.classList.remove("offcanvas-active");
          }}>
            <PageHeader
              HeaderText="Risk Management"
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
                      {/* <hr className="pt-0 mt-0" /> */}
                      <div className="row"></div>
                      <div className="filter-row d-flex justify-content-between align-items-center mb-3">
                        <p className="font-weight-normal responsiveFontLarge mb-0">Amount Threshold  </p>
                        <div className="row d-flex g-0">
                          <div className=" justify-content-end d-flex  responsiveFontLarge">
                            <a
                              className="btn btn-default purpleBackground text-white bolder responsiveFontLarge"
                              onClick={() => {
                                createRiskManagement()
                              }}
                            >
                              <i className="text-white fa fa-plus bolder"></i> Add New
                            </a>

                          </div>
                        </div>
                      </div>
                      <div style={{ overflowX: "auto" }}>
                        <table className="table m-b-0 ">
                          <thead className="thead-light responsiveFontLarge">
                            <tr>
                              <th className="responsiveFontLarge">Duration/Days</th>
                              <th className="responsiveFontLarge">Low Risk</th>
                              <th className="responsiveFontLarge">Medium Risk</th>
                              <th className="responsiveFontLarge">High Risk</th>
                              <th className="responsiveFontLarge">Actions</th>
                            </tr>
                          </thead>
                          {
                            riskManagementData &&
                            riskManagementData
                              .sort((a, b) => a.days - b.days)
                              .map((ele) => {
                                return (
                                  <tbody>
                                    <tr key={ele.id}>
                                      <td>{ele.days} {ele.days == 1 ? "Day" : "Days"}</td>
                                      <td className="project-title">
                                        <h6>
                                          <a>{ele.categoryId == 1 ? "$" : ""}{ele.lowRisk}</a>
                                        </h6>
                                      </td>
                                      <td>{ele.categoryId == 1 ? "$" : ""}{ele.mediumRisk}</td>
                                      <td>{ele.categoryId == 1 ? "$" : ""}{ele.highRisk} + </td>
                                      <td className="project-actions">
                                        <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={(e) => handleEditRiskManagement(ele.id)}  >
                                          <i className="fa fa-edit " title="Edit"></i>
                                        </a>{" "}
                                        &nbsp;
                                        <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                          onClick={() => {
                                            confirmClick(ele.id);
                                          }}>
                                          <i className="fa fa-trash" title="Delete" style={{ color: "red" }}></i>
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                )
                              })}
                        </table>
                      </div>
                      {numItems > 10 ? <div className="d-flex justify-content-between pt-4 mr-4 mr-4">
                        <div className="filter-row pt-2">
                          {numItems > 0 ? `Showing ${(page - 1) * RowsPerPage + 1} to ${(page * RowsPerPage) > numItems ? numItems : (page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                        </div>
                        <Pagination count={CountPage} className="pbDowSt pbSt" page={page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                      </div> : ""}
                      <br></br>
                      <br></br>

                      <div className="filter-row pb-2">
                        <p className="font-weight-normal responsiveFontLarge">Number of Transaction</p>
                      </div>
                      <div style={{ overflowX: "auto" }}>
                        <table className="table m-b-0 ">
                          <thead className="thead-light">
                            <tr>
                              <th className="responsiveFontLarge">Duration/Days</th>
                              <th className="responsiveFontLarge">Low Risk</th>
                              <th className="responsiveFontLarge">Medium Risk</th>
                              <th className="responsiveFontLarge">High Risk</th>
                              <th className="responsiveFontLarge">Actions</th>
                            </tr>
                          </thead>
                          {riskManagementData1
                            .sort((a, b) => a.days - b.days)
                            .map(ele => {
                              return <tbody>

                                <tr key={ele.id}>

                                  <td>{ele.days} {ele.days == 1 ? "Day" : "Days"}</td>
                                  <td className="project-title">
                                    <h6>
                                      <a>{ele.lowRisk}</a>
                                    </h6>
                                  </td>

                                  <td>{ele.mediumRisk}</td>


                                  <td>{ele.highRisk} + </td>

                                  <td className="project-actions">
                                    <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={(e) => handleEditRiskManagement(ele.id)}  >
                                      <i className="fa fa-edit " title="Edit"></i>
                                    </a>{" "}
                                    &nbsp;
                                    <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                      onClick={() => {
                                        confirmClick(ele.id);
                                      }}>
                                      <i className="fa fa-trash" title="Delete" style={{ color: "red" }}></i>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            })}
                        </table>
                      </div>
                      {numItems1 > 10 ? <div className="d-flex justify-content-between pt-4 mr-4 mr-4">
                        <div className="filter-row pt-2">
                          {numItems1 > 0 ? `Showing ${(page - 1) * RowsPerPage + 1} to ${(page * RowsPerPage) > numItems1 ? numItems1 : (page * RowsPerPage)} of ${numItems1} entries` : "No records Available"}
                        </div>
                        <Pagination count={CountPage1} className="pbDowSt pbSt" page={page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                      </div> : ""}
                      <br></br>
                      <br></br>
                      <div className="filter-row pb-2">
                        <p className="font-weight-normal responsiveFontLarge">Number of Active Recipients</p>
                      </div>
                      <div style={{ overflowX: "auto" }}>
                        <table className="table m-b-0 ">
                          <thead className="thead-light">
                            <tr>
                              <th className="responsiveFontLarge">Duration/Days</th>
                              <th className="responsiveFontLarge">Low Risk</th>
                              <th className="responsiveFontLarge">Medium Risk</th>
                              <th className="responsiveFontLarge">High Risk</th>
                              <th className="responsiveFontLarge">Actions</th>
                            </tr>
                          </thead>
                          {riskManagementData2
                            .sort((a, b) => a.days - b.days)
                            .map(ele => {
                              return <tbody>

                                <tr key={ele.id}>

                                  <td>{ele.days} {ele.days == 1 ? "Day" : "Days"}</td>

                                  <td className="project-title">
                                    <h6>
                                      <a>{ele.lowRisk}</a>
                                    </h6>
                                  </td>

                                  <td>{ele.mediumRisk}</td>


                                  <td>{ele.highRisk} + </td>

                                  <td className="project-actions">
                                    <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={(e) => handleEditRiskManagement(ele.id)}  >
                                      <i className="fa fa-edit" title="Edit"></i>
                                    </a>{" "}
                                    &nbsp;
                                    <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                      onClick={() => {
                                        confirmClick(ele.id);
                                      }}>
                                      <i className="fa fa-trash" title="Delete" style={{ color: "red" }}></i>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            })}
                        </table>
                      </div>

                      {numItems2 > 10 ? <div className="d-flex justify-content-between pt-4 mr-4 mr-4">
                        <div className="filter-row pt-2">
                          {numItems2 > 0 ? `Showing ${(page - 1) * RowsPerPage + 1} to ${(page * RowsPerPage) > numItems2 ? numItems2 : (page * RowsPerPage)} of ${numItems2} entries` : "No records Available"}
                        </div>
                        <Pagination count={CountPage2} className="pbDowSt pbSt" page={page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                      </div> : ""}

                      <ModalComponent
                        show={modalShow}
                        title11={"Deleted Successfully"}
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
    </>
  )
}