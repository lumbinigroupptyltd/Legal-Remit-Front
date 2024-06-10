import React from "react";
import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./Peer";
import Footer from "./Footer";
import "./Conference.scss";
import { Container, Button, Col, Form, Row, Modal } from "react-bootstrap";

import {
    selectIsConnectedToRoom,
    useHMSActions,
} from "@100mslive/react-sdk";

function Conference({ setShowConference, temp }) {
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const peers = useHMSStore(selectPeers);

    return (
        <>
            <Container fluid className="bg-white py-2 rounded-4 p-0">
                <div className="d-flex respoChildFooter">
                    {/* <div className="headerText py-3">
                        <h1 className="purpleText bolder text-center responsiveFontLargeHeading">Call</h1>
                    </div> */}
                    <div className="conference-section">
                        <div className="peers-container">
                            {peers.map((peer) => (
                                <Peer key={peer.id} peer={peer} />
                            ))}
                        </div>
                    </div>
                </div>
                <Footer setShowConference={setShowConference} temp={temp} />
            </Container>
        </>

    );
}

export default Conference;
