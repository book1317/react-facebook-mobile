import React from "react";
import facebook_image from "../../image/logo.png";
import { Link } from "react-router-dom";
import "./homePageStyle.scss";
import {
  FaSearch,
  FaFacebookMessenger,
  FaMapMarkerAlt,
  FaVideo,
  FaImages
} from "react-icons/fa";
import { inject, observer } from "mobx-react";
import StorySlider from "./Story/StorySlider";
import Post from "./Post/Post";
import profileImage from "../../image/profile1.png";

type MyProps = { profile?: any };
type MyState = { post?: any };

@inject("profile")
@observer
export default class HomePage extends React.Component<MyProps, MyState> {
  state = {
    post: allPost
  };

  onClickLogin = () => {
    console.log("eiei");
  };

  handleKeyDown = (e?: any) => {
    if (e.key === "Enter" && e.target.value != "") {
      var joined = this.state.post.concat({
        profile: this.props.profile,
        content: e.target.value,
        like: 0,
        comment: []
      });
      this.setState({ post: joined });
      e.target.value = "";
    }
  };

  render() {
    return (
      <div className="home-page">
        <div className="home-header-container">
          <img className="home-facebook-logo" src={facebook_image} />
          <Link className="home-icon-container circle-container" to="/">
            <FaSearch className="home-header-icon" />
          </Link>
          <Link className="home-icon-container circle-container" to="/">
            <FaFacebookMessenger className="home-header-icon" />
          </Link>
        </div>
        <div className="home-above-content">
          <div className="home-profile-comment-container">
            <img
              src={profileImage}
              className="circle-container home-profile-image-container"
            />
            <input
              className="home-profile-comment-input"
              placeholder="What's on your mind?"
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className="home-option-container">
            <div className="home-option-icon-container">
              <FaVideo className="home-option-icon video" />
              <span className="text-after-icon">Live</span>
              <div className="home-option-icon-border" />
            </div>
            <div className="home-option-icon-container">
              <FaImages className="home-option-icon photo" />
              <span className="text-after-icon">Photo</span>
              <div className="home-option-icon-border" />
            </div>
            <div className="home-option-icon-container">
              <FaMapMarkerAlt className="home-option-icon check-in" />
              <span className="text-after-icon">Check-in</span>
            </div>
          </div>
        </div>
        <StorySlider />
        {this.state.post.map(e => (
          <Post {...e} profile={this.props.profile} />
        ))}
        <div style={{ marginBottom: 60 }} />
      </div>
    );
  }
}

const allPost = [
  {
    profile: "",
    content: "Breaking Newsssss",
    like: 10,
    comment: [
      { profile: "", content: "eiei", like: 0 },
      { profile: "", content: "fuckyou", like: 2 }
    ]
  },
  {
    profile: "",
    content: "Playing Timeeeeeeee",
    like: 15,
    comment: [{ profile: "", content: "haha", like: 0 }]
  }
];
