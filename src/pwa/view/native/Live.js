import React from "react";
import Draggable from "react-draggable";
import ReactHlsPlayer from "react-hls-player";

const Live = ({ liveLink }) => {
    return (
        <Draggable
            positionOffset={{x: "15vw", y: "20vh"}}      
        >
            <div className="native-live">
                <ReactHlsPlayer 
                    url={liveLink}
                    autoplay={true}
                    width="100%"
                    height="auto"
                />
            </div>
        </Draggable>
    )
}

export default Live;
