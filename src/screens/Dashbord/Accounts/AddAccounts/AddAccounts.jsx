import React, { useEffect, useState } from "react";
import {
  Container,
  Image,
  Form,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import ModalComponent from "../../ModalComponent";
import axios from "axios";
import {
  CommonConstants,
  Option,
} from "../../../../Constants/common.constants";
import { useNavigate} from "react-router-dom";
import Loader from "../../../Loader/Loader";
// const validator = require("../../../../assets/js/validator");

export default function AddAccounts(props) {
  const navigate = useNavigate();
  const [Category, setCategory] = useState();
  const [days, setDays] = useState();
  const [lowRiskAmount, setLowRiskAmount] = useState();
  const [mediumRiskAmount, setMediumRiskAmount] = useState();
  const [highRiskAmount, sethighRiskAmount] = useState();
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [isEmpty, setIsempty] = useState(false);
  const [id, setId] = useState(props.location.state);
  const [categoryOfRisk, setCategoryOfRisk] = useState("1");
  const [durationLabel, setDurationLabel] = useState("Amount");
  const [dealDate, setDealDate] = useState("");
  const [RowsPerPage, setRowsPerPage] = useState(CommonConstants.DefaultPageSize);
  const [Search, SetSearch] = useState("");
  const [page, setPage] = useState(1);
  const [partnerData, setPartnerData] = useState([]);
  const [country, setCountry] = useState([]);
  const [dealAmount, setDealAmount] = useState("");
  const [dealRate, setDealRate] = useState(0);
  const [partnerBank, setPartnerBank] = useState(0);
  const [dealCurremcy, setDealCurremcy] = useState(0);
  const [error, setError] = useState(false);
  const [particulars, setParticulars] = useState("");

  const [expenseDate, setExpenseDate] = useState("");
  const [expenseCurrency, setExpenseCurrency] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [transactionReference, setTransactionReference] = useState("");
  const [remarks, setRemarks] = useState("");
  const [particulars1, setParticulars1] = useState("");

  const [fromDate2, setFromDate2] = useState("");
  const [toDate2, setToDate2] = useState("");
  const [settlementCurrency, setSettlementCurrency] = useState("");
  const [SettlementAmount, setSettlementAmount] = useState("");
  const [particulars2, setParticulars2] = useState("");
  const [loadervalue, setloadervalue] = useState(false);

  const currentDate = new Date().toISOString().split("T")[0];
  const handleCategoryChange = (e) => {
    setCategoryOfRisk(e.target.value);
    if (e.target.value == 3) {
      setDays(365);
    }
    // Set the duration label based on the selected category
    switch (e.target.value) {
      case "1":
        setDurationLabel("Amount");
        break;
      case "2":
        setDurationLabel("Transaction");
        break;
      case "3":
        setDurationLabel("Number Of Active Recipients");
        break;
      default:
        setDurationLabel("");
        break;
    }
  };
  const saveAccountsData = async () => {
    try {
      if (categoryOfRisk === "1") {
        if (!partnerBank || !dealDate || !dealCurremcy || !dealRate || !dealAmount || !particulars) {
          setError(true);
          return 0;
        } else {
          const isSelectedData = {
            type: "Deal",
            payoutPartnerId: parseInt(partnerBank),
            rate: parseFloat(dealRate),
            currency: dealCurremcy,
            dealDate: dealDate,
            settlementDateFrom: fromDate2,
            settlementDateTo: toDate2,
            amount: parseInt(dealAmount),
            reference: transactionReference,
            remarks: remarks,
            particulars: particulars
          };
          const sendData = await axios.post(CommonConstants.NEW_BASE_URL3 + '/savedealaccountdetails', isSelectedData);
          if (sendData.data.status == true) {
            navigate("/accounts");
          }
        }
      }
      if (categoryOfRisk === "2") {
        if (!expenseDate || !expenseCurrency || !expenseAmount || !transactionReference || !remarks || !particulars1) {
          setError(true);
        } else {
          const isSelectedData = {
            type: "Expenses",
            payoutPartnerId: parseInt(partnerBank),
            rate: parseFloat(dealRate),
            currency: expenseCurrency,
            dealDate: dealDate,
            settlementDateFrom: fromDate2,
            settlementDateTo: toDate2,
            amount: parseInt(expenseAmount),
            reference: transactionReference,
            remarks: remarks,
            particulars: particulars1
          };
          const sendData = await axios.post(CommonConstants.NEW_BASE_URL3 + '/savedealaccountdetails', isSelectedData);
          if (sendData.data.status == true) {
            navigate("/accounts");
          }
        }
      }
      if (categoryOfRisk === "3") {
        if (!fromDate2 || !toDate2 || !settlementCurrency || !SettlementAmount || !particulars2) {
          setError(true);
        } else {
          const isSelectedData = {
            type: "Settlement Commission",
            payoutPartnerId: parseInt(partnerBank),
            rate: parseFloat(dealRate),
            currency: settlementCurrency,
            dealDate: dealDate,
            settlementDateFrom: fromDate2,
            settlementDateTo: toDate2,
            amount: 0,
            reference: "",
            remarks: remarks,
            particulars: particulars2
          };
          const sendData = await axios.post(CommonConstants.NEW_BASE_URL3 + '/savedealaccountdetails', isSelectedData);
          if (sendData.data.status == true) {
            navigate("/accounts");
          }
        }

      }
    } catch (error) {
      console.log(error);
    }
  };
  const getRiskSetting = () => {
    axios
      .post(CommonConstants.BASE_URL + "/getrisksettingsbyid", { id: id })
      .then((res) => {
        setDays(res.data.data?.days);
        setLowRiskAmount(res.data.data.lowRisk);
        setMediumRiskAmount(res.data.data.mediumRisk);
        sethighRiskAmount(res.data.data.highRisk);
        setCategoryOfRisk(res.data.data.categoryId);
        if (res.data.data.categoryId == 1) {
          setDurationLabel("Amount");
        } else if (res.data.data.categoryId == 2) {
          setDurationLabel("Transaction");
        } else {
          setDurationLabel("Number Of Active Recipients");
        }
      })
      .catch((error) => console.log(error));
  };
  const updateRiskSetting = () => {
    const isSelectedData = {
      id: id,
      categoryId: categoryOfRisk,
      days: days,
      lowRisk: lowRiskAmount,
      mediumRisk: mediumRiskAmount,
      highRisk: highRiskAmount,
    };

    axios
      .post(
        CommonConstants.BASE_URL + "/saveupdaterisksettings",
        isSelectedData
      )
      .then(async (responce) => {
        // setModalShowAdd(true);
        if (responce.data.status == true) {
          navigate("/risk-management");
        }
      })
      .catch((error) => console.log(error));
  };
  const handleCancel = () => {
    navigate("/accounts");
  };
  const getAllPartner = async () => {
    const requsetData = {
      "pageindex": page,
      "pagesize": RowsPerPage,
      "searchdata": Search,
      "sortparam": "created_at",
      "sortorder": "DESC"
    }
    const getData = await axios.post(CommonConstants.BASE_URL + '/getallpartnerbanks', requsetData);
    if (getData.data.status == true) {
      setPartnerData(getData.data.data);
    }
  };
  const GetAllCountrys = async () => {
    try {
      const response = await axios.get(CommonConstants.BASE_URL + "/getallcountries");
      if (response.data.status === true) {
        setCountry(response.data.data)
      }
    }
    catch (err) {
      // console.log(err)
    }
  };
  const handleDealAmountChange = (event) => {
    const inputValue = event.target.value;
    // Use a regular expression to check if the input is a valid number
    if (/^[0-9]*$/.test(inputValue)) {
      setDealAmount(inputValue); // Update the state if it's a valid number
    }
  };
  useEffect(() => {
    getRiskSetting();
    getAllPartner();
    GetAllCountrys();
  }, []);
  return (
    <>
      <section onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <Container className="">
          {loadervalue == true ? <Loader /> : ""}
          <div className="mainBoxService mt-3">
            <div className="serviceHeader bg-white text-black rounded-0">
              <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                Add Accounts
              </h3>
              <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                <Container className="">
                  <Row className="mb-4 px-0">
                    <Form.Group
                      as={Col}
                      controlId="formGridCity"
                      defaultValue={categoryOfRisk}
                      onChange={handleCategoryChange}
                    >
                      <Form.Label>Type</Form.Label>
                      <Form.Select aria-label="Default select ̰ example">
                        <option value="1">Deal</option>
                        <option value="2">Expenses</option>
                        <option value="3">Settlement Commission</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Payout Partner</Form.Label>
                      <Form.Select aria-label="Default select ̰ example" value={partnerBank} onChange={(e) => setPartnerBank(e.target.value)}>
                        <option >select payout partner</option>
                        {
                          partnerData && partnerData.map((row) => (
                            <option value={row.id}>{row.name}</option>
                          ))
                        }
                      </Form.Select>
                      {error && !partnerBank && <small className="responsiveFontLarg text-danger error_message ms-2 error notentered" >Please Select Payout Partner</small>}
                    </Form.Group>
                  </Row>

                  {categoryOfRisk === "1" && (
                    <>
                      <Row className="mb-4">
                        <Form.Group as={Col}>
                          <Form.Label>Deal Date</Form.Label>
                          <Form.Control
                            type="date"
                            required
                            placeholder="To date"
                            name="Referal"
                            className=" reflink link py-4 pbSt"
                            value={dealDate}
                            onChange={(e) => {
                              const enteredDate = e.target.value;
                              const datePattern = /^\d{4}-\d{2}-\d{2}$/;
                              if (datePattern.test(enteredDate)) {
                                setDealDate(enteredDate);
                              }
                            }}
                          />
                          {error && !dealDate && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Select Deal Date</small>}
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>Deal Currency</Form.Label>
                          <Form.Select value={dealCurremcy} onChange={(e) => setDealCurremcy(e.target.value)}>
                            <option >select currency</option>
                            {
                              country && country.map((row) => (
                                <option value={row.currency}>{row.currency}</option>
                              ))
                            }
                          </Form.Select>
                          {error && !dealCurremcy && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Select Deal Currency</small>}
                        </Form.Group>
                      </Row>

                      <Row className="mb-4">
                        <Form.Group as={Col}>
                          <Form.Label>Deal Amount</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Deal Amount"
                            value={dealAmount}
                            onChange={handleDealAmountChange}
                          />
                          {error && !dealAmount && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Enter Deal Amount</small>}
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>Deal Rate</Form.Label>
                          <Form.Control type="text" placeholder="Deal Rate"
                            value={dealRate}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const formatValue = selectedValue.replace(/[^0-9.]/g, '');
                              setDealRate(formatValue);
                            }}
                          />
                          {error && !dealRate && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Enter Deal Rate</small>}
                        </Form.Group>
                      </Row>
                      <Row className="mb-4">
                        <Form.Group as={Col}>
                          <Form.Label>Particulars</Form.Label>
                          <textarea
                            type="textarea"
                            className="form-control  py-4 "
                            placeholder="Particulars"
                            rows="4"
                            value={particulars}
                            onChange={(e) => setParticulars(e.target.value)}
                          />
                          {error && !particulars && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Enter Particulars</small>}
                        </Form.Group>
                      </Row>
                    </>
                  )}

                  {categoryOfRisk === "2" && (

                    <>
                      <Row className="mb-4">
                        <Form.Group as={Col}>
                          <Form.Label>Expense Date</Form.Label>
                          <Form.Control
                            type="date"
                            required
                            placeholder="Expense Date"
                            name="Referal"
                            className=" reflink link py-4 pbSt"
                            value={expenseDate}
                            onChange={(e) => {
                              const enteredDate = e.target.value;
                              const datePattern = /^\d{4}-\d{2}-\d{2}$/;
                              if (datePattern.test(enteredDate)) {
                                setExpenseDate(enteredDate);
                              }
                            }}
                          />
                          {error && !dealDate && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Select Expense Date</small>}
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>Expense Currency</Form.Label>
                          <Form.Select aria-label="Default select ̰ example" value={expenseCurrency}
                            onChange={(event) => setExpenseCurrency(event.target.value)}>
                            <option>select currency</option>
                            {
                              country && country.map((row) => (
                                <option value={row.currency}>{row.currency}</option>
                              ))
                            }
                          </Form.Select>
                          {error && !expenseCurrency && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Select  Expense Currency</small>}

                        </Form.Group>
                      </Row>
                      <Row className="mb-4">
                        <Form.Group as={Col}>
                          <Form.Label>Expense Amount</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Expense Amount"
                            value={expenseAmount}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const formatValue = selectedValue.replace(/[^0-9.]/g, '');
                              setExpenseAmount(formatValue);
                            }}
                          />
                          {error && !expenseAmount && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Enter Expense Amount </small>}
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>Transaction Reference</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Transaction Reference"
                            value={transactionReference}
                            onChange={(event) => setTransactionReference(event.target.value)}
                          />
                          {error && !transactionReference && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Enter Transaction Reference  </small>}
                        </Form.Group>

                      </Row>
                      <Row className="mb-4">
                        <Form.Group as={Col}>
                          <Form.Label>Remarks</Form.Label>
                          <Form.Control type="text" placeholder="Remarks" value={remarks} onChange={(event) => setRemarks(event.target.value)} />
                          {error && !remarks && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Enter Remarks  </small>}
                        </Form.Group>
                      </Row>
                      <Row className="mb-4">
                        <Form.Group as={Col}>
                          <Form.Label>Particulars</Form.Label>

                          <textarea
                            type="textarea"
                            className="form-control  py-4 "
                            placeholder="Particulars"
                            rows="4"
                            value={particulars1}
                            onChange={(event) => setParticulars1(event.target.value)}
                          />
                          {error && !particulars1 && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Enter Particulars  </small>}
                        </Form.Group>
                      </Row>
                    </>

                  )}

                  {categoryOfRisk === "3" && (
                    <>
                      <Row className="mb-4">
                        <Form.Group as={Col}>
                          <Form.Label>From Date</Form.Label>
                          <Form.Control
                            type="date"
                            required
                            placeholder="From Date"
                            name="Referal"
                            className=" reflink link py-4 pbSt"
                            value={fromDate2}
                            onChange={(e) => {
                              const enteredDate = e.target.value;
                              const datePattern = /^\d{4}-\d{2}-\d{2}$/;
                              if (datePattern.test(enteredDate)) {
                                setFromDate2(enteredDate);
                              }
                            }}
                          />
                          {error && !fromDate2 && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Select From Date</small>}
                        </Form.Group>

                        <Form.Group as={Col}>
                          <Form.Label>To Date</Form.Label>
                          <Form.Control
                            type="date"
                            required
                            placeholder="To Date"
                            name="Referal"
                            className=" reflink link py-4 pbSt"
                            max={currentDate}
                            value={toDate2}
                            onChange={(e) => {
                              const enteredDate = e.target.value;
                              const datePattern = /^\d{4}-\d{2}-\d{2}$/;
                              if (datePattern.test(enteredDate)) {
                                setToDate2(enteredDate);
                              }
                            }}
                          />
                          {error && !toDate2 && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Select To Date</small>}
                        </Form.Group>
                      </Row>
                      <Row className="mb-4">
                        <Form.Group as={Col}>
                          <Form.Label>Settlement Currency</Form.Label>
                          <Form.Select aria-label="Default select ̰ example" value={settlementCurrency}
                            onChange={(event) => setSettlementCurrency(event.target.value)}>
                            <option>select currency</option>
                            {
                              country && country.map((row) => (
                                <option value={row.currency}>{row.currency}</option>
                              ))
                            }
                          </Form.Select>
                          {error && !settlementCurrency && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Enter Settlement Currency </small>}
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label>Settlement Amount</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Settlement Amount"
                            value={SettlementAmount}
                            onChange={(e) => {
                              const selectedValue = e.target.value;
                              const formatValue = selectedValue.replace(/[^0-9.]/g, '');
                              setSettlementAmount(formatValue);
                            }}
                          />
                          {error && !SettlementAmount && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Enter Settlement Amount </small>}
                        </Form.Group>
                      </Row>

                      <Row className="mb-4">
                        <Form.Group as={Col}>
                          <Form.Label>Particulars</Form.Label>
                          <textarea
                            type="textarea"
                            className="form-control  py-4 "
                            placeholder="Particulars"
                            rows="4"
                            value={particulars2}
                            onChange={(e) => setParticulars2(e.target.value)}
                          />
                          {error && !particulars2 && <small className="responsiveFontLarge text-danger error_message ms-2 error notentered" >Please Enter Particulars  </small>}
                        </Form.Group>
                      </Row>
                    </>
                  )}

                  <Row className="row d-flex m-auto  pt-3">
                    {id ? (
                      <Button
                        size="sm"
                        className="purpleBackground border-0 w-auto px-4"
                        onClick={() => updateRiskSetting()}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="purpleBackground text-white border text-black w-auto px-4"
                        onClick={() => saveAccountsData()}
                      >
                        Add
                      </Button>
                    )}
                    <Button
                      size="sm"
                      className="bg-transparent  border text-black w-auto px-3"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
          <ModalComponent
            show={modalShowAdd}
            title11={"Create Risk Management successfully"}
            onHide={() => setModalShowAdd(false)}
          />
        </Container>
      </section>
    </>
  );
}
