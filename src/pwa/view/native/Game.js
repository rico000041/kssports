import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";
import { get } from "lodash";

import arrow_img from "../../assets/img/native/icon-88.svg";
import star_img from "../../assets/img/native/icon-05.svg";

import { header_icons } from "./config/gameheaders";

const Game = ({
  sportEvent,
  market,
  sportid,
  setLiveLink,
  minimize,
  betPopupHandler,
}) => {
  const competitionid = get(sportEvent, "Competition.CompetitionId", 0);
  const eventid = get(sportEvent, "EventId", 0);

  const [oneByTwo, setOneByTwo] = useState([]);
  const [handicap, setHandicap] = useState([]);
  const [size, setSize] = useState([]);

  const handlers = useSwipeable({
    onSwipedLeft: (e) => slideHandler(e),
    onSwipedRight: (e) => slideHandler(e),
  });

  const dropdownHandler = (e) => {
    if (e.target.classList.contains("gamechart-header")) {
      if (e.target.parentElement.classList.contains("gamechart-minimize")) {
        e.target.parentElement.classList.remove("gamechart-minimize");
      } else {
        e.target.parentElement.classList.add("gamechart-minimize");
      }
    }
  };

  const slideHandler = (e) => {
    const gameSliders = document.getElementsByClassName(
      "gamechart-slider-item"
    );
    const dots = document.getElementsByClassName("gamechart-slider-dots");
    for (let i = 0; i < gameSliders.length; i++) {
      if (e.dir === "Left" && gameSliders[i].style.right !== "0px") {
        dots[i].children[0].style.width = "3px";
        dots[i].children[1].style.width = "7px";
        gameSliders[i].style.right = "0px";
      } else if (
        e.dir === "Right" &&
        gameSliders[i].style.right !== "calc((50vw - 4px)*(-1))"
      ) {
        dots[i].children[0].style.width = "7px";
        dots[i].children[1].style.width = "3px";
        gameSliders[i].style.right = "calc((50vw - 4px)*(-1))";
      }
    }
  };

  const timeHandler = () => {
    if (market === 3) {
      return sportEvent.RBTime;
    } else {
      let hr = parseInt(sportEvent.EventDate.slice(11, 13)) + 12;
      let day = parseInt(sportEvent.EventDate.slice(8, 11));
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
      return (
        sportEvent.EventDate.slice(5, 8).replace("-", "/") +
        day +
        " " +
        hr +
        sportEvent.EventDate.slice(13, 16)
      );
    }
  };

  const teamNameHandler = (teamname) => {
    if (teamname.length > 30) {
      return teamname.slice(0, 7) + "...";
    } else {
      return teamname;
    }
  };

  const oneByTwoHandler = (marketIndex, wageIndex) => {
    if (oneByTwo[marketIndex]) {
      return oneByTwo[marketIndex].WagerSelections[wageIndex].Odds;
    } else {
      return "--";
    }
  };

  const handicapHandler = (marketIndex, wageIndex) => {
    if (handicap[marketIndex]) {
      return handicap[marketIndex].WagerSelections[wageIndex].Handicap;
    } else {
      return "--";
    }
  };

  const handicapOddsHandler = (marketIndex, wageIndex) => {
    if (handicap[marketIndex]) {
      return handicap[marketIndex].WagerSelections[wageIndex].Odds;
    } else {
      return "--";
    }
  };

  const sizeHandler = (marketIndex, wageIndex) => {
    if (size[marketIndex]) {
      return size[marketIndex].WagerSelections[wageIndex].Handicap;
    } else {
      return "--";
    }
  };

  const sizeOddsHandler = (marketIndex, wageIndex) => {
    if (size[marketIndex]) {
      return size[marketIndex].WagerSelections[wageIndex].Odds;
    } else {
      return "--";
    }
  };

  useEffect(() => {
    if (sportEvent) {
      setOneByTwo(
        sportEvent.MarketLines.filter((item) => item.BetTypeId === 3)
      );
      setHandicap(
        sportEvent.MarketLines.filter((item) => item.BetTypeId === 1)
      );
      setSize(sportEvent.MarketLines.filter((item) => item.BetTypeId === 2));
    }
  }, []);

  if (sportEvent)
    return (
      <div className={"gamechart" + (minimize ? " gamechart-minimize" : "")}>
        <div className="gamechart-header" onClick={dropdownHandler}>
          <div>
            <img
              src={`http://u2daszapp.u2d8899.com/imnativedata/image/competitionimage/${get(
                sportEvent,
                "Competition.CompetitionId"
              )}.png`}
              alt=""
            />
            <p>{get(sportEvent, "Competition.CompetitionName", "")}</p>
          </div>
          <img className="gamechart-header-min" src={arrow_img} alt="Arrow" />
        </div>
        <div className="gamechart-drop-container">
          <div className="gamechart-drop">
            <div className="gamechart-teams">
              <div className="teams-header">
                <div>
                  <img src="" alt="" />
                  <img src={star_img} alt="Star" />
                </div>
                <div
                  onClick={() =>
                    sportEvent.LiveStreaming > 0 &&
                    setLiveLink(sportEvent.LiveStreamingUrl[0].Url)
                  }
                >
                  <img
                    src={header_icons[0].on}
                    alt={header_icons[0].alt}
                    style={{ opacity: sportEvent.LiveStreaming > 0 ? 1 : 0 }}
                  />
                  <img src={header_icons[0].off} alt={header_icons[0].alt} />
                </div>
                <div>
                  <img
                    src={header_icons[1].on}
                    alt={header_icons[1].alt}
                    style={{ opacity: sportEvent.HasVisualization ? 1 : 0 }}
                  />
                  <img src={header_icons[1].off} alt={header_icons[1].alt} />
                </div>
                <div>
                  <img
                    src={header_icons[2].on}
                    alt={header_icons[2].alt}
                    style={{ opacity: sportEvent.HasNews ? 1 : 0 }}
                  />
                  <img src={header_icons[2].off} alt={header_icons[2].alt} />
                </div>
                <div>
                  <img
                    src={header_icons[3].on}
                    alt={header_icons[3].alt}
                    style={{ opacity: sportEvent.HasStatistic ? 1 : 0 }}
                  />
                  <img src={header_icons[3].off} alt={header_icons[3].alt} />
                </div>
              </div>
              <div className="teams-name">
                <div>
                  <img
                    src={`http://u2daszapp.u2d8899.com/imnativedata/image/teamimage/${get(
                      sportEvent,
                      "HomeTeamId"
                    )}.png`}
                    alt=""
                  />
                  <p>{teamNameHandler(sportEvent.HomeTeam)}</p>
                </div>
                <div>
                  <img
                    src={`http://u2daszapp.u2d8899.com/imnativedata/image/teamimage/${get(
                      sportEvent,
                      "AwayTeamId"
                    )}.png`}
                    alt=""
                  />
                  <p>{teamNameHandler(sportEvent.AwayTeam)}</p>
                </div>
              </div>
              <div className="teams-time">
                <p>
                  {market === 3 && (
                    <span>
                      {sportEvent.HomeScore +
                        " - " +
                        sportEvent.AwayScore +
                        " | "}
                    </span>
                  )}
                  {timeHandler()}
                </p>
              </div>
            </div>

            <div className="gamechart-slider-container" {...handlers}>
              <div className="gamechart-slider-item">
                <div className="gamechart-slider">
                  <div className="slider-column">
                    <p className="slider-header">全场1x2</p>
                    <div>
                      <div
                        className="table-item3"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(oneByTwo[0], "MarketlineId", ""),
                        //     get(
                        //       oneByTwo[0],
                        //       "WagerSelections[0].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">主胜</p>
                        <p className="slider-item-number">
                          {oneByTwoHandler(0, 0)}
                        </p>
                      </div>
                      <div
                        className="table-item3"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(oneByTwo[0], "MarketlineId", ""),
                        //     get(
                        //       oneByTwo[0],
                        //       "WagerSelections[2].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">和局</p>
                        <p className="slider-item-number">
                          {oneByTwoHandler(0, 2)}
                        </p>
                      </div>
                      <div
                        className="table-item3"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(oneByTwo[0], "MarketlineId", ""),
                        //     get(
                        //       oneByTwo[0],
                        //       "WagerSelections[1].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">主负</p>
                        <p className="slider-item-number">
                          {oneByTwoHandler(0, 1)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="slider-column">
                    <p className="slider-header">全场让球</p>
                    <div>
                      <div
                        className="table-item2"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(handicap[0], "MarketlineId", ""),
                        //     get(
                        //       handicap[0],
                        //       "WagerSelections[0].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">
                          {handicapHandler(0, 0)}
                        </p>
                        <p className="slider-item-number">
                          {handicapOddsHandler(0, 0)}
                        </p>
                      </div>
                      <div
                        className="table-item2"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(handicap[0], "MarketlineId", ""),
                        //     get(
                        //       handicap[0],
                        //       "WagerSelections[1].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">
                          {handicapHandler(0, 1)}
                        </p>
                        <p className="slider-item-number">
                          {handicapOddsHandler(0, 1)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="slider-column">
                    <p className="slider-header">全场大小</p>
                    <div>
                      <div
                        className="table-item1"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(size[0], "MarketlineId", ""),
                        //     get(
                        //       size[0],
                        //       "WagerSelections[0].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">
                          大{sizeHandler(0, 0)}
                        </p>
                        <p className="slider-item-number">
                          {sizeOddsHandler(0, 0)}
                        </p>
                      </div>
                      <div
                        className="table-item1"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(size[0], "MarketlineId", ""),
                        //     get(
                        //       size[0],
                        //       "WagerSelections[1].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">
                          小{sizeHandler(0, 1)}
                        </p>
                        <p className="slider-item-number">
                          {sizeOddsHandler(0, 1)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gamechart-slider">
                  <div className="slider-column">
                    <p className="slider-header">全场1x2</p>
                    <div>
                      <div
                        className="table-item3"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(oneByTwo[1], "MarketlineId", ""),
                        //     get(
                        //       oneByTwo[1],
                        //       "WagerSelections[0].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">主胜</p>
                        <p className="slider-item-number">
                          {oneByTwoHandler(1, 0)}
                        </p>
                      </div>
                      <div
                        className="table-item3"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(oneByTwo[1], "MarketlineId", ""),
                        //     get(
                        //       oneByTwo[1],
                        //       "WagerSelections[2].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">和局</p>
                        <p className="slider-item-number">
                          {oneByTwoHandler(1, 2)}
                        </p>
                      </div>
                      <div
                        className="table-item3"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(oneByTwo[1], "MarketlineId", ""),
                        //     get(
                        //       oneByTwo[1],
                        //       "WagerSelections[1].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">主负</p>
                        <p className="slider-item-number">
                          {oneByTwoHandler(1, 1)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="slider-column">
                    <p className="slider-header">全场让球</p>
                    <div>
                      <div
                        className="table-item2"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(handicap[1], "MarketlineId", ""),
                        //     get(
                        //       handicap[1],
                        //       "WagerSelections[0].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                      >
                        <p className="slider-item-header">
                          {handicapHandler(1, 0)}
                        </p>
                        <p className="slider-item-number">
                          {handicapOddsHandler(1, 0)}
                        </p>
                      </div>
                      <div
                        className="table-item2"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(handicap[1], "MarketlineId", ""),
                        //     get(
                        //       handicap[1],
                        //       "WagerSelections[1].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">
                          {handicapHandler(1, 1)}
                        </p>
                        <p className="slider-item-number">
                          {handicapOddsHandler(1, 1)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="slider-column">
                    <p className="slider-header">全场大小</p>
                    <div>
                      <div
                        className="table-item1"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(size[1], "MarketlineId", ""),
                        //     get(
                        //       size[1],
                        //       "WagerSelections[0].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">
                          大{sizeHandler(1, 0)}
                        </p>
                        <p className="slider-item-number">
                          {sizeOddsHandler(1, 0)}
                        </p>
                      </div>
                      <div
                        className="table-item1"
                        // onClick={() =>
                        //   betPopupHandler(
                        //     sportEvent,
                        //     get(size[1], "MarketlineId", ""),
                        //     get(
                        //       size[1],
                        //       "WagerSelections[1].WagerSelectionId",
                        //       ""
                        //     )
                        //   )
                        // }
                        onClick={() => alert("Under Development")}
                      >
                        <p className="slider-item-header">
                          小{sizeHandler(1, 1)}
                        </p>
                        <p className="slider-item-number">
                          {sizeOddsHandler(1, 1)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gamechart-slider-dots">
                <div></div>
                <div></div>
              </div>
            </div>

            <Link
              className="gamechart-number"
              to={`/competition?id=${competitionid}&eventid=${eventid}&sportid=${sportid}`}
            >
              <p>{sportEvent.TotalMarketLineCount}+</p>
            </Link>
          </div>
        </div>
      </div>
    );
  return null;
};

export default Game;
