import React from "react";
import { NavLink } from "react-router-dom";

import "../../style/nav.scss";

const NavLinks = () => {
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
      </div>

      <div className="left-side">
        <div className="brand">JORDAN HUDGENS</div>
      </div>
    </div>
  );
};

export default NavLinks;
