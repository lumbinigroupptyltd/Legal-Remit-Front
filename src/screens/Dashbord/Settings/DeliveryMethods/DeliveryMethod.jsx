import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";

import PageHeader from "../../../../components/PageHeader";
import ModalComponent from "../../ModalComponent";
import ModalComponentPopup from '../../ModalComponentPopup'
import { CommonConstants } from "../../../../Constants/common.constants";
import Loader from "../../../Loader/Loader";
import Form from 'react-bootstrap/Form';
import NoRecordWithAddBtn from "../../../../Helpers/NoRecord/NoRecordWithAddBtn";
import NoRecord from "../../../../Helpers/NoRecord/NoRecord";
function DeliveryMethod() {
  const [loadervalue, setloadervalue] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [elements, setElements] = useState([]);
  const [elements2, setElements2] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [CountPage, SetCountPage] = React.useState(0);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [Search, SetSearch] = React.useState("");
  const [numItems, SetNumItems] = React.useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const [showSearch, setShowSearch] = useState(false);

  const confirmClick = async (id) => {
    setmodalShowPrChange(true)
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const getData = async () => {
    setloadervalue(true);
    try {
      var InputParameter = {
        pageindex: Page,
        pagesize: RowsPerPage,
        searchdata: Search === "" ? "%%" : Search,
        sortparam: "create_at",
        sortorder: "DESC",
      };
      const responseData = await axios.post(
        CommonConstants.BASE_URL + "/getalldeliverymethods",
        InputParameter
      );
      setElements(responseData.data.data);
      SetCountPage(responseData.data.totalPageCount);
      SetNumItems(responseData.data.recordCount);
      setShowSearch(responseData.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      setloadervalue(false);
    } catch (error) {
      console.log(error);
      setloadervalue(false);
    }
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
      SetSearch("%" + SearchedVal + "%");
      SetPage(1);
    }
  };
  useEffect(() => {
    getData();
  }, [Page, Search, RowsPerPage]);
  const handleDelete = async () => {
    setmodalShowPrChange(false);
    await axios
      .post(`${CommonConstants.BASE_URL}/deletedeliverymethodbyid`, {
        id: id,
      })
      .then((res) => {
        setModalShow(true);
        getData();
        setloadervalue(false);
      })
      .catch((err) => {
        console.log(err);
        setloadervalue(false);
      });
  };
  const redirectUpdateDeliveryMethods = (item) => {
    navigate("/deliveryMethodCreate", item);
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    SetPage(1);
    setShowSearch(elements.length > 0 || searchTerm.trim() !== '');
  }
  return (
    <>
      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div className="container-fluid">
            {loadervalue == true ? <Loader /> : ""}
            <PageHeader
              HeaderText="Delivery Methods"
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
                      <div className="row d-flex g-0">
                        <div className=" d-flex justify-content-end">
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center respoChildFooter">
                        {elements && elements.length > 0 && <div className="filter-row pb-2 pbSt">
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
                        <div className="d-flex align-items-center respoChildFooter pbSt">
                          {showSearch && <div className="form-group d-flex align-items-center mb-0 ">
                            <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                            <input
                              type="search"
                              id="search"
                              className="form-control p-0 px-3"
                              placeholder=""
                              onKeyPress={RequestSearch}
                              onChange={handleSearch}
                            />
                          </div>} &nbsp;&nbsp;
                          <a
                            className="btn btn-default purpleBackground text-white bolder"
                            onClick={e => navigate('/deliveryMethodCreate')}
                          >
                            <i className="text-white fa fa-plus bolder"></i> Add
                            New
                          </a>
                        </div>
                      </div>
                      {
                        elements && elements.length > 0 ?
                          (<div style={{ overflowX: "auto" }}>
                            <table className="table m-b-0 ">
                              <thead className="thead-light">
                                <tr>
                                  <th>Usage</th>
                                  <th>Type</th>
                                  <th>Default Payout <br></br> Partner Bank</th>
                                  <th>Name</th>
                                  <th>Country</th>
                                  <th>Enable</th>
                                  {/* <th>Commission</th> */}
                                  <th>Swift Code</th>
                                  {/* <th>Sunrise ID</th> */}
                                  {/* <th>Nic ID</th> */}
                                  {/* <th>Citizens ID</th> */}
                                  <th>Everest ID</th>
                                  {/* <th>NMB ID</th> */}
                                  <th>Global ID</th>
                                  <th>GME ID</th>
                                  <th>eSewa ID</th>
                                  {/* <th>iPay ID</th> */}
                                  {/* <th>Prabhu ID</th> */}
                                  <th>IME ID</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              {elements.map((item) => {
                                return (
                                  <tbody>
                                    <tr key={item.id}>
                                      <td>{item.userTrnsDeliveryCount}</td>
                                      <td>{item.deliveryTypeName}</td>
                                      <td>{item.partnerBankName}</td>
                                      <td>{!!(item?.text) ? item.text : "NA"}</td>
                                      <td>{!!(item?.countryName) ? item.countryName : "NA"}</td>
                                      <td>{item.enabled == true ? "True" : "False"}</td>
                                      {/* <td>{!!(item?.charge) ? `${item.charge}%` : "0%"}</td> */}
                                      <td>{!!(item?.bankSwiftCode) ? item.bankSwiftCode : "NA"}</td>
                                      {/* <td>{!!(item?.locationId) ? item.locationId : "NA"}</td> */}
                                      {/* <td>{!!(item?.locationIdNic) ? item.locationIdNic : "NA"}</td> */}
                                      {/* <td>{!!(item?.locationIdCit) ? item.locationIdCit : "NA"}</td> */}
                                      <td>{!!(item?.locationIdEve) ? item.locationIdEve : "NA"}</td>
                                      {/* <td>{!!(item?.locationIdNmb) ? item.locationIdNmb : "NA"}</td> */}
                                      <td>{!!(item?.locationIdGlo) ? item.locationIdGlo : "NA"}</td>
                                      <td>{!!(item?.locationIdGme) ? item.locationIdGme : "NA"}</td>
                                      <td>{!!(item?.locationIdEsewa) ? item.locationIdEsewa : "NA"}</td>
                                      {/* <td>{!!(item?.locationIdIpay) ? item.locationIdIpay : "NA"}</td> */}
                                      {/* <td>{!!(item?.locationIdPrabhu) ? item.locationIdPrabhu : "NA"}</td> */}
                                      <td>{!!(item?.locationIdIme) ? item.locationIdIme : "NA"}</td>
                                      <td>
                                        <a
                                          className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                          onClick={() => {
                                            redirectUpdateDeliveryMethods(item.id);
                                          }}
                                        >
                                          <i className="fa fa-edit " title="Edit"></i>
                                        </a>{" "}
                                        &nbsp;
                                        <a
                                          onClick={() => {
                                            confirmClick(item.id)
                                          }}
                                          className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black"
                                        >
                                          <i className="fa fa-trash" style={{ color: "red" }} title="Delete"></i>
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                );
                              })}
                            </table>
                          </div>)
                          : Search === '' ? (<NoRecord />) : (<NoRecordWithAddBtn />)}

                      {elements && elements.length > 0 && <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                        <div className="filter-row pt-2">
                          {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                        </div>
                        <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                      </div>}
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
  );
}

export default DeliveryMethod;
