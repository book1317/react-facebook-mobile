import React from "react";
import css from "./ChatPage.module.scss";
import profileImage from "../../image/profile1.png";
import { RiArrowLeftSLine } from "react-icons/ri";
import history from "utils/History";

import Message from "./Message";

class ChatPage extends React.Component {
  handleBack = () => {
    history.goBack();
  };
  render() {
    return (
      <div className={css.chatPageContainer}>
        <div className={css.header}>
          <div className={css.backArrowContainer} onClick={this.handleBack}>
            <RiArrowLeftSLine size={40} />
          </div>
          <img className={css.profileImage} src={profileImage} />
          <div className={css.headerText}>
            <div className={css.name}>Supawit Areeji</div>
            <div className={css.active}>Active 8m ago</div>
          </div>
        </div>
        <div className={css.message}>
          <Message isMine={false} />
          <Message isMine={true} />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
      </div>
    );
  }
}

export default ChatPage;
