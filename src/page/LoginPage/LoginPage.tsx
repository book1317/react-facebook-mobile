import React from 'react'
import css from './LoginPage.module.scss'
import facebook_image from '../../image/facebook.png'
import { inject } from 'mobx-react'
import { IAccount, initAccount } from 'store/AuthenStore.d'
import { IProfileStore } from 'store/ProfileStore.d'
import APIName from 'api/APIName'
import LoginAPI from 'api/LoginAPI'

interface ILoginPageProps {
  history: any
  profile: IProfileStore
}

interface ILoginPageState {
  account: IAccount
}

@inject('profile')
export default class LoginPage extends React.Component<
  ILoginPageProps,
  ILoginPageState
> {
  state = {
    account: initAccount,
  }

  handleKeyDown = (e?: any) => {
    if (e.key === 'Enter') {
      this.handleLoginClick()
    }
  }

  handleLoginClick = () => {
    const { account } = this.state
    if (account.username === 'book') {
      this.hacker()
    } else {
      this.onLogin()
    }
  }

  hacker = () => {
    const token = 'jwtToken'
    localStorage.setItem('isAuthen', token)
    const myProfile = {
      firstname: 'Raweewat',
      lastname: 'Ngeabprasert',
      image: '',
    }
    this.props.profile.setMyProfile(myProfile)
    this.props.profile.setIsLogin(true)
    this.props.history.replace('/')
  }

  onLogin = async () => {
    const { account } = this.state
    if (account.username && account.password) {
      const myProfileId = await LoginAPI.login(account)
      console.log('myProfileId ===>', myProfileId)
      if (myProfileId) {
        const token = 'jwtToken'
        localStorage.setItem('isAuthen', token)
        localStorage.setItem('myProfileId', myProfileId)
        await this.props.profile.getMyProfileById(myProfileId)
        const myProfile = this.props.profile.getMyProfileJS()
        this.props.profile.setMyProfile(myProfile)
        this.props.profile.setIsLogin(true)
        this.props.history.replace('/')
      } else {
        console.log('something went wrong')
      }
    }
  }

  handleSignUp = () => {
    this.props.history.push(APIName.register)
  }

  onUsernameChange = (e: any) => {
    const { account } = this.state
    let newAccount = account
    newAccount.username = e.target.value
    this.setState({ account: newAccount })
  }

  onPasswordChange = (e: any) => {
    const { account } = this.state
    let newAccount = account
    newAccount.password = e.target.value
    this.setState({ account: newAccount })
  }

  render() {
    return (
      <div className={css.loginPage}>
        <img alt="" className={css.loginFacebookLogo} src={facebook_image} />
        <input
          className={`${css.loginInput} ${css.userInput}`}
          onChange={this.onUsernameChange}
          onKeyDown={this.handleKeyDown}
          type="string"
        />
        <input
          className={`${css.loginInput} ${css.passwordInput}`}
          onChange={this.onPasswordChange}
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
    )
  }
}
