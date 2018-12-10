import React, { Component } from "react";
import axios from "axios";
import PortfolioForm from "../portfolio/portfolio-form";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: []
    };

    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

  handleFormSubmission(portfolioItem) {
    console.log("submitted from child", portfolioItem);
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  getPortfolioItems() {
    axios
      .get(
        "https://jordan.devcamp.space/portfolio/portfolio_items?order_by=position&direction=desc",
        {
          withCredentials: true
        }
      )
      .then(response => {
        this.setState({ portfolioItems: [...response.data.portfolio_items] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          PortfolioNew
          <PortfolioForm handleFormSubmission={this.handleFormSubmission} />
        </div>

        <div className="right-column">
          <PortfolioSidebarList data={this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}
