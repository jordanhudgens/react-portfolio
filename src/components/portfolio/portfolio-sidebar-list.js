import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          <Link to={`/portfolio/${portfolioItem.id}`}>
            <h2 className="title">{portfolioItem.name}</h2>
          </Link>

          <div className="actions">
            <a onClick={() => props.handleEditClick(portfolioItem)}>
              <FontAwesomeIcon icon="edit" />
            </a>

            <a onClick={() => props.handleEditClick(portfolioItem)}>
              <FontAwesomeIcon icon="trash" />
            </a>
          </div>
        </div>
      </div>
    );
  });

  return <div className="portfolio-sidebar-list-wrapper">{portfolioList}</div>;
}
