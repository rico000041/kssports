import React from 'react';
import { Link } from "react-router-dom";

import arrow_img from "../../assets/img/native/icon-55.svg";
import refresh_img from "../../assets/img/native/icon-45.svg";

const Header = ({toggleHandler, toggleSW, marketHandler, market}) => {
    return (
        <div className="native-header">
            <Link to="/">
                <img className="native-header-refresh" src={arrow_img} alt="Arrow"/>
            </Link>
            <div className="native-header-tabs">
                <p 
                    className={market === 2 ? "active" : ""}
                    onClick={() => marketHandler(2)}
                >今日</p>
                <p 
                    className={market === 1 ? "active" : ""}
                    onClick={() => marketHandler(1)}
                >早盘</p>
                <p 
                    className={market === 3 ? "active" : ""}
                    onClick={() => marketHandler(3)}
                >滚球</p>
            </div>
            <div className="native-toggle-sw">
                <Link to="profile/transfer"> 
                    <img src={refresh_img} alt="Refresh"/>
                </Link>
                <label className="switch">
                    <div>串</div>
                    <div>单</div>
                    <input type="checkbox" checked={!toggleSW} onChange={toggleHandler}/>
                    <span className="slider round">
                        <span>{!toggleSW ? "单" : "串"}</span>
                    </span>
                </label>
            </div>
        </div>
    )
}

export default Header;
