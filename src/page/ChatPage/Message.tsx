import React from "react";
import css from "./Message.module.scss";

type Prop = { isMine?: boolean };
type State = {};
export default class Message extends React.Component<Prop, State> {
  render() {
    if (this.props.isMine)
      return (
        <div className={css.myMessageContainer}>
          <div className={css.messageBorder}>ma tammai</div>
        </div>
      );
    else
      return (
        <div className={css.otherMessageContainer}>
          <div className={css.messageBorder}>mai</div>
        </div>
      );
  }
}
