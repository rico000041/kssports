import React from "react";
import moment from "moment";

const Filter = ({week, day, setDay, getChineseDay}) => {
    return (
        <div className="datefilter">
            <div className="datefilter-container">
                <div 
                    className={"datefilter-item" + (day === "ALL" ? " active" : "")}
                    onClick={() => setDay("ALL")}
                >
                    <p>全部</p>
                </div>
                {   week &&
                    week.map((item, index) => 
                        <div 
                            key={index} 
                            className={"datefilter-item" + (day === moment(item).format("MM/DD") ? " active" : "")}
                            onClick={() => setDay(moment(item).format("MM/DD"))}
                        >
                            <p>{moment(item).format("MM/DD")}</p>
                            <p>{getChineseDay(item)}</p>
                        </div>
                    )
                }
                <div 
                    className={"datefilter-item" + (day === "OTHERS" ? " active" : "")}
                    onClick={() => setDay("OTHERS")}
                >
                    <p>其他</p>
                </div>
                <div className="datefilter-item-spacer">
                    <p></p>
                </div>
            </div>
        </div>
    )
}

export default Filter;
