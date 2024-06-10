import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import moment from "moment";
import Pagination from '@mui/material/Pagination';
import html2pdf from "html2pdf.js";
import { format } from "date-fns";
import numberToWords from "number-to-words";
import {
  Container,
  Table,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import LRLogoImg from '../../assets/images/LR_Pdf_Logo.png';
import Loader from "../Loader/Loader";


const Statement = ({ individualuserData }) => {
  const [Search, SetSearch] = useState('');
  const [numItems, SetNumItems] = useState(0);
  const [RowsPerPage, setRowsPerPage] = useState(CommonConstants.DefaultPageSize);
  const [page, setPage] = useState(1);
  const [CountPage, SetCountPage] = useState(0);
  const [ReceiverInfo, setReceiverInfo] = useState([]);
  const [DTransactionData, setDTransactionData] = useState([]);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [SelectedReciptionName, setSelectedReciptionName] = useState();
  const [SelectedReciption, setSelectedReciption] = useState(0);
  const [allTarnsation, setAllTransaction] = useState([]);
  const [UserInfo, setUserInfo] = useState([]);
  const [SenderCountryCurrency, setSenderCountryCurrency] = useState('');
  const [TotalAmoutTransfer, setTotalAmoutTransfer] = useState();
  const [UserInfoKyc, setUserInfoKyc] = useState([]);
  const [loadervalue, setloadervalue] = useState(false);
  const [filterTrue, setFilterTrue] = useState(false);
  const [totalCharge, setTotalCharge] = useState(0);
  const [totalamount, setTotalamount] = useState(0);
  const [SCCode, setSCode] = useState("");
  const [RCCode, setRCode] = useState("");
  const [SendingUC, setSendingUC] = useState(0);
  const [TotalServicecharge, setTotalServicecharge] = useState(0);
  const [TotalAmoutRecive, setTotalAmoutRecive] = useState(0);
  const [S_words, setS_Words] = useState("Zero");
  const [R_words, setR_Words] = useState("Zero");
  const printRef = useRef();
  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == page) {
      setPage(NewPage);
    } else {
      setPage(NewPage);
    }
  };
  const ChangeRowSelected = (Event) => {
    setRowsPerPage(Number(Event.target.value));
    setPage(1);
  };
  const getStatement = async () => {
    setloadervalue(true);
    const payload = {
      userId: individualuserData,
      recipientId: SelectedReciption, // pass 0 if userid not pass
      startDate: StartDate, // pass "" if do not send (date format : YYYY-MM-DD)
      endDate: EndDate,
      pageindex: page,
      pagesize: RowsPerPage,

    }
    const response = await axios.post(CommonConstants.NEW_BASE_URL3 + "/gettransactionstatement", payload);
    var Amountcounts = 0;
    response.data.data.map((item) => {
      var Add = (item.discountedAmount == 0 ? item.amount : item.discountedAmount) + Amountcounts // discount amount total
      Amountcounts = Add
    });
    setTotalAmoutTransfer(Amountcounts)
    const transactions = response.data.data;
    setAllTransaction(transactions);
    let totalpremimumExRate = 0;
    let totalAmount = 0;
    var UCAmount = 0;
    var servicechargeTotal = 0;
    var RAmountcounts = 0;
    transactions.forEach(element => {
      totalpremimumExRate += element.premimumExRate;
      totalAmount += element.amount;
      UCAmount += element.usedCash;
      servicechargeTotal = element.serviceCharge + (servicechargeTotal - element.promoCodeServiceChargeDiscAmt);
      RAmountcounts += element.receivingAmount;
    });
    setTotalAmoutRecive(Number(RAmountcounts?.toString()?.match(/^\d+(?:\.\d{0,2})?/)));
    setTotalServicecharge(Number(servicechargeTotal?.toString()?.match(/^\d+(?:\.\d{0,2})?/)));
    setSendingUC(UCAmount);
    setSCode(response.data.data[0]?.sendingCurrencyCode);
    setRCode(response.data.data[0]?.recevingCurrencyCode);
    setTotalamount(totalAmount);
    setTotalCharge(totalpremimumExRate);
    var S_Words = numberToWords.toWords(totalAmount);
    setS_Words(S_Words);
    var R_Words = numberToWords.toWords(RAmountcounts);
    setR_Words(R_Words);
    SetNumItems(response.data.recordCount);
    SetCountPage(response.data.totalPageCount);
    setFilterTrue(response.data.recordCount == 0 ? (EndDate == "" || StartDate == "" || SelectedReciption == "" || SelectedReciptionName == "" ? false : true) : true);
    setloadervalue(false);
  }
  const GetAllReciever = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", individualuserData);
      formData.append("isDeleted", true);
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
        formData
      );
      if (response.data.status === true) {
        setReceiverInfo(response.data.data);
      }
    } catch (err) { }
  };

  const getNextDay = (dateString) => {
    if (dateString !== "") {
      const selectedDate = new Date(dateString);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      // return nextDay.toISOString().split('T')[0];
      setSelectedDate(nextDay.toISOString().split("T")[0], "StartDate");
    }
  };

  const handleApplyFilter = () => {
    setStartDate(document.getElementById("start-date").value);
    setEndDate(selectedDate);
    setSelectedReciption(document.getElementById("reciption").value);
    const RName = ReceiverInfo.filter((val) => val.id == document.getElementById("reciption").value)
    setSelectedReciptionName(RName)

  };

  const handlePrint = () => {
    setloadervalue(true);
    const element = printRef.current;
    const opt = {
      filename: "statement.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: {
        unit: "mm",
        // format: "a4",
        orientation: "portrait", // A4 size options
        // Explicitly set width and height for A4 size
        format: [210, 297], // Width and height in millimeters
      },
    };
    html2pdf().from(element).set(opt).save();
    setloadervalue(false);
  };

  const GetUserDetails = async () => {
    try {
      const userId = {
        id: individualuserData,
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getuserinfobyid",
        userId
      );
      if (response.data.status === true) {
        setUserInfo(response.data.data);
        setUserInfoKyc(response.data.data.userkycdetails)

        const Country = await axios.get(
          CommonConstants.BASE_URL + "/getallcountries",
          userId
        );
        var data = Country.data.data.filter((item) => item.id == response.data.data.countryId)
        setSenderCountryCurrency(data[0].currency)
      }
    } catch (err) { }
  };
  useEffect(() => {
    getStatement();
    GetAllReciever();
    GetUserDetails();
  }, [individualuserData, page, Search, RowsPerPage, StartDate, EndDate, SelectedReciption])
  return (<>
    <div className="container-fluid">
      <PageHeader
        HeaderText="Statements"
        Breadcrumb={[
          { name: "Dashboard", navigate: "" },
          { name: "IoT Dashboard", navigate: "" },
        ]}
      />
      {loadervalue == true ? <Loader /> : ""}
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="body project_report">
              <div className="table-responsive">
                {allTarnsation && allTarnsation.length > 0 && <div className="d-flex justify-content-between">
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
                </div>}
                {<div className="filter-section py-4 pt-0">
                  <Row>
                    <Col className="col-lg-12 d-flex ps-0 pe-0 respoChildFooter">
                      <div className=" respoChildFooter col-lg-11 ps-0 pe-0 d-flex align-items-center justify-content-between">
                        <Col class="col-lg-3 ps-0 ">
                          <Form.Group
                            as={Col}
                            className=" input-container required pb-0 ps-0 pe-0 pbSt"
                          >
                            <Form.Control
                              type="date"
                              required
                              placeholder="From date"
                              name="Referal"
                              id="start-date"
                              className="formControlStep2 reflink link py-4 pbSt"
                            />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              From date
                            </small>
                          </Form.Group>
                        </Col>
                        <Col class="col-lg-3 ps-0 pbSt">
                          <Form.Group
                            as={Col}
                            className=" input-container required pb-0 ps-0 pe-0"
                          >
                            <Form.Control
                              type="date"
                              required
                              placeholder="To date"
                              name="Referal"
                              id="end-date"
                              onChange={(e) => {
                                getNextDay(e.target.value);
                              }}
                              className="formControlStep2 reflink link py-4 pbSt"
                            />
                            <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                              To date
                            </small>
                          </Form.Group>
                        </Col>
                        <Col class="col-lg-3 pbSt">
                          <div className="dateSec pbSt">
                            <Form.Select
                              aria-label="Default select example"
                              className="d-flex m-auto purpleBorder"
                              id="reciption"
                            >
                              <option value="">All Recipient</option>
                              {ReceiverInfo &&
                                ReceiverInfo?.map((RecieverDetails, index) => {
                                  return (
                                    <option value={RecieverDetails?.id}>
                                      {RecieverDetails?.firstName +
                                        " " +
                                        RecieverDetails?.lastName}
                                      {RecieverDetails?.businessName}
                                      {RecieverDetails?.fullName == "[]"
                                        ? ""
                                        : RecieverDetails?.fullName
                                          .replace("[", "")
                                          .replace("]", "")
                                          .replace(/,/g, " , ")}
                                    </option>
                                  );
                                })}
                            </Form.Select>
                          </div>
                        </Col>
                        <Col class="pbSt col-lg-2 ">
                          <Button
                            className="pbSt btn btn-default rounded-5 purpleBackground text-white m-auto "
                            onClick={(e) => {
                              handleApplyFilter();
                            }}
                          >
                            Apply Filter
                          </Button>
                        </Col>
                      </div>

                      {DTransactionData && <Col class="pbDowSt col-lg-1 ps-0 pe-0 ">
                        <div
                          className="rounded-5 sendBtn purpleBackground d-flex pbDowSt ms-auto me-auto pointer"
                          onClick={handlePrint}
                        >
                          <i class="fa-solid fa fa-download text-white "></i>
                        </div>

                      </Col>}
                    </Col>
                  </Row>
                </div>}
                <table className="table m-b-0 ">
                  <thead className="thead-light">
                    <tr>
                      <th className="customTh py-4 px-2 border-left">Transaction Date</th>
                      <td className="customTh py-4 px-2">Control no.</td>
                      <td className="customTh py-4 px-2">Receiver Details</td>
                      <td className="customTh py-4 px-2">Send Amount</td>
                      <td className="customTh py-4 px-2">Received Amount</td>
                      <td className="customTh py-4 px-2">Service Charge</td>
                      <td className="customTh py-4 px-2">Rate</td>
                      <td className="customTh py-4 px-2 border-left">Status</td>
                    </tr>
                  </thead>
                  {allTarnsation && allTarnsation.length > 0 ? allTarnsation.map((row) => {
                    return (
                      <tbody>
                        <tr>
                          <td className="text-center">
                            {format(
                              new Date(row?.updatedAt),
                              "dd MMM yyyy"
                            )}
                            <br></br>
                            {format(
                              new Date(row?.updatedAt),
                              " hh:mm:ss a"
                            )}
                            {/* 15 Dec 2023 <br></br> 11:11:00 pm */}
                          </td>
                          <td>
                            {row.controlNo == "" ? '-' : row.controlNo}
                          </td>
                          <td className="">
                            <div className="my-4 mt-0">
                              {" "}
                              {row.recipientName == "" ? '-' : row.recipientName}
                            </div>

                            <div className="my-4">
                              {" "}
                              {row.bankName == "" ? '-' : row.bankName}
                            </div>
                            <div className="my-4">
                              {" "}
                              {row.bankAccNo == "" ? '-' : row.bankAccNo}
                            </div>
                          </td>
                          <td>
                            {row.amount == "" ? '-' : row.amount}
                          </td>
                          <td>
                            {row.receivingAmount == "" ? '-' : row.receivingAmount}
                          </td>
                          <td>
                            {row.serviceCharge == "" ? '-' : row.serviceCharge}
                          </td>
                          <td>
                            {row.exchangeRate == "" ? '-' : row.exchangeRate}
                          </td>
                          <td>{row.transactionStatus == "" ? '-' : row.transactionStatus}</td>
                        </tr>
                      </tbody>
                    )
                  }) : <td colSpan={7}><p className="text-center mt-3 ">No Statement's Data Found </p></td>}
                </table>
                {allTarnsation && allTarnsation.length > 0 && <div className="d-flex paginationBetween pt-4 respoChildFooter">
                  <div className="filter-row pt-2">
                    Showing {(page - 1) * RowsPerPage + 1} to {(page * RowsPerPage) > numItems ? numItems : (page * RowsPerPage)} of {numItems} entries
                  </div>
                  <Pagination count={CountPage} className="pbDowSt pbSt" page={page} onChange={HandleChangePage} />

                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="d-none">
      <div className="row expanded my-5 ">
        <main className="columns ">
          <div className="inner-container">
            <section className="">
              <div
                className="large invoice-container11 m-3"
                ref={printRef}
              >
                <div className="watermark">
                  <img src={LRLogoImg} alt="Watermark Logo" />
                </div>

                <table className="bg-white pt-2 border">
                  <tbody className="p-4">
                    <tr className="header border-bottom pb-4">
                      <td className="">
                        {" "}
                        <img
                          src={LRLogoImg}
                          alt="LegalRemit"
                          className="logo-img "
                          height={70}
                          width={170}
                        />
                      </td>
                      <td className="m-0 p-0">
                        <h4 className="mb-0  pe-2 purpleText moneyHead text-end">
                          Money transafer details
                        </h4>
                      </td>
                    </tr>

                    <tr className="intro border-bottom mt-4">
                      <td className="d-block mt-3">
                        <div className="d-flex justify-content-start">
                          <div>Name: </div> &nbsp;{" "}
                          <div>
                            {UserInfo &&
                              UserInfo?.fName + " " + UserInfo?.lName}
                          </div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-start w-75">
                          {/* <div>Address: </div> &nbsp;{" "} */}
                          <div>
                            {" "}
                            {UserInfoKyc && UserInfoKyc?.streetName}
                            {" "}
                            <br />
                            {UserInfoKyc && UserInfoKyc?.postalCode}
                          </div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-start">
                          <div>Registered Date : </div> &nbsp;{" "}
                          <div> {moment(UserInfo?.createdAt).format('D MMM YYYY, h:mm A')}</div>
                        </div>
                        <br />
                      </td>

                      <td className="">
                        <div className="d-flex justify-content-end mt-3">
                          <div>Issue Date:</div>
                          <div>
                            {moment(new Date()).format('D MMM YYYY, h:mm A')}
                          </div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div>From : </div> &nbsp;{" "}
                          <div> {document.getElementById("start-date")?.value == "" ? moment(UserInfo?.createdAt).format('D MMM YYYY') : document.getElementById("start-date")?.value}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div>To : </div> &nbsp;{" "}
                          <div> {document.getElementById("end-date")?.value == "" ? moment(new Date()).format('D MMM YYYY') : document.getElementById("end-date")?.value}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div className=" d-flex">
                            Total no. of transaction:{" "}
                            <div className="">
                              {UserInfo?.noOfTranscation}{" "}
                            </div>{" "}
                          </div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div className=" d-flex">
                            Total amt. transaferred: &nbsp;
                            <div className="">
                              {" "}
                              {Number(TotalAmoutTransfer?.toString()?.match(/^\d+(?:\.\d{0,2})?/))} {SenderCountryCurrency}
                              {/* {(TotalAmoutTransfer)?.toFixed(2)} {SenderCountryCurrency} */}
                            </div>{" "}
                          </div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div className=" d-flex">
                            Transaction for:{" "}
                            <div className="">
                              {SelectedReciptionName == null
                                ? "All recipient"
                                : SelectedReciptionName[0]?.firstName +
                                " " +
                                SelectedReciptionName[0]?.lastName}
                            </div>{" "}
                          </div>
                        </div>
                        <br />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className="bg-white pt-2 border"
                  style={{ width: "100%", tableLayout: "fixed" }}
                >
                  <thead>
                    <tr>
                      <th
                        className="pe-0 item-stock"
                        style={{ wordBreak: "break-all" }}
                      >
                        Transaction <br /> Date
                      </th>
                      <th
                        className="pe-0 item-stock"
                        style={{ wordBreak: "break-all" }}
                      >
                        Control <br /> No.
                      </th>
                      <th
                        className="pe-0 item-stock"
                        style={{ wordBreak: "break-all" }}
                      >
                        Receiver <br /> Details
                      </th>
                      <th
                        className="pe-0 item-stock"
                        style={{ wordBreak: "break-all" }}
                      >
                        Send <br /> Amount
                      </th>
                      <th
                        className="pe-0 item-stock"
                        style={{ wordBreak: "break-all" }}
                      >
                        Received <br /> Amount
                      </th>
                      <th
                        className="pe-0 item-stock"
                        style={{ wordBreak: "break-all" }}
                      >
                        Service <br /> Charge
                      </th>
                      <th
                        className="pe-0 item-stock"
                        style={{ wordBreak: "break-all" }}
                      >
                        Rate
                      </th>
                      <th
                        className="pe-0 item-stock"
                        style={{ wordBreak: "break-all" }}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {allTarnsation && allTarnsation?.length > 0 ? (
                      allTarnsation?.map((data, index) => (
                        <>
                          <tr className="border-bottom" key={index}>
                            <td className="item-stock ps-3">
                              {moment(data?.updatedAt).format("DD MMM YYYY")}
                              <br />
                              {moment(data?.updatedAt).format("hh:mm:ss a")}
                            </td>
                            <td
                              className="item-stock p-1"
                              style={{ wordBreak: "break-all" }}
                            >
                              {data?.controlNo}
                            </td>

                            <td className="item-stock p-1">
                              <div style={{ wordBreak: "break-all" }}>
                                {data?.recipientName}
                              </div>
                              <div style={{ wordBreak: "break-all" }}>
                                {data?.bankName ? data?.bankName : "-"}
                              </div>
                              <div style={{ wordBreak: "break-all" }}>
                                {data?.bankAccNo ? data?.bankAccNo : "-"}
                              </div>
                            </td>
                            <td className="item-stock p-1">{
                              Number(data?.amount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))} {" "} {data?.sendingCurrencyCode}
                              <div
                                className={
                                  data?.usedCash == 0 ? "d-none" : ""
                                }
                              >
                                Used Cash : -{data?.usedCash}
                                <br />
                                Actual Pay :{" "}
                                {Number(data?.amount) -
                                  Number(data?.usedCash)}
                              </div></td>
                            <td className="item-stock p-1">
                              {data?.receivingAmount} {" "} {data?.recevingCurrencyCode}
                            </td>
                            <td className="item-stock p-1">
                              {Number(data?.serviceCharge) -
                                Number(
                                  data?.promoCodeServiceChargeDiscAmt
                                )}{" "}
                            </td>
                            <td className="item-stock p-1">
                              {data?.exchangeRate} {" "} {data?.recevingCurrencyCode}
                              <div
                                className={
                                  data?.premimumExAmt == 0 ||
                                    data?.premimumExRate == 0
                                    ? "d-none"
                                    : ""
                                }
                              >
                                Premium rate :
                                <br />
                                {Number(data?.exchangeRate) +
                                  Number(data?.premimumExRate)}{" "}
                                {data?.sendingCurrencyCode} =
                                {(data?.receivingAmount).toString()?.match(/^\d+(?:\.\d{0,2})?/)}{" "}
                                {data?.recevingCurrencyCode}
                              </div>
                            </td>
                            <td className="item-stock ps-3">
                              {data?.transactionStatus}
                            </td>
                          </tr>
                        </>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center py-5">
                          <b>No Statement Data</b>
                        </td>
                      </tr>
                    )}
                    {allTarnsation && allTarnsation?.length > 0 ? (
                      <>
                        <tr>
                          <th
                            className="pe-0 "
                            style={{ wordBreak: "break-all" }}
                            colSpan="3"
                          >
                            Grand total :
                          </th>
                          <th
                            className="pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            {totalamount} {SCCode}
                            {
                              SendingUC == 0 ? "" : ` - ${SendingUC} ${SCCode}`
                            }
                          </th>
                          <th
                            className="pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            {TotalServicecharge} {SCCode}
                          </th>
                          <th
                            className="pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          ></th>
                          <th
                            className="pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            {TotalAmoutRecive} {RCCode}
                          </th>
                        </tr>

                        <tr>
                          <th className="pe-0 " colSpan="8">
                            Note : For Transaction (fill control no), premium rate of (applied rate) was <br /> applied on amount (applied amount)
                          </th>
                        </tr>
                        <tr>
                          <th className="pe-0 " colSpan="8">
                            UR : Used Rewards
                          </th>
                        </tr>
                        <tr>
                          <th className="pe-0 " colSpan="2">
                            {SCCode} Amount (in words) :
                          </th>
                          <th colSpan="6" className="pe-0 text-center">{S_words}</th>
                        </tr>

                        <tr style={{ backgroundColor: "red" }}>
                          <th
                            className="pe-0 "
                            style={{ wordBreak: "break-all" }}
                            colSpan="2"
                          >
                            {RCCode} Amount (in words) :
                          </th>
                          <th colSpan="6" className="pe-0 text-center">{R_words}</th>
                        </tr>
                      </>
                    ) : (
                      <tr></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>

  </>)
}
export default Statement;