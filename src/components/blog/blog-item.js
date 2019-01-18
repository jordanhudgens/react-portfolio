import React from "react";
import { Link } from "react-router-dom";
import striptags from "striptags";
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
      <Link to={`/blog/${id}`}>
        <h1>{title}</h1>
      </Link>
      <div className="blog-summary-wrapper">
        <Truncate
          lines={5}
          ellipsis={
            <span>
              ... <Link to={`/blog/${id}`}>Read more</Link>
            </span>
          }
        >
          {striptags(content)}
        </Truncate>
      </div>
    </div>
  );
};

export default BlogItem;
