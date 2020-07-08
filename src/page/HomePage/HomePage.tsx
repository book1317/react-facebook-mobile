import React from "react";
import axios from "axios";
import facebook_image from "../../image/logo.png";
import { Link } from "react-router-dom";
import "./homePageStyle.scss";
import {
  FaSearch,
  FaFacebookMessenger,
  FaMapMarkerAlt,
  FaVideo,
  FaImages,
} from "react-icons/fa";
import { inject, observer } from "mobx-react";
import StorySlider from "./Story/StorySlider";
import Post from "./Post/Post";
import { IProfile } from "store/ProfileStore.d";
// import profile1 from "../../image/profile1.png";

type MyProps = { profile?: any; getProfiles?: any };
type MyState = { post?: any; message?: any; data?: any; isLoading: boolean };

@inject("profile")
@observer
export default class HomePage extends React.Component<MyProps, MyState> {
  state = {
    post: defautlPost,
    isLoading: true,
    message: "eiei",
    currentProfile: this.props.profile.myProfile,
  };

  onClickLogin = () => {};

  handleKeyDown = (e?: any) => {
    if (e.key === "Enter" && e.target.value != "") {
      var joined = this.state.post.concat({
        id: this.props.profile.id,
        content: e.target.value,
        like: 0,
        comment: [],
        ownerProfile: this.state.currentProfile,
      });
      this.setState({ post: joined });
      e.target.value = "";
    }
  };

  async componentDidMount() {
    try {
      await this.props.profile.getProfiles();
    } finally {
      const profiles = this.props.profile.getProfilesJS();
      const post = allPost;
      post.map(
        (e: any) =>
          (e["ownerProfile"] = profiles.find((p: any) => p.id === e.id) || "")
      );

      post.map((e: any) =>
        e["comment"].map(
          (c: any) =>
            (c["ownerProfile"] = profiles.find((p: any) => p.id === c.id) || "")
        )
      );

      this.setState({ post, isLoading: false });
    }
  }

  render() {
    const profile = this.props.profile.profile;
    //const profiles = this.props.profile.getProfilesJS()
    console.log(this.state.post);

    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <div />
        ) : (
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
                  src={profile.image}
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
            {this.state.post && this.state.post.map((e) => <Post {...e} />)}
            <div style={{ marginBottom: 60 }} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const defautlPost = [
  {
    id: "5e93195d47938ea9ece87f26",
    content: "Breaking Newsssss",
    like: 10,
    comment: [
      { id: 2, content: "hello", like: 0 },
      { id: 2, content: "eiei", like: 2 },
    ],
    ownerProfile: {
      firstname: "",
      lastname: "",
      image: "",
    },
  },
];

const allPost = [
  {
    id: "5e93195d47938ea9ece87f26",
    content: "Breaking Newsssss",
    like: 10,
    comment: [
      { id: "5e93267bd172cbca9fb193cd", content: "hello", like: 0 },
      { id: "5e93267bd172cbca9fb193cd", content: "eiei", like: 2 },
    ],
  },
  {
    id: "5e93267bd172cbca9fb193cd",
    content: "Playing Timeeeeeeee",
    like: 15,
    comment: [
      { id: "5e93195d47938ea9ece87f26", content: "haha", like: 0 },
      { id: "5e93293d77d2db0f4249b3bb", content: "haha", like: 0 },
    ],
  },
  {
    id: "5e93293d77d2db0f4249b3bb",
    content: "Ya Hu`````````",
    like: 15,
    comment: [],
  },
];
