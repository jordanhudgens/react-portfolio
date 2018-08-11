import React, { Component } from "react";

const NavLinks = () => {
  return (
    <div>
      <a href="/">Home</a>
      <a href="/about">About</a>
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
