import React from "react";
import "./postStyle.scss";
import { FaRegThumbsUp, FaShare, FaRegCommentAlt } from "react-icons/fa";
import Comment from "./Comment";
import { inject, observer } from "mobx-react";

type MyProps = {
  content?: string;
  ownerProfile?: any;
  like: number;
  comment: any;
  id: number;
};
type MyState = { comment: Array<object>; content?: string; like: number };

@inject("profile")
@observer
export default class Post extends React.Component<MyProps, MyState> {
  state = {
    like: 0,
    comment: [{ id: 3, content: "", like: 0 }],
  };

  componentDidMount() {
    this.setState({ ...this.props });
  }

  handleKeyDown = (e?: any) => {
    if (e.key === "Enter" && e.target.value != "") {
      var joined = this.state.comment.concat({
        id: this.props.ownerProfile.id,
        content: e.target.value,
        like: 0,
      });
      this.setState({ comment: joined });
      e.target.value = "";
    }
  };

  handleLikeButton = (e?: any) => {
    this.setState({ like: this.state.like + 1 });
  };

  render() {
    const { ownerProfile, content } = this.props;
    const { firstname, lastname, image } = ownerProfile;
    const { like, comment } = this.state;
    return (
      <div className="home-post-container">
        <div className="post-title-container">
          <img src={image} className="post-profile-image circle-container" />
          <span className="post-profile-name">
            {`${firstname} ${lastname}` || "Profile Name"}
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
            <div className="right-detail">{comment.length} Comments</div>
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

        {this.state.comment.map((e) => (
          <Comment {...e} />
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
