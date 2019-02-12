import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import BlogItem from "../blog/blog-item";

export default class Blog extends Component {
  constructor() {
    super();

    this.state = {
      error: false,
      hasMore: true,
      totalCount: 0,
      isLoading: true,
      currentPage: 0,
      blogItems: []
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);

    window.onscroll = () => {
      const {
        getBlogItems,
        state: { error, isLoading, totalCount, blogItems, currentPage }
      } = this;

      if (error || isLoading || totalCount === blogItems.length) return;

      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        getBlogItems();
      }
    };
  }

  handleNewBlogClick() {
    console.log("clickedddd");
  }

  componentWillMount() {
    this.getBlogItems();
  }

  getBlogItems() {
    this.setState({
      currentPage: this.state.currentPage + 1,
      isLoading: true
    });

    axios
      .get(
        `https://jordan.devcamp.space/portfolio/portfolio_blogs?page=${this
          .state.currentPage}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        this.setState({
          blogItems: this.state.blogItems.concat([
            ...response.data.portfolio_blogs
          ]),
          totalCount: response.data.meta.total_records,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // TODO
  // Loading -> add loader throughout the app
  // Integrate editable input
  // Integrate editable textarea

  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });

    return (
      <div className="blog-list-wrapper">
        <div className="new-blog-link">
          <a onClick={this.handleNewBlogClick}>
            <FontAwesomeIcon icon="plus-circle" />
          </a>
        </div>
        {blogRecords}
        {this.state.isLoading ? (
          <div className="loading-icon-wrapper">
            <FontAwesomeIcon icon="spinner" spin />
          </div>
        ) : null}
      </div>
    );
  }
}
