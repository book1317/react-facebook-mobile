import React from "react";
import { FaRegThumbsUp } from "react-icons/fa";

type MyProps = { src?: string; content: string; like: number };
type MyState = { like: number };
export default class Comment extends React.Component<MyProps, MyState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      like: this.props.like
    };
  }

  handleLikeButton = (e?: any) => {
    this.setState({ like: this.state.like + 1 });
  };

  render() {
    return (
      <div className="post-comment-container">
        <div className="post-profile-image circle-container mini" />
        <span className="post-comment-text">{this.props.content}</span>
        <div className="post-comment-option-container">
          <div className="post-comment-time-text">1 HOUR AGO</div>
          <div className="text-after-icon" onClick={this.handleLikeButton}>
            Like
          </div>
          <div className="text-after-icon">Reply</div>
          <FaRegThumbsUp className="text-after-icon" />
          <div className="text-after-icon">
            {this.state.like ? this.state.like : ""}
          </div>
        </div>
      </div>
    );
  }
}
