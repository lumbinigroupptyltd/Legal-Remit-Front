import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import Chats from './Chats'
import axios from 'axios'
import Userinfo from './UserInfo'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs';
import Compliance from './Compliance';
import Rewards from './Rewards';
import Transactions from './Transactions';
import PageHeader from "../../components/PageHeader";
import { CommonConstants } from '../../Constants/common.constants';

function IndividualUser(props) {
  const [userId, setUserId] = useState();
  const [id, setId] = useState(props.location.state)
  const [activeTab, setActiveTab] = useState(1);
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [isUpdateKyc, setIsUpdateKyc] = useState([]);

  const getData = (selectedData) => {
    setIsUpdateKyc(...isUpdateKyc, selectedData);
  }

  const onTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleTabChange = (tabIndex) => {
    setActiveTabIndex(tabIndex);
  };

  useEffect(() => {
  }, [id])

  return (
    <>
      <div className="container-fluid" onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}>
        <PageHeader
          HeaderText="User Info"
          Breadcrumb={[
            { name: "Dashboard", navigate: "" },
            { name: "IoT Dashboard", navigate: "" },
          ]}
        />

        <div className='bg-white rounded-4 p-4'>

          <div className='row'>

            <div className="col-lg-12 col-md-12 pr-0 pl-0">
              <div className="cardas">
                <div className="bodys">
                  <div className="row">
                    <div className="col-12 border-right">
                      <div className='pb-4'>
                        <ul className="nav nav-pills mobilemainUL  " role="tablist">
                          <li
                            className={`nav-item mb-1 py-2 mx-3  pointer ${activeTab === 1 ? "active" : ""
                              }`}
                            id="bacicTab2-1"
                            role="presentation"
                            onClick={() => {
                              onTabChange(1);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3  ${activeTab === 1 ? "mainPillActive active" : ""
                                }`}
                            >
                              <i className="fa fa-user mr-3" />
                              User Info
                            </a>
                          </li>

                          <li
                            className={`nav-item mb-1 py-2 mx-3  pointer ${activeTab === 2 ? "active" : ""
                              }`}
                            id="bacicTab2-2"
                            role="presentation"
                            onClick={() => {
                              onTabChange(2);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3 ${activeTab === 2 ? "active mainPillActive" : ""
                                }`}
                              style={{
                                backgroundColor: activeTab === 2 ? "#AA2AE1" : "",
                              }}
                            >
                              <i className="fa fa-comments	 mr-2" />
                              Chat
                            </a>
                          </li>

                          <li
                            className={`nav-item mb-1 py-2 mx-3  pointer ${activeTab === 3 ? "active" : ""
                              }`}
                            id="bacicTab2-3"
                            role="presentation"
                            onClick={() => {
                              onTabChange(3);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3 ${activeTab === 3 ? "active mainPillActive" : ""
                                }`}
                            >
                              <i className="fa fa-history mr-2" />
                              Transactions
                            </a>
                          </li>

                          <li
                            className={`nav-item  mb-1 py-2 mx-3   pointer ${activeTab === 4 ? "active " : ""
                              }`}
                            id="bacicTab2-4"
                            role="presentation"
                            onClick={() => {
                              onTabChange(4);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3 ${activeTab === 4 ? "active mainPillActive" : ""
                                }`}
                            >
                              <i className="fa fa-gavel mr-2" />
                              Compliance
                            </a>
                          </li>

                          <li
                            className={`nav-item mb-1 py-2 mx-3  pointer ${activeTab === 5 ? "active" : ""
                              }`}
                            id="bacicTab2-5"
                            role="presentation"
                            onClick={() => {
                              onTabChange(5);
                            }}
                          >
                            <a
                              className={`nav-link mainPill  py-3 ${activeTab === 5 ? "active mainPillActive" : ""
                                }`}

                            >
                              <i className="fa fa-gift mr-2" />
                              Rewards
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-12 pr-0 pl-0">
                      <div className="tab-content pt-0">
                        <div
                          id="bacicTab2pan-1"
                          className={`tab-pane ${activeTab === 1 ? "show active" : ""
                            }`}
                        >
                          <Userinfo individualuserData={id} userIdDetils={isUpdateKyc} />
                        </div>
                        <div
                          id="bacicTab2pan-2"
                          className={`tab-pane ${activeTab === 2 ? "show active" : ""
                            }`}
                        >
                          <Chats individualuserData={id} />
                        </div>
                        <div
                          id="bacicTab2pan-3"
                          className={`tab-pane ${activeTab === 3 ? "show active" : ""
                            }`}
                        >
                          <Transactions individualuserData={id} />
                        </div>

                        <div
                          id="bacicTab2pan-4"
                          className={`tab-pane ${activeTab === 4 ? "show active" : ""
                            }`}
                        >
                          <Compliance individualuserData={id} afterKycData={getData} />
                        </div>

                        <div
                          id="bacicTab2pan-5"
                          className={`tab-pane ${activeTab === 5 ? "show active" : ""
                            }`}
                        >
                          <Rewards individualuserData={id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <Tabs
          defaultActiveKey="userinfo"
          id="uncontrolled-tab-example"
          className=" mainUl border-bottom"
        >
          <Tab eventKey="userinfo" className='text-white' title="User Info">
            <Userinfo individualuserData={individualuserData} />
          </Tab>
          <Tab eventKey="chats" title="Chats">
            <Chats />
          </Tab>
          <Tab eventKey="transactions" title="Transactions">
            <Transactions  individualuserData={userId}/>
          </Tab>
          <Tab eventKey="compliance" title="Compliance">
            <Compliance individualuserData={id} />
          </Tab>
          <Tab eventKey="rewards" title="Rewards">
            <Rewards />
          </Tab>
        </Tabs> */}
        </div>
      </div>
    </>
  )
}

export default IndividualUser