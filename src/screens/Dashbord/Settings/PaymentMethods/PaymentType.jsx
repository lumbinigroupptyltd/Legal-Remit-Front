import React, { useState, useEffect } from "react";
import PageHeader from "../../../../components/PageHeader";
import { Modal } from "react-bootstrap";
import { Form, Col } from "react-bootstrap";
import axios from "axios";
import { CommonConstants } from "../../../../Constants/common.constants";
import Pagination from "@mui/material/Pagination";
import ModalComponent from "../../ModalComponent";
import ModalComponentPopup from "../../ModalComponentPopup";
import { useNavigate } from "react-router-dom";


export default function PaymentType() {
  const [modalShow, setModalShow] = useState(false);
  const [POT, setPOT] = useState([]);
  const [getPOT, setgetPOT] = useState(true);
  const [editPOT, seteditPOT] = useState(false);
  const [Search, SetSearch] = useState("");
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(
    CommonConstants.DefaultPageSize
  );
  const [numItems, SetNumItems] = React.useState(0);
  const [CountPage, SetCountPage] = React.useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const [deleteModel, setDeletemodel] = useState(false);
  const navigate = useNavigate();

  const confirmClick = async (id) => {
    setmodalShowPrChange(true);
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const allPOTdata = async (e) => {
    seteditPOT(false);
    try {
      const response = await axios.get(
        CommonConstants.BASE_URL + "/getallpaymentname"
      );
      if (response.data.status === true) {
        setPOT(response.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const addDeliveryType = () => {
    navigate("/addpaymenttype");
  };
  const EditPaymentType = (id) => {
    navigate({
      pathname: "/addpaymenttype",
      state: id,
    });
  };
  const deletePOT = async () => {
    setmodalShowPrChange(false);
    try {
      const payload = {
        id: id,
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/deletepaymentmethodnamebyid",
        payload
      );
      if (response.data.status === true) {
        setDeletemodel(true);
        allPOTdata();
      }
    } catch (err) {
      console.log(err);
    }
  };


  const AddPOT = async (e) => {
    seteditPOT(false);
    setModalShow(true);
    try {
      const payload = {
        type: document.getElementById("delivery-method-name").value,
        enabled: true,
      };

      const response = await axios.post(
        CommonConstants.BASE_URL + "/adddeliverytype",
        payload
      );
      if (response.data.status === true) {
        setModalShow(false);
        allPOTdata();
      }
    } catch (err) {
      console.log(err);
    }
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
    console.log("newpage", NewPage);
  };
  useEffect(
    (e) => {
      allPOTdata(e);
    },
    [Search, Page, RowsPerPage]
  );
  return (
    <>
      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div>
            <div className="container-fluid">
              <PageHeader
                HeaderText="Payment Type"
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
                        <div className="row g-0">
                          <div className=" d-flex justify-content-end pb-3">
                            <a
                              //  href=""
                              className="purpleBackground btn btn-default text-white bolder"
                              onClick={(e) => addDeliveryType()}
                            >
                              <i className="text-white fa fa-plus bolder"></i>{" "}
                              Add New
                            </a>
                          </div>
                        </div>

                        <div className="row"></div>
                        <div style={{ overflowX: "auto" }}>
                          <table className="table m-b-0 ">
                            <thead className="thead-light">
                              <tr>
                                <th>Name</th>
                                <th>Logo</th>
                                <th>Enable</th>
                                <th>Actions</th>
                              </tr>
                            </thead>

                            {POT.map((item) => {
                              return (
                                <tbody>
                                  <tr>
                                    <td>{item.name}</td>
                                    <td className="Image_TableData">
                                      <img
                                        src={
                                          item.logo != ""
                                            ? CommonConstants.BASE_URL + item?.logo
                                            : CommonConstants.ImagUrl
                                        }
                                        className="paymentMethodLogo"
                                        style={{
                                          widh: "40%",
                                          height: "40%",
                                        }}
                                      />
                                    </td>
                                    <td>
                                      {item?.enabled == true ? "True" : "False"}
                                    </td>
                                    {item.isCustomized == true ? (
                                      <td className="project-actions">
                                        <a
                                          className="btn btn-outline-secondary mr-1"
                                          onClick={(e) =>
                                            EditPaymentType(item.id)
                                          }
                                          title="Edit"
                                        >
                                          <i className="fa fa-edit "></i>
                                        </a>{" "}
                                        &nbsp;
                                        <a
                                          className="btn btn-outline-secondary"
                                          onClick={() => confirmClick(item.id)}
                                          title="Delete"
                                        >
                                          <i
                                            className="fa fa-trash"
                                            style={{ color: "red" }}
                                          ></i>
                                        </a>
                                      </td>
                                    ) : (
                                      <td className="pl-4">-</td>
                                    )}
                                  </tr>
                                </tbody>
                              );
                            })}
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="rounded"
        show={modalShow}
        onHide={(e) => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="d-flex px-5  flex-column py-4 d-flex">
          {editPOT == false ? (
            <h1 className="purpleText px-3">Add Delivery Method Name</h1>
          ) : (
            <h1 className="purpleText px-3">Update Delivery Method Name</h1>
          )}
        </div>
        <div className="d-flex px-5 flex-column py-4">
          <Form.Group as={Col} className="left-inner-addon  input-container">
            <i className="purpleText main fa fa-pen "></i>
            <Form.Control
              type="text"
              placeholder="Delivery Method Name"
              className="form-input formControlStep2"
              id="delivery-method-name"
              defaultValue={editPOT == false ? "" : getPOT.name}
            // onChange={changeMobileNumber}
            />
          </Form.Group>
        </div>
        {/* <Modal.Body>
        <p className='text-center'>
        </p>
      </Modal.Body> */}
        <div className="row d-flex px-5 mx-1">
          <div className="col col-lg-4">
            {
              editPOT == false ? (
                <button
                  className="success-btn purpleBackground border-0 rounded text-light"
                  onClick={(e) => AddPOT(e)}
                >
                  Add
                </button>
              ) : (
                ""
              )
              // <button className='success-btn purpleBackground border-0 rounded text-light' onClick={(e) => EditPOT(e)}>Update</button>
            }
          </div>
          <div className="col col-lg-4">
            <button
              className="success-btn purpleBorder purpleText rounded"
              onClick={(e) => setModalShow(false)}
            >
              Cancel
            </button>
          </div>
        </div>
        <br />
      </Modal>
      <ModalComponent
        show={deleteModel}
        title11={"Deleted successfully"}
        onHide={() => setDeletemodel(false)}
      />
      <ModalComponentPopup
        show={modalShowPrChange}
        title1={"Are you sure want to delete this record ?"}
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={() => deletePOT()}
      />

    </>
  );
}
