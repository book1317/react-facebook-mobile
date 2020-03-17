import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import { Provider } from "mobx-react";
import LoginPage from "./page/LoginPage/LoginPage";
import HomePage from "./page/HomePage/HomePage";
import ProfilePage from "./page/ProfilePage/ProfilePage";
import Footer from "./components/Footer/Footer";

type MyProps = { props?: any; location?: any; url?: any };
type MyState = { showFooter: boolean };
class App extends React.Component<MyProps, MyState> {
  constructor(props?: any) {
    super(props);
    this.state = {
      showFooter: false
    };
  }

  componentDidMount() {
    document.title = "Facebook";
    this.checkShowFooter();
  }

  componentWillReceiveProps() {
    this.checkShowFooter();
  }

  checkShowFooter() {
    if (this.props.location.pathname == "/login")
      this.setState({ showFooter: false });
    else this.setState({ showFooter: true });
  }

  render() {
    return (
      <Router>
        <div>
          {this.state.showFooter && <Footer />}
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withRouter(App as any);
