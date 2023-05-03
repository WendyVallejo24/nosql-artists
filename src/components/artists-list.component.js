import React, { Component } from "react";
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
      artist: [],
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
    let artist = [];

    items.forEach((item) => {
      let id = item.id;
      let data = item.data();
      artist.push({
        id: id,
        title: data.title,
        description: data.description,
        published: data.published,
        url: data.url,
      });
    });

    this.setState({
      artist: artist,
    });
  }

  refreshList() {
    this.setState({
      currentArtist: null,
      currentIndex: -1,
    });
  }

  setActiveArtist(artists, index) {
    this.setState({
      currentArtist: artists,
      currentIndex: index,
    });
  }

  render() {
    const { artist, currentArtist, currentIndex } = this.state;

    return (
      <div className="list row mx-auto cont-center text-center" id="list-row">
        <div class="identificacion">
          <div class="imagen">
          <img src={image} className='img-home' width={100} height={100} alt="" /> 
          </div>
          <br />
          <p class="name">Wendy Belén Vallejo Patraca - S20006733</p>
        </div>
        <div className="col-md-6" id="list">

          <ul className="list-group">
            {artist &&
              artist.map((artists, index) => (
                <li
                  className={"list-group-item "}
                  onClick={() => this.setActiveArtist(artist, index)}
                  key={index}
                >
                  <h4 class="title">{artists.title}</h4>
                  <br />
                  <div class="post">
                    <img src={artists.url} alt="." />
                  </div>
                  
                  <div id="reactions">
                    <LikeButton /><LoveButton /><SadButton /><WowButton /><AngryButton /><HahaButton /><CareButton />
                  </div>
                  <Comment />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
