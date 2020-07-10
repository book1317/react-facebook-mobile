import React from "react";
import css from "./ChatPage.module.scss";
import profileImage from "../../image/profile1.png";
import { RiArrowLeftSLine } from "react-icons/ri";
import history from "utils/History";
import { inject } from "mobx-react";
import { FaImage } from "react-icons/fa";
import { MdThumbUp } from "react-icons/md";

import Message from "./Message";

type Prop = { footer?: any };
type State = { message: string; messages: Array<any> };
@inject("footer")
class ChatPage extends React.Component<Prop, State> {
  messagesEnd: any;

  constructor(props: any) {
    super(props);
    this.messagesEnd = React.createRef();
    this.state = {
      message: "",
      messages: [
        { msg: "hello", isMine: true },
        { msg: "how are you", isMine: false },
      ],
    };
  }

  componentDidMount() {
    this.props.footer.isShow = false;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  handleBack = () => {
    this.props.footer.isShow = true;
    history.goBack();
  };

  handleKeyDown = (e?: any) => {
    if (e.key === "Enter" && this.state.message) {
      this.onSendMessage();
    }
  };

  onSendMessage = () => {
    const messages = this.state.messages;
    messages.push({
      msg: this.state.message,
      isMine: true,
    });
    this.setState({
      message: "",
      messages,
    });
  };

  handleLikeClick = () => {
    const messages = this.state.messages;
    messages.push({
      msg: "/like",
      isMine: true,
    });
    this.setState({
      messages: messages,
    });
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    return (
      <div className={css.chatPageContainer}>
        <div className={css.header}>
          <div className={css.backArrowContainer} onClick={this.handleBack}>
            <RiArrowLeftSLine size={40} />
          </div>
          <img alt="" className={css.profileImage} src={profileImage} />
          <div className={css.headerText}>
            <div className={css.name}>Supawit Areeji</div>
            <div className={css.active}>Active 8m ago</div>
          </div>
        </div>
        <div className={css.message}>
          {this.state.messages.map((msg) => (
            <Message {...msg} />
          ))}
        </div>
        <div
          className={css.scrollingMarker}
          ref={(el) => {
            this.messagesEnd = el;
          }}
        />
        <div className={css.typeBar}>
          <div className={css.typeBarContainer}>
            <FaImage size={30} color={"#3f98f3"} />
            <input
              onKeyDown={this.handleKeyDown}
              value={this.state.message}
              onChange={(e) => this.setState({ message: e.target.value })}
              placeholder="Aa"
            />
            <MdThumbUp
              size={30}
              color={"#3f98f3"}
              onClick={this.handleLikeClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChatPage;
