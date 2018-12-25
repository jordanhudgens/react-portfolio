import React from "react";

import PortfolioItem from "./portfolio-item";
import portfolioItemData from "../../data/portfolio-items.json";

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

export default PortfolioList;
