import React, { useEffect, useState } from 'react'
import PageHeader from '../../../../components/PageHeader'
import { CommonConstants } from '../../../../Constants/common.constants';
import axios, { Axios } from 'axios';
import Form from 'react-bootstrap/Form';
import moment from 'moment';
import Pagination from "@mui/material/Pagination";
import Loader from '../../../Loader/Loader';

export default function PayoutPartner() {
  const [loadervalue, setloadervalue] = useState(false);
  const [data, setdata] = useState([]);
  const [CountPage, SetCountPage] = useState(0);
  const [Page, SetPage] = useState(1);
  const [RowsPerPage, SetRowsPerPage] = useState(
    CommonConstants.DefaultPageSize
  );
  const [Page2, SetPage2] = useState(1);
  const [RowsPerPage2, SetRowsPerPage2] = useState(
    CommonConstants.DefaultPageSize
  );
  const [selectedValue, setSelectedValue] = useState(0);
  const [Search, SetSearch] = useState("");
  const [numItems, SetNumItems] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [PartnerBanksData, setPartnerBanksData] = useState([]);
  const getAllPartnerBankList = () => {
    var InputParameter = {
      pageindex: Page2,
      pagesize: RowsPerPage2,
      searchdata: "",
      sortparam: "create_at",
      sortorder: "DESC",
    };
    const AccountCategoriesList = axios({
      url: CommonConstants.BASE_URL + "/getallpartnerbanks",
      method: "POST",
      data: InputParameter,
    });
    AccountCategoriesList.then((Result) => {
      setdata(Result.data.data);
    });
  };

  const handleSelectChange = (event) => {
    const values = event.target.value;
    setSelectedValue(values);
    getTransactionsByPartnerBank(values);
  };
  const getTransactionsByPartnerBank = async (values) => {
    setloadervalue(true);
    const paylaod = new FormData();
    paylaod.append('partBankId', values ? values : selectedValue);
    paylaod.append('pageindex', Page);
    paylaod.append('pagesize', RowsPerPage);
    paylaod.append('searchdata', Search);

    await axios.post(CommonConstants.NEW_BASE_URL + "/gettransactionsbypartnerbank", paylaod).then((responce) => {
      setPartnerBanksData(responce.data.data);
      SetCountPage(responce.data.totalPageCount);
      SetNumItems(responce.data.recordCount);
      setShowSearch(responce.data.recordCount == 0 ? (Search == "" ? false : true) : true);
    }).catch(error => console.log(error));

    setloadervalue(false);
  }

  const calculateTimeDifference = (createdAt) => {
    const now = moment();
    const receivedDate = moment(createdAt);
    const diffInDays = now.diff(receivedDate, 'days');

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return '1 day ago';
    } else if (diffInDays > 1 && diffInDays <= 31) {
      return `${diffInDays} days ago`;
    } else if (diffInDays > 31) {
      const diffInMonths = Math.floor(diffInDays / 31);
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
    }
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
    }
  };

  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
  };

  const handleSerach = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    SetPage(1);
    setShowSearch(PartnerBanksData.length > 0 || searchTerm.trim() !== '');
  };
  useEffect(() => {
    getAllPartnerBankList();
    if (selectedValue) {
      getTransactionsByPartnerBank();
    }
  }, [Page, RowsPerPage, Search]);
  return (

    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="container-fluid">
        <PageHeader
          HeaderText="Partner Bank API"
          Breadcrumb={[
            { name: "Dashboard", navigate: "" },
            { name: "IoT Dashboard", navigate: "" },
          ]}
        />
        <div className="row clearfix" onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="body project_report">
                <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                  {
                    PartnerBanksData && PartnerBanksData.length > 0 &&
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
                    {showSearch && <div className="form-group d-flex align-items-center mb-0 pbDowSt">
                      <label className="font-weight-normal mb-0">
                        Search:{" "}
                      </label>{" "}
                      &nbsp;&nbsp;
                      <input
                        type="search"
                        id="search"
                        className="form-control p-0 px-3"
                        placeholder=""
                        onChange={handleSerach}
                      />
                    </div>}{" "}
                    &nbsp;&nbsp;
                    <div className="row d-flex g-0">
                      <div className="justify-content-end d-block ms-auto">
                        <Form.Select
                          className="py-2 pe-5 border border-black  ms-auto"
                          value={selectedValue}
                          onChange={handleSelectChange}
                        >
                          <option value="">Select an option</option>
                          {data && data.map((row) => (
                            <option key={row.id} value={row.id}>
                              {row.name}
                            </option>
                          ))}
                        </Form.Select>
                      </div>
                    </div>

                  </div>
                </div>
                {/* <div className="row d-flex g-0">
                  <div className="pb-4 justify-content-end d-block ms-auto">
                    <Form.Select
                      className="py-1 border border-black w-25 ms-auto"
                      value={selectedValue}
                      onChange={handleSelectChange}
                    >
                      <option value="">Select an option</option>
                      {data && data.map((row) => (
                        <option key={row.id} value={row.id}>
                          {row.name}
                        </option>
                      ))}
                    </Form.Select>
                  </div>
                </div> */}

                <div className="table-responsive mt-3">
                  <table className="table m-b-0  " >
                    <thead className="thead-light">
                      <tr>
                        <th>Sender/Receiver</th>
                        <th>Amount</th>
                        <th>Recieved</th>
                        <th>Method</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PartnerBanksData && PartnerBanksData.length > 0 ?
                        (PartnerBanksData.map((row) => {
                          return (
                            <>
                              <tr>
                                <td>{row.userName == null ? "-" : row.userName} / {row.recipientName == null ? "-" : row.recipientName}</td>
                                <td>{row.amount == null ? "-" : row.amount}</td>
                                <td>{calculateTimeDifference(row.created_at)}</td>
                                <td>{row.method == null ? "-" : row.method}</td>
                                <td>{row.type == null ? "-" : row.type}</td>
                              </tr>
                            </>
                          )
                        }))
                        : Search == "" ? <td colSpan={7}><p className='text-center'>Please Choose Partner Banks</p></td>
                          : <td colSpan={7}><p className='text-center'>No Data Found </p></td>}
                    </tbody>
                  </table>

                  {PartnerBanksData &&
                    PartnerBanksData.length > 0 &&
                    < div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                      <div className="filter-row pt-2 pbSt">
                        {numItems > 0
                          ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${Page * RowsPerPage > numItems
                            ? numItems
                            : Page * RowsPerPage
                          } of ${numItems} entries`
                          : "No records Available"}
                      </div>
                      <Pagination
                        count={CountPage}
                        page={Page}
                        onChange={HandleChangePage}
                        color="secondary"
                        shape="rounded"
                      />
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
