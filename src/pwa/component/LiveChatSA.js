import React from "react";
import cx from "classnames";

import { Icon } from "../../component/";

import "../assets/scss/MenuSA.scss";

// const FrameURL = "https://vm.providesupport.com/01kenrfglk04u0n305fdg0321r";
const FrameURL = "https://sdfgsdgsg78dfdfec.chat66a.com/chat/text/chat_0U0wsx.html";

const MenuSA = (props) => {
  const { shown, onClose } = props;

  if (!shown) {
    return null;
  }

  return (
    <div className="menu-sa outside">
      <div className={cx("menu-sa-live-chat", { shown: shown })}>
        <button onClick={onClose}>
          <Icon name="close-circle-sharp" />
        </button>
        <iframe title="live chat" src={FrameURL} frameBorder="0" />
      </div>
    </div>
  );
};

export default MenuSA;
