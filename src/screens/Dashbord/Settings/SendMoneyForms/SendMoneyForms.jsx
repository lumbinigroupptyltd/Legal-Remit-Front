import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CommonConstants } from '../../../../Constants/common.constants';
import PageHeader from '../../../../components/PageHeader';
import { useNavigate } from 'react-router-dom'
;

const SendMoneyForms = () => {
  const navigate = useNavigate()
  const [country, setCountry] = useState("");
  const [countrys, setCountrys] = useState([]);
  const [fieldSettings, setFieldSettings] = useState({
    country: "",
    name: { isEnabled: true },
    accountNumber: { isEnabled: true },
    address: { isEnabled: true },
    IFSC: { isEnabled: true },
    city: { isEnabled: true },
    postalCode: { isEnabled: true },

  });

  const fieldSettingsData = {
    nepal: {
      name: { isEnabled: true },
      accountNumber: { isEnabled: true },
      address: { isEnabled: true },
      // Set other fields based on the settings for Nepal
    },
    usa: {
      name: { isEnabled: true },
      accountNumber: { isEnabled: false },
      address: { isEnabled: true },
      // Set other fields based on the settings for USA
    },
    // Add settings for other countries
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    const { name, value } = event.target;
    setFieldSettings({ ...fieldSettings, [name]: value })
    setCountry(selectedCountry);
  };

  const handleFieldChange = (fieldName, isEnabled) => {
    setFieldSettings((prevSettings) => ({
      ...prevSettings,
      [fieldName]: { isEnabled },
    }));
  };


  const redirectCreatePaymentMethods = () => {
    navigate("/send-money-forms-create")
  }

  return (
    <div className="container-fluid"      onClick={() => {
      document.body.classList.remove("offcanvas-active");
    }}>
      <PageHeader HeaderText="Send Money Forms" Breadcrumb={[{ name: "Dashboard", navigate: "" }, { name: "IoT Dashboard", navigate: "" }]} />
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12">
          <div className="card">
            <div className="body project_report">
              <div className="table-responsive">
              <div className=" d-flex justify-content-end mb-3">
                          <a
                            //  href=""
                            className="btn btn-default purpleBackground text-white bolder"
                            onClick={() => {
                              redirectCreatePaymentMethods()
                            }}
                          >
                            <i className="text-white fa fa-plus bolder"></i> Add New
                          </a>
                        </div>
                        <div style={{ overflowX: "auto" }}>
                <table className="table m-b-0 ">
                  <thead className="thead-light">
                    <tr>
                      <th>Country</th>
                      <th>fieldName</th>
                      <th>Enable</th>
                      <th>Create Date</th>
                      <th>Update Date</th>
                      {/* <th>Actions</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Nepal</td>
                      <td>AccountNumber</td>
                      <td>True</td>
                      <td>20-06-2023</td>
                      <td>20-06-2023</td>
                    </tr>
                  </tbody>
                </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMoneyForms;
