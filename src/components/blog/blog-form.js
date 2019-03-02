import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import { EditorState } from "draft-js";

import RichTextEditor from "../forms/rich-text-editor";

export default class BlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      blog_status: "",
      featured_image: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleFeaturedImageDrop = this.handleFeaturedImageDrop.bind(this);
    this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(
      this
    );

    this.featuredImageRef = React.createRef();
    this.richTextRef = React.createRef();
  }

  componentWillMount() {
    if (this.props.editMode) {
      this.setState({
        id: this.props.blog.id,
        title: this.props.blog.title,
        content: this.props.blog.content,
        blog_status: this.props.blog.blog_status
      });
    }
  }

  handleChange(event) {
    console.log("handlechange", event);
    if (event.target.files) {
      this.setState({ [event.target.name]: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleRichTextEditorChange(content) {
    this.setState({ content });
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_blog[title]", this.state.title);
    formData.append("portfolio_blog[content]", this.state.content);
    formData.append("portfolio_blog[blog_status]", this.state.blog_status);

    if (this.state.featured_image) {
      formData.append(
        "portfolio_blog[featured_image]",
        this.state.featured_image
      );
    }

    return formData;
  }

  handleSubmit(event) {
    axios
      .post(
        "https://jordan.devcamp.space/portfolio/portfolio_blogs",
        this.buildForm(),
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleFormSubmission(response.data.portfolio_blog);

        this.setState({
          title: "",
          content: "",
          blog_status: "",
          featured_image: ""
        });

        this.featuredImageRef.current.dropzone.removeAllFiles();
        this.richTextRef.current.setState({
          editorState: EditorState.createEmpty()
        });
      })
      .catch(error => {
        this.props.handleFormSubmissionError(error);
      });

    event.preventDefault();
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }

  handleFeaturedImageDrop() {
    return {
      addedfile: file => this.setState({ featured_image: file })
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="blog_status"
            placeholder="Status"
            value={this.state.blog_status}
            onChange={this.handleChange}
          />
        </div>

        <div className="one-column">
          <RichTextEditor
            ref={this.richTextRef}
            handleRichTextEditorChange={this.handleRichTextEditorChange}
          />
        </div>

        <div className="image-uploaders">
          <DropzoneComponent
            ref={this.featuredImageRef}
            config={this.componentConfig()}
            eventHandlers={this.handleFeaturedImageDrop()}
            djsConfig={this.djsConfig()}
          >
            <div className="dz-message">Featured Image</div>
          </DropzoneComponent>
        </div>

        <div className="btn-wrapper">
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}
