import React, { Fragment, lazy } from 'react'
import { Router, Switch, Route, withRouter, Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import history from 'utils/History'
import 'common/style/global.scss'

import LoginPage from 'page/LoginPage/LoginPage'
import HomePage from 'page/HomePage/HomePage'
import ProfilePage from 'page/ProfilePage/ProfilePage'
import RegisterPage from 'page/RegisterPage/RegisterPage'
import Footer from 'components/Footer/Footer'
import MessagerPage from 'page/MessagerPage/MessagerPage'
import ChatPage from 'page/ChatPage/ChatPage'
import { IProfileStore } from 'store/ProfileStore.d'
import PageName from 'constant/PageName'

type MyProps = {
  location?: any
  url?: any
  history?: any
  profile: IProfileStore
  footer?: any
}
type MyState = { showFooter: boolean }

@inject('profile', 'footer')
@observer
class App extends React.Component<MyProps, MyState> {
  constructor(props?: any) {
    super(props)
    this.state = {
      showFooter: true,
    }
    const token = localStorage['isAuthen']
    if (token) {
      const myProfileId = localStorage['myProfileId']
      if (myProfileId) {
        this.props.profile.setMyProfileId(myProfileId)
      }
      this.props.profile.setIsLogin(true)
    }
  }

  LazyMessagerPage = () => lazy(() => import('page/MessagerPage/MessagerPage'))

  componentDidMount() {
    document.title = 'Facebook'
  }

  render() {
    const isLogin = this.props.profile.getIsLogin()

    if (isLogin)
      return (
        <Router history={history}>
          <Fragment>
            {this.props.footer.isShow && <Footer />}
            <Switch>
              <Route path={PageName.profile} component={ProfilePage} />
              <Route path={PageName.messager} component={MessagerPage} />
              <Route path={PageName.chat} component={ChatPage} />
              <Route path={PageName.login} component={LoginPage} />
              <Route exact path="/" component={HomePage} />
              <Redirect to="/" />
            </Switch>
          </Fragment>
        </Router>
      )
    else
      return (
        <Router history={history}>
          <Fragment>
            <Route path={PageName.login} component={LoginPage} />
            <Route path={PageName.register} component={RegisterPage} />
            <Redirect to={PageName.login} />
          </Fragment>
        </Router>
      )
  }
}

export default withRouter(App as any)
