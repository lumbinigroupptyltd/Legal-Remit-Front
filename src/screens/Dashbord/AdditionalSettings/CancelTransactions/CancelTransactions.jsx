import React, { useEffect } from 'react';
import PageHeader from '../../../../components/PageHeader';
import { CommonConstants } from '../../../../Constants/common.constants';
import { Dropdown, Form } from "react-bootstrap";
import { Box, Modal, Button, Pagination,} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from 'axios';
import { useState } from 'react';
import moment from 'moment';
import NoRecordWithAddBtn from '../../../../Helpers/NoRecord/NoRecordWithAddBtn';
import Loader from '../../../Loader/Loader';
import CloseIcon from "@mui/icons-material/Close";
import ModalComponentPopup from '../../ModalComponentPopup';
import ModalComponent from '../../ModalComponent';

const CancelTransactions = () => {
    const [RowsPerPage, SetRowsPerPage] = useState(CommonConstants.DefaultPageSize);
    const [Page, SetPage] = useState(1);
    const [Search, SetSearch] = useState('');
    const [AllData, setAllDate] = useState([]);
    const [numItems, SetNumItems] = React.useState(0);
    const [CountPage, SetCountPage] = React.useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const [loadervalue, setloadervalue] = useState(false);
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [showData, setShowData] = useState({
        "id": 0,
        "haveCustomerId": false,
        "customerId": "",
        "userId": 0,
        "fullName": "",
        "email": "",
        "phone": "",
        "haveTransactionNo": true,
        "transactionNo": "",
        "reason": "",
        "createdAt": "",
        "updatedAt": "",
        "deleted": false
    });
    const [modalShowPrChange, setmodalShowPrChange] = useState(false);
    const [id, setId] = useState(0);
    const [transactionNo, settransactionNo] = useState(0);
    const [message, setMessage] = useState("");
    const [modalShow, setModalShow] = useState(false);

    const handlePrchangePopupCancle = () => {
        setmodalShowPrChange(false);
    };
    const getAllTransaction = async () => {
        setloadervalue(true);
        const paylaod = {
            "pageindex": Page,
            "pagesize": RowsPerPage,
            "searchdata": Search  //serach on (reason, username, email and customerid)
        }
        const getData = await axios.post(CommonConstants.NEW_BASE_URL + "/getalltransactioncancelrequests", paylaod);
        if (getData.data.status == true) {
            setAllDate(getData.data.data);
            SetCountPage(getData.data.totalPageCount);
            SetNumItems(getData.data.recordCount);
            setShowSearch(getData.data.recordCount == 0 ? (Search == "" ? false : true) : true);
        }
        setloadervalue(false);
    };
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        SetSearch(searchTerm);
        setShowSearch(AllData.length > 0 || searchTerm.trim() !== '');
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
    const handleOpenModel = async (id) => {
        await axios.get(CommonConstants.NEW_BASE_URL + `/gettransactioncancelrequestbyid?id=${id}`).then((responce) => {
            if (responce.data.status == true) {
                setShowData(responce.data.data);
                setOpenNoteModal(true);

            }
        }).catch((error) => {
            console.log(error);
        })
    };
    const handleNoteCloseModal = () => {
        setOpenNoteModal(false);
    };
    const handleAccept = async (ID, transacionID) => {
        setId(ID);
        settransactionNo(transacionID);
        setmodalShowPrChange(true);
        setMessage("accept");
    };
    const handleReject = (ID, transacionID) => {
        setId(ID);
        settransactionNo(transacionID);
        setmodalShowPrChange(true);
        setMessage("reject");
    };

    const handlSendData1 = async () => {
        setloadervalue(true);
        setmodalShowPrChange(false);
        const fromData = new FormData();
        fromData.append("status", 1);
        fromData.append("transactionId", transactionNo);
        const sendData = await axios.post(CommonConstants.NEW_BASE_URL + "/updatestatuscanceltransactionreq", fromData);
        if (sendData.data.status == true) {
            getAllTransaction();
            setMessage("accept");
            setModalShow(true);
        }
        setloadervalue(false);
    };
    const handlSendData2 = async () => {
        setloadervalue(true);
        setmodalShowPrChange(false);
        const fromData = new FormData();
        fromData.append("status", 2);
        fromData.append("transactionId", transactionNo);
        const sendData = await axios.post(CommonConstants.NEW_BASE_URL + "/updatestatuscanceltransactionreq", fromData);
        if (sendData.data.status == true) {
            getAllTransaction();
            setMessage("reject");
            setModalShow(true);
        }
        setloadervalue(false);
    }
    useEffect(() => {
        getAllTransaction();
    }, [Search, RowsPerPage, Page]);
    return (
        <>
            {loadervalue == true ? <Loader /> : ""}
            <div className="container-fluid" onClick={() => {
                document.body.classList.remove("offcanvas-active");
            }}>
                <PageHeader HeaderText="Cancel Transactions" Breadcrumb={[{ name: "Dashboard", navigate: "" }, { name: "IoT Dashboard", navigate: "" }]} />
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                        <div className="card">
                            <div className="body project_report">
                                <div className="table-responsive">
                                    <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                                        <div className="filter-row pb-2 ">
                                            Show Entries &nbsp; &nbsp;
                                            <div className="d-flex align-items-center pbSt">
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
                                        <div className="d-flex align-items-center respoChildFooter">
                                            {showSearch && < div className="form-group d-flex align-items-center mb-0">
                                                <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                                                <input
                                                    type="search"
                                                    id="search"
                                                    className="form-control p-0 px-3 "
                                                    placeholder=""
                                                    value={Search}
                                                    onChange={handleSearch}
                                                />
                                            </div>}&nbsp;
                                        </div>
                                    </div>
                                    {AllData && AllData.length > 0 ? (<div style={{ overflowX: "auto" }}>
                                        <table className="table m-b-0 table-hover mt-3">
                                            <thead className="thead-light">
                                                <tr>
                                                    <th>Full Name</th>
                                                    <th>Email</th>
                                                    <th>Mobile</th>
                                                    <th>Customer Id</th>
                                                    <th>Transaction Number</th>
                                                    <th>Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    AllData && AllData.map((res) => (
                                                        <tr>
                                                            <td>{res.fullName ? res.fullName : "-"}</td>
                                                            <td>{res.email ? res.email : "-"}</td>
                                                            <td>{res.phone ? res.phone : "-"}</td>
                                                            <td>{res.customerId ? res.customerId : "-"}</td>
                                                            <td>{res.transactionNo ? res.transactionNo : "-"}</td>
                                                            <td>{moment(res.createdAt).format("YYYY-MM-DD")}</td>
                                                            <td className="project-actions">
                                                                <>
                                                                    {res.status == 0 &&
                                                                        <>
                                                                            <a
                                                                                className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                                                                onClick={() => handleAccept(res.id, res.transactionId)}
                                                                            >
                                                                                <i class="fa fa-check" aria-hidden="true" style={{ color: "green" }} title="Accept"></i>
                                                                            </a>{""}
                                                                            <a
                                                                                className="bg-transparent px-3 py-2 rounded-2 border-1 border pointer border-black mr-1"
                                                                                onClick={() => handleReject(res.id, res.transactionId)}
                                                                            >
                                                                                <i class="fa fa-times" aria-hidden="true" style={{ color: "red" }} title="Reject"></i>
                                                                            </a>
                                                                        </>}
                                                                    {""}
                                                                    <a className="btn btn-outline-secondary mr-1" title='View' onClick={() => handleOpenModel(res.id)}>
                                                                        <RemoveRedEyeIcon />
                                                                    </a>{" "}
                                                                </>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>)
                                        : <NoRecordWithAddBtn />}
                                    {AllData && AllData.length > 0 &&
                                        <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
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
                {/* view model  */}
                < Modal open={openNoteModal} onClose={handleNoteCloseModal} >
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
                            <h5>Details</h5>
                            <div onClick={handleNoteCloseModal} className="pointer">
                                <CloseIcon />
                            </div>
                        </div>
                        <div className="">
                            <div className="row">
                                <div className="my-2">
                                    <ul className='list-unstyled'>
                                        <li className="py-2 d-flex">
                                            <div className="font-weight-normal col-lg-6"> Full Name : </div>
                                            <div className="">{showData.fullName ? showData.fullName : "-"} </div>
                                        </li>
                                        <li className="py-2 d-flex">
                                            <div className="font-weight-normal col-lg-6"> Email : </div>
                                            <div className=" " style={{ overflowWrap: 'break-word' }}>{showData.email ? showData.email : "-"} </div>
                                        </li>
                                        <li className="py-2 d-flex">
                                            <div className="font-weight-normal col-lg-6"> Mobile : </div>
                                            <div className="">{showData.phone ? showData.phone : "-"} </div>
                                        </li>
                                        <li className="py-2 d-flex">
                                            <div className="font-weight-normal col-lg-6"> Customer Id : </div>
                                            <div className="">{showData.customerId ? showData.customerId : "-"} </div>
                                        </li>
                                        <li className="py-2 d-flex">
                                            <div className="font-weight-normal col-lg-6"> Transaction Number : </div>
                                            <div className="">{showData.transactionNo ? showData.transactionNo : "-"} </div>
                                        </li>
                                        <li className="py-2 d-flex">
                                            <div className="font-weight-normal col-lg-6"> Reason : </div>
                                            <div className="">{showData.reason ? showData.reason : "-"} </div>
                                        </li>
                                        <li className="py-2 d-flex">
                                            <div className="font-weight-normal col-lg-6"> Date : </div>
                                            <div className="">{moment(showData.createdAt).format('YYYY-MM-DD')} </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-end mt-3 border-top">
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
                </Modal >
                {/* confim model */}
                <ModalComponentPopup
                    show={modalShowPrChange}
                    title1={`Are you sure want to ${message} this request ?`}
                    cancle={(e) => handlePrchangePopupCancle(e)}
                    SavePr={() => message == "accept" ? handlSendData1() : handlSendData2()}
                />
                <ModalComponent
                    show={modalShow}
                    title11={`${message} successfully`}
                    onHide={() => setModalShow(false)}
                />
            </div>

        </>
    )
};

export default CancelTransactions;