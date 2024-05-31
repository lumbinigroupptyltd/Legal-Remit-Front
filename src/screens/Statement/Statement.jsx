import React, { useEffect, useState, useRef } from "react";
import "./Statement.scss";
import {
  Container,
  Table,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import NavBar from "../Home/Navbar/Navbar";
import Footer from "../Home/Footer/Footer";
import Pagination from "@mui/material/Pagination";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import Loader from "../Loader/Loader";
import { format } from "date-fns";
import moment from "moment";
import LRLogoImg from "../../assets/images/LR_Pdf_Logo.png";
import numberToWords from "number-to-words";
import jsPDF from "jspdf";
import "jspdf-autotable";
const ref = React.createRef();
const url = "https://dev.legalremitnepal.com.au/image/logo2.png";

export default function Statement() {
  const [TransactionData, setTransactionData] = useState([]);
  const [DTransactionData, setDTransactionData] = useState([]);
  const [SCCode, setSCode] = useState("");
  const [RCCode, setRCode] = useState("");
  const [CountPage, SetCountPage] = React.useState(0);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(50);
  const [numItems, SetNumItems] = React.useState(0);
  const [loadervalue, setloadervalue] = useState(false);
  const [selectedValue, setSelectedValue] = useState(50);
  const [ReceiverInfo, setReceiverInfo] = useState([]);
  const [UserInfo, setUserInfo] = useState([]);
  const [UserInfoKyc, setUserInfoKyc] = useState([]);
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  const [defaultStartDate, setdefaultStartDate] = useState("");
  const [defaultEndDate, setdefaultEndDate] = useState("");
  const [SelectedReciption, setSelectedReciption] = useState("");
  const [SelectedReciptionName, setSelectedReciptionName] = useState();
  const [SendingAmount, setSendingAmount] = useState(0);
  const [SendingUC, setSendingUC] = useState(0);
  const [TotalAmoutTransfer, setTotalAmoutTransfer] = useState();
  const [TotalAmoutRecive, setTotalAmoutRecive] = useState(0);
  const [TotalServicecharge, setTotalServicecharge] = useState(0);
  const [SenderCountryCurrency, setSenderCountryCurrency] = useState("");

  const [S_words, setS_Words] = useState("Zero");
  const [R_words, setR_Words] = useState("Zero");

  const printRef = useRef();
  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  // });

  // const handlePrint = () => {
  //   const element = document.createElement("a");
  //   const file = new Blob([printRef.current.outerHTML], {
  //     type: "application/pdf",
  //   });
  //   element.href = URL.createObjectURL(file);
  //   element.download = "statement.pdf";
  //   element.click();
  // };
  //   const dateString = "2023-07-08T06:43:34.778+00:00";
  // const dateObj = new Date("2023-07-08T06:43:34.778+00:00").getFullYear()/String(new Date("2023-07-08T06:43:34.778+00:00").getMonth() + 1).padStart(2, '0')/String(new Date("2023-07-08T06:43:34.778+00:00").getDate()).padStart(2, '0');

  // const year = dateObj.getFullYear();
  // const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  // const day = String(dateObj.getDate()).padStart(2, '0');

  function addWaterMark(doc) {
    var totalPages = doc.internal.getNumberOfPages();

    for (var i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      // doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
      // Set opacity
      doc.setFillColor(255, 255, 255); // Set fill color to white
      doc.setDrawColor(255, 255, 255); // Set draw color to white
      doc.setFillColor(255, 255, 255); // Set fill color to white
      doc.setDrawColor(255, 255, 255); // Set draw color to white
      doc.setFillColor(255, 255, 255); // Set fill color to white
      doc.setDrawColor(255, 255, 255); // Set draw color to white
      doc.setFillColor(255, 255, 255); // Set fill color to white
      doc.setDrawColor(255, 255, 255); // Set draw color to white
      doc.addImage(LRLogoImg, "JPEG", 50, 115, 110, 75); // Assuming LRLogoImg is a path to your logo image
      // doc.setTextColor(150);
      // doc.text(50, doc.internal.pageSize.height - 30, 'Watermark');
    }

    return doc;
  }

  const handlePrint = () => {
    var doc = new jsPDF();
    var element = document.getElementById("transactionTable");

    if (element) {
      // Add additional details above the table
      // doc.text("Transaction Details", 20, 10);
      doc.addImage(LRLogoImg, "JPEG", 5, 5, 50, 0); // Assuming LRLogoImg is a path to your logo image

      doc.text("Money Transfer Details", 130, 17);

      // Set a smaller font size for the text
      doc.setFont("helvetica");
      doc.setFontSize(10);
      // Add other details from your existing code with the updated font size
      doc.text(`${UserInfo?.fName} ${UserInfo?.lName}`, 5, 31);
      doc.text(`${UserInfoKyc?.streetName}`, 5, 37);
      doc.text(`${UserInfoKyc?.suburb},${UserInfoKyc?.stateName}`, 5, 43);
      // doc.text(`${UserInfoKyc?.stateName}`, 5, 49);
      doc.text(`${UserInfoKyc?.countryName}-${UserInfoKyc?.postalCode}.`, 5, 49);
      doc.text(
        `Registered Date: ${moment(defaultStartDate).format("DD-MM-YYYY")}`,
        5,
        56
      );

      doc.text(
        `Issue Date: ${moment(new Date()).format("DD-MM-YYYY")}`,
        130,
        30
      );
      doc.text(
        `From: ${StartDate == "" ? defaultStartDate : StartDate}`,
        130,
        37
      );
      doc.text(`To: ${EndDate == "" ? defaultEndDate : EndDate}`, 130, 44);
      doc.text(
        `Total no. of transactions: ${DTransactionData?.length}`,
        130,
        51
      );
      doc.text(
        `Total amount transferred: ${Number(TotalAmoutTransfer?.toString()?.match(/^\d+(?:\.\d{0,2})?/))} ${SenderCountryCurrency}`,
        130,
        58
      );
      doc.text(
        `Transaction for: ${
          SelectedReciptionName == null ||
          SelectedReciptionName == undefined ||
          SelectedReciptionName?.length == 0
            ? "All recipient"
            : SelectedReciptionName[0]?.firstName +
              " " +
              SelectedReciptionName[0]?.lastName
        }`,
        130,
        65
      );

      

      // Use jspdf-autotable to generate the table
      doc.autoTable({
        html: element,
        startY: 85, // Adjust the starting Y position as needed
        theme: "plain", // You can change the theme if needed
        tableWidth: "auto",
        margin: { top: 5, right: 5, bottom: 5, left: 5 }, // No margin (padding) on all sides
        headStyles: {
          
        
              fillColor: [244,240,255],
              textColor: [1, 1, 1]
            
  
      },
      });
      // doc = addWaterMark(doc);
      //doc.rect(20, 45, 50, 50, "F");

      doc.save((UserInfo && UserInfo?.fName + "_" + UserInfo?.lName)+"'s_statement");
    } else {
      console.error("Table element not found.");
    }
  };

  // console.log(DTransactionData)

  useEffect(() => {
    getAllStatement();
    GetAllReciever();
    GetUserDetails();
    DownloadAllStatement();
  }, [Page, RowsPerPage, StartDate, EndDate, SelectedReciption]);

  const GetAllReciever = async () => {
    try {
      const UserData = new FormData();
      UserData.append("userId", localStorage.getItem("Id"));
      UserData.append("isDeleted", false);
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getalluserrecipientsbyuserid",
        UserData
      );
      if (response.data.status === true) {
        setReceiverInfo(response.data.data);
      }
    } catch (err) {}
  };

  const GetUserDetails = async () => {
    try {
      const userId = {
        id: localStorage.getItem("Id"),
      };
      const response = await axios.post(
        CommonConstants.BASE_URL + "/getuserinfobyid",
        userId
      );
      if (response.data.status === true) {
        setUserInfo(response.data.data);
        setUserInfoKyc(response.data.data.userkycdetails);
        setdefaultStartDate(
          moment(response.data?.data?.createdAt).format("YYYY-MM-DD")
        );
        setdefaultEndDate(moment(new Date()).format("YYYY-MM-DD"));

        // console.log(response.data.data.countryId)

        const Country = await axios.get(
          CommonConstants.BASE_URL + "/getallcountries",
          userId
        );
        var data = Country.data.data.filter(
          (item) => item.id == response.data.data.countryId
        );
        // console.log(data[0].currency)
        setSenderCountryCurrency(data[0].currency);
      }
    } catch (err) {}
  };
  // console.log(UserInfo,"UserInfo")

  const [PremiumRateTransaction,setPremiumRateTransaction] = useState([])

  const getAllStatement = async () => {
    try {
      setloadervalue(true);
      const payload = {
        userId: localStorage.getItem("Id"),
        recipientId: SelectedReciption, // pass 0 if userid not pass
        startDate: StartDate, // pass "" if do not send (date format : YYYY-MM-DD)
        endDate: EndDate, // pass "" if do not send (date format : YYYY-MM-DD)
        pageindex: Page,
        pagesize: RowsPerPage,
      };

      const response = await axios.post(
        CommonConstants.NEW_BASE_URL3 + "/gettransactionstatement",
        payload
      );
      // console.log(response.data.data, "Statement data");
      setTransactionData(response.data.data);
      const PremiumObj = response.data.data.filter((item,i)=> item.premimumExRate != 0)
      setPremiumRateTransaction(PremiumObj)
      SetCountPage(response.data?.totalPageCount);
      SetNumItems(response.data.recordCount);
      setloadervalue(false);
    } catch (error) {
      console.log(error);
    }
  };

  const DownloadAllStatement = async () => {
    try {
      setloadervalue(true);
      const payload = {
        userId: localStorage.getItem("Id"),
        recipientId: SelectedReciption, // pass 0 if userid not pass
        startDate: StartDate, // pass "" if do not send (date format : YYYY-MM-DD)
        endDate: EndDate, // pass "" if do not send (date format : YYYY-MM-DD)
        pageindex: 1,
        pagesize: 100,
      };

      // debugger

      const response = await axios.post(
        CommonConstants.NEW_BASE_URL3 + "/gettransactionstatement",
        payload
      );
      // console.log(response.data.data, "Statement data");
      setDTransactionData(response.data.data);
      setSCode(response.data.data[0].sendingCurrencyCode);
      setRCode(response.data.data[0].recevingCurrencyCode);

      var UCAmount = 0;
      response.data.data.map((item) => {
        var Add = Number(item.usedCash) + UCAmount;
        UCAmount = Add;
      });
      setSendingUC(UCAmount)

      var ActualAmount = 0;
      response.data.data.map((item) => {
        var Add = Number(item.amount) + ActualAmount;
        ActualAmount = Add;
      });

      var Amountcounts = 0;
      response.data.data.map((item) => {
        var Add =
          (item.discountedAmount == 0 ? item.amount : item.discountedAmount) +
          Amountcounts; // discount amount total
        // var Add = item.amount + Amountcounts
        Amountcounts = Add;
      });

      var RAmountcounts = 0;
      response.data.data.map((item) => {
        var Add = Number(item.receivingAmount) + RAmountcounts; // discount amount total
        // var Add = item.amount + Amountcounts
        RAmountcounts = Add;
      });

      var servicechargeTotal = 0;
      response.data.data.map((item) => {
        var Add =
          Number(item.serviceCharge) +
          servicechargeTotal -
          Number(item.promoCodeServiceChargeDiscAmt); // discount amount total
        // var Add = item.amount + Amountcounts
        servicechargeTotal = Add;
      });
      // setTotalServicecharge(Number(servicechargeTotal.toString().match(/^\d+(?:\.\d{0,2})?/)));
      setTotalServicecharge(Number(servicechargeTotal?.toString()?.match(/^\d+(?:\.\d{0,2})?/)));
      // setTotalServicecharge(servicechargeTotal.toFixed(2));

      setSendingAmount(Number(ActualAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/)));
      // setSendingAmount(ActualAmount.toFixed(2));
      var S_Words = numberToWords.toWords(ActualAmount);
      setS_Words(S_Words);

      setTotalAmoutRecive(Number(RAmountcounts?.toString()?.match(/^\d+(?:\.\d{0,2})?/)));
      // setTotalAmoutRecive(RAmountcounts.toFixed(2));
      var R_Words = numberToWords.toWords(RAmountcounts);
      setR_Words(R_Words);
      // console.log(Amountcounts)
      setTotalAmoutTransfer(Amountcounts);
      setloadervalue(false);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(TotalServicecharge,TotalAmoutRecive,TotalAmoutTransfer,SendingAmount,"Grand")

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
    }
  };
  const ChangeRowSelected = (Event) => {
    setSelectedValue(Event);
    SetRowsPerPage(Number(Event));
    SetPage(1);
  };

  const handleApplyFilter = () => {
    // if(selectedDate == "" ||)
    setStartDate(document.getElementById("start-date").value);
    setEndDate(selectedDate);
    setSelectedReciption(document.getElementById("reciption").value);
    const RName = ReceiverInfo.filter(
      (val) => val.id == document.getElementById("reciption").value
    );
    // console.log(RName)
    setSelectedReciptionName(RName);
    // {RName.businessName}
    // {RName.fullName == "[]"
    //   ? ""
    //   : RName.fullName
    //       .replace("[", "")
    //       .replace("]", "")
    //       .replace(/,/g, " , ")})
  };

  const [selectedDate, setSelectedDate] = useState("");

  const getNextDay = (dateString) => {
    // debugger
    if (dateString != "") {
      const selectedDate = new Date(dateString);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(selectedDate.getDate() + 1);
      // return nextDay.toISOString().split('T')[0];
      setSelectedDate(nextDay.toISOString().split("T")[0], "StartDate");
    } else {
      setSelectedDate(dateString);
    }
  };

  return (
    <>
      <section className="abtPage statementSec responsiveMainForMobile">
        {loadervalue == true ? <Loader /> : ""}
        <NavBar></NavBar>
        <Container className="pb-5 mb-5 bg-white py-2 px-5 rounded-4">
          <div className="headerText d-flex justify-content-between py-4 respoChildFooter">
            <h1 className="purpleText bolder respTextCenter">Statement</h1>
            <Dropdown className="bg-transparent" onSelect={ChangeRowSelected}>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                className="m-0 bg-transparent purpleText1 purpleText"
              >
                {selectedValue}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {CommonConstants.show_rows?.map((value) => (
                  <Dropdown.Item key={value} eventKey={value}>
                    {value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="filter-section py-4 pt-0">
            <Row>
              <Col className="col-lg-12 d-flex ps-0 pe-0 respoChildFooter">
                <div className=" respoChildFooter col-lg-11 ps-0 pe-0 d-flex align-items-center justify-content-between">
                  <Col class="col-lg-3 ps-0 ">
                    <Form.Group
                      as={Col}
                      className=" input-container required pb-0 ps-0 pe-0 pbSt"
                    >
                      {/* <i className="fas fa-calendar main pe-5 mt-1 dateIcon"></i> */}
                      <Form.Control
                        type="date"
                        required
                        placeholder="From date"
                        name="Referal"
                        id="start-date"
                        // onChange={(e)=>{setStartDate(e.target.value)}}
                        className="formControlStep2 reflink link py-4 pbSt"
                      />
                      <label for="name" className="StatementLables">
                        Form date
                      </label>
                      <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                        From date
                      </small>

                      {/* {errors.name && <p>{errors.name}</p>} */}
                    </Form.Group>
                  </Col>
                  <Col class="col-lg-3 ps-0 pbSt">
                    <Form.Group
                      as={Col}
                      className=" input-container required pb-0 ps-0 pe-0"
                    >
                      {/* <i className="fas fa-calendar main pe-5 mt-1 dateIcon"></i> */}
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
                      <label for="name" className="StatementLables">
                        To date
                      </label>
                      <small className="responsiveFontLarge  d-none text-danger error_message ms-2 error">
                        To date
                      </small>

                      {/* {errors.name && <p>{errors.name}</p>} */}
                    </Form.Group>
                  </Col>
                  <Col class="col-lg-3 pbSt">
                    <div className="dateSec pbSt">
                      <Form.Select
                        aria-label="Default select example"
                        className="d-flex m-auto purpleBorder"
                        id="reciption"
                        // onChange={(e)=>{setSelectedReciption(e.target.value)}}
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
                        {/* <option value="2">Two</option>
                        <option value="3">Three</option> */}
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

                {DTransactionData && (
                  <Col class="pbDowSt col-lg-1 ps-0 pe-0 ">
                    {/* <PDFDownloadLink
                      document={<Invoice invoice={DTransactionData} 
                      userInfo={{
                        FullName:UserInfo && UserInfo?.fName+" "+UserInfo?.lName,
                        Address:UserInfoKyc && UserInfoKyc?.streetName,
                        Issue_Date:moment(new Date()).format("DD/MM/YYYY"),
                        Start_Date:StartDate=='' ? "-" :StartDate,
                        End_Date:EndDate=='' ? "-" :EndDate,
                        Total_Transaction:DTransactionData?.length,
                        TotalAmount:TotalAmoutTransfer,
                        SendingCurruncy:SenderCountryCurrency,
                        TransactionFor:SelectedReciptionName==null ? 'All recipient' : SelectedReciptionName[0]?.firstName+" "+SelectedReciptionName[0]?.lastName,
                        Registered_date:moment(UserInfo.createdAt).format("DD/MM/YYYY"),
                      }} 
                      userInfoKyc={UserInfoKyc}/>}
                      fileName="transaction_report.pdf"
                    > */}
                    <div
                      className="rounded-5 sendBtn purpleBackground d-flex pbDowSt ms-auto me-auto pointer"
                      onClick={handlePrint}
                    >
                      <i class="fa-solid fa fa-download text-white "></i>
                    </div>
                  </Col>
                )}
              </Col>
            </Row>
          </div>
          <div className="tableContainer">
            <Table className="overflowYscrollResp">
              <thead>
                <tr>
                  <th className="customTh py-4 px-2 border-left">
                    Transaction Date
                  </th>
                  <th className="customTh py-4 px-2"> Control no.</th>
                  <th className="customTh py-4 px-2">Receiver Details</th>
                  <th className="customTh py-4 px-2">Send Amount</th>
                  {/* <th className="customTh py-4 px-2">Promocode <br/>discount</th>
                  <th className="customTh py-4 px-2">Used Cash</th> */}
                  <th className="customTh py-4 px-2"> Service Charge</th>
                  <th className="customTh py-4 px-2"> Rate</th>
                  <th className="customTh py-4 px-2"> Received Amount</th>
                  <th className="customTh py-4 px-2 border-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {TransactionData?.length > 0 ? (
                  TransactionData &&
                  TransactionData?.map((TransData, index) => {
                    return (
                      <>
                        <tr className="customTr">
                          <td className="text-center">
                            {format(
                              new Date(TransData?.updatedAt),
                              "dd MMM yyyy"
                            )}
                            <br></br>
                            {format(
                              new Date(TransData?.updatedAt),
                              " hh:mm:ss a"
                            )}
                            {/* 15 Dec 2023 <br></br> 11:11:00 pm */}
                          </td>
                          <td className="text-center">
                            {TransData?.controlNo == ""
                              ? "-"
                              : TransData?.controlNo}
                          </td>
                          <td className="text-center">
                            {TransData?.recipientName} <br></br>
                            {TransData?.bankName}
                            <br></br>{" "}
                            {TransData?.bankAccNo == ""
                              ? TransData?.walletNo
                              : TransData?.bankAccNo}
                          </td>
                          <td className="text-center">
                            {Number(TransData?.amount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))} {TransData?.sendingCurrencyCode}
                            {/* {TransData?.amount} {TransData?.sendingCurrencyCode} */}
                            <div
                              className={
                                TransData?.usedCash == 0 ? "d-none" : ""
                              }
                            >
                              Used Cash : -{TransData?.usedCash}
                              <br />
                              Actual Pay :{" "}
                              {Number(TransData?.amount) -
                                Number(TransData?.usedCash)}
                            </div>
                          </td>
                          {/* <td className="text-center">{Number(TransData?.promoCodeExRateDiscAmt) + Number(TransData?.promoCodeServiceChargeDiscAmt)}</td>
                          <td className="text-center">{TransData?.usedCash}</td> */}
                          <td className="text-center">
                            {Number(TransData?.serviceCharge) -
                              Number(
                                TransData?.promoCodeServiceChargeDiscAmt
                              )}{" "}
                            {TransData?.sendingCurrencyCode}
                          </td>
                          <td className="text-center">
                            {TransData?.exchangeRate}
                            <div
                              className={
                                TransData?.premimumExAmt == 0 ||
                                TransData?.premimumExRate == 0
                                  ? "d-none"
                                  : ""
                              }
                            >
                              {/* <br/> */}
                              Premium rate :
                              <br />
                              {Number(TransData?.exchangeRate) +
                                Number(TransData?.premimumExRate)}{" "}
                              {TransData?.sendingCurrencyCode} =
                              {(TransData?.receivingAmount).toString()?.match(/^\d+(?:\.\d{0,2})?/)}{" "}
                              {TransData?.recevingCurrencyCode}
                            </div>
                          </td>
                          <td className="text-center">
                          {Number(TransData?.receivingAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/))}{" "}
                          {/* {(TransData?.receivingAmount).toFixed(2)}{" "} */}
                            {TransData?.recevingCurrencyCode}
                          </td>
                          <td className="text-center">
                            {/* {TransData?.transactionStatus} */}
                            {TransData?.transactionStatus == "Compliance Hold"
                              ? TransData?.isPaymentRecieved ? "Confirmed" : "Unconfirmed"
                              : TransData?.transactionStatus}
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <>
                    <td colSpan="10" className="text-center py-5 ">
                      <b>No Statement Data</b>
                    </td>
                  </>
                )}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between pt-4 mr-4 mr-4">
              {TransactionData?.length > 0 ? (
                <>
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
                    className="d-flex justify-content-end"
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Container>

        {/* <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <PDFViewer style={{ width: '80%', height: '80vh', border: '1px solid #ccc' }}>
      <Invoice />
    </PDFViewer>
  </div> */}

        {/* d-none */}
        <div className="d-none">
          <div className="row expanded my-5 ">
            <main className="columns ">
              <div className="inner-container">
                <section className="">
                  <div className="large invoice-container11 m-3" ref={printRef}>
                    <div className="watermark">
                      <img src={LRLogoImg} alt="Watermark Logo" />
                    </div>

                    <table className="bg-white pt-2 border">
                      <tbody className="p-4">
                        {/* <tr className="header" >
                       <h2 className="purpleText text-center d-flex justify-content-center"> Transaction Details </h2>
                    </tr> */}
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
                              Money Transafer Details
                            </h4>
                          </td>
                        </tr>

                        <tr className="intro border-bottom mt-4">
                          <td className="d-block mt-3">
                            <div className="d-flex justify-content-start">
                              {/* <div>Name: </div> &nbsp;{" "} */}
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
                                {UserInfoKyc && UserInfoKyc?.streetName + ","}
                                <br />
                                {UserInfoKyc && UserInfoKyc?.suburb + ","}
                                <br />
                                {UserInfoKyc && UserInfoKyc?.stateName + ","}
                                <br />
                                {UserInfoKyc && UserInfoKyc?.countryName}-
                                {UserInfoKyc && UserInfoKyc?.postalCode + "."}
                              </div>
                            </div>
                            <br />
                            <div className="d-flex justify-content-start">
                              <div>Registered Date : </div> &nbsp;{" "}
                              <div> {defaultStartDate}</div>
                            </div>
                            <br />
                          </td>

                          <td className="">
                            <div className="d-flex justify-content-end mt-3">
                              <div>Issue Date:</div>
                              <div>
                                {moment(new Date()).format("DD-MM-YYYY")}
                              </div>
                            </div>
                            <br />
                            <div className="d-flex justify-content-end">
                              <div>From : </div> &nbsp;{" "}
                              <div>
                                {" "}
                                {StartDate == "" ? defaultStartDate : StartDate}
                              </div>
                            </div>
                            <br />
                            <div className="d-flex justify-content-end">
                              <div>To : </div> &nbsp;{" "}
                              <div>
                                {" "}
                                {EndDate == "" ? defaultEndDate : EndDate}
                              </div>
                            </div>
                            <br />
                            <div className="d-flex justify-content-end">
                              <div className=" d-flex">
                                Total no. of transaction:{" "}
                                <div className="">
                                  {DTransactionData?.length}{" "}
                                </div>{" "}
                              </div>
                            </div>
                            <br />
                            <div className="d-flex justify-content-end">
                              <div className=" d-flex">
                                Total amt. transaferred: &nbsp;
                                <div className="">
                                  {" "}
                                  {Number(TotalAmoutTransfer?.toString()?.match(/^\d+(?:\.\d{0,2})?/))}{" "}
                                  {/* {TotalAmoutTransfer?.toFixed(2)}{" "} */}
                                  {SenderCountryCurrency}
                                </div>{" "}
                              </div>
                            </div>
                            <br />
                            <div className="d-flex justify-content-end">
                              <div className=" d-flex">
                                Transaction for:{" "}
                                <div className="">
                                  {SelectedReciptionName == null ||
                                  SelectedReciptionName == undefined ||
                                  SelectedReciptionName?.length == 0
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
                      id="transactionTable"
                      className="bg-white pt-2 border"
                      style={{ width: "100%", tableLayout: "fixed" }}
                    >
                      <thead>
                        <tr>
                          <th
                            className="item-stock pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            Transaction <br /> Date
                          </th>
                          <th
                            className="item-stock pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            Control No.
                          </th>
                          <th
                            className="item-stock pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            Receiver <br /> Details
                          </th>
                          <th
                            className="item-stock pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            Send <br /> Amount
                          </th>
                          {/* <th
                            className="pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            Promocode <br /> Discount
                          </th><th
                            className="pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            Used <br /> Cash
                          </th> */}
                          <th
                            className="item-stock pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            Service <br /> Charge
                          </th>
                          <th
                            className="item-stock pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            Rate
                          </th>
                          <th
                            className="item-stock pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            Received <br /> Amount
                          </th>
                          <th
                            className="item-stock pe-0 text-center"
                            style={{ wordBreak: "break-all" }}
                          >
                            Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {DTransactionData?.length > 0 ? (
                          DTransactionData?.map((data, index) => (
                            <tr className="border-bottom" key={index}>
                              <td className="item-stock ps-3 text-center">
                                {moment(data?.updatedAt).format("DD MMM YYYY")}
                                <br />
                                {moment(data?.updatedAt).format("hh:mm:ss a")}
                              </td>
                              <td
                                className="item-stock p-1 text-center"
                                style={{ wordBreak: "break-all" }}
                              >
                                {data?.controlNo}
                              </td>

                              <td className="item-stock p-1 text-center">
                                <div style={{ wordBreak: "break-all" }}>
                                  {data?.recipientName}
                                </div>
                                <br/>
                                <div style={{ wordBreak: "break-all" }}>
                                  {data?.bankName}
                                </div>
                                <br/>
                                <div style={{ wordBreak: "break-all" }}>
                                  {/* {data?.bankAccNo} */}
                                  {data?.bankAccNo == ""
                                    ? data?.walletNo
                                    : data?.bankAccNo}
                                </div>
                              </td>
                              <td className="item-stock p-1 text-center">
                                {data?.amount} {data?.sendingCurrencyCode}
                                <br />

                                {
                                  data?.usedCash == 0 ? 
                                  ""
                                  :
                                  (
                                    <div
                                      // className={
                                      //   data?.usedCash == 0 ? "d-none" : ""
                                      // }
                                    >
                                      *UR : - {data?.usedCash}
                                      {/* <br />
                                      Actual Pay :{" "}
                                      {Number(data?.amount) -
                                        Number(data?.usedCash)} */}
                                    </div>
                                  )
                                }
                                
                              </td>
                              {/* <td className="item-stock p-1 text-center">{Number(data?.promoCodeExRateDiscAmt) + Number(data?.promoCodeServiceChargeDiscAmt)}</td>
                              <td className="item-stock p-1 text-center">{data?.usedCash}</td> */}
                              <td className="item-stock p-1 text-center">
                                {Number((Number(data?.serviceCharge) -
                                  Number(
                                    data?.promoCodeServiceChargeDiscAmt
                                  ))?.toString()?.match(/^\d+(?:\.\d{0,2})?/))}{" "}
                                {data?.sendingCurrencyCode}
                                {/* {data?.serviceCharge} */}
                              </td>
                              <td className="item-stock p-1 text-center">
                                {data?.exchangeRate}  {data?.recevingCurrencyCode}
                                <br></br>
                                {
                                  data?.premimumExAmt == 0 ||
                                  data?.premimumExRate == 0 ?
                                  ""
                                  :
                                  (
                                    <div
                                      // className={
                                      //   data?.premimumExAmt == 0 ||
                                      //   data?.premimumExRate == 0
                                      //     ? "d-none"
                                      //     : ""
                                      // }
                                    >
                                      Premium rate :
                                      <br />
                                      {Number(data?.exchangeRate) +
                                        Number(data?.premimumExRate)}{" "}
                                      {data?.sendingCurrencyCode} =
                                      {Number((data?.receivingAmount)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))}{" "}
                                      {data?.recevingCurrencyCode}
                                    </div>
                                  )
                                }
                                
                              </td>
                              <td className="item-stock p-1 text-center">
                                {Number((data?.receivingAmount)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))} {data?.recevingCurrencyCode}
                                {/* {(data?.receivingAmount).toFixed(2)} {data?.recevingCurrencyCode} */}
                              </td>
                              <td className="item-stock ps-3 text-center">
                                {/* {data?.transactionStatus} */}
                                {data?.transactionStatus == "Compliance Hold"
                                  ? data?.isPaymentRecieved ? "Confirmed" : "Unconfirmed"
                                  : data?.transactionStatus}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="10" className="text-center py-5">
                              <b>No Statement Data</b>
                            </td>
                          </tr>
                        )}

                        {DTransactionData?.length > 0 ? (
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
                                {SendingAmount} {SCCode}
                                {
                                  SendingUC == 0 ? "" :` - ${SendingUC} ${SCCode}`
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
                                Note : For Transaction {PremiumRateTransaction.length == 0 ? "0" : PremiumRateTransaction[0]?.controlNo}, premium rate of {PremiumRateTransaction.length == 0 ? "0" : PremiumRateTransaction[0]?.premimumExRate} was applied on amount {PremiumRateTransaction.length == 0 ? "0" : PremiumRateTransaction[0]?.premimumExAmt}.
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

                            <tr style={{backgroundColor:"red"}}>
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
                    <br />

                    <br />
                    {/* <div className="topbottomborder">
                      <h5 className="pt-1">
                        AUD Amount (in words) : {S_words}
                      </h5>

                      <h5>NPR Amount (in words) : {R_words}</h5>
                    </div> */}
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
        <Footer></Footer>
      </section>
    </>
  );
}
