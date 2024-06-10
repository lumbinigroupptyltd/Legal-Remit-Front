import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { CommonConstants } from "../../../Constants/common.constants";
import axios from "axios";
import ModalComponent from "../ModalComponent";
import Axios from "axios";
import Pagination from "@mui/material/Pagination";
import Loader from "../../Loader/Loader";
import ModalComponentPopup from "../ModalComponentPopup";
import Form from 'react-bootstrap/Form';
import NoRecordWithAddBtn from "../../../Helpers/NoRecord/NoRecordWithAddBtn";
import NoRecord from "../../../Helpers/NoRecord/NoRecord";
export default function PartnerBank() {
  const [allBankData, setallBankData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loadervalue, setloadervalue] = useState(false);

  const [data, setdata] = useState([]);
  const [CountPage, SetCountPage] = React.useState(0);
  const [Rows, SetRows] = React.useState([]);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(
    CommonConstants.DefaultPageSize
  );
  const [Search, SetSearch] = React.useState("");
  const [numItems, SetNumItems] = React.useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);

  const navigate = useNavigate();
  const redirectCreatePartnerBank = () => {
    navigate("/create-partner-bank");
  };
  const confirmClick = async (id) => {
    setmodalShowPrChange(true);
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const getAllPartnerBankList = () => {
    setloadervalue(true);
    Search === "" ? setloadervalue(true) : setloadervalue(false);
    var InputParameter = {
      pageindex: Page,
      pagesize: RowsPerPage,
      searchdata: Search,
      sortparam: "create_at",
      sortorder: "DESC",
    };
    const AccountCategoriesList = Axios({
      url: CommonConstants.BASE_URL + "/getallpartnerbanks",
      method: "POST",
      data: InputParameter,
    });
    AccountCategoriesList.then((Result) => {
      setdata(Result.data.data);
      SetCountPage(Result.data.totalPageCount);
      SetNumItems(Result.data.recordCount);
      setloadervalue(false);

    });
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
      // document.getElementById("hideloding").style.display = "block";
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
      // if (SearchedVal == Search) {
      //   SetSearch(SearchedVal);
      //   SetPage(1);
      // } else {
      //   SetSearch(SearchedVal);
      //   SetPage(1);
      // }
    }
  };
  const handleSerach = (e) => {
    SetSearch(e.target.value);
    SetPage(1);
  };
  // const getAllPartnerBankList = async () => {
  //   await axios.get(CommonConstants.BASE_URL + "/getallpartnerbanks",

  //   {
  //     headers: {
  //       //  Authorization:`Bearer ${token}`
  //     }
  //   })
  //   .then(res => {
  //     setallBankData(res.data.data);
  //     // console.log("xyz", res)

  //   })
  //   .catch(err => {
  //     // console.log(err)
  //   })
  // }

  useEffect(() => {
    getAllPartnerBankList();
  }, [Page, RowsPerPage, Search]);

  const handleDeleteClick = async () => {
    setmodalShowPrChange(false);
    setloadervalue(true);

    await axios
      .post(`${CommonConstants.BASE_URL}/deletepartnerbankbyid`, {
        id: id,
      })
      .then((res) => {
        if (res.data.status == true) {
          getAllPartnerBankList();
          setloadervalue(false);
          setModalShow(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setloadervalue(false);
      });
  };

  const handleUpdateClick = async (id) => {
    navigate("/create-partner-bank", id);
  };

  const cellStyle = {
    whiteSpace: 'normal', // Allow line breaks
    wordBreak: 'break-all', // Break long words
    textAlign: 'center' // Center-align the text
  };

  return (
    <div
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div>
          {loadervalue == true ? <Loader /> : ""}
          <div className="container-fluid">
            <PageHeader
              HeaderText="Payout Partner"
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
                      <div className="row"></div>
                      <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                        {
                          data && data.length > 0 &&
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
                          <div className="form-group d-flex align-items-center mb-0 pbDowSt">
                            <label className="font-weight-normal mb-0">
                              Search:{" "}
                            </label>{" "}
                            &nbsp;&nbsp;
                            <input
                              type="search"
                              id="search"
                              className="form-control p-0 px-3"
                              placeholder=""
                              onKeyPress={RequestSearch}
                              onChange={handleSerach}
                            />
                          </div>{" "}
                          &nbsp;&nbsp;
                          {
                            data && data.length >= 0 && Search === '' &&
                            <a
                              className="btn btn-default purpleBackground text-white bolder"
                              onClick={() => {
                                redirectCreatePartnerBank();
                              }}
                            >
                              <i className="text-white fa fa-plus bolder"></i> Add
                              New
                            </a>
                          }

                        </div>
                      </div>
                      {
                        data && data.length > 0 ?
                          <div style={{ overflowX: "auto" }}>
                            <table className="table m-b-0 ">
                              <thead className="thead-light">
                                <tr>
                                  <th>Country</th>
                                  <th>Partner Bank</th>
                                  <th>Logo</th>
                                  <th>Available Balance</th>
                                  <th>Reserve Balance</th>
                                  <th>Min Transaction <br></br> Amount</th>
                                  <th>Max Transaction <br /> Amount</th>
                                  <th>Commission For <br /> Bank Deposite</th>
                                  <th>Commission For <br /> Wallet Deposite</th>
                                  <th>Commission For  <br />Cash Pickup</th>
                                  <th>Enable</th>
                                  <th>Has Issue</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              {data.map((item) => {
                                return (
                                  <tbody>
                                    <tr>
                                      <td>{item.countryName}</td>
                                      <td>{item.name}</td>
                                      <td>
                                        <img
                                          src={CommonConstants.BASE_URL + item.logo}
                                          className="img-fluid"
                                          height="60"
                                          width="60"
                                        />
                                      </td>
                                      <td>{item.availableBalance}</td>
                                      <td>{item.maxProcessableAmount}</td>
                                      <td>{item.minTransaction}</td>
                                      <td>{item.maxTransaction}</td>
                                      <td>{item.commissionBank}</td>
                                      <td>{item.commissionWallet}</td>
                                      <td>{item.commissionCash}</td>
                                      <td>{item.enabled == true ? "True" : "False"}</td>
                                      <td>{item.hasIssue == true ? "True" : "False"}</td>
                                      <td className="project-actions">
                                        <a
                                          onClick={() => {
                                            handleUpdateClick(item.id);
                                          }}
                                          className="btn btn-outline-secondary mr-1"
                                        >
                                          <i className="fa fa-edit " title="Edit"></i>
                                        </a>{" "}
                                        &nbsp;
                                        <a
                                          onClick={() => {
                                            confirmClick(item.id);
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
                              })}
                            </table>
                          </div>
                          : Search === '' ? (<NoRecord />) : (<NoRecordWithAddBtn />)}

                      {
                        data && data.length > 0 &&
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

                      <ModalComponent
                        show={modalShow}
                        title11={"Deleted Successfully"}
                        onHide={() => setModalShow(false)}
                      />
                      <ModalComponentPopup
                        show={modalShowPrChange}
                        title1={"Are you sure want to delete this record  ?"}
                        cancle={(e) => handlePrchangePopupCancle(e)}
                        SavePr={() => handleDeleteClick()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
