import React, { Component } from "react";
import PortfolioForm from "../portfolio/portfolio-form";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";

export default class PortfolioManager extends Component {
  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          PortfolioNew
          <PortfolioForm />
        </div>

        <div className="right-column">
          <PortfolioSidebarList />
        </div>
      </div>
    );
  }
}
