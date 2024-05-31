import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { CommonConstants } from '../../../Constants/common.constants';
import Pagination from '@mui/material/Pagination';
import Loader from "../../Loader/Loader";
import ModalComponent from "../ModalComponent";
import ModalComponentPopup from "../ModalComponentPopup";
import Form from 'react-bootstrap/Form';
import NoRecordWithAddBtn from "../../../Helpers/NoRecord/NoRecordWithAddBtn";
import NoRecord from "../../../Helpers/NoRecord/NoRecord";
export default function NotificationTemplate() {

  const [loadervalue, setloadervalue] = useState(false);
  const [data, setdata] = useState([]);
  const [CountPage, SetCountPage] = React.useState(0);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [Search, SetSearch] = React.useState('');
  const [numItems, SetNumItems] = React.useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [id, setId] = useState(0);
  const navigate = useNavigate()
  const navigateToNotificationCreate = () => {
    navigate({ pathname: '/notification-template-create', state: true })
  }

  const confirmClick = async (id) => {
    setmodalShowPrChange(true)
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const AccountCategoryListGet = () => {
    setloadervalue(true);
    Search === "" ? setloadervalue(true) : setloadervalue(false)

    var InputParameter = {
      pageindex: Page,
      pagesize: RowsPerPage,
      searchdata: Search === "" ? '%%' : Search,
      sortparam: 'create_at',
      sortorder: 'DESC'
    };
    const AccountCategoriesList = Axios({
      url:
        CommonConstants.BASE_URL + "/getallnotificationtemplates",
      method: "POST",
      data: InputParameter,
    });
    AccountCategoriesList.then((Result) => {
      setdata(Result.data.data)
      SetCountPage(Result.data.totalPageCount)
      SetNumItems(Result.data.recordCount);
      setShowSearch(Result.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      setloadervalue(false);
    });

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
    // document.getElementById("hideloding").style.display = "block";
  };

  const RequestSearch = (Event) => {
    if (Event.key === "Enter") {
      var SearchedVal = document.getElementById("search").value;
      SetSearch('%' + SearchedVal + '%');
      SetPage(1);
    }
  };

  useEffect(() => {
    AccountCategoryListGet();
  }, [Page, RowsPerPage, Search])

  const handleEditIcon = (id) => {
    navigate({ pathname: '/notification-template-create', state: id })
  }

  const handleDeleteClick = async () => {
    // setloadervalue(true);
    setmodalShowPrChange(false);

    await Axios.post(`${CommonConstants.BASE_URL}/deletenotificationtemplatebyid`, {
      id: id
    }).then(res => {
      setModalShow(true)
      AccountCategoryListGet()
      setloadervalue(false);
    })
      .catch((err) => {
        console.log(err);
        setloadervalue(false);
      })

  }
  const handleSearch = (e) => {
    SetPage(1);
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(data.length > 0 || searchTerm.trim() !== '');
  }

  return (
    <div>
      <div>
        <div className="container-fluid" onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
          <PageHeader
            HeaderText="Notification Template"
            Breadcrumb={[
              { name: "Dashboard", navigate: "" },
              { name: "IoT Dashboard", navigate: "" },
            ]}
          />
          <div className="row clearfix">
            {loadervalue == true ? <Loader /> : ""}
            <div className="col-lg-12 col-md-12">
              <div className="card">
                <div className="body project_report">
                  <div className="table-responsive">



                    <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                      {data && data.length > 0 &&
                        <div className="filter-row pb-2 ">
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
                        </div>
                      }
                      <div className="d-flex align-items-center respoChildFooter">
                        {showSearch && <div className="form-group d-flex align-items-center mb-0">
                          <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                          <input
                            type="search"
                            id="search"
                            className="form-control p-0 px-3 "
                            placeholder=""
                            onChange={handleSearch}
                          />
                        </div>} &nbsp;
                        {data && data.length >= 0 && Search === '' &&
                          <div className="">
                            <div className=" ps-0 d-flex justify-content-end">
                              <a
                                onClick={() => {
                                  navigateToNotificationCreate()
                                }}
                                className="btn btn-default purpleBackground text-white bolder pbSt"
                              >
                                <i className="text-white fa fa-plus bolder"></i> Add New
                              </a>
                            </div>
                          </div>}

                      </div>
                    </div>
                    {data && data.length > 0 ?
                      (<div style={{ overflowX: "auto" }}>
                        <table className="table m-b-0 ">
                          <thead className="thead-light">
                            <tr>
                              <th>Title</th>
                              <th>Status</th>
                              <th>Transaction</th>
                              <th>KYC</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          {data.map((item) => {
                            return (
                              <tbody>
                                <tr>
                                  <td>{item?.title}</td>
                                  <td> {item?.isEnabled == true ? 'Active' : 'Inactive'}</td>
                                  <td>{item.isTransaction == true ? 'True' : 'False'}</td>
                                  <td>
                                    {item.isKyc == true ? "True" : "False"}
                                  </td>
                                  <td className="project-actions">
                                    <a onClick={(e) => handleEditIcon(item.id)} className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                      <i className="fa fa-edit " title="Edit"></i>
                                    </a>{" "}
                                    &nbsp;
                                    <a onClick={() => {
                                      confirmClick(item.id)
                                      // setModalShow(true)
                                    }} className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                      <i className="fa fa-trash" style={{ color: "red" }} title="Delete"></i>
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            )
                          })}
                        </table>
                      </div>)
                      : Search === '' ? (<NoRecord />) : (<NoRecordWithAddBtn />)}
                    {
                      data && data.length > 0 &&
                      <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                        <div className="filter-row pt-2">
                          {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                        </div>
                        <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                      </div>
                    }

                    <ModalComponent
                      show={modalShow}
                      title11={"Deleted successfully"}
                      onHide={() => setModalShow(false)}
                    />
                    <ModalComponentPopup
                      show={modalShowPrChange}
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
