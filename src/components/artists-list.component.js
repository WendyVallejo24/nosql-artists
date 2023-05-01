import React, { Component } from "react";
import ArtistsDataService from "../services/artists.service";

import Artists from "./artists.component";

export default class ArtistsList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveArtist = this.setActiveArtist.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      artists: [],
      currentArtist: null,
      currentIndex: -1,
    };

    this.unsubscribe = undefined;
  }

  componentDidMount() {
    this.unsubscribe = ArtistsDataService.getAll().orderBy("title", "asc").onSnapshot(this.onDataChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onDataChange(items) {
    let artists = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      artists.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    this.setState({
      artists: artists,
    });
  }

  refreshList() {
    this.setState({
      currentArtist: null,
      currentIndex: -1,
    });
  }

  setActiveArtist(artist, index) {
    this.setState({
      currentArtist: artist,
      currentIndex: index,
    });
  }

  render() {
    const { artists, currentArtist, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Artists List</h4>

          <ul className="list-group">
            {artists &&
              artists.map((artist, index) => (
                <li
                  className={ "list-group-item " + (index === currentIndex ? "active" : "") }
                  onClick={() => this.setActiveArtist(artist, index)}
                  key={index}
                >
                  {artist.title}

                  <div>{artist.description}</div>
                  <img src={artists.url}></img>
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentArtist ? (
            <Artists
              artist={currentArtist}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Please click on a Artists...</p>
            </div>
          )}
        </div>
      </div>
    );

    
  }
}