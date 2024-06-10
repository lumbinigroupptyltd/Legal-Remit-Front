import React, { useEffect, useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { CommonConstants } from "../../../../Constants/common.constants"
import ModalComponent from "../../ModalComponent";
import ModalComponentPopup from '../../ModalComponentPopup';
import Pagination from '@mui/material/Pagination';

import Form from 'react-bootstrap/Form';
import NoRecordWithAddBtn from "../../../../Helpers/NoRecord/NoRecordWithAddBtn";
import NoRecord from "../../../../Helpers/NoRecord/NoRecord";

export default function IdIssuingAuthority() {
  const [loadervalue, setloadervalue] = useState(false);
  const [allUsers, setallUsers] = useState([])
  const [Country, setCountry] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);

  const [CountPage, SetCountPage] = React.useState(0);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [Search, SetSearch] = React.useState("");
  const [numItems, SetNumItems] = React.useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const confirmClick = async (id) => {
    setmodalShowPrChange(true)
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const GetAllCountrys = async (values) => {
    try {

      const response = await axios.get(CommonConstants.BASE_URL + "/getallcountries");
      // console.log(response)/////login na responce ma email mangavo padse localstorage ma save karava mate /////
      if (response.data.status === true) {

        // console.log(response.data.data)
        setCountry(response.data.data)

      }
      else if (response.data.status === "error") {
        // console.log(response.data.message)
      }
    }


    catch (err) {
      // console.log(err)
    }
  };


  const navigate = useNavigate()
  const redirectCreateServiceCharge = () => {
    window.scrollTo(0, 0)
    navigate("/create-id-issuing-authority")
  }




  const getAllDataIdIssuing = async () => {
    setloadervalue(true);
    try {
      var InputParameter = {
        pageindex: Page,
        pagesize: RowsPerPage,
        searchdata: '%' + Search + '%',
        sortparam: "create_at",
        sortorder: "ASC",
      };
      const responseData = await axios.post(
        CommonConstants.BASE_URL + "/getallissueauthority",
        InputParameter
      );
      SetCountPage(responseData.data.totalPageCount);
      SetNumItems(responseData.data.recordCount);
      setShowSearch(responseData.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      setallUsers(responseData.data.data);
      setloadervalue(false);
    } catch (error) {
      console.log(error);
      setloadervalue(false);
    }
  }

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(Page);
    } else {
      SetPage(NewPage);
    }
  };

  const ChangeRowSelected = (Event) => {
    console.log(Event.target.value)
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
  };


  const RequestSearch = (Event) => {
    if (Event.key === "Enter") {
      var SearchedVal = document.getElementById("search").value;
      SetSearch('%' + SearchedVal + '%');
      SetPage(1);
    }
  };

  const handleDeleteClick = async () => {
    setmodalShowPrChange(false);
    await axios.post(`${CommonConstants.BASE_URL}/deleteissueauthority`, {
      id: id
    }).then(res => {
      setModalShow(true);
      getAllDataIdIssuing();
    }).catch(err => {
      console.log(err, "err")
    })
  }

  const handleUpdateClick = (id) => {
    navigate("/create-id-issuing-authority", id)
  }
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(allUsers.length > 0 || searchTerm.trim() !== '');
    SetPage(1)
  }

  //getallusers api
  useEffect(() => {
    getAllDataIdIssuing()
    GetAllCountrys()
  }, [Page, RowsPerPage, Search])

  return (
    <>
      <div onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }} >
        <div className="container-fluid">
          <PageHeader HeaderText="Id Issuing Authority" Breadcrumb={[{ name: "Id Issuing Authority", navigate: "" }, { name: "Id Issuing Authority", navigate: "" }]} />
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12">
              <div className="card">
                <div className="body project_report">
                  <div className="table-responsive">
                    <div className="row d-flex g-0">
                      <div className=" d-flex justify-content-end">
                      </div>
                    </div>
                    <div className="row">
                    </div>
                    <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                      {allUsers && allUsers.length > 0 && <div className="filter-row pb-2 ">
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
                      <div className="d-flex pbSt align-items-center respoChildFooter ">
                        {showSearch && <div className="form-group d-flex align-items-center pbSt mb-0">
                          <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                          <input
                            type="search"
                            className="form-control p-0 px-3"
                            placeholder=""
                            onChange={handleSearch}
                          />
                        </div>}&nbsp; &nbsp;
                        {allUsers.length >= 0 && Search === '' && <a
                          className="btn btn-default respoAddNew purpleBackground text-white bolder"
                          onClick={() => {
                            redirectCreateServiceCharge()
                          }}
                        >
                          <i className="text-white fa fa-plus bolder"></i> Add New
                        </a>}
                      </div>
                    </div>
                    {
                      allUsers && allUsers.length > 0 ?
                        <div style={{ overflowX: "auto" }}>
                          <table className="table m-b-0 ">
                            <thead className="thead-light">
                              <tr>
                                <th>Nationality</th>
                                <th>Country</th>
                                <th>Id Issuing Authority</th>
                                <th>Actions</th>

                              </tr>
                            </thead>
                            {allUsers?.map((item) => {
                              return (
                                <tbody>
                                  <tr>
                                    <td>{!!(item.nationality) ? item.nationality : "-"}</td>
                                    <td className="project-title">
                                      <h6>
                                        <a>{(item.countryName == null ? "-" : item.countryName)}</a>
                                      </h6>
                                    </td>
                                    <td>{item.authorityName}</td>
                                    <td className="project-actions">
                                      <a onClick={() => handleUpdateClick(item.id)}
                                        className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                        <i className="fa fa-edit " title="Edit"></i>
                                      </a>{" "}
                                      &nbsp;
                                      <a onClick={() => {
                                        confirmClick(item.id)
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
                        </div>
                        : Search === '' ? <NoRecord /> : <NoRecordWithAddBtn />}
                    {allUsers && allUsers.length > 0 && <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                      <div className="filter-row pt-2">
                        {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                      </div>
                      <Pagination count={Number(CountPage)} page={Page} className="pbDowSt" onChange={HandleChangePage} color="secondary" shape="rounded" />
                    </div>}
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
    </>
  )
}