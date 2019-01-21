import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {}
    };
  }

  getBlogItem() {
    axios
      .get(
        `https://jordan.devcamp.space/portfolio/portfolio_blogs/${this.state
          .currentId}`
      )
      .then(response => {
        this.setState({
          blogItem: response.data.portfolio_blog
        });
      })
      .catch(error => {
        console.log("blog detail loader error", error);
      });
  }

  componentDidMount() {
    this.getBlogItem();
  }

  render() {
    console.log("this.state.blog", this.state.blogItem);
    const {
      id,
      blog_status,
      content,
      featured_image_url,
      title
    } = this.state.blogItem;

    return (
      <div>
        <div className="blog-list-wrapper">
          <div className="blog-list-item">
            <h1>{title}</h1>
            <div className="featured-image-wrapper">
              <img src={featured_image_url} />
            </div>
            {ReactHtmlParser(content)}
          </div>
        </div>
      </div>
    );
  }
}
