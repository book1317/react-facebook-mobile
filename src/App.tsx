import React, { Fragment, lazy } from "react";
import { Router, Switch, Route, withRouter, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";
import history from "utils/History";

import LoginPage from "page/LoginPage/LoginPage";
import HomePage from "page/HomePage/HomePage";
import ProfilePage from "page/ProfilePage/ProfilePage";
import RegisterPage from "page/RegisterPage/RegisterPage";
import Footer from "components/Footer/Footer";
import MessagerPage from "page/MessagerPage/MessagerPage";
import ChatPage from "page/ChatPage/ChatPage";

type MyProps = {
  location?: any;
  url?: any;
  history?: any;
  profile?: any;
};
type MyState = { showFooter: boolean };

@inject("profile")
@observer
class App extends React.Component<MyProps, MyState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      showFooter: true,
    };
  }

  LazyMessagerPage = () => lazy(() => import("page/MessagerPage/MessagerPage"));

  componentDidMount() {
    document.title = "Facebook";
  }

  componentWillMount() {
    const token = localStorage["isAuthen"];
    if (token) this.props.profile.setIsLogin(true);
  }

  render() {
    const { isLogin } = this.props.profile;

    if (isLogin)
      return (
        <Router history={history}>
          <Fragment>
            <Footer />
            <Switch>
              <Route path="/profile" component={ProfilePage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/messager" component={MessagerPage} />
              <Route path="/chat" component={ChatPage} />
              <Route exact path="/" component={HomePage} />
              <Redirect to="/" />
            </Switch>
          </Fragment>
        </Router>
      );
    else
      return (
        <Router history={history}>
          <Fragment>
            <Route path="/login" component={LoginPage} />
            <Redirect to="/login" />
          </Fragment>
        </Router>
      );
  }
}

export default withRouter(App as any);
