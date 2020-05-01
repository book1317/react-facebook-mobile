import React, { Component } from "react";
import css from "./RegisterPage.module.scss";
import { Link, withRouter } from "react-router-dom";

type MyProps = { history?: any };
type MyState = {};

export class RegisterPage extends Component<MyProps, MyState> {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  };

  onClickSignUp = () => {
    const { firstName, lastName, username, password } = this.state;
    if (firstName && lastName && username && password)
      this.props.history.push("/login");
  };

  render() {
    console.log(this.state);
    return (
      <div className={css.registerPage}>
        <div className={css.inputContainer}>
          <div className={css.signupText}>Sign Up</div>
          <div className={css.nameInputContainer}>
            <input
              className={css.nameInput}
              placeholder="First name"
              onChange={(e) => this.setState({ firstName: e.target.value })}
            />
            <input
              className={css.nameInput}
              placeholder="Last name"
              onChange={(e) => this.setState({ lastName: e.target.value })}
            />
          </div>
          <div className={css.InputContain}>
            <input
              placeholder="Username"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>
          <div className={css.InputContain}>
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <button className={css.signupButton} onClick={this.onClickSignUp}>
            Sign up
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterPage as any);
