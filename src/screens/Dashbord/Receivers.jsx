import React from "react";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs';
import Receivers_lists from "./Receivers_lists";
import Receiver_Edit_history from "./Receiver_Edit_History ";

const Recievers = ({ individualuserData, addedDocuments }) => {

    return (<>
        <div className='user-info pt-2 border rounded-2 mx-3 mt-2 px-2'>
            <Tabs
                defaultActiveKey="receivers_lists"
                id="uncontrolled-tab-example"
                className="mb-3 mainUl border-bottom respoChildFooter"

            >
                <Tab eventKey="receivers_lists" title="Receivers lists" >
                    <Receivers_lists individualuserData={individualuserData} setreceiverData={addedDocuments} />
                </Tab>
                <Tab eventKey="receiver_Edit_history" title="Receivers Edit history">
                    <Receiver_Edit_history individualuserData={individualuserData} />
                </Tab>
            </Tabs>
        </div>

    </>)
}
export default Recievers;