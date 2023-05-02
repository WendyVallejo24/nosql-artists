import React, { Component, useState } from "react";
import ArtistsDataService from "../services/artists.service";

import Artists from "./artists.component";
import LikeButton from "./reactions/LikeButton.component";
import LoveButton from "./reactions/LoveButton.component";
import SadButton from "./reactions/SadButton.component";
import WowButton from "./reactions/WowButton.component";
import AngryButton from "./reactions/AngryButton.component";
import HahaButton from "./reactions/HahaButton.component";
import CareButton from "./reactions/CareButton.component";

import Comment from "./comment.component";
import image from './img/perfil.jpg';

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
      <div className="list row" id="list-row">
        <div class="identificacion">
          <div class="imagen">
          <img src={image} className='img-home' width={100} height={100} /> 
          </div>
          <br />
          <p class="name">Wendy Belén Vallejo Patraca - S20006733</p>
        </div>
        <div className="col-md-6" id="list">
          <h4>Artists List</h4>

          <ul className="list-group">
            {artists &&
              artists.map((artist, index) => (
                <li
                  className={"list-group-item " + (index === currentIndex ? "active" : "")}
                  onClick={() => this.setActiveArtist(artist, index)}
                  key={index}
                >
                  {artist.title}<br />
                  <div id="reactions">
                    <LikeButton /><LoveButton /><SadButton /><WowButton /><AngryButton /><HahaButton /><CareButton />
                  </div>
                  <Comment />
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6" id="refresh">
          {currentArtist ? (
            <Artists
              artist={currentArtist}
              refreshList={this.refreshList}
            />
          ) : (

            <div className="datos">
              <br />
              <p>Please click on a Artists...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}