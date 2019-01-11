import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "eCommerce",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleLogoDrop = this.handleLogoDrop.bind(this);
    this.handleBannerDrop = this.handleBannerDrop.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);

    this.thumbRef = React.createRef();
    this.bannerRef = React.createRef();
    this.logoRef = React.createRef();
  }

  handleChange(event) {
    console.log("event details...", event.target.name, event.target.value);
    if (event.target.files) {
      this.setState({ [event.target.name]: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);

    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }

    if (this.state.banner_image) {
      formData.append("portfolio_item[banner_image]", this.state.banner_image);
    }

    if (this.state.logo) {
      formData.append("portfolio_item[logo]", this.state.logo);
    }

    return formData;
  }

  handleSubmit(event) {
    axios
      .post(
        "https://jordan.devcamp.space/portfolio/portfolio_items",
        this.buildForm(),
        { withCredentials: true }
      )
      .then(response => {
        this.props.handleFormSubmission(response.data.portfolio_item);

        this.setState({
          name: "",
          description: "",
          category: "",
          position: "",
          url: "",
          thumb_image: "",
          banner_image: "",
          logo: ""
        });

        [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
          ref.current.dropzone.removeAllFiles();
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

  handleLogoDrop() {
    return {
      addedfile: file => this.setState({ logo: file })
    };
  }

  handleBannerDrop() {
    return {
      addedfile: file => this.setState({ banner_image: file })
    };
  }

  handleThumbDrop() {
    return {
      addedfile: file => this.setState({ thumb_image: file })
    };
  }

  componentDidMount() {
    console.log("componentDidMount", this.props.portfolioToEdit);
  }

  componentDidUpdate() {
    if (Object.keys(this.props.portfolioToEdit).length > 0) {
      const {
        name,
        description,
        category,
        position,
        url,
        thumb_image,
        banner_image,
        logo
      } = this.props.portfolioToEdit;

      this.props.clearPortfolioToEdit();

      // TODO
      // Build an editMode state and switch the action for the form submission process
      // Pull in the images and allow for edits

      this.setState({
        name: name || "",
        description: description || "",
        category: category || "",
        position: position || "",
        url: url || "",
        thumb_image: thumb_image || "",
        banner_image: banner_image || "",
        logo: logo || ""
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="name"
            placeholder="Portfolio Item Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="url"
            placeholder="URL"
            value={this.state.url}
            onChange={this.handleChange}
          />
        </div>

        <div className="two-column">
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={this.state.position}
            onChange={this.handleChange}
          />

          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            className="selectElement"
          >
            <option value="eCommerce">eCommerce</option>
            <option value="Education">Education</option>
            <option value="Enterprise">Entperise</option>
            <option value="Scheduling">Scheduling</option>
            <option value="Social Media">Social Media</option>
          </select>
        </div>

        <div className="one-column">
          <textarea
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <div className="image-uploaders">
          <DropzoneComponent
            ref={this.thumbRef}
            config={this.componentConfig()}
            eventHandlers={this.handleThumbDrop()}
            djsConfig={this.djsConfig()}
          >
            <div className="dz-message">Thumbnail</div>
          </DropzoneComponent>

          <DropzoneComponent
            ref={this.bannerRef}
            config={this.componentConfig()}
            eventHandlers={this.handleBannerDrop()}
            djsConfig={this.djsConfig()}
          >
            <div className="dz-message">Banner</div>
          </DropzoneComponent>

          <DropzoneComponent
            ref={this.logoRef}
            config={this.componentConfig()}
            eventHandlers={this.handleLogoDrop()}
            djsConfig={this.djsConfig()}
          >
            <div className="dz-message">Logo</div>
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
