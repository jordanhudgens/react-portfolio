import React, { Component } from "react";
import axios from "axios";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      link: "",
      thumb_image: ""
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
    formData.append("portfolio_item[link]", this.state.link);

    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
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

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Portfolio Item Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="link"
            placeholder="Link"
            value={this.state.link}
            onChange={this.handleChange}
          />

          <input
            type="file"
            name="thumb_image"
            onChange={this.handleChange}
            multiple
          />

          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}
