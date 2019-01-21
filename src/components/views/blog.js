import React, { Component } from "react";
import axios from "axios";

import BlogItem from "../blog/blog-item";

export default class Blog extends Component {
  constructor() {
    super();

    this.state = {
      error: false,
      hasMore: true,
      totalCount: 0,
      isLoading: false,
      currentPage: 1,
      blogItems: []
    };

    this.getBlogItems = this.getBlogItems.bind(this);

    window.onscroll = () => {
      const {
        getBlogItems,
        state: { error, isLoading, totalCount, blogItems, currentPage }
      } = this;

      if (error || isLoading || totalCount === blogItems.length) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.setState(
          {
            currentPage: currentPage + 1
          },
          getBlogItems()
        );
      }
    };
  }

  componentWillMount() {
    this.getBlogItems();
  }

  getBlogItems() {
    console.log("current state", this.state);
    axios
      .get(
        `https://jordan.devcamp.space/portfolio/portfolio_blogs?page=${this
          .state.currentPage}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        console.log("Getting more...", response);
        this.setState({
          blogItems: [...response.data.portfolio_blogs],
          totalCount: response.data.meta.total_records
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // TODO
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
