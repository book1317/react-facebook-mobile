import React, { Fragment, useEffect } from "react";
import { Router, Switch, Route, withRouter } from "react-router-dom";
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

  componentDidMount() {
    document.title = "Facebook";
  }

  render() {
    return (
      <Router history={history}>
        <Fragment>
          {this.props.profile.isLogin && <Footer />}
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/messager" component={MessagerPage} />
            <Route path="/chat" component={ChatPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default withRouter(App as any);
