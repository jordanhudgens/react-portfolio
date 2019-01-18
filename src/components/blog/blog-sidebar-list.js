import React from "react";

export default function(props) {
  const handleImageDefault = imgUrl =>
    imgUrl ? imgUrl : "https://via.placeholder.com/400x250";

  const blogList = props.data.map(blogItem => {
    return (
      <div className="portfolio-item-thumb" key={blogItem.id}>
        <div className="thumb-img">
          <img src={handleImageDefault(blogItem.featured_image_url)} />
        </div>

        <h2>{blogItem.id}</h2>

        <div className="title">{blogItem.title}</div>
      </div>
    );
  });

  return <div className="portfolio-sidebar-list-wrapper">{blogList}</div>;
}
