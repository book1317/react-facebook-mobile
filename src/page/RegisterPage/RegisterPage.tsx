import React, { Component } from 'react'
import css from './RegisterPage.module.scss'
import RegisterAPI from 'api/RegisterAPI'
import { IProfile } from 'store/ProfileStore.d'
import { IAccount } from 'store/AuthenStore.d'

type IRegisterPageProps = { history?: any }
type IRegisterPageState = {
  firstname: string
  lastname: string
  username: string
  password: string
  image: any
}

export class RegisterPage extends Component<
  IRegisterPageProps,
  IRegisterPageState
> {
  constructor(props: any) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      image: '',
    }
  }

  onClickSignUp = async () => {
    const { firstname, lastname, username, password, image } = this.state
    if (firstname && lastname && username && password) {
      const profile: IProfile = { firstname, lastname, image }
      const account: IAccount = { username, password }
      const response = await RegisterAPI.createProfile(profile, account)
      this.props.history.push('/login')
    }
  }

  chooseImage = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onloadend = () => {
        this.setState({
          image: reader.result,
        })
      }
    }
  }

  render() {
    const { image } = this.state
    return (
      <div className={css.registerPage}>
        <div className={css.inputContainer}>
          <div className={css.signupText}>Sign Up</div>
          <div className={css.profileUpload}>
            <input
              type="file"
              className={css.profileImageInput}
              onChange={this.chooseImage}
            />
            {image && (
              <img
                className={css.profileImage}
                alt="profileImage"
                src={image}
              />
            )}
          </div>

          <div className={css.nameInputContainer}>
            <input
              className={css.nameInput}
              placeholder="First name"
              onChange={(e) => this.setState({ firstname: e.target.value })}
            />
            <input
              className={css.nameInput}
              placeholder="Last name"
              onChange={(e) => this.setState({ lastname: e.target.value })}
            />
          </div>
          <div className={css.InputContain}>
            <input
              className={css.accountInput}
              placeholder="Username"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>
          <div className={css.InputContain}>
            <input
              className={css.accountInput}
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
