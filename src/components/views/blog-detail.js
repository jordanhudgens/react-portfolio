import React, { Component } from "react";
import axios from "axios";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2
} from "react-html-parser";
import BlogForm from "../blog/blog-form";

export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {},
      editMode: false
    };

    this.handleEditClick = this.handleEditClick.bind(this);
  }

  getBlogItem() {
    axios
      .get(
        `https://jordan.devcamp.space/portfolio/portfolio_blogs/${
          this.state.currentId
        }`
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

  handleEditClick() {
    console.log("handle edit mode");
    this.setState({
      editMode: true
    });
  }

  render() {
    const {
      id,
      blog_status,
      content,
      featured_image_url,
      title
    } = this.state.blogItem;

    const contentManager = () => {
      if (this.state.editMode) {
        return <BlogForm editMode={true} blog={this.state.blogItem} />;
      } else {
        return (
          <div className="blog-list-item">
            <h1 onClick={this.handleEditClick}>{title}</h1>
            {featured_image_url ? (
              <div className="featured-image-wrapper">
                <img src={featured_image_url} />
              </div>
            ) : null}
            {ReactHtmlParser(content)}
          </div>
        );
      }
    };

    return (
      <div>
        <div className="blog-list-wrapper">{contentManager()}</div>
      </div>
    );
  }
}
