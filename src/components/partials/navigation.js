import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavLinks = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="active-nav-link">
          {linkText}
        </NavLink>
      </div>
    );
  };

  const handleSignOut = event => {
    axios
      .delete(`https://api.devcamp.space/logout`, { withCredentials: true })
      .then(response => {
        if (response.status === 200) {
          props.history.push("/");
          props.handleSuccessfulLogout();
        }
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });

    event.preventDefault();
  };

  return (
    <div className="nav-wrapper">
      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="active-nav-link">
            Home
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink to="/about" activeClassName="active-nav-link">
            About Me
          </NavLink>
        </div>

        <div className="nav-link-wrapper">
          <NavLink exact to="/blogs" activeClassName="active-nav-link">
            Blog
          </NavLink>
        </div>

        {props.loggedInStatus === "LOGGED_IN" ? (
          dynamicLink("/new-blog", "New Blog")
        ) : null}
        {props.loggedInStatus === "LOGGED_IN" ? (
          dynamicLink("/portfolio-manager", "Portfolio Manager")
        ) : null}
      </div>

      <div className="right-side">
        <div className="brand">JORDAN HUDGENS</div>

        <a onClick={e => handleSignOut(e)}>
          {props.loggedInStatus === "LOGGED_IN" ? (
            <FontAwesomeIcon icon="sign-out-alt" />
          ) : null}
        </a>
      </div>
    </div>
  );
};

export default withRouter(NavLinks);
