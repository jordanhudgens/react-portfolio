import React, { Component } from "react";
import axios from "axios";

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

  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
      return <div>{blogItem.title}</div>;
    });

    return <div className="blog-list-wrapper">{blogRecords}</div>;
  }
}
