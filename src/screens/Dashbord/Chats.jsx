import React, { useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Chat from "./Chat";
import Note from "./Note";

const Chats = ({ individualuserData }) => {
  useEffect(() => { }, [individualuserData]);

  return (
    <>
      <div className="user-info pt-2 border rounded-2 mx-3 mt-2 px-2">
        <Tabs
          defaultActiveKey="chat"
          id="uncontrolled-tab-example"
          className="mb-3 mainUl border-bottom respoChildFooter"
        >
          <Tab eventKey="chat" title="Chat">
            <Chat individualuserData={individualuserData} />
          </Tab>
          <Tab eventKey="note" title="Note">
            <Note userData={individualuserData} />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
export default Chats;
