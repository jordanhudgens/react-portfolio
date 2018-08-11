import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        <NavLinks />
        <h1>Portfolio Application</h1>
      </div>
    );
  }
}
