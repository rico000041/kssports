import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import cx from "classnames";
import { isEmpty } from "lodash";

import { Inbox as _Inbox } from "../../service";
import { Wrap } from "./profile/index";
import { withAuth } from "../util";

import "../assets/scss/Inbox.scss";
import { TRANSLATE } from '../../options'
const status = ["未读", "已读"];

const Inbox = () => {
  const history = useHistory();

  const [messages, setMessages] = useState({
    status: 0,
    list: [],
  });

  useEffect(() => {
    setMessages({
      status: 0,
      list: [],
    });

    const req = _Inbox.read({
      record_type: "message",
    });

    req.promise.then(
      (r) => {
        // console.info(r);

        setMessages({
          status: 1,
          list: r.info.map((m) => m),
        });
      },
      (e) => {
        if (!e.is_aborted) {
          console.warn(e);
        }
      }
    );

    return () => req.cancel();
  }, []);

  const open = ({ id }, i) => {
    const _m = messages.list[i];

    if (!_m.content) {
      setMessages((m) => ({
        ...m,
        status: 0,
      }));

      _Inbox.readCurrent({ id }).promise.then(
        (r) => {
          _m.opened = !_m.opened;
          _m.content = r.info.content;
          _m.message_status = 1;

          setMessages((m) => ({
            ...m,
            list: m.list.filter((m, _i) => (_i === i ? _m : m)),
            status: 1,
          }));
        },
        (e) => {
          if (!e.is_aborted) {
            console.warn(e);
          }
        }
      );
    } else {
      _m.opened = !_m.opened;

      setMessages((m) => ({
        ...m,
        list: m.list.filter((m, _i) => (_i === i ? _m : m)),
      }));
    }
  };

  const _messagesList = messages.list.map((m, i) => (
    <div
      className={cx("messages-list--item", { opened: m.opened })}
      key={i}
      onClick={(e) => open(m, i, e)}
    >
      <div className="messages-list--item-wrap">
        <div className="m-content">
          <p className="subject">{m.subject}</p>
          <p className="timestamp">{m.send_time}</p>
        </div>
        <div className="m-status">
          <p className={cx("status", { unread: m.message_status === 0 })}>
            {status[m.message_status]}
          </p>
        </div>
      </div>
      <div className="messages-list--item-content">
        <p>{m.content}</p>
      </div>
    </div>
  ));

  return (
    <Wrap
      className="messages-wrap mobile"
      centerName="信息"
      faq={false}
      isLoading={!messages.status}
      sublevel={[true, () => history.goBack()]}
    >
      <div className="messages-list">
        {!isEmpty(_messagesList) ? (
          _messagesList
        ) : (
          <div className="no-transactions">
            <div className="image-box" />
            <span>{TRANSLATE('暂无记录')}</span>
          </div>
        )}
      </div>
    </Wrap>
  );
};

// export default Inbox;
export default withAuth(Inbox, 1);