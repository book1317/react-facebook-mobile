import React from "react";
import { FaRegThumbsUp } from "react-icons/fa";
import { inject, observer } from "mobx-react";
import { IComment } from "store/PostStore.d";
type MyProps = {
  comment: IComment;
  profile?: any;
};
type MyState = { like: number; count: number };

@inject("profile")
@observer
export default class Comment extends React.Component<MyProps, MyState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      like: props.like || 0,
      count: 0,
    };
  }

  handleLikeButton = (e?: any) => {
    if (this.props.comment.isLike) this.setState({ like: this.state.like - 1 });
    else this.setState({ like: this.state.like + 1 });
    this.props.comment.isLike = !this.props.comment.isLike;
  };

  render() {
    const { content, owner } = this.props.comment;
    const { like } = this.state;
    return (
      <div className="post-comment-container">
        <img
          alt=""
          src={owner.image || ""}
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
