import React, { useEffect, useState } from "react";
import PageHeader from "../../../../components/PageHeader";
import { Dropdown, Form } from "react-bootstrap";
import { CommonConstants } from "../../../../Constants/common.constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Configuration = () => {
    const navigate = useNavigate();
    const [RowsPerPage, SetRowsPerPage] = useState(CommonConstants.DefaultPageSize);
    const [AllConfig, setAllConfig] = useState([]);

    const ChangeRowSelected = (Event) => {
        SetRowsPerPage(Number(Event.target.value));
        // SetPage(1);
    };
    const handleAddPage = (id) => {
        navigate({
            pathname: "/addupdateconfig",
            state: id
        });
    };
    const getAllConfig = async () => {
        const getData = await axios.get(CommonConstants.BASE_URL + "/getallconfiguration");
        if (getData.data.status == true) {
            setAllConfig(getData.data.data);
        }
    }
    useEffect(() => {
        getAllConfig();
    }, [])
    return (
        <>
            <div className="container-fluid" onClick={() => {
                document.body.classList.remove("offcanvas-active");
            }}>
                <PageHeader
                    HeaderText="Configuration"
                    Breadcrumb={[
                        { name: "Dashboard", navigate: "" },
                        { name: "IoT Dashboard", navigate: "" },
                    ]}
                />
            </div>
            <div className="row clearfix">
                <div className="col-lg-12 col-md-12">
                    <div className="card">
                        <div className="body project_report">
                            <div className="table-responsive">
                                <div className="d-flex justify-content-between align-items-center respoChildFooter ">
                                    <div className="d-none filter-row pb-2 ">
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
                                    <div className="d-none d-flex align-items-center respoChildFooter">
                                        <div className="form-group d-flex align-items-center mb-0">
                                            <label className="font-weight-normal mb-0">
                                                Search:{" "}
                                            </label>{" "}
                                            &nbsp;&nbsp;
                                            <input
                                                type="search"
                                                id="search"
                                                className="form-control p-0 px-3 "
                                                placeholder=""
                                            // onChange={handleSearch}
                                            />
                                        </div>{" "}
                                        &nbsp;
                                        <div className="">
                                            <div className="d-none ps-0 d-flex justify-content-end">
                                                <a
                                                    onClick={() => handleAddPage()}
                                                    className="btn btn-default purpleBackground text-white bolder pbSt"
                                                >
                                                    <i className="text-white fa fa-plus bolder"></i> Add
                                                    New
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ overflowX: "auto" }}>
                                    <table className="table m-b-0 table-hover mt-3">
                                        <thead className="thead-light">
                                            <tr>
                                                <th>Key</th>
                                                <th>Value</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {AllConfig && AllConfig.map((res) => (
                                                <tr>
                                                    <td>{res.conKey}</td>
                                                    <td>{res.conValue}</td>
                                                    <td className="project-actions">
                                                        <a
                                                            onClick={() => handleAddPage(res.id)}
                                                            className="btn btn-outline-secondary mr-1"
                                                        >
                                                            <i className="fa fa-edit" title="Edit"></i>
                                                        </a>
                                                        &nbsp;&nbsp;
                                                        {/* <a
                                                      // onClick={() => { handlOpenDelete() }}
                                                      className="btn btn-outline-secondary mr-1"
                                                  >
                                                      <i
                                                          className="fa fa-trash text-danger"
                                                          title="Edit"
                                                      ></i>
                                                  </a> */}
                                                        &nbsp;
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};
export default Configuration;