import React from "react";
import "./ProfileFriend.scss";

export default class ProfileFriend extends React.Component {
  render() {
    return (
      <div className="profile-friend-container">
        <div className="topic-text">
          <div className="friend-topic">Friends</div>
          <div className="find-friend">Find Friends</div>
        </div>
        <div>1,310 friends</div>
      </div>
    );
  }
}
