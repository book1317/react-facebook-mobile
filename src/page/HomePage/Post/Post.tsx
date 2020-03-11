import React from "react";
import "./postStyle.scss";
import { FaRegThumbsUp, FaShare, FaRegCommentAlt } from "react-icons/fa";
import ProfileImage from "./ProfileImage";
import Comment from "./Comment";

type MyProps = { content?: string };
type MyState = { comment: Array<object>; content?: string; like: number };
export default class Post extends React.Component<MyProps, MyState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      like: 0,
      comment: [
        { content: "eiei", like: 0 },
        { content: "55555", like: 10 }
      ]
    };
  }

  handleKeyDown = (e?: any) => {
    if (e.key === "Enter" && e.target.value != "") {
      var joined = this.state.comment.concat({
        content: e.target.value,
        like: 0
      });
      this.setState({ comment: joined });
      e.target.value = "";
    }
  };

  handleLikeButton = (e?: any) => {
    this.setState({ like: this.state.like + 1 });
  };

  render() {
    return (
      <div className="home-post-container">
        <div className="post-title-container">
          <div className="post-profile-image circle-container" />
          <span className="post-profile-name">Name Poster</span>
        </div>
        <div className="post-date">Yesterday at 12:13</div>
        <div className="post-content">{this.props.content}</div>
        <div className="post-status">
          <div>
            <FaRegThumbsUp />
            <span className="text-after-icon">{this.state.like}</span>
          </div>
          <div>
            <div className="right-detail">40 Comments</div>
          </div>
        </div>
        <div className="post-interact-container">
          <div>
            <FaRegThumbsUp />
            <span onClick={this.handleLikeButton} className="text-after-icon">
              Like
            </span>
          </div>
          <div>
            <FaRegCommentAlt />
            <span className="text-after-icon">Comment</span>
          </div>
          <div>
            <FaShare />
            <span className="text-after-icon">Share</span>
          </div>
        </div>

        {this.state.comment.map((e?: any) => (
          <Comment content={e.content} like={e.like} />
        ))}

        <input
          className="post-comment-input"
          placeholder="Write a comment...."
          onKeyDown={this.handleKeyDown}
        />
      </div>
    );
  }
}
