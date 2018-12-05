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
    const portfolioList = this.state.portfolioItems.map(portfolioItem => {
      return (
        <div className="portfolio-item-thumb" key={portfolioItem.id}>
          <div className="thumb-img">
            <img src={portfolioItem.thumb_image_url} />
          </div>

          <h2>{portfolioItem.id}</h2>

          <div className="title">{portfolioItem.name}</div>
        </div>
      );
    });

    return (
      <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>
    );
  }
}
