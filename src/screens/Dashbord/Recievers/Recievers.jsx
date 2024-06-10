import React, { useState, useEffect } from "react";
import axios from "axios";
import { CommonConstants } from "../../../Constants/common.constants";
import PageHeader from "../../../components/PageHeader";
import moment from "moment";

export default function Recievers() {

  const [recievers, setRecievers] = useState([]);

  const getAllRecievers = async () => {
    await axios.get(CommonConstants.BASE_URL + "/getalluserrecipients",

      {
        headers: {
          //  Authorization:`Bearer ${token}`
        }
      })
      .then(res => {
        setRecievers(res.data.data);
        console.log("xyz", res)

      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllRecievers()
  }, [])

  return (
    <>
      <div >
        <div className="container-fluid"  onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}>
          <PageHeader className="purpleText" HeaderText="Recievers" Breadcrumb={[{ name: "Dashboard", navigate: "" }, { name: "IoT Dashboard", navigate: "" }]} />
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12">
              <div className="card">
                <div className="body project_report">
                  <div className="table-responsive">
                    <div className="d-flex justify-content-between">
                      <div className="filter-row pb-2 ">
                        Show Entries &nbsp; &nbsp;
                        <select className="pl-2 pr-2 border-secondary">
                          <option value="0">1</option>
                          <option value="1">2</option>
                          <option value="2">3</option>
                        </select>
                      </div>
                      <div className="form-group d-flex align-items-center">
                        <label className="font-weight-normal mb-0">Search: </label> &nbsp;&nbsp;
                        <input
                          type="text"
                          className="form-control p-0"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <table className="table m-b-0 ">
                      <thead className="thead-light">
                        <tr>
                          <th>Name</th>
                          <th>Belongs to</th>
                          <th>Contact</th>
                          <th>Address</th>
                          <th>Delievery</th>
                          <th>Added on</th>
                          <th>Action</th>

                        </tr>
                      </thead>

                      {recievers.map((item) => {
                        return (
                          <tbody>

                            <tr>
                              {/* <td></td> */}
                              <td className="project-title">
                                <h6>
                                  <td>{"--"}</td>
                                </h6>
                              </td>
                              <td>{item?.userId}</td>
                              <td>{item?.phone != '' ? item?.phone : '--'}</td>
                              <td>{item?.address != '' ? item?.address : '--'}</td>
                              <td>{item?.deliveryMethodId}</td>
                              <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                              <td className="project-actions">
                                <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
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
                    <div className="d-flex justify-content-between pt-4 mr-4">
                      <div className="filter-row pt-2">
                        {/* Showing 1 to 51 of 184 entries */}
                      </div>
                      <div className="form-group d-flex align-items-center">
                        <ul id="pagination">
                          <li>
                            <a href="#">«</a>
                          </li>
                          <li>
                            <a href="#">1</a>
                          </li>
                          <li>
                            <a href="#" className="">
                              2
                            </a>
                          </li>
                          <li>
                            <a href="#">3</a>
                          </li>
                          <li>
                            <a href="#">4</a>
                          </li>
                          <li>
                            <a href="#">5</a>
                          </li>
                          <li>
                            <a href="#">6</a>
                          </li>
                          <li>
                            <a href="#">7</a>
                          </li>
                          <li>
                            <a href="#">»</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}