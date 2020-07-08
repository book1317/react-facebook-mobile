import React from "react";
import { FaHome, FaBell, FaBars, FaComments, FaUserAlt } from "react-icons/fa";
import "./Footer.scss";
import { Link } from "react-router-dom";
import history from "../../utils/History";
import { inject } from "mobx-react";

const ICON_COLOR = "#68686A";

type Props = {
  location?: any;
  url?: any;
  history?: any;
  profile?: any;
};
type State = { showFooter: boolean };
@inject("profile")
export default class Footer extends React.Component<Props, State> {
  logout = () => {
    this.props.profile.setIsLogin(false);
    delete localStorage["isAuthen"];
    history.push("/login");
  };
  render() {
    return (
      <div className="footer-container">
        <div className="icon-container">
          <Link to="/" className="footer-icon">
            <FaHome size={23} color={ICON_COLOR} />
          </Link>
          <Link to="/messager" className="footer-icon">
            <FaComments size={23} color={ICON_COLOR} />
          </Link>
          <Link to="/profile" className="footer-icon">
            <FaUserAlt size={23} color={ICON_COLOR} />
          </Link>
          <div className="footer-icon">
            <FaBell size={23} color={ICON_COLOR} />
          </div>
          <div onClick={this.logout} className="footer-icon">
            <FaBars size={23} color={ICON_COLOR} />
          </div>
        </div>
      </div>
    );
  }
}
