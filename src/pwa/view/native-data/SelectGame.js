import React from "react";
import { get, lowerCase } from "lodash";

import arrow_back from "../../assets/img/native/icon-54.svg";

const SelectGame = ({
  setSelectGame,
  events,
  eventIdHandler,
  singleEvent,
  eventId,
}) => {
  const market = JSON.parse(localStorage.getItem("market"));

  const timeHandler = () => {
    if (singleEvent !== null) {
      if (market === 3) {
        return singleEvent.RBTime;
      } else {
        let hr = parseInt(singleEvent.EventDate.slice(11, 13)) + 12;
        let day = parseInt(singleEvent.EventDate.slice(8, 11));
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
          singleEvent.EventDate.slice(5, 8).replace("-", "/") +
          day +
          " " +
          hr +
          singleEvent.EventDate.slice(13, 16)
        );
      }
    }
  };

  if (singleEvent)
    return (
      <div className="selectgame">
        <div className="selectgame-header">
          <img
            className="selectgame-back"
            src={arrow_back}
            alt="Back"
            onClick={() => setSelectGame(false)}
          />
          <div onClick={() => setSelectGame(false)}>
            <p>
              {singleEvent !== null && singleEvent.Competition.CompetitionName}
            </p>
            <div></div>
          </div>
        </div>
        <div className="selectgame-body">
          {events.map((item, index) => (
            <div
              className={`selectgame-game ${
                item.EventId === eventId ? "active" : ""
              }`}
              key={index}
              onClick={() => eventIdHandler(item.EventId)}
            >
              <div className="selectgame-team">
                <img
                  src={`http://u2daszapp.u2d8899.com/imnativedata/image/teamimage/${get(
                    item,
                    "HomeTeamId",
                    ""
                  )}.png`}
                  alt="Team Logo"
                />
                <p>{item.HomeTeam}</p>
              </div>
              <div className="selectgame-time">
                <p>{timeHandler()}</p>
              </div>
              <div className="selectgame-team">
                <img
                  src={`http://u2daszapp.u2d8899.com/imnativedata/image/teamimage/${get(
                    item,
                    "AwayTeamId",
                    ""
                  )}.png`}
                  alt="Team Logo"
                />
                <p>{item.AwayTeam}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return null;
};

export default SelectGame;
