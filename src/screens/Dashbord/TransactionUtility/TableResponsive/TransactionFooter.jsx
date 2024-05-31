import axios from "axios";
import React, { useEffect, useState } from "react";
import { CommonConstants } from "../../../../Constants/common.constants";

const TransactionFooter = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [showPaymentModel, setshowPaymentModel] = useState(true);
    const [deliveryMethodData, setDeliveryMethodData] = useState([]);
    const [paymentMethodData, setPaymentMethodData] = useState([]);
    const [PayoutPartnerData, setPayoutPartnerData] = useState([]);


    const onTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
    }
    const togglePreviewRewards = () => {
        setshowPaymentModel((showPaymentModel) => !showPaymentModel);
    }

    const getTransactionData = async () => {
        try {
            const paymentData = await axios.get(CommonConstants.NEW_BASE_URL + '/gettransactionstatistics?type=payment method');
            const deliveryData = await axios.get(CommonConstants.NEW_BASE_URL + '/gettransactionstatistics?type=delivery method');
            const PayoutData = await axios.get(CommonConstants.NEW_BASE_URL + '/gettransactionstatistics?type=""');
            if (paymentData.data.status == true) {
                setDeliveryMethodData(deliveryData.data.data);
            }
            if (deliveryData.data.status == true) {
                setPaymentMethodData(paymentData.data.data);
            }
            if (PayoutData.data.status == true) {
                setPayoutPartnerData(PayoutData.data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getTransactionData();
    }, [])
    return (
        <>
            <div className="bg-white rounded-4">
                <div className="row">
                    <div className="col-lg-12 col-md-12 pr-0 pl-0">
                        <div className="cardas p-3">
                            <div className="bodys">
                                <div className="row">
                                    <div className="col-12 border-right">
                                        <div className="pb-4">
                                            <ul className="nav nav-pills  navPillResp " role="tablist">
                                                <li className={`nav-item mb-1 py-2 mx-3  pointer ${activeTab === 1 ? "active" : ""
                                                    }`}
                                                    id="bacicTab2-1"
                                                    role="presentation"
                                                    onClick={() => {
                                                        onTabChange(1);
                                                    }}>
                                                    <a
                                                        className={`nav-link mainPill  py-3  ${activeTab === 1 ? "mainPillActive active" : ""
                                                            }`}
                                                    >
                                                        Payment Method
                                                    </a>
                                                </li>
                                                <li className={`nav-item mb-1 py-2 mx-3  pointer ${activeTab === 2 ? "active" : ""
                                                    }`}
                                                    id="bacicTab2-1"
                                                    role="presentation"
                                                    onClick={() => {
                                                        onTabChange(2);
                                                    }}>
                                                    <a
                                                        className={`nav-link mainPill  py-3  ${activeTab === 2 ? "mainPillActive active" : ""
                                                            }`}
                                                    >
                                                        Delivery Method
                                                    </a>
                                                </li>
                                                <li className={`nav-item mb-1 py-2 mx-3  pointer ${activeTab === 3 ? "active" : ""
                                                    }`}
                                                    id="bacicTab2-1"
                                                    role="presentation"
                                                    onClick={() => {
                                                        onTabChange(3);
                                                    }}>
                                                    <a
                                                        className={`nav-link mainPill  py-3  ${activeTab === 3 ? "mainPillActive active" : ""
                                                            }`}
                                                    >
                                                        Payout Partner
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 pr-0 pl-0">
                                    <div className="tab-content pt-0">
                                        <div
                                            id="bacicTab2pan-1"
                                            className={`tab-pane ${activeTab === 1 ? "show active" : ""
                                                }`}
                                        >
                                            <div className="main px-3 px-xl-2">
                                                <div className="container-fluid">
                                                    <div className="row clearfix">
                                                        <div className="col-lg-12 col-md-12 p-0">
                                                            {
                                                                activeTab == 1 ? (
                                                                    <>
                                                                        <div className="  align-items-center respoChildFooter mb-2">
                                                                            <div className="d-flex pbSt align-items-center respoChildFooter justify-content-between ">
                                                                                <h5 className="mb-3 pb-0 purpleText my-4">
                                                                                    Payment Method {" "}
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ overflowX: "auto" }}>
                                                                            <table className="table m-b-0 ">
                                                                                <thead className="thead-light">
                                                                                    <tr>
                                                                                        <th>Payment Method</th>
                                                                                        <th>No of Transaction</th>
                                                                                        <th>Total amount</th>
                                                                                        <th>Service Charge</th>
                                                                                        <th>Average Transaction size</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {
                                                                                        paymentMethodData && paymentMethodData.map((row) => (
                                                                                            <tr>
                                                                                                <td>{row.name}</td>
                                                                                                <td>{row.noOfTransaction}</td>
                                                                                                <td>{row.totalAmount ? row.totalAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/) : ""}</td>
                                                                                                <td>{row.serviceCharge ? row.serviceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/) : ""} </td>
                                                                                                <td>{row.totalAmount && row.noOfTransaction ? (row.totalAmount / row.noOfTransaction)?.toString()?.match(/^\d+(?:\.\d{0,2})?/) : "-"} </td>
                                                                                                {/* <td>{row.totalAmount ? row.totalAmount.toFixed(2) : ""}</td>
                                                                                                <td>{row.serviceCharge ? row.serviceCharge.toFixed(2) : ""} </td>
                                                                                                <td>{row.totalAmount && row.noOfTransaction ? (row.totalAmount / row.noOfTransaction).toFixed(2) : "-"} </td> */}
                                                                                            </tr>
                                                                                        ))
                                                                                    }
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </>
                                                                ) : ""
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            id="bacicTab2pan-1"
                                            className={`tab-pane ${activeTab === 2 ? "show active" : ""
                                                }`}
                                        >
                                            <div className="main px-3 px-xl-2">
                                                <div className="container-fluid">
                                                    <div className="row clearfix">
                                                        <div className="col-lg-12 col-md-12 p-0">
                                                            {
                                                                activeTab == 2 ? (
                                                                    <>
                                                                        <div className="  align-items-center respoChildFooter mb-2">
                                                                            <div className="d-flex pbSt align-items-center respoChildFooter justify-content-between ">
                                                                                <h5 className="mb-3 pb-0 purpleText my-4">
                                                                                    Delivery  Method {" "}
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ overflowX: "auto" }}>
                                                                            <table className="table m-b-0 ">
                                                                                <thead className="thead-light">
                                                                                    <tr>
                                                                                        <th>Payment Method</th>
                                                                                        <th>No of Transaction</th>
                                                                                        <th>Total amount</th>
                                                                                        <th>Service Charge</th>
                                                                                        <th>Average Transaction size</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {
                                                                                        deliveryMethodData && deliveryMethodData.map((row) => (
                                                                                            <tr>
                                                                                                <td>{row.name}</td>
                                                                                                <td>{row.noOfTransaction}</td>
                                                                                                <td>{row.totalAmount ? row.totalAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/) : ""}</td>
                                                                                                <td>{row.serviceCharge ? row.serviceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/) : ""} </td>
                                                                                                <td>{row.totalAmount && row.noOfTransaction ? (row.totalAmount / row.noOfTransaction)?.toString()?.match(/^\d+(?:\.\d{0,2})?/) : "-"} </td>
                                                                                                {/* <td>{row.totalAmount ? row.totalAmount.toFixed(2) : ""}</td>
                                                                                                <td>{row.serviceCharge ? row.serviceCharge.toFixed(2) : ""} </td>
                                                                                                <td>{row.totalAmount && row.noOfTransaction ? (row.totalAmount / row.noOfTransaction).toFixed(2) : "-"} </td> */}
                                                                                            </tr>
                                                                                        ))
                                                                                    }
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </>
                                                                ) : ""
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            id="bacicTab2pan-1"
                                            className={`tab-pane ${activeTab === 3 ? "show active" : ""
                                                }`}
                                        >
                                            <div className="main px-3 px-xl-2">
                                                <div className="container-fluid">
                                                    <div className="row clearfix">
                                                        <div className="col-lg-12 col-md-12 p-0">
                                                            {
                                                                activeTab == 3 ? (
                                                                    <>
                                                                        <div className="  align-items-center respoChildFooter mb-2">
                                                                            <div className="d-flex pbSt align-items-center respoChildFooter justify-content-between ">
                                                                                <h5 className="mb-3 pb-0 purpleText my-4">
                                                                                    Payout Partner {" "}
                                                                                </h5>
                                                                            </div>
                                                                        </div>
                                                                        <div style={{ overflowX: "auto" }}>
                                                                            <table className="table m-b-0 ">
                                                                                <thead className="thead-light">
                                                                                    <tr>
                                                                                        <th>Payment Method</th>
                                                                                        <th>No of Transaction</th>
                                                                                        <th>Total amount</th>
                                                                                        <th>Service Charge</th>
                                                                                        <th>Average Transaction size</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {
                                                                                        PayoutPartnerData && PayoutPartnerData.map((row) => (
                                                                                            <tr>
                                                                                                <td>{row.name}</td>
                                                                                                <td>{row.noOfTransaction}</td>
                                                                                                <td>{row.totalAmount ? row.totalAmount?.toString()?.match(/^\d+(?:\.\d{0,2})?/) : ""}</td>
                                                                                                <td>{row.serviceCharge ? row.serviceCharge?.toString()?.match(/^\d+(?:\.\d{0,2})?/) : ""} </td>
                                                                                                <td>{row.totalAmount && row.noOfTransaction ? (row.totalAmount / row.noOfTransaction)?.toString()?.match(/^\d+(?:\.\d{0,2})?/) : "-"} </td>
                                                                                                {/* <td>{row.totalAmount ? row.totalAmount.toFixed(2) : ""}</td>
                                                                                                <td>{row.serviceCharge ? row.serviceCharge.toFixed(2) : ""} </td>
                                                                                                <td>{row.totalAmount && row.noOfTransaction ? (row.totalAmount / row.noOfTransaction).toFixed(2) : "-"} </td> */}
                                                                                            </tr>
                                                                                        ))
                                                                                    }
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </>
                                                                ) : ""
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
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
export default TransactionFooter;