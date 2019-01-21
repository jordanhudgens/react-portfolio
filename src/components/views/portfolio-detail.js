import React, { Component } from "react";
import axios from "axios";

import Banner from "../partials/banner";

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { portfolioItem: {} };
  }

  componentDidMount() {
    this.getPortfolioItem(this.props.match.params.slug);
  }

  getPortfolioItem(id) {
    axios
      .get(`https://jordan.devcamp.space/portfolio/portfolio_items/${id}`)
      .then(response => {
        console.log("response from get", response);
        this.setState({ portfolioItem: response.data.portfolio_item });
      })
      .catch(error => {
        console.log("error from get portfolio item", error);
      });
  }

  render() {
    console.log("port detail", this.state.portfolioItem);
    const {
      id,
      banner_image_url,
      logo_url,
      name,
      description,
      url
    } = this.state.portfolioItem;

    const bannerStyles = {
      backgroundImage: "url(" + banner_image_url + ")",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat"
    };

    const logoStyles = {
      width: "200px"
    };

    return (
      <div className="portfolio-detail-wrapper">
        <div className="banner" style={bannerStyles}>
          <img src={logo_url} style={logoStyles} />
        </div>

        <div className="portfolio-detail-description-wrapper">
          <div className="description">{description}</div>
        </div>

        <Banner name={name} bannerLink={url} />
      </div>
    );
  }
}
