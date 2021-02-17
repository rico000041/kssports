import React from "react";
import { Link } from "react-router-dom";
import { get } from "lodash";

import soccer_field from "../../assets/img/native-data/soccer_field.png";
import arrow_img from "../../assets/img/native/icon-55.svg";

const Header = ({ sportid, setSelectGame, singleEvent }) => {
  const market = JSON.parse(localStorage.getItem("market"));

  const timeHandler = () => {
    if (singleEvent) {
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

  return (
    <div>
      <div className="competition-field">
        <img className="field-img" src={soccer_field} alt="Soccer Field" />
        <Link className="back" to={`/native?sport=${sportid}`}>
          <img src={arrow_img} alt="Back" />
        </Link>
        <div className="competition-selectgame">
          <div onClick={() => setSelectGame(true)}>
            <p>
              {singleEvent &&
                singleEvent.Competition &&
                singleEvent.Competition.CompetitionName}
            </p>
            <div></div>
          </div>
        </div>
        <div className="competition-game">
          <div className="competition-team">
            <img
              src={`http://u2daszapp.u2d8899.com/imnativedata/image/teamimage/${get(
                singleEvent,
                "HomeTeamId"
              )}.png`}
              alt="Team Logo"
            />
            <p>{get(singleEvent, "HomeTeam", "")}</p>
          </div>
          <div className="competition-time">
            <p>{timeHandler()}</p>
          </div>
          <div className="competition-team">
            <img
              src={`http://u2daszapp.u2d8899.com/imnativedata/image/teamimage/${get(
                singleEvent,
                "AwayTeamId"
              )}.png`}
              alt="Team Logo"
            />
            <p>{get(singleEvent, "AwayTeam", "")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
