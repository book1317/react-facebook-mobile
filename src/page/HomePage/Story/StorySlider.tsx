import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Story from "./Story";
import "./storyStyle.scss";

export default class StorySlider extends React.Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      arrows: false
    };
    return (
      <div className="home-story-container">
        <Slider {...settings}>
          <div>
            <Story />
          </div>
          <div>
            <Story />
          </div>
          <div>
            <Story />
          </div>
          <div>
            <Story />
          </div>
          <div>
            <Story />
          </div>
          <div>
            <Story />
          </div>
        </Slider>
      </div>
    );
  }
}
