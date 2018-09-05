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
import Blog from "./views/blog";
import BlogDetail from "./views/blog-detail";
import NewBlog from "./views/new-blog";
import NoMatch from "./views/no-match";
import NavLinks from "./partials/navigation";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavLinks />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
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
