import React from "react";

import trophy_img from "../../assets/img/native/icon-40.svg";
import double_img from "../../assets/img/native/icon-90.svg";

const Champion = ({ minimizeAll }) => {
  return (
    <div className="native-champion">
      <div className="native-champion-header">
        <div>
          <img src={trophy_img} alt="Trophy" />
          <p>TEST</p>
        </div>
        <img
          onClick={minimizeAll}
          className="native-minimizeall"
          src={double_img}
          alt="Arrow"
        />
      </div>
    </div>
  );
};

export default Champion;
