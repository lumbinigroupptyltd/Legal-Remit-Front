// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
// import Pagination from "@mui/material/Pagination";
// import Loader from "../../../Loader/Loader";

// import "./PaymentMethods.scss";
// import PageHeader from "../../../../components/PageHeader";
// import { CommonConstants } from "../../../../Constants/common.constants";
// import ModalComponent from "../../ModalComponent";

// export default function PaymentMethods() {
//   const [allPaymentMethods, setAllPaymentMethods] = useState([]);
//   const [modalShow, setModalShow] = useState(false);
//   const [loadervalue, setloadervalue] = useState(false);

//   const [CountPage, SetCountPage] = React.useState(0);
//   const [Page, SetPage] = React.useState(1);
//   const [RowsPerPage, SetRowsPerPage] = React.useState(5);
//   const [Search, SetSearch] = React.useState("");

//   const navigate = useNavigate();
//   const redirectCreatePaymentMethods = () => {
//     navigate("/create-payment-methods");
//   };

//   const redirectUpdatePaymentMethods = (item) => {
//     navigate("/create-payment-methods", item);
//   };

//   // delete data by id start

//   const handleDelete = async (id) => {
//     console.log(id);
//     setloadervalue(true);

//     await axios
//       .post(`${CommonConstants.BASE_URL}/deletepaymentmethodbyid`, {
//         id: id,
//       })
//       .then((res) => {
//         console.log(res.data.data);
//         getAllPartnerBankList();
//         setloadervalue(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setloadervalue(false);
//       });
//   };

//   // delete data by id ends

//   const getAllPartnerBankList = async () => {
//     // setloadervalue(true);
//     Search === "" ? setloadervalue(true) : setloadervalue(false)

//     var InputParameter = {
//       pageindex: Page,
//       pagesize: RowsPerPage,
//       searchdata: Search === "" ? "%%" : Search,
//       sortparam: "create_at",
//       sortorder: "ASC",
//     };

//     await axios
//       .post(CommonConstants.BASE_URL + "/getallpaymentmethods", InputParameter)
//       .then((res) => {
//         setAllPaymentMethods(res.data.data);
//         SetCountPage(res.data.totalPageCount);
//         console.log("xyz", res);
//         setloadervalue(false);
//       })
//       .catch((err) => {
//         // console.log(err)
//         setloadervalue(false);
//       });
//   };

//   console.log("CountPage", CountPage);

//   const HandleChangePage = (Event, NewPage) => {
//     if (NewPage == Page) {
//       SetPage(NewPage);
//     } else {
//       SetPage(NewPage);
//     }
//     console.log("newpage", NewPage);
//   };

//   const ChangeRowSelected = (Event) => {
//     console.log(Event.target.value);
//     SetRowsPerPage(Number(Event.target.value));
//     SetPage(1);
//     // document.getElementById("hideloding").style.display = "block";
//   };

//   const RequestSearch = (Event) => {
//     if (Event.key === "Enter") {
//       var SearchedVal = document.getElementById("search").value;
//       SetSearch("%" + SearchedVal + "%");
//       SetPage(1);
//     }
//     console.log("serach", SearchedVal);
//   };

//   useEffect(() => {
//     getAllPartnerBankList();
//   }, [Page, Search, RowsPerPage]);

//   return (
//     <div
//       onClick={() => {
//         document.body.classList.remove("offcanvas-active");
//       }}
//     >
//       <div>
//         <div>
//           <div className="container-fluid">
//             <PageHeader
//               HeaderText="Transaction Payment Methods"
//               Breadcrumb={[
//                 { name: "Dashboard", navigate: "" },
//                 { name: "IoT Dashboard", navigate: "" },
//               ]}
//             />
//             {loadervalue == true ? <Loader /> : ""}
//             <div className="row clearfix">
//               <div className="col-lg-12 col-md-12">
//                 <div className="card">
//                   <div className="body project_report">
//                     <div className="table-responsive">
//                       <div className="row ">
//                         <div className=" d-flex justify-content-between">
//                           <a
//                             //  href=""
//                             className="btn btn-primary text-white bolder"
//                             onClick={() => {
//                               redirectCreatePaymentMethods();
//                             }}
//                           >
//                             <i className="text-white fa fa-plus bolder"></i> Add
//                             New
//                           </a>

//                           <a
//                             //  href=""
//                             className="btn btn-info text-white bolder"
//                           >
//                             Update User Order
//                           </a>
//                           {/* <a
//                             href="#!"
//                             className="btn btn-primary bolder text-white ml-4"
//                             onClick={(e) => {
//                               e.preventDefault();
//                             }}
//                           >
//                             <i className="text-white fa fa-cloud-download"></i> &nbsp;

//                             Export
//                           </a> */}
//                         </div>
//                       </div>

//                       <div className="row"></div>
//                       <div className="d-flex justify-content-between">
//                         <div className="filter-row pb-2 ">
//                           Show Entries &nbsp; &nbsp;
//                           <select
//                             name="tbl_meeting_length"
//                             onChange={ChangeRowSelected}
//                             aria-controls="tbl_meeting"
//                             className="form-control form-control-sm p-2 ps-3 mt-2"
//                           >
//                             {CommonConstants.show_rows.map((value) => (
//                               <option value={value}>{value}</option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="form-group d-flex align-items-center">
//                           <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
//                           <input
//                             type="search"
//                             id="search"
//                             className="form-control p-0 px-3"
//                             placeholder=""
//                             onKeyPress={RequestSearch}
//                             onChange={(e) =>
//                               SetSearch("%" + e.target.value + "%")
//                             }
//                           />
//                         </div>
//                       </div>

//                       <table className="table m-b-0 ">
//                         <thead className="thead-light">
//                           <tr>
//                             <th>Name</th>
//                             <th>Logo</th>
//                             <th>Enable</th>
//                             <th>Create</th>
//                             <th>Update</th>

//                             <th>Actions</th>
//                           </tr>
//                         </thead>

//                         {allPaymentMethods.map((item) => {
//                           return (
//                             <tbody>
//                               <tr>
//                                 <td>{item.name}</td>

//                                 <td className="Image_TableData">
//                                   <img
//                                     src={item.logo}
//                                     className="paymentMethodLogo"
//                                   />
//                                 </td>

//                                 <td>
//                                   {item.enabled == true ? "True" : "False"}
//                                 </td>
//                                 <td>
//                                   {moment(item.createdAt).format("DD/MM/YYYY")}
//                                 </td>
//                                 <td>
//                                   {moment(item.updatedAt).format("DD/MM/YYYY")}
//                                 </td>

//                                 <td className="project-actions">
//                                   <a
//                                     className="btn btn-outline-secondary mr-1"
//                                     onClick={() => {
//                                       redirectUpdatePaymentMethods(item.id);
//                                     }}
//                                   >
//                                     <i className="fa fa-edit "></i>
//                                   </a>{" "}
//                                   &nbsp;
//                                   <a
//                                     onClick={() => {
//                                       handleDelete(item.id);
//                                       setModalShow(true);
//                                     }}
//                                     className="btn btn-outline-secondary"
//                                   >
//                                     <i className="fa fa-trash" style={{ color: "red" }}></i>
//                                   </a>
//                                 </td>
//                               </tr>
//                             </tbody>
//                           );
//                         })}
//                       </table>
//                       <div className="d-flex justify-content-between pt-4 mr-4">
//                         <div className="filter-row pt-2">
//                           {/* Showing 1 to 51 of 184 entries */}
//                         </div>

//                         <div>
//                           <ModalComponent
//                             show={modalShow}
//                             title={"User deleted successfully"}
//                             onHide={() => setModalShow(false)}
//                           />
//                         </div>
//                         <div className="form-group d-flex align-items-center">
//                           <div>

//                           </div>
//                           <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" />
//                           {/* <ul id="pagination">
//                             <li>
//                               <a href="#">«</a>
//                             </li>
//                             <li>
//                               <a href="#">1</a>
//                             </li>
//                             <li>
//                               <a href="#" className="">
//                                 2
//                               </a>
//                             </li>
//                             <li>
//                               <a href="#">3</a>
//                             </li>
//                             <li>
//                               <a href="#">4</a>
//                             </li>
//                             <li>
//                               <a href="#">5</a>
//                             </li>
//                             <li>
//                               <a href="#">6</a>
//                             </li>
//                             <li>
//                               <a href="#">7</a>
//                             </li>
//                             <li>
//                               <a href="#">»</a>
//                             </li>
//                           </ul> */}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import axios from 'axios'
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Form from 'react-bootstrap/Form';

import './PaymentMethods.scss'
import PageHeader from "../../../../components/PageHeader";
import { CommonConstants } from "../../../../Constants/common.constants"
import ModalComponent from "../../ModalComponent";
import ModalComponentPopup from '../../ModalComponentPopup'
import NoRecordWithAddBtn from "../../../../Helpers/NoRecord/NoRecordWithAddBtn";
import NoRecord from "../../../../Helpers/NoRecord/NoRecord";

const PaymentMethods = () => {
  const [allPaymentMethods, setAllPaymentMethods] = useState([])
  const [modalShow, setModalShow] = useState(false);
  const [CountPage, SetCountPage] = React.useState(0);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [Search, SetSearch] = React.useState("");
  const [numItems, SetNumItems] = React.useState(0);
  const [modalShowPrChange, setmodalShowPrChange] = useState(false);
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const redirectCreatePaymentMethods = () => {
    navigate("/create-payment-methods")
  }
  const redirectUpdatePaymentMethods = (item) => {
    navigate("/create-payment-methods", item)

  }
  const confirmClick = async (id) => {
    setmodalShowPrChange(true)
    setId(id);
  };
  const handlePrchangePopupCancle = () => {
    setmodalShowPrChange(false);
  };
  const handleDelete = async () => {
    setmodalShowPrChange(false);

    await axios.post(`${CommonConstants.BASE_URL}/deletepaymentmethodbyid`, {
      id: id
    })
      .then(res => {
        setModalShow(true)
        getAllPartnerBankList()
      })
      .catch((err) => {
        console.log(err);
      })
  }
  const getAllPartnerBankList = async () => {

    var InputParameter = {
      pageindex: Page,
      pagesize: RowsPerPage,
      searchdata: Search === "" ? '%%' : Search,
      sortparam: 'create_at',
      sortorder: 'DESC'
    };
    await axios.post(CommonConstants.BASE_URL + "/getallpaymentmethods", InputParameter)
      .then(res => {
        setAllPaymentMethods(res.data.data);
        SetCountPage(res.data.totalPageCount)
        SetNumItems(res.data.recordCount)
        setShowSearch(res.data.recordCount == 0 ? (Search == "" ? false : true) : true);
      })
      .catch(err => {
        console.log(err)
      })
  }
  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(Page);
    } else {
      SetPage(NewPage);
    }
  };
  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
  };
  const RequestSearch = (Event) => {
    if (Event.key === "Enter") {
      var SearchedVal = document.getElementById("search").value;
      SetSearch('%' + SearchedVal + '%');
      SetPage(1);
    }
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    SetSearch(searchTerm);
    setShowSearch(allPaymentMethods.length > 0 || searchTerm.trim() !== '');
  }
  useEffect(() => {
    getAllPartnerBankList()
  }, [Page, Search, RowsPerPage])

  return (
    <div
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div >
          <div className="container-fluid">
            <PageHeader HeaderText="Payment Methods" Breadcrumb={[{ name: "Dashboard", navigate: "" }, { name: "IoT Dashboard", navigate: "" }]} />
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="body project_report">
                    <div className="table-responsive">
                      <div className="row g-0">
                        <div className=" d-flex justify-content-end">
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                        {allPaymentMethods && allPaymentMethods.length > 0 && <div className="filter-row pb-2 pbSt">
                          Show Entries &nbsp; &nbsp;
                          <div className="d-flex align-items-center">
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
                        </div>}
                        <div className="d-flex align-items-center  respoChildFooter">
                          {showSearch && <div className="form-group d-flex align-items-center mb-0">
                            <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                            <input
                              type="search"
                              id="search"
                              className="form-control p-0 px-3"
                              placeholder=""
                              onKeyPress={RequestSearch}
                              onChange={handleSearch}
                            />
                          </div>} &nbsp;&nbsp;
                          <div className="pbSt">
                            <a
                              className="purpleBackground btn btn-default  text-white bolder"
                              onClick={() => {
                                redirectCreatePaymentMethods()
                              }}
                            >
                              <i className="text-white fa fa-plus bolder"></i> Add New
                            </a>
                          </div>
                        </div>
                      </div>
                      {allPaymentMethods &&
                        allPaymentMethods.length > 0 ?
                        (<div style={{ overflowX: "auto" }}>
                          <table className="table m-b-0 ">
                            <thead className="thead-light">
                              <tr>
                                <th>Name</th>
                                <th>Logo</th>
                                <th>Enable</th>
                                <th>Country</th>
                                <th>Create</th>
                                <th>Update</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            {allPaymentMethods.map((item, index) => {
                              return (
                                <tbody key={index}>
                                  <tr >
                                    <td>{item?.name}</td>

                                    <td className="Image_TableData">
                                      <img src={item.logo != "" ? CommonConstants.BASE_URL + item?.logo : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} className="paymentMethodLogo" />
                                    </td>

                                    <td>{item?.enabled == true ? "True" : "False"}</td>
                                    <td>{item?.countryName}</td>
                                    <td>{moment(item?.createdAt).format('DD/MM/YYYY')}</td>
                                    <td>{moment(item?.updatedAt).format('DD/MM/YYYY')}</td>

                                    <td className="project-actions">
                                      <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={() => { redirectUpdatePaymentMethods(item.id) }}>
                                        <i className="fa fa-edit " title="Edit"></i>
                                      </a>{" "}
                                      &nbsp;
                                      <a onClick={() => {
                                        confirmClick(item?.id)
                                      }} className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                        <i className="fa fa-trash" style={{ color: "red" }} title="Delete"></i>
                                      </a>
                                    </td>
                                  </tr>
                                </tbody>
                              )
                            })
                            }
                          </table>
                        </div>)
                        : Search === '' ? (<NoRecord />) : (<NoRecordWithAddBtn />)}
                      {allPaymentMethods && allPaymentMethods.length > 0 && <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                        <div className="filter-row pt-2 pbSt">
                          {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                        </div>
                        <Pagination count={Number(CountPage)} page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                      </div>}
                      <ModalComponent
                        show={modalShow}
                        title11={"Deleted successfully"}
                        onHide={() => setModalShow(false)} />

                      <ModalComponentPopup
                        show={modalShowPrChange}
                        title1={"Are you sure want to delete this record ?"}
                        cancle={(e) => handlePrchangePopupCancle(e)}
                        SavePr={() => handleDelete()}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethods;
