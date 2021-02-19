import React, { useEffect, useState, useContext, useRef } from "react";
import { Link as LinkScroll} from "react-scroll";
import { Link } from "react-router-dom";
import { includes, get } from 'lodash';
import { useWindowDimensions } from "../../util";
import { User , Game as Service, Native  } from "../../service/";
import Slider from 'react-slick';
import { TRANSLATE } from '../../options';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../assets/scss/ContentSA.scss";

import blue_circle from "../assets/img/home/blue_circle.png";
import white_circle from "../assets/img/home/white_circle.png";

//IM ITEMS
import soccer_img from "../assets/img/home/_background/soccer.png";
import basketball_img from "../assets/img/home/_background/basketball.png";
import tennis_img from "../assets/img/home/_background/tennis.png";
import volleyball_img from "../assets/img/home/_background/volleyball.png";
// import snooker_img from "../assets/img/home/_background/snooker.png";
import baseball_img from "../assets/img/home/_background/baseball.png";
// import badminton_img from "../assets/img/home/_background/badminton.png";
// import football_img from "../assets/img/home/_background/football.png";
// import rugby_img from "../assets/img/home/_background/rugby.png";
// import iceHockey_img from "../assets/img/home/_background/ice-hockey.png";
// import filedHockey_img from "../assets/img/home/_background/filed-hockey.png";
import tableTennis_img from "../assets/img/home/_background/table-tennis.png";
// import boxing_img from "../assets/img/home/_background/boxing.png";
// import beachVolley_img from "../assets/img/home/_background/beach-volleyball.png"
// import futsol_img from "../assets/img/home/_background/futsol.png"
// import golf_img from "../assets/img/home/_background/golf.png"
// import cricket_img from "../assets/img/home/_background/cricket.png"
// import darts_img from "../assets/img/home/_background/darts.png"
// import handball_img from "../assets/img/home/_background/handball.png"

//BTI ITEMS
import bti_img from "../assets/img/home/_background/bti.png";

//SABA ITEMS
import saba_img from "../assets/img/home/_background/saba.png";

//ESPORTS ITEMS
import esports_img from "../assets/img/home/_background/im_esports.png";

const circle_text = [
  { 
    zh_text: "今日",
    meaning: "today",
    value: 2
  },
  { 
    zh_text: "滚球",
    meaning: "live",
    value: 3 
  },
  { 
    zh_text: "早盘",
    meaning: "weekly",
    value: 1
  },
  { 
    zh_text: "串关",
    meaning: "combo",
    value: true 
  },
  { 
    zh_text: "冠军",
    meaning: "champion",
    value: "" 
  },
];

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
    src: baseball_img,
    alt: "Baseball",
    sportid: 8
  },
  {
    src: tableTennis_img,
    alt: "Table Tennis",
    sportid: 36
  },
  {
    src: volleyball_img,
    alt: "Volleyball",
    sportid: 40
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

  const [activeCircle, setActiveCircle] = useState(0);
  const [market, setMarket] = useState(1);
  const [sportsCount, setSportsCount] = useState([]);
  const [comboCount, setComboCount] = useState([]);
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
    const scrolledContainer = document.getElementsByClassName("content-sa-native-items")[0];
    const card = document.getElementsByClassName("sa-group--item-scroll");

    const scrollHandler = () => {
      
      const cardHeight = card[0].getBoundingClientRect().height + 6;

      for (let i = 0; i < card.length; i++) {
        let offsetX = 0;
        const offsetTop = (i  * cardHeight) - scrolledContainer.scrollTop;
        if (offsetTop >= 0 && offsetTop <= 380) {
          if (offsetTop <= 190) {
            offsetX = offsetTop / 190;
          } else {
            offsetX = 1 - (offsetTop / 380);
          }
        } else {
          offsetX = 0;
        }

        card[i].style.transform = `translateX(${offsetX * 30}px)`;
      }
    }

    scrolledContainer.addEventListener('scroll', scrollHandler);

    return () => scrolledContainer.removeEventListener('scroll', scrollHandler);
  }, [])

  useEffect(() => {
    let market = JSON.parse(localStorage.getItem("market"));
    let iscombo = JSON.parse(localStorage.getItem("iscombo"));

    if (market === null) {
      market = 1;
      setMarket(1);
      localStorage.setItem("market", 1);
    } else {
      setMarket(market);
    }

    if (iscombo) {
      setActiveCircle(3);
    } else {
      if (market === 1) {
        setActiveCircle(2);
      } else if (market === 2) {
        setActiveCircle(0)
      } else {
        setActiveCircle(1)
      }
    }
  }, [])

  useEffect(() => {
    Native.getSportsCount({iscombo: false})
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
    Native.getSportsCount({iscombo: true})
      .promise
      .then(res => {
        console.log(res.info)
        setComboCount(res.info.reduce((total, item) => total + item.Count, 0))
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

  const initialScroll = (i) => {
    let offsetX = 0;
      if (i === 0) {
        offsetX = 0;
      } else if (i === 1 || i === 2) {
        offsetX = 0.5;
      }  else {
        offsetX = 0;
      }

      return `translateX(${offsetX * 30}px)`;
  }

  const countHandler = (sport) => {
    if (market === 1) {
      return sport.EarlyFECount;
    } else if (market === 2) {
      return sport.TodayFECount;
    }
    return sport.RBFECount;
  }

  const totalHandler = (index) => {
    if (index === 0) {
      return totalToday;
    } else if (index === 1) {
      return totalRB;
    } else if (index === 2) {
      return totalEarly;
    } else if (index === 3) {
      return comboCount;
    } else {
      return 0;
    }
  }

  const buttonHandler = (index, value) => {
    let iscombo_copy = false;
    setActiveCircle(index);
    if (index >= 0 && index <= 2) {
      setMarket(value);
      localStorage.setItem("market", value);
      localStorage.setItem("iscombo", false)
    } else if (index === 3) {
      iscombo_copy = true;
      localStorage.setItem("iscombo", true)
    }
    Native.getSportsCount({iscombo: iscombo_copy})
      .promise
      .then(res => {
        console.log(res.info);
        setSportsCount(res.info);
        if (!iscombo_copy) {
          setTotalToday(res.info.reduce((total, item) => total + item.TodayFECount, 0));
          setTotalEarly(res.info.reduce((total, item) => total + item.EarlyFECount, 0));
          setTotalRB(res.info.reduce((total, item) => total + item.RBFECount, 0));
        }
      })
      .catch(err => {})
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
    window.scrollTop = 0;

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
          <div
            className="tab--switch"
            style={{
              transform: `translateX(${tsState.offset - 1}px)`,
            }}
          ></div>
          {/* className={`tab${tab === i ? ' active' : ''}`} onClick={e => _setTab(i, e)} */}
          {["I'M体育", "BTI体育", "沙巴体育", "电子竞技"].map((obj, i) => (
            <LinkScroll
              key={i}
              activeClass=" "
              className={`tab tab-n${i} ${ Number(tab) === i ? 'active': ''}`}
              id={i}
              onClick={(e) => handleSetActive(i, e)}
              to=""
            >
            { TRANSLATE(obj) }
            </LinkScroll>
          ))}
        </div>
      </div>
      <div className={`content-sa-items ${!userAuth.data ? 'not':''}`}>
        <Slider {...body_settings} ref={slideItem}>
          <div className="content-sa-group">
            <div className="content-sa-native">
              <div className="content-sa-polygon">
                {circle_text.map((item, index) => 
                  <div
                    className={"circle-container" + (activeCircle === index ? " circle-active" : "")} 
                    key={index} 
                    onClick={() => buttonHandler(index, item.value)}
                  >
                    <div className="circle-text">
                      <p>{item.zh_text}</p>
                      <p>{totalHandler(index)}</p>
                    </div> 
                    <img className="blue" src={blue_circle} alt="" />
                    <img className="white" src={white_circle} alt="" />
                  </div>
                )}
              </div>
              <div className="content-sa-native-items">
                <div>
                  {sportsCount.length > 0 && sportsCount.map((item, index) => {
                    const sportIndex = IM_ITEMS.findIndex(im_item => im_item.sportid === item.SportId );
                    if (sportIndex >= 0 && sportIndex <= 5 && countHandler(item) !== 0)
                      return (
                        <Link
                          to={`/native?sport=${item.SportId}`}
                          key={index}
                          className="sa-group--item sa-group--item-scroll"
                          style={{transform: initialScroll(index)}}
                        >
                          <div className="native-sportcount">
                            <p>{countHandler(item)}</p>
                            <p>赛</p>
                          </div>
                          <img 
                            src={get(IM_ITEMS[sportIndex], "src", "")} 
                            alt={get(IM_ITEMS[sportIndex], "alt", "")} 
                          />
                        </Link>
                      )
                  })}
                </div>
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
