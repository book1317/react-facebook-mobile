import React from "react";
import "./loginPageStyle.scss";
import facebook_image from "../../image/facebook.png";
import { Link, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

type MyProps = { history: any; profile: any };
type MyState = {};

@inject("profile")
class LoginPage extends React.Component<MyProps, MyState> {
  state = {
    name: "",
    pass: ""
  };

  handleKeyDown = (e?: any) => {
    if (e.key === "Enter") {
      this.onLogin();
    }
  };

  handleLoginClick = () => {
    this.onLogin();
  };

  onLogin = () => {
    if (this.state.name && this.state.pass) {
      this.props.profile.setName(this.state.name);
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
          className={"login-input user-input"}
          onChange={e => this.setState({ name: e.target.value })}
          onKeyDown={this.handleKeyDown}
          type="string"
        />
        <input
          className="login-input password-input"
          onChange={e => this.setState({ pass: e.target.value })}
          onKeyDown={this.handleKeyDown}
          type="password"
        />
        <button
          onClick={() => this.handleLoginClick()}
          className="login-button"
        >
          Log In
        </button>
        <div className="login-text-container">
          <div>Sign Up for Facebook</div>
          <div className="login-bottom-text">Need Help?</div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage as any);