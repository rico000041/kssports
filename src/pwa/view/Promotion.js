import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { withAuth } from "../util/";
import { Promotions as Service } from "../../service/";
import { Icon } from "../../component/";

import "../assets/scss/PromotionsSA.scss";
import { TRANSLATE } from "../../options";

function Promotion() {
  const [promotion, setPromotion] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTop = 0;

    document.body.classList.add("promotions-page");

    return () => document.body.classList.remove("promotions-page");
  }, []);

  useEffect(() => {
    const req = Service.read_current({
      id,
    });

    req.promise.then(
      (r) => {
        console.log(r);

        setPromotion(r.info);
      },
      (e) => {
        console.warn("Unable to get promotion:", e);
      }
    );

    return () => req.cancel();
  }, [id]);

  return (
    <div className="promotions-sa" style={{ padding: "59px 0 0" }}>
      <div className="promotions-sa-head">
        <div className="promotions-sa-back-wrap">
          <Link to="/promotions">
            <div className="next-arrow" />
          </Link>
        </div>
        <div className="promotions-sa-title">
          <h1>{TRANSLATE('促销活动')}</h1>
        </div>
      </div>
      <div className="promotions-sa-content single">
        <div className="decor-n0"></div>
        <div className="decor-n1"></div>
        {promotion ? (
          <div className="banner">
            <div className="banner-inner">
              <div className="banner-body inside">
                <p dangerouslySetInnerHTML={{ __html: promotion }}></p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default withAuth(Promotion, 0);
