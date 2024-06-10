import React from "react";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs';
import Document_list from "./Documents_list";
import Documents_Archive from "./Documents_Archive";
const Documents = ({ individualuserData, addDocument }) => {
    return (
        <>
            <Tabs
                defaultActiveKey="document_list"
                id="uncontrolled-tab-example"
                className=" mainUl border-bottom">
                <Tab eventKey="document_list" title="Document list">
                    <Document_list userId={individualuserData} addedDocument={addDocument} />
                </Tab >
                <Tab eventKey="documents_Archive" title="Document Archive">
                    <Documents_Archive userId={individualuserData} />
                </Tab>
            </Tabs>
        </>
    )
}
export default Documents;