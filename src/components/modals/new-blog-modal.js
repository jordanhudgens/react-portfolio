import React, { Component } from "react";
import ReactModal from "react-modal";
import axios from "axios";
import BlogForm from "../blog/blog-form";

ReactModal.setAppElement(".app-wrapper");

export default class NewBlogModal extends Component {
  constructor(props) {
    super(props);

    this.customStyles = {
      overlay: {
        backgroundColor: "rgba(1, 1, 1, 0.75)"
      },
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "800px"
      }
    };

    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
  }

  handleFormSubmission(blog) {
    console.log("handleFormSubmission", blog);
    // this.setState({
    //   blogItems: [blog].concat(this.state.blogItems)
    // });
  }

  handleFormSubmissionError(error) {
    console.log("error", error);
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.modalIsOpen}
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        style={this.customStyles}
      >
        <BlogForm
          handleFormSubmission={this.handleFormSubmission}
          handleFormSubmissionError={this.handleFormSubmissionError}
        />
      </ReactModal>
    );
  }
}
