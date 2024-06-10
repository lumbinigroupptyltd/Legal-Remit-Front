import React from "react";
import { useVideo } from "@100mslive/react-sdk";
function Peer({ peer }) {
    const { videoRef } = useVideo({
        trackId: peer.videoTrack
    });
    return (
        <div className="peer-container">
            <video
                ref={videoRef}
                className={`peer-videos ${peer.isLocal ? "local" : ""}`}
                autoPlay
                muted
                playsInline
                style={{ width: "100%" }} // Add this style

            />
            <div className="peer-name">
                {peer.name} {peer.isLocal ? "(You)" : "Admin"}
            </div>
        </div>
    );
}

export default Peer;
