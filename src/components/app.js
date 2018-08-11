import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./views/home";
import About from "./views/about";
import NoMatch from "./views/no-match";

const NavLinks = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About Me</Link>
    </div>
  );
};

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <NavLinks />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
