import React, { Component } from "react";

export default class PortfolioItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioItemClass: null
    };
  }

  handleMouseEnter(evt) {
    console.log(evt.target);
  }

  render() {
    const { bgImage, logo, name, description } = this.props.portfolioItem;

    return (
      <div
        className={"portfolio-item-wrapper " + this.state.portfolioItemClass}
        onMouseEnter={e => this.handleMouseEnter(e)}
      >
        <div
          className="portfolio-img-background"
          style={{
            backgroundImage: "url(" + bgImage + ")"
          }}
        />

        <div className="img-text-wrapper">
          <div className="logo-wrapper">
            <img src={logo} alt={name} />
          </div>

          <div className="subtitle">{description}</div>
        </div>
      </div>
    );
  }
}
