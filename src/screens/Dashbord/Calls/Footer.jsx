import React from "react";
import { useAVToggle } from "@100mslive/react-sdk";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
  selectPeers,
} from "@100mslive/react-sdk";
import { Mic, MicOff, Videocam, VideocamOff, Phone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Footer({ setShowConference, temp }) {
  const navigate = new useNavigate();

  const peers = useHMSStore(selectPeers);

  const userCount = peers.length;

  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const handleLeaveCall = () => {
    hmsActions.leave();
  };
  const endCall = () => {
    hmsActions.leave();
    setShowConference(false);
  };
  return (
    <div className="main_control">
      <div className="main_controls_section">
        <div className="main_controls_button" onClick={toggleAudio}>
          {isLocalAudioEnabled ? (
            <>
              <Mic size="large" />
              <span className="button_name">Mute</span>
            </>
          ) : (
            <>
              <MicOff size="large" />
              <span className="button_name">Unmute</span>
            </>
          )}
        </div>

        <div className="main_controls_button" onClick={toggleVideo}>
          {isLocalVideoEnabled ? (
            <>
              <Videocam fontSize="large" />
              <span className="button_name">Stop Video</span>
            </>
          ) : (
            <>
              <VideocamOff fontSize="large" />
              <span className="button_name">Start Video</span>
            </>
          )}
        </div>
      </div>

      <div className="main_controls_section">
        <div className="main_controls_button">
          <>
          <Phone fontSize="large" onClick={() => endCall()} />
            <span className="button_name">End Call</span>
          </>
        </div>
      </div>
    </div>
  );
}

export default Footer;
