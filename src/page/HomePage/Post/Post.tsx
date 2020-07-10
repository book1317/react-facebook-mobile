import React from "react";
import "./postStyle.scss";
import { FaRegThumbsUp, FaShare, FaRegCommentAlt } from "react-icons/fa";
import Comment from "./Comment";
import { inject, observer } from "mobx-react";
import profileImage from "image/profile2.png";
import { IPost } from "store/PostStore.d";

type MyProps = {
  post: IPost;
};
type MyState = {};

@inject("profile")
@observer
export default class Post extends React.Component<MyProps, MyState> {
  componentDidMount() {
    // this.setState({ ...this.props });
  }

  handleKeyDown = (e?: any) => {
    if (e.key === "Enter" && e.target.value !== "") {
      this.onComment(e);
    }
  };

  onComment = (e?: any) => {
    let comments = this.props.post.comments.concat({
      id: "1234",
      content: e.target.value,
      like: 0,
      isLike: false,
      owner: this.props.post.owner,
    });
    let post = this.props.post;
    post.comments = comments;
    this.setState({ post });
    e.target.value = "";
  };

  handleLikeButton = (e?: any) => {
    if (this.props.post.isLike) this.props.post.like--;
    else this.props.post.like++;
    this.props.post.isLike = !this.props.post.isLike;
  };

  render() {
    const { owner, content } = this.props.post;
    const { firstname, lastname, image } = owner;
    const { like, comments, isLike } = this.props.post;
    return (
      <div className="home-post-container">
        <div className="post-title-container">
          <img
            alt=""
            src={image || profileImage}
            className="post-profile-image circle-container"
          />
          <span className="post-profile-name">
            {(firstname && `${firstname} ${lastname}`) || "Profile Name"}
          </span>
        </div>
        <div className="post-date">Yesterday at 12:13</div>
        <div className="post-content">{content}</div>
        <div className="post-status">
          <div>
            <FaRegThumbsUp />
            <span className="text-after-icon">{like}</span>
          </div>
          <div>
            <div className="right-detail">{comments.length} Comments</div>
          </div>
        </div>
        <div className="post-interact-container">
          <div className="post-item">
            <FaRegThumbsUp color={isLike ? "#3f98f3" : ""} />
            <span onClick={this.handleLikeButton} className="text-after-icon">
              Like
            </span>
          </div>
          <div className="post-item">
            <FaRegCommentAlt />
            <span className="text-after-icon">Comment</span>
          </div>
          <div className="post-item">
            <FaShare />
            <span className="text-after-icon">Share</span>
          </div>
        </div>

        {this.props.post.comments.map((comment, index) => (
          <Comment comment={comment} key={index} />
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
