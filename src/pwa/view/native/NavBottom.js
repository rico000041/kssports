import React from 'react';

import tropy_img from "../../assets/img/native/icon-40.svg";
import dash_img from "../../assets/img/native/icon-41.svg";
import time_img from "../../assets/img/native/icon-42.svg";
import check_img from "../../assets/img/native/icon-43.svg";
import book_img from "../../assets/img/native/icon-44.svg";

const icons = [
    {
        src: tropy_img,
        alt: "赛选"
    },
    {
        src: dash_img,
        alt: "菜单"
    },
    {
        src: time_img,
        alt: "未结算"
    },
    {
        src: check_img,
        alt: "已结算"
    },
    {
        src: book_img,
        alt: "教程"
    }

]

const NavBottom = () => {
    return (
        <div className="native-navbottom">
            {icons.map((item, index) => 
                <div key={index}>
                    <img src={item.src} alt={item.alt}/>
                    <p>{item.alt}</p>
                </div>
            )}
        </div>
    )
}

export default NavBottom
