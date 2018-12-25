import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      blog_status: "",
      featured_image: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);

    this.featuredImageRef = React.createRef();
  }

  handleChange(event) {
    if (event.target.files) {
      this.setState({ [event.target.name]: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[content]", this.state.content);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);

    if (this.state.featured_image) {
      formData.append(
        "portfolio_item[featured_image]",
        this.state.featured_image
      );
    }

    return formData;
  }

  handleSubmit(event) {
    axios
      .post(
        "https://jordan.devcamp.space/portfolio/portfolio_blogs",
        this.buildForm(),
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleFormSubmission(response.data.portfolio_blog);

        this.setState({
          title: "",
          content: "",
          blog_status: "",
          featured_image: ""
        });

        this.featuredImageRef.current.dropzone.removeAllFiles();
      })
      .catch(error => {
        this.props.handleFormSubmissionError(error);
      });

    event.preventDefault();
  }

  // TODO
  // Edit blog items
  // Delete images from server
  // https://github.com/felixrieseberg/React-Dropzone-Component/issues/24
  // Edit images

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }

  handleFeaturedImageDrop() {
    return {
      addedfile: file => this.setState({ featured_image: file })
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="blog_status"
            placeholder="Status..."
            value={this.state.blog_status}
            onChange={this.handleChange}
          />
        </div>

        <div className="one-column">
          <textarea
            name="content"
            placeholder="Content..."
            value={this.state.content}
            onChange={this.handleChange}
          />
        </div>

        <div className="image-uploaders">
          <DropzoneComponent
            ref={this.featuredImageRef}
            config={this.componentConfig()}
            eventHandlers={this.handleThumbDrop()}
            djsConfig={this.djsConfig()}
          >
            <div className="dz-message">Featured Image</div>
          </DropzoneComponent>
        </div>

        <div className="btn-wrapper">
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}
