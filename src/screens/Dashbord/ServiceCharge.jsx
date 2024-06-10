import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import Axios from "axios";
import ModalComponent from "./ModalComponent";
import Pagination from "@mui/material/Pagination";
import ImportCSV from "../Helpers/CSVFile/ImportCSV";
import ModalComponentPopup from "./ModalComponentPopup";
import moment from "moment";
import Form from 'react-bootstrap/Form';
import NoRecord from "../../Helpers/NoRecord/NoRecord";
export default function ServiceCharge() {
  const navigate = useNavigate();
  const redirectCreateServiceCharge = () => {
    window.scrollTo(0, 0);
    navigate({ pathname: "/create-service-charge", state: true });
  };

  const [allServiceCharge, setallServiceCharge] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [CSVmodalShow, setCSVModalShow] = useState(false);
  const [deliveryMethodCharges, setdeliveryMethodCharges] = useState([]);
  const [paymentMethodCharges, setpaymentMethodCharges] = useState([]);
  const [CountPage, SetCountPage] = React.useState(0);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(
    CommonConstants.DefaultPageSize
  );
  const [Search, SetSearch] = React.useState("");
  const [loadervalue, setloadervalue] = useState(false);
  const [numItems, SetNumItems] = React.useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const [paymentMethod, setpaymentMethod] = useState([]);

  useEffect(() => {
    allServiceCharges();
  }, [Page, RowsPerPage, Search]);

  const confirmClick = async (id) => {
    setmodalShowPrChange(true);
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const allServiceCharges = async () => {
    setloadervalue(true);
    Search === "" ? setloadervalue(true) : setloadervalue(false);
    const payload = {
      pageindex: Page,
      pagesize: RowsPerPage,
      searchdata: Search === "" ? "%%" : Search,
      sortparam: "create_at",
      sortorder: "DESC",
    };
    const AccountCategoriesList = Axios({
      url: CommonConstants.BASE_URL + "/getallservicecharges",
      method: "POST",
      data: payload,
    });
    AccountCategoriesList.then((Result) => {
      setallServiceCharge(Result.data?.data);
      SetCountPage(Result.data?.totalPageCount);
      SetNumItems(Result.data.recordCount);
    });
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
      // document.getElementById("hideloding").style.display = "block";
    }
    // console.log('newpage', NewPage);
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
    // console.log('serach', SearchedVal);
  };

  // console.log("data",allServiceCharge)
  // console.log("del",deliveryMethodCharges)

  const handleEditClick = (id) => {
    navigate({
      pathname: "/create-service-charge",
      state: id,
    });
  };

  const handleDeleteClick = async () => {
    setmodalShowPrChange(false);
    await axios
      .post(`${CommonConstants.BASE_URL}/deleteservicechargebyid`, {
        id: id,
      })
      .then((res) => {
        // console.log(res,"res")
        allServiceCharges();
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  // console.log("deliveryMethodCharges",deliveryMethodCharges)
  // console.log("paymentMethodCharges",paymentMethodCharges)
  // console.log("allServiceCharge",allServiceCharge)

  return (
    <>
      <div>{paymentMethod}</div>
      <div      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
        <ImportCSV />
        <div className="container-fluid">
          <PageHeader
            HeaderText="Service Charge"
            Breadcrumb={[
              { name: "Service Charge", navigate: "" },
              { name: "Service Charge", navigate: "" },
            ]}
          />
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12">
              <div className="card">
                <div className="body project_report">
                  <div className="table-responsive">

                    {/* <hr className="pt-0 mt-0"></hr> */}
                    <div className="row"></div>
                    <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                      {
                        allServiceCharge &&
                        allServiceCharge?.length > 0 &&
                        <div className="filter-row pb-2 ">
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
                        </div>
                      }

                      <div className="d-flex pbSt align-items-center respoChildFooter">

                        <div className="form-group d-flex align-items-center mb-0">
                          <label className="font-weight-normal mb-0">
                            Search:{" "}
                          </label>{" "}
                          &nbsp;&nbsp;
                          <input
                            type="search"
                            id="search"
                            className="form-control p-0 px-3"
                            onKeyPress={RequestSearch}
                            placeholder=""
                            onChange={(e) => SetSearch(e.target.value)}
                          />
                        </div> &nbsp;&nbsp;
                        {
                          // allServiceCharge &&
                          // allServiceCharge?.length > 0 &&
                          <div className="">
                            <a
                              className="purpleBackground btn btn-default text-white bolder"
                              onClick={() => {
                                setCSVModalShow(true);
                              }}
                            >
                              <i className="text-white fa fa-plus bolder"></i>{" "}
                              Import CSV
                            </a>
                            &nbsp;&nbsp;
                            <a
                              className="purpleBackground btn btn-default text-white bolder"
                              onClick={() => {
                                redirectCreateServiceCharge();
                              }}
                            >
                              <i className="text-white fa fa-plus bolder"></i> Add
                              New
                            </a>
                          </div>
                        }

                      </div>
                    </div>
                    <div style={{ overflowX: "auto" }}>
                      <table className="table m-b-0 ">
                        <thead className="thead-light">
                          <tr>
                            <th>From Currency Code</th>
                            <th>To Currency Code</th>
                            <th>Service Charge</th>
                            <th>Transaction Limits</th>
                            <th>Delivery Method Charges</th>
                            <th>Payment Method Charges</th>
                            <th>Valid From</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allServiceCharge &&
                          allServiceCharge?.length > 0 ? allServiceCharge?.map((value) => (
                            <tr key={value?.id}>
                              <td>{value?.fromCurrencyCode}</td>
                              <td className="project-title">
                                <h6>
                                  <a>{value?.toCurrencyCode}</a>
                                </h6>
                              </td>
                              <td>{value?.serviceCharge}</td>
                              <td>

                                <div className="d-flex">
                                  <strong>Min: </strong>{" "}
                                  {value?.minimumTransaction}
                                </div>

                                <div className="d-flex">
                                  <strong>Max: </strong>{" "}
                                  {value?.maximumTransaction}
                                </div>
                              </td>
                              <td>
                                {value?.deliveryMethodCharges.map((v) => (
                                  <ul key={v.type} className="ps-0">
                                    <li>{v.type}</li>
                                    {v.range.map((r) => (
                                      <li key={r.lower}>
                                        <strong>Lower:</strong> {r.lower},{" "}
                                        <strong>Upper:</strong> {r.upper},{" "}
                                        <strong>Charge:</strong> {r.charge} {r.type == "percentage" ? "%" : ""}
                                      </li>
                                    ))}
                                  </ul>
                                ))}
                              </td>
                              <td>
                                {value?.paymentMethodCharges?.map((v) => (
                                  <ul key={v.type} className="ps-0">
                                    <li>{v.type}</li>
                                    {v.range.map((r) => (
                                      <li key={r.lower}>
                                        <strong>Lower:</strong> {r.lower},{" "}
                                        <strong>Upper:</strong> {r.upper},{" "}
                                        {v.type == "Debit Card" || v.type == "Credit Card" ?
                                          (
                                            <>
                                              <strong>FixFees:</strong> {r.fixfees},{" "}
                                              <strong>OurFees:</strong> {r.ourfees},{" "}
                                            </>
                                          )
                                          :""
                                        }
                                        <strong>Charge:</strong> {r.charge} {r.type == "percentage" ? "%" : ""}
                                      </li>
                                    ))}
                                  </ul>
                                ))}
                              </td>
                              <td>
                                {moment(value?.validFrom).format("YYYY-MM-DD")}
                              </td>
                              <td className="project-actions">
                                <a
                                  onClick={() => handleEditClick(value?.id)}
                                  className="btn btn-outline-secondary mr-1"
                                >
                                  <i className="fa fa-edit" title="Edit"></i>
                                </a>
                                <a
                                  onClick={() => confirmClick(value?.id)}
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
                          )) : <NoRecord />}
                        </tbody>
                      </table>
                    </div>
                    <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                      <div className="filter-row pt-2">
                        Showing {(Page - 1) * RowsPerPage + 1} to{" "}
                        {Page * RowsPerPage > numItems
                          ? numItems
                          : Page * RowsPerPage}{" "}
                        of {numItems} entries
                      </div>
                      <Pagination
                        count={CountPage}
                        page={Page}
                        onChange={HandleChangePage}
                      />
                    </div>
                    {/* <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" /> */}
                    <ModalComponent
                      show={modalShow}
                      title11={"Service Charge deleted successfully"}
                      onHide={() => setModalShow(false)}
                      size="md"
                    />

                    <ImportCSV
                      show={CSVmodalShow}
                      title={"Service Charge deleted successfully"}
                      cancle={() => setCSVModalShow(false)}
                      size="md"
                    />
                    <ModalComponentPopup
                      show={modalShowPrChange}
                      title1={"Are you sure want to delete this record  ?"}
                      cancle={(e) => handlePrchangePopupCancle(e)}
                      SavePr={() => handleDeleteClick()}
                      size="md"
                    />
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
