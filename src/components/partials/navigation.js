import React from "react";
import { NavLink } from "react-router-dom";

import "../../style/nav.scss";

const NavLinks = () => {
  const newPortfolioLink = () => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to="/portfolio/new" activeClassName="active-nav-link">
          New Portfolio
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
          <NavLink to="/blogs" activeClassName="active-nav-link">
            Blog
          </NavLink>
        </div>

        {true ? newPortfolioLink() : null}
      </div>

      <div className="left-side">
        <div className="brand">JORDAN HUDGENS</div>
      </div>
    </div>
  );
};

export default NavLinks;
