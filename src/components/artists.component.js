import React, { Component } from "react";
import ArtistsDataService from "../services/artists.service";

export default class Artists extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateArtist = this.updateArtist.bind(this);
    this.deleteArtist = this.deleteArtist.bind(this);

    this.state = {
      currentArtist: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { artist } = nextProps;
    if (prevState.currentArtist.id !== artist.id) {
      return {
        currentArtist: artist,
        message: ""
      };
    }

    return prevState.currentArtist;
  }

  componentDidMount() {
    this.setState({
      currentArtist: this.props.artist,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentArtist: {
          ...prevState.currentArtist,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentArtist: {
        ...prevState.currentArtist,
        description: description,
      },
    }));
  }

  updatePublished(status) {
    ArtistsDataService.update(this.state.currentArtist.id, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentArtist: {
            ...prevState.currentArtist,
            published: status,
          },
          message: "The status was updated successfully!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateArtist() {
    const data = {
      title: this.state.currentArtist.title,
      description: this.state.currentArtist.description,
    };

    ArtistsDataService.update(this.state.currentArtist.id, data)
      .then(() => {
        this.setState({
          message: "The artist was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteArtist() {
    ArtistsDataService.delete(this.state.currentArtist.id)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentArtist } = this.state;

    return (
      <div>
        <h4>Artist</h4>
        <img src={this.state.url} alt="" />
        {currentArtist ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentArtist.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentArtist.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentArtist.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentArtist.published ? (
              <button
                className="badge badge-primary mr-2"
                id="published"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                id="published"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              id="delete"
              onClick={this.deleteArtist}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              id="update"
              onClick={this.updateArtist}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Artist...</p>
          </div>
        )}
      </div>
    );
  }
}