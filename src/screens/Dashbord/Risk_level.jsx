import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommonConstants } from "../../Constants/common.constants";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Loader from "../Loader/Loader";

function Risk_level({ individualuserData }) {
  const [loadervalue, setloadervalue] = useState(false);
  const [compliance, setComplianceInfo] = useState([]);
  const [complianceInfo2, setComplianceInfo2] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [valueChanged, setValueChanged] = useState(false);
  const [comment, setComment] = useState("");
  const [userData, setUserData] = useState({
    "customerId": null,
    "userStatus": true,
    "userName": "",
    "email": "",
    "code": "",
    "referralCode": "",
    "appovedByAdmin": false,
    "streetName": "",
    "riskLevel": null,
    "noOfTransactions": "",
    "totalAmtSent": null,
    "avgTransaction": null,
    "totalServiceCharge": null,
    "totalNoOfFreeServiceCharge": null,
    "noOfReceivingCountry": "0",
    "noOfAmtSentLocalCurrency": null,
    "daysSinceLastTran": null,
    "daysSinceLastLogin": null,
    "dateOfRegistration": "",
    "dateOfFirstTransaction": null,
    "noOfTransactionInOneYr": "0",
    "totalAmtSentInOneYr": null,
    "totalNoOfTransactionInLastNinetyDays": null,
    "totalAmtSentInNinetyDays": null,
    "longestGapBetweenTwoTransaction": null,
    "shortestGapBetweentwonTransaction": null,
    "phone": "610451316456"
  });
  const [newValue, setNewValue] = useState(0);
  const [riskLevel, setriskLevel] = useState("low");
  const [riskLevelData, setriskLevelData] = useState([]);
  const [noOfTransactions, setnoOfTransactions] = useState(0);
  const fetchData = () => {
    const categoryIds = [1, 2]; // Category IDs to be passed to the API
    const requests = categoryIds.map((categoryId) => {
      const sendData = {
        userId: individualuserData,
        categoryId: categoryId,
      };
      return axios.post(
        CommonConstants.NEW_BASE_URL2 + "/getuserrisksettings",
        sendData
      );
    });

    Promise.all(requests)
      .then((responses) => {
        const responseData1 = responses[0].data.data; // Data from the first API call
        const responseData2 = responses[1].data.data; // Data from the second API call

        // Handle the data separately as needed
        setComplianceInfo(responseData1);
        setComplianceInfo2(responseData2);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUserData = async () => {
    if (individualuserData !== 'undefined' || individualuserData !== "") {
      const userPayLoad = new FormData();
      userPayLoad.append('userId', individualuserData);
      const userResponse = await axios.post(`${CommonConstants.BASE_URL}/getusersummery`, userPayLoad);
      const responseData = userResponse.data.data;
      if (userResponse.data.status == true) {
        setUserData(responseData);
      }
    }
  }
  const handleModalOpen = async (data) => {
    setSelectedData(data);
    setShowModal(true);
    setComment("");
  };

  const handleModalClose = () => {
    setSelectedData(null);
    setShowModal(false);
  };

  const handleTextboxChange = (e, ele) => {
    const newValue = e.target.value;
    setNewValue(newValue);
  };
  const dropdown2 = (e) => {
    const newValue = e.target.value;
    setnoOfTransactions(newValue);
  }
  const handleConfirmUpdate = async () => {
    setloadervalue(true);
    const paylaod = {
      "userId": individualuserData,
      "riskLevel": riskLevel,
      "riskAmountThreshold": parseInt(newValue),
      "riskTransactionThreshold": parseInt(noOfTransactions),
      "note": comment
    }
    const updateData = await axios.post(CommonConstants.BASE_URL + '/updateuserrisk', paylaod);
    if (updateData.data.status == true) {
      setValueChanged(false);
      handleModalClose();
    }
    setloadervalue(false);
  };
  const changeData = (e) => {
    setriskLevel(e.target.value);
  }

  const handleDropDown = async (e) => {
    setloadervalue(true);
    const formData = new FormData();
    formData.append("userId", individualuserData);
    formData.append("riskLevel", riskLevel);

    const getData = await axios.post(CommonConstants.BASE_URL + '/getuserriskcompliance', formData);
    if (getData.data.status == true) {
      setriskLevelData(getData.data.data);
      const findData = getData.data.data.find((ele) => {
        return ele.days == 365
      })
      setNewValue(findData?.thresholdAmountValue);
      setnoOfTransactions(findData?.thresholdTransactionValue);
    }
    setloadervalue(false);
  }
  useEffect(() => {
    fetchData();
    getUserData();
    handleDropDown();
  }, [individualuserData, riskLevel]);
  return (
    <>
      {loadervalue == true ? <Loader /> : ""}
      <div className="d-flex align-items-center justify-content-end my-2">
        <div>
          <Form.Select
            aria-label="Default select example"
            className="d-flex m-auto py-2 pe-5"
            onChange={(e) => changeData(e)}
            value={riskLevel}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Form.Select>
        </div>
        <div className="">
          <Button
            className="w-auto purpleBackground text-white border-0 py-2 mx-4 px-3 rounded-5"
            onClick={() => handleModalOpen()}
          >
            Update
          </Button>
        </div>
      </div>
      <div style={{ overflowX: "auto" }}>
        {
          riskLevelData && riskLevelData.length > 0 ?
            (<table className="table m-b-0 border-bottom">
              <thead className="thead-light">
                <tr>
                  <th>Life Span</th>
                  <th>Amount <br /> Threshold</th>
                  <th>Amount Sent</th>
                  <th>{riskLevel ? riskLevel : ""} risk <br></br>No Of receivers </th>
                  <th>Transaction Threshold</th>
                  <th>Actual no <br /> of Transaction</th>
                </tr>
              </thead>
              {riskLevelData && riskLevelData.map((ele) => (
                <tbody>
                  <tr key={ele.id}>
                    <td>
                      {ele.days}
                      {ele.days == 1 ? " Day" : " Days"}
                    </td>
                    <td>
                      {ele.days == 365 || ele.days == "365" ? (
                        <input
                          type="text"
                          value={newValue}
                          onChange={(e) => handleTextboxChange(e, ele)}
                        />
                      ) : (
                        ele.thresholdAmountValue
                      )}
                    </td>
                    <td>{ele.totalPayableSum}</td>
                    <td>{ele.distinctRecipientCount}</td>
                    <td>
                      {ele.days == 365 || ele.days == "365" ? (
                        <input
                          type="text"
                          value={noOfTransactions}
                          onChange={(e) => dropdown2(e, ele)}
                        />
                      ) : (
                        ele.thresholdTransactionValue
                      )}
                    </td>
                    <td>{ele.transactionCount}</td>
                  </tr>
                </tbody>
              ))}
            </table>)
            : <td colSpan={7}><p className="text-center">No Data Found</p></td>
        }

      </div>
      {userData && <div className="mt-4 table-responsive">
        <table border="1" cellpadding="6" cellspacing="2">
          <tr className="border border-1">
            <th align="right">Total No of Transaction :</th>
            <td>{userData?.noOfTransactions || userData?.noOfTransactions === 0 ? userData.noOfTransactions : "-"}</td>
          </tr>
          <tr className="border border-1">
            <th align="right">Total Sent Amount</th>
            <td>{typeof userData?.totalAmtSent === 'string' ? Number(userData?.totalAmtSent?.toString()?.match(/^\d+(?:\.\d{0,2})?/)) : "-"}</td>
            {/* <td>{typeof userData?.totalAmtSent === 'string' ? parseFloat(userData.totalAmtSent).toFixed(2) : "-"}</td> */}
          </tr>
          <tr className="border border-1">
            <th align="right">Total Service charge</th>
            <td>{typeof userData?.totalServiceCharge === 'string' ? Number(userData?.totalServiceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/)) : "-"}</td>
            {/* <td>{typeof userData?.totalServiceCharge === 'string' ? parseFloat(userData.totalServiceCharge).toFixed(2) : "-"}</td> */}
          </tr>
          <tr className="border border-1">
            <th align="right">Average Size Of Transaction</th>
            <td>
              {typeof userData?.totalAmtSent === 'string' && userData?.noOfTransactions
                ? Number((parseFloat(userData?.totalAmtSent) / userData?.noOfTransactions)?.toString()?.match(/^\d+(?:\.\d{0,2})?/))
                // ? (parseFloat(userData?.totalAmtSent) / userData?.noOfTransactions).toFixed(2)
                : "-"}
            </td>
          </tr>
          {/* <tr className="border border-1">
            <th align="right">Total Volume INR</th>
            <td>Life span</td>
          </tr>
          <tr className="border border-1">
            <th align="right">Total Volume NPR</th>
            <td>
              (if multiple currency, it should listed as like this. Life span
              (Maximum last 3 sender country list))
            </td>
          </tr> */}
        </table>
      </div>}
      <div className="text-danger text-justify mt-4">
        Note : Ongoing monitoring reports generated from fraud.net should
        displayed under this. If any transaction is marked high risk or required
        additional documents, it will appear here and we need to approve and
        release it after verification. Once transaction released, it will still
        remain here but no action is required. It will be removed from here
        after after 365 days. But on the transaction list, it will always show
        that passes compliance and approval status. Request documents option
        will be available here as well.
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton className="border-bottom my-1">
          <Modal.Title>Confirm Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to update the limit for{" "}
          {selectedData && selectedData.days} days?
        </Modal.Body>
        <Modal.Footer className="">
          <div className="row d-flex px-3 mx-1">
            <div className="col">
              <button className="success-btn purpleBackground border-0 rounded text-light">
                Create
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-default border text-black rounded"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton className="border-bottom my-1">
          <Modal.Title>Update Risk ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="comment">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="">
          <div className="row d-flex px-3 mx-1">
            <div className="col">
              <button
                className="success-btn purpleBackground border-0 rounded text-light"
                onClick={handleConfirmUpdate}
              >
                Update
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-default border text-black rounded"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Risk_level;
