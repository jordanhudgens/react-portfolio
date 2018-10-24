import React, { Component } from "react";
import axios from "axios";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      link: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log("handle change", event);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios
      .post(
        "https://jordan.devcamp.space/portfolio_items",
        {
          portfolio_item: {
            name: this.state.name,
            description: this.state.description,
            url: this.state.link
          }
        },
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

          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}
