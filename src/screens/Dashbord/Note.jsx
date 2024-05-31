import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";
import moment from "moment";
import Loader from "../Loader/Loader";
import ModalComponent from "./ModalComponent";
import ModalComponentPopup from "./ModalComponentPopup";

export default function Note({ userData }) {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [userNote, setUserNote] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [note, setNote] = useState("");
  const [openResolveModel, setResolveModel] = useState(false);
  const [id, setID] = useState(0);
  const [loadervalue, setloadervalue] = useState(false);
  const [error, setError] = useState(false);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleDeleteIconClick = (id) => {
    setShowModal1(true);
    setID(id);
  };

  const handleOpenDeleteModel = (id) => {
    setmodalShowPrChange(true);
    setID(id);
  };
  const handleCloseModal1 = () => {
    setShowModal1(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setID(0);
    setNote("");
  };

  const handelcloseReslveModel = () => {
    setResolveModel(false);
  };
  const handleShowModal = () => {
    setShowModal(true);
  };
  const getUserNote = async () => {
    setloadervalue(true);
    const payLoad = {
      userId: userData,
    };
    await axios
      .post(
        `${CommonConstants.NEW_BASE_URL}/gettransactionnotesbyuserid`,
        payLoad
      )
      .then((responce) => {
        setUserNote(responce.data.data);
      })
      .catch((error) => console.log(error));
    setloadervalue(false);
  };

  const addNote = async () => {
    if (!selectedValue) {
      setError(true);
      return;
    }
    if (!note) {
      setError(true);
      return;
    }

    setError(""); // Clear any previous errors

    const payload = {
      transactionId: 0,
      userId: userData,
      noteType: selectedValue,
      note: note,
    };
    await axios
      .post(CommonConstants.NEW_BASE_URL + "/addnotetotransaction", payload)
      .then((responce) => {
        if (responce.data.status == true) {
          handleCloseModal();
          getUserNote();
        }
      })
      .catch((error) => console.log(error));
  };
  const updateNote = async () => {
    const payload = {
      id: id,
      transactionId: 0,
      userId: userData,
      noteType: selectedValue,
      note: note,
    };
    await axios
      .post(CommonConstants.NEW_BASE_URL + "/addnotetotransaction", payload)
      .then((responce) => {
        if (responce.data.status == true) {
          handleCloseModal();
          getUserNote();
        }
      })
      .catch((error) => console.log(error));
  };
  const addResolveNote = async () => {
    if (!note) {
      setError(true);
      return;
    }
    setError("");
    const requsetData = new FormData();
    requsetData.append("id", id);
    requsetData.append("note", note);


    await axios
      .post(
        CommonConstants.NEW_BASE_URL + "/resolvedtransactionnotes",
        requsetData
      )
      .then((responce) => {
        if (responce.data.status == true) {
          handelcloseReslveModel();
          getUserNote();
          setNote("");
        }
      })
      .catch((error) => console.log(error));
  };
  const handleDelete = async () => {
    setmodalShowPrChange(false);
    const requestData = new FormData();
    requestData.append("id", id);
    await axios
      .post(
        CommonConstants.NEW_BASE_URL + "/deletetransactionnotebyid",
        requestData
      )
      .then((repsponce) => {
        console.log(repsponce.data);
        if (repsponce.data.status == true) {
          setModalShow(true);
          handleCloseModal1();
          getUserNote();
        }
      })
      .catch((eror) => console.log(eror));
  };

  const handleOpenResolve = (id) => {
    setResolveModel(true);
    setID(id);
  };

  const handleEdit = async (id) => {
    setID(id);
    const payload = new FormData();
    payload.append("id", id);
    await axios
      .post(CommonConstants.NEW_BASE_URL + "/gettransactionnotebyid", payload)
      .then((responce) => {
        if (responce.data.status == true) {
          console.log(responce.data.data);
          setSelectedValue(responce.data.data.noteType);
          setNote(responce.data.data.note);
          handleShowModal();
        }
      });
  };

  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };

  const handleCloseDelete = () => {
    setModalShow(false);
    getUserNote();
  };
  useEffect(() => {
    getUserNote();
  }, [userData]);
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}

      <div className="table-responsive">
        <div className="d-flex justify-content-between align-items-center respoChildFooter ">
          <div className="filter-row pb-2 pbSt">
          </div>
          <div className="d-flex justify-content-end my-3">
            <a
              className="btn btn-default purpleBackground text-white bolder pbDowSt"
              onClick={handleShowModal}
            >
              <i className="text-white fa fa-plus bolder"></i> Add New
            </a>
          </div>
        </div>
        <table className="table m-b-0 mt-3">
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Note</th>
              <th>Added By</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userNote.length > 0 ? (
              userNote &&
              userNote.map((row) => {
                return (
                  <>
                    <tr>
                      <td>{moment(row.createdAt).format("YYYY-MM-DD")}</td>
                      <td>{row.note == "" ? "-" : row.note}</td>
                      <td>{row.userName == null ? "-" : row.userName}</td>
                      <td>{row.noteType == "" ? "-" : row.noteType}</td>
                      <td>
                        <a
                          className="bg-transparent px-3 py-2 mx-1 rounded-2 border-1 border pointer border-black"
                          onClick={() => handleEdit(row.id)}
                        >
                          <i className="fa fa-edit" title="Edit"></i>
                        </a>
                        <a
                          className="bg-transparent mx-1 px-3 py-2 rounded-2 border-1 border pointer border-black"
                          onClick={() => handleOpenDeleteModel(row.id)}
                        >
                          <i
                            className="fa fa-trash"
                            style={{ color: "red" }}
                            title="Delete"
                          ></i>
                        </a>
                        {row.noteType == "Action" && row.isResolved == false && (
                          <a
                            className="bg-transparent px-3 py-2 mx-1 rounded-2 border-1 border pointer border-black"
                            onClick={() => handleOpenResolve(row.id)}
                            title="Action Required"
                          >
                            {/* <VerifiedIcon style={{ color: "green" }} /> */}
                            <i class="fa fa-exclamation-triangle" aria-hidden="true" style={{ color: "red" }}></i>
                          </a>
                        )}{" "}
                        {row.noteType == "Action" && row.isResolved == true && (
                          <i class="fa fa-check" aria-hidden="true" style={{ color: "green" }} title="Resolved"></i>
                        )}
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <td colSpan={7}>
                <p className="text-center mt-3"> No User's Note Found</p>
              </td>
            )}
          </tbody>
        </table>
        {/* {userNote.length > 0 && <div className="d-flex paginationBetween pt-4 mr-4 respoChildFooter">
                                        <div className="filter-row pt-2">
                                          {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                                        </div>
                                        <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                                      </div>} */}
      </div>

      {/* <div className="table-responsive">
   

      <table className="">
        <thead className="thead-light">
          <tr>
            <th>Date</th>
            <th>Note</th>
            <th>Added By</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userNote && userNote.length > 0 ? userNote.map((row) => {
            return (
              <>
                < tr >
                  <td>{moment(row.createdAt).format('YYYY-MM-DD')}</td>
                  <td>{row.note}</td>
                  <td>-</td>
                  <td>{row.noteType}</td>
                  <td>
                    <a
                      className="bg-transparent px-3 py-2 mx-1 rounded-2 border-1 border pointer border-black"
                      onClick={() => handleEdit(row.id)}
                    >
                      <i className="fa fa-edit" title="Edit"></i>
                    </a>
                    <a
                      className="bg-transparent mx-1 px-3 py-2 rounded-2 border-1 border pointer border-black"
                      onClick={() => handleOpenDeleteModel(row.id)}
                    >
                      <i className="fa fa-trash" style={{ color: "red" }} title="Delete"></i>
                    </a>
                    {row.noteType == 'Action' && <a
                      className="bg-transparent px-3 py-2 mx-1 rounded-2 border-1 border pointer border-black"
                      onClick={() => handleOpenResolve(row.id)}
                      title="Resolve "
                    >
                      <VerifiedIcon style={{ color: "green" }} />
                    </a>}
                  </td>
                </tr>
              </>
            )
          })
            : <td colSpan={7}><p className="text-center mt-3">No Notes Data</p></td>}
        </tbody>
      </table>
      </div> */}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title>{`${id ? "Update" : "Add New"}`} Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="col-lg-12 px-0">
              <div className="font-weight-normal m-2 labelCard">Note Type</div>
              <div className="">
                <Form.Select
                  onChange={(eventKey) =>
                    setSelectedValue(eventKey.target.value)
                  }
                  style={{ color: "#6b757d", fontSize: "1rem" }}
                  className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border col-lg-12 d-flex align-items-center justify-content-between"
                >
                  <option value="">{selectedValue || "Select Note"}</option>
                  <option value="Informative">Informative</option>
                  <option value="Action">Action</option>
                </Form.Select>
                {error && !selectedValue && (
                  <div className="text-danger">Please select a note type.</div>
                )}
              </div>
            </div>

            <Form.Group controlId="notes" className="mt-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={note}
                rows={3}
                onChange={(e) => setNote(e.target.value)}
              />
              {error && !note && (
                <div className="text-danger">Please Enter Notes</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="">
          <div className="d-flex ms-auto ">
            <Button
              className="purpleBorder bg-transparent purpleText"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              className="purpleBackground  border-0 px-4"
              onClick={id ? updateNote : addNote}
            >{`${id ? "Update" : "Create "}`}</Button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={openResolveModel} onHide={handelcloseReslveModel} centered>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title>Add Resolve Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="notes" className="mt-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setNote(e.target.value)}
              />
              {error && !note && (
                <div className="text-danger">Please provide note content.</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="">
          <div className="d-flex ms-auto ">
            <Button
              className="purpleBorder bg-transparent purpleText"
              onClick={handelcloseReslveModel}
            >
              Cancel
            </Button>
            <Button
              className="purpleBackground  border-0 px-4"
              onClick={addResolveNote}
            >
              Add
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* delete moda; */}
      <Modal show={showModal1} onHide={handleCloseModal1} centered>
        <Modal.Header className="" closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
        <Modal.Footer className="">
          <div className="d-flex ms-auto ">
            <Button
              className="purpleBorder bg-transparent purpleText"
              onClick={handleCloseModal1}
            >
              Cancel
            </Button>
            <Button
              className="purpleBackground border-0"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* delete model */}
      <ModalComponentPopup
        show={modalShowPrChange}
        title1={"Are you sure want to delete this record ?"}
        cancle={(e) => handlePrchangePopupCancle(e)}
        SavePr={() => handleDelete()}
      />

      {/* delete success model  */}
      <ModalComponent
        show={modalShow}
        title11={"Deleted successfully"}
        onHide={() => handleCloseDelete()}
      />
    </>
  );
}
