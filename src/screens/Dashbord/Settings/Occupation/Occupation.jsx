import React, { useEffect, useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import { Modal } from 'react-bootstrap';
import { Form, Col } from 'react-bootstrap';
import axios from 'axios';
import { CommonConstants } from '../../../../Constants/common.constants';
import Pagination from '@mui/material/Pagination';
import ModalComponent from '../../ModalComponent';
import ModalComponentPopup from '../../ModalComponentPopup';
import NoRecordWithAddBtn from "../../../../Helpers/NoRecord/NoRecordWithAddBtn";
import NoRecord from "../../../../Helpers/NoRecord/NoRecord";
export default function Occupation() {

  const [modalShow, setModalShow] = useState(false);
  const [Occupation, setOccupation] = useState([]);
  const [getOccupation, setgetOccupation] = useState(true);
  const [editOccupation, seteditOccupation] = useState(false);
  const [Search, SetSearch] = useState('');
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [CountPage, SetCountPage] = React.useState(0);
  const [numItems, SetNumItems] = React.useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const [deleteModel, setDeletemodel] = useState(false)
  const [error, setError] = useState(false);
  const [occupationName, setOccupationName] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  useEffect((e) => {
    allOccupationdata(e)
  }, [Search, Page, RowsPerPage])

  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(Occupation.length > 0 || searchTerm.trim() !== '');
    SetPage(1);
  }
  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
    }
  };
  const confirmClick = async (id) => {
    setmodalShowPrChange(true)
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const allOccupationdata = async (e) => {
    seteditOccupation(false)
    try {
      const payloadd = {
        pageindex: Page,
        pagesize: RowsPerPage,
        searchdata: '%' + Search + '%',
        sortparam: "create_at",
        sortorder: "ASC"
      }
      const response = await axios.post(CommonConstants.BASE_URL + "/getalloccuptions", payloadd);
      if (response.data.status === true) {
        setOccupation(response.data?.data);
        SetCountPage(response.data?.totalPageCount);
        SetNumItems(response.data.recordCount);
        setShowSearch(response.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  const deleteOccupation = async () => {
    setmodalShowPrChange(false);
    try {
      const payload = {
        id: id
      }
      const response = await axios.post(CommonConstants.BASE_URL + "/deleteoccupationsbyid", payload);
      if (response.data.status === true) {
        setDeletemodel(true);
        allOccupationdata()
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const GetEditOccupation = async (id) => {
    try {
      const payload = {
        id: id
      }
      const response = await axios.post(CommonConstants.BASE_URL + "/getoccupationsbyid", payload);
      if (response.data.status === true) {
        seteditOccupation(true)
        setgetOccupation(response.data.data)
        setOccupationName(response.data.data.name)
        setModalShow(true)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const EditOccupation = async (e) => {
    try {
      if (occupationName == "" || occupationName == undefined) {
        setError(true);
      } else {
        const selectedName = document.getElementById("occupation-msg").value;
        const payload = {
          id: getOccupation.id,
          name: occupationName,
          moneyGramName: "",
          enabled: true
        }
        // if (selectedName !== occupationName) {
        const response = await axios.post(CommonConstants.BASE_URL + "/updateoccupations", payload);
        if (response.data.status === true) {
          setModalShow(false);
          allOccupationdata();
        }
        // } else {
        //   setModalShow(false);
        // }
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const AddOccupation = async (e) => {
    seteditOccupation(false)
    // setModalShow(true)
    try {
      if (occupationName == "" || occupationName == undefined) {
        setError(true);
      } else {
        const payload = {
          name: occupationName,
          moneyGramName: "",
          enabled: true
        }
        const response = await axios.post(CommonConstants.BASE_URL + "/addoccupations", payload);
        if (response.data.status === true) {
          setModalShow(false)
          allOccupationdata()
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleShow = () => {
    seteditOccupation(false);
    setModalShow(true);
    setOccupationName("");

  }
  return (
    <>
      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div >
            <div className="container-fluid">
              <PageHeader HeaderText="Occupation" Breadcrumb={[{ name: "Dashboard", navigate: "" }, { name: "IoT Dashboard", navigate: "" }]} />
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12">
                  <div className="card">
                    <div className="body project_report">
                      <div className="table-responsive">

                        <div className="row ">
                          <div className=" d-flex justify-content-end">

                          </div>
                        </div>
                        <div className="row">
                        </div>
                        <div className="d-flex justify-content-between align-items-center respoChildFooter">
                          {Occupation && Occupation.length > 0 && <div className="filter-row pb-2 pbSt">
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
                          </div>}
                          <div className="d-flex pbSt align-items-center respoChildFooter">
                            {showSearch && <div className="form-group d-flex align-items-center mb-0">
                              <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                              <input
                                type="search"
                                id="search"
                                className="form-control p-0 px-3"
                                placeholder=""
                                onChange={handleSearch}
                              />
                            </div>} &nbsp;&nbsp;
                            {Occupation && Occupation.length >= 0 && Search === '' && <a
                              className="btn btn-default purpleBackground text-white bolder"
                              onClick={(e) => handleShow()}
                            >
                              <i className="text-white fa fa-plus bolder"></i> Add New
                            </a>}
                          </div>
                        </div>
                        {Occupation && Occupation.length > 0 ?
                          (<div style={{ overflowX: "auto" }}>
                            <table className="table m-b-0 ">
                              <thead className="thead-light">
                                <tr>
                                  <th>Occupation</th>
                                  <th className="text-end ms-4 pe-5 ">Actions</th>
                                </tr>
                              </thead>
                              {Occupation.map((item) => {
                                return (
                                  <tbody>
                                    <tr >
                                      <td>{item.name}</td>

                                      <td className="project-actions d-flex justify-content-end border-0">
                                        <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={(e) => GetEditOccupation(item.id)}>
                                          <i className="fa fa-edit " title="Edit"></i>
                                        </a>{" "}
                                        &nbsp;
                                        <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={(e) => confirmClick(item.id)}>
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
                          : Search === '' ? <NoRecord /> : <NoRecordWithAddBtn />}
                        {Occupation.length > 0 && <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                          <div className="filter-row pt-2">
                            {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                          </div>
                          <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                        </div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal className='rounded'
        show={modalShow}
        onHide={(e) => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className='d-flex px-3  flex-column py-4 pb-0 border-bottom d-flex'>
          {editOccupation == false ?
            <h4 className='purpleText px-3'>Add Occupation</h4>
            :
            <h4 className='purpleText px-3'>Update Occupation</h4>
          }
        </div>
        <div className='d-flex px-3 flex-column py-4'>
          <Form.Group as={Col} className="left-inner-addon  input-container">
            <i className="purpleText main fa fa-pen "></i>
            <Form.Control
              type="text"
              placeholder="Occupation"
              className="form-input formControlStep2"
              value={occupationName}
              id='occupation-msg'
              onChange={(e) => {
                const onlyText = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                setOccupationName(onlyText);
              }}
            />
            {error && !occupationName && <small className="responsiveFontLarge  text-danger">Please Enter Occupation Name</small>}
          </Form.Group>
        </div>
        <div className='row d-flex px-3 mx-1'>
          <div className='col col-lg-4'>
            {editOccupation == false ?
              <button className='success-btn purpleBackground border-0 rounded text-light' onClick={(e) => AddOccupation(e)}>Create</button>
              :
              <button className='success-btn purpleBackground border-0 rounded text-light' onClick={(e) => EditOccupation(e)}>Update</button>
            }
          </div>
          <div className='col col-lg-4'>
            <button className='btn btn-default ms-3 text-black bolder border 2 ' onClick={(e) => setModalShow(false)}>Cancel</button>
          </div>
        </div>
        <br />
      </Modal>
      <ModalComponent
        show={deleteModel}
        title11={"Deleted successfully"}
        onHide={() => setDeletemodel(false)} />
      <ModalComponentPopup
        show={modalShowPrChange}
        title1={"Are you sure want to delete this record ?"}
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={() => deleteOccupation()}
      />
    </>
  )
}
