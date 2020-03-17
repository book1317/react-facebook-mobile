import React from "react";
import ProfileFriend from "./ProfileFirend/ProfileFriend";
import ProfileMyImage from "./ProfileMyImage/ProfileMyImage";
import "./ProfilePage.scss";
import { inject, observer } from "mobx-react";

type MyProps = { profile?: any };

@inject("profile")
@observer
export default class ProfilePage extends React.Component<MyProps> {
  render() {
    return (
      <div className="profile-container">
        <div className="profile-header">Raweewat Ngeabprasert</div>
        <div className="profile-image-container">
          <img
            className="profile-timeline"
            src={`https://img.huffingtonpost.com/asset/5dcc613f1f00009304dee539.jpeg?cache=QaTFuOj2IM&ops=crop_834_777_4651_2994%2Cscalefit_720_noupscale`}
          />

          <img
            className="profile-image"
            src={this.props.profile.profileImage}
          />
        </div>
        <div className="profile-name">
          <div>Raweewat</div>
          <div>Ngeabprasert</div>
        </div>
        <div className="profile-button-container">
          <button className="story-button">Add Story</button>
          <button className="dot-button">...</button>
        </div>
        <div className="profile-detail-container">
          <span className="detail-topic">Works at </span>
          <span className="detail-text">
            King Mongkut's Institute of Technology Ladkrabang
          </span>
        </div>
        <ProfileMyImage />
        <ProfileFriend />
      </div>
    );
  }
}
