import React from 'react'
import DeviceInfo from './DeviceInfo'
import UserActivities from './UserActivities'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs';

function Others({ individualuserData }) {
  return (
    <div>
      <Tabs
        defaultActiveKey="useractivities"
        id="uncontrolled-tab-example"
        className="mb-3 mainUl border-bottom respoChildFooter"
      >
        <Tab eventKey="useractivities" title="User Activities"  >
          <UserActivities userID={individualuserData} />
        </Tab>
        <Tab eventKey="deviceinfo" title="Device Info">
          <DeviceInfo individualuserDatas={individualuserData} />
        </Tab>
      </Tabs>


    </div>
  )
}

export default Others