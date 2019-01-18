import React from "react";
import Truncate from "react-truncate";

const BlogItem = props => {
  const {
    id,
    blog_status,
    content,
    featured_image_url,
    title
  } = props.blogItem;

  return (
    <div className="blog-list-item">
      <h1>{title}</h1>
      <div className="blog-summary-wrapper">
        {content}
        <Truncate
          children={1}
          ellipsis={
            <span>
              ... <a href="/link/to/article">Read more</a>
            </span>
          }
        >
          {content}
        </Truncate>
      </div>
    </div>
  );
};

export default BlogItem;
