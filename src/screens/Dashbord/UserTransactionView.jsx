import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Dropdown, Form, Table } from "react-bootstrap";
import PageHeader from "../../components/PageHeader";
import Chip from "@mui/material/Chip";
import "./UserTransactionView.css";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import axios from "axios";
import { CommonConstants } from "../../Constants/common.constants";
import moment from "moment";
import { useNavigate} from "react-router-dom";
import ModalComponent from "./ModalComponentPopup";

export default function UserTransactionView(props) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [recipentsInfo, setRecipientsInfo] = useState([]);
  const [partnerBankName, setpartnerBankName] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [purposeOfTransacfer, setPurposeOfTransacfer] = useState([]);
  const [deliveryMethodes, setDeliveryMethod] = useState([]);
  const [selectedPurposeOfTransacfer, setSelectedPurposeOfTransacfer] = useState();
  const [SelectedPurposeOfTransacferId, setSelectedPurposeOfTransacferId] = useState();
  const [partnerBankId, setpartnerBankId] = useState();
  const [selectedMethod, setSelectedMethod] = useState();
  const [paymentNote, setPaymentNote] = useState('');
  const [deliveryMethodId, setDeliveryMethodId] = useState();
  const [recipientId, setRecipientId] = useState();
  const [modalShowAdd, setModalShowAdd] = useState(false);

  const handleDropdownSelect = (value, name) => {
    setSelectedValue(name);
    setpartnerBankId(value);
  };

  const handleDropdownSelectPurpose = (value, name) => {
    setSelectedPurposeOfTransacfer(name);
    setSelectedPurposeOfTransacferId(value);

  };

  const handleDropdownSelect2 = (value, name) => {
    setSelectedMethod(name);
    setDeliveryMethodId(value);
  };
  const handlePaymentNote = (e) => {
    setPaymentNote(e.target.value);
  };
  const getUserByTransaction = async () => {
    try {
      const payload = {
        id: props.location.state
      }
      const userInfo = await axios.post(CommonConstants.NEW_BASE_URL + "/gettransactionbyid", payload);
      setUserInfo(userInfo.data.data);
      setSelectedValue(userInfo?.data.data.partnerBankName);
      setSelectedPurposeOfTransacfer(userInfo?.data.data.transferPurpose);
      setSelectedMethod(userInfo.data.data?.deliveryMethodName);
      setPaymentNote(userInfo?.data.data.paymentNote);
      const recipientId = userInfo?.data.data.recipientId;
      setRecipientId(recipientId);

      const recipient = await axios.post(CommonConstants.BASE_URL + '/getrecipientsbyid', { id: recipientId });
      setRecipientsInfo(recipient.data?.data);

    } catch (error) {
      console.log(error, "error");
    }
  }
  const getAllPartnerBanks = async () => {
    try {
      const payload = {
        pageindex: 1,
        pagesize: 50,
        searchdata: "%%",
        sortparam: "create_at",
        sortorder: "ASC"
      }
      await axios.post(CommonConstants.BASE_URL + "/getallpartnerbanks", payload).then((res) => {
        setpartnerBankName(res.data.data);
      });

    } catch (err) {
      console.log(err);
    }
  }

  const getallpurposeoftransfer = async () => {
    try {
      const payload = {
        pageindex: 1,
        pagesize: 50,
        searchdata: "%%",
        sortparam: "create_at",
        sortorder: "ASC"
      }
      await axios.post(CommonConstants.BASE_URL + "/getallpurposeoftransfer", payload).then((res) => {
        setPurposeOfTransacfer(res.data.data);

      });

    } catch (err) {
      console.log(err);
    }
  }

  const getDeliveryMethod = async () => {
    try {
      const payload = {
        pageindex: 1,
        pagesize: 50,
        searchdata: "%%",
        sortparam: "create_at",
        sortorder: "ASC"
      }
      await axios.post(CommonConstants.BASE_URL + "/getalldeliverymethods", payload).then((res) => {
        setDeliveryMethod(res.data.data);
      });

    } catch (err) {
      console.log(err);
    }
  }

  const handleBack = () => {
    history.goBack(); // Go back to the previous page
  };

  const updateTransactin = async () => {
    let data = {
      id: props.location.state, //transaction id
      recipientId: recipientId,
      partnerBankId: partnerBankId == undefined ? "" : partnerBankId,
      deliveryMethodId: deliveryMethodId == undefined ? "" : deliveryMethodId,
      transferPurposeId: SelectedPurposeOfTransacferId == undefined ? "" : SelectedPurposeOfTransacferId,
      paymentMethod: userInfo.paymentMethod,
      paymentNote: paymentNote || userInfo.paymentNote
    }
    await axios.post(CommonConstants.NEW_BASE_URL + "/updatetransaction", data).then((response) => {
      if (response.data.status == true) {
        setModalShowAdd(true);

      }
    }).catch(error => {
      console.log(error);
    })
  }
  useEffect(() => {
    getUserByTransaction();
    getAllPartnerBanks();
    getallpurposeoftransfer();
    getDeliveryMethod();
  }, []);

  const handleSubmit = () => {
    console.log("hello");
    setModalShowAdd(false);
    // navigate('/transaction-utility');
  }
  return (
    <>
      <div className="container-fluid"      onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
        <PageHeader
          HeaderText="Transaction"
          Breadcrumb={[
            { name: "Transactions", navigate: "" },
            { name: "Transactions", navigate: "" },
          ]}
        />
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12">
            <div className="card p-4">
              <div className="">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Received At
                    </div>
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      <Chip
                        variant="outlined"
                        className="rounded-4 border w-100 text-start d-flex justify-content-lg-start mainChip    ps-0"
                        label={
                          <div className="dateChip ps-1">
                            {moment(userInfo?.createdAt).format("YYYY-MM-DD HH:MM:SS")}
                          </div>
                        }
                      // icon={<CalendarTodayIcon />}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Sender Name
                    </div>
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      <Chip
                        variant="outlined"
                        className="rounded-4 border w-100 text-start d-flex justify-content-lg-start mainChip    ps-0"
                        label={
                          <div className="dateChip ps-1">{userInfo?.userName}</div>
                        }
                      // icon={<CalendarTodayIcon />}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Sender Phone
                    </div>
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      <Chip
                        variant="outlined"
                        className="rounded-4 border w-100 text-start d-flex justify-content-lg-start mainChip    ps-0"
                        label={
                          <div className="dateChip ps-1">	+61482014000</div>
                        }
                      // icon={<CalendarTodayIcon />}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                        Receiver
                      </div>
                      {/* <small className="labelCard">
                      <i className="fa fa-add" /> New Reciever
                    </small> */}
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{ color: "#6b757d", fontSize: "1rem" }}
                        className="m-0 d-flex justify-content-between align-items-center rounded-4 bg-transparent dropdown-status1 text-start border"
                        variant="secondary"
                      >
                        <small>
                          {userInfo?.recipientName == " " ? (recipentsInfo?.businessName == "" ? recipentsInfo?.fullName : recipentsInfo?.businessName) : userInfo?.recipientName}
                        </small>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="w-100">
                        <Dropdown.Item className="border-bottom">
                          <div className="d-flex flex-column ">
                            <b className="text-black">{recipentsInfo?.firstName +
                              " " +
                              recipentsInfo?.lastName}
                              {recipentsInfo?.businessName}
                              {recipentsInfo?.fullName == "[]" ? "" : recipentsInfo?.fullName}</b>
                            <small>{recipentsInfo?.phone}</small>
                            <small>{recipentsInfo?.bankName}</small>
                            <small>{recipentsInfo?.address}</small>
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Sending Currency Code
                    </div>
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      <Chip
                        variant="outlined"
                        className="rounded-4 border w-100 text-start d-flex justify-content-lg-start mainChip    ps-0"
                        label={
                          <div className="dateChip ps-1">{userInfo?.sendingCurrencyCode}</div>
                        }
                      // icon={<CalendarTodayIcon />}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Receiving Currency Code
                    </div>
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      <Chip
                        variant="outlined"
                        className="rounded-4 border w-100 text-start d-flex justify-content-lg-start mainChip    ps-0"
                        label={
                          <div className="dateChip ps-1">{userInfo?.recevingCurrencyCode}</div>
                        }
                      // icon={<CalendarTodayIcon />}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Sending Country
                    </div>
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      <Chip
                        variant="outlined"
                        className="rounded-4 border w-100 text-start d-flex justify-content-lg-start mainChip    ps-0"
                        label={
                          <div className="dateChip ps-1">{userInfo?.sendingCountryName}</div>
                        }
                      // icon={<CalendarTodayIcon />}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Receiving Country
                    </div>
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      <Chip
                        variant="outlined"
                        className="rounded-4 border w-100 text-start d-flex justify-content-lg-start mainChip    ps-0"
                        label={
                          <div className="dateChip ps-1">{userInfo?.recevingCountryName}</div>
                        }
                      // icon={<CalendarTodayIcon />}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Partner bank Assigned
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{ color: "#6b757d", fontSize: "1rem" }}
                        className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border d-flex justify-content-between align-items-center"
                        variant="secondary"
                      >
                        {selectedValue ? selectedValue : 'Select an option'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="w-100">
                        {partnerBankName && partnerBankName.map((row) => (
                          <Dropdown.Item
                            key={row.id}
                            onClick={() => handleDropdownSelect(row.id, row.name)}
                          >
                            {row.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Amount
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Amount"
                      value={userInfo?.amount}
                      readOnly
                    />
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Transfer Purpose
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{ color: "#6b757d", fontSize: "1rem" }}
                        className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border d-flex justify-content-between align-items-center"
                        variant="secondary"
                      >
                        {selectedPurposeOfTransacfer ? selectedPurposeOfTransacfer : 'Select an option'}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="w-100">
                        {purposeOfTransacfer && purposeOfTransacfer.map((row) => (
                          <Dropdown.Item
                            key={row.name}
                            onClick={() => handleDropdownSelectPurpose(row.id, row.name)}
                          >
                            {row.name}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Exchange Rate
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="	"
                      value={userInfo?.exchangeRate}
                    />
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Service Charge
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="	"
                      value={userInfo?.serviceCharge}
                    />
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Payment Method
                    </div>
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      <Chip
                        variant="outlined"
                        className="rounded-4 border w-100 text-start d-flex justify-content-lg-start mainChip    ps-0"
                        label={
                          <div className="dateChip ps-1">
                            {userInfo?.paymentMethod}
                          </div>
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Delivery Method
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        style={{ color: "#6b757d", fontSize: "1rem" }}
                        className="m-0 rounded-4 bg-transparent dropdown-status1 text-start border d-flex justify-content-between align-items-center"
                        variant="secondary"
                      >
                        {selectedMethod ? selectedMethod : recipentsInfo.deliveryMethodName}
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="w-100">
                        {deliveryMethodes &&
                          deliveryMethodes.map((row) => (
                            <Dropdown.Item
                              key={row.deliveryTypeName}
                              onClick={() => handleDropdownSelect2(row.id, row.deliveryTypeName)}
                            >
                              {row.deliveryTypeName}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>

                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Bank Deposit Account Number
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      value={recipentsInfo?.bankAccNo == null ? userInfo?.bankAccNo : recipentsInfo?.bankAccNo}
                      readOnly
                    />
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Bank Deposit Branch
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="bankBranch"
                      value={recipentsInfo?.bankBranch}
                      readOnly
                    />
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Status
                    </div>
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      <Chip
                        variant="outlined"
                        className="rounded-4 border w-100 text-start d-flex justify-content-lg-start mainChip    ps-0"
                        label={
                          <div className="dateChip ps-1">
                            {userInfo?.transactionStatus}
                          </div>
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="font-weight-normal m-2 ms-0 me-0 labelCard">
                      Payment Note
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Payment Note"
                      onChange={(e) => handlePaymentNote(e)}
                      defaultValue={paymentNote}
                    />
                  </div>

                </div>
              </div>

              <div className="row d-flex justify-content-end mt-3 ">
                <div className="col-lg-1">
                  <Button
                    className="m-0 mt-3 purpleBackground"
                    variant="contained"
                    onClick={updateTransactin}
                  >
                    Update
                  </Button>
                </div>
                <div className="col-lg-1">
                  <Button
                    className="m-0 mt-3 text-black border"
                    variant="outlined"
                    onClick={handleBack}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalComponent
        show={modalShowAdd}
        title11={"Transaction Updated Successfully"}
        cancle={(e) => setModalShowAdd(false)}
        SavePr={() => setModalShowAdd(false)}
      />
    </>
  );
}
