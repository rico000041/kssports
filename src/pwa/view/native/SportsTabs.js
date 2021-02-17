import React from "react";

import { sportTab_icons } from "./config/sportstabs";

const SportsTabs = ({sportsCount, activeTab, clickSportsTabHandler, market}) => {

    const countHandler = (index) => {
        if (market === 1) {
        return sportsCount[index].EarlyFECount;
        } else if (market === 2) {
        return sportsCount[index].TodayFECount;
        }
        return sportsCount[index].RBFECount;
    }

    return (
        <div className="sportstabs"> 
            <div className="sportstabs-container">
                {sportsCount.map((item, index) => {
                    const sportIndex = sportTab_icons.findIndex(icon => icon.sportid === item.SportId );
                    if(sportIndex !== -1 && countHandler(index) > 0)
                        return (
                            <div 
                                className={"sportstab" + (item.SportId === activeTab ? " active" : "")} 
                                key={index} 
                                onClick={() => clickSportsTabHandler(item.SportId)}>
                                <div>
                                    <img 
                                        src={sportTab_icons[sportIndex].on} 
                                        alt={item.SportName}
                                    />
                                    <img 
                                        src={sportTab_icons[sportIndex].off} 
                                        alt={item.SportName}
                                    />
                                </div>
                                <p>
                                    {item.SportName.length > 2 ?
                                        item.SportName.slice(0,1) + "..." :
                                        item.SportName
                                    }
                                    <span>{countHandler(index)}</span>
                                </p>
                            </div>
                        )
                })}
            </div>
        </div>
    )
}

export default SportsTabs
