import React, { useState } from "react";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs';
import Transactionsub from "./Transactionssub";
import AddTransaction from "./AddTransaction";
const TransactionList = ({ individualuserData, addDocumens }) => {
    const [activeTab, setActiveTab] = useState('transactionList');
    const handleTabSelect = (tabKey) => {
        setActiveTab(tabKey);
    };

    return (<>
        <div className='user-info pt-2 border rounded-2 mt-2 '>
            <Tabs
                activeKey={activeTab}
                id="uncontrolled-tab-example"
                className="mb-3 mainUl border-bottom respoChildFooter"
                onSelect={handleTabSelect}

            >
                <Tab eventKey="transactionList" title="Transactions lists" >
                    <Transactionsub individualuserData={individualuserData} />
                </Tab>
                <Tab eventKey="transactionAdd" title="Add Transactions">
                    <AddTransaction individualuserData={individualuserData} onSuccess={() => handleTabSelect('transactionList')} addedData={addDocumens} />
                </Tab>
            </Tabs>
        </div>

    </>)
}
export default TransactionList;