import React, { Component } from "react";
import axios from "axios";
import classNames from "classnames";
import Dropzone from "react-dropzone";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.onDrop = this.onDrop.bind(this);
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

    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);

    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }

    if (this.state.banner_image) {
      formData.append("portfolio_item[banner_image]", this.state.banner_image);
    }

    if (this.state.logo) {
      formData.append("portfolio_item[logo]", this.state.logo);
    }

    return formData;
  }

  handleSubmit(event) {
    axios
      .post(
        "https://jordan.devcamp.space/portfolio/portfolio_items",
        this.buildForm(),
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleFormSubmission(response.data.portfolio_item);
      })
      .catch(error => {
        this.props.handleFormSubmissionError(error);
      });

    event.preventDefault();
  }

  onDrop(acceptedFiles, rejectedFiles) {
    console.log("acceptedFiles", acceptedFiles[0]);
    this.setState({
      logo: acceptedFiles[0]
    });
    console.log("rejectedFiles", rejectedFiles);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="name"
            placeholder="Portfolio Item Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="url"
            placeholder="URL"
            value={this.state.url}
            onChange={this.handleChange}
          />
        </div>

        <div className="two-column">
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={this.state.position}
            onChange={this.handleChange}
          />

          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            className="selectElement"
          >
            <option value="eCommerce">eCommerce</option>
            <option value="Scheduling">Scheduling</option>
            <option value="Enterprise">Entperise</option>
          </select>
        </div>

        <div className="one-column">
          <textarea
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <input
          type="file"
          name="thumb_image"
          onChange={this.handleChange}
          multiple
        />

        <input
          type="file"
          name="banner_image"
          onChange={this.handleChange}
          multiple
        />

        <input type="file" name="logo" onChange={this.handleChange} multiple />

        <hr />

        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                {...getRootProps()}
                className={classNames("dropzone", {
                  "dropzone--isActive": isDragActive
                })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop files here...</p>
                ) : (
                  <p>
                    Try dropping some files here, or click to select files to
                    upload.
                  </p>
                )}
              </div>
            );
          }}
        </Dropzone>

        <h2>Logo: {this.state.logo.name}</h2>

        <hr />

        <div className="btn-wrapper">
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}
