import React, { useEffect, useState } from "react";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import PageHeader from "../../components/PageHeader";
import Form from 'react-bootstrap/Form';

const TransactionUtility = () => {
  const [allTarnsation, setAllTransaction] = useState([]);
  const [page, setPage] = useState(1);
  const [numItems, SetNumItems] = useState(0);
  const [RowsPerPage, setRowsPerPage] = useState(10);
  const [CountPage, SetCountPage] = useState(0);
  const [recipients, setRecipients] = useState([]);
  const [Search, SetSearch] = useState('');
  const [totalAmount, settotalAmount] = useState(0);
  const[totalServiceCharge,setTotalServiceCharge]=useState(0);
  const[flag,setFlag]=useState("AUD");

  const getAllTransaction = async () => {
    try {
      const payload = {
        pageindex: page,
        pagesize: RowsPerPage,
        searchdata: '%'+Search+'%',
        status: "",
        sortparam: "create_at",
        sortorder: "DESC"
      };

      const response = await axios.post(CommonConstants.NEW_BASE_URL + "/getalltransactions", payload);
      const transactions = response.data.data;
      SetCountPage(response.data.totalPageCount);
      SetNumItems(response.data.recordCount);

      // Fetch recipient data for each transaction
      const transactionsWithRecipients = await Promise.all(
        transactions.map(async (transaction) => {
          const recipientResponse = await axios.post(CommonConstants.BASE_URL + `/getrecipientsbyid`, { id: transaction.recipientId });
          const recipientData = recipientResponse.data.data;

          // Format date string to desired format
          const formattedDate = new Date(transaction.create_at).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            day: "numeric",
            month: "short",
            year: "numeric"
          });

          return { ...transaction, recipientData, formattedDate };
        })
      );

      setAllTransaction(transactionsWithRecipients);
      let totalAmount = 0;
      let totalServiceChare = 0;

      transactionsWithRecipients.forEach((transaction) => {
        totalAmount += transaction.amount;
        totalServiceChare += transaction.serviceCharge;
      });
      settotalAmount(totalAmount);
      setTotalServiceCharge(totalServiceChare);
    } catch (error) {
      console.log(error);
    }
  };
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
  const handlSearch = (e) => {
    SetSearch(e.target.value)
    setPage(1);
  }
  useEffect(() => {
    getAllTransaction();
  }, [page,Search,RowsPerPage]);

  return (
    <>
      <div className="row clearfix">
        <PageHeader
          HeaderText="Transaction "
          Breadcrumb={[
            { name: "Dashboard", navigate: "" },
            { name: "IoT Dashboard", navigate: "" },
          ]}
        />
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="body project_report">
              <div className="table-responsive">
                <div className="d-flex justify-content-between">
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
                  <div className="form-group d-flex align-items-center">
                    <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                    <input
                      type="search"
                      id="search"
                      className="form-control p-0 ps-3 pe-3"
                      // onKeyPress={RequestSearch}
                      placeholder=""
                      onChange={handlSearch}
                    />
                  </div>
                </div>
                <div>
                  <table className="table m-b-0 ">
                    <thead className="thead-light">
                      <tr>
                        <th>Sender1 Details</th>
                        <th>Amount  Details</th>
                        <th>Receiver  Details</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {
                      allTarnsation && allTarnsation.map((row) => {
                        return (
                          <tbody>
                            <tr>
                              <td>
                                <p></p>
                                <p> Sender Name: {row.userName}</p>
                                <p> Email: {row.email}</p>
                                <p> Mobile: {row.email}</p>
                                <p> Amt: {row.email}</p>
                                <p> Note: {row.email}</p>
                              </td>
                              <td>
                                <p>{row.sendingCurrencyCode}: {row.amount}</p>
                                <p>{row.recevingCurrencyCode}: {Number(((row.amount + row.serviceCharge) * row.exchangeRate)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))}</p>
                                {/* <p>{row.recevingCurrencyCode}: {((row.amount + row.serviceCharge) * row.exchangeRate).toFixed(2)}</p> */}
                                <p>ExchangeRate : {row.exchangeRate}</p>
                                <p>ServiceCharge : {row.serviceCharge}</p>
                                <p>DeliveryMethodName : {row.deliveryMethodName}</p>
                                <p>Receipt :</p>
                              </td>
                              {row?.recipientId == row?.recipientData?.id &&
                                <td>
                                  <p> ReceiverName:{row.recipientData.firstName}{" "}{row.recipientData.lastName} </p>
                                  <p> Mobile No: {row.recipientData.phone}</p>
                                  <p> Bank Name: {row.recipientData.bankName}</p>
                                  <p> Account No: {row.recipientData.bankAccNo} </p>
                                  <p> Country: {row.recipientData.countryName} </p>
                                  <p> Email: {row.recipientData.email} </p>
                                </td>}
                              <td>{row.transactionStatus}</td>
                            </tr>
                          </tbody>
                        )
                      })
                    }
                  </table>
                  <div className="d-flex justify-content-between pt-4 mr-4 mr-4">
                    {/* <div className="filter-row pt-2">
                      {numItems > 0 ? `Showing ${(page - 1) * RowsPerPage + 1} to ${(page * RowsPerPage) > numItems ? numItems : (page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                    </div> */}
                    <Pagination count={CountPage} className="pbDowSt pbSt" page={page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                  </div>
                  <div className="d-flex justify-content-between pt-4 mr-4 mr-4">
                    <div>
                      <p>Total Transaction Count : {numItems}</p>
                    </div>
                    <div>
                      <p> Total Amount :{flag}{" "}{totalAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/)}</p>
                      {/* <p> Total Amount :{flag}{" "}{totalAmount.toFixed(2)}</p> */}
                    </div>  <div>
                      <p>Total ServiceCharge Count :{flag}{" "}{totalServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/)}</p>
                      {/* <p>Total ServiceCharge Count :{flag}{" "}{totalServiceCharge.toFixed(2)}</p> */}
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
export default TransactionUtility;