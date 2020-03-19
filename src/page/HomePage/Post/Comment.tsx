import React from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { inject, observer } from "mobx-react";

type MyProps = {
  src?: string;
  content: string;
  like: number;
  id: number;
  profile?: any;
};
type MyState = { like: number };

@inject("profile")
@observer
export default class Comment extends React.Component<MyProps, MyState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      like: props.like || 0
    };
  }

  handleLikeButton = (e?: any) => {
    this.setState({ like: this.state.like + 1 });
  };

  render() {
    const { id, content, profile } = this.props;
    const { like } = this.state;
    console.log(this.props);
    return (
      <div className="post-comment-container">
        <img
          src={profile.getProfileById(id).image}
          className="post-profile-image circle-container mini"
        />
        <span className="post-comment-text">{content}</span>
        <div className="post-comment-option-container">
          <div className="post-comment-time-text">1 HOUR AGO</div>
          <div className="text-after-icon" onClick={this.handleLikeButton}>
            Like
          </div>
          <div className="text-after-icon">Reply</div>
          <FaRegThumbsUp className="text-after-icon" />
          <div className="text-after-icon">{like}</div>
        </div>
      </div>
    );
  }
}
