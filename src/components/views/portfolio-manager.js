import React, { Component } from "react";
import PortfolioForm from "../portfolio/portfolio-form";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleFormSubmission(portfolioItem) {
    console.log("submitted from child", portfolioItem);
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          PortfolioNew
          <PortfolioForm handleFormSubmission={this.handleFormSubmission} />
        </div>

        <div className="right-column">
          <PortfolioSidebarList />
        </div>
      </div>
    );
  }
}
