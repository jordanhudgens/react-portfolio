import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NewBlogModal from "../modals/new-blog-modal";
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
      blogItems: [],
      blogModalIsOpen: false
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this.handleNewBlogClick = this.handleNewBlogClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);

    this.handleSuccessfullNewBlogFormSubmission = this.handleSuccessfullNewBlogFormSubmission.bind(
      this
    );

    this.activateInfiniteScroll();
  }

  handleSuccessfullNewBlogFormSubmission(blog) {
    this.setState({
      blogItems: [blog].concat(this.state.blogItems),
      blogModalIsOpen: false
    });
  }

  activateInfiniteScroll() {
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

  handleModalClose() {
    this.setState({
      blogModalIsOpen: false
    });
  }

  handleNewBlogClick() {
    this.setState({
      blogModalIsOpen: true
    });
  }

  componentWillMount() {
    console.log("loggedInStatus", this.props.loggedInStatus);
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
  // Integrate editable input
  // Integrate editable textarea

  render() {
    const blogRecords = this.state.blogItems.map(blogItem => {
      return <BlogItem key={blogItem.id} blogItem={blogItem} />;
    });

    return (
      <div className="blog-list-wrapper">
        <NewBlogModal
          modalIsOpen={this.state.blogModalIsOpen}
          handleModalClose={this.handleModalClose}
          handleSuccessfullNewBlogFormSubmission={
            this.handleSuccessfullNewBlogFormSubmission
          }
        />

        {this.props.loggedInStatus === "LOGGED_IN" ? (
          <div className="new-blog-link">
            <a onClick={this.handleNewBlogClick}>
              <FontAwesomeIcon icon="plus-circle" />
            </a>
          </div>
        ) : null}

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
