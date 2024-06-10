import React, { useState } from "react";
import { Modal, Button, Form, Dropdown } from "react-bootstrap";

const Referral = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="card">
              <div className="body project_report">
                <div className="table-responsive">
                  <table className="table m-b-0">
                    <thead className="thead-light">
                      <tr>
                        <th>User</th>
                        <th>Filed</th>
                        <th>Old</th>
                        <th>New</th>
                        <th>Edited on</th>
                        <th>Edited By</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Bibek Dhakal</td>
                        <td>DOB</td>
                        <td>1999-02-23</td>
                        <td>1999-02-03</td>
                        <td>2023-02-28 12:06:40</td>
                        <td>John Doe</td>
                        <td>
                          <a
                            className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                            onClick={handleShowModal}
                          >
                            <i className="fa fa-bell purpleText"></i>
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>Bibek Dhakal</td>
                        <td>Nationality</td>
                        <td>Nepal</td>
                        <td>Indian</td>
                        <td>2023-02-10 12:06:40</td>
                        <td>John Doe</td>
                        <td>
                          <a
                            className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                            onClick={handleShowModal}
                          >
                            <i className="fa fa-bell purpleText"></i>
                          </a>
                        </td>
                      </tr>
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
          <Modal.Title>Send notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="col-lg-12 px-0">
              <div className="font-weight-normal m-2 labelCard">
              Select notification
              </div>
              <Dropdown>
                <Dropdown.Toggle
                  style={{ color: "#6b757d", fontSize: "1rem" }}
                  className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border col-lg-12 d-flex align-items-center justify-content-between"
                  variant="secondary"
                >
                  Select notification
                </Dropdown.Toggle>
                <Dropdown.Menu className="col-lg-12">
                  <Dropdown.Item>Account Created</Dropdown.Item>
                  <Dropdown.Item>Account Closed</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Form.Group controlId="notes" className="mt-3">
              <Form.Label>Note</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="">
          <div className="d-flex ms-auto ">
            <Button className="purpleBorder bg-transparent purpleText">
              Cancel
            </Button>
            <Button className="purpleBackground border-0 px-4">Add</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Referral;

