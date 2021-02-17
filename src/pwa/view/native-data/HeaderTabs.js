import React from "react";

import { headertabs } from "./config/headertabs";

import double_img from "../../assets/img/native/icon-90.svg";

const HeaderTabs = ({ activeTab, setActiveTab }) => {

    const minimizeAllHandler = e => {
        const allBody = document.getElementsByClassName("table-body");
        const allArrow = document.getElementsByClassName("table-arrow");

        for (let i=0; i<allBody.length; i++) {
            if (e.target.style.transform === "rotateX(0deg)" || e.target.style.transform === "") {
                allBody[i].style.display = "none"; 
                allArrow[i].style.transform = "rotateX(180deg)";   
            } else {
                allBody[i].style.display = "flex";
                allArrow[i].style.transform = "rotateX(0deg)";
            }
        }
        
        if (e.target.style.transform === "rotateX(180deg)") {
            e.target.style.transform = "rotateX(0deg)";
        } else {
            e.target.style.transform = "rotateX(180deg)";
        }
    }

    return (
        <div className="competition-tabs-stick">
            <div className="competition-tabs-container">
                <div className="minimize">
                    <img src={double_img} alt="Minimize" onClick={minimizeAllHandler}/>
                </div>
                <div className="competition-tabs">
                    <div>
                        {headertabs.map((item, index) => 
                            <p 
                                className={activeTab === item.txt ? "active" : ""}
                                onClick={() => setActiveTab(item.txt)} 
                                key={index}
                            >{item.txt}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default HeaderTabs;
