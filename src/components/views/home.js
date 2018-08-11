import React, { Component } from "react";

import portfolioItemData from "../../data/portfolio-items.json";

const handleMouseEnter = evt => {
  console.log(evt.target);
};

const PortfolioItem = props => {
  return (
    <div
      className="portfolio-item-wrapper"
      onMouseEnter={e => handleMouseEnter(e)}
    >
      <div
        className="portfolio-img-background"
        style={{
          backgroundImage: "url(" + props.portfolioItem.bgImage + ")"
        }}
      />

      <div className="img-text-wrapper">
        <div className="logo-wrapper">
          <img src={props.portfolioItem.logo} alt={props.portfolioItem.name} />
        </div>

        <div className="subtitle">{props.portfolioItem.description}</div>
      </div>
    </div>
  );
};

const PortfolioList = () => {
  const data = portfolioItemData.portfolioItems;
  const portfolioListItems = data.map(item => {
    return <PortfolioItem key={item.id} portfolioItem={item} />;
  });

  return (
    <div className="content-wrapper">
      <div className="portfolio-items-wrapper">{portfolioListItems}</div>
    </div>
  );
};

export default class Home extends Component {
  render() {
    console.log(portfolioItemData);
    return (
      <div>
        <PortfolioList />
      </div>
    );
  }
}
