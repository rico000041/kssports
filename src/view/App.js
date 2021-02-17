import React, { useState, useEffect } from "react";

import AppPWA from "../pwa/AppPWA";
import { find } from 'lodash'

import { User } from "../service/";

import "../assets/scss/App.scss";

// function referralCheck(location) {

//   const agentName = new URLSearchParams(location.search).get("act");

//   console.log(agentName)
//   localStorage.setItem("referral", JSON.stringify(agentName));

//   const websites = ["https://www.xxx.com/"];
//   const prevURL = document.referrer;
//   const result = websites.filter((site) => site === prevURL);

//   if (result.length > 0) {
//     localStorage.setItem("referral", JSON.stringify("123"));
//   } else if (agentName) {
//     localStorage.setItem("referral", JSON.stringify(agentName));
//   }
// }

function App() {
  const hostname  = window.location.hostname 
  // const hostname = 'ued588.vip'
  const ExternalURL = [
    { code : 1038 , link : 'ued166.vip', } ,
    { code : 1039 , link : 'ued188.vip', } ,
    { code : 1040 , link : 'ued369.vip', } ,
    { code : 1041 , link : 'ued101.vip', } ,
    { code : 1048 , link : 'ued988.vip', } ,
    { code : 1044 , link : 'ubet456.com', } ,
    { code : 1049 , link : 'ued588.vip', } ,
    { code : 1053 , link : 'ued678.vip', } ,
    { code : 1052 , link : 'ued688.vip', } ,
    { code : 1051 , link : 'ued98.vip', } ,
  ]

  const findCode = find(ExternalURL , obj => obj.link === hostname)
  if(findCode){
    localStorage.setItem("referral", JSON.stringify(findCode.code));
    localStorage.setItem("edit", false);

  }else{
    const hostUrl   = window.location.search 
    const agentName = new URLSearchParams(hostUrl).get("act");
    if(agentName){
      console.log('agentName' , agentName)
      localStorage.setItem("referral", JSON.stringify(agentName) );
      localStorage.setItem("edit", true);
    }
  }



  const [userAuth, setUserAuth] = useState({
    status: 0,
    data: {},
    modal: false,
  });

  useEffect(() =>{
    const LANG = localStorage.getItem('lang')
    if(LANG){
      const doc = document.documentElement
      doc.lang = LANG
    }
  },[])

  const setUserAuthFN = (status, data, modal) => setUserAuth({ status, data, modal });

  return (
    <User.Context.Provider value={{ userAuth, setUserAuthFN }}>
      <AppPWA />
    </User.Context.Provider>
  );
}

export default App;
