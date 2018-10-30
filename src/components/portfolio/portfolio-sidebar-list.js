import React, { Component } from "react";
import axios from "axios";

export default class PortfolioSidebarList extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: []
    };
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  getPortfolioItems() {
    axios
      .get("https://jordan.devcamp.space/portfolio_items", {
        withCredentials: true
      })
      .then(response => {
        this.setState({ portfolioItems: [...response.data.portfolio_items] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const portfolioList = this.state.portfolioItems.map(portfolioItem => {
      return <div className="portfolio-item-thumb">{portfolioItem.name}</div>;
    });

    return (
      <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>
    );
  }
}
