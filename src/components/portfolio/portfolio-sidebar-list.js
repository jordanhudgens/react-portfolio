import React from "react";

export default function(props) {
  const portfolioList = props.data.map(portfolioItem => {
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

  return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
}
