import React, { lazy } from "react";
import css from "./Member.module.scss";
import profileImage from "image/profile1.png";
import history from "utils/History";
import { inject } from "mobx-react";

type Prop = { footer?: any };
type State = {};
@inject("footer")
class Member extends React.Component<Prop, State> {
  handleClickMember = () => {
    this.props.footer.isShow = false;
    history.push("/chat");
  };
  render() {
    return (
      <div className={css.memberContainer} onClick={this.handleClickMember}>
        <img className={css.memberImage} src={profileImage} />
        <div className={css.memberText}>
          <div className={css.memberName}>BooKie eiei</div>
          <div className={css.memberLastMessage}>Last message</div>
        </div>
      </div>
    );
  }
}

export default Member;
