import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Pagination from '@mui/material/Pagination';

import PageHeader from "../../../../components/PageHeader";
import ProjectsListTable from "../../../../components/Pages/ProjectsListTable";
import { ProjectsData } from "../../../../Data/Pages";
import { CommonConstants } from "../../../../Constants/common.constants";
import Loader from "../../../Loader/Loader";
import Form from 'react-bootstrap/Form';
// class Demographic extends React.Component {
//   componentDidMount() {
//     window.scrollTo(0, 0);
//   }
//   render() {

// const {
//   isSiteVisitorDropDown,
//   isGenderOverviewDropDown,
//   isBrowserUsageDropDown,
// } = this.props;

//     return (
//       <div
//         style={{ flex: 1 }}
//         onClick={() => {
//           document.body.classList.remove("offcanvas-active");
//         }}
//       >
//         <div>
//           <div className="container-fluid">
//             <PageHeader
//               HeaderText="Unverified KYCs"
//               Breadcrumb={[
//                 { name: "Page", navigate: "" },
//                 { name: "Projects List", navigate: "" },
//               ]}
//             />
//             <div className="row clearfix">
//               <div className="col-lg-12 col-md-12">
//                 <div className="card">
//                   <div className="body project_report">
//                     <div className="table-responsive">
//                       <div className="d-flex justify-content-between">
//                         <div className="filter-row pb-2 ">
//                           Show Entries &nbsp; &nbsp;
//                           <select className="pl-2 pr-2 border-secondary">
//                             <option value="0">1</option>
//                             <option value="1">2</option>
//                             <option value="2">3</option>
//                           </select>
//                         </div>
//                         <div className="form-group d-flex align-items-center">
//                           <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
//                           <input
//                             type="text"
//                             className="form-control p-0 mr-2"
//                             placeholder=""
//                           />
//                         </div>
//                       </div>

//                       <table className="table m-b-0 ">
//                         <thead className="thead-light">
//                           <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Country</th>
//                             <th>Registered</th>
//                             <th>Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>

//                               <tr >
//                                 <td>John Doe</td>
//                                 <td className="project-title">
//                                   <h6>
//                                     <a>johndoe@gmail.com</a>
//                                   </h6>
//                                   <small>Created 23/1/2023</small>
//                                 </td>
//                                 <td>Nepal</td>
//                                 <td>Created 1/1/2023</td>
//                                 <td className="project-actions">
//                                   <a className="btn btn-outline-secondary mr-1">
//                                     <i className="fa fa-eye text-black"></i>
//                                   </a>{" "}
//                                   &nbsp;
//                                   <a className="btn btn-outline-secondary">
//                                     <i className="fa fa-trash" style={{ color: "red" }}></i>
//                                   </a>
//                                 </td>
//                               </tr>
//                               <tr >
//                                 <td>Maria cales</td>
//                                 <td className="project-title">
//                                   <h6>
//                                     <a>maria@gmail.com</a>
//                                   </h6>
//                                   <small>Created 23/1/2023</small>
//                                 </td>
//                                 <td>Nepal</td>
//                                 <td>Created 21/11/2023</td>
//                                 <td className="project-actions">
//                                   <a className="btn btn-outline-secondary mr-1">
//                                     <i className="fa fa-eye text-black"></i>
//                                   </a>{" "}
//                                   &nbsp;
//                                   <a className="btn btn-outline-secondary">
//                                     <i className="fa fa-trash" style={{ color: "red" }}></i>
//                                   </a>
//                                 </td>
//                               </tr>
//                               <tr >
//                                 <td>Alex Hales</td>
//                                 <td className="project-title">
//                                   <h6>
//                                     <a>alex@gmail.com</a>
//                                   </h6>
//                                   <small>Created 23/1/2023</small>
//                                 </td>
//                                 <td>Nepal</td>
//                                 <td>Created 9/10/2023</td>
//                                 <td className="project-actions">
//                                   <a className="btn btn-outline-secondary mr-1">
//                                     <i className="fa fa-eye text-black"></i>
//                                   </a>{" "}
//                                   &nbsp;
//                                   <a className="btn btn-outline-secondary">
//                                     <i className="fa fa-trash" style={{ color: "red" }}></i>
//                                   </a>
//                                 </td>
//                               </tr>

//                         </tbody>
//                       </table>
//                       <div className="d-flex justify-content-between pt-4 mr-4">
//                         <div className="filter-row pt-2">
//                           {/* Showing 1 to 51 of 184 entries */}
//                         </div>
//                         <div className="form-group d-flex align-items-center">
//                           <ul id="pagination">
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
//                           </ul>
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
//     );
//   }
// }

// const mapStateToProps = ({ ioTReducer }) => ({
//   isSecuritySystem: ioTReducer.isSecuritySystem,
// });

// export default connect(mapStateToProps, {})(Demographic);

function KYC() {

  const [elements, setElements] = useState([])

  const [CountPage, SetCountPage] = React.useState(0);
  const [Page, SetPage] = React.useState(1);
  const [RowsPerPage, SetRowsPerPage] = React.useState(CommonConstants.DefaultPageSize);
  const [Search, SetSearch] = React.useState("");
  const [loadervalue, setloadervalue] = useState(false);
  const [numItems, SetNumItems] = React.useState(0);

  const getNonKYCUsers = async () => {
    // setloadervalue(true);
    Search==="" ? setloadervalue(true) : setloadervalue(false)

    try {

      var InputParameter = {
        pageindex: Page,
        pagesize: RowsPerPage,
        searchdata: Search === "" ? '' : Search,
        sortparam: 'create_at',
        sortorder: 'DESC'
      };


      const getNonKYCUsersResponse = await axios.post(CommonConstants.BASE_URL + "/getallunverifiedusers", InputParameter)
      SetCountPage(getNonKYCUsersResponse.data.totalPageCount)
      setElements(getNonKYCUsersResponse.data.data)
      SetNumItems(getNonKYCUsersResponse.data.recordCount)
      setloadervalue(false);
    } catch (error) {
      console.log(error)
      setloadervalue(false);
    }
  }

  const HandleChangePage = (Event, NewPage) => {
    if (NewPage == Page) {
      SetPage(NewPage);
    } else {
      SetPage(NewPage);
    }
  };

  const ChangeRowSelected = (Event) => {
    SetRowsPerPage(Number(Event.target.value));
    SetPage(1);
    // document.getElementById("hideloding").style.display = "block";
  };

  const RequestSearch = (Event) => {
    if (Event.key === "Enter") {
      var SearchedVal = document.getElementById("search").value;
      SetSearch('%' + SearchedVal + '%');
      SetPage(1);
    }
  };

const handleSearch = (e)=>{
  SetSearch(e.target.value);
  SetPage(1);
}
  useEffect(() => {
    getNonKYCUsers()
  }, [Page, Search, RowsPerPage])

  const redirectUpdateKYCUsers = (item) => {

  }


  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container-fluid">
          <PageHeader
            HeaderText="Unverified KYCs"
            Breadcrumb={[
              { name: "Page", navigate: "" },
              { name: "Projects List", navigate: "" },
            ]}
          />
          {loadervalue == true ? <Loader /> : ""}
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12">
              <div className="card">
                <div className="body project_report">
                  <div className="table-responsive">
                    <div className="d-flex justify-content-between align-items-center respoChildFooter">
                    <div className="filter-row pb-2 ">
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
                      </div>
                      <div className="pbSt">
                      <div className="form-group d-flex align-items-center mb-0 ">
                        <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                        <input
                          type="search"
                          id="search"
                          className="form-control p-0 px-3"
                          placeholder=""
                          onKeyPress={RequestSearch}
                          onChange={handleSearch}
                        />
                      </div>
                      </div>
                    </div>
                    <div style={{ overflowX: "auto" }}>
                    <table className="table m-b-0 ">
                      <thead className="thead-light">
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Country</th>
                          <th>Registered</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      {
                        elements.map((item, index) => {
                          return (
                            <tbody>
                              <tr key={index}>
                                <td>{item.fName + " " + item.mName + " " + item.lName}</td>
                                <td className="project-title">
                                  <h6>
                                    <a>{item.email}</a>
                                  </h6>
                                  <small>Created {item.createdAt}</small></td>
                                <td>{item.countryName}</td>
                                <td>{item.createdAt}</td>
                                <td>
                                  <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={() => { redirectUpdateKYCUsers(item.id) }}>
                                    <i className="fa fa-edit "></i>
                                  </a>{" "}
                                  &nbsp;
                                  <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
                                    <i className="fa fa-trash" style={{ color: "red" }}></i>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          )
                        })
                      }
                    </table>
                    </div>
                    <div className="d-flex justify-content-between pt-4 mr-4 align-items-center respoChildFooter">
                        <div className="filter-row pt-2">
                          {numItems > 0 ? `Showing ${(Page - 1) * RowsPerPage + 1} to ${(Page * RowsPerPage) > numItems ? numItems : (Page * RowsPerPage)} of ${numItems} entries` : "No records Available"}
                        </div>
                      <Pagination count={CountPage} className="pbDowSt pbSt" page={Page} onChange={HandleChangePage} color="secondary" shape="rounded" />
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KYC

