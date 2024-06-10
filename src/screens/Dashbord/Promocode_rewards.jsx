import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";
import { CommonConstants } from "../../Constants/common.constants";
import axios from "axios";

const Promocode_rewards = ({ userId }) => {
  const [showModal, setShowModal] = useState(false);
  const [allPromocode, setAllPromocode] = useState([]);
  const [countryID, setCountryId] = useState(0);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const getAllPromocodes = async () => {
    const sendData = new FormData();
    sendData.append("countryId", countryID);
    sendData.append("userId", userId);
    sendData.append("isForTransaction", false);
    sendData.append("isForCompleteSignup", false);
    const getPromocode = await axios.post(CommonConstants.BASE_URL + "/getpromocodes", sendData);
    if (getPromocode.data.status == true) {
      setAllPromocode(getPromocode.data.data);
    }

  };

  useEffect(() => {
    getAllPromocodes();
  }, [userId])
  return (
    <>
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 p-0">
            <div className="card">
              <div className="body project_report p-0">
                <div className="table-responsive">
                  <table className="table m-b-0">
                    <thead className="thead-light">
                      <tr>
                        <th>Promocode</th>
                        <th>Valid Untill</th>
                        {/* <th>Is Used</th> */}
                        <th>Use Count</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {allPromocode && allPromocode.length > 0 ?
                        allPromocode.map((row) => (
                          <tr>
                            <td>{row.promoCode}</td>
                            <td>{row.validTo}</td>
                            <td>{row.usedCount}</td>
                            {/* <td>
                              <a
                                className="d-none bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                onClick={handleShowModal}
                              >
                                <i className="fa fa-edit "></i>
                              </a>
                              <a
                                className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                              // onClick={handleShowModal}
                              >
                                <i className="fa fa-trash text-danger" title="Delete"></i>
                              </a>
                            </td> */}
                          </tr>
                        )) : <td colSpan={7}><p className="text-center">No Promocode's Data Found</p></td>}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Modal component */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="border-bottom">
          <Modal.Title>Edit Promocode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="notes" className="mt-3">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Promocode"
                name="Referal"
                disabled
                className="reflink link py-4 pbSt"
              />
            </Form.Group>
            <div className="col-lg-12 px-0 mt-3">
              <div className="font-weight-normal m-2 labelCard">
                Valid Until
              </div>
              <Form.Control
                type="date"
                required
                placeholder="Valid Until"
                name="Referal"
                className="reflink link py-4 pbSt"
              />
            </div>


          </Form>
        </Modal.Body>
        <Modal.Footer className="">
          <div className="d-flex ms-auto ">
            <Button className="purpleBorder bg-transparent purpleText px-4">
              Cancel
            </Button>
            <Button className="purpleBackground border-0 px-4">Submit</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Promocode_rewards;
