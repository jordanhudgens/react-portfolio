import React from "react";

export default function(props) {
  const handleImageDefault = imgUrl => {
    if (imgUrl) {
      return imgUrl;
    } else {
      return "https://via.placeholder.com/400x250";
    }
  };

  const portfolioList = props.data.map(portfolioItem => {
    return (
      <div className="portfolio-item-thumb" key={portfolioItem.id}>
        <div className="thumb-img">
          <img src={handleImageDefault(portfolioItem.thumb_image_url)} />
        </div>

        <h2>{portfolioItem.id}</h2>

        <div className="title">{portfolioItem.name}</div>

        <a onClick={() => props.handleEditClick(portfolioItem)}>Edit Me</a>
      </div>
    );
  });

  return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
}
