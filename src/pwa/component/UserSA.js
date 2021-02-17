import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import cx from "classnames";

import { User, Inbox } from "../../service/";
import { TRANSLATE } from '../../options'

import "../assets/scss/UserSA.scss";

import {getAuthKey} from '../../util'

function UserSA() {
  const history = useHistory();

  const { setUserAuthFN , userAuth } = useContext(User.Context);
  const [balanceLoad] = useState(0);
  const [inboxCount, setInboxCount] = useState(0);

  const onClick = (e) =>{
    if(!userAuth.data){
      e.preventDefault()
      setUserAuthFN(userAuth.status , userAuth.data , true)
    }
  }
  
  useEffect(() => {
    const q = Inbox.count();
    
    q.promise.then(
      (r) => {
        setInboxCount(+r.info);
      },
      (e) => {
        if (!e.is_aborted) {
          console.info(e);
        }
      }
    );

    return () => q.cancel();
  }, []);

  const UserLink = ({ name, to, className, count , target  }) => {
    if(className === "deposit") {

      return (
        <a 
          href={userAuth.data && 
            `https://sghsrthth9i9.u2d12345.com/newpwa/deposit.php?account=${userAuth.data.account}&auth=${getAuthKey()}`}  
          className={`link-${className}`} 
          target="blank"
          onClick={onClick}
        >
          <i>
          {count ? <span className="count">{count}</span> : null}

          </i>
          <span>{TRANSLATE(name)}</span>
        </a>
      )

    } else {

      return (
        <Link to={to} className={`link-${className}`} onClick={onClick} target={target} >
          <i>
          {count ? <span className="count">{count}</span> : null}

          </i>
          <span>{TRANSLATE(name)}</span>
        </Link>
      )

    }
  }

  const refreshBalance = () => {
    history.push("/profile/transfer");

    // setBalanceLoad(1);

    // User.session({
    // 	...User.read()
    // }).promise.then(r => {

    // 	setBalanceLoad(0);

    // 	setUserAuthFN(1, r.info);

    // });
  };

  // console.log(userAuth)
  // return false

  return (
    <div className={cx("user-sa", "with-loader", { loading: balanceLoad })}>
      <div className="load-spin"></div>
      <div className="user-sa-content">
        {userAuth.data && 
        <div className="user-sa-info">
          <span className="user-sa--name">{userAuth.data.account}</span>
          <div
            className="user-sa--balance"
            tabIndex="0"
            role="button"
            onClick={() => refreshBalance()}
          >
            <span>{TRANSLATE('中心')}:</span>
            <p>
              <span>￥</span>
              {userAuth.data.balance}
            </p>
          </div>
        </div>
        }
        <div className="user-sa-hr" />
        <div className="user-sa-links">
          <UserLink name="充值" to="/profile/deposit?a=1" className="deposit"/>
          <UserLink name="转账" to="/profile/transfer" className="transfer" />
          <UserLink name="提款" to="/profile/withdraw" className="debit" />
          <UserLink
            name="信息"
            to="/inbox"
            className="inbox"
            count={inboxCount}
          />
        </div>
      </div>
    </div>
  );
}

export default UserSA;
