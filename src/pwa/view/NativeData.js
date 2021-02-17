import React, { useState, useEffect } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import "../assets/scss/NativeData.scss";
import { Native } from "../../service/index";
// import ReactHlsPlayer from "react-hls-player";

import Header from "./native-data/Header";
import HeaderTabs from "./native-data/HeaderTabs";
import Table from "./native-data/Table";
import SelectGame from "./native-data/SelectGame";

const useQuery = () => {
     return new URLSearchParams(useLocation().search);
 }

const NativeData = () => {

     const query = useQuery();
     const history = useHistory();
     const sportid = JSON.parse(query.get("sportid"));
     const competitionid = JSON.parse(query.get("id"));
     const market = JSON.parse(localStorage.getItem("market"));

     const [isLoading, setIsLoading] = useState(true);
     const [activeTab, setActiveTab] = useState("所有盘口");
     const [events, setEvents] = useState([]);
     const [singleEvent, setSingleEvent] = useState(null);
     const [marketLines, setMarketLines] = useState([]);
     const [eventId, setEventId] = useState(JSON.parse(query.get("eventid")));

     const selectGameHandler = (value) => {
          const selectGameElement = document.getElementsByClassName("selectgame")[0];
          if(value) {
               selectGameElement.style.top = "0%";
               selectGameElement.style.opacity = 1;
          } else {
               selectGameElement.style.top = "-100%";
               selectGameElement.style.opacity = 0;
          }
     }

     const eventIdHandler = (id) => {
          console.log(id)
          const single = events.filter(item => item.EventId === id)[0];
          setSingleEvent(single);
          setMarketLines(single.MarketLines.sort((a, b) => a.MarketlineId - b.MarketlineId));
          setEventId(id);

          query.set("eventid", id);
          history.push({ search: `?${query.toString()}` });
     }

     useEffect(() => {
          const app = document.getElementsByClassName("app-sa")[0];
          if (!app.classList.contains("loading")) {
               app.classList.add("loading");
               setIsLoading(true);
          }
          Native.eventSearch({
               sportid: sportid,
               market: market ? market : 1,
               oddstype: 3,
               sort: 0,
               competitionid: [competitionid]
          })
          .promise
          .then(res => {
               console.log(res);
               const single = res.info.filter(item => item.EventId === eventId)[0];
               setEvents(res.info);
               setSingleEvent(single);
               setMarketLines(single.MarketLines.sort((a, b) => a.MarketlineId - b.MarketlineId));
               if (app.classList.contains("loading")) {
                    app.classList.remove("loading");
                    setIsLoading(false);
               }
          })
          .catch(err => {
               if (app.classList.contains("loading")) {
                    app.classList.remove("loading");
                    setIsLoading(false);
               }
          })
     }, [])

     if (events.length !== 0)
          return (
               <div className="nativedata">
                    <SelectGame 
                         setSelectGame={selectGameHandler}
                         events={events}
                         eventIdHandler={eventIdHandler}
                         singleEvent={singleEvent}
                         eventId={eventId}
                    />
                    <Header 
                         setSelectGame={selectGameHandler}
                         sportid={sportid}
                         singleEvent={singleEvent}
                    />
                    <HeaderTabs
                         activeTab={activeTab}
                         setActiveTab={setActiveTab}
                    />
                    {/* <ReactHlsPlayer
                         url={singleEvent !== null && singleEvent.LiveStreamingUrl[0].Url}
                         autoplay={true}
                         controls={true}
                         width="100%"
                         height="auto"
                    /> */}
                    {marketLines && marketLines.map((item, index) => {
                         const wagerSelectionsFiltered = item.WagerSelections.filter(item => item.WagerSelectionId !== 0);
                         const column = wagerSelectionsFiltered.length > 3 ? 2 : wagerSelectionsFiltered.length;
                         if (column > 0) {
                              return (
                                   <Table 
                                        key={index}
                                        column={column}
                                        wagerSelections={wagerSelectionsFiltered} 
                                        title={item.BetTypeName}
                                   />
                              )
                         }
                    }
                    )}
               </div>
          )
     else if (isLoading) 
          return null;
     else 
          return <Redirect to={`/native?sport=${sportid}`}/>
}

export default NativeData;
