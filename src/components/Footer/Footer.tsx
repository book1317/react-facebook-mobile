import React from "react";
import { FaHome, FaBell, FaBars, FaComments, FaUserAlt } from "react-icons/fa";
import "./Footer.scss";
import { Link } from "react-router-dom";

const ICON_COLOR = "#68686A";

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer-container">
        <div className="icon-container">
          <Link to="/" className="footer-icon">
            <FaHome size={23} color={ICON_COLOR} />
          </Link>
          {/* <div className="footer-icon">
            <FaVideo size={23} color={ICON_COLOR} />
          </div> */}
          <Link to="/messager" className="footer-icon">
            <FaComments size={23} color={ICON_COLOR} />
          </Link>
          <Link to="/profile" className="footer-icon">
            <FaUserAlt size={23} color={ICON_COLOR} />
          </Link>
          <div className="footer-icon">
            <FaBell size={23} color={ICON_COLOR} />
          </div>
          <Link to="/login" className="footer-icon">
            <FaBars size={23} color={ICON_COLOR} />
          </Link>
        </div>
      </div>
    );
  }
}
