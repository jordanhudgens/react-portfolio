import React from "react";
import { NavLink } from "react-router-dom";

import "../../style/nav.scss";

const NavLinks = () => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="active-nav-link">
          {linkText}
        </NavLink>
      </div>
    );
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

        {true ? dynamicLink("/blogs/new", "New Blog") : null}
        {true ? dynamicLink("/portfolio-manager", "New Portfolio") : null}
      </div>

      <div className="left-side">
        <div className="brand">JORDAN HUDGENS</div>
      </div>
    </div>
  );
};

export default NavLinks;
