import React from "react";
import {
  FaHome,
  FaVideo,
  FaStore,
  FaUsers,
  FaBell,
  FaBars
} from "react-icons/fa";
import "./Footer.scss";
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <div className="icon-container">
          <Link to="/" className="footer-icon">
            <FaHome size={23} color="#68686A" />
          </Link>
          <div className="footer-icon">
            <FaVideo size={23} color="#68686A" />
          </div>
          <div className="footer-icon">
            <FaStore size={23} color="#68686A" />
          </div>
          <Link to="/profile" className="footer-icon">
            <FaUsers size={23} color="#68686A" />
          </Link>
          <div className="footer-icon">
            <FaBell size={23} color="#68686A" />
          </div>
          <Link to="/login" className="footer-icon">
            <FaBars size={23} color="#68686A" />
          </Link>
        </div>
      </div>
    );
  }
}
