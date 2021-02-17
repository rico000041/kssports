import React, { useState, useEffect, useContext, useRef } from "react";
import { mobileModel } from "react-device-detect";
import { useHistory } from "react-router-dom";

import { Wrap, Service } from "../";
import { FormField } from "../../../../component";
import {getAuthKey} from "../../../../util/index"

const Name = () => {
  const history = useHistory();

  const {
    userAuth: { data },
    setUserAuthFN,
  } = useContext(Service.User.Context);

  const refName = useRef(null);

  const [formname, setFormName] = useState("");
  const form = {
    email: data.email,
    birthday: data.birthday,
    phone: data.telephone,
    qq: data.qq,
    wechat: data.wechat || null,
    device: mobileModel, //"Huawei Mate 20 Pro",
    updates: [{ text: "4.14.116" }, { text: "Thu Apr 30 18:27:58 CSTt 2020" }],
  };

  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (formname !== "" && formname.length > 1 && formname.length < 5)
      setActive(true);
    else setActive(false);
  }, [formname]);

  const onChange = (e) => {
    const nameinput = e.target.value;
    setFormName(nameinput);
  };

  const update = () => {
    console.info("You're updating account full name:", formname);

    const body = {
      type: "change_information",
      auth: getAuthKey(),
      ...form,
      ...Service.User.read(),
      realname: formname
    }

    let form_data = new FormData();

    for ( var key in body ) {
        console.log(key, body[key])
        form_data.append(key, body[key]);
    }

    console.log(body)

    const config = {
      method: 'POST',
      headers: {},
      body: form_data,
    }

    fetch('https://u2daszapp.u2d8899.com/newpwa/ajax_data.php', config)
      .then(response => response.json())
      .then(r => {
        console.info(
          "✅ You have successfully updated account full name:",
          r.info
        );
        setActive(false);
        setDisabled(true);

        Service.User.session({
          ...Service.User.read(),
        }).promise.then((r) => setUserAuthFN(1, r.info));
      })
      .catch(err => console.log(err))
    // console.log({  
    //   account,
    //   realname: formname,
    // })
    // Service.User.update({  
    //   account,
    //   password,
    //   realname: formname,
    // }).promise.then(
    //   (r) => {
        // console.info(
        //   "✅ You have successfully updated account full name:",
        //   r.info
        // );
        // setActive(false);
        // setDisabled(true);

        // Service.User.session({
        //   ...Service.User.read(),
        // }).promise.then((r) => setUserAuthFN(1, r.info));
    //   },
    //   (e) => {
    //     console.warn("Unable to update account full name:", e);
    //   }
    // );
  };

  return (
    <Wrap
      className="profile-general"
      name="真实姓名"
      sublevel={[true, () => history.push("/profile/personal")]}
    >
      {disabled && <span className="profile-valid" />}
      <FormField
        field={{ label: "真实姓名" }}
        input={{
          id: "name",
          name: "name",
          type: "text",
          placeholder: "用于提现时安全核对",
          maxLength: 4,
          ref: refName,
          onChange,
          onInput: () => {
            if (refName.current.value > 4) refName.current.value.slice(0, 4);
          },
        }}
      />
      <div className="submit">
        <div
          className={`form-button ${
            active && !disabled && "form-button-active"
          }`}
          onClick={active && !disabled ? update : null}
        >
          <span>提交</span>
        </div>
      </div>
    </Wrap>
  );
};

export default Name;
