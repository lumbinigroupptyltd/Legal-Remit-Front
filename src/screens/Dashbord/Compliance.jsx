import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CommonConstants } from '../../Constants/common.constants'
import KYC from './KYC';
import Risk_level from './Risk_level';
import Documents from './Documents';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs';
import KycHistories from "./KycHistories";

function Compliance({ individualuserData, afterKycData }) {
  const [documents, setDocuments] = useState([]);

  const addDocument = (document) => {
    setDocuments([...documents, document]);
  };
  return (
    <>
      <div className="user-info pt-2 border rounded-2 mx-0 mt-2 px-2 ">
        <Tabs
          defaultActiveKey="kyc"
          id="uncontrolled-tab-example"
          className=" mainUl border-bottom">
          <Tab eventKey="kyc" title="KYC">
            <KYC individualuserData={individualuserData} documents={documents} afterAddoc={afterKycData} />
          </Tab >

          <Tab eventKey="kyc_histories" title="KYC Histories">
            <KycHistories individualuserData={individualuserData} documents={documents} afterAddoc={afterKycData} />
          </Tab >

          <Tab eventKey="risk_level" title="Risk level">
            <Risk_level individualuserData={individualuserData} />
          </Tab>
          <Tab eventKey="documents" title="Documents">
            <Documents individualuserData={individualuserData} addDocument={addDocument} />
          </Tab>
        </Tabs>
      </div>
    </>

  )
}

export default Compliance

