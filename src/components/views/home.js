import React, { Component } from "react";

const PortfolioItem = props => {
  return (
    <div className="portfolio-item-wrapper">
      <div
        className="portfolio-img-background"
        style={{
          backgroundImage: "url(https://source.unsplash.com/random)"
        }}
      />

      <div className="img-text-wrapper">
        <div className="logo-wrapper">
          <img src="images/logos/quip.png" alt="" />
        </div>

        <div className="subtitle">
          I built the Quip Ecommerce platform, named a Top 25 Invention by Time
          Magazine in 2016.
        </div>
      </div>
    </div>
  );
};

const PortfolioList = () => {
  const data = [
    {
      id: 1,
      name: "CronDose",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/crondose.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/crondose.png"
    },
    {
      id: 2,
      name: "DailySmarty",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/dailysmarty.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/dailysmarty.png"
    },
    {
      id: 3,
      name: "DashTrack",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/dashtrack.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/dashtrack.png"
    },
    {
      id: 4,
      name: "DevCamp",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/devcamp.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/devcamp.png"
    },
    {
      id: 5,
      name: "DevTrunk",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/devtrunk.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/devtrunk.png"
    },
    {
      id: 6,
      name: "Edutechional",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/edutechional.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/edutechional.png"
    },
    {
      id: 7,
      name: "Eventbrite",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/eventbrite.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/eventbrite.png"
    },
    {
      id: 8,
      name: "Ministry Safe",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/ministry-safe.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/ministry-safe.png"
    },
    {
      id: 9,
      name: "Open Devos",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/open-devos.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/open-devos.png"
    },
    {
      id: 10,
      name: "Quip",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/quip.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/quip.png"
    },
    {
      id: 11,
      name: "Shop Hacker",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/shop-hacker.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/shop-hacker.png"
    },
    {
      id: 12,
      name: "Toastability",
      bgImage:
        "https://s3.amazonaws.com/bottega-devcamp/react-portfolio/backgrounds/toastability.jpg",
      logo:
        "https://raw.githubusercontent.com/jordanhudgens/portfolio-html-site/master/images/logos/toastability.png"
    }
  ];

  const portfolioListItems = data.map(item => {
    return <PortfolioItem key={item.id} />;
  });

  return (
    <div className="content-wrapper">
      <div className="portfolio-items-wrapper">{portfolioListItems}</div>
    </div>
  );
};

export default class Home extends Component {
  render() {
    return (
      <div>
        <PortfolioList />
      </div>
    );
  }
}
