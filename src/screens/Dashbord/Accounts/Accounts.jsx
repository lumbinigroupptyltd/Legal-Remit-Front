import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import { Modal } from "react-bootstrap";
import { Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import { CommonConstants } from "../../../Constants/common.constants";
import Pagination from "@mui/material/Pagination";
import ModalComponent from "../ModalComponent";
import ModalComponentPopup from "../ModalComponentPopup";
import { useNavigate } from "react-router-dom";
import NoRecord from "../../../Helpers/NoRecord/NoRecord";
import "./Accounts.scss";

export default function Accounts() {
  const [modalShow, setModalShow] = useState(false);
  const [POT, setPOT] = useState([]);
  const [getPOT, setgetPOT] = useState(true);
  const [editPOT, seteditPOT] = useState(false);
  const [Search, SetSearch] = useState("");
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(
    CommonConstants.DefaultPageSize
  );
  const [numItems, SetNumItems] = React.useState(0);
  const [CountPage, SetCountPage] = React.useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const [deleteModel, setDeletemodel] = useState(false);
  const navigate = useNavigate();
  // SOA dropdown State
  const [selectedSOA, setSelectedSOA] = useState("SOA"); // Default value
  const [selectedCurrency, setSelectedCurrency] = useState("NPR"); // Default value for NPR table
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const [submitselectedCurrency, setsubmitselectedCurrency] = useState("NPR");
  const [showExpensesDiv, setShowExpensesDiv] = useState(false);
  const [showReconciliation, setShowReconciliation] = useState(false);
  const [showSummary, setshowSummary] = useState(false);
  const [showDetail, setshowDetail] = useState(false);

  const handleSubmit = () => {
    setIsSubmitClicked(true);
    console.log("1", selectedSOA);
    console.log("2", selectedCurrency);
    setsubmitselectedCurrency(selectedCurrency);

    if (selectedSOA === "Expenses") {
      setsubmitselectedCurrency(false);
      setShowExpensesDiv(true);
      setshowSummary(false);
      setshowDetail(false);
      setShowReconciliation(false);
    } else if (selectedSOA === "Reconciliation") {
      setsubmitselectedCurrency(false);
      setShowExpensesDiv(false);
      setshowSummary(false);
      setshowDetail(false);
      setShowReconciliation(true);
    } else if (selectedSOA === "summary") {
      setShowExpensesDiv(false);
      setshowDetail(false);
      setShowReconciliation(false);
      setsubmitselectedCurrency(false);
      setshowSummary(true);
    } else if (selectedSOA === "detail") {
      setShowExpensesDiv(false);
      setshowDetail(true);
      setShowReconciliation(false);
      setsubmitselectedCurrency(false);
      setshowSummary(false);
    }

    // Perform other actions based on selected values
  };

  const confirmClick = async (id) => {
    setmodalShowPrChange(true);
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const allPOTdata = async (e) => {
    seteditPOT(false);
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getalldeliverytype"
      );
      if (response.data.status === true) {
        setPOT(response.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addDeliveryType = () => {
    navigate("/add-accounts");
  };

  const deletePOT = async () => {
    setmodalShowPrChange(false);
    try {
      const payload = {
        id: id,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/deletedeliverytypebyid",
        payload
      );
      if (response.data.status === true) {
        setDeletemodel(true);
        allPOTdata();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const EditDeliveryMethod = async (id) => {
    navigate("adddeliverytype", id);
  };

  const EditPOT = async (e) => {
    try {
      const payload = {
        id: getPOT.id,
        name: document.getElementById("delivery-method-name").value,
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/updatepurposeoftransfer",
        payload
      );
      if (response.data.status === true) {
        setModalShow(false);
        allPOTdata();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AddPOT = async (e) => {
    seteditPOT(false);
    setModalShow(true);
    try {
      const payload = {
        type: document.getElementById("delivery-method-name").value,
        enabled: true,
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/adddeliverytype",
        payload
      );
      if (response.data.status === true) {
        setModalShow(false);
        allPOTdata();
      }
    } catch (err) {
      console.log(err);
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
  useEffect(
    (e) => {
      allPOTdata(e);
    },
    [Search, Page, RowsPerPage]
  );
  return (
    <>
      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div>
            <div className="container-fluid"      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
              <PageHeader
                HeaderText="Accountings"
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
                        <div className="row g-0">
                          <div className=" filterAccountsMain  justify-content-center m-auto align-items-center mb-3  border-bottom pb-1">
                            <div className="d-flex">
                              <Form>
                                <div className="filterAccountsInner">
                                  <div>
                                    <Form.Select
                                      aria-label="SOA Drp"
                                      className="WFull me-5 pbSt"
                                      value={selectedSOA}
                                      onChange={(e) =>
                                        setSelectedSOA(e.target.value)
                                      }
                                    >
                                      <option value="SOA">SOA</option>
                                      <option value="Expenses">
                                        Expenses Report
                                      </option>
                                      <option value="Reconciliation">
                                        Reconciliation
                                      </option>
                                      <option value="summary">
                                        Payout partner summary view
                                      </option>
                                      <option value="detail">
                                        Payout partner detail view
                                      </option>
                                    </Form.Select>
                                  </div>
                                  <div className="WFull mx-2 pbSt">
                                    {selectedSOA === "SOA" && (
                                      <Form.Select
                                      className="WFull me-5"
                                        aria-label="Currency Drp"
                                        value={selectedCurrency}
                                        onChange={(e) =>
                                          setSelectedCurrency(e.target.value)
                                        }
                                      >
                                        <option value="NPR">NPR</option>
                                        <option value="AUD">AUD</option>
                                        <option value="Moneygram">
                                          Moneygram
                                        </option>
                                      </Form.Select>
                                    )}
                                    {selectedSOA !== "SOA" && (
                                      <Form.Select aria-label="Partner Drp" className="WFull me-5">
                                        <option>Nepal Remit</option>
                                        <option value="1">Esewa</option>
                                        <option value="2">Everest</option>
                                        <option value="3">Everest</option>
                                        <option value="4">GME</option>
                                        <option value="5">IME</option>
                                      </Form.Select>
                                    )}
                                  </div>
                                  <div className="WFull mx-2 pbSt">
                                    <div class="">
                                      <Form.Group className=" input-container required pb-0 ">
                                        <Form.Control
                                          type="date"
                                          required
                                          placeholder="From date"
                                          name="Referal"
                                          className="WFull reflink link  "
                                        />
                                      </Form.Group>
                                    </div>
                                  </div>
                             
                                    <div className="WFull mx-2 pbSt">
                                      <Form.Group className=" input-container required ">
                                        <Form.Control
                                          type="date"
                                          required
                                          placeholder="To date"
                                          name="Referal"
                                          className="WFull reflink link "
                                        />
                                      </Form.Group>
                                    </div>
                           
                                  <div className="d-flex pbSt">
                                    <a
                                      //  href=""
                                      className="btn btn-default purpleBackground text-white bolder  h-100"
                                      onClick={handleSubmit}
                                    >
                                      {/* <i className="text-white fa fa-plus bolder"></i>{" "} */}
                                      Submit
                                    </a>
                         
                                  </div>
                                  {/* <Col>  
                                    <div className="WFull mx-2 pbSt">
                                      <button className="m-0 pbSt btn btn-default mt-1 rounded-5 py-2 purpleBackground text-white">
                                        <i className="fa-solid fa fa-download text-white "></i>
                                        &nbsp; Download
                                      </button>
                                    </div>
                                  </Col> */}
                                </div>
                              </Form>
                            </div>
                              <div className="addnewFilter pbSt">
                              <a
                                //  href=""
                                className="btn btn-default purpleBackground text-white bolder h-100"
                                onClick={(e) => addDeliveryType()}
                              >
                                <i className="text-white fa fa-plus bolder"></i>{" "}
                                Add New
                              </a>
                            </div>

                        
                          </div>
                        </div>
                        <div className="row"></div>
                        <div style={{ overflowX: "auto" }}>
                          <>
                            {submitselectedCurrency === "NPR" && (
                              <>
                                <table className="table m-b-0">
                                  <thead>
                                    <tr>
                                      <th className="normal customTh py-4 px-2">
                                        Date
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Payout Partner
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Particulars
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Opening balance
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Debit
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Credit
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Commission
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Settlement Amt
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Balance
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* Insert your data rows here */}
                                    <tr>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                  </tbody>
                                </table>
                              </>
                            )}
                            {submitselectedCurrency === "AUD" && (
                              <>
                                <table className="table m-b-0">
                                  <thead>
                                    <tr>
                                      <th className="normal customTh py-4 px-2">
                                        Day
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Month
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Year
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Particulars
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Debit
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Credit
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Opening Balance
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        ANZ Main Balance
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Rate
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Amount
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Currency
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Partner
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* Insert your data rows here */}
                                    <tr>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                  </tbody>
                                </table>

                                <div class="mt-4 col-lg-6 px-0">
                                  <table className="border table m-b-0">
                                    <thead>
                                      <tr colspan="2">
                                        <th
                                          colspan="2"
                                          className="normal customTh py-4 px-2"
                                        >
                                          Summary Points
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {/* Insert your data rows here */}
                                      <tr>
                                        <td>Opening Balance</td>
                                        <td>212</td>
                                      </tr>

                                      <tr>
                                        <td>Total Debit</td>
                                        <td>232</td>
                                      </tr>

                                      <tr>
                                        <td>Total Credit</td>
                                        <td>378</td>
                                      </tr>

                                      <tr>
                                        <td>Total Cancelled</td>
                                        <td>289</td>
                                      </tr>
                                      <tr>
                                        <td>Total Expenses</td>
                                        <td>2892</td>
                                      </tr>

                                      <tr>
                                        <td>Total Fund transferred</td>
                                        <td>2892</td>
                                      </tr>
                                      <tr>
                                        <td>Payable amount to Partner 1</td>
                                        <td>Deal taken but </td>
                                      </tr>
                                      <tr>
                                        <td>Payable amount to Partner</td>
                                        <td>-</td>
                                      </tr>
                                      <tr colspan="2"></tr>

                                      <tr>
                                        <td>Closing Balance</td>
                                        <td>2378</td>
                                      </tr>

                                      <tr colspan="2"></tr>
                                      {/* Add more rows as needed */}
                                    </tbody>
                                  </table>
                                </div>
                              </>
                            )}
                            {submitselectedCurrency === "Moneygram" && (
                              <>
                                <table className="table m-b-0">
                                  <thead>
                                    <tr>
                                      <th className="normal customTh py-4 px-2">
                                        Date
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Particulars
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Debit
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Credit
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Service Fees
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Comission
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Settlement AMT
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Balance
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        TXN No (from MoneyGram)
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Paid Currency
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Send AMT
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Paid AMT
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        FX margin
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Revenue
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* Insert your data rows here */}
                                    <tr>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                  </tbody>
                                </table>
                              </>
                            )}
                            {showExpensesDiv && (
                              <table className="table m-b-0">
                                <thead>
                                  <tr>
                                    <th className="normal customTh py-4 px-2">
                                      Date
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Particular
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Expense in AUD
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Expenses in NPR
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Transaction Reference
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Remarks
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* Insert your data rows here */}
                                  <tr>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                  </tr>
                                  {/* Add more rows as needed */}
                                </tbody>
                              </table>
                            )}
                            {showReconciliation && (
                              <table className="table m-b-0">
                                <thead>
                                  <tr>
                                    <th className="normal customTh py-4 px-2">
                                      Paid Date LR
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Paid Date Partner
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Control No LR
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Control No Partner
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Status in LR
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Status in Partner
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Amount LR
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Amount Partner
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Difference between amount
                                    </th>
                                    <th className="normal customTh py-4 px-2">
                                      Reconcile
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* Insert your data rows here */}
                                  <tr>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                  </tr>
                                  {/* Add more rows as needed */}
                                </tbody>
                              </table>
                            )}
                            {showSummary && (
                              <>
                                <div className="filter-row mb-2 ">
                                  Show Entries &nbsp; &nbsp;
                                  <div className="d-flex align-items-center pbSt">
                                    <Form.Select
                                      name="tbl_meeting_length"
                                      aria-controls="tbl_meeting"
                                      className="form-control-sm py-2 h-auto w-auto px-5 ps-4  ps-3 mt-1"
                                    >
                                      <option value="1">1</option>
                                      <option value="1">2</option>
                                      <option value="1">3</option>
                                    </Form.Select>
                                  </div>
                                </div>
                                <table className="table m-b-0">
                                  <thead>
                                    <tr>
                                      <th className="normal customTh py-4 px-2">
                                        Date
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Description
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Total No of Transaction
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Deal Amount
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Deal Rate
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Debit
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Credit
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Comm
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Settlement Amt
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Balance (NPR)
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* Insert your data rows here */}
                                    <tr>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                  </tbody>
                                </table>
                                <div className="d-flex justify-content-end">
                                  <Pagination count={4} />
                                </div>

                                <div class="mt-4 col-lg-6 px-0">
                                  <table className="border table m-b-0">
                                    <thead>
                                      <tr colspan="2">
                                        <th
                                          colspan="2"
                                          className="normal customTh py-4 px-2"
                                        >
                                          Summary Points
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {/* Insert your data rows here */}
                                      <tr>
                                        <td>Opening Balance</td>
                                        <td>(+) 6,416,234.50 NPR </td>
                                      </tr>

                                      <tr>
                                        <td>Total Debit</td>
                                        <td>(+) 116,074,218.00 NPR</td>
                                      </tr>

                                      <tr>
                                        <td>Total Credit</td>
                                        <td>(-) 110,074,582.00 NPR</td>
                                      </tr>

                                      <tr>
                                        <td>Total Commission</td>
                                        <td>(+) 129811.00 NPR</td>
                                      </tr>
                                      <tr>
                                        <td>Closing Balance</td>
                                        <td className="bolder">
                                          {" "}
                                          (+) 12,415,870.50 NPR
                                        </td>
                                      </tr>

                                      <tr colspan="2" className="py-2">
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td>Total No of Transaction </td>
                                        <td>3232 </td>
                                      </tr>

                                      {/* Add more rows as needed */}
                                    </tbody>
                                  </table>
                                </div>
                              </>
                            )}
                            {showDetail && (
                              <>
                                <div className="filter-row mb-2 ">
                                  Show Entries &nbsp; &nbsp;
                                  <div className="d-flex align-items-center pbSt">
                                    <Form.Select
                                      name="tbl_meeting_length"
                                      aria-controls="tbl_meeting"
                                      className="form-control-sm py-2 h-auto w-auto px-5 ps-4  ps-3 mt-1"
                                    >
                                      <option value="1">1</option>
                                      <option value="1">2</option>
                                      <option value="1">3</option>
                                    </Form.Select>
                                  </div>
                                </div>
                                <table className="table m-b-0">
                                  <thead>
                                    <tr>
                                      <th className="normal customTh py-4 px-2">
                                        TRAN DATE
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        CONTROL NO
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        PARTICULAR
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        DEAL AMOUNT
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        RATE
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        DR AMT
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        CR AMT
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        COMMISSION
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        Settlement Amt
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        BALANCE
                                      </th>
                                      <th className="normal customTh py-4 px-2">
                                        ADMIN
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* Insert your data rows here */}
                                    <tr>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                      <td>...</td>
                                    </tr>
                                    {/* Add more rows as needed */}
                                  </tbody>
                                </table>

                                <div className="d-flex justify-content-end">
                                  <Pagination count={4} />
                                </div>
                              </>
                            )}
                          </>
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
      <Modal
        className="rounded"
        show={modalShow}
        onHide={(e) => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="d-flex px-5  flex-column py-4 d-flex">
          {editPOT == false ? (
            <h1 className="purpleText px-3">Add Delivery Method Name</h1>
          ) : (
            <h1 className="purpleText px-3">Update Delivery Method Name</h1>
          )}
        </div>
        <div className="d-flex px-5 flex-column py-4">
          <Form.Group as={Col} className="left-inner-addon  input-container">
            <i className="purpleText main fa fa-pen "></i>
            <Form.Control
              type="text"
              placeholder="Delivery Method Name"
              className="form-input formControlStep2"
              id="delivery-method-name"
              defaultValue={editPOT == false ? "" : getPOT.name}
              // onChange={changeMobileNumber}
            />
          </Form.Group>
        </div>
        {/* <Modal.Body>
        <p className='text-center'>
        </p>
      </Modal.Body> */}
        <div className="row d-flex px-5 mx-1">
          <div className="col col-lg-4">
            {editPOT == false ? (
              <button
                className="success-btn purpleBackground border-0 rounded text-light"
                onClick={(e) => AddPOT(e)}
              >
                Add
              </button>
            ) : (
              <button
                className="success-btn purpleBackground border-0 rounded text-light"
                onClick={(e) => EditPOT(e)}
              >
                Update
              </button>
            )}
          </div>
          <div className="col col-lg-4">
            <button
              className="success-btn purpleBorder purpleText rounded"
              onClick={(e) => setModalShow(false)}
            >
              Cancel
            </button>
          </div>
        </div>
        <br />
      </Modal>
      <ModalComponent
        show={deleteModel}
        title11={"Deleted successfully"}
        onHide={() => setDeletemodel(false)}
      />
      <ModalComponentPopup
        show={modalShowPrChange}
        title1={"Are you sure want to delete this record ?"}
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={() => deletePOT()}
      />
    </>
  );
}
