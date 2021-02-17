import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { Native, User } from "../../service/";
import moment from "moment";
import "../assets/scss/Native.scss";

import Header from "./native/Header";
import SportsTabs from "./native/SportsTabs";
import Champion from "./native/Champion";
import Game from "./native/Game";
import NavBottom from "./native/NavBottom";
import Live from "./native/Live";
import Bet from "./native/Bet";
import Filter from "./native/Filter";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const NativeSA = () => {

    const history = useHistory();
    const query = useQuery();

    const [market, setMarket] = useState(0);
    const [toggleSW, setToggleSW] = useState(false);
    const [sportsCount, setSportsCount] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [sportEvent, setSportEvent] = useState(null);
    const [marketLine, setMarketLine] = useState(null);
    const [wager, setWager] = useState(null);
    const [liveLink, setLiveLink] = useState("");
    const [week, setWeek] = useState([]);
    const [day, setDay] = useState("ALL");

    const betPopupHandler = (sportEvent, marketLineId, wagerSelectionId) => {
        const betElement = document.getElementsByClassName("bet")[0];
        if (marketLineId && wagerSelectionId) {
            if (betElement.style.display === "none" || betElement.style.display === "") {
                betElement.style.display = "flex";
                const { MarketLines } = sportEvent;
                const marketLineFiltered = MarketLines.filter(item => item.MarketlineId === marketLineId)[0];
                setSportEvent(sportEvent);
                setMarketLine(marketLineFiltered);
                setWager(marketLineFiltered.WagerSelections.filter(item => item.WagerSelectionId === wagerSelectionId)[0]);
            }
        } else {
            betElement.style.display = "none";
            setSportEvent(null);
            setMarketLine(null);
            setWager(null);
        }
    }

    const betHandler = (amount) => {
        console.log(market)
        Native.bet({
            ...User.read(),
            sportid: activeTab,
            oddstype: 3,
            market: market,
            WagerSelectionInfos: [{
                bettypeid: marketLine.BetTypeId,
                eventid: sportEvent.EventId,
                marketlineid: marketLine.MarketlineId,
                wagerselectionid: wager.WagerSelectionId,
                handicap: wager.Handicap,
                bettypeselectionid: wager.SelectionId,
                outrightteamid: 0,
                homescore: sportEvent.HomeScore,
                awayscore: sportEvent.AwayScore,
                oddstype: wager.OddsType,
                odds: wager.Odds,
                sportid: activeTab,
                market: market,
                specifiers: null,    
            }],
            ComboSelections: [{
                ComboSelection: toggleSW ? 0 : 1,
                StakeAmount: amount
            }],
            wagertype: toggleSW ? 0 : 1,
            customerip: "127.0.0.1",
            serverip: "47.56.81.173",
        })  
        .promise
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const clickSportsTabHandler = (tab) => {
        setActiveTab(tab);
        history.push({ search: `?sport=${tab}` });
    }

    const toggleHandler = () => {
        setToggleSW(prev => prev ? false : true);
        const iscombo = JSON.parse(localStorage.getItem("iscombo"));
        if (iscombo) {
            localStorage.setItem("iscombo", false);
        } else {
            localStorage.setItem("iscombo", true);
        }
    }

    const marketHandler = (market) => {
        setMarket(market);
        localStorage.setItem("market", market);
    }

    const eventSearchHandler = (competitionid) => {
        Native.eventSearch({
            sportid: activeTab,
            market: market,
            oddstype: 3,
            sort: 0,
            competitionid: competitionid
        })
        .promise
        .then(res => {
            console.log(res)
        })
        .catch(err => {

        })
    }

    const minimizeAll = () => {
        const minimizeElement = document.getElementsByClassName("native-minimizeall")[0];
        const allGames = document.getElementsByClassName("gamechart");
        if (minimizeElement.style.transform === "" || minimizeElement.style.transform === "rotateX(0deg)") {
            minimizeElement.style.transform = "rotateX(180deg)";
            for (let i=0; i < allGames.length; i++) {
                if (!allGames[i].classList.contains("gamechart-minimize")) {
                    allGames[i].classList.add("gamechart-minimize");
                }
            }
        } else {
            minimizeElement.style.transform = "rotateX(0deg)";
            for (let i=0; i < allGames.length; i++) {
                if (allGames[i].classList.contains("gamechart-minimize")) {
                    allGames[i].classList.remove("gamechart-minimize");
                }
            }
        }
    }

    const getChineseDay = (date) => {
        const day = date.getDay();
        if (day === 0) 
            return "周日";
        else if (day === 1)
            return "周一";
        else if (day === 2)
            return "周二";
        else if (day === 3)
            return "周三";
        else if (day === 4)
            return "周四";
        else if (day === 5)
            return "周五";
        else if (day === 6)
            return "周六";
        return "";
    }

    const getWeek = () => {
        const fromDate = new Date();
        let result = [new Date(fromDate.setDate(fromDate.getDate()))];
        console.log(fromDate.getDate())
        for (let i = 0; i < 6; i++) {
            result.push(new Date(fromDate.setDate(fromDate.getDate() + 1)));
        }
        return result;
    }

    const timeHandler = (item) => {
        let hr = parseInt(item.EventDate.slice(11,13)) + 12;
        let day = parseInt(item.EventDate.slice(8,11));
        if (hr >= 24) {
            day = day + 1;
            hr = hr - 24;
        }
        if (hr < 10) {
            hr = `0${hr}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }
        return item.EventDate.slice(5,8).replace("-", "/") + day;
    }

    useEffect(() => {
        const week = getWeek();
        setWeek(week);
    }, [])

    useEffect(() => {
        if (events.length > 0) {
            const weekFormatChanged = week.map(item => moment(item).format("MM/DD"))
            if (day === "ALL") {
                setFilteredEvents(events);
            } else if (day === "OTHERS") {
                setFilteredEvents(events.filter(item => !weekFormatChanged.includes(timeHandler(item))))
            } else {
                setFilteredEvents(events.filter(item => timeHandler(item) === day));
            }
        }
    }, [day])

    useEffect(() => {
        let market = JSON.parse(localStorage.getItem("market"));
        if (market === null) {
            market = 1;
            setMarket(1);
            localStorage.setItem("market", 1);
        } else {
            setMarket(market);
        }
    }, [])

    useEffect(() => {
        const iscombo = JSON.parse(localStorage.getItem("iscombo"));
        if (iscombo === null) {
            localStorage.setItem("iscombo", false);
        } else {
            setToggleSW(iscombo);
        }
    }, [])

    useEffect(() => {
        Native.getSportsCount({iscombo: toggleSW})
        .promise
        .then(res => {
            console.log(res.info);
            setSportsCount(res.info);
        })
        .catch(err => {})
    }, [toggleSW])

    useEffect(() => {
        if (activeTab !== 0) {
            const app = document.getElementsByClassName("app-sa")[0];
            if (!app.classList.contains("loading")) {
                app.classList.add("loading");
            }
            setEvents([]);
            setFilteredEvents([]);
            Native.getSportsData({
                sportid: activeTab, 
                oddstype: 3, 
                market: market, 
                sort: 0, 
                iscombo: toggleSW ? 1 : 0,
            })
            .promise
            .then(res => {
                console.log(res);
                if (res.info !== false) {
                    setEvents(res.info.Sports[0].Events);
                    setFilteredEvents(res.info.Sports[0].Events);
                } else {
                    setEvents([]);
                    setFilteredEvents([]);
                }
                if (app.classList.contains("loading")) {
                    app.classList.remove("loading");
                }
            })
            .catch(err => {
                if (app.classList.contains("loading")) {
                    app.classList.remove("loading");
                }
            })
        }
    }, [activeTab, market, toggleSW])

    useEffect(() => {
        setActiveTab(JSON.parse(query.get("sport")))
    }, [])

    return (
        <div className="native">
            <Live 
                liveLink={liveLink}
            />
            <Bet 
                sportEvent={sportEvent}
                betPopupHandler={betPopupHandler}
                wager={wager}
                betHandler={betHandler}
            />
            <div className="native-main-header">
                <Header
                    toggleSW={toggleSW}
                    toggleHandler={toggleHandler}
                    market={market}
                    marketHandler={marketHandler}
                />
                <SportsTabs 
                    sportsCount={sportsCount}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                    clickSportsTabHandler={clickSportsTabHandler}
                    market={market}
                />
            </div>
            {
                market === 1 && 
                <Filter
                    week={week}
                    day={day}
                    setDay={setDay}
                    getChineseDay={getChineseDay}
                />
            }
            <Champion 
                minimizeAll={minimizeAll}
            />
            {filteredEvents.map((item, index) => 
                <Game 
                    key={index} 
                    sportEvent={item} 
                    market={market}
                    sportid={activeTab}
                    eventSearchHandler={eventSearchHandler}
                    setLiveLink={setLiveLink}
                    minimize={index > 20}
                    betPopupHandler={betPopupHandler}
                />
            )}
            <NavBottom />
        </div>
    )
}

export default NativeSA
