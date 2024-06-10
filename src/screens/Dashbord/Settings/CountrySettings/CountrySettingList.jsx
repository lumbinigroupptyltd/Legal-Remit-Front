import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

import PageHeader from "../../../../components/PageHeader";
import { CommonConstants } from "../../../../Constants/common.constants";
import ModalComponent from "../../ModalComponent";
import ModalComponentPopup from "../../ModalComponentPopup";
import Form from 'react-bootstrap/Form';
function CountrySettingList() {
  const [allPaymentMethods, setAllPaymentMethods] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [CountPage, SetCountPage] = React.useState(0);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(
    CommonConstants.DefaultPageSize
  );
  const [Search, SetSearch] = React.useState("");
  const [numItems, SetNumItems] = React.useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  const redirectCountrySetting = () => {
    navigate("/country-settings");
  };

  const redirectUpdateCountrySetting = (item) => {
    navigate("/country-settings", item);
  };
  const confirmClick = async (id) => {
    setmodalShowPrChange(true);
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  // delete data by id start

  const handleDelete = async () => {
    setmodalShowPrChange(false);
    await axios
      .post(`${CommonConstants.BASE_URL}/deletecountrysettingbyid`, {
        id: id,
      })
      .then((res) => {
        setModalShow(true);
        getAllCountrySettingList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // delete data by id ends

  const getAllCountrySettingList = async () => {
    var InputParameter = {
      pageindex: Page,
      pagesize: RowsPerPage,
      searchdata: Search,
      sortparam: "create_at",
      sortorder: "DESC",
    };

    await axios
      .post(CommonConstants.BASE_URL + "/getallcountrysettings", InputParameter)
      .then((res) => {
        setAllPaymentMethods(res.data.data);
        SetCountPage(res.data.totalPageCount);
        SetNumItems(res.data.recordCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(Page);
    } else {
      SetPage(NewPage);
    }
  };

  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
    // document.getElementById("hideloding").style.display = "block";
  };

  const RequestSearch = (Event) => {
    if (Event.key === "Enter") {
      var SearchedVal = document.getElementById("search").value;
      SetSearch(SearchedVal);
      SetPage(1);
    }
  };

  const handleSearch = (e) => {
    SetSearch(e.target.value);
    SetPage(1);
  };
  useEffect(() => {
    getAllCountrySettingList();
  }, [Page, Search, RowsPerPage]);
  return (
    <div
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div>
          <div className="container-fluid">
            <PageHeader
              HeaderText="Country Settings"
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
                      <div className="row"></div>
                      <div className="d-flex justify-content-between align-items-center respoChildFooter">
                        {allPaymentMethods && allPaymentMethods.length > 0 && <div className="filter-row pb-2 pbSt">
                          Show Entries &nbsp; &nbsp;
                          <div className="d-flex align-items-center ">
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

                        {allPaymentMethods && allPaymentMethods.length >= 0 && <div className="d-flex pbSt align-items-center respoChildFooter">
                          <a
                            //  href=""
                            className="btn btn-default purpleBackground text-white bolder pbDowSt"
                            onClick={() => {
                              redirectCountrySetting();
                            }}
                          >
                            <i className="text-white fa fa-plus bolder"></i> Add
                            New
                          </a>
                        </div>}
                      </div>
                      <div style={{ overflowX: "auto" }}>
                        <table className="table m-b-0 ">
                          <thead className="thead-light">
                            <tr>
                              <th>From Country</th>
                              <th>To Country</th>
                              <th>Created At</th>
                              <th>Actions</th>
                            </tr>
                          </thead>

                          {allPaymentMethods && allPaymentMethods.length > 0 ? allPaymentMethods.map((item, index) => {
                            return (
                              <tbody key={index}>
                                <tr>
                                  <td>{item?.senderCountryName}</td>
                                  <td>{item?.recieverCountryNames.join(", ")}</td>
                                  <td>
                                    {moment(item?.createdAt).format("DD/MM/YYYY")}
                                  </td>

                                  <td className="project-actions">
                                    <a
                                      className="btn btn-outline-secondary mr-1"
                                      onClick={() => {
                                        redirectUpdateCountrySetting(item.id);
                                      }}
                                    >
                                      <i className="fa fa-edit " title="Edit"></i>
                                    </a>{" "}
                                    &nbsp;
                                    <a
                                      onClick={() => {
                                        confirmClick(item?.id);
                                        // setModalShow(true)
                                      }}
                                      className="btn btn-outline-secondary"
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
                            );
                          }) : <td colSpan={7}><p className="text-center">Data Not Found</p></td>}
                        </table>
                      </div>
                      {allPaymentMethods && allPaymentMethods.length > 0 && <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                        <div className="filter-row pt-2 pbSt">
                          {numItems > 0
                            ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${Page * RowsPerPage > numItems
                              ? numItems
                              : Page * RowsPerPage
                            } of ${numItems} entries`
                            : "No records Available"}
                        </div>
                        <Pagination
                          className=""
                          count={Number(CountPage)}
                          page={Page}
                          onChange={HandleChangePage}
                          color="secondary"
                          shape="rounded"
                        />
                      </div>}
                      <ModalComponent
                        show={modalShow}
                        title11={"Deleted Successfully"}
                        onHide={() => setModalShow(false)}
                      />
                      <ModalComponentPopup
                        show={modalShowPrChange}
                        title1={"Are you sure want to delete this record  ?"}
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
  );
}

export default CountrySettingList;
