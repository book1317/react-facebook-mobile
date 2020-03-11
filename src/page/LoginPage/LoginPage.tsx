import React from "react";
import "./loginPageStyle.scss";
import facebook_image from "../../image/facebook.png";
import { Link, withRouter } from "react-router-dom";

type MyProps = { history: any };
type MyState = {};

class LoginPage extends React.Component<MyProps, MyState> {
  handleKeyDown = (e?: any) => {
    if (e.key === "Enter" && e.target.value != "") {
      this.props.history.push("/");
    }
  };

  componentDidMount() {
    document.title = "Facebook";
  }

  render() {
    return (
      <div className="login-page">
        <img className="login-facebook-logo" src={facebook_image} />
        <input
          className="login-input user-input"
          onKeyDown={this.handleKeyDown}
        />
        <input
          className="login-input password-input"
          onKeyDown={this.handleKeyDown}
          type="password"
        />
        <Link className="login-button" to="/">
          Log In
        </Link>
        <div className="login-text-container">
          <div>Sign Up for Facebook</div>
          <div className="login-bottom-text">Need Help?</div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage as any);
