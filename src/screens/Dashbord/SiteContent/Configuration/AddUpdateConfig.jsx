import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import Button from "@mui/material/Button";
import { CommonConstants, Config } from "../../../../Constants/common.constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../../Loader/Loader";

const AddUpdateConfig = (props) => {
    const [id, setId] = useState(props.location.state);
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [loadervalue, setloadervalue] = useState(false);
    const getById = async () => {
        try {
            setloadervalue(true);
            const getData = await axios.get(CommonConstants.BASE_URL + `/getconfigurationbyid?id=${id}`);
            if (getData.data.status == true) {
                const totalData = getData.data.data;
                setKey(totalData.conKey);
                setValue(totalData.conValue);
            }
            setloadervalue(false);
        } catch (error) {
            console.log(error);
        }
    };
    const UpdateData = async () => {
        const payload = {
            "id": id,
            "conKey": key,
            "conValue": value
        }
        const sendData = await axios.post(CommonConstants.BASE_URL + "/updateconfigurtion", payload);
        if (sendData.data.status == true) {
            navigate("/siteconfig");
        }
    }
    useEffect(() => {
        getById();
    }, [])
    const navigate = useNavigate();
    return (
        <>
            {loadervalue == true ? <Loader /> : ""}
            <div className="container-fluid">
                <div className="mainBoxService mt-5">
                    <div className="serviceHeader bg-white text-black rounded-2">
                        <h3 className="text-black px-4 mx-2  normal  border-bottom  pt-4 pb-3 pb-2 responsiveFontLargeMedium ">
                            Configuration
                        </h3>
                    </div>
                    <div className="mainBoxService-Body bg-white text-black pe-4 ps-4 py-4">
                        <div className="">
                            <div className="row">
                                <div className="col-lg-12 my-2">
                                    <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                                        Key
                                    </div>
                                    <Form.Select aria-label="Default select example" disabled value={key}>
                                        <option value="">Select an option</option>
                                        {Config && Config.map((row, index) => (
                                            <option key={index} value={row.name}>{row.name}</option>
                                        ))}
                                    </Form.Select>
                                    {/* {error && !selectedCategory && <small className="responsiveFontLarge  text-danger"> Please Select an option </small>} */}
                                </div>

                                <div className="col-lg-12 my-2">
                                    <div className="font-weight-normal m-2  mb-3 text-black d-flex">
                                        Value
                                    </div>
                                    <textarea
                                        type="textarea"
                                        className="form-control"
                                        placeholder="Value"
                                        rows="3"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="d-flex my-3">

                                <div
                                    style={{ background: "#AA2AE1", width: "auto" }}
                                    className="rounded btn text-white bolder px-3"
                                    onClick={() => UpdateData()}
                                >
                                    Update
                                </div>

                                <div className="">
                                    <a
                                        className="btn btn-default text-black bolder border 2 mx-2"
                                        onClick={() => navigate("/siteconfig")}
                                    > Cancel
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
};

export default AddUpdateConfig;