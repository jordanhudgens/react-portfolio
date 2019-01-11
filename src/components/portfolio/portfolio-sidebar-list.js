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

        <div className="content">
          <h2 className="title">{portfolioItem.name}</h2>
          <a onClick={() => props.handleEditClick(portfolioItem)}>Edit Me</a>
        </div>
      </div>
    );
  });

  return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
}
