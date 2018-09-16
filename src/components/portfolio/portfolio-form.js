import React, { Component } from "react";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      link: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log("Submitted!", event);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Portfolio Item Name"
            value={this.state.name}
          />

          <input
            type="text"
            placeholder="Description"
            value={this.state.description}
          />

          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}
