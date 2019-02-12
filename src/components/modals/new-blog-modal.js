import React, { Component } from "react";
import ReactModal from "react-modal";
import axios from "axios";

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

    this.state = {
      title: "",
      content: "",
      blog_status: "",
      featured_image: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  // TODO
  // Create a form object
  // Take from the new blog component
  handleSubmit(event) {}

  render() {
    return (
      <ReactModal
        isOpen={this.props.modalIsOpen}
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        style={this.customStyles}
      >
        <form onSubmit={this.handleSubmit} className="form-wrapper">
          <div className="form-group">
            <input
              className="full-width-element"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              className="full-width-element"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="login-btn-wrapper">
            <button
              className="primary-rounded-button button-small"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </ReactModal>
    );
  }
}
