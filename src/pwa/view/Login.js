import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";

import { UITabs, FormField } from "../../component/";
import { User as Service } from "../../service/";

import { TRANSLATE } from '../../options'

import "../assets/scss/LoginSA.scss";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function FormSignin(props) {
  const { onLoading } = props;

  const { state: { referrer = "/" } = {} } = useLocation();

  const refUsername = useRef(null);
  const refPassword = useRef(null);

  const [isValid, setValidity] = useState(true);
  const [isLogged, setLogged] = useState(false);
  const [active, setActive] = useState(false);

  const [user, setUser] = useState({
    username: null,
    password: null,
  });

  useEffect(() => {
    if (isValid && user.username !== null && user.password !== null)
      setActive(true);
  }, [user, isValid]);

  function userChange(e) {
    if (
      !isValid &&
      (e.target.name === "password" ||
        (e.target.name === "username" && user.password))
    ) {
      setValidity(true);
    }

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function userLogin() {
    if (!user.password) {
      return void refPassword.current.focus();
    }

    onLoading(true);

    const req = Service.login({...user, username: user.username.toLowerCase()});

    req.promise.then(
      (r) => {
        localStorage.setItem("user", JSON.stringify(user));

        onLoading(false);

        setLogged(true);
      },
      (e) => {
        onLoading(false);

        setValidity(false);
        setActive(false);

        refPassword.current.focus();
      }
    );
  }

  function onTranslate (event , lang) {
      localStorage.setItem('lang' , lang )
      window.location.reload(true);
      event.preventDefault()
      
  }

  if (isLogged) {
    return (
      <Redirect
        to={{
          pathname: referrer,
          state: { from_login: true },
        }}
      />
    );
  }

  return (
    <div className="form form--signin">
      <div className="form-inner">
        <div>
          <FormField
            field={{ label: "用户名" }}
            input={{
              id: "username1",
              name: "username",
              type: "text",
              placeholder: TRANSLATE("用户名"),
              required: true,
              onChange: userChange,
              ref: refUsername,
            }}
          />
          <FormField
            isValid={isValid}
            field={{ label: "密码" }}
            input={{
              id: "password1",
              name: "password",
              type: "password",
              placeholder: TRANSLATE("密码"),
              required: true,
              onChange: userChange,
              ref: refPassword,
            }}
          />
          {!isValid ? (
            <p style={{ color: "#e4451b", marginTop: -15, marginBottom: 20 }}>
              用户名或密码输入不正确
            </p>
          ) : null}
        </div>
        <button
          className={`submit ${active ? "active" : null}`}
          onClick={active ? userLogin : null}
        >
          {TRANSLATE('登录')}
        </button>
      </div>
      <div className="restore-wrap">
        <Link to="/restore">{TRANSLATE('忘记密码了吗')}？</Link>
      </div>
      <div className="lang-wrap">
      
        <Link to="" onClick={(e) =>onTranslate(e , 'zh')}>中文</Link>
        <Link to="" onClick={(e) =>onTranslate(e , 'en')}>English</Link>
      </div>

      <div className="backbutton-wrap">
        <Link to="/">{TRANSLATE('先去逛逛')}</Link>
      </div>
    </div>
  );
}

function FormSignup(props) {
  const { onLoading } = props;

  const refUsername = useRef(null);
  const refPassword = useRef(null);
  const refPasswordOK = useRef(null);
  const refTelephone = useRef(null);
  const refRef = useRef(null);

  const [isValid, setValidity] = useState(0);
  const [isValidPassword, setPasswordValidity] = useState(0);
  const [isValidPasswordok, setPasswordokValidity] = useState(0);
  const [isValidTelephone, setTelephoneValidity] = useState(0);
  const [isCreated, setCreated] = useState(false);
  const [agent] = useState(props.agentName);
  const [active, setActive] = useState(false);
  const [oldUsername, setOldUsername] = useState("null");

  const [user, setUser] = useState({
    username: null,
    password: null,
    passwordok: null,
  });

  useEffect(() => {
    if (!user.agentName && agent) {
      setUser({
        ...user,
        agentName: agent,
      });
    }
  }, [user, agent]);

  function onFocus() {
    if (!user.username || user.username.length < 6) {
      void refUsername.current.focus();
    }
  }

  function onFocusAgent  (event) {
    const edit = JSON.parse(localStorage.getItem("edit"));
    if(!edit){
      void refUsername.current.focus();
    }
  }

  function userChange(e) {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

    const {username, password, passwordok} = user

    if(username && password && passwordok) {
      setActive(true)
    }

  }

  function userCreate() {

    if (user.username.length < 6 || user.username.length > 12) {
      setValidity(1);
      return null;
    } else if (/\s/.test(user.username)) {
      setValidity(3);
      return null;
    } else {
      setValidity(0);
    }

    if (user.password) {
      if (user.password.length < 6) return setPasswordValidity(1);
      else setPasswordValidity(0);
    } else {
      setPasswordValidity(0);
    }

    if (user.password !== user.passwordok) {
      setPasswordokValidity(1);
      return null;
    } else {
      setPasswordokValidity(0);
    }
    
    onLoading(true);

    const req = Service.create({...user, username: user.username.toLowerCase()});

    req.promise.then(
      (r) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: user.username,
            password: user.password,
          })
        );

        onLoading(false);
        localStorage.removeItem("referral");
        setCreated(true);
      },
      (e) => {
        console.warn(e);

        onLoading(false);

        setValidity(2);
        setOldUsername(user.username);

        refUsername.current.focus();
      }
    );
  }

  if (isCreated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form form--signup">
      <div className="form-inner">
        <div>
          <FormField
            isValid={!isValid}
            field={{ label: "用户名" }}
            input={{
              id: "username",
              name: "username",
              type: "text",
              placeholder: TRANSLATE("用户名"),
              maxLength: 12,
              onChange: userChange,
              ref: refUsername,
            }}
          />
          {isValid === 1 ? (
            <p style={{ color: "#e4451b", marginTop: -15, marginBottom: 20 }}>
              6-12个字母数字
            </p>
          ) : null}
          {isValid === 2 ? (
            <p style={{ color: "#e4451b", marginTop: -15, marginBottom: 20 }}>
              用户名已存在
            </p>
          ) : null}
          <FormField
            isValid={!isValidPassword}
            field={{ label: "密码" }}
            input={{
              id: "password",
              name: "password",
              type: "password",
              placeholder: TRANSLATE("密码"),
              required: true,
              onFocus: onFocus,
              onChange: userChange,
              ref: refPassword,
            }}
          />
          {isValidPassword === 1 ? (
            <p style={{ color: "#e4451b", marginTop: -15, marginBottom: 20 }}>
              密码最短为6位
            </p>
          ) : null}
          <FormField
            isValid={!isValidPasswordok}
            field={{ label: "再次输入密码" }}
            input={{
              id: "passwordok",
              name: "passwordok",
              type: "password",
              placeholder: TRANSLATE("再次输入密码"),
              required: true,
              onFocus: onFocus,
              onChange: userChange,
              ref: refPasswordOK,
            }}
          />
          {isValidPasswordok === 1 ? (
            <p style={{ color: "#e4451b", marginTop: -15, marginBottom: 20 }}>
              两次输入密码不一致
            </p>
          ) : null}
          <FormField
            isValid={!isValidTelephone}
            field={{ label: "请输入手机号码" }}
            input={{
              id: "telephone",
              name: "telephone",
              type: "text",
              placeholder: TRANSLATE("11号手机号"),
              maxLength: 11,
              required: true,
              onChange: userChange,
              onFocus: onFocus,
              ref: refTelephone,
              onInput: () =>
                (refTelephone.current.value = refTelephone.current.value.replace(
                  /[^0-9]/g,
                  ""
                )),
            }}
          />
          {isValidTelephone === 1 ? (
            <p style={{ color: "#e4451b", marginTop: -15, marginBottom: 20 }}>
              请输入11位手机号
            </p>
          ) : null}
          <FormField
            field={{ label: "好友优惠推荐码" }}
            // 好友优惠推荐码(选填)
            input={{
              id: "agentName",
              name: "agentName",
              type: "text",
              placeholder: TRANSLATE("好友优惠推荐码"),
              required: true,
              onChange: userChange,
              onFocus: onFocusAgent,
              ref: refRef,
              defaultValue: agent,
            }}
          />
        </div>
        <button
          className={`submit ${active ? "active" : null}`}
          onClick={active ? userCreate : null}
        >
          {TRANSLATE('注册')}
        </button>
      </div>
    </div>
  );
}

function Login() {
  const agentName = JSON.parse(localStorage.getItem("referral"));

  const query = useQuery();
  const history = useHistory();
  // const initialTab = agentName ? "signup" : "signin";
  const initialTab = 'signin';
  const [tab, setTab] = useState(query.get("tab") || initialTab);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTop = 0;
    document.body.classList.add("pwa-login-page");
    return () => document.body.classList.remove("pwa-login-page");

  }, []);

  useEffect(() => {
    // localStorage.removeItem("referral");
    history.push({ search: `?tab=${tab}` });
  }, [history, tab]);

  return (
    <div className="login-form-sa">
      <div className="login-form-wrap">
        <div className="login-form-outer">
          <div
            className={`login-form-inner with-loader${
              isLoading ? " loading" : ""
            }`}
          >
            <div className="load-spin"></div>
            <div className="logo"></div>
            {/* ============ JEAN ============  */}
            <div className="divider">{ TRANSLATE('赞助伙伴')   } </div>
            <div className="sub-logo"></div>
            <div className="sub-text">{ TRANSLATE('奥格斯堡')   } </div>
            {/* ============ JEAN ============  */}
            <div className="auth-tabs">
              <UITabs
                tabs={[
                  { index: "signin", name: TRANSLATE("登录") },
                  { index: "signup", name: TRANSLATE("注册") },
                ]}
                tab={tab}
                onSet={setTab}
              />
            </div>
            <div className={`auth-forms tab--${tab}`}>
              <FormSignin onLoading={setLoading} />
              <FormSignup onLoading={setLoading} agentName={agentName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
