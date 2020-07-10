import React from "react";
import css from "./Message.module.scss";
import { MdThumbUp } from "react-icons/md";

type Prop = { msg: string; isMine?: boolean; refer: any };
type State = {};
export default class Message extends React.PureComponent<Prop, State> {
  render() {
    const { msg } = this.props;
    return (
      <div
        className={
          this.props.isMine ? css.myMessageContainer : css.otherMessageContainer
        }
      >
        {msg !== "/like" ? (
          <div className={css.messageBorder}>{msg}</div>
        ) : (
          <MdThumbUp size={50} color={"#3f98f3"} />
        )}
      </div>
    );
  }
}
