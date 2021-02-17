import React, { useEffect, useState, useContext, useRef } from "react";
import { Link as LinkScroll} from "react-scroll";
import { Link } from "react-router-dom";
import { includes } from 'lodash';
import { useWindowDimensions } from "../../util";
import { User , Game as Service, Native  } from "../../service/";
import Slider from 'react-slick';
import { TRANSLATE } from '../../options';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../assets/scss/ContentSA.scss";

//IM ITEMS
import soccer_img from "../assets/img/home/_background/soccer.svg";
import basketball_img from "../assets/img/home/_background/basketball.svg";
import tennis_img from "../assets/img/home/_background/tennis.svg";
import volleyball_img from "../assets/img/home/_background/volleyball.svg";
// import snooker_img from "../assets/img/home/_background/snooker.svg";
import baseball_img from "../assets/img/home/_background/baseball.svg";
// import badminton_img from "../assets/img/home/_background/badminton.svg";
// import football_img from "../assets/img/home/_background/football.svg";
// import rugby_img from "../assets/img/home/_background/rugby.svg";
// import iceHockey_img from "../assets/img/home/_background/ice-hockey.svg";
// import filedHockey_img from "../assets/img/home/_background/filed-hockey.svg";
import tableTennis_img from "../assets/img/home/_background/table-tennis.svg";
// import boxing_img from "../assets/img/home/_background/boxing.svg";
// import beachVolley_img from "../assets/img/home/_background/beach-volleyball.svg"
// import futsol_img from "../assets/img/home/_background/futsol.svg"
// import golf_img from "../assets/img/home/_background/golf.svg"
// import cricket_img from "../assets/img/home/_background/cricket.svg"
// import darts_img from "../assets/img/home/_background/darts.svg"
// import handball_img from "../assets/img/home/_background/handball.svg"

//BTI ITEMS
import bti_img from "../assets/img/home/_background/bti.svg";

//SABA ITEMS
import saba_img from "../assets/img/home/_background/saba.svg";

//ESPORTS ITEMS
import esports_img from "../assets/img/home/_background/im_esports.svg";

const polygon_pos = {
  "1": "99px",
  "2": "0px",
  "3": "198px"
}

const IM_ITEMS = [
  {
    src: soccer_img,
    alt: "Soccer",
    sportid: 1
  }, 
  {
    src: basketball_img,
    alt: "Basketball",
    sportid: 2
  },
  {
    src: tennis_img,
    alt: "Tennis",
    sportid: 3
  },
  {
    src: volleyball_img,
    alt: "Volleyball",
    sportid: 40
  },
  {
    src: baseball_img,
    alt: "Baseball",
    sportid: 8
  },
  {
    src: tableTennis_img,
    alt: "Table Tennis",
    sportid: 36
  }
];

const BTI_ITEMS = [
  {
    src: bti_img,
    alt: "BTI体育",
    id: 1206
  }
];

const SABA_ITEMS = [
  {
    src: saba_img,
    alt: "沙巴体育",
    id: 1211
  }
];

const ESPORTS_ITEMS = [
  {
    src: esports_img,
    alt: "IM电竞",
    id: 1208
  }
];

function ContentSA() {

  const { setUserAuthFN, userAuth } = useContext(User.Context);
  
  const wd = useWindowDimensions();

  const [tab, setTab] = useState(0);

  const [tsState, setTsState] = useState({
    width: 0,
    offset: 0,
  });

  const [market, setMarket] = useState(1)
  const [sportsCount, setSportsCount] = useState([]);
  const [totalToday, setTotalToday] = useState(0);
  const [totalEarly, setTotalEarly] = useState(0);
  const [totalRB, setTotalRB] = useState(0);

  const slideItem = useRef(null)

  const body_settings = {
    dots: false,
    arrows: false,
    infinite: false,
    swipe: false,
    slidesToShow: 1,
    accessibility: false,
    initialSlide: 0,
    speed: 200,
  }

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
    let iscombo = JSON.parse(localStorage.getItem("iscombo"));
    if (iscombo === null) {
      iscombo = false;
      localStorage.setItem("iscombo", false)
    }
    Native.getSportsCount({iscombo})
      .promise
      .then(res => {
        console.log(res.info)
        setSportsCount(res.info)
        setTotalToday(res.info.reduce((total, item) => total + item.TodayFECount, 0))
        setTotalEarly(res.info.reduce((total, item) => total + item.EarlyFECount, 0))
        setTotalRB(res.info.reduce((total, item) => total + item.RBFECount, 0))
      })
      .catch(err => {})
  }, [])

  useEffect(() => {

    try {
      const _tab = document.querySelector(`a.tab-n${tab}`);
      if (!_tab) {
        return () => {};
      }

      setTab(0);
      const { offsetWidth, offsetLeft } = _tab;
      setTsState({
        width: offsetWidth,
        offset: offsetLeft,
      });
    } catch (e) {
      console.warn(e);
    }

    // eslint-disable-next-line
  }, [wd.width]);

  const countHandler = (sport) => {
    if (market === 1) {
      return sport.EarlyFECount;
    } else if (market === 2) {
      return sport.TodayFECount;
    }
    return sport.RBFECount;
  }

  const marketHandler = (market) => {
    setMarket(market);
    localStorage.setItem("market", market);
  }

  function _setTab(e) {
    const { offsetWidth, offsetLeft } = e.target;

    setTsState({
      width: offsetWidth,
      offset: offsetLeft,
    });
  }

  function handleSetActive(i, e) {

    slideItem.current.slickGoTo(i);
    setTab(i);
    _setTab(e);
    window.scrollTo = (0, 0);

  }

  async function login(id){
    const user = User.read();
    const res = await  Service.login({
      num: 1,
      gameid: id,
      ...user,
    }).promise.then((r) => {
      return r.info
    },(e) => {
      console.log("Unable to login to the game", e);
      return {
        error :  '未激活或者游戏维护'
      }
    });
    return res
    
    // return () => req.cancel();
  }

  async function checkMaitenance(id){
    
    const reqCheck = await Service.checkMaintained({
      gid: id
    }).promise.then( async  r =>{
      // console.log(r);
      return r
    }, e =>{
      // console.log(e)
      return {
        error : e
      }

    })
    return reqCheck

  }


  async function setGame(e, { id, name }) {
    const externals = [
      1206,
      // 1201,
      1211,
      1204, 
      1209, 
      1207,
      1202,
      1203,
      // 1213, new GAME ID
    ]
    // IGNORE 1201  1208 1205
    // console.log(id)
    // return false

    if(!userAuth.data){
      e.preventDefault()
      setUserAuthFN(userAuth.status , userAuth.data , true)
      return false
    }

    const linkInfo = await checkMaitenance(id)
    if(linkInfo.error){
      setUserAuthFN(userAuth.status , userAuth.data , { error : linkInfo.error })
      return false
    }

    let newLink = {
        pathname: `/game/${id}/${name}`,
        search  : "?from_home=1",
    }

    if(includes(externals,id)){
      const loginfo = await login(id)
      newLink ={
        ...newLink,
        pathname : loginfo,
        rest  : {
          target : "_blank"
        }
      }
    }

    setUserAuthFN(userAuth.status , userAuth.data , { wap : newLink })

    // history.push({
    //   pathname: `/game/${id}/${name}`,
    //   search: "?from_home=1",
    // });
  }

  return (
    <div className="content-sa">
      <div className={`content-sa-tabs ${!userAuth.data ? 'not':''}`}>
        <div className={`tabs2 tab-n${tab}`}>
          {/* className={`tab${tab === i ? ' active' : ''}`} onClick={e => _setTab(i, e)} */}
          {["I'M体育", "BTI体育", "沙巴体育", "电子竞技"].map((obj, i) => (
            <LinkScroll
              key={i}
              activeClass=" "
              className={`tab tab-n${i} ${ Number(tab) === i ? 'active': ''}`}
              id={i}
              onClick={(e) => handleSetActive(i, e)}
            >
            { TRANSLATE(obj) }
            </LinkScroll>
          ))}
          <div
            className="tab--switch"
            style={{
              transform: `translateX(${tsState.offset + 3}px)`,
              width: `${tsState.width}px`,
            }}
          ></div>
        </div>
      </div>
      <div className={`content-sa-items ${!userAuth.data ? 'not':''}`}>
        <Slider {...body_settings} ref={slideItem}>
          <div className="content-sa-group">
            <div className="content-sa-native">
              <div className="content-sa-polygon">
                <div 
                  className="content-polygon-active"
                  style={{top: polygon_pos[`${market}`]}}
                ></div>
                <div 
                  className="content-polygon" 
                  onClick={() => marketHandler(2)}
                  style={market === 2 ? {color: "#fff"} : {}}
                >
                  <div>
                    <p>Today</p>
                    <span>{totalToday}</span>
                  </div>
                </div>
                <div 
                  className="content-polygon" 
                  onClick={() => marketHandler(1)}
                  style={market === 1 ? {color: "#fff"} : {}}
                >
                  <div>
                    <p>Early</p>
                    <span>{totalEarly}</span>
                  </div>
                </div>
                <div 
                  className="content-polygon" 
                  onClick={() => marketHandler(3)}
                  style={market === 3 ? {color: "#fff"} : {}}
                >
                  <div>
                    <p>RB</p>
                    <span>{totalRB}</span>
                  </div>  
                </div>
              </div>
              <div className="content-sa-native-items">
                {sportsCount.length > 0 && sportsCount.map((item, index) => {
                  const sportIndex = IM_ITEMS.findIndex(im_item => im_item.sportid === item.SportId );
                  if (sportIndex !== -1 && countHandler(item) !== 0)
                    return (
                      <Link
                        to={`/native?sport=${item.SportId}`}
                        key={index}
                        className="sa-group--item"
                      >
                        <p className="native-sportname">{item.SportName}</p>
                        <div className="native-sportcount">
                          <p>{countHandler(item)}</p>
                          <p>赛</p>
                        </div>
                        <img 
                          src={IM_ITEMS[sportIndex].src} 
                          alt={IM_ITEMS[sportIndex].alt} 
                        />
                      </Link>
                    )
                })}
              </div>
            </div>
          </div>
          <div className="content-sa-group">
            {BTI_ITEMS.map((item, index) => (
              <div
                key={index}
                className="sa-group--item"
                onClick={e => setGame(e, { id: item.id, name: item.alt})}
              >
                <img src={item.src} alt={item.alt} />
              </div>
            ))}
          </div>
          <div className="content-sa-group">
            {SABA_ITEMS.map((item, index) => (
              <div
                key={index}
                className="sa-group--item"
                onClick={e => setGame(e, { id: item.id, name: item.alt})}
              >
                <img src={item.src} alt={item.alt} />
              </div>
            ))}
          </div>
          <div className="content-sa-group">
            {ESPORTS_ITEMS.map((item, index) => (
              <div
                key={index}
                className="sa-group--item"
                onClick={e => setGame(e, { id: item.id, name: item.alt})}
              >
                <img src={item.src} alt={item.alt} />
              </div>
            ))}
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default ContentSA;
