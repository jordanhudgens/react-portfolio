import React, { Component } from "react";
import axios from "axios";

import BlogItem from "../blog/blog-item";

export default class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: []
    };
  }

  componentDidMount() {
    this.getBlogItems();
  }

  getBlogItems() {
    axios
      .get("https://jordan.devcamp.space/portfolio/portfolio_blogs", {
        withCredentials: true
      })
      .then(response => {
        this.setState({ blogItems: [...response.data.portfolio_blogs] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // TODO
  // Add banner image to blog detail component
  // Integrate infinite scroll into front end
  // Integrate editable input
  // Integrate editable textarea

  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });

    return <div className="blog-list-wrapper">{blogRecords}</div>;
  }
}
