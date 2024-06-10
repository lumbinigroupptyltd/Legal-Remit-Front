import React, { useEffect, useState } from 'react'
import PageHeader from "../../../../components/PageHeader";
import { Modal } from 'react-bootstrap';
import { Form, Col } from 'react-bootstrap';
import axios from 'axios';
import { CommonConstants } from '../../../../Constants/common.constants';
import Pagination from '@mui/material/Pagination';
import ModalComponent from '../../ModalComponent';
import ModalComponentPopup from '../../ModalComponentPopup';
import NoRecordWithAddBtn from '../../../../Helpers/NoRecord/NoRecordWithAddBtn';
import NoRecord from '../../../../Helpers/NoRecord/NoRecord';

export default function Relation() {

  const [modalShow, setModalShow] = useState(false);
  const [deleteModel, setDeletemodel] = useState(false)
  const [Relation, setRelation] = useState([]);
  const [getRelation, setgetRelation] = useState(true);
  const [editRelation, seteditRelation] = useState(false);
  const [Search, SetSearch] = useState('');
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [numItems, SetNumItems] = React.useState(0);
  const [CountPage, SetCountPage] = React.useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const [error, setError] = useState(false);
  const [relationName, setRelationName] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  useEffect((e) => {
    allRelationdata(e)
  }, [Search, Page, RowsPerPage])

  const confirmClick = async (id) => {
    setmodalShowPrChange(true)
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
  };

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
    }
  };

  const allRelationdata = async (e) => {
    seteditRelation(false)
    try {
      const payloadd = {
        pageindex: Page,
        pagesize: RowsPerPage,
        searchdata: '%' + Search + '%',
        sortparam: "create_at",
        sortorder: "ASC"
      }

      const response = await axios.post(CommonConstants.BASE_URL + "/getallrelations", payloadd);
      if (response.data.status === true) {
        setRelation(response.data?.data);
        SetCountPage(response.data?.totalPageCount);
        SetNumItems(response.data.recordCount);
        setShowSearch(response.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  const deleteRelation = async () => {
    setmodalShowPrChange(false);
    try {
      const payload = {
        id: id
      }
      const response = await axios.post(CommonConstants.BASE_URL + "/deleterelationsbyid", payload);
      if (response.data.status === true) {
        setDeletemodel(true)
        allRelationdata()
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  const GetEditRelation = async (id) => {
    try {
      const payload = {
        id: id
      }
      const response = await axios.post(CommonConstants.BASE_URL + "/getrelationsbyid", payload);
      if (response.data.status === true) {
        seteditRelation(true)
        setgetRelation(response.data.data)
        setRelationName(response.data.data.name)
        setModalShow(true)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const EditRelation = async (e) => {
    try {
      if (relationName === "" || relationName === undefined) {
        setError(true);
      } else {
        const relationInputValue = document.getElementById("relation-msg").value;
        const payload = {
          id: getRelation.id,
          name: relationInputValue !== "" ? relationInputValue : relationName
        }
        // if (relationInputValue !== relationName) {
        const response = await axios.post(CommonConstants.BASE_URL + "/updaterelations", payload);
        if (response.data.status === true) {
          setModalShow(false);
          allRelationdata();
        }
        // } else {
        //   // Close the modal if no changes were made
        //   setModalShow(false);
        // }
      }
    } catch (err) {
      console.log(err);
    }
  }


  const AddRelation = async (e) => {
    seteditRelation(false)
    setModalShow(true)
    try {
      if (relationName == "" || relationName == undefined) {
        setError(true);
      } else {
        const payload = {
          name: relationName
        }
        const response = await axios.post(CommonConstants.BASE_URL + "/addrelations", payload);
        if (response.data.status === true) {
          setModalShow(false)
          allRelationdata()
        }
      }

    }
    catch (err) {
      console.log(err)
    }
  }
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    SetPage(1);
    setShowSearch(Relation.length > 0 || searchTerm.trim() !== '');
  }
  const handleShow = () => {
    seteditRelation(false);
    setModalShow(true);
    setRelationName("");

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
              <div className='row'>
                <div className='col col-lg-6 '>
                  <PageHeader HeaderText="Relation" Breadcrumb={[{ name: "Dashboard", navigate: "" }, { name: "IoT Dashboard", navigate: "" }]} />
                </div>
                <div className='col col-lg-6 '>
                </div>
              </div>
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12">
                  <div className="card">
                    <div className="body project_report">
                      <div className="table-responsive">

                        <div className="row g-0">
                          <div className=" d-flex justify-content-end">

                          </div>
                        </div>
                        {/* <hr className="pt-0 mt-0"></hr> */}
                        <div className="row">
                        </div>
                        <div className="d-flex justify-content-between align-items-center respoChildFooter">
                          {Relation && Relation.length > 0 && <div className="filter-row pb-2 pbSt">
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
                          <div className='d-flex pbSt align-items-center respoChildFooter'>
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
                            {Relation && Relation.length >= 0 && Search === '' && <a
                              className="purpleBackground btn btn-default text-white bolder"
                              onClick={(e) => handleShow()}
                            >
                              <i className="text-white fa fa-plus bolder"></i> Add New
                            </a>}
                          </div>
                        </div>

                        {Relation && Relation.length > 0 ?
                          <div style={{ overflowX: "auto" }}>
                            <table className="table m-b-0 ">
                              <thead className="thead-light">
                                <tr>
                                  <th>Relation</th>
                                  <th className="text-end ms-4 pe-5 ">Actions</th>
                                </tr>
                              </thead>

                              {Relation.map((item, index) => {
                                return (
                                  <tbody>
                                    <tr >
                                      <td>{item.name}</td>

                                      <td className="project-actions d-flex justify-content-end border-0">
                                        <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={(e) => GetEditRelation(item.id)}>
                                          <i className="fa fa-edit " title='Edit'></i>
                                        </a>{" "}
                                        &nbsp;
                                        <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={(e) => confirmClick(item.id)}>
                                          <i className="fa fa-trash" style={{ color: "red" }} title='Delete'></i>
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>

                                )
                              })
                              }
                            </table>
                          </div>
                          : Search === '' ? <NoRecord /> : (<NoRecordWithAddBtn />)}

                        {Relation && Relation.length > 0 && <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
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
        <div className='d-flex px-3  flex-column py-4 pb-0 d-flex border-bottom'>
          {editRelation == false ?
            <h4 className='purpleText px-3'>Add Relation</h4>
            :
            <h4 className='purpleText px-3'>Update Relation</h4>
          }
        </div>
        <div className='d-flex px-3 flex-column py-4'>
          <Form.Group as={Col} className="left-inner-addon  input-container">
            <i className="purpleText main fa fa-pen "></i>
            <Form.Control
              type="text"
              placeholder="Relation"
              className="form-input formControlStep2"
              value={relationName}
              id='relation-msg'
              onChange={(e) => {
                const onlyText = e.target.value.replace(/[^A-Za-z\s]+/g, '');
                setRelationName(onlyText);
              }}
            />
            {error && !relationName && <small className="responsiveFontLarge  text-danger">Please Enter Relation Name</small>}
          </Form.Group>
        </div>
        <div className='row d-flex px-3 mx-1'>
          <div className='col col-lg-4'>
            {editRelation == false ?
              <button className='success-btn purpleBackground border-0 rounded text-light' onClick={(e) => AddRelation(e)}>Create</button>
              :
              <button className='success-btn purpleBackground border-0 rounded text-light' onClick={(e) => EditRelation(e)}>Update</button>
            }
          </div>
          <div className='col col-lg-4'>
            <button className='btn btn-default border text-black rounded' onClick={(e) => setModalShow(false)}>Cancel</button>
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
        SavePr={() => deleteRelation()}
      />
    </>
  )
}
