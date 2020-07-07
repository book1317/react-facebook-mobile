import React, { Fragment, useEffect } from "react";
import "./App.scss";
import {
  Router,
  Switch,
  Route,
  Link,
  withRouter,
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "mobx-react";
import history from "./utils/History";
import LoginPage from "./page/LoginPage/LoginPage";
import HomePage from "./page/HomePage/HomePage";
import ProfilePage from "./page/ProfilePage/ProfilePage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import Footer from "./components/Footer/Footer";
import MessagerPage from "./page/MessagerPage/MessagerPage";
import ChatPage from "./page/ChatPage/ChatPage";

type MyProps = { props?: any; location?: any; url?: any; history?: any };
type MyState = { showFooter: boolean };

class App extends React.Component<MyProps, MyState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      showFooter: true,
    };
    this.checkShowFooter();
  }

  componentDidMount() {
    document.title = "Facebook";
  }

  checkShowFooter() {
    console.log("checkShowFooter", this.props.location.pathname);
    if (this.props.location.pathname == "/login") {
      this.setState({ showFooter: false });
    } else {
      this.setState({ showFooter: true });
    }
  }

  render() {
    return (
      <Router history={history}>
        <Fragment>
          {this.state.showFooter && <Footer />}
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
