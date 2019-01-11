import React, { Component } from "react";
import axios from "axios";
import PortfolioForm from "../portfolio/portfolio-form";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";

export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: [],
      portfolioToEdit: {}
    };

    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
  }

  handleFormSubmission(portfolioItem) {
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
    });
  }

  handleFormSubmissionError(error) {
    console.log("error", error);
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
          <PortfolioForm
            handleFormSubmission={this.handleFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            portfolioToEdit={this.state.portfolioToEdit}
          />
        </div>

        <div className="right-column">
          <PortfolioSidebarList data={this.state.portfolioItems} />
        </div>
      </div>
    );
  }
}
