import React, { useState } from 'react'
import Info from './Info'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import UserManagement from './UserManagement'
import Others from './Others'
import ScanTekData from './ScanTekData'
import DuplicateUser from './DuplicateUser'

function Userinfo ({individualuserData, userIdDetils}) {
  const [activeTab, setActiveTab] = useState(1)
  const [activeTabIndex, setActiveTabIndex] = useState(1)
  const onTabChange = (tabIndex) => {
    setActiveTab(tabIndex)
  }

  const handleTabChange = (tabIndex) => {
    setActiveTabIndex(tabIndex)
  }

  return (
    <>
      {/* <hr style={{marginTop:"-5px"}}/> */}
      <div className="user-info pt-2 border rounded-2  mt-2 ">
        {/* <div className="col-lg-12 col-md-12 pt-3">
      <div className="cardq">
        <div className="bodyq">
          <ul className="nav nav-tabs-new2" role="tablist">
            <li
              className={`nav-item mr-1 ${activeTab === 1 ? "active" : ""}`}
              id="bacicTab3-1"
              role="presentation"
              onClick={() => {
                onTabChange(1);
              }}
            >
              <a className="nav-link mainPill2 active">Info</a>
            </li>
            <li
              className={`nav-item mr-1 ${activeTab === 2 ? "active" : ""}`}
              id="bacicTab3-2"
              role="presentation"
              onClick={() => {
                onTabChange(2);
              }}
            >
              <a className="nav-link mainPill2" data-toggle="tab">
                User Management
              </a>
            </li>
            <li
              className={`nav-item mr-1 ${activeTab === 3 ? "active" : ""}`}
              id="bacicTab3-3"
              role="presentation"
              onClick={() => {
                onTabChange(3);
              }}
            >
              <a className="nav-link mainPill2" data-toggle="tab">
                Others
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              id="bacicTab3pan-1"
              className={`tab-pane show ${activeTab === 1 ? "active" : ""}`}
            >
                 <Info individualuserData={individualuserData}/>
            </div>
            <div
              id="bacicTab3pan-2"
              className={`tab-pane ${activeTab === 2 ? "active" : ""}`}
            >
        <UserManagement />
            </div>
            <div
              id="bacicTab3pan-3"
              className={`tab-pane ${activeTab === 3 ? "active" : ""}`}
            >
         <Others individualuserData={individualuserData} />
            </div>
          </div>
        </div>
      </div>
    </div> */}

        <Tabs
          defaultActiveKey="info"
          id="uncontrolled-tab-example"
          className="mainUl mobilemainUL border-bottom "
        >
          <Tab className="ps1" eventKey="info" title="Info">
            <Info individualuserData={individualuserData} updatedUSerINFO={userIdDetils}/>
          </Tab>
          <Tab className="ps1" eventKey="usermang" title="User Management">
            <UserManagement individualuserData={individualuserData}/>
          </Tab>
          <Tab className="ps1" eventKey="others" title="Others">
            <Others individualuserData={individualuserData}/>
          </Tab>
          <Tab className="ps1" eventKey="scantek" title="ScanTek Data">
            <ScanTekData id={individualuserData}/>
          </Tab>

          <Tab className="ps1" eventKey="duplicateUser" title="Duplicate/Suspected User">
            <DuplicateUser id={individualuserData}/>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default Userinfo
