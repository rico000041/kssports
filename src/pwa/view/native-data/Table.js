import React from "react";

import arrow_img from "../../assets/img/native/icon-88.svg";

const Table = ({ column, wagerSelections, title }) => {

    const minimizeHandler = e => {
        if (e.target.parentElement.parentElement.children[1].style.display === "flex") {
            e.target.parentElement.parentElement.children[1].style.display = "none";
            e.target.style.transform = "rotateX(180deg)";
        } else {
            e.target.parentElement.parentElement.children[1].style.display = "flex";
            e.target.style.transform = "rotateX(0deg)";
        }
    }

    return (
        <div className="nativedata-table">
            <div className="table-header">
                <p>{title}</p>
                <img className="table-arrow" src={arrow_img} alt="Minimize" onClick={minimizeHandler} />
            </div>
            <div className={`table-body c${column}`}>
                {wagerSelections.map((item, index) => 
                    <div key={index} className="table-item">
                        <p>{item.SelectionName + (item.Handicap !== null ? item.Handicap : "")}</p>
                        <p>{item.Odds}</p>
                    </div>
                )}            
            </div>
        </div>
    )
}

export default Table
