import React, { Component } from 'react'
import css from './RegisterPage.module.scss'
import RegisterAPI from 'api/RegisterAPI'

type MyProps = { history?: any }
type MyState = {
  firstName: string
  lastName: string
  username: string
  password: string
}

export class RegisterPage extends Component<MyProps, MyState> {
  constructor(props: any) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    }
  }

  onClickSignUp = async () => {
    const { firstName, lastName, username, password } = this.state
    if (firstName && lastName && username && password) {
      const resp = await RegisterAPI.createProfile(
        firstName,
        lastName,
        username,
        password
      )
      console.log('resp', resp)
      this.props.history.push('/login')
    }
  }

  render() {
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
    )
  }
}

export default RegisterPage
