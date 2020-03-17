import React from "react";
import facebook_image from "../../image/logo.png";
import { Link } from "react-router-dom";
import "./homePageStyle.scss";
import { FaSearch, FaFacebookMessenger, FaMapMarkerAlt } from "react-icons/fa";
import StorySlider from "./Story/StorySlider";
import Post from "./Post/Post";
import profileImage from "../../image/profile1.png";

type MyProps = {};
type MyState = {};
export default class HomePage extends React.Component<MyProps, MyState> {
  onClickLogin = () => {
    console.log("eiei");
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
            ></input>
          </div>
          <div className="home-option-container">
            <div className="home-option-icon-container">
              <FaMapMarkerAlt className="home-option-icon" />
              <div className="home-option-icon-border" />
            </div>
            <div className="home-option-icon-container">
              <FaMapMarkerAlt className="home-option-icon" />
              <div className="home-option-icon-border" />
            </div>
            <div className="home-option-icon-container">
              <FaMapMarkerAlt className="home-option-icon" />
            </div>
          </div>
        </div>

        <StorySlider />

        <Post />

        <Post />

        <Post />
      </div>
    );
  }
}
