import React, { useEffect, useState } from "react";
import PageHeader from "../../../components/PageHeader";
import Loader from "../../Loader/Loader";
import axios from "axios";
import moment from "moment";
import {
  Box,
  Modal,
  Button,
  Pagination,
  MenuItem,
  Menu,
  FormControlLabel,
  Checkbox,
  makeStyles,
  alpha,
} from "@mui/material";
import { CommonConstants } from "../../../Constants/common.constants";
import TransactionFilter from "./TransactionFilter/TransactionFilter";
import { Dropdown, Form, Table } from "react-bootstrap";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import LockIcon from "@mui/icons-material/Lock";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from '@mui/material';
import JoditEditor from "jodit-react";
import FormGroup from "@mui/material/FormGroup";
import TableResponsive from "./TableResponsive/TableResponsive";
// import { styled } from '@mui/material/styles';



// const StyledMenu = styled((props) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "right",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "right",
//     }}
//     {...props}
//   />
// ))(({ theme }) => ({
//   "& .MuiPaper-root": {
//     borderRadius: 6,
//     marginTop: theme.spacing(1),
//     minWidth: 180,
//     color:
//       theme.palette.mode === "light"
//         ? "rgb(55, 65, 81)"
//         : theme.palette.grey[300],
//     boxShadow:
//       "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 5px 7px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//     "& .MuiMenu-list": {
//       padding: "4px 0",
//     },
//     "& .MuiMenuItem-root": {
//       "& .MuiSvgIcon-root": {
//         fontSize: 18,
//         color: theme.palette.text.secondary,
//         marginRight: theme.spacing(1.5),
//       },
//       "&:active": {
//         backgroundColor: alpha(
//           theme.palette.primary.main,
//           theme.palette.action.selectedOpacity
//         ),
//       },
//     },
//   },
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    fontSize: "14px", // Decrease the font size here
  },
  menuItem: {
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      right: "10px",
      transform: "translateY(-50%) rotate(45deg)",
      borderStyle: "solid",
      borderColor: "red", // Change the caret color here
      borderWidth: "0 2px 2px 0",
      width: "6px",
      fontSize: "14px", // Decrease the font size here
      height: "6px",
    },
  },
}));

export default function TransactionUtility() {
  const navigate = useNavigate();
  const status = "ComplianceHold";
  const [openNoteModel, setOpenNoteModel] = useState(false);
  const [loadervalue, setloadervalue] = useState(false);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);

  const classes = useStyles();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [openLockModal, setOpenLockeModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [openNotifyModal, setOpenNotifyModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [controlNoValue, setControlNoValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [fromDateValue, setFromDateValue] = useState(null);
  const [toDateValue, setToDateValue] = useState(null);
  const [partnerBankValue, setPartnerBankValue] = useState("");
  const [paymentStatusValue, setPaymentStatusValue] = useState("");
  const [paymentMethodValue, setPaymentMethodValue] = useState("");
  const [includePastValue, setIncludePastValue] = useState(false);
  const [allTarnsation, setAllTransaction] = useState([]);
  const [page, setPage] = useState(1);
  const [numItems, SetNumItems] = useState(0);
  const [RowsPerPage, setRowsPerPage] = useState(50);
  const [CountPage, SetCountPage] = useState(0);
  const [recipients, setRecipients] = useState([]);
  const [Search, SetSearch] = useState("");
  const [totalAmount, settotalAmount] = useState(0);
  const [totalServiceCharge, setTotalServiceCharge] = useState(0);
  const [flag, setFlag] = useState("AUD");
  const [deliveryMethodCount, setDeliveryMethodCount] = useState({});
  const [notes, setnotes] = useState("");
  const [transactionId, setTansactionId] = useState();
  const [userId, setUserId] = useState();
  const [noteType, setNoteType] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [usersNote, setUsersNote] = useState([]);
  const [DeleteResone, setDeleteResone] = useState();
  const [cancleResone, setCancelResone] = useState();
  const [CancelType, setCancelType] = useState();
  const [lockReson, setLockReson] = useState();
  const [userName, setUserName] = useState("");
  const [userAmonut, setUserAmount] = useState();
  const [handleConfirModel, setHandleConfirModel] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [confirmReson, setConfirmReson] = useState();
  const [notificationTemplate, setNotificationTemplate] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [description, setDescription] = useState("");
  const handleOpenDeleteModal = (transacionID) => {
    setOpenDeleteModal(true);
    setUserId(transacionID);
  };
  const handleCloseDeleteModal = () => {
    const payloadData = {
      id: transactionId,
      reason: cancleResone,
      //CancelType
    };
    axios
      .post(CommonConstants.NEW_BASE_URL + "/canceltransaction", payloadData)
      .then((row) => {
        if (row.data.status == true) {
          setOpenDeleteModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLockOpenModal = (transctionId) => {
    setTansactionId(transctionId);
    setOpenLockeModal(true);
  };
  const handleLockCloseModal = () => {
    setOpenLockeModal(false);
  };

  const handleCancelOpenModal = (userId) => {
    setTansactionId(userId);
    setOpenCancelModal(true);
  };
  const handleCancelCloseModal = () => {
    setOpenCancelModal(false);
  };
  const handleOpenConfirmModel = (id, userID) => {
    setTansactionId(id);
    setHandleConfirModel(true);
    gettransactionnotesbyuserid(userID);
  };
  const gettransactionnotesbyuserid = async (id) => {
    const payload = {
      userId: id,
      pageindex: 1,
      pagesize: 20,
      status: "",
      searchdata: "%%",
      sortparam: "create_at",
      sortorder: "DESC",
    };
    await axios
      .post(CommonConstants.NEW_BASE_URL + "/gettransactionsbyuserid", payload)
      .then((res) => {
        const usersName = res.data.data;
        setUserName(usersName[0].userName);
        setUserAmount(usersName[0].amount);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleConfirmCloseModal = () => {
    setHandleConfirModel(false);
  };
  const handleNoteOpenModal = async (transactionId, userId) => {
    setTansactionId(transactionId);
    setUserId(userId);
    setOpenNoteModal(true);
    const gettransactionnotesbyuserid = await axios.post(
      CommonConstants.NEW_BASE_URL + "/gettransactionnotesbyuserid",
      { userId: userId }
    );
    setUsersNote(gettransactionnotesbyuserid.data.data);
  };
  const handleNoteCloseModal = () => {
    setOpenNoteModal(false);
  };

  const handleNotifyOpenModal = () => {
    setOpenNotifyModal(true);
  };
  const handleNotifyCloseModal = () => {
    setOpenNotifyModal(false);
  };

  const handleDelete = () => {
    // Handle delete logic here
    if (deleteInput === "Bibek Dhakal") {
      // Delete operation
      console.log("Deleted successfully");
    } else {
      // Show error or handle invalid delete input
      console.log("Invalid delete input");
    }
    handleClose1();
  };

  const handleDeleteInputChange = (event) => {
    setDeleteInput(event.target.value);
  };

  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const moveToView = (id) => {
    navigate({
      pathname: "/transaction-view",
      state: id,
    });
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleExport = () => {
    setAnchorEl(null); // Close the menu
    // Add your export logic here
    setOpen(false);
  };
  const handleFilter = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  // table code
  const getAllTransaction = async () => {
    setloadervalue(true);
    try {
      const payload = {
        pageindex: page,
        pagesize: RowsPerPage,
        searchdata: "%" + Search + "%",
        status: "",
        sortparam: "create_at",
        sortorder: "DESC",
      };

      const response = await axios.post(
        CommonConstants.NEW_BASE_URL + "/getalltransactions",
        payload
      );
      const transactions = response.data.data;
      SetCountPage(response.data.totalPageCount);
      SetNumItems(response.data.recordCount);
      // Fetch recipient data for each transaction
      // const transactionsWithRecipients = await Promise.all(
      //   transactions?.map(async (transaction) => {
      //     const recipientResponse = await axios.post(
      //       CommonConstants.BASE_URL + `/getrecipientsbyid`,
      //       { id: transaction.recipientId }
      //     );
      //     const recipientData = recipientResponse.data.data;

      //     // Format date string to desired format
      //     const formattedDate = new Date(transaction.create_at).toLocaleString(
      //       "en-US",
      //       {
      //         hour: "numeric",
      //         minute: "numeric",
      //         second: "numeric",
      //         day: "numeric",
      //         month: "short",
      //         year: "numeric",
      //       }
      //     );

      //     const statusColors = {
      //       Draft: "#E7EEAD",
      //       Confirmed: "#C4E9FF",
      //       Unconfirmed: "#C4FFF1",
      //       Processing: "#FFDDD7",
      //       "Compliance Hold": "#EAEAEC",
      //       Pending: "#FFF9D9",
      //       Delivered: "#FFFF",
      //       Cancelled: "#FDFDF2",
      //       Refunded: "#E5E5C3",
      //     };

      //     // Set background color based on transactionStatus
      //     const backgroundColor = statusColors[transaction.transactionStatus] || "";

      //     return { ...transaction, recipientData, formattedDate, backgroundColor };
      //   })
      // );
      setAllTransaction(transactions);
      let totalAmount = 0;
      let totalServiceChare = 0;
      // transactionsWithRecipients.forEach((transaction) => {
      //   totalAmount += transaction.amount;
      //   totalServiceChare += transaction.serviceCharge;
      //   const deliveryMethod = transaction.deliveryMethodName;
      //   if (deliveryMethod in deliveryMethodCount) {
      //     deliveryMethodCount[deliveryMethod] += 1;
      //   } else {
      //     deliveryMethodCount[deliveryMethod] = 1;
      //   }
      // });
      settotalAmount(totalAmount);
      setTotalServiceCharge(totalServiceChare);
    } catch (error) {
      console.log(error);
    }
    setloadervalue(false);
  };
  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == page) {
      setPage(NewPage);
    } else {
      setPage(NewPage);
    }
  };

  const ChangeRowSelected = (Event) => {
    setRowsPerPage(Number(Event.target.value));
    setPage(1);
  };
  const handlSearch = (e) => {
    SetSearch(e.target.value);
    // setPage(1);
  };

  const getAllNotification = () => {
    var InputParameter = {
      pageindex: 1,
      pagesize: 10,
      searchdata: "%%",
      sortparam: "create_at",
      sortorder: "DESC",
    };
    axios
      .post(
        CommonConstants.BASE_URL + "/getallnotificationtemplates",
        InputParameter
      )
      .then((responce) => {
        let data = responce?.data.data;
        setNotificationTemplate(data);
      })
      .catch((error) => console.log(error));
  };
  const handleTemplateChange = (event) => {
    const selectedTitle = event.target.value;
    setSelectedTemplate(selectedTitle);

    // Find the template with the selected title
    const selectedTemplate = notificationTemplate.find(
      (template) => template.title === selectedTitle
    );
    // Update the description in the editor
    setDescription(selectedTemplate ? selectedTemplate.description : "");
  };
  const addNoteTrasnsaction = async () => {
    const payload = {
      transactionId: transactionId,
      userId: userId,
      noteType: noteType,
      note: noteDescription,
    };

    axios
      .post(CommonConstants.NEW_BASE_URL + "/addnotetotransaction", payload)
      .then((res) => {
        if (res.data.status == true) {
          setOpenNoteModal(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTransaction = () => {
    const deletePayloadData = {
      id: userId,
      deleteReason: DeleteResone,
    };
    axios
      .post(
        CommonConstants.NEW_BASE_URL + "/deletetransaction",
        deletePayloadData
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == true) {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //lock transaction
  const handleLockTransaction = () => {
    const lockTransactionPayload = {
      id: transactionId,
      reason: lockReson,
      islock: true,
    };
    axios
      .post(
        CommonConstants.NEW_BASE_URL + "/locktransaction",
        lockTransactionPayload
      )
      .then((responce) => {
        console.log(responce);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // unlock transaction
  const handleUnLockTransaction = () => {
    const unlockTransactionPayload = {
      id: transactionId,
      reason: lockReson,
      islock: false,
    };
    axios
      .post(
        CommonConstants.NEW_BASE_URL + "/locktransaction",
        unlockTransactionPayload
      )
      .then((responce) => {
        console.log(responce);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const EditTransaction = () => {
    navigate("/transaction-view");
  };
  //confiem transaction
  const confirmTransaction = () => {
    const confirmedData = {
      id: transactionId,
      reason: confirmReson,
    };
    axios
      .post(CommonConstants.NEW_BASE_URL + "/confirmtransaction", confirmedData)
      .then((responce) => {
        console.log(responce);
      })
      .catch((error) => {
        console.log(error, "Error in confirmation");
      });
  };
  // const backgroundColor = statusColors[status];

  useEffect(() => {
    getAllTransaction();
    getAllNotification();
  }, [page, Search, RowsPerPage]);

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuCloseAction = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      {loadervalue == true ? <Loader /> : ""}

      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div className="container-fluid">
            <PageHeader
              HeaderText="Transactions"
              Breadcrumb={[
                { name: "Transactions", navigate: "" },
                { name: "Transactions", navigate: "" },
              ]}
            />
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="body project_report">
                    <div className="table-responsive">
                      {/* <hr className="pt-0 mt-0"></hr> */}
                      <div className="d-none d-flex justify-content-between align-items-center mx-2 respoChildFooter">
                        <div className="filter-row mb-2">
                          Show Entries &nbsp; &nbsp;
                          <div className="d-flex align-items-center position-relative">
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
                        </div>

                        <div className="form-group mb-0 d-flex align-items-center respoChildFooter">
                          <label className="mb-0 font-weight-normal">
                            Search:{" "}
                          </label>{" "}
                          &nbsp;&nbsp;
                          <input
                            type="search"
                            id="search"
                            className="form-control p-0 ps-3 pe-3"
                            // onKeyPress={RequestSearch}
                            placeholder=""
                            onChange={handlSearch}
                          />{" "}
                          &nbsp;&nbsp;
                          <div className="dropdown">
                            <TransactionFilter></TransactionFilter>
                          </div>{" "}
                          &nbsp;&nbsp;
                          <div>
                            <Button
                              variant="outlined"
                              color="primary"
                              className="m-0"
                              onClick={handleFilter}
                              // onClick={handleExport}// Set your desired background color here
                              // Icon displayed before the text
                            >
                              <i className="fa fa-search" />
                            </Button>
                          </div>{" "}
                          &nbsp;&nbsp;
                          <div>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={handleMenuOpen}
                              className="m-0"
                              // onClick={handleExport}// Set your desired background color here
                              // Icon displayed before the text
                            >
                              <i className="fa fa-download" />
                            </Button>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleMenuClose}
                            >
                              <MenuItem className="py-2" onClick={handleExport}>
                                Payout Partners
                              </MenuItem>
                              <MenuItem className="py-2" onClick={handleExport}>
                                Transaction status
                              </MenuItem>
                              <MenuItem className="py-2" onClick={handleExport}>
                                Payment method
                              </MenuItem>
                              <MenuItem className="py-2" onClick={handleExport}>
                                Delivery Method
                              </MenuItem>
                              <MenuItem className="py-2" onClick={handleExport}>
                                Countries
                              </MenuItem>
                            </Menu>
                          </div>
                        </div>
                      </div>
                    </div>
                    <TableResponsive data={allTarnsation} />

                    <div className="mt-3 d-none" style={{ overflowX: "auto" }}>
                      <table className="table m-b-0  ">
                        <thead className="thead-light">
                          <tr>
                            <th>Sender Details</th>
                            <th>Amount Details</th>
                            <th>Receiver Details</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {allTarnsation &&
                          allTarnsation.map((row) => {
                            return (
                              <tbody>
                                <tr
                                  style={{
                                    backgroundColor: row.backgroundColor,
                                    borderBottom: "2px solid #aa2ae1",
                                  }}
                                >
                                  <td className="">
                                    {/* <p></p> */}
                                    <div className="my-4 mt-0">
                                      {" "}
                                      <i className="pe-2 fa fa-user purpleText" />{" "}
                                      {row.userName}
                                    </div>
                                    <div className="my-4">
                                      {" "}
                                      <i className="pe-2 fa fa-envelope purpleText" />{" "}
                                      Email : {row.email}
                                    </div>
                                    <div className="my-4">
                                      {" "}
                                      <i className="pe-2 fa fa-mobile purpleText" />{" "}
                                      Mobile : {row.phone}
                                    </div>
                                    <div className="my-4">
                                      {" "}
                                      <i className="pe-2 fa fa-dollar purpleText" />{" "}
                                      Amount : {row.email}
                                    </div>
                                    <div className="my-4">
                                      {" "}
                                      <i className="pe-2 fa fa-sticky-note purpleText" />{" "}
                                      Notes : {row.email}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="my-4">
                                      {" "}
                                      <i className="pe-2 fa fa-dollar purpleText" />{" "}
                                      {row.sendingCurrencyCode}: {row.amount}
                                    </div>

                                    <div className="my-4">
                                      {" "}
                                      <i className="pe-2 fa fa-dollar purpleText" />{" "}
                                      {row.recevingCurrencyCode}:{" "}
                                      {Number(
                                        (
                                          (row.amount + row.serviceCharge) *
                                          row.exchangeRate
                                        )
                                          ?.toString()
                                          ?.match(/^\d+(?:\.\d{0,2})?/)
                                      )}{" "}
                                      {/* {(
                                        (row.amount + row.serviceCharge) *
                                        row.exchangeRate
                                      ).toFixed(2)}{" "} */}
                                    </div>

                                    <div className="my-4">
                                      <i className="pe-2 fa fa-dollar purpleText" />{" "}
                                      Exchange Rate : {row.exchangeRate}
                                    </div>
                                    <div className="my-4">
                                      <i className="pe-2 fa fa-dollar purpleText" />{" "}
                                      Service Charge : {row.serviceCharge}
                                    </div>
                                    <div className="my-4">
                                      <i className="pe-1 fa fa-truck purpleText" />{" "}
                                      Delivery Method : {row.deliveryMethodName}
                                    </div>
                                    <div className="my-4 mb-0">
                                      <i className="pe-2 fas fa-receipt purpleText" />{" "}
                                      Receipt :
                                    </div>
                                  </td>
                                  {row.recipientData !== null ? (
                                    row?.recipientId ==
                                      row.recipientData?.id && (
                                      <td>
                                        <div className="my-4">
                                          {" "}
                                          <i className="pe-2 fa fa-user purpleText" />{" "}
                                          Receiver Name:
                                          {row.recipientData.firstName}{" "}
                                          {row.recipientData.lastName}{" "}
                                        </div>
                                        <div className="my-4">
                                          {" "}
                                          <i className="pe-2 fa fa-mobile purpleText" />{" "}
                                          Mobile No: {row.recipientData.phone}
                                        </div>
                                        <div className="my-4">
                                          {" "}
                                          <i className="pe-2 fa fa-bank purpleText" />{" "}
                                          Bank Name:{" "}
                                          {row.recipientData.bankName}
                                        </div>
                                        <div className="my-4">
                                          {" "}
                                          <i className="fas fa-piggy-bank purpleText" />{" "}
                                          Account No:{" "}
                                          {row.recipientData.bankAccNo}{" "}
                                        </div>
                                        <div className="my-4">
                                          {" "}
                                          <i className="pe-2 fa fa-flag purpleText" />{" "}
                                          Country:{" "}
                                          {row.recipientData.countryName}{" "}
                                        </div>
                                        <div className="my-4 mb-0">
                                          {" "}
                                          <i className="pe-2 fa fa-envelope purpleText" />{" "}
                                          Email: {row.recipientData.email}{" "}
                                        </div>
                                      </td>
                                    )
                                  ) : (
                                    <td className="text-center py-5 ">
                                      <b>No Recipient Data</b>
                                    </td>
                                  )}

                                  <td>{row.transactionStatus}</td>
                                  <td>
                                    {row.transactionStatus === "Delivered" ? (
                                      <>
                                        <div className="d-flex">
                                          <Tooltip title="View" placement="top">
                                            <RemoveRedEyeIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>
                                          <Tooltip
                                            title="Track Status"
                                            placement="top"
                                          >
                                            <AnalyticsIcon
                                              className="purpleText m-2"
                                              onClick={handleClick1}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2"
                                              onClick={handleClick1}
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl1}
                                            open={open1}
                                            onClose={handleClose1}
                                          >
                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus ===
                                      "Unconfirmed" ? (
                                      <>
                                        <div className="d-flex">
                                          <Tooltip title="View" placement="top">
                                            <RemoveRedEyeIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Delete"
                                            placement="top"
                                          >
                                            <DeleteIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                handleOpenDeleteModal(row.id)
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip title="Edit" placement="top">
                                            <EditIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Track Status"
                                            placement="top"
                                          >
                                            <AnalyticsIcon
                                              className="purpleText m-2"
                                              onClick={handleClick1}
                                            />
                                          </Tooltip>
                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2"
                                              onClick={handleClick1}
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl1}
                                            open={open1}
                                            onClose={handleClose1}
                                          >
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenConfirmModel(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark Confirmed
                                            </MenuItem>

                                            <MenuItem
                                              onClick={handleNotifyOpenModal}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Notify Error
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleLockOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <LockIcon />
                                              Lock
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus ===
                                      "Confirmed" ? (
                                      <>
                                        <div className="d-flex">
                                          <Tooltip title="View" placement="top">
                                            <RemoveRedEyeIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Delete"
                                            placement="top"
                                          >
                                            <DeleteIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                handleOpenDeleteModal(row.id)
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip title="Edit" placement="top">
                                            <EditIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Track Status"
                                            placement="top"
                                          >
                                            <AnalyticsIcon
                                              className="purpleText m-2"
                                              onClick={handleClick1}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2"
                                              onClick={handleClick1}
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl1}
                                            open={open1}
                                            onClose={handleClose1}
                                          >
                                            <MenuItem
                                              onClick={handleClose1}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark Delivered
                                            </MenuItem>
                                            <MenuItem
                                              onClick={handleClose1}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Assign Partner Bank
                                            </MenuItem>

                                            <MenuItem
                                              onClick={handleNotifyOpenModal}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Notify Error
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleLockOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <LockIcon />
                                              Lock
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus === "Pending" ? (
                                      <>
                                        <div className="d-flex">
                                          <Tooltip title="View" placement="top">
                                            <RemoveRedEyeIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Delete"
                                            placement="top"
                                          >
                                            <DeleteIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                handleOpenDeleteModal(row.id)
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip title="Edit" placement="top">
                                            <EditIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Track Status"
                                            placement="top"
                                          >
                                            <AnalyticsIcon
                                              className="purpleText m-2"
                                              onClick={handleClick1}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2"
                                              onClick={handleClick1}
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl1}
                                            open={open1}
                                            onClose={handleClose1}
                                          >
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenConfirmModel(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark Confirmed
                                            </MenuItem>

                                            <MenuItem
                                              onClick={handleNotifyOpenModal}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Notify Error
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleLockOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <LockIcon />
                                              Lock
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus ===
                                      "Cancelled" ? (
                                      <>
                                        <div className="d-flex">
                                          <Tooltip title="View" placement="top">
                                            <RemoveRedEyeIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Delete"
                                            placement="top"
                                          >
                                            <DeleteIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                handleOpenDeleteModal(row.id)
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2"
                                              onClick={handleClick1}
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl1}
                                            open={open1}
                                            onClose={handleClose1}
                                          >
                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus ===
                                      "Compliance Hold" ? (
                                      <>
                                        <div className="d-flex">
                                          <Tooltip title="View" placement="top">
                                            <RemoveRedEyeIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Delete"
                                            placement="top"
                                          >
                                            <DeleteIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                handleOpenDeleteModal(row.id)
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip title="Edit" placement="top">
                                            <EditIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Track Status"
                                            placement="top"
                                          >
                                            <AnalyticsIcon
                                              className="purpleText m-2"
                                              // onClick={handleClick1}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2"
                                              onClick={handleClick2}
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl2}
                                            open={open2}
                                            onClose={handleClose1}
                                          >
                                            <MenuItem
                                              onClick={() =>
                                                handleOpenConfirmModel(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark Confirmed
                                            </MenuItem>
                                            <MenuItem
                                              onClick={handleClose1}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark SMR
                                            </MenuItem>

                                            <MenuItem
                                              onClick={handleNotifyOpenModal}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Notify Error
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleLockOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <LockIcon />
                                              Lock
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus === "Draft" ? (
                                      <>
                                        <>
                                          <div className="d-flex">
                                            <Tooltip
                                              title="View"
                                              placement="top"
                                            >
                                              <RemoveRedEyeIcon
                                                className="purpleText m-2"
                                                onClick={() =>
                                                  moveToView(row.id)
                                                }
                                              />
                                            </Tooltip>

                                            <Tooltip
                                              title="Delete"
                                              placement="top"
                                            >
                                              <DeleteIcon
                                                className="purpleText m-2"
                                                onClick={() =>
                                                  handleOpenDeleteModal(row.id)
                                                }
                                              />
                                            </Tooltip>

                                            <Tooltip
                                              title="Edit"
                                              placement="top"
                                            >
                                              <EditIcon
                                                className="purpleText m-2"
                                                onClick={() =>
                                                  moveToView(row.id)
                                                }
                                              />
                                            </Tooltip>

                                            <Tooltip
                                              title="Track Status"
                                              placement="top"
                                            >
                                              <AnalyticsIcon
                                                className="purpleText m-2"
                                                onClick={handleClick1}
                                              />
                                            </Tooltip>

                                            <Tooltip
                                              title="Actions"
                                              placement="top"
                                            >
                                              <MoreVertIcon
                                                className="purpleText m-2"
                                                onClick={handleClick1}
                                              />
                                            </Tooltip>

                                            <div
                                              id="demo-customized-menu"
                                              MenuListProps={{
                                                "aria-labelledby":
                                                  "demo-customized-button",
                                              }}
                                              anchorEl={anchorEl1}
                                              open={open1}
                                              onClose={handleClose1}
                                            >
                                              <MenuItem
                                                onClick={() =>
                                                  handleOpenConfirmModel(
                                                    row.id,
                                                    row.userId
                                                  )
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <AssignmentTurnedInIcon />
                                                Mark Confirmed
                                              </MenuItem>

                                              <MenuItem
                                                onClick={handleNotifyOpenModal}
                                                disableRipple
                                                className="my-2"
                                              >
                                                <AnnouncementIcon />
                                                Notify Error
                                              </MenuItem>

                                              <MenuItem
                                                onClick={() =>
                                                  handleNoteOpenModal(
                                                    row.id,
                                                    row.userId
                                                  )
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <TextSnippetIcon />
                                                Notes
                                              </MenuItem>

                                              <MenuItem
                                                onClick={() =>
                                                  handleLockOpenModal(row.id)
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <LockIcon />
                                                Lock
                                              </MenuItem>

                                              <MenuItem
                                                onClick={() =>
                                                  handleCancelOpenModal(row.id)
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <AnnouncementIcon />
                                                Cancel
                                              </MenuItem>
                                            </div>
                                          </div>
                                        </>
                                      </>
                                    ) : row.transactionStatus ===
                                      "Processing" ? (
                                      <>
                                        <div className="d-flex">
                                          <Tooltip title="View" placement="top">
                                            <RemoveRedEyeIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Delete"
                                            placement="top"
                                          >
                                            <DeleteIcon
                                              className="purpleText m-2"
                                              onClick={() =>
                                                handleOpenDeleteModal(row.id)
                                              }
                                            />
                                          </Tooltip>

                                          <Tooltip title="Edit" placement="top">
                                            <EditIcon
                                              className="purpleText m-2"
                                              onClick={() => moveToView(row.id)}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Track Status"
                                            placement="top"
                                          >
                                            <AnalyticsIcon
                                              className="purpleText m-2"
                                              onClick={handleClick1}
                                            />
                                          </Tooltip>

                                          <Tooltip
                                            title="Actions"
                                            placement="top"
                                          >
                                            <MoreVertIcon
                                              className="purpleText m-2"
                                              onClick={handleClick1}
                                            />
                                          </Tooltip>

                                          <div
                                            id="demo-customized-menu"
                                            MenuListProps={{
                                              "aria-labelledby":
                                                "demo-customized-button",
                                            }}
                                            anchorEl={anchorEl1}
                                            open={open1}
                                            onClose={handleClose1}
                                          >
                                            <MenuItem
                                              onClick={handleClose1}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Mark Delivered
                                            </MenuItem>
                                            <MenuItem
                                              onClick={handleClose1}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AssignmentTurnedInIcon />
                                              Assign Partner Bank
                                            </MenuItem>

                                            <MenuItem
                                              onClick={handleNotifyOpenModal}
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Notify Error
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleNoteOpenModal(
                                                  row.id,
                                                  row.userId
                                                )
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <TextSnippetIcon />
                                              Notes
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleLockOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <LockIcon />
                                              Lock
                                            </MenuItem>

                                            <MenuItem
                                              onClick={() =>
                                                handleCancelOpenModal(row.id)
                                              }
                                              disableRipple
                                              className="my-2"
                                            >
                                              <AnnouncementIcon />
                                              Cancel
                                            </MenuItem>
                                          </div>
                                        </div>
                                      </>
                                    ) : row.transactionStatus === "Refunded" ? (
                                      <>
                                        <>
                                          <div className="d-flex">
                                            <Tooltip
                                              title="View"
                                              placement="top"
                                            >
                                              <RemoveRedEyeIcon
                                                className="purpleText m-2"
                                                onClick={() =>
                                                  moveToView(row.id)
                                                }
                                              />
                                            </Tooltip>

                                            <Tooltip
                                              title="Delete"
                                              placement="top"
                                            >
                                              <DeleteIcon
                                                className="purpleText m-2"
                                                onClick={() =>
                                                  handleOpenDeleteModal(row.id)
                                                }
                                              />
                                            </Tooltip>

                                            <Tooltip
                                              title="Actions"
                                              placement="top"
                                            >
                                              <MoreVertIcon
                                                className="purpleText m-2"
                                                onClick={handleClick1}
                                              />
                                            </Tooltip>

                                            <div
                                              id="demo-customized-menu"
                                              MenuListProps={{
                                                "aria-labelledby":
                                                  "demo-customized-button",
                                              }}
                                              anchorEl={anchorEl1}
                                              open={open1}
                                              onClose={handleClose1}
                                            >
                                              <MenuItem
                                                onClick={() =>
                                                  handleNoteOpenModal(
                                                    row.id,
                                                    row.userId
                                                  )
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <TextSnippetIcon />
                                                Notes
                                              </MenuItem>
                                              <MenuItem
                                                onClick={() =>
                                                  handleCancelOpenModal(row.id)
                                                }
                                                disableRipple
                                                className="my-2"
                                              >
                                                <AnnouncementIcon />
                                                Cancel
                                              </MenuItem>
                                            </div>
                                          </div>
                                        </>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                      </table>
                      <div className="d-flex justify-content-end pt-4 mr-4 mr-4">
                        {/* <div className="filter-row pt-2">
                      {numItems > 0 ? `Showing ${(page - 1) * RowsPerPage + 1} to ${(page * RowsPerPage) > numItems ? numItems : (page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                    </div> */}

                        {/* <div>
                                        {Object.entries(deliveryMethodCount).map(([method, count]) => (
                                            <p key={method}>
                                                Delivery Method: {method} - Count: {count}
                                            </p>
                                        ))}
                                    </div> */}
                      </div>
                    </div>
                    <div className="d-none pt-4 mr-4 mr-4">
                      <div className="d-flex paginationEnd">
                        <Pagination
                          count={CountPage}
                          page={page}
                          onChange={HandleChangePage}
                          color="secondary"
                          shape="rounded"
                        />
                      </div>
                      <div className="d-flex justify-content-between respoChildFooter pt-4 mr-4 mr-4">
                        <div className="font-weight-medium pbDowSt">
                          <div>Total Transaction Count : {numItems}</div>
                        </div>
                        <div>
                          <div className="font-weight-medium pbDowSt">
                            {" "}
                            Total Amount :{flag}{" "}
                            {totalAmount
                              ?.toString()
                              ?.match(/^\d+(?:\.\d{0,2})?/)}
                            {/* Total Amount :{flag} {totalAmount.toFixed(2)} */}
                          </div>
                        </div>{" "}
                        <div>
                          <div className="font-weight-medium pbDowSt">
                            Total Service Charge Count :{flag}{" "}
                            {totalServiceCharge
                              ?.toString()
                              ?.match(/^\d+(?:\.\d{0,2})?/)}
                            {/* {totalServiceCharge.toFixed(2)} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Modal */}
            <Modal open={open} onClose={handleModalClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "20px",
                  width: { xs: "90%", sm: "70%", md: "60%", lg: "60%" },
                  paddingBottom: "20px",
                  maxHeight: "90vh", // Set a maximum height for the container
                  overflowY: "auto", // Enable vertical scrolling
                }}
              >
                <div className="border-bottom py-2 mb-2 d-flex justify-content-between">
                  <h5>Filter</h5> {/* Header Title */}
                  <div onClick={handleModalClose} className="pointer">
                    <CloseIcon />
                  </div>
                </div>

                <div className="">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Search
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Control No
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Control No"
                      />
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Status?
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{ color: "#6b757d", fontSize: "1rem" }}
                          className="m-0 rounded-4 bg-transparent dropdown-status1 d-flex justify-content-between align-items-center text-start border"
                          variant="secondary"
                        >
                          Select Status
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Pending</Dropdown.Item>
                          <Dropdown.Item>Processing</Dropdown.Item>
                          <Dropdown.Item>Completed</Dropdown.Item>
                          <Dropdown.Item>Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        From
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{ color: "#6b757d", fontSize: "1rem" }}
                          className="m-0 rounded-4 bg-transparent dropdown-status1 d-flex justify-content-between align-items-center text-start border"
                          variant="secondary"
                        >
                          Any
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Pending</Dropdown.Item>
                          <Dropdown.Item>Processing</Dropdown.Item>
                          <Dropdown.Item>Completed</Dropdown.Item>
                          <Dropdown.Item>Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">To</div>
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{ color: "#6b757d", fontSize: "1rem" }}
                          className="m-0 rounded-4 bg-transparent dropdown-status1 d-flex justify-content-between align-items-center text-start border"
                          variant="secondary"
                        >
                          Any
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Pending</Dropdown.Item>
                          <Dropdown.Item>Processing</Dropdown.Item>
                          <Dropdown.Item>Completed</Dropdown.Item>
                          <Dropdown.Item>Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Partner Bank?
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{ color: "#6b757d", fontSize: "1rem" }}
                          className="m-0 rounded-4 bg-transparent dropdown-status1 d-flex justify-content-between align-items-center text-start border"
                          variant="secondary"
                        >
                          Any
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Pending</Dropdown.Item>
                          <Dropdown.Item>Processing</Dropdown.Item>
                          <Dropdown.Item>Completed</Dropdown.Item>
                          <Dropdown.Item>Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Payment Status?
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{ color: "#6b757d", fontSize: "1rem" }}
                          className="m-0 rounded-4 bg-transparent dropdown-status1 d-flex justify-content-between align-items-center text-start border"
                          variant="secondary"
                        >
                          Any
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Pending</Dropdown.Item>
                          <Dropdown.Item>Processing</Dropdown.Item>
                          <Dropdown.Item>Completed</Dropdown.Item>
                          <Dropdown.Item>Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Payment Method?
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{ color: "#6b757d", fontSize: "1rem" }}
                          className="m-0 rounded-4 bg-transparent dropdown-status1 d-flex justify-content-between align-items-center text-start border"
                          variant="secondary"
                        >
                          Any
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Pending</Dropdown.Item>
                          <Dropdown.Item>Processing</Dropdown.Item>
                          <Dropdown.Item>Completed</Dropdown.Item>
                          <Dropdown.Item>Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Sender
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{ color: "#6b757d", fontSize: "1rem" }}
                          className="m-0 rounded-4 bg-transparent dropdown-status1 d-flex justify-content-between align-items-center text-start border"
                          variant="secondary"
                        >
                          Any
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Pending</Dropdown.Item>
                          <Dropdown.Item>Processing</Dropdown.Item>
                          <Dropdown.Item>Completed</Dropdown.Item>
                          <Dropdown.Item>Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>

                  <div className="row mt-2">
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Receiver
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{ color: "#6b757d", fontSize: "1rem" }}
                          className="m-0 rounded-4 bg-transparent dropdown-status1 d-flex justify-content-between align-items-center text-start border"
                          variant="secondary"
                        >
                          Any
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Pending</Dropdown.Item>
                          <Dropdown.Item>Processing</Dropdown.Item>
                          <Dropdown.Item>Completed</Dropdown.Item>
                          <Dropdown.Item>Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Sending Country
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{ color: "#6b757d", fontSize: "1rem" }}
                          className="m-0 rounded-4 bg-transparent dropdown-status1 d-flex justify-content-between align-items-center text-start border"
                          variant="secondary"
                        >
                          Any
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Pending</Dropdown.Item>
                          <Dropdown.Item>Processing</Dropdown.Item>
                          <Dropdown.Item>Completed</Dropdown.Item>
                          <Dropdown.Item>Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <div className="col-lg-4">
                      <div className="font-weight-normal m-2 labelCard">
                        Receiving Country
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle
                          style={{ color: "#6b757d", fontSize: "1rem" }}
                          className="m-0 rounded-4 bg-transparent dropdown-status1 d-flex justify-content-between align-items-center text-start border"
                          variant="secondary"
                        >
                          Any
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>Pending</Dropdown.Item>
                          <Dropdown.Item>Processing</Dropdown.Item>
                          <Dropdown.Item>Completed</Dropdown.Item>
                          <Dropdown.Item>Cancelled</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-end mt-3 border-top">
                  <div className="col-lg-2">
                    <Button
                      className="m-0 mt-3"
                      variant="contained"
                      color="primary"
                      onClick={handleExport}
                    >
                      Filter
                    </Button>
                  </div>
                  <div className="col-lg-2">
                    <Button
                      className="m-0 mt-3"
                      variant="outlined"
                      onClick={handleExport}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Box>
            </Modal>

            {/* Delete Modal */}
            <Modal open={openDeleteModal} onClose={handleNoteCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "30px",
                  width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
                  paddingBottom: "20px",
                }}
              >
                <div className="border-bottom py-2 mb-2 d-flex justify-content-between">
                  <h5>Delete Transaction</h5> {/* Header Title */}
                  <div onClick={handleNoteCloseModal} className="pointer">
                    <CloseIcon />
                  </div>
                </div>
                <div className="">
                  <div className="row">
                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                        Type{" "}
                        <div className="text-blue font-weight-bold px-2">
                          Bibek Dhakal{" "}
                        </div>
                        to delete.
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Delete"
                        onChange={(e) => setDeleteResone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-end mt-3 border-top">
                  <div className="col-lg-3">
                    <Button
                      className="m-0 mt-3"
                      variant="contained"
                      color="primary"
                      onClick={deleteTransaction}
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="col-lg-3">
                    <Button
                      className="m-0 mt-3"
                      variant="outlined"
                      onClick={() => setOpenDeleteModal(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Box>
            </Modal>

            {/* Cancel Modal */}
            <Modal open={openCancelModal} onClose={handleCancelCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "30px",
                  width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
                  paddingBottom: "20px",
                }}
              >
                <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
                  <h5>Cancel Transaction</h5> {/* Header Title */}
                  <div onClose={handleNoteCloseModal} className="pointer">
                    <CloseIcon />
                  </div>
                </div>
                <div className="">
                  <div className="row">
                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                        Type{" "}
                        <div className="text-blue font-weight-bold px-2">
                          Bibek Dhakal{" "}
                        </div>
                        to cancel.
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Cancel"
                        onChange={(e) => setCancelType(e.target.value)}
                      />
                    </div>

                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                        Cancellation Reason
                      </div>
                      <textarea
                        type="textarea"
                        className="form-control"
                        placeholder=""
                        rows="3"
                        onChange={(e) => setCancelResone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-end mt-3 border-top">
                  <div className="col-lg-3">
                    <Button
                      className="m-0 mt-3"
                      variant="contained"
                      color="primary"
                      onClick={handleCloseDeleteModal}
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="col-lg-3">
                    <Button
                      className="m-0 mt-3"
                      variant="outlined"
                      onClick={handleCancelCloseModal}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Box>
            </Modal>

            {/* Lock Transaction Modal */}

            <Modal open={openLockModal} onClose={handleLockCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "30px",
                  width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
                  paddingBottom: "20px",
                }}
              >
                <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
                  <h5>Lock Transaction</h5> {/* Header Title */}
                  <div onClose={handleNoteCloseModal} className="pointer">
                    <CloseIcon />
                  </div>
                </div>

                <div className="">
                  <div className="row">
                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal m-2  mb-2 text-black d-flex">
                        Lock Transaction
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Lock Reason"
                        onChange={(e) => setLockReson(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-end mt-3 border-top">
                  <div className="col-lg-3">
                    <Button
                      className="m-0 mt-3"
                      variant="contained"
                      color="primary"
                      onClick={handleLockTransaction}
                    >
                      Lock
                    </Button>
                  </div>
                  <div className="col-lg-3">
                    <Button
                      className="m-0 mt-3"
                      variant="outlined"
                      onClick={handleLockCloseModal}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Box>
            </Modal>

            {/* Notes Modal */}

            <Modal open={openNoteModal} onClose={handleNoteCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "30px",
                  width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
                  paddingBottom: "20px",
                }}
              >
                <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
                  <h5>Notes</h5> {/* Header Title */}
                  <div onClick={handleNoteCloseModal} className="pointer">
                    <CloseIcon />
                  </div>
                </div>

                <div className="">
                  <div className="row">
                    <table className="table-responsive m-b-0">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Note Type</th>
                          <th>Note</th>
                          <th>Added By</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersNote &&
                          usersNote.map((row) => {
                            return usersNote.length > 0 ? (
                              <>
                                <td>
                                  {moment(row.createdAt).format(
                                    "YYYY-MM-DD HH:MM:SS"
                                  )}
                                </td>
                                <td>{row.noteType}</td>
                                <td>{row.note}</td>
                                <td>Bibek</td>
                              </>
                            ) : (
                              <tr className="border text-center ">
                                <div className="py-2">No any notes yet</div>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                        Note Type
                      </div>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setNoteType(e.target.value)}
                      >
                        <option>Select Type</option>
                        <option value="Informative">Informative</option>
                        <option value="Action">Action</option>
                      </Form.Select>
                    </div>

                    <div className="col-lg-12 my-2">
                      <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                        New Note
                      </div>
                      <textarea
                        type="textarea"
                        className="form-control"
                        placeholder=" New Note"
                        rows="3"
                        onChange={(e) => setNoteDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row d-flex justify-content-end mt-3 border-top">
                  <div className="col-lg-3">
                    <Button
                      className="m-0 mt-3"
                      variant="contained"
                      color="primary"
                      onClick={addNoteTrasnsaction}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="col-lg-3">
                    <Button
                      className="m-0 mt-3"
                      variant="outlined"
                      onClick={handleNoteCloseModal}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Box>
            </Modal>

            {/* Notes Modal */}

            <Modal open={openNotifyModal} onClose={handleNotifyCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "30px",
                  width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
                  paddingBottom: "20px",
                }}
              >
                <div className="border-bottom py-2 mb-2 d-flex justify-content-between">
                  <h5 className="">Notify sender about transaction error</h5>{" "}
                  {/* Header Title */}
                  <div onClick={handleNotifyCloseModal} className="pointer">
                    <CloseIcon />
                  </div>
                </div>

                <div className="">
                  <div className="row">
                    <div>
                      <div className="col-lg-12 my-2">
                        <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                          Select Template
                        </div>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={handleTemplateChange}
                        >
                          <option>Select Template</option>
                          {notificationTemplate &&
                            notificationTemplate.map((row) => (
                              <option key={row.id} value={row.title}>
                                {row.title}
                              </option>
                            ))}
                        </Form.Select>
                      </div>

                      <div className="col-lg-12 my-2">
                        <JoditEditor
                          value={description}
                          config={{ readonly: false }}
                          tabIndex={1}
                          onBlur={(newContent) => {}}
                          onChange={(newContent) => {
                            setDescription(newContent);
                          }}
                        />
                      </div>
                    </div>
                    <FormGroup>
                      <FormControlLabel
                        disabled
                        control={<Checkbox />}
                        label={
                          <div
                            style={{ color: "#ff0000 !important" }}
                            className="option-label"
                          >
                            Send through Push
                          </div>
                        }
                      />
                      <FormControlLabel
                        disabled
                        control={<Checkbox />}
                        label={
                          <div
                            style={{ color: "#ff0000 !important" }}
                            className="option-label"
                          >
                            Send through Email
                          </div>
                        }
                      />
                      <div
                        style={{ color: "#ff0000 !important" }}
                        className="option-label mt-1"
                      >
                        No any notification sent yet.
                      </div>
                    </FormGroup>
                  </div>
                </div>

                <div className="row d-flex justify-content-end align-items-center mt-3 border-top">
                  <div className="col-lg-4">
                    <div
                      style={{ color: "#ff0000 !important" }}
                      className="text-primary mt-2"
                    >
                      Request Document <b>(0)</b>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <div
                      style={{ color: "#ff0000 !important" }}
                      className="text-primary mt-2"
                    >
                      Chat
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <Button
                      className="m-0 mt-3"
                      variant="contained"
                      color="primary"
                      onClick={handleNotifyCloseModal}
                    >
                      Notify Error
                    </Button>
                  </div>
                  <div className="col-lg-3">
                    <Button
                      className="m-0 mt-3"
                      variant="outlined"
                      onClick={handleNotifyCloseModal}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </Box>
            </Modal>
            {/* mark confirmed module */}
            <Modal open={handleConfirModel} onClose={handleConfirmCloseModal}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: "30px",
                  width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" },
                  paddingBottom: "20px",
                }}
              >
                <div className="border-bottom py-2 mb-4 d-flex justify-content-between">
                  <h5 className="responsiveFontLarge">
                    Are you sure to mark transaction confirmed?
                  </h5>{" "}
                  {/* Header Title */}
                  <div onClick={handleConfirmCloseModal} className="pointer">
                    <CloseIcon />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 my-2">
                    <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                      Sender:
                      <div className="text-blue font-weight-bold px-2">
                        {userName}{" "}
                      </div>
                      Amount:{" "}
                      <div className="text-blue font-weight-bold px-2">
                        {userAmonut}{" "}
                      </div>
                    </div>
                    <textarea
                      type="textarea"
                      className="form-control"
                      placeholder=" statement data"
                      rows="3"
                      onChange={(e) => setConfirmReson(e.target.value)}
                    />
                  </div>
                  <div className="mt-3">
                    <table className="table-responsive d-table">
                      <thead>
                        <tr>
                          <th>Document</th>
                          <th>Uploaded</th>
                          <th>Expiry</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {usersNote && usersNote.map((row) => {
                        return (
                          usersNote.length > 0 ?
                            <>
                              <td>Australian Driving License</td>
                              <td>2022-09-21</td>
                              <td>2022-09-21</td>
                            </>
                            :
                            <tr className="border text-center ">
                              <div className="py-2">No any record</div>
                            </tr>
                        )
                      })} */}
                        <td>Australian Driving License</td>
                        <td>2022-09-21</td>
                        <td>2022-09-21</td>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="form-check mt-2 align-items-center"
                    id="confirm-check-div"
                  >
                    <input
                      type="checkbox"
                      id="confirm-check-input"
                      className="form-check-input"
                      style={{ height: "20px", width: "20px" }}
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label
                      for="confirm-check-input"
                      className="form-check-label"
                      style={{ marginTop: "5px", marginLeft: "28px" }}
                    >
                      Mark verify and continue?
                    </label>
                  </div>

                  <div className="row d-flex justify-content-end mt-3 border-top">
                    <div className="col-lg-3">
                      <Button
                        className="m-0 mt-3"
                        variant="contained"
                        color="primary"
                        disabled={!isChecked}
                        onClick={confirmTransaction}
                      >
                        Mark Confirmed
                      </Button>
                    </div>
                    <div className="col-lg-3">
                      <Button
                        className="m-0 mt-3"
                        variant="outlined"
                        onClick={handleConfirmCloseModal}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
