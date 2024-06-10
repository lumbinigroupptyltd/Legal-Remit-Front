

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageHeader from '../../../../components/PageHeader';
import { Link, useNavigate } from 'react-router-dom';
import ModalComponent from '../../ModalComponent';

import { CommonConstants } from '../../../../Constants/common.constants';



function DeliveryMethod() {

    const navigate = useNavigate()

    const token = localStorage.getItem('token');
    // console.log(token)

    const [elements, setElements] = useState([])
    const [elements2, setElements2] = useState([])
    const [modalShow, setModalShow] = useState(false);

    const getData = async () => {

        try {

            const responseData = await axios.get(CommonConstants.BASE_URL + "/getalldeliverymethods")

            setElements(responseData.data.data)
            // setElements2(responseData.data.data)

            // console.log(responseData.data)

        } catch (error) {

            // console.log(error)

        }

    }

    useEffect(() => {
        getData()
    }, [])

    // delete data start

    const handleDelete = async (id) => {

        await axios.post(`${CommonConstants.BASE_URL}/deletedeliverymethodbyid`, {
            id: id
        }).then(res => {
            console.log(res, "res")
            getData()
        })
            .catch((err) => {
                console.log(err);
            })

    }

    // delete data ends

    const redirectUpdateDeliveryMethods = (item) => {
        navigate("/deliveryMethodCreate", item)

    }



    return (
        <>
            <div
                onClick={() => {
                    document.body.classList.remove("offcanvas-active");
                }}
            >
                <div>
                    <div className="container-fluid">
                        <PageHeader HeaderText="Transaction Delivery Methods" Breadcrumb={[{ name: "Dashboard", navigate: "" }, { name: "IoT Dashboard", navigate: "" }]} />
                        <div className="row clearfix">
                            <div className="col-lg-12 col-md-12">
                                <div className="card">
                                    <div className="body project_report">
                                        <div className="table-responsive">
                                            <div className="row d-flex g-0">
                                                <div className="">
                                                    <a
                                                        href="/deliveryMethodCreate"
                                                        className="btn btn-primary text-white bolder"
                                                    >
                                                        <i className="text-white fa fa-plus bolder"></i> Add New
                                                    </a>
                                                    <a href="#!" className="btn btn-primary text-white bolder float-right" onClick={(e) => { e.preventDefault() }}>Update Usage Order</a>
                                                </div>



                                            </div>
                                            <div className="d-flex justify-content-between align-items-center respoChildFooter">
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
                                            <div style={{ overflowX: "auto" }}>
                                                <table className="table m-b-0 ">
                                                    <thead className="thead-light">
                                                        <tr >
                                                            <th>Usage</th>
                                                            <th>Type</th>
                                                            <th>Text</th>
                                                            <th>Default Partner Bank</th>
                                                            <th>Estimated Delivery</th>
                                                            <th>Swift Code</th>
                                                            <th>Sunrise ID</th>
                                                            <th>Nic ID</th>
                                                            <th>Citizens ID</th>
                                                            <th>Everest ID</th>
                                                            <th>NMB ID</th>
                                                            <th>Global ID</th>
                                                            <th>GME ID</th>
                                                            <th>eSewa ID</th>
                                                            <th>iPay ID</th>
                                                            <th>Prabhu ID</th>
                                                            <th>IME ID</th>
                                                            <th>Actions</th>

                                                        </tr>
                                                    </thead>
                                                    {elements.map((item, index) => {
                                                        return (
                                                            <tbody>

                                                                <tr key={index}>
                                                                    <td>{item.id}</td>
                                                                    <td>{item.type}</td>
                                                                    <td>{item.text}</td>
                                                                    <td>{item.partnerBankName}</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>NA</td>
                                                                    <td>
                                                                        {/* <Link to={{
                                                                        pathname: '/deliveryMethod/create',
                                                                        state: item.id
                                                                    }} className="btn btn-outline-secondary mr-1"><i className="fa fa-edit "></i></Link>
                                                                    &nbsp; */}
                                                                        <a className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black" onClick={() => { redirectUpdateDeliveryMethods(item.id) }}>
                                                                            <i className="fa fa-pen text-black"></i>
                                                                        </a>{" "}
                                                                        &nbsp;
                                                                        <a onClick={() => {
                                                                            handleDelete(item.id)
                                                                            setModalShow(true)
                                                                        }} className="bg-transparent  px-3 py-2 rounded-2 border-1 border pointer border-black">
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
                                            <div className="d-flex justify-content-between pt-4 mr-4">
                                                <div className="filter-row pt-2">
                                                    {/* Showing 1 to 51 of 184 entries */}
                                                </div>
                                                <ModalComponent
                                                    show={modalShow}
                                                    title11={"Deleted successfully"}
                                                    onHide={() => setModalShow(false)}
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
        </>
    )
}

export default DeliveryMethod
