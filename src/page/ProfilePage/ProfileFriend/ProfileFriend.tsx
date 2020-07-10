import React from "react";
import css from "./ProfileFriend.module.scss";
import imageProfile from "image/profile1.png";

export default class ProfileFriend extends React.Component {
  render() {
    const FriendCard = () => (
      <div className={css.friendCard}>
        <img src={imageProfile} />
        <div className={css.text}>Noonoey Witchayakarn</div>
      </div>
    );

    return (
      <div className={css.profileFriendContainer}>
        <div className={css.topicText}>
          <div className={css.friendTopic}>Friends</div>
          <div className={css.findFriend}>Find Friends</div>
        </div>
        <div>1,310 friends</div>
        <div className={css.friendCardContainer}>
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <FriendCard />
          <div className={css.seeAllFriendsBtn}>
            <button>See All Friends</button>
          </div>
        </div>
      </div>
    );
  }
}
