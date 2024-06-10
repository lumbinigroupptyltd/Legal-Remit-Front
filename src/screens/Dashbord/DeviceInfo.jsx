import React, { useEffect, useState } from 'react';
import { CommonConstants } from '../../Constants/common.constants';
import axios from 'axios';
import moment from 'moment';
import NoRecordWithAddBtn from '../../Helpers/NoRecord/NoRecordWithAddBtn';

function DeviceInfo({ individualuserDatas }) {
  const [deviceInfo, setDeviceInfo] = useState([]);

  const getDeviceInfo = async () => {
    const deviceInfoResponse = await axios.post(CommonConstants.BASE_URL + "/getdeviceinfobyuserid", { "userId": individualuserDatas });
    const userDeviceInfo = deviceInfoResponse.data.data;
    setDeviceInfo(userDeviceInfo);
  }

  useEffect(() => {
    getDeviceInfo();
  }, [individualuserDatas]);

  return (
    <div className="container-fluid">
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 px-0">
          <div className="card1">
            <div className="body project_report p-0">
              <table className='table  m-b-0 '>
                <thead className="thead-light">
                  <tr>
                    <th>IP</th>
                    <th>Device</th>
                    <th>OS Version</th>
                    <th>App Version</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceInfo.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        <p>No Data Found</p>
                      </td>
                    </tr>
                  ) : (
                    deviceInfo.map((item, index) => (
                      <tr key={index}>
                        <td>{item?.ip || "-"}</td>
                        <td>{item?.client || "-"}</td>
                        <td>{item?.osVersion || "-"}</td>
                        <td>{item?.appVersion || "-"}</td>
                        <td>{moment(item?.createdAt).format("YYYY-MM-DD")}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceInfo;
