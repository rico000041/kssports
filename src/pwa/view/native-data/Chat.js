import React from "react";

import send_img from "../../assets/img/native/icon-91.svg";

const Chat = () => {
    return (
        <div>
            <div className="chat-bottom">
                <input type="text" />
                <img src={send_img} alt="Send"/>
            </div>
        </div>
    )
}

export default Chat;
