import React, { Component } from "react";
import axios from "axios";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
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
        console.log("response from portfolio form component", response);
        // TODO
        // Render out portfolio and render in cool sidebar
        // if (response.data.status === "created") {
        //   this.props.handleSuccessfulAuth(response.data);
        // } else {
        //   this.props.handleUnSuccessfulAuth(error);
        // }
      })
      .catch(error => {
        // this.props.handleUnSuccessfulAuth(error);
      });

    event.preventDefault();
  }

  // TODO
  // Build out styles for the portfolio form

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
          <div className="three-column">
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

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={this.state.category}
              onChange={this.handleChange}
            />
          </div>

          <div className="one-column">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>

          <div className="three-column">
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

            <input
              type="file"
              name="logo"
              onChange={this.handleChange}
              multiple
            />
          </div>

          <div className="btn-wrapper">
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}
