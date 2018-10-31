import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    axios
      .post(
        "https://api.devcamp.space/sessions",
        {
          client: {
            email: this.state.email,
            password: this.state.password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        } else {
          this.props.handleUnSuccessfulAuth(error);
        }
      })
      .catch(error => {
        this.props.handleUnSuccessfulAuth(error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <div className="login-page-wrapper">
        <div className="left-column">
          <div className="quote-wrapper">{this.state.quoteText}</div>
        </div>

        <div className="right-column">
          <div className="content-wrapper">
            <div className="title">Login to access your dashboard</div>

            <div className="login-errors">
              {this.state.showErrorText ? errorDiv : ""}
            </div>

            <form onSubmit={this.handleSubmit} className="form-wrapper">
              <div className="form-group">
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon="at" />
                </div>
                <div className="full-width-element">
                  <input
                    className="full-width-element"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="icon-wrapper">
                  <FontAwesomeIcon icon="key" />
                </div>
                <div className="full-width-element">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className="login-btn-wrapper">
                <button className="btn btn__lg" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
