import React, { Component } from "react";

export default class BlogDetail extends Component {
  render() {
    return (
      <div>
        BlogDetail
        <div>{this.props.match.params.slug}</div>
      </div>
    );
  }
}
