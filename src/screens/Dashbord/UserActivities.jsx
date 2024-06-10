import React, { useEffect, useState } from 'react';
import { CommonConstants } from '../../Constants/common.constants';
import axios from 'axios';
import moment from 'moment';


function UserActivities({ userID }) {
  const [userActivitiesData, setUserActivitiesData] = useState([]);

  const getUserActivitiesLogs = async () => {
    const requsetData = new FormData();
    requsetData.append('userId', userID) //userID getuseractivitieslogs
    await axios.post(CommonConstants.BASE_URL + '/getuseractivitieslogs', requsetData).then((responce) => {
      if (responce.data.status == true) {
        setUserActivitiesData(responce.data.data);
      }
    }).catch(error => console.log(error))
  };

  useEffect(() => {
    getUserActivitiesLogs();
  }, [userID])
  return (
    <>
      <div className="container-fluid">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 px-0">
            <div className="card1">
              <div className="body project_report p-0">
                <div className="table-responsive">
                  <table className="table m-b-0  " >
                    <thead className="thead-light">
                      <tr>
                        <th>Fields</th>
                        <th>Old</th>
                        <th>New</th>
                        <th>Edited on</th>
                        <th>Edited by</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userActivitiesData && userActivitiesData.length > 0 ?
                        userActivitiesData.map((row) => {
                          return (
                            <>
                              <tr>
                                <td>{row.field}</td>
                                <td>{row.oldValue == "" ? "-" : row.oldValue}</td>
                                <td>{row.newValue == "null" || "" ? "-" : row.newValue}</td>
                                <td>{moment(row.editedDate).format('YYYY-MM-DD')}</td>
                                <td>{row.editedByName}</td>
                              </tr>
                            </>
                          )
                        })
                        : <td colSpan={7}><p className='text-center'>No Data Found</p></td>}
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
}

export default UserActivities