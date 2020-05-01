import React, { Fragment, useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  BrowserRouter,
} from "react-router-dom";
import { Provider } from "mobx-react";
import LoginPage from "./page/LoginPage/LoginPage";
import HomePage from "./page/HomePage/HomePage";
import ProfilePage from "./page/ProfilePage/ProfilePage";
import RegisterPage from "./page/RegisterPage/RegisterPage";
import Footer from "./components/Footer/Footer";

type MyProps = { props?: any; location?: any; url?: any; history?: any };
type MyState = { showFooter: boolean };

class App extends React.Component<MyProps, MyState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      showFooter: false,
    };
  }

  componentDidMount() {
    document.title = "Facebook";
    this.checkShowFooter();
  }

  componentDidUpdate(prevProps: any) {
    console.log("prevProps====>", prevProps);
    if (this.props.location.pathname !== prevProps.location.pathname) {
      console.log("Route change!", this.props.location.pathname);
    }
  }

  checkShowFooter() {
    console.log(this.props);
    if (this.props.location.pathname == "/login") {
      this.setState({ showFooter: false });
    } else {
      this.setState({ showFooter: true });
    }
    console.log("checklogin");
  }

  render() {
    console.log(this.state);
    return (
      <Router>
        <Fragment>
          {this.state.showFooter && <Footer />}
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default withRouter(App as any);
