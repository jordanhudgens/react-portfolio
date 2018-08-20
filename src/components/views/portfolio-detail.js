import React, { Component } from "react";

export default class PortfolioDetail extends Component {
  render() {
    return (
      <div className="portfolio-detail-wrapper">
        <div className="banner">{this.props.match.params.slug}</div>
      </div>
    );
  }
}
