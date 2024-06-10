import React, { useEffect, useRef, useState } from "react";
import "./TransactionInvoice.css";
import axios from "axios";
import { CommonConstants } from "../../../../Constants/common.constants";
import moment from "moment";
import { useReactToPrint } from "react-to-print";

export default function TransactionInvoice(props) {
  const [TransactionDataById, setTransactionDataById] = useState({});
  const [formattedDate, setformattedDate] = useState();
  const [UserInfo, setUserInfo] = useState([]);
  const [DownloadPdf, setDownloadPdf] = useState(false);

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

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

      }
    } catch (err) { }
  };

  const handleViewInvById = async () => {
    try {
      // setloadervalue(true)
      const payload = {
        id: props.location.state
      };

      await axios.post(
        CommonConstants.NEW_BASE_URL + "/gettransactionbyid",
        payload
      ).then((response) => {
        setTransactionDataById(response.data.data);
        console.log(response.data.data);
        // setControlledNumber(response.data.data.controlNo);
        setformattedDate(moment(new Date()).format("DD/MM/YYYY"))
        setDownloadPdf(true);
        // setloadervalue(false)
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleViewInvById();
    GetUserDetails();
    if (DownloadPdf == true) {
      handlePrint()
    }
  }, [DownloadPdf])
  return (
    <>
      <div className="row expanded my-5"      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
        <main className="columns">
          <div className="inner-container">
            <section className="row">
              <div className="callout large invoice-container" ref={printRef}>
                <table className="invoice w-100">
                  <tbody className="p-4">
                    {/* <tr className="header" >
                       <h2 className="purpleText text-center d-flex justify-content-center"> Transaction Details </h2>
                    </tr> */}
                    <tr className="header">
                      <td className="">
                        <img
                          src="https://dev.legalremitnepal.com.au/image/logo2.png"
                          alt="LegalRemit"
                          height={70}
                          width={170}
                        />
                      </td>
                      <td className="m-0 p-0">
                        <h3 className="mb-0 text-end pe-3 purpleText">
                          Transaction Details
                        </h3>
                      </td>
                    </tr>
                    <tr className="intro border-bottom">
                      <td className="">
                        <div className="d-flex justify-content-start">
                          <div>Tel: </div> &nbsp; <div> {UserInfo?.phone}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-start">
                          <div>Email :</div> &nbsp;{" "}
                          <div>{UserInfo?.email}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-start">
                          <div>ABN : </div> &nbsp; <div> 572699</div>
                        </div>
                      </td>

                      <td className="">
                        <div className="d-flex justify-content-end">
                          <div>Date: </div> &nbsp; <div> {formattedDate}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div>Transaction No.: </div> &nbsp; <div>{TransactionDataById?.id}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div>Customer ID: </div> &nbsp; <div> {UserInfo?.customerId}</div>
                        </div>
                        <br />
                        <div className="d-flex justify-content-end">
                          <div className="purpleText d-flex">
                            Control No: <div className="">&nbsp;{TransactionDataById?.controlNo} </div>{" "}
                          </div>
                        </div>
                      </td>
                      {/* <td className="text-right">
                      </td> */}
                    </tr>
                    {/* <hr></hr> */}
                    <tr className="header border-bottom">
                        <td>
                      <section className="additional-info">
                        <div className="row">
                          <div className="columns">
                            <h5 className="text-info mb-3">Sender</h5>
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Name: </div> &nbsp; <div className="col-lg-6 ps-0">Bibek Dhakal</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Country: </div> &nbsp; <div className="col-lg-6 ps-0">Australia</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">State: </div> &nbsp; <div className="col-lg-6 ps-0">Victoria</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Address: </div> &nbsp; <div className="col-lg-6 ps-0">SYDENY,(AU)</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Contact No. : </div> &nbsp; <div className="col-lg-6 ps-0">+61419850130</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Email: </div> &nbsp; <div className="col-lg-6 ps-0">philp@gmail.com</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Purpose: </div> &nbsp; <div className="col-lg-6 ps-0">Philip Brooks</div>
                            </div>
                            <br />
                          </div>
                         
                        </div>
                      </section>
                        </td>
                        <td className="d-block"> 
                        <section className="additional-info">
                            <div className="row">
                            <div className="columns">
                            <h5 className="text-info mb-3">Reciever</h5>
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Name: </div> &nbsp; <div className="col-lg-6 ps-0">Bibek Dhakal</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Relation: </div> &nbsp; <div className="col-lg-6 ps-0"> -- </div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Country: </div> &nbsp; <div className="col-lg-6 ps-0">Australia</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Address: </div> &nbsp; <div className="col-lg-6 ps-0">SYDENY,(AU)</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Contact No : </div> &nbsp; <div className="col-lg-6 ps-0">+61419850130</div>
                            </div>
                            <br />
                            <div className="d-flex">
                           <div className="col-lg-5 ps-0">Method: </div> &nbsp; <div className="col-lg-6 ps-0">Cash Pickup</div>
                            </div>
                            <br />
                       
                            <br />
                          </div>
                            </div>
                            </section>
                        </td>
                    </tr>

                    <div className="">

                    </div>
                  </tbody>
                </table>
                <table className="bg-white pt-2 w-100">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th colspan="4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td className="bolder border-right" colspan="4">
                        Money To Send
                      </td>
                      <td className="item-stock">{TransactionDataById?.amount}&nbsp;{TransactionDataById?.sendingCurrencyCode}</td>
                    </tr>
                    <tr>
                      <td className="bolder border-right" colspan="4">
                        Money To Recieve
                      </td>
                      <td className="item-stock">{TransactionDataById?.receivingAmount}&nbsp;{TransactionDataById?.recevingCurrencyCode}</td>
                    </tr>
                    <tr>
                      <td className="bolder border-right" colspan="4">
                        Exchange Rate
                      </td>
                      <td className="item-stock">{TransactionDataById?.exchangeRate}&nbsp;{TransactionDataById?.recevingCurrencyCode}</td>
                    </tr>
                    <tr>
                      <td className="bolder border-right" colspan="4">
                        Service Charge
                      </td>
                      <td className="item-stock">{TransactionDataById?.serviceCharge}&nbsp;{TransactionDataById?.sendingCurrencyCode}</td>
                    </tr>
                    <tr>
                      <td className="bolder border-right" colspan="4">
                        GST
                      </td>
                      <td className="item-stock">0.00&nbsp;{TransactionDataById?.sendingCurrencyCode}</td>
                    </tr>


                  </tbody>

                  <tfoot>
                    <tr className="text-offset border-top">
                      <td colspan="4" className="bolder border-right">Total Amount</td>
                      <td>{TransactionDataById?.totalPayable}&nbsp;{TransactionDataById?.sendingCurrencyCode}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
