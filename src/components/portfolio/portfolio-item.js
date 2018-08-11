import React, { Component } from "react";

const handleMouseEnter = evt => {
  console.log(evt.target);
};

export default class PortfolioItem extends Component {
  render() {
    return (
      <div
        className="portfolio-item-wrapper"
        onMouseEnter={e => handleMouseEnter(e)}
      >
        <div
          className="portfolio-img-background"
          style={{
            backgroundImage: "url(" + this.props.portfolioItem.bgImage + ")"
          }}
        />

        <div className="img-text-wrapper">
          <div className="logo-wrapper">
            <img
              src={this.props.portfolioItem.logo}
              alt={this.props.portfolioItem.name}
            />
          </div>

          <div className="subtitle">{this.props.portfolioItem.description}</div>
        </div>
      </div>
    );
  }
}
