import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import axios from "axios";

import Home from "./views/home";
import About from "./views/about";
import PortfolioDetail from "./views/portfolio-detail";
import PortfolioManager from "./views/portfolio-manager";
import Blog from "./views/blog";
import BlogDetail from "./views/blog-detail";
import NewBlog from "./views/new-blog";
import Auth from "./views/auth";
import NoMatch from "./views/no-match";
import NavLinks from "./partials/navigation";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faAt, faKey } from "@fortawesome/free-solid-svg-icons";

library.add(faSignOutAlt, faAt, faKey);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      loadingStatus: "LOADING"
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  checkLoginStatus() {
    return axios
      .get(`https://api.devcamp.space/logged_in`, { withCredentials: true })
      .then(response => {
        this.setState({
          loadingStatus: "LOADED"
        });
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "LOGGED_IN"
        ) {
          return response.data;
        } else if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN"
          });
        } else if (
          !response.data.logged_in &&
          this.state.loggedInStatus === "LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN"
          });
        } else {
          return response.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    this.checkLoginStatus();

    if (this.state.loadingStatus === "LOADING") {
      return <div>Loading...</div>;
    }
    console.log("updated in render", this.state.loggedInStatus);
    return (
      <div className="container">
        <Router>
          <div>
            <NavLinks loggedInStatus={this.state.loggedInStatus} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route
                path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                    handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
                  />
                )}
              />
              <Route path="/portfolio-manager" component={PortfolioManager} />
              <Route path="/portfolio/:slug" component={PortfolioDetail} />
              <Route path="/blogs/new" component={NewBlog} />
              <Route path="/blogs" component={Blog} />
              <Route path="/blog/:slug" component={BlogDetail} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
