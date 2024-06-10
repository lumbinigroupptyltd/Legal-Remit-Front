import React, { useState } from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs';
import Transactionsub from './Transactionssub';
import Recievers from './Receivers';
import Statement from './Statement';
import TransactionUtility from './TransactionUtility';
import TransactionList from './TransactionList';
// import TransactionUtility from './TransactionUtility/TransactionUtility';
function Transactions({ individualuserData }) {
  const [addReciever, setAddReciever] = useState([]);
  const getReceiver = (addRecievers) => {
    setAddReciever(...addReciever, addRecievers);
  };
  return (
    <div className='user-info pt-2 border rounded-2  mt-2'>
      <Tabs
        defaultActiveKey="transactionsub"
        id="uncontrolled-tab-example"
        className="mb-3 mainUl border-bottom respoChildFooter"
      >
        <Tab eventKey="transactionsub" title="Transactions" >
          <TransactionList individualuserData={individualuserData} addDocumens={addReciever} />
        </Tab>
        <Tab eventKey="recievers" title="Receivers">
          <Recievers individualuserData={individualuserData} addedDocuments={getReceiver} />
        </Tab>
        <Tab eventKey="statement" title="Statements">
          <Statement individualuserData={individualuserData} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Transactions