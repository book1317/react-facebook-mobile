import React from "react";
import css from "./LoginPage.module.scss";
import facebook_image from "../../image/facebook.png";
import { inject } from "mobx-react";
import { IAccount } from "store/AuthenStore.d";

type MyProps = { history: any; profile: any };
type MyState = {};

@inject("profile")
export default class LoginPage extends React.Component<MyProps, MyState> {
  state = {
    username: "",
    password: "",
  };

  handleKeyDown = (e?: any) => {
    if (e.key === "Enter") {
      this.onLogin();
    }
  };

  handleLoginClick = () => {
    this.onLogin();
  };

  onLogin = async () => {
    if (this.state.username && this.state.password) {
      const account: IAccount = {
        username: this.state.username,
        password: this.state.password,
      };
      await this.props.profile.getProfileByAccount(account);
      const token = "jwtToken";
      localStorage.setItem("isAuthen", token);
      this.props.profile.setIsLogin(true);
      this.props.history.push("/");
    }
  };

  handleSignUp = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <div className={css.loginPage}>
        <img className={css.loginFacebookLogo} src={facebook_image} />
        <input
          className={`${css.loginInput} ${css.userInput}`}
          onChange={(e) => this.setState({ username: e.target.value })}
          onKeyDown={this.handleKeyDown}
          type="string"
        />
        <input
          className={`${css.loginInput} ${css.passwordInput}`}
          onChange={(e) => this.setState({ password: e.target.value })}
          onKeyDown={this.handleKeyDown}
          type="password"
        />
        <button onClick={this.handleLoginClick} className={css.loginButton}>
          Log In
        </button>
        <div className={css.loginTextContainer}>
          <div onClick={this.handleSignUp}>Sign Up for Facebook</div>
          <div className={css.loginBottomText}>Need Help?</div>
        </div>
      </div>
    );
  }
}
