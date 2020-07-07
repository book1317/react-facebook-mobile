import React from "react";
import css from "./Member.module.scss";
import profileImage from "../../image/profile1.png";
import history from "../../utils/History";

class Member extends React.Component {
  handleClickMember = () => {
    console.log("ClickMember");
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
