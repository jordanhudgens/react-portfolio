import React, { Component } from "react";

import portfolioItemData from "../../data/portfolio-items.json";

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { portfolioItem: null };
  }
  componentWillMount() {
    const data = portfolioItemData.portfolioItems;
    const portfolioItem = data.find(el => {
      return String(el.id) === this.props.match.params.slug;
    });

    this.setState({ portfolioItem });
  }

  render() {
    const { id, bgImage, logo, name, description } = this.state.portfolioItem;

    return (
      <div className="portfolio-detail-wrapper">
        <div className="banner">
          <img src={bgImage} />

          <div className="portfolio-detail-title">{name}</div>
        </div>
      </div>
    );
  }
}
