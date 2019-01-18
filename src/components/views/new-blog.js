import React, { Component } from "react";
import axios from "axios";
import BlogForm from "../blog/blog-form";
import BlogSidebarList from "../blog/blog-sidebar-list";

export default class NewBlog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: []
    };

    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
  }

  handleFormSubmission(blog) {
    this.setState({
      blogItems: [blog].concat(this.state.blogItems)
    });
  }

  handleFormSubmissionError(error) {
    console.log("error", error);
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
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <BlogForm
            handleFormSubmission={this.handleFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
          />
        </div>

        <div className="right-column">
          <BlogSidebarList data={this.state.blogItems} />
        </div>
      </div>
    );
  }
}
