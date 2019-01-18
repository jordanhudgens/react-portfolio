import React from "react";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";

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
      <div className="blog-summary-wrapper">{ReactHtmlParser(content)}</div>
    </div>
  );
};

export default BlogItem;
