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
      loggedInStatus: "NOT_LOGGED_IN"
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
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  authorizedPages() {
    return [
      <Route key="1" path="/portfolio-manager" component={PortfolioManager} />,
      <Route key="2" path="/blogs/new" component={NewBlog} />
    ];
  }

  render() {
    this.checkLoginStatus();

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
              <Route path="/blogs" component={Blog} />
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
