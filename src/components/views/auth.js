import React, { Component } from "react";
import Login from "../auth/login";

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      isLoading: true,
      loggedInStatus: false
    };

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);

    this.handleUnSuccessfulAuth = this.handleUnSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(e) {
    this.props.history.push("/");
  }

  handleUnSuccessfulAuth(errorMessage) {
    this.setState({
      errorMessage:
        "There was an error processing your request, please try again."
    });
  }

  render() {
    return (
      <div className="auth-page-wrapper">
        <div className="left-column">
          <div className="headline">Login</div>
        </div>

        <div className="right-column">
          <Login
            handleSuccessfulAuth={this.handleSuccessfulAuth}
            handleUnSuccessfulAuth={this.handleUnSuccessfulAuth}
          />
        </div>
      </div>
    );
  }
}
