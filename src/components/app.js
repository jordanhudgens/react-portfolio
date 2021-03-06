import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Home from "./views/home";
import About from "./views/about";
import PortfolioDetail from "./views/portfolio-detail";
import PortfolioManager from "./views/portfolio-manager";
import Blog from "./views/blog";
import NewBlog from "./views/new-blog";
import BlogDetail from "./views/blog-detail";
import Auth from "./views/auth";
import NoMatch from "./views/no-match";
import NavLinks from "./partials/navigation";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faAt,
  faKey,
  faEdit,
  faTrash,
  faSpinner,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faSignOutAlt,
  faAt,
  faKey,
  faTrash,
  faEdit,
  faSpinner,
  faPlusCircle
);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      isLoading: true
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
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

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  checkLoginStatus() {
    return axios
      .get(`https://api.devcamp.space/logged_in`, { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          console.log("condition 2");
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
        }

        this.setState({
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  authorizedPages() {
    return [
      <Route
        key="portfolio-manager"
        path="/portfolio-manager"
        component={PortfolioManager}
      />,
      <Route key="new-blog" path="/new-blog" component={NewBlog} />
    ];
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="app-loader loading-icon-wrapper">
          <FontAwesomeIcon icon="spinner" spin />
        </div>
      );
    }

    return (
      <div className="container">
        <Router>
          <div>
            <NavLinks
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
            />
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
              <Route path="/portfolio/:slug" component={PortfolioDetail} />
              <Route
                path="/blogs"
                render={props => (
                  <Blog {...props} loggedInStatus={this.state.loggedInStatus} />
                )}
              />
              <Route path="/blog/:slug" component={BlogDetail} />
              {this.state.loggedInStatus === "LOGGED_IN" ? (
                this.authorizedPages()
              ) : null}
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
