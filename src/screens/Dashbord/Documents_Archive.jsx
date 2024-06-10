import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import moment from "moment";
import ModalComponentPopup from "./ModalComponentPopup";
import ModalComponent from "./ModalComponent";

const Documents_Archive = ({ userId }) => {
  const [documantData, setDocumentData] = useState([]);
  const [notificationTemplate, setNotificationTemplate] = useState([]);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, selectedID] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const getDocuments = async () => {
    const payload = new FormData();
    payload.append('userId', userId);//userId
    await axios.post(CommonConstants.BASE_URL + "/getarchivedocuments", payload).then(responce => {
      if (responce.data.status == true) {
        setDocumentData(responce.data.data);
      }
    }).catch(error => console.log(error))
  }
  const handleOpenDeleteModel = (id) => {
    setmodalShowPrChange(true);
    selectedID(id);
  }
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const handleDelete = async () => {
    try {
      setmodalShowPrChange(false);
      const formData = new FormData();
      formData.append("id", id);
      const deleteData = await axios.post(CommonConstants.BASE_URL + '/deletedocumentbyid', formData);
      if (deleteData.data.status == true) {
        setModalShow(true);
      }
    } catch (error) { console.log(error) }
  };
  const handleCloseDelete = () => {
    setModalShow(false);
    getDocuments();
  }
  useEffect(() => {
    getDocuments();
  }, [userId])
  return (
    <>
      <div className="container-fluid">
        <PageHeader
          HeaderText="Document Archive"
          Breadcrumb={[
            { name: "Dashboard", navigate: "" },
            { name: "IoT Dashboard", navigate: "" },
          ]}
        />
        <div style={{ overflowX: "auto" }}>
          <table className="table m-b-0 mt-3">
            <thead className="thead-light">
              <tr>
                <th>Type</th>
                <th>Upload Date</th>
                <th>Preview</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                documantData && documantData.length > 0 ?
                  (documantData.map((row) => {
                    return (
                      <>
                        <tr>
                          <td>{row.type == null ? "-" : row.type}</td>
                          <td>{moment(row.createdAt).format('YYYY-MM-DD')}</td>
                          <td>
                            <img
                              src={row.filePath}
                              className="img-fluid"
                              height="60"
                              width="60"
                              alt="Image"
                            />
                          </td>
                          <td className="project-actions">
                            <a
                              className="btn btn-outline-secondary"
                              onClick={() => handleOpenDeleteModel(row.id)}
                            >
                              <i
                                className="fa fa-trash"
                                style={{ color: 'red' }}
                                title="Delete"
                              ></i>
                            </a>
                          </td>
                        </tr>
                      </>
                    )
                  }))
                  : <td colSpan={7}><p className="text-center mt-3">No Data Found</p></td>}
            </tbody>
          </table>
        </div>
      </div>
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
  )
}
export default Documents_Archive;