import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from "react-router-dom";

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

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavLinks />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route
                path="/auth"
                render={props => (
                  <Auth
                    {...props}
                    loggedIn={this.state.loggedIn}
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
