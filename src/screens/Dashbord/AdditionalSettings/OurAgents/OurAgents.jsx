import React, { useEffect, useState } from "react";
import axios from 'axios';
import { CommonConstants } from '../../../../Constants/common.constants';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import moment from 'moment';
import { Box, Modal, Button, Pagination,} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Form } from "react-bootstrap";
import NoRecordWithAddBtn from '../../../../Helpers/NoRecord/NoRecordWithAddBtn';
import Loader from "../../../Loader/Loader";
import PageHeader from "../../../../components/PageHeader";

const OurAgents = () => {
    const [openNoteModal, setOpenNoteModal] = useState(false);
    const [loadervalue, setloadervalue] = useState(false);
    const [numItems, SetNumItems] = React.useState(0);
    const [CountPage, SetCountPage] = React.useState(0);
    const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
    const [Page, SetPage] = React.useState(1);
    const [fundData, setFundData] = useState([]);
    const [Search, SetSearch] = React.useState('');
    const [showData, setShowData] = useState({
        "id": 0,
        "firstName": "",
        "lastName": "",
        "company": "",
        "businessStreet": "",
        "businessCountryId": 0,
        "businessCountry": "",
        "businessCity": "",
        "postalCode": "",
        "phone": "",
        "email": "",
        "findUs": "",
        "typeOfBusiness": "",
        "serviceOfferToConsumers": "",
        "isDeclined": null,
        "preferredLanguage": "",
        "monthlyVolumn": "",
        "totalLocation": "",
        "isDeleted": null,
        "createdAt": "",
        "updatedAt": "",
        "isCurrentServiceProvider": null,
        "isPastServiceProvider": null
    });
    const [showSearch, setShowSearch] = useState(false);
    const ChangeRowSelected = (Event) => {
        SetRowsPerPage(Number(Event.target.value));
        SetPage(1);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        SetSearch(searchTerm);
        setShowSearch(fundData.length > 0 || searchTerm.trim() !== '');
    }
    const handleNoteCloseModal = () => {
        setOpenNoteModal(false);
    };
    const HandleChangePage = (Event, NewPage) => {
        if (NewPage == Page) {
            SetPage(NewPage);
        } else {
            SetPage(NewPage);
        }
    };

    const getAllFrontendAgents = async () => {
        setloadervalue(true);
        const payload = {
            "pageindex": Page,
            "pagesize": RowsPerPage,
            "searchdata": Search
        }
        await axios.post(CommonConstants.BASE_URL + '/getallfrontendagents', payload).then((responce) => {
            setFundData(responce.data.data);
            SetCountPage(responce.data.totalPageCount);
            SetNumItems(responce.data.recordCount);
            setShowSearch(responce.data.recordCount == 0 ? (Search == "" ? false : true) : true);
        }).catch(error => {
            console.log(error);
        })
        setloadervalue(false);
    };

    const handleOpenModel = async (id) => {
        await axios.post(CommonConstants.BASE_URL + '/getfrontendagentsbyid', { "id": id }).then((responce) => {
            if (responce.data.status == true) {
                setShowData(responce.data.data);
                setOpenNoteModal(true);
            }
        })
    };

    useEffect(() => {
        getAllFrontendAgents();
    }, [Search, RowsPerPage, Page])
    return (
        <>
            {loadervalue == true ? <Loader /> : ""}
            <div className="container-fluid" onClick={() => {
                document.body.classList.remove("offcanvas-active");
            }}>
                <PageHeader HeaderText="Become an Agent" Breadcrumb={[{ name: "Dashboard", navigate: "" }, { name: "IoT Dashboard", navigate: "" }]} />
                <div className="row clearfix">
                    <div className="col-lg-12 col-md-12">
                        <div className="card">
                            <div className="body project_report">
                                <div className="table-responsive">
                                    <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                                        {fundData && fundData.length > 0 &&
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
                                        }
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
                                            </div>} &nbsp;
                                        </div>
                                    </div>
                                    <div className="row">
                                    </div>
                                    {
                                        fundData && fundData.length > 0 ?
                                            <div style={{ overflowX: "auto" }}>
                                                <table className="table m-b-0 table-hover mt-3">
                                                    <thead className="thead-light">
                                                        <tr>
                                                            <th>Full Name</th>
                                                            <th>Business Email</th>
                                                            <th>Business Phone</th>
                                                            <th>Company</th>
                                                            <th>Business Country</th>
                                                            <th>Monthly Transfer Volume</th>
                                                            <th>Submitted Date</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            fundData.map((row) => {
                                                                return (
                                                                    <tr>
                                                                        <td>{row.firstName == "" ? "-" : row.firstName + row.lastName}</td>
                                                                        <td>{row.email == "" ? "-" : row.email}</td>
                                                                        <td>{row.phone == "" ? "-" : row.phone}</td>
                                                                        <td>{row.company == "" ? '-' : row.company}</td>
                                                                        <td>{row.businessCountry == null ? "-" : row.businessCountry}</td>
                                                                        <td className="text-center">{row.monthlyVolumn == null ? "-" : row.monthlyVolumn}</td>
                                                                        <td>{moment(row.createdAt).format('YYYY-MM-DD')}</td>
                                                                        <td className="project-actions">
                                                                            <a className="btn btn-outline-secondary mr-1" title='View' onClick={() => handleOpenModel(row.id)}>
                                                                                <RemoveRedEyeIcon />
                                                                            </a>{" "}
                                                                            &nbsp;
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>
                                            : <NoRecordWithAddBtn />}

                                </div>
                                {fundData && fundData.length > 0 &&
                                    <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                                        <div className="filter-row pt-2">
                                            {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                                        </div>
                                        <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* view model  */}
            < Modal open={openNoteModal} onClose={handleNoteCloseModal} >
                <Box
                    className="ReportFraudModal"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",

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
                        <div className="row viewModal">
                            <div className="my-2">
                                <ul className='list-unstyled'>
                                    <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Full Name : </div>
                                        <div className="ms-3">{showData.firstName + " " + showData.lastName} </div>
                                    </li>
                                    <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Email : </div>
                                        <div className="ms-3" style={{ overflowWrap: 'break-word' }}>{showData.email} </div>
                                    </li>
                                    <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Mobile : </div>
                                        <div className="ms-3">{showData.phone} </div>
                                    </li>
                                    <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Company : </div>
                                        <div className="ms-3">{showData.company == "" ? "-" : showData.company} </div>
                                    </li>
                                    <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Business Country : </div>
                                        <div className="ms-3">{showData.businessCountry} </div>
                                    </li>
                                    <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Business Street : </div>
                                        <div className="ms-3">{showData.businessStreet} </div>
                                    </li>
                                    <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Business City : </div>
                                        <div className="ms-3">{showData.businessCity} </div>
                                    </li>  <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> PostalCode : </div>
                                        <div className="ms-3">{showData.postalCode} </div>
                                    </li>  <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50">Type of Business : </div>
                                        <div className="ms-3">{showData.typeOfBusiness} </div>
                                    </li>  <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Where did you find us: </div>
                                        <div className="ms-3">{showData.findUs} </div>
                                    </li>  <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Service Offer To Consumers : </div>
                                        <div className="ms-3">{showData.serviceOfferToConsumers} </div>
                                    </li>
                                    <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Preferred Language: </div>
                                        <div className="ms-3">{showData.preferredLanguage} </div>
                                    </li>
                                    <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Anticipated monthly volumes for money transfer: </div>
                                        <div className="ms-3">{showData.monthlyVolumn} </div>
                                    </li>    <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Total locations: </div>
                                        <div className="ms-3">{showData.totalLocation} </div>
                                    </li>
                                    <li className="py-2 d-flex">
                                        <div className="font-weight-normal w-50"> Date : </div>
                                        <div className="ms-3">{moment(showData.createdAt).format('YYYY-MM-DD')} </div>
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
        </>
    )
};

export default OurAgents;