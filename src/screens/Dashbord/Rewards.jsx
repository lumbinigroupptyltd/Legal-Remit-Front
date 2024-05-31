import React from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs';
import Points from './Points';
import Referral from './ReferralUser';
import Promocode_rewards from './Promocode_rewards';

function Rewards({ individualuserData }) {
  return (
    <>
      <div className='user-info pt-2 border rounded-2 mx-3 mt-2 px-2'>
        <Tabs
          defaultActiveKey="points"
          id="uncontrolled-tab-example"
          className=" mainUl border-bottom"
        >
          <Tab eventKey="points" title="Points">
            <Points userId={individualuserData} />
          </Tab>
          <Tab eventKey="Referral" title="Referral">
            <Referral userId={individualuserData} />
          </Tab>
          <Tab eventKey="Promocode and rewards" title="Promocodes">
            <Promocode_rewards userId={individualuserData} />
          </Tab>

        </Tabs>
      </div>
    </>
  )
}

export default Rewards