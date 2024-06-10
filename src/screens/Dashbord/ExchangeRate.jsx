import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import moment from "moment";
import Axios from 'axios';
import ModalComponent from "./ModalComponent";
import Pagination from '@mui/material/Pagination';
import Loader from "../Loader/Loader";
import ModalComponentPopup from "./ModalComponentPopup";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Form, Col } from 'react-bootstrap';
import NoRecordWithAddBtn from "../../Helpers/NoRecord/NoRecordWithAddBtn";
import NoRecord from "../../Helpers/NoRecord/NoRecord";

export default function ExchangeRate() {
  window.scrollTo(0, 0);
  const navigate = useNavigate()
  const addExchangeRate = () => {
    navigate({ pathname: '/exchange-rate-form', state: true })

  }

  const [allExchangerate, setallExchangerate] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [Search, SetSearch] = React.useState('');
  const [Page, SetPage] = React.useState(1);
  const [CountPage, SetCountPage] = React.useState(0);
  const [loadervalue, setloadervalue] = useState(false)
  const [numItems, SetNumItems] = React.useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    const inputDate = e.target.value;
    const formattedDate = moment(inputDate).format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
  };



  const getAllExchangeRate = async () => {
    Search === "" ? setloadervalue(true) : setloadervalue(false);
    const payload = {
      pageindex: Page,
      pagesize: RowsPerPage,
      searchdata: selectedDate == "Invalid date" ? "" : selectedDate,
      sortparam: "created_at",
      sortorder: "DESC"
    }
    const AccountCategoriesList = Axios({
      url:
        CommonConstants.BASE_URL + "/getallexchangerates",
      method: "POST",
      data: payload,
    });
    AccountCategoriesList.then((Result) => {
      setallExchangerate(Result.data.data)
      SetCountPage(Result.data.totalPageCount)
      setloadervalue(false)
      SetNumItems(Result.data.recordCount)
    });
  }

  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const confirmClick = async (id) => {
    setmodalShowPrChange(true)
    setId(id);
  };

  const RequestSearch = (Event) => {
    if (Event.key === "Enter") {
      var SearchedVal = document.getElementById("search").value;
      SetSearch('%' + SearchedVal + '%');
      SetPage(1);
    }
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

  const handleEditClick = (id) => {
    navigate({
      pathname: "/exchange-rate-form",
      state: id
    })
    
  }

  const handleDeleteClick = async () => {
    setloadervalue(true)
    setmodalShowPrChange(false)
   
    await axios.post(`${CommonConstants.BASE_URL}/deleteexchangeratebyid`, {
      id: id
    }).then(res => {
      if (res.data.statuscode == 200) {
        setModalShow(true)
      }
      
      getAllExchangeRate()
      setloadervalue(false)
    }).catch(err => {
      
      setloadervalue(false)
    })
  }

  useEffect(() => {
    getAllExchangeRate()
  }, [Page, RowsPerPage, Search, selectedDate])
  return (
    <div
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container-fluid">
          {loadervalue == true ? <Loader /> : ""}
          <PageHeader
            HeaderText="Exchange Rate"
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
                      <div className=" justify-content-end d-flex">

                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                      {allExchangerate && allExchangerate.length > 0 && <div className="filter-row mb-2 ">
                        Show Entries &nbsp; &nbsp;
                        <div className="d-flex align-items-center pbSt">
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

                      <div className="form-group d-flex align-items-center mb-0 respoChildFooter">
                        <Form.Group
                          as={Col}
                          className=" input-container required pb-0 ps-0 pe-0 pbSt"
                        >
                          <Form.Control
                            type="date"
                            required
                            placeholder="From date"
                            name="Referal"
                            className=" reflink link py-2 pbSt"
                            value={selectedDate}
                            onChange={handleDateChange}
                          />
                        </Form.Group> &nbsp;&nbsp;
                        <a
                          className="pbSt purpleBackground btn btn-default text-white bolder"
                          onClick={() => {
                            addExchangeRate()
                          }}
                        >
                          <i className="text-white fa fa-plus bolder"></i> Add New
                        </a>
                      </div>
                    </div>

                    {allExchangerate && allExchangerate.length > 0 ?
                      (<div style={{ overflowX: "auto" }}>
                        <table className="table m-b-0 ">
                          <thead className="thead-light">
                            <tr >
                              <th>From</th>
                              <th>To</th>
                              <th >Deal Rate</th>
                              <th>Rate</th>
                              <th>Custom Rate</th>
                              <th>Valid From</th>
                              <th>Actions</th>

                            </tr>
                          </thead>
                          {
                            allExchangerate?.map(value => {
                              return (
                                <tbody>
                                  <tr>
                                    <td>{value?.fromCountryName}</td>
                                    <td>{value?.toCountryName}</td>
                                    <td className="project-title">
                                      <h6> <a> {value?.dealRate}</a> </h6>
                                    </td>
                                    <td>{Number(value?.publishedRate?.toString()?.match(/^\d+(?:\.\d{0,4})?/))}</td>
                                    <td>{Number(value?.customPublishedRate?.toString()?.match(/^\d+(?:\.\d{0,4})?/))}</td>
                                    {/* <td>{value?.publishedRate.toFixed(4)}</td>?.toString()?.match(/^\d+(?:\.\d{0,2})?/)
                                    <td>{value?.customPublishedRate.toFixed(4)}</td> */}
                                    <td>{moment(value?.createdAt).format('MM/DD/YYYY HH:MM:SS')}</td>
                                    <td>
                                      {/* <a onClick={()=>handleEditClick(value.id)} className="btn btn-outline-secondary mr-1">
                                    <i chttps://meet.google.com/iik-rbdp-fnp?authuser=0lassName="fa fa-edit "></i>
                                  </a>{" "}
                            &nbsp; */}
                                      <a onClick={() => {
                                        confirmClick(value.id)
                                      }} className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                        <i className="fa fa-trash" style={{ color: "red" }} title="Delete"></i>
                                      </a>
                                    </td>
                                  </tr>

                                </tbody>
                              )
                            })
                          }


                        </table>
                      </div>)
                      : selectedDate === '' ? (<NoRecord />) : (<NoRecordWithAddBtn />)}

                    {allExchangerate && allExchangerate.length > 0 ?
                      <div className="d-flex paginationBetween pt-4 respoChildFooter">
                        <div className="filter-row pt-2">
                          Showing {(Page - 1) * RowsPerPage + 1} to {(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of {numItems} entries
                        </div>
                        <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} />

                      </div>
                      : ""}


                    <ModalComponent
                      show={modalShow}
                      title11={"Exchange Rate deleted successfully"}
                      onHide={() => setModalShow(false)}
                    />
                    <ModalComponentPopup
                      show={modalShowPrChange}
                      // onHide={modalShowPrChange}
                      title1={"Are you sure want to delete this record ?"}
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
  );
}


// const mapStateToProps = ({ }) => ({});

// export default connect(mapStateToProps, {
//   onPressSecuritySystem,
//   onPressMainGate,
//   onPressSwitchBordButton,
//   onPressOutSwitchBordButton,
//   onPressAppliencesSwitchBordButton,
//   onPressSwitchBordDropDown,
//   onPressOutdoorDropDown,
//   onPressSwithOnAllOut,
//   onPressAllOffLightOut,
//   onPressSwithOnAllIn,
//   onPressAllOffLightIn,
// })(ExchangeRate);
