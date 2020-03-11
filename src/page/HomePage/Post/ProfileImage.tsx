import React from "react";
import "./postStyle.scss";

type MyProps = { src?: string };
type MyState = {};
export default class Post extends React.Component<MyProps, MyState> {
  render() {
    return <div className="post-profile-image circle-container" />;
  }
}
