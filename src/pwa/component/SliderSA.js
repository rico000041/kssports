import React, { useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../assets/scss/SliderSA.scss";
import { User } from '../../service/';

function SliderSA() {
  const { setUserAuthFN ,userAuth } = useContext(User.Context);

  const onClick = (e) =>{
    if(!userAuth.data){
      e.preventDefault()
      setUserAuthFN(userAuth.status , userAuth.data , true)
    }
  }

  const [banners, setBanners] = useState([
    <Link to="/about" className="slider--item"  onClick={onClick} key={0}>
      <img src={require("../assets/img/slider/item/banner-image1.png")} alt="" />
    </Link>,
    <Link to="/about" className="slider--item"  onClick={onClick} key={1}>
      <img src={require("../assets/img/slider/item/banner-image2.png")} alt="" />
    </Link>,
    <Link to="/about" className="slider--item"  onClick={onClick} key={2}>
      <img src={require("../assets/img/slider/item/banner-image3.png")} alt="" />
    </Link>,
  ])

  useEffect(() => {
    
    fetch("https://u2daszapp.u2d8899.com/newpwa/data/index.php")
    .then(res => res.json())
    .then(data => {

      console.log(data)

      if(data.info.banner) {
        setBanners(data.info.banner)
      }
    })
    .catch(err => console.log(err))

	}, [])

  return (
    <div className="slider-sa">
      <Slider draggable={false} arrows={false} autoplay={true} dots={true}>
        {banners.map((banner, index) => 
					<Link to="/about" className="slider--item" key={index}>
						<img src={banner.imgUrl} alt="" />
					</Link>
				)}
      </Slider>
    </div>
  );
}

export default SliderSA;
